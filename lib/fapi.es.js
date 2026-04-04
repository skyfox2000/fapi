var Ge = Object.defineProperty;
var Ve = (e, t, r) => t in e ? Ge(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var de = (e, t, r) => Ve(e, typeof t != "symbol" ? t + "" : t, r);
import We from "axios";
import ie from "vue-m-message";
var X = /* @__PURE__ */ ((e) => (e.SUCCESS = "success", e.ERROR = "error", e))(X || {});
const le = {
  enabled: !1,
  modules: {
    crypto: !1,
    request: !1,
    proxy: !1,
    cache: !1,
    auth: !1
  }
}, _t = (e) => {
  e.enabled !== void 0 && (le.enabled = e.enabled), e.modules && Object.assign(le.modules, e.modules);
}, Pe = (e) => le.enabled ? le.modules[e] === !0 : !1, M = (e, t, r) => {
  if (!Pe(e))
    return;
  const s = `[${e.toUpperCase()}]`;
  r !== void 0 ? console.log(s, t, r) : console.log(s, t);
}, ae = (e, t, r) => {
  const s = `[${e.toUpperCase()}]`;
  r !== void 0 ? console.error(s, t, r) : console.error(s, t);
};
let ee = null, J = null;
const P = (e, t) => {
  Pe("crypto") && (t !== void 0 ? t instanceof Uint8Array ? console.log(`[Crypto Debug] ${e}:`, te(t)) : typeof t == "object" ? console.log(`[Crypto Debug] ${e}:`, JSON.stringify(t, null, 2)) : console.log(`[Crypto Debug] ${e}:`, t) : console.log(`[Crypto Debug] ${e}`));
}, Je = (e) => ee !== null ? !1 : (ee = e, !0), Qe = () => ee !== null, Ye = async (e) => {
  const s = e.replace("-----BEGIN PUBLIC KEY-----", "").replace("-----END PUBLIC KEY-----", "").replace(/\s/g, ""), n = Uint8Array.from(atob(s), (a) => a.charCodeAt(0));
  return await crypto.subtle.importKey(
    "spki",
    re(n),
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    !1,
    ["encrypt"]
  );
}, Ze = async () => await crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  !0,
  ["encrypt", "decrypt"]
), ve = async (e) => {
  const t = await crypto.subtle.exportKey("raw", e);
  return new Uint8Array(t);
}, te = (e) => {
  const t = new Uint8Array(e);
  let r = "";
  for (let s = 0; s < t.byteLength; s++)
    r += String.fromCharCode(t[s]);
  return btoa(r);
}, Te = (e) => {
  const t = atob(e), r = new Uint8Array(t.length);
  for (let s = 0; s < t.length; s++)
    r[s] = t.charCodeAt(s);
  return r;
}, re = (e) => e.slice().buffer, Ie = async (e, t) => {
  const r = await Ye(t), s = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    r,
    re(e)
  );
  return te(s);
}, $e = async (e, t) => {
  const r = crypto.getRandomValues(new Uint8Array(12)), s = {
    ...e,
    _ts: Date.now()
  }, a = new TextEncoder().encode(JSON.stringify(s)), i = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: re(r)
    },
    t,
    re(a)
  );
  return {
    ciphertext: te(i),
    nonce: te(r)
  };
}, et = async (e, t, r) => {
  const s = Te(e), n = Te(t), a = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: re(n)
    },
    r,
    re(s)
  ), l = new TextDecoder().decode(a);
  return JSON.parse(l);
}, tt = async (e) => {
  if (!ee)
    return null;
  try {
    P("========== 加密请求开始 =========="), P("原始数据", e), P("RSA 公钥", ee);
    const t = await Ze();
    J = t;
    const r = await ve(t);
    P("AES 密钥 (Base64)", te(r)), P("AES 密钥 (Hex)", Array.from(r).map((i) => i.toString(16).padStart(2, "0")).join(""));
    const s = await Ie(r, ee);
    P("RSA 加密后的 AES 密钥 (X-Encrypted-Key)", s);
    const { ciphertext: n, nonce: a } = await $e(e, t);
    return P("AES 加密后的数据 (encryptedData)", n), P("Nonce (X-Nonce)", a), P("========== 加密请求结束 =========="), {
      encryptedData: n,
      encryptedKey: s,
      nonce: a
    };
  } catch (t) {
    return console.error("加密请求数据失败:", t), J = null, null;
  }
}, rt = async (e, t) => {
  if (!J)
    return P("解密失败: 没有可用的 AES 密钥"), null;
  try {
    P("========== 解密响应开始 =========="), P("加密数据 (ciphertext)", e), P("Nonce (X-Response-Nonce)", t);
    const r = await ve(J);
    P("解密使用的 AES 密钥 (Base64)", te(r)), P("解密使用的 AES 密钥 (Hex)", Array.from(r).map((n) => n.toString(16).padStart(2, "0")).join(""));
    const s = await et(e, t, J);
    return P("解密后的数据", s), P("========== 解密响应结束 =========="), J = null, s;
  } catch (r) {
    return console.error("解密响应数据失败:", r), P("解密错误", r), J = null, null;
  }
}, ke = (e) => typeof e == "string" && e.length > 0 && /^[A-Za-z0-9+/=]+$/.test(e);
let D = {
  enabled: !1,
  includeApis: [],
  excludeApis: [],
  includeHostKeys: [],
  excludeHostKeys: []
};
const Rt = (e) => {
  D = {
    ...D,
    ...e,
    enabled: !0
  };
}, nt = () => Qe(), st = (e, t) => {
  if (!nt() || t && D.excludeHostKeys && D.excludeHostKeys.length > 0 && D.excludeHostKeys.includes(t) || D.includeHostKeys && D.includeHostKeys.length > 0 && (!t || !D.includeHostKeys.includes(t)))
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
}, Ke = {
  header: { "Content-Type": "application/json" }
};
let Ue, De, qe = null;
const Pt = (e) => {
  qe = e;
}, je = () => qe, vt = (e) => {
  const { before: t, after: r, ...s } = e;
  t && (Ue = t), r && (De = r), Object.assign(Ke, s);
}, ot = () => Ke, at = () => Ue, ne = () => De, Q = (e) => {
  if (e === null || typeof e != "object" || typeof e == "function")
    return e;
  if (Array.isArray(e)) {
    const r = [];
    for (let s = 0; s < e.length; s++)
      r[s] = Q(e[s]);
    return r;
  }
  const t = {};
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = Q(e[r]));
  return t;
}, it = (e, t) => e << t | e >>> 32 - t, ct = (e) => {
  const t = [];
  for (let w = 0; w < e.length; w++)
    t.push(e.charCodeAt(w));
  const r = t.length * 8;
  for (t.push(128); t.length * 8 % 512 !== 448; )
    t.push(0);
  t.push(r >>> 24 & 255), t.push(r >>> 16 & 255), t.push(r >>> 8 & 255), t.push(r & 255);
  let s = 1732584193, n = 4023233417, a = 2562383102, i = 271733878;
  const l = (w, S, A) => w & S | ~w & A, b = (w, S, A) => w & A | S & ~A, p = (w, S, A) => w ^ S ^ A, T = (w, S, A) => S ^ (w | ~A), v = [
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
    let S = s, A = n, x = a, L = i;
    for (let h = 0; h < 64; h++) {
      let u, g, k;
      h < 16 ? (u = l(A, x, L), g = h) : h < 32 ? (u = b(A, x, L), g = (5 * h + 1) % 16) : h < 48 ? (u = p(A, x, L), g = (3 * h + 5) % 16) : (u = T(A, x, L), g = 7 * h % 16), k = L, L = x, x = A, A = A + it(S + u + v[h] + w[g] | 0, N[h]), S = k;
    }
    s = s + S | 0, n = n + A | 0, a = a + x | 0, i = i + L | 0, j += 16;
  }
  return [s, n, a, i].map((w) => {
    const S = w & 255, A = w >>> 8 & 255, x = w >>> 16 & 255;
    return [w >>> 24 & 255, x, A, S];
  }).flat().map((w) => w.toString(16).padStart(2, "0")).join("");
}, lt = (e) => ct(e), ce = (e, t, r, s) => {
  if (!t) return e;
  let n = Q(t);
  r && (n.FieldMap = r), s && s.length > 0 && (s[0].startsWith("-") ? s.forEach((i) => {
    if (i.indexOf(".") > -1) {
      const l = i.split(".");
      let b = n;
      for (let p = 0; p < l.length && (p === l.length - 1 && delete b[l[p]], typeof b[l[p]] == "object" && !Array.isArray(b[l[p]])); p++)
        b = b[l[p]];
    } else delete n[i];
  }) : (n = {}, s.forEach((i) => {
    if (i.indexOf(".") > -1) {
      const l = i.split(".");
      let b = t, p = n;
      for (let T = 0; T < l.length; T++)
        if (T === l.length - 1)
          p[l[T]] = b[l[T]];
        else {
          if (b[l[T]] === null || b[l[T]] === void 0)
            break;
          if (p[l[T]] === void 0)
            if (typeof b[l[T]] != "object" || Array.isArray(b[l[T]])) {
              p[l[T]] = b[l[T]];
              break;
            } else p[l[T]] = {};
          p = p[l[T]], b = b[l[T]];
        }
    } else n[i] = t[i];
  })));
  const a = JSON.stringify(n);
  return `${e}-` + lt(a);
};
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, I = {}, F = {}, B = {}, m = {}, xe;
function ut() {
  if (xe) return m;
  xe = 1, Object.defineProperty(m, "__esModule", { value: !0 }), m.toBig = m.shrSL = m.shrSH = m.rotrSL = m.rotrSH = m.rotrBL = m.rotrBH = m.rotr32L = m.rotr32H = m.rotlSL = m.rotlSH = m.rotlBL = m.rotlBH = m.add5L = m.add5H = m.add4L = m.add4H = m.add3L = m.add3H = void 0, m.add = A, m.fromBig = r, m.split = s;
  const e = /* @__PURE__ */ BigInt(2 ** 32 - 1), t = /* @__PURE__ */ BigInt(32);
  function r(f, c = !1) {
    return c ? { h: Number(f & e), l: Number(f >> t & e) } : { h: Number(f >> t & e) | 0, l: Number(f & e) | 0 };
  }
  function s(f, c = !1) {
    const d = f.length;
    let _ = new Uint32Array(d), R = new Uint32Array(d);
    for (let K = 0; K < d; K++) {
      const { h: Y, l: Z } = r(f[K], c);
      [_[K], R[K]] = [Y, Z];
    }
    return [_, R];
  }
  const n = (f, c) => BigInt(f >>> 0) << t | BigInt(c >>> 0);
  m.toBig = n;
  const a = (f, c, d) => f >>> d;
  m.shrSH = a;
  const i = (f, c, d) => f << 32 - d | c >>> d;
  m.shrSL = i;
  const l = (f, c, d) => f >>> d | c << 32 - d;
  m.rotrSH = l;
  const b = (f, c, d) => f << 32 - d | c >>> d;
  m.rotrSL = b;
  const p = (f, c, d) => f << 64 - d | c >>> d - 32;
  m.rotrBH = p;
  const T = (f, c, d) => f >>> d - 32 | c << 64 - d;
  m.rotrBL = T;
  const v = (f, c) => c;
  m.rotr32H = v;
  const N = (f, c) => f;
  m.rotr32L = N;
  const j = (f, c, d) => f << d | c >>> 32 - d;
  m.rotlSH = j;
  const E = (f, c, d) => c << d | f >>> 32 - d;
  m.rotlSL = E;
  const w = (f, c, d) => c << d - 32 | f >>> 64 - d;
  m.rotlBH = w;
  const S = (f, c, d) => f << d - 32 | c >>> 64 - d;
  m.rotlBL = S;
  function A(f, c, d, _) {
    const R = (c >>> 0) + (_ >>> 0);
    return { h: f + d + (R / 2 ** 32 | 0) | 0, l: R | 0 };
  }
  const x = (f, c, d) => (f >>> 0) + (c >>> 0) + (d >>> 0);
  m.add3L = x;
  const L = (f, c, d, _) => c + d + _ + (f / 2 ** 32 | 0) | 0;
  m.add3H = L;
  const h = (f, c, d, _) => (f >>> 0) + (c >>> 0) + (d >>> 0) + (_ >>> 0);
  m.add4L = h;
  const u = (f, c, d, _, R) => c + d + _ + R + (f / 2 ** 32 | 0) | 0;
  m.add4H = u;
  const g = (f, c, d, _, R) => (f >>> 0) + (c >>> 0) + (d >>> 0) + (_ >>> 0) + (R >>> 0);
  m.add5L = g;
  const k = (f, c, d, _, R, K) => c + d + _ + R + K + (f / 2 ** 32 | 0) | 0;
  m.add5H = k;
  const O = {
    fromBig: r,
    split: s,
    toBig: n,
    shrSH: a,
    shrSL: i,
    rotrSH: l,
    rotrSL: b,
    rotrBH: p,
    rotrBL: T,
    rotr32H: v,
    rotr32L: N,
    rotlSH: j,
    rotlSL: E,
    rotlBH: w,
    rotlBL: S,
    add: A,
    add3L: x,
    add3H: L,
    add4L: h,
    add4H: u,
    add5H: k,
    add5L: g
  };
  return m.default = O, m;
}
var he = {}, se = {}, Oe;
function ft() {
  return Oe || (Oe = 1, Object.defineProperty(se, "__esModule", { value: !0 }), se.crypto = void 0, se.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0), se;
}
var Le;
function dt() {
  return Le || (Le = 1, (function(e) {
    /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(e, "__esModule", { value: !0 }), e.wrapXOFConstructorWithOpts = e.wrapConstructorWithOpts = e.wrapConstructor = e.Hash = e.nextTick = e.swap32IfBE = e.byteSwapIfBE = e.swap8IfBE = e.isLE = void 0, e.isBytes = r, e.anumber = s, e.abytes = n, e.ahash = a, e.aexists = i, e.aoutput = l, e.u8 = b, e.u32 = p, e.clean = T, e.createView = v, e.rotr = N, e.rotl = j, e.byteSwap = E, e.byteSwap32 = w, e.bytesToHex = x, e.hexToBytes = u, e.asyncLoop = k, e.utf8ToBytes = O, e.bytesToUtf8 = f, e.toBytes = c, e.kdfInputToBytes = d, e.concatBytes = _, e.checkOpts = R, e.createHasher = Y, e.createOptHasher = Z, e.createXOFer = W, e.randomBytes = ze;
    const t = /* @__PURE__ */ ft();
    function r(o) {
      return o instanceof Uint8Array || ArrayBuffer.isView(o) && o.constructor.name === "Uint8Array";
    }
    function s(o) {
      if (!Number.isSafeInteger(o) || o < 0)
        throw new Error("positive integer expected, got " + o);
    }
    function n(o, ...y) {
      if (!r(o))
        throw new Error("Uint8Array expected");
      if (y.length > 0 && !y.includes(o.length))
        throw new Error("Uint8Array expected of length " + y + ", got length=" + o.length);
    }
    function a(o) {
      if (typeof o != "function" || typeof o.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
      s(o.outputLen), s(o.blockLen);
    }
    function i(o, y = !0) {
      if (o.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (y && o.finished)
        throw new Error("Hash#digest() has already been called");
    }
    function l(o, y) {
      n(o);
      const H = y.outputLen;
      if (o.length < H)
        throw new Error("digestInto() expects output buffer of length at least " + H);
    }
    function b(o) {
      return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    function p(o) {
      return new Uint32Array(o.buffer, o.byteOffset, Math.floor(o.byteLength / 4));
    }
    function T(...o) {
      for (let y = 0; y < o.length; y++)
        o[y].fill(0);
    }
    function v(o) {
      return new DataView(o.buffer, o.byteOffset, o.byteLength);
    }
    function N(o, y) {
      return o << 32 - y | o >>> y;
    }
    function j(o, y) {
      return o << y | o >>> 32 - y >>> 0;
    }
    e.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    function E(o) {
      return o << 24 & 4278190080 | o << 8 & 16711680 | o >>> 8 & 65280 | o >>> 24 & 255;
    }
    e.swap8IfBE = e.isLE ? (o) => o : (o) => E(o), e.byteSwapIfBE = e.swap8IfBE;
    function w(o) {
      for (let y = 0; y < o.length; y++)
        o[y] = E(o[y]);
      return o;
    }
    e.swap32IfBE = e.isLE ? (o) => o : w;
    const S = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", A = /* @__PURE__ */ Array.from({ length: 256 }, (o, y) => y.toString(16).padStart(2, "0"));
    function x(o) {
      if (n(o), S)
        return o.toHex();
      let y = "";
      for (let H = 0; H < o.length; H++)
        y += A[o[H]];
      return y;
    }
    const L = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    function h(o) {
      if (o >= L._0 && o <= L._9)
        return o - L._0;
      if (o >= L.A && o <= L.F)
        return o - (L.A - 10);
      if (o >= L.a && o <= L.f)
        return o - (L.a - 10);
    }
    function u(o) {
      if (typeof o != "string")
        throw new Error("hex string expected, got " + typeof o);
      if (S)
        return Uint8Array.fromHex(o);
      const y = o.length, H = y / 2;
      if (y % 2)
        throw new Error("hex string expected, got unpadded hex of length " + y);
      const C = new Uint8Array(H);
      for (let U = 0, q = 0; U < H; U++, q += 2) {
        const Se = h(o.charCodeAt(q)), Ae = h(o.charCodeAt(q + 1));
        if (Se === void 0 || Ae === void 0) {
          const Xe = o[q] + o[q + 1];
          throw new Error('hex string expected, got non-hex character "' + Xe + '" at index ' + q);
        }
        C[U] = Se * 16 + Ae;
      }
      return C;
    }
    const g = async () => {
    };
    e.nextTick = g;
    async function k(o, y, H) {
      let C = Date.now();
      for (let U = 0; U < o; U++) {
        H(U);
        const q = Date.now() - C;
        q >= 0 && q < y || (await (0, e.nextTick)(), C += q);
      }
    }
    function O(o) {
      if (typeof o != "string")
        throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(o));
    }
    function f(o) {
      return new TextDecoder().decode(o);
    }
    function c(o) {
      return typeof o == "string" && (o = O(o)), n(o), o;
    }
    function d(o) {
      return typeof o == "string" && (o = O(o)), n(o), o;
    }
    function _(...o) {
      let y = 0;
      for (let C = 0; C < o.length; C++) {
        const U = o[C];
        n(U), y += U.length;
      }
      const H = new Uint8Array(y);
      for (let C = 0, U = 0; C < o.length; C++) {
        const q = o[C];
        H.set(q, U), U += q.length;
      }
      return H;
    }
    function R(o, y) {
      if (y !== void 0 && {}.toString.call(y) !== "[object Object]")
        throw new Error("options should be object or undefined");
      return Object.assign(o, y);
    }
    class K {
    }
    e.Hash = K;
    function Y(o) {
      const y = (C) => o().update(c(C)).digest(), H = o();
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = () => o(), y;
    }
    function Z(o) {
      const y = (C, U) => o(U).update(c(C)).digest(), H = o({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (C) => o(C), y;
    }
    function W(o) {
      const y = (C, U) => o(U).update(c(C)).digest(), H = o({});
      return y.outputLen = H.outputLen, y.blockLen = H.blockLen, y.create = (C) => o(C), y;
    }
    e.wrapConstructor = Y, e.wrapConstructorWithOpts = Z, e.wrapXOFConstructorWithOpts = W;
    function ze(o = 32) {
      if (t.crypto && typeof t.crypto.getRandomValues == "function")
        return t.crypto.getRandomValues(new Uint8Array(o));
      if (t.crypto && typeof t.crypto.randomBytes == "function")
        return Uint8Array.from(t.crypto.randomBytes(o));
      throw new Error("crypto.getRandomValues must be defined");
    }
  })(he)), he;
}
var Be;
function ht() {
  if (Be) return B;
  Be = 1, Object.defineProperty(B, "__esModule", { value: !0 }), B.shake256 = B.shake128 = B.keccak_512 = B.keccak_384 = B.keccak_256 = B.keccak_224 = B.sha3_512 = B.sha3_384 = B.sha3_256 = B.sha3_224 = B.Keccak = void 0, B.keccakP = S;
  const e = /* @__PURE__ */ ut(), t = /* @__PURE__ */ dt(), r = BigInt(0), s = BigInt(1), n = BigInt(2), a = BigInt(7), i = BigInt(256), l = BigInt(113), b = [], p = [], T = [];
  for (let h = 0, u = s, g = 1, k = 0; h < 24; h++) {
    [g, k] = [k, (2 * g + 3 * k) % 5], b.push(2 * (5 * k + g)), p.push((h + 1) * (h + 2) / 2 % 64);
    let O = r;
    for (let f = 0; f < 7; f++)
      u = (u << s ^ (u >> a) * l) % i, u & n && (O ^= s << (s << /* @__PURE__ */ BigInt(f)) - s);
    T.push(O);
  }
  const v = (0, e.split)(T, !0), N = v[0], j = v[1], E = (h, u, g) => g > 32 ? (0, e.rotlBH)(h, u, g) : (0, e.rotlSH)(h, u, g), w = (h, u, g) => g > 32 ? (0, e.rotlBL)(h, u, g) : (0, e.rotlSL)(h, u, g);
  function S(h, u = 24) {
    const g = new Uint32Array(10);
    for (let k = 24 - u; k < 24; k++) {
      for (let c = 0; c < 10; c++)
        g[c] = h[c] ^ h[c + 10] ^ h[c + 20] ^ h[c + 30] ^ h[c + 40];
      for (let c = 0; c < 10; c += 2) {
        const d = (c + 8) % 10, _ = (c + 2) % 10, R = g[_], K = g[_ + 1], Y = E(R, K, 1) ^ g[d], Z = w(R, K, 1) ^ g[d + 1];
        for (let W = 0; W < 50; W += 10)
          h[c + W] ^= Y, h[c + W + 1] ^= Z;
      }
      let O = h[2], f = h[3];
      for (let c = 0; c < 24; c++) {
        const d = p[c], _ = E(O, f, d), R = w(O, f, d), K = b[c];
        O = h[K], f = h[K + 1], h[K] = _, h[K + 1] = R;
      }
      for (let c = 0; c < 50; c += 10) {
        for (let d = 0; d < 10; d++)
          g[d] = h[c + d];
        for (let d = 0; d < 10; d++)
          h[c + d] ^= ~g[(d + 2) % 10] & g[(d + 4) % 10];
      }
      h[0] ^= N[k], h[1] ^= j[k];
    }
    (0, t.clean)(g);
  }
  class A extends t.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(u, g, k, O = !1, f = 24) {
      if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = u, this.suffix = g, this.outputLen = k, this.enableXOF = O, this.rounds = f, (0, t.anumber)(k), !(0 < u && u < 200))
        throw new Error("only keccak-f1600 function is supported");
      this.state = new Uint8Array(200), this.state32 = (0, t.u32)(this.state);
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      (0, t.swap32IfBE)(this.state32), S(this.state32, this.rounds), (0, t.swap32IfBE)(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(u) {
      (0, t.aexists)(this), u = (0, t.toBytes)(u), (0, t.abytes)(u);
      const { blockLen: g, state: k } = this, O = u.length;
      for (let f = 0; f < O; ) {
        const c = Math.min(g - this.pos, O - f);
        for (let d = 0; d < c; d++)
          k[this.pos++] ^= u[f++];
        this.pos === g && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished)
        return;
      this.finished = !0;
      const { state: u, suffix: g, pos: k, blockLen: O } = this;
      u[k] ^= g, (g & 128) !== 0 && k === O - 1 && this.keccak(), u[O - 1] ^= 128, this.keccak();
    }
    writeInto(u) {
      (0, t.aexists)(this, !1), (0, t.abytes)(u), this.finish();
      const g = this.state, { blockLen: k } = this;
      for (let O = 0, f = u.length; O < f; ) {
        this.posOut >= k && this.keccak();
        const c = Math.min(k - this.posOut, f - O);
        u.set(g.subarray(this.posOut, this.posOut + c), O), this.posOut += c, O += c;
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
      this.destroyed = !0, (0, t.clean)(this.state);
    }
    _cloneInto(u) {
      const { blockLen: g, suffix: k, outputLen: O, rounds: f, enableXOF: c } = this;
      return u || (u = new A(g, k, O, c, f)), u.state32.set(this.state32), u.pos = this.pos, u.posOut = this.posOut, u.finished = this.finished, u.rounds = f, u.suffix = k, u.outputLen = O, u.enableXOF = c, u.destroyed = this.destroyed, u;
    }
  }
  B.Keccak = A;
  const x = (h, u, g) => (0, t.createHasher)(() => new A(u, h, g));
  B.sha3_224 = x(6, 144, 224 / 8), B.sha3_256 = x(6, 136, 256 / 8), B.sha3_384 = x(6, 104, 384 / 8), B.sha3_512 = x(6, 72, 512 / 8), B.keccak_224 = x(1, 144, 224 / 8), B.keccak_256 = x(1, 136, 256 / 8), B.keccak_384 = x(1, 104, 384 / 8), B.keccak_512 = x(1, 72, 512 / 8);
  const L = (h, u, g) => (0, t.createXOFer)((k = {}) => new A(u, h, k.dkLen === void 0 ? g : k.dkLen, !0));
  return B.shake128 = L(31, 168, 128 / 8), B.shake256 = L(31, 136, 256 / 8), B;
}
var He;
function yt() {
  if (He) return F;
  He = 1;
  const { sha3_512: e } = /* @__PURE__ */ ht(), t = 24, r = 32, s = (E = 4, w = Math.random) => {
    let S = "";
    for (; S.length < E; )
      S = S + Math.floor(w() * 36).toString(36);
    return S;
  };
  function n(E) {
    let w = 8n, S = 0n;
    for (const A of E.values()) {
      const x = BigInt(A);
      S = (S << w) + x;
    }
    return S;
  }
  const a = (E = "") => n(e(E)).toString(36).slice(1), i = Array.from(
    { length: 26 },
    (E, w) => String.fromCharCode(w + 97)
  ), l = (E) => i[Math.floor(E() * i.length)], b = ({
    globalObj: E = typeof Ee < "u" ? Ee : typeof window < "u" ? window : {},
    random: w = Math.random
  } = {}) => {
    const S = Object.keys(E).toString(), A = S.length ? S + s(r, w) : s(r, w);
    return a(A).substring(0, r);
  }, p = (E) => () => E++, T = 476782367, v = ({
    // Fallback if the user does not pass in a CSPRNG. This should be OK
    // because we don't rely solely on the random number generator for entropy.
    // We also use the host fingerprint, current time, and a session counter.
    random: E = Math.random,
    counter: w = p(Math.floor(E() * T)),
    length: S = t,
    fingerprint: A = b({ random: E })
  } = {}) => function() {
    const L = l(E), h = Date.now().toString(36), u = w().toString(36), g = s(S, E), k = `${h + g + u + A}`;
    return `${L + a(k).substring(1, S)}`;
  }, N = v(), j = (E, { minLength: w = 2, maxLength: S = r } = {}) => {
    const A = E.length, x = /^[0-9a-z]+$/;
    try {
      if (typeof E == "string" && A >= w && A <= S && x.test(E))
        return !0;
    } finally {
    }
    return !1;
  };
  return F.getConstants = () => ({ defaultLength: t, bigLength: r }), F.init = v, F.createId = N, F.bufToBigInt = n, F.createCounter = p, F.createFingerprint = b, F.isCuid = j, F;
}
var Ce;
function pt() {
  if (Ce) return I;
  Ce = 1;
  const { createId: e, init: t, getConstants: r, isCuid: s } = yt();
  return I.createId = e, I.init = t, I.getConstants = r, I.isCuid = s, I;
}
var gt = pt();
const bt = async (e, t) => {
  var s;
  if (!st(e.url || "", t.api) || ((s = e.method) == null ? void 0 : s.toUpperCase()) === "GET" || !e.data)
    return !1;
  try {
    const n = await tt(e.data);
    if (n)
      return M("crypto", "请求加密", { originalData: e.data }), e.data = n.encryptedData, e.header || (e.header = {}), e.header["X-Encrypted-Key"] = n.encryptedKey, e.header["X-Nonce"] = n.nonce, M("crypto", "请求加密完成"), !0;
  } catch (n) {
    ae("crypto", "请求加密失败", n);
  }
  return !1;
}, _e = async (e) => {
  var r, s;
  const t = ((r = e.header) == null ? void 0 : r["x-response-nonce"]) || ((s = e.header) == null ? void 0 : s["X-Response-Nonce"]);
  if (t && e.data)
    try {
      let n = null;
      if (typeof e.data == "string" && ke(e.data) ? n = e.data : typeof e.data == "object" && e.data !== null && "encrypted" in e.data && typeof e.data.encrypted == "string" && (n = e.data.encrypted), n && ke(n)) {
        const a = await rt(n, t);
        if (a !== null)
          return M("crypto", "响应解密", { decryptedData: a }), a;
        ae("crypto", "响应解密失败: 返回null", { nonce: t });
      }
    } catch (n) {
      ae("crypto", "响应解密失败", n);
    }
  return e.data;
}, Re = (e) => {
  if (!e) return;
  const t = e["x-public-key"] || e["X-Public-Key"];
  t && (Je(t) ? M("crypto", "从响应头缓存公钥成功") : M("crypto", "公钥已存在，忽略响应头中的公钥"));
};
class mt {
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
  showToast(t, r, s, n) {
    const a = typeof r == "string" ? r : r.title || s;
    this.show({
      ...this.defaultOptions,
      icon: t,
      duration: n || this.defaultOptions.duration,
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
    const r = this.currentToast.map((s) => s.id);
    t === 0 ? this.close(r) : setTimeout(() => this.close(r), t);
  }
  close(t) {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : (t.forEach((r) => {
      var s;
      (s = this.currentToast.find((n) => n.id === r)) == null || s.close();
    }), this.currentToast = this.currentToast.filter(
      (r) => !t.includes(r.id)
    ));
  }
  show(t) {
    const { title: r, icon: s, mask: n, duration: a, position: i } = t;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...t,
        title: r,
        icon: s === "warning" ? "error" : s,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: a,
        position: i,
        mask: t.mask,
        success: t.success,
        fail: t.fail,
        complete: t.complete
      });
    else
      switch (this.hide(), s) {
        case "success":
          this.currentToast.push(
            ie.success(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: n,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "error":
          this.currentToast.push(
            ie.error(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: n,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        case "loading":
          this.currentToast.push(
            ie.loading(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: n,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
        default:
          this.currentToast.push(
            ie.info(r, {
              ...t,
              title: void 0,
              position: "top-center",
              hasMask: n,
              zIndex: t.zIndex || 9999,
              closable: !1
            })
          );
          break;
      }
  }
}
const z = new mt(), Me = /\$\{([\w\.\[\]0-9]+)\}/g, wt = (e, t) => e.replace(Me, (r, s) => {
  var i;
  const n = s.split(".");
  let a = t;
  for (const l of n) {
    if (l.includes("[") && l.includes("]")) {
      const b = l.split("[")[0], p = parseInt(l.split("[")[1].split("]")[0]);
      a = (i = a[b]) == null ? void 0 : i[p];
    } else
      a = a[l];
    if (a === void 0)
      return r;
  }
  return String(a);
}), Ne = (e, t) => {
  const r = Array.isArray(t), s = r ? t : [t];
  return s.forEach((n) => {
    if (n && typeof n == "object") {
      for (const a in e) {
        const i = e[a];
        if (typeof i == "string" && Me.test(i)) {
          const l = wt(
            i,
            n
          );
          n[a] = l;
        } else n[i] !== void 0 && (n[a] = n[i]);
      }
      n.children && Array.isArray(n.children) && (n.children = Ne(e, n.children));
    }
  }), r ? t : s[0];
};
let Fe = "", pe = null;
const St = () => pe ? pe() : Fe, Kt = (e) => {
  Fe = e;
}, Ut = (e) => {
  pe = e;
}, ye = /* @__PURE__ */ new Map(), ge = {
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
    fieldMap: s,
    lastModified: n,
    storage: a = "memory"
  }, i, l = -1) {
    if (i == null) return;
    const b = ce(e, t, s, r), p = l !== -1 ? Date.now() + l : void 0, T = `frontCache::${b}`, v = {
      data: i,
      expireAt: p,
      lastModified: n ?? Date.now()
    };
    switch (a) {
      case "memory":
        ye.set(T, v);
        break;
      case "uni":
        uni.setStorageSync(T, JSON.stringify(v));
        break;
      case "session":
        sessionStorage.setItem(T, JSON.stringify(v));
        break;
      case "local":
        localStorage.setItem(T, JSON.stringify(v));
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
    fieldMap: s,
    storage: n = "memory"
  }) {
    const i = `frontCache::${ce(e, t, s, r)}`;
    let l = null, b;
    switch (n) {
      case "memory":
        l = ye.get(i);
        break;
      case "uni":
        b = uni.getStorageSync(i), l = b ? JSON.parse(b) : null;
        break;
      case "session":
        b = sessionStorage.getItem(i), l = b ? JSON.parse(b) : null;
        break;
      case "local":
        b = localStorage.getItem(i), l = b ? JSON.parse(b) : null;
        break;
    }
    return l && (!l.expireAt || l.expireAt > Date.now()) ? l.data : (ge.remove({ key: e, params: t, storage: n }), null);
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
    fieldMap: s,
    storage: n = "memory"
  }) {
    const i = `frontCache::${ce(e, t, s, r)}`;
    switch (n) {
      case "memory":
        ye.delete(i);
        break;
      case "uni":
        uni.removeStorageSync(i);
        break;
      case "session":
        sessionStorage.removeItem(i);
        break;
      case "local":
        localStorage.removeItem(i);
        break;
    }
  }
}, At = (e) => e ? Array.isArray(e) ? e.length === 0 : typeof e == "object" ? Object.keys(e).length === 0 : !1 : !0, Tt = gt.init({
  // A custom random function with the same API as Math.random.
  // You can use this to pass a cryptographically secure random function.
  random: Math.random,
  // the length of the id
  length: 10,
  // A custom fingerprint for the host environment. This is used to help
  // prevent collisions when generating ids in a distributed system.
  fingerprint: ""
}), oe = {}, kt = 2e3, $ = (e, ...t) => {
  if (!t.length) return e;
  const r = t.shift();
  if (r === void 0) return e;
  for (const s in r)
    r.hasOwnProperty(s) && (typeof r[s] == "object" && r[s] !== null && !Array.isArray(r[s]) ? (e[s] || (e[s] = {}), $(e[s], r[s])) : e[s] = r[s]);
  return $(e, ...t);
}, Et = (e, t, r) => {
  const s = $({}, r, e);
  Object.assign(e, s);
  const n = r.header || {}, a = e.header || {};
  if (typeof t.header == "object")
    e.header = $({}, n, a, t.header);
  else if (typeof t.header == "function") {
    const l = $({}, n, a);
    e.header = t.header(l);
  } else
    e.header = $({}, n, a);
  if (e.header || (e.header = {}), e.header.reqId = Tt(), t.authorize && typeof t.authorize == "function" && t.authorize(e, t, "") === !1)
    return !1;
  const i = at();
  if (i) {
    const l = i(e);
    if (l !== void 0)
      return l;
  }
  if (t.before) {
    const l = t.before.call(t, e);
    if (l !== void 0)
      return l;
  }
}, xt = (e, t) => {
  var r;
  if (t.authorize) {
    const s = St();
    if (!s) {
      const n = `Error, interface ${t.url} requires authorization to access!`;
      return console.error(n), z.error({ title: n }), !1;
    }
    (r = e.header) != null && r.authorization || (e.header || (e.header = {}), e.header.authorization = "Bearer " + s);
  }
  return !0;
}, Ot = async (e, t) => {
  const r = !!je();
  M("request", "开始请求", { url: e.url, method: e.method, hasProxy: r });
  try {
    if (!xt(e, t))
      return ae("request", "Token注入失败", { url: e.url }), null;
    await bt(e, t), M("request", "发送HTTP请求");
    const { header: s, ...n } = e, a = await We.request({
      ...n,
      headers: s
    }), i = {
      statusCode: a.status,
      data: a.data,
      header: a.headers
    };
    return M("request", "HTTP响应完成", {
      statusCode: i.statusCode,
      headerKeys: i.header ? Object.keys(i.header) : [],
      header: i.header
    }), Re(i.header), i.data = await _e(i), M("request", "请求完成", { statusCode: i.statusCode }), i;
  } catch (s) {
    const n = s;
    if (n.response) {
      const a = {
        statusCode: n.response.status,
        data: n.response.data,
        header: n.response.headers
      };
      return Re(a.header), a.data = await _e(a), M("request", "HTTP错误", { statusCode: a.statusCode }), a;
    }
    throw ae("request", "请求失败", s), s;
  }
}, be = async (e, t, r, s) => {
  if (r.statusCode >= 200 && r.statusCode < 400) {
    if (t.raw) {
      const a = r.data, i = ne();
      i && i(e, a, r), t.after && t.after.call(t, e, a, r), s.Result = a;
      return;
    }
    const n = r.data;
    if (n.status === X.SUCCESS) {
      const a = n.data;
      e.method === "POST" && t.fieldMap && a && Ne(t.fieldMap, a);
      const i = ne();
      i && i(e, n, r), t.after && t.after.call(t, n, e, r), s.Result = n;
    } else {
      console.error(n), s.Error = {
        status: n.status,
        errno: n.errno,
        msg: n.msg || "Request Error"
      }, s.Result = n;
      const a = ne();
      a && a(e, n, r), t.after && t.after.call(t, n, e, r);
    }
  } else {
    let n;
    const a = r.statusCode;
    switch (a) {
      case 401:
        n = "Unauthorized or Token Expired";
        break;
      case 403:
        n = "Access Forbidden";
        break;
      case 404:
        n = "Request Address Error";
        break;
      case 500:
        n = "Server Exception";
        break;
      default:
        n = "Other Request Error";
        break;
    }
    if (n = `${a}: ${n}`, t.raw) {
      const b = {
        status: X.ERROR,
        errno: a + 1e3,
        msg: n
      };
      s.Error = b;
      const p = ne();
      p && p(e, b, r), t.after && t.after.call(t, e, b, r);
      return;
    }
    const i = {
      status: X.ERROR,
      errno: a + 1e3,
      msg: n
    };
    s.Error = i;
    const l = ne();
    l && l(e, i, r), t.after && t.after.call(t, i, e, r);
  }
}, me = (e, t) => {
  console.error(e);
  const r = {
    status: X.ERROR,
    errno: 1e3,
    msg: "Network Error: " + e.toString()
  };
  t.Error = r;
}, we = (e, t, r) => {
  const s = e.loadingText ? 500 : 0;
  setTimeout(() => {
    var n, a;
    z.hide(), t.Error && (console.error(Q(e), t.Error), e.hideErrorToast || z.error({ title: t.Error.msg }), e.raw ? t.Result = t.Error : t.Result = {
      status: X.ERROR,
      errno: t.Error.errno,
      msg: t.Error.msg,
      timestamp: (n = t.Result) == null ? void 0 : n.timestamp,
      data: (a = t.Result) == null ? void 0 : a.data
    }), r(t.Result);
  }, s);
}, G = async (e, t, r) => {
  const s = Q(ot());
  if (Et(e, t, s) === !1) return Promise.resolve(null);
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
      const p = ge.get(a);
      p && setTimeout(() => (z.hide(), Promise.resolve({
        status: X.SUCCESS,
        data: p
      })), 500);
    }
    const i = ce(
      e.url,
      e.data,
      t.fieldMap,
      ["Query", "Option.SelectFields"]
    ), l = oe[i];
    if (l)
      if (l.expire && l.expire < Date.now())
        delete oe[i];
      else return l.expire ? new Promise((p) => {
        setTimeout(() => {
          z.hide(), p(l.result);
        }, 500);
      }) : new Promise((p) => {
        setTimeout(() => {
          z.hide(), l.sharedPromise.then(p);
        }, 500);
      });
    t.loading = !0;
    const b = r(e, t).then((p) => {
      if (typeof p == "boolean") return p;
      (p == null ? void 0 : p.status) === X.SUCCESS && !At(p == null ? void 0 : p.data) && t.cacheTime && ge.set(a, p.data, t.cacheTime);
      let T = oe[i];
      return T.result = p, T.expire = Date.now() + kt, oe[i] = T, p;
    }).finally(() => {
      t.loading = !1;
    });
    return oe[i] = {
      sharedPromise: b
    }, b;
  } else
    return r(e, t);
}, Lt = {
  SITEHOST_API: ""
}, Dt = {}, qt = {}, V = (e) => {
  let { api: t, url: r, authorize: s } = e;
  if (r.startsWith("http://") || r.startsWith("https://") || !t)
    return r;
  const n = Lt[t];
  if (!n)
    return z.error("API domain not found: " + t), !1;
  if (typeof n == "string")
    return n + r;
  if (typeof n == "object") {
    const { host: a, authorize: i } = n;
    return (s === void 0 || s === !1) && (e.authorize = i), r = a + r, r;
  }
  return r;
}, ue = (e, t) => {
  const r = {
    Result: null
  };
  return new Promise((s) => {
    uni.request({
      ...e,
      success: async (n) => {
        await be(e, t, n, r);
      },
      fail: (n) => {
        me(n, r);
      },
      complete: () => {
        we(t, r, s);
      }
    });
  });
}, jt = (e) => {
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
}, Mt = (e, t) => {
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
}, Nt = (e, t) => {
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
}, Ft = (e, t) => {
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
}, fe = (e, t) => {
  const r = {
    Result: null
  };
  return new Promise((s) => {
    const n = je();
    if (n) {
      M("proxy", "使用代理", { url: e.url, method: e.method });
      const a = Q(e), i = Q(t);
      n(a, i).then(async (l) => {
        l && await be(e, t, l, r);
      }).catch((l) => {
        me(l, r);
      }).finally(() => {
        we(t, r, s);
      });
    } else
      Ot(e, t).then(async (a) => {
        a && await be(e, t, a, r);
      }).catch((a) => {
        me(a, r);
      }).finally(() => {
        we(t, r, s);
      });
  });
}, zt = (e) => {
  const t = V(e);
  return t === !1 ? Promise.resolve(null) : G(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "Loading Data..."
    },
    e,
    fe
  );
}, Xt = (e, t) => {
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
    fe
  );
}, Gt = (e, t) => {
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
    fe
  );
}, Vt = (e, t) => {
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
    fe
  );
}, Wt = (e) => typeof e == "object" && e !== null && !Array.isArray(e) || Array.isArray(e);
export {
  Lt as API_HOST,
  ge as FrontCache,
  qt as ICON_HOST,
  X as ResStatus,
  Dt as SERVER_HOST,
  Ot as coreRequest,
  Q as deepClone,
  Ne as fieldMapping,
  ne as getGlobalAfter,
  at as getGlobalBefore,
  ot as getGlobalConfig,
  St as getToken,
  vt as globalRequestOption,
  V as hostUrl,
  Gt as httpDelete,
  zt as httpGet,
  Vt as httpPost,
  Xt as httpPut,
  Rt as initCrypto,
  _t as initLog,
  Wt as isJSON,
  wt as parseFieldTemplate,
  Pt as setRequestProxy,
  Kt as setToken,
  Ut as setTokenCallback,
  z as toast,
  Nt as uniDelete,
  jt as uniGet,
  Ft as uniPost,
  Mt as uniPut
};
