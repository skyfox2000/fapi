// 全局要用的类型放到这里
/**
 * 缓存类型
 ** memory 内存
 ** local 本地永久
 */
export type StorageType = "memory" | "uni" | "session" | "local";

export type AnyData =
   | Record<string, any>
   | Record<string, any>[]
   | AnyData[]
   | string
   | number
   | null
   | undefined;

export type AnyJsonData = Record<string, any> | AnyData[];
/**
 * 前端缓存
 */
export type CacheEntry = {
   /**
    * 缓存数据
    */
   data: AnyJsonData;
   /**
    * 是否JSON
    */
   json: boolean;
   /**
    * 超时时间
    */
   expireAt: number;
};

export type FindResult<T = Record<string, AnyData>> = {
   total: number;
   rows: T[];
};

export enum ResStatus {
   SUCCESS = "success",
   ERROR = "error",
}

export type AjaxResponse = {
   statusCode: number;
   data: AnyData;
};

/**
 * 接口标准返回结果
 */
export type ApiResponse<T = AnyData> = {
   /// 状态码
   status: ResStatus; /// success或者error
   errno: number; /// 错误码
   msg?: string;
   timestamp?: string; /// 请求时间: yyyy-MM-dd HH:mm:ss
   data?: T | FindResult;
};

/**
 * 请求数据结构
 * @param Option 可选，后端控制配置
 * @param Query 可选，查询或者统计条件
 * @param Data 可选，需要保存或者处理的数据
 * @param Callback 可选，结果回调接口，需要结果对象结构
 */
export type ReqParams = {
   /** 后端控制配置 */
   Option?: Record<string, any>;
   /** 查询或者统计条件 */
   Query?: Record<string, any>;
   /** 需要保存或者处理的数据 */
   Data?: AnyData;
};

/**
 * Url接口配置信息
 ** api: 接口域名
 ** url: 接口地址
 ** timeout?: 超时时间，默认5秒
 ** params?: 默认参数
 ** hideErrorToast?: 出错时是否隐藏错误提示
 ** cacheTime?: 缓存时长，默认0:不缓存，-1:永久缓存，其他:缓存时长(单位:秒)
 ** storage?: 缓存位置，默认为内存
 ** authorize?: 是否需要授权Token
 ** meta?: 额外控制参数
 ** fieldMap?: 前端字段转换，保留原字段
 ** headers?: 额外header配置
 ** before?: 调用前置处理
 ** after?: 调用后置处理
 ** trace?: 是否跟踪调用链，请求结果发送到运维服务器
 * @example 执行次序
 * Request
 * -> cache? 缓存判断获取返回
 * -> headers? 处理请求头数据
 * -> authorize? 添加授权Token
 * -> before? 请求预处理
 * -> hideErrorToast? 错误提示
 * -> fieldMap? 前端字段转换
 * -> after? 结果处理
 * -> cache 缓存判断存储
 */
export type IUrlInfo = {
   /**
    * 接口域名
    */
   api: string;
   /**
    * 接口地址
    */
   url: string;
   /**
    * 超时时间，默认5秒
    */
   timeout?: number;
   /**
    * 默认参数
    ** Option 默认控制
    ** Query 默认查询
    ** Data 默认数据
    */
   params?: ReqParams;
   /**
    * 出错时是否隐藏错误提示
    ** 默认false，默认显示
    */
   hideErrorToast?: boolean;
   /**
    * 缓存时长，
    * 默认0
    ** 0:不缓存
    ** 1:永久缓存
    ** 其他:缓存时长(单位:秒)
    */
   cacheTime?: number;
   /**
    * 缓存类型
    ** memory 内存
    ** local 本地永久
    */
   storage?: StorageType;
   /**
    * 是否需要授权Token
    */
   authorize?: boolean;
   /**
    * 额外前端执行控制参数，不发送
    */
   meta?: Record<string, any>;
   /**
    * 前端字段转换，保留原字段
    ** 支持数组/对象
    ** 支持模板{{属性名}}
    */
   fieldMap?: Record<string, string>;
   /**
    * 额外header配置
    */
   header?:
      | Record<string, string>
      | ((headers: Record<string, string>) => void);
   /**
    * 调用前置处理
    */
   before?: (config: Record<string, any>) => void;
   /**
    * 调用后置处理
    * @param result 结果数据
    * @param params 请求参数
    * @param urlInfo 请求地址配置
    */
   after?: (config: Record<string, any>, result: ApiResponse) => void;
   /**
    * 是否跟踪调用链，请求结果发送到运维服务器
    */
   trace?: boolean;
};

// uni.uploadFile文件上传参数
type IUniUploadFileOptions = {
   file?: File;
   files?: UniApp.UploadFileOptionFiles[];
   filePath?: string;
   name?: string;
   formData?: any;
};
