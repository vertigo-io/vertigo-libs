var ar = Object.defineProperty;
var nr = (a, t, e) => t in a ? ar(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var N = (a, t, e) => nr(a, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as S, ref as W, computed as w, onMounted as be, watch as me, onUnmounted as Te, Comment as rr, cloneVNode as lr, h as da, openBlock as i, createElementBlock as f, normalizeClass as R, createElementVNode as c, withModifiers as J, createTextVNode as F, toDisplayString as v, unref as O, Fragment as z, renderList as U, createVNode as ee, withKeys as Z, withCtx as X, createBlock as V, resolveDynamicComponent as ge, mergeProps as Q, createCommentVNode as b, mergeModels as Le, useModel as we, withDirectives as Be, vModelCheckbox as lt, renderSlot as B, inject as Qe, toRef as ot, provide as Oe, resolveComponent as _e, useCssVars as Ya, nextTick as Qa, normalizeStyle as xe, normalizeProps as De, guardReactiveProps as yt, useAttrs as or, useSlots as Kt, hasInjectionContext as sr, reactive as ir, Teleport as ur, vModelSelect as zt, onBeforeUnmount as dr, Transition as cr, vShow as fr, useId as pr, toHandlers as mr } from "vue";
const Gt = Symbol("accordions"), Xt = Symbol("header"), kt = Symbol("tabs"), $e = () => {
  const a = W(), t = W(!1), e = W(!1), n = () => {
    if (!a.value)
      return;
    a.value.style.setProperty("--collapser", "none");
    const r = a.value.offsetHeight;
    a.value.style.setProperty("--collapse", `${-r}px`), a.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: a,
    collapsing: t,
    cssExpanded: e,
    doExpand: (r) => {
      a.value && (r === !0 && a.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        t.value = !0, n(), window.requestAnimationFrame(() => {
          e.value = r;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (r) => {
      var l, o;
      t.value = !1, (o = (l = a.value) == null ? void 0 : l.querySelector("a")) == null || o.focus(), a.value && r === !1 && a.value.style.removeProperty("--collapse-max-height");
    }
  };
}, hr = "abcdefghijklmnopqrstuvwyz0123456789", ca = hr.repeat(10), vr = () => {
  const a = Math.floor(Math.random() * ca.length);
  return ca[a];
}, gr = (a) => Array.from({ length: a }).map(vr).join(""), re = (a = "", t = "") => (a ? `${a}-` : "") + gr(5) + (t ? `-${t}` : ""), br = { class: "fr-accordion" }, yr = ["aria-expanded", "aria-controls"], kr = ["id"], wr = /* @__PURE__ */ S({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => re("accordion") },
    selected: { type: Boolean },
    title: { default: "Sans intitulé" },
    titleTag: { default: "h3" }
  },
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: o
    } = $e(), s = W(), u = Qe(Gt), { isActive: d, expand: p } = (u == null ? void 0 : u(ot(() => t.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return be(() => {
      d.value && l(!0);
    }), me(d, (m, k) => {
      m !== k && l(m);
    }), (m, k) => (i(), f("section", br, [
      (i(), V(ge(m.titleTag), { class: "fr-accordion__title" }, {
        default: X(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": O(d),
            "aria-controls": m.id,
            type: "button",
            onClick: k[0] || (k[0] = (E) => O(p)())
          }, [
            B(m.$slots, "title", {}, () => [
              F(v(m.title), 1)
            ])
          ], 8, yr)
        ]),
        _: 3
      })),
      c("div", {
        id: m.id,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse", {
          "fr-collapse--expanded": O(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": O(n)
        }]),
        onTransitionend: k[1] || (k[1] = (E) => O(o)(O(d)))
      }, [
        B(m.$slots, "default")
      ], 42, kr)
    ]));
  }
}), _r = { class: "fr-accordions-group" }, xr = /* @__PURE__ */ S({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = w({
      get: () => e.modelValue,
      set(s) {
        n("update:modelValue", s);
      }
    }), l = W(/* @__PURE__ */ new Map()), o = W(0);
    return Oe(Gt, (s) => {
      const u = o.value++;
      l.value.set(u, s.value);
      const d = w(() => u === r.value);
      me(s, () => {
        l.value.set(u, s.value);
      });
      function p() {
        if (r.value === u) {
          r.value = -1;
          return;
        }
        r.value = u;
      }
      return Te(() => {
        l.value.delete(u);
      }), { isActive: d, expand: p };
    }), (s, u) => (i(), f("div", _r, [
      B(s.$slots, "default")
    ]));
  }
}), Dr = ["id", "role"], Tr = ["title", "aria-label"], Ir = /* @__PURE__ */ S({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => re("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = () => n("close"), l = w(
      () => [
        `fr-alert--${e.type}`,
        {
          "fr-alert--sm": e.small
        }
      ]
    );
    return (o, s) => o.closed ? b("", !0) : (i(), f("div", {
      key: 0,
      id: o.id,
      class: R(["fr-alert", l.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? b("", !0) : (i(), V(ge(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: X(() => [
          F(v(o.title), 1)
        ]),
        _: 1
      })),
      B(o.$slots, "default", {}, () => [
        F(v(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: r
      }, null, 8, Tr)) : b("", !0)
    ], 10, Dr));
  }
}), Er = /* @__PURE__ */ S({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(a) {
    return (t, e) => (i(), f("a", {
      class: R(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, v(t.label), 3));
  }
}), Mr = ["title"], Ka = /* @__PURE__ */ S({
  __name: "DsfrBadge",
  props: {
    label: {},
    type: { default: "info" },
    noIcon: { type: Boolean },
    small: { type: Boolean },
    ellipsis: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("p", {
      class: R(["fr-badge", {
        [`fr-badge--${t.type}`]: t.type,
        "fr-badge--no-icon": t.noIcon,
        "fr-badge--sm": t.small
      }]),
      title: t.ellipsis ? t.label : void 0
    }, [
      c("span", {
        class: R(t.ellipsis ? "fr-ellipsis" : "")
      }, v(t.label), 3)
    ], 10, Mr));
  }
}), Cr = ["aria-label"], Pr = ["aria-expanded", "aria-controls"], Lr = ["id"], Br = { class: "fr-breadcrumb__list" }, $r = ["aria-current"], Ar = /* @__PURE__ */ S({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => re("breadcrumb") },
    links: { default: () => [{ text: "" }] },
    navigationLabel: { default: "vous êtes ici :" },
    showBreadcrumbLabel: { default: "Voir le fil d’Ariane" }
  },
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = $e(), o = W(!1);
    return me(o, (s, u) => {
      s !== u && r(s);
    }), (s, u) => {
      const d = _e("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        o.value ? b("", !0) : (i(), f("button", {
          key: 0,
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => o.value = !o.value)
        }, v(s.showBreadcrumbLabel), 9, Pr)),
        c("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: t,
          class: R(["fr-collapse", {
            "fr-collapse--expanded": O(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": O(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => O(l)(o.value))
        }, [
          c("ol", Br, [
            (i(!0), f(z, null, U(s.links, (p, m) => (i(), f("li", {
              key: m,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), V(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": m === s.links.length - 1 ? "page" : void 0
              }, {
                default: X(() => [
                  F(v(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : b("", !0),
              p.to ? b("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === s.links.length - 1 ? "page" : void 0
              }, v(p.text), 9, $r))
            ]))), 128))
          ])
        ], 42, Lr)
      ], 8, Cr);
    };
  }
}), za = /^[a-z0-9]+(-[a-z0-9]+)*$/, wt = (a, t, e, n = "") => {
  const r = a.split(":");
  if (a.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3)
      return null;
    n = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length)
    return null;
  if (r.length > 1) {
    const s = r.pop(), u = r.pop(), d = {
      // Allow provider without '@': "provider:prefix:name"
      provider: r.length > 0 ? r[0] : n,
      prefix: u,
      name: s
    };
    return t && !dt(d) ? null : d;
  }
  const l = r[0], o = l.split("-");
  if (o.length > 1) {
    const s = {
      provider: n,
      prefix: o.shift(),
      name: o.join("-")
    };
    return t && !dt(s) ? null : s;
  }
  if (e && n === "") {
    const s = {
      provider: n,
      prefix: "",
      name: l
    };
    return t && !dt(s, e) ? null : s;
  }
  return null;
}, dt = (a, t) => a ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && a.prefix === "" || a.prefix) && a.name) : !1, Ga = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), ft = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), _t = Object.freeze({
  ...Ga,
  ...ft
}), Bt = Object.freeze({
  ..._t,
  body: "",
  hidden: !1
});
function Sr(a, t) {
  const e = {};
  !a.hFlip != !t.hFlip && (e.hFlip = !0), !a.vFlip != !t.vFlip && (e.vFlip = !0);
  const n = ((a.rotate || 0) + (t.rotate || 0)) % 4;
  return n && (e.rotate = n), e;
}
function fa(a, t) {
  const e = Sr(a, t);
  for (const n in Bt)
    n in ft ? n in a && !(n in e) && (e[n] = ft[n]) : n in t ? e[n] = t[n] : n in a && (e[n] = a[n]);
  return e;
}
function Or(a, t) {
  const e = a.icons, n = a.aliases || /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function l(o) {
    if (e[o])
      return r[o] = [];
    if (!(o in r)) {
      r[o] = null;
      const s = n[o] && n[o].parent, u = s && l(s);
      u && (r[o] = [s].concat(u));
    }
    return r[o];
  }
  return Object.keys(e).concat(Object.keys(n)).forEach(l), r;
}
function Rr(a, t, e) {
  const n = a.icons, r = a.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function o(s) {
    l = fa(
      n[s] || r[s],
      l
    );
  }
  return o(t), e.forEach(o), fa(a, l);
}
function Xa(a, t) {
  const e = [];
  if (typeof a != "object" || typeof a.icons != "object")
    return e;
  a.not_found instanceof Array && a.not_found.forEach((r) => {
    t(r, null), e.push(r);
  });
  const n = Or(a);
  for (const r in n) {
    const l = n[r];
    l && (t(r, Rr(a, r, l)), e.push(r));
  }
  return e;
}
const Fr = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Ga
};
function Mt(a, t) {
  for (const e in t)
    if (e in a && typeof a[e] != typeof t[e])
      return !1;
  return !0;
}
function Ua(a) {
  if (typeof a != "object" || a === null)
    return null;
  const t = a;
  if (typeof t.prefix != "string" || !a.icons || typeof a.icons != "object" || !Mt(a, Fr))
    return null;
  const e = t.icons;
  for (const r in e) {
    const l = e[r];
    if (
      // Name cannot be empty
      !r || // Must have body
      typeof l.body != "string" || // Check other props
      !Mt(
        l,
        Bt
      )
    )
      return null;
  }
  const n = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const r in n) {
    const l = n[r], o = l.parent;
    if (
      // Name cannot be empty
      !r || // Parent must be set and point to existing icon
      typeof o != "string" || !e[o] && !n[o] || // Check other props
      !Mt(
        l,
        Bt
      )
    )
      return null;
  }
  return t;
}
const pa = /* @__PURE__ */ Object.create(null);
function Nr(a, t) {
  return {
    provider: a,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function je(a, t) {
  const e = pa[a] || (pa[a] = /* @__PURE__ */ Object.create(null));
  return e[t] || (e[t] = Nr(a, t));
}
function Ut(a, t) {
  return Ua(t) ? Xa(t, (e, n) => {
    n ? a.icons[e] = n : a.missing.add(e);
  }) : [];
}
function Vr(a, t, e) {
  try {
    if (typeof e.body == "string")
      return a.icons[t] = { ...e }, !0;
  } catch {
  }
  return !1;
}
let et = !1;
function Za(a) {
  return typeof a == "boolean" && (et = a), et;
}
function jr(a) {
  const t = typeof a == "string" ? wt(a, !0, et) : a;
  if (t) {
    const e = je(t.provider, t.prefix), n = t.name;
    return e.icons[n] || (e.missing.has(n) ? null : void 0);
  }
}
function qr(a, t) {
  const e = wt(a, !0, et);
  if (!e)
    return !1;
  const n = je(e.provider, e.prefix);
  return t ? Vr(n, e.name, t) : (n.missing.add(e.name), !0);
}
function Hr(a, t) {
  if (typeof a != "object")
    return !1;
  if (typeof t != "string" && (t = a.provider || ""), et && !t && !a.prefix) {
    let r = !1;
    return Ua(a) && (a.prefix = "", Xa(a, (l, o) => {
      qr(l, o) && (r = !0);
    })), r;
  }
  const e = a.prefix;
  if (!dt({
    provider: t,
    prefix: e,
    name: "a"
  }))
    return !1;
  const n = je(t, e);
  return !!Ut(n, a);
}
const Ja = Object.freeze({
  width: null,
  height: null
}), en = Object.freeze({
  // Dimensions
  ...Ja,
  // Transformations
  ...ft
}), Wr = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Yr = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ma(a, t, e) {
  if (t === 1)
    return a;
  if (e = e || 100, typeof a == "number")
    return Math.ceil(a * t * e) / e;
  if (typeof a != "string")
    return a;
  const n = a.split(Wr);
  if (n === null || !n.length)
    return a;
  const r = [];
  let l = n.shift(), o = Yr.test(l);
  for (; ; ) {
    if (o) {
      const s = parseFloat(l);
      isNaN(s) ? r.push(l) : r.push(Math.ceil(s * t * e) / e);
    } else
      r.push(l);
    if (l = n.shift(), l === void 0)
      return r.join("");
    o = !o;
  }
}
function Qr(a, t = "defs") {
  let e = "";
  const n = a.indexOf("<" + t);
  for (; n >= 0; ) {
    const r = a.indexOf(">", n), l = a.indexOf("</" + t);
    if (r === -1 || l === -1)
      break;
    const o = a.indexOf(">", l);
    if (o === -1)
      break;
    e += a.slice(r + 1, l).trim(), a = a.slice(0, n).trim() + a.slice(o + 1);
  }
  return {
    defs: e,
    content: a
  };
}
function Kr(a, t) {
  return a ? "<defs>" + a + "</defs>" + t : t;
}
function zr(a, t, e) {
  const n = Qr(a);
  return Kr(n.defs, t + n.content + e);
}
const Gr = (a) => a === "unset" || a === "undefined" || a === "none";
function Xr(a, t) {
  const e = {
    ..._t,
    ...a
  }, n = {
    ...en,
    ...t
  }, r = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  let l = e.body;
  [e, n].forEach((A) => {
    const y = [], D = A.hFlip, T = A.vFlip;
    let P = A.rotate;
    D ? T ? P += 2 : (y.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), y.push("scale(-1 1)"), r.top = r.left = 0) : T && (y.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), y.push("scale(1 -1)"), r.top = r.left = 0);
    let I;
    switch (P < 0 && (P -= Math.floor(P / 4) * 4), P = P % 4, P) {
      case 1:
        I = r.height / 2 + r.top, y.unshift(
          "rotate(90 " + I.toString() + " " + I.toString() + ")"
        );
        break;
      case 2:
        y.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        I = r.width / 2 + r.left, y.unshift(
          "rotate(-90 " + I.toString() + " " + I.toString() + ")"
        );
        break;
    }
    P % 2 === 1 && (r.left !== r.top && (I = r.left, r.left = r.top, r.top = I), r.width !== r.height && (I = r.width, r.width = r.height, r.height = I)), y.length && (l = zr(
      l,
      '<g transform="' + y.join(" ") + '">',
      "</g>"
    ));
  });
  const o = n.width, s = n.height, u = r.width, d = r.height;
  let p, m;
  o === null ? (m = s === null ? "1em" : s === "auto" ? d : s, p = ma(m, u / d)) : (p = o === "auto" ? u : o, m = s === null ? ma(p, d / u) : s === "auto" ? d : s);
  const k = {}, E = (A, y) => {
    Gr(y) || (k[A] = y.toString());
  };
  E("width", p), E("height", m);
  const _ = [r.left, r.top, u, d];
  return k.viewBox = _.join(" "), {
    attributes: k,
    viewBox: _,
    body: l
  };
}
const Ur = /\sid="(\S+)"/g, Zr = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Jr = 0;
function el(a, t = Zr) {
  const e = [];
  let n;
  for (; n = Ur.exec(a); )
    e.push(n[1]);
  if (!e.length)
    return a;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return e.forEach((l) => {
    const o = typeof t == "function" ? t(l) : t + (Jr++).toString(), s = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    a = a.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"),
      "$1" + o + r + "$3"
    );
  }), a = a.replace(new RegExp(r, "g"), ""), a;
}
const $t = /* @__PURE__ */ Object.create(null);
function tl(a, t) {
  $t[a] = t;
}
function At(a) {
  return $t[a] || $t[""];
}
function Zt(a) {
  let t;
  if (typeof a.resources == "string")
    t = [a.resources];
  else if (t = a.resources, !(t instanceof Array) || !t.length)
    return null;
  return {
    // API hosts
    resources: t,
    // Root path
    path: a.path || "/",
    // URL length limit
    maxURL: a.maxURL || 500,
    // Timeout before next host is used.
    rotate: a.rotate || 750,
    // Timeout before failing query.
    timeout: a.timeout || 5e3,
    // Randomise default API end point.
    random: a.random === !0,
    // Start index
    index: a.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: a.dataAfterTimeout !== !1
  };
}
const Jt = /* @__PURE__ */ Object.create(null), st = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], St = [];
for (; st.length > 0; )
  st.length === 1 || Math.random() > 0.5 ? St.push(st.shift()) : St.push(st.pop());
