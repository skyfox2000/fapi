/**
 * 加密通信配置模块
 * 用于控制哪些接口需要加密，哪些不需要
 */



/**
 * 匹配模式类型
 * - 普通字符串：使用 includes 进行子串匹配
 * - ~() 包裹的字符串：作为正则表达式匹配，例如 ~(\/api\/secure\/.+)
 */
type MatchPattern = string;

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
   * 支持字符串（子串匹配）或正则表达式字符串（~()包裹）
   * 例如: ['/api/secure', '~(/api/user/.+)']
   * 如果为空数组且 enabled 为 true，则所有 API_HOST 下的接口都会加密
   */
  includeApis?: MatchPattern[];

  /**
   * 不需要加密的 API 列表（黑名单）
   * 支持字符串（子串匹配）或正则表达式字符串（~()包裹）
   * 优先级高于 includeApis
   */
  excludeApis?: MatchPattern[];

  /**
   * 需要加密的 API_HOST key 列表
   * 支持字符串（精确匹配）或正则表达式字符串（~()包裹）
   * 例如: ['SITEHOST_API', '~(SECURE_.*)']
   * 如果配置了此列表，只有这些 API_HOST 下的接口才会被加密
   */
  includeHostKeys?: MatchPattern[];

  /**
   * 不需要加密的 API_HOST key 列表（黑名单）
   * 支持字符串（精确匹配）或正则表达式字符串（~()包裹）
   * 优先级高于 includeHostKeys
   */
  excludeHostKeys?: MatchPattern[];

  /**
   * 不需要加密的子应用标识列表（黑名单）
   * 支持字符串（精确匹配）或正则表达式字符串（~()包裹）
   * 优先级高于其他配置
   * 例如: ['app1', '~(test_.*)']
   */
  excludeSubApps?: MatchPattern[];
}

// 全局加密配置
let globalCryptoConfig: CryptoConfig = {
  enabled: false,
  includeApis: [],
  excludeApis: [],
  includeHostKeys: [],
  excludeHostKeys: [],
  excludeSubApps: [],
};

/**
 * 解析匹配模式
 * @param pattern 匹配模式字符串
 * @returns 解析结果：{ type: 'string' | 'regex', value: string | RegExp }
 */
const parsePattern = (pattern: MatchPattern): { type: 'string' | 'regex'; value: string | RegExp } => {
  // 检查是否是正则表达式格式 ~(pattern)
  const regexMatch = pattern.match(/^~\((.*)\)$/);
  if (regexMatch) {
    try {
      return { type: 'regex', value: new RegExp(regexMatch[1]) };
    } catch (e) {
      console.warn(`[Crypto Config] 无效的正则表达式: ${pattern}`);
      return { type: 'string', value: pattern };
    }
  }
  return { type: 'string', value: pattern };
};

/**
 * 检查值是否匹配模式
 * @param value 要检查的值
 * @param pattern 匹配模式
 * @param matchType 匹配类型：'includes' 表示子串匹配，'exact' 表示精确匹配
 * @returns 是否匹配
 */
const matchesPattern = (value: string, pattern: MatchPattern, matchType: 'includes' | 'exact' = 'includes'): boolean => {
  const parsed = parsePattern(pattern);
  
  if (parsed.type === 'regex') {
    return (parsed.value as RegExp).test(value);
  }
  
  // 字符串匹配
  if (matchType === 'exact') {
    return value === parsed.value;
  }
  return value.includes(parsed.value as string);
};

/**
 * 检查值是否匹配任一模式列表
 * @param value 要检查的值
 * @param patterns 模式列表
 * @param matchType 匹配类型
 * @returns 是否匹配任一模式
 */
const matchesAnyPattern = (value: string, patterns: MatchPattern[] | undefined, matchType: 'includes' | 'exact' = 'includes'): boolean => {
  if (!patterns || patterns.length === 0) {
    return false;
  }
  
  for (const pattern of patterns) {
    if (matchesPattern(value, pattern, matchType)) {
      return true;
    }
  }
  return false;
};

