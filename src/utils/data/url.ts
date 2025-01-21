import { API_HOST } from "@/api/api";
import { IUrlInfo } from "@/types/typings";
import { toast } from "@/utils/index";

/**
 * 组合域名 + Url地址
 * @param urlInfo
 * @returns 带域名Url
 */
export const hostUrl = (urlInfo: IUrlInfo): string | false => {
   let { api, url, authorize } = urlInfo;

   // 如果 URL 已经是完整的 HTTP 或 HTTPS 地址 或 没有提供 api，直接返回
   if (url.startsWith("http://") || url.startsWith("https://") || !api) {
      return url;
   }

   // 获取 API_HOST 中对应的配置
   const apiHostConfig = API_HOST[api];

   // 如果配置不存在，提示错误并返回 false
   if (!apiHostConfig) {
      toast.error("未查询到接口域名：" + api);
      return false;
   }

   // 如果配置是字符串，直接拼接 URL
   if (typeof apiHostConfig === "string") {
      return apiHostConfig + url;
   }

   // 如果配置是对象，使用 host 拼接 URL
   if (typeof apiHostConfig === "object") {
      const { host, authorize: apiAuthorize } = apiHostConfig;

      // 如果 urlInfo 中的 authorize 未定义或为 false
      // 使用 API_HOST 中的 authorize 更新urlInfo.authorize
      if (authorize === undefined || authorize === false) {
         urlInfo.authorize = apiAuthorize;
      }

      // 拼接 URL
      url = host + url;

      // 返回带 authorize 信息的 URL 或其他处理
      return url;
   }

   // 其他情况直接返回 URL
   return url;
};