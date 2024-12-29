# UniApp 高级请求库

## 项目简介

这是一个基于 UniApp 和 Axios 的请求库,提供了统一的接口调用方式,支持请求缓存、字段映射、请求合并等高级功能。主要用于优化前端接口调用体验,提高开发效率。

## 安装方式
```shell
npm install -S @skyfox2000/fapi
```

## 功能清单

- 统一的请求配置，支持uni.request和axios两种方式
- HTTP 请求方法支持(GET/POST/PUT/DELETE)
- 请求缓存管理
- 相同请求合并
- 请求参数配置化
- 字段映射转换
- 统一的错误提示/可关闭
- 支持请求前置/后置处理
- Toast 提示集成

## 功能使用说明

### 1. 基础请求配置
配置API_HOST接口域名参数
```typescript
// 接口域名的格式定义
const API_HOST: {
   [key: string]: string;
} = {
   SITEHOST_API: "",
};
```

请求配置支持以下参数:
```typescript
/**
 * 请求数据结构
 * @param Option 可选，后端控制配置
 * @param Query 可选，查询或者统计条件
 * @param Data 可选，需要保存或者处理的数据
 */
export type ReqParams = {
   /** 后端控制配置 */
   Option?: Record<string, any>;
   /** 查询或者统计条件 */
   Query?: Record<string, any>;
   /** 需要保存或者处理的数据 */
   Data?: AnyData;
};

{
   /**
    * API_HOST接口域名的Key
    */
   api: string;
   /**
    * 接口地址，以/开头
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
    ** 默认false，默认发生错误立即显示
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
    * 是否跟踪调用链，请求结果发送到运维服务器
    */
   trace?: boolean;
}
```

查询请求过程执行次序
 * -> cache? 缓存判断获取返回
 * -> headers? 处理请求头数据
 * -> authorize? 添加授权Token
 * -> before? 请求预处理
 * -=> 发起实际请求
 * -> hideErrorToast? 错误提示
 * -> fieldMap? 前端字段转换
 * -> after? 结果处理
 * -> cache 缓存判断存储

### 2. 基础使用示例

#### 2.1 基础请求:
```typescript
// PUT请求
const res = await httpPut({
   api: 'SITEHOST_API',
   url: '/api/users',
   params: {
      Data: {
         name: 'test'
      }
   }
})
// POST请求，查询
const res = await httpPost({
   api: 'SITEHOST_API',
   url: '/api/users',
   params: {
      Query: {
         name: 'test'
      }
   }
})
```

#### 2.2 高级请求方式:
配置接口列表进行统一管理，调用时，使用接口名即可，方便统一管理修改
```typescript
import { IUrlInfo } from '@skyfox2000/fapi'

/** 站点相关接口 */
export const HostUrlList: {
  /** 站点信息 */
  host: IUrlInfo
} = {
  host: {
    api: 'SITEHOST_API',
    url: '/openapi/RCSiteHostSrv/get',
    fieldMap: {
      hostId: 'Id',
      hostName: 'Name',
    },
  },
}

export const AppUrlList: {
  /** 获取应用信息 */
  appInfo: IUrlInfo
} = {
  appInfo: {
    api: 'SITEHOST_API',
    url: '/api/RCApplicationSrv/get',
    fieldMap: {
      appId: 'Id',
      appName: 'Name',
    },
  },
}

/// 调用方法
const res = await httpPost(HostUrlList.host,  { Query: { Mobile: mobile } } )
```

#### 2.3 带缓存的查询请求:
```typescript
export const UserUrlList: {
  /** 用户信息 */
  list: IUrlInfo
} = {
  list: {
    api: 'SITEHOST_API',
    url: '/api/users/list',
    cacheTime: 60, // 缓存60秒
    storage: 'memory',
    params: { /// 默认参数，合并数据
      Query: {
         page: 1
      }
    }
  },
}

/// 调用方法
const res = await httpPost(UserUrlList.list,  { Query: { Mobile: mobile } } )
```

### 3. 响应数据格式
```typescript
{
   status: ResStatus.SUCCESS | ResStatus.ERROR; // 响应状态
   errno: number; // 错误码
   msg?: string; // 提示信息
   timestamp?: string; // 响应时间
   data?: T | { // 响应数据
      total: number; // 记录总数
      rows: T[]; // 数据列表
   };
}
```


### 4. 错误处理

库内置了统一的错误处理机制:

- HTTP 状态错误(401/403/404/500等)
- 网络请求错误
- 业务错误(后端返回的错误信息)

默认会通过 Toast 提示错误信息,可以通过 `hideErrorToast` 配置关闭。

### 5. 缓存管理

支持多种缓存方式:

- memory: 内存缓存
- uni: UniApp Storage
- session: 会话缓存
- local: 本地永久缓存

可以通过 `cacheTime` 和 `storage` 参数配置缓存策略。

### 6. 前置处理和后置处理

#### 6.1 前置处理可修改请求参数:
```typescript
export const AppUrlList: {
  /** 获取应用信息 */
  appInfo: IUrlInfo
} = {
  appInfo: {
    api: 'SITEHOST_API',
    url: '/api/RCApplicationSrv/get',
    before: (config: Record<string, any>) => {
      // config为request的请求参数
    }
  },
}
```

#### 6.2 后置处理可修改请求返回结果:
```typescript
export const AppUrlList: {
  /** 获取应用信息 */
  appInfo: IUrlInfo
} = {
  appInfo: {
    api: 'SITEHOST_API',
    url: '/api/RCApplicationSrv/get',
    after: (config: Record<string, any>, result: ApiResponse) => {
      // config为request的请求参数
      // result为返回结果
    }
  },
}
```

## 注意事项

1. 接口域名配置需要在项目初始化时设置
2. POST查询请求未返回结果时，再次发送完全相同参数会自动合并重复请求，等待上次请求返回结果自动回调，适用于界面上多个完全的相同选择项的同时加载
3. 缓存key会自动根据请求URL和参数生成
4. 字段映射支持模板语法 `{{field}}`
5. 建议根据实际需求合理配置缓存策略
6. package.json配置注意
```json
///类型提示
{
   "exports": {
      ".": {
         "types": "./lib/index.d.ts", /// 必须加在前面，否则类型提示会有问题
         "default": "./lib/fapi.es.js"
      }
   }
}
```