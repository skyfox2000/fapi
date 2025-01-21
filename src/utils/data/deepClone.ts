export const deepClone = <T>(obj: T): T => {
   // 处理基本类型和 null
   if (obj === null || typeof obj !== "object") {
      return obj;
   }

   // 处理函数
   if (typeof obj === "function") {
      return obj; // 直接返回函数引用
   }

   // 处理数组
   if (Array.isArray(obj)) {
      const arrCopy: any[] = [];
      for (let i = 0; i < obj.length; i++) {
         arrCopy[i] = deepClone(obj[i]);
      }
      return arrCopy as T;
   }

   // 处理对象
   const objCopy: Record<string, any> = {};
   for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
         objCopy[key] = deepClone(obj[key]);
      }
   }
   return objCopy as T;
};
