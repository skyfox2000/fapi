var ve = Object.defineProperty;
var Re = (e, t, r) => t in e ? ve(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var ae = (e, t, r) => Re(e, typeof t != "symbol" ? t + "" : t, r);
import te from "vue-m-message";
import Pe from "axios";
var N = /* @__PURE__ */ ((e) => (e.SUCCESS = "success", e.ERROR = "error", e))(N || {});
let ne = null, Q = null;
const Ke = (e) => {
  ne = e;
}, Ue = () => ne !== null, De = async (e) => {
  const o = e.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace(/\s/g, ""), s = Uint8Array.from(atob(o), (u) => u.charCodeAt(0));
  return await crypto.subtle.importKey(
    "spki",
    s.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    !1,
    ["encrypt"]
  );
}, Me = async () => await crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  !0,
  ["encrypt", "decrypt"]
), Fe = async (e) => {
  const t = await crypto.subtle.exportKey("raw", e);
  return new Uint8Array(t);
}, ue = (e) => {
  const t = new Uint8Array(e);
  let r = "";
  for (let o = 0; o < t.byteLength; o++)
    r += String.fromCharCode(t[o]);
  return btoa(r);
}, pe = (e) => {
  const t = atob(e), r = new Uint8Array(t.length);
  for (let o = 0; o < t.length; o++)
    r[o] = t.charCodeAt(o);
  return r;
}, qe = async (e, t) => {
  const r = await De(t), o = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    r,
    e.buffer
  );
  return ue(o);
}, je = async (e, t) => {
  const r = crypto.getRandomValues(new Uint8Array(12)), o = {
    ...e,
    _ts: Date.now()
  }, u = new TextEncoder().encode(JSON.stringify(o)), a = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: r.buffer
    },
    t,
    u
  );
  return {
    ciphertext: ue(a),
    nonce: ue(r)
  };
}, Ne = async (e, t, r) => {
  const o = pe(e), s = pe(t), u = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: s.buffer
    },
    r,
    o.buffer
  ), c = new TextDecoder().decode(u);
  return JSON.parse(c);
}, ze = async (e) => {
  if (!ne)
    return null;
  try {
    const t = await Me();
    Q = t;
    const r = await Fe(t), o = await qe(r, ne), { ciphertext: s, nonce: u } = await je(e, t);
    return {
      encryptedData: s,
      encryptedKey: o,
      nonce: u
    };
  } catch (t) {
    return console.error("加密请求数据失败:", t), Q = null, null;
  }
}, Xe = async (e, t) => {
  if (!Q)
    return null;
  try {
    const r = await Ne(e, t, Q);
    return Q = null, r;
  } catch (r) {
    return console.error("解密响应数据失败:", r), Q = null, null;
  }
}, Ge = (e) => typeof e == "string" && e.length > 0 && /^[A-Za-z0-9+/=]+$/.test(e);
let M = {
  includeApis: [],
  excludeApis: [],
  includeHostKeys: [],
  excludeHostKeys: []
};
const Ve = () => Ue(), We = (e, t) => {
  if (!Ve() || t && M.excludeHostKeys && M.excludeHostKeys.length > 0 && M.excludeHostKeys.includes(t) || M.includeHostKeys && M.includeHostKeys.length > 0 && (!t || !M.includeHostKeys.includes(t)))
    return !1;
  if (M.excludeApis && M.excludeApis.length > 0) {
    for (const r of M.excludeApis)
      if (typeof r == "string") {
        if (e.includes(r))
          return !1;
      } else if (r instanceof RegExp && r.test(e))
        return !1;
  }
  if (!M.includeApis || M.includeApis.length === 0)
    return !0;
  for (const r of M.includeApis)
    if (typeof r == "string") {
      if (e.includes(r))
        return !0;
    } else if (r instanceof RegExp && r.test(e))
      return !0;
  return !1;
}, ke = {
  header: { "Content-Type": "application/json" }
};
let Ee, Oe;
const St = (e) => {
  const { before: t, after: r, ...o } = e;
  t && (Ee = t), r && (Oe = r), Object.assign(ke, o);
}, Je = () => ke, Qe = () => Ee, Z = () => Oe, ee = (e) => {
  if (e === null || typeof e != "object" || typeof e == "function")
    return e;
  if (Array.isArray(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r[o] = ee(e[o]);
    return r;
  }
  const t = {};
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = ee(e[r]));
  return t;
}, Ye = (e, t) => e << t | e >>> 32 - t, Ze = (e) => {
  const t = [];
  for (let w = 0; w < e.length; w++)
    t.push(e.charCodeAt(w));
  const r = t.length * 8;
  for (t.push(128); t.length * 8 % 512 !== 448; )
    t.push(0);
  t.push(r >>> 24 & 255), t.push(r >>> 16 & 255), t.push(r >>> 8 & 255), t.push(r & 255);
  let o = 1732584193, s = 4023233417, u = 2562383102, a = 271733878;
  const c = (w, A, S) => w & A | ~w & S, g = (w, A, S) => w & S | A & ~S, p = (w, A, S) => w ^ A ^ S, T = (w, A, S) => A ^ (w | ~S), R = [
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
  let D = 0;
  for (; D < t.length; ) {
    const w = new Array(16).fill(0);
    for (let h = 0; h < 16; h++)
      w[h] = t[D + h] || 0;
    let A = o, S = s, O = u, L = a;
    for (let h = 0; h < 64; h++) {
      let l, b, k;
      h < 16 ? (l = c(S, O, L), b = h) : h < 32 ? (l = g(S, O, L), b = (5 * h + 1) % 16) : h < 48 ? (l = p(S, O, L), b = (3 * h + 5) % 16) : (l = T(S, O, L), b = 7 * h % 16), k = L, L = O, O = S, S = S + Ye(A + l + R[h] + w[b] | 0, F[h]), A = k;
    }
    o = o + A | 0, s = s + S | 0, u = u + O | 0, a = a + L | 0, D += 16;
  }
  return [o, s, u, a].map((w) => {
    const A = w & 255, S = w >>> 8 & 255, O = w >>> 16 & 255;
    return [w >>> 24 & 255, O, S, A];
  }).flat().map((w) => w.toString(16).padStart(2, "0")).join("");
}, Ie = (e) => Ze(e), re = (e, t, r, o) => {
  if (!t) return e;
  let s = ee(t);
  r && (s.FieldMap = r), o && o.length > 0 && (o[0].startsWith("-") ? o.forEach((a) => {
    if (a.indexOf(".") > -1) {
      const c = a.split(".");
      let g = s;
      for (let p = 0; p < c.length && (p === c.length - 1 && delete g[c[p]], typeof g[c[p]] == "object" && !Array.isArray(g[c[p]])); p++)
        g = g[c[p]];
    } else delete s[a];
  }) : (s = {}, o.forEach((a) => {
    if (a.indexOf(".") > -1) {
      const c = a.split(".");
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
    } else s[a] = t[a];
  })));
  const u = JSON.stringify(s);
  return `${e}-` + Ie(u);
}, ie = /* @__PURE__ */ new Map(), le = {
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
  }, a, c = -1) {
    if (a == null) return;
    const g = re(e, t, o, r), p = c !== -1 ? Date.now() + c : void 0, T = `frontCache::${g}`, R = {
      data: a,
      expireAt: p,
      lastModified: s ?? Date.now()
    };
    switch (u) {
      case "memory":
        ie.set(T, R);
        break;
      case "uni":
        uni.setStorageSync(T, JSON.stringify(R));
        break;
      case "session":
        sessionStorage.setItem(T, JSON.stringify(R));
        break;
      case "local":
        localStorage.setItem(T, JSON.stringify(R));
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
    const a = `frontCache::${re(e, t, o, r)}`;
    let c = null, g;
    switch (s) {
      case "memory":
        c = ie.get(a);
        break;
      case "uni":
        g = uni.getStorageSync(a), c = g ? JSON.parse(g) : null;
        break;
      case "session":
        g = sessionStorage.getItem(a), c = g ? JSON.parse(g) : null;
        break;
      case "local":
        g = localStorage.getItem(a), c = g ? JSON.parse(g) : null;
        break;
    }
    return c && (!c.expireAt || c.expireAt > Date.now()) ? c.data : (le.remove({ key: e, params: t, storage: s }), null);
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
    const a = `frontCache::${re(e, t, o, r)}`;
    switch (s) {
      case "memory":
        ie.delete(a);
        break;
      case "uni":
        uni.removeStorageSync(a);
        break;
      case "session":
        sessionStorage.removeItem(a);
        break;
      case "local":
        localStorage.removeItem(a);
        break;
    }
  }
}, $e = {
  SITEHOST_API: ""
}, Tt = {}, kt = {};
class et {
  constructor() {
    ae(this, "currentToast", []);
    ae(this, "defaultOptions", {
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
    const { title: r, icon: o, mask: s, duration: u, position: a } = t;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...t,
        title: r,
        icon: o === "warning" ? "error" : o,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: u,
        position: a,
        mask: t.mask,
        success: t.success,
        fail: t.fail,
        complete: t.complete
      });
    else
      switch (this.hide(), o) {
        case "success":
          this.currentToast.push(
            te.success(r, {
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
            te.error(r, {
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
            te.loading(r, {
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
            te.info(r, {
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
const j = new et(), z = (e) => {
  let { api: t, url: r, authorize: o } = e;
  if (r.startsWith("http://") || r.startsWith("https://") || !t)
    return r;
  const s = $e[t];
  if (!s)
    return j.error("API domain not found: " + t), !1;
  if (typeof s == "string")
    return s + r;
  if (typeof s == "object") {
    const { host: u, authorize: a } = s;
    return (o === void 0 || o === !1) && (e.authorize = a), r = u + r, r;
  }
  return r;
};
var ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, J = {}, q = {}, x = {}, m = {}, be;
function tt() {
  if (be) return m;
  be = 1, Object.defineProperty(m, "__esModule", { value: !0 }), m.toBig = m.shrSL = m.shrSH = m.rotrSL = m.rotrSH = m.rotrBL = m.rotrBH = m.rotr32L = m.rotr32H = m.rotlSL = m.rotlSH = m.rotlBL = m.rotlBH = m.add5L = m.add5H = m.add4L = m.add4H = m.add3L = m.add3H = void 0, m.add = S, m.fromBig = r, m.split = o;
  const e = /* @__PURE__ */ BigInt(2 ** 32 - 1), t = /* @__PURE__ */ BigInt(32);
  function r(f, i = !1) {
    return i ? { h: Number(f & e), l: Number(f >> t & e) } : { h: Number(f >> t & e) | 0, l: Number(f & e) | 0 };
  }
  function o(f, i = !1) {
    const d = f.length;
    let C = new Uint32Array(d), v = new Uint32Array(d);
    for (let P = 0; P < d; P++) {
      const { h: V, l: W } = r(f[P], i);
      [C[P], v[P]] = [V, W];
    }
    return [C, v];
  }
  const s = (f, i) => BigInt(f >>> 0) << t | BigInt(i >>> 0);
  m.toBig = s;
  const u = (f, i, d) => f >>> d;
  m.shrSH = u;
  const a = (f, i, d) => f << 32 - d | i >>> d;
  m.shrSL = a;
  const c = (f, i, d) => f >>> d | i << 32 - d;
  m.rotrSH = c;
  const g = (f, i, d) => f << 32 - d | i >>> d;
  m.rotrSL = g;
  const p = (f, i, d) => f << 64 - d | i >>> d - 32;
  m.rotrBH = p;
  const T = (f, i, d) => f >>> d - 32 | i << 64 - d;
  m.rotrBL = T;
  const R = (f, i) => i;
  m.rotr32H = R;
  const F = (f, i) => f;
  m.rotr32L = F;
  const D = (f, i, d) => f << d | i >>> 32 - d;
  m.rotlSH = D;
  const E = (f, i, d) => i << d | f >>> 32 - d;
  m.rotlSL = E;
  const w = (f, i, d) => i << d - 32 | f >>> 64 - d;
  m.rotlBH = w;
  const A = (f, i, d) => f << d - 32 | i >>> 64 - d;
  m.rotlBL = A;
  function S(f, i, d, C) {
    const v = (i >>> 0) + (C >>> 0);
    return { h: f + d + (v / 2 ** 32 | 0) | 0, l: v | 0 };
  }
  const O = (f, i, d) => (f >>> 0) + (i >>> 0) + (d >>> 0);
  m.add3L = O;
  const L = (f, i, d, C) => i + d + C + (f / 2 ** 32 | 0) | 0;
  m.add3H = L;
  const h = (f, i, d, C) => (f >>> 0) + (i >>> 0) + (d >>> 0) + (C >>> 0);
  m.add4L = h;
  const l = (f, i, d, C, v) => i + d + C + v + (f / 2 ** 32 | 0) | 0;
  m.add4H = l;
  const b = (f, i, d, C, v) => (f >>> 0) + (i >>> 0) + (d >>> 0) + (C >>> 0) + (v >>> 0);
  m.add5L = b;
  const k = (f, i, d, C, v, P) => i + d + C + v + P + (f / 2 ** 32 | 0) | 0;
  m.add5H = k;
  const B = {
    fromBig: r,
    split: o,
    toBig: s,
    shrSH: u,
    shrSL: a,
    rotrSH: c,
    rotrSL: g,
    rotrBH: p,
    rotrBL: T,
    rotr32H: R,
    rotr32L: F,
    rotlSH: D,
    rotlSL: E,
    rotlBH: w,
    rotlBL: A,
    add: S,
    add3L: O,
    add3H: L,
    add4L: h,
    add4H: l,
    add5H: k,
    add5L: b
  };
  return m.default = B, m;
}
var ce = {}, I = {}, me;
function rt() {
  return me || (me = 1, Object.defineProperty(I, "__esModule", { value: !0 }), I.crypto = void 0, I.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), I;
}
var we;
function nt() {
  return we || (we = 1, (function(e) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(e, "__esModule", { value: !0 }), e.wrapXOFConstructorWithOpts = e.wrapConstructorWithOpts = e.wrapConstructor = e.Hash = e.nextTick = e.swap32IfBE = e.byteSwapIfBE = e.swap8IfBE = e.isLE = void 0, e.isBytes = r, e.anumber = o, e.abytes = s, e.ahash = u, e.aexists = a, e.aoutput = c, e.u8 = g, e.u32 = p, e.clean = T, e.createView = R, e.rotr = F, e.rotl = D, e.byteSwap = E, e.byteSwap32 = w, e.bytesToHex = O, e.hexToBytes = l, e.asyncLoop = k, e.utf8ToBytes = B, e.bytesToUtf8 = f, e.toBytes = i, e.kdfInputToBytes = d, e.concatBytes = C, e.checkOpts = v, e.createHasher = V, e.createOptHasher = W, e.createXOFer = G, e.randomBytes = _e;
    const t = /* @__PURE__ */ rt();
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
    function a(n, y = !0) {
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
    function R(n) {
      return new DataView(n.buffer, n.byteOffset, n.byteLength);
    }
    function F(n, y) {
      return n << 32 - y | n >>> y;
    }
    function D(n, y) {
      return n << y | n >>> 32 - y >>> 0;
    }
    e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    function E(n) {
      return n << 24 & 4278190080 | n << 8 & 16711680 | n >>> 8 & 65280 | n >>> 24 & 255;
    }
    e.swap8IfBE = e.isLE ? (n) => n : (n) => E(n), e.byteSwapIfBE = e.swap8IfBE;
    function w(n) {
      for (let y = 0; y < n.length; y++)
        n[y] = E(n[y]);
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
    const L = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function h(n) {
      if (n >= L._0 && n <= L._9)
        return n - L._0;
      if (n >= L.A && n <= L.F)
        return n - (L.A - 10);
      if (n >= L.a && n <= L.f)
        return n - (L.a - 10);
    }
    function l(n) {
      if (typeof n != "string")
        throw new Error("hex string expected, got " + typeof n);
      if (A)
        return Uint8Array.fromHex(n);
      const y = n.length, H = y / 2;
      if (y % 2)
        throw new Error("hex string expected, got unpadded hex of length " + y);
      const _ = new Uint8Array(H);
      for (let K = 0, U = 0; K < H; K++, U += 2) {
        const he = h(n.charCodeAt(U)), ye = h(n.charCodeAt(U + 1));
        if (he === void 0 || ye === void 0) {
          const Ce = n[U] + n[U + 1];
          throw new Error('hex string expected, got non-hex character "' + Ce + '" at index ' + U);
        }
        _[K] = he * 16 + ye;
      }
      return _;
    }
    const b = async () => {
    };
    e.nextTick = b;
    async function k(n, y, H) {
      let _ = Date.now();
      for (let K = 0; K < n; K++) {
        H(K);
        const U = Date.now() - _;
        U >= 0 && U < y || (await (0, e.nextTick)(), _ += U);
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
    function i(n) {
      return typeof n == "string" && (n = B(n)), s(n), n;
    }
    function d(n) {
      return typeof n == "string" && (n = B(n)), s(n), n;
    }
    function C(...n) {
      let y = 0;
      for (let _ = 0; _ < n.length; _++) {
        const K = n[_];
        s(K), y += K.length;
      }
      const H = new Uint8Array(y);
      for (let _ = 0, K = 0; _ < n.length; _++) {
        const U = n[_];
        H.set(U, K), K += U.length;
      }
      return H;
    }
    function v(n, y) {
      if (y !== void 0 && {}.toString.call(y) !== "[object Object]")
        throw new Error("options should be object or undefined");
      return Object.assign(n, y);
    }
    class P {
    }
    e.Hash = P;
    function V(n) {
      const y = (_) => n().update(i(_)).digest(), H = n();
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = () => n(), y;
    }
    function W(n) {
      const y = (_, K) => n(K).update(i(_)).digest(), H = n({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (_) => n(_), y;
    }
    function G(n) {
      const y = (_, K) => n(K).update(i(_)).digest(), H = n({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (_) => n(_), y;
    }
    e.wrapConstructor = V, e.wrapConstructorWithOpts = W, e.wrapXOFConstructorWithOpts = G;
    function _e(n = 32) {
      if (t.crypto && typeof t.crypto.getRandomValues == "function")
        return t.crypto.getRandomValues(new Uint8Array(n));
      if (t.crypto && typeof t.crypto.randomBytes == "function")
        return Uint8Array.from(t.crypto.randomBytes(n));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(ce)), ce;
}
var Ae;
function st() {
  if (Ae) return x;
  Ae = 1, Object.defineProperty(x, "__esModule", { value: !0 }), x.shake256 = x.shake128 = x.keccak_512 = x.keccak_384 = x.keccak_256 = x.keccak_224 = x.sha3_512 = x.sha3_384 = x.sha3_256 = x.sha3_224 = x.Keccak = void 0, x.keccakP = A;
  const e = /* @__PURE__ */ tt(), t = /* @__PURE__ */ nt(), r = BigInt(0), o = BigInt(1), s = BigInt(2), u = BigInt(7), a = BigInt(256), c = BigInt(113), g = [], p = [], T = [];
  for (let h = 0, l = o, b = 1, k = 0; h < 24; h++) {
    [b, k] = [k, (2 * b + 3 * k) % 5], g.push(2 * (5 * k + b)), p.push((h + 1) * (h + 2) / 2 % 64);
    let B = r;
    for (let f = 0; f < 7; f++)
      l = (l << o ^ (l >> u) * c) % a, l & s && (B ^= o << (o << /* @__PURE__ */ BigInt(f)) - o);
    T.push(B);
  }
  const R = (0, e.split)(T, !0), F = R[0], D = R[1], E = (h, l, b) => b > 32 ? (0, e.rotlBH)(h, l, b) : (0, e.rotlSH)(h, l, b), w = (h, l, b) => b > 32 ? (0, e.rotlBL)(h, l, b) : (0, e.rotlSL)(h, l, b);
  function A(h, l = 24) {
    const b = new Uint32Array(10);
    for (let k = 24 - l; k < 24; k++) {
      for (let i = 0; i < 10; i++)
        b[i] = h[i] ^ h[i + 10] ^ h[i + 20] ^ h[i + 30] ^ h[i + 40];
      for (let i = 0; i < 10; i += 2) {
        const d = (i + 8) % 10, C = (i + 2) % 10, v = b[C], P = b[C + 1], V = E(v, P, 1) ^ b[d], W = w(v, P, 1) ^ b[d + 1];
        for (let G = 0; G < 50; G += 10)
          h[i + G] ^= V, h[i + G + 1] ^= W;
      }
      let B = h[2], f = h[3];
      for (let i = 0; i < 24; i++) {
        const d = p[i], C = E(B, f, d), v = w(B, f, d), P = g[i];
        B = h[P], f = h[P + 1], h[P] = C, h[P + 1] = v;
      }
      for (let i = 0; i < 50; i += 10) {
        for (let d = 0; d < 10; d++)
          b[d] = h[i + d];
        for (let d = 0; d < 10; d++)
          h[i + d] ^= ~b[(d + 2) % 10] & b[(d + 4) % 10];
      }
      h[0] ^= F[k], h[1] ^= D[k];
    }
    (0, t.clean)(b);
  }
  class S extends t.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(l, b, k, B = !1, f = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = l, this.suffix = b, this.outputLen = k, this.enableXOF = B, this.rounds = f, (0, t.anumber)(k), !(0 < l && l < 200))
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
      const { blockLen: b, state: k } = this, B = l.length;
      for (let f = 0; f < B; ) {
        const i = Math.min(b - this.pos, B - f);
        for (let d = 0; d < i; d++)
          k[this.pos++] ^= l[f++];
        this.pos === b && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: l, suffix: b, pos: k, blockLen: B } = this;
      l[k] ^= b, (b & 128) !== 0 && k === B - 1 && this.keccak(), l[B - 1] ^= 128, this.keccak();
    }
    writeInto(l) {
      (0, t.aexists)(this, !1), (0, t.abytes)(l), this.finish();
      const b = this.state, { blockLen: k } = this;
      for (let B = 0, f = l.length; B < f; ) {
        this.posOut >= k && this.keccak();
        const i = Math.min(k - this.posOut, f - B);
        l.set(b.subarray(this.posOut, this.posOut + i), B), this.posOut += i, B += i;
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
      const { blockLen: b, suffix: k, outputLen: B, rounds: f, enableXOF: i } = this;
      return l || (l = new S(b, k, B, i, f)), l.state32.set(this.state32), l.pos = this.pos, l.posOut = this.posOut, l.finished = this.finished, l.rounds = f, l.suffix = k, l.outputLen = B, l.enableXOF = i, l.destroyed = this.destroyed, l;
    }
  }
  x.Keccak = S;
  const O = (h, l, b) => (0, t.createHasher)(() => new S(l, h, b));
  x.sha3_224 = O(6, 144, 224 / 8), x.sha3_256 = O(6, 136, 256 / 8), x.sha3_384 = O(6, 104, 384 / 8), x.sha3_512 = O(6, 72, 512 / 8), x.keccak_224 = O(1, 144, 224 / 8), x.keccak_256 = O(1, 136, 256 / 8), x.keccak_384 = O(1, 104, 384 / 8), x.keccak_512 = O(1, 72, 512 / 8);
  const L = (h, l, b) => (0, t.createXOFer)((k = {}) => new S(l, h, k.dkLen === void 0 ? b : k.dkLen, !0));
  return x.shake128 = L(31, 168, 128 / 8), x.shake256 = L(31, 136, 256 / 8), x;
}
var Se;
function ot() {
  if (Se) return q;
  Se = 1;
  const { sha3_512: e } = /* @__PURE__ */ st(), t = 24, r = 32, o = (E = 4, w = Math.random) => {
    let A = "";
    for (; A.length < E; )
      A = A + Math.floor(w() * 36).toString(36);
    return A;
  };
  function s(E) {
    let w = 8n, A = 0n;
    for (const S of E.values()) {
      const O = BigInt(S);
      A = (A << w) + O;
    }
    return A;
  }
  const u = (E = "") => s(e(E)).toString(36).slice(1), a = Array.from(
    { length: 26 },
    (E, w) => String.fromCharCode(w + 97)
  ), c = (E) => a[Math.floor(E() * a.length)], g = ({
    globalObj: E = typeof ge < "u" ? ge : typeof window < "u" ? window : {},
    random: w = Math.random
  } = {}) => {
    const A = Object.keys(E).toString(), S = A.length ? A + o(r, w) : o(r, w);
    return u(S).substring(0, r);
  }, p = (E) => () => E++, T = 476782367, R = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: E = Math.random,
    counter: w = p(Math.floor(E() * T)),
    length: A = t,
    fingerprint: S = g({ random: E })
  } = {}) => function() {
    const L = c(E), h = Date.now().toString(36), l = w().toString(36), b = o(A, E), k = `${h + b + l + S}`;
    return `${L + u(k).substring(1, A)}`;
  }, F = R(), D = (E, { minLength: w = 2, maxLength: A = r } = {}) => {
    const S = E.length, O = /^[0-9a-z]+$/;
    try {
      if (typeof E == "string" && S >= w && S <= A && O.test(E))
        return !0;
    } finally {
    }
    return !1;
  };
  return q.getConstants = () => ({ defaultLength: t, bigLength: r }), q.init = R, q.createId = F, q.bufToBigInt = s, q.createCounter = p, q.createFingerprint = g, q.isCuid = D, q;
}
var Te;
function at() {
  if (Te) return J;
  Te = 1;
  const { createId: e, init: t, getConstants: r, isCuid: o } = ot();
  return J.createId = e, J.init = t, J.getConstants = r, J.isCuid = o, J;
}
var it = at();
const ct = async (e, t) => {
  var o;
  if (!We(e.url || "", t.api) || ((o = e.method) == null ? void 0 : o.toUpperCase()) === "GET" || !e.data)
    return !1;
  try {
    const s = await ze(e.data);
    if (s)
      return e.data = s.encryptedData, e.header || (e.header = {}), e.header["X-Encrypted-Key"] = s.encryptedKey, e.header["X-Nonce"] = s.nonce, !0;
  } catch (s) {
    console.error("请求加密失败:", s);
  }
  return !1;
}, ut = async (e) => {
  var r, o;
  const t = ((r = e.header) == null ? void 0 : r["x-response-nonce"]) || ((o = e.header) == null ? void 0 : o["X-Response-Nonce"]);
  if (t && e.data)
    try {
      if (Ge(e.data)) {
        const s = await Xe(e.data, t);
        if (s !== null)
          return s;
      }
    } catch (s) {
      console.error("响应解密失败:", s);
    }
  return e.data;
}, lt = (e) => {
  if (!e) return;
  const t = e["x-public-key"] || e["X-Public-Key"];
  t && Ke(t);
}, Be = /\$\{([\w\.\[\]0-9]+)\}/g, ft = (e, t) => e.replace(Be, (r, o) => {
  var a;
  const s = o.split(".");
  let u = t;
  for (const c of s) {
    if (c.includes("[") && c.includes("]")) {
      const g = c.split("[")[0], p = parseInt(c.split("[")[1].split("]")[0]);
      u = (a = u[g]) == null ? void 0 : a[p];
    } else
      u = u[c];
    if (u === void 0)
      return r;
  }
  return String(u);
}), Le = (e, t) => {
  const r = Array.isArray(t), o = r ? t : [t];
  return o.forEach((s) => {
    if (s && typeof s == "object") {
      for (const u in e) {
        const a = e[u];
        if (typeof a == "string" && Be.test(a)) {
          const c = ft(
            a,
            s
          );
          s[u] = c;
        } else s[a] !== void 0 && (s[u] = s[a]);
      }
      s.children && Array.isArray(s.children) && (s.children = Le(e, s.children));
    }
  }), r ? t : o[0];
};
let xe = "";
const dt = () => xe, Et = (e) => {
  xe = e;
}, ht = (e) => e ? Array.isArray(e) ? e.length === 0 : typeof e == "object" ? Object.keys(e).length === 0 : !1 : !0, yt = it.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), $ = {}, pt = 2e3, Y = (e, ...t) => {
  if (!t.length) return e;
  const r = t.shift();
  if (r === void 0) return e;
  for (const o in r)
    r.hasOwnProperty(o) && (typeof r[o] == "object" && r[o] !== null && !Array.isArray(r[o]) ? (e[o] || (e[o] = {}), Y(e[o], r[o])) : e[o] = r[o]);
  return Y(e, ...t);
}, gt = (e, t, r) => {
  const o = Y({}, r, e);
  Object.assign(e, o);
  const s = r.header || {}, u = e.header || {};
  if (typeof t.header == "object")
    e.header = Y({}, s, u, t.header);
  else if (typeof t.header == "function") {
    const c = Y({}, s, u);
    e.header = t.header(c);
  } else
    e.header = Y({}, s, u);
  if (e.header || (e.header = {}), e.header.reqId = yt(), t.authorize) {
    const c = dt();
    if (!c) {
      const g = `Error, interface ${t.url} requires authorization to access!`;
      return console.error(g), j.error({ title: g }), !1;
    }
    if (typeof t.authorize == "boolean")
      e.header.authorization = "Bearer " + c;
    else if (typeof t.authorize == "function" && t.authorize(e, t, c) === !1)
      return !1;
  }
  const a = Qe();
  if (a) {
    const c = a(e);
    if (c !== void 0)
      return c;
  }
  if (t.before) {
    const c = t.before.call(t, e);
    if (c !== void 0)
      return c;
  }
}, bt = async (e, t) => {
  await ct(e, t);
}, fe = async (e, t, r, o) => {
  if (lt(r.header), r.data = await ut(r), r.statusCode >= 200 && r.statusCode < 400) {
    if (t.raw) {
      const u = r.data, a = Z();
      a && a(e, u, r), t.after && t.after.call(t, e, u, r), o.Result = u;
      return;
    }
    const s = r.data;
    if (s.status === N.SUCCESS) {
      const u = s.data;
      e.method === "POST" && t.fieldMap && u && Le(t.fieldMap, u);
      const a = Z();
      a && a(e, s, r), t.after && t.after.call(t, s, e, r), o.Result = s;
    } else {
      console.error(s), o.Error = {
        status: s.status,
        errno: s.errno,
        msg: s.msg || "Request Error"
      }, o.Result = s;
      const u = Z();
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
        status: N.ERROR,
        errno: u + 1e3,
        msg: s
      };
      o.Error = g;
      const p = Z();
      p && p(e, g, r), t.after && t.after.call(t, e, g, r);
      return;
    }
    const a = {
      status: N.ERROR,
      errno: u + 1e3,
      msg: s
    };
    o.Error = a;
    const c = Z();
    c && c(e, a, r), t.after && t.after.call(t, a, e, r);
  }
}, de = (e, t) => {
  console.error(e);
  const r = {
    status: N.ERROR,
    errno: 1e3,
    msg: "Network Error: " + e.toString()
  };
  t.Error = r;
}, He = (e, t, r) => {
  const o = e.loadingText ? 500 : 0;
  setTimeout(() => {
    var s, u;
    j.hide(), t.Error && (console.error(ee(e), t.Error), e.hideErrorToast || j.error({ title: t.Error.msg }), e.raw ? t.Result = t.Error : t.Result = {
      status: N.ERROR,
      errno: t.Error.errno,
      msg: t.Error.msg,
      timestamp: (s = t.Result) == null ? void 0 : s.timestamp,
      data: (u = t.Result) == null ? void 0 : u.data
    }), r(t.Result);
  }, o);
}, X = async (e, t, r) => {
  const o = ee(Je());
  if (gt(e, t, o) === !1) return Promise.resolve(null);
  if (await bt(e, t), e.loadingText && j.loading({
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
      const p = le.get(u);
      p && setTimeout(() => (j.hide(), Promise.resolve({
        status: N.SUCCESS,
        data: p
      })), 500);
    }
    const a = re(
      e.url,
      e.data,
      t.fieldMap,
      ["Query", "Option.SelectFields"]
    ), c = $[a];
    if (c)
      if (c.expire && c.expire < Date.now())
        delete $[a];
      else return c.expire ? new Promise((p) => {
        setTimeout(() => {
          j.hide(), p(c.result);
        }, 500);
      }) : new Promise((p) => {
        setTimeout(() => {
          j.hide(), c.sharedPromise.then(p);
        }, 500);
      });
    t.loading = !0;
    const g = r(e, t).then((p) => {
      if (typeof p == "boolean") return p;
      (p == null ? void 0 : p.status) === N.SUCCESS && !ht(p == null ? void 0 : p.data) && t.cacheTime && le.set(u, p.data, t.cacheTime);
      let T = $[a];
      return T.result = p, T.expire = Date.now() + pt, $[a] = T, p;
    }).finally(() => {
      t.loading = !1;
    });
    return $[a] = {
      sharedPromise: g
    }, g;
  } else
    return r(e, t);
}, se = (e, t) => {
  const r = {
    Result: null
  };
  return new Promise((o) => {
    uni.request({
      ...e,
      success: async (s) => {
        await fe(e, t, s, r);
      },
      fail: (s) => {
        de(s, r);
      },
      complete: () => {
        He(t, r, o);
      }
    });
  });
}, Ot = (e) => {
  const t = z(e);
  return t === !1 ? Promise.resolve(null) : X(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    se
  );
}, Bt = (e, t) => {
  const r = z(e);
  return r === !1 ? Promise.resolve(null) : X(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: "Saving Data..."
    },
    e,
    se
  );
}, Lt = (e, t) => {
  const r = z(e);
  return r === !1 ? Promise.resolve(null) : X(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "Deleting Data..."
    },
    e,
    se
  );
}, xt = (e, t) => {
  const r = z(e);
  return r === !1 ? Promise.resolve(null) : X(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    se
  );
}, oe = (e, t) => {
  const r = {
    Result: null
  }, { header: o, ...s } = e;
  return new Promise((u) => {
    Pe.request({
      ...s,
      headers: o
    }).then(async (a) => {
      await fe(
        e,
        t,
        {
          statusCode: a.status,
          data: a.data,
          header: a.headers
        },
        r
      );
    }).catch(async (a) => {
      var c;
      a.response && a.response.status && a.response.status > 200 && a.response.status < 600 ? await fe(
        e,
        t,
        {
          statusCode: a.response.status,
          data: (c = a.response) == null ? void 0 : c.data,
          header: a.response.headers
        },
        r
      ) : de(a, r);
    }).finally(() => {
      He(t, r, u);
    });
  });
}, Ht = (e) => {
  const t = z(e);
  return t === !1 ? Promise.resolve(null) : X(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    oe
  );
}, _t = (e, t) => {
  const r = z(e);
  return r === !1 ? Promise.resolve(null) : X(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: "Saving Data..."
    },
    e,
    oe
  );
}, Ct = (e, t) => {
  const r = z(e);
  return r === !1 ? Promise.resolve(null) : X(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "Deleting Data..."
    },
    e,
    oe
  );
}, vt = (e, t) => {
  const r = z(e);
  return r === !1 ? Promise.resolve(null) : X(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    oe
  );
}, Rt = (e) => typeof e == "object" && e !== null && !Array.isArray(e) || Array.isArray(e);
export {
  $e as API_HOST,
  le as FrontCache,
  kt as ICON_HOST,
  N as ResStatus,
  Tt as SERVER_HOST,
  ee as deepClone,
  Le as fieldMapping,
  Z as getGlobalAfter,
  Qe as getGlobalBefore,
  Je as getGlobalConfig,
  dt as getToken,
  St as globalRequestOption,
  z as hostUrl,
  Ct as httpDelete,
  Ht as httpGet,
  vt as httpPost,
  _t as httpPut,
  Rt as isJSON,
  ft as parseFieldTemplate,
  Et as setToken,
  j as toast,
  Lt as uniDelete,
  Ot as uniGet,
  xt as uniPost,
  Bt as uniPut
};
