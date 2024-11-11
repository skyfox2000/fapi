/**
 * 请求支持功能说明
 ** 全局请求配置
 ** 重复请求合并
 ** 请求参数化配置
 ** 查询结果缓存
 ** 查询字段Map
 ** 自定义header
 ** 请求预处理
 ** 结果后处理
 */

import { API_HOST } from "@/api/index";
import { FrontCache } from "@/api/cache";
import { fieldMapping } from "@/index";
import { toast } from "@/index";
import { generateKey } from "@/utils/data/keyGenerate";
import {
   AjaxResponse,
   AnyData,
   ApiResponse,
   IUrlInfo,
   ReqParams,
   ResStatus,
} from "@/types/typings.d";

const requestConfig: UniNamespace.RequestOptions = {
   url: "",
   header: { "Content-Type": "application/json" },
};
const PENDING_MAP: Record<string, Promise<ApiResponse<any> | null>> = {};

/** 添加全局请求、结果拦截器、参数 */
export const globalRequestOption = (config: UniNamespace.RequestOptions) => {
   Object.assign(requestConfig, config);
};

const request = <T>(
   options: UniApp.RequestOptions,
   urlInfo: IUrlInfo
): Promise<ApiResponse<T> | null> => {
   const config = JSON.parse(JSON.stringify(requestConfig));
   // 发送请求
   return new Promise((resolve) => {
      // 发生错误时，默认直接显示错误信息
      let showErrorToast = true;
      toast.loading();

      if (typeof urlInfo.header === "object") {
         options.header = urlInfo.header;
      } else if (typeof urlInfo.header === "function") {
         options.header = urlInfo.header(config.header);
      }

      Object.assign(config, options);
      console.log(config);
      if (urlInfo.before) {
         urlInfo.before!.call(urlInfo, config);
      }
      uni.request({
         ...config,
         success: (res: AjaxResponse) => {
            // 状态码 2xx
            if (res.statusCode >= 200 && res.statusCode < 300) {
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

                  resolve(resData);
               } else {
                  if (!urlInfo!.hideErrorToast) {
                     console.error(resData);
                     toast.error({
                        title: resData.msg || "请求错误",
                        duration: 3000,
                     }); // 使用 error 方法
                     showErrorToast = true;
                  }
                  resolve(resData);
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

               const err: ApiResponse<T> = {
                  status: ResStatus.ERROR,
                  errno: statusCode + 1000,
                  msg: message,
               };
               if (!urlInfo!.hideErrorToast) {
                  console.error(err);
                  toast.error({ title: message }); // 使用 error 方法
                  showErrorToast = true;
               }
               resolve(err);
            }
         },
         fail: (err: any) => {
            // 失败回调:处理http网络错误的
            console.error(err);
            toast.error({ title: "网络错误" }); // 使用 error 方法
            showErrorToast = true;
            resolve({
               status: ResStatus.ERROR,
               errno: 1000,
               msg: "网络错误",
            });
         },
         complete: () => {
            if (!showErrorToast) {
               setTimeout(() => {
                  toast.hide();
               }, 300);
            }
         },
      });
   });
};

/**
 * 发送请求
 * @param options uni.request 参数配置
 * @param urlInfo 请求配置
 * @returns Promise 数据类型
 */
const http = <T>(
   options: UniApp.RequestOptions,
   urlInfo: IUrlInfo
): Promise<ApiResponse<T> | null> => {
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
      return request(options, urlInfo);
   }
};

const parseUrl = (urlInfo: IUrlInfo): string => {
   let { api, url } = urlInfo;
   if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = API_HOST[api] + url;
   }
   return url;
};

/**
 * GET 请求
 * @param urlInfo 后台地址
 * @returns
 */
export const httpGet = <T>(
   urlInfo: IUrlInfo
): Promise<ApiResponse<T> | null> => {
   const url = parseUrl(urlInfo);
   return http(
      {
         url,
         method: "GET",
         timeout: urlInfo.timeout || 5000,
      },
      urlInfo
   );
};

/**
 * PUT 处理及存储数据
 * @param urlInfo 后台地址
 * @param data 请求body参数
 * @returns
 */
export const httpPut = <T>(
   urlInfo: IUrlInfo,
   data?: ReqParams
): Promise<ApiResponse<T> | null> => {
   const url = parseUrl(urlInfo);
   return http(
      {
         url,
         dataType: "json",
         method: "PUT",
         data,
         timeout: urlInfo.timeout || 5000,
      },
      urlInfo
   );
};

/**
 * DELETE 删除数据
 * @param urlInfo 后台地址
 * @param data 请求body参数
 * @returns
 */
export const httpDelete = <T>(
   urlInfo: IUrlInfo,
   data?: ReqParams
): Promise<ApiResponse<T> | null> => {
   const url = parseUrl(urlInfo);
   return http(
      {
         url,
         dataType: "json",
         method: "DELETE",
         data,
         timeout: urlInfo.timeout || 5000,
      },
      urlInfo
   );
};

/**
 * POST 查询数据
 * @param urlInfo 后台地址
 * @param data 请求body参数
 * @returns
 */
export const httpPost = <T>(
   urlInfo: IUrlInfo,
   data?: ReqParams
): Promise<ApiResponse<T> | null> => {
   const url = parseUrl(urlInfo);
   return http(
      {
         url,
         dataType: "json",
         method: "POST",
         data,
         timeout: urlInfo.timeout || 5000,
      },
      urlInfo
   );
};
