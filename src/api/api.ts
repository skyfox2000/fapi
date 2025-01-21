import { IUrlInfo, RequestOptions } from "@/types/typings";

/**
 * 接口地址，扩展配置
 */
export interface API_HOST_EXTEND {
   // 接口地址
   host: string;
   /**
    * 是否需要授权Token
    * @param options 请求实际参数配置
    * @param urlInfo 前端请求配置
    * @param token 当前token
    * @returns 是否允许调用接口
    */
   authorize:
      | boolean
      | ((
           options: RequestOptions,
           urlInfo: IUrlInfo,
           token: string
        ) => boolean);
}

/**
 * 接口地址，后端获取
 */
export const API_HOST: {
   [key: string]: string | API_HOST_EXTEND;
} = {
   SITEHOST_API: "",
};
