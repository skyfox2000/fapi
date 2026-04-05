import {
   RequestOptions,
   IUrlInfo,
   ApiResponse,
   ResStatus,
   AjaxResponse,
   AnyData,
} from "@/types/typings.d";
import { generateKey } from "@/utils/data/keyGenerate";
import { init } from "@paralleldrive/cuid2";
import {
  processEncryptedRequest,
  processEncryptedResponse,
  cachePublicKeyFromHeader,
} from "./crypto.middleware";
import axios, { AxiosError } from "axios";
const createId = init({
   // A custom random function with the same API as Math.random.
   // You can use this to pass a cryptographically secure random function.
   random: Math.random,
   // the length of the id
   length: 10,
   // A custom fingerprint for the host environment. This is used to help
   // prevent collisions when generating ids in a distributed system.
   fingerprint: "",
});

import toast from "@/utils/toast";
import { fieldMapping } from "@/utils/data/fieldMap";
import { getToken } from "@/utils/call/auth";
import { FrontCache } from "./cache";
import { getGlobalConfig, getGlobalBefore, getGlobalAfter, getRequestProxy } from "./index";
import { deepClone } from "@/utils/data/deepClone";
import { isEmpty } from "@/utils/data/isEmpty";
import { log, logError } from "@/utils/log";

export type RequestResult<T> = {
   Result: ApiResponse<T> | null;
   Error?: ApiResponse;
};

// 1、存储3个值，sharedPromise， 结果， 结果有效期3秒
// 2、只有有结果才有有效期，有结果返回结果，没有结果等待sharedPromise返回
// 3、有效期过期则删除对象
type PendingInfo = {
   sharedPromise: Promise<ApiResponse<any> | null>;
   result?: ApiResponse<any> | null;
   expire?: number;
};
const PENDING_MAP: Record<string, PendingInfo> = {};
// 动态缓存结果有效期，避免页面短时间多次调用相同接口
const PENDING_MAP_EXPIRE = 2000;

/**
 * 请求前置处理
 * @param options 请求实际参数配置
 * @param urlInfo 前端请求配置
 * @param config 默认全局配置
 */
/**
 * 深度合并对象
 * @param target 目标对象
 * @param sources 源对象数组，后面的优先级更高
 */
const deepMerge = (target: any, ...sources: any[]): any => {
   if (!sources.length) return target;
   const source = sources.shift();
   if (source === undefined) return target;

   for (const key in source) {
      if (source.hasOwnProperty(key)) {
         if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
         } else {
            target[key] = source[key];
         }
      }
   }
   return deepMerge(target, ...sources);
};

export const requestBefore = (
   options: RequestOptions,
   urlInfo: IUrlInfo,
   config: Record<string, any>
): boolean | void => {
   // 深度合并配置：全局配置(config) < 请求参数(options) < urlInfo配置
   // 优先级：urlInfo > options > config
   const mergedOptions = deepMerge({}, config, options);
   Object.assign(options, mergedOptions);

   // 处理 header：深度合并全局header、options.header、urlInfo.header
   const globalHeader = config.header || {};
   const optionsHeader = options.header || {};
   
   if (typeof urlInfo.header === "object") {
      // urlInfo.header 是对象，深度合并
      options.header = deepMerge({}, globalHeader, optionsHeader, urlInfo.header);
   } else if (typeof urlInfo.header === "function") {
      // urlInfo.header 是函数，先深度合并基础header，再传入函数
      const baseHeader = deepMerge({}, globalHeader, optionsHeader);
      options.header = urlInfo.header(baseHeader);
   } else {
      // urlInfo 没有配置 header，使用深度合并后的 header
      options.header = deepMerge({}, globalHeader, optionsHeader);
   }
   
   if (!options.header) options.header = {};
   options.header.reqId = createId();

   // token验证统一在 coreRequest 的 injectToken 中处理
   // urlInfo.authorize 函数在这里处理（子应用端）
   // 因为函数无法跨微前端边界传递
   if (urlInfo.authorize && typeof urlInfo.authorize === "function") {
      const result = urlInfo.authorize(options, urlInfo, "");
      if (result === false) {
         return false;
      }
   }

   // 执行全局 before 拦截器（先执行全局）
   const globalBefore = getGlobalBefore();
   if (globalBefore) {
      const res = globalBefore(options);
      if (res !== undefined) {
         return res;
      }
   }

   // 执行单个请求的 before 拦截器
   if (urlInfo.before) {
      const res = urlInfo.before.call(urlInfo, options);
      if (res !== undefined) {
         return res;
      }
   }

   // 处理加密请求（异步操作，但需要在请求前完成）
   // 注意：这里返回一个特殊的标记，让 http 函数知道需要等待加密处理
};

