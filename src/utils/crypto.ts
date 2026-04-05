/**
 * 加密通信工具模块
 * 支持 RSA 公钥加密和 AES-GCM 对称加密
 */

import { isLogEnabled } from "@/utils/log";

// 全局缓存的 RSA 公钥（内存存储）
let cachedPublicKey: string | null = null;

/**
 * 调试日志输出
 * @param label 标签
 * @param data 数据
 */
const debugLog = (label: string, data?: any): void => {
  if (!isLogEnabled('crypto')) return;
  
  if (data !== undefined) {
    if (data instanceof Uint8Array) {
      console.log(`[Crypto Debug] ${label}:`, arrayBufferToBase64(data));
    } else if (typeof data === 'object') {
      console.log(`[Crypto Debug] ${label}:`, JSON.stringify(data, null, 2));
    } else {
      console.log(`[Crypto Debug] ${label}:`, data);
    }
  } else {
    console.log(`[Crypto Debug] ${label}`);
  }
};

/**
 * 缓存 RSA 公钥（只允许设置一次，防止后期更改）
 * @param publicKey PEM 格式的 RSA 公钥
 * @returns 是否设置成功
 */
export const setPublicKey = (publicKey: string): boolean => {
  // 如果已有公钥，不再更改（加密方式初始化后不可更改）
  if (cachedPublicKey !== null) {
    return false;
  }
  cachedPublicKey = publicKey;
  return true;
};

/**
 * 获取缓存的 RSA 公钥
 * @returns PEM 格式的 RSA 公钥或 null
 */
export const getPublicKey = (): string | null => {
  return cachedPublicKey;
};

/**
 * 清除缓存的 RSA 公钥
 */
export const clearPublicKey = (): void => {
  cachedPublicKey = null;
};

/**
 * 检查是否已有缓存的公钥
 * @returns boolean
 */
export const hasPublicKey = (): boolean => {
  return cachedPublicKey !== null;
};

/**
 * 将 PEM 格式的公钥导入为 CryptoKey
 * @param pem PEM 格式的 RSA 公钥
 * @returns CryptoKey 对象
 */
const importPublicKey = async (pem: string): Promise<CryptoKey> => {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");
  
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    "spki",
    uint8ArrayToArrayBuffer(binaryDer),
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["encrypt"]
  );
};

/**
 * 生成随机的 AES-256 密钥
 * @returns CryptoKey 对象
 */
const generateAesKey = async (): Promise<CryptoKey> => {
  return await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};

/**
 * 将 CryptoKey 导出为原始字节数组
 * @param key CryptoKey 对象
 * @returns Uint8Array
 */
const exportAesKey = async (key: CryptoKey): Promise<Uint8Array> => {
  const exported = await crypto.subtle.exportKey("raw", key);
  return new Uint8Array(exported);
};

/**
 * 将 Uint8Array 转换为 Base64 字符串
 * @param buffer Uint8Array
 * @returns Base64 字符串
 */
const arrayBufferToBase64 = (buffer: Uint8Array | ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

/**
 * 将 Base64 字符串转换为 Uint8Array
 * @param base64 Base64 字符串
 * @returns Uint8Array
 */
const base64ToArrayBuffer = (base64: string): Uint8Array => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

/**
 * 将 Uint8Array 转换为 ArrayBuffer（创建副本以确保数据正确）
 * @param uint8Array Uint8Array
 * @returns ArrayBuffer
 */
const uint8ArrayToArrayBuffer = (uint8Array: Uint8Array): ArrayBuffer => {
  return uint8Array.slice().buffer;
};

/**
 * 使用 RSA 公钥加密 AES 密钥
 * @param aesKey 原始 AES 密钥字节
 * @param publicKey PEM 格式的 RSA 公钥
 * @returns Base64 编码的加密密钥
 */
const encryptAesKeyWithRSA = async (
  aesKey: Uint8Array,
  publicKey: string
): Promise<string> => {
  const cryptoKey = await importPublicKey(publicKey);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    cryptoKey,
    uint8ArrayToArrayBuffer(aesKey)
  );
  return arrayBufferToBase64(encrypted);
};

/**
 * 使用 AES-GCM 加密数据
 * @param data 要加密的数据对象
 * @param key AES 密钥
 * @returns 包含密文和 nonce 的对象
 */
