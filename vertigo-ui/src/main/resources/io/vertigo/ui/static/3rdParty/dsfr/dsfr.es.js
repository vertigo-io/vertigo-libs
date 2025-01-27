var ar = Object.defineProperty;
var nr = (a, t, e) => t in a ? ar(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var V = (a, t, e) => nr(a, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as O, ref as H, computed as w, onMounted as be, watch as me, onUnmounted as Te, Comment as rr, cloneVNode as lr, h as da, openBlock as i, createElementBlock as f, normalizeClass as F, createElementVNode as c, withModifiers as J, createTextVNode as N, toDisplayString as h, unref as R, Fragment as z, renderList as U, createVNode as ee, withKeys as Z, withCtx as X, createBlock as j, resolveDynamicComponent as ge, mergeProps as Y, createCommentVNode as g, mergeModels as Le, useModel as we, withDirectives as Be, vModelCheckbox as lt, renderSlot as $, inject as Qe, toRef as ot, provide as Oe, resolveComponent as _e, useCssVars as Ya, nextTick as Qa, normalizeStyle as xe, normalizeProps as De, guardReactiveProps as yt, useAttrs as or, useSlots as Kt, hasInjectionContext as sr, reactive as ir, Teleport as ur, vModelSelect as zt, onBeforeUnmount as dr, Transition as cr, vShow as fr, useId as pr, toHandlers as mr } from "vue";
const Gt = Symbol("accordions"), Xt = Symbol("header"), kt = Symbol("tabs"), $e = () => {
  const a = H(), t = H(!1), e = H(!1), n = () => {
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
}, gr = (a) => Array.from({ length: a }).map(vr).join(""), re = (a = "", t = "") => (a ? `${a}-` : "") + gr(5) + (t ? `-${t}` : ""), br = { class: "fr-accordion" }, yr = ["aria-expanded", "aria-controls"], kr = ["id"], wr = /* @__PURE__ */ O({
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
    } = $e(), s = H(), u = Qe(Gt), { isActive: d, expand: p } = (u == null ? void 0 : u(ot(() => t.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return be(() => {
      d.value && l(!0);
    }), me(d, (m, D) => {
      m !== D && l(m);
    }), (m, D) => (i(), f("section", br, [
      (i(), j(ge(m.titleTag), { class: "fr-accordion__title" }, {
        default: X(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": R(d),
            "aria-controls": m.id,
            type: "button",
            onClick: D[0] || (D[0] = (M) => R(p)())
          }, [
            $(m.$slots, "title", {}, () => [
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
        class: F(["fr-collapse", {
          "fr-collapse--expanded": R(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": R(n)
        }]),
        onTransitionend: D[1] || (D[1] = (M) => R(o)(R(d)))
      }, [
        $(m.$slots, "default")
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
    }), l = H(/* @__PURE__ */ new Map()), o = H(0);
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
      $(s.$slots, "default")
    ]));
  }
}), Dr = ["id", "role"], Tr = ["title", "aria-label"], Ir = /* @__PURE__ */ O({
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
    return (o, s) => o.closed ? g("", !0) : (i(), f("div", {
      key: 0,
      id: o.id,
      class: F(["fr-alert", l.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? g("", !0) : (i(), j(ge(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: X(() => [
          N(h(o.title), 1)
        ]),
        _: 1
      })),
      $(o.$slots, "default", {}, () => [
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
}), Er = /* @__PURE__ */ O({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(a) {
    return (t, e) => (i(), f("a", {
      class: F(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, h(t.label), 3));
  }
}), Mr = ["title"], Ka = /* @__PURE__ */ O({
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
      class: F(["fr-badge", {
        [`fr-badge--${t.type}`]: t.type,
        "fr-badge--no-icon": t.noIcon,
        "fr-badge--sm": t.small
      }]),
      title: t.ellipsis ? t.label : void 0
    }, [
      c("span", {
        class: F(t.ellipsis ? "fr-ellipsis" : "")
      }, h(t.label), 3)
    ], 10, Mr));
  }
}), Cr = ["aria-label"], Pr = ["aria-expanded", "aria-controls"], Lr = ["id"], Br = { class: "fr-breadcrumb__list" }, $r = ["aria-current"], Ar = /* @__PURE__ */ O({
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
    } = $e(), o = H(!1);
    return me(o, (s, u) => {
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
          class: F(["fr-collapse", {
            "fr-collapse--expanded": R(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": R(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => R(l)(o.value))
        }, [
          c("ol", Br, [
            (i(!0), f(z, null, U(s.links, (p, m) => (i(), f("li", {
              key: m,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), j(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": m === s.links.length - 1 ? "page" : void 0
              }, {
                default: X(() => [
                  N(h(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : g("", !0),
              p.to ? g("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === s.links.length - 1 ? "page" : void 0
              }, h(p.text), 9, $r))
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
  [e, n].forEach((S) => {
    const b = [], _ = S.hFlip, T = S.vFlip;
    let L = S.rotate;
    _ ? T ? L += 2 : (b.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), b.push("scale(-1 1)"), r.top = r.left = 0) : T && (b.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), b.push("scale(1 -1)"), r.top = r.left = 0);
    let I;
    switch (L < 0 && (L -= Math.floor(L / 4) * 4), L = L % 4, L) {
      case 1:
        I = r.height / 2 + r.top, b.unshift(
          "rotate(90 " + I.toString() + " " + I.toString() + ")"
        );
        break;
      case 2:
        b.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        I = r.width / 2 + r.left, b.unshift(
          "rotate(-90 " + I.toString() + " " + I.toString() + ")"
        );
        break;
    }
    L % 2 === 1 && (r.left !== r.top && (I = r.left, r.left = r.top, r.top = I), r.width !== r.height && (I = r.width, r.width = r.height, r.height = I)), b.length && (l = zr(
      l,
      '<g transform="' + b.join(" ") + '">',
      "</g>"
    ));
  });
  const o = n.width, s = n.height, u = r.width, d = r.height;
  let p, m;
  o === null ? (m = s === null ? "1em" : s === "auto" ? d : s, p = ma(m, u / d)) : (p = o === "auto" ? u : o, m = s === null ? ma(p, d / u) : s === "auto" ? d : s);
  const D = {}, M = (S, b) => {
    Gr(b) || (D[S] = b.toString());
  };
  M("width", p), M("height", m);
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
    let y = a.resources.slice(0);
    for (o = []; y.length > 1; ) {
      const v = Math.floor(Math.random() * y.length);
      o.push(y[v]), y = y.slice(0, v).concat(y.slice(v + 1));
    }
    o = o.concat(y);
  } else
    o = a.resources.slice(l).concat(a.resources.slice(0, l));
  const s = Date.now();
  let u = "pending", d = 0, p, m = null, D = [], M = [];
  typeof n == "function" && M.push(n);
  function k() {
    m && (clearTimeout(m), m = null);
  }
  function S() {
    u === "pending" && (u = "aborted"), k(), D.forEach((y) => {
      y.status === "pending" && (y.status = "aborted");
    }), D = [];
  }
  function b(y, v) {
    v && (M = []), typeof y == "function" && M.push(y);
  }
  function _() {
    return {
      startTime: s,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: D.length,
      subscribe: b,
      abort: S
    };
  }
  function T() {
    u = "failed", M.forEach((y) => {
      y(void 0, p);
    });
  }
  function L() {
    D.forEach((y) => {
      y.status === "pending" && (y.status = "aborted");
    }), D = [];
  }
  function I(y, v, x) {
    const P = v !== "success";
    switch (D = D.filter((Q) => Q !== y), u) {
      case "pending":
        break;
      case "failed":
        if (P || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (v === "abort") {
      p = x, T();
      return;
    }
    if (P) {
      p = x, D.length || (o.length ? C() : T());
      return;
    }
    if (k(), L(), !a.random) {
      const Q = a.resources.indexOf(y.resource);
      Q !== -1 && Q !== a.index && (a.index = Q);
    }
    u = "completed", M.forEach((Q) => {
      Q(x);
    });
  }
  function C() {
    if (u !== "pending")
      return;
    k();
    const y = o.shift();
    if (y === void 0) {
      if (D.length) {
        m = setTimeout(() => {
          k(), u === "pending" && (L(), T());
        }, a.timeout);
        return;
      }
      T();
      return;
    }
    const v = {
      status: "pending",
      resource: y,
      callback: (x, P) => {
        I(v, x, P);
      }
    };
    D.push(v), d++, m = setTimeout(C, a.rotate), e(y, t, v.callback);
  }
  return setTimeout(C), _;
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
    const { provider: d, prefix: p, name: m } = u, D = je(d, p), M = D.pendingIcons || (D.pendingIcons = /* @__PURE__ */ new Set());
    M.has(m) || (M.add(m), r[d][p].push(m));
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
  for (let S in t) {
    const b = t[S];
    if (b !== void 0)
      switch (S) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          e[S] = b === !0 || b === "true" || b === 1;
          break;
        case "flip":
          typeof b == "string" && Pl(e, b);
          break;
        case "color":
          l.color = b;
          break;
        case "rotate":
          typeof b == "string" ? e[S] = Ll(b) : typeof b == "number" && (e[S] = b);
          break;
        case "ariaHidden":
        case "aria-hidden":
          b !== !0 && b !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const _ = ct[S];
          _ ? (b === !0 || b === "true" || b === 1) && (e[_] = !0) : _a[S] === void 0 && (n[S] = b);
        }
      }
  }
  const u = Xr(a, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...s
    }, Object.assign(n, d);
    let S = 0, b = t.id;
    return typeof b == "string" && (b = b.replace(/-/g, "_")), n.innerHTML = el(u.body, b ? () => b + "ID" + S++ : "iconifyVue"), da("svg", n);
  }
  const { body: p, width: m, height: D } = a, M = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), k = Bl(p, {
    ...d,
    width: m + "",
    height: D + ""
  });
  return n.style = {
    ...l,
    "--svg": Sl(k),
    width: Ta(d.width),
    height: Ta(d.height),
    ...Rl,
    ...M ? Nt : dn,
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
    const t = a, e = H(null), n = w(() => `${+t.scale * 1.2}rem`), r = w(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    me(() => t.title, l);
    async function l() {
      var u, d, p, m;
      if (!((u = e.value) != null && u.$el))
        return;
      const D = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), M = document.createElement("title");
      if (!t.title) {
        M.remove();
        return;
      }
      M.innerHTML = t.title, await Qa(), D || (m = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || m.before(M);
    }
    be(l);
    const o = w(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), s = w(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), j(R(Nl), {
      ref_key: "icon",
      ref: e,
      icon: o.value,
      style: xe({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: F(["vicon", {
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
}, pe = /* @__PURE__ */ ke(Vl, [["__scopeId", "data-v-73a1cd7e"]]), jl = ["title", "disabled", "aria-disabled"], ql = { key: 1 }, Hl = /* @__PURE__ */ O({
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
    const e = a, n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["md", "medium"].includes(e.size)), l = w(() => ["lg", "large"].includes(e.size)), o = H(null);
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
      class: F(["fr-btn", {
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
      p.icon && !s.value ? (i(), j(pe, De(Y({ key: 0 }, d.value)), null, 16)) : g("", !0),
      p.iconOnly ? g("", !0) : (i(), f("span", ql, [
        N(h(p.label) + " ", 1),
        $(p.$slots, "default", {}, void 0, !0)
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
    const t = a, e = H(null), n = w(() => ["sm", "small"].includes(t.size)), r = w(() => ["md", "medium"].includes(t.size)), l = w(() => ["lg", "large"].includes(t.size)), o = w(() => ["always", "", !0].includes(t.inlineLayoutWhen)), s = w(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = w(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = w(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = w(() => t.align === "center"), m = w(() => t.align === "right"), D = H("auto"), M = w(() => `--equisized-width: ${D.value};`), k = async () => {
      var S;
      let b = 0;
      await new Promise((_) => setTimeout(_, 100)), (S = e.value) == null || S.querySelectorAll(".fr-btn").forEach((_) => {
        const T = _, L = T.offsetWidth, I = window.getComputedStyle(T), C = +I.marginLeft.replace("px", ""), y = +I.marginRight.replace("px", "");
        T.style.width = "var(--equisized-width)";
        const v = L + C + y;
        v > b && (b = v);
      }), D.value = `${b}px`;
    };
    return be(async () => {
      !e.value || !t.equisized || await k();
    }), (S, b) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: xe(M.value),
      class: F(["fr-btns-group", {
        "fr-btns-group--equisized": S.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || u.value,
        "fr-btns-group--inline-lg": o.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": S.iconRight,
        "fr-btns-group--inline-reverse": S.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(z, null, U(S.buttons, ({ onClick: _, ...T }, L) => (i(), f("li", { key: L }, [
        ee(qe, Y({ ref_for: !0 }, T, { onClick: _ }), null, 16, ["onClick"])
      ]))), 128)),
      $(S.$slots, "default")
    ], 6));
  }
}), Wl = {
  key: 2,
  class: "fr-callout__text"
}, Yl = {
  key: 4,
  class: "fr-callout__text"
}, Ql = /* @__PURE__ */ O({
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
      class: F(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && n.value ? (i(), j(pe, De(Y({ key: 0 }, n.value)), null, 16)) : g("", !0),
      r.title ? (i(), j(ge(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: X(() => [
          N(h(r.title), 1)
        ]),
        _: 1
      })) : g("", !0),
      r.content ? (i(), f("p", Wl, h(r.content), 1)) : g("", !0),
      r.button ? (i(), j(qe, De(Y({ key: 3 }, r.button)), null, 16)) : g("", !0),
      r.$slots.default && !r.content ? (i(), f("div", Yl, [
        $(r.$slots, "default", {}, void 0, !0)
      ])) : $(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), Kl = /* @__PURE__ */ ke(Ql, [["__scopeId", "data-v-c59b3cec"]]), Vt = /* @__PURE__ */ O({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const t = a, e = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: F(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), j(pe, De(Y({ key: 0 }, n.value)), null, 16)) : g("", !0),
      $(r.$slots, "default")
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
    const e = a, n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["lg", "large"].includes(e.size)), l = w(() => ["sm", "small"].includes(e.imgRatio)), o = w(() => ["lg", "large"].includes(e.imgRatio)), s = w(() => typeof e.link == "string" && e.link.startsWith("http")), u = H(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const m = _e("RouterLink");
      return i(), f("div", {
        class: F(["fr-card", {
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
            (i(), j(ge(d.titleTag), { class: "fr-card__title" }, {
              default: X(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, h(d.title), 9, Xl)) : d.link ? (i(), j(m, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (D) => D.stopPropagation())
                }, {
                  default: X(() => [
                    N(h(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(z, { key: 2 }, [
                  N(h(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Ul, h(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Zl, [
              $(d.$slots, "start-details"),
              d.detail ? (i(), j(Vt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: X(() => [
                  N(h(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : g("", !0)
            ])) : g("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", Jl, [
              $(d.$slots, "end-details"),
              d.endDetail ? (i(), j(Vt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: X(() => [
                  N(h(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : g("", !0)
            ])) : g("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", eo, [
            d.buttons.length ? (i(), j(Dt, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : g("", !0),
            d.linksGroup.length ? (i(), f("ul", to, [
              (i(!0), f(z, null, U(d.linksGroup, (D, M) => (i(), f("li", {
                key: `card-link-${M}`
              }, [
                D.to ? (i(), j(m, {
                  key: 0,
                  to: D.to
                }, {
                  default: X(() => [
                    N(h(D.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: D.link || D.href,
                  class: F(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
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
            (i(!0), f(z, null, U(d.badges, (D, M) => (i(), f("li", { key: M }, [
              ee(Ka, Y({ ref_for: !0 }, D), null, 16)
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
      class: F(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: F(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Be(c("input", Y({
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
          $(l.$slots, "label", {}, () => [
            N(h(l.label) + " ", 1),
            $(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", co, " *")) : g("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", fo, h(l.hint), 1)) : g("", !0)
        ], 8, uo),
        e.value ? (i(), f("div", po, [
          c("p", {
            class: F(["fr-message--info flex items-center", n.value])
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
        class: F(["fr-fieldset", {
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
          $(o.$slots, "legend", {}, () => [
            N(h(o.legend) + " ", 1),
            $(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", go, " *")) : g("", !0)
            ])
          ])
        ], 8, vo),
        $(o.$slots, "default", {}, () => [
          (i(!0), f(z, null, U(o.options, (u) => (i(), j(Tt, {
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
            class: F(["fr-message--info flex items-center", n.value])
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
    return (l, o) => (i(), f(z, null, [
      c("div", ko, [
        c("p", wo, [
          $(l.$slots, "default", {}, () => [
            o[4] || (o[4] = N(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), j(ge(n.value), Y(r.value, { "data-testid": "link" }), {
              default: X(() => o[3] || (o[3] = [
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
}, To = { class: "fr-pagination__list" }, Io = ["href", "title", "disabled", "aria-disabled"], Eo = ["href", "title", "disabled", "aria-disabled"], Mo = ["href", "title", "aria-current", "onClick"], Co = { key: 0 }, Po = { key: 1 }, Lo = ["href", "title", "disabled", "aria-disabled"], Bo = ["href", "title", "disabled", "aria-disabled"], $o = /* @__PURE__ */ O({
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
    const e = a, n = t, r = w(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = w(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), o = w(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), s = (k) => n("update:current-page", k), u = (k) => s(k), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), m = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), D = () => u(e.pages.length - 1), M = (k) => e.pages.indexOf(k) === e.currentPage;
    return (k, S) => {
      var b, _, T, L;
      return i(), f("nav", Do, [
        c("ul", To, [
          c("li", null, [
            c("a", {
              href: (b = k.pages[0]) == null ? void 0 : b.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: k.firstPageTitle,
              disabled: k.currentPage === 0 ? !0 : void 0,
              "aria-disabled": k.currentPage === 0 ? !0 : void 0,
              onClick: S[0] || (S[0] = J((I) => d(), ["prevent"]))
            }, null, 8, Io)
          ]),
          c("li", null, [
            c("a", {
              href: (_ = k.pages[Math.max(k.currentPage - 1, 0)]) == null ? void 0 : _.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: k.prevPageTitle,
              disabled: k.currentPage === 0 ? !0 : void 0,
              "aria-disabled": k.currentPage === 0 ? !0 : void 0,
              onClick: S[1] || (S[1] = J((I) => p(), ["prevent"]))
            }, h(k.prevPageTitle), 9, Eo)
          ]),
          (i(!0), f(z, null, U(o.value, (I, C) => (i(), f("li", { key: C }, [
            c("a", {
              href: I == null ? void 0 : I.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: I.title,
              "aria-current": M(I) ? "page" : void 0,
              onClick: J((y) => u(k.pages.indexOf(I)), ["prevent"])
            }, [
              o.value.indexOf(I) === 0 && r.value > 0 ? (i(), f("span", Co, "...")) : g("", !0),
              N(" " + h(I.label) + " ", 1),
              o.value.indexOf(I) === o.value.length - 1 && l.value < k.pages.length - 1 ? (i(), f("span", Po, "...")) : g("", !0)
            ], 8, Mo)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (T = k.pages[Math.min(k.currentPage + 1, k.pages.length - 1)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: k.nextPageTitle,
              disabled: k.currentPage === k.pages.length - 1 ? !0 : void 0,
              "aria-disabled": k.currentPage === k.pages.length - 1 ? !0 : void 0,
              onClick: S[2] || (S[2] = J((I) => m(), ["prevent"]))
            }, h(k.nextPageTitle), 9, Lo)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (L = k.pages.at(-1)) == null ? void 0 : L.href,
              title: k.lastPageTitle,
              disabled: k.currentPage === k.pages.length - 1 ? !0 : void 0,
              "aria-disabled": k.currentPage === k.pages.length - 1 ? !0 : void 0,
              onClick: S[3] || (S[3] = J((I) => D(), ["prevent"]))
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
}, Go = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Xo = ["id", "value"], Uo = ["for"], Zo = ["onKeydown"], Jo = { class: "flex gap-2 items-center" }, es = ["selected"], ts = ["value", "selected"], as = { class: "flex ml-1" }, ns = { class: "self-center" }, rs = /* @__PURE__ */ O({
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
    const e = a, n = t, r = we(a, "selection"), l = we(a, "rowsPerPage"), o = we(a, "currentPage"), s = w(() => Math.ceil(e.rows.length / l.value)), u = w(() => e.pages ?? Array.from({ length: s.value }).map((y, v) => ({ label: `${v + 1}`, title: `Page ${v + 1}`, href: `#${v + 1}` }))), d = w(() => o.value * l.value), p = w(() => (o.value + 1) * l.value), m = we(a, "sortedBy"), D = we(a, "sortedDesc");
    function M(y, v) {
      const x = m.value ?? e.sorted;
      return (y[x] ?? y) < (v[x] ?? v) ? -1 : (y[x] ?? y) > (v[x] ?? v) ? 1 : 0;
    }
    function k(y) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(y))) {
        if (m.value === y) {
          if (D.value) {
            m.value = void 0, D.value = !1;
            return;
          }
          D.value = !0;
          return;
        }
        D.value = !1, m.value = y;
      }
    }
    const S = w(() => {
      const y = m.value ? e.rows.slice().sort(e.sortFn ?? M) : e.rows.slice();
      return D.value && y.reverse(), y;
    }), b = w(() => {
      const y = e.headersRow.map((x) => typeof x != "object" ? x : x.key), v = S.value.map((x) => Array.isArray(x) ? x : y.map((P) => typeof x != "object" ? x : x[P] ?? x));
      return e.pagination ? v.slice(d.value, p.value) : v;
    });
    function _(y) {
      if (y) {
        const v = e.headersRow.findIndex((x) => x.key ?? x);
        r.value = b.value.map((x) => x[v]);
      }
      r.value.length = 0;
    }
    const T = H(!1);
    function L() {
      T.value = r.value.length === b.value.length;
    }
    function I() {
      n("update:current-page", 0), T.value = !1, r.value.length = 0;
    }
    function C(y) {
      navigator.clipboard.writeText(y);
    }
    return (y, v) => (i(), f("div", Ao, [
      c("div", So, [
        c("div", Oo, [
          c("div", Ro, [
            c("table", { id: y.id }, [
              y.noCaption ? g("", !0) : (i(), f("caption", No, h(y.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  y.selectableRows ? (i(), f("th", Vo, [
                    c("div", jo, [
                      c("input", {
                        id: `table-select--${y.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: v[0] || (v[0] = (x) => _(x.target.checked))
                      }, null, 40, qo),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${y.id}-all`
                      }, " Sélectionner tout ", 8, Ho)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(z, null, U(y.headersRow, (x, P) => (i(), f("th", Y({
                    key: typeof x == "object" ? x.key : x,
                    scope: "col",
                    ref_for: !0
                  }, typeof x == "object" && x.headerAttrs, {
                    tabindex: y.sortableRows ? 0 : void 0,
                    onClick: (Q) => k(x.key ?? (Array.isArray(y.rows[0]) ? P : x)),
                    onKeydown: [
                      Z((Q) => k(x.key ?? x), ["enter"]),
                      Z((Q) => k(x.key ?? x), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: F({ "sortable-header": y.sortableRows === !0 || Array.isArray(y.sortableRows) && y.sortableRows.includes(x.key ?? x) })
                    }, [
                      $(y.$slots, "header", Y({ ref_for: !0 }, typeof x == "object" ? x : { key: x, label: x }), () => [
                        N(h(typeof x == "object" ? x.label : x), 1)
                      ], !0),
                      m.value !== (x.key ?? x) && (y.sortableRows === !0 || Array.isArray(y.sortableRows) && y.sortableRows.includes(x.key ?? x)) ? (i(), f("span", Yo, [
                        ee(pe, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : m.value === (x.key ?? x) ? (i(), f("span", Qo, [
                        ee(pe, {
                          name: D.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : g("", !0)
                    ], 2)
                  ], 16, Wo))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, U(b.value, (x, P) => (i(), f("tr", {
                  key: `row-${P}`,
                  "data-row-key": P + 1
                }, [
                  y.selectableRows ? (i(), f("th", zo, [
                    c("div", Go, [
                      Be(c("input", {
                        id: `row-select-${y.id}-${P}`,
                        "onUpdate:modelValue": v[1] || (v[1] = (Q) => r.value = Q),
                        value: y.rows[P][y.rowKey] ?? `row-${P}`,
                        type: "checkbox",
                        onChange: v[2] || (v[2] = (Q) => L())
                      }, null, 40, Xo), [
                        [lt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${y.id}-${P}`
                      }, " Sélectionner la ligne " + h(P + 1), 9, Uo)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(z, null, U(x, (Q, E) => (i(), f("td", {
                    key: typeof Q == "object" ? Q[y.rowKey] : Q,
                    tabindex: "0",
                    onKeydown: [
                      Z(J((A) => C(typeof Q == "object" ? Q[y.rowKey] : Q), ["ctrl"]), ["c"]),
                      Z(J((A) => C(typeof Q == "object" ? Q[y.rowKey] : Q), ["meta"]), ["c"])
                    ]
                  }, [
                    $(y.$slots, "cell", Y({ ref_for: !0 }, {
                      colKey: typeof y.headersRow[E] == "object" ? y.headersRow[E].key : y.headersRow[E],
                      cell: Q
                    }), () => [
                      N(h(typeof Q == "object" ? Q[y.rowKey] : Q), 1)
                    ], !0)
                  ], 40, Zo))), 128))
                ], 8, Ko))), 128))
              ])
            ], 8, Fo)
          ])
        ])
      ]),
      c("div", {
        class: F(y.bottomActionBarClass)
      }, [
        $(y.$slots, "pagination", {}, () => [
          y.pagination && !y.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: F(["flex justify-between items-center", y.paginationWrapperClass])
          }, [
            c("div", Jo, [
              v[6] || (v[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Be(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": v[3] || (v[3] = (x) => l.value = x),
                class: "fr-select",
                onChange: v[4] || (v[4] = (x) => I())
              }, [
                c("option", {
                  value: "",
                  selected: !y.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, es),
                (i(!0), f(z, null, U(y.paginationOptions, (x, P) => (i(), f("option", {
                  key: P,
                  value: x,
                  selected: +x === l.value
                }, h(x), 9, ts))), 128))
              ], 544), [
                [zt, l.value]
              ])
            ]),
            c("div", as, [
              c("span", ns, "Page " + h(o.value + 1) + " sur " + h(s.value), 1)
            ]),
            ee(na, {
              "current-page": o.value,
              "onUpdate:currentPage": v[5] || (v[5] = (x) => o.value = x),
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
          (n = t.buttons) != null && n.length ? (i(), j(Dt, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : g("", !0),
          $(t.$slots, "default", {}, void 0, !0)
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
}, gs = { class: "fr-fieldset__element" }, cn = /* @__PURE__ */ O({
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
          class: F(["fr-fieldset__legend", t.legendClass])
        }, [
          N(h(t.legend) + " ", 1),
          $(t.$slots, "legend")
        ], 10, hs)) : g("", !0),
        t.hint || (o = (l = t.$slots).hint) != null && o.call(l).length ? (i(), f("div", vs, [
          c("span", {
            class: F(["fr-hint-text", t.hintClass])
          }, [
            N(h(t.hint) + " ", 1),
            $(t.$slots, "hint")
          ], 2)
        ])) : g("", !0),
        c("div", gs, [
          $(t.$slots, "default")
        ])
      ]);
    };
  }
}), bs = ["href", "download"], ys = { class: "fr-link__detail" }, fn = /* @__PURE__ */ O({
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
}, Ms = ["id"], Cs = /* @__PURE__ */ O({
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
      class: F(["fr-upload-group", {
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
      c("input", Y({
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
        }, h(o.error ?? o.validMessage), 9, Ms)) : g("", !0)
      ])) : g("", !0)
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
}, pn = /* @__PURE__ */ O({
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
        c("p", Bs, h(r.description), 1)
      ]),
      r.onlyCallout ? (i(), f("div", $s, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (o) => r.buttonAction ? r.buttonAction(o) : () => {
          })
        }, h(r.buttonText), 9, As)
      ])) : (i(), f("div", Ss, [
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
}, Qs = ["title", "href"], mn = /* @__PURE__ */ O({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ws, [
      (i(), j(ge(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: X(() => e[0] || (e[0] = [
          N(" Suivez-nous "),
          c("br", null, null, -1),
          N(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Ys, [
        (i(!0), f(z, null, U(t.networks, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: F(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h(n.name), 11, Qs)
        ]))), 128))
      ])) : g("", !0)
    ]));
  }
}), Ks = { class: "fr-follow" }, zs = { class: "fr-container" }, Gs = { class: "fr-grid-row" }, Xs = /* @__PURE__ */ O({
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
          $(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: F(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ee(pn, De(yt(r.newsletterData)), null, 16)
            ], 2)) : g("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: F(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              ee(mn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : g("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ea = 1, hn = /* @__PURE__ */ O({
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
    return (p, m) => (i(), j(ge(r.value), Y({
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
        var D, M;
        return [
          !u.value && (p.icon || (D = p.iconAttrs) != null && D.name) && !p.iconRight ? (i(), j(pe, Y({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : g("", !0),
          N(" " + h(p.label) + " ", 1),
          !u.value && (p.icon || (M = p.iconAttrs) != null && M.name) && p.iconRight ? (i(), j(pe, Y({
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
}, ti = ["href"], ai = ["src", "alt"], ni = { class: "fr-footer__partners-sub" }, ri = ["href"], li = ["src", "alt"], vn = /* @__PURE__ */ O({
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
      class: F(["fr-logo", {
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
    ]), n = Kt(), r = w(() => {
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
              $(p.$slots, "footer-link-lists", {}, void 0, !0)
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
              ], 8, mi)) : (i(), j(D, {
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
              ee(D, {
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
                $(p.$slots, "description", {}, () => [
                  N(h(p.descText), 1)
                ], !0)
              ]),
              c("ul", ki, [
                (i(!0), f(z, null, U(p.ecosystemLinks, ({ href: M, label: k, title: S, ...b }, _) => (i(), f("li", {
                  key: _,
                  class: "fr-footer__content-item"
                }, [
                  c("a", Y({
                    class: "fr-footer__content-link",
                    href: M,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: S,
                    ref_for: !0
                  }, b), h(k), 17, wi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), j(vn, De(Y({ key: 0 }, p.partners)), null, 16)) : g("", !0),
          c("div", _i, [
            c("ul", xi, [
              (i(!0), f(z, null, U(e.value, (M, k) => (i(), f("li", {
                key: k,
                class: "fr-footer__bottom-item"
              }, [
                ee(hn, Y({ ref_for: !0 }, M), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", Di, [
              c("p", null, [
                N(h(p.licenceText) + " ", 1),
                (i(), j(ge(l.value ? "a" : "RouterLink"), Y({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : s.value,
                  href: l.value ? u.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: X(() => [
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
}), Ii = /* @__PURE__ */ ke(Ti, [["__scopeId", "data-v-613931c6"]]), Ei = { class: "fr-footer__top-cat" }, Mi = { class: "fr-footer__top-list" }, Ci = ["href"], Pi = /* @__PURE__ */ O({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(a) {
    return (t, e) => {
      const n = _e("RouterLink");
      return i(), f("div", null, [
        c("h3", Ei, h(t.categoryName), 1),
        c("ul", Mi, [
          (i(!0), f(z, null, U(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, h(r.label), 9, Ci)) : g("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), j(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: X(() => [
                N(h(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : g("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Li = { class: "fr-connect-group" }, Bi = { class: "fr-connect__brand" }, $i = ["href", "title"], Ai = /* @__PURE__ */ O({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Li, [
      c("button", {
        class: F(["fr-connect", [{ "fr-connect--plus": t.secure }]])
      }, [
        e[0] || (e[0] = c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        c("span", Bi, "FranceConnect" + h(t.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: t.url ?? `https://franceconnect.gouv.fr/${t.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, h(`Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ?`), 9, $i)
      ])
    ]));
  }
}), Si = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Oi = { class: "fr-nav__item" }, Ri = ["aria-controls", "aria-expanded"], Fi = { class: "fr-hidden-lg" }, Ni = ["id"], Vi = { class: "fr-menu__list" }, ji = ["hreflang", "lang", "aria-current", "href", "onClick"], nt = /* @__PURE__ */ O({
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
    } = $e(), d = H(!1);
    function p(D) {
      d.value = !1, n("select", D);
    }
    const m = w(
      () => e.languages.find(({ codeIso: D }) => D === e.currentLanguage)
    );
    return me(d, (D, M) => {
      D !== M && s(D);
    }), (D, M) => {
      var k, S;
      return i(), f("nav", Si, [
        c("div", Oi, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": D.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: M[0] || (M[0] = J((b) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            N(h((k = m.value) == null ? void 0 : k.codeIso.toUpperCase()), 1),
            c("span", Fi, " - " + h((S = m.value) == null ? void 0 : S.label), 1)
          ], 8, Ri),
          c("div", {
            id: D.id,
            ref_key: "collapse",
            ref: r,
            class: F(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": R(o), "fr-collapsing": R(l) }]),
            onTransitionend: M[1] || (M[1] = (b) => R(u)(d.value))
          }, [
            c("ul", Vi, [
              (i(!0), f(z, null, U(D.languages, (b, _) => (i(), f("li", { key: _ }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: b.codeIso,
                  lang: b.codeIso,
                  "aria-current": D.currentLanguage === b.codeIso ? !0 : void 0,
                  href: `#${b.codeIso}`,
                  onClick: J((T) => p(b), ["prevent", "stop"])
                }, h(`${b.codeIso.toUpperCase()} - ${b.label}`), 9, ji)
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
    const e = a, n = or(), r = H(null), l = () => {
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
        class: F(u.value),
        for: d.id
      }, [
        $(d.$slots, "label", {}, () => [
          N(h(d.label) + " ", 1),
          $(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", Hi, "*")) : g("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", Wi, h(d.hint), 1)) : g("", !0)
      ], 10, qi),
      s.value ? (i(), f("div", {
        key: 1,
        class: F([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), j(ge(o.value), Y({ id: d.id }, d.$attrs, {
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
      ], 2)) : (i(), j(ge(o.value), Y({
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
      class: F(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
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
    return (m, D) => (i(), j(ge(l.value), Y({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && m.iconRight,
        "fr-btn--icon-left": d.value && !m.iconRight,
        [String(m.icon)]: d.value
      }]
    }, u.value, {
      target: m.target,
      onClick: D[0] || (D[0] = J((M) => m.onClick(M), ["stop"]))
    }), {
      default: X(() => {
        var M, k;
        return [
          !d.value && (m.icon || (M = m.iconAttrs) != null && M.name) && !m.iconRight ? (i(), j(pe, Y({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : g("", !0),
          N(" " + h(m.label) + " ", 1),
          !d.value && (m.icon || (k = m.iconAttrs) != null && k.name) && m.iconRight ? (i(), j(pe, Y({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : g("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Qi = ["aria-label"], Ki = { class: "fr-btns-group" }, jt = /* @__PURE__ */ O({
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
          ee(ra, Y({ ref_for: !0 }, l, {
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
    const e = a, n = t, r = ot(e, "languageSelector"), l = H(!1), o = H(!1), s = H(!1), u = () => {
      var _;
      s.value = !1, l.value = !1, o.value = !1, (_ = document.getElementById("button-menu")) == null || _.focus();
    }, d = (_) => {
      _.key === "Escape" && u();
    };
    be(() => {
      document.addEventListener("keydown", d);
    }), Te(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      s.value = !0, l.value = !0, o.value = !1, setTimeout(() => {
        var _;
        (_ = document.getElementById("close-button")) == null || _.focus();
      });
    }, m = () => {
      s.value = !0, l.value = !1, o.value = !0;
    }, D = u, M = w(() => [e.homeLabel, e.serviceTitle].filter((_) => _).join(" - ")), k = Kt(), S = w(() => {
      var _;
      return !!((_ = k.operator) != null && _.call(k).length) || !!e.operatorImgSrc;
    }), b = w(() => !!k.mainnav);
    return Oe(Xt, () => u), (_, T) => {
      var L, I, C;
      const y = _e("RouterLink");
      return i(), f("header", zi, [
        c("div", Gi, [
          c("div", Xi, [
            c("div", Ui, [
              c("div", Zi, [
                c("div", Ji, [
                  c("div", eu, [
                    ee(y, {
                      to: _.homeTo,
                      title: M.value
                    }, {
                      default: X(() => [
                        ee(at, {
                          "logo-text": _.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  S.value ? (i(), f("div", tu, [
                    $(_.$slots, "operator", {}, () => [
                      _.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: _.operatorImgSrc,
                        alt: _.operatorImgAlt,
                        style: xe(_.operatorImgStyle)
                      }, null, 12, au)) : g("", !0)
                    ])
                  ])) : g("", !0),
                  _.showSearch || b.value || (L = _.quickLinks) != null && L.length ? (i(), f("div", nu, [
                    _.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": _.showSearchLabel,
                      title: _.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: T[0] || (T[0] = J((v) => m(), ["prevent", "stop"]))
                    }, null, 8, ru)) : g("", !0),
                    b.value || (I = _.quickLinks) != null && I.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": _.menuLabel,
                      title: _.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = J((v) => p(), ["prevent", "stop"]))
                    }, null, 8, lu)) : g("", !0)
                  ])) : g("", !0)
                ]),
                _.serviceTitle ? (i(), f("div", ou, [
                  ee(y, Y({
                    to: _.homeTo,
                    title: M.value
                  }, _.$attrs), {
                    default: X(() => [
                      c("p", su, [
                        N(h(_.serviceTitle) + " ", 1),
                        _.showBeta ? (i(), f("span", iu, " BETA ")) : g("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  _.serviceDescription ? (i(), f("p", uu, h(_.serviceDescription), 1)) : g("", !0)
                ])) : g("", !0),
                !_.serviceTitle && _.showBeta ? (i(), f("div", du, T[9] || (T[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : g("", !0)
              ]),
              c("div", cu, [
                (C = _.quickLinks) != null && C.length || r.value ? (i(), f("div", fu, [
                  l.value ? g("", !0) : (i(), j(jt, {
                    key: 0,
                    links: _.quickLinks,
                    "nav-aria-label": _.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), j(nt, Y({ key: 1 }, r.value, {
                    onSelect: T[2] || (T[2] = (v) => n("languageSelect", v))
                  }), null, 16)) : g("", !0)
                ])) : g("", !0),
                _.showSearch ? (i(), f("div", pu, [
                  ee(rt, {
                    "searchbar-id": _.searchbarId,
                    label: _.searchLabel,
                    "model-value": _.modelValue,
                    placeholder: _.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (v) => n("update:modelValue", v)),
                    onSearch: T[4] || (T[4] = (v) => n("search", v))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ]),
            _.showSearch || b.value || _.quickLinks && _.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: F(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": _.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", hu, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: T[5] || (T[5] = J((v) => u(), ["prevent", "stop"]))
                }, h(_.closeMenuModalLabel), 1),
                c("div", vu, [
                  r.value ? (i(), j(nt, Y({ key: 0 }, r.value, {
                    onSelect: T[6] || (T[6] = (v) => r.value.currentLanguage = v.codeIso)
                  }), null, 16)) : g("", !0),
                  l.value ? (i(), j(jt, {
                    key: 1,
                    role: "navigation",
                    links: _.quickLinks,
                    "nav-aria-label": _.quickLinksAriaLabel,
                    onLinkClick: R(D)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : g("", !0)
                ]),
                s.value ? $(_.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : g("", !0),
                o.value ? (i(), f("div", gu, [
                  ee(rt, {
                    "searchbar-id": _.searchbarId,
                    "model-value": _.modelValue,
                    placeholder: _.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (v) => n("update:modelValue", v)),
                    onSearch: T[8] || (T[8] = (v) => n("search", v))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ], 10, mu)) : g("", !0),
            $(_.$slots, "default")
          ])
        ]),
        c("div", bu, [
          b.value && !s.value ? (i(), f("div", yu, [
            $(_.$slots, "mainnav", { hidemodal: u })
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
      class: F(["fr-highlight", { [`fr-highlight--${t.color}`]: t.color }])
    }, [
      c("p", {
        class: F({
          "fr-text--lg": t.large && !t.small,
          "fr-text--sm": t.small && !t.large
        })
      }, [
        N(h(t.text) + " ", 1),
        $(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), _u = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, xu = ["id", "data-testid"], Du = ["id", "data-testid"], Tu = ["id", "data-testid"], Iu = ["id", "data-testid"], Eu = /* @__PURE__ */ O({
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
      class: F(["fr-input-group", [
        {
          "fr-input-group--error": t.errorMessage,
          "fr-input-group--valid": t.validMessage && !t.errorMessage
        },
        t.wrapperClass
      ]])
    }, [
      $(t.$slots, "before-input"),
      $(t.$slots, "default"),
      t.$slots.default ? g("", !0) : (i(), j(It, Y({ key: 0 }, t.$attrs, {
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
        }, h(n), 9, xu))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(t.errorMessage), 9, Du)) : g("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(z, { key: 2 }, U(t.validMessage, (n) => (i(), f("p", {
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
        typeof n.getShadowRoot == "function" && n.getShadowRoot(o), D = !ht(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(o));
        if (m && D) {
          var M = a(m === !0 ? o.children : m.children, !0, n);
          n.flatten ? r.push.apply(r, M) : r.push({
            scopeParent: o,
            candidates: M
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
  }, o, s = function(E, A, B) {
    return E && E[A] !== void 0 ? E[A] : r[B || A];
  }, u = function(E, A) {
    var B = typeof (A == null ? void 0 : A.composedPath) == "function" ? A.composedPath() : void 0;
    return l.containerGroups.findIndex(function(q) {
      var K = q.container, ne = q.tabbableNodes;
      return K.contains(E) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (B == null ? void 0 : B.includes(K)) || ne.find(function(te) {
        return te === E;
      });
    });
  }, d = function(E) {
    var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, B = A.hasFallback, q = B === void 0 ? !1 : B, K = A.params, ne = K === void 0 ? [] : K, te = r[E];
    if (typeof te == "function" && (te = te.apply(void 0, Gu(ne))), te === !0 && (te = void 0), !te) {
      if (te === void 0 || te === !1)
        return te;
      throw new Error("`".concat(E, "` was specified but was not a node, or did not return a node"));
    }
    var ie = te;
    if (typeof te == "string") {
      try {
        ie = e.querySelector(te);
      } catch (se) {
        throw new Error("`".concat(E, '` appears to be an invalid selector; error="').concat(se.message, '"'));
      }
      if (!ie && !q)
        throw new Error("`".concat(E, "` as selector refers to no known node"));
    }
    return ie;
  }, p = function() {
    var E = d("initialFocus", {
      hasFallback: !0
    });
    if (E === !1)
      return !1;
    if (E === void 0 || E && !Pt(E, r.tabbableOptions))
      if (u(e.activeElement) >= 0)
        E = e.activeElement;
      else {
        var A = l.tabbableGroups[0], B = A && A.firstTabbableNode;
        E = B || d("fallbackFocus");
      }
    else E === null && (E = d("fallbackFocus"));
    if (!E)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return E;
  }, m = function() {
    if (l.containerGroups = l.containers.map(function(E) {
      var A = qu(E, r.tabbableOptions), B = Hu(E, r.tabbableOptions), q = A.length > 0 ? A[0] : void 0, K = A.length > 0 ? A[A.length - 1] : void 0, ne = B.find(function(se) {
        return We(se);
      }), te = B.slice().reverse().find(function(se) {
        return We(se);
      }), ie = !!A.find(function(se) {
        return Ve(se) > 0;
      });
      return {
        container: E,
        tabbableNodes: A,
        focusableNodes: B,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ie,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: q,
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
          var Ie = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ce = A.indexOf(se);
          return Ce < 0 ? Ie ? B.slice(B.indexOf(se) + 1).find(function(W) {
            return We(W);
          }) : B.slice(0, B.indexOf(se)).reverse().find(function(W) {
            return We(W);
          }) : A[Ce + (Ie ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(E) {
      return E.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(E) {
      return E.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, D = function(E) {
    var A = E.activeElement;
    if (A)
      return A.shadowRoot && A.shadowRoot.activeElement !== null ? D(A.shadowRoot) : A;
  }, M = function(E) {
    if (E !== !1 && E !== D(document)) {
      if (!E || !E.focus) {
        M(p());
        return;
      }
      E.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = E, Ju(E) && E.select();
    }
  }, k = function(E) {
    var A = d("setReturnFocus", {
      params: [E]
    });
    return A || (A === !1 ? !1 : E);
  }, S = function(E) {
    var A = E.target, B = E.event, q = E.isBackward, K = q === void 0 ? !1 : q;
    A = A || ut(B), m();
    var ne = null;
    if (l.tabbableGroups.length > 0) {
      var te = u(A, B), ie = te >= 0 ? l.containerGroups[te] : void 0;
      if (te < 0)
        K ? ne = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : ne = l.tabbableGroups[0].firstTabbableNode;
      else if (K) {
        var se = l.tabbableGroups.findIndex(function(ve) {
          var Pe = ve.firstTabbableNode;
          return A === Pe;
        });
        if (se < 0 && (ie.container === A || Pt(A, r.tabbableOptions) && !We(A, r.tabbableOptions) && !ie.nextTabbableNode(A, !1)) && (se = te), se >= 0) {
          var Ie = se === 0 ? l.tabbableGroups.length - 1 : se - 1, Ce = l.tabbableGroups[Ie];
          ne = Ve(A) >= 0 ? Ce.lastTabbableNode : Ce.lastDomTabbableNode;
        } else Je(B) || (ne = ie.nextTabbableNode(A, !1));
      } else {
        var W = l.tabbableGroups.findIndex(function(ve) {
          var Pe = ve.lastTabbableNode;
          return A === Pe;
        });
        if (W < 0 && (ie.container === A || Pt(A, r.tabbableOptions) && !We(A, r.tabbableOptions) && !ie.nextTabbableNode(A)) && (W = te), W >= 0) {
          var G = W === l.tabbableGroups.length - 1 ? 0 : W + 1, ae = l.tabbableGroups[G];
          ne = Ve(A) >= 0 ? ae.firstTabbableNode : ae.firstDomTabbableNode;
        } else Je(B) || (ne = ie.nextTabbableNode(A));
      }
    } else
      ne = d("fallbackFocus");
    return ne;
  }, b = function(E) {
    var A = ut(E);
    if (!(u(A, E) >= 0)) {
      if (Xe(r.clickOutsideDeactivates, E)) {
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
      Xe(r.allowOutsideClick, E) || E.preventDefault();
    }
  }, _ = function(E) {
    var A = ut(E), B = u(A, E) >= 0;
    if (B || A instanceof Document)
      B && (l.mostRecentlyFocusedNode = A);
    else {
      E.stopImmediatePropagation();
      var q, K = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ve(l.mostRecentlyFocusedNode) > 0) {
          var ne = u(l.mostRecentlyFocusedNode), te = l.containerGroups[ne].tabbableNodes;
          if (te.length > 0) {
            var ie = te.findIndex(function(se) {
              return se === l.mostRecentlyFocusedNode;
            });
            ie >= 0 && (r.isKeyForward(l.recentNavEvent) ? ie + 1 < te.length && (q = te[ie + 1], K = !1) : ie - 1 >= 0 && (q = te[ie - 1], K = !1));
          }
        } else
          l.containerGroups.some(function(se) {
            return se.tabbableNodes.some(function(Ie) {
              return Ve(Ie) > 0;
            });
          }) || (K = !1);
      else
        K = !1;
      K && (q = S({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), M(q || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, T = function(E) {
    var A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = E;
    var B = S({
      event: E,
      isBackward: A
    });
    B && (Je(E) && E.preventDefault(), M(B));
  }, L = function(E) {
    (r.isKeyForward(E) || r.isKeyBackward(E)) && T(E, r.isKeyBackward(E));
  }, I = function(E) {
    ed(E) && Xe(r.escapeDeactivates, E) !== !1 && (E.preventDefault(), o.deactivate());
  }, C = function(E) {
    var A = ut(E);
    u(A, E) >= 0 || Xe(r.clickOutsideDeactivates, E) || Xe(r.allowOutsideClick, E) || (E.preventDefault(), E.stopImmediatePropagation());
  }, y = function() {
    if (l.active)
      return Ba.activateTrap(n, o), l.delayInitialFocusTimer = r.delayInitialFocus ? $a(function() {
        M(p());
      }) : M(p()), e.addEventListener("focusin", _, !0), e.addEventListener("mousedown", b, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", b, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", C, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", L, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", I), o;
  }, v = function() {
    if (l.active)
      return e.removeEventListener("focusin", _, !0), e.removeEventListener("mousedown", b, !0), e.removeEventListener("touchstart", b, !0), e.removeEventListener("click", C, !0), e.removeEventListener("keydown", L, !0), e.removeEventListener("keydown", I), o;
  }, x = function(E) {
    var A = E.some(function(B) {
      var q = Array.from(B.removedNodes);
      return q.some(function(K) {
        return K === l.mostRecentlyFocusedNode;
      });
    });
    A && M(p());
  }, P = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(x) : void 0, Q = function() {
    P && (P.disconnect(), l.active && !l.paused && l.containers.map(function(E) {
      P.observe(E, {
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
    activate: function(E) {
      if (l.active)
        return this;
      var A = s(E, "onActivate"), B = s(E, "onPostActivate"), q = s(E, "checkCanFocusTrap");
      q || m(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, A == null || A();
      var K = function() {
        q && m(), y(), Q(), B == null || B();
      };
      return q ? (q(l.containers.concat()).then(K, K), this) : (K(), this);
    },
    deactivate: function(E) {
      if (!l.active)
        return this;
      var A = La({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, E);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, v(), l.active = !1, l.paused = !1, Q(), Ba.deactivateTrap(n, o);
      var B = s(A, "onDeactivate"), q = s(A, "onPostDeactivate"), K = s(A, "checkCanReturnFocus"), ne = s(A, "returnFocus", "returnFocusOnDeactivate");
      B == null || B();
      var te = function() {
        $a(function() {
          ne && M(k(l.nodeFocusedBeforeActivation)), q == null || q();
        });
      };
      return ne && K ? (K(k(l.nodeFocusedBeforeActivation)).then(te, te), this) : (te(), this);
    },
    pause: function(E) {
      if (l.paused || !l.active)
        return this;
      var A = s(E, "onPause"), B = s(E, "onPostPause");
      return l.paused = !0, A == null || A(), v(), Q(), B == null || B(), this;
    },
    unpause: function(E) {
      if (!l.paused || !l.active)
        return this;
      var A = s(E, "onUnpause"), B = s(E, "onPostUnpause");
      return l.paused = !1, A == null || A(), m(), y(), Q(), B == null || B(), this;
    },
    updateContainerElements: function(E) {
      var A = [].concat(E).filter(Boolean);
      return l.containers = A.map(function(B) {
        return typeof B == "string" ? e.querySelector(B) : B;
      }), l.active && m(), Q(), this;
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
    const r = H(null), l = w(() => {
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
}, Aa = 2, vd = /* @__PURE__ */ O({
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
    const e = a, n = t, r = (k) => {
      k.key === "Escape" && m();
    }, l = w(() => e.isAlert ? "alertdialog" : "dialog"), o = H(null), s = H();
    me(() => e.opened, (k) => {
      var S, b;
      k ? ((S = s.value) == null || S.showModal(), setTimeout(() => {
        var _;
        (_ = o.value) == null || _.focus();
      }, 100)) : (b = s.value) == null || b.close(), u(k);
    });
    function u(k) {
      typeof window < "u" && document.body.classList.toggle("modal-open", k);
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
      var k;
      await Qa(), (k = e.origin) == null || k.focus(), n("close");
    }
    const D = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), M = w(
      () => D.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Aa } : { scale: Aa, ...e.icon ?? {} }
    );
    return (k, S) => k.opened ? (i(), j(R(od), { key: 0 }, {
      default: X(() => {
        var b, _;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-modal": "true",
            "aria-labelledby": k.modalId,
            role: l.value,
            class: F(["fr-modal", { "fr-modal--opened": k.opened }]),
            open: k.opened
          }, [
            c("div", id, [
              c("div", ud, [
                c("div", {
                  class: F(["fr-col-12", {
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
                        onClick: S[0] || (S[0] = (T) => m())
                      }, [
                        c("span", null, h(k.closeButtonLabel), 1)
                      ], 8, fd)
                    ]),
                    c("div", pd, [
                      c("h1", {
                        id: k.modalId,
                        class: "fr-modal__title"
                      }, [
                        D.value || M.value ? (i(), f("span", {
                          key: 0,
                          class: F({
                            [String(k.icon)]: D.value
                          })
                        }, [
                          k.icon && M.value ? (i(), j(pe, De(Y({ key: 0 }, M.value)), null, 16)) : g("", !0)
                        ], 2)) : g("", !0),
                        N(" " + h(k.title), 1)
                      ], 8, md),
                      $(k.$slots, "default", {}, void 0, !0)
                    ]),
                    (b = k.actions) != null && b.length || k.$slots.footer ? (i(), f("div", hd, [
                      $(k.$slots, "footer", {}, void 0, !0),
                      (_ = k.actions) != null && _.length ? (i(), j(Dt, {
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
}, Dd = { class: "fr-input-wrap fr-icon-search-line" }, Td = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Id = { key: 2 }, Ed = ["id"], Md = /* @__PURE__ */ O({
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
    const t = a, e = (W, G) => typeof W == "object" && W !== null && !!G && G in W, n = (W, G) => {
      if (G && e(W, G)) {
        const ae = W[G];
        if (typeof ae == "string" || typeof ae == "number")
          return ae;
        throw new Error(
          `The value of idKey ${String(G)} is not a string or number.`
        );
      }
      if (typeof W == "string" || typeof W == "number")
        return W;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (W, G, ae) => `${G}-${n(W, ae)}`, l = H(null), o = H(!1), s = we(a, "modelValue"), u = H(0), d = w(() => t.errorMessage || t.successMessage), p = w(() => t.errorMessage ? "error" : "valid"), m = [], {
      collapse: D,
      collapsing: M,
      cssExpanded: k,
      doExpand: S,
      onTransitionEnd: b
    } = $e(), _ = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), T = H(!1), L = H("");
    function I(W) {
      W.key === "Escape" && P();
    }
    function C(W) {
      var G, ae;
      const ve = W.target;
      !((G = l.value) != null && G.$el.contains(ve)) && !((ae = D.value) != null && ae.contains(ve)) && P();
    }
    function y(W, G) {
      if (window.ResizeObserver) {
        const ae = new window.ResizeObserver((ve) => {
          for (const Pe of ve)
            G(W, Pe);
        });
        return ae.observe(W), () => {
          ae.unobserve(W), ae.disconnect();
        };
      }
      return () => {
      };
    }
    function v(W) {
      const G = W.getBoundingClientRect();
      G.width !== u.value && (u.value = G.width);
    }
    function x() {
      o.value = !0, T.value = !0, l.value && m.push(y(l.value.$el, v)), document.addEventListener("click", C), document.addEventListener("keydown", I), setTimeout(() => {
        S(!0);
      }, 100);
    }
    function P() {
      o.value = !1, S(!1), setTimeout(() => {
        T.value = !1;
      }, 300), E();
    }
    const Q = async () => {
      T.value ? P() : x();
    };
    function E() {
      for (; m.length; ) {
        const W = m.pop();
        W && W();
      }
      document.removeEventListener("click", C), document.removeEventListener("keydown", I);
    }
    const A = w(
      () => t.options.filter((W) => typeof W == "object" && W !== null ? t.filteringKeys.some(
        (G) => `${W[G]}`.toLowerCase().includes(L.value.toLowerCase())
      ) : `${W}`.toLowerCase().includes(L.value.toLowerCase()))
    ), B = w(() => t.modelValue.length < A.value.length ? !1 : A.value.every((W) => {
      const G = n(W, t.idKey);
      return t.modelValue.includes(G);
    })), q = () => {
      const W = new Set(s.value || []);
      B.value ? A.value.forEach((G) => {
        const ae = n(G, t.idKey);
        W.delete(ae);
      }) : A.value.forEach((G) => {
        const ae = n(G, t.idKey);
        W.add(ae);
      }), s.value = Array.from(W);
    }, K = (W) => {
      const [G] = _();
      G && (W.preventDefault(), G.focus());
    }, ne = (W) => {
      W.preventDefault();
      const G = _(), ae = document.activeElement, ve = Array.from(G).indexOf(ae);
      if (ve !== -1) {
        const Pe = (ve + 1) % G.length;
        G[Pe].focus();
      }
    }, te = (W) => {
      W.preventDefault();
      const G = _(), ae = document.activeElement, ve = Array.from(G).indexOf(ae);
      if (ve !== -1) {
        const Pe = (ve - 1 + G.length) % G.length;
        G[Pe].focus();
      }
    }, ie = (W) => {
      const G = _(), ae = document.activeElement;
      Array.from(G).indexOf(ae) + 1 === G.length && l.value && !W.shiftKey && P();
    }, se = (W) => {
      var G;
      const ae = document.activeElement;
      W.shiftKey && ae === ((G = l.value) == null ? void 0 : G.$el) && P();
    };
    Te(() => {
      E();
    });
    const Ie = w(() => {
      var W;
      const G = ((W = s.value) == null ? void 0 : W.length) ?? 0, ae = G === 0, ve = G > 1;
      return ae ? "Sélectionner une option" : `${G} option${ve ? "s" : ""} sélectionnée${ve ? "s" : ""}`;
    }), Ce = w(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (W, G) => (i(), f("div", {
      class: F(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
    }, [
      c("label", {
        class: F(Ce.value),
        for: W.id
      }, [
        $(W.$slots, "label", {}, () => [
          N(h(W.label) + " ", 1),
          $(W.$slots, "required-tip", {}, () => [
            "required" in W.$attrs && W.$attrs.required !== !1 ? (i(), f("span", bd, "*")) : g("", !0)
          ], !0)
        ], !0),
        t.hint || W.$slots.hint ? (i(), f("span", yd, [
          $(W.$slots, "hint", {}, () => [
            N(h(t.hint), 1)
          ], !0)
        ])) : g("", !0)
      ], 10, gd),
      ee(qe, Y({
        id: t.id,
        ref_key: "host",
        ref: l,
        type: "button"
      }, W.$attrs, {
        class: ["fr-select fr-multiselect", {
          "fr-multiselect--is-open": o.value,
          [`fr-select--${p.value}`]: d.value
        }],
        "aria-expanded": o.value,
        "aria-controls": `${t.id}-collapse`,
        onClick: Q,
        onKeydown: Z(J(se, ["shift"]), ["tab"])
      }), {
        default: X(() => [
          $(W.$slots, "button-label", {}, () => [
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
        class: F(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": R(k), "fr-collapsing": R(M) }]),
        onTransitionend: G[2] || (G[2] = (ae) => R(b)(o.value))
      }, [
        c("p", {
          id: `${W.id}-text-hint`,
          class: "fr-sr-only"
        }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, wd),
        W.selectAll ? (i(), f("ul", _d, [
          c("li", null, [
            ee(qe, {
              type: "button",
              name: "select-all",
              secondary: "",
              size: "sm",
              disabled: A.value.length === 0,
              onClick: q,
              onKeydown: Z(J(se, ["shift"]), ["tab"])
            }, {
              default: X(() => [
                c("span", {
                  class: F([
                    "fr-multiselect__search__icon",
                    B.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                  ])
                }, null, 2),
                N(" " + h(t.selectAllLabel[B.value ? 1 : 0]), 1)
              ]),
              _: 1
            }, 8, ["disabled", "onKeydown"])
          ])
        ])) : g("", !0),
        t.search ? (i(), f("div", xd, [
          c("div", Dd, [
            ee(It, {
              modelValue: L.value,
              "onUpdate:modelValue": G[0] || (G[0] = (ae) => L.value = ae),
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
        ])) : g("", !0),
        ee(cn, {
          id: `${t.id}-checkboxes`,
          class: "fr-multiselect__collapse__fieldset",
          "aria-live": "polite",
          style: xe({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
          legend: t.legend,
          "legend-id": `${t.id}-checkboxes-legend`
        }, {
          default: X(() => [
            $(W.$slots, "legend", {}, void 0, !0),
            (i(!0), f(z, null, U(A.value, (ae) => (i(), f("div", {
              key: `${r(ae, W.id, t.idKey)}-checkbox`,
              class: "fr-fieldset__element"
            }, [
              c("div", Td, [
                ee(Tt, {
                  id: `${r(ae, W.id, t.idKey)}-checkbox`,
                  modelValue: s.value,
                  "onUpdate:modelValue": G[1] || (G[1] = (ve) => s.value = ve),
                  value: n(ae, t.idKey),
                  name: `${r(ae, W.id, t.idKey)}-checkbox`,
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
                    $(W.$slots, "checkbox-label", {
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
        A.value.length === 0 ? (i(), f("div", Id, [
          $(W.$slots, "no-results", {}, () => [
            G[4] || (G[4] = N(" Pas de résultat "))
          ], !0)
        ])) : g("", !0)
      ], 46, kd)) : g("", !0),
      d.value ? (i(), f("p", {
        key: 1,
        id: `select-${p.value}-desc-${p.value}`,
        class: F(`fr-${p.value}-text`)
      }, h(d.value), 11, Ed)) : g("", !0)
    ], 2));
  }
}), Cd = /* @__PURE__ */ ke(Md, [["__scopeId", "data-v-7fb20102"]]), Pd = ["id", "aria-current"], Ld = /* @__PURE__ */ O({
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
      $(t.$slots, "default", {}, void 0, !0)
    ], 8, Pd));
  }
}), Dn = /* @__PURE__ */ ke(Ld, [["__scopeId", "data-v-5909c19f"]]), Bd = ["href"], Sa = 2, Et = /* @__PURE__ */ O({
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
      }, h(s.text), 9, Bd)) : (i(), j(d, {
        key: 1,
        class: F(["fr-nav__link", {
          [String(s.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: u[1] || (u[1] = (p) => {
          var m;
          R(o)(), s.$emit("toggleId", s.id), (m = s.onClick) == null || m.call(s, p);
        })
      }, {
        default: X(() => [
          s.icon && r.value ? (i(), j(pe, De(Y({ key: 0 }, r.value)), null, 16)) : g("", !0),
          N(" " + h(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), $d = { class: "fr-col-12 fr-col-lg-3" }, Ad = { class: "fr-mega-menu__category" }, Sd = { class: "fr-mega-menu__list" }, Tn = /* @__PURE__ */ O({
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
        }, h(t.title), 1)
      ]),
      c("ul", Sd, [
        (i(!0), f(z, null, U(t.links, (n, r) => (i(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          ee(Et, Y({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Od = ["aria-expanded", "aria-current", "aria-controls"], Rd = ["id"], Fd = { class: "fr-container fr-container--fluid fr-container-lg" }, Nd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Vd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, jd = { class: "fr-mega-menu__leader" }, qd = { class: "fr-h4 fr-mb-2v" }, Hd = { class: "fr-hidden fr-displayed-lg" }, Wd = /* @__PURE__ */ O({
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
        }, h(u.title), 9, Od),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: F(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": R(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": R(n)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (m) => R(o)(s.value))
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
                    $(u.$slots, "description", {}, void 0, !0)
                  ]),
                  ee(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: X(() => [
                      N(h(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              $(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(z, null, U(u.menus, (m, D) => (i(), j(Tn, Y({
                key: D,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, Rd)
      ], 64);
    };
  }
}), In = /* @__PURE__ */ ke(Wd, [["__scopeId", "data-v-91c500cc"]]), Yd = ["id", "aria-current"], En = /* @__PURE__ */ O({
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
      $(t.$slots, "default")
    ], 8, Yd));
  }
}), Qd = ["aria-expanded", "aria-current", "aria-controls"], Kd = ["id"], zd = { class: "fr-menu__list" }, Mn = /* @__PURE__ */ O({
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
        c("span", null, h(u.title), 1)
      ], 8, Qd),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: e,
        class: F(["fr-collapse fr-menu", { "fr-collapse--expanded": R(r), "fr-collapsing": R(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => R(o)(s.value))
      }, [
        c("ul", zd, [
          $(u.$slots, "default"),
          (i(!0), f(z, null, U(u.links, (p, m) => (i(), j(En, { key: m }, {
            default: X(() => [
              ee(Et, Y({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (D) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Kd)
    ], 64));
  }
}), Gd = ["id", "aria-label"], Xd = { class: "fr-nav__list" }, Ud = /* @__PURE__ */ O({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => re("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(a) {
    const t = a, e = H(void 0), n = (s) => {
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
        $(s.$slots, "default"),
        (i(!0), f(z, null, U(s.navItems, (d, p) => (i(), j(Dn, {
          id: d.id,
          key: p
        }, {
          default: X(() => [
            d.to && d.text ? (i(), j(Et, Y({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), j(Mn, Y({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), j(In, Y({
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
      class: F(["fr-notice", `fr-notice--${t.type}`])
    }, [
      c("div", Zd, [
        c("div", Jd, [
          c("p", null, [
            c("span", ec, [
              $(t.$slots, "default", {}, () => [
                N(h(t.title), 1)
              ])
            ]),
            c("span", tc, [
              $(t.$slots, "desc", {}, () => [
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
      class: F(["fr-content-media", {
        "fr-content-media--sm": t.size === "small",
        "fr-content-media--lg": t.size === "large"
      }]),
      role: "group",
      "aria-label": t.legend
    }, [
      c("div", rc, [
        $(t.$slots, "default", {}, () => [
          t.src ? (i(), f("img", {
            key: 0,
            src: t.src,
            class: F(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
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
          (i(!0), f(z, null, U(t.details, (n, r) => (i(), f("li", { key: r }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, h(n.label), 9, fc)) : (i(), f(z, { key: 1 }, [
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
}, wc = ["src", "title"], _c = { key: 0 }, xc = ["href"], Dc = ["href"], Tc = ["href"], Cn = /* @__PURE__ */ O({
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
      class: F(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: F(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": r.small
        }])
      }, [
        c("input", Y({
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
          $(r.$slots, "label", {}, () => [
            N(h(r.label) + " ", 1),
            $(r.$slots, "required-tip", {}, () => [
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
          }, null, 8, wc)) : (i(), f("svg", Y({
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
}), Ic = { class: "fr-form-group" }, Ec = ["disabled", "aria-labelledby", "aria-invalid", "role"], Mc = ["id"], Cc = {
  key: 0,
  class: "fr-hint-text"
}, Pc = {
  key: 0,
  class: "required"
}, Lc = ["id"], Bc = /* @__PURE__ */ O({
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
        class: F(["fr-fieldset", {
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
          $(u.$slots, "legend", {}, () => [
            N(h(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Cc, [
              $(u.$slots, "hint", {}, () => [
                N(h(u.hint), 1)
              ])
            ])) : g("", !0),
            $(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Pc, " *")) : g("", !0)
            ])
          ])
        ], 8, Mc)) : g("", !0),
        $(u.$slots, "default", {}, () => [
          (i(!0), f(z, null, U(u.options, (p, m) => (i(), j(Cn, Y({
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
            class: F(["fr-message fr-message--info flex items-center", l.value])
          }, h(r.value), 3)
        ], 8, Lc)) : g("", !0)
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
}, jc = ["id"], qc = ["id"], Hc = /* @__PURE__ */ O({
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
    const e = a, n = t, r = H(), l = H(), o = H(), s = w(() => e.lowerValue !== void 0), u = w(() => e.lowerValue === void 0 ? `transform: translateX(${(e.modelValue - e.min) / (e.max - e.min) * o.value}px) translateX(-${e.modelValue}%);` : `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * o.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`), d = w(() => {
      const m = (e.modelValue - e.min) / (e.max - e.min) * o.value - (s.value ? 12 : 0), D = ((e.lowerValue ?? 0) - e.min) / (e.max - e.min) * o.value;
      return {
        "--progress-right": `${m + 24}px`,
        ...s.value ? { "--progress-left": `${D + 12}px` } : {}
      };
    });
    me([() => e.modelValue, () => e.lowerValue], ([m, D]) => {
      D !== void 0 && (s.value && m < D && n("update:lowerValue", m), s.value && D > m && n("update:modelValue", D));
    });
    const p = w(() => (e.prefix ?? "").concat(s.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return be(() => {
      var m;
      o.value = (m = r.value) == null ? void 0 : m.offsetWidth;
    }), (m, D) => (i(), f("div", {
      id: `${m.id}-group`,
      class: F(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      c("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        $(m.$slots, "label", {}, () => [
          N(h(m.label), 1)
        ]),
        c("span", Sc, [
          $(m.$slots, "hint", {}, () => [
            N(h(m.hint), 1)
          ])
        ])
      ], 8, Ac),
      c("div", {
        class: F(["fr-range", {
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
          onInput: D[0] || (D[0] = (M) => {
            var k;
            return n("update:lowerValue", +((k = M.target) == null ? void 0 : k.value));
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
          onInput: D[1] || (D[1] = (M) => {
            var k;
            return n("update:modelValue", +((k = M.target) == null ? void 0 : k.value));
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
        $(m.$slots, "messages", {}, () => [
          m.message ? (i(), f("p", {
            key: 0,
            id: `${m.id}-message-error`,
            class: "fr-message fr-message--error"
          }, h(m.message), 9, qc)) : g("", !0)
        ])
      ], 8, jc)) : g("", !0)
    ], 10, $c));
  }
}), Wc = { class: "fr-segmented__element" }, Yc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Qc = ["for"], Kc = { key: 1 }, Pn = /* @__PURE__ */ O({
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
      c("input", Y({
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
        class: F(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (i(), j(pe, De(Y({ key: 0 }, e.value)), null, 16)) : g("", !0),
        r.icon ? (i(), f("span", Kc, " ")) : g("", !0),
        N(" " + h(r.label), 1)
      ], 10, Qc)
    ]));
  }
}), zc = { class: "fr-form-group" }, Gc = ["disabled"], Xc = ["id"], Uc = {
  key: 0,
  class: "fr-hint-text"
}, Zc = { class: "fr-segmented__elements" }, Jc = /* @__PURE__ */ O({
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
        class: F(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (i(), f("legend", {
          key: 0,
          id: l.titleId,
          class: F(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          $(l.$slots, "legend", {}, () => [
            N(h(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", Uc, h(l.hint), 1)) : g("", !0)
        ], 10, Xc)) : g("", !0),
        c("div", Zc, [
          $(l.$slots, "default", {}, () => [
            (i(!0), f(z, null, U(l.options, (s, u) => (i(), j(Pn, Y({
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
      class: F(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        $(r.$slots, "label", {}, () => [
          N(h(r.label) + " ", 1),
          $(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", tf, " *")) : g("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", af, h(r.hint ?? r.description), 1)) : g("", !0)
      ], 8, ef),
      c("select", Y({
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
        (i(!0), f(z, null, U(r.options, (o, s) => (i(), f("option", {
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
        class: F(`fr-${n.value}-text`)
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
          (i(!0), f(z, null, U(n.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: F(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: J((u) => e(o), ["prevent"])
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
}), gf = ["aria-current", "aria-expanded", "aria-controls"], Ln = /* @__PURE__ */ O({
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
      $(t.$slots, "default")
    ], 8, gf));
  }
}), Bn = /* @__PURE__ */ O({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      class: F(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      $(t.$slots, "default")
    ], 2));
  }
}), bf = ["id"], yf = { class: "fr-sidemenu__list" }, $n = /* @__PURE__ */ O({
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
      const D = _e("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: F({
          "fr-collapse": p.collapsable,
          "fr-collapsing": R(n),
          "fr-collapse--expanded": R(r)
        }),
        onTransitionend: m[2] || (m[2] = (M) => R(o)(!!p.expanded))
      }, [
        c("ul", yf, [
          $(p.$slots, "default"),
          (i(!0), f(z, null, U(p.menuItems, (M, k) => (i(), j(Bn, {
            key: k,
            active: M.active
          }, {
            default: X(() => [
              M.menuItems ? g("", !0) : (i(), j(ge(u(M.to)), Y({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": M.active ? "page" : void 0,
                ref_for: !0
              }, d(M.to)), {
                default: X(() => [
                  N(h(M.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              M.menuItems ? (i(), f(z, { key: 1 }, [
                ee(Ln, {
                  active: !!M.active,
                  expanded: !!M.expanded,
                  "control-id": M.id,
                  onToggleExpand: m[0] || (m[0] = (S) => p.$emit("toggleExpand", S))
                }, {
                  default: X(() => [
                    N(h(M.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                M.menuItems ? (i(), j(D, {
                  key: 0,
                  id: M.id,
                  collapsable: "",
                  expanded: M.expanded,
                  "menu-items": M.menuItems,
                  onToggleExpand: m[1] || (m[1] = (S) => p.$emit("toggleExpand", S))
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
    } = $e(), o = H(!1);
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
        }, h(s.buttonLabel), 9, _f),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: t,
          class: F(["fr-collapse", {
            "fr-collapse--expanded": R(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": R(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => R(l)(o.value))
        }, [
          (i(), j(ge(s.titleTag), { class: "fr-sidemenu__title" }, {
            default: X(() => [
              N(h(s.headingTitle), 1)
            ]),
            _: 1
          })),
          $(s.$slots, "default", {}, () => [
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
}), Tf = /* @__PURE__ */ O({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const t = a, e = w(() => typeof t.to == "string" && t.to.startsWith("http")), n = w(() => e.value ? "a" : "RouterLink"), r = w(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, o) => (i(), j(ge(n.value), Y({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: X(() => [
        $(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), If = { class: "fr-skiplinks" }, Ef = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Mf = { class: "fr-skiplinks__list" }, Cf = ["href", "onClick"], Pf = /* @__PURE__ */ O({
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
            }, h(r.text), 9, Cf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Lf = { class: "fr-stepper" }, Bf = { class: "fr-stepper__title" }, $f = { class: "fr-stepper__state" }, Af = ["data-fr-current-step", "data-fr-steps"], Sf = { class: "fr-stepper__details" }, Of = {
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
      c("h2", Bf, [
        N(h(t.steps[t.currentStep - 1]) + " ", 1),
        c("span", $f, "Étape " + h(t.currentStep) + " sur " + h(t.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, Af),
      c("p", Sf, [
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
        (i(!0), f(z, null, U(t.anchors, (n, r) => (i(), f("li", { key: r }, [
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
    const t = a, e = { true: "100%", false: "-100%" }, n = Qe(kt), { isVisible: r, asc: l } = n(ot(() => t.tabId)), o = w(() => e[String(l == null ? void 0 : l.value)]), s = w(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), j(cr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: X(() => [
        Be(c("div", {
          id: u.panelId,
          class: F(["fr-tabs__panel", {
            "fr-tabs__panel--selected": R(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: R(r) ? 0 : -1
        }, [
          $(u.$slots, "default", {}, void 0, !0)
        ], 10, Hf), [
          [fr, R(r)]
        ])
      ]),
      _: 3
    }));
  }
}), An = /* @__PURE__ */ ke(Wf, [["__scopeId", "data-v-5774b16c"]]), Yf = { role: "presentation" }, Qf = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Kf = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Sn = /* @__PURE__ */ O({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = H(null), l = {
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
        tabindex: R(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": R(u),
        "aria-controls": d.panelId,
        onClick: p[0] || (p[0] = J((m) => d.$emit("click", d.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (m) => o(m))
      }, [
        d.icon ? (i(), f("span", Kf, [
          ee(pe, { name: d.icon }, null, 8, ["name"])
        ])) : g("", !0),
        $(d.$slots, "default")
      ], 40, Qf)
    ]));
  }
}), On = /* @__PURE__ */ O({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = w(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = w(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", Y(r.headerAttrs, { scope: "col" }), [
      N(h(r.header) + " ", 1),
      r.icon && !e.value ? (i(), j(pe, De(Y({ key: 0 }, n.value)), null, 16)) : g("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: F({ [String(r.icon)]: e.value })
      }, null, 2)) : g("", !0)
    ], 16));
  }
}), zf = { key: 0 }, Rn = /* @__PURE__ */ O({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (t, e) => t.headers ? (i(), f("tr", zf, [
      (i(!0), f(z, null, U(t.headers, (n, r) => (i(), j(On, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : g("", !0);
  }
}), Fn = /* @__PURE__ */ O({
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
      e.value ? (i(), j(ge(e.value), De(Y({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: X(() => [
          N(h(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(z, { key: 1 }, [
        N(h(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Nn = /* @__PURE__ */ O({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (t, e) => (i(), f("tr", De(yt(t.rowAttrs)), [
      $(t.$slots, "default"),
      (i(!0), f(z, null, U(t.rowData, (n, r) => (i(), j(Fn, {
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
    const e = a, n = t, r = (_) => Array.isArray(_) ? _ : _.rowData, l = H(e.currentPage), o = re("resultPerPage"), s = H(e.resultsDisplayed), u = w(
      () => e.rows.length > s.value ? Math.ceil(e.rows.length / s.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * s.value - s.value, m = () => l.value * s.value, D = w(() => e.pagination ? e.rows.slice(p(), m()) : e.rows), M = () => {
      l.value = 1, n("update:currentPage");
    }, k = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, S = () => {
      l.value < u.value && (l.value += 1, n("update:currentPage"));
    }, b = () => {
      l.value = u.value, n("update:currentPage");
    };
    return (_, T) => (i(), f("div", {
      class: F(["fr-table", { "fr-table--no-caption": _.noCaption }])
    }, [
      c("table", null, [
        c("caption", Gf, h(_.title), 1),
        c("thead", null, [
          $(_.$slots, "header", {}, () => [
            _.headers && _.headers.length ? (i(), j(Rn, {
              key: 0,
              headers: _.headers
            }, null, 8, ["headers"])) : g("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          $(_.$slots, "default", {}, void 0, !0),
          _.rows && _.rows.length ? (i(!0), f(z, { key: 0 }, U(D.value, (L, I) => (i(), j(Nn, {
            key: _.rowKey && r(L) ? typeof _.rowKey == "string" ? r(L)[_.headers.indexOf(_.rowKey)].toString() : _.rowKey(r(L)) : I,
            "row-data": r(L),
            "row-attrs": "rowAttrs" in L ? L.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : g("", !0),
          _.pagination ? (i(), f("tr", Xf, [
            c("td", {
              colspan: _.headers.length
            }, [
              c("div", Zf, [
                c("div", Jf, [
                  c("label", { for: R(o) }, "Résultats par page : ", 8, ep),
                  Be(c("select", {
                    id: R(o),
                    "onUpdate:modelValue": T[0] || (T[0] = (L) => s.value = L),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: T[1] || (T[1] = (L) => n("update:currentPage"))
                  }, [
                    (i(), f(z, null, U(d, (L, I) => c("option", {
                      key: I,
                      value: L
                    }, h(L), 9, ap)), 64))
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
                    onClick: T[2] || (T[2] = (L) => M())
                  }, T[6] || (T[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: T[3] || (T[3] = (L) => k())
                  }, T[7] || (T[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (L) => S())
                  }, T[8] || (T[8] = [
                    c("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: T[5] || (T[5] = (L) => b())
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
    const n = a, r = e, l = H(!1), o = w({
      get: () => n.modelValue,
      set(I) {
        r("update:modelValue", I);
      }
    }), s = H(/* @__PURE__ */ new Map()), u = H(0);
    Oe(kt, (I) => {
      const C = H(!0);
      if (me(o, (x, P) => {
        C.value = x > P;
      }), [...s.value.values()].includes(I.value))
        return { isVisible: w(() => s.value.get(o.value) === I.value), asc: C };
      const y = u.value++;
      s.value.set(y, I.value);
      const v = w(() => y === o.value);
      return me(I, () => {
        s.value.set(y, I.value);
      }), Te(() => {
        s.value.delete(y);
      }), { isVisible: v };
    });
    const d = H(null), p = H(null), m = ir({}), D = (I) => {
      if (m[I])
        return m[I];
      const C = re("tab");
      return m[I] = C, C;
    }, M = async () => {
      const I = o.value === 0 ? n.tabTitles.length - 1 : o.value - 1;
      l.value = !1, o.value = I;
    }, k = async () => {
      const I = o.value === n.tabTitles.length - 1 ? 0 : o.value + 1;
      l.value = !0, o.value = I;
    }, S = async () => {
      o.value = 0;
    }, b = async () => {
      o.value = n.tabTitles.length - 1;
    }, _ = H({ "--tabs-height": "100px" }), T = () => {
      var I;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const C = p.value.offsetHeight, y = (I = d.value) == null ? void 0 : I.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!y || !y.offsetHeight)
        return;
      const v = y.offsetHeight;
      _.value["--tabs-height"] = `${C + v}px`;
    }, L = H(null);
    return be(() => {
      var I;
      window.ResizeObserver && (L.value = new window.ResizeObserver(() => {
        T();
      })), (I = d.value) == null || I.querySelectorAll(".fr-tabs__panel").forEach((C) => {
        var y;
        C && ((y = L.value) == null || y.observe(C));
      });
    }), Te(() => {
      var I;
      (I = d.value) == null || I.querySelectorAll(".fr-tabs__panel").forEach((C) => {
        var y;
        C && ((y = L.value) == null || y.unobserve(C));
      });
    }), t({
      renderTabs: T,
      selectFirst: S,
      selectLast: b
    }), (I, C) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: xe(_.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": I.tabListName
      }, [
        $(I.$slots, "tab-items", {}, () => [
          (i(!0), f(z, null, U(I.tabTitles, (y, v) => (i(), j(Sn, {
            key: v,
            icon: y.icon,
            "panel-id": y.panelId || `${D(v)}-panel`,
            "tab-id": y.tabId || D(v),
            onClick: (x) => o.value = v,
            onNext: C[0] || (C[0] = (x) => k()),
            onPrevious: C[1] || (C[1] = (x) => M()),
            onFirst: C[2] || (C[2] = (x) => S()),
            onLast: C[3] || (C[3] = (x) => b())
          }, {
            default: X(() => [
              N(h(y.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, ip),
      (i(!0), f(z, null, U(I.tabContents, (y, v) => {
        var x, P, Q, E;
        return i(), j(An, {
          key: v,
          "panel-id": ((P = (x = I.tabTitles) == null ? void 0 : x[v]) == null ? void 0 : P.panelId) || `${D(v)}-panel`,
          "tab-id": ((E = (Q = I.tabTitles) == null ? void 0 : Q[v]) == null ? void 0 : E.tabId) || D(v)
        }, {
          default: X(() => [
            N(h(y), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      $(I.$slots, "default")
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
    return (u, d) => (i(), j(ge(n.value), Y({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: l.value,
        "fr-tag--icon-left": l.value
      }],
      disabled: u.disabled
    }, r.value), {
      default: X(() => [
        t.icon && !l.value ? (i(), j(pe, Y({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : g("", !0),
        u.iconOnly ? g("", !0) : (i(), f(z, { key: 1 }, [
          N(h(u.label), 1)
        ], 64)),
        $(u.$slots, "default", {}, void 0, !0)
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
      (i(!0), f(z, null, U(t.tags, ({ icon: n, label: r, ...l }, o) => (i(), f("li", { key: o }, [
        ee(la, Y({ ref_for: !0 }, l, {
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
        class: F(["fr-tile fr-enlarge-link", [{
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
            (i(), j(ge(r.titleTag), { class: "fr-tile__title" }, {
              default: X(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, h(r.title), 9, hp)) : g("", !0),
                n.value ? g("", !0) : (i(), j(o, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: X(() => [
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
              $(r.$slots, "start-details", {}, void 0, !0)
            ])) : g("", !0)
          ])
        ]),
        c("div", yp, [
          $(r.$slots, "header", {}, void 0, !0),
          r.imgSrc || r.svgPath ? (i(), f("div", kp, [
            r.imgSrc ? (i(), f("img", {
              key: 0,
              src: r.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, wp)) : (i(), f("svg", Y({
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
}), Vn = /* @__PURE__ */ ke(Tp, [["__scopeId", "data-v-f4d836a2"]]), Ip = { class: "fr-grid-row fr-grid-row--gutters" }, Ep = /* @__PURE__ */ O({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ip, [
      (i(!0), f(z, null, U(t.tiles, (n, r) => (i(), f("div", {
        key: r,
        class: F({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        ee(Vn, Y({
          horizontal: t.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Mp = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Cp = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Pp = ["id"], Lp = /* @__PURE__ */ O({
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
      class: F(["fr-toggle", {
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
      }, h(n.label), 9, Cp),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, h(n.hint), 9, Pp)) : g("", !0)
    ], 2));
  }
}), Bp = ["id"], $p = /* @__PURE__ */ O({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => re("tooltip") }
  },
  setup(a) {
    const t = a, e = H(!1), n = H(null), r = H(null), l = H("0px"), o = H("0px"), s = H("0px"), u = H(!1), d = H(0);
    async function p() {
      var T, L, I, C, y, v;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((te) => setTimeout(te, 100));
      const x = (T = n.value) == null ? void 0 : T.getBoundingClientRect().top, P = (L = n.value) == null ? void 0 : L.offsetHeight, Q = (I = n.value) == null ? void 0 : I.offsetWidth, E = (C = n.value) == null ? void 0 : C.getBoundingClientRect().left, A = (y = r.value) == null ? void 0 : y.offsetHeight, B = (v = r.value) == null ? void 0 : v.offsetWidth, q = !(x - A < 0) && x + P + A >= document.documentElement.offsetHeight;
      u.value = q;
      const K = E + Q >= document.documentElement.offsetWidth, ne = E + Q / 2 - B / 2 <= 0;
      o.value = q ? `${x - A + 8}px` : `${x + P - 8}px`, d.value = 1, l.value = K ? `${E + Q - B - 4}px` : ne ? `${E + 4}px` : `${E + Q / 2 - B / 2}px`, s.value = K ? `${B / 2 - Q / 2 + 4}px` : ne ? `${-(B / 2) + Q / 2 - 4}px` : "0px";
    }
    me(e, p, { immediate: !0 }), be(() => {
      window.addEventListener("scroll", p);
    }), Te(() => {
      window.removeEventListener("scroll", p);
    });
    const m = w(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), D = w(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), M = (T) => {
      var L, I;
      e.value && (T.target === n.value || (L = n.value) != null && L.contains(T.target) || T.target === r.value || (I = r.value) != null && I.contains(T.target) || (e.value = !1));
    }, k = (T) => {
      T.key === "Escape" && (e.value = !1);
    };
    be(() => {
      document.documentElement.addEventListener("click", M), document.documentElement.addEventListener("keydown", k);
    }), Te(() => {
      document.documentElement.removeEventListener("click", M), document.documentElement.removeEventListener("keydown", k);
    });
    const S = () => {
      t.onHover && (e.value = !0);
    }, b = () => {
      t.onHover && (e.value = !1);
    }, _ = () => {
      t.onHover || (e.value = !e.value);
    };
    return (T, L) => (i(), f(z, null, [
      (i(), j(ge(T.onHover ? "a" : "button"), Y(T.$attrs, {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: n,
        class: T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: L[0] || (L[0] = J((I) => _(), ["stop"])),
        onMouseenter: L[1] || (L[1] = (I) => S()),
        onMouseleave: L[2] || (L[2] = (I) => b()),
        onFocus: L[3] || (L[3] = (I) => S()),
        onBlur: L[4] || (L[4] = (I) => b())
      }), {
        default: X(() => [
          $(T.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: T.id,
        ref_key: "tooltip",
        ref: r,
        class: F(["fr-tooltip fr-placement", D.value]),
        style: xe(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, h(T.content), 15, Bp)
    ], 64));
  }
}), Ap = /* @__PURE__ */ ke($p, [["__scopeId", "data-v-d1e31d94"]]), Sp = { class: "fr-transcription" }, Op = ["aria-expanded", "aria-controls"], Rp = ["id"], Fp = ["id", "aria-labelledby"], Np = { class: "fr-container fr-container--fluid fr-container-md" }, Vp = { class: "fr-grid-row fr-grid-row--center" }, jp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, qp = { class: "fr-modal__body" }, Hp = { class: "fr-modal__header" }, Wp = ["aria-controls"], Yp = { class: "fr-modal__content" }, Qp = ["id"], Kp = { class: "fr-transcription__footer" }, zp = { class: "fr-transcription__actions-group" }, Gp = ["aria-controls"], jn = /* @__PURE__ */ O({
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
    } = $e(), s = H(!1), u = H(!1), d = w(() => `fr-transcription__modal-${t.id}`), p = w(() => `fr-transcription__collapse-${t.id}`);
    return me(u, (m, D) => {
      m !== D && l(m);
    }), (m, D) => (i(), f("div", Sp, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: D[0] || (D[0] = (M) => u.value = !u.value)
      }, " Transcription ", 8, Op),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: e,
        class: F(["fr-collapse", { "fr-collapse--expanded": R(r), "fr-collapsing": R(n) }]),
        onTransitionend: D[2] || (D[2] = (M) => R(o)(u.value))
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
                    }, h(m.title), 9, Qp),
                    N(" " + h(m.content), 1)
                  ]),
                  c("div", Kp, [
                    c("div", zp, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: D[1] || (D[1] = (M) => s.value = !0)
                      }, " Agrandir ", 8, Gp)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, Fp)
      ], 42, Rp),
      (i(), j(ur, { to: "body" }, [
        ee(xn, {
          title: m.title,
          opened: s.value,
          onClose: D[3] || (D[3] = (M) => s.value = !1)
        }, {
          default: X(() => [
            $(m.$slots, "default", {}, () => [
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
    return (t, e) => (i(), f(z, null, [
      c("figure", {
        class: F(["fr-content-media", {
          "fr-content-media--sm": t.size === "small",
          "fr-content-media--lg": t.size === "large"
        }])
      }, [
        c("div", {
          class: F(["fr-responsive-vid", `fr-ratio-${t.ratio}`])
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
  var p, m, D, M;
  const e = he(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((m = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((M = (D = r.locale) == null ? void 0 : D.options) == null ? void 0 : M.firstWeekContainsDate) ?? 1, o = ye((t == null ? void 0 : t.in) || a, 0);
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
  var p, m, D, M;
  const n = ze(), r = n.locale ?? Yn, l = n.firstWeekContainsDate ?? ((m = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, o = n.weekStartsOn ?? ((M = (D = n.locale) == null ? void 0 : D.options) == null ? void 0 : M.weekStartsOn) ?? 0, s = he(a, e == null ? void 0 : e.in);
  if (!dm(s))
    throw new RangeError("Invalid time value");
  let u = t.match(Zm).map((k) => {
    const S = k[0];
    if (S === "p" || S === "P") {
      const b = Wt[S];
      return b(k, r.formatLong);
    }
    return k;
  }).join("").match(Um).map((k) => {
    if (k === "''")
      return { isToken: !1, value: "'" };
    const S = k[0];
    if (S === "'")
      return { isToken: !1, value: ah(k) };
    if (Fa[S])
      return { isToken: !0, value: k };
    if (S.match(th))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + S + "`"
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
    const S = k.value;
    (Xn(S) || Gn(S)) && Yt(S, t, String(a));
    const b = Fa[S[0]];
    return b(s, S, r.localize, d);
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
    V(this, "subPriority", 0);
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
    V(this, "priority", sh);
    V(this, "subPriority", -1);
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
    V(this, "priority", 130);
    V(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
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
class vh extends le {
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
class gh extends le {
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
class bh extends le {
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
  const n = he(a, e == null ? void 0 : e.in), r = Kn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), he(n, e == null ? void 0 : e.in);
}
class kh extends le {
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
    return er(r) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
  }
  set(e, n, r) {
    return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
  }
}
function ia(a, t, e) {
  var m, D, M, k;
  const n = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((D = (m = e == null ? void 0 : e.locale) == null ? void 0 : m.options) == null ? void 0 : D.weekStartsOn) ?? n.weekStartsOn ?? ((k = (M = n.locale) == null ? void 0 : M.options) == null ? void 0 : k.weekStartsOn) ?? 0, l = he(a, e == null ? void 0 : e.in), o = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - r, p = t < 0 || t > 6 ? t - (o + d) % 7 : (u + d) % 7 - (o + d) % 7;
  return Hn(l, p, e);
}
class Eh extends le {
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
class Mh extends le {
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
class Ch extends le {
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
  const n = he(a, e == null ? void 0 : e.in), r = rh(n, e), l = t - r;
  return Hn(n, l, e);
}
class Lh extends le {
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
class Bh extends le {
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
class $h extends le {
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
class Ah extends le {
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
class Sh extends le {
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
class Oh extends le {
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
class Rh extends le {
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
class Fh extends le {
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
class Nh extends le {
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
class Vh extends le {
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
class jh extends le {
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
class qh extends le {
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
      e.getTime() - gt(e) - r
    );
  }
}
class Hh extends le {
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
      e.getTime() - gt(e) - r
    );
  }
}
class Wh extends le {
  constructor() {
    super(...arguments);
    V(this, "priority", 40);
    V(this, "incompatibleTokens", "*");
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
    V(this, "priority", 20);
    V(this, "incompatibleTokens", "*");
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
  var b, _, T, L;
  const r = () => ye(e, NaN), l = nh(), o = l.locale ?? Yn, s = l.firstWeekContainsDate ?? ((_ = (b = l.locale) == null ? void 0 : b.options) == null ? void 0 : _.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((L = (T = l.locale) == null ? void 0 : T.options) == null ? void 0 : L.weekStartsOn) ?? 0;
  if (!t)
    return a ? r() : he(e, n == null ? void 0 : n.in);
  const d = {
    firstWeekContainsDate: s,
    weekStartsOn: u,
    locale: o
  }, p = [new uh(n == null ? void 0 : n.in, e)], m = t.match(zh).map((I) => {
    const C = I[0];
    if (C in Wt) {
      const y = Wt[C];
      return y(I, o.formatLong);
    }
    return I;
  }).join("").match(Kh), D = [];
  for (let I of m) {
    Xn(I) && Yt(I, t, a), Gn(I) && Yt(I, t, a);
    const C = I[0], y = Qh[C];
    if (y) {
      const { incompatibleTokens: v } = y;
      if (Array.isArray(v)) {
        const P = D.find(
          (Q) => v.includes(Q.token) || Q.token === C
        );
        if (P)
          throw new RangeError(
            `The format string mustn't contain \`${P.fullToken}\` and \`${I}\` at the same time`
          );
      } else if (y.incompatibleTokens === "*" && D.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${I}\` and any other token at the same time`
        );
      D.push({ token: C, fullToken: I });
      const x = y.run(
        a,
        I,
        o.match,
        d
      );
      if (!x)
        return r();
      p.push(x.setter), a = x.rest;
    } else {
      if (C.match(Zh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + C + "`"
        );
      if (I === "''" ? I = "'" : C === "'" && (I = Jh(I)), a.indexOf(I) === 0)
        a = a.slice(I.length);
      else
        return r();
    }
  }
  if (a.length > 0 && Uh.test(a))
    return r();
  const M = p.map((I) => I.priority).sort((I, C) => C - I).filter((I, C, y) => y.indexOf(I) === C).map(
    (I) => p.filter((C) => C.priority === I).sort((C, y) => y.subPriority - C.subPriority)
  ).map((I) => I[0]);
  let k = he(e, n == null ? void 0 : n.in);
  if (isNaN(+k)) return r();
  const S = {};
  for (const I of M) {
    if (!I.validate(k, d))
      return r();
    const C = I.set(k, S, d);
    Array.isArray(C) ? (k = C[0], Object.assign(S, C[1])) : k = C;
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
      "aria-current": R(e) ? "page" : void 0
    }, [
      $(n.$slots, "default")
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
        l.facetMultipleByCode(p) ? g("", !0) : (i(!0), f(z, { key: 0 }, U(d, (m) => (i(), j(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (D) => a.$emit("toogle-facet", p, m, e.contextKey)
        }, {
          default: X(() => [
            N(h(l.facetLabelByCode(p)) + ": " + h(l.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : g("", !0),
    (i(!0), f(z, null, U(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(z, { key: 0 }, [
        c("h6", uv, h(d.label), 1),
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
                      N(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", pv, h(p.count), 1)
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
                    N(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", vv, h(p.count), 1)
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
                      N(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", kv, h(p.count), 1)
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
                    N(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", xv, h(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", Dv, [
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), j(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: X(() => [
              N(h(a.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : g("", !0),
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), j(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: X(() => [
              N(h(a.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : g("", !0)
        ])
      ], 64)) : g("", !0)
    ]))), 128))
  ]);
}
const Iv = /* @__PURE__ */ Ae(sv, [["render", Tv], ["__scopeId", "data-v-0be4e596"]]), ua = () => {
  const a = H(), t = H(!1), e = H(!1), n = () => {
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
}, Pv = /* @__PURE__ */ O({
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
    } = ua(), s = a, u = H(null), d = H(!1);
    let p = H(0), m = [];
    Oe("menuItem", { menuItemIndex: p, addMenuItem: (v, x) => {
      p.value += 1, m.push(`${v}@${x}`);
    } }), Oe("id", s.id), me(d, (v, x) => {
      v !== x && (l(v), v ? (setTimeout(() => S(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    });
    const M = (v, x) => {
      const P = x === "down" ? (v + 1) % m.length : (v - 1 + m.length) % m.length, Q = document.getElementById(`${s.id}_item_${P}`);
      return Q.ariaDisabled === "true" ? M(P, x) : Q;
    }, k = (v) => {
      const x = document.activeElement.id, P = x.startsWith(`${s.id}_item_`) ? Number(x.split("_")[2]) : v === "down" ? -1 : 0;
      M(P, v).focus();
    }, S = (v) => k("down"), b = (v) => k("up");
    let _ = (v) => {
      let x = v.key;
      if (x.length > 1 && x.match(/\S/))
        return;
      x = x.toLowerCase();
      let P = m.filter((E) => E.toLowerCase().startsWith(x)), Q = document.activeElement.id;
      for (let E of P) {
        let A = E.split("@")[1], B = document.getElementById(`${s.id}_item_${A}`);
        if (Q !== B.id) {
          B.focus();
          break;
        }
      }
    }, T = (v) => {
      u.value.contains(v.target) || (d.value = !1);
    };
    function L() {
      d.value = !1;
    }
    const I = w(() => ["sm", "small"].includes(s.size)), C = w(() => ["md", "medium"].includes(s.size)), y = w(() => ["lg", "large"].includes(s.size));
    return t({ closeMenu: L }), (v, x) => (i(), f("div", {
      class: "relative-position",
      onKeydown: x[9] || (x[9] = Z(
        //@ts-ignore
        (...P) => R(T) && R(T)(...P),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", Y({
        id: v.id,
        onClick: x[0] || (x[0] = J((P) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          x[1] || (x[1] = Z(J((P) => d.value = !1, ["stop"]), ["esc"])),
          x[2] || (x[2] = Z(J((P) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Z(J(S, ["prevent"]), ["down"]),
          Z(J(b, ["prevent"]), ["up"]),
          x[3] || (x[3] = //@ts-ignore
          (...P) => R(_) && R(_)(...P)),
          x[4] || (x[4] = Z((P) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          "fr-btn--secondary": v.secondary,
          "fr-btn--tertiary": v.tertiary,
          "fr-btn--sm": I.value,
          "fr-btn--md": C.value,
          "fr-btn--lg": y.value
        }],
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": v.disabled,
        "aria-controls": `${v.id}_menu`,
        "aria-expanded": d.value
      }, v.$attrs), [
        v.icon !== "" ? (i(), j(R(pe), {
          key: 0,
          class: "fr-mr-2v",
          name: v.icon
        }, null, 8, ["name"])) : g("", !0),
        c("span", null, h(v.label), 1)
      ], 16, Ev),
      c("div", {
        id: `${v.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: F(["fr-collapse fr-menu", { "fr-collapse--expanded": R(r), "fr-collapsing": R(n) }]),
        role: "menu",
        "aria-labelledby": v.id,
        onKeyup: x[5] || (x[5] = Z((P) => d.value = !1, ["esc"])),
        onKeydown: [
          x[6] || (x[6] = Z((P) => d.value = !1, ["tab"])),
          Z(J(S, ["prevent"]), ["down"]),
          Z(J(b, ["prevent"]), ["up"]),
          x[7] || (x[7] = //@ts-ignore
          (...P) => R(_) && R(_)(...P))
        ],
        onTransitionend: x[8] || (x[8] = (P) => R(o)(d.value))
      }, [
        c("ul", Cv, [
          $(v.$slots, "default", {}, void 0, !0)
        ])
      ], 42, Mv)
    ], 544));
  }
}), Lv = /* @__PURE__ */ Ae(Pv, [["__scopeId", "data-v-2b649ce2"]]), Bv = { role: "none" }, $v = ["id", "href"], Av = /* @__PURE__ */ O({
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
        u.url === "" ? (i(), j(p, Y({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${R(o)}_item_${R(s)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", Y({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${R(o)}_item_${R(s)}`,
          href: u.url,
          class: l
        }, u.$attrs), [
          r.value ? g("", !0) : (i(), j(m, {
            key: 0,
            name: u.icon
          }, null, 8, ["name"])),
          N(" " + h(u.label), 1)
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
}, zv = ["aria-selected"], Gv = ["id", "data-id", "value"], Xv = ["for"], Uv = ["id"], Zv = /* @__PURE__ */ O({
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
    } = ua(), o = a, s = H(!1), u = we(a, "modelValue"), d = H(o.options);
    me(s, (B, q) => {
      B !== q && (r(B), B ? (document.addEventListener("click", A), document.addEventListener("touchstart", A)) : (document.removeEventListener("click", A), document.removeEventListener("touchstart", A)));
    });
    const p = H(null), m = H(null), D = H(null), M = w(() => o.errorMessage || o.successMessage), k = w(() => o.errorMessage !== "" ? "error" : "valid"), S = w(() => o.modelValue.length === d.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), b = w(() => o.modelValue.length === d.value.length ? "Tout déselectionner" : "Tout sélectionner"), _ = w(() => {
      let q = `${o.options.filter((K) => o.modelValue.includes(K.value)).length} options séléctionnées`;
      return o.modelValue.length > 2 ? q : o.options.filter((K) => o.modelValue.includes(K.value)).map((K) => K.text).join(", ");
    });
    let T = function() {
      if (o.modelValue.length >= d.value.length)
        o.modelValue.length = 0;
      else {
        const B = d.value.filter((q) => !o.modelValue.includes(q.value));
        for (let q of B)
          o.modelValue.push(q.value);
      }
    }, L = function(B) {
      const q = B.target.value.toLowerCase();
      d.value = o.options.filter((K) => K.text.toLowerCase().indexOf(q) > -1);
    };
    const I = (B, q) => {
      const K = q === "down" ? (B + 1) % d.value.length : (B - 1 + d.value.length) % d.value.length, ne = document.getElementById(`${o.id}_option_${K}`);
      return ne.ariaDisabled === "true" ? I(K, q) : ne;
    }, C = (B) => {
      const q = document.activeElement.id, K = q.startsWith(`${o.id}_option_`) ? Number(q.split("_")[2]) : B === "down" ? -1 : 0;
      I(K, B).focus();
    }, y = (B) => C("down"), v = (B) => C("up");
    let x = function(B) {
      B.shiftKey || (o.comboHasButton ? s.value || (s.value = !0, B.preventDefault(), setTimeout(() => m.value.focus(), 100)) : o.comboHasFilter && (s.value || (s.value = !0, B.preventDefault(), setTimeout(() => D.value.focus(), 100))));
    }, P = function(B) {
      B.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.id}_button` || o.comboHasFilter && document.activeElement.id === `${o.id}_filter`) && (B.preventDefault(), s.value = !1), !o.comboHasFilter && !o.comboHasButton && (s.value = !1));
    }, Q = function(B) {
      document.activeElement.id.startsWith(`${o.id}_option_`) && (o.comboHasFilter ? (B.preventDefault(), D.value.focus()) : o.comboHasButton && m.value.focus());
    }, E = (B) => {
      let q = B.key;
      if (q.length > 1 && q.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      q = q.toLowerCase();
      let K = d.value.filter((te) => te.text.toLowerCase().startsWith(q)), ne = document.activeElement.id;
      for (let te of K) {
        let ie = document.querySelector(`[data-id='${te.value}']`);
        if (ne !== ie.id) {
          ie.focus();
          break;
        }
      }
    }, A = (B) => {
      p.value.contains(B.target) || (s.value = !1);
    };
    return (B, q) => (i(), f(z, null, [
      c("div", Y({
        ref_key: "container",
        ref: p,
        class: ["fr-select-group", { [`fr-select-group--${k.value}`]: M.value !== "" }],
        onKeyup: q[13] || (q[13] = Z(
          //@ts-ignore
          (...K) => R(A) && R(A)(...K),
          ["tab"]
        ))
      }, B.$attrs), [
        c("label", {
          class: "fr-label",
          for: B.id,
          id: `${B.id}_label`
        }, [
          $(B.$slots, "label", {}, () => [
            N(h(B.label) + " ", 1),
            $(B.$slots, "required-tip", {}, () => [
              B.required ? (i(), f("span", Rv, " *")) : g("", !0)
            ], !0)
          ], !0),
          B.description ? (i(), f("span", Fv, h(B.description), 1)) : g("", !0)
        ], 8, Ov),
        c("div", {
          id: B.id,
          class: F([{ [`fr-select--${k.value}`]: M.value !== "" }, "fr-input"]),
          onClick: q[0] || (q[0] = (K) => s.value = !s.value),
          onKeydown: [
            q[1] || (q[1] = Z(J((K) => s.value = !1, ["stop"]), ["esc"])),
            q[2] || (q[2] = Z(J((K) => s.value = !s.value, ["prevent"]), ["space"])),
            Z(J(y, ["prevent"]), ["down"]),
            Z(J(v, ["prevent"]), ["up"]),
            q[3] || (q[3] = Z(
              //@ts-ignore
              (...K) => R(x) && R(x)(...K),
              ["tab"]
            )),
            q[4] || (q[4] = //@ts-ignore
            (...K) => R(E) && R(E)(...K))
          ],
          tabindex: "0",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-autocomplete": "none",
          "aria-labelledby": `${B.id}_label`,
          "aria-disabled": B.disabled,
          "aria-controls": `${B.id}_list`,
          "aria-expanded": s.value,
          "aria-required": B.required
        }, [
          c("p", null, h(_.value), 1)
        ], 42, Nv),
        c("div", {
          id: `${B.id}_list`,
          ref_key: "collapse",
          ref: t,
          class: F(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": R(n), "fr-collapsing": R(e) }]),
          onKeyup: q[8] || (q[8] = Z((K) => s.value = !1, ["esc"])),
          onKeydown: [
            q[9] || (q[9] = Z(
              //@ts-ignore
              (...K) => R(P) && R(P)(...K),
              ["tab"]
            )),
            Z(J(y, ["prevent"]), ["down"]),
            Z(J(v, ["prevent"]), ["up"]),
            q[10] || (q[10] = Z(J(
              //@ts-ignore
              (...K) => R(Q) && R(Q)(...K),
              ["shift"]
            ), ["tab"])),
            q[11] || (q[11] = //@ts-ignore
            (...K) => R(E) && R(E)(...K))
          ],
          onTransitionend: q[12] || (q[12] = (K) => R(l)(s.value))
        }, [
          B.comboHasButton ? (i(), f("ul", jv, [
            c("li", null, [
              c("button", {
                class: F(["fr-btn fr-btn--tertiary", `${S.value}`]),
                id: `${B.id}_button`,
                onClick: q[5] || (q[5] = (K) => R(T)()),
                ref_key: "button",
                ref: m,
                type: "button"
              }, h(b.value), 11, qv)
            ])
          ])) : g("", !0),
          B.comboHasFilter ? (i(), f("div", Hv, [
            c("input", {
              class: "fr-input",
              id: `${B.id}_filter`,
              ref_key: "filter",
              ref: D,
              onInput: q[6] || (q[6] = //@ts-ignore
              (...K) => R(L) && R(L)(...K)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, Wv)
          ])) : g("", !0),
          B.comboLabel ? (i(), f("p", Yv, [
            N(h(B.comboLabel) + " ", 1),
            B.comboDescription ? (i(), f("span", Qv, h(B.comboDescription), 1)) : g("", !0)
          ])) : g("", !0),
          c("ul", Kv, [
            (i(!0), f(z, null, U(d.value, (K, ne) => (i(), f("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": u.value.includes(K.value)
            }, [
              Be(c("input", {
                id: `${B.id}_option_${ne}`,
                "data-id": K.value,
                type: "checkbox",
                class: "",
                tabindex: "-1",
                value: K.value,
                "onUpdate:modelValue": q[7] || (q[7] = (te) => u.value = te)
              }, null, 8, Gv), [
                [lt, u.value]
              ]),
              c("label", {
                class: "fr-label",
                for: `${B.id}_option_${ne}`
              }, h(K.text), 9, Xv)
            ], 8, zv))), 256))
          ])
        ], 42, Vv)
      ], 16),
      M.value ? (i(), f("p", {
        key: 0,
        id: `select-${k.value}-desc-${k.value}`,
        class: F(`fr-${k.value}-text`)
      }, h(M.value), 11, Uv)) : g("", !0)
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
}, og = ["id", "href"], sg = /* @__PURE__ */ O({
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
    } = ua(), o = a, s = H(null), u = H(!1);
    let d = H(0), p = [];
    const m = (T, L) => {
      d.value += 1, p.push(`${T}@${L}`);
    };
    Oe("menuItem", { menuItemIndex: d, addMenuItem: m }), Oe("id", o.id), me(u, (T, L) => {
      T !== L && (r(T), T ? (setTimeout(() => k(), 100), document.addEventListener("click", _), document.addEventListener("touchstart", _)) : (document.removeEventListener("click", _), document.removeEventListener("touchstart", _)));
    }), be(() => {
      m(o.logoutLabel, d.value);
    });
    const D = (T, L) => {
      const I = L === "down" ? (T + 1) % p.length : (T - 1 + p.length) % p.length, C = document.getElementById(`${o.id}_item_${I}`);
      return C.ariaDisabled === "true" ? D(I, L) : C;
    }, M = (T) => {
      const L = document.activeElement.id, I = L.startsWith(`${o.id}_item_`) ? Number(L.split("_")[2]) : T === "down" ? -1 : 0;
      D(I, T).focus();
    }, k = (T) => M("down"), S = (T) => M("up");
    let b = (T) => {
      let L = T.key;
      if (L.length > 1 && L.match(/\S/))
        return;
      L = L.toLowerCase();
      let I = p.filter((y) => y.toLowerCase().startsWith(L)), C = document.activeElement.id;
      for (let y of I) {
        let v = y.split("@")[1], x = document.getElementById(`${o.id}_item_${v}`);
        if (C !== x.id) {
          x.focus();
          break;
        }
      }
    }, _ = (T) => {
      s.value.contains(T.target) || (u.value = !1);
    };
    return (T, L) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: L[9] || (L[9] = Z(
        //@ts-ignore
        (...I) => R(_) && R(_)(...I),
        ["tab"]
      )),
      ref_key: "container",
      ref: s
    }, [
      c("button", Y({
        id: T.id,
        onClick: L[0] || (L[0] = J((I) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          L[1] || (L[1] = Z(J((I) => u.value = !1, ["stop"]), ["esc"])),
          L[2] || (L[2] = Z(J((I) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Z(J(k, ["prevent"]), ["down"]),
          Z(J(S, ["prevent"]), ["up"]),
          L[3] || (L[3] = //@ts-ignore
          (...I) => R(b) && R(b)(...I)),
          L[4] || (L[4] = Z((I) => u.value = !1, ["tab"]))
        ],
        class: "fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm",
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": T.disabled,
        "aria-controls": `${T.id}_menu`,
        "aria-expanded": u.value
      }, T.$attrs), [
        T.icon !== "" ? (i(), j(R(pe), {
          key: 0,
          class: "fr-mr-2v",
          name: T.icon
        }, null, 8, ["name"])) : g("", !0),
        c("span", null, h(T.label), 1)
      ], 16, eg),
      c("div", {
        id: `${T.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: F(["fr-collapse fr-menu fr-menu-header__modal fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": R(n), "fr-collapsing": R(e) }]),
        role: "menu",
        "aria-labelledby": T.id,
        onKeyup: L[5] || (L[5] = Z((I) => u.value = !1, ["esc"])),
        onKeydown: [
          L[6] || (L[6] = Z((I) => u.value = !1, ["tab"])),
          Z(J(k, ["prevent"]), ["down"]),
          Z(J(S, ["prevent"]), ["up"]),
          L[7] || (L[7] = //@ts-ignore
          (...I) => R(b) && R(b)(...I))
        ],
        onTransitionend: L[8] || (L[8] = (I) => R(l)(u.value))
      }, [
        $(T.$slots, "detail", {}, () => [
          T.nom === "" && T.email === "" ? g("", !0) : (i(), f("p", ag, [
            N(h(T.nom) + " ", 1),
            T.email !== "" ? (i(), f("span", ng, h(T.email), 1)) : g("", !0)
          ]))
        ], !0),
        c("ul", rg, [
          $(T.$slots, "default", {}, void 0, !0),
          c("li", lg, [
            T.logoutUrl !== "" ? (i(), f("a", {
              key: 0,
              id: `${T.id}_item_${R(d) - 1}`,
              class: "fr-btn w-full fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
              role: "menuitem",
              tabindex: "-1",
              href: T.logoutUrl
            }, h(T.logoutLabel), 9, og)) : g("", !0)
          ])
        ])
      ], 42, tg)
    ], 544));
  }
}), ig = /* @__PURE__ */ Ae(sg, [["__scopeId", "data-v-2c51eb4a"]]), ug = Symbol("header"), dg = ["aria-label"], cg = { class: "fr-btns-group" }, Qt = /* @__PURE__ */ O({
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
          ee(R(ra), Y({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        $(n.$slots, "default")
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
}, Fg = /* @__PURE__ */ O({
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
    const e = a, n = t, r = ot(e, "languageSelector"), l = H(!1), o = H(!1), s = H(!1), u = () => {
      var b;
      s.value = !1, l.value = !1, o.value = !1, (b = document.getElementById("button-menu")) == null || b.focus();
    }, d = (b) => {
      b.key === "Escape" && u();
    };
    be(() => {
      document.addEventListener("keydown", d), n("on-mounted");
    }), Te(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var b;
      s.value = !0, l.value = !0, o.value = !1, (b = document.getElementById("close-button")) == null || b.focus();
    }, m = () => {
      s.value = !0, l.value = !1, o.value = !0;
    }, D = u, M = Kt(), k = w(() => {
      var b;
      return !!((b = M.operator) != null && b.call(M).length) || !!e.operatorImgSrc;
    }), S = w(() => !!M.mainnav);
    return Oe(ug, () => u), (b, _) => {
      var L, I, C;
      const T = _e("RouterLink");
      return i(), f("header", fg, [
        c("div", pg, [
          c("div", mg, [
            c("div", hg, [
              c("div", vg, [
                c("div", gg, [
                  c("div", bg, [
                    ee(T, {
                      to: b.homeTo,
                      title: `${b.homeLabel} - ${b.serviceTitle}`
                    }, {
                      default: X(() => [
                        ee(R(at), {
                          "logo-text": b.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  k.value ? (i(), f("div", yg, [
                    $(b.$slots, "operator", {}, () => [
                      b.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: b.operatorImgSrc,
                        alt: b.operatorImgAlt,
                        style: xe(b.operatorImgStyle)
                      }, null, 12, kg)) : g("", !0)
                    ])
                  ])) : g("", !0),
                  b.showSearch || S.value || (L = b.quickLinks) != null && L.length ? (i(), f("div", wg, [
                    b.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": b.showSearchLabel,
                      title: b.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: _[0] || (_[0] = J((y) => m(), ["prevent", "stop"]))
                    }, null, 8, _g)) : g("", !0),
                    S.value || (I = b.quickLinks) != null && I.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": b.menuLabel,
                      title: b.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: _[1] || (_[1] = J((y) => p(), ["prevent", "stop"]))
                    }, null, 8, xg)) : g("", !0)
                  ])) : g("", !0)
                ]),
                b.serviceTitle ? (i(), f("div", Dg, [
                  ee(T, Y({
                    to: b.homeTo,
                    title: `${b.homeLabel} - ${b.serviceTitle}`
                  }, b.$attrs), {
                    default: X(() => [
                      c("p", Tg, [
                        N(h(b.serviceTitle) + " ", 1),
                        b.showBeta ? (i(), f("span", Ig, " BETA ")) : g("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  b.serviceDescription ? (i(), f("p", Eg, h(b.serviceDescription), 1)) : g("", !0)
                ])) : g("", !0),
                !b.serviceTitle && b.showBeta ? (i(), f("div", Mg, _[9] || (_[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : g("", !0)
              ]),
              c("div", Cg, [
                (C = b.quickLinks) != null && C.length || r.value ? (i(), f("div", Pg, [
                  l.value ? g("", !0) : (i(), j(Qt, {
                    key: 0,
                    links: b.quickLinks,
                    "nav-aria-label": b.quickLinksAriaLabel
                  }, {
                    default: X(() => [
                      $(b.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), j(R(nt), Y({ key: 1 }, r.value, {
                    onSelect: _[2] || (_[2] = (y) => n("language-select", y))
                  }), null, 16)) : g("", !0)
                ])) : g("", !0),
                c("div", Lg, [
                  $(b.$slots, "header-search"),
                  b.showSearch ? (i(), j(R(rt), {
                    key: 0,
                    "searchbar-id": b.searchbarId,
                    label: b.searchLabel,
                    "model-value": b.modelValue,
                    placeholder: b.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": _[3] || (_[3] = (y) => n("update:modelValue", y)),
                    onSearch: _[4] || (_[4] = (y) => n("search", y))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : g("", !0)
                ])
              ])
            ]),
            b.showSearch || S.value || b.quickLinks && b.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: F(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": b.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", $g, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: _[5] || (_[5] = J((y) => u(), ["prevent", "stop"]))
                }, h(b.closeMenuModalLabel), 1),
                c("div", Ag, [
                  r.value ? (i(), j(R(nt), Y({ key: 0 }, r.value, {
                    onSelect: _[6] || (_[6] = (y) => r.value.currentLanguage = y.codeIso)
                  }), null, 16)) : g("", !0),
                  l.value ? (i(), j(Qt, {
                    key: 1,
                    role: "navigation",
                    links: b.quickLinks,
                    "nav-aria-label": b.quickLinksAriaLabel,
                    onLinkClick: R(D)
                  }, {
                    default: X(() => [
                      $(b.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : g("", !0),
                  $(b.$slots, "header-search")
                ]),
                s.value ? $(b.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : g("", !0),
                o.value ? (i(), f("div", Sg, [
                  ee(R(rt), {
                    "searchbar-id": b.searchbarId,
                    "model-value": b.modelValue,
                    placeholder: b.placeholder,
                    "onUpdate:modelValue": _[7] || (_[7] = (y) => n("update:modelValue", y)),
                    onSearch: _[8] || (_[8] = (y) => n("search", y))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ], 10, Bg)) : g("", !0),
            $(b.$slots, "default")
          ])
        ]),
        c("div", Og, [
          S.value && !s.value ? (i(), f("div", Rg, [
            $(b.$slots, "mainnav", { hidemodal: u })
          ])) : g("", !0)
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
}, Jg = { class: "fr-checkbox-group fr-checkbox-group--sm" }, eb = ["id", "value"], tb = ["for"], ab = ["onKeydown"], nb = { key: 0 }, rb = ["colspan"], lb = { class: "flex gap-2 items-center" }, ob = ["selected"], sb = ["value", "selected"], ib = { class: "flex ml-1" }, ub = /* @__PURE__ */ O({
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
  emits: /* @__PURE__ */ Le(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: t }) {
    const e = a, n = t, r = we(a, "selection"), l = we(a, "rowsPerPage"), o = we(a, "currentPage"), s = w(() => Math.max(Math.ceil(e.rows.length / l.value), 1)), u = w(() => e.pages ?? Array.from({ length: s.value }).map((v, x) => ({
      label: `${x + 1}`,
      title: `Page ${x + 1}`,
      href: `#${x + 1}`
    }))), d = w(() => o.value * l.value), p = w(() => (o.value + 1) * l.value), m = w(() => ["sm", "small"].includes(e.footerSize));
    function D(v, x) {
      const P = M.value;
      return (v[P] ?? v) < (x[P] ?? x) ? -1 : (v[P] ?? v) > (x[P] ?? x) ? 1 : 0;
    }
    const M = we(a, "sortedBy");
    M.value = e.sorted;
    const k = we(a, "sortedDesc");
    function S(v) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(v))) {
        if (M.value === v) {
          if (k.value) {
            M.value = void 0, k.value = !1;
            return;
          }
          k.value = !0;
          return;
        }
        k.value = !1, M.value = v;
      }
    }
    const b = w(() => {
      const v = M.value ? e.rows.slice().sort(e.sortFn ?? D) : e.rows.slice();
      return k.value && v.reverse(), v;
    }), _ = w(() => {
      const v = e.headersRow.map((P) => typeof P != "object" ? P : P.key), x = b.value.map((P) => Array.isArray(P) ? P : v.map((Q) => P));
      return e.pagination ? x.slice(d.value, p.value) : x;
    });
    function T(v) {
      v && (r.value = _.value.map((x) => x[0][e.rowKey])), r.value.length = 0;
    }
    const L = H(!1);
    function I() {
      L.value = r.value.length === _.value.length;
    }
    function C() {
      n("update:current-page", 0), L.value = !1, r.value.length = 0;
    }
    function y(v) {
      navigator.clipboard.writeText(v);
    }
    return (v, x) => (i(), f("div", Ng, [
      c("div", Vg, [
        c("div", jg, [
          c("div", qg, [
            c("table", { id: v.id }, [
              c("caption", {
                class: F({ "sr-only": v.noCaption })
              }, h(v.title), 3),
              c("thead", null, [
                c("tr", null, [
                  v.selectableRows ? (i(), f("th", Wg, [
                    v.showToggleAll ? (i(), f("div", Yg, [
                      c("input", {
                        id: `table-select--${v.id}-all`,
                        checked: L.value,
                        type: "checkbox",
                        onInput: x[0] || (x[0] = (P) => T(P.target.checked))
                      }, null, 40, Qg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${v.id}-all`
                      }, " Sélectionner tout ", 8, Kg)
                    ])) : g("", !0)
                  ])) : g("", !0),
                  (i(!0), f(z, null, U(v.headersRow, (P, Q) => (i(), f("th", Y({
                    key: typeof P == "object" ? P.key : P,
                    scope: "col",
                    ref_for: !0
                  }, typeof P == "object" && P.headerAttrs, {
                    class: {
                      "text-right": P.align === "right",
                      "text-left": P.align === "left"
                    },
                    tabindex: v.sortableRows ? 0 : void 0,
                    onClick: (E) => S(P.key ?? (Array.isArray(v.rows[0]) ? Q : P)),
                    onKeydown: [
                      Z((E) => S(P.key ?? P), ["enter"]),
                      Z((E) => S(P.key ?? P), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: F({
                        "sortable-header": v.sortableRows === !0 || Array.isArray(v.sortableRows) && v.sortableRows.includes(P.key ?? P),
                        "fr-sr-only": typeof P == "object" ? P.hideLabel : !1,
                        "flex-row-reverse": typeof P == "object" ? P.align === "right" : !1
                      })
                    }, [
                      $(v.$slots, "header", Y({ ref_for: !0 }, typeof P == "object" ? P : { key: P, label: P }), () => [
                        N(h(typeof P == "object" ? P.label : P), 1)
                      ], !0),
                      M.value !== (P.key ?? P) && (v.sortableRows === !0 || Array.isArray(v.sortableRows) && v.sortableRows.includes(P.key ?? P)) ? (i(), f("span", Gg, [
                        ee(R(pe), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : M.value === (P.key ?? P) ? (i(), f("span", Xg, [
                        ee(R(pe), {
                          name: k.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : g("", !0)
                    ], 2)
                  ], 16, zg))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, U(_.value, (P, Q) => (i(), f("tr", {
                  key: `row-${Q}`,
                  "data-row-key": Q + 1
                }, [
                  v.selectableRows ? (i(), f("th", Zg, [
                    c("div", Jg, [
                      Be(c("input", {
                        id: `row-select-${v.id}-${Q}`,
                        "onUpdate:modelValue": x[1] || (x[1] = (E) => r.value = E),
                        value: P[0][v.rowKey] ?? `row-${Q}`,
                        type: "checkbox",
                        onChange: x[2] || (x[2] = (E) => I())
                      }, null, 40, eb), [
                        [lt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${v.id}-${Q}`
                      }, " Sélectionner la ligne " + h(Q + 1), 9, tb)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(z, null, U(P, (E, A) => (i(), f("td", {
                    key: typeof E == "object" ? E[v.rowKey] : E,
                    class: F({
                      "text-right": v.headersRow[A].align === "right",
                      "text-left": v.headersRow[A].align === "left"
                    }),
                    onKeydown: [
                      Z(J((B) => y(typeof E == "object" ? E[v.rowKey] : E), ["ctrl"]), ["c"]),
                      Z(J((B) => y(typeof E == "object" ? E[v.rowKey] : E), ["meta"]), ["c"])
                    ]
                  }, [
                    $(v.$slots, "cell", Y({ ref_for: !0 }, {
                      colKey: typeof v.headersRow[A] == "object" ? v.headersRow[A].key : v.headersRow[A],
                      cell: E,
                      idx: Q + 1
                    }), () => [
                      N(h(typeof E == "object" ? E[v.rowKey] : E), 1)
                    ], !0)
                  ], 42, ab))), 128))
                ], 8, Ug))), 128)),
                _.value.length === 0 ? (i(), f("tr", nb, [
                  c("td", {
                    colspan: v.selectableRows ? v.headersRow.length + 1 : v.headersRow.length
                  }, h(e.noResultLabel), 9, rb)
                ])) : g("", !0)
              ])
            ], 8, Hg)
          ])
        ])
      ]),
      c("div", {
        class: F(v.bottomActionBarClass)
      }, [
        $(v.$slots, "pagination", {}, () => [
          v.pagination && !v.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: F(["flex justify-between items-center", v.paginationWrapperClass])
          }, [
            v.showNbRows ? (i(), f("p", {
              key: 0,
              class: F(["fr-mb-0 fr-ml-1v", { "fr-text--sm": m.value }])
            }, h(v.rows.length) + " résulat(s)", 3)) : g("", !0),
            c("div", lb, [
              c("label", {
                class: F(["fr-label", { "fr-text--sm": m.value }]),
                for: "pagination-options"
              }, " Résultats par page : ", 2),
              Be(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": x[3] || (x[3] = (P) => l.value = P),
                class: "fr-select",
                onChange: x[4] || (x[4] = (P) => C())
              }, [
                c("option", {
                  value: "",
                  selected: !v.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, ob),
                (i(!0), f(z, null, U(v.paginationOptions, (P, Q) => (i(), f("option", {
                  key: Q,
                  value: P,
                  selected: +P === l.value
                }, h(P), 9, sb))), 128))
              ], 544), [
                [zt, l.value]
              ])
            ]),
            c("div", ib, [
              c("span", {
                class: F(["self-center", { "fr-text--sm": m.value }])
              }, " Page " + h(o.value + 1) + " sur " + h(s.value), 3)
            ]),
            ee(R(na), {
              "current-page": o.value,
              "onUpdate:currentPage": x[5] || (x[5] = (P) => o.value = P),
              pages: u.value,
              "next-page-title": "Précédent",
              "prev-page-title": "Suivant"
            }, null, 8, ["current-page", "pages"])
          ], 2)) : g("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), db = /* @__PURE__ */ Ae(ub, [["__scopeId", "data-v-6060288d"]]), cb = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], fb = ["for"], pb = {
  key: 0,
  class: "required"
}, mb = {
  key: 0,
  class: "fr-hint-text"
}, hb = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, vb = /* @__PURE__ */ O({
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
      class: F(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: F(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Be(c("input", Y({
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
        }), null, 16, cb), [
          [lt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          $(l.$slots, "label", {}, () => [
            N(h(l.label) + " ", 1),
            $(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", pb, " *")) : g("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", mb, [
            $(l.$slots, "hint", {}, () => [
              N(h(l.hint), 1)
            ])
          ])) : g("", !0)
        ], 8, fb),
        e.value ? (i(), f("div", hb, [
          c("p", {
            class: F(["fr-message--info flex items-center", n.value])
          }, h(e.value), 3)
        ])) : g("", !0)
      ], 2)
    ], 2));
  }
}), gb = ["id"], bb = /* @__PURE__ */ O({
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
    const t = a, e = H(!1), n = H(null), r = H(null), l = H("0px"), o = H("0px"), s = H("0px"), u = H(!1), d = H(0);
    async function p() {
      var K, ne, te, ie, se, Ie;
      if (typeof document > "u" || !e.value || r.value.matches(":empty"))
        return;
      await new Promise((Ce) => setTimeout(Ce, 100));
      const C = (K = n.value) == null ? void 0 : K.getBoundingClientRect().top, y = (ne = n.value) == null ? void 0 : ne.offsetHeight, v = (te = n.value) == null ? void 0 : te.offsetWidth, x = (ie = n.value) == null ? void 0 : ie.getBoundingClientRect().left, P = (se = r.value) == null ? void 0 : se.offsetHeight, Q = (Ie = r.value) == null ? void 0 : Ie.offsetWidth, A = !(C - P < 0) && C + y + P >= document.documentElement.offsetHeight;
      u.value = A;
      const B = x + v >= document.documentElement.offsetWidth, q = x + v / 2 - Q / 2 <= 0;
      o.value = A ? `${C - P + 8}px` : `${C + y - 8}px`, d.value = 1, l.value = B ? `${x + v - Q - 4}px` : q ? `${x + 4}px` : `${x + v / 2 - Q / 2}px`, s.value = B ? `${Q / 2 - v / 2 + 4}px` : q ? `${-(Q / 2) + v / 2 - 4}px` : "0px";
    }
    me(e, p, { immediate: !0 }), be(() => {
      window.addEventListener("scroll", p);
    }), Te(() => {
      window.removeEventListener("scroll", p);
    });
    const m = w(() => ["sm", "small"].includes(t.size)), D = w(() => ["md", "medium"].includes(t.size)), M = w(() => ["lg", "large"].includes(t.size)), k = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), S = w(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), b = w(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), _ = (C) => {
      var y, v;
      e.value && (C.target === n.value || (y = n.value) != null && y.contains(C.target) || C.target === r.value || (v = r.value) != null && v.contains(C.target) || (e.value = !1));
    }, T = (C) => {
      C.key === "Escape" && (e.value = !1);
    };
    be(() => {
      document.documentElement.addEventListener("click", _), document.documentElement.addEventListener("keydown", T);
    }), Te(() => {
      document.documentElement.removeEventListener("click", _), document.documentElement.removeEventListener("keydown", T);
    });
    const L = () => {
      e.value = !0;
    }, I = () => {
      e.value = !1;
    };
    return (C, y) => (i(), f(z, null, [
      (i(), j(ge(C.href !== "" ? "a" : "button"), Y({
        id: `button-${C.id}`,
        ref_key: "source",
        ref: n,
        href: C.href !== "" ? C.href : void 0,
        class: {
          "fr-link": C.isLink && !C.inline,
          "fr-btn": !C.isLink,
          "fr-btn--secondary": C.secondary && !C.tertiary,
          "fr-btn--tertiary": C.tertiary && !C.secondary && !C.noOutline,
          "fr-btn--tertiary-no-outline": C.tertiary && !C.secondary && C.noOutline,
          "fr-btn--sm": m.value,
          "fr-btn--md": D.value,
          "fr-btn--lg": M.value,
          "fr-btn--icon-right": !C.isLink && !C.iconOnly && k.value && C.iconRight,
          "fr-btn--icon-left": !C.isLink && !C.iconOnly && k.value && !C.iconRight,
          "fr-link--icon-right": C.isLink && !C.inline && !C.iconOnly && k.value && C.iconRight,
          "fr-link--icon-left": C.isLink && !C.inline && !C.iconOnly && k.value && !C.iconRight,
          "inline-flex": !k.value,
          reverse: C.iconRight && !k.value,
          "fr-btn--custom-tooltip": C.iconOnly,
          "justify-center": !k.value && C.iconOnly,
          [C.icon]: k.value
        },
        "aria-labelledby": C.id,
        onMouseenter: y[0] || (y[0] = (v) => L()),
        onMouseleave: y[1] || (y[1] = (v) => I()),
        onFocus: y[2] || (y[2] = (v) => L()),
        onBlur: y[3] || (y[3] = (v) => I())
      }, C.$attrs), {
        default: X(() => [
          N(h(C.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-labelledby"])),
      c("p", {
        id: C.id,
        ref_key: "tooltip",
        ref: r,
        class: F(["fr-tooltip fr-placement", b.value]),
        style: xe(S.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        $(C.$slots, "default", {}, () => [
          N(h(C.content), 1)
        ], !0)
      ], 14, gb)
    ], 64));
  }
}), tr = /* @__PURE__ */ Ae(bb, [["__scopeId", "data-v-6caed894"]]), yb = /* @__PURE__ */ O({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (t, e) => (i(), j(tr, Y({ "is-link": !1 }, t.$attrs), {
      default: X(() => [
        $(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), kb = /* @__PURE__ */ O({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (t, e) => (i(), j(tr, Y({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: X(() => [
        $(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), wb = ["id", "href", "aria-disabled"], _b = /* @__PURE__ */ O({
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
    return (s, u) => (i(), f("a", Y({
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
      $(s.$slots, "default", {}, () => [
        N(h(s.label), 1)
      ], !0)
    ], 16, wb));
  }
}), xb = /* @__PURE__ */ Ae(_b, [["__scopeId", "data-v-cc8b0ebe"]]), Db = (a, t) => a.matches ? a.matches(t) : a.msMatchesSelector ? a.msMatchesSelector(t) : a.webkitMatchesSelector ? a.webkitMatchesSelector(t) : null, Tb = (a, t) => {
  let e = a;
  for (; e && e.nodeType === 1; ) {
    if (Db(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, Ib = (a, t) => a.closest ? a.closest(t) : Tb(a, t), Eb = (a) => !!(a && typeof a.then == "function");
class Mb {
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
      const { target: e } = t, n = Ib(e, "[data-result-index]");
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
    this.search = Eb(t) ? t : (M) => Promise.resolve(t(M)), this.autoSelect = e, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = o, this.autocorrect = u, this.onShow = s, this.onHide = d, this.onLoading = p, this.onLoaded = m, this.submitOnEnter = D;
  }
}
const Cb = (a, t) => {
  const e = a.getBoundingClientRect(), n = t.getBoundingClientRect();
  return /* 1 */ e.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - n.height > 0 ? "above" : "below";
}, Pb = (a, t, e) => {
  let n;
  return function() {
    const l = this, o = arguments, s = function() {
      n = null, a.apply(l, o);
    };
    clearTimeout(n), n = setTimeout(s, t);
  };
}, Lb = (a) => {
  if (a != null && a.length) {
    const t = a.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? a.substring(1) : a
    };
  }
}, Bb = {
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
    const a = new Mb({
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
    return this.debounceTime > 0 && (a.handleInput = Pb(a.handleInput, this.debounceTime)), {
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
      const a = this.position === "below" ? "top" : "bottom", t = Lb(this.resultListLabel);
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Cb(
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
function $b(a, t, e, n, r, l) {
  return i(), f("div", Y({ ref: "root" }, {
    class: a.$attrs.class,
    ...a.$attrs.style ? { style: a.$attrs.style } : {}
  }), [
    $(a.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      c("div", De(yt(l.rootProps)), [
        c("input", Y({ ref: "input" }, l.inputProps, {
          onInput: t[0] || (t[0] = (...o) => l.handleInput && l.handleInput(...o)),
          onKeydown: t[1] || (t[1] = (...o) => r.core.handleKeyDown && r.core.handleKeyDown(...o)),
          onFocus: t[2] || (t[2] = (...o) => r.core.handleFocus && r.core.handleFocus(...o)),
          onBlur: t[3] || (t[3] = (...o) => r.core.handleBlur && r.core.handleBlur(...o))
        }), null, 16),
        c("ul", Y({ ref: "resultList" }, l.resultListProps, mr(l.resultListListeners, !0)), [
          (i(!0), f(z, null, U(r.results, (o, s) => $(a.$slots, "result", {
            result: o,
            props: l.resultProps[s]
          }, () => [
            (i(), f("li", Y({
              key: l.resultProps[s].id,
              ref_for: !0
            }, l.resultProps[s]), h(e.getResultValue(o)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Ab = /* @__PURE__ */ Ae(Bb, [["render", $b]]);
var Sb = {
  install: function(a, t) {
    a.use(em), a.component("RouterLink", ov), a.component("DsfrFacets", Iv), a.component("DsfrSelectMultiple", Jv), a.component("DsfrMenu", Lv), a.component("DsfrMenuLink", Sv), a.component("DsfrHeaderMenu", ig), a.component("DsfrCustomHeader", Fg), a.component("DsfrCustomHeaderMenuLinks", Qt), a.component("DsfrCustomDataTable", db), a.component("DsfrCustomCheckbox", vb), a.component("DsfrButtonTooltip", yb), a.component("DsfrLinkTooltip", kb), a.component("DsfrLink", xb), a.component("autocomplete", Ab);
  },
  methods: ev,
  utils: rv
};
window && (window.DSFR = Sb);
export {
  Sb as default
};
//# sourceMappingURL=dsfr.es.js.map
