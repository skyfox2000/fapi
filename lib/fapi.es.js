var bt = Object.defineProperty;
var mt = (t, e, n) => e in t ? bt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var rt = (t, e, n) => mt(t, typeof e != "symbol" ? e + "" : e, n);
import V from "vue-m-message";
import wt from "axios";
var N = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(N || {});
const kt = {
  SITEHOST_API: ""
}, Vt = {}, $t = {};
let ht = "";
const St = () => ht, zt = (t) => {
  ht = t;
}, X = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const n = [];
    for (let c = 0; c < t.length; c++)
      n[c] = X(t[c]);
    return n;
  }
  const e = {};
  for (const n in t)
    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = X(t[n]));
  return e;
}, ft = /\$\{([\w\.\[\]0-9]+)\}/g, Tt = (t, e) => t.replace(ft, (n, c) => {
  var o;
  const i = c.split(".");
  let u = e;
  for (const s of i) {
    if (s.includes("[") && s.includes("]")) {
      const m = s.split("[")[0], y = parseInt(s.split("[")[1].split("]")[0]);
      u = (o = u[m]) == null ? void 0 : o[y];
    } else
      u = u == null ? void 0 : u[s];
    if (u === void 0)
      return n;
  }
  return String(u);
}), dt = (t, e) => {
  const n = Array.isArray(e), c = n ? e : [e];
  return c.forEach((i) => {
    if (i && typeof i == "object") {
      for (const u in t) {
        const o = t[u];
        if (typeof o == "string" && ft.test(o)) {
          const s = Tt(
            o,
            i
          );
          i[u] = s;
        } else i[o] !== void 0 && (i[u] = i[o]);
      }
      i.children && Array.isArray(i.children) && (i.children = dt(t, i.children));
    }
  }), n ? e : c[0];
}, Xt = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
class Lt {
  constructor() {
    rt(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "none",
      mask: !1,
      position: "center"
    });
  }
  showToast(e, n, c, i) {
    const u = typeof n == "string" ? n : n.title || c;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: i || this.defaultOptions.duration,
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
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : V.closeAll();
  }
  show(e) {
    const { title: n, icon: c, mask: i, duration: u, position: o } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: n,
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
          V.success(n, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: i,
            type: s,
            icon: s,
            closeOnClick: !0,
            pauseOnFocusLoss: !0,
            pauseOnHover: !0
          });
          break;
        case "error":
          V.error(n, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: i,
            type: s,
            icon: s
          });
          break;
        case "loading":
          V.loading(n, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: i,
            type: s,
            icon: s,
            duration: -1
            // 不自动关闭
          });
          break;
        default:
          V.info(n, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: i,
            type: s,
            icon: s
          });
          break;
      }
    }
  }
}
const K = new Lt(), M = (t) => {
  let { api: e, url: n, authorize: c } = t;
  if (n.startsWith("http://") || n.startsWith("https://") || !e)
    return n;
  const i = kt[e];
  if (!i)
    return K.error("未查询到接口域名：" + e), !1;
  if (typeof i == "string")
    return i + n;
  if (typeof i == "object") {
    const { host: u, authorize: o } = i;
    return (c === void 0 || c === !1) && (t.authorize = o), n = u + n, n;
  }
  return n;
}, _t = (t, e) => t << e | t >>> 32 - e, Ot = (t) => {
  const e = [];
  for (let b = 0; b < t.length; b++)
    e.push(t.charCodeAt(b));
  const n = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(n >>> 24 & 255), e.push(n >>> 16 & 255), e.push(n >>> 8 & 255), e.push(n & 255);
  let c = 1732584193, i = 4023233417, u = 2562383102, o = 271733878;
  const s = (b, S, k) => b & S | ~b & k, m = (b, S, k) => b & k | S & ~k, y = (b, S, k) => b ^ S ^ k, H = (b, S, k) => S ^ (b | ~k), P = [
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
    let S = c, k = i, O = u, E = o;
    for (let d = 0; d < 64; d++) {
      let h, g, T;
      d < 16 ? (h = s(k, O, E), g = d) : d < 32 ? (h = m(k, O, E), g = (5 * d + 1) % 16) : d < 48 ? (h = y(k, O, E), g = (3 * d + 5) % 16) : (h = H(k, O, E), g = 7 * d % 16), T = E, E = O, O = k, k = k + _t(S + h + P[d] + b[g] | 0, j[d]), S = T;
    }
    c = c + S | 0, i = i + k | 0, u = u + O | 0, o = o + E | 0, C += 16;
  }
  return [c, i, u, o].map((b) => {
    const S = b & 255, k = b >>> 8 & 255, O = b >>> 16 & 255;
    return [b >>> 24 & 255, O, k, S];
  }).flat().map((b) => b.toString(16).padStart(2, "0")).join("");
}, At = (t) => Ot(t), J = (t, e, n) => {
  if (!e) return t;
  let c = X(e);
  n && n.length > 0 && (n[0].startsWith("-") ? n.forEach((u) => {
    if (u.indexOf(".") > -1) {
      const o = u.split(".");
      let s = c;
      for (let m = 0; m < o.length && (m === o.length - 1 && delete s[o[m]], typeof s[o[m]] == "object" && !Array.isArray(s[o[m]])); m++)
        s = s[o[m]];
    } else delete c[u];
  }) : (c = {}, n.forEach((u) => {
    if (u.indexOf(".") > -1) {
      const o = u.split(".");
      let s = e, m = c;
      for (let y = 0; y < o.length; y++)
        if (y === o.length - 1)
          m[o[y]] = s[o[y]];
        else {
          if (s[o[y]] === null || s[o[y]] === void 0)
            break;
          if (m[o[y]] === void 0)
            if (typeof s[o[y]] != "object" || Array.isArray(s[o[y]])) {
              m[o[y]] = s[o[y]];
              break;
            } else m[o[y]] = {};
          m = m[o[y]], s = s[o[y]];
        }
    } else c[u] = e[u];
  })));
  const i = JSON.stringify(c);
  return `${t}-` + At(i);
};
var nt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, D = {}, U = {}, B = {}, R = {}, st;
function yt() {
  if (st) return R;
  st = 1, Object.defineProperty(R, "__esModule", { value: !0 }), R.anumber = t, R.number = t, R.abytes = n, R.bytes = n, R.ahash = c, R.aexists = i, R.aoutput = u;
  function t(s) {
    if (!Number.isSafeInteger(s) || s < 0)
      throw new Error("positive integer expected, got " + s);
  }
  function e(s) {
    return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
  }
  function n(s, ...m) {
    if (!e(s))
      throw new Error("Uint8Array expected");
    if (m.length > 0 && !m.includes(s.length))
      throw new Error("Uint8Array expected of length " + m + ", got length=" + s.length);
  }
  function c(s) {
    if (typeof s != "function" || typeof s.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    t(s.outputLen), t(s.blockLen);
  }
  function i(s, m = !0) {
    if (s.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (m && s.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function u(s, m) {
    n(s);
    const y = m.outputLen;
    if (s.length < y)
      throw new Error("digestInto() expects output buffer of length at least " + y);
  }
  const o = {
    number: t,
    bytes: n,
    hash: c,
    exists: i,
    output: u
  };
  return R.default = o, R;
}
var p = {}, ot;
function Bt() {
  if (ot) return p;
  ot = 1, Object.defineProperty(p, "__esModule", { value: !0 }), p.add5L = p.add5H = p.add4H = p.add4L = p.add3H = p.add3L = p.rotlBL = p.rotlBH = p.rotlSL = p.rotlSH = p.rotr32L = p.rotr32H = p.rotrBL = p.rotrBH = p.rotrSL = p.rotrSH = p.shrSL = p.shrSH = p.toBig = void 0, p.fromBig = n, p.split = c, p.add = k;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function n(l, a = !1) {
    return a ? { h: Number(l & t), l: Number(l >> e & t) } : { h: Number(l >> e & t) | 0, l: Number(l & t) | 0 };
  }
  function c(l, a = !1) {
    let r = new Uint32Array(l.length), f = new Uint32Array(l.length);
    for (let w = 0; w < l.length; w++) {
      const { h: L, l: x } = n(l[w], a);
      [r[w], f[w]] = [L, x];
    }
    return [r, f];
  }
  const i = (l, a) => BigInt(l >>> 0) << e | BigInt(a >>> 0);
  p.toBig = i;
  const u = (l, a, r) => l >>> r;
  p.shrSH = u;
  const o = (l, a, r) => l << 32 - r | a >>> r;
  p.shrSL = o;
  const s = (l, a, r) => l >>> r | a << 32 - r;
  p.rotrSH = s;
  const m = (l, a, r) => l << 32 - r | a >>> r;
  p.rotrSL = m;
  const y = (l, a, r) => l << 64 - r | a >>> r - 32;
  p.rotrBH = y;
  const H = (l, a, r) => l >>> r - 32 | a << 64 - r;
  p.rotrBL = H;
  const P = (l, a) => a;
  p.rotr32H = P;
  const j = (l, a) => l;
  p.rotr32L = j;
  const C = (l, a, r) => l << r | a >>> 32 - r;
  p.rotlSH = C;
  const _ = (l, a, r) => a << r | l >>> 32 - r;
  p.rotlSL = _;
  const b = (l, a, r) => a << r - 32 | l >>> 64 - r;
  p.rotlBH = b;
  const S = (l, a, r) => l << r - 32 | a >>> 64 - r;
  p.rotlBL = S;
  function k(l, a, r, f) {
    const w = (a >>> 0) + (f >>> 0);
    return { h: l + r + (w / 2 ** 32 | 0) | 0, l: w | 0 };
  }
  const O = (l, a, r) => (l >>> 0) + (a >>> 0) + (r >>> 0);
  p.add3L = O;
  const E = (l, a, r, f) => a + r + f + (l / 2 ** 32 | 0) | 0;
  p.add3H = E;
  const d = (l, a, r, f) => (l >>> 0) + (a >>> 0) + (r >>> 0) + (f >>> 0);
  p.add4L = d;
  const h = (l, a, r, f, w) => a + r + f + w + (l / 2 ** 32 | 0) | 0;
  p.add4H = h;
  const g = (l, a, r, f, w) => (l >>> 0) + (a >>> 0) + (r >>> 0) + (f >>> 0) + (w >>> 0);
  p.add5L = g;
  const T = (l, a, r, f, w, L) => a + r + f + w + L + (l / 2 ** 32 | 0) | 0;
  p.add5H = T;
  const A = {
    fromBig: n,
    split: c,
    toBig: i,
    shrSH: u,
    shrSL: o,
    rotrSH: s,
    rotrSL: m,
    rotrBH: y,
    rotrBL: H,
    rotr32H: P,
    rotr32L: j,
    rotlSH: C,
    rotlSL: _,
    rotlBH: b,
    rotlBL: S,
    add: k,
    add3L: O,
    add3H: E,
    add4L: d,
    add4H: h,
    add5H: T,
    add5L: g
  };
  return p.default = A, p;
}
var Q = {}, $ = {}, it;
function Et() {
  return it || (it = 1, Object.defineProperty($, "__esModule", { value: !0 }), $.crypto = void 0, $.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), $;
}
var at;
function xt() {
  return at || (at = 1, function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = c, t.byteSwap32 = H, t.bytesToHex = j, t.hexToBytes = b, t.asyncLoop = k, t.utf8ToBytes = O, t.toBytes = E, t.concatBytes = d, t.checkOpts = g, t.wrapConstructor = T, t.wrapConstructorWithOpts = A, t.wrapXOFConstructorWithOpts = l, t.randomBytes = a;
    const e = /* @__PURE__ */ Et(), n = /* @__PURE__ */ yt();
    function c(r) {
      return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
    }
    const i = (r) => new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    t.u8 = i;
    const u = (r) => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
    t.u32 = u;
    const o = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength);
    t.createView = o;
    const s = (r, f) => r << 32 - f | r >>> f;
    t.rotr = s;
    const m = (r, f) => r << f | r >>> 32 - f >>> 0;
    t.rotl = m, t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
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
      const f = r.length, w = f / 2;
      if (f % 2)
        throw new Error("hex string expected, got unpadded hex of length " + f);
      const L = new Uint8Array(w);
      for (let x = 0, v = 0; x < w; x++, v += 2) {
        const F = _(r.charCodeAt(v)), et = _(r.charCodeAt(v + 1));
        if (F === void 0 || et === void 0) {
          const pt = r[v] + r[v + 1];
          throw new Error('hex string expected, got non-hex character "' + pt + '" at index ' + v);
        }
        L[x] = F * 16 + et;
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
    function O(r) {
      if (typeof r != "string")
        throw new Error("utf8ToBytes expected string, got " + typeof r);
      return new Uint8Array(new TextEncoder().encode(r));
    }
    function E(r) {
      return typeof r == "string" && (r = O(r)), (0, n.abytes)(r), r;
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
      const f = (L) => r().update(E(L)).digest(), w = r();
      return f.outputLen = w.outputLen, f.blockLen = w.blockLen, f.create = () => r(), f;
    }
    function A(r) {
      const f = (L, x) => r(x).update(E(L)).digest(), w = r({});
      return f.outputLen = w.outputLen, f.blockLen = w.blockLen, f.create = (L) => r(L), f;
    }
    function l(r) {
      const f = (L, x) => r(x).update(E(L)).digest(), w = r({});
      return f.outputLen = w.outputLen, f.blockLen = w.blockLen, f.create = (L) => r(L), f;
    }
    function a(r = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function")
        return e.crypto.getRandomValues(new Uint8Array(r));
      if (e.crypto && typeof e.crypto.randomBytes == "function")
        return e.crypto.randomBytes(r);
      throw new Error("crypto.getRandomValues must be defined");
    }
  }(Q)), Q;
}
var ct;
function Ct() {
  if (ct) return B;
  ct = 1, Object.defineProperty(B, "__esModule", { value: !0 }), B.shake256 = B.shake128 = B.keccak_512 = B.keccak_384 = B.keccak_256 = B.keccak_224 = B.sha3_512 = B.sha3_384 = B.sha3_256 = B.sha3_224 = B.Keccak = void 0, B.keccakP = S;
  const t = /* @__PURE__ */ yt(), e = /* @__PURE__ */ Bt(), n = /* @__PURE__ */ xt(), c = [], i = [], u = [], o = /* @__PURE__ */ BigInt(0), s = /* @__PURE__ */ BigInt(1), m = /* @__PURE__ */ BigInt(2), y = /* @__PURE__ */ BigInt(7), H = /* @__PURE__ */ BigInt(256), P = /* @__PURE__ */ BigInt(113);
  for (let d = 0, h = s, g = 1, T = 0; d < 24; d++) {
    [g, T] = [T, (2 * g + 3 * T) % 5], c.push(2 * (5 * T + g)), i.push((d + 1) * (d + 2) / 2 % 64);
    let A = o;
    for (let l = 0; l < 7; l++)
      h = (h << s ^ (h >> y) * P) % H, h & m && (A ^= s << (s << /* @__PURE__ */ BigInt(l)) - s);
    u.push(A);
  }
  const [j, C] = /* @__PURE__ */ (0, e.split)(u, !0), _ = (d, h, g) => g > 32 ? (0, e.rotlBH)(d, h, g) : (0, e.rotlSH)(d, h, g), b = (d, h, g) => g > 32 ? (0, e.rotlBL)(d, h, g) : (0, e.rotlSL)(d, h, g);
  function S(d, h = 24) {
    const g = new Uint32Array(10);
    for (let T = 24 - h; T < 24; T++) {
      for (let a = 0; a < 10; a++)
        g[a] = d[a] ^ d[a + 10] ^ d[a + 20] ^ d[a + 30] ^ d[a + 40];
      for (let a = 0; a < 10; a += 2) {
        const r = (a + 8) % 10, f = (a + 2) % 10, w = g[f], L = g[f + 1], x = _(w, L, 1) ^ g[r], v = b(w, L, 1) ^ g[r + 1];
        for (let F = 0; F < 50; F += 10)
          d[a + F] ^= x, d[a + F + 1] ^= v;
      }
      let A = d[2], l = d[3];
      for (let a = 0; a < 24; a++) {
        const r = i[a], f = _(A, l, r), w = b(A, l, r), L = c[a];
        A = d[L], l = d[L + 1], d[L] = f, d[L + 1] = w;
      }
      for (let a = 0; a < 50; a += 10) {
        for (let r = 0; r < 10; r++)
          g[r] = d[a + r];
        for (let r = 0; r < 10; r++)
          d[a + r] ^= ~g[(r + 2) % 10] & g[(r + 4) % 10];
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
        const a = Math.min(g - this.pos, A - l);
        for (let r = 0; r < a; r++)
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
      return h || (h = new k(g, T, A, a, l)), h.state32.set(this.state32), h.pos = this.pos, h.posOut = this.posOut, h.finished = this.finished, h.rounds = l, h.suffix = T, h.outputLen = A, h.enableXOF = a, h.destroyed = this.destroyed, h;
    }
  }
  B.Keccak = k;
  const O = (d, h, g) => (0, n.wrapConstructor)(() => new k(h, d, g));
  B.sha3_224 = O(6, 144, 224 / 8), B.sha3_256 = O(6, 136, 256 / 8), B.sha3_384 = O(6, 104, 384 / 8), B.sha3_512 = O(6, 72, 512 / 8), B.keccak_224 = O(1, 144, 224 / 8), B.keccak_256 = O(1, 136, 256 / 8), B.keccak_384 = O(1, 104, 384 / 8), B.keccak_512 = O(1, 72, 512 / 8);
  const E = (d, h, g) => (0, n.wrapXOFConstructorWithOpts)((T = {}) => new k(h, d, T.dkLen === void 0 ? g : T.dkLen, !0));
  return B.shake128 = E(31, 168, 128 / 8), B.shake256 = E(31, 136, 256 / 8), B;
}
var ut;
function Ht() {
  if (ut) return U;
  ut = 1;
  const { sha3_512: t } = /* @__PURE__ */ Ct(), e = 24, n = 32, c = (_ = 4, b = Math.random) => {
    let S = "";
    for (; S.length < _; )
      S = S + Math.floor(b() * 36).toString(36);
    return S;
  };
  function i(_) {
    let b = 8n, S = 0n;
    for (const k of _.values()) {
      const O = BigInt(k);
      S = (S << b) + O;
    }
    return S;
  }
  const u = (_ = "") => i(t(_)).toString(36).slice(1), o = Array.from(
    { length: 26 },
    (_, b) => String.fromCharCode(b + 97)
  ), s = (_) => o[Math.floor(_() * o.length)], m = ({
    globalObj: _ = typeof nt < "u" ? nt : typeof window < "u" ? window : {},
    random: b = Math.random
  } = {}) => {
    const S = Object.keys(_).toString(), k = S.length ? S + c(n, b) : c(n, b);
    return u(k).substring(0, n);
  }, y = (_) => () => _++, H = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: _ = Math.random,
    counter: b = y(Math.floor(_() * H)),
    length: S = e,
    fingerprint: k = m({ random: _ })
  } = {}) => function() {
    const E = s(_), d = Date.now().toString(36), h = b().toString(36), g = c(S, _), T = `${d + g + h + k}`;
    return `${E + u(T).substring(1, S)}`;
  }, j = P(), C = (_, { minLength: b = 2, maxLength: S = n } = {}) => {
    const k = _.length, O = /^[0-9a-z]+$/;
    try {
      if (typeof _ == "string" && k >= b && k <= S && O.test(_))
        return !0;
    } finally {
    }
    return !1;
  };
  return U.getConstants = () => ({ defaultLength: e, bigLength: n }), U.init = P, U.createId = j, U.bufToBigInt = i, U.createCounter = y, U.createFingerprint = m, U.isCuid = C, U;
}
var lt;
function vt() {
  if (lt) return D;
  lt = 1;
  const { createId: t, init: e, getConstants: n, isCuid: c } = Ht();
  return D.createId = t, D.init = e, D.getConstants = n, D.isCuid = c, D;
}
var Pt = vt();
const Y = /* @__PURE__ */ new Map(), Z = {
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
    lastModified: c,
    storage: i = "memory"
  }, u, o = -1) {
    if (u == null) return;
    const s = J(t, e, n), m = o !== -1 ? Date.now() + o : void 0, y = `frontCache::${s}`, H = {
      data: u,
      expireAt: m,
      lastModified: c ?? Date.now()
    };
    switch (i) {
      case "memory":
        Y.set(y, H);
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
    storage: c = "memory"
  }) {
    const u = `frontCache::${J(t, e, n)}`;
    let o = null, s;
    switch (c) {
      case "memory":
        o = Y.get(u);
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
    fields: n,
    storage: c = "memory"
  }) {
    const u = `frontCache::${J(t, e, n)}`;
    switch (c) {
      case "memory":
        Y.delete(u);
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
}), z = {}, Ut = 2e3, Mt = (t, e, n) => {
  if (Object.assign(t, n, t), typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(n.header)), t.header || (t.header = {}), t.header.reqId = jt(), e.authorize) {
    const c = St();
    if (!c) {
      const i = "错误，接口需要授权才能访问！";
      return console.error(i), K.error({ title: i }), !1;
    }
    if (typeof e.authorize == "boolean")
      t.header.authorization = "Bearer " + c;
    else if (typeof e.authorize == "function" && e.authorize(t, e, c) === !1)
      return !1;
  }
  if (e.before) {
    const c = e.before.call(e, t);
    if (c !== void 0)
      return c;
  }
  t.loadingText && K.loading({
    title: t.loadingText.toString()
  });
}, I = (t, e, n, c) => {
  if (n.statusCode >= 200 && n.statusCode < 400) {
    const i = n.data;
    if (i.status === N.SUCCESS) {
      const u = i.data;
      t.method === "POST" && e.fieldMap && u && dt(e.fieldMap, u), e.after && e.after.call(e, i, t), c.Result = i;
    } else
      console.error(i), c.Error = {
        status: i.status,
        errno: i.errno,
        msg: i.msg || "请求发生错误"
      }, c.Result = i;
  } else {
    let i;
    const u = n.statusCode;
    switch (u) {
      case 401:
        i = "未授权或授权过期";
        break;
      case 403:
        i = "无权访问";
        break;
      case 404:
        i = "请求地址错误";
        break;
      case 500:
        i = "服务器异常";
        break;
      default:
        i = "其它请求错误";
        break;
    }
    i = `${u}: ${i}`;
    const o = {
      status: N.ERROR,
      errno: u + 1e3,
      msg: i
    };
    c.Error = o;
  }
}, tt = (t, e) => {
  console.error(t);
  const n = {
    status: N.ERROR,
    errno: 1e3,
    msg: "网络错误：" + t.toString()
  };
  e.Error = n;
}, gt = (t, e, n) => {
  e.Error ? (K.hide(), console.error(X(t), e.Error), t.hideErrorToast || K.error({ title: e.Error.msg })) : K.hide(1e3), n(e.Result);
}, q = (t, e, n) => {
  const c = X(Ft);
  if (Mt(t, e, c) === !1) return Promise.resolve(null);
  if (t.method === "POST") {
    const u = {
      ...e,
      key: e.url,
      params: t.data,
      fields: ["Query", "Option.SelectFields"]
    };
    if (e.cacheTime) {
      const y = Z.get(u);
      if (y)
        return Promise.resolve({
          status: N.SUCCESS,
          data: y
        });
    }
    const o = J(t.url, t.data, [
      "Query",
      "Option.SelectFields"
    ]), s = z[o];
    if (s)
      if (s.expire && s.expire < Date.now())
        delete z[o];
      else return s.expire ? (K.hide(1e3), Promise.resolve(s.result)) : new Promise((y) => {
        s.sharedPromise.then(y);
      });
    e.loading = !0;
    const m = n(t, e).then((y) => {
      if (typeof y == "boolean") return y;
      (y == null ? void 0 : y.status) === N.SUCCESS && !Rt(y == null ? void 0 : y.data) && e.cacheTime && Z.set(u, y.data, e.cacheTime);
      let H = z[o];
      return H.result = y, H.expire = Date.now() + Ut, z[o] = H, y;
    }).finally(() => {
      e.loading = !1;
    });
    return z[o] = {
      sharedPromise: m
    }, m;
  } else
    return n(t, e);
}, W = (t, e) => {
  const n = {
    Result: null
  };
  return new Promise((c) => {
    uni.request({
      ...t,
      success: (i) => {
        I(t, e, i, n);
      },
      fail: (i) => {
        tt(i, n);
      },
      complete: () => {
        gt(e, n, c);
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
  }, { header: c, ...i } = t;
  return new Promise((u) => {
    wt.request({
      ...i,
      headers: c
    }).then((o) => {
      I(
        t,
        e,
        {
          statusCode: o.status,
          data: o.data
        },
        n
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
        n
      ) : tt(o, n);
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
  N as ResStatus,
  Vt as SERVER_HOST,
  X as deepClone,
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