/**
 * 异步请求前置处理（用于加密等异步操作）
 * @param options 请求实际参数配置
 * @param urlInfo 前端请求配置
 */
export const requestBeforeAsync = async (
   options: RequestOptions,
   urlInfo: IUrlInfo
): Promise<void> => {
   // 处理加密请求
   await processEncryptedRequest(options, urlInfo);
};

/**
 * 注入token - 内部方法
 * 只负责验证token存在和注入，不处理 authorize 函数
 * authorize 函数在子应用端的 requestBefore 中处理
 * @param options 请求配置
 * @param urlInfo URL配置
 * @returns 是否成功注入
 */
const injectToken = (
   options: RequestOptions,
   urlInfo: IUrlInfo
): boolean => {
   if (urlInfo.authorize) {
      const token = getToken();
      if (!token) {
         const msg = `Error, interface ${urlInfo.url} requires authorization to access!`;
         console.error(msg);
         toast.error({ title: msg });
         return false;
      }
      // 注入 token（不处理 authorize 函数，已在子应用端处理）
      if (!options.header?.authorization) {
         if (!options.header) options.header = {};
         options.header.authorization = "Bearer " + token;
      }
   }
   return true;
};

/**
 * 核心请求方法 - 负责注入token、加密、发送、解密
 * 供代理和本地请求共用，调用现有方法
 * @param options 请求配置
 * @param urlInfo URL配置
 * @returns 原始响应 AjaxResponse
 */
export const coreRequest = async (
   options: RequestOptions,
   urlInfo: IUrlInfo
): Promise<AjaxResponse | null> => {
   const hasProxy = !!getRequestProxy();
   log('request', '开始请求', { url: options.url, method: options.method, hasProxy });
   
   try {
      if (!injectToken(options, urlInfo)) {
         logError('request', 'Token注入失败', { url: options.url });
         return null;
      }

      const encryptResult = await processEncryptedRequest(options, urlInfo);

      log('request', '发送HTTP请求');
      const { header, ...rest } = options;
      const response = await axios.request({
         ...rest,
         headers: header,
      });

      const ajaxResponse: AjaxResponse = {
         statusCode: response.status,
         data: response.data,
         header: response.headers as Record<string, string>,
      };
      log('request', 'HTTP响应完成', { 
         statusCode: ajaxResponse.statusCode,
         headerKeys: ajaxResponse.header ? Object.keys(ajaxResponse.header) : [],
         header: ajaxResponse.header
      });

      cachePublicKeyFromHeader(ajaxResponse.header);

      ajaxResponse.data = await processEncryptedResponse(ajaxResponse, encryptResult.aesKey);

      log('request', '请求完成', { statusCode: ajaxResponse.statusCode });
      return ajaxResponse;
   } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
         const ajaxResponse: AjaxResponse = {
            statusCode: axiosError.response.status,
            data: axiosError.response.data,
            header: axiosError.response.headers as Record<string, string>,
         };
         cachePublicKeyFromHeader(ajaxResponse.header);
         ajaxResponse.data = await processEncryptedResponse(ajaxResponse);
         log('request', 'HTTP错误', { statusCode: ajaxResponse.statusCode });
         return ajaxResponse;
      }
      logError('request', '请求失败', error);
      throw error;
   }
};

