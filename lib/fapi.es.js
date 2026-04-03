var Ce = Object.defineProperty;
var ve = (e, t, r) => t in e ? Ce(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var se = (e, t, r) => ve(e, typeof t != "symbol" ? t + "" : t, r);
import ee from "vue-m-message";
import Re from "axios";
var j = /* @__PURE__ */ ((e) => (e.SUCCESS = "success", e.ERROR = "error", e))(j || {});
let ie = null, J = null;
const Pe = (e) => {
  ie = e;
}, Ue = async (e) => {
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
}, Ke = async () => await crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  !0,
  ["encrypt", "decrypt"]
), De = async (e) => {
  const t = await crypto.subtle.exportKey("raw", e);
  return new Uint8Array(t);
}, ce = (e) => {
  const t = new Uint8Array(e);
  let r = "";
  for (let o = 0; o < t.byteLength; o++)
    r += String.fromCharCode(t[o]);
  return btoa(r);
}, ye = (e) => {
  const t = atob(e), r = new Uint8Array(t.length);
  for (let o = 0; o < t.length; o++)
    r[o] = t.charCodeAt(o);
  return r;
}, Me = async (e, t) => {
  const r = await Ue(t), o = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    r,
    e.buffer
  );
  return ce(o);
}, Fe = async (e, t) => {
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
    ciphertext: ce(a),
    nonce: ce(r)
  };
}, qe = async (e, t, r) => {
  const o = ye(e), s = ye(t), u = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: s.buffer
    },
    r,
    o.buffer
  ), c = new TextDecoder().decode(u);
  return JSON.parse(c);
}, je = async (e) => {
  if (!ie)
    return null;
  try {
    const t = await Ke();
    J = t;
    const r = await De(t), o = await Me(r, ie), { ciphertext: s, nonce: u } = await Fe(e, t);
    return {
      encryptedData: s,
      encryptedKey: o,
      nonce: u
    };
  } catch (t) {
    return console.error("加密请求数据失败:", t), J = null, null;
  }
}, Ne = async (e, t) => {
  if (!J)
    return null;
  try {
    const r = await qe(e, t, J);
    return J = null, r;
  } catch (r) {
    return console.error("解密响应数据失败:", r), J = null, null;
  }
}, ze = (e) => typeof e == "string" && e.length > 0 && /^[A-Za-z0-9+/=]+$/.test(e), Xe = (e, t) => !1, ke = {
  header: { "Content-Type": "application/json" }
};
let Ae, Ee;
const mt = (e) => {
  const { before: t, after: r, ...o } = e;
  t && (Ae = t), r && (Ee = r), Object.assign(ke, o);
}, Ge = () => ke, Ve = () => Ae, Y = () => Ee, $ = (e) => {
  if (e === null || typeof e != "object" || typeof e == "function")
    return e;
  if (Array.isArray(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r[o] = $(e[o]);
    return r;
  }
  const t = {};
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = $(e[r]));
  return t;
}, We = (e, t) => e << t | e >>> 32 - t, Je = (e) => {
  const t = [];
  for (let w = 0; w < e.length; w++)
    t.push(e.charCodeAt(w));
  const r = t.length * 8;
  for (t.push(128); t.length * 8 % 512 !== 448; )
    t.push(0);
  t.push(r >>> 24 & 255), t.push(r >>> 16 & 255), t.push(r >>> 8 & 255), t.push(r & 255);
  let o = 1732584193, s = 4023233417, u = 2562383102, a = 271733878;
  const c = (w, S, T) => w & S | ~w & T, g = (w, S, T) => w & T | S & ~T, p = (w, S, T) => w ^ S ^ T, k = (w, S, T) => S ^ (w | ~T), R = [
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
  ], M = [
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
    for (let d = 0; d < 16; d++)
      w[d] = t[D + d] || 0;
    let S = o, T = s, O = u, L = a;
    for (let d = 0; d < 64; d++) {
      let l, b, A;
      d < 16 ? (l = c(T, O, L), b = d) : d < 32 ? (l = g(T, O, L), b = (5 * d + 1) % 16) : d < 48 ? (l = p(T, O, L), b = (3 * d + 5) % 16) : (l = k(T, O, L), b = 7 * d % 16), A = L, L = O, O = T, T = T + We(S + l + R[d] + w[b] | 0, M[d]), S = A;
    }
    o = o + S | 0, s = s + T | 0, u = u + O | 0, a = a + L | 0, D += 16;
  }
  return [o, s, u, a].map((w) => {
    const S = w & 255, T = w >>> 8 & 255, O = w >>> 16 & 255;
    return [w >>> 24 & 255, O, T, S];
  }).flat().map((w) => w.toString(16).padStart(2, "0")).join("");
}, Qe = (e) => Je(e), te = (e, t, r, o) => {
  if (!t) return e;
  let s = $(t);
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
      for (let k = 0; k < c.length; k++)
        if (k === c.length - 1)
          p[c[k]] = g[c[k]];
        else {
          if (g[c[k]] === null || g[c[k]] === void 0)
            break;
          if (p[c[k]] === void 0)
            if (typeof g[c[k]] != "object" || Array.isArray(g[c[k]])) {
              p[c[k]] = g[c[k]];
              break;
            } else p[c[k]] = {};
          p = p[c[k]], g = g[c[k]];
        }
    } else s[a] = t[a];
  })));
  const u = JSON.stringify(s);
  return `${e}-` + Qe(u);
}, oe = /* @__PURE__ */ new Map(), ue = {
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
    const g = te(e, t, o, r), p = c !== -1 ? Date.now() + c : void 0, k = `frontCache::${g}`, R = {
      data: a,
      expireAt: p,
      lastModified: s ?? Date.now()
    };
    switch (u) {
      case "memory":
        oe.set(k, R);
        break;
      case "uni":
        uni.setStorageSync(k, JSON.stringify(R));
        break;
      case "session":
        sessionStorage.setItem(k, JSON.stringify(R));
        break;
      case "local":
        localStorage.setItem(k, JSON.stringify(R));
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
    const a = `frontCache::${te(e, t, o, r)}`;
    let c = null, g;
    switch (s) {
      case "memory":
        c = oe.get(a);
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
    return c && (!c.expireAt || c.expireAt > Date.now()) ? c.data : (ue.remove({ key: e, params: t, storage: s }), null);
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
    const a = `frontCache::${te(e, t, o, r)}`;
    switch (s) {
      case "memory":
        oe.delete(a);
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
}, Ye = {
  SITEHOST_API: ""
}, wt = {}, St = {};
class Ze {
  constructor() {
    se(this, "currentToast", []);
    se(this, "defaultOptions", {
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
            ee.success(r, {
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
            ee.error(r, {
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
            ee.loading(r, {
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
            ee.info(r, {
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
const q = new Ze(), N = (e) => {
  let { api: t, url: r, authorize: o } = e;
  if (r.startsWith("http://") || r.startsWith("https://") || !t)
    return r;
  const s = Ye[t];
  if (!s)
    return q.error("API domain not found: " + t), !1;
  if (typeof s == "string")
    return s + r;
  if (typeof s == "object") {
    const { host: u, authorize: a } = s;
    return (o === void 0 || o === !1) && (e.authorize = a), r = u + r, r;
  }
  return r;
};
var pe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, W = {}, F = {}, x = {}, m = {}, ge;
function Ie() {
  if (ge) return m;
  ge = 1, Object.defineProperty(m, "__esModule", { value: !0 }), m.toBig = m.shrSL = m.shrSH = m.rotrSL = m.rotrSH = m.rotrBL = m.rotrBH = m.rotr32L = m.rotr32H = m.rotlSL = m.rotlSH = m.rotlBL = m.rotlBH = m.add5L = m.add5H = m.add4L = m.add4H = m.add3L = m.add3H = void 0, m.add = T, m.fromBig = r, m.split = o;
  const e = /* @__PURE__ */ BigInt(2 ** 32 - 1), t = /* @__PURE__ */ BigInt(32);
  function r(f, i = !1) {
    return i ? { h: Number(f & e), l: Number(f >> t & e) } : { h: Number(f >> t & e) | 0, l: Number(f & e) | 0 };
  }
  function o(f, i = !1) {
    const h = f.length;
    let C = new Uint32Array(h), v = new Uint32Array(h);
    for (let P = 0; P < h; P++) {
      const { h: G, l: V } = r(f[P], i);
      [C[P], v[P]] = [G, V];
    }
    return [C, v];
  }
  const s = (f, i) => BigInt(f >>> 0) << t | BigInt(i >>> 0);
  m.toBig = s;
  const u = (f, i, h) => f >>> h;
  m.shrSH = u;
  const a = (f, i, h) => f << 32 - h | i >>> h;
  m.shrSL = a;
  const c = (f, i, h) => f >>> h | i << 32 - h;
  m.rotrSH = c;
  const g = (f, i, h) => f << 32 - h | i >>> h;
  m.rotrSL = g;
  const p = (f, i, h) => f << 64 - h | i >>> h - 32;
  m.rotrBH = p;
  const k = (f, i, h) => f >>> h - 32 | i << 64 - h;
  m.rotrBL = k;
  const R = (f, i) => i;
  m.rotr32H = R;
  const M = (f, i) => f;
  m.rotr32L = M;
  const D = (f, i, h) => f << h | i >>> 32 - h;
  m.rotlSH = D;
  const E = (f, i, h) => i << h | f >>> 32 - h;
  m.rotlSL = E;
  const w = (f, i, h) => i << h - 32 | f >>> 64 - h;
  m.rotlBH = w;
  const S = (f, i, h) => f << h - 32 | i >>> 64 - h;
  m.rotlBL = S;
  function T(f, i, h, C) {
    const v = (i >>> 0) + (C >>> 0);
    return { h: f + h + (v / 2 ** 32 | 0) | 0, l: v | 0 };
  }
  const O = (f, i, h) => (f >>> 0) + (i >>> 0) + (h >>> 0);
  m.add3L = O;
  const L = (f, i, h, C) => i + h + C + (f / 2 ** 32 | 0) | 0;
  m.add3H = L;
  const d = (f, i, h, C) => (f >>> 0) + (i >>> 0) + (h >>> 0) + (C >>> 0);
  m.add4L = d;
  const l = (f, i, h, C, v) => i + h + C + v + (f / 2 ** 32 | 0) | 0;
  m.add4H = l;
  const b = (f, i, h, C, v) => (f >>> 0) + (i >>> 0) + (h >>> 0) + (C >>> 0) + (v >>> 0);
  m.add5L = b;
  const A = (f, i, h, C, v, P) => i + h + C + v + P + (f / 2 ** 32 | 0) | 0;
  m.add5H = A;
  const B = {
    fromBig: r,
    split: o,
    toBig: s,
    shrSH: u,
    shrSL: a,
    rotrSH: c,
    rotrSL: g,
    rotrBH: p,
    rotrBL: k,
    rotr32H: R,
    rotr32L: M,
    rotlSH: D,
    rotlSL: E,
    rotlBH: w,
    rotlBL: S,
    add: T,
    add3L: O,
    add3H: L,
    add4L: d,
    add4H: l,
    add5H: A,
    add5L: b
  };
  return m.default = B, m;
}
var ae = {}, Z = {}, be;
function $e() {
  return be || (be = 1, Object.defineProperty(Z, "__esModule", { value: !0 }), Z.crypto = void 0, Z.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), Z;
}
var me;
function et() {
  return me || (me = 1, (function(e) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(e, "__esModule", { value: !0 }), e.wrapXOFConstructorWithOpts = e.wrapConstructorWithOpts = e.wrapConstructor = e.Hash = e.nextTick = e.swap32IfBE = e.byteSwapIfBE = e.swap8IfBE = e.isLE = void 0, e.isBytes = r, e.anumber = o, e.abytes = s, e.ahash = u, e.aexists = a, e.aoutput = c, e.u8 = g, e.u32 = p, e.clean = k, e.createView = R, e.rotr = M, e.rotl = D, e.byteSwap = E, e.byteSwap32 = w, e.bytesToHex = O, e.hexToBytes = l, e.asyncLoop = A, e.utf8ToBytes = B, e.bytesToUtf8 = f, e.toBytes = i, e.kdfInputToBytes = h, e.concatBytes = C, e.checkOpts = v, e.createHasher = G, e.createOptHasher = V, e.createXOFer = X, e.randomBytes = He;
    const t = /* @__PURE__ */ $e();
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
    function k(...n) {
      for (let y = 0; y < n.length; y++)
        n[y].fill(0);
    }
    function R(n) {
      return new DataView(n.buffer, n.byteOffset, n.byteLength);
    }
    function M(n, y) {
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
    const S = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", T = /* @__PURE__ */ Array.from({ length: 256 }, (n, y) => y.toString(16).padStart(2, "0"));
    function O(n) {
      if (s(n), S)
        return n.toHex();
      let y = "";
      for (let H = 0; H < n.length; H++)
        y += T[n[H]];
      return y;
    }
    const L = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function d(n) {
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
      if (S)
        return Uint8Array.fromHex(n);
      const y = n.length, H = y / 2;
      if (y % 2)
        throw new Error("hex string expected, got unpadded hex of length " + y);
      const _ = new Uint8Array(H);
      for (let U = 0, K = 0; U < H; U++, K += 2) {
        const he = d(n.charCodeAt(K)), de = d(n.charCodeAt(K + 1));
        if (he === void 0 || de === void 0) {
          const _e = n[K] + n[K + 1];
          throw new Error('hex string expected, got non-hex character "' + _e + '" at index ' + K);
        }
        _[U] = he * 16 + de;
      }
      return _;
    }
    const b = async () => {
    };
    e.nextTick = b;
    async function A(n, y, H) {
      let _ = Date.now();
      for (let U = 0; U < n; U++) {
        H(U);
        const K = Date.now() - _;
        K >= 0 && K < y || (await (0, e.nextTick)(), _ += K);
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
    function h(n) {
      return typeof n == "string" && (n = B(n)), s(n), n;
    }
    function C(...n) {
      let y = 0;
      for (let _ = 0; _ < n.length; _++) {
        const U = n[_];
        s(U), y += U.length;
      }
      const H = new Uint8Array(y);
      for (let _ = 0, U = 0; _ < n.length; _++) {
        const K = n[_];
        H.set(K, U), U += K.length;
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
    function G(n) {
      const y = (_) => n().update(i(_)).digest(), H = n();
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = () => n(), y;
    }
    function V(n) {
      const y = (_, U) => n(U).update(i(_)).digest(), H = n({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (_) => n(_), y;
    }
    function X(n) {
      const y = (_, U) => n(U).update(i(_)).digest(), H = n({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (_) => n(_), y;
    }
    e.wrapConstructor = G, e.wrapConstructorWithOpts = V, e.wrapXOFConstructorWithOpts = X;
    function He(n = 32) {
      if (t.crypto && typeof t.crypto.getRandomValues == "function")
        return t.crypto.getRandomValues(new Uint8Array(n));
      if (t.crypto && typeof t.crypto.randomBytes == "function")
        return Uint8Array.from(t.crypto.randomBytes(n));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(ae)), ae;
}
var we;
function tt() {
  if (we) return x;
  we = 1, Object.defineProperty(x, "__esModule", { value: !0 }), x.shake256 = x.shake128 = x.keccak_512 = x.keccak_384 = x.keccak_256 = x.keccak_224 = x.sha3_512 = x.sha3_384 = x.sha3_256 = x.sha3_224 = x.Keccak = void 0, x.keccakP = S;
  const e = /* @__PURE__ */ Ie(), t = /* @__PURE__ */ et(), r = BigInt(0), o = BigInt(1), s = BigInt(2), u = BigInt(7), a = BigInt(256), c = BigInt(113), g = [], p = [], k = [];
  for (let d = 0, l = o, b = 1, A = 0; d < 24; d++) {
    [b, A] = [A, (2 * b + 3 * A) % 5], g.push(2 * (5 * A + b)), p.push((d + 1) * (d + 2) / 2 % 64);
    let B = r;
    for (let f = 0; f < 7; f++)
      l = (l << o ^ (l >> u) * c) % a, l & s && (B ^= o << (o << /* @__PURE__ */ BigInt(f)) - o);
    k.push(B);
  }
  const R = (0, e.split)(k, !0), M = R[0], D = R[1], E = (d, l, b) => b > 32 ? (0, e.rotlBH)(d, l, b) : (0, e.rotlSH)(d, l, b), w = (d, l, b) => b > 32 ? (0, e.rotlBL)(d, l, b) : (0, e.rotlSL)(d, l, b);
  function S(d, l = 24) {
    const b = new Uint32Array(10);
    for (let A = 24 - l; A < 24; A++) {
      for (let i = 0; i < 10; i++)
        b[i] = d[i] ^ d[i + 10] ^ d[i + 20] ^ d[i + 30] ^ d[i + 40];
      for (let i = 0; i < 10; i += 2) {
        const h = (i + 8) % 10, C = (i + 2) % 10, v = b[C], P = b[C + 1], G = E(v, P, 1) ^ b[h], V = w(v, P, 1) ^ b[h + 1];
        for (let X = 0; X < 50; X += 10)
          d[i + X] ^= G, d[i + X + 1] ^= V;
      }
      let B = d[2], f = d[3];
      for (let i = 0; i < 24; i++) {
        const h = p[i], C = E(B, f, h), v = w(B, f, h), P = g[i];
        B = d[P], f = d[P + 1], d[P] = C, d[P + 1] = v;
      }
      for (let i = 0; i < 50; i += 10) {
        for (let h = 0; h < 10; h++)
          b[h] = d[i + h];
        for (let h = 0; h < 10; h++)
          d[i + h] ^= ~b[(h + 2) % 10] & b[(h + 4) % 10];
      }
      d[0] ^= M[A], d[1] ^= D[A];
    }
    (0, t.clean)(b);
  }
  class T extends t.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(l, b, A, B = !1, f = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = l, this.suffix = b, this.outputLen = A, this.enableXOF = B, this.rounds = f, (0, t.anumber)(A), !(0 < l && l < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200), this.state32 = (0, t.u32)(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      (0, t.swap32IfBE)(this.state32), S(this.state32, this.rounds), (0, t.swap32IfBE)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(l) {
      (0, t.aexists)(this), l = (0, t.toBytes)(l), (0, t.abytes)(l);
      const { blockLen: b, state: A } = this, B = l.length;
      for (let f = 0; f < B; ) {
        const i = Math.min(b - this.pos, B - f);
        for (let h = 0; h < i; h++)
          A[this.pos++] ^= l[f++];
        this.pos === b && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: l, suffix: b, pos: A, blockLen: B } = this;
      l[A] ^= b, (b & 128) !== 0 && A === B - 1 && this.keccak(), l[B - 1] ^= 128, this.keccak();
    }
    writeInto(l) {
      (0, t.aexists)(this, !1), (0, t.abytes)(l), this.finish();
      const b = this.state, { blockLen: A } = this;
      for (let B = 0, f = l.length; B < f; ) {
        this.posOut >= A && this.keccak();
        const i = Math.min(A - this.posOut, f - B);
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
      const { blockLen: b, suffix: A, outputLen: B, rounds: f, enableXOF: i } = this;
      return l || (l = new T(b, A, B, i, f)), l.state32.set(this.state32), l.pos = this.pos, l.posOut = this.posOut, l.finished = this.finished, l.rounds = f, l.suffix = A, l.outputLen = B, l.enableXOF = i, l.destroyed = this.destroyed, l;
    }
  }
  x.Keccak = T;
  const O = (d, l, b) => (0, t.createHasher)(() => new T(l, d, b));
  x.sha3_224 = O(6, 144, 224 / 8), x.sha3_256 = O(6, 136, 256 / 8), x.sha3_384 = O(6, 104, 384 / 8), x.sha3_512 = O(6, 72, 512 / 8), x.keccak_224 = O(1, 144, 224 / 8), x.keccak_256 = O(1, 136, 256 / 8), x.keccak_384 = O(1, 104, 384 / 8), x.keccak_512 = O(1, 72, 512 / 8);
  const L = (d, l, b) => (0, t.createXOFer)((A = {}) => new T(l, d, A.dkLen === void 0 ? b : A.dkLen, !0));
  return x.shake128 = L(31, 168, 128 / 8), x.shake256 = L(31, 136, 256 / 8), x;
}
var Se;
function rt() {
  if (Se) return F;
  Se = 1;
  const { sha3_512: e } = /* @__PURE__ */ tt(), t = 24, r = 32, o = (E = 4, w = Math.random) => {
    let S = "";
    for (; S.length < E; )
      S = S + Math.floor(w() * 36).toString(36);
    return S;
  };
  function s(E) {
    let w = 8n, S = 0n;
    for (const T of E.values()) {
      const O = BigInt(T);
      S = (S << w) + O;
    }
    return S;
  }
  const u = (E = "") => s(e(E)).toString(36).slice(1), a = Array.from(
    { length: 26 },
    (E, w) => String.fromCharCode(w + 97)
  ), c = (E) => a[Math.floor(E() * a.length)], g = ({
    globalObj: E = typeof pe < "u" ? pe : typeof window < "u" ? window : {},
    random: w = Math.random
  } = {}) => {
    const S = Object.keys(E).toString(), T = S.length ? S + o(r, w) : o(r, w);
    return u(T).substring(0, r);
  }, p = (E) => () => E++, k = 476782367, R = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: E = Math.random,
    counter: w = p(Math.floor(E() * k)),
    length: S = t,
    fingerprint: T = g({ random: E })
  } = {}) => function() {
    const L = c(E), d = Date.now().toString(36), l = w().toString(36), b = o(S, E), A = `${d + b + l + T}`;
    return `${L + u(A).substring(1, S)}`;
  }, M = R(), D = (E, { minLength: w = 2, maxLength: S = r } = {}) => {
    const T = E.length, O = /^[0-9a-z]+$/;
    try {
      if (typeof E == "string" && T >= w && T <= S && O.test(E))
        return !0;
    } finally {
    }
    return !1;
  };
  return F.getConstants = () => ({ defaultLength: t, bigLength: r }), F.init = R, F.createId = M, F.bufToBigInt = s, F.createCounter = p, F.createFingerprint = g, F.isCuid = D, F;
}
var Te;
function nt() {
  if (Te) return W;
  Te = 1;
  const { createId: e, init: t, getConstants: r, isCuid: o } = rt();
  return W.createId = e, W.init = t, W.getConstants = r, W.isCuid = o, W;
}
var st = nt();
const ot = async (e, t) => {
  var o;
  if (!Xe(e.url || "", t.api) || ((o = e.method) == null ? void 0 : o.toUpperCase()) === "GET" || !e.data)
    return !1;
  try {
    const s = await je(e.data);
    if (s)
      return e.data = s.encryptedData, e.header || (e.header = {}), e.header["X-Encrypted-Key"] = s.encryptedKey, e.header["X-Nonce"] = s.nonce, !0;
  } catch (s) {
    console.error("请求加密失败:", s);
  }
  return !1;
}, at = async (e) => {
  var r, o;
  const t = ((r = e.header) == null ? void 0 : r["x-response-nonce"]) || ((o = e.header) == null ? void 0 : o["X-Response-Nonce"]);
  if (t && e.data)
    try {
      if (ze(e.data)) {
        const s = await Ne(e.data, t);
        if (s !== null)
          return s;
      }
    } catch (s) {
      console.error("响应解密失败:", s);
    }
  return e.data;
}, it = (e) => {
  if (!e) return;
  const t = e["x-public-key"] || e["X-Public-Key"];
  t && Pe(t);
}, Oe = /\$\{([\w\.\[\]0-9]+)\}/g, ct = (e, t) => e.replace(Oe, (r, o) => {
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
}), Be = (e, t) => {
  const r = Array.isArray(t), o = r ? t : [t];
  return o.forEach((s) => {
    if (s && typeof s == "object") {
      for (const u in e) {
        const a = e[u];
        if (typeof a == "string" && Oe.test(a)) {
          const c = ct(
            a,
            s
          );
          s[u] = c;
        } else s[a] !== void 0 && (s[u] = s[a]);
      }
      s.children && Array.isArray(s.children) && (s.children = Be(e, s.children));
    }
  }), r ? t : o[0];
};
let Le = "";
const ut = () => Le, Tt = (e) => {
  Le = e;
}, lt = (e) => e ? Array.isArray(e) ? e.length === 0 : typeof e == "object" ? Object.keys(e).length === 0 : !1 : !0, ft = st.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), I = {}, ht = 2e3, Q = (e, ...t) => {
  if (!t.length) return e;
  const r = t.shift();
  if (r === void 0) return e;
  for (const o in r)
    r.hasOwnProperty(o) && (typeof r[o] == "object" && r[o] !== null && !Array.isArray(r[o]) ? (e[o] || (e[o] = {}), Q(e[o], r[o])) : e[o] = r[o]);
  return Q(e, ...t);
}, dt = (e, t, r) => {
  const o = Q({}, r, e);
  Object.assign(e, o);
  const s = r.header || {}, u = e.header || {};
  if (typeof t.header == "object")
    e.header = Q({}, s, u, t.header);
  else if (typeof t.header == "function") {
    const c = Q({}, s, u);
    e.header = t.header(c);
  } else
    e.header = Q({}, s, u);
  if (e.header || (e.header = {}), e.header.reqId = ft(), t.authorize) {
    const c = ut();
    if (!c) {
      const g = `Error, interface ${t.url} requires authorization to access!`;
      return console.error(g), q.error({ title: g }), !1;
    }
    if (typeof t.authorize == "boolean")
      e.header.authorization = "Bearer " + c;
    else if (typeof t.authorize == "function" && t.authorize(e, t, c) === !1)
      return !1;
  }
  const a = Ve();
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
}, yt = async (e, t) => {
  await ot(e, t);
}, le = async (e, t, r, o) => {
  if (it(r.header), r.data = await at(r), r.statusCode >= 200 && r.statusCode < 400) {
    if (t.raw) {
      const u = r.data, a = Y();
      a && a(e, u, r), t.after && t.after.call(t, e, u, r), o.Result = u;
      return;
    }
    const s = r.data;
    if (s.status === j.SUCCESS) {
      const u = s.data;
      e.method === "POST" && t.fieldMap && u && Be(t.fieldMap, u);
      const a = Y();
      a && a(e, s, r), t.after && t.after.call(t, s, e, r), o.Result = s;
    } else {
      console.error(s), o.Error = {
        status: s.status,
        errno: s.errno,
        msg: s.msg || "Request Error"
      }, o.Result = s;
      const u = Y();
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
        status: j.ERROR,
        errno: u + 1e3,
        msg: s
      };
      o.Error = g;
      const p = Y();
      p && p(e, g, r), t.after && t.after.call(t, e, g, r);
      return;
    }
    const a = {
      status: j.ERROR,
      errno: u + 1e3,
      msg: s
    };
    o.Error = a;
    const c = Y();
    c && c(e, a, r), t.after && t.after.call(t, a, e, r);
  }
}, fe = (e, t) => {
  console.error(e);
  const r = {
    status: j.ERROR,
    errno: 1e3,
    msg: "Network Error: " + e.toString()
  };
  t.Error = r;
}, xe = (e, t, r) => {
  const o = e.loadingText ? 500 : 0;
  setTimeout(() => {
    var s, u;
    q.hide(), t.Error && (console.error($(e), t.Error), e.hideErrorToast || q.error({ title: t.Error.msg }), e.raw ? t.Result = t.Error : t.Result = {
      status: j.ERROR,
      errno: t.Error.errno,
      msg: t.Error.msg,
      timestamp: (s = t.Result) == null ? void 0 : s.timestamp,
      data: (u = t.Result) == null ? void 0 : u.data
    }), r(t.Result);
  }, o);
}, z = async (e, t, r) => {
  const o = $(Ge());
  if (dt(e, t, o) === !1) return Promise.resolve(null);
  if (await yt(e, t), e.loadingText && q.loading({
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
      const p = ue.get(u);
      p && setTimeout(() => (q.hide(), Promise.resolve({
        status: j.SUCCESS,
        data: p
      })), 500);
    }
    const a = te(
      e.url,
      e.data,
      t.fieldMap,
      ["Query", "Option.SelectFields"]
    ), c = I[a];
    if (c)
      if (c.expire && c.expire < Date.now())
        delete I[a];
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
      (p == null ? void 0 : p.status) === j.SUCCESS && !lt(p == null ? void 0 : p.data) && t.cacheTime && ue.set(u, p.data, t.cacheTime);
      let k = I[a];
      return k.result = p, k.expire = Date.now() + ht, I[a] = k, p;
    }).finally(() => {
      t.loading = !1;
    });
    return I[a] = {
      sharedPromise: g
    }, g;
  } else
    return r(e, t);
}, re = (e, t) => {
  const r = {
    Result: null
  };
  return new Promise((o) => {
    uni.request({
      ...e,
      success: async (s) => {
        await le(e, t, s, r);
      },
      fail: (s) => {
        fe(s, r);
      },
      complete: () => {
        xe(t, r, o);
      }
    });
  });
}, kt = (e) => {
  const t = N(e);
  return t === !1 ? Promise.resolve(null) : z(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    re
  );
}, At = (e, t) => {
  const r = N(e);
  return r === !1 ? Promise.resolve(null) : z(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: "Saving Data..."
    },
    e,
    re
  );
}, Et = (e, t) => {
  const r = N(e);
  return r === !1 ? Promise.resolve(null) : z(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "Deleting Data..."
    },
    e,
    re
  );
}, Ot = (e, t) => {
  const r = N(e);
  return r === !1 ? Promise.resolve(null) : z(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    re
  );
}, ne = (e, t) => {
  const r = {
    Result: null
  }, { header: o, ...s } = e;
  return new Promise((u) => {
    Re.request({
      ...s,
      headers: o
    }).then(async (a) => {
      await le(
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
      a.response && a.response.status && a.response.status > 200 && a.response.status < 600 ? await le(
        e,
        t,
        {
          statusCode: a.response.status,
          data: (c = a.response) == null ? void 0 : c.data,
          header: a.response.headers
        },
        r
      ) : fe(a, r);
    }).finally(() => {
      xe(t, r, u);
    });
  });
}, Bt = (e) => {
  const t = N(e);
  return t === !1 ? Promise.resolve(null) : z(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    ne
  );
}, Lt = (e, t) => {
  const r = N(e);
  return r === !1 ? Promise.resolve(null) : z(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: "Saving Data..."
    },
    e,
    ne
  );
}, xt = (e, t) => {
  const r = N(e);
  return r === !1 ? Promise.resolve(null) : z(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "Deleting Data..."
    },
    e,
    ne
  );
}, Ht = (e, t) => {
  const r = N(e);
  return r === !1 ? Promise.resolve(null) : z(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    ne
  );
}, _t = (e) => typeof e == "object" && e !== null && !Array.isArray(e) || Array.isArray(e);
export {
  Ye as API_HOST,
  ue as FrontCache,
  St as ICON_HOST,
  j as ResStatus,
  wt as SERVER_HOST,
  $ as deepClone,
  Be as fieldMapping,
  Y as getGlobalAfter,
  Ve as getGlobalBefore,
  Ge as getGlobalConfig,
  ut as getToken,
  mt as globalRequestOption,
  N as hostUrl,
  xt as httpDelete,
  Bt as httpGet,
  Ht as httpPost,
  Lt as httpPut,
  _t as isJSON,
  ct as parseFieldTemplate,
  Tt as setToken,
  q as toast,
  Et as uniDelete,
  kt as uniGet,
  Ot as uniPost,
  At as uniPut
};
