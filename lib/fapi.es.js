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
  var o;
  const a = c.split(".");
  let u = e;
  for (const s of a) {
    if (s.includes("[") && s.includes("]")) {
      const y = s.split("[")[0], S = parseInt(s.split("[")[1].split("]")[0]);
      u = (o = u[y]) == null ? void 0 : o[S];
    } else
      u = u == null ? void 0 : u[s];
    if (u === void 0)
      return r;
  }
  return String(u);
}), Tt = (t, e) => {
  const r = Array.isArray(e), c = r ? e : [e];
  return c.forEach((a) => {
    if (a && typeof a == "object")
      for (const u in t) {
        const o = t[u];
        if (typeof o == "string" && ft.test(o)) {
          const s = St(
            o,
            a
          );
          a[u] = s;
        } else
          a[u] = a[o];
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
  showToast(e, r, c, a) {
    const u = typeof r == "string" ? r : r.title || c;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: a || this.defaultOptions.duration,
      title: u
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
    const { title: r, icon: c, mask: a, duration: u, position: o } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: r,
        icon: c === "warning" ? "error" : c,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: u,
        position: o,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else {
      let s = "info";
      switch (this.hide(), c) {
        case "success":
          D.success(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: a,
            type: s,
            icon: s,
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
            hasMask: a,
            type: s,
            icon: s
          });
          break;
        case "loading":
          D.loading(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: a,
            type: s,
            icon: s,
            duration: -1
            // 不自动关闭
          });
          break;
        default:
          D.info(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: a,
            type: s,
            icon: s
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
  const a = wt[e];
  if (!a)
    return z.error("未查询到接口域名：" + e), !1;
  if (typeof a == "string")
    return a + r;
  if (typeof a == "object") {
    const { host: u, authorize: o } = a;
    return (c === void 0 || c === !1) && (t.authorize = o), r = u + r, r;
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
  let c = 1732584193, a = 4023233417, u = 2562383102, o = 271733878;
  const s = (b, k, w) => b & k | ~b & w, y = (b, k, w) => b & w | k & ~w, S = (b, k, w) => b ^ k ^ w, v = (b, k, w) => k ^ (b | ~w), P = [
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
    let k = c, w = a, _ = u, E = o;
    for (let d = 0; d < 64; d++) {
      let h, g, T;
      d < 16 ? (h = s(w, _, E), g = d) : d < 32 ? (h = y(w, _, E), g = (5 * d + 1) % 16) : d < 48 ? (h = S(w, _, E), g = (3 * d + 5) % 16) : (h = v(w, _, E), g = 7 * d % 16), T = E, E = _, _ = w, w = w + Ot(k + h + P[d] + b[g] | 0, U[d]), k = T;
    }
    c = c + k | 0, a = a + w | 0, u = u + _ | 0, o = o + E | 0, C += 16;
  }
  return [c, a, u, o].map((b) => {
    const k = b & 255, w = b >>> 8 & 255, _ = b >>> 16 & 255;
    return [b >>> 24 & 255, _, w, k];
  }).flat().map((b) => b.toString(16).padStart(2, "0")).join("");
}, At = (t) => _t(t), J = (t, e, r) => {
  if (!e) return t;
  let c = $(e);
  r && r.length > 0 && (r[0].startsWith("-") ? r.forEach((u) => {
    if (u.indexOf(".") > -1) {
      const o = u.split(".");
      let s = c;
      for (let y = 0; y < o.length && (y === o.length - 1 && delete s[o[y]], typeof s[o[y]] == "object" && !Array.isArray(s[o[y]])); y++)
        s = s[o[y]];
    } else delete c[u];
  }) : (c = {}, r.forEach((u) => {
    if (u.indexOf(".") > -1) {
      const o = u.split(".");
      let s = e, y = c;
      for (let S = 0; S < o.length; S++)
        if (S === o.length - 1)
          y[o[S]] = s[o[S]];
        else {
          if (s[o[S]] === null || s[o[S]] === void 0)
            break;
          if (y[o[S]] === void 0)
            if (typeof s[o[S]] != "object" || Array.isArray(s[o[S]])) {
              y[o[S]] = s[o[S]];
              break;
            } else y[o[S]] = {};
          y = y[o[S]], s = s[o[S]];
        }
    } else c[u] = e[u];
  })));
  const a = JSON.stringify(c);
  return `${t}-` + At(a);
};
var rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, K = {}, j = {}, B = {}, R = {}, st;
function dt() {
  if (st) return R;
  st = 1, Object.defineProperty(R, "__esModule", { value: !0 }), R.anumber = t, R.number = t, R.abytes = r, R.bytes = r, R.ahash = c, R.aexists = a, R.aoutput = u;
  function t(s) {
    if (!Number.isSafeInteger(s) || s < 0)
      throw new Error("positive integer expected, got " + s);
  }
  function e(s) {
    return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
  }
  function r(s, ...y) {
    if (!e(s))
      throw new Error("Uint8Array expected");
    if (y.length > 0 && !y.includes(s.length))
      throw new Error("Uint8Array expected of length " + y + ", got length=" + s.length);
  }
  function c(s) {
    if (typeof s != "function" || typeof s.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    t(s.outputLen), t(s.blockLen);
  }
  function a(s, y = !0) {
    if (s.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (y && s.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function u(s, y) {
    r(s);
    const S = y.outputLen;
    if (s.length < S)
      throw new Error("digestInto() expects output buffer of length at least " + S);
  }
  const o = {
    number: t,
    bytes: r,
    hash: c,
    exists: a,
    output: u
  };
  return R.default = o, R;
}
var p = {}, ot;
function Bt() {
  if (ot) return p;
  ot = 1, Object.defineProperty(p, "__esModule", { value: !0 }), p.add5L = p.add5H = p.add4H = p.add4L = p.add3H = p.add3L = p.rotlBL = p.rotlBH = p.rotlSL = p.rotlSH = p.rotr32L = p.rotr32H = p.rotrBL = p.rotrBH = p.rotrSL = p.rotrSH = p.shrSL = p.shrSH = p.toBig = void 0, p.fromBig = r, p.split = c, p.add = w;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function r(l, i = !1) {
    return i ? { h: Number(l & t), l: Number(l >> e & t) } : { h: Number(l >> e & t) | 0, l: Number(l & t) | 0 };
  }
  function c(l, i = !1) {
    let n = new Uint32Array(l.length), f = new Uint32Array(l.length);
    for (let m = 0; m < l.length; m++) {
      const { h: L, l: H } = r(l[m], i);
      [n[m], f[m]] = [L, H];
    }
    return [n, f];
  }
  const a = (l, i) => BigInt(l >>> 0) << e | BigInt(i >>> 0);
  p.toBig = a;
  const u = (l, i, n) => l >>> n;
  p.shrSH = u;
  const o = (l, i, n) => l << 32 - n | i >>> n;
  p.shrSL = o;
  const s = (l, i, n) => l >>> n | i << 32 - n;
  p.rotrSH = s;
  const y = (l, i, n) => l << 32 - n | i >>> n;
  p.rotrSL = y;
  const S = (l, i, n) => l << 64 - n | i >>> n - 32;
  p.rotrBH = S;
  const v = (l, i, n) => l >>> n - 32 | i << 64 - n;
  p.rotrBL = v;
  const P = (l, i) => i;
  p.rotr32H = P;
  const U = (l, i) => l;
  p.rotr32L = U;
  const C = (l, i, n) => l << n | i >>> 32 - n;
  p.rotlSH = C;
  const O = (l, i, n) => i << n | l >>> 32 - n;
  p.rotlSL = O;
  const b = (l, i, n) => i << n - 32 | l >>> 64 - n;
  p.rotlBH = b;
  const k = (l, i, n) => l << n - 32 | i >>> 64 - n;
  p.rotlBL = k;
  function w(l, i, n, f) {
    const m = (i >>> 0) + (f >>> 0);
    return { h: l + n + (m / 2 ** 32 | 0) | 0, l: m | 0 };
  }
  const _ = (l, i, n) => (l >>> 0) + (i >>> 0) + (n >>> 0);
  p.add3L = _;
  const E = (l, i, n, f) => i + n + f + (l / 2 ** 32 | 0) | 0;
  p.add3H = E;
  const d = (l, i, n, f) => (l >>> 0) + (i >>> 0) + (n >>> 0) + (f >>> 0);
  p.add4L = d;
  const h = (l, i, n, f, m) => i + n + f + m + (l / 2 ** 32 | 0) | 0;
  p.add4H = h;
  const g = (l, i, n, f, m) => (l >>> 0) + (i >>> 0) + (n >>> 0) + (f >>> 0) + (m >>> 0);
  p.add5L = g;
  const T = (l, i, n, f, m, L) => i + n + f + m + L + (l / 2 ** 32 | 0) | 0;
  p.add5H = T;
  const A = {
    fromBig: r,
    split: c,
    toBig: a,
    shrSH: u,
    shrSL: o,
    rotrSH: s,
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
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = c, t.byteSwap32 = v, t.bytesToHex = U, t.hexToBytes = b, t.asyncLoop = w, t.utf8ToBytes = _, t.toBytes = E, t.concatBytes = d, t.checkOpts = g, t.wrapConstructor = T, t.wrapConstructorWithOpts = A, t.wrapXOFConstructorWithOpts = l, t.randomBytes = i;
    const e = /* @__PURE__ */ Et(), r = /* @__PURE__ */ dt();
    function c(n) {
      return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
    }
    const a = (n) => new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
    t.u8 = a;
    const u = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4));
    t.u32 = u;
    const o = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength);
    t.createView = o;
    const s = (n, f) => n << 32 - f | n >>> f;
    t.rotr = s;
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
    function l(n) {
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
  const t = /* @__PURE__ */ dt(), e = /* @__PURE__ */ Bt(), r = /* @__PURE__ */ Ht(), c = [], a = [], u = [], o = /* @__PURE__ */ BigInt(0), s = /* @__PURE__ */ BigInt(1), y = /* @__PURE__ */ BigInt(2), S = /* @__PURE__ */ BigInt(7), v = /* @__PURE__ */ BigInt(256), P = /* @__PURE__ */ BigInt(113);
  for (let d = 0, h = s, g = 1, T = 0; d < 24; d++) {
    [g, T] = [T, (2 * g + 3 * T) % 5], c.push(2 * (5 * T + g)), a.push((d + 1) * (d + 2) / 2 % 64);
    let A = o;
    for (let l = 0; l < 7; l++)
      h = (h << s ^ (h >> S) * P) % v, h & y && (A ^= s << (s << /* @__PURE__ */ BigInt(l)) - s);
    u.push(A);
  }
  const [U, C] = /* @__PURE__ */ (0, e.split)(u, !0), O = (d, h, g) => g > 32 ? (0, e.rotlBH)(d, h, g) : (0, e.rotlSH)(d, h, g), b = (d, h, g) => g > 32 ? (0, e.rotlBL)(d, h, g) : (0, e.rotlSL)(d, h, g);
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
      let A = d[2], l = d[3];
      for (let i = 0; i < 24; i++) {
        const n = a[i], f = O(A, l, n), m = b(A, l, n), L = c[i];
        A = d[L], l = d[L + 1], d[L] = f, d[L + 1] = m;
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
    constructor(h, g, T, A = !1, l = 24) {
      if (super(), this.blockLen = h, this.suffix = g, this.outputLen = T, this.enableXOF = A, this.rounds = l, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, t.anumber)(T), 0 >= this.blockLen || this.blockLen >= 200)
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
      for (let l = 0; l < A; ) {
        const i = Math.min(g - this.pos, A - l);
        for (let n = 0; n < i; n++)
          T[this.pos++] ^= h[l++];
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
      for (let A = 0, l = h.length; A < l; ) {
        this.posOut >= T && this.keccak();
        const i = Math.min(T - this.posOut, l - A);
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
      const { blockLen: g, suffix: T, outputLen: A, rounds: l, enableXOF: i } = this;
      return h || (h = new w(g, T, A, i, l)), h.state32.set(this.state32), h.pos = this.pos, h.posOut = this.posOut, h.finished = this.finished, h.rounds = l, h.suffix = T, h.outputLen = A, h.enableXOF = i, h.destroyed = this.destroyed, h;
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
  function a(O) {
    let b = 8n, k = 0n;
    for (const w of O.values()) {
      const _ = BigInt(w);
      k = (k << b) + _;
    }
    return k;
  }
  const u = (O = "") => a(t(O)).toString(36).slice(1), o = Array.from(
    { length: 26 },
    (O, b) => String.fromCharCode(b + 97)
  ), s = (O) => o[Math.floor(O() * o.length)], y = ({
    globalObj: O = typeof rt < "u" ? rt : typeof window < "u" ? window : {},
    random: b = Math.random
  } = {}) => {
    const k = Object.keys(O).toString(), w = k.length ? k + c(r, b) : c(r, b);
    return u(w).substring(0, r);
  }, S = (O) => () => O++, v = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: O = Math.random,
    counter: b = S(Math.floor(O() * v)),
    length: k = e,
    fingerprint: w = y({ random: O })
  } = {}) => function() {
    const E = s(O), d = Date.now().toString(36), h = b().toString(36), g = c(k, O), T = `${d + g + h + w}`;
    return `${E + u(T).substring(1, k)}`;
  }, U = P(), C = (O, { minLength: b = 2, maxLength: k = r } = {}) => {
    const w = O.length, _ = /^[0-9a-z]+$/;
    try {
      if (typeof O == "string" && w >= b && w <= k && _.test(O))
        return !0;
    } finally {
    }
    return !1;
  };
  return j.getConstants = () => ({ defaultLength: e, bigLength: r }), j.init = P, j.createId = U, j.bufToBigInt = a, j.createCounter = S, j.createFingerprint = y, j.isCuid = C, j;
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
    storage: a = "memory"
  }, u, o = -1) {
    if (u == null) return;
    const s = J(t, e, r), y = o !== -1 ? Date.now() + o : void 0, S = `frontCache::${s}`, v = {
      data: u,
      expireAt: y,
      lastModified: c ?? Date.now()
    };
    switch (a) {
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
    const u = `frontCache::${J(t, e, r)}`;
    let o = null, s;
    switch (c) {
      case "memory":
        o = Q.get(u);
        break;
      case "uni":
        s = uni.getStorageSync(u), o = s ? JSON.parse(s) : null;
        break;
      case "session":
        s = sessionStorage.getItem(u), o = s ? JSON.parse(s) : null;
        break;
      case "local":
        s = localStorage.getItem(u), o = s ? JSON.parse(s) : null;
        break;
    }
    return o && (!o.expireAt || o.expireAt > Date.now()) ? o.data : (Z.remove({ key: t, params: e, storage: c }), null);
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
    const u = `frontCache::${J(t, e, r)}`;
    switch (c) {
      case "memory":
        Q.delete(u);
        break;
      case "uni":
        uni.removeStorageSync(u);
        break;
      case "session":
        sessionStorage.removeItem(u);
        break;
      case "local":
        localStorage.removeItem(u);
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
  if (Object.assign(t, r, t), typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(r.header)), t.header || (t.header = {}), t.header.reqId = Rt(), console.log(e.url, e.authorize), e.authorize) {
    const c = kt();
    if (console.log(e.url, c), !c) {
      const a = "错误，接口需要授权才能访问！";
      return console.error(a), z.error({ title: a }), !1;
    }
    if (typeof e.authorize == "boolean")
      t.header.authorization = "Bearer " + c;
    else if (typeof e.authorize == "function" && e.authorize(t, e, c) === !1)
      return !1;
  }
  if (console.log(e.url, t), e.before) {
    const c = e.before.call(e, t);
    if (c !== void 0)
      return c;
  }
  t.loadingText && z.loading({
    title: t.loadingText.toString()
  });
}, I = (t, e, r, c) => {
  if (r.statusCode >= 200 && r.statusCode < 400) {
    const a = r.data;
    if (a.status === V.SUCCESS) {
      const u = a.data;
      t.method === "POST" && e.fieldMap && u && Tt(e.fieldMap, u), e.after && e.after.call(e, a, t), c.Result = a;
    } else
      console.error(a), c.Error = {
        status: a.status,
        errno: a.errno,
        msg: a.msg || "请求发生错误"
      }, c.Result = a;
  } else {
    let a;
    const u = r.statusCode;
    switch (u) {
      case 401:
        a = "未授权或授权过期";
        break;
      case 403:
        a = "无权访问";
        break;
      case 404:
        a = "请求地址错误";
        break;
      case 500:
        a = "服务器异常";
        break;
      default:
        a = "其它请求错误";
        break;
    }
    a = `${u}: ${a}`;
    const o = {
      status: V.ERROR,
      errno: u + 1e3,
      msg: a
    };
    c.Error = o;
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
    const u = J(t.url, e.params, [
      "Query",
      "Option.SelectFields"
    ]), o = Y[u];
    if (o)
      return new Promise((y) => {
        o.then(y);
      });
    const s = r(t, e).then((y) => (typeof y == "boolean" || (y == null ? void 0 : y.status) === V.SUCCESS && e.cacheTime && Z.set(
      {
        ...e,
        key: e.url,
        params: e.params,
        fields: ["Query", "Option.SelectFields"]
      },
      y == null ? void 0 : y.data,
      e.cacheTime
    ), y)).finally(() => {
      delete Y[u];
    });
    return Y[u] = s, s;
  } else
    return r(t, e);
}, W = (t, e) => {
  const r = {
    Result: null
  };
  return new Promise((c) => {
    uni.request({
      ...t,
      success: (a) => {
        I(t, e, a, r);
      },
      fail: (a) => {
        tt(a, r);
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
  }, { header: c, ...a } = t;
  return new Promise((u) => {
    mt.request({
      ...a,
      headers: c
    }).then((o) => {
      I(
        t,
        e,
        {
          statusCode: o.status,
          data: o.data
        },
        r
      );
    }).catch((o) => {
      var s;
      o.response && o.response.status && o.response.status > 200 && o.response.status < 600 ? I(
        t,
        e,
        {
          statusCode: o.response.status,
          data: (s = o.response) == null ? void 0 : s.data
        },
        r
      ) : tt(o, r);
    }).finally(() => {
      yt(e, r, u);
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