Jt[""] = Zt({
  resources: ["https://api.iconify.design"].concat(St)
});
function al(a, t) {
  const e = Zt(t);
  return e === null ? !1 : (Jt[a] = e, !0);
}
function ea(a) {
  return Jt[a];
}
const nl = () => {
  let a;
  try {
    if (a = fetch, typeof a == "function")
      return a;
  } catch {
  }
};
let ha = nl();
function rl(a, t) {
  const e = ea(a);
  if (!e)
    return 0;
  let n;
  if (!e.maxURL)
    n = 0;
  else {
    let r = 0;
    e.resources.forEach((o) => {
      r = Math.max(r, o.length);
    });
    const l = t + ".json?icons=";
    n = e.maxURL - r - e.path.length - l.length;
  }
  return n;
}
function ll(a) {
  return a === 404;
}
const ol = (a, t, e) => {
  const n = [], r = rl(a, t), l = "icons";
  let o = {
    type: l,
    provider: a,
    prefix: t,
    icons: []
  }, s = 0;
  return e.forEach((u, d) => {
    s += u.length + 1, s >= r && d > 0 && (n.push(o), o = {
      type: l,
      provider: a,
      prefix: t,
      icons: []
    }, s = u.length), o.icons.push(u);
  }), n.push(o), n;
};
function sl(a) {
  if (typeof a == "string") {
    const t = ea(a);
    if (t)
      return t.path;
  }
  return "/";
}
const il = (a, t, e) => {
  if (!ha) {
    e("abort", 424);
    return;
  }
  let n = sl(t.provider);
  switch (t.type) {
    case "icons": {
      const l = t.prefix, o = t.icons.join(","), s = new URLSearchParams({
        icons: o
      });
      n += l + ".json?" + s.toString();
      break;
    }
    case "custom": {
      const l = t.uri;
      n += l.slice(0, 1) === "/" ? l.slice(1) : l;
      break;
    }
    default:
      e("abort", 400);
      return;
  }
  let r = 503;
  ha(a + n).then((l) => {
    const o = l.status;
    if (o !== 200) {
      setTimeout(() => {
        e(ll(o) ? "abort" : "next", o);
      });
      return;
    }
    return r = 501, l.json();
  }).then((l) => {
    if (typeof l != "object" || l === null) {
      setTimeout(() => {
        l === 404 ? e("abort", l) : e("next", r);
      });
      return;
    }
    setTimeout(() => {
      e("success", l);
    });
  }).catch(() => {
    e("next", r);
  });
}, ul = {
  prepare: ol,
  send: il
};
function dl(a) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, e = /* @__PURE__ */ Object.create(null);
  a.sort((r, l) => r.provider !== l.provider ? r.provider.localeCompare(l.provider) : r.prefix !== l.prefix ? r.prefix.localeCompare(l.prefix) : r.name.localeCompare(l.name));
  let n = {
    provider: "",
    prefix: "",
    name: ""
  };
  return a.forEach((r) => {
    if (n.name === r.name && n.prefix === r.prefix && n.provider === r.provider)
      return;
    n = r;
    const l = r.provider, o = r.prefix, s = r.name, u = e[l] || (e[l] = /* @__PURE__ */ Object.create(null)), d = u[o] || (u[o] = je(l, o));
    let p;
    s in d.icons ? p = t.loaded : o === "" || d.missing.has(s) ? p = t.missing : p = t.pending;
    const m = {
      provider: l,
      prefix: o,
      name: s
    };
    p.push(m);
  }), t;
}
function tn(a, t) {
  a.forEach((e) => {
    const n = e.loaderCallbacks;
    n && (e.loaderCallbacks = n.filter((r) => r.id !== t));
  });
}
function cl(a) {
  a.pendingCallbacksFlag || (a.pendingCallbacksFlag = !0, setTimeout(() => {
    a.pendingCallbacksFlag = !1;
    const t = a.loaderCallbacks ? a.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let e = !1;
    const n = a.provider, r = a.prefix;
    t.forEach((l) => {
      const o = l.icons, s = o.pending.length;
      o.pending = o.pending.filter((u) => {
        if (u.prefix !== r)
          return !0;
        const d = u.name;
        if (a.icons[d])
          o.loaded.push({
            provider: n,
            prefix: r,
            name: d
          });
        else if (a.missing.has(d))
          o.missing.push({
            provider: n,
            prefix: r,
            name: d
          });
        else
          return e = !0, !0;
        return !1;
      }), o.pending.length !== s && (e || tn([a], l.id), l.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let fl = 0;
function pl(a, t, e) {
  const n = fl++, r = tn.bind(null, e, n);
  if (!t.pending.length)
    return r;
  const l = {
    id: n,
    icons: t,
    callback: a,
    abort: r
  };
  return e.forEach((o) => {
    (o.loaderCallbacks || (o.loaderCallbacks = [])).push(l);
  }), r;
}
function ml(a, t = !0, e = !1) {
  const n = [];
  return a.forEach((r) => {
    const l = typeof r == "string" ? wt(r, t, e) : r;
    l && n.push(l);
  }), n;
}
var hl = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function vl(a, t, e, n) {
  const r = a.resources.length, l = a.random ? Math.floor(Math.random() * r) : a.index;
  let o;
  if (a.random) {
    let h = a.resources.slice(0);
    for (o = []; h.length > 1; ) {
      const x = Math.floor(Math.random() * h.length);
      o.push(h[x]), h = h.slice(0, x).concat(h.slice(x + 1));
    }
    o = o.concat(h);
  } else
    o = a.resources.slice(l).concat(a.resources.slice(0, l));
  const s = Date.now();
  let u = "pending", d = 0, p, m = null, k = [], E = [];
  typeof n == "function" && E.push(n);
  function _() {
    m && (clearTimeout(m), m = null);
  }
  function A() {
    u === "pending" && (u = "aborted"), _(), k.forEach((h) => {
      h.status === "pending" && (h.status = "aborted");
    }), k = [];
  }
  function y(h, x) {
    x && (E = []), typeof h == "function" && E.push(h);
  }
  function D() {
    return {
      startTime: s,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: k.length,
      subscribe: y,
      abort: A
    };
  }
  function T() {
    u = "failed", E.forEach((h) => {
      h(void 0, p);
    });
  }
  function P() {
    k.forEach((h) => {
      h.status === "pending" && (h.status = "aborted");
    }), k = [];
  }
  function I(h, x, g) {
    const H = x !== "success";
    switch (k = k.filter((q) => q !== h), u) {
      case "pending":
        break;
      case "failed":
        if (H || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (x === "abort") {
      p = g, T();
      return;
    }
    if (H) {
      p = g, k.length || (o.length ? M() : T());
      return;
    }
    if (_(), P(), !a.random) {
      const q = a.resources.indexOf(h.resource);
      q !== -1 && q !== a.index && (a.index = q);
    }
    u = "completed", E.forEach((q) => {
      q(g);
    });
  }
  function M() {
    if (u !== "pending")
      return;
    _();
    const h = o.shift();
    if (h === void 0) {
      if (k.length) {
        m = setTimeout(() => {
          _(), u === "pending" && (P(), T());
        }, a.timeout);
        return;
      }
      T();
      return;
    }
    const x = {
      status: "pending",
      resource: h,
      callback: (g, H) => {
        I(x, g, H);
      }
    };
    k.push(x), d++, m = setTimeout(M, a.rotate), e(h, t, x.callback);
  }
  return setTimeout(M), D;
}
function an(a) {
  const t = {
    ...hl,
    ...a
  };
  let e = [];
  function n() {
    e = e.filter((o) => o().status === "pending");
  }
  function r(o, s, u) {
    const d = vl(
      t,
      o,
      s,
      (p, m) => {
        n(), u && u(p, m);
      }
    );
    return e.push(d), d;
  }
  function l(o) {
    return e.find((s) => o(s)) || null;
  }
  return {
    query: r,
    find: l,
    setIndex: (o) => {
      t.index = o;
    },
    getIndex: () => t.index,
    cleanup: n
  };
}
function va() {
}
const Ct = /* @__PURE__ */ Object.create(null);
function gl(a) {
  if (!Ct[a]) {
    const t = ea(a);
    if (!t)
      return;
    const e = an(t), n = {
      config: t,
      redundancy: e
    };
    Ct[a] = n;
  }
  return Ct[a];
}
function bl(a, t, e) {
  let n, r;
  if (typeof a == "string") {
    const l = At(a);
    if (!l)
      return e(void 0, 424), va;
    r = l.send;
    const o = gl(a);
    o && (n = o.redundancy);
  } else {
    const l = Zt(a);
    if (l) {
      n = an(l);
      const o = a.resources ? a.resources[0] : "", s = At(o);
      s && (r = s.send);
    }
  }
  return !n || !r ? (e(void 0, 424), va) : n.query(t, r, e)().abort;
}
const ga = "iconify2", tt = "iconify", nn = tt + "-count", ba = tt + "-version", rn = 36e5, yl = 168, kl = 50;
function Ot(a, t) {
  try {
    return a.getItem(t);
  } catch {
  }
}
function ta(a, t, e) {
  try {
    return a.setItem(t, e), !0;
  } catch {
  }
}
function ya(a, t) {
  try {
    a.removeItem(t);
  } catch {
  }
}
function Rt(a, t) {
  return ta(a, nn, t.toString());
}
function Ft(a) {
  return parseInt(Ot(a, nn)) || 0;
}
const xt = {
  local: !0,
  session: !0
}, ln = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let aa = !1;
function wl(a) {
  aa = a;
}
let it = typeof window > "u" ? {} : window;
function on(a) {
  const t = a + "Storage";
  try {
    if (it && it[t] && typeof it[t].length == "number")
      return it[t];
  } catch {
  }
  xt[a] = !1;
}
function sn(a, t) {
  const e = on(a);
  if (!e)
    return;
  const n = Ot(e, ba);
  if (n !== ga) {
    if (n) {
      const s = Ft(e);
      for (let u = 0; u < s; u++)
        ya(e, tt + u.toString());
    }
    ta(e, ba, ga), Rt(e, 0);
    return;
  }
  const r = Math.floor(Date.now() / rn) - yl, l = (s) => {
    const u = tt + s.toString(), d = Ot(e, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > r && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        t(p, s))
          return !0;
      } catch {
      }
      ya(e, u);
    }
  };
  let o = Ft(e);
  for (let s = o - 1; s >= 0; s--)
    l(s) || (s === o - 1 ? (o--, Rt(e, o)) : ln[a].add(s));
}
function un() {
  if (!aa) {
    wl(!0);
    for (const a in xt)
      sn(a, (t) => {
        const e = t.data, n = t.provider, r = e.prefix, l = je(
          n,
          r
        );
        if (!Ut(l, e).length)
          return !1;
        const o = e.lastModified || -1;
        return l.lastModifiedCached = l.lastModifiedCached ? Math.min(l.lastModifiedCached, o) : o, !0;
      });
  }
}
function _l(a, t) {
  const e = a.lastModifiedCached;
  if (
    // Matches or newer
    e && e >= t
  )
    return e === t;
  if (a.lastModifiedCached = t, e)
    for (const n in xt)
      sn(n, (r) => {
        const l = r.data;
        return r.provider !== a.provider || l.prefix !== a.prefix || l.lastModified === t;
      });
  return !0;
}
function xl(a, t) {
  aa || un();
  function e(n) {
    let r;
    if (!xt[n] || !(r = on(n)))
      return;
    const l = ln[n];
    let o;
    if (l.size)
      l.delete(o = Array.from(l).shift());
    else if (o = Ft(r), o >= kl || !Rt(r, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / rn),
      provider: a.provider,
      data: t
    };
    return ta(
      r,
      tt + o.toString(),
      JSON.stringify(s)
    );
  }
  t.lastModified && !_l(a, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), e("local") || e("session"));
}
function ka() {
}
function Dl(a) {
  a.iconsLoaderFlag || (a.iconsLoaderFlag = !0, setTimeout(() => {
    a.iconsLoaderFlag = !1, cl(a);
  }));
}
function Tl(a) {
  const t = [], e = [];
  return a.forEach((n) => {
    (n.match(za) ? t : e).push(n);
  }), {
    valid: t,
    invalid: e
  };
}
function Ge(a, t, e, n) {
  function r() {
    const l = a.pendingIcons;
    t.forEach((o) => {
      l && l.delete(o), a.icons[o] || a.missing.add(o);
    });
  }
  if (e && typeof e == "object")
    try {
      if (!Ut(a, e).length) {
        r();
        return;
      }
      n && xl(a, e);
    } catch (l) {
      console.error(l);
    }
  r(), Dl(a);
}
function wa(a, t) {
  a instanceof Promise ? a.then((e) => {
    t(e);
  }).catch(() => {
    t(null);
  }) : t(a);
}
function Il(a, t) {
  a.iconsToLoad ? a.iconsToLoad = a.iconsToLoad.concat(t).sort() : a.iconsToLoad = t, a.iconsQueueFlag || (a.iconsQueueFlag = !0, setTimeout(() => {
    a.iconsQueueFlag = !1;
    const { provider: e, prefix: n } = a, r = a.iconsToLoad;
    if (delete a.iconsToLoad, !r || !r.length)
      return;
    const l = a.loadIcon;
    if (a.loadIcons && (r.length > 1 || !l)) {
      wa(
        a.loadIcons(r, n, e),
        (d) => {
          Ge(a, r, d, !1);
        }
      );
      return;
    }
    if (l) {
      r.forEach((d) => {
        const p = l(d, n, e);
        wa(p, (m) => {
          const k = m ? {
            prefix: n,
            icons: {
              [d]: m
            }
          } : null;
          Ge(a, [d], k, !1);
        });
      });
      return;
    }
    const { valid: o, invalid: s } = Tl(r);
    if (s.length && Ge(a, s, null, !1), !o.length)
      return;
    const u = n.match(za) ? At(e) : null;
    if (!u) {
      Ge(a, o, null, !1);
      return;
    }
    u.prepare(e, n, o).forEach((d) => {
      bl(e, d, (p) => {
        Ge(a, d.icons, p, !0);
      });
    });
  }));
}
const El = (a, t) => {
  const e = ml(a, !0, Za()), n = dl(e);
  if (!n.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        n.loaded,
        n.missing,
        n.pending,
        ka
      );
    }), () => {
      u = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), l = [];
  let o, s;
  return n.pending.forEach((u) => {
    const { provider: d, prefix: p } = u;
    if (p === s && d === o)
      return;
    o = d, s = p, l.push(je(d, p));
    const m = r[d] || (r[d] = /* @__PURE__ */ Object.create(null));
    m[p] || (m[p] = []);
  }), n.pending.forEach((u) => {
    const { provider: d, prefix: p, name: m } = u, k = je(d, p), E = k.pendingIcons || (k.pendingIcons = /* @__PURE__ */ new Set());
    E.has(m) || (E.add(m), r[d][p].push(m));
  }), l.forEach((u) => {
    const d = r[u.provider][u.prefix];
    d.length && Il(u, d);
  }), t ? pl(t, n, l) : ka;
};
function Ml(a, t) {
  const e = {
    ...a
  };
  for (const n in t) {
    const r = t[n], l = typeof r;
    n in Ja ? (r === null || r && (l === "string" || l === "number")) && (e[n] = r) : l === typeof e[n] && (e[n] = n === "rotate" ? r % 4 : r);
  }
  return e;
}
const Cl = /[\s,]+/;
function Pl(a, t) {
  t.split(Cl).forEach((e) => {
    switch (e.trim()) {
      case "horizontal":
        a.hFlip = !0;
        break;
      case "vertical":
        a.vFlip = !0;
        break;
    }
  });
}
function Ll(a, t = 0) {
  const e = a.replace(/^-?[0-9.]*/, "");
  function n(r) {
    for (; r < 0; )
      r += 4;
    return r % 4;
  }
  if (e === "") {
    const r = parseInt(a);
    return isNaN(r) ? 0 : n(r);
  } else if (e !== a) {
    let r = 0;
    switch (e) {
      case "%":
        r = 25;
        break;
      case "deg":
        r = 90;
    }
    if (r) {
      let l = parseFloat(a.slice(0, a.length - e.length));
      return isNaN(l) ? 0 : (l = l / r, l % 1 === 0 ? n(l) : 0);
    }
  }
  return t;
}
function Bl(a, t) {
  let e = a.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in t)
    e += " " + n + '="' + t[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + a + "</svg>";
}
function $l(a) {
  return a.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Al(a) {
  return "data:image/svg+xml," + $l(a);
}
function Sl(a) {
  return 'url("' + Al(a) + '")';
}
const _a = {
  ...en,
  inline: !1
}, Ol = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Rl = {
  display: "inline-block"
}, Nt = {
  backgroundColor: "currentColor"
}, dn = {
  backgroundColor: "transparent"
}, xa = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Da = {
  webkitMask: Nt,
  mask: Nt,
  background: dn
};
for (const a in Da) {
  const t = Da[a];
  for (const e in xa)
    t[a + e] = xa[e];
}
const ct = {};
["horizontal", "vertical"].forEach((a) => {
  const t = a.slice(0, 1) + "Flip";
  ct[a + "-flip"] = t, ct[a.slice(0, 1) + "-flip"] = t, ct[a + "Flip"] = t;
});
function Ta(a) {
  return a + (a.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ia = (a, t) => {
  const e = Ml(_a, t), n = { ...Ol }, r = t.mode || "svg", l = {}, o = t.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
  for (let A in t) {
    const y = t[A];
    if (y !== void 0)
      switch (A) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          e[A] = y === !0 || y === "true" || y === 1;
          break;
        case "flip":
          typeof y == "string" && Pl(e, y);
          break;
        case "color":
          l.color = y;
          break;
        case "rotate":
          typeof y == "string" ? e[A] = Ll(y) : typeof y == "number" && (e[A] = y);
          break;
        case "ariaHidden":
        case "aria-hidden":
          y !== !0 && y !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const D = ct[A];
          D ? (y === !0 || y === "true" || y === 1) && (e[D] = !0) : _a[A] === void 0 && (n[A] = y);
        }
      }
  }
  const u = Xr(a, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...s
    }, Object.assign(n, d);
    let A = 0, y = t.id;
    return typeof y == "string" && (y = y.replace(/-/g, "_")), n.innerHTML = el(u.body, y ? () => y + "ID" + A++ : "iconifyVue"), da("svg", n);
  }
  const { body: p, width: m, height: k } = a, E = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), _ = Bl(p, {
    ...d,
    width: m + "",
    height: k + ""
  });
  return n.style = {
    ...l,
    "--svg": Sl(_),
    width: Ta(d.width),
    height: Ta(d.height),
    ...Rl,
    ...E ? Nt : dn,
    ...s
  }, da("span", n);
};
Za(!0);
tl("", ul);
if (typeof document < "u" && typeof window < "u") {
  un();
  const a = window;
  if (a.IconifyPreload !== void 0) {
    const t = a.IconifyPreload, e = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((n) => {
      try {
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !Hr(n)) && console.error(e);
      } catch {
        console.error(e);
      }
    });
  }
  if (a.IconifyProviders !== void 0) {
    const t = a.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let e in t) {
        const n = "IconifyProviders[" + e + "] is invalid.";
        try {
          const r = t[e];
          if (typeof r != "object" || !r || r.resources === void 0)
            continue;
          al(e, r) || console.error(n);
        } catch {
          console.error(n);
        }
      }
  }
}
const Fl = {
  ..._t,
  body: ""
}, Nl = S({
  // Do not inherit other attributes: it is handled by render()
  inheritAttrs: !1,
  // Set initial data
  data() {
    return {
      // Current icon name
      _name: "",
      // Loading
      _loadingIcon: null,
      // Mounted status
      iconMounted: !1,
      // Callback counter to trigger re-render
      counter: 0
    };
  },
  mounted() {
    this.iconMounted = !0;
  },
  unmounted() {
    this.abortLoading();
  },
  methods: {
    abortLoading() {
      this._loadingIcon && (this._loadingIcon.abort(), this._loadingIcon = null);
    },
    // Get data for icon to render or null
    getIcon(a, t, e) {
      if (typeof a == "object" && a !== null && typeof a.body == "string")
        return this._name = "", this.abortLoading(), {
          data: a
        };
      let n;
      if (typeof a != "string" || (n = wt(a, !1, !0)) === null)
        return this.abortLoading(), null;
      let r = jr(n);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== a) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: a,
          abort: El([n], () => {
            this.counter++;
          })
        })), null;
      if (this.abortLoading(), this._name !== a && (this._name = a, t && t(a)), e) {
        r = Object.assign({}, r);
        const o = e(r.body, n.name, n.prefix, n.provider);
        typeof o == "string" && (r.body = o);
      }
      const l = ["iconify"];
      return n.prefix !== "" && l.push("iconify--" + n.prefix), n.provider !== "" && l.push("iconify--" + n.provider), { data: r, classes: l };
    }
  },
  // Render icon
  render() {
    this.counter;
    const a = this.$attrs, t = this.iconMounted || a.ssr ? this.getIcon(a.icon, a.onLoad, a.customise) : null;
    if (!t)
      return Ia(Fl, a);
    let e = a;
    return t.classes && (e = {
      ...a,
      class: (typeof a.class == "string" ? a.class + " " : "") + t.classes.join(" ")
    }), Ia({
      ..._t,
      ...t.data
    }, e);
  }
}), Vl = /* @__PURE__ */ S({
  __name: "VIcon",
  props: {
    name: {},
    scale: { default: 1 },
    verticalAlign: { default: "-0.2em" },
    animation: {},
    speed: {},
    flip: {},
    label: {},
    title: {},
    color: {},
    fill: {},
    inverse: { type: Boolean },
    ssr: { type: Boolean },
    display: { default: "inline-block" }
  },
  setup(a) {
    Ya((u) => ({
      "177d0d84": s.value
    }));
    const t = a, e = W(null), n = w(() => `${+t.scale * 1.2}rem`), r = w(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    me(() => t.title, l);
    async function l() {
      var u, d, p, m;
      if (!((u = e.value) != null && u.$el))
        return;
      const k = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), E = document.createElement("title");
      if (!t.title) {
        E.remove();
        return;
      }
      E.innerHTML = t.title, await Qa(), k || (m = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || m.before(E);
    }
    be(l);
    const o = w(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), s = w(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), V(O(Nl), {
      ref_key: "icon",
      ref: e,
      icon: o.value,
      style: xe({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: R(["vicon", {
        "vicon-spin": t.animation === "spin",
        "vicon-wrench": t.animation === "wrench",
        "vicon-pulse": t.animation === "pulse",
        "vicon-spin-pulse": t.animation === "spin-pulse",
        "vicon-flash": t.animation === "flash",
        "vicon-float": t.animation === "float",
        "vicon-ring": t.animation === "ring",
        "vicon-slow": t.speed === "slow",
        "vicon-fast": t.speed === "fast",
        "vicon-inverse": t.inverse
      }]),
      flip: r.value,
      ssr: u.ssr
    }, null, 8, ["icon", "style", "aria-label", "class", "flip", "ssr"]));
  }
}), ke = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, pe = /* @__PURE__ */ ke(Vl, [["__scopeId", "data-v-73a1cd7e"]]), jl = ["title", "disabled", "aria-disabled"], ql = { key: 1 }, Hl = /* @__PURE__ */ S({
  __name: "DsfrButton",
  props: {
    disabled: { type: Boolean },
    label: { default: void 0 },
    secondary: { type: Boolean },
    tertiary: { type: Boolean },
    iconRight: { type: Boolean },
    iconOnly: { type: Boolean },
    noOutline: { type: Boolean },
    size: { default: "md" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  setup(a, { expose: t }) {
    const e = a, n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["md", "medium"].includes(e.size)), l = w(() => ["lg", "large"].includes(e.size)), o = W(null);
    t({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const s = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = w(() => e.iconOnly ? 1.25 : 0.8325), d = w(
      () => typeof e.icon == "string" ? { scale: u.value, name: e.icon } : { scale: u.value, ...e.icon }
    );
    return (p, m) => (i(), f("button", {
      ref_key: "btn",
      ref: o,
      class: R(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": n.value,
        "fr-btn--md": r.value,
        "fr-btn--lg": l.value,
        "fr-btn--icon-right": !p.iconOnly && s.value && p.iconRight,
        "fr-btn--icon-left": !p.iconOnly && s.value && !p.iconRight,
        "inline-flex": !s.value,
        reverse: p.iconRight && !s.value,
        "justify-center": !s.value && p.iconOnly,
        [p.icon]: s.value
      }]),
      title: p.iconOnly ? p.label : void 0,
      disabled: p.disabled,
      "aria-disabled": p.disabled,
      style: xe(!s.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: m[0] || (m[0] = (k) => p.onClick ? p.onClick(k) : () => {
      })
    }, [
      p.icon && !s.value ? (i(), V(pe, De(Q({ key: 0 }, d.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", ql, [
        F(v(p.label) + " ", 1),
        B(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, jl));
  }
}), qe = /* @__PURE__ */ ke(Hl, [["__scopeId", "data-v-118397f5"]]), Dt = /* @__PURE__ */ S({
  __name: "DsfrButtonGroup",
  props: {
    buttons: { default: () => [] },
    reverse: { type: Boolean },
    equisized: { type: Boolean },
    iconRight: { type: Boolean },
    align: { default: void 0 },
    inlineLayoutWhen: { type: [String, Boolean], default: "never" },
    size: { default: "md" }
  },
  setup(a) {
    const t = a, e = W(null), n = w(() => ["sm", "small"].includes(t.size)), r = w(() => ["md", "medium"].includes(t.size)), l = w(() => ["lg", "large"].includes(t.size)), o = w(() => ["always", "", !0].includes(t.inlineLayoutWhen)), s = w(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = w(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = w(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = w(() => t.align === "center"), m = w(() => t.align === "right"), k = W("auto"), E = w(() => `--equisized-width: ${k.value};`), _ = async () => {
      var A;
      let y = 0;
      await new Promise((D) => setTimeout(D, 100)), (A = e.value) == null || A.querySelectorAll(".fr-btn").forEach((D) => {
        const T = D, P = T.offsetWidth, I = window.getComputedStyle(T), M = +I.marginLeft.replace("px", ""), h = +I.marginRight.replace("px", "");
        T.style.width = "var(--equisized-width)";
        const x = P + M + h;
        x > y && (y = x);
      }), k.value = `${y}px`;
    };
    return be(async () => {
      !e.value || !t.equisized || await _();
    }), (A, y) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: xe(E.value),
      class: R(["fr-btns-group", {
        "fr-btns-group--equisized": A.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || u.value,
        "fr-btns-group--inline-lg": o.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": A.iconRight,
        "fr-btns-group--inline-reverse": A.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(z, null, U(A.buttons, ({ onClick: D, ...T }, P) => (i(), f("li", { key: P }, [
        ee(qe, Q({ ref_for: !0 }, T, { onClick: D }), null, 16, ["onClick"])
      ]))), 128)),
      B(A.$slots, "default")
    ], 6));
  }
}), Wl = {
  key: 2,
  class: "fr-callout__text"
}, Yl = {
  key: 4,
  class: "fr-callout__text"
}, Ql = /* @__PURE__ */ S({
  __name: "DsfrCallout",
  props: {
    title: {},
    content: {},
    titleTag: { default: "h3" },
    button: { default: () => {
    } },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : { ...t.icon ?? {} });
    return (r, l) => (i(), f("div", {
      class: R(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && n.value ? (i(), V(pe, De(Q({ key: 0 }, n.value)), null, 16)) : b("", !0),
      r.title ? (i(), V(ge(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: X(() => [
          F(v(r.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      r.content ? (i(), f("p", Wl, v(r.content), 1)) : b("", !0),
      r.button ? (i(), V(qe, De(Q({ key: 3 }, r.button)), null, 16)) : b("", !0),
      r.$slots.default && !r.content ? (i(), f("div", Yl, [
        B(r.$slots, "default", {}, void 0, !0)
      ])) : B(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), Kl = /* @__PURE__ */ ke(Ql, [["__scopeId", "data-v-c59b3cec"]]), Vt = /* @__PURE__ */ S({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const t = a, e = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: R(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), V(pe, De(Q({ key: 0 }, n.value)), null, 16)) : b("", !0),
      B(r.$slots, "default")
    ], 2));
  }
}), zl = { class: "fr-card__body" }, Gl = { class: "fr-card__content" }, Xl = ["href"], Ul = { class: "fr-card__desc" }, Zl = {
  key: 0,
  class: "fr-card__start"
}, Jl = {
  key: 1,
  class: "fr-card__end"
}, eo = {
  key: 0,
  class: "fr-card__footer"
}, to = {
  key: 1,
  class: "fr-links-group"
}, ao = ["href"], no = {
  key: 0,
  class: "fr-card__header"
}, ro = {
  key: 0,
  class: "fr-card__img"
}, lo = ["src", "alt"], oo = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, so = /* @__PURE__ */ S({
  __name: "DsfrCard",
  props: {
    imgSrc: { default: void 0 },
    link: { default: void 0 },
    title: {},
    description: {},
    size: { default: "md" },
    detail: { default: void 0 },
    detailIcon: { default: void 0 },
    endDetail: { default: void 0 },
    endDetailIcon: { default: void 0 },
    altImg: { default: "" },
    titleTag: { default: "h3" },
    badges: { default: () => [] },
    buttons: { default: () => [] },
    imgRatio: { default: "md" },
    linksGroup: { default: () => [] },
    noArrow: { type: Boolean },
    horizontal: { type: Boolean },
    download: { type: Boolean },
    enlarge: { type: Boolean }
  },
  setup(a, { expose: t }) {
    const e = a, n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["lg", "large"].includes(e.size)), l = w(() => ["sm", "small"].includes(e.imgRatio)), o = w(() => ["lg", "large"].includes(e.imgRatio)), s = w(() => typeof e.link == "string" && e.link.startsWith("http")), u = W(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const m = _e("RouterLink");
      return i(), f("div", {
        class: R(["fr-card", {
          "fr-card--horizontal": d.horizontal,
          "fr-enlarge-link": !d.noArrow,
          "fr-card--sm": n.value,
          "fr-card--lg": r.value,
          "fr-card--horizontal-tier": l.value,
          "fr-card--horizontal-half": o.value,
          "fr-card--download": d.download,
          "fr-enlarge-button": d.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        c("div", zl, [
          c("div", Gl, [
            (i(), V(ge(d.titleTag), { class: "fr-card__title" }, {
              default: X(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, v(d.title), 9, Xl)) : d.link ? (i(), V(m, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (k) => k.stopPropagation())
                }, {
                  default: X(() => [
                    F(v(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(z, { key: 2 }, [
                  F(v(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Ul, v(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Zl, [
              B(d.$slots, "start-details"),
              d.detail ? (i(), V(Vt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: X(() => [
                  F(v(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", Jl, [
              B(d.$slots, "end-details"),
              d.endDetail ? (i(), V(Vt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: X(() => [
                  F(v(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", eo, [
            d.buttons.length ? (i(), V(Dt, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            d.linksGroup.length ? (i(), f("ul", to, [
              (i(!0), f(z, null, U(d.linksGroup, (k, E) => (i(), f("li", {
                key: `card-link-${E}`
              }, [
                k.to ? (i(), V(m, {
                  key: 0,
                  to: k.to
                }, {
                  default: X(() => [
                    F(v(k.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: k.link || k.href,
                  class: R(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": r.value
                  }])
                }, v(k.label), 11, ao))
              ]))), 128))
            ])) : b("", !0)
          ])) : b("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", no, [
          d.imgSrc ? (i(), f("div", ro, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, lo)
          ])) : b("", !0),
          d.badges.length ? (i(), f("ul", oo, [
            (i(!0), f(z, null, U(d.badges, (k, E) => (i(), f("li", { key: E }, [
              ee(Ka, Q({ ref_for: !0 }, k), null, 16)
            ]))), 128))
          ])) : b("", !0)
        ])) : b("", !0)
      ], 2);
    };
  }
}), io = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], uo = ["for"], co = {
  key: 0,
  class: "required"
}, fo = {
  key: 0,
  class: "fr-hint-text"
}, po = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, Tt = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ Le({
    id: { default: () => re("basic", "checkbox") },
    name: {},
    required: { type: Boolean },
    value: {},
    checked: { type: Boolean },
    modelValue: {},
    small: { type: Boolean },
    inline: { type: Boolean },
    label: { default: "" },
    errorMessage: { default: "" },
    validMessage: { default: "" },
    hint: { default: "" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = w(() => t.errorMessage || t.validMessage), n = w(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = we(a, "modelValue");
    return (l, o) => (i(), f("div", {
      class: R(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: R(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Be(c("input", Q({
          id: l.id,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => r.value = s),
          name: l.name,
          type: "checkbox",
          value: l.value,
          checked: r.value === !0 || Array.isArray(r.value) && r.value.includes(l.value),
          required: l.required
        }, l.$attrs, {
          "data-testid": `input-checkbox-${l.id}`,
          "data-test": `input-checkbox-${l.id}`
        }), null, 16, io), [
          [lt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          B(l.$slots, "label", {}, () => [
            F(v(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", co, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", fo, v(l.hint), 1)) : b("", !0)
        ], 8, uo),
        e.value ? (i(), f("div", po, [
          c("p", {
            class: R(["fr-message--info flex items-center", n.value])
          }, v(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), mo = { class: "fr-form-group" }, ho = ["disabled", "aria-labelledby", "aria-invalid", "role"], vo = ["id"], go = {
  key: 0,
  class: "required"
}, bo = ["id"], yo = /* @__PURE__ */ S({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Le({
    titleId: { default: () => re("checkbox", "group") },
    disabled: { type: Boolean },
    inline: { type: Boolean },
    required: { type: Boolean },
    small: { type: Boolean },
    errorMessage: { default: "" },
    validMessage: { default: "" },
    legend: { default: "" },
    options: { default: () => [] },
    modelValue: { default: () => [] },
    ariaInvalid: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = w(() => t.errorMessage || t.validMessage), n = w(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = w(() => e.value ? `${t.titleId} messages-${t.titleId}` : t.titleId), l = we(a, "modelValue");
    return (o, s) => (i(), f("div", mo, [
      c("fieldset", {
        class: R(["fr-fieldset", {
          "fr-fieldset--error": o.errorMessage,
          "fr-fieldset--valid": !o.errorMessage && o.validMessage
        }]),
        disabled: o.disabled,
        "aria-labelledby": r.value,
        "aria-invalid": o.ariaInvalid,
        role: o.errorMessage || o.validMessage ? "group" : void 0
      }, [
        c("legend", {
          id: o.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          B(o.$slots, "legend", {}, () => [
            F(v(o.legend) + " ", 1),
            B(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", go, " *")) : b("", !0)
            ])
          ])
        ], 8, vo),
        B(o.$slots, "default", {}, () => [
          (i(!0), f(z, null, U(o.options, (u) => (i(), V(Tt, {
            id: u.id,
            key: u.id || u.name,
            modelValue: l.value,
            "onUpdate:modelValue": s[0] || (s[0] = (d) => l.value = d),
            value: u.value,
            name: u.name,
            label: u.label,
            disabled: u.disabled,
            "aria-disabled": u.disabled,
            small: o.small,
            inline: o.inline,
            hint: u.hint
          }, null, 8, ["id", "modelValue", "value", "name", "label", "disabled", "aria-disabled", "small", "inline", "hint"]))), 128))
        ]),
        e.value ? (i(), f("div", {
          key: 0,
          id: `messages-${o.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          c("p", {
            class: R(["fr-message--info flex items-center", n.value])
          }, [
            c("span", null, v(e.value), 1)
          ], 2)
        ], 8, bo)) : b("", !0)
      ], 10, ho)
    ]));
  }
}), ko = { class: "fr-consent-banner__content" }, wo = { class: "fr-text--sm" }, _o = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, xo = /* @__PURE__ */ S({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(a) {
    const t = a, e = w(() => typeof t.url == "string" && t.url.startsWith("http")), n = w(() => t.url ? e.value ? "a" : "RouterLink" : "a"), r = w(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, o) => (i(), f(z, null, [
      c("div", ko, [
        c("p", wo, [
          B(l.$slots, "default", {}, () => [
            o[4] || (o[4] = F(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), V(ge(n.value), Q(r.value, { "data-testid": "link" }), {
              default: X(() => o[3] || (o[3] = [
                F(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = F(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", _o, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = J((s) => l.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = J((s) => l.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = J((s) => l.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), Do = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, To = { class: "fr-pagination__list" }, Io = ["href", "title", "disabled", "aria-disabled"], Eo = ["href", "title", "disabled", "aria-disabled"], Mo = ["href", "title", "aria-current", "onClick"], Co = { key: 0 }, Po = { key: 1 }, Lo = ["href", "title", "disabled", "aria-disabled"], Bo = ["href", "title", "disabled", "aria-disabled"], $o = /* @__PURE__ */ S({
  __name: "DsfrPagination",
  props: {
    pages: {},
    currentPage: { default: 0 },
    firstPageTitle: { default: "Première page" },
    lastPageTitle: { default: "Dernière page" },
    nextPageTitle: { default: "Page suivante" },
    prevPageTitle: { default: "Page précédente" },
    truncLimit: { default: 5 }
  },
  emits: ["update:current-page"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = w(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = w(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), o = w(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), s = (_) => n("update:current-page", _), u = (_) => s(_), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), m = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), k = () => u(e.pages.length - 1), E = (_) => e.pages.indexOf(_) === e.currentPage;
    return (_, A) => {
      var y, D, T, P;
      return i(), f("nav", Do, [
        c("ul", To, [
          c("li", null, [
            c("a", {
              href: (y = _.pages[0]) == null ? void 0 : y.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: _.firstPageTitle,
              disabled: _.currentPage === 0 ? !0 : void 0,
              "aria-disabled": _.currentPage === 0 ? !0 : void 0,
              onClick: A[0] || (A[0] = J((I) => d(), ["prevent"]))
            }, null, 8, Io)
          ]),
          c("li", null, [
            c("a", {
              href: (D = _.pages[Math.max(_.currentPage - 1, 0)]) == null ? void 0 : D.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: _.prevPageTitle,
              disabled: _.currentPage === 0 ? !0 : void 0,
              "aria-disabled": _.currentPage === 0 ? !0 : void 0,
              onClick: A[1] || (A[1] = J((I) => p(), ["prevent"]))
            }, v(_.prevPageTitle), 9, Eo)
          ]),
          (i(!0), f(z, null, U(o.value, (I, M) => (i(), f("li", { key: M }, [
            c("a", {
              href: I == null ? void 0 : I.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: I.title,
              "aria-current": E(I) ? "page" : void 0,
              onClick: J((h) => u(_.pages.indexOf(I)), ["prevent"])
            }, [
              o.value.indexOf(I) === 0 && r.value > 0 ? (i(), f("span", Co, "...")) : b("", !0),
              F(" " + v(I.label) + " ", 1),
              o.value.indexOf(I) === o.value.length - 1 && l.value < _.pages.length - 1 ? (i(), f("span", Po, "...")) : b("", !0)
            ], 8, Mo)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (T = _.pages[Math.min(_.currentPage + 1, _.pages.length - 1)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: _.nextPageTitle,
              disabled: _.currentPage === _.pages.length - 1 ? !0 : void 0,
              "aria-disabled": _.currentPage === _.pages.length - 1 ? !0 : void 0,
              onClick: A[2] || (A[2] = J((I) => m(), ["prevent"]))
            }, v(_.nextPageTitle), 9, Lo)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (P = _.pages.at(-1)) == null ? void 0 : P.href,
              title: _.lastPageTitle,
              disabled: _.currentPage === _.pages.length - 1 ? !0 : void 0,
              "aria-disabled": _.currentPage === _.pages.length - 1 ? !0 : void 0,
              onClick: A[3] || (A[3] = J((I) => k(), ["prevent"]))
            }, null, 8, Bo)
          ])
        ])
      ]);
    };
  }
}), na = /* @__PURE__ */ ke($o, [["__scopeId", "data-v-4dfa8248"]]), Ao = { class: "fr-table" }, So = { class: "fr-table__wrapper" }, Oo = { class: "fr-table__container" }, Ro = { class: "fr-table__content" }, Fo = ["id"], No = { key: 0 }, Vo = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, jo = { class: "fr-checkbox-group fr-checkbox-group--sm" }, qo = ["id", "checked"], Ho = ["for"], Wo = ["tabindex", "onClick", "onKeydown"], Yo = { key: 0 }, Qo = { key: 1 }, Ko = ["data-row-key"], zo = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Go = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Xo = ["id", "value"], Uo = ["for"], Zo = ["onKeydown"], Jo = { class: "flex gap-2 items-center" }, es = ["selected"], ts = ["value", "selected"], as = { class: "flex ml-1" }, ns = { class: "self-center" }, rs = /* @__PURE__ */ S({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Le({
    id: { default: () => re("table") },
    title: {},
    rowKey: { default: 0 },
    headersRow: {},
    rows: {},
    topActionsRow: { default: () => [] },
    bottomActionsRow: { default: () => [] },
    selectableRows: { type: Boolean },
    sortableRows: { type: [Boolean, Array] },
    sorted: {},
    sortFn: {},
    verticalBorders: { type: Boolean },
    bottomCaption: { type: Boolean },
    noCaption: { type: Boolean },
    pages: {},
    pagination: { type: Boolean },
    paginationOptions: { default: () => [
      5,
      10,
      20
    ] },
    currentPage: { default: 0 },
    rowsPerPage: { default: 10 },
    bottomActionBarClass: {},
    paginationWrapperClass: {}
  }, {
    selection: { default: [] },
    selectionModifiers: {},
    rowsPerPage: { default: 10 },
    rowsPerPageModifiers: {},
    currentPage: { default: 0 },
    currentPageModifiers: {},
    sortedBy: { default: void 0 },
    sortedByModifiers: {},
    sortedDesc: { default: !1 },
    sortedDescModifiers: {}
  }),
  emits: /* @__PURE__ */ Le(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: t }) {
    const e = a, n = t, r = we(a, "selection"), l = we(a, "rowsPerPage"), o = we(a, "currentPage"), s = w(() => Math.ceil(e.rows.length / l.value)), u = w(() => e.pages ?? Array.from({ length: s.value }).map((h, x) => ({ label: `${x + 1}`, title: `Page ${x + 1}`, href: `#${x + 1}` }))), d = w(() => o.value * l.value), p = w(() => (o.value + 1) * l.value), m = we(a, "sortedBy"), k = we(a, "sortedDesc");
    function E(h, x) {
      const g = m.value ?? e.sorted;
      return (h[g] ?? h) < (x[g] ?? x) ? -1 : (h[g] ?? h) > (x[g] ?? x) ? 1 : 0;
    }
    function _(h) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(h))) {
        if (m.value === h) {
          if (k.value) {
            m.value = void 0, k.value = !1;
            return;
          }
          k.value = !0;
          return;
        }
        k.value = !1, m.value = h;
      }
    }
    const A = w(() => {
      const h = m.value ? e.rows.slice().sort(e.sortFn ?? E) : e.rows.slice();
      return k.value && h.reverse(), h;
    }), y = w(() => {
      const h = e.headersRow.map((g) => typeof g != "object" ? g : g.key), x = A.value.map((g) => Array.isArray(g) ? g : h.map((H) => typeof g != "object" ? g : g[H] ?? g));
      return e.pagination ? x.slice(d.value, p.value) : x;
    });
    function D(h) {
      if (h) {
        const x = e.headersRow.findIndex((g) => g.key ?? g);
        r.value = y.value.map((g) => g[x]);
      }
      r.value.length = 0;
    }
    const T = W(!1);
    function P() {
      T.value = r.value.length === y.value.length;
    }
    function I() {
      n("update:current-page", 0), T.value = !1, r.value.length = 0;
    }
    function M(h) {
      navigator.clipboard.writeText(h);
    }
    return (h, x) => (i(), f("div", Ao, [
      c("div", So, [
        c("div", Oo, [
          c("div", Ro, [
            c("table", { id: h.id }, [
              h.noCaption ? b("", !0) : (i(), f("caption", No, v(h.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  h.selectableRows ? (i(), f("th", Vo, [
                    c("div", jo, [
                      c("input", {
                        id: `table-select--${h.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: x[0] || (x[0] = (g) => D(g.target.checked))
                      }, null, 40, qo),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${h.id}-all`
                      }, " Sélectionner tout ", 8, Ho)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(z, null, U(h.headersRow, (g, H) => (i(), f("th", Q({
                    key: typeof g == "object" ? g.key : g,
                    scope: "col",
                    ref_for: !0
                  }, typeof g == "object" && g.headerAttrs, {
                    tabindex: h.sortableRows ? 0 : void 0,
                    onClick: (q) => _(g.key ?? (Array.isArray(h.rows[0]) ? H : g)),
                    onKeydown: [
                      Z((q) => _(g.key ?? g), ["enter"]),
                      Z((q) => _(g.key ?? g), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: R({ "sortable-header": h.sortableRows === !0 || Array.isArray(h.sortableRows) && h.sortableRows.includes(g.key ?? g) })
                    }, [
                      B(h.$slots, "header", Q({ ref_for: !0 }, typeof g == "object" ? g : { key: g, label: g }), () => [
                        F(v(typeof g == "object" ? g.label : g), 1)
                      ], !0),
                      m.value !== (g.key ?? g) && (h.sortableRows === !0 || Array.isArray(h.sortableRows) && h.sortableRows.includes(g.key ?? g)) ? (i(), f("span", Yo, [
                        ee(pe, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : m.value === (g.key ?? g) ? (i(), f("span", Qo, [
                        ee(pe, {
                          name: k.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Wo))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, U(y.value, (g, H) => (i(), f("tr", {
                  key: `row-${H}`,
                  "data-row-key": H + 1
                }, [
                  h.selectableRows ? (i(), f("th", zo, [
                    c("div", Go, [
                      Be(c("input", {
                        id: `row-select-${h.id}-${H}`,
                        "onUpdate:modelValue": x[1] || (x[1] = (q) => r.value = q),
                        value: h.rows[H][h.rowKey] ?? `row-${H}`,
                        type: "checkbox",
                        onChange: x[2] || (x[2] = (q) => P())
                      }, null, 40, Xo), [
                        [lt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${h.id}-${H}`
                      }, " Sélectionner la ligne " + v(H + 1), 9, Uo)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(z, null, U(g, (q, C) => (i(), f("td", {
                    key: typeof q == "object" ? q[h.rowKey] : q,
                    tabindex: "0",
                    onKeydown: [
                      Z(J(($) => M(typeof q == "object" ? q[h.rowKey] : q), ["ctrl"]), ["c"]),
                      Z(J(($) => M(typeof q == "object" ? q[h.rowKey] : q), ["meta"]), ["c"])
                    ]
                  }, [
                    B(h.$slots, "cell", Q({ ref_for: !0 }, {
                      colKey: typeof h.headersRow[C] == "object" ? h.headersRow[C].key : h.headersRow[C],
                      cell: q
                    }), () => [
                      F(v(typeof q == "object" ? q[h.rowKey] : q), 1)
                    ], !0)
                  ], 40, Zo))), 128))
                ], 8, Ko))), 128))
              ])
            ], 8, Fo)
          ])
        ])
      ]),
      c("div", {
        class: R(h.bottomActionBarClass)
      }, [
        B(h.$slots, "pagination", {}, () => [
          h.pagination && !h.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: R(["flex justify-between items-center", h.paginationWrapperClass])
          }, [
            c("div", Jo, [
              x[6] || (x[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Be(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": x[3] || (x[3] = (g) => l.value = g),
                class: "fr-select",
                onChange: x[4] || (x[4] = (g) => I())
              }, [
                c("option", {
                  value: "",
                  selected: !h.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, es),
                (i(!0), f(z, null, U(h.paginationOptions, (g, H) => (i(), f("option", {
                  key: H,
                  value: g,
                  selected: +g === l.value
                }, v(g), 9, ts))), 128))
              ], 544), [
                [zt, l.value]
              ])
            ]),
            c("div", as, [
              c("span", ns, "Page " + v(o.value + 1) + " sur " + v(s.value), 1)
            ]),
            ee(na, {
              "current-page": o.value,
              "onUpdate:currentPage": x[5] || (x[5] = (g) => o.value = g),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), ls = /* @__PURE__ */ ke(rs, [["__scopeId", "data-v-88850ee6"]]), os = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", ss = { class: "fr-container flex" }, is = { class: "half" }, us = { class: "fr-h1" }, ds = { class: "flex fr-my-md-3w" }, cs = { class: "fr-h6" }, fs = /* @__PURE__ */ S({
  __name: "DsfrErrorPage",
  props: {
    title: { default: "Page non trouvée" },
    subtitle: { default: "Erreur 404" },
    description: { default: "La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée." },
    help: { default: "Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est correcte. La page n'est peut être plus disponible." },
    buttons: { default: void 0 }
  },
  setup(a) {
    return (t, e) => {
      var n;
      return i(), f("div", ss, [
        c("div", is, [
          c("h1", us, v(t.title), 1),
          c("span", ds, v(t.subtitle), 1),
          c("p", cs, v(t.description), 1),
          c("p", null, v(t.help), 1),
          (n = t.buttons) != null && n.length ? (i(), V(Dt, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : b("", !0),
          B(t.$slots, "default", {}, void 0, !0)
        ]),
        e[0] || (e[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: os
          })
        ], -1))
      ]);
    };
  }
}), ps = /* @__PURE__ */ ke(fs, [["__scopeId", "data-v-0f6cf5b4"]]), ms = { class: "fr-fieldset" }, hs = ["id"], vs = {
  key: 1,
  class: "fr-fieldset__element"
}, gs = { class: "fr-fieldset__element" }, cn = /* @__PURE__ */ S({
  __name: "DsfrFieldset",
  props: {
    legend: { default: "" },
    legendClass: { default: "" },
    legendId: { default: "" },
    hint: { default: "" },
    hintClass: { default: "" }
  },
  setup(a) {
    return (t, e) => {
      var n, r, l, o;
      return i(), f("fieldset", ms, [
        t.legend || (r = (n = t.$slots).legend) != null && r.call(n).length ? (i(), f("legend", {
          key: 0,
          id: t.legendId,
          class: R(["fr-fieldset__legend", t.legendClass])
        }, [
          F(v(t.legend) + " ", 1),
          B(t.$slots, "legend")
        ], 10, hs)) : b("", !0),
        t.hint || (o = (l = t.$slots).hint) != null && o.call(l).length ? (i(), f("div", vs, [
          c("span", {
            class: R(["fr-hint-text", t.hintClass])
          }, [
            F(v(t.hint) + " ", 1),
            B(t.$slots, "hint")
          ], 2)
        ])) : b("", !0),
        c("div", gs, [
          B(t.$slots, "default")
        ])
      ]);
    };
  }
}), bs = ["href", "download"], ys = { class: "fr-link__detail" }, fn = /* @__PURE__ */ S({
  __name: "DsfrFileDownload",
  props: {
    title: { default: "Télécharger le document" },
    format: { default: "JPEG" },
    size: { default: "250 Ko" },
    href: { default: "#" },
    download: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("a", {
      href: t.href,
      download: t.download,
      class: "fr-link fr-link--download"
    }, [
      F(v(t.title) + " ", 1),
      c("span", ys, v(t.format) + " – " + v(t.size), 1)
    ], 8, bs));
  }
}), ks = { class: "fr-downloads-group fr-downloads-group--bordered" }, ws = {
  key: 0,
  class: "fr-downloads-group__title"
}, _s = /* @__PURE__ */ S({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", ks, [
      t.title ? (i(), f("h4", ws, v(t.title), 1)) : b("", !0),
      c("ul", null, [
        (i(!0), f(z, null, U(t.files, (n, r) => (i(), f("li", { key: r }, [
          ee(fn, {
            title: n.title,
            format: n.format,
            size: n.size,
            href: n.href,
            download: n.download
          }, null, 8, ["title", "format", "size", "href", "download"])
        ]))), 128))
      ])
    ]));
  }
}), xs = ["for"], Ds = {
  key: 0,
  class: "required"
}, Ts = {
  key: 1,
  class: "fr-hint-text"
}, Is = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Es = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Ms = ["id"], Cs = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => re("file-upload") },
    label: { default: "Ajouter un fichier" },
    accept: { default: void 0 },
    hint: { default: "" },
    error: { default: "" },
    validMessage: { default: "" },
    disabled: { type: Boolean },
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "change"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = (o) => {
      var s, u;
      n("update:modelValue", (s = o.target) == null ? void 0 : s.value), n("change", (u = o.target) == null ? void 0 : u.files);
    }, l = w(() => Array.isArray(e.accept) ? e.accept.join(",") : e.accept);
    return (o, s) => (i(), f("div", {
      class: R(["fr-upload-group", {
        "fr-upload-group--error": o.error,
        "fr-upload-group--valid": o.validMessage,
        "fr-upload-group--disabled": o.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: o.id
      }, [
        F(v(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", Ds, " *")) : b("", !0),
        o.hint ? (i(), f("span", Ts, v(o.hint), 1)) : b("", !0)
      ], 8, xs),
      c("input", Q({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: l.value,
        onChange: s[0] || (s[0] = (u) => r(u))
      }), null, 16, Is),
      o.error || o.validMessage ? (i(), f("div", Es, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, v(o.error ?? o.validMessage), 9, Ms)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Ps = { class: "fr-follow__newsletter" }, Ls = { class: "fr-h5 fr-follow__title" }, Bs = { class: "fr-text--sm fr-follow__desc" }, $s = { key: 0 }, As = ["title"], Ss = { key: 1 }, Os = { action: "" }, Rs = {
  class: "fr-label",
  for: "newsletter-email"
}, Fs = { class: "fr-input-wrap fr-input-wrap--addon" }, Ns = ["title", "placeholder", "value"], Vs = ["title"], js = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, qs = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Hs = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, pn = /* @__PURE__ */ S({
  __name: "DsfrNewsLetter",
  props: {
    title: { default: "Abonnez-vous à notre lettre d’information" },
    description: { default: "" },
    email: { default: "" },
    error: { default: "" },
    labelEmail: { default: "Votre adresse électronique (ex. : prenom.nom@example.com)" },
    placeholder: { default: "prenom.nom@example.com" },
    hintText: { default: "" },
    inputTitle: { default: "Adresse courriel" },
    buttonText: { default: "S’abonner" },
    buttonTitle: { default: "S‘abonner à notre lettre d’information" },
    buttonAction: { type: Function, default: () => {
    } },
    onlyCallout: { type: Boolean, default: !1 }
  },
  emits: ["update:email"],
  setup(a, { emit: t }) {
    const e = t, n = (r) => e("update:email", r.target.value);
    return (r, l) => (i(), f("div", Ps, [
      c("div", null, [
        c("h3", Ls, v(r.title), 1),
        c("p", Bs, v(r.description), 1)
      ]),
      r.onlyCallout ? (i(), f("div", $s, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (o) => r.buttonAction ? r.buttonAction(o) : () => {
          })
        }, v(r.buttonText), 9, As)
      ])) : (i(), f("div", Ss, [
        c("form", Os, [
          c("label", Rs, v(r.labelEmail), 1),
          c("div", Fs, [
            c("input", {
              id: "newsletter-email",
              class: "fr-input",
              "aria-describedby": "fr-newsletter-hint-text",
              title: r.inputTitle || r.labelEmail,
              placeholder: r.placeholder || r.labelEmail,
              type: "email",
              name: "newsletter-email",
              value: r.email,
              autocomplete: "email",
              onInput: l[1] || (l[1] = (o) => n(o))
            }, null, 40, Ns),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: r.buttonTitle,
              type: "submit"
            }, v(r.buttonText), 9, Vs)
          ]),
          r.error ? (i(), f("div", js, [
            c("p", qs, v(r.error), 1)
          ])) : b("", !0),
          c("p", Hs, v(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), Ws = { class: "fr-follow__social" }, Ys = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Qs = ["title", "href"], mn = /* @__PURE__ */ S({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ws, [
      (i(), V(ge(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: X(() => e[0] || (e[0] = [
          F(" Suivez-nous "),
          c("br", null, null, -1),
          F(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Ys, [
        (i(!0), f(z, null, U(t.networks, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: R(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, v(n.name), 11, Qs)
        ]))), 128))
      ])) : b("", !0)
    ]));
  }
}), Ks = { class: "fr-follow" }, zs = { class: "fr-container" }, Gs = { class: "fr-grid-row" }, Xs = /* @__PURE__ */ S({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const t = a, e = w(() => t.networks && t.networks.length), n = w(() => typeof t.newsletterData == "object");
    return (r, l) => (i(), f("div", Ks, [
      c("div", zs, [
        c("div", Gs, [
          B(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: R(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ee(pn, De(yt(r.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: R(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              ee(mn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ea = 1, hn = /* @__PURE__ */ S({
  __name: "DsfrFooterLink",
  props: {
    button: { type: Boolean },
    icon: { default: void 0 },
    iconAttrs: { default: () => ({}) },
    iconRight: { type: Boolean },
    label: { default: "" },
    target: { default: void 0 },
    onClick: { type: Function, default: () => {
    } },
    to: { default: void 0 },
    href: { default: void 0 },
    title: {}
  },
  setup(a) {
    const t = a, e = w(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("http");
    }), n = w(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("mailto");
    }), r = w(() => t.button ? "button" : e.value || n.value ? "a" : "RouterLink"), l = w(() => {
      if (!(!e.value && !n.value))
        return t.href;
    }), o = w(() => {
      if (!(e.value || n.value))
        return t.to;
    }), s = w(() => o.value ? { to: o.value } : { href: l.value }), u = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), d = w(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Ea, ...t.iconAttrs ?? {} } : { scale: Ea, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (p, m) => (i(), V(ge(r.value), Q({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, s.value, {
      target: p.target,
      onClick: J(p.onClick, ["stop"])
    }), {
      default: X(() => {
        var k, E;
        return [
          !u.value && (p.icon || (k = p.iconAttrs) != null && k.name) && !p.iconRight ? (i(), V(pe, Q({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : b("", !0),
          F(" " + v(p.label) + " ", 1),
          !u.value && (p.icon || (E = p.iconAttrs) != null && E.name) && p.iconRight ? (i(), V(pe, Q({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Us = { class: "fr-footer__partners" }, Zs = {
  key: 0,
  class: "fr-footer__partners-title"
}, Js = { class: "fr-footer__partners-logos" }, ei = {
  key: 0,
  class: "fr-footer__partners-main"
}, ti = ["href"], ai = ["src", "alt"], ni = { class: "fr-footer__partners-sub" }, ri = ["href"], li = ["src", "alt"], vn = /* @__PURE__ */ S({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Us, [
      t.title ? (i(), f("h4", Zs, v(t.title), 1)) : b("", !0),
      c("div", Js, [
        t.mainPartner ? (i(), f("div", ei, [
          c("a", {
            class: "fr-footer__partners-link",
            href: t.mainPartner.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, [
            c("img", {
              class: "fr-footer__logo",
              src: t.mainPartner.logo,
              alt: t.mainPartner.name
            }, null, 8, ai)
          ], 8, ti)
        ])) : b("", !0),
        c("div", ni, [
          c("ul", null, [
            (i(!0), f(z, null, U(t.subPartners, (n, r) => (i(), f("li", { key: r }, [
              c("a", {
                class: "fr-footer__partners-link",
                href: n.href,
                target: "_blank",
                rel: "noopener noreferrer"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  src: n.logo,
                  alt: n.name
                }, null, 8, li)
              ], 8, ri)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), oi = ["innerHTML"], at = /* @__PURE__ */ S({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const t = a, e = w(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (n, r) => (i(), f("p", {
      class: R(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: e.value
    }, null, 10, oi));
  }
}), si = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, ii = {
  key: 0,
  class: "fr-footer__top"
}, ui = { class: "fr-container" }, di = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, ci = { class: "fr-container" }, fi = { class: "fr-footer__body" }, pi = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, mi = ["href"], hi = ["src", "alt"], vi = ["src", "alt"], gi = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, bi = { class: "fr-footer__content" }, yi = { class: "fr-footer__content-desc" }, ki = { class: "fr-footer__content-list" }, wi = ["href", "title"], _i = { class: "fr-footer__bottom" }, xi = { class: "fr-footer__bottom-list" }, Di = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, Ti = /* @__PURE__ */ S({
  __name: "DsfrFooter",
  props: {
    a11yCompliance: { default: "non conforme" },
    a11yComplianceLink: { default: "/a11y" },
    legalLink: { default: "/mentions-legales" },
    homeLink: { default: "/" },
    homeTitle: { default: "Retour à l’accueil" },
    partners: { default: () => {
    } },
    personalDataLink: { default: "/donnees-personnelles" },
    cookiesLink: { default: "/cookies" },
    logoText: { default: () => ["République", "Française"] },
    descText: { default: void 0 },
    beforeMandatoryLinks: { default: () => [] },
    afterMandatoryLinks: { default: () => [] },
    mandatoryLinks: { default: (a) => [
      {
        label: `Accessibilité : ${a.a11yCompliance}`,
        to: a.a11yComplianceLink
      },
      {
        label: "Mentions légales",
        to: a.legalLink,
        "data-testid": "/mentions-legales"
      },
      {
        label: "Données personnelles",
        to: a.personalDataLink
      },
      {
        label: "Gestion des cookies",
        to: a.cookiesLink
      }
    ] },
    ecosystemLinks: { default: () => [
      {
        label: "info.gouv.fr",
        href: "https://info.gouv.fr",
        title: "Informations gouvernementales, nouvelle fenêtre"
      },
      {
        label: "service-public.fr",
        href: "https://service-public.fr",
        title: "Informations et démarches administratives, nouvelle fenêtre"
      },
      {
        label: "legifrance.gouv.fr",
        href: "https://legifrance.gouv.fr",
        title: "Service public de diffusion du droit, nouvelle fenêtre"
      },
      {
        label: "data.gouv.fr",
        href: "https://data.gouv.fr",
        title: "Plateforme des données publiques, nouvelle fenêtre"
      }
    ] },
    operatorLinkText: { default: "Revenir à l’accueil" },
    operatorTo: { default: "/" },
    operatorImgStyle: { type: [Boolean, null, String, Object, Array], default: void 0 },
    operatorImgSrc: { default: void 0 },
    operatorImgAlt: { default: "" },
    licenceTo: { default: "https://github.com/etalab/licence-ouverte/blob/master/LO.md" },
    licenceLinkProps: { default: () => {
    } },
    licenceText: { default: "Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont proposés sous" },
    licenceName: { default: "licence etalab-2.0" }
  },
  setup(a) {
    const t = a, e = w(() => [
      ...t.beforeMandatoryLinks,
      ...t.mandatoryLinks,
      ...t.afterMandatoryLinks
    ]), n = Kt(), r = w(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n).length;
    }), l = w(() => {
      const p = t.licenceTo || t.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = w(() => {
      const { to: p, href: m, ...k } = t.licenceLinkProps ?? {};
      return k;
    }), s = w(() => l.value ? "" : t.licenceTo), u = w(() => l.value ? t.licenceTo : ""), d = w(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, m) => {
      const k = _e("RouterLink");
      return i(), f("footer", si, [
        r.value ? (i(), f("div", ii, [
          c("div", ui, [
            c("div", di, [
              B(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : b("", !0),
        c("div", ci, [
          c("div", fi, [
            p.operatorImgSrc ? (i(), f("div", pi, [
              ee(at, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              d.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: xe(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, hi)
              ], 8, mi)) : (i(), V(k, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: X(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: xe(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, vi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", gi, [
              ee(k, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: X(() => [
                  ee(at, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", bi, [
              c("p", yi, [
                B(p.$slots, "description", {}, () => [
                  F(v(p.descText), 1)
                ], !0)
              ]),
              c("ul", ki, [
                (i(!0), f(z, null, U(p.ecosystemLinks, ({ href: E, label: _, title: A, ...y }, D) => (i(), f("li", {
                  key: D,
                  class: "fr-footer__content-item"
                }, [
                  c("a", Q({
                    class: "fr-footer__content-link",
                    href: E,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: A,
                    ref_for: !0
                  }, y), v(_), 17, wi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), V(vn, De(Q({ key: 0 }, p.partners)), null, 16)) : b("", !0),
          c("div", _i, [
            c("ul", xi, [
              (i(!0), f(z, null, U(e.value, (E, _) => (i(), f("li", {
                key: _,
                class: "fr-footer__bottom-item"
              }, [
                ee(hn, Q({ ref_for: !0 }, E), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", Di, [
              c("p", null, [
                F(v(p.licenceText) + " ", 1),
                (i(), V(ge(l.value ? "a" : "RouterLink"), Q({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : s.value,
                  href: l.value ? u.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: X(() => [
                    F(v(p.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target", "title"]))
              ])
            ])) : b("", !0)
          ])
        ])
      ]);
    };
  }
}), Ii = /* @__PURE__ */ ke(Ti, [["__scopeId", "data-v-613931c6"]]), Ei = { class: "fr-footer__top-cat" }, Mi = { class: "fr-footer__top-list" }, Ci = ["href"], Pi = /* @__PURE__ */ S({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(a) {
    return (t, e) => {
      const n = _e("RouterLink");
      return i(), f("div", null, [
        c("h3", Ei, v(t.categoryName), 1),
        c("ul", Mi, [
          (i(!0), f(z, null, U(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, v(r.label), 9, Ci)) : b("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), V(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: X(() => [
                F(v(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : b("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Li = { class: "fr-connect-group" }, Bi = { class: "fr-connect__brand" }, $i = ["href", "title"], Ai = /* @__PURE__ */ S({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Li, [
      c("button", {
        class: R(["fr-connect", [{ "fr-connect--plus": t.secure }]])
      }, [
        e[0] || (e[0] = c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        c("span", Bi, "FranceConnect" + v(t.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: t.url ?? `https://franceconnect.gouv.fr/${t.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, v(`Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ?`), 9, $i)
      ])
    ]));
  }
}), Si = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Oi = { class: "fr-nav__item" }, Ri = ["aria-controls", "aria-expanded"], Fi = { class: "fr-hidden-lg" }, Ni = ["id"], Vi = { class: "fr-menu__list" }, ji = ["hreflang", "lang", "aria-current", "href", "onClick"], nt = /* @__PURE__ */ S({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => re("translate") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" }
  },
  emits: ["select"],
  setup(a, { emit: t }) {
    const e = a, n = t, {
      collapse: r,
      collapsing: l,
      cssExpanded: o,
      doExpand: s,
      onTransitionEnd: u
    } = $e(), d = W(!1);
    function p(k) {
      d.value = !1, n("select", k);
    }
    const m = w(
      () => e.languages.find(({ codeIso: k }) => k === e.currentLanguage)
    );
    return me(d, (k, E) => {
      k !== E && s(k);
    }), (k, E) => {
      var _, A;
      return i(), f("nav", Si, [
        c("div", Oi, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": k.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: E[0] || (E[0] = J((y) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            F(v((_ = m.value) == null ? void 0 : _.codeIso.toUpperCase()), 1),
            c("span", Fi, " - " + v((A = m.value) == null ? void 0 : A.label), 1)
          ], 8, Ri),
          c("div", {
            id: k.id,
            ref_key: "collapse",
            ref: r,
            class: R(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": O(o), "fr-collapsing": O(l) }]),
            onTransitionend: E[1] || (E[1] = (y) => O(u)(d.value))
          }, [
            c("ul", Vi, [
              (i(!0), f(z, null, U(k.languages, (y, D) => (i(), f("li", { key: D }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: y.codeIso,
                  lang: y.codeIso,
                  "aria-current": k.currentLanguage === y.codeIso ? !0 : void 0,
                  href: `#${y.codeIso}`,
                  onClick: J((T) => p(y), ["prevent", "stop"])
                }, v(`${y.codeIso.toUpperCase()} - ${y.label}`), 9, ji)
              ]))), 128))
            ])
          ], 42, Ni)
        ])
      ]);
    };
  }
}), qi = ["for"], Hi = {
  key: 0,
  class: "required"
}, Wi = {
  key: 0,
  class: "fr-hint-text"
}, Yi = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => re("basic", "input") },
    descriptionId: { default: void 0 },
    hint: { default: "" },
    isInvalid: { type: Boolean },
    isValid: { type: Boolean },
    isTextarea: { type: Boolean },
    isWithWrapper: { type: Boolean },
    labelVisible: { type: Boolean },
    label: { default: "" },
    labelClass: { default: "" },
    modelValue: { default: "" },
    wrapperClass: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: t }) {
    const e = a, n = or(), r = W(null), l = () => {
      var d;
      return (d = r.value) == null ? void 0 : d.focus();
    }, o = w(() => e.isTextarea ? "textarea" : "input"), s = w(() => e.isWithWrapper || n.type === "date" || !!e.wrapperClass), u = w(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return t({
      focus: l
    }), (d, p) => (i(), f(z, null, [
      c("label", {
        class: R(u.value),
        for: d.id
      }, [
        B(d.$slots, "label", {}, () => [
          F(v(d.label) + " ", 1),
          B(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", Hi, "*")) : b("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", Wi, v(d.hint), 1)) : b("", !0)
      ], 10, qi),
      s.value ? (i(), f("div", {
        key: 1,
        class: R([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), V(ge(o.value), Q({ id: d.id }, d.$attrs, {
          ref_key: "__input",
          ref: r,
          class: ["fr-input", {
            "fr-input--error": d.isInvalid,
            "fr-input--valid": d.isValid
          }],
          value: d.modelValue,
          "aria-describedby": d.descriptionId || void 0,
          onInput: p[1] || (p[1] = (m) => d.$emit("update:modelValue", m.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (i(), V(ge(o.value), Q({
        key: 0,
        id: d.id
      }, d.$attrs, {
        ref_key: "__input",
        ref: r,
        class: ["fr-input", {
          "fr-input--error": d.isInvalid,
          "fr-input--valid": d.isValid
        }],
        value: d.modelValue,
        "aria-describedby": d.descriptionId || void 0,
        onInput: p[0] || (p[0] = (m) => d.$emit("update:modelValue", m.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), It = /* @__PURE__ */ ke(Yi, [["__scopeId", "data-v-6e6c295a"]]), rt = /* @__PURE__ */ S({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => re("search", "input") },
    label: { default: "" },
    labelVisible: { type: Boolean },
    large: { type: Boolean },
    buttonText: { default: "" },
    modelValue: { default: "" },
    placeholder: { default: "Rechercher" },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "search"],
  setup(a, { emit: t }) {
    const e = t;
    return (n, r) => (i(), f("div", {
      class: R(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      ee(It, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        "label-visible": n.labelVisible,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => e("update:modelValue", l)),
        onKeydown: r[1] || (r[1] = Z((l) => e("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      ee(qe, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: r[2] || (r[2] = (l) => e("search", n.modelValue))
      }, {
        default: X(() => [
          F(v(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Ma = 1, ra = /* @__PURE__ */ S({
  __name: "DsfrHeaderMenuLink",
  props: {
    button: { type: Boolean },
    icon: { default: void 0 },
    iconAttrs: { default: () => ({}) },
    iconRight: { type: Boolean },
    label: { default: "" },
    target: { default: "_self" },
    onClick: { type: Function, default: () => {
    } },
    to: { default: void 0 },
    href: { default: void 0 },
    path: { default: "" }
  },
  setup(a) {
    const t = a, e = w(() => typeof t.path == "string"), n = w(() => {
      var m;
      return ((m = t.href) == null ? void 0 : m.startsWith("http")) || e.value && t.path.startsWith("http") || typeof t.to == "string" && t.to.startsWith("http");
    }), r = w(() => {
      var m;
      return ((m = t.href) == null ? void 0 : m.startsWith("mailto")) || e.value && t.path.startsWith("mailto") || typeof t.to == "string" && t.to.startsWith("mailto");
    }), l = w(() => t.button ? "button" : n.value || r.value ? "a" : "RouterLink"), o = w(() => {
      if (!(!n.value && !r.value))
        return t.to ?? t.href ?? t.path;
    }), s = w(() => {
      if (!(n.value || r.value))
        return t.to ?? t.path;
    }), u = w(() => s.value ? { to: s.value } : { href: o.value }), d = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), p = w(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Ma, ...t.iconAttrs ?? {} } : { scale: Ma, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (m, k) => (i(), V(ge(l.value), Q({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && m.iconRight,
        "fr-btn--icon-left": d.value && !m.iconRight,
        [String(m.icon)]: d.value
      }]
    }, u.value, {
      target: m.target,
      onClick: k[0] || (k[0] = J((E) => m.onClick(E), ["stop"]))
    }), {
      default: X(() => {
        var E, _;
        return [
          !d.value && (m.icon || (E = m.iconAttrs) != null && E.name) && !m.iconRight ? (i(), V(pe, Q({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          F(" " + v(m.label) + " ", 1),
          !d.value && (m.icon || (_ = m.iconAttrs) != null && _.name) && m.iconRight ? (i(), V(pe, Q({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Qi = ["aria-label"], Ki = { class: "fr-btns-group" }, jt = /* @__PURE__ */ S({
  __name: "DsfrHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(a, { emit: t }) {
    const e = t;
    return (n, r) => (i(), f("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      c("ul", Ki, [
        (i(!0), f(z, null, U(n.links, (l, o) => (i(), f("li", { key: o }, [
          ee(ra, Q({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Qi));
  }
}), zi = {
  role: "banner",
  class: "fr-header"
}, Gi = { class: "fr-header__body" }, Xi = { class: "fr-container width-inherit" }, Ui = { class: "fr-header__body-row" }, Zi = { class: "fr-header__brand fr-enlarge-link" }, Ji = { class: "fr-header__brand-top" }, eu = { class: "fr-header__logo" }, tu = {
  key: 0,
  class: "fr-header__operator"
}, au = ["src", "alt"], nu = {
  key: 1,
  class: "fr-header__navbar"
}, ru = ["aria-label", "title", "data-fr-opened"], lu = ["aria-label", "title"], ou = {
  key: 0,
  class: "fr-header__service"
}, su = { class: "fr-header__service-title" }, iu = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, uu = {
  key: 0,
  class: "fr-header__service-tagline"
}, du = {
  key: 1,
  class: "fr-header__service"
}, cu = { class: "fr-header__tools" }, fu = {
  key: 0,
  class: "fr-header__tools-links"
}, pu = {
  key: 1,
  class: "fr-header__search fr-modal"
}, mu = ["aria-label"], hu = { class: "fr-container" }, vu = { class: "fr-header__menu-links" }, gu = {
  key: 1,
  class: "flex justify-center items-center"
}, bu = { class: "fr-header__menu fr-modal" }, yu = {
  key: 0,
  class: "fr-container"
}, ku = /* @__PURE__ */ S({
  __name: "DsfrHeader",
  props: {
    searchbarId: { default: "searchbar-header" },
    serviceTitle: { default: void 0 },
    serviceDescription: { default: void 0 },
    homeTo: { default: "/" },
    logoText: { default: () => "Gouvernement" },
    modelValue: { default: "" },
    operatorImgAlt: { default: "" },
    operatorImgSrc: { default: "" },
    operatorImgStyle: { type: [Boolean, null, String, Object, Array], default: () => ({}) },
    placeholder: { default: "Rechercher..." },
    quickLinks: { default: () => [] },
    languageSelector: { default: void 0 },
    searchLabel: { default: "Recherche" },
    quickLinksAriaLabel: { default: "Menu secondaire" },
    showSearch: { type: Boolean },
    showSearchLabel: { default: "Recherche" },
    showBeta: { type: Boolean },
    menuLabel: { default: "Menu" },
    menuModalLabel: { default: "Menu" },
    closeMenuModalLabel: { default: "Fermer" },
    homeLabel: { default: "Accueil" }
  },
  emits: ["update:modelValue", "search", "languageSelect"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = ot(e, "languageSelector"), l = W(!1), o = W(!1), s = W(!1), u = () => {
      var D;
      s.value = !1, l.value = !1, o.value = !1, (D = document.getElementById("button-menu")) == null || D.focus();
    }, d = (D) => {
      D.key === "Escape" && u();
    };
    be(() => {
      document.addEventListener("keydown", d);
    }), Te(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      s.value = !0, l.value = !0, o.value = !1, setTimeout(() => {
        var D;
        (D = document.getElementById("close-button")) == null || D.focus();
      });
    }, m = () => {
      s.value = !0, l.value = !1, o.value = !0;
    }, k = u, E = w(() => [e.homeLabel, e.serviceTitle].filter((D) => D).join(" - ")), _ = Kt(), A = w(() => {
      var D;
      return !!((D = _.operator) != null && D.call(_).length) || !!e.operatorImgSrc;
    }), y = w(() => !!_.mainnav);
    return Oe(Xt, () => u), (D, T) => {
      var P, I, M;
      const h = _e("RouterLink");
      return i(), f("header", zi, [
        c("div", Gi, [
          c("div", Xi, [
            c("div", Ui, [
              c("div", Zi, [
                c("div", Ji, [
                  c("div", eu, [
                    ee(h, {
                      to: D.homeTo,
                      title: E.value
                    }, {
                      default: X(() => [
                        ee(at, {
                          "logo-text": D.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  A.value ? (i(), f("div", tu, [
                    B(D.$slots, "operator", {}, () => [
                      D.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: D.operatorImgSrc,
                        alt: D.operatorImgAlt,
                        style: xe(D.operatorImgStyle)
                      }, null, 12, au)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  D.showSearch || y.value || (P = D.quickLinks) != null && P.length ? (i(), f("div", nu, [
                    D.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": D.showSearchLabel,
                      title: D.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: T[0] || (T[0] = J((x) => m(), ["prevent", "stop"]))
                    }, null, 8, ru)) : b("", !0),
                    y.value || (I = D.quickLinks) != null && I.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": D.menuLabel,
                      title: D.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = J((x) => p(), ["prevent", "stop"]))
                    }, null, 8, lu)) : b("", !0)
                  ])) : b("", !0)
                ]),
                D.serviceTitle ? (i(), f("div", ou, [
                  ee(h, Q({
                    to: D.homeTo,
                    title: E.value
                  }, D.$attrs), {
                    default: X(() => [
                      c("p", su, [
                        F(v(D.serviceTitle) + " ", 1),
                        D.showBeta ? (i(), f("span", iu, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  D.serviceDescription ? (i(), f("p", uu, v(D.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !D.serviceTitle && D.showBeta ? (i(), f("div", du, T[9] || (T[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", cu, [
                (M = D.quickLinks) != null && M.length || r.value ? (i(), f("div", fu, [
                  l.value ? b("", !0) : (i(), V(jt, {
                    key: 0,
                    links: D.quickLinks,
                    "nav-aria-label": D.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), V(nt, Q({ key: 1 }, r.value, {
                    onSelect: T[2] || (T[2] = (x) => n("languageSelect", x))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                D.showSearch ? (i(), f("div", pu, [
                  ee(rt, {
                    "searchbar-id": D.searchbarId,
                    label: D.searchLabel,
                    "model-value": D.modelValue,
                    placeholder: D.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (x) => n("update:modelValue", x)),
                    onSearch: T[4] || (T[4] = (x) => n("search", x))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ]),
            D.showSearch || y.value || D.quickLinks && D.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: R(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": D.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", hu, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: T[5] || (T[5] = J((x) => u(), ["prevent", "stop"]))
                }, v(D.closeMenuModalLabel), 1),
                c("div", vu, [
                  r.value ? (i(), V(nt, Q({ key: 0 }, r.value, {
                    onSelect: T[6] || (T[6] = (x) => r.value.currentLanguage = x.codeIso)
                  }), null, 16)) : b("", !0),
                  l.value ? (i(), V(jt, {
                    key: 1,
                    role: "navigation",
                    links: D.quickLinks,
                    "nav-aria-label": D.quickLinksAriaLabel,
                    onLinkClick: O(k)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0)
                ]),
                s.value ? B(D.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : b("", !0),
                o.value ? (i(), f("div", gu, [
                  ee(rt, {
                    "searchbar-id": D.searchbarId,
                    "model-value": D.modelValue,
                    placeholder: D.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (x) => n("update:modelValue", x)),
                    onSearch: T[8] || (T[8] = (x) => n("search", x))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, mu)) : b("", !0),
            B(D.$slots, "default")
          ])
        ]),
        c("div", bu, [
          y.value && !s.value ? (i(), f("div", yu, [
            B(D.$slots, "mainnav", { hidemodal: u })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), wu = /* @__PURE__ */ S({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", {
      class: R(["fr-highlight", { [`fr-highlight--${t.color}`]: t.color }])
    }, [
      c("p", {
        class: R({
          "fr-text--lg": t.large && !t.small,
          "fr-text--sm": t.small && !t.large
        })
      }, [
        F(v(t.text) + " ", 1),
        B(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), _u = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, xu = ["id", "data-testid"], Du = ["id", "data-testid"], Tu = ["id", "data-testid"], Iu = ["id", "data-testid"], Eu = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => re("basic", "input") },
    hint: { default: "" },
    labelVisible: { type: Boolean },
    label: { default: "" },
    labelClass: { default: "" },
    modelValue: { default: "" },
    placeholder: { default: void 0 },
    errorMessage: { default: void 0 },
    validMessage: { default: void 0 },
    wrapperClass: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(a) {
    return (t, e) => (i(), f("div", {
      class: R(["fr-input-group", [
        {
          "fr-input-group--error": t.errorMessage,
          "fr-input-group--valid": t.validMessage && !t.errorMessage
        },
        t.wrapperClass
      ]])
    }, [
      B(t.$slots, "before-input"),
      B(t.$slots, "default"),
      t.$slots.default ? b("", !0) : (i(), V(It, Q({ key: 0 }, t.$attrs, {
        "is-valid": !!t.validMessage,
        "is-invalid": !!t.errorMessage,
        label: t.label,
        hint: t.hint,
        "description-id": (t.errorMessage || t.validMessage) && t.descriptionId || void 0,
        "label-visible": t.labelVisible,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": e[0] || (e[0] = (n) => t.$emit("update:modelValue", n))
      }), null, 16, ["is-valid", "is-invalid", "label", "hint", "description-id", "label-visible", "model-value", "placeholder"])),
      c("div", _u, [
        Array.isArray(t.errorMessage) ? (i(!0), f(z, { key: 0 }, U(t.errorMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, v(n), 9, xu))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, v(t.errorMessage), 9, Du)) : b("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(z, { key: 2 }, U(t.validMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, v(n), 9, Tu))), 128)) : t.validMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.validMessage,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, v(t.validMessage), 9, Iu)) : b("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var gn = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], pt = /* @__PURE__ */ gn.join(","), bn = typeof Element > "u", He = bn ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, mt = !bn && Element.prototype.getRootNode ? function(a) {
  var t;
  return a == null || (t = a.getRootNode) === null || t === void 0 ? void 0 : t.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, ht = function a(t, e) {
  var n;
  e === void 0 && (e = !0);
  var r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "inert"), l = r === "" || r === "true", o = l || e && t && a(t.parentNode);
  return o;
}, Mu = function(a) {
  var t, e = a == null || (t = a.getAttribute) === null || t === void 0 ? void 0 : t.call(a, "contenteditable");
  return e === "" || e === "true";
}, yn = function(a, t, e) {
  if (ht(a))
    return [];
  var n = Array.prototype.slice.apply(a.querySelectorAll(pt));
  return t && He.call(a, pt) && n.unshift(a), n = n.filter(e), n;
}, kn = function a(t, e, n) {
  for (var r = [], l = Array.from(t); l.length; ) {
    var o = l.shift();
    if (!ht(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), u = s.length ? s : o.children, d = a(u, !0, n);
        n.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: o,
          candidates: d
        });
      } else {
        var p = He.call(o, pt);
        p && n.filter(o) && (e || !t.includes(o)) && r.push(o);
        var m = o.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(o), k = !ht(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(o));
        if (m && k) {
          var E = a(m === !0 ? o.children : m.children, !0, n);
          n.flatten ? r.push.apply(r, E) : r.push({
            scopeParent: o,
            candidates: E
          });
        } else
          l.unshift.apply(l, o.children);
      }
  }
  return r;
}, wn = function(a) {
  return !isNaN(parseInt(a.getAttribute("tabindex"), 10));
}, Ve = function(a) {
  if (!a)
    throw new Error("No node provided");
  return a.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(a.tagName) || Mu(a)) && !wn(a) ? 0 : a.tabIndex;
}, Cu = function(a, t) {
  var e = Ve(a);
  return e < 0 && t && !wn(a) ? 0 : e;
}, Pu = function(a, t) {
  return a.tabIndex === t.tabIndex ? a.documentOrder - t.documentOrder : a.tabIndex - t.tabIndex;
}, _n = function(a) {
  return a.tagName === "INPUT";
}, Lu = function(a) {
  return _n(a) && a.type === "hidden";
}, Bu = function(a) {
  var t = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, $u = function(a, t) {
  for (var e = 0; e < a.length; e++)
    if (a[e].checked && a[e].form === t)
      return a[e];
}, Au = function(a) {
  if (!a.name)
    return !0;
  var t = a.form || mt(a), e = function(l) {
    return t.querySelectorAll('input[type="radio"][name="' + l + '"]');
  }, n;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    n = e(window.CSS.escape(a.name));
  else
    try {
      n = e(a.name);
    } catch (l) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", l.message), !1;
    }
  var r = $u(n, a.form);
  return !r || r === a;
}, Su = function(a) {
  return _n(a) && a.type === "radio";
}, Ou = function(a) {
  return Su(a) && !Au(a);
}, Ru = function(a) {
  var t, e = a && mt(a), n = (t = e) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (e && e !== a) {
    var l, o, s;
    for (r = !!((l = n) !== null && l !== void 0 && (o = l.ownerDocument) !== null && o !== void 0 && o.contains(n) || a != null && (s = a.ownerDocument) !== null && s !== void 0 && s.contains(a)); !r && n; ) {
      var u, d, p;
      e = mt(n), n = (u = e) === null || u === void 0 ? void 0 : u.host, r = !!((d = n) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return r;
}, Ca = function(a) {
  var t = a.getBoundingClientRect(), e = t.width, n = t.height;
  return e === 0 && n === 0;
}, Fu = function(a, t) {
  var e = t.displayCheck, n = t.getShadowRoot;
  if (getComputedStyle(a).visibility === "hidden")
    return !0;
  var r = He.call(a, "details>summary:first-of-type"), l = r ? a.parentElement : a;
  if (He.call(l, "details:not([open]) *"))
    return !0;
  if (!e || e === "full" || e === "legacy-full") {
    if (typeof n == "function") {
      for (var o = a; a; ) {
        var s = a.parentElement, u = mt(a);
        if (s && !s.shadowRoot && n(s) === !0)
          return Ca(a);
        a.assignedSlot ? a = a.assignedSlot : !s && u !== a.ownerDocument ? a = u.host : a = s;
      }
      a = o;
    }
    if (Ru(a))
      return !a.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return Ca(a);
  return !1;
}, Nu = function(a) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(a.tagName))
    for (var t = a.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var e = 0; e < t.children.length; e++) {
          var n = t.children.item(e);
          if (n.tagName === "LEGEND")
            return He.call(t, "fieldset[disabled] *") ? !0 : !n.contains(a);
        }
        return !0;
      }
      t = t.parentElement;
    }
  return !1;
}, vt = function(a, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  ht(t) || Lu(t) || Fu(t, a) || // For a details element with a summary, the summary element gets the focus
  Bu(t) || Nu(t));
}, qt = function(a, t) {
  return !(Ou(t) || Ve(t) < 0 || !vt(a, t));
}, Vu = function(a) {
  var t = parseInt(a.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, ju = function a(t) {
  var e = [], n = [];
  return t.forEach(function(r, l) {
    var o = !!r.scopeParent, s = o ? r.scopeParent : r, u = Cu(s, o), d = o ? a(r.candidates) : s;
    u === 0 ? o ? e.push.apply(e, d) : e.push(s) : n.push({
      documentOrder: l,
      tabIndex: u,
      item: r,
      isScope: o,
      content: d
    });
  }), n.sort(Pu).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(e);
}, qu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = kn([a], t.includeContainer, {
    filter: qt.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Vu
  }) : e = yn(a, t.includeContainer, qt.bind(null, t)), ju(e);
}, Hu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = kn([a], t.includeContainer, {
    filter: vt.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : e = yn(a, t.includeContainer, vt.bind(null, t)), e;
}, We = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, pt) === !1 ? !1 : qt(t, a);
}, Wu = /* @__PURE__ */ gn.concat("iframe").join(","), Pt = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, Wu) === !1 ? !1 : vt(t, a);
};
/*!
* focus-trap 7.6.2
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Ht(a, t) {
  (t == null || t > a.length) && (t = a.length);
  for (var e = 0, n = Array(t); e < t; e++) n[e] = a[e];
  return n;
}
function Yu(a) {
  if (Array.isArray(a)) return Ht(a);
}
function Qu(a, t, e) {
  return (t = Uu(t)) in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}
function Ku(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function zu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Pa(a, t) {
  var e = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), e.push.apply(e, n);
  }
  return e;
}
function La(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Pa(Object(e), !0).forEach(function(n) {
      Qu(a, n, e[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : Pa(Object(e)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(e, n));
    });
  }
  return a;
}
function Gu(a) {
  return Yu(a) || Ku(a) || Zu(a) || zu();
}
function Xu(a, t) {
  if (typeof a != "object" || !a) return a;
  var e = a[Symbol.toPrimitive];
  if (e !== void 0) {
    var n = e.call(a, t || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(a);
}
function Uu(a) {
  var t = Xu(a, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Zu(a, t) {
  if (a) {
    if (typeof a == "string") return Ht(a, t);
    var e = {}.toString.call(a).slice(8, -1);
    return e === "Object" && a.constructor && (e = a.constructor.name), e === "Map" || e === "Set" ? Array.from(a) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Ht(a, t) : void 0;
  }
}
var Ba = {
  activateTrap: function(a, t) {
    if (a.length > 0) {
      var e = a[a.length - 1];
      e !== t && e.pause();
    }
    var n = a.indexOf(t);
    n === -1 || a.splice(n, 1), a.push(t);
  },
  deactivateTrap: function(a, t) {
    var e = a.indexOf(t);
    e !== -1 && a.splice(e, 1), a.length > 0 && a[a.length - 1].unpause();
  }
}, Ju = function(a) {
  return a.tagName && a.tagName.toLowerCase() === "input" && typeof a.select == "function";
}, ed = function(a) {
  return (a == null ? void 0 : a.key) === "Escape" || (a == null ? void 0 : a.key) === "Esc" || (a == null ? void 0 : a.keyCode) === 27;
}, Je = function(a) {
  return (a == null ? void 0 : a.key) === "Tab" || (a == null ? void 0 : a.keyCode) === 9;
}, td = function(a) {
  return Je(a) && !a.shiftKey;
}, ad = function(a) {
  return Je(a) && a.shiftKey;
}, $a = function(a) {
  return setTimeout(a, 0);
}, Xe = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    e[n - 1] = arguments[n];
  return typeof a == "function" ? a.apply(void 0, e) : a;
}, ut = function(a) {
  return a.target.shadowRoot && typeof a.composedPath == "function" ? a.composedPath()[0] : a.target;
}, nd = [], rd = function(a, t) {
  var e = (t == null ? void 0 : t.document) || document, n = (t == null ? void 0 : t.trapStack) || nd, r = La({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: td,
    isKeyBackward: ad
  }, t), l = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: !1,
    paused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, o, s = function(C, $, L) {
    return C && C[$] !== void 0 ? C[$] : r[L || $];
  }, u = function(C, $) {
    var L = typeof ($ == null ? void 0 : $.composedPath) == "function" ? $.composedPath() : void 0;
    return l.containerGroups.findIndex(function(j) {
      var K = j.container, ne = j.tabbableNodes;
      return K.contains(C) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (L == null ? void 0 : L.includes(K)) || ne.find(function(te) {
        return te === C;
      });
    });
  }, d = function(C) {
    var $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, L = $.hasFallback, j = L === void 0 ? !1 : L, K = $.params, ne = K === void 0 ? [] : K, te = r[C];
    if (typeof te == "function" && (te = te.apply(void 0, Gu(ne))), te === !0 && (te = void 0), !te) {
      if (te === void 0 || te === !1)
        return te;
      throw new Error("`".concat(C, "` was specified but was not a node, or did not return a node"));
    }
    var ie = te;
    if (typeof te == "string") {
      try {
        ie = e.querySelector(te);
      } catch (se) {
        throw new Error("`".concat(C, '` appears to be an invalid selector; error="').concat(se.message, '"'));
      }
      if (!ie && !j)
        throw new Error("`".concat(C, "` as selector refers to no known node"));
    }
    return ie;
  }, p = function() {
    var C = d("initialFocus", {
      hasFallback: !0
    });
    if (C === !1)
      return !1;
    if (C === void 0 || C && !Pt(C, r.tabbableOptions))
      if (u(e.activeElement) >= 0)
        C = e.activeElement;
      else {
        var $ = l.tabbableGroups[0], L = $ && $.firstTabbableNode;
        C = L || d("fallbackFocus");
      }
    else C === null && (C = d("fallbackFocus"));
    if (!C)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return C;
  }, m = function() {
    if (l.containerGroups = l.containers.map(function(C) {
      var $ = qu(C, r.tabbableOptions), L = Hu(C, r.tabbableOptions), j = $.length > 0 ? $[0] : void 0, K = $.length > 0 ? $[$.length - 1] : void 0, ne = L.find(function(se) {
        return We(se);
      }), te = L.slice().reverse().find(function(se) {
        return We(se);
      }), ie = !!$.find(function(se) {
        return Ve(se) > 0;
      });
      return {
        container: C,
        tabbableNodes: $,
        focusableNodes: L,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ie,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: j,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: K,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: ne,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: te,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(se) {
          var Ie = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ce = $.indexOf(se);
          return Ce < 0 ? Ie ? L.slice(L.indexOf(se) + 1).find(function(Y) {
            return We(Y);
          }) : L.slice(0, L.indexOf(se)).reverse().find(function(Y) {
            return We(Y);
          }) : $[Ce + (Ie ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(C) {
      return C.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(C) {
      return C.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, k = function(C) {
    var $ = C.activeElement;
    if ($)
      return $.shadowRoot && $.shadowRoot.activeElement !== null ? k($.shadowRoot) : $;
  }, E = function(C) {
    if (C !== !1 && C !== k(document)) {
      if (!C || !C.focus) {
        E(p());
        return;
      }
      C.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = C, Ju(C) && C.select();
    }
  }, _ = function(C) {
    var $ = d("setReturnFocus", {
      params: [C]
    });
    return $ || ($ === !1 ? !1 : C);
  }, A = function(C) {
    var $ = C.target, L = C.event, j = C.isBackward, K = j === void 0 ? !1 : j;
    $ = $ || ut(L), m();
    var ne = null;
    if (l.tabbableGroups.length > 0) {
      var te = u($, L), ie = te >= 0 ? l.containerGroups[te] : void 0;
      if (te < 0)
        K ? ne = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : ne = l.tabbableGroups[0].firstTabbableNode;
      else if (K) {
        var se = l.tabbableGroups.findIndex(function(ve) {
          var Pe = ve.firstTabbableNode;
          return $ === Pe;
        });
        if (se < 0 && (ie.container === $ || Pt($, r.tabbableOptions) && !We($, r.tabbableOptions) && !ie.nextTabbableNode($, !1)) && (se = te), se >= 0) {
          var Ie = se === 0 ? l.tabbableGroups.length - 1 : se - 1, Ce = l.tabbableGroups[Ie];
          ne = Ve($) >= 0 ? Ce.lastTabbableNode : Ce.lastDomTabbableNode;
        } else Je(L) || (ne = ie.nextTabbableNode($, !1));
      } else {
        var Y = l.tabbableGroups.findIndex(function(ve) {
          var Pe = ve.lastTabbableNode;
          return $ === Pe;
        });
        if (Y < 0 && (ie.container === $ || Pt($, r.tabbableOptions) && !We($, r.tabbableOptions) && !ie.nextTabbableNode($)) && (Y = te), Y >= 0) {
          var G = Y === l.tabbableGroups.length - 1 ? 0 : Y + 1, ae = l.tabbableGroups[G];
          ne = Ve($) >= 0 ? ae.firstTabbableNode : ae.firstDomTabbableNode;
        } else Je(L) || (ne = ie.nextTabbableNode($));
      }
    } else
      ne = d("fallbackFocus");
    return ne;
  }, y = function(C) {
    var $ = ut(C);
    if (!(u($, C) >= 0)) {
      if (Xe(r.clickOutsideDeactivates, C)) {
        o.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: r.returnFocusOnDeactivate
        });
        return;
      }
      Xe(r.allowOutsideClick, C) || C.preventDefault();
    }
  }, D = function(C) {
    var $ = ut(C), L = u($, C) >= 0;
    if (L || $ instanceof Document)
      L && (l.mostRecentlyFocusedNode = $);
    else {
      C.stopImmediatePropagation();
      var j, K = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ve(l.mostRecentlyFocusedNode) > 0) {
          var ne = u(l.mostRecentlyFocusedNode), te = l.containerGroups[ne].tabbableNodes;
          if (te.length > 0) {
            var ie = te.findIndex(function(se) {
              return se === l.mostRecentlyFocusedNode;
            });
            ie >= 0 && (r.isKeyForward(l.recentNavEvent) ? ie + 1 < te.length && (j = te[ie + 1], K = !1) : ie - 1 >= 0 && (j = te[ie - 1], K = !1));
          }
        } else
          l.containerGroups.some(function(se) {
            return se.tabbableNodes.some(function(Ie) {
              return Ve(Ie) > 0;
            });
          }) || (K = !1);
      else
        K = !1;
      K && (j = A({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), E(j || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, T = function(C) {
    var $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = C;
    var L = A({
      event: C,
      isBackward: $
    });
    L && (Je(C) && C.preventDefault(), E(L));
  }, P = function(C) {
    (r.isKeyForward(C) || r.isKeyBackward(C)) && T(C, r.isKeyBackward(C));
  }, I = function(C) {
    ed(C) && Xe(r.escapeDeactivates, C) !== !1 && (C.preventDefault(), o.deactivate());
  }, M = function(C) {
    var $ = ut(C);
    u($, C) >= 0 || Xe(r.clickOutsideDeactivates, C) || Xe(r.allowOutsideClick, C) || (C.preventDefault(), C.stopImmediatePropagation());
  }, h = function() {
    if (l.active)
      return Ba.activateTrap(n, o), l.delayInitialFocusTimer = r.delayInitialFocus ? $a(function() {
        E(p());
      }) : E(p()), e.addEventListener("focusin", D, !0), e.addEventListener("mousedown", y, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", y, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", M, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", P, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", I), o;
  }, x = function() {
    if (l.active)
      return e.removeEventListener("focusin", D, !0), e.removeEventListener("mousedown", y, !0), e.removeEventListener("touchstart", y, !0), e.removeEventListener("click", M, !0), e.removeEventListener("keydown", P, !0), e.removeEventListener("keydown", I), o;
  }, g = function(C) {
    var $ = C.some(function(L) {
      var j = Array.from(L.removedNodes);
      return j.some(function(K) {
        return K === l.mostRecentlyFocusedNode;
      });
    });
    $ && E(p());
  }, H = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(g) : void 0, q = function() {
    H && (H.disconnect(), l.active && !l.paused && l.containers.map(function(C) {
      H.observe(C, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return o = {
    get active() {
      return l.active;
    },
    get paused() {
      return l.paused;
    },
    activate: function(C) {
      if (l.active)
        return this;
      var $ = s(C, "onActivate"), L = s(C, "onPostActivate"), j = s(C, "checkCanFocusTrap");
      j || m(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, $ == null || $();
      var K = function() {
        j && m(), h(), q(), L == null || L();
      };
      return j ? (j(l.containers.concat()).then(K, K), this) : (K(), this);
    },
    deactivate: function(C) {
      if (!l.active)
        return this;
      var $ = La({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, C);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, x(), l.active = !1, l.paused = !1, q(), Ba.deactivateTrap(n, o);
      var L = s($, "onDeactivate"), j = s($, "onPostDeactivate"), K = s($, "checkCanReturnFocus"), ne = s($, "returnFocus", "returnFocusOnDeactivate");
      L == null || L();
      var te = function() {
        $a(function() {
          ne && E(_(l.nodeFocusedBeforeActivation)), j == null || j();
        });
      };
      return ne && K ? (K(_(l.nodeFocusedBeforeActivation)).then(te, te), this) : (te(), this);
    },
    pause: function(C) {
      if (l.paused || !l.active)
        return this;
      var $ = s(C, "onPause"), L = s(C, "onPostPause");
      return l.paused = !0, $ == null || $(), x(), q(), L == null || L(), this;
    },
    unpause: function(C) {
      if (!l.paused || !l.active)
        return this;
      var $ = s(C, "onUnpause"), L = s(C, "onPostUnpause");
      return l.paused = !1, $ == null || $(), m(), h(), q(), L == null || L(), this;
    },
    updateContainerElements: function(C) {
      var $ = [].concat(C).filter(Boolean);
      return l.containers = $.map(function(L) {
        return typeof L == "string" ? e.querySelector(L) : L;
      }), l.active && m(), q(), this;
    }
  }, o.updateContainerElements(a), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const ld = {
  escapeDeactivates: {
    type: Boolean,
    default: !0
  },
  returnFocusOnDeactivate: {
    type: Boolean,
    default: !0
  },
  allowOutsideClick: {
    type: [Boolean, Function],
    default: !0
  },
  clickOutsideDeactivates: [Boolean, Function],
  initialFocus: [String, Function, Boolean],
  fallbackFocus: [String, Function],
  checkCanFocusTrap: Function,
  checkCanReturnFocus: Function,
  delayInitialFocus: {
    type: Boolean,
    default: !0
  },
  document: Object,
  preventScroll: Boolean,
  setReturnFocus: [Object, String, Boolean, Function],
  tabbableOptions: Object
}, od = S({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, ld),
  emits: [
    "update:active",
    "activate",
    "postActivate",
    "deactivate",
    "postDeactivate"
  ],
  render() {
    return this.renderImpl();
  },
  setup(a, { slots: t, emit: e }) {
    let n;
    const r = W(null), l = w(() => {
      const s = r.value;
      return s && (s instanceof HTMLElement ? s : s.$el);
    });
    function o() {
      return n || (n = rd(l.value, {
        escapeDeactivates: a.escapeDeactivates,
        allowOutsideClick: a.allowOutsideClick,
        returnFocusOnDeactivate: a.returnFocusOnDeactivate,
        clickOutsideDeactivates: a.clickOutsideDeactivates,
        onActivate: () => {
          e("update:active", !0), e("activate");
        },
        onDeactivate: () => {
          e("update:active", !1), e("deactivate");
        },
        onPostActivate: () => e("postActivate"),
        onPostDeactivate: () => e("postDeactivate"),
        initialFocus: a.initialFocus,
        fallbackFocus: a.fallbackFocus,
        tabbableOptions: a.tabbableOptions,
        delayInitialFocus: a.delayInitialFocus,
        preventScroll: a.preventScroll
      }));
    }
    return be(() => {
      me(() => a.active, (s) => {
        s && l.value ? o().activate() : n && (n.deactivate(), (!l.value || l.value.nodeType === Node.COMMENT_NODE) && (n = null));
      }, { immediate: !0, flush: "post" });
    }), Te(() => {
      n && n.deactivate(), n = null;
    }), {
      activate() {
        o().activate();
      },
      deactivate() {
        n && n.deactivate();
      },
      renderImpl() {
        if (!t.default)
          return null;
        const s = t.default().filter((u) => u.type !== rr);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : lr(s[0], { ref: r });
      }
    };
  }
}), sd = ["aria-labelledby", "role", "open"], id = { class: "fr-container fr-container--fluid fr-container-md" }, ud = { class: "fr-grid-row fr-grid-row--center" }, dd = { class: "fr-modal__body" }, cd = { class: "fr-modal__header" }, fd = ["title"], pd = { class: "fr-modal__content" }, md = ["id"], hd = {
  key: 0,
  class: "fr-modal__footer"
}, Aa = 2, vd = /* @__PURE__ */ S({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => re("modal", "dialog") },
    opened: { type: Boolean },
    actions: { default: () => [] },
    isAlert: { type: Boolean },
    origin: { default: () => ({ focus() {
    } }) },
    title: {},
    icon: { default: void 0 },
    size: { default: "md" },
    closeButtonLabel: { default: "Fermer" },
    closeButtonTitle: { default: "Fermer la fenêtre modale" }
  },
  emits: ["close"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = (_) => {
      _.key === "Escape" && m();
    }, l = w(() => e.isAlert ? "alertdialog" : "dialog"), o = W(null), s = W();
    me(() => e.opened, (_) => {
      var A, y;
      _ ? ((A = s.value) == null || A.showModal(), setTimeout(() => {
        var D;
        (D = o.value) == null || D.focus();
      }, 100)) : (y = s.value) == null || y.close(), u(_);
    });
    function u(_) {
      typeof window < "u" && document.body.classList.toggle("modal-open", _);
    }
    be(() => {
      d(), u(e.opened);
    }), dr(() => {
      p(), u(!1);
    });
    function d() {
      document.addEventListener("keydown", r);
    }
    function p() {
      document.removeEventListener("keydown", r);
    }
    async function m() {
      var _;
      await Qa(), (_ = e.origin) == null || _.focus(), n("close");
    }
    const k = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), E = w(
      () => k.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Aa } : { scale: Aa, ...e.icon ?? {} }
    );
    return (_, A) => _.opened ? (i(), V(O(od), { key: 0 }, {
      default: X(() => {
        var y, D;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-modal": "true",
            "aria-labelledby": _.modalId,
            role: l.value,
            class: R(["fr-modal", { "fr-modal--opened": _.opened }]),
            open: _.opened
          }, [
            c("div", id, [
              c("div", ud, [
                c("div", {
                  class: R(["fr-col-12", {
                    "fr-col-md-8": _.size === "lg",
                    "fr-col-md-6": _.size === "md",
                    "fr-col-md-4": _.size === "sm"
                  }])
                }, [
                  c("div", dd, [
                    c("div", cd, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: _.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: A[0] || (A[0] = (T) => m())
                      }, [
                        c("span", null, v(_.closeButtonLabel), 1)
                      ], 8, fd)
                    ]),
                    c("div", pd, [
                      c("h1", {
                        id: _.modalId,
                        class: "fr-modal__title"
                      }, [
                        k.value || E.value ? (i(), f("span", {
                          key: 0,
                          class: R({
                            [String(_.icon)]: k.value
                          })
                        }, [
                          _.icon && E.value ? (i(), V(pe, De(Q({ key: 0 }, E.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        F(" " + v(_.title), 1)
                      ], 8, md),
                      B(_.$slots, "default", {}, void 0, !0)
                    ]),
                    (y = _.actions) != null && y.length || _.$slots.footer ? (i(), f("div", hd, [
                      B(_.$slots, "footer", {}, void 0, !0),
                      (D = _.actions) != null && D.length ? (i(), V(Dt, {
                        key: 0,
                        align: "right",
                        buttons: _.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : b("", !0)
                    ])) : b("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, sd)
        ];
      }),
      _: 3
    })) : b("", !0);
  }
}), xn = /* @__PURE__ */ ke(vd, [["__scopeId", "data-v-33fe2c83"]]), gd = ["for"], bd = {
  key: 0,
  class: "required"
}, yd = {
  key: 0,
  class: "fr-hint-text"
}, kd = ["id"], wd = ["id"], _d = {
  key: 0,
  class: "fr-btns-group"
}, xd = {
  key: 1,
  class: "fr-input-group"
}, Dd = { class: "fr-input-wrap fr-icon-search-line" }, Td = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Id = { key: 2 }, Ed = ["id"], Md = /* @__PURE__ */ S({
  __name: "DsfrMultiselect",
  props: /* @__PURE__ */ Le({
    modelValue: {},
    options: {},
    label: {},
    labelVisible: { type: Boolean, default: !0 },
    labelClass: { default: "" },
    hint: { default: "" },
    legend: { default: "" },
    errorMessage: { default: "" },
    successMessage: { default: "" },
    buttonLabel: { default: "" },
    id: { default: () => re("multiselect") },
    selectAll: { type: Boolean, default: !1 },
    search: { type: Boolean, default: !1 },
    selectAllLabel: { default: () => ["Tout sélectionner", "Tout désélectionner"] },
    idKey: { default: "id" },
    labelKey: { default: "label" },
    filteringKeys: { default: () => ["label"] },
    maxOverflowHeight: { default: "400px" }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = (Y, G) => typeof Y == "object" && Y !== null && !!G && G in Y, n = (Y, G) => {
      if (G && e(Y, G)) {
        const ae = Y[G];
        if (typeof ae == "string" || typeof ae == "number")
          return ae;
        throw new Error(
          `The value of idKey ${String(G)} is not a string or number.`
        );
      }
      if (typeof Y == "string" || typeof Y == "number")
        return Y;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (Y, G, ae) => `${G}-${n(Y, ae)}`, l = W(null), o = W(!1), s = we(a, "modelValue"), u = W(0), d = w(() => t.errorMessage || t.successMessage), p = w(() => t.errorMessage ? "error" : "valid"), m = [], {
      collapse: k,
      collapsing: E,
      cssExpanded: _,
      doExpand: A,
      onTransitionEnd: y
    } = $e(), D = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), T = W(!1), P = W("");
    function I(Y) {
      Y.key === "Escape" && H();
    }
    function M(Y) {
      var G, ae;
      const ve = Y.target;
      !((G = l.value) != null && G.$el.contains(ve)) && !((ae = k.value) != null && ae.contains(ve)) && H();
    }
    function h(Y, G) {
      if (window.ResizeObserver) {
        const ae = new window.ResizeObserver((ve) => {
          for (const Pe of ve)
            G(Y, Pe);
        });
        return ae.observe(Y), () => {
          ae.unobserve(Y), ae.disconnect();
        };
      }
      return () => {
      };
    }
    function x(Y) {
      const G = Y.getBoundingClientRect();
      G.width !== u.value && (u.value = G.width);
    }
    function g() {
      o.value = !0, T.value = !0, l.value && m.push(h(l.value.$el, x)), document.addEventListener("click", M), document.addEventListener("keydown", I), setTimeout(() => {
        A(!0);
      }, 100);
    }
    function H() {
      o.value = !1, A(!1), setTimeout(() => {
        T.value = !1;
      }, 300), C();
    }
    const q = async () => {
      T.value ? H() : g();
    };
    function C() {
      for (; m.length; ) {
        const Y = m.pop();
        Y && Y();
      }
      document.removeEventListener("click", M), document.removeEventListener("keydown", I);
    }
    const $ = w(
      () => t.options.filter((Y) => typeof Y == "object" && Y !== null ? t.filteringKeys.some(
        (G) => `${Y[G]}`.toLowerCase().includes(P.value.toLowerCase())
      ) : `${Y}`.toLowerCase().includes(P.value.toLowerCase()))
    ), L = w(() => t.modelValue.length < $.value.length ? !1 : $.value.every((Y) => {
      const G = n(Y, t.idKey);
      return t.modelValue.includes(G);
    })), j = () => {
      const Y = new Set(s.value || []);
      L.value ? $.value.forEach((G) => {
        const ae = n(G, t.idKey);
        Y.delete(ae);
      }) : $.value.forEach((G) => {
        const ae = n(G, t.idKey);
        Y.add(ae);
      }), s.value = Array.from(Y);
    }, K = (Y) => {
      const [G] = D();
      G && (Y.preventDefault(), G.focus());
    }, ne = (Y) => {
      Y.preventDefault();
      const G = D(), ae = document.activeElement, ve = Array.from(G).indexOf(ae);
      if (ve !== -1) {
        const Pe = (ve + 1) % G.length;
        G[Pe].focus();
      }
    }, te = (Y) => {
      Y.preventDefault();
      const G = D(), ae = document.activeElement, ve = Array.from(G).indexOf(ae);
      if (ve !== -1) {
        const Pe = (ve - 1 + G.length) % G.length;
        G[Pe].focus();
      }
    }, ie = (Y) => {
      const G = D(), ae = document.activeElement;
      Array.from(G).indexOf(ae) + 1 === G.length && l.value && !Y.shiftKey && H();
    }, se = (Y) => {
      var G;
      const ae = document.activeElement;
      Y.shiftKey && ae === ((G = l.value) == null ? void 0 : G.$el) && H();
    };
    Te(() => {
      C();
    });
    const Ie = w(() => {
      var Y;
      const G = ((Y = s.value) == null ? void 0 : Y.length) ?? 0, ae = G === 0, ve = G > 1;
      return ae ? "Sélectionner une option" : `${G} option${ve ? "s" : ""} sélectionnée${ve ? "s" : ""}`;
    }), Ce = w(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (Y, G) => (i(), f("div", {
      class: R(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
    }, [
      c("label", {
        class: R(Ce.value),
        for: Y.id
      }, [
        B(Y.$slots, "label", {}, () => [
          F(v(Y.label) + " ", 1),
          B(Y.$slots, "required-tip", {}, () => [
            "required" in Y.$attrs && Y.$attrs.required !== !1 ? (i(), f("span", bd, "*")) : b("", !0)
          ], !0)
        ], !0),
        t.hint || Y.$slots.hint ? (i(), f("span", yd, [
          B(Y.$slots, "hint", {}, () => [
            F(v(t.hint), 1)
          ], !0)
        ])) : b("", !0)
      ], 10, gd),
      ee(qe, Q({
        id: t.id,
        ref_key: "host",
        ref: l,
        type: "button"
      }, Y.$attrs, {
        class: ["fr-select fr-multiselect", {
          "fr-multiselect--is-open": o.value,
          [`fr-select--${p.value}`]: d.value
        }],
        "aria-expanded": o.value,
        "aria-controls": `${t.id}-collapse`,
        onClick: q,
        onKeydown: Z(J(se, ["shift"]), ["tab"])
      }), {
        default: X(() => [
          B(Y.$slots, "button-label", {}, () => [
            F(v(t.buttonLabel || Ie.value), 1)
          ], !0)
        ]),
        _: 3
      }, 16, ["id", "aria-expanded", "aria-controls", "class", "onKeydown"]),
      T.value ? (i(), f("div", {
        key: 0,
        id: `${t.id}-collapse`,
        ref_key: "collapse",
        ref: k,
        style: xe({
          "--width-host": `${u.value}px`
        }),
        class: R(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": O(_), "fr-collapsing": O(E) }]),
        onTransitionend: G[2] || (G[2] = (ae) => O(y)(o.value))
      }, [
        c("p", {
          id: `${Y.id}-text-hint`,
          class: "fr-sr-only"
        }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, wd),
        Y.selectAll ? (i(), f("ul", _d, [
          c("li", null, [
            ee(qe, {
              type: "button",
              name: "select-all",
              secondary: "",
              size: "sm",
              disabled: $.value.length === 0,
              onClick: j,
              onKeydown: Z(J(se, ["shift"]), ["tab"])
            }, {
              default: X(() => [
                c("span", {
                  class: R([
                    "fr-multiselect__search__icon",
                    L.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                  ])
                }, null, 2),
                F(" " + v(t.selectAllLabel[L.value ? 1 : 0]), 1)
              ]),
              _: 1
            }, 8, ["disabled", "onKeydown"])
          ])
        ])) : b("", !0),
        t.search ? (i(), f("div", xd, [
          c("div", Dd, [
            ee(It, {
              modelValue: P.value,
              "onUpdate:modelValue": G[0] || (G[0] = (ae) => P.value = ae),
              "aria-describedby": `${t.id}-text-hint`,
              "aria-controls": `${t.id}-checkboxes`,
              "aria-live": "polite",
              placeholder: "Rechercher",
              type: "text",
              onKeydown: [
                Z(K, ["down"]),
                Z(K, ["right"]),
                Z(se, ["tab"])
              ]
            }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
          ]),
          G[3] || (G[3] = c("div", {
            class: "fr-messages-group",
            "aria-live": "assertive"
          }, null, -1))
        ])) : b("", !0),
        ee(cn, {
          id: `${t.id}-checkboxes`,
          class: "fr-multiselect__collapse__fieldset",
          "aria-live": "polite",
          style: xe({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
          legend: t.legend,
          "legend-id": `${t.id}-checkboxes-legend`
        }, {
          default: X(() => [
            B(Y.$slots, "legend", {}, void 0, !0),
            (i(!0), f(z, null, U($.value, (ae) => (i(), f("div", {
              key: `${r(ae, Y.id, t.idKey)}-checkbox`,
              class: "fr-fieldset__element"
            }, [
              c("div", Td, [
                ee(Tt, {
                  id: `${r(ae, Y.id, t.idKey)}-checkbox`,
                  modelValue: s.value,
                  "onUpdate:modelValue": G[1] || (G[1] = (ve) => s.value = ve),
                  value: n(ae, t.idKey),
                  name: `${r(ae, Y.id, t.idKey)}-checkbox`,
                  small: "",
                  onKeydown: [
                    Z(ne, ["down"]),
                    Z(ne, ["right"]),
                    Z(te, ["up"]),
                    Z(te, ["left"]),
                    Z(ie, ["tab"])
                  ]
                }, {
                  label: X(() => [
                    B(Y.$slots, "checkbox-label", {
                      option: ae
                    }, () => [
                      F(v(n(ae, t.labelKey)), 1)
                    ], !0)
                  ]),
                  _: 2
                }, 1032, ["id", "modelValue", "value", "name"])
              ])
            ]))), 128))
          ]),
          _: 3
        }, 8, ["id", "style", "legend", "legend-id"]),
        $.value.length === 0 ? (i(), f("div", Id, [
          B(Y.$slots, "no-results", {}, () => [
            G[4] || (G[4] = F(" Pas de résultat "))
          ], !0)
        ])) : b("", !0)
      ], 46, kd)) : b("", !0),
      d.value ? (i(), f("p", {
        key: 1,
        id: `select-${p.value}-desc-${p.value}`,
        class: R(`fr-${p.value}-text`)
      }, v(d.value), 11, Ed)) : b("", !0)
    ], 2));
  }
}), Cd = /* @__PURE__ */ ke(Md, [["__scopeId", "data-v-7fb20102"]]), Pd = ["id", "aria-current"], Ld = /* @__PURE__ */ S({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => re("nav", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-nav__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      B(t.$slots, "default", {}, void 0, !0)
    ], 8, Pd));
  }
}), Dn = /* @__PURE__ */ ke(Ld, [["__scopeId", "data-v-5909c19f"]]), Bd = ["href"], Sa = 2, Et = /* @__PURE__ */ S({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => re("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(a) {
    const t = a, e = w(() => typeof t.to == "string" && t.to.startsWith("http")), n = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = w(
      () => n.value || !t.icon ? void 0 : typeof t.icon == "string" ? { scale: Sa, name: t.icon } : { scale: Sa, ...t.icon || {} }
    ), l = sr() ? Qe(Xt) : void 0, o = (l == null ? void 0 : l()) ?? (() => {
    });
    return (s, u) => {
      const d = _e("RouterLink");
      return e.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: s.to,
        onClick: u[0] || (u[0] = (p) => {
          s.$emit("toggleId", s.id), s.onClick(p);
        })
      }, v(s.text), 9, Bd)) : (i(), V(d, {
        key: 1,
        class: R(["fr-nav__link", {
          [String(s.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: u[1] || (u[1] = (p) => {
          var m;
          O(o)(), s.$emit("toggleId", s.id), (m = s.onClick) == null || m.call(s, p);
        })
      }, {
        default: X(() => [
          s.icon && r.value ? (i(), V(pe, De(Q({ key: 0 }, r.value)), null, 16)) : b("", !0),
          F(" " + v(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), $d = { class: "fr-col-12 fr-col-lg-3" }, Ad = { class: "fr-mega-menu__category" }, Sd = { class: "fr-mega-menu__list" }, Tn = /* @__PURE__ */ S({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", $d, [
      c("h5", Ad, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: e[0] || (e[0] = J(() => {
          }, ["prevent"]))
        }, v(t.title), 1)
      ]),
      c("ul", Sd, [
        (i(!0), f(z, null, U(t.links, (n, r) => (i(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          ee(Et, Q({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Od = ["aria-expanded", "aria-current", "aria-controls"], Rd = ["id"], Fd = { class: "fr-container fr-container--fluid fr-container-lg" }, Nd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Vd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, jd = { class: "fr-mega-menu__leader" }, qd = { class: "fr-h4 fr-mb-2v" }, Hd = { class: "fr-hidden fr-displayed-lg" }, Wd = /* @__PURE__ */ S({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => re("menu") },
    title: {},
    description: { default: "" },
    link: { default: () => ({ to: "#", text: "Voir toute la rubrique" }) },
    menus: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: o
    } = $e(), s = w(() => t.id === t.expandedId);
    return me(s, (u, d) => {
      u !== d && l(u);
    }), be(() => {
      s.value && l(!0);
    }), (u, d) => {
      const p = _e("RouterLink");
      return i(), f(z, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: d[0] || (d[0] = (m) => u.$emit("toggleId", u.id))
        }, v(u.title), 9, Od),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: R(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": O(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": O(n)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (m) => O(o)(s.value))
        }, [
          c("div", Fd, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (m) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            c("div", Nd, [
              c("div", Vd, [
                c("div", jd, [
                  c("h4", qd, v(u.title), 1),
                  c("p", Hd, [
                    F(v(u.description) + " ", 1),
                    B(u.$slots, "description", {}, void 0, !0)
                  ]),
                  ee(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: X(() => [
                      F(v(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              B(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(z, null, U(u.menus, (m, k) => (i(), V(Tn, Q({
                key: k,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, Rd)
      ], 64);
    };
  }
}), In = /* @__PURE__ */ ke(Wd, [["__scopeId", "data-v-91c500cc"]]), Yd = ["id", "aria-current"], En = /* @__PURE__ */ S({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => re("menu", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-menu__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      B(t.$slots, "default")
    ], 8, Yd));
  }
}), Qd = ["aria-expanded", "aria-current", "aria-controls"], Kd = ["id"], zd = { class: "fr-menu__list" }, Mn = /* @__PURE__ */ S({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => re("menu") },
    title: {},
    links: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: o
    } = $e(), s = w(() => t.id === t.expandedId);
    return me(s, (u, d) => {
      u !== d && l(u);
    }), be(() => {
      s.value && l(!0);
    }), (u, d) => (i(), f(z, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: d[0] || (d[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        c("span", null, v(u.title), 1)
      ], 8, Qd),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse fr-menu", { "fr-collapse--expanded": O(r), "fr-collapsing": O(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => O(o)(s.value))
      }, [
        c("ul", zd, [
          B(u.$slots, "default"),
          (i(!0), f(z, null, U(u.links, (p, m) => (i(), V(En, { key: m }, {
            default: X(() => [
              ee(Et, Q({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (k) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Kd)
    ], 64));
  }
}), Gd = ["id", "aria-label"], Xd = { class: "fr-nav__list" }, Ud = /* @__PURE__ */ S({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => re("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(a) {
    const t = a, e = W(void 0), n = (s) => {
      if (s === e.value) {
        e.value = void 0;
        return;
      }
      e.value = s;
    }, r = (s) => {
      if (s !== document.getElementById(t.id)) {
        if (!(s != null && s.parentNode)) {
          n(e.value);
          return;
        }
        r(s.parentNode);
      }
    }, l = (s) => {
      r(s.target);
    }, o = (s) => {
      s.key === "Escape" && n(e.value);
    };
    return be(() => {
      document.addEventListener("click", l), document.addEventListener("keydown", o);
    }), Te(() => {
      document.removeEventListener("click", l), document.removeEventListener("keydown", o);
    }), (s, u) => (i(), f("nav", {
      id: s.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": s.label
    }, [
      c("ul", Xd, [
        B(s.$slots, "default"),
        (i(!0), f(z, null, U(s.navItems, (d, p) => (i(), V(Dn, {
          id: d.id,
          key: p
        }, {
          default: X(() => [
            d.to && d.text ? (i(), V(Et, Q({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), V(Mn, Q({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), V(In, Q({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, Gd));
  }
}), Zd = { class: "fr-container" }, Jd = { class: "fr-notice__body" }, ec = { class: "fr-notice__title" }, tc = { class: "fr-notice__desc" }, ac = /* @__PURE__ */ S({
  __name: "DsfrNotice",
  props: {
    title: { default: "" },
    desc: { default: "" },
    closeable: { type: Boolean },
    type: { default: "info" }
  },
  emits: ["close"],
  setup(a) {
    return (t, e) => (i(), f("div", {
      class: R(["fr-notice", `fr-notice--${t.type}`])
    }, [
      c("div", Zd, [
        c("div", Jd, [
          c("p", null, [
            c("span", ec, [
              B(t.$slots, "default", {}, () => [
                F(v(t.title), 1)
              ])
            ]),
            c("span", tc, [
              B(t.$slots, "desc", {}, () => [
                F(v(t.desc), 1)
              ])
            ])
          ]),
          t.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: e[0] || (e[0] = (n) => t.$emit("close"))
          }, " Masquer le message ")) : b("", !0)
        ])
      ])
    ], 2));
  }
}), nc = ["aria-label"], rc = { class: "fr-content-media__img" }, lc = ["src", "alt", "title", "ratio"], oc = { class: "fr-content-media__caption" }, sc = /* @__PURE__ */ S({
  __name: "DsfrPicture",
  props: {
    alt: { default: "" },
    legend: { default: "" },
    size: { default: "medium" },
    src: {},
    title: { default: "" },
    ratio: { default: "16x9" }
  },
  setup(a) {
    return (t, e) => (i(), f("figure", {
      class: R(["fr-content-media", {
        "fr-content-media--sm": t.size === "small",
        "fr-content-media--lg": t.size === "large"
      }]),
      role: "group",
      "aria-label": t.legend
    }, [
      c("div", rc, [
        B(t.$slots, "default", {}, () => [
          t.src ? (i(), f("img", {
            key: 0,
            src: t.src,
            class: R(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
            alt: t.alt,
            title: t.title,
            ratio: t.ratio
          }, null, 10, lc)) : b("", !0)
        ])
      ]),
      c("figcaption", oc, v(t.legend), 1)
    ], 10, nc));
  }
}), ic = { class: "fr-quote fr-quote--column" }, uc = ["cite"], dc = { class: "fr-quote__author" }, cc = { class: "fr-quote__source" }, fc = ["href"], pc = {
  key: 0,
  class: "fr-quote__image"
}, mc = ["src"], hc = /* @__PURE__ */ S({
  __name: "DsfrQuote",
  props: {
    quote: { default: void 0 },
    author: { default: void 0 },
    details: { default: () => [] },
    source: { default: "" },
    sourceUrl: { default: "" },
    quoteImage: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("figure", ic, [
      t.source ? (i(), f("blockquote", {
        key: 0,
        cite: t.sourceUrl
      }, [
        c("p", null, "« " + v(t.quote) + " »", 1)
      ], 8, uc)) : b("", !0),
      c("figcaption", null, [
        c("p", dc, v(t.author), 1),
        c("ul", cc, [
          c("li", null, [
            c("cite", null, v(t.source), 1)
          ]),
          (i(!0), f(z, null, U(t.details, (n, r) => (i(), f("li", { key: r }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, v(n.label), 9, fc)) : (i(), f(z, { key: 1 }, [
              F(v(n), 1)
            ], 64))
          ]))), 128))
        ]),
        t.quoteImage ? (i(), f("div", pc, [
          c("img", {
            src: t.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, mc)
        ])) : b("", !0)
      ])
    ]));
  }
}), vc = ["id", "name", "value", "checked", "disabled"], gc = ["for"], bc = {
  key: 0,
  class: "required"
}, yc = {
  key: 0,
  class: "fr-hint-text"
}, kc = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, wc = ["src", "title"], _c = { key: 0 }, xc = ["href"], Dc = ["href"], Tc = ["href"], Cn = /* @__PURE__ */ S({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => re("basic", "radio") },
    name: {},
    modelValue: { type: [String, Number, Boolean], default: "" },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    value: { type: [String, Number, Boolean] },
    label: { default: "" },
    hint: { default: "" },
    img: { default: void 0 },
    imgTitle: {},
    svgPath: { default: void 0 },
    svgAttrs: { default: () => ({ viewBox: "0 0 80 80", width: "80px", height: "80px" }) }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = w(() => !!t.img || !!t.svgPath);
    return (r, l) => (i(), f("div", {
      class: R(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: R(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": r.small
        }])
      }, [
        c("input", Q({
          id: r.id,
          type: "radio",
          name: r.name,
          value: r.value,
          checked: r.modelValue === r.value,
          disabled: r.disabled
        }, r.$attrs, {
          onClick: l[0] || (l[0] = (o) => r.$emit("update:modelValue", r.value))
        }), null, 16, vc),
        c("label", {
          for: r.id,
          class: "fr-label"
        }, [
          B(r.$slots, "label", {}, () => [
            F(v(r.label) + " ", 1),
            B(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (i(), f("span", bc, " *")) : b("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", yc, v(r.hint), 1)) : b("", !0)
        ], 8, gc),
        r.img || r.svgPath ? (i(), f("div", kc, [
          r.img ? (i(), f("img", {
            key: 0,
            src: r.img,
            class: "fr-artwork",
            alt: "",
            title: r.imgTitle
          }, null, 8, wc)) : (i(), f("svg", Q({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...e, ...r.svgAttrs }), [
            r.imgTitle ? (i(), f("title", _c, v(r.imgTitle), 1)) : b("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${r.svgPath}#artwork-decorative`
            }, null, 8, xc),
            c("use", {
              class: "fr-artwork-minor",
              href: `${r.svgPath}#artwork-minor`
            }, null, 8, Dc),
            c("use", {
              class: "fr-artwork-major",
              href: `${r.svgPath}#artwork-major`
            }, null, 8, Tc)
          ], 16))
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Ic = { class: "fr-form-group" }, Ec = ["disabled", "aria-labelledby", "aria-invalid", "role"], Mc = ["id"], Cc = {
  key: 0,
  class: "fr-hint-text"
}, Pc = {
  key: 0,
  class: "required"
}, Lc = ["id"], Bc = /* @__PURE__ */ S({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => re("radio-button", "group") },
    disabled: { type: Boolean },
    required: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    name: {},
    errorMessage: { default: "" },
    validMessage: { default: "" },
    legend: { default: "" },
    hint: { default: "" },
    modelValue: { type: [String, Number, Boolean] },
    options: { default: () => [] },
    ariaInvalid: { type: [Boolean, String] }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = w(() => e.errorMessage || e.validMessage), l = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (u) => {
      u !== e.modelValue && n("update:modelValue", u);
    }, s = w(() => r.value ? `${e.titleId} messages-${e.titleId}` : e.titleId);
    return (u, d) => (i(), f("div", Ic, [
      c("fieldset", {
        class: R(["fr-fieldset", {
          "fr-fieldset--error": u.errorMessage,
          "fr-fieldset--valid": u.validMessage
        }]),
        disabled: u.disabled,
        "aria-labelledby": s.value,
        "aria-invalid": u.ariaInvalid,
        role: u.errorMessage || u.validMessage ? "group" : void 0
      }, [
        u.legend || u.$slots.legend || u.hint || u.$slots.hint ? (i(), f("legend", {
          key: 0,
          id: u.titleId,
          class: "fr-fieldset__legend fr-fieldset__legend--regular"
        }, [
          B(u.$slots, "legend", {}, () => [
            F(v(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Cc, [
              B(u.$slots, "hint", {}, () => [
                F(v(u.hint), 1)
              ])
            ])) : b("", !0),
            B(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Pc, " *")) : b("", !0)
            ])
          ])
        ], 8, Mc)) : b("", !0),
        B(u.$slots, "default", {}, () => [
          (i(!0), f(z, null, U(u.options, (p, m) => (i(), V(Cn, Q({
            key: typeof p.value == "boolean" ? m : p.value || m,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": d[0] || (d[0] = (k) => o(k))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        r.value ? (i(), f("div", {
          key: 1,
          id: `messages-${u.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: R(["fr-message fr-message--info flex items-center", l.value])
          }, v(r.value), 3)
        ], 8, Lc)) : b("", !0)
      ], 10, Ec)
    ]));
  }
}), $c = ["id"], Ac = ["id"], Sc = { class: "fr-hint-text" }, Oc = ["data-fr-prefix", "data-fr-suffix"], Rc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Fc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Nc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Vc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, jc = ["id"], qc = ["id"], Hc = /* @__PURE__ */ S({
  __name: "DsfrRange",
  props: {
    id: { default: () => re("range") },
    min: { default: 0 },
    max: { default: 100 },
    modelValue: { default: 0 },
    lowerValue: { default: void 0 },
    label: {},
    hint: { default: void 0 },
    message: { default: void 0 },
    prefix: { default: void 0 },
    suffix: { default: void 0 },
    small: { type: Boolean },
    hideIndicators: { type: Boolean },
    step: { default: void 0 },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "update:lowerValue"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = W(), l = W(), o = W(), s = w(() => e.lowerValue !== void 0), u = w(() => e.lowerValue === void 0 ? `transform: translateX(${(e.modelValue - e.min) / (e.max - e.min) * o.value}px) translateX(-${e.modelValue}%);` : `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * o.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`), d = w(() => {
      const m = (e.modelValue - e.min) / (e.max - e.min) * o.value - (s.value ? 12 : 0), k = ((e.lowerValue ?? 0) - e.min) / (e.max - e.min) * o.value;
      return {
        "--progress-right": `${m + 24}px`,
        ...s.value ? { "--progress-left": `${k + 12}px` } : {}
      };
    });
    me([() => e.modelValue, () => e.lowerValue], ([m, k]) => {
      k !== void 0 && (s.value && m < k && n("update:lowerValue", m), s.value && k > m && n("update:modelValue", k));
    });
    const p = w(() => (e.prefix ?? "").concat(s.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return be(() => {
      var m;
      o.value = (m = r.value) == null ? void 0 : m.offsetWidth;
    }), (m, k) => (i(), f("div", {
      id: `${m.id}-group`,
      class: R(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      c("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        B(m.$slots, "label", {}, () => [
          F(v(m.label), 1)
        ]),
        c("span", Sc, [
          B(m.$slots, "hint", {}, () => [
            F(v(m.hint), 1)
          ])
        ])
      ], 8, Ac),
      c("div", {
        class: R(["fr-range", {
          "fr-range--sm": m.small,
          "fr-range--double": s.value,
          "fr-range-group--disabled": m.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": m.prefix ?? void 0,
        "data-fr-suffix": m.suffix ?? void 0,
        style: xe(d.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: l,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: xe(u.value)
        }, v(p.value), 5),
        s.value ? (i(), f("input", {
          key: 0,
          id: `${m.id}-2`,
          type: "range",
          min: m.min,
          max: m.max,
          step: m.step,
          value: m.lowerValue,
          disabled: m.disabled,
          "aria-disabled": m.disabled,
          "aria-labelledby": `${m.id}-label`,
          "aria-describedby": `${m.id}-messages`,
          onInput: k[0] || (k[0] = (E) => {
            var _;
            return n("update:lowerValue", +((_ = E.target) == null ? void 0 : _.value));
          })
        }, null, 40, Rc)) : b("", !0),
        c("input", {
          id: m.id,
          ref_key: "input",
          ref: r,
          type: "range",
          min: m.min,
          max: m.max,
          step: m.step,
          value: m.modelValue,
          disabled: m.disabled,
          "aria-disabled": m.disabled,
          "aria-labelledby": `${m.id}-label`,
          "aria-describedby": `${m.id}-messages`,
          onInput: k[1] || (k[1] = (E) => {
            var _;
            return n("update:modelValue", +((_ = E.target) == null ? void 0 : _.value));
          })
        }, null, 40, Fc),
        m.hideIndicators ? b("", !0) : (i(), f("span", Nc, v(m.min), 1)),
        m.hideIndicators ? b("", !0) : (i(), f("span", Vc, v(m.max), 1))
      ], 14, Oc),
      m.message || m.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${m.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        B(m.$slots, "messages", {}, () => [
          m.message ? (i(), f("p", {
            key: 0,
            id: `${m.id}-message-error`,
            class: "fr-message fr-message--error"
          }, v(m.message), 9, qc)) : b("", !0)
        ])
      ], 8, jc)) : b("", !0)
    ], 10, $c));
  }
}), Wc = { class: "fr-segmented__element" }, Yc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Qc = ["for"], Kc = { key: 1 }, Pn = /* @__PURE__ */ S({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => re("basic", "checkbox") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = w(() => typeof t.icon == "string" ? { name: t.icon } : t.icon), n = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : "");
    return (r, l) => (i(), f("div", Wc, [
      c("input", Q({
        id: r.id,
        type: "radio",
        name: r.name,
        value: r.value,
        checked: r.modelValue === r.value,
        disabled: r.disabled,
        "aria-disabled": r.disabled
      }, r.$attrs, {
        onClick: l[0] || (l[0] = (o) => r.$emit("update:modelValue", r.value))
      }), null, 16, Yc),
      c("label", {
        for: r.id,
        class: R(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (i(), V(pe, De(Q({ key: 0 }, e.value)), null, 16)) : b("", !0),
        r.icon ? (i(), f("span", Kc, " ")) : b("", !0),
        F(" " + v(r.label), 1)
      ], 10, Qc)
    ]));
  }
}), zc = { class: "fr-form-group" }, Gc = ["disabled"], Xc = ["id"], Uc = {
  key: 0,
  class: "fr-hint-text"
}, Zc = { class: "fr-segmented__elements" }, Jc = /* @__PURE__ */ S({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => re("radio-button", "group") },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    name: { default: "no-name" },
    hint: {},
    legend: { default: "" },
    modelValue: {},
    options: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = (l) => {
      l !== e.modelValue && n("update:modelValue", l);
    };
    return (l, o) => (i(), f("div", zc, [
      c("fieldset", {
        class: R(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (i(), f("legend", {
          key: 0,
          id: l.titleId,
          class: R(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          B(l.$slots, "legend", {}, () => [
            F(v(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", Uc, v(l.hint), 1)) : b("", !0)
        ], 10, Xc)) : b("", !0),
        c("div", Zc, [
          B(l.$slots, "default", {}, () => [
            (i(!0), f(z, null, U(l.options, (s, u) => (i(), V(Pn, Q({
              key: s.value || u,
              name: l.name || s.name,
              ref_for: !0
            }, { ...s, disabled: l.disabled || s.disabled }, {
              "model-value": l.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (d) => r(d))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Gc)
    ]));
  }
}), ef = ["for"], tf = {
  key: 0,
  class: "required"
}, af = {
  key: 0,
  class: "fr-hint-text"
}, nf = ["id", "name", "disabled", "aria-disabled", "required"], rf = ["selected"], lf = ["selected", "value", "disabled", "aria-disabled"], of = ["id"], sf = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => re("select") },
    name: { default: void 0 },
    description: { default: void 0 },
    hint: { default: void 0 },
    modelValue: { default: void 0 },
    label: { default: "" },
    options: { default: () => [] },
    successMessage: { default: "" },
    errorMessage: { default: "" },
    defaultUnselectedText: { default: "Sélectionner une option" }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const t = a;
    t.description && console.warn(
      "[DsfrSelect] : La prop `description` est dépréciée. Veuillez utiliser `hint` à la place."
    );
    const e = w(() => t.errorMessage || t.successMessage), n = w(() => t.errorMessage ? "error" : "valid");
    return (r, l) => (i(), f("div", {
      class: R(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        B(r.$slots, "label", {}, () => [
          F(v(r.label) + " ", 1),
          B(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", tf, " *")) : b("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", af, v(r.hint ?? r.description), 1)) : b("", !0)
      ], 8, ef),
      c("select", Q({
        id: r.selectId,
        class: [{ [`fr-select--${n.value}`]: e.value }, "fr-select"],
        name: r.name || r.selectId,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        required: r.required
      }, r.$attrs, {
        onChange: l[0] || (l[0] = (o) => {
          var s;
          return r.$emit("update:modelValue", (s = o.target) == null ? void 0 : s.value);
        })
      }), [
        c("option", {
          selected: !r.options.some((o) => typeof o != "object" || o === null ? o === r.modelValue : o.value === r.modelValue),
          disabled: "",
          hidden: ""
        }, v(r.defaultUnselectedText), 9, rf),
        (i(!0), f(z, null, U(r.options, (o, s) => (i(), f("option", {
          key: s,
          selected: r.modelValue === o || typeof o == "object" && o.value === r.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, v(typeof o == "object" ? o.text : o), 9, lf))), 128))
      ], 16, nf),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: R(`fr-${n.value}-text`)
      }, v(e.value), 11, of)) : b("", !0)
    ], 2));
  }
}), uf = { class: "fr-share" }, df = { class: "fr-share__title" }, cf = { class: "fr-btns-group" }, ff = ["title", "href", "onClick"], pf = { key: 0 }, mf = ["href", "title"], hf = ["title"], vf = /* @__PURE__ */ S({
  __name: "DsfrShare",
  props: {
    title: { default: "Partager la page" },
    copyLabel: { default: "Copier dans le presse-papier" },
    mail: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const t = () => {
      const n = window.location.href;
      navigator.clipboard.writeText(n);
    }, e = ({ url: n, label: r }) => {
      window.open(
        n,
        r,
        "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
    };
    return (n, r) => {
      var l;
      return i(), f("div", uf, [
        c("p", df, v(n.title), 1),
        c("ul", cf, [
          (i(!0), f(z, null, U(n.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: R(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: J((u) => e(o), ["prevent"])
            }, v(o.label), 11, ff)
          ]))), 128)),
          (l = n.mail) != null && l.to ? (i(), f("li", pf, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, v(n.mail.label), 9, mf)
          ])) : b("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: r[0] || (r[0] = (o) => t())
            }, v(n.copyLabel), 9, hf)
          ])
        ])
      ]);
    };
  }
}), gf = ["aria-current", "aria-expanded", "aria-controls"], Ln = /* @__PURE__ */ S({
  __name: "DsfrSideMenuButton",
  props: {
    active: { type: Boolean },
    expanded: { type: Boolean },
    controlId: {}
  },
  emits: ["toggleExpand"],
  setup(a) {
    return (t, e) => (i(), f("button", {
      class: "fr-sidemenu__btn",
      "aria-current": t.active ? "page" : void 0,
      "aria-expanded": !!t.expanded,
      "aria-controls": t.controlId,
      onClick: e[0] || (e[0] = (n) => t.$emit("toggleExpand", t.controlId))
    }, [
      B(t.$slots, "default")
    ], 8, gf));
  }
}), Bn = /* @__PURE__ */ S({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      class: R(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      B(t.$slots, "default")
    ], 2));
  }
}), bf = ["id"], yf = { class: "fr-sidemenu__list" }, $n = /* @__PURE__ */ S({
  __name: "DsfrSideMenuList",
  props: {
    id: {},
    collapsable: { type: Boolean },
    expanded: { type: Boolean },
    menuItems: { default: () => [] }
  },
  emits: ["toggleExpand"],
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: o
    } = $e();
    me(() => t.expanded, (p, m) => {
      p !== m && l(p);
    }), be(() => {
      t.expanded && l(!0);
    });
    const s = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => s(p) ? "a" : "RouterLink", d = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, m) => {
      const k = _e("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: R({
          "fr-collapse": p.collapsable,
          "fr-collapsing": O(n),
          "fr-collapse--expanded": O(r)
        }),
        onTransitionend: m[2] || (m[2] = (E) => O(o)(!!p.expanded))
      }, [
        c("ul", yf, [
          B(p.$slots, "default"),
          (i(!0), f(z, null, U(p.menuItems, (E, _) => (i(), V(Bn, {
            key: _,
            active: E.active
          }, {
            default: X(() => [
              E.menuItems ? b("", !0) : (i(), V(ge(u(E.to)), Q({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": E.active ? "page" : void 0,
                ref_for: !0
              }, d(E.to)), {
                default: X(() => [
                  F(v(E.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              E.menuItems ? (i(), f(z, { key: 1 }, [
                ee(Ln, {
                  active: !!E.active,
                  expanded: !!E.expanded,
                  "control-id": E.id,
                  onToggleExpand: m[0] || (m[0] = (A) => p.$emit("toggleExpand", A))
                }, {
                  default: X(() => [
                    F(v(E.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                E.menuItems ? (i(), V(k, {
                  key: 0,
                  id: E.id,
                  collapsable: "",
                  expanded: E.expanded,
                  "menu-items": E.menuItems,
                  onToggleExpand: m[1] || (m[1] = (A) => p.$emit("toggleExpand", A))
                }, null, 8, ["id", "expanded", "menu-items"])) : b("", !0)
              ], 64)) : b("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, bf);
    };
  }
}), kf = ["aria-labelledby"], wf = { class: "fr-sidemenu__inner" }, _f = ["aria-controls", "aria-expanded"], xf = ["id"], Df = /* @__PURE__ */ S({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => re("sidemenu") },
    sideMenuListId: { default: () => re("sidemenu", "list") },
    collapseValue: { default: "-492px" },
    menuItems: { default: () => {
    } },
    headingTitle: { default: "" },
    titleTag: { default: "h3" }
  },
  emits: ["toggleExpand"],
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = $e(), o = W(!1);
    return me(o, (s, u) => {
      s !== u && r(s);
    }), (s, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": s.id
    }, [
      c("div", wf, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": s.id,
          "aria-expanded": o.value,
          onClick: u[0] || (u[0] = J((d) => o.value = !o.value, ["prevent", "stop"]))
        }, v(s.buttonLabel), 9, _f),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: t,
          class: R(["fr-collapse", {
            "fr-collapse--expanded": O(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": O(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => O(l)(o.value))
        }, [
          (i(), V(ge(s.titleTag), { class: "fr-sidemenu__title" }, {
            default: X(() => [
              F(v(s.headingTitle), 1)
            ]),
            _: 1
          })),
          B(s.$slots, "default", {}, () => [
            ee($n, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: u[1] || (u[1] = (d) => s.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, xf)
      ])
    ], 8, kf));
  }
}), Tf = /* @__PURE__ */ S({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const t = a, e = w(() => typeof t.to == "string" && t.to.startsWith("http")), n = w(() => e.value ? "a" : "RouterLink"), r = w(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, o) => (i(), V(ge(n.value), Q({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: X(() => [
        B(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), If = { class: "fr-skiplinks" }, Ef = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Mf = { class: "fr-skiplinks__list" }, Cf = ["href", "onClick"], Pf = /* @__PURE__ */ S({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(a) {
    const t = (e) => {
      const n = document.getElementById(e);
      n == null || n.focus();
    };
    return (e, n) => (i(), f("div", If, [
      c("nav", Ef, [
        c("ul", Mf, [
          (i(!0), f(z, null, U(e.links, (r) => (i(), f("li", {
            key: r.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${r.id}`,
              onClick: (l) => t(r.id)
            }, v(r.text), 9, Cf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Lf = { class: "fr-stepper" }, Bf = { class: "fr-stepper__title" }, $f = { class: "fr-stepper__state" }, Af = ["data-fr-current-step", "data-fr-steps"], Sf = { class: "fr-stepper__details" }, Of = {
  key: 0,
  class: "fr-text--bold"
}, Rf = /* @__PURE__ */ S({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Lf, [
      c("h2", Bf, [
        F(v(t.steps[t.currentStep - 1]) + " ", 1),
        c("span", $f, "Étape " + v(t.currentStep) + " sur " + v(t.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, Af),
      c("p", Sf, [
        t.currentStep < t.steps.length ? (i(), f("span", Of, "Étape suivante :")) : b("", !0),
        F(" " + v(t.steps[t.currentStep]), 1)
      ])
    ]));
  }
}), Ff = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, Nf = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, Vf = { class: "fr-summary__list" }, jf = ["href"], qf = /* @__PURE__ */ S({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("nav", Ff, [
      c("h2", Nf, v(t.title), 1),
      c("ol", Vf, [
        (i(!0), f(z, null, U(t.anchors, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, v(n.name), 9, jf)
        ]))), 128))
      ])
    ]));
  }
}), Hf = ["id", "aria-labelledby", "tabindex"], Wf = /* @__PURE__ */ S({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(a) {
    Ya((u) => ({
      "7152af7e": o.value,
      "2a62e962": s.value
    }));
    const t = a, e = { true: "100%", false: "-100%" }, n = Qe(kt), { isVisible: r, asc: l } = n(ot(() => t.tabId)), o = w(() => e[String(l == null ? void 0 : l.value)]), s = w(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), V(cr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: X(() => [
        Be(c("div", {
          id: u.panelId,
          class: R(["fr-tabs__panel", {
            "fr-tabs__panel--selected": O(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: O(r) ? 0 : -1
        }, [
          B(u.$slots, "default", {}, void 0, !0)
        ], 10, Hf), [
          [fr, O(r)]
        ])
      ]),
      _: 3
    }));
  }
}), An = /* @__PURE__ */ ke(Wf, [["__scopeId", "data-v-5774b16c"]]), Yf = { role: "presentation" }, Qf = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Kf = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Sn = /* @__PURE__ */ S({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = W(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      ArrowDown: "next",
      ArrowUp: "previous",
      Home: "first",
      End: "last"
    };
    function o(d) {
      const p = d == null ? void 0 : d.key, m = l[p];
      m && n(m);
    }
    const s = Qe(kt), { isVisible: u } = s(ot(() => e.tabId));
    return (d, p) => (i(), f("li", Yf, [
      c("button", {
        id: d.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${d.tabId}`,
        class: "fr-tabs__tab",
        tabindex: O(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": O(u),
        "aria-controls": d.panelId,
        onClick: p[0] || (p[0] = J((m) => d.$emit("click", d.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (m) => o(m))
      }, [
        d.icon ? (i(), f("span", Kf, [
          ee(pe, { name: d.icon }, null, 8, ["name"])
        ])) : b("", !0),
        B(d.$slots, "default")
      ], 40, Qf)
    ]));
  }
}), On = /* @__PURE__ */ S({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", Q(r.headerAttrs, { scope: "col" }), [
      F(v(r.header) + " ", 1),
      r.icon && !e.value ? (i(), V(pe, De(Q({ key: 0 }, n.value)), null, 16)) : b("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: R({ [String(r.icon)]: e.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), zf = { key: 0 }, Rn = /* @__PURE__ */ S({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (t, e) => t.headers ? (i(), f("tr", zf, [
      (i(!0), f(z, null, U(t.headers, (n, r) => (i(), V(On, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), Fn = /* @__PURE__ */ S({
  __name: "DsfrTableCell",
  props: {
    field: {},
    cellAttrs: { default: () => ({}) },
    component: {},
    text: {},
    title: {},
    class: {},
    onClick: {}
  },
  setup(a) {
    const t = a, e = w(() => typeof t.field == "object" && t.field !== null && t.field.component ? t.field.component : !1), n = w(() => ["string", "number", "boolean"].includes(typeof t.field));
    return (r, l) => (i(), f("td", De(yt(r.cellAttrs)), [
      e.value ? (i(), V(ge(e.value), De(Q({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: X(() => [
          F(v(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(z, { key: 1 }, [
        F(v(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Nn = /* @__PURE__ */ S({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (t, e) => (i(), f("tr", De(yt(t.rowAttrs)), [
      B(t.$slots, "default"),
      (i(!0), f(z, null, U(t.rowData, (n, r) => (i(), V(Fn, {
        key: r,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Gf = { class: "caption" }, Xf = { key: 1 }, Uf = ["colspan"], Zf = { class: "flex justify-right" }, Jf = { class: "self-center" }, ep = ["for"], tp = ["id"], ap = ["value"], np = {
  class: "flex ml-1",
  "aria-live": "polite",
  "aria-atomic": "true"
}, rp = { class: "self-center fr-m-0" }, lp = { class: "flex ml-1" }, op = /* @__PURE__ */ S({
  __name: "DsfrTable",
  props: {
    title: {},
    headers: { default: () => [] },
    rows: { default: () => [] },
    rowKey: { type: [Function, String], default: void 0 },
    noCaption: { type: Boolean },
    pagination: { type: Boolean },
    currentPage: { default: 1 },
    resultsDisplayed: { default: 10 }
  },
  emits: ["update:currentPage"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = (D) => Array.isArray(D) ? D : D.rowData, l = W(e.currentPage), o = re("resultPerPage"), s = W(e.resultsDisplayed), u = w(
      () => e.rows.length > s.value ? Math.ceil(e.rows.length / s.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * s.value - s.value, m = () => l.value * s.value, k = w(() => e.pagination ? e.rows.slice(p(), m()) : e.rows), E = () => {
      l.value = 1, n("update:currentPage");
    }, _ = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, A = () => {
      l.value < u.value && (l.value += 1, n("update:currentPage"));
    }, y = () => {
      l.value = u.value, n("update:currentPage");
    };
    return (D, T) => (i(), f("div", {
      class: R(["fr-table", { "fr-table--no-caption": D.noCaption }])
    }, [
      c("table", null, [
        c("caption", Gf, v(D.title), 1),
        c("thead", null, [
          B(D.$slots, "header", {}, () => [
            D.headers && D.headers.length ? (i(), V(Rn, {
              key: 0,
              headers: D.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          B(D.$slots, "default", {}, void 0, !0),
          D.rows && D.rows.length ? (i(!0), f(z, { key: 0 }, U(k.value, (P, I) => (i(), V(Nn, {
            key: D.rowKey && r(P) ? typeof D.rowKey == "string" ? r(P)[D.headers.indexOf(D.rowKey)].toString() : D.rowKey(r(P)) : I,
            "row-data": r(P),
            "row-attrs": "rowAttrs" in P ? P.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : b("", !0),
          D.pagination ? (i(), f("tr", Xf, [
            c("td", {
              colspan: D.headers.length
            }, [
              c("div", Zf, [
                c("div", Jf, [
                  c("label", { for: O(o) }, "Résultats par page : ", 8, ep),
                  Be(c("select", {
                    id: O(o),
                    "onUpdate:modelValue": T[0] || (T[0] = (P) => s.value = P),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: T[1] || (T[1] = (P) => n("update:currentPage"))
                  }, [
                    (i(), f(z, null, U(d, (P, I) => c("option", {
                      key: I,
                      value: P
                    }, v(P), 9, ap)), 64))
                  ], 40, tp), [
                    [zt, s.value]
                  ])
                ]),
                c("div", np, [
                  c("p", rp, " Page " + v(l.value) + " sur " + v(u.value), 1)
                ]),
                c("div", lp, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: T[2] || (T[2] = (P) => E())
                  }, T[6] || (T[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: T[3] || (T[3] = (P) => _())
                  }, T[7] || (T[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (P) => A())
                  }, T[8] || (T[8] = [
                    c("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: T[5] || (T[5] = (P) => y())
                  }, T[9] || (T[9] = [
                    c("span", { class: "fr-sr-only" }, "Dernière page du tableau", -1)
                  ]))
                ])
              ])
            ], 8, Uf)
          ])) : b("", !0)
        ])
      ])
    ], 2));
  }
}), sp = /* @__PURE__ */ ke(op, [["__scopeId", "data-v-b22b8019"]]), ip = ["aria-label"], up = /* @__PURE__ */ S({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = W(!1), o = w({
      get: () => n.modelValue,
      set(I) {
        r("update:modelValue", I);
      }
    }), s = W(/* @__PURE__ */ new Map()), u = W(0);
    Oe(kt, (I) => {
      const M = W(!0);
      if (me(o, (g, H) => {
        M.value = g > H;
      }), [...s.value.values()].includes(I.value))
        return { isVisible: w(() => s.value.get(o.value) === I.value), asc: M };
      const h = u.value++;
      s.value.set(h, I.value);
      const x = w(() => h === o.value);
      return me(I, () => {
        s.value.set(h, I.value);
      }), Te(() => {
        s.value.delete(h);
      }), { isVisible: x };
    });
    const d = W(null), p = W(null), m = ir({}), k = (I) => {
      if (m[I])
        return m[I];
      const M = re("tab");
      return m[I] = M, M;
    }, E = async () => {
      const I = o.value === 0 ? n.tabTitles.length - 1 : o.value - 1;
      l.value = !1, o.value = I;
    }, _ = async () => {
      const I = o.value === n.tabTitles.length - 1 ? 0 : o.value + 1;
      l.value = !0, o.value = I;
    }, A = async () => {
      o.value = 0;
    }, y = async () => {
      o.value = n.tabTitles.length - 1;
    }, D = W({ "--tabs-height": "100px" }), T = () => {
      var I;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const M = p.value.offsetHeight, h = (I = d.value) == null ? void 0 : I.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!h || !h.offsetHeight)
        return;
      const x = h.offsetHeight;
      D.value["--tabs-height"] = `${M + x}px`;
    }, P = W(null);
    return be(() => {
      var I;
      window.ResizeObserver && (P.value = new window.ResizeObserver(() => {
        T();
      })), (I = d.value) == null || I.querySelectorAll(".fr-tabs__panel").forEach((M) => {
        var h;
        M && ((h = P.value) == null || h.observe(M));
      });
    }), Te(() => {
      var I;
      (I = d.value) == null || I.querySelectorAll(".fr-tabs__panel").forEach((M) => {
        var h;
        M && ((h = P.value) == null || h.unobserve(M));
      });
    }), t({
      renderTabs: T,
      selectFirst: A,
      selectLast: y
    }), (I, M) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: xe(D.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": I.tabListName
      }, [
        B(I.$slots, "tab-items", {}, () => [
          (i(!0), f(z, null, U(I.tabTitles, (h, x) => (i(), V(Sn, {
            key: x,
            icon: h.icon,
            "panel-id": h.panelId || `${k(x)}-panel`,
            "tab-id": h.tabId || k(x),
            onClick: (g) => o.value = x,
            onNext: M[0] || (M[0] = (g) => _()),
            onPrevious: M[1] || (M[1] = (g) => E()),
            onFirst: M[2] || (M[2] = (g) => A()),
            onLast: M[3] || (M[3] = (g) => y())
          }, {
            default: X(() => [
              F(v(h.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, ip),
      (i(!0), f(z, null, U(I.tabContents, (h, x) => {
        var g, H, q, C;
        return i(), V(An, {
          key: x,
          "panel-id": ((H = (g = I.tabTitles) == null ? void 0 : g[x]) == null ? void 0 : H.panelId) || `${k(x)}-panel`,
          "tab-id": ((C = (q = I.tabTitles) == null ? void 0 : q[x]) == null ? void 0 : C.tabId) || k(x)
        }, {
          default: X(() => [
            F(v(h), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      B(I.$slots, "default")
    ], 4));
  }
}), dp = /* @__PURE__ */ S({
  __name: "DsfrTag",
  props: {
    label: { default: void 0 },
    link: { default: void 0 },
    tagName: { default: "p" },
    icon: { default: void 0 },
    disabled: { type: Boolean },
    small: { type: Boolean },
    iconOnly: { type: Boolean }
  },
  setup(a) {
    const t = a, e = w(() => typeof t.link == "string" && t.link.startsWith("http")), n = w(() => t.link ? e.value ? "a" : "RouterLink" : t.disabled && t.tagName === "p" ? "button" : t.tagName), r = w(() => ({ [e.value ? "href" : "to"]: t.link })), l = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), o = t.small ? 0.65 : 0.9, s = w(() => l.value ? void 0 : typeof t.icon == "string" ? { name: t.icon, scale: o } : { scale: o, ...t.icon ?? {} });
    return (u, d) => (i(), V(ge(n.value), Q({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: l.value,
        "fr-tag--icon-left": l.value
      }],
      disabled: u.disabled
    }, r.value), {
      default: X(() => [
        t.icon && !l.value ? (i(), V(pe, Q({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : b("", !0),
        u.iconOnly ? b("", !0) : (i(), f(z, { key: 1 }, [
          F(v(u.label), 1)
        ], 64)),
        B(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), la = /* @__PURE__ */ ke(dp, [["__scopeId", "data-v-bdaecd28"]]), cp = { class: "fr-tags-group" }, fp = /* @__PURE__ */ S({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("ul", cp, [
      (i(!0), f(z, null, U(t.tags, ({ icon: n, label: r, ...l }, o) => (i(), f("li", { key: o }, [
        ee(la, Q({ ref_for: !0 }, l, {
          icon: n,
          label: r
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), pp = { class: "fr-tile__body" }, mp = { class: "fr-tile__content" }, hp = ["download", "href"], vp = {
  key: 0,
  class: "fr-tile__desc"
}, gp = {
  key: 1,
  class: "fr-tile__detail"
}, bp = {
  key: 2,
  class: "fr-tile__start"
}, yp = { class: "fr-tile__header" }, kp = {
  key: 0,
  class: "fr-tile__pictogram"
}, wp = ["src"], _p = ["href"], xp = ["href"], Dp = ["href"], Tp = /* @__PURE__ */ S({
  __name: "DsfrTile",
  props: {
    title: { default: "Titre de la tuile" },
    imgSrc: { default: void 0 },
    svgPath: { default: void 0 },
    svgAttrs: { default: () => ({ viewBox: "0 0 80 80", width: "80px", height: "80px" }) },
    description: { default: void 0 },
    details: { default: void 0 },
    disabled: { type: Boolean },
    horizontal: { type: Boolean, default: !1 },
    vertical: { default: void 0 },
    to: { default: "#" },
    titleTag: { default: "h3" },
    download: { type: Boolean },
    small: { type: Boolean },
    icon: { type: Boolean, default: !0 },
    noBorder: { type: Boolean },
    shadow: { type: Boolean },
    noBackground: { type: Boolean },
    grey: { type: Boolean },
    enlarge: { type: Boolean }
  },
  setup(a) {
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = w(() => typeof t.to == "string" && t.to.startsWith("http"));
    return (r, l) => {
      const o = _e("RouterLink");
      return i(), f("div", {
        class: R(["fr-tile fr-enlarge-link", [{
          "fr-tile--disabled": r.disabled,
          "fr-tile--sm": r.small === !0,
          "fr-tile--horizontal": r.horizontal === !0,
          "fr-tile--vertical": r.horizontal === !1 || r.vertical === "md" || r.vertical === "lg",
          "fr-tile--vertical@md": r.vertical === "md",
          "fr-tile--vertical@lg": r.vertical === "lg",
          "fr-tile--download": r.download,
          "fr-tile--no-icon": r.icon === !1,
          "fr-tile--no-border": r.noBorder,
          "fr-tile--no-background": r.noBackground,
          "fr-tile--shadow": r.shadow,
          "fr-tile--grey": r.grey,
          "fr-enlarge-button": r.enlarge
        }]])
      }, [
        c("div", pp, [
          c("div", mp, [
            (i(), V(ge(r.titleTag), { class: "fr-tile__title" }, {
              default: X(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, v(r.title), 9, hp)) : b("", !0),
                n.value ? b("", !0) : (i(), V(o, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: X(() => [
                    F(v(r.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            r.description ? (i(), f("p", vp, v(r.description), 1)) : b("", !0),
            r.details ? (i(), f("p", gp, v(r.details), 1)) : b("", !0),
            r.$slots["start-details"] ? (i(), f("div", bp, [
              B(r.$slots, "start-details", {}, void 0, !0)
            ])) : b("", !0)
          ])
        ]),
        c("div", yp, [
          B(r.$slots, "header", {}, void 0, !0),
          r.imgSrc || r.svgPath ? (i(), f("div", kp, [
            r.imgSrc ? (i(), f("img", {
              key: 0,
              src: r.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, wp)) : (i(), f("svg", Q({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...e, ...r.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${r.svgPath}#artwork-decorative`
              }, null, 8, _p),
              c("use", {
                class: "fr-artwork-minor",
                href: `${r.svgPath}#artwork-minor`
              }, null, 8, xp),
              c("use", {
                class: "fr-artwork-major",
                href: `${r.svgPath}#artwork-major`
              }, null, 8, Dp)
            ], 16))
          ])) : b("", !0)
        ])
      ], 2);
    };
  }
}), Vn = /* @__PURE__ */ ke(Tp, [["__scopeId", "data-v-f4d836a2"]]), Ip = { class: "fr-grid-row fr-grid-row--gutters" }, Ep = /* @__PURE__ */ S({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ip, [
      (i(!0), f(z, null, U(t.tiles, (n, r) => (i(), f("div", {
        key: r,
        class: R({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        ee(Vn, Q({
          horizontal: t.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Mp = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Cp = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Pp = ["id"], Lp = /* @__PURE__ */ S({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => re("toggle") },
    hint: { default: "" },
    label: { default: "" },
    disabled: { type: Boolean },
    labelLeft: { type: Boolean, default: !1 },
    borderBottom: { type: Boolean, default: !1 },
    activeText: { default: "Activé" },
    inactiveText: { default: "Désactivé" },
    noText: { type: Boolean, default: !1 },
    name: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = w(() => `${t.inputId}-hint-text`);
    return (n, r) => (i(), f("div", {
      class: R(["fr-toggle", {
        "fr-toggle--label-left": n.labelLeft,
        "fr-toggle--border-bottom": n.borderBottom
      }])
    }, [
      c("input", {
        id: n.inputId,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        type: "checkbox",
        checked: n.modelValue,
        "data-testid": n.inputId,
        class: "fr-toggle__input",
        "aria-describedby": e.value,
        name: n.name,
        onInput: r[0] || (r[0] = (l) => n.$emit("update:modelValue", l.target.checked))
      }, null, 40, Mp),
      c("label", {
        id: e.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, v(n.label), 9, Cp),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, v(n.hint), 9, Pp)) : b("", !0)
    ], 2));
  }
}), Bp = ["id"], $p = /* @__PURE__ */ S({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => re("tooltip") }
  },
  setup(a) {
    const t = a, e = W(!1), n = W(null), r = W(null), l = W("0px"), o = W("0px"), s = W("0px"), u = W(!1), d = W(0);
    async function p() {
      var T, P, I, M, h, x;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((te) => setTimeout(te, 100));
      const g = (T = n.value) == null ? void 0 : T.getBoundingClientRect().top, H = (P = n.value) == null ? void 0 : P.offsetHeight, q = (I = n.value) == null ? void 0 : I.offsetWidth, C = (M = n.value) == null ? void 0 : M.getBoundingClientRect().left, $ = (h = r.value) == null ? void 0 : h.offsetHeight, L = (x = r.value) == null ? void 0 : x.offsetWidth, j = !(g - $ < 0) && g + H + $ >= document.documentElement.offsetHeight;
      u.value = j;
      const K = C + q >= document.documentElement.offsetWidth, ne = C + q / 2 - L / 2 <= 0;
      o.value = j ? `${g - $ + 8}px` : `${g + H - 8}px`, d.value = 1, l.value = K ? `${C + q - L - 4}px` : ne ? `${C + 4}px` : `${C + q / 2 - L / 2}px`, s.value = K ? `${L / 2 - q / 2 + 4}px` : ne ? `${-(L / 2) + q / 2 - 4}px` : "0px";
    }
    me(e, p, { immediate: !0 }), be(() => {
      window.addEventListener("scroll", p);
    }), Te(() => {
      window.removeEventListener("scroll", p);
    });
    const m = w(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), k = w(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), E = (T) => {
      var P, I;
      e.value && (T.target === n.value || (P = n.value) != null && P.contains(T.target) || T.target === r.value || (I = r.value) != null && I.contains(T.target) || (e.value = !1));
    }, _ = (T) => {
      T.key === "Escape" && (e.value = !1);
    };
    be(() => {
      document.documentElement.addEventListener("click", E), document.documentElement.addEventListener("keydown", _);
    }), Te(() => {
      document.documentElement.removeEventListener("click", E), document.documentElement.removeEventListener("keydown", _);
    });
    const A = () => {
      t.onHover && (e.value = !0);
    }, y = () => {
      t.onHover && (e.value = !1);
    }, D = () => {
      t.onHover || (e.value = !e.value);
    };
    return (T, P) => (i(), f(z, null, [
      (i(), V(ge(T.onHover ? "a" : "button"), Q(T.$attrs, {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: n,
        class: T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: P[0] || (P[0] = J((I) => D(), ["stop"])),
        onMouseenter: P[1] || (P[1] = (I) => A()),
        onMouseleave: P[2] || (P[2] = (I) => y()),
        onFocus: P[3] || (P[3] = (I) => A()),
        onBlur: P[4] || (P[4] = (I) => y())
      }), {
        default: X(() => [
          B(T.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: T.id,
        ref_key: "tooltip",
        ref: r,
        class: R(["fr-tooltip fr-placement", k.value]),
        style: xe(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, v(T.content), 15, Bp)
    ], 64));
  }
}), Ap = /* @__PURE__ */ ke($p, [["__scopeId", "data-v-d1e31d94"]]), Sp = { class: "fr-transcription" }, Op = ["aria-expanded", "aria-controls"], Rp = ["id"], Fp = ["id", "aria-labelledby"], Np = { class: "fr-container fr-container--fluid fr-container-md" }, Vp = { class: "fr-grid-row fr-grid-row--center" }, jp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, qp = { class: "fr-modal__body" }, Hp = { class: "fr-modal__header" }, Wp = ["aria-controls"], Yp = { class: "fr-modal__content" }, Qp = ["id"], Kp = { class: "fr-transcription__footer" }, zp = { class: "fr-transcription__actions-group" }, Gp = ["aria-controls"], jn = /* @__PURE__ */ S({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => re("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: o
    } = $e(), s = W(!1), u = W(!1), d = w(() => `fr-transcription__modal-${t.id}`), p = w(() => `fr-transcription__collapse-${t.id}`);
    return me(u, (m, k) => {
      m !== k && l(m);
    }), (m, k) => (i(), f("div", Sp, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: k[0] || (k[0] = (E) => u.value = !u.value)
      }, " Transcription ", 8, Op),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse", { "fr-collapse--expanded": O(r), "fr-collapsing": O(n) }]),
        onTransitionend: k[2] || (k[2] = (E) => O(o)(u.value))
      }, [
        c("dialog", {
          id: d.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${d.value}-title`
        }, [
          c("div", Np, [
            c("div", Vp, [
              c("div", jp, [
                c("div", qp, [
                  c("div", Hp, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": d.value,
                      title: "Fermer"
                    }, " Fermer ", 8, Wp)
                  ]),
                  c("div", Yp, [
                    c("h1", {
                      id: `${d.value}-title`,
                      class: "fr-modal__title"
                    }, v(m.title), 9, Qp),
                    F(" " + v(m.content), 1)
                  ]),
                  c("div", Kp, [
                    c("div", zp, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: k[1] || (k[1] = (E) => s.value = !0)
                      }, " Agrandir ", 8, Gp)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, Fp)
      ], 42, Rp),
      (i(), V(ur, { to: "body" }, [
        ee(xn, {
          title: m.title,
          opened: s.value,
          onClose: k[3] || (k[3] = (E) => s.value = !1)
        }, {
          default: X(() => [
            B(m.$slots, "default", {}, () => [
              F(v(m.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Xp = ["src"], Up = { class: "fr-content-media__caption" }, Zp = /* @__PURE__ */ S({
  __name: "DsfrVideo",
  props: {
    src: {},
    legend: { default: "" },
    size: { default: "medium" },
    transcriptionTitle: { default: "" },
    transcriptionContent: { default: "" },
    ratio: { default: "16x9" }
  },
  setup(a) {
    return (t, e) => (i(), f(z, null, [
      c("figure", {
        class: R(["fr-content-media", {
          "fr-content-media--sm": t.size === "small",
          "fr-content-media--lg": t.size === "large"
        }])
      }, [
        c("div", {
          class: R(["fr-responsive-vid", `fr-ratio-${t.ratio}`])
        }, [
          c("iframe", {
            src: t.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Xp)
        ], 2),
        c("div", Up, v(t.legend), 1)
      ], 2),
      ee(jn, {
        title: t.transcriptionTitle,
        content: t.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Jp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: wr,
  DsfrAccordionsGroup: xr,
  DsfrAlert: Ir,
  DsfrBackToTop: Er,
  DsfrBadge: Ka,
  DsfrBreadcrumb: Ar,
  DsfrButton: qe,
  DsfrButtonGroup: Dt,
  DsfrCallout: Kl,
  DsfrCard: so,
  DsfrCardDetail: Vt,
  DsfrCheckbox: Tt,
  DsfrCheckboxSet: yo,
  DsfrConsent: xo,
  DsfrDataTable: ls,
  DsfrErrorPage: ps,
  DsfrFieldset: cn,
  DsfrFileDownload: fn,
  DsfrFileDownloadList: _s,
  DsfrFileUpload: Cs,
  DsfrFollow: Xs,
  DsfrFooter: Ii,
  DsfrFooterLink: hn,
  DsfrFooterLinkList: Pi,
  DsfrFooterPartners: vn,
  DsfrFranceConnect: Ai,
  DsfrHeader: ku,
  DsfrHeaderMenuLink: ra,
  DsfrHeaderMenuLinks: jt,
  DsfrHighlight: wu,
  DsfrInput: It,
  DsfrInputGroup: Eu,
  DsfrLanguageSelector: nt,
  DsfrLogo: at,
  DsfrModal: xn,
  DsfrMultiselect: Cd,
  DsfrNavigation: Ud,
  DsfrNavigationItem: Dn,
  DsfrNavigationMegaMenu: In,
  DsfrNavigationMegaMenuCategory: Tn,
  DsfrNavigationMenu: Mn,
  DsfrNavigationMenuItem: En,
  DsfrNavigationMenuLink: Et,
  DsfrNewsLetter: pn,
  DsfrNotice: ac,
  DsfrPagination: na,
  DsfrPicture: sc,
  DsfrQuote: hc,
  DsfrRadioButton: Cn,
  DsfrRadioButtonSet: Bc,
  DsfrRange: Hc,
  DsfrSearchBar: rt,
  DsfrSegmented: Pn,
  DsfrSegmentedSet: Jc,
  DsfrSelect: sf,
  DsfrShare: vf,
  DsfrSideMenu: Df,
  DsfrSideMenuButton: Ln,
  DsfrSideMenuLink: Tf,
  DsfrSideMenuList: $n,
  DsfrSideMenuListItem: Bn,
  DsfrSkipLinks: Pf,
  DsfrSocialNetworks: mn,
  DsfrStepper: Rf,
  DsfrSummary: qf,
  DsfrTabContent: An,
  DsfrTabItem: Sn,
  DsfrTable: sp,
  DsfrTableCell: Fn,
  DsfrTableHeader: On,
  DsfrTableHeaders: Rn,
  DsfrTableRow: Nn,
  DsfrTabs: up,
  DsfrTag: la,
  DsfrTags: fp,
  DsfrTile: Vn,
  DsfrTiles: Ep,
  DsfrToggleSwitch: Lp,
  DsfrTooltip: Ap,
  DsfrTranscription: jn,
  DsfrVideo: Zp,
  VIcon: pe,
  registerAccordionKey: Gt,
  registerNavigationLinkKey: Xt,
  registerTabKey: kt
}, Symbol.toStringTag, { value: "Module" })), em = {
  install: (a, { components: t } = {}) => {
    Object.entries(Jp).forEach(([e, n]) => {
      (t === void 0 || t === "all" || t.map(({ name: r }) => r).includes(e)) && a.component(e, n);
    }), a.component("VIcon", pe);
  }
}, qn = 6048e5, tm = 864e5, am = 6e4, nm = 36e5, rm = 1e3, Oa = Symbol.for("constructDateFrom");
function ye(a, t) {
  return typeof a == "function" ? a(t) : a && typeof a == "object" && Oa in a ? a[Oa](t) : a instanceof Date ? new a.constructor(t) : new Date(t);
}
function he(a, t) {
  return ye(t || a, a);
}
function Hn(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in);
  return isNaN(t) ? ye((e == null ? void 0 : e.in) || a, NaN) : (t && n.setDate(n.getDate() + t), n);
}
let lm = {};
function ze() {
  return lm;
}
function Re(a, t) {
  var s, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = he(a, t == null ? void 0 : t.in), l = r.getDay(), o = (l < n ? 7 : 0) + l - n;
  return r.setDate(r.getDate() - o), r.setHours(0, 0, 0, 0), r;
}
function Ke(a, t) {
  return Re(a, { ...t, weekStartsOn: 1 });
}
function Wn(a, t) {
  const e = he(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ye(e, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Ke(r), o = ye(e, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Ke(o);
  return e.getTime() >= l.getTime() ? n + 1 : e.getTime() >= s.getTime() ? n : n - 1;
}
function gt(a) {
  const t = he(a), e = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return e.setUTCFullYear(t.getFullYear()), +a - +e;
}
function om(a, ...t) {
  const e = ye.bind(
    null,
    t.find((n) => typeof n == "object")
  );
  return t.map(e);
}
function Ra(a, t) {
  const e = he(a, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function sm(a, t, e) {
  const [n, r] = om(
    e == null ? void 0 : e.in,
    a,
    t
  ), l = Ra(n), o = Ra(r), s = +l - gt(l), u = +o - gt(o);
  return Math.round((s - u) / tm);
}
function im(a, t) {
  const e = Wn(a, t), n = ye(a, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Ke(n);
}
function um(a) {
  return a instanceof Date || typeof a == "object" && Object.prototype.toString.call(a) === "[object Date]";
}
function dm(a) {
  return !(!um(a) && typeof a != "number" || isNaN(+he(a)));
}
function cm(a, t) {
  const e = he(a, t == null ? void 0 : t.in);
  return e.setFullYear(e.getFullYear(), 0, 1), e.setHours(0, 0, 0, 0), e;
}
const fm = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, pm = (a, t, e) => {
  let n;
  const r = fm[a];
  return typeof r == "string" ? n = r : t === 1 ? n = r.one : n = r.other.replace("{{count}}", t.toString()), e != null && e.addSuffix ? e.comparison && e.comparison > 0 ? "in " + n : n + " ago" : n;
};
function Lt(a) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : a.defaultWidth;
    return a.formats[e] || a.formats[a.defaultWidth];
  };
}
const mm = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, hm = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, vm = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, gm = {
  date: Lt({
    formats: mm,
    defaultWidth: "full"
  }),
  time: Lt({
    formats: hm,
    defaultWidth: "full"
  }),
  dateTime: Lt({
    formats: vm,
    defaultWidth: "full"
  })
}, bm = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ym = (a, t, e, n) => bm[a];
function Ue(a) {
  return (t, e) => {
    const n = e != null && e.context ? String(e.context) : "standalone";
    let r;
    if (n === "formatting" && a.formattingValues) {
      const o = a.defaultFormattingWidth || a.defaultWidth, s = e != null && e.width ? String(e.width) : o;
      r = a.formattingValues[s] || a.formattingValues[o];
    } else {
      const o = a.defaultWidth, s = e != null && e.width ? String(e.width) : a.defaultWidth;
      r = a.values[s] || a.values[o];
    }
    const l = a.argumentCallback ? a.argumentCallback(t) : t;
    return r[l];
  };
}
const km = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, wm = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, _m = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, xm = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Dm = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Tm = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Im = (a, t) => {
  const e = Number(a), n = e % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return e + "st";
      case 2:
        return e + "nd";
      case 3:
        return e + "rd";
    }
  return e + "th";
}, Em = {
  ordinalNumber: Im,
  era: Ue({
    values: km,
    defaultWidth: "wide"
  }),
  quarter: Ue({
    values: wm,
    defaultWidth: "wide",
    argumentCallback: (a) => a - 1
  }),
  month: Ue({
    values: _m,
    defaultWidth: "wide"
  }),
  day: Ue({
    values: xm,
    defaultWidth: "wide"
  }),
  dayPeriod: Ue({
    values: Dm,
    defaultWidth: "wide",
    formattingValues: Tm,
    defaultFormattingWidth: "wide"
  })
};
function Ze(a) {
  return (t, e = {}) => {
    const n = e.width, r = n && a.matchPatterns[n] || a.matchPatterns[a.defaultMatchWidth], l = t.match(r);
    if (!l)
      return null;
    const o = l[0], s = n && a.parsePatterns[n] || a.parsePatterns[a.defaultParseWidth], u = Array.isArray(s) ? Cm(s, (m) => m.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      Mm(s, (m) => m.test(o))
    );
    let d;
    d = a.valueCallback ? a.valueCallback(u) : u, d = e.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      e.valueCallback(d)
    ) : d;
    const p = t.slice(o.length);
    return { value: d, rest: p };
  };
}
function Mm(a, t) {
  for (const e in a)
    if (Object.prototype.hasOwnProperty.call(a, e) && t(a[e]))
      return e;
}
function Cm(a, t) {
  for (let e = 0; e < a.length; e++)
    if (t(a[e]))
      return e;
}
function Pm(a) {
  return (t, e = {}) => {
    const n = t.match(a.matchPattern);
    if (!n) return null;
    const r = n[0], l = t.match(a.parsePattern);
    if (!l) return null;
    let o = a.valueCallback ? a.valueCallback(l[0]) : l[0];
    o = e.valueCallback ? e.valueCallback(o) : o;
    const s = t.slice(r.length);
    return { value: o, rest: s };
  };
}
const Lm = /^(\d+)(th|st|nd|rd)?/i, Bm = /\d+/i, $m = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Am = {
  any: [/^b/i, /^(a|c)/i]
}, Sm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Om = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Rm = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Fm = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Nm = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Vm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, jm = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, qm = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Hm = {
  ordinalNumber: Pm({
    matchPattern: Lm,
    parsePattern: Bm,
    valueCallback: (a) => parseInt(a, 10)
  }),
  era: Ze({
    matchPatterns: $m,
    defaultMatchWidth: "wide",
    parsePatterns: Am,
    defaultParseWidth: "any"
  }),
  quarter: Ze({
    matchPatterns: Sm,
    defaultMatchWidth: "wide",
    parsePatterns: Om,
    defaultParseWidth: "any",
    valueCallback: (a) => a + 1
  }),
  month: Ze({
    matchPatterns: Rm,
    defaultMatchWidth: "wide",
    parsePatterns: Fm,
    defaultParseWidth: "any"
  }),
  day: Ze({
    matchPatterns: Nm,
    defaultMatchWidth: "wide",
    parsePatterns: Vm,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ze({
    matchPatterns: jm,
    defaultMatchWidth: "any",
    parsePatterns: qm,
    defaultParseWidth: "any"
  })
}, Yn = {
  code: "en-US",
  formatDistance: pm,
  formatLong: gm,
  formatRelative: ym,
  localize: Em,
  match: Hm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Wm(a, t) {
  const e = he(a, t == null ? void 0 : t.in);
  return sm(e, cm(e)) + 1;
}
function Qn(a, t) {
  const e = he(a, t == null ? void 0 : t.in), n = +Ke(e) - +im(e);
  return Math.round(n / qn) + 1;
}
function oa(a, t) {
  var p, m, k, E;
  const e = he(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((m = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((E = (k = r.locale) == null ? void 0 : k.options) == null ? void 0 : E.firstWeekContainsDate) ?? 1, o = ye((t == null ? void 0 : t.in) || a, 0);
  o.setFullYear(n + 1, 0, l), o.setHours(0, 0, 0, 0);
  const s = Re(o, t), u = ye((t == null ? void 0 : t.in) || a, 0);
  u.setFullYear(n, 0, l), u.setHours(0, 0, 0, 0);
  const d = Re(u, t);
  return +e >= +s ? n + 1 : +e >= +d ? n : n - 1;
}
function Ym(a, t) {
  var s, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : u.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = oa(a, t), l = ye((t == null ? void 0 : t.in) || a, 0);
  return l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0), Re(l, t);
}
function Kn(a, t) {
  const e = he(a, t == null ? void 0 : t.in), n = +Re(e, t) - +Ym(e, t);
  return Math.round(n / qn) + 1;
}
function oe(a, t) {
  const e = a < 0 ? "-" : "", n = Math.abs(a).toString().padStart(t, "0");
  return e + n;
}
const Se = {
  // Year
  y(a, t) {
    const e = a.getFullYear(), n = e > 0 ? e : 1 - e;
    return oe(t === "yy" ? n % 100 : n, t.length);
  },
  // Month
  M(a, t) {
    const e = a.getMonth();
    return t === "M" ? String(e + 1) : oe(e + 1, 2);
  },
  // Day of the month
  d(a, t) {
    return oe(a.getDate(), t.length);
  },
  // AM or PM
  a(a, t) {
    const e = a.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return e.toUpperCase();
      case "aaa":
        return e;
      case "aaaaa":
        return e[0];
      case "aaaa":
      default:
        return e === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(a, t) {
    return oe(a.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(a, t) {
    return oe(a.getHours(), t.length);
  },
  // Minute
  m(a, t) {
    return oe(a.getMinutes(), t.length);
  },
  // Second
  s(a, t) {
    return oe(a.getSeconds(), t.length);
  },
  // Fraction of second
  S(a, t) {
    const e = t.length, n = a.getMilliseconds(), r = Math.trunc(
      n * Math.pow(10, e - 3)
    );
    return oe(r, t.length);
  }
}, Ye = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Fa = {
  // Era
  G: function(a, t, e) {
    const n = a.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return e.era(n, { width: "abbreviated" });
      case "GGGGG":
        return e.era(n, { width: "narrow" });
      case "GGGG":
      default:
        return e.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(a, t, e) {
    if (t === "yo") {
      const n = a.getFullYear(), r = n > 0 ? n : 1 - n;
      return e.ordinalNumber(r, { unit: "year" });
    }
    return Se.y(a, t);
  },
  // Local week-numbering year
  Y: function(a, t, e, n) {
    const r = oa(a, n), l = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const o = l % 100;
      return oe(o, 2);
    }
    return t === "Yo" ? e.ordinalNumber(l, { unit: "year" }) : oe(l, t.length);
  },
  // ISO week-numbering year
  R: function(a, t) {
    const e = Wn(a);
    return oe(e, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(a, t) {
    const e = a.getFullYear();
    return oe(e, t.length);
  },
  // Quarter
  Q: function(a, t, e) {
    const n = Math.ceil((a.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(n);
      case "QQ":
        return oe(n, 2);
      case "Qo":
        return e.ordinalNumber(n, { unit: "quarter" });
      case "QQQ":
        return e.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return e.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return e.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(a, t, e) {
    const n = Math.ceil((a.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(n);
      case "qq":
        return oe(n, 2);
      case "qo":
        return e.ordinalNumber(n, { unit: "quarter" });
      case "qqq":
        return e.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return e.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return e.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(a, t, e) {
    const n = a.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Se.M(a, t);
      case "Mo":
        return e.ordinalNumber(n + 1, { unit: "month" });
      case "MMM":
        return e.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return e.month(n, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return e.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(a, t, e) {
    const n = a.getMonth();
    switch (t) {
      case "L":
        return String(n + 1);
      case "LL":
        return oe(n + 1, 2);
      case "Lo":
        return e.ordinalNumber(n + 1, { unit: "month" });
      case "LLL":
        return e.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return e.month(n, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return e.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(a, t, e, n) {
    const r = Kn(a, n);
    return t === "wo" ? e.ordinalNumber(r, { unit: "week" }) : oe(r, t.length);
  },
  // ISO week of year
  I: function(a, t, e) {
    const n = Qn(a);
    return t === "Io" ? e.ordinalNumber(n, { unit: "week" }) : oe(n, t.length);
  },
  // Day of the month
  d: function(a, t, e) {
    return t === "do" ? e.ordinalNumber(a.getDate(), { unit: "date" }) : Se.d(a, t);
  },
  // Day of year
  D: function(a, t, e) {
    const n = Wm(a);
    return t === "Do" ? e.ordinalNumber(n, { unit: "dayOfYear" }) : oe(n, t.length);
  },
  // Day of week
  E: function(a, t, e) {
    const n = a.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return e.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return e.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return e.day(n, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return e.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(a, t, e, n) {
    const r = a.getDay(), l = (r - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(l);
      case "ee":
        return oe(l, 2);
      case "eo":
        return e.ordinalNumber(l, { unit: "day" });
      case "eee":
        return e.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return e.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return e.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return e.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(a, t, e, n) {
    const r = a.getDay(), l = (r - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(l);
      case "cc":
        return oe(l, t.length);
      case "co":
        return e.ordinalNumber(l, { unit: "day" });
      case "ccc":
        return e.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return e.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return e.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return e.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(a, t, e) {
    const n = a.getDay(), r = n === 0 ? 7 : n;
    switch (t) {
      case "i":
        return String(r);
      case "ii":
        return oe(r, t.length);
      case "io":
        return e.ordinalNumber(r, { unit: "day" });
      case "iii":
        return e.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return e.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return e.day(n, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return e.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(a, t, e) {
    const r = a.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return e.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return e.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(a, t, e) {
    const n = a.getHours();
    let r;
    switch (n === 12 ? r = Ye.noon : n === 0 ? r = Ye.midnight : r = n / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return e.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return e.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(a, t, e) {
    const n = a.getHours();
    let r;
    switch (n >= 17 ? r = Ye.evening : n >= 12 ? r = Ye.afternoon : n >= 4 ? r = Ye.morning : r = Ye.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return e.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return e.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(a, t, e) {
    if (t === "ho") {
      let n = a.getHours() % 12;
      return n === 0 && (n = 12), e.ordinalNumber(n, { unit: "hour" });
    }
    return Se.h(a, t);
  },
  // Hour [0-23]
  H: function(a, t, e) {
    return t === "Ho" ? e.ordinalNumber(a.getHours(), { unit: "hour" }) : Se.H(a, t);
  },
  // Hour [0-11]
  K: function(a, t, e) {
    const n = a.getHours() % 12;
    return t === "Ko" ? e.ordinalNumber(n, { unit: "hour" }) : oe(n, t.length);
  },
  // Hour [1-24]
  k: function(a, t, e) {
    let n = a.getHours();
    return n === 0 && (n = 24), t === "ko" ? e.ordinalNumber(n, { unit: "hour" }) : oe(n, t.length);
  },
  // Minute
  m: function(a, t, e) {
    return t === "mo" ? e.ordinalNumber(a.getMinutes(), { unit: "minute" }) : Se.m(a, t);
  },
  // Second
  s: function(a, t, e) {
    return t === "so" ? e.ordinalNumber(a.getSeconds(), { unit: "second" }) : Se.s(a, t);
  },
  // Fraction of second
  S: function(a, t) {
    return Se.S(a, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(a, t, e) {
    const n = a.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (t) {
      case "X":
        return Va(n);
      case "XXXX":
      case "XX":
        return Ne(n);
      case "XXXXX":
      case "XXX":
      default:
        return Ne(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(a, t, e) {
    const n = a.getTimezoneOffset();
    switch (t) {
      case "x":
        return Va(n);
      case "xxxx":
      case "xx":
        return Ne(n);
      case "xxxxx":
      case "xxx":
      default:
        return Ne(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(a, t, e) {
    const n = a.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Na(n, ":");
      case "OOOO":
      default:
        return "GMT" + Ne(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(a, t, e) {
    const n = a.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Na(n, ":");
      case "zzzz":
      default:
        return "GMT" + Ne(n, ":");
    }
  },
  // Seconds timestamp
  t: function(a, t, e) {
    const n = Math.trunc(+a / 1e3);
    return oe(n, t.length);
  },
  // Milliseconds timestamp
  T: function(a, t, e) {
    return oe(+a, t.length);
  }
};
function Na(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = Math.trunc(n / 60), l = n % 60;
  return l === 0 ? e + String(r) : e + String(r) + t + oe(l, 2);
}
function Va(a, t) {
  return a % 60 === 0 ? (a > 0 ? "-" : "+") + oe(Math.abs(a) / 60, 2) : Ne(a, t);
}
function Ne(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = oe(Math.trunc(n / 60), 2), l = oe(n % 60, 2);
  return e + r + t + l;
}
const ja = (a, t) => {
  switch (a) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, zn = (a, t) => {
  switch (a) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Qm = (a, t) => {
  const e = a.match(/(P+)(p+)?/) || [], n = e[1], r = e[2];
  if (!r)
    return ja(a, t);
  let l;
  switch (n) {
    case "P":
      l = t.dateTime({ width: "short" });
      break;
    case "PP":
      l = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      l = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      l = t.dateTime({ width: "full" });
      break;
  }
  return l.replace("{{date}}", ja(n, t)).replace("{{time}}", zn(r, t));
}, Wt = {
  p: zn,
  P: Qm
}, Km = /^D+$/, zm = /^Y+$/, Gm = ["D", "DD", "YY", "YYYY"];
function Gn(a) {
  return Km.test(a);
}
function Xn(a) {
  return zm.test(a);
}
function Yt(a, t, e) {
  const n = Xm(a, t, e);
  if (console.warn(n), Gm.includes(a)) throw new RangeError(n);
}
function Xm(a, t, e) {
  const n = a[0] === "Y" ? "years" : "days of the month";
  return `Use \`${a.toLowerCase()}\` instead of \`${a}\` (in \`${t}\`) for formatting ${n} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Um = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Zm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Jm = /^'([^]*?)'?$/, eh = /''/g, th = /[a-zA-Z]/;
function qa(a, t, e) {
  var p, m, k, E;
  const n = ze(), r = n.locale ?? Yn, l = n.firstWeekContainsDate ?? ((m = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, o = n.weekStartsOn ?? ((E = (k = n.locale) == null ? void 0 : k.options) == null ? void 0 : E.weekStartsOn) ?? 0, s = he(a, e == null ? void 0 : e.in);
  if (!dm(s))
    throw new RangeError("Invalid time value");
  let u = t.match(Zm).map((_) => {
    const A = _[0];
    if (A === "p" || A === "P") {
      const y = Wt[A];
      return y(_, r.formatLong);
    }
    return _;
  }).join("").match(Um).map((_) => {
    if (_ === "''")
      return { isToken: !1, value: "'" };
    const A = _[0];
    if (A === "'")
      return { isToken: !1, value: ah(_) };
    if (Fa[A])
      return { isToken: !0, value: _ };
    if (A.match(th))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + A + "`"
      );
    return { isToken: !1, value: _ };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(s, u));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: o,
    locale: r
  };
  return u.map((_) => {
    if (!_.isToken) return _.value;
    const A = _.value;
    (Xn(A) || Gn(A)) && Yt(A, t, String(a));
    const y = Fa[A[0]];
    return y(s, A, r.localize, d);
  }).join("");
}
function ah(a) {
  const t = a.match(Jm);
  return t ? t[1].replace(eh, "'") : a;
}
function nh() {
  return Object.assign({}, ze());
}
function rh(a, t) {
  const e = he(a, t == null ? void 0 : t.in).getDay();
  return e === 0 ? 7 : e;
}
function lh(a, t) {
  const e = oh(t) ? new t(0) : ye(t, 0);
  return e.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), e.setHours(
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
    a.getMilliseconds()
  ), e;
}
function oh(a) {
  var t;
  return typeof a == "function" && ((t = a.prototype) == null ? void 0 : t.constructor) === a;
}
const sh = 10;
class Un {
  constructor() {
    N(this, "subPriority", 0);
  }
  validate(t, e) {
    return !0;
  }
}
class ih extends Un {
  constructor(t, e, n, r, l) {
    super(), this.value = t, this.validateValue = e, this.setValue = n, this.priority = r, l && (this.subPriority = l);
  }
  validate(t, e) {
    return this.validateValue(t, this.value, e);
  }
  set(t, e, n) {
    return this.setValue(t, e, this.value, n);
  }
}
class uh extends Un {
  constructor(e, n) {
    super();
    N(this, "priority", sh);
    N(this, "subPriority", -1);
    this.context = e || ((r) => ye(n, r));
  }
  set(e, n) {
    return n.timestampIsSet ? e : ye(e, lh(e, this.context));
  }
}
class le {
  run(t, e, n, r) {
    const l = this.parse(t, e, n, r);
    return l ? {
      setter: new ih(
        l.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: l.rest
    } : null;
  }
  validate(t, e, n) {
    return !0;
  }
}
class dh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 140);
    N(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "G":
      case "GG":
      case "GGG":
        return r.era(e, { width: "abbreviated" }) || r.era(e, { width: "narrow" });
      case "GGGGG":
        return r.era(e, { width: "narrow" });
      case "GGGG":
      default:
        return r.era(e, { width: "wide" }) || r.era(e, { width: "abbreviated" }) || r.era(e, { width: "narrow" });
    }
  }
  set(e, n, r) {
    return n.era = r, e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
const ce = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
}, Ee = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function fe(a, t) {
  return a && {
    value: t(a.value),
    rest: a.rest
  };
}
function ue(a, t) {
  const e = t.match(a);
  return e ? {
    value: parseInt(e[0], 10),
    rest: t.slice(e[0].length)
  } : null;
}
function Me(a, t) {
  const e = t.match(a);
  if (!e)
    return null;
  if (e[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  const n = e[1] === "+" ? 1 : -1, r = e[2] ? parseInt(e[2], 10) : 0, l = e[3] ? parseInt(e[3], 10) : 0, o = e[5] ? parseInt(e[5], 10) : 0;
  return {
    value: n * (r * nm + l * am + o * rm),
    rest: t.slice(e[0].length)
  };
}
function Zn(a) {
  return ue(ce.anyDigitsSigned, a);
}
function de(a, t) {
  switch (a) {
    case 1:
      return ue(ce.singleDigit, t);
    case 2:
      return ue(ce.twoDigits, t);
    case 3:
      return ue(ce.threeDigits, t);
    case 4:
      return ue(ce.fourDigits, t);
    default:
      return ue(new RegExp("^\\d{1," + a + "}"), t);
  }
}
function bt(a, t) {
  switch (a) {
    case 1:
      return ue(ce.singleDigitSigned, t);
    case 2:
      return ue(ce.twoDigitsSigned, t);
    case 3:
      return ue(ce.threeDigitsSigned, t);
    case 4:
      return ue(ce.fourDigitsSigned, t);
    default:
      return ue(new RegExp("^-?\\d{1," + a + "}"), t);
  }
}
function sa(a) {
  switch (a) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function Jn(a, t) {
  const e = t > 0, n = e ? t : 1 - t;
  let r;
  if (n <= 50)
    r = a || 100;
  else {
    const l = n + 50, o = Math.trunc(l / 100) * 100, s = a >= l % 100;
    r = a + o - (s ? 100 : 0);
  }
  return e ? r : 1 - r;
}
function er(a) {
  return a % 400 === 0 || a % 4 === 0 && a % 100 !== 0;
}
class ch extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 130);
    N(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, n, r) {
    const l = (o) => ({
      year: o,
      isTwoDigitYear: n === "yy"
    });
    switch (n) {
      case "y":
        return fe(de(4, e), l);
      case "yo":
        return fe(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return fe(de(n.length, e), l);
    }
  }
  validate(e, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(e, n, r) {
    const l = e.getFullYear();
    if (r.isTwoDigitYear) {
      const s = Jn(
        r.year,
        l
      );
      return e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const o = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class fh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 130);
    N(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    const l = (o) => ({
      year: o,
      isTwoDigitYear: n === "YY"
    });
    switch (n) {
      case "Y":
        return fe(de(4, e), l);
      case "Yo":
        return fe(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return fe(de(n.length, e), l);
    }
  }
  validate(e, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(e, n, r, l) {
    const o = oa(e, l);
    if (r.isTwoDigitYear) {
      const u = Jn(
        r.year,
        o
      );
      return e.setFullYear(
        u,
        0,
        l.firstWeekContainsDate
      ), e.setHours(0, 0, 0, 0), Re(e, l);
    }
    const s = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(s, 0, l.firstWeekContainsDate), e.setHours(0, 0, 0, 0), Re(e, l);
  }
}
class ph extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 130);
    N(this, "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n) {
    return bt(n === "R" ? 4 : n.length, e);
  }
  set(e, n, r) {
    const l = ye(e, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), Ke(l);
  }
}
class mh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 130);
    N(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, n) {
    return bt(n === "u" ? 4 : n.length, e);
  }
  set(e, n, r) {
    return e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class hh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 120);
    N(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    switch (n) {
      case "Q":
      case "QQ":
        return de(n.length, e);
      case "Qo":
        return r.ordinalNumber(e, { unit: "quarter" });
      case "QQQ":
        return r.quarter(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQQ":
        return r.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return r.quarter(e, {
          width: "wide",
          context: "formatting"
        }) || r.quarter(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 4;
  }
  set(e, n, r) {
    return e.setMonth((r - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class vh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 120);
    N(this, "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    switch (n) {
      case "q":
      case "qq":
        return de(n.length, e);
      case "qo":
        return r.ordinalNumber(e, { unit: "quarter" });
      case "qqq":
        return r.quarter(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqqq":
        return r.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return r.quarter(e, {
          width: "wide",
          context: "standalone"
        }) || r.quarter(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 4;
  }
  set(e, n, r) {
    return e.setMonth((r - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class gh extends le {
  constructor() {
    super(...arguments);
    N(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    N(this, "priority", 110);
  }
  parse(e, n, r) {
    const l = (o) => o - 1;
    switch (n) {
      case "M":
        return fe(
          ue(ce.month, e),
          l
        );
      case "MM":
        return fe(de(2, e), l);
      case "Mo":
        return fe(
          r.ordinalNumber(e, {
            unit: "month"
          }),
          l
        );
      case "MMM":
        return r.month(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.month(e, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return r.month(e, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return r.month(e, { width: "wide", context: "formatting" }) || r.month(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.month(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class bh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 110);
    N(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    const l = (o) => o - 1;
    switch (n) {
      case "L":
        return fe(
          ue(ce.month, e),
          l
        );
      case "LL":
        return fe(de(2, e), l);
      case "Lo":
        return fe(
          r.ordinalNumber(e, {
            unit: "month"
          }),
          l
        );
      case "LLL":
        return r.month(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.month(e, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return r.month(e, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return r.month(e, { width: "wide", context: "standalone" }) || r.month(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.month(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
  }
}
function yh(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = Kn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), he(n, e == null ? void 0 : e.in);
}
class kh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 100);
    N(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    switch (n) {
      case "w":
        return ue(ce.week, e);
      case "wo":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 53;
  }
  set(e, n, r, l) {
    return Re(yh(e, r, l), l);
  }
}
function wh(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = Qn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), n;
}
class _h extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 100);
    N(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    switch (n) {
      case "I":
        return ue(ce.week, e);
      case "Io":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 53;
  }
  set(e, n, r) {
    return Ke(wh(e, r));
  }
}
const xh = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Dh = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
class Th extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "subPriority", 1);
    N(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    switch (n) {
      case "d":
        return ue(ce.date, e);
      case "do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    const r = e.getFullYear(), l = er(r), o = e.getMonth();
    return l ? n >= 1 && n <= Dh[o] : n >= 1 && n <= xh[o];
  }
  set(e, n, r) {
    return e.setDate(r), e.setHours(0, 0, 0, 0), e;
  }
}
class Ih extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "subpriority", 1);
    N(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    switch (n) {
      case "D":
      case "DD":
        return ue(ce.dayOfYear, e);
      case "Do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    const r = e.getFullYear();
    return er(r) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
  }
  set(e, n, r) {
    return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
  }
}
function ia(a, t, e) {
  var m, k, E, _;
  const n = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((k = (m = e == null ? void 0 : e.locale) == null ? void 0 : m.options) == null ? void 0 : k.weekStartsOn) ?? n.weekStartsOn ?? ((_ = (E = n.locale) == null ? void 0 : E.options) == null ? void 0 : _.weekStartsOn) ?? 0, l = he(a, e == null ? void 0 : e.in), o = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - r, p = t < 0 || t > 6 ? t - (o + d) % 7 : (u + d) % 7 - (o + d) % 7;
  return Hn(l, p, e);
}
class Eh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "E":
      case "EE":
      case "EEE":
        return r.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return r.day(e, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return r.day(e, { width: "wide", context: "formatting" }) || r.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 6;
  }
  set(e, n, r, l) {
    return e = ia(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Mh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n, r, l) {
    const o = (s) => {
      const u = Math.floor((s - 1) / 7) * 7;
      return (s + l.weekStartsOn + 6) % 7 + u;
    };
    switch (n) {
      case "e":
      case "ee":
        return fe(de(n.length, e), o);
      case "eo":
        return fe(
          r.ordinalNumber(e, {
            unit: "day"
          }),
          o
        );
      case "eee":
        return r.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
      case "eeeee":
        return r.day(e, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return r.day(e, { width: "wide", context: "formatting" }) || r.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 6;
  }
  set(e, n, r, l) {
    return e = ia(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Ch extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
  }
  parse(e, n, r, l) {
    const o = (s) => {
      const u = Math.floor((s - 1) / 7) * 7;
      return (s + l.weekStartsOn + 6) % 7 + u;
    };
    switch (n) {
      case "c":
      case "cc":
        return fe(de(n.length, e), o);
      case "co":
        return fe(
          r.ordinalNumber(e, {
            unit: "day"
          }),
          o
        );
      case "ccc":
        return r.day(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.day(e, { width: "short", context: "standalone" }) || r.day(e, { width: "narrow", context: "standalone" });
      case "ccccc":
        return r.day(e, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return r.day(e, { width: "short", context: "standalone" }) || r.day(e, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return r.day(e, { width: "wide", context: "standalone" }) || r.day(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.day(e, { width: "short", context: "standalone" }) || r.day(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 6;
  }
  set(e, n, r, l) {
    return e = ia(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
function Ph(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = rh(n, e), l = t - r;
  return Hn(n, l, e);
}
class Lh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(e, n, r) {
    const l = (o) => o === 0 ? 7 : o;
    switch (n) {
      case "i":
      case "ii":
        return de(n.length, e);
      case "io":
        return r.ordinalNumber(e, { unit: "day" });
      case "iii":
        return fe(
          r.day(e, {
            width: "abbreviated",
            context: "formatting"
          }) || r.day(e, {
            width: "short",
            context: "formatting"
          }) || r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiii":
        return fe(
          r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiiii":
        return fe(
          r.day(e, {
            width: "short",
            context: "formatting"
          }) || r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiii":
      default:
        return fe(
          r.day(e, {
            width: "wide",
            context: "formatting"
          }) || r.day(e, {
            width: "abbreviated",
            context: "formatting"
          }) || r.day(e, {
            width: "short",
            context: "formatting"
          }) || r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 7;
  }
  set(e, n, r) {
    return e = Ph(e, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Bh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 80);
    N(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "a":
      case "aa":
      case "aaa":
        return r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, n, r) {
    return e.setHours(sa(r), 0, 0, 0), e;
  }
}
class $h extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 80);
    N(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "b":
      case "bb":
      case "bbb":
        return r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, n, r) {
    return e.setHours(sa(r), 0, 0, 0), e;
  }
}
class Ah extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 80);
    N(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, n, r) {
    return e.setHours(sa(r), 0, 0, 0), e;
  }
}
class Sh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "h":
        return ue(ce.hour12h, e);
      case "ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 12;
  }
  set(e, n, r) {
    const l = e.getHours() >= 12;
    return l && r < 12 ? e.setHours(r + 12, 0, 0, 0) : !l && r === 12 ? e.setHours(0, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
  }
}
class Oh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "H":
        return ue(ce.hour23h, e);
      case "Ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 23;
  }
  set(e, n, r) {
    return e.setHours(r, 0, 0, 0), e;
  }
}
class Rh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "K":
        return ue(ce.hour11h, e);
      case "Ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.getHours() >= 12 && r < 12 ? e.setHours(r + 12, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
  }
}
class Fh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "k":
        return ue(ce.hour24h, e);
      case "ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 24;
  }
  set(e, n, r) {
    const l = r <= 24 ? r % 24 : r;
    return e.setHours(l, 0, 0, 0), e;
  }
}
class Nh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 60);
    N(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "m":
        return ue(ce.minute, e);
      case "mo":
        return r.ordinalNumber(e, { unit: "minute" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 59;
  }
  set(e, n, r) {
    return e.setMinutes(r, 0, 0), e;
  }
}
class Vh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 50);
    N(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "s":
        return ue(ce.second, e);
      case "so":
        return r.ordinalNumber(e, { unit: "second" });
      default:
        return de(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 59;
  }
  set(e, n, r) {
    return e.setSeconds(r, 0), e;
  }
}
class jh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 30);
    N(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return fe(de(n.length, e), r);
  }
  set(e, n, r) {
    return e.setMilliseconds(r), e;
  }
}
class qh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 10);
    N(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(e, n) {
    switch (n) {
      case "X":
        return Me(
          Ee.basicOptionalMinutes,
          e
        );
      case "XX":
        return Me(Ee.basic, e);
      case "XXXX":
        return Me(
          Ee.basicOptionalSeconds,
          e
        );
      case "XXXXX":
        return Me(
          Ee.extendedOptionalSeconds,
          e
        );
      case "XXX":
      default:
        return Me(Ee.extended, e);
    }
  }
  set(e, n, r) {
    return n.timestampIsSet ? e : ye(
      e,
      e.getTime() - gt(e) - r
    );
  }
}
class Hh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 10);
    N(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(e, n) {
    switch (n) {
      case "x":
        return Me(
          Ee.basicOptionalMinutes,
          e
        );
      case "xx":
        return Me(Ee.basic, e);
      case "xxxx":
        return Me(
          Ee.basicOptionalSeconds,
          e
        );
      case "xxxxx":
        return Me(
          Ee.extendedOptionalSeconds,
          e
        );
      case "xxx":
      default:
        return Me(Ee.extended, e);
    }
  }
  set(e, n, r) {
    return n.timestampIsSet ? e : ye(
      e,
      e.getTime() - gt(e) - r
    );
  }
}
class Wh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 40);
    N(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Zn(e);
  }
  set(e, n, r) {
    return [ye(e, r * 1e3), { timestampIsSet: !0 }];
  }
}
class Yh extends le {
  constructor() {
    super(...arguments);
    N(this, "priority", 20);
    N(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Zn(e);
  }
  set(e, n, r) {
    return [ye(e, r), { timestampIsSet: !0 }];
  }
}
const Qh = {
  G: new dh(),
  y: new ch(),
  Y: new fh(),
  R: new ph(),
  u: new mh(),
  Q: new hh(),
  q: new vh(),
  M: new gh(),
  L: new bh(),
  w: new kh(),
  I: new _h(),
  d: new Th(),
  D: new Ih(),
  E: new Eh(),
  e: new Mh(),
  c: new Ch(),
  i: new Lh(),
  a: new Bh(),
  b: new $h(),
  B: new Ah(),
  h: new Sh(),
  H: new Oh(),
  K: new Rh(),
  k: new Fh(),
  m: new Nh(),
  s: new Vh(),
  S: new jh(),
  X: new qh(),
  x: new Hh(),
  t: new Wh(),
  T: new Yh()
}, Kh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, zh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Gh = /^'([^]*?)'?$/, Xh = /''/g, Uh = /\S/, Zh = /[a-zA-Z]/;
function Ha(a, t, e, n) {
  var y, D, T, P;
  const r = () => ye(e, NaN), l = nh(), o = l.locale ?? Yn, s = l.firstWeekContainsDate ?? ((D = (y = l.locale) == null ? void 0 : y.options) == null ? void 0 : D.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((P = (T = l.locale) == null ? void 0 : T.options) == null ? void 0 : P.weekStartsOn) ?? 0;
  if (!t)
    return a ? r() : he(e, n == null ? void 0 : n.in);
  const d = {
    firstWeekContainsDate: s,
    weekStartsOn: u,
    locale: o
  }, p = [new uh(n == null ? void 0 : n.in, e)], m = t.match(zh).map((I) => {
    const M = I[0];
    if (M in Wt) {
      const h = Wt[M];
      return h(I, o.formatLong);
    }
    return I;
  }).join("").match(Kh), k = [];
  for (let I of m) {
    Xn(I) && Yt(I, t, a), Gn(I) && Yt(I, t, a);
    const M = I[0], h = Qh[M];
    if (h) {
      const { incompatibleTokens: x } = h;
      if (Array.isArray(x)) {
        const H = k.find(
          (q) => x.includes(q.token) || q.token === M
        );
        if (H)
          throw new RangeError(
            `The format string mustn't contain \`${H.fullToken}\` and \`${I}\` at the same time`
          );
      } else if (h.incompatibleTokens === "*" && k.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${I}\` and any other token at the same time`
        );
      k.push({ token: M, fullToken: I });
      const g = h.run(
        a,
        I,
        o.match,
        d
      );
      if (!g)
        return r();
      p.push(g.setter), a = g.rest;
    } else {
      if (M.match(Zh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + M + "`"
        );
      if (I === "''" ? I = "'" : M === "'" && (I = Jh(I)), a.indexOf(I) === 0)
        a = a.slice(I.length);
      else
        return r();
    }
  }
  if (a.length > 0 && Uh.test(a))
    return r();
  const E = p.map((I) => I.priority).sort((I, M) => M - I).filter((I, M, h) => h.indexOf(I) === M).map(
    (I) => p.filter((M) => M.priority === I).sort((M, h) => h.subPriority - M.subPriority)
  ).map((I) => I[0]);
  let _ = he(e, n == null ? void 0 : n.in);
  if (isNaN(+_)) return r();
  const A = {};
  for (const I of E) {
    if (!I.validate(_, d))
      return r();
    const M = I.set(_, A, d);
    Array.isArray(M) ? (_ = M[0], Object.assign(A, M[1])) : _ = M;
  }
  return _;
}
function Jh(a) {
  return a.match(Gh)[1].replace(Xh, "'");
}
const ev = {
  dsfrDecodeDate: function(a, t) {
    if (typeof a != "string" || a === "" || /^\d{4}-\d{2}-\d{2}$/.test(a))
      return a;
    const n = Ha(a, t, /* @__PURE__ */ new Date());
    return qa(n, "yyyy-MM-dd");
  },
  dsfrDecodeDateTime: function(a, t) {
    if (a === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(a))
      return a;
    const n = Ha(a, t, /* @__PURE__ */ new Date());
    return qa(n, "yyyy-MM-dd'T'HH:mm");
  },
  _searchAndFilterList: function(a, t, e, n, r) {
    let l = this.$data.vueData[a];
    if (n && (l = l.filter(n)), r != null && r.trim() !== "") {
      const o = this.unaccentLower(r);
      l = l.filter((s) => this.unaccentLower(s[e].toString()).indexOf(o) > -1);
    }
    return l;
  },
  dsfrTransformListForSelection: function(a, t, e, n, r, l) {
    let s = this._searchAndFilterList(a, t, e, r, l).map(function(u) {
      return { value: u[t], text: u[e].toString() };
    });
    return n != null && n !== "" && s.unshift({ value: "", text: n }), s;
  },
  dsfrTransformListForRadio: function(a, t, e, n, r, l, o) {
    return this._searchAndFilterList(a, t, e, l, o).map(function(u) {
      return {
        value: u[t],
        label: u[e].toString(),
        hint: u[r],
        disabled: u[n]
      };
    });
  },
  dsfrTransformListForCheckbox: function(a, t, e, n, r, l, o, s) {
    return this._searchAndFilterList(a, t, e, o, s).map(function(d) {
      return {
        value: d[t],
        label: d[e].toString(),
        name: l,
        hint: d[r],
        disabled: d[n]
      };
    });
  },
  dsfrSearchAutocomplete: function(a, t, e, n, r, l, o) {
    return o.length < l ? Promise.resolve([]) : this.$http.post(r, this.objectToFormData({ terms: o, list: a, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((s) => s.data.map((u) => ({
      value: u[t],
      label: u[e].toString()
      // A label is always a string
    }))).catch(() => []);
  },
  dsfrLoadAutocompleteById: function(a, t, e, n, r, l, o, s) {
    var u;
    s != null ? u = this.$data.vueData[l][s][o] : u = this.$data.vueData[l][o], Array.isArray(u) ? u.forEach((d) => this.dsfrLoadMissingAutocompleteOption(a, t, e, n, r, d)) : this.dsfrLoadMissingAutocompleteOption(a, t, e, n, r, u);
  },
  dsfrLoadMissingAutocompleteOption: function(a, t, e, n, r, l) {
    !l || this.$data.componentStates[n].options.filter((function(o) {
      return o.value === l;
    }).bind(this)).length > 0 || (this.$data.componentStates[n].loading = !0, this.$http.post(r, this.objectToFormData({ value: l, list: a, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((function(o) {
      let s = o.data.map(function(u) {
        return { value: u[t], label: u[e].toString() };
      });
      return this.$data.componentStates[n].options = this.$data.componentStates[n].options.concat(s), this.$data.componentStates[n].options;
    }).bind(this)).catch((function(o) {
      this.$q.notify(o.response.status + ":" + o.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[n].loading = !1;
    }).bind(this)));
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var a, t;
    (t = (a = this.componentStates) == null ? void 0 : a.dsfrHeader) == null || t.navItems.filter((e) => e.title).forEach((e) => {
      e.active = e.links.some((n) => window.location.pathname.startsWith(n.to));
    });
  }
}, tv = "abcdefghijklmnopqrstuvwyz0123456789", Wa = tv.repeat(10), av = () => {
  const a = Math.floor(Math.random() * Wa.length);
  return Wa[a];
}, nv = (a) => Array.from({ length: a }).map(av).join(""), Fe = (a = "", t = "") => (a ? `${a}-` : "") + nv(5) + (t ? `-${t}` : ""), rv = {
  getRandomId: Fe
}, lv = ["href", "aria-current"], ov = {
  __name: "RouterLink",
  props: ["to"],
  setup(a) {
    const t = a, e = t.to === "/" ? window.location.pathname === t.to : window.location.pathname.startsWith(t.to);
    return (n, r) => (i(), f("a", {
      href: t.to,
      "aria-current": O(e) ? "page" : void 0
    }, [
      B(n.$slots, "default")
    ], 8, lv));
  }
}, Ae = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, sv = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Tt, DsfrTag: la, DsfrButton: qe },
  props: {
    facets: Array,
    selectedFacets: Object,
    contextKey: String,
    facetValueTranslatorProvider: Function,
    maxValues: {
      type: Number,
      default: 5
    }
  },
  emits: ["toogle-facet"],
  computed: {},
  data: function() {
    return {
      expandedFacets: [],
      codeToLabelTranslater: {}
      /** facetCode : function (facetCode, facetValueCode) return facetValueLabel */
    };
  },
  created: function() {
    this.facetValueTranslatorProvider !== void 0 && this.facetValueTranslatorProvider(this);
  },
  methods: {
    addFacetValueTranslator(a, t) {
      this.codeToLabelTranslater[a] = t;
    },
    facetByCode(a) {
      return this.facets.filter(function(t) {
        return t.code === a;
      })[0];
    },
    facetValueByCode(a, t) {
      return this.facetByCode(a).values.filter(function(e) {
        return e.code === t;
      })[0];
    },
    facetLabelByCode(a) {
      return this.facetByCode(a).label;
    },
    facetMultipleByCode(a) {
      return this.facetByCode(a).multiple;
    },
    facetValueLabelByCode(a, t) {
      if (this.codeToLabelTranslater[a])
        return this.codeToLabelTranslater[a](a, t);
      var e = this.facetValueByCode(a, t);
      return e ? e.label : t;
    },
    isFacetValueSelected(a, t) {
      return this.selectedFacets[a].includes(t);
    },
    isFacetSelected(a) {
      return this.selectedFacets[a] ? this.selectedFacets[a].length > 0 : !1;
    },
    isAnyFacetValueSelected() {
      return Object.keys(this.selectedFacets).some((function(a) {
        return !this.facetMultipleByCode(a);
      }).bind(this));
    },
    expandFacet(a) {
      this.isFacetExpanded(a) || this.$data.expandedFacets.push(a);
    },
    reduceFacet(a) {
      this.isFacetExpanded(a) && this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(a), 1);
    },
    isFacetExpanded(a) {
      return this.$data.expandedFacets.includes(a);
    },
    selectedInvisibleFacets(a) {
      return this.selectedFacets[a].filter((t) => !this.facetValueByCode(a, t)).map((t) => {
        var e = {};
        return e.code = t, e.label = t, e.count = 0, e;
      });
    },
    visibleFacets(a, t) {
      return this.isFacetExpanded(a) ? t : t.slice(0, this.maxValues);
    }
  }
}, iv = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, uv = { class: "fr-mb-1w fr-text--md" }, dv = { key: 0 }, cv = { class: "facet" }, fv = { class: "flex justify-between w-full fr-mb-0" }, pv = { class: "facet--count" }, mv = { key: 1 }, hv = { class: "flex justify-between w-full" }, vv = { class: "facet--count" }, gv = { key: 0 }, bv = { class: "facet" }, yv = { class: "flex justify-between w-full fr-mb-0" }, kv = { class: "facet--count" }, wv = { key: 1 }, _v = { class: "flex justify-between w-full" }, xv = { class: "facet--count" }, Dv = { class: "fr-mb-2w" };
function Tv(a, t, e, n, r, l) {
  const o = _e("DsfrTag"), s = _e("DsfrCheckbox"), u = _e("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", iv, [
      (i(!0), f(z, null, U(e.selectedFacets, (d, p) => (i(), f(z, { key: p }, [
        l.facetMultipleByCode(p) ? b("", !0) : (i(!0), f(z, { key: 0 }, U(d, (m) => (i(), V(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (k) => a.$emit("toogle-facet", p, m, e.contextKey)
        }, {
          default: X(() => [
            F(v(l.facetLabelByCode(p)) + ": " + v(l.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : b("", !0),
    (i(!0), f(z, null, U(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(z, { key: 0 }, [
        c("h6", uv, v(d.label), 1),
        c("ul", null, [
          (i(!0), f(z, null, U(l.selectedInvisibleFacets(d.code), (p) => (i(), f(z, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", dv, [
              c("div", cv, [
                ee(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (m) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: X(() => [
                    c("p", fv, [
                      F(v(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", pv, v(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", mv, [
              ee(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: X(() => [
                  c("span", hv, [
                    F(v(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", vv, v(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(z, null, U(l.visibleFacets(d.code, d.values), (p) => (i(), f(z, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", gv, [
              c("div", bv, [
                ee(s, {
                  small: "",
                  modelValue: l.isFacetValueSelected(d.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (m) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: X(() => [
                    c("p", yv, [
                      F(v(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", kv, v(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", wv, [
              ee(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: X(() => [
                  c("span", _v, [
                    F(v(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", xv, v(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", Dv, [
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), V(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: X(() => [
              F(v(a.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0),
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), V(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: X(() => [
              F(v(a.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0)
        ])
      ], 64)) : b("", !0)
    ]))), 128))
  ]);
}
const Iv = /* @__PURE__ */ Ae(sv, [["render", Tv], ["__scopeId", "data-v-0be4e596"]]), ua = () => {
  const a = W(), t = W(!1), e = W(!1), n = () => {
    if (!a.value)
      return;
    a.value.style.setProperty("--collapser", "none");
    const o = a.value.offsetHeight;
    a.value.style.setProperty("--collapse", `${-o}px`), a.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: a,
    collapsing: t,
    cssExpanded: e,
    doExpand: (o) => {
      a.value && (o === !0 && a.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        t.value = !0, n(), window.requestAnimationFrame(() => {
          e.value = o;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (o) => {
      t.value = !1, a.value && o === !1 && a.value.style.removeProperty("--collapse-max-height");
    }
  };
}, Ev = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Mv = ["id", "aria-labelledby", "onKeydown"], Cv = {
  class: "fr-menu__list",
  role: "none"
}, Pv = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Fe("menu") },
    size: {},
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 },
    tertiary: { type: Boolean, default: !1 }
  },
  setup(a, { expose: t }) {
    const {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: o
    } = ua(), s = a, u = W(null), d = W(!1);
    let p = W(0), m = [];
    Oe("menuItem", { menuItemIndex: p, addMenuItem: (x, g) => {
      p.value += 1, m.push(`${x}@${g}`);
    } }), Oe("id", s.id), me(d, (x, g) => {
      x !== g && (l(x), x ? (setTimeout(() => A(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    });
    const E = (x, g) => {
      const H = g === "down" ? (x + 1) % m.length : (x - 1 + m.length) % m.length, q = document.getElementById(`${s.id}_item_${H}`);
      return q.ariaDisabled === "true" ? E(H, g) : q;
    }, _ = (x) => {
      const g = document.activeElement.id, H = g.startsWith(`${s.id}_item_`) ? Number(g.split("_")[2]) : x === "down" ? -1 : 0;
      E(H, x).focus();
    }, A = (x) => _("down"), y = (x) => _("up");
    let D = (x) => {
      let g = x.key;
      if (g.length > 1 && g.match(/\S/))
        return;
      g = g.toLowerCase();
      let H = m.filter((C) => C.toLowerCase().startsWith(g)), q = document.activeElement.id;
      for (let C of H) {
        let $ = C.split("@")[1], L = document.getElementById(`${s.id}_item_${$}`);
        if (q !== L.id) {
          L.focus();
          break;
        }
      }
    }, T = (x) => {
      u.value.contains(x.target) || (d.value = !1);
    };
    function P() {
      d.value = !1;
    }
    const I = w(() => ["sm", "small"].includes(s.size)), M = w(() => ["md", "medium"].includes(s.size)), h = w(() => ["lg", "large"].includes(s.size));
    return t({ closeMenu: P }), (x, g) => (i(), f("div", {
      class: "relative-position",
      onKeydown: g[9] || (g[9] = Z(
        //@ts-ignore
        (...H) => O(T) && O(T)(...H),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", Q({
        id: x.id,
        onClick: g[0] || (g[0] = J((H) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          g[1] || (g[1] = Z(J((H) => d.value = !1, ["stop"]), ["esc"])),
          g[2] || (g[2] = Z(J((H) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Z(J(A, ["prevent"]), ["down"]),
          Z(J(y, ["prevent"]), ["up"]),
          g[3] || (g[3] = //@ts-ignore
          (...H) => O(D) && O(D)(...H)),
          g[4] || (g[4] = Z((H) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          "fr-btn--secondary": x.secondary,
          "fr-btn--tertiary": x.tertiary,
          "fr-btn--sm": I.value,
          "fr-btn--md": M.value,
          "fr-btn--lg": h.value
        }],
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": x.disabled,
        "aria-controls": `${x.id}_menu`,
        "aria-expanded": d.value
      }, x.$attrs), [
        x.icon !== "" ? (i(), V(O(pe), {
          key: 0,
          class: "fr-mr-2v",
          name: x.icon
        }, null, 8, ["name"])) : b("", !0),
        c("span", null, v(x.label), 1)
      ], 16, Ev),
      c("div", {
        id: `${x.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse fr-menu", { "fr-collapse--expanded": O(r), "fr-collapsing": O(n) }]),
        role: "menu",
        "aria-labelledby": x.id,
        onKeyup: g[5] || (g[5] = Z((H) => d.value = !1, ["esc"])),
        onKeydown: [
          g[6] || (g[6] = Z((H) => d.value = !1, ["tab"])),
          Z(J(A, ["prevent"]), ["down"]),
          Z(J(y, ["prevent"]), ["up"]),
          g[7] || (g[7] = //@ts-ignore
          (...H) => O(D) && O(D)(...H))
        ],
        onTransitionend: g[8] || (g[8] = (H) => O(o)(d.value))
      }, [
        c("ul", Cv, [
          B(x.$slots, "default", {}, void 0, !0)
        ])
      ], 42, Mv)
    ], 544));
  }
}), Lv = /* @__PURE__ */ Ae(Pv, [["__scopeId", "data-v-2b649ce2"]]), Bv = { role: "none" }, $v = ["id", "href"], Av = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(a) {
    const t = a, { menuItemIndex: e, addMenuItem: n } = Qe("menuItem"), r = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), l = `fr-btn fr-btn--secondary fr-nav__link ${r ? t.icon : ""} fr-btn--icon-left`, o = Qe("id"), s = e.value;
    return n(t.label, s), (u, d) => {
      const p = _e("dsfr-button"), m = _e("v-icon");
      return i(), f("li", Bv, [
        u.url === "" ? (i(), V(p, Q({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${O(o)}_item_${O(s)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", Q({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${O(o)}_item_${O(s)}`,
          href: u.url,
          class: l
        }, u.$attrs), [
          r.value ? b("", !0) : (i(), V(m, {
            key: 0,
            name: u.icon
          }, null, 8, ["name"])),
          F(" " + v(u.label), 1)
        ], 16, $v))
      ]);
    };
  }
}), Sv = /* @__PURE__ */ Ae(Av, [["__scopeId", "data-v-a0b6f3d0"]]), Ov = ["for", "id"], Rv = {
  key: 0,
  class: "required"
}, Fv = {
  key: 0,
  class: "fr-hint-text"
}, Nv = ["id", "onKeydown", "aria-labelledby", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], Vv = ["id", "onKeydown"], jv = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, qv = ["id"], Hv = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, Wv = ["id"], Yv = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, Qv = {
  key: 0,
  class: "fr-hint-text"
}, Kv = {
  role: "listbox",
  "aria-multiselectable": "true",
  class: "fr-select__ul"
}, zv = ["aria-selected"], Gv = ["id", "data-id", "value"], Xv = ["for"], Uv = ["id"], Zv = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ Le({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Fe("select-multiple") },
    name: { default: void 0 },
    description: { default: void 0 },
    modelValue: {},
    label: { default: "" },
    options: { default: () => [] },
    successMessage: { default: "" },
    errorMessage: { default: "" },
    comboHasFilter: { type: Boolean, default: !0 },
    comboHasButton: { type: Boolean, default: !0 },
    comboLabel: { default: "" },
    comboDescription: { default: "" }
  }, {
    modelValue: { default: [] },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = ua(), o = a, s = W(!1), u = we(a, "modelValue"), d = W(o.options);
    me(s, (L, j) => {
      L !== j && (r(L), L ? (document.addEventListener("click", $), document.addEventListener("touchstart", $)) : (document.removeEventListener("click", $), document.removeEventListener("touchstart", $)));
    });
    const p = W(null), m = W(null), k = W(null), E = w(() => o.errorMessage || o.successMessage), _ = w(() => o.errorMessage !== "" ? "error" : "valid"), A = w(() => o.modelValue.length === d.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), y = w(() => o.modelValue.length === d.value.length ? "Tout déselectionner" : "Tout sélectionner"), D = w(() => {
      let j = `${o.options.filter((K) => o.modelValue.includes(K.value)).length} options séléctionnées`;
      return o.modelValue.length > 2 ? j : o.options.filter((K) => o.modelValue.includes(K.value)).map((K) => K.text).join(", ");
    });
    let T = function() {
      if (o.modelValue.length >= d.value.length)
        o.modelValue.length = 0;
      else {
        const L = d.value.filter((j) => !o.modelValue.includes(j.value));
        for (let j of L)
          o.modelValue.push(j.value);
      }
    }, P = function(L) {
      const j = L.target.value.toLowerCase();
      d.value = o.options.filter((K) => K.text.toLowerCase().indexOf(j) > -1);
    };
    const I = (L, j) => {
      const K = j === "down" ? (L + 1) % d.value.length : (L - 1 + d.value.length) % d.value.length, ne = document.getElementById(`${o.id}_option_${K}`);
      return ne.ariaDisabled === "true" ? I(K, j) : ne;
    }, M = (L) => {
      const j = document.activeElement.id, K = j.startsWith(`${o.id}_option_`) ? Number(j.split("_")[2]) : L === "down" ? -1 : 0;
      I(K, L).focus();
    }, h = (L) => M("down"), x = (L) => M("up");
    let g = function(L) {
      L.shiftKey || (o.comboHasButton ? s.value || (s.value = !0, L.preventDefault(), setTimeout(() => m.value.focus(), 100)) : o.comboHasFilter && (s.value || (s.value = !0, L.preventDefault(), setTimeout(() => k.value.focus(), 100))));
    }, H = function(L) {
      L.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.id}_button` || o.comboHasFilter && document.activeElement.id === `${o.id}_filter`) && (L.preventDefault(), s.value = !1), !o.comboHasFilter && !o.comboHasButton && (s.value = !1));
    }, q = function(L) {
      document.activeElement.id.startsWith(`${o.id}_option_`) && (o.comboHasFilter ? (L.preventDefault(), k.value.focus()) : o.comboHasButton && m.value.focus());
    }, C = (L) => {
      let j = L.key;
      if (j.length > 1 && j.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      j = j.toLowerCase();
      let K = d.value.filter((te) => te.text.toLowerCase().startsWith(j)), ne = document.activeElement.id;
      for (let te of K) {
        let ie = document.querySelector(`[data-id='${te.value}']`);
        if (ne !== ie.id) {
          ie.focus();
          break;
        }
      }
    }, $ = (L) => {
      p.value.contains(L.target) || (s.value = !1);
    };
    return (L, j) => (i(), f(z, null, [
      c("div", Q({
        ref_key: "container",
        ref: p,
        class: ["fr-select-group", { [`fr-select-group--${_.value}`]: E.value !== "" }],
        onKeyup: j[13] || (j[13] = Z(
          //@ts-ignore
          (...K) => O($) && O($)(...K),
          ["tab"]
        ))
      }, L.$attrs), [
        c("label", {
          class: "fr-label",
          for: L.id,
          id: `${L.id}_label`
        }, [
          B(L.$slots, "label", {}, () => [
            F(v(L.label) + " ", 1),
            B(L.$slots, "required-tip", {}, () => [
              L.required ? (i(), f("span", Rv, " *")) : b("", !0)
            ], !0)
          ], !0),
          L.description ? (i(), f("span", Fv, v(L.description), 1)) : b("", !0)
        ], 8, Ov),
        c("div", {
          id: L.id,
          class: R([{ [`fr-select--${_.value}`]: E.value !== "" }, "fr-input"]),
          onClick: j[0] || (j[0] = (K) => s.value = !s.value),
          onKeydown: [
            j[1] || (j[1] = Z(J((K) => s.value = !1, ["stop"]), ["esc"])),
            j[2] || (j[2] = Z(J((K) => s.value = !s.value, ["prevent"]), ["space"])),
            Z(J(h, ["prevent"]), ["down"]),
            Z(J(x, ["prevent"]), ["up"]),
            j[3] || (j[3] = Z(
              //@ts-ignore
              (...K) => O(g) && O(g)(...K),
              ["tab"]
            )),
            j[4] || (j[4] = //@ts-ignore
            (...K) => O(C) && O(C)(...K))
          ],
          tabindex: "0",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-autocomplete": "none",
          "aria-labelledby": `${L.id}_label`,
          "aria-disabled": L.disabled,
          "aria-controls": `${L.id}_list`,
          "aria-expanded": s.value,
          "aria-required": L.required
        }, [
          c("p", null, v(D.value), 1)
        ], 42, Nv),
        c("div", {
          id: `${L.id}_list`,
          ref_key: "collapse",
          ref: t,
          class: R(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": O(n), "fr-collapsing": O(e) }]),
          onKeyup: j[8] || (j[8] = Z((K) => s.value = !1, ["esc"])),
          onKeydown: [
            j[9] || (j[9] = Z(
              //@ts-ignore
              (...K) => O(H) && O(H)(...K),
              ["tab"]
            )),
            Z(J(h, ["prevent"]), ["down"]),
            Z(J(x, ["prevent"]), ["up"]),
            j[10] || (j[10] = Z(J(
              //@ts-ignore
              (...K) => O(q) && O(q)(...K),
              ["shift"]
            ), ["tab"])),
            j[11] || (j[11] = //@ts-ignore
            (...K) => O(C) && O(C)(...K))
          ],
          onTransitionend: j[12] || (j[12] = (K) => O(l)(s.value))
        }, [
          L.comboHasButton ? (i(), f("ul", jv, [
            c("li", null, [
              c("button", {
                class: R(["fr-btn fr-btn--tertiary", `${A.value}`]),
                id: `${L.id}_button`,
                onClick: j[5] || (j[5] = (K) => O(T)()),
                ref_key: "button",
                ref: m,
                type: "button"
              }, v(y.value), 11, qv)
            ])
          ])) : b("", !0),
          L.comboHasFilter ? (i(), f("div", Hv, [
            c("input", {
              class: "fr-input",
              id: `${L.id}_filter`,
              ref_key: "filter",
              ref: k,
              onInput: j[6] || (j[6] = //@ts-ignore
              (...K) => O(P) && O(P)(...K)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, Wv)
          ])) : b("", !0),
          L.comboLabel ? (i(), f("p", Yv, [
            F(v(L.comboLabel) + " ", 1),
            L.comboDescription ? (i(), f("span", Qv, v(L.comboDescription), 1)) : b("", !0)
          ])) : b("", !0),
          c("ul", Kv, [
            (i(!0), f(z, null, U(d.value, (K, ne) => (i(), f("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": u.value.includes(K.value)
            }, [
              Be(c("input", {
                id: `${L.id}_option_${ne}`,
                "data-id": K.value,
                type: "checkbox",
                class: "",
                tabindex: "-1",
                value: K.value,
                "onUpdate:modelValue": j[7] || (j[7] = (te) => u.value = te)
              }, null, 8, Gv), [
                [lt, u.value]
              ]),
              c("label", {
                class: "fr-label",
                for: `${L.id}_option_${ne}`
              }, v(K.text), 9, Xv)
            ], 8, zv))), 256))
          ])
        ], 42, Vv)
      ], 16),
      E.value ? (i(), f("p", {
        key: 0,
        id: `select-${_.value}-desc-${_.value}`,
        class: R(`fr-${_.value}-text`)
      }, v(E.value), 11, Uv)) : b("", !0)
    ], 64));
  }
}), Jv = /* @__PURE__ */ Ae(Zv, [["__scopeId", "data-v-39e017b7"]]), eg = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], tg = ["id", "aria-labelledby", "onKeydown"], ag = {
  key: 0,
  class: "fr-label fr-mb-0"
}, ng = {
  key: 0,
  class: "fr-hint-text"
}, rg = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, lg = {
  role: "none",
  class: "fr-p-2v"
}, og = ["id", "href"], sg = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrHeaderMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Fe("header-menu") },
    disabled: { type: Boolean, default: !1 },
    logoutUrl: { default: "" },
    logoutLabel: { default: "Se déconnecter" },
    nom: { default: "" },
    email: { default: "" }
  },
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = ua(), o = a, s = W(null), u = W(!1);
    let d = W(0), p = [];
    const m = (T, P) => {
      d.value += 1, p.push(`${T}@${P}`);
    };
    Oe("menuItem", { menuItemIndex: d, addMenuItem: m }), Oe("id", o.id), me(u, (T, P) => {
      T !== P && (r(T), T ? (setTimeout(() => _(), 100), document.addEventListener("click", D), document.addEventListener("touchstart", D)) : (document.removeEventListener("click", D), document.removeEventListener("touchstart", D)));
    }), be(() => {
      m(o.logoutLabel, d.value);
    });
    const k = (T, P) => {
      const I = P === "down" ? (T + 1) % p.length : (T - 1 + p.length) % p.length, M = document.getElementById(`${o.id}_item_${I}`);
      return M.ariaDisabled === "true" ? k(I, P) : M;
    }, E = (T) => {
      const P = document.activeElement.id, I = P.startsWith(`${o.id}_item_`) ? Number(P.split("_")[2]) : T === "down" ? -1 : 0;
      k(I, T).focus();
    }, _ = (T) => E("down"), A = (T) => E("up");
    let y = (T) => {
      let P = T.key;
      if (P.length > 1 && P.match(/\S/))
        return;
      P = P.toLowerCase();
      let I = p.filter((h) => h.toLowerCase().startsWith(P)), M = document.activeElement.id;
      for (let h of I) {
        let x = h.split("@")[1], g = document.getElementById(`${o.id}_item_${x}`);
        if (M !== g.id) {
          g.focus();
          break;
        }
      }
    }, D = (T) => {
      s.value.contains(T.target) || (u.value = !1);
    };
    return (T, P) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: P[9] || (P[9] = Z(
        //@ts-ignore
        (...I) => O(D) && O(D)(...I),
        ["tab"]
      )),
      ref_key: "container",
      ref: s
    }, [
      c("button", Q({
        id: T.id,
        onClick: P[0] || (P[0] = J((I) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          P[1] || (P[1] = Z(J((I) => u.value = !1, ["stop"]), ["esc"])),
          P[2] || (P[2] = Z(J((I) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Z(J(_, ["prevent"]), ["down"]),
          Z(J(A, ["prevent"]), ["up"]),
          P[3] || (P[3] = //@ts-ignore
          (...I) => O(y) && O(y)(...I)),
          P[4] || (P[4] = Z((I) => u.value = !1, ["tab"]))
        ],
        class: "fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm",
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": T.disabled,
        "aria-controls": `${T.id}_menu`,
        "aria-expanded": u.value
      }, T.$attrs), [
        T.icon !== "" ? (i(), V(O(pe), {
          key: 0,
          class: "fr-mr-2v",
          name: T.icon
        }, null, 8, ["name"])) : b("", !0),
        c("span", null, v(T.label), 1)
      ], 16, eg),
      c("div", {
        id: `${T.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: R(["fr-collapse fr-menu fr-menu-header__modal fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": O(n), "fr-collapsing": O(e) }]),
        role: "menu",
        "aria-labelledby": T.id,
        onKeyup: P[5] || (P[5] = Z((I) => u.value = !1, ["esc"])),
        onKeydown: [
          P[6] || (P[6] = Z((I) => u.value = !1, ["tab"])),
          Z(J(_, ["prevent"]), ["down"]),
          Z(J(A, ["prevent"]), ["up"]),
          P[7] || (P[7] = //@ts-ignore
          (...I) => O(y) && O(y)(...I))
        ],
        onTransitionend: P[8] || (P[8] = (I) => O(l)(u.value))
      }, [
        B(T.$slots, "detail", {}, () => [
          T.nom === "" && T.email === "" ? b("", !0) : (i(), f("p", ag, [
            F(v(T.nom) + " ", 1),
            T.email !== "" ? (i(), f("span", ng, v(T.email), 1)) : b("", !0)
          ]))
        ], !0),
        c("ul", rg, [
          B(T.$slots, "default", {}, void 0, !0),
          c("li", lg, [
            T.logoutUrl !== "" ? (i(), f("a", {
              key: 0,
              id: `${T.id}_item_${O(d) - 1}`,
              class: "fr-btn w-full fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
              role: "menuitem",
              tabindex: "-1",
              href: T.logoutUrl
            }, v(T.logoutLabel), 9, og)) : b("", !0)
          ])
        ])
      ], 42, tg)
    ], 544));
  }
}), ig = /* @__PURE__ */ Ae(sg, [["__scopeId", "data-v-2c51eb4a"]]), ug = Symbol("header"), dg = ["aria-label"], cg = { class: "fr-btns-group" }, Qt = /* @__PURE__ */ S({
  __name: "DsfrCustomHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(a, { emit: t }) {
    const e = t;
    return (n, r) => (i(), f("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      c("ul", cg, [
        (i(!0), f(z, null, U(n.links, (l, o) => (i(), f("li", { key: o }, [
          ee(O(ra), Q({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        B(n.$slots, "default")
      ])
    ], 8, dg));
  }
}), fg = {
  role: "banner",
  class: "fr-header"
}, pg = { class: "fr-header__body" }, mg = { class: "fr-container width-inherit" }, hg = { class: "fr-header__body-row" }, vg = { class: "fr-header__brand fr-enlarge-link" }, gg = { class: "fr-header__brand-top" }, bg = { class: "fr-header__logo" }, yg = {
  key: 0,
  class: "fr-header__operator"
}, kg = ["src", "alt"], wg = {
  key: 1,
  class: "fr-header__navbar"
}, _g = ["aria-label", "title", "data-fr-opened"], xg = ["aria-label", "title"], Dg = {
  key: 0,
  class: "fr-header__service"
}, Tg = { class: "fr-header__service-title" }, Ig = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Eg = {
  key: 0,
  class: "fr-header__service-tagline"
}, Mg = {
  key: 1,
  class: "fr-header__service"
}, Cg = { class: "fr-header__tools" }, Pg = {
  key: 0,
  class: "fr-header__tools-links"
}, Lg = { class: "fr-header__search fr-modal" }, Bg = ["aria-label"], $g = { class: "fr-container" }, Ag = { class: "fr-header__menu-links" }, Sg = {
  key: 1,
  class: "flex justify-center items-center"
}, Og = { class: "fr-header__menu fr-modal" }, Rg = {
  key: 0,
  class: "fr-container"
}, Fg = /* @__PURE__ */ S({
  __name: "DsfrCustomHeader",
  props: {
    searchbarId: { default: "searchbar-header" },
    serviceTitle: { default: void 0 },
    serviceDescription: { default: void 0 },
    homeTo: { default: "/" },
    logoText: { default: () => "Gouvernement" },
    modelValue: { default: "" },
    operatorImgAlt: { default: "" },
    operatorImgSrc: { default: "" },
    operatorImgStyle: { type: [Boolean, null, String, Object, Array], default: () => ({}) },
    placeholder: { default: "Rechercher..." },
    quickLinks: { default: () => [] },
    languageSelector: { default: void 0 },
    searchLabel: { default: "Recherche" },
    quickLinksAriaLabel: { default: "Menu secondaire" },
    showSearch: { type: Boolean },
    showSearchLabel: { default: "Recherche" },
    showBeta: { type: Boolean },
    menuLabel: { default: "Menu" },
    menuModalLabel: { default: "Menu modal" },
    closeMenuModalLabel: { default: "Fermer" },
    homeLabel: { default: "Accueil" }
  },
  emits: ["update:modelValue", "search", "language-select", "on-mounted"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = ot(e, "languageSelector"), l = W(!1), o = W(!1), s = W(!1), u = () => {
      var y;
      s.value = !1, l.value = !1, o.value = !1, (y = document.getElementById("button-menu")) == null || y.focus();
    }, d = (y) => {
      y.key === "Escape" && u();
    };
    be(() => {
      document.addEventListener("keydown", d), n("on-mounted");
    }), Te(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var y;
      s.value = !0, l.value = !0, o.value = !1, (y = document.getElementById("close-button")) == null || y.focus();
    }, m = () => {
      s.value = !0, l.value = !1, o.value = !0;
    }, k = u, E = Kt(), _ = w(() => {
      var y;
      return !!((y = E.operator) != null && y.call(E).length) || !!e.operatorImgSrc;
    }), A = w(() => !!E.mainnav);
    return Oe(ug, () => u), (y, D) => {
      var P, I, M;
      const T = _e("RouterLink");
      return i(), f("header", fg, [
        c("div", pg, [
          c("div", mg, [
            c("div", hg, [
              c("div", vg, [
                c("div", gg, [
                  c("div", bg, [
                    ee(T, {
                      to: y.homeTo,
                      title: `${y.homeLabel} - ${y.serviceTitle}`
                    }, {
                      default: X(() => [
                        ee(O(at), {
                          "logo-text": y.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  _.value ? (i(), f("div", yg, [
                    B(y.$slots, "operator", {}, () => [
                      y.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: y.operatorImgSrc,
                        alt: y.operatorImgAlt,
                        style: xe(y.operatorImgStyle)
                      }, null, 12, kg)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  y.showSearch || A.value || (P = y.quickLinks) != null && P.length ? (i(), f("div", wg, [
                    y.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": y.showSearchLabel,
                      title: y.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: D[0] || (D[0] = J((h) => m(), ["prevent", "stop"]))
                    }, null, 8, _g)) : b("", !0),
                    A.value || (I = y.quickLinks) != null && I.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": y.menuLabel,
                      title: y.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: D[1] || (D[1] = J((h) => p(), ["prevent", "stop"]))
                    }, null, 8, xg)) : b("", !0)
                  ])) : b("", !0)
                ]),
                y.serviceTitle ? (i(), f("div", Dg, [
                  ee(T, Q({
                    to: y.homeTo,
                    title: `${y.homeLabel} - ${y.serviceTitle}`
                  }, y.$attrs), {
                    default: X(() => [
                      c("p", Tg, [
                        F(v(y.serviceTitle) + " ", 1),
                        y.showBeta ? (i(), f("span", Ig, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  y.serviceDescription ? (i(), f("p", Eg, v(y.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !y.serviceTitle && y.showBeta ? (i(), f("div", Mg, D[9] || (D[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", Cg, [
                (M = y.quickLinks) != null && M.length || r.value ? (i(), f("div", Pg, [
                  l.value ? b("", !0) : (i(), V(Qt, {
                    key: 0,
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel
                  }, {
                    default: X(() => [
                      B(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), V(O(nt), Q({ key: 1 }, r.value, {
                    onSelect: D[2] || (D[2] = (h) => n("language-select", h))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                c("div", Lg, [
                  B(y.$slots, "header-search"),
                  y.showSearch ? (i(), V(O(rt), {
                    key: 0,
                    "searchbar-id": y.searchbarId,
                    label: y.searchLabel,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": D[3] || (D[3] = (h) => n("update:modelValue", h)),
                    onSearch: D[4] || (D[4] = (h) => n("search", h))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : b("", !0)
                ])
              ])
            ]),
            y.showSearch || A.value || y.quickLinks && y.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: R(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": y.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", $g, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: D[5] || (D[5] = J((h) => u(), ["prevent", "stop"]))
                }, v(y.closeMenuModalLabel), 1),
                c("div", Ag, [
                  r.value ? (i(), V(O(nt), Q({ key: 0 }, r.value, {
                    onSelect: D[6] || (D[6] = (h) => r.value.currentLanguage = h.codeIso)
                  }), null, 16)) : b("", !0),
                  l.value ? (i(), V(Qt, {
                    key: 1,
                    role: "navigation",
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel,
                    onLinkClick: O(k)
                  }, {
                    default: X(() => [
                      B(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0),
                  B(y.$slots, "header-search")
                ]),
                s.value ? B(y.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : b("", !0),
                o.value ? (i(), f("div", Sg, [
                  ee(O(rt), {
                    "searchbar-id": y.searchbarId,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    "onUpdate:modelValue": D[7] || (D[7] = (h) => n("update:modelValue", h)),
                    onSearch: D[8] || (D[8] = (h) => n("search", h))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, Bg)) : b("", !0),
            B(y.$slots, "default")
          ])
        ]),
        c("div", Og, [
          A.value && !s.value ? (i(), f("div", Rg, [
            B(y.$slots, "mainnav", { hidemodal: u })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), Ng = { class: "fr-table" }, Vg = { class: "fr-table__wrapper" }, jg = { class: "fr-table__container" }, qg = { class: "fr-table__content" }, Hg = ["id"], Wg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Yg = {
  key: 0,
  class: "fr-checkbox-group fr-checkbox-group--sm"
}, Qg = ["id", "checked"], Kg = ["for"], zg = ["tabindex", "onClick", "onKeydown"], Gg = { key: 0 }, Xg = { key: 1 }, Ug = ["data-row-key"], Zg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Jg = { class: "fr-checkbox-group fr-checkbox-group--sm" }, eb = ["id", "value"], tb = ["for"], ab = ["onKeydown"], nb = { key: 0 }, rb = ["colspan"], lb = {
  key: 0,
  class: "fr-mb-0 fr-ml-1v"
}, ob = { class: "flex gap-2 items-center" }, sb = ["selected"], ib = ["value", "selected"], ub = { class: "flex ml-1" }, db = { class: "self-center" }, cb = /* @__PURE__ */ S({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ Le({
    id: { default: () => Fe("table") },
    title: {},
    rowKey: { default: 0 },
    headersRow: {},
    rows: {},
    topActionsRow: { default: () => [] },
    bottomActionsRow: { default: () => [] },
    selectableRows: { type: Boolean },
    showToggleAll: { type: Boolean, default: !0 },
    showNbRows: { type: Boolean, default: !1 },
    sortableRows: { type: [Boolean, Array] },
    sorted: {},
    sortFn: {},
    verticalBorders: { type: Boolean },
    bottomCaption: { type: Boolean },
    noCaption: { type: Boolean },
    pages: {},
    pagination: { type: Boolean },
    paginationOptions: { default: () => [
      5,
      10,
      20
    ] },
    currentPage: { default: 0 },
    rowsPerPage: { default: 10 },
    noResultLabel: {},
    bottomActionBarClass: {},
    paginationWrapperClass: {}
  }, {
    selection: { default: [] },
    selectionModifiers: {},
    rowsPerPage: { default: 10 },
    rowsPerPageModifiers: {},
    currentPage: { default: 1 },
    currentPageModifiers: {},
    sortedBy: { default: void 0 },
    sortedByModifiers: {},
    sortedDesc: { default: !1 },
    sortedDescModifiers: {}
  }),
  emits: /* @__PURE__ */ Le(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: t }) {
    const e = a, n = t, r = we(a, "selection"), l = we(a, "rowsPerPage"), o = we(a, "currentPage"), s = w(() => Math.max(Math.ceil(e.rows.length / l.value), 1)), u = w(() => e.pages ?? Array.from({ length: s.value }).map((h, x) => ({
      label: `${x + 1}`,
      title: `Page ${x + 1}`,
      href: `#${x + 1}`
    }))), d = w(() => o.value * l.value), p = w(() => (o.value + 1) * l.value);
    function m(h, x) {
      const g = k.value;
      return (h[g] ?? h) < (x[g] ?? x) ? -1 : (h[g] ?? h) > (x[g] ?? x) ? 1 : 0;
    }
    const k = we(a, "sortedBy");
    k.value = e.sorted;
    const E = we(a, "sortedDesc");
    function _(h) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(h))) {
        if (k.value === h) {
          if (E.value) {
            k.value = void 0, E.value = !1;
            return;
          }
          E.value = !0;
          return;
        }
        E.value = !1, k.value = h;
      }
    }
    const A = w(() => {
      const h = k.value ? e.rows.slice().sort(e.sortFn ?? m) : e.rows.slice();
      return E.value && h.reverse(), h;
    }), y = w(() => {
      const h = e.headersRow.map((g) => typeof g != "object" ? g : g.key), x = A.value.map((g) => Array.isArray(g) ? g : h.map((H) => g));
      return e.pagination ? x.slice(d.value, p.value) : x;
    });
    function D(h) {
      h && (r.value = y.value.map((x) => x[0][e.rowKey])), r.value.length = 0;
    }
    const T = W(!1);
    function P() {
      T.value = r.value.length === y.value.length;
    }
    function I() {
      n("update:current-page", 0), T.value = !1, r.value.length = 0;
    }
    function M(h) {
      navigator.clipboard.writeText(h);
    }
    return (h, x) => (i(), f("div", Ng, [
      c("div", Vg, [
        c("div", jg, [
          c("div", qg, [
            c("table", { id: h.id }, [
              c("caption", {
                class: R({ "sr-only": h.noCaption })
              }, v(h.title), 3),
              c("thead", null, [
                c("tr", null, [
                  h.selectableRows ? (i(), f("th", Wg, [
                    h.showToggleAll ? (i(), f("div", Yg, [
                      c("input", {
                        id: `table-select--${h.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: x[0] || (x[0] = (g) => D(g.target.checked))
                      }, null, 40, Qg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${h.id}-all`
                      }, " Sélectionner tout ", 8, Kg)
                    ])) : b("", !0)
                  ])) : b("", !0),
                  (i(!0), f(z, null, U(h.headersRow, (g, H) => (i(), f("th", Q({
                    key: typeof g == "object" ? g.key : g,
                    scope: "col",
                    ref_for: !0
                  }, typeof g == "object" && g.headerAttrs, {
                    tabindex: h.sortableRows ? 0 : void 0,
                    onClick: (q) => _(g.key ?? (Array.isArray(h.rows[0]) ? H : g)),
                    onKeydown: [
                      Z((q) => _(g.key ?? g), ["enter"]),
                      Z((q) => _(g.key ?? g), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: R({
                        "sortable-header": h.sortableRows === !0 || Array.isArray(h.sortableRows) && h.sortableRows.includes(g.key ?? g),
                        "fr-sr-only": typeof g == "object" ? g.hideLabel : !1
                      })
                    }, [
                      B(h.$slots, "header", Q({ ref_for: !0 }, typeof g == "object" ? g : { key: g, label: g }), () => [
                        F(v(typeof g == "object" ? g.label : g), 1)
                      ], !0),
                      k.value !== (g.key ?? g) && (h.sortableRows === !0 || Array.isArray(h.sortableRows) && h.sortableRows.includes(g.key ?? g)) ? (i(), f("span", Gg, [
                        ee(O(pe), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : k.value === (g.key ?? g) ? (i(), f("span", Xg, [
                        ee(O(pe), {
                          name: E.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, zg))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, U(y.value, (g, H) => (i(), f("tr", {
                  key: `row-${H}`,
                  "data-row-key": H + 1
                }, [
                  h.selectableRows ? (i(), f("th", Zg, [
                    c("div", Jg, [
                      Be(c("input", {
                        id: `row-select-${h.id}-${H}`,
                        "onUpdate:modelValue": x[1] || (x[1] = (q) => r.value = q),
                        value: g[0][h.rowKey] ?? `row-${H}`,
                        type: "checkbox",
                        onChange: x[2] || (x[2] = (q) => P())
                      }, null, 40, eb), [
                        [lt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${h.id}-${H}`
                      }, " Sélectionner la ligne " + v(H + 1), 9, tb)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(z, null, U(g, (q, C) => (i(), f("td", {
                    key: typeof q == "object" ? q[h.rowKey] : q,
                    onKeydown: [
                      Z(J(($) => M(typeof q == "object" ? q[h.rowKey] : q), ["ctrl"]), ["c"]),
                      Z(J(($) => M(typeof q == "object" ? q[h.rowKey] : q), ["meta"]), ["c"])
                    ]
                  }, [
                    B(h.$slots, "cell", Q({ ref_for: !0 }, {
                      colKey: typeof h.headersRow[C] == "object" ? h.headersRow[C].key : h.headersRow[C],
                      cell: q,
                      idx: H + 1
                    }), () => [
                      F(v(typeof q == "object" ? q[h.rowKey] : q), 1)
                    ], !0)
                  ], 40, ab))), 128))
                ], 8, Ug))), 128)),
                y.value.length === 0 ? (i(), f("tr", nb, [
                  c("td", {
                    colspan: h.selectableRows ? h.headersRow.length + 1 : h.headersRow.length
                  }, v(e.noResultLabel), 9, rb)
                ])) : b("", !0)
              ])
            ], 8, Hg)
          ])
        ])
      ]),
      c("div", {
        class: R(h.bottomActionBarClass)
      }, [
        B(h.$slots, "pagination", {}, () => [
          h.pagination && !h.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: R(["flex justify-between items-center", h.paginationWrapperClass])
          }, [
            h.showNbRows ? (i(), f("p", lb, v(h.rows.length) + " résulat(s)", 1)) : b("", !0),
            c("div", ob, [
              x[6] || (x[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Be(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": x[3] || (x[3] = (g) => l.value = g),
                class: "fr-select",
                onChange: x[4] || (x[4] = (g) => I())
              }, [
                c("option", {
                  value: "",
                  selected: !h.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, sb),
                (i(!0), f(z, null, U(h.paginationOptions, (g, H) => (i(), f("option", {
                  key: H,
                  value: g,
                  selected: +g === l.value
                }, v(g), 9, ib))), 128))
              ], 544), [
                [zt, l.value]
              ])
            ]),
            c("div", ub, [
              c("span", db, "Page " + v(o.value + 1) + " sur " + v(s.value), 1)
            ]),
            ee(O(na), {
              "current-page": o.value,
              "onUpdate:currentPage": x[5] || (x[5] = (g) => o.value = g),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), fb = /* @__PURE__ */ Ae(cb, [["__scopeId", "data-v-9913531f"]]), pb = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], mb = ["for"], hb = {
  key: 0,
  class: "required"
}, vb = {
  key: 0,
  class: "fr-hint-text"
}, gb = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, bb = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrCustomCheckbox",
  props: /* @__PURE__ */ Le({
    id: { default: () => Fe("basic", "checkbox") },
    name: {},
    required: { type: Boolean },
    value: {},
    checked: { type: Boolean },
    modelValue: {},
    small: { type: Boolean },
    inline: { type: Boolean },
    label: { default: "" },
    errorMessage: { default: "" },
    validMessage: { default: "" },
    hint: { default: "" }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = w(() => t.errorMessage || t.validMessage), n = w(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = we(a, "modelValue");
    return (l, o) => (i(), f("div", {
      class: R(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: R(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Be(c("input", Q({
          id: l.id,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => r.value = s),
          name: l.name,
          type: "checkbox",
          value: l.value,
          checked: r.value === !0 || Array.isArray(r.value) && r.value.includes(l.value),
          required: l.required
        }, l.$attrs, {
          "data-testid": `input-checkbox-${l.id}`,
          "data-test": `input-checkbox-${l.id}`
        }), null, 16, pb), [
          [lt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          B(l.$slots, "label", {}, () => [
            F(v(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", hb, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", vb, [
            B(l.$slots, "hint", {}, () => [
              F(v(l.hint), 1)
            ])
          ])) : b("", !0)
        ], 8, mb),
        e.value ? (i(), f("div", gb, [
          c("p", {
            class: R(["fr-message--info flex items-center", n.value])
          }, v(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), yb = ["id"], kb = /* @__PURE__ */ S({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => Fe("tooltip") },
    label: { default: "" },
    noOutline: { type: Boolean },
    secondary: { type: Boolean },
    tertiary: { type: Boolean },
    size: {},
    icon: { default: "" },
    iconRight: { type: Boolean },
    iconOnly: { type: Boolean },
    isLink: { type: Boolean, default: !1 },
    content: {},
    inline: { type: Boolean, default: !1 },
    href: { default: "" }
  },
  setup(a) {
    const t = a, e = W(!1), n = W(null), r = W(null), l = W("0px"), o = W("0px"), s = W("0px"), u = W(!1), d = W(0);
    async function p() {
      var K, ne, te, ie, se, Ie;
      if (typeof document > "u" || !e.value || r.value.matches(":empty"))
        return;
      await new Promise((Ce) => setTimeout(Ce, 100));
      const M = (K = n.value) == null ? void 0 : K.getBoundingClientRect().top, h = (ne = n.value) == null ? void 0 : ne.offsetHeight, x = (te = n.value) == null ? void 0 : te.offsetWidth, g = (ie = n.value) == null ? void 0 : ie.getBoundingClientRect().left, H = (se = r.value) == null ? void 0 : se.offsetHeight, q = (Ie = r.value) == null ? void 0 : Ie.offsetWidth, $ = !(M - H < 0) && M + h + H >= document.documentElement.offsetHeight;
      u.value = $;
      const L = g + x >= document.documentElement.offsetWidth, j = g + x / 2 - q / 2 <= 0;
      o.value = $ ? `${M - H + 8}px` : `${M + h - 8}px`, d.value = 1, l.value = L ? `${g + x - q - 4}px` : j ? `${g + 4}px` : `${g + x / 2 - q / 2}px`, s.value = L ? `${q / 2 - x / 2 + 4}px` : j ? `${-(q / 2) + x / 2 - 4}px` : "0px";
    }
    me(e, p, { immediate: !0 }), be(() => {
      window.addEventListener("scroll", p);
    }), Te(() => {
      window.removeEventListener("scroll", p);
    });
    const m = w(() => ["sm", "small"].includes(t.size)), k = w(() => ["md", "medium"].includes(t.size)), E = w(() => ["lg", "large"].includes(t.size)), _ = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), A = w(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), y = w(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), D = (M) => {
      var h, x;
      e.value && (M.target === n.value || (h = n.value) != null && h.contains(M.target) || M.target === r.value || (x = r.value) != null && x.contains(M.target) || (e.value = !1));
    }, T = (M) => {
      M.key === "Escape" && (e.value = !1);
    };
    be(() => {
      document.documentElement.addEventListener("click", D), document.documentElement.addEventListener("keydown", T);
    }), Te(() => {
      document.documentElement.removeEventListener("click", D), document.documentElement.removeEventListener("keydown", T);
    });
    const P = () => {
      e.value = !0;
    }, I = () => {
      e.value = !1;
    };
    return (M, h) => (i(), f(z, null, [
      (i(), V(ge(M.href !== "" ? "a" : "button"), Q({
        id: `button-${M.id}`,
        ref_key: "source",
        ref: n,
        href: M.href !== "" ? M.href : void 0,
        class: {
          "fr-link": M.isLink && !M.inline,
          "fr-btn": !M.isLink,
          "fr-btn--secondary": M.secondary && !M.tertiary,
          "fr-btn--tertiary": M.tertiary && !M.secondary && !M.noOutline,
          "fr-btn--tertiary-no-outline": M.tertiary && !M.secondary && M.noOutline,
          "fr-btn--sm": m.value,
          "fr-btn--md": k.value,
          "fr-btn--lg": E.value,
          "fr-btn--icon-right": !M.isLink && !M.iconOnly && _.value && M.iconRight,
          "fr-btn--icon-left": !M.isLink && !M.iconOnly && _.value && !M.iconRight,
          "fr-link--icon-right": M.isLink && !M.inline && !M.iconOnly && _.value && M.iconRight,
          "fr-link--icon-left": M.isLink && !M.inline && !M.iconOnly && _.value && !M.iconRight,
          "inline-flex": !_.value,
          reverse: M.iconRight && !_.value,
          "fr-btn--custom-tooltip": M.iconOnly,
          "justify-center": !_.value && M.iconOnly,
          [M.icon]: _.value
        },
        "aria-labelledby": M.id,
        onMouseenter: h[0] || (h[0] = (x) => P()),
        onMouseleave: h[1] || (h[1] = (x) => I()),
        onFocus: h[2] || (h[2] = (x) => P()),
        onBlur: h[3] || (h[3] = (x) => I())
      }, M.$attrs), {
        default: X(() => [
          F(v(M.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-labelledby"])),
      c("p", {
        id: M.id,
        ref_key: "tooltip",
        ref: r,
        class: R(["fr-tooltip fr-placement", y.value]),
        style: xe(A.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        B(M.$slots, "default", {}, () => [
          F(v(M.content), 1)
        ], !0)
      ], 14, yb)
    ], 64));
  }
}), tr = /* @__PURE__ */ Ae(kb, [["__scopeId", "data-v-6caed894"]]), wb = /* @__PURE__ */ S({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (t, e) => (i(), V(tr, Q({ "is-link": !1 }, t.$attrs), {
      default: X(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), _b = /* @__PURE__ */ S({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (t, e) => (i(), V(tr, Q({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: X(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), xb = ["id", "href", "aria-disabled"], Db = /* @__PURE__ */ S({
  __name: "DsfrLink",
  props: {
    id: { default: () => Fe("link") },
    label: { default: "" },
    noOutline: { type: Boolean },
    secondary: { type: Boolean },
    tertiary: { type: Boolean },
    size: {},
    icon: { default: "" },
    iconRight: { type: Boolean },
    iconOnly: { type: Boolean },
    asButton: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    inline: { type: Boolean, default: !1 },
    href: { default: "" }
  },
  setup(a) {
    const t = a, e = w(() => ["sm", "small"].includes(t.size)), n = w(() => ["md", "medium"].includes(t.size)), r = w(() => ["lg", "large"].includes(t.size)), l = w(() => t.asButton ? "btn" : "link"), o = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-"));
    return (s, u) => (i(), f("a", Q({
      id: `link-${s.id}`,
      ref: "source",
      href: s.href !== "" && !s.disabled ? s.href : void 0,
      "aria-disabled": s.disabled,
      class: {
        [`fr-${l.value}`]: !s.inline,
        "fr-btn--secondary": s.secondary && !s.tertiary,
        "fr-btn--tertiary": s.tertiary && !s.secondary && !s.noOutline,
        "fr-btn--tertiary-no-outline": s.tertiary && !s.secondary && s.noOutline,
        [`fr-${l.value}--sm`]: e.value,
        [`fr-${l.value}--md`]: n.value,
        [`fr-${l.value}--lg`]: r.value,
        [`fr-${l.value}--icon-right`]: !s.iconOnly && o.value && s.iconRight,
        [`fr-${l.value}--icon-left`]: !s.iconOnly && o.value && !s.iconRight,
        reverse: s.iconRight && !o.value,
        "fr-btn--custom-tooltip": s.iconOnly,
        "justify-center": !o.value && s.iconOnly,
        [s.icon]: o.value
      }
    }, s.$attrs), [
      B(s.$slots, "default", {}, () => [
        F(v(s.label), 1)
      ], !0)
    ], 16, xb));
  }
}), Tb = /* @__PURE__ */ Ae(Db, [["__scopeId", "data-v-cc8b0ebe"]]), Ib = (a, t) => a.matches ? a.matches(t) : a.msMatchesSelector ? a.msMatchesSelector(t) : a.webkitMatchesSelector ? a.webkitMatchesSelector(t) : null, Eb = (a, t) => {
  let e = a;
  for (; e && e.nodeType === 1; ) {
    if (Ib(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, Mb = (a, t) => a.closest ? a.closest(t) : Eb(a, t), Cb = (a) => !!(a && typeof a.then == "function");
class Pb {
  constructor({
    search: t,
    autoSelect: e = !1,
    setValue: n = () => {
    },
    setAttribute: r = () => {
    },
    onUpdate: l = () => {
    },
    onSubmit: o = () => {
    },
    onShow: s = () => {
    },
    autocorrect: u = !1,
    onHide: d = () => {
    },
    onLoading: p = () => {
    },
    onLoaded: m = () => {
    },
    submitOnEnter: k = !1
  } = {}) {
    N(this, "value", "");
    N(this, "searchCounter", 0);
    N(this, "results", []);
    N(this, "selectedIndex", -1);
    N(this, "selectedResult", null);
    N(this, "destroy", () => {
      this.search = null, this.setValue = null, this.setAttribute = null, this.onUpdate = null, this.onSubmit = null, this.autocorrect = null, this.onShow = null, this.onHide = null, this.onLoading = null, this.onLoaded = null;
    });
    N(this, "handleInput", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    N(this, "handleKeyDown", (t) => {
      const { key: e } = t;
      switch (e) {
        case "Up":
        case "Down":
        case "ArrowUp":
        case "ArrowDown": {
          const n = e === "ArrowUp" || e === "Up" ? this.selectedIndex - 1 : this.selectedIndex + 1;
          t.preventDefault(), this.handleArrows(n);
          break;
        }
        case "Tab": {
          this.selectResult();
          break;
        }
        case "Enter": {
          const n = t.target.getAttribute("aria-activedescendant").length > 0;
          this.selectedResult = this.results[this.selectedIndex] || this.selectedResult, this.selectResult(), this.submitOnEnter ? this.selectedResult && this.onSubmit(this.selectedResult) : n ? t.preventDefault() : (this.selectedResult && this.onSubmit(this.selectedResult), this.selectedResult = null);
          break;
        }
        case "Esc":
        case "Escape": {
          this.hideResults(), this.setValue();
          break;
        }
        default:
          return;
      }
    });
    N(this, "handleFocus", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    N(this, "handleBlur", () => {
      this.hideResults();
    });
    // The mousedown event fires before the blur event. Calling preventDefault() when
    // the results list is clicked will prevent it from taking focus, firing the
    // blur event on the input element, and closing the results list before click fires.
    N(this, "handleResultMouseDown", (t) => {
      t.preventDefault();
    });
    N(this, "handleResultClick", (t) => {
      const { target: e } = t, n = Mb(e, "[data-result-index]");
      if (n) {
        this.selectedIndex = parseInt(n.dataset.resultIndex, 10);
        const r = this.results[this.selectedIndex];
        this.selectResult(), this.onSubmit(r);
      }
    });
    N(this, "handleArrows", (t) => {
      const e = this.results.length;
      this.selectedIndex = (t % e + e) % e, this.onUpdate(this.results, this.selectedIndex);
    });
    N(this, "selectResult", () => {
      const t = this.results[this.selectedIndex];
      t && this.setValue(t), this.hideResults();
    });
    N(this, "updateResults", (t) => {
      const e = ++this.searchCounter;
      this.onLoading(), this.search(t).then((n) => {
        if (e === this.searchCounter) {
          if (this.results = n, this.onLoaded(), this.results.length === 0) {
            this.hideResults();
            return;
          }
          this.selectedIndex = this.autoSelect ? 0 : -1, this.onUpdate(this.results, this.selectedIndex), this.showResults();
        }
      });
    });
    N(this, "showResults", () => {
      this.setAttribute("aria-expanded", !0), this.onShow();
    });
    N(this, "hideResults", () => {
      this.selectedIndex = -1, this.results = [], this.setAttribute("aria-expanded", !1), this.setAttribute("aria-activedescendant", ""), this.onUpdate(this.results, this.selectedIndex), this.onHide();
    });
    // Make sure selected result isn't scrolled out of view
    N(this, "checkSelectedResultVisible", (t) => {
      const e = t.querySelector(
        `[data-result-index="${this.selectedIndex}"]`
      );
      if (!e)
        return;
      const n = t.getBoundingClientRect(), r = e.getBoundingClientRect();
      r.top < n.top ? t.scrollTop -= n.top - r.top : r.bottom > n.bottom && (t.scrollTop += r.bottom - n.bottom);
    });
    this.search = Cb(t) ? t : (E) => Promise.resolve(t(E)), this.autoSelect = e, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = o, this.autocorrect = u, this.onShow = s, this.onHide = d, this.onLoading = p, this.onLoaded = m, this.submitOnEnter = k;
  }
}
const Lb = (a, t) => {
  const e = a.getBoundingClientRect(), n = t.getBoundingClientRect();
  return /* 1 */ e.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - n.height > 0 ? "above" : "below";
}, Bb = (a, t, e) => {
  let n;
  return function() {
    const l = this, o = arguments, s = function() {
      n = null, a.apply(l, o);
    };
    clearTimeout(n), n = setTimeout(s, t);
  };
}, $b = (a) => {
  if (a != null && a.length) {
    const t = a.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? a.substring(1) : a
    };
  }
}, Ab = {
  name: "Autocomplete",
  inheritAttrs: !1,
  props: {
    search: {
      type: Function,
      required: !0
    },
    baseClass: {
      type: String,
      default: "autocomplete"
    },
    autoSelect: {
      type: Boolean,
      default: !1
    },
    getResultValue: {
      type: Function,
      default: (a) => a
    },
    defaultValue: {
      type: String,
      default: ""
    },
    debounceTime: {
      type: Number,
      default: 0
    },
    resultListLabel: {
      type: String,
      default: void 0
    },
    submitOnEnter: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update", "submit"],
  data() {
    const a = new Pb({
      search: this.search,
      autoSelect: this.autoSelect,
      setValue: this.setValue,
      onUpdate: this.handleUpdate,
      onSubmit: this.handleSubmit,
      onShow: this.handleShow,
      onHide: this.handleHide,
      onLoading: this.handleLoading,
      onLoaded: this.handleLoaded,
      submitOnEnter: this.submitOnEnter
    });
    return this.debounceTime > 0 && (a.handleInput = Bb(a.handleInput, this.debounceTime)), {
      core: a,
      value: this.defaultValue,
      resultListId: `${this.baseClass}-result-list-${pr()}`,
      results: [],
      selectedIndex: -1,
      expanded: !1,
      loading: !1,
      position: "below",
      resetPosition: !0
    };
  },
  computed: {
    rootProps() {
      return {
        class: this.baseClass,
        style: { position: "relative" },
        "data-expanded": this.expanded,
        "data-loading": this.loading,
        "data-position": this.position
      };
    },
    inputProps() {
      const {
        class: a,
        style: t,
        ...e
      } = this.$attrs;
      return {
        class: `${this.baseClass}-input`,
        value: this.value,
        role: "combobox",
        autocomplete: "off",
        autocapitalize: "off",
        autocorrect: "off",
        spellcheck: "false",
        "aria-autocomplete": "list",
        "aria-haspopup": "listbox",
        "aria-owns": this.resultListId,
        "aria-expanded": this.expanded ? "true" : "false",
        "aria-activedescendant": this.selectedIndex > -1 ? this.resultProps[this.selectedIndex].id : "",
        ...e
      };
    },
    inputListeners() {
      return {
        input: this.handleInput,
        keydown: this.core.handleKeyDown,
        focus: this.core.handleFocus,
        blur: this.core.handleBlur
      };
    },
    resultListProps() {
      const a = this.position === "below" ? "top" : "bottom", t = $b(this.resultListLabel);
      return {
        id: this.resultListId,
        class: `${this.baseClass}-result-list`,
        role: "listbox",
        [t == null ? void 0 : t.attribute]: t == null ? void 0 : t.content,
        style: {
          position: "absolute",
          zIndex: 1,
          width: "100%",
          visibility: this.expanded ? "visible" : "hidden",
          pointerEvents: this.expanded ? "auto" : "none",
          [a]: "100%"
        }
      };
    },
    resultListListeners() {
      return {
        mousedown: this.core.handleResultMouseDown,
        click: this.core.handleResultClick
      };
    },
    resultProps() {
      return this.results.map((a, t) => ({
        id: `${this.baseClass}-result-${t}`,
        class: `${this.baseClass}-result`,
        "data-result-index": t,
        role: "option",
        ...this.selectedIndex === t ? { "aria-selected": "true" } : {}
      }));
    }
  },
  mounted() {
    document.body.addEventListener("click", this.handleDocumentClick);
  },
  beforeUnmount() {
    document.body.removeEventListener("click", this.handleDocumentClick);
  },
  updated() {
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Lb(
      this.$refs.input,
      this.$refs.resultList
    )), this.core.checkSelectedResultVisible(this.$refs.resultList));
  },
  methods: {
    setValue(a) {
      this.value = a ? this.getResultValue(a) : "";
    },
    handleUpdate(a, t) {
      this.results = a, this.selectedIndex = t, this.$emit("update", a, t);
    },
    handleShow() {
      this.expanded = !0;
    },
    handleHide() {
      this.expanded = !1, this.resetPosition = !0;
    },
    handleLoading() {
      this.loading = !0;
    },
    handleLoaded() {
      this.loading = !1;
    },
    handleInput(a) {
      this.value = a.target.value, this.core.handleInput(a);
    },
    handleSubmit(a) {
      this.$emit("submit", a);
    },
    handleDocumentClick(a) {
      this.$refs.root.contains(a.target) || this.core.hideResults();
    }
  }
};
function Sb(a, t, e, n, r, l) {
  return i(), f("div", Q({ ref: "root" }, {
    class: a.$attrs.class,
    ...a.$attrs.style ? { style: a.$attrs.style } : {}
  }), [
    B(a.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      c("div", De(yt(l.rootProps)), [
        c("input", Q({ ref: "input" }, l.inputProps, {
          onInput: t[0] || (t[0] = (...o) => l.handleInput && l.handleInput(...o)),
          onKeydown: t[1] || (t[1] = (...o) => r.core.handleKeyDown && r.core.handleKeyDown(...o)),
          onFocus: t[2] || (t[2] = (...o) => r.core.handleFocus && r.core.handleFocus(...o)),
          onBlur: t[3] || (t[3] = (...o) => r.core.handleBlur && r.core.handleBlur(...o))
        }), null, 16),
        c("ul", Q({ ref: "resultList" }, l.resultListProps, mr(l.resultListListeners, !0)), [
          (i(!0), f(z, null, U(r.results, (o, s) => B(a.$slots, "result", {
            result: o,
            props: l.resultProps[s]
          }, () => [
            (i(), f("li", Q({
              key: l.resultProps[s].id,
              ref_for: !0
            }, l.resultProps[s]), v(e.getResultValue(o)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Ob = /* @__PURE__ */ Ae(Ab, [["render", Sb]]);
var Rb = {
  install: function(a, t) {
    a.use(em), a.component("RouterLink", ov), a.component("DsfrFacets", Iv), a.component("DsfrSelectMultiple", Jv), a.component("DsfrMenu", Lv), a.component("DsfrMenuLink", Sv), a.component("DsfrHeaderMenu", ig), a.component("DsfrCustomHeader", Fg), a.component("DsfrCustomHeaderMenuLinks", Qt), a.component("DsfrCustomDataTable", fb), a.component("DsfrCustomCheckbox", bb), a.component("DsfrButtonTooltip", wb), a.component("DsfrLinkTooltip", _b), a.component("DsfrLink", Tb), a.component("autocomplete", Ob);
  },
  methods: ev,
  utils: rv
};
window && (window.DSFR = Rb);
export {
  Rb as default
};
//# sourceMappingURL=dsfr.es.js.map
