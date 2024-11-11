// # 数据处理

// 模板字符串正则
const tempReg = /{{\s*([\w.]+)\s*}}/g
// 定义一个函数来解析模板字符串
const parseTemplate = (template: string, obj: Record<string, any>) => {
  return template.replace(tempReg, (_, match) => {
    const props = match.split('.')
    let value: any = obj
    for (const prop of props) {
      if (typeof value === 'object' && value !== null) {
        value = value[prop]
      } else {
        value = undefined
        break
      }
    }
    return value !== undefined ? String(value) : ''
  })
}

/**
 * 字段映射，支持模板{{}}
 */
export const fieldMapping = (fieldMap: Record<string, string>, data: any) => {
  // 检查data是否是数组
  const isDataArray = Array.isArray(data)

  // 根据data是数组还是对象，进行遍历
  const dataArray = isDataArray ? data : [data]
  dataArray.forEach((item) => {
    // 确保item是一个对象
    if (item && typeof item === 'object') {
      // 遍历字段映射
      for (const targetField in fieldMap) {
        const sourceFieldTemplate = fieldMap[targetField]
        // 如果源字段是一个模板字符串
        if (typeof sourceFieldTemplate === 'string' && tempReg.test(sourceFieldTemplate)) {
          // 解析模板字符串
          const sourceFieldValue = parseTemplate(sourceFieldTemplate, item)
          // 赋值到目标字段
          item[targetField] = sourceFieldValue
        } else {
          // 如果不是模板字符串，直接赋值
          item[targetField] = item[sourceFieldTemplate]
        }
      }
    }
  })

  // 如果原始数据是数组，返回修改的数据数组；否则返回修改后的对象
  return isDataArray ? data : dataArray[0]
}