export const requestSuccess = async <T>(
   config: RequestOptions,
   urlInfo: IUrlInfo,
   res: AjaxResponse,
   resultInfo: RequestResult<T>
) => {
   // 状态码 2xx
   if (res.statusCode >= 200 && res.statusCode < 400) {
      // 原始模式：直接返回原始数据，不做任何处理
      if (urlInfo.raw) {
         const resData = res.data;
         // 先执行全局 after
         const globalAfter = getGlobalAfter();
         if (globalAfter) {
            globalAfter(config, resData, res);
         }
         if (urlInfo.after) {
            urlInfo.after!.call(urlInfo, config, resData, res);
         }
         resultInfo.Result = resData as any;
         return;
      }

      // 标准模式：2.1 提取核心数据 res.data
      const resData = res.data as ApiResponse<T>;
      if (resData.status === ResStatus.SUCCESS) {
         // 核心数据处理
         const data = resData.data as AnyData;
         if (config.method === "POST" && urlInfo.fieldMap && data) {
            fieldMapping(urlInfo.fieldMap, data);
         }

         // 先执行全局 after
         const globalAfter = getGlobalAfter();
         if (globalAfter) {
            globalAfter(config, resData, res);
         }
         if (urlInfo.after) {
            urlInfo.after!.call(urlInfo, resData, config, res);
         }

         resultInfo.Result = resData;
      } else {
         console.error(resData);
         resultInfo.Error = {
            status: resData.status,
            errno: resData.errno,
            msg: resData.msg || "Request Error",
         };
         resultInfo.Result = resData;
         // 执行全局 after 拦截器（错误时也执行）
         const globalAfter = getGlobalAfter();
         if (globalAfter) {
            globalAfter(config, resData, res);
         }
         if (urlInfo.after) {
            urlInfo.after!.call(urlInfo, resData, config, res);
         }
      }
   } else {
      // 其他错误 -> 根据后端错误信息轻提示
      let message;
      const statusCode = res.statusCode;
      switch (statusCode) {
         case 401:
            message = "Unauthorized or Token Expired";
            break;
         case 403:
            message = "Access Forbidden";
            break;
         case 404:
            message = "Request Address Error";
            break;
         case 500:
            message = "Server Exception";
            break;
         default:
            message = "Other Request Error";
            break;
      }

      message = `${statusCode}: ${message}`;

      // 原始模式：直接返回错误信息
      if (urlInfo.raw) {
         const err = {
            status: ResStatus.ERROR,
            errno: statusCode + 1000,
            msg: message,
         };
         resultInfo.Error = err;
         // 执行全局 after 拦截器（错误时也执行）
         const globalAfter = getGlobalAfter();
         if (globalAfter) {
            globalAfter(config, err, res);
         }
         if (urlInfo.after) {
            urlInfo.after!.call(urlInfo, config, err, res);
         }
         return;
      }

      // 标准模式：返回 ApiResponse 格式错误
      const err: ApiResponse = {
         status: ResStatus.ERROR,
         errno: statusCode + 1000,
         msg: message,
      };
      resultInfo.Error = err;
      // 执行全局 after 拦截器（错误时也执行）
      const globalAfter = getGlobalAfter();
      if (globalAfter) {
         globalAfter(config, err, res);
      }
      if (urlInfo.after) {
         urlInfo.after!.call(urlInfo, err, config, res);
      }
   }
};

export const requestFail = <T>(netErr: any, resultInfo: RequestResult<T>) => {
   // 失败回调:处理http网络错误的
   console.error(netErr);
   const err: ApiResponse = {
      status: ResStatus.ERROR,
      errno: 1000,
      msg: "Network Error: " + netErr.toString(),
   };

   resultInfo.Error = err;
};

export const requestComplete = <T>(
   urlInfo: IUrlInfo,
   resultInfo: RequestResult<T>,
   resolve: (
      value: ApiResponse<T> | PromiseLike<ApiResponse<T> | null> | null
   ) => void
) => {
   const showLoading = urlInfo.loadingText ? 500 : 0;
   setTimeout(() => {
      toast.hide();
      if (resultInfo.Error) {
         console.error(deepClone(urlInfo), resultInfo.Error);
         if (!urlInfo!.hideErrorToast) {
            toast.error({ title: resultInfo.Error.msg });
         }

         // 原始模式：直接返回错误信息
         if (urlInfo.raw) {
            resultInfo.Result = resultInfo.Error as any;
         } else {
            // 标准模式：返回 ApiResponse 格式
            resultInfo.Result = {
               status: ResStatus.ERROR,
               errno: resultInfo.Error.errno,
               msg: resultInfo.Error.msg,
               timestamp: resultInfo.Result?.timestamp,
               data: resultInfo.Result?.data,
            } as ApiResponse<T>;
         }
      }
      // 调用接口结束
      resolve(resultInfo.Result);
   }, showLoading);
};

