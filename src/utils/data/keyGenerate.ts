import MD5 from "./md5";
// 静态方法：生成哈希键
export const hashKey = (input: string): string => {
   return MD5(input);
};

// 静态方法：根据条件获取键
export const generateKey = (
   key: string,
   params?: Record<string, any>,
   fields?: string[]
): string => {
   if (!params) return key;
   // 创建params的拷贝，以避免修改原始对象
   let keyParams: Record<string, any> = JSON.parse(JSON.stringify(params));

   if (fields && fields.length > 0) {
      // 遍历fields数组，根据"+"或"-"来决定是否包含属性，只能是一种类型
      if (fields[0].startsWith("-")) {
         // 删除属性
         fields.forEach((field) => {
            if (field.indexOf(".") > -1) {
               // 删除子属性
               const subKeys = field.split(".");
               let target = keyParams;
               for (let i = 0; i < subKeys.length; i++) {
                  if (i === subKeys.length - 1) delete target[subKeys[i]];
                  if (
                     typeof target[subKeys[i]] === "object" &&
                     !Array.isArray(target[subKeys[i]])
                  ) {
                     target = target[subKeys[i]];
                  } else break;
               }
            } else delete keyParams[field];
         });
      } else {
         // 使用包含指定属性
         keyParams = {};
         fields.forEach((field) => {
            if (field.indexOf(".") > -1) {
               // 添加子属性
               const subKeys = field.split(".");
               let source = params;
               let target = keyParams;
               for (let i = 0; i < subKeys.length; i++) {
                  if (i === subKeys.length - 1) {
                     target[subKeys[i]] = source[subKeys[i]];
                  } else if (
                     source[subKeys[i]] === null ||
                     source[subKeys[i]] === undefined
                  ) {
                     break;
                  } else {
                     if (target[subKeys[i]] === undefined) {
                        if (
                           typeof source[subKeys[i]] !== "object" ||
                           Array.isArray(source[subKeys[i]])
                        ) {
                           target[subKeys[i]] = source[subKeys[i]];
                           break;
                        } else target[subKeys[i]] = {};
                     }
                     target = target[subKeys[i]];
                     source = source[subKeys[i]];
                  }
               }
            } else keyParams[field] = params[field];
         });
      }
   }

   // 将处理后的cacheParams对象转换为字符串
   const cacheKey = JSON.stringify(keyParams);

   // 使用hashKey方法进行哈希处理
   return `${key}-` + hashKey(cacheKey);
};
