var k = Object.defineProperty;
var E = (t, e, a) => e in t ? k(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var f = (t, e, a) => (E(t, typeof e != "symbol" ? e + "" : e, a), a);
import w from "crypto-js";
class A {
  constructor() {
    f(this, "defaultOptions", {
      icon: "none",
      duration: 3e3,
      mask: !1,
      position: "center"
    });
  }
  success(e = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "success",
      ...e,
      title: e.title || "操作成功"
    });
  }
  error(e = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "error",
      ...e,
      title: e.title || "操作失败"
    });
  }
  warning(e = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "none",
      ...e,
      title: e.title || "警告警告"
      // backgroundColor: '#FFC107',
      // color: '#fff',
    });
  }
  info(e = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "none",
      ...e,
      title: e.title || "提示信息"
      // backgroundColor: '#17A2B8',
      // color: '#fff',
    });
  }
  loading(e = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "loading",
      ...e,
      title: e.title || "数据加载中"
      // backgroundColor: '#17A2B8',
      // color: '#fff',
    });
  }
  hide() {
    uni.hideToast();
  }
  show(e) {
    uni.showToast(e);
  }
}
const h = new A();
var y = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(y || {});
const C = {
  SITEHOST_API: ""
}, R = {}, P = (t) => w.MD5(t).toString(), d = (t, e, a) => {
  if (!e)
    return t;
  let i = JSON.parse(JSON.stringify(e));
  a && a.length > 0 && (a[0].startsWith("-") ? a.forEach((r) => {
    if (r.indexOf(".") > -1) {
      const s = r.split(".");
      let o = i;
      for (let n = 0; n < s.length && (n === s.length - 1 && delete o[s[n]], typeof o[s[n]] == "object" && !Array.isArray(o[s[n]])); n++)
        o = o[s[n]];
    } else
      delete i[r];
  }) : (i = {}, a.forEach((r) => {
    if (r.indexOf(".") > -1) {
      const s = r.split(".");
      let o = e, n = i;
      for (let l = 0; l < s.length; l++)
        if (l === s.length - 1)
          n[s[l]] = o[s[l]];
        else {
          if (o[s[l]] === null || o[s[l]] === void 0)
            break;
          if (n[s[l]] === void 0)
            if (typeof o[s[l]] != "object" || Array.isArray(o[s[l]])) {
              n[s[l]] = o[s[l]];
              break;
            } else
              n[s[l]] = {};
          n = n[s[l]], o = o[s[l]];
        }
    } else
      i[r] = e[r];
  })));
  const c = JSON.stringify(i);
  return `${t}-` + P(c);
}, u = /* @__PURE__ */ new Map(), S = {
  // 使用 Map 存储内存中的缓存数据
  // 静态方法：设置缓存
  set({
    key: t,
    params: e,
    fields: a,
    storage: i = "memory"
  }, c, r = -1) {
    if (c == null)
      return;
    const s = d(t, e, a), o = r !== -1 ? Date.now() + r : void 0, n = `frontCache::${s}`, l = {
      data: c,
      expireAt: o
    };
    switch (i) {
      case "memory":
        u.set(n, l);
        break;
      case "uni":
        uni.setStorageSync(n, JSON.stringify(l));
        break;
      case "session":
        sessionStorage.setItem(n, JSON.stringify(l));
        break;
      case "local":
        localStorage.setItem(n, JSON.stringify(l));
        break;
    }
  },
  // 静态方法：获取缓存
  get({
    key: t,
    params: e,
    fields: a,
    storage: i = "memory"
  }) {
    const r = `frontCache::${d(t, e, a)}`;
    let s = null, o;
    switch (i) {
      case "memory":
        s = u.get(r);
        break;
      case "uni":
        o = uni.getStorageSync(r), s = o ? JSON.parse(o) : null;
        break;
      case "session":
        o = sessionStorage.getItem(r), s = o ? JSON.parse(o) : null;
        break;
      case "local":
        o = localStorage.getItem(r), s = o ? JSON.parse(o) : null;
        break;
    }
    return s && (!s.expireAt || s.expireAt > Date.now()) ? s.data : (S.remove({ key: t, params: e, storage: i }), null);
  },
  // 静态方法：清除缓存
  remove({
    key: t,
    params: e,
    fields: a,
    storage: i = "memory"
  }) {
    const r = `frontCache::${d(t, e, a)}`;
    switch (i) {
      case "memory":
        u.delete(r);
        break;
      case "uni":
        uni.removeStorageSync(r);
        break;
      case "session":
        sessionStorage.removeItem(r);
        break;
      case "local":
        localStorage.removeItem(r);
        break;
    }
  }
}, b = {
  url: "",
  header: { "Content-Type": "application/json" }
}, m = {}, D = (t) => {
  Object.assign(b, t);
}, O = (t, e) => {
  const a = JSON.parse(JSON.stringify(b));
  return new Promise((i) => {
    let c = !0;
    h.loading(), typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(a.header)), Object.assign(a, t), console.log(a), e.before && e.before.call(e, a), uni.request({
      ...a,
      success: (r) => {
        if (r.statusCode >= 200 && r.statusCode < 300) {
          const s = r.data;
          if (s.status === y.SUCCESS) {
            const o = s.data;
            a.method === "POST" && e.fieldMap && o && N(e.fieldMap, o), e.after && e.after.call(e, s, a), i(s);
          } else
            e.hideErrorToast || (console.error(s), h.error({
              title: s.msg || "请求错误",
              duration: 3e3
            }), c = !0), i(s);
        } else {
          let s;
          const o = r.statusCode;
          switch (o) {
            case 401:
              s = "未授权或授权过期";
              break;
            case 403:
              s = "无权访问";
              break;
            case 404:
              s = "请求地址错误";
              break;
            case 500:
              s = "服务器异常";
              break;
            default:
              s = "其它请求错误";
              break;
          }
          const n = {
            status: y.ERROR,
            errno: o + 1e3,
            msg: s
          };
          e.hideErrorToast || (console.error(n), h.error({ title: s }), c = !0), i(n);
        }
      },
      fail: (r) => {
        console.error(r), h.error({ title: "网络错误" }), c = !0, i({
          status: y.ERROR,
          errno: 1e3,
          msg: "网络错误"
        });
      },
      complete: () => {
        c || setTimeout(() => {
          h.hide();
        }, 300);
      }
    });
  });
}, p = (t, e) => {
  if (t.method === "POST") {
    if (e.cacheTime) {
      const r = S.get({
        ...e,
        key: e.url,
        params: e.params,
        fields: ["Query", "Option.SelectFields"]
      });
      if (r)
        return Promise.resolve(r);
    }
    const a = d(t.url, e.params, [
      "Query",
      "Option.SelectFields"
    ]), i = m[a];
    if (i)
      return new Promise((r) => {
        i.then(r);
      });
    const c = O(t, e).then((r) => ((r == null ? void 0 : r.status) === y.SUCCESS && e.cacheTime && S.set(
      {
        ...e,
        key: e.url,
        params: e.params,
        fields: ["Query", "Option.SelectFields"]
      },
      r == null ? void 0 : r.data,
      e.cacheTime
    ), r)).finally(() => {
      delete m[a];
    });
    return m[a] = c, c;
  } else
    return O(t, e);
}, g = (t) => {
  let { api: e, url: a } = t;
  return !a.startsWith("http://") && !a.startsWith("https://") && (a = C[e] + a), a;
}, v = (t) => {
  const e = g(t);
  return p(
    {
      url: e,
      method: "GET",
      timeout: t.timeout || 5e3
    },
    t
  );
}, F = (t, e) => {
  const a = g(t);
  return p(
    {
      url: a,
      dataType: "json",
      method: "PUT",
      data: e,
      timeout: t.timeout || 5e3
    },
    t
  );
}, x = (t, e) => {
  const a = g(t);
  return p(
    {
      url: a,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout || 5e3
    },
    t
  );
}, q = (t, e) => {
  const a = g(t);
  return p(
    {
      url: a,
      dataType: "json",
      method: "POST",
      data: e,
      timeout: t.timeout || 5e3
    },
    t
  );
}, T = /{{\s*([\w.]+)\s*}}/g, K = (t, e) => t.replace(T, (a, i) => {
  const c = i.split(".");
  let r = e;
  for (const s of c)
    if (typeof r == "object" && r !== null)
      r = r[s];
    else {
      r = void 0;
      break;
    }
  return r !== void 0 ? String(r) : "";
}), N = (t, e) => {
  const a = Array.isArray(e), i = a ? e : [e];
  return i.forEach((c) => {
    if (c && typeof c == "object")
      for (const r in t) {
        const s = t[r];
        if (typeof s == "string" && T.test(s)) {
          const o = K(s, c);
          c[r] = o;
        } else
          c[r] = c[s];
      }
  }), a ? e : i[0];
}, M = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
export {
  C as API_HOST,
  y as ResStatus,
  R as SERVER_HOST,
  N as fieldMapping,
  D as globalRequestOption,
  x as httpDelete,
  v as httpGet,
  q as httpPost,
  F as httpPut,
  M as isJSON,
  h as toast
};
