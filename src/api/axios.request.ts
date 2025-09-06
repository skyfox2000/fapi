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
import axios, { AxiosError, AxiosResponse } from "axios";
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
} from "./request";

const request = <T>(
   options: RequestOptions,
   urlInfo: IUrlInfo
): Promise<ApiResponse<T> | null> => {
   const resultInfo: RequestResult<T> = {
      Result: null,
   };
   const { header, ...rest } = options;
   // 发送请求
   return new Promise((resolve) => {
      axios
         .request({
            ...rest,
            ...{
               headers: header,
            },
         })
         .then((res: AxiosResponse) => {
            requestSuccess(
               options,
               urlInfo,
               {
                  statusCode: res.status,
                  data: res.data,
               },
               resultInfo
            );
         })
         .catch((err: AxiosError) => {
            if (err.response) {
               if (
                  err.response.status &&
                  err.response.status > 200 &&
                  err.response.status < 600
               ) {
                  requestSuccess(
                     options,
                     urlInfo,
                     {
                        statusCode: err.response.status,
                        data: err.response?.data as any,
                     },
                     resultInfo
                  );
               } else {
                  requestFail(err, resultInfo);
               }
            } else {
               requestFail(err, resultInfo);
            }
         })
         .finally(() => {
            requestComplete(urlInfo, resultInfo, resolve);
         });
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
         loadingText: urlInfo.loadingText ?? "数据加载中……",
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
         loadingText: "正在存储数据……",
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
         loadingText: "正在删除数据……",
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
         loadingText: urlInfo.loadingText ?? "数据加载中……",
      },
      urlInfo,
      request
   );
};
