// 全局要用的类型放到这里

import { ResponseType } from "axios";

/**
 * 缓存类型
 ** memory 内存
 ** local 本地永久
 ** session 本地会话
 ** uni uniapp的缓存
 */
export type StorageType = "memory" | "local" | "session" | "uni";

/**
 * 任意Json格式数据类型
 */
export type AnyJsonData =
   | Record<string, AnyJsonData>
   | Set
   | null
   | undefined
   | (AnyJsonData | boolean | string | number)[];

/**
 * 任意数据类型
 */
export type AnyData = AnyJsonData | boolean | string | number;
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
   /**
    * 最后修改时间
    */
   lastModified: number;
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

export type RequestOptions = {
   /**
    * 资源url
    */
   url: string;
   /**
    * 请求的参数
    */
   data?: any;
   /**
    * 设置请求的 header，header 中不能设置 Referer。
    * 在axios中自动转换为headers
    */
   header?: any;
   /**
    * 默认为 GET
    * 可以是：OPTIONS，GET，HEAD，POST，PUT，DELETE，TRACE，CONNECT
    */
   method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE";
   /**
    * 超时时间
    */
   timeout?: number;
   /**
    * 如果设为json，会尝试对返回的数据做一次 JSON.parse
    */
   dataType?: string;
   /**
    * 设置响应的数据类型。合法值：text、arraybuffer
    */
   responseType?: ResponseType;
   /**
    * 加载条文字信息
    */
   loadingText?: boolean | string;
   /**
    * 验证 ssl 证书
    */
   sslVerify?: boolean;
   /**
    * 跨域请求时是否携带凭证
    */
   withCredentials?: boolean;
   /**
    * DNS解析时优先使用 ipv4
    */
   firstIpv4?: boolean;
   /**
    * 开启 http2
    */
   enableHttp2?: boolean;
   /**
    * 开启 quic
    */
   enableQuic?: boolean;
   /**
    * 开启 cache
    */
   enableCache?: boolean;
   /**
    * 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html)
    */
   enableHttpDNS?: boolean;
   /**
    * HttpDNS 服务商 Id。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html)
    */
   httpDNSServiceId?: boolean;
   /**
    * 开启 transfer-encoding chunked
    */
   enableChunked?: boolean;
   /**
    * wifi下使用移动网络发送请求
    */
   forceCellularNetwork?: boolean;
   /**
    * 默认 false，开启后可在headers中编辑cookie（支付宝小程序10.2.33版本开始支持）
    */
   enableCookie?: boolean;
   /**
    * 控制当前请求是否延时至首屏内容渲染后发送
    */
   defer?: boolean;
   success?: (result: AjaxResponse) => void;
   /**
    * 失败的回调函数
    */
   fail?: (err: any) => void;
   /**
    * 结束的回调函数（调用成功、失败都会执行）
    */
   complete?: () => void;
};

/**
 * 接口标准返回结果
 */
export type ApiResponse<T = AnyData> = {
   /// 状态码
   status: ResStatus; /// success或者error
   errno?: number; /// error时的错误码
   msg?: string;
   timestamp?: string; /// 请求时间: yyyy-MM-dd HH:mm:ss
   data?: T | FindResult;
};

/**
 * 请求数据结构
 * @param Option 可选，后端控制配置
 * @param Query 可选，查询或者统计条件
 * @param Data 可选，需要保存或者处理的数据
 */
export type ReqParams<T = AnyData> = {
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
 * @example 查询请求过程执行次序
 * -> cache? 缓存判断获取返回
 * -> headers? 处理请求头数据
 * -> authorize? 添加授权Token
 * -> before? 请求预处理
 * -=> 发起实际请求
 * -> hideErrorToast? 错误提示
 * -> fieldMap? 前端字段转换
 * -> after? 结果处理
 * -> cache 缓存判断存储

 */
export type IUrlInfo = {
   /**
    * 接口域名
    */
   api?: string;
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
    ** session 本地会话
    ** uni uniapp的缓存
    */
   storage?: StorageType;
   /**
    * 是否需要授权Token
    * @param options 请求实际参数配置
    * @param urlInfo 前端请求配置
    * @param token 当前token
    * @returns 是否允许调用接口
    */
   authorize?:
      | boolean
      | ((
           options: RequestOptions,
           urlInfo: IUrlInfo,
           token: string
        ) => boolean);
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
    * @param config 请求参数
    */
   before?: (config: Record<string, any>) => void;
   /**
    * 调用后置处理
    * @param config 请求参数
    * @param result 结果数据
    */
   after?: (config: Record<string, any>, result: ApiResponse) => void;
   /**
    * 是否正在加载中
    */
   loading?: boolean;
   /**
    * 加载提示文字，设置为false时不显示，默认为通用文字
    */
   loadingText?: boolean | string;
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
