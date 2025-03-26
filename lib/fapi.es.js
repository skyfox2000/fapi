var mt = Object.defineProperty;
var bt = (t, e, n) => e in t ? mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Q = (t, e, n) => bt(t, typeof e != "symbol" ? e + "" : e, n);
import X from "vue-m-message";
import wt from "axios";
var D = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(D || {});
const kt = {
  SITEHOST_API: ""
}, Vt = {}, $t = {};
let ht = "";
const St = () => ht, zt = (t) => {
  ht = t;
}, z = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const n = [];
    for (let a = 0; a < t.length; a++)
      n[a] = z(t[a]);
    return n;
  }
  const e = {};
  for (const n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = z(t[n]));
  return e;
}, ft = /\$\{([\w\.\[\]0-9]+)\}/g, Tt = (t, e) => t.replace(ft, (n, a) => {
  var i;
  const o = a.split(".");
  let u = e;
  for (const s of o) {
    if (s.includes("[") && s.includes("]")) {
      const b = s.split("[")[0], y = parseInt(s.split("[")[1].split("]")[0]);
      u = (i = u[b]) == null ? void 0 : i[y];
    } else
      u = u == null ? void 0 : u[s];
    if (u === void 0)
      return n;
  }
  return String(u);
}), dt = (t, e) => {
  const n = Array.isArray(e), a = n ? e : [e];
  return a.forEach((o) => {
    if (o && typeof o == "object") {
      for (const u in t) {
        const i = t[u];
        if (typeof i == "string" && ft.test(i)) {
          const s = Tt(
            i,
            o
          );
          o[u] = s;
        } else o[i] !== void 0 && (o[u] = o[i]);
      }
      o.children && Array.isArray(o.children) && (o.children = dt(t, o.children));
    }
  }), n ? e : a[0];
}, Xt = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
class Lt {
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
  showToast(e, n, a, o) {
    const u = typeof n == "string" ? n : n.title || a;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: o || this.defaultOptions.duration,
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
    e = e || 0;
    const n = this.currentToast.map((a) => a.id);
    e === 0 ? this.close(n) : setTimeout(() => this.close(n), e);
  }
  close(e) {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : (e.forEach((n) => {
      var a;
      (a = this.currentToast.find((o) => o.id === n)) == null || a.close();
    }), this.currentToast = this.currentToast.filter((n) => !e.includes(n.id)));
  }
  show(e) {
    const { title: n, icon: a, mask: o, duration: u, position: i } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: n,
        icon: a === "warning" ? "error" : a,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: u,
        position: i,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else {
      let s = "info";
      switch (this.hide(), a) {
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
const K = new Lt(), M = (t) => {
  let { api: e, url: n, authorize: a } = t;
  if (n.startsWith("http://") || n.startsWith("https://") || !e)
    return n;
  const o = kt[e];
  if (!o)
    return K.error("未查询到接口域名：" + e), !1;
  if (typeof o == "string")
    return o + n;
  if (typeof o == "object") {
    const { host: u, authorize: i } = o;
    return (a === void 0 || a === !1) && (t.authorize = i), n = u + n, n;
  }
  return n;
}, Ot = (t, e) => t << e | t >>> 32 - e, _t = (t) => {
  const e = [];
  for (let m = 0; m < t.length; m++)
    e.push(t.charCodeAt(m));
  const n = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(n >>> 24 & 255), e.push(n >>> 16 & 255), e.push(n >>> 8 & 255), e.push(n & 255);
  let a = 1732584193, o = 4023233417, u = 2562383102, i = 271733878;
  const s = (m, S, k) => m & S | ~m & k, b = (m, S, k) => m & k | S & ~k, y = (m, S, k) => m ^ S ^ k, H = (m, S, k) => S ^ (m | ~k), P = [
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
    const m = new Array(16).fill(0);
    for (let d = 0; d < 16; d++)
      m[d] = e[C + d] || 0;
    let S = a, k = o, _ = u, B = i;
    for (let d = 0; d < 64; d++) {
      let h, g, T;
      d < 16 ? (h = s(k, _, B), g = d) : d < 32 ? (h = b(k, _, B), g = (5 * d + 1) % 16) : d < 48 ? (h = y(k, _, B), g = (3 * d + 5) % 16) : (h = H(k, _, B), g = 7 * d % 16), T = B, B = _, _ = k, k = k + Ot(S + h + P[d] + m[g] | 0, j[d]), S = T;
    }
    a = a + S | 0, o = o + k | 0, u = u + _ | 0, i = i + B | 0, C += 16;
  }
  return [a, o, u, i].map((m) => {
    const S = m & 255, k = m >>> 8 & 255, _ = m >>> 16 & 255;
    return [m >>> 24 & 255, _, k, S];
  }).flat().map((m) => m.toString(16).padStart(2, "0")).join("");
}, At = (t) => _t(t), J = (t, e, n) => {
  if (!e) return t;
  let a = z(e);
  n && n.length > 0 && (n[0].startsWith("-") ? n.forEach((u) => {
    if (u.indexOf(".") > -1) {
      const i = u.split(".");
      let s = a;
      for (let b = 0; b < i.length && (b === i.length - 1 && delete s[i[b]], typeof s[i[b]] == "object" && !Array.isArray(s[i[b]])); b++)
        s = s[i[b]];
    } else delete a[u];
  }) : (a = {}, n.forEach((u) => {
    if (u.indexOf(".") > -1) {
      const i = u.split(".");
      let s = e, b = a;
      for (let y = 0; y < i.length; y++)
        if (y === i.length - 1)
          b[i[y]] = s[i[y]];
        else {
          if (s[i[y]] === null || s[i[y]] === void 0)
            break;
          if (b[i[y]] === void 0)
            if (typeof s[i[y]] != "object" || Array.isArray(s[i[y]])) {
              b[i[y]] = s[i[y]];
              break;
            } else b[i[y]] = {};
          b = b[i[y]], s = s[i[y]];
        }
    } else a[u] = e[u];
  })));
  const o = JSON.stringify(a);
  return `${t}-` + At(o);
};
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, N = {}, U = {}, E = {}, R = {}, st;
function yt() {
  if (st) return R;
  st = 1, Object.defineProperty(R, "__esModule", { value: !0 }), R.anumber = t, R.number = t, R.abytes = n, R.bytes = n, R.ahash = a, R.aexists = o, R.aoutput = u;
  function t(s) {
    if (!Number.isSafeInteger(s) || s < 0)
      throw new Error("positive integer expected, got " + s);
  }
  function e(s) {
    return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
  }
  function n(s, ...b) {
    if (!e(s))
      throw new Error("Uint8Array expected");
    if (b.length > 0 && !b.includes(s.length))
      throw new Error("Uint8Array expected of length " + b + ", got length=" + s.length);
  }
  function a(s) {
    if (typeof s != "function" || typeof s.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    t(s.outputLen), t(s.blockLen);
  }
  function o(s, b = !0) {
    if (s.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (b && s.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function u(s, b) {
    n(s);
    const y = b.outputLen;
    if (s.length < y)
      throw new Error("digestInto() expects output buffer of length at least " + y);
  }
  const i = {
    number: t,
    bytes: n,
    hash: a,
    exists: o,
    output: u
  };
  return R.default = i, R;
}
var p = {}, ot;
function Et() {
  if (ot) return p;
  ot = 1, Object.defineProperty(p, "__esModule", { value: !0 }), p.add5L = p.add5H = p.add4H = p.add4L = p.add3H = p.add3L = p.rotlBL = p.rotlBH = p.rotlSL = p.rotlSH = p.rotr32L = p.rotr32H = p.rotrBL = p.rotrBH = p.rotrSL = p.rotrSH = p.shrSL = p.shrSH = p.toBig = void 0, p.fromBig = n, p.split = a, p.add = k;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function n(l, c = !1) {
    return c ? { h: Number(l & t), l: Number(l >> e & t) } : { h: Number(l >> e & t) | 0, l: Number(l & t) | 0 };
  }
  function a(l, c = !1) {
    let r = new Uint32Array(l.length), f = new Uint32Array(l.length);
    for (let w = 0; w < l.length; w++) {
      const { h: L, l: x } = n(l[w], c);
      [r[w], f[w]] = [L, x];
    }
    return [r, f];
  }
  const o = (l, c) => BigInt(l >>> 0) << e | BigInt(c >>> 0);
  p.toBig = o;
  const u = (l, c, r) => l >>> r;
  p.shrSH = u;
  const i = (l, c, r) => l << 32 - r | c >>> r;
  p.shrSL = i;
  const s = (l, c, r) => l >>> r | c << 32 - r;
  p.rotrSH = s;
  const b = (l, c, r) => l << 32 - r | c >>> r;
  p.rotrSL = b;
  const y = (l, c, r) => l << 64 - r | c >>> r - 32;
  p.rotrBH = y;
  const H = (l, c, r) => l >>> r - 32 | c << 64 - r;
  p.rotrBL = H;
  const P = (l, c) => c;
  p.rotr32H = P;
  const j = (l, c) => l;
  p.rotr32L = j;
  const C = (l, c, r) => l << r | c >>> 32 - r;
  p.rotlSH = C;
  const O = (l, c, r) => c << r | l >>> 32 - r;
  p.rotlSL = O;
  const m = (l, c, r) => c << r - 32 | l >>> 64 - r;
  p.rotlBH = m;
  const S = (l, c, r) => l << r - 32 | c >>> 64 - r;
  p.rotlBL = S;
  function k(l, c, r, f) {
    const w = (c >>> 0) + (f >>> 0);
    return { h: l + r + (w / 2 ** 32 | 0) | 0, l: w | 0 };
  }
  const _ = (l, c, r) => (l >>> 0) + (c >>> 0) + (r >>> 0);
  p.add3L = _;
  const B = (l, c, r, f) => c + r + f + (l / 2 ** 32 | 0) | 0;
  p.add3H = B;
  const d = (l, c, r, f) => (l >>> 0) + (c >>> 0) + (r >>> 0) + (f >>> 0);
  p.add4L = d;
  const h = (l, c, r, f, w) => c + r + f + w + (l / 2 ** 32 | 0) | 0;
  p.add4H = h;
  const g = (l, c, r, f, w) => (l >>> 0) + (c >>> 0) + (r >>> 0) + (f >>> 0) + (w >>> 0);
  p.add5L = g;
  const T = (l, c, r, f, w, L) => c + r + f + w + L + (l / 2 ** 32 | 0) | 0;
  p.add5H = T;
  const A = {
    fromBig: n,
    split: a,
    toBig: o,
    shrSH: u,
    shrSL: i,
    rotrSH: s,
    rotrSL: b,
    rotrBH: y,
    rotrBL: H,
    rotr32H: P,
    rotr32L: j,
    rotlSH: C,
    rotlSL: O,
    rotlBH: m,
    rotlBL: S,
    add: k,
    add3L: _,
    add3H: B,
    add4L: d,
    add4H: h,
    add5H: T,
    add5L: g
  };
  return p.default = A, p;
}
var Y = {}, V = {}, it;
function Bt() {
  return it || (it = 1, Object.defineProperty(V, "__esModule", { value: !0 }), V.crypto = void 0, V.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), V;
}
var at;
function xt() {
  return at || (at = 1, function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = a, t.byteSwap32 = H, t.bytesToHex = j, t.hexToBytes = m, t.asyncLoop = k, t.utf8ToBytes = _, t.toBytes = B, t.concatBytes = d, t.checkOpts = g, t.wrapConstructor = T, t.wrapConstructorWithOpts = A, t.wrapXOFConstructorWithOpts = l, t.randomBytes = c;
    const e = /* @__PURE__ */ Bt(), n = /* @__PURE__ */ yt();
    function a(r) {
      return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
    }
    const o = (r) => new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    t.u8 = o;
    const u = (r) => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
    t.u32 = u;
    const i = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength);
    t.createView = i;
    const s = (r, f) => r << 32 - f | r >>> f;
    t.rotr = s;
    const b = (r, f) => r << f | r >>> 32 - f >>> 0;
    t.rotl = b, t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const y = (r) => r << 24 & 4278190080 | r << 8 & 16711680 | r >>> 8 & 65280 | r >>> 24 & 255;
    t.byteSwap = y, t.byteSwapIfBE = t.isLE ? (r) => r : (r) => (0, t.byteSwap)(r);
    function H(r) {
      for (let f = 0; f < r.length; f++)
        r[f] = (0, t.byteSwap)(r[f]);
    }
    const P = /* @__PURE__ */ Array.from({ length: 256 }, (r, f) => f.toString(16).padStart(2, "0"));
    function j(r) {
      (0, n.abytes)(r);
      let f = "";
      for (let w = 0; w < r.length; w++)
        f += P[r[w]];
      return f;
    }
    const C = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function O(r) {
      if (r >= C._0 && r <= C._9)
        return r - C._0;
      if (r >= C.A && r <= C.F)
        return r - (C.A - 10);
      if (r >= C.a && r <= C.f)
        return r - (C.a - 10);
    }
    function m(r) {
      if (typeof r != "string")
        throw new Error("hex string expected, got " + typeof r);
      const f = r.length, w = f / 2;
      if (f % 2)
        throw new Error("hex string expected, got unpadded hex of length " + f);
      const L = new Uint8Array(w);
      for (let x = 0, v = 0; x < w; x++, v += 2) {
        const F = O(r.charCodeAt(v)), rt = O(r.charCodeAt(v + 1));
        if (F === void 0 || rt === void 0) {
          const pt = r[v] + r[v + 1];
          throw new Error('hex string expected, got non-hex character "' + pt + '" at index ' + v);
        }
        L[x] = F * 16 + rt;
      }
      return L;
    }
    const S = async () => {
    };
    t.nextTick = S;
    async function k(r, f, w) {
      let L = Date.now();
      for (let x = 0; x < r; x++) {
        w(x);
        const v = Date.now() - L;
        v >= 0 && v < f || (await (0, t.nextTick)(), L += v);
      }
    }
    function _(r) {
      if (typeof r != "string")
        throw new Error("utf8ToBytes expected string, got " + typeof r);
      return new Uint8Array(new TextEncoder().encode(r));
    }
    function B(r) {
      return typeof r == "string" && (r = _(r)), (0, n.abytes)(r), r;
    }
    function d(...r) {
      let f = 0;
      for (let L = 0; L < r.length; L++) {
        const x = r[L];
        (0, n.abytes)(x), f += x.length;
      }
      const w = new Uint8Array(f);
      for (let L = 0, x = 0; L < r.length; L++) {
        const v = r[L];
        w.set(v, x), x += v.length;
      }
      return w;
    }
    class h {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    }
    t.Hash = h;
    function g(r, f) {
      if (f !== void 0 && {}.toString.call(f) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      return Object.assign(r, f);
    }
    function T(r) {
      const f = (L) => r().update(B(L)).digest(), w = r();
      return f.outputLen = w.outputLen, f.blockLen = w.blockLen, f.create = () => r(), f;
    }
    function A(r) {
      const f = (L, x) => r(x).update(B(L)).digest(), w = r({});
      return f.outputLen = w.outputLen, f.blockLen = w.blockLen, f.create = (L) => r(L), f;
    }
    function l(r) {
      const f = (L, x) => r(x).update(B(L)).digest(), w = r({});
      return f.outputLen = w.outputLen, f.blockLen = w.blockLen, f.create = (L) => r(L), f;
    }
    function c(r = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function")
        return e.crypto.getRandomValues(new Uint8Array(r));
      if (e.crypto && typeof e.crypto.randomBytes == "function")
        return e.crypto.randomBytes(r);
      throw new Error("crypto.getRandomValues must be defined");
    }
  }(Y)), Y;
}
var ct;
function Ct() {
  if (ct) return E;
  ct = 1, Object.defineProperty(E, "__esModule", { value: !0 }), E.shake256 = E.shake128 = E.keccak_512 = E.keccak_384 = E.keccak_256 = E.keccak_224 = E.sha3_512 = E.sha3_384 = E.sha3_256 = E.sha3_224 = E.Keccak = void 0, E.keccakP = S;
  const t = /* @__PURE__ */ yt(), e = /* @__PURE__ */ Et(), n = /* @__PURE__ */ xt(), a = [], o = [], u = [], i = /* @__PURE__ */ BigInt(0), s = /* @__PURE__ */ BigInt(1), b = /* @__PURE__ */ BigInt(2), y = /* @__PURE__ */ BigInt(7), H = /* @__PURE__ */ BigInt(256), P = /* @__PURE__ */ BigInt(113);
  for (let d = 0, h = s, g = 1, T = 0; d < 24; d++) {
    [g, T] = [T, (2 * g + 3 * T) % 5], a.push(2 * (5 * T + g)), o.push((d + 1) * (d + 2) / 2 % 64);
    let A = i;
    for (let l = 0; l < 7; l++)
      h = (h << s ^ (h >> y) * P) % H, h & b && (A ^= s << (s << /* @__PURE__ */ BigInt(l)) - s);
    u.push(A);
  }
  const [j, C] = /* @__PURE__ */ (0, e.split)(u, !0), O = (d, h, g) => g > 32 ? (0, e.rotlBH)(d, h, g) : (0, e.rotlSH)(d, h, g), m = (d, h, g) => g > 32 ? (0, e.rotlBL)(d, h, g) : (0, e.rotlSL)(d, h, g);
  function S(d, h = 24) {
    const g = new Uint32Array(10);
    for (let T = 24 - h; T < 24; T++) {
      for (let c = 0; c < 10; c++)
        g[c] = d[c] ^ d[c + 10] ^ d[c + 20] ^ d[c + 30] ^ d[c + 40];
      for (let c = 0; c < 10; c += 2) {
        const r = (c + 8) % 10, f = (c + 2) % 10, w = g[f], L = g[f + 1], x = O(w, L, 1) ^ g[r], v = m(w, L, 1) ^ g[r + 1];
        for (let F = 0; F < 50; F += 10)
          d[c + F] ^= x, d[c + F + 1] ^= v;
      }
      let A = d[2], l = d[3];
      for (let c = 0; c < 24; c++) {
        const r = o[c], f = O(A, l, r), w = m(A, l, r), L = a[c];
        A = d[L], l = d[L + 1], d[L] = f, d[L + 1] = w;
      }
      for (let c = 0; c < 50; c += 10) {
        for (let r = 0; r < 10; r++)
          g[r] = d[c + r];
        for (let r = 0; r < 10; r++)
          d[c + r] ^= ~g[(r + 2) % 10] & g[(r + 4) % 10];
      }
      d[0] ^= j[T], d[1] ^= C[T];
    }
    g.fill(0);
  }
  class k extends n.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(h, g, T, A = !1, l = 24) {
      if (super(), this.blockLen = h, this.suffix = g, this.outputLen = T, this.enableXOF = A, this.rounds = l, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, t.anumber)(T), 0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200), this.state32 = (0, n.u32)(this.state);
    }
    keccak() {
      n.isLE || (0, n.byteSwap32)(this.state32), S(this.state32, this.rounds), n.isLE || (0, n.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(h) {
      (0, t.aexists)(this);
      const { blockLen: g, state: T } = this;
      h = (0, n.toBytes)(h);
      const A = h.length;
      for (let l = 0; l < A; ) {
        const c = Math.min(g - this.pos, A - l);
        for (let r = 0; r < c; r++)
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
        const c = Math.min(T - this.posOut, l - A);
        h.set(g.subarray(this.posOut, this.posOut + c), A), this.posOut += c, A += c;
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
      const { blockLen: g, suffix: T, outputLen: A, rounds: l, enableXOF: c } = this;
      return h || (h = new k(g, T, A, c, l)), h.state32.set(this.state32), h.pos = this.pos, h.posOut = this.posOut, h.finished = this.finished, h.rounds = l, h.suffix = T, h.outputLen = A, h.enableXOF = c, h.destroyed = this.destroyed, h;
    }
  }
  E.Keccak = k;
  const _ = (d, h, g) => (0, n.wrapConstructor)(() => new k(h, d, g));
  E.sha3_224 = _(6, 144, 224 / 8), E.sha3_256 = _(6, 136, 256 / 8), E.sha3_384 = _(6, 104, 384 / 8), E.sha3_512 = _(6, 72, 512 / 8), E.keccak_224 = _(1, 144, 224 / 8), E.keccak_256 = _(1, 136, 256 / 8), E.keccak_384 = _(1, 104, 384 / 8), E.keccak_512 = _(1, 72, 512 / 8);
  const B = (d, h, g) => (0, n.wrapXOFConstructorWithOpts)((T = {}) => new k(h, d, T.dkLen === void 0 ? g : T.dkLen, !0));
  return E.shake128 = B(31, 168, 128 / 8), E.shake256 = B(31, 136, 256 / 8), E;
}
var ut;
function Ht() {
  if (ut) return U;
  ut = 1;
  const { sha3_512: t } = /* @__PURE__ */ Ct(), e = 24, n = 32, a = (O = 4, m = Math.random) => {
    let S = "";
    for (; S.length < O; )
      S = S + Math.floor(m() * 36).toString(36);
    return S;
  };
  function o(O) {
    let m = 8n, S = 0n;
    for (const k of O.values()) {
      const _ = BigInt(k);
      S = (S << m) + _;
    }
    return S;
  }
  const u = (O = "") => o(t(O)).toString(36).slice(1), i = Array.from(
    { length: 26 },
    (O, m) => String.fromCharCode(m + 97)
  ), s = (O) => i[Math.floor(O() * i.length)], b = ({
    globalObj: O = typeof nt < "u" ? nt : typeof window < "u" ? window : {},
    random: m = Math.random
  } = {}) => {
    const S = Object.keys(O).toString(), k = S.length ? S + a(n, m) : a(n, m);
    return u(k).substring(0, n);
  }, y = (O) => () => O++, H = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: O = Math.random,
    counter: m = y(Math.floor(O() * H)),
    length: S = e,
    fingerprint: k = b({ random: O })
  } = {}) => function() {
    const B = s(O), d = Date.now().toString(36), h = m().toString(36), g = a(S, O), T = `${d + g + h + k}`;
    return `${B + u(T).substring(1, S)}`;
  }, j = P(), C = (O, { minLength: m = 2, maxLength: S = n } = {}) => {
    const k = O.length, _ = /^[0-9a-z]+$/;
    try {
      if (typeof O == "string" && k >= m && k <= S && _.test(O))
        return !0;
    } finally {
    }
    return !1;
  };
  return U.getConstants = () => ({ defaultLength: e, bigLength: n }), U.init = P, U.createId = j, U.bufToBigInt = o, U.createCounter = y, U.createFingerprint = b, U.isCuid = C, U;
}
var lt;
function vt() {
  if (lt) return N;
  lt = 1;
  const { createId: t, init: e, getConstants: n, isCuid: a } = Ht();
  return N.createId = t, N.init = e, N.getConstants = n, N.isCuid = a, N;
}
var Pt = vt();
const Z = /* @__PURE__ */ new Map(), I = {
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
    lastModified: a,
    storage: o = "memory"
  }, u, i = -1) {
    if (u == null) return;
    const s = J(t, e, n), b = i !== -1 ? Date.now() + i : void 0, y = `frontCache::${s}`, H = {
      data: u,
      expireAt: b,
      lastModified: a ?? Date.now()
    };
    switch (o) {
      case "memory":
        Z.set(y, H);
        break;
      case "uni":
        uni.setStorageSync(y, JSON.stringify(H));
        break;
      case "session":
        sessionStorage.setItem(y, JSON.stringify(H));
        break;
      case "local":
        localStorage.setItem(y, JSON.stringify(H));
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
    storage: a = "memory"
  }) {
    const u = `frontCache::${J(t, e, n)}`;
    let i = null, s;
    switch (a) {
      case "memory":
        i = Z.get(u);
        break;
      case "uni":
        s = uni.getStorageSync(u), i = s ? JSON.parse(s) : null;
        break;
      case "session":
        s = sessionStorage.getItem(u), i = s ? JSON.parse(s) : null;
        break;
      case "local":
        s = localStorage.getItem(u), i = s ? JSON.parse(s) : null;
        break;
    }
    return i && (!i.expireAt || i.expireAt > Date.now()) ? i.data : (I.remove({ key: t, params: e, storage: a }), null);
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
    storage: a = "memory"
  }) {
    const u = `frontCache::${J(t, e, n)}`;
    switch (a) {
      case "memory":
        Z.delete(u);
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
}, Rt = (t) => t ? Array.isArray(t) ? t.length === 0 : typeof t == "object" ? Object.keys(t).length === 0 : !1 : !0, jt = Pt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), $ = {}, Ut = 2e3, Mt = (t, e, n) => {
  if (Object.assign(t, n, t), typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(n.header)), t.header || (t.header = {}), t.header.reqId = jt(), e.authorize) {
    const a = St();
    if (!a) {
      const o = "错误，接口需要授权才能访问！";
      return console.error(o), K.error({ title: o }), !1;
    }
    if (typeof e.authorize == "boolean")
      t.header.authorization = "Bearer " + a;
    else if (typeof e.authorize == "function" && e.authorize(t, e, a) === !1)
      return !1;
  }
  if (e.before) {
    const a = e.before.call(e, t);
    if (a !== void 0)
      return a;
  }
  t.loadingText && K.loading({
    title: t.loadingText.toString()
  });
}, tt = (t, e, n, a) => {
  if (n.statusCode >= 200 && n.statusCode < 400) {
    const o = n.data;
    if (o.status === D.SUCCESS) {
      const u = o.data;
      t.method === "POST" && e.fieldMap && u && dt(e.fieldMap, u), e.after && e.after.call(e, o, t), a.Result = o;
    } else
      console.error(o), a.Error = {
        status: o.status,
        errno: o.errno,
        msg: o.msg || "请求发生错误"
      }, a.Result = o;
  } else {
    let o;
    const u = n.statusCode;
    switch (u) {
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
    o = `${u}: ${o}`;
    const i = {
      status: D.ERROR,
      errno: u + 1e3,
      msg: o
    };
    a.Error = i;
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
  var a, o;
  e.Error ? (K.hide(), console.error(z(t), e.Error), t.hideErrorToast || K.error({ title: e.Error.msg }), e.Result = {
    status: D.ERROR,
    errno: e.Error.errno,
    msg: e.Error.msg,
    timestamp: (a = e.Result) == null ? void 0 : a.timestamp,
    data: (o = e.Result) == null ? void 0 : o.data
  }) : K.hide(1e3), n(e.Result);
}, q = (t, e, n) => {
  const a = z(Ft);
  if (Mt(t, e, a) === !1) return Promise.resolve(null);
  if (t.method === "POST") {
    const u = {
      ...e,
      key: e.url,
      params: t.data,
      fields: ["Query", "Option.SelectFields"]
    };
    if (e.cacheTime) {
      const y = I.get(u);
      if (y)
        return Promise.resolve({
          status: D.SUCCESS,
          data: y
        });
    }
    const i = J(t.url, t.data, [
      "Query",
      "Option.SelectFields"
    ]), s = $[i];
    if (s)
      if (s.expire && s.expire < Date.now())
        delete $[i];
      else return s.expire ? (K.hide(1e3), Promise.resolve(s.result)) : new Promise((y) => {
        s.sharedPromise.then(y);
      });
    e.loading = !0;
    const b = n(t, e).then((y) => {
      if (typeof y == "boolean") return y;
      (y == null ? void 0 : y.status) === D.SUCCESS && !Rt(y == null ? void 0 : y.data) && e.cacheTime && I.set(u, y.data, e.cacheTime);
      let H = $[i];
      return H.result = y, H.expire = Date.now() + Ut, $[i] = H, y;
    }).finally(() => {
      e.loading = !1;
    });
    return $[i] = {
      sharedPromise: b
    }, b;
  } else
    return n(t, e);
}, W = (t, e) => {
  const n = {
    Result: null
  };
  return new Promise((a) => {
    uni.request({
      ...t,
      success: (o) => {
        tt(t, e, o, n);
      },
      fail: (o) => {
        et(o, n);
      },
      complete: () => {
        gt(e, n, a);
      }
    });
  });
}, Jt = (t) => {
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
}, Wt = (t, e) => {
  const n = M(t);
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
}, Gt = (t, e) => {
  const n = M(t);
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
}, Qt = (t, e) => {
  const n = M(t);
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
  }, { header: a, ...o } = t;
  return new Promise((u) => {
    wt.request({
      ...o,
      headers: a
    }).then((i) => {
      tt(
        t,
        e,
        {
          statusCode: i.status,
          data: i.data
        },
        n
      );
    }).catch((i) => {
      var s;
      i.response && i.response.status && i.response.status > 200 && i.response.status < 600 ? tt(
        t,
        e,
        {
          statusCode: i.response.status,
          data: (s = i.response) == null ? void 0 : s.data
        },
        n
      ) : et(i, n);
    }).finally(() => {
      gt(e, n, u);
    });
  });
}, Yt = (t) => {
  const e = M(t);
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
}, Zt = (t, e) => {
  const n = M(t);
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
}, It = (t, e) => {
  const n = M(t);
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
}, te = (t, e) => {
  const n = M(t);
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
}, qt = {
  url: "",
  header: { "Content-Type": "application/json" }
}, Ft = (t) => {
  Object.assign(qt, t);
};
export {
  kt as API_HOST,
  $t as ICON_HOST,
  D as ResStatus,
  Vt as SERVER_HOST,
  z as deepClone,
  dt as fieldMapping,
  St as getToken,
  Ft as globalRequestOption,
  M as hostUrl,
  It as httpDelete,
  Yt as httpGet,
  te as httpPost,
  Zt as httpPut,
  Xt as isJSON,
  Tt as parseFieldTemplate,
  zt as setToken,
  K as toast,
  Gt as uniDelete,
  Jt as uniGet,
  Qt as uniPost,
  Wt as uniPut
};
