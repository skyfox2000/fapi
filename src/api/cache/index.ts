import { CacheEntry, StorageType } from "@/types/typings.d";
import { generateKey } from "@/utils/data/keyGenerate";
// 内存缓存
const cache = new Map();

// 缓存模块
export const FrontCache = {
   // 使用 Map 存储内存中的缓存数据

   // 静态方法：设置缓存
   set(
      {
         key,
         params,
         fields,
         storage = "memory",
      }: {
         key: string;
         params?: Record<string, any>;
         fields?: string[];
         storage?: StorageType;
      },
      data: any,
      /**
       * -1 永久缓存
       */
      timeout: number = -1
   ): void {
      if (data === null || data === undefined) return;
      const cacheKey = generateKey(key, params, fields);
      const expireAt = timeout !== -1 ? Date.now() + timeout : undefined;
      const storageKey = `frontCache::${cacheKey}`;
      const cacheData = {
         data,
         expireAt,
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

   // 静态方法：获取缓存
   get({
      key,
      params,
      fields,
      storage = "memory",
   }: {
      key: string;
      params?: Record<string, any>;
      fields?: string[];
      storage?: StorageType;
   }): any | null {
      const cacheKey = generateKey(key, params, fields);
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

   // 静态方法：清除缓存
   remove({
      key,
      params,
      fields,
      storage = "memory",
   }: {
      key: string;
      params?: Record<string, any>;
      fields?: string[];
      storage?: StorageType;
   }): void {
      const cacheKey = generateKey(key, params, fields);
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
