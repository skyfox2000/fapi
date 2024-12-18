var ae = Object.defineProperty;
var ne = (e, t, s) => t in e ? ae(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var z = (e, t, s) => ne(e, typeof t != "symbol" ? t + "" : t, s);
import re from "crypto-js";
import { defineComponent as Y, createVNode as v, reactive as ie, onBeforeMount as le, onMounted as ce, ref as de, isVNode as me, render as _, resolveComponent as ue, openBlock as m, createBlock as x, Transition as pe, withCtx as ge, createElementBlock as u, normalizeClass as P, normalizeStyle as he, createElementVNode as S, createCommentVNode as h, renderSlot as H, createTextVNode as K, toDisplayString as F, Fragment as J } from "vue";
import fe from "axios";
var k = /* @__PURE__ */ ((e) => (e.SUCCESS = "success", e.ERROR = "error", e))(k || {});
const ye = {
  SITEHOST_API: ""
}, Ie = {}, f = (e) => {
  let { api: t, url: s } = e;
  return !s.startsWith("http://") && !s.startsWith("https://") && (s = ye[t] + s), s;
}, ve = (e) => re.MD5(e).toString(), O = (e, t, s) => {
  if (!t) return e;
  let i = JSON.parse(JSON.stringify(t));
  s && s.length > 0 && (s[0].startsWith("-") ? s.forEach((n) => {
    if (n.indexOf(".") > -1) {
      const o = n.split(".");
      let r = i;
      for (let l = 0; l < o.length && (l === o.length - 1 && delete r[o[l]], typeof r[o[l]] == "object" && !Array.isArray(r[o[l]])); l++)
        r = r[o[l]];
    } else delete i[n];
  }) : (i = {}, s.forEach((n) => {
    if (n.indexOf(".") > -1) {
      const o = n.split(".");
      let r = t, l = i;
      for (let c = 0; c < o.length; c++)
        if (c === o.length - 1)
          l[o[c]] = r[o[c]];
        else {
          if (r[o[c]] === null || r[o[c]] === void 0)
            break;
          if (l[o[c]] === void 0)
            if (typeof r[o[c]] != "object" || Array.isArray(r[o[c]])) {
              l[o[c]] = r[o[c]];
              break;
            } else l[o[c]] = {};
          l = l[o[c]], r = r[o[c]];
        }
    } else i[n] = t[n];
  })));
  const a = JSON.stringify(i);
  return `${e}-` + ve(a);
}, Z = /{{\s*([\w.]+)\s*}}/g, Se = (e, t) => e.replace(Z, (s, i) => {
  const a = i.split(".");
  let n = t;
  for (const o of a)
    if (typeof n == "object" && n !== null)
      n = n[o];
    else {
      n = void 0;
      break;
    }
  return n !== void 0 ? String(n) : "";
}), Te = (e, t) => {
  const s = Array.isArray(t), i = s ? t : [t];
  return i.forEach((a) => {
    if (a && typeof a == "object")
      for (const n in e) {
        const o = e[n];
        if (typeof o == "string" && Z.test(o)) {
          const r = Se(o, a);
          a[n] = r;
        } else
          a[n] = a[o];
      }
  }), s ? t : i[0];
}, et = (e) => typeof e == "object" && e !== null && !Array.isArray(e) || Array.isArray(e);
var be = Object.defineProperty, Ce = Object.defineProperties, we = Object.getOwnPropertyDescriptors, q = Object.getOwnPropertySymbols, ke = Object.prototype.hasOwnProperty, Oe = Object.prototype.propertyIsEnumerable, U = (e, t, s) => t in e ? be(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s, g = (e, t) => {
  for (var s in t || (t = {}))
    ke.call(t, s) && U(e, s, t[s]);
  if (q)
    for (var s of q(t))
      Oe.call(t, s) && U(e, s, t[s]);
  return e;
}, C = (e, t) => Ce(e, we(t));
const I = {}, Ee = function(e, t) {
  I[e] = t;
}, T = Y({
  name: "Icon",
  props: {
    name: String,
    color: String
  },
  computed: {
    svg() {
      if (this.name)
        return I[this.name];
    }
  },
  render(e) {
    const t = this.svg;
    if (!t)
      return console.warn(`The name of '${this.name}' could not be found.`), v("span", {
        class: "m-svg-icon"
      }, null);
    const s = {
      color: this.color ? this.color : t.fill ? t.fill : null
    };
    return v("span", {
      class: ["m-svg-icon", "m-svg-icon--" + this.name]
    }, [v("svg", {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: t.viewBox,
      style: s,
      class: t.class
    }, [t.defs && v("defs", {
      innerHTML: t.defs
    }, null), t.path && v("path", {
      fill: "currentColor",
      d: t.path
    }, null), t.html && v("g", {
      innerHTML: t.html
    }, null), this.$slots.default])]);
  }
});
T.add = Ee;
const V = {
  name: "error",
  fill: "#F56C6C",
  viewBox: "0 0 1024 1024",
  path: "M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M579.7,512l101.6-101.6 c18.7-18.7,18.7-49,0-67.7c-18.7-18.7-49-18.7-67.7,0l0,0L512,444.3L410.4,342.7c-18.7-18.7-49-18.7-67.7,0s-18.7,49,0,67.7 L444.3,512L342.7,613.6c-18.7,18.7-18.7,49,0,67.7c18.7,18.7,49,18.7,67.7,0L512,579.7l101.6,101.6c18.7,18.7,49,18.7,67.7,0 c18.7-18.7,18.7-49,0-67.7L579.7,512z"
}, G = {
  name: "info",
  fill: "#1CADF2",
  viewBox: "0 0 1024 1024",
  path: "M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72z M581,673.9 c-33.2,49.9-67,88.3-123.8,88.3c-38.8-6.3-54.7-34.1-46.3-62.4L484,457.6c1.8-5.9-1.2-12.3-6.6-14.2c-5.4-1.9-15.9,5.1-25.1,15.1 l-44.2,53.2c-1.2-8.9-0.1-23.7-0.1-29.6c33.2-49.9,87.8-89.2,124.8-89.2c35.2,3.6,51.8,31.7,45.7,62.6l-73.6,243.3 c-1,5.5,1.9,11.1,6.9,12.8c5.4,1.9,16.8-5.1,26-15.1l44.2-53.1C583,652.3,581,667.9,581,673.9z M571.2,357.6 c-28,0-50.6-20.4-50.6-50.4c0-30,22.7-50.3,50.6-50.3c28,0,50.6,20.4,50.6,50.3C621.8,337.3,599.1,357.6,571.2,357.6z"
}, Q = {
  name: "success",
  fill: "#17B77E",
  viewBox: "0 0 1024 1024",
  path: "M512,72C269,72,72,269,72,512s197,440,440,440s440-197,440-440S755,72,512,72L512,72z M758.9,374 c-48.5,48.6-81.2,76.9-172.3,186.8c-52.6,63.4-102.3,131.5-102.7,132L462.1,720c-4.6,6.1-13.5,6.8-19.1,1.6L267.9,558.9 c-17.8-16.5-18.8-44.4-2.3-62.2s44.4-18.8,62.2-2.3l104.9,97.5c5.5,5.1,14.1,4.5,18.9-1.3c16.2-20.1,38.4-44.5,62.4-68.6 c90.2-90.9,145.6-139.7,175.2-161.3c36-26.2,77.3-48.6,87.3-36.2C792,343.9,782.5,350.3,758.9,374L758.9,374z"
}, W = {
  name: "warning",
  fill: "#FFC603",
  viewBox: "0 0 1024 1024",
  path: "M512,952C269,952,72,755,72,512S269,72,512,72s440,197,440,440S755,952,512,952z M510,770.8 c30.4,0,55-24.6,55-55s-24.6-55-55-55s-55,24.6-55,55S479.6,770.8,510,770.8z M509.8,255.3c-39.3,0-71.2,31.9-71.2,71.2 c0,3.1,0.2,6.2,0.6,9.3L472.4,588c2.5,19.3,18.9,33.7,38.4,33.7c19.4,0,35.8-14.4,38.2-33.7l31.8-252.2c5-39.2-22.8-75-62-79.9 C515.9,255.5,512.8,255.3,509.8,255.3z"
}, X = {
  name: "loading",
  viewBox: "0 0 50 50",
  html: '<g stroke="#f2f2f2" stroke-width="3.5"  stroke-linecap="round" fill="none"><circle cx="25" cy="25" r="20" class="m-loading-icon-bg-path"></circle><circle cx="25" cy="25" r="20" stroke="#20a0ff" stroke-dasharray="90, 150" stroke-dashoffset="0" class="m-loading-icon-active-path"><animate attributeName="stroke-dasharray" dur="1.5s" values="1,200;90,150;90,150" repeatCount="indefinite"/><animate attributeName="stroke-dashoffset" dur="1.5s" values="0;-40px;-120px" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2s" repeatCount="indefinite"/></circle></g>'
};
T.add(V.name, V);
T.add(G.name, G);
T.add(Q.name, Q);
T.add(W.name, W);
T.add(X.name, X);
var Me = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, a] of t)
    s[i] = a;
  return s;
};
function Pe(e, t) {
  const s = de(0);
  return s.value = window.setTimeout(e, t), {
    stop() {
      window.clearTimeout(s.value);
    }
  };
}
const Le = Y({
  components: { Icon: T },
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
  setup(e, { expose: t, emit: s }) {
    const i = ie({
      visible: !0,
      collapsed: e.isCollapsed,
      timer: null
    });
    let a;
    const n = () => {
      e.duration < 0 || ({ stop: a } = Pe(() => {
        r();
      }, e.duration));
    }, o = () => {
      a == null || a();
    }, r = () => {
      i.visible = !1;
    }, l = () => {
      i.collapsed = !i.collapsed, s("collapsed", i.collapsed);
    }, c = () => {
      i.visible = !1;
    }, p = () => {
      e.stopTimerOnHover && o();
    }, b = () => {
      e.stopTimerOnHover && n();
    };
    return le(() => {
      o();
    }), ce(() => {
      n();
    }), t({
      close: r
    }), {
      state: i,
      handleClearTimer: p,
      handleStartTimer: b,
      triggerCollapse: l,
      handleClose: c
    };
  }
}), Ne = ["id"], Re = {
  key: 0,
  class: "m-message-icons"
}, $e = ["src"], Ae = { class: "m-message-content" }, Be = {
  key: 0,
  class: "m-message--title"
}, je = ["innerHTML"], De = {
  key: 0,
  class: "m-message--description"
}, ze = { class: "m-message--control" }, _e = /* @__PURE__ */ S("svg", {
  viewBox: "0 0 35 35",
  width: "20",
  height: "20",
  version: "1.1",
  fill: "currentColor"
}, [
  /* @__PURE__ */ S("path", { d: "M9.4,13.9c-0.2,0.2-0.2,0.6,0,0.8l8.1,8.1l0,0l0,0l8.1-8.1c0.2-0.2,0.2-0.6,0-0.8l-1.3-1.3 c-0.2-0.2-0.6-0.2-0.8,0l-5.5,5.5c-0.2,0.2-0.6,0.2-0.8,0l-5.5-5.5c-0.2-0.2-0.6-0.2-0.8,0L9.4,13.9z" })
], -1), xe = [
  _e
], He = /* @__PURE__ */ S("svg", {
  viewBox: "0 0 35 35",
  width: "20",
  height: "20",
  version: "1.1",
  fill: "currentColor"
}, [
  /* @__PURE__ */ S("path", { d: "M19.5,17.5l5.1,5.1l-2,2l-5.1-5.1l-5.1,5.1l-2-2l5.1-5.1l-5.1-5.1l2-2l5.1,5.1l5.1-5.1l2,2L19.5,17.5z" })
], -1), Ke = [
  He
];
function Fe(e, t, s, i, a, n) {
  const o = ue("icon");
  return m(), x(pe, {
    name: "m-message-fade",
    appear: "",
    mode: "in-out",
    onBeforeLeave: t[4] || (t[4] = (r) => e.$emit("close")),
    onAfterLeave: t[5] || (t[5] = (r) => e.$emit("destroy"))
  }, {
    default: ge(() => [
      e.state.visible ? (m(), u("div", {
        key: 0,
        class: P(["m-message-wrapper", e.wrapperClassName]),
        id: e.id,
        style: he({
          width: e.width
        })
      }, [
        S("div", {
          class: P(["m-message", e.className]),
          onMouseenter: t[2] || (t[2] = (...r) => e.handleClearTimer && e.handleClearTimer(...r)),
          onMouseleave: t[3] || (t[3] = (...r) => e.handleStartTimer && e.handleStartTimer(...r))
        }, [
          e.iconURL || e.type ? (m(), u("div", Re, [
            e.iconURL ? (m(), u("img", {
              key: 0,
              src: e.iconURL,
              class: "m-message--icon"
            }, null, 8, $e)) : e.type ? (m(), x(o, {
              key: 1,
              name: e.type,
              class: "m-message--icon"
            }, null, 8, ["name"])) : h("", !0)
          ])) : h("", !0),
          S("div", Ae, [
            e.title || e.$slots.title ? (m(), u("div", Be, [
              H(e.$slots, "title", {}, () => [
                K(F(e.title), 1)
              ])
            ])) : h("", !0),
            e.supportHTML && e.message ? (m(), u(J, { key: 1 }, [
              e.state.collapsed ? h("", !0) : (m(), u("div", {
                key: 0,
                class: "m-message--description",
                innerHTML: e.message
              }, null, 8, je))
            ], 64)) : (m(), u(J, { key: 2 }, [
              e.state.collapsed ? h("", !0) : (m(), u("div", De, [
                H(e.$slots, "default", {}, () => [
                  K(F(e.message), 1)
                ])
              ]))
            ], 64))
          ]),
          S("div", ze, [
            e.collapsable && (e.title || e.$slots.title) ? (m(), u("button", {
              key: 0,
              class: P(["m-message--button m-message--arrow-down", {
                "is-collapsed": e.state.collapsed
              }]),
              onClick: t[0] || (t[0] = (...r) => e.triggerCollapse && e.triggerCollapse(...r))
            }, xe, 2)) : h("", !0),
            e.closable ? (m(), u("button", {
              key: 1,
              class: "m-message--button m-message--close",
              onClick: t[1] || (t[1] = (...r) => e.handleClose && e.handleClose(...r))
            }, Ke)) : h("", !0)
          ])
        ], 34)
      ], 14, Ne)) : h("", !0)
    ]),
    _: 3
  });
}
var Je = /* @__PURE__ */ Me(Le, [["render", Fe]]);
const $ = [];
let qe = 0;
const L = {};
let ee = {};
const Ue = {
  stopTimerOnHover: !0,
  duration: 3e3
}, d = (e) => {
  const t = "m-message-" + qe++, s = C(g(g(g({}, Ue), ee), e), {
    id: t
  });
  delete s.hasMask, delete s.position, delete s.zIndex;
  const i = e.position || "top-center", a = e.hasMask || !1, n = i + (a ? "-mask" : "");
  let o = L[n];
  o ? o.count++ : (o = L[n] = {
    el: document.createElement("div"),
    count: 1
  }, o.el.className = [
    "m-message-container",
    "is-" + i,
    a ? "has-mask" : ""
  ].filter(function(b) {
    return !!b;
  }).join(" "), document.body.appendChild(o.el)), e.zIndex && (o.el.style.zIndex = String(e.zIndex));
  let r = null;
  me(e.message) ? (r = { default: () => e.message }, s.message = "") : typeof e.message == "function" && (r = { default: e.message }, s.message = "");
  const l = v(Je, s, r), c = document.createElement("div");
  l.appContext = e.ctx || d._context || null, l.props.onClose = e.onClose, l.props.onDestroy = () => {
    o.count--, o.count === 0 && (delete L[n], o.el.remove()), _(null, c);
  }, _(l, c), i.indexOf("bottom") === 0 && o.el.firstChild ? o.el.insertBefore(c.firstElementChild, o.el.firstChild) : o.el.appendChild(c.firstElementChild);
  const p = {
    id: t,
    close() {
      var b, D;
      (D = (b = l == null ? void 0 : l.component) == null ? void 0 : b.exposed) == null || D.close();
    }
  };
  return $.push(p), p;
};
d.success = (e, t) => d(C(g({}, t), { type: "success", message: e }));
d.info = (e, t) => d(C(g({}, t), { type: "info", message: e }));
d.warning = (e, t) => d(C(g({}, t), { type: "warning", message: e }));
d.error = (e, t) => d(C(g({}, t), { type: "error", message: e }));
d.loading = (e, t) => d(C(g({}, t), { type: "loading", message: e }));
d.closeAll = function() {
  for (let e = $.length - 1; e >= 0; e--)
    $[e].close();
};
d.setDefault = (e) => {
  ee = g({}, e);
};
const Ve = (e, t) => (e.install = t, e);
var w = Ve(d, function(e, t = {}) {
  d._context = e._context, e.config.globalProperties["$" + (t.name || "mmessage")] = d, t.defaultOptions && d.setDefault(t.defaultOptions);
});
class Ge {
  constructor() {
    z(this, "defaultOptions", {
      closable: !1,
      duration: 3e3,
      icon: "none",
      mask: !1,
      position: "center"
    });
  }
  success(t = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "success",
      ...t,
      title: t.title || "操作成功"
    });
  }
  error(t = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "error",
      duration: 5e3,
      ...t,
      title: t.title || "操作失败"
    });
  }
  warning(t = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "warning",
      duration: 5e3,
      ...t,
      title: t.title || "警告警告"
    });
  }
  info(t = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "none",
      ...t,
      title: t.title || "提示信息"
    });
  }
  loading(t = {}) {
    this.show({
      ...this.defaultOptions,
      icon: "loading",
      ...t,
      title: t.title || "数据加载中",
      position: "top-center"
    });
  }
  hide(t) {
    t = t || 0, t === 0 ? this.close() : setTimeout(this.close, t);
  }
  close() {
    typeof uni < "u" && uni.hideToast ? uni.hideToast() : w.closeAll();
  }
  show(t) {
    const { title: s, icon: i, mask: a, duration: n, position: o } = t;
    if (typeof uni < "u" && uni.showToast)
      uni.showToast({
        ...t,
        title: s,
        icon: i === "warning" ? "error" : i,
        // uni-app 中没有 loading 图标，使用 none 代替
        duration: n,
        position: o,
        mask: t.mask,
        success: t.success,
        fail: t.fail,
        complete: t.complete
      });
    else {
      let r = "info";
      switch (this.hide(), i) {
        case "success":
          w.success(s, {
            ...t,
            title: "",
            position: o,
            hasMask: a,
            type: r,
            icon: r,
            dangerouslyHTMLString: !0,
            closeOnClick: !0,
            pauseOnFocusLoss: !0,
            pauseOnHover: !0
          });
          break;
        case "error":
          w.error(s, {
            ...t,
            title: "",
            position: o,
            hasMask: a,
            type: r,
            icon: r
          });
          break;
        case "loading":
          w.loading(s, {
            ...t,
            title: "",
            position: o,
            hasMask: a,
            type: r,
            icon: r,
            duration: -1
            // 不自动关闭
          });
          break;
        default:
          w.info(s, {
            ...t,
            title: "",
            position: o,
            hasMask: a,
            type: r,
            icon: r
          });
          break;
      }
    }
  }
}
const A = new Ge(), N = /* @__PURE__ */ new Map(), B = {
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
    fields: s,
    lastModified: i,
    storage: a = "memory"
  }, n, o = -1) {
    if (n == null) return;
    const r = O(e, t, s), l = o !== -1 ? Date.now() + o : void 0, c = `frontCache::${r}`, p = {
      data: n,
      expireAt: l,
      lastModified: i ?? Date.now()
    };
    switch (a) {
      case "memory":
        N.set(c, p);
        break;
      case "uni":
        uni.setStorageSync(c, JSON.stringify(p));
        break;
      case "session":
        sessionStorage.setItem(c, JSON.stringify(p));
        break;
      case "local":
        localStorage.setItem(c, JSON.stringify(p));
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
    fields: s,
    storage: i = "memory"
  }) {
    const n = `frontCache::${O(e, t, s)}`;
    let o = null, r;
    switch (i) {
      case "memory":
        o = N.get(n);
        break;
      case "uni":
        r = uni.getStorageSync(n), o = r ? JSON.parse(r) : null;
        break;
      case "session":
        r = sessionStorage.getItem(n), o = r ? JSON.parse(r) : null;
        break;
      case "local":
        r = localStorage.getItem(n), o = r ? JSON.parse(r) : null;
        break;
    }
    return o && (!o.expireAt || o.expireAt > Date.now()) ? o.data : (B.remove({ key: e, params: t, storage: i }), null);
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
    fields: s,
    storage: i = "memory"
  }) {
    const n = `frontCache::${O(e, t, s)}`;
    switch (i) {
      case "memory":
        N.delete(n);
        break;
      case "uni":
        uni.removeStorageSync(n);
        break;
      case "session":
        sessionStorage.removeItem(n);
        break;
      case "local":
        localStorage.removeItem(n);
        break;
    }
  }
}, R = {}, Qe = (e, t, s) => {
  if (typeof t.header == "object" ? e.header = t.header : typeof t.header == "function" && (e.header = t.header(s.header)), Object.assign(s, e), t.before) {
    const i = t.before.call(t, s);
    if (i !== void 0)
      return i;
  }
  e.loadingText && A.loading({
    title: e.loadingText.toString()
  });
}, j = (e, t, s, i) => {
  if (s.statusCode >= 200 && s.statusCode < 400) {
    const a = s.data;
    if (a.status === k.SUCCESS) {
      const n = a.data;
      e.method === "POST" && t.fieldMap && n && Te(t.fieldMap, n), t.after && t.after.call(t, a, e), i.Result = a;
    } else
      console.error(a), i.Error = {
        status: a.status,
        errno: a.errno,
        msg: a.msg || "请求发生错误"
      }, i.Result = a;
  } else {
    let a;
    const n = s.statusCode;
    switch (n) {
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
    a = `${n}: ${a}`;
    const o = {
      status: k.ERROR,
      errno: n + 1e3,
      msg: a
    };
    console.error(o), i.Error = o;
  }
}, te = (e, t) => {
  console.error(e);
  const s = {
    status: k.ERROR,
    errno: 1e3,
    msg: "网络错误"
  };
  t.Error = s;
}, se = (e, t, s) => {
  !e.hideErrorToast && t.Error ? A.error({ title: t.Error.msg }) : A.hide(1e3), s(t.Result);
}, y = (e, t, s) => {
  const i = JSON.parse(JSON.stringify(oe));
  if (Qe(e, t, i) === !1) return Promise.resolve(null);
  if (e.method === "POST") {
    if (t.cacheTime) {
      const l = B.get({
        ...t,
        key: t.url,
        params: t.params,
        fields: ["Query", "Option.SelectFields"]
      });
      if (l) return Promise.resolve(l);
    }
    const n = O(e.url, t.params, [
      "Query",
      "Option.SelectFields"
    ]), o = R[n];
    if (o)
      return new Promise((l) => {
        o.then(l);
      });
    const r = s(e, t).then((l) => (typeof l == "boolean" || (l == null ? void 0 : l.status) === k.SUCCESS && t.cacheTime && B.set(
      {
        ...t,
        key: t.url,
        params: t.params,
        fields: ["Query", "Option.SelectFields"]
      },
      l == null ? void 0 : l.data,
      t.cacheTime
    ), l)).finally(() => {
      delete R[n];
    });
    return R[n] = r, r;
  } else
    return s(e, t);
}, E = (e, t) => {
  const s = {
    Result: null
  };
  return new Promise((i) => {
    uni.request({
      ...e,
      success: (a) => {
        j(e, t, a, s);
      },
      fail: (a) => {
        te(a, s);
      },
      complete: () => {
        se(t, s, i);
      }
    });
  });
}, tt = (e) => {
  const t = f(e);
  return y(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "数据加载中……"
    },
    e,
    E
  );
}, st = (e, t) => {
  const s = f(e);
  return y(
    {
      url: s,
      dataType: "json",
      method: "PUT",
      data: t,
      timeout: e.timeout,
      loadingText: "正在存储数据……"
    },
    e,
    E
  );
}, ot = (e, t) => {
  const s = f(e);
  return y(
    {
      url: s,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "正在删除数据……"
    },
    e,
    E
  );
}, at = (e, t) => {
  const s = f(e);
  return y(
    {
      url: s,
      dataType: "json",
      method: "POST",
      data: t,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "数据加载中……"
    },
    e,
    E
  );
}, M = (e, t) => {
  const s = {
    Result: null
  };
  return new Promise((i) => {
    fe.request({
      ...e
    }).then((a) => {
      j(
        e,
        t,
        {
          statusCode: a.status,
          data: a.data
        },
        s
      );
    }).catch((a) => {
      var n;
      a.status && a.status > 200 && a.status < 600 ? j(
        e,
        t,
        {
          statusCode: a.status,
          data: (n = a.response) == null ? void 0 : n.data
        },
        s
      ) : te(a, s);
    }).finally(() => {
      se(t, s, i);
    });
  });
}, nt = (e) => {
  const t = f(e);
  return y(
    {
      url: t,
      method: "GET",
      timeout: e.timeout,
      loadingText: e.loadingText ?? "数据加载中……"
    },
    e,
    M
  );
}, rt = (e, t) => {
  const s = f(e);
  return y(
    {
      url: s,
      dataType: "json",
      method: "PUT",
      data: t,
      timeout: e.timeout,
      loadingText: "正在存储数据……"
    },
    e,
    M
  );
}, it = (e, t) => {
  const s = f(e);
  return y(
    {
      url: s,
      dataType: "json",
      method: "DELETE",
      data: t,
      timeout: e.timeout,
      loadingText: "正在删除数据……"
    },
    e,
    M
  );
}, lt = (e, t) => {
  const s = f(e);
  return y(
    {
      url: s,
      dataType: "json",
      method: "POST",
      data: t,
      timeout: e.timeout,
      loadingText: e.loadingText ?? "数据加载中……"
    },
    e,
    M
  );
}, oe = {
  url: "",
  header: { "Content-Type": "application/json" }
}, ct = (e) => {
  Object.assign(oe, e);
}, dt = {};
export {
  ye as API_HOST,
  k as ResStatus,
  Ie as SERVER_HOST,
  dt as default,
  Te as fieldMapping,
  ct as globalRequestOption,
  f as hostUrl,
  it as httpDelete,
  nt as httpGet,
  lt as httpPost,
  rt as httpPut,
  et as isJSON,
  oe as requestConfig,
  A as toast,
  ot as uniDelete,
  tt as uniGet,
  at as uniPost,
  st as uniPut
};
