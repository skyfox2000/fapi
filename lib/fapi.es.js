var pt = Object.defineProperty;
var bt = (t, e, r) => e in t ? pt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var nt = (t, e, r) => bt(t, typeof e != "symbol" ? e + "" : e, r);
import D from "vue-m-message";
import mt from "axios";
var V = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(V || {});
const wt = {
  SITEHOST_API: ""
}, Dt = {}, Nt = {};
let ht = "";
const kt = () => ht, Vt = (t) => {
  ht = t;
}, $ = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const r = [];
    for (let c = 0; c < t.length; c++)
      r[c] = $(t[c]);
    return r;
  }
  const e = {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = $(t[r]));
  return e;
}, ft = /\$\{([\w\.\[\]0-9]+)\}/g, St = (t, e) => t.replace(ft, (r, c) => {
  var l;
  const s = c.split(".");
  let a = e;
  for (const o of s) {
    if (o.includes("[") && o.includes("]")) {
      const y = o.split("[")[0], S = parseInt(o.split("[")[1].split("]")[0]);
      a = (l = a[y]) == null ? void 0 : l[S];
    } else
      a = a == null ? void 0 : a[o];
    if (a === void 0)
      return r;
  }
  return String(a);
}), Tt = (t, e) => {
  const r = Array.isArray(e), c = r ? e : [e];
  return c.forEach((s) => {
    if (s && typeof s == "object")
      for (const a in t) {
        const l = t[a];
        if (typeof l == "string" && ft.test(l)) {
          const o = St(
            l,
            s
          );
          s[a] = o;
        } else
          s[a] = s[l];
      }
  }), r ? e : c[0];
}, $t = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
class Lt {
  constructor() {
    nt(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "none",
      mask: !1,
      position: "center"
    });
  }
  showToast(e, r, c, s) {
    const a = typeof r == "string" ? r : r.title || c;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: s || this.defaultOptions.duration,
      title: a
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
    e = e || 0, e === 0 ? this.close() : setTimeout(this.close, e);
  }
  close() {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : D.closeAll();
  }
  show(e) {
    const { title: r, icon: c, mask: s, duration: a, position: l } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: r,
        icon: c === "warning" ? "error" : c,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: a,
        position: l,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else {
      let o = "info";
      switch (this.hide(), c) {
        case "success":
          D.success(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: s,
            type: o,
            icon: o,
            closeOnClick: !0,
            pauseOnFocusLoss: !0,
            pauseOnHover: !0
          });
          break;
        case "error":
          D.error(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: s,
            type: o,
            icon: o
          });
          break;
        case "loading":
          D.loading(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: s,
            type: o,
            icon: o,
            duration: -1
            // 不自动关闭
          });
          break;
        default:
          D.info(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: s,
            type: o,
            icon: o
          });
          break;
      }
    }
  }
}
const z = new Lt(), M = (t) => {
  let { api: e, url: r, authorize: c } = t;
  if (r.startsWith("http://") || r.startsWith("https://") || !e)
    return r;
  const s = wt[e];
  if (!s)
    return z.error("未查询到接口域名：" + e), !1;
  if (typeof s == "string")
    return s + r;
  if (typeof s == "object") {
    const { host: a, authorize: l } = s;
    return (c === void 0 || c === !1) && (t.authorize = l), r = a + r, r;
  }
  return r;
}, Ot = (t, e) => t << e | t >>> 32 - e, _t = (t) => {
  const e = [];
  for (let b = 0; b < t.length; b++)
    e.push(t.charCodeAt(b));
  const r = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(r >>> 24 & 255), e.push(r >>> 16 & 255), e.push(r >>> 8 & 255), e.push(r & 255);
  let c = 1732584193, s = 4023233417, a = 2562383102, l = 271733878;
  const o = (b, k, w) => b & k | ~b & w, y = (b, k, w) => b & w | k & ~w, S = (b, k, w) => b ^ k ^ w, v = (b, k, w) => k ^ (b | ~w), P = [
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
  ], U = [
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
    let k = c, w = s, _ = a, E = l;
    for (let d = 0; d < 64; d++) {
      let h, g, T;
      d < 16 ? (h = o(w, _, E), g = d) : d < 32 ? (h = y(w, _, E), g = (5 * d + 1) % 16) : d < 48 ? (h = S(w, _, E), g = (3 * d + 5) % 16) : (h = v(w, _, E), g = 7 * d % 16), T = E, E = _, _ = w, w = w + Ot(k + h + P[d] + b[g] | 0, U[d]), k = T;
    }
    c = c + k | 0, s = s + w | 0, a = a + _ | 0, l = l + E | 0, C += 16;
  }
  return [c, s, a, l].map((b) => {
    const k = b & 255, w = b >>> 8 & 255, _ = b >>> 16 & 255;
    return [b >>> 24 & 255, _, w, k];
  }).flat().map((b) => b.toString(16).padStart(2, "0")).join("");
}, At = (t) => _t(t), J = (t, e, r) => {
  if (!e) return t;
  let c = $(e);
  r && r.length > 0 && (r[0].startsWith("-") ? r.forEach((a) => {
    if (a.indexOf(".") > -1) {
      const l = a.split(".");
      let o = c;
      for (let y = 0; y < l.length && (y === l.length - 1 && delete o[l[y]], typeof o[l[y]] == "object" && !Array.isArray(o[l[y]])); y++)
        o = o[l[y]];
    } else delete c[a];
  }) : (c = {}, r.forEach((a) => {
    if (a.indexOf(".") > -1) {
      const l = a.split(".");
      let o = e, y = c;
      for (let S = 0; S < l.length; S++)
        if (S === l.length - 1)
          y[l[S]] = o[l[S]];
        else {
          if (o[l[S]] === null || o[l[S]] === void 0)
            break;
          if (y[l[S]] === void 0)
            if (typeof o[l[S]] != "object" || Array.isArray(o[l[S]])) {
              y[l[S]] = o[l[S]];
              break;
            } else y[l[S]] = {};
          y = y[l[S]], o = o[l[S]];
        }
    } else c[a] = e[a];
  })));
  const s = JSON.stringify(c);
  return `${t}-` + At(s);
};
var rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, K = {}, j = {}, B = {}, R = {}, st;
function dt() {
  if (st) return R;
  st = 1, Object.defineProperty(R, "__esModule", { value: !0 }), R.anumber = t, R.number = t, R.abytes = r, R.bytes = r, R.ahash = c, R.aexists = s, R.aoutput = a;
  function t(o) {
    if (!Number.isSafeInteger(o) || o < 0)
      throw new Error("positive integer expected, got " + o);
  }
  function e(o) {
    return o instanceof Uint8Array || ArrayBuffer.isView(o) && o.constructor.name === "Uint8Array";
  }
  function r(o, ...y) {
    if (!e(o))
      throw new Error("Uint8Array expected");
    if (y.length > 0 && !y.includes(o.length))
      throw new Error("Uint8Array expected of length " + y + ", got length=" + o.length);
  }
  function c(o) {
    if (typeof o != "function" || typeof o.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    t(o.outputLen), t(o.blockLen);
  }
  function s(o, y = !0) {
    if (o.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (y && o.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function a(o, y) {
    r(o);
    const S = y.outputLen;
    if (o.length < S)
      throw new Error("digestInto() expects output buffer of length at least " + S);
  }
  const l = {
    number: t,
    bytes: r,
    hash: c,
    exists: s,
    output: a
  };
  return R.default = l, R;
}
var p = {}, ot;
function Bt() {
  if (ot) return p;
  ot = 1, Object.defineProperty(p, "__esModule", { value: !0 }), p.add5L = p.add5H = p.add4H = p.add4L = p.add3H = p.add3L = p.rotlBL = p.rotlBH = p.rotlSL = p.rotlSH = p.rotr32L = p.rotr32H = p.rotrBL = p.rotrBH = p.rotrSL = p.rotrSH = p.shrSL = p.shrSH = p.toBig = void 0, p.fromBig = r, p.split = c, p.add = w;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function r(u, i = !1) {
    return i ? { h: Number(u & t), l: Number(u >> e & t) } : { h: Number(u >> e & t) | 0, l: Number(u & t) | 0 };
  }
  function c(u, i = !1) {
    let n = new Uint32Array(u.length), f = new Uint32Array(u.length);
    for (let m = 0; m < u.length; m++) {
      const { h: L, l: H } = r(u[m], i);
      [n[m], f[m]] = [L, H];
    }
    return [n, f];
  }
  const s = (u, i) => BigInt(u >>> 0) << e | BigInt(i >>> 0);
  p.toBig = s;
  const a = (u, i, n) => u >>> n;
  p.shrSH = a;
  const l = (u, i, n) => u << 32 - n | i >>> n;
  p.shrSL = l;
  const o = (u, i, n) => u >>> n | i << 32 - n;
  p.rotrSH = o;
  const y = (u, i, n) => u << 32 - n | i >>> n;
  p.rotrSL = y;
  const S = (u, i, n) => u << 64 - n | i >>> n - 32;
  p.rotrBH = S;
  const v = (u, i, n) => u >>> n - 32 | i << 64 - n;
  p.rotrBL = v;
  const P = (u, i) => i;
  p.rotr32H = P;
  const U = (u, i) => u;
  p.rotr32L = U;
  const C = (u, i, n) => u << n | i >>> 32 - n;
  p.rotlSH = C;
  const O = (u, i, n) => i << n | u >>> 32 - n;
  p.rotlSL = O;
  const b = (u, i, n) => i << n - 32 | u >>> 64 - n;
  p.rotlBH = b;
  const k = (u, i, n) => u << n - 32 | i >>> 64 - n;
  p.rotlBL = k;
  function w(u, i, n, f) {
    const m = (i >>> 0) + (f >>> 0);
    return { h: u + n + (m / 2 ** 32 | 0) | 0, l: m | 0 };
  }
  const _ = (u, i, n) => (u >>> 0) + (i >>> 0) + (n >>> 0);
  p.add3L = _;
  const E = (u, i, n, f) => i + n + f + (u / 2 ** 32 | 0) | 0;
  p.add3H = E;
  const d = (u, i, n, f) => (u >>> 0) + (i >>> 0) + (n >>> 0) + (f >>> 0);
  p.add4L = d;
  const h = (u, i, n, f, m) => i + n + f + m + (u / 2 ** 32 | 0) | 0;
  p.add4H = h;
  const g = (u, i, n, f, m) => (u >>> 0) + (i >>> 0) + (n >>> 0) + (f >>> 0) + (m >>> 0);
  p.add5L = g;
  const T = (u, i, n, f, m, L) => i + n + f + m + L + (u / 2 ** 32 | 0) | 0;
  p.add5H = T;
  const A = {
    fromBig: r,
    split: c,
    toBig: s,
    shrSH: a,
    shrSL: l,
    rotrSH: o,
    rotrSL: y,
    rotrBH: S,
    rotrBL: v,
    rotr32H: P,
    rotr32L: U,
    rotlSH: C,
    rotlSL: O,
    rotlBH: b,
    rotlBL: k,
    add: w,
    add3L: _,
    add3H: E,
    add4L: d,
    add4H: h,
    add5H: T,
    add5L: g
  };
  return p.default = A, p;
}
var G = {}, N = {}, it;
function Et() {
  return it || (it = 1, Object.defineProperty(N, "__esModule", { value: !0 }), N.crypto = void 0, N.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), N;
}
var at;
function Ht() {
  return at || (at = 1, function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = c, t.byteSwap32 = v, t.bytesToHex = U, t.hexToBytes = b, t.asyncLoop = w, t.utf8ToBytes = _, t.toBytes = E, t.concatBytes = d, t.checkOpts = g, t.wrapConstructor = T, t.wrapConstructorWithOpts = A, t.wrapXOFConstructorWithOpts = u, t.randomBytes = i;
    const e = /* @__PURE__ */ Et(), r = /* @__PURE__ */ dt();
    function c(n) {
      return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
    }
    const s = (n) => new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
    t.u8 = s;
    const a = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4));
    t.u32 = a;
    const l = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength);
    t.createView = l;
    const o = (n, f) => n << 32 - f | n >>> f;
    t.rotr = o;
    const y = (n, f) => n << f | n >>> 32 - f >>> 0;
    t.rotl = y, t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const S = (n) => n << 24 & 4278190080 | n << 8 & 16711680 | n >>> 8 & 65280 | n >>> 24 & 255;
    t.byteSwap = S, t.byteSwapIfBE = t.isLE ? (n) => n : (n) => (0, t.byteSwap)(n);
    function v(n) {
      for (let f = 0; f < n.length; f++)
        n[f] = (0, t.byteSwap)(n[f]);
    }
    const P = /* @__PURE__ */ Array.from({ length: 256 }, (n, f) => f.toString(16).padStart(2, "0"));
    function U(n) {
      (0, r.abytes)(n);
      let f = "";
      for (let m = 0; m < n.length; m++)
        f += P[n[m]];
      return f;
    }
    const C = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function O(n) {
      if (n >= C._0 && n <= C._9)
        return n - C._0;
      if (n >= C.A && n <= C.F)
        return n - (C.A - 10);
      if (n >= C.a && n <= C.f)
        return n - (C.a - 10);
    }
    function b(n) {
      if (typeof n != "string")
        throw new Error("hex string expected, got " + typeof n);
      const f = n.length, m = f / 2;
      if (f % 2)
        throw new Error("hex string expected, got unpadded hex of length " + f);
      const L = new Uint8Array(m);
      for (let H = 0, x = 0; H < m; H++, x += 2) {
        const F = O(n.charCodeAt(x)), et = O(n.charCodeAt(x + 1));
        if (F === void 0 || et === void 0) {
          const gt = n[x] + n[x + 1];
          throw new Error('hex string expected, got non-hex character "' + gt + '" at index ' + x);
        }
        L[H] = F * 16 + et;
      }
      return L;
    }
    const k = async () => {
    };
    t.nextTick = k;
    async function w(n, f, m) {
      let L = Date.now();
      for (let H = 0; H < n; H++) {
        m(H);
        const x = Date.now() - L;
        x >= 0 && x < f || (await (0, t.nextTick)(), L += x);
      }
    }
    function _(n) {
      if (typeof n != "string")
        throw new Error("utf8ToBytes expected string, got " + typeof n);
      return new Uint8Array(new TextEncoder().encode(n));
    }
    function E(n) {
      return typeof n == "string" && (n = _(n)), (0, r.abytes)(n), n;
    }
    function d(...n) {
      let f = 0;
      for (let L = 0; L < n.length; L++) {
        const H = n[L];
        (0, r.abytes)(H), f += H.length;
      }
      const m = new Uint8Array(f);
      for (let L = 0, H = 0; L < n.length; L++) {
        const x = n[L];
        m.set(x, H), H += x.length;
      }
      return m;
    }
    class h {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    }
    t.Hash = h;
    function g(n, f) {
      if (f !== void 0 && {}.toString.call(f) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      return Object.assign(n, f);
    }
    function T(n) {
      const f = (L) => n().update(E(L)).digest(), m = n();
      return f.outputLen = m.outputLen, f.blockLen = m.blockLen, f.create = () => n(), f;
    }
    function A(n) {
      const f = (L, H) => n(H).update(E(L)).digest(), m = n({});
      return f.outputLen = m.outputLen, f.blockLen = m.blockLen, f.create = (L) => n(L), f;
    }
    function u(n) {
      const f = (L, H) => n(H).update(E(L)).digest(), m = n({});
      return f.outputLen = m.outputLen, f.blockLen = m.blockLen, f.create = (L) => n(L), f;
    }
    function i(n = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function")
        return e.crypto.getRandomValues(new Uint8Array(n));
      if (e.crypto && typeof e.crypto.randomBytes == "function")
        return e.crypto.randomBytes(n);
      throw new Error("crypto.getRandomValues must be defined");
    }
  }(G)), G;
}
var ct;
function Ct() {
  if (ct) return B;
  ct = 1, Object.defineProperty(B, "__esModule", { value: !0 }), B.shake256 = B.shake128 = B.keccak_512 = B.keccak_384 = B.keccak_256 = B.keccak_224 = B.sha3_512 = B.sha3_384 = B.sha3_256 = B.sha3_224 = B.Keccak = void 0, B.keccakP = k;
  const t = /* @__PURE__ */ dt(), e = /* @__PURE__ */ Bt(), r = /* @__PURE__ */ Ht(), c = [], s = [], a = [], l = /* @__PURE__ */ BigInt(0), o = /* @__PURE__ */ BigInt(1), y = /* @__PURE__ */ BigInt(2), S = /* @__PURE__ */ BigInt(7), v = /* @__PURE__ */ BigInt(256), P = /* @__PURE__ */ BigInt(113);
  for (let d = 0, h = o, g = 1, T = 0; d < 24; d++) {
    [g, T] = [T, (2 * g + 3 * T) % 5], c.push(2 * (5 * T + g)), s.push((d + 1) * (d + 2) / 2 % 64);
    let A = l;
    for (let u = 0; u < 7; u++)
      h = (h << o ^ (h >> S) * P) % v, h & y && (A ^= o << (o << /* @__PURE__ */ BigInt(u)) - o);
    a.push(A);
  }
  const [U, C] = /* @__PURE__ */ (0, e.split)(a, !0), O = (d, h, g) => g > 32 ? (0, e.rotlBH)(d, h, g) : (0, e.rotlSH)(d, h, g), b = (d, h, g) => g > 32 ? (0, e.rotlBL)(d, h, g) : (0, e.rotlSL)(d, h, g);
  function k(d, h = 24) {
    const g = new Uint32Array(10);
    for (let T = 24 - h; T < 24; T++) {
      for (let i = 0; i < 10; i++)
        g[i] = d[i] ^ d[i + 10] ^ d[i + 20] ^ d[i + 30] ^ d[i + 40];
      for (let i = 0; i < 10; i += 2) {
        const n = (i + 8) % 10, f = (i + 2) % 10, m = g[f], L = g[f + 1], H = O(m, L, 1) ^ g[n], x = b(m, L, 1) ^ g[n + 1];
        for (let F = 0; F < 50; F += 10)
          d[i + F] ^= H, d[i + F + 1] ^= x;
      }
      let A = d[2], u = d[3];
      for (let i = 0; i < 24; i++) {
        const n = s[i], f = O(A, u, n), m = b(A, u, n), L = c[i];
        A = d[L], u = d[L + 1], d[L] = f, d[L + 1] = m;
      }
      for (let i = 0; i < 50; i += 10) {
        for (let n = 0; n < 10; n++)
          g[n] = d[i + n];
        for (let n = 0; n < 10; n++)
          d[i + n] ^= ~g[(n + 2) % 10] & g[(n + 4) % 10];
      }
      d[0] ^= U[T], d[1] ^= C[T];
    }
    g.fill(0);
  }
  class w extends r.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(h, g, T, A = !1, u = 24) {
      if (super(), this.blockLen = h, this.suffix = g, this.outputLen = T, this.enableXOF = A, this.rounds = u, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, t.anumber)(T), 0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200), this.state32 = (0, r.u32)(this.state);
    }
    keccak() {
      r.isLE || (0, r.byteSwap32)(this.state32), k(this.state32, this.rounds), r.isLE || (0, r.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(h) {
      (0, t.aexists)(this);
      const { blockLen: g, state: T } = this;
      h = (0, r.toBytes)(h);
      const A = h.length;
      for (let u = 0; u < A; ) {
        const i = Math.min(g - this.pos, A - u);
        for (let n = 0; n < i; n++)
          T[this.pos++] ^= h[u++];
        this.pos === g && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: h, suffix: g, pos: T, blockLen: A } = this;
      h[T] ^= g, g & 128 && T === A - 1 && this.keccak(), h[A - 1] ^= 128, this.keccak();
    }
    writeInto(h) {
      (0, t.aexists)(this, !1), (0, t.abytes)(h), this.finish();
      const g = this.state, { blockLen: T } = this;
      for (let A = 0, u = h.length; A < u; ) {
        this.posOut >= T && this.keccak();
        const i = Math.min(T - this.posOut, u - A);
        h.set(g.subarray(this.posOut, this.posOut + i), A), this.posOut += i, A += i;
      }
      return h;
    }
    xofInto(h) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(h);
    }
    xof(h) {
      return (0, t.anumber)(h), this.xofInto(new Uint8Array(h));
    }
    digestInto(h) {
      if ((0, t.aoutput)(h, this), this.finished)
        throw new Error("digest() was already called");
      return this.writeInto(h), this.destroy(), h;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = !0, this.state.fill(0);
    }
    _cloneInto(h) {
      const { blockLen: g, suffix: T, outputLen: A, rounds: u, enableXOF: i } = this;
      return h || (h = new w(g, T, A, i, u)), h.state32.set(this.state32), h.pos = this.pos, h.posOut = this.posOut, h.finished = this.finished, h.rounds = u, h.suffix = T, h.outputLen = A, h.enableXOF = i, h.destroyed = this.destroyed, h;
    }
  }
  B.Keccak = w;
  const _ = (d, h, g) => (0, r.wrapConstructor)(() => new w(h, d, g));
  B.sha3_224 = _(6, 144, 224 / 8), B.sha3_256 = _(6, 136, 256 / 8), B.sha3_384 = _(6, 104, 384 / 8), B.sha3_512 = _(6, 72, 512 / 8), B.keccak_224 = _(1, 144, 224 / 8), B.keccak_256 = _(1, 136, 256 / 8), B.keccak_384 = _(1, 104, 384 / 8), B.keccak_512 = _(1, 72, 512 / 8);
  const E = (d, h, g) => (0, r.wrapXOFConstructorWithOpts)((T = {}) => new w(h, d, T.dkLen === void 0 ? g : T.dkLen, !0));
  return B.shake128 = E(31, 168, 128 / 8), B.shake256 = E(31, 136, 256 / 8), B;
}
var ut;
function vt() {
  if (ut) return j;
  ut = 1;
  const { sha3_512: t } = /* @__PURE__ */ Ct(), e = 24, r = 32, c = (O = 4, b = Math.random) => {
    let k = "";
    for (; k.length < O; )
      k = k + Math.floor(b() * 36).toString(36);
    return k;
  };
  function s(O) {
    let b = 8n, k = 0n;
    for (const w of O.values()) {
      const _ = BigInt(w);
      k = (k << b) + _;
    }
    return k;
  }
  const a = (O = "") => s(t(O)).toString(36).slice(1), l = Array.from(
    { length: 26 },
    (O, b) => String.fromCharCode(b + 97)
  ), o = (O) => l[Math.floor(O() * l.length)], y = ({
    globalObj: O = typeof rt < "u" ? rt : typeof window < "u" ? window : {},
    random: b = Math.random
  } = {}) => {
    const k = Object.keys(O).toString(), w = k.length ? k + c(r, b) : c(r, b);
    return a(w).substring(0, r);
  }, S = (O) => () => O++, v = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: O = Math.random,
    counter: b = S(Math.floor(O() * v)),
    length: k = e,
    fingerprint: w = y({ random: O })
  } = {}) => function() {
    const E = o(O), d = Date.now().toString(36), h = b().toString(36), g = c(k, O), T = `${d + g + h + w}`;
    return `${E + a(T).substring(1, k)}`;
  }, U = P(), C = (O, { minLength: b = 2, maxLength: k = r } = {}) => {
    const w = O.length, _ = /^[0-9a-z]+$/;
    try {
      if (typeof O == "string" && w >= b && w <= k && _.test(O))
        return !0;
    } finally {
    }
    return !1;
  };
  return j.getConstants = () => ({ defaultLength: e, bigLength: r }), j.init = P, j.createId = U, j.bufToBigInt = s, j.createCounter = S, j.createFingerprint = y, j.isCuid = C, j;
}
var lt;
function xt() {
  if (lt) return K;
  lt = 1;
  const { createId: t, init: e, getConstants: r, isCuid: c } = vt();
  return K.createId = t, K.init = e, K.getConstants = r, K.isCuid = c, K;
}
var Pt = xt();
const Q = /* @__PURE__ */ new Map(), Z = {
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
    lastModified: c,
    storage: s = "memory"
  }, a, l = -1) {
    if (a == null) return;
    const o = J(t, e, r), y = l !== -1 ? Date.now() + l : void 0, S = `frontCache::${o}`, v = {
      data: a,
      expireAt: y,
      lastModified: c ?? Date.now()
    };
    switch (s) {
      case "memory":
        Q.set(S, v);
        break;
      case "uni":
        uni.setStorageSync(S, JSON.stringify(v));
        break;
      case "session":
        sessionStorage.setItem(S, JSON.stringify(v));
        break;
      case "local":
        localStorage.setItem(S, JSON.stringify(v));
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
    storage: c = "memory"
  }) {
    const a = `frontCache::${J(t, e, r)}`;
    let l = null, o;
    switch (c) {
      case "memory":
        l = Q.get(a);
        break;
      case "uni":
        o = uni.getStorageSync(a), l = o ? JSON.parse(o) : null;
        break;
      case "session":
        o = sessionStorage.getItem(a), l = o ? JSON.parse(o) : null;
        break;
      case "local":
        o = localStorage.getItem(a), l = o ? JSON.parse(o) : null;
        break;
    }
    return l && (!l.expireAt || l.expireAt > Date.now()) ? l.data : (Z.remove({ key: t, params: e, storage: c }), null);
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
    storage: c = "memory"
  }) {
    const a = `frontCache::${J(t, e, r)}`;
    switch (c) {
      case "memory":
        Q.delete(a);
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
}, Rt = Pt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), Y = {}, Ut = (t, e, r) => {
  if (typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(r.header)), t.header || (t.header = {}), t.header.reqId = Rt(), e.authorize) {
    const c = kt();
    if (!c) {
      const s = "错误，接口需要授权才能访问！";
      return console.error(s), z.error({ title: s }), !1;
    }
    if (typeof e.authorize == "boolean")
      t.header.authorization = "Bearer " + c;
    else if (typeof e.authorize == "function" && e.authorize(t, e, c) === !1)
      return !1;
  }
  if (Object.assign(r, t), e.before) {
    const c = e.before.call(e, r);
    if (c !== void 0)
      return c;
  }
  t.loadingText && z.loading({
    title: t.loadingText.toString()
  });
}, I = (t, e, r, c) => {
  if (r.statusCode >= 200 && r.statusCode < 400) {
    const s = r.data;
    if (s.status === V.SUCCESS) {
      const a = s.data;
      t.method === "POST" && e.fieldMap && a && Tt(e.fieldMap, a), e.after && e.after.call(e, s, t), c.Result = s;
    } else
      console.error(s), c.Error = {
        status: s.status,
        errno: s.errno,
        msg: s.msg || "请求发生错误"
      }, c.Result = s;
  } else {
    let s;
    const a = r.statusCode;
    switch (a) {
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
    s = `${a}: ${s}`;
    const l = {
      status: V.ERROR,
      errno: a + 1e3,
      msg: s
    };
    c.Error = l;
  }
}, tt = (t, e) => {
  console.error(t);
  const r = {
    status: V.ERROR,
    errno: 1e3,
    msg: "网络错误：" + t.toString()
  };
  e.Error = r;
}, yt = (t, e, r) => {
  e.Error ? (console.error($(t), e.Error), t.hideErrorToast || z.error({ title: e.Error.msg })) : z.hide(1e3), r(e.Result);
}, q = (t, e, r) => {
  const c = $(Mt);
  if (Ut(t, e, c) === !1) return Promise.resolve(null);
  if (t.method === "POST") {
    if (e.cacheTime) {
      const y = Z.get({
        ...e,
        key: e.url,
        params: e.params,
        fields: ["Query", "Option.SelectFields"]
      });
      if (y) return Promise.resolve(y);
    }
    const a = J(t.url, e.params, [
      "Query",
      "Option.SelectFields"
    ]), l = Y[a];
    if (l)
      return new Promise((y) => {
        l.then(y);
      });
    const o = r(t, e).then((y) => (typeof y == "boolean" || (y == null ? void 0 : y.status) === V.SUCCESS && e.cacheTime && Z.set(
      {
        ...e,
        key: e.url,
        params: e.params,
        fields: ["Query", "Option.SelectFields"]
      },
      y == null ? void 0 : y.data,
      e.cacheTime
    ), y)).finally(() => {
      delete Y[a];
    });
    return Y[a] = o, o;
  } else
    return r(t, e);
}, W = (t, e) => {
  const r = {
    Result: null
  };
  return new Promise((c) => {
    uni.request({
      ...t,
      success: (s) => {
        I(t, e, s, r);
      },
      fail: (s) => {
        tt(s, r);
      },
      complete: () => {
        yt(e, r, c);
      }
    });
  });
}, zt = (t) => {
  const e = M(t);
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
  const r = M(t);
  return r === !1 ? Promise.resolve(null) : q(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: e,
      timeout: t.timeout,
      loadingText: "正在存储数据……"
    },
    t,
    W
  );
}, Wt = (t, e) => {
  const r = M(t);
  return r === !1 ? Promise.resolve(null) : q(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "正在删除数据……"
    },
    t,
    W
  );
}, Xt = (t, e) => {
  const r = M(t);
  return r === !1 ? Promise.resolve(null) : q(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: e,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "数据加载中……"
    },
    t,
    W
  );
}, X = (t, e) => {
  const r = {
    Result: null
  };
  return new Promise((c) => {
    mt.request({
      ...t
    }).then((s) => {
      I(
        t,
        e,
        {
          statusCode: s.status,
          data: s.data
        },
        r
      );
    }).catch((s) => {
      var a;
      s.response && s.response.status && s.response.status > 200 && s.response.status < 600 ? I(
        t,
        e,
        {
          statusCode: s.response.status,
          data: (a = s.response) == null ? void 0 : a.data
        },
        r
      ) : tt(s, r);
    }).finally(() => {
      yt(e, r, c);
    });
  });
}, Gt = (t) => {
  const e = M(t);
  return e === !1 ? Promise.resolve(null) : q(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "数据加载中……"
    },
    t,
    X
  );
}, Qt = (t, e) => {
  const r = M(t);
  return r === !1 ? Promise.resolve(null) : q(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: e,
      timeout: t.timeout,
      loadingText: "正在存储数据……"
    },
    t,
    X
  );
}, Yt = (t, e) => {
  const r = M(t);
  return r === !1 ? Promise.resolve(null) : q(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "正在删除数据……"
    },
    t,
    X
  );
}, Zt = (t, e) => {
  const r = M(t);
  return r === !1 ? Promise.resolve(null) : q(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: e,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "数据加载中……"
    },
    t,
    X
  );
}, jt = {
  url: "",
  header: { "Content-Type": "application/json" }
}, Mt = (t) => {
  Object.assign(jt, t);
};
export {
  wt as API_HOST,
  Nt as ICON_HOST,
  V as ResStatus,
  Dt as SERVER_HOST,
  $ as deepClone,
  Tt as fieldMapping,
  kt as getToken,
  Mt as globalRequestOption,
  M as hostUrl,
  Yt as httpDelete,
  Gt as httpGet,
  Zt as httpPost,
  Qt as httpPut,
  $t as isJSON,
  St as parseFieldTemplate,
  Vt as setToken,
  z as toast,
  Wt as uniDelete,
  zt as uniGet,
  Xt as uniPost,
  Jt as uniPut
};
