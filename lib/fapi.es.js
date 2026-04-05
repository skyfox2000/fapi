var ze = Object.defineProperty;
var Xe = (e, t, r) => t in e ? ze(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var de = (e, t, r) => Xe(e, typeof t != "symbol" ? t + "" : t, r);
import Ge from "axios";
import ae from "vue-m-message";
var X = /* @__PURE__ */ ((e) => (e.SUCCESS = "success", e.ERROR = "error", e))(X || {});
const ce = {
  enabled: !1,
  modules: {
    crypto: !1,
    request: !1,
    proxy: !1,
    cache: !1,
    auth: !1
  }
}, Ct = (e) => {
  e.enabled !== void 0 && (ce.enabled = e.enabled), e.modules && Object.assign(ce.modules, e.modules);
}, Re = (e) => ce.enabled ? ce.modules[e] === !0 : !1, M = (e, t, r) => {
  if (!Re(e))
    return;
  const n = `[${e.toUpperCase()}]`;
  r !== void 0 ? console.log(n, t, r) : console.log(n, t);
}, se = (e, t, r) => {
  const n = `[${e.toUpperCase()}]`;
  r !== void 0 ? console.error(n, t, r) : console.error(n, t);
};
let $ = null;
const U = (e, t) => {
  Re("crypto") && (t !== void 0 ? t instanceof Uint8Array ? console.log(`[Crypto Debug] ${e}:`, oe(t)) : typeof t == "object" ? console.log(`[Crypto Debug] ${e}:`, JSON.stringify(t, null, 2)) : console.log(`[Crypto Debug] ${e}:`, t) : console.log(`[Crypto Debug] ${e}`));
}, Ve = (e) => $ !== null ? !1 : ($ = e, !0), We = () => $ !== null, Je = async (e) => {
  const n = e.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace(/\s/g, ""), o = Uint8Array.from(atob(n), (a) => a.charCodeAt(0));
  return await crypto.subtle.importKey(
    "spki",
    ee(o),
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    !1,
    ["encrypt"]
  );
}, Qe = async () => await crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  !0,
  ["encrypt", "decrypt"]
), Ye = async (e) => {
  const t = await crypto.subtle.exportKey("raw", e);
  return new Uint8Array(t);
}, oe = (e) => {
  const t = new Uint8Array(e);
  let r = "";
  for (let n = 0; n < t.byteLength; n++)
    r += String.fromCharCode(t[n]);
  return btoa(r);
}, Ae = (e) => {
  const t = atob(e), r = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++)
    r[n] = t.charCodeAt(n);
  return r;
}, ee = (e) => e.slice().buffer, Ze = async (e, t) => {
  const r = await Je(t), n = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    r,
    ee(e)
  );
  return oe(n);
}, Ie = async (e, t) => {
  const r = crypto.getRandomValues(new Uint8Array(12)), n = {
    ...e,
    _ts: Date.now()
  }, a = new TextEncoder().encode(JSON.stringify(n)), c = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: ee(r)
    },
    t,
    ee(a)
  );
  return {
    ciphertext: oe(c),
    nonce: oe(r)
  };
}, $e = async (e, t, r) => {
  const n = Ae(e), o = Ae(t), a = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ee(o)
    },
    r,
    ee(n)
  ), i = new TextDecoder().decode(a);
  return JSON.parse(i);
}, et = async (e) => {
  if (!$)
    return null;
  try {
    U("========== 加密请求开始 =========="), U("原始数据", e), U("RSA 公钥", $);
    const t = await Qe(), r = await Ye(t);
    U("AES 密钥 (Base64)", oe(r)), U("AES 密钥 (Hex)", Array.from(r).map((c) => c.toString(16).padStart(2, "0")).join(""));
    const n = await Ze(r, $);
    U("RSA 加密后的 AES 密钥 (X-Encrypted-Key)", n);
    const { ciphertext: o, nonce: a } = await Ie(e, t);
    return U("AES 加密后的数据 (encryptedData)", o), U("Nonce (X-Nonce)", a), U("========== 加密请求结束 =========="), {
      encryptedData: o,
      encryptedKey: n,
      nonce: a,
      aesKey: t
    };
  } catch (t) {
    return console.error("加密请求数据失败:", t), null;
  }
}, tt = async (e, t, r) => {
  U("========== 解密响应开始 =========="), U("加密数据 (ciphertext)", e), U("响应 Nonce (X-Response-Nonce)", t);
  try {
    const n = await $e(e, t, r);
    return U("解密后的数据", n), U("========== 解密响应结束 =========="), n;
  } catch (n) {
    return console.error("解密响应数据失败:", n), U("解密错误", n), U("========== 解密响应结束 =========="), null;
  }
}, Te = (e) => typeof e == "string" && e.length > 0 && /^[A-Za-z0-9+/=]+$/.test(e);
let D = {
  enabled: !1,
  includeApis: [],
  excludeApis: [],
  includeHostKeys: [],
  excludeHostKeys: []
};
const _t = (e) => {
  D = {
    ...D,
    ...e,
    enabled: !0
  };
}, rt = () => We(), nt = (e, t) => {
  if (!rt() || t && D.excludeHostKeys && D.excludeHostKeys.length > 0 && D.excludeHostKeys.includes(t) || D.includeHostKeys && D.includeHostKeys.length > 0 && (!t || !D.includeHostKeys.includes(t)))
    return !1;
  if (D.excludeApis && D.excludeApis.length > 0) {
    for (const r of D.excludeApis)
      if (typeof r == "string") {
        if (e.includes(r))
          return !1;
      } else if (r instanceof RegExp && r.test(e))
        return !1;
  }
  if (!D.includeApis || D.includeApis.length === 0)
    return !0;
  for (const r of D.includeApis)
    if (typeof r == "string") {
      if (e.includes(r))
        return !0;
    } else if (r instanceof RegExp && r.test(e))
      return !0;
  return !1;
}, Pe = {
  header: { "Content-Type": "application/json" }
};
let ve, Ke, Ue = null;
const Rt = (e) => {
  Ue = e;
}, De = () => Ue, Pt = (e) => {
  const { before: t, after: r, ...n } = e;
  t && (ve = t), r && (Ke = r), Object.assign(Pe, n);
}, st = () => Pe, ot = () => ve, te = () => Ke, J = (e) => {
  if (e === null || typeof e != "object" || typeof e == "function")
    return e;
  if (Array.isArray(e)) {
    const r = [];
    for (let n = 0; n < e.length; n++)
      r[n] = J(e[n]);
    return r;
  }
  const t = {};
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = J(e[r]));
  return t;
}, at = (e, t) => e << t | e >>> 32 - t, it = (e) => {
  const t = [];
  for (let w = 0; w < e.length; w++)
    t.push(e.charCodeAt(w));
  const r = t.length * 8;
  for (t.push(128); t.length * 8 % 512 !== 448; )
    t.push(0);
  t.push(r >>> 24 & 255), t.push(r >>> 16 & 255), t.push(r >>> 8 & 255), t.push(r & 255);
  let n = 1732584193, o = 4023233417, a = 2562383102, c = 271733878;
  const i = (w, S, A) => w & S | ~w & A, b = (w, S, A) => w & A | S & ~A, p = (w, S, A) => w ^ S ^ A, T = (w, S, A) => S ^ (w | ~A), P = [
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
  ], N = [
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
  let j = 0;
  for (; j < t.length; ) {
    const w = new Array(16).fill(0);
    for (let h = 0; h < 16; h++)
      w[h] = t[j + h] || 0;
    let S = n, A = o, x = a, L = c;
    for (let h = 0; h < 64; h++) {
      let l, g, k;
      h < 16 ? (l = i(A, x, L), g = h) : h < 32 ? (l = b(A, x, L), g = (5 * h + 1) % 16) : h < 48 ? (l = p(A, x, L), g = (3 * h + 5) % 16) : (l = T(A, x, L), g = 7 * h % 16), k = L, L = x, x = A, A = A + at(S + l + P[h] + w[g] | 0, N[h]), S = k;
    }
    n = n + S | 0, o = o + A | 0, a = a + x | 0, c = c + L | 0, j += 16;
  }
  return [n, o, a, c].map((w) => {
    const S = w & 255, A = w >>> 8 & 255, x = w >>> 16 & 255;
    return [w >>> 24 & 255, x, A, S];
  }).flat().map((w) => w.toString(16).padStart(2, "0")).join("");
}, ct = (e) => it(e), ie = (e, t, r, n) => {
  if (!t) return e;
  let o = J(t);
  r && (o.FieldMap = r), n && n.length > 0 && (n[0].startsWith("-") ? n.forEach((c) => {
    if (c.indexOf(".") > -1) {
      const i = c.split(".");
      let b = o;
      for (let p = 0; p < i.length && (p === i.length - 1 && delete b[i[p]], typeof b[i[p]] == "object" && !Array.isArray(b[i[p]])); p++)
        b = b[i[p]];
    } else delete o[c];
  }) : (o = {}, n.forEach((c) => {
    if (c.indexOf(".") > -1) {
      const i = c.split(".");
      let b = t, p = o;
      for (let T = 0; T < i.length; T++)
        if (T === i.length - 1)
          p[i[T]] = b[i[T]];
        else {
          if (b[i[T]] === null || b[i[T]] === void 0)
            break;
          if (p[i[T]] === void 0)
            if (typeof b[i[T]] != "object" || Array.isArray(b[i[T]])) {
              p[i[T]] = b[i[T]];
              break;
            } else p[i[T]] = {};
          p = p[i[T]], b = b[i[T]];
        }
    } else o[c] = t[c];
  })));
  const a = JSON.stringify(o);
  return `${e}-` + ct(a);
};
var ke = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Z = {}, F = {}, B = {}, m = {}, Ee;
function ut() {
  if (Ee) return m;
  Ee = 1, Object.defineProperty(m, "__esModule", { value: !0 }), m.toBig = m.shrSL = m.shrSH = m.rotrSL = m.rotrSH = m.rotrBL = m.rotrBH = m.rotr32L = m.rotr32H = m.rotlSL = m.rotlSH = m.rotlBL = m.rotlBH = m.add5L = m.add5H = m.add4L = m.add4H = m.add3L = m.add3H = void 0, m.add = A, m.fromBig = r, m.split = n;
  const e = /* @__PURE__ */ BigInt(2 ** 32 - 1), t = /* @__PURE__ */ BigInt(32);
  function r(d, u = !1) {
    return u ? { h: Number(d & e), l: Number(d >> t & e) } : { h: Number(d >> t & e) | 0, l: Number(d & e) | 0 };
  }
  function n(d, u = !1) {
    const f = d.length;
    let _ = new Uint32Array(f), R = new Uint32Array(f);
    for (let v = 0; v < f; v++) {
      const { h: Q, l: Y } = r(d[v], u);
      [_[v], R[v]] = [Q, Y];
    }
    return [_, R];
  }
  const o = (d, u) => BigInt(d >>> 0) << t | BigInt(u >>> 0);
  m.toBig = o;
  const a = (d, u, f) => d >>> f;
  m.shrSH = a;
  const c = (d, u, f) => d << 32 - f | u >>> f;
  m.shrSL = c;
  const i = (d, u, f) => d >>> f | u << 32 - f;
  m.rotrSH = i;
  const b = (d, u, f) => d << 32 - f | u >>> f;
  m.rotrSL = b;
  const p = (d, u, f) => d << 64 - f | u >>> f - 32;
  m.rotrBH = p;
  const T = (d, u, f) => d >>> f - 32 | u << 64 - f;
  m.rotrBL = T;
  const P = (d, u) => u;
  m.rotr32H = P;
  const N = (d, u) => d;
  m.rotr32L = N;
  const j = (d, u, f) => d << f | u >>> 32 - f;
  m.rotlSH = j;
  const E = (d, u, f) => u << f | d >>> 32 - f;
  m.rotlSL = E;
  const w = (d, u, f) => u << f - 32 | d >>> 64 - f;
  m.rotlBH = w;
  const S = (d, u, f) => d << f - 32 | u >>> 64 - f;
  m.rotlBL = S;
  function A(d, u, f, _) {
    const R = (u >>> 0) + (_ >>> 0);
    return { h: d + f + (R / 2 ** 32 | 0) | 0, l: R | 0 };
  }
  const x = (d, u, f) => (d >>> 0) + (u >>> 0) + (f >>> 0);
  m.add3L = x;
  const L = (d, u, f, _) => u + f + _ + (d / 2 ** 32 | 0) | 0;
  m.add3H = L;
  const h = (d, u, f, _) => (d >>> 0) + (u >>> 0) + (f >>> 0) + (_ >>> 0);
  m.add4L = h;
  const l = (d, u, f, _, R) => u + f + _ + R + (d / 2 ** 32 | 0) | 0;
  m.add4H = l;
  const g = (d, u, f, _, R) => (d >>> 0) + (u >>> 0) + (f >>> 0) + (_ >>> 0) + (R >>> 0);
  m.add5L = g;
  const k = (d, u, f, _, R, v) => u + f + _ + R + v + (d / 2 ** 32 | 0) | 0;
  m.add5H = k;
  const O = {
    fromBig: r,
    split: n,
    toBig: o,
    shrSH: a,
    shrSL: c,
    rotrSH: i,
    rotrSL: b,
    rotrBH: p,
    rotrBL: T,
    rotr32H: P,
    rotr32L: N,
    rotlSH: j,
    rotlSL: E,
    rotlBH: w,
    rotlBL: S,
    add: A,
    add3L: x,
    add3H: L,
    add4L: h,
    add4H: l,
    add5H: k,
    add5L: g
  };
  return m.default = O, m;
}
var fe = {}, re = {}, xe;
function lt() {
  return xe || (xe = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.crypto = void 0, re.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), re;
}
var Oe;
function dt() {
  return Oe || (Oe = 1, (function(e) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(e, "__esModule", { value: !0 }), e.wrapXOFConstructorWithOpts = e.wrapConstructorWithOpts = e.wrapConstructor = e.Hash = e.nextTick = e.swap32IfBE = e.byteSwapIfBE = e.swap8IfBE = e.isLE = void 0, e.isBytes = r, e.anumber = n, e.abytes = o, e.ahash = a, e.aexists = c, e.aoutput = i, e.u8 = b, e.u32 = p, e.clean = T, e.createView = P, e.rotr = N, e.rotl = j, e.byteSwap = E, e.byteSwap32 = w, e.bytesToHex = x, e.hexToBytes = l, e.asyncLoop = k, e.utf8ToBytes = O, e.bytesToUtf8 = d, e.toBytes = u, e.kdfInputToBytes = f, e.concatBytes = _, e.checkOpts = R, e.createHasher = Q, e.createOptHasher = Y, e.createXOFer = W, e.randomBytes = Ne;
    const t = /* @__PURE__ */ lt();
    function r(s) {
      return s instanceof Uint8Array || ArrayBuffer.isView(s) && s.constructor.name === "Uint8Array";
    }
    function n(s) {
      if (!Number.isSafeInteger(s) || s < 0)
        throw new Error("positive integer expected, got " + s);
    }
    function o(s, ...y) {
      if (!r(s))
        throw new Error("Uint8Array expected");
      if (y.length > 0 && !y.includes(s.length))
        throw new Error("Uint8Array expected of length " + y + ", got length=" + s.length);
    }
    function a(s) {
      if (typeof s != "function" || typeof s.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      n(s.outputLen), n(s.blockLen);
    }
    function c(s, y = !0) {
      if (s.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (y && s.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function i(s, y) {
      o(s);
      const H = y.outputLen;
      if (s.length < H)
        throw new Error("digestInto() expects output buffer of length at least " + H);
    }
    function b(s) {
      return new Uint8Array(s.buffer, s.byteOffset, s.byteLength);
    }
    function p(s) {
      return new Uint32Array(s.buffer, s.byteOffset, Math.floor(s.byteLength / 4));
    }
    function T(...s) {
      for (let y = 0; y < s.length; y++)
        s[y].fill(0);
    }
    function P(s) {
      return new DataView(s.buffer, s.byteOffset, s.byteLength);
    }
    function N(s, y) {
      return s << 32 - y | s >>> y;
    }
    function j(s, y) {
      return s << y | s >>> 32 - y >>> 0;
    }
    e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    function E(s) {
      return s << 24 & 4278190080 | s << 8 & 16711680 | s >>> 8 & 65280 | s >>> 24 & 255;
    }
    e.swap8IfBE = e.isLE ? (s) => s : (s) => E(s), e.byteSwapIfBE = e.swap8IfBE;
    function w(s) {
      for (let y = 0; y < s.length; y++)
        s[y] = E(s[y]);
      return s;
    }
    e.swap32IfBE = e.isLE ? (s) => s : w;
    const S = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", A = /* @__PURE__ */ Array.from({ length: 256 }, (s, y) => y.toString(16).padStart(2, "0"));
    function x(s) {
      if (o(s), S)
        return s.toHex();
      let y = "";
      for (let H = 0; H < s.length; H++)
        y += A[s[H]];
      return y;
    }
    const L = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function h(s) {
      if (s >= L._0 && s <= L._9)
        return s - L._0;
      if (s >= L.A && s <= L.F)
        return s - (L.A - 10);
      if (s >= L.a && s <= L.f)
        return s - (L.a - 10);
    }
    function l(s) {
      if (typeof s != "string")
        throw new Error("hex string expected, got " + typeof s);
      if (S)
        return Uint8Array.fromHex(s);
      const y = s.length, H = y / 2;
      if (y % 2)
        throw new Error("hex string expected, got unpadded hex of length " + y);
      const C = new Uint8Array(H);
      for (let K = 0, q = 0; K < H; K++, q += 2) {
        const we = h(s.charCodeAt(q)), Se = h(s.charCodeAt(q + 1));
        if (we === void 0 || Se === void 0) {
          const Fe = s[q] + s[q + 1];
          throw new Error('hex string expected, got non-hex character "' + Fe + '" at index ' + q);
        }
        C[K] = we * 16 + Se;
      }
      return C;
    }
    const g = async () => {
    };
    e.nextTick = g;
    async function k(s, y, H) {
      let C = Date.now();
      for (let K = 0; K < s; K++) {
        H(K);
        const q = Date.now() - C;
        q >= 0 && q < y || (await (0, e.nextTick)(), C += q);
      }
    }
    function O(s) {
      if (typeof s != "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(s));
    }
    function d(s) {
      return new TextDecoder().decode(s);
    }
    function u(s) {
      return typeof s == "string" && (s = O(s)), o(s), s;
    }
    function f(s) {
      return typeof s == "string" && (s = O(s)), o(s), s;
    }
    function _(...s) {
      let y = 0;
      for (let C = 0; C < s.length; C++) {
        const K = s[C];
        o(K), y += K.length;
      }
      const H = new Uint8Array(y);
      for (let C = 0, K = 0; C < s.length; C++) {
        const q = s[C];
        H.set(q, K), K += q.length;
      }
      return H;
    }
    function R(s, y) {
      if (y !== void 0 && {}.toString.call(y) !== "[object Object]")
        throw new Error("options should be object or undefined");
      return Object.assign(s, y);
    }
    class v {
    }
    e.Hash = v;
    function Q(s) {
      const y = (C) => s().update(u(C)).digest(), H = s();
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = () => s(), y;
    }
    function Y(s) {
      const y = (C, K) => s(K).update(u(C)).digest(), H = s({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (C) => s(C), y;
    }
    function W(s) {
      const y = (C, K) => s(K).update(u(C)).digest(), H = s({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (C) => s(C), y;
    }
    e.wrapConstructor = Q, e.wrapConstructorWithOpts = Y, e.wrapXOFConstructorWithOpts = W;
    function Ne(s = 32) {
      if (t.crypto && typeof t.crypto.getRandomValues == "function")
        return t.crypto.getRandomValues(new Uint8Array(s));
      if (t.crypto && typeof t.crypto.randomBytes == "function")
        return Uint8Array.from(t.crypto.randomBytes(s));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(fe)), fe;
}
var Le;
function ft() {
  if (Le) return B;
  Le = 1, Object.defineProperty(B, "__esModule", { value: !0 }), B.shake256 = B.shake128 = B.keccak_512 = B.keccak_384 = B.keccak_256 = B.keccak_224 = B.sha3_512 = B.sha3_384 = B.sha3_256 = B.sha3_224 = B.Keccak = void 0, B.keccakP = S;
  const e = /* @__PURE__ */ ut(), t = /* @__PURE__ */ dt(), r = BigInt(0), n = BigInt(1), o = BigInt(2), a = BigInt(7), c = BigInt(256), i = BigInt(113), b = [], p = [], T = [];
  for (let h = 0, l = n, g = 1, k = 0; h < 24; h++) {
    [g, k] = [k, (2 * g + 3 * k) % 5], b.push(2 * (5 * k + g)), p.push((h + 1) * (h + 2) / 2 % 64);
    let O = r;
    for (let d = 0; d < 7; d++)
      l = (l << n ^ (l >> a) * i) % c, l & o && (O ^= n << (n << /* @__PURE__ */ BigInt(d)) - n);
    T.push(O);
  }
  const P = (0, e.split)(T, !0), N = P[0], j = P[1], E = (h, l, g) => g > 32 ? (0, e.rotlBH)(h, l, g) : (0, e.rotlSH)(h, l, g), w = (h, l, g) => g > 32 ? (0, e.rotlBL)(h, l, g) : (0, e.rotlSL)(h, l, g);
  function S(h, l = 24) {
    const g = new Uint32Array(10);
    for (let k = 24 - l; k < 24; k++) {
      for (let u = 0; u < 10; u++)
        g[u] = h[u] ^ h[u + 10] ^ h[u + 20] ^ h[u + 30] ^ h[u + 40];
      for (let u = 0; u < 10; u += 2) {
        const f = (u + 8) % 10, _ = (u + 2) % 10, R = g[_], v = g[_ + 1], Q = E(R, v, 1) ^ g[f], Y = w(R, v, 1) ^ g[f + 1];
        for (let W = 0; W < 50; W += 10)
          h[u + W] ^= Q, h[u + W + 1] ^= Y;
      }
      let O = h[2], d = h[3];
      for (let u = 0; u < 24; u++) {
        const f = p[u], _ = E(O, d, f), R = w(O, d, f), v = b[u];
        O = h[v], d = h[v + 1], h[v] = _, h[v + 1] = R;
      }
      for (let u = 0; u < 50; u += 10) {
        for (let f = 0; f < 10; f++)
          g[f] = h[u + f];
        for (let f = 0; f < 10; f++)
          h[u + f] ^= ~g[(f + 2) % 10] & g[(f + 4) % 10];
      }
      h[0] ^= N[k], h[1] ^= j[k];
    }
    (0, t.clean)(g);
  }
  class A extends t.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(l, g, k, O = !1, d = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = l, this.suffix = g, this.outputLen = k, this.enableXOF = O, this.rounds = d, (0, t.anumber)(k), !(0 < l && l < 200))
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
      const { blockLen: g, state: k } = this, O = l.length;
      for (let d = 0; d < O; ) {
        const u = Math.min(g - this.pos, O - d);
        for (let f = 0; f < u; f++)
          k[this.pos++] ^= l[d++];
        this.pos === g && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: l, suffix: g, pos: k, blockLen: O } = this;
      l[k] ^= g, (g & 128) !== 0 && k === O - 1 && this.keccak(), l[O - 1] ^= 128, this.keccak();
    }
    writeInto(l) {
      (0, t.aexists)(this, !1), (0, t.abytes)(l), this.finish();
      const g = this.state, { blockLen: k } = this;
      for (let O = 0, d = l.length; O < d; ) {
        this.posOut >= k && this.keccak();
        const u = Math.min(k - this.posOut, d - O);
        l.set(g.subarray(this.posOut, this.posOut + u), O), this.posOut += u, O += u;
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
      const { blockLen: g, suffix: k, outputLen: O, rounds: d, enableXOF: u } = this;
      return l || (l = new A(g, k, O, u, d)), l.state32.set(this.state32), l.pos = this.pos, l.posOut = this.posOut, l.finished = this.finished, l.rounds = d, l.suffix = k, l.outputLen = O, l.enableXOF = u, l.destroyed = this.destroyed, l;
    }
  }
  B.Keccak = A;
  const x = (h, l, g) => (0, t.createHasher)(() => new A(l, h, g));
  B.sha3_224 = x(6, 144, 224 / 8), B.sha3_256 = x(6, 136, 256 / 8), B.sha3_384 = x(6, 104, 384 / 8), B.sha3_512 = x(6, 72, 512 / 8), B.keccak_224 = x(1, 144, 224 / 8), B.keccak_256 = x(1, 136, 256 / 8), B.keccak_384 = x(1, 104, 384 / 8), B.keccak_512 = x(1, 72, 512 / 8);
  const L = (h, l, g) => (0, t.createXOFer)((k = {}) => new A(l, h, k.dkLen === void 0 ? g : k.dkLen, !0));
  return B.shake128 = L(31, 168, 128 / 8), B.shake256 = L(31, 136, 256 / 8), B;
}
var Be;
function ht() {
  if (Be) return F;
  Be = 1;
  const { sha3_512: e } = /* @__PURE__ */ ft(), t = 24, r = 32, n = (E = 4, w = Math.random) => {
    let S = "";
    for (; S.length < E; )
      S = S + Math.floor(w() * 36).toString(36);
    return S;
  };
  function o(E) {
    let w = 8n, S = 0n;
    for (const A of E.values()) {
      const x = BigInt(A);
      S = (S << w) + x;
    }
    return S;
  }
  const a = (E = "") => o(e(E)).toString(36).slice(1), c = Array.from(
    { length: 26 },
    (E, w) => String.fromCharCode(w + 97)
  ), i = (E) => c[Math.floor(E() * c.length)], b = ({
    globalObj: E = typeof ke < "u" ? ke : typeof window < "u" ? window : {},
    random: w = Math.random
  } = {}) => {
    const S = Object.keys(E).toString(), A = S.length ? S + n(r, w) : n(r, w);
    return a(A).substring(0, r);
  }, p = (E) => () => E++, T = 476782367, P = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: E = Math.random,
    counter: w = p(Math.floor(E() * T)),
    length: S = t,
    fingerprint: A = b({ random: E })
  } = {}) => function() {
    const L = i(E), h = Date.now().toString(36), l = w().toString(36), g = n(S, E), k = `${h + g + l + A}`;
    return `${L + a(k).substring(1, S)}`;
  }, N = P(), j = (E, { minLength: w = 2, maxLength: S = r } = {}) => {
    const A = E.length, x = /^[0-9a-z]+$/;
    try {
      if (typeof E == "string" && A >= w && A <= S && x.test(E))
        return !0;
    } finally {
    }
    return !1;
  };
  return F.getConstants = () => ({ defaultLength: t, bigLength: r }), F.init = P, F.createId = N, F.bufToBigInt = o, F.createCounter = p, F.createFingerprint = b, F.isCuid = j, F;
}
var He;
function yt() {
  if (He) return Z;
  He = 1;
  const { createId: e, init: t, getConstants: r, isCuid: n } = ht();
  return Z.createId = e, Z.init = t, Z.getConstants = r, Z.isCuid = n, Z;
}
var pt = yt();
const gt = async (e, t) => {
  var o;
  const r = { encrypted: !1 };
  if (!nt(e.url || "", t.api) || ((o = e.method) == null ? void 0 : o.toUpperCase()) === "GET" || !e.data)
    return r;
  try {
    const a = await et(e.data);
    if (a)
      return M("crypto", "请求加密", { originalData: e.data }), e.data = a.encryptedData, e.header || (e.header = {}), e.header["X-Encrypted-Key"] = a.encryptedKey, e.header["X-Nonce"] = a.nonce, M("crypto", "请求加密完成"), { encrypted: !0, aesKey: a.aesKey };
  } catch (a) {
    se("crypto", "请求加密失败", a);
  }
  return r;
}, Ce = async (e, t) => {
  var n, o;
  const r = ((n = e.header) == null ? void 0 : n["x-response-nonce"]) || ((o = e.header) == null ? void 0 : o["X-Response-Nonce"]);
  if (r && e.data && t)
    try {
      let a = null;
      if (typeof e.data == "string" && Te(e.data) ? a = e.data : typeof e.data == "object" && e.data !== null && "encrypted" in e.data && typeof e.data.encrypted == "string" && (a = e.data.encrypted), a && Te(a)) {
        const c = await tt(a, r, t);
        if (c !== null)
          return M("crypto", "响应解密", { decryptedData: c }), c;
        se("crypto", "响应解密失败: 返回null", { nonce: r });
      }
    } catch (a) {
      se("crypto", "响应解密失败", a);
    }
  return e.data;
}, _e = (e) => {
  if (!e) return;
  const t = e["x-public-key"] || e["X-Public-Key"];
  t && (Ve(t) ? M("crypto", "从响应头缓存公钥成功") : M("crypto", "公钥已存在，忽略响应头中的公钥"));
};
class bt {
  constructor() {
    de(this, "currentToast", []);
    de(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "info",
      mask: !1,
      position: "center",
      zIndex: 9999
    });
  }
  showToast(t, r, n, o) {
    const a = typeof r == "string" ? r : r.title || n;
    this.show({
      ...this.defaultOptions,
      icon: t,
      duration: o || this.defaultOptions.duration,
      title: a
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
    const r = this.currentToast.map((n) => n.id);
    t === 0 ? this.close(r) : setTimeout(() => this.close(r), t);
  }
  close(t) {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : (t.forEach((r) => {
      var n;
      (n = this.currentToast.find((o) => o.id === r)) == null || n.close();
    }), this.currentToast = this.currentToast.filter(
      (r) => !t.includes(r.id)
    ));
  }
  show(t) {
    const { title: r, icon: n, mask: o, duration: a, position: c } = t;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...t,
        title: r,
        icon: n === "warning" ? "error" : n,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: a,
        position: c,
        mask: t.mask,
        success: t.success,
        fail: t.fail,
        complete: t.complete
      });
    else
      switch (this.hide(), n) {
        case "success":
          this.currentToast.push(
            ae.success(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: o,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "error":
          this.currentToast.push(
            ae.error(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: o,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "loading":
          this.currentToast.push(
            ae.loading(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: o,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        default:
          this.currentToast.push(
            ae.info(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: o,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
      }
  }
}
const z = new bt(), qe = /\$\{([\w\.\[\]0-9]+)\}/g, mt = (e, t) => e.replace(qe, (r, n) => {
  var c;
  const o = n.split(".");
  let a = t;
  for (const i of o) {
    if (i.includes("[") && i.includes("]")) {
      const b = i.split("[")[0], p = parseInt(i.split("[")[1].split("]")[0]);
      a = (c = a[b]) == null ? void 0 : c[p];
    } else
      a = a[i];
    if (a === void 0)
      return r;
  }
  return String(a);
}), je = (e, t) => {
  const r = Array.isArray(t), n = r ? t : [t];
  return n.forEach((o) => {
    if (o && typeof o == "object") {
      for (const a in e) {
        const c = e[a];
        if (typeof c == "string" && qe.test(c)) {
          const i = mt(
            c,
            o
          );
          o[a] = i;
        } else o[c] !== void 0 && (o[a] = o[c]);
      }
      o.children && Array.isArray(o.children) && (o.children = je(e, o.children));
    }
  }), r ? t : n[0];
};
let Me = "", ye = null;
const wt = () => ye ? ye() : Me, vt = (e) => {
  Me = e;
}, Kt = (e) => {
  ye = e;
}, he = /* @__PURE__ */ new Map(), pe = {
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
    fieldMap: n,
    lastModified: o,
    storage: a = "memory"
  }, c, i = -1) {
    if (c == null) return;
    const b = ie(e, t, n, r), p = i !== -1 ? Date.now() + i : void 0, T = `frontCache::${b}`, P = {
      data: c,
      expireAt: p,
      lastModified: o ?? Date.now()
    };
    switch (a) {
      case "memory":
        he.set(T, P);
        break;
      case "uni":
        uni.setStorageSync(T, JSON.stringify(P));
        break;
      case "session":
        sessionStorage.setItem(T, JSON.stringify(P));
        break;
      case "local":
        localStorage.setItem(T, JSON.stringify(P));
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
    fieldMap: n,
    storage: o = "memory"
  }) {
    const c = `frontCache::${ie(e, t, n, r)}`;
    let i = null, b;
    switch (o) {
      case "memory":
        i = he.get(c);
        break;
      case "uni":
        b = uni.getStorageSync(c), i = b ? JSON.parse(b) : null;
        break;
      case "session":
        b = sessionStorage.getItem(c), i = b ? JSON.parse(b) : null;
        break;
      case "local":
        b = localStorage.getItem(c), i = b ? JSON.parse(b) : null;
        break;
    }
    return i && (!i.expireAt || i.expireAt > Date.now()) ? i.data : (pe.remove({ key: e, params: t, storage: o }), null);
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
    fieldMap: n,
    storage: o = "memory"
  }) {
    const c = `frontCache::${ie(e, t, n, r)}`;
    switch (o) {
      case "memory":
        he.delete(c);
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
}, St = (e) => e ? Array.isArray(e) ? e.length === 0 : typeof e == "object" ? Object.keys(e).length === 0 : !1 : !0, At = pt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), ne = {}, Tt = 2e3, I = (e, ...t) => {
  if (!t.length) return e;
  const r = t.shift();
  if (r === void 0) return e;
  for (const n in r)
    r.hasOwnProperty(n) && (typeof r[n] == "object" && r[n] !== null && !Array.isArray(r[n]) ? (e[n] || (e[n] = {}), I(e[n], r[n])) : e[n] = r[n]);
  return I(e, ...t);
}, kt = (e, t, r) => {
  const n = I({}, r, e);
  Object.assign(e, n);
  const o = r.header || {}, a = e.header || {};
  if (typeof t.header == "object")
    e.header = I({}, o, a, t.header);
  else if (typeof t.header == "function") {
    const i = I({}, o, a);
    e.header = t.header(i);
  } else
    e.header = I({}, o, a);
  if (e.header || (e.header = {}), e.header.reqId = At(), t.authorize && typeof t.authorize == "function" && t.authorize(e, t, "") === !1)
    return !1;
  const c = ot();
  if (c) {
    const i = c(e);
    if (i !== void 0)
      return i;
  }
  if (t.before) {
    const i = t.before.call(t, e);
    if (i !== void 0)
      return i;
  }
}, Et = (e, t) => {
  var r;
  if (t.authorize) {
    const n = wt();
    if (!n) {
      const o = `Error, interface ${t.url} requires authorization to access!`;
      return console.error(o), z.error({ title: o }), !1;
    }
    (r = e.header) != null && r.authorization || (e.header || (e.header = {}), e.header.authorization = "Bearer " + n);
  }
  return !0;
}, xt = async (e, t) => {
  const r = !!De();
  M("request", "开始请求", { url: e.url, method: e.method, hasProxy: r });
  try {
    if (!Et(e, t))
      return se("request", "Token注入失败", { url: e.url }), null;
    const n = await gt(e, t);
    M("request", "发送HTTP请求");
    const { header: o, ...a } = e, c = await Ge.request({
      ...a,
      headers: o
    }), i = {
      statusCode: c.status,
      data: c.data,
      header: c.headers
    };
    return M("request", "HTTP响应完成", {
      statusCode: i.statusCode,
      headerKeys: i.header ? Object.keys(i.header) : [],
      header: i.header
    }), _e(i.header), i.data = await Ce(i, n.aesKey), M("request", "请求完成", { statusCode: i.statusCode }), i;
  } catch (n) {
    const o = n;
    if (o.response) {
      const a = {
        statusCode: o.response.status,
        data: o.response.data,
        header: o.response.headers
      };
      return _e(a.header), a.data = await Ce(a), M("request", "HTTP错误", { statusCode: a.statusCode }), a;
    }
    throw se("request", "请求失败", n), n;
  }
}, ge = async (e, t, r, n) => {
  if (r.statusCode >= 200 && r.statusCode < 400) {
    if (t.raw) {
      const a = r.data, c = te();
      c && c(e, a, r), t.after && t.after.call(t, e, a, r), n.Result = a;
      return;
    }
    const o = r.data;
    if (o.status === X.SUCCESS) {
      const a = o.data;
      e.method === "POST" && t.fieldMap && a && je(t.fieldMap, a);
      const c = te();
      c && c(e, o, r), t.after && t.after.call(t, o, e, r), n.Result = o;
    } else {
      console.error(o), n.Error = {
        status: o.status,
        errno: o.errno,
        msg: o.msg || "Request Error"
      }, n.Result = o;
      const a = te();
      a && a(e, o, r), t.after && t.after.call(t, o, e, r);
    }
  } else {
    let o;
    const a = r.statusCode;
    switch (a) {
      case 401:
        o = "Unauthorized or Token Expired";
        break;
      case 403:
        o = "Access Forbidden";
        break;
      case 404:
        o = "Request Address Error";
        break;
      case 500:
        o = "Server Exception";
        break;
      default:
        o = "Other Request Error";
        break;
    }
    if (o = `${a}: ${o}`, t.raw) {
      const b = {
        status: X.ERROR,
        errno: a + 1e3,
        msg: o
      };
      n.Error = b;
      const p = te();
      p && p(e, b, r), t.after && t.after.call(t, e, b, r);
      return;
    }
    const c = {
      status: X.ERROR,
      errno: a + 1e3,
      msg: o
    };
    n.Error = c;
    const i = te();
    i && i(e, c, r), t.after && t.after.call(t, c, e, r);
  }
}, be = (e, t) => {
  console.error(e);
  const r = {
    status: X.ERROR,
    errno: 1e3,
    msg: "Network Error: " + e.toString()
  };
  t.Error = r;
}, me = (e, t, r) => {
  const n = e.loadingText ? 500 : 0;
  setTimeout(() => {
    var o, a;
    z.hide(), t.Error && (console.error(J(e), t.Error), e.hideErrorToast || z.error({ title: t.Error.msg }), e.raw ? t.Result = t.Error : t.Result = {
      status: X.ERROR,
      errno: t.Error.errno,
      msg: t.Error.msg,
      timestamp: (o = t.Result) == null ? void 0 : o.timestamp,
      data: (a = t.Result) == null ? void 0 : a.data
    }), r(t.Result);
  }, n);
}, G = async (e, t, r) => {
  const n = J(st());
  if (kt(e, t, n) === !1) return Promise.resolve(null);
  if (e.loadingText && z.loading({
    title: e.loadingText.toString()
  }), t.raw)
    return r(e, t);
  if (e.method === "POST") {
    const a = {
      ...t,
      key: t.url,
      params: e.data,
      fields: ["Query", "Option.SelectFields"],
      fieldMap: t.fieldMap
    };
    if (t.cacheTime) {
      const p = pe.get(a);
      p && setTimeout(() => (z.hide(), Promise.resolve({
        status: X.SUCCESS,
        data: p
      })), 500);
    }
    const c = ie(
      e.url,
      e.data,
      t.fieldMap,
      ["Query", "Option.SelectFields"]
    ), i = ne[c];
    if (i)
      if (i.expire && i.expire < Date.now())
        delete ne[c];
      else return i.expire ? new Promise((p) => {
        setTimeout(() => {
          z.hide(), p(i.result);
        }, 500);
      }) : new Promise((p) => {
        setTimeout(() => {
          z.hide(), i.sharedPromise.then(p);
        }, 500);
      });
    t.loading = !0;
    const b = r(e, t).then((p) => {
      if (typeof p == "boolean") return p;
      (p == null ? void 0 : p.status) === X.SUCCESS && !St(p == null ? void 0 : p.data) && t.cacheTime && pe.set(a, p.data, t.cacheTime);
      let T = ne[c];
      return T.result = p, T.expire = Date.now() + Tt, ne[c] = T, p;
    }).finally(() => {
      t.loading = !1;
    });
    return ne[c] = {
      sharedPromise: b
    }, b;
  } else
    return r(e, t);
}, Ot = {
  SITEHOST_API: ""
}, Ut = {}, Dt = {}, V = (e) => {
  let { api: t, url: r, authorize: n } = e;
  if (r.startsWith("http://") || r.startsWith("https://") || !t)
    return r;
  const o = Ot[t];
  if (!o)
    return z.error("API domain not found: " + t), !1;
  if (typeof o == "string")
    return o + r;
  if (typeof o == "object") {
    const { host: a, authorize: c } = o;
    return (n === void 0 || n === !1) && (e.authorize = c), r = a + r, r;
  }
  return r;
}, ue = (e, t) => {
  const r = {
    Result: null
  };
  return new Promise((n) => {
    uni.request({
      ...e,
      success: async (o) => {
        await ge(e, t, o, r);
      },
      fail: (o) => {
        be(o, r);
      },
      complete: () => {
        me(t, r, n);
      }
    });
  });
}, qt = (e) => {
  const t = V(e);
  return t === !1 ? Promise.resolve(null) : G(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    ue
  );
}, jt = (e, t) => {
  const r = V(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: "Saving Data..."
    },
    e,
    ue
  );
}, Mt = (e, t) => {
  const r = V(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "Deleting Data..."
    },
    e,
    ue
  );
}, Nt = (e, t) => {
  const r = V(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    ue
  );
}, le = (e, t) => {
  const r = {
    Result: null
  };
  return new Promise((n) => {
    const o = De();
    if (o) {
      M("proxy", "使用代理", { url: e.url, method: e.method });
      const a = J(e), c = J(t);
      o(a, c).then(async (i) => {
        i && await ge(e, t, i, r);
      }).catch((i) => {
        be(i, r);
      }).finally(() => {
        me(t, r, n);
      });
    } else
      xt(e, t).then(async (a) => {
        a && await ge(e, t, a, r);
      }).catch((a) => {
        be(a, r);
      }).finally(() => {
        me(t, r, n);
      });
  });
}, Ft = (e) => {
  const t = V(e);
  return t === !1 ? Promise.resolve(null) : G(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    le
  );
}, zt = (e, t) => {
  const r = V(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "PUT",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: "Saving Data..."
    },
    e,
    le
  );
}, Xt = (e, t) => {
  const r = V(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "Deleting Data..."
    },
    e,
    le
  );
}, Gt = (e, t) => {
  const r = V(e);
  return r === !1 ? Promise.resolve(null) : G(
    {
      url: r,
      dataType: "json",
      method: "POST",
      data: t ?? e.params,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    le
  );
}, Vt = (e) => typeof e == "object" && e !== null && !Array.isArray(e) || Array.isArray(e);
export {
  Ot as API_HOST,
  pe as FrontCache,
  Dt as ICON_HOST,
  X as ResStatus,
  Ut as SERVER_HOST,
  xt as coreRequest,
  J as deepClone,
  je as fieldMapping,
  te as getGlobalAfter,
  ot as getGlobalBefore,
  st as getGlobalConfig,
  wt as getToken,
  Pt as globalRequestOption,
  V as hostUrl,
  Xt as httpDelete,
  Ft as httpGet,
  Gt as httpPost,
  zt as httpPut,
  _t as initCrypto,
  Ct as initLog,
  Vt as isJSON,
  mt as parseFieldTemplate,
  Rt as setRequestProxy,
  vt as setToken,
  Kt as setTokenCallback,
  z as toast,
  Mt as uniDelete,
  qt as uniGet,
  Nt as uniPost,
  jt as uniPut
};
