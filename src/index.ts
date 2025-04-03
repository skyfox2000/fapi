// 从types/typings.d导出类型
export type {
  StorageType,
  AnyJsonData,
  AnyData,
  FindResult,
  ApiResponse,
  ReqParams,
  IUrlInfo
} from "@/types/typings.d"

// 从types/typings.d导出枚举
export { ResStatus } from "@/types/typings.d"

// 从api导出
export { globalRequestOption } from "@/api/index"

// 从api/cache导出
export { FrontCache } from "@/api/cache/index"

// 从api/api导出
export type { API_HOST_EXTEND } from "@/api/api"
export { API_HOST } from "@/api/api"

// 从api/host导出
export { SERVER_HOST, ICON_HOST } from "@/api/host"

// 从api/uni.request导出
export {
  uniGet,
  uniPut,
  uniDelete,
  uniPost
} from "@/api/uni.request"

// 从api/axios.request导出
export {
  httpGet,
  httpPut,
  httpDelete,
  httpPost
} from "@/api/axios.request"

// 从utils/call/auth导出
export { getToken, setToken } from "@/utils/call/auth"

// 从utils/data导出
export { deepClone } from "@/utils/data/deepClone"
export { fieldMapping, parseFieldTemplate } from "@/utils/data/fieldMap"
export { isJSON } from "@/utils/data/isJSON"
export { hostUrl } from "@/utils/data/url"

// 导入并重新导出toast
import toast from "@/utils/toast"
export { toast }
