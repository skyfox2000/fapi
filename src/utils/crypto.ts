/**
 * 加密通信工具模块
 * 支持 RSA 公钥加密和 AES-GCM 对称加密
 * 优先使用 Web Crypto API (crypto.subtle)，不支持时降级到 node-forge
 */

import { isLogEnabled } from "@/utils/log";
import forge from "node-forge";

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
 * 检查是否支持 Web Crypto API
 * 使用 try-catch 防止在某些浏览器环境中访问 crypto.subtle 时抛出错误
 * @returns boolean
 */
const isWebCryptoSupported = (): boolean => {
  try {
    return (
      typeof crypto !== "undefined" &&
      crypto !== null &&
      typeof crypto.subtle !== "undefined" &&
      crypto.subtle !== null &&
      typeof crypto.subtle.generateKey === "function"
    );
  } catch (e) {
    // 在某些严格模式或特殊浏览器环境中，访问 crypto.subtle 可能抛出错误
    return false;
  }
};

/**
 * 检查当前是否是 HTTPS 环境
 * @returns boolean
 */
const isHttps = (): boolean => {
  try {
    return typeof window !== "undefined" && window.location.protocol === "https:";
  } catch (e) {
    return false;
  }
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

// ==================== Web Crypto API 实现 (HTTPS 环境) ====================

/**
 * 将 PEM 格式的公钥导入为 CryptoKey
 * @param pem PEM 格式的 RSA 公钥
 * @returns CryptoKey 对象
 */
const importPublicKeyWebCrypto = async (pem: string): Promise<CryptoKey> => {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");
  
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    "spki",
    binaryDer.buffer.slice(binaryDer.byteOffset, binaryDer.byteOffset + binaryDer.byteLength),
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
const generateAesKeyWebCrypto = async (): Promise<CryptoKey> => {
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
const exportAesKeyWebCrypto = async (key: CryptoKey): Promise<Uint8Array> => {
  const exported = await crypto.subtle.exportKey("raw", key);
  return new Uint8Array(exported);
};

/**
 * 使用 RSA 公钥加密 AES 密钥
 * @param aesKey 原始 AES 密钥字节
 * @param publicKey PEM 格式的 RSA 公钥
 * @returns Base64 编码的加密密钥
 */
const encryptAesKeyWithRSAWebCrypto = async (
  aesKey: Uint8Array,
  publicKey: string
): Promise<string> => {
  const cryptoKey = await importPublicKeyWebCrypto(publicKey);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    cryptoKey,
    aesKey.buffer.slice(aesKey.byteOffset, aesKey.byteOffset + aesKey.byteLength) as ArrayBuffer
  );
  return arrayBufferToBase64(encrypted);
};

/**
 * 使用 AES-GCM 加密数据
 * @param data 要加密的数据对象
 * @param key AES 密钥 (CryptoKey 或 Uint8Array)
 * @returns 包含密文和 nonce 的对象
 */
const encryptWithAESWebCrypto = async (
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
      iv: nonce,
    },
    key,
    plaintext
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
 * @param key AES 密钥 (CryptoKey)
 * @returns 解密后的数据对象
 */
const decryptWithAESWebCrypto = async (
  ciphertext: string,
  nonce: string,
  key: CryptoKey
): Promise<any> => {
  const ciphertextBuffer = base64ToArrayBuffer(ciphertext);
  const nonceBuffer = base64ToArrayBuffer(nonce);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: nonceBuffer.slice(),
    },
    key,
    ciphertextBuffer.slice()
  );

  const decoder = new TextDecoder();
  const plaintext = decoder.decode(decrypted);
  return JSON.parse(plaintext);
};

// ==================== node-forge 降级实现 (HTTP 环境或不支持 Web Crypto API) ====================

/**
 * 使用 RSA 公钥加密 AES 密钥（node-forge 实现）
 * 使用 RSA-OAEP 算法（SHA-256）
 * @param aesKey 原始 AES 密钥字节
 * @param publicKey PEM 格式的 RSA 公钥
 * @returns Base64 编码的加密密钥
 */
