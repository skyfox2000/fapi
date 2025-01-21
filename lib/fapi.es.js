var bt = Object.defineProperty;
var mt = (t, e, r) => e in t ? bt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var nt = (t, e, r) => mt(t, typeof e != "symbol" ? e + "" : e, r);
import D from "vue-m-message";
import wt from "axios";
var V = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(V || {});
const kt = {
  SITEHOST_API: ""
}, Dt = {}, Nt = {};
let ht = "";
const St = () => ht, Vt = (t) => {
  ht = t;
}, $ = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const r = [];
    for (let u = 0; u < t.length; u++)
      r[u] = $(t[u]);
    return r;
  }
  const e = {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = $(t[r]));
  return e;
}, ft = /\$\{([\w\.\[\]0-9]+)\}/g, Tt = (t, e) => t.replace(ft, (r, u) => {
  var i;
  const o = u.split(".");
  let c = e;
  for (const s of o) {
    if (s.includes("[") && s.includes("]")) {
      const y = s.split("[")[0], S = parseInt(s.split("[")[1].split("]")[0]);
      c = (i = c[y]) == null ? void 0 : i[S];
    } else
      c = c == null ? void 0 : c[s];
    if (c === void 0)
      return r;
  }
  return String(c);
}), dt = (t, e) => {
  const r = Array.isArray(e), u = r ? e : [e];
  return u.forEach((o) => {
    if (o && typeof o == "object") {
      for (const c in t) {
        const i = t[c];
        if (typeof i == "string" && ft.test(i)) {
          const s = Tt(
            i,
            o
          );
          o[c] = s;
        } else
          o[c] = o[i];
      }
      o.children && Array.isArray(o.children) && (o.children = dt(t, o.children));
    }
  }), r ? e : u[0];
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
  showToast(e, r, u, o) {
    const c = typeof r == "string" ? r : r.title || u;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: o || this.defaultOptions.duration,
      title: c
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
    const { title: r, icon: u, mask: o, duration: c, position: i } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: r,
        icon: u === "warning" ? "error" : u,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: c,
        position: i,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else {
      let s = "info";
      switch (this.hide(), u) {
        case "success":
          D.success(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: o,
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
            hasMask: o,
            type: s,
            icon: s
          });
          break;
        case "loading":
          D.loading(r, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: o,
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
            hasMask: o,
            type: s,
            icon: s
          });
          break;
      }
    }
  }
}
const z = new Lt(), M = (t) => {
  let { api: e, url: r, authorize: u } = t;
  if (r.startsWith("http://") || r.startsWith("https://") || !e)
    return r;
  const o = kt[e];
  if (!o)
    return z.error("未查询到接口域名：" + e), !1;
  if (typeof o == "string")
    return o + r;
  if (typeof o == "object") {
    const { host: c, authorize: i } = o;
    return (u === void 0 || u === !1) && (t.authorize = i), r = c + r, r;
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
  let u = 1732584193, o = 4023233417, c = 2562383102, i = 271733878;
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
    let k = u, w = o, _ = c, E = i;
    for (let d = 0; d < 64; d++) {
      let h, g, T;
      d < 16 ? (h = s(w, _, E), g = d) : d < 32 ? (h = y(w, _, E), g = (5 * d + 1) % 16) : d < 48 ? (h = S(w, _, E), g = (3 * d + 5) % 16) : (h = v(w, _, E), g = 7 * d % 16), T = E, E = _, _ = w, w = w + Ot(k + h + P[d] + b[g] | 0, U[d]), k = T;
    }
    u = u + k | 0, o = o + w | 0, c = c + _ | 0, i = i + E | 0, C += 16;
  }
  return [u, o, c, i].map((b) => {
    const k = b & 255, w = b >>> 8 & 255, _ = b >>> 16 & 255;
    return [b >>> 24 & 255, _, w, k];
  }).flat().map((b) => b.toString(16).padStart(2, "0")).join("");
}, At = (t) => _t(t), J = (t, e, r) => {
  if (!e) return t;
  let u = $(e);
  r && r.length > 0 && (r[0].startsWith("-") ? r.forEach((c) => {
    if (c.indexOf(".") > -1) {
      const i = c.split(".");
      let s = u;
      for (let y = 0; y < i.length && (y === i.length - 1 && delete s[i[y]], typeof s[i[y]] == "object" && !Array.isArray(s[i[y]])); y++)
        s = s[i[y]];
    } else delete u[c];
  }) : (u = {}, r.forEach((c) => {
    if (c.indexOf(".") > -1) {
      const i = c.split(".");
      let s = e, y = u;
      for (let S = 0; S < i.length; S++)
        if (S === i.length - 1)
          y[i[S]] = s[i[S]];
        else {
          if (s[i[S]] === null || s[i[S]] === void 0)
            break;
          if (y[i[S]] === void 0)
            if (typeof s[i[S]] != "object" || Array.isArray(s[i[S]])) {
              y[i[S]] = s[i[S]];
              break;
            } else y[i[S]] = {};
          y = y[i[S]], s = s[i[S]];
        }
    } else u[c] = e[c];
  })));
  const o = JSON.stringify(u);
  return `${t}-` + At(o);
};
var rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, K = {}, j = {}, B = {}, R = {}, st;
function yt() {
  if (st) return R;
  st = 1, Object.defineProperty(R, "__esModule", { value: !0 }), R.anumber = t, R.number = t, R.abytes = r, R.bytes = r, R.ahash = u, R.aexists = o, R.aoutput = c;
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
  function u(s) {
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
  function c(s, y) {
    r(s);
    const S = y.outputLen;
    if (s.length < S)
      throw new Error("digestInto() expects output buffer of length at least " + S);
  }
  const i = {
    number: t,
    bytes: r,
    hash: u,
    exists: o,
    output: c
  };
  return R.default = i, R;
}
var p = {}, ot;
function Bt() {
  if (ot) return p;
  ot = 1, Object.defineProperty(p, "__esModule", { value: !0 }), p.add5L = p.add5H = p.add4H = p.add4L = p.add3H = p.add3L = p.rotlBL = p.rotlBH = p.rotlSL = p.rotlSH = p.rotr32L = p.rotr32H = p.rotrBL = p.rotrBH = p.rotrSL = p.rotrSH = p.shrSL = p.shrSH = p.toBig = void 0, p.fromBig = r, p.split = u, p.add = w;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function r(l, a = !1) {
    return a ? { h: Number(l & t), l: Number(l >> e & t) } : { h: Number(l >> e & t) | 0, l: Number(l & t) | 0 };
  }
  function u(l, a = !1) {
    let n = new Uint32Array(l.length), f = new Uint32Array(l.length);
    for (let m = 0; m < l.length; m++) {
      const { h: L, l: H } = r(l[m], a);
      [n[m], f[m]] = [L, H];
    }
    return [n, f];
  }
  const o = (l, a) => BigInt(l >>> 0) << e | BigInt(a >>> 0);
  p.toBig = o;
  const c = (l, a, n) => l >>> n;
  p.shrSH = c;
  const i = (l, a, n) => l << 32 - n | a >>> n;
  p.shrSL = i;
  const s = (l, a, n) => l >>> n | a << 32 - n;
  p.rotrSH = s;
  const y = (l, a, n) => l << 32 - n | a >>> n;
  p.rotrSL = y;
  const S = (l, a, n) => l << 64 - n | a >>> n - 32;
  p.rotrBH = S;
  const v = (l, a, n) => l >>> n - 32 | a << 64 - n;
  p.rotrBL = v;
  const P = (l, a) => a;
  p.rotr32H = P;
  const U = (l, a) => l;
  p.rotr32L = U;
  const C = (l, a, n) => l << n | a >>> 32 - n;
  p.rotlSH = C;
  const O = (l, a, n) => a << n | l >>> 32 - n;
  p.rotlSL = O;
  const b = (l, a, n) => a << n - 32 | l >>> 64 - n;
  p.rotlBH = b;
  const k = (l, a, n) => l << n - 32 | a >>> 64 - n;
  p.rotlBL = k;
  function w(l, a, n, f) {
    const m = (a >>> 0) + (f >>> 0);
    return { h: l + n + (m / 2 ** 32 | 0) | 0, l: m | 0 };
  }
  const _ = (l, a, n) => (l >>> 0) + (a >>> 0) + (n >>> 0);
  p.add3L = _;
  const E = (l, a, n, f) => a + n + f + (l / 2 ** 32 | 0) | 0;
  p.add3H = E;
  const d = (l, a, n, f) => (l >>> 0) + (a >>> 0) + (n >>> 0) + (f >>> 0);
  p.add4L = d;
  const h = (l, a, n, f, m) => a + n + f + m + (l / 2 ** 32 | 0) | 0;
  p.add4H = h;
  const g = (l, a, n, f, m) => (l >>> 0) + (a >>> 0) + (n >>> 0) + (f >>> 0) + (m >>> 0);
  p.add5L = g;
  const T = (l, a, n, f, m, L) => a + n + f + m + L + (l / 2 ** 32 | 0) | 0;
  p.add5H = T;
  const A = {
    fromBig: r,
    split: u,
    toBig: o,
    shrSH: c,
    shrSL: i,
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
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = u, t.byteSwap32 = v, t.bytesToHex = U, t.hexToBytes = b, t.asyncLoop = w, t.utf8ToBytes = _, t.toBytes = E, t.concatBytes = d, t.checkOpts = g, t.wrapConstructor = T, t.wrapConstructorWithOpts = A, t.wrapXOFConstructorWithOpts = l, t.randomBytes = a;
    const e = /* @__PURE__ */ Et(), r = /* @__PURE__ */ yt();
    function u(n) {
      return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
    }
    const o = (n) => new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
    t.u8 = o;
    const c = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4));
    t.u32 = c;
    const i = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength);
    t.createView = i;
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
          const pt = n[x] + n[x + 1];
          throw new Error('hex string expected, got non-hex character "' + pt + '" at index ' + x);
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
    function a(n = 32) {
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
  const t = /* @__PURE__ */ yt(), e = /* @__PURE__ */ Bt(), r = /* @__PURE__ */ Ht(), u = [], o = [], c = [], i = /* @__PURE__ */ BigInt(0), s = /* @__PURE__ */ BigInt(1), y = /* @__PURE__ */ BigInt(2), S = /* @__PURE__ */ BigInt(7), v = /* @__PURE__ */ BigInt(256), P = /* @__PURE__ */ BigInt(113);
  for (let d = 0, h = s, g = 1, T = 0; d < 24; d++) {
    [g, T] = [T, (2 * g + 3 * T) % 5], u.push(2 * (5 * T + g)), o.push((d + 1) * (d + 2) / 2 % 64);
    let A = i;
    for (let l = 0; l < 7; l++)
      h = (h << s ^ (h >> S) * P) % v, h & y && (A ^= s << (s << /* @__PURE__ */ BigInt(l)) - s);
    c.push(A);
  }
  const [U, C] = /* @__PURE__ */ (0, e.split)(c, !0), O = (d, h, g) => g > 32 ? (0, e.rotlBH)(d, h, g) : (0, e.rotlSH)(d, h, g), b = (d, h, g) => g > 32 ? (0, e.rotlBL)(d, h, g) : (0, e.rotlSL)(d, h, g);
  function k(d, h = 24) {
    const g = new Uint32Array(10);
    for (let T = 24 - h; T < 24; T++) {
      for (let a = 0; a < 10; a++)
        g[a] = d[a] ^ d[a + 10] ^ d[a + 20] ^ d[a + 30] ^ d[a + 40];
      for (let a = 0; a < 10; a += 2) {
        const n = (a + 8) % 10, f = (a + 2) % 10, m = g[f], L = g[f + 1], H = O(m, L, 1) ^ g[n], x = b(m, L, 1) ^ g[n + 1];
        for (let F = 0; F < 50; F += 10)
          d[a + F] ^= H, d[a + F + 1] ^= x;
      }
      let A = d[2], l = d[3];
      for (let a = 0; a < 24; a++) {
        const n = o[a], f = O(A, l, n), m = b(A, l, n), L = u[a];
        A = d[L], l = d[L + 1], d[L] = f, d[L + 1] = m;
      }
      for (let a = 0; a < 50; a += 10) {
        for (let n = 0; n < 10; n++)
          g[n] = d[a + n];
        for (let n = 0; n < 10; n++)
          d[a + n] ^= ~g[(n + 2) % 10] & g[(n + 4) % 10];
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
        const a = Math.min(g - this.pos, A - l);
        for (let n = 0; n < a; n++)
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
        const a = Math.min(T - this.posOut, l - A);
        h.set(g.subarray(this.posOut, this.posOut + a), A), this.posOut += a, A += a;
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
      const { blockLen: g, suffix: T, outputLen: A, rounds: l, enableXOF: a } = this;
      return h || (h = new w(g, T, A, a, l)), h.state32.set(this.state32), h.pos = this.pos, h.posOut = this.posOut, h.finished = this.finished, h.rounds = l, h.suffix = T, h.outputLen = A, h.enableXOF = a, h.destroyed = this.destroyed, h;
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
  const { sha3_512: t } = /* @__PURE__ */ Ct(), e = 24, r = 32, u = (O = 4, b = Math.random) => {
    let k = "";
    for (; k.length < O; )
      k = k + Math.floor(b() * 36).toString(36);
    return k;
  };
  function o(O) {
    let b = 8n, k = 0n;
    for (const w of O.values()) {
      const _ = BigInt(w);
      k = (k << b) + _;
    }
    return k;
  }
  const c = (O = "") => o(t(O)).toString(36).slice(1), i = Array.from(
    { length: 26 },
    (O, b) => String.fromCharCode(b + 97)
  ), s = (O) => i[Math.floor(O() * i.length)], y = ({
    globalObj: O = typeof rt < "u" ? rt : typeof window < "u" ? window : {},
    random: b = Math.random
  } = {}) => {
    const k = Object.keys(O).toString(), w = k.length ? k + u(r, b) : u(r, b);
    return c(w).substring(0, r);
  }, S = (O) => () => O++, v = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: O = Math.random,
    counter: b = S(Math.floor(O() * v)),
    length: k = e,
    fingerprint: w = y({ random: O })
  } = {}) => function() {
    const E = s(O), d = Date.now().toString(36), h = b().toString(36), g = u(k, O), T = `${d + g + h + w}`;
    return `${E + c(T).substring(1, k)}`;
  }, U = P(), C = (O, { minLength: b = 2, maxLength: k = r } = {}) => {
    const w = O.length, _ = /^[0-9a-z]+$/;
    try {
      if (typeof O == "string" && w >= b && w <= k && _.test(O))
        return !0;
    } finally {
    }
    return !1;
  };
  return j.getConstants = () => ({ defaultLength: e, bigLength: r }), j.init = P, j.createId = U, j.bufToBigInt = o, j.createCounter = S, j.createFingerprint = y, j.isCuid = C, j;
}
var lt;
function xt() {
  if (lt) return K;
  lt = 1;
  const { createId: t, init: e, getConstants: r, isCuid: u } = vt();
  return K.createId = t, K.init = e, K.getConstants = r, K.isCuid = u, K;
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
    lastModified: u,
    storage: o = "memory"
  }, c, i = -1) {
    if (c == null) return;
    const s = J(t, e, r), y = i !== -1 ? Date.now() + i : void 0, S = `frontCache::${s}`, v = {
      data: c,
      expireAt: y,
      lastModified: u ?? Date.now()
    };
    switch (o) {
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
    storage: u = "memory"
  }) {
    const c = `frontCache::${J(t, e, r)}`;
    let i = null, s;
    switch (u) {
      case "memory":
        i = Q.get(c);
        break;
      case "uni":
        s = uni.getStorageSync(c), i = s ? JSON.parse(s) : null;
        break;
      case "session":
        s = sessionStorage.getItem(c), i = s ? JSON.parse(s) : null;
        break;
      case "local":
        s = localStorage.getItem(c), i = s ? JSON.parse(s) : null;
        break;
    }
    return i && (!i.expireAt || i.expireAt > Date.now()) ? i.data : (Z.remove({ key: t, params: e, storage: u }), null);
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
    storage: u = "memory"
  }) {
    const c = `frontCache::${J(t, e, r)}`;
    switch (u) {
      case "memory":
        Q.delete(c);
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
  if (Object.assign(t, r, t), typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(r.header)), t.header || (t.header = {}), t.header.reqId = Rt(), e.authorize) {
    const u = St();
    if (!u) {
      const o = "错误，接口需要授权才能访问！";
      return console.error(o), z.error({ title: o }), !1;
    }
    if (typeof e.authorize == "boolean")
      t.header.authorization = "Bearer " + u;
    else if (typeof e.authorize == "function" && e.authorize(t, e, u) === !1)
      return !1;
  }
  if (e.before) {
    const u = e.before.call(e, t);
    if (u !== void 0)
      return u;
  }
  t.loadingText && z.loading({
    title: t.loadingText.toString()
  });
}, I = (t, e, r, u) => {
  if (r.statusCode >= 200 && r.statusCode < 400) {
    const o = r.data;
    if (o.status === V.SUCCESS) {
      const c = o.data;
      t.method === "POST" && e.fieldMap && c && dt(e.fieldMap, c), e.after && e.after.call(e, o, t), u.Result = o;
    } else
      console.error(o), u.Error = {
        status: o.status,
        errno: o.errno,
        msg: o.msg || "请求发生错误"
      }, u.Result = o;
  } else {
    let o;
    const c = r.statusCode;
    switch (c) {
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
    o = `${c}: ${o}`;
    const i = {
      status: V.ERROR,
      errno: c + 1e3,
      msg: o
    };
    u.Error = i;
  }
}, tt = (t, e) => {
  console.error(t);
  const r = {
    status: V.ERROR,
    errno: 1e3,
    msg: "网络错误：" + t.toString()
  };
  e.Error = r;
}, gt = (t, e, r) => {
  e.Error ? (console.error($(t), e.Error), t.hideErrorToast || z.error({ title: e.Error.msg })) : z.hide(1e3), r(e.Result);
}, q = (t, e, r) => {
  const u = $(Mt);
  if (Ut(t, e, u) === !1) return Promise.resolve(null);
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
    const c = J(t.url, e.params, [
      "Query",
      "Option.SelectFields"
    ]), i = Y[c];
    if (i)
      return new Promise((y) => {
        i.then(y);
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
      delete Y[c];
    });
    return Y[c] = s, s;
  } else
    return r(t, e);
}, W = (t, e) => {
  const r = {
    Result: null
  };
  return new Promise((u) => {
    uni.request({
      ...t,
      success: (o) => {
        I(t, e, o, r);
      },
      fail: (o) => {
        tt(o, r);
      },
      complete: () => {
        gt(e, r, u);
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
  }, { header: u, ...o } = t;
  return new Promise((c) => {
    wt.request({
      ...o,
      headers: u
    }).then((i) => {
      I(
        t,
        e,
        {
          statusCode: i.status,
          data: i.data
        },
        r
      );
    }).catch((i) => {
      var s;
      i.response && i.response.status && i.response.status > 200 && i.response.status < 600 ? I(
        t,
        e,
        {
          statusCode: i.response.status,
          data: (s = i.response) == null ? void 0 : s.data
        },
        r
      ) : tt(i, r);
    }).finally(() => {
      gt(e, r, c);
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
  kt as API_HOST,
  Nt as ICON_HOST,
  V as ResStatus,
  Dt as SERVER_HOST,
  $ as deepClone,
  dt as fieldMapping,
  St as getToken,
  Mt as globalRequestOption,
  M as hostUrl,
  Yt as httpDelete,
  Gt as httpGet,
  Zt as httpPost,
  Qt as httpPut,
  $t as isJSON,
  Tt as parseFieldTemplate,
  Vt as setToken,
  z as toast,
  Wt as uniDelete,
  zt as uniGet,
  Xt as uniPost,
  Jt as uniPut
};
