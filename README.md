# UniApp 高级请求库

## 项目简介

这是一个基于 UniApp 的请求库,提供了统一的接口调用方式,支持请求缓存、字段映射、请求合并等高级功能。主要用于优化前端接口调用体验,提高开发效率。

## 功能清单

- 统一的请求配置
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
// 格式定义
const API_HOST: {
   [key: string]: string;
} = {
   SITEHOST_API: "",
};
```

请求配置支持以下参数:
```typescript
{
   api: string; // 接口域名定义的Key
   url: string; // 接口地址，以/开头
   timeout?: number; // 超时时间,默认5秒，单位秒
   params?: { // 默认参数
      Option?: object; // 后端控制参数
      Query?: object; // 查询条件
      Data?: any; // 请求数据
   };
   hideErrorToast?: boolean; // 是否隐藏错误提示
   cacheTime?: number; // 缓存时间(秒),-1永久,0不缓存
   storage?: "memory" | "uni" | "session" | "local"; // 缓存位置
   authorize?: boolean; // 是否需要授权
   meta?: object; // 额外控制参数
   fieldMap?: object; // 字段映射配置Key/Value，根据Value字段名或者模板，获取结果，存入对象的新Key字段
   header?: object; // 自定义请求头
   before?: Function; // 请求前处理
   after?: Function; // 请求后处理
   trace?: boolean; // 是否跟踪调用链
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

#### 基础请求:
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

#### 高级请求方式:
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
```

#### 带缓存的查询请求:
```typescript
const res = await httpPost({
   api: 'SITEHOST_API',
   url: '/api/users/list',
   cacheTime: 60, // 缓存60秒
   storage: 'memory',
   params: {
      Query: {
         page: 1
      }
   }
})
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

## 注意事项

1. 接口域名配置需要在项目初始化时设置
2. POST查询请求未返回结果时，再次发送完全相同参数会自动合并重复请求，等待上次请求返回结果自动回调，适用于界面上多个完全的相同选择项的同时加载
3. 缓存key会自动根据请求URL和参数生成
4. 字段映射支持模板语法 `{{field}}`
5. 建议根据实际需求合理配置缓存策略