const encryptAesKeyWithRSAFallback = (
  aesKey: Uint8Array,
  publicKey: string
): string => {
  // 解析 PEM 公钥
  const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);

  // 将 Uint8Array 转换为字符串
  const aesKeyString = String.fromCharCode.apply(null, Array.from(aesKey));

  // 使用 RSA-OAEP 加密（SHA-256）
  const encrypted = publicKeyObj.encrypt(aesKeyString, "RSA-OAEP", {
    md: forge.md.sha256.create(),
  });

  return forge.util.encode64(encrypted);
};

/**
 * 生成随机的 AES-256 密钥（node-forge 实现）
 * @returns 32 字节的随机密钥
 */
const generateAesKeyFallback = (): Uint8Array => {
  const keyBytes = forge.random.getBytesSync(32);
  return Uint8Array.from(keyBytes.split("").map((c) => c.charCodeAt(0)));
};

/**
 * 使用 AES-GCM 加密数据（node-forge 实现）
 * @param data 要加密的数据对象
 * @param key AES 密钥（32 字节 Uint8Array）
 * @returns 包含密文和 nonce 的对象
 */
const encryptWithAESFallback = (
  data: any,
  key: Uint8Array
): { ciphertext: string; nonce: string } => {
  // 生成随机 nonce (12 字节用于 AES-GCM)
  const nonceBytes = forge.random.getBytesSync(12);

  // 添加时间戳防止重放攻击
  const dataWithTimestamp = {
    ...data,
    _ts: Date.now(),
  };

  const plaintext = JSON.stringify(dataWithTimestamp);

  // 将 Uint8Array 密钥转换为字符串
  const keyString = String.fromCharCode.apply(null, Array.from(key));

  // 创建 AES-GCM 加密实例
  const cipher = forge.cipher.createCipher("AES-GCM", keyString);

  // 初始化 cipher
  cipher.start({
    iv: forge.util.createBuffer(nonceBytes),
  });

  // 更新 cipher
  cipher.update(forge.util.createBuffer(plaintext, "utf8"));

  // 完成加密
  cipher.finish();

  // 获取密文和认证标签
  const ciphertext = cipher.output.getBytes();
  const tag = cipher.mode.tag.getBytes();

  // 将密文和认证标签拼接（Web Crypto API 格式：密文 + 标签）
  const encryptedData = ciphertext + tag;

  return {
    ciphertext: forge.util.encode64(encryptedData),
    nonce: forge.util.encode64(nonceBytes),
  };
};

/**
 * 使用 AES-GCM 解密数据（node-forge 实现）
 * @param ciphertext Base64 编码的密文（包含认证标签）
 * @param nonce Base64 编码的 nonce
 * @param key AES 密钥（32 字节 Uint8Array）
 * @returns 解密后的数据对象
 */
const decryptWithAESFallback = (
  ciphertext: string,
  nonce: string,
  key: Uint8Array
): any => {
  // 解码 Base64
  const encryptedData = forge.util.decode64(ciphertext);
  const nonceBytes = forge.util.decode64(nonce);

  // 分离密文和认证标签（最后 16 字节是标签）
  const ciphertextBytes = encryptedData.slice(0, -16);
  const tagBytes = encryptedData.slice(-16);

  // 将 Uint8Array 密钥转换为字符串
  const keyString = String.fromCharCode.apply(null, Array.from(key));

  // 创建 AES-GCM 解密实例
  const decipher = forge.cipher.createDecipher("AES-GCM", keyString);

  // 初始化 decipher
  decipher.start({
    iv: forge.util.createBuffer(nonceBytes),
    tag: forge.util.createBuffer(tagBytes),
  });

  // 更新 decipher
  decipher.update(forge.util.createBuffer(ciphertextBytes));

  // 完成解密
  const success = decipher.finish();

  if (!success) {
    throw new Error("AES-GCM decryption failed: authentication tag mismatch");
  }

  const plaintext = decipher.output.toString();
  return JSON.parse(plaintext);
};

// ==================== 统一的加密接口 ====================

/**
 * 判断是否应该使用 Web Crypto API
 * HTTP 环境强制使用降级方案，HTTPS 环境检测支持情况
 * @returns boolean
 */
