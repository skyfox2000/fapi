/**
 * 全局日志控制模块
 * 用于控制不同模块的日志输出
 */

/**
 * 日志模块类型
 */
export type LogModule = 
  | 'crypto'      // 加密/解密
  | 'request'     // 请求处理
  | 'proxy'       // 代理处理
  | 'cache'       // 缓存处理
  | 'auth';       // 认证处理

/**
 * 日志配置
 */
interface LogConfig {
  enabled: boolean;
  modules: Record<LogModule, boolean>;
}

// 全局日志配置
const logConfig: LogConfig = {
  enabled: false,
  modules: {
    crypto: false,
    request: false,
    proxy: false,
    cache: false,
    auth: false,
  },
};

/**
 * 初始化日志配置
 * @param config 日志配置选项
 * 
 * @example
 * // 启用所有日志
 * initLog({ enabled: true });
 * 
 * @example
 * // 只启用特定模块日志
 * initLog({ 
 *   enabled: true, 
 *   modules: { crypto: true, request: true } 
 * });
 */
export const initLog = (config: Partial<LogConfig>): void => {
   if (config.enabled !== undefined) {
      logConfig.enabled = config.enabled;
   }
   if (config.modules) {
      Object.assign(logConfig.modules, config.modules);
   }
};

/**
 * 检查日志是否启用
 * @param module 模块名称
 * @returns boolean
 */
export const isLogEnabled = (module: LogModule): boolean => {
  if (!logConfig.enabled) {
    return false;
  }
  return logConfig.modules[module] === true;
};

/**
 * 输出日志
 * @param module 模块名称
 * @param message 日志消息
 * @param data 可选数据
 */
export const log = (module: LogModule, message: string, data?: any): void => {
  if (!isLogEnabled(module)) {
    return;
  }
  const prefix = `[${module.toUpperCase()}]`;
  if (data !== undefined) {
    console.log(prefix, message, data);
  } else {
    console.log(prefix, message);
  }
};

/**
 * 输出错误日志
 * @param module 模块名称
 * @param message 日志消息
 * @param error 错误对象
 */
export const logError = (module: LogModule, message: string, error?: any): void => {
  const prefix = `[${module.toUpperCase()}]`;
  if (error !== undefined) {
    console.error(prefix, message, error);
  } else {
    console.error(prefix, message);
  }
};

/**
 * 输出警告日志
 * @param module 模块名称
 * @param message 日志消息
 * @param data 可选数据
 */
export const logWarn = (module: LogModule, message: string, data?: any): void => {
  if (!isLogEnabled(module)) {
    return;
  }
  const prefix = `[${module.toUpperCase()}]`;
  if (data !== undefined) {
    console.warn(prefix, message, data);
  } else {
    console.warn(prefix, message);
  }
};
