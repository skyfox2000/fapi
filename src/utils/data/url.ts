import { API_HOST } from "@/api/api";
import { IUrlInfo } from "@/types/typings";
import { toast } from "@/utils/index";

/**
 * 组合域名 + Url地址
 * @param urlInfo
 * @returns 带域名Url
 */
export const hostUrl = (urlInfo: IUrlInfo): string | false => {
   let { api, url } = urlInfo;
   if (!url.startsWith("http://") && !url.startsWith("https://")) {
      if (api) {
         if (API_HOST[api]) url = API_HOST[api] + url;
         else {
            toast.error("未查询到接口域名：" + api);
            return false;
         }
      }
   }
   return url;
};