const encryptWithAES = async (
  data: any,
  key: CryptoKey
): Promise<{ ciphertext: string; nonce: string }> => {
  // 生成随机 nonce (IV)
  const nonce = crypto.getRandomValues(new Uint8Array(12));

  // 添加时间戳防止重放攻击
  const dataWithTimestamp = {
    ...data,
    _ts: Date.now(),
  };

  const encoder = new TextEncoder();
  const plaintext = encoder.encode(JSON.stringify(dataWithTimestamp));

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: uint8ArrayToArrayBuffer(nonce),
    },
    key,
    uint8ArrayToArrayBuffer(plaintext)
  );

  return {
    ciphertext: arrayBufferToBase64(ciphertext),
    nonce: arrayBufferToBase64(nonce),
  };
};

/**
 * 使用 AES-GCM 解密数据
 * @param ciphertext Base64 编码的密文
 * @param nonce Base64 编码的 nonce
 * @param key AES 密钥
 * @returns 解密后的数据对象
 */
const decryptWithAES = async (
  ciphertext: string,
  nonce: string,
  key: CryptoKey
): Promise<any> => {
  const ciphertextBuffer = base64ToArrayBuffer(ciphertext);
  const nonceBuffer = base64ToArrayBuffer(nonce);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: uint8ArrayToArrayBuffer(nonceBuffer),
    },
    key,
    uint8ArrayToArrayBuffer(ciphertextBuffer)
  );

  const decoder = new TextDecoder();
  const plaintext = decoder.decode(decrypted);
  return JSON.parse(plaintext);
};

/**
 * 加密请求数据
 * @param data 原始请求数据
 * @returns 加密后的数据和相关头部信息，包含 AES 密钥供后续解密使用
 */
export const encryptRequest = async (
  data: any
): Promise<{ encryptedData: string; encryptedKey: string; nonce: string; aesKey: CryptoKey } | null> => {
  if (!cachedPublicKey) {
    return null;
  }

  try {
    debugLog("========== 加密请求开始 ==========");
    debugLog("原始数据", data);
    debugLog("RSA 公钥", cachedPublicKey);

    const aesKey = await generateAesKey();

    const aesKeyRaw = await exportAesKey(aesKey);
    debugLog("AES 密钥 (Base64)", arrayBufferToBase64(aesKeyRaw));
    debugLog("AES 密钥 (Hex)", Array.from(aesKeyRaw).map(b => b.toString(16).padStart(2, '0')).join(''));

    const encryptedKey = await encryptAesKeyWithRSA(aesKeyRaw, cachedPublicKey);
    debugLog("RSA 加密后的 AES 密钥 (X-Encrypted-Key)", encryptedKey);

    const { ciphertext, nonce } = await encryptWithAES(data, aesKey);
    debugLog("AES 加密后的数据 (encryptedData)", ciphertext);
    debugLog("Nonce (X-Nonce)", nonce);

    debugLog("========== 加密请求结束 ==========");

    return {
      encryptedData: ciphertext,
      encryptedKey,
      nonce,
      aesKey,
    };
  } catch (error) {
    console.error("加密请求数据失败:", error);
    return null;
  }
};

/**
 * 解密响应数据
 * @param ciphertext Base64 编码的密文
 * @param nonce Base64 编码的 nonce（从 X-Response-Nonce 头获取）
 * @param aesKey AES 密钥（从加密请求时返回）
 * @returns 解密后的数据对象，如果解密失败则返回 null
 */
export const decryptResponse = async (
  ciphertext: string,
  nonce: string,
  aesKey: CryptoKey
): Promise<any | null> => {
  debugLog("========== 解密响应开始 ==========");
  debugLog("加密数据 (ciphertext)", ciphertext);
  debugLog("响应 Nonce (X-Response-Nonce)", nonce);

  try {
    const decrypted = await decryptWithAES(ciphertext, nonce, aesKey);
    debugLog("解密后的数据", decrypted);
    debugLog("========== 解密响应结束 ==========");
    return decrypted;
  } catch (error) {
    console.error("解密响应数据失败:", error);
    debugLog("解密错误", error);
    debugLog("========== 解密响应结束 ==========");
    return null;
  }
};

/**
 * 检查响应数据是否为加密格式
 * @param data 响应数据
 * @returns boolean
 */
export const isEncryptedResponse = (data: any): boolean => {
  return (
    typeof data === "string" &&
    data.length > 0 &&
    /^[A-Za-z0-9+/=]+$/.test(data)
  );
};
