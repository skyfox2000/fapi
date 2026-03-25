var St = Object.defineProperty;
var Ot = (t, e, n) => e in t ? St(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var et = (t, e, n) => Ot(t, typeof e != "symbol" ? e + "" : e, n);
import Z from "vue-m-message";
import Et from "axios";
var z = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(z || {});
const Lt = {
  url: "",
  header: { "Content-Type": "application/json" }
}, At = (t) => {
  Object.assign(Lt, t);
}, Y = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const n = [];
    for (let o = 0; o < t.length; o++)
      n[o] = Y(t[o]);
    return n;
  }
  const e = {};
  for (const n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = Y(t[n]));
  return e;
}, Bt = (t, e) => t << e | t >>> 32 - e, _t = (t) => {
  const e = [];
  for (let b = 0; b < t.length; b++)
    e.push(t.charCodeAt(b));
  const n = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(n >>> 24 & 255), e.push(n >>> 16 & 255), e.push(n >>> 8 & 255), e.push(n & 255);
  let o = 1732584193, s = 4023233417, d = 2562383102, a = 271733878;
  const h = (b, k, T) => b & k | ~b & T, w = (b, k, T) => b & T | k & ~T, y = (b, k, T) => b ^ k ^ T, S = (b, k, T) => k ^ (b | ~T), P = [
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
    const b = new Array(16).fill(0);
    for (let f = 0; f < 16; f++)
      b[f] = e[M + f] || 0;
    let k = o, T = s, L = d, B = a;
    for (let f = 0; f < 64; f++) {
      let c, p, O;
      f < 16 ? (c = h(T, L, B), p = f) : f < 32 ? (c = w(T, L, B), p = (5 * f + 1) % 16) : f < 48 ? (c = y(T, L, B), p = (3 * f + 5) % 16) : (c = S(T, L, B), p = 7 * f % 16), O = B, B = L, L = T, T = T + Bt(k + c + P[f] + b[p] | 0, F[f]), k = O;
    }
    o = o + k | 0, s = s + T | 0, d = d + L | 0, a = a + B | 0, M += 16;
  }
  return [o, s, d, a].map((b) => {
    const k = b & 255, T = b >>> 8 & 255, L = b >>> 16 & 255;
    return [b >>> 24 & 255, L, T, k];
  }).flat().map((b) => b.toString(16).padStart(2, "0")).join("");
}, Ht = (t) => _t(t), I = (t, e, n, o) => {
  if (!e) return t;
  let s = Y(e);
  n && (s.FieldMap = n), o && o.length > 0 && (o[0].startsWith("-") ? o.forEach((a) => {
    if (a.indexOf(".") > -1) {
      const h = a.split(".");
      let w = s;
      for (let y = 0; y < h.length && (y === h.length - 1 && delete w[h[y]], typeof w[h[y]] == "object" && !Array.isArray(w[h[y]])); y++)
        w = w[h[y]];
    } else delete s[a];
  }) : (s = {}, o.forEach((a) => {
    if (a.indexOf(".") > -1) {
      const h = a.split(".");
      let w = e, y = s;
      for (let S = 0; S < h.length; S++)
        if (S === h.length - 1)
          y[h[S]] = w[h[S]];
        else {
          if (w[h[S]] === null || w[h[S]] === void 0)
            break;
          if (y[h[S]] === void 0)
            if (typeof w[h[S]] != "object" || Array.isArray(w[h[S]])) {
              y[h[S]] = w[h[S]];
              break;
            } else y[h[S]] = {};
          y = y[h[S]], w = w[h[S]];
        }
    } else s[a] = e[a];
  })));
  const d = JSON.stringify(s);
  return `${t}-` + Ht(d);
}, rt = /* @__PURE__ */ new Map(), st = {
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
    fields: n,
    fieldMap: o,
    lastModified: s,
    storage: d = "memory"
  }, a, h = -1) {
    if (a == null) return;
    const w = I(t, e, o, n), y = h !== -1 ? Date.now() + h : void 0, S = `frontCache::${w}`, P = {
      data: a,
      expireAt: y,
      lastModified: s ?? Date.now()
    };
    switch (d) {
      case "memory":
        rt.set(S, P);
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
    fields: n,
    fieldMap: o,
    storage: s = "memory"
  }) {
    const a = `frontCache::${I(t, e, o, n)}`;
    let h = null, w;
    switch (s) {
      case "memory":
        h = rt.get(a);
        break;
      case "uni":
        w = uni.getStorageSync(a), h = w ? JSON.parse(w) : null;
        break;
      case "session":
        w = sessionStorage.getItem(a), h = w ? JSON.parse(w) : null;
        break;
      case "local":
        w = localStorage.getItem(a), h = w ? JSON.parse(w) : null;
        break;
    }
    return h && (!h.expireAt || h.expireAt > Date.now()) ? h.data : (st.remove({ key: t, params: e, storage: s }), null);
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
    fields: n,
    fieldMap: o,
    storage: s = "memory"
  }) {
    const a = `frontCache::${I(t, e, o, n)}`;
    switch (s) {
      case "memory":
        rt.delete(a);
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
}, xt = {
  SITEHOST_API: ""
}, Gt = {}, Qt = {};
class vt {
  constructor() {
    et(this, "currentToast", []);
    et(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "info",
      mask: !1,
      position: "center",
      zIndex: 9999
    });
  }
  showToast(e, n, o, s) {
    const d = typeof n == "string" ? n : n.title || o;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: s || this.defaultOptions.duration,
      title: d
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
    const n = this.currentToast.map((o) => o.id);
    e === 0 ? this.close(n) : setTimeout(() => this.close(n), e);
  }
  close(e) {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : (e.forEach((n) => {
      var o;
      (o = this.currentToast.find((s) => s.id === n)) == null || o.close();
    }), this.currentToast = this.currentToast.filter(
      (n) => !e.includes(n.id)
    ));
  }
  show(e) {
    const { title: n, icon: o, mask: s, duration: d, position: a } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: n,
        icon: o === "warning" ? "error" : o,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: d,
        position: a,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else
      switch (this.hide(), o) {
        case "success":
          this.currentToast.push(
            Z.success(n, {
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
            Z.error(n, {
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
            Z.loading(n, {
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
            Z.info(n, {
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
const j = new vt(), K = (t) => {
  let { api: e, url: n, authorize: o } = t;
  if (n.startsWith("http://") || n.startsWith("https://") || !e)
    return n;
  const s = xt[e];
  if (!s)
    return j.error("API domain not found: " + e), !1;
  if (typeof s == "string")
    return s + n;
  if (typeof s == "object") {
    const { host: d, authorize: a } = s;
    return (o === void 0 || o === !1) && (t.authorize = a), n = d + n, n;
  }
  return n;
};
var ut = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, W = {}, q = {}, _ = {}, m = {}, lt;
function Ct() {
  if (lt) return m;
  lt = 1, Object.defineProperty(m, "__esModule", { value: !0 }), m.toBig = m.shrSL = m.shrSH = m.rotrSL = m.rotrSH = m.rotrBL = m.rotrBH = m.rotr32L = m.rotr32H = m.rotlSL = m.rotlSH = m.rotlBL = m.rotlBH = m.add5L = m.add5H = m.add4L = m.add4H = m.add3L = m.add3H = void 0, m.add = T, m.fromBig = n, m.split = o;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function n(u, i = !1) {
    return i ? { h: Number(u & t), l: Number(u >> e & t) } : { h: Number(u >> e & t) | 0, l: Number(u & t) | 0 };
  }
  function o(u, i = !1) {
    const l = u.length;
    let v = new Uint32Array(l), C = new Uint32Array(l);
    for (let R = 0; R < l; R++) {
      const { h: V, l: J } = n(u[R], i);
      [v[R], C[R]] = [V, J];
    }
    return [v, C];
  }
  const s = (u, i) => BigInt(u >>> 0) << e | BigInt(i >>> 0);
  m.toBig = s;
  const d = (u, i, l) => u >>> l;
  m.shrSH = d;
  const a = (u, i, l) => u << 32 - l | i >>> l;
  m.shrSL = a;
  const h = (u, i, l) => u >>> l | i << 32 - l;
  m.rotrSH = h;
  const w = (u, i, l) => u << 32 - l | i >>> l;
  m.rotrSL = w;
  const y = (u, i, l) => u << 64 - l | i >>> l - 32;
  m.rotrBH = y;
  const S = (u, i, l) => u >>> l - 32 | i << 64 - l;
  m.rotrBL = S;
  const P = (u, i) => i;
  m.rotr32H = P;
  const F = (u, i) => u;
  m.rotr32L = F;
  const M = (u, i, l) => u << l | i >>> 32 - l;
  m.rotlSH = M;
  const E = (u, i, l) => i << l | u >>> 32 - l;
  m.rotlSL = E;
  const b = (u, i, l) => i << l - 32 | u >>> 64 - l;
  m.rotlBH = b;
  const k = (u, i, l) => u << l - 32 | i >>> 64 - l;
  m.rotlBL = k;
  function T(u, i, l, v) {
    const C = (i >>> 0) + (v >>> 0);
    return { h: u + l + (C / 2 ** 32 | 0) | 0, l: C | 0 };
  }
  const L = (u, i, l) => (u >>> 0) + (i >>> 0) + (l >>> 0);
  m.add3L = L;
  const B = (u, i, l, v) => i + l + v + (u / 2 ** 32 | 0) | 0;
  m.add3H = B;
  const f = (u, i, l, v) => (u >>> 0) + (i >>> 0) + (l >>> 0) + (v >>> 0);
  m.add4L = f;
  const c = (u, i, l, v, C) => i + l + v + C + (u / 2 ** 32 | 0) | 0;
  m.add4H = c;
  const p = (u, i, l, v, C) => (u >>> 0) + (i >>> 0) + (l >>> 0) + (v >>> 0) + (C >>> 0);
  m.add5L = p;
  const O = (u, i, l, v, C, R) => i + l + v + C + R + (u / 2 ** 32 | 0) | 0;
  m.add5H = O;
  const A = {
    fromBig: n,
    split: o,
    toBig: s,
    shrSH: d,
    shrSL: a,
    rotrSH: h,
    rotrSL: w,
    rotrBH: y,
    rotrBL: S,
    rotr32H: P,
    rotr32L: F,
    rotlSH: M,
    rotlSL: E,
    rotlBH: b,
    rotlBL: k,
    add: T,
    add3L: L,
    add3H: B,
    add4L: f,
    add4H: c,
    add5H: O,
    add5L: p
  };
  return m.default = A, m;
}
var nt = {}, G = {}, ht;
function Pt() {
  return ht || (ht = 1, Object.defineProperty(G, "__esModule", { value: !0 }), G.crypto = void 0, G.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), G;
}
var ft;
function Rt() {
  return ft || (ft = 1, (function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.wrapXOFConstructorWithOpts = t.wrapConstructorWithOpts = t.wrapConstructor = t.Hash = t.nextTick = t.swap32IfBE = t.byteSwapIfBE = t.swap8IfBE = t.isLE = void 0, t.isBytes = n, t.anumber = o, t.abytes = s, t.ahash = d, t.aexists = a, t.aoutput = h, t.u8 = w, t.u32 = y, t.clean = S, t.createView = P, t.rotr = F, t.rotl = M, t.byteSwap = E, t.byteSwap32 = b, t.bytesToHex = L, t.hexToBytes = c, t.asyncLoop = O, t.utf8ToBytes = A, t.bytesToUtf8 = u, t.toBytes = i, t.kdfInputToBytes = l, t.concatBytes = v, t.checkOpts = C, t.createHasher = V, t.createOptHasher = J, t.createXOFer = X, t.randomBytes = kt;
    const e = /* @__PURE__ */ Pt();
    function n(r) {
      return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
    }
    function o(r) {
      if (!Number.isSafeInteger(r) || r < 0)
        throw new Error("positive integer expected, got " + r);
    }
    function s(r, ...g) {
      if (!n(r))
        throw new Error("Uint8Array expected");
      if (g.length > 0 && !g.includes(r.length))
        throw new Error("Uint8Array expected of length " + g + ", got length=" + r.length);
    }
    function d(r) {
      if (typeof r != "function" || typeof r.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      o(r.outputLen), o(r.blockLen);
    }
    function a(r, g = !0) {
      if (r.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (g && r.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function h(r, g) {
      s(r);
      const H = g.outputLen;
      if (r.length < H)
        throw new Error("digestInto() expects output buffer of length at least " + H);
    }
    function w(r) {
      return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    }
    function y(r) {
      return new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
    }
    function S(...r) {
      for (let g = 0; g < r.length; g++)
        r[g].fill(0);
    }
    function P(r) {
      return new DataView(r.buffer, r.byteOffset, r.byteLength);
    }
    function F(r, g) {
      return r << 32 - g | r >>> g;
    }
    function M(r, g) {
      return r << g | r >>> 32 - g >>> 0;
    }
    t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    function E(r) {
      return r << 24 & 4278190080 | r << 8 & 16711680 | r >>> 8 & 65280 | r >>> 24 & 255;
    }
    t.swap8IfBE = t.isLE ? (r) => r : (r) => E(r), t.byteSwapIfBE = t.swap8IfBE;
    function b(r) {
      for (let g = 0; g < r.length; g++)
        r[g] = E(r[g]);
      return r;
    }
    t.swap32IfBE = t.isLE ? (r) => r : b;
    const k = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", T = /* @__PURE__ */ Array.from({ length: 256 }, (r, g) => g.toString(16).padStart(2, "0"));
    function L(r) {
      if (s(r), k)
        return r.toHex();
      let g = "";
      for (let H = 0; H < r.length; H++)
        g += T[r[H]];
      return g;
    }
    const B = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function f(r) {
      if (r >= B._0 && r <= B._9)
        return r - B._0;
      if (r >= B.A && r <= B.F)
        return r - (B.A - 10);
      if (r >= B.a && r <= B.f)
        return r - (B.a - 10);
    }
    function c(r) {
      if (typeof r != "string")
        throw new Error("hex string expected, got " + typeof r);
      if (k)
        return Uint8Array.fromHex(r);
      const g = r.length, H = g / 2;
      if (g % 2)
        throw new Error("hex string expected, got unpadded hex of length " + g);
      const x = new Uint8Array(H);
      for (let U = 0, D = 0; U < H; U++, D += 2) {
        const at = f(r.charCodeAt(D)), ct = f(r.charCodeAt(D + 1));
        if (at === void 0 || ct === void 0) {
          const Tt = r[D] + r[D + 1];
          throw new Error('hex string expected, got non-hex character "' + Tt + '" at index ' + D);
        }
        x[U] = at * 16 + ct;
      }
      return x;
    }
    const p = async () => {
    };
    t.nextTick = p;
    async function O(r, g, H) {
      let x = Date.now();
      for (let U = 0; U < r; U++) {
        H(U);
        const D = Date.now() - x;
        D >= 0 && D < g || (await (0, t.nextTick)(), x += D);
      }
    }
    function A(r) {
      if (typeof r != "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(r));
    }
    function u(r) {
      return new TextDecoder().decode(r);
    }
    function i(r) {
      return typeof r == "string" && (r = A(r)), s(r), r;
    }
    function l(r) {
      return typeof r == "string" && (r = A(r)), s(r), r;
    }
    function v(...r) {
      let g = 0;
      for (let x = 0; x < r.length; x++) {
        const U = r[x];
        s(U), g += U.length;
      }
      const H = new Uint8Array(g);
      for (let x = 0, U = 0; x < r.length; x++) {
        const D = r[x];
        H.set(D, U), U += D.length;
      }
      return H;
    }
    function C(r, g) {
      if (g !== void 0 && {}.toString.call(g) !== "[object Object]")
        throw new Error("options should be object or undefined");
      return Object.assign(r, g);
    }
    class R {
    }
    t.Hash = R;
    function V(r) {
      const g = (x) => r().update(i(x)).digest(), H = r();
      return g.outputLen = H.outputLen, g.blockLen = H.blockLen, g.create = () => r(), g;
    }
    function J(r) {
      const g = (x, U) => r(U).update(i(x)).digest(), H = r({});
      return g.outputLen = H.outputLen, g.blockLen = H.blockLen, g.create = (x) => r(x), g;
    }
    function X(r) {
      const g = (x, U) => r(U).update(i(x)).digest(), H = r({});
      return g.outputLen = H.outputLen, g.blockLen = H.blockLen, g.create = (x) => r(x), g;
    }
    t.wrapConstructor = V, t.wrapConstructorWithOpts = J, t.wrapXOFConstructorWithOpts = X;
    function kt(r = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function")
        return e.crypto.getRandomValues(new Uint8Array(r));
      if (e.crypto && typeof e.crypto.randomBytes == "function")
        return Uint8Array.from(e.crypto.randomBytes(r));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(nt)), nt;
}
var dt;
function Ut() {
  if (dt) return _;
  dt = 1, Object.defineProperty(_, "__esModule", { value: !0 }), _.shake256 = _.shake128 = _.keccak_512 = _.keccak_384 = _.keccak_256 = _.keccak_224 = _.sha3_512 = _.sha3_384 = _.sha3_256 = _.sha3_224 = _.Keccak = void 0, _.keccakP = k;
  const t = /* @__PURE__ */ Ct(), e = /* @__PURE__ */ Rt(), n = BigInt(0), o = BigInt(1), s = BigInt(2), d = BigInt(7), a = BigInt(256), h = BigInt(113), w = [], y = [], S = [];
  for (let f = 0, c = o, p = 1, O = 0; f < 24; f++) {
    [p, O] = [O, (2 * p + 3 * O) % 5], w.push(2 * (5 * O + p)), y.push((f + 1) * (f + 2) / 2 % 64);
    let A = n;
    for (let u = 0; u < 7; u++)
      c = (c << o ^ (c >> d) * h) % a, c & s && (A ^= o << (o << /* @__PURE__ */ BigInt(u)) - o);
    S.push(A);
  }
  const P = (0, t.split)(S, !0), F = P[0], M = P[1], E = (f, c, p) => p > 32 ? (0, t.rotlBH)(f, c, p) : (0, t.rotlSH)(f, c, p), b = (f, c, p) => p > 32 ? (0, t.rotlBL)(f, c, p) : (0, t.rotlSL)(f, c, p);
  function k(f, c = 24) {
    const p = new Uint32Array(10);
    for (let O = 24 - c; O < 24; O++) {
      for (let i = 0; i < 10; i++)
        p[i] = f[i] ^ f[i + 10] ^ f[i + 20] ^ f[i + 30] ^ f[i + 40];
      for (let i = 0; i < 10; i += 2) {
        const l = (i + 8) % 10, v = (i + 2) % 10, C = p[v], R = p[v + 1], V = E(C, R, 1) ^ p[l], J = b(C, R, 1) ^ p[l + 1];
        for (let X = 0; X < 50; X += 10)
          f[i + X] ^= V, f[i + X + 1] ^= J;
      }
      let A = f[2], u = f[3];
      for (let i = 0; i < 24; i++) {
        const l = y[i], v = E(A, u, l), C = b(A, u, l), R = w[i];
        A = f[R], u = f[R + 1], f[R] = v, f[R + 1] = C;
      }
      for (let i = 0; i < 50; i += 10) {
        for (let l = 0; l < 10; l++)
          p[l] = f[i + l];
        for (let l = 0; l < 10; l++)
          f[i + l] ^= ~p[(l + 2) % 10] & p[(l + 4) % 10];
      }
      f[0] ^= F[O], f[1] ^= M[O];
    }
    (0, e.clean)(p);
  }
  class T extends e.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(c, p, O, A = !1, u = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = c, this.suffix = p, this.outputLen = O, this.enableXOF = A, this.rounds = u, (0, e.anumber)(O), !(0 < c && c < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200), this.state32 = (0, e.u32)(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      (0, e.swap32IfBE)(this.state32), k(this.state32, this.rounds), (0, e.swap32IfBE)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(c) {
      (0, e.aexists)(this), c = (0, e.toBytes)(c), (0, e.abytes)(c);
      const { blockLen: p, state: O } = this, A = c.length;
      for (let u = 0; u < A; ) {
        const i = Math.min(p - this.pos, A - u);
        for (let l = 0; l < i; l++)
          O[this.pos++] ^= c[u++];
        this.pos === p && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: c, suffix: p, pos: O, blockLen: A } = this;
      c[O] ^= p, (p & 128) !== 0 && O === A - 1 && this.keccak(), c[A - 1] ^= 128, this.keccak();
    }
    writeInto(c) {
      (0, e.aexists)(this, !1), (0, e.abytes)(c), this.finish();
      const p = this.state, { blockLen: O } = this;
      for (let A = 0, u = c.length; A < u; ) {
        this.posOut >= O && this.keccak();
        const i = Math.min(O - this.posOut, u - A);
        c.set(p.subarray(this.posOut, this.posOut + i), A), this.posOut += i, A += i;
      }
      return c;
    }
    xofInto(c) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(c);
    }
    xof(c) {
      return (0, e.anumber)(c), this.xofInto(new Uint8Array(c));
    }
    digestInto(c) {
      if ((0, e.aoutput)(c, this), this.finished)
        throw new Error("digest() was already called");
      return this.writeInto(c), this.destroy(), c;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = !0, (0, e.clean)(this.state);
    }
    _cloneInto(c) {
      const { blockLen: p, suffix: O, outputLen: A, rounds: u, enableXOF: i } = this;
      return c || (c = new T(p, O, A, i, u)), c.state32.set(this.state32), c.pos = this.pos, c.posOut = this.posOut, c.finished = this.finished, c.rounds = u, c.suffix = O, c.outputLen = A, c.enableXOF = i, c.destroyed = this.destroyed, c;
    }
  }
  _.Keccak = T;
  const L = (f, c, p) => (0, e.createHasher)(() => new T(c, f, p));
  _.sha3_224 = L(6, 144, 224 / 8), _.sha3_256 = L(6, 136, 256 / 8), _.sha3_384 = L(6, 104, 384 / 8), _.sha3_512 = L(6, 72, 512 / 8), _.keccak_224 = L(1, 144, 224 / 8), _.keccak_256 = L(1, 136, 256 / 8), _.keccak_384 = L(1, 104, 384 / 8), _.keccak_512 = L(1, 72, 512 / 8);
  const B = (f, c, p) => (0, e.createXOFer)((O = {}) => new T(c, f, O.dkLen === void 0 ? p : O.dkLen, !0));
  return _.shake128 = B(31, 168, 128 / 8), _.shake256 = B(31, 136, 256 / 8), _;
}
var gt;
function Dt() {
  if (gt) return q;
  gt = 1;
  const { sha3_512: t } = /* @__PURE__ */ Ut(), e = 24, n = 32, o = (E = 4, b = Math.random) => {
    let k = "";
    for (; k.length < E; )
      k = k + Math.floor(b() * 36).toString(36);
    return k;
  };
  function s(E) {
    let b = 8n, k = 0n;
    for (const T of E.values()) {
      const L = BigInt(T);
      k = (k << b) + L;
    }
    return k;
  }
  const d = (E = "") => s(t(E)).toString(36).slice(1), a = Array.from(
    { length: 26 },
    (E, b) => String.fromCharCode(b + 97)
  ), h = (E) => a[Math.floor(E() * a.length)], w = ({
    globalObj: E = typeof ut < "u" ? ut : typeof window < "u" ? window : {},
    random: b = Math.random
  } = {}) => {
    const k = Object.keys(E).toString(), T = k.length ? k + o(n, b) : o(n, b);
    return d(T).substring(0, n);
  }, y = (E) => () => E++, S = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: E = Math.random,
    counter: b = y(Math.floor(E() * S)),
    length: k = e,
    fingerprint: T = w({ random: E })
  } = {}) => function() {
    const B = h(E), f = Date.now().toString(36), c = b().toString(36), p = o(k, E), O = `${f + p + c + T}`;
    return `${B + d(O).substring(1, k)}`;
  }, F = P(), M = (E, { minLength: b = 2, maxLength: k = n } = {}) => {
    const T = E.length, L = /^[0-9a-z]+$/;
    try {
      if (typeof E == "string" && T >= b && T <= k && L.test(E))
        return !0;
    } finally {
    }
    return !1;
  };
  return q.getConstants = () => ({ defaultLength: e, bigLength: n }), q.init = P, q.createId = F, q.bufToBigInt = s, q.createCounter = y, q.createFingerprint = w, q.isCuid = M, q;
}
var yt;
function Mt() {
  if (yt) return W;
  yt = 1;
  const { createId: t, init: e, getConstants: n, isCuid: o } = Dt();
  return W.createId = t, W.init = e, W.getConstants = n, W.isCuid = o, W;
}
var Ft = Mt();
const pt = /\$\{([\w\.\[\]0-9]+)\}/g, qt = (t, e) => t.replace(pt, (n, o) => {
  var a;
  const s = o.split(".");
  let d = e;
  for (const h of s) {
    if (h.includes("[") && h.includes("]")) {
      const w = h.split("[")[0], y = parseInt(h.split("[")[1].split("]")[0]);
      d = (a = d[w]) == null ? void 0 : a[y];
    } else
      d = d[h];
    if (d === void 0)
      return n;
  }
  return String(d);
}), mt = (t, e) => {
  const n = Array.isArray(e), o = n ? e : [e];
  return o.forEach((s) => {
    if (s && typeof s == "object") {
      for (const d in t) {
        const a = t[d];
        if (typeof a == "string" && pt.test(a)) {
          const h = qt(
            a,
            s
          );
          s[d] = h;
        } else s[a] !== void 0 && (s[d] = s[a]);
      }
      s.children && Array.isArray(s.children) && (s.children = mt(t, s.children));
    }
  }), n ? e : o[0];
};
let wt = "";
const jt = () => wt, Yt = (t) => {
  wt = t;
}, zt = (t) => t ? Array.isArray(t) ? t.length === 0 : typeof t == "object" ? Object.keys(t).length === 0 : !1 : !0, Kt = Ft.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), Q = {}, Nt = 2e3, Xt = (t, e, n) => {
  if (Object.assign(t, n, t), typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(n.header)), t.header || (t.header = {}), t.header.reqId = Kt(), e.authorize) {
    const o = jt();
    if (!o) {
      const s = `Error, interface ${e.url} requires authorization to access!`;
      return console.error(s), j.error({ title: s }), !1;
    }
    if (typeof e.authorize == "boolean")
      t.header.authorization = "Bearer " + o;
    else if (typeof e.authorize == "function" && e.authorize(t, e, o) === !1)
      return !1;
  }
  if (e.before) {
    const o = e.before.call(e, t);
    if (o !== void 0)
      return o;
  }
}, ot = (t, e, n, o) => {
  if (n.statusCode >= 200 && n.statusCode < 400) {
    if (e.raw) {
      const d = n.data;
      e.after && e.after.call(e, t, d), o.Result = d;
      return;
    }
    const s = n.data;
    if (s.status === z.SUCCESS) {
      const d = s.data;
      t.method === "POST" && e.fieldMap && d && mt(e.fieldMap, d), e.after && e.after.call(e, s, t), o.Result = s;
    } else
      console.error(s), o.Error = {
        status: s.status,
        errno: s.errno,
        msg: s.msg || "Request Error"
      }, o.Result = s;
  } else {
    let s;
    const d = n.statusCode;
    switch (d) {
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
    if (s = `${d}: ${s}`, e.raw) {
      const h = {
        status: z.ERROR,
        errno: d + 1e3,
        msg: s
      };
      o.Error = h;
      return;
    }
    const a = {
      status: z.ERROR,
      errno: d + 1e3,
      msg: s
    };
    o.Error = a;
  }
}, it = (t, e) => {
  console.error(t);
  const n = {
    status: z.ERROR,
    errno: 1e3,
    msg: "Network Error: " + t.toString()
  };
  e.Error = n;
}, bt = (t, e, n) => {
  const o = t.loadingText ? 500 : 0;
  setTimeout(() => {
    var s, d;
    j.hide(), e.Error && (console.error(Y(t), e.Error), t.hideErrorToast || j.error({ title: e.Error.msg }), t.raw ? e.Result = e.Error : e.Result = {
      status: z.ERROR,
      errno: e.Error.errno,
      msg: e.Error.msg,
      timestamp: (s = e.Result) == null ? void 0 : s.timestamp,
      data: (d = e.Result) == null ? void 0 : d.data
    }), n(e.Result);
  }, o);
}, N = (t, e, n) => {
  const o = Y(At);
  if (Xt(t, e, o) === !1) return Promise.resolve(null);
  if (t.loadingText && j.loading({
    title: t.loadingText.toString()
  }), e.raw)
    return n(t, e);
  if (t.method === "POST") {
    const d = {
      ...e,
      key: e.url,
      params: t.data,
      fields: ["Query", "Option.SelectFields"],
      fieldMap: e.fieldMap
    };
    if (e.cacheTime) {
      const y = st.get(d);
      y && setTimeout(() => (j.hide(), Promise.resolve({
        status: z.SUCCESS,
        data: y
      })), 500);
    }
    const a = I(
      t.url,
      t.data,
      e.fieldMap,
      ["Query", "Option.SelectFields"]
    ), h = Q[a];
    if (h)
      if (h.expire && h.expire < Date.now())
        delete Q[a];
      else return h.expire ? new Promise((y) => {
        setTimeout(() => {
          j.hide(), y(h.result);
        }, 500);
      }) : new Promise((y) => {
        setTimeout(() => {
          j.hide(), h.sharedPromise.then(y);
        }, 500);
      });
    e.loading = !0;
    const w = n(t, e).then((y) => {
      if (typeof y == "boolean") return y;
      (y == null ? void 0 : y.status) === z.SUCCESS && !zt(y == null ? void 0 : y.data) && e.cacheTime && st.set(d, y.data, e.cacheTime);
      let S = Q[a];
      return S.result = y, S.expire = Date.now() + Nt, Q[a] = S, y;
    }).finally(() => {
      e.loading = !1;
    });
    return Q[a] = {
      sharedPromise: w
    }, w;
  } else
    return n(t, e);
}, $ = (t, e) => {
  const n = {
    Result: null
  };
  return new Promise((o) => {
    uni.request({
      ...t,
      success: (s) => {
        ot(t, e, s, n);
      },
      fail: (s) => {
        it(s, n);
      },
      complete: () => {
        bt(e, n, o);
      }
    });
  });
}, Zt = (t) => {
  const e = K(t);
  return e === !1 ? Promise.resolve(null) : N(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    $
  );
}, It = (t, e) => {
  const n = K(t);
  return n === !1 ? Promise.resolve(null) : N(
    {
      url: n,
      dataType: "json",
      method: "PUT",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: "Saving Data..."
    },
    t,
    $
  );
}, $t = (t, e) => {
  const n = K(t);
  return n === !1 ? Promise.resolve(null) : N(
    {
      url: n,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "Deleting Data..."
    },
    t,
    $
  );
}, te = (t, e) => {
  const n = K(t);
  return n === !1 ? Promise.resolve(null) : N(
    {
      url: n,
      dataType: "json",
      method: "POST",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    $
  );
}, tt = (t, e) => {
  const n = {
    Result: null
  }, { header: o, ...s } = t;
  return new Promise((d) => {
    Et.request({
      ...s,
      headers: o
    }).then((a) => {
      ot(
        t,
        e,
        {
          statusCode: a.status,
          data: a.data
        },
        n
      );
    }).catch((a) => {
      var h;
      a.response && a.response.status && a.response.status > 200 && a.response.status < 600 ? ot(
        t,
        e,
        {
          statusCode: a.response.status,
          data: (h = a.response) == null ? void 0 : h.data
        },
        n
      ) : it(a, n);
    }).finally(() => {
      bt(e, n, d);
    });
  });
}, ee = (t) => {
  const e = K(t);
  return e === !1 ? Promise.resolve(null) : N(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    tt
  );
}, re = (t, e) => {
  const n = K(t);
  return n === !1 ? Promise.resolve(null) : N(
    {
      url: n,
      dataType: "json",
      method: "PUT",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: "Saving Data..."
    },
    t,
    tt
  );
}, ne = (t, e) => {
  const n = K(t);
  return n === !1 ? Promise.resolve(null) : N(
    {
      url: n,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "Deleting Data..."
    },
    t,
    tt
  );
}, se = (t, e) => {
  const n = K(t);
  return n === !1 ? Promise.resolve(null) : N(
    {
      url: n,
      dataType: "json",
      method: "POST",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    tt
  );
}, oe = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
export {
  xt as API_HOST,
  st as FrontCache,
  Qt as ICON_HOST,
  z as ResStatus,
  Gt as SERVER_HOST,
  Y as deepClone,
  mt as fieldMapping,
  jt as getToken,
  At as globalRequestOption,
  K as hostUrl,
  ne as httpDelete,
  ee as httpGet,
  se as httpPost,
  re as httpPut,
  oe as isJSON,
  qt as parseFieldTemplate,
  Yt as setToken,
  j as toast,
  $t as uniDelete,
  Zt as uniGet,
  te as uniPost,
  It as uniPut
};
