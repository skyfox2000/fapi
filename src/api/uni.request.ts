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
import {
   AjaxResponse,
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
   // 发送请求
   return new Promise((resolve) => {
      uni.request({
         ...options,
         success: (res: AjaxResponse) => {
            requestSuccess(options, urlInfo, res, resultInfo);
         },
         fail: (err: any) => {
            requestFail(err, resultInfo);
         },
         complete: () => {
            requestComplete(urlInfo, resultInfo, resolve);
         },
      });
   });
};

/**
 * GET 请求
 * @param urlInfo 后台地址
 * @returns
 */
export const uniGet = <T>(
   urlInfo: IUrlInfo
): Promise<ApiResponse<T> | null> => {
   const url = hostUrl(urlInfo);
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
 * @param data 请求body参数
 * @returns
 */
export const uniPut = <T>(
   urlInfo: IUrlInfo,
   data?: ReqParams
): Promise<ApiResponse<T> | null> => {
   const url = hostUrl(urlInfo);
   return http(
      {
         url,
         dataType: "json",
         method: "PUT",
         data,
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
 * @param data 请求body参数
 * @returns
 */
export const uniDelete = <T>(
   urlInfo: IUrlInfo,
   data?: ReqParams
): Promise<ApiResponse<T> | null> => {
   const url = hostUrl(urlInfo);
   return http(
      {
         url,
         dataType: "json",
         method: "DELETE",
         data,
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
 * @param data 请求body参数
 * @returns
 */
export const uniPost = <T>(
   urlInfo: IUrlInfo,
   data?: ReqParams
): Promise<ApiResponse<T> | null> => {
   const url = hostUrl(urlInfo);
   return http(
      {
         url,
         dataType: "json",
         method: "POST",
         data,
         timeout: urlInfo.timeout,
         loadingText: urlInfo.loadingText ?? "数据加载中……",
      },
      urlInfo,
      request
   );
};