const shouldUseWebCrypto = (): boolean => {
  // HTTP 环境强制使用降级方案
  if (!isHttps()) {
    return false;
  }
  // HTTPS 环境检测是否支持 Web Crypto API
  return isWebCryptoSupported();
};

/**
 * 加密请求数据
 * @param data 原始请求数据
 * @returns 加密后的数据和相关头部信息，包含 AES 密钥供后续解密使用
 */
export const encryptRequest = async (
  data: any
): Promise<{ encryptedData: string; encryptedKey: string; nonce: string; aesKey: Uint8Array; useWebCrypto: boolean } | null> => {
  if (!cachedPublicKey) {
    return null;
  }

  try {
    debugLog("========== 加密请求开始 ==========");
    debugLog("原始数据", data);
    debugLog("RSA 公钥", cachedPublicKey);

    const useWebCrypto = shouldUseWebCrypto();
    debugLog("使用 Web Crypto API:", useWebCrypto);

    // 生成 AES 密钥
    let aesKeyRaw: Uint8Array;
    let encryptedData: string;
    let nonce: string;
    let encryptedKey: string;

    if (useWebCrypto) {
      // 使用 Web Crypto API (HTTPS 环境且支持)
      const aesKey = await generateAesKeyWebCrypto();
      aesKeyRaw = await exportAesKeyWebCrypto(aesKey);
      debugLog("AES 密钥 (Base64)", arrayBufferToBase64(aesKeyRaw));

      encryptedKey = await encryptAesKeyWithRSAWebCrypto(aesKeyRaw, cachedPublicKey);
      debugLog("RSA 加密后的 AES 密钥 (X-Encrypted-Key)", encryptedKey);

      const result = await encryptWithAESWebCrypto(data, aesKey);
      encryptedData = result.ciphertext;
      nonce = result.nonce;
      debugLog("AES 加密后的数据 (encryptedData)", encryptedData);
      debugLog("Nonce (X-Nonce)", nonce);
    } else {
      // 使用降级方案 (HTTP 环境或不支持 Web Crypto API)
      debugLog("使用降级方案 (node-forge)");

      aesKeyRaw = generateAesKeyFallback();
      debugLog("AES 密钥 (Base64)", arrayBufferToBase64(aesKeyRaw));

      encryptedKey = encryptAesKeyWithRSAFallback(aesKeyRaw, cachedPublicKey);
      debugLog("RSA 加密后的 AES 密钥 (X-Encrypted-Key)", encryptedKey);

      const result = encryptWithAESFallback(data, aesKeyRaw);
      encryptedData = result.ciphertext;
      nonce = result.nonce;
      debugLog("AES 加密后的数据 (encryptedData)", encryptedData);
      debugLog("Nonce (X-Nonce)", nonce);
    }

    debugLog("========== 加密请求结束 ==========");

    return {
      encryptedData,
      encryptedKey,
      nonce,
      aesKey: aesKeyRaw,
      useWebCrypto,
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
 * @param aesKey AES 密钥（Uint8Array 格式）
 * @param useWebCrypto 是否使用 Web Crypto API 加密（决定解密方式）
 * @returns 解密后的数据对象，如果解密失败则返回 null
 */
export const decryptResponse = async (
  ciphertext: string,
  nonce: string,
  aesKey: Uint8Array,
  useWebCrypto: boolean
): Promise<any | null> => {
  debugLog("========== 解密响应开始 ==========");
  debugLog("加密数据 (ciphertext)", ciphertext);
  debugLog("响应 Nonce (X-Response-Nonce)", nonce);
  debugLog("使用 Web Crypto API:", useWebCrypto);

  try {
    let decrypted: any;

    if (useWebCrypto) {
      // 使用 Web Crypto API 解密
      // 需要重新导入密钥
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        aesKey.buffer.slice(aesKey.byteOffset, aesKey.byteOffset + aesKey.byteLength) as ArrayBuffer,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
      decrypted = await decryptWithAESWebCrypto(ciphertext, nonce, cryptoKey);
    } else {
      // 使用降级方案解密
      decrypted = decryptWithAESFallback(ciphertext, nonce, aesKey);
    }

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
