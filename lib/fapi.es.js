var mt = Object.defineProperty;
var bt = (t, e, n) => e in t ? mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Q = (t, e, n) => bt(t, typeof e != "symbol" ? e + "" : e, n);
import X from "vue-m-message";
import wt from "axios";
var q = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(q || {});
const kt = {
  url: "",
  header: { "Content-Type": "application/json" }
}, St = (t) => {
  Object.assign(kt, t);
}, $ = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const n = [];
    for (let i = 0; i < t.length; i++)
      n[i] = $(t[i]);
    return n;
  }
  const e = {};
  for (const n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = $(t[n]));
  return e;
}, Tt = (t, e) => t << e | t >>> 32 - e, Lt = (t) => {
  const e = [];
  for (let b = 0; b < t.length; b++)
    e.push(t.charCodeAt(b));
  const n = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(n >>> 24 & 255), e.push(n >>> 16 & 255), e.push(n >>> 8 & 255), e.push(n & 255);
  let i = 1732584193, o = 4023233417, f = 2562383102, c = 271733878;
  const s = (b, S, k) => b & S | ~b & k, g = (b, S, k) => b & k | S & ~k, y = (b, S, k) => b ^ S ^ k, L = (b, S, k) => S ^ (b | ~k), H = [
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
  ], j = [
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
  let C = 0;
  for (; C < e.length; ) {
    const b = new Array(16).fill(0);
    for (let d = 0; d < 16; d++)
      b[d] = e[C + d] || 0;
    let S = i, k = o, A = f, B = c;
    for (let d = 0; d < 64; d++) {
      let l, p, T;
      d < 16 ? (l = s(k, A, B), p = d) : d < 32 ? (l = g(k, A, B), p = (5 * d + 1) % 16) : d < 48 ? (l = y(k, A, B), p = (3 * d + 5) % 16) : (l = L(k, A, B), p = 7 * d % 16), T = B, B = A, A = k, k = k + Tt(S + l + H[d] + b[p] | 0, j[d]), S = T;
    }
    i = i + S | 0, o = o + k | 0, f = f + A | 0, c = c + B | 0, C += 16;
  }
  return [i, o, f, c].map((b) => {
    const S = b & 255, k = b >>> 8 & 255, A = b >>> 16 & 255;
    return [b >>> 24 & 255, A, k, S];
  }).flat().map((b) => b.toString(16).padStart(2, "0")).join("");
}, Ot = (t) => Lt(t), J = (t, e, n, i) => {
  if (!e) return t;
  let o = $(e);
  n && (o.FieldMap = n), i && i.length > 0 && (i[0].startsWith("-") ? i.forEach((c) => {
    if (c.indexOf(".") > -1) {
      const s = c.split(".");
      let g = o;
      for (let y = 0; y < s.length && (y === s.length - 1 && delete g[s[y]], typeof g[s[y]] == "object" && !Array.isArray(g[s[y]])); y++)
        g = g[s[y]];
    } else delete o[c];
  }) : (o = {}, i.forEach((c) => {
    if (c.indexOf(".") > -1) {
      const s = c.split(".");
      let g = e, y = o;
      for (let L = 0; L < s.length; L++)
        if (L === s.length - 1)
          y[s[L]] = g[s[L]];
        else {
          if (g[s[L]] === null || g[s[L]] === void 0)
            break;
          if (y[s[L]] === void 0)
            if (typeof g[s[L]] != "object" || Array.isArray(g[s[L]])) {
              y[s[L]] = g[s[L]];
              break;
            } else y[s[L]] = {};
          y = y[s[L]], g = g[s[L]];
        }
    } else o[c] = e[c];
  })));
  const f = JSON.stringify(o);
  return `${t}-` + Ot(f);
}, Y = /* @__PURE__ */ new Map(), I = {
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
    fieldMap: i,
    lastModified: o,
    storage: f = "memory"
  }, c, s = -1) {
    if (c == null) return;
    const g = J(t, e, i, n), y = s !== -1 ? Date.now() + s : void 0, L = `frontCache::${g}`, H = {
      data: c,
      expireAt: y,
      lastModified: o ?? Date.now()
    };
    switch (f) {
      case "memory":
        Y.set(L, H);
        break;
      case "uni":
        uni.setStorageSync(L, JSON.stringify(H));
        break;
      case "session":
        sessionStorage.setItem(L, JSON.stringify(H));
        break;
      case "local":
        localStorage.setItem(L, JSON.stringify(H));
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
    fieldMap: i,
    storage: o = "memory"
  }) {
    const c = `frontCache::${J(t, e, i, n)}`;
    let s = null, g;
    switch (o) {
      case "memory":
        s = Y.get(c);
        break;
      case "uni":
        g = uni.getStorageSync(c), s = g ? JSON.parse(g) : null;
        break;
      case "session":
        g = sessionStorage.getItem(c), s = g ? JSON.parse(g) : null;
        break;
      case "local":
        g = localStorage.getItem(c), s = g ? JSON.parse(g) : null;
        break;
    }
    return s && (!s.expireAt || s.expireAt > Date.now()) ? s.data : (I.remove({ key: t, params: e, storage: o }), null);
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
    fieldMap: i,
    storage: o = "memory"
  }) {
    const c = `frontCache::${J(t, e, i, n)}`;
    switch (o) {
      case "memory":
        Y.delete(c);
        break;
      case "uni":
        uni.removeStorageSync(c);
        break;
      case "session":
        sessionStorage.removeItem(c);
        break;
      case "local":
        localStorage.removeItem(c);
        break;
    }
  }
}, _t = {
  SITEHOST_API: ""
}, Nt = {}, Vt = {};
class At {
  constructor() {
    Q(this, "currentToast", []);
    Q(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "none",
      mask: !1,
      position: "center",
      zIndex: 9999
    });
  }
  showToast(e, n, i, o) {
    const f = typeof n == "string" ? n : n.title || i;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: o || this.defaultOptions.duration,
      title: f
    });
  }
  success(e) {
    this.showToast("success", e, "操作成功");
  }
  error(e) {
    this.showToast("error", e, "操作失败", 5e3);
  }
  warning(e) {
    this.showToast("warning", e, "警告警告", 5e3);
  }
  info(e) {
    this.showToast("none", e, "提示信息");
  }
  loading(e) {
    this.showToast("loading", e, "数据加载中", -1);
  }
  hide(e) {
    e = e || 0;
    const n = this.currentToast.map((i) => i.id);
    e === 0 ? this.close(n) : setTimeout(() => this.close(n), e);
  }
  close(e) {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : (e.forEach((n) => {
      var i;
      (i = this.currentToast.find((o) => o.id === n)) == null || i.close();
    }), this.currentToast = this.currentToast.filter(
      (n) => !e.includes(n.id)
    ));
  }
  show(e) {
    const { title: n, icon: i, mask: o, duration: f, position: c } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: n,
        icon: i === "warning" ? "error" : i,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: f,
        position: c,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else {
      let s = "info";
      switch (this.hide(), i) {
        case "success":
          this.currentToast.push(
            X.success(n, {
              ...e,
              title: "",
              position: "top-center",
              hasMask: o,
              type: s,
              icon: s,
              closeOnClick: !0,
              pauseOnFocusLoss: !0,
              pauseOnHover: !0,
              zIndex: e.zIndex || 9999
            })
          );
          break;
        case "error":
          this.currentToast.push(
            X.error(n, {
              ...e,
              title: "",
              position: "top-center",
              hasMask: o,
              type: s,
              icon: s,
              zIndex: e.zIndex || 9999
            })
          );
          break;
        case "loading":
          this.currentToast.push(
            X.loading(n, {
              ...e,
              title: "",
              position: "top-center",
              hasMask: o,
              type: s,
              icon: s,
              duration: -1,
              // 不自动关闭
              zIndex: e.zIndex || 9999
            })
          );
          break;
        default:
          this.currentToast.push(
            X.info(n, {
              ...e,
              title: "",
              position: "top-center",
              hasMask: o,
              type: s,
              icon: s,
              zIndex: e.zIndex || 9999
            })
          );
          break;
      }
    }
  }
}
const U = new At(), F = (t) => {
  let { api: e, url: n, authorize: i } = t;
  if (n.startsWith("http://") || n.startsWith("https://") || !e)
    return n;
  const o = _t[e];
  if (!o)
    return U.error("未查询到接口域名：" + e), !1;
  if (typeof o == "string")
    return o + n;
  if (typeof o == "object") {
    const { host: f, authorize: c } = o;
    return (i === void 0 || i === !1) && (t.authorize = c), n = f + n, n;
  }
  return n;
};
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, z = {}, M = {}, x = {}, R = {}, st;
function ht() {
  if (st) return R;
  st = 1, Object.defineProperty(R, "__esModule", { value: !0 }), R.anumber = t, R.number = t, R.abytes = n, R.bytes = n, R.ahash = i, R.aexists = o, R.aoutput = f;
  function t(s) {
    if (!Number.isSafeInteger(s) || s < 0)
      throw new Error("positive integer expected, got " + s);
  }
  function e(s) {
    return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
  }
  function n(s, ...g) {
    if (!e(s))
      throw new Error("Uint8Array expected");
    if (g.length > 0 && !g.includes(s.length))
      throw new Error("Uint8Array expected of length " + g + ", got length=" + s.length);
  }
  function i(s) {
    if (typeof s != "function" || typeof s.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    t(s.outputLen), t(s.blockLen);
  }
  function o(s, g = !0) {
    if (s.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (g && s.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function f(s, g) {
    n(s);
    const y = g.outputLen;
    if (s.length < y)
      throw new Error("digestInto() expects output buffer of length at least " + y);
  }
  const c = {
    number: t,
    bytes: n,
    hash: i,
    exists: o,
    output: f
  };
  return R.default = c, R;
}
var m = {}, ot;
function Et() {
  if (ot) return m;
  ot = 1, Object.defineProperty(m, "__esModule", { value: !0 }), m.add5L = m.add5H = m.add4H = m.add4L = m.add3H = m.add3L = m.rotlBL = m.rotlBH = m.rotlSL = m.rotlSH = m.rotr32L = m.rotr32H = m.rotrBL = m.rotrBH = m.rotrSL = m.rotrSH = m.shrSL = m.shrSH = m.toBig = void 0, m.fromBig = n, m.split = i, m.add = k;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function n(u, a = !1) {
    return a ? { h: Number(u & t), l: Number(u >> e & t) } : { h: Number(u >> e & t) | 0, l: Number(u & t) | 0 };
  }
  function i(u, a = !1) {
    let r = new Uint32Array(u.length), h = new Uint32Array(u.length);
    for (let w = 0; w < u.length; w++) {
      const { h: O, l: v } = n(u[w], a);
      [r[w], h[w]] = [O, v];
    }
    return [r, h];
  }
  const o = (u, a) => BigInt(u >>> 0) << e | BigInt(a >>> 0);
  m.toBig = o;
  const f = (u, a, r) => u >>> r;
  m.shrSH = f;
  const c = (u, a, r) => u << 32 - r | a >>> r;
  m.shrSL = c;
  const s = (u, a, r) => u >>> r | a << 32 - r;
  m.rotrSH = s;
  const g = (u, a, r) => u << 32 - r | a >>> r;
  m.rotrSL = g;
  const y = (u, a, r) => u << 64 - r | a >>> r - 32;
  m.rotrBH = y;
  const L = (u, a, r) => u >>> r - 32 | a << 64 - r;
  m.rotrBL = L;
  const H = (u, a) => a;
  m.rotr32H = H;
  const j = (u, a) => u;
  m.rotr32L = j;
  const C = (u, a, r) => u << r | a >>> 32 - r;
  m.rotlSH = C;
  const _ = (u, a, r) => a << r | u >>> 32 - r;
  m.rotlSL = _;
  const b = (u, a, r) => a << r - 32 | u >>> 64 - r;
  m.rotlBH = b;
  const S = (u, a, r) => u << r - 32 | a >>> 64 - r;
  m.rotlBL = S;
  function k(u, a, r, h) {
    const w = (a >>> 0) + (h >>> 0);
    return { h: u + r + (w / 2 ** 32 | 0) | 0, l: w | 0 };
  }
  const A = (u, a, r) => (u >>> 0) + (a >>> 0) + (r >>> 0);
  m.add3L = A;
  const B = (u, a, r, h) => a + r + h + (u / 2 ** 32 | 0) | 0;
  m.add3H = B;
  const d = (u, a, r, h) => (u >>> 0) + (a >>> 0) + (r >>> 0) + (h >>> 0);
  m.add4L = d;
  const l = (u, a, r, h, w) => a + r + h + w + (u / 2 ** 32 | 0) | 0;
  m.add4H = l;
  const p = (u, a, r, h, w) => (u >>> 0) + (a >>> 0) + (r >>> 0) + (h >>> 0) + (w >>> 0);
  m.add5L = p;
  const T = (u, a, r, h, w, O) => a + r + h + w + O + (u / 2 ** 32 | 0) | 0;
  m.add5H = T;
  const E = {
    fromBig: n,
    split: i,
    toBig: o,
    shrSH: f,
    shrSL: c,
    rotrSH: s,
    rotrSL: g,
    rotrBH: y,
    rotrBL: L,
    rotr32H: H,
    rotr32L: j,
    rotlSH: C,
    rotlSL: _,
    rotlBH: b,
    rotlBL: S,
    add: k,
    add3L: A,
    add3H: B,
    add4L: d,
    add4H: l,
    add5H: T,
    add5L: p
  };
  return m.default = E, m;
}
var Z = {}, N = {}, it;
function xt() {
  return it || (it = 1, Object.defineProperty(N, "__esModule", { value: !0 }), N.crypto = void 0, N.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), N;
}
var at;
function Bt() {
  return at || (at = 1, function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = i, t.byteSwap32 = L, t.bytesToHex = j, t.hexToBytes = b, t.asyncLoop = k, t.utf8ToBytes = A, t.toBytes = B, t.concatBytes = d, t.checkOpts = p, t.wrapConstructor = T, t.wrapConstructorWithOpts = E, t.wrapXOFConstructorWithOpts = u, t.randomBytes = a;
    const e = /* @__PURE__ */ xt(), n = /* @__PURE__ */ ht();
    function i(r) {
      return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
    }
    const o = (r) => new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    t.u8 = o;
    const f = (r) => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
    t.u32 = f;
    const c = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength);
    t.createView = c;
    const s = (r, h) => r << 32 - h | r >>> h;
    t.rotr = s;
    const g = (r, h) => r << h | r >>> 32 - h >>> 0;
    t.rotl = g, t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const y = (r) => r << 24 & 4278190080 | r << 8 & 16711680 | r >>> 8 & 65280 | r >>> 24 & 255;
    t.byteSwap = y, t.byteSwapIfBE = t.isLE ? (r) => r : (r) => (0, t.byteSwap)(r);
    function L(r) {
      for (let h = 0; h < r.length; h++)
        r[h] = (0, t.byteSwap)(r[h]);
    }
    const H = /* @__PURE__ */ Array.from({ length: 256 }, (r, h) => h.toString(16).padStart(2, "0"));
    function j(r) {
      (0, n.abytes)(r);
      let h = "";
      for (let w = 0; w < r.length; w++)
        h += H[r[w]];
      return h;
    }
    const C = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function _(r) {
      if (r >= C._0 && r <= C._9)
        return r - C._0;
      if (r >= C.A && r <= C.F)
        return r - (C.A - 10);
      if (r >= C.a && r <= C.f)
        return r - (C.a - 10);
    }
    function b(r) {
      if (typeof r != "string")
        throw new Error("hex string expected, got " + typeof r);
      const h = r.length, w = h / 2;
      if (h % 2)
        throw new Error("hex string expected, got unpadded hex of length " + h);
      const O = new Uint8Array(w);
      for (let v = 0, P = 0; v < w; v++, P += 2) {
        const K = _(r.charCodeAt(P)), rt = _(r.charCodeAt(P + 1));
        if (K === void 0 || rt === void 0) {
          const pt = r[P] + r[P + 1];
          throw new Error('hex string expected, got non-hex character "' + pt + '" at index ' + P);
        }
        O[v] = K * 16 + rt;
      }
      return O;
    }
    const S = async () => {
    };
    t.nextTick = S;
    async function k(r, h, w) {
      let O = Date.now();
      for (let v = 0; v < r; v++) {
        w(v);
        const P = Date.now() - O;
        P >= 0 && P < h || (await (0, t.nextTick)(), O += P);
      }
    }
    function A(r) {
      if (typeof r != "string")
        throw new Error("utf8ToBytes expected string, got " + typeof r);
      return new Uint8Array(new TextEncoder().encode(r));
    }
    function B(r) {
      return typeof r == "string" && (r = A(r)), (0, n.abytes)(r), r;
    }
    function d(...r) {
      let h = 0;
      for (let O = 0; O < r.length; O++) {
        const v = r[O];
        (0, n.abytes)(v), h += v.length;
      }
      const w = new Uint8Array(h);
      for (let O = 0, v = 0; O < r.length; O++) {
        const P = r[O];
        w.set(P, v), v += P.length;
      }
      return w;
    }
    class l {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    }
    t.Hash = l;
    function p(r, h) {
      if (h !== void 0 && {}.toString.call(h) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      return Object.assign(r, h);
    }
    function T(r) {
      const h = (O) => r().update(B(O)).digest(), w = r();
      return h.outputLen = w.outputLen, h.blockLen = w.blockLen, h.create = () => r(), h;
    }
    function E(r) {
      const h = (O, v) => r(v).update(B(O)).digest(), w = r({});
      return h.outputLen = w.outputLen, h.blockLen = w.blockLen, h.create = (O) => r(O), h;
    }
    function u(r) {
      const h = (O, v) => r(v).update(B(O)).digest(), w = r({});
      return h.outputLen = w.outputLen, h.blockLen = w.blockLen, h.create = (O) => r(O), h;
    }
    function a(r = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function")
        return e.crypto.getRandomValues(new Uint8Array(r));
      if (e.crypto && typeof e.crypto.randomBytes == "function")
        return e.crypto.randomBytes(r);
      throw new Error("crypto.getRandomValues must be defined");
    }
  }(Z)), Z;
}
var ct;
function vt() {
  if (ct) return x;
  ct = 1, Object.defineProperty(x, "__esModule", { value: !0 }), x.shake256 = x.shake128 = x.keccak_512 = x.keccak_384 = x.keccak_256 = x.keccak_224 = x.sha3_512 = x.sha3_384 = x.sha3_256 = x.sha3_224 = x.Keccak = void 0, x.keccakP = S;
  const t = /* @__PURE__ */ ht(), e = /* @__PURE__ */ Et(), n = /* @__PURE__ */ Bt(), i = [], o = [], f = [], c = /* @__PURE__ */ BigInt(0), s = /* @__PURE__ */ BigInt(1), g = /* @__PURE__ */ BigInt(2), y = /* @__PURE__ */ BigInt(7), L = /* @__PURE__ */ BigInt(256), H = /* @__PURE__ */ BigInt(113);
  for (let d = 0, l = s, p = 1, T = 0; d < 24; d++) {
    [p, T] = [T, (2 * p + 3 * T) % 5], i.push(2 * (5 * T + p)), o.push((d + 1) * (d + 2) / 2 % 64);
    let E = c;
    for (let u = 0; u < 7; u++)
      l = (l << s ^ (l >> y) * H) % L, l & g && (E ^= s << (s << /* @__PURE__ */ BigInt(u)) - s);
    f.push(E);
  }
  const [j, C] = /* @__PURE__ */ (0, e.split)(f, !0), _ = (d, l, p) => p > 32 ? (0, e.rotlBH)(d, l, p) : (0, e.rotlSH)(d, l, p), b = (d, l, p) => p > 32 ? (0, e.rotlBL)(d, l, p) : (0, e.rotlSL)(d, l, p);
  function S(d, l = 24) {
    const p = new Uint32Array(10);
    for (let T = 24 - l; T < 24; T++) {
      for (let a = 0; a < 10; a++)
        p[a] = d[a] ^ d[a + 10] ^ d[a + 20] ^ d[a + 30] ^ d[a + 40];
      for (let a = 0; a < 10; a += 2) {
        const r = (a + 8) % 10, h = (a + 2) % 10, w = p[h], O = p[h + 1], v = _(w, O, 1) ^ p[r], P = b(w, O, 1) ^ p[r + 1];
        for (let K = 0; K < 50; K += 10)
          d[a + K] ^= v, d[a + K + 1] ^= P;
      }
      let E = d[2], u = d[3];
      for (let a = 0; a < 24; a++) {
        const r = o[a], h = _(E, u, r), w = b(E, u, r), O = i[a];
        E = d[O], u = d[O + 1], d[O] = h, d[O + 1] = w;
      }
      for (let a = 0; a < 50; a += 10) {
        for (let r = 0; r < 10; r++)
          p[r] = d[a + r];
        for (let r = 0; r < 10; r++)
          d[a + r] ^= ~p[(r + 2) % 10] & p[(r + 4) % 10];
      }
      d[0] ^= j[T], d[1] ^= C[T];
    }
    p.fill(0);
  }
  class k extends n.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(l, p, T, E = !1, u = 24) {
      if (super(), this.blockLen = l, this.suffix = p, this.outputLen = T, this.enableXOF = E, this.rounds = u, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, t.anumber)(T), 0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200), this.state32 = (0, n.u32)(this.state);
    }
    keccak() {
      n.isLE || (0, n.byteSwap32)(this.state32), S(this.state32, this.rounds), n.isLE || (0, n.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(l) {
      (0, t.aexists)(this);
      const { blockLen: p, state: T } = this;
      l = (0, n.toBytes)(l);
      const E = l.length;
      for (let u = 0; u < E; ) {
        const a = Math.min(p - this.pos, E - u);
        for (let r = 0; r < a; r++)
          T[this.pos++] ^= l[u++];
        this.pos === p && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: l, suffix: p, pos: T, blockLen: E } = this;
      l[T] ^= p, (p & 128) !== 0 && T === E - 1 && this.keccak(), l[E - 1] ^= 128, this.keccak();
    }
    writeInto(l) {
      (0, t.aexists)(this, !1), (0, t.abytes)(l), this.finish();
      const p = this.state, { blockLen: T } = this;
      for (let E = 0, u = l.length; E < u; ) {
        this.posOut >= T && this.keccak();
        const a = Math.min(T - this.posOut, u - E);
        l.set(p.subarray(this.posOut, this.posOut + a), E), this.posOut += a, E += a;
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
      this.destroyed = !0, this.state.fill(0);
    }
    _cloneInto(l) {
      const { blockLen: p, suffix: T, outputLen: E, rounds: u, enableXOF: a } = this;
      return l || (l = new k(p, T, E, a, u)), l.state32.set(this.state32), l.pos = this.pos, l.posOut = this.posOut, l.finished = this.finished, l.rounds = u, l.suffix = T, l.outputLen = E, l.enableXOF = a, l.destroyed = this.destroyed, l;
    }
  }
  x.Keccak = k;
  const A = (d, l, p) => (0, n.wrapConstructor)(() => new k(l, d, p));
  x.sha3_224 = A(6, 144, 224 / 8), x.sha3_256 = A(6, 136, 256 / 8), x.sha3_384 = A(6, 104, 384 / 8), x.sha3_512 = A(6, 72, 512 / 8), x.keccak_224 = A(1, 144, 224 / 8), x.keccak_256 = A(1, 136, 256 / 8), x.keccak_384 = A(1, 104, 384 / 8), x.keccak_512 = A(1, 72, 512 / 8);
  const B = (d, l, p) => (0, n.wrapXOFConstructorWithOpts)((T = {}) => new k(l, d, T.dkLen === void 0 ? p : T.dkLen, !0));
  return x.shake128 = B(31, 168, 128 / 8), x.shake256 = B(31, 136, 256 / 8), x;
}
var ut;
function Ct() {
  if (ut) return M;
  ut = 1;
  const { sha3_512: t } = /* @__PURE__ */ vt(), e = 24, n = 32, i = (_ = 4, b = Math.random) => {
    let S = "";
    for (; S.length < _; )
      S = S + Math.floor(b() * 36).toString(36);
    return S;
  };
  function o(_) {
    let b = 8n, S = 0n;
    for (const k of _.values()) {
      const A = BigInt(k);
      S = (S << b) + A;
    }
    return S;
  }
  const f = (_ = "") => o(t(_)).toString(36).slice(1), c = Array.from(
    { length: 26 },
    (_, b) => String.fromCharCode(b + 97)
  ), s = (_) => c[Math.floor(_() * c.length)], g = ({
    globalObj: _ = typeof nt < "u" ? nt : typeof window < "u" ? window : {},
    random: b = Math.random
  } = {}) => {
    const S = Object.keys(_).toString(), k = S.length ? S + i(n, b) : i(n, b);
    return f(k).substring(0, n);
  }, y = (_) => () => _++, L = 476782367, H = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: _ = Math.random,
    counter: b = y(Math.floor(_() * L)),
    length: S = e,
    fingerprint: k = g({ random: _ })
  } = {}) => function() {
    const B = s(_), d = Date.now().toString(36), l = b().toString(36), p = i(S, _), T = `${d + p + l + k}`;
    return `${B + f(T).substring(1, S)}`;
  }, j = H(), C = (_, { minLength: b = 2, maxLength: S = n } = {}) => {
    const k = _.length, A = /^[0-9a-z]+$/;
    try {
      if (typeof _ == "string" && k >= b && k <= S && A.test(_))
        return !0;
    } finally {
    }
    return !1;
  };
  return M.getConstants = () => ({ defaultLength: e, bigLength: n }), M.init = H, M.createId = j, M.bufToBigInt = o, M.createCounter = y, M.createFingerprint = g, M.isCuid = C, M;
}
var lt;
function Ht() {
  if (lt) return z;
  lt = 1;
  const { createId: t, init: e, getConstants: n, isCuid: i } = Ct();
  return z.createId = t, z.init = e, z.getConstants = n, z.isCuid = i, z;
}
var Pt = Ht();
const ft = /\$\{([\w\.\[\]0-9]+)\}/g, Rt = (t, e) => t.replace(ft, (n, i) => {
  var c;
  const o = i.split(".");
  let f = e;
  for (const s of o) {
    if (s.includes("[") && s.includes("]")) {
      const g = s.split("[")[0], y = parseInt(s.split("[")[1].split("]")[0]);
      f = (c = f[g]) == null ? void 0 : c[y];
    } else
      f = f[s];
    if (f === void 0)
      return n;
  }
  return String(f);
}), dt = (t, e) => {
  const n = Array.isArray(e), i = n ? e : [e];
  return i.forEach((o) => {
    if (o && typeof o == "object") {
      for (const f in t) {
        const c = t[f];
        if (typeof c == "string" && ft.test(c)) {
          const s = Rt(
            c,
            o
          );
          o[f] = s;
        } else o[c] !== void 0 && (o[f] = o[c]);
      }
      o.children && Array.isArray(o.children) && (o.children = dt(t, o.children));
    }
  }), n ? e : i[0];
};
let yt = "";
const jt = () => yt, $t = (t) => {
  yt = t;
}, Mt = (t) => t ? Array.isArray(t) ? t.length === 0 : typeof t == "object" ? Object.keys(t).length === 0 : !1 : !0, Ut = Pt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), V = {}, qt = 2e3, Ft = (t, e, n) => {
  if (Object.assign(t, n, t), typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(n.header)), t.header || (t.header = {}), t.header.reqId = Ut(), e.authorize) {
    const i = jt();
    if (!i) {
      const o = `错误，接口 ${e.url} 需要授权才能访问！`;
      return console.error(o), U.error({ title: o }), !1;
    }
    if (typeof e.authorize == "boolean")
      t.header.authorization = "Bearer " + i;
    else if (typeof e.authorize == "function" && e.authorize(t, e, i) === !1)
      return !1;
  }
  if (e.before) {
    const i = e.before.call(e, t);
    if (i !== void 0)
      return i;
  }
}, tt = (t, e, n, i) => {
  if (n.statusCode >= 200 && n.statusCode < 400) {
    if (e.raw) {
      const f = n.data;
      e.after && e.after.call(e, t, f), i.Result = f;
      return;
    }
    const o = n.data;
    if (o.status === q.SUCCESS) {
      const f = o.data;
      t.method === "POST" && e.fieldMap && f && dt(e.fieldMap, f), e.after && e.after.call(e, o, t), i.Result = o;
    } else
      console.error(o), i.Error = {
        status: o.status,
        errno: o.errno,
        msg: o.msg || "请求发生错误"
      }, i.Result = o;
  } else {
    let o;
    const f = n.statusCode;
    switch (f) {
      case 401:
        o = "未授权或授权过期";
        break;
      case 403:
        o = "无权访问";
        break;
      case 404:
        o = "请求地址错误";
        break;
      case 500:
        o = "服务器异常";
        break;
      default:
        o = "其它请求错误";
        break;
    }
    if (o = `${f}: ${o}`, e.raw) {
      const s = {
        status: q.ERROR,
        errno: f + 1e3,
        msg: o
      };
      i.Error = s;
      return;
    }
    const c = {
      status: q.ERROR,
      errno: f + 1e3,
      msg: o
    };
    i.Error = c;
  }
}, et = (t, e) => {
  console.error(t);
  const n = {
    status: q.ERROR,
    errno: 1e3,
    msg: "网络错误：" + t.toString()
  };
  e.Error = n;
}, gt = (t, e, n) => {
  const i = t.loadingText ? 500 : 0;
  setTimeout(() => {
    var o, f;
    U.hide(), e.Error && (console.error($(t), e.Error), t.hideErrorToast || U.error({ title: e.Error.msg }), t.raw ? e.Result = e.Error : e.Result = {
      status: q.ERROR,
      errno: e.Error.errno,
      msg: e.Error.msg,
      timestamp: (o = e.Result) == null ? void 0 : o.timestamp,
      data: (f = e.Result) == null ? void 0 : f.data
    }), n(e.Result);
  }, i);
}, D = (t, e, n) => {
  const i = $(St);
  if (Ft(t, e, i) === !1) return Promise.resolve(null);
  if (t.loadingText && U.loading({
    title: t.loadingText.toString()
  }), e.raw)
    return n(t, e);
  if (t.method === "POST") {
    const f = {
      ...e,
      key: e.url,
      params: t.data,
      fields: ["Query", "Option.SelectFields"],
      fieldMap: e.fieldMap
    };
    if (e.cacheTime) {
      const y = I.get(f);
      y && setTimeout(() => (U.hide(), Promise.resolve({
        status: q.SUCCESS,
        data: y
      })), 500);
    }
    const c = J(
      t.url,
      t.data,
      e.fieldMap,
      ["Query", "Option.SelectFields"]
    ), s = V[c];
    if (s)
      if (s.expire && s.expire < Date.now())
        delete V[c];
      else return s.expire ? new Promise((y) => {
        setTimeout(() => {
          U.hide(), y(s.result);
        }, 500);
      }) : new Promise((y) => {
        setTimeout(() => {
          U.hide(), s.sharedPromise.then(y);
        }, 500);
      });
    e.loading = !0;
    const g = n(t, e).then((y) => {
      if (typeof y == "boolean") return y;
      (y == null ? void 0 : y.status) === q.SUCCESS && !Mt(y == null ? void 0 : y.data) && e.cacheTime && I.set(f, y.data, e.cacheTime);
      let L = V[c];
      return L.result = y, L.expire = Date.now() + qt, V[c] = L, y;
    }).finally(() => {
      e.loading = !1;
    });
    return V[c] = {
      sharedPromise: g
    }, g;
  } else
    return n(t, e);
}, W = (t, e) => {
  const n = {
    Result: null
  };
  return new Promise((i) => {
    uni.request({
      ...t,
      success: (o) => {
        tt(t, e, o, n);
      },
      fail: (o) => {
        et(o, n);
      },
      complete: () => {
        gt(e, n, i);
      }
    });
  });
}, Xt = (t) => {
  const e = F(t);
  return e === !1 ? Promise.resolve(null) : D(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "数据加载中……"
    },
    t,
    W
  );
}, Jt = (t, e) => {
  const n = F(t);
  return n === !1 ? Promise.resolve(null) : D(
    {
      url: n,
      dataType: "json",
      method: "PUT",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: "正在存储数据……"
    },
    t,
    W
  );
}, Wt = (t, e) => {
  const n = F(t);
  return n === !1 ? Promise.resolve(null) : D(
    {
      url: n,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "正在删除数据……"
    },
    t,
    W
  );
}, Gt = (t, e) => {
  const n = F(t);
  return n === !1 ? Promise.resolve(null) : D(
    {
      url: n,
      dataType: "json",
      method: "POST",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "数据加载中……"
    },
    t,
    W
  );
}, G = (t, e) => {
  const n = {
    Result: null
  }, { header: i, ...o } = t;
  return new Promise((f) => {
    wt.request({
      ...o,
      headers: i
    }).then((c) => {
      tt(
        t,
        e,
        {
          statusCode: c.status,
          data: c.data
        },
        n
      );
    }).catch((c) => {
      var s;
      c.response && c.response.status && c.response.status > 200 && c.response.status < 600 ? tt(
        t,
        e,
        {
          statusCode: c.response.status,
          data: (s = c.response) == null ? void 0 : s.data
        },
        n
      ) : et(c, n);
    }).finally(() => {
      gt(e, n, f);
    });
  });
}, Qt = (t) => {
  const e = F(t);
  return e === !1 ? Promise.resolve(null) : D(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "数据加载中……"
    },
    t,
    G
  );
}, Yt = (t, e) => {
  const n = F(t);
  return n === !1 ? Promise.resolve(null) : D(
    {
      url: n,
      dataType: "json",
      method: "PUT",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: "正在存储数据……"
    },
    t,
    G
  );
}, Zt = (t, e) => {
  const n = F(t);
  return n === !1 ? Promise.resolve(null) : D(
    {
      url: n,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "正在删除数据……"
    },
    t,
    G
  );
}, It = (t, e) => {
  const n = F(t);
  return n === !1 ? Promise.resolve(null) : D(
    {
      url: n,
      dataType: "json",
      method: "POST",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "数据加载中……"
    },
    t,
    G
  );
}, te = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
export {
  _t as API_HOST,
  I as FrontCache,
  Vt as ICON_HOST,
  q as ResStatus,
  Nt as SERVER_HOST,
  $ as deepClone,
  dt as fieldMapping,
  jt as getToken,
  St as globalRequestOption,
  F as hostUrl,
  Zt as httpDelete,
  Qt as httpGet,
  It as httpPost,
  Yt as httpPut,
  te as isJSON,
  Rt as parseFieldTemplate,
  $t as setToken,
  U as toast,
  Wt as uniDelete,
  Xt as uniGet,
  Gt as uniPost,
  Jt as uniPut
};
