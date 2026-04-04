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

/**
 * 处理加密请求 - 在请求发送前调用
 * @param options 请求选项
 * @param urlInfo URL信息
 * @returns 是否进行了加密处理
 */
export const processEncryptedRequest = async (
  options: RequestOptions,
  urlInfo: IUrlInfo
): Promise<boolean> => {
  // 检查是否需要加密
  if (!shouldEncryptUrl(options.url || "", urlInfo.api)) {
    return false;
  }

  // 只加密有 body 的请求 (POST, PUT, DELETE)
  const method = options.method?.toUpperCase();
  if (method === "GET" || !options.data) {
    return false;
  }

  try {
    const encrypted = await encryptRequest(options.data);
    if (encrypted) {
      log('crypto', '请求加密', { originalData: options.data });
      // 替换请求体为密文
      options.data = encrypted.encryptedData;
      // 添加加密相关请求头
      if (!options.header) {
        options.header = {};
      }
      options.header["X-Encrypted-Key"] = encrypted.encryptedKey;
      options.header["X-Nonce"] = encrypted.nonce;
      log('crypto', '请求加密完成');
      return true;
    }
  } catch (error) {
    logError('crypto', '请求加密失败', error);
  }

  return false;
};

/**
 * 处理加密响应 - 在收到响应后调用
 * @param res 响应对象
 * @returns 解密后的数据
 */
export const processEncryptedResponse = async (
  res: AjaxResponse
): Promise<any> => {
  const responseNonce = res.header?.["x-response-nonce"] || res.header?.["X-Response-Nonce"];

  // 如果有响应 nonce，说明响应是加密的
  if (responseNonce && res.data) {
    try {
      let encryptedData: string | null = null;

      // 检查数据格式：支持直接字符串或 { encrypted: "base64" } 格式
      if (typeof res.data === "string" && isEncryptedResponse(res.data)) {
        encryptedData = res.data;
      } else if (typeof res.data === "object" && res.data !== null) {
        if ("encrypted" in res.data && typeof res.data.encrypted === "string") {
          encryptedData = res.data.encrypted;
        }
      }

      if (encryptedData && isEncryptedResponse(encryptedData)) {
        const decrypted = await decryptResponse(encryptedData, responseNonce);
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

  // 未加密或解密失败，返回原始数据
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
