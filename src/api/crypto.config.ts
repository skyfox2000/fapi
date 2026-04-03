/**
 * 加密通信配置模块
 * 用于控制哪些接口需要加密，哪些不需要
 */

import { setPublicKey, clearPublicKey, hasPublicKey } from "@/utils/crypto";

/**
 * 加密配置选项
 */
export interface CryptoConfig {
  /**
   * 是否启用加密通信
   * 默认: false
   */
  enabled: boolean;

  /**
   * 需要加密的 API 列表
   * 支持字符串（精确匹配）或正则表达式
   * 如果为空数组且 enabled 为 true，则所有 API_HOST 下的接口都会加密
   */
  includeApis?: (string | RegExp)[];

  /**
   * 不需要加密的 API 列表（黑名单）
   * 支持字符串（精确匹配）或正则表达式
   * 优先级高于 includeApis
   */
  excludeApis?: (string | RegExp)[];

  /**
   * 需要加密的 API_HOST key 列表
   * 例如: ['SITEHOST_API', 'SECURE_API']
   * 如果配置了此列表，只有这些 API_HOST 下的接口才会被加密
   */
  includeHostKeys?: string[];

  /**
   * 不需要加密的 API_HOST key 列表（黑名单）
   * 例如: ['PUBLIC_API', 'STATIC_API']
   * 优先级高于 includeHostKeys
   */
  excludeHostKeys?: string[];
}

// 全局加密配置
let globalCryptoConfig: CryptoConfig = {
  enabled: false,
  includeApis: [],
  excludeApis: [],
  includeHostKeys: [],
  excludeHostKeys: [],
};

/**
 * 初始化加密通信配置
 * @param publicKey RSA 公钥（PEM 格式）
 * @param config 加密配置选项
 *
 * @example
 * // 启用所有 API_HOST 接口的加密
 * initCryptoCommunication(publicKey, { enabled: true });
 *
 * @example
 * // 只加密特定接口
 * initCryptoCommunication(publicKey, {
 *   enabled: true,
 *   includeApis: ['user/login', 'user/register']
 * });
 *
 * @example
 * // 加密所有接口，但排除特定接口
 * initCryptoCommunication(publicKey, {
 *   enabled: true,
 *   excludeApis: ['public/info', /health/]
 * });
 *
 * @example
 * // 只加密特定 API_HOST 的接口
 * initCryptoCommunication(publicKey, {
 *   enabled: true,
 *   includeHostKeys: ['SITEHOST_API', 'SECURE_API']
 * });
 *
 * @example
 * // 加密所有接口，但排除特定 API_HOST
 * initCryptoCommunication(publicKey, {
 *   enabled: true,
 *   excludeHostKeys: ['PUBLIC_API', 'STATIC_API']
 * });
 */
export const initCryptoCommunication = (
  publicKey: string,
  config?: Partial<CryptoConfig>
): void => {
  // 设置公钥
  setPublicKey(publicKey);

  // 合并配置
  globalCryptoConfig = {
    ...globalCryptoConfig,
    ...config,
    enabled: true,
  };
};

/**
 * 更新加密配置
 * @param config 部分配置选项
 */
export const updateCryptoConfig = (config: Partial<CryptoConfig>): void => {
  globalCryptoConfig = {
    ...globalCryptoConfig,
    ...config,
  };
};

/**
 * 获取当前加密配置
 * @returns 当前配置
 */
export const getCryptoConfig = (): CryptoConfig => {
  return { ...globalCryptoConfig };
};

/**
 * 关闭加密通信
 */
export const disableCryptoCommunication = (): void => {
  globalCryptoConfig.enabled = false;
  clearPublicKey();
};

/**
 * 检查当前是否启用了加密通信
 * 只要有公钥就启用加密（通过 initCryptoCommunication 或响应头 X-Public-Key 设置）
 * @returns boolean
 */
export const isCryptoEnabled = (): boolean => {
  return hasPublicKey();
};

/**
 * 检查指定请求是否需要加密
 * @param url 请求 URL
 * @param apiKey API 配置键（如 'SITEHOST_API'）
 * @returns boolean
 */
export const shouldEncryptUrl = (url: string, apiKey?: string): boolean => {
  // 如果加密未启用或没有公钥，不需要加密
  if (!isCryptoEnabled()) {
    return false;
  }

  // 1. 先检查 API_HOST key 级别的排除列表（优先级最高）
  if (apiKey && globalCryptoConfig.excludeHostKeys && globalCryptoConfig.excludeHostKeys.length > 0) {
    if (globalCryptoConfig.excludeHostKeys.includes(apiKey)) {
      return false;
    }
  }

  // 2. 检查 API_HOST key 级别的包含列表
  if (globalCryptoConfig.includeHostKeys && globalCryptoConfig.includeHostKeys.length > 0) {
    // 如果配置了 includeHostKeys，但当前 apiKey 不匹配，则不加密
    if (!apiKey || !globalCryptoConfig.includeHostKeys.includes(apiKey)) {
      return false;
    }
  }

  // 3. 检查 API 级别的排除列表
  if (globalCryptoConfig.excludeApis && globalCryptoConfig.excludeApis.length > 0) {
    for (const pattern of globalCryptoConfig.excludeApis) {
      if (typeof pattern === "string") {
        if (url.includes(pattern)) {
          return false;
        }
      } else if (pattern instanceof RegExp) {
        if (pattern.test(url)) {
          return false;
        }
      }
    }
  }

  // 4. 检查 API 级别的包含列表
  if (
    !globalCryptoConfig.includeApis ||
    globalCryptoConfig.includeApis.length === 0
  ) {
    // 如果没有配置 includeApis，且通过了 host 检查，则加密
    return true;
  }

  // 检查是否在 API 包含列表中
  for (const pattern of globalCryptoConfig.includeApis) {
    if (typeof pattern === "string") {
      if (url.includes(pattern)) {
        return true;
      }
    } else if (pattern instanceof RegExp) {
      if (pattern.test(url)) {
        return true;
      }
    }
  }

  // 默认不加密
  return false;
};

/**
 * 添加需要加密的 API
 * @param apis API 列表（字符串或正则）
 */
export const addEncryptedApis = (...apis: (string | RegExp)[]): void => {
  if (!globalCryptoConfig.includeApis) {
    globalCryptoConfig.includeApis = [];
  }
  globalCryptoConfig.includeApis.push(...apis);
};

/**
 * 添加不需要加密的 API
 * @param apis API 列表（字符串或正则）
 */
export const addExcludedApis = (...apis: (string | RegExp)[]): void => {
  if (!globalCryptoConfig.excludeApis) {
    globalCryptoConfig.excludeApis = [];
  }
  globalCryptoConfig.excludeApis.push(...apis);
};

/**
 * 添加需要加密的 API_HOST key
 * @param hostKeys API_HOST key 列表
 */
export const addEncryptedHostKeys = (...hostKeys: string[]): void => {
  if (!globalCryptoConfig.includeHostKeys) {
    globalCryptoConfig.includeHostKeys = [];
  }
  globalCryptoConfig.includeHostKeys.push(...hostKeys);
};

/**
 * 添加不需要加密的 API_HOST key
 * @param hostKeys API_HOST key 列表
 */
export const addExcludedHostKeys = (...hostKeys: string[]): void => {
  if (!globalCryptoConfig.excludeHostKeys) {
    globalCryptoConfig.excludeHostKeys = [];
  }
  globalCryptoConfig.excludeHostKeys.push(...hostKeys);
};
