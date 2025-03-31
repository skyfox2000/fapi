import { CacheEntry, StorageType } from "@/types/typings.d";
import { generateKey } from "@/utils/data/keyGenerate";
// 内存缓存
const cache = new Map();

// 缓存模块
export const FrontCache = {
   // 静态方法：设置缓存
   /**
    * 设置缓存数据到指定的存储位置
    * @param {Object} options - 缓存配置选项
    * @param {string} options.key - 缓存数据的主键前缀
    * @param {Record<string, any>} [options.params] - 缓存参数，用于区分不同请求的缓存
    * @param {string[]} [options.fields] - 主键字段，用于构建复合主键
    * @param {number} [options.lastModified] - 最后修改时间的时间戳
    * @param {StorageType} [options.storage="memory"] - 缓存的存储位置，可以是
    * memory 内存
    * local 本地永久
    * session 本地会话
    * uni uniapp的缓存
    * @param {any} data - 要缓存的数据
    * @param {number} timeout - 缓存的超时时间（以秒为单位），-1表示永久缓存
    */
   set(
      {
         key,
         params,
         fields,
         fieldMap,
         lastModified,
         storage = "memory",
      }: {
         key: string;
         params?: Record<string, any>;
         fields?: string[];
         fieldMap?: Record<string, string>;
         lastModified?: number;
         storage?: StorageType;
      },
      data: any,
      timeout: number = -1
   ): void {
      if (data === null || data === undefined) return;
      const cacheKey = generateKey(key, params, fieldMap, fields);
      const expireAt = timeout !== -1 ? Date.now() + timeout : undefined;
      const storageKey = `frontCache::${cacheKey}`;
      const cacheData = {
         data,
         expireAt,
         lastModified: lastModified ?? Date.now(),
      };

      switch (storage) {
         case "memory":
            cache.set(storageKey, cacheData);
            break;
         case "uni":
            uni.setStorageSync(storageKey, JSON.stringify(cacheData));
            break;
         case "session":
            sessionStorage.setItem(storageKey, JSON.stringify(cacheData));
            break;
         case "local":
            localStorage.setItem(storageKey, JSON.stringify(cacheData));
            break;
      }
   },

   /**
    * 从指定的存储位置获取缓存数据
    * @param {Object} options - 获取缓存的配置选项
    * @param {string} options.key - 缓存数据的主键前缀
    * @param {Record<string, any>} [options.params] - 缓存参数，用于区分不同请求的缓存
    * @param {string[]} [options.fields] - 主键字段，用于构建复合主键
    * @param {StorageType} [options.storage="memory"] - 缓存的存储位置，可以是
    * memory 内存
    * local 本地永久
    * session 本地会话
    * uni uniapp的缓存
    * @return {any|null} 缓存的数据，如果未找到缓存则返回null
    */
   get({
      key,
      params,
      fields,
      fieldMap,
      storage = "memory",
   }: {
      key: string;
      params?: Record<string, any>;
      fields?: string[];
      fieldMap?: Record<string, string>;
      storage?: StorageType;
   }): any | null {
      const cacheKey = generateKey(key, params, fieldMap, fields);
      const storageKey = `frontCache::${cacheKey}`;
      let cacheEntry: CacheEntry | null = null;
      let stored = undefined;

      switch (storage) {
         case "memory":
            cacheEntry = cache.get(storageKey);
            break;
         case "uni":
            stored = uni.getStorageSync(storageKey);
            cacheEntry = stored ? JSON.parse(stored) : null;
            break;
         case "session":
            stored = sessionStorage.getItem(storageKey);
            cacheEntry = stored ? JSON.parse(stored) : null;
            break;
         case "local":
            stored = localStorage.getItem(storageKey);
            cacheEntry = stored ? JSON.parse(stored) : null;
            break;
      }

      if (
         cacheEntry &&
         (!cacheEntry.expireAt || cacheEntry.expireAt > Date.now())
      ) {
         return cacheEntry.data;
      } else {
         FrontCache.remove({ key, params, storage });
      }

      return null; // 缓存失效或不存在
   },

   /**
    * 从指定的存储位置清除缓存数据
    * @param {Object} options - 获取缓存的配置选项
    * @param {string} options.key - 缓存数据的主键前缀
    * @param {Record<string, any>} [options.params] - 缓存参数，用于区分不同请求的缓存
    * @param {string[]} [options.fields] - 主键字段，用于构建复合主键
    * @param {StorageType} [options.storage="memory"] - 缓存的存储位置，可以是
    * memory 内存
    * local 本地永久
    * session 本地会话
    * uni uniapp的缓存
    */
   remove({
      key,
      params,
      fields,
      fieldMap,
      storage = "memory",
   }: {
      key: string;
      params?: Record<string, any>;
      fields?: string[];
      fieldMap?: Record<string, string>;
      storage?: StorageType;
   }): void {
      const cacheKey = generateKey(key, params, fieldMap, fields);
      const storageKey = `frontCache::${cacheKey}`;

      switch (storage) {
         case "memory":
            cache.delete(storageKey);
            break;
         case "uni":
            uni.removeStorageSync(storageKey);
            break;
         case "session":
            sessionStorage.removeItem(storageKey);
            break;
         case "local":
            localStorage.removeItem(storageKey);
            break;
      }
   },
};
