/**
 * 加密通信中间件
 * 统一处理请求加密和响应解密
 */

import { RequestOptions, IUrlInfo, AjaxResponse } from "@/types/typings.d";
import {
  encryptRequest,
  decryptResponse,
  isEncryptedResponse,
  setPublicKey,
} from "@/utils/crypto";
import { shouldEncryptUrl } from "./crypto.config";
import { log, logError } from "@/utils/log";

export interface EncryptResult {
  encrypted: boolean;
  aesKey?: Uint8Array;
  useWebCrypto?: boolean;
}

/**
 * 处理加密请求 - 在请求发送前调用
 * @param options 请求选项
 * @param urlInfo URL信息
 * @returns 加密结果，包含是否加密和 AES 密钥
 */
export const processEncryptedRequest = async (
  options: RequestOptions,
  urlInfo: IUrlInfo
): Promise<EncryptResult> => {
  const result: EncryptResult = { encrypted: false };

  // 1. 如果 options.crypto 明确设置为 false，不加密
  if (options.crypto === false) {
    return result;
  }

  // 2. 如果 options.crypto 明确设置为 true，跳过 shouldEncryptUrl 检查直接加密
  // 3. 如果 options.crypto 为 undefined（基座直接调用），使用 shouldEncryptUrl 判断
  if (options.crypto === undefined && !shouldEncryptUrl(options.url || "", urlInfo.api, urlInfo.subApp)) {
    return result;
  }

  const method = options.method?.toUpperCase();
  if (method === "GET" || !options.data) {
    return result;
  }

  try {
    const encrypted = await encryptRequest(options.data);
    if (encrypted) {
      log('crypto', '请求加密', { originalData: options.data });
      options.data = encrypted.encryptedData;
      if (!options.header) {
        options.header = {};
      }
      options.header["X-Encrypted-Key"] = encrypted.encryptedKey;
      options.header["X-Nonce"] = encrypted.nonce;
      log('crypto', '请求加密完成');
      return { encrypted: true, aesKey: encrypted.aesKey, useWebCrypto: encrypted.useWebCrypto };
    }
  } catch (error) {
    logError('crypto', '请求加密失败', error);
  }

  return result;
};

/**
 * 处理加密响应 - 在收到响应后调用
 * @param res 响应对象
 * @param aesKey AES 密钥（从加密请求时返回）
 * @param useWebCrypto 是否使用 Web Crypto API 加密
 * @returns 解密后的数据
 */
export const processEncryptedResponse = async (
  res: AjaxResponse,
  aesKey?: Uint8Array,
  useWebCrypto?: boolean
): Promise<any> => {
  const responseNonce = res.header?.["x-response-nonce"] || res.header?.["X-Response-Nonce"];

  if (responseNonce && res.data && aesKey) {
    try {
      let encryptedData: string | null = null;

      if (typeof res.data === "string" && isEncryptedResponse(res.data)) {
        encryptedData = res.data;
      } else if (typeof res.data === "object" && res.data !== null) {
        if ("encrypted" in res.data && typeof res.data.encrypted === "string") {
          encryptedData = res.data.encrypted;
        }
      }

      if (encryptedData && isEncryptedResponse(encryptedData)) {
        const decrypted = await decryptResponse(encryptedData, responseNonce, aesKey, useWebCrypto ?? false);
        if (decrypted !== null) {
          log('crypto', '响应解密', { decryptedData: decrypted });
          return decrypted;
        } else {
          logError('crypto', '响应解密失败: 返回null', { nonce: responseNonce });
        }
      }
    } catch (error) {
      logError('crypto', '响应解密失败', error);
    }
  }

  return res.data;
};

/**
 * 检查并缓存响应头中的公钥
 * 注意：公钥只允许设置一次，初始化后不可更改
 * @param headers 响应头
 */
export const cachePublicKeyFromHeader = (
  headers?: Record<string, string>
): void => {
  if (!headers) return;
  const publicKey = headers["x-public-key"] || headers["X-Public-Key"];
  if (publicKey) {
    const success = setPublicKey(publicKey);
    if (!success) {
      log('crypto', '公钥已存在，忽略响应头中的公钥');
    } else {
      log('crypto', '从响应头缓存公钥成功');
    }
  }
};
