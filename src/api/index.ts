import { RequestOptions, IUrlInfo } from "@/types/typings";

const requestConfig: RequestOptions = {
   url: "",
   header: { "Content-Type": "application/json" },
};

/** 全局 before 拦截器 */
let globalBefore: ((config: Record<string, any>) => boolean | void) | undefined;

/** 全局 after 拦截器 */
let globalAfter: ((config: Record<string, any>, result: any) => void) | undefined;

/** 添加全局请求、结果拦截器、参数 */
export const globalRequestOption = (config: RequestOptions & Pick<IUrlInfo, 'before' | 'after'>) => {
   const { before, after, ...rest } = config;
   if (before) globalBefore = before;
   if (after) globalAfter = after;
   Object.assign(requestConfig, rest);
};

/** 获取全局配置 */
export const getGlobalConfig = () => requestConfig;

/** 获取全局 before 拦截器 */
export const getGlobalBefore = () => globalBefore;

/** 获取全局 after 拦截器 */
export const getGlobalAfter = () => globalAfter;