var pt = Object.defineProperty;
var bt = (t, e, s) => e in t ? pt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var et = (t, e, s) => bt(t, typeof e != "symbol" ? e + "" : e, s);
import K from "vue-m-message";
import mt from "axios";
var J = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(J || {});
const nt = {
  SITEHOST_API: ""
}, Mt = {}, qt = {}, ht = /\$\{([\w\.\[\]0-9]+)\}/g;
function wt(t, e) {
  return t.replace(ht, (s, f) => {
    var l;
    const i = f.split(".");
    let a = e;
    for (const r of i) {
      if (r.includes("[") && r.includes("]")) {
        const y = r.split("[")[0], k = parseInt(r.split("[")[1].split("]")[0]);
        a = (l = a[y]) == null ? void 0 : l[k];
      } else
        a = a == null ? void 0 : a[r];
      if (a === void 0)
        return s;
    }
    return String(a);
  });
}
const St = (t, e) => {
  const s = Array.isArray(e), f = s ? e : [e];
  return f.forEach((i) => {
    if (i && typeof i == "object")
      for (const a in t) {
        const l = t[a];
        if (typeof l == "string" && ht.test(l)) {
          const r = wt(
            l,
            i
          );
          i[a] = r;
        } else
          i[a] = i[l];
      }
  }), s ? e : f[0];
}, Ft = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
class kt {
  constructor() {
    et(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "none",
      mask: !1,
      position: "center"
    });
  }
  showToast(e, s, f, i) {
    const a = typeof s == "string" ? s : s.title || f;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: i || this.defaultOptions.duration,
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
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : K.closeAll();
  }
  show(e) {
    const { title: s, icon: f, mask: i, duration: a, position: l } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: s,
        icon: f === "warning" ? "error" : f,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: a,
        position: l,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else {
      let r = "info";
      switch (this.hide(), f) {
        case "success":
          K.success(s, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: i,
            type: r,
            icon: r,
            closeOnClick: !0,
            pauseOnFocusLoss: !0,
            pauseOnHover: !0
          });
          break;
        case "error":
          K.error(s, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: i,
            type: r,
            icon: r
          });
          break;
        case "loading":
          K.loading(s, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: i,
            type: r,
            icon: r,
            duration: -1
            // 不自动关闭
          });
          break;
        default:
          K.info(s, {
            ...e,
            title: "",
            position: "top-center",
            hasMask: i,
            type: r,
            icon: r
          });
          break;
      }
    }
  }
}
const $ = new kt(), M = (t) => {
  let { api: e, url: s } = t;
  if (!s.startsWith("http://") && !s.startsWith("https://") && e)
    if (nt[e]) s = nt[e] + s;
    else
      return $.error("未查询到接口域名：" + e), !1;
  return s;
}, Tt = (t, e) => t << e | t >>> 32 - e, Ot = (t) => {
  const e = [];
  for (let b = 0; b < t.length; b++)
    e.push(t.charCodeAt(b));
  const s = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(s >>> 24 & 255), e.push(s >>> 16 & 255), e.push(s >>> 8 & 255), e.push(s & 255);
  let f = 1732584193, i = 4023233417, a = 2562383102, l = 271733878;
  const r = (b, S, w) => b & S | ~b & w, y = (b, S, w) => b & w | S & ~w, k = (b, S, w) => b ^ S ^ w, v = (b, S, w) => S ^ (b | ~w), P = [
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
  ], R = [
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
  let x = 0;
  for (; x < e.length; ) {
    const b = new Array(16).fill(0);
    for (let d = 0; d < 16; d++)
      b[d] = e[x + d] || 0;
    let S = f, w = i, _ = a, E = l;
    for (let d = 0; d < 64; d++) {
      let u, g, T;
      d < 16 ? (u = r(w, _, E), g = d) : d < 32 ? (u = y(w, _, E), g = (5 * d + 1) % 16) : d < 48 ? (u = k(w, _, E), g = (3 * d + 5) % 16) : (u = v(w, _, E), g = 7 * d % 16), T = E, E = _, _ = w, w = w + Tt(S + u + P[d] + b[g] | 0, R[d]), S = T;
    }
    f = f + S | 0, i = i + w | 0, a = a + _ | 0, l = l + E | 0, x += 16;
  }
  return [f, i, a, l].map((b) => {
    const S = b & 255, w = b >>> 8 & 255, _ = b >>> 16 & 255;
    return [b >>> 24 & 255, _, w, S];
  }).flat().map((b) => b.toString(16).padStart(2, "0")).join("");
}, Lt = (t) => Ot(t), V = (t, e, s) => {
  if (!e) return t;
  let f = JSON.parse(JSON.stringify(e));
  s && s.length > 0 && (s[0].startsWith("-") ? s.forEach((a) => {
    if (a.indexOf(".") > -1) {
      const l = a.split(".");
      let r = f;
      for (let y = 0; y < l.length && (y === l.length - 1 && delete r[l[y]], typeof r[l[y]] == "object" && !Array.isArray(r[l[y]])); y++)
        r = r[l[y]];
    } else delete f[a];
  }) : (f = {}, s.forEach((a) => {
    if (a.indexOf(".") > -1) {
      const l = a.split(".");
      let r = e, y = f;
      for (let k = 0; k < l.length; k++)
        if (k === l.length - 1)
          y[l[k]] = r[l[k]];
        else {
          if (r[l[k]] === null || r[l[k]] === void 0)
            break;
          if (y[l[k]] === void 0)
            if (typeof r[l[k]] != "object" || Array.isArray(r[l[k]])) {
              y[l[k]] = r[l[k]];
              break;
            } else y[l[k]] = {};
          y = y[l[k]], r = r[l[k]];
        }
    } else f[a] = e[a];
  })));
  const i = JSON.stringify(f);
  return `${t}-` + Lt(i);
};
var st = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, N = {}, U = {}, B = {}, j = {}, rt;
function ft() {
  if (rt) return j;
  rt = 1, Object.defineProperty(j, "__esModule", { value: !0 }), j.anumber = t, j.number = t, j.abytes = s, j.bytes = s, j.ahash = f, j.aexists = i, j.aoutput = a;
  function t(r) {
    if (!Number.isSafeInteger(r) || r < 0)
      throw new Error("positive integer expected, got " + r);
  }
  function e(r) {
    return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
  }
  function s(r, ...y) {
    if (!e(r))
      throw new Error("Uint8Array expected");
    if (y.length > 0 && !y.includes(r.length))
      throw new Error("Uint8Array expected of length " + y + ", got length=" + r.length);
  }
  function f(r) {
    if (typeof r != "function" || typeof r.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    t(r.outputLen), t(r.blockLen);
  }
  function i(r, y = !0) {
    if (r.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (y && r.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function a(r, y) {
    s(r);
    const k = y.outputLen;
    if (r.length < k)
      throw new Error("digestInto() expects output buffer of length at least " + k);
  }
  const l = {
    number: t,
    bytes: s,
    hash: f,
    exists: i,
    output: a
  };
  return j.default = l, j;
}
var p = {}, ot;
function _t() {
  if (ot) return p;
  ot = 1, Object.defineProperty(p, "__esModule", { value: !0 }), p.add5L = p.add5H = p.add4H = p.add4L = p.add3H = p.add3L = p.rotlBL = p.rotlBH = p.rotlSL = p.rotlSH = p.rotr32L = p.rotr32H = p.rotrBL = p.rotrBH = p.rotrSL = p.rotrSH = p.shrSL = p.shrSH = p.toBig = void 0, p.fromBig = s, p.split = f, p.add = w;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function s(c, o = !1) {
    return o ? { h: Number(c & t), l: Number(c >> e & t) } : { h: Number(c >> e & t) | 0, l: Number(c & t) | 0 };
  }
  function f(c, o = !1) {
    let n = new Uint32Array(c.length), h = new Uint32Array(c.length);
    for (let m = 0; m < c.length; m++) {
      const { h: O, l: H } = s(c[m], o);
      [n[m], h[m]] = [O, H];
    }
    return [n, h];
  }
  const i = (c, o) => BigInt(c >>> 0) << e | BigInt(o >>> 0);
  p.toBig = i;
  const a = (c, o, n) => c >>> n;
  p.shrSH = a;
  const l = (c, o, n) => c << 32 - n | o >>> n;
  p.shrSL = l;
  const r = (c, o, n) => c >>> n | o << 32 - n;
  p.rotrSH = r;
  const y = (c, o, n) => c << 32 - n | o >>> n;
  p.rotrSL = y;
  const k = (c, o, n) => c << 64 - n | o >>> n - 32;
  p.rotrBH = k;
  const v = (c, o, n) => c >>> n - 32 | o << 64 - n;
  p.rotrBL = v;
  const P = (c, o) => o;
  p.rotr32H = P;
  const R = (c, o) => c;
  p.rotr32L = R;
  const x = (c, o, n) => c << n | o >>> 32 - n;
  p.rotlSH = x;
  const L = (c, o, n) => o << n | c >>> 32 - n;
  p.rotlSL = L;
  const b = (c, o, n) => o << n - 32 | c >>> 64 - n;
  p.rotlBH = b;
  const S = (c, o, n) => c << n - 32 | o >>> 64 - n;
  p.rotlBL = S;
  function w(c, o, n, h) {
    const m = (o >>> 0) + (h >>> 0);
    return { h: c + n + (m / 2 ** 32 | 0) | 0, l: m | 0 };
  }
  const _ = (c, o, n) => (c >>> 0) + (o >>> 0) + (n >>> 0);
  p.add3L = _;
  const E = (c, o, n, h) => o + n + h + (c / 2 ** 32 | 0) | 0;
  p.add3H = E;
  const d = (c, o, n, h) => (c >>> 0) + (o >>> 0) + (n >>> 0) + (h >>> 0);
  p.add4L = d;
  const u = (c, o, n, h, m) => o + n + h + m + (c / 2 ** 32 | 0) | 0;
  p.add4H = u;
  const g = (c, o, n, h, m) => (c >>> 0) + (o >>> 0) + (n >>> 0) + (h >>> 0) + (m >>> 0);
  p.add5L = g;
  const T = (c, o, n, h, m, O) => o + n + h + m + O + (c / 2 ** 32 | 0) | 0;
  p.add5H = T;
  const A = {
    fromBig: s,
    split: f,
    toBig: i,
    shrSH: a,
    shrSL: l,
    rotrSH: r,
    rotrSL: y,
    rotrBH: k,
    rotrBL: v,
    rotr32H: P,
    rotr32L: R,
    rotlSH: x,
    rotlSL: L,
    rotlBH: b,
    rotlBL: S,
    add: w,
    add3L: _,
    add3H: E,
    add4L: d,
    add4H: u,
    add5H: T,
    add5L: g
  };
  return p.default = A, p;
}
var G = {}, D = {}, it;
function At() {
  return it || (it = 1, Object.defineProperty(D, "__esModule", { value: !0 }), D.crypto = void 0, D.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), D;
}
var at;
function Bt() {
  return at || (at = 1, function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Hash = t.nextTick = t.byteSwapIfBE = t.byteSwap = t.isLE = t.rotl = t.rotr = t.createView = t.u32 = t.u8 = void 0, t.isBytes = f, t.byteSwap32 = v, t.bytesToHex = R, t.hexToBytes = b, t.asyncLoop = w, t.utf8ToBytes = _, t.toBytes = E, t.concatBytes = d, t.checkOpts = g, t.wrapConstructor = T, t.wrapConstructorWithOpts = A, t.wrapXOFConstructorWithOpts = c, t.randomBytes = o;
    const e = /* @__PURE__ */ At(), s = /* @__PURE__ */ ft();
    function f(n) {
      return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
    }
    const i = (n) => new Uint8Array(n.buffer, n.byteOffset, n.byteLength);
    t.u8 = i;
    const a = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4));
    t.u32 = a;
    const l = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength);
    t.createView = l;
    const r = (n, h) => n << 32 - h | n >>> h;
    t.rotr = r;
    const y = (n, h) => n << h | n >>> 32 - h >>> 0;
    t.rotl = y, t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const k = (n) => n << 24 & 4278190080 | n << 8 & 16711680 | n >>> 8 & 65280 | n >>> 24 & 255;
    t.byteSwap = k, t.byteSwapIfBE = t.isLE ? (n) => n : (n) => (0, t.byteSwap)(n);
    function v(n) {
      for (let h = 0; h < n.length; h++)
        n[h] = (0, t.byteSwap)(n[h]);
    }
    const P = /* @__PURE__ */ Array.from({ length: 256 }, (n, h) => h.toString(16).padStart(2, "0"));
    function R(n) {
      (0, s.abytes)(n);
      let h = "";
      for (let m = 0; m < n.length; m++)
        h += P[n[m]];
      return h;
    }
    const x = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function L(n) {
      if (n >= x._0 && n <= x._9)
        return n - x._0;
      if (n >= x.A && n <= x.F)
        return n - (x.A - 10);
      if (n >= x.a && n <= x.f)
        return n - (x.a - 10);
    }
    function b(n) {
      if (typeof n != "string")
        throw new Error("hex string expected, got " + typeof n);
      const h = n.length, m = h / 2;
      if (h % 2)
        throw new Error("hex string expected, got unpadded hex of length " + h);
      const O = new Uint8Array(m);
      for (let H = 0, C = 0; H < m; H++, C += 2) {
        const F = L(n.charCodeAt(C)), tt = L(n.charCodeAt(C + 1));
        if (F === void 0 || tt === void 0) {
          const gt = n[C] + n[C + 1];
          throw new Error('hex string expected, got non-hex character "' + gt + '" at index ' + C);
        }
        O[H] = F * 16 + tt;
      }
      return O;
    }
    const S = async () => {
    };
    t.nextTick = S;
    async function w(n, h, m) {
      let O = Date.now();
      for (let H = 0; H < n; H++) {
        m(H);
        const C = Date.now() - O;
        C >= 0 && C < h || (await (0, t.nextTick)(), O += C);
      }
    }
    function _(n) {
      if (typeof n != "string")
        throw new Error("utf8ToBytes expected string, got " + typeof n);
      return new Uint8Array(new TextEncoder().encode(n));
    }
    function E(n) {
      return typeof n == "string" && (n = _(n)), (0, s.abytes)(n), n;
    }
    function d(...n) {
      let h = 0;
      for (let O = 0; O < n.length; O++) {
        const H = n[O];
        (0, s.abytes)(H), h += H.length;
      }
      const m = new Uint8Array(h);
      for (let O = 0, H = 0; O < n.length; O++) {
        const C = n[O];
        m.set(C, H), H += C.length;
      }
      return m;
    }
    class u {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    }
    t.Hash = u;
    function g(n, h) {
      if (h !== void 0 && {}.toString.call(h) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      return Object.assign(n, h);
    }
    function T(n) {
      const h = (O) => n().update(E(O)).digest(), m = n();
      return h.outputLen = m.outputLen, h.blockLen = m.blockLen, h.create = () => n(), h;
    }
    function A(n) {
      const h = (O, H) => n(H).update(E(O)).digest(), m = n({});
      return h.outputLen = m.outputLen, h.blockLen = m.blockLen, h.create = (O) => n(O), h;
    }
    function c(n) {
      const h = (O, H) => n(H).update(E(O)).digest(), m = n({});
      return h.outputLen = m.outputLen, h.blockLen = m.blockLen, h.create = (O) => n(O), h;
    }
    function o(n = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function")
        return e.crypto.getRandomValues(new Uint8Array(n));
      if (e.crypto && typeof e.crypto.randomBytes == "function")
        return e.crypto.randomBytes(n);
      throw new Error("crypto.getRandomValues must be defined");
    }
  }(G)), G;
}
var ct;
function Et() {
  if (ct) return B;
  ct = 1, Object.defineProperty(B, "__esModule", { value: !0 }), B.shake256 = B.shake128 = B.keccak_512 = B.keccak_384 = B.keccak_256 = B.keccak_224 = B.sha3_512 = B.sha3_384 = B.sha3_256 = B.sha3_224 = B.Keccak = void 0, B.keccakP = S;
  const t = /* @__PURE__ */ ft(), e = /* @__PURE__ */ _t(), s = /* @__PURE__ */ Bt(), f = [], i = [], a = [], l = /* @__PURE__ */ BigInt(0), r = /* @__PURE__ */ BigInt(1), y = /* @__PURE__ */ BigInt(2), k = /* @__PURE__ */ BigInt(7), v = /* @__PURE__ */ BigInt(256), P = /* @__PURE__ */ BigInt(113);
  for (let d = 0, u = r, g = 1, T = 0; d < 24; d++) {
    [g, T] = [T, (2 * g + 3 * T) % 5], f.push(2 * (5 * T + g)), i.push((d + 1) * (d + 2) / 2 % 64);
    let A = l;
    for (let c = 0; c < 7; c++)
      u = (u << r ^ (u >> k) * P) % v, u & y && (A ^= r << (r << /* @__PURE__ */ BigInt(c)) - r);
    a.push(A);
  }
  const [R, x] = /* @__PURE__ */ (0, e.split)(a, !0), L = (d, u, g) => g > 32 ? (0, e.rotlBH)(d, u, g) : (0, e.rotlSH)(d, u, g), b = (d, u, g) => g > 32 ? (0, e.rotlBL)(d, u, g) : (0, e.rotlSL)(d, u, g);
  function S(d, u = 24) {
    const g = new Uint32Array(10);
    for (let T = 24 - u; T < 24; T++) {
      for (let o = 0; o < 10; o++)
        g[o] = d[o] ^ d[o + 10] ^ d[o + 20] ^ d[o + 30] ^ d[o + 40];
      for (let o = 0; o < 10; o += 2) {
        const n = (o + 8) % 10, h = (o + 2) % 10, m = g[h], O = g[h + 1], H = L(m, O, 1) ^ g[n], C = b(m, O, 1) ^ g[n + 1];
        for (let F = 0; F < 50; F += 10)
          d[o + F] ^= H, d[o + F + 1] ^= C;
      }
      let A = d[2], c = d[3];
      for (let o = 0; o < 24; o++) {
        const n = i[o], h = L(A, c, n), m = b(A, c, n), O = f[o];
        A = d[O], c = d[O + 1], d[O] = h, d[O + 1] = m;
      }
      for (let o = 0; o < 50; o += 10) {
        for (let n = 0; n < 10; n++)
          g[n] = d[o + n];
        for (let n = 0; n < 10; n++)
          d[o + n] ^= ~g[(n + 2) % 10] & g[(n + 4) % 10];
      }
      d[0] ^= R[T], d[1] ^= x[T];
    }
    g.fill(0);
  }
  class w extends s.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(u, g, T, A = !1, c = 24) {
      if (super(), this.blockLen = u, this.suffix = g, this.outputLen = T, this.enableXOF = A, this.rounds = c, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, t.anumber)(T), 0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200), this.state32 = (0, s.u32)(this.state);
    }
    keccak() {
      s.isLE || (0, s.byteSwap32)(this.state32), S(this.state32, this.rounds), s.isLE || (0, s.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(u) {
      (0, t.aexists)(this);
      const { blockLen: g, state: T } = this;
      u = (0, s.toBytes)(u);
      const A = u.length;
      for (let c = 0; c < A; ) {
        const o = Math.min(g - this.pos, A - c);
        for (let n = 0; n < o; n++)
          T[this.pos++] ^= u[c++];
        this.pos === g && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: u, suffix: g, pos: T, blockLen: A } = this;
      u[T] ^= g, g & 128 && T === A - 1 && this.keccak(), u[A - 1] ^= 128, this.keccak();
    }
    writeInto(u) {
      (0, t.aexists)(this, !1), (0, t.abytes)(u), this.finish();
      const g = this.state, { blockLen: T } = this;
      for (let A = 0, c = u.length; A < c; ) {
        this.posOut >= T && this.keccak();
        const o = Math.min(T - this.posOut, c - A);
        u.set(g.subarray(this.posOut, this.posOut + o), A), this.posOut += o, A += o;
      }
      return u;
    }
    xofInto(u) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(u);
    }
    xof(u) {
      return (0, t.anumber)(u), this.xofInto(new Uint8Array(u));
    }
    digestInto(u) {
      if ((0, t.aoutput)(u, this), this.finished)
        throw new Error("digest() was already called");
      return this.writeInto(u), this.destroy(), u;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = !0, this.state.fill(0);
    }
    _cloneInto(u) {
      const { blockLen: g, suffix: T, outputLen: A, rounds: c, enableXOF: o } = this;
      return u || (u = new w(g, T, A, o, c)), u.state32.set(this.state32), u.pos = this.pos, u.posOut = this.posOut, u.finished = this.finished, u.rounds = c, u.suffix = T, u.outputLen = A, u.enableXOF = o, u.destroyed = this.destroyed, u;
    }
  }
  B.Keccak = w;
  const _ = (d, u, g) => (0, s.wrapConstructor)(() => new w(u, d, g));
  B.sha3_224 = _(6, 144, 224 / 8), B.sha3_256 = _(6, 136, 256 / 8), B.sha3_384 = _(6, 104, 384 / 8), B.sha3_512 = _(6, 72, 512 / 8), B.keccak_224 = _(1, 144, 224 / 8), B.keccak_256 = _(1, 136, 256 / 8), B.keccak_384 = _(1, 104, 384 / 8), B.keccak_512 = _(1, 72, 512 / 8);
  const E = (d, u, g) => (0, s.wrapXOFConstructorWithOpts)((T = {}) => new w(u, d, T.dkLen === void 0 ? g : T.dkLen, !0));
  return B.shake128 = E(31, 168, 128 / 8), B.shake256 = E(31, 136, 256 / 8), B;
}
var ut;
function Ht() {
  if (ut) return U;
  ut = 1;
  const { sha3_512: t } = /* @__PURE__ */ Et(), e = 24, s = 32, f = (L = 4, b = Math.random) => {
    let S = "";
    for (; S.length < L; )
      S = S + Math.floor(b() * 36).toString(36);
    return S;
  };
  function i(L) {
    let b = 8n, S = 0n;
    for (const w of L.values()) {
      const _ = BigInt(w);
      S = (S << b) + _;
    }
    return S;
  }
  const a = (L = "") => i(t(L)).toString(36).slice(1), l = Array.from(
    { length: 26 },
    (L, b) => String.fromCharCode(b + 97)
  ), r = (L) => l[Math.floor(L() * l.length)], y = ({
    globalObj: L = typeof st < "u" ? st : typeof window < "u" ? window : {},
    random: b = Math.random
  } = {}) => {
    const S = Object.keys(L).toString(), w = S.length ? S + f(s, b) : f(s, b);
    return a(w).substring(0, s);
  }, k = (L) => () => L++, v = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: L = Math.random,
    counter: b = k(Math.floor(L() * v)),
    length: S = e,
    fingerprint: w = y({ random: L })
  } = {}) => function() {
    const E = r(L), d = Date.now().toString(36), u = b().toString(36), g = f(S, L), T = `${d + g + u + w}`;
    return `${E + a(T).substring(1, S)}`;
  }, R = P(), x = (L, { minLength: b = 2, maxLength: S = s } = {}) => {
    const w = L.length, _ = /^[0-9a-z]+$/;
    try {
      if (typeof L == "string" && w >= b && w <= S && _.test(L))
        return !0;
    } finally {
    }
    return !1;
  };
  return U.getConstants = () => ({ defaultLength: e, bigLength: s }), U.init = P, U.createId = R, U.bufToBigInt = i, U.createCounter = k, U.createFingerprint = y, U.isCuid = x, U;
}
var lt;
function xt() {
  if (lt) return N;
  lt = 1;
  const { createId: t, init: e, getConstants: s, isCuid: f } = Ht();
  return N.createId = t, N.init = e, N.getConstants = s, N.isCuid = f, N;
}
var vt = xt();
const I = /* @__PURE__ */ new Map(), z = {
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
    fields: s,
    lastModified: f,
    storage: i = "memory"
  }, a, l = -1) {
    if (a == null) return;
    const r = V(t, e, s), y = l !== -1 ? Date.now() + l : void 0, k = `frontCache::${r}`, v = {
      data: a,
      expireAt: y,
      lastModified: f ?? Date.now()
    };
    switch (i) {
      case "memory":
        I.set(k, v);
        break;
      case "uni":
        uni.setStorageSync(k, JSON.stringify(v));
        break;
      case "session":
        sessionStorage.setItem(k, JSON.stringify(v));
        break;
      case "local":
        localStorage.setItem(k, JSON.stringify(v));
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
    fields: s,
    storage: f = "memory"
  }) {
    const a = `frontCache::${V(t, e, s)}`;
    let l = null, r;
    switch (f) {
      case "memory":
        l = I.get(a);
        break;
      case "uni":
        r = uni.getStorageSync(a), l = r ? JSON.parse(r) : null;
        break;
      case "session":
        r = sessionStorage.getItem(a), l = r ? JSON.parse(r) : null;
        break;
      case "local":
        r = localStorage.getItem(a), l = r ? JSON.parse(r) : null;
        break;
    }
    return l && (!l.expireAt || l.expireAt > Date.now()) ? l.data : (z.remove({ key: t, params: e, storage: f }), null);
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
    fields: s,
    storage: f = "memory"
  }) {
    const a = `frontCache::${V(t, e, s)}`;
    switch (f) {
      case "memory":
        I.delete(a);
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
}, Ct = vt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), Q = {}, Pt = (t, e, s) => {
  if (typeof e.header == "object" ? t.header = e.header : typeof e.header == "function" && (t.header = e.header(s.header)), t.header || (t.header = {}), t.header.reqId = Ct(), Object.assign(s, t), e.before) {
    const f = e.before.call(e, s);
    if (f !== void 0)
      return f;
  }
  t.loadingText && $.loading({
    title: t.loadingText.toString()
  });
}, Y = (t, e, s, f) => {
  if (s.statusCode >= 200 && s.statusCode < 400) {
    const i = s.data;
    if (i.status === J.SUCCESS) {
      const a = i.data;
      t.method === "POST" && e.fieldMap && a && St(e.fieldMap, a), e.after && e.after.call(e, i, t), f.Result = i;
    } else
      console.error(i), f.Error = {
        status: i.status,
        errno: i.errno,
        msg: i.msg || "请求发生错误"
      }, f.Result = i;
  } else {
    let i;
    const a = s.statusCode;
    switch (a) {
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
    i = `${a}: ${i}`;
    const l = {
      status: J.ERROR,
      errno: a + 1e3,
      msg: i
    };
    f.Error = l;
  }
}, Z = (t, e) => {
  console.error(t);
  const s = {
    status: J.ERROR,
    errno: 1e3,
    msg: "网络错误：" + t.toString()
  };
  e.Error = s;
}, dt = (t, e, s) => {
  e.Error ? (console.error(JSON.parse(JSON.stringify(t)), e.Error), t.hideErrorToast || $.error({ title: e.Error.msg })) : $.hide(1e3), s(e.Result);
}, q = (t, e, s) => {
  const f = JSON.parse(JSON.stringify(yt));
  if (Pt(t, e, f) === !1) return Promise.resolve(null);
  if (t.method === "POST") {
    if (e.cacheTime) {
      const y = z.get({
        ...e,
        key: e.url,
        params: e.params,
        fields: ["Query", "Option.SelectFields"]
      });
      if (y) return Promise.resolve(y);
    }
    const a = V(t.url, e.params, [
      "Query",
      "Option.SelectFields"
    ]), l = Q[a];
    if (l)
      return new Promise((y) => {
        l.then(y);
      });
    const r = s(t, e).then((y) => (typeof y == "boolean" || (y == null ? void 0 : y.status) === J.SUCCESS && e.cacheTime && z.set(
      {
        ...e,
        key: e.url,
        params: e.params,
        fields: ["Query", "Option.SelectFields"]
      },
      y == null ? void 0 : y.data,
      e.cacheTime
    ), y)).finally(() => {
      delete Q[a];
    });
    return Q[a] = r, r;
  } else
    return s(t, e);
}, W = (t, e) => {
  const s = {
    Result: null
  };
  return new Promise((f) => {
    uni.request({
      ...t,
      success: (i) => {
        Y(t, e, i, s);
      },
      fail: (i) => {
        Z(i, s);
      },
      complete: () => {
        dt(e, s, f);
      }
    });
  });
}, Nt = (t) => {
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
}, Kt = (t, e) => {
  const s = M(t);
  return s === !1 ? Promise.resolve(null) : q(
    {
      url: s,
      dataType: "json",
      method: "PUT",
      data: e,
      timeout: t.timeout,
      loadingText: "正在存储数据……"
    },
    t,
    W
  );
}, Dt = (t, e) => {
  const s = M(t);
  return s === !1 ? Promise.resolve(null) : q(
    {
      url: s,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "正在删除数据……"
    },
    t,
    W
  );
}, Jt = (t, e) => {
  const s = M(t);
  return s === !1 ? Promise.resolve(null) : q(
    {
      url: s,
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
  const s = {
    Result: null
  };
  return new Promise((f) => {
    mt.request({
      ...t
    }).then((i) => {
      Y(
        t,
        e,
        {
          statusCode: i.status,
          data: i.data
        },
        s
      );
    }).catch((i) => {
      var a;
      i.response && i.response.status && i.response.status > 200 && i.response.status < 600 ? Y(
        t,
        e,
        {
          statusCode: i.response.status,
          data: (a = i.response) == null ? void 0 : a.data
        },
        s
      ) : Z(i, s);
    }).finally(() => {
      dt(e, s, f);
    });
  });
}, Vt = (t) => {
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
}, $t = (t, e) => {
  const s = M(t);
  return s === !1 ? Promise.resolve(null) : q(
    {
      url: s,
      dataType: "json",
      method: "PUT",
      data: e,
      timeout: t.timeout,
      loadingText: "正在存储数据……"
    },
    t,
    X
  );
}, Wt = (t, e) => {
  const s = M(t);
  return s === !1 ? Promise.resolve(null) : q(
    {
      url: s,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "正在删除数据……"
    },
    t,
    X
  );
}, Xt = (t, e) => {
  const s = M(t);
  return s === !1 ? Promise.resolve(null) : q(
    {
      url: s,
      dataType: "json",
      method: "POST",
      data: e,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "数据加载中……"
    },
    t,
    X
  );
}, yt = {
  url: "",
  header: { "Content-Type": "application/json" }
}, Gt = (t) => {
  Object.assign(yt, t);
};
export {
  nt as API_HOST,
  qt as ICON_HOST,
  J as ResStatus,
  Mt as SERVER_HOST,
  St as fieldMapping,
  Gt as globalRequestOption,
  M as hostUrl,
  Wt as httpDelete,
  Vt as httpGet,
  Xt as httpPost,
  $t as httpPut,
  Ft as isJSON,
  yt as requestConfig,
  $ as toast,
  Dt as uniDelete,
  Nt as uniGet,
  Jt as uniPost,
  Kt as uniPut
};
