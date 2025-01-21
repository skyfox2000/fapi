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

import { fieldMapping, getToken, toast } from "@/utils/index";
import { FrontCache } from "./cache";
const PENDING_MAP: Record<string, Promise<ApiResponse<any> | null>> = {};
import { globalRequestOption } from "./index";
import { deepClone } from "@/utils/data/deepClone";

export type RequestResult<T> = {
   Result: ApiResponse<T> | null;
   Error?: ApiResponse;
};

/**
 * 请求前置处理
 * @param options 请求实际参数配置
 * @param urlInfo 前端请求配置
 * @param config 默认全局配置
 */
export const requestBefore = (
   options: RequestOptions,
   urlInfo: IUrlInfo,
   config: Record<string, any>
): boolean | void => {
   Object.assign(options, config, options);

   if (typeof urlInfo.header === "object") {
      options.header = urlInfo.header;
   } else if (typeof urlInfo.header === "function") {
      options.header = urlInfo.header(config.header);
   }
   if (!options.header) options.header = {};
   options.header.reqId = createId();

   if (urlInfo.authorize) {
      // 需要授权
      const token = getToken(); // 获取 token
      if (!token) {
         // 如果没有 token，提示错误并返回 false
         const msg = "错误，接口需要授权才能访问！";
         console.error(msg);
         toast.error({ title: msg });
         return false;
      }

      if (typeof urlInfo.authorize === "boolean") {
         // 如果是 boolean 类型且为 true，设置授权头
         options.header.authorization = "Bearer " + token;
      } else if (typeof urlInfo.authorize === "function") {
         // 如果是 function 类型，调用函数并传入 options, urlInfo 和 token
         const result = urlInfo.authorize(options, urlInfo, token);
         if (result === false) {
            // 如果函数返回 false，直接返回 false
            return false;
         }
      }
   }

   if (urlInfo.before) {
      const res = urlInfo.before.call(urlInfo, options);
      if (res !== undefined) {
         return res;
      }
   }

   if (options.loadingText) {
      toast.loading({
         title: options.loadingText.toString(),
      });
   }
};

export const requestSuccess = <T>(
   config: any,
   urlInfo: IUrlInfo,
   res: AjaxResponse,
   resultInfo: RequestResult<T>
) => {
   // 状态码 2xx
   if (res.statusCode >= 200 && res.statusCode < 400) {
      // 2.1 提取核心数据 res.data
      const resData = res.data as ApiResponse<T>;
      if (resData.status === ResStatus.SUCCESS) {
         // 核心数据处理
         const data = resData.data as AnyData;
         if (config.method === "POST" && urlInfo.fieldMap && data) {
            fieldMapping(urlInfo.fieldMap, data);
         }

         if (urlInfo.after) {
            urlInfo.after!.call(urlInfo, resData, config);
         }

         resultInfo.Result = resData;
      } else {
         console.error(resData);
         resultInfo.Error = {
            status: resData.status,
            errno: resData.errno,
            msg: resData.msg || "请求发生错误",
         };
         resultInfo.Result = resData;
      }
   } else {
      // 其他错误 -> 根据后端错误信息轻提示
      let message;
      // http状态码
      const statusCode = res.statusCode;
      switch (statusCode) {
         case 401:
            message = "未授权或授权过期";
            break;
         case 403:
            message = "无权访问";
            break;
         case 404:
            message = "请求地址错误";
            break;
         case 500:
            message = "服务器异常";
            break;
         default:
            message = "其它请求错误";
            break;
      }

      message = `${statusCode}: ${message}`;
      const err: ApiResponse = {
         status: ResStatus.ERROR,
         errno: statusCode + 1000,
         msg: message,
      };
      resultInfo.Error = err;
   }
};

export const requestFail = <T>(netErr: any, resultInfo: RequestResult<T>) => {
   // 失败回调:处理http网络错误的
   console.error(netErr);
   const err: ApiResponse = {
      status: ResStatus.ERROR,
      errno: 1000,
      msg: "网络错误：" + netErr.toString(),
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
   if (resultInfo.Error) {
      console.error(deepClone(urlInfo), resultInfo.Error);
      if (!urlInfo!.hideErrorToast) {
         toast.error({ title: resultInfo.Error.msg });
      }
   } else {
      toast.hide(1000);
   }
   // 调用接口结束
   resolve(resultInfo.Result);
};

/**
 * 发送请求
 * @param options 请求实际参数配置
 * @param urlInfo 前端请求配置
 * @param request 请求接口
 * @returns Promise 数据类型
 */
export const http = <T>(
   options: RequestOptions,
   urlInfo: IUrlInfo,
   request: <T>(
      options: RequestOptions,
      urlInfo: IUrlInfo
   ) => Promise<ApiResponse<T> | null>
): Promise<ApiResponse<T> | null> => {
   // 默认全局配置
   const config = deepClone(globalRequestOption);
   const beforeRes = requestBefore(options, urlInfo, config);
   /// 请求前判断参数是否合规，或者自定义处理headers，如果返回false，则取消执行调用API接口
   if (beforeRes === false) return Promise.resolve(null);

   if (options.method === "POST") {
      // 仅对查询判断是否有缓存结果
      if (urlInfo.cacheTime) {
         // 缓存数据
         const cacheData = FrontCache.get({
            ...urlInfo,
            key: urlInfo.url,
            params: urlInfo.params,
            fields: ["Query", "Option.SelectFields"],
         });
         if (cacheData) return Promise.resolve(cacheData);
      }
      /// 仅对查询进行自动PENDING
      const requestKey = generateKey(options.url, urlInfo.params, [
         "Query",
         "Option.SelectFields",
      ]);

      const pendingInfo = PENDING_MAP[requestKey];
      // 检查是否有相同请求的pending状态
      if (pendingInfo) {
         return new Promise((resolve) => {
            pendingInfo.then(resolve);
         });
      }

      // 创建一个新的共享Promise
      const sharedPromise = request<T>(options, urlInfo)
         .then((result) => {
            if (typeof result === "boolean") return result;
            // 判断是否使用缓存
            if (result?.status === ResStatus.SUCCESS && urlInfo.cacheTime) {
               // 缓存数据
               FrontCache.set(
                  {
                     ...urlInfo,
                     key: urlInfo.url,
                     params: urlInfo.params,
                     fields: ["Query", "Option.SelectFields"],
                  },
                  result?.data,
                  urlInfo.cacheTime
               );
            }
            return result;
         })
         .finally(() => {
            delete PENDING_MAP[requestKey];
         });

      // 存储共享的Promise
      PENDING_MAP[requestKey] = sharedPromise;

      return sharedPromise;
   } else {
      return request<T>(options, urlInfo);
   }
};
