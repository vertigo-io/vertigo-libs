var nr = Object.defineProperty;
var rr = (a, t, e) => t in a ? nr(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var V = (a, t, e) => rr(a, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as O, ref as K, computed as w, onMounted as be, watch as pe, onUnmounted as Te, Comment as lr, cloneVNode as or, h as da, openBlock as i, createElementBlock as f, normalizeClass as A, createElementVNode as c, withModifiers as te, createTextVNode as N, toDisplayString as h, unref as H, Fragment as G, renderList as J, createVNode as ee, withKeys as ne, withCtx as U, createBlock as W, resolveDynamicComponent as ve, mergeProps as Q, createCommentVNode as g, mergeModels as $e, useModel as we, withDirectives as Pe, vModelCheckbox as bt, renderSlot as B, inject as Ke, toRef as lt, provide as Re, resolveComponent as _e, useCssVars as Ya, nextTick as Ka, normalizeStyle as xe, normalizeProps as De, guardReactiveProps as yt, useAttrs as sr, useSlots as Qt, hasInjectionContext as ir, reactive as ur, Teleport as dr, vModelSelect as zt, onBeforeUnmount as cr, Transition as fr, vShow as pr, useId as Qa, vModelText as ca, toHandlers as mr } from "vue";
const Gt = Symbol("accordions"), Xt = Symbol("header"), kt = Symbol("tabs"), Be = () => {
  const a = K(), t = K(!1), e = K(!1), n = () => {
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
}, hr = "abcdefghijklmnopqrstuvwyz0123456789", fa = hr.repeat(10), vr = () => {
  const a = Math.floor(Math.random() * fa.length);
  return fa[a];
}, gr = (a) => Array.from({ length: a }).map(vr).join(""), oe = (a = "", t = "") => (a ? `${a}-` : "") + gr(5) + (t ? `-${t}` : ""), br = { class: "fr-accordion" }, yr = ["aria-expanded", "aria-controls"], kr = ["id"], wr = /* @__PURE__ */ O({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => oe("accordion") },
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
    } = Be(), s = K(), u = Ke(Gt), { isActive: d, expand: p } = (u == null ? void 0 : u(lt(() => t.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return be(() => {
      d.value && l(!0);
    }), pe(d, (m, D) => {
      m !== D && l(m);
    }), (m, D) => (i(), f("section", br, [
      (i(), W(ve(m.titleTag), { class: "fr-accordion__title" }, {
        default: U(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": H(d),
            "aria-controls": m.id,
            type: "button",
            onClick: D[0] || (D[0] = (C) => H(p)())
          }, [
            B(m.$slots, "title", {}, () => [
              N(h(m.title), 1)
            ])
          ], 8, yr)
        ]),
        _: 3
      })),
      c("div", {
        id: m.id,
        ref_key: "collapse",
        ref: e,
        class: A(["fr-collapse", {
          "fr-collapse--expanded": H(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": H(n)
        }]),
        onTransitionend: D[1] || (D[1] = (C) => H(o)(H(d)))
      }, [
        B(m.$slots, "default")
      ], 42, kr)
    ]));
  }
}), _r = { class: "fr-accordions-group" }, xr = /* @__PURE__ */ O({
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
    }), l = K(/* @__PURE__ */ new Map()), o = K(0);
    return Re(Gt, (s) => {
      const u = o.value++;
      l.value.set(u, s.value);
      const d = w(() => u === r.value);
      pe(s, () => {
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
}), Dr = ["id", "role"], Tr = ["title", "aria-label"], Ir = /* @__PURE__ */ O({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => oe("basic", "alert") },
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
    return (o, s) => o.closed ? g("", !0) : (i(), f("div", {
      key: 0,
      id: o.id,
      class: A(["fr-alert", l.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? g("", !0) : (i(), W(ve(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: U(() => [
          N(h(o.title), 1)
        ]),
        _: 1
      })),
      B(o.$slots, "default", {}, () => [
        N(h(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: r
      }, null, 8, Tr)) : g("", !0)
    ], 10, Dr));
  }
}), Cr = /* @__PURE__ */ O({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(a) {
    return (t, e) => (i(), f("a", {
      class: A(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, h(t.label), 3));
  }
}), Er = ["title"], za = /* @__PURE__ */ O({
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
      class: A(["fr-badge", {
        [`fr-badge--${t.type}`]: t.type,
        "fr-badge--no-icon": t.noIcon,
        "fr-badge--sm": t.small
      }]),
      title: t.ellipsis ? t.label : void 0
    }, [
      c("span", {
        class: A(t.ellipsis ? "fr-ellipsis" : "")
      }, h(t.label), 3)
    ], 10, Er));
  }
}), Mr = ["aria-label"], Pr = ["aria-expanded", "aria-controls"], Lr = ["id"], $r = { class: "fr-breadcrumb__list" }, Br = ["aria-current"], Sr = /* @__PURE__ */ O({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => oe("breadcrumb") },
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
    } = Be(), o = K(!1);
    return pe(o, (s, u) => {
      s !== u && r(s);
    }), (s, u) => {
      const d = _e("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        o.value ? g("", !0) : (i(), f("button", {
          key: 0,
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => o.value = !o.value)
        }, h(s.showBreadcrumbLabel), 9, Pr)),
        c("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: t,
          class: A(["fr-collapse", {
            "fr-collapse--expanded": H(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": H(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => H(l)(o.value))
        }, [
          c("ol", $r, [
            (i(!0), f(G, null, J(s.links, (p, m) => (i(), f("li", {
              key: m,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), W(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": m === s.links.length - 1 ? "page" : void 0
              }, {
                default: U(() => [
                  N(h(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : g("", !0),
              p.to ? g("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === s.links.length - 1 ? "page" : void 0
              }, h(p.text), 9, Br))
            ]))), 128))
          ])
        ], 42, Lr)
      ], 8, Mr);
    };
  }
}), Ga = /^[a-z0-9]+(-[a-z0-9]+)*$/, wt = (a, t, e, n = "") => {
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
    return t && !ut(d) ? null : d;
  }
  const l = r[0], o = l.split("-");
  if (o.length > 1) {
    const s = {
      provider: n,
      prefix: o.shift(),
      name: o.join("-")
    };
    return t && !ut(s) ? null : s;
  }
  if (e && n === "") {
    const s = {
      provider: n,
      prefix: "",
      name: l
    };
    return t && !ut(s, e) ? null : s;
  }
  return null;
}, ut = (a, t) => a ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && a.prefix === "" || a.prefix) && a.name) : !1, Xa = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), ct = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), _t = Object.freeze({
  ...Xa,
  ...ct
}), $t = Object.freeze({
  ..._t,
  body: "",
  hidden: !1
});
function Ar(a, t) {
  const e = {};
  !a.hFlip != !t.hFlip && (e.hFlip = !0), !a.vFlip != !t.vFlip && (e.vFlip = !0);
  const n = ((a.rotate || 0) + (t.rotate || 0)) % 4;
  return n && (e.rotate = n), e;
}
function pa(a, t) {
  const e = Ar(a, t);
  for (const n in $t)
    n in ct ? n in a && !(n in e) && (e[n] = ct[n]) : n in t ? e[n] = t[n] : n in a && (e[n] = a[n]);
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
    l = pa(
      n[s] || r[s],
      l
    );
  }
  return o(t), e.forEach(o), pa(a, l);
}
function Ua(a, t) {
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
  ...Xa
};
function Et(a, t) {
  for (const e in t)
    if (e in a && typeof a[e] != typeof t[e])
      return !1;
  return !0;
}
function Za(a) {
  if (typeof a != "object" || a === null)
    return null;
  const t = a;
  if (typeof t.prefix != "string" || !a.icons || typeof a.icons != "object" || !Et(a, Fr))
    return null;
  const e = t.icons;
  for (const r in e) {
    const l = e[r];
    if (
      // Name cannot be empty
      !r || // Must have body
      typeof l.body != "string" || // Check other props
      !Et(
        l,
        $t
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
      !Et(
        l,
        $t
      )
    )
      return null;
  }
  return t;
}
const ma = /* @__PURE__ */ Object.create(null);
function Nr(a, t) {
  return {
    provider: a,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function je(a, t) {
  const e = ma[a] || (ma[a] = /* @__PURE__ */ Object.create(null));
  return e[t] || (e[t] = Nr(a, t));
}
function Ut(a, t) {
  return Za(t) ? Ua(t, (e, n) => {
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
function Ja(a) {
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
    return Za(a) && (a.prefix = "", Ua(a, (l, o) => {
      qr(l, o) && (r = !0);
    })), r;
  }
  const e = a.prefix;
  if (!ut({
    provider: t,
    prefix: e,
    name: "a"
  }))
    return !1;
  const n = je(t, e);
  return !!Ut(n, a);
}
const en = Object.freeze({
  width: null,
  height: null
}), tn = Object.freeze({
  // Dimensions
  ...en,
  // Transformations
  ...ct
}), Wr = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Yr = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ha(a, t, e) {
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
function Kr(a, t = "defs") {
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
function Qr(a, t) {
  return a ? "<defs>" + a + "</defs>" + t : t;
}
function zr(a, t, e) {
  const n = Kr(a);
  return Qr(n.defs, t + n.content + e);
}
const Gr = (a) => a === "unset" || a === "undefined" || a === "none";
function Xr(a, t) {
  const e = {
    ..._t,
    ...a
  }, n = {
    ...tn,
    ...t
  }, r = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  let l = e.body;
  [e, n].forEach(($) => {
    const y = [], x = $.hFlip, T = $.vFlip;
    let P = $.rotate;
    x ? T ? P += 2 : (y.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), y.push("scale(-1 1)"), r.top = r.left = 0) : T && (y.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), y.push("scale(1 -1)"), r.top = r.left = 0);
    let v;
    switch (P < 0 && (P -= Math.floor(P / 4) * 4), P = P % 4, P) {
      case 1:
        v = r.height / 2 + r.top, y.unshift(
          "rotate(90 " + v.toString() + " " + v.toString() + ")"
        );
        break;
      case 2:
        y.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        v = r.width / 2 + r.left, y.unshift(
          "rotate(-90 " + v.toString() + " " + v.toString() + ")"
        );
        break;
    }
    P % 2 === 1 && (r.left !== r.top && (v = r.left, r.left = r.top, r.top = v), r.width !== r.height && (v = r.width, r.width = r.height, r.height = v)), y.length && (l = zr(
      l,
      '<g transform="' + y.join(" ") + '">',
      "</g>"
    ));
  });
  const o = n.width, s = n.height, u = r.width, d = r.height;
  let p, m;
  o === null ? (m = s === null ? "1em" : s === "auto" ? d : s, p = ha(m, u / d)) : (p = o === "auto" ? u : o, m = s === null ? ha(p, d / u) : s === "auto" ? d : s);
  const D = {}, C = ($, y) => {
    Gr(y) || (D[$] = y.toString());
  };
  C("width", p), C("height", m);
  const k = [r.left, r.top, u, d];
  return D.viewBox = k.join(" "), {
    attributes: D,
    viewBox: k,
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
const Bt = /* @__PURE__ */ Object.create(null);
function tl(a, t) {
  Bt[a] = t;
}
function St(a) {
  return Bt[a] || Bt[""];
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
const Jt = /* @__PURE__ */ Object.create(null), ot = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], At = [];
for (; ot.length > 0; )
  ot.length === 1 || Math.random() > 0.5 ? At.push(ot.shift()) : At.push(ot.pop());
Jt[""] = Zt({
  resources: ["https://api.iconify.design"].concat(At)
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
let va = nl();
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
  if (!va) {
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
  va(a + n).then((l) => {
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
function an(a, t) {
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
      }), o.pending.length !== s && (e || an([a], l.id), l.callback(
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
  const n = fl++, r = an.bind(null, e, n);
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
    let _ = a.resources.slice(0);
    for (o = []; _.length > 1; ) {
      const M = Math.floor(Math.random() * _.length);
      o.push(_[M]), _ = _.slice(0, M).concat(_.slice(M + 1));
    }
    o = o.concat(_);
  } else
    o = a.resources.slice(l).concat(a.resources.slice(0, l));
  const s = Date.now();
  let u = "pending", d = 0, p, m = null, D = [], C = [];
  typeof n == "function" && C.push(n);
  function k() {
    m && (clearTimeout(m), m = null);
  }
  function $() {
    u === "pending" && (u = "aborted"), k(), D.forEach((_) => {
      _.status === "pending" && (_.status = "aborted");
    }), D = [];
  }
  function y(_, M) {
    M && (C = []), typeof _ == "function" && C.push(_);
  }
  function x() {
    return {
      startTime: s,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: D.length,
      subscribe: y,
      abort: $
    };
  }
  function T() {
    u = "failed", C.forEach((_) => {
      _(void 0, p);
    });
  }
  function P() {
    D.forEach((_) => {
      _.status === "pending" && (_.status = "aborted");
    }), D = [];
  }
  function v(_, M, I) {
    const E = M !== "success";
    switch (D = D.filter((j) => j !== _), u) {
      case "pending":
        break;
      case "failed":
        if (E || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (M === "abort") {
      p = I, T();
      return;
    }
    if (E) {
      p = I, D.length || (o.length ? R() : T());
      return;
    }
    if (k(), P(), !a.random) {
      const j = a.resources.indexOf(_.resource);
      j !== -1 && j !== a.index && (a.index = j);
    }
    u = "completed", C.forEach((j) => {
      j(I);
    });
  }
  function R() {
    if (u !== "pending")
      return;
    k();
    const _ = o.shift();
    if (_ === void 0) {
      if (D.length) {
        m = setTimeout(() => {
          k(), u === "pending" && (P(), T());
        }, a.timeout);
        return;
      }
      T();
      return;
    }
    const M = {
      status: "pending",
      resource: _,
      callback: (I, E) => {
        v(M, I, E);
      }
    };
    D.push(M), d++, m = setTimeout(R, a.rotate), e(_, t, M.callback);
  }
  return setTimeout(R), x;
}
function nn(a) {
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
function ga() {
}
const Mt = /* @__PURE__ */ Object.create(null);
function gl(a) {
  if (!Mt[a]) {
    const t = ea(a);
    if (!t)
      return;
    const e = nn(t), n = {
      config: t,
      redundancy: e
    };
    Mt[a] = n;
  }
  return Mt[a];
}
function bl(a, t, e) {
  let n, r;
  if (typeof a == "string") {
    const l = St(a);
    if (!l)
      return e(void 0, 424), ga;
    r = l.send;
    const o = gl(a);
    o && (n = o.redundancy);
  } else {
    const l = Zt(a);
    if (l) {
      n = nn(l);
      const o = a.resources ? a.resources[0] : "", s = St(o);
      s && (r = s.send);
    }
  }
  return !n || !r ? (e(void 0, 424), ga) : n.query(t, r, e)().abort;
}
const ba = "iconify2", tt = "iconify", rn = tt + "-count", ya = tt + "-version", ln = 36e5, yl = 168, kl = 50;
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
function ka(a, t) {
  try {
    a.removeItem(t);
  } catch {
  }
}
function Rt(a, t) {
  return ta(a, rn, t.toString());
}
function Ft(a) {
  return parseInt(Ot(a, rn)) || 0;
}
const xt = {
  local: !0,
  session: !0
}, on = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let aa = !1;
function wl(a) {
  aa = a;
}
let st = typeof window > "u" ? {} : window;
function sn(a) {
  const t = a + "Storage";
  try {
    if (st && st[t] && typeof st[t].length == "number")
      return st[t];
  } catch {
  }
  xt[a] = !1;
}
function un(a, t) {
  const e = sn(a);
  if (!e)
    return;
  const n = Ot(e, ya);
  if (n !== ba) {
    if (n) {
      const s = Ft(e);
      for (let u = 0; u < s; u++)
        ka(e, tt + u.toString());
    }
    ta(e, ya, ba), Rt(e, 0);
    return;
  }
  const r = Math.floor(Date.now() / ln) - yl, l = (s) => {
    const u = tt + s.toString(), d = Ot(e, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > r && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        t(p, s))
          return !0;
      } catch {
      }
      ka(e, u);
    }
  };
  let o = Ft(e);
  for (let s = o - 1; s >= 0; s--)
    l(s) || (s === o - 1 ? (o--, Rt(e, o)) : on[a].add(s));
}
function dn() {
  if (!aa) {
    wl(!0);
    for (const a in xt)
      un(a, (t) => {
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
      un(n, (r) => {
        const l = r.data;
        return r.provider !== a.provider || l.prefix !== a.prefix || l.lastModified === t;
      });
  return !0;
}
function xl(a, t) {
  aa || dn();
  function e(n) {
    let r;
    if (!xt[n] || !(r = sn(n)))
      return;
    const l = on[n];
    let o;
    if (l.size)
      l.delete(o = Array.from(l).shift());
    else if (o = Ft(r), o >= kl || !Rt(r, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / ln),
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
function wa() {
}
function Dl(a) {
  a.iconsLoaderFlag || (a.iconsLoaderFlag = !0, setTimeout(() => {
    a.iconsLoaderFlag = !1, cl(a);
  }));
}
function Tl(a) {
  const t = [], e = [];
  return a.forEach((n) => {
    (n.match(Ga) ? t : e).push(n);
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
function _a(a, t) {
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
      _a(
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
        _a(p, (m) => {
          const D = m ? {
            prefix: n,
            icons: {
              [d]: m
            }
          } : null;
          Ge(a, [d], D, !1);
        });
      });
      return;
    }
    const { valid: o, invalid: s } = Tl(r);
    if (s.length && Ge(a, s, null, !1), !o.length)
      return;
    const u = n.match(Ga) ? St(e) : null;
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
const Cl = (a, t) => {
  const e = ml(a, !0, Ja()), n = dl(e);
  if (!n.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        n.loaded,
        n.missing,
        n.pending,
        wa
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
    const { provider: d, prefix: p, name: m } = u, D = je(d, p), C = D.pendingIcons || (D.pendingIcons = /* @__PURE__ */ new Set());
    C.has(m) || (C.add(m), r[d][p].push(m));
  }), l.forEach((u) => {
    const d = r[u.provider][u.prefix];
    d.length && Il(u, d);
  }), t ? pl(t, n, l) : wa;
};
function El(a, t) {
  const e = {
    ...a
  };
  for (const n in t) {
    const r = t[n], l = typeof r;
    n in en ? (r === null || r && (l === "string" || l === "number")) && (e[n] = r) : l === typeof e[n] && (e[n] = n === "rotate" ? r % 4 : r);
  }
  return e;
}
const Ml = /[\s,]+/;
function Pl(a, t) {
  t.split(Ml).forEach((e) => {
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
function $l(a, t) {
  let e = a.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in t)
    e += " " + n + '="' + t[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + a + "</svg>";
}
function Bl(a) {
  return a.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Sl(a) {
  return "data:image/svg+xml," + Bl(a);
}
function Al(a) {
  return 'url("' + Sl(a) + '")';
}
const xa = {
  ...tn,
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
}, cn = {
  backgroundColor: "transparent"
}, Da = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Ta = {
  webkitMask: Nt,
  mask: Nt,
  background: cn
};
for (const a in Ta) {
  const t = Ta[a];
  for (const e in Da)
    t[a + e] = Da[e];
}
const dt = {};
["horizontal", "vertical"].forEach((a) => {
  const t = a.slice(0, 1) + "Flip";
  dt[a + "-flip"] = t, dt[a.slice(0, 1) + "-flip"] = t, dt[a + "Flip"] = t;
});
function Ia(a) {
  return a + (a.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ca = (a, t) => {
  const e = El(xa, t), n = { ...Ol }, r = t.mode || "svg", l = {}, o = t.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
  for (let $ in t) {
    const y = t[$];
    if (y !== void 0)
      switch ($) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          e[$] = y === !0 || y === "true" || y === 1;
          break;
        case "flip":
          typeof y == "string" && Pl(e, y);
          break;
        case "color":
          l.color = y;
          break;
        case "rotate":
          typeof y == "string" ? e[$] = Ll(y) : typeof y == "number" && (e[$] = y);
          break;
        case "ariaHidden":
        case "aria-hidden":
          y !== !0 && y !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const x = dt[$];
          x ? (y === !0 || y === "true" || y === 1) && (e[x] = !0) : xa[$] === void 0 && (n[$] = y);
        }
      }
  }
  const u = Xr(a, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...s
    }, Object.assign(n, d);
    let $ = 0, y = t.id;
    return typeof y == "string" && (y = y.replace(/-/g, "_")), n.innerHTML = el(u.body, y ? () => y + "ID" + $++ : "iconifyVue"), da("svg", n);
  }
  const { body: p, width: m, height: D } = a, C = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), k = $l(p, {
    ...d,
    width: m + "",
    height: D + ""
  });
  return n.style = {
    ...l,
    "--svg": Al(k),
    width: Ia(d.width),
    height: Ia(d.height),
    ...Rl,
    ...C ? Nt : cn,
    ...s
  }, da("span", n);
};
Ja(!0);
tl("", ul);
if (typeof document < "u" && typeof window < "u") {
  dn();
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
}, Nl = O({
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
          abort: Cl([n], () => {
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
      return Ca(Fl, a);
    let e = a;
    return t.classes && (e = {
      ...a,
      class: (typeof a.class == "string" ? a.class + " " : "") + t.classes.join(" ")
    }), Ca({
      ..._t,
      ...t.data
    }, e);
  }
}), Vl = /* @__PURE__ */ O({
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
    const t = a, e = K(null), n = w(() => `${+t.scale * 1.2}rem`), r = w(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    pe(() => t.title, l);
    async function l() {
      var u, d, p, m;
      if (!((u = e.value) != null && u.$el))
        return;
      const D = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), C = document.createElement("title");
      if (!t.title) {
        C.remove();
        return;
      }
      C.innerHTML = t.title, await Ka(), D || (m = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || m.before(C);
    }
    be(l);
    const o = w(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), s = w(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), W(H(Nl), {
      ref_key: "icon",
      ref: e,
      icon: o.value,
      style: xe({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: A(["vicon", {
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
}, ge = /* @__PURE__ */ ke(Vl, [["__scopeId", "data-v-73a1cd7e"]]), jl = ["title", "disabled", "aria-disabled"], ql = { key: 1 }, Hl = /* @__PURE__ */ O({
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
    const e = a, n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["md", "medium"].includes(e.size)), l = w(() => ["lg", "large"].includes(e.size)), o = K(null);
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
      class: A(["fr-btn", {
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
      onClick: m[0] || (m[0] = (D) => p.onClick ? p.onClick(D) : () => {
      })
    }, [
      p.icon && !s.value ? (i(), W(ge, De(Q({ key: 0 }, d.value)), null, 16)) : g("", !0),
      p.iconOnly ? g("", !0) : (i(), f("span", ql, [
        N(h(p.label) + " ", 1),
        B(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, jl));
  }
}), qe = /* @__PURE__ */ ke(Hl, [["__scopeId", "data-v-118397f5"]]), Dt = /* @__PURE__ */ O({
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
    const t = a, e = K(null), n = w(() => ["sm", "small"].includes(t.size)), r = w(() => ["md", "medium"].includes(t.size)), l = w(() => ["lg", "large"].includes(t.size)), o = w(() => ["always", "", !0].includes(t.inlineLayoutWhen)), s = w(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = w(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = w(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = w(() => t.align === "center"), m = w(() => t.align === "right"), D = K("auto"), C = w(() => `--equisized-width: ${D.value};`), k = async () => {
      var $;
      let y = 0;
      await new Promise((x) => setTimeout(x, 100)), ($ = e.value) == null || $.querySelectorAll(".fr-btn").forEach((x) => {
        const T = x, P = T.offsetWidth, v = window.getComputedStyle(T), R = +v.marginLeft.replace("px", ""), _ = +v.marginRight.replace("px", "");
        T.style.width = "var(--equisized-width)";
        const M = P + R + _;
        M > y && (y = M);
      }), D.value = `${y}px`;
    };
    return be(async () => {
      !e.value || !t.equisized || await k();
    }), ($, y) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: xe(C.value),
      class: A(["fr-btns-group", {
        "fr-btns-group--equisized": $.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || u.value,
        "fr-btns-group--inline-lg": o.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": $.iconRight,
        "fr-btns-group--inline-reverse": $.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(G, null, J($.buttons, ({ onClick: x, ...T }, P) => (i(), f("li", { key: P }, [
        ee(qe, Q({ ref_for: !0 }, T, { onClick: x }), null, 16, ["onClick"])
      ]))), 128)),
      B($.$slots, "default")
    ], 6));
  }
}), Wl = {
  key: 2,
  class: "fr-callout__text"
}, Yl = {
  key: 4,
  class: "fr-callout__text"
}, Kl = /* @__PURE__ */ O({
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
      class: A(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && n.value ? (i(), W(ge, De(Q({ key: 0 }, n.value)), null, 16)) : g("", !0),
      r.title ? (i(), W(ve(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: U(() => [
          N(h(r.title), 1)
        ]),
        _: 1
      })) : g("", !0),
      r.content ? (i(), f("p", Wl, h(r.content), 1)) : g("", !0),
      r.button ? (i(), W(qe, De(Q({ key: 3 }, r.button)), null, 16)) : g("", !0),
      r.$slots.default && !r.content ? (i(), f("div", Yl, [
        B(r.$slots, "default", {}, void 0, !0)
      ])) : B(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), Ql = /* @__PURE__ */ ke(Kl, [["__scopeId", "data-v-c59b3cec"]]), Vt = /* @__PURE__ */ O({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const t = a, e = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: A(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), W(ge, De(Q({ key: 0 }, n.value)), null, 16)) : g("", !0),
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
}, so = /* @__PURE__ */ O({
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
    const e = a, n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["lg", "large"].includes(e.size)), l = w(() => ["sm", "small"].includes(e.imgRatio)), o = w(() => ["lg", "large"].includes(e.imgRatio)), s = w(() => typeof e.link == "string" && e.link.startsWith("http")), u = K(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const m = _e("RouterLink");
      return i(), f("div", {
        class: A(["fr-card", {
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
            (i(), W(ve(d.titleTag), { class: "fr-card__title" }, {
              default: U(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, h(d.title), 9, Xl)) : d.link ? (i(), W(m, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (D) => D.stopPropagation())
                }, {
                  default: U(() => [
                    N(h(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(G, { key: 2 }, [
                  N(h(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Ul, h(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Zl, [
              B(d.$slots, "start-details"),
              d.detail ? (i(), W(Vt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: U(() => [
                  N(h(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : g("", !0)
            ])) : g("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", Jl, [
              B(d.$slots, "end-details"),
              d.endDetail ? (i(), W(Vt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: U(() => [
                  N(h(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : g("", !0)
            ])) : g("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", eo, [
            d.buttons.length ? (i(), W(Dt, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : g("", !0),
            d.linksGroup.length ? (i(), f("ul", to, [
              (i(!0), f(G, null, J(d.linksGroup, (D, C) => (i(), f("li", {
                key: `card-link-${C}`
              }, [
                D.to ? (i(), W(m, {
                  key: 0,
                  to: D.to
                }, {
                  default: U(() => [
                    N(h(D.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: D.link || D.href,
                  class: A(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": r.value
                  }])
                }, h(D.label), 11, ao))
              ]))), 128))
            ])) : g("", !0)
          ])) : g("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", no, [
          d.imgSrc ? (i(), f("div", ro, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, lo)
          ])) : g("", !0),
          d.badges.length ? (i(), f("ul", oo, [
            (i(!0), f(G, null, J(d.badges, (D, C) => (i(), f("li", { key: C }, [
              ee(za, Q({ ref_for: !0 }, D), null, 16)
            ]))), 128))
          ])) : g("", !0)
        ])) : g("", !0)
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
}, Tt = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ $e({
    id: { default: () => oe("basic", "checkbox") },
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
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: A(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Pe(c("input", Q({
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
          [bt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          B(l.$slots, "label", {}, () => [
            N(h(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", co, " *")) : g("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", fo, h(l.hint), 1)) : g("", !0)
        ], 8, uo),
        e.value ? (i(), f("div", po, [
          c("p", {
            class: A(["fr-message--info flex items-center", n.value])
          }, h(e.value), 3)
        ])) : g("", !0)
      ], 2)
    ], 2));
  }
}), mo = { class: "fr-form-group" }, ho = ["disabled", "aria-labelledby", "aria-invalid", "role"], vo = ["id"], go = {
  key: 0,
  class: "required"
}, bo = ["id"], yo = /* @__PURE__ */ O({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ $e({
    titleId: { default: () => oe("checkbox", "group") },
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
        class: A(["fr-fieldset", {
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
            N(h(o.legend) + " ", 1),
            B(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", go, " *")) : g("", !0)
            ])
          ])
        ], 8, vo),
        B(o.$slots, "default", {}, () => [
          (i(!0), f(G, null, J(o.options, (u) => (i(), W(Tt, {
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
            class: A(["fr-message--info flex items-center", n.value])
          }, [
            c("span", null, h(e.value), 1)
          ], 2)
        ], 8, bo)) : g("", !0)
      ], 10, ho)
    ]));
  }
}), ko = { class: "fr-consent-banner__content" }, wo = { class: "fr-text--sm" }, _o = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, xo = /* @__PURE__ */ O({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(a) {
    const t = a, e = w(() => typeof t.url == "string" && t.url.startsWith("http")), n = w(() => t.url ? e.value ? "a" : "RouterLink" : "a"), r = w(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, o) => (i(), f(G, null, [
      c("div", ko, [
        c("p", wo, [
          B(l.$slots, "default", {}, () => [
            o[4] || (o[4] = N(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), W(ve(n.value), Q(r.value, { "data-testid": "link" }), {
              default: U(() => o[3] || (o[3] = [
                N(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = N(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", _o, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = te((s) => l.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = te((s) => l.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = te((s) => l.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), Do = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, To = { class: "fr-pagination__list" }, Io = ["href", "title", "disabled", "aria-disabled"], Co = ["href", "title", "disabled", "aria-disabled"], Eo = ["href", "title", "aria-current", "onClick"], Mo = { key: 0 }, Po = { key: 1 }, Lo = ["href", "title", "disabled", "aria-disabled"], $o = ["href", "title", "disabled", "aria-disabled"], Bo = /* @__PURE__ */ O({
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
    const e = a, n = t, r = w(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = w(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), o = w(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), s = (k) => n("update:current-page", k), u = (k) => s(k), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), m = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), D = () => u(e.pages.length - 1), C = (k) => e.pages.indexOf(k) === e.currentPage;
    return (k, $) => {
      var y, x, T, P;
      return i(), f("nav", Do, [
        c("ul", To, [
          c("li", null, [
            c("a", {
              href: (y = k.pages[0]) == null ? void 0 : y.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: k.firstPageTitle,
              disabled: k.currentPage === 0 ? !0 : void 0,
              "aria-disabled": k.currentPage === 0 ? !0 : void 0,
              onClick: $[0] || ($[0] = te((v) => d(), ["prevent"]))
            }, null, 8, Io)
          ]),
          c("li", null, [
            c("a", {
              href: (x = k.pages[Math.max(k.currentPage - 1, 0)]) == null ? void 0 : x.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: k.prevPageTitle,
              disabled: k.currentPage === 0 ? !0 : void 0,
              "aria-disabled": k.currentPage === 0 ? !0 : void 0,
              onClick: $[1] || ($[1] = te((v) => p(), ["prevent"]))
            }, h(k.prevPageTitle), 9, Co)
          ]),
          (i(!0), f(G, null, J(o.value, (v, R) => (i(), f("li", { key: R }, [
            c("a", {
              href: v == null ? void 0 : v.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: v.title,
              "aria-current": C(v) ? "page" : void 0,
              onClick: te((_) => u(k.pages.indexOf(v)), ["prevent"])
            }, [
              o.value.indexOf(v) === 0 && r.value > 0 ? (i(), f("span", Mo, "...")) : g("", !0),
              N(" " + h(v.label) + " ", 1),
              o.value.indexOf(v) === o.value.length - 1 && l.value < k.pages.length - 1 ? (i(), f("span", Po, "...")) : g("", !0)
            ], 8, Eo)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (T = k.pages[Math.min(k.currentPage + 1, k.pages.length - 1)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: k.nextPageTitle,
              disabled: k.currentPage === k.pages.length - 1 ? !0 : void 0,
              "aria-disabled": k.currentPage === k.pages.length - 1 ? !0 : void 0,
              onClick: $[2] || ($[2] = te((v) => m(), ["prevent"]))
            }, h(k.nextPageTitle), 9, Lo)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (P = k.pages.at(-1)) == null ? void 0 : P.href,
              title: k.lastPageTitle,
              disabled: k.currentPage === k.pages.length - 1 ? !0 : void 0,
              "aria-disabled": k.currentPage === k.pages.length - 1 ? !0 : void 0,
              onClick: $[3] || ($[3] = te((v) => D(), ["prevent"]))
            }, null, 8, $o)
          ])
        ])
      ]);
    };
  }
}), na = /* @__PURE__ */ ke(Bo, [["__scopeId", "data-v-4dfa8248"]]), So = { class: "fr-table" }, Ao = { class: "fr-table__wrapper" }, Oo = { class: "fr-table__container" }, Ro = { class: "fr-table__content" }, Fo = ["id"], No = { key: 0 }, Vo = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, jo = { class: "fr-checkbox-group fr-checkbox-group--sm" }, qo = ["id", "checked"], Ho = ["for"], Wo = ["tabindex", "onClick", "onKeydown"], Yo = { key: 0 }, Ko = { key: 1 }, Qo = ["data-row-key"], zo = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Go = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Xo = ["id", "value"], Uo = ["for"], Zo = ["onKeydown"], Jo = { class: "flex gap-2 items-center" }, es = ["selected"], ts = ["value", "selected"], as = { class: "flex ml-1" }, ns = { class: "self-center" }, rs = /* @__PURE__ */ O({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ $e({
    id: { default: () => oe("table") },
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
  emits: /* @__PURE__ */ $e(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: t }) {
    const e = a, n = t, r = we(a, "selection"), l = we(a, "rowsPerPage"), o = we(a, "currentPage"), s = w(() => Math.ceil(e.rows.length / l.value)), u = w(() => e.pages ?? Array.from({ length: s.value }).map((_, M) => ({ label: `${M + 1}`, title: `Page ${M + 1}`, href: `#${M + 1}` }))), d = w(() => o.value * l.value), p = w(() => (o.value + 1) * l.value), m = we(a, "sortedBy"), D = we(a, "sortedDesc");
    function C(_, M) {
      const I = m.value ?? e.sorted;
      return (_[I] ?? _) < (M[I] ?? M) ? -1 : (_[I] ?? _) > (M[I] ?? M) ? 1 : 0;
    }
    function k(_) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(_))) {
        if (m.value === _) {
          if (D.value) {
            m.value = void 0, D.value = !1;
            return;
          }
          D.value = !0;
          return;
        }
        D.value = !1, m.value = _;
      }
    }
    const $ = w(() => {
      const _ = m.value ? e.rows.slice().sort(e.sortFn ?? C) : e.rows.slice();
      return D.value && _.reverse(), _;
    }), y = w(() => {
      const _ = e.headersRow.map((I) => typeof I != "object" ? I : I.key), M = $.value.map((I) => Array.isArray(I) ? I : _.map((E) => typeof I != "object" ? I : I[E] ?? I));
      return e.pagination ? M.slice(d.value, p.value) : M;
    });
    function x(_) {
      if (_) {
        const M = e.headersRow.findIndex((I) => I.key ?? I);
        r.value = y.value.map((I) => I[M]);
      }
      r.value.length = 0;
    }
    const T = K(!1);
    function P() {
      T.value = r.value.length === y.value.length;
    }
    function v() {
      n("update:current-page", 0), T.value = !1, r.value.length = 0;
    }
    function R(_) {
      navigator.clipboard.writeText(_);
    }
    return (_, M) => (i(), f("div", So, [
      c("div", Ao, [
        c("div", Oo, [
          c("div", Ro, [
            c("table", { id: _.id }, [
              _.noCaption ? g("", !0) : (i(), f("caption", No, h(_.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  _.selectableRows ? (i(), f("th", Vo, [
                    c("div", jo, [
                      c("input", {
                        id: `table-select--${_.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: M[0] || (M[0] = (I) => x(I.target.checked))
                      }, null, 40, qo),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${_.id}-all`
                      }, " Sélectionner tout ", 8, Ho)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(G, null, J(_.headersRow, (I, E) => (i(), f("th", Q({
                    key: typeof I == "object" ? I.key : I,
                    scope: "col",
                    ref_for: !0
                  }, typeof I == "object" && I.headerAttrs, {
                    tabindex: _.sortableRows ? 0 : void 0,
                    onClick: (j) => k(I.key ?? (Array.isArray(_.rows[0]) ? E : I)),
                    onKeydown: [
                      ne((j) => k(I.key ?? I), ["enter"]),
                      ne((j) => k(I.key ?? I), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: A({ "sortable-header": _.sortableRows === !0 || Array.isArray(_.sortableRows) && _.sortableRows.includes(I.key ?? I) })
                    }, [
                      B(_.$slots, "header", Q({ ref_for: !0 }, typeof I == "object" ? I : { key: I, label: I }), () => [
                        N(h(typeof I == "object" ? I.label : I), 1)
                      ], !0),
                      m.value !== (I.key ?? I) && (_.sortableRows === !0 || Array.isArray(_.sortableRows) && _.sortableRows.includes(I.key ?? I)) ? (i(), f("span", Yo, [
                        ee(ge, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : m.value === (I.key ?? I) ? (i(), f("span", Ko, [
                        ee(ge, {
                          name: D.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : g("", !0)
                    ], 2)
                  ], 16, Wo))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(G, null, J(y.value, (I, E) => (i(), f("tr", {
                  key: `row-${E}`,
                  "data-row-key": E + 1
                }, [
                  _.selectableRows ? (i(), f("th", zo, [
                    c("div", Go, [
                      Pe(c("input", {
                        id: `row-select-${_.id}-${E}`,
                        "onUpdate:modelValue": M[1] || (M[1] = (j) => r.value = j),
                        value: _.rows[E][_.rowKey] ?? `row-${E}`,
                        type: "checkbox",
                        onChange: M[2] || (M[2] = (j) => P())
                      }, null, 40, Xo), [
                        [bt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${_.id}-${E}`
                      }, " Sélectionner la ligne " + h(E + 1), 9, Uo)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(G, null, J(I, (j, b) => (i(), f("td", {
                    key: typeof j == "object" ? j[_.rowKey] : j,
                    tabindex: "0",
                    onKeydown: [
                      ne(te((L) => R(typeof j == "object" ? j[_.rowKey] : j), ["ctrl"]), ["c"]),
                      ne(te((L) => R(typeof j == "object" ? j[_.rowKey] : j), ["meta"]), ["c"])
                    ]
                  }, [
                    B(_.$slots, "cell", Q({ ref_for: !0 }, {
                      colKey: typeof _.headersRow[b] == "object" ? _.headersRow[b].key : _.headersRow[b],
                      cell: j
                    }), () => [
                      N(h(typeof j == "object" ? j[_.rowKey] : j), 1)
                    ], !0)
                  ], 40, Zo))), 128))
                ], 8, Qo))), 128))
              ])
            ], 8, Fo)
          ])
        ])
      ]),
      c("div", {
        class: A(_.bottomActionBarClass)
      }, [
        B(_.$slots, "pagination", {}, () => [
          _.pagination && !_.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: A(["flex justify-between items-center", _.paginationWrapperClass])
          }, [
            c("div", Jo, [
              M[6] || (M[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Pe(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": M[3] || (M[3] = (I) => l.value = I),
                class: "fr-select",
                onChange: M[4] || (M[4] = (I) => v())
              }, [
                c("option", {
                  value: "",
                  selected: !_.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, es),
                (i(!0), f(G, null, J(_.paginationOptions, (I, E) => (i(), f("option", {
                  key: E,
                  value: I,
                  selected: +I === l.value
                }, h(I), 9, ts))), 128))
              ], 544), [
                [zt, l.value]
              ])
            ]),
            c("div", as, [
              c("span", ns, "Page " + h(o.value + 1) + " sur " + h(s.value), 1)
            ]),
            ee(na, {
              "current-page": o.value,
              "onUpdate:currentPage": M[5] || (M[5] = (I) => o.value = I),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : g("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), ls = /* @__PURE__ */ ke(rs, [["__scopeId", "data-v-88850ee6"]]), os = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", ss = { class: "fr-container flex" }, is = { class: "half" }, us = { class: "fr-h1" }, ds = { class: "flex fr-my-md-3w" }, cs = { class: "fr-h6" }, fs = /* @__PURE__ */ O({
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
          c("h1", us, h(t.title), 1),
          c("span", ds, h(t.subtitle), 1),
          c("p", cs, h(t.description), 1),
          c("p", null, h(t.help), 1),
          (n = t.buttons) != null && n.length ? (i(), W(Dt, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : g("", !0),
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
}, gs = { class: "fr-fieldset__element" }, fn = /* @__PURE__ */ O({
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
          class: A(["fr-fieldset__legend", t.legendClass])
        }, [
          N(h(t.legend) + " ", 1),
          B(t.$slots, "legend")
        ], 10, hs)) : g("", !0),
        t.hint || (o = (l = t.$slots).hint) != null && o.call(l).length ? (i(), f("div", vs, [
          c("span", {
            class: A(["fr-hint-text", t.hintClass])
          }, [
            N(h(t.hint) + " ", 1),
            B(t.$slots, "hint")
          ], 2)
        ])) : g("", !0),
        c("div", gs, [
          B(t.$slots, "default")
        ])
      ]);
    };
  }
}), bs = ["href", "download"], ys = { class: "fr-link__detail" }, pn = /* @__PURE__ */ O({
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
      N(h(t.title) + " ", 1),
      c("span", ys, h(t.format) + " – " + h(t.size), 1)
    ], 8, bs));
  }
}), ks = { class: "fr-downloads-group fr-downloads-group--bordered" }, ws = {
  key: 0,
  class: "fr-downloads-group__title"
}, _s = /* @__PURE__ */ O({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", ks, [
      t.title ? (i(), f("h4", ws, h(t.title), 1)) : g("", !0),
      c("ul", null, [
        (i(!0), f(G, null, J(t.files, (n, r) => (i(), f("li", { key: r }, [
          ee(pn, {
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
}, Is = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Cs = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Es = ["id"], Ms = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => oe("file-upload") },
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
      class: A(["fr-upload-group", {
        "fr-upload-group--error": o.error,
        "fr-upload-group--valid": o.validMessage,
        "fr-upload-group--disabled": o.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: o.id
      }, [
        N(h(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", Ds, " *")) : g("", !0),
        o.hint ? (i(), f("span", Ts, h(o.hint), 1)) : g("", !0)
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
      o.error || o.validMessage ? (i(), f("div", Cs, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, h(o.error ?? o.validMessage), 9, Es)) : g("", !0)
      ])) : g("", !0)
    ], 2));
  }
}), Ps = { class: "fr-follow__newsletter" }, Ls = { class: "fr-h5 fr-follow__title" }, $s = { class: "fr-text--sm fr-follow__desc" }, Bs = { key: 0 }, Ss = ["title"], As = { key: 1 }, Os = { action: "" }, Rs = {
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
}, mn = /* @__PURE__ */ O({
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
        c("h3", Ls, h(r.title), 1),
        c("p", $s, h(r.description), 1)
      ]),
      r.onlyCallout ? (i(), f("div", Bs, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (o) => r.buttonAction ? r.buttonAction(o) : () => {
          })
        }, h(r.buttonText), 9, Ss)
      ])) : (i(), f("div", As, [
        c("form", Os, [
          c("label", Rs, h(r.labelEmail), 1),
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
            }, h(r.buttonText), 9, Vs)
          ]),
          r.error ? (i(), f("div", js, [
            c("p", qs, h(r.error), 1)
          ])) : g("", !0),
          c("p", Hs, h(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), Ws = { class: "fr-follow__social" }, Ys = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Ks = ["title", "href"], hn = /* @__PURE__ */ O({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ws, [
      (i(), W(ve(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: U(() => e[0] || (e[0] = [
          N(" Suivez-nous "),
          c("br", null, null, -1),
          N(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Ys, [
        (i(!0), f(G, null, J(t.networks, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: A(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h(n.name), 11, Ks)
        ]))), 128))
      ])) : g("", !0)
    ]));
  }
}), Qs = { class: "fr-follow" }, zs = { class: "fr-container" }, Gs = { class: "fr-grid-row" }, Xs = /* @__PURE__ */ O({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const t = a, e = w(() => t.networks && t.networks.length), n = w(() => typeof t.newsletterData == "object");
    return (r, l) => (i(), f("div", Qs, [
      c("div", zs, [
        c("div", Gs, [
          B(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: A(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ee(mn, De(yt(r.newsletterData)), null, 16)
            ], 2)) : g("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: A(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              ee(hn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : g("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ea = 1, vn = /* @__PURE__ */ O({
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
    return (p, m) => (i(), W(ve(r.value), Q({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, s.value, {
      target: p.target,
      onClick: te(p.onClick, ["stop"])
    }), {
      default: U(() => {
        var D, C;
        return [
          !u.value && (p.icon || (D = p.iconAttrs) != null && D.name) && !p.iconRight ? (i(), W(ge, Q({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : g("", !0),
          N(" " + h(p.label) + " ", 1),
          !u.value && (p.icon || (C = p.iconAttrs) != null && C.name) && p.iconRight ? (i(), W(ge, Q({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : g("", !0)
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
}, ti = ["href"], ai = ["src", "alt"], ni = { class: "fr-footer__partners-sub" }, ri = ["href"], li = ["src", "alt"], gn = /* @__PURE__ */ O({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Us, [
      t.title ? (i(), f("h4", Zs, h(t.title), 1)) : g("", !0),
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
        ])) : g("", !0),
        c("div", ni, [
          c("ul", null, [
            (i(!0), f(G, null, J(t.subPartners, (n, r) => (i(), f("li", { key: r }, [
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
}), oi = ["innerHTML"], at = /* @__PURE__ */ O({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const t = a, e = w(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (n, r) => (i(), f("p", {
      class: A(["fr-logo", {
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
}, Ti = /* @__PURE__ */ O({
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
    ]), n = Qt(), r = w(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n).length;
    }), l = w(() => {
      const p = t.licenceTo || t.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = w(() => {
      const { to: p, href: m, ...D } = t.licenceLinkProps ?? {};
      return D;
    }), s = w(() => l.value ? "" : t.licenceTo), u = w(() => l.value ? t.licenceTo : ""), d = w(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, m) => {
      const D = _e("RouterLink");
      return i(), f("footer", si, [
        r.value ? (i(), f("div", ii, [
          c("div", ui, [
            c("div", di, [
              B(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : g("", !0),
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
              ], 8, mi)) : (i(), W(D, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
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
              ee(D, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  ee(at, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", bi, [
              c("p", yi, [
                B(p.$slots, "description", {}, () => [
                  N(h(p.descText), 1)
                ], !0)
              ]),
              c("ul", ki, [
                (i(!0), f(G, null, J(p.ecosystemLinks, ({ href: C, label: k, title: $, ...y }, x) => (i(), f("li", {
                  key: x,
                  class: "fr-footer__content-item"
                }, [
                  c("a", Q({
                    class: "fr-footer__content-link",
                    href: C,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: $,
                    ref_for: !0
                  }, y), h(k), 17, wi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), W(gn, De(Q({ key: 0 }, p.partners)), null, 16)) : g("", !0),
          c("div", _i, [
            c("ul", xi, [
              (i(!0), f(G, null, J(e.value, (C, k) => (i(), f("li", {
                key: k,
                class: "fr-footer__bottom-item"
              }, [
                ee(vn, Q({ ref_for: !0 }, C), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", Di, [
              c("p", null, [
                N(h(p.licenceText) + " ", 1),
                (i(), W(ve(l.value ? "a" : "RouterLink"), Q({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : s.value,
                  href: l.value ? u.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: U(() => [
                    N(h(p.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target", "title"]))
              ])
            ])) : g("", !0)
          ])
        ])
      ]);
    };
  }
}), Ii = /* @__PURE__ */ ke(Ti, [["__scopeId", "data-v-613931c6"]]), Ci = { class: "fr-footer__top-cat" }, Ei = { class: "fr-footer__top-list" }, Mi = ["href"], Pi = /* @__PURE__ */ O({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(a) {
    return (t, e) => {
      const n = _e("RouterLink");
      return i(), f("div", null, [
        c("h3", Ci, h(t.categoryName), 1),
        c("ul", Ei, [
          (i(!0), f(G, null, J(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, h(r.label), 9, Mi)) : g("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), W(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: U(() => [
                N(h(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : g("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Li = { class: "fr-connect-group" }, $i = { class: "fr-connect__brand" }, Bi = ["href", "title"], Si = /* @__PURE__ */ O({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Li, [
      c("button", {
        class: A(["fr-connect", [{ "fr-connect--plus": t.secure }]])
      }, [
        e[0] || (e[0] = c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        c("span", $i, "FranceConnect" + h(t.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: t.url ?? `https://franceconnect.gouv.fr/${t.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, h(`Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ?`), 9, Bi)
      ])
    ]));
  }
}), Ai = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Oi = { class: "fr-nav__item" }, Ri = ["aria-controls", "aria-expanded"], Fi = { class: "fr-hidden-lg" }, Ni = ["id"], Vi = { class: "fr-menu__list" }, ji = ["hreflang", "lang", "aria-current", "href", "onClick"], nt = /* @__PURE__ */ O({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => oe("translate") },
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
    } = Be(), d = K(!1);
    function p(D) {
      d.value = !1, n("select", D);
    }
    const m = w(
      () => e.languages.find(({ codeIso: D }) => D === e.currentLanguage)
    );
    return pe(d, (D, C) => {
      D !== C && s(D);
    }), (D, C) => {
      var k, $;
      return i(), f("nav", Ai, [
        c("div", Oi, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": D.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: C[0] || (C[0] = te((y) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            N(h((k = m.value) == null ? void 0 : k.codeIso.toUpperCase()), 1),
            c("span", Fi, " - " + h(($ = m.value) == null ? void 0 : $.label), 1)
          ], 8, Ri),
          c("div", {
            id: D.id,
            ref_key: "collapse",
            ref: r,
            class: A(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": H(o), "fr-collapsing": H(l) }]),
            onTransitionend: C[1] || (C[1] = (y) => H(u)(d.value))
          }, [
            c("ul", Vi, [
              (i(!0), f(G, null, J(D.languages, (y, x) => (i(), f("li", { key: x }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: y.codeIso,
                  lang: y.codeIso,
                  "aria-current": D.currentLanguage === y.codeIso ? !0 : void 0,
                  href: `#${y.codeIso}`,
                  onClick: te((T) => p(y), ["prevent", "stop"])
                }, h(`${y.codeIso.toUpperCase()} - ${y.label}`), 9, ji)
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
}, Yi = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => oe("basic", "input") },
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
    const e = a, n = sr(), r = K(null), l = () => {
      var d;
      return (d = r.value) == null ? void 0 : d.focus();
    }, o = w(() => e.isTextarea ? "textarea" : "input"), s = w(() => e.isWithWrapper || n.type === "date" || !!e.wrapperClass), u = w(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return t({
      focus: l
    }), (d, p) => (i(), f(G, null, [
      c("label", {
        class: A(u.value),
        for: d.id
      }, [
        B(d.$slots, "label", {}, () => [
          N(h(d.label) + " ", 1),
          B(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", Hi, "*")) : g("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", Wi, h(d.hint), 1)) : g("", !0)
      ], 10, qi),
      s.value ? (i(), f("div", {
        key: 1,
        class: A([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), W(ve(o.value), Q({ id: d.id }, d.$attrs, {
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
      ], 2)) : (i(), W(ve(o.value), Q({
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
}), It = /* @__PURE__ */ ke(Yi, [["__scopeId", "data-v-6e6c295a"]]), rt = /* @__PURE__ */ O({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => oe("search", "input") },
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
      class: A(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
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
        onKeydown: r[1] || (r[1] = ne((l) => e("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      ee(qe, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: r[2] || (r[2] = (l) => e("search", n.modelValue))
      }, {
        default: U(() => [
          N(h(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Ma = 1, ra = /* @__PURE__ */ O({
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
    return (m, D) => (i(), W(ve(l.value), Q({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && m.iconRight,
        "fr-btn--icon-left": d.value && !m.iconRight,
        [String(m.icon)]: d.value
      }]
    }, u.value, {
      target: m.target,
      onClick: D[0] || (D[0] = te((C) => m.onClick(C), ["stop"]))
    }), {
      default: U(() => {
        var C, k;
        return [
          !d.value && (m.icon || (C = m.iconAttrs) != null && C.name) && !m.iconRight ? (i(), W(ge, Q({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : g("", !0),
          N(" " + h(m.label) + " ", 1),
          !d.value && (m.icon || (k = m.iconAttrs) != null && k.name) && m.iconRight ? (i(), W(ge, Q({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : g("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Ki = ["aria-label"], Qi = { class: "fr-btns-group" }, jt = /* @__PURE__ */ O({
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
      c("ul", Qi, [
        (i(!0), f(G, null, J(n.links, (l, o) => (i(), f("li", { key: o }, [
          ee(ra, Q({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Ki));
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
}, ku = /* @__PURE__ */ O({
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
    const e = a, n = t, r = lt(e, "languageSelector"), l = K(!1), o = K(!1), s = K(!1), u = () => {
      var x;
      s.value = !1, l.value = !1, o.value = !1, (x = document.getElementById("button-menu")) == null || x.focus();
    }, d = (x) => {
      x.key === "Escape" && u();
    };
    be(() => {
      document.addEventListener("keydown", d);
    }), Te(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      s.value = !0, l.value = !0, o.value = !1, setTimeout(() => {
        var x;
        (x = document.getElementById("close-button")) == null || x.focus();
      });
    }, m = () => {
      s.value = !0, l.value = !1, o.value = !0;
    }, D = u, C = w(() => [e.homeLabel, e.serviceTitle].filter((x) => x).join(" - ")), k = Qt(), $ = w(() => {
      var x;
      return !!((x = k.operator) != null && x.call(k).length) || !!e.operatorImgSrc;
    }), y = w(() => !!k.mainnav);
    return Re(Xt, () => u), (x, T) => {
      var P, v, R;
      const _ = _e("RouterLink");
      return i(), f("header", zi, [
        c("div", Gi, [
          c("div", Xi, [
            c("div", Ui, [
              c("div", Zi, [
                c("div", Ji, [
                  c("div", eu, [
                    ee(_, {
                      to: x.homeTo,
                      title: C.value
                    }, {
                      default: U(() => [
                        ee(at, {
                          "logo-text": x.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  $.value ? (i(), f("div", tu, [
                    B(x.$slots, "operator", {}, () => [
                      x.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: x.operatorImgSrc,
                        alt: x.operatorImgAlt,
                        style: xe(x.operatorImgStyle)
                      }, null, 12, au)) : g("", !0)
                    ])
                  ])) : g("", !0),
                  x.showSearch || y.value || (P = x.quickLinks) != null && P.length ? (i(), f("div", nu, [
                    x.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": x.showSearchLabel,
                      title: x.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: T[0] || (T[0] = te((M) => m(), ["prevent", "stop"]))
                    }, null, 8, ru)) : g("", !0),
                    y.value || (v = x.quickLinks) != null && v.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": x.menuLabel,
                      title: x.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = te((M) => p(), ["prevent", "stop"]))
                    }, null, 8, lu)) : g("", !0)
                  ])) : g("", !0)
                ]),
                x.serviceTitle ? (i(), f("div", ou, [
                  ee(_, Q({
                    to: x.homeTo,
                    title: C.value
                  }, x.$attrs), {
                    default: U(() => [
                      c("p", su, [
                        N(h(x.serviceTitle) + " ", 1),
                        x.showBeta ? (i(), f("span", iu, " BETA ")) : g("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  x.serviceDescription ? (i(), f("p", uu, h(x.serviceDescription), 1)) : g("", !0)
                ])) : g("", !0),
                !x.serviceTitle && x.showBeta ? (i(), f("div", du, T[9] || (T[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : g("", !0)
              ]),
              c("div", cu, [
                (R = x.quickLinks) != null && R.length || r.value ? (i(), f("div", fu, [
                  l.value ? g("", !0) : (i(), W(jt, {
                    key: 0,
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), W(nt, Q({ key: 1 }, r.value, {
                    onSelect: T[2] || (T[2] = (M) => n("languageSelect", M))
                  }), null, 16)) : g("", !0)
                ])) : g("", !0),
                x.showSearch ? (i(), f("div", pu, [
                  ee(rt, {
                    "searchbar-id": x.searchbarId,
                    label: x.searchLabel,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (M) => n("update:modelValue", M)),
                    onSearch: T[4] || (T[4] = (M) => n("search", M))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ]),
            x.showSearch || y.value || x.quickLinks && x.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: A(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": x.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", hu, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: T[5] || (T[5] = te((M) => u(), ["prevent", "stop"]))
                }, h(x.closeMenuModalLabel), 1),
                c("div", vu, [
                  r.value ? (i(), W(nt, Q({ key: 0 }, r.value, {
                    onSelect: T[6] || (T[6] = (M) => r.value.currentLanguage = M.codeIso)
                  }), null, 16)) : g("", !0),
                  l.value ? (i(), W(jt, {
                    key: 1,
                    role: "navigation",
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel,
                    onLinkClick: H(D)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : g("", !0)
                ]),
                s.value ? B(x.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : g("", !0),
                o.value ? (i(), f("div", gu, [
                  ee(rt, {
                    "searchbar-id": x.searchbarId,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (M) => n("update:modelValue", M)),
                    onSearch: T[8] || (T[8] = (M) => n("search", M))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ], 10, mu)) : g("", !0),
            B(x.$slots, "default")
          ])
        ]),
        c("div", bu, [
          y.value && !s.value ? (i(), f("div", yu, [
            B(x.$slots, "mainnav", { hidemodal: u })
          ])) : g("", !0)
        ])
      ]);
    };
  }
}), wu = /* @__PURE__ */ O({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", {
      class: A(["fr-highlight", { [`fr-highlight--${t.color}`]: t.color }])
    }, [
      c("p", {
        class: A({
          "fr-text--lg": t.large && !t.small,
          "fr-text--sm": t.small && !t.large
        })
      }, [
        N(h(t.text) + " ", 1),
        B(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), _u = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, xu = ["id", "data-testid"], Du = ["id", "data-testid"], Tu = ["id", "data-testid"], Iu = ["id", "data-testid"], Cu = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => oe("basic", "input") },
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
      class: A(["fr-input-group", [
        {
          "fr-input-group--error": t.errorMessage,
          "fr-input-group--valid": t.validMessage && !t.errorMessage
        },
        t.wrapperClass
      ]])
    }, [
      B(t.$slots, "before-input"),
      B(t.$slots, "default"),
      t.$slots.default ? g("", !0) : (i(), W(It, Q({ key: 0 }, t.$attrs, {
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
        Array.isArray(t.errorMessage) ? (i(!0), f(G, { key: 0 }, J(t.errorMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(n), 9, xu))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(t.errorMessage), 9, Du)) : g("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(G, { key: 2 }, J(t.validMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(n), 9, Tu))), 128)) : t.validMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.validMessage,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(t.validMessage), 9, Iu)) : g("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var bn = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], ft = /* @__PURE__ */ bn.join(","), yn = typeof Element > "u", He = yn ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, pt = !yn && Element.prototype.getRootNode ? function(a) {
  var t;
  return a == null || (t = a.getRootNode) === null || t === void 0 ? void 0 : t.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, mt = function a(t, e) {
  var n;
  e === void 0 && (e = !0);
  var r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "inert"), l = r === "" || r === "true", o = l || e && t && a(t.parentNode);
  return o;
}, Eu = function(a) {
  var t, e = a == null || (t = a.getAttribute) === null || t === void 0 ? void 0 : t.call(a, "contenteditable");
  return e === "" || e === "true";
}, kn = function(a, t, e) {
  if (mt(a))
    return [];
  var n = Array.prototype.slice.apply(a.querySelectorAll(ft));
  return t && He.call(a, ft) && n.unshift(a), n = n.filter(e), n;
}, wn = function a(t, e, n) {
  for (var r = [], l = Array.from(t); l.length; ) {
    var o = l.shift();
    if (!mt(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), u = s.length ? s : o.children, d = a(u, !0, n);
        n.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: o,
          candidates: d
        });
      } else {
        var p = He.call(o, ft);
        p && n.filter(o) && (e || !t.includes(o)) && r.push(o);
        var m = o.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(o), D = !mt(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(o));
        if (m && D) {
          var C = a(m === !0 ? o.children : m.children, !0, n);
          n.flatten ? r.push.apply(r, C) : r.push({
            scopeParent: o,
            candidates: C
          });
        } else
          l.unshift.apply(l, o.children);
      }
  }
  return r;
}, _n = function(a) {
  return !isNaN(parseInt(a.getAttribute("tabindex"), 10));
}, Ve = function(a) {
  if (!a)
    throw new Error("No node provided");
  return a.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(a.tagName) || Eu(a)) && !_n(a) ? 0 : a.tabIndex;
}, Mu = function(a, t) {
  var e = Ve(a);
  return e < 0 && t && !_n(a) ? 0 : e;
}, Pu = function(a, t) {
  return a.tabIndex === t.tabIndex ? a.documentOrder - t.documentOrder : a.tabIndex - t.tabIndex;
}, xn = function(a) {
  return a.tagName === "INPUT";
}, Lu = function(a) {
  return xn(a) && a.type === "hidden";
}, $u = function(a) {
  var t = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, Bu = function(a, t) {
  for (var e = 0; e < a.length; e++)
    if (a[e].checked && a[e].form === t)
      return a[e];
}, Su = function(a) {
  if (!a.name)
    return !0;
  var t = a.form || pt(a), e = function(l) {
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
  var r = Bu(n, a.form);
  return !r || r === a;
}, Au = function(a) {
  return xn(a) && a.type === "radio";
}, Ou = function(a) {
  return Au(a) && !Su(a);
}, Ru = function(a) {
  var t, e = a && pt(a), n = (t = e) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (e && e !== a) {
    var l, o, s;
    for (r = !!((l = n) !== null && l !== void 0 && (o = l.ownerDocument) !== null && o !== void 0 && o.contains(n) || a != null && (s = a.ownerDocument) !== null && s !== void 0 && s.contains(a)); !r && n; ) {
      var u, d, p;
      e = pt(n), n = (u = e) === null || u === void 0 ? void 0 : u.host, r = !!((d = n) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return r;
}, Pa = function(a) {
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
        var s = a.parentElement, u = pt(a);
        if (s && !s.shadowRoot && n(s) === !0)
          return Pa(a);
        a.assignedSlot ? a = a.assignedSlot : !s && u !== a.ownerDocument ? a = u.host : a = s;
      }
      a = o;
    }
    if (Ru(a))
      return !a.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return Pa(a);
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
}, ht = function(a, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  mt(t) || Lu(t) || Fu(t, a) || // For a details element with a summary, the summary element gets the focus
  $u(t) || Nu(t));
}, qt = function(a, t) {
  return !(Ou(t) || Ve(t) < 0 || !ht(a, t));
}, Vu = function(a) {
  var t = parseInt(a.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, ju = function a(t) {
  var e = [], n = [];
  return t.forEach(function(r, l) {
    var o = !!r.scopeParent, s = o ? r.scopeParent : r, u = Mu(s, o), d = o ? a(r.candidates) : s;
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
  return t.getShadowRoot ? e = wn([a], t.includeContainer, {
    filter: qt.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Vu
  }) : e = kn(a, t.includeContainer, qt.bind(null, t)), ju(e);
}, Hu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = wn([a], t.includeContainer, {
    filter: ht.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : e = kn(a, t.includeContainer, ht.bind(null, t)), e;
}, We = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, ft) === !1 ? !1 : qt(t, a);
}, Wu = /* @__PURE__ */ bn.concat("iframe").join(","), Pt = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, Wu) === !1 ? !1 : ht(t, a);
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
function Ku(a, t, e) {
  return (t = Uu(t)) in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}
function Qu(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function zu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function La(a, t) {
  var e = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), e.push.apply(e, n);
  }
  return e;
}
function $a(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? La(Object(e), !0).forEach(function(n) {
      Ku(a, n, e[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : La(Object(e)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(e, n));
    });
  }
  return a;
}
function Gu(a) {
  return Yu(a) || Qu(a) || Zu(a) || zu();
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
}, Sa = function(a) {
  return setTimeout(a, 0);
}, Xe = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    e[n - 1] = arguments[n];
  return typeof a == "function" ? a.apply(void 0, e) : a;
}, it = function(a) {
  return a.target.shadowRoot && typeof a.composedPath == "function" ? a.composedPath()[0] : a.target;
}, nd = [], rd = function(a, t) {
  var e = (t == null ? void 0 : t.document) || document, n = (t == null ? void 0 : t.trapStack) || nd, r = $a({
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
  }, o, s = function(b, L, q) {
    return b && b[L] !== void 0 ? b[L] : r[q || L];
  }, u = function(b, L) {
    var q = typeof (L == null ? void 0 : L.composedPath) == "function" ? L.composedPath() : void 0;
    return l.containerGroups.findIndex(function(S) {
      var F = S.container, Z = S.tabbableNodes;
      return F.contains(b) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (q == null ? void 0 : q.includes(F)) || Z.find(function(z) {
        return z === b;
      });
    });
  }, d = function(b) {
    var L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, q = L.hasFallback, S = q === void 0 ? !1 : q, F = L.params, Z = F === void 0 ? [] : F, z = r[b];
    if (typeof z == "function" && (z = z.apply(void 0, Gu(Z))), z === !0 && (z = void 0), !z) {
      if (z === void 0 || z === !1)
        return z;
      throw new Error("`".concat(b, "` was specified but was not a node, or did not return a node"));
    }
    var le = z;
    if (typeof z == "string") {
      try {
        le = e.querySelector(z);
      } catch (re) {
        throw new Error("`".concat(b, '` appears to be an invalid selector; error="').concat(re.message, '"'));
      }
      if (!le && !S)
        throw new Error("`".concat(b, "` as selector refers to no known node"));
    }
    return le;
  }, p = function() {
    var b = d("initialFocus", {
      hasFallback: !0
    });
    if (b === !1)
      return !1;
    if (b === void 0 || b && !Pt(b, r.tabbableOptions))
      if (u(e.activeElement) >= 0)
        b = e.activeElement;
      else {
        var L = l.tabbableGroups[0], q = L && L.firstTabbableNode;
        b = q || d("fallbackFocus");
      }
    else b === null && (b = d("fallbackFocus"));
    if (!b)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return b;
  }, m = function() {
    if (l.containerGroups = l.containers.map(function(b) {
      var L = qu(b, r.tabbableOptions), q = Hu(b, r.tabbableOptions), S = L.length > 0 ? L[0] : void 0, F = L.length > 0 ? L[L.length - 1] : void 0, Z = q.find(function(re) {
        return We(re);
      }), z = q.slice().reverse().find(function(re) {
        return We(re);
      }), le = !!L.find(function(re) {
        return Ve(re) > 0;
      });
      return {
        container: b,
        tabbableNodes: L,
        focusableNodes: q,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: le,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: S,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: F,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: Z,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: z,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(re) {
          var Ie = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ce = L.indexOf(re);
          return Ce < 0 ? Ie ? q.slice(q.indexOf(re) + 1).find(function(Y) {
            return We(Y);
          }) : q.slice(0, q.indexOf(re)).reverse().find(function(Y) {
            return We(Y);
          }) : L[Ce + (Ie ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(b) {
      return b.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(b) {
      return b.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, D = function(b) {
    var L = b.activeElement;
    if (L)
      return L.shadowRoot && L.shadowRoot.activeElement !== null ? D(L.shadowRoot) : L;
  }, C = function(b) {
    if (b !== !1 && b !== D(document)) {
      if (!b || !b.focus) {
        C(p());
        return;
      }
      b.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = b, Ju(b) && b.select();
    }
  }, k = function(b) {
    var L = d("setReturnFocus", {
      params: [b]
    });
    return L || (L === !1 ? !1 : b);
  }, $ = function(b) {
    var L = b.target, q = b.event, S = b.isBackward, F = S === void 0 ? !1 : S;
    L = L || it(q), m();
    var Z = null;
    if (l.tabbableGroups.length > 0) {
      var z = u(L, q), le = z >= 0 ? l.containerGroups[z] : void 0;
      if (z < 0)
        F ? Z = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : Z = l.tabbableGroups[0].firstTabbableNode;
      else if (F) {
        var re = l.tabbableGroups.findIndex(function(he) {
          var Le = he.firstTabbableNode;
          return L === Le;
        });
        if (re < 0 && (le.container === L || Pt(L, r.tabbableOptions) && !We(L, r.tabbableOptions) && !le.nextTabbableNode(L, !1)) && (re = z), re >= 0) {
          var Ie = re === 0 ? l.tabbableGroups.length - 1 : re - 1, Ce = l.tabbableGroups[Ie];
          Z = Ve(L) >= 0 ? Ce.lastTabbableNode : Ce.lastDomTabbableNode;
        } else Je(q) || (Z = le.nextTabbableNode(L, !1));
      } else {
        var Y = l.tabbableGroups.findIndex(function(he) {
          var Le = he.lastTabbableNode;
          return L === Le;
        });
        if (Y < 0 && (le.container === L || Pt(L, r.tabbableOptions) && !We(L, r.tabbableOptions) && !le.nextTabbableNode(L)) && (Y = z), Y >= 0) {
          var X = Y === l.tabbableGroups.length - 1 ? 0 : Y + 1, ae = l.tabbableGroups[X];
          Z = Ve(L) >= 0 ? ae.firstTabbableNode : ae.firstDomTabbableNode;
        } else Je(q) || (Z = le.nextTabbableNode(L));
      }
    } else
      Z = d("fallbackFocus");
    return Z;
  }, y = function(b) {
    var L = it(b);
    if (!(u(L, b) >= 0)) {
      if (Xe(r.clickOutsideDeactivates, b)) {
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
      Xe(r.allowOutsideClick, b) || b.preventDefault();
    }
  }, x = function(b) {
    var L = it(b), q = u(L, b) >= 0;
    if (q || L instanceof Document)
      q && (l.mostRecentlyFocusedNode = L);
    else {
      b.stopImmediatePropagation();
      var S, F = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ve(l.mostRecentlyFocusedNode) > 0) {
          var Z = u(l.mostRecentlyFocusedNode), z = l.containerGroups[Z].tabbableNodes;
          if (z.length > 0) {
            var le = z.findIndex(function(re) {
              return re === l.mostRecentlyFocusedNode;
            });
            le >= 0 && (r.isKeyForward(l.recentNavEvent) ? le + 1 < z.length && (S = z[le + 1], F = !1) : le - 1 >= 0 && (S = z[le - 1], F = !1));
          }
        } else
          l.containerGroups.some(function(re) {
            return re.tabbableNodes.some(function(Ie) {
              return Ve(Ie) > 0;
            });
          }) || (F = !1);
      else
        F = !1;
      F && (S = $({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), C(S || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, T = function(b) {
    var L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = b;
    var q = $({
      event: b,
      isBackward: L
    });
    q && (Je(b) && b.preventDefault(), C(q));
  }, P = function(b) {
    (r.isKeyForward(b) || r.isKeyBackward(b)) && T(b, r.isKeyBackward(b));
  }, v = function(b) {
    ed(b) && Xe(r.escapeDeactivates, b) !== !1 && (b.preventDefault(), o.deactivate());
  }, R = function(b) {
    var L = it(b);
    u(L, b) >= 0 || Xe(r.clickOutsideDeactivates, b) || Xe(r.allowOutsideClick, b) || (b.preventDefault(), b.stopImmediatePropagation());
  }, _ = function() {
    if (l.active)
      return Ba.activateTrap(n, o), l.delayInitialFocusTimer = r.delayInitialFocus ? Sa(function() {
        C(p());
      }) : C(p()), e.addEventListener("focusin", x, !0), e.addEventListener("mousedown", y, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", y, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", R, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", P, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", v), o;
  }, M = function() {
    if (l.active)
      return e.removeEventListener("focusin", x, !0), e.removeEventListener("mousedown", y, !0), e.removeEventListener("touchstart", y, !0), e.removeEventListener("click", R, !0), e.removeEventListener("keydown", P, !0), e.removeEventListener("keydown", v), o;
  }, I = function(b) {
    var L = b.some(function(q) {
      var S = Array.from(q.removedNodes);
      return S.some(function(F) {
        return F === l.mostRecentlyFocusedNode;
      });
    });
    L && C(p());
  }, E = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(I) : void 0, j = function() {
    E && (E.disconnect(), l.active && !l.paused && l.containers.map(function(b) {
      E.observe(b, {
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
    activate: function(b) {
      if (l.active)
        return this;
      var L = s(b, "onActivate"), q = s(b, "onPostActivate"), S = s(b, "checkCanFocusTrap");
      S || m(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, L == null || L();
      var F = function() {
        S && m(), _(), j(), q == null || q();
      };
      return S ? (S(l.containers.concat()).then(F, F), this) : (F(), this);
    },
    deactivate: function(b) {
      if (!l.active)
        return this;
      var L = $a({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, b);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, M(), l.active = !1, l.paused = !1, j(), Ba.deactivateTrap(n, o);
      var q = s(L, "onDeactivate"), S = s(L, "onPostDeactivate"), F = s(L, "checkCanReturnFocus"), Z = s(L, "returnFocus", "returnFocusOnDeactivate");
      q == null || q();
      var z = function() {
        Sa(function() {
          Z && C(k(l.nodeFocusedBeforeActivation)), S == null || S();
        });
      };
      return Z && F ? (F(k(l.nodeFocusedBeforeActivation)).then(z, z), this) : (z(), this);
    },
    pause: function(b) {
      if (l.paused || !l.active)
        return this;
      var L = s(b, "onPause"), q = s(b, "onPostPause");
      return l.paused = !0, L == null || L(), M(), j(), q == null || q(), this;
    },
    unpause: function(b) {
      if (!l.paused || !l.active)
        return this;
      var L = s(b, "onUnpause"), q = s(b, "onPostUnpause");
      return l.paused = !1, L == null || L(), m(), _(), j(), q == null || q(), this;
    },
    updateContainerElements: function(b) {
      var L = [].concat(b).filter(Boolean);
      return l.containers = L.map(function(q) {
        return typeof q == "string" ? e.querySelector(q) : q;
      }), l.active && m(), j(), this;
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
}, od = O({
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
    const r = K(null), l = w(() => {
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
      pe(() => a.active, (s) => {
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
        const s = t.default().filter((u) => u.type !== lr);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : or(s[0], { ref: r });
      }
    };
  }
}), sd = ["aria-labelledby", "role", "open"], id = { class: "fr-container fr-container--fluid fr-container-md" }, ud = { class: "fr-grid-row fr-grid-row--center" }, dd = { class: "fr-modal__body" }, cd = { class: "fr-modal__header" }, fd = ["title"], pd = { class: "fr-modal__content" }, md = ["id"], hd = {
  key: 0,
  class: "fr-modal__footer"
}, Aa = 2, vd = /* @__PURE__ */ O({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => oe("modal", "dialog") },
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
    const e = a, n = t, r = (k) => {
      k.key === "Escape" && m();
    }, l = w(() => e.isAlert ? "alertdialog" : "dialog"), o = K(null), s = K();
    pe(() => e.opened, (k) => {
      var $, y;
      k ? (($ = s.value) == null || $.showModal(), setTimeout(() => {
        var x;
        (x = o.value) == null || x.focus();
      }, 100)) : (y = s.value) == null || y.close(), u(k);
    });
    function u(k) {
      typeof window < "u" && document.body.classList.toggle("modal-open", k);
    }
    be(() => {
      d(), u(e.opened);
    }), cr(() => {
      p(), u(!1);
    });
    function d() {
      document.addEventListener("keydown", r);
    }
    function p() {
      document.removeEventListener("keydown", r);
    }
    async function m() {
      var k;
      await Ka(), (k = e.origin) == null || k.focus(), n("close");
    }
    const D = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), C = w(
      () => D.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Aa } : { scale: Aa, ...e.icon ?? {} }
    );
    return (k, $) => k.opened ? (i(), W(H(od), { key: 0 }, {
      default: U(() => {
        var y, x;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-modal": "true",
            "aria-labelledby": k.modalId,
            role: l.value,
            class: A(["fr-modal", { "fr-modal--opened": k.opened }]),
            open: k.opened
          }, [
            c("div", id, [
              c("div", ud, [
                c("div", {
                  class: A(["fr-col-12", {
                    "fr-col-md-8": k.size === "lg",
                    "fr-col-md-6": k.size === "md",
                    "fr-col-md-4": k.size === "sm"
                  }])
                }, [
                  c("div", dd, [
                    c("div", cd, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: k.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: $[0] || ($[0] = (T) => m())
                      }, [
                        c("span", null, h(k.closeButtonLabel), 1)
                      ], 8, fd)
                    ]),
                    c("div", pd, [
                      c("h1", {
                        id: k.modalId,
                        class: "fr-modal__title"
                      }, [
                        D.value || C.value ? (i(), f("span", {
                          key: 0,
                          class: A({
                            [String(k.icon)]: D.value
                          })
                        }, [
                          k.icon && C.value ? (i(), W(ge, De(Q({ key: 0 }, C.value)), null, 16)) : g("", !0)
                        ], 2)) : g("", !0),
                        N(" " + h(k.title), 1)
                      ], 8, md),
                      B(k.$slots, "default", {}, void 0, !0)
                    ]),
                    (y = k.actions) != null && y.length || k.$slots.footer ? (i(), f("div", hd, [
                      B(k.$slots, "footer", {}, void 0, !0),
                      (x = k.actions) != null && x.length ? (i(), W(Dt, {
                        key: 0,
                        align: "right",
                        buttons: k.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : g("", !0)
                    ])) : g("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, sd)
        ];
      }),
      _: 3
    })) : g("", !0);
  }
}), Dn = /* @__PURE__ */ ke(vd, [["__scopeId", "data-v-33fe2c83"]]), gd = ["for"], bd = {
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
}, Dd = { class: "fr-input-wrap fr-icon-search-line" }, Td = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Id = { key: 2 }, Cd = ["id"], Ed = /* @__PURE__ */ O({
  __name: "DsfrMultiselect",
  props: /* @__PURE__ */ $e({
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
    id: { default: () => oe("multiselect") },
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
    const t = a, e = (Y, X) => typeof Y == "object" && Y !== null && !!X && X in Y, n = (Y, X) => {
      if (X && e(Y, X)) {
        const ae = Y[X];
        if (typeof ae == "string" || typeof ae == "number")
          return ae;
        throw new Error(
          `The value of idKey ${String(X)} is not a string or number.`
        );
      }
      if (typeof Y == "string" || typeof Y == "number")
        return Y;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (Y, X, ae) => `${X}-${n(Y, ae)}`, l = K(null), o = K(!1), s = we(a, "modelValue"), u = K(0), d = w(() => t.errorMessage || t.successMessage), p = w(() => t.errorMessage ? "error" : "valid"), m = [], {
      collapse: D,
      collapsing: C,
      cssExpanded: k,
      doExpand: $,
      onTransitionEnd: y
    } = Be(), x = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), T = K(!1), P = K("");
    function v(Y) {
      Y.key === "Escape" && E();
    }
    function R(Y) {
      var X, ae;
      const he = Y.target;
      !((X = l.value) != null && X.$el.contains(he)) && !((ae = D.value) != null && ae.contains(he)) && E();
    }
    function _(Y, X) {
      if (window.ResizeObserver) {
        const ae = new window.ResizeObserver((he) => {
          for (const Le of he)
            X(Y, Le);
        });
        return ae.observe(Y), () => {
          ae.unobserve(Y), ae.disconnect();
        };
      }
      return () => {
      };
    }
    function M(Y) {
      const X = Y.getBoundingClientRect();
      X.width !== u.value && (u.value = X.width);
    }
    function I() {
      o.value = !0, T.value = !0, l.value && m.push(_(l.value.$el, M)), document.addEventListener("click", R), document.addEventListener("keydown", v), setTimeout(() => {
        $(!0);
      }, 100);
    }
    function E() {
      o.value = !1, $(!1), setTimeout(() => {
        T.value = !1;
      }, 300), b();
    }
    const j = async () => {
      T.value ? E() : I();
    };
    function b() {
      for (; m.length; ) {
        const Y = m.pop();
        Y && Y();
      }
      document.removeEventListener("click", R), document.removeEventListener("keydown", v);
    }
    const L = w(
      () => t.options.filter((Y) => typeof Y == "object" && Y !== null ? t.filteringKeys.some(
        (X) => `${Y[X]}`.toLowerCase().includes(P.value.toLowerCase())
      ) : `${Y}`.toLowerCase().includes(P.value.toLowerCase()))
    ), q = w(() => t.modelValue.length < L.value.length ? !1 : L.value.every((Y) => {
      const X = n(Y, t.idKey);
      return t.modelValue.includes(X);
    })), S = () => {
      const Y = new Set(s.value || []);
      q.value ? L.value.forEach((X) => {
        const ae = n(X, t.idKey);
        Y.delete(ae);
      }) : L.value.forEach((X) => {
        const ae = n(X, t.idKey);
        Y.add(ae);
      }), s.value = Array.from(Y);
    }, F = (Y) => {
      const [X] = x();
      X && (Y.preventDefault(), X.focus());
    }, Z = (Y) => {
      Y.preventDefault();
      const X = x(), ae = document.activeElement, he = Array.from(X).indexOf(ae);
      if (he !== -1) {
        const Le = (he + 1) % X.length;
        X[Le].focus();
      }
    }, z = (Y) => {
      Y.preventDefault();
      const X = x(), ae = document.activeElement, he = Array.from(X).indexOf(ae);
      if (he !== -1) {
        const Le = (he - 1 + X.length) % X.length;
        X[Le].focus();
      }
    }, le = (Y) => {
      const X = x(), ae = document.activeElement;
      Array.from(X).indexOf(ae) + 1 === X.length && l.value && !Y.shiftKey && E();
    }, re = (Y) => {
      var X;
      const ae = document.activeElement;
      Y.shiftKey && ae === ((X = l.value) == null ? void 0 : X.$el) && E();
    };
    Te(() => {
      b();
    });
    const Ie = w(() => {
      var Y;
      const X = ((Y = s.value) == null ? void 0 : Y.length) ?? 0, ae = X === 0, he = X > 1;
      return ae ? "Sélectionner une option" : `${X} option${he ? "s" : ""} sélectionnée${he ? "s" : ""}`;
    }), Ce = w(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (Y, X) => (i(), f("div", {
      class: A(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
    }, [
      c("label", {
        class: A(Ce.value),
        for: Y.id
      }, [
        B(Y.$slots, "label", {}, () => [
          N(h(Y.label) + " ", 1),
          B(Y.$slots, "required-tip", {}, () => [
            "required" in Y.$attrs && Y.$attrs.required !== !1 ? (i(), f("span", bd, "*")) : g("", !0)
          ], !0)
        ], !0),
        t.hint || Y.$slots.hint ? (i(), f("span", yd, [
          B(Y.$slots, "hint", {}, () => [
            N(h(t.hint), 1)
          ], !0)
        ])) : g("", !0)
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
        onClick: j,
        onKeydown: ne(te(re, ["shift"]), ["tab"])
      }), {
        default: U(() => [
          B(Y.$slots, "button-label", {}, () => [
            N(h(t.buttonLabel || Ie.value), 1)
          ], !0)
        ]),
        _: 3
      }, 16, ["id", "aria-expanded", "aria-controls", "class", "onKeydown"]),
      T.value ? (i(), f("div", {
        key: 0,
        id: `${t.id}-collapse`,
        ref_key: "collapse",
        ref: D,
        style: xe({
          "--width-host": `${u.value}px`
        }),
        class: A(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": H(k), "fr-collapsing": H(C) }]),
        onTransitionend: X[2] || (X[2] = (ae) => H(y)(o.value))
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
              disabled: L.value.length === 0,
              onClick: S,
              onKeydown: ne(te(re, ["shift"]), ["tab"])
            }, {
              default: U(() => [
                c("span", {
                  class: A([
                    "fr-multiselect__search__icon",
                    q.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                  ])
                }, null, 2),
                N(" " + h(t.selectAllLabel[q.value ? 1 : 0]), 1)
              ]),
              _: 1
            }, 8, ["disabled", "onKeydown"])
          ])
        ])) : g("", !0),
        t.search ? (i(), f("div", xd, [
          c("div", Dd, [
            ee(It, {
              modelValue: P.value,
              "onUpdate:modelValue": X[0] || (X[0] = (ae) => P.value = ae),
              "aria-describedby": `${t.id}-text-hint`,
              "aria-controls": `${t.id}-checkboxes`,
              "aria-live": "polite",
              placeholder: "Rechercher",
              type: "text",
              onKeydown: [
                ne(F, ["down"]),
                ne(F, ["right"]),
                ne(re, ["tab"])
              ]
            }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
          ]),
          X[3] || (X[3] = c("div", {
            class: "fr-messages-group",
            "aria-live": "assertive"
          }, null, -1))
        ])) : g("", !0),
        ee(fn, {
          id: `${t.id}-checkboxes`,
          class: "fr-multiselect__collapse__fieldset",
          "aria-live": "polite",
          style: xe({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
          legend: t.legend,
          "legend-id": `${t.id}-checkboxes-legend`
        }, {
          default: U(() => [
            B(Y.$slots, "legend", {}, void 0, !0),
            (i(!0), f(G, null, J(L.value, (ae) => (i(), f("div", {
              key: `${r(ae, Y.id, t.idKey)}-checkbox`,
              class: "fr-fieldset__element"
            }, [
              c("div", Td, [
                ee(Tt, {
                  id: `${r(ae, Y.id, t.idKey)}-checkbox`,
                  modelValue: s.value,
                  "onUpdate:modelValue": X[1] || (X[1] = (he) => s.value = he),
                  value: n(ae, t.idKey),
                  name: `${r(ae, Y.id, t.idKey)}-checkbox`,
                  small: "",
                  onKeydown: [
                    ne(Z, ["down"]),
                    ne(Z, ["right"]),
                    ne(z, ["up"]),
                    ne(z, ["left"]),
                    ne(le, ["tab"])
                  ]
                }, {
                  label: U(() => [
                    B(Y.$slots, "checkbox-label", {
                      option: ae
                    }, () => [
                      N(h(n(ae, t.labelKey)), 1)
                    ], !0)
                  ]),
                  _: 2
                }, 1032, ["id", "modelValue", "value", "name"])
              ])
            ]))), 128))
          ]),
          _: 3
        }, 8, ["id", "style", "legend", "legend-id"]),
        L.value.length === 0 ? (i(), f("div", Id, [
          B(Y.$slots, "no-results", {}, () => [
            X[4] || (X[4] = N(" Pas de résultat "))
          ], !0)
        ])) : g("", !0)
      ], 46, kd)) : g("", !0),
      d.value ? (i(), f("p", {
        key: 1,
        id: `select-${p.value}-desc-${p.value}`,
        class: A(`fr-${p.value}-text`)
      }, h(d.value), 11, Cd)) : g("", !0)
    ], 2));
  }
}), Md = /* @__PURE__ */ ke(Ed, [["__scopeId", "data-v-7fb20102"]]), Pd = ["id", "aria-current"], Ld = /* @__PURE__ */ O({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => oe("nav", "item") },
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
}), Tn = /* @__PURE__ */ ke(Ld, [["__scopeId", "data-v-5909c19f"]]), $d = ["href"], Oa = 2, Ct = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => oe("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(a) {
    const t = a, e = w(() => typeof t.to == "string" && t.to.startsWith("http")), n = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = w(
      () => n.value || !t.icon ? void 0 : typeof t.icon == "string" ? { scale: Oa, name: t.icon } : { scale: Oa, ...t.icon || {} }
    ), l = ir() ? Ke(Xt) : void 0, o = (l == null ? void 0 : l()) ?? (() => {
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
      }, h(s.text), 9, $d)) : (i(), W(d, {
        key: 1,
        class: A(["fr-nav__link", {
          [String(s.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: u[1] || (u[1] = (p) => {
          var m;
          H(o)(), s.$emit("toggleId", s.id), (m = s.onClick) == null || m.call(s, p);
        })
      }, {
        default: U(() => [
          s.icon && r.value ? (i(), W(ge, De(Q({ key: 0 }, r.value)), null, 16)) : g("", !0),
          N(" " + h(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), Bd = { class: "fr-col-12 fr-col-lg-3" }, Sd = { class: "fr-mega-menu__category" }, Ad = { class: "fr-mega-menu__list" }, In = /* @__PURE__ */ O({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Bd, [
      c("h5", Sd, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: e[0] || (e[0] = te(() => {
          }, ["prevent"]))
        }, h(t.title), 1)
      ]),
      c("ul", Ad, [
        (i(!0), f(G, null, J(t.links, (n, r) => (i(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          ee(Ct, Q({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Od = ["aria-expanded", "aria-current", "aria-controls"], Rd = ["id"], Fd = { class: "fr-container fr-container--fluid fr-container-lg" }, Nd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Vd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, jd = { class: "fr-mega-menu__leader" }, qd = { class: "fr-h4 fr-mb-2v" }, Hd = { class: "fr-hidden fr-displayed-lg" }, Wd = /* @__PURE__ */ O({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => oe("menu") },
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
    } = Be(), s = w(() => t.id === t.expandedId);
    return pe(s, (u, d) => {
      u !== d && l(u);
    }), be(() => {
      s.value && l(!0);
    }), (u, d) => {
      const p = _e("RouterLink");
      return i(), f(G, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: d[0] || (d[0] = (m) => u.$emit("toggleId", u.id))
        }, h(u.title), 9, Od),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: A(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": H(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": H(n)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (m) => H(o)(s.value))
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
                  c("h4", qd, h(u.title), 1),
                  c("p", Hd, [
                    N(h(u.description) + " ", 1),
                    B(u.$slots, "description", {}, void 0, !0)
                  ]),
                  ee(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: U(() => [
                      N(h(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              B(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(G, null, J(u.menus, (m, D) => (i(), W(In, Q({
                key: D,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, Rd)
      ], 64);
    };
  }
}), Cn = /* @__PURE__ */ ke(Wd, [["__scopeId", "data-v-91c500cc"]]), Yd = ["id", "aria-current"], En = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => oe("menu", "item") },
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
}), Kd = ["aria-expanded", "aria-current", "aria-controls"], Qd = ["id"], zd = { class: "fr-menu__list" }, Mn = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => oe("menu") },
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
    } = Be(), s = w(() => t.id === t.expandedId);
    return pe(s, (u, d) => {
      u !== d && l(u);
    }), be(() => {
      s.value && l(!0);
    }), (u, d) => (i(), f(G, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: d[0] || (d[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        c("span", null, h(u.title), 1)
      ], 8, Kd),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: e,
        class: A(["fr-collapse fr-menu", { "fr-collapse--expanded": H(r), "fr-collapsing": H(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => H(o)(s.value))
      }, [
        c("ul", zd, [
          B(u.$slots, "default"),
          (i(!0), f(G, null, J(u.links, (p, m) => (i(), W(En, { key: m }, {
            default: U(() => [
              ee(Ct, Q({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (D) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Qd)
    ], 64));
  }
}), Gd = ["id", "aria-label"], Xd = { class: "fr-nav__list" }, Ud = /* @__PURE__ */ O({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => oe("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(a) {
    const t = a, e = K(void 0), n = (s) => {
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
        (i(!0), f(G, null, J(s.navItems, (d, p) => (i(), W(Tn, {
          id: d.id,
          key: p
        }, {
          default: U(() => [
            d.to && d.text ? (i(), W(Ct, Q({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), W(Mn, Q({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), W(Cn, Q({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : g("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, Gd));
  }
}), Zd = { class: "fr-container" }, Jd = { class: "fr-notice__body" }, ec = { class: "fr-notice__title" }, tc = { class: "fr-notice__desc" }, ac = /* @__PURE__ */ O({
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
      class: A(["fr-notice", `fr-notice--${t.type}`])
    }, [
      c("div", Zd, [
        c("div", Jd, [
          c("p", null, [
            c("span", ec, [
              B(t.$slots, "default", {}, () => [
                N(h(t.title), 1)
              ])
            ]),
            c("span", tc, [
              B(t.$slots, "desc", {}, () => [
                N(h(t.desc), 1)
              ])
            ])
          ]),
          t.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: e[0] || (e[0] = (n) => t.$emit("close"))
          }, " Masquer le message ")) : g("", !0)
        ])
      ])
    ], 2));
  }
}), nc = ["aria-label"], rc = { class: "fr-content-media__img" }, lc = ["src", "alt", "title", "ratio"], oc = { class: "fr-content-media__caption" }, sc = /* @__PURE__ */ O({
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
      class: A(["fr-content-media", {
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
            class: A(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
            alt: t.alt,
            title: t.title,
            ratio: t.ratio
          }, null, 10, lc)) : g("", !0)
        ])
      ]),
      c("figcaption", oc, h(t.legend), 1)
    ], 10, nc));
  }
}), ic = { class: "fr-quote fr-quote--column" }, uc = ["cite"], dc = { class: "fr-quote__author" }, cc = { class: "fr-quote__source" }, fc = ["href"], pc = {
  key: 0,
  class: "fr-quote__image"
}, mc = ["src"], hc = /* @__PURE__ */ O({
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
        c("p", null, "« " + h(t.quote) + " »", 1)
      ], 8, uc)) : g("", !0),
      c("figcaption", null, [
        c("p", dc, h(t.author), 1),
        c("ul", cc, [
          c("li", null, [
            c("cite", null, h(t.source), 1)
          ]),
          (i(!0), f(G, null, J(t.details, (n, r) => (i(), f("li", { key: r }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, h(n.label), 9, fc)) : (i(), f(G, { key: 1 }, [
              N(h(n), 1)
            ], 64))
          ]))), 128))
        ]),
        t.quoteImage ? (i(), f("div", pc, [
          c("img", {
            src: t.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, mc)
        ])) : g("", !0)
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
}, wc = ["src", "title"], _c = { key: 0 }, xc = ["href"], Dc = ["href"], Tc = ["href"], Pn = /* @__PURE__ */ O({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => oe("basic", "radio") },
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
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: A(["fr-radio-group", {
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
            N(h(r.label) + " ", 1),
            B(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (i(), f("span", bc, " *")) : g("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", yc, h(r.hint), 1)) : g("", !0)
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
            r.imgTitle ? (i(), f("title", _c, h(r.imgTitle), 1)) : g("", !0),
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
        ])) : g("", !0)
      ], 2)
    ], 2));
  }
}), Ic = { class: "fr-form-group" }, Cc = ["disabled", "aria-labelledby", "aria-invalid", "role"], Ec = ["id"], Mc = {
  key: 0,
  class: "fr-hint-text"
}, Pc = {
  key: 0,
  class: "required"
}, Lc = ["id"], $c = /* @__PURE__ */ O({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => oe("radio-button", "group") },
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
        class: A(["fr-fieldset", {
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
            N(h(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Mc, [
              B(u.$slots, "hint", {}, () => [
                N(h(u.hint), 1)
              ])
            ])) : g("", !0),
            B(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Pc, " *")) : g("", !0)
            ])
          ])
        ], 8, Ec)) : g("", !0),
        B(u.$slots, "default", {}, () => [
          (i(!0), f(G, null, J(u.options, (p, m) => (i(), W(Pn, Q({
            key: typeof p.value == "boolean" ? m : p.value || m,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": d[0] || (d[0] = (D) => o(D))
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
            class: A(["fr-message fr-message--info flex items-center", l.value])
          }, h(r.value), 3)
        ], 8, Lc)) : g("", !0)
      ], 10, Cc)
    ]));
  }
}), Bc = ["id"], Sc = ["id"], Ac = { class: "fr-hint-text" }, Oc = ["data-fr-prefix", "data-fr-suffix"], Rc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Fc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Nc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Vc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, jc = ["id"], qc = ["id"], Hc = /* @__PURE__ */ O({
  __name: "DsfrRange",
  props: {
    id: { default: () => oe("range") },
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
    const e = a, n = t, r = K(), l = K(), o = K(), s = w(() => e.lowerValue !== void 0), u = w(() => e.lowerValue === void 0 ? `transform: translateX(${(e.modelValue - e.min) / (e.max - e.min) * o.value}px) translateX(-${e.modelValue}%);` : `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * o.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`), d = w(() => {
      const m = (e.modelValue - e.min) / (e.max - e.min) * o.value - (s.value ? 12 : 0), D = ((e.lowerValue ?? 0) - e.min) / (e.max - e.min) * o.value;
      return {
        "--progress-right": `${m + 24}px`,
        ...s.value ? { "--progress-left": `${D + 12}px` } : {}
      };
    });
    pe([() => e.modelValue, () => e.lowerValue], ([m, D]) => {
      D !== void 0 && (s.value && m < D && n("update:lowerValue", m), s.value && D > m && n("update:modelValue", D));
    });
    const p = w(() => (e.prefix ?? "").concat(s.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return be(() => {
      var m;
      o.value = (m = r.value) == null ? void 0 : m.offsetWidth;
    }), (m, D) => (i(), f("div", {
      id: `${m.id}-group`,
      class: A(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      c("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        B(m.$slots, "label", {}, () => [
          N(h(m.label), 1)
        ]),
        c("span", Ac, [
          B(m.$slots, "hint", {}, () => [
            N(h(m.hint), 1)
          ])
        ])
      ], 8, Sc),
      c("div", {
        class: A(["fr-range", {
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
        }, h(p.value), 5),
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
          onInput: D[0] || (D[0] = (C) => {
            var k;
            return n("update:lowerValue", +((k = C.target) == null ? void 0 : k.value));
          })
        }, null, 40, Rc)) : g("", !0),
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
          onInput: D[1] || (D[1] = (C) => {
            var k;
            return n("update:modelValue", +((k = C.target) == null ? void 0 : k.value));
          })
        }, null, 40, Fc),
        m.hideIndicators ? g("", !0) : (i(), f("span", Nc, h(m.min), 1)),
        m.hideIndicators ? g("", !0) : (i(), f("span", Vc, h(m.max), 1))
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
          }, h(m.message), 9, qc)) : g("", !0)
        ])
      ], 8, jc)) : g("", !0)
    ], 10, Bc));
  }
}), Wc = { class: "fr-segmented__element" }, Yc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Kc = ["for"], Qc = { key: 1 }, Ln = /* @__PURE__ */ O({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => oe("basic", "checkbox") },
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
        class: A(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (i(), W(ge, De(Q({ key: 0 }, e.value)), null, 16)) : g("", !0),
        r.icon ? (i(), f("span", Qc, " ")) : g("", !0),
        N(" " + h(r.label), 1)
      ], 10, Kc)
    ]));
  }
}), zc = { class: "fr-form-group" }, Gc = ["disabled"], Xc = ["id"], Uc = {
  key: 0,
  class: "fr-hint-text"
}, Zc = { class: "fr-segmented__elements" }, Jc = /* @__PURE__ */ O({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => oe("radio-button", "group") },
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
        class: A(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (i(), f("legend", {
          key: 0,
          id: l.titleId,
          class: A(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          B(l.$slots, "legend", {}, () => [
            N(h(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", Uc, h(l.hint), 1)) : g("", !0)
        ], 10, Xc)) : g("", !0),
        c("div", Zc, [
          B(l.$slots, "default", {}, () => [
            (i(!0), f(G, null, J(l.options, (s, u) => (i(), W(Ln, Q({
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
}, nf = ["id", "name", "disabled", "aria-disabled", "required"], rf = ["selected"], lf = ["selected", "value", "disabled", "aria-disabled"], of = ["id"], sf = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => oe("select") },
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
      class: A(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        B(r.$slots, "label", {}, () => [
          N(h(r.label) + " ", 1),
          B(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", tf, " *")) : g("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", af, h(r.hint ?? r.description), 1)) : g("", !0)
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
        }, h(r.defaultUnselectedText), 9, rf),
        (i(!0), f(G, null, J(r.options, (o, s) => (i(), f("option", {
          key: s,
          selected: r.modelValue === o || typeof o == "object" && o.value === r.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, h(typeof o == "object" ? o.text : o), 9, lf))), 128))
      ], 16, nf),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: A(`fr-${n.value}-text`)
      }, h(e.value), 11, of)) : g("", !0)
    ], 2));
  }
}), uf = { class: "fr-share" }, df = { class: "fr-share__title" }, cf = { class: "fr-btns-group" }, ff = ["title", "href", "onClick"], pf = { key: 0 }, mf = ["href", "title"], hf = ["title"], vf = /* @__PURE__ */ O({
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
        c("p", df, h(n.title), 1),
        c("ul", cf, [
          (i(!0), f(G, null, J(n.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: A(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: te((u) => e(o), ["prevent"])
            }, h(o.label), 11, ff)
          ]))), 128)),
          (l = n.mail) != null && l.to ? (i(), f("li", pf, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, h(n.mail.label), 9, mf)
          ])) : g("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: r[0] || (r[0] = (o) => t())
            }, h(n.copyLabel), 9, hf)
          ])
        ])
      ]);
    };
  }
}), gf = ["aria-current", "aria-expanded", "aria-controls"], $n = /* @__PURE__ */ O({
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
}), Bn = /* @__PURE__ */ O({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      class: A(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      B(t.$slots, "default")
    ], 2));
  }
}), bf = ["id"], yf = { class: "fr-sidemenu__list" }, Sn = /* @__PURE__ */ O({
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
    } = Be();
    pe(() => t.expanded, (p, m) => {
      p !== m && l(p);
    }), be(() => {
      t.expanded && l(!0);
    });
    const s = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => s(p) ? "a" : "RouterLink", d = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, m) => {
      const D = _e("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: A({
          "fr-collapse": p.collapsable,
          "fr-collapsing": H(n),
          "fr-collapse--expanded": H(r)
        }),
        onTransitionend: m[2] || (m[2] = (C) => H(o)(!!p.expanded))
      }, [
        c("ul", yf, [
          B(p.$slots, "default"),
          (i(!0), f(G, null, J(p.menuItems, (C, k) => (i(), W(Bn, {
            key: k,
            active: C.active
          }, {
            default: U(() => [
              C.menuItems ? g("", !0) : (i(), W(ve(u(C.to)), Q({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": C.active ? "page" : void 0,
                ref_for: !0
              }, d(C.to)), {
                default: U(() => [
                  N(h(C.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              C.menuItems ? (i(), f(G, { key: 1 }, [
                ee($n, {
                  active: !!C.active,
                  expanded: !!C.expanded,
                  "control-id": C.id,
                  onToggleExpand: m[0] || (m[0] = ($) => p.$emit("toggleExpand", $))
                }, {
                  default: U(() => [
                    N(h(C.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                C.menuItems ? (i(), W(D, {
                  key: 0,
                  id: C.id,
                  collapsable: "",
                  expanded: C.expanded,
                  "menu-items": C.menuItems,
                  onToggleExpand: m[1] || (m[1] = ($) => p.$emit("toggleExpand", $))
                }, null, 8, ["id", "expanded", "menu-items"])) : g("", !0)
              ], 64)) : g("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, bf);
    };
  }
}), kf = ["aria-labelledby"], wf = { class: "fr-sidemenu__inner" }, _f = ["aria-controls", "aria-expanded"], xf = ["id"], Df = /* @__PURE__ */ O({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => oe("sidemenu") },
    sideMenuListId: { default: () => oe("sidemenu", "list") },
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
    } = Be(), o = K(!1);
    return pe(o, (s, u) => {
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
          onClick: u[0] || (u[0] = te((d) => o.value = !o.value, ["prevent", "stop"]))
        }, h(s.buttonLabel), 9, _f),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: t,
          class: A(["fr-collapse", {
            "fr-collapse--expanded": H(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": H(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => H(l)(o.value))
        }, [
          (i(), W(ve(s.titleTag), { class: "fr-sidemenu__title" }, {
            default: U(() => [
              N(h(s.headingTitle), 1)
            ]),
            _: 1
          })),
          B(s.$slots, "default", {}, () => [
            ee(Sn, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: u[1] || (u[1] = (d) => s.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, xf)
      ])
    ], 8, kf));
  }
}), Tf = /* @__PURE__ */ O({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const t = a, e = w(() => typeof t.to == "string" && t.to.startsWith("http")), n = w(() => e.value ? "a" : "RouterLink"), r = w(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, o) => (i(), W(ve(n.value), Q({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: U(() => [
        B(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), If = { class: "fr-skiplinks" }, Cf = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Ef = { class: "fr-skiplinks__list" }, Mf = ["href", "onClick"], Pf = /* @__PURE__ */ O({
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
      c("nav", Cf, [
        c("ul", Ef, [
          (i(!0), f(G, null, J(e.links, (r) => (i(), f("li", {
            key: r.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${r.id}`,
              onClick: (l) => t(r.id)
            }, h(r.text), 9, Mf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Lf = { class: "fr-stepper" }, $f = { class: "fr-stepper__title" }, Bf = { class: "fr-stepper__state" }, Sf = ["data-fr-current-step", "data-fr-steps"], Af = { class: "fr-stepper__details" }, Of = {
  key: 0,
  class: "fr-text--bold"
}, Rf = /* @__PURE__ */ O({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Lf, [
      c("h2", $f, [
        N(h(t.steps[t.currentStep - 1]) + " ", 1),
        c("span", Bf, "Étape " + h(t.currentStep) + " sur " + h(t.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, Sf),
      c("p", Af, [
        t.currentStep < t.steps.length ? (i(), f("span", Of, "Étape suivante :")) : g("", !0),
        N(" " + h(t.steps[t.currentStep]), 1)
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
}, Vf = { class: "fr-summary__list" }, jf = ["href"], qf = /* @__PURE__ */ O({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("nav", Ff, [
      c("h2", Nf, h(t.title), 1),
      c("ol", Vf, [
        (i(!0), f(G, null, J(t.anchors, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, h(n.name), 9, jf)
        ]))), 128))
      ])
    ]));
  }
}), Hf = ["id", "aria-labelledby", "tabindex"], Wf = /* @__PURE__ */ O({
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
    const t = a, e = { true: "100%", false: "-100%" }, n = Ke(kt), { isVisible: r, asc: l } = n(lt(() => t.tabId)), o = w(() => e[String(l == null ? void 0 : l.value)]), s = w(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), W(fr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: U(() => [
        Pe(c("div", {
          id: u.panelId,
          class: A(["fr-tabs__panel", {
            "fr-tabs__panel--selected": H(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: H(r) ? 0 : -1
        }, [
          B(u.$slots, "default", {}, void 0, !0)
        ], 10, Hf), [
          [pr, H(r)]
        ])
      ]),
      _: 3
    }));
  }
}), An = /* @__PURE__ */ ke(Wf, [["__scopeId", "data-v-5774b16c"]]), Yf = { role: "presentation" }, Kf = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Qf = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, On = /* @__PURE__ */ O({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = K(null), l = {
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
    const s = Ke(kt), { isVisible: u } = s(lt(() => e.tabId));
    return (d, p) => (i(), f("li", Yf, [
      c("button", {
        id: d.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${d.tabId}`,
        class: "fr-tabs__tab",
        tabindex: H(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": H(u),
        "aria-controls": d.panelId,
        onClick: p[0] || (p[0] = te((m) => d.$emit("click", d.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (m) => o(m))
      }, [
        d.icon ? (i(), f("span", Qf, [
          ee(ge, { name: d.icon }, null, 8, ["name"])
        ])) : g("", !0),
        B(d.$slots, "default")
      ], 40, Kf)
    ]));
  }
}), Rn = /* @__PURE__ */ O({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", Q(r.headerAttrs, { scope: "col" }), [
      N(h(r.header) + " ", 1),
      r.icon && !e.value ? (i(), W(ge, De(Q({ key: 0 }, n.value)), null, 16)) : g("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: A({ [String(r.icon)]: e.value })
      }, null, 2)) : g("", !0)
    ], 16));
  }
}), zf = { key: 0 }, Fn = /* @__PURE__ */ O({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (t, e) => t.headers ? (i(), f("tr", zf, [
      (i(!0), f(G, null, J(t.headers, (n, r) => (i(), W(Rn, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : g("", !0);
  }
}), Nn = /* @__PURE__ */ O({
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
      e.value ? (i(), W(ve(e.value), De(Q({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: U(() => [
          N(h(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(G, { key: 1 }, [
        N(h(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Vn = /* @__PURE__ */ O({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (t, e) => (i(), f("tr", De(yt(t.rowAttrs)), [
      B(t.$slots, "default"),
      (i(!0), f(G, null, J(t.rowData, (n, r) => (i(), W(Nn, {
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
}, rp = { class: "self-center fr-m-0" }, lp = { class: "flex ml-1" }, op = /* @__PURE__ */ O({
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
    const e = a, n = t, r = (x) => Array.isArray(x) ? x : x.rowData, l = K(e.currentPage), o = oe("resultPerPage"), s = K(e.resultsDisplayed), u = w(
      () => e.rows.length > s.value ? Math.ceil(e.rows.length / s.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * s.value - s.value, m = () => l.value * s.value, D = w(() => e.pagination ? e.rows.slice(p(), m()) : e.rows), C = () => {
      l.value = 1, n("update:currentPage");
    }, k = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, $ = () => {
      l.value < u.value && (l.value += 1, n("update:currentPage"));
    }, y = () => {
      l.value = u.value, n("update:currentPage");
    };
    return (x, T) => (i(), f("div", {
      class: A(["fr-table", { "fr-table--no-caption": x.noCaption }])
    }, [
      c("table", null, [
        c("caption", Gf, h(x.title), 1),
        c("thead", null, [
          B(x.$slots, "header", {}, () => [
            x.headers && x.headers.length ? (i(), W(Fn, {
              key: 0,
              headers: x.headers
            }, null, 8, ["headers"])) : g("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          B(x.$slots, "default", {}, void 0, !0),
          x.rows && x.rows.length ? (i(!0), f(G, { key: 0 }, J(D.value, (P, v) => (i(), W(Vn, {
            key: x.rowKey && r(P) ? typeof x.rowKey == "string" ? r(P)[x.headers.indexOf(x.rowKey)].toString() : x.rowKey(r(P)) : v,
            "row-data": r(P),
            "row-attrs": "rowAttrs" in P ? P.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : g("", !0),
          x.pagination ? (i(), f("tr", Xf, [
            c("td", {
              colspan: x.headers.length
            }, [
              c("div", Zf, [
                c("div", Jf, [
                  c("label", { for: H(o) }, "Résultats par page : ", 8, ep),
                  Pe(c("select", {
                    id: H(o),
                    "onUpdate:modelValue": T[0] || (T[0] = (P) => s.value = P),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: T[1] || (T[1] = (P) => n("update:currentPage"))
                  }, [
                    (i(), f(G, null, J(d, (P, v) => c("option", {
                      key: v,
                      value: P
                    }, h(P), 9, ap)), 64))
                  ], 40, tp), [
                    [zt, s.value]
                  ])
                ]),
                c("div", np, [
                  c("p", rp, " Page " + h(l.value) + " sur " + h(u.value), 1)
                ]),
                c("div", lp, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: T[2] || (T[2] = (P) => C())
                  }, T[6] || (T[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: T[3] || (T[3] = (P) => k())
                  }, T[7] || (T[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (P) => $())
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
          ])) : g("", !0)
        ])
      ])
    ], 2));
  }
}), sp = /* @__PURE__ */ ke(op, [["__scopeId", "data-v-b22b8019"]]), ip = ["aria-label"], up = /* @__PURE__ */ O({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = K(!1), o = w({
      get: () => n.modelValue,
      set(v) {
        r("update:modelValue", v);
      }
    }), s = K(/* @__PURE__ */ new Map()), u = K(0);
    Re(kt, (v) => {
      const R = K(!0);
      if (pe(o, (I, E) => {
        R.value = I > E;
      }), [...s.value.values()].includes(v.value))
        return { isVisible: w(() => s.value.get(o.value) === v.value), asc: R };
      const _ = u.value++;
      s.value.set(_, v.value);
      const M = w(() => _ === o.value);
      return pe(v, () => {
        s.value.set(_, v.value);
      }), Te(() => {
        s.value.delete(_);
      }), { isVisible: M };
    });
    const d = K(null), p = K(null), m = ur({}), D = (v) => {
      if (m[v])
        return m[v];
      const R = oe("tab");
      return m[v] = R, R;
    }, C = async () => {
      const v = o.value === 0 ? n.tabTitles.length - 1 : o.value - 1;
      l.value = !1, o.value = v;
    }, k = async () => {
      const v = o.value === n.tabTitles.length - 1 ? 0 : o.value + 1;
      l.value = !0, o.value = v;
    }, $ = async () => {
      o.value = 0;
    }, y = async () => {
      o.value = n.tabTitles.length - 1;
    }, x = K({ "--tabs-height": "100px" }), T = () => {
      var v;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const R = p.value.offsetHeight, _ = (v = d.value) == null ? void 0 : v.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!_ || !_.offsetHeight)
        return;
      const M = _.offsetHeight;
      x.value["--tabs-height"] = `${R + M}px`;
    }, P = K(null);
    return be(() => {
      var v;
      window.ResizeObserver && (P.value = new window.ResizeObserver(() => {
        T();
      })), (v = d.value) == null || v.querySelectorAll(".fr-tabs__panel").forEach((R) => {
        var _;
        R && ((_ = P.value) == null || _.observe(R));
      });
    }), Te(() => {
      var v;
      (v = d.value) == null || v.querySelectorAll(".fr-tabs__panel").forEach((R) => {
        var _;
        R && ((_ = P.value) == null || _.unobserve(R));
      });
    }), t({
      renderTabs: T,
      selectFirst: $,
      selectLast: y
    }), (v, R) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: xe(x.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": v.tabListName
      }, [
        B(v.$slots, "tab-items", {}, () => [
          (i(!0), f(G, null, J(v.tabTitles, (_, M) => (i(), W(On, {
            key: M,
            icon: _.icon,
            "panel-id": _.panelId || `${D(M)}-panel`,
            "tab-id": _.tabId || D(M),
            onClick: (I) => o.value = M,
            onNext: R[0] || (R[0] = (I) => k()),
            onPrevious: R[1] || (R[1] = (I) => C()),
            onFirst: R[2] || (R[2] = (I) => $()),
            onLast: R[3] || (R[3] = (I) => y())
          }, {
            default: U(() => [
              N(h(_.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, ip),
      (i(!0), f(G, null, J(v.tabContents, (_, M) => {
        var I, E, j, b;
        return i(), W(An, {
          key: M,
          "panel-id": ((E = (I = v.tabTitles) == null ? void 0 : I[M]) == null ? void 0 : E.panelId) || `${D(M)}-panel`,
          "tab-id": ((b = (j = v.tabTitles) == null ? void 0 : j[M]) == null ? void 0 : b.tabId) || D(M)
        }, {
          default: U(() => [
            N(h(_), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      B(v.$slots, "default")
    ], 4));
  }
}), dp = /* @__PURE__ */ O({
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
    return (u, d) => (i(), W(ve(n.value), Q({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: l.value,
        "fr-tag--icon-left": l.value
      }],
      disabled: u.disabled
    }, r.value), {
      default: U(() => [
        t.icon && !l.value ? (i(), W(ge, Q({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : g("", !0),
        u.iconOnly ? g("", !0) : (i(), f(G, { key: 1 }, [
          N(h(u.label), 1)
        ], 64)),
        B(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), la = /* @__PURE__ */ ke(dp, [["__scopeId", "data-v-bdaecd28"]]), cp = { class: "fr-tags-group" }, fp = /* @__PURE__ */ O({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("ul", cp, [
      (i(!0), f(G, null, J(t.tags, ({ icon: n, label: r, ...l }, o) => (i(), f("li", { key: o }, [
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
}, wp = ["src"], _p = ["href"], xp = ["href"], Dp = ["href"], Tp = /* @__PURE__ */ O({
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
        class: A(["fr-tile fr-enlarge-link", [{
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
            (i(), W(ve(r.titleTag), { class: "fr-tile__title" }, {
              default: U(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, h(r.title), 9, hp)) : g("", !0),
                n.value ? g("", !0) : (i(), W(o, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: U(() => [
                    N(h(r.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            r.description ? (i(), f("p", vp, h(r.description), 1)) : g("", !0),
            r.details ? (i(), f("p", gp, h(r.details), 1)) : g("", !0),
            r.$slots["start-details"] ? (i(), f("div", bp, [
              B(r.$slots, "start-details", {}, void 0, !0)
            ])) : g("", !0)
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
          ])) : g("", !0)
        ])
      ], 2);
    };
  }
}), jn = /* @__PURE__ */ ke(Tp, [["__scopeId", "data-v-f4d836a2"]]), Ip = { class: "fr-grid-row fr-grid-row--gutters" }, Cp = /* @__PURE__ */ O({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ip, [
      (i(!0), f(G, null, J(t.tiles, (n, r) => (i(), f("div", {
        key: r,
        class: A({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        ee(jn, Q({
          horizontal: t.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Ep = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Mp = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Pp = ["id"], Lp = /* @__PURE__ */ O({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => oe("toggle") },
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
      class: A(["fr-toggle", {
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
      }, null, 40, Ep),
      c("label", {
        id: e.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, h(n.label), 9, Mp),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, h(n.hint), 9, Pp)) : g("", !0)
    ], 2));
  }
}), $p = ["id"], Bp = /* @__PURE__ */ O({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => oe("tooltip") }
  },
  setup(a) {
    const t = a, e = K(!1), n = K(null), r = K(null), l = K("0px"), o = K("0px"), s = K("0px"), u = K(!1), d = K(0);
    async function p() {
      var T, P, v, R, _, M;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((z) => setTimeout(z, 100));
      const I = (T = n.value) == null ? void 0 : T.getBoundingClientRect().top, E = (P = n.value) == null ? void 0 : P.offsetHeight, j = (v = n.value) == null ? void 0 : v.offsetWidth, b = (R = n.value) == null ? void 0 : R.getBoundingClientRect().left, L = (_ = r.value) == null ? void 0 : _.offsetHeight, q = (M = r.value) == null ? void 0 : M.offsetWidth, S = !(I - L < 0) && I + E + L >= document.documentElement.offsetHeight;
      u.value = S;
      const F = b + j >= document.documentElement.offsetWidth, Z = b + j / 2 - q / 2 <= 0;
      o.value = S ? `${I - L + 8}px` : `${I + E - 8}px`, d.value = 1, l.value = F ? `${b + j - q - 4}px` : Z ? `${b + 4}px` : `${b + j / 2 - q / 2}px`, s.value = F ? `${q / 2 - j / 2 + 4}px` : Z ? `${-(q / 2) + j / 2 - 4}px` : "0px";
    }
    pe(e, p, { immediate: !0 }), be(() => {
      window.addEventListener("scroll", p);
    }), Te(() => {
      window.removeEventListener("scroll", p);
    });
    const m = w(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), D = w(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), C = (T) => {
      var P, v;
      e.value && (T.target === n.value || (P = n.value) != null && P.contains(T.target) || T.target === r.value || (v = r.value) != null && v.contains(T.target) || (e.value = !1));
    }, k = (T) => {
      T.key === "Escape" && (e.value = !1);
    };
    be(() => {
      document.documentElement.addEventListener("click", C), document.documentElement.addEventListener("keydown", k);
    }), Te(() => {
      document.documentElement.removeEventListener("click", C), document.documentElement.removeEventListener("keydown", k);
    });
    const $ = () => {
      t.onHover && (e.value = !0);
    }, y = () => {
      t.onHover && (e.value = !1);
    }, x = () => {
      t.onHover || (e.value = !e.value);
    };
    return (T, P) => (i(), f(G, null, [
      (i(), W(ve(T.onHover ? "a" : "button"), Q(T.$attrs, {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: n,
        class: T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: P[0] || (P[0] = te((v) => x(), ["stop"])),
        onMouseenter: P[1] || (P[1] = (v) => $()),
        onMouseleave: P[2] || (P[2] = (v) => y()),
        onFocus: P[3] || (P[3] = (v) => $()),
        onBlur: P[4] || (P[4] = (v) => y())
      }), {
        default: U(() => [
          B(T.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: T.id,
        ref_key: "tooltip",
        ref: r,
        class: A(["fr-tooltip fr-placement", D.value]),
        style: xe(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, h(T.content), 15, $p)
    ], 64));
  }
}), Sp = /* @__PURE__ */ ke(Bp, [["__scopeId", "data-v-d1e31d94"]]), Ap = { class: "fr-transcription" }, Op = ["aria-expanded", "aria-controls"], Rp = ["id"], Fp = ["id", "aria-labelledby"], Np = { class: "fr-container fr-container--fluid fr-container-md" }, Vp = { class: "fr-grid-row fr-grid-row--center" }, jp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, qp = { class: "fr-modal__body" }, Hp = { class: "fr-modal__header" }, Wp = ["aria-controls"], Yp = { class: "fr-modal__content" }, Kp = ["id"], Qp = { class: "fr-transcription__footer" }, zp = { class: "fr-transcription__actions-group" }, Gp = ["aria-controls"], qn = /* @__PURE__ */ O({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => oe("transcription") },
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
    } = Be(), s = K(!1), u = K(!1), d = w(() => `fr-transcription__modal-${t.id}`), p = w(() => `fr-transcription__collapse-${t.id}`);
    return pe(u, (m, D) => {
      m !== D && l(m);
    }), (m, D) => (i(), f("div", Ap, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: D[0] || (D[0] = (C) => u.value = !u.value)
      }, " Transcription ", 8, Op),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: e,
        class: A(["fr-collapse", { "fr-collapse--expanded": H(r), "fr-collapsing": H(n) }]),
        onTransitionend: D[2] || (D[2] = (C) => H(o)(u.value))
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
                    }, h(m.title), 9, Kp),
                    N(" " + h(m.content), 1)
                  ]),
                  c("div", Qp, [
                    c("div", zp, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: D[1] || (D[1] = (C) => s.value = !0)
                      }, " Agrandir ", 8, Gp)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, Fp)
      ], 42, Rp),
      (i(), W(dr, { to: "body" }, [
        ee(Dn, {
          title: m.title,
          opened: s.value,
          onClose: D[3] || (D[3] = (C) => s.value = !1)
        }, {
          default: U(() => [
            B(m.$slots, "default", {}, () => [
              N(h(m.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Xp = ["src"], Up = { class: "fr-content-media__caption" }, Zp = /* @__PURE__ */ O({
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
    return (t, e) => (i(), f(G, null, [
      c("figure", {
        class: A(["fr-content-media", {
          "fr-content-media--sm": t.size === "small",
          "fr-content-media--lg": t.size === "large"
        }])
      }, [
        c("div", {
          class: A(["fr-responsive-vid", `fr-ratio-${t.ratio}`])
        }, [
          c("iframe", {
            src: t.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Xp)
        ], 2),
        c("div", Up, h(t.legend), 1)
      ], 2),
      ee(qn, {
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
  DsfrBackToTop: Cr,
  DsfrBadge: za,
  DsfrBreadcrumb: Sr,
  DsfrButton: qe,
  DsfrButtonGroup: Dt,
  DsfrCallout: Ql,
  DsfrCard: so,
  DsfrCardDetail: Vt,
  DsfrCheckbox: Tt,
  DsfrCheckboxSet: yo,
  DsfrConsent: xo,
  DsfrDataTable: ls,
  DsfrErrorPage: ps,
  DsfrFieldset: fn,
  DsfrFileDownload: pn,
  DsfrFileDownloadList: _s,
  DsfrFileUpload: Ms,
  DsfrFollow: Xs,
  DsfrFooter: Ii,
  DsfrFooterLink: vn,
  DsfrFooterLinkList: Pi,
  DsfrFooterPartners: gn,
  DsfrFranceConnect: Si,
  DsfrHeader: ku,
  DsfrHeaderMenuLink: ra,
  DsfrHeaderMenuLinks: jt,
  DsfrHighlight: wu,
  DsfrInput: It,
  DsfrInputGroup: Cu,
  DsfrLanguageSelector: nt,
  DsfrLogo: at,
  DsfrModal: Dn,
  DsfrMultiselect: Md,
  DsfrNavigation: Ud,
  DsfrNavigationItem: Tn,
  DsfrNavigationMegaMenu: Cn,
  DsfrNavigationMegaMenuCategory: In,
  DsfrNavigationMenu: Mn,
  DsfrNavigationMenuItem: En,
  DsfrNavigationMenuLink: Ct,
  DsfrNewsLetter: mn,
  DsfrNotice: ac,
  DsfrPagination: na,
  DsfrPicture: sc,
  DsfrQuote: hc,
  DsfrRadioButton: Pn,
  DsfrRadioButtonSet: $c,
  DsfrRange: Hc,
  DsfrSearchBar: rt,
  DsfrSegmented: Ln,
  DsfrSegmentedSet: Jc,
  DsfrSelect: sf,
  DsfrShare: vf,
  DsfrSideMenu: Df,
  DsfrSideMenuButton: $n,
  DsfrSideMenuLink: Tf,
  DsfrSideMenuList: Sn,
  DsfrSideMenuListItem: Bn,
  DsfrSkipLinks: Pf,
  DsfrSocialNetworks: hn,
  DsfrStepper: Rf,
  DsfrSummary: qf,
  DsfrTabContent: An,
  DsfrTabItem: On,
  DsfrTable: sp,
  DsfrTableCell: Nn,
  DsfrTableHeader: Rn,
  DsfrTableHeaders: Fn,
  DsfrTableRow: Vn,
  DsfrTabs: up,
  DsfrTag: la,
  DsfrTags: fp,
  DsfrTile: jn,
  DsfrTiles: Cp,
  DsfrToggleSwitch: Lp,
  DsfrTooltip: Sp,
  DsfrTranscription: qn,
  DsfrVideo: Zp,
  VIcon: ge,
  registerAccordionKey: Gt,
  registerNavigationLinkKey: Xt,
  registerTabKey: kt
}, Symbol.toStringTag, { value: "Module" })), em = {
  install: (a, { components: t } = {}) => {
    Object.entries(Jp).forEach(([e, n]) => {
      (t === void 0 || t === "all" || t.map(({ name: r }) => r).includes(e)) && a.component(e, n);
    }), a.component("VIcon", ge);
  }
}, Hn = 6048e5, tm = 864e5, am = 6e4, nm = 36e5, rm = 1e3, Ra = Symbol.for("constructDateFrom");
function ye(a, t) {
  return typeof a == "function" ? a(t) : a && typeof a == "object" && Ra in a ? a[Ra](t) : a instanceof Date ? new a.constructor(t) : new Date(t);
}
function me(a, t) {
  return ye(t || a, a);
}
function Wn(a, t, e) {
  const n = me(a, e == null ? void 0 : e.in);
  return isNaN(t) ? ye((e == null ? void 0 : e.in) || a, NaN) : (t && n.setDate(n.getDate() + t), n);
}
let lm = {};
function ze() {
  return lm;
}
function Fe(a, t) {
  var s, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = me(a, t == null ? void 0 : t.in), l = r.getDay(), o = (l < n ? 7 : 0) + l - n;
  return r.setDate(r.getDate() - o), r.setHours(0, 0, 0, 0), r;
}
function Qe(a, t) {
  return Fe(a, { ...t, weekStartsOn: 1 });
}
function Yn(a, t) {
  const e = me(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ye(e, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Qe(r), o = ye(e, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const s = Qe(o);
  return e.getTime() >= l.getTime() ? n + 1 : e.getTime() >= s.getTime() ? n : n - 1;
}
function vt(a) {
  const t = me(a), e = new Date(
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
function Fa(a, t) {
  const e = me(a, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function sm(a, t, e) {
  const [n, r] = om(
    e == null ? void 0 : e.in,
    a,
    t
  ), l = Fa(n), o = Fa(r), s = +l - vt(l), u = +o - vt(o);
  return Math.round((s - u) / tm);
}
function im(a, t) {
  const e = Yn(a, t), n = ye(a, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Qe(n);
}
function um(a) {
  return a instanceof Date || typeof a == "object" && Object.prototype.toString.call(a) === "[object Date]";
}
function dm(a) {
  return !(!um(a) && typeof a != "number" || isNaN(+me(a)));
}
function cm(a, t) {
  const e = me(a, t == null ? void 0 : t.in);
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
}, Cm = {
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
    const o = l[0], s = n && a.parsePatterns[n] || a.parsePatterns[a.defaultParseWidth], u = Array.isArray(s) ? Mm(s, (m) => m.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      Em(s, (m) => m.test(o))
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
function Em(a, t) {
  for (const e in a)
    if (Object.prototype.hasOwnProperty.call(a, e) && t(a[e]))
      return e;
}
function Mm(a, t) {
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
const Lm = /^(\d+)(th|st|nd|rd)?/i, $m = /\d+/i, Bm = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Sm = {
  any: [/^b/i, /^(a|c)/i]
}, Am = {
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
    parsePattern: $m,
    valueCallback: (a) => parseInt(a, 10)
  }),
  era: Ze({
    matchPatterns: Bm,
    defaultMatchWidth: "wide",
    parsePatterns: Sm,
    defaultParseWidth: "any"
  }),
  quarter: Ze({
    matchPatterns: Am,
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
}, Kn = {
  code: "en-US",
  formatDistance: pm,
  formatLong: gm,
  formatRelative: ym,
  localize: Cm,
  match: Hm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Wm(a, t) {
  const e = me(a, t == null ? void 0 : t.in);
  return sm(e, cm(e)) + 1;
}
function Qn(a, t) {
  const e = me(a, t == null ? void 0 : t.in), n = +Qe(e) - +im(e);
  return Math.round(n / Hn) + 1;
}
function oa(a, t) {
  var p, m, D, C;
  const e = me(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((m = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((C = (D = r.locale) == null ? void 0 : D.options) == null ? void 0 : C.firstWeekContainsDate) ?? 1, o = ye((t == null ? void 0 : t.in) || a, 0);
  o.setFullYear(n + 1, 0, l), o.setHours(0, 0, 0, 0);
  const s = Fe(o, t), u = ye((t == null ? void 0 : t.in) || a, 0);
  u.setFullYear(n, 0, l), u.setHours(0, 0, 0, 0);
  const d = Fe(u, t);
  return +e >= +s ? n + 1 : +e >= +d ? n : n - 1;
}
function Ym(a, t) {
  var s, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : u.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = oa(a, t), l = ye((t == null ? void 0 : t.in) || a, 0);
  return l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0), Fe(l, t);
}
function zn(a, t) {
  const e = me(a, t == null ? void 0 : t.in), n = +Fe(e, t) - +Ym(e, t);
  return Math.round(n / Hn) + 1;
}
function ie(a, t) {
  const e = a < 0 ? "-" : "", n = Math.abs(a).toString().padStart(t, "0");
  return e + n;
}
const Oe = {
  // Year
  y(a, t) {
    const e = a.getFullYear(), n = e > 0 ? e : 1 - e;
    return ie(t === "yy" ? n % 100 : n, t.length);
  },
  // Month
  M(a, t) {
    const e = a.getMonth();
    return t === "M" ? String(e + 1) : ie(e + 1, 2);
  },
  // Day of the month
  d(a, t) {
    return ie(a.getDate(), t.length);
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
    return ie(a.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(a, t) {
    return ie(a.getHours(), t.length);
  },
  // Minute
  m(a, t) {
    return ie(a.getMinutes(), t.length);
  },
  // Second
  s(a, t) {
    return ie(a.getSeconds(), t.length);
  },
  // Fraction of second
  S(a, t) {
    const e = t.length, n = a.getMilliseconds(), r = Math.trunc(
      n * Math.pow(10, e - 3)
    );
    return ie(r, t.length);
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
}, Na = {
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
    return Oe.y(a, t);
  },
  // Local week-numbering year
  Y: function(a, t, e, n) {
    const r = oa(a, n), l = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const o = l % 100;
      return ie(o, 2);
    }
    return t === "Yo" ? e.ordinalNumber(l, { unit: "year" }) : ie(l, t.length);
  },
  // ISO week-numbering year
  R: function(a, t) {
    const e = Yn(a);
    return ie(e, t.length);
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
    return ie(e, t.length);
  },
  // Quarter
  Q: function(a, t, e) {
    const n = Math.ceil((a.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(n);
      case "QQ":
        return ie(n, 2);
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
        return ie(n, 2);
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
        return Oe.M(a, t);
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
        return ie(n + 1, 2);
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
    const r = zn(a, n);
    return t === "wo" ? e.ordinalNumber(r, { unit: "week" }) : ie(r, t.length);
  },
  // ISO week of year
  I: function(a, t, e) {
    const n = Qn(a);
    return t === "Io" ? e.ordinalNumber(n, { unit: "week" }) : ie(n, t.length);
  },
  // Day of the month
  d: function(a, t, e) {
    return t === "do" ? e.ordinalNumber(a.getDate(), { unit: "date" }) : Oe.d(a, t);
  },
  // Day of year
  D: function(a, t, e) {
    const n = Wm(a);
    return t === "Do" ? e.ordinalNumber(n, { unit: "dayOfYear" }) : ie(n, t.length);
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
        return ie(l, 2);
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
        return ie(l, t.length);
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
        return ie(r, t.length);
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
    return Oe.h(a, t);
  },
  // Hour [0-23]
  H: function(a, t, e) {
    return t === "Ho" ? e.ordinalNumber(a.getHours(), { unit: "hour" }) : Oe.H(a, t);
  },
  // Hour [0-11]
  K: function(a, t, e) {
    const n = a.getHours() % 12;
    return t === "Ko" ? e.ordinalNumber(n, { unit: "hour" }) : ie(n, t.length);
  },
  // Hour [1-24]
  k: function(a, t, e) {
    let n = a.getHours();
    return n === 0 && (n = 24), t === "ko" ? e.ordinalNumber(n, { unit: "hour" }) : ie(n, t.length);
  },
  // Minute
  m: function(a, t, e) {
    return t === "mo" ? e.ordinalNumber(a.getMinutes(), { unit: "minute" }) : Oe.m(a, t);
  },
  // Second
  s: function(a, t, e) {
    return t === "so" ? e.ordinalNumber(a.getSeconds(), { unit: "second" }) : Oe.s(a, t);
  },
  // Fraction of second
  S: function(a, t) {
    return Oe.S(a, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(a, t, e) {
    const n = a.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (t) {
      case "X":
        return ja(n);
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
        return ja(n);
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
        return "GMT" + Va(n, ":");
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
        return "GMT" + Va(n, ":");
      case "zzzz":
      default:
        return "GMT" + Ne(n, ":");
    }
  },
  // Seconds timestamp
  t: function(a, t, e) {
    const n = Math.trunc(+a / 1e3);
    return ie(n, t.length);
  },
  // Milliseconds timestamp
  T: function(a, t, e) {
    return ie(+a, t.length);
  }
};
function Va(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = Math.trunc(n / 60), l = n % 60;
  return l === 0 ? e + String(r) : e + String(r) + t + ie(l, 2);
}
function ja(a, t) {
  return a % 60 === 0 ? (a > 0 ? "-" : "+") + ie(Math.abs(a) / 60, 2) : Ne(a, t);
}
function Ne(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = ie(Math.trunc(n / 60), 2), l = ie(n % 60, 2);
  return e + r + t + l;
}
const qa = (a, t) => {
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
}, Gn = (a, t) => {
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
}, Km = (a, t) => {
  const e = a.match(/(P+)(p+)?/) || [], n = e[1], r = e[2];
  if (!r)
    return qa(a, t);
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
  return l.replace("{{date}}", qa(n, t)).replace("{{time}}", Gn(r, t));
}, Wt = {
  p: Gn,
  P: Km
}, Qm = /^D+$/, zm = /^Y+$/, Gm = ["D", "DD", "YY", "YYYY"];
function Xn(a) {
  return Qm.test(a);
}
function Un(a) {
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
function Ha(a, t, e) {
  var p, m, D, C;
  const n = ze(), r = n.locale ?? Kn, l = n.firstWeekContainsDate ?? ((m = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, o = n.weekStartsOn ?? ((C = (D = n.locale) == null ? void 0 : D.options) == null ? void 0 : C.weekStartsOn) ?? 0, s = me(a, e == null ? void 0 : e.in);
  if (!dm(s))
    throw new RangeError("Invalid time value");
  let u = t.match(Zm).map((k) => {
    const $ = k[0];
    if ($ === "p" || $ === "P") {
      const y = Wt[$];
      return y(k, r.formatLong);
    }
    return k;
  }).join("").match(Um).map((k) => {
    if (k === "''")
      return { isToken: !1, value: "'" };
    const $ = k[0];
    if ($ === "'")
      return { isToken: !1, value: ah(k) };
    if (Na[$])
      return { isToken: !0, value: k };
    if ($.match(th))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + $ + "`"
      );
    return { isToken: !1, value: k };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(s, u));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: o,
    locale: r
  };
  return u.map((k) => {
    if (!k.isToken) return k.value;
    const $ = k.value;
    (Un($) || Xn($)) && Yt($, t, String(a));
    const y = Na[$[0]];
    return y(s, $, r.localize, d);
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
  const e = me(a, t == null ? void 0 : t.in).getDay();
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
class Zn {
  constructor() {
    V(this, "subPriority", 0);
  }
  validate(t, e) {
    return !0;
  }
}
class ih extends Zn {
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
class uh extends Zn {
  constructor(e, n) {
    super();
    V(this, "priority", sh);
    V(this, "subPriority", -1);
    this.context = e || ((r) => ye(n, r));
  }
  set(e, n) {
    return n.timestampIsSet ? e : ye(e, lh(e, this.context));
  }
}
class se {
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
class dh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 140);
    V(this, "incompatibleTokens", ["R", "u", "t", "T"]);
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
function Jn(a) {
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
function gt(a, t) {
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
function er(a, t) {
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
function tr(a) {
  return a % 400 === 0 || a % 4 === 0 && a % 100 !== 0;
}
class ch extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 130);
    V(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
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
      const s = er(
        r.year,
        l
      );
      return e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const o = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class fh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 130);
    V(this, "incompatibleTokens", [
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
      const u = er(
        r.year,
        o
      );
      return e.setFullYear(
        u,
        0,
        l.firstWeekContainsDate
      ), e.setHours(0, 0, 0, 0), Fe(e, l);
    }
    const s = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(s, 0, l.firstWeekContainsDate), e.setHours(0, 0, 0, 0), Fe(e, l);
  }
}
class ph extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 130);
    V(this, "incompatibleTokens", [
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
    return gt(n === "R" ? 4 : n.length, e);
  }
  set(e, n, r) {
    const l = ye(e, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), Qe(l);
  }
}
class mh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 130);
    V(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, n) {
    return gt(n === "u" ? 4 : n.length, e);
  }
  set(e, n, r) {
    return e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class hh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 120);
    V(this, "incompatibleTokens", [
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
class vh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 120);
    V(this, "incompatibleTokens", [
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
class gh extends se {
  constructor() {
    super(...arguments);
    V(this, "incompatibleTokens", [
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
    V(this, "priority", 110);
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
class bh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 110);
    V(this, "incompatibleTokens", [
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
  const n = me(a, e == null ? void 0 : e.in), r = zn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), me(n, e == null ? void 0 : e.in);
}
class kh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 100);
    V(this, "incompatibleTokens", [
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
    return Fe(yh(e, r, l), l);
  }
}
function wh(a, t, e) {
  const n = me(a, e == null ? void 0 : e.in), r = Qn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), n;
}
class _h extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 100);
    V(this, "incompatibleTokens", [
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
    return Qe(wh(e, r));
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
class Th extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "subPriority", 1);
    V(this, "incompatibleTokens", [
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
    const r = e.getFullYear(), l = tr(r), o = e.getMonth();
    return l ? n >= 1 && n <= Dh[o] : n >= 1 && n <= xh[o];
  }
  set(e, n, r) {
    return e.setDate(r), e.setHours(0, 0, 0, 0), e;
  }
}
class Ih extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "subpriority", 1);
    V(this, "incompatibleTokens", [
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
    return tr(r) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
  }
  set(e, n, r) {
    return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
  }
}
function ia(a, t, e) {
  var m, D, C, k;
  const n = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((D = (m = e == null ? void 0 : e.locale) == null ? void 0 : m.options) == null ? void 0 : D.weekStartsOn) ?? n.weekStartsOn ?? ((k = (C = n.locale) == null ? void 0 : C.options) == null ? void 0 : k.weekStartsOn) ?? 0, l = me(a, e == null ? void 0 : e.in), o = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - r, p = t < 0 || t > 6 ? t - (o + d) % 7 : (u + d) % 7 - (o + d) % 7;
  return Wn(l, p, e);
}
class Ch extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
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
class Eh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "incompatibleTokens", [
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
class Mh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "incompatibleTokens", [
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
  const n = me(a, e == null ? void 0 : e.in), r = rh(n, e), l = t - r;
  return Wn(n, l, e);
}
class Lh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 90);
    V(this, "incompatibleTokens", [
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
class $h extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 80);
    V(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
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
class Bh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 80);
    V(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
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
class Sh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 80);
    V(this, "incompatibleTokens", ["a", "b", "t", "T"]);
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
class Ah extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 70);
    V(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
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
class Oh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 70);
    V(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
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
class Rh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 70);
    V(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
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
class Fh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 70);
    V(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
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
class Nh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 60);
    V(this, "incompatibleTokens", ["t", "T"]);
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
class Vh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 50);
    V(this, "incompatibleTokens", ["t", "T"]);
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
class jh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 30);
    V(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return fe(de(n.length, e), r);
  }
  set(e, n, r) {
    return e.setMilliseconds(r), e;
  }
}
class qh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 10);
    V(this, "incompatibleTokens", ["t", "T", "x"]);
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
      e.getTime() - vt(e) - r
    );
  }
}
class Hh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 10);
    V(this, "incompatibleTokens", ["t", "T", "X"]);
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
      e.getTime() - vt(e) - r
    );
  }
}
class Wh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 40);
    V(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Jn(e);
  }
  set(e, n, r) {
    return [ye(e, r * 1e3), { timestampIsSet: !0 }];
  }
}
class Yh extends se {
  constructor() {
    super(...arguments);
    V(this, "priority", 20);
    V(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Jn(e);
  }
  set(e, n, r) {
    return [ye(e, r), { timestampIsSet: !0 }];
  }
}
const Kh = {
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
  E: new Ch(),
  e: new Eh(),
  c: new Mh(),
  i: new Lh(),
  a: new $h(),
  b: new Bh(),
  B: new Sh(),
  h: new Ah(),
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
}, Qh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, zh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Gh = /^'([^]*?)'?$/, Xh = /''/g, Uh = /\S/, Zh = /[a-zA-Z]/;
function Wa(a, t, e, n) {
  var y, x, T, P;
  const r = () => ye(e, NaN), l = nh(), o = l.locale ?? Kn, s = l.firstWeekContainsDate ?? ((x = (y = l.locale) == null ? void 0 : y.options) == null ? void 0 : x.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((P = (T = l.locale) == null ? void 0 : T.options) == null ? void 0 : P.weekStartsOn) ?? 0;
  if (!t)
    return a ? r() : me(e, n == null ? void 0 : n.in);
  const d = {
    firstWeekContainsDate: s,
    weekStartsOn: u,
    locale: o
  }, p = [new uh(n == null ? void 0 : n.in, e)], m = t.match(zh).map((v) => {
    const R = v[0];
    if (R in Wt) {
      const _ = Wt[R];
      return _(v, o.formatLong);
    }
    return v;
  }).join("").match(Qh), D = [];
  for (let v of m) {
    Un(v) && Yt(v, t, a), Xn(v) && Yt(v, t, a);
    const R = v[0], _ = Kh[R];
    if (_) {
      const { incompatibleTokens: M } = _;
      if (Array.isArray(M)) {
        const E = D.find(
          (j) => M.includes(j.token) || j.token === R
        );
        if (E)
          throw new RangeError(
            `The format string mustn't contain \`${E.fullToken}\` and \`${v}\` at the same time`
          );
      } else if (_.incompatibleTokens === "*" && D.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${v}\` and any other token at the same time`
        );
      D.push({ token: R, fullToken: v });
      const I = _.run(
        a,
        v,
        o.match,
        d
      );
      if (!I)
        return r();
      p.push(I.setter), a = I.rest;
    } else {
      if (R.match(Zh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + R + "`"
        );
      if (v === "''" ? v = "'" : R === "'" && (v = Jh(v)), a.indexOf(v) === 0)
        a = a.slice(v.length);
      else
        return r();
    }
  }
  if (a.length > 0 && Uh.test(a))
    return r();
  const C = p.map((v) => v.priority).sort((v, R) => R - v).filter((v, R, _) => _.indexOf(v) === R).map(
    (v) => p.filter((R) => R.priority === v).sort((R, _) => _.subPriority - R.subPriority)
  ).map((v) => v[0]);
  let k = me(e, n == null ? void 0 : n.in);
  if (isNaN(+k)) return r();
  const $ = {};
  for (const v of C) {
    if (!v.validate(k, d))
      return r();
    const R = v.set(k, $, d);
    Array.isArray(R) ? (k = R[0], Object.assign($, R[1])) : k = R;
  }
  return k;
}
function Jh(a) {
  return a.match(Gh)[1].replace(Xh, "'");
}
const ev = {
  dsfrDecodeDate: function(a, t) {
    if (typeof a != "string" || a === "" || /^\d{4}-\d{2}-\d{2}$/.test(a))
      return a;
    const n = Wa(a, t, /* @__PURE__ */ new Date());
    return Ha(n, "yyyy-MM-dd");
  },
  dsfrSearch: function(a) {
    return this.search(a, 0);
  },
  dsfrDecodeDateTime: function(a, t) {
    if (a === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(a))
      return a;
    const n = Wa(a, t, /* @__PURE__ */ new Date());
    return Ha(n, "yyyy-MM-dd'T'HH:mm");
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
    let u = s != null && s !== "null" ? this.$data.vueData[l][s][o] : this.$data.vueData[l][o];
    Array.isArray(u) ? u.forEach((d) => this.dsfrLoadMissingAutocompleteOption(a, t, e, n, r, d)) : this.dsfrLoadMissingAutocompleteOption(a, t, e, n, r, u);
  },
  dsfrLoadMissingAutocompleteOption: function(a, t, e, n, r, l) {
    let o = this.componentStates[n].options.find((s) => s.value === l);
    if (!l || o !== void 0) {
      (o == null ? void 0 : o.label) !== void 0 && (this.componentStates[n].field = o.label);
      return;
    }
    this.$data.componentStates[n].loading = !0, this.$http.post(r, this.objectToFormData({ value: l, list: a, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((function(s) {
      let u = s.data.map(function(d) {
        return { value: d[t], label: d[e].toString() };
      });
      return this.$data.componentStates[n].options = this.$data.componentStates[n].options.concat(u), this.componentStates[n].field = u[0].label, this.$data.componentStates[n].options;
    }).bind(this)).catch((function(s) {
      this.$q.notify(s.response.status + ":" + s.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[n].loading = !1;
    }).bind(this));
  },
  dsfrResetAutocomplete: function(a, t, e, n) {
    let r = this.componentStates[a].field;
    if (r === void 0)
      return;
    let l = this.componentStates[a].options.find((o) => o.label.toLowerCase().startsWith(r.trim().toLowerCase()));
    l === void 0 || r === "" ? (this.componentStates[a].field = void 0, n != null && n !== "null" ? this.$data.vueData[t][n][e] = void 0 : this.$data.vueData[t][e] = void 0) : (this.$data.componentStates[a].field = l.label, n != null && n !== "null" ? this.$data.vueData[t][n][e] = l.value : this.$data.vueData[t][e] = l.value);
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var a, t;
    (t = (a = this.componentStates) == null ? void 0 : a.dsfrHeader) == null || t.navItems.forEach((e) => {
      e.title ? e.active = e.links.some((n) => n.setActive === !0 || window.location.pathname.startsWith(n.to)) : e.active = e.setActive === !0;
    });
  },
  dsfrTableRows: function(a) {
    let t = this.$data.componentStates[a].pagination, e = this.$data.vueData[t.listKey];
    return t.sortUrl && t.descending ? e.slice().reverse() : e;
  },
  dsfrServerSideSort: function(a) {
    let e = this.$data.componentStates[a].pagination, n = this.$data.vueData;
    e.page = 0, e.sortUrl && e.sortBy && this.$http.post(e.sortUrl, this.objectToFormData({ sortFieldName: e.sortBy, sortDesc: e.descending, CTX: this.$data.vueData.CTX })).then(
      (function(r) {
        n[e.listKey] = r.data.model[e.listKey], this.$data.vueData.CTX = r.data.model.CTX;
      }).bind(this)
    );
  }
}, Se = (a = "", t = "") => (a ? `${a}-` : "") + Qa() + (t ? `-${t}` : ""), tv = {
  useRandomId: Se
}, av = ["href", "aria-current"], nv = {
  __name: "RouterLink",
  props: ["to", "active"],
  setup(a) {
    const t = a, e = t.to === "/" ? window.location.pathname === t.to : window.location.pathname.startsWith(t.to);
    return (n, r) => (i(), f("a", {
      href: t.to,
      "aria-current": H(e) || a.active ? "page" : void 0
    }, [
      B(n.$slots, "default")
    ], 8, av));
  }
}, Ae = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, rv = {
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
}, lv = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, ov = { class: "fr-mb-1w fr-text--md" }, sv = { key: 0 }, iv = { class: "facet" }, uv = { class: "flex justify-between w-full fr-mb-0" }, dv = { class: "facet--count" }, cv = { key: 1 }, fv = { class: "flex justify-between w-full" }, pv = { class: "facet--count" }, mv = { key: 0 }, hv = { class: "facet" }, vv = { class: "flex justify-between w-full fr-mb-0" }, gv = { class: "facet--count" }, bv = { key: 1 }, yv = { class: "flex justify-between w-full" }, kv = { class: "facet--count" }, wv = { class: "fr-mb-2w" };
function _v(a, t, e, n, r, l) {
  const o = _e("DsfrTag"), s = _e("DsfrCheckbox"), u = _e("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", lv, [
      (i(!0), f(G, null, J(e.selectedFacets, (d, p) => (i(), f(G, { key: p }, [
        l.facetMultipleByCode(p) ? g("", !0) : (i(!0), f(G, { key: 0 }, J(d, (m) => (i(), W(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (D) => a.$emit("toogle-facet", p, m, e.contextKey)
        }, {
          default: U(() => [
            N(h(l.facetLabelByCode(p)) + ": " + h(l.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : g("", !0),
    (i(!0), f(G, null, J(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(G, { key: 0 }, [
        c("h6", ov, h(d.label), 1),
        c("ul", null, [
          (i(!0), f(G, null, J(l.selectedInvisibleFacets(d.code), (p) => (i(), f(G, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", sv, [
              c("div", iv, [
                ee(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (m) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: U(() => [
                    c("p", uv, [
                      N(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", dv, h(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", cv, [
              ee(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: U(() => [
                  c("span", fv, [
                    N(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", pv, h(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(G, null, J(l.visibleFacets(d.code, d.values), (p) => (i(), f(G, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", mv, [
              c("div", hv, [
                ee(s, {
                  small: "",
                  modelValue: l.isFacetValueSelected(d.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (m) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: U(() => [
                    c("p", vv, [
                      N(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", gv, h(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", bv, [
              ee(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: U(() => [
                  c("span", yv, [
                    N(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", kv, h(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", wv, [
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), W(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: U(() => [
              N(h(a.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : g("", !0),
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), W(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: U(() => [
              N(h(a.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : g("", !0)
        ])
      ], 64)) : g("", !0)
    ]))), 128))
  ]);
}
const xv = /* @__PURE__ */ Ae(rv, [["render", _v], ["__scopeId", "data-v-0be4e596"]]), ua = () => {
  const a = K(), t = K(!1), e = K(!1), n = () => {
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
}, Dv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Tv = ["id", "aria-labelledby", "onKeydown"], Iv = {
  class: "fr-menu__list",
  role: "none"
}, Cv = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Se("menu") },
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
    } = ua(), s = a, u = K(null), d = K(!1);
    let p = K(0), m = [];
    Re("menuItem", { menuItemIndex: p, addMenuItem: (M, I) => {
      p.value += 1, m.push(`${M}@${I}`);
    } }), Re("id", s.id), pe(d, (M, I) => {
      M !== I && (l(M), M ? (setTimeout(() => $(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    });
    const C = (M, I) => {
      const E = I === "down" ? (M + 1) % m.length : (M - 1 + m.length) % m.length, j = document.getElementById(`${s.id}_item_${E}`);
      return j.ariaDisabled === "true" ? C(E, I) : j;
    }, k = (M) => {
      const I = document.activeElement.id, E = I.startsWith(`${s.id}_item_`) ? Number(I.split("_")[2]) : M === "down" ? -1 : 0;
      C(E, M).focus();
    }, $ = (M) => k("down"), y = (M) => k("up");
    let x = (M) => {
      let I = M.key;
      if (I.length > 1 && I.match(/\S/))
        return;
      I = I.toLowerCase();
      let E = m.filter((b) => b.toLowerCase().startsWith(I)), j = document.activeElement.id;
      for (let b of E) {
        let L = b.split("@")[1], q = document.getElementById(`${s.id}_item_${L}`);
        if (j !== q.id) {
          q.focus();
          break;
        }
      }
    }, T = (M) => {
      u.value.contains(M.target) || (d.value = !1);
    };
    function P() {
      d.value = !1;
    }
    const v = w(() => ["sm", "small"].includes(s.size)), R = w(() => ["md", "medium"].includes(s.size)), _ = w(() => ["lg", "large"].includes(s.size));
    return t({ closeMenu: P }), (M, I) => (i(), f("div", {
      class: "relative-position fr-menu__wrapper",
      onKeydown: I[9] || (I[9] = ne(
        //@ts-ignore
        (...E) => H(T) && H(T)(...E),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", Q({
        id: M.id,
        onClick: I[0] || (I[0] = te((E) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          I[1] || (I[1] = ne(te((E) => d.value = !1, ["stop"]), ["esc"])),
          I[2] || (I[2] = ne(te((E) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          ne(te($, ["prevent"]), ["down"]),
          ne(te(y, ["prevent"]), ["up"]),
          I[3] || (I[3] = //@ts-ignore
          (...E) => H(x) && H(x)(...E)),
          I[4] || (I[4] = ne((E) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [M.icon]: !0,
          "fr-btn--secondary": M.secondary,
          "fr-btn--tertiary": M.tertiary,
          "fr-btn--sm": v.value,
          "fr-btn--md": R.value,
          "fr-btn--lg": _.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": M.disabled,
        "aria-controls": `${M.id}_menu`,
        "aria-expanded": d.value
      }, M.$attrs), [
        c("span", null, h(M.label), 1)
      ], 16, Dv),
      c("div", {
        id: `${M.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: A(["fr-collapse fr-menu", { "fr-collapse--expanded": H(r), "fr-collapsing": H(n) }]),
        role: "menu",
        "aria-labelledby": M.id,
        onKeyup: I[5] || (I[5] = ne((E) => d.value = !1, ["esc"])),
        onKeydown: [
          I[6] || (I[6] = ne((E) => d.value = !1, ["tab"])),
          ne(te($, ["prevent"]), ["down"]),
          ne(te(y, ["prevent"]), ["up"]),
          I[7] || (I[7] = //@ts-ignore
          (...E) => H(x) && H(x)(...E))
        ],
        onTransitionend: I[8] || (I[8] = (E) => H(o)(d.value))
      }, [
        c("ul", Iv, [
          B(M.$slots, "default", {}, void 0, !0)
        ])
      ], 42, Tv)
    ], 544));
  }
}), Ev = /* @__PURE__ */ Ae(Cv, [["__scopeId", "data-v-7c863055"]]), Mv = { role: "none" }, Pv = ["id", "href"], Lv = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(a) {
    const t = a, { menuItemIndex: e, addMenuItem: n } = Ke("menuItem"), l = `fr-btn fr-btn--secondary fr-nav__link ${w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")) ? t.icon : ""} fr-btn--icon-left`, o = Ke("id"), s = e.value;
    return n(t.label, s), (u, d) => {
      const p = _e("dsfr-button");
      return i(), f("li", Mv, [
        u.url === "" ? (i(), W(p, Q({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${H(o)}_item_${H(s)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          "icon-left": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", Q({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${H(o)}_item_${H(s)}`,
          href: u.url,
          class: l
        }, u.$attrs), h(u.label), 17, Pv))
      ]);
    };
  }
}), $v = /* @__PURE__ */ Ae(Lv, [["__scopeId", "data-v-2b0119ca"]]), Bv = ["for", "id"], Sv = {
  key: 0,
  class: "required"
}, Av = {
  key: 0,
  class: "fr-hint-text"
}, Ov = ["id", "value", "aria-expanded", "aria-controls", "aria-disabled", "aria-required"], Rv = { class: "grow overflow" }, Fv = { class: "fr-pl-1v fr-select__icon" }, Nv = ["id"], Vv = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, jv = ["id"], qv = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, Hv = ["id", "aria-controls"], Wv = ["id"], Yv = {
  key: 0,
  class: "fr-hint-text"
}, Kv = ["aria-describedby", "id"], Qv = ["id", "onKeydown", "onClick", "aria-selected"], zv = ["data-id", "value"], Gv = ["id"], Xv = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ $e({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Se("select-multiple") },
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
    } = ua(), o = a, s = K(!1), u = we(a, "modelValue"), d = K(o.options);
    pe(s, (S, F) => {
      S !== F && (r(S), S ? (document.addEventListener("click", L), document.addEventListener("touchstart", L)) : (document.removeEventListener("click", L), document.removeEventListener("touchstart", L)));
    });
    const p = K(null), m = K(null), D = K(null), C = K(""), k = w(() => o.errorMessage || o.successMessage), $ = w(() => o.errorMessage !== "" ? "error" : "valid"), y = w(() => d.value.every((S) => o.modelValue.includes(S.value)) ? "fr-icon-close-circle-line" : "fr-icon-check-line"), x = w(() => d.value.every((S) => o.modelValue.includes(S.value)) ? "Tout déselectionner" : "Tout sélectionner"), T = w(() => {
      let F = `${o.options.filter((Z) => o.modelValue.includes(Z.value)).length} options séléctionnées`;
      return o.modelValue.length > 2 ? F : o.options.filter((Z) => o.modelValue.includes(Z.value)).map((Z) => Z.text).join(", ");
    });
    let P = function() {
      if (d.value.every((F) => o.modelValue.includes(F.value))) {
        const F = d.value.map((z) => z.value), Z = o.modelValue.filter((z) => !F.includes(z));
        o.modelValue.length = 0, Z.forEach((z) => o.modelValue.push(z));
      } else
        d.value.filter((Z) => !o.modelValue.includes(Z.value)).forEach((Z) => o.modelValue.push(Z.value));
    }, v = function(S) {
      const F = S.target.value.toLowerCase();
      d.value = o.options.filter((Z) => Z.text.toLowerCase().indexOf(F) > -1);
    };
    const R = function(S) {
      switch (S.key) {
        case "Escape":
        case "Esc":
          S.stopPropagation(), s.value = !1;
          break;
        case " ":
        case "Space":
          document.activeElement.id === o.id && (S.preventDefault(), s.value = !s.value);
          break;
        case "Down":
        case "ArrowDown":
          S.preventDefault(), s.value ? I() : (s.value = !0, setTimeout(() => I(), 100));
          break;
        case "Up":
        case "ArrowUp":
          S.preventDefault(), s.value ? E() : (s.value = !0, setTimeout(() => E(), 100));
          break;
        case "Tab":
          j(S);
          break;
        default:
          let F = /^[a-zA-Z0-9àâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]$/.test(S.key);
          if (!F && S.shiftKey)
            return;
          o.comboHasFilter && document.activeElement.id === `${o.id}_filter` || (o.comboHasFilter && F ? D.value.focus() : b(S));
      }
    }, _ = (S, F) => {
      const Z = F === "down" ? (S + 1) % d.value.length : (S - 1 + d.value.length) % d.value.length, z = document.getElementById(`${o.id}_item_${Z}`);
      return z === null || z.ariaDisabled === "true" ? _(Z, F) : z;
    }, M = (S) => {
      const F = document.activeElement.id, Z = F.startsWith(`${o.id}_item_`) ? Number(F.split("_")[2]) : S === "down" ? -1 : 0;
      _(Z, S).focus();
    }, I = (S) => M("down"), E = (S) => M("up"), j = (S) => {
      if (!s.value)
        return;
      const F = [];
      o.comboHasButton && F.push(`${o.id}_button`), o.comboHasFilter && F.push(`${o.id}_filter`), F.push("item");
      const Z = F.indexOf(S.target.id);
      let z;
      S.shiftKey ? z = (Z - 1 + F.length) % F.length : z = (Z + 1) % F.length;
      const le = document.getElementById(F[z]);
      F[z] === "item" ? (I(), S.preventDefault()) : le && (le.focus(), S.preventDefault());
    };
    let b = (S) => {
      let F = S.key;
      if (F.length > 1 && F.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      F = F.toLowerCase();
      let Z = d.value.filter((le) => le.text.toLowerCase().startsWith(F)), z = document.activeElement.id;
      for (let le of Z) {
        let re = document.querySelector(`[data-id='${le.value}']`);
        if (z !== re.id) {
          re.focus();
          break;
        }
      }
    }, L = (S) => {
      p.value.contains(S.target) || (s.value = !1);
    }, q = (S, F) => {
      u.value.includes(F) ? u.value.splice(u.value.indexOf(F), 1) : (u.value.push(F), d.value.length === 1 && (C.value = "", d.value = o.options));
    };
    return (S, F) => {
      const Z = _e("v-icon");
      return i(), f(G, null, [
        c("div", Q({
          ref_key: "container",
          ref: p,
          class: ["fr-select-group", { [`fr-select-group--${$.value}`]: k.value !== "" }],
          onKeyup: F[6] || (F[6] = ne(
            //@ts-ignore
            (...z) => H(L) && H(L)(...z),
            ["tab"]
          ))
        }, S.$attrs), [
          c("label", {
            class: "fr-label",
            for: S.id,
            id: `${S.id}_label`
          }, [
            B(S.$slots, "label", {}, () => [
              N(h(S.label) + " ", 1),
              B(S.$slots, "required-tip", {}, () => [
                S.required ? (i(), f("span", Sv, " *")) : g("", !0)
              ], !0)
            ], !0),
            S.description ? (i(), f("span", Av, h(S.description), 1)) : g("", !0)
          ], 8, Bv),
          c("div", {
            id: S.id,
            class: A([{ [`fr-select--${$.value}`]: k.value !== "" }, "fr-input fr-select--menu flex"]),
            onClick: F[0] || (F[0] = (z) => s.value = !s.value),
            onKeydown: R,
            value: T.value,
            tabindex: "0",
            "aria-autocomplete": "none",
            role: "combobox",
            "aria-expanded": s.value,
            "aria-haspopup": "dialog",
            "aria-controls": `${S.id}_dialog`,
            "aria-disabled": S.disabled,
            "aria-required": S.required
          }, [
            c("p", Rv, h(T.value), 1),
            c("div", Fv, [
              ee(Z, {
                style: { "font-size": "1rem" },
                name: "ri-arrow-down-s-line"
              })
            ])
          ], 42, Ov),
          c("div", {
            id: `${S.id}_dialog`,
            ref_key: "collapse",
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Choix des options",
            class: A(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": H(n), "fr-collapsing": H(e) }]),
            onKeydown: R,
            onTransitionend: F[5] || (F[5] = (z) => H(l)(s.value))
          }, [
            S.comboHasButton ? (i(), f("div", Vv, [
              c("button", {
                class: A(["fr-btn fr-btn--tertiary fr-btn--sm", `${y.value}`]),
                id: `${S.id}_button`,
                onClick: F[1] || (F[1] = (z) => H(P)()),
                ref_key: "button",
                ref: m,
                type: "button"
              }, h(x.value), 11, jv)
            ])) : g("", !0),
            S.comboHasFilter ? (i(), f("div", qv, [
              Pe(c("input", {
                class: "fr-input",
                id: `${S.id}_filter`,
                ref_key: "filter",
                ref: D,
                onInput: F[2] || (F[2] = //@ts-ignore
                (...z) => H(v) && H(v)(...z)),
                "onUpdate:modelValue": F[3] || (F[3] = (z) => C.value = z),
                "aria-label": "Rechercher une option",
                "aria-controls": `${S.id}_listbox`,
                placeholder: "Rechercher",
                type: "text"
              }, null, 40, Hv), [
                [ca, C.value]
              ])
            ])) : g("", !0),
            S.comboLabel ? (i(), f("p", {
              key: 2,
              class: "fr-label fr-mb-2v",
              id: `${S.id}_combolabel`
            }, [
              N(h(S.comboLabel) + " ", 1),
              S.comboDescription ? (i(), f("span", Yv, h(S.comboDescription), 1)) : g("", !0)
            ], 8, Wv)) : g("", !0),
            c("ul", {
              role: "listbox",
              "aria-multiselectable": "true",
              "aria-describedby": S.comboLabel ? `${S.id}_combolabel` : null,
              id: `${S.id}_listbox`,
              "aria-live": "polite",
              class: "fr-select__ul"
            }, [
              (i(!0), f(G, null, J(d.value, (z, le) => (i(), f("li", {
                class: "fr-checkbox-group fr-checkbox-group--sm fr-py-0 fr-my-1v",
                id: `${S.id}_item_${le}`,
                tabindex: "-1",
                role: "option",
                onKeydown: ne(te((re) => H(q)(re, z.value), ["prevent"]), ["space"]),
                onClick: (re) => H(q)(re, z.value),
                "aria-selected": u.value.includes(z.value)
              }, [
                Pe(c("input", {
                  "data-id": z.value,
                  type: "hidden",
                  class: "",
                  tabindex: "-1",
                  value: z.value,
                  "onUpdate:modelValue": F[4] || (F[4] = (re) => u.value = re)
                }, null, 8, zv), [
                  [ca, u.value]
                ]),
                c("span", null, h(z.text), 1)
              ], 40, Qv))), 256))
            ], 8, Kv)
          ], 42, Nv)
        ], 16),
        k.value ? (i(), f("p", {
          key: 0,
          id: `select-${$.value}-desc-${$.value}`,
          class: A(`fr-${$.value}-text`)
        }, h(k.value), 11, Gv)) : g("", !0)
      ], 64);
    };
  }
}), Uv = /* @__PURE__ */ Ae(Xv, [["__scopeId", "data-v-3c129b3e"]]), Zv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Jv = ["id", "aria-labelledby", "onKeydown"], eg = {
  key: 0,
  class: "fr-label fr-mb-0"
}, tg = {
  key: 0,
  class: "fr-hint-text"
}, ag = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, ng = { role: "none" }, rg = { class: "fr-p-2v" }, lg = ["id", "href"], og = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrHeaderMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Se("header-menu") },
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
    } = ua(), o = a, s = K(null), u = K(!1);
    let d = K(0), p = [];
    const m = (T, P) => {
      d.value += 1, p.push(`${T}@${P}`);
    };
    Re("menuItem", { menuItemIndex: d, addMenuItem: m }), Re("id", o.id), pe(u, (T, P) => {
      T !== P && (r(T), T ? (setTimeout(() => k(), 100), document.addEventListener("click", x), document.addEventListener("touchstart", x)) : (document.removeEventListener("click", x), document.removeEventListener("touchstart", x)));
    }), be(() => {
      m(o.logoutLabel, d.value);
    });
    const D = (T, P) => {
      const v = P === "down" ? (T + 1) % p.length : (T - 1 + p.length) % p.length, R = document.getElementById(`${o.id}_item_${v}`);
      return R.ariaDisabled === "true" ? D(v, P) : R;
    }, C = (T) => {
      const P = document.activeElement.id, v = P.startsWith(`${o.id}_item_`) ? Number(P.split("_")[2]) : T === "down" ? -1 : 0;
      D(v, T).focus();
    }, k = (T) => C("down"), $ = (T) => C("up");
    let y = (T) => {
      let P = T.key;
      if (P.length > 1 && P.match(/\S/))
        return;
      P = P.toLowerCase();
      let v = p.filter((_) => _.toLowerCase().startsWith(P)), R = document.activeElement.id;
      for (let _ of v) {
        let M = _.split("@")[1], I = document.getElementById(`${o.id}_item_${M}`);
        if (R !== I.id) {
          I.focus();
          break;
        }
      }
    }, x = (T) => {
      s.value.contains(T.target) || (u.value = !1);
    };
    return (T, P) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: P[9] || (P[9] = ne(
        //@ts-ignore
        (...v) => H(x) && H(x)(...v),
        ["tab"]
      )),
      ref_key: "container",
      ref: s
    }, [
      c("button", Q({
        id: T.id,
        onClick: P[0] || (P[0] = te((v) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          P[1] || (P[1] = ne(te((v) => u.value = !1, ["stop"]), ["esc"])),
          P[2] || (P[2] = ne(te((v) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          ne(te(k, ["prevent"]), ["down"]),
          ne(te($, ["prevent"]), ["up"]),
          P[3] || (P[3] = //@ts-ignore
          (...v) => H(y) && H(y)(...v)),
          P[4] || (P[4] = ne((v) => u.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm fr-btn--icon-left", { [T.icon]: !0 }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": T.disabled,
        "aria-controls": `${T.id}_menu`,
        "aria-expanded": u.value
      }, T.$attrs), [
        c("span", null, h(T.label), 1)
      ], 16, Zv),
      c("div", {
        id: `${T.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: A(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": H(n), "fr-collapsing": H(e) }]),
        role: "menu",
        "aria-labelledby": T.id,
        onKeyup: P[5] || (P[5] = ne((v) => u.value = !1, ["esc"])),
        onKeydown: [
          P[6] || (P[6] = ne((v) => u.value = !1, ["tab"])),
          ne(te(k, ["prevent"]), ["down"]),
          ne(te($, ["prevent"]), ["up"]),
          P[7] || (P[7] = //@ts-ignore
          (...v) => H(y) && H(y)(...v))
        ],
        onTransitionend: P[8] || (P[8] = (v) => H(l)(u.value))
      }, [
        B(T.$slots, "detail", {}, () => [
          T.nom === "" && T.email === "" ? g("", !0) : (i(), f("p", eg, [
            N(h(T.nom) + " ", 1),
            T.email !== "" ? (i(), f("span", tg, h(T.email), 1)) : g("", !0)
          ]))
        ], !0),
        c("ul", ag, [
          B(T.$slots, "default", {}, void 0, !0),
          c("li", ng, [
            c("div", rg, [
              T.logoutUrl !== "" ? (i(), f("a", {
                key: 0,
                id: `${T.id}_item_${H(d) - 1}`,
                class: "fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
                role: "menuitem",
                tabindex: "-1",
                href: T.logoutUrl
              }, h(T.logoutLabel), 9, lg)) : g("", !0)
            ])
          ])
        ])
      ], 42, Jv)
    ], 544));
  }
}), sg = /* @__PURE__ */ Ae(og, [["__scopeId", "data-v-3a8c3dd5"]]), ig = Symbol("header"), ug = ["aria-label"], dg = { class: "fr-btns-group" }, Kt = /* @__PURE__ */ O({
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
      c("ul", dg, [
        (i(!0), f(G, null, J(n.links, (l, o) => (i(), f("li", { key: o }, [
          ee(H(ra), Q({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        B(n.$slots, "default")
      ])
    ], 8, ug));
  }
}), cg = {
  role: "banner",
  class: "fr-header"
}, fg = { class: "fr-header__body" }, pg = { class: "fr-container width-inherit" }, mg = { class: "fr-header__body-row" }, hg = { class: "fr-header__brand fr-enlarge-link" }, vg = { class: "fr-header__brand-top" }, gg = { class: "fr-header__logo" }, bg = {
  key: 0,
  class: "fr-header__operator"
}, yg = ["src", "alt"], kg = {
  key: 1,
  class: "fr-header__navbar"
}, wg = ["aria-label", "title", "data-fr-opened"], _g = ["aria-label", "title"], xg = {
  key: 0,
  class: "fr-header__service"
}, Dg = { class: "fr-header__service-title" }, Tg = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Ig = {
  key: 0,
  class: "fr-header__service-tagline"
}, Cg = {
  key: 1,
  class: "fr-header__service"
}, Eg = { class: "fr-header__tools" }, Mg = {
  key: 0,
  class: "fr-header__tools-links"
}, Pg = { class: "fr-header__search fr-modal" }, Lg = ["aria-label"], $g = { class: "fr-container" }, Bg = { class: "fr-header__menu-links" }, Sg = {
  key: 1,
  class: "flex justify-center items-center"
}, Ag = { class: "fr-header__menu fr-modal" }, Og = {
  key: 0,
  class: "fr-container"
}, Rg = /* @__PURE__ */ O({
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
    const e = a, n = t, r = lt(e, "languageSelector"), l = K(!1), o = K(!1), s = K(!1), u = () => {
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
    }, D = u, C = Qt(), k = w(() => {
      var y;
      return !!((y = C.operator) != null && y.call(C).length) || !!e.operatorImgSrc;
    }), $ = w(() => !!C.mainnav);
    return Re(ig, () => u), (y, x) => {
      var P, v, R;
      const T = _e("RouterLink");
      return i(), f("header", cg, [
        c("div", fg, [
          c("div", pg, [
            c("div", mg, [
              c("div", hg, [
                c("div", vg, [
                  c("div", gg, [
                    ee(T, {
                      to: y.homeTo,
                      title: `${y.homeLabel} - ${y.serviceTitle}`
                    }, {
                      default: U(() => [
                        ee(H(at), {
                          "logo-text": y.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  k.value ? (i(), f("div", bg, [
                    B(y.$slots, "operator", {}, () => [
                      y.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: y.operatorImgSrc,
                        alt: y.operatorImgAlt,
                        style: xe(y.operatorImgStyle)
                      }, null, 12, yg)) : g("", !0)
                    ])
                  ])) : g("", !0),
                  y.showSearch || $.value || (P = y.quickLinks) != null && P.length ? (i(), f("div", kg, [
                    y.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": y.showSearchLabel,
                      title: y.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: x[0] || (x[0] = te((_) => m(), ["prevent", "stop"]))
                    }, null, 8, wg)) : g("", !0),
                    $.value || (v = y.quickLinks) != null && v.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": y.menuLabel,
                      title: y.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: x[1] || (x[1] = te((_) => p(), ["prevent", "stop"]))
                    }, null, 8, _g)) : g("", !0)
                  ])) : g("", !0)
                ]),
                y.serviceTitle ? (i(), f("div", xg, [
                  ee(T, Q({
                    to: y.homeTo,
                    title: `${y.homeLabel} - ${y.serviceTitle}`
                  }, y.$attrs), {
                    default: U(() => [
                      c("p", Dg, [
                        N(h(y.serviceTitle) + " ", 1),
                        y.showBeta ? (i(), f("span", Tg, " BETA ")) : g("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  y.serviceDescription ? (i(), f("p", Ig, h(y.serviceDescription), 1)) : g("", !0)
                ])) : g("", !0),
                !y.serviceTitle && y.showBeta ? (i(), f("div", Cg, x[9] || (x[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : g("", !0)
              ]),
              c("div", Eg, [
                (R = y.quickLinks) != null && R.length || r.value ? (i(), f("div", Mg, [
                  l.value ? g("", !0) : (i(), W(Kt, {
                    key: 0,
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel
                  }, {
                    default: U(() => [
                      B(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), W(H(nt), Q({ key: 1 }, r.value, {
                    onSelect: x[2] || (x[2] = (_) => n("language-select", _))
                  }), null, 16)) : g("", !0)
                ])) : g("", !0),
                c("div", Pg, [
                  B(y.$slots, "header-search"),
                  y.showSearch ? (i(), W(H(rt), {
                    key: 0,
                    "searchbar-id": y.searchbarId,
                    label: y.searchLabel,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": x[3] || (x[3] = (_) => n("update:modelValue", _)),
                    onSearch: x[4] || (x[4] = (_) => n("search", _))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : g("", !0)
                ])
              ])
            ]),
            y.showSearch || $.value || y.quickLinks && y.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: A(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
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
                  onClick: x[5] || (x[5] = te((_) => u(), ["prevent", "stop"]))
                }, h(y.closeMenuModalLabel), 1),
                c("div", Bg, [
                  r.value ? (i(), W(H(nt), Q({ key: 0 }, r.value, {
                    onSelect: x[6] || (x[6] = (_) => r.value.currentLanguage = _.codeIso)
                  }), null, 16)) : g("", !0),
                  l.value ? (i(), W(Kt, {
                    key: 1,
                    role: "navigation",
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel,
                    onLinkClick: H(D)
                  }, {
                    default: U(() => [
                      B(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : g("", !0),
                  B(y.$slots, "header-search")
                ]),
                s.value ? B(y.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : g("", !0),
                o.value ? (i(), f("div", Sg, [
                  ee(H(rt), {
                    "searchbar-id": y.searchbarId,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    "onUpdate:modelValue": x[7] || (x[7] = (_) => n("update:modelValue", _)),
                    onSearch: x[8] || (x[8] = (_) => n("search", _))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ], 10, Lg)) : g("", !0),
            B(y.$slots, "default")
          ])
        ]),
        c("div", Ag, [
          $.value && !s.value ? (i(), f("div", Og, [
            B(y.$slots, "mainnav", { hidemodal: u })
          ])) : g("", !0)
        ])
      ]);
    };
  }
}), Fg = { class: "fr-table" }, Ng = { class: "fr-table__wrapper" }, Vg = { class: "fr-table__container" }, jg = { class: "fr-table__content" }, qg = ["id"], Hg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Wg = {
  key: 0,
  class: "fr-checkbox-group fr-checkbox-group--sm"
}, Yg = ["id", "checked"], Kg = ["for"], Qg = ["tabindex", "onClick", "onKeydown"], zg = { key: 0 }, Gg = { key: 1 }, Xg = ["data-row-key"], Ug = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Zg = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Jg = ["id", "value"], eb = ["for"], tb = ["onKeydown"], ab = { key: 0 }, nb = ["colspan"], rb = { class: "flex gap-2 items-center" }, lb = ["selected"], ob = ["value", "selected"], sb = { class: "flex ml-1" }, ib = /* @__PURE__ */ O({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ $e({
    id: { default: () => Se("table") },
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
    footerSize: {},
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
  emits: /* @__PURE__ */ $e(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = we(a, "selection"), o = we(a, "rowsPerPage"), s = we(a, "currentPage"), u = w(() => Math.max(Math.ceil(n.rows.length / o.value), 1)), d = w(() => n.pages ?? Array.from({ length: u.value }).map((E, j) => ({
      label: `${j + 1}`,
      title: `Page ${j + 1}`,
      href: `#${j + 1}`
    }))), p = w(() => s.value * o.value), m = w(() => (s.value + 1) * o.value), D = w(() => ["sm", "small"].includes(n.footerSize));
    function C(E, j) {
      const b = k.value;
      return (E[b] ?? E) < (j[b] ?? j) ? -1 : (E[b] ?? E) > (j[b] ?? j) ? 1 : 0;
    }
    const k = we(a, "sortedBy");
    k.value = n.sorted;
    const $ = we(a, "sortedDesc");
    function y(E) {
      if (!(!n.sortableRows || Array.isArray(n.sortableRows) && !n.sortableRows.includes(E))) {
        if (k.value === E) {
          if ($.value) {
            k.value = void 0, $.value = !1;
            return;
          }
          $.value = !0;
          return;
        }
        $.value = !1, k.value = E;
      }
    }
    const x = w(() => {
      const E = k.value ? n.rows.slice().sort(n.sortFn ?? C) : n.rows.slice();
      return $.value && E.reverse(), E;
    }), T = w(() => {
      const E = n.headersRow.map((b) => typeof b != "object" ? b : b.key), j = x.value.map((b) => Array.isArray(b) ? b : E.map((L) => b));
      return n.pagination ? j.slice(p.value, m.value) : j;
    });
    function P(E) {
      E && (l.value = T.value.map((j) => j[0][n.rowKey])), l.value.length = 0;
    }
    const v = K(!1);
    function R() {
      v.value = l.value.length === T.value.length;
    }
    function _() {
      r("update:current-page", 0), v.value = !1, l.value.length = 0;
    }
    function M(E) {
      navigator.clipboard.writeText(E);
    }
    function I() {
      s.value = 0;
    }
    return t({ resetCurrentPage: I }), (E, j) => (i(), f("div", Fg, [
      c("div", Ng, [
        c("div", Vg, [
          c("div", jg, [
            c("table", { id: E.id }, [
              c("caption", {
                class: A({ "fr-sr-only": E.noCaption })
              }, h(E.title), 3),
              c("thead", null, [
                c("tr", null, [
                  E.selectableRows ? (i(), f("th", Hg, [
                    E.showToggleAll ? (i(), f("div", Wg, [
                      c("input", {
                        id: `table-select--${E.id}-all`,
                        checked: v.value,
                        type: "checkbox",
                        onInput: j[0] || (j[0] = (b) => P(b.target.checked))
                      }, null, 40, Yg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${E.id}-all`
                      }, " Sélectionner tout ", 8, Kg)
                    ])) : g("", !0)
                  ])) : g("", !0),
                  (i(!0), f(G, null, J(E.headersRow, (b, L) => (i(), f("th", Q({
                    key: typeof b == "object" ? b.key : b,
                    scope: "col",
                    ref_for: !0
                  }, typeof b == "object" && b.headerAttrs, {
                    class: {
                      "text-right": b.align === "right",
                      "text-left": b.align === "left"
                    },
                    tabindex: E.sortableRows ? 0 : void 0,
                    onClick: (q) => y(b.key ?? (Array.isArray(E.rows[0]) ? L : b)),
                    onKeydown: [
                      ne((q) => y(b.key ?? b), ["enter"]),
                      ne((q) => y(b.key ?? b), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: A({
                        "sortable-header": E.sortableRows === !0 || Array.isArray(E.sortableRows) && E.sortableRows.includes(b.key ?? b),
                        "fr-sr-only": typeof b == "object" ? b.hideLabel : !1,
                        "flex-row-reverse": typeof b == "object" ? b.align === "right" : !1
                      })
                    }, [
                      B(E.$slots, "header", Q({ ref_for: !0 }, typeof b == "object" ? b : { key: b, label: b }), () => [
                        N(h(typeof b == "object" ? b.label : b), 1)
                      ], !0),
                      k.value !== (b.key ?? b) && (E.sortableRows === !0 || Array.isArray(E.sortableRows) && E.sortableRows.includes(b.key ?? b)) ? (i(), f("span", zg, [
                        ee(H(ge), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : k.value === (b.key ?? b) ? (i(), f("span", Gg, [
                        ee(H(ge), {
                          name: $.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : g("", !0)
                    ], 2)
                  ], 16, Qg))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(G, null, J(T.value, (b, L) => (i(), f("tr", {
                  key: `row-${L}`,
                  "data-row-key": L + 1
                }, [
                  E.selectableRows ? (i(), f("th", Ug, [
                    c("div", Zg, [
                      Pe(c("input", {
                        id: `row-select-${E.id}-${L}`,
                        "onUpdate:modelValue": j[1] || (j[1] = (q) => l.value = q),
                        value: b[0][E.rowKey] ?? `row-${L}`,
                        type: "checkbox",
                        onChange: j[2] || (j[2] = (q) => R())
                      }, null, 40, Jg), [
                        [bt, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${E.id}-${L}`
                      }, " Sélectionner la ligne " + h(L + 1), 9, eb)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(G, null, J(b, (q, S) => (i(), f("td", {
                    key: typeof q == "object" ? q[E.rowKey] : q,
                    class: A({
                      "text-right": E.headersRow[S].align === "right",
                      "text-left": E.headersRow[S].align === "left"
                    }),
                    onKeydown: [
                      ne(te((F) => M(typeof q == "object" ? q[E.rowKey] : q), ["ctrl"]), ["c"]),
                      ne(te((F) => M(typeof q == "object" ? q[E.rowKey] : q), ["meta"]), ["c"])
                    ]
                  }, [
                    B(E.$slots, "cell", Q({ ref_for: !0 }, {
                      colKey: typeof E.headersRow[S] == "object" ? E.headersRow[S].key : E.headersRow[S],
                      cell: q,
                      idx: L + 1
                    }), () => [
                      N(h(typeof q == "object" ? q[E.rowKey] : q), 1)
                    ], !0)
                  ], 42, tb))), 128))
                ], 8, Xg))), 128)),
                T.value.length === 0 ? (i(), f("tr", ab, [
                  c("td", {
                    colspan: E.selectableRows ? E.headersRow.length + 1 : E.headersRow.length
                  }, h(n.noResultLabel), 9, nb)
                ])) : g("", !0)
              ])
            ], 8, qg)
          ])
        ])
      ]),
      c("div", {
        class: A(E.bottomActionBarClass)
      }, [
        B(E.$slots, "pagination", {}, () => [
          E.pagination && !E.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: A(["flex justify-between items-center flex-wrap", E.paginationWrapperClass])
          }, [
            E.showNbRows ? (i(), f("p", {
              key: 0,
              class: A(["fr-mb-0 fr-ml-1v", { "fr-text--sm": D.value }])
            }, h(E.rows.length) + " résulat(s)", 3)) : g("", !0),
            c("div", rb, [
              c("label", {
                class: A(["fr-label", { "fr-text--sm": D.value }]),
                for: "pagination-options"
              }, " Résultats par page : ", 2),
              Pe(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": j[3] || (j[3] = (b) => o.value = b),
                class: "fr-select",
                onChange: j[4] || (j[4] = (b) => _())
              }, [
                c("option", {
                  value: "",
                  selected: !E.paginationOptions.includes(o.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, lb),
                (i(!0), f(G, null, J(E.paginationOptions, (b, L) => (i(), f("option", {
                  key: L,
                  value: b,
                  selected: +b === o.value
                }, h(b), 9, ob))), 128))
              ], 544), [
                [zt, o.value]
              ])
            ]),
            c("div", sb, [
              c("span", {
                class: A(["self-center", { "fr-text--sm": D.value }])
              }, " Page " + h(s.value + 1) + " sur " + h(u.value), 3)
            ]),
            ee(H(na), {
              "current-page": s.value,
              "onUpdate:currentPage": j[5] || (j[5] = (b) => s.value = b),
              pages: d.value,
              "next-page-title": "Suivant",
              "prev-page-title": "Précédent"
            }, null, 8, ["current-page", "pages"])
          ], 2)) : g("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), ub = /* @__PURE__ */ Ae(ib, [["__scopeId", "data-v-50097005"]]), db = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], cb = ["for"], fb = {
  key: 0,
  class: "required"
}, pb = {
  key: 0,
  class: "fr-hint-text"
}, mb = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, hb = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrCustomCheckbox",
  props: /* @__PURE__ */ $e({
    id: { default: () => Se("basic", "checkbox") },
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
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: A(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Pe(c("input", Q({
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
        }), null, 16, db), [
          [bt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          B(l.$slots, "label", {}, () => [
            N(h(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", fb, " *")) : g("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", pb, [
            B(l.$slots, "hint", {}, () => [
              N(h(l.hint), 1)
            ])
          ])) : g("", !0)
        ], 8, cb),
        e.value ? (i(), f("div", mb, [
          c("p", {
            class: A(["fr-message--info flex items-center", n.value])
          }, h(e.value), 3)
        ])) : g("", !0)
      ], 2)
    ], 2));
  }
}), vb = ["for"], gb = {
  key: 0,
  class: "required"
}, bb = {
  key: 0,
  class: "fr-hint-text"
}, yb = ["id", "name", "disabled", "aria-disabled", "required"], kb = ["selected"], wb = ["selected", "value", "disabled", "aria-disabled"], _b = ["id"], xb = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrCustomSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => Se("select") },
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
    const e = w(() => t.errorMessage || t.successMessage), n = w(() => t.errorMessage ? "error" : "valid"), r = function(l) {
      if (l === "")
        return null;
      let s = t.options.length > 0 && t.options[0].value !== "" && typeof t.options[0].value == "string" ? 0 : 1, u = t.options.length > s && typeof t.options[s].value == "string";
      return isNaN(l) || u ? l : parseInt(l, 10);
    };
    return (l, o) => (i(), f("div", {
      class: A(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        B(l.$slots, "label", {}, () => [
          N(h(l.label) + " ", 1),
          B(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", gb, " *")) : g("", !0)
          ])
        ]),
        l.hint ?? l.description ? (i(), f("span", bb, h(l.hint ?? l.description), 1)) : g("", !0)
      ], 8, vb),
      c("select", Q({
        id: l.selectId,
        class: [{ [`fr-select--${n.value}`]: e.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: o[0] || (o[0] = (s) => {
          var u;
          return l.$emit("update:modelValue", r((u = s.target) == null ? void 0 : u.value));
        })
      }), [
        c("option", {
          selected: !l.options.some((s) => typeof s != "object" || s === null ? s === l.modelValue : s.value === l.modelValue),
          disabled: "",
          hidden: ""
        }, h(l.defaultUnselectedText), 9, kb),
        (i(!0), f(G, null, J(l.options, (s, u) => (i(), f("option", {
          key: u,
          selected: l.modelValue === s || typeof s == "object" && s.value === l.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, h(typeof s == "object" ? s.text : s), 9, wb))), 128))
      ], 16, yb),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: A(`fr-${n.value}-text`)
      }, h(e.value), 11, _b)) : g("", !0)
    ], 2));
  }
}), Db = ["id"], Tb = /* @__PURE__ */ O({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => Se("tooltip") },
    label: { default: "" },
    noOutline: { type: Boolean },
    secondary: { type: Boolean },
    tertiary: { type: Boolean },
    disabled: { type: Boolean },
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
    const t = a, e = K(!1), n = K(null), r = K(null), l = K("0px"), o = K("0px"), s = K("0px"), u = K(!1), d = K(0);
    async function p() {
      var Z, z, le, re, Ie, Ce, Y, X;
      if (typeof document > "u" || !e.value || r.value.matches(":empty"))
        return;
      await new Promise((ae) => setTimeout(ae, 100));
      const v = (Z = n.value) == null ? void 0 : Z.getBoundingClientRect().top, R = (z = n.value) == null ? void 0 : z.offsetHeight, _ = (le = n.value) == null ? void 0 : le.offsetWidth, M = (re = n.value) == null ? void 0 : re.getBoundingClientRect().left, I = (Ie = r.value) == null ? void 0 : Ie.offsetHeight, E = (Ce = r.value) == null ? void 0 : Ce.offsetWidth, j = (Y = r.value) == null ? void 0 : Y.offsetTop, b = (X = r.value) == null ? void 0 : X.offsetLeft, q = !(v - I < 0) && v + R + I >= document.documentElement.offsetHeight;
      u.value = q;
      const S = M + _ >= document.documentElement.offsetWidth, F = M + _ / 2 - E / 2 <= 0;
      o.value = q ? `${v - j - I + 8}px` : `${v - j + R - 8}px`, d.value = 1, l.value = S ? `${M - b + _ - E - 4}px` : F ? `${M - b + 4}px` : `${M - b + _ / 2 - E / 2}px`, s.value = S ? `${E / 2 - _ / 2 + 4}px` : F ? `${-(E / 2) + _ / 2 - 4}px` : "0px";
    }
    pe(e, p, { immediate: !0 }), be(() => {
      window.addEventListener("scroll", p), n.value.addEventListener("click", () => e.value = !1);
    }), Te(() => {
      window.removeEventListener("scroll", p);
    });
    const m = w(() => ["sm", "small"].includes(t.size)), D = w(() => ["md", "medium"].includes(t.size)), C = w(() => ["lg", "large"].includes(t.size)), k = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), $ = w(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), y = w(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), x = (v) => {
      v.key === "Escape" && (e.value = !1);
    }, T = (v) => {
      var R;
      (v.target === n.value || (R = n.value) != null && R.contains(v.target)) && (e.value = !0);
    }, P = () => {
      e.value = !1;
    };
    return be(() => {
      document.documentElement.addEventListener("keydown", x), document.documentElement.addEventListener("mouseover", T), t.disabled && n.value.addEventListener("click", (v) => v.preventDefault());
    }), Te(() => {
      document.documentElement.removeEventListener("keydown", x), document.documentElement.removeEventListener("mouseover", T);
    }), pe(t.disabled, () => {
      t.disabled ? n.value.addEventListener("click", (v) => v.preventDefault()) : n.value.removeEventListener("click", (v) => v.preventDefault());
    }), (v, R) => (i(), f(G, null, [
      (i(), W(ve(v.href !== "" ? "a" : "button"), Q({
        id: `button-${v.id}`,
        ref_key: "source",
        ref: n,
        href: v.href !== "" && !v.disabled ? v.href : void 0,
        class: {
          "fr-link": v.isLink && !v.inline,
          "fr-btn": !v.isLink,
          "fr-btn--secondary": v.secondary && !v.tertiary,
          "fr-btn--tertiary": v.tertiary && !v.secondary && !v.noOutline,
          "fr-btn--tertiary-no-outline": v.tertiary && !v.secondary && v.noOutline,
          "fr-btn--sm": m.value,
          "fr-btn--md": D.value,
          "fr-btn--lg": C.value,
          "fr-btn--icon-right": !v.isLink && !v.iconOnly && k.value && v.iconRight,
          "fr-btn--icon-left": !v.isLink && !v.iconOnly && k.value && !v.iconRight,
          "fr-link--icon-right": v.isLink && !v.inline && !v.iconOnly && k.value && v.iconRight,
          "fr-link--icon-left": v.isLink && !v.inline && !v.iconOnly && k.value && !v.iconRight,
          "inline-flex": !k.value,
          reverse: v.iconRight && !k.value,
          "fr-btn--custom-tooltip": v.iconOnly,
          "justify-center": !k.value && v.iconOnly,
          [v.icon]: k.value
        },
        "aria-disabled": v.disabled,
        "aria-labelledby": v.id,
        onMouseleave: R[0] || (R[0] = (_) => P()),
        onFocus: R[1] || (R[1] = (_) => T(_)),
        onBlur: R[2] || (R[2] = (_) => P())
      }, v.$attrs), {
        default: U(() => [
          N(h(v.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-disabled", "aria-labelledby"])),
      c("p", {
        id: v.id,
        ref_key: "tooltip",
        ref: r,
        class: A(["fr-tooltip fr-placement", y.value]),
        style: xe($.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        B(v.$slots, "default", {}, () => [
          N(h(v.content), 1)
        ], !0)
      ], 14, Db)
    ], 64));
  }
}), ar = /* @__PURE__ */ Ae(Tb, [["__scopeId", "data-v-d3680cd6"]]), Ib = /* @__PURE__ */ O({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (t, e) => (i(), W(ar, Q({ "is-link": !1 }, t.$attrs), {
      default: U(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Cb = /* @__PURE__ */ O({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (t, e) => (i(), W(ar, Q({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: U(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), Eb = ["id", "href", "aria-disabled"], Mb = /* @__PURE__ */ O({
  __name: "DsfrLink",
  props: {
    id: { default: () => Se("link") },
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
        N(h(s.label), 1)
      ], !0)
    ], 16, Eb));
  }
}), Pb = /* @__PURE__ */ Ae(Mb, [["__scopeId", "data-v-44994a07"]]), Lb = (a, t) => a.matches ? a.matches(t) : a.msMatchesSelector ? a.msMatchesSelector(t) : a.webkitMatchesSelector ? a.webkitMatchesSelector(t) : null, $b = (a, t) => {
  let e = a;
  for (; e && e.nodeType === 1; ) {
    if (Lb(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, Bb = (a, t) => a.closest ? a.closest(t) : $b(a, t), Sb = (a) => !!(a && typeof a.then == "function");
class Ab {
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
    submitOnEnter: D = !1
  } = {}) {
    V(this, "value", "");
    V(this, "searchCounter", 0);
    V(this, "results", []);
    V(this, "selectedIndex", -1);
    V(this, "selectedResult", null);
    V(this, "destroy", () => {
      this.search = null, this.setValue = null, this.setAttribute = null, this.onUpdate = null, this.onSubmit = null, this.autocorrect = null, this.onShow = null, this.onHide = null, this.onLoading = null, this.onLoaded = null;
    });
    V(this, "handleInput", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    V(this, "handleKeyDown", (t) => {
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
    V(this, "handleFocus", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    V(this, "handleBlur", () => {
      this.hideResults();
    });
    // The mousedown event fires before the blur event. Calling preventDefault() when
    // the results list is clicked will prevent it from taking focus, firing the
    // blur event on the input element, and closing the results list before click fires.
    V(this, "handleResultMouseDown", (t) => {
      t.preventDefault();
    });
    V(this, "handleResultClick", (t) => {
      const { target: e } = t, n = Bb(e, "[data-result-index]");
      if (n) {
        this.selectedIndex = parseInt(n.dataset.resultIndex, 10);
        const r = this.results[this.selectedIndex];
        this.selectResult(), this.onSubmit(r);
      }
    });
    V(this, "handleArrows", (t) => {
      const e = this.results.length;
      this.selectedIndex = (t % e + e) % e, this.onUpdate(this.results, this.selectedIndex);
    });
    V(this, "selectResult", () => {
      const t = this.results[this.selectedIndex];
      t && this.setValue(t), this.hideResults();
    });
    V(this, "updateResults", (t) => {
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
    V(this, "showResults", () => {
      this.setAttribute("aria-expanded", !0), this.onShow();
    });
    V(this, "hideResults", () => {
      this.selectedIndex = -1, this.results = [], this.setAttribute("aria-expanded", !1), this.setAttribute("aria-activedescendant", ""), this.onUpdate(this.results, this.selectedIndex), this.onHide();
    });
    // Make sure selected result isn't scrolled out of view
    V(this, "checkSelectedResultVisible", (t) => {
      const e = t.querySelector(
        `[data-result-index="${this.selectedIndex}"]`
      );
      if (!e)
        return;
      const n = t.getBoundingClientRect(), r = e.getBoundingClientRect();
      r.top < n.top ? t.scrollTop -= n.top - r.top : r.bottom > n.bottom && (t.scrollTop += r.bottom - n.bottom);
    });
    this.search = Sb(t) ? t : (C) => Promise.resolve(t(C)), this.autoSelect = e, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = o, this.autocorrect = u, this.onShow = s, this.onHide = d, this.onLoading = p, this.onLoaded = m, this.submitOnEnter = D;
  }
}
const Ob = (a, t) => {
  const e = a.getBoundingClientRect(), n = t.getBoundingClientRect();
  return /* 1 */ e.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - n.height > 0 ? "above" : "below";
}, Rb = (a, t, e) => {
  let n;
  return function() {
    const l = this, o = arguments, s = function() {
      n = null, a.apply(l, o);
    };
    clearTimeout(n), n = setTimeout(s, t);
  };
}, Fb = (a) => {
  if (a != null && a.length) {
    const t = a.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? a.substring(1) : a
    };
  }
}, Nb = {
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
    const a = new Ab({
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
    return this.debounceTime > 0 && (a.handleInput = Rb(a.handleInput, this.debounceTime)), {
      core: a,
      value: this.defaultValue,
      resultListId: `${this.baseClass}-result-list-${Qa()}`,
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
      const a = this.position === "below" ? "top" : "bottom", t = Fb(this.resultListLabel);
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Ob(
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
function Vb(a, t, e, n, r, l) {
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
          (i(!0), f(G, null, J(r.results, (o, s) => B(a.$slots, "result", {
            result: o,
            props: l.resultProps[s]
          }, () => [
            (i(), f("li", Q({
              key: l.resultProps[s].id,
              ref_for: !0
            }, l.resultProps[s]), h(e.getResultValue(o)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const jb = /* @__PURE__ */ Ae(Nb, [["render", Vb]]);
var qb = {
  install: function(a, t) {
    a.use(em), a.component("RouterLink", nv), a.component("DsfrFacets", xv), a.component("DsfrSelectMultiple", Uv), a.component("DsfrMenu", Ev), a.component("DsfrMenuLink", $v), a.component("DsfrHeaderMenu", sg), a.component("DsfrCustomHeader", Rg), a.component("DsfrCustomHeaderMenuLinks", Kt), a.component("DsfrCustomDataTable", ub), a.component("DsfrCustomCheckbox", hb), a.component("DsfrCustomSelect", xb), a.component("DsfrButtonTooltip", Ib), a.component("DsfrLinkTooltip", Cb), a.component("DsfrLink", Pb), a.component("autocomplete", jb);
  },
  methods: ev,
  utils: tv
};
window && (window.DSFR = qb);
export {
  qb as default
};
//# sourceMappingURL=dsfr.es.js.map
