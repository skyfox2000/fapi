import { RequestOptions } from "@/types/typings";

const requestConfig: RequestOptions = {
   url: "",
   header: { "Content-Type": "application/json" },
};

/** 添加全局请求、结果拦截器、参数 */
export const globalRequestOption = (config: RequestOptions) => {
   Object.assign(requestConfig, config);
};