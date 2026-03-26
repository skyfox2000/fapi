var Bt = Object.defineProperty;
var _t = (t, e, r) => e in t ? Bt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var nt = (t, e, r) => _t(t, typeof e != "symbol" ? e + "" : e, r);
import $ from "vue-m-message";
import Ht from "axios";
var z = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(z || {});
const bt = {
  header: { "Content-Type": "application/json" }
};
let wt, kt;
const $t = (t) => {
  const { before: e, after: r, ...o } = t;
  e && (wt = e), r && (kt = r), Object.assign(bt, o);
}, vt = () => bt, xt = () => wt, Q = () => kt, I = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const r = [];
    for (let o = 0; o < t.length; o++)
      r[o] = I(t[o]);
    return r;
  }
  const e = {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = I(t[r]));
  return e;
}, Ct = (t, e) => t << e | t >>> 32 - e, Pt = (t) => {
  const e = [];
  for (let w = 0; w < t.length; w++)
    e.push(t.charCodeAt(w));
  const r = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(r >>> 24 & 255), e.push(r >>> 16 & 255), e.push(r >>> 8 & 255), e.push(r & 255);
  let o = 1732584193, s = 4023233417, h = 2562383102, i = 271733878;
  const c = (w, k, T) => w & k | ~w & T, p = (w, k, T) => w & T | k & ~T, y = (w, k, T) => w ^ k ^ T, S = (w, k, T) => k ^ (w | ~T), P = [
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
  let M = 0;
  for (; M < e.length; ) {
    const w = new Array(16).fill(0);
    for (let d = 0; d < 16; d++)
      w[d] = e[M + d] || 0;
    let k = o, T = s, E = h, B = i;
    for (let d = 0; d < 64; d++) {
      let u, m, O;
      d < 16 ? (u = c(T, E, B), m = d) : d < 32 ? (u = p(T, E, B), m = (5 * d + 1) % 16) : d < 48 ? (u = y(T, E, B), m = (3 * d + 5) % 16) : (u = S(T, E, B), m = 7 * d % 16), O = B, B = E, E = T, T = T + Ct(k + u + P[d] + w[m] | 0, F[d]), k = O;
    }
    o = o + k | 0, s = s + T | 0, h = h + E | 0, i = i + B | 0, M += 16;
  }
  return [o, s, h, i].map((w) => {
    const k = w & 255, T = w >>> 8 & 255, E = w >>> 16 & 255;
    return [w >>> 24 & 255, E, T, k];
  }).flat().map((w) => w.toString(16).padStart(2, "0")).join("");
}, Rt = (t) => Pt(t), tt = (t, e, r, o) => {
  if (!e) return t;
  let s = I(e);
  r && (s.FieldMap = r), o && o.length > 0 && (o[0].startsWith("-") ? o.forEach((i) => {
    if (i.indexOf(".") > -1) {
      const c = i.split(".");
      let p = s;
      for (let y = 0; y < c.length && (y === c.length - 1 && delete p[c[y]], typeof p[c[y]] == "object" && !Array.isArray(p[c[y]])); y++)
        p = p[c[y]];
    } else delete s[i];
  }) : (s = {}, o.forEach((i) => {
    if (i.indexOf(".") > -1) {
      const c = i.split(".");
      let p = e, y = s;
      for (let S = 0; S < c.length; S++)
        if (S === c.length - 1)
          y[c[S]] = p[c[S]];
        else {
          if (p[c[S]] === null || p[c[S]] === void 0)
            break;
          if (y[c[S]] === void 0)
            if (typeof p[c[S]] != "object" || Array.isArray(p[c[S]])) {
              y[c[S]] = p[c[S]];
              break;
            } else y[c[S]] = {};
          y = y[c[S]], p = p[c[S]];
        }
    } else s[i] = e[i];
  })));
  const h = JSON.stringify(s);
  return `${t}-` + Rt(h);
}, st = /* @__PURE__ */ new Map(), it = {
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
    key: t,
    params: e,
    fields: r,
    fieldMap: o,
    lastModified: s,
    storage: h = "memory"
  }, i, c = -1) {
    if (i == null) return;
    const p = tt(t, e, o, r), y = c !== -1 ? Date.now() + c : void 0, S = `frontCache::${p}`, P = {
      data: i,
      expireAt: y,
      lastModified: s ?? Date.now()
    };
    switch (h) {
      case "memory":
        st.set(S, P);
        break;
      case "uni":
        uni.setStorageSync(S, JSON.stringify(P));
        break;
      case "session":
        sessionStorage.setItem(S, JSON.stringify(P));
        break;
      case "local":
        localStorage.setItem(S, JSON.stringify(P));
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
    key: t,
    params: e,
    fields: r,
    fieldMap: o,
    storage: s = "memory"
  }) {
    const i = `frontCache::${tt(t, e, o, r)}`;
    let c = null, p;
    switch (s) {
      case "memory":
        c = st.get(i);
        break;
      case "uni":
        p = uni.getStorageSync(i), c = p ? JSON.parse(p) : null;
        break;
      case "session":
        p = sessionStorage.getItem(i), c = p ? JSON.parse(p) : null;
        break;
      case "local":
        p = localStorage.getItem(i), c = p ? JSON.parse(p) : null;
        break;
    }
    return c && (!c.expireAt || c.expireAt > Date.now()) ? c.data : (it.remove({ key: t, params: e, storage: s }), null);
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
    key: t,
    params: e,
    fields: r,
    fieldMap: o,
    storage: s = "memory"
  }) {
    const i = `frontCache::${tt(t, e, o, r)}`;
    switch (s) {
      case "memory":
        st.delete(i);
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
}, Ut = {
  SITEHOST_API: ""
}, te = {}, ee = {};
class Dt {
  constructor() {
    nt(this, "currentToast", []);
    nt(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "info",
      mask: !1,
      position: "center",
      zIndex: 9999
    });
  }
  showToast(e, r, o, s) {
    const h = typeof r == "string" ? r : r.title || o;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: s || this.defaultOptions.duration,
      title: h
    });
  }
  success(e) {
    this.showToast("success", e, "Operation Successful");
  }
  error(e) {
    this.showToast("error", e, "Operation Failed", 5e3);
  }
  warning(e) {
    this.showToast("warning", e, "Warning", 5e3);
  }
  info(e) {
    this.showToast("info", e, "Information");
  }
  loading(e) {
    this.showToast("loading", e, "Loading Data", -1);
  }
  hide(e) {
    e = e || 0;
    const r = this.currentToast.map((o) => o.id);
    e === 0 ? this.close(r) : setTimeout(() => this.close(r), e);
  }
  close(e) {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : (e.forEach((r) => {
      var o;
      (o = this.currentToast.find((s) => s.id === r)) == null || o.close();
    }), this.currentToast = this.currentToast.filter(
      (r) => !e.includes(r.id)
    ));
  }
  show(e) {
    const { title: r, icon: o, mask: s, duration: h, position: i } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: r,
        icon: o === "warning" ? "error" : o,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: h,
        position: i,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else
      switch (this.hide(), o) {
        case "success":
          this.currentToast.push(
            $.success(r, {
              ...e,
              title: void 0,
              position: "top-center",
              hasMask: s,
              zIndex: e.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "error":
          this.currentToast.push(
            $.error(r, {
              ...e,
              title: void 0,
              position: "top-center",
              hasMask: s,
              zIndex: e.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "loading":
          this.currentToast.push(
            $.loading(r, {
              ...e,
              title: void 0,
              position: "top-center",
              hasMask: s,
              zIndex: e.zIndex || 9999,
              closable: !1
            })
          );
          break;
        default:
          this.currentToast.push(
            $.info(r, {
              ...e,
              title: void 0,
              position: "top-center",
              hasMask: s,
              zIndex: e.zIndex || 9999,
              closable: !1
            })
          );
          break;
      }
  }
}
const q = new Dt(), K = (t) => {
  let { api: e, url: r, authorize: o } = t;
  if (r.startsWith("http://") || r.startsWith("https://") || !e)
    return r;
  const s = Ut[e];
  if (!s)
    return q.error("API domain not found: " + e), !1;
  if (typeof s == "string")
    return s + r;
  if (typeof s == "object") {
    const { host: h, authorize: i } = s;
    return (o === void 0 || o === !1) && (t.authorize = i), r = h + r, r;
  }
  return r;
};
var ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, J = {}, j = {}, _ = {}, b = {}, ht;
function Mt() {
  if (ht) return b;
  ht = 1, Object.defineProperty(b, "__esModule", { value: !0 }), b.toBig = b.shrSL = b.shrSH = b.rotrSL = b.rotrSH = b.rotrBL = b.rotrBH = b.rotr32L = b.rotr32H = b.rotlSL = b.rotlSH = b.rotlBL = b.rotlBH = b.add5L = b.add5H = b.add4L = b.add4H = b.add3L = b.add3H = void 0, b.add = T, b.fromBig = r, b.split = o;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function r(l, a = !1) {
    return a ? { h: Number(l & t), l: Number(l >> e & t) } : { h: Number(l >> e & t) | 0, l: Number(l & t) | 0 };
  }
  function o(l, a = !1) {
    const f = l.length;
    let x = new Uint32Array(f), C = new Uint32Array(f);
    for (let R = 0; R < f; R++) {
      const { h: V, l: G } = r(l[R], a);
      [x[R], C[R]] = [V, G];
    }
    return [x, C];
  }
  const s = (l, a) => BigInt(l >>> 0) << e | BigInt(a >>> 0);
  b.toBig = s;
  const h = (l, a, f) => l >>> f;
  b.shrSH = h;
  const i = (l, a, f) => l << 32 - f | a >>> f;
  b.shrSL = i;
  const c = (l, a, f) => l >>> f | a << 32 - f;
  b.rotrSH = c;
  const p = (l, a, f) => l << 32 - f | a >>> f;
  b.rotrSL = p;
  const y = (l, a, f) => l << 64 - f | a >>> f - 32;
  b.rotrBH = y;
  const S = (l, a, f) => l >>> f - 32 | a << 64 - f;
  b.rotrBL = S;
  const P = (l, a) => a;
  b.rotr32H = P;
  const F = (l, a) => l;
  b.rotr32L = F;
  const M = (l, a, f) => l << f | a >>> 32 - f;
  b.rotlSH = M;
  const A = (l, a, f) => a << f | l >>> 32 - f;
  b.rotlSL = A;
  const w = (l, a, f) => a << f - 32 | l >>> 64 - f;
  b.rotlBH = w;
  const k = (l, a, f) => l << f - 32 | a >>> 64 - f;
  b.rotlBL = k;
  function T(l, a, f, x) {
    const C = (a >>> 0) + (x >>> 0);
    return { h: l + f + (C / 2 ** 32 | 0) | 0, l: C | 0 };
  }
  const E = (l, a, f) => (l >>> 0) + (a >>> 0) + (f >>> 0);
  b.add3L = E;
  const B = (l, a, f, x) => a + f + x + (l / 2 ** 32 | 0) | 0;
  b.add3H = B;
  const d = (l, a, f, x) => (l >>> 0) + (a >>> 0) + (f >>> 0) + (x >>> 0);
  b.add4L = d;
  const u = (l, a, f, x, C) => a + f + x + C + (l / 2 ** 32 | 0) | 0;
  b.add4H = u;
  const m = (l, a, f, x, C) => (l >>> 0) + (a >>> 0) + (f >>> 0) + (x >>> 0) + (C >>> 0);
  b.add5L = m;
  const O = (l, a, f, x, C, R) => a + f + x + C + R + (l / 2 ** 32 | 0) | 0;
  b.add5H = O;
  const L = {
    fromBig: r,
    split: o,
    toBig: s,
    shrSH: h,
    shrSL: i,
    rotrSH: c,
    rotrSL: p,
    rotrBH: y,
    rotrBL: S,
    rotr32H: P,
    rotr32L: F,
    rotlSH: M,
    rotlSL: A,
    rotlBH: w,
    rotlBL: k,
    add: T,
    add3L: E,
    add3H: B,
    add4L: d,
    add4H: u,
    add5H: O,
    add5L: m
  };
  return b.default = L, b;
}
var ot = {}, Y = {}, dt;
function Ft() {
  return dt || (dt = 1, Object.defineProperty(Y, "__esModule", { value: !0 }), Y.crypto = void 0, Y.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), Y;
}
var gt;
function jt() {
  return gt || (gt = 1, (function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.wrapXOFConstructorWithOpts = t.wrapConstructorWithOpts = t.wrapConstructor = t.Hash = t.nextTick = t.swap32IfBE = t.byteSwapIfBE = t.swap8IfBE = t.isLE = void 0, t.isBytes = r, t.anumber = o, t.abytes = s, t.ahash = h, t.aexists = i, t.aoutput = c, t.u8 = p, t.u32 = y, t.clean = S, t.createView = P, t.rotr = F, t.rotl = M, t.byteSwap = A, t.byteSwap32 = w, t.bytesToHex = E, t.hexToBytes = u, t.asyncLoop = O, t.utf8ToBytes = L, t.bytesToUtf8 = l, t.toBytes = a, t.kdfInputToBytes = f, t.concatBytes = x, t.checkOpts = C, t.createHasher = V, t.createOptHasher = G, t.createXOFer = X, t.randomBytes = Et;
    const e = /* @__PURE__ */ Ft();
    function r(n) {
      return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
    }
    function o(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error("positive integer expected, got " + n);
    }
    function s(n, ...g) {
      if (!r(n))
        throw new Error("Uint8Array expected");
      if (g.length > 0 && !g.includes(n.length))
        throw new Error("Uint8Array expected of length " + g + ", got length=" + n.length);
    }
    function h(n) {
      if (typeof n != "function" || typeof n.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      o(n.outputLen), o(n.blockLen);
    }
    function i(n, g = !0) {
      if (n.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (g && n.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function c(n, g) {
      s(n);
      const H = g.outputLen;
      if (n.length < H)
        throw new Error("digestInto() expects output buffer of length at least " + H);
    }
    function p(n) {
      return new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
    }
    function y(n) {
      return new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4));
    }
    function S(...n) {
      for (let g = 0; g < n.length; g++)
        n[g].fill(0);
    }
    function P(n) {
      return new DataView(n.buffer, n.byteOffset, n.byteLength);
    }
    function F(n, g) {
      return n << 32 - g | n >>> g;
    }
    function M(n, g) {
      return n << g | n >>> 32 - g >>> 0;
    }
    t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    function A(n) {
      return n << 24 & 4278190080 | n << 8 & 16711680 | n >>> 8 & 65280 | n >>> 24 & 255;
    }
    t.swap8IfBE = t.isLE ? (n) => n : (n) => A(n), t.byteSwapIfBE = t.swap8IfBE;
    function w(n) {
      for (let g = 0; g < n.length; g++)
        n[g] = A(n[g]);
      return n;
    }
    t.swap32IfBE = t.isLE ? (n) => n : w;
    const k = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", T = /* @__PURE__ */ Array.from({ length: 256 }, (n, g) => g.toString(16).padStart(2, "0"));
    function E(n) {
      if (s(n), k)
        return n.toHex();
      let g = "";
      for (let H = 0; H < n.length; H++)
        g += T[n[H]];
      return g;
    }
    const B = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function d(n) {
      if (n >= B._0 && n <= B._9)
        return n - B._0;
      if (n >= B.A && n <= B.F)
        return n - (B.A - 10);
      if (n >= B.a && n <= B.f)
        return n - (B.a - 10);
    }
    function u(n) {
      if (typeof n != "string")
        throw new Error("hex string expected, got " + typeof n);
      if (k)
        return Uint8Array.fromHex(n);
      const g = n.length, H = g / 2;
      if (g % 2)
        throw new Error("hex string expected, got unpadded hex of length " + g);
      const v = new Uint8Array(H);
      for (let U = 0, D = 0; U < H; U++, D += 2) {
        const ut = d(n.charCodeAt(D)), lt = d(n.charCodeAt(D + 1));
        if (ut === void 0 || lt === void 0) {
          const Lt = n[D] + n[D + 1];
          throw new Error('hex string expected, got non-hex character "' + Lt + '" at index ' + D);
        }
        v[U] = ut * 16 + lt;
      }
      return v;
    }
    const m = async () => {
    };
    t.nextTick = m;
    async function O(n, g, H) {
      let v = Date.now();
      for (let U = 0; U < n; U++) {
        H(U);
        const D = Date.now() - v;
        D >= 0 && D < g || (await (0, t.nextTick)(), v += D);
      }
    }
    function L(n) {
      if (typeof n != "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(n));
    }
    function l(n) {
      return new TextDecoder().decode(n);
    }
    function a(n) {
      return typeof n == "string" && (n = L(n)), s(n), n;
    }
    function f(n) {
      return typeof n == "string" && (n = L(n)), s(n), n;
    }
    function x(...n) {
      let g = 0;
      for (let v = 0; v < n.length; v++) {
        const U = n[v];
        s(U), g += U.length;
      }
      const H = new Uint8Array(g);
      for (let v = 0, U = 0; v < n.length; v++) {
        const D = n[v];
        H.set(D, U), U += D.length;
      }
      return H;
    }
    function C(n, g) {
      if (g !== void 0 && {}.toString.call(g) !== "[object Object]")
        throw new Error("options should be object or undefined");
      return Object.assign(n, g);
    }
    class R {
    }
    t.Hash = R;
    function V(n) {
      const g = (v) => n().update(a(v)).digest(), H = n();
      return g.outputLen = H.outputLen, g.blockLen = H.blockLen, g.create = () => n(), g;
    }
    function G(n) {
      const g = (v, U) => n(U).update(a(v)).digest(), H = n({});
      return g.outputLen = H.outputLen, g.blockLen = H.blockLen, g.create = (v) => n(v), g;
    }
    function X(n) {
      const g = (v, U) => n(U).update(a(v)).digest(), H = n({});
      return g.outputLen = H.outputLen, g.blockLen = H.blockLen, g.create = (v) => n(v), g;
    }
    t.wrapConstructor = V, t.wrapConstructorWithOpts = G, t.wrapXOFConstructorWithOpts = X;
    function Et(n = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function")
        return e.crypto.getRandomValues(new Uint8Array(n));
      if (e.crypto && typeof e.crypto.randomBytes == "function")
        return Uint8Array.from(e.crypto.randomBytes(n));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(ot)), ot;
}
var yt;
function qt() {
  if (yt) return _;
  yt = 1, Object.defineProperty(_, "__esModule", { value: !0 }), _.shake256 = _.shake128 = _.keccak_512 = _.keccak_384 = _.keccak_256 = _.keccak_224 = _.sha3_512 = _.sha3_384 = _.sha3_256 = _.sha3_224 = _.Keccak = void 0, _.keccakP = k;
  const t = /* @__PURE__ */ Mt(), e = /* @__PURE__ */ jt(), r = BigInt(0), o = BigInt(1), s = BigInt(2), h = BigInt(7), i = BigInt(256), c = BigInt(113), p = [], y = [], S = [];
  for (let d = 0, u = o, m = 1, O = 0; d < 24; d++) {
    [m, O] = [O, (2 * m + 3 * O) % 5], p.push(2 * (5 * O + m)), y.push((d + 1) * (d + 2) / 2 % 64);
    let L = r;
    for (let l = 0; l < 7; l++)
      u = (u << o ^ (u >> h) * c) % i, u & s && (L ^= o << (o << /* @__PURE__ */ BigInt(l)) - o);
    S.push(L);
  }
  const P = (0, t.split)(S, !0), F = P[0], M = P[1], A = (d, u, m) => m > 32 ? (0, t.rotlBH)(d, u, m) : (0, t.rotlSH)(d, u, m), w = (d, u, m) => m > 32 ? (0, t.rotlBL)(d, u, m) : (0, t.rotlSL)(d, u, m);
  function k(d, u = 24) {
    const m = new Uint32Array(10);
    for (let O = 24 - u; O < 24; O++) {
      for (let a = 0; a < 10; a++)
        m[a] = d[a] ^ d[a + 10] ^ d[a + 20] ^ d[a + 30] ^ d[a + 40];
      for (let a = 0; a < 10; a += 2) {
        const f = (a + 8) % 10, x = (a + 2) % 10, C = m[x], R = m[x + 1], V = A(C, R, 1) ^ m[f], G = w(C, R, 1) ^ m[f + 1];
        for (let X = 0; X < 50; X += 10)
          d[a + X] ^= V, d[a + X + 1] ^= G;
      }
      let L = d[2], l = d[3];
      for (let a = 0; a < 24; a++) {
        const f = y[a], x = A(L, l, f), C = w(L, l, f), R = p[a];
        L = d[R], l = d[R + 1], d[R] = x, d[R + 1] = C;
      }
      for (let a = 0; a < 50; a += 10) {
        for (let f = 0; f < 10; f++)
          m[f] = d[a + f];
        for (let f = 0; f < 10; f++)
          d[a + f] ^= ~m[(f + 2) % 10] & m[(f + 4) % 10];
      }
      d[0] ^= F[O], d[1] ^= M[O];
    }
    (0, e.clean)(m);
  }
  class T extends e.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(u, m, O, L = !1, l = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = u, this.suffix = m, this.outputLen = O, this.enableXOF = L, this.rounds = l, (0, e.anumber)(O), !(0 < u && u < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200), this.state32 = (0, e.u32)(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      (0, e.swap32IfBE)(this.state32), k(this.state32, this.rounds), (0, e.swap32IfBE)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(u) {
      (0, e.aexists)(this), u = (0, e.toBytes)(u), (0, e.abytes)(u);
      const { blockLen: m, state: O } = this, L = u.length;
      for (let l = 0; l < L; ) {
        const a = Math.min(m - this.pos, L - l);
        for (let f = 0; f < a; f++)
          O[this.pos++] ^= u[l++];
        this.pos === m && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: u, suffix: m, pos: O, blockLen: L } = this;
      u[O] ^= m, (m & 128) !== 0 && O === L - 1 && this.keccak(), u[L - 1] ^= 128, this.keccak();
    }
    writeInto(u) {
      (0, e.aexists)(this, !1), (0, e.abytes)(u), this.finish();
      const m = this.state, { blockLen: O } = this;
      for (let L = 0, l = u.length; L < l; ) {
        this.posOut >= O && this.keccak();
        const a = Math.min(O - this.posOut, l - L);
        u.set(m.subarray(this.posOut, this.posOut + a), L), this.posOut += a, L += a;
      }
      return u;
    }
    xofInto(u) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(u);
    }
    xof(u) {
      return (0, e.anumber)(u), this.xofInto(new Uint8Array(u));
    }
    digestInto(u) {
      if ((0, e.aoutput)(u, this), this.finished)
        throw new Error("digest() was already called");
      return this.writeInto(u), this.destroy(), u;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = !0, (0, e.clean)(this.state);
    }
    _cloneInto(u) {
      const { blockLen: m, suffix: O, outputLen: L, rounds: l, enableXOF: a } = this;
      return u || (u = new T(m, O, L, a, l)), u.state32.set(this.state32), u.pos = this.pos, u.posOut = this.posOut, u.finished = this.finished, u.rounds = l, u.suffix = O, u.outputLen = L, u.enableXOF = a, u.destroyed = this.destroyed, u;
    }
  }
  _.Keccak = T;
  const E = (d, u, m) => (0, e.createHasher)(() => new T(u, d, m));
  _.sha3_224 = E(6, 144, 224 / 8), _.sha3_256 = E(6, 136, 256 / 8), _.sha3_384 = E(6, 104, 384 / 8), _.sha3_512 = E(6, 72, 512 / 8), _.keccak_224 = E(1, 144, 224 / 8), _.keccak_256 = E(1, 136, 256 / 8), _.keccak_384 = E(1, 104, 384 / 8), _.keccak_512 = E(1, 72, 512 / 8);
  const B = (d, u, m) => (0, e.createXOFer)((O = {}) => new T(u, d, O.dkLen === void 0 ? m : O.dkLen, !0));
  return _.shake128 = B(31, 168, 128 / 8), _.shake256 = B(31, 136, 256 / 8), _;
}
var pt;
function zt() {
  if (pt) return j;
  pt = 1;
  const { sha3_512: t } = /* @__PURE__ */ qt(), e = 24, r = 32, o = (A = 4, w = Math.random) => {
    let k = "";
    for (; k.length < A; )
      k = k + Math.floor(w() * 36).toString(36);
    return k;
  };
  function s(A) {
    let w = 8n, k = 0n;
    for (const T of A.values()) {
      const E = BigInt(T);
      k = (k << w) + E;
    }
    return k;
  }
  const h = (A = "") => s(t(A)).toString(36).slice(1), i = Array.from(
    { length: 26 },
    (A, w) => String.fromCharCode(w + 97)
  ), c = (A) => i[Math.floor(A() * i.length)], p = ({
    globalObj: A = typeof ft < "u" ? ft : typeof window < "u" ? window : {},
    random: w = Math.random
  } = {}) => {
    const k = Object.keys(A).toString(), T = k.length ? k + o(r, w) : o(r, w);
    return h(T).substring(0, r);
  }, y = (A) => () => A++, S = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: A = Math.random,
    counter: w = y(Math.floor(A() * S)),
    length: k = e,
    fingerprint: T = p({ random: A })
  } = {}) => function() {
    const B = c(A), d = Date.now().toString(36), u = w().toString(36), m = o(k, A), O = `${d + m + u + T}`;
    return `${B + h(O).substring(1, k)}`;
  }, F = P(), M = (A, { minLength: w = 2, maxLength: k = r } = {}) => {
    const T = A.length, E = /^[0-9a-z]+$/;
    try {
      if (typeof A == "string" && T >= w && T <= k && E.test(A))
        return !0;
    } finally {
    }
    return !1;
  };
  return j.getConstants = () => ({ defaultLength: e, bigLength: r }), j.init = P, j.createId = F, j.bufToBigInt = s, j.createCounter = y, j.createFingerprint = p, j.isCuid = M, j;
}
var mt;
function Kt() {
  if (mt) return J;
  mt = 1;
  const { createId: t, init: e, getConstants: r, isCuid: o } = zt();
  return J.createId = t, J.init = e, J.getConstants = r, J.isCuid = o, J;
}
var Nt = Kt();
const Tt = /\$\{([\w\.\[\]0-9]+)\}/g, Xt = (t, e) => t.replace(Tt, (r, o) => {
  var i;
  const s = o.split(".");
  let h = e;
  for (const c of s) {
    if (c.includes("[") && c.includes("]")) {
      const p = c.split("[")[0], y = parseInt(c.split("[")[1].split("]")[0]);
      h = (i = h[p]) == null ? void 0 : i[y];
    } else
      h = h[c];
    if (h === void 0)
      return r;
  }
  return String(h);
}), St = (t, e) => {
  const r = Array.isArray(e), o = r ? e : [e];
  return o.forEach((s) => {
    if (s && typeof s == "object") {
      for (const h in t) {
        const i = t[h];
        if (typeof i == "string" && Tt.test(i)) {
          const c = Xt(
            i,
            s
          );
          s[h] = c;
        } else s[i] !== void 0 && (s[h] = s[i]);
      }
      s.children && Array.isArray(s.children) && (s.children = St(t, s.children));
    }
  }), r ? e : o[0];
};
let Ot = "";
const Vt = () => Ot, re = (t) => {
  Ot = t;
}, Gt = (t) => t ? Array.isArray(t) ? t.length === 0 : typeof t == "object" ? Object.keys(t).length === 0 : !1 : !0, Jt = Nt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), Z = {}, Wt = 2e3, W = (t, ...e) => {
  if (!e.length) return t;
  const r = e.shift();
  if (r === void 0) return t;
  for (const o in r)
    r.hasOwnProperty(o) && (typeof r[o] == "object" && r[o] !== null && !Array.isArray(r[o]) ? (t[o] || (t[o] = {}), W(t[o], r[o])) : t[o] = r[o]);
  return W(t, ...e);
}, Qt = (t, e, r) => {
  const o = W({}, r, t);
  Object.assign(t, o);
  const s = r.header || {}, h = t.header || {};
  if (typeof e.header == "object")
    t.header = W({}, s, h, e.header);
  else if (typeof e.header == "function") {
    const c = W({}, s, h);
    t.header = e.header(c);
  } else
    t.header = W({}, s, h);
  if (t.header || (t.header = {}), t.header.reqId = Jt(), e.authorize) {
    const c = Vt();
    if (!c) {
      const p = `Error, interface ${e.url} requires authorization to access!`;
      return console.error(p), q.error({ title: p }), !1;
    }
    if (typeof e.authorize == "boolean")
      t.header.authorization = "Bearer " + c;
    else if (typeof e.authorize == "function" && e.authorize(t, e, c) === !1)
      return !1;
  }
  const i = xt();
  if (i) {
    const c = i(t);
    if (c !== void 0)
      return c;
  }
  if (e.before) {
    const c = e.before.call(e, t);
    if (c !== void 0)
      return c;
  }
}, at = (t, e, r, o) => {
  if (r.statusCode >= 200 && r.statusCode < 400) {
    if (e.raw) {
      const h = r.data, i = Q();
      i && i(t, h, r), e.after && e.after.call(e, t, h, r), o.Result = h;
      return;
    }
    const s = r.data;
    if (s.status === z.SUCCESS) {
      const h = s.data;
      t.method === "POST" && e.fieldMap && h && St(e.fieldMap, h);
      const i = Q();
      i && i(t, s, r), e.after && e.after.call(e, s, t, r), o.Result = s;
    } else {
      console.error(s), o.Error = {
        status: s.status,
        errno: s.errno,
        msg: s.msg || "Request Error"
      }, o.Result = s;
      const h = Q();
      h && h(t, s, r), e.after && e.after.call(e, s, t, r);
    }
  } else {
    let s;
    const h = r.statusCode;
    switch (h) {
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
    if (s = `${h}: ${s}`, e.raw) {
      const p = {
        status: z.ERROR,
        errno: h + 1e3,
        msg: s
      };
      o.Error = p;
      const y = Q();
      y && y(t, p, r), e.after && e.after.call(e, t, p, r);
      return;
    }
    const i = {
      status: z.ERROR,
      errno: h + 1e3,
      msg: s
    };
    o.Error = i;
    const c = Q();
    c && c(t, i, r), e.after && e.after.call(e, i, t, r);
  }
}, ct = (t, e) => {
  console.error(t);
  const r = {
    status: z.ERROR,
    errno: 1e3,
    msg: "Network Error: " + t.toString()
  };
  e.Error = r;
}, At = (t, e, r) => {
  const o = t.loadingText ? 500 : 0;
  setTimeout(() => {
    var s, h;
    q.hide(), e.Error && (console.error(I(t), e.Error), t.hideErrorToast || q.error({ title: e.Error.msg }), t.raw ? e.Result = e.Error : e.Result = {
      status: z.ERROR,
      errno: e.Error.errno,
      msg: e.Error.msg,
      timestamp: (s = e.Result) == null ? void 0 : s.timestamp,
      data: (h = e.Result) == null ? void 0 : h.data
    }), r(e.Result);
  }, o);
}, N = (t, e, r) => {
  const o = I(vt());
  if (Qt(t, e, o) === !1) return Promise.resolve(null);
  if (t.loadingText && q.loading({
    title: t.loadingText.toString()
  }), e.raw)
    return r(t, e);
  if (t.method === "POST") {
    const h = {
      ...e,
      key: e.url,
      params: t.data,
      fields: ["Query", "Option.SelectFields"],
      fieldMap: e.fieldMap
    };
    if (e.cacheTime) {
      const y = it.get(h);
      y && setTimeout(() => (q.hide(), Promise.resolve({
        status: z.SUCCESS,
        data: y
      })), 500);
    }
    const i = tt(
      t.url,
      t.data,
      e.fieldMap,
      ["Query", "Option.SelectFields"]
    ), c = Z[i];
    if (c)
      if (c.expire && c.expire < Date.now())
        delete Z[i];
      else return c.expire ? new Promise((y) => {
        setTimeout(() => {
          q.hide(), y(c.result);
        }, 500);
      }) : new Promise((y) => {
        setTimeout(() => {
          q.hide(), c.sharedPromise.then(y);
        }, 500);
      });
    e.loading = !0;
    const p = r(t, e).then((y) => {
      if (typeof y == "boolean") return y;
      (y == null ? void 0 : y.status) === z.SUCCESS && !Gt(y == null ? void 0 : y.data) && e.cacheTime && it.set(h, y.data, e.cacheTime);
      let S = Z[i];
      return S.result = y, S.expire = Date.now() + Wt, Z[i] = S, y;
    }).finally(() => {
      e.loading = !1;
    });
    return Z[i] = {
      sharedPromise: p
    }, p;
  } else
    return r(t, e);
}, et = (t, e) => {
  const r = {
    Result: null
  };
  return new Promise((o) => {
    uni.request({
      ...t,
      success: (s) => {
        at(t, e, s, r);
      },
      fail: (s) => {
        ct(s, r);
      },
      complete: () => {
        At(e, r, o);
      }
    });
  });
}, ne = (t) => {
  const e = K(t);
  return e === !1 ? Promise.resolve(null) : N(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    et
  );
}, se = (t, e) => {
  const r = K(t);
  return r === !1 ? Promise.resolve(null) : N(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: "Saving Data..."
    },
    t,
    et
  );
}, oe = (t, e) => {
  const r = K(t);
  return r === !1 ? Promise.resolve(null) : N(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "Deleting Data..."
    },
    t,
    et
  );
}, ie = (t, e) => {
  const r = K(t);
  return r === !1 ? Promise.resolve(null) : N(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    et
  );
}, rt = (t, e) => {
  const r = {
    Result: null
  }, { header: o, ...s } = t;
  return new Promise((h) => {
    Ht.request({
      ...s,
      headers: o
    }).then((i) => {
      at(
        t,
        e,
        {
          statusCode: i.status,
          data: i.data,
          header: i.headers
        },
        r
      );
    }).catch((i) => {
      var c;
      i.response && i.response.status && i.response.status > 200 && i.response.status < 600 ? at(
        t,
        e,
        {
          statusCode: i.response.status,
          data: (c = i.response) == null ? void 0 : c.data,
          header: i.response.headers
        },
        r
      ) : ct(i, r);
    }).finally(() => {
      At(e, r, h);
    });
  });
}, ae = (t) => {
  const e = K(t);
  return e === !1 ? Promise.resolve(null) : N(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    rt
  );
}, ce = (t, e) => {
  const r = K(t);
  return r === !1 ? Promise.resolve(null) : N(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: "Saving Data..."
    },
    t,
    rt
  );
}, ue = (t, e) => {
  const r = K(t);
  return r === !1 ? Promise.resolve(null) : N(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "Deleting Data..."
    },
    t,
    rt
  );
}, le = (t, e) => {
  const r = K(t);
  return r === !1 ? Promise.resolve(null) : N(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    rt
  );
}, fe = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
export {
  Ut as API_HOST,
  it as FrontCache,
  ee as ICON_HOST,
  z as ResStatus,
  te as SERVER_HOST,
  I as deepClone,
  St as fieldMapping,
  Q as getGlobalAfter,
  xt as getGlobalBefore,
  vt as getGlobalConfig,
  Vt as getToken,
  $t as globalRequestOption,
  K as hostUrl,
  ue as httpDelete,
  ae as httpGet,
  le as httpPost,
  ce as httpPut,
  fe as isJSON,
  Xt as parseFieldTemplate,
  re as setToken,
  q as toast,
  oe as uniDelete,
  ne as uniGet,
  ie as uniPost,
  se as uniPut
};