/**
 * 初始化加密配置
 * @param config 加密配置选项
 *
 * @example
 * // 启用所有 API_HOST 接口的加密
 * initCrypto({ enabled: true });
 *
 * @example
 * // 只加密特定接口
 * initCrypto({
 *   enabled: true,
 *   includeApis: ['/api/secure', '~(/api/user/.+)']
 * });
 *
 * @example
 * // 加密所有接口，但排除特定接口
 * initCrypto({
 *   enabled: true,
 *   excludeApis: ['/public/', '~(/health/.*)']
 * });
 *
 * @example
 * // 只加密特定 API_HOST 的接口
 * initCrypto({
 *   enabled: true,
 *   includeHostKeys: ['SITEHOST_API', '~(SECURE_.*)']
 * });
 *
 * @example
 * // 加密所有接口，但排除特定 API_HOST
 * initCrypto({
 *   enabled: true,
 *   excludeHostKeys: ['PUBLIC_API', '~(TEST_.*)']
 * });
 */
export const initCrypto = (
  config?: Partial<CryptoConfig>
): void => {
  // 合并配置，允许用户控制 enabled
  globalCryptoConfig = {
    ...globalCryptoConfig,
    ...config,
  };
};



/**
 * 检查当前是否启用了加密通信
 * 基于 globalCryptoConfig.enabled 配置
 * @returns boolean
 */
export const isCryptoEnabled = (): boolean => {
  return globalCryptoConfig.enabled;
};

/**
 * 检查指定请求是否需要加密
 * @param url 请求 URL
 * @param apiKey API 配置键（如 'SITEHOST_API'）
 * @param subApp 子应用标识
 * @returns boolean
 */
export const shouldEncryptUrl = (url: string, apiKey?: string, subApp?: string): boolean => {
  // 如果加密未启用，不需要加密
  if (!globalCryptoConfig.enabled) {
    return false;
  }

  // 1. 先检查子应用级别的排除列表（优先级最高）
  if (subApp && globalCryptoConfig.excludeSubApps && globalCryptoConfig.excludeSubApps.length > 0) {
    if (matchesAnyPattern(subApp, globalCryptoConfig.excludeSubApps, 'exact')) {
      return false;
    }
  }

  // 2. 检查 API_HOST key 级别的排除列表
  if (apiKey && globalCryptoConfig.excludeHostKeys && globalCryptoConfig.excludeHostKeys.length > 0) {
    if (matchesAnyPattern(apiKey, globalCryptoConfig.excludeHostKeys, 'exact')) {
      return false;
    }
  }

  // 3. 检查 API_HOST key 级别的包含列表
  if (globalCryptoConfig.includeHostKeys && globalCryptoConfig.includeHostKeys.length > 0) {
    // 如果配置了 includeHostKeys，但当前 apiKey 不匹配，则不加密
    if (!apiKey || !matchesAnyPattern(apiKey, globalCryptoConfig.includeHostKeys, 'exact')) {
      return false;
    }
  }

  // 4. 检查 API 级别的排除列表
  if (globalCryptoConfig.excludeApis && globalCryptoConfig.excludeApis.length > 0) {
    if (matchesAnyPattern(url, globalCryptoConfig.excludeApis, 'includes')) {
      return false;
    }
  }

  // 5. 检查 API 级别的包含列表
  if (
    !globalCryptoConfig.includeApis ||
    globalCryptoConfig.includeApis.length === 0
  ) {
    // 如果没有配置 includeApis，且通过了 host 检查，则加密
    return true;
  }

  // 检查是否在 API 包含列表中
  if (matchesAnyPattern(url, globalCryptoConfig.includeApis, 'includes')) {
    return true;
  }

  // 默认不加密
  return false;
};
