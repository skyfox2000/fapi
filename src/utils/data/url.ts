import { API_HOST } from "@/api/api";
import { IUrlInfo } from "@/types/typings";

/**
 * 组合域名 + Url地址
 * @param urlInfo
 * @returns 带域名Url
 */
export const hostUrl = (urlInfo: IUrlInfo): string => {
   let { api, url } = urlInfo;
   if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = API_HOST[api] + url;
   }
   return url;
};
