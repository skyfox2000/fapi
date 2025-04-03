var mt = Object.defineProperty;
var bt = (t, e, n) => e in t ? mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Q = (t, e, n) => bt(t, typeof e != "symbol" ? e + "" : e, n);
import X from "vue-m-message";
import wt from "axios";
var D = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(D || {});
const kt = {
  url: "",
  header: { "Content-Type": "application/json" }
}, St = (t) => {
  Object.assign(kt, t);
}, z = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const n = [];
    for (let i = 0; i < t.length; i++)
      n[i] = z(t[i]);
    return n;
  }
  const e = {};
  for (const n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = z(t[n]));
  return e;
}, Tt = (t, e) => t << e | t >>> 32 - e, Lt = (t) => {
  const e = [];
  for (let b = 0; b < t.length; b++)
    e.push(t.charCodeAt(b));
  const n = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(n >>> 24 & 255), e.push(n >>> 16 & 255), e.push(n >>> 8 & 255), e.push(n & 255);
  let i = 1732584193, o = 4023233417, d = 2562383102, c = 271733878;
  const s = (b, S, k) => b & S | ~b & k, y = (b, S, k) => b & k | S & ~k, g = (b, S, k) => b ^ S ^ k, L = (b, S, k) => S ^ (b | ~k), v = [
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
  let H = 0;
  for (; H < e.length; ) {
    const b = new Array(16).fill(0);
    for (let f = 0; f < 16; f++)
      b[f] = e[H + f] || 0;
    let S = i, k = o, A = d, x = c;
    for (let f = 0; f < 64; f++) {
      let l, p, T;
      f < 16 ? (l = s(k, A, x), p = f) : f < 32 ? (l = y(k, A, x), p = (5 * f + 1) % 16) : f < 48 ? (l = g(k, A, x), p = (3 * f + 5) % 16) : (l = L(k, A, x), p = 7 * f % 16), T = x, x = A, A = k, k = k + Tt(S + l + v[f] + b[p] | 0, j[f]), S = T;
    }
    i = i + S | 0, o = o + k | 0, d = d + A | 0, c = c + x | 0, H += 16;
  }
  return [i, o, d, c].map((b) => {
    const S = b & 255, k = b >>> 8 & 255, A = b >>> 16 & 255;
    return [b >>> 24 & 255, A, k, S];
  }).flat().map((b) => b.toString(16).padStart(2, "0")).join("");
}, Ot = (t) => Lt(t), J = (t, e, n, i) => {
  if (!e) return t;
  let o = z(e);
  n && (o.FieldMap = n), i && i.length > 0 && (i[0].startsWith("-") ? i.forEach((c) => {
    if (c.indexOf(".") > -1) {
      const s = c.split(".");
      let y = o;
      for (let g = 0; g < s.length && (g === s.length - 1 && delete y[s[g]], typeof y[s[g]] == "object" && !Array.isArray(y[s[g]])); g++)
        y = y[s[g]];
    } else delete o[c];
  }) : (o = {}, i.forEach((c) => {
    if (c.indexOf(".") > -1) {
      const s = c.split(".");
      let y = e, g = o;
      for (let L = 0; L < s.length; L++)
        if (L === s.length - 1)
          g[s[L]] = y[s[L]];
        else {
          if (y[s[L]] === null || y[s[L]] === void 0)
            break;
          if (g[s[L]] === void 0)
            if (typeof y[s[L]] != "object" || Array.isArray(y[s[L]])) {
              g[s[L]] = y[s[L]];
              break;
            } else g[s[L]] = {};
          g = g[s[L]], y = y[s[L]];
        }
    } else o[c] = e[c];
  })));
  const d = JSON.stringify(o);
  return `${t}-` + Ot(d);
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
    storage: d = "memory"
  }, c, s = -1) {
    if (c == null) return;
    const y = J(t, e, i, n), g = s !== -1 ? Date.now() + s : void 0, L = `frontCache::${y}`, v = {
      data: c,
      expireAt: g,
      lastModified: o ?? Date.now()
    };
    switch (d) {
      case "memory":
        Y.set(L, v);
        break;
      case "uni":
        uni.setStorageSync(L, JSON.stringify(v));
        break;
      case "session":
        sessionStorage.setItem(L, JSON.stringify(v));
        break;
      case "local":
        localStorage.setItem(L, JSON.stringify(v));
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
    let s = null, y;
    switch (o) {
      case "memory":
        s = Y.get(c);
        break;
      case "uni":
        y = uni.getStorageSync(c), s = y ? JSON.parse(y) : null;
        break;
      case "session":
        y = sessionStorage.getItem(c), s = y ? JSON.parse(y) : null;
        break;
      case "local":
        y = localStorage.getItem(c), s = y ? JSON.parse(y) : null;
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
}, Vt = {}, $t = {};
class At {
  constructor() {
    Q(this, "currentToast", []);
    Q(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "none",
      mask: !1,
      position: "center"
    });
  }
  showToast(e, n, i, o) {
    const d = typeof n == "string" ? n : n.title || i;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: o || this.defaultOptions.duration,
      title: d
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
    }), this.currentToast = this.currentToast.filter((n) => !e.includes(n.id)));
  }
  show(e) {
    const { title: n, icon: i, mask: o, duration: d, position: c } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: n,
        icon: i === "warning" ? "error" : i,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: d,
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
          this.currentToast.push(X.success(n, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: o,
            type: s,
            icon: s,
            closeOnClick: !0,
            pauseOnFocusLoss: !0,
            pauseOnHover: !0
          }));
          break;
        case "error":
          this.currentToast.push(X.error(n, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: o,
            type: s,
            icon: s
          }));
          break;
        case "loading":
          this.currentToast.push(X.loading(n, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: o,
            type: s,
            icon: s,
            duration: -1
            // 不自动关闭
          }));
          break;
        default:
          this.currentToast.push(X.info(n, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: o,
            type: s,
            icon: s
          }));
          break;
      }
    }
  }
}
const K = new At(), U = (t) => {
  let { api: e, url: n, authorize: i } = t;
  if (n.startsWith("http://") || n.startsWith("https://") || !e)
    return n;
  const o = _t[e];
  if (!o)
    return K.error("未查询到接口域名：" + e), !1;
  if (typeof o == "string")
    return o + n;
  if (typeof o == "object") {
    const { host: d, authorize: c } = o;
    return (i === void 0 || i === !1) && (t.authorize = c), n = d + n, n;
  }
  return n;
};
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, N = {}, M = {}, B = {}, R = {}, st;
function ht() {
  if (st) return R;
  st = 1, Object.defineProperty(R, "__esModule", { value: !0 }), R.anumber = t, R.number = t, R.abytes = n, R.bytes = n, R.ahash = i, R.aexists = o, R.aoutput = d;
  function t(s) {
    if (!Number.isSafeInteger(s) || s < 0)
      throw new Error("positive integer expected, got " + s);
  }
  function e(s) {
    return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
  }
  function n(s, ...y) {
    if (!e(s))
      throw new Error("Uint8Array expected");
    if (y.length > 0 && !y.includes(s.length))
      throw new Error("Uint8Array expected of length " + y + ", got length=" + s.length);
  }
  function i(s) {
    if (typeof s != "function" || typeof s.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    t(s.outputLen), t(s.blockLen);
  }
  function o(s, y = !0) {
    if (s.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (y && s.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function d(s, y) {
    n(s);
    const g = y.outputLen;
    if (s.length < g)
      throw new Error("digestInto() expects output buffer of length at least " + g);
  }
  const c = {
    number: t,
    bytes: n,
    hash: i,
    exists: o,
    output: d
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
      const { h: O, l: C } = n(u[w], a);
      [r[w], h[w]] = [O, C];
    }
    return [r, h];
  }
  const o = (u, a) => BigInt(u >>> 0) << e | BigInt(a >>> 0);
  m.toBig = o;
  const d = (u, a, r) => u >>> r;
  m.shrSH = d;
  const c = (u, a, r) => u << 32 - r | a >>> r;
  m.shrSL = c;
  const s = (u, a, r) => u >>> r | a << 32 - r;
  m.rotrSH = s;
  const y = (u, a, r) => u << 32 - r | a >>> r;
  m.rotrSL = y;
  const g = (u, a, r) => u << 64 - r | a >>> r - 32;
  m.rotrBH = g;
  const L = (u, a, r) => u >>> r - 32 | a << 64 - r;
  m.rotrBL = L;
  const v = (u, a) => a;
  m.rotr32H = v;
  const j = (u, a) => u;
  m.rotr32L = j;
  const H = (u, a, r) => u << r | a >>> 32 - r;
  m.rotlSH = H;
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
  const x = (u, a, r, h) => a + r + h + (u / 2 ** 32 | 0) | 0;
  m.add3H = x;
  const f = (u, a, r, h) => (u >>> 0) + (a >>> 0) + (r >>> 0) + (h >>> 0);
  m.add4L = f;
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
    shrSH: d,
    shrSL: c,
    rotrSH: s,
    rotrSL: y,
    rotrBH: g,
    rotrBL: L,
    rotr32H: v,
    rotr32L: j,
    rotlSH: H,
    rotlSL: _,
    rotlBH: b,
    rotlBL: S,
    add: k,
    add3L: A,
    add3H: x,
    add4L: f,
    add4H: l,
    add5H: T,
    add5L: p
  };
  return m.default = E, m;
}
var Z = {}, V = {}, it;
function Bt() {
  return it || (it = 1, Object.defineProperty(V, "__esModule", { value: !0 }), V.crypto = void 0, V.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), V;
}
var at;
function xt() {
  return at || (at = 1, function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = i, t.byteSwap32 = L, t.bytesToHex = j, t.hexToBytes = b, t.asyncLoop = k, t.utf8ToBytes = A, t.toBytes = x, t.concatBytes = f, t.checkOpts = p, t.wrapConstructor = T, t.wrapConstructorWithOpts = E, t.wrapXOFConstructorWithOpts = u, t.randomBytes = a;
    const e = /* @__PURE__ */ Bt(), n = /* @__PURE__ */ ht();
    function i(r) {
      return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
    }
    const o = (r) => new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    t.u8 = o;
    const d = (r) => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
    t.u32 = d;
    const c = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength);
    t.createView = c;
    const s = (r, h) => r << 32 - h | r >>> h;
    t.rotr = s;
    const y = (r, h) => r << h | r >>> 32 - h >>> 0;
    t.rotl = y, t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const g = (r) => r << 24 & 4278190080 | r << 8 & 16711680 | r >>> 8 & 65280 | r >>> 24 & 255;
    t.byteSwap = g, t.byteSwapIfBE = t.isLE ? (r) => r : (r) => (0, t.byteSwap)(r);
    function L(r) {
      for (let h = 0; h < r.length; h++)
        r[h] = (0, t.byteSwap)(r[h]);
    }
    const v = /* @__PURE__ */ Array.from({ length: 256 }, (r, h) => h.toString(16).padStart(2, "0"));
    function j(r) {
      (0, n.abytes)(r);
      let h = "";
      for (let w = 0; w < r.length; w++)
        h += v[r[w]];
      return h;
    }
    const H = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function _(r) {
      if (r >= H._0 && r <= H._9)
        return r - H._0;
      if (r >= H.A && r <= H.F)
        return r - (H.A - 10);
      if (r >= H.a && r <= H.f)
        return r - (H.a - 10);
    }
    function b(r) {
      if (typeof r != "string")
        throw new Error("hex string expected, got " + typeof r);
      const h = r.length, w = h / 2;
      if (h % 2)
        throw new Error("hex string expected, got unpadded hex of length " + h);
      const O = new Uint8Array(w);
      for (let C = 0, P = 0; C < w; C++, P += 2) {
        const F = _(r.charCodeAt(P)), rt = _(r.charCodeAt(P + 1));
        if (F === void 0 || rt === void 0) {
          const pt = r[P] + r[P + 1];
          throw new Error('hex string expected, got non-hex character "' + pt + '" at index ' + P);
        }
        O[C] = F * 16 + rt;
      }
      return O;
    }
    const S = async () => {
    };
    t.nextTick = S;
    async function k(r, h, w) {
      let O = Date.now();
      for (let C = 0; C < r; C++) {
        w(C);
        const P = Date.now() - O;
        P >= 0 && P < h || (await (0, t.nextTick)(), O += P);
      }
    }
    function A(r) {
      if (typeof r != "string")
        throw new Error("utf8ToBytes expected string, got " + typeof r);
      return new Uint8Array(new TextEncoder().encode(r));
    }
    function x(r) {
      return typeof r == "string" && (r = A(r)), (0, n.abytes)(r), r;
    }
    function f(...r) {
      let h = 0;
      for (let O = 0; O < r.length; O++) {
        const C = r[O];
        (0, n.abytes)(C), h += C.length;
      }
      const w = new Uint8Array(h);
      for (let O = 0, C = 0; O < r.length; O++) {
        const P = r[O];
        w.set(P, C), C += P.length;
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
      const h = (O) => r().update(x(O)).digest(), w = r();
      return h.outputLen = w.outputLen, h.blockLen = w.blockLen, h.create = () => r(), h;
    }
    function E(r) {
      const h = (O, C) => r(C).update(x(O)).digest(), w = r({});
      return h.outputLen = w.outputLen, h.blockLen = w.blockLen, h.create = (O) => r(O), h;
    }
    function u(r) {
      const h = (O, C) => r(C).update(x(O)).digest(), w = r({});
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
function Ct() {
  if (ct) return B;
  ct = 1, Object.defineProperty(B, "__esModule", { value: !0 }), B.shake256 = B.shake128 = B.keccak_512 = B.keccak_384 = B.keccak_256 = B.keccak_224 = B.sha3_512 = B.sha3_384 = B.sha3_256 = B.sha3_224 = B.Keccak = void 0, B.keccakP = S;
  const t = /* @__PURE__ */ ht(), e = /* @__PURE__ */ Et(), n = /* @__PURE__ */ xt(), i = [], o = [], d = [], c = /* @__PURE__ */ BigInt(0), s = /* @__PURE__ */ BigInt(1), y = /* @__PURE__ */ BigInt(2), g = /* @__PURE__ */ BigInt(7), L = /* @__PURE__ */ BigInt(256), v = /* @__PURE__ */ BigInt(113);
  for (let f = 0, l = s, p = 1, T = 0; f < 24; f++) {
    [p, T] = [T, (2 * p + 3 * T) % 5], i.push(2 * (5 * T + p)), o.push((f + 1) * (f + 2) / 2 % 64);
    let E = c;
    for (let u = 0; u < 7; u++)
      l = (l << s ^ (l >> g) * v) % L, l & y && (E ^= s << (s << /* @__PURE__ */ BigInt(u)) - s);
    d.push(E);
  }
  const [j, H] = /* @__PURE__ */ (0, e.split)(d, !0), _ = (f, l, p) => p > 32 ? (0, e.rotlBH)(f, l, p) : (0, e.rotlSH)(f, l, p), b = (f, l, p) => p > 32 ? (0, e.rotlBL)(f, l, p) : (0, e.rotlSL)(f, l, p);
  function S(f, l = 24) {
    const p = new Uint32Array(10);
    for (let T = 24 - l; T < 24; T++) {
      for (let a = 0; a < 10; a++)
        p[a] = f[a] ^ f[a + 10] ^ f[a + 20] ^ f[a + 30] ^ f[a + 40];
      for (let a = 0; a < 10; a += 2) {
        const r = (a + 8) % 10, h = (a + 2) % 10, w = p[h], O = p[h + 1], C = _(w, O, 1) ^ p[r], P = b(w, O, 1) ^ p[r + 1];
        for (let F = 0; F < 50; F += 10)
          f[a + F] ^= C, f[a + F + 1] ^= P;
      }
      let E = f[2], u = f[3];
      for (let a = 0; a < 24; a++) {
        const r = o[a], h = _(E, u, r), w = b(E, u, r), O = i[a];
        E = f[O], u = f[O + 1], f[O] = h, f[O + 1] = w;
      }
      for (let a = 0; a < 50; a += 10) {
        for (let r = 0; r < 10; r++)
          p[r] = f[a + r];
        for (let r = 0; r < 10; r++)
          f[a + r] ^= ~p[(r + 2) % 10] & p[(r + 4) % 10];
      }
      f[0] ^= j[T], f[1] ^= H[T];
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
      l[T] ^= p, p & 128 && T === E - 1 && this.keccak(), l[E - 1] ^= 128, this.keccak();
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
  B.Keccak = k;
  const A = (f, l, p) => (0, n.wrapConstructor)(() => new k(l, f, p));
  B.sha3_224 = A(6, 144, 224 / 8), B.sha3_256 = A(6, 136, 256 / 8), B.sha3_384 = A(6, 104, 384 / 8), B.sha3_512 = A(6, 72, 512 / 8), B.keccak_224 = A(1, 144, 224 / 8), B.keccak_256 = A(1, 136, 256 / 8), B.keccak_384 = A(1, 104, 384 / 8), B.keccak_512 = A(1, 72, 512 / 8);
  const x = (f, l, p) => (0, n.wrapXOFConstructorWithOpts)((T = {}) => new k(l, f, T.dkLen === void 0 ? p : T.dkLen, !0));
  return B.shake128 = x(31, 168, 128 / 8), B.shake256 = x(31, 136, 256 / 8), B;
}
var ut;
function Ht() {
  if (ut) return M;
  ut = 1;
  const { sha3_512: t } = /* @__PURE__ */ Ct(), e = 24, n = 32, i = (_ = 4, b = Math.random) => {
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
  const d = (_ = "") => o(t(_)).toString(36).slice(1), c = Array.from(
    { length: 26 },
    (_, b) => String.fromCharCode(b + 97)
  ), s = (_) => c[Math.floor(_() * c.length)], y = ({
    globalObj: _ = typeof nt < "u" ? nt : typeof window < "u" ? window : {},
    random: b = Math.random
  } = {}) => {
    const S = Object.keys(_).toString(), k = S.length ? S + i(n, b) : i(n, b);
    return d(k).substring(0, n);
  }, g = (_) => () => _++, L = 476782367, v = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: _ = Math.random,
    counter: b = g(Math.floor(_() * L)),
    length: S = e,
    fingerprint: k = y({ random: _ })
  } = {}) => function() {
    const x = s(_), f = Date.now().toString(36), l = b().toString(36), p = i(S, _), T = `${f + p + l + k}`;
    return `${x + d(T).substring(1, S)}`;
  }, j = v(), H = (_, { minLength: b = 2, maxLength: S = n } = {}) => {
    const k = _.length, A = /^[0-9a-z]+$/;
    try {
      if (typeof _ == "string" && k >= b && k <= S && A.test(_))
        return !0;
    } finally {
    }
    return !1;
  };
  return M.getConstants = () => ({ defaultLength: e, bigLength: n }), M.init = v, M.createId = j, M.bufToBigInt = o, M.createCounter = g, M.createFingerprint = y, M.isCuid = H, M;
}
var lt;
function vt() {
  if (lt) return N;
  lt = 1;
  const { createId: t, init: e, getConstants: n, isCuid: i } = Ht();
  return N.createId = t, N.init = e, N.getConstants = n, N.isCuid = i, N;
}
var Pt = vt();
const ft = /\$\{([\w\.\[\]0-9]+)\}/g, Rt = (t, e) => t.replace(ft, (n, i) => {
  var c;
  const o = i.split(".");
  let d = e;
  for (const s of o) {
    if (s.includes("[") && s.includes("]")) {
      const y = s.split("[")[0], g = parseInt(s.split("[")[1].split("]")[0]);
      d = (c = d[y]) == null ? void 0 : c[g];
    } else
      d = d == null ? void 0 : d[s];
    if (d === void 0)
      return n;
  }
  return String(d);
}), dt = (t, e) => {
  const n = Array.isArray(e), i = n ? e : [e];
  return i.forEach((o) => {
    if (o && typeof o == "object") {
      for (const d in t) {
        const c = t[d];
        if (typeof c == "string" && ft.test(c)) {
          const s = Rt(
            c,
            o
          );
          o[d] = s;
        } else o[c] !== void 0 && (o[d] = o[c]);
      }
      o.children && Array.isArray(o.children) && (o.children = dt(t, o.children));
    }
  }), n ? e : i[0];
};
let yt = "";
const jt = () => yt, zt = (t) => {
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
}), $ = {}, qt = 2e3, Ft = (t, e, n) => {
  if (Object.assign(t, n, t), typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(n.header)), t.header || (t.header = {}), t.header.reqId = Ut(), e.authorize) {
    const i = jt();
    if (!i) {
      const o = "错误，接口需要授权才能访问！";
      return console.error(o), K.error({ title: o }), !1;
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
  t.loadingText && K.loading({
    title: t.loadingText.toString()
  });
}, tt = (t, e, n, i) => {
  if (n.statusCode >= 200 && n.statusCode < 400) {
    const o = n.data;
    if (o.status === D.SUCCESS) {
      const d = o.data;
      t.method === "POST" && e.fieldMap && d && dt(e.fieldMap, d), e.after && e.after.call(e, o, t), i.Result = o;
    } else
      console.error(o), i.Error = {
        status: o.status,
        errno: o.errno,
        msg: o.msg || "请求发生错误"
      }, i.Result = o;
  } else {
    let o;
    const d = n.statusCode;
    switch (d) {
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
    o = `${d}: ${o}`;
    const c = {
      status: D.ERROR,
      errno: d + 1e3,
      msg: o
    };
    i.Error = c;
  }
}, et = (t, e) => {
  console.error(t);
  const n = {
    status: D.ERROR,
    errno: 1e3,
    msg: "网络错误：" + t.toString()
  };
  e.Error = n;
}, gt = (t, e, n) => {
  var i, o;
  e.Error ? (K.hide(), console.error(z(t), e.Error), t.hideErrorToast || K.error({ title: e.Error.msg }), e.Result = {
    status: D.ERROR,
    errno: e.Error.errno,
    msg: e.Error.msg,
    timestamp: (i = e.Result) == null ? void 0 : i.timestamp,
    data: (o = e.Result) == null ? void 0 : o.data
  }) : K.hide(1e3), n(e.Result);
}, q = (t, e, n) => {
  const i = z(St);
  if (Ft(t, e, i) === !1) return Promise.resolve(null);
  if (t.method === "POST") {
    const d = {
      ...e,
      key: e.url,
      params: t.data,
      fields: ["Query", "Option.SelectFields"],
      fieldMap: e.fieldMap
    };
    if (e.cacheTime) {
      const g = I.get(d);
      if (g)
        return Promise.resolve({
          status: D.SUCCESS,
          data: g
        });
    }
    const c = J(t.url, t.data, e.fieldMap, [
      "Query",
      "Option.SelectFields"
    ]), s = $[c];
    if (s)
      if (s.expire && s.expire < Date.now())
        delete $[c];
      else return s.expire ? (K.hide(1e3), Promise.resolve(s.result)) : new Promise((g) => {
        s.sharedPromise.then(g);
      });
    e.loading = !0;
    const y = n(t, e).then((g) => {
      if (typeof g == "boolean") return g;
      (g == null ? void 0 : g.status) === D.SUCCESS && !Mt(g == null ? void 0 : g.data) && e.cacheTime && I.set(d, g.data, e.cacheTime);
      let L = $[c];
      return L.result = g, L.expire = Date.now() + qt, $[c] = L, g;
    }).finally(() => {
      e.loading = !1;
    });
    return $[c] = {
      sharedPromise: y
    }, y;
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
  const e = U(t);
  return e === !1 ? Promise.resolve(null) : q(
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
  const n = U(t);
  return n === !1 ? Promise.resolve(null) : q(
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
  const n = U(t);
  return n === !1 ? Promise.resolve(null) : q(
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
  const n = U(t);
  return n === !1 ? Promise.resolve(null) : q(
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
  return new Promise((d) => {
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
      gt(e, n, d);
    });
  });
}, Qt = (t) => {
  const e = U(t);
  return e === !1 ? Promise.resolve(null) : q(
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
  const n = U(t);
  return n === !1 ? Promise.resolve(null) : q(
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
  const n = U(t);
  return n === !1 ? Promise.resolve(null) : q(
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
  const n = U(t);
  return n === !1 ? Promise.resolve(null) : q(
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
  $t as ICON_HOST,
  D as ResStatus,
  Vt as SERVER_HOST,
  z as deepClone,
  dt as fieldMapping,
  jt as getToken,
  St as globalRequestOption,
  U as hostUrl,
  Zt as httpDelete,
  Qt as httpGet,
  It as httpPost,
  Yt as httpPut,
  te as isJSON,
  Rt as parseFieldTemplate,
  zt as setToken,
  K as toast,
  Wt as uniDelete,
  Xt as uniGet,
  Gt as uniPost,
  Jt as uniPut
};