/**
 * 发送请求
 * @param options 请求实际参数配置
 * @param urlInfo 前端请求配置
 * @param request 请求接口
 * @returns Promise 数据类型
 */
export const http = async <T>(
   options: RequestOptions,
   urlInfo: IUrlInfo,
   request: <T>(
      options: RequestOptions,
      urlInfo: IUrlInfo
   ) => Promise<ApiResponse<T> | null>
): Promise<ApiResponse<T> | null> => {
   // 默认全局配置
   const config = deepClone(getGlobalConfig());
   const beforeRes = requestBefore(options, urlInfo, config);
   /// 请求前判断参数是否合规，或者自定义处理headers，如果返回false，则取消执行调用API接口
   if (beforeRes === false) return Promise.resolve(null);

   // 注意：加密由 coreRequest 或代理负责，这里不再调用 requestBeforeAsync

   if (options.loadingText) {
      toast.loading({
         title: options.loadingText.toString(),
      });
   }

   // 原始模式：跳过缓存和字段映射等处理，直接请求
   if (urlInfo.raw) {
      return request<T>(options, urlInfo);
   }

   if (options.method === "POST") {
      // 仅对查询判断是否有缓存结果
      /**
       * 缓存Key参数配置
       */
      const cacheKey = {
         ...urlInfo,
         key: urlInfo.url,
         params: options.data,
         fields: ["Query", "Option.SelectFields"],
         fieldMap: urlInfo.fieldMap,
      };
      if (urlInfo.cacheTime) {
         // 缓存数据
         const cacheData = FrontCache.get(cacheKey);
         if (cacheData) {
            setTimeout(() => {
               toast.hide();
               return Promise.resolve({
                  status: ResStatus.SUCCESS,
                  data: cacheData as T,
               } as ApiResponse);
            }, 500);
         }
      }
      /// 仅对查询进行自动PENDING
      const requestKey = generateKey(
         options.url,
         options.data,
         urlInfo.fieldMap,
         ["Query", "Option.SelectFields"]
      );

      const pendingInfo = PENDING_MAP[requestKey];
      // 检查是否有相同请求的pending状态
      if (pendingInfo) {
         if (pendingInfo.expire && pendingInfo.expire < Date.now()) {
            // 过期删除
            delete PENDING_MAP[requestKey];
         } else if (!pendingInfo.expire) {
            // 没有过期时间，等待请求
            return new Promise((resolve) => {
               setTimeout(() => {
                  toast.hide();
                  pendingInfo.sharedPromise.then(resolve);
               }, 500);
            });
         } else {
            // 有结果，返回结果
            return new Promise((resolve) => {
               setTimeout(() => {
                  toast.hide();
                  resolve(pendingInfo.result!);
               }, 500);
            });
         }
      }

      urlInfo.loading = true;

      // 创建一个新的共享Promise
      const sharedPromise = request<T>(options, urlInfo)
         .then((result) => {
            if (typeof result === "boolean") return result;
            // 判断是否使用缓存
            if (
               result?.status === ResStatus.SUCCESS &&
               !isEmpty(result?.data) &&
               urlInfo.cacheTime
            ) {
               // 缓存数据
               FrontCache.set(cacheKey, result.data, urlInfo.cacheTime);
            }
            let newPendingInfo = PENDING_MAP[requestKey] as PendingInfo;
            newPendingInfo.result = result;
            newPendingInfo.expire = Date.now() + PENDING_MAP_EXPIRE;
            /// 缓存结果3秒
            PENDING_MAP[requestKey] = newPendingInfo;
            return result;
         })
         .finally(() => {
            urlInfo.loading = false;
         });

      // 存储共享的Promise
      PENDING_MAP[requestKey] = {
         sharedPromise,
      } as PendingInfo;

      return sharedPromise;
   } else {
      return request<T>(options, urlInfo);
   }
};
