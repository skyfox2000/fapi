var Kn = Object.defineProperty;
var Fn = (t, e, r) => e in t ? Kn(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var er = (t, e, r) => Fn(t, typeof e != "symbol" ? e + "" : e, r);
import Mn from "axios";
import qt from "vue-m-message";
var gt = /* @__PURE__ */ ((t) => (t.SUCCESS = "success", t.ERROR = "error", t))(gt || {});
let Ge = {
  enabled: !1,
  includeApis: [],
  excludeApis: [],
  includeHostKeys: [],
  excludeHostKeys: [],
  excludeSubApps: []
};
const qn = (t) => {
  const e = t.match(/^~\((.*)\)$/);
  if (e)
    try {
      return { type: "regex", value: new RegExp(e[1]) };
    } catch {
      return console.warn(`[Crypto Config] 无效的正则表达式: ${t}`), { type: "string", value: t };
    }
  return { type: "string", value: t };
}, Hn = (t, e, r = "includes") => {
  const l = qn(e);
  return l.type === "regex" ? l.value.test(t) : r === "exact" ? t === l.value : t.includes(l.value);
}, Lt = (t, e, r = "includes") => {
  if (!e || e.length === 0)
    return !1;
  for (const l of e)
    if (Hn(t, l, r))
      return !0;
  return !1;
}, zi = (t) => {
  Ge = {
    ...Ge,
    ...t
  };
}, $a = (t, e, r) => !Ge.enabled || r && Ge.excludeSubApps && Ge.excludeSubApps.length > 0 && Lt(r, Ge.excludeSubApps, "exact") || e && Ge.excludeHostKeys && Ge.excludeHostKeys.length > 0 && Lt(e, Ge.excludeHostKeys, "exact") || Ge.includeHostKeys && Ge.includeHostKeys.length > 0 && (!e || !Lt(e, Ge.includeHostKeys, "exact")) || Ge.excludeApis && Ge.excludeApis.length > 0 && Lt(t, Ge.excludeApis, "includes") ? !1 : !!(!Ge.includeApis || Ge.includeApis.length === 0 || Lt(t, Ge.includeApis, "includes")), en = {
  header: { "Content-Type": "application/json" }
};
let tn, rn, an = null;
const Qi = (t) => {
  an = t;
}, nn = () => an, Xi = (t) => {
  const { before: e, after: r, ...l } = t;
  e && (tn = e), r && (rn = r), Object.assign(en, l);
}, Gn = () => en, zn = () => tn, kt = () => rn, Et = (t) => {
  if (t === null || typeof t != "object" || typeof t == "function")
    return t;
  if (Array.isArray(t)) {
    const r = [];
    for (let l = 0; l < t.length; l++)
      r[l] = Et(t[l]);
    return r;
  }
  const e = {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = Et(t[r]));
  return e;
}, Qn = (t, e) => t << e | t >>> 32 - e, Xn = (t) => {
  const e = [];
  for (let C = 0; C < t.length; C++)
    e.push(t.charCodeAt(C));
  const r = e.length * 8;
  for (e.push(128); e.length * 8 % 512 !== 448; )
    e.push(0);
  e.push(r >>> 24 & 255), e.push(r >>> 16 & 255), e.push(r >>> 8 & 255), e.push(r & 255);
  let l = 1732584193, E = 4023233417, v = 2562383102, u = 271733878;
  const a = (C, m, s) => C & m | ~C & s, p = (C, m, s) => C & s | m & ~s, f = (C, m, s) => C ^ m ^ s, S = (C, m, s) => m ^ (C | ~s), U = [
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
  ], T = [
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
  let c = 0;
  for (; c < e.length; ) {
    const C = new Array(16).fill(0);
    for (let B = 0; B < 16; B++)
      C[B] = e[c + B] || 0;
    let m = l, s = E, d = v, y = u;
    for (let B = 0; B < 64; B++) {
      let b, h, i;
      B < 16 ? (b = a(s, d, y), h = B) : B < 32 ? (b = p(s, d, y), h = (5 * B + 1) % 16) : B < 48 ? (b = f(s, d, y), h = (3 * B + 5) % 16) : (b = S(s, d, y), h = 7 * B % 16), i = y, y = d, d = s, s = s + Qn(m + b + U[B] + C[h] | 0, T[B]), m = i;
    }
    l = l + m | 0, E = E + s | 0, v = v + d | 0, u = u + y | 0, c += 16;
  }
  return [l, E, v, u].map((C) => {
    const m = C & 255, s = C >>> 8 & 255, d = C >>> 16 & 255;
    return [C >>> 24 & 255, d, s, m];
  }).flat().map((C) => C.toString(16).padStart(2, "0")).join("");
}, Yn = (t) => Xn(t), Qt = (t, e, r, l) => {
  if (!e) return t;
  let E = Et(e);
  r && (E.FieldMap = r), l && l.length > 0 && (l[0].startsWith("-") ? l.forEach((u) => {
    if (u.indexOf(".") > -1) {
      const a = u.split(".");
      let p = E;
      for (let f = 0; f < a.length && (f === a.length - 1 && delete p[a[f]], typeof p[a[f]] == "object" && !Array.isArray(p[a[f]])); f++)
        p = p[a[f]];
    } else delete E[u];
  }) : (E = {}, l.forEach((u) => {
    if (u.indexOf(".") > -1) {
      const a = u.split(".");
      let p = e, f = E;
      for (let S = 0; S < a.length; S++)
        if (S === a.length - 1)
          f[a[S]] = p[a[S]];
        else {
          if (p[a[S]] === null || p[a[S]] === void 0)
            break;
          if (f[a[S]] === void 0)
            if (typeof p[a[S]] != "object" || Array.isArray(p[a[S]])) {
              f[a[S]] = p[a[S]];
              break;
            } else f[a[S]] = {};
          f = f[a[S]], p = p[a[S]];
        }
    } else E[u] = e[u];
  })));
  const v = JSON.stringify(E);
  return `${t}-` + Yn(v);
};
var qr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function jn(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Wn(t) {
  if (Object.prototype.hasOwnProperty.call(t, "__esModule")) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function l() {
      return this instanceof l ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(l) {
    var E = Object.getOwnPropertyDescriptor(t, l);
    Object.defineProperty(r, l, E.get ? E : {
      enumerable: !0,
      get: function() {
        return t[l];
      }
    });
  }), r;
}
var Bt = {}, ct = {}, ge = {}, le = {}, ea;
function Zn() {
  if (ea) return le;
  ea = 1, Object.defineProperty(le, "__esModule", { value: !0 }), le.toBig = le.shrSL = le.shrSH = le.rotrSL = le.rotrSH = le.rotrBL = le.rotrBH = le.rotr32L = le.rotr32H = le.rotlSL = le.rotlSH = le.rotlBL = le.rotlBH = le.add5L = le.add5H = le.add4L = le.add4H = le.add3L = le.add3H = void 0, le.add = s, le.fromBig = r, le.split = l;
  const t = /* @__PURE__ */ BigInt(2 ** 32 - 1), e = /* @__PURE__ */ BigInt(32);
  function r(A, _ = !1) {
    return _ ? { h: Number(A & t), l: Number(A >> e & t) } : { h: Number(A >> e & t) | 0, l: Number(A & t) | 0 };
  }
  function l(A, _ = !1) {
    const P = A.length;
    let D = new Uint32Array(P), K = new Uint32Array(P);
    for (let q = 0; q < P; q++) {
      const { h: H, l: G } = r(A[q], _);
      [D[q], K[q]] = [H, G];
    }
    return [D, K];
  }
  const E = (A, _) => BigInt(A >>> 0) << e | BigInt(_ >>> 0);
  le.toBig = E;
  const v = (A, _, P) => A >>> P;
  le.shrSH = v;
  const u = (A, _, P) => A << 32 - P | _ >>> P;
  le.shrSL = u;
  const a = (A, _, P) => A >>> P | _ << 32 - P;
  le.rotrSH = a;
  const p = (A, _, P) => A << 32 - P | _ >>> P;
  le.rotrSL = p;
  const f = (A, _, P) => A << 64 - P | _ >>> P - 32;
  le.rotrBH = f;
  const S = (A, _, P) => A >>> P - 32 | _ << 64 - P;
  le.rotrBL = S;
  const U = (A, _) => _;
  le.rotr32H = U;
  const T = (A, _) => A;
  le.rotr32L = T;
  const c = (A, _, P) => A << P | _ >>> 32 - P;
  le.rotlSH = c;
  const g = (A, _, P) => _ << P | A >>> 32 - P;
  le.rotlSL = g;
  const C = (A, _, P) => _ << P - 32 | A >>> 64 - P;
  le.rotlBH = C;
  const m = (A, _, P) => A << P - 32 | _ >>> 64 - P;
  le.rotlBL = m;
  function s(A, _, P, D) {
    const K = (_ >>> 0) + (D >>> 0);
    return { h: A + P + (K / 2 ** 32 | 0) | 0, l: K | 0 };
  }
  const d = (A, _, P) => (A >>> 0) + (_ >>> 0) + (P >>> 0);
  le.add3L = d;
  const y = (A, _, P, D) => _ + P + D + (A / 2 ** 32 | 0) | 0;
  le.add3H = y;
  const B = (A, _, P, D) => (A >>> 0) + (_ >>> 0) + (P >>> 0) + (D >>> 0);
  le.add4L = B;
  const b = (A, _, P, D, K) => _ + P + D + K + (A / 2 ** 32 | 0) | 0;
  le.add4H = b;
  const h = (A, _, P, D, K) => (A >>> 0) + (_ >>> 0) + (P >>> 0) + (D >>> 0) + (K >>> 0);
  le.add5L = h;
  const i = (A, _, P, D, K, q) => _ + P + D + K + q + (A / 2 ** 32 | 0) | 0;
  le.add5H = i;
  const n = {
    fromBig: r,
    split: l,
    toBig: E,
    shrSH: v,
    shrSL: u,
    rotrSH: a,
    rotrSL: p,
    rotrBH: f,
    rotrBL: S,
    rotr32H: U,
    rotr32L: T,
    rotlSH: c,
    rotlSL: g,
    rotlBH: C,
    rotlBL: m,
    add: s,
    add3L: d,
    add3H: y,
    add4L: B,
    add4H: b,
    add5H: i,
    add5L: h
  };
  return le.default = n, le;
}
var tr = {}, Dt = {}, ta;
function Jn() {
  return ta || (ta = 1, Object.defineProperty(Dt, "__esModule", { value: !0 }), Dt.crypto = void 0, Dt.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), Dt;
}
var ra;
function $n() {
  return ra || (ra = 1, (function(t) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(t, "__esModule", { value: !0 }), t.wrapXOFConstructorWithOpts = t.wrapConstructorWithOpts = t.wrapConstructor = t.Hash = t.nextTick = t.swap32IfBE = t.byteSwapIfBE = t.swap8IfBE = t.isLE = void 0, t.isBytes = r, t.anumber = l, t.abytes = E, t.ahash = v, t.aexists = u, t.aoutput = a, t.u8 = p, t.u32 = f, t.clean = S, t.createView = U, t.rotr = T, t.rotl = c, t.byteSwap = g, t.byteSwap32 = C, t.bytesToHex = d, t.hexToBytes = b, t.asyncLoop = i, t.utf8ToBytes = n, t.bytesToUtf8 = A, t.toBytes = _, t.kdfInputToBytes = P, t.concatBytes = D, t.checkOpts = K, t.createHasher = H, t.createOptHasher = G, t.createXOFer = X, t.randomBytes = Z;
    const e = /* @__PURE__ */ Jn();
    function r(F) {
      return F instanceof Uint8Array || ArrayBuffer.isView(F) && F.constructor.name === "Uint8Array";
    }
    function l(F) {
      if (!Number.isSafeInteger(F) || F < 0)
        throw new Error("positive integer expected, got " + F);
    }
    function E(F, ...Y) {
      if (!r(F))
        throw new Error("Uint8Array expected");
      if (Y.length > 0 && !Y.includes(F.length))
        throw new Error("Uint8Array expected of length " + Y + ", got length=" + F.length);
    }
    function v(F) {
      if (typeof F != "function" || typeof F.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      l(F.outputLen), l(F.blockLen);
    }
    function u(F, Y = !0) {
      if (F.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (Y && F.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function a(F, Y) {
      E(F);
      const ee = Y.outputLen;
      if (F.length < ee)
        throw new Error("digestInto() expects output buffer of length at least " + ee);
    }
    function p(F) {
      return new Uint8Array(F.buffer, F.byteOffset, F.byteLength);
    }
    function f(F) {
      return new Uint32Array(F.buffer, F.byteOffset, Math.floor(F.byteLength / 4));
    }
    function S(...F) {
      for (let Y = 0; Y < F.length; Y++)
        F[Y].fill(0);
    }
    function U(F) {
      return new DataView(F.buffer, F.byteOffset, F.byteLength);
    }
    function T(F, Y) {
      return F << 32 - Y | F >>> Y;
    }
    function c(F, Y) {
      return F << Y | F >>> 32 - Y >>> 0;
    }
    t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    function g(F) {
      return F << 24 & 4278190080 | F << 8 & 16711680 | F >>> 8 & 65280 | F >>> 24 & 255;
    }
    t.swap8IfBE = t.isLE ? (F) => F : (F) => g(F), t.byteSwapIfBE = t.swap8IfBE;
    function C(F) {
      for (let Y = 0; Y < F.length; Y++)
        F[Y] = g(F[Y]);
      return F;
    }
    t.swap32IfBE = t.isLE ? (F) => F : C;
    const m = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", s = /* @__PURE__ */ Array.from({ length: 256 }, (F, Y) => Y.toString(16).padStart(2, "0"));
    function d(F) {
      if (E(F), m)
        return F.toHex();
      let Y = "";
      for (let ee = 0; ee < F.length; ee++)
        Y += s[F[ee]];
      return Y;
    }
    const y = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function B(F) {
      if (F >= y._0 && F <= y._9)
        return F - y._0;
      if (F >= y.A && F <= y.F)
        return F - (y.A - 10);
      if (F >= y.a && F <= y.f)
        return F - (y.a - 10);
    }
    function b(F) {
      if (typeof F != "string")
        throw new Error("hex string expected, got " + typeof F);
      if (m)
        return Uint8Array.fromHex(F);
      const Y = F.length, ee = Y / 2;
      if (Y % 2)
        throw new Error("hex string expected, got unpadded hex of length " + Y);
      const se = new Uint8Array(ee);
      for (let fe = 0, oe = 0; fe < ee; fe++, oe += 2) {
        const J = B(F.charCodeAt(oe)), $ = B(F.charCodeAt(oe + 1));
        if (J === void 0 || $ === void 0) {
          const ze = F[oe] + F[oe + 1];
          throw new Error('hex string expected, got non-hex character "' + ze + '" at index ' + oe);
        }
        se[fe] = J * 16 + $;
      }
      return se;
    }
    const h = async () => {
    };
    t.nextTick = h;
    async function i(F, Y, ee) {
      let se = Date.now();
      for (let fe = 0; fe < F; fe++) {
        ee(fe);
        const oe = Date.now() - se;
        oe >= 0 && oe < Y || (await (0, t.nextTick)(), se += oe);
      }
    }
    function n(F) {
      if (typeof F != "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(F));
    }
    function A(F) {
      return new TextDecoder().decode(F);
    }
    function _(F) {
      return typeof F == "string" && (F = n(F)), E(F), F;
    }
    function P(F) {
      return typeof F == "string" && (F = n(F)), E(F), F;
    }
    function D(...F) {
      let Y = 0;
      for (let se = 0; se < F.length; se++) {
        const fe = F[se];
        E(fe), Y += fe.length;
      }
      const ee = new Uint8Array(Y);
      for (let se = 0, fe = 0; se < F.length; se++) {
        const oe = F[se];
        ee.set(oe, fe), fe += oe.length;
      }
      return ee;
    }
    function K(F, Y) {
      if (Y !== void 0 && {}.toString.call(Y) !== "[object Object]")
        throw new Error("options should be object or undefined");
      return Object.assign(F, Y);
    }
    class q {
    }
    t.Hash = q;
    function H(F) {
      const Y = (se) => F().update(_(se)).digest(), ee = F();
      return Y.outputLen = ee.outputLen, Y.blockLen = ee.blockLen, Y.create = () => F(), Y;
    }
    function G(F) {
      const Y = (se, fe) => F(fe).update(_(se)).digest(), ee = F({});
      return Y.outputLen = ee.outputLen, Y.blockLen = ee.blockLen, Y.create = (se) => F(se), Y;
    }
    function X(F) {
      const Y = (se, fe) => F(fe).update(_(se)).digest(), ee = F({});
      return Y.outputLen = ee.outputLen, Y.blockLen = ee.blockLen, Y.create = (se) => F(se), Y;
    }
    t.wrapConstructor = H, t.wrapConstructorWithOpts = G, t.wrapXOFConstructorWithOpts = X;
    function Z(F = 32) {
      if (e.crypto && typeof e.crypto.getRandomValues == "function")
        return e.crypto.getRandomValues(new Uint8Array(F));
      if (e.crypto && typeof e.crypto.randomBytes == "function")
        return Uint8Array.from(e.crypto.randomBytes(F));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(tr)), tr;
}
var aa;
function ei() {
  if (aa) return ge;
  aa = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.shake256 = ge.shake128 = ge.keccak_512 = ge.keccak_384 = ge.keccak_256 = ge.keccak_224 = ge.sha3_512 = ge.sha3_384 = ge.sha3_256 = ge.sha3_224 = ge.Keccak = void 0, ge.keccakP = m;
  const t = /* @__PURE__ */ Zn(), e = /* @__PURE__ */ $n(), r = BigInt(0), l = BigInt(1), E = BigInt(2), v = BigInt(7), u = BigInt(256), a = BigInt(113), p = [], f = [], S = [];
  for (let B = 0, b = l, h = 1, i = 0; B < 24; B++) {
    [h, i] = [i, (2 * h + 3 * i) % 5], p.push(2 * (5 * i + h)), f.push((B + 1) * (B + 2) / 2 % 64);
    let n = r;
    for (let A = 0; A < 7; A++)
      b = (b << l ^ (b >> v) * a) % u, b & E && (n ^= l << (l << /* @__PURE__ */ BigInt(A)) - l);
    S.push(n);
  }
  const U = (0, t.split)(S, !0), T = U[0], c = U[1], g = (B, b, h) => h > 32 ? (0, t.rotlBH)(B, b, h) : (0, t.rotlSH)(B, b, h), C = (B, b, h) => h > 32 ? (0, t.rotlBL)(B, b, h) : (0, t.rotlSL)(B, b, h);
  function m(B, b = 24) {
    const h = new Uint32Array(10);
    for (let i = 24 - b; i < 24; i++) {
      for (let _ = 0; _ < 10; _++)
        h[_] = B[_] ^ B[_ + 10] ^ B[_ + 20] ^ B[_ + 30] ^ B[_ + 40];
      for (let _ = 0; _ < 10; _ += 2) {
        const P = (_ + 8) % 10, D = (_ + 2) % 10, K = h[D], q = h[D + 1], H = g(K, q, 1) ^ h[P], G = C(K, q, 1) ^ h[P + 1];
        for (let X = 0; X < 50; X += 10)
          B[_ + X] ^= H, B[_ + X + 1] ^= G;
      }
      let n = B[2], A = B[3];
      for (let _ = 0; _ < 24; _++) {
        const P = f[_], D = g(n, A, P), K = C(n, A, P), q = p[_];
        n = B[q], A = B[q + 1], B[q] = D, B[q + 1] = K;
      }
      for (let _ = 0; _ < 50; _ += 10) {
        for (let P = 0; P < 10; P++)
          h[P] = B[_ + P];
        for (let P = 0; P < 10; P++)
          B[_ + P] ^= ~h[(P + 2) % 10] & h[(P + 4) % 10];
      }
      B[0] ^= T[i], B[1] ^= c[i];
    }
    (0, e.clean)(h);
  }
  class s extends e.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(b, h, i, n = !1, A = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = b, this.suffix = h, this.outputLen = i, this.enableXOF = n, this.rounds = A, (0, e.anumber)(i), !(0 < b && b < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200), this.state32 = (0, e.u32)(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      (0, e.swap32IfBE)(this.state32), m(this.state32, this.rounds), (0, e.swap32IfBE)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(b) {
      (0, e.aexists)(this), b = (0, e.toBytes)(b), (0, e.abytes)(b);
      const { blockLen: h, state: i } = this, n = b.length;
      for (let A = 0; A < n; ) {
        const _ = Math.min(h - this.pos, n - A);
        for (let P = 0; P < _; P++)
          i[this.pos++] ^= b[A++];
        this.pos === h && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: b, suffix: h, pos: i, blockLen: n } = this;
      b[i] ^= h, (h & 128) !== 0 && i === n - 1 && this.keccak(), b[n - 1] ^= 128, this.keccak();
    }
    writeInto(b) {
      (0, e.aexists)(this, !1), (0, e.abytes)(b), this.finish();
      const h = this.state, { blockLen: i } = this;
      for (let n = 0, A = b.length; n < A; ) {
        this.posOut >= i && this.keccak();
        const _ = Math.min(i - this.posOut, A - n);
        b.set(h.subarray(this.posOut, this.posOut + _), n), this.posOut += _, n += _;
      }
      return b;
    }
    xofInto(b) {
      if (!this.enableXOF)
        throw new Error("XOF is not possible for this instance");
      return this.writeInto(b);
    }
    xof(b) {
      return (0, e.anumber)(b), this.xofInto(new Uint8Array(b));
    }
    digestInto(b) {
      if ((0, e.aoutput)(b, this), this.finished)
        throw new Error("digest() was already called");
      return this.writeInto(b), this.destroy(), b;
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      this.destroyed = !0, (0, e.clean)(this.state);
    }
    _cloneInto(b) {
      const { blockLen: h, suffix: i, outputLen: n, rounds: A, enableXOF: _ } = this;
      return b || (b = new s(h, i, n, _, A)), b.state32.set(this.state32), b.pos = this.pos, b.posOut = this.posOut, b.finished = this.finished, b.rounds = A, b.suffix = i, b.outputLen = n, b.enableXOF = _, b.destroyed = this.destroyed, b;
    }
  }
  ge.Keccak = s;
  const d = (B, b, h) => (0, e.createHasher)(() => new s(b, B, h));
  ge.sha3_224 = d(6, 144, 224 / 8), ge.sha3_256 = d(6, 136, 256 / 8), ge.sha3_384 = d(6, 104, 384 / 8), ge.sha3_512 = d(6, 72, 512 / 8), ge.keccak_224 = d(1, 144, 224 / 8), ge.keccak_256 = d(1, 136, 256 / 8), ge.keccak_384 = d(1, 104, 384 / 8), ge.keccak_512 = d(1, 72, 512 / 8);
  const y = (B, b, h) => (0, e.createXOFer)((i = {}) => new s(b, B, i.dkLen === void 0 ? h : i.dkLen, !0));
  return ge.shake128 = y(31, 168, 128 / 8), ge.shake256 = y(31, 136, 256 / 8), ge;
}
var na;
function ti() {
  if (na) return ct;
  na = 1;
  const { sha3_512: t } = /* @__PURE__ */ ei(), e = 24, r = 32, l = (g = 4, C = Math.random) => {
    let m = "";
    for (; m.length < g; )
      m = m + Math.floor(C() * 36).toString(36);
    return m;
  };
  function E(g) {
    let C = 8n, m = 0n;
    for (const s of g.values()) {
      const d = BigInt(s);
      m = (m << C) + d;
    }
    return m;
  }
  const v = (g = "") => E(t(g)).toString(36).slice(1), u = Array.from(
    { length: 26 },
    (g, C) => String.fromCharCode(C + 97)
  ), a = (g) => u[Math.floor(g() * u.length)], p = ({
    globalObj: g = typeof qr < "u" ? qr : typeof window < "u" ? window : {},
    random: C = Math.random
  } = {}) => {
    const m = Object.keys(g).toString(), s = m.length ? m + l(r, C) : l(r, C);
    return v(s).substring(0, r);
  }, f = (g) => () => g++, S = 476782367, U = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: g = Math.random,
    counter: C = f(Math.floor(g() * S)),
    length: m = e,
    fingerprint: s = p({ random: g })
  } = {}) => function() {
    const y = a(g), B = Date.now().toString(36), b = C().toString(36), h = l(m, g), i = `${B + h + b + s}`;
    return `${y + v(i).substring(1, m)}`;
  }, T = U(), c = (g, { minLength: C = 2, maxLength: m = r } = {}) => {
    const s = g.length, d = /^[0-9a-z]+$/;
    try {
      if (typeof g == "string" && s >= C && s <= m && d.test(g))
        return !0;
    } finally {
    }
    return !1;
  };
  return ct.getConstants = () => ({ defaultLength: e, bigLength: r }), ct.init = U, ct.createId = T, ct.bufToBigInt = E, ct.createCounter = f, ct.createFingerprint = p, ct.isCuid = c, ct;
}
var ia;
function ri() {
  if (ia) return Bt;
  ia = 1;
  const { createId: t, init: e, getConstants: r, isCuid: l } = ti();
  return Bt.createId = t, Bt.init = e, Bt.getConstants = r, Bt.isCuid = l, Bt;
}
var ai = ri();
const Xt = {
  enabled: !1,
  modules: {
    crypto: !1,
    request: !1,
    proxy: !1,
    cache: !1,
    auth: !1
  }
}, Yi = (t) => {
  t.enabled !== void 0 && (Xt.enabled = t.enabled), t.modules && Object.assign(Xt.modules, t.modules);
}, sn = (t) => Xt.enabled ? Xt.modules[t] === !0 : !1, it = (t, e, r) => {
  if (!sn(t))
    return;
  const l = `[${t.toUpperCase()}]`;
  r !== void 0 ? console.log(l, e, r) : console.log(l, e);
}, Pt = (t, e, r) => {
  const l = `[${t.toUpperCase()}]`;
  r !== void 0 ? console.error(l, e, r) : console.error(l, e);
};
var rr, sa;
function he() {
  return sa || (sa = 1, rr = {
    // default options
    options: {
      usePureJavaScript: !1
    }
  }), rr;
}
var ar = { exports: {} }, nr, oa;
function ni() {
  if (oa) return nr;
  oa = 1;
  var t = {};
  nr = t;
  var e = {};
  t.encode = function(l, E, v) {
    if (typeof E != "string")
      throw new TypeError('"alphabet" must be a string.');
    if (v !== void 0 && typeof v != "number")
      throw new TypeError('"maxline" must be a number.');
    var u = "";
    if (!(l instanceof Uint8Array))
      u = r(l, E);
    else {
      var a = 0, p = E.length, f = E.charAt(0), S = [0];
      for (a = 0; a < l.length; ++a) {
        for (var U = 0, T = l[a]; U < S.length; ++U)
          T += S[U] << 8, S[U] = T % p, T = T / p | 0;
        for (; T > 0; )
          S.push(T % p), T = T / p | 0;
      }
      for (a = 0; l[a] === 0 && a < l.length - 1; ++a)
        u += f;
      for (a = S.length - 1; a >= 0; --a)
        u += E[S[a]];
    }
    if (v) {
      var c = new RegExp(".{1," + v + "}", "g");
      u = u.match(c).join(`\r
`);
    }
    return u;
  }, t.decode = function(l, E) {
    if (typeof l != "string")
      throw new TypeError('"input" must be a string.');
    if (typeof E != "string")
      throw new TypeError('"alphabet" must be a string.');
    var v = e[E];
    if (!v) {
      v = e[E] = [];
      for (var u = 0; u < E.length; ++u)
        v[E.charCodeAt(u)] = u;
    }
    l = l.replace(/\s/g, "");
    for (var a = E.length, p = E.charAt(0), f = [0], u = 0; u < l.length; u++) {
      var S = v[l.charCodeAt(u)];
      if (S === void 0)
        return;
      for (var U = 0, T = S; U < f.length; ++U)
        T += f[U] * a, f[U] = T & 255, T >>= 8;
      for (; T > 0; )
        f.push(T & 255), T >>= 8;
    }
    for (var c = 0; l[c] === p && c < l.length - 1; ++c)
      f.push(0);
    return typeof Buffer < "u" ? Buffer.from(f.reverse()) : new Uint8Array(f.reverse());
  };
  function r(l, E) {
    var v = 0, u = E.length, a = E.charAt(0), p = [0];
    for (v = 0; v < l.length(); ++v) {
      for (var f = 0, S = l.at(v); f < p.length; ++f)
        S += p[f] << 8, p[f] = S % u, S = S / u | 0;
      for (; S > 0; )
        p.push(S % u), S = S / u | 0;
    }
    var U = "";
    for (v = 0; l.at(v) === 0 && v < l.length() - 1; ++v)
      U += a;
    for (v = p.length - 1; v >= 0; --v)
      U += E[p[v]];
    return U;
  }
  return nr;
}
var ua;
function pe() {
  if (ua) return ar.exports;
  ua = 1;
  var t = he(), e = ni(), r = ar.exports = t.util = t.util || {};
  (function() {
    if (typeof process < "u" && process.nextTick && !process.browser) {
      r.nextTick = process.nextTick, typeof setImmediate == "function" ? r.setImmediate = setImmediate : r.setImmediate = r.nextTick;
      return;
    }
    if (typeof setImmediate == "function") {
      r.setImmediate = function() {
        return setImmediate.apply(void 0, arguments);
      }, r.nextTick = function(i) {
        return setImmediate(i);
      };
      return;
    }
    if (r.setImmediate = function(i) {
      setTimeout(i, 0);
    }, typeof window < "u" && typeof window.postMessage == "function") {
      let i = function(n) {
        if (n.source === window && n.data === s) {
          n.stopPropagation();
          var A = d.slice();
          d.length = 0, A.forEach(function(_) {
            _();
          });
        }
      };
      var s = "forge.setImmediate", d = [];
      r.setImmediate = function(n) {
        d.push(n), d.length === 1 && window.postMessage(s, "*");
      }, window.addEventListener("message", i, !0);
    }
    if (typeof MutationObserver < "u") {
      var y = Date.now(), B = !0, b = document.createElement("div"), d = [];
      new MutationObserver(function() {
        var n = d.slice();
        d.length = 0, n.forEach(function(A) {
          A();
        });
      }).observe(b, { attributes: !0 });
      var h = r.setImmediate;
      r.setImmediate = function(n) {
        Date.now() - y > 15 ? (y = Date.now(), h(n)) : (d.push(n), d.length === 1 && b.setAttribute("a", B = !B));
      };
    }
    r.nextTick = r.setImmediate;
  })(), r.isNodejs = typeof process < "u" && process.versions && process.versions.node, r.globalScope = (function() {
    return r.isNodejs ? qr : typeof self > "u" ? window : self;
  })(), r.isArray = Array.isArray || function(s) {
    return Object.prototype.toString.call(s) === "[object Array]";
  }, r.isArrayBuffer = function(s) {
    return typeof ArrayBuffer < "u" && s instanceof ArrayBuffer;
  }, r.isArrayBufferView = function(s) {
    return s && r.isArrayBuffer(s.buffer) && s.byteLength !== void 0;
  };
  function l(s) {
    if (!(s === 8 || s === 16 || s === 24 || s === 32))
      throw new Error("Only 8, 16, 24, or 32 bits supported: " + s);
  }
  r.ByteBuffer = E;
  function E(s) {
    if (this.data = "", this.read = 0, typeof s == "string")
      this.data = s;
    else if (r.isArrayBuffer(s) || r.isArrayBufferView(s))
      if (typeof Buffer < "u" && s instanceof Buffer)
        this.data = s.toString("binary");
      else {
        var d = new Uint8Array(s);
        try {
          this.data = String.fromCharCode.apply(null, d);
        } catch {
          for (var y = 0; y < d.length; ++y)
            this.putByte(d[y]);
        }
      }
    else (s instanceof E || typeof s == "object" && typeof s.data == "string" && typeof s.read == "number") && (this.data = s.data, this.read = s.read);
    this._constructedStringLength = 0;
  }
  r.ByteStringBuffer = E;
  var v = 4096;
  r.ByteStringBuffer.prototype._optimizeConstructedString = function(s) {
    this._constructedStringLength += s, this._constructedStringLength > v && (this.data.substr(0, 1), this._constructedStringLength = 0);
  }, r.ByteStringBuffer.prototype.length = function() {
    return this.data.length - this.read;
  }, r.ByteStringBuffer.prototype.isEmpty = function() {
    return this.length() <= 0;
  }, r.ByteStringBuffer.prototype.putByte = function(s) {
    return this.putBytes(String.fromCharCode(s));
  }, r.ByteStringBuffer.prototype.fillWithByte = function(s, d) {
    s = String.fromCharCode(s);
    for (var y = this.data; d > 0; )
      d & 1 && (y += s), d >>>= 1, d > 0 && (s += s);
    return this.data = y, this._optimizeConstructedString(d), this;
  }, r.ByteStringBuffer.prototype.putBytes = function(s) {
    return this.data += s, this._optimizeConstructedString(s.length), this;
  }, r.ByteStringBuffer.prototype.putString = function(s) {
    return this.putBytes(r.encodeUtf8(s));
  }, r.ByteStringBuffer.prototype.putInt16 = function(s) {
    return this.putBytes(
      String.fromCharCode(s >> 8 & 255) + String.fromCharCode(s & 255)
    );
  }, r.ByteStringBuffer.prototype.putInt24 = function(s) {
    return this.putBytes(
      String.fromCharCode(s >> 16 & 255) + String.fromCharCode(s >> 8 & 255) + String.fromCharCode(s & 255)
    );
  }, r.ByteStringBuffer.prototype.putInt32 = function(s) {
    return this.putBytes(
      String.fromCharCode(s >> 24 & 255) + String.fromCharCode(s >> 16 & 255) + String.fromCharCode(s >> 8 & 255) + String.fromCharCode(s & 255)
    );
  }, r.ByteStringBuffer.prototype.putInt16Le = function(s) {
    return this.putBytes(
      String.fromCharCode(s & 255) + String.fromCharCode(s >> 8 & 255)
    );
  }, r.ByteStringBuffer.prototype.putInt24Le = function(s) {
    return this.putBytes(
      String.fromCharCode(s & 255) + String.fromCharCode(s >> 8 & 255) + String.fromCharCode(s >> 16 & 255)
    );
  }, r.ByteStringBuffer.prototype.putInt32Le = function(s) {
    return this.putBytes(
      String.fromCharCode(s & 255) + String.fromCharCode(s >> 8 & 255) + String.fromCharCode(s >> 16 & 255) + String.fromCharCode(s >> 24 & 255)
    );
  }, r.ByteStringBuffer.prototype.putInt = function(s, d) {
    l(d);
    var y = "";
    do
      d -= 8, y += String.fromCharCode(s >> d & 255);
    while (d > 0);
    return this.putBytes(y);
  }, r.ByteStringBuffer.prototype.putSignedInt = function(s, d) {
    return s < 0 && (s += 2 << d - 1), this.putInt(s, d);
  }, r.ByteStringBuffer.prototype.putBuffer = function(s) {
    return this.putBytes(s.getBytes());
  }, r.ByteStringBuffer.prototype.getByte = function() {
    return this.data.charCodeAt(this.read++);
  }, r.ByteStringBuffer.prototype.getInt16 = function() {
    var s = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
    return this.read += 2, s;
  }, r.ByteStringBuffer.prototype.getInt24 = function() {
    var s = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
    return this.read += 3, s;
  }, r.ByteStringBuffer.prototype.getInt32 = function() {
    var s = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
    return this.read += 4, s;
  }, r.ByteStringBuffer.prototype.getInt16Le = function() {
    var s = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
    return this.read += 2, s;
  }, r.ByteStringBuffer.prototype.getInt24Le = function() {
    var s = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
    return this.read += 3, s;
  }, r.ByteStringBuffer.prototype.getInt32Le = function() {
    var s = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
    return this.read += 4, s;
  }, r.ByteStringBuffer.prototype.getInt = function(s) {
    l(s);
    var d = 0;
    do
      d = (d << 8) + this.data.charCodeAt(this.read++), s -= 8;
    while (s > 0);
    return d;
  }, r.ByteStringBuffer.prototype.getSignedInt = function(s) {
    var d = this.getInt(s), y = 2 << s - 2;
    return d >= y && (d -= y << 1), d;
  }, r.ByteStringBuffer.prototype.getBytes = function(s) {
    var d;
    return s ? (s = Math.min(this.length(), s), d = this.data.slice(this.read, this.read + s), this.read += s) : s === 0 ? d = "" : (d = this.read === 0 ? this.data : this.data.slice(this.read), this.clear()), d;
  }, r.ByteStringBuffer.prototype.bytes = function(s) {
    return typeof s > "u" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + s);
  }, r.ByteStringBuffer.prototype.at = function(s) {
    return this.data.charCodeAt(this.read + s);
  }, r.ByteStringBuffer.prototype.setAt = function(s, d) {
    return this.data = this.data.substr(0, this.read + s) + String.fromCharCode(d) + this.data.substr(this.read + s + 1), this;
  }, r.ByteStringBuffer.prototype.last = function() {
    return this.data.charCodeAt(this.data.length - 1);
  }, r.ByteStringBuffer.prototype.copy = function() {
    var s = r.createBuffer(this.data);
    return s.read = this.read, s;
  }, r.ByteStringBuffer.prototype.compact = function() {
    return this.read > 0 && (this.data = this.data.slice(this.read), this.read = 0), this;
  }, r.ByteStringBuffer.prototype.clear = function() {
    return this.data = "", this.read = 0, this;
  }, r.ByteStringBuffer.prototype.truncate = function(s) {
    var d = Math.max(0, this.length() - s);
    return this.data = this.data.substr(this.read, d), this.read = 0, this;
  }, r.ByteStringBuffer.prototype.toHex = function() {
    for (var s = "", d = this.read; d < this.data.length; ++d) {
      var y = this.data.charCodeAt(d);
      y < 16 && (s += "0"), s += y.toString(16);
    }
    return s;
  }, r.ByteStringBuffer.prototype.toString = function() {
    return r.decodeUtf8(this.bytes());
  };
  function u(s, d) {
    d = d || {}, this.read = d.readOffset || 0, this.growSize = d.growSize || 1024;
    var y = r.isArrayBuffer(s), B = r.isArrayBufferView(s);
    if (y || B) {
      y ? this.data = new DataView(s) : this.data = new DataView(s.buffer, s.byteOffset, s.byteLength), this.write = "writeOffset" in d ? d.writeOffset : this.data.byteLength;
      return;
    }
    this.data = new DataView(new ArrayBuffer(0)), this.write = 0, s != null && this.putBytes(s), "writeOffset" in d && (this.write = d.writeOffset);
  }
  r.DataBuffer = u, r.DataBuffer.prototype.length = function() {
    return this.write - this.read;
  }, r.DataBuffer.prototype.isEmpty = function() {
    return this.length() <= 0;
  }, r.DataBuffer.prototype.accommodate = function(s, d) {
    if (this.length() >= s)
      return this;
    d = Math.max(d || this.growSize, s);
    var y = new Uint8Array(
      this.data.buffer,
      this.data.byteOffset,
      this.data.byteLength
    ), B = new Uint8Array(this.length() + d);
    return B.set(y), this.data = new DataView(B.buffer), this;
  }, r.DataBuffer.prototype.putByte = function(s) {
    return this.accommodate(1), this.data.setUint8(this.write++, s), this;
  }, r.DataBuffer.prototype.fillWithByte = function(s, d) {
    this.accommodate(d);
    for (var y = 0; y < d; ++y)
      this.data.setUint8(s);
    return this;
  }, r.DataBuffer.prototype.putBytes = function(s, d) {
    if (r.isArrayBufferView(s)) {
      var y = new Uint8Array(s.buffer, s.byteOffset, s.byteLength), B = y.byteLength - y.byteOffset;
      this.accommodate(B);
      var b = new Uint8Array(this.data.buffer, this.write);
      return b.set(y), this.write += B, this;
    }
    if (r.isArrayBuffer(s)) {
      var y = new Uint8Array(s);
      this.accommodate(y.byteLength);
      var b = new Uint8Array(this.data.buffer);
      return b.set(y, this.write), this.write += y.byteLength, this;
    }
    if (s instanceof r.DataBuffer || typeof s == "object" && typeof s.read == "number" && typeof s.write == "number" && r.isArrayBufferView(s.data)) {
      var y = new Uint8Array(s.data.byteLength, s.read, s.length());
      this.accommodate(y.byteLength);
      var b = new Uint8Array(s.data.byteLength, this.write);
      return b.set(y), this.write += y.byteLength, this;
    }
    if (s instanceof r.ByteStringBuffer && (s = s.data, d = "binary"), d = d || "binary", typeof s == "string") {
      var h;
      if (d === "hex")
        return this.accommodate(Math.ceil(s.length / 2)), h = new Uint8Array(this.data.buffer, this.write), this.write += r.binary.hex.decode(s, h, this.write), this;
      if (d === "base64")
        return this.accommodate(Math.ceil(s.length / 4) * 3), h = new Uint8Array(this.data.buffer, this.write), this.write += r.binary.base64.decode(s, h, this.write), this;
      if (d === "utf8" && (s = r.encodeUtf8(s), d = "binary"), d === "binary" || d === "raw")
        return this.accommodate(s.length), h = new Uint8Array(this.data.buffer, this.write), this.write += r.binary.raw.decode(h), this;
      if (d === "utf16")
        return this.accommodate(s.length * 2), h = new Uint16Array(this.data.buffer, this.write), this.write += r.text.utf16.encode(h), this;
      throw new Error("Invalid encoding: " + d);
    }
    throw Error("Invalid parameter: " + s);
  }, r.DataBuffer.prototype.putBuffer = function(s) {
    return this.putBytes(s), s.clear(), this;
  }, r.DataBuffer.prototype.putString = function(s) {
    return this.putBytes(s, "utf16");
  }, r.DataBuffer.prototype.putInt16 = function(s) {
    return this.accommodate(2), this.data.setInt16(this.write, s), this.write += 2, this;
  }, r.DataBuffer.prototype.putInt24 = function(s) {
    return this.accommodate(3), this.data.setInt16(this.write, s >> 8 & 65535), this.data.setInt8(this.write, s >> 16 & 255), this.write += 3, this;
  }, r.DataBuffer.prototype.putInt32 = function(s) {
    return this.accommodate(4), this.data.setInt32(this.write, s), this.write += 4, this;
  }, r.DataBuffer.prototype.putInt16Le = function(s) {
    return this.accommodate(2), this.data.setInt16(this.write, s, !0), this.write += 2, this;
  }, r.DataBuffer.prototype.putInt24Le = function(s) {
    return this.accommodate(3), this.data.setInt8(this.write, s >> 16 & 255), this.data.setInt16(this.write, s >> 8 & 65535, !0), this.write += 3, this;
  }, r.DataBuffer.prototype.putInt32Le = function(s) {
    return this.accommodate(4), this.data.setInt32(this.write, s, !0), this.write += 4, this;
  }, r.DataBuffer.prototype.putInt = function(s, d) {
    l(d), this.accommodate(d / 8);
    do
      d -= 8, this.data.setInt8(this.write++, s >> d & 255);
    while (d > 0);
    return this;
  }, r.DataBuffer.prototype.putSignedInt = function(s, d) {
    return l(d), this.accommodate(d / 8), s < 0 && (s += 2 << d - 1), this.putInt(s, d);
  }, r.DataBuffer.prototype.getByte = function() {
    return this.data.getInt8(this.read++);
  }, r.DataBuffer.prototype.getInt16 = function() {
    var s = this.data.getInt16(this.read);
    return this.read += 2, s;
  }, r.DataBuffer.prototype.getInt24 = function() {
    var s = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
    return this.read += 3, s;
  }, r.DataBuffer.prototype.getInt32 = function() {
    var s = this.data.getInt32(this.read);
    return this.read += 4, s;
  }, r.DataBuffer.prototype.getInt16Le = function() {
    var s = this.data.getInt16(this.read, !0);
    return this.read += 2, s;
  }, r.DataBuffer.prototype.getInt24Le = function() {
    var s = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, !0) << 8;
    return this.read += 3, s;
  }, r.DataBuffer.prototype.getInt32Le = function() {
    var s = this.data.getInt32(this.read, !0);
    return this.read += 4, s;
  }, r.DataBuffer.prototype.getInt = function(s) {
    l(s);
    var d = 0;
    do
      d = (d << 8) + this.data.getInt8(this.read++), s -= 8;
    while (s > 0);
    return d;
  }, r.DataBuffer.prototype.getSignedInt = function(s) {
    var d = this.getInt(s), y = 2 << s - 2;
    return d >= y && (d -= y << 1), d;
  }, r.DataBuffer.prototype.getBytes = function(s) {
    var d;
    return s ? (s = Math.min(this.length(), s), d = this.data.slice(this.read, this.read + s), this.read += s) : s === 0 ? d = "" : (d = this.read === 0 ? this.data : this.data.slice(this.read), this.clear()), d;
  }, r.DataBuffer.prototype.bytes = function(s) {
    return typeof s > "u" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + s);
  }, r.DataBuffer.prototype.at = function(s) {
    return this.data.getUint8(this.read + s);
  }, r.DataBuffer.prototype.setAt = function(s, d) {
    return this.data.setUint8(s, d), this;
  }, r.DataBuffer.prototype.last = function() {
    return this.data.getUint8(this.write - 1);
  }, r.DataBuffer.prototype.copy = function() {
    return new r.DataBuffer(this);
  }, r.DataBuffer.prototype.compact = function() {
    if (this.read > 0) {
      var s = new Uint8Array(this.data.buffer, this.read), d = new Uint8Array(s.byteLength);
      d.set(s), this.data = new DataView(d), this.write -= this.read, this.read = 0;
    }
    return this;
  }, r.DataBuffer.prototype.clear = function() {
    return this.data = new DataView(new ArrayBuffer(0)), this.read = this.write = 0, this;
  }, r.DataBuffer.prototype.truncate = function(s) {
    return this.write = Math.max(0, this.length() - s), this.read = Math.min(this.read, this.write), this;
  }, r.DataBuffer.prototype.toHex = function() {
    for (var s = "", d = this.read; d < this.data.byteLength; ++d) {
      var y = this.data.getUint8(d);
      y < 16 && (s += "0"), s += y.toString(16);
    }
    return s;
  }, r.DataBuffer.prototype.toString = function(s) {
    var d = new Uint8Array(this.data, this.read, this.length());
    if (s = s || "utf8", s === "binary" || s === "raw")
      return r.binary.raw.encode(d);
    if (s === "hex")
      return r.binary.hex.encode(d);
    if (s === "base64")
      return r.binary.base64.encode(d);
    if (s === "utf8")
      return r.text.utf8.decode(d);
    if (s === "utf16")
      return r.text.utf16.decode(d);
    throw new Error("Invalid encoding: " + s);
  }, r.createBuffer = function(s, d) {
    return d = d || "raw", s !== void 0 && d === "utf8" && (s = r.encodeUtf8(s)), new r.ByteBuffer(s);
  }, r.fillString = function(s, d) {
    for (var y = ""; d > 0; )
      d & 1 && (y += s), d >>>= 1, d > 0 && (s += s);
    return y;
  }, r.xorBytes = function(s, d, y) {
    for (var B = "", b = "", h = "", i = 0, n = 0; y > 0; --y, ++i)
      b = s.charCodeAt(i) ^ d.charCodeAt(i), n >= 10 && (B += h, h = "", n = 0), h += String.fromCharCode(b), ++n;
    return B += h, B;
  }, r.hexToBytes = function(s) {
    var d = "", y = 0;
    for (s.length & !0 && (y = 1, d += String.fromCharCode(parseInt(s[0], 16))); y < s.length; y += 2)
      d += String.fromCharCode(parseInt(s.substr(y, 2), 16));
    return d;
  }, r.bytesToHex = function(s) {
    return r.createBuffer(s).toHex();
  }, r.int32ToBytes = function(s) {
    return String.fromCharCode(s >> 24 & 255) + String.fromCharCode(s >> 16 & 255) + String.fromCharCode(s >> 8 & 255) + String.fromCharCode(s & 255);
  };
  var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", p = [
    /*43 -43 = 0*/
    /*'+',  1,  2,  3,'/' */
    62,
    -1,
    -1,
    -1,
    63,
    /*'0','1','2','3','4','5','6','7','8','9' */
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    /*15, 16, 17,'=', 19, 20, 21 */
    -1,
    -1,
    -1,
    64,
    -1,
    -1,
    -1,
    /*65 - 43 = 22*/
    /*'A','B','C','D','E','F','G','H','I','J','K','L','M', */
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    /*'N','O','P','Q','R','S','T','U','V','W','X','Y','Z' */
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    /*91 - 43 = 48 */
    /*48, 49, 50, 51, 52, 53 */
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    /*97 - 43 = 54*/
    /*'a','b','c','d','e','f','g','h','i','j','k','l','m' */
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    /*'n','o','p','q','r','s','t','u','v','w','x','y','z' */
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ], f = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  r.encode64 = function(s, d) {
    for (var y = "", B = "", b, h, i, n = 0; n < s.length; )
      b = s.charCodeAt(n++), h = s.charCodeAt(n++), i = s.charCodeAt(n++), y += a.charAt(b >> 2), y += a.charAt((b & 3) << 4 | h >> 4), isNaN(h) ? y += "==" : (y += a.charAt((h & 15) << 2 | i >> 6), y += isNaN(i) ? "=" : a.charAt(i & 63)), d && y.length > d && (B += y.substr(0, d) + `\r
`, y = y.substr(d));
    return B += y, B;
  }, r.decode64 = function(s) {
    s = s.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    for (var d = "", y, B, b, h, i = 0; i < s.length; )
      y = p[s.charCodeAt(i++) - 43], B = p[s.charCodeAt(i++) - 43], b = p[s.charCodeAt(i++) - 43], h = p[s.charCodeAt(i++) - 43], d += String.fromCharCode(y << 2 | B >> 4), b !== 64 && (d += String.fromCharCode((B & 15) << 4 | b >> 2), h !== 64 && (d += String.fromCharCode((b & 3) << 6 | h)));
    return d;
  }, r.encodeUtf8 = function(s) {
    return unescape(encodeURIComponent(s));
  }, r.decodeUtf8 = function(s) {
    return decodeURIComponent(escape(s));
  }, r.binary = {
    raw: {},
    hex: {},
    base64: {},
    base58: {},
    baseN: {
      encode: e.encode,
      decode: e.decode
    }
  }, r.binary.raw.encode = function(s) {
    return String.fromCharCode.apply(null, s);
  }, r.binary.raw.decode = function(s, d, y) {
    var B = d;
    B || (B = new Uint8Array(s.length)), y = y || 0;
    for (var b = y, h = 0; h < s.length; ++h)
      B[b++] = s.charCodeAt(h);
    return d ? b - y : B;
  }, r.binary.hex.encode = r.bytesToHex, r.binary.hex.decode = function(s, d, y) {
    var B = d;
    B || (B = new Uint8Array(Math.ceil(s.length / 2))), y = y || 0;
    var b = 0, h = y;
    for (s.length & 1 && (b = 1, B[h++] = parseInt(s[0], 16)); b < s.length; b += 2)
      B[h++] = parseInt(s.substr(b, 2), 16);
    return d ? h - y : B;
  }, r.binary.base64.encode = function(s, d) {
    for (var y = "", B = "", b, h, i, n = 0; n < s.byteLength; )
      b = s[n++], h = s[n++], i = s[n++], y += a.charAt(b >> 2), y += a.charAt((b & 3) << 4 | h >> 4), isNaN(h) ? y += "==" : (y += a.charAt((h & 15) << 2 | i >> 6), y += isNaN(i) ? "=" : a.charAt(i & 63)), d && y.length > d && (B += y.substr(0, d) + `\r
`, y = y.substr(d));
    return B += y, B;
  }, r.binary.base64.decode = function(s, d, y) {
    var B = d;
    B || (B = new Uint8Array(Math.ceil(s.length / 4) * 3)), s = s.replace(/[^A-Za-z0-9\+\/\=]/g, ""), y = y || 0;
    for (var b, h, i, n, A = 0, _ = y; A < s.length; )
      b = p[s.charCodeAt(A++) - 43], h = p[s.charCodeAt(A++) - 43], i = p[s.charCodeAt(A++) - 43], n = p[s.charCodeAt(A++) - 43], B[_++] = b << 2 | h >> 4, i !== 64 && (B[_++] = (h & 15) << 4 | i >> 2, n !== 64 && (B[_++] = (i & 3) << 6 | n));
    return d ? _ - y : B.subarray(0, _);
  }, r.binary.base58.encode = function(s, d) {
    return r.binary.baseN.encode(s, f, d);
  }, r.binary.base58.decode = function(s, d) {
    return r.binary.baseN.decode(s, f, d);
  }, r.text = {
    utf8: {},
    utf16: {}
  }, r.text.utf8.encode = function(s, d, y) {
    s = r.encodeUtf8(s);
    var B = d;
    B || (B = new Uint8Array(s.length)), y = y || 0;
    for (var b = y, h = 0; h < s.length; ++h)
      B[b++] = s.charCodeAt(h);
    return d ? b - y : B;
  }, r.text.utf8.decode = function(s) {
    return r.decodeUtf8(String.fromCharCode.apply(null, s));
  }, r.text.utf16.encode = function(s, d, y) {
    var B = d;
    B || (B = new Uint8Array(s.length * 2));
    var b = new Uint16Array(B.buffer);
    y = y || 0;
    for (var h = y, i = y, n = 0; n < s.length; ++n)
      b[i++] = s.charCodeAt(n), h += 2;
    return d ? h - y : B;
  }, r.text.utf16.decode = function(s) {
    return String.fromCharCode.apply(null, new Uint16Array(s.buffer));
  }, r.deflate = function(s, d, y) {
    if (d = r.decode64(s.deflate(r.encode64(d)).rval), y) {
      var B = 2, b = d.charCodeAt(1);
      b & 32 && (B = 6), d = d.substring(B, d.length - 4);
    }
    return d;
  }, r.inflate = function(s, d, y) {
    var B = s.inflate(r.encode64(d)).rval;
    return B === null ? null : r.decode64(B);
  };
  var S = function(s, d, y) {
    if (!s)
      throw new Error("WebStorage not available.");
    var B;
    if (y === null ? B = s.removeItem(d) : (y = r.encode64(JSON.stringify(y)), B = s.setItem(d, y)), typeof B < "u" && B.rval !== !0) {
      var b = new Error(B.error.message);
      throw b.id = B.error.id, b.name = B.error.name, b;
    }
  }, U = function(s, d) {
    if (!s)
      throw new Error("WebStorage not available.");
    var y = s.getItem(d);
    if (s.init)
      if (y.rval === null) {
        if (y.error) {
          var B = new Error(y.error.message);
          throw B.id = y.error.id, B.name = y.error.name, B;
        }
        y = null;
      } else
        y = y.rval;
    return y !== null && (y = JSON.parse(r.decode64(y))), y;
  }, T = function(s, d, y, B) {
    var b = U(s, d);
    b === null && (b = {}), b[y] = B, S(s, d, b);
  }, c = function(s, d, y) {
    var B = U(s, d);
    return B !== null && (B = y in B ? B[y] : null), B;
  }, g = function(s, d, y) {
    var B = U(s, d);
    if (B !== null && y in B) {
      delete B[y];
      var b = !0;
      for (var h in B) {
        b = !1;
        break;
      }
      b && (B = null), S(s, d, B);
    }
  }, C = function(s, d) {
    S(s, d, null);
  }, m = function(s, d, y) {
    var B = null;
    typeof y > "u" && (y = ["web", "flash"]);
    var b, h = !1, i = null;
    for (var n in y) {
      b = y[n];
      try {
        if (b === "flash" || b === "both") {
          if (d[0] === null)
            throw new Error("Flash local storage not available.");
          B = s.apply(this, d), h = b === "flash";
        }
        (b === "web" || b === "both") && (d[0] = localStorage, B = s.apply(this, d), h = !0);
      } catch (A) {
        i = A;
      }
      if (h)
        break;
    }
    if (!h)
      throw i;
    return B;
  };
  return r.setItem = function(s, d, y, B, b) {
    m(T, arguments, b);
  }, r.getItem = function(s, d, y, B) {
    return m(c, arguments, B);
  }, r.removeItem = function(s, d, y, B) {
    m(g, arguments, B);
  }, r.clearItems = function(s, d, y) {
    m(C, arguments, y);
  }, r.isEmpty = function(s) {
    for (var d in s)
      if (s.hasOwnProperty(d))
        return !1;
    return !0;
  }, r.format = function(s) {
    for (var d = /%./g, y, B, b = 0, h = [], i = 0; y = d.exec(s); ) {
      B = s.substring(i, d.lastIndex - 2), B.length > 0 && h.push(B), i = d.lastIndex;
      var n = y[0][1];
      switch (n) {
        case "s":
        case "o":
          b < arguments.length ? h.push(arguments[b++ + 1]) : h.push("<?>");
          break;
        // FIXME: do proper formatting for numbers, etc
        //case 'f':
        //case 'd':
        case "%":
          h.push("%");
          break;
        default:
          h.push("<%" + n + "?>");
      }
    }
    return h.push(s.substring(i)), h.join("");
  }, r.formatNumber = function(s, d, y, B) {
    var b = s, h = isNaN(d = Math.abs(d)) ? 2 : d, i = y === void 0 ? "," : y, n = B === void 0 ? "." : B, A = b < 0 ? "-" : "", _ = parseInt(b = Math.abs(+b || 0).toFixed(h), 10) + "", P = _.length > 3 ? _.length % 3 : 0;
    return A + (P ? _.substr(0, P) + n : "") + _.substr(P).replace(/(\d{3})(?=\d)/g, "$1" + n) + (h ? i + Math.abs(b - _).toFixed(h).slice(2) : "");
  }, r.formatSize = function(s) {
    return s >= 1073741824 ? s = r.formatNumber(s / 1073741824, 2, ".", "") + " GiB" : s >= 1048576 ? s = r.formatNumber(s / 1048576, 2, ".", "") + " MiB" : s >= 1024 ? s = r.formatNumber(s / 1024, 0) + " KiB" : s = r.formatNumber(s, 0) + " bytes", s;
  }, r.bytesFromIP = function(s) {
    return s.indexOf(".") !== -1 ? r.bytesFromIPv4(s) : s.indexOf(":") !== -1 ? r.bytesFromIPv6(s) : null;
  }, r.bytesFromIPv4 = function(s) {
    if (s = s.split("."), s.length !== 4)
      return null;
    for (var d = r.createBuffer(), y = 0; y < s.length; ++y) {
      var B = parseInt(s[y], 10);
      if (isNaN(B))
        return null;
      d.putByte(B);
    }
    return d.getBytes();
  }, r.bytesFromIPv6 = function(s) {
    var d = 0;
    s = s.split(":").filter(function(i) {
      return i.length === 0 && ++d, !0;
    });
    for (var y = (8 - s.length + d) * 2, B = r.createBuffer(), b = 0; b < 8; ++b) {
      if (!s[b] || s[b].length === 0) {
        B.fillWithByte(0, y), y = 0;
        continue;
      }
      var h = r.hexToBytes(s[b]);
      h.length < 2 && B.putByte(0), B.putBytes(h);
    }
    return B.getBytes();
  }, r.bytesToIP = function(s) {
    return s.length === 4 ? r.bytesToIPv4(s) : s.length === 16 ? r.bytesToIPv6(s) : null;
  }, r.bytesToIPv4 = function(s) {
    if (s.length !== 4)
      return null;
    for (var d = [], y = 0; y < s.length; ++y)
      d.push(s.charCodeAt(y));
    return d.join(".");
  }, r.bytesToIPv6 = function(s) {
    if (s.length !== 16)
      return null;
    for (var d = [], y = [], B = 0, b = 0; b < s.length; b += 2) {
      for (var h = r.bytesToHex(s[b] + s[b + 1]); h[0] === "0" && h !== "0"; )
        h = h.substr(1);
      if (h === "0") {
        var i = y[y.length - 1], n = d.length;
        !i || n !== i.end + 1 ? y.push({ start: n, end: n }) : (i.end = n, i.end - i.start > y[B].end - y[B].start && (B = y.length - 1));
      }
      d.push(h);
    }
    if (y.length > 0) {
      var A = y[B];
      A.end - A.start > 0 && (d.splice(A.start, A.end - A.start + 1, ""), A.start === 0 && d.unshift(""), A.end === 7 && d.push(""));
    }
    return d.join(":");
  }, r.estimateCores = function(s, d) {
    if (typeof s == "function" && (d = s, s = {}), s = s || {}, "cores" in r && !s.update)
      return d(null, r.cores);
    if (typeof navigator < "u" && "hardwareConcurrency" in navigator && navigator.hardwareConcurrency > 0)
      return r.cores = navigator.hardwareConcurrency, d(null, r.cores);
    if (typeof Worker > "u")
      return r.cores = 1, d(null, r.cores);
    if (typeof Blob > "u")
      return r.cores = 2, d(null, r.cores);
    var y = URL.createObjectURL(new Blob([
      "(",
      (function() {
        self.addEventListener("message", function(i) {
          var n = Date.now(), A = n + 4;
          self.postMessage({ st: n, et: A });
        });
      }).toString(),
      ")()"
    ], { type: "application/javascript" }));
    B([], 5, 16);
    function B(i, n, A) {
      if (n === 0) {
        var _ = Math.floor(i.reduce(function(P, D) {
          return P + D;
        }, 0) / i.length);
        return r.cores = Math.max(1, _), URL.revokeObjectURL(y), d(null, r.cores);
      }
      b(A, function(P, D) {
        i.push(h(A, D)), B(i, n - 1, A);
      });
    }
    function b(i, n) {
      for (var A = [], _ = [], P = 0; P < i; ++P) {
        var D = new Worker(y);
        D.addEventListener("message", function(K) {
          if (_.push(K.data), _.length === i) {
            for (var q = 0; q < i; ++q)
              A[q].terminate();
            n(null, _);
          }
        }), A.push(D);
      }
      for (var P = 0; P < i; ++P)
        A[P].postMessage(P);
    }
    function h(i, n) {
      for (var A = [], _ = 0; _ < i; ++_)
        for (var P = n[_], D = A[_] = [], K = 0; K < i; ++K)
          if (_ !== K) {
            var q = n[K];
            (P.st > q.st && P.st < q.et || q.st > P.st && q.st < P.et) && D.push(K);
          }
      return A.reduce(function(H, G) {
        return Math.max(H, G.length);
      }, 0);
    }
  }, ar.exports;
}
var ir, la;
function Yr() {
  if (la) return ir;
  la = 1;
  var t = he();
  pe(), ir = t.cipher = t.cipher || {}, t.cipher.algorithms = t.cipher.algorithms || {}, t.cipher.createCipher = function(r, l) {
    var E = r;
    if (typeof E == "string" && (E = t.cipher.getAlgorithm(E), E && (E = E())), !E)
      throw new Error("Unsupported algorithm: " + r);
    return new t.cipher.BlockCipher({
      algorithm: E,
      key: l,
      decrypt: !1
    });
  }, t.cipher.createDecipher = function(r, l) {
    var E = r;
    if (typeof E == "string" && (E = t.cipher.getAlgorithm(E), E && (E = E())), !E)
      throw new Error("Unsupported algorithm: " + r);
    return new t.cipher.BlockCipher({
      algorithm: E,
      key: l,
      decrypt: !0
    });
  }, t.cipher.registerAlgorithm = function(r, l) {
    r = r.toUpperCase(), t.cipher.algorithms[r] = l;
  }, t.cipher.getAlgorithm = function(r) {
    return r = r.toUpperCase(), r in t.cipher.algorithms ? t.cipher.algorithms[r] : null;
  };
  var e = t.cipher.BlockCipher = function(r) {
    this.algorithm = r.algorithm, this.mode = this.algorithm.mode, this.blockSize = this.mode.blockSize, this._finish = !1, this._input = null, this.output = null, this._op = r.decrypt ? this.mode.decrypt : this.mode.encrypt, this._decrypt = r.decrypt, this.algorithm.initialize(r);
  };
  return e.prototype.start = function(r) {
    r = r || {};
    var l = {};
    for (var E in r)
      l[E] = r[E];
    l.decrypt = this._decrypt, this._finish = !1, this._input = t.util.createBuffer(), this.output = r.output || t.util.createBuffer(), this.mode.start(l);
  }, e.prototype.update = function(r) {
    for (r && this._input.putBuffer(r); !this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish; )
      ;
    this._input.compact();
  }, e.prototype.finish = function(r) {
    r && (this.mode.name === "ECB" || this.mode.name === "CBC") && (this.mode.pad = function(E) {
      return r(this.blockSize, E, !1);
    }, this.mode.unpad = function(E) {
      return r(this.blockSize, E, !0);
    });
    var l = {};
    return l.decrypt = this._decrypt, l.overflow = this._input.length() % this.blockSize, !(!this._decrypt && this.mode.pad && !this.mode.pad(this._input, l) || (this._finish = !0, this.update(), this._decrypt && this.mode.unpad && !this.mode.unpad(this.output, l)) || this.mode.afterFinish && !this.mode.afterFinish(this.output, l));
  }, ir;
}
var sr = { exports: {} }, fa;
function on() {
  if (fa) return sr.exports;
  fa = 1;
  var t = he();
  pe(), t.cipher = t.cipher || {};
  var e = sr.exports = t.cipher.modes = t.cipher.modes || {};
  e.ecb = function(v) {
    v = v || {}, this.name = "ECB", this.cipher = v.cipher, this.blockSize = v.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints);
  }, e.ecb.prototype.start = function(v) {
  }, e.ecb.prototype.encrypt = function(v, u, a) {
    if (v.length() < this.blockSize && !(a && v.length() > 0))
      return !0;
    for (var p = 0; p < this._ints; ++p)
      this._inBlock[p] = v.getInt32();
    this.cipher.encrypt(this._inBlock, this._outBlock);
    for (var p = 0; p < this._ints; ++p)
      u.putInt32(this._outBlock[p]);
  }, e.ecb.prototype.decrypt = function(v, u, a) {
    if (v.length() < this.blockSize && !(a && v.length() > 0))
      return !0;
    for (var p = 0; p < this._ints; ++p)
      this._inBlock[p] = v.getInt32();
    this.cipher.decrypt(this._inBlock, this._outBlock);
    for (var p = 0; p < this._ints; ++p)
      u.putInt32(this._outBlock[p]);
  }, e.ecb.prototype.pad = function(v, u) {
    var a = v.length() === this.blockSize ? this.blockSize : this.blockSize - v.length();
    return v.fillWithByte(a, a), !0;
  }, e.ecb.prototype.unpad = function(v, u) {
    if (u.overflow > 0)
      return !1;
    var a = v.length(), p = v.at(a - 1);
    return p > this.blockSize << 2 ? !1 : (v.truncate(p), !0);
  }, e.cbc = function(v) {
    v = v || {}, this.name = "CBC", this.cipher = v.cipher, this.blockSize = v.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints);
  }, e.cbc.prototype.start = function(v) {
    if (v.iv === null) {
      if (!this._prev)
        throw new Error("Invalid IV parameter.");
      this._iv = this._prev.slice(0);
    } else if ("iv" in v)
      this._iv = r(v.iv, this.blockSize), this._prev = this._iv.slice(0);
    else
      throw new Error("Invalid IV parameter.");
  }, e.cbc.prototype.encrypt = function(v, u, a) {
    if (v.length() < this.blockSize && !(a && v.length() > 0))
      return !0;
    for (var p = 0; p < this._ints; ++p)
      this._inBlock[p] = this._prev[p] ^ v.getInt32();
    this.cipher.encrypt(this._inBlock, this._outBlock);
    for (var p = 0; p < this._ints; ++p)
      u.putInt32(this._outBlock[p]);
    this._prev = this._outBlock;
  }, e.cbc.prototype.decrypt = function(v, u, a) {
    if (v.length() < this.blockSize && !(a && v.length() > 0))
      return !0;
    for (var p = 0; p < this._ints; ++p)
      this._inBlock[p] = v.getInt32();
    this.cipher.decrypt(this._inBlock, this._outBlock);
    for (var p = 0; p < this._ints; ++p)
      u.putInt32(this._prev[p] ^ this._outBlock[p]);
    this._prev = this._inBlock.slice(0);
  }, e.cbc.prototype.pad = function(v, u) {
    var a = v.length() === this.blockSize ? this.blockSize : this.blockSize - v.length();
    return v.fillWithByte(a, a), !0;
  }, e.cbc.prototype.unpad = function(v, u) {
    if (u.overflow > 0)
      return !1;
    var a = v.length(), p = v.at(a - 1);
    return p > this.blockSize << 2 ? !1 : (v.truncate(p), !0);
  }, e.cfb = function(v) {
    v = v || {}, this.name = "CFB", this.cipher = v.cipher, this.blockSize = v.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialBlock = new Array(this._ints), this._partialOutput = t.util.createBuffer(), this._partialBytes = 0;
  }, e.cfb.prototype.start = function(v) {
    if (!("iv" in v))
      throw new Error("Invalid IV parameter.");
    this._iv = r(v.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0;
  }, e.cfb.prototype.encrypt = function(v, u, a) {
    var p = v.length();
    if (p === 0)
      return !0;
    if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && p >= this.blockSize) {
      for (var f = 0; f < this._ints; ++f)
        this._inBlock[f] = v.getInt32() ^ this._outBlock[f], u.putInt32(this._inBlock[f]);
      return;
    }
    var S = (this.blockSize - p) % this.blockSize;
    S > 0 && (S = this.blockSize - S), this._partialOutput.clear();
    for (var f = 0; f < this._ints; ++f)
      this._partialBlock[f] = v.getInt32() ^ this._outBlock[f], this._partialOutput.putInt32(this._partialBlock[f]);
    if (S > 0)
      v.read -= this.blockSize;
    else
      for (var f = 0; f < this._ints; ++f)
        this._inBlock[f] = this._partialBlock[f];
    if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), S > 0 && !a)
      return u.putBytes(this._partialOutput.getBytes(
        S - this._partialBytes
      )), this._partialBytes = S, !0;
    u.putBytes(this._partialOutput.getBytes(
      p - this._partialBytes
    )), this._partialBytes = 0;
  }, e.cfb.prototype.decrypt = function(v, u, a) {
    var p = v.length();
    if (p === 0)
      return !0;
    if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && p >= this.blockSize) {
      for (var f = 0; f < this._ints; ++f)
        this._inBlock[f] = v.getInt32(), u.putInt32(this._inBlock[f] ^ this._outBlock[f]);
      return;
    }
    var S = (this.blockSize - p) % this.blockSize;
    S > 0 && (S = this.blockSize - S), this._partialOutput.clear();
    for (var f = 0; f < this._ints; ++f)
      this._partialBlock[f] = v.getInt32(), this._partialOutput.putInt32(this._partialBlock[f] ^ this._outBlock[f]);
    if (S > 0)
      v.read -= this.blockSize;
    else
      for (var f = 0; f < this._ints; ++f)
        this._inBlock[f] = this._partialBlock[f];
    if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), S > 0 && !a)
      return u.putBytes(this._partialOutput.getBytes(
        S - this._partialBytes
      )), this._partialBytes = S, !0;
    u.putBytes(this._partialOutput.getBytes(
      p - this._partialBytes
    )), this._partialBytes = 0;
  }, e.ofb = function(v) {
    v = v || {}, this.name = "OFB", this.cipher = v.cipher, this.blockSize = v.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialOutput = t.util.createBuffer(), this._partialBytes = 0;
  }, e.ofb.prototype.start = function(v) {
    if (!("iv" in v))
      throw new Error("Invalid IV parameter.");
    this._iv = r(v.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0;
  }, e.ofb.prototype.encrypt = function(v, u, a) {
    var p = v.length();
    if (v.length() === 0)
      return !0;
    if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && p >= this.blockSize) {
      for (var f = 0; f < this._ints; ++f)
        u.putInt32(v.getInt32() ^ this._outBlock[f]), this._inBlock[f] = this._outBlock[f];
      return;
    }
    var S = (this.blockSize - p) % this.blockSize;
    S > 0 && (S = this.blockSize - S), this._partialOutput.clear();
    for (var f = 0; f < this._ints; ++f)
      this._partialOutput.putInt32(v.getInt32() ^ this._outBlock[f]);
    if (S > 0)
      v.read -= this.blockSize;
    else
      for (var f = 0; f < this._ints; ++f)
        this._inBlock[f] = this._outBlock[f];
    if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), S > 0 && !a)
      return u.putBytes(this._partialOutput.getBytes(
        S - this._partialBytes
      )), this._partialBytes = S, !0;
    u.putBytes(this._partialOutput.getBytes(
      p - this._partialBytes
    )), this._partialBytes = 0;
  }, e.ofb.prototype.decrypt = e.ofb.prototype.encrypt, e.ctr = function(v) {
    v = v || {}, this.name = "CTR", this.cipher = v.cipher, this.blockSize = v.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialOutput = t.util.createBuffer(), this._partialBytes = 0;
  }, e.ctr.prototype.start = function(v) {
    if (!("iv" in v))
      throw new Error("Invalid IV parameter.");
    this._iv = r(v.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0;
  }, e.ctr.prototype.encrypt = function(v, u, a) {
    var p = v.length();
    if (p === 0)
      return !0;
    if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && p >= this.blockSize)
      for (var f = 0; f < this._ints; ++f)
        u.putInt32(v.getInt32() ^ this._outBlock[f]);
    else {
      var S = (this.blockSize - p) % this.blockSize;
      S > 0 && (S = this.blockSize - S), this._partialOutput.clear();
      for (var f = 0; f < this._ints; ++f)
        this._partialOutput.putInt32(v.getInt32() ^ this._outBlock[f]);
      if (S > 0 && (v.read -= this.blockSize), this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), S > 0 && !a)
        return u.putBytes(this._partialOutput.getBytes(
          S - this._partialBytes
        )), this._partialBytes = S, !0;
      u.putBytes(this._partialOutput.getBytes(
        p - this._partialBytes
      )), this._partialBytes = 0;
    }
    l(this._inBlock);
  }, e.ctr.prototype.decrypt = e.ctr.prototype.encrypt, e.gcm = function(v) {
    v = v || {}, this.name = "GCM", this.cipher = v.cipher, this.blockSize = v.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints), this._partialOutput = t.util.createBuffer(), this._partialBytes = 0, this._R = 3774873600;
  }, e.gcm.prototype.start = function(v) {
    if (!("iv" in v))
      throw new Error("Invalid IV parameter.");
    var u = t.util.createBuffer(v.iv);
    this._cipherLength = 0;
    var a;
    if ("additionalData" in v ? a = t.util.createBuffer(v.additionalData) : a = t.util.createBuffer(), "tagLength" in v ? this._tagLength = v.tagLength : this._tagLength = 128, this._tag = null, v.decrypt && (this._tag = t.util.createBuffer(v.tag).getBytes(), this._tag.length !== this._tagLength / 8))
      throw new Error("Authentication tag does not match tag length.");
    this._hashBlock = new Array(this._ints), this.tag = null, this._hashSubkey = new Array(this._ints), this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey), this.componentBits = 4, this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
    var p = u.length();
    if (p === 12)
      this._j0 = [u.getInt32(), u.getInt32(), u.getInt32(), 1];
    else {
      for (this._j0 = [0, 0, 0, 0]; u.length() > 0; )
        this._j0 = this.ghash(
          this._hashSubkey,
          this._j0,
          [u.getInt32(), u.getInt32(), u.getInt32(), u.getInt32()]
        );
      this._j0 = this.ghash(
        this._hashSubkey,
        this._j0,
        [0, 0].concat(E(p * 8))
      );
    }
    this._inBlock = this._j0.slice(0), l(this._inBlock), this._partialBytes = 0, a = t.util.createBuffer(a), this._aDataLength = E(a.length() * 8);
    var f = a.length() % this.blockSize;
    for (f && a.fillWithByte(0, this.blockSize - f), this._s = [0, 0, 0, 0]; a.length() > 0; )
      this._s = this.ghash(this._hashSubkey, this._s, [
        a.getInt32(),
        a.getInt32(),
        a.getInt32(),
        a.getInt32()
      ]);
  }, e.gcm.prototype.encrypt = function(v, u, a) {
    var p = v.length();
    if (p === 0)
      return !0;
    if (this.cipher.encrypt(this._inBlock, this._outBlock), this._partialBytes === 0 && p >= this.blockSize) {
      for (var f = 0; f < this._ints; ++f)
        u.putInt32(this._outBlock[f] ^= v.getInt32());
      this._cipherLength += this.blockSize;
    } else {
      var S = (this.blockSize - p) % this.blockSize;
      S > 0 && (S = this.blockSize - S), this._partialOutput.clear();
      for (var f = 0; f < this._ints; ++f)
        this._partialOutput.putInt32(v.getInt32() ^ this._outBlock[f]);
      if (S <= 0 || a) {
        if (a) {
          var U = p % this.blockSize;
          this._cipherLength += U, this._partialOutput.truncate(this.blockSize - U);
        } else
          this._cipherLength += this.blockSize;
        for (var f = 0; f < this._ints; ++f)
          this._outBlock[f] = this._partialOutput.getInt32();
        this._partialOutput.read -= this.blockSize;
      }
      if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), S > 0 && !a)
        return v.read -= this.blockSize, u.putBytes(this._partialOutput.getBytes(
          S - this._partialBytes
        )), this._partialBytes = S, !0;
      u.putBytes(this._partialOutput.getBytes(
        p - this._partialBytes
      )), this._partialBytes = 0;
    }
    this._s = this.ghash(this._hashSubkey, this._s, this._outBlock), l(this._inBlock);
  }, e.gcm.prototype.decrypt = function(v, u, a) {
    var p = v.length();
    if (p < this.blockSize && !(a && p > 0))
      return !0;
    this.cipher.encrypt(this._inBlock, this._outBlock), l(this._inBlock), this._hashBlock[0] = v.getInt32(), this._hashBlock[1] = v.getInt32(), this._hashBlock[2] = v.getInt32(), this._hashBlock[3] = v.getInt32(), this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
    for (var f = 0; f < this._ints; ++f)
      u.putInt32(this._outBlock[f] ^ this._hashBlock[f]);
    p < this.blockSize ? this._cipherLength += p % this.blockSize : this._cipherLength += this.blockSize;
  }, e.gcm.prototype.afterFinish = function(v, u) {
    var a = !0;
    u.decrypt && u.overflow && v.truncate(this.blockSize - u.overflow), this.tag = t.util.createBuffer();
    var p = this._aDataLength.concat(E(this._cipherLength * 8));
    this._s = this.ghash(this._hashSubkey, this._s, p);
    var f = [];
    this.cipher.encrypt(this._j0, f);
    for (var S = 0; S < this._ints; ++S)
      this.tag.putInt32(this._s[S] ^ f[S]);
    return this.tag.truncate(this.tag.length() % (this._tagLength / 8)), u.decrypt && this.tag.bytes() !== this._tag && (a = !1), a;
  }, e.gcm.prototype.multiply = function(v, u) {
    for (var a = [0, 0, 0, 0], p = u.slice(0), f = 0; f < 128; ++f) {
      var S = v[f / 32 | 0] & 1 << 31 - f % 32;
      S && (a[0] ^= p[0], a[1] ^= p[1], a[2] ^= p[2], a[3] ^= p[3]), this.pow(p, p);
    }
    return a;
  }, e.gcm.prototype.pow = function(v, u) {
    for (var a = v[3] & 1, p = 3; p > 0; --p)
      u[p] = v[p] >>> 1 | (v[p - 1] & 1) << 31;
    u[0] = v[0] >>> 1, a && (u[0] ^= this._R);
  }, e.gcm.prototype.tableMultiply = function(v) {
    for (var u = [0, 0, 0, 0], a = 0; a < 32; ++a) {
      var p = a / 8 | 0, f = v[p] >>> (7 - a % 8) * 4 & 15, S = this._m[a][f];
      u[0] ^= S[0], u[1] ^= S[1], u[2] ^= S[2], u[3] ^= S[3];
    }
    return u;
  }, e.gcm.prototype.ghash = function(v, u, a) {
    return u[0] ^= a[0], u[1] ^= a[1], u[2] ^= a[2], u[3] ^= a[3], this.tableMultiply(u);
  }, e.gcm.prototype.generateHashTable = function(v, u) {
    for (var a = 8 / u, p = 4 * a, f = 16 * a, S = new Array(f), U = 0; U < f; ++U) {
      var T = [0, 0, 0, 0], c = U / p | 0, g = (p - 1 - U % p) * u;
      T[c] = 1 << u - 1 << g, S[U] = this.generateSubHashTable(this.multiply(T, v), u);
    }
    return S;
  }, e.gcm.prototype.generateSubHashTable = function(v, u) {
    var a = 1 << u, p = a >>> 1, f = new Array(a);
    f[p] = v.slice(0);
    for (var S = p >>> 1; S > 0; )
      this.pow(f[2 * S], f[S] = []), S >>= 1;
    for (S = 2; S < p; ) {
      for (var U = 1; U < S; ++U) {
        var T = f[S], c = f[U];
        f[S + U] = [
          T[0] ^ c[0],
          T[1] ^ c[1],
          T[2] ^ c[2],
          T[3] ^ c[3]
        ];
      }
      S *= 2;
    }
    for (f[0] = [0, 0, 0, 0], S = p + 1; S < a; ++S) {
      var g = f[S ^ p];
      f[S] = [v[0] ^ g[0], v[1] ^ g[1], v[2] ^ g[2], v[3] ^ g[3]];
    }
    return f;
  };
  function r(v, u) {
    if (typeof v == "string" && (v = t.util.createBuffer(v)), t.util.isArray(v) && v.length > 4) {
      var a = v;
      v = t.util.createBuffer();
      for (var p = 0; p < a.length; ++p)
        v.putByte(a[p]);
    }
    if (v.length() < u)
      throw new Error(
        "Invalid IV length; got " + v.length() + " bytes and expected " + u + " bytes."
      );
    if (!t.util.isArray(v)) {
      for (var f = [], S = u / 4, p = 0; p < S; ++p)
        f.push(v.getInt32());
      v = f;
    }
    return v;
  }
  function l(v) {
    v[v.length - 1] = v[v.length - 1] + 1 & 4294967295;
  }
  function E(v) {
    return [v / 4294967296 | 0, v & 4294967295];
  }
  return sr.exports;
}
var or, ca;
function xt() {
  if (ca) return or;
  ca = 1;
  var t = he();
  Yr(), on(), pe(), or = t.aes = t.aes || {}, t.aes.startEncrypting = function(c, g, C, m) {
    var s = T({
      key: c,
      output: C,
      decrypt: !1,
      mode: m
    });
    return s.start(g), s;
  }, t.aes.createEncryptionCipher = function(c, g) {
    return T({
      key: c,
      output: null,
      decrypt: !1,
      mode: g
    });
  }, t.aes.startDecrypting = function(c, g, C, m) {
    var s = T({
      key: c,
      output: C,
      decrypt: !0,
      mode: m
    });
    return s.start(g), s;
  }, t.aes.createDecryptionCipher = function(c, g) {
    return T({
      key: c,
      output: null,
      decrypt: !0,
      mode: g
    });
  }, t.aes.Algorithm = function(c, g) {
    r || f();
    var C = this;
    C.name = c, C.mode = new g({
      blockSize: 16,
      cipher: {
        encrypt: function(m, s) {
          return U(C._w, m, s, !1);
        },
        decrypt: function(m, s) {
          return U(C._w, m, s, !0);
        }
      }
    }), C._init = !1;
  }, t.aes.Algorithm.prototype.initialize = function(c) {
    if (!this._init) {
      var g = c.key, C;
      if (typeof g == "string" && (g.length === 16 || g.length === 24 || g.length === 32))
        g = t.util.createBuffer(g);
      else if (t.util.isArray(g) && (g.length === 16 || g.length === 24 || g.length === 32)) {
        C = g, g = t.util.createBuffer();
        for (var m = 0; m < C.length; ++m)
          g.putByte(C[m]);
      }
      if (!t.util.isArray(g)) {
        C = g, g = [];
        var s = C.length();
        if (s === 16 || s === 24 || s === 32) {
          s = s >>> 2;
          for (var m = 0; m < s; ++m)
            g.push(C.getInt32());
        }
      }
      if (!t.util.isArray(g) || !(g.length === 4 || g.length === 6 || g.length === 8))
        throw new Error("Invalid key parameter.");
      var d = this.mode.name, y = ["CFB", "OFB", "CTR", "GCM"].indexOf(d) !== -1;
      this._w = S(g, c.decrypt && !y), this._init = !0;
    }
  }, t.aes._expandKey = function(c, g) {
    return r || f(), S(c, g);
  }, t.aes._updateBlock = U, e("AES-ECB", t.cipher.modes.ecb), e("AES-CBC", t.cipher.modes.cbc), e("AES-CFB", t.cipher.modes.cfb), e("AES-OFB", t.cipher.modes.ofb), e("AES-CTR", t.cipher.modes.ctr), e("AES-GCM", t.cipher.modes.gcm);
  function e(c, g) {
    var C = function() {
      return new t.aes.Algorithm(c, g);
    };
    t.cipher.registerAlgorithm(c, C);
  }
  var r = !1, l = 4, E, v, u, a, p;
  function f() {
    r = !0, u = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
    for (var c = new Array(256), g = 0; g < 128; ++g)
      c[g] = g << 1, c[g + 128] = g + 128 << 1 ^ 283;
    E = new Array(256), v = new Array(256), a = new Array(4), p = new Array(4);
    for (var g = 0; g < 4; ++g)
      a[g] = new Array(256), p[g] = new Array(256);
    for (var C = 0, m = 0, s, d, y, B, b, h, i, g = 0; g < 256; ++g) {
      B = m ^ m << 1 ^ m << 2 ^ m << 3 ^ m << 4, B = B >> 8 ^ B & 255 ^ 99, E[C] = B, v[B] = C, b = c[B], s = c[C], d = c[s], y = c[d], h = b << 24 ^ // 2
      B << 16 ^ // 1
      B << 8 ^ // 1
      (B ^ b), i = (s ^ d ^ y) << 24 ^ // E (14)
      (C ^ y) << 16 ^ // 9
      (C ^ d ^ y) << 8 ^ // D (13)
      (C ^ s ^ y);
      for (var n = 0; n < 4; ++n)
        a[n][C] = h, p[n][B] = i, h = h << 24 | h >>> 8, i = i << 24 | i >>> 8;
      C === 0 ? C = m = 1 : (C = s ^ c[c[c[s ^ y]]], m ^= c[c[m]]);
    }
  }
  function S(c, g) {
    for (var C = c.slice(0), m, s = 1, d = C.length, y = d + 6 + 1, B = l * y, b = d; b < B; ++b)
      m = C[b - 1], b % d === 0 ? (m = E[m >>> 16 & 255] << 24 ^ E[m >>> 8 & 255] << 16 ^ E[m & 255] << 8 ^ E[m >>> 24] ^ u[s] << 24, s++) : d > 6 && b % d === 4 && (m = E[m >>> 24] << 24 ^ E[m >>> 16 & 255] << 16 ^ E[m >>> 8 & 255] << 8 ^ E[m & 255]), C[b] = C[b - d] ^ m;
    if (g) {
      var h, i = p[0], n = p[1], A = p[2], _ = p[3], P = C.slice(0);
      B = C.length;
      for (var b = 0, D = B - l; b < B; b += l, D -= l)
        if (b === 0 || b === B - l)
          P[b] = C[D], P[b + 1] = C[D + 3], P[b + 2] = C[D + 2], P[b + 3] = C[D + 1];
        else
          for (var K = 0; K < l; ++K)
            h = C[D + K], P[b + (3 & -K)] = i[E[h >>> 24]] ^ n[E[h >>> 16 & 255]] ^ A[E[h >>> 8 & 255]] ^ _[E[h & 255]];
      C = P;
    }
    return C;
  }
  function U(c, g, C, m) {
    var s = c.length / 4 - 1, d, y, B, b, h;
    m ? (d = p[0], y = p[1], B = p[2], b = p[3], h = v) : (d = a[0], y = a[1], B = a[2], b = a[3], h = E);
    var i, n, A, _, P, D, K;
    i = g[0] ^ c[0], n = g[m ? 3 : 1] ^ c[1], A = g[2] ^ c[2], _ = g[m ? 1 : 3] ^ c[3];
    for (var q = 3, H = 1; H < s; ++H)
      P = d[i >>> 24] ^ y[n >>> 16 & 255] ^ B[A >>> 8 & 255] ^ b[_ & 255] ^ c[++q], D = d[n >>> 24] ^ y[A >>> 16 & 255] ^ B[_ >>> 8 & 255] ^ b[i & 255] ^ c[++q], K = d[A >>> 24] ^ y[_ >>> 16 & 255] ^ B[i >>> 8 & 255] ^ b[n & 255] ^ c[++q], _ = d[_ >>> 24] ^ y[i >>> 16 & 255] ^ B[n >>> 8 & 255] ^ b[A & 255] ^ c[++q], i = P, n = D, A = K;
    C[0] = h[i >>> 24] << 24 ^ h[n >>> 16 & 255] << 16 ^ h[A >>> 8 & 255] << 8 ^ h[_ & 255] ^ c[++q], C[m ? 3 : 1] = h[n >>> 24] << 24 ^ h[A >>> 16 & 255] << 16 ^ h[_ >>> 8 & 255] << 8 ^ h[i & 255] ^ c[++q], C[2] = h[A >>> 24] << 24 ^ h[_ >>> 16 & 255] << 16 ^ h[i >>> 8 & 255] << 8 ^ h[n & 255] ^ c[++q], C[m ? 1 : 3] = h[_ >>> 24] << 24 ^ h[i >>> 16 & 255] << 16 ^ h[n >>> 8 & 255] << 8 ^ h[A & 255] ^ c[++q];
  }
  function T(c) {
    c = c || {};
    var g = (c.mode || "CBC").toUpperCase(), C = "AES-" + g, m;
    c.decrypt ? m = t.cipher.createDecipher(C, c.key) : m = t.cipher.createCipher(C, c.key);
    var s = m.start;
    return m.start = function(d, y) {
      var B = null;
      y instanceof t.util.ByteBuffer && (B = y, y = {}), y = y || {}, y.output = B, y.iv = d, s.call(m, y);
    }, m;
  }
  return or;
}
var ur = { exports: {} }, lr = { exports: {} }, fr = { exports: {} }, ha;
function St() {
  if (ha) return fr.exports;
  ha = 1;
  var t = he();
  t.pki = t.pki || {};
  var e = fr.exports = t.pki.oids = t.oids = t.oids || {};
  function r(E, v) {
    e[E] = v, e[v] = E;
  }
  function l(E, v) {
    e[E] = v;
  }
  return r("1.2.840.113549.1.1.1", "rsaEncryption"), r("1.2.840.113549.1.1.4", "md5WithRSAEncryption"), r("1.2.840.113549.1.1.5", "sha1WithRSAEncryption"), r("1.2.840.113549.1.1.7", "RSAES-OAEP"), r("1.2.840.113549.1.1.8", "mgf1"), r("1.2.840.113549.1.1.9", "pSpecified"), r("1.2.840.113549.1.1.10", "RSASSA-PSS"), r("1.2.840.113549.1.1.11", "sha256WithRSAEncryption"), r("1.2.840.113549.1.1.12", "sha384WithRSAEncryption"), r("1.2.840.113549.1.1.13", "sha512WithRSAEncryption"), r("1.3.101.112", "EdDSA25519"), r("1.2.840.10040.4.3", "dsa-with-sha1"), r("1.3.14.3.2.7", "desCBC"), r("1.3.14.3.2.26", "sha1"), r("1.3.14.3.2.29", "sha1WithRSASignature"), r("2.16.840.1.101.3.4.2.1", "sha256"), r("2.16.840.1.101.3.4.2.2", "sha384"), r("2.16.840.1.101.3.4.2.3", "sha512"), r("2.16.840.1.101.3.4.2.4", "sha224"), r("2.16.840.1.101.3.4.2.5", "sha512-224"), r("2.16.840.1.101.3.4.2.6", "sha512-256"), r("1.2.840.113549.2.2", "md2"), r("1.2.840.113549.2.5", "md5"), r("1.2.840.113549.1.7.1", "data"), r("1.2.840.113549.1.7.2", "signedData"), r("1.2.840.113549.1.7.3", "envelopedData"), r("1.2.840.113549.1.7.4", "signedAndEnvelopedData"), r("1.2.840.113549.1.7.5", "digestedData"), r("1.2.840.113549.1.7.6", "encryptedData"), r("1.2.840.113549.1.9.1", "emailAddress"), r("1.2.840.113549.1.9.2", "unstructuredName"), r("1.2.840.113549.1.9.3", "contentType"), r("1.2.840.113549.1.9.4", "messageDigest"), r("1.2.840.113549.1.9.5", "signingTime"), r("1.2.840.113549.1.9.6", "counterSignature"), r("1.2.840.113549.1.9.7", "challengePassword"), r("1.2.840.113549.1.9.8", "unstructuredAddress"), r("1.2.840.113549.1.9.14", "extensionRequest"), r("1.2.840.113549.1.9.20", "friendlyName"), r("1.2.840.113549.1.9.21", "localKeyId"), r("1.2.840.113549.1.9.22.1", "x509Certificate"), r("1.2.840.113549.1.12.10.1.1", "keyBag"), r("1.2.840.113549.1.12.10.1.2", "pkcs8ShroudedKeyBag"), r("1.2.840.113549.1.12.10.1.3", "certBag"), r("1.2.840.113549.1.12.10.1.4", "crlBag"), r("1.2.840.113549.1.12.10.1.5", "secretBag"), r("1.2.840.113549.1.12.10.1.6", "safeContentsBag"), r("1.2.840.113549.1.5.13", "pkcs5PBES2"), r("1.2.840.113549.1.5.12", "pkcs5PBKDF2"), r("1.2.840.113549.1.12.1.1", "pbeWithSHAAnd128BitRC4"), r("1.2.840.113549.1.12.1.2", "pbeWithSHAAnd40BitRC4"), r("1.2.840.113549.1.12.1.3", "pbeWithSHAAnd3-KeyTripleDES-CBC"), r("1.2.840.113549.1.12.1.4", "pbeWithSHAAnd2-KeyTripleDES-CBC"), r("1.2.840.113549.1.12.1.5", "pbeWithSHAAnd128BitRC2-CBC"), r("1.2.840.113549.1.12.1.6", "pbewithSHAAnd40BitRC2-CBC"), r("1.2.840.113549.2.7", "hmacWithSHA1"), r("1.2.840.113549.2.8", "hmacWithSHA224"), r("1.2.840.113549.2.9", "hmacWithSHA256"), r("1.2.840.113549.2.10", "hmacWithSHA384"), r("1.2.840.113549.2.11", "hmacWithSHA512"), r("1.2.840.113549.3.7", "des-EDE3-CBC"), r("2.16.840.1.101.3.4.1.2", "aes128-CBC"), r("2.16.840.1.101.3.4.1.22", "aes192-CBC"), r("2.16.840.1.101.3.4.1.42", "aes256-CBC"), r("2.5.4.3", "commonName"), r("2.5.4.4", "surname"), r("2.5.4.5", "serialNumber"), r("2.5.4.6", "countryName"), r("2.5.4.7", "localityName"), r("2.5.4.8", "stateOrProvinceName"), r("2.5.4.9", "streetAddress"), r("2.5.4.10", "organizationName"), r("2.5.4.11", "organizationalUnitName"), r("2.5.4.12", "title"), r("2.5.4.13", "description"), r("2.5.4.15", "businessCategory"), r("2.5.4.17", "postalCode"), r("2.5.4.42", "givenName"), r("2.5.4.65", "pseudonym"), r("1.3.6.1.4.1.311.60.2.1.2", "jurisdictionOfIncorporationStateOrProvinceName"), r("1.3.6.1.4.1.311.60.2.1.3", "jurisdictionOfIncorporationCountryName"), r("2.16.840.1.113730.1.1", "nsCertType"), r("2.16.840.1.113730.1.13", "nsComment"), l("2.5.29.1", "authorityKeyIdentifier"), l("2.5.29.2", "keyAttributes"), l("2.5.29.3", "certificatePolicies"), l("2.5.29.4", "keyUsageRestriction"), l("2.5.29.5", "policyMapping"), l("2.5.29.6", "subtreesConstraint"), l("2.5.29.7", "subjectAltName"), l("2.5.29.8", "issuerAltName"), l("2.5.29.9", "subjectDirectoryAttributes"), l("2.5.29.10", "basicConstraints"), l("2.5.29.11", "nameConstraints"), l("2.5.29.12", "policyConstraints"), l("2.5.29.13", "basicConstraints"), r("2.5.29.14", "subjectKeyIdentifier"), r("2.5.29.15", "keyUsage"), l("2.5.29.16", "privateKeyUsagePeriod"), r("2.5.29.17", "subjectAltName"), r("2.5.29.18", "issuerAltName"), r("2.5.29.19", "basicConstraints"), l("2.5.29.20", "cRLNumber"), l("2.5.29.21", "cRLReason"), l("2.5.29.22", "expirationDate"), l("2.5.29.23", "instructionCode"), l("2.5.29.24", "invalidityDate"), l("2.5.29.25", "cRLDistributionPoints"), l("2.5.29.26", "issuingDistributionPoint"), l("2.5.29.27", "deltaCRLIndicator"), l("2.5.29.28", "issuingDistributionPoint"), l("2.5.29.29", "certificateIssuer"), l("2.5.29.30", "nameConstraints"), r("2.5.29.31", "cRLDistributionPoints"), r("2.5.29.32", "certificatePolicies"), l("2.5.29.33", "policyMappings"), l("2.5.29.34", "policyConstraints"), r("2.5.29.35", "authorityKeyIdentifier"), l("2.5.29.36", "policyConstraints"), r("2.5.29.37", "extKeyUsage"), l("2.5.29.46", "freshestCRL"), l("2.5.29.54", "inhibitAnyPolicy"), r("1.3.6.1.4.1.11129.2.4.2", "timestampList"), r("1.3.6.1.5.5.7.1.1", "authorityInfoAccess"), r("1.3.6.1.5.5.7.3.1", "serverAuth"), r("1.3.6.1.5.5.7.3.2", "clientAuth"), r("1.3.6.1.5.5.7.3.3", "codeSigning"), r("1.3.6.1.5.5.7.3.4", "emailProtection"), r("1.3.6.1.5.5.7.3.8", "timeStamping"), fr.exports;
}
var da;
function ut() {
  if (da) return lr.exports;
  da = 1;
  var t = he();
  pe(), St();
  var e = lr.exports = t.asn1 = t.asn1 || {};
  e.Class = {
    UNIVERSAL: 0,
    APPLICATION: 64,
    CONTEXT_SPECIFIC: 128,
    PRIVATE: 192
  }, e.Type = {
    NONE: 0,
    BOOLEAN: 1,
    INTEGER: 2,
    BITSTRING: 3,
    OCTETSTRING: 4,
    NULL: 5,
    OID: 6,
    ODESC: 7,
    EXTERNAL: 8,
    REAL: 9,
    ENUMERATED: 10,
    EMBEDDED: 11,
    UTF8: 12,
    ROID: 13,
    SEQUENCE: 16,
    SET: 17,
    PRINTABLESTRING: 19,
    IA5STRING: 22,
    UTCTIME: 23,
    GENERALIZEDTIME: 24,
    BMPSTRING: 30
  }, e.maxDepth = 256, e.create = function(u, a, p, f, S) {
    if (t.util.isArray(f)) {
      for (var U = [], T = 0; T < f.length; ++T)
        f[T] !== void 0 && U.push(f[T]);
      f = U;
    }
    var c = {
      tagClass: u,
      type: a,
      constructed: p,
      composed: p || t.util.isArray(f),
      value: f
    };
    return S && "bitStringContents" in S && (c.bitStringContents = S.bitStringContents, c.original = e.copy(c)), c;
  }, e.copy = function(u, a) {
    var p;
    if (t.util.isArray(u)) {
      p = [];
      for (var f = 0; f < u.length; ++f)
        p.push(e.copy(u[f], a));
      return p;
    }
    return typeof u == "string" ? u : (p = {
      tagClass: u.tagClass,
      type: u.type,
      constructed: u.constructed,
      composed: u.composed,
      value: e.copy(u.value, a)
    }, a && !a.excludeBitStringContents && (p.bitStringContents = u.bitStringContents), p);
  }, e.equals = function(u, a, p) {
    if (t.util.isArray(u)) {
      if (!t.util.isArray(a) || u.length !== a.length)
        return !1;
      for (var f = 0; f < u.length; ++f)
        if (!e.equals(u[f], a[f]))
          return !1;
      return !0;
    }
    if (typeof u != typeof a)
      return !1;
    if (typeof u == "string")
      return u === a;
    var S = u.tagClass === a.tagClass && u.type === a.type && u.constructed === a.constructed && u.composed === a.composed && e.equals(u.value, a.value);
    return p && p.includeBitStringContents && (S = S && u.bitStringContents === a.bitStringContents), S;
  }, e.getBerValueLength = function(u) {
    var a = u.getByte();
    if (a !== 128) {
      var p, f = a & 128;
      return f ? p = u.getInt((a & 127) << 3) : p = a, p;
    }
  };
  function r(u, a, p) {
    if (p > a) {
      var f = new Error("Too few bytes to parse DER.");
      throw f.available = u.length(), f.remaining = a, f.requested = p, f;
    }
  }
  var l = function(u, a) {
    var p = u.getByte();
    if (a--, p !== 128) {
      var f, S = p & 128;
      if (!S)
        f = p;
      else {
        var U = p & 127;
        r(u, a, U), f = u.getInt(U << 3);
      }
      if (f < 0)
        throw new Error("Negative length: " + f);
      return f;
    }
  };
  e.fromDer = function(u, a) {
    a === void 0 && (a = {
      strict: !0,
      parseAllBytes: !0,
      decodeBitStrings: !0
    }), typeof a == "boolean" && (a = {
      strict: a,
      parseAllBytes: !0,
      decodeBitStrings: !0
    }), "strict" in a || (a.strict = !0), "parseAllBytes" in a || (a.parseAllBytes = !0), "decodeBitStrings" in a || (a.decodeBitStrings = !0), "maxDepth" in a || (a.maxDepth = e.maxDepth), typeof u == "string" && (u = t.util.createBuffer(u));
    var p = u.length(), f = E(u, u.length(), 0, a);
    if (a.parseAllBytes && u.length() !== 0) {
      var S = new Error("Unparsed DER bytes remain after ASN.1 parsing.");
      throw S.byteCount = p, S.remaining = u.length(), S;
    }
    return f;
  };
  function E(u, a, p, f) {
    if (p >= f.maxDepth)
      throw new Error("ASN.1 parsing error: Max depth exceeded.");
    var S;
    r(u, a, 2);
    var U = u.getByte();
    a--;
    var T = U & 192, c = U & 31;
    S = u.length();
    var g = l(u, a);
    if (a -= S - u.length(), g !== void 0 && g > a) {
      if (f.strict) {
        var C = new Error("Too few bytes to read ASN.1 value.");
        throw C.available = u.length(), C.remaining = a, C.requested = g, C;
      }
      g = a;
    }
    var m, s, d = (U & 32) === 32;
    if (d)
      if (m = [], g === void 0)
        for (; ; ) {
          if (r(u, a, 2), u.bytes(2) === "\0\0") {
            u.getBytes(2), a -= 2;
            break;
          }
          S = u.length(), m.push(E(u, a, p + 1, f)), a -= S - u.length();
        }
      else
        for (; g > 0; )
          S = u.length(), m.push(E(u, g, p + 1, f)), a -= S - u.length(), g -= S - u.length();
    if (m === void 0 && T === e.Class.UNIVERSAL && c === e.Type.BITSTRING && (s = u.bytes(g)), m === void 0 && f.decodeBitStrings && T === e.Class.UNIVERSAL && // FIXME: OCTET STRINGs not yet supported here
    // .. other parts of forge expect to decode OCTET STRINGs manually
    c === e.Type.BITSTRING && g > 1) {
      var y = u.read, B = a, b = 0;
      if (c === e.Type.BITSTRING && (r(u, a, 1), b = u.getByte(), a--), b === 0)
        try {
          S = u.length();
          var h = {
            // enforce strict mode to avoid parsing ASN.1 from plain data
            strict: !0,
            decodeBitStrings: !0
          }, i = E(u, a, p + 1, h), n = S - u.length();
          a -= n, c == e.Type.BITSTRING && n++;
          var A = i.tagClass;
          n === g && (A === e.Class.UNIVERSAL || A === e.Class.CONTEXT_SPECIFIC) && (m = [i]);
        } catch {
        }
      m === void 0 && (u.read = y, a = B);
    }
    if (m === void 0) {
      if (g === void 0) {
        if (f.strict)
          throw new Error("Non-constructed ASN.1 object of indefinite length.");
        g = a;
      }
      if (c === e.Type.BMPSTRING)
        for (m = ""; g > 0; g -= 2)
          r(u, a, 2), m += String.fromCharCode(u.getInt16()), a -= 2;
      else
        m = u.getBytes(g), a -= g;
    }
    var _ = s === void 0 ? null : {
      bitStringContents: s
    };
    return e.create(T, c, d, m, _);
  }
  e.toDer = function(u) {
    var a = t.util.createBuffer(), p = u.tagClass | u.type, f = t.util.createBuffer(), S = !1;
    if ("bitStringContents" in u && (S = !0, u.original && (S = e.equals(u, u.original))), S)
      f.putBytes(u.bitStringContents);
    else if (u.composed) {
      u.constructed ? p |= 32 : f.putByte(0);
      for (var U = 0; U < u.value.length; ++U)
        u.value[U] !== void 0 && f.putBuffer(e.toDer(u.value[U]));
    } else if (u.type === e.Type.BMPSTRING)
      for (var U = 0; U < u.value.length; ++U)
        f.putInt16(u.value.charCodeAt(U));
    else
      u.type === e.Type.INTEGER && u.value.length > 1 && // leading 0x00 for positive integer
      (u.value.charCodeAt(0) === 0 && (u.value.charCodeAt(1) & 128) === 0 || // leading 0xFF for negative integer
      u.value.charCodeAt(0) === 255 && (u.value.charCodeAt(1) & 128) === 128) ? f.putBytes(u.value.substr(1)) : f.putBytes(u.value);
    if (a.putByte(p), f.length() <= 127)
      a.putByte(f.length() & 127);
    else {
      var T = f.length(), c = "";
      do
        c += String.fromCharCode(T & 255), T = T >>> 8;
      while (T > 0);
      a.putByte(c.length | 128);
      for (var U = c.length - 1; U >= 0; --U)
        a.putByte(c.charCodeAt(U));
    }
    return a.putBuffer(f), a;
  }, e.oidToDer = function(u) {
    var a = u.split("."), p = t.util.createBuffer();
    p.putByte(40 * parseInt(a[0], 10) + parseInt(a[1], 10));
    for (var f, S, U, T, c = 2; c < a.length; ++c) {
      if (f = !0, S = [], U = parseInt(a[c], 10), U > 4294967295)
        throw new Error("OID value too large; max is 32-bits.");
      do
        T = U & 127, U = U >>> 7, f || (T |= 128), S.push(T), f = !1;
      while (U > 0);
      for (var g = S.length - 1; g >= 0; --g)
        p.putByte(S[g]);
    }
    return p;
  }, e.derToOid = function(u) {
    var a;
    typeof u == "string" && (u = t.util.createBuffer(u));
    var p = u.getByte();
    a = Math.floor(p / 40) + "." + p % 40;
    for (var f = 0; u.length() > 0; ) {
      if (f > 70368744177663)
        throw new Error("OID value too large; max is 53-bits.");
      p = u.getByte(), f = f * 128, p & 128 ? f += p & 127 : (a += "." + (f + p), f = 0);
    }
    return a;
  }, e.utcTimeToDate = function(u) {
    var a = /* @__PURE__ */ new Date(), p = parseInt(u.substr(0, 2), 10);
    p = p >= 50 ? 1900 + p : 2e3 + p;
    var f = parseInt(u.substr(2, 2), 10) - 1, S = parseInt(u.substr(4, 2), 10), U = parseInt(u.substr(6, 2), 10), T = parseInt(u.substr(8, 2), 10), c = 0;
    if (u.length > 11) {
      var g = u.charAt(10), C = 10;
      g !== "+" && g !== "-" && (c = parseInt(u.substr(10, 2), 10), C += 2);
    }
    if (a.setUTCFullYear(p, f, S), a.setUTCHours(U, T, c, 0), C && (g = u.charAt(C), g === "+" || g === "-")) {
      var m = parseInt(u.substr(C + 1, 2), 10), s = parseInt(u.substr(C + 4, 2), 10), d = m * 60 + s;
      d *= 6e4, g === "+" ? a.setTime(+a - d) : a.setTime(+a + d);
    }
    return a;
  }, e.generalizedTimeToDate = function(u) {
    var a = /* @__PURE__ */ new Date(), p = parseInt(u.substr(0, 4), 10), f = parseInt(u.substr(4, 2), 10) - 1, S = parseInt(u.substr(6, 2), 10), U = parseInt(u.substr(8, 2), 10), T = parseInt(u.substr(10, 2), 10), c = parseInt(u.substr(12, 2), 10), g = 0, C = 0, m = !1;
    u.charAt(u.length - 1) === "Z" && (m = !0);
    var s = u.length - 5, d = u.charAt(s);
    if (d === "+" || d === "-") {
      var y = parseInt(u.substr(s + 1, 2), 10), B = parseInt(u.substr(s + 4, 2), 10);
      C = y * 60 + B, C *= 6e4, d === "+" && (C *= -1), m = !0;
    }
    return u.charAt(14) === "." && (g = parseFloat(u.substr(14), 10) * 1e3), m ? (a.setUTCFullYear(p, f, S), a.setUTCHours(U, T, c, g), a.setTime(+a + C)) : (a.setFullYear(p, f, S), a.setHours(U, T, c, g)), a;
  }, e.dateToUtcTime = function(u) {
    if (typeof u == "string")
      return u;
    var a = "", p = [];
    p.push(("" + u.getUTCFullYear()).substr(2)), p.push("" + (u.getUTCMonth() + 1)), p.push("" + u.getUTCDate()), p.push("" + u.getUTCHours()), p.push("" + u.getUTCMinutes()), p.push("" + u.getUTCSeconds());
    for (var f = 0; f < p.length; ++f)
      p[f].length < 2 && (a += "0"), a += p[f];
    return a += "Z", a;
  }, e.dateToGeneralizedTime = function(u) {
    if (typeof u == "string")
      return u;
    var a = "", p = [];
    p.push("" + u.getUTCFullYear()), p.push("" + (u.getUTCMonth() + 1)), p.push("" + u.getUTCDate()), p.push("" + u.getUTCHours()), p.push("" + u.getUTCMinutes()), p.push("" + u.getUTCSeconds());
    for (var f = 0; f < p.length; ++f)
      p[f].length < 2 && (a += "0"), a += p[f];
    return a += "Z", a;
  }, e.integerToDer = function(u) {
    var a = t.util.createBuffer();
    if (u >= -128 && u < 128)
      return a.putSignedInt(u, 8);
    if (u >= -32768 && u < 32768)
      return a.putSignedInt(u, 16);
    if (u >= -8388608 && u < 8388608)
      return a.putSignedInt(u, 24);
    if (u >= -2147483648 && u < 2147483648)
      return a.putSignedInt(u, 32);
    var p = new Error("Integer too large; max is 32-bits.");
    throw p.integer = u, p;
  }, e.derToInteger = function(u) {
    typeof u == "string" && (u = t.util.createBuffer(u));
    var a = u.length() * 8;
    if (a > 32)
      throw new Error("Integer too large; max is 32-bits.");
    return u.getSignedInt(a);
  }, e.validate = function(u, a, p, f) {
    var S = !1;
    if ((u.tagClass === a.tagClass || typeof a.tagClass > "u") && (u.type === a.type || typeof a.type > "u"))
      if (u.constructed === a.constructed || typeof a.constructed > "u") {
        if (S = !0, a.value && t.util.isArray(a.value))
          for (var U = 0, T = 0; S && T < a.value.length; ++T) {
            var c = a.value[T];
            S = !!c.optional;
            var g = u.value[U];
            if (!g) {
              c.optional || (S = !1, f && f.push("[" + a.name + '] Missing required element. Expected tag class "' + c.tagClass + '", type "' + c.type + '"'));
              continue;
            }
            var C = typeof c.tagClass < "u" && typeof c.type < "u";
            if (C && (g.tagClass !== c.tagClass || g.type !== c.type))
              if (c.optional) {
                S = !0;
                continue;
              } else {
                S = !1, f && f.push("[" + a.name + "] Tag mismatch. Expected (" + c.tagClass + "," + c.type + "), got (" + g.tagClass + "," + g.type + ")");
                break;
              }
            var m = e.validate(g, c, p, f);
            if (m)
              ++U, S = !0;
            else if (c.optional)
              S = !0;
            else {
              S = !1;
              break;
            }
          }
        if (S && p && (a.capture && (p[a.capture] = u.value), a.captureAsn1 && (p[a.captureAsn1] = u), a.captureBitStringContents && "bitStringContents" in u && (p[a.captureBitStringContents] = u.bitStringContents), a.captureBitStringValue && "bitStringContents" in u))
          if (u.bitStringContents.length < 2)
            p[a.captureBitStringValue] = "";
          else {
            var s = u.bitStringContents.charCodeAt(0);
            if (s !== 0)
              throw new Error(
                "captureBitStringValue only supported for zero unused bits"
              );
            p[a.captureBitStringValue] = u.bitStringContents.slice(1);
          }
      } else f && f.push(
        "[" + a.name + '] Expected constructed "' + a.constructed + '", got "' + u.constructed + '"'
      );
    else f && (u.tagClass !== a.tagClass && f.push(
      "[" + a.name + '] Expected tag class "' + a.tagClass + '", got "' + u.tagClass + '"'
    ), u.type !== a.type && f.push(
      "[" + a.name + '] Expected type "' + a.type + '", got "' + u.type + '"'
    ));
    return S;
  };
  var v = /[^\\u0000-\\u00ff]/;
  return e.prettyPrint = function(u, a, p) {
    var f = "";
    a = a || 0, p = p || 2, a > 0 && (f += `
`);
    for (var S = "", U = 0; U < a * p; ++U)
      S += " ";
    switch (f += S + "Tag: ", u.tagClass) {
      case e.Class.UNIVERSAL:
        f += "Universal:";
        break;
      case e.Class.APPLICATION:
        f += "Application:";
        break;
      case e.Class.CONTEXT_SPECIFIC:
        f += "Context-Specific:";
        break;
      case e.Class.PRIVATE:
        f += "Private:";
        break;
    }
    if (u.tagClass === e.Class.UNIVERSAL)
      switch (f += u.type, u.type) {
        case e.Type.NONE:
          f += " (None)";
          break;
        case e.Type.BOOLEAN:
          f += " (Boolean)";
          break;
        case e.Type.INTEGER:
          f += " (Integer)";
          break;
        case e.Type.BITSTRING:
          f += " (Bit string)";
          break;
        case e.Type.OCTETSTRING:
          f += " (Octet string)";
          break;
        case e.Type.NULL:
          f += " (Null)";
          break;
        case e.Type.OID:
          f += " (Object Identifier)";
          break;
        case e.Type.ODESC:
          f += " (Object Descriptor)";
          break;
        case e.Type.EXTERNAL:
          f += " (External or Instance of)";
          break;
        case e.Type.REAL:
          f += " (Real)";
          break;
        case e.Type.ENUMERATED:
          f += " (Enumerated)";
          break;
        case e.Type.EMBEDDED:
          f += " (Embedded PDV)";
          break;
        case e.Type.UTF8:
          f += " (UTF8)";
          break;
        case e.Type.ROID:
          f += " (Relative Object Identifier)";
          break;
        case e.Type.SEQUENCE:
          f += " (Sequence)";
          break;
        case e.Type.SET:
          f += " (Set)";
          break;
        case e.Type.PRINTABLESTRING:
          f += " (Printable String)";
          break;
        case e.Type.IA5String:
          f += " (IA5String (ASCII))";
          break;
        case e.Type.UTCTIME:
          f += " (UTC time)";
          break;
        case e.Type.GENERALIZEDTIME:
          f += " (Generalized time)";
          break;
        case e.Type.BMPSTRING:
          f += " (BMP String)";
          break;
      }
    else
      f += u.type;
    if (f += `
`, f += S + "Constructed: " + u.constructed + `
`, u.composed) {
      for (var T = 0, c = "", U = 0; U < u.value.length; ++U)
        u.value[U] !== void 0 && (T += 1, c += e.prettyPrint(u.value[U], a + 1, p), U + 1 < u.value.length && (c += ","));
      f += S + "Sub values: " + T + c;
    } else {
      if (f += S + "Value: ", u.type === e.Type.OID) {
        var g = e.derToOid(u.value);
        f += g, t.pki && t.pki.oids && g in t.pki.oids && (f += " (" + t.pki.oids[g] + ") ");
      }
      if (u.type === e.Type.INTEGER)
        try {
          f += e.derToInteger(u.value);
        } catch {
          f += "0x" + t.util.bytesToHex(u.value);
        }
      else if (u.type === e.Type.BITSTRING) {
        if (u.value.length > 1 ? f += "0x" + t.util.bytesToHex(u.value.slice(1)) : f += "(none)", u.value.length > 0) {
          var C = u.value.charCodeAt(0);
          C == 1 ? f += " (1 unused bit shown)" : C > 1 && (f += " (" + C + " unused bits shown)");
        }
      } else if (u.type === e.Type.OCTETSTRING)
        v.test(u.value) || (f += "(" + u.value + ") "), f += "0x" + t.util.bytesToHex(u.value);
      else if (u.type === e.Type.UTF8)
        try {
          f += t.util.decodeUtf8(u.value);
        } catch (m) {
          if (m.message === "URI malformed")
            f += "0x" + t.util.bytesToHex(u.value) + " (malformed UTF8)";
          else
            throw m;
        }
      else u.type === e.Type.PRINTABLESTRING || u.type === e.Type.IA5String ? f += u.value : v.test(u.value) ? f += "0x" + t.util.bytesToHex(u.value) : u.value.length === 0 ? f += "[null]" : f += u.value;
    }
    return f;
  }, lr.exports;
}
var cr = { exports: {} }, hr, pa;
function ht() {
  if (pa) return hr;
  pa = 1;
  var t = he();
  return hr = t.md = t.md || {}, t.md.algorithms = t.md.algorithms || {}, hr;
}
var ya;
function Ot() {
  if (ya) return cr.exports;
  ya = 1;
  var t = he();
  ht(), pe();
  var e = cr.exports = t.hmac = t.hmac || {};
  return e.create = function() {
    var r = null, l = null, E = null, v = null, u = {};
    return u.start = function(a, p) {
      if (a !== null)
        if (typeof a == "string")
          if (a = a.toLowerCase(), a in t.md.algorithms)
            l = t.md.algorithms[a].create();
          else
            throw new Error('Unknown hash algorithm "' + a + '"');
        else
          l = a;
      if (p === null)
        p = r;
      else {
        if (typeof p == "string")
          p = t.util.createBuffer(p);
        else if (t.util.isArray(p)) {
          var f = p;
          p = t.util.createBuffer();
          for (var S = 0; S < f.length; ++S)
            p.putByte(f[S]);
        }
        var U = p.length();
        U > l.blockLength && (l.start(), l.update(p.bytes()), p = l.digest()), E = t.util.createBuffer(), v = t.util.createBuffer(), U = p.length();
        for (var S = 0; S < U; ++S) {
          var f = p.at(S);
          E.putByte(54 ^ f), v.putByte(92 ^ f);
        }
        if (U < l.blockLength)
          for (var f = l.blockLength - U, S = 0; S < f; ++S)
            E.putByte(54), v.putByte(92);
        r = p, E = E.bytes(), v = v.bytes();
      }
      l.start(), l.update(E);
    }, u.update = function(a) {
      l.update(a);
    }, u.getMac = function() {
      var a = l.digest().bytes();
      return l.start(), l.update(v), l.update(a), l.digest();
    }, u.digest = u.getMac, u;
  }, cr.exports;
}
var dr = { exports: {} }, ga;
function jr() {
  if (ga) return dr.exports;
  ga = 1;
  var t = he();
  ht(), pe();
  var e = dr.exports = t.md5 = t.md5 || {};
  t.md.md5 = t.md.algorithms.md5 = e, e.create = function() {
    u || a();
    var f = null, S = t.util.createBuffer(), U = new Array(16), T = {
      algorithm: "md5",
      blockLength: 64,
      digestLength: 16,
      // 56-bit length of message so far (does not including padding)
      messageLength: 0,
      // true message length
      fullMessageLength: null,
      // size of message length in bytes
      messageLengthSize: 8
    };
    return T.start = function() {
      T.messageLength = 0, T.fullMessageLength = T.messageLength64 = [];
      for (var c = T.messageLengthSize / 4, g = 0; g < c; ++g)
        T.fullMessageLength.push(0);
      return S = t.util.createBuffer(), f = {
        h0: 1732584193,
        h1: 4023233417,
        h2: 2562383102,
        h3: 271733878
      }, T;
    }, T.start(), T.update = function(c, g) {
      g === "utf8" && (c = t.util.encodeUtf8(c));
      var C = c.length;
      T.messageLength += C, C = [C / 4294967296 >>> 0, C >>> 0];
      for (var m = T.fullMessageLength.length - 1; m >= 0; --m)
        T.fullMessageLength[m] += C[1], C[1] = C[0] + (T.fullMessageLength[m] / 4294967296 >>> 0), T.fullMessageLength[m] = T.fullMessageLength[m] >>> 0, C[0] = C[1] / 4294967296 >>> 0;
      return S.putBytes(c), p(f, U, S), (S.read > 2048 || S.length() === 0) && S.compact(), T;
    }, T.digest = function() {
      var c = t.util.createBuffer();
      c.putBytes(S.bytes());
      var g = T.fullMessageLength[T.fullMessageLength.length - 1] + T.messageLengthSize, C = g & T.blockLength - 1;
      c.putBytes(r.substr(0, T.blockLength - C));
      for (var m, s = 0, d = T.fullMessageLength.length - 1; d >= 0; --d)
        m = T.fullMessageLength[d] * 8 + s, s = m / 4294967296 >>> 0, c.putInt32Le(m >>> 0);
      var y = {
        h0: f.h0,
        h1: f.h1,
        h2: f.h2,
        h3: f.h3
      };
      p(y, U, c);
      var B = t.util.createBuffer();
      return B.putInt32Le(y.h0), B.putInt32Le(y.h1), B.putInt32Le(y.h2), B.putInt32Le(y.h3), B;
    }, T;
  };
  var r = null, l = null, E = null, v = null, u = !1;
  function a() {
    r = "", r += t.util.fillString("\0", 64), l = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      1,
      6,
      11,
      0,
      5,
      10,
      15,
      4,
      9,
      14,
      3,
      8,
      13,
      2,
      7,
      12,
      5,
      8,
      11,
      14,
      1,
      4,
      7,
      10,
      13,
      0,
      3,
      6,
      9,
      12,
      15,
      2,
      0,
      7,
      14,
      5,
      12,
      3,
      10,
      1,
      8,
      15,
      6,
      13,
      4,
      11,
      2,
      9
    ], E = [
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
    ], v = new Array(64);
    for (var f = 0; f < 64; ++f)
      v[f] = Math.floor(Math.abs(Math.sin(f + 1)) * 4294967296);
    u = !0;
  }
  function p(f, S, U) {
    for (var T, c, g, C, m, s, d, y, B = U.length(); B >= 64; ) {
      for (c = f.h0, g = f.h1, C = f.h2, m = f.h3, y = 0; y < 16; ++y)
        S[y] = U.getInt32Le(), s = m ^ g & (C ^ m), T = c + s + v[y] + S[y], d = E[y], c = m, m = C, C = g, g += T << d | T >>> 32 - d;
      for (; y < 32; ++y)
        s = C ^ m & (g ^ C), T = c + s + v[y] + S[l[y]], d = E[y], c = m, m = C, C = g, g += T << d | T >>> 32 - d;
      for (; y < 48; ++y)
        s = g ^ C ^ m, T = c + s + v[y] + S[l[y]], d = E[y], c = m, m = C, C = g, g += T << d | T >>> 32 - d;
      for (; y < 64; ++y)
        s = C ^ (g | ~m), T = c + s + v[y] + S[l[y]], d = E[y], c = m, m = C, C = g, g += T << d | T >>> 32 - d;
      f.h0 = f.h0 + c | 0, f.h1 = f.h1 + g | 0, f.h2 = f.h2 + C | 0, f.h3 = f.h3 + m | 0, B -= 64;
    }
  }
  return dr.exports;
}
var pr = { exports: {} }, va;
function wt() {
  if (va) return pr.exports;
  va = 1;
  var t = he();
  pe();
  var e = pr.exports = t.pem = t.pem || {};
  e.encode = function(E, v) {
    v = v || {};
    var u = "-----BEGIN " + E.type + `-----\r
`, a;
    if (E.procType && (a = {
      name: "Proc-Type",
      values: [String(E.procType.version), E.procType.type]
    }, u += r(a)), E.contentDomain && (a = { name: "Content-Domain", values: [E.contentDomain] }, u += r(a)), E.dekInfo && (a = { name: "DEK-Info", values: [E.dekInfo.algorithm] }, E.dekInfo.parameters && a.values.push(E.dekInfo.parameters), u += r(a)), E.headers)
      for (var p = 0; p < E.headers.length; ++p)
        u += r(E.headers[p]);
    return E.procType && (u += `\r
`), u += t.util.encode64(E.body, v.maxline || 64) + `\r
`, u += "-----END " + E.type + `-----\r
`, u;
  }, e.decode = function(E) {
    for (var v = [], u = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g, a = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/, p = /\r?\n/, f; f = u.exec(E), !!f; ) {
      var S = f[1];
      S === "NEW CERTIFICATE REQUEST" && (S = "CERTIFICATE REQUEST");
      var U = {
        type: S,
        procType: null,
        contentDomain: null,
        dekInfo: null,
        headers: [],
        body: t.util.decode64(f[3])
      };
      if (v.push(U), !!f[2]) {
        for (var T = f[2].split(p), c = 0; f && c < T.length; ) {
          for (var g = T[c].replace(/\s+$/, ""), C = c + 1; C < T.length; ++C) {
            var m = T[C];
            if (!/\s/.test(m[0]))
              break;
            g += m, c = C;
          }
          if (f = g.match(a), f) {
            for (var s = { name: f[1], values: [] }, d = f[2].split(","), y = 0; y < d.length; ++y)
              s.values.push(l(d[y]));
            if (U.procType)
              if (!U.contentDomain && s.name === "Content-Domain")
                U.contentDomain = d[0] || "";
              else if (!U.dekInfo && s.name === "DEK-Info") {
                if (s.values.length === 0)
                  throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');
                U.dekInfo = { algorithm: d[0], parameters: d[1] || null };
              } else
                U.headers.push(s);
            else {
              if (s.name !== "Proc-Type")
                throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');
              if (s.values.length !== 2)
                throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');
              U.procType = { version: d[0], type: d[1] };
            }
          }
          ++c;
        }
        if (U.procType === "ENCRYPTED" && !U.dekInfo)
          throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".');
      }
    }
    if (v.length === 0)
      throw new Error("Invalid PEM formatted message.");
    return v;
  };
  function r(E) {
    for (var v = E.name + ": ", u = [], a = function(T, c) {
      return " " + c;
    }, p = 0; p < E.values.length; ++p)
      u.push(E.values[p].replace(/^(\S+\r\n)/, a));
    v += u.join(",") + `\r
`;
    for (var f = 0, S = -1, p = 0; p < v.length; ++p, ++f)
      if (f > 65 && S !== -1) {
        var U = v[S];
        U === "," ? (++S, v = v.substr(0, S) + `\r
 ` + v.substr(S)) : v = v.substr(0, S) + `\r
` + U + v.substr(S + 1), f = p - S - 1, S = -1, ++p;
      } else (v[p] === " " || v[p] === "	" || v[p] === ",") && (S = p);
    return v;
  }
  function l(E) {
    return E.replace(/^\s+/, "");
  }
  return pr.exports;
}
var yr = { exports: {} }, gr, ma;
function Yt() {
  if (ma) return gr;
  ma = 1;
  var t = he();
  Yr(), on(), pe(), gr = t.des = t.des || {}, t.des.startEncrypting = function(c, g, C, m) {
    var s = T({
      key: c,
      output: C,
      decrypt: !1,
      mode: m || (g === null ? "ECB" : "CBC")
    });
    return s.start(g), s;
  }, t.des.createEncryptionCipher = function(c, g) {
    return T({
      key: c,
      output: null,
      decrypt: !1,
      mode: g
    });
  }, t.des.startDecrypting = function(c, g, C, m) {
    var s = T({
      key: c,
      output: C,
      decrypt: !0,
      mode: m || (g === null ? "ECB" : "CBC")
    });
    return s.start(g), s;
  }, t.des.createDecryptionCipher = function(c, g) {
    return T({
      key: c,
      output: null,
      decrypt: !0,
      mode: g
    });
  }, t.des.Algorithm = function(c, g) {
    var C = this;
    C.name = c, C.mode = new g({
      blockSize: 8,
      cipher: {
        encrypt: function(m, s) {
          return U(C._keys, m, s, !1);
        },
        decrypt: function(m, s) {
          return U(C._keys, m, s, !0);
        }
      }
    }), C._init = !1;
  }, t.des.Algorithm.prototype.initialize = function(c) {
    if (!this._init) {
      var g = t.util.createBuffer(c.key);
      if (this.name.indexOf("3DES") === 0 && g.length() !== 24)
        throw new Error("Invalid Triple-DES key size: " + g.length() * 8);
      this._keys = S(g), this._init = !0;
    }
  }, e("DES-ECB", t.cipher.modes.ecb), e("DES-CBC", t.cipher.modes.cbc), e("DES-CFB", t.cipher.modes.cfb), e("DES-OFB", t.cipher.modes.ofb), e("DES-CTR", t.cipher.modes.ctr), e("3DES-ECB", t.cipher.modes.ecb), e("3DES-CBC", t.cipher.modes.cbc), e("3DES-CFB", t.cipher.modes.cfb), e("3DES-OFB", t.cipher.modes.ofb), e("3DES-CTR", t.cipher.modes.ctr);
  function e(c, g) {
    var C = function() {
      return new t.des.Algorithm(c, g);
    };
    t.cipher.registerAlgorithm(c, C);
  }
  var r = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756], l = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344], E = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584], v = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928], u = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080], a = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312], p = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154], f = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
  function S(c) {
    for (var g = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], C = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], m = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], s = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], d = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], y = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], B = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], b = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], h = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], i = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], n = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], A = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], _ = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], P = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261], D = c.length() > 8 ? 3 : 1, K = [], q = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0], H = 0, G, X = 0; X < D; X++) {
      var Z = c.getInt32(), F = c.getInt32();
      G = (Z >>> 4 ^ F) & 252645135, F ^= G, Z ^= G << 4, G = (F >>> -16 ^ Z) & 65535, Z ^= G, F ^= G << -16, G = (Z >>> 2 ^ F) & 858993459, F ^= G, Z ^= G << 2, G = (F >>> -16 ^ Z) & 65535, Z ^= G, F ^= G << -16, G = (Z >>> 1 ^ F) & 1431655765, F ^= G, Z ^= G << 1, G = (F >>> 8 ^ Z) & 16711935, Z ^= G, F ^= G << 8, G = (Z >>> 1 ^ F) & 1431655765, F ^= G, Z ^= G << 1, G = Z << 8 | F >>> 20 & 240, Z = F << 24 | F << 8 & 16711680 | F >>> 8 & 65280 | F >>> 24 & 240, F = G;
      for (var Y = 0; Y < q.length; ++Y) {
        q[Y] ? (Z = Z << 2 | Z >>> 26, F = F << 2 | F >>> 26) : (Z = Z << 1 | Z >>> 27, F = F << 1 | F >>> 27), Z &= -15, F &= -15;
        var ee = g[Z >>> 28] | C[Z >>> 24 & 15] | m[Z >>> 20 & 15] | s[Z >>> 16 & 15] | d[Z >>> 12 & 15] | y[Z >>> 8 & 15] | B[Z >>> 4 & 15], se = b[F >>> 28] | h[F >>> 24 & 15] | i[F >>> 20 & 15] | n[F >>> 16 & 15] | A[F >>> 12 & 15] | _[F >>> 8 & 15] | P[F >>> 4 & 15];
        G = (se >>> 16 ^ ee) & 65535, K[H++] = ee ^ G, K[H++] = se ^ G << 16;
      }
    }
    return K;
  }
  function U(c, g, C, m) {
    var s = c.length === 32 ? 3 : 9, d;
    s === 3 ? d = m ? [30, -2, -2] : [0, 32, 2] : d = m ? [94, 62, -2, 32, 64, 2, 30, -2, -2] : [0, 32, 2, 62, 30, -2, 64, 96, 2];
    var y, B = g[0], b = g[1];
    y = (B >>> 4 ^ b) & 252645135, b ^= y, B ^= y << 4, y = (B >>> 16 ^ b) & 65535, b ^= y, B ^= y << 16, y = (b >>> 2 ^ B) & 858993459, B ^= y, b ^= y << 2, y = (b >>> 8 ^ B) & 16711935, B ^= y, b ^= y << 8, y = (B >>> 1 ^ b) & 1431655765, b ^= y, B ^= y << 1, B = B << 1 | B >>> 31, b = b << 1 | b >>> 31;
    for (var h = 0; h < s; h += 3) {
      for (var i = d[h + 1], n = d[h + 2], A = d[h]; A != i; A += n) {
        var _ = b ^ c[A], P = (b >>> 4 | b << 28) ^ c[A + 1];
        y = B, B = b, b = y ^ (l[_ >>> 24 & 63] | v[_ >>> 16 & 63] | a[_ >>> 8 & 63] | f[_ & 63] | r[P >>> 24 & 63] | E[P >>> 16 & 63] | u[P >>> 8 & 63] | p[P & 63]);
      }
      y = B, B = b, b = y;
    }
    B = B >>> 1 | B << 31, b = b >>> 1 | b << 31, y = (B >>> 1 ^ b) & 1431655765, b ^= y, B ^= y << 1, y = (b >>> 8 ^ B) & 16711935, B ^= y, b ^= y << 8, y = (b >>> 2 ^ B) & 858993459, B ^= y, b ^= y << 2, y = (B >>> 16 ^ b) & 65535, b ^= y, B ^= y << 16, y = (B >>> 4 ^ b) & 252645135, b ^= y, B ^= y << 4, C[0] = B, C[1] = b;
  }
  function T(c) {
    c = c || {};
    var g = (c.mode || "CBC").toUpperCase(), C = "DES-" + g, m;
    c.decrypt ? m = t.cipher.createDecipher(C, c.key) : m = t.cipher.createCipher(C, c.key);
    var s = m.start;
    return m.start = function(d, y) {
      var B = null;
      y instanceof t.util.ByteBuffer && (B = y, y = {}), y = y || {}, y.output = B, y.iv = d, s.call(m, y);
    }, m;
  }
  return gr;
}
const ii = {}, si = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ii
}, Symbol.toStringTag, { value: "Module" })), Wr = /* @__PURE__ */ Wn(si);
var vr, Ca;
function Zr() {
  if (Ca) return vr;
  Ca = 1;
  var t = he();
  Ot(), ht(), pe();
  var e = t.pkcs5 = t.pkcs5 || {}, r;
  return t.util.isNodejs && !t.options.usePureJavaScript && (r = Wr), vr = t.pbkdf2 = e.pbkdf2 = function(l, E, v, u, a, p) {
    if (typeof a == "function" && (p = a, a = null), t.util.isNodejs && !t.options.usePureJavaScript && r.pbkdf2 && (a === null || typeof a != "object") && (r.pbkdf2Sync.length > 4 || !a || a === "sha1"))
      return typeof a != "string" && (a = "sha1"), l = Buffer.from(l, "binary"), E = Buffer.from(E, "binary"), p ? r.pbkdf2Sync.length === 4 ? r.pbkdf2(l, E, v, u, function(h, i) {
        if (h)
          return p(h);
        p(null, i.toString("binary"));
      }) : r.pbkdf2(l, E, v, u, a, function(h, i) {
        if (h)
          return p(h);
        p(null, i.toString("binary"));
      }) : r.pbkdf2Sync.length === 4 ? r.pbkdf2Sync(l, E, v, u).toString("binary") : r.pbkdf2Sync(l, E, v, u, a).toString("binary");
    if ((typeof a > "u" || a === null) && (a = "sha1"), typeof a == "string") {
      if (!(a in t.md.algorithms))
        throw new Error("Unknown hash algorithm: " + a);
      a = t.md[a].create();
    }
    var f = a.digestLength;
    if (u > 4294967295 * f) {
      var S = new Error("Derived key is too long.");
      if (p)
        return p(S);
      throw S;
    }
    var U = Math.ceil(u / f), T = u - (U - 1) * f, c = t.hmac.create();
    c.start(a, l);
    var g = "", C, m, s;
    if (!p) {
      for (var d = 1; d <= U; ++d) {
        c.start(null, null), c.update(E), c.update(t.util.int32ToBytes(d)), C = s = c.digest().getBytes();
        for (var y = 2; y <= v; ++y)
          c.start(null, null), c.update(s), m = c.digest().getBytes(), C = t.util.xorBytes(C, m, f), s = m;
        g += d < U ? C : C.substr(0, T);
      }
      return g;
    }
    var d = 1, y;
    function B() {
      if (d > U)
        return p(null, g);
      c.start(null, null), c.update(E), c.update(t.util.int32ToBytes(d)), C = s = c.digest().getBytes(), y = 2, b();
    }
    function b() {
      if (y <= v)
        return c.start(null, null), c.update(s), m = c.digest().getBytes(), C = t.util.xorBytes(C, m, f), s = m, ++y, t.util.setImmediate(b);
      g += d < U ? C : C.substr(0, T), ++d, B();
    }
    B();
  }, vr;
}
var Ht = { exports: {} }, mr = { exports: {} }, Ea;
function un() {
  if (Ea) return mr.exports;
  Ea = 1;
  var t = he();
  ht(), pe();
  var e = mr.exports = t.sha256 = t.sha256 || {};
  t.md.sha256 = t.md.algorithms.sha256 = e, e.create = function() {
    l || v();
    var a = null, p = t.util.createBuffer(), f = new Array(64), S = {
      algorithm: "sha256",
      blockLength: 64,
      digestLength: 32,
      // 56-bit length of message so far (does not including padding)
      messageLength: 0,
      // true message length
      fullMessageLength: null,
      // size of message length in bytes
      messageLengthSize: 8
    };
    return S.start = function() {
      S.messageLength = 0, S.fullMessageLength = S.messageLength64 = [];
      for (var U = S.messageLengthSize / 4, T = 0; T < U; ++T)
        S.fullMessageLength.push(0);
      return p = t.util.createBuffer(), a = {
        h0: 1779033703,
        h1: 3144134277,
        h2: 1013904242,
        h3: 2773480762,
        h4: 1359893119,
        h5: 2600822924,
        h6: 528734635,
        h7: 1541459225
      }, S;
    }, S.start(), S.update = function(U, T) {
      T === "utf8" && (U = t.util.encodeUtf8(U));
      var c = U.length;
      S.messageLength += c, c = [c / 4294967296 >>> 0, c >>> 0];
      for (var g = S.fullMessageLength.length - 1; g >= 0; --g)
        S.fullMessageLength[g] += c[1], c[1] = c[0] + (S.fullMessageLength[g] / 4294967296 >>> 0), S.fullMessageLength[g] = S.fullMessageLength[g] >>> 0, c[0] = c[1] / 4294967296 >>> 0;
      return p.putBytes(U), u(a, f, p), (p.read > 2048 || p.length() === 0) && p.compact(), S;
    }, S.digest = function() {
      var U = t.util.createBuffer();
      U.putBytes(p.bytes());
      var T = S.fullMessageLength[S.fullMessageLength.length - 1] + S.messageLengthSize, c = T & S.blockLength - 1;
      U.putBytes(r.substr(0, S.blockLength - c));
      for (var g, C, m = S.fullMessageLength[0] * 8, s = 0; s < S.fullMessageLength.length - 1; ++s)
        g = S.fullMessageLength[s + 1] * 8, C = g / 4294967296 >>> 0, m += C, U.putInt32(m >>> 0), m = g >>> 0;
      U.putInt32(m);
      var d = {
        h0: a.h0,
        h1: a.h1,
        h2: a.h2,
        h3: a.h3,
        h4: a.h4,
        h5: a.h5,
        h6: a.h6,
        h7: a.h7
      };
      u(d, f, U);
      var y = t.util.createBuffer();
      return y.putInt32(d.h0), y.putInt32(d.h1), y.putInt32(d.h2), y.putInt32(d.h3), y.putInt32(d.h4), y.putInt32(d.h5), y.putInt32(d.h6), y.putInt32(d.h7), y;
    }, S;
  };
  var r = null, l = !1, E = null;
  function v() {
    r = "", r += t.util.fillString("\0", 64), E = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ], l = !0;
  }
  function u(a, p, f) {
    for (var S, U, T, c, g, C, m, s, d, y, B, b, h, i, n, A = f.length(); A >= 64; ) {
      for (m = 0; m < 16; ++m)
        p[m] = f.getInt32();
      for (; m < 64; ++m)
        S = p[m - 2], S = (S >>> 17 | S << 15) ^ (S >>> 19 | S << 13) ^ S >>> 10, U = p[m - 15], U = (U >>> 7 | U << 25) ^ (U >>> 18 | U << 14) ^ U >>> 3, p[m] = S + p[m - 7] + U + p[m - 16] | 0;
      for (s = a.h0, d = a.h1, y = a.h2, B = a.h3, b = a.h4, h = a.h5, i = a.h6, n = a.h7, m = 0; m < 64; ++m)
        c = (b >>> 6 | b << 26) ^ (b >>> 11 | b << 21) ^ (b >>> 25 | b << 7), g = i ^ b & (h ^ i), T = (s >>> 2 | s << 30) ^ (s >>> 13 | s << 19) ^ (s >>> 22 | s << 10), C = s & d | y & (s ^ d), S = n + c + g + E[m] + p[m], U = T + C, n = i, i = h, h = b, b = B + S >>> 0, B = y, y = d, d = s, s = S + U >>> 0;
      a.h0 = a.h0 + s | 0, a.h1 = a.h1 + d | 0, a.h2 = a.h2 + y | 0, a.h3 = a.h3 + B | 0, a.h4 = a.h4 + b | 0, a.h5 = a.h5 + h | 0, a.h6 = a.h6 + i | 0, a.h7 = a.h7 + n | 0, A -= 64;
    }
  }
  return mr.exports;
}
var Cr = { exports: {} }, xa;
function ln() {
  if (xa) return Cr.exports;
  xa = 1;
  var t = he();
  pe();
  var e = null;
  t.util.isNodejs && !t.options.usePureJavaScript && !process.versions["node-webkit"] && (e = Wr);
  var r = Cr.exports = t.prng = t.prng || {};
  return r.create = function(l) {
    for (var E = {
      plugin: l,
      key: null,
      seed: null,
      time: null,
      // number of reseeds so far
      reseeds: 0,
      // amount of data generated so far
      generated: 0,
      // no initial key bytes
      keyBytes: ""
    }, v = l.md, u = new Array(32), a = 0; a < 32; ++a)
      u[a] = v.create();
    E.pools = u, E.pool = 0, E.generate = function(T, c) {
      if (!c)
        return E.generateSync(T);
      var g = E.plugin.cipher, C = E.plugin.increment, m = E.plugin.formatKey, s = E.plugin.formatSeed, d = t.util.createBuffer();
      E.key = null, y();
      function y(B) {
        if (B)
          return c(B);
        if (d.length() >= T)
          return c(null, d.getBytes(T));
        if (E.generated > 1048575 && (E.key = null), E.key === null)
          return t.util.nextTick(function() {
            p(y);
          });
        var b = g(E.key, E.seed);
        E.generated += b.length, d.putBytes(b), E.key = m(g(E.key, C(E.seed))), E.seed = s(g(E.key, E.seed)), t.util.setImmediate(y);
      }
    }, E.generateSync = function(T) {
      var c = E.plugin.cipher, g = E.plugin.increment, C = E.plugin.formatKey, m = E.plugin.formatSeed;
      E.key = null;
      for (var s = t.util.createBuffer(); s.length() < T; ) {
        E.generated > 1048575 && (E.key = null), E.key === null && f();
        var d = c(E.key, E.seed);
        E.generated += d.length, s.putBytes(d), E.key = C(c(E.key, g(E.seed))), E.seed = m(c(E.key, E.seed));
      }
      return s.getBytes(T);
    };
    function p(T) {
      if (E.pools[0].messageLength >= 32)
        return S(), T();
      var c = 32 - E.pools[0].messageLength << 5;
      E.seedFile(c, function(g, C) {
        if (g)
          return T(g);
        E.collect(C), S(), T();
      });
    }
    function f() {
      if (E.pools[0].messageLength >= 32)
        return S();
      var T = 32 - E.pools[0].messageLength << 5;
      E.collect(E.seedFileSync(T)), S();
    }
    function S() {
      E.reseeds = E.reseeds === 4294967295 ? 0 : E.reseeds + 1;
      var T = E.plugin.md.create();
      T.update(E.keyBytes);
      for (var c = 1, g = 0; g < 32; ++g)
        E.reseeds % c === 0 && (T.update(E.pools[g].digest().getBytes()), E.pools[g].start()), c = c << 1;
      E.keyBytes = T.digest().getBytes(), T.start(), T.update(E.keyBytes);
      var C = T.digest().getBytes();
      E.key = E.plugin.formatKey(E.keyBytes), E.seed = E.plugin.formatSeed(C), E.generated = 0;
    }
    function U(T) {
      var c = null, g = t.util.globalScope, C = g.crypto || g.msCrypto;
      C && C.getRandomValues && (c = function(n) {
        return C.getRandomValues(n);
      });
      var m = t.util.createBuffer();
      if (c)
        for (; m.length() < T; ) {
          var s = Math.max(1, Math.min(T - m.length(), 65536) / 4), d = new Uint32Array(Math.floor(s));
          try {
            c(d);
            for (var y = 0; y < d.length; ++y)
              m.putInt32(d[y]);
          } catch (n) {
            if (!(typeof QuotaExceededError < "u" && n instanceof QuotaExceededError))
              throw n;
          }
        }
      if (m.length() < T)
        for (var B, b, h, i = Math.floor(Math.random() * 65536); m.length() < T; ) {
          b = 16807 * (i & 65535), B = 16807 * (i >> 16), b += (B & 32767) << 16, b += B >> 15, b = (b & 2147483647) + (b >> 31), i = b & 4294967295;
          for (var y = 0; y < 3; ++y)
            h = i >>> (y << 3), h ^= Math.floor(Math.random() * 256), m.putByte(h & 255);
        }
      return m.getBytes(T);
    }
    return e ? (E.seedFile = function(T, c) {
      e.randomBytes(T, function(g, C) {
        if (g)
          return c(g);
        c(null, C.toString());
      });
    }, E.seedFileSync = function(T) {
      return e.randomBytes(T).toString();
    }) : (E.seedFile = function(T, c) {
      try {
        c(null, U(T));
      } catch (g) {
        c(g);
      }
    }, E.seedFileSync = U), E.collect = function(T) {
      for (var c = T.length, g = 0; g < c; ++g)
        E.pools[E.pool].update(T.substr(g, 1)), E.pool = E.pool === 31 ? 0 : E.pool + 1;
    }, E.collectInt = function(T, c) {
      for (var g = "", C = 0; C < c; C += 8)
        g += String.fromCharCode(T >> C & 255);
      E.collect(g);
    }, E.registerWorker = function(T) {
      if (T === self)
        E.seedFile = function(g, C) {
          function m(s) {
            var d = s.data;
            d.forge && d.forge.prng && (self.removeEventListener("message", m), C(d.forge.prng.err, d.forge.prng.bytes));
          }
          self.addEventListener("message", m), self.postMessage({ forge: { prng: { needed: g } } });
        };
      else {
        var c = function(g) {
          var C = g.data;
          C.forge && C.forge.prng && E.seedFile(C.forge.prng.needed, function(m, s) {
            T.postMessage({ forge: { prng: { err: m, bytes: s } } });
          });
        };
        T.addEventListener("message", c);
      }
    }, E;
  }, Cr.exports;
}
var Sa;
function st() {
  if (Sa) return Ht.exports;
  Sa = 1;
  var t = he();
  return xt(), un(), ln(), pe(), (function() {
    if (t.random && t.random.getBytes) {
      Ht.exports = t.random;
      return;
    }
    (function(e) {
      var r = {}, l = new Array(4), E = t.util.createBuffer();
      r.formatKey = function(T) {
        var c = t.util.createBuffer(T);
        return T = new Array(4), T[0] = c.getInt32(), T[1] = c.getInt32(), T[2] = c.getInt32(), T[3] = c.getInt32(), t.aes._expandKey(T, !1);
      }, r.formatSeed = function(T) {
        var c = t.util.createBuffer(T);
        return T = new Array(4), T[0] = c.getInt32(), T[1] = c.getInt32(), T[2] = c.getInt32(), T[3] = c.getInt32(), T;
      }, r.cipher = function(T, c) {
        return t.aes._updateBlock(T, c, l, !1), E.putInt32(l[0]), E.putInt32(l[1]), E.putInt32(l[2]), E.putInt32(l[3]), E.getBytes();
      }, r.increment = function(T) {
        return ++T[3], T;
      }, r.md = t.md.sha256;
      function v() {
        var T = t.prng.create(r);
        return T.getBytes = function(c, g) {
          return T.generate(c, g);
        }, T.getBytesSync = function(c) {
          return T.generate(c);
        }, T;
      }
      var u = v(), a = null, p = t.util.globalScope, f = p.crypto || p.msCrypto;
      if (f && f.getRandomValues && (a = function(T) {
        return f.getRandomValues(T);
      }), t.options.usePureJavaScript || !t.util.isNodejs && !a) {
        if (u.collectInt(+/* @__PURE__ */ new Date(), 32), typeof navigator < "u") {
          var S = "";
          for (var U in navigator)
            try {
              typeof navigator[U] == "string" && (S += navigator[U]);
            } catch {
            }
          u.collect(S), S = null;
        }
        e && (e().mousemove(function(T) {
          u.collectInt(T.clientX, 16), u.collectInt(T.clientY, 16);
        }), e().keypress(function(T) {
          u.collectInt(T.charCode, 8);
        }));
      }
      if (!t.random)
        t.random = u;
      else
        for (var U in u)
          t.random[U] = u[U];
      t.random.createInstance = v, Ht.exports = t.random;
    })(typeof jQuery < "u" ? jQuery : null);
  })(), Ht.exports;
}
var Er, Ta;
function fn() {
  if (Ta) return Er;
  Ta = 1;
  var t = he();
  pe();
  var e = [
    217,
    120,
    249,
    196,
    25,
    221,
    181,
    237,
    40,
    233,
    253,
    121,
    74,
    160,
    216,
    157,
    198,
    126,
    55,
    131,
    43,
    118,
    83,
    142,
    98,
    76,
    100,
    136,
    68,
    139,
    251,
    162,
    23,
    154,
    89,
    245,
    135,
    179,
    79,
    19,
    97,
    69,
    109,
    141,
    9,
    129,
    125,
    50,
    189,
    143,
    64,
    235,
    134,
    183,
    123,
    11,
    240,
    149,
    33,
    34,
    92,
    107,
    78,
    130,
    84,
    214,
    101,
    147,
    206,
    96,
    178,
    28,
    115,
    86,
    192,
    20,
    167,
    140,
    241,
    220,
    18,
    117,
    202,
    31,
    59,
    190,
    228,
    209,
    66,
    61,
    212,
    48,
    163,
    60,
    182,
    38,
    111,
    191,
    14,
    218,
    70,
    105,
    7,
    87,
    39,
    242,
    29,
    155,
    188,
    148,
    67,
    3,
    248,
    17,
    199,
    246,
    144,
    239,
    62,
    231,
    6,
    195,
    213,
    47,
    200,
    102,
    30,
    215,
    8,
    232,
    234,
    222,
    128,
    82,
    238,
    247,
    132,
    170,
    114,
    172,
    53,
    77,
    106,
    42,
    150,
    26,
    210,
    113,
    90,
    21,
    73,
    116,
    75,
    159,
    208,
    94,
    4,
    24,
    164,
    236,
    194,
    224,
    65,
    110,
    15,
    81,
    203,
    204,
    36,
    145,
    175,
    80,
    161,
    244,
    112,
    57,
    153,
    124,
    58,
    133,
    35,
    184,
    180,
    122,
    252,
    2,
    54,
    91,
    37,
    85,
    151,
    49,
    45,
    93,
    250,
    152,
    227,
    138,
    146,
    174,
    5,
    223,
    41,
    16,
    103,
    108,
    186,
    201,
    211,
    0,
    230,
    207,
    225,
    158,
    168,
    44,
    99,
    22,
    1,
    63,
    88,
    226,
    137,
    169,
    13,
    56,
    52,
    27,
    171,
    51,
    255,
    176,
    187,
    72,
    12,
    95,
    185,
    177,
    205,
    46,
    197,
    243,
    219,
    71,
    229,
    165,
    156,
    119,
    10,
    166,
    32,
    104,
    254,
    127,
    193,
    173
  ], r = [1, 2, 3, 5], l = function(u, a) {
    return u << a & 65535 | (u & 65535) >> 16 - a;
  }, E = function(u, a) {
    return (u & 65535) >> a | u << 16 - a & 65535;
  };
  Er = t.rc2 = t.rc2 || {}, t.rc2.expandKey = function(u, a) {
    typeof u == "string" && (u = t.util.createBuffer(u)), a = a || 128;
    var p = u, f = u.length(), S = a, U = Math.ceil(S / 8), T = 255 >> (S & 7), c;
    for (c = f; c < 128; c++)
      p.putByte(e[p.at(c - 1) + p.at(c - f) & 255]);
    for (p.setAt(128 - U, e[p.at(128 - U) & T]), c = 127 - U; c >= 0; c--)
      p.setAt(c, e[p.at(c + 1) ^ p.at(c + U)]);
    return p;
  };
  var v = function(u, a, p) {
    var f = !1, S = null, U = null, T = null, c, g, C, m, s = [];
    for (u = t.rc2.expandKey(u, a), C = 0; C < 64; C++)
      s.push(u.getInt16Le());
    p ? (c = function(B) {
      for (C = 0; C < 4; C++)
        B[C] += s[m] + (B[(C + 3) % 4] & B[(C + 2) % 4]) + (~B[(C + 3) % 4] & B[(C + 1) % 4]), B[C] = l(B[C], r[C]), m++;
    }, g = function(B) {
      for (C = 0; C < 4; C++)
        B[C] += s[B[(C + 3) % 4] & 63];
    }) : (c = function(B) {
      for (C = 3; C >= 0; C--)
        B[C] = E(B[C], r[C]), B[C] -= s[m] + (B[(C + 3) % 4] & B[(C + 2) % 4]) + (~B[(C + 3) % 4] & B[(C + 1) % 4]), m--;
    }, g = function(B) {
      for (C = 3; C >= 0; C--)
        B[C] -= s[B[(C + 3) % 4] & 63];
    });
    var d = function(B) {
      var b = [];
      for (C = 0; C < 4; C++) {
        var h = S.getInt16Le();
        T !== null && (p ? h ^= T.getInt16Le() : T.putInt16Le(h)), b.push(h & 65535);
      }
      m = p ? 0 : 63;
      for (var i = 0; i < B.length; i++)
        for (var n = 0; n < B[i][0]; n++)
          B[i][1](b);
      for (C = 0; C < 4; C++)
        T !== null && (p ? T.putInt16Le(b[C]) : b[C] ^= T.getInt16Le()), U.putInt16Le(b[C]);
    }, y = null;
    return y = {
      /**
       * Starts or restarts the encryption or decryption process, whichever
       * was previously configured.
       *
       * To use the cipher in CBC mode, iv may be given either as a string
       * of bytes, or as a byte buffer.  For ECB mode, give null as iv.
       *
       * @param iv the initialization vector to use, null for ECB mode.
       * @param output the output the buffer to write to, null to create one.
       */
      start: function(B, b) {
        B && typeof B == "string" && (B = t.util.createBuffer(B)), f = !1, S = t.util.createBuffer(), U = b || new t.util.createBuffer(), T = B, y.output = U;
      },
      /**
       * Updates the next block.
       *
       * @param input the buffer to read from.
       */
      update: function(B) {
        for (f || S.putBuffer(B); S.length() >= 8; )
          d([
            [5, c],
            [1, g],
            [6, c],
            [1, g],
            [5, c]
          ]);
      },
      /**
       * Finishes encrypting or decrypting.
       *
       * @param pad a padding function to use, null for PKCS#7 padding,
       *           signature(blockSize, buffer, decrypt).
       *
       * @return true if successful, false on error.
       */
      finish: function(B) {
        var b = !0;
        if (p)
          if (B)
            b = B(8, S, !p);
          else {
            var h = S.length() === 8 ? 8 : 8 - S.length();
            S.fillWithByte(h, h);
          }
        if (b && (f = !0, y.update()), !p && (b = S.length() === 0, b))
          if (B)
            b = B(8, U, !p);
          else {
            var i = U.length(), n = U.at(i - 1);
            n > i ? b = !1 : U.truncate(n);
          }
        return b;
      }
    }, y;
  };
  return t.rc2.startEncrypting = function(u, a, p) {
    var f = t.rc2.createEncryptionCipher(u, 128);
    return f.start(a, p), f;
  }, t.rc2.createEncryptionCipher = function(u, a) {
    return v(u, a, !0);
  }, t.rc2.startDecrypting = function(u, a, p) {
    var f = t.rc2.createDecryptionCipher(u, 128);
    return f.start(a, p), f;
  }, t.rc2.createDecryptionCipher = function(u, a) {
    return v(u, a, !1);
  }, Er;
}
var xr, Aa;
function jt() {
  if (Aa) return xr;
  Aa = 1;
  var t = he();
  xr = t.jsbn = t.jsbn || {};
  var e;
  function r(I, N, O) {
    this.data = [], I != null && (typeof I == "number" ? this.fromNumber(I, N, O) : N == null && typeof I != "string" ? this.fromString(I, 256) : this.fromString(I, N));
  }
  t.jsbn.BigInteger = r;
  function l() {
    return new r(null);
  }
  function E(I, N, O, M, j, W) {
    for (; --W >= 0; ) {
      var ne = N * this.data[I++] + O.data[M] + j;
      j = Math.floor(ne / 67108864), O.data[M++] = ne & 67108863;
    }
    return j;
  }
  function v(I, N, O, M, j, W) {
    for (var ne = N & 32767, re = N >> 15; --W >= 0; ) {
      var ye = this.data[I] & 32767, He = this.data[I++] >> 15, et = re * ye + He * ne;
      ye = ne * ye + ((et & 32767) << 15) + O.data[M] + (j & 1073741823), j = (ye >>> 30) + (et >>> 15) + re * He + (j >>> 30), O.data[M++] = ye & 1073741823;
    }
    return j;
  }
  function u(I, N, O, M, j, W) {
    for (var ne = N & 16383, re = N >> 14; --W >= 0; ) {
      var ye = this.data[I] & 16383, He = this.data[I++] >> 14, et = re * ye + He * ne;
      ye = ne * ye + ((et & 16383) << 14) + O.data[M] + j, j = (ye >> 28) + (et >> 14) + re * He, O.data[M++] = ye & 268435455;
    }
    return j;
  }
  typeof navigator > "u" ? (r.prototype.am = u, e = 28) : navigator.appName == "Microsoft Internet Explorer" ? (r.prototype.am = v, e = 30) : navigator.appName != "Netscape" ? (r.prototype.am = E, e = 26) : (r.prototype.am = u, e = 28), r.prototype.DB = e, r.prototype.DM = (1 << e) - 1, r.prototype.DV = 1 << e;
  var a = 52;
  r.prototype.FV = Math.pow(2, a), r.prototype.F1 = a - e, r.prototype.F2 = 2 * e - a;
  var p = "0123456789abcdefghijklmnopqrstuvwxyz", f = new Array(), S, U;
  for (S = 48, U = 0; U <= 9; ++U) f[S++] = U;
  for (S = 97, U = 10; U < 36; ++U) f[S++] = U;
  for (S = 65, U = 10; U < 36; ++U) f[S++] = U;
  function T(I) {
    return p.charAt(I);
  }
  function c(I, N) {
    var O = f[I.charCodeAt(N)];
    return O ?? -1;
  }
  function g(I) {
    for (var N = this.t - 1; N >= 0; --N) I.data[N] = this.data[N];
    I.t = this.t, I.s = this.s;
  }
  function C(I) {
    this.t = 1, this.s = I < 0 ? -1 : 0, I > 0 ? this.data[0] = I : I < -1 ? this.data[0] = I + this.DV : this.t = 0;
  }
  function m(I) {
    var N = l();
    return N.fromInt(I), N;
  }
  function s(I, N) {
    var O;
    if (N == 16) O = 4;
    else if (N == 8) O = 3;
    else if (N == 256) O = 8;
    else if (N == 2) O = 1;
    else if (N == 32) O = 5;
    else if (N == 4) O = 2;
    else {
      this.fromRadix(I, N);
      return;
    }
    this.t = 0, this.s = 0;
    for (var M = I.length, j = !1, W = 0; --M >= 0; ) {
      var ne = O == 8 ? I[M] & 255 : c(I, M);
      if (ne < 0) {
        I.charAt(M) == "-" && (j = !0);
        continue;
      }
      j = !1, W == 0 ? this.data[this.t++] = ne : W + O > this.DB ? (this.data[this.t - 1] |= (ne & (1 << this.DB - W) - 1) << W, this.data[this.t++] = ne >> this.DB - W) : this.data[this.t - 1] |= ne << W, W += O, W >= this.DB && (W -= this.DB);
    }
    O == 8 && (I[0] & 128) != 0 && (this.s = -1, W > 0 && (this.data[this.t - 1] |= (1 << this.DB - W) - 1 << W)), this.clamp(), j && r.ZERO.subTo(this, this);
  }
  function d() {
    for (var I = this.s & this.DM; this.t > 0 && this.data[this.t - 1] == I; ) --this.t;
  }
  function y(I) {
    if (this.s < 0) return "-" + this.negate().toString(I);
    var N;
    if (I == 16) N = 4;
    else if (I == 8) N = 3;
    else if (I == 2) N = 1;
    else if (I == 32) N = 5;
    else if (I == 4) N = 2;
    else return this.toRadix(I);
    var O = (1 << N) - 1, M, j = !1, W = "", ne = this.t, re = this.DB - ne * this.DB % N;
    if (ne-- > 0)
      for (re < this.DB && (M = this.data[ne] >> re) > 0 && (j = !0, W = T(M)); ne >= 0; )
        re < N ? (M = (this.data[ne] & (1 << re) - 1) << N - re, M |= this.data[--ne] >> (re += this.DB - N)) : (M = this.data[ne] >> (re -= N) & O, re <= 0 && (re += this.DB, --ne)), M > 0 && (j = !0), j && (W += T(M));
    return j ? W : "0";
  }
  function B() {
    var I = l();
    return r.ZERO.subTo(this, I), I;
  }
  function b() {
    return this.s < 0 ? this.negate() : this;
  }
  function h(I) {
    var N = this.s - I.s;
    if (N != 0) return N;
    var O = this.t;
    if (N = O - I.t, N != 0) return this.s < 0 ? -N : N;
    for (; --O >= 0; ) if ((N = this.data[O] - I.data[O]) != 0) return N;
    return 0;
  }
  function i(I) {
    var N = 1, O;
    return (O = I >>> 16) != 0 && (I = O, N += 16), (O = I >> 8) != 0 && (I = O, N += 8), (O = I >> 4) != 0 && (I = O, N += 4), (O = I >> 2) != 0 && (I = O, N += 2), (O = I >> 1) != 0 && (I = O, N += 1), N;
  }
  function n() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + i(this.data[this.t - 1] ^ this.s & this.DM);
  }
  function A(I, N) {
    var O;
    for (O = this.t - 1; O >= 0; --O) N.data[O + I] = this.data[O];
    for (O = I - 1; O >= 0; --O) N.data[O] = 0;
    N.t = this.t + I, N.s = this.s;
  }
  function _(I, N) {
    for (var O = I; O < this.t; ++O) N.data[O - I] = this.data[O];
    N.t = Math.max(this.t - I, 0), N.s = this.s;
  }
  function P(I, N) {
    var O = I % this.DB, M = this.DB - O, j = (1 << M) - 1, W = Math.floor(I / this.DB), ne = this.s << O & this.DM, re;
    for (re = this.t - 1; re >= 0; --re)
      N.data[re + W + 1] = this.data[re] >> M | ne, ne = (this.data[re] & j) << O;
    for (re = W - 1; re >= 0; --re) N.data[re] = 0;
    N.data[W] = ne, N.t = this.t + W + 1, N.s = this.s, N.clamp();
  }
  function D(I, N) {
    N.s = this.s;
    var O = Math.floor(I / this.DB);
    if (O >= this.t) {
      N.t = 0;
      return;
    }
    var M = I % this.DB, j = this.DB - M, W = (1 << M) - 1;
    N.data[0] = this.data[O] >> M;
    for (var ne = O + 1; ne < this.t; ++ne)
      N.data[ne - O - 1] |= (this.data[ne] & W) << j, N.data[ne - O] = this.data[ne] >> M;
    M > 0 && (N.data[this.t - O - 1] |= (this.s & W) << j), N.t = this.t - O, N.clamp();
  }
  function K(I, N) {
    for (var O = 0, M = 0, j = Math.min(I.t, this.t); O < j; )
      M += this.data[O] - I.data[O], N.data[O++] = M & this.DM, M >>= this.DB;
    if (I.t < this.t) {
      for (M -= I.s; O < this.t; )
        M += this.data[O], N.data[O++] = M & this.DM, M >>= this.DB;
      M += this.s;
    } else {
      for (M += this.s; O < I.t; )
        M -= I.data[O], N.data[O++] = M & this.DM, M >>= this.DB;
      M -= I.s;
    }
    N.s = M < 0 ? -1 : 0, M < -1 ? N.data[O++] = this.DV + M : M > 0 && (N.data[O++] = M), N.t = O, N.clamp();
  }
  function q(I, N) {
    var O = this.abs(), M = I.abs(), j = O.t;
    for (N.t = j + M.t; --j >= 0; ) N.data[j] = 0;
    for (j = 0; j < M.t; ++j) N.data[j + O.t] = O.am(0, M.data[j], N, j, 0, O.t);
    N.s = 0, N.clamp(), this.s != I.s && r.ZERO.subTo(N, N);
  }
  function H(I) {
    for (var N = this.abs(), O = I.t = 2 * N.t; --O >= 0; ) I.data[O] = 0;
    for (O = 0; O < N.t - 1; ++O) {
      var M = N.am(O, N.data[O], I, 2 * O, 0, 1);
      (I.data[O + N.t] += N.am(O + 1, 2 * N.data[O], I, 2 * O + 1, M, N.t - O - 1)) >= N.DV && (I.data[O + N.t] -= N.DV, I.data[O + N.t + 1] = 1);
    }
    I.t > 0 && (I.data[I.t - 1] += N.am(O, N.data[O], I, 2 * O, 0, 1)), I.s = 0, I.clamp();
  }
  function G(I, N, O) {
    var M = I.abs();
    if (!(M.t <= 0)) {
      var j = this.abs();
      if (j.t < M.t) {
        N != null && N.fromInt(0), O != null && this.copyTo(O);
        return;
      }
      O == null && (O = l());
      var W = l(), ne = this.s, re = I.s, ye = this.DB - i(M.data[M.t - 1]);
      ye > 0 ? (M.lShiftTo(ye, W), j.lShiftTo(ye, O)) : (M.copyTo(W), j.copyTo(O));
      var He = W.t, et = W.data[He - 1];
      if (et != 0) {
        var Je = et * (1 << this.F1) + (He > 1 ? W.data[He - 2] >> this.F2 : 0), ft = this.FV / Je, Ft = (1 << this.F1) / Je, at = 1 << this.F2, nt = O.t, Mt = nt - He, pt = N ?? l();
        for (W.dlShiftTo(Mt, pt), O.compareTo(pt) >= 0 && (O.data[O.t++] = 1, O.subTo(pt, O)), r.ONE.dlShiftTo(He, pt), pt.subTo(W, W); W.t < He; ) W.data[W.t++] = 0;
        for (; --Mt >= 0; ) {
          var $t = O.data[--nt] == et ? this.DM : Math.floor(O.data[nt] * ft + (O.data[nt - 1] + at) * Ft);
          if ((O.data[nt] += W.am(0, $t, O, Mt, 0, He)) < $t)
            for (W.dlShiftTo(Mt, pt), O.subTo(pt, O); O.data[nt] < --$t; ) O.subTo(pt, O);
        }
        N != null && (O.drShiftTo(He, N), ne != re && r.ZERO.subTo(N, N)), O.t = He, O.clamp(), ye > 0 && O.rShiftTo(ye, O), ne < 0 && r.ZERO.subTo(O, O);
      }
    }
  }
  function X(I) {
    var N = l();
    return this.abs().divRemTo(I, null, N), this.s < 0 && N.compareTo(r.ZERO) > 0 && I.subTo(N, N), N;
  }
  function Z(I) {
    this.m = I;
  }
  function F(I) {
    return I.s < 0 || I.compareTo(this.m) >= 0 ? I.mod(this.m) : I;
  }
  function Y(I) {
    return I;
  }
  function ee(I) {
    I.divRemTo(this.m, null, I);
  }
  function se(I, N, O) {
    I.multiplyTo(N, O), this.reduce(O);
  }
  function fe(I, N) {
    I.squareTo(N), this.reduce(N);
  }
  Z.prototype.convert = F, Z.prototype.revert = Y, Z.prototype.reduce = ee, Z.prototype.mulTo = se, Z.prototype.sqrTo = fe;
  function oe() {
    if (this.t < 1) return 0;
    var I = this.data[0];
    if ((I & 1) == 0) return 0;
    var N = I & 3;
    return N = N * (2 - (I & 15) * N) & 15, N = N * (2 - (I & 255) * N) & 255, N = N * (2 - ((I & 65535) * N & 65535)) & 65535, N = N * (2 - I * N % this.DV) % this.DV, N > 0 ? this.DV - N : -N;
  }
  function J(I) {
    this.m = I, this.mp = I.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << I.DB - 15) - 1, this.mt2 = 2 * I.t;
  }
  function $(I) {
    var N = l();
    return I.abs().dlShiftTo(this.m.t, N), N.divRemTo(this.m, null, N), I.s < 0 && N.compareTo(r.ZERO) > 0 && this.m.subTo(N, N), N;
  }
  function ze(I) {
    var N = l();
    return I.copyTo(N), this.reduce(N), N;
  }
  function Qe(I) {
    for (; I.t <= this.mt2; )
      I.data[I.t++] = 0;
    for (var N = 0; N < this.m.t; ++N) {
      var O = I.data[N] & 32767, M = O * this.mpl + ((O * this.mph + (I.data[N] >> 15) * this.mpl & this.um) << 15) & I.DM;
      for (O = N + this.m.t, I.data[O] += this.m.am(0, M, I, N, 0, this.m.t); I.data[O] >= I.DV; )
        I.data[O] -= I.DV, I.data[++O]++;
    }
    I.clamp(), I.drShiftTo(this.m.t, I), I.compareTo(this.m) >= 0 && I.subTo(this.m, I);
  }
  function x(I, N) {
    I.squareTo(N), this.reduce(N);
  }
  function k(I, N, O) {
    I.multiplyTo(N, O), this.reduce(O);
  }
  J.prototype.convert = $, J.prototype.revert = ze, J.prototype.reduce = Qe, J.prototype.mulTo = k, J.prototype.sqrTo = x;
  function L() {
    return (this.t > 0 ? this.data[0] & 1 : this.s) == 0;
  }
  function R(I, N) {
    if (I > 4294967295 || I < 1) return r.ONE;
    var O = l(), M = l(), j = N.convert(this), W = i(I) - 1;
    for (j.copyTo(O); --W >= 0; )
      if (N.sqrTo(O, M), (I & 1 << W) > 0) N.mulTo(M, j, O);
      else {
        var ne = O;
        O = M, M = ne;
      }
    return N.revert(O);
  }
  function o(I, N) {
    var O;
    return I < 256 || N.isEven() ? O = new Z(N) : O = new J(N), this.exp(I, O);
  }
  r.prototype.copyTo = g, r.prototype.fromInt = C, r.prototype.fromString = s, r.prototype.clamp = d, r.prototype.dlShiftTo = A, r.prototype.drShiftTo = _, r.prototype.lShiftTo = P, r.prototype.rShiftTo = D, r.prototype.subTo = K, r.prototype.multiplyTo = q, r.prototype.squareTo = H, r.prototype.divRemTo = G, r.prototype.invDigit = oe, r.prototype.isEven = L, r.prototype.exp = R, r.prototype.toString = y, r.prototype.negate = B, r.prototype.abs = b, r.prototype.compareTo = h, r.prototype.bitLength = n, r.prototype.mod = X, r.prototype.modPowInt = o, r.ZERO = m(0), r.ONE = m(1);
  function w() {
    var I = l();
    return this.copyTo(I), I;
  }
  function V() {
    if (this.s < 0) {
      if (this.t == 1) return this.data[0] - this.DV;
      if (this.t == 0) return -1;
    } else {
      if (this.t == 1) return this.data[0];
      if (this.t == 0) return 0;
    }
    return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0];
  }
  function z() {
    return this.t == 0 ? this.s : this.data[0] << 24 >> 24;
  }
  function ie() {
    return this.t == 0 ? this.s : this.data[0] << 16 >> 16;
  }
  function ae(I) {
    return Math.floor(Math.LN2 * this.DB / Math.log(I));
  }
  function Q() {
    return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this.data[0] <= 0 ? 0 : 1;
  }
  function te(I) {
    if (I == null && (I = 10), this.signum() == 0 || I < 2 || I > 36) return "0";
    var N = this.chunkSize(I), O = Math.pow(I, N), M = m(O), j = l(), W = l(), ne = "";
    for (this.divRemTo(M, j, W); j.signum() > 0; )
      ne = (O + W.intValue()).toString(I).substr(1) + ne, j.divRemTo(M, j, W);
    return W.intValue().toString(I) + ne;
  }
  function ue(I, N) {
    this.fromInt(0), N == null && (N = 10);
    for (var O = this.chunkSize(N), M = Math.pow(N, O), j = !1, W = 0, ne = 0, re = 0; re < I.length; ++re) {
      var ye = c(I, re);
      if (ye < 0) {
        I.charAt(re) == "-" && this.signum() == 0 && (j = !0);
        continue;
      }
      ne = N * ne + ye, ++W >= O && (this.dMultiply(M), this.dAddOffset(ne, 0), W = 0, ne = 0);
    }
    W > 0 && (this.dMultiply(Math.pow(N, W)), this.dAddOffset(ne, 0)), j && r.ZERO.subTo(this, this);
  }
  function de(I, N, O) {
    if (typeof N == "number")
      if (I < 2) this.fromInt(1);
      else
        for (this.fromNumber(I, O), this.testBit(I - 1) || this.bitwiseTo(r.ONE.shiftLeft(I - 1), ve, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(N); )
          this.dAddOffset(2, 0), this.bitLength() > I && this.subTo(r.ONE.shiftLeft(I - 1), this);
    else {
      var M = new Array(), j = I & 7;
      M.length = (I >> 3) + 1, N.nextBytes(M), j > 0 ? M[0] &= (1 << j) - 1 : M[0] = 0, this.fromString(M, 256);
    }
  }
  function ce() {
    var I = this.t, N = new Array();
    N[0] = this.s;
    var O = this.DB - I * this.DB % 8, M, j = 0;
    if (I-- > 0)
      for (O < this.DB && (M = this.data[I] >> O) != (this.s & this.DM) >> O && (N[j++] = M | this.s << this.DB - O); I >= 0; )
        O < 8 ? (M = (this.data[I] & (1 << O) - 1) << 8 - O, M |= this.data[--I] >> (O += this.DB - 8)) : (M = this.data[I] >> (O -= 8) & 255, O <= 0 && (O += this.DB, --I)), (M & 128) != 0 && (M |= -256), j == 0 && (this.s & 128) != (M & 128) && ++j, (j > 0 || M != this.s) && (N[j++] = M);
    return N;
  }
  function Se(I) {
    return this.compareTo(I) == 0;
  }
  function Be(I) {
    return this.compareTo(I) < 0 ? this : I;
  }
  function Ae(I) {
    return this.compareTo(I) > 0 ? this : I;
  }
  function Te(I, N, O) {
    var M, j, W = Math.min(I.t, this.t);
    for (M = 0; M < W; ++M) O.data[M] = N(this.data[M], I.data[M]);
    if (I.t < this.t) {
      for (j = I.s & this.DM, M = W; M < this.t; ++M) O.data[M] = N(this.data[M], j);
      O.t = this.t;
    } else {
      for (j = this.s & this.DM, M = W; M < I.t; ++M) O.data[M] = N(j, I.data[M]);
      O.t = I.t;
    }
    O.s = N(this.s, I.s), O.clamp();
  }
  function Ee(I, N) {
    return I & N;
  }
  function me(I) {
    var N = l();
    return this.bitwiseTo(I, Ee, N), N;
  }
  function ve(I, N) {
    return I | N;
  }
  function Ie(I) {
    var N = l();
    return this.bitwiseTo(I, ve, N), N;
  }
  function _e(I, N) {
    return I ^ N;
  }
  function Xe(I) {
    var N = l();
    return this.bitwiseTo(I, _e, N), N;
  }
  function Ye(I, N) {
    return I & ~N;
  }
  function We(I) {
    var N = l();
    return this.bitwiseTo(I, Ye, N), N;
  }
  function Ze() {
    for (var I = l(), N = 0; N < this.t; ++N) I.data[N] = this.DM & ~this.data[N];
    return I.t = this.t, I.s = ~this.s, I;
  }
  function $e(I) {
    var N = l();
    return I < 0 ? this.rShiftTo(-I, N) : this.lShiftTo(I, N), N;
  }
  function tt(I) {
    var N = l();
    return I < 0 ? this.lShiftTo(-I, N) : this.rShiftTo(I, N), N;
  }
  function ot(I) {
    if (I == 0) return -1;
    var N = 0;
    return (I & 65535) == 0 && (I >>= 16, N += 16), (I & 255) == 0 && (I >>= 8, N += 8), (I & 15) == 0 && (I >>= 4, N += 4), (I & 3) == 0 && (I >>= 2, N += 2), (I & 1) == 0 && ++N, N;
  }
  function lt() {
    for (var I = 0; I < this.t; ++I)
      if (this.data[I] != 0) return I * this.DB + ot(this.data[I]);
    return this.s < 0 ? this.t * this.DB : -1;
  }
  function dt(I) {
    for (var N = 0; I != 0; )
      I &= I - 1, ++N;
    return N;
  }
  function Ct() {
    for (var I = 0, N = this.s & this.DM, O = 0; O < this.t; ++O) I += dt(this.data[O] ^ N);
    return I;
  }
  function Tt(I) {
    var N = Math.floor(I / this.DB);
    return N >= this.t ? this.s != 0 : (this.data[N] & 1 << I % this.DB) != 0;
  }
  function Rt(I, N) {
    var O = r.ONE.shiftLeft(I);
    return this.bitwiseTo(O, N, O), O;
  }
  function Kt(I) {
    return this.changeBit(I, ve);
  }
  function Ne(I) {
    return this.changeBit(I, Ye);
  }
  function we(I) {
    return this.changeBit(I, _e);
  }
  function Re(I, N) {
    for (var O = 0, M = 0, j = Math.min(I.t, this.t); O < j; )
      M += this.data[O] + I.data[O], N.data[O++] = M & this.DM, M >>= this.DB;
    if (I.t < this.t) {
      for (M += I.s; O < this.t; )
        M += this.data[O], N.data[O++] = M & this.DM, M >>= this.DB;
      M += this.s;
    } else {
      for (M += this.s; O < I.t; )
        M += I.data[O], N.data[O++] = M & this.DM, M >>= this.DB;
      M += I.s;
    }
    N.s = M < 0 ? -1 : 0, M > 0 ? N.data[O++] = M : M < -1 && (N.data[O++] = this.DV + M), N.t = O, N.clamp();
  }
  function Le(I) {
    var N = l();
    return this.addTo(I, N), N;
  }
  function ke(I) {
    var N = l();
    return this.subTo(I, N), N;
  }
  function De(I) {
    var N = l();
    return this.multiplyTo(I, N), N;
  }
  function Ue() {
    var I = l();
    return this.squareTo(I), I;
  }
  function Pe(I) {
    var N = l();
    return this.divRemTo(I, N, null), N;
  }
  function Oe(I) {
    var N = l();
    return this.divRemTo(I, null, N), N;
  }
  function Ve(I) {
    var N = l(), O = l();
    return this.divRemTo(I, N, O), new Array(N, O);
  }
  function Ke(I) {
    this.data[this.t] = this.am(0, I - 1, this, 0, 0, this.t), ++this.t, this.clamp();
  }
  function Fe(I, N) {
    if (I != 0) {
      for (; this.t <= N; ) this.data[this.t++] = 0;
      for (this.data[N] += I; this.data[N] >= this.DV; )
        this.data[N] -= this.DV, ++N >= this.t && (this.data[this.t++] = 0), ++this.data[N];
    }
  }
  function xe() {
  }
  function be(I) {
    return I;
  }
  function Me(I, N, O) {
    I.multiplyTo(N, O);
  }
  function qe(I, N) {
    I.squareTo(N);
  }
  xe.prototype.convert = be, xe.prototype.revert = be, xe.prototype.mulTo = Me, xe.prototype.sqrTo = qe;
  function Tn(I) {
    return this.exp(I, new xe());
  }
  function An(I, N, O) {
    var M = Math.min(this.t + I.t, N);
    for (O.s = 0, O.t = M; M > 0; ) O.data[--M] = 0;
    var j;
    for (j = O.t - this.t; M < j; ++M) O.data[M + this.t] = this.am(0, I.data[M], O, M, 0, this.t);
    for (j = Math.min(I.t, N); M < j; ++M) this.am(0, I.data[M], O, M, 0, N - M);
    O.clamp();
  }
  function Bn(I, N, O) {
    --N;
    var M = O.t = this.t + I.t - N;
    for (O.s = 0; --M >= 0; ) O.data[M] = 0;
    for (M = Math.max(N - this.t, 0); M < I.t; ++M)
      O.data[this.t + M - N] = this.am(N - M, I.data[M], O, 0, 0, this.t + M - N);
    O.clamp(), O.drShiftTo(1, O);
  }
  function At(I) {
    this.r2 = l(), this.q3 = l(), r.ONE.dlShiftTo(2 * I.t, this.r2), this.mu = this.r2.divide(I), this.m = I;
  }
  function bn(I) {
    if (I.s < 0 || I.t > 2 * this.m.t) return I.mod(this.m);
    if (I.compareTo(this.m) < 0) return I;
    var N = l();
    return I.copyTo(N), this.reduce(N), N;
  }
  function In(I) {
    return I;
  }
  function _n(I) {
    for (I.drShiftTo(this.m.t - 1, this.r2), I.t > this.m.t + 1 && (I.t = this.m.t + 1, I.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); I.compareTo(this.r2) < 0; ) I.dAddOffset(1, this.m.t + 1);
    for (I.subTo(this.r2, I); I.compareTo(this.m) >= 0; ) I.subTo(this.m, I);
  }
  function Nn(I, N) {
    I.squareTo(N), this.reduce(N);
  }
  function wn(I, N, O) {
    I.multiplyTo(N, O), this.reduce(O);
  }
  At.prototype.convert = bn, At.prototype.revert = In, At.prototype.reduce = _n, At.prototype.mulTo = wn, At.prototype.sqrTo = Nn;
  function Rn(I, N) {
    var O = I.bitLength(), M, j = m(1), W;
    if (O <= 0) return j;
    O < 18 ? M = 1 : O < 48 ? M = 3 : O < 144 ? M = 4 : O < 768 ? M = 5 : M = 6, O < 8 ? W = new Z(N) : N.isEven() ? W = new At(N) : W = new J(N);
    var ne = new Array(), re = 3, ye = M - 1, He = (1 << M) - 1;
    if (ne[1] = W.convert(this), M > 1) {
      var et = l();
      for (W.sqrTo(ne[1], et); re <= He; )
        ne[re] = l(), W.mulTo(et, ne[re - 2], ne[re]), re += 2;
    }
    var Je = I.t - 1, ft, Ft = !0, at = l(), nt;
    for (O = i(I.data[Je]) - 1; Je >= 0; ) {
      for (O >= ye ? ft = I.data[Je] >> O - ye & He : (ft = (I.data[Je] & (1 << O + 1) - 1) << ye - O, Je > 0 && (ft |= I.data[Je - 1] >> this.DB + O - ye)), re = M; (ft & 1) == 0; )
        ft >>= 1, --re;
      if ((O -= re) < 0 && (O += this.DB, --Je), Ft)
        ne[ft].copyTo(j), Ft = !1;
      else {
        for (; re > 1; )
          W.sqrTo(j, at), W.sqrTo(at, j), re -= 2;
        re > 0 ? W.sqrTo(j, at) : (nt = j, j = at, at = nt), W.mulTo(at, ne[ft], j);
      }
      for (; Je >= 0 && (I.data[Je] & 1 << O) == 0; )
        W.sqrTo(j, at), nt = j, j = at, at = nt, --O < 0 && (O = this.DB - 1, --Je);
    }
    return W.revert(j);
  }
  function Ln(I) {
    var N = this.s < 0 ? this.negate() : this.clone(), O = I.s < 0 ? I.negate() : I.clone();
    if (N.compareTo(O) < 0) {
      var M = N;
      N = O, O = M;
    }
    var j = N.getLowestSetBit(), W = O.getLowestSetBit();
    if (W < 0) return N;
    for (j < W && (W = j), W > 0 && (N.rShiftTo(W, N), O.rShiftTo(W, O)); N.signum() > 0; )
      (j = N.getLowestSetBit()) > 0 && N.rShiftTo(j, N), (j = O.getLowestSetBit()) > 0 && O.rShiftTo(j, O), N.compareTo(O) >= 0 ? (N.subTo(O, N), N.rShiftTo(1, N)) : (O.subTo(N, O), O.rShiftTo(1, O));
    return W > 0 && O.lShiftTo(W, O), O;
  }
  function kn(I) {
    if (I <= 0) return 0;
    var N = this.DV % I, O = this.s < 0 ? I - 1 : 0;
    if (this.t > 0)
      if (N == 0) O = this.data[0] % I;
      else for (var M = this.t - 1; M >= 0; --M) O = (N * O + this.data[M]) % I;
    return O;
  }
  function Dn(I) {
    if (this.signum() == 0)
      return r.ZERO;
    var N = I.isEven();
    if (this.isEven() && N || I.signum() == 0) return r.ZERO;
    for (var O = I.clone(), M = this.clone(), j = m(1), W = m(0), ne = m(0), re = m(1); O.signum() != 0; ) {
      for (; O.isEven(); )
        O.rShiftTo(1, O), N ? ((!j.isEven() || !W.isEven()) && (j.addTo(this, j), W.subTo(I, W)), j.rShiftTo(1, j)) : W.isEven() || W.subTo(I, W), W.rShiftTo(1, W);
      for (; M.isEven(); )
        M.rShiftTo(1, M), N ? ((!ne.isEven() || !re.isEven()) && (ne.addTo(this, ne), re.subTo(I, re)), ne.rShiftTo(1, ne)) : re.isEven() || re.subTo(I, re), re.rShiftTo(1, re);
      O.compareTo(M) >= 0 ? (O.subTo(M, O), N && j.subTo(ne, j), W.subTo(re, W)) : (M.subTo(O, M), N && ne.subTo(j, ne), re.subTo(W, re));
    }
    if (M.compareTo(r.ONE) != 0) return r.ZERO;
    if (re.compareTo(I) >= 0) return re.subtract(I);
    if (re.signum() < 0) re.addTo(I, re);
    else return re;
    return re.signum() < 0 ? re.add(I) : re;
  }
  var rt = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], Un = (1 << 26) / rt[rt.length - 1];
  function Pn(I) {
    var N, O = this.abs();
    if (O.t == 1 && O.data[0] <= rt[rt.length - 1]) {
      for (N = 0; N < rt.length; ++N)
        if (O.data[0] == rt[N]) return !0;
      return !1;
    }
    if (O.isEven()) return !1;
    for (N = 1; N < rt.length; ) {
      for (var M = rt[N], j = N + 1; j < rt.length && M < Un; ) M *= rt[j++];
      for (M = O.modInt(M); N < j; ) if (M % rt[N++] == 0) return !1;
    }
    return O.millerRabin(I);
  }
  function On(I) {
    var N = this.subtract(r.ONE), O = N.getLowestSetBit();
    if (O <= 0) return !1;
    for (var M = N.shiftRight(O), j = Vn(), W, ne = 0; ne < I; ++ne) {
      do
        W = new r(this.bitLength(), j);
      while (W.compareTo(r.ONE) <= 0 || W.compareTo(N) >= 0);
      var re = W.modPow(M, this);
      if (re.compareTo(r.ONE) != 0 && re.compareTo(N) != 0) {
        for (var ye = 1; ye++ < O && re.compareTo(N) != 0; )
          if (re = re.modPowInt(2, this), re.compareTo(r.ONE) == 0) return !1;
        if (re.compareTo(N) != 0) return !1;
      }
    }
    return !0;
  }
  function Vn() {
    return {
      // x is an array to fill with bytes
      nextBytes: function(I) {
        for (var N = 0; N < I.length; ++N)
          I[N] = Math.floor(Math.random() * 256);
      }
    };
  }
  return r.prototype.chunkSize = ae, r.prototype.toRadix = te, r.prototype.fromRadix = ue, r.prototype.fromNumber = de, r.prototype.bitwiseTo = Te, r.prototype.changeBit = Rt, r.prototype.addTo = Re, r.prototype.dMultiply = Ke, r.prototype.dAddOffset = Fe, r.prototype.multiplyLowerTo = An, r.prototype.multiplyUpperTo = Bn, r.prototype.modInt = kn, r.prototype.millerRabin = On, r.prototype.clone = w, r.prototype.intValue = V, r.prototype.byteValue = z, r.prototype.shortValue = ie, r.prototype.signum = Q, r.prototype.toByteArray = ce, r.prototype.equals = Se, r.prototype.min = Be, r.prototype.max = Ae, r.prototype.and = me, r.prototype.or = Ie, r.prototype.xor = Xe, r.prototype.andNot = We, r.prototype.not = Ze, r.prototype.shiftLeft = $e, r.prototype.shiftRight = tt, r.prototype.getLowestSetBit = lt, r.prototype.bitCount = Ct, r.prototype.testBit = Tt, r.prototype.setBit = Kt, r.prototype.clearBit = Ne, r.prototype.flipBit = we, r.prototype.add = Le, r.prototype.subtract = ke, r.prototype.multiply = De, r.prototype.divide = Pe, r.prototype.remainder = Oe, r.prototype.divideAndRemainder = Ve, r.prototype.modPow = Rn, r.prototype.modInverse = Dn, r.prototype.pow = Tn, r.prototype.gcd = Ln, r.prototype.isProbablePrime = Pn, r.prototype.square = Ue, xr;
}
var Sr = { exports: {} }, Tr = { exports: {} }, Ba;
function Vt() {
  if (Ba) return Tr.exports;
  Ba = 1;
  var t = he();
  ht(), pe();
  var e = Tr.exports = t.sha1 = t.sha1 || {};
  t.md.sha1 = t.md.algorithms.sha1 = e, e.create = function() {
    l || E();
    var u = null, a = t.util.createBuffer(), p = new Array(80), f = {
      algorithm: "sha1",
      blockLength: 64,
      digestLength: 20,
      // 56-bit length of message so far (does not including padding)
      messageLength: 0,
      // true message length
      fullMessageLength: null,
      // size of message length in bytes
      messageLengthSize: 8
    };
    return f.start = function() {
      f.messageLength = 0, f.fullMessageLength = f.messageLength64 = [];
      for (var S = f.messageLengthSize / 4, U = 0; U < S; ++U)
        f.fullMessageLength.push(0);
      return a = t.util.createBuffer(), u = {
        h0: 1732584193,
        h1: 4023233417,
        h2: 2562383102,
        h3: 271733878,
        h4: 3285377520
      }, f;
    }, f.start(), f.update = function(S, U) {
      U === "utf8" && (S = t.util.encodeUtf8(S));
      var T = S.length;
      f.messageLength += T, T = [T / 4294967296 >>> 0, T >>> 0];
      for (var c = f.fullMessageLength.length - 1; c >= 0; --c)
        f.fullMessageLength[c] += T[1], T[1] = T[0] + (f.fullMessageLength[c] / 4294967296 >>> 0), f.fullMessageLength[c] = f.fullMessageLength[c] >>> 0, T[0] = T[1] / 4294967296 >>> 0;
      return a.putBytes(S), v(u, p, a), (a.read > 2048 || a.length() === 0) && a.compact(), f;
    }, f.digest = function() {
      var S = t.util.createBuffer();
      S.putBytes(a.bytes());
      var U = f.fullMessageLength[f.fullMessageLength.length - 1] + f.messageLengthSize, T = U & f.blockLength - 1;
      S.putBytes(r.substr(0, f.blockLength - T));
      for (var c, g, C = f.fullMessageLength[0] * 8, m = 0; m < f.fullMessageLength.length - 1; ++m)
        c = f.fullMessageLength[m + 1] * 8, g = c / 4294967296 >>> 0, C += g, S.putInt32(C >>> 0), C = c >>> 0;
      S.putInt32(C);
      var s = {
        h0: u.h0,
        h1: u.h1,
        h2: u.h2,
        h3: u.h3,
        h4: u.h4
      };
      v(s, p, S);
      var d = t.util.createBuffer();
      return d.putInt32(s.h0), d.putInt32(s.h1), d.putInt32(s.h2), d.putInt32(s.h3), d.putInt32(s.h4), d;
    }, f;
  };
  var r = null, l = !1;
  function E() {
    r = "", r += t.util.fillString("\0", 64), l = !0;
  }
  function v(u, a, p) {
    for (var f, S, U, T, c, g, C, m, s = p.length(); s >= 64; ) {
      for (S = u.h0, U = u.h1, T = u.h2, c = u.h3, g = u.h4, m = 0; m < 16; ++m)
        f = p.getInt32(), a[m] = f, C = c ^ U & (T ^ c), f = (S << 5 | S >>> 27) + C + g + 1518500249 + f, g = c, c = T, T = (U << 30 | U >>> 2) >>> 0, U = S, S = f;
      for (; m < 20; ++m)
        f = a[m - 3] ^ a[m - 8] ^ a[m - 14] ^ a[m - 16], f = f << 1 | f >>> 31, a[m] = f, C = c ^ U & (T ^ c), f = (S << 5 | S >>> 27) + C + g + 1518500249 + f, g = c, c = T, T = (U << 30 | U >>> 2) >>> 0, U = S, S = f;
      for (; m < 32; ++m)
        f = a[m - 3] ^ a[m - 8] ^ a[m - 14] ^ a[m - 16], f = f << 1 | f >>> 31, a[m] = f, C = U ^ T ^ c, f = (S << 5 | S >>> 27) + C + g + 1859775393 + f, g = c, c = T, T = (U << 30 | U >>> 2) >>> 0, U = S, S = f;
      for (; m < 40; ++m)
        f = a[m - 6] ^ a[m - 16] ^ a[m - 28] ^ a[m - 32], f = f << 2 | f >>> 30, a[m] = f, C = U ^ T ^ c, f = (S << 5 | S >>> 27) + C + g + 1859775393 + f, g = c, c = T, T = (U << 30 | U >>> 2) >>> 0, U = S, S = f;
      for (; m < 60; ++m)
        f = a[m - 6] ^ a[m - 16] ^ a[m - 28] ^ a[m - 32], f = f << 2 | f >>> 30, a[m] = f, C = U & T | c & (U ^ T), f = (S << 5 | S >>> 27) + C + g + 2400959708 + f, g = c, c = T, T = (U << 30 | U >>> 2) >>> 0, U = S, S = f;
      for (; m < 80; ++m)
        f = a[m - 6] ^ a[m - 16] ^ a[m - 28] ^ a[m - 32], f = f << 2 | f >>> 30, a[m] = f, C = U ^ T ^ c, f = (S << 5 | S >>> 27) + C + g + 3395469782 + f, g = c, c = T, T = (U << 30 | U >>> 2) >>> 0, U = S, S = f;
      u.h0 = u.h0 + S | 0, u.h1 = u.h1 + U | 0, u.h2 = u.h2 + T | 0, u.h3 = u.h3 + c | 0, u.h4 = u.h4 + g | 0, s -= 64;
    }
  }
  return Tr.exports;
}
var ba;
function cn() {
  if (ba) return Sr.exports;
  ba = 1;
  var t = he();
  pe(), st(), Vt();
  var e = Sr.exports = t.pkcs1 = t.pkcs1 || {};
  e.encode_rsa_oaep = function(l, E, v) {
    var u, a, p, f;
    typeof v == "string" ? (u = v, a = arguments[3] || void 0, p = arguments[4] || void 0) : v && (u = v.label || void 0, a = v.seed || void 0, p = v.md || void 0, v.mgf1 && v.mgf1.md && (f = v.mgf1.md)), p ? p.start() : p = t.md.sha1.create(), f || (f = p);
    var S = Math.ceil(l.n.bitLength() / 8), U = S - 2 * p.digestLength - 2;
    if (E.length > U) {
      var T = new Error("RSAES-OAEP input message length is too long.");
      throw T.length = E.length, T.maxLength = U, T;
    }
    u || (u = ""), p.update(u, "raw");
    for (var c = p.digest(), g = "", C = U - E.length, m = 0; m < C; m++)
      g += "\0";
    var s = c.getBytes() + g + "" + E;
    if (!a)
      a = t.random.getBytes(p.digestLength);
    else if (a.length !== p.digestLength) {
      var T = new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.");
      throw T.seedLength = a.length, T.digestLength = p.digestLength, T;
    }
    var d = r(a, S - p.digestLength - 1, f), y = t.util.xorBytes(s, d, s.length), B = r(y, p.digestLength, f), b = t.util.xorBytes(a, B, a.length);
    return "\0" + b + y;
  }, e.decode_rsa_oaep = function(l, E, v) {
    var u, a, p;
    typeof v == "string" ? (u = v, a = arguments[3] || void 0) : v && (u = v.label || void 0, a = v.md || void 0, v.mgf1 && v.mgf1.md && (p = v.mgf1.md));
    var f = Math.ceil(l.n.bitLength() / 8);
    if (E.length !== f) {
      var y = new Error("RSAES-OAEP encoded message length is invalid.");
      throw y.length = E.length, y.expectedLength = f, y;
    }
    if (a === void 0 ? a = t.md.sha1.create() : a.start(), p || (p = a), f < 2 * a.digestLength + 2)
      throw new Error("RSAES-OAEP key is too short for the hash function.");
    u || (u = ""), a.update(u, "raw");
    for (var S = a.digest().getBytes(), U = E.charAt(0), T = E.substring(1, a.digestLength + 1), c = E.substring(1 + a.digestLength), g = r(c, a.digestLength, p), C = t.util.xorBytes(T, g, T.length), m = r(C, f - a.digestLength - 1, p), s = t.util.xorBytes(c, m, c.length), d = s.substring(0, a.digestLength), y = U !== "\0", B = 0; B < a.digestLength; ++B)
      y |= S.charAt(B) !== d.charAt(B);
    for (var b = 1, h = a.digestLength, i = a.digestLength; i < s.length; i++) {
      var n = s.charCodeAt(i), A = n & 1 ^ 1, _ = b ? 65534 : 0;
      y |= n & _, b = b & A, h += b;
    }
    if (y || s.charCodeAt(h) !== 1)
      throw new Error("Invalid RSAES-OAEP padding.");
    return s.substring(h + 1);
  };
  function r(l, E, v) {
    v || (v = t.md.sha1.create());
    for (var u = "", a = Math.ceil(E / v.digestLength), p = 0; p < a; ++p) {
      var f = String.fromCharCode(
        p >> 24 & 255,
        p >> 16 & 255,
        p >> 8 & 255,
        p & 255
      );
      v.start(), v.update(l + f), u += v.digest().getBytes();
    }
    return u.substring(0, E);
  }
  return Sr.exports;
}
var Gt = { exports: {} }, Ia;
function hn() {
  if (Ia) return Gt.exports;
  Ia = 1;
  var t = he();
  return pe(), jt(), st(), (function() {
    if (t.prime) {
      Gt.exports = t.prime;
      return;
    }
    var e = Gt.exports = t.prime = t.prime || {}, r = t.jsbn.BigInteger, l = [6, 4, 2, 4, 2, 4, 6, 2], E = new r(null);
    E.fromInt(30);
    var v = function(T, c) {
      return T | c;
    };
    e.generateProbablePrime = function(T, c, g) {
      typeof c == "function" && (g = c, c = {}), c = c || {};
      var C = c.algorithm || "PRIMEINC";
      typeof C == "string" && (C = { name: C }), C.options = C.options || {};
      var m = c.prng || t.random, s = {
        // x is an array to fill with bytes
        nextBytes: function(d) {
          for (var y = m.getBytesSync(d.length), B = 0; B < d.length; ++B)
            d[B] = y.charCodeAt(B);
        }
      };
      if (C.name === "PRIMEINC")
        return u(T, s, C.options, g);
      throw new Error("Invalid prime generation algorithm: " + C.name);
    };
    function u(T, c, g, C) {
      return "workers" in g ? f(T, c, g, C) : a(T, c, g, C);
    }
    function a(T, c, g, C) {
      var m = S(T, c), s = 0, d = U(m.bitLength());
      "millerRabinTests" in g && (d = g.millerRabinTests);
      var y = 10;
      "maxBlockTime" in g && (y = g.maxBlockTime), p(m, T, c, s, d, y, C);
    }
    function p(T, c, g, C, m, s, d) {
      var y = +/* @__PURE__ */ new Date();
      do {
        if (T.bitLength() > c && (T = S(c, g)), T.isProbablePrime(m))
          return d(null, T);
        T.dAddOffset(l[C++ % 8], 0);
      } while (s < 0 || +/* @__PURE__ */ new Date() - y < s);
      t.util.setImmediate(function() {
        p(T, c, g, C, m, s, d);
      });
    }
    function f(T, c, g, C) {
      if (typeof Worker > "u")
        return a(T, c, g, C);
      var m = S(T, c), s = g.workers, d = g.workLoad || 100, y = d * 30 / 8, B = g.workerScript || "forge/prime.worker.js";
      if (s === -1)
        return t.util.estimateCores(function(h, i) {
          h && (i = 2), s = i - 1, b();
        });
      b();
      function b() {
        s = Math.max(1, s);
        for (var h = [], i = 0; i < s; ++i)
          h[i] = new Worker(B);
        for (var i = 0; i < s; ++i)
          h[i].addEventListener("message", A);
        var n = !1;
        function A(_) {
          if (!n) {
            var P = _.data;
            if (P.found) {
              for (var D = 0; D < h.length; ++D)
                h[D].terminate();
              return n = !0, C(null, new r(P.prime, 16));
            }
            m.bitLength() > T && (m = S(T, c));
            var K = m.toString(16);
            _.target.postMessage({
              hex: K,
              workLoad: d
            }), m.dAddOffset(y, 0);
          }
        }
      }
    }
    function S(T, c) {
      var g = new r(T, c), C = T - 1;
      return g.testBit(C) || g.bitwiseTo(r.ONE.shiftLeft(C), v, g), g.dAddOffset(31 - g.mod(E).byteValue(), 0), g;
    }
    function U(T) {
      return T <= 100 ? 27 : T <= 150 ? 18 : T <= 200 ? 15 : T <= 250 ? 12 : T <= 300 ? 9 : T <= 350 ? 8 : T <= 400 ? 7 : T <= 500 ? 6 : T <= 600 ? 5 : T <= 800 ? 4 : T <= 1250 ? 3 : 2;
    }
  })(), Gt.exports;
}
var Ar, _a;
function Wt() {
  if (_a) return Ar;
  _a = 1;
  var t = he();
  if (ut(), jt(), St(), cn(), hn(), st(), pe(), typeof e > "u")
    var e = t.jsbn.BigInteger;
  var r = t.util.isNodejs ? Wr : null, l = t.asn1, E = t.util;
  t.pki = t.pki || {}, Ar = t.pki.rsa = t.rsa = t.rsa || {};
  var v = t.pki, u = [6, 4, 2, 4, 2, 4, 6, 2], a = {
    // PrivateKeyInfo
    name: "PrivateKeyInfo",
    tagClass: l.Class.UNIVERSAL,
    type: l.Type.SEQUENCE,
    constructed: !0,
    value: [{
      // Version (INTEGER)
      name: "PrivateKeyInfo.version",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyVersion"
    }, {
      // privateKeyAlgorithm
      name: "PrivateKeyInfo.privateKeyAlgorithm",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "AlgorithmIdentifier.algorithm",
        tagClass: l.Class.UNIVERSAL,
        type: l.Type.OID,
        constructed: !1,
        capture: "privateKeyOid"
      }]
    }, {
      // PrivateKey
      name: "PrivateKeyInfo",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.OCTETSTRING,
      constructed: !1,
      capture: "privateKey"
    }]
  }, p = {
    // RSAPrivateKey
    name: "RSAPrivateKey",
    tagClass: l.Class.UNIVERSAL,
    type: l.Type.SEQUENCE,
    constructed: !0,
    value: [{
      // Version (INTEGER)
      name: "RSAPrivateKey.version",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyVersion"
    }, {
      // modulus (n)
      name: "RSAPrivateKey.modulus",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyModulus"
    }, {
      // publicExponent (e)
      name: "RSAPrivateKey.publicExponent",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyPublicExponent"
    }, {
      // privateExponent (d)
      name: "RSAPrivateKey.privateExponent",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyPrivateExponent"
    }, {
      // prime1 (p)
      name: "RSAPrivateKey.prime1",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyPrime1"
    }, {
      // prime2 (q)
      name: "RSAPrivateKey.prime2",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyPrime2"
    }, {
      // exponent1 (d mod (p-1))
      name: "RSAPrivateKey.exponent1",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyExponent1"
    }, {
      // exponent2 (d mod (q-1))
      name: "RSAPrivateKey.exponent2",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyExponent2"
    }, {
      // coefficient ((inverse of q) mod p)
      name: "RSAPrivateKey.coefficient",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyCoefficient"
    }]
  }, f = {
    // RSAPublicKey
    name: "RSAPublicKey",
    tagClass: l.Class.UNIVERSAL,
    type: l.Type.SEQUENCE,
    constructed: !0,
    value: [{
      // modulus (n)
      name: "RSAPublicKey.modulus",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "publicKeyModulus"
    }, {
      // publicExponent (e)
      name: "RSAPublicKey.exponent",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.INTEGER,
      constructed: !1,
      capture: "publicKeyExponent"
    }]
  }, S = t.pki.rsa.publicKeyValidator = {
    name: "SubjectPublicKeyInfo",
    tagClass: l.Class.UNIVERSAL,
    type: l.Type.SEQUENCE,
    constructed: !0,
    captureAsn1: "subjectPublicKeyInfo",
    value: [{
      name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "AlgorithmIdentifier.algorithm",
        tagClass: l.Class.UNIVERSAL,
        type: l.Type.OID,
        constructed: !1,
        capture: "publicKeyOid"
      }]
    }, {
      // subjectPublicKey
      name: "SubjectPublicKeyInfo.subjectPublicKey",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.BITSTRING,
      constructed: !1,
      value: [{
        // RSAPublicKey
        name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
        tagClass: l.Class.UNIVERSAL,
        type: l.Type.SEQUENCE,
        constructed: !0,
        optional: !0,
        captureAsn1: "rsaPublicKey"
      }]
    }]
  }, U = {
    name: "DigestInfo",
    tagClass: l.Class.UNIVERSAL,
    type: l.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "DigestInfo.DigestAlgorithm",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "DigestInfo.DigestAlgorithm.algorithmIdentifier",
        tagClass: l.Class.UNIVERSAL,
        type: l.Type.OID,
        constructed: !1,
        capture: "algorithmIdentifier"
      }, {
        // NULL parameters
        name: "DigestInfo.DigestAlgorithm.parameters",
        tagClass: l.Class.UNIVERSAL,
        type: l.Type.NULL,
        // captured only to check existence for md2 and md5
        capture: "parameters",
        optional: !0,
        constructed: !1
      }]
    }, {
      // digest
      name: "DigestInfo.digest",
      tagClass: l.Class.UNIVERSAL,
      type: l.Type.OCTETSTRING,
      constructed: !1,
      capture: "digest"
    }]
  }, T = function(i) {
    var n;
    if (i.algorithm in v.oids)
      n = v.oids[i.algorithm];
    else {
      var A = new Error("Unknown message digest algorithm.");
      throw A.algorithm = i.algorithm, A;
    }
    var _ = l.oidToDer(n).getBytes(), P = l.create(
      l.Class.UNIVERSAL,
      l.Type.SEQUENCE,
      !0,
      []
    ), D = l.create(
      l.Class.UNIVERSAL,
      l.Type.SEQUENCE,
      !0,
      []
    );
    D.value.push(l.create(
      l.Class.UNIVERSAL,
      l.Type.OID,
      !1,
      _
    )), D.value.push(l.create(
      l.Class.UNIVERSAL,
      l.Type.NULL,
      !1,
      ""
    ));
    var K = l.create(
      l.Class.UNIVERSAL,
      l.Type.OCTETSTRING,
      !1,
      i.digest().getBytes()
    );
    return P.value.push(D), P.value.push(K), l.toDer(P).getBytes();
  }, c = function(i, n, A) {
    if (A)
      return i.modPow(n.e, n.n);
    if (!n.p || !n.q)
      return i.modPow(n.d, n.n);
    n.dP || (n.dP = n.d.mod(n.p.subtract(e.ONE))), n.dQ || (n.dQ = n.d.mod(n.q.subtract(e.ONE))), n.qInv || (n.qInv = n.q.modInverse(n.p));
    var _;
    do
      _ = new e(
        t.util.bytesToHex(t.random.getBytes(n.n.bitLength() / 8)),
        16
      );
    while (_.compareTo(n.n) >= 0 || !_.gcd(n.n).equals(e.ONE));
    i = i.multiply(_.modPow(n.e, n.n)).mod(n.n);
    for (var P = i.mod(n.p).modPow(n.dP, n.p), D = i.mod(n.q).modPow(n.dQ, n.q); P.compareTo(D) < 0; )
      P = P.add(n.p);
    var K = P.subtract(D).multiply(n.qInv).mod(n.p).multiply(n.q).add(D);
    return K = K.multiply(_.modInverse(n.n)).mod(n.n), K;
  };
  v.rsa.encrypt = function(i, n, A) {
    var _ = A, P, D = Math.ceil(n.n.bitLength() / 8);
    A !== !1 && A !== !0 ? (_ = A === 2, P = g(i, n, A)) : (P = t.util.createBuffer(), P.putBytes(i));
    for (var K = new e(P.toHex(), 16), q = c(K, n, _), H = q.toString(16), G = t.util.createBuffer(), X = D - Math.ceil(H.length / 2); X > 0; )
      G.putByte(0), --X;
    return G.putBytes(t.util.hexToBytes(H)), G.getBytes();
  }, v.rsa.decrypt = function(i, n, A, _) {
    var P = Math.ceil(n.n.bitLength() / 8);
    if (i.length !== P) {
      var D = new Error("Encrypted message length is invalid.");
      throw D.length = i.length, D.expected = P, D;
    }
    var K = new e(t.util.createBuffer(i).toHex(), 16);
    if (K.compareTo(n.n) >= 0)
      throw new Error("Encrypted message is invalid.");
    for (var q = c(K, n, A), H = q.toString(16), G = t.util.createBuffer(), X = P - Math.ceil(H.length / 2); X > 0; )
      G.putByte(0), --X;
    return G.putBytes(t.util.hexToBytes(H)), _ !== !1 ? C(G.getBytes(), n, A) : G.getBytes();
  }, v.rsa.createKeyPairGenerationState = function(i, n, A) {
    typeof i == "string" && (i = parseInt(i, 10)), i = i || 2048, A = A || {};
    var _ = A.prng || t.random, P = {
      // x is an array to fill with bytes
      nextBytes: function(q) {
        for (var H = _.getBytesSync(q.length), G = 0; G < q.length; ++G)
          q[G] = H.charCodeAt(G);
      }
    }, D = A.algorithm || "PRIMEINC", K;
    if (D === "PRIMEINC")
      K = {
        algorithm: D,
        state: 0,
        bits: i,
        rng: P,
        eInt: n || 65537,
        e: new e(null),
        p: null,
        q: null,
        qBits: i >> 1,
        pBits: i - (i >> 1),
        pqState: 0,
        num: null,
        keys: null
      }, K.e.fromInt(K.eInt);
    else
      throw new Error("Invalid key generation algorithm: " + D);
    return K;
  }, v.rsa.stepKeyPairGenerationState = function(i, n) {
    "algorithm" in i || (i.algorithm = "PRIMEINC");
    var A = new e(null);
    A.fromInt(30);
    for (var _ = 0, P = function(Z, F) {
      return Z | F;
    }, D = +/* @__PURE__ */ new Date(), K, q = 0; i.keys === null && (n <= 0 || q < n); ) {
      if (i.state === 0) {
        var H = i.p === null ? i.pBits : i.qBits, G = H - 1;
        i.pqState === 0 ? (i.num = new e(H, i.rng), i.num.testBit(G) || i.num.bitwiseTo(
          e.ONE.shiftLeft(G),
          P,
          i.num
        ), i.num.dAddOffset(31 - i.num.mod(A).byteValue(), 0), _ = 0, ++i.pqState) : i.pqState === 1 ? i.num.bitLength() > H ? i.pqState = 0 : i.num.isProbablePrime(
          d(i.num.bitLength())
        ) ? ++i.pqState : i.num.dAddOffset(u[_++ % 8], 0) : i.pqState === 2 ? i.pqState = i.num.subtract(e.ONE).gcd(i.e).compareTo(e.ONE) === 0 ? 3 : 0 : i.pqState === 3 && (i.pqState = 0, i.p === null ? i.p = i.num : i.q = i.num, i.p !== null && i.q !== null && ++i.state, i.num = null);
      } else if (i.state === 1)
        i.p.compareTo(i.q) < 0 && (i.num = i.p, i.p = i.q, i.q = i.num), ++i.state;
      else if (i.state === 2)
        i.p1 = i.p.subtract(e.ONE), i.q1 = i.q.subtract(e.ONE), i.phi = i.p1.multiply(i.q1), ++i.state;
      else if (i.state === 3)
        i.phi.gcd(i.e).compareTo(e.ONE) === 0 ? ++i.state : (i.p = null, i.q = null, i.state = 0);
      else if (i.state === 4)
        i.n = i.p.multiply(i.q), i.n.bitLength() === i.bits ? ++i.state : (i.q = null, i.state = 0);
      else if (i.state === 5) {
        var X = i.e.modInverse(i.phi);
        i.keys = {
          privateKey: v.rsa.setPrivateKey(
            i.n,
            i.e,
            X,
            i.p,
            i.q,
            X.mod(i.p1),
            X.mod(i.q1),
            i.q.modInverse(i.p)
          ),
          publicKey: v.rsa.setPublicKey(i.n, i.e)
        };
      }
      K = +/* @__PURE__ */ new Date(), q += K - D, D = K;
    }
    return i.keys !== null;
  }, v.rsa.generateKeyPair = function(i, n, A, _) {
    if (arguments.length === 1 ? typeof i == "object" ? (A = i, i = void 0) : typeof i == "function" && (_ = i, i = void 0) : arguments.length === 2 ? typeof i == "number" ? typeof n == "function" ? (_ = n, n = void 0) : typeof n != "number" && (A = n, n = void 0) : (A = i, _ = n, i = void 0, n = void 0) : arguments.length === 3 && (typeof n == "number" ? typeof A == "function" && (_ = A, A = void 0) : (_ = A, A = n, n = void 0)), A = A || {}, i === void 0 && (i = A.bits || 2048), n === void 0 && (n = A.e || 65537), !t.options.usePureJavaScript && !A.prng && i >= 256 && i <= 16384 && (n === 65537 || n === 3)) {
      if (_) {
        if (y("generateKeyPair"))
          return r.generateKeyPair("rsa", {
            modulusLength: i,
            publicExponent: n,
            publicKeyEncoding: {
              type: "spki",
              format: "pem"
            },
            privateKeyEncoding: {
              type: "pkcs8",
              format: "pem"
            }
          }, function(q, H, G) {
            if (q)
              return _(q);
            _(null, {
              privateKey: v.privateKeyFromPem(G),
              publicKey: v.publicKeyFromPem(H)
            });
          });
        if (B("generateKey") && B("exportKey"))
          return E.globalScope.crypto.subtle.generateKey({
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: i,
            publicExponent: h(n),
            hash: { name: "SHA-256" }
          }, !0, ["sign", "verify"]).then(function(q) {
            return E.globalScope.crypto.subtle.exportKey(
              "pkcs8",
              q.privateKey
            );
          }).then(void 0, function(q) {
            _(q);
          }).then(function(q) {
            if (q) {
              var H = v.privateKeyFromAsn1(
                l.fromDer(t.util.createBuffer(q))
              );
              _(null, {
                privateKey: H,
                publicKey: v.setRsaPublicKey(H.n, H.e)
              });
            }
          });
        if (b("generateKey") && b("exportKey")) {
          var P = E.globalScope.msCrypto.subtle.generateKey({
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: i,
            publicExponent: h(n),
            hash: { name: "SHA-256" }
          }, !0, ["sign", "verify"]);
          P.oncomplete = function(q) {
            var H = q.target.result, G = E.globalScope.msCrypto.subtle.exportKey(
              "pkcs8",
              H.privateKey
            );
            G.oncomplete = function(X) {
              var Z = X.target.result, F = v.privateKeyFromAsn1(
                l.fromDer(t.util.createBuffer(Z))
              );
              _(null, {
                privateKey: F,
                publicKey: v.setRsaPublicKey(F.n, F.e)
              });
            }, G.onerror = function(X) {
              _(X);
            };
          }, P.onerror = function(q) {
            _(q);
          };
          return;
        }
      } else if (y("generateKeyPairSync")) {
        var D = r.generateKeyPairSync("rsa", {
          modulusLength: i,
          publicExponent: n,
          publicKeyEncoding: {
            type: "spki",
            format: "pem"
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem"
          }
        });
        return {
          privateKey: v.privateKeyFromPem(D.privateKey),
          publicKey: v.publicKeyFromPem(D.publicKey)
        };
      }
    }
    var K = v.rsa.createKeyPairGenerationState(i, n, A);
    if (!_)
      return v.rsa.stepKeyPairGenerationState(K, 0), K.keys;
    m(K, A, _);
  }, v.setRsaPublicKey = v.rsa.setPublicKey = function(i, n) {
    var A = {
      n: i,
      e: n
    };
    return A.encrypt = function(_, P, D) {
      if (typeof P == "string" ? P = P.toUpperCase() : P === void 0 && (P = "RSAES-PKCS1-V1_5"), P === "RSAES-PKCS1-V1_5")
        P = {
          encode: function(q, H, G) {
            return g(q, H, 2).getBytes();
          }
        };
      else if (P === "RSA-OAEP" || P === "RSAES-OAEP")
        P = {
          encode: function(q, H) {
            return t.pkcs1.encode_rsa_oaep(H, q, D);
          }
        };
      else if (["RAW", "NONE", "NULL", null].indexOf(P) !== -1)
        P = { encode: function(q) {
          return q;
        } };
      else if (typeof P == "string")
        throw new Error('Unsupported encryption scheme: "' + P + '".');
      var K = P.encode(_, A, !0);
      return v.rsa.encrypt(K, A, !0);
    }, A.verify = function(_, P, D, K) {
      typeof D == "string" ? D = D.toUpperCase() : D === void 0 && (D = "RSASSA-PKCS1-V1_5"), K === void 0 && (K = {
        _parseAllDigestBytes: !0,
        _skipPaddingChecks: !1
      }), "_parseAllDigestBytes" in K || (K._parseAllDigestBytes = !0), "_skipPaddingChecks" in K || (K._skipPaddingChecks = !1), D === "RSASSA-PKCS1-V1_5" ? D = {
        verify: function(H, G) {
          G = C(G, A, !0, void 0, K);
          var X = l.fromDer(G, {
            parseAllBytes: K._parseAllDigestBytes
          }), Z = {}, F = [];
          if (!l.validate(X, U, Z, F) || X.value.length !== 2) {
            var Y = new Error(
              "ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value."
            );
            throw Y.errors = F, Y;
          }
          var ee = l.derToOid(Z.algorithmIdentifier);
          if (!(ee === t.oids.md2 || ee === t.oids.md5 || ee === t.oids.sha1 || ee === t.oids.sha224 || ee === t.oids.sha256 || ee === t.oids.sha384 || ee === t.oids.sha512 || ee === t.oids["sha512-224"] || ee === t.oids["sha512-256"])) {
            var Y = new Error(
              "Unknown RSASSA-PKCS1-v1_5 DigestAlgorithm identifier."
            );
            throw Y.oid = ee, Y;
          }
          if ((ee === t.oids.md2 || ee === t.oids.md5) && !("parameters" in Z))
            throw new Error(
              "ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value. Missing algorithm identifier NULL parameters."
            );
          return H === Z.digest;
        }
      } : (D === "NONE" || D === "NULL" || D === null) && (D = {
        verify: function(H, G) {
          return G = C(G, A, !0, void 0, K), H === G;
        }
      });
      var q = v.rsa.decrypt(P, A, !0, !1);
      return D.verify(_, q, A.n.bitLength());
    }, A;
  }, v.setRsaPrivateKey = v.rsa.setPrivateKey = function(i, n, A, _, P, D, K, q) {
    var H = {
      n: i,
      e: n,
      d: A,
      p: _,
      q: P,
      dP: D,
      dQ: K,
      qInv: q
    };
    return H.decrypt = function(G, X, Z) {
      typeof X == "string" ? X = X.toUpperCase() : X === void 0 && (X = "RSAES-PKCS1-V1_5");
      var F = v.rsa.decrypt(G, H, !1, !1);
      if (X === "RSAES-PKCS1-V1_5")
        X = { decode: C };
      else if (X === "RSA-OAEP" || X === "RSAES-OAEP")
        X = {
          decode: function(Y, ee) {
            return t.pkcs1.decode_rsa_oaep(ee, Y, Z);
          }
        };
      else if (["RAW", "NONE", "NULL", null].indexOf(X) !== -1)
        X = { decode: function(Y) {
          return Y;
        } };
      else
        throw new Error('Unsupported encryption scheme: "' + X + '".');
      return X.decode(F, H, !1);
    }, H.sign = function(G, X) {
      var Z = !1;
      typeof X == "string" && (X = X.toUpperCase()), X === void 0 || X === "RSASSA-PKCS1-V1_5" ? (X = { encode: T }, Z = 1) : (X === "NONE" || X === "NULL" || X === null) && (X = { encode: function() {
        return G;
      } }, Z = 1);
      var F = X.encode(G, H.n.bitLength());
      return v.rsa.encrypt(F, H, Z);
    }, H;
  }, v.wrapRsaPrivateKey = function(i) {
    return l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [
      // version (0)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        l.integerToDer(0).getBytes()
      ),
      // privateKeyAlgorithm
      l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [
        l.create(
          l.Class.UNIVERSAL,
          l.Type.OID,
          !1,
          l.oidToDer(v.oids.rsaEncryption).getBytes()
        ),
        l.create(l.Class.UNIVERSAL, l.Type.NULL, !1, "")
      ]),
      // PrivateKey
      l.create(
        l.Class.UNIVERSAL,
        l.Type.OCTETSTRING,
        !1,
        l.toDer(i).getBytes()
      )
    ]);
  }, v.privateKeyFromAsn1 = function(i) {
    var n = {}, A = [];
    if (l.validate(i, a, n, A) && (i = l.fromDer(t.util.createBuffer(n.privateKey))), n = {}, A = [], !l.validate(i, p, n, A)) {
      var _ = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
      throw _.errors = A, _;
    }
    var P, D, K, q, H, G, X, Z;
    return P = t.util.createBuffer(n.privateKeyModulus).toHex(), D = t.util.createBuffer(n.privateKeyPublicExponent).toHex(), K = t.util.createBuffer(n.privateKeyPrivateExponent).toHex(), q = t.util.createBuffer(n.privateKeyPrime1).toHex(), H = t.util.createBuffer(n.privateKeyPrime2).toHex(), G = t.util.createBuffer(n.privateKeyExponent1).toHex(), X = t.util.createBuffer(n.privateKeyExponent2).toHex(), Z = t.util.createBuffer(n.privateKeyCoefficient).toHex(), v.setRsaPrivateKey(
      new e(P, 16),
      new e(D, 16),
      new e(K, 16),
      new e(q, 16),
      new e(H, 16),
      new e(G, 16),
      new e(X, 16),
      new e(Z, 16)
    );
  }, v.privateKeyToAsn1 = v.privateKeyToRSAPrivateKey = function(i) {
    return l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [
      // version (0 = only 2 primes, 1 multiple primes)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        l.integerToDer(0).getBytes()
      ),
      // modulus (n)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.n)
      ),
      // publicExponent (e)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.e)
      ),
      // privateExponent (d)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.d)
      ),
      // privateKeyPrime1 (p)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.p)
      ),
      // privateKeyPrime2 (q)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.q)
      ),
      // privateKeyExponent1 (dP)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.dP)
      ),
      // privateKeyExponent2 (dQ)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.dQ)
      ),
      // coefficient (qInv)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.qInv)
      )
    ]);
  }, v.publicKeyFromAsn1 = function(i) {
    var n = {}, A = [];
    if (l.validate(i, S, n, A)) {
      var _ = l.derToOid(n.publicKeyOid);
      if (_ !== v.oids.rsaEncryption) {
        var P = new Error("Cannot read public key. Unknown OID.");
        throw P.oid = _, P;
      }
      i = n.rsaPublicKey;
    }
    if (A = [], !l.validate(i, f, n, A)) {
      var P = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");
      throw P.errors = A, P;
    }
    var D = t.util.createBuffer(n.publicKeyModulus).toHex(), K = t.util.createBuffer(n.publicKeyExponent).toHex();
    return v.setRsaPublicKey(
      new e(D, 16),
      new e(K, 16)
    );
  }, v.publicKeyToAsn1 = v.publicKeyToSubjectPublicKeyInfo = function(i) {
    return l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [
      // AlgorithmIdentifier
      l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [
        // algorithm
        l.create(
          l.Class.UNIVERSAL,
          l.Type.OID,
          !1,
          l.oidToDer(v.oids.rsaEncryption).getBytes()
        ),
        // parameters (null)
        l.create(l.Class.UNIVERSAL, l.Type.NULL, !1, "")
      ]),
      // subjectPublicKey
      l.create(l.Class.UNIVERSAL, l.Type.BITSTRING, !1, [
        v.publicKeyToRSAPublicKey(i)
      ])
    ]);
  }, v.publicKeyToRSAPublicKey = function(i) {
    return l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [
      // modulus (n)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.n)
      ),
      // publicExponent (e)
      l.create(
        l.Class.UNIVERSAL,
        l.Type.INTEGER,
        !1,
        s(i.e)
      )
    ]);
  };
  function g(i, n, A) {
    var _ = t.util.createBuffer(), P = Math.ceil(n.n.bitLength() / 8);
    if (i.length > P - 11) {
      var D = new Error("Message is too long for PKCS#1 v1.5 padding.");
      throw D.length = i.length, D.max = P - 11, D;
    }
    _.putByte(0), _.putByte(A);
    var K = P - 3 - i.length, q;
    if (A === 0 || A === 1) {
      q = A === 0 ? 0 : 255;
      for (var H = 0; H < K; ++H)
        _.putByte(q);
    } else
      for (; K > 0; ) {
        for (var G = 0, X = t.random.getBytes(K), H = 0; H < K; ++H)
          q = X.charCodeAt(H), q === 0 ? ++G : _.putByte(q);
        K = G;
      }
    return _.putByte(0), _.putBytes(i), _;
  }
  function C(i, n, A, _, P) {
    var D = Math.ceil(n.n.bitLength() / 8), K = t.util.createBuffer(i), q = K.getByte(), H = K.getByte();
    if (q !== 0 || A && H !== 0 && H !== 1 || !A && H !== 2 || A && H === 0 && typeof _ > "u")
      throw new Error("Encryption block is invalid.");
    var G = 0;
    if (H === 0) {
      G = D - 3 - _;
      for (var X = 0; X < G; ++X)
        if (K.getByte() !== 0)
          throw new Error("Encryption block is invalid.");
    } else if (H === 1) {
      for (G = 0; K.length() > 1; ) {
        if (K.getByte() !== 255) {
          --K.read;
          break;
        }
        ++G;
      }
      if (G < 8 && !(P && P._skipPaddingChecks))
        throw new Error("Encryption block is invalid.");
    } else if (H === 2) {
      for (G = 0; K.length() > 1; ) {
        if (K.getByte() === 0) {
          --K.read;
          break;
        }
        ++G;
      }
      if (G < 8 && !(P && P._skipPaddingChecks))
        throw new Error("Encryption block is invalid.");
    }
    var Z = K.getByte();
    if (Z !== 0 || G !== D - 3 - K.length())
      throw new Error("Encryption block is invalid.");
    return K.getBytes();
  }
  function m(i, n, A) {
    typeof n == "function" && (A = n, n = {}), n = n || {};
    var _ = {
      algorithm: {
        name: n.algorithm || "PRIMEINC",
        options: {
          workers: n.workers || 2,
          workLoad: n.workLoad || 100,
          workerScript: n.workerScript
        }
      }
    };
    "prng" in n && (_.prng = n.prng), P();
    function P() {
      D(i.pBits, function(q, H) {
        if (q)
          return A(q);
        if (i.p = H, i.q !== null)
          return K(q, i.q);
        D(i.qBits, K);
      });
    }
    function D(q, H) {
      t.prime.generateProbablePrime(q, _, H);
    }
    function K(q, H) {
      if (q)
        return A(q);
      if (i.q = H, i.p.compareTo(i.q) < 0) {
        var G = i.p;
        i.p = i.q, i.q = G;
      }
      if (i.p.subtract(e.ONE).gcd(i.e).compareTo(e.ONE) !== 0) {
        i.p = null, P();
        return;
      }
      if (i.q.subtract(e.ONE).gcd(i.e).compareTo(e.ONE) !== 0) {
        i.q = null, D(i.qBits, K);
        return;
      }
      if (i.p1 = i.p.subtract(e.ONE), i.q1 = i.q.subtract(e.ONE), i.phi = i.p1.multiply(i.q1), i.phi.gcd(i.e).compareTo(e.ONE) !== 0) {
        i.p = i.q = null, P();
        return;
      }
      if (i.n = i.p.multiply(i.q), i.n.bitLength() !== i.bits) {
        i.q = null, D(i.qBits, K);
        return;
      }
      var X = i.e.modInverse(i.phi);
      i.keys = {
        privateKey: v.rsa.setPrivateKey(
          i.n,
          i.e,
          X,
          i.p,
          i.q,
          X.mod(i.p1),
          X.mod(i.q1),
          i.q.modInverse(i.p)
        ),
        publicKey: v.rsa.setPublicKey(i.n, i.e)
      }, A(null, i.keys);
    }
  }
  function s(i) {
    var n = i.toString(16);
    n[0] >= "8" && (n = "00" + n);
    var A = t.util.hexToBytes(n);
    return A.length > 1 && // leading 0x00 for positive integer
    (A.charCodeAt(0) === 0 && (A.charCodeAt(1) & 128) === 0 || // leading 0xFF for negative integer
    A.charCodeAt(0) === 255 && (A.charCodeAt(1) & 128) === 128) ? A.substr(1) : A;
  }
  function d(i) {
    return i <= 100 ? 27 : i <= 150 ? 18 : i <= 200 ? 15 : i <= 250 ? 12 : i <= 300 ? 9 : i <= 350 ? 8 : i <= 400 ? 7 : i <= 500 ? 6 : i <= 600 ? 5 : i <= 800 ? 4 : i <= 1250 ? 3 : 2;
  }
  function y(i) {
    return t.util.isNodejs && typeof r[i] == "function";
  }
  function B(i) {
    return typeof E.globalScope < "u" && typeof E.globalScope.crypto == "object" && typeof E.globalScope.crypto.subtle == "object" && typeof E.globalScope.crypto.subtle[i] == "function";
  }
  function b(i) {
    return typeof E.globalScope < "u" && typeof E.globalScope.msCrypto == "object" && typeof E.globalScope.msCrypto.subtle == "object" && typeof E.globalScope.msCrypto.subtle[i] == "function";
  }
  function h(i) {
    for (var n = t.util.hexToBytes(i.toString(16)), A = new Uint8Array(n.length), _ = 0; _ < n.length; ++_)
      A[_] = n.charCodeAt(_);
    return A;
  }
  return Ar;
}
var Br, Na;
function dn() {
  if (Na) return Br;
  Na = 1;
  var t = he();
  if (xt(), ut(), Yt(), ht(), St(), Zr(), wt(), st(), fn(), Wt(), pe(), typeof e > "u")
    var e = t.jsbn.BigInteger;
  var r = t.asn1, l = t.pki = t.pki || {};
  Br = l.pbe = t.pbe = t.pbe || {};
  var E = l.oids, v = {
    name: "EncryptedPrivateKeyInfo",
    tagClass: r.Class.UNIVERSAL,
    type: r.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
      tagClass: r.Class.UNIVERSAL,
      type: r.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "AlgorithmIdentifier.algorithm",
        tagClass: r.Class.UNIVERSAL,
        type: r.Type.OID,
        constructed: !1,
        capture: "encryptionOid"
      }, {
        name: "AlgorithmIdentifier.parameters",
        tagClass: r.Class.UNIVERSAL,
        type: r.Type.SEQUENCE,
        constructed: !0,
        captureAsn1: "encryptionParams"
      }]
    }, {
      // encryptedData
      name: "EncryptedPrivateKeyInfo.encryptedData",
      tagClass: r.Class.UNIVERSAL,
      type: r.Type.OCTETSTRING,
      constructed: !1,
      capture: "encryptedData"
    }]
  }, u = {
    name: "PBES2Algorithms",
    tagClass: r.Class.UNIVERSAL,
    type: r.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "PBES2Algorithms.keyDerivationFunc",
      tagClass: r.Class.UNIVERSAL,
      type: r.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "PBES2Algorithms.keyDerivationFunc.oid",
        tagClass: r.Class.UNIVERSAL,
        type: r.Type.OID,
        constructed: !1,
        capture: "kdfOid"
      }, {
        name: "PBES2Algorithms.params",
        tagClass: r.Class.UNIVERSAL,
        type: r.Type.SEQUENCE,
        constructed: !0,
        value: [{
          name: "PBES2Algorithms.params.salt",
          tagClass: r.Class.UNIVERSAL,
          type: r.Type.OCTETSTRING,
          constructed: !1,
          capture: "kdfSalt"
        }, {
          name: "PBES2Algorithms.params.iterationCount",
          tagClass: r.Class.UNIVERSAL,
          type: r.Type.INTEGER,
          constructed: !1,
          capture: "kdfIterationCount"
        }, {
          name: "PBES2Algorithms.params.keyLength",
          tagClass: r.Class.UNIVERSAL,
          type: r.Type.INTEGER,
          constructed: !1,
          optional: !0,
          capture: "keyLength"
        }, {
          // prf
          name: "PBES2Algorithms.params.prf",
          tagClass: r.Class.UNIVERSAL,
          type: r.Type.SEQUENCE,
          constructed: !0,
          optional: !0,
          value: [{
            name: "PBES2Algorithms.params.prf.algorithm",
            tagClass: r.Class.UNIVERSAL,
            type: r.Type.OID,
            constructed: !1,
            capture: "prfOid"
          }]
        }]
      }]
    }, {
      name: "PBES2Algorithms.encryptionScheme",
      tagClass: r.Class.UNIVERSAL,
      type: r.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "PBES2Algorithms.encryptionScheme.oid",
        tagClass: r.Class.UNIVERSAL,
        type: r.Type.OID,
        constructed: !1,
        capture: "encOid"
      }, {
        name: "PBES2Algorithms.encryptionScheme.iv",
        tagClass: r.Class.UNIVERSAL,
        type: r.Type.OCTETSTRING,
        constructed: !1,
        capture: "encIv"
      }]
    }]
  }, a = {
    name: "pkcs-12PbeParams",
    tagClass: r.Class.UNIVERSAL,
    type: r.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "pkcs-12PbeParams.salt",
      tagClass: r.Class.UNIVERSAL,
      type: r.Type.OCTETSTRING,
      constructed: !1,
      capture: "salt"
    }, {
      name: "pkcs-12PbeParams.iterations",
      tagClass: r.Class.UNIVERSAL,
      type: r.Type.INTEGER,
      constructed: !1,
      capture: "iterations"
    }]
  };
  l.encryptPrivateKeyInfo = function(T, c, g) {
    g = g || {}, g.saltSize = g.saltSize || 8, g.count = g.count || 2048, g.algorithm = g.algorithm || "aes128", g.prfAlgorithm = g.prfAlgorithm || "sha1";
    var C = t.random.getBytesSync(g.saltSize), m = g.count, s = r.integerToDer(m), d, y, B;
    if (g.algorithm.indexOf("aes") === 0 || g.algorithm === "des") {
      var b, h, i;
      switch (g.algorithm) {
        case "aes128":
          d = 16, b = 16, h = E["aes128-CBC"], i = t.aes.createEncryptionCipher;
          break;
        case "aes192":
          d = 24, b = 16, h = E["aes192-CBC"], i = t.aes.createEncryptionCipher;
          break;
        case "aes256":
          d = 32, b = 16, h = E["aes256-CBC"], i = t.aes.createEncryptionCipher;
          break;
        case "des":
          d = 8, b = 8, h = E.desCBC, i = t.des.createEncryptionCipher;
          break;
        default:
          var n = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
          throw n.algorithm = g.algorithm, n;
      }
      var A = "hmacWith" + g.prfAlgorithm.toUpperCase(), _ = S(A), P = t.pkcs5.pbkdf2(c, C, m, d, _), D = t.random.getBytesSync(b), K = i(P);
      K.start(D), K.update(r.toDer(T)), K.finish(), B = K.output.getBytes();
      var q = U(C, s, d, A);
      y = r.create(
        r.Class.UNIVERSAL,
        r.Type.SEQUENCE,
        !0,
        [
          r.create(
            r.Class.UNIVERSAL,
            r.Type.OID,
            !1,
            r.oidToDer(E.pkcs5PBES2).getBytes()
          ),
          r.create(r.Class.UNIVERSAL, r.Type.SEQUENCE, !0, [
            // keyDerivationFunc
            r.create(r.Class.UNIVERSAL, r.Type.SEQUENCE, !0, [
              r.create(
                r.Class.UNIVERSAL,
                r.Type.OID,
                !1,
                r.oidToDer(E.pkcs5PBKDF2).getBytes()
              ),
              // PBKDF2-params
              q
            ]),
            // encryptionScheme
            r.create(r.Class.UNIVERSAL, r.Type.SEQUENCE, !0, [
              r.create(
                r.Class.UNIVERSAL,
                r.Type.OID,
                !1,
                r.oidToDer(h).getBytes()
              ),
              // iv
              r.create(
                r.Class.UNIVERSAL,
                r.Type.OCTETSTRING,
                !1,
                D
              )
            ])
          ])
        ]
      );
    } else if (g.algorithm === "3des") {
      d = 24;
      var H = new t.util.ByteBuffer(C), P = l.pbe.generatePkcs12Key(c, H, 1, m, d), D = l.pbe.generatePkcs12Key(c, H, 2, m, d), K = t.des.createEncryptionCipher(P);
      K.start(D), K.update(r.toDer(T)), K.finish(), B = K.output.getBytes(), y = r.create(
        r.Class.UNIVERSAL,
        r.Type.SEQUENCE,
        !0,
        [
          r.create(
            r.Class.UNIVERSAL,
            r.Type.OID,
            !1,
            r.oidToDer(E["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()
          ),
          // pkcs-12PbeParams
          r.create(r.Class.UNIVERSAL, r.Type.SEQUENCE, !0, [
            // salt
            r.create(r.Class.UNIVERSAL, r.Type.OCTETSTRING, !1, C),
            // iteration count
            r.create(
              r.Class.UNIVERSAL,
              r.Type.INTEGER,
              !1,
              s.getBytes()
            )
          ])
        ]
      );
    } else {
      var n = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
      throw n.algorithm = g.algorithm, n;
    }
    var G = r.create(r.Class.UNIVERSAL, r.Type.SEQUENCE, !0, [
      // encryptionAlgorithm
      y,
      // encryptedData
      r.create(
        r.Class.UNIVERSAL,
        r.Type.OCTETSTRING,
        !1,
        B
      )
    ]);
    return G;
  }, l.decryptPrivateKeyInfo = function(T, c) {
    var g = null, C = {}, m = [];
    if (!r.validate(T, v, C, m)) {
      var s = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
      throw s.errors = m, s;
    }
    var d = r.derToOid(C.encryptionOid), y = l.pbe.getCipher(d, C.encryptionParams, c), B = t.util.createBuffer(C.encryptedData);
    return y.update(B), y.finish() && (g = r.fromDer(y.output)), g;
  }, l.encryptedPrivateKeyToPem = function(T, c) {
    var g = {
      type: "ENCRYPTED PRIVATE KEY",
      body: r.toDer(T).getBytes()
    };
    return t.pem.encode(g, { maxline: c });
  }, l.encryptedPrivateKeyFromPem = function(T) {
    var c = t.pem.decode(T)[0];
    if (c.type !== "ENCRYPTED PRIVATE KEY") {
      var g = new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');
      throw g.headerType = c.type, g;
    }
    if (c.procType && c.procType.type === "ENCRYPTED")
      throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
    return r.fromDer(c.body);
  }, l.encryptRsaPrivateKey = function(T, c, g) {
    if (g = g || {}, !g.legacy) {
      var C = l.wrapRsaPrivateKey(l.privateKeyToAsn1(T));
      return C = l.encryptPrivateKeyInfo(C, c, g), l.encryptedPrivateKeyToPem(C);
    }
    var m, s, d, y;
    switch (g.algorithm) {
      case "aes128":
        m = "AES-128-CBC", d = 16, s = t.random.getBytesSync(16), y = t.aes.createEncryptionCipher;
        break;
      case "aes192":
        m = "AES-192-CBC", d = 24, s = t.random.getBytesSync(16), y = t.aes.createEncryptionCipher;
        break;
      case "aes256":
        m = "AES-256-CBC", d = 32, s = t.random.getBytesSync(16), y = t.aes.createEncryptionCipher;
        break;
      case "3des":
        m = "DES-EDE3-CBC", d = 24, s = t.random.getBytesSync(8), y = t.des.createEncryptionCipher;
        break;
      case "des":
        m = "DES-CBC", d = 8, s = t.random.getBytesSync(8), y = t.des.createEncryptionCipher;
        break;
      default:
        var B = new Error('Could not encrypt RSA private key; unsupported encryption algorithm "' + g.algorithm + '".');
        throw B.algorithm = g.algorithm, B;
    }
    var b = t.pbe.opensslDeriveBytes(c, s.substr(0, 8), d), h = y(b);
    h.start(s), h.update(r.toDer(l.privateKeyToAsn1(T))), h.finish();
    var i = {
      type: "RSA PRIVATE KEY",
      procType: {
        version: "4",
        type: "ENCRYPTED"
      },
      dekInfo: {
        algorithm: m,
        parameters: t.util.bytesToHex(s).toUpperCase()
      },
      body: h.output.getBytes()
    };
    return t.pem.encode(i);
  }, l.decryptRsaPrivateKey = function(T, c) {
    var g = null, C = t.pem.decode(T)[0];
    if (C.type !== "ENCRYPTED PRIVATE KEY" && C.type !== "PRIVATE KEY" && C.type !== "RSA PRIVATE KEY") {
      var m = new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".');
      throw m.headerType = m, m;
    }
    if (C.procType && C.procType.type === "ENCRYPTED") {
      var s, d;
      switch (C.dekInfo.algorithm) {
        case "DES-CBC":
          s = 8, d = t.des.createDecryptionCipher;
          break;
        case "DES-EDE3-CBC":
          s = 24, d = t.des.createDecryptionCipher;
          break;
        case "AES-128-CBC":
          s = 16, d = t.aes.createDecryptionCipher;
          break;
        case "AES-192-CBC":
          s = 24, d = t.aes.createDecryptionCipher;
          break;
        case "AES-256-CBC":
          s = 32, d = t.aes.createDecryptionCipher;
          break;
        case "RC2-40-CBC":
          s = 5, d = function(i) {
            return t.rc2.createDecryptionCipher(i, 40);
          };
          break;
        case "RC2-64-CBC":
          s = 8, d = function(i) {
            return t.rc2.createDecryptionCipher(i, 64);
          };
          break;
        case "RC2-128-CBC":
          s = 16, d = function(i) {
            return t.rc2.createDecryptionCipher(i, 128);
          };
          break;
        default:
          var m = new Error('Could not decrypt private key; unsupported encryption algorithm "' + C.dekInfo.algorithm + '".');
          throw m.algorithm = C.dekInfo.algorithm, m;
      }
      var y = t.util.hexToBytes(C.dekInfo.parameters), B = t.pbe.opensslDeriveBytes(c, y.substr(0, 8), s), b = d(B);
      if (b.start(y), b.update(t.util.createBuffer(C.body)), b.finish())
        g = b.output.getBytes();
      else
        return g;
    } else
      g = C.body;
    return C.type === "ENCRYPTED PRIVATE KEY" ? g = l.decryptPrivateKeyInfo(r.fromDer(g), c) : g = r.fromDer(g), g !== null && (g = l.privateKeyFromAsn1(g)), g;
  }, l.pbe.generatePkcs12Key = function(T, c, g, C, m, s) {
    var d, y;
    if (typeof s > "u" || s === null) {
      if (!("sha1" in t.md))
        throw new Error('"sha1" hash algorithm unavailable.');
      s = t.md.sha1.create();
    }
    var B = s.digestLength, b = s.blockLength, h = new t.util.ByteBuffer(), i = new t.util.ByteBuffer();
    if (T != null) {
      for (y = 0; y < T.length; y++)
        i.putInt16(T.charCodeAt(y));
      i.putInt16(0);
    }
    var n = i.length(), A = c.length(), _ = new t.util.ByteBuffer();
    _.fillWithByte(g, b);
    var P = b * Math.ceil(A / b), D = new t.util.ByteBuffer();
    for (y = 0; y < P; y++)
      D.putByte(c.at(y % A));
    var K = b * Math.ceil(n / b), q = new t.util.ByteBuffer();
    for (y = 0; y < K; y++)
      q.putByte(i.at(y % n));
    var H = D;
    H.putBuffer(q);
    for (var G = Math.ceil(m / B), X = 1; X <= G; X++) {
      var Z = new t.util.ByteBuffer();
      Z.putBytes(_.bytes()), Z.putBytes(H.bytes());
      for (var F = 0; F < C; F++)
        s.start(), s.update(Z.getBytes()), Z = s.digest();
      var Y = new t.util.ByteBuffer();
      for (y = 0; y < b; y++)
        Y.putByte(Z.at(y % B));
      var ee = Math.ceil(A / b) + Math.ceil(n / b), se = new t.util.ByteBuffer();
      for (d = 0; d < ee; d++) {
        var fe = new t.util.ByteBuffer(H.getBytes(b)), oe = 511;
        for (y = Y.length() - 1; y >= 0; y--)
          oe = oe >> 8, oe += Y.at(y) + fe.at(y), fe.setAt(y, oe & 255);
        se.putBuffer(fe);
      }
      H = se, h.putBuffer(Z);
    }
    return h.truncate(h.length() - m), h;
  }, l.pbe.getCipher = function(T, c, g) {
    switch (T) {
      case l.oids.pkcs5PBES2:
        return l.pbe.getCipherForPBES2(T, c, g);
      case l.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
      case l.oids["pbewithSHAAnd40BitRC2-CBC"]:
        return l.pbe.getCipherForPKCS12PBE(T, c, g);
      default:
        var C = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
        throw C.oid = T, C.supportedOids = [
          "pkcs5PBES2",
          "pbeWithSHAAnd3-KeyTripleDES-CBC",
          "pbewithSHAAnd40BitRC2-CBC"
        ], C;
    }
  }, l.pbe.getCipherForPBES2 = function(T, c, g) {
    var C = {}, m = [];
    if (!r.validate(c, u, C, m)) {
      var s = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
      throw s.errors = m, s;
    }
    if (T = r.derToOid(C.kdfOid), T !== l.oids.pkcs5PBKDF2) {
      var s = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");
      throw s.oid = T, s.supportedOids = ["pkcs5PBKDF2"], s;
    }
    if (T = r.derToOid(C.encOid), T !== l.oids["aes128-CBC"] && T !== l.oids["aes192-CBC"] && T !== l.oids["aes256-CBC"] && T !== l.oids["des-EDE3-CBC"] && T !== l.oids.desCBC) {
      var s = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");
      throw s.oid = T, s.supportedOids = [
        "aes128-CBC",
        "aes192-CBC",
        "aes256-CBC",
        "des-EDE3-CBC",
        "desCBC"
      ], s;
    }
    var d = C.kdfSalt, y = t.util.createBuffer(C.kdfIterationCount);
    y = y.getInt(y.length() << 3);
    var B, b;
    switch (l.oids[T]) {
      case "aes128-CBC":
        B = 16, b = t.aes.createDecryptionCipher;
        break;
      case "aes192-CBC":
        B = 24, b = t.aes.createDecryptionCipher;
        break;
      case "aes256-CBC":
        B = 32, b = t.aes.createDecryptionCipher;
        break;
      case "des-EDE3-CBC":
        B = 24, b = t.des.createDecryptionCipher;
        break;
      case "desCBC":
        B = 8, b = t.des.createDecryptionCipher;
        break;
    }
    var h = f(C.prfOid), i = t.pkcs5.pbkdf2(g, d, y, B, h), n = C.encIv, A = b(i);
    return A.start(n), A;
  }, l.pbe.getCipherForPKCS12PBE = function(T, c, g) {
    var C = {}, m = [];
    if (!r.validate(c, a, C, m)) {
      var s = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
      throw s.errors = m, s;
    }
    var d = t.util.createBuffer(C.salt), y = t.util.createBuffer(C.iterations);
    y = y.getInt(y.length() << 3);
    var B, b, h;
    switch (T) {
      case l.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
        B = 24, b = 8, h = t.des.startDecrypting;
        break;
      case l.oids["pbewithSHAAnd40BitRC2-CBC"]:
        B = 5, b = 8, h = function(P, D) {
          var K = t.rc2.createDecryptionCipher(P, 40);
          return K.start(D, null), K;
        };
        break;
      default:
        var s = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
        throw s.oid = T, s;
    }
    var i = f(C.prfOid), n = l.pbe.generatePkcs12Key(g, d, 1, y, B, i);
    i.start();
    var A = l.pbe.generatePkcs12Key(g, d, 2, y, b, i);
    return h(n, A);
  }, l.pbe.opensslDeriveBytes = function(T, c, g, C) {
    if (typeof C > "u" || C === null) {
      if (!("md5" in t.md))
        throw new Error('"md5" hash algorithm unavailable.');
      C = t.md.md5.create();
    }
    c === null && (c = "");
    for (var m = [p(C, T + c)], s = 16, d = 1; s < g; ++d, s += 16)
      m.push(p(C, m[d - 1] + T + c));
    return m.join("").substr(0, g);
  };
  function p(T, c) {
    return T.start().update(c).digest().getBytes();
  }
  function f(T) {
    var c;
    if (!T)
      c = "hmacWithSHA1";
    else if (c = l.oids[r.derToOid(T)], !c) {
      var g = new Error("Unsupported PRF OID.");
      throw g.oid = T, g.supported = [
        "hmacWithSHA1",
        "hmacWithSHA224",
        "hmacWithSHA256",
        "hmacWithSHA384",
        "hmacWithSHA512"
      ], g;
    }
    return S(c);
  }
  function S(T) {
    var c = t.md;
    switch (T) {
      case "hmacWithSHA224":
        c = t.md.sha512;
      case "hmacWithSHA1":
      case "hmacWithSHA256":
      case "hmacWithSHA384":
      case "hmacWithSHA512":
        T = T.substr(8).toLowerCase();
        break;
      default:
        var g = new Error("Unsupported PRF algorithm.");
        throw g.algorithm = T, g.supported = [
          "hmacWithSHA1",
          "hmacWithSHA224",
          "hmacWithSHA256",
          "hmacWithSHA384",
          "hmacWithSHA512"
        ], g;
    }
    if (!c || !(T in c))
      throw new Error("Unknown hash algorithm: " + T);
    return c[T].create();
  }
  function U(T, c, g, C) {
    var m = r.create(r.Class.UNIVERSAL, r.Type.SEQUENCE, !0, [
      // salt
      r.create(
        r.Class.UNIVERSAL,
        r.Type.OCTETSTRING,
        !1,
        T
      ),
      // iteration count
      r.create(
        r.Class.UNIVERSAL,
        r.Type.INTEGER,
        !1,
        c.getBytes()
      )
    ]);
    return C !== "hmacWithSHA1" && m.value.push(
      // key length
      r.create(
        r.Class.UNIVERSAL,
        r.Type.INTEGER,
        !1,
        t.util.hexToBytes(g.toString(16))
      ),
      // AlgorithmIdentifier
      r.create(r.Class.UNIVERSAL, r.Type.SEQUENCE, !0, [
        // algorithm
        r.create(
          r.Class.UNIVERSAL,
          r.Type.OID,
          !1,
          r.oidToDer(l.oids[C]).getBytes()
        ),
        // parameters (null)
        r.create(r.Class.UNIVERSAL, r.Type.NULL, !1, "")
      ])
    ), m;
  }
  return Br;
}
var br = { exports: {} }, Ir = { exports: {} }, wa;
function pn() {
  if (wa) return Ir.exports;
  wa = 1;
  var t = he();
  ut(), pe();
  var e = t.asn1, r = Ir.exports = t.pkcs7asn1 = t.pkcs7asn1 || {};
  t.pkcs7 = t.pkcs7 || {}, t.pkcs7.asn1 = r;
  var l = {
    name: "ContentInfo",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "ContentInfo.ContentType",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OID,
      constructed: !1,
      capture: "contentType"
    }, {
      name: "ContentInfo.content",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      type: 0,
      constructed: !0,
      optional: !0,
      captureAsn1: "content"
    }]
  };
  r.contentInfoValidator = l;
  var E = {
    name: "EncryptedContentInfo",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "EncryptedContentInfo.contentType",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OID,
      constructed: !1,
      capture: "contentType"
    }, {
      name: "EncryptedContentInfo.contentEncryptionAlgorithm",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.OID,
        constructed: !1,
        capture: "encAlgorithm"
      }, {
        name: "EncryptedContentInfo.contentEncryptionAlgorithm.parameter",
        tagClass: e.Class.UNIVERSAL,
        captureAsn1: "encParameter"
      }]
    }, {
      name: "EncryptedContentInfo.encryptedContent",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      type: 0,
      /* The PKCS#7 structure output by OpenSSL somewhat differs from what
       * other implementations do generate.
       *
       * OpenSSL generates a structure like this:
       * SEQUENCE {
       *    ...
       *    [0]
       *       26 DA 67 D2 17 9C 45 3C B1 2A A8 59 2F 29 33 38
       *       C3 C3 DF 86 71 74 7A 19 9F 40 D0 29 BE 85 90 45
       *       ...
       * }
       *
       * Whereas other implementations (and this PKCS#7 module) generate:
       * SEQUENCE {
       *    ...
       *    [0] {
       *       OCTET STRING
       *          26 DA 67 D2 17 9C 45 3C B1 2A A8 59 2F 29 33 38
       *          C3 C3 DF 86 71 74 7A 19 9F 40 D0 29 BE 85 90 45
       *          ...
       *    }
       * }
       *
       * In order to support both, we just capture the context specific
       * field here.  The OCTET STRING bit is removed below.
       */
      capture: "encryptedContent",
      captureAsn1: "encryptedContentAsn1"
    }]
  };
  r.envelopedDataValidator = {
    name: "EnvelopedData",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "EnvelopedData.Version",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.INTEGER,
      constructed: !1,
      capture: "version"
    }, {
      name: "EnvelopedData.RecipientInfos",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SET,
      constructed: !0,
      captureAsn1: "recipientInfos"
    }].concat(E)
  }, r.encryptedDataValidator = {
    name: "EncryptedData",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "EncryptedData.Version",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.INTEGER,
      constructed: !1,
      capture: "version"
    }].concat(E)
  };
  var v = {
    name: "SignerInfo",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "SignerInfo.version",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.INTEGER,
      constructed: !1
    }, {
      name: "SignerInfo.issuerAndSerialNumber",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "SignerInfo.issuerAndSerialNumber.issuer",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.SEQUENCE,
        constructed: !0,
        captureAsn1: "issuer"
      }, {
        name: "SignerInfo.issuerAndSerialNumber.serialNumber",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.INTEGER,
        constructed: !1,
        capture: "serial"
      }]
    }, {
      name: "SignerInfo.digestAlgorithm",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "SignerInfo.digestAlgorithm.algorithm",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.OID,
        constructed: !1,
        capture: "digestAlgorithm"
      }, {
        name: "SignerInfo.digestAlgorithm.parameter",
        tagClass: e.Class.UNIVERSAL,
        constructed: !1,
        captureAsn1: "digestParameter",
        optional: !0
      }]
    }, {
      name: "SignerInfo.authenticatedAttributes",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      type: 0,
      constructed: !0,
      optional: !0,
      capture: "authenticatedAttributes"
    }, {
      name: "SignerInfo.digestEncryptionAlgorithm",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      capture: "signatureAlgorithm"
    }, {
      name: "SignerInfo.encryptedDigest",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OCTETSTRING,
      constructed: !1,
      capture: "signature"
    }, {
      name: "SignerInfo.unauthenticatedAttributes",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      type: 1,
      constructed: !0,
      optional: !0,
      capture: "unauthenticatedAttributes"
    }]
  };
  return r.signedDataValidator = {
    name: "SignedData",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [
      {
        name: "SignedData.Version",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.INTEGER,
        constructed: !1,
        capture: "version"
      },
      {
        name: "SignedData.DigestAlgorithms",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.SET,
        constructed: !0,
        captureAsn1: "digestAlgorithms"
      },
      l,
      {
        name: "SignedData.Certificates",
        tagClass: e.Class.CONTEXT_SPECIFIC,
        type: 0,
        optional: !0,
        captureAsn1: "certificates"
      },
      {
        name: "SignedData.CertificateRevocationLists",
        tagClass: e.Class.CONTEXT_SPECIFIC,
        type: 1,
        optional: !0,
        captureAsn1: "crls"
      },
      {
        name: "SignedData.SignerInfos",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.SET,
        capture: "signerInfos",
        optional: !0,
        value: [v]
      }
    ]
  }, r.recipientInfoValidator = {
    name: "RecipientInfo",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "RecipientInfo.version",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.INTEGER,
      constructed: !1,
      capture: "version"
    }, {
      name: "RecipientInfo.issuerAndSerial",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "RecipientInfo.issuerAndSerial.issuer",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.SEQUENCE,
        constructed: !0,
        captureAsn1: "issuer"
      }, {
        name: "RecipientInfo.issuerAndSerial.serialNumber",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.INTEGER,
        constructed: !1,
        capture: "serial"
      }]
    }, {
      name: "RecipientInfo.keyEncryptionAlgorithm",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "RecipientInfo.keyEncryptionAlgorithm.algorithm",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.OID,
        constructed: !1,
        capture: "encAlgorithm"
      }, {
        name: "RecipientInfo.keyEncryptionAlgorithm.parameter",
        tagClass: e.Class.UNIVERSAL,
        constructed: !1,
        captureAsn1: "encParameter",
        optional: !0
      }]
    }, {
      name: "RecipientInfo.encryptedKey",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OCTETSTRING,
      constructed: !1,
      capture: "encKey"
    }]
  }, Ir.exports;
}
var _r = { exports: {} }, Nr = { exports: {} }, Ra;
function yn() {
  if (Ra) return Nr.exports;
  Ra = 1;
  var t = he();
  pe(), t.mgf = t.mgf || {};
  var e = Nr.exports = t.mgf.mgf1 = t.mgf1 = t.mgf1 || {};
  return e.create = function(r) {
    var l = {
      /**
       * Generate mask of specified length.
       *
       * @param {String} seed The seed for mask generation.
       * @param maskLen Number of bytes to generate.
       * @return {String} The generated mask.
       */
      generate: function(E, v) {
        for (var u = new t.util.ByteBuffer(), a = Math.ceil(v / r.digestLength), p = 0; p < a; p++) {
          var f = new t.util.ByteBuffer();
          f.putInt32(p), r.start(), r.update(E + f.getBytes()), u.putBuffer(r.digest());
        }
        return u.truncate(u.length() - v), u.getBytes();
      }
    };
    return l;
  }, Nr.exports;
}
var wr, La;
function oi() {
  if (La) return wr;
  La = 1;
  var t = he();
  return yn(), wr = t.mgf = t.mgf || {}, t.mgf.mgf1 = t.mgf1, wr;
}
var Rr = { exports: {} }, ka;
function Jr() {
  if (ka) return Rr.exports;
  ka = 1;
  var t = he();
  st(), pe();
  var e = Rr.exports = t.pss = t.pss || {};
  return e.create = function(r) {
    arguments.length === 3 && (r = {
      md: arguments[0],
      mgf: arguments[1],
      saltLength: arguments[2]
    });
    var l = r.md, E = r.mgf, v = l.digestLength, u = r.salt || null;
    typeof u == "string" && (u = t.util.createBuffer(u));
    var a;
    if ("saltLength" in r)
      a = r.saltLength;
    else if (u !== null)
      a = u.length();
    else
      throw new Error("Salt length not specified or specific salt not given.");
    if (u !== null && u.length() !== a)
      throw new Error("Given salt length does not match length of given salt.");
    var p = r.prng || t.random, f = {};
    return f.encode = function(S, U) {
      var T, c = U - 1, g = Math.ceil(c / 8), C = S.digest().getBytes();
      if (g < v + a + 2)
        throw new Error("Message is too long to encrypt.");
      var m;
      u === null ? m = p.getBytesSync(a) : m = u.bytes();
      var s = new t.util.ByteBuffer();
      s.fillWithByte(0, 8), s.putBytes(C), s.putBytes(m), l.start(), l.update(s.getBytes());
      var d = l.digest().getBytes(), y = new t.util.ByteBuffer();
      y.fillWithByte(0, g - a - v - 2), y.putByte(1), y.putBytes(m);
      var B = y.getBytes(), b = g - v - 1, h = E.generate(d, b), i = "";
      for (T = 0; T < b; T++)
        i += String.fromCharCode(B.charCodeAt(T) ^ h.charCodeAt(T));
      var n = 65280 >> 8 * g - c & 255;
      return i = String.fromCharCode(i.charCodeAt(0) & ~n) + i.substr(1), i + d + "¼";
    }, f.verify = function(S, U, T) {
      var c, g = T - 1, C = Math.ceil(g / 8);
      if (U = U.substr(-C), C < v + a + 2)
        throw new Error("Inconsistent parameters to PSS signature verification.");
      if (U.charCodeAt(C - 1) !== 188)
        throw new Error("Encoded message does not end in 0xBC.");
      var m = C - v - 1, s = U.substr(0, m), d = U.substr(m, v), y = 65280 >> 8 * C - g & 255;
      if ((s.charCodeAt(0) & y) !== 0)
        throw new Error("Bits beyond keysize not zero as expected.");
      var B = E.generate(d, m), b = "";
      for (c = 0; c < m; c++)
        b += String.fromCharCode(s.charCodeAt(c) ^ B.charCodeAt(c));
      b = String.fromCharCode(b.charCodeAt(0) & ~y) + b.substr(1);
      var h = C - v - a - 2;
      for (c = 0; c < h; c++)
        if (b.charCodeAt(c) !== 0)
          throw new Error("Leftmost octets not zero as expected");
      if (b.charCodeAt(h) !== 1)
        throw new Error("Inconsistent PSS signature, 0x01 marker not found");
      var i = b.substr(-a), n = new t.util.ByteBuffer();
      n.fillWithByte(0, 8), n.putBytes(S), n.putBytes(i), l.start(), l.update(n.getBytes());
      var A = l.digest().getBytes();
      return d === A;
    }, f;
  }, Rr.exports;
}
var Da;
function $r() {
  if (Da) return _r.exports;
  Da = 1;
  var t = he();
  xt(), ut(), Yt(), ht(), oi(), St(), wt(), Jr(), Wt(), pe();
  var e = t.asn1, r = _r.exports = t.pki = t.pki || {}, l = r.oids, E = {};
  E.CN = l.commonName, E.commonName = "CN", E.C = l.countryName, E.countryName = "C", E.L = l.localityName, E.localityName = "L", E.ST = l.stateOrProvinceName, E.stateOrProvinceName = "ST", E.O = l.organizationName, E.organizationName = "O", E.OU = l.organizationalUnitName, E.organizationalUnitName = "OU", E.E = l.emailAddress, E.emailAddress = "E";
  var v = t.pki.rsa.publicKeyValidator, u = {
    name: "Certificate",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "Certificate.TBSCertificate",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      captureAsn1: "tbsCertificate",
      value: [
        {
          name: "Certificate.TBSCertificate.version",
          tagClass: e.Class.CONTEXT_SPECIFIC,
          type: 0,
          constructed: !0,
          optional: !0,
          value: [{
            name: "Certificate.TBSCertificate.version.integer",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.INTEGER,
            constructed: !1,
            capture: "certVersion"
          }]
        },
        {
          name: "Certificate.TBSCertificate.serialNumber",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.INTEGER,
          constructed: !1,
          capture: "certSerialNumber"
        },
        {
          name: "Certificate.TBSCertificate.signature",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.SEQUENCE,
          constructed: !0,
          value: [{
            name: "Certificate.TBSCertificate.signature.algorithm",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.OID,
            constructed: !1,
            capture: "certinfoSignatureOid"
          }, {
            name: "Certificate.TBSCertificate.signature.parameters",
            tagClass: e.Class.UNIVERSAL,
            optional: !0,
            captureAsn1: "certinfoSignatureParams"
          }]
        },
        {
          name: "Certificate.TBSCertificate.issuer",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.SEQUENCE,
          constructed: !0,
          captureAsn1: "certIssuer"
        },
        {
          name: "Certificate.TBSCertificate.validity",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.SEQUENCE,
          constructed: !0,
          // Note: UTC and generalized times may both appear so the capture
          // names are based on their detected order, the names used below
          // are only for the common case, which validity time really means
          // "notBefore" and which means "notAfter" will be determined by order
          value: [{
            // notBefore (Time) (UTC time case)
            name: "Certificate.TBSCertificate.validity.notBefore (utc)",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.UTCTIME,
            constructed: !1,
            optional: !0,
            capture: "certValidity1UTCTime"
          }, {
            // notBefore (Time) (generalized time case)
            name: "Certificate.TBSCertificate.validity.notBefore (generalized)",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.GENERALIZEDTIME,
            constructed: !1,
            optional: !0,
            capture: "certValidity2GeneralizedTime"
          }, {
            // notAfter (Time) (only UTC time is supported)
            name: "Certificate.TBSCertificate.validity.notAfter (utc)",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.UTCTIME,
            constructed: !1,
            optional: !0,
            capture: "certValidity3UTCTime"
          }, {
            // notAfter (Time) (only UTC time is supported)
            name: "Certificate.TBSCertificate.validity.notAfter (generalized)",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.GENERALIZEDTIME,
            constructed: !1,
            optional: !0,
            capture: "certValidity4GeneralizedTime"
          }]
        },
        {
          // Name (subject) (RDNSequence)
          name: "Certificate.TBSCertificate.subject",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.SEQUENCE,
          constructed: !0,
          captureAsn1: "certSubject"
        },
        // SubjectPublicKeyInfo
        v,
        {
          // issuerUniqueID (optional)
          name: "Certificate.TBSCertificate.issuerUniqueID",
          tagClass: e.Class.CONTEXT_SPECIFIC,
          type: 1,
          constructed: !0,
          optional: !0,
          value: [{
            name: "Certificate.TBSCertificate.issuerUniqueID.id",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.BITSTRING,
            constructed: !1,
            // TODO: support arbitrary bit length ids
            captureBitStringValue: "certIssuerUniqueId"
          }]
        },
        {
          // subjectUniqueID (optional)
          name: "Certificate.TBSCertificate.subjectUniqueID",
          tagClass: e.Class.CONTEXT_SPECIFIC,
          type: 2,
          constructed: !0,
          optional: !0,
          value: [{
            name: "Certificate.TBSCertificate.subjectUniqueID.id",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.BITSTRING,
            constructed: !1,
            // TODO: support arbitrary bit length ids
            captureBitStringValue: "certSubjectUniqueId"
          }]
        },
        {
          // Extensions (optional)
          name: "Certificate.TBSCertificate.extensions",
          tagClass: e.Class.CONTEXT_SPECIFIC,
          type: 3,
          constructed: !0,
          captureAsn1: "certExtensions",
          optional: !0
        }
      ]
    }, {
      // AlgorithmIdentifier (signature algorithm)
      name: "Certificate.signatureAlgorithm",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      value: [{
        // algorithm
        name: "Certificate.signatureAlgorithm.algorithm",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.OID,
        constructed: !1,
        capture: "certSignatureOid"
      }, {
        name: "Certificate.TBSCertificate.signature.parameters",
        tagClass: e.Class.UNIVERSAL,
        optional: !0,
        captureAsn1: "certSignatureParams"
      }]
    }, {
      // SignatureValue
      name: "Certificate.signatureValue",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.BITSTRING,
      constructed: !1,
      captureBitStringValue: "certSignature"
    }]
  }, a = {
    name: "rsapss",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "rsapss.hashAlgorithm",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      type: 0,
      constructed: !0,
      value: [{
        name: "rsapss.hashAlgorithm.AlgorithmIdentifier",
        tagClass: e.Class.UNIVERSAL,
        type: e.Class.SEQUENCE,
        constructed: !0,
        optional: !0,
        value: [{
          name: "rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.OID,
          constructed: !1,
          capture: "hashOid"
          /* parameter block omitted, for SHA1 NULL anyhow. */
        }]
      }]
    }, {
      name: "rsapss.maskGenAlgorithm",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      type: 1,
      constructed: !0,
      value: [{
        name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier",
        tagClass: e.Class.UNIVERSAL,
        type: e.Class.SEQUENCE,
        constructed: !0,
        optional: !0,
        value: [{
          name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.OID,
          constructed: !1,
          capture: "maskGenOid"
        }, {
          name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.SEQUENCE,
          constructed: !0,
          value: [{
            name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.OID,
            constructed: !1,
            capture: "maskGenHashOid"
            /* parameter block omitted, for SHA1 NULL anyhow. */
          }]
        }]
      }]
    }, {
      name: "rsapss.saltLength",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      type: 2,
      optional: !0,
      value: [{
        name: "rsapss.saltLength.saltLength",
        tagClass: e.Class.UNIVERSAL,
        type: e.Class.INTEGER,
        constructed: !1,
        capture: "saltLength"
      }]
    }, {
      name: "rsapss.trailerField",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      type: 3,
      optional: !0,
      value: [{
        name: "rsapss.trailer.trailer",
        tagClass: e.Class.UNIVERSAL,
        type: e.Class.INTEGER,
        constructed: !1,
        capture: "trailer"
      }]
    }]
  }, p = {
    name: "CertificationRequestInfo",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    captureAsn1: "certificationRequestInfo",
    value: [
      {
        name: "CertificationRequestInfo.integer",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.INTEGER,
        constructed: !1,
        capture: "certificationRequestInfoVersion"
      },
      {
        // Name (subject) (RDNSequence)
        name: "CertificationRequestInfo.subject",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.SEQUENCE,
        constructed: !0,
        captureAsn1: "certificationRequestInfoSubject"
      },
      // SubjectPublicKeyInfo
      v,
      {
        name: "CertificationRequestInfo.attributes",
        tagClass: e.Class.CONTEXT_SPECIFIC,
        type: 0,
        constructed: !0,
        optional: !0,
        capture: "certificationRequestInfoAttributes",
        value: [{
          name: "CertificationRequestInfo.attributes",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.SEQUENCE,
          constructed: !0,
          value: [{
            name: "CertificationRequestInfo.attributes.type",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.OID,
            constructed: !1
          }, {
            name: "CertificationRequestInfo.attributes.value",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.SET,
            constructed: !0
          }]
        }]
      }
    ]
  }, f = {
    name: "CertificationRequest",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    captureAsn1: "csr",
    value: [
      p,
      {
        // AlgorithmIdentifier (signature algorithm)
        name: "CertificationRequest.signatureAlgorithm",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.SEQUENCE,
        constructed: !0,
        value: [{
          // algorithm
          name: "CertificationRequest.signatureAlgorithm.algorithm",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.OID,
          constructed: !1,
          capture: "csrSignatureOid"
        }, {
          name: "CertificationRequest.signatureAlgorithm.parameters",
          tagClass: e.Class.UNIVERSAL,
          optional: !0,
          captureAsn1: "csrSignatureParams"
        }]
      },
      {
        // signature
        name: "CertificationRequest.signature",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.BITSTRING,
        constructed: !1,
        captureBitStringValue: "csrSignature"
      }
    ]
  };
  r.RDNAttributesAsArray = function(h, i) {
    for (var n = [], A, _, P, D = 0; D < h.value.length; ++D) {
      A = h.value[D];
      for (var K = 0; K < A.value.length; ++K)
        P = {}, _ = A.value[K], P.type = e.derToOid(_.value[0].value), P.value = _.value[1].value, P.valueTagClass = _.value[1].type, P.type in l && (P.name = l[P.type], P.name in E && (P.shortName = E[P.name])), i && (i.update(P.type), i.update(P.value)), n.push(P);
    }
    return n;
  }, r.CRIAttributesAsArray = function(h) {
    for (var i = [], n = 0; n < h.length; ++n)
      for (var A = h[n], _ = e.derToOid(A.value[0].value), P = A.value[1].value, D = 0; D < P.length; ++D) {
        var K = {};
        if (K.type = _, K.value = P[D].value, K.valueTagClass = P[D].type, K.type in l && (K.name = l[K.type], K.name in E && (K.shortName = E[K.name])), K.type === l.extensionRequest) {
          K.extensions = [];
          for (var q = 0; q < K.value.length; ++q)
            K.extensions.push(r.certificateExtensionFromAsn1(K.value[q]));
        }
        i.push(K);
      }
    return i;
  };
  function S(h, i) {
    typeof i == "string" && (i = { shortName: i });
    for (var n = null, A, _ = 0; n === null && _ < h.attributes.length; ++_)
      A = h.attributes[_], (i.type && i.type === A.type || i.name && i.name === A.name || i.shortName && i.shortName === A.shortName) && (n = A);
    return n;
  }
  var U = function(h, i, n) {
    var A = {};
    if (h !== l["RSASSA-PSS"])
      return A;
    n && (A = {
      hash: {
        algorithmOid: l.sha1
      },
      mgf: {
        algorithmOid: l.mgf1,
        hash: {
          algorithmOid: l.sha1
        }
      },
      saltLength: 20
    });
    var _ = {}, P = [];
    if (!e.validate(i, a, _, P)) {
      var D = new Error("Cannot read RSASSA-PSS parameter block.");
      throw D.errors = P, D;
    }
    return _.hashOid !== void 0 && (A.hash = A.hash || {}, A.hash.algorithmOid = e.derToOid(_.hashOid)), _.maskGenOid !== void 0 && (A.mgf = A.mgf || {}, A.mgf.algorithmOid = e.derToOid(_.maskGenOid), A.mgf.hash = A.mgf.hash || {}, A.mgf.hash.algorithmOid = e.derToOid(_.maskGenHashOid)), _.saltLength !== void 0 && (A.saltLength = _.saltLength.charCodeAt(0)), A;
  }, T = function(h) {
    switch (l[h.signatureOid]) {
      case "sha1WithRSAEncryption":
      // deprecated alias
      case "sha1WithRSASignature":
        return t.md.sha1.create();
      case "md5WithRSAEncryption":
        return t.md.md5.create();
      case "sha256WithRSAEncryption":
        return t.md.sha256.create();
      case "sha384WithRSAEncryption":
        return t.md.sha384.create();
      case "sha512WithRSAEncryption":
        return t.md.sha512.create();
      case "RSASSA-PSS":
        return t.md.sha256.create();
      default:
        var i = new Error(
          "Could not compute " + h.type + " digest. Unknown signature OID."
        );
        throw i.signatureOid = h.signatureOid, i;
    }
  }, c = function(h) {
    var i = h.certificate, n;
    switch (i.signatureOid) {
      case l.sha1WithRSAEncryption:
      // deprecated alias
      case l.sha1WithRSASignature:
        break;
      case l["RSASSA-PSS"]:
        var A, _;
        if (A = l[i.signatureParameters.mgf.hash.algorithmOid], A === void 0 || t.md[A] === void 0) {
          var P = new Error("Unsupported MGF hash function.");
          throw P.oid = i.signatureParameters.mgf.hash.algorithmOid, P.name = A, P;
        }
        if (_ = l[i.signatureParameters.mgf.algorithmOid], _ === void 0 || t.mgf[_] === void 0) {
          var P = new Error("Unsupported MGF function.");
          throw P.oid = i.signatureParameters.mgf.algorithmOid, P.name = _, P;
        }
        if (_ = t.mgf[_].create(t.md[A].create()), A = l[i.signatureParameters.hash.algorithmOid], A === void 0 || t.md[A] === void 0) {
          var P = new Error("Unsupported RSASSA-PSS hash function.");
          throw P.oid = i.signatureParameters.hash.algorithmOid, P.name = A, P;
        }
        n = t.pss.create(
          t.md[A].create(),
          _,
          i.signatureParameters.saltLength
        );
        break;
    }
    return i.publicKey.verify(
      h.md.digest().getBytes(),
      h.signature,
      n
    );
  };
  r.certificateFromPem = function(h, i, n) {
    var A = t.pem.decode(h)[0];
    if (A.type !== "CERTIFICATE" && A.type !== "X509 CERTIFICATE" && A.type !== "TRUSTED CERTIFICATE") {
      var _ = new Error(
        'Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".'
      );
      throw _.headerType = A.type, _;
    }
    if (A.procType && A.procType.type === "ENCRYPTED")
      throw new Error(
        "Could not convert certificate from PEM; PEM is encrypted."
      );
    var P = e.fromDer(A.body, n);
    return r.certificateFromAsn1(P, i);
  }, r.certificateToPem = function(h, i) {
    var n = {
      type: "CERTIFICATE",
      body: e.toDer(r.certificateToAsn1(h)).getBytes()
    };
    return t.pem.encode(n, { maxline: i });
  }, r.publicKeyFromPem = function(h) {
    var i = t.pem.decode(h)[0];
    if (i.type !== "PUBLIC KEY" && i.type !== "RSA PUBLIC KEY") {
      var n = new Error('Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".');
      throw n.headerType = i.type, n;
    }
    if (i.procType && i.procType.type === "ENCRYPTED")
      throw new Error("Could not convert public key from PEM; PEM is encrypted.");
    var A = e.fromDer(i.body);
    return r.publicKeyFromAsn1(A);
  }, r.publicKeyToPem = function(h, i) {
    var n = {
      type: "PUBLIC KEY",
      body: e.toDer(r.publicKeyToAsn1(h)).getBytes()
    };
    return t.pem.encode(n, { maxline: i });
  }, r.publicKeyToRSAPublicKeyPem = function(h, i) {
    var n = {
      type: "RSA PUBLIC KEY",
      body: e.toDer(r.publicKeyToRSAPublicKey(h)).getBytes()
    };
    return t.pem.encode(n, { maxline: i });
  }, r.getPublicKeyFingerprint = function(h, i) {
    i = i || {};
    var n = i.md || t.md.sha1.create(), A = i.type || "RSAPublicKey", _;
    switch (A) {
      case "RSAPublicKey":
        _ = e.toDer(r.publicKeyToRSAPublicKey(h)).getBytes();
        break;
      case "SubjectPublicKeyInfo":
        _ = e.toDer(r.publicKeyToAsn1(h)).getBytes();
        break;
      default:
        throw new Error('Unknown fingerprint type "' + i.type + '".');
    }
    n.start(), n.update(_);
    var P = n.digest();
    if (i.encoding === "hex") {
      var D = P.toHex();
      return i.delimiter ? D.match(/.{2}/g).join(i.delimiter) : D;
    } else {
      if (i.encoding === "binary")
        return P.getBytes();
      if (i.encoding)
        throw new Error('Unknown encoding "' + i.encoding + '".');
    }
    return P;
  }, r.certificationRequestFromPem = function(h, i, n) {
    var A = t.pem.decode(h)[0];
    if (A.type !== "CERTIFICATE REQUEST") {
      var _ = new Error('Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".');
      throw _.headerType = A.type, _;
    }
    if (A.procType && A.procType.type === "ENCRYPTED")
      throw new Error("Could not convert certification request from PEM; PEM is encrypted.");
    var P = e.fromDer(A.body, n);
    return r.certificationRequestFromAsn1(P, i);
  }, r.certificationRequestToPem = function(h, i) {
    var n = {
      type: "CERTIFICATE REQUEST",
      body: e.toDer(r.certificationRequestToAsn1(h)).getBytes()
    };
    return t.pem.encode(n, { maxline: i });
  }, r.createCertificate = function() {
    var h = {};
    return h.version = 2, h.serialNumber = "00", h.signatureOid = null, h.signature = null, h.siginfo = {}, h.siginfo.algorithmOid = null, h.validity = {}, h.validity.notBefore = /* @__PURE__ */ new Date(), h.validity.notAfter = /* @__PURE__ */ new Date(), h.issuer = {}, h.issuer.getField = function(i) {
      return S(h.issuer, i);
    }, h.issuer.addField = function(i) {
      C([i]), h.issuer.attributes.push(i);
    }, h.issuer.attributes = [], h.issuer.hash = null, h.subject = {}, h.subject.getField = function(i) {
      return S(h.subject, i);
    }, h.subject.addField = function(i) {
      C([i]), h.subject.attributes.push(i);
    }, h.subject.attributes = [], h.subject.hash = null, h.extensions = [], h.publicKey = null, h.md = null, h.setSubject = function(i, n) {
      C(i), h.subject.attributes = i, delete h.subject.uniqueId, n && (h.subject.uniqueId = n), h.subject.hash = null;
    }, h.setIssuer = function(i, n) {
      C(i), h.issuer.attributes = i, delete h.issuer.uniqueId, n && (h.issuer.uniqueId = n), h.issuer.hash = null;
    }, h.setExtensions = function(i) {
      for (var n = 0; n < i.length; ++n)
        m(i[n], { cert: h });
      h.extensions = i;
    }, h.getExtension = function(i) {
      typeof i == "string" && (i = { name: i });
      for (var n = null, A, _ = 0; n === null && _ < h.extensions.length; ++_)
        A = h.extensions[_], (i.id && A.id === i.id || i.name && A.name === i.name) && (n = A);
      return n;
    }, h.sign = function(i, n) {
      h.md = n || t.md.sha1.create();
      var A = l[h.md.algorithm + "WithRSAEncryption"];
      if (!A) {
        var _ = new Error("Could not compute certificate digest. Unknown message digest algorithm OID.");
        throw _.algorithm = h.md.algorithm, _;
      }
      h.signatureOid = h.siginfo.algorithmOid = A, h.tbsCertificate = r.getTBSCertificate(h);
      var P = e.toDer(h.tbsCertificate);
      h.md.update(P.getBytes()), h.signature = i.sign(h.md);
    }, h.verify = function(i) {
      var n = !1;
      if (!h.issued(i)) {
        var A = i.issuer, _ = h.subject, P = new Error(
          "The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject."
        );
        throw P.expectedIssuer = _.attributes, P.actualIssuer = A.attributes, P;
      }
      var D = i.md;
      if (D === null) {
        D = T({
          signatureOid: i.signatureOid,
          type: "certificate"
        });
        var K = i.tbsCertificate || r.getTBSCertificate(i), q = e.toDer(K);
        D.update(q.getBytes());
      }
      return D !== null && (n = c({
        certificate: h,
        md: D,
        signature: i.signature
      })), n;
    }, h.isIssuer = function(i) {
      var n = !1, A = h.issuer, _ = i.subject;
      if (A.hash && _.hash)
        n = A.hash === _.hash;
      else if (A.attributes.length === _.attributes.length) {
        n = !0;
        for (var P, D, K = 0; n && K < A.attributes.length; ++K)
          P = A.attributes[K], D = _.attributes[K], (P.type !== D.type || P.value !== D.value) && (n = !1);
      }
      return n;
    }, h.issued = function(i) {
      return i.isIssuer(h);
    }, h.generateSubjectKeyIdentifier = function() {
      return r.getPublicKeyFingerprint(h.publicKey, { type: "RSAPublicKey" });
    }, h.verifySubjectKeyIdentifier = function() {
      for (var i = l.subjectKeyIdentifier, n = 0; n < h.extensions.length; ++n) {
        var A = h.extensions[n];
        if (A.id === i) {
          var _ = h.generateSubjectKeyIdentifier().getBytes();
          return t.util.hexToBytes(A.subjectKeyIdentifier) === _;
        }
      }
      return !1;
    }, h;
  }, r.certificateFromAsn1 = function(h, i) {
    var n = {}, A = [];
    if (!e.validate(h, u, n, A)) {
      var _ = new Error("Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.");
      throw _.errors = A, _;
    }
    var P = e.derToOid(n.publicKeyOid);
    if (P !== r.oids.rsaEncryption)
      throw new Error("Cannot read public key. OID is not RSA.");
    var D = r.createCertificate();
    D.version = n.certVersion ? n.certVersion.charCodeAt(0) : 0;
    var K = t.util.createBuffer(n.certSerialNumber);
    D.serialNumber = K.toHex(), D.signatureOid = t.asn1.derToOid(n.certSignatureOid), D.signatureParameters = U(
      D.signatureOid,
      n.certSignatureParams,
      !0
    ), D.siginfo.algorithmOid = t.asn1.derToOid(n.certinfoSignatureOid), D.siginfo.parameters = U(
      D.siginfo.algorithmOid,
      n.certinfoSignatureParams,
      !1
    ), D.signature = n.certSignature;
    var q = [];
    if (n.certValidity1UTCTime !== void 0 && q.push(e.utcTimeToDate(n.certValidity1UTCTime)), n.certValidity2GeneralizedTime !== void 0 && q.push(e.generalizedTimeToDate(
      n.certValidity2GeneralizedTime
    )), n.certValidity3UTCTime !== void 0 && q.push(e.utcTimeToDate(n.certValidity3UTCTime)), n.certValidity4GeneralizedTime !== void 0 && q.push(e.generalizedTimeToDate(
      n.certValidity4GeneralizedTime
    )), q.length > 2)
      throw new Error("Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.");
    if (q.length < 2)
      throw new Error("Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.");
    if (D.validity.notBefore = q[0], D.validity.notAfter = q[1], D.tbsCertificate = n.tbsCertificate, i) {
      D.md = T({
        signatureOid: D.signatureOid,
        type: "certificate"
      });
      var H = e.toDer(D.tbsCertificate);
      D.md.update(H.getBytes());
    }
    var G = t.md.sha1.create(), X = e.toDer(n.certIssuer);
    G.update(X.getBytes()), D.issuer.getField = function(Y) {
      return S(D.issuer, Y);
    }, D.issuer.addField = function(Y) {
      C([Y]), D.issuer.attributes.push(Y);
    }, D.issuer.attributes = r.RDNAttributesAsArray(n.certIssuer), n.certIssuerUniqueId && (D.issuer.uniqueId = n.certIssuerUniqueId), D.issuer.hash = G.digest().toHex();
    var Z = t.md.sha1.create(), F = e.toDer(n.certSubject);
    return Z.update(F.getBytes()), D.subject.getField = function(Y) {
      return S(D.subject, Y);
    }, D.subject.addField = function(Y) {
      C([Y]), D.subject.attributes.push(Y);
    }, D.subject.attributes = r.RDNAttributesAsArray(n.certSubject), n.certSubjectUniqueId && (D.subject.uniqueId = n.certSubjectUniqueId), D.subject.hash = Z.digest().toHex(), n.certExtensions ? D.extensions = r.certificateExtensionsFromAsn1(n.certExtensions) : D.extensions = [], D.publicKey = r.publicKeyFromAsn1(n.subjectPublicKeyInfo), D;
  }, r.certificateExtensionsFromAsn1 = function(h) {
    for (var i = [], n = 0; n < h.value.length; ++n)
      for (var A = h.value[n], _ = 0; _ < A.value.length; ++_)
        i.push(r.certificateExtensionFromAsn1(A.value[_]));
    return i;
  }, r.certificateExtensionFromAsn1 = function(h) {
    var i = {};
    if (i.id = e.derToOid(h.value[0].value), i.critical = !1, h.value[1].type === e.Type.BOOLEAN ? (i.critical = h.value[1].value.charCodeAt(0) !== 0, i.value = h.value[2].value) : i.value = h.value[1].value, i.id in l) {
      if (i.name = l[i.id], i.name === "keyUsage") {
        var n = e.fromDer(i.value), A = 0, _ = 0;
        n.value.length > 1 && (A = n.value.charCodeAt(1), _ = n.value.length > 2 ? n.value.charCodeAt(2) : 0), i.digitalSignature = (A & 128) === 128, i.nonRepudiation = (A & 64) === 64, i.keyEncipherment = (A & 32) === 32, i.dataEncipherment = (A & 16) === 16, i.keyAgreement = (A & 8) === 8, i.keyCertSign = (A & 4) === 4, i.cRLSign = (A & 2) === 2, i.encipherOnly = (A & 1) === 1, i.decipherOnly = (_ & 128) === 128;
      } else if (i.name === "basicConstraints") {
        var n = e.fromDer(i.value);
        n.value.length > 0 && n.value[0].type === e.Type.BOOLEAN ? i.cA = n.value[0].value.charCodeAt(0) !== 0 : i.cA = !1;
        var P = null;
        n.value.length > 0 && n.value[0].type === e.Type.INTEGER ? P = n.value[0].value : n.value.length > 1 && (P = n.value[1].value), P !== null && (i.pathLenConstraint = e.derToInteger(P));
      } else if (i.name === "extKeyUsage")
        for (var n = e.fromDer(i.value), D = 0; D < n.value.length; ++D) {
          var K = e.derToOid(n.value[D].value);
          K in l ? i[l[K]] = !0 : i[K] = !0;
        }
      else if (i.name === "nsCertType") {
        var n = e.fromDer(i.value), A = 0;
        n.value.length > 1 && (A = n.value.charCodeAt(1)), i.client = (A & 128) === 128, i.server = (A & 64) === 64, i.email = (A & 32) === 32, i.objsign = (A & 16) === 16, i.reserved = (A & 8) === 8, i.sslCA = (A & 4) === 4, i.emailCA = (A & 2) === 2, i.objCA = (A & 1) === 1;
      } else if (i.name === "subjectAltName" || i.name === "issuerAltName") {
        i.altNames = [];
        for (var q, n = e.fromDer(i.value), H = 0; H < n.value.length; ++H) {
          q = n.value[H];
          var G = {
            type: q.type,
            value: q.value
          };
          switch (i.altNames.push(G), q.type) {
            // rfc822Name
            case 1:
            // dNSName
            case 2:
            // uniformResourceIdentifier (URI)
            case 6:
              break;
            // IPAddress
            case 7:
              G.ip = t.util.bytesToIP(q.value);
              break;
            // registeredID
            case 8:
              G.oid = e.derToOid(q.value);
              break;
          }
        }
      } else if (i.name === "subjectKeyIdentifier") {
        var n = e.fromDer(i.value);
        i.subjectKeyIdentifier = t.util.bytesToHex(n.value);
      }
    }
    return i;
  }, r.certificationRequestFromAsn1 = function(h, i) {
    var n = {}, A = [];
    if (!e.validate(h, f, n, A)) {
      var _ = new Error("Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.");
      throw _.errors = A, _;
    }
    var P = e.derToOid(n.publicKeyOid);
    if (P !== r.oids.rsaEncryption)
      throw new Error("Cannot read public key. OID is not RSA.");
    var D = r.createCertificationRequest();
    if (D.version = n.csrVersion ? n.csrVersion.charCodeAt(0) : 0, D.signatureOid = t.asn1.derToOid(n.csrSignatureOid), D.signatureParameters = U(
      D.signatureOid,
      n.csrSignatureParams,
      !0
    ), D.siginfo.algorithmOid = t.asn1.derToOid(n.csrSignatureOid), D.siginfo.parameters = U(
      D.siginfo.algorithmOid,
      n.csrSignatureParams,
      !1
    ), D.signature = n.csrSignature, D.certificationRequestInfo = n.certificationRequestInfo, i) {
      D.md = T({
        signatureOid: D.signatureOid,
        type: "certification request"
      });
      var K = e.toDer(D.certificationRequestInfo);
      D.md.update(K.getBytes());
    }
    var q = t.md.sha1.create();
    return D.subject.getField = function(H) {
      return S(D.subject, H);
    }, D.subject.addField = function(H) {
      C([H]), D.subject.attributes.push(H);
    }, D.subject.attributes = r.RDNAttributesAsArray(
      n.certificationRequestInfoSubject,
      q
    ), D.subject.hash = q.digest().toHex(), D.publicKey = r.publicKeyFromAsn1(n.subjectPublicKeyInfo), D.getAttribute = function(H) {
      return S(D, H);
    }, D.addAttribute = function(H) {
      C([H]), D.attributes.push(H);
    }, D.attributes = r.CRIAttributesAsArray(
      n.certificationRequestInfoAttributes || []
    ), D;
  }, r.createCertificationRequest = function() {
    var h = {};
    return h.version = 0, h.signatureOid = null, h.signature = null, h.siginfo = {}, h.siginfo.algorithmOid = null, h.subject = {}, h.subject.getField = function(i) {
      return S(h.subject, i);
    }, h.subject.addField = function(i) {
      C([i]), h.subject.attributes.push(i);
    }, h.subject.attributes = [], h.subject.hash = null, h.publicKey = null, h.attributes = [], h.getAttribute = function(i) {
      return S(h, i);
    }, h.addAttribute = function(i) {
      C([i]), h.attributes.push(i);
    }, h.md = null, h.setSubject = function(i) {
      C(i), h.subject.attributes = i, h.subject.hash = null;
    }, h.setAttributes = function(i) {
      C(i), h.attributes = i;
    }, h.sign = function(i, n) {
      h.md = n || t.md.sha1.create();
      var A = l[h.md.algorithm + "WithRSAEncryption"];
      if (!A) {
        var _ = new Error("Could not compute certification request digest. Unknown message digest algorithm OID.");
        throw _.algorithm = h.md.algorithm, _;
      }
      h.signatureOid = h.siginfo.algorithmOid = A, h.certificationRequestInfo = r.getCertificationRequestInfo(h);
      var P = e.toDer(h.certificationRequestInfo);
      h.md.update(P.getBytes()), h.signature = i.sign(h.md);
    }, h.verify = function() {
      var i = !1, n = h.md;
      if (n === null) {
        n = T({
          signatureOid: h.signatureOid,
          type: "certification request"
        });
        var A = h.certificationRequestInfo || r.getCertificationRequestInfo(h), _ = e.toDer(A);
        n.update(_.getBytes());
      }
      return n !== null && (i = c({
        certificate: h,
        md: n,
        signature: h.signature
      })), i;
    }, h;
  };
  function g(h) {
    for (var i = e.create(
      e.Class.UNIVERSAL,
      e.Type.SEQUENCE,
      !0,
      []
    ), n, A, _ = h.attributes, P = 0; P < _.length; ++P) {
      n = _[P];
      var D = n.value, K = e.Type.PRINTABLESTRING;
      "valueTagClass" in n && (K = n.valueTagClass, K === e.Type.UTF8 && (D = t.util.encodeUtf8(D))), A = e.create(e.Class.UNIVERSAL, e.Type.SET, !0, [
        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
          // AttributeType
          e.create(
            e.Class.UNIVERSAL,
            e.Type.OID,
            !1,
            e.oidToDer(n.type).getBytes()
          ),
          // AttributeValue
          e.create(e.Class.UNIVERSAL, K, !1, D)
        ])
      ]), i.value.push(A);
    }
    return i;
  }
  function C(h) {
    for (var i, n = 0; n < h.length; ++n) {
      if (i = h[n], typeof i.name > "u" && (i.type && i.type in r.oids ? i.name = r.oids[i.type] : i.shortName && i.shortName in E && (i.name = r.oids[E[i.shortName]])), typeof i.type > "u")
        if (i.name && i.name in r.oids)
          i.type = r.oids[i.name];
        else {
          var A = new Error("Attribute type not specified.");
          throw A.attribute = i, A;
        }
      if (typeof i.shortName > "u" && i.name && i.name in E && (i.shortName = E[i.name]), i.type === l.extensionRequest && (i.valueConstructed = !0, i.valueTagClass = e.Type.SEQUENCE, !i.value && i.extensions)) {
        i.value = [];
        for (var _ = 0; _ < i.extensions.length; ++_)
          i.value.push(r.certificateExtensionToAsn1(
            m(i.extensions[_])
          ));
      }
      if (typeof i.value > "u") {
        var A = new Error("Attribute value not specified.");
        throw A.attribute = i, A;
      }
    }
  }
  function m(h, i) {
    if (i = i || {}, typeof h.name > "u" && h.id && h.id in r.oids && (h.name = r.oids[h.id]), typeof h.id > "u")
      if (h.name && h.name in r.oids)
        h.id = r.oids[h.name];
      else {
        var n = new Error("Extension ID not specified.");
        throw n.extension = h, n;
      }
    if (typeof h.value < "u")
      return h;
    if (h.name === "keyUsage") {
      var A = 0, _ = 0, P = 0;
      h.digitalSignature && (_ |= 128, A = 7), h.nonRepudiation && (_ |= 64, A = 6), h.keyEncipherment && (_ |= 32, A = 5), h.dataEncipherment && (_ |= 16, A = 4), h.keyAgreement && (_ |= 8, A = 3), h.keyCertSign && (_ |= 4, A = 2), h.cRLSign && (_ |= 2, A = 1), h.encipherOnly && (_ |= 1, A = 0), h.decipherOnly && (P |= 128, A = 7);
      var D = String.fromCharCode(A);
      P !== 0 ? D += String.fromCharCode(_) + String.fromCharCode(P) : _ !== 0 && (D += String.fromCharCode(_)), h.value = e.create(
        e.Class.UNIVERSAL,
        e.Type.BITSTRING,
        !1,
        D
      );
    } else if (h.name === "basicConstraints")
      h.value = e.create(
        e.Class.UNIVERSAL,
        e.Type.SEQUENCE,
        !0,
        []
      ), h.cA && h.value.value.push(e.create(
        e.Class.UNIVERSAL,
        e.Type.BOOLEAN,
        !1,
        "ÿ"
      )), "pathLenConstraint" in h && h.value.value.push(e.create(
        e.Class.UNIVERSAL,
        e.Type.INTEGER,
        !1,
        e.integerToDer(h.pathLenConstraint).getBytes()
      ));
    else if (h.name === "extKeyUsage") {
      h.value = e.create(
        e.Class.UNIVERSAL,
        e.Type.SEQUENCE,
        !0,
        []
      );
      var K = h.value.value;
      for (var q in h)
        h[q] === !0 && (q in l ? K.push(e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(l[q]).getBytes()
        )) : q.indexOf(".") !== -1 && K.push(e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(q).getBytes()
        )));
    } else if (h.name === "nsCertType") {
      var A = 0, _ = 0;
      h.client && (_ |= 128, A = 7), h.server && (_ |= 64, A = 6), h.email && (_ |= 32, A = 5), h.objsign && (_ |= 16, A = 4), h.reserved && (_ |= 8, A = 3), h.sslCA && (_ |= 4, A = 2), h.emailCA && (_ |= 2, A = 1), h.objCA && (_ |= 1, A = 0);
      var D = String.fromCharCode(A);
      _ !== 0 && (D += String.fromCharCode(_)), h.value = e.create(
        e.Class.UNIVERSAL,
        e.Type.BITSTRING,
        !1,
        D
      );
    } else if (h.name === "subjectAltName" || h.name === "issuerAltName") {
      h.value = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
      for (var H, G = 0; G < h.altNames.length; ++G) {
        H = h.altNames[G];
        var D = H.value;
        if (H.type === 7 && H.ip) {
          if (D = t.util.bytesFromIP(H.ip), D === null) {
            var n = new Error(
              'Extension "ip" value is not a valid IPv4 or IPv6 address.'
            );
            throw n.extension = h, n;
          }
        } else H.type === 8 && (H.oid ? D = e.oidToDer(e.oidToDer(H.oid)) : D = e.oidToDer(D));
        h.value.value.push(e.create(
          e.Class.CONTEXT_SPECIFIC,
          H.type,
          !1,
          D
        ));
      }
    } else if (h.name === "nsComment" && i.cert) {
      if (!/^[\x00-\x7F]*$/.test(h.comment) || h.comment.length < 1 || h.comment.length > 128)
        throw new Error('Invalid "nsComment" content.');
      h.value = e.create(
        e.Class.UNIVERSAL,
        e.Type.IA5STRING,
        !1,
        h.comment
      );
    } else if (h.name === "subjectKeyIdentifier" && i.cert) {
      var X = i.cert.generateSubjectKeyIdentifier();
      h.subjectKeyIdentifier = X.toHex(), h.value = e.create(
        e.Class.UNIVERSAL,
        e.Type.OCTETSTRING,
        !1,
        X.getBytes()
      );
    } else if (h.name === "authorityKeyIdentifier" && i.cert) {
      h.value = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
      var K = h.value.value;
      if (h.keyIdentifier) {
        var Z = h.keyIdentifier === !0 ? i.cert.generateSubjectKeyIdentifier().getBytes() : h.keyIdentifier;
        K.push(
          e.create(e.Class.CONTEXT_SPECIFIC, 0, !1, Z)
        );
      }
      if (h.authorityCertIssuer) {
        var F = [
          e.create(e.Class.CONTEXT_SPECIFIC, 4, !0, [
            g(h.authorityCertIssuer === !0 ? i.cert.issuer : h.authorityCertIssuer)
          ])
        ];
        K.push(
          e.create(e.Class.CONTEXT_SPECIFIC, 1, !0, F)
        );
      }
      if (h.serialNumber) {
        var Y = t.util.hexToBytes(h.serialNumber === !0 ? i.cert.serialNumber : h.serialNumber);
        K.push(
          e.create(e.Class.CONTEXT_SPECIFIC, 2, !1, Y)
        );
      }
    } else if (h.name === "cRLDistributionPoints") {
      h.value = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
      for (var K = h.value.value, ee = e.create(
        e.Class.UNIVERSAL,
        e.Type.SEQUENCE,
        !0,
        []
      ), se = e.create(
        e.Class.CONTEXT_SPECIFIC,
        0,
        !0,
        []
      ), H, G = 0; G < h.altNames.length; ++G) {
        H = h.altNames[G];
        var D = H.value;
        if (H.type === 7 && H.ip) {
          if (D = t.util.bytesFromIP(H.ip), D === null) {
            var n = new Error(
              'Extension "ip" value is not a valid IPv4 or IPv6 address.'
            );
            throw n.extension = h, n;
          }
        } else H.type === 8 && (H.oid ? D = e.oidToDer(e.oidToDer(H.oid)) : D = e.oidToDer(D));
        se.value.push(e.create(
          e.Class.CONTEXT_SPECIFIC,
          H.type,
          !1,
          D
        ));
      }
      ee.value.push(e.create(
        e.Class.CONTEXT_SPECIFIC,
        0,
        !0,
        [se]
      )), K.push(ee);
    }
    if (typeof h.value > "u") {
      var n = new Error("Extension value not specified.");
      throw n.extension = h, n;
    }
    return h;
  }
  function s(h, i) {
    switch (h) {
      case l["RSASSA-PSS"]:
        var n = [];
        return i.hash.algorithmOid !== void 0 && n.push(e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
          e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OID,
              !1,
              e.oidToDer(i.hash.algorithmOid).getBytes()
            ),
            e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, "")
          ])
        ])), i.mgf.algorithmOid !== void 0 && n.push(e.create(e.Class.CONTEXT_SPECIFIC, 1, !0, [
          e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OID,
              !1,
              e.oidToDer(i.mgf.algorithmOid).getBytes()
            ),
            e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
              e.create(
                e.Class.UNIVERSAL,
                e.Type.OID,
                !1,
                e.oidToDer(i.mgf.hash.algorithmOid).getBytes()
              ),
              e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, "")
            ])
          ])
        ])), i.saltLength !== void 0 && n.push(e.create(e.Class.CONTEXT_SPECIFIC, 2, !0, [
          e.create(
            e.Class.UNIVERSAL,
            e.Type.INTEGER,
            !1,
            e.integerToDer(i.saltLength).getBytes()
          )
        ])), e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, n);
      default:
        return e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, "");
    }
  }
  function d(h) {
    var i = e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, []);
    if (h.attributes.length === 0)
      return i;
    for (var n = h.attributes, A = 0; A < n.length; ++A) {
      var _ = n[A], P = _.value, D = e.Type.UTF8;
      "valueTagClass" in _ && (D = _.valueTagClass), D === e.Type.UTF8 && (P = t.util.encodeUtf8(P));
      var K = !1;
      "valueConstructed" in _ && (K = _.valueConstructed);
      var q = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // AttributeType
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(_.type).getBytes()
        ),
        e.create(e.Class.UNIVERSAL, e.Type.SET, !0, [
          // AttributeValue
          e.create(
            e.Class.UNIVERSAL,
            D,
            K,
            P
          )
        ])
      ]);
      i.value.push(q);
    }
    return i;
  }
  var y = /* @__PURE__ */ new Date("1950-01-01T00:00:00Z"), B = /* @__PURE__ */ new Date("2050-01-01T00:00:00Z");
  function b(h) {
    return h >= y && h < B ? e.create(
      e.Class.UNIVERSAL,
      e.Type.UTCTIME,
      !1,
      e.dateToUtcTime(h)
    ) : e.create(
      e.Class.UNIVERSAL,
      e.Type.GENERALIZEDTIME,
      !1,
      e.dateToGeneralizedTime(h)
    );
  }
  return r.getTBSCertificate = function(h) {
    var i = b(h.validity.notBefore), n = b(h.validity.notAfter), A = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // version
      e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
        // integer
        e.create(
          e.Class.UNIVERSAL,
          e.Type.INTEGER,
          !1,
          e.integerToDer(h.version).getBytes()
        )
      ]),
      // serialNumber
      e.create(
        e.Class.UNIVERSAL,
        e.Type.INTEGER,
        !1,
        t.util.hexToBytes(h.serialNumber)
      ),
      // signature
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // algorithm
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(h.siginfo.algorithmOid).getBytes()
        ),
        // parameters
        s(
          h.siginfo.algorithmOid,
          h.siginfo.parameters
        )
      ]),
      // issuer
      g(h.issuer),
      // validity
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        i,
        n
      ]),
      // subject
      g(h.subject),
      // SubjectPublicKeyInfo
      r.publicKeyToAsn1(h.publicKey)
    ]);
    return h.issuer.uniqueId && A.value.push(
      e.create(e.Class.CONTEXT_SPECIFIC, 1, !0, [
        e.create(
          e.Class.UNIVERSAL,
          e.Type.BITSTRING,
          !1,
          // TODO: support arbitrary bit length ids
          "\0" + h.issuer.uniqueId
        )
      ])
    ), h.subject.uniqueId && A.value.push(
      e.create(e.Class.CONTEXT_SPECIFIC, 2, !0, [
        e.create(
          e.Class.UNIVERSAL,
          e.Type.BITSTRING,
          !1,
          // TODO: support arbitrary bit length ids
          "\0" + h.subject.uniqueId
        )
      ])
    ), h.extensions.length > 0 && A.value.push(r.certificateExtensionsToAsn1(h.extensions)), A;
  }, r.getCertificationRequestInfo = function(h) {
    var i = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // version
      e.create(
        e.Class.UNIVERSAL,
        e.Type.INTEGER,
        !1,
        e.integerToDer(h.version).getBytes()
      ),
      // subject
      g(h.subject),
      // SubjectPublicKeyInfo
      r.publicKeyToAsn1(h.publicKey),
      // attributes
      d(h)
    ]);
    return i;
  }, r.distinguishedNameToAsn1 = function(h) {
    return g(h);
  }, r.certificateToAsn1 = function(h) {
    var i = h.tbsCertificate || r.getTBSCertificate(h);
    return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // TBSCertificate
      i,
      // AlgorithmIdentifier (signature algorithm)
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // algorithm
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(h.signatureOid).getBytes()
        ),
        // parameters
        s(h.signatureOid, h.signatureParameters)
      ]),
      // SignatureValue
      e.create(
        e.Class.UNIVERSAL,
        e.Type.BITSTRING,
        !1,
        "\0" + h.signature
      )
    ]);
  }, r.certificateExtensionsToAsn1 = function(h) {
    var i = e.create(e.Class.CONTEXT_SPECIFIC, 3, !0, []), n = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
    i.value.push(n);
    for (var A = 0; A < h.length; ++A)
      n.value.push(r.certificateExtensionToAsn1(h[A]));
    return i;
  }, r.certificateExtensionToAsn1 = function(h) {
    var i = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, []);
    i.value.push(e.create(
      e.Class.UNIVERSAL,
      e.Type.OID,
      !1,
      e.oidToDer(h.id).getBytes()
    )), h.critical && i.value.push(e.create(
      e.Class.UNIVERSAL,
      e.Type.BOOLEAN,
      !1,
      "ÿ"
    ));
    var n = h.value;
    return typeof h.value != "string" && (n = e.toDer(n).getBytes()), i.value.push(e.create(
      e.Class.UNIVERSAL,
      e.Type.OCTETSTRING,
      !1,
      n
    )), i;
  }, r.certificationRequestToAsn1 = function(h) {
    var i = h.certificationRequestInfo || r.getCertificationRequestInfo(h);
    return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // CertificationRequestInfo
      i,
      // AlgorithmIdentifier (signature algorithm)
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // algorithm
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(h.signatureOid).getBytes()
        ),
        // parameters
        s(h.signatureOid, h.signatureParameters)
      ]),
      // signature
      e.create(
        e.Class.UNIVERSAL,
        e.Type.BITSTRING,
        !1,
        "\0" + h.signature
      )
    ]);
  }, r.createCaStore = function(h) {
    var i = {
      // stored certificates
      certs: {}
    };
    i.getIssuer = function(D) {
      var K = n(D.issuer);
      return K;
    }, i.addCertificate = function(D) {
      if (typeof D == "string" && (D = t.pki.certificateFromPem(D)), A(D.subject), !i.hasCertificate(D))
        if (D.subject.hash in i.certs) {
          var K = i.certs[D.subject.hash];
          t.util.isArray(K) || (K = [K]), K.push(D), i.certs[D.subject.hash] = K;
        } else
          i.certs[D.subject.hash] = D;
    }, i.hasCertificate = function(D) {
      typeof D == "string" && (D = t.pki.certificateFromPem(D));
      var K = n(D.subject);
      if (!K)
        return !1;
      t.util.isArray(K) || (K = [K]);
      for (var q = e.toDer(r.certificateToAsn1(D)).getBytes(), H = 0; H < K.length; ++H) {
        var G = e.toDer(r.certificateToAsn1(K[H])).getBytes();
        if (q === G)
          return !0;
      }
      return !1;
    }, i.listAllCertificates = function() {
      var D = [];
      for (var K in i.certs)
        if (i.certs.hasOwnProperty(K)) {
          var q = i.certs[K];
          if (!t.util.isArray(q))
            D.push(q);
          else
            for (var H = 0; H < q.length; ++H)
              D.push(q[H]);
        }
      return D;
    }, i.removeCertificate = function(D) {
      var K;
      if (typeof D == "string" && (D = t.pki.certificateFromPem(D)), A(D.subject), !i.hasCertificate(D))
        return null;
      var q = n(D.subject);
      if (!t.util.isArray(q))
        return K = i.certs[D.subject.hash], delete i.certs[D.subject.hash], K;
      for (var H = e.toDer(r.certificateToAsn1(D)).getBytes(), G = 0; G < q.length; ++G) {
        var X = e.toDer(r.certificateToAsn1(q[G])).getBytes();
        H === X && (K = q[G], q.splice(G, 1));
      }
      return q.length === 0 && delete i.certs[D.subject.hash], K;
    };
    function n(D) {
      return A(D), i.certs[D.hash] || null;
    }
    function A(D) {
      if (!D.hash) {
        var K = t.md.sha1.create();
        D.attributes = r.RDNAttributesAsArray(g(D), K), D.hash = K.digest().toHex();
      }
    }
    if (h)
      for (var _ = 0; _ < h.length; ++_) {
        var P = h[_];
        i.addCertificate(P);
      }
    return i;
  }, r.certificateError = {
    bad_certificate: "forge.pki.BadCertificate",
    unsupported_certificate: "forge.pki.UnsupportedCertificate",
    certificate_revoked: "forge.pki.CertificateRevoked",
    certificate_expired: "forge.pki.CertificateExpired",
    certificate_unknown: "forge.pki.CertificateUnknown",
    unknown_ca: "forge.pki.UnknownCertificateAuthority"
  }, r.verifyCertificateChain = function(h, i, n) {
    typeof n == "function" && (n = { verify: n }), n = n || {}, i = i.slice(0);
    var A = i.slice(0), _ = n.validityCheckDate;
    typeof _ > "u" && (_ = /* @__PURE__ */ new Date());
    var P = !0, D = null, K = 0;
    do {
      var q = i.shift(), H = null, G = !1;
      if (_ && (_ < q.validity.notBefore || _ > q.validity.notAfter) && (D = {
        message: "Certificate is not valid yet or has expired.",
        error: r.certificateError.certificate_expired,
        notBefore: q.validity.notBefore,
        notAfter: q.validity.notAfter,
        // TODO: we might want to reconsider renaming 'now' to
        // 'validityCheckDate' should this API be changed in the future.
        now: _
      }), D === null) {
        if (H = i[0] || h.getIssuer(q), H === null && q.isIssuer(q) && (G = !0, H = q), H) {
          var X = H;
          t.util.isArray(X) || (X = [X]);
          for (var Z = !1; !Z && X.length > 0; ) {
            H = X.shift();
            try {
              Z = H.verify(q);
            } catch {
            }
          }
          Z || (D = {
            message: "Certificate signature is invalid.",
            error: r.certificateError.bad_certificate
          });
        }
        D === null && (!H || G) && !h.hasCertificate(q) && (D = {
          message: "Certificate is not trusted.",
          error: r.certificateError.unknown_ca
        });
      }
      if (D === null && H && !q.isIssuer(H) && (D = {
        message: "Certificate issuer is invalid.",
        error: r.certificateError.bad_certificate
      }), D === null)
        for (var F = {
          keyUsage: !0,
          basicConstraints: !0
        }, Y = 0; D === null && Y < q.extensions.length; ++Y) {
          var ee = q.extensions[Y];
          ee.critical && !(ee.name in F) && (D = {
            message: "Certificate has an unsupported critical extension.",
            error: r.certificateError.unsupported_certificate
          });
        }
      if (D === null && (!P || i.length === 0 && (!H || G))) {
        var se = q.getExtension("basicConstraints"), fe = q.getExtension("keyUsage");
        if (fe !== null && (!fe.keyCertSign || se === null) && (D = {
          message: "Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",
          error: r.certificateError.bad_certificate
        }), D === null && se === null && (D = {
          message: "Certificate is missing basicConstraints extension and cannot be used as a CA.",
          error: r.certificateError.bad_certificate
        }), D === null && se !== null && !se.cA && (D = {
          message: "Certificate basicConstraints indicates the certificate is not a CA.",
          error: r.certificateError.bad_certificate
        }), D === null && fe !== null && "pathLenConstraint" in se) {
          var oe = K - 1;
          oe > se.pathLenConstraint && (D = {
            message: "Certificate basicConstraints pathLenConstraint violated.",
            error: r.certificateError.bad_certificate
          });
        }
      }
      var J = D === null ? !0 : D.error, $ = n.verify ? n.verify(J, K, A) : J;
      if ($ === !0)
        D = null;
      else
        throw J === !0 && (D = {
          message: "The application rejected the certificate.",
          error: r.certificateError.bad_certificate
        }), ($ || $ === 0) && (typeof $ == "object" && !t.util.isArray($) ? ($.message && (D.message = $.message), $.error && (D.error = $.error)) : typeof $ == "string" && (D.error = $)), D;
      P = !1, ++K;
    } while (i.length > 0);
    return !0;
  }, _r.exports;
}
var Ua;
function gn() {
  if (Ua) return br.exports;
  Ua = 1;
  var t = he();
  ut(), Ot(), St(), pn(), dn(), st(), Wt(), Vt(), pe(), $r();
  var e = t.asn1, r = t.pki, l = br.exports = t.pkcs12 = t.pkcs12 || {}, E = {
    name: "ContentInfo",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    // a ContentInfo
    constructed: !0,
    value: [{
      name: "ContentInfo.contentType",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OID,
      constructed: !1,
      capture: "contentType"
    }, {
      name: "ContentInfo.content",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      constructed: !0,
      captureAsn1: "content"
    }]
  }, v = {
    name: "PFX",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [
      {
        name: "PFX.version",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.INTEGER,
        constructed: !1,
        capture: "version"
      },
      E,
      {
        name: "PFX.macData",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.SEQUENCE,
        constructed: !0,
        optional: !0,
        captureAsn1: "mac",
        value: [{
          name: "PFX.macData.mac",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.SEQUENCE,
          // DigestInfo
          constructed: !0,
          value: [{
            name: "PFX.macData.mac.digestAlgorithm",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.SEQUENCE,
            // DigestAlgorithmIdentifier
            constructed: !0,
            value: [{
              name: "PFX.macData.mac.digestAlgorithm.algorithm",
              tagClass: e.Class.UNIVERSAL,
              type: e.Type.OID,
              constructed: !1,
              capture: "macAlgorithm"
            }, {
              name: "PFX.macData.mac.digestAlgorithm.parameters",
              optional: !0,
              tagClass: e.Class.UNIVERSAL,
              captureAsn1: "macAlgorithmParameters"
            }]
          }, {
            name: "PFX.macData.mac.digest",
            tagClass: e.Class.UNIVERSAL,
            type: e.Type.OCTETSTRING,
            constructed: !1,
            capture: "macDigest"
          }]
        }, {
          name: "PFX.macData.macSalt",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.OCTETSTRING,
          constructed: !1,
          capture: "macSalt"
        }, {
          name: "PFX.macData.iterations",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.INTEGER,
          constructed: !1,
          optional: !0,
          capture: "macIterations"
        }]
      }
    ]
  }, u = {
    name: "SafeBag",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "SafeBag.bagId",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OID,
      constructed: !1,
      capture: "bagId"
    }, {
      name: "SafeBag.bagValue",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      constructed: !0,
      captureAsn1: "bagValue"
    }, {
      name: "SafeBag.bagAttributes",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SET,
      constructed: !0,
      optional: !0,
      capture: "bagAttributes"
    }]
  }, a = {
    name: "Attribute",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "Attribute.attrId",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OID,
      constructed: !1,
      capture: "oid"
    }, {
      name: "Attribute.attrValues",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SET,
      constructed: !0,
      capture: "values"
    }]
  }, p = {
    name: "CertBag",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      name: "CertBag.certId",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OID,
      constructed: !1,
      capture: "certId"
    }, {
      name: "CertBag.certValue",
      tagClass: e.Class.CONTEXT_SPECIFIC,
      constructed: !0,
      /* So far we only support X.509 certificates (which are wrapped in
         an OCTET STRING, hence hard code that here). */
      value: [{
        name: "CertBag.certValue[0]",
        tagClass: e.Class.UNIVERSAL,
        type: e.Class.OCTETSTRING,
        constructed: !1,
        capture: "cert"
      }]
    }]
  };
  function f(C, m, s, d) {
    for (var y = [], B = 0; B < C.length; B++)
      for (var b = 0; b < C[B].safeBags.length; b++) {
        var h = C[B].safeBags[b];
        if (!(d !== void 0 && h.type !== d)) {
          if (m === null) {
            y.push(h);
            continue;
          }
          h.attributes[m] !== void 0 && h.attributes[m].indexOf(s) >= 0 && y.push(h);
        }
      }
    return y;
  }
  l.pkcs12FromAsn1 = function(C, m, s) {
    typeof m == "string" ? (s = m, m = !0) : m === void 0 && (m = !0);
    var d = {}, y = [];
    if (!e.validate(C, v, d, y)) {
      var B = new Error("Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.");
      throw B.errors = B, B;
    }
    var b = {
      version: d.version.charCodeAt(0),
      safeContents: [],
      /**
       * Gets bags with matching attributes.
       *
       * @param filter the attributes to filter by:
       *          [localKeyId] the localKeyId to search for.
       *          [localKeyIdHex] the localKeyId in hex to search for.
       *          [friendlyName] the friendly name to search for.
       *          [bagType] bag type to narrow each attribute search by.
       *
       * @return a map of attribute type to an array of matching bags or, if no
       *           attribute was given but a bag type, the map key will be the
       *           bag type.
       */
      getBags: function(H) {
        var G = {}, X;
        return "localKeyId" in H ? X = H.localKeyId : "localKeyIdHex" in H && (X = t.util.hexToBytes(H.localKeyIdHex)), X === void 0 && !("friendlyName" in H) && "bagType" in H && (G[H.bagType] = f(
          b.safeContents,
          null,
          null,
          H.bagType
        )), X !== void 0 && (G.localKeyId = f(
          b.safeContents,
          "localKeyId",
          X,
          H.bagType
        )), "friendlyName" in H && (G.friendlyName = f(
          b.safeContents,
          "friendlyName",
          H.friendlyName,
          H.bagType
        )), G;
      },
      /**
       * DEPRECATED: use getBags() instead.
       *
       * Get bags with matching friendlyName attribute.
       *
       * @param friendlyName the friendly name to search for.
       * @param [bagType] bag type to narrow search by.
       *
       * @return an array of bags with matching friendlyName attribute.
       */
      getBagsByFriendlyName: function(H, G) {
        return f(
          b.safeContents,
          "friendlyName",
          H,
          G
        );
      },
      /**
       * DEPRECATED: use getBags() instead.
       *
       * Get bags with matching localKeyId attribute.
       *
       * @param localKeyId the localKeyId to search for.
       * @param [bagType] bag type to narrow search by.
       *
       * @return an array of bags with matching localKeyId attribute.
       */
      getBagsByLocalKeyId: function(H, G) {
        return f(
          b.safeContents,
          "localKeyId",
          H,
          G
        );
      }
    };
    if (d.version.charCodeAt(0) !== 3) {
      var B = new Error("PKCS#12 PFX of version other than 3 not supported.");
      throw B.version = d.version.charCodeAt(0), B;
    }
    if (e.derToOid(d.contentType) !== r.oids.data) {
      var B = new Error("Only PKCS#12 PFX in password integrity mode supported.");
      throw B.oid = e.derToOid(d.contentType), B;
    }
    var h = d.content.value[0];
    if (h.tagClass !== e.Class.UNIVERSAL || h.type !== e.Type.OCTETSTRING)
      throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");
    if (h = S(h), d.mac) {
      var i = null, n = 0, A = e.derToOid(d.macAlgorithm);
      switch (A) {
        case r.oids.sha1:
          i = t.md.sha1.create(), n = 20;
          break;
        case r.oids.sha256:
          i = t.md.sha256.create(), n = 32;
          break;
        case r.oids.sha384:
          i = t.md.sha384.create(), n = 48;
          break;
        case r.oids.sha512:
          i = t.md.sha512.create(), n = 64;
          break;
        case r.oids.md5:
          i = t.md.md5.create(), n = 16;
          break;
      }
      if (i === null)
        throw new Error("PKCS#12 uses unsupported MAC algorithm: " + A);
      var _ = new t.util.ByteBuffer(d.macSalt), P = "macIterations" in d ? parseInt(t.util.bytesToHex(d.macIterations), 16) : 1, D = l.generateKey(
        s,
        _,
        3,
        P,
        n,
        i
      ), K = t.hmac.create();
      K.start(i, D), K.update(h.value);
      var q = K.getMac();
      if (q.getBytes() !== d.macDigest)
        throw new Error("PKCS#12 MAC could not be verified. Invalid password?");
    } else if (Array.isArray(C.value) && C.value.length > 2)
      throw new Error("Invalid PKCS#12. macData field present but MAC was not validated.");
    return U(b, h.value, m, s), b;
  };
  function S(C) {
    if (C.composed || C.constructed) {
      for (var m = t.util.createBuffer(), s = 0; s < C.value.length; ++s)
        m.putBytes(C.value[s].value);
      C.composed = C.constructed = !1, C.value = m.getBytes();
    }
    return C;
  }
  function U(C, m, s, d) {
    if (m = e.fromDer(m, s), m.tagClass !== e.Class.UNIVERSAL || m.type !== e.Type.SEQUENCE || m.constructed !== !0)
      throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");
    for (var y = 0; y < m.value.length; y++) {
      var B = m.value[y], b = {}, h = [];
      if (!e.validate(B, E, b, h)) {
        var i = new Error("Cannot read ContentInfo.");
        throw i.errors = h, i;
      }
      var n = {
        encrypted: !1
      }, A = null, _ = b.content.value[0];
      switch (e.derToOid(b.contentType)) {
        case r.oids.data:
          if (_.tagClass !== e.Class.UNIVERSAL || _.type !== e.Type.OCTETSTRING)
            throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");
          A = S(_).value;
          break;
        case r.oids.encryptedData:
          A = T(_, d), n.encrypted = !0;
          break;
        default:
          var i = new Error("Unsupported PKCS#12 contentType.");
          throw i.contentType = e.derToOid(b.contentType), i;
      }
      n.safeBags = c(A, s, d), C.safeContents.push(n);
    }
  }
  function T(C, m) {
    var s = {}, d = [];
    if (!e.validate(
      C,
      t.pkcs7.asn1.encryptedDataValidator,
      s,
      d
    )) {
      var y = new Error("Cannot read EncryptedContentInfo.");
      throw y.errors = d, y;
    }
    var B = e.derToOid(s.contentType);
    if (B !== r.oids.data) {
      var y = new Error(
        "PKCS#12 EncryptedContentInfo ContentType is not Data."
      );
      throw y.oid = B, y;
    }
    B = e.derToOid(s.encAlgorithm);
    var b = r.pbe.getCipher(B, s.encParameter, m), h = S(s.encryptedContentAsn1), i = t.util.createBuffer(h.value);
    if (b.update(i), !b.finish())
      throw new Error("Failed to decrypt PKCS#12 SafeContents.");
    return b.output.getBytes();
  }
  function c(C, m, s) {
    if (!m && C.length === 0)
      return [];
    if (C = e.fromDer(C, m), C.tagClass !== e.Class.UNIVERSAL || C.type !== e.Type.SEQUENCE || C.constructed !== !0)
      throw new Error(
        "PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag."
      );
    for (var d = [], y = 0; y < C.value.length; y++) {
      var B = C.value[y], b = {}, h = [];
      if (!e.validate(B, u, b, h)) {
        var i = new Error("Cannot read SafeBag.");
        throw i.errors = h, i;
      }
      var n = {
        type: e.derToOid(b.bagId),
        attributes: g(b.bagAttributes)
      };
      d.push(n);
      var A, _, P = b.bagValue.value[0];
      switch (n.type) {
        case r.oids.pkcs8ShroudedKeyBag:
          if (P = r.decryptPrivateKeyInfo(P, s), P === null)
            throw new Error(
              "Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?"
            );
        /* fall through */
        case r.oids.keyBag:
          try {
            n.key = r.privateKeyFromAsn1(P);
          } catch {
            n.key = null, n.asn1 = P;
          }
          continue;
        /* Nothing more to do. */
        case r.oids.certBag:
          A = p, _ = function() {
            if (e.derToOid(b.certId) !== r.oids.x509Certificate) {
              var K = new Error(
                "Unsupported certificate type, only X.509 supported."
              );
              throw K.oid = e.derToOid(b.certId), K;
            }
            var q = e.fromDer(b.cert, m);
            try {
              n.cert = r.certificateFromAsn1(q, !0);
            } catch {
              n.cert = null, n.asn1 = q;
            }
          };
          break;
        default:
          var i = new Error("Unsupported PKCS#12 SafeBag type.");
          throw i.oid = n.type, i;
      }
      if (A !== void 0 && !e.validate(P, A, b, h)) {
        var i = new Error("Cannot read PKCS#12 " + A.name);
        throw i.errors = h, i;
      }
      _();
    }
    return d;
  }
  function g(C) {
    var m = {};
    if (C !== void 0)
      for (var s = 0; s < C.length; ++s) {
        var d = {}, y = [];
        if (!e.validate(C[s], a, d, y)) {
          var B = new Error("Cannot read PKCS#12 BagAttribute.");
          throw B.errors = y, B;
        }
        var b = e.derToOid(d.oid);
        if (r.oids[b] !== void 0) {
          m[r.oids[b]] = [];
          for (var h = 0; h < d.values.length; ++h)
            m[r.oids[b]].push(d.values[h].value);
        }
      }
    return m;
  }
  return l.toPkcs12Asn1 = function(C, m, s, d) {
    d = d || {}, d.saltSize = d.saltSize || 8, d.count = d.count || 2048, d.algorithm = d.algorithm || d.encAlgorithm || "aes128", "useMac" in d || (d.useMac = !0), "localKeyId" in d || (d.localKeyId = null), "generateLocalKeyId" in d || (d.generateLocalKeyId = !0);
    var y = d.localKeyId, B;
    if (y !== null)
      y = t.util.hexToBytes(y);
    else if (d.generateLocalKeyId)
      if (m) {
        var b = t.util.isArray(m) ? m[0] : m;
        typeof b == "string" && (b = r.certificateFromPem(b));
        var h = t.md.sha1.create();
        h.update(e.toDer(r.certificateToAsn1(b)).getBytes()), y = h.digest().getBytes();
      } else
        y = t.random.getBytes(20);
    var i = [];
    y !== null && i.push(
      // localKeyID
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // attrId
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(r.oids.localKeyId).getBytes()
        ),
        // attrValues
        e.create(e.Class.UNIVERSAL, e.Type.SET, !0, [
          e.create(
            e.Class.UNIVERSAL,
            e.Type.OCTETSTRING,
            !1,
            y
          )
        ])
      ])
    ), "friendlyName" in d && i.push(
      // friendlyName
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // attrId
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(r.oids.friendlyName).getBytes()
        ),
        // attrValues
        e.create(e.Class.UNIVERSAL, e.Type.SET, !0, [
          e.create(
            e.Class.UNIVERSAL,
            e.Type.BMPSTRING,
            !1,
            d.friendlyName
          )
        ])
      ])
    ), i.length > 0 && (B = e.create(e.Class.UNIVERSAL, e.Type.SET, !0, i));
    var n = [], A = [];
    m !== null && (t.util.isArray(m) ? A = m : A = [m]);
    for (var _ = [], P = 0; P < A.length; ++P) {
      m = A[P], typeof m == "string" && (m = r.certificateFromPem(m));
      var D = P === 0 ? B : void 0, K = r.certificateToAsn1(m), q = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // bagId
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(r.oids.certBag).getBytes()
        ),
        // bagValue
        e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
          // CertBag
          e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
            // certId
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OID,
              !1,
              e.oidToDer(r.oids.x509Certificate).getBytes()
            ),
            // certValue (x509Certificate)
            e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
              e.create(
                e.Class.UNIVERSAL,
                e.Type.OCTETSTRING,
                !1,
                e.toDer(K).getBytes()
              )
            ])
          ])
        ]),
        // bagAttributes (OPTIONAL)
        D
      ]);
      _.push(q);
    }
    if (_.length > 0) {
      var H = e.create(
        e.Class.UNIVERSAL,
        e.Type.SEQUENCE,
        !0,
        _
      ), G = (
        // PKCS#7 ContentInfo
        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
          // contentType
          e.create(
            e.Class.UNIVERSAL,
            e.Type.OID,
            !1,
            // OID for the content type is 'data'
            e.oidToDer(r.oids.data).getBytes()
          ),
          // content
          e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OCTETSTRING,
              !1,
              e.toDer(H).getBytes()
            )
          ])
        ])
      );
      n.push(G);
    }
    var X = null;
    if (C !== null) {
      var Z = r.wrapRsaPrivateKey(r.privateKeyToAsn1(C));
      s === null ? X = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // bagId
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(r.oids.keyBag).getBytes()
        ),
        // bagValue
        e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
          // PrivateKeyInfo
          Z
        ]),
        // bagAttributes (OPTIONAL)
        B
      ]) : X = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // bagId
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(r.oids.pkcs8ShroudedKeyBag).getBytes()
        ),
        // bagValue
        e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
          // EncryptedPrivateKeyInfo
          r.encryptPrivateKeyInfo(Z, s, d)
        ]),
        // bagAttributes (OPTIONAL)
        B
      ]);
      var F = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [X]), Y = (
        // PKCS#7 ContentInfo
        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
          // contentType
          e.create(
            e.Class.UNIVERSAL,
            e.Type.OID,
            !1,
            // OID for the content type is 'data'
            e.oidToDer(r.oids.data).getBytes()
          ),
          // content
          e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OCTETSTRING,
              !1,
              e.toDer(F).getBytes()
            )
          ])
        ])
      );
      n.push(Y);
    }
    var ee = e.create(
      e.Class.UNIVERSAL,
      e.Type.SEQUENCE,
      !0,
      n
    ), se;
    if (d.useMac) {
      var h = t.md.sha1.create(), fe = new t.util.ByteBuffer(
        t.random.getBytes(d.saltSize)
      ), oe = d.count, C = l.generateKey(s, fe, 3, oe, 20), J = t.hmac.create();
      J.start(h, C), J.update(e.toDer(ee).getBytes());
      var $ = J.getMac();
      se = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // mac DigestInfo
        e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
          // digestAlgorithm
          e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
            // algorithm = SHA-1
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OID,
              !1,
              e.oidToDer(r.oids.sha1).getBytes()
            ),
            // parameters = Null
            e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, "")
          ]),
          // digest
          e.create(
            e.Class.UNIVERSAL,
            e.Type.OCTETSTRING,
            !1,
            $.getBytes()
          )
        ]),
        // macSalt OCTET STRING
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OCTETSTRING,
          !1,
          fe.getBytes()
        ),
        // iterations INTEGER (XXX: Only support count < 65536)
        e.create(
          e.Class.UNIVERSAL,
          e.Type.INTEGER,
          !1,
          e.integerToDer(oe).getBytes()
        )
      ]);
    }
    return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // version (3)
      e.create(
        e.Class.UNIVERSAL,
        e.Type.INTEGER,
        !1,
        e.integerToDer(3).getBytes()
      ),
      // PKCS#7 ContentInfo
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // contentType
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          // OID for the content type is 'data'
          e.oidToDer(r.oids.data).getBytes()
        ),
        // content
        e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
          e.create(
            e.Class.UNIVERSAL,
            e.Type.OCTETSTRING,
            !1,
            e.toDer(ee).getBytes()
          )
        ])
      ]),
      se
    ]);
  }, l.generateKey = t.pbe.generatePkcs12Key, br.exports;
}
var Pa;
function vn() {
  if (Pa) return yr.exports;
  Pa = 1;
  var t = he();
  ut(), St(), dn(), wt(), Zr(), gn(), Jr(), Wt(), pe(), $r();
  var e = t.asn1, r = yr.exports = t.pki = t.pki || {};
  return r.pemToDer = function(l) {
    var E = t.pem.decode(l)[0];
    if (E.procType && E.procType.type === "ENCRYPTED")
      throw new Error("Could not convert PEM to DER; PEM is encrypted.");
    return t.util.createBuffer(E.body);
  }, r.privateKeyFromPem = function(l) {
    var E = t.pem.decode(l)[0];
    if (E.type !== "PRIVATE KEY" && E.type !== "RSA PRIVATE KEY") {
      var v = new Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');
      throw v.headerType = E.type, v;
    }
    if (E.procType && E.procType.type === "ENCRYPTED")
      throw new Error("Could not convert private key from PEM; PEM is encrypted.");
    var u = e.fromDer(E.body);
    return r.privateKeyFromAsn1(u);
  }, r.privateKeyToPem = function(l, E) {
    var v = {
      type: "RSA PRIVATE KEY",
      body: e.toDer(r.privateKeyToAsn1(l)).getBytes()
    };
    return t.pem.encode(v, { maxline: E });
  }, r.privateKeyInfoToPem = function(l, E) {
    var v = {
      type: "PRIVATE KEY",
      body: e.toDer(l).getBytes()
    };
    return t.pem.encode(v, { maxline: E });
  }, yr.exports;
}
var Lr, Oa;
function mn() {
  if (Oa) return Lr;
  Oa = 1;
  var t = he();
  ut(), Ot(), jr(), wt(), vn(), st(), Vt(), pe();
  var e = function(x, k, L, R) {
    var o = t.util.createBuffer(), w = x.length >> 1, V = w + (x.length & 1), z = x.substr(0, V), ie = x.substr(w, V), ae = t.util.createBuffer(), Q = t.hmac.create();
    L = k + L;
    var te = Math.ceil(R / 16), ue = Math.ceil(R / 20);
    Q.start("MD5", z);
    var de = t.util.createBuffer();
    ae.putBytes(L);
    for (var ce = 0; ce < te; ++ce)
      Q.start(null, null), Q.update(ae.getBytes()), ae.putBuffer(Q.digest()), Q.start(null, null), Q.update(ae.bytes() + L), de.putBuffer(Q.digest());
    Q.start("SHA1", ie);
    var Se = t.util.createBuffer();
    ae.clear(), ae.putBytes(L);
    for (var ce = 0; ce < ue; ++ce)
      Q.start(null, null), Q.update(ae.getBytes()), ae.putBuffer(Q.digest()), Q.start(null, null), Q.update(ae.bytes() + L), Se.putBuffer(Q.digest());
    return o.putBytes(t.util.xorBytes(
      de.getBytes(),
      Se.getBytes(),
      R
    )), o;
  }, r = function(x, k, L) {
    var R = t.hmac.create();
    R.start("SHA1", x);
    var o = t.util.createBuffer();
    return o.putInt32(k[0]), o.putInt32(k[1]), o.putByte(L.type), o.putByte(L.version.major), o.putByte(L.version.minor), o.putInt16(L.length), o.putBytes(L.fragment.bytes()), R.update(o.getBytes()), R.digest().getBytes();
  }, l = function(x, k, L) {
    var R = !1;
    try {
      var o = x.deflate(k.fragment.getBytes());
      k.fragment = t.util.createBuffer(o), k.length = o.length, R = !0;
    } catch {
    }
    return R;
  }, E = function(x, k, L) {
    var R = !1;
    try {
      var o = x.inflate(k.fragment.getBytes());
      k.fragment = t.util.createBuffer(o), k.length = o.length, R = !0;
    } catch {
    }
    return R;
  }, v = function(x, k) {
    var L = 0;
    switch (k) {
      case 1:
        L = x.getByte();
        break;
      case 2:
        L = x.getInt16();
        break;
      case 3:
        L = x.getInt24();
        break;
      case 4:
        L = x.getInt32();
        break;
    }
    return t.util.createBuffer(x.getBytes(L));
  }, u = function(x, k, L) {
    x.putInt(L.length(), k << 3), x.putBuffer(L);
  }, a = {};
  a.Versions = {
    TLS_1_0: { major: 3, minor: 1 },
    TLS_1_1: { major: 3, minor: 2 },
    TLS_1_2: { major: 3, minor: 3 }
  }, a.SupportedVersions = [
    a.Versions.TLS_1_1,
    a.Versions.TLS_1_0
  ], a.Version = a.SupportedVersions[0], a.MaxFragment = 15360, a.ConnectionEnd = {
    server: 0,
    client: 1
  }, a.PRFAlgorithm = {
    tls_prf_sha256: 0
  }, a.BulkCipherAlgorithm = {
    none: null,
    rc4: 0,
    des3: 1,
    aes: 2
  }, a.CipherType = {
    stream: 0,
    block: 1,
    aead: 2
  }, a.MACAlgorithm = {
    none: null,
    hmac_md5: 0,
    hmac_sha1: 1,
    hmac_sha256: 2,
    hmac_sha384: 3,
    hmac_sha512: 4
  }, a.CompressionMethod = {
    none: 0,
    deflate: 1
  }, a.ContentType = {
    change_cipher_spec: 20,
    alert: 21,
    handshake: 22,
    application_data: 23,
    heartbeat: 24
  }, a.HandshakeType = {
    hello_request: 0,
    client_hello: 1,
    server_hello: 2,
    certificate: 11,
    server_key_exchange: 12,
    certificate_request: 13,
    server_hello_done: 14,
    certificate_verify: 15,
    client_key_exchange: 16,
    finished: 20
  }, a.Alert = {}, a.Alert.Level = {
    warning: 1,
    fatal: 2
  }, a.Alert.Description = {
    close_notify: 0,
    unexpected_message: 10,
    bad_record_mac: 20,
    decryption_failed: 21,
    record_overflow: 22,
    decompression_failure: 30,
    handshake_failure: 40,
    bad_certificate: 42,
    unsupported_certificate: 43,
    certificate_revoked: 44,
    certificate_expired: 45,
    certificate_unknown: 46,
    illegal_parameter: 47,
    unknown_ca: 48,
    access_denied: 49,
    decode_error: 50,
    decrypt_error: 51,
    export_restriction: 60,
    protocol_version: 70,
    insufficient_security: 71,
    internal_error: 80,
    user_canceled: 90,
    no_renegotiation: 100
  }, a.HeartbeatMessageType = {
    heartbeat_request: 1,
    heartbeat_response: 2
  }, a.CipherSuites = {}, a.getCipherSuite = function(x) {
    var k = null;
    for (var L in a.CipherSuites) {
      var R = a.CipherSuites[L];
      if (R.id[0] === x.charCodeAt(0) && R.id[1] === x.charCodeAt(1)) {
        k = R;
        break;
      }
    }
    return k;
  }, a.handleUnexpected = function(x, k) {
    var L = !x.open && x.entity === a.ConnectionEnd.client;
    L || x.error(x, {
      message: "Unexpected message. Received TLS record out of order.",
      send: !0,
      alert: {
        level: a.Alert.Level.fatal,
        description: a.Alert.Description.unexpected_message
      }
    });
  }, a.handleHelloRequest = function(x, k, L) {
    !x.handshaking && x.handshakes > 0 && (a.queue(x, a.createAlert(x, {
      level: a.Alert.Level.warning,
      description: a.Alert.Description.no_renegotiation
    })), a.flush(x)), x.process();
  }, a.parseHelloMessage = function(x, k, L) {
    var R = null, o = x.entity === a.ConnectionEnd.client;
    if (L < 38)
      x.error(x, {
        message: o ? "Invalid ServerHello message. Message too short." : "Invalid ClientHello message. Message too short.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.illegal_parameter
        }
      });
    else {
      var w = k.fragment, V = w.length();
      if (R = {
        version: {
          major: w.getByte(),
          minor: w.getByte()
        },
        random: t.util.createBuffer(w.getBytes(32)),
        session_id: v(w, 1),
        extensions: []
      }, o ? (R.cipher_suite = w.getBytes(2), R.compression_method = w.getByte()) : (R.cipher_suites = v(w, 2), R.compression_methods = v(w, 1)), V = L - (V - w.length()), V > 0) {
        for (var z = v(w, 2); z.length() > 0; )
          R.extensions.push({
            type: [z.getByte(), z.getByte()],
            data: v(z, 2)
          });
        if (!o)
          for (var ie = 0; ie < R.extensions.length; ++ie) {
            var ae = R.extensions[ie];
            if (ae.type[0] === 0 && ae.type[1] === 0)
              for (var Q = v(ae.data, 2); Q.length() > 0; ) {
                var te = Q.getByte();
                if (te !== 0)
                  break;
                x.session.extensions.server_name.serverNameList.push(
                  v(Q, 2).getBytes()
                );
              }
          }
      }
      if (x.session.version && (R.version.major !== x.session.version.major || R.version.minor !== x.session.version.minor))
        return x.error(x, {
          message: "TLS version change is disallowed during renegotiation.",
          send: !0,
          alert: {
            level: a.Alert.Level.fatal,
            description: a.Alert.Description.protocol_version
          }
        });
      if (o)
        x.session.cipherSuite = a.getCipherSuite(R.cipher_suite);
      else
        for (var ue = t.util.createBuffer(R.cipher_suites.bytes()); ue.length() > 0 && (x.session.cipherSuite = a.getCipherSuite(ue.getBytes(2)), x.session.cipherSuite === null); )
          ;
      if (x.session.cipherSuite === null)
        return x.error(x, {
          message: "No cipher suites in common.",
          send: !0,
          alert: {
            level: a.Alert.Level.fatal,
            description: a.Alert.Description.handshake_failure
          },
          cipherSuite: t.util.bytesToHex(R.cipher_suite)
        });
      o ? x.session.compressionMethod = R.compression_method : x.session.compressionMethod = a.CompressionMethod.none;
    }
    return R;
  }, a.createSecurityParameters = function(x, k) {
    var L = x.entity === a.ConnectionEnd.client, R = k.random.bytes(), o = L ? x.session.sp.client_random : R, w = L ? R : a.createRandom().getBytes();
    x.session.sp = {
      entity: x.entity,
      prf_algorithm: a.PRFAlgorithm.tls_prf_sha256,
      bulk_cipher_algorithm: null,
      cipher_type: null,
      enc_key_length: null,
      block_length: null,
      fixed_iv_length: null,
      record_iv_length: null,
      mac_algorithm: null,
      mac_length: null,
      mac_key_length: null,
      compression_algorithm: x.session.compressionMethod,
      pre_master_secret: null,
      master_secret: null,
      client_random: o,
      server_random: w
    };
  }, a.handleServerHello = function(x, k, L) {
    var R = a.parseHelloMessage(x, k, L);
    if (!x.fail) {
      if (R.version.minor <= x.version.minor)
        x.version.minor = R.version.minor;
      else
        return x.error(x, {
          message: "Incompatible TLS version.",
          send: !0,
          alert: {
            level: a.Alert.Level.fatal,
            description: a.Alert.Description.protocol_version
          }
        });
      x.session.version = x.version;
      var o = R.session_id.bytes();
      o.length > 0 && o === x.session.id ? (x.expect = c, x.session.resuming = !0, x.session.sp.server_random = R.random.bytes()) : (x.expect = f, x.session.resuming = !1, a.createSecurityParameters(x, R)), x.session.id = o, x.process();
    }
  }, a.handleClientHello = function(x, k, L) {
    var R = a.parseHelloMessage(x, k, L);
    if (!x.fail) {
      var o = R.session_id.bytes(), w = null;
      if (x.sessionCache && (w = x.sessionCache.getSession(o), w === null ? o = "" : (w.version.major !== R.version.major || w.version.minor > R.version.minor) && (w = null, o = "")), o.length === 0 && (o = t.random.getBytes(32)), x.session.id = o, x.session.clientHelloVersion = R.version, x.session.sp = {}, w)
        x.version = x.session.version = w.version, x.session.sp = w.sp;
      else {
        for (var V, z = 1; z < a.SupportedVersions.length && (V = a.SupportedVersions[z], !(V.minor <= R.version.minor)); ++z)
          ;
        x.version = { major: V.major, minor: V.minor }, x.session.version = x.version;
      }
      w !== null ? (x.expect = b, x.session.resuming = !0, x.session.sp.client_random = R.random.bytes()) : (x.expect = x.verifyClient !== !1 ? d : y, x.session.resuming = !1, a.createSecurityParameters(x, R)), x.open = !0, a.queue(x, a.createRecord(x, {
        type: a.ContentType.handshake,
        data: a.createServerHello(x)
      })), x.session.resuming ? (a.queue(x, a.createRecord(x, {
        type: a.ContentType.change_cipher_spec,
        data: a.createChangeCipherSpec()
      })), x.state.pending = a.createConnectionState(x), x.state.current.write = x.state.pending.write, a.queue(x, a.createRecord(x, {
        type: a.ContentType.handshake,
        data: a.createFinished(x)
      }))) : (a.queue(x, a.createRecord(x, {
        type: a.ContentType.handshake,
        data: a.createCertificate(x)
      })), x.fail || (a.queue(x, a.createRecord(x, {
        type: a.ContentType.handshake,
        data: a.createServerKeyExchange(x)
      })), x.verifyClient !== !1 && a.queue(x, a.createRecord(x, {
        type: a.ContentType.handshake,
        data: a.createCertificateRequest(x)
      })), a.queue(x, a.createRecord(x, {
        type: a.ContentType.handshake,
        data: a.createServerHelloDone(x)
      })))), a.flush(x), x.process();
    }
  }, a.handleCertificate = function(x, k, L) {
    if (L < 3)
      return x.error(x, {
        message: "Invalid Certificate message. Message too short.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.illegal_parameter
        }
      });
    var R = k.fragment, o = {
      certificate_list: v(R, 3)
    }, w, V, z = [];
    try {
      for (; o.certificate_list.length() > 0; )
        w = v(o.certificate_list, 3), V = t.asn1.fromDer(w), w = t.pki.certificateFromAsn1(V, !0), z.push(w);
    } catch (ae) {
      return x.error(x, {
        message: "Could not parse certificate list.",
        cause: ae,
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.bad_certificate
        }
      });
    }
    var ie = x.entity === a.ConnectionEnd.client;
    (ie || x.verifyClient === !0) && z.length === 0 ? x.error(x, {
      message: ie ? "No server certificate provided." : "No client certificate provided.",
      send: !0,
      alert: {
        level: a.Alert.Level.fatal,
        description: a.Alert.Description.illegal_parameter
      }
    }) : z.length === 0 ? x.expect = ie ? S : y : (ie ? x.session.serverCertificate = z[0] : x.session.clientCertificate = z[0], a.verifyCertificateChain(x, z) && (x.expect = ie ? S : y)), x.process();
  }, a.handleServerKeyExchange = function(x, k, L) {
    if (L > 0)
      return x.error(x, {
        message: "Invalid key parameters. Only RSA is supported.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.unsupported_certificate
        }
      });
    x.expect = U, x.process();
  }, a.handleClientKeyExchange = function(x, k, L) {
    if (L < 48)
      return x.error(x, {
        message: "Invalid key parameters. Only RSA is supported.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.unsupported_certificate
        }
      });
    var R = k.fragment, o = {
      enc_pre_master_secret: v(R, 2).getBytes()
    }, w = null;
    if (x.getPrivateKey)
      try {
        w = x.getPrivateKey(x, x.session.serverCertificate), w = t.pki.privateKeyFromPem(w);
      } catch (ie) {
        x.error(x, {
          message: "Could not get private key.",
          cause: ie,
          send: !0,
          alert: {
            level: a.Alert.Level.fatal,
            description: a.Alert.Description.internal_error
          }
        });
      }
    if (w === null)
      return x.error(x, {
        message: "No private key set.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.internal_error
        }
      });
    try {
      var V = x.session.sp;
      V.pre_master_secret = w.decrypt(o.enc_pre_master_secret);
      var z = x.session.clientHelloVersion;
      if (z.major !== V.pre_master_secret.charCodeAt(0) || z.minor !== V.pre_master_secret.charCodeAt(1))
        throw new Error("TLS version rollback attack detected.");
    } catch {
      V.pre_master_secret = t.random.getBytes(48);
    }
    x.expect = b, x.session.clientCertificate !== null && (x.expect = B), x.process();
  }, a.handleCertificateRequest = function(x, k, L) {
    if (L < 3)
      return x.error(x, {
        message: "Invalid CertificateRequest. Message too short.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.illegal_parameter
        }
      });
    var R = k.fragment, o = {
      certificate_types: v(R, 1),
      certificate_authorities: v(R, 2)
    };
    x.session.certificateRequest = o, x.expect = T, x.process();
  }, a.handleCertificateVerify = function(x, k, L) {
    if (L < 2)
      return x.error(x, {
        message: "Invalid CertificateVerify. Message too short.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.illegal_parameter
        }
      });
    var R = k.fragment;
    R.read -= 4;
    var o = R.bytes();
    R.read += 4;
    var w = {
      signature: v(R, 2).getBytes()
    }, V = t.util.createBuffer();
    V.putBuffer(x.session.md5.digest()), V.putBuffer(x.session.sha1.digest()), V = V.getBytes();
    try {
      var z = x.session.clientCertificate;
      if (!z.publicKey.verify(V, w.signature, "NONE"))
        throw new Error("CertificateVerify signature does not match.");
      x.session.md5.update(o), x.session.sha1.update(o);
    } catch {
      return x.error(x, {
        message: "Bad signature in CertificateVerify.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.handshake_failure
        }
      });
    }
    x.expect = b, x.process();
  }, a.handleServerHelloDone = function(x, k, L) {
    if (L > 0)
      return x.error(x, {
        message: "Invalid ServerHelloDone message. Invalid length.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.record_overflow
        }
      });
    if (x.serverCertificate === null) {
      var R = {
        message: "No server certificate provided. Not enough security.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.insufficient_security
        }
      }, o = 0, w = x.verify(x, R.alert.description, o, []);
      if (w !== !0)
        return (w || w === 0) && (typeof w == "object" && !t.util.isArray(w) ? (w.message && (R.message = w.message), w.alert && (R.alert.description = w.alert)) : typeof w == "number" && (R.alert.description = w)), x.error(x, R);
    }
    x.session.certificateRequest !== null && (k = a.createRecord(x, {
      type: a.ContentType.handshake,
      data: a.createCertificate(x)
    }), a.queue(x, k)), k = a.createRecord(x, {
      type: a.ContentType.handshake,
      data: a.createClientKeyExchange(x)
    }), a.queue(x, k), x.expect = m;
    var V = function(z, ie) {
      z.session.certificateRequest !== null && z.session.clientCertificate !== null && a.queue(z, a.createRecord(z, {
        type: a.ContentType.handshake,
        data: a.createCertificateVerify(z, ie)
      })), a.queue(z, a.createRecord(z, {
        type: a.ContentType.change_cipher_spec,
        data: a.createChangeCipherSpec()
      })), z.state.pending = a.createConnectionState(z), z.state.current.write = z.state.pending.write, a.queue(z, a.createRecord(z, {
        type: a.ContentType.handshake,
        data: a.createFinished(z)
      })), z.expect = c, a.flush(z), z.process();
    };
    if (x.session.certificateRequest === null || x.session.clientCertificate === null)
      return V(x, null);
    a.getClientSignature(x, V);
  }, a.handleChangeCipherSpec = function(x, k) {
    if (k.fragment.getByte() !== 1)
      return x.error(x, {
        message: "Invalid ChangeCipherSpec message received.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.illegal_parameter
        }
      });
    var L = x.entity === a.ConnectionEnd.client;
    (x.session.resuming && L || !x.session.resuming && !L) && (x.state.pending = a.createConnectionState(x)), x.state.current.read = x.state.pending.read, (!x.session.resuming && L || x.session.resuming && !L) && (x.state.pending = null), x.expect = L ? g : h, x.process();
  }, a.handleFinished = function(x, k, L) {
    var R = k.fragment;
    R.read -= 4;
    var o = R.bytes();
    R.read += 4;
    var w = k.fragment.getBytes();
    R = t.util.createBuffer(), R.putBuffer(x.session.md5.digest()), R.putBuffer(x.session.sha1.digest());
    var V = x.entity === a.ConnectionEnd.client, z = V ? "server finished" : "client finished", ie = x.session.sp, ae = 12, Q = e;
    if (R = Q(ie.master_secret, z, R.getBytes(), ae), R.getBytes() !== w)
      return x.error(x, {
        message: "Invalid verify_data in Finished message.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.decrypt_error
        }
      });
    x.session.md5.update(o), x.session.sha1.update(o), (x.session.resuming && V || !x.session.resuming && !V) && (a.queue(x, a.createRecord(x, {
      type: a.ContentType.change_cipher_spec,
      data: a.createChangeCipherSpec()
    })), x.state.current.write = x.state.pending.write, x.state.pending = null, a.queue(x, a.createRecord(x, {
      type: a.ContentType.handshake,
      data: a.createFinished(x)
    }))), x.expect = V ? C : i, x.handshaking = !1, ++x.handshakes, x.peerCertificate = V ? x.session.serverCertificate : x.session.clientCertificate, a.flush(x), x.isConnected = !0, x.connected(x), x.process();
  }, a.handleAlert = function(x, k) {
    var L = k.fragment, R = {
      level: L.getByte(),
      description: L.getByte()
    }, o;
    switch (R.description) {
      case a.Alert.Description.close_notify:
        o = "Connection closed.";
        break;
      case a.Alert.Description.unexpected_message:
        o = "Unexpected message.";
        break;
      case a.Alert.Description.bad_record_mac:
        o = "Bad record MAC.";
        break;
      case a.Alert.Description.decryption_failed:
        o = "Decryption failed.";
        break;
      case a.Alert.Description.record_overflow:
        o = "Record overflow.";
        break;
      case a.Alert.Description.decompression_failure:
        o = "Decompression failed.";
        break;
      case a.Alert.Description.handshake_failure:
        o = "Handshake failure.";
        break;
      case a.Alert.Description.bad_certificate:
        o = "Bad certificate.";
        break;
      case a.Alert.Description.unsupported_certificate:
        o = "Unsupported certificate.";
        break;
      case a.Alert.Description.certificate_revoked:
        o = "Certificate revoked.";
        break;
      case a.Alert.Description.certificate_expired:
        o = "Certificate expired.";
        break;
      case a.Alert.Description.certificate_unknown:
        o = "Certificate unknown.";
        break;
      case a.Alert.Description.illegal_parameter:
        o = "Illegal parameter.";
        break;
      case a.Alert.Description.unknown_ca:
        o = "Unknown certificate authority.";
        break;
      case a.Alert.Description.access_denied:
        o = "Access denied.";
        break;
      case a.Alert.Description.decode_error:
        o = "Decode error.";
        break;
      case a.Alert.Description.decrypt_error:
        o = "Decrypt error.";
        break;
      case a.Alert.Description.export_restriction:
        o = "Export restriction.";
        break;
      case a.Alert.Description.protocol_version:
        o = "Unsupported protocol version.";
        break;
      case a.Alert.Description.insufficient_security:
        o = "Insufficient security.";
        break;
      case a.Alert.Description.internal_error:
        o = "Internal error.";
        break;
      case a.Alert.Description.user_canceled:
        o = "User canceled.";
        break;
      case a.Alert.Description.no_renegotiation:
        o = "Renegotiation not supported.";
        break;
      default:
        o = "Unknown error.";
        break;
    }
    if (R.description === a.Alert.Description.close_notify)
      return x.close();
    x.error(x, {
      message: o,
      send: !1,
      // origin is the opposite end
      origin: x.entity === a.ConnectionEnd.client ? "server" : "client",
      alert: R
    }), x.process();
  }, a.handleHandshake = function(x, k) {
    var L = k.fragment, R = L.getByte(), o = L.getInt24();
    if (o > L.length())
      return x.fragmented = k, k.fragment = t.util.createBuffer(), L.read -= 4, x.process();
    x.fragmented = null, L.read -= 4;
    var w = L.bytes(o + 4);
    L.read += 4, R in se[x.entity][x.expect] ? (x.entity === a.ConnectionEnd.server && !x.open && !x.fail && (x.handshaking = !0, x.session = {
      version: null,
      extensions: {
        server_name: {
          serverNameList: []
        }
      },
      cipherSuite: null,
      compressionMethod: null,
      serverCertificate: null,
      clientCertificate: null,
      md5: t.md.md5.create(),
      sha1: t.md.sha1.create()
    }), R !== a.HandshakeType.hello_request && R !== a.HandshakeType.certificate_verify && R !== a.HandshakeType.finished && (x.session.md5.update(w), x.session.sha1.update(w)), se[x.entity][x.expect][R](x, k, o)) : a.handleUnexpected(x, k);
  }, a.handleApplicationData = function(x, k) {
    x.data.putBuffer(k.fragment), x.dataReady(x), x.process();
  }, a.handleHeartbeat = function(x, k) {
    var L = k.fragment, R = L.getByte(), o = L.getInt16(), w = L.getBytes(o);
    if (R === a.HeartbeatMessageType.heartbeat_request) {
      if (x.handshaking || o > w.length)
        return x.process();
      a.queue(x, a.createRecord(x, {
        type: a.ContentType.heartbeat,
        data: a.createHeartbeat(
          a.HeartbeatMessageType.heartbeat_response,
          w
        )
      })), a.flush(x);
    } else if (R === a.HeartbeatMessageType.heartbeat_response) {
      if (w !== x.expectedHeartbeatPayload)
        return x.process();
      x.heartbeatReceived && x.heartbeatReceived(x, t.util.createBuffer(w));
    }
    x.process();
  };
  var p = 0, f = 1, S = 2, U = 3, T = 4, c = 5, g = 6, C = 7, m = 8, s = 0, d = 1, y = 2, B = 3, b = 4, h = 5, i = 6, n = a.handleUnexpected, A = a.handleChangeCipherSpec, _ = a.handleAlert, P = a.handleHandshake, D = a.handleApplicationData, K = a.handleHeartbeat, q = [];
  q[a.ConnectionEnd.client] = [
    //      CC,AL,HS,AD,HB
    /*SHE*/
    [n, _, P, n, K],
    /*SCE*/
    [n, _, P, n, K],
    /*SKE*/
    [n, _, P, n, K],
    /*SCR*/
    [n, _, P, n, K],
    /*SHD*/
    [n, _, P, n, K],
    /*SCC*/
    [A, _, n, n, K],
    /*SFI*/
    [n, _, P, n, K],
    /*SAD*/
    [n, _, P, D, K],
    /*SER*/
    [n, _, P, n, K]
  ], q[a.ConnectionEnd.server] = [
    //      CC,AL,HS,AD
    /*CHE*/
    [n, _, P, n, K],
    /*CCE*/
    [n, _, P, n, K],
    /*CKE*/
    [n, _, P, n, K],
    /*CCV*/
    [n, _, P, n, K],
    /*CCC*/
    [A, _, n, n, K],
    /*CFI*/
    [n, _, P, n, K],
    /*CAD*/
    [n, _, P, D, K],
    /*CER*/
    [n, _, P, n, K]
  ];
  var H = a.handleHelloRequest, G = a.handleServerHello, X = a.handleCertificate, Z = a.handleServerKeyExchange, F = a.handleCertificateRequest, Y = a.handleServerHelloDone, ee = a.handleFinished, se = [];
  se[a.ConnectionEnd.client] = [
    //      HR,01,SH,03,04,05,06,07,08,09,10,SC,SK,CR,HD,15,CK,17,18,19,FI
    /*SHE*/
    [n, n, G, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    /*SCE*/
    [H, n, n, n, n, n, n, n, n, n, n, X, Z, F, Y, n, n, n, n, n, n],
    /*SKE*/
    [H, n, n, n, n, n, n, n, n, n, n, n, Z, F, Y, n, n, n, n, n, n],
    /*SCR*/
    [H, n, n, n, n, n, n, n, n, n, n, n, n, F, Y, n, n, n, n, n, n],
    /*SHD*/
    [H, n, n, n, n, n, n, n, n, n, n, n, n, n, Y, n, n, n, n, n, n],
    /*SCC*/
    [H, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    /*SFI*/
    [H, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, ee],
    /*SAD*/
    [H, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    /*SER*/
    [H, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n]
  ];
  var fe = a.handleClientHello, oe = a.handleClientKeyExchange, J = a.handleCertificateVerify;
  se[a.ConnectionEnd.server] = [
    //      01,CH,02,03,04,05,06,07,08,09,10,CC,12,13,14,CV,CK,17,18,19,FI
    /*CHE*/
    [n, fe, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    /*CCE*/
    [n, n, n, n, n, n, n, n, n, n, n, X, n, n, n, n, n, n, n, n, n],
    /*CKE*/
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, oe, n, n, n, n],
    /*CCV*/
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, J, n, n, n, n, n],
    /*CCC*/
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    /*CFI*/
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, ee],
    /*CAD*/
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n],
    /*CER*/
    [n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n, n]
  ], a.generateKeys = function(x, k) {
    var L = e, R = k.client_random + k.server_random;
    x.session.resuming || (k.master_secret = L(
      k.pre_master_secret,
      "master secret",
      R,
      48
    ).bytes(), k.pre_master_secret = null), R = k.server_random + k.client_random;
    var o = 2 * k.mac_key_length + 2 * k.enc_key_length, w = x.version.major === a.Versions.TLS_1_0.major && x.version.minor === a.Versions.TLS_1_0.minor;
    w && (o += 2 * k.fixed_iv_length);
    var V = L(k.master_secret, "key expansion", R, o), z = {
      client_write_MAC_key: V.getBytes(k.mac_key_length),
      server_write_MAC_key: V.getBytes(k.mac_key_length),
      client_write_key: V.getBytes(k.enc_key_length),
      server_write_key: V.getBytes(k.enc_key_length)
    };
    return w && (z.client_write_IV = V.getBytes(k.fixed_iv_length), z.server_write_IV = V.getBytes(k.fixed_iv_length)), z;
  }, a.createConnectionState = function(x) {
    var k = x.entity === a.ConnectionEnd.client, L = function() {
      var w = {
        // two 32-bit numbers, first is most significant
        sequenceNumber: [0, 0],
        macKey: null,
        macLength: 0,
        macFunction: null,
        cipherState: null,
        cipherFunction: function(V) {
          return !0;
        },
        compressionState: null,
        compressFunction: function(V) {
          return !0;
        },
        updateSequenceNumber: function() {
          w.sequenceNumber[1] === 4294967295 ? (w.sequenceNumber[1] = 0, ++w.sequenceNumber[0]) : ++w.sequenceNumber[1];
        }
      };
      return w;
    }, R = {
      read: L(),
      write: L()
    };
    if (R.read.update = function(w, V) {
      return R.read.cipherFunction(V, R.read) ? R.read.compressFunction(w, V, R.read) || w.error(w, {
        message: "Could not decompress record.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.decompression_failure
        }
      }) : w.error(w, {
        message: "Could not decrypt record or bad MAC.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          // doesn't matter if decryption failed or MAC was
          // invalid, return the same error so as not to reveal
          // which one occurred
          description: a.Alert.Description.bad_record_mac
        }
      }), !w.fail;
    }, R.write.update = function(w, V) {
      return R.write.compressFunction(w, V, R.write) ? R.write.cipherFunction(V, R.write) || w.error(w, {
        message: "Could not encrypt record.",
        send: !1,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.internal_error
        }
      }) : w.error(w, {
        message: "Could not compress record.",
        send: !1,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.internal_error
        }
      }), !w.fail;
    }, x.session) {
      var o = x.session.sp;
      switch (x.session.cipherSuite.initSecurityParameters(o), o.keys = a.generateKeys(x, o), R.read.macKey = k ? o.keys.server_write_MAC_key : o.keys.client_write_MAC_key, R.write.macKey = k ? o.keys.client_write_MAC_key : o.keys.server_write_MAC_key, x.session.cipherSuite.initConnectionState(R, x, o), o.compression_algorithm) {
        case a.CompressionMethod.none:
          break;
        case a.CompressionMethod.deflate:
          R.read.compressFunction = E, R.write.compressFunction = l;
          break;
        default:
          throw new Error("Unsupported compression algorithm.");
      }
    }
    return R;
  }, a.createRandom = function() {
    var x = /* @__PURE__ */ new Date(), k = +x + x.getTimezoneOffset() * 6e4, L = t.util.createBuffer();
    return L.putInt32(k), L.putBytes(t.random.getBytes(28)), L;
  }, a.createRecord = function(x, k) {
    if (!k.data)
      return null;
    var L = {
      type: k.type,
      version: {
        major: x.version.major,
        minor: x.version.minor
      },
      length: k.data.length(),
      fragment: k.data
    };
    return L;
  }, a.createAlert = function(x, k) {
    var L = t.util.createBuffer();
    return L.putByte(k.level), L.putByte(k.description), a.createRecord(x, {
      type: a.ContentType.alert,
      data: L
    });
  }, a.createClientHello = function(x) {
    x.session.clientHelloVersion = {
      major: x.version.major,
      minor: x.version.minor
    };
    for (var k = t.util.createBuffer(), L = 0; L < x.cipherSuites.length; ++L) {
      var R = x.cipherSuites[L];
      k.putByte(R.id[0]), k.putByte(R.id[1]);
    }
    var o = k.length(), w = t.util.createBuffer();
    w.putByte(a.CompressionMethod.none);
    var V = w.length(), z = t.util.createBuffer();
    if (x.virtualHost) {
      var ie = t.util.createBuffer();
      ie.putByte(0), ie.putByte(0);
      var ae = t.util.createBuffer();
      ae.putByte(0), u(ae, 2, t.util.createBuffer(x.virtualHost));
      var Q = t.util.createBuffer();
      u(Q, 2, ae), u(ie, 2, Q), z.putBuffer(ie);
    }
    var te = z.length();
    te > 0 && (te += 2);
    var ue = x.session.id, de = ue.length + 1 + // session ID vector
    2 + // version (major + minor)
    4 + 28 + // random time and random bytes
    2 + o + // cipher suites vector
    1 + V + // compression methods vector
    te, ce = t.util.createBuffer();
    return ce.putByte(a.HandshakeType.client_hello), ce.putInt24(de), ce.putByte(x.version.major), ce.putByte(x.version.minor), ce.putBytes(x.session.sp.client_random), u(ce, 1, t.util.createBuffer(ue)), u(ce, 2, k), u(ce, 1, w), te > 0 && u(ce, 2, z), ce;
  }, a.createServerHello = function(x) {
    var k = x.session.id, L = k.length + 1 + // session ID vector
    2 + // version (major + minor)
    4 + 28 + // random time and random bytes
    2 + // chosen cipher suite
    1, R = t.util.createBuffer();
    return R.putByte(a.HandshakeType.server_hello), R.putInt24(L), R.putByte(x.version.major), R.putByte(x.version.minor), R.putBytes(x.session.sp.server_random), u(R, 1, t.util.createBuffer(k)), R.putByte(x.session.cipherSuite.id[0]), R.putByte(x.session.cipherSuite.id[1]), R.putByte(x.session.compressionMethod), R;
  }, a.createCertificate = function(x) {
    var k = x.entity === a.ConnectionEnd.client, L = null;
    if (x.getCertificate) {
      var R;
      k ? R = x.session.certificateRequest : R = x.session.extensions.server_name.serverNameList, L = x.getCertificate(x, R);
    }
    var o = t.util.createBuffer();
    if (L !== null)
      try {
        t.util.isArray(L) || (L = [L]);
        for (var w = null, V = 0; V < L.length; ++V) {
          var z = t.pem.decode(L[V])[0];
          if (z.type !== "CERTIFICATE" && z.type !== "X509 CERTIFICATE" && z.type !== "TRUSTED CERTIFICATE") {
            var ie = new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');
            throw ie.headerType = z.type, ie;
          }
          if (z.procType && z.procType.type === "ENCRYPTED")
            throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
          var ae = t.util.createBuffer(z.body);
          w === null && (w = t.asn1.fromDer(ae.bytes(), !1));
          var Q = t.util.createBuffer();
          u(Q, 3, ae), o.putBuffer(Q);
        }
        L = t.pki.certificateFromAsn1(w), k ? x.session.clientCertificate = L : x.session.serverCertificate = L;
      } catch (de) {
        return x.error(x, {
          message: "Could not send certificate list.",
          cause: de,
          send: !0,
          alert: {
            level: a.Alert.Level.fatal,
            description: a.Alert.Description.bad_certificate
          }
        });
      }
    var te = 3 + o.length(), ue = t.util.createBuffer();
    return ue.putByte(a.HandshakeType.certificate), ue.putInt24(te), u(ue, 3, o), ue;
  }, a.createClientKeyExchange = function(x) {
    var k = t.util.createBuffer();
    k.putByte(x.session.clientHelloVersion.major), k.putByte(x.session.clientHelloVersion.minor), k.putBytes(t.random.getBytes(46));
    var L = x.session.sp;
    L.pre_master_secret = k.getBytes();
    var R = x.session.serverCertificate.publicKey;
    k = R.encrypt(L.pre_master_secret);
    var o = k.length + 2, w = t.util.createBuffer();
    return w.putByte(a.HandshakeType.client_key_exchange), w.putInt24(o), w.putInt16(k.length), w.putBytes(k), w;
  }, a.createServerKeyExchange = function(x) {
    var k = t.util.createBuffer();
    return k;
  }, a.getClientSignature = function(x, k) {
    var L = t.util.createBuffer();
    L.putBuffer(x.session.md5.digest()), L.putBuffer(x.session.sha1.digest()), L = L.getBytes(), x.getSignature = x.getSignature || function(R, o, w) {
      var V = null;
      if (R.getPrivateKey)
        try {
          V = R.getPrivateKey(R, R.session.clientCertificate), V = t.pki.privateKeyFromPem(V);
        } catch (z) {
          R.error(R, {
            message: "Could not get private key.",
            cause: z,
            send: !0,
            alert: {
              level: a.Alert.Level.fatal,
              description: a.Alert.Description.internal_error
            }
          });
        }
      V === null ? R.error(R, {
        message: "No private key set.",
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: a.Alert.Description.internal_error
        }
      }) : o = V.sign(o, null), w(R, o);
    }, x.getSignature(x, L, k);
  }, a.createCertificateVerify = function(x, k) {
    var L = k.length + 2, R = t.util.createBuffer();
    return R.putByte(a.HandshakeType.certificate_verify), R.putInt24(L), R.putInt16(k.length), R.putBytes(k), R;
  }, a.createCertificateRequest = function(x) {
    var k = t.util.createBuffer();
    k.putByte(1);
    var L = t.util.createBuffer();
    for (var R in x.caStore.certs) {
      var o = x.caStore.certs[R], w = t.pki.distinguishedNameToAsn1(o.subject), V = t.asn1.toDer(w);
      L.putInt16(V.length()), L.putBuffer(V);
    }
    var z = 1 + k.length() + 2 + L.length(), ie = t.util.createBuffer();
    return ie.putByte(a.HandshakeType.certificate_request), ie.putInt24(z), u(ie, 1, k), u(ie, 2, L), ie;
  }, a.createServerHelloDone = function(x) {
    var k = t.util.createBuffer();
    return k.putByte(a.HandshakeType.server_hello_done), k.putInt24(0), k;
  }, a.createChangeCipherSpec = function() {
    var x = t.util.createBuffer();
    return x.putByte(1), x;
  }, a.createFinished = function(x) {
    var k = t.util.createBuffer();
    k.putBuffer(x.session.md5.digest()), k.putBuffer(x.session.sha1.digest());
    var L = x.entity === a.ConnectionEnd.client, R = x.session.sp, o = 12, w = e, V = L ? "client finished" : "server finished";
    k = w(R.master_secret, V, k.getBytes(), o);
    var z = t.util.createBuffer();
    return z.putByte(a.HandshakeType.finished), z.putInt24(k.length()), z.putBuffer(k), z;
  }, a.createHeartbeat = function(x, k, L) {
    typeof L > "u" && (L = k.length);
    var R = t.util.createBuffer();
    R.putByte(x), R.putInt16(L), R.putBytes(k);
    var o = R.length(), w = Math.max(16, o - L - 3);
    return R.putBytes(t.random.getBytes(w)), R;
  }, a.queue = function(x, k) {
    if (k && !(k.fragment.length() === 0 && (k.type === a.ContentType.handshake || k.type === a.ContentType.alert || k.type === a.ContentType.change_cipher_spec))) {
      if (k.type === a.ContentType.handshake) {
        var L = k.fragment.bytes();
        x.session.md5.update(L), x.session.sha1.update(L), L = null;
      }
      var R;
      if (k.fragment.length() <= a.MaxFragment)
        R = [k];
      else {
        R = [];
        for (var o = k.fragment.bytes(); o.length > a.MaxFragment; )
          R.push(a.createRecord(x, {
            type: k.type,
            data: t.util.createBuffer(o.slice(0, a.MaxFragment))
          })), o = o.slice(a.MaxFragment);
        o.length > 0 && R.push(a.createRecord(x, {
          type: k.type,
          data: t.util.createBuffer(o)
        }));
      }
      for (var w = 0; w < R.length && !x.fail; ++w) {
        var V = R[w], z = x.state.current.write;
        z.update(x, V) && x.records.push(V);
      }
    }
  }, a.flush = function(x) {
    for (var k = 0; k < x.records.length; ++k) {
      var L = x.records[k];
      x.tlsData.putByte(L.type), x.tlsData.putByte(L.version.major), x.tlsData.putByte(L.version.minor), x.tlsData.putInt16(L.fragment.length()), x.tlsData.putBuffer(x.records[k].fragment);
    }
    return x.records = [], x.tlsDataReady(x);
  };
  var $ = function(x) {
    switch (x) {
      case !0:
        return !0;
      case t.pki.certificateError.bad_certificate:
        return a.Alert.Description.bad_certificate;
      case t.pki.certificateError.unsupported_certificate:
        return a.Alert.Description.unsupported_certificate;
      case t.pki.certificateError.certificate_revoked:
        return a.Alert.Description.certificate_revoked;
      case t.pki.certificateError.certificate_expired:
        return a.Alert.Description.certificate_expired;
      case t.pki.certificateError.certificate_unknown:
        return a.Alert.Description.certificate_unknown;
      case t.pki.certificateError.unknown_ca:
        return a.Alert.Description.unknown_ca;
      default:
        return a.Alert.Description.bad_certificate;
    }
  }, ze = function(x) {
    switch (x) {
      case !0:
        return !0;
      case a.Alert.Description.bad_certificate:
        return t.pki.certificateError.bad_certificate;
      case a.Alert.Description.unsupported_certificate:
        return t.pki.certificateError.unsupported_certificate;
      case a.Alert.Description.certificate_revoked:
        return t.pki.certificateError.certificate_revoked;
      case a.Alert.Description.certificate_expired:
        return t.pki.certificateError.certificate_expired;
      case a.Alert.Description.certificate_unknown:
        return t.pki.certificateError.certificate_unknown;
      case a.Alert.Description.unknown_ca:
        return t.pki.certificateError.unknown_ca;
      default:
        return t.pki.certificateError.bad_certificate;
    }
  };
  a.verifyCertificateChain = function(x, k) {
    try {
      var L = {};
      for (var R in x.verifyOptions)
        L[R] = x.verifyOptions[R];
      L.verify = function(w, V, z) {
        var ie = $(w), ae = x.verify(x, w, V, z);
        if (ae !== !0) {
          if (typeof ae == "object" && !t.util.isArray(ae)) {
            var Q = new Error("The application rejected the certificate.");
            throw Q.send = !0, Q.alert = {
              level: a.Alert.Level.fatal,
              description: a.Alert.Description.bad_certificate
            }, ae.message && (Q.message = ae.message), ae.alert && (Q.alert.description = ae.alert), Q;
          }
          ae !== w && (ae = ze(ae));
        }
        return ae;
      }, t.pki.verifyCertificateChain(x.caStore, k, L);
    } catch (w) {
      var o = w;
      (typeof o != "object" || t.util.isArray(o)) && (o = {
        send: !0,
        alert: {
          level: a.Alert.Level.fatal,
          description: $(w)
        }
      }), "send" in o || (o.send = !0), "alert" in o || (o.alert = {
        level: a.Alert.Level.fatal,
        description: $(o.error)
      }), x.error(x, o);
    }
    return !x.fail;
  }, a.createSessionCache = function(x, k) {
    var L = null;
    if (x && x.getSession && x.setSession && x.order)
      L = x;
    else {
      L = {}, L.cache = x || {}, L.capacity = Math.max(k || 100, 1), L.order = [];
      for (var R in x)
        L.order.length <= k ? L.order.push(R) : delete x[R];
      L.getSession = function(o) {
        var w = null, V = null;
        if (o ? V = t.util.bytesToHex(o) : L.order.length > 0 && (V = L.order[0]), V !== null && V in L.cache) {
          w = L.cache[V], delete L.cache[V];
          for (var z in L.order)
            if (L.order[z] === V) {
              L.order.splice(z, 1);
              break;
            }
        }
        return w;
      }, L.setSession = function(o, w) {
        if (L.order.length === L.capacity) {
          var V = L.order.shift();
          delete L.cache[V];
        }
        var V = t.util.bytesToHex(o);
        L.order.push(V), L.cache[V] = w;
      };
    }
    return L;
  }, a.createConnection = function(x) {
    var k = null;
    x.caStore ? t.util.isArray(x.caStore) ? k = t.pki.createCaStore(x.caStore) : k = x.caStore : k = t.pki.createCaStore();
    var L = x.cipherSuites || null;
    if (L === null) {
      L = [];
      for (var R in a.CipherSuites)
        L.push(a.CipherSuites[R]);
    }
    var o = x.server ? a.ConnectionEnd.server : a.ConnectionEnd.client, w = x.sessionCache ? a.createSessionCache(x.sessionCache) : null, V = {
      version: { major: a.Version.major, minor: a.Version.minor },
      entity: o,
      sessionId: x.sessionId,
      caStore: k,
      sessionCache: w,
      cipherSuites: L,
      connected: x.connected,
      virtualHost: x.virtualHost || null,
      verifyClient: x.verifyClient || !1,
      verify: x.verify || function(Q, te, ue, de) {
        return te;
      },
      verifyOptions: x.verifyOptions || {},
      getCertificate: x.getCertificate || null,
      getPrivateKey: x.getPrivateKey || null,
      getSignature: x.getSignature || null,
      input: t.util.createBuffer(),
      tlsData: t.util.createBuffer(),
      data: t.util.createBuffer(),
      tlsDataReady: x.tlsDataReady,
      dataReady: x.dataReady,
      heartbeatReceived: x.heartbeatReceived,
      closed: x.closed,
      error: function(Q, te) {
        te.origin = te.origin || (Q.entity === a.ConnectionEnd.client ? "client" : "server"), te.send && (a.queue(Q, a.createAlert(Q, te.alert)), a.flush(Q));
        var ue = te.fatal !== !1;
        ue && (Q.fail = !0), x.error(Q, te), ue && Q.close(!1);
      },
      deflate: x.deflate || null,
      inflate: x.inflate || null
    };
    V.reset = function(Q) {
      V.version = { major: a.Version.major, minor: a.Version.minor }, V.record = null, V.session = null, V.peerCertificate = null, V.state = {
        pending: null,
        current: null
      }, V.expect = V.entity === a.ConnectionEnd.client ? p : s, V.fragmented = null, V.records = [], V.open = !1, V.handshakes = 0, V.handshaking = !1, V.isConnected = !1, V.fail = !(Q || typeof Q > "u"), V.input.clear(), V.tlsData.clear(), V.data.clear(), V.state.current = a.createConnectionState(V);
    }, V.reset();
    var z = function(Q, te) {
      var ue = te.type - a.ContentType.change_cipher_spec, de = q[Q.entity][Q.expect];
      ue in de ? de[ue](Q, te) : a.handleUnexpected(Q, te);
    }, ie = function(Q) {
      var te = 0, ue = Q.input, de = ue.length();
      if (de < 5)
        te = 5 - de;
      else {
        Q.record = {
          type: ue.getByte(),
          version: {
            major: ue.getByte(),
            minor: ue.getByte()
          },
          length: ue.getInt16(),
          fragment: t.util.createBuffer(),
          ready: !1
        };
        var ce = Q.record.version.major === Q.version.major;
        ce && Q.session && Q.session.version && (ce = Q.record.version.minor === Q.version.minor), ce || Q.error(Q, {
          message: "Incompatible TLS version.",
          send: !0,
          alert: {
            level: a.Alert.Level.fatal,
            description: a.Alert.Description.protocol_version
          }
        });
      }
      return te;
    }, ae = function(Q) {
      var te = 0, ue = Q.input, de = ue.length();
      if (de < Q.record.length)
        te = Q.record.length - de;
      else {
        Q.record.fragment.putBytes(ue.getBytes(Q.record.length)), ue.compact();
        var ce = Q.state.current.read;
        ce.update(Q, Q.record) && (Q.fragmented !== null && (Q.fragmented.type === Q.record.type ? (Q.fragmented.fragment.putBuffer(Q.record.fragment), Q.record = Q.fragmented) : Q.error(Q, {
          message: "Invalid fragmented record.",
          send: !0,
          alert: {
            level: a.Alert.Level.fatal,
            description: a.Alert.Description.unexpected_message
          }
        })), Q.record.ready = !0);
      }
      return te;
    };
    return V.handshake = function(Q) {
      if (V.entity !== a.ConnectionEnd.client)
        V.error(V, {
          message: "Cannot initiate handshake as a server.",
          fatal: !1
        });
      else if (V.handshaking)
        V.error(V, {
          message: "Handshake already in progress.",
          fatal: !1
        });
      else {
        V.fail && !V.open && V.handshakes === 0 && (V.fail = !1), V.handshaking = !0, Q = Q || "";
        var te = null;
        Q.length > 0 && (V.sessionCache && (te = V.sessionCache.getSession(Q)), te === null && (Q = "")), Q.length === 0 && V.sessionCache && (te = V.sessionCache.getSession(), te !== null && (Q = te.id)), V.session = {
          id: Q,
          version: null,
          cipherSuite: null,
          compressionMethod: null,
          serverCertificate: null,
          certificateRequest: null,
          clientCertificate: null,
          sp: {},
          md5: t.md.md5.create(),
          sha1: t.md.sha1.create()
        }, te && (V.version = te.version, V.session.sp = te.sp), V.session.sp.client_random = a.createRandom().getBytes(), V.open = !0, a.queue(V, a.createRecord(V, {
          type: a.ContentType.handshake,
          data: a.createClientHello(V)
        })), a.flush(V);
      }
    }, V.process = function(Q) {
      var te = 0;
      return Q && V.input.putBytes(Q), V.fail || (V.record !== null && V.record.ready && V.record.fragment.isEmpty() && (V.record = null), V.record === null && (te = ie(V)), !V.fail && V.record !== null && !V.record.ready && (te = ae(V)), !V.fail && V.record !== null && V.record.ready && z(V, V.record)), te;
    }, V.prepare = function(Q) {
      return a.queue(V, a.createRecord(V, {
        type: a.ContentType.application_data,
        data: t.util.createBuffer(Q)
      })), a.flush(V);
    }, V.prepareHeartbeatRequest = function(Q, te) {
      return Q instanceof t.util.ByteBuffer && (Q = Q.bytes()), typeof te > "u" && (te = Q.length), V.expectedHeartbeatPayload = Q, a.queue(V, a.createRecord(V, {
        type: a.ContentType.heartbeat,
        data: a.createHeartbeat(
          a.HeartbeatMessageType.heartbeat_request,
          Q,
          te
        )
      })), a.flush(V);
    }, V.close = function(Q) {
      if (!V.fail && V.sessionCache && V.session) {
        var te = {
          id: V.session.id,
          version: V.session.version,
          sp: V.session.sp
        };
        te.sp.keys = null, V.sessionCache.setSession(te.id, te);
      }
      V.open && (V.open = !1, V.input.clear(), (V.isConnected || V.handshaking) && (V.isConnected = V.handshaking = !1, a.queue(V, a.createAlert(V, {
        level: a.Alert.Level.warning,
        description: a.Alert.Description.close_notify
      })), a.flush(V)), V.closed(V)), V.reset(Q);
    }, V;
  }, Lr = t.tls = t.tls || {};
  for (var Qe in a)
    typeof a[Qe] != "function" && (t.tls[Qe] = a[Qe]);
  return t.tls.prf_tls1 = e, t.tls.hmac_sha1 = r, t.tls.createSessionCache = a.createSessionCache, t.tls.createConnection = a.createConnection, Lr;
}
var Va;
function ui() {
  if (Va) return ur.exports;
  Va = 1;
  var t = he();
  xt(), mn();
  var e = ur.exports = t.tls;
  e.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA = {
    id: [0, 47],
    name: "TLS_RSA_WITH_AES_128_CBC_SHA",
    initSecurityParameters: function(p) {
      p.bulk_cipher_algorithm = e.BulkCipherAlgorithm.aes, p.cipher_type = e.CipherType.block, p.enc_key_length = 16, p.block_length = 16, p.fixed_iv_length = 16, p.record_iv_length = 16, p.mac_algorithm = e.MACAlgorithm.hmac_sha1, p.mac_length = 20, p.mac_key_length = 20;
    },
    initConnectionState: r
  }, e.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA = {
    id: [0, 53],
    name: "TLS_RSA_WITH_AES_256_CBC_SHA",
    initSecurityParameters: function(p) {
      p.bulk_cipher_algorithm = e.BulkCipherAlgorithm.aes, p.cipher_type = e.CipherType.block, p.enc_key_length = 32, p.block_length = 16, p.fixed_iv_length = 16, p.record_iv_length = 16, p.mac_algorithm = e.MACAlgorithm.hmac_sha1, p.mac_length = 20, p.mac_key_length = 20;
    },
    initConnectionState: r
  };
  function r(p, f, S) {
    var U = f.entity === t.tls.ConnectionEnd.client;
    p.read.cipherState = {
      init: !1,
      cipher: t.cipher.createDecipher("AES-CBC", U ? S.keys.server_write_key : S.keys.client_write_key),
      iv: U ? S.keys.server_write_IV : S.keys.client_write_IV
    }, p.write.cipherState = {
      init: !1,
      cipher: t.cipher.createCipher("AES-CBC", U ? S.keys.client_write_key : S.keys.server_write_key),
      iv: U ? S.keys.client_write_IV : S.keys.server_write_IV
    }, p.read.cipherFunction = u, p.write.cipherFunction = l, p.read.macLength = p.write.macLength = S.mac_length, p.read.macFunction = p.write.macFunction = e.hmac_sha1;
  }
  function l(p, f) {
    var S = !1, U = f.macFunction(f.macKey, f.sequenceNumber, p);
    p.fragment.putBytes(U), f.updateSequenceNumber();
    var T;
    p.version.minor === e.Versions.TLS_1_0.minor ? T = f.cipherState.init ? null : f.cipherState.iv : T = t.random.getBytesSync(16), f.cipherState.init = !0;
    var c = f.cipherState.cipher;
    return c.start({ iv: T }), p.version.minor >= e.Versions.TLS_1_1.minor && c.output.putBytes(T), c.update(p.fragment), c.finish(E) && (p.fragment = c.output, p.length = p.fragment.length(), S = !0), S;
  }
  function E(p, f, S) {
    if (!S) {
      var U = p - f.length() % p;
      f.fillWithByte(U - 1, U);
    }
    return !0;
  }
  function v(p, f, S) {
    var U = !0;
    if (S) {
      for (var T = f.length(), c = f.last(), g = T - 1 - c; g < T - 1; ++g)
        U = U && f.at(g) == c;
      U && f.truncate(c + 1);
    }
    return U;
  }
  function u(p, f) {
    var S = !1, U;
    p.version.minor === e.Versions.TLS_1_0.minor ? U = f.cipherState.init ? null : f.cipherState.iv : U = p.fragment.getBytes(16), f.cipherState.init = !0;
    var T = f.cipherState.cipher;
    T.start({ iv: U }), T.update(p.fragment), S = T.finish(v);
    var c = f.macLength, g = t.random.getBytesSync(c), C = T.output.length();
    C >= c ? (p.fragment = T.output.getBytes(C - c), g = T.output.getBytes(c)) : p.fragment = T.output.getBytes(), p.fragment = t.util.createBuffer(p.fragment), p.length = p.fragment.length();
    var m = f.macFunction(f.macKey, f.sequenceNumber, p);
    return f.updateSequenceNumber(), S = a(f.macKey, g, m) && S, S;
  }
  function a(p, f, S) {
    var U = t.hmac.create();
    return U.start("SHA1", p), U.update(f), f = U.digest().getBytes(), U.start(null, null), U.update(S), S = U.digest().getBytes(), f === S;
  }
  return ur.exports;
}
var kr = { exports: {} }, Ka;
function Cn() {
  if (Ka) return kr.exports;
  Ka = 1;
  var t = he();
  ht(), pe();
  var e = kr.exports = t.sha512 = t.sha512 || {};
  t.md.sha512 = t.md.algorithms.sha512 = e;
  var r = t.sha384 = t.sha512.sha384 = t.sha512.sha384 || {};
  r.create = function() {
    return e.create("SHA-384");
  }, t.md.sha384 = t.md.algorithms.sha384 = r, t.sha512.sha256 = t.sha512.sha256 || {
    create: function() {
      return e.create("SHA-512/256");
    }
  }, t.md["sha512/256"] = t.md.algorithms["sha512/256"] = t.sha512.sha256, t.sha512.sha224 = t.sha512.sha224 || {
    create: function() {
      return e.create("SHA-512/224");
    }
  }, t.md["sha512/224"] = t.md.algorithms["sha512/224"] = t.sha512.sha224, e.create = function(f) {
    if (E || a(), typeof f > "u" && (f = "SHA-512"), !(f in u))
      throw new Error("Invalid SHA-512 algorithm: " + f);
    for (var S = u[f], U = null, T = t.util.createBuffer(), c = new Array(80), g = 0; g < 80; ++g)
      c[g] = new Array(2);
    var C = 64;
    switch (f) {
      case "SHA-384":
        C = 48;
        break;
      case "SHA-512/256":
        C = 32;
        break;
      case "SHA-512/224":
        C = 28;
        break;
    }
    var m = {
      // SHA-512 => sha512
      algorithm: f.replace("-", "").toLowerCase(),
      blockLength: 128,
      digestLength: C,
      // 56-bit length of message so far (does not including padding)
      messageLength: 0,
      // true message length
      fullMessageLength: null,
      // size of message length in bytes
      messageLengthSize: 16
    };
    return m.start = function() {
      m.messageLength = 0, m.fullMessageLength = m.messageLength128 = [];
      for (var s = m.messageLengthSize / 4, d = 0; d < s; ++d)
        m.fullMessageLength.push(0);
      T = t.util.createBuffer(), U = new Array(S.length);
      for (var d = 0; d < S.length; ++d)
        U[d] = S[d].slice(0);
      return m;
    }, m.start(), m.update = function(s, d) {
      d === "utf8" && (s = t.util.encodeUtf8(s));
      var y = s.length;
      m.messageLength += y, y = [y / 4294967296 >>> 0, y >>> 0];
      for (var B = m.fullMessageLength.length - 1; B >= 0; --B)
        m.fullMessageLength[B] += y[1], y[1] = y[0] + (m.fullMessageLength[B] / 4294967296 >>> 0), m.fullMessageLength[B] = m.fullMessageLength[B] >>> 0, y[0] = y[1] / 4294967296 >>> 0;
      return T.putBytes(s), p(U, c, T), (T.read > 2048 || T.length() === 0) && T.compact(), m;
    }, m.digest = function() {
      var s = t.util.createBuffer();
      s.putBytes(T.bytes());
      var d = m.fullMessageLength[m.fullMessageLength.length - 1] + m.messageLengthSize, y = d & m.blockLength - 1;
      s.putBytes(l.substr(0, m.blockLength - y));
      for (var B, b, h = m.fullMessageLength[0] * 8, i = 0; i < m.fullMessageLength.length - 1; ++i)
        B = m.fullMessageLength[i + 1] * 8, b = B / 4294967296 >>> 0, h += b, s.putInt32(h >>> 0), h = B >>> 0;
      s.putInt32(h);
      for (var n = new Array(U.length), i = 0; i < U.length; ++i)
        n[i] = U[i].slice(0);
      p(n, c, s);
      var A = t.util.createBuffer(), _;
      f === "SHA-512" ? _ = n.length : f === "SHA-384" ? _ = n.length - 2 : _ = n.length - 4;
      for (var i = 0; i < _; ++i)
        A.putInt32(n[i][0]), (i !== _ - 1 || f !== "SHA-512/224") && A.putInt32(n[i][1]);
      return A;
    }, m;
  };
  var l = null, E = !1, v = null, u = null;
  function a() {
    l = "", l += t.util.fillString("\0", 128), v = [
      [1116352408, 3609767458],
      [1899447441, 602891725],
      [3049323471, 3964484399],
      [3921009573, 2173295548],
      [961987163, 4081628472],
      [1508970993, 3053834265],
      [2453635748, 2937671579],
      [2870763221, 3664609560],
      [3624381080, 2734883394],
      [310598401, 1164996542],
      [607225278, 1323610764],
      [1426881987, 3590304994],
      [1925078388, 4068182383],
      [2162078206, 991336113],
      [2614888103, 633803317],
      [3248222580, 3479774868],
      [3835390401, 2666613458],
      [4022224774, 944711139],
      [264347078, 2341262773],
      [604807628, 2007800933],
      [770255983, 1495990901],
      [1249150122, 1856431235],
      [1555081692, 3175218132],
      [1996064986, 2198950837],
      [2554220882, 3999719339],
      [2821834349, 766784016],
      [2952996808, 2566594879],
      [3210313671, 3203337956],
      [3336571891, 1034457026],
      [3584528711, 2466948901],
      [113926993, 3758326383],
      [338241895, 168717936],
      [666307205, 1188179964],
      [773529912, 1546045734],
      [1294757372, 1522805485],
      [1396182291, 2643833823],
      [1695183700, 2343527390],
      [1986661051, 1014477480],
      [2177026350, 1206759142],
      [2456956037, 344077627],
      [2730485921, 1290863460],
      [2820302411, 3158454273],
      [3259730800, 3505952657],
      [3345764771, 106217008],
      [3516065817, 3606008344],
      [3600352804, 1432725776],
      [4094571909, 1467031594],
      [275423344, 851169720],
      [430227734, 3100823752],
      [506948616, 1363258195],
      [659060556, 3750685593],
      [883997877, 3785050280],
      [958139571, 3318307427],
      [1322822218, 3812723403],
      [1537002063, 2003034995],
      [1747873779, 3602036899],
      [1955562222, 1575990012],
      [2024104815, 1125592928],
      [2227730452, 2716904306],
      [2361852424, 442776044],
      [2428436474, 593698344],
      [2756734187, 3733110249],
      [3204031479, 2999351573],
      [3329325298, 3815920427],
      [3391569614, 3928383900],
      [3515267271, 566280711],
      [3940187606, 3454069534],
      [4118630271, 4000239992],
      [116418474, 1914138554],
      [174292421, 2731055270],
      [289380356, 3203993006],
      [460393269, 320620315],
      [685471733, 587496836],
      [852142971, 1086792851],
      [1017036298, 365543100],
      [1126000580, 2618297676],
      [1288033470, 3409855158],
      [1501505948, 4234509866],
      [1607167915, 987167468],
      [1816402316, 1246189591]
    ], u = {}, u["SHA-512"] = [
      [1779033703, 4089235720],
      [3144134277, 2227873595],
      [1013904242, 4271175723],
      [2773480762, 1595750129],
      [1359893119, 2917565137],
      [2600822924, 725511199],
      [528734635, 4215389547],
      [1541459225, 327033209]
    ], u["SHA-384"] = [
      [3418070365, 3238371032],
      [1654270250, 914150663],
      [2438529370, 812702999],
      [355462360, 4144912697],
      [1731405415, 4290775857],
      [2394180231, 1750603025],
      [3675008525, 1694076839],
      [1203062813, 3204075428]
    ], u["SHA-512/256"] = [
      [573645204, 4230739756],
      [2673172387, 3360449730],
      [596883563, 1867755857],
      [2520282905, 1497426621],
      [2519219938, 2827943907],
      [3193839141, 1401305490],
      [721525244, 746961066],
      [246885852, 2177182882]
    ], u["SHA-512/224"] = [
      [2352822216, 424955298],
      [1944164710, 2312950998],
      [502970286, 855612546],
      [1738396948, 1479516111],
      [258812777, 2077511080],
      [2011393907, 79989058],
      [1067287976, 1780299464],
      [286451373, 2446758561]
    ], E = !0;
  }
  function p(f, S, U) {
    for (var T, c, g, C, m, s, d, y, B, b, h, i, n, A, _, P, D, K, q, H, G, X, Z, F, Y, ee, se, fe, oe, J, $, ze, Qe, x, k, L = U.length(); L >= 128; ) {
      for (oe = 0; oe < 16; ++oe)
        S[oe][0] = U.getInt32() >>> 0, S[oe][1] = U.getInt32() >>> 0;
      for (; oe < 80; ++oe)
        ze = S[oe - 2], J = ze[0], $ = ze[1], T = ((J >>> 19 | $ << 13) ^ // ROTR 19
        ($ >>> 29 | J << 3) ^ // ROTR 61/(swap + ROTR 29)
        J >>> 6) >>> 0, c = ((J << 13 | $ >>> 19) ^ // ROTR 19
        ($ << 3 | J >>> 29) ^ // ROTR 61/(swap + ROTR 29)
        (J << 26 | $ >>> 6)) >>> 0, x = S[oe - 15], J = x[0], $ = x[1], g = ((J >>> 1 | $ << 31) ^ // ROTR 1
        (J >>> 8 | $ << 24) ^ // ROTR 8
        J >>> 7) >>> 0, C = ((J << 31 | $ >>> 1) ^ // ROTR 1
        (J << 24 | $ >>> 8) ^ // ROTR 8
        (J << 25 | $ >>> 7)) >>> 0, Qe = S[oe - 7], k = S[oe - 16], $ = c + Qe[1] + C + k[1], S[oe][0] = T + Qe[0] + g + k[0] + ($ / 4294967296 >>> 0) >>> 0, S[oe][1] = $ >>> 0;
      for (n = f[0][0], A = f[0][1], _ = f[1][0], P = f[1][1], D = f[2][0], K = f[2][1], q = f[3][0], H = f[3][1], G = f[4][0], X = f[4][1], Z = f[5][0], F = f[5][1], Y = f[6][0], ee = f[6][1], se = f[7][0], fe = f[7][1], oe = 0; oe < 80; ++oe)
        d = ((G >>> 14 | X << 18) ^ // ROTR 14
        (G >>> 18 | X << 14) ^ // ROTR 18
        (X >>> 9 | G << 23)) >>> 0, y = ((G << 18 | X >>> 14) ^ // ROTR 14
        (G << 14 | X >>> 18) ^ // ROTR 18
        (X << 23 | G >>> 9)) >>> 0, B = (Y ^ G & (Z ^ Y)) >>> 0, b = (ee ^ X & (F ^ ee)) >>> 0, m = ((n >>> 28 | A << 4) ^ // ROTR 28
        (A >>> 2 | n << 30) ^ // ROTR 34/(swap + ROTR 2)
        (A >>> 7 | n << 25)) >>> 0, s = ((n << 4 | A >>> 28) ^ // ROTR 28
        (A << 30 | n >>> 2) ^ // ROTR 34/(swap + ROTR 2)
        (A << 25 | n >>> 7)) >>> 0, h = (n & _ | D & (n ^ _)) >>> 0, i = (A & P | K & (A ^ P)) >>> 0, $ = fe + y + b + v[oe][1] + S[oe][1], T = se + d + B + v[oe][0] + S[oe][0] + ($ / 4294967296 >>> 0) >>> 0, c = $ >>> 0, $ = s + i, g = m + h + ($ / 4294967296 >>> 0) >>> 0, C = $ >>> 0, se = Y, fe = ee, Y = Z, ee = F, Z = G, F = X, $ = H + c, G = q + T + ($ / 4294967296 >>> 0) >>> 0, X = $ >>> 0, q = D, H = K, D = _, K = P, _ = n, P = A, $ = c + C, n = T + g + ($ / 4294967296 >>> 0) >>> 0, A = $ >>> 0;
      $ = f[0][1] + A, f[0][0] = f[0][0] + n + ($ / 4294967296 >>> 0) >>> 0, f[0][1] = $ >>> 0, $ = f[1][1] + P, f[1][0] = f[1][0] + _ + ($ / 4294967296 >>> 0) >>> 0, f[1][1] = $ >>> 0, $ = f[2][1] + K, f[2][0] = f[2][0] + D + ($ / 4294967296 >>> 0) >>> 0, f[2][1] = $ >>> 0, $ = f[3][1] + H, f[3][0] = f[3][0] + q + ($ / 4294967296 >>> 0) >>> 0, f[3][1] = $ >>> 0, $ = f[4][1] + X, f[4][0] = f[4][0] + G + ($ / 4294967296 >>> 0) >>> 0, f[4][1] = $ >>> 0, $ = f[5][1] + F, f[5][0] = f[5][0] + Z + ($ / 4294967296 >>> 0) >>> 0, f[5][1] = $ >>> 0, $ = f[6][1] + ee, f[6][0] = f[6][0] + Y + ($ / 4294967296 >>> 0) >>> 0, f[6][1] = $ >>> 0, $ = f[7][1] + fe, f[7][0] = f[7][0] + se + ($ / 4294967296 >>> 0) >>> 0, f[7][1] = $ >>> 0, L -= 128;
    }
  }
  return kr.exports;
}
var zt = {}, Fa;
function li() {
  if (Fa) return zt;
  Fa = 1;
  var t = he();
  ut();
  var e = t.asn1;
  return zt.privateKeyValidator = {
    // PrivateKeyInfo
    name: "PrivateKeyInfo",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    value: [{
      // Version (INTEGER)
      name: "PrivateKeyInfo.version",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.INTEGER,
      constructed: !1,
      capture: "privateKeyVersion"
    }, {
      // privateKeyAlgorithm
      name: "PrivateKeyInfo.privateKeyAlgorithm",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.SEQUENCE,
      constructed: !0,
      value: [{
        name: "AlgorithmIdentifier.algorithm",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.OID,
        constructed: !1,
        capture: "privateKeyOid"
      }]
    }, {
      // PrivateKey
      name: "PrivateKeyInfo",
      tagClass: e.Class.UNIVERSAL,
      type: e.Type.OCTETSTRING,
      constructed: !1,
      capture: "privateKey"
    }]
  }, zt.publicKeyValidator = {
    name: "SubjectPublicKeyInfo",
    tagClass: e.Class.UNIVERSAL,
    type: e.Type.SEQUENCE,
    constructed: !0,
    captureAsn1: "subjectPublicKeyInfo",
    value: [
      {
        name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.SEQUENCE,
        constructed: !0,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: e.Class.UNIVERSAL,
          type: e.Type.OID,
          constructed: !1,
          capture: "publicKeyOid"
        }]
      },
      // capture group for ed25519PublicKey
      {
        tagClass: e.Class.UNIVERSAL,
        type: e.Type.BITSTRING,
        constructed: !1,
        composed: !0,
        captureBitStringValue: "ed25519PublicKey"
      }
      // FIXME: this is capture group for rsaPublicKey, use it in this API or
      // discard?
      /* {
        // subjectPublicKey
        name: 'SubjectPublicKeyInfo.subjectPublicKey',
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.BITSTRING,
        constructed: false,
        value: [{
          // RSAPublicKey
          name: 'SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey',
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          optional: true,
          captureAsn1: 'rsaPublicKey'
        }]
      } */
    ]
  }, zt;
}
var Dr, Ma;
function fi() {
  if (Ma) return Dr;
  Ma = 1;
  var t = he();
  jt(), st(), Cn(), pe();
  var e = li(), r = e.publicKeyValidator, l = e.privateKeyValidator;
  if (typeof E > "u")
    var E = t.jsbn.BigInteger;
  var v = t.util.ByteBuffer, u = typeof Buffer > "u" ? Uint8Array : Buffer;
  t.pki = t.pki || {}, Dr = t.pki.ed25519 = t.ed25519 = t.ed25519 || {};
  var a = t.ed25519;
  a.constants = {}, a.constants.PUBLIC_KEY_BYTE_LENGTH = 32, a.constants.PRIVATE_KEY_BYTE_LENGTH = 64, a.constants.SEED_BYTE_LENGTH = 32, a.constants.SIGN_BYTE_LENGTH = 64, a.constants.HASH_BYTE_LENGTH = 64, a.generateKeyPair = function(k) {
    k = k || {};
    var L = k.seed;
    if (L === void 0)
      L = t.random.getBytesSync(a.constants.SEED_BYTE_LENGTH);
    else if (typeof L == "string") {
      if (L.length !== a.constants.SEED_BYTE_LENGTH)
        throw new TypeError(
          '"seed" must be ' + a.constants.SEED_BYTE_LENGTH + " bytes in length."
        );
    } else if (!(L instanceof Uint8Array))
      throw new TypeError(
        '"seed" must be a node.js Buffer, Uint8Array, or a binary string.'
      );
    L = p({ message: L, encoding: "binary" });
    for (var R = new u(a.constants.PUBLIC_KEY_BYTE_LENGTH), o = new u(a.constants.PRIVATE_KEY_BYTE_LENGTH), w = 0; w < 32; ++w)
      o[w] = L[w];
    return d(R, o), { publicKey: R, privateKey: o };
  }, a.privateKeyFromAsn1 = function(k) {
    var L = {}, R = [], o = t.asn1.validate(k, l, L, R);
    if (!o) {
      var w = new Error("Invalid Key.");
      throw w.errors = R, w;
    }
    var V = t.asn1.derToOid(L.privateKeyOid), z = t.oids.EdDSA25519;
    if (V !== z)
      throw new Error('Invalid OID "' + V + '"; OID must be "' + z + '".');
    var ie = L.privateKey, ae = p({
      message: t.asn1.fromDer(ie).value,
      encoding: "binary"
    });
    return { privateKeyBytes: ae };
  }, a.publicKeyFromAsn1 = function(k) {
    var L = {}, R = [], o = t.asn1.validate(k, r, L, R);
    if (!o) {
      var w = new Error("Invalid Key.");
      throw w.errors = R, w;
    }
    var V = t.asn1.derToOid(L.publicKeyOid), z = t.oids.EdDSA25519;
    if (V !== z)
      throw new Error('Invalid OID "' + V + '"; OID must be "' + z + '".');
    var ie = L.ed25519PublicKey;
    if (ie.length !== a.constants.PUBLIC_KEY_BYTE_LENGTH)
      throw new Error("Key length is invalid.");
    return p({
      message: ie,
      encoding: "binary"
    });
  }, a.publicKeyFromPrivateKey = function(k) {
    k = k || {};
    var L = p({
      message: k.privateKey,
      encoding: "binary"
    });
    if (L.length !== a.constants.PRIVATE_KEY_BYTE_LENGTH)
      throw new TypeError(
        '"options.privateKey" must have a byte length of ' + a.constants.PRIVATE_KEY_BYTE_LENGTH
      );
    for (var R = new u(a.constants.PUBLIC_KEY_BYTE_LENGTH), o = 0; o < R.length; ++o)
      R[o] = L[32 + o];
    return R;
  }, a.sign = function(k) {
    k = k || {};
    var L = p(k), R = p({
      message: k.privateKey,
      encoding: "binary"
    });
    if (R.length === a.constants.SEED_BYTE_LENGTH) {
      var o = a.generateKeyPair({ seed: R });
      R = o.privateKey;
    } else if (R.length !== a.constants.PRIVATE_KEY_BYTE_LENGTH)
      throw new TypeError(
        '"options.privateKey" must have a byte length of ' + a.constants.SEED_BYTE_LENGTH + " or " + a.constants.PRIVATE_KEY_BYTE_LENGTH
      );
    var w = new u(
      a.constants.SIGN_BYTE_LENGTH + L.length
    );
    y(w, L, L.length, R);
    for (var V = new u(a.constants.SIGN_BYTE_LENGTH), z = 0; z < V.length; ++z)
      V[z] = w[z];
    return V;
  }, a.verify = function(k) {
    k = k || {};
    var L = p(k);
    if (k.signature === void 0)
      throw new TypeError(
        '"options.signature" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a binary string.'
      );
    var R = p({
      message: k.signature,
      encoding: "binary"
    });
    if (R.length !== a.constants.SIGN_BYTE_LENGTH)
      throw new TypeError(
        '"options.signature" must have a byte length of ' + a.constants.SIGN_BYTE_LENGTH
      );
    var o = p({
      message: k.publicKey,
      encoding: "binary"
    });
    if (o.length !== a.constants.PUBLIC_KEY_BYTE_LENGTH)
      throw new TypeError(
        '"options.publicKey" must have a byte length of ' + a.constants.PUBLIC_KEY_BYTE_LENGTH
      );
    var w = new u(a.constants.SIGN_BYTE_LENGTH + L.length), V = new u(a.constants.SIGN_BYTE_LENGTH + L.length), z;
    for (z = 0; z < a.constants.SIGN_BYTE_LENGTH; ++z)
      w[z] = R[z];
    for (z = 0; z < L.length; ++z)
      w[z + a.constants.SIGN_BYTE_LENGTH] = L[z];
    return B(V, w, w.length, o) >= 0;
  };
  function p(k) {
    var L = k.message;
    if (L instanceof Uint8Array || L instanceof u)
      return L;
    var R = k.encoding;
    if (L === void 0)
      if (k.md)
        L = k.md.digest().getBytes(), R = "binary";
      else
        throw new TypeError('"options.message" or "options.md" not specified.');
    if (typeof L == "string" && !R)
      throw new TypeError('"options.encoding" must be "binary" or "utf8".');
    if (typeof L == "string") {
      if (typeof Buffer < "u")
        return Buffer.from(L, R);
      L = new v(L, R);
    } else if (!(L instanceof v))
      throw new TypeError(
        '"options.message" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a string with "options.encoding" specifying its encoding.'
      );
    for (var o = new u(L.length()), w = 0; w < o.length; ++w)
      o[w] = L.at(w);
    return o;
  }
  var f = J(), S = J([1]), U = J([
    30883,
    4953,
    19914,
    30187,
    55467,
    16705,
    2637,
    112,
    59544,
    30585,
    16505,
    36039,
    65139,
    11119,
    27886,
    20995
  ]), T = J([
    61785,
    9906,
    39828,
    60374,
    45398,
    33411,
    5274,
    224,
    53552,
    61171,
    33010,
    6542,
    64743,
    22239,
    55772,
    9222
  ]), c = J([
    54554,
    36645,
    11616,
    51542,
    42930,
    38181,
    51040,
    26924,
    56412,
    64982,
    57905,
    49316,
    21502,
    52590,
    14035,
    8553
  ]), g = J([
    26200,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214
  ]), C = new Float64Array([
    237,
    211,
    245,
    92,
    26,
    99,
    18,
    88,
    214,
    156,
    247,
    162,
    222,
    249,
    222,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    16
  ]), m = J([
    41136,
    18958,
    6951,
    50414,
    58488,
    44335,
    6150,
    12099,
    55207,
    15867,
    153,
    11085,
    57099,
    20417,
    9344,
    11139
  ]);
  function s(k, L) {
    var R = t.md.sha512.create(), o = new v(k);
    R.update(o.getBytes(L), "binary");
    var w = R.digest().getBytes();
    if (typeof Buffer < "u")
      return Buffer.from(w, "binary");
    for (var V = new u(a.constants.HASH_BYTE_LENGTH), z = 0; z < 64; ++z)
      V[z] = w.charCodeAt(z);
    return V;
  }
  function d(k, L) {
    var R = [J(), J(), J(), J()], o, w = s(L, 32);
    for (w[0] &= 248, w[31] &= 127, w[31] |= 64, Y(R, w), _(k, R), o = 0; o < 32; ++o)
      L[o + 32] = k[o];
    return 0;
  }
  function y(k, L, R, o) {
    var w, V, z = new Float64Array(64), ie = [J(), J(), J(), J()], ae = s(o, 32);
    ae[0] &= 248, ae[31] &= 127, ae[31] |= 64;
    var Q = R + 64;
    for (w = 0; w < R; ++w)
      k[64 + w] = L[w];
    for (w = 0; w < 32; ++w)
      k[32 + w] = ae[32 + w];
    var te = s(k.subarray(32), R + 32);
    for (i(te), Y(ie, te), _(k, ie), w = 32; w < 64; ++w)
      k[w] = o[w];
    var ue = s(k, R + 64);
    for (i(ue), w = 32; w < 64; ++w)
      z[w] = 0;
    for (w = 0; w < 32; ++w)
      z[w] = te[w];
    for (w = 0; w < 32; ++w)
      for (V = 0; V < 32; V++)
        z[w + V] += ue[w] * ae[V];
    return h(k.subarray(32), z), Q;
  }
  function B(k, L, R, o) {
    var w, V, z = new u(32), ie = [J(), J(), J(), J()], ae = [J(), J(), J(), J()];
    if (V = -1, R < 64 || D(ae, o) || !b(L, 32))
      return -1;
    for (w = 0; w < R; ++w)
      k[w] = L[w];
    for (w = 0; w < 32; ++w)
      k[w + 32] = o[w];
    var Q = s(k, R);
    if (i(Q), F(ie, ae, Q), Y(ae, L.subarray(32)), n(ie, ae), _(z, ie), R -= 64, G(L, 0, z, 0)) {
      for (w = 0; w < R; ++w)
        k[w] = 0;
      return -1;
    }
    for (w = 0; w < R; ++w)
      k[w] = L[w + 64];
    return V = R, V;
  }
  function b(k, L) {
    var R;
    for (R = 31; R >= 0; --R) {
      if (k[L + R] < C[R])
        return !0;
      if (k[L + R] > C[R])
        return !1;
    }
    return !1;
  }
  function h(k, L) {
    var R, o, w, V;
    for (o = 63; o >= 32; --o) {
      for (R = 0, w = o - 32, V = o - 12; w < V; ++w)
        L[w] += R - 16 * L[o] * C[w - (o - 32)], R = L[w] + 128 >> 8, L[w] -= R * 256;
      L[w] += R, L[o] = 0;
    }
    for (R = 0, w = 0; w < 32; ++w)
      L[w] += R - (L[31] >> 4) * C[w], R = L[w] >> 8, L[w] &= 255;
    for (w = 0; w < 32; ++w)
      L[w] -= R * C[w];
    for (o = 0; o < 32; ++o)
      L[o + 1] += L[o] >> 8, k[o] = L[o] & 255;
  }
  function i(k) {
    for (var L = new Float64Array(64), R = 0; R < 64; ++R)
      L[R] = k[R], k[R] = 0;
    h(k, L);
  }
  function n(k, L) {
    var R = J(), o = J(), w = J(), V = J(), z = J(), ie = J(), ae = J(), Q = J(), te = J();
    ze(R, k[1], k[0]), ze(te, L[1], L[0]), x(R, R, te), $(o, k[0], k[1]), $(te, L[0], L[1]), x(o, o, te), x(w, k[3], L[3]), x(w, w, T), x(V, k[2], L[2]), $(V, V, V), ze(z, o, R), ze(ie, V, w), $(ae, V, w), $(Q, o, R), x(k[0], z, ie), x(k[1], Q, ae), x(k[2], ae, ie), x(k[3], z, Q);
  }
  function A(k, L, R) {
    for (var o = 0; o < 4; ++o)
      oe(k[o], L[o], R);
  }
  function _(k, L) {
    var R = J(), o = J(), w = J();
    se(w, L[2]), x(R, L[0], w), x(o, L[1], w), P(k, o), k[31] ^= Z(R) << 7;
  }
  function P(k, L) {
    var R, o, w, V = J(), z = J();
    for (R = 0; R < 16; ++R)
      z[R] = L[R];
    for (fe(z), fe(z), fe(z), o = 0; o < 2; ++o) {
      for (V[0] = z[0] - 65517, R = 1; R < 15; ++R)
        V[R] = z[R] - 65535 - (V[R - 1] >> 16 & 1), V[R - 1] &= 65535;
      V[15] = z[15] - 32767 - (V[14] >> 16 & 1), w = V[15] >> 16 & 1, V[14] &= 65535, oe(z, V, 1 - w);
    }
    for (R = 0; R < 16; R++)
      k[2 * R] = z[R] & 255, k[2 * R + 1] = z[R] >> 8;
  }
  function D(k, L) {
    var R = J(), o = J(), w = J(), V = J(), z = J(), ie = J(), ae = J();
    return ee(k[2], S), K(k[1], L), Qe(w, k[1]), x(V, w, U), ze(w, w, k[2]), $(V, k[2], V), Qe(z, V), Qe(ie, z), x(ae, ie, z), x(R, ae, w), x(R, R, V), q(R, R), x(R, R, w), x(R, R, V), x(R, R, V), x(k[0], R, V), Qe(o, k[0]), x(o, o, V), H(o, w) && x(k[0], k[0], m), Qe(o, k[0]), x(o, o, V), H(o, w) ? -1 : (Z(k[0]) === L[31] >> 7 && ze(k[0], f, k[0]), x(k[3], k[0], k[1]), 0);
  }
  function K(k, L) {
    var R;
    for (R = 0; R < 16; ++R)
      k[R] = L[2 * R] + (L[2 * R + 1] << 8);
    k[15] &= 32767;
  }
  function q(k, L) {
    var R = J(), o;
    for (o = 0; o < 16; ++o)
      R[o] = L[o];
    for (o = 250; o >= 0; --o)
      Qe(R, R), o !== 1 && x(R, R, L);
    for (o = 0; o < 16; ++o)
      k[o] = R[o];
  }
  function H(k, L) {
    var R = new u(32), o = new u(32);
    return P(R, k), P(o, L), G(R, 0, o, 0);
  }
  function G(k, L, R, o) {
    return X(k, L, R, o, 32);
  }
  function X(k, L, R, o, w) {
    var V, z = 0;
    for (V = 0; V < w; ++V)
      z |= k[L + V] ^ R[o + V];
    return (1 & z - 1 >>> 8) - 1;
  }
  function Z(k) {
    var L = new u(32);
    return P(L, k), L[0] & 1;
  }
  function F(k, L, R) {
    var o, w;
    for (ee(k[0], f), ee(k[1], S), ee(k[2], S), ee(k[3], f), w = 255; w >= 0; --w)
      o = R[w / 8 | 0] >> (w & 7) & 1, A(k, L, o), n(L, k), n(k, k), A(k, L, o);
  }
  function Y(k, L) {
    var R = [J(), J(), J(), J()];
    ee(R[0], c), ee(R[1], g), ee(R[2], S), x(R[3], c, g), F(k, R, L);
  }
  function ee(k, L) {
    var R;
    for (R = 0; R < 16; R++)
      k[R] = L[R] | 0;
  }
  function se(k, L) {
    var R = J(), o;
    for (o = 0; o < 16; ++o)
      R[o] = L[o];
    for (o = 253; o >= 0; --o)
      Qe(R, R), o !== 2 && o !== 4 && x(R, R, L);
    for (o = 0; o < 16; ++o)
      k[o] = R[o];
  }
  function fe(k) {
    var L, R, o = 1;
    for (L = 0; L < 16; ++L)
      R = k[L] + o + 65535, o = Math.floor(R / 65536), k[L] = R - o * 65536;
    k[0] += o - 1 + 37 * (o - 1);
  }
  function oe(k, L, R) {
    for (var o, w = ~(R - 1), V = 0; V < 16; ++V)
      o = w & (k[V] ^ L[V]), k[V] ^= o, L[V] ^= o;
  }
  function J(k) {
    var L, R = new Float64Array(16);
    if (k)
      for (L = 0; L < k.length; ++L)
        R[L] = k[L];
    return R;
  }
  function $(k, L, R) {
    for (var o = 0; o < 16; ++o)
      k[o] = L[o] + R[o];
  }
  function ze(k, L, R) {
    for (var o = 0; o < 16; ++o)
      k[o] = L[o] - R[o];
  }
  function Qe(k, L) {
    x(k, L, L);
  }
  function x(k, L, R) {
    var o, w, V = 0, z = 0, ie = 0, ae = 0, Q = 0, te = 0, ue = 0, de = 0, ce = 0, Se = 0, Be = 0, Ae = 0, Te = 0, Ee = 0, me = 0, ve = 0, Ie = 0, _e = 0, Xe = 0, Ye = 0, We = 0, Ze = 0, $e = 0, tt = 0, ot = 0, lt = 0, dt = 0, Ct = 0, Tt = 0, Rt = 0, Kt = 0, Ne = R[0], we = R[1], Re = R[2], Le = R[3], ke = R[4], De = R[5], Ue = R[6], Pe = R[7], Oe = R[8], Ve = R[9], Ke = R[10], Fe = R[11], xe = R[12], be = R[13], Me = R[14], qe = R[15];
    o = L[0], V += o * Ne, z += o * we, ie += o * Re, ae += o * Le, Q += o * ke, te += o * De, ue += o * Ue, de += o * Pe, ce += o * Oe, Se += o * Ve, Be += o * Ke, Ae += o * Fe, Te += o * xe, Ee += o * be, me += o * Me, ve += o * qe, o = L[1], z += o * Ne, ie += o * we, ae += o * Re, Q += o * Le, te += o * ke, ue += o * De, de += o * Ue, ce += o * Pe, Se += o * Oe, Be += o * Ve, Ae += o * Ke, Te += o * Fe, Ee += o * xe, me += o * be, ve += o * Me, Ie += o * qe, o = L[2], ie += o * Ne, ae += o * we, Q += o * Re, te += o * Le, ue += o * ke, de += o * De, ce += o * Ue, Se += o * Pe, Be += o * Oe, Ae += o * Ve, Te += o * Ke, Ee += o * Fe, me += o * xe, ve += o * be, Ie += o * Me, _e += o * qe, o = L[3], ae += o * Ne, Q += o * we, te += o * Re, ue += o * Le, de += o * ke, ce += o * De, Se += o * Ue, Be += o * Pe, Ae += o * Oe, Te += o * Ve, Ee += o * Ke, me += o * Fe, ve += o * xe, Ie += o * be, _e += o * Me, Xe += o * qe, o = L[4], Q += o * Ne, te += o * we, ue += o * Re, de += o * Le, ce += o * ke, Se += o * De, Be += o * Ue, Ae += o * Pe, Te += o * Oe, Ee += o * Ve, me += o * Ke, ve += o * Fe, Ie += o * xe, _e += o * be, Xe += o * Me, Ye += o * qe, o = L[5], te += o * Ne, ue += o * we, de += o * Re, ce += o * Le, Se += o * ke, Be += o * De, Ae += o * Ue, Te += o * Pe, Ee += o * Oe, me += o * Ve, ve += o * Ke, Ie += o * Fe, _e += o * xe, Xe += o * be, Ye += o * Me, We += o * qe, o = L[6], ue += o * Ne, de += o * we, ce += o * Re, Se += o * Le, Be += o * ke, Ae += o * De, Te += o * Ue, Ee += o * Pe, me += o * Oe, ve += o * Ve, Ie += o * Ke, _e += o * Fe, Xe += o * xe, Ye += o * be, We += o * Me, Ze += o * qe, o = L[7], de += o * Ne, ce += o * we, Se += o * Re, Be += o * Le, Ae += o * ke, Te += o * De, Ee += o * Ue, me += o * Pe, ve += o * Oe, Ie += o * Ve, _e += o * Ke, Xe += o * Fe, Ye += o * xe, We += o * be, Ze += o * Me, $e += o * qe, o = L[8], ce += o * Ne, Se += o * we, Be += o * Re, Ae += o * Le, Te += o * ke, Ee += o * De, me += o * Ue, ve += o * Pe, Ie += o * Oe, _e += o * Ve, Xe += o * Ke, Ye += o * Fe, We += o * xe, Ze += o * be, $e += o * Me, tt += o * qe, o = L[9], Se += o * Ne, Be += o * we, Ae += o * Re, Te += o * Le, Ee += o * ke, me += o * De, ve += o * Ue, Ie += o * Pe, _e += o * Oe, Xe += o * Ve, Ye += o * Ke, We += o * Fe, Ze += o * xe, $e += o * be, tt += o * Me, ot += o * qe, o = L[10], Be += o * Ne, Ae += o * we, Te += o * Re, Ee += o * Le, me += o * ke, ve += o * De, Ie += o * Ue, _e += o * Pe, Xe += o * Oe, Ye += o * Ve, We += o * Ke, Ze += o * Fe, $e += o * xe, tt += o * be, ot += o * Me, lt += o * qe, o = L[11], Ae += o * Ne, Te += o * we, Ee += o * Re, me += o * Le, ve += o * ke, Ie += o * De, _e += o * Ue, Xe += o * Pe, Ye += o * Oe, We += o * Ve, Ze += o * Ke, $e += o * Fe, tt += o * xe, ot += o * be, lt += o * Me, dt += o * qe, o = L[12], Te += o * Ne, Ee += o * we, me += o * Re, ve += o * Le, Ie += o * ke, _e += o * De, Xe += o * Ue, Ye += o * Pe, We += o * Oe, Ze += o * Ve, $e += o * Ke, tt += o * Fe, ot += o * xe, lt += o * be, dt += o * Me, Ct += o * qe, o = L[13], Ee += o * Ne, me += o * we, ve += o * Re, Ie += o * Le, _e += o * ke, Xe += o * De, Ye += o * Ue, We += o * Pe, Ze += o * Oe, $e += o * Ve, tt += o * Ke, ot += o * Fe, lt += o * xe, dt += o * be, Ct += o * Me, Tt += o * qe, o = L[14], me += o * Ne, ve += o * we, Ie += o * Re, _e += o * Le, Xe += o * ke, Ye += o * De, We += o * Ue, Ze += o * Pe, $e += o * Oe, tt += o * Ve, ot += o * Ke, lt += o * Fe, dt += o * xe, Ct += o * be, Tt += o * Me, Rt += o * qe, o = L[15], ve += o * Ne, Ie += o * we, _e += o * Re, Xe += o * Le, Ye += o * ke, We += o * De, Ze += o * Ue, $e += o * Pe, tt += o * Oe, ot += o * Ve, lt += o * Ke, dt += o * Fe, Ct += o * xe, Tt += o * be, Rt += o * Me, Kt += o * qe, V += 38 * Ie, z += 38 * _e, ie += 38 * Xe, ae += 38 * Ye, Q += 38 * We, te += 38 * Ze, ue += 38 * $e, de += 38 * tt, ce += 38 * ot, Se += 38 * lt, Be += 38 * dt, Ae += 38 * Ct, Te += 38 * Tt, Ee += 38 * Rt, me += 38 * Kt, w = 1, o = V + w + 65535, w = Math.floor(o / 65536), V = o - w * 65536, o = z + w + 65535, w = Math.floor(o / 65536), z = o - w * 65536, o = ie + w + 65535, w = Math.floor(o / 65536), ie = o - w * 65536, o = ae + w + 65535, w = Math.floor(o / 65536), ae = o - w * 65536, o = Q + w + 65535, w = Math.floor(o / 65536), Q = o - w * 65536, o = te + w + 65535, w = Math.floor(o / 65536), te = o - w * 65536, o = ue + w + 65535, w = Math.floor(o / 65536), ue = o - w * 65536, o = de + w + 65535, w = Math.floor(o / 65536), de = o - w * 65536, o = ce + w + 65535, w = Math.floor(o / 65536), ce = o - w * 65536, o = Se + w + 65535, w = Math.floor(o / 65536), Se = o - w * 65536, o = Be + w + 65535, w = Math.floor(o / 65536), Be = o - w * 65536, o = Ae + w + 65535, w = Math.floor(o / 65536), Ae = o - w * 65536, o = Te + w + 65535, w = Math.floor(o / 65536), Te = o - w * 65536, o = Ee + w + 65535, w = Math.floor(o / 65536), Ee = o - w * 65536, o = me + w + 65535, w = Math.floor(o / 65536), me = o - w * 65536, o = ve + w + 65535, w = Math.floor(o / 65536), ve = o - w * 65536, V += w - 1 + 37 * (w - 1), w = 1, o = V + w + 65535, w = Math.floor(o / 65536), V = o - w * 65536, o = z + w + 65535, w = Math.floor(o / 65536), z = o - w * 65536, o = ie + w + 65535, w = Math.floor(o / 65536), ie = o - w * 65536, o = ae + w + 65535, w = Math.floor(o / 65536), ae = o - w * 65536, o = Q + w + 65535, w = Math.floor(o / 65536), Q = o - w * 65536, o = te + w + 65535, w = Math.floor(o / 65536), te = o - w * 65536, o = ue + w + 65535, w = Math.floor(o / 65536), ue = o - w * 65536, o = de + w + 65535, w = Math.floor(o / 65536), de = o - w * 65536, o = ce + w + 65535, w = Math.floor(o / 65536), ce = o - w * 65536, o = Se + w + 65535, w = Math.floor(o / 65536), Se = o - w * 65536, o = Be + w + 65535, w = Math.floor(o / 65536), Be = o - w * 65536, o = Ae + w + 65535, w = Math.floor(o / 65536), Ae = o - w * 65536, o = Te + w + 65535, w = Math.floor(o / 65536), Te = o - w * 65536, o = Ee + w + 65535, w = Math.floor(o / 65536), Ee = o - w * 65536, o = me + w + 65535, w = Math.floor(o / 65536), me = o - w * 65536, o = ve + w + 65535, w = Math.floor(o / 65536), ve = o - w * 65536, V += w - 1 + 37 * (w - 1), k[0] = V, k[1] = z, k[2] = ie, k[3] = ae, k[4] = Q, k[5] = te, k[6] = ue, k[7] = de, k[8] = ce, k[9] = Se, k[10] = Be, k[11] = Ae, k[12] = Te, k[13] = Ee, k[14] = me, k[15] = ve;
  }
  return Dr;
}
var Ur, qa;
function ci() {
  if (qa) return Ur;
  qa = 1;
  var t = he();
  pe(), st(), jt(), Ur = t.kem = t.kem || {};
  var e = t.jsbn.BigInteger;
  t.kem.rsa = {}, t.kem.rsa.create = function(l, E) {
    E = E || {};
    var v = E.prng || t.random, u = {};
    return u.encrypt = function(a, p) {
      var f = Math.ceil(a.n.bitLength() / 8), S;
      do
        S = new e(
          t.util.bytesToHex(v.getBytesSync(f)),
          16
        ).mod(a.n);
      while (S.compareTo(e.ONE) <= 0);
      S = t.util.hexToBytes(S.toString(16));
      var U = f - S.length;
      U > 0 && (S = t.util.fillString("\0", U) + S);
      var T = a.encrypt(S, "NONE"), c = l.generate(S, p);
      return { encapsulation: T, key: c };
    }, u.decrypt = function(a, p, f) {
      var S = a.decrypt(p, "NONE");
      return l.generate(S, f);
    }, u;
  }, t.kem.kdf1 = function(l, E) {
    r(this, l, 0, E || l.digestLength);
  }, t.kem.kdf2 = function(l, E) {
    r(this, l, 1, E || l.digestLength);
  };
  function r(l, E, v, u) {
    l.generate = function(a, p) {
      for (var f = new t.util.ByteBuffer(), S = Math.ceil(p / u) + v, U = new t.util.ByteBuffer(), T = v; T < S; ++T) {
        U.putInt32(T), E.start(), E.update(a + U.getBytes());
        var c = E.digest();
        f.putBytes(c.getBytes(u));
      }
      return f.truncate(f.length() - p), f.getBytes();
    };
  }
  return Ur;
}
var Pr, Ha;
function hi() {
  if (Ha) return Pr;
  Ha = 1;
  var t = he();
  pe(), Pr = t.log = t.log || {}, t.log.levels = [
    "none",
    "error",
    "warning",
    "info",
    "debug",
    "verbose",
    "max"
  ];
  var e = {}, r = [], l = null;
  t.log.LEVEL_LOCKED = 2, t.log.NO_LEVEL_CHECK = 4, t.log.INTERPOLATE = 8;
  for (var E = 0; E < t.log.levels.length; ++E) {
    var v = t.log.levels[E];
    e[v] = {
      index: E,
      name: v.toUpperCase()
    };
  }
  t.log.logMessage = function(T) {
    for (var c = e[T.level].index, g = 0; g < r.length; ++g) {
      var C = r[g];
      if (C.flags & t.log.NO_LEVEL_CHECK)
        C.f(T);
      else {
        var m = e[C.level].index;
        c <= m && C.f(C, T);
      }
    }
  }, t.log.prepareStandard = function(T) {
    "standard" in T || (T.standard = e[T.level].name + //' ' + +message.timestamp +
    " [" + T.category + "] " + T.message);
  }, t.log.prepareFull = function(T) {
    if (!("full" in T)) {
      var c = [T.message];
      c = c.concat([]), T.full = t.util.format.apply(this, c);
    }
  }, t.log.prepareStandardFull = function(T) {
    "standardFull" in T || (t.log.prepareStandard(T), T.standardFull = T.standard);
  };
  for (var u = ["error", "warning", "info", "debug", "verbose"], E = 0; E < u.length; ++E)
    (function(c) {
      t.log[c] = function(g, C) {
        var m = Array.prototype.slice.call(arguments).slice(2), s = {
          timestamp: /* @__PURE__ */ new Date(),
          level: c,
          category: g,
          message: C,
          arguments: m
          /*standard*/
          /*full*/
          /*fullMessage*/
        };
        t.log.logMessage(s);
      };
    })(u[E]);
  if (t.log.makeLogger = function(T) {
    var c = {
      flags: 0,
      f: T
    };
    return t.log.setLevel(c, "none"), c;
  }, t.log.setLevel = function(T, c) {
    var g = !1;
    if (T && !(T.flags & t.log.LEVEL_LOCKED))
      for (var C = 0; C < t.log.levels.length; ++C) {
        var m = t.log.levels[C];
        if (c == m) {
          T.level = c, g = !0;
          break;
        }
      }
    return g;
  }, t.log.lock = function(T, c) {
    typeof c > "u" || c ? T.flags |= t.log.LEVEL_LOCKED : T.flags &= ~t.log.LEVEL_LOCKED;
  }, t.log.addLogger = function(T) {
    r.push(T);
  }, typeof console < "u" && "log" in console) {
    var a;
    if (console.error && console.warn && console.info && console.debug) {
      var p = {
        error: console.error,
        warning: console.warn,
        info: console.info,
        debug: console.debug,
        verbose: console.debug
      }, f = function(T, c) {
        t.log.prepareStandard(c);
        var g = p[c.level], C = [c.standard];
        C = C.concat(c.arguments.slice()), g.apply(console, C);
      };
      a = t.log.makeLogger(f);
    } else {
      var f = function(c, g) {
        t.log.prepareStandardFull(g), console.log(g.standardFull);
      };
      a = t.log.makeLogger(f);
    }
    t.log.setLevel(a, "debug"), t.log.addLogger(a), l = a;
  } else
    console = {
      log: function() {
      }
    };
  if (l !== null && typeof window < "u" && window.location) {
    var S = new URL(window.location.href).searchParams;
    if (S.has("console.level") && t.log.setLevel(
      l,
      S.get("console.level").slice(-1)[0]
    ), S.has("console.lock")) {
      var U = S.get("console.lock").slice(-1)[0];
      U == "true" && t.log.lock(l);
    }
  }
  return t.log.consoleLogger = l, Pr;
}
var Or, Ga;
function di() {
  return Ga || (Ga = 1, Or = ht(), jr(), Vt(), un(), Cn()), Or;
}
var Vr = { exports: {} }, za;
function pi() {
  if (za) return Vr.exports;
  za = 1;
  var t = he();
  xt(), ut(), Yt(), St(), wt(), pn(), st(), pe(), $r();
  var e = t.asn1, r = Vr.exports = t.pkcs7 = t.pkcs7 || {};
  r.messageFromPem = function(c) {
    var g = t.pem.decode(c)[0];
    if (g.type !== "PKCS7") {
      var C = new Error('Could not convert PKCS#7 message from PEM; PEM header type is not "PKCS#7".');
      throw C.headerType = g.type, C;
    }
    if (g.procType && g.procType.type === "ENCRYPTED")
      throw new Error("Could not convert PKCS#7 message from PEM; PEM is encrypted.");
    var m = e.fromDer(g.body);
    return r.messageFromAsn1(m);
  }, r.messageToPem = function(c, g) {
    var C = {
      type: "PKCS7",
      body: e.toDer(c.toAsn1()).getBytes()
    };
    return t.pem.encode(C, { maxline: g });
  }, r.messageFromAsn1 = function(c) {
    var g = {}, C = [];
    if (!e.validate(c, r.asn1.contentInfoValidator, g, C)) {
      var m = new Error("Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo.");
      throw m.errors = C, m;
    }
    var s = e.derToOid(g.contentType), d;
    switch (s) {
      case t.pki.oids.envelopedData:
        d = r.createEnvelopedData();
        break;
      case t.pki.oids.encryptedData:
        d = r.createEncryptedData();
        break;
      case t.pki.oids.signedData:
        d = r.createSignedData();
        break;
      default:
        throw new Error("Cannot read PKCS#7 message. ContentType with OID " + s + " is not (yet) supported.");
    }
    return d.fromAsn1(g.content.value[0]), d;
  }, r.createSignedData = function() {
    var c = null;
    return c = {
      type: t.pki.oids.signedData,
      version: 1,
      certificates: [],
      crls: [],
      // TODO: add json-formatted signer stuff here?
      signers: [],
      // populated during sign()
      digestAlgorithmIdentifiers: [],
      contentInfo: null,
      signerInfos: [],
      fromAsn1: function(m) {
        if (U(c, m, r.asn1.signedDataValidator), c.certificates = [], c.crls = [], c.digestAlgorithmIdentifiers = [], c.contentInfo = null, c.signerInfos = [], c.rawCapture.certificates)
          for (var s = c.rawCapture.certificates.value, d = 0; d < s.length; ++d)
            c.certificates.push(t.pki.certificateFromAsn1(s[d]));
      },
      toAsn1: function() {
        c.contentInfo || c.sign();
        for (var m = [], s = 0; s < c.certificates.length; ++s)
          m.push(t.pki.certificateToAsn1(c.certificates[s]));
        var d = [], y = e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
          e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
            // Version
            e.create(
              e.Class.UNIVERSAL,
              e.Type.INTEGER,
              !1,
              e.integerToDer(c.version).getBytes()
            ),
            // DigestAlgorithmIdentifiers
            e.create(
              e.Class.UNIVERSAL,
              e.Type.SET,
              !0,
              c.digestAlgorithmIdentifiers
            ),
            // ContentInfo
            c.contentInfo
          ])
        ]);
        return m.length > 0 && y.value[0].value.push(
          e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, m)
        ), d.length > 0 && y.value[0].value.push(
          e.create(e.Class.CONTEXT_SPECIFIC, 1, !0, d)
        ), y.value[0].value.push(
          e.create(
            e.Class.UNIVERSAL,
            e.Type.SET,
            !0,
            c.signerInfos
          )
        ), e.create(
          e.Class.UNIVERSAL,
          e.Type.SEQUENCE,
          !0,
          [
            // ContentType
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OID,
              !1,
              e.oidToDer(c.type).getBytes()
            ),
            // [0] SignedData
            y
          ]
        );
      },
      /**
       * Add (another) entity to list of signers.
       *
       * Note: If authenticatedAttributes are provided, then, per RFC 2315,
       * they must include at least two attributes: content type and
       * message digest. The message digest attribute value will be
       * auto-calculated during signing and will be ignored if provided.
       *
       * Here's an example of providing these two attributes:
       *
       * forge.pkcs7.createSignedData();
       * p7.addSigner({
       *   issuer: cert.issuer.attributes,
       *   serialNumber: cert.serialNumber,
       *   key: privateKey,
       *   digestAlgorithm: forge.pki.oids.sha1,
       *   authenticatedAttributes: [{
       *     type: forge.pki.oids.contentType,
       *     value: forge.pki.oids.data
       *   }, {
       *     type: forge.pki.oids.messageDigest
       *   }]
       * });
       *
       * TODO: Support [subjectKeyIdentifier] as signer's ID.
       *
       * @param signer the signer information:
       *          key the signer's private key.
       *          [certificate] a certificate containing the public key
       *            associated with the signer's private key; use this option as
       *            an alternative to specifying signer.issuer and
       *            signer.serialNumber.
       *          [issuer] the issuer attributes (eg: cert.issuer.attributes).
       *          [serialNumber] the signer's certificate's serial number in
       *           hexadecimal (eg: cert.serialNumber).
       *          [digestAlgorithm] the message digest OID, as a string, to use
       *            (eg: forge.pki.oids.sha1).
       *          [authenticatedAttributes] an optional array of attributes
       *            to also sign along with the content.
       */
      addSigner: function(m) {
        var s = m.issuer, d = m.serialNumber;
        if (m.certificate) {
          var y = m.certificate;
          typeof y == "string" && (y = t.pki.certificateFromPem(y)), s = y.issuer.attributes, d = y.serialNumber;
        }
        var B = m.key;
        if (!B)
          throw new Error(
            "Could not add PKCS#7 signer; no private key specified."
          );
        typeof B == "string" && (B = t.pki.privateKeyFromPem(B));
        var b = m.digestAlgorithm || t.pki.oids.sha1;
        switch (b) {
          case t.pki.oids.sha1:
          case t.pki.oids.sha256:
          case t.pki.oids.sha384:
          case t.pki.oids.sha512:
          case t.pki.oids.md5:
            break;
          default:
            throw new Error(
              "Could not add PKCS#7 signer; unknown message digest algorithm: " + b
            );
        }
        var h = m.authenticatedAttributes || [];
        if (h.length > 0) {
          for (var i = !1, n = !1, A = 0; A < h.length; ++A) {
            var _ = h[A];
            if (!i && _.type === t.pki.oids.contentType) {
              if (i = !0, n)
                break;
              continue;
            }
            if (!n && _.type === t.pki.oids.messageDigest) {
              if (n = !0, i)
                break;
              continue;
            }
          }
          if (!i || !n)
            throw new Error("Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest.");
        }
        c.signers.push({
          key: B,
          version: 1,
          issuer: s,
          serialNumber: d,
          digestAlgorithm: b,
          signatureAlgorithm: t.pki.oids.rsaEncryption,
          signature: null,
          authenticatedAttributes: h,
          unauthenticatedAttributes: []
        });
      },
      /**
       * Signs the content.
       * @param options Options to apply when signing:
       *    [detached] boolean. If signing should be done in detached mode. Defaults to false.
       */
      sign: function(m) {
        if (m = m || {}, (typeof c.content != "object" || c.contentInfo === null) && (c.contentInfo = e.create(
          e.Class.UNIVERSAL,
          e.Type.SEQUENCE,
          !0,
          [
            // ContentType
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OID,
              !1,
              e.oidToDer(t.pki.oids.data).getBytes()
            )
          ]
        ), "content" in c)) {
          var s;
          c.content instanceof t.util.ByteBuffer ? s = c.content.bytes() : typeof c.content == "string" && (s = t.util.encodeUtf8(c.content)), m.detached ? c.detachedContent = e.create(e.Class.UNIVERSAL, e.Type.OCTETSTRING, !1, s) : c.contentInfo.value.push(
            // [0] EXPLICIT content
            e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
              e.create(
                e.Class.UNIVERSAL,
                e.Type.OCTETSTRING,
                !1,
                s
              )
            ])
          );
        }
        if (c.signers.length !== 0) {
          var d = g();
          C(d);
        }
      },
      verify: function() {
        throw new Error("PKCS#7 signature verification not yet implemented.");
      },
      /**
       * Add a certificate.
       *
       * @param cert the certificate to add.
       */
      addCertificate: function(m) {
        typeof m == "string" && (m = t.pki.certificateFromPem(m)), c.certificates.push(m);
      },
      /**
       * Add a certificate revokation list.
       *
       * @param crl the certificate revokation list to add.
       */
      addCertificateRevokationList: function(m) {
        throw new Error("PKCS#7 CRL support not yet implemented.");
      }
    }, c;
    function g() {
      for (var m = {}, s = 0; s < c.signers.length; ++s) {
        var d = c.signers[s], y = d.digestAlgorithm;
        y in m || (m[y] = t.md[t.pki.oids[y]].create()), d.authenticatedAttributes.length === 0 ? d.md = m[y] : d.md = t.md[t.pki.oids[y]].create();
      }
      c.digestAlgorithmIdentifiers = [];
      for (var y in m)
        c.digestAlgorithmIdentifiers.push(
          // AlgorithmIdentifier
          e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
            // algorithm
            e.create(
              e.Class.UNIVERSAL,
              e.Type.OID,
              !1,
              e.oidToDer(y).getBytes()
            ),
            // parameters (null)
            e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, "")
          ])
        );
      return m;
    }
    function C(m) {
      var s;
      if (c.detachedContent ? s = c.detachedContent : (s = c.contentInfo.value[1], s = s.value[0]), !s)
        throw new Error(
          "Could not sign PKCS#7 message; there is no content to sign."
        );
      var d = e.derToOid(c.contentInfo.value[0].value), y = e.toDer(s);
      y.getByte(), e.getBerValueLength(y), y = y.getBytes();
      for (var B in m)
        m[B].start().update(y);
      for (var b = /* @__PURE__ */ new Date(), h = 0; h < c.signers.length; ++h) {
        var i = c.signers[h];
        if (i.authenticatedAttributes.length === 0) {
          if (d !== t.pki.oids.data)
            throw new Error(
              "Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data."
            );
        } else {
          i.authenticatedAttributesAsn1 = e.create(
            e.Class.CONTEXT_SPECIFIC,
            0,
            !0,
            []
          );
          for (var n = e.create(
            e.Class.UNIVERSAL,
            e.Type.SET,
            !0,
            []
          ), A = 0; A < i.authenticatedAttributes.length; ++A) {
            var _ = i.authenticatedAttributes[A];
            _.type === t.pki.oids.messageDigest ? _.value = m[i.digestAlgorithm].digest() : _.type === t.pki.oids.signingTime && (_.value || (_.value = b)), n.value.push(f(_)), i.authenticatedAttributesAsn1.value.push(f(_));
          }
          y = e.toDer(n).getBytes(), i.md.start().update(y);
        }
        i.signature = i.key.sign(i.md, "RSASSA-PKCS1-V1_5");
      }
      c.signerInfos = p(c.signers);
    }
  }, r.createEncryptedData = function() {
    var c = null;
    return c = {
      type: t.pki.oids.encryptedData,
      version: 0,
      encryptedContent: {
        algorithm: t.pki.oids["aes256-CBC"]
      },
      /**
       * Reads an EncryptedData content block (in ASN.1 format)
       *
       * @param obj The ASN.1 representation of the EncryptedData content block
       */
      fromAsn1: function(g) {
        U(c, g, r.asn1.encryptedDataValidator);
      },
      /**
       * Decrypt encrypted content
       *
       * @param key The (symmetric) key as a byte buffer
       */
      decrypt: function(g) {
        g !== void 0 && (c.encryptedContent.key = g), T(c);
      }
    }, c;
  }, r.createEnvelopedData = function() {
    var c = null;
    return c = {
      type: t.pki.oids.envelopedData,
      version: 0,
      recipients: [],
      encryptedContent: {
        algorithm: t.pki.oids["aes256-CBC"]
      },
      /**
       * Reads an EnvelopedData content block (in ASN.1 format)
       *
       * @param obj the ASN.1 representation of the EnvelopedData content block.
       */
      fromAsn1: function(g) {
        var C = U(c, g, r.asn1.envelopedDataValidator);
        c.recipients = v(C.recipientInfos.value);
      },
      toAsn1: function() {
        return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
          // ContentType
          e.create(
            e.Class.UNIVERSAL,
            e.Type.OID,
            !1,
            e.oidToDer(c.type).getBytes()
          ),
          // [0] EnvelopedData
          e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
            e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
              // Version
              e.create(
                e.Class.UNIVERSAL,
                e.Type.INTEGER,
                !1,
                e.integerToDer(c.version).getBytes()
              ),
              // RecipientInfos
              e.create(
                e.Class.UNIVERSAL,
                e.Type.SET,
                !0,
                u(c.recipients)
              ),
              // EncryptedContentInfo
              e.create(
                e.Class.UNIVERSAL,
                e.Type.SEQUENCE,
                !0,
                S(c.encryptedContent)
              )
            ])
          ])
        ]);
      },
      /**
       * Find recipient by X.509 certificate's issuer.
       *
       * @param cert the certificate with the issuer to look for.
       *
       * @return the recipient object.
       */
      findRecipient: function(g) {
        for (var C = g.issuer.attributes, m = 0; m < c.recipients.length; ++m) {
          var s = c.recipients[m], d = s.issuer;
          if (s.serialNumber === g.serialNumber && d.length === C.length) {
            for (var y = !0, B = 0; B < C.length; ++B)
              if (d[B].type !== C[B].type || d[B].value !== C[B].value) {
                y = !1;
                break;
              }
            if (y)
              return s;
          }
        }
        return null;
      },
      /**
       * Decrypt enveloped content
       *
       * @param recipient The recipient object related to the private key
       * @param privKey The (RSA) private key object
       */
      decrypt: function(g, C) {
        if (c.encryptedContent.key === void 0 && g !== void 0 && C !== void 0)
          switch (g.encryptedContent.algorithm) {
            case t.pki.oids.rsaEncryption:
            case t.pki.oids.desCBC:
              var m = C.decrypt(g.encryptedContent.content);
              c.encryptedContent.key = t.util.createBuffer(m);
              break;
            default:
              throw new Error("Unsupported asymmetric cipher, OID " + g.encryptedContent.algorithm);
          }
        T(c);
      },
      /**
       * Add (another) entity to list of recipients.
       *
       * @param cert The certificate of the entity to add.
       */
      addRecipient: function(g) {
        c.recipients.push({
          version: 0,
          issuer: g.issuer.attributes,
          serialNumber: g.serialNumber,
          encryptedContent: {
            // We simply assume rsaEncryption here, since forge.pki only
            // supports RSA so far.  If the PKI module supports other
            // ciphers one day, we need to modify this one as well.
            algorithm: t.pki.oids.rsaEncryption,
            key: g.publicKey
          }
        });
      },
      /**
       * Encrypt enveloped content.
       *
       * This function supports two optional arguments, cipher and key, which
       * can be used to influence symmetric encryption.  Unless cipher is
       * provided, the cipher specified in encryptedContent.algorithm is used
       * (defaults to AES-256-CBC).  If no key is provided, encryptedContent.key
       * is (re-)used.  If that one's not set, a random key will be generated
       * automatically.
       *
       * @param [key] The key to be used for symmetric encryption.
       * @param [cipher] The OID of the symmetric cipher to use.
       */
      encrypt: function(g, C) {
        if (c.encryptedContent.content === void 0) {
          C = C || c.encryptedContent.algorithm, g = g || c.encryptedContent.key;
          var m, s, d;
          switch (C) {
            case t.pki.oids["aes128-CBC"]:
              m = 16, s = 16, d = t.aes.createEncryptionCipher;
              break;
            case t.pki.oids["aes192-CBC"]:
              m = 24, s = 16, d = t.aes.createEncryptionCipher;
              break;
            case t.pki.oids["aes256-CBC"]:
              m = 32, s = 16, d = t.aes.createEncryptionCipher;
              break;
            case t.pki.oids["des-EDE3-CBC"]:
              m = 24, s = 8, d = t.des.createEncryptionCipher;
              break;
            default:
              throw new Error("Unsupported symmetric cipher, OID " + C);
          }
          if (g === void 0)
            g = t.util.createBuffer(t.random.getBytes(m));
          else if (g.length() != m)
            throw new Error("Symmetric key has wrong length; got " + g.length() + " bytes, expected " + m + ".");
          c.encryptedContent.algorithm = C, c.encryptedContent.key = g, c.encryptedContent.parameter = t.util.createBuffer(
            t.random.getBytes(s)
          );
          var y = d(g);
          if (y.start(c.encryptedContent.parameter.copy()), y.update(c.content), !y.finish())
            throw new Error("Symmetric encryption failed.");
          c.encryptedContent.content = y.output;
        }
        for (var B = 0; B < c.recipients.length; ++B) {
          var b = c.recipients[B];
          if (b.encryptedContent.content === void 0)
            switch (b.encryptedContent.algorithm) {
              case t.pki.oids.rsaEncryption:
                b.encryptedContent.content = b.encryptedContent.key.encrypt(
                  c.encryptedContent.key.data
                );
                break;
              default:
                throw new Error("Unsupported asymmetric cipher, OID " + b.encryptedContent.algorithm);
            }
        }
      }
    }, c;
  };
  function l(c) {
    var g = {}, C = [];
    if (!e.validate(c, r.asn1.recipientInfoValidator, g, C)) {
      var m = new Error("Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo.");
      throw m.errors = C, m;
    }
    return {
      version: g.version.charCodeAt(0),
      issuer: t.pki.RDNAttributesAsArray(g.issuer),
      serialNumber: t.util.createBuffer(g.serial).toHex(),
      encryptedContent: {
        algorithm: e.derToOid(g.encAlgorithm),
        parameter: g.encParameter ? g.encParameter.value : void 0,
        content: g.encKey
      }
    };
  }
  function E(c) {
    return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // Version
      e.create(
        e.Class.UNIVERSAL,
        e.Type.INTEGER,
        !1,
        e.integerToDer(c.version).getBytes()
      ),
      // IssuerAndSerialNumber
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // Name
        t.pki.distinguishedNameToAsn1({ attributes: c.issuer }),
        // Serial
        e.create(
          e.Class.UNIVERSAL,
          e.Type.INTEGER,
          !1,
          t.util.hexToBytes(c.serialNumber)
        )
      ]),
      // KeyEncryptionAlgorithmIdentifier
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // Algorithm
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(c.encryptedContent.algorithm).getBytes()
        ),
        // Parameter, force NULL, only RSA supported for now.
        e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, "")
      ]),
      // EncryptedKey
      e.create(
        e.Class.UNIVERSAL,
        e.Type.OCTETSTRING,
        !1,
        c.encryptedContent.content
      )
    ]);
  }
  function v(c) {
    for (var g = [], C = 0; C < c.length; ++C)
      g.push(l(c[C]));
    return g;
  }
  function u(c) {
    for (var g = [], C = 0; C < c.length; ++C)
      g.push(E(c[C]));
    return g;
  }
  function a(c) {
    var g = e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // version
      e.create(
        e.Class.UNIVERSAL,
        e.Type.INTEGER,
        !1,
        e.integerToDer(c.version).getBytes()
      ),
      // issuerAndSerialNumber
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // name
        t.pki.distinguishedNameToAsn1({ attributes: c.issuer }),
        // serial
        e.create(
          e.Class.UNIVERSAL,
          e.Type.INTEGER,
          !1,
          t.util.hexToBytes(c.serialNumber)
        )
      ]),
      // digestAlgorithm
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // algorithm
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(c.digestAlgorithm).getBytes()
        ),
        // parameters (null)
        e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, "")
      ])
    ]);
    if (c.authenticatedAttributesAsn1 && g.value.push(c.authenticatedAttributesAsn1), g.value.push(e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // algorithm
      e.create(
        e.Class.UNIVERSAL,
        e.Type.OID,
        !1,
        e.oidToDer(c.signatureAlgorithm).getBytes()
      ),
      // parameters (null)
      e.create(e.Class.UNIVERSAL, e.Type.NULL, !1, "")
    ])), g.value.push(e.create(
      e.Class.UNIVERSAL,
      e.Type.OCTETSTRING,
      !1,
      c.signature
    )), c.unauthenticatedAttributes.length > 0) {
      for (var C = e.create(e.Class.CONTEXT_SPECIFIC, 1, !0, []), m = 0; m < c.unauthenticatedAttributes.length; ++m) {
        var s = c.unauthenticatedAttributes[m];
        C.values.push(f(s));
      }
      g.value.push(C);
    }
    return g;
  }
  function p(c) {
    for (var g = [], C = 0; C < c.length; ++C)
      g.push(a(c[C]));
    return g;
  }
  function f(c) {
    var g;
    if (c.type === t.pki.oids.contentType)
      g = e.create(
        e.Class.UNIVERSAL,
        e.Type.OID,
        !1,
        e.oidToDer(c.value).getBytes()
      );
    else if (c.type === t.pki.oids.messageDigest)
      g = e.create(
        e.Class.UNIVERSAL,
        e.Type.OCTETSTRING,
        !1,
        c.value.bytes()
      );
    else if (c.type === t.pki.oids.signingTime) {
      var C = /* @__PURE__ */ new Date("1950-01-01T00:00:00Z"), m = /* @__PURE__ */ new Date("2050-01-01T00:00:00Z"), s = c.value;
      if (typeof s == "string") {
        var d = Date.parse(s);
        isNaN(d) ? s.length === 13 ? s = e.utcTimeToDate(s) : s = e.generalizedTimeToDate(s) : s = new Date(d);
      }
      s >= C && s < m ? g = e.create(
        e.Class.UNIVERSAL,
        e.Type.UTCTIME,
        !1,
        e.dateToUtcTime(s)
      ) : g = e.create(
        e.Class.UNIVERSAL,
        e.Type.GENERALIZEDTIME,
        !1,
        e.dateToGeneralizedTime(s)
      );
    }
    return e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
      // AttributeType
      e.create(
        e.Class.UNIVERSAL,
        e.Type.OID,
        !1,
        e.oidToDer(c.type).getBytes()
      ),
      e.create(e.Class.UNIVERSAL, e.Type.SET, !0, [
        // AttributeValue
        g
      ])
    ]);
  }
  function S(c) {
    return [
      // ContentType, always Data for the moment
      e.create(
        e.Class.UNIVERSAL,
        e.Type.OID,
        !1,
        e.oidToDer(t.pki.oids.data).getBytes()
      ),
      // ContentEncryptionAlgorithmIdentifier
      e.create(e.Class.UNIVERSAL, e.Type.SEQUENCE, !0, [
        // Algorithm
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OID,
          !1,
          e.oidToDer(c.algorithm).getBytes()
        ),
        // Parameters (IV)
        c.parameter ? e.create(
          e.Class.UNIVERSAL,
          e.Type.OCTETSTRING,
          !1,
          c.parameter.getBytes()
        ) : void 0
      ]),
      // [0] EncryptedContent
      e.create(e.Class.CONTEXT_SPECIFIC, 0, !0, [
        e.create(
          e.Class.UNIVERSAL,
          e.Type.OCTETSTRING,
          !1,
          c.content.getBytes()
        )
      ])
    ];
  }
  function U(c, g, C) {
    var m = {}, s = [];
    if (!e.validate(g, C, m, s)) {
      var d = new Error("Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message.");
      throw d.errors = d, d;
    }
    var y = e.derToOid(m.contentType);
    if (y !== t.pki.oids.data)
      throw new Error("Unsupported PKCS#7 message. Only wrapped ContentType Data supported.");
    if (m.encryptedContent) {
      var B = "";
      if (t.util.isArray(m.encryptedContent))
        for (var b = 0; b < m.encryptedContent.length; ++b) {
          if (m.encryptedContent[b].type !== e.Type.OCTETSTRING)
            throw new Error("Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects.");
          B += m.encryptedContent[b].value;
        }
      else
        B = m.encryptedContent;
      c.encryptedContent = {
        algorithm: e.derToOid(m.encAlgorithm),
        parameter: t.util.createBuffer(m.encParameter.value),
        content: t.util.createBuffer(B)
      };
    }
    if (m.content) {
      var B = "";
      if (t.util.isArray(m.content))
        for (var b = 0; b < m.content.length; ++b) {
          if (m.content[b].type !== e.Type.OCTETSTRING)
            throw new Error("Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects.");
          B += m.content[b].value;
        }
      else
        B = m.content;
      c.content = t.util.createBuffer(B);
    }
    return c.version = m.version.charCodeAt(0), c.rawCapture = m, m;
  }
  function T(c) {
    if (c.encryptedContent.key === void 0)
      throw new Error("Symmetric key not available.");
    if (c.content === void 0) {
      var g;
      switch (c.encryptedContent.algorithm) {
        case t.pki.oids["aes128-CBC"]:
        case t.pki.oids["aes192-CBC"]:
        case t.pki.oids["aes256-CBC"]:
          g = t.aes.createDecryptionCipher(c.encryptedContent.key);
          break;
        case t.pki.oids.desCBC:
        case t.pki.oids["des-EDE3-CBC"]:
          g = t.des.createDecryptionCipher(c.encryptedContent.key);
          break;
        default:
          throw new Error("Unsupported symmetric cipher, OID " + c.encryptedContent.algorithm);
      }
      if (g.start(c.encryptedContent.parameter), g.update(c.encryptedContent.content), !g.finish())
        throw new Error("Symmetric decryption failed.");
      c.content = g.output;
    }
  }
  return Vr.exports;
}
var Kr = { exports: {} }, Qa;
function yi() {
  if (Qa) return Kr.exports;
  Qa = 1;
  var t = he();
  xt(), Ot(), jr(), Vt(), pe();
  var e = Kr.exports = t.ssh = t.ssh || {};
  e.privateKeyToPutty = function(v, u, a) {
    a = a || "", u = u || "";
    var p = "ssh-rsa", f = u === "" ? "none" : "aes256-cbc", S = "PuTTY-User-Key-File-2: " + p + `\r
`;
    S += "Encryption: " + f + `\r
`, S += "Comment: " + a + `\r
`;
    var U = t.util.createBuffer();
    l(U, p), r(U, v.e), r(U, v.n);
    var T = t.util.encode64(U.bytes(), 64), c = Math.floor(T.length / 66) + 1;
    S += "Public-Lines: " + c + `\r
`, S += T;
    var g = t.util.createBuffer();
    r(g, v.d), r(g, v.p), r(g, v.q), r(g, v.qInv);
    var C;
    if (!u)
      C = t.util.encode64(g.bytes(), 64);
    else {
      var m = g.length() + 16 - 1;
      m -= m % 16;
      var s = E(g.bytes());
      s.truncate(s.length() - m + g.length()), g.putBuffer(s);
      var d = t.util.createBuffer();
      d.putBuffer(E("\0\0\0\0", u)), d.putBuffer(E("\0\0\0", u));
      var y = t.aes.createEncryptionCipher(d.truncate(8), "CBC");
      y.start(t.util.createBuffer().fillWithByte(0, 16)), y.update(g.copy()), y.finish();
      var B = y.output;
      B.truncate(16), C = t.util.encode64(B.bytes(), 64);
    }
    c = Math.floor(C.length / 66) + 1, S += `\r
Private-Lines: ` + c + `\r
`, S += C;
    var b = E("putty-private-key-file-mac-key", u), h = t.util.createBuffer();
    l(h, p), l(h, f), l(h, a), h.putInt32(U.length()), h.putBuffer(U), h.putInt32(g.length()), h.putBuffer(g);
    var i = t.hmac.create();
    return i.start("sha1", b), i.update(h.bytes()), S += `\r
Private-MAC: ` + i.digest().toHex() + `\r
`, S;
  }, e.publicKeyToOpenSSH = function(v, u) {
    var a = "ssh-rsa";
    u = u || "";
    var p = t.util.createBuffer();
    return l(p, a), r(p, v.e), r(p, v.n), a + " " + t.util.encode64(p.bytes()) + " " + u;
  }, e.privateKeyToOpenSSH = function(v, u) {
    return u ? t.pki.encryptRsaPrivateKey(
      v,
      u,
      { legacy: !0, algorithm: "aes128" }
    ) : t.pki.privateKeyToPem(v);
  }, e.getPublicKeyFingerprint = function(v, u) {
    u = u || {};
    var a = u.md || t.md.md5.create(), p = "ssh-rsa", f = t.util.createBuffer();
    l(f, p), r(f, v.e), r(f, v.n), a.start(), a.update(f.getBytes());
    var S = a.digest();
    if (u.encoding === "hex") {
      var U = S.toHex();
      return u.delimiter ? U.match(/.{2}/g).join(u.delimiter) : U;
    } else {
      if (u.encoding === "binary")
        return S.getBytes();
      if (u.encoding)
        throw new Error('Unknown encoding "' + u.encoding + '".');
    }
    return S;
  };
  function r(v, u) {
    var a = u.toString(16);
    a[0] >= "8" && (a = "00" + a);
    var p = t.util.hexToBytes(a);
    v.putInt32(p.length), v.putBytes(p);
  }
  function l(v, u) {
    v.putInt32(u.length), v.putString(u);
  }
  function E() {
    for (var v = t.md.sha1.create(), u = arguments.length, a = 0; a < u; ++a)
      v.update(arguments[a]);
    return v.digest();
  }
  return Kr.exports;
}
var Fr, Xa;
function gi() {
  return Xa || (Xa = 1, Fr = he(), xt(), ui(), ut(), Yr(), Yt(), fi(), Ot(), ci(), hi(), di(), yn(), Zr(), wt(), cn(), gn(), pi(), vn(), hn(), ln(), Jr(), st(), fn(), yi(), mn(), pe()), Fr;
}
var vi = gi();
const je = /* @__PURE__ */ jn(vi);
let bt = null;
const Ce = (t, e) => {
  sn("crypto") && (e !== void 0 ? e instanceof Uint8Array ? console.log(`[Crypto Debug] ${t}:`, _t(e)) : typeof e == "object" ? console.log(`[Crypto Debug] ${t}:`, JSON.stringify(e, null, 2)) : console.log(`[Crypto Debug] ${t}:`, e) : console.log(`[Crypto Debug] ${t}`));
}, mi = (t) => bt !== null ? !1 : (bt = t, !0), Ya = () => typeof crypto < "u" && crypto.subtle !== void 0 && typeof crypto.subtle.generateKey == "function", Ci = async (t) => {
  const l = t.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace(/\s/g, ""), E = Uint8Array.from(atob(l), (v) => v.charCodeAt(0));
  return await crypto.subtle.importKey(
    "spki",
    Nt(E),
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    !1,
    ["encrypt"]
  );
}, Ei = async () => await crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  !0,
  ["encrypt", "decrypt"]
), xi = async (t) => {
  const e = await crypto.subtle.exportKey("raw", t);
  return new Uint8Array(e);
}, _t = (t) => {
  const e = new Uint8Array(t);
  let r = "";
  for (let l = 0; l < e.byteLength; l++)
    r += String.fromCharCode(e[l]);
  return btoa(r);
}, ja = (t) => {
  const e = atob(t), r = new Uint8Array(e.length);
  for (let l = 0; l < e.length; l++)
    r[l] = e.charCodeAt(l);
  return r;
}, Nt = (t) => t.slice().buffer, Si = async (t, e) => {
  const r = await Ci(e), l = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    r,
    Nt(t)
  );
  return _t(l);
}, Ti = async (t, e) => {
  const r = crypto.getRandomValues(new Uint8Array(12)), l = {
    ...t,
    _ts: Date.now()
  }, v = new TextEncoder().encode(JSON.stringify(l)), u = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: Nt(r)
    },
    e,
    Nt(v)
  );
  return {
    ciphertext: _t(u),
    nonce: _t(r)
  };
}, Ai = async (t, e, r) => {
  const l = ja(t), E = ja(e), v = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: Nt(E)
    },
    r,
    Nt(l)
  ), a = new TextDecoder().decode(v);
  return JSON.parse(a);
}, Bi = async (t) => {
  if (!bt)
    return null;
  try {
    if (Ce("========== 加密请求开始 =========="), Ce("原始数据", t), Ce("RSA 公钥", bt), Ce("使用 Web Crypto API:", Ya()), Ya()) {
      const e = await Ei(), r = await xi(e);
      Ce("AES 密钥 (Base64)", _t(r)), Ce("AES 密钥 (Hex)", Array.from(r).map((u) => u.toString(16).padStart(2, "0")).join(""));
      const l = await Si(r, bt);
      Ce("RSA 加密后的 AES 密钥 (X-Encrypted-Key)", l);
      const { ciphertext: E, nonce: v } = await Ti(t, e);
      return Ce("AES 加密后的数据 (encryptedData)", E), Ce("Nonce (X-Nonce)", v), Ce("========== 加密请求结束 =========="), {
        encryptedData: E,
        encryptedKey: l,
        nonce: v,
        aesKey: e
      };
    } else {
      Ce("使用降级方案 (node-forge)");
      const e = _i();
      Ce("AES 密钥 (Base64)", _t(e));
      const r = Ii(e, bt);
      Ce("RSA 加密后的 AES 密钥 (X-Encrypted-Key)", r);
      const { ciphertext: l, nonce: E } = Ni(t, e);
      return Ce("AES 加密后的数据 (encryptedData)", l), Ce("Nonce (X-Nonce)", E), Ce("========== 加密请求结束 =========="), {
        encryptedData: l,
        encryptedKey: r,
        nonce: E,
        aesKey: e
      };
    }
  } catch (e) {
    return console.error("加密请求数据失败:", e), null;
  }
}, bi = async (t, e, r) => {
  Ce("========== 解密响应开始 =========="), Ce("加密数据 (ciphertext)", t), Ce("响应 Nonce (X-Response-Nonce)", e);
  try {
    let l;
    return r instanceof CryptoKey ? l = await Ai(t, e, r) : l = wi(t, e, r), Ce("解密后的数据", l), Ce("========== 解密响应结束 =========="), l;
  } catch (l) {
    return console.error("解密响应数据失败:", l), Ce("解密错误", l), Ce("========== 解密响应结束 =========="), null;
  }
}, Wa = (t) => typeof t == "string" && t.length > 0 && /^[A-Za-z0-9+/=]+$/.test(t), Ii = (t, e) => {
  const r = je.pki.publicKeyFromPem(e), l = String.fromCharCode.apply(null, Array.from(t)), E = r.encrypt(l, "RSA-OAEP", {
    md: je.md.sha256.create()
  });
  return je.util.encode64(E);
}, _i = () => {
  const t = je.random.getBytesSync(32);
  return Uint8Array.from(t.split("").map((e) => e.charCodeAt(0)));
}, Ni = (t, e) => {
  const r = je.random.getBytesSync(12), l = {
    ...t,
    _ts: Date.now()
  }, E = JSON.stringify(l), v = String.fromCharCode.apply(null, Array.from(e)), u = je.cipher.createCipher("AES-GCM", v);
  u.start({
    iv: je.util.createBuffer(r)
  }), u.update(je.util.createBuffer(E, "utf8")), u.finish();
  const a = u.output.getBytes(), p = u.mode.tag.getBytes(), f = a + p;
  return {
    ciphertext: je.util.encode64(f),
    nonce: je.util.encode64(r)
  };
}, wi = (t, e, r) => {
  const l = je.util.decode64(t), E = je.util.decode64(e), v = l.slice(0, -16), u = l.slice(-16), a = String.fromCharCode.apply(null, Array.from(r)), p = je.cipher.createDecipher("AES-GCM", a);
  if (p.start({
    iv: je.util.createBuffer(E),
    tag: je.util.createBuffer(u)
  }), p.update(je.util.createBuffer(v)), !p.finish())
    throw new Error("AES-GCM decryption failed: authentication tag mismatch");
  const S = p.output.toString();
  return JSON.parse(S);
}, Ri = async (t, e) => {
  var E;
  const r = { encrypted: !1 };
  if (t.crypto === !1 || t.crypto === void 0 && !$a(t.url || "", e.api, e.subApp) || ((E = t.method) == null ? void 0 : E.toUpperCase()) === "GET" || !t.data)
    return r;
  try {
    const v = await Bi(t.data);
    if (v)
      return it("crypto", "请求加密", { originalData: t.data }), t.data = v.encryptedData, t.header || (t.header = {}), t.header["X-Encrypted-Key"] = v.encryptedKey, t.header["X-Nonce"] = v.nonce, it("crypto", "请求加密完成"), { encrypted: !0, aesKey: v.aesKey };
  } catch (v) {
    Pt("crypto", "请求加密失败", v);
  }
  return r;
}, Za = async (t, e) => {
  var l, E;
  const r = ((l = t.header) == null ? void 0 : l["x-response-nonce"]) || ((E = t.header) == null ? void 0 : E["X-Response-Nonce"]);
  if (r && t.data && e)
    try {
      let v = null;
      if (typeof t.data == "string" && Wa(t.data) ? v = t.data : typeof t.data == "object" && t.data !== null && "encrypted" in t.data && typeof t.data.encrypted == "string" && (v = t.data.encrypted), v && Wa(v)) {
        const u = await bi(v, r, e);
        if (u !== null)
          return it("crypto", "响应解密", { decryptedData: u }), u;
        Pt("crypto", "响应解密失败: 返回null", { nonce: r });
      }
    } catch (v) {
      Pt("crypto", "响应解密失败", v);
    }
  return t.data;
}, Ja = (t) => {
  if (!t) return;
  const e = t["x-public-key"] || t["X-Public-Key"];
  e && (mi(e) ? it("crypto", "从响应头缓存公钥成功") : it("crypto", "公钥已存在，忽略响应头中的公钥"));
};
class Li {
  constructor() {
    er(this, "currentToast", []);
    er(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "info",
      mask: !1,
      position: "center",
      zIndex: 9999
    });
  }
  showToast(e, r, l, E) {
    const v = typeof r == "string" ? r : r.title || l;
    this.show({
      ...this.defaultOptions,
      icon: e,
      duration: E || this.defaultOptions.duration,
      title: v
    });
  }
  success(e) {
    this.showToast("success", e, "Operation Successful");
  }
  error(e) {
    this.showToast("error", e, "Operation Failed", 5e3);
  }
  warning(e) {
    this.showToast("warning", e, "Warning", 5e3);
  }
  info(e) {
    this.showToast("info", e, "Information");
  }
  loading(e) {
    this.showToast("loading", e, "Loading Data", -1);
  }
  hide(e) {
    e = e || 0;
    const r = this.currentToast.map((l) => l.id);
    e === 0 ? this.close(r) : setTimeout(() => this.close(r), e);
  }
  close(e) {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : (e.forEach((r) => {
      var l;
      (l = this.currentToast.find((E) => E.id === r)) == null || l.close();
    }), this.currentToast = this.currentToast.filter(
      (r) => !e.includes(r.id)
    ));
  }
  show(e) {
    const { title: r, icon: l, mask: E, duration: v, position: u } = e;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...e,
        title: r,
        icon: l === "warning" ? "error" : l,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: v,
        position: u,
        mask: e.mask,
        success: e.success,
        fail: e.fail,
        complete: e.complete
      });
    else
      switch (this.hide(), l) {
        case "success":
          this.currentToast.push(
            qt.success(r, {
              ...e,
              title: void 0,
              position: "top-center",
              hasMask: E,
              zIndex: e.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "error":
          this.currentToast.push(
            qt.error(r, {
              ...e,
              title: void 0,
              position: "top-center",
              hasMask: E,
              zIndex: e.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "loading":
          this.currentToast.push(
            qt.loading(r, {
              ...e,
              title: void 0,
              position: "top-center",
              hasMask: E,
              zIndex: e.zIndex || 9999,
              closable: !1
            })
          );
          break;
        default:
          this.currentToast.push(
            qt.info(r, {
              ...e,
              title: void 0,
              position: "top-center",
              hasMask: E,
              zIndex: e.zIndex || 9999,
              closable: !1
            })
          );
          break;
      }
  }
}
const yt = new Li(), En = /\$\{([\w\.\[\]0-9]+)\}/g, ki = (t, e) => t.replace(En, (r, l) => {
  var u;
  const E = l.split(".");
  let v = e;
  for (const a of E) {
    if (a.includes("[") && a.includes("]")) {
      const p = a.split("[")[0], f = parseInt(a.split("[")[1].split("]")[0]);
      v = (u = v[p]) == null ? void 0 : u[f];
    } else
      v = v[a];
    if (v === void 0)
      return r;
  }
  return String(v);
}), xn = (t, e) => {
  const r = Array.isArray(e), l = r ? e : [e];
  return l.forEach((E) => {
    if (E && typeof E == "object") {
      for (const v in t) {
        const u = t[v];
        if (typeof u == "string" && En.test(u)) {
          const a = ki(
            u,
            E
          );
          E[v] = a;
        } else E[u] !== void 0 && (E[v] = E[u]);
      }
      E.children && Array.isArray(E.children) && (E.children = xn(t, E.children));
    }
  }), r ? e : l[0];
};
let Sn = "", Hr = null;
const Di = () => Hr ? Hr() : Sn, ji = (t) => {
  Sn = t;
}, Wi = (t) => {
  Hr = t;
}, Mr = /* @__PURE__ */ new Map(), Gr = {
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
    fieldMap: l,
    lastModified: E,
    storage: v = "memory"
  }, u, a = -1) {
    if (u == null) return;
    const p = Qt(t, e, l, r), f = a !== -1 ? Date.now() + a : void 0, S = `frontCache::${p}`, U = {
      data: u,
      expireAt: f,
      lastModified: E ?? Date.now()
    };
    switch (v) {
      case "memory":
        Mr.set(S, U);
        break;
      case "uni":
        uni.setStorageSync(S, JSON.stringify(U));
        break;
      case "session":
        sessionStorage.setItem(S, JSON.stringify(U));
        break;
      case "local":
        localStorage.setItem(S, JSON.stringify(U));
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
    fieldMap: l,
    storage: E = "memory"
  }) {
    const u = `frontCache::${Qt(t, e, l, r)}`;
    let a = null, p;
    switch (E) {
      case "memory":
        a = Mr.get(u);
        break;
      case "uni":
        p = uni.getStorageSync(u), a = p ? JSON.parse(p) : null;
        break;
      case "session":
        p = sessionStorage.getItem(u), a = p ? JSON.parse(p) : null;
        break;
      case "local":
        p = localStorage.getItem(u), a = p ? JSON.parse(p) : null;
        break;
    }
    return a && (!a.expireAt || a.expireAt > Date.now()) ? a.data : (Gr.remove({ key: t, params: e, storage: E }), null);
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
    fieldMap: l,
    storage: E = "memory"
  }) {
    const u = `frontCache::${Qt(t, e, l, r)}`;
    switch (E) {
      case "memory":
        Mr.delete(u);
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
}, Ui = (t) => t ? Array.isArray(t) ? t.length === 0 : typeof t == "object" ? Object.keys(t).length === 0 : !1 : !0, Pi = ai.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), Ut = {}, Oi = 2e3, It = (t, ...e) => {
  if (!e.length) return t;
  const r = e.shift();
  if (r === void 0) return t;
  for (const l in r)
    r.hasOwnProperty(l) && (typeof r[l] == "object" && r[l] !== null && !Array.isArray(r[l]) ? (t[l] || (t[l] = {}), It(t[l], r[l])) : t[l] = r[l]);
  return It(t, ...e);
}, Vi = (t, e, r) => {
  const l = It({}, r, t);
  Object.assign(t, l);
  const E = r.header || {}, v = t.header || {};
  if (typeof e.header == "object")
    t.header = It({}, E, v, e.header);
  else if (typeof e.header == "function") {
    const a = It({}, E, v);
    t.header = e.header(a);
  } else
    t.header = It({}, E, v);
  if (t.header || (t.header = {}), t.header.reqId = Pi(), e.authorize && typeof e.authorize == "function" && e.authorize(t, e, "") === !1)
    return !1;
  const u = zn();
  if (u) {
    const a = u(t);
    if (a !== void 0)
      return a;
  }
  if (e.before) {
    const a = e.before.call(e, t);
    if (a !== void 0)
      return a;
  }
}, Ki = (t, e) => {
  var r;
  if (e.authorize) {
    const l = Di();
    if (!l) {
      const E = `Error, interface ${e.url} requires authorization to access!`;
      return console.error(E), yt.error({ title: E }), !1;
    }
    (r = t.header) != null && r.authorization || (t.header || (t.header = {}), t.header.authorization = "Bearer " + l);
  }
  return !0;
}, Fi = async (t, e) => {
  const r = !!nn();
  it("request", "开始请求", { url: t.url, method: t.method, hasProxy: r });
  try {
    if (!Ki(t, e))
      return Pt("request", "Token注入失败", { url: t.url }), null;
    const l = await Ri(t, e);
    it("request", "发送HTTP请求");
    const { header: E, ...v } = t, u = await Mn.request({
      ...v,
      headers: E
    }), a = {
      statusCode: u.status,
      data: u.data,
      header: u.headers
    };
    return it("request", "HTTP响应完成", {
      statusCode: a.statusCode,
      headerKeys: a.header ? Object.keys(a.header) : [],
      header: a.header
    }), Ja(a.header), a.data = await Za(a, l.aesKey), it("request", "请求完成", { statusCode: a.statusCode }), a;
  } catch (l) {
    const E = l;
    if (E.response) {
      const v = {
        statusCode: E.response.status,
        data: E.response.data,
        header: E.response.headers
      };
      return Ja(v.header), v.data = await Za(v), it("request", "HTTP错误", { statusCode: v.statusCode }), v;
    }
    throw Pt("request", "请求失败", l), l;
  }
}, zr = async (t, e, r, l) => {
  if (r.statusCode >= 200 && r.statusCode < 400) {
    if (e.raw) {
      const v = r.data, u = kt();
      u && u(t, v, r), e.after && e.after.call(e, t, v, r), l.Result = v;
      return;
    }
    const E = r.data;
    if (E.status === gt.SUCCESS) {
      const v = E.data;
      t.method === "POST" && e.fieldMap && v && xn(e.fieldMap, v);
      const u = kt();
      u && u(t, E, r), e.after && e.after.call(e, E, t, r), l.Result = E;
    } else {
      console.error(E), l.Error = {
        status: E.status,
        errno: E.errno,
        msg: E.msg || "Request Error"
      }, l.Result = E;
      const v = kt();
      v && v(t, E, r), e.after && e.after.call(e, E, t, r);
    }
  } else {
    let E;
    const v = r.statusCode;
    switch (v) {
      case 401:
        E = "Unauthorized or Token Expired";
        break;
      case 403:
        E = "Access Forbidden";
        break;
      case 404:
        E = "Request Address Error";
        break;
      case 500:
        E = "Server Exception";
        break;
      default:
        E = "Other Request Error";
        break;
    }
    if (E = `${v}: ${E}`, e.raw) {
      const p = {
        status: gt.ERROR,
        errno: v + 1e3,
        msg: E
      };
      l.Error = p;
      const f = kt();
      f && f(t, p, r), e.after && e.after.call(e, t, p, r);
      return;
    }
    const u = {
      status: gt.ERROR,
      errno: v + 1e3,
      msg: E
    };
    l.Error = u;
    const a = kt();
    a && a(t, u, r), e.after && e.after.call(e, u, t, r);
  }
}, Qr = (t, e) => {
  const r = {
    status: gt.ERROR,
    errno: 1e3,
    msg: "Network Error: " + t.toString()
  };
  e.Error = r;
}, Xr = (t, e, r) => {
  const l = t.loadingText ? 500 : 0;
  setTimeout(() => {
    var E, v;
    yt.hide(), e.Error && (console.error(Et(t), e.Error), t.hideErrorToast || yt.error({ title: e.Error.msg }), t.raw ? e.Result = e.Error : e.Result = {
      status: gt.ERROR,
      errno: e.Error.errno,
      msg: e.Error.msg,
      timestamp: (E = e.Result) == null ? void 0 : E.timestamp,
      data: (v = e.Result) == null ? void 0 : v.data
    }), r(e.Result);
  }, l);
}, vt = async (t, e, r) => {
  const l = Et(Gn());
  if (Vi(t, e, l) === !1) return Promise.resolve(null);
  if (t.loadingText && yt.loading({
    title: t.loadingText.toString()
  }), e.raw)
    return r(t, e);
  if (t.method === "POST") {
    const v = {
      ...e,
      key: e.url,
      params: t.data,
      fields: ["Query", "Option.SelectFields"],
      fieldMap: e.fieldMap
    };
    if (e.cacheTime) {
      const f = Gr.get(v);
      f && setTimeout(() => (yt.hide(), Promise.resolve({
        status: gt.SUCCESS,
        data: f
      })), 500);
    }
    const u = Qt(
      t.url,
      t.data,
      e.fieldMap,
      ["Query", "Option.SelectFields"]
    ), a = Ut[u];
    if (a)
      if (a.expire && a.expire < Date.now())
        delete Ut[u];
      else return a.expire ? new Promise((f) => {
        setTimeout(() => {
          yt.hide(), f(a.result);
        }, 500);
      }) : new Promise((f) => {
        setTimeout(() => {
          yt.hide(), a.sharedPromise.then(f);
        }, 500);
      });
    e.loading = !0;
    const p = r(t, e).then((f) => {
      if (typeof f == "boolean") return f;
      (f == null ? void 0 : f.status) === gt.SUCCESS && !Ui(f == null ? void 0 : f.data) && e.cacheTime && Gr.set(v, f.data, e.cacheTime);
      let S = Ut[u];
      return S.result = f, S.expire = Date.now() + Oi, Ut[u] = S, f;
    }).finally(() => {
      e.loading = !1;
    });
    return Ut[u] = {
      sharedPromise: p
    }, p;
  } else
    return r(t, e);
}, Mi = {
  SITEHOST_API: ""
}, Zi = {}, Ji = {}, mt = (t) => {
  let { api: e, url: r, authorize: l } = t;
  if (r.startsWith("http://") || r.startsWith("https://") || !e)
    return r;
  const E = Mi[e];
  if (!E)
    return yt.error("API domain not found: " + e), !1;
  if (typeof E == "string")
    return E + r;
  if (typeof E == "object") {
    const { host: v, authorize: u } = E;
    return (l === void 0 || l === !1) && (t.authorize = u), r = v + r, r;
  }
  return r;
}, Zt = (t, e) => {
  const r = {
    Result: null
  };
  return new Promise((l) => {
    uni.request({
      ...t,
      success: async (E) => {
        await zr(t, e, E, r);
      },
      fail: (E) => {
        Qr(E, r);
      },
      complete: () => {
        Xr(e, r, l);
      }
    });
  });
}, $i = (t) => {
  const e = mt(t);
  return e === !1 ? Promise.resolve(null) : vt(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    Zt
  );
}, es = (t, e) => {
  const r = mt(t);
  return r === !1 ? Promise.resolve(null) : vt(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: "Saving Data..."
    },
    t,
    Zt
  );
}, ts = (t, e) => {
  const r = mt(t);
  return r === !1 ? Promise.resolve(null) : vt(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "Deleting Data..."
    },
    t,
    Zt
  );
}, rs = (t, e) => {
  const r = mt(t);
  return r === !1 ? Promise.resolve(null) : vt(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    Zt
  );
}, Jt = (t, e) => {
  const r = {
    Result: null
  };
  return new Promise((l) => {
    const E = nn();
    if (E) {
      it("proxy", "使用代理", { url: t.url, method: t.method });
      const v = Et(t), u = Et(e);
      v.crypto = $a(t.url || "", e.api, e.subApp), E(v, u).then(async (a) => {
        a && await zr(t, e, a, r);
      }).catch((a) => {
        Qr(a, r);
      }).finally(() => {
        Xr(e, r, l);
      });
    } else
      Fi(t, e).then(async (v) => {
        v && await zr(t, e, v, r);
      }).catch((v) => {
        Qr(v, r);
      }).finally(() => {
        Xr(e, r, l);
      });
  });
}, as = (t) => {
  const e = mt(t);
  return e === !1 ? Promise.resolve(null) : vt(
    {
      url: e,
      method: "GET",
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    Jt
  );
}, ns = (t, e) => {
  const r = mt(t);
  return r === !1 ? Promise.resolve(null) : vt(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: "Saving Data..."
    },
    t,
    Jt
  );
}, is = (t, e) => {
  const r = mt(t);
  return r === !1 ? Promise.resolve(null) : vt(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: e,
      timeout: t.timeout,
      loadingText: "Deleting Data..."
    },
    t,
    Jt
  );
}, ss = (t, e) => {
  const r = mt(t);
  return r === !1 ? Promise.resolve(null) : vt(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: e ?? t.params,
      timeout: t.timeout,
      loadingText: t.loadingText ?? "Loading Data..."
    },
    t,
    Jt
  );
}, os = (t) => typeof t == "object" && t !== null && !Array.isArray(t) || Array.isArray(t);
export {
  Mi as API_HOST,
  Gr as FrontCache,
  Ji as ICON_HOST,
  gt as ResStatus,
  Zi as SERVER_HOST,
  Fi as coreRequest,
  Et as deepClone,
  xn as fieldMapping,
  kt as getGlobalAfter,
  zn as getGlobalBefore,
  Gn as getGlobalConfig,
  Di as getToken,
  Xi as globalRequestOption,
  mt as hostUrl,
  is as httpDelete,
  as as httpGet,
  ss as httpPost,
  ns as httpPut,
  Yi as initApiLog,
  zi as initCrypto,
  os as isJSON,
  ki as parseFieldTemplate,
  Qi as setRequestProxy,
  ji as setToken,
  Wi as setTokenCallback,
  yt as toast,
  ts as uniDelete,
  $i as uniGet,
  rs as uniPost,
  es as uniPut
};
