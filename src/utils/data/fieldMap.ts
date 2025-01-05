// # 数据处理

// 定义正则表达式来匹配 ${...} 占位符
const tempReg = /\$\{([\w\.\[\]0-9]+)\}/g;

/**
 * 解析模板字符串，替换占位符为实际数据
 * @param template 模板字符串
 * @param data 数据对象
 */
function parseTemplate(template: string, data: Record<string, any>): string {
   return template.replace(tempReg, (match: string, key: string) => {
      const keys = key.split(".");
      let value: any = data;

      for (const k of keys) {
         if (k.includes("[") && k.includes("]")) {
            // 处理数组索引访问
            const arrayKey = k.split("[")[0];
            const index = parseInt(k.split("[")[1].split("]")[0]);
            value = value[arrayKey]?.[index];
         } else {
            value = value?.[k];
         }

         if (value === undefined) {
            return match;
         }
      }

      return String(value);
   });
}

/**
 * 字段映射，支持模板{{}}
 * @param fieldMap 映射配置 { 转换后字段: 转换前或转换模板 }
 * @param data 数据：对象或者对象数组
 * @returns 转换结果
 */
export const fieldMapping = (fieldMap: Record<string, string>, data: any) => {
   // 检查data是否是数组
   const isDataArray = Array.isArray(data);

   // 根据data是数组还是对象，进行遍历
   const dataArray = isDataArray ? data : [data];
   dataArray.forEach((item) => {
      // 确保item是一个对象
      if (item && typeof item === "object") {
         // 遍历字段映射
         for (const targetField in fieldMap) {
            const sourceFieldTemplate = fieldMap[targetField];
            // 如果源字段是一个模板字符串
            if (
               typeof sourceFieldTemplate === "string" &&
               tempReg.test(sourceFieldTemplate)
            ) {
               // 解析模板字符串
               const sourceFieldValue = parseTemplate(
                  sourceFieldTemplate,
                  item
               );
               // 赋值到目标字段
               item[targetField] = sourceFieldValue;
            } else {
               // 如果不是模板字符串，直接赋值
               item[targetField] = item[sourceFieldTemplate];
            }
         }
      }
   });

   // 如果原始数据是数组，返回修改的数据数组；否则返回修改后的对象
   return isDataArray ? data : dataArray[0];
};
