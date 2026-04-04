/**
 * 请求支持功能说明
 * ** 全局请求配置
 * ** 重复请求合并
 * ** 请求参数化配置
 * ** 查询结果缓存
 * ** 查询字段Map
 * ** 自定义header
 * ** 请求预处理
 * ** 结果后处理
 */
import {
   ApiResponse,
   IUrlInfo,
   ReqParams,
   RequestOptions,
} from "@/types/typings.d";
import { hostUrl } from "@/utils/data/url";
import {
   http,
   requestComplete,
   requestFail,
   RequestResult,
   requestSuccess,
   coreRequest,
} from "./request";
import { getRequestProxy } from "./index";
import { deepClone } from "@/utils/data/deepClone";
import { log } from "@/utils/log";

const request = <T>(
   options: RequestOptions,
   urlInfo: IUrlInfo
): Promise<ApiResponse<T> | null> => {
   const resultInfo: RequestResult<T> = {
      Result: null,
   };
   // 发送请求
   return new Promise((resolve) => {
      // 检查是否有代理
      const proxy = getRequestProxy();
      if (proxy) {
         log('proxy', '使用代理', { url: options.url, method: options.method });
         // 创建新对象，避免修改原始对象
         const proxyOptions = deepClone(options);
         const proxyUrlInfo = deepClone(urlInfo);
         // 使用代理
         proxy(proxyOptions, proxyUrlInfo)
            .then(async (res) => {
               if (res) {
                  await requestSuccess(options, urlInfo, res, resultInfo);
               }
            })
            .catch((err) => {
               requestFail(err, resultInfo);
            })
            .finally(() => {
               requestComplete(urlInfo, resultInfo, resolve);
            });
      } else {
         // 使用核心请求方法
         coreRequest(options, urlInfo)
            .then(async (res) => {
               if (res) {
                  await requestSuccess(options, urlInfo, res, resultInfo);
               }
            })
            .catch((err) => {
               requestFail(err, resultInfo);
            })
            .finally(() => {
               requestComplete(urlInfo, resultInfo, resolve);
            });
      }
   });
};

/**
 * GET 请求
 * @param urlInfo 后台地址
 * @returns
 */
export const httpGet = <T>(
   urlInfo: IUrlInfo
): Promise<ApiResponse<T> | null> => {
   const url = hostUrl(urlInfo);
   if (url === false) return Promise.resolve(null);
   return http(
      {
         url,
         method: "GET",
         timeout: urlInfo.timeout,
         loadingText: urlInfo.loadingText ?? "Loading Data...",
      },
      urlInfo,
      request
   );
};

/**
 * PUT 处理及存储数据
 * @param urlInfo 后台地址
 * @param data 请求body参数 - 原始模式时支持任意类型
 * @returns
 */
export const httpPut = <T>(
   urlInfo: IUrlInfo,
   data?: ReqParams | any
): Promise<ApiResponse<T> | null> => {
   const url = hostUrl(urlInfo);
   if (url === false) return Promise.resolve(null);
   return http(
      {
         url,
         dataType: "json",
         method: "PUT",
         data: data ?? urlInfo.params,
         timeout: urlInfo.timeout,
         loadingText: "Saving Data...",
      },
      urlInfo,
      request
   );
};

/**
 * DELETE 删除数据
 * @param urlInfo 后台地址
 * @param data 请求body参数 - 原始模式时支持任意类型
 * @returns
 */
export const httpDelete = <T>(
   urlInfo: IUrlInfo,
   data: ReqParams | any
): Promise<ApiResponse<T> | null> => {
   const url = hostUrl(urlInfo);
   if (url === false) return Promise.resolve(null);
   return http(
      {
         url,
         dataType: "json",
         method: "DELETE",
         data: data,
         timeout: urlInfo.timeout,
         loadingText: "Deleting Data...",
      },
      urlInfo,
      request
   );
};

/**
 * POST 查询数据
 * @param urlInfo 后台地址
 * @param data 请求body参数 - 原始模式时支持任意类型
 * @returns
 */
export const httpPost = <T>(
   urlInfo: IUrlInfo,
   data?: ReqParams | any
): Promise<ApiResponse<T> | null> => {
   const url = hostUrl(urlInfo);
   if (url === false) return Promise.resolve(null);
   return http(
      {
         url,
         dataType: "json",
         method: "POST",
         data: data ?? urlInfo.params,
         timeout: urlInfo.timeout,
         loadingText: urlInfo.loadingText ?? "Loading Data...",
      },
      urlInfo,
      request
   );
};
