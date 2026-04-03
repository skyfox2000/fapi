var Ke = Object.defineProperty;
var Ue = (e, t, r) => t in e ? Ke(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ue = (e, t, r) => Ue(e, typeof t != "symbol" ? t + "" : t, r);
import oe from "vue-m-message";
import De from "axios";
var z = /* @__PURE__ */ ((e) => (e.SUCCESS = "success", e.ERROR = "error", e))(z || {});
let I = null, W = null;
const v = (e, t) => {
  Je() && (t !== void 0 ? t instanceof Uint8Array ? console.log(`[Crypto Debug] ${e}:`, $(t)) : typeof t == "object" ? console.log(`[Crypto Debug] ${e}:`, JSON.stringify(t, null, 2)) : console.log(`[Crypto Debug] ${e}:`, t) : console.log(`[Crypto Debug] ${e}`));
}, Me = (e) => I !== null ? !1 : (I = e, !0), Ne = () => I !== null, Fe = async (e) => {
  const o = e.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace(/\s/g, ""), s = Uint8Array.from(atob(o), (u) => u.charCodeAt(0));
  return await crypto.subtle.importKey(
    "spki",
    ee(s),
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    !1,
    ["encrypt"]
  );
}, je = async () => await crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  !0,
  ["encrypt", "decrypt"]
), Oe = async (e) => {
  const t = await crypto.subtle.exportKey("raw", e);
  return new Uint8Array(t);
}, $ = (e) => {
  const t = new Uint8Array(e);
  let r = "";
  for (let o = 0; o < t.byteLength; o++)
    r += String.fromCharCode(t[o]);
  return btoa(r);
}, be = (e) => {
  const t = atob(e), r = new Uint8Array(t.length);
  for (let o = 0; o < t.length; o++)
    r[o] = t.charCodeAt(o);
  return r;
}, ee = (e) => e.slice().buffer, qe = async (e, t) => {
  const r = await Fe(t), o = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    r,
    ee(e)
  );
  return $(o);
}, ze = async (e, t) => {
  const r = crypto.getRandomValues(new Uint8Array(12)), o = {
    ...e,
    _ts: Date.now()
  }, u = new TextEncoder().encode(JSON.stringify(o)), i = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: ee(r)
    },
    t,
    ee(u)
  );
  return {
    ciphertext: $(i),
    nonce: $(r)
  };
}, Xe = async (e, t, r) => {
  const o = be(e), s = be(t), u = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ee(s)
    },
    r,
    ee(o)
  ), c = new TextDecoder().decode(u);
  return JSON.parse(c);
}, Ge = async (e) => {
  if (!I)
    return null;
  try {
    v("========== 加密请求开始 =========="), v("原始数据", e), v("RSA 公钥", I);
    const t = await je();
    W = t;
    const r = await Oe(t);
    v("AES 密钥 (Base64)", $(r)), v("AES 密钥 (Hex)", Array.from(r).map((i) => i.toString(16).padStart(2, "0")).join(""));
    const o = await qe(r, I);
    v("RSA 加密后的 AES 密钥 (X-Encrypted-Key)", o);
    const { ciphertext: s, nonce: u } = await ze(e, t);
    return v("AES 加密后的数据 (encryptedData)", s), v("Nonce (X-Nonce)", u), v("========== 加密请求结束 =========="), {
      encryptedData: s,
      encryptedKey: o,
      nonce: u
    };
  } catch (t) {
    return console.error("加密请求数据失败:", t), W = null, null;
  }
}, Ve = async (e, t) => {
  if (!W)
    return v("解密失败: 没有可用的 AES 密钥"), null;
  try {
    v("========== 解密响应开始 =========="), v("加密数据 (ciphertext)", e), v("Nonce (X-Response-Nonce)", t);
    const r = await Oe(W);
    v("解密使用的 AES 密钥 (Base64)", $(r)), v("解密使用的 AES 密钥 (Hex)", Array.from(r).map((s) => s.toString(16).padStart(2, "0")).join(""));
    const o = await Xe(e, t, W);
    return v("解密后的数据", o), v("========== 解密响应结束 =========="), W = null, o;
  } catch (r) {
    return console.error("解密响应数据失败:", r), v("解密错误", r), W = null, null;
  }
}, We = (e) => typeof e == "string" && e.length > 0 && /^[A-Za-z0-9+/=]+$/.test(e);
let D = {
  enabled: !1,
  includeApis: [],
  excludeApis: [],
  includeHostKeys: [],
  excludeHostKeys: []
};
const kt = (e) => {
  D = {
    ...D,
    ...e,
    enabled: !0
  };
}, Je = () => D.debug === !0, Qe = () => Ne(), Ye = (e, t) => {
  if (!Qe() || t && D.excludeHostKeys && D.excludeHostKeys.length > 0 && D.excludeHostKeys.includes(t) || D.includeHostKeys && D.includeHostKeys.length > 0 && (!t || !D.includeHostKeys.includes(t)))
    return !1;
  if (D.excludeApis && D.excludeApis.length > 0) {
    for (const r of D.excludeApis)
      if (typeof r == "string") {
        if (e.includes(r))
          return !1;
      } else if (r instanceof RegExp && r.test(e))
        return !1;
  }
  if (!D.includeApis || D.includeApis.length === 0)
    return !0;
  for (const r of D.includeApis)
    if (typeof r == "string") {
      if (e.includes(r))
        return !0;
    } else if (r instanceof RegExp && r.test(e))
      return !0;
  return !1;
}, Be = {
  header: { "Content-Type": "application/json" }
};
let xe, Le;
const Ot = (e) => {
  const { before: t, after: r, ...o } = e;
  t && (xe = t), r && (Le = r), Object.assign(Be, o);
}, Ze = () => Be, Ie = () => xe, te = () => Le, se = (e) => {
  if (e === null || typeof e != "object" || typeof e == "function")
    return e;
  if (Array.isArray(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r[o] = se(e[o]);
    return r;
  }
  const t = {};
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = se(e[r]));
  return t;
}, $e = (e, t) => e << t | e >>> 32 - t, et = (e) => {
  const t = [];
  for (let w = 0; w < e.length; w++)
    t.push(e.charCodeAt(w));
  const r = t.length * 8;
  for (t.push(128); t.length * 8 % 512 !== 448; )
    t.push(0);
  t.push(r >>> 24 & 255), t.push(r >>> 16 & 255), t.push(r >>> 8 & 255), t.push(r & 255);
  let o = 1732584193, s = 4023233417, u = 2562383102, i = 271733878;
  const c = (w, A, S) => w & A | ~w & S, g = (w, A, S) => w & S | A & ~S, p = (w, A, S) => w ^ A ^ S, T = (w, A, S) => A ^ (w | ~S), P = [
    3614090360,
    3905402710,
    606105819,
    3250441966,
    4118548399,
    1200080426,
    2821735955,
    4249261313,
    1770035416,
    2336552879,
    4294925233,
    2304563134,
    1804603682,
    4254626195,
    2792965006,
    1236535329,
    4129170786,
    3225465664,
    643717713,
    3921069994,
    3593408605,
    38016083,
    3634488961,
    3889429448,
    568446438,
    3275163606,
    4107603335,
    1163531501,
    2850285829,
    4243563512,
    1735328473,
    2368359562,
    4294588738,
    2272392833,
    1839030562,
    4259657740,
    2763975236,
    1272893353,
    4139469664,
    3200236656,
    681279174,
    3936430074,
    3572445317,
    76029189,
    3654602809,
    3873151461,
    530742520,
    3299628645,
    4096336452,
    1126891415,
    2878612391,
    4237533241,
    1700485571,
    2399980690,
    4293915773,
    2240044497,
    1873313359,
    4264355552,
    2734768916,
    1309151649,
    4149444226,
    3174756917,
    718787259,
    3951481745
  ], F = [
    7,
    12,
    17,
    22,
    7,
    12,
    17,
    22,
    7,
    12,
    17,
    22,
    7,
    12,
    17,
    22,
    5,
    9,
    14,
    20,
    5,
    9,
    14,
    20,
    5,
    9,
    14,
    20,
    5,
    9,
    14,
    20,
    4,
    11,
    16,
    23,
    4,
    11,
    16,
    23,
    4,
    11,
    16,
    23,
    4,
    11,
    16,
    23,
    6,
    10,
    15,
    21,
    6,
    10,
    15,
    21,
    6,
    10,
    15,
    21,
    6,
    10,
    15,
    21
  ];
  let N = 0;
  for (; N < t.length; ) {
    const w = new Array(16).fill(0);
    for (let h = 0; h < 16; h++)
      w[h] = t[N + h] || 0;
    let A = o, S = s, O = u, x = i;
    for (let h = 0; h < 64; h++) {
      let l, b, E;
      h < 16 ? (l = c(S, O, x), b = h) : h < 32 ? (l = g(S, O, x), b = (5 * h + 1) % 16) : h < 48 ? (l = p(S, O, x), b = (3 * h + 5) % 16) : (l = T(S, O, x), b = 7 * h % 16), E = x, x = O, O = S, S = S + $e(A + l + P[h] + w[b] | 0, F[h]), A = E;
    }
    o = o + A | 0, s = s + S | 0, u = u + O | 0, i = i + x | 0, N += 16;
  }
  return [o, s, u, i].map((w) => {
    const A = w & 255, S = w >>> 8 & 255, O = w >>> 16 & 255;
    return [w >>> 24 & 255, O, S, A];
  }).flat().map((w) => w.toString(16).padStart(2, "0")).join("");
}, tt = (e) => et(e), ie = (e, t, r, o) => {
  if (!t) return e;
  let s = se(t);
  r && (s.FieldMap = r), o && o.length > 0 && (o[0].startsWith("-") ? o.forEach((i) => {
    if (i.indexOf(".") > -1) {
      const c = i.split(".");
      let g = s;
      for (let p = 0; p < c.length && (p === c.length - 1 && delete g[c[p]], typeof g[c[p]] == "object" && !Array.isArray(g[c[p]])); p++)
        g = g[c[p]];
    } else delete s[i];
  }) : (s = {}, o.forEach((i) => {
    if (i.indexOf(".") > -1) {
      const c = i.split(".");
      let g = t, p = s;
      for (let T = 0; T < c.length; T++)
        if (T === c.length - 1)
          p[c[T]] = g[c[T]];
        else {
          if (g[c[T]] === null || g[c[T]] === void 0)
            break;
          if (p[c[T]] === void 0)
            if (typeof g[c[T]] != "object" || Array.isArray(g[c[T]])) {
              p[c[T]] = g[c[T]];
              break;
            } else p[c[T]] = {};
          p = p[c[T]], g = g[c[T]];
        }
    } else s[i] = t[i];
  })));
  const u = JSON.stringify(s);
  return `${e}-` + tt(u);
}, le = /* @__PURE__ */ new Map(), de = {
  // 静态方法：设置缓存
  /**
   * 设置缓存数据到指定的存储位置
   * @param {Object} options - 缓存配置选项
   * @param {string} options.key - 缓存数据的主键前缀
   * @param {Record<string, any>} [options.params] - 缓存参数，用于区分不同请求的缓存
   * @param {string[]} [options.fields] - 主键字段，用于构建复合主键
   * @param {number} [options.lastModified] - 最后修改时间的时间戳
   * @param {StorageType} [options.storage="memory"] - 缓存的存储位置，可以是
   * memory 内存
   * local 本地永久
   * session 本地会话
   * uni uniapp的缓存
   * @param {any} data - 要缓存的数据
   * @param {number} timeout - 缓存的超时时间（以秒为单位），-1表示永久缓存
   */
  set({
    key: e,
    params: t,
    fields: r,
    fieldMap: o,
    lastModified: s,
    storage: u = "memory"
  }, i, c = -1) {
    if (i == null) return;
    const g = ie(e, t, o, r), p = c !== -1 ? Date.now() + c : void 0, T = `frontCache::${g}`, P = {
      data: i,
      expireAt: p,
      lastModified: s ?? Date.now()
    };
    switch (u) {
      case "memory":
        le.set(T, P);
        break;
      case "uni":
        uni.setStorageSync(T, JSON.stringify(P));
        break;
      case "session":
        sessionStorage.setItem(T, JSON.stringify(P));
        break;
      case "local":
        localStorage.setItem(T, JSON.stringify(P));
        break;
    }
  },
  /**
   * 从指定的存储位置获取缓存数据
   * @param {Object} options - 获取缓存的配置选项
   * @param {string} options.key - 缓存数据的主键前缀
   * @param {Record<string, any>} [options.params] - 缓存参数，用于区分不同请求的缓存
   * @param {string[]} [options.fields] - 主键字段，用于构建复合主键
   * @param {StorageType} [options.storage="memory"] - 缓存的存储位置，可以是
   * memory 内存
   * local 本地永久
   * session 本地会话
   * uni uniapp的缓存
   * @return {any|null} 缓存的数据，如果未找到缓存则返回null
   */
  get({
    key: e,
    params: t,
    fields: r,
    fieldMap: o,
    storage: s = "memory"
  }) {
    const i = `frontCache::${ie(e, t, o, r)}`;
    let c = null, g;
    switch (s) {
      case "memory":
        c = le.get(i);
        break;
      case "uni":
        g = uni.getStorageSync(i), c = g ? JSON.parse(g) : null;
        break;
      case "session":
        g = sessionStorage.getItem(i), c = g ? JSON.parse(g) : null;
        break;
      case "local":
        g = localStorage.getItem(i), c = g ? JSON.parse(g) : null;
        break;
    }
    return c && (!c.expireAt || c.expireAt > Date.now()) ? c.data : (de.remove({ key: e, params: t, storage: s }), null);
  },
  /**
   * 从指定的存储位置清除缓存数据
   * @param {Object} options - 获取缓存的配置选项
   * @param {string} options.key - 缓存数据的主键前缀
   * @param {Record<string, any>} [options.params] - 缓存参数，用于区分不同请求的缓存
   * @param {string[]} [options.fields] - 主键字段，用于构建复合主键
   * @param {StorageType} [options.storage="memory"] - 缓存的存储位置，可以是
   * memory 内存
   * local 本地永久
   * session 本地会话
   * uni uniapp的缓存
   */
  remove({
    key: e,
    params: t,
    fields: r,
    fieldMap: o,
    storage: s = "memory"
  }) {
    const i = `frontCache::${ie(e, t, o, r)}`;
    switch (s) {
      case "memory":
        le.delete(i);
        break;
      case "uni":
        uni.removeStorageSync(i);
        break;
      case "session":
        sessionStorage.removeItem(i);
        break;
      case "local":
        localStorage.removeItem(i);
        break;
    }
  }
}, rt = {
  SITEHOST_API: ""
}, Bt = {}, xt = {};
class nt {
  constructor() {
    ue(this, "currentToast", []);
    ue(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "info",
      mask: !1,
      position: "center",
      zIndex: 9999
    });
  }
  showToast(t, r, o, s) {
    const u = typeof r == "string" ? r : r.title || o;
    this.show({
      ...this.defaultOptions,
      icon: t,
      duration: s || this.defaultOptions.duration,
      title: u
    });
  }
  success(t) {
    this.showToast("success", t, "Operation Successful");
  }
  error(t) {
    this.showToast("error", t, "Operation Failed", 5e3);
  }
  warning(t) {
    this.showToast("warning", t, "Warning", 5e3);
  }
  info(t) {
    this.showToast("info", t, "Information");
  }
  loading(t) {
    this.showToast("loading", t, "Loading Data", -1);
  }
  hide(t) {
    t = t || 0;
    const r = this.currentToast.map((o) => o.id);
    t === 0 ? this.close(r) : setTimeout(() => this.close(r), t);
  }
  close(t) {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : (t.forEach((r) => {
      var o;
      (o = this.currentToast.find((s) => s.id === r)) == null || o.close();
    }), this.currentToast = this.currentToast.filter(
      (r) => !t.includes(r.id)
    ));
  }
  show(t) {
    const { title: r, icon: o, mask: s, duration: u, position: i } = t;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...t,
        title: r,
        icon: o === "warning" ? "error" : o,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: u,
        position: i,
        mask: t.mask,
        success: t.success,
        fail: t.fail,
        complete: t.complete
      });
    else
      switch (this.hide(), o) {
        case "success":
          this.currentToast.push(
            oe.success(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: s,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "error":
          this.currentToast.push(
            oe.error(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: s,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "loading":
          this.currentToast.push(
            oe.loading(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: s,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        default:
          this.currentToast.push(
            oe.info(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: s,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
      }
  }
}
const q = new nt(), X = (e) => {
  let { api: t, url: r, authorize: o } = e;
  if (r.startsWith("http://") || r.startsWith("https://") || !t)
    return r;
  const s = rt[t];
  if (!s)
    return q.error("API domain not found: " + t), !1;
  if (typeof s == "string")
    return s + r;
  if (typeof s == "object") {
    const { host: u, authorize: i } = s;
    return (o === void 0 || o === !1) && (e.authorize = i), r = u + r, r;
  }
  return r;
};
var me = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Y = {}, j = {}, L = {}, m = {}, we;
function st() {
  if (we) return m;
  we = 1, Object.defineProperty(m, "__esModule", { value: !0 }), m.toBig = m.shrSL = m.shrSH = m.rotrSL = m.rotrSH = m.rotrBL = m.rotrBH = m.rotr32L = m.rotr32H = m.rotlSL = m.rotlSH = m.rotlBL = m.rotlBH = m.add5L = m.add5H = m.add4L = m.add4H = m.add3L = m.add3H = void 0, m.add = S, m.fromBig = r, m.split = o;
  const e = /* @__PURE__ */ BigInt(2 ** 32 - 1), t = /* @__PURE__ */ BigInt(32);
  function r(f, a = !1) {
    return a ? { h: Number(f & e), l: Number(f >> t & e) } : { h: Number(f >> t & e) | 0, l: Number(f & e) | 0 };
  }
  function o(f, a = !1) {
    const d = f.length;
    let _ = new Uint32Array(d), R = new Uint32Array(d);
    for (let K = 0; K < d; K++) {
      const { h: J, l: Q } = r(f[K], a);
      [_[K], R[K]] = [J, Q];
    }
    return [_, R];
  }
  const s = (f, a) => BigInt(f >>> 0) << t | BigInt(a >>> 0);
  m.toBig = s;
  const u = (f, a, d) => f >>> d;
  m.shrSH = u;
  const i = (f, a, d) => f << 32 - d | a >>> d;
  m.shrSL = i;
  const c = (f, a, d) => f >>> d | a << 32 - d;
  m.rotrSH = c;
  const g = (f, a, d) => f << 32 - d | a >>> d;
  m.rotrSL = g;
  const p = (f, a, d) => f << 64 - d | a >>> d - 32;
  m.rotrBH = p;
  const T = (f, a, d) => f >>> d - 32 | a << 64 - d;
  m.rotrBL = T;
  const P = (f, a) => a;
  m.rotr32H = P;
  const F = (f, a) => f;
  m.rotr32L = F;
  const N = (f, a, d) => f << d | a >>> 32 - d;
  m.rotlSH = N;
  const k = (f, a, d) => a << d | f >>> 32 - d;
  m.rotlSL = k;
  const w = (f, a, d) => a << d - 32 | f >>> 64 - d;
  m.rotlBH = w;
  const A = (f, a, d) => f << d - 32 | a >>> 64 - d;
  m.rotlBL = A;
  function S(f, a, d, _) {
    const R = (a >>> 0) + (_ >>> 0);
    return { h: f + d + (R / 2 ** 32 | 0) | 0, l: R | 0 };
  }
  const O = (f, a, d) => (f >>> 0) + (a >>> 0) + (d >>> 0);
  m.add3L = O;
  const x = (f, a, d, _) => a + d + _ + (f / 2 ** 32 | 0) | 0;
  m.add3H = x;
  const h = (f, a, d, _) => (f >>> 0) + (a >>> 0) + (d >>> 0) + (_ >>> 0);
  m.add4L = h;
  const l = (f, a, d, _, R) => a + d + _ + R + (f / 2 ** 32 | 0) | 0;
  m.add4H = l;
  const b = (f, a, d, _, R) => (f >>> 0) + (a >>> 0) + (d >>> 0) + (_ >>> 0) + (R >>> 0);
  m.add5L = b;
  const E = (f, a, d, _, R, K) => a + d + _ + R + K + (f / 2 ** 32 | 0) | 0;
  m.add5H = E;
  const B = {
    fromBig: r,
    split: o,
    toBig: s,
    shrSH: u,
    shrSL: i,
    rotrSH: c,
    rotrSL: g,
    rotrBH: p,
    rotrBL: T,
    rotr32H: P,
    rotr32L: F,
    rotlSH: N,
    rotlSL: k,
    rotlBH: w,
    rotlBL: A,
    add: S,
    add3L: O,
    add3H: x,
    add4L: h,
    add4H: l,
    add5H: E,
    add5L: b
  };
  return m.default = B, m;
}
var fe = {}, re = {}, Ae;
function ot() {
  return Ae || (Ae = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.crypto = void 0, re.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), re;
}
var Se;
function it() {
  return Se || (Se = 1, (function(e) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(e, "__esModule", { value: !0 }), e.wrapXOFConstructorWithOpts = e.wrapConstructorWithOpts = e.wrapConstructor = e.Hash = e.nextTick = e.swap32IfBE = e.byteSwapIfBE = e.swap8IfBE = e.isLE = void 0, e.isBytes = r, e.anumber = o, e.abytes = s, e.ahash = u, e.aexists = i, e.aoutput = c, e.u8 = g, e.u32 = p, e.clean = T, e.createView = P, e.rotr = F, e.rotl = N, e.byteSwap = k, e.byteSwap32 = w, e.bytesToHex = O, e.hexToBytes = l, e.asyncLoop = E, e.utf8ToBytes = B, e.bytesToUtf8 = f, e.toBytes = a, e.kdfInputToBytes = d, e.concatBytes = _, e.checkOpts = R, e.createHasher = J, e.createOptHasher = Q, e.createXOFer = V, e.randomBytes = ve;
    const t = /* @__PURE__ */ ot();
    function r(n) {
      return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
    }
    function o(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function s(n, ...y) {
      if (!r(n))
        throw new Error("Uint8Array expected");
      if (y.length > 0 && !y.includes(n.length))
        throw new Error("Uint8Array expected of length " + y + ", got length=" + n.length);
    }
    function u(n) {
      if (typeof n != "function" || typeof n.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      o(n.outputLen), o(n.blockLen);
    }
    function i(n, y = !0) {
      if (n.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (y && n.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function c(n, y) {
      s(n);
      const H = y.outputLen;
      if (n.length < H)
        throw new Error("digestInto() expects output buffer of length at least " + H);
    }
    function g(n) {
      return new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
    }
    function p(n) {
      return new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4));
    }
    function T(...n) {
      for (let y = 0; y < n.length; y++)
        n[y].fill(0);
    }
    function P(n) {
      return new DataView(n.buffer, n.byteOffset, n.byteLength);
    }
    function F(n, y) {
      return n << 32 - y | n >>> y;
    }
    function N(n, y) {
      return n << y | n >>> 32 - y >>> 0;
    }
    e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    function k(n) {
      return n << 24 & 4278190080 | n << 8 & 16711680 | n >>> 8 & 65280 | n >>> 24 & 255;
    }
    e.swap8IfBE = e.isLE ? (n) => n : (n) => k(n), e.byteSwapIfBE = e.swap8IfBE;
    function w(n) {
      for (let y = 0; y < n.length; y++)
        n[y] = k(n[y]);
      return n;
    }
    e.swap32IfBE = e.isLE ? (n) => n : w;
    const A = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", S = /* @__PURE__ */ Array.from({ length: 256 }, (n, y) => y.toString(16).padStart(2, "0"));
    function O(n) {
      if (s(n), A)
        return n.toHex();
      let y = "";
      for (let H = 0; H < n.length; H++)
        y += S[n[H]];
      return y;
    }
    const x = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function h(n) {
      if (n >= x._0 && n <= x._9)
        return n - x._0;
      if (n >= x.A && n <= x.F)
        return n - (x.A - 10);
      if (n >= x.a && n <= x.f)
        return n - (x.a - 10);
    }
    function l(n) {
      if (typeof n != "string")
        throw new Error("hex string expected, got " + typeof n);
      if (A)
        return Uint8Array.fromHex(n);
      const y = n.length, H = y / 2;
      if (y % 2)
        throw new Error("hex string expected, got unpadded hex of length " + y);
      const C = new Uint8Array(H);
      for (let U = 0, M = 0; U < H; U++, M += 2) {
        const pe = h(n.charCodeAt(M)), ge = h(n.charCodeAt(M + 1));
        if (pe === void 0 || ge === void 0) {
          const Pe = n[M] + n[M + 1];
          throw new Error('hex string expected, got non-hex character "' + Pe + '" at index ' + M);
        }
        C[U] = pe * 16 + ge;
      }
      return C;
    }
    const b = async () => {
    };
    e.nextTick = b;
    async function E(n, y, H) {
      let C = Date.now();
      for (let U = 0; U < n; U++) {
        H(U);
        const M = Date.now() - C;
        M >= 0 && M < y || (await (0, e.nextTick)(), C += M);
      }
    }
    function B(n) {
      if (typeof n != "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(n));
    }
    function f(n) {
      return new TextDecoder().decode(n);
    }
    function a(n) {
      return typeof n == "string" && (n = B(n)), s(n), n;
    }
    function d(n) {
      return typeof n == "string" && (n = B(n)), s(n), n;
    }
    function _(...n) {
      let y = 0;
      for (let C = 0; C < n.length; C++) {
        const U = n[C];
        s(U), y += U.length;
      }
      const H = new Uint8Array(y);
      for (let C = 0, U = 0; C < n.length; C++) {
        const M = n[C];
        H.set(M, U), U += M.length;
      }
      return H;
    }
    function R(n, y) {
      if (y !== void 0 && {}.toString.call(y) !== "[object Object]")
        throw new Error("options should be object or undefined");
      return Object.assign(n, y);
    }
    class K {
    }
    e.Hash = K;
    function J(n) {
      const y = (C) => n().update(a(C)).digest(), H = n();
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = () => n(), y;
    }
    function Q(n) {
      const y = (C, U) => n(U).update(a(C)).digest(), H = n({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (C) => n(C), y;
    }
    function V(n) {
      const y = (C, U) => n(U).update(a(C)).digest(), H = n({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (C) => n(C), y;
    }
    e.wrapConstructor = J, e.wrapConstructorWithOpts = Q, e.wrapXOFConstructorWithOpts = V;
    function ve(n = 32) {
      if (t.crypto && typeof t.crypto.getRandomValues == "function")
        return t.crypto.getRandomValues(new Uint8Array(n));
      if (t.crypto && typeof t.crypto.randomBytes == "function")
        return Uint8Array.from(t.crypto.randomBytes(n));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(fe)), fe;
}
var Te;
function at() {
  if (Te) return L;
  Te = 1, Object.defineProperty(L, "__esModule", { value: !0 }), L.shake256 = L.shake128 = L.keccak_512 = L.keccak_384 = L.keccak_256 = L.keccak_224 = L.sha3_512 = L.sha3_384 = L.sha3_256 = L.sha3_224 = L.Keccak = void 0, L.keccakP = A;
  const e = /* @__PURE__ */ st(), t = /* @__PURE__ */ it(), r = BigInt(0), o = BigInt(1), s = BigInt(2), u = BigInt(7), i = BigInt(256), c = BigInt(113), g = [], p = [], T = [];
  for (let h = 0, l = o, b = 1, E = 0; h < 24; h++) {
    [b, E] = [E, (2 * b + 3 * E) % 5], g.push(2 * (5 * E + b)), p.push((h + 1) * (h + 2) / 2 % 64);
    let B = r;
    for (let f = 0; f < 7; f++)
      l = (l << o ^ (l >> u) * c) % i, l & s && (B ^= o << (o << /* @__PURE__ */ BigInt(f)) - o);
    T.push(B);
  }
  const P = (0, e.split)(T, !0), F = P[0], N = P[1], k = (h, l, b) => b > 32 ? (0, e.rotlBH)(h, l, b) : (0, e.rotlSH)(h, l, b), w = (h, l, b) => b > 32 ? (0, e.rotlBL)(h, l, b) : (0, e.rotlSL)(h, l, b);
  function A(h, l = 24) {
    const b = new Uint32Array(10);
    for (let E = 24 - l; E < 24; E++) {
      for (let a = 0; a < 10; a++)
        b[a] = h[a] ^ h[a + 10] ^ h[a + 20] ^ h[a + 30] ^ h[a + 40];
      for (let a = 0; a < 10; a += 2) {
        const d = (a + 8) % 10, _ = (a + 2) % 10, R = b[_], K = b[_ + 1], J = k(R, K, 1) ^ b[d], Q = w(R, K, 1) ^ b[d + 1];
        for (let V = 0; V < 50; V += 10)
          h[a + V] ^= J, h[a + V + 1] ^= Q;
      }
      let B = h[2], f = h[3];
      for (let a = 0; a < 24; a++) {
        const d = p[a], _ = k(B, f, d), R = w(B, f, d), K = g[a];
        B = h[K], f = h[K + 1], h[K] = _, h[K + 1] = R;
      }
      for (let a = 0; a < 50; a += 10) {
        for (let d = 0; d < 10; d++)
          b[d] = h[a + d];
        for (let d = 0; d < 10; d++)
          h[a + d] ^= ~b[(d + 2) % 10] & b[(d + 4) % 10];
      }
      h[0] ^= F[E], h[1] ^= N[E];
    }
    (0, t.clean)(b);
  }
  class S extends t.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(l, b, E, B = !1, f = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = l, this.suffix = b, this.outputLen = E, this.enableXOF = B, this.rounds = f, (0, t.anumber)(E), !(0 < l && l < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200), this.state32 = (0, t.u32)(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      (0, t.swap32IfBE)(this.state32), A(this.state32, this.rounds), (0, t.swap32IfBE)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(l) {
      (0, t.aexists)(this), l = (0, t.toBytes)(l), (0, t.abytes)(l);
      const { blockLen: b, state: E } = this, B = l.length;
      for (let f = 0; f < B; ) {
        const a = Math.min(b - this.pos, B - f);
        for (let d = 0; d < a; d++)
          E[this.pos++] ^= l[f++];
        this.pos === b && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: l, suffix: b, pos: E, blockLen: B } = this;
      l[E] ^= b, (b & 128) !== 0 && E === B - 1 && this.keccak(), l[B - 1] ^= 128, this.keccak();
    }
    writeInto(l) {
      (0, t.aexists)(this, !1), (0, t.abytes)(l), this.finish();
      const b = this.state, { blockLen: E } = this;
      for (let B = 0, f = l.length; B < f; ) {
        this.posOut >= E && this.keccak();
        const a = Math.min(E - this.posOut, f - B);
        l.set(b.subarray(this.posOut, this.posOut + a), B), this.posOut += a, B += a;
      }
      return l;
    }
    xofInto(l) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(l);
    }
    xof(l) {
      return (0, t.anumber)(l), this.xofInto(new Uint8Array(l));
    }
    digestInto(l) {
      if ((0, t.aoutput)(l, this), this.finished)
        throw new Error("digest() was already called");
      return this.writeInto(l), this.destroy(), l;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = !0, (0, t.clean)(this.state);
    }
    _cloneInto(l) {
      const { blockLen: b, suffix: E, outputLen: B, rounds: f, enableXOF: a } = this;
      return l || (l = new S(b, E, B, a, f)), l.state32.set(this.state32), l.pos = this.pos, l.posOut = this.posOut, l.finished = this.finished, l.rounds = f, l.suffix = E, l.outputLen = B, l.enableXOF = a, l.destroyed = this.destroyed, l;
    }
  }
  L.Keccak = S;
  const O = (h, l, b) => (0, t.createHasher)(() => new S(l, h, b));
  L.sha3_224 = O(6, 144, 224 / 8), L.sha3_256 = O(6, 136, 256 / 8), L.sha3_384 = O(6, 104, 384 / 8), L.sha3_512 = O(6, 72, 512 / 8), L.keccak_224 = O(1, 144, 224 / 8), L.keccak_256 = O(1, 136, 256 / 8), L.keccak_384 = O(1, 104, 384 / 8), L.keccak_512 = O(1, 72, 512 / 8);
  const x = (h, l, b) => (0, t.createXOFer)((E = {}) => new S(l, h, E.dkLen === void 0 ? b : E.dkLen, !0));
  return L.shake128 = x(31, 168, 128 / 8), L.shake256 = x(31, 136, 256 / 8), L;
}
var Ee;
function ct() {
  if (Ee) return j;
  Ee = 1;
  const { sha3_512: e } = /* @__PURE__ */ at(), t = 24, r = 32, o = (k = 4, w = Math.random) => {
    let A = "";
    for (; A.length < k; )
      A = A + Math.floor(w() * 36).toString(36);
    return A;
  };
  function s(k) {
    let w = 8n, A = 0n;
    for (const S of k.values()) {
      const O = BigInt(S);
      A = (A << w) + O;
    }
    return A;
  }
  const u = (k = "") => s(e(k)).toString(36).slice(1), i = Array.from(
    { length: 26 },
    (k, w) => String.fromCharCode(w + 97)
  ), c = (k) => i[Math.floor(k() * i.length)], g = ({
    globalObj: k = typeof me < "u" ? me : typeof window < "u" ? window : {},
    random: w = Math.random
  } = {}) => {
    const A = Object.keys(k).toString(), S = A.length ? A + o(r, w) : o(r, w);
    return u(S).substring(0, r);
  }, p = (k) => () => k++, T = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: k = Math.random,
    counter: w = p(Math.floor(k() * T)),
    length: A = t,
    fingerprint: S = g({ random: k })
  } = {}) => function() {
    const x = c(k), h = Date.now().toString(36), l = w().toString(36), b = o(A, k), E = `${h + b + l + S}`;
    return `${x + u(E).substring(1, A)}`;
  }, F = P(), N = (k, { minLength: w = 2, maxLength: A = r } = {}) => {
    const S = k.length, O = /^[0-9a-z]+$/;
    try {
      if (typeof k == "string" && S >= w && S <= A && O.test(k))
        return !0;
    } finally {
    }
    return !1;
  };
  return j.getConstants = () => ({ defaultLength: t, bigLength: r }), j.init = P, j.createId = F, j.bufToBigInt = s, j.createCounter = p, j.createFingerprint = g, j.isCuid = N, j;
}
var ke;
function ut() {
  if (ke) return Y;
  ke = 1;
  const { createId: e, init: t, getConstants: r, isCuid: o } = ct();
  return Y.createId = e, Y.init = t, Y.getConstants = r, Y.isCuid = o, Y;
}
var lt = ut();
const ft = async (e, t) => {
  var o;
  if (!Ye(e.url || "", t.api) || ((o = e.method) == null ? void 0 : o.toUpperCase()) === "GET" || !e.data)
    return !1;
  try {
    const s = await Ge(e.data);
    if (s)
      return e.data = s.encryptedData, e.header || (e.header = {}), e.header["X-Encrypted-Key"] = s.encryptedKey, e.header["X-Nonce"] = s.nonce, !0;
  } catch (s) {
    console.error("请求加密失败:", s);
  }
  return !1;
}, dt = async (e) => {
  var r, o;
  const t = ((r = e.header) == null ? void 0 : r["x-response-nonce"]) || ((o = e.header) == null ? void 0 : o["X-Response-Nonce"]);
  if (t && e.data)
    try {
      if (We(e.data)) {
        const s = await Ve(e.data, t);
        if (s !== null)
          return s;
      }
    } catch (s) {
      console.error("响应解密失败:", s);
    }
  return e.data;
}, ht = (e) => {
  if (!e) return;
  const t = e["x-public-key"] || e["X-Public-Key"];
  t && (Me(t) || console.warn("[Crypto] 公钥已存在，忽略响应头中的公钥（加密方式初始化后不可更改）"));
}, He = /\$\{([\w\.\[\]0-9]+)\}/g, yt = (e, t) => e.replace(He, (r, o) => {
  var i;
  const s = o.split(".");
  let u = t;
  for (const c of s) {
    if (c.includes("[") && c.includes("]")) {
      const g = c.split("[")[0], p = parseInt(c.split("[")[1].split("]")[0]);
      u = (i = u[g]) == null ? void 0 : i[p];
    } else
      u = u[c];
    if (u === void 0)
      return r;
  }
  return String(u);
}), Ce = (e, t) => {
  const r = Array.isArray(t), o = r ? t : [t];
  return o.forEach((s) => {
    if (s && typeof s == "object") {
      for (const u in e) {
        const i = e[u];
        if (typeof i == "string" && He.test(i)) {
          const c = yt(
            i,
            s
          );
          s[u] = c;
        } else s[i] !== void 0 && (s[u] = s[i]);
      }
      s.children && Array.isArray(s.children) && (s.children = Ce(e, s.children));
    }
  }), r ? t : o[0];
};
let _e = "";
const pt = () => _e, Lt = (e) => {
  _e = e;
}, gt = (e) => e ? Array.isArray(e) ? e.length === 0 : typeof e == "object" ? Object.keys(e).length === 0 : !1 : !0, bt = lt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), ne = {}, mt = 2e3, Z = (e, ...t) => {
  if (!t.length) return e;
  const r = t.shift();
  if (r === void 0) return e;
  for (const o in r)
    r.hasOwnProperty(o) && (typeof r[o] == "object" && r[o] !== null && !Array.isArray(r[o]) ? (e[o] || (e[o] = {}), Z(e[o], r[o])) : e[o] = r[o]);
  return Z(e, ...t);
}, wt = (e, t, r) => {
  const o = Z({}, r, e);
  Object.assign(e, o);
  const s = r.header || {}, u = e.header || {};
  if (typeof t.header == "object")
    e.header = Z({}, s, u, t.header);
  else if (typeof t.header == "function") {
    const c = Z({}, s, u);
    e.header = t.header(c);
  } else
    e.header = Z({}, s, u);
  if (e.header || (e.header = {}), e.header.reqId = bt(), t.authorize) {
    const c = pt();
    if (!c) {
      const g = `Error, interface ${t.url} requires authorization to access!`;
      return console.error(g), q.error({ title: g }), !1;
    }
    if (typeof t.authorize == "boolean")
      e.header.authorization = "Bearer " + c;
    else if (typeof t.authorize == "function" && t.authorize(e, t, c) === !1)
      return !1;
  }
  const i = Ie();
  if (i) {
    const c = i(e);
    if (c !== void 0)
      return c;
  }
  if (t.before) {
    const c = t.before.call(t, e);
    if (c !== void 0)
      return c;
  }
}, At = async (e, t) => {
  await ft(e, t);
}, he = async (e, t, r, o) => {
  if (ht(r.header), r.data = await dt(r), r.statusCode >= 200 && r.statusCode < 400) {
    if (t.raw) {
      const u = r.data, i = te();
      i && i(e, u, r), t.after && t.after.call(t, e, u, r), o.Result = u;
      return;
    }
    const s = r.data;
    if (s.status === z.SUCCESS) {
      const u = s.data;
      e.method === "POST" && t.fieldMap && u && Ce(t.fieldMap, u);
      const i = te();
      i && i(e, s, r), t.after && t.after.call(t, s, e, r), o.Result = s;
    } else {
      console.error(s), o.Error = {
        status: s.status,
        errno: s.errno,
        msg: s.msg || "Request Error"
      }, o.Result = s;
      const u = te();
      u && u(e, s, r), t.after && t.after.call(t, s, e, r);
    }
  } else {
    let s;
    const u = r.statusCode;
    switch (u) {
      case 401:
        s = "Unauthorized or Token Expired";
        break;
      case 403:
        s = "Access Forbidden";
        break;
      case 404:
        s = "Request Address Error";
        break;
      case 500:
        s = "Server Exception";
        break;
      default:
        s = "Other Request Error";
        break;
    }
    if (s = `${u}: ${s}`, t.raw) {
      const g = {
        status: z.ERROR,
        errno: u + 1e3,
        msg: s
      };
      o.Error = g;
      const p = te();
      p && p(e, g, r), t.after && t.after.call(t, e, g, r);
      return;
    }
    const i = {
      status: z.ERROR,
      errno: u + 1e3,
      msg: s
    };
    o.Error = i;
    const c = te();
    c && c(e, i, r), t.after && t.after.call(t, i, e, r);
  }
}, ye = (e, t) => {
  console.error(e);
  const r = {
    status: z.ERROR,
    errno: 1e3,
    msg: "Network Error: " + e.toString()
  };
  t.Error = r;
}, Re = (e, t, r) => {
  const o = e.loadingText ? 500 : 0;
  setTimeout(() => {
    var s, u;
    q.hide(), t.Error && (console.error(se(e), t.Error), e.hideErrorToast || q.error({ title: t.Error.msg }), e.raw ? t.Result = t.Error : t.Result = {
      status: z.ERROR,
      errno: t.Error.errno,
      msg: t.Error.msg,
      timestamp: (s = t.Result) == null ? void 0 : s.timestamp,
      data: (u = t.Result) == null ? void 0 : u.data
    }), r(t.Result);
  }, o);
}, G = async (e, t, r) => {
  const o = se(Ze());
  if (wt(e, t, o) === !1) return Promise.resolve(null);
  if (await At(e, t), e.loadingText && q.loading({
    title: e.loadingText.toString()
  }), t.raw)
    return r(e, t);
  if (e.method === "POST") {
    const u = {
      ...t,
      key: t.url,
      params: e.data,
      fields: ["Query", "Option.SelectFields"],
      fieldMap: t.fieldMap
    };
    if (t.cacheTime) {
      const p = de.get(u);
      p && setTimeout(() => (q.hide(), Promise.resolve({
        status: z.SUCCESS,
        data: p
      })), 500);
    }
    const i = ie(
      e.url,
      e.data,
      t.fieldMap,
      ["Query", "Option.SelectFields"]
    ), c = ne[i];
    if (c)
      if (c.expire && c.expire < Date.now())
        delete ne[i];
      else return c.expire ? new Promise((p) => {
        setTimeout(() => {
          q.hide(), p(c.result);
        }, 500);
      }) : new Promise((p) => {
        setTimeout(() => {
          q.hide(), c.sharedPromise.then(p);
        }, 500);
      });
    t.loading = !0;
    const g = r(e, t).then((p) => {
      if (typeof p == "boolean") return p;
      (p == null ? void 0 : p.status) === z.SUCCESS && !gt(p == null ? void 0 : p.data) && t.cacheTime && de.set(u, p.data, t.cacheTime);
      let T = ne[i];
      return T.result = p, T.expire = Date.now() + mt, ne[i] = T, p;
    }).finally(() => {
      t.loading = !1;
    });
    return ne[i] = {
      sharedPromise: g
    }, g;
  } else
    return r(e, t);
}, ae = (e, t) => {
  const r = {
    Result: null
  };
  return new Promise((o) => {
    uni.request({
      ...e,
      success: async (s) => {
        await he(e, t, s, r);
      },
      fail: (s) => {
        ye(s, r);
      },
      complete: () => {
        Re(t, r, o);
      }
    });
  });
}, Ht = (e) => {
  const t = X(e);
  return t === !1 ? Promise.resolve(null) : G(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    ae
  );
}, Ct = (e, t) => {
  const r = X(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: "Saving Data..."
    },
    e,
    ae
  );
}, _t = (e, t) => {
  const r = X(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "Deleting Data..."
    },
    e,
    ae
  );
}, Rt = (e, t) => {
  const r = X(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    ae
  );
}, ce = (e, t) => {
  const r = {
    Result: null
  }, { header: o, ...s } = e;
  return new Promise((u) => {
    De.request({
      ...s,
      headers: o
    }).then(async (i) => {
      await he(
        e,
        t,
        {
          statusCode: i.status,
          data: i.data,
          header: i.headers
        },
        r
      );
    }).catch(async (i) => {
      var c;
      i.response && i.response.status && i.response.status > 200 && i.response.status < 600 ? await he(
        e,
        t,
        {
          statusCode: i.response.status,
          data: (c = i.response) == null ? void 0 : c.data,
          header: i.response.headers
        },
        r
      ) : ye(i, r);
    }).finally(() => {
      Re(t, r, u);
    });
  });
}, vt = (e) => {
  const t = X(e);
  return t === !1 ? Promise.resolve(null) : G(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    ce
  );
}, Pt = (e, t) => {
  const r = X(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: "Saving Data..."
    },
    e,
    ce
  );
}, Kt = (e, t) => {
  const r = X(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "Deleting Data..."
    },
    e,
    ce
  );
}, Ut = (e, t) => {
  const r = X(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    ce
  );
}, Dt = (e) => typeof e == "object" && e !== null && !Array.isArray(e) || Array.isArray(e);
export {
  rt as API_HOST,
  de as FrontCache,
  xt as ICON_HOST,
  z as ResStatus,
  Bt as SERVER_HOST,
  se as deepClone,
  Ce as fieldMapping,
  te as getGlobalAfter,
  Ie as getGlobalBefore,
  Ze as getGlobalConfig,
  pt as getToken,
  Ot as globalRequestOption,
  X as hostUrl,
  Kt as httpDelete,
  vt as httpGet,
  Ut as httpPost,
  Pt as httpPut,
  kt as initCrypto,
  Dt as isJSON,
  yt as parseFieldTemplate,
  Lt as setToken,
  q as toast,
  _t as uniDelete,
  Ht as uniGet,
  Rt as uniPost,
  Ct as uniPut
};
