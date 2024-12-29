var Ie = Object.defineProperty;
var Je = (e, t, o) => t in e ? Ie(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o;
var he = (e, t, o) => Je(e, typeof t != "symbol" ? t + "" : t, o);
import { defineComponent as Ue, createVNode as I, reactive as We, onBeforeMount as Xe, onMounted as Ge, ref as Qe, isVNode as Ye, render as pe, resolveComponent as Ze, openBlock as U, createBlock as ge, Transition as xe, withCtx as et, createElementBlock as D, normalizeClass as re, normalizeStyle as tt, createElementVNode as J, createCommentVNode as $, renderSlot as me, createTextVNode as ye, toDisplayString as be, Fragment as we } from "vue";
import nt from "axios";
var Z = /* @__PURE__ */ ((e) => (e.SUCCESS = "success", e.ERROR = "error", e))(Z || {});
const rt = {
  SITEHOST_API: ""
}, Yt = {}, z = (e) => {
  let { api: t, url: o } = e;
  return !o.startsWith("http://") && !o.startsWith("https://") && (o = rt[t] + o), o;
};
var ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function st(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var x = { exports: {} }, ot = x.exports, Se;
function it() {
  return Se || (Se = 1, function(e) {
    (function(t) {
      function o(n, d) {
        var i = (n & 65535) + (d & 65535), w = (n >> 16) + (d >> 16) + (i >> 16);
        return w << 16 | i & 65535;
      }
      function b(n, d) {
        return n << d | n >>> 32 - d;
      }
      function m(n, d, i, w, p, h) {
        return o(b(o(o(d, n), o(w, h)), p), i);
      }
      function g(n, d, i, w, p, h, r) {
        return m(d & i | ~d & w, n, d, p, h, r);
      }
      function f(n, d, i, w, p, h, r) {
        return m(d & w | i & ~w, n, d, p, h, r);
      }
      function l(n, d, i, w, p, h, r) {
        return m(d ^ i ^ w, n, d, p, h, r);
      }
      function y(n, d, i, w, p, h, r) {
        return m(i ^ (d | ~w), n, d, p, h, r);
      }
      function v(n, d) {
        n[d >> 5] |= 128 << d % 32, n[(d + 64 >>> 9 << 4) + 14] = d;
        var i, w, p, h, r, s = 1732584193, a = -271733879, c = -1732584194, u = 271733878;
        for (i = 0; i < n.length; i += 16)
          w = s, p = a, h = c, r = u, s = g(s, a, c, u, n[i], 7, -680876936), u = g(u, s, a, c, n[i + 1], 12, -389564586), c = g(c, u, s, a, n[i + 2], 17, 606105819), a = g(a, c, u, s, n[i + 3], 22, -1044525330), s = g(s, a, c, u, n[i + 4], 7, -176418897), u = g(u, s, a, c, n[i + 5], 12, 1200080426), c = g(c, u, s, a, n[i + 6], 17, -1473231341), a = g(a, c, u, s, n[i + 7], 22, -45705983), s = g(s, a, c, u, n[i + 8], 7, 1770035416), u = g(u, s, a, c, n[i + 9], 12, -1958414417), c = g(c, u, s, a, n[i + 10], 17, -42063), a = g(a, c, u, s, n[i + 11], 22, -1990404162), s = g(s, a, c, u, n[i + 12], 7, 1804603682), u = g(u, s, a, c, n[i + 13], 12, -40341101), c = g(c, u, s, a, n[i + 14], 17, -1502002290), a = g(a, c, u, s, n[i + 15], 22, 1236535329), s = f(s, a, c, u, n[i + 1], 5, -165796510), u = f(u, s, a, c, n[i + 6], 9, -1069501632), c = f(c, u, s, a, n[i + 11], 14, 643717713), a = f(a, c, u, s, n[i], 20, -373897302), s = f(s, a, c, u, n[i + 5], 5, -701558691), u = f(u, s, a, c, n[i + 10], 9, 38016083), c = f(c, u, s, a, n[i + 15], 14, -660478335), a = f(a, c, u, s, n[i + 4], 20, -405537848), s = f(s, a, c, u, n[i + 9], 5, 568446438), u = f(u, s, a, c, n[i + 14], 9, -1019803690), c = f(c, u, s, a, n[i + 3], 14, -187363961), a = f(a, c, u, s, n[i + 8], 20, 1163531501), s = f(s, a, c, u, n[i + 13], 5, -1444681467), u = f(u, s, a, c, n[i + 2], 9, -51403784), c = f(c, u, s, a, n[i + 7], 14, 1735328473), a = f(a, c, u, s, n[i + 12], 20, -1926607734), s = l(s, a, c, u, n[i + 5], 4, -378558), u = l(u, s, a, c, n[i + 8], 11, -2022574463), c = l(c, u, s, a, n[i + 11], 16, 1839030562), a = l(a, c, u, s, n[i + 14], 23, -35309556), s = l(s, a, c, u, n[i + 1], 4, -1530992060), u = l(u, s, a, c, n[i + 4], 11, 1272893353), c = l(c, u, s, a, n[i + 7], 16, -155497632), a = l(a, c, u, s, n[i + 10], 23, -1094730640), s = l(s, a, c, u, n[i + 13], 4, 681279174), u = l(u, s, a, c, n[i], 11, -358537222), c = l(c, u, s, a, n[i + 3], 16, -722521979), a = l(a, c, u, s, n[i + 6], 23, 76029189), s = l(s, a, c, u, n[i + 9], 4, -640364487), u = l(u, s, a, c, n[i + 12], 11, -421815835), c = l(c, u, s, a, n[i + 15], 16, 530742520), a = l(a, c, u, s, n[i + 2], 23, -995338651), s = y(s, a, c, u, n[i], 6, -198630844), u = y(u, s, a, c, n[i + 7], 10, 1126891415), c = y(c, u, s, a, n[i + 14], 15, -1416354905), a = y(a, c, u, s, n[i + 5], 21, -57434055), s = y(s, a, c, u, n[i + 12], 6, 1700485571), u = y(u, s, a, c, n[i + 3], 10, -1894986606), c = y(c, u, s, a, n[i + 10], 15, -1051523), a = y(a, c, u, s, n[i + 1], 21, -2054922799), s = y(s, a, c, u, n[i + 8], 6, 1873313359), u = y(u, s, a, c, n[i + 15], 10, -30611744), c = y(c, u, s, a, n[i + 6], 15, -1560198380), a = y(a, c, u, s, n[i + 13], 21, 1309151649), s = y(s, a, c, u, n[i + 4], 6, -145523070), u = y(u, s, a, c, n[i + 11], 10, -1120210379), c = y(c, u, s, a, n[i + 2], 15, 718787259), a = y(a, c, u, s, n[i + 9], 21, -343485551), s = o(s, w), a = o(a, p), c = o(c, h), u = o(u, r);
        return [s, a, c, u];
      }
      function B(n) {
        var d, i = "", w = n.length * 32;
        for (d = 0; d < w; d += 8)
          i += String.fromCharCode(n[d >> 5] >>> d % 32 & 255);
        return i;
      }
      function M(n) {
        var d, i = [];
        for (i[(n.length >> 2) - 1] = void 0, d = 0; d < i.length; d += 1)
          i[d] = 0;
        var w = n.length * 8;
        for (d = 0; d < w; d += 8)
          i[d >> 5] |= (n.charCodeAt(d / 8) & 255) << d % 32;
        return i;
      }
      function R(n) {
        return B(v(M(n), n.length * 8));
      }
      function E(n, d) {
        var i, w = M(n), p = [], h = [], r;
        for (p[15] = h[15] = void 0, w.length > 16 && (w = v(w, n.length * 8)), i = 0; i < 16; i += 1)
          p[i] = w[i] ^ 909522486, h[i] = w[i] ^ 1549556828;
        return r = v(p.concat(M(d)), 512 + d.length * 8), B(v(h.concat(r), 640));
      }
      function T(n) {
        var d = "0123456789abcdef", i = "", w, p;
        for (p = 0; p < n.length; p += 1)
          w = n.charCodeAt(p), i += d.charAt(w >>> 4 & 15) + d.charAt(w & 15);
        return i;
      }
      function O(n) {
        return unescape(encodeURIComponent(n));
      }
      function L(n) {
        return R(O(n));
      }
      function A(n) {
        return T(L(n));
      }
      function _(n, d) {
        return E(O(n), O(d));
      }
      function j(n, d) {
        return T(_(n, d));
      }
      function k(n, d, i) {
        return d ? i ? _(d, n) : j(d, n) : i ? L(n) : A(n);
      }
      e.exports ? e.exports = k : t.md5 = k;
    })(ot);
  }(x)), x.exports;
}
var at = it();
const ct = /* @__PURE__ */ st(at), lt = (e) => ct(e).toString(), ee = (e, t, o) => {
  if (!t) return e;
  let b = JSON.parse(JSON.stringify(t));
  o && o.length > 0 && (o[0].startsWith("-") ? o.forEach((g) => {
    if (g.indexOf(".") > -1) {
      const f = g.split(".");
      let l = b;
      for (let y = 0; y < f.length && (y === f.length - 1 && delete l[f[y]], typeof l[f[y]] == "object" && !Array.isArray(l[f[y]])); y++)
        l = l[f[y]];
    } else delete b[g];
  }) : (b = {}, o.forEach((g) => {
    if (g.indexOf(".") > -1) {
      const f = g.split(".");
      let l = t, y = b;
      for (let v = 0; v < f.length; v++)
        if (v === f.length - 1)
          y[f[v]] = l[f[v]];
        else {
          if (l[f[v]] === null || l[f[v]] === void 0)
            break;
          if (y[f[v]] === void 0)
            if (typeof l[f[v]] != "object" || Array.isArray(l[f[v]])) {
              y[f[v]] = l[f[v]];
              break;
            } else y[f[v]] = {};
          y = y[f[v]], l = l[f[v]];
        }
    } else b[g] = t[g];
  })));
  const m = JSON.stringify(b);
  return `${e}-` + lt(m);
};
var X = {}, F = {}, C = {}, N = {}, ke;
function Ne() {
  if (ke) return N;
  ke = 1, Object.defineProperty(N, "__esModule", { value: !0 }), N.anumber = e, N.number = e, N.abytes = o, N.bytes = o, N.ahash = b, N.aexists = m, N.aoutput = g;
  function e(l) {
    if (!Number.isSafeInteger(l) || l < 0)
      throw new Error("positive integer expected, got " + l);
  }
  function t(l) {
    return l instanceof Uint8Array || ArrayBuffer.isView(l) && l.constructor.name === "Uint8Array";
  }
  function o(l, ...y) {
    if (!t(l))
      throw new Error("Uint8Array expected");
    if (y.length > 0 && !y.includes(l.length))
      throw new Error("Uint8Array expected of length " + y + ", got length=" + l.length);
  }
  function b(l) {
    if (typeof l != "function" || typeof l.create != "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    e(l.outputLen), e(l.blockLen);
  }
  function m(l, y = !0) {
    if (l.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (y && l.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function g(l, y) {
    o(l);
    const v = y.outputLen;
    if (l.length < v)
      throw new Error("digestInto() expects output buffer of length at least " + v);
  }
  const f = {
    number: e,
    bytes: o,
    hash: b,
    exists: m,
    output: g
  };
  return N.default = f, N;
}
var S = {}, Te;
function ut() {
  if (Te) return S;
  Te = 1, Object.defineProperty(S, "__esModule", { value: !0 }), S.add5L = S.add5H = S.add4H = S.add4L = S.add3H = S.add3L = S.rotlBL = S.rotlBH = S.rotlSL = S.rotlSH = S.rotr32L = S.rotr32H = S.rotrBL = S.rotrBH = S.rotrSL = S.rotrSH = S.shrSL = S.shrSH = S.toBig = void 0, S.fromBig = o, S.split = b, S.add = A;
  const e = /* @__PURE__ */ BigInt(2 ** 32 - 1), t = /* @__PURE__ */ BigInt(32);
  function o(p, h = !1) {
    return h ? { h: Number(p & e), l: Number(p >> t & e) } : { h: Number(p >> t & e) | 0, l: Number(p & e) | 0 };
  }
  function b(p, h = !1) {
    let r = new Uint32Array(p.length), s = new Uint32Array(p.length);
    for (let a = 0; a < p.length; a++) {
      const { h: c, l: u } = o(p[a], h);
      [r[a], s[a]] = [c, u];
    }
    return [r, s];
  }
  const m = (p, h) => BigInt(p >>> 0) << t | BigInt(h >>> 0);
  S.toBig = m;
  const g = (p, h, r) => p >>> r;
  S.shrSH = g;
  const f = (p, h, r) => p << 32 - r | h >>> r;
  S.shrSL = f;
  const l = (p, h, r) => p >>> r | h << 32 - r;
  S.rotrSH = l;
  const y = (p, h, r) => p << 32 - r | h >>> r;
  S.rotrSL = y;
  const v = (p, h, r) => p << 64 - r | h >>> r - 32;
  S.rotrBH = v;
  const B = (p, h, r) => p >>> r - 32 | h << 64 - r;
  S.rotrBL = B;
  const M = (p, h) => h;
  S.rotr32H = M;
  const R = (p, h) => p;
  S.rotr32L = R;
  const E = (p, h, r) => p << r | h >>> 32 - r;
  S.rotlSH = E;
  const T = (p, h, r) => h << r | p >>> 32 - r;
  S.rotlSL = T;
  const O = (p, h, r) => h << r - 32 | p >>> 64 - r;
  S.rotlBH = O;
  const L = (p, h, r) => p << r - 32 | h >>> 64 - r;
  S.rotlBL = L;
  function A(p, h, r, s) {
    const a = (h >>> 0) + (s >>> 0);
    return { h: p + r + (a / 2 ** 32 | 0) | 0, l: a | 0 };
  }
  const _ = (p, h, r) => (p >>> 0) + (h >>> 0) + (r >>> 0);
  S.add3L = _;
  const j = (p, h, r, s) => h + r + s + (p / 2 ** 32 | 0) | 0;
  S.add3H = j;
  const k = (p, h, r, s) => (p >>> 0) + (h >>> 0) + (r >>> 0) + (s >>> 0);
  S.add4L = k;
  const n = (p, h, r, s, a) => h + r + s + a + (p / 2 ** 32 | 0) | 0;
  S.add4H = n;
  const d = (p, h, r, s, a) => (p >>> 0) + (h >>> 0) + (r >>> 0) + (s >>> 0) + (a >>> 0);
  S.add5L = d;
  const i = (p, h, r, s, a, c) => h + r + s + a + c + (p / 2 ** 32 | 0) | 0;
  S.add5H = i;
  const w = {
    fromBig: o,
    split: b,
    toBig: m,
    shrSH: g,
    shrSL: f,
    rotrSH: l,
    rotrSL: y,
    rotrBH: v,
    rotrBL: B,
    rotr32H: M,
    rotr32L: R,
    rotlSH: E,
    rotlSL: T,
    rotlBH: O,
    rotlBL: L,
    add: A,
    add3L: _,
    add3H: j,
    add4L: k,
    add4H: n,
    add5H: i,
    add5L: d
  };
  return S.default = w, S;
}
var se = {}, Q = {}, Le;
function dt() {
  return Le || (Le = 1, Object.defineProperty(Q, "__esModule", { value: !0 }), Q.crypto = void 0, Q.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), Q;
}
var Ce;
function ft() {
  return Ce || (Ce = 1, function(e) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Hash = e.nextTick = e.byteSwapIfBE = e.byteSwap = e.isLE = e.rotl = e.rotr = e.createView = e.u32 = e.u8 = void 0, e.isBytes = b, e.byteSwap32 = B, e.bytesToHex = R, e.hexToBytes = O, e.asyncLoop = A, e.utf8ToBytes = _, e.toBytes = j, e.concatBytes = k, e.checkOpts = d, e.wrapConstructor = i, e.wrapConstructorWithOpts = w, e.wrapXOFConstructorWithOpts = p, e.randomBytes = h;
    const t = /* @__PURE__ */ dt(), o = /* @__PURE__ */ Ne();
    function b(r) {
      return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
    }
    const m = (r) => new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    e.u8 = m;
    const g = (r) => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
    e.u32 = g;
    const f = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength);
    e.createView = f;
    const l = (r, s) => r << 32 - s | r >>> s;
    e.rotr = l;
    const y = (r, s) => r << s | r >>> 32 - s >>> 0;
    e.rotl = y, e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    const v = (r) => r << 24 & 4278190080 | r << 8 & 16711680 | r >>> 8 & 65280 | r >>> 24 & 255;
    e.byteSwap = v, e.byteSwapIfBE = e.isLE ? (r) => r : (r) => (0, e.byteSwap)(r);
    function B(r) {
      for (let s = 0; s < r.length; s++)
        r[s] = (0, e.byteSwap)(r[s]);
    }
    const M = /* @__PURE__ */ Array.from({ length: 256 }, (r, s) => s.toString(16).padStart(2, "0"));
    function R(r) {
      (0, o.abytes)(r);
      let s = "";
      for (let a = 0; a < r.length; a++)
        s += M[r[a]];
      return s;
    }
    const E = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function T(r) {
      if (r >= E._0 && r <= E._9)
        return r - E._0;
      if (r >= E.A && r <= E.F)
        return r - (E.A - 10);
      if (r >= E.a && r <= E.f)
        return r - (E.a - 10);
    }
    function O(r) {
      if (typeof r != "string")
        throw new Error("hex string expected, got " + typeof r);
      const s = r.length, a = s / 2;
      if (s % 2)
        throw new Error("hex string expected, got unpadded hex of length " + s);
      const c = new Uint8Array(a);
      for (let u = 0, P = 0; u < a; u++, P += 2) {
        const V = T(r.charCodeAt(P)), fe = T(r.charCodeAt(P + 1));
        if (V === void 0 || fe === void 0) {
          const Ve = r[P] + r[P + 1];
          throw new Error('hex string expected, got non-hex character "' + Ve + '" at index ' + P);
        }
        c[u] = V * 16 + fe;
      }
      return c;
    }
    const L = async () => {
    };
    e.nextTick = L;
    async function A(r, s, a) {
      let c = Date.now();
      for (let u = 0; u < r; u++) {
        a(u);
        const P = Date.now() - c;
        P >= 0 && P < s || (await (0, e.nextTick)(), c += P);
      }
    }
    function _(r) {
      if (typeof r != "string")
        throw new Error("utf8ToBytes expected string, got " + typeof r);
      return new Uint8Array(new TextEncoder().encode(r));
    }
    function j(r) {
      return typeof r == "string" && (r = _(r)), (0, o.abytes)(r), r;
    }
    function k(...r) {
      let s = 0;
      for (let c = 0; c < r.length; c++) {
        const u = r[c];
        (0, o.abytes)(u), s += u.length;
      }
      const a = new Uint8Array(s);
      for (let c = 0, u = 0; c < r.length; c++) {
        const P = r[c];
        a.set(P, u), u += P.length;
      }
      return a;
    }
    class n {
      // Safe version that clones internal state
      clone() {
        return this._cloneInto();
      }
    }
    e.Hash = n;
    function d(r, s) {
      if (s !== void 0 && {}.toString.call(s) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      return Object.assign(r, s);
    }
    function i(r) {
      const s = (c) => r().update(j(c)).digest(), a = r();
      return s.outputLen = a.outputLen, s.blockLen = a.blockLen, s.create = () => r(), s;
    }
    function w(r) {
      const s = (c, u) => r(u).update(j(c)).digest(), a = r({});
      return s.outputLen = a.outputLen, s.blockLen = a.blockLen, s.create = (c) => r(c), s;
    }
    function p(r) {
      const s = (c, u) => r(u).update(j(c)).digest(), a = r({});
      return s.outputLen = a.outputLen, s.blockLen = a.blockLen, s.create = (c) => r(c), s;
    }
    function h(r = 32) {
      if (t.crypto && typeof t.crypto.getRandomValues == "function")
        return t.crypto.getRandomValues(new Uint8Array(r));
      if (t.crypto && typeof t.crypto.randomBytes == "function")
        return t.crypto.randomBytes(r);
      throw new Error("crypto.getRandomValues must be defined");
    }
  }(se)), se;
}
var Oe;
function ht() {
  if (Oe) return C;
  Oe = 1, Object.defineProperty(C, "__esModule", { value: !0 }), C.shake256 = C.shake128 = C.keccak_512 = C.keccak_384 = C.keccak_256 = C.keccak_224 = C.sha3_512 = C.sha3_384 = C.sha3_256 = C.sha3_224 = C.Keccak = void 0, C.keccakP = L;
  const e = /* @__PURE__ */ Ne(), t = /* @__PURE__ */ ut(), o = /* @__PURE__ */ ft(), b = [], m = [], g = [], f = /* @__PURE__ */ BigInt(0), l = /* @__PURE__ */ BigInt(1), y = /* @__PURE__ */ BigInt(2), v = /* @__PURE__ */ BigInt(7), B = /* @__PURE__ */ BigInt(256), M = /* @__PURE__ */ BigInt(113);
  for (let k = 0, n = l, d = 1, i = 0; k < 24; k++) {
    [d, i] = [i, (2 * d + 3 * i) % 5], b.push(2 * (5 * i + d)), m.push((k + 1) * (k + 2) / 2 % 64);
    let w = f;
    for (let p = 0; p < 7; p++)
      n = (n << l ^ (n >> v) * M) % B, n & y && (w ^= l << (l << /* @__PURE__ */ BigInt(p)) - l);
    g.push(w);
  }
  const [R, E] = /* @__PURE__ */ (0, t.split)(g, !0), T = (k, n, d) => d > 32 ? (0, t.rotlBH)(k, n, d) : (0, t.rotlSH)(k, n, d), O = (k, n, d) => d > 32 ? (0, t.rotlBL)(k, n, d) : (0, t.rotlSL)(k, n, d);
  function L(k, n = 24) {
    const d = new Uint32Array(10);
    for (let i = 24 - n; i < 24; i++) {
      for (let h = 0; h < 10; h++)
        d[h] = k[h] ^ k[h + 10] ^ k[h + 20] ^ k[h + 30] ^ k[h + 40];
      for (let h = 0; h < 10; h += 2) {
        const r = (h + 8) % 10, s = (h + 2) % 10, a = d[s], c = d[s + 1], u = T(a, c, 1) ^ d[r], P = O(a, c, 1) ^ d[r + 1];
        for (let V = 0; V < 50; V += 10)
          k[h + V] ^= u, k[h + V + 1] ^= P;
      }
      let w = k[2], p = k[3];
      for (let h = 0; h < 24; h++) {
        const r = m[h], s = T(w, p, r), a = O(w, p, r), c = b[h];
        w = k[c], p = k[c + 1], k[c] = s, k[c + 1] = a;
      }
      for (let h = 0; h < 50; h += 10) {
        for (let r = 0; r < 10; r++)
          d[r] = k[h + r];
        for (let r = 0; r < 10; r++)
          k[h + r] ^= ~d[(r + 2) % 10] & d[(r + 4) % 10];
      }
      k[0] ^= R[i], k[1] ^= E[i];
    }
    d.fill(0);
  }
  class A extends o.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(n, d, i, w = !1, p = 24) {
      if (super(), this.blockLen = n, this.suffix = d, this.outputLen = i, this.enableXOF = w, this.rounds = p, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, e.anumber)(i), 0 >= this.blockLen || this.blockLen >= 200)
        throw new Error("Sha3 supports only keccak-f1600 function");
      this.state = new Uint8Array(200), this.state32 = (0, o.u32)(this.state);
    }
    keccak() {
      o.isLE || (0, o.byteSwap32)(this.state32), L(this.state32, this.rounds), o.isLE || (0, o.byteSwap32)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(n) {
      (0, e.aexists)(this);
      const { blockLen: d, state: i } = this;
      n = (0, o.toBytes)(n);
      const w = n.length;
      for (let p = 0; p < w; ) {
        const h = Math.min(d - this.pos, w - p);
        for (let r = 0; r < h; r++)
          i[this.pos++] ^= n[p++];
        this.pos === d && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: n, suffix: d, pos: i, blockLen: w } = this;
      n[i] ^= d, d & 128 && i === w - 1 && this.keccak(), n[w - 1] ^= 128, this.keccak();
    }
    writeInto(n) {
      (0, e.aexists)(this, !1), (0, e.abytes)(n), this.finish();
      const d = this.state, { blockLen: i } = this;
      for (let w = 0, p = n.length; w < p; ) {
        this.posOut >= i && this.keccak();
        const h = Math.min(i - this.posOut, p - w);
        n.set(d.subarray(this.posOut, this.posOut + h), w), this.posOut += h, w += h;
      }
      return n;
    }
    xofInto(n) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(n);
    }
    xof(n) {
      return (0, e.anumber)(n), this.xofInto(new Uint8Array(n));
    }
    digestInto(n) {
      if ((0, e.aoutput)(n, this), this.finished)
        throw new Error("digest() was already called");
      return this.writeInto(n), this.destroy(), n;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = !0, this.state.fill(0);
    }
    _cloneInto(n) {
      const { blockLen: d, suffix: i, outputLen: w, rounds: p, enableXOF: h } = this;
      return n || (n = new A(d, i, w, h, p)), n.state32.set(this.state32), n.pos = this.pos, n.posOut = this.posOut, n.finished = this.finished, n.rounds = p, n.suffix = i, n.outputLen = w, n.enableXOF = h, n.destroyed = this.destroyed, n;
    }
  }
  C.Keccak = A;
  const _ = (k, n, d) => (0, o.wrapConstructor)(() => new A(n, k, d));
  C.sha3_224 = _(6, 144, 224 / 8), C.sha3_256 = _(6, 136, 256 / 8), C.sha3_384 = _(6, 104, 384 / 8), C.sha3_512 = _(6, 72, 512 / 8), C.keccak_224 = _(1, 144, 224 / 8), C.keccak_256 = _(1, 136, 256 / 8), C.keccak_384 = _(1, 104, 384 / 8), C.keccak_512 = _(1, 72, 512 / 8);
  const j = (k, n, d) => (0, o.wrapXOFConstructorWithOpts)((i = {}) => new A(n, k, i.dkLen === void 0 ? d : i.dkLen, !0));
  return C.shake128 = j(31, 168, 128 / 8), C.shake256 = j(31, 136, 256 / 8), C;
}
var _e;
function pt() {
  if (_e) return F;
  _e = 1;
  const { sha3_512: e } = /* @__PURE__ */ ht(), t = 24, o = 32, b = (T = 4, O = Math.random) => {
    let L = "";
    for (; L.length < T; )
      L = L + Math.floor(O() * 36).toString(36);
    return L;
  };
  function m(T) {
    let O = 8n, L = 0n;
    for (const A of T.values()) {
      const _ = BigInt(A);
      L = (L << O) + _;
    }
    return L;
  }
  const g = (T = "") => m(e(T)).toString(36).slice(1), f = Array.from(
    { length: 26 },
    (T, O) => String.fromCharCode(O + 97)
  ), l = (T) => f[Math.floor(T() * f.length)], y = ({
    globalObj: T = typeof ve < "u" ? ve : typeof window < "u" ? window : {},
    random: O = Math.random
  } = {}) => {
    const L = Object.keys(T).toString(), A = L.length ? L + b(o, O) : b(o, O);
    return g(A).substring(0, o);
  }, v = (T) => () => T++, B = 476782367, M = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: T = Math.random,
    counter: O = v(Math.floor(T() * B)),
    length: L = t,
    fingerprint: A = y({ random: T })
  } = {}) => function() {
    const j = l(T), k = Date.now().toString(36), n = O().toString(36), d = b(L, T), i = `${k + d + n + A}`;
    return `${j + g(i).substring(1, L)}`;
  }, R = M(), E = (T, { minLength: O = 2, maxLength: L = o } = {}) => {
    const A = T.length, _ = /^[0-9a-z]+$/;
    try {
      if (typeof T == "string" && A >= O && A <= L && _.test(T))
        return !0;
    } finally {
    }
    return !1;
  };
  return F.getConstants = () => ({ defaultLength: t, bigLength: o }), F.init = M, F.createId = R, F.bufToBigInt = m, F.createCounter = v, F.createFingerprint = y, F.isCuid = E, F;
}
var Be;
function gt() {
  if (Be) return X;
  Be = 1;
  const { createId: e, init: t, getConstants: o, isCuid: b } = pt();
  return X.createId = e, X.init = t, X.getConstants = o, X.isCuid = b, X;
}
var mt = gt();
const De = /{{\s*([\w.]+)\s*}}/g, yt = (e, t) => e.replace(De, (o, b) => {
  const m = b.split(".");
  let g = t;
  for (const f of m)
    if (typeof g == "object" && g !== null)
      g = g[f];
    else {
      g = void 0;
      break;
    }
  return g !== void 0 ? String(g) : "";
}), bt = (e, t) => {
  const o = Array.isArray(t), b = o ? t : [t];
  return b.forEach((m) => {
    if (m && typeof m == "object")
      for (const g in e) {
        const f = e[g];
        if (typeof f == "string" && De.test(f)) {
          const l = yt(f, m);
          m[g] = l;
        } else
          m[g] = m[f];
      }
  }), o ? t : b[0];
}, Zt = (e) => typeof e == "object" && e !== null && !Array.isArray(e) || Array.isArray(e);
var wt = Object.defineProperty, vt = Object.defineProperties, St = Object.getOwnPropertyDescriptors, Ae = Object.getOwnPropertySymbols, kt = Object.prototype.hasOwnProperty, Tt = Object.prototype.propertyIsEnumerable, Me = (e, t, o) => t in e ? wt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[t] = o, q = (e, t) => {
  for (var o in t || (t = {}))
    kt.call(t, o) && Me(e, o, t[o]);
  if (Ae)
    for (var o of Ae(t))
      Tt.call(t, o) && Me(e, o, t[o]);
  return e;
}, G = (e, t) => vt(e, St(t));
const Fe = {}, Lt = function(e, t) {
  Fe[e] = t;
}, W = Ue({
  name: "Icon",
  props: {
    name: String,
    color: String
  },
  computed: {
    svg() {
      if (this.name)
        return Fe[this.name];
    }
  },
  render(e) {
    const t = this.svg;
    if (!t)
      return console.warn(`The name of '${this.name}' could not be found.`), I("span", {
        class: "m-svg-icon"
      }, null);
    const o = {
      color: this.color ? this.color : t.fill ? t.fill : null
    };
    return I("span", {
      class: ["m-svg-icon", "m-svg-icon--" + this.name]
    }, [I("svg", {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: t.viewBox,
      style: o,
      class: t.class
    }, [t.defs && I("defs", {
      innerHTML: t.defs
    }, null), t.path && I("path", {
      fill: "currentColor",
      d: t.path
    }, null), t.html && I("g", {
      innerHTML: t.html
    }, null), this.$slots.default])]);
  }
});
W.add = Lt;
const Ee = {
  name: "error",
  fill: "#F56C6C",
  viewBox: "0 0 1024 1024",
  path: "M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M579.7,512l101.6-101.6 c18.7-18.7,18.7-49,0-67.7c-18.7-18.7-49-18.7-67.7,0l0,0L512,444.3L410.4,342.7c-18.7-18.7-49-18.7-67.7,0s-18.7,49,0,67.7 L444.3,512L342.7,613.6c-18.7,18.7-18.7,49,0,67.7c18.7,18.7,49,18.7,67.7,0L512,579.7l101.6,101.6c18.7,18.7,49,18.7,67.7,0 c18.7-18.7,18.7-49,0-67.7L579.7,512z"
}, He = {
  name: "info",
  fill: "#1CADF2",
  viewBox: "0 0 1024 1024",
  path: "M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72z M581,673.9 c-33.2,49.9-67,88.3-123.8,88.3c-38.8-6.3-54.7-34.1-46.3-62.4L484,457.6c1.8-5.9-1.2-12.3-6.6-14.2c-5.4-1.9-15.9,5.1-25.1,15.1 l-44.2,53.2c-1.2-8.9-0.1-23.7-0.1-29.6c33.2-49.9,87.8-89.2,124.8-89.2c35.2,3.6,51.8,31.7,45.7,62.6l-73.6,243.3 c-1,5.5,1.9,11.1,6.9,12.8c5.4,1.9,16.8-5.1,26-15.1l44.2-53.1C583,652.3,581,667.9,581,673.9z M571.2,357.6 c-28,0-50.6-20.4-50.6-50.4c0-30,22.7-50.3,50.6-50.3c28,0,50.6,20.4,50.6,50.3C621.8,337.3,599.1,357.6,571.2,357.6z"
}, Pe = {
  name: "success",
  fill: "#17B77E",
  viewBox: "0 0 1024 1024",
  path: "M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72L512,72z M758.9,374 c-48.5,48.6-81.2,76.9-172.3,186.8c-52.6,63.4-102.3,131.5-102.7,132L462.1,720c-4.6,6.1-13.5,6.8-19.1,1.6L267.9,558.9 c-17.8-16.5-18.8-44.4-2.3-62.2s44.4-18.8,62.2-2.3l104.9,97.5c5.5,5.1,14.1,4.5,18.9-1.3c16.2-20.1,38.4-44.5,62.4-68.6 c90.2-90.9,145.6-139.7,175.2-161.3c36-26.2,77.3-48.6,87.3-36.2C792,343.9,782.5,350.3,758.9,374L758.9,374z"
}, je = {
  name: "warning",
  fill: "#FFC603",
  viewBox: "0 0 1024 1024",
  path: "M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M510,770.8 c30.4,0,55-24.6,55-55s-24.6-55-55-55s-55,24.6-55,55S479.6,770.8,510,770.8z M509.8,255.3c-39.3,0-71.2,31.9-71.2,71.2 c0,3.1,0.2,6.2,0.6,9.3L472.4,588c2.5,19.3,18.9,33.7,38.4,33.7c19.4,0,35.8-14.4,38.2-33.7l31.8-252.2c5-39.2-22.8-75-62-79.9 C515.9,255.5,512.8,255.3,509.8,255.3z"
}, Re = {
  name: "loading",
  viewBox: "0 0 50 50",
  html: '<g stroke="#f2f2f2" stroke-width="3.5"  stroke-linecap="round" fill="none"><circle cx="25" cy="25" r="20" class="m-loading-icon-bg-path"></circle><circle cx="25" cy="25" r="20" stroke="#20a0ff" stroke-dasharray="90, 150" stroke-dashoffset="0" class="m-loading-icon-active-path"><animate attributeName="stroke-dasharray" dur="1.5s" values="1,200;90,150;90,150" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" dur="1.5s" values="0;-40px;-120px" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2s" repeatCount="indefinite"/></circle></g>'
};
W.add(Ee.name, Ee);
W.add(He.name, He);
W.add(Pe.name, Pe);
W.add(je.name, je);
W.add(Re.name, Re);
var Ct = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [b, m] of t)
    o[b] = m;
  return o;
};
function Ot(e, t) {
  const o = Qe(0);
  return o.value = window.setTimeout(e, t), {
    stop() {
      window.clearTimeout(o.value);
    }
  };
}
const _t = Ue({
  components: { Icon: W },
  name: "m-message",
  emits: ["close", "destroy", "collapsed"],
  props: {
    id: String,
    type: {
      type: String,
      default: "info"
    },
    title: String,
    message: String,
    iconURL: String,
    duration: {
      type: Number,
      default: 3e3
    },
    isCollapsed: Boolean,
    collapsable: Boolean,
    supportHTML: Boolean,
    width: String,
    className: String,
    wrapperClassName: String,
    closable: Boolean,
    stopTimerOnHover: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, { expose: t, emit: o }) {
    const b = We({
      visible: !0,
      collapsed: e.isCollapsed,
      timer: null
    });
    let m;
    const g = () => {
      e.duration < 0 || ({ stop: m } = Ot(() => {
        l();
      }, e.duration));
    }, f = () => {
      m == null || m();
    }, l = () => {
      b.visible = !1;
    }, y = () => {
      b.collapsed = !b.collapsed, o("collapsed", b.collapsed);
    }, v = () => {
      b.visible = !1;
    }, B = () => {
      e.stopTimerOnHover && f();
    }, M = () => {
      e.stopTimerOnHover && g();
    };
    return Xe(() => {
      f();
    }), Ge(() => {
      g();
    }), t({
      close: l
    }), {
      state: b,
      handleClearTimer: B,
      handleStartTimer: M,
      triggerCollapse: y,
      handleClose: v
    };
  }
}), Bt = ["id"], At = {
  key: 0,
  class: "m-message-icons"
}, Mt = ["src"], Et = { class: "m-message-content" }, Ht = {
  key: 0,
  class: "m-message--title"
}, Pt = ["innerHTML"], jt = {
  key: 0,
  class: "m-message--description"
}, Rt = { class: "m-message--control" }, Ut = /* @__PURE__ */ J("svg", {
  viewBox: "0 0 35 35",
  width: "20",
  height: "20",
  version: "1.1",
  fill: "currentColor"
}, [
  /* @__PURE__ */ J("path", { d: "M9.4,13.9c-0.2,0.2-0.2,0.6,0,0.8l8.1,8.1l0,0l0,0l8.1-8.1c0.2-0.2,0.2-0.6,0-0.8l-1.3-1.3 c-0.2-0.2-0.6-0.2-0.8,0l-5.5,5.5c-0.2,0.2-0.6,0.2-0.8,0l-5.5-5.5c-0.2-0.2-0.6-0.2-0.8,0L9.4,13.9z" })
], -1), Nt = [
  Ut
], Dt = /* @__PURE__ */ J("svg", {
  viewBox: "0 0 35 35",
  width: "20",
  height: "20",
  version: "1.1",
  fill: "currentColor"
}, [
  /* @__PURE__ */ J("path", { d: "M19.5,17.5l5.1,5.1l-2,2l-5.1-5.1l-5.1,5.1l-2-2l5.1-5.1l-5.1-5.1l2-2l5.1,5.1l5.1-5.1l2,2L19.5,17.5z" })
], -1), Ft = [
  Dt
];
function qt(e, t, o, b, m, g) {
  const f = Ze("icon");
  return U(), ge(xe, {
    name: "m-message-fade",
    appear: "",
    mode: "in-out",
    onBeforeLeave: t[4] || (t[4] = (l) => e.$emit("close")),
    onAfterLeave: t[5] || (t[5] = (l) => e.$emit("destroy"))
  }, {
    default: et(() => [
      e.state.visible ? (U(), D("div", {
        key: 0,
        class: re(["m-message-wrapper", e.wrapperClassName]),
        id: e.id,
        style: tt({
          width: e.width
        })
      }, [
        J("div", {
          class: re(["m-message", e.className]),
          onMouseenter: t[2] || (t[2] = (...l) => e.handleClearTimer && e.handleClearTimer(...l)),
          onMouseleave: t[3] || (t[3] = (...l) => e.handleStartTimer && e.handleStartTimer(...l))
        }, [
          e.iconURL || e.type ? (U(), D("div", At, [
            e.iconURL ? (U(), D("img", {
              key: 0,
              src: e.iconURL,
              class: "m-message--icon"
            }, null, 8, Mt)) : e.type ? (U(), ge(f, {
              key: 1,
              name: e.type,
              class: "m-message--icon"
            }, null, 8, ["name"])) : $("", !0)
          ])) : $("", !0),
          J("div", Et, [
            e.title || e.$slots.title ? (U(), D("div", Ht, [
              me(e.$slots, "title", {}, () => [
                ye(be(e.title), 1)
              ])
            ])) : $("", !0),
            e.supportHTML && e.message ? (U(), D(we, { key: 1 }, [
              e.state.collapsed ? $("", !0) : (U(), D("div", {
                key: 0,
                class: "m-message--description",
                innerHTML: e.message
              }, null, 8, Pt))
            ], 64)) : (U(), D(we, { key: 2 }, [
              e.state.collapsed ? $("", !0) : (U(), D("div", jt, [
                me(e.$slots, "default", {}, () => [
                  ye(be(e.message), 1)
                ])
              ]))
            ], 64))
          ]),
          J("div", Rt, [
            e.collapsable && (e.title || e.$slots.title) ? (U(), D("button", {
              key: 0,
              class: re(["m-message--button m-message--arrow-down", {
                "is-collapsed": e.state.collapsed
              }]),
              onClick: t[0] || (t[0] = (...l) => e.triggerCollapse && e.triggerCollapse(...l))
            }, Nt, 2)) : $("", !0),
            e.closable ? (U(), D("button", {
              key: 1,
              class: "m-message--button m-message--close",
              onClick: t[1] || (t[1] = (...l) => e.handleClose && e.handleClose(...l))
            }, Ft)) : $("", !0)
          ])
        ], 34)
      ], 14, Bt)) : $("", !0)
    ]),
    _: 3
  });
}
var $t = /* @__PURE__ */ Ct(_t, [["render", qt]]);
const ce = [];
let zt = 0;
const oe = {};
let qe = {};
const Kt = {
  stopTimerOnHover: !0,
  duration: 3e3
}, H = (e) => {
  const t = "m-message-" + zt++, o = G(q(q(q({}, Kt), qe), e), {
    id: t
  });
  delete o.hasMask, delete o.position, delete o.zIndex;
  const b = e.position || "top-center", m = e.hasMask || !1, g = b + (m ? "-mask" : "");
  let f = oe[g];
  f ? f.count++ : (f = oe[g] = {
    el: document.createElement("div"),
    count: 1
  }, f.el.className = [
    "m-message-container",
    "is-" + b,
    m ? "has-mask" : ""
  ].filter(function(M) {
    return !!M;
  }).join(" "), document.body.appendChild(f.el)), e.zIndex && (f.el.style.zIndex = String(e.zIndex));
  let l = null;
  Ye(e.message) ? (l = { default: () => e.message }, o.message = "") : typeof e.message == "function" && (l = { default: e.message }, o.message = "");
  const y = I($t, o, l), v = document.createElement("div");
  y.appContext = e.ctx || H._context || null, y.props.onClose = e.onClose, y.props.onDestroy = () => {
    f.count--, f.count === 0 && (delete oe[g], f.el.remove()), pe(null, v);
  }, pe(y, v), b.indexOf("bottom") === 0 && f.el.firstChild ? f.el.insertBefore(v.firstElementChild, f.el.firstChild) : f.el.appendChild(v.firstElementChild);
  const B = {
    id: t,
    close() {
      var M, R;
      (R = (M = y == null ? void 0 : y.component) == null ? void 0 : M.exposed) == null || R.close();
    }
  };
  return ce.push(B), B;
};
H.success = (e, t) => H(G(q({}, t), { type: "success", message: e }));
H.info = (e, t) => H(G(q({}, t), { type: "info", message: e }));
H.warning = (e, t) => H(G(q({}, t), { type: "warning", message: e }));
H.error = (e, t) => H(G(q({}, t), { type: "error", message: e }));
H.loading = (e, t) => H(G(q({}, t), { type: "loading", message: e }));
H.closeAll = function() {
  for (let e = ce.length - 1; e >= 0; e--)
    ce[e].close();
};
H.setDefault = (e) => {
  qe = q({}, e);
};
const Vt = (e, t) => (e.install = t, e);
var Y = Vt(H, function(e, t = {}) {
  H._context = e._context, e.config.globalProperties["$" + (t.name || "mmessage")] = H, t.defaultOptions && H.setDefault(t.defaultOptions);
});
class It {
  constructor() {
    he(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "none",
      mask: !1,
      position: "center"
    });
  }
  showToast(t, o, b, m) {
    const g = typeof o == "string" ? o : o.title || b;
    this.show({
      ...this.defaultOptions,
      icon: t,
      duration: m || this.defaultOptions.duration,
      title: g
    });
  }
  success(t) {
    this.showToast("success", t, "操作成功");
  }
  error(t) {
    this.showToast("error", t, "操作失败", 5e3);
  }
  warning(t) {
    this.showToast("warning", t, "警告警告", 5e3);
  }
  info(t) {
    this.showToast("none", t, "提示信息");
  }
  loading(t) {
    this.showToast("loading", t, "数据加载中", -1);
  }
  hide(t) {
    t = t || 0, t === 0 ? this.close() : setTimeout(this.close, t);
  }
  close() {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : Y.closeAll();
  }
  show(t) {
    const { title: o, icon: b, mask: m, duration: g, position: f } = t;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...t,
        title: o,
        icon: b === "warning" ? "error" : b,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: g,
        position: f,
        mask: t.mask,
        success: t.success,
        fail: t.fail,
        complete: t.complete
      });
    else {
      let l = "info";
      switch (this.hide(), b) {
        case "success":
          Y.success(o, {
            ...t,
            title: "",
            position: "top-center",
            hasMask: m,
            type: l,
            icon: l,
            closeOnClick: !0,
            pauseOnFocusLoss: !0,
            pauseOnHover: !0
          });
          break;
        case "error":
          console.log("error show"), Y.error(o, {
            ...t,
            title: "",
            position: "top-center",
            hasMask: m,
            type: l,
            icon: l
          });
          break;
        case "loading":
          Y.loading(o, {
            ...t,
            title: "",
            position: "top-center",
            hasMask: m,
            type: l,
            icon: l,
            duration: -1
            // 不自动关闭
          });
          break;
        default:
          Y.info(o, {
            ...t,
            title: "",
            position: f,
            hasMask: m,
            type: l,
            icon: l
          });
          break;
      }
    }
  }
}
const le = new It(), ie = /* @__PURE__ */ new Map(), ue = {
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
    fields: o,
    lastModified: b,
    storage: m = "memory"
  }, g, f = -1) {
    if (g == null) return;
    const l = ee(e, t, o), y = f !== -1 ? Date.now() + f : void 0, v = `frontCache::${l}`, B = {
      data: g,
      expireAt: y,
      lastModified: b ?? Date.now()
    };
    switch (m) {
      case "memory":
        ie.set(v, B);
        break;
      case "uni":
        uni.setStorageSync(v, JSON.stringify(B));
        break;
      case "session":
        sessionStorage.setItem(v, JSON.stringify(B));
        break;
      case "local":
        localStorage.setItem(v, JSON.stringify(B));
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
    fields: o,
    storage: b = "memory"
  }) {
    const g = `frontCache::${ee(e, t, o)}`;
    let f = null, l;
    switch (b) {
      case "memory":
        f = ie.get(g);
        break;
      case "uni":
        l = uni.getStorageSync(g), f = l ? JSON.parse(l) : null;
        break;
      case "session":
        l = sessionStorage.getItem(g), f = l ? JSON.parse(l) : null;
        break;
      case "local":
        l = localStorage.getItem(g), f = l ? JSON.parse(l) : null;
        break;
    }
    return f && (!f.expireAt || f.expireAt > Date.now()) ? f.data : (ue.remove({ key: e, params: t, storage: b }), null);
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
    fields: o,
    storage: b = "memory"
  }) {
    const g = `frontCache::${ee(e, t, o)}`;
    switch (b) {
      case "memory":
        ie.delete(g);
        break;
      case "uni":
        uni.removeStorageSync(g);
        break;
      case "session":
        sessionStorage.removeItem(g);
        break;
      case "local":
        localStorage.removeItem(g);
        break;
    }
  }
}, Jt = mt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: "a-custom-host-fingerprint"
}), ae = {}, Wt = (e, t, o) => {
  if (typeof t.header == "object" ? e.header = t.header : typeof t.header == "function" && (e.header = t.header(o.header)), e.header || (e.header = {}), e.header.reqId = Jt(), Object.assign(o, e), t.before) {
    const b = t.before.call(t, o);
    if (b !== void 0)
      return b;
  }
  e.loadingText && le.loading({
    title: e.loadingText.toString()
  });
}, de = (e, t, o, b) => {
  if (o.statusCode >= 200 && o.statusCode < 400) {
    const m = o.data;
    if (m.status === Z.SUCCESS) {
      const g = m.data;
      e.method === "POST" && t.fieldMap && g && bt(t.fieldMap, g), t.after && t.after.call(t, m, e), b.Result = m;
    } else
      console.error(m), b.Error = {
        status: m.status,
        errno: m.errno,
        msg: m.msg || "请求发生错误"
      }, b.Result = m;
  } else {
    let m;
    const g = o.statusCode;
    switch (g) {
      case 401:
        m = "未授权或授权过期";
        break;
      case 403:
        m = "无权访问";
        break;
      case 404:
        m = "请求地址错误";
        break;
      case 500:
        m = "服务器异常";
        break;
      default:
        m = "其它请求错误";
        break;
    }
    m = `${g}: ${m}`;
    const f = {
      status: Z.ERROR,
      errno: g + 1e3,
      msg: m
    };
    console.error(f), b.Error = f;
  }
}, $e = (e, t) => {
  console.error(e);
  const o = {
    status: Z.ERROR,
    errno: 1e3,
    msg: "网络错误"
  };
  t.Error = o;
}, ze = (e, t, o) => {
  !e.hideErrorToast && t.Error ? le.error({ title: t.Error.msg }) : le.hide(1e3), o(t.Result);
}, K = (e, t, o) => {
  const b = JSON.parse(JSON.stringify(Ke));
  if (Wt(e, t, b) === !1) return Promise.resolve(null);
  if (e.method === "POST") {
    if (t.cacheTime) {
      const y = ue.get({
        ...t,
        key: t.url,
        params: t.params,
        fields: ["Query", "Option.SelectFields"]
      });
      if (y) return Promise.resolve(y);
    }
    const g = ee(e.url, t.params, [
      "Query",
      "Option.SelectFields"
    ]), f = ae[g];
    if (f)
      return new Promise((y) => {
        f.then(y);
      });
    const l = o(e, t).then((y) => (typeof y == "boolean" || (y == null ? void 0 : y.status) === Z.SUCCESS && t.cacheTime && ue.set(
      {
        ...t,
        key: t.url,
        params: t.params,
        fields: ["Query", "Option.SelectFields"]
      },
      y == null ? void 0 : y.data,
      t.cacheTime
    ), y)).finally(() => {
      delete ae[g];
    });
    return ae[g] = l, l;
  } else
    return o(e, t);
}, te = (e, t) => {
  const o = {
    Result: null
  };
  return new Promise((b) => {
    uni.request({
      ...e,
      success: (m) => {
        de(e, t, m, o);
      },
      fail: (m) => {
        $e(m, o);
      },
      complete: () => {
        ze(t, o, b);
      }
    });
  });
}, xt = (e) => {
  const t = z(e);
  return K(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "数据加载中……"
    },
    e,
    te
  );
}, en = (e, t) => {
  const o = z(e);
  return K(
    {
      url: o,
      dataType: "json",
      method: "PUT",
      data: t,
      timeout: e.timeout,
      loadingText: "正在存储数据……"
    },
    e,
    te
  );
}, tn = (e, t) => {
  const o = z(e);
  return K(
    {
      url: o,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "正在删除数据……"
    },
    e,
    te
  );
}, nn = (e, t) => {
  const o = z(e);
  return K(
    {
      url: o,
      dataType: "json",
      method: "POST",
      data: t,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "数据加载中……"
    },
    e,
    te
  );
}, ne = (e, t) => {
  const o = {
    Result: null
  };
  return new Promise((b) => {
    nt.request({
      ...e
    }).then((m) => {
      de(
        e,
        t,
        {
          statusCode: m.status,
          data: m.data
        },
        o
      );
    }).catch((m) => {
      var g;
      m.status && m.status > 200 && m.status < 600 ? de(
        e,
        t,
        {
          statusCode: m.status,
          data: (g = m.response) == null ? void 0 : g.data
        },
        o
      ) : $e(m, o);
    }).finally(() => {
      ze(t, o, b);
    });
  });
}, rn = (e) => {
  const t = z(e);
  return K(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "数据加载中……"
    },
    e,
    ne
  );
}, sn = (e, t) => {
  const o = z(e);
  return K(
    {
      url: o,
      dataType: "json",
      method: "PUT",
      data: t,
      timeout: e.timeout,
      loadingText: "正在存储数据……"
    },
    e,
    ne
  );
}, on = (e, t) => {
  const o = z(e);
  return K(
    {
      url: o,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "正在删除数据……"
    },
    e,
    ne
  );
}, an = (e, t) => {
  const o = z(e);
  return K(
    {
      url: o,
      dataType: "json",
      method: "POST",
      data: t,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "数据加载中……"
    },
    e,
    ne
  );
}, Ke = {
  url: "",
  header: { "Content-Type": "application/json" }
}, cn = (e) => {
  Object.assign(Ke, e);
};
export {
  rt as API_HOST,
  Z as ResStatus,
  Yt as SERVER_HOST,
  bt as fieldMapping,
  cn as globalRequestOption,
  z as hostUrl,
  on as httpDelete,
  rn as httpGet,
  an as httpPost,
  sn as httpPut,
  Zt as isJSON,
  Ke as requestConfig,
  le as toast,
  tn as uniDelete,
  xt as uniGet,
  nn as uniPost,
  en as uniPut
};
