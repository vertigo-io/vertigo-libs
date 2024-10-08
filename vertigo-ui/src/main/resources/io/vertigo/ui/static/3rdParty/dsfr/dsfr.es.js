import { defineComponent as A, ref as q, computed as y, onMounted as oe, watch as ae, onUnmounted as fe, Comment as al, cloneVNode as ll, h as Tt, mergeModels as De, useModel as ce, openBlock as i, createElementBlock as f, normalizeClass as L, createElementVNode as c, withDirectives as me, mergeProps as H, vModelCheckbox as ft, renderSlot as M, createTextVNode as N, toDisplayString as g, createCommentVNode as b, inject as ke, toRef as $e, createBlock as V, resolveDynamicComponent as ne, withCtx as G, unref as F, provide as Ce, resolveComponent as ie, vShow as ea, Fragment as $, renderList as Q, useCssVars as ta, nextTick as aa, normalizeStyle as de, normalizeProps as se, createVNode as X, withModifiers as K, guardReactiveProps as pt, withKeys as J, useSlots as la, hasInjectionContext as nl, reactive as rl, Teleport as ol, vModelSelect as na, useAttrs as il, onBeforeUnmount as sl, Transition as dl } from "vue";
const vt = Symbol("accordions"), mt = Symbol("header"), qe = Symbol("tabs"), pe = () => {
  const t = q(), e = q(!1), a = q(!1), n = () => {
    if (!t.value)
      return;
    t.value.style.setProperty("--collapser", "none");
    const l = t.value.offsetHeight;
    t.value.style.setProperty("--collapse", `${-l}px`), t.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: t,
    collapsing: e,
    cssExpanded: a,
    doExpand: (l) => {
      t.value && (l === !0 && t.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        e.value = !0, n(), window.requestAnimationFrame(() => {
          a.value = l;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (l) => {
      e.value = !1, t.value && l === !1 && t.value.style.removeProperty("--collapse-max-height");
    }
  };
}, ul = "abcdefghijklmnopqrstuvwyz0123456789", Bt = ul.repeat(10), cl = () => {
  const t = Math.floor(Math.random() * Bt.length);
  return Bt[t];
}, fl = (t) => Array.from({ length: t }).map(cl).join(""), Y = (t = "", e = "") => (t ? `${t}-` : "") + fl(5) + (e ? `-${e}` : ""), pl = { class: "fr-accordion" }, vl = ["aria-expanded", "aria-controls"], ml = ["id"], gl = /* @__PURE__ */ A({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => Y("accordion") },
    selected: { type: Boolean },
    title: { default: "Sans intitulé" },
    titleTag: { default: "h3" }
  },
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: r,
      onTransitionEnd: o
    } = pe(), s = q(), d = ke(vt), { isActive: u, expand: p } = (d == null ? void 0 : d($e(() => e.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return oe(() => {
      u.value && r(!0);
    }), ae(u, (v, h) => {
      v !== h && r(v);
    }), (v, h) => (i(), f("section", pl, [
      (i(), V(ne(v.titleTag), { class: "fr-accordion__title" }, {
        default: G(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": F(u),
            "aria-controls": v.id,
            type: "button",
            onClick: h[0] || (h[0] = (I) => F(p)())
          }, [
            M(v.$slots, "title", {}, () => [
              N(g(v.title), 1)
            ])
          ], 8, vl)
        ]),
        _: 3
      })),
      c("div", {
        id: v.id,
        ref_key: "collapse",
        ref: a,
        class: L(["fr-collapse", {
          "fr-collapse--expanded": F(l),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": F(n)
        }]),
        onTransitionend: h[1] || (h[1] = (I) => F(o)(F(u)))
      }, [
        M(v.$slots, "default")
      ], 42, ml)
    ]));
  }
}), bl = { class: "fr-accordions-group" }, hl = /* @__PURE__ */ A({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = y({
      get: () => a.modelValue,
      set(s) {
        n("update:modelValue", s);
      }
    }), r = q(/* @__PURE__ */ new Map()), o = q(0);
    return Ce(vt, (s) => {
      const d = o.value++;
      r.value.set(d, s.value);
      const u = y(() => d === l.value);
      ae(s, () => {
        r.value.set(d, s.value);
      });
      function p() {
        if (l.value === d) {
          l.value = -1;
          return;
        }
        l.value = d;
      }
      return fe(() => {
        r.value.delete(d);
      }), { isActive: u, expand: p };
    }), (s, d) => (i(), f("div", bl, [
      M(s.$slots, "default")
    ]));
  }
}), yl = ["id", "role"], kl = ["title", "aria-label"], _l = /* @__PURE__ */ A({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => Y("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = () => n("close"), r = y(
      () => [
        `fr-alert--${a.type}`,
        {
          "fr-alert--sm": a.small
        }
      ]
    );
    return (o, s) => o.closed ? b("", !0) : (i(), f("div", {
      key: 0,
      id: o.id,
      class: L(["fr-alert", r.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? b("", !0) : (i(), V(ne(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: G(() => [
          N(g(o.title), 1)
        ]),
        _: 1
      })),
      M(o.$slots, "default", {}, () => [
        N(g(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: l
      }, null, 8, kl)) : b("", !0)
    ], 10, yl));
  }
}), wl = /* @__PURE__ */ A({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(t) {
    return (e, a) => (i(), f("a", {
      class: L(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, g(e.label), 3));
  }
}), xl = ["title"], ra = /* @__PURE__ */ A({
  __name: "DsfrBadge",
  props: {
    label: {},
    type: { default: "info" },
    noIcon: { type: Boolean },
    small: { type: Boolean },
    ellipsis: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("p", {
      class: L(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      c("span", {
        class: L(e.ellipsis ? "fr-ellipsis" : "")
      }, g(e.label), 3)
    ], 10, xl));
  }
}), Il = ["aria-label"], Dl = ["aria-expanded", "aria-controls"], Cl = ["id"], Tl = { class: "fr-breadcrumb__list" }, Bl = ["aria-current"], El = /* @__PURE__ */ A({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => Y("breadcrumb") },
    links: { default: () => [{ text: "" }] },
    navigationLabel: { default: "vous êtes ici :" },
    showBreadcrumbLabel: { default: "Voir le fil d’Ariane" }
  },
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: r
    } = pe(), o = q(!1);
    return ae(o, (s, d) => {
      s !== d && l(s);
    }), (s, d) => {
      const u = ie("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        me(c("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: d[0] || (d[0] = (p) => o.value = !o.value)
        }, g(s.showBreadcrumbLabel), 9, Dl), [
          [ea, !o.value]
        ]),
        c("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: L(["fr-collapse", {
            "fr-collapse--expanded": F(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(a)
          }]),
          onTransitionend: d[1] || (d[1] = (p) => F(r)(o.value))
        }, [
          c("ol", Tl, [
            (i(!0), f($, null, Q(s.links, (p, v) => (i(), f("li", {
              key: v,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), V(u, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": v === s.links.length - 1 ? "page" : void 0
              }, {
                default: G(() => [
                  N(g(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : b("", !0),
              p.to ? b("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": v === s.links.length - 1 ? "page" : void 0
              }, g(p.text), 9, Bl))
            ]))), 128))
          ])
        ], 42, Cl)
      ], 8, Il);
    };
  }
}), xe = /^[a-z0-9]+(-[a-z0-9]+)*$/, He = (t, e, a, n = "") => {
  const l = t.split(":");
  if (t.slice(0, 1) === "@") {
    if (l.length < 2 || l.length > 3)
      return null;
    n = l.shift().slice(1);
  }
  if (l.length > 3 || !l.length)
    return null;
  if (l.length > 1) {
    const s = l.pop(), d = l.pop(), u = {
      // Allow provider without '@': "provider:prefix:name"
      provider: l.length > 0 ? l[0] : n,
      prefix: d,
      name: s
    };
    return e && !Fe(u) ? null : u;
  }
  const r = l[0], o = r.split("-");
  if (o.length > 1) {
    const s = {
      provider: n,
      prefix: o.shift(),
      name: o.join("-")
    };
    return e && !Fe(s) ? null : s;
  }
  if (a && n === "") {
    const s = {
      provider: n,
      prefix: "",
      name: r
    };
    return e && !Fe(s, a) ? null : s;
  }
  return null;
}, Fe = (t, e) => t ? !!((t.provider === "" || t.provider.match(xe)) && (e && t.prefix === "" || t.prefix.match(xe)) && t.name.match(xe)) : !1, oa = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), Pe = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), ze = Object.freeze({
  ...oa,
  ...Pe
}), Je = Object.freeze({
  ...ze,
  body: "",
  hidden: !1
});
function Sl(t, e) {
  const a = {};
  !t.hFlip != !e.hFlip && (a.hFlip = !0), !t.vFlip != !e.vFlip && (a.vFlip = !0);
  const n = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return n && (a.rotate = n), a;
}
function Et(t, e) {
  const a = Sl(t, e);
  for (const n in Je)
    n in Pe ? n in t && !(n in a) && (a[n] = Pe[n]) : n in e ? a[n] = e[n] : n in t && (a[n] = t[n]);
  return a;
}
function Al(t, e) {
  const a = t.icons, n = t.aliases || /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  function r(o) {
    if (a[o])
      return l[o] = [];
    if (!(o in l)) {
      l[o] = null;
      const s = n[o] && n[o].parent, d = s && r(s);
      d && (l[o] = [s].concat(d));
    }
    return l[o];
  }
  return Object.keys(a).concat(Object.keys(n)).forEach(r), l;
}
function Ml(t, e, a) {
  const n = t.icons, l = t.aliases || /* @__PURE__ */ Object.create(null);
  let r = {};
  function o(s) {
    r = Et(
      n[s] || l[s],
      r
    );
  }
  return o(e), a.forEach(o), Et(t, r);
}
function ia(t, e) {
  const a = [];
  if (typeof t != "object" || typeof t.icons != "object")
    return a;
  t.not_found instanceof Array && t.not_found.forEach((l) => {
    e(l, null), a.push(l);
  });
  const n = Al(t);
  for (const l in n) {
    const r = n[l];
    r && (e(l, Ml(t, l, r)), a.push(l));
  }
  return a;
}
const Fl = {
  provider: "",
  aliases: {},
  not_found: {},
  ...oa
};
function Ue(t, e) {
  for (const a in e)
    if (a in t && typeof t[a] != typeof e[a])
      return !1;
  return !0;
}
function sa(t) {
  if (typeof t != "object" || t === null)
    return null;
  const e = t;
  if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !Ue(t, Fl))
    return null;
  const a = e.icons;
  for (const l in a) {
    const r = a[l];
    if (!l.match(xe) || typeof r.body != "string" || !Ue(
      r,
      Je
    ))
      return null;
  }
  const n = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const l in n) {
    const r = n[l], o = r.parent;
    if (!l.match(xe) || typeof o != "string" || !a[o] && !n[o] || !Ue(
      r,
      Je
    ))
      return null;
  }
  return e;
}
const St = /* @__PURE__ */ Object.create(null);
function Ll(t, e) {
  return {
    provider: t,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function ge(t, e) {
  const a = St[t] || (St[t] = /* @__PURE__ */ Object.create(null));
  return a[e] || (a[e] = Ll(t, e));
}
function gt(t, e) {
  return sa(e) ? ia(e, (a, n) => {
    n ? t.icons[a] = n : t.missing.add(a);
  }) : [];
}
function Pl(t, e, a) {
  try {
    if (typeof a.body == "string")
      return t.icons[e] = { ...a }, !0;
  } catch {
  }
  return !1;
}
let Te = !1;
function da(t) {
  return typeof t == "boolean" && (Te = t), Te;
}
function Nl(t) {
  const e = typeof t == "string" ? He(t, !0, Te) : t;
  if (e) {
    const a = ge(e.provider, e.prefix), n = e.name;
    return a.icons[n] || (a.missing.has(n) ? null : void 0);
  }
}
function Vl(t, e) {
  const a = He(t, !0, Te);
  if (!a)
    return !1;
  const n = ge(a.provider, a.prefix);
  return Pl(n, a.name, e);
}
function Rl(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), Te && !e && !t.prefix) {
    let l = !1;
    return sa(t) && (t.prefix = "", ia(t, (r, o) => {
      o && Vl(r, o) && (l = !0);
    })), l;
  }
  const a = t.prefix;
  if (!Fe({
    provider: e,
    prefix: a,
    name: "a"
  }))
    return !1;
  const n = ge(e, a);
  return !!gt(n, t);
}
const ua = Object.freeze({
  width: null,
  height: null
}), ca = Object.freeze({
  // Dimensions
  ...ua,
  // Transformations
  ...Pe
}), jl = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Ol = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function At(t, e, a) {
  if (e === 1)
    return t;
  if (a = a || 100, typeof t == "number")
    return Math.ceil(t * e * a) / a;
  if (typeof t != "string")
    return t;
  const n = t.split(jl);
  if (n === null || !n.length)
    return t;
  const l = [];
  let r = n.shift(), o = Ol.test(r);
  for (; ; ) {
    if (o) {
      const s = parseFloat(r);
      isNaN(s) ? l.push(r) : l.push(Math.ceil(s * e * a) / a);
    } else
      l.push(r);
    if (r = n.shift(), r === void 0)
      return l.join("");
    o = !o;
  }
}
function $l(t, e = "defs") {
  let a = "";
  const n = t.indexOf("<" + e);
  for (; n >= 0; ) {
    const l = t.indexOf(">", n), r = t.indexOf("</" + e);
    if (l === -1 || r === -1)
      break;
    const o = t.indexOf(">", r);
    if (o === -1)
      break;
    a += t.slice(l + 1, r).trim(), t = t.slice(0, n).trim() + t.slice(o + 1);
  }
  return {
    defs: a,
    content: t
  };
}
function ql(t, e) {
  return t ? "<defs>" + t + "</defs>" + e : e;
}
function Hl(t, e, a) {
  const n = $l(t);
  return ql(n.defs, e + n.content + a);
}
const zl = (t) => t === "unset" || t === "undefined" || t === "none";
function Ql(t, e) {
  const a = {
    ...ze,
    ...t
  }, n = {
    ...ca,
    ...e
  }, l = {
    left: a.left,
    top: a.top,
    width: a.width,
    height: a.height
  };
  let r = a.body;
  [a, n].forEach((P) => {
    const m = [], w = P.hFlip, T = P.vFlip;
    let O = P.rotate;
    w ? T ? O += 2 : (m.push(
      "translate(" + (l.width + l.left).toString() + " " + (0 - l.top).toString() + ")"
    ), m.push("scale(-1 1)"), l.top = l.left = 0) : T && (m.push(
      "translate(" + (0 - l.left).toString() + " " + (l.height + l.top).toString() + ")"
    ), m.push("scale(1 -1)"), l.top = l.left = 0);
    let E;
    switch (O < 0 && (O -= Math.floor(O / 4) * 4), O = O % 4, O) {
      case 1:
        E = l.height / 2 + l.top, m.unshift(
          "rotate(90 " + E.toString() + " " + E.toString() + ")"
        );
        break;
      case 2:
        m.unshift(
          "rotate(180 " + (l.width / 2 + l.left).toString() + " " + (l.height / 2 + l.top).toString() + ")"
        );
        break;
      case 3:
        E = l.width / 2 + l.left, m.unshift(
          "rotate(-90 " + E.toString() + " " + E.toString() + ")"
        );
        break;
    }
    O % 2 === 1 && (l.left !== l.top && (E = l.left, l.left = l.top, l.top = E), l.width !== l.height && (E = l.width, l.width = l.height, l.height = E)), m.length && (r = Hl(
      r,
      '<g transform="' + m.join(" ") + '">',
      "</g>"
    ));
  });
  const o = n.width, s = n.height, d = l.width, u = l.height;
  let p, v;
  o === null ? (v = s === null ? "1em" : s === "auto" ? u : s, p = At(v, d / u)) : (p = o === "auto" ? d : o, v = s === null ? At(p, u / d) : s === "auto" ? u : s);
  const h = {}, I = (P, m) => {
    zl(m) || (h[P] = m.toString());
  };
  I("width", p), I("height", v);
  const x = [l.left, l.top, d, u];
  return h.viewBox = x.join(" "), {
    attributes: h,
    viewBox: x,
    body: r
  };
}
const Gl = /\sid="(\S+)"/g, Kl = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Wl = 0;
function Xl(t, e = Kl) {
  const a = [];
  let n;
  for (; n = Gl.exec(t); )
    a.push(n[1]);
  if (!a.length)
    return t;
  const l = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return a.forEach((r) => {
    const o = typeof e == "function" ? e(r) : e + (Wl++).toString(), s = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"),
      "$1" + o + l + "$3"
    );
  }), t = t.replace(new RegExp(l, "g"), ""), t;
}
const et = /* @__PURE__ */ Object.create(null);
function Ul(t, e) {
  et[t] = e;
}
function tt(t) {
  return et[t] || et[""];
}
function bt(t) {
  let e;
  if (typeof t.resources == "string")
    e = [t.resources];
  else if (e = t.resources, !(e instanceof Array) || !e.length)
    return null;
  return {
    // API hosts
    resources: e,
    // Root path
    path: t.path || "/",
    // URL length limit
    maxURL: t.maxURL || 500,
    // Timeout before next host is used.
    rotate: t.rotate || 750,
    // Timeout before failing query.
    timeout: t.timeout || 5e3,
    // Randomise default API end point.
    random: t.random === !0,
    // Start index
    index: t.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: t.dataAfterTimeout !== !1
  };
}
const ht = /* @__PURE__ */ Object.create(null), Se = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], at = [];
for (; Se.length > 0; )
  Se.length === 1 || Math.random() > 0.5 ? at.push(Se.shift()) : at.push(Se.pop());
ht[""] = bt({
  resources: ["https://api.iconify.design"].concat(at)
});
function Yl(t, e) {
  const a = bt(e);
  return a === null ? !1 : (ht[t] = a, !0);
}
function yt(t) {
  return ht[t];
}
const Zl = () => {
  let t;
  try {
    if (t = fetch, typeof t == "function")
      return t;
  } catch {
  }
};
let Mt = Zl();
function Jl(t, e) {
  const a = yt(t);
  if (!a)
    return 0;
  let n;
  if (!a.maxURL)
    n = 0;
  else {
    let l = 0;
    a.resources.forEach((o) => {
      l = Math.max(l, o.length);
    });
    const r = e + ".json?icons=";
    n = a.maxURL - l - a.path.length - r.length;
  }
  return n;
}
function en(t) {
  return t === 404;
}
const tn = (t, e, a) => {
  const n = [], l = Jl(t, e), r = "icons";
  let o = {
    type: r,
    provider: t,
    prefix: e,
    icons: []
  }, s = 0;
  return a.forEach((d, u) => {
    s += d.length + 1, s >= l && u > 0 && (n.push(o), o = {
      type: r,
      provider: t,
      prefix: e,
      icons: []
    }, s = d.length), o.icons.push(d);
  }), n.push(o), n;
};
function an(t) {
  if (typeof t == "string") {
    const e = yt(t);
    if (e)
      return e.path;
  }
  return "/";
}
const ln = (t, e, a) => {
  if (!Mt) {
    a("abort", 424);
    return;
  }
  let n = an(e.provider);
  switch (e.type) {
    case "icons": {
      const r = e.prefix, o = e.icons.join(","), s = new URLSearchParams({
        icons: o
      });
      n += r + ".json?" + s.toString();
      break;
    }
    case "custom": {
      const r = e.uri;
      n += r.slice(0, 1) === "/" ? r.slice(1) : r;
      break;
    }
    default:
      a("abort", 400);
      return;
  }
  let l = 503;
  Mt(t + n).then((r) => {
    const o = r.status;
    if (o !== 200) {
      setTimeout(() => {
        a(en(o) ? "abort" : "next", o);
      });
      return;
    }
    return l = 501, r.json();
  }).then((r) => {
    if (typeof r != "object" || r === null) {
      setTimeout(() => {
        r === 404 ? a("abort", r) : a("next", l);
      });
      return;
    }
    setTimeout(() => {
      a("success", r);
    });
  }).catch(() => {
    a("next", l);
  });
}, nn = {
  prepare: tn,
  send: ln
};
function rn(t) {
  const e = {
    loaded: [],
    missing: [],
    pending: []
  }, a = /* @__PURE__ */ Object.create(null);
  t.sort((l, r) => l.provider !== r.provider ? l.provider.localeCompare(r.provider) : l.prefix !== r.prefix ? l.prefix.localeCompare(r.prefix) : l.name.localeCompare(r.name));
  let n = {
    provider: "",
    prefix: "",
    name: ""
  };
  return t.forEach((l) => {
    if (n.name === l.name && n.prefix === l.prefix && n.provider === l.provider)
      return;
    n = l;
    const r = l.provider, o = l.prefix, s = l.name, d = a[r] || (a[r] = /* @__PURE__ */ Object.create(null)), u = d[o] || (d[o] = ge(r, o));
    let p;
    s in u.icons ? p = e.loaded : o === "" || u.missing.has(s) ? p = e.missing : p = e.pending;
    const v = {
      provider: r,
      prefix: o,
      name: s
    };
    p.push(v);
  }), e;
}
function fa(t, e) {
  t.forEach((a) => {
    const n = a.loaderCallbacks;
    n && (a.loaderCallbacks = n.filter((l) => l.id !== e));
  });
}
function on(t) {
  t.pendingCallbacksFlag || (t.pendingCallbacksFlag = !0, setTimeout(() => {
    t.pendingCallbacksFlag = !1;
    const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
    if (!e.length)
      return;
    let a = !1;
    const n = t.provider, l = t.prefix;
    e.forEach((r) => {
      const o = r.icons, s = o.pending.length;
      o.pending = o.pending.filter((d) => {
        if (d.prefix !== l)
          return !0;
        const u = d.name;
        if (t.icons[u])
          o.loaded.push({
            provider: n,
            prefix: l,
            name: u
          });
        else if (t.missing.has(u))
          o.missing.push({
            provider: n,
            prefix: l,
            name: u
          });
        else
          return a = !0, !0;
        return !1;
      }), o.pending.length !== s && (a || fa([t], r.id), r.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        r.abort
      ));
    });
  }));
}
let sn = 0;
function dn(t, e, a) {
  const n = sn++, l = fa.bind(null, a, n);
  if (!e.pending.length)
    return l;
  const r = {
    id: n,
    icons: e,
    callback: t,
    abort: l
  };
  return a.forEach((o) => {
    (o.loaderCallbacks || (o.loaderCallbacks = [])).push(r);
  }), l;
}
function un(t, e = !0, a = !1) {
  const n = [];
  return t.forEach((l) => {
    const r = typeof l == "string" ? He(l, e, a) : l;
    r && n.push(r);
  }), n;
}
var cn = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function fn(t, e, a, n) {
  const l = t.resources.length, r = t.random ? Math.floor(Math.random() * l) : t.index;
  let o;
  if (t.random) {
    let k = t.resources.slice(0);
    for (o = []; k.length > 1; ) {
      const j = Math.floor(Math.random() * k.length);
      o.push(k[j]), k = k.slice(0, j).concat(k.slice(j + 1));
    }
    o = o.concat(k);
  } else
    o = t.resources.slice(r).concat(t.resources.slice(0, r));
  const s = Date.now();
  let d = "pending", u = 0, p, v = null, h = [], I = [];
  typeof n == "function" && I.push(n);
  function x() {
    v && (clearTimeout(v), v = null);
  }
  function P() {
    d === "pending" && (d = "aborted"), x(), h.forEach((k) => {
      k.status === "pending" && (k.status = "aborted");
    }), h = [];
  }
  function m(k, j) {
    j && (I = []), typeof k == "function" && I.push(k);
  }
  function w() {
    return {
      startTime: s,
      payload: e,
      status: d,
      queriesSent: u,
      queriesPending: h.length,
      subscribe: m,
      abort: P
    };
  }
  function T() {
    d = "failed", I.forEach((k) => {
      k(void 0, p);
    });
  }
  function O() {
    h.forEach((k) => {
      k.status === "pending" && (k.status = "aborted");
    }), h = [];
  }
  function E(k, j, B) {
    const W = j !== "success";
    switch (h = h.filter((_) => _ !== k), d) {
      case "pending":
        break;
      case "failed":
        if (W || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (j === "abort") {
      p = B, T();
      return;
    }
    if (W) {
      p = B, h.length || (o.length ? z() : T());
      return;
    }
    if (x(), O(), !t.random) {
      const _ = t.resources.indexOf(k.resource);
      _ !== -1 && _ !== t.index && (t.index = _);
    }
    d = "completed", I.forEach((_) => {
      _(B);
    });
  }
  function z() {
    if (d !== "pending")
      return;
    x();
    const k = o.shift();
    if (k === void 0) {
      if (h.length) {
        v = setTimeout(() => {
          x(), d === "pending" && (O(), T());
        }, t.timeout);
        return;
      }
      T();
      return;
    }
    const j = {
      status: "pending",
      resource: k,
      callback: (B, W) => {
        E(j, B, W);
      }
    };
    h.push(j), u++, v = setTimeout(z, t.rotate), a(k, e, j.callback);
  }
  return setTimeout(z), w;
}
function pa(t) {
  const e = {
    ...cn,
    ...t
  };
  let a = [];
  function n() {
    a = a.filter((o) => o().status === "pending");
  }
  function l(o, s, d) {
    const u = fn(
      e,
      o,
      s,
      (p, v) => {
        n(), d && d(p, v);
      }
    );
    return a.push(u), u;
  }
  function r(o) {
    return a.find((s) => o(s)) || null;
  }
  return {
    query: l,
    find: r,
    setIndex: (o) => {
      e.index = o;
    },
    getIndex: () => e.index,
    cleanup: n
  };
}
function Ft() {
}
const Ye = /* @__PURE__ */ Object.create(null);
function pn(t) {
  if (!Ye[t]) {
    const e = yt(t);
    if (!e)
      return;
    const a = pa(e), n = {
      config: e,
      redundancy: a
    };
    Ye[t] = n;
  }
  return Ye[t];
}
function vn(t, e, a) {
  let n, l;
  if (typeof t == "string") {
    const r = tt(t);
    if (!r)
      return a(void 0, 424), Ft;
    l = r.send;
    const o = pn(t);
    o && (n = o.redundancy);
  } else {
    const r = bt(t);
    if (r) {
      n = pa(r);
      const o = t.resources ? t.resources[0] : "", s = tt(o);
      s && (l = s.send);
    }
  }
  return !n || !l ? (a(void 0, 424), Ft) : n.query(e, l, a)().abort;
}
const Lt = "iconify2", Be = "iconify", va = Be + "-count", Pt = Be + "-version", ma = 36e5, mn = 168, gn = 50;
function lt(t, e) {
  try {
    return t.getItem(e);
  } catch {
  }
}
function kt(t, e, a) {
  try {
    return t.setItem(e, a), !0;
  } catch {
  }
}
function Nt(t, e) {
  try {
    t.removeItem(e);
  } catch {
  }
}
function nt(t, e) {
  return kt(t, va, e.toString());
}
function rt(t) {
  return parseInt(lt(t, va)) || 0;
}
const Qe = {
  local: !0,
  session: !0
}, ga = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let _t = !1;
function bn(t) {
  _t = t;
}
let Ae = typeof window > "u" ? {} : window;
function ba(t) {
  const e = t + "Storage";
  try {
    if (Ae && Ae[e] && typeof Ae[e].length == "number")
      return Ae[e];
  } catch {
  }
  Qe[t] = !1;
}
function ha(t, e) {
  const a = ba(t);
  if (!a)
    return;
  const n = lt(a, Pt);
  if (n !== Lt) {
    if (n) {
      const s = rt(a);
      for (let d = 0; d < s; d++)
        Nt(a, Be + d.toString());
    }
    kt(a, Pt, Lt), nt(a, 0);
    return;
  }
  const l = Math.floor(Date.now() / ma) - mn, r = (s) => {
    const d = Be + s.toString(), u = lt(a, d);
    if (typeof u == "string") {
      try {
        const p = JSON.parse(u);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > l && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        e(p, s))
          return !0;
      } catch {
      }
      Nt(a, d);
    }
  };
  let o = rt(a);
  for (let s = o - 1; s >= 0; s--)
    r(s) || (s === o - 1 ? (o--, nt(a, o)) : ga[t].add(s));
}
function ya() {
  if (!_t) {
    bn(!0);
    for (const t in Qe)
      ha(t, (e) => {
        const a = e.data, n = e.provider, l = a.prefix, r = ge(
          n,
          l
        );
        if (!gt(r, a).length)
          return !1;
        const o = a.lastModified || -1;
        return r.lastModifiedCached = r.lastModifiedCached ? Math.min(r.lastModifiedCached, o) : o, !0;
      });
  }
}
function hn(t, e) {
  const a = t.lastModifiedCached;
  if (
    // Matches or newer
    a && a >= e
  )
    return a === e;
  if (t.lastModifiedCached = e, a)
    for (const n in Qe)
      ha(n, (l) => {
        const r = l.data;
        return l.provider !== t.provider || r.prefix !== t.prefix || r.lastModified === e;
      });
  return !0;
}
function yn(t, e) {
  _t || ya();
  function a(n) {
    let l;
    if (!Qe[n] || !(l = ba(n)))
      return;
    const r = ga[n];
    let o;
    if (r.size)
      r.delete(o = Array.from(r).shift());
    else if (o = rt(l), o >= gn || !nt(l, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / ma),
      provider: t.provider,
      data: e
    };
    return kt(
      l,
      Be + o.toString(),
      JSON.stringify(s)
    );
  }
  e.lastModified && !hn(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && (e = Object.assign({}, e), delete e.not_found), a("local") || a("session"));
}
function Vt() {
}
function kn(t) {
  t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
    t.iconsLoaderFlag = !1, on(t);
  }));
}
function _n(t, e) {
  t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
    t.iconsQueueFlag = !1;
    const { provider: a, prefix: n } = t, l = t.iconsToLoad;
    delete t.iconsToLoad;
    let r;
    !l || !(r = tt(a)) || r.prepare(a, n, l).forEach((o) => {
      vn(a, o, (s) => {
        if (typeof s != "object")
          o.icons.forEach((d) => {
            t.missing.add(d);
          });
        else
          try {
            const d = gt(
              t,
              s
            );
            if (!d.length)
              return;
            const u = t.pendingIcons;
            u && d.forEach((p) => {
              u.delete(p);
            }), yn(t, s);
          } catch (d) {
            console.error(d);
          }
        kn(t);
      });
    });
  }));
}
const wn = (t, e) => {
  const a = un(t, !0, da()), n = rn(a);
  if (!n.pending.length) {
    let d = !0;
    return e && setTimeout(() => {
      d && e(
        n.loaded,
        n.missing,
        n.pending,
        Vt
      );
    }), () => {
      d = !1;
    };
  }
  const l = /* @__PURE__ */ Object.create(null), r = [];
  let o, s;
  return n.pending.forEach((d) => {
    const { provider: u, prefix: p } = d;
    if (p === s && u === o)
      return;
    o = u, s = p, r.push(ge(u, p));
    const v = l[u] || (l[u] = /* @__PURE__ */ Object.create(null));
    v[p] || (v[p] = []);
  }), n.pending.forEach((d) => {
    const { provider: u, prefix: p, name: v } = d, h = ge(u, p), I = h.pendingIcons || (h.pendingIcons = /* @__PURE__ */ new Set());
    I.has(v) || (I.add(v), l[u][p].push(v));
  }), r.forEach((d) => {
    const { provider: u, prefix: p } = d;
    l[u][p].length && _n(d, l[u][p]);
  }), e ? dn(e, n, r) : Vt;
};
function xn(t, e) {
  const a = {
    ...t
  };
  for (const n in e) {
    const l = e[n], r = typeof l;
    n in ua ? (l === null || l && (r === "string" || r === "number")) && (a[n] = l) : r === typeof a[n] && (a[n] = n === "rotate" ? l % 4 : l);
  }
  return a;
}
const In = /[\s,]+/;
function Dn(t, e) {
  e.split(In).forEach((a) => {
    switch (a.trim()) {
      case "horizontal":
        t.hFlip = !0;
        break;
      case "vertical":
        t.vFlip = !0;
        break;
    }
  });
}
function Cn(t, e = 0) {
  const a = t.replace(/^-?[0-9.]*/, "");
  function n(l) {
    for (; l < 0; )
      l += 4;
    return l % 4;
  }
  if (a === "") {
    const l = parseInt(t);
    return isNaN(l) ? 0 : n(l);
  } else if (a !== t) {
    let l = 0;
    switch (a) {
      case "%":
        l = 25;
        break;
      case "deg":
        l = 90;
    }
    if (l) {
      let r = parseFloat(t.slice(0, t.length - a.length));
      return isNaN(r) ? 0 : (r = r / l, r % 1 === 0 ? n(r) : 0);
    }
  }
  return e;
}
function Tn(t, e) {
  let a = t.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in e)
    a += " " + n + '="' + e[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + a + ">" + t + "</svg>";
}
function Bn(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function En(t) {
  return "data:image/svg+xml," + Bn(t);
}
function Sn(t) {
  return 'url("' + En(t) + '")';
}
const Rt = {
  ...ca,
  inline: !1
}, An = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Mn = {
  display: "inline-block"
}, ot = {
  backgroundColor: "currentColor"
}, ka = {
  backgroundColor: "transparent"
}, jt = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Ot = {
  webkitMask: ot,
  mask: ot,
  background: ka
};
for (const t in Ot) {
  const e = Ot[t];
  for (const a in jt)
    e[t + a] = jt[a];
}
const Le = {};
["horizontal", "vertical"].forEach((t) => {
  const e = t.slice(0, 1) + "Flip";
  Le[t + "-flip"] = e, Le[t.slice(0, 1) + "-flip"] = e, Le[t + "Flip"] = e;
});
function $t(t) {
  return t + (t.match(/^[-0-9.]+$/) ? "px" : "");
}
const qt = (t, e) => {
  const a = xn(Rt, e), n = { ...An }, l = e.mode || "svg", r = {}, o = e.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
  for (let P in e) {
    const m = e[P];
    if (m !== void 0)
      switch (P) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          a[P] = m === !0 || m === "true" || m === 1;
          break;
        case "flip":
          typeof m == "string" && Dn(a, m);
          break;
        case "color":
          r.color = m;
          break;
        case "rotate":
          typeof m == "string" ? a[P] = Cn(m) : typeof m == "number" && (a[P] = m);
          break;
        case "ariaHidden":
        case "aria-hidden":
          m !== !0 && m !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const w = Le[P];
          w ? (m === !0 || m === "true" || m === 1) && (a[w] = !0) : Rt[P] === void 0 && (n[P] = m);
        }
      }
  }
  const d = Ql(t, a), u = d.attributes;
  if (a.inline && (r.verticalAlign = "-0.125em"), l === "svg") {
    n.style = {
      ...r,
      ...s
    }, Object.assign(n, u);
    let P = 0, m = e.id;
    return typeof m == "string" && (m = m.replace(/-/g, "_")), n.innerHTML = Xl(d.body, m ? () => m + "ID" + P++ : "iconifyVue"), Tt("svg", n);
  }
  const { body: p, width: v, height: h } = t, I = l === "mask" || (l === "bg" ? !1 : p.indexOf("currentColor") !== -1), x = Tn(p, {
    ...u,
    width: v + "",
    height: h + ""
  });
  return n.style = {
    ...r,
    "--svg": Sn(x),
    width: $t(u.width),
    height: $t(u.height),
    ...Mn,
    ...I ? ot : ka,
    ...s
  }, Tt("span", n);
};
da(!0);
Ul("", nn);
if (typeof document < "u" && typeof window < "u") {
  ya();
  const t = window;
  if (t.IconifyPreload !== void 0) {
    const e = t.IconifyPreload, a = "Invalid IconifyPreload syntax.";
    typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach((n) => {
      try {
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !Rl(n)) && console.error(a);
      } catch {
        console.error(a);
      }
    });
  }
  if (t.IconifyProviders !== void 0) {
    const e = t.IconifyProviders;
    if (typeof e == "object" && e !== null)
      for (let a in e) {
        const n = "IconifyProviders[" + a + "] is invalid.";
        try {
          const l = e[a];
          if (typeof l != "object" || !l || l.resources === void 0)
            continue;
          Yl(a, l) || console.error(n);
        } catch {
          console.error(n);
        }
      }
  }
}
const Fn = {
  ...ze,
  body: ""
}, Ln = A({
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
    getIcon(t, e) {
      if (typeof t == "object" && t !== null && typeof t.body == "string")
        return this._name = "", this.abortLoading(), {
          data: t
        };
      let a;
      if (typeof t != "string" || (a = He(t, !1, !0)) === null)
        return this.abortLoading(), null;
      const n = Nl(a);
      if (!n)
        return (!this._loadingIcon || this._loadingIcon.name !== t) && (this.abortLoading(), this._name = "", n !== null && (this._loadingIcon = {
          name: t,
          abort: wn([a], () => {
            this.counter++;
          })
        })), null;
      this.abortLoading(), this._name !== t && (this._name = t, e && e(t));
      const l = ["iconify"];
      return a.prefix !== "" && l.push("iconify--" + a.prefix), a.provider !== "" && l.push("iconify--" + a.provider), { data: n, classes: l };
    }
  },
  // Render icon
  render() {
    this.counter;
    const t = this.$attrs, e = this.iconMounted || t.ssr ? this.getIcon(t.icon, t.onLoad) : null;
    if (!e)
      return qt(Fn, t);
    let a = t;
    return e.classes && (a = {
      ...t,
      class: (typeof t.class == "string" ? t.class + " " : "") + e.classes.join(" ")
    }), qt({
      ...ze,
      ...e.data
    }, a);
  }
}), Pn = /* @__PURE__ */ A({
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
  setup(t) {
    ta((d) => ({
      "98d5b8bc": s.value
    }));
    const e = t, a = q(null), n = y(() => `${+e.scale * 1.2}rem`), l = y(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    ae(() => e.title, r);
    async function r() {
      var d, u, p, v;
      if (!((d = a.value) != null && d.$el))
        return;
      const h = !!((u = a.value) == null ? void 0 : u.$el).querySelector("title"), I = document.createElement("title");
      if (!e.title) {
        I.remove();
        return;
      }
      I.innerHTML = e.title, await aa(), h || (v = ((p = a.value) == null ? void 0 : p.$el).firstChild) == null || v.before(I);
    }
    oe(r);
    const o = y(() => {
      var d;
      return (d = e.name) != null && d.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), s = y(() => e.color ?? e.fill ?? "inherit");
    return (d, u) => (i(), V(F(Ln), {
      ref_key: "icon",
      ref: a,
      icon: o.value,
      style: de({ fontSize: n.value, verticalAlign: d.verticalAlign, display: d.display }),
      "aria-label": d.label,
      class: L(["vicon", {
        "vicon-spin": e.animation === "spin",
        "vicon-wrench": e.animation === "wrench",
        "vicon-pulse": e.animation === "pulse",
        "vicon-spin-pulse": e.animation === "spin-pulse",
        "vicon-flash": e.animation === "flash",
        "vicon-float": e.animation === "float",
        "vicon-ring": e.animation === "ring",
        "vicon-slow": e.speed === "slow",
        "vicon-fast": e.speed === "fast",
        "vicon-inverse": e.inverse
      }]),
      flip: l.value,
      ssr: d.ssr
    }, null, 8, ["icon", "style", "aria-label", "class", "flip", "ssr"]));
  }
}), re = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, le = /* @__PURE__ */ re(Pn, [["__scopeId", "data-v-33ecc4e5"]]), Nn = ["title", "disabled", "aria-disabled"], Vn = { key: 1 }, Rn = /* @__PURE__ */ A({
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
  setup(t, { expose: e }) {
    const a = t, n = y(() => ["sm", "small"].includes(a.size)), l = y(() => ["md", "medium"].includes(a.size)), r = y(() => ["lg", "large"].includes(a.size)), o = q(null);
    e({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const s = y(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), d = y(() => a.iconOnly ? 1.25 : 0.8325), u = y(
      () => typeof a.icon == "string" ? { scale: d.value, name: a.icon } : { scale: d.value, ...a.icon }
    );
    return (p, v) => (i(), f("button", {
      ref_key: "btn",
      ref: o,
      class: L(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": n.value,
        "fr-btn--md": l.value,
        "fr-btn--lg": r.value,
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
      style: de(!s.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: v[0] || (v[0] = (h) => p.onClick ? p.onClick(h) : () => {
      })
    }, [
      p.icon && !s.value ? (i(), V(le, se(H({ key: 0 }, u.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", Vn, [
        N(g(p.label) + " ", 1),
        M(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Nn));
  }
}), Ee = /* @__PURE__ */ re(Rn, [["__scopeId", "data-v-77b13897"]]), Ge = /* @__PURE__ */ A({
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
  setup(t) {
    const e = t, a = q(null), n = y(() => ["sm", "small"].includes(e.size)), l = y(() => ["md", "medium"].includes(e.size)), r = y(() => ["lg", "large"].includes(e.size)), o = y(() => ["always", "", !0].includes(e.inlineLayoutWhen)), s = y(() => ["sm", "small"].includes(e.inlineLayoutWhen)), d = y(() => ["md", "medium"].includes(e.inlineLayoutWhen)), u = y(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = y(() => e.align === "center"), v = y(() => e.align === "right"), h = q("auto"), I = y(() => `--equisized-width: ${h.value};`), x = async () => {
      var P;
      let m = 0;
      await new Promise((w) => setTimeout(w, 100)), (P = a.value) == null || P.querySelectorAll(".fr-btn").forEach((w) => {
        const T = w, O = T.offsetWidth, E = window.getComputedStyle(T), z = +E.marginLeft.replace("px", ""), k = +E.marginRight.replace("px", "");
        T.style.width = "var(--equisized-width)";
        const j = O + z + k;
        j > m && (m = j);
      }), h.value = `${m}px`;
    };
    return oe(async () => {
      !a.value || !e.equisized || await x();
    }), (P, m) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: de(I.value),
      class: L(["fr-btns-group", {
        "fr-btns-group--equisized": P.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": l.value,
        "fr-btns-group--lg": r.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || d.value,
        "fr-btns-group--inline-lg": o.value || u.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": v.value,
        "fr-btns-group--icon-right": P.iconRight,
        "fr-btns-group--inline-reverse": P.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f($, null, Q(P.buttons, ({ onClick: w, ...T }, O) => (i(), f("li", { key: O }, [
        X(Ee, H({ ref_for: !0 }, T, { onClick: w }), null, 16, ["onClick"])
      ]))), 128)),
      M(P.$slots, "default")
    ], 6));
  }
}), jn = { class: "fr-callout__text" }, On = /* @__PURE__ */ A({
  __name: "DsfrCallout",
  props: {
    title: {},
    content: {},
    titleTag: { default: "h3" },
    button: { default: () => {
    } },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = y(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), n = y(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : { ...e.icon ?? {} });
    return (l, r) => (i(), f("div", {
      class: L(["fr-callout", { [String(l.icon)]: a.value }])
    }, [
      l.icon && n.value ? (i(), V(le, se(H({ key: 0 }, n.value)), null, 16)) : b("", !0),
      l.title ? (i(), V(ne(l.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: G(() => [
          N(g(l.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      c("p", jn, g(l.content), 1),
      l.button ? (i(), V(Ee, se(H({ key: 2 }, l.button)), null, 16)) : b("", !0),
      M(l.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), $n = /* @__PURE__ */ re(On, [["__scopeId", "data-v-a34b4ad8"]]), it = /* @__PURE__ */ A({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = y(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = y(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, r) => (i(), f("p", {
      class: L(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
    }, [
      l.icon && !a.value ? (i(), V(le, se(H({ key: 0 }, n.value)), null, 16)) : b("", !0),
      M(l.$slots, "default")
    ], 2));
  }
}), qn = { class: "fr-card__body" }, Hn = { class: "fr-card__content" }, zn = ["href"], Qn = { class: "fr-card__desc" }, Gn = {
  key: 0,
  class: "fr-card__start"
}, Kn = {
  key: 1,
  class: "fr-card__end"
}, Wn = {
  key: 0,
  class: "fr-card__footer"
}, Xn = {
  key: 1,
  class: "fr-links-group"
}, Un = ["href"], Yn = {
  key: 0,
  class: "fr-card__header"
}, Zn = {
  key: 0,
  class: "fr-card__img"
}, Jn = ["src", "alt"], er = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, tr = /* @__PURE__ */ A({
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
  setup(t, { expose: e }) {
    const a = t, n = y(() => ["sm", "small"].includes(a.size)), l = y(() => ["lg", "large"].includes(a.size)), r = y(() => ["sm", "small"].includes(a.imgRatio)), o = y(() => ["lg", "large"].includes(a.imgRatio)), s = y(() => typeof a.link == "string" && a.link.startsWith("http")), d = q(null);
    return e({ goToTargetLink: () => {
      var u;
      ((u = d.value) == null ? void 0 : u.querySelector(".fr-card__link")).click();
    } }), (u, p) => {
      const v = ie("RouterLink");
      return i(), f("div", {
        class: L(["fr-card", {
          "fr-card--horizontal": u.horizontal,
          "fr-enlarge-link": !u.noArrow,
          "fr-card--sm": n.value,
          "fr-card--lg": l.value,
          "fr-card--horizontal-tier": r.value,
          "fr-card--horizontal-half": o.value,
          "fr-card--download": u.download,
          "fr-enlarge-button": u.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        c("div", qn, [
          c("div", Hn, [
            (i(), V(ne(u.titleTag), { class: "fr-card__title" }, {
              default: G(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: u.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, g(u.title), 9, zn)) : u.link ? (i(), V(v, {
                  key: 1,
                  to: u.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (h) => h.stopPropagation())
                }, {
                  default: G(() => [
                    N(g(u.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f($, { key: 2 }, [
                  N(g(u.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Qn, g(u.description), 1),
            u.$slots["start-details"] || u.detail ? (i(), f("div", Gn, [
              M(u.$slots, "start-details"),
              u.detail ? (i(), V(it, {
                key: 0,
                icon: u.detailIcon
              }, {
                default: G(() => [
                  N(g(u.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0),
            u.$slots["end-details"] || u.endDetail ? (i(), f("div", Kn, [
              M(u.$slots, "end-details"),
              u.endDetail ? (i(), V(it, {
                key: 0,
                icon: u.endDetailIcon
              }, {
                default: G(() => [
                  N(g(u.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0)
          ]),
          u.buttons.length || u.linksGroup.length ? (i(), f("div", Wn, [
            u.buttons.length ? (i(), V(Ge, {
              key: 0,
              buttons: u.buttons,
              "inline-layout-when": "always",
              size: u.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            u.linksGroup.length ? (i(), f("ul", Xn, [
              (i(!0), f($, null, Q(u.linksGroup, (h, I) => (i(), f("li", {
                key: `card-link-${I}`
              }, [
                h.to ? (i(), V(v, {
                  key: 0,
                  to: h.to
                }, {
                  default: G(() => [
                    N(g(h.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: h.link || h.href,
                  class: L(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": l.value
                  }])
                }, g(h.label), 11, Un))
              ]))), 128))
            ])) : b("", !0)
          ])) : b("", !0)
        ]),
        u.imgSrc || u.badges.length ? (i(), f("div", Yn, [
          u.imgSrc ? (i(), f("div", Zn, [
            c("img", {
              src: u.imgSrc,
              class: "fr-responsive-img",
              alt: u.altImg,
              "data-testid": "card-img"
            }, null, 8, Jn)
          ])) : b("", !0),
          u.badges.length ? (i(), f("ul", er, [
            (i(!0), f($, null, Q(u.badges, (h, I) => (i(), f("li", { key: I }, [
              X(ra, H({ ref_for: !0 }, h), null, 16)
            ]))), 128))
          ])) : b("", !0)
        ])) : b("", !0)
      ], 2);
    };
  }
}), ar = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], lr = ["for"], nr = {
  key: 0,
  class: "required"
}, rr = {
  key: 0,
  class: "fr-hint-text"
}, or = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, wt = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ De({
    id: { default: () => Y("basic", "checkbox") },
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
  setup(t) {
    const e = t, a = y(() => e.errorMessage || e.validMessage), n = y(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = ce(t, "modelValue");
    return (r, o) => (i(), f("div", {
      class: L(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: L(["fr-checkbox-group", {
          "fr-checkbox-group--error": r.errorMessage,
          "fr-checkbox-group--valid": !r.errorMessage && r.validMessage,
          "fr-checkbox-group--sm": r.small
        }])
      }, [
        me(c("input", H({
          id: r.id,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => l.value = s),
          name: r.name,
          type: "checkbox",
          value: r.value,
          checked: l.value === !0 || Array.isArray(l.value) && l.value.includes(r.value),
          required: r.required
        }, r.$attrs, {
          "data-testid": `input-checkbox-${r.id}`,
          "data-test": `input-checkbox-${r.id}`
        }), null, 16, ar), [
          [ft, l.value]
        ]),
        c("label", {
          for: r.id,
          class: "fr-label"
        }, [
          M(r.$slots, "label", {}, () => [
            N(g(r.label) + " ", 1),
            M(r.$slots, "required-tip", {}, () => [
              r.required ? (i(), f("span", nr, " *")) : b("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", rr, g(r.hint), 1)) : b("", !0)
        ], 8, lr),
        a.value ? (i(), f("div", or, [
          c("p", {
            class: L(["fr-message--info flex items-center", n.value])
          }, g(a.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), ir = { class: "fr-form-group" }, sr = ["disabled", "aria-labelledby", "aria-invalid", "role"], dr = ["id"], ur = {
  key: 0,
  class: "required"
}, cr = ["id"], fr = /* @__PURE__ */ A({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ De({
    titleId: { default: () => Y("checkbox", "group") },
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
  setup(t) {
    const e = t, a = y(() => e.errorMessage || e.validMessage), n = y(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = y(() => a.value ? `${e.titleId} messages-${e.titleId}` : e.titleId), r = ce(t, "modelValue");
    return (o, s) => (i(), f("div", ir, [
      c("fieldset", {
        class: L(["fr-fieldset", {
          "fr-fieldset--error": o.errorMessage,
          "fr-fieldset--valid": !o.errorMessage && o.validMessage
        }]),
        disabled: o.disabled,
        "aria-labelledby": l.value,
        "aria-invalid": o.ariaInvalid,
        role: o.errorMessage || o.validMessage ? "group" : void 0
      }, [
        c("legend", {
          id: o.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          M(o.$slots, "legend", {}, () => [
            N(g(o.legend) + " ", 1),
            M(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", ur, " *")) : b("", !0)
            ])
          ])
        ], 8, dr),
        M(o.$slots, "default", {}, () => [
          (i(!0), f($, null, Q(o.options, (d) => (i(), V(wt, {
            id: d.id,
            key: d.id || d.name,
            modelValue: r.value,
            "onUpdate:modelValue": s[0] || (s[0] = (u) => r.value = u),
            value: d.value,
            name: d.name,
            label: d.label,
            disabled: d.disabled,
            "aria-disabled": d.disabled,
            small: o.small,
            inline: o.inline,
            hint: d.hint
          }, null, 8, ["id", "modelValue", "value", "name", "label", "disabled", "aria-disabled", "small", "inline", "hint"]))), 128))
        ]),
        a.value ? (i(), f("div", {
          key: 0,
          id: `messages-${o.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          c("p", {
            class: L(["fr-message--info flex items-center", n.value])
          }, [
            c("span", null, g(a.value), 1)
          ], 2)
        ], 8, cr)) : b("", !0)
      ], 10, sr)
    ]));
  }
}), pr = { class: "fr-consent-banner__content" }, vr = { class: "fr-text--sm" }, mr = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, gr = /* @__PURE__ */ A({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = y(() => typeof e.url == "string" && e.url.startsWith("http")), n = y(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = y(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (r, o) => (i(), f($, null, [
      c("div", pr, [
        c("p", vr, [
          M(r.$slots, "default", {}, () => [
            o[4] || (o[4] = N(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), V(ne(n.value), H(l.value, { "data-testid": "link" }), {
              default: G(() => o[3] || (o[3] = [
                N(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = N(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", mr, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = K((s) => r.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = K((s) => r.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = K((s) => r.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), br = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, hr = { class: "fr-pagination__list" }, yr = ["href", "title", "disabled", "aria-disabled"], kr = ["href", "title", "disabled", "aria-disabled"], _r = ["href", "title", "aria-current", "onClick"], wr = { key: 0 }, xr = { key: 1 }, Ir = ["href", "title", "disabled", "aria-disabled"], Dr = ["href", "title", "disabled", "aria-disabled"], Cr = /* @__PURE__ */ A({
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = y(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), r = y(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), o = y(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, r.value + 1) : a.pages), s = (x) => n("update:current-page", x), d = (x) => s(x), u = () => d(0), p = () => d(Math.max(0, a.currentPage - 1)), v = () => d(Math.min(a.pages.length - 1, a.currentPage + 1)), h = () => d(a.pages.length - 1), I = (x) => a.pages.indexOf(x) === a.currentPage;
    return (x, P) => {
      var m, w, T, O;
      return i(), f("nav", br, [
        c("ul", hr, [
          c("li", null, [
            c("a", {
              href: (m = x.pages[0]) == null ? void 0 : m.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: x.firstPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: P[0] || (P[0] = K((E) => u(), ["prevent"]))
            }, null, 8, yr)
          ]),
          c("li", null, [
            c("a", {
              href: (w = x.pages[Math.max(x.currentPage - 1, 0)]) == null ? void 0 : w.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: x.prevPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: P[1] || (P[1] = K((E) => p(), ["prevent"]))
            }, g(x.prevPageTitle), 9, kr)
          ]),
          (i(!0), f($, null, Q(o.value, (E, z) => (i(), f("li", { key: z }, [
            c("a", {
              href: E == null ? void 0 : E.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: E.title,
              "aria-current": I(E) ? "page" : void 0,
              onClick: K((k) => d(x.pages.indexOf(E)), ["prevent"])
            }, [
              o.value.indexOf(E) === 0 && l.value > 0 ? (i(), f("span", wr, "...")) : b("", !0),
              N(" " + g(E.label) + " ", 1),
              o.value.indexOf(E) === o.value.length - 1 && r.value < x.pages.length - 1 ? (i(), f("span", xr, "...")) : b("", !0)
            ], 8, _r)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (T = x.pages[Math.min(x.currentPage + 1, x.pages.length - 1)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: x.nextPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: P[2] || (P[2] = K((E) => v(), ["prevent"]))
            }, g(x.nextPageTitle), 9, Ir)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (O = x.pages.at(-1)) == null ? void 0 : O.href,
              title: x.lastPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: P[3] || (P[3] = K((E) => h(), ["prevent"]))
            }, null, 8, Dr)
          ])
        ])
      ]);
    };
  }
}), _a = /* @__PURE__ */ re(Cr, [["__scopeId", "data-v-4dfa8248"]]), Tr = { class: "fr-table" }, Br = { class: "fr-table__wrapper" }, Er = { class: "fr-table__container" }, Sr = { class: "fr-table__content" }, Ar = ["id"], Mr = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Fr = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Lr = ["id", "checked"], Pr = ["for"], Nr = ["tabindex", "onClick", "onKeydown"], Vr = { key: 0 }, Rr = { key: 1 }, jr = ["data-row-key"], Or = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, $r = { class: "fr-checkbox-group fr-checkbox-group--sm" }, qr = ["id", "value"], Hr = ["for"], zr = ["onKeydown"], Qr = { class: "flex gap-2 items-center" }, Gr = ["selected"], Kr = ["value", "selected"], Wr = { class: "flex ml-1" }, Xr = { class: "self-center" }, Ur = /* @__PURE__ */ A({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ De({
    id: { default: () => Y("table") },
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
    currentPage: { default: 1 },
    currentPageModifiers: {},
    sortedBy: { default: void 0 },
    sortedByModifiers: {},
    sortedDesc: { default: !1 },
    sortedDescModifiers: {}
  }),
  emits: /* @__PURE__ */ De(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(t, { emit: e }) {
    const a = t, n = e, l = ce(t, "selection"), r = ce(t, "rowsPerPage"), o = ce(t, "currentPage"), s = y(() => Math.ceil(a.rows.length / r.value)), d = y(() => a.pages ?? Array.from({ length: s.value }).map((k, j) => ({ label: `${j + 1}`, title: `Page ${j + 1}`, href: `#${j + 1}` }))), u = y(() => o.value * r.value), p = y(() => (o.value + 1) * r.value);
    function v(k, j) {
      const B = a.sorted;
      return (k[B] ?? k) < (j[B] ?? j) ? -1 : (k[B] ?? k) > (j[B] ?? j) ? 1 : 0;
    }
    const h = ce(t, "sortedBy"), I = ce(t, "sortedDesc");
    function x(k) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(k))) {
        if (h.value === k) {
          if (I.value) {
            h.value = void 0, I.value = !1;
            return;
          }
          I.value = !0;
          return;
        }
        I.value = !1, h.value = k;
      }
    }
    const P = y(() => {
      const k = h.value ? a.rows.slice().sort(a.sortFn ?? v) : a.rows.slice();
      return I.value && k.reverse(), k;
    }), m = y(() => {
      const k = a.headersRow.map((B) => typeof B != "object" ? B : B.key), j = P.value.map((B) => Array.isArray(B) ? B : k.map((W) => typeof B != "object" ? B : B[W] ?? B));
      return a.pagination ? j.slice(u.value, p.value) : j;
    });
    function w(k) {
      if (k) {
        const j = a.headersRow.findIndex((B) => B.key ?? B);
        l.value = m.value.map((B) => B[j]);
      }
      l.value.length = 0;
    }
    const T = q(!1);
    function O() {
      T.value = l.value.length === m.value.length;
    }
    function E() {
      n("update:current-page", 0), T.value = !1, l.value.length = 0;
    }
    function z(k) {
      navigator.clipboard.writeText(k);
    }
    return (k, j) => (i(), f("div", Tr, [
      c("div", Br, [
        c("div", Er, [
          c("div", Sr, [
            c("table", { id: k.id }, [
              c("caption", null, g(k.title), 1),
              c("thead", null, [
                c("tr", null, [
                  k.selectableRows ? (i(), f("th", Mr, [
                    c("div", Fr, [
                      c("input", {
                        id: `table-select--${k.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: j[0] || (j[0] = (B) => w(B.target.checked))
                      }, null, 40, Lr),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${k.id}-all`
                      }, " Sélectionner tout ", 8, Pr)
                    ])
                  ])) : b("", !0),
                  (i(!0), f($, null, Q(k.headersRow, (B, W) => (i(), f("th", H({
                    key: typeof B == "object" ? B.key : B,
                    scope: "col",
                    ref_for: !0
                  }, typeof B == "object" && B.headerAttrs, {
                    tabindex: k.sortableRows ? 0 : void 0,
                    onClick: (_) => x(B.key ?? (Array.isArray(k.rows[0]) ? W : B)),
                    onKeydown: [
                      J((_) => x(B.key ?? B), ["enter"]),
                      J((_) => x(B.key ?? B), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: L({ "sortable-header": k.sortableRows === !0 || Array.isArray(k.sortableRows) && k.sortableRows.includes(B.key ?? B) })
                    }, [
                      M(k.$slots, "header", H({ ref_for: !0 }, typeof B == "object" ? B : { key: B, label: B }), () => [
                        N(g(typeof B == "object" ? B.label : B), 1)
                      ], !0),
                      h.value !== (B.key ?? B) && (k.sortableRows === !0 || Array.isArray(k.sortableRows) && k.sortableRows.includes(B.key ?? B)) ? (i(), f("span", Vr, [
                        X(le, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : h.value === (B.key ?? B) ? (i(), f("span", Rr, [
                        X(le, {
                          name: I.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Nr))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f($, null, Q(m.value, (B, W) => (i(), f("tr", {
                  key: `row-${W}`,
                  "data-row-key": W + 1
                }, [
                  k.selectableRows ? (i(), f("th", Or, [
                    c("div", $r, [
                      me(c("input", {
                        id: `row-select-${k.id}-${W}`,
                        "onUpdate:modelValue": j[1] || (j[1] = (_) => l.value = _),
                        value: k.rows[W][k.rowKey] ?? `row-${W}`,
                        type: "checkbox",
                        onChange: j[2] || (j[2] = (_) => O())
                      }, null, 40, qr), [
                        [ft, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${k.id}-${W}`
                      }, " Sélectionner la ligne " + g(W + 1), 9, Hr)
                    ])
                  ])) : b("", !0),
                  (i(!0), f($, null, Q(B, (_, D) => (i(), f("td", {
                    key: typeof _ == "object" ? _[k.rowKey] : _,
                    tabindex: "0",
                    onKeydown: [
                      J(K((C) => z(typeof _ == "object" ? _[k.rowKey] : _), ["ctrl"]), ["c"]),
                      J(K((C) => z(typeof _ == "object" ? _[k.rowKey] : _), ["meta"]), ["c"])
                    ]
                  }, [
                    M(k.$slots, "cell", H({ ref_for: !0 }, {
                      colKey: typeof k.headersRow[D] == "object" ? k.headersRow[D].key : k.headersRow[D],
                      cell: _
                    }), () => [
                      N(g(typeof _ == "object" ? _[k.rowKey] : _), 1)
                    ], !0)
                  ], 40, zr))), 128))
                ], 8, jr))), 128))
              ])
            ], 8, Ar)
          ])
        ])
      ]),
      c("div", {
        class: L(k.bottomActionBarClass)
      }, [
        M(k.$slots, "pagination", {}, () => [
          k.pagination && !k.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: L(["flex justify-between items-center", k.paginationWrapperClass])
          }, [
            c("div", Qr, [
              j[6] || (j[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              me(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": j[3] || (j[3] = (B) => r.value = B),
                class: "fr-select",
                onChange: j[4] || (j[4] = (B) => E())
              }, [
                c("option", {
                  value: "",
                  selected: !k.paginationOptions.includes(r.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Gr),
                (i(!0), f($, null, Q(k.paginationOptions, (B, W) => (i(), f("option", {
                  key: W,
                  value: B,
                  selected: +B === r.value
                }, g(B), 9, Kr))), 128))
              ], 544), [
                [na, r.value]
              ])
            ]),
            c("div", Wr, [
              c("span", Xr, "Page " + g(o.value + 1) + " sur " + g(s.value), 1)
            ]),
            X(_a, {
              "current-page": o.value,
              "onUpdate:currentPage": j[5] || (j[5] = (B) => o.value = B),
              pages: d.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Yr = /* @__PURE__ */ re(Ur, [["__scopeId", "data-v-1d55e1f1"]]), Zr = "data:image/png;base64,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", Jr = { class: "fr-container flex" }, eo = { class: "half" }, to = { class: "fr-h1" }, ao = { class: "flex fr-my-md-3w" }, lo = { class: "fr-h6" }, no = /* @__PURE__ */ A({
  __name: "DsfrErrorPage",
  props: {
    title: { default: "Page non trouvée" },
    subtitle: { default: "Erreur 404" },
    description: { default: "La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée." },
    help: { default: "Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est correcte. La page n'est peut être plus disponible." },
    buttons: { default: void 0 }
  },
  setup(t) {
    return (e, a) => {
      var n;
      return i(), f("div", Jr, [
        c("div", eo, [
          c("h1", to, g(e.title), 1),
          c("span", ao, g(e.subtitle), 1),
          c("p", lo, g(e.description), 1),
          c("p", null, g(e.help), 1),
          (n = e.buttons) != null && n.length ? (i(), V(Ge, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : b("", !0),
          M(e.$slots, "default", {}, void 0, !0)
        ]),
        a[0] || (a[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: Zr
          })
        ], -1))
      ]);
    };
  }
}), ro = /* @__PURE__ */ re(no, [["__scopeId", "data-v-0f6cf5b4"]]), oo = { class: "fr-fieldset" }, io = ["id"], so = {
  key: 1,
  class: "fr-fieldset__element"
}, uo = { class: "fr-fieldset__element" }, co = /* @__PURE__ */ A({
  __name: "DsfrFieldset",
  props: {
    legend: { default: "" },
    legendClass: { default: "" },
    legendId: { default: "" },
    hint: { default: "" },
    hintClass: { default: "" }
  },
  setup(t) {
    return (e, a) => {
      var n, l, r, o;
      return i(), f("fieldset", oo, [
        e.legend || (l = (n = e.$slots).legend) != null && l.call(n).length ? (i(), f("legend", {
          key: 0,
          id: e.legendId,
          class: L(["fr-fieldset__legend", e.legendClass])
        }, [
          N(g(e.legend) + " ", 1),
          M(e.$slots, "legend")
        ], 10, io)) : b("", !0),
        e.hint || (o = (r = e.$slots).hint) != null && o.call(r).length ? (i(), f("div", so, [
          c("span", {
            class: L(["fr-hint-text", e.hintClass])
          }, [
            N(g(e.hint) + " ", 1),
            M(e.$slots, "hint")
          ], 2)
        ])) : b("", !0),
        c("div", uo, [
          M(e.$slots, "default")
        ])
      ]);
    };
  }
}), fo = ["href", "download"], po = { class: "fr-link__detail" }, wa = /* @__PURE__ */ A({
  __name: "DsfrFileDownload",
  props: {
    title: { default: "Télécharger le document" },
    format: { default: "JPEG" },
    size: { default: "250 Ko" },
    href: { default: "#" },
    download: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("a", {
      href: e.href,
      download: e.download,
      class: "fr-link fr-link--download"
    }, [
      N(g(e.title) + " ", 1),
      c("span", po, g(e.format) + " – " + g(e.size), 1)
    ], 8, fo));
  }
}), vo = { class: "fr-downloads-group fr-downloads-group--bordered" }, mo = {
  key: 0,
  class: "fr-downloads-group__title"
}, go = /* @__PURE__ */ A({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", vo, [
      e.title ? (i(), f("h4", mo, g(e.title), 1)) : b("", !0),
      c("ul", null, [
        (i(!0), f($, null, Q(e.files, (n, l) => (i(), f("li", { key: l }, [
          X(wa, {
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
}), bo = ["for"], ho = {
  key: 0,
  class: "required"
}, yo = {
  key: 1,
  class: "fr-hint-text"
}, ko = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], _o = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, wo = ["id"], xo = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => Y("file-upload") },
    label: { default: "Ajouter un fichier" },
    accept: { default: void 0 },
    hint: { default: "" },
    error: { default: "" },
    validMessage: { default: "" },
    disabled: { type: Boolean },
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = (o) => {
      var s, d;
      n("update:modelValue", (s = o.target) == null ? void 0 : s.value), n("change", (d = o.target) == null ? void 0 : d.files);
    }, r = y(() => Array.isArray(a.accept) ? a.accept.join(",") : a.accept);
    return (o, s) => (i(), f("div", {
      class: L(["fr-upload-group", {
        "fr-upload-group--error": o.error,
        "fr-upload-group--valid": o.validMessage,
        "fr-upload-group--disabled": o.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: o.id
      }, [
        N(g(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", ho, " *")) : b("", !0),
        o.hint ? (i(), f("span", yo, g(o.hint), 1)) : b("", !0)
      ], 8, bo),
      c("input", H({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: r.value,
        onChange: s[0] || (s[0] = (d) => l(d))
      }), null, 16, ko),
      o.error || o.validMessage ? (i(), f("div", _o, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, g(o.error ?? o.validMessage), 9, wo)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Io = { class: "fr-follow__newsletter" }, Do = { class: "fr-h5 fr-follow__title" }, Co = { class: "fr-text--sm fr-follow__desc" }, To = { key: 0 }, Bo = ["title"], Eo = { key: 1 }, So = { action: "" }, Ao = {
  class: "fr-label",
  for: "newsletter-email"
}, Mo = { class: "fr-input-wrap fr-input-wrap--addon" }, Fo = ["title", "placeholder", "value"], Lo = ["title"], Po = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, No = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Vo = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, xa = /* @__PURE__ */ A({
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
  setup(t, { emit: e }) {
    const a = e, n = (l) => a("update:email", l.target.value);
    return (l, r) => (i(), f("div", Io, [
      c("div", null, [
        c("h3", Do, g(l.title), 1),
        c("p", Co, g(l.description), 1)
      ]),
      l.onlyCallout ? (i(), f("div", To, [
        c("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: r[0] || (r[0] = (o) => l.buttonAction ? l.buttonAction(o) : () => {
          })
        }, g(l.buttonText), 9, Bo)
      ])) : (i(), f("div", Eo, [
        c("form", So, [
          c("label", Ao, g(l.labelEmail), 1),
          c("div", Mo, [
            c("input", {
              id: "newsletter-email",
              class: "fr-input",
              "aria-describedby": "fr-newsletter-hint-text",
              title: l.inputTitle || l.labelEmail,
              placeholder: l.placeholder || l.labelEmail,
              type: "email",
              name: "newsletter-email",
              value: l.email,
              autocomplete: "email",
              onInput: r[1] || (r[1] = (o) => n(o))
            }, null, 40, Fo),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, g(l.buttonText), 9, Lo)
          ]),
          l.error ? (i(), f("div", Po, [
            c("p", No, g(l.error), 1)
          ])) : b("", !0),
          c("p", Vo, g(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), Ro = { class: "fr-follow__social" }, jo = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Oo = ["title", "href"], Ia = /* @__PURE__ */ A({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Ro, [
      (i(), V(ne(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: G(() => a[0] || (a[0] = [
          N(" Suivez-nous "),
          c("br", null, null, -1),
          N(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (i(), f("ul", jo, [
        (i(!0), f($, null, Q(e.networks, (n, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: L(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, g(n.name), 11, Oo)
        ]))), 128))
      ])) : b("", !0)
    ]));
  }
}), $o = { class: "fr-follow" }, qo = { class: "fr-container" }, Ho = { class: "fr-grid-row" }, zo = /* @__PURE__ */ A({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = y(() => e.networks && e.networks.length), n = y(() => typeof e.newsletterData == "object");
    return (l, r) => (i(), f("div", $o, [
      c("div", qo, [
        c("div", Ho, [
          M(l.$slots, "default", {}, () => [
            l.newsletterData ? (i(), f("div", {
              key: 0,
              class: L(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              X(xa, se(pt(l.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            a.value ? (i(), f("div", {
              key: 1,
              class: L(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              X(Ia, { networks: l.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ht = 1, Da = /* @__PURE__ */ A({
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
  setup(t) {
    const e = t, a = y(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("http");
    }), n = y(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("mailto");
    }), l = y(() => e.button ? "button" : a.value || n.value ? "a" : "RouterLink"), r = y(() => {
      if (!(!a.value && !n.value))
        return e.href;
    }), o = y(() => {
      if (!(a.value || n.value))
        return e.to;
    }), s = y(() => o.value ? { to: o.value } : { href: r.value }), d = y(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = y(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Ht, ...e.iconAttrs ?? {} } : { scale: Ht, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, v) => (i(), V(ne(l.value), H({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": d.value && p.iconRight,
        "fr-btn--icon-left": d.value && !p.iconRight,
        [String(p.icon)]: d.value
      }]
    }, s.value, {
      target: p.target,
      onClick: K(p.onClick, ["stop"])
    }), {
      default: G(() => {
        var h, I;
        return [
          !d.value && (p.icon || (h = p.iconAttrs) != null && h.name) && !p.iconRight ? (i(), V(le, H({
            key: 0,
            class: "fr-mr-1w"
          }, u.value), null, 16)) : b("", !0),
          N(" " + g(p.label) + " ", 1),
          !d.value && (p.icon || (I = p.iconAttrs) != null && I.name) && p.iconRight ? (i(), V(le, H({
            key: 1,
            class: "fr-ml-1w"
          }, u.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Qo = { class: "fr-footer__partners" }, Go = {
  key: 0,
  class: "fr-footer__partners-title"
}, Ko = { class: "fr-footer__partners-logos" }, Wo = {
  key: 0,
  class: "fr-footer__partners-main"
}, Xo = ["href"], Uo = ["src", "alt"], Yo = { class: "fr-footer__partners-sub" }, Zo = ["href"], Jo = ["src", "alt"], Ca = /* @__PURE__ */ A({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Qo, [
      e.title ? (i(), f("h4", Go, g(e.title), 1)) : b("", !0),
      c("div", Ko, [
        e.mainPartner ? (i(), f("div", Wo, [
          c("a", {
            class: "fr-footer__partners-link",
            href: e.mainPartner.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, [
            c("img", {
              class: "fr-footer__logo",
              src: e.mainPartner.logo,
              alt: e.mainPartner.name
            }, null, 8, Uo)
          ], 8, Xo)
        ])) : b("", !0),
        c("div", Yo, [
          c("ul", null, [
            (i(!0), f($, null, Q(e.subPartners, (n, l) => (i(), f("li", { key: l }, [
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
                }, null, 8, Jo)
              ], 8, Zo)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), ei = ["innerHTML"], Ne = /* @__PURE__ */ A({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(t) {
    const e = t, a = y(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (n, l) => (i(), f("p", {
      class: L(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: a.value
    }, null, 10, ei));
  }
}), ti = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, ai = {
  key: 0,
  class: "fr-footer__top"
}, li = { class: "fr-container" }, ni = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, ri = { class: "fr-container" }, oi = { class: "fr-footer__body" }, ii = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, si = ["href"], di = ["src", "alt"], ui = ["src", "alt"], ci = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, fi = { class: "fr-footer__content" }, pi = { class: "fr-footer__content-desc" }, vi = { class: "fr-footer__content-list" }, mi = ["href", "title"], gi = { class: "fr-footer__bottom" }, bi = { class: "fr-footer__bottom-list" }, hi = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, yi = /* @__PURE__ */ A({
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
    mandatoryLinks: { default: (t) => [
      {
        label: `Accessibilité : ${t.a11yCompliance}`,
        to: t.a11yComplianceLink
      },
      {
        label: "Mentions légales",
        to: t.legalLink,
        "data-testid": "/mentions-legales"
      },
      {
        label: "Données personnelles",
        to: t.personalDataLink
      },
      {
        label: "Gestion des cookies",
        to: t.cookiesLink
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
  setup(t) {
    const e = t, a = y(() => [
      ...e.beforeMandatoryLinks,
      ...e.mandatoryLinks,
      ...e.afterMandatoryLinks
    ]), n = la(), l = y(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n).length;
    }), r = y(() => {
      const p = e.licenceTo || e.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = y(() => {
      const { to: p, href: v, ...h } = e.licenceLinkProps ?? {};
      return h;
    }), s = y(() => r.value ? "" : e.licenceTo), d = y(() => r.value ? e.licenceTo : ""), u = y(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (p, v) => {
      const h = ie("RouterLink");
      return i(), f("footer", ti, [
        l.value ? (i(), f("div", ai, [
          c("div", li, [
            c("div", ni, [
              M(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : b("", !0),
        c("div", ri, [
          c("div", oi, [
            p.operatorImgSrc ? (i(), f("div", ii, [
              X(Ne, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              u.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: de(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, di)
              ], 8, si)) : (i(), V(h, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: G(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: de(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, ui)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", ci, [
              X(h, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: G(() => [
                  X(Ne, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", fi, [
              c("p", pi, [
                M(p.$slots, "description", {}, () => [
                  N(g(p.descText), 1)
                ], !0)
              ]),
              c("ul", vi, [
                (i(!0), f($, null, Q(p.ecosystemLinks, ({ href: I, label: x, title: P, ...m }, w) => (i(), f("li", {
                  key: w,
                  class: "fr-footer__content-item"
                }, [
                  c("a", H({
                    class: "fr-footer__content-link",
                    href: I,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: P,
                    ref_for: !0
                  }, m), g(x), 17, mi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), V(Ca, se(H({ key: 0 }, p.partners)), null, 16)) : b("", !0),
          c("div", gi, [
            c("ul", bi, [
              (i(!0), f($, null, Q(a.value, (I, x) => (i(), f("li", {
                key: x,
                class: "fr-footer__bottom-item"
              }, [
                X(Da, H({ ref_for: !0 }, I), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", hi, [
              c("p", null, [
                N(g(p.licenceText) + " ", 1),
                (i(), V(ne(r.value ? "a" : "RouterLink"), H({
                  class: "fr-link-licence no-content-after",
                  to: r.value ? void 0 : s.value,
                  href: r.value ? d.value : void 0,
                  target: r.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: G(() => [
                    N(g(p.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target"]))
              ])
            ])) : b("", !0)
          ])
        ])
      ]);
    };
  }
}), ki = /* @__PURE__ */ re(yi, [["__scopeId", "data-v-4d6f52aa"]]), _i = { class: "fr-footer__top-cat" }, wi = { class: "fr-footer__top-list" }, xi = ["href"], Ii = /* @__PURE__ */ A({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const n = ie("RouterLink");
      return i(), f("div", null, [
        c("h3", _i, g(e.categoryName), 1),
        c("ul", wi, [
          (i(!0), f($, null, Q(e.links, (l, r) => (i(), f("li", { key: r }, [
            typeof l.to == "string" && l.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: l.to
            }, g(l.label), 9, xi)) : b("", !0),
            typeof l.to == "object" || typeof l.to == "string" && !l.to.startsWith("http") ? (i(), V(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: l.to
            }, {
              default: G(() => [
                N(g(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : b("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Di = { class: "fr-connect-group" }, Ci = { class: "fr-connect__brand" }, Ti = ["href", "title"], Bi = /* @__PURE__ */ A({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", Di, [
      c("button", {
        class: L(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        a[0] || (a[0] = c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        c("span", Ci, "FranceConnect" + g(e.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, g(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, Ti)
      ])
    ]));
  }
}), Ei = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Si = { class: "fr-nav__item" }, Ai = ["aria-controls", "aria-expanded"], Mi = { class: "fr-hidden-lg" }, Fi = ["id"], Li = { class: "fr-menu__list" }, Pi = ["hreflang", "lang", "aria-current", "href", "onClick"], st = /* @__PURE__ */ A({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => Y("translate") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const a = t, n = e, {
      collapse: l,
      collapsing: r,
      cssExpanded: o,
      doExpand: s,
      onTransitionEnd: d
    } = pe(), u = q(!1);
    function p(h) {
      u.value = !1, n("select", h);
    }
    const v = y(
      () => a.languages.find(({ codeIso: h }) => h === a.currentLanguage)
    );
    return ae(u, (h, I) => {
      h !== I && s(h);
    }), (h, I) => {
      var x, P;
      return i(), f("nav", Ei, [
        c("div", Si, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": h.id,
            "aria-expanded": u.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: I[0] || (I[0] = K((m) => u.value = !u.value, ["prevent", "stop"]))
          }, [
            N(g((x = v.value) == null ? void 0 : x.codeIso.toUpperCase()), 1),
            c("span", Mi, " - " + g((P = v.value) == null ? void 0 : P.label), 1)
          ], 8, Ai),
          c("div", {
            id: h.id,
            ref_key: "collapse",
            ref: l,
            class: L(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": F(o), "fr-collapsing": F(r) }]),
            onTransitionend: I[1] || (I[1] = (m) => F(d)(u.value))
          }, [
            c("ul", Li, [
              (i(!0), f($, null, Q(h.languages, (m, w) => (i(), f("li", { key: w }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: m.codeIso,
                  lang: m.codeIso,
                  "aria-current": h.currentLanguage === m.codeIso ? !0 : void 0,
                  href: `#${m.codeIso}`,
                  onClick: K((T) => p(m), ["prevent", "stop"])
                }, g(`${m.codeIso.toUpperCase()} - ${m.label}`), 9, Pi)
              ]))), 128))
            ])
          ], 42, Fi)
        ])
      ]);
    };
  }
}), Ni = ["for"], Vi = {
  key: 0,
  class: "required"
}, Ri = {
  key: 0,
  class: "fr-hint-text"
}, ji = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => Y("basic", "input") },
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
  setup(t, { expose: e }) {
    const a = t, n = il(), l = q(null), r = () => {
      var u;
      return (u = l.value) == null ? void 0 : u.focus();
    }, o = y(() => a.isTextarea ? "textarea" : "input"), s = y(() => a.isWithWrapper || n.type === "date" || !!a.wrapperClass), d = y(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: r
    }), (u, p) => (i(), f($, null, [
      c("label", {
        class: L(d.value),
        for: u.id
      }, [
        M(u.$slots, "label", {}, () => [
          N(g(u.label) + " ", 1),
          M(u.$slots, "required-tip", {}, () => [
            "required" in u.$attrs && u.$attrs.required !== !1 ? (i(), f("span", Vi, "*")) : b("", !0)
          ], !0)
        ], !0),
        u.hint ? (i(), f("span", Ri, g(u.hint), 1)) : b("", !0)
      ], 10, Ni),
      s.value ? (i(), f("div", {
        key: 1,
        class: L([
          { "fr-input-wrap": u.isWithWrapper || u.$attrs.type === "date" },
          u.wrapperClass
        ])
      }, [
        (i(), V(ne(o.value), H({ id: u.id }, u.$attrs, {
          ref_key: "__input",
          ref: l,
          class: ["fr-input", {
            "fr-input--error": u.isInvalid,
            "fr-input--valid": u.isValid
          }],
          value: u.modelValue,
          "aria-describedby": u.descriptionId || void 0,
          onInput: p[1] || (p[1] = (v) => u.$emit("update:modelValue", v.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (i(), V(ne(o.value), H({
        key: 0,
        id: u.id
      }, u.$attrs, {
        ref_key: "__input",
        ref: l,
        class: ["fr-input", {
          "fr-input--error": u.isInvalid,
          "fr-input--valid": u.isValid
        }],
        value: u.modelValue,
        "aria-describedby": u.descriptionId || void 0,
        onInput: p[0] || (p[0] = (v) => u.$emit("update:modelValue", v.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), xt = /* @__PURE__ */ re(ji, [["__scopeId", "data-v-6e6c295a"]]), dt = /* @__PURE__ */ A({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => Y("search", "input") },
    label: { default: "" },
    labelVisible: { type: Boolean },
    large: { type: Boolean },
    buttonText: { default: "" },
    modelValue: { default: "" },
    placeholder: { default: "Rechercher" },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "search"],
  setup(t, { emit: e }) {
    const a = e;
    return (n, l) => (i(), f("div", {
      class: L(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      X(xt, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        "label-visible": n.labelVisible,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": l[0] || (l[0] = (r) => a("update:modelValue", r)),
        onKeydown: l[1] || (l[1] = J((r) => a("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      X(Ee, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: l[2] || (l[2] = (r) => a("search", n.modelValue))
      }, {
        default: G(() => [
          N(g(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), zt = 1, Ta = /* @__PURE__ */ A({
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
    path: { default: "" },
    class: {}
  },
  setup(t) {
    const e = t, a = y(() => typeof e.path == "string"), n = y(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("http")) || a.value && e.path.startsWith("http") || typeof e.to == "string" && e.to.startsWith("http");
    }), l = y(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("mailto")) || a.value && e.path.startsWith("mailto") || typeof e.to == "string" && e.to.startsWith("mailto");
    }), r = y(() => e.button ? "button" : n.value || l.value ? "a" : "RouterLink"), o = y(() => {
      if (!(!n.value && !l.value))
        return e.to ?? e.href ?? e.path;
    }), s = y(() => {
      if (!(n.value || l.value))
        return e.to ?? e.path;
    }), d = y(() => s.value ? { to: s.value } : { href: o.value }), u = y(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = y(
      () => typeof e.icon == "string" ? { name: e.icon, scale: zt, ...e.iconAttrs ?? {} } : { scale: zt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (v, h) => (i(), V(ne(r.value), H({
      class: ["fr-btn", {
        "fr-btn--icon-right": u.value && v.iconRight,
        "fr-btn--icon-left": u.value && !v.iconRight,
        [String(v.icon)]: u.value
      }]
    }, d.value, {
      target: v.target,
      onClick: h[0] || (h[0] = K((I) => v.onClick(I), ["stop"]))
    }), {
      default: G(() => {
        var I, x;
        return [
          !u.value && (v.icon || (I = v.iconAttrs) != null && I.name) && !v.iconRight ? (i(), V(le, H({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          N(" " + g(v.label) + " ", 1),
          !u.value && (v.icon || (x = v.iconAttrs) != null && x.name) && v.iconRight ? (i(), V(le, H({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Oi = ["aria-label"], $i = { class: "fr-btns-group" }, ut = /* @__PURE__ */ A({
  __name: "DsfrHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(t, { emit: e }) {
    const a = e;
    return (n, l) => (i(), f("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      c("ul", $i, [
        (i(!0), f($, null, Q(n.links, (r, o) => (i(), f("li", { key: o }, [
          X(Ta, H({ ref_for: !0 }, r, {
            "on-click": (s) => {
              var d;
              a("linkClick", s), (d = r.onClick) == null || d.call(r, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Oi));
  }
}), qi = {
  role: "banner",
  class: "fr-header"
}, Hi = { class: "fr-header__body" }, zi = { class: "fr-container width-inherit" }, Qi = { class: "fr-header__body-row" }, Gi = { class: "fr-header__brand fr-enlarge-link" }, Ki = { class: "fr-header__brand-top" }, Wi = { class: "fr-header__logo" }, Xi = {
  key: 0,
  class: "fr-header__operator"
}, Ui = ["src", "alt"], Yi = {
  key: 1,
  class: "fr-header__navbar"
}, Zi = ["aria-label", "title", "data-fr-opened"], Ji = ["aria-label", "title"], es = {
  key: 0,
  class: "fr-header__service"
}, ts = { class: "fr-header__service-title" }, as = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, ls = {
  key: 0,
  class: "fr-header__service-tagline"
}, ns = {
  key: 1,
  class: "fr-header__service"
}, rs = { class: "fr-header__tools" }, os = {
  key: 0,
  class: "fr-header__tools-links"
}, is = {
  key: 1,
  class: "fr-header__search fr-modal"
}, ss = ["aria-label"], ds = { class: "fr-container" }, us = { class: "fr-header__menu-links" }, cs = { role: "navigation" }, fs = {
  key: 1,
  class: "flex justify-center items-center"
}, ps = { class: "fr-header__menu fr-modal" }, vs = {
  key: 0,
  class: "fr-container"
}, ms = /* @__PURE__ */ A({
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
    menuModalLabel: { default: "Menu modal" },
    closeMenuModalLabel: { default: "Fermer" },
    homeLabel: { default: "Accueil" }
  },
  emits: ["update:modelValue", "search", "language-select"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = $e(a, "languageSelector"), r = q(!1), o = q(!1), s = q(!1), d = () => {
      var m;
      s.value = !1, r.value = !1, o.value = !1, (m = document.getElementById("button-menu")) == null || m.focus();
    }, u = (m) => {
      m.key === "Escape" && d();
    };
    oe(() => {
      document.addEventListener("keydown", u);
    }), fe(() => {
      document.removeEventListener("keydown", u);
    });
    const p = () => {
      var m;
      s.value = !0, r.value = !0, o.value = !1, (m = document.getElementById("close-button")) == null || m.focus();
    }, v = () => {
      s.value = !0, r.value = !1, o.value = !0;
    }, h = d, I = la(), x = y(() => {
      var m;
      return !!((m = I.operator) != null && m.call(I).length) || !!a.operatorImgSrc;
    }), P = y(() => !!I.mainnav);
    return Ce(mt, () => d), (m, w) => {
      var T, O, E;
      const z = ie("RouterLink");
      return i(), f("header", qi, [
        c("div", Hi, [
          c("div", zi, [
            c("div", Qi, [
              c("div", Gi, [
                c("div", Ki, [
                  c("div", Wi, [
                    X(z, {
                      to: m.homeTo,
                      title: `${m.homeLabel} - ${m.serviceTitle}`
                    }, {
                      default: G(() => [
                        X(Ne, {
                          "logo-text": m.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  x.value ? (i(), f("div", Xi, [
                    M(m.$slots, "operator", {}, () => [
                      m.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: m.operatorImgSrc,
                        alt: m.operatorImgAlt,
                        style: de(m.operatorImgStyle)
                      }, null, 12, Ui)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  m.showSearch || P.value || (T = m.quickLinks) != null && T.length ? (i(), f("div", Yi, [
                    m.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": m.showSearchLabel,
                      title: m.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: w[0] || (w[0] = K((k) => v(), ["prevent", "stop"]))
                    }, null, 8, Zi)) : b("", !0),
                    P.value || (O = m.quickLinks) != null && O.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": m.menuLabel,
                      title: m.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: w[1] || (w[1] = K((k) => p(), ["prevent", "stop"]))
                    }, null, 8, Ji)) : b("", !0)
                  ])) : b("", !0)
                ]),
                m.serviceTitle ? (i(), f("div", es, [
                  X(z, H({
                    to: m.homeTo,
                    title: `${m.homeLabel} - ${m.serviceTitle}`
                  }, m.$attrs), {
                    default: G(() => [
                      c("p", ts, [
                        N(g(m.serviceTitle) + " ", 1),
                        m.showBeta ? (i(), f("span", as, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  m.serviceDescription ? (i(), f("p", ls, g(m.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !m.serviceTitle && m.showBeta ? (i(), f("div", ns, w[9] || (w[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", rs, [
                (E = m.quickLinks) != null && E.length || l.value ? (i(), f("div", os, [
                  r.value ? b("", !0) : (i(), V(ut, {
                    key: 0,
                    links: m.quickLinks,
                    "nav-aria-label": m.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (i(), V(st, H({ key: 1 }, l.value, {
                    onSelect: w[2] || (w[2] = (k) => n("language-select", k))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                m.showSearch ? (i(), f("div", is, [
                  X(dt, {
                    "searchbar-id": m.searchbarId,
                    label: m.searchLabel,
                    "model-value": m.modelValue,
                    placeholder: m.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": w[3] || (w[3] = (k) => n("update:modelValue", k)),
                    onSearch: w[4] || (w[4] = (k) => n("search", k))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ]),
            m.showSearch || P.value || m.quickLinks && m.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: L(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": m.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", ds, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: w[5] || (w[5] = K((k) => d(), ["prevent", "stop"]))
                }, g(m.closeMenuModalLabel), 1),
                c("div", us, [
                  l.value ? (i(), V(st, H({ key: 0 }, l.value, {
                    onSelect: w[6] || (w[6] = (k) => l.value.currentLanguage = k.codeIso)
                  }), null, 16)) : b("", !0),
                  c("nav", cs, [
                    r.value ? (i(), V(ut, {
                      key: 0,
                      role: "navigation",
                      links: m.quickLinks,
                      "nav-aria-label": m.quickLinksAriaLabel,
                      onLinkClick: F(h)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0)
                  ])
                ]),
                s.value ? M(m.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : b("", !0),
                o.value ? (i(), f("div", fs, [
                  X(dt, {
                    "searchbar-id": m.searchbarId,
                    "model-value": m.modelValue,
                    placeholder: m.placeholder,
                    "onUpdate:modelValue": w[7] || (w[7] = (k) => n("update:modelValue", k)),
                    onSearch: w[8] || (w[8] = (k) => n("search", k))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, ss)) : b("", !0),
            M(m.$slots, "default")
          ])
        ]),
        c("div", ps, [
          P.value && !s.value ? (i(), f("div", vs, [
            M(m.$slots, "mainnav", { hidemodal: d })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), gs = /* @__PURE__ */ A({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", {
      class: L(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      c("p", {
        class: L({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        N(g(e.text) + " ", 1),
        M(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), bs = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, hs = ["id", "data-testid"], ys = ["id", "data-testid"], ks = ["id", "data-testid"], _s = ["id", "data-testid"], ws = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => Y("basic", "input") },
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
  setup(t) {
    return (e, a) => (i(), f("div", {
      class: L(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      M(e.$slots, "before-input"),
      M(e.$slots, "default"),
      e.$slots.default ? b("", !0) : (i(), V(xt, H({ key: 0 }, e.$attrs, {
        "is-valid": !!e.validMessage,
        "is-invalid": !!e.errorMessage,
        label: e.label,
        hint: e.hint,
        "description-id": (e.errorMessage || e.validMessage) && e.descriptionId || void 0,
        "label-visible": e.labelVisible,
        "model-value": e.modelValue,
        placeholder: e.placeholder,
        "onUpdate:modelValue": a[0] || (a[0] = (n) => e.$emit("update:modelValue", n))
      }), null, 16, ["is-valid", "is-invalid", "label", "hint", "description-id", "label-visible", "model-value", "placeholder"])),
      c("div", bs, [
        Array.isArray(e.errorMessage) ? (i(!0), f($, { key: 0 }, Q(e.errorMessage, (n) => (i(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, g(n), 9, hs))), 128)) : e.errorMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, g(e.errorMessage), 9, ys)) : b("", !0),
        Array.isArray(e.validMessage) ? (i(!0), f($, { key: 2 }, Q(e.validMessage, (n) => (i(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, g(n), 9, ks))), 128)) : e.validMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, g(e.validMessage), 9, _s)) : b("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var Ba = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Ve = /* @__PURE__ */ Ba.join(","), Ea = typeof Element > "u", be = Ea ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Re = !Ea && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, je = function t(e, a) {
  var n;
  a === void 0 && (a = !0);
  var l = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), r = l === "" || l === "true", o = r || a && e && t(e.parentNode);
  return o;
}, xs = function(t) {
  var e, a = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return a === "" || a === "true";
}, Sa = function(t, e, a) {
  if (je(t))
    return [];
  var n = Array.prototype.slice.apply(t.querySelectorAll(Ve));
  return e && be.call(t, Ve) && n.unshift(t), n = n.filter(a), n;
}, Aa = function t(e, a, n) {
  for (var l = [], r = Array.from(e); r.length; ) {
    var o = r.shift();
    if (!je(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), d = s.length ? s : o.children, u = t(d, !0, n);
        n.flatten ? l.push.apply(l, u) : l.push({
          scopeParent: o,
          candidates: u
        });
      } else {
        var p = be.call(o, Ve);
        p && n.filter(o) && (a || !e.includes(o)) && l.push(o);
        var v = o.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(o), h = !je(v, !1) && (!n.shadowRootFilter || n.shadowRootFilter(o));
        if (v && h) {
          var I = t(v === !0 ? o.children : v.children, !0, n);
          n.flatten ? l.push.apply(l, I) : l.push({
            scopeParent: o,
            candidates: I
          });
        } else
          r.unshift.apply(r, o.children);
      }
  }
  return l;
}, Ma = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, ve = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || xs(t)) && !Ma(t) ? 0 : t.tabIndex;
}, Is = function(t, e) {
  var a = ve(t);
  return a < 0 && e && !Ma(t) ? 0 : a;
}, Ds = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, Fa = function(t) {
  return t.tagName === "INPUT";
}, Cs = function(t) {
  return Fa(t) && t.type === "hidden";
}, Ts = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return e;
}, Bs = function(t, e) {
  for (var a = 0; a < t.length; a++)
    if (t[a].checked && t[a].form === e)
      return t[a];
}, Es = function(t) {
  if (!t.name)
    return !0;
  var e = t.form || Re(t), a = function(r) {
    return e.querySelectorAll('input[type="radio"][name="' + r + '"]');
  }, n;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    n = a(window.CSS.escape(t.name));
  else
    try {
      n = a(t.name);
    } catch (r) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", r.message), !1;
    }
  var l = Bs(n, t.form);
  return !l || l === t;
}, Ss = function(t) {
  return Fa(t) && t.type === "radio";
}, As = function(t) {
  return Ss(t) && !Es(t);
}, Ms = function(t) {
  var e, a = t && Re(t), n = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var r, o, s;
    for (l = !!((r = n) !== null && r !== void 0 && (o = r.ownerDocument) !== null && o !== void 0 && o.contains(n) || t != null && (s = t.ownerDocument) !== null && s !== void 0 && s.contains(t)); !l && n; ) {
      var d, u, p;
      a = Re(n), n = (d = a) === null || d === void 0 ? void 0 : d.host, l = !!((u = n) !== null && u !== void 0 && (p = u.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return l;
}, Qt = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, n = e.height;
  return a === 0 && n === 0;
}, Fs = function(t, e) {
  var a = e.displayCheck, n = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = be.call(t, "details>summary:first-of-type"), r = l ? t.parentElement : t;
  if (be.call(r, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof n == "function") {
      for (var o = t; t; ) {
        var s = t.parentElement, d = Re(t);
        if (s && !s.shadowRoot && n(s) === !0)
          return Qt(t);
        t.assignedSlot ? t = t.assignedSlot : !s && d !== t.ownerDocument ? t = d.host : t = s;
      }
      t = o;
    }
    if (Ms(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Qt(t);
  return !1;
}, Ls = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var a = 0; a < e.children.length; a++) {
          var n = e.children.item(a);
          if (n.tagName === "LEGEND")
            return be.call(e, "fieldset[disabled] *") ? !0 : !n.contains(t);
        }
        return !0;
      }
      e = e.parentElement;
    }
  return !1;
}, Oe = function(t, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  je(e) || Cs(e) || Fs(e, t) || // For a details element with a summary, the summary element gets the focus
  Ts(e) || Ls(e));
}, ct = function(t, e) {
  return !(As(e) || ve(e) < 0 || !Oe(t, e));
}, Ps = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, Ns = function t(e) {
  var a = [], n = [];
  return e.forEach(function(l, r) {
    var o = !!l.scopeParent, s = o ? l.scopeParent : l, d = Is(s, o), u = o ? t(l.candidates) : s;
    d === 0 ? o ? a.push.apply(a, u) : a.push(s) : n.push({
      documentOrder: r,
      tabIndex: d,
      item: l,
      isScope: o,
      content: u
    });
  }), n.sort(Ds).reduce(function(l, r) {
    return r.isScope ? l.push.apply(l, r.content) : l.push(r.content), l;
  }, []).concat(a);
}, Vs = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Aa([t], e.includeContainer, {
    filter: ct.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: Ps
  }) : a = Sa(t, e.includeContainer, ct.bind(null, e)), Ns(a);
}, Rs = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Aa([t], e.includeContainer, {
    filter: Oe.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = Sa(t, e.includeContainer, Oe.bind(null, e)), a;
}, ye = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return be.call(t, Ve) === !1 ? !1 : ct(e, t);
}, js = /* @__PURE__ */ Ba.concat("iframe").join(","), Ze = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return be.call(t, js) === !1 ? !1 : Oe(e, t);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Gt(t, e) {
  var a = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(l) {
      return Object.getOwnPropertyDescriptor(t, l).enumerable;
    })), a.push.apply(a, n);
  }
  return a;
}
function Kt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Gt(Object(a), !0).forEach(function(n) {
      Os(t, n, a[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Gt(Object(a)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(a, n));
    });
  }
  return t;
}
function Os(t, e, a) {
  return e = qs(e), e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function $s(t, e) {
  if (typeof t != "object" || t === null) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var n = a.call(t, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function qs(t) {
  var e = $s(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
var Wt = {
  activateTrap: function(t, e) {
    if (t.length > 0) {
      var a = t[t.length - 1];
      a !== e && a.pause();
    }
    var n = t.indexOf(e);
    n === -1 || t.splice(n, 1), t.push(e);
  },
  deactivateTrap: function(t, e) {
    var a = t.indexOf(e);
    a !== -1 && t.splice(a, 1), t.length > 0 && t[t.length - 1].unpause();
  }
}, Hs = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, zs = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, Ie = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, Qs = function(t) {
  return Ie(t) && !t.shiftKey;
}, Gs = function(t) {
  return Ie(t) && t.shiftKey;
}, Xt = function(t) {
  return setTimeout(t, 0);
}, Ut = function(t, e) {
  var a = -1;
  return t.every(function(n, l) {
    return e(n) ? (a = l, !1) : !0;
  }), a;
}, we = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    a[n - 1] = arguments[n];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, Me = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, Ks = [], Ws = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, n = (e == null ? void 0 : e.trapStack) || Ks, l = Kt({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Qs,
    isKeyBackward: Gs
  }, e), r = {
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
  }, o, s = function(_, D, C) {
    return _ && _[D] !== void 0 ? _[D] : l[C || D];
  }, d = function(_, D) {
    var C = typeof (D == null ? void 0 : D.composedPath) == "function" ? D.composedPath() : void 0;
    return r.containerGroups.findIndex(function(S) {
      var R = S.container, U = S.tabbableNodes;
      return R.contains(_) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (C == null ? void 0 : C.includes(R)) || U.find(function(Z) {
        return Z === _;
      });
    });
  }, u = function(_) {
    var D = l[_];
    if (typeof D == "function") {
      for (var C = arguments.length, S = new Array(C > 1 ? C - 1 : 0), R = 1; R < C; R++)
        S[R - 1] = arguments[R];
      D = D.apply(void 0, S);
    }
    if (D === !0 && (D = void 0), !D) {
      if (D === void 0 || D === !1)
        return D;
      throw new Error("`".concat(_, "` was specified but was not a node, or did not return a node"));
    }
    var U = D;
    if (typeof D == "string" && (U = a.querySelector(D), !U))
      throw new Error("`".concat(_, "` as selector refers to no known node"));
    return U;
  }, p = function() {
    var _ = u("initialFocus");
    if (_ === !1)
      return !1;
    if (_ === void 0 || !Ze(_, l.tabbableOptions))
      if (d(a.activeElement) >= 0)
        _ = a.activeElement;
      else {
        var D = r.tabbableGroups[0], C = D && D.firstTabbableNode;
        _ = C || u("fallbackFocus");
      }
    if (!_)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return _;
  }, v = function() {
    if (r.containerGroups = r.containers.map(function(_) {
      var D = Vs(_, l.tabbableOptions), C = Rs(_, l.tabbableOptions), S = D.length > 0 ? D[0] : void 0, R = D.length > 0 ? D[D.length - 1] : void 0, U = C.find(function(te) {
        return ye(te);
      }), Z = C.slice().reverse().find(function(te) {
        return ye(te);
      }), ee = !!D.find(function(te) {
        return ve(te) > 0;
      });
      return {
        container: _,
        tabbableNodes: D,
        focusableNodes: C,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ee,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: S,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: R,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: U,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: Z,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(te) {
          var he = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, _e = D.indexOf(te);
          return _e < 0 ? he ? C.slice(C.indexOf(te) + 1).find(function(ue) {
            return ye(ue);
          }) : C.slice(0, C.indexOf(te)).reverse().find(function(ue) {
            return ye(ue);
          }) : D[_e + (he ? 1 : -1)];
        }
      };
    }), r.tabbableGroups = r.containerGroups.filter(function(_) {
      return _.tabbableNodes.length > 0;
    }), r.tabbableGroups.length <= 0 && !u("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (r.containerGroups.find(function(_) {
      return _.posTabIndexesFound;
    }) && r.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, h = function _(D) {
    var C = D.activeElement;
    if (C)
      return C.shadowRoot && C.shadowRoot.activeElement !== null ? _(C.shadowRoot) : C;
  }, I = function _(D) {
    if (D !== !1 && D !== h(document)) {
      if (!D || !D.focus) {
        _(p());
        return;
      }
      D.focus({
        preventScroll: !!l.preventScroll
      }), r.mostRecentlyFocusedNode = D, Hs(D) && D.select();
    }
  }, x = function(_) {
    var D = u("setReturnFocus", _);
    return D || (D === !1 ? !1 : _);
  }, P = function(_) {
    var D = _.target, C = _.event, S = _.isBackward, R = S === void 0 ? !1 : S;
    D = D || Me(C), v();
    var U = null;
    if (r.tabbableGroups.length > 0) {
      var Z = d(D, C), ee = Z >= 0 ? r.containerGroups[Z] : void 0;
      if (Z < 0)
        R ? U = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : U = r.tabbableGroups[0].firstTabbableNode;
      else if (R) {
        var te = Ut(r.tabbableGroups, function(We) {
          var Xe = We.firstTabbableNode;
          return D === Xe;
        });
        if (te < 0 && (ee.container === D || Ze(D, l.tabbableOptions) && !ye(D, l.tabbableOptions) && !ee.nextTabbableNode(D, !1)) && (te = Z), te >= 0) {
          var he = te === 0 ? r.tabbableGroups.length - 1 : te - 1, _e = r.tabbableGroups[he];
          U = ve(D) >= 0 ? _e.lastTabbableNode : _e.lastDomTabbableNode;
        } else Ie(C) || (U = ee.nextTabbableNode(D, !1));
      } else {
        var ue = Ut(r.tabbableGroups, function(We) {
          var Xe = We.lastTabbableNode;
          return D === Xe;
        });
        if (ue < 0 && (ee.container === D || Ze(D, l.tabbableOptions) && !ye(D, l.tabbableOptions) && !ee.nextTabbableNode(D)) && (ue = Z), ue >= 0) {
          var tl = ue === r.tabbableGroups.length - 1 ? 0 : ue + 1, Ct = r.tabbableGroups[tl];
          U = ve(D) >= 0 ? Ct.firstTabbableNode : Ct.firstDomTabbableNode;
        } else Ie(C) || (U = ee.nextTabbableNode(D));
      }
    } else
      U = u("fallbackFocus");
    return U;
  }, m = function(_) {
    var D = Me(_);
    if (!(d(D, _) >= 0)) {
      if (we(l.clickOutsideDeactivates, _)) {
        o.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: l.returnFocusOnDeactivate
        });
        return;
      }
      we(l.allowOutsideClick, _) || _.preventDefault();
    }
  }, w = function(_) {
    var D = Me(_), C = d(D, _) >= 0;
    if (C || D instanceof Document)
      C && (r.mostRecentlyFocusedNode = D);
    else {
      _.stopImmediatePropagation();
      var S, R = !0;
      if (r.mostRecentlyFocusedNode)
        if (ve(r.mostRecentlyFocusedNode) > 0) {
          var U = d(r.mostRecentlyFocusedNode), Z = r.containerGroups[U].tabbableNodes;
          if (Z.length > 0) {
            var ee = Z.findIndex(function(te) {
              return te === r.mostRecentlyFocusedNode;
            });
            ee >= 0 && (l.isKeyForward(r.recentNavEvent) ? ee + 1 < Z.length && (S = Z[ee + 1], R = !1) : ee - 1 >= 0 && (S = Z[ee - 1], R = !1));
          }
        } else
          r.containerGroups.some(function(te) {
            return te.tabbableNodes.some(function(he) {
              return ve(he) > 0;
            });
          }) || (R = !1);
      else
        R = !1;
      R && (S = P({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(r.recentNavEvent)
      })), I(S || r.mostRecentlyFocusedNode || p());
    }
    r.recentNavEvent = void 0;
  }, T = function(_) {
    var D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = _;
    var C = P({
      event: _,
      isBackward: D
    });
    C && (Ie(_) && _.preventDefault(), I(C));
  }, O = function(_) {
    if (zs(_) && we(l.escapeDeactivates, _) !== !1) {
      _.preventDefault(), o.deactivate();
      return;
    }
    (l.isKeyForward(_) || l.isKeyBackward(_)) && T(_, l.isKeyBackward(_));
  }, E = function(_) {
    var D = Me(_);
    d(D, _) >= 0 || we(l.clickOutsideDeactivates, _) || we(l.allowOutsideClick, _) || (_.preventDefault(), _.stopImmediatePropagation());
  }, z = function() {
    if (r.active)
      return Wt.activateTrap(n, o), r.delayInitialFocusTimer = l.delayInitialFocus ? Xt(function() {
        I(p());
      }) : I(p()), a.addEventListener("focusin", w, !0), a.addEventListener("mousedown", m, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", m, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", E, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", O, {
        capture: !0,
        passive: !1
      }), o;
  }, k = function() {
    if (r.active)
      return a.removeEventListener("focusin", w, !0), a.removeEventListener("mousedown", m, !0), a.removeEventListener("touchstart", m, !0), a.removeEventListener("click", E, !0), a.removeEventListener("keydown", O, !0), o;
  }, j = function(_) {
    var D = _.some(function(C) {
      var S = Array.from(C.removedNodes);
      return S.some(function(R) {
        return R === r.mostRecentlyFocusedNode;
      });
    });
    D && I(p());
  }, B = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(j) : void 0, W = function() {
    B && (B.disconnect(), r.active && !r.paused && r.containers.map(function(_) {
      B.observe(_, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return o = {
    get active() {
      return r.active;
    },
    get paused() {
      return r.paused;
    },
    activate: function(_) {
      if (r.active)
        return this;
      var D = s(_, "onActivate"), C = s(_, "onPostActivate"), S = s(_, "checkCanFocusTrap");
      S || v(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = a.activeElement, D == null || D();
      var R = function() {
        S && v(), z(), W(), C == null || C();
      };
      return S ? (S(r.containers.concat()).then(R, R), this) : (R(), this);
    },
    deactivate: function(_) {
      if (!r.active)
        return this;
      var D = Kt({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, _);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, k(), r.active = !1, r.paused = !1, W(), Wt.deactivateTrap(n, o);
      var C = s(D, "onDeactivate"), S = s(D, "onPostDeactivate"), R = s(D, "checkCanReturnFocus"), U = s(D, "returnFocus", "returnFocusOnDeactivate");
      C == null || C();
      var Z = function() {
        Xt(function() {
          U && I(x(r.nodeFocusedBeforeActivation)), S == null || S();
        });
      };
      return U && R ? (R(x(r.nodeFocusedBeforeActivation)).then(Z, Z), this) : (Z(), this);
    },
    pause: function(_) {
      if (r.paused || !r.active)
        return this;
      var D = s(_, "onPause"), C = s(_, "onPostPause");
      return r.paused = !0, D == null || D(), k(), W(), C == null || C(), this;
    },
    unpause: function(_) {
      if (!r.paused || !r.active)
        return this;
      var D = s(_, "onUnpause"), C = s(_, "onPostUnpause");
      return r.paused = !1, D == null || D(), v(), z(), W(), C == null || C(), this;
    },
    updateContainerElements: function(_) {
      var D = [].concat(_).filter(Boolean);
      return r.containers = D.map(function(C) {
        return typeof C == "string" ? a.querySelector(C) : C;
      }), r.active && v(), W(), this;
    }
  }, o.updateContainerElements(t), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Xs = {
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
}, Us = A({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, Xs),
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
  setup(t, { slots: e, emit: a }) {
    let n;
    const l = q(null), r = y(() => {
      const s = l.value;
      return s && (s instanceof HTMLElement ? s : s.$el);
    });
    function o() {
      return n || (n = Ws(r.value, {
        escapeDeactivates: t.escapeDeactivates,
        allowOutsideClick: t.allowOutsideClick,
        returnFocusOnDeactivate: t.returnFocusOnDeactivate,
        clickOutsideDeactivates: t.clickOutsideDeactivates,
        onActivate: () => {
          a("update:active", !0), a("activate");
        },
        onDeactivate: () => {
          a("update:active", !1), a("deactivate");
        },
        onPostActivate: () => a("postActivate"),
        onPostDeactivate: () => a("postDeactivate"),
        initialFocus: t.initialFocus,
        fallbackFocus: t.fallbackFocus,
        tabbableOptions: t.tabbableOptions,
        delayInitialFocus: t.delayInitialFocus,
        preventScroll: t.preventScroll
      }));
    }
    return oe(() => {
      ae(() => t.active, (s) => {
        s && r.value ? o().activate() : n && (n.deactivate(), (!r.value || r.value.nodeType === Node.COMMENT_NODE) && (n = null));
      }, { immediate: !0, flush: "post" });
    }), fe(() => {
      n && n.deactivate(), n = null;
    }), {
      activate() {
        o().activate();
      },
      deactivate() {
        n && n.deactivate();
      },
      renderImpl() {
        if (!e.default)
          return null;
        const s = e.default().filter((d) => d.type !== al);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : ll(s[0], { ref: l });
      }
    };
  }
}), Ys = ["aria-labelledby", "role", "open"], Zs = { class: "fr-container fr-container--fluid fr-container-md" }, Js = { class: "fr-grid-row fr-grid-row--center" }, ed = { class: "fr-modal__body" }, td = { class: "fr-modal__header" }, ad = ["title"], ld = { class: "fr-modal__content" }, nd = ["id"], rd = {
  key: 0,
  class: "fr-modal__footer"
}, Yt = 2, od = /* @__PURE__ */ A({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => Y("modal", "dialog") },
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = (x) => {
      x.key === "Escape" && v();
    }, r = y(() => a.isAlert ? "alertdialog" : "dialog"), o = q(null), s = q();
    ae(() => a.opened, (x) => {
      var P, m;
      x ? ((P = s.value) == null || P.showModal(), setTimeout(() => {
        var w;
        (w = o.value) == null || w.focus();
      }, 100)) : (m = s.value) == null || m.close(), d(x);
    });
    function d(x) {
      typeof window < "u" && document.body.classList.toggle("modal-open", x);
    }
    oe(() => {
      u(), d(a.opened);
    }), sl(() => {
      p(), d(!1);
    });
    function u() {
      document.addEventListener("keydown", l);
    }
    function p() {
      document.removeEventListener("keydown", l);
    }
    async function v() {
      var x;
      await aa(), (x = a.origin) == null || x.focus(), n("close");
    }
    const h = y(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), I = y(
      () => h.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: Yt } : { scale: Yt, ...a.icon ?? {} }
    );
    return (x, P) => x.opened ? (i(), V(F(Us), { key: 0 }, {
      default: G(() => {
        var m, w;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-labelledby": x.modalId,
            role: r.value,
            class: L(["fr-modal", { "fr-modal--opened": x.opened }]),
            open: x.opened
          }, [
            c("div", Zs, [
              c("div", Js, [
                c("div", {
                  class: L(["fr-col-12", {
                    "fr-col-md-8": x.size === "lg",
                    "fr-col-md-6": x.size === "md",
                    "fr-col-md-4": x.size === "sm"
                  }])
                }, [
                  c("div", ed, [
                    c("div", td, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: x.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: P[0] || (P[0] = (T) => v())
                      }, [
                        c("span", null, g(x.closeButtonLabel), 1)
                      ], 8, ad)
                    ]),
                    c("div", ld, [
                      c("h1", {
                        id: x.modalId,
                        class: "fr-modal__title"
                      }, [
                        h.value || I.value ? (i(), f("span", {
                          key: 0,
                          class: L({
                            [String(x.icon)]: h.value
                          })
                        }, [
                          x.icon && I.value ? (i(), V(le, se(H({ key: 0 }, I.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        N(" " + g(x.title), 1)
                      ], 8, nd),
                      M(x.$slots, "default", {}, void 0, !0)
                    ]),
                    (m = x.actions) != null && m.length || x.$slots.footer ? (i(), f("div", rd, [
                      M(x.$slots, "footer", {}, void 0, !0),
                      (w = x.actions) != null && w.length ? (i(), V(Ge, {
                        key: 0,
                        align: "right",
                        buttons: x.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : b("", !0)
                    ])) : b("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, Ys)
        ];
      }),
      _: 3
    })) : b("", !0);
  }
}), La = /* @__PURE__ */ re(od, [["__scopeId", "data-v-d11515b3"]]), id = ["id", "aria-current"], sd = /* @__PURE__ */ A({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => Y("nav", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-nav__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      M(e.$slots, "default", {}, void 0, !0)
    ], 8, id));
  }
}), Pa = /* @__PURE__ */ re(sd, [["__scopeId", "data-v-5909c19f"]]), dd = ["href"], Zt = 2, Ke = /* @__PURE__ */ A({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => Y("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, a = y(() => typeof e.to == "string" && e.to.startsWith("http")), n = y(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), l = y(
      () => n.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: Zt, name: e.icon } : { scale: Zt, ...e.icon || {} }
    ), r = nl() ? ke(mt) : void 0, o = (r == null ? void 0 : r()) ?? (() => {
    });
    return (s, d) => {
      const u = ie("RouterLink");
      return a.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: s.to,
        onClick: d[0] || (d[0] = (p) => {
          s.$emit("toggleId", s.id), s.onClick(p);
        })
      }, g(s.text), 9, dd)) : (i(), V(u, {
        key: 1,
        class: L(["fr-nav__link", {
          [String(s.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: d[1] || (d[1] = (p) => {
          var v;
          F(o)(), s.$emit("toggleId", s.id), (v = s.onClick) == null || v.call(s, p);
        })
      }, {
        default: G(() => [
          s.icon && l.value ? (i(), V(le, se(H({ key: 0 }, l.value)), null, 16)) : b("", !0),
          N(" " + g(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), ud = { class: "fr-col-12 fr-col-lg-3" }, cd = { class: "fr-mega-menu__category" }, fd = { class: "fr-mega-menu__list" }, Na = /* @__PURE__ */ A({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", ud, [
      c("h5", cd, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: a[0] || (a[0] = K(() => {
          }, ["prevent"]))
        }, g(e.title), 1)
      ]),
      c("ul", fd, [
        (i(!0), f($, null, Q(e.links, (n, l) => (i(), f("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          X(Ke, H({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), pd = ["aria-expanded", "aria-current", "aria-controls"], vd = ["id"], md = { class: "fr-container fr-container--fluid fr-container-lg" }, gd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, bd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, hd = { class: "fr-mega-menu__leader" }, yd = { class: "fr-h4 fr-mb-2v" }, kd = { class: "fr-hidden fr-displayed-lg" }, _d = /* @__PURE__ */ A({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => Y("menu") },
    title: {},
    description: { default: "" },
    link: { default: () => ({ to: "#", text: "Voir toute la rubrique" }) },
    menus: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: r,
      onTransitionEnd: o
    } = pe(), s = y(() => e.id === e.expandedId);
    return ae(s, (d, u) => {
      d !== u && r(d);
    }), oe(() => {
      s.value && r(!0);
    }), (d, u) => {
      const p = ie("RouterLink");
      return i(), f($, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": d.active || void 0,
          "aria-controls": d.id,
          onClick: u[0] || (u[0] = (v) => d.$emit("toggleId", d.id))
        }, g(d.title), 9, pd),
        c("div", {
          id: d.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: L(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": F(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(n)
          }]),
          tabindex: "-1",
          onTransitionend: u[2] || (u[2] = (v) => F(o)(s.value))
        }, [
          c("div", md, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: u[1] || (u[1] = (v) => d.$emit("toggleId", d.id))
            }, " Fermer "),
            c("div", gd, [
              c("div", bd, [
                c("div", hd, [
                  c("h4", yd, g(d.title), 1),
                  c("p", kd, [
                    N(g(d.description) + " ", 1),
                    M(d.$slots, "description", {}, void 0, !0)
                  ]),
                  X(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: d.link.to
                  }, {
                    default: G(() => [
                      N(g(d.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              M(d.$slots, "default", {}, void 0, !0),
              (i(!0), f($, null, Q(d.menus, (v, h) => (i(), V(Na, H({
                key: h,
                ref_for: !0
              }, v), null, 16))), 128))
            ])
          ])
        ], 42, vd)
      ], 64);
    };
  }
}), Va = /* @__PURE__ */ re(_d, [["__scopeId", "data-v-7e339b1d"]]), wd = ["id", "aria-current"], Ra = /* @__PURE__ */ A({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => Y("menu", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-menu__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      M(e.$slots, "default")
    ], 8, wd));
  }
}), xd = ["aria-expanded", "aria-current", "aria-controls"], Id = ["id"], Dd = { class: "fr-menu__list" }, ja = /* @__PURE__ */ A({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => Y("menu") },
    title: {},
    links: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: r,
      onTransitionEnd: o
    } = pe(), s = y(() => e.id === e.expandedId);
    return ae(s, (d, u) => {
      d !== u && r(d);
    }), oe(() => {
      s.value && r(!0);
    }), (d, u) => (i(), f($, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
        "aria-current": d.active || void 0,
        "aria-controls": d.id,
        onClick: u[0] || (u[0] = (p) => d.$emit("toggleId", d.id))
      }, [
        c("span", null, g(d.title), 1)
      ], 8, xd),
      c("div", {
        id: d.id,
        ref_key: "collapse",
        ref: a,
        class: L(["fr-collapse fr-menu", { "fr-collapse--expanded": F(l), "fr-collapsing": F(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: u[2] || (u[2] = (p) => F(o)(s.value))
      }, [
        c("ul", Dd, [
          M(d.$slots, "default"),
          (i(!0), f($, null, Q(d.links, (p, v) => (i(), V(Ra, { key: v }, {
            default: G(() => [
              X(Ke, H({ ref_for: !0 }, p, {
                onToggleId: u[1] || (u[1] = (h) => d.$emit("toggleId", d.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Id)
    ], 64));
  }
}), Cd = ["id", "aria-label"], Td = { class: "fr-nav__list" }, Bd = /* @__PURE__ */ A({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => Y("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(t) {
    const e = t, a = q(void 0), n = (s) => {
      if (s === a.value) {
        a.value = void 0;
        return;
      }
      a.value = s;
    }, l = (s) => {
      if (s !== document.getElementById(e.id)) {
        if (!(s != null && s.parentNode)) {
          n(a.value);
          return;
        }
        l(s.parentNode);
      }
    }, r = (s) => {
      l(s.target);
    }, o = (s) => {
      s.key === "Escape" && n(a.value);
    };
    return oe(() => {
      document.addEventListener("click", r), document.addEventListener("keydown", o);
    }), fe(() => {
      document.removeEventListener("click", r), document.removeEventListener("keydown", o);
    }), (s, d) => (i(), f("nav", {
      id: s.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": s.label
    }, [
      c("ul", Td, [
        M(s.$slots, "default"),
        (i(!0), f($, null, Q(s.navItems, (u, p) => (i(), V(Pa, { key: p }, {
          default: G(() => [
            u.to && u.text ? (i(), V(Ke, H({
              key: 0,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: d[0] || (d[0] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : u.title && u.links ? (i(), V(ja, H({
              key: 1,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: d[1] || (d[1] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : u.title && u.menus ? (i(), V(Va, H({
              key: 2,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: d[2] || (d[2] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, Cd));
  }
}), Ed = { class: "fr-container" }, Sd = { class: "fr-notice__body" }, Ad = { class: "fr-notice__title" }, Md = { class: "fr-notice__desc" }, Fd = /* @__PURE__ */ A({
  __name: "DsfrNotice",
  props: {
    title: { default: "" },
    desc: { default: "" },
    closeable: { type: Boolean },
    type: { default: "info" }
  },
  emits: ["close"],
  setup(t) {
    return (e, a) => (i(), f("div", {
      class: L(["fr-notice", `fr-notice--${e.type}`])
    }, [
      c("div", Ed, [
        c("div", Sd, [
          c("p", null, [
            c("span", Ad, [
              M(e.$slots, "default", {}, () => [
                N(g(e.title), 1)
              ])
            ]),
            c("span", Md, [
              M(e.$slots, "desc", {}, () => [
                N(g(e.desc), 1)
              ])
            ])
          ]),
          e.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: a[0] || (a[0] = (n) => e.$emit("close"))
          }, " Masquer le message ")) : b("", !0)
        ])
      ])
    ], 2));
  }
}), Ld = ["aria-label"], Pd = { class: "fr-content-media__img" }, Nd = ["src", "alt", "title", "ratio"], Vd = { class: "fr-content-media__caption" }, Rd = /* @__PURE__ */ A({
  __name: "DsfrPicture",
  props: {
    alt: { default: "" },
    legend: { default: "" },
    size: { default: "medium" },
    src: {},
    title: { default: "" },
    ratio: { default: "16x9" }
  },
  setup(t) {
    return (e, a) => (i(), f("figure", {
      class: L(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      c("div", Pd, [
        M(e.$slots, "default", {}, () => [
          e.src ? (i(), f("img", {
            key: 0,
            src: e.src,
            class: L(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, Nd)) : b("", !0)
        ])
      ]),
      c("figcaption", Vd, g(e.legend), 1)
    ], 10, Ld));
  }
}), jd = { class: "fr-quote fr-quote--column" }, Od = ["cite"], $d = { class: "fr-quote__author" }, qd = { class: "fr-quote__source" }, Hd = ["href"], zd = {
  key: 0,
  class: "fr-quote__image"
}, Qd = ["src"], Gd = /* @__PURE__ */ A({
  __name: "DsfrQuote",
  props: {
    quote: { default: void 0 },
    author: { default: void 0 },
    details: { default: () => [] },
    source: { default: "" },
    sourceUrl: { default: "" },
    quoteImage: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("figure", jd, [
      e.source ? (i(), f("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        c("p", null, "« " + g(e.quote) + " »", 1)
      ], 8, Od)) : b("", !0),
      c("figcaption", null, [
        c("p", $d, g(e.author), 1),
        c("ul", qd, [
          c("li", null, [
            c("cite", null, g(e.source), 1)
          ]),
          (i(!0), f($, null, Q(e.details, (n, l) => (i(), f("li", { key: l }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, g(n.label), 9, Hd)) : (i(), f($, { key: 1 }, [
              N(g(n), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (i(), f("div", zd, [
          c("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, Qd)
        ])) : b("", !0)
      ])
    ]));
  }
}), Kd = ["id", "name", "value", "checked", "disabled"], Wd = ["for"], Xd = {
  key: 0,
  class: "required"
}, Ud = {
  key: 0,
  class: "fr-hint-text"
}, Yd = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Zd = ["src", "title"], Jd = { key: 0 }, eu = ["href"], tu = ["href"], au = ["href"], Oa = /* @__PURE__ */ A({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => Y("basic", "radio") },
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
  setup(t) {
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = y(() => !!e.img || !!e.svgPath);
    return (l, r) => (i(), f("div", {
      class: L(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: L(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": l.small
        }])
      }, [
        c("input", H({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: r[0] || (r[0] = (o) => l.$emit("update:modelValue", l.value))
        }), null, 16, Kd),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          M(l.$slots, "label", {}, () => [
            N(g(l.label) + " ", 1),
            M(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (i(), f("span", Xd, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", Ud, g(l.hint), 1)) : b("", !0)
        ], 8, Wd),
        l.img || l.svgPath ? (i(), f("div", Yd, [
          l.img ? (i(), f("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: "",
            title: l.imgTitle
          }, null, 8, Zd)) : (i(), f("svg", H({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            l.imgTitle ? (i(), f("title", Jd, g(l.imgTitle), 1)) : b("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${l.svgPath}#artwork-decorative`
            }, null, 8, eu),
            c("use", {
              class: "fr-artwork-minor",
              href: `${l.svgPath}#artwork-minor`
            }, null, 8, tu),
            c("use", {
              class: "fr-artwork-major",
              href: `${l.svgPath}#artwork-major`
            }, null, 8, au)
          ], 16))
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), lu = { class: "fr-form-group" }, nu = ["disabled", "aria-labelledby", "aria-invalid", "role"], ru = ["id"], ou = {
  key: 0,
  class: "fr-hint-text"
}, iu = {
  key: 0,
  class: "required"
}, su = ["id"], du = /* @__PURE__ */ A({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => Y("radio-button", "group") },
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = y(() => a.errorMessage || a.validMessage), r = y(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (d) => {
      d !== a.modelValue && n("update:modelValue", d);
    }, s = y(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (d, u) => (i(), f("div", lu, [
      c("fieldset", {
        class: L(["fr-fieldset", {
          "fr-fieldset--error": d.errorMessage,
          "fr-fieldset--valid": d.validMessage
        }]),
        disabled: d.disabled,
        "aria-labelledby": s.value,
        "aria-invalid": d.ariaInvalid,
        role: d.errorMessage || d.validMessage ? "group" : void 0
      }, [
        d.legend || d.$slots.legend || d.hint || d.$slots.hint ? (i(), f("legend", {
          key: 0,
          id: d.titleId,
          class: "fr-fieldset__legend fr-fieldset__legend--regular"
        }, [
          M(d.$slots, "legend", {}, () => [
            N(g(d.legend) + " ", 1),
            d.hint || d.$slots.hint ? (i(), f("span", ou, [
              M(d.$slots, "hint", {}, () => [
                N(g(d.hint), 1)
              ])
            ])) : b("", !0),
            M(d.$slots, "required-tip", {}, () => [
              d.required ? (i(), f("span", iu, " *")) : b("", !0)
            ])
          ])
        ], 8, ru)) : b("", !0),
        M(d.$slots, "default", {}, () => [
          (i(!0), f($, null, Q(d.options, (p, v) => (i(), V(Oa, H({
            key: typeof p.value == "boolean" ? v : p.value || v,
            name: d.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: d.small,
            inline: d.inline,
            "model-value": d.modelValue,
            "onUpdate:modelValue": u[0] || (u[0] = (h) => o(h))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        l.value ? (i(), f("div", {
          key: 1,
          id: `messages-${d.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: L(["fr-message fr-message--info flex items-center", r.value])
          }, g(l.value), 3)
        ], 8, su)) : b("", !0)
      ], 10, nu)
    ]));
  }
}), uu = ["id"], cu = ["id"], fu = { class: "fr-hint-text" }, pu = ["data-fr-prefix", "data-fr-suffix"], vu = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], mu = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], gu = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, bu = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, hu = ["id"], yu = ["id"], ku = /* @__PURE__ */ A({
  __name: "DsfrRange",
  props: {
    id: { default: () => Y("range") },
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = q(), r = q(), o = q(), s = y(() => a.lowerValue !== void 0), d = y(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * o.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * o.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), u = y(() => {
      const v = (a.modelValue - a.min) / (a.max - a.min) * o.value - (s.value ? 12 : 0), h = ((a.lowerValue ?? 0) - a.min) / (a.max - a.min) * o.value;
      return {
        "--progress-right": `${v + 24}px`,
        ...s.value ? { "--progress-left": `${h + 12}px` } : {}
      };
    });
    ae([() => a.modelValue, () => a.lowerValue], ([v, h]) => {
      h !== void 0 && (s.value && v < h && n("update:lowerValue", v), s.value && h > v && n("update:modelValue", h));
    });
    const p = y(() => (a.prefix ?? "").concat(s.value ? `${a.lowerValue} - ` : "").concat(`${a.modelValue}`).concat(a.suffix ?? ""));
    return oe(() => {
      var v;
      o.value = (v = l.value) == null ? void 0 : v.offsetWidth;
    }), (v, h) => (i(), f("div", {
      id: `${v.id}-group`,
      class: L(["fr-range-group", { "fr-range-group--error": v.message }])
    }, [
      c("label", {
        id: `${v.id}-label`,
        class: "fr-label"
      }, [
        M(v.$slots, "label", {}, () => [
          N(g(v.label), 1)
        ]),
        c("span", fu, [
          M(v.$slots, "hint", {}, () => [
            N(g(v.hint), 1)
          ])
        ])
      ], 8, cu),
      c("div", {
        class: L(["fr-range", {
          "fr-range--sm": v.small,
          "fr-range--double": s.value,
          "fr-range-group--disabled": v.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": v.prefix ?? void 0,
        "data-fr-suffix": v.suffix ?? void 0,
        style: de(u.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: r,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: de(d.value)
        }, g(p.value), 5),
        s.value ? (i(), f("input", {
          key: 0,
          id: `${v.id}-2`,
          type: "range",
          min: v.min,
          max: v.max,
          step: v.step,
          value: v.lowerValue,
          disabled: v.disabled,
          "aria-disabled": v.disabled,
          "aria-labelledby": `${v.id}-label`,
          "aria-describedby": `${v.id}-messages`,
          onInput: h[0] || (h[0] = (I) => {
            var x;
            return n("update:lowerValue", +((x = I.target) == null ? void 0 : x.value));
          })
        }, null, 40, vu)) : b("", !0),
        c("input", {
          id: v.id,
          ref_key: "input",
          ref: l,
          type: "range",
          min: v.min,
          max: v.max,
          step: v.step,
          value: v.modelValue,
          disabled: v.disabled,
          "aria-disabled": v.disabled,
          "aria-labelledby": `${v.id}-label`,
          "aria-describedby": `${v.id}-messages`,
          onInput: h[1] || (h[1] = (I) => {
            var x;
            return n("update:modelValue", +((x = I.target) == null ? void 0 : x.value));
          })
        }, null, 40, mu),
        v.hideIndicators ? b("", !0) : (i(), f("span", gu, g(v.min), 1)),
        v.hideIndicators ? b("", !0) : (i(), f("span", bu, g(v.max), 1))
      ], 14, pu),
      v.message || v.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${v.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        M(v.$slots, "messages", {}, () => [
          v.message ? (i(), f("p", {
            key: 0,
            id: `${v.id}-message-error`,
            class: "fr-message fr-message--error"
          }, g(v.message), 9, yu)) : b("", !0)
        ])
      ], 8, hu)) : b("", !0)
    ], 10, uu));
  }
}), _u = { class: "fr-segmented__element" }, wu = ["id", "name", "value", "checked", "disabled", "aria-disabled"], xu = ["for"], Iu = { key: 1 }, $a = /* @__PURE__ */ A({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => Y("basic", "checkbox") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = y(() => typeof e.icon == "string" ? { name: e.icon } : e.icon), n = y(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : "");
    return (l, r) => (i(), f("div", _u, [
      c("input", H({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: r[0] || (r[0] = (o) => l.$emit("update:modelValue", l.value))
      }), null, 16, wu),
      c("label", {
        for: l.id,
        class: L(["fr-label", { [n.value]: n.value }])
      }, [
        l.icon && !n.value ? (i(), V(le, se(H({ key: 0 }, a.value)), null, 16)) : b("", !0),
        l.icon ? (i(), f("span", Iu, " ")) : b("", !0),
        N(" " + g(l.label), 1)
      ], 10, xu)
    ]));
  }
}), Du = { class: "fr-form-group" }, Cu = ["disabled"], Tu = ["id"], Bu = {
  key: 0,
  class: "fr-hint-text"
}, Eu = { class: "fr-segmented__elements" }, Su = /* @__PURE__ */ A({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => Y("radio-button", "group") },
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = (r) => {
      r !== a.modelValue && n("update:modelValue", r);
    };
    return (r, o) => (i(), f("div", Du, [
      c("fieldset", {
        class: L(["fr-segmented", {
          "fr-segmented--sm": r.small,
          "fr-segmented--no-legend": !r.legend
        }]),
        disabled: r.disabled
      }, [
        r.legend ? (i(), f("legend", {
          key: 0,
          id: r.titleId,
          class: L(["fr-segmented__legend", {
            "fr-segmented__legend--inline": r.inline
          }])
        }, [
          M(r.$slots, "legend", {}, () => [
            N(g(r.legend), 1)
          ]),
          r.hint ? (i(), f("span", Bu, g(r.hint), 1)) : b("", !0)
        ], 10, Tu)) : b("", !0),
        c("div", Eu, [
          M(r.$slots, "default", {}, () => [
            (i(!0), f($, null, Q(r.options, (s, d) => (i(), V($a, H({
              key: s.value || d,
              name: r.name || s.name,
              ref_for: !0
            }, { ...s, disabled: r.disabled || s.disabled }, {
              "model-value": r.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (u) => l(u))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Cu)
    ]));
  }
}), Au = ["for"], Mu = {
  key: 0,
  class: "required"
}, Fu = {
  key: 0,
  class: "fr-hint-text"
}, Lu = ["id", "name", "disabled", "aria-disabled", "required"], Pu = ["selected"], Nu = ["selected", "value", "disabled", "aria-disabled"], Vu = ["id"], Ru = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => Y("select") },
    name: { default: void 0 },
    description: { default: void 0 },
    modelValue: { default: void 0 },
    label: { default: "" },
    options: { default: () => [] },
    successMessage: { default: "" },
    errorMessage: { default: "" },
    defaultUnselectedText: { default: "Sélectionner une option" }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = y(() => e.errorMessage || e.successMessage), n = y(() => e.errorMessage ? "error" : "valid");
    return (l, r) => (i(), f("div", {
      class: L(["fr-select-group", { [`fr-select-group--${n.value}`]: a.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        M(l.$slots, "label", {}, () => [
          N(g(l.label) + " ", 1),
          M(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", Mu, " *")) : b("", !0)
          ])
        ]),
        l.description ? (i(), f("span", Fu, g(l.description), 1)) : b("", !0)
      ], 8, Au),
      c("select", H({
        id: l.selectId,
        class: [{ [`fr-select--${n.value}`]: a.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: r[0] || (r[0] = (o) => {
          var s;
          return l.$emit("update:modelValue", (s = o.target) == null ? void 0 : s.value);
        })
      }), [
        c("option", {
          selected: l.modelValue == null,
          disabled: "",
          hidden: ""
        }, g(l.defaultUnselectedText), 9, Pu),
        (i(!0), f($, null, Q(l.options, (o, s) => (i(), f("option", {
          key: s,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, g(typeof o == "object" ? o.text : o), 9, Nu))), 128))
      ], 16, Lu),
      a.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: L(`fr-${n.value}-text`)
      }, g(a.value), 11, Vu)) : b("", !0)
    ], 2));
  }
}), ju = { class: "fr-share" }, Ou = { class: "fr-share__title" }, $u = { class: "fr-btns-group" }, qu = ["title", "href", "onClick"], Hu = { key: 0 }, zu = ["href", "title"], Qu = ["title"], Gu = /* @__PURE__ */ A({
  __name: "DsfrShare",
  props: {
    title: { default: "Partager la page" },
    copyLabel: { default: "Copier dans le presse-papier" },
    mail: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = () => {
      const n = window.location.href;
      navigator.clipboard.writeText(n);
    }, a = ({ url: n, label: l }) => {
      window.open(
        n,
        l,
        "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
    };
    return (n, l) => {
      var r;
      return i(), f("div", ju, [
        c("p", Ou, g(n.title), 1),
        c("ul", $u, [
          (i(!0), f($, null, Q(n.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: L(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: K((d) => a(o), ["prevent"])
            }, g(o.label), 11, qu)
          ]))), 128)),
          (r = n.mail) != null && r.to ? (i(), f("li", Hu, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, g(n.mail.label), 9, zu)
          ])) : b("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: l[0] || (l[0] = (o) => e())
            }, g(n.copyLabel), 9, Qu)
          ])
        ])
      ]);
    };
  }
}), Ku = ["aria-current", "aria-expanded", "aria-controls"], qa = /* @__PURE__ */ A({
  __name: "DsfrSideMenuButton",
  props: {
    active: { type: Boolean },
    expanded: { type: Boolean },
    controlId: {}
  },
  emits: ["toggleExpand"],
  setup(t) {
    return (e, a) => (i(), f("button", {
      class: "fr-sidemenu__btn",
      "aria-current": e.active ? "page" : void 0,
      "aria-expanded": !!e.expanded,
      "aria-controls": e.controlId,
      onClick: a[0] || (a[0] = (n) => e.$emit("toggleExpand", e.controlId))
    }, [
      M(e.$slots, "default")
    ], 8, Ku));
  }
}), Ha = /* @__PURE__ */ A({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      class: L(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      M(e.$slots, "default")
    ], 2));
  }
}), Wu = ["id"], Xu = { class: "fr-sidemenu__list" }, za = /* @__PURE__ */ A({
  __name: "DsfrSideMenuList",
  props: {
    id: {},
    collapsable: { type: Boolean },
    expanded: { type: Boolean },
    menuItems: { default: () => [] }
  },
  emits: ["toggleExpand"],
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: r,
      onTransitionEnd: o
    } = pe();
    ae(() => e.expanded, (p, v) => {
      p !== v && r(p);
    }), oe(() => {
      e.expanded && r(!0);
    });
    const s = (p) => typeof p == "string" && p.startsWith("http"), d = (p) => s(p) ? "a" : "RouterLink", u = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, v) => {
      const h = ie("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: a,
        class: L({
          "fr-collapse": p.collapsable,
          "fr-collapsing": F(n),
          "fr-collapse--expanded": F(l)
        }),
        onTransitionend: v[2] || (v[2] = (I) => F(o)(!!p.expanded))
      }, [
        c("ul", Xu, [
          M(p.$slots, "default"),
          (i(!0), f($, null, Q(p.menuItems, (I, x) => (i(), V(Ha, {
            key: x,
            active: I.active
          }, {
            default: G(() => [
              I.menuItems ? b("", !0) : (i(), V(ne(d(I.to)), H({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": I.active ? "page" : void 0,
                ref_for: !0
              }, u(I.to)), {
                default: G(() => [
                  N(g(I.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              I.menuItems ? (i(), f($, { key: 1 }, [
                X(qa, {
                  active: !!I.active,
                  expanded: !!I.expanded,
                  "control-id": I.id,
                  onToggleExpand: v[0] || (v[0] = (P) => p.$emit("toggleExpand", P))
                }, {
                  default: G(() => [
                    N(g(I.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                I.menuItems ? (i(), V(h, {
                  key: 0,
                  id: I.id,
                  collapsable: "",
                  expanded: I.expanded,
                  "menu-items": I.menuItems,
                  onToggleExpand: v[1] || (v[1] = (P) => p.$emit("toggleExpand", P))
                }, null, 8, ["id", "expanded", "menu-items"])) : b("", !0)
              ], 64)) : b("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, Wu);
    };
  }
}), Uu = ["aria-labelledby"], Yu = { class: "fr-sidemenu__inner" }, Zu = ["aria-controls", "aria-expanded"], Ju = ["id"], ec = { class: "fr-sidemenu__title" }, tc = /* @__PURE__ */ A({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => Y("sidemenu") },
    sideMenuListId: { default: () => Y("sidemenu", "list") },
    collapseValue: { default: "-492px" },
    menuItems: { default: () => {
    } },
    headingTitle: { default: "" }
  },
  emits: ["toggleExpand"],
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: r
    } = pe(), o = q(!1);
    return ae(o, (s, d) => {
      s !== d && l(s);
    }), (s, d) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": s.id
    }, [
      c("div", Yu, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": s.id,
          "aria-expanded": o.value,
          onClick: d[0] || (d[0] = K((u) => o.value = !o.value, ["prevent", "stop"]))
        }, g(s.buttonLabel), 9, Zu),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: e,
          class: L(["fr-collapse", {
            "fr-collapse--expanded": F(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(a)
          }]),
          onTransitionend: d[2] || (d[2] = (u) => F(r)(o.value))
        }, [
          c("div", ec, g(s.headingTitle), 1),
          M(s.$slots, "default", {}, () => [
            X(za, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: d[1] || (d[1] = (u) => s.$emit("toggleExpand", u))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Ju)
      ])
    ], 8, Uu));
  }
}), ac = /* @__PURE__ */ A({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = y(() => typeof e.to == "string" && e.to.startsWith("http")), n = y(() => a.value ? "a" : "RouterLink"), l = y(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (r, o) => (i(), V(ne(n.value), H({
      "aria-current": r.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: G(() => [
        M(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), lc = { class: "fr-skiplinks" }, nc = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, rc = { class: "fr-skiplinks__list" }, oc = ["href", "onClick"], ic = /* @__PURE__ */ A({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(t) {
    const e = (a) => {
      const n = document.getElementById(a);
      n == null || n.focus();
    };
    return (a, n) => (i(), f("div", lc, [
      c("nav", nc, [
        c("ul", rc, [
          (i(!0), f($, null, Q(a.links, (l) => (i(), f("li", {
            key: l.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: K((r) => e(l.id), ["prevent"])
            }, g(l.text), 9, oc)
          ]))), 128))
        ])
      ])
    ]));
  }
}), sc = { class: "fr-stepper" }, dc = { class: "fr-stepper__title" }, uc = { class: "fr-stepper__state" }, cc = ["data-fr-current-step", "data-fr-steps"], fc = { class: "fr-stepper__details" }, pc = {
  key: 0,
  class: "fr-text--bold"
}, vc = /* @__PURE__ */ A({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (i(), f("div", sc, [
      c("h2", dc, [
        N(g(e.steps[e.currentStep - 1]) + " ", 1),
        c("span", uc, "Étape " + g(e.currentStep) + " sur " + g(e.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, cc),
      c("p", fc, [
        e.currentStep < e.steps.length ? (i(), f("span", pc, "Étape suivante :")) : b("", !0),
        N(" " + g(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), mc = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, gc = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, bc = { class: "fr-summary__list" }, hc = ["href"], yc = /* @__PURE__ */ A({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("nav", mc, [
      c("h2", gc, g(e.title), 1),
      c("ol", bc, [
        (i(!0), f($, null, Q(e.anchors, (n, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, g(n.name), 9, hc)
        ]))), 128))
      ])
    ]));
  }
}), kc = ["id", "aria-labelledby", "tabindex"], _c = /* @__PURE__ */ A({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(t) {
    ta((d) => ({
      "7152af7e": o.value,
      "2a62e962": s.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, n = ke(qe), { isVisible: l, asc: r } = n($e(() => e.tabId)), o = y(() => a[String(r == null ? void 0 : r.value)]), s = y(() => a[String(!(r != null && r.value))]);
    return (d, u) => (i(), V(dl, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: G(() => [
        me(c("div", {
          id: d.panelId,
          class: L(["fr-tabs__panel", {
            "fr-tabs__panel--selected": F(l)
          }]),
          role: "tabpanel",
          "aria-labelledby": d.tabId,
          tabindex: F(l) ? 0 : -1
        }, [
          M(d.$slots, "default", {}, void 0, !0)
        ], 10, kc), [
          [ea, F(l)]
        ])
      ]),
      _: 3
    }));
  }
}), Qa = /* @__PURE__ */ re(_c, [["__scopeId", "data-v-5774b16c"]]), wc = { role: "presentation" }, xc = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Ic = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Ga = /* @__PURE__ */ A({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = q(null), r = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      ArrowDown: "next",
      ArrowUp: "previous",
      Home: "first",
      End: "last"
    };
    function o(u) {
      const p = u == null ? void 0 : u.key, v = r[p];
      v && n(v);
    }
    const s = ke(qe), { isVisible: d } = s($e(() => a.tabId));
    return (u, p) => (i(), f("li", wc, [
      c("button", {
        id: u.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${u.tabId}`,
        class: "fr-tabs__tab",
        tabindex: F(d) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": F(d),
        "aria-controls": u.panelId,
        onClick: p[0] || (p[0] = K((v) => u.$emit("click", u.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (v) => o(v))
      }, [
        u.icon ? (i(), f("span", Ic, [
          X(le, { name: u.icon }, null, 8, ["name"])
        ])) : b("", !0),
        M(u.$slots, "default")
      ], 40, xc)
    ]));
  }
}), Ka = /* @__PURE__ */ A({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = y(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = y(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, r) => (i(), f("th", H(l.headerAttrs, { scope: "col" }), [
      N(g(l.header) + " ", 1),
      l.icon && !a.value ? (i(), V(le, se(H({ key: 0 }, n.value)), null, 16)) : b("", !0),
      a.value ? (i(), f("span", {
        key: 1,
        class: L({ [String(l.icon)]: a.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), Dc = { key: 0 }, Wa = /* @__PURE__ */ A({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (i(), f("tr", Dc, [
      (i(!0), f($, null, Q(e.headers, (n, l) => (i(), V(Ka, {
        key: l,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), Xa = /* @__PURE__ */ A({
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
  setup(t) {
    const e = t, a = y(() => typeof e.field == "object" && e.field !== null && e.field.component ? e.field.component : !1), n = y(() => ["string", "number", "boolean"].includes(typeof e.field));
    return (l, r) => (i(), f("td", se(pt(l.cellAttrs)), [
      a.value ? (i(), V(ne(a.value), se(H({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: G(() => [
          N(g(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f($, { key: 1 }, [
        N(g(n.value ? l.field : l.field.text), 1)
      ], 64))
    ], 16));
  }
}), Ua = /* @__PURE__ */ A({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(t) {
    return (e, a) => (i(), f("tr", se(pt(e.rowAttrs)), [
      M(e.$slots, "default"),
      (i(!0), f($, null, Q(e.rowData, (n, l) => (i(), V(Xa, {
        key: l,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Cc = { class: "caption" }, Tc = { key: 1 }, Bc = ["colspan"], Ec = { class: "flex justify-right" }, Sc = { class: "self-center" }, Ac = ["value"], Mc = { class: "flex ml-1" }, Fc = { class: "self-center" }, Lc = { class: "flex ml-1" }, Pc = /* @__PURE__ */ A({
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = (m) => Array.isArray(m) ? m : m.rowData, r = q(a.currentPage), o = q(a.resultsDisplayed), s = q(
      a.rows.length > o.value ? Math.ceil(a.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], u = () => r.value * o.value - o.value, p = () => r.value * o.value;
    ae(
      () => o.value,
      (m) => {
        s.value = a.rows.length > o.value ? Math.ceil(a.rows.length / m) : 1;
      }
    );
    const v = y(() => a.pagination ? a.rows.slice(u(), p()) : a.rows), h = () => {
      r.value = 1, n("update:currentPage");
    }, I = () => {
      r.value > 1 && (r.value -= 1, n("update:currentPage"));
    }, x = () => {
      r.value < s.value && (r.value += 1, n("update:currentPage"));
    }, P = () => {
      r.value = s.value, n("update:currentPage");
    };
    return (m, w) => (i(), f("div", {
      class: L(["fr-table", { "fr-table--no-caption": m.noCaption }])
    }, [
      c("table", null, [
        c("caption", Cc, g(m.title), 1),
        c("thead", null, [
          M(m.$slots, "header", {}, () => [
            m.headers && m.headers.length ? (i(), V(Wa, {
              key: 0,
              headers: m.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          M(m.$slots, "default", {}, void 0, !0),
          m.rows && m.rows.length ? (i(!0), f($, { key: 0 }, Q(v.value, (T, O) => (i(), V(Ua, {
            key: m.rowKey && l(T) ? typeof m.rowKey == "string" ? l(T)[m.headers.indexOf(m.rowKey)].toString() : m.rowKey(l(T)) : O,
            "row-data": l(T),
            "row-attrs": "rowAttrs" in T ? T.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : b("", !0),
          m.pagination ? (i(), f("tr", Tc, [
            c("td", {
              colspan: m.headers.length
            }, [
              c("div", Ec, [
                c("div", Sc, [
                  w[6] || (w[6] = c("span", null, "Résultats par page : ", -1)),
                  me(c("select", {
                    "onUpdate:modelValue": w[0] || (w[0] = (T) => o.value = T),
                    onChange: w[1] || (w[1] = (T) => n("update:currentPage"))
                  }, [
                    (i(), f($, null, Q(d, (T, O) => c("option", {
                      key: O,
                      value: T
                    }, g(T), 9, Ac)), 64))
                  ], 544), [
                    [na, o.value]
                  ])
                ]),
                c("div", Mc, [
                  c("span", Fc, "Page " + g(r.value) + " sur " + g(s.value), 1)
                ]),
                c("div", Lc, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: w[2] || (w[2] = (T) => h())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: w[3] || (w[3] = (T) => I())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: w[4] || (w[4] = (T) => x())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: w[5] || (w[5] = (T) => P())
                  })
                ])
              ])
            ], 8, Bc)
          ])) : b("", !0)
        ])
      ])
    ], 2));
  }
}), Nc = /* @__PURE__ */ re(Pc, [["__scopeId", "data-v-3998acc8"]]), Vc = ["aria-label"], Rc = /* @__PURE__ */ A({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: e, emit: a }) {
    const n = t, l = a, r = q(!1), o = y({
      get: () => n.modelValue,
      set(E) {
        l("update:modelValue", E);
      }
    }), s = q(/* @__PURE__ */ new Map()), d = q(0);
    Ce(qe, (E) => {
      const z = q(!0);
      if (ae(o, (B, W) => {
        z.value = B > W;
      }), [...s.value.values()].includes(E.value))
        return { isVisible: y(() => s.value.get(o.value) === E.value), asc: z };
      const k = d.value++;
      s.value.set(k, E.value);
      const j = y(() => k === o.value);
      return ae(E, () => {
        s.value.set(k, E.value);
      }), fe(() => {
        s.value.delete(k);
      }), { isVisible: j };
    });
    const u = q(null), p = q(null), v = rl({}), h = (E) => {
      if (v[E])
        return v[E];
      const z = Y("tab");
      return v[E] = z, z;
    }, I = async () => {
      const E = o.value === 0 ? n.tabTitles.length - 1 : o.value - 1;
      r.value = !1, o.value = E;
    }, x = async () => {
      const E = o.value === n.tabTitles.length - 1 ? 0 : o.value + 1;
      r.value = !0, o.value = E;
    }, P = async () => {
      o.value = 0;
    }, m = async () => {
      o.value = n.tabTitles.length - 1;
    }, w = q({ "--tabs-height": "100px" }), T = () => {
      var E;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const z = p.value.offsetHeight, k = (E = u.value) == null ? void 0 : E.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!k || !k.offsetHeight)
        return;
      const j = k.offsetHeight;
      w.value["--tabs-height"] = `${z + j}px`;
    }, O = q(null);
    return oe(() => {
      var E;
      window.ResizeObserver && (O.value = new window.ResizeObserver(() => {
        T();
      })), (E = u.value) == null || E.querySelectorAll(".fr-tabs__panel").forEach((z) => {
        var k;
        z && ((k = O.value) == null || k.observe(z));
      });
    }), fe(() => {
      var E;
      (E = u.value) == null || E.querySelectorAll(".fr-tabs__panel").forEach((z) => {
        var k;
        z && ((k = O.value) == null || k.unobserve(z));
      });
    }), e({
      renderTabs: T,
      selectFirst: P,
      selectLast: m
    }), (E, z) => (i(), f("div", {
      ref_key: "$el",
      ref: u,
      class: "fr-tabs",
      style: de(w.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": E.tabListName
      }, [
        M(E.$slots, "tab-items", {}, () => [
          (i(!0), f($, null, Q(E.tabTitles, (k, j) => (i(), V(Ga, {
            key: j,
            icon: k.icon,
            "panel-id": k.panelId || `${h(j)}-panel`,
            "tab-id": k.tabId || h(j),
            onClick: (B) => o.value = j,
            onNext: z[0] || (z[0] = (B) => x()),
            onPrevious: z[1] || (z[1] = (B) => I()),
            onFirst: z[2] || (z[2] = (B) => P()),
            onLast: z[3] || (z[3] = (B) => m())
          }, {
            default: G(() => [
              N(g(k.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, Vc),
      (i(!0), f($, null, Q(E.tabContents, (k, j) => {
        var B, W, _, D;
        return i(), V(Qa, {
          key: j,
          "panel-id": ((W = (B = E.tabTitles) == null ? void 0 : B[j]) == null ? void 0 : W.panelId) || `${h(j)}-panel`,
          "tab-id": ((D = (_ = E.tabTitles) == null ? void 0 : _[j]) == null ? void 0 : D.tabId) || h(j)
        }, {
          default: G(() => [
            N(g(k), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      M(E.$slots, "default")
    ], 4));
  }
}), jc = /* @__PURE__ */ A({
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
  setup(t) {
    const e = t, a = y(() => typeof e.link == "string" && e.link.startsWith("http")), n = y(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = y(() => ({ [a.value ? "href" : "to"]: e.link })), r = y(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), o = e.small ? 0.65 : 0.9, s = y(() => r.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: o } : { scale: o, ...e.icon ?? {} });
    return (d, u) => (i(), V(ne(n.value), H({
      class: ["fr-tag", {
        "fr-tag--sm": d.small,
        [d.icon]: r.value,
        "fr-tag--icon-left": r.value
      }],
      disabled: d.disabled
    }, l.value), {
      default: G(() => [
        e.icon && !r.value ? (i(), V(le, H({
          key: 0,
          label: d.iconOnly ? d.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : b("", !0),
        d.iconOnly ? b("", !0) : (i(), f($, { key: 1 }, [
          N(g(d.label), 1)
        ], 64)),
        M(d.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), It = /* @__PURE__ */ re(jc, [["__scopeId", "data-v-f6a89dc8"]]), Oc = { class: "fr-tags-group" }, $c = /* @__PURE__ */ A({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("ul", Oc, [
      (i(!0), f($, null, Q(e.tags, ({ icon: n, label: l, ...r }, o) => (i(), f("li", { key: o }, [
        X(It, H({ ref_for: !0 }, r, {
          icon: n,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), qc = { class: "fr-tile__body" }, Hc = { class: "fr-tile__content" }, zc = ["download", "href"], Qc = {
  key: 0,
  class: "fr-tile__desc"
}, Gc = {
  key: 1,
  class: "fr-tile__detail"
}, Kc = {
  key: 2,
  class: "fr-tile__start"
}, Wc = { class: "fr-tile__header" }, Xc = {
  key: 0,
  class: "fr-tile__pictogram"
}, Uc = ["src"], Yc = ["href"], Zc = ["href"], Jc = ["href"], ef = /* @__PURE__ */ A({
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
  setup(t) {
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = y(() => typeof e.to == "string" && e.to.startsWith("http"));
    return (l, r) => {
      const o = ie("RouterLink");
      return i(), f("div", {
        class: L(["fr-tile fr-enlarge-link", [{
          "fr-tile--disabled": l.disabled,
          "fr-tile--sm": l.small === !0,
          "fr-tile--horizontal": l.horizontal === !0,
          "fr-tile--vertical": l.horizontal === !1 || l.vertical === "md" || l.vertical === "lg",
          "fr-tile--vertical@md": l.vertical === "md",
          "fr-tile--vertical@lg": l.vertical === "lg",
          "fr-tile--download": l.download,
          "fr-tile--no-icon": l.icon === !1,
          "fr-tile--no-border": l.noBorder,
          "fr-tile--no-background": l.noBackground,
          "fr-tile--shadow": l.shadow,
          "fr-tile--grey": l.grey,
          "fr-enlarge-button": l.enlarge
        }]])
      }, [
        c("div", qc, [
          c("div", Hc, [
            (i(), V(ne(l.titleTag), { class: "fr-tile__title" }, {
              default: G(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, g(l.title), 9, zc)) : b("", !0),
                n.value ? b("", !0) : (i(), V(o, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: G(() => [
                    N(g(l.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            l.description ? (i(), f("p", Qc, g(l.description), 1)) : b("", !0),
            l.details ? (i(), f("p", Gc, g(l.details), 1)) : b("", !0),
            l.$slots["start-details"] ? (i(), f("div", Kc, [
              M(l.$slots, "start-details", {}, void 0, !0)
            ])) : b("", !0)
          ])
        ]),
        c("div", Wc, [
          M(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (i(), f("div", Xc, [
            l.imgSrc ? (i(), f("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Uc)) : (i(), f("svg", H({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...a, ...l.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${l.svgPath}#artwork-decorative`
              }, null, 8, Yc),
              c("use", {
                class: "fr-artwork-minor",
                href: `${l.svgPath}#artwork-minor`
              }, null, 8, Zc),
              c("use", {
                class: "fr-artwork-major",
                href: `${l.svgPath}#artwork-major`
              }, null, 8, Jc)
            ], 16))
          ])) : b("", !0)
        ])
      ], 2);
    };
  }
}), Ya = /* @__PURE__ */ re(ef, [["__scopeId", "data-v-f4d836a2"]]), tf = { class: "fr-grid-row fr-grid-row--gutters" }, af = /* @__PURE__ */ A({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("div", tf, [
      (i(!0), f($, null, Q(e.tiles, (n, l) => (i(), f("div", {
        key: l,
        class: L({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        X(Ya, H({
          horizontal: e.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), lf = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], nf = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], rf = ["id"], of = /* @__PURE__ */ A({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => Y("toggle") },
    hint: { default: "" },
    label: { default: "" },
    disabled: { type: Boolean },
    labelLeft: { type: Boolean, default: !1 },
    borderBottom: { type: Boolean, default: !1 },
    activeText: { default: "Activé" },
    inactiveText: { default: "Désactivé" },
    noText: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = y(() => `${e.inputId}-hint-text`);
    return (n, l) => (i(), f("div", {
      class: L(["fr-toggle", {
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
        "aria-describedby": a.value,
        onInput: l[0] || (l[0] = (r) => n.$emit("update:modelValue", r.target.checked))
      }, null, 40, lf),
      c("label", {
        id: a.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, g(n.label), 9, nf),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, g(n.hint), 9, rf)) : b("", !0)
    ], 2));
  }
}), sf = ["id"], df = /* @__PURE__ */ A({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => Y("tooltip") }
  },
  setup(t) {
    const e = t, a = q(!1), n = q(null), l = q(null), r = q("0px"), o = q("0px"), s = q("0px"), d = q(!1), u = q(0);
    async function p() {
      var T, O, E, z, k, j;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((ee) => setTimeout(ee, 100));
      const B = (T = n.value) == null ? void 0 : T.getBoundingClientRect().top, W = (O = n.value) == null ? void 0 : O.offsetHeight, _ = (E = n.value) == null ? void 0 : E.offsetWidth, D = (z = n.value) == null ? void 0 : z.getBoundingClientRect().left, C = (k = l.value) == null ? void 0 : k.offsetHeight, S = (j = l.value) == null ? void 0 : j.offsetWidth, R = !(B - C < 0) && B + W + C >= document.documentElement.offsetHeight;
      d.value = R;
      const U = D + _ >= document.documentElement.offsetWidth, Z = D + _ / 2 - S / 2 <= 0;
      o.value = R ? `${B - C + 8}px` : `${B + W - 8}px`, u.value = 1, r.value = U ? `${D + _ - S - 4}px` : Z ? `${D + 4}px` : `${D + _ / 2 - S / 2}px`, s.value = U ? `${S / 2 - _ / 2 + 4}px` : Z ? `${-(S / 2) + _ / 2 - 4}px` : "0px";
    }
    ae(a, p, { immediate: !0 }), oe(() => {
      window.addEventListener("scroll", p);
    }), fe(() => {
      window.removeEventListener("scroll", p);
    });
    const v = y(() => `transform: translate(${r.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${u.value};'`), h = y(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": d.value,
      "fr-placement--bottom": !d.value
    })), I = (T) => {
      var O, E;
      a.value && (T.target === n.value || (O = n.value) != null && O.contains(T.target) || T.target === l.value || (E = l.value) != null && E.contains(T.target) || (a.value = !1));
    }, x = (T) => {
      T.key === "Escape" && (a.value = !1);
    };
    oe(() => {
      document.documentElement.addEventListener("click", I), document.documentElement.addEventListener("keydown", x);
    }), fe(() => {
      document.documentElement.removeEventListener("click", I), document.documentElement.removeEventListener("keydown", x);
    });
    const P = () => {
      e.onHover && (a.value = !0);
    }, m = () => {
      e.onHover && (a.value = !1);
    }, w = () => {
      e.onHover || (a.value = !a.value);
    };
    return (T, O) => (i(), f($, null, [
      (i(), V(ne(T.onHover ? "a" : "button"), {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: n,
        class: L(T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: O[0] || (O[0] = K((E) => w(), ["stop"])),
        onMouseenter: O[1] || (O[1] = (E) => P()),
        onMouseleave: O[2] || (O[2] = (E) => m()),
        onFocus: O[3] || (O[3] = (E) => P()),
        onBlur: O[4] || (O[4] = (E) => m())
      }, {
        default: G(() => [
          M(T.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: T.id,
        ref_key: "tooltip",
        ref: l,
        class: L(["fr-tooltip fr-placement", h.value]),
        style: de(v.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, g(T.content), 15, sf)
    ], 64));
  }
}), uf = /* @__PURE__ */ re(df, [["__scopeId", "data-v-67870551"]]), cf = { class: "fr-transcription" }, ff = ["aria-expanded", "aria-controls"], pf = ["id"], vf = ["id", "aria-labelledby"], mf = { class: "fr-container fr-container--fluid fr-container-md" }, gf = { class: "fr-grid-row fr-grid-row--center" }, bf = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, hf = { class: "fr-modal__body" }, yf = { class: "fr-modal__header" }, kf = ["aria-controls"], _f = { class: "fr-modal__content" }, wf = ["id"], xf = { class: "fr-transcription__footer" }, If = { class: "fr-transcription__actions-group" }, Df = ["aria-controls"], Za = /* @__PURE__ */ A({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => Y("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: r,
      onTransitionEnd: o
    } = pe(), s = q(!1), d = q(!1), u = y(() => `fr-transcription__modal-${e.id}`), p = y(() => `fr-transcription__collapse-${e.id}`);
    return ae(d, (v, h) => {
      v !== h && r(v);
    }), (v, h) => (i(), f("div", cf, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": d.value,
        "aria-controls": p.value,
        onClick: h[0] || (h[0] = (I) => d.value = !d.value)
      }, " Transcription ", 8, ff),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: a,
        class: L(["fr-collapse", { "fr-collapse--expanded": F(l), "fr-collapsing": F(n) }]),
        onTransitionend: h[2] || (h[2] = (I) => F(o)(d.value))
      }, [
        c("dialog", {
          id: u.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${u.value}-title`
        }, [
          c("div", mf, [
            c("div", gf, [
              c("div", bf, [
                c("div", hf, [
                  c("div", yf, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": u.value,
                      title: "Fermer"
                    }, " Fermer ", 8, kf)
                  ]),
                  c("div", _f, [
                    c("h1", {
                      id: `${u.value}-title`,
                      class: "fr-modal__title"
                    }, g(v.title), 9, wf),
                    N(" " + g(v.content), 1)
                  ]),
                  c("div", xf, [
                    c("div", If, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": u.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: h[1] || (h[1] = (I) => s.value = !0)
                      }, " Agrandir ", 8, Df)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, vf)
      ], 42, pf),
      (i(), V(ol, { to: "body" }, [
        X(La, {
          title: v.title,
          opened: s.value,
          onClose: h[3] || (h[3] = (I) => s.value = !1)
        }, {
          default: G(() => [
            M(v.$slots, "default", {}, () => [
              N(g(v.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Cf = ["src"], Tf = { class: "fr-content-media__caption" }, Bf = /* @__PURE__ */ A({
  __name: "DsfrVideo",
  props: {
    src: {},
    legend: { default: "" },
    size: { default: "medium" },
    transcriptionTitle: { default: "" },
    transcriptionContent: { default: "" },
    ratio: { default: "16x9" }
  },
  setup(t) {
    return (e, a) => (i(), f($, null, [
      c("figure", {
        class: L(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        c("div", {
          class: L(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          c("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Cf)
        ], 2),
        c("div", Tf, g(e.legend), 1)
      ], 2),
      X(Za, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Ef = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: gl,
  DsfrAccordionsGroup: hl,
  DsfrAlert: _l,
  DsfrBackToTop: wl,
  DsfrBadge: ra,
  DsfrBreadcrumb: El,
  DsfrButton: Ee,
  DsfrButtonGroup: Ge,
  DsfrCallout: $n,
  DsfrCard: tr,
  DsfrCardDetail: it,
  DsfrCheckbox: wt,
  DsfrCheckboxSet: fr,
  DsfrConsent: gr,
  DsfrDataTable: Yr,
  DsfrErrorPage: ro,
  DsfrFieldset: co,
  DsfrFileDownload: wa,
  DsfrFileDownloadList: go,
  DsfrFileUpload: xo,
  DsfrFollow: zo,
  DsfrFooter: ki,
  DsfrFooterLink: Da,
  DsfrFooterLinkList: Ii,
  DsfrFooterPartners: Ca,
  DsfrFranceConnect: Bi,
  DsfrHeader: ms,
  DsfrHeaderMenuLink: Ta,
  DsfrHeaderMenuLinks: ut,
  DsfrHighlight: gs,
  DsfrInput: xt,
  DsfrInputGroup: ws,
  DsfrLanguageSelector: st,
  DsfrLogo: Ne,
  DsfrModal: La,
  DsfrNavigation: Bd,
  DsfrNavigationItem: Pa,
  DsfrNavigationMegaMenu: Va,
  DsfrNavigationMegaMenuCategory: Na,
  DsfrNavigationMenu: ja,
  DsfrNavigationMenuItem: Ra,
  DsfrNavigationMenuLink: Ke,
  DsfrNewsLetter: xa,
  DsfrNotice: Fd,
  DsfrPagination: _a,
  DsfrPicture: Rd,
  DsfrQuote: Gd,
  DsfrRadioButton: Oa,
  DsfrRadioButtonSet: du,
  DsfrRange: ku,
  DsfrSearchBar: dt,
  DsfrSegmented: $a,
  DsfrSegmentedSet: Su,
  DsfrSelect: Ru,
  DsfrShare: Gu,
  DsfrSideMenu: tc,
  DsfrSideMenuButton: qa,
  DsfrSideMenuLink: ac,
  DsfrSideMenuList: za,
  DsfrSideMenuListItem: Ha,
  DsfrSkipLinks: ic,
  DsfrSocialNetworks: Ia,
  DsfrStepper: vc,
  DsfrSummary: yc,
  DsfrTabContent: Qa,
  DsfrTabItem: Ga,
  DsfrTable: Nc,
  DsfrTableCell: Xa,
  DsfrTableHeader: Ka,
  DsfrTableHeaders: Wa,
  DsfrTableRow: Ua,
  DsfrTabs: Rc,
  DsfrTag: It,
  DsfrTags: $c,
  DsfrTile: Ya,
  DsfrTiles: af,
  DsfrToggleSwitch: of,
  DsfrTooltip: uf,
  DsfrTranscription: Za,
  DsfrVideo: Bf,
  VIcon: le,
  registerAccordionKey: vt,
  registerNavigationLinkKey: mt,
  registerTabKey: qe
}, Symbol.toStringTag, { value: "Module" })), Sf = {
  install: (t, { components: e } = {}) => {
    Object.entries(Ef).forEach(([a, n]) => {
      (e === void 0 || e === "all" || e.map(({ name: l }) => l).includes(a)) && t.component(a, n);
    }), t.component("VIcon", le);
  }
}, Af = {
  _searchAndFilterList: function(t, e, a, n, l) {
    let r = this.$data.vueData[t];
    if (n && (r = r.filter(n)), l != null && l.trim() !== "") {
      const o = this.unaccentLower(l);
      r = r.filter((s) => this.unaccentLower(s[a].toString()).indexOf(o) > -1);
    }
    return r;
  },
  dsfrTransformListForSelection: function(t, e, a, n, l) {
    return this._searchAndFilterList(t, e, a, n, l).map(function(o) {
      return { value: o[e], text: o[a].toString() };
    });
  },
  dsfrTransformListForRadio: function(t, e, a, n, l, r, o) {
    return this._searchAndFilterList(t, e, a, r, o).map(function(d) {
      return { value: d[e], label: d[a].toString(), hint: d[l], disabled: d[n] };
    });
  },
  dsfrTransformListForCheckbox: function(t, e, a, n, l, r, o, s) {
    return this._searchAndFilterList(t, e, a, o, s).map(function(u) {
      return { value: u[e], label: u[a].toString(), name: r, hint: u[l], disabled: u[n] };
    });
  }
}, Mf = ["href"], Ff = {
  __name: "RouterLink",
  props: ["to"],
  setup(t) {
    const e = t;
    return (a, n) => (i(), f("a", {
      href: e.to
    }, [
      M(a.$slots, "default")
    ], 8, Mf));
  }
}, Dt = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, Lf = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: wt, DsfrTag: It, DsfrButton: Ee },
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
    addFacetValueTranslator(t, e) {
      this.codeToLabelTranslater[t] = e;
    },
    facetByCode(t) {
      return this.facets.filter(function(e) {
        return e.code === t;
      })[0];
    },
    facetValueByCode(t, e) {
      return this.facetByCode(t).values.filter(function(a) {
        return a.code === e;
      })[0];
    },
    facetLabelByCode(t) {
      return this.facetByCode(t).label;
    },
    facetMultipleByCode(t) {
      return this.facetByCode(t).multiple;
    },
    facetValueLabelByCode(t, e) {
      if (this.codeToLabelTranslater[t])
        return this.codeToLabelTranslater[t](t, e);
      var a = this.facetValueByCode(t, e);
      return a ? a.label : e;
    },
    isFacetValueSelected(t, e) {
      return this.selectedFacets[t].includes(e);
    },
    isFacetSelected(t) {
      return this.selectedFacets[t] ? this.selectedFacets[t].length > 0 : !1;
    },
    isAnyFacetValueSelected() {
      return Object.keys(this.selectedFacets).some((function(t) {
        return !this.facetMultipleByCode(t);
      }).bind(this));
    },
    expandFacet(t) {
      this.isFacetExpanded(t) || this.$data.expandedFacets.push(t);
    },
    reduceFacet(t) {
      this.isFacetExpanded(t) && this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(t), 1);
    },
    isFacetExpanded(t) {
      return this.$data.expandedFacets.includes(t);
    },
    selectedInvisibleFacets(t) {
      return this.selectedFacets[t].filter((e) => !this.facetValueByCode(t, e)).map((e) => {
        var a = {};
        return a.code = e, a.label = e, a.count = 0, a;
      });
    },
    visibleFacets(t, e) {
      return this.isFacetExpanded(t) ? e : e.slice(0, this.maxValues);
    }
  }
}, Pf = {
  key: 0,
  class: "fr-mb-2w"
}, Nf = { class: "fr-mb-1w" }, Vf = { key: 0 }, Rf = { class: "facet" }, jf = { class: "flex justify-between w-full fr-mb-0" }, Of = { class: "facet--count" }, $f = { key: 1 }, qf = { class: "flex justify-between w-full" }, Hf = { class: "facet--count" }, zf = { key: 0 }, Qf = { class: "facet" }, Gf = { class: "flex justify-between w-full fr-mb-0" }, Kf = { class: "facet--count" }, Wf = { key: 1 }, Xf = { class: "flex justify-between w-full" }, Uf = { class: "facet--count" }, Yf = { class: "fr-mb-2w" };
function Zf(t, e, a, n, l, r) {
  const o = ie("DsfrTag"), s = ie("DsfrCheckbox"), d = ie("DsfrButton");
  return i(), f("div", null, [
    r.isAnyFacetValueSelected() ? (i(), f("div", Pf, [
      (i(!0), f($, null, Q(a.selectedFacets, (u, p) => (i(), f("div", { key: p }, [
        r.facetMultipleByCode(p) ? b("", !0) : (i(!0), f($, { key: 0 }, Q(u, (v) => (i(), V(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: v.code,
          onClick: (h) => t.$emit("toogle-facet", p, v, a.contextKey)
        }, {
          default: G(() => [
            N(g(r.facetLabelByCode(p)) + ": " + g(r.facetValueLabelByCode(p, v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : b("", !0),
    (i(!0), f($, null, Q(a.facets, (u) => (i(), f("div", {
      key: u.code,
      class: "facets"
    }, [
      u.multiple || !r.isFacetSelected(u.code) ? (i(), f($, { key: 0 }, [
        c("h6", Nf, g(u.label), 1),
        c("ul", null, [
          (i(!0), f($, null, Q(r.selectedInvisibleFacets(u.code), (p) => (i(), f($, {
            key: p.code
          }, [
            u.multiple ? (i(), f("li", Vf, [
              c("div", Rf, [
                X(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
                }, {
                  label: G(() => [
                    c("p", jf, [
                      N(g(r.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                      c("span", Of, g(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", $f, [
              X(d, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
              }, {
                default: G(() => [
                  c("span", qf, [
                    N(g(r.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                    c("span", Hf, g(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f($, null, Q(r.visibleFacets(u.code, u.values), (p) => (i(), f($, {
            key: p.code
          }, [
            u.multiple ? (i(), f("li", zf, [
              c("div", Qf, [
                X(s, {
                  small: "",
                  modelValue: r.isFacetValueSelected(u.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
                }, {
                  label: G(() => [
                    c("p", Gf, [
                      N(g(r.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                      c("span", Kf, g(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", Wf, [
              X(d, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
              }, {
                default: G(() => [
                  c("span", Xf, [
                    N(g(r.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                    c("span", Uf, g(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", Yf, [
          u.values.length > a.maxValues && !r.isFacetExpanded(u.code) ? (i(), V(d, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => r.expandFacet(u.code)
          }, {
            default: G(() => [
              N(g(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0),
          u.values.length > a.maxValues && r.isFacetExpanded(u.code) ? (i(), V(d, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => r.reduceFacet(u.code)
          }, {
            default: G(() => [
              N(g(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0)
        ])
      ], 64)) : b("", !0)
    ]))), 128))
  ]);
}
const Jf = /* @__PURE__ */ Dt(Lf, [["render", Zf], ["__scopeId", "data-v-e1d6020e"]]), Ja = () => {
  const t = q(), e = q(!1), a = q(!1), n = () => {
    if (!t.value)
      return;
    t.value.style.setProperty("--collapser", "none");
    const o = t.value.offsetHeight;
    t.value.style.setProperty("--collapse", `${-o}px`), t.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: t,
    collapsing: e,
    cssExpanded: a,
    doExpand: (o) => {
      t.value && (o === !0 && t.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        e.value = !0, n(), window.requestAnimationFrame(() => {
          a.value = o;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (o) => {
      e.value = !1, t.value && o === !1 && t.value.style.removeProperty("--collapse-max-height");
    }
  };
}, ep = "abcdefghijklmnopqrstuvwyz0123456789", Jt = ep.repeat(10), tp = () => {
  const t = Math.floor(Math.random() * Jt.length);
  return Jt[t];
}, ap = (t) => Array.from({ length: t }).map(tp).join(""), el = (t = "", e = "") => (t ? `${t}-` : "") + ap(5) + (e ? `-${e}` : ""), lp = {
  class: "relative-position",
  ref: "focus-container"
}, np = ["id", "aria-disabled", "aria-controls", "aria-expanded"], rp = ["id", "aria-labelledby"], op = { class: "fr-menu__list" }, ip = /* @__PURE__ */ A({
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => el("menu") },
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 },
    tertiary: { type: Boolean, default: !1 }
  },
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: r
    } = Ja(), o = t, s = q(!1);
    let d = q(-1), u = [];
    Ce("itemCounter", { itemCounter: d, incrementCounter: () => {
      d.value += 1;
    }, addMenuItem: (m, w) => {
      u.push(`${m}@${w}`);
    } }), Ce("id", o.id), ae(s, (m, w) => {
      m !== w && (l(m), m && setTimeout(() => h(0), 100));
    });
    let h = function(m) {
      document.getElementById(`${o.id}_item_${m}`).focus();
    }, I = function(m) {
      const w = document.activeElement.id, T = w.startsWith(`${o.id}_item_`) ? Number(w.split("_")[2]) : -1, O = T + 1 < d.value ? T + 1 : 0;
      h(O);
    }, x = function(m) {
      const w = document.activeElement.id, T = w.startsWith(`${o.id}_item_`) ? Number(w.split("_")[2]) : -1, O = T - 1 >= 0 ? T - 1 : d.value - 1;
      h(O);
    }, P = (m) => {
      let w = m.key;
      if (w.length > 1 && w.match(/\S/))
        return;
      w = w.toLowerCase();
      let T = u.filter((E) => E.toLowerCase().startsWith(w)), O = document.activeElement.id;
      for (let E of T) {
        let z = E.split("@")[1], k = document.getElementById(`${o.id}_item_${z}`);
        if (O !== k.id) {
          k.focus();
          break;
        }
      }
    };
    return (m, w) => (i(), f("div", lp, [
      c("button", H({
        id: m.id,
        onClick: w[0] || (w[0] = K((T) => s.value = !s.value, ["prevent", "stop"])),
        onKeyup: [
          w[1] || (w[1] = J(K((T) => s.value = !1, ["stop"]), ["esc"])),
          w[2] || (w[2] = J(K((T) => s.value = !s.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          w[3] || (w[3] = J(K((T) => F(h)(0), ["prevent"]), ["down"])),
          w[4] || (w[4] = J(K((T) => F(h)(F(d)), ["prevent"]), ["up"])),
          w[5] || (w[5] = //@ts-ignore
          (...T) => F(P) && F(P)(...T)),
          w[6] || (w[6] = J((T) => s.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          "fr-btn--secondary": m.secondary,
          "fr-btn--tertiary": m.tertiary
        }],
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": m.disabled,
        "aria-controls": `${m.id}_menu`,
        "aria-expanded": s.value
      }, m.$attrs), [
        m.icon !== "" ? (i(), V(F(le), {
          key: 0,
          name: m.icon
        }, null, 8, ["name"])) : b("", !0),
        c("span", null, g(m.label), 1)
      ], 16, np),
      c("div", {
        id: `${m.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: L(["fr-collapse fr-menu", { "fr-collapse--expanded": F(n), "fr-collapsing": F(a) }]),
        role: "menu",
        "aria-labelledby": m.id,
        onKeyup: w[7] || (w[7] = J((T) => s.value = !1, ["esc"])),
        onKeydown: [
          w[8] || (w[8] = J((T) => s.value = !1, ["tab"])),
          w[9] || (w[9] = J(K(
            //@ts-ignore
            (...T) => F(I) && F(I)(...T),
            ["prevent"]
          ), ["down"])),
          w[10] || (w[10] = J(K(
            //@ts-ignore
            (...T) => F(x) && F(x)(...T),
            ["prevent"]
          ), ["up"])),
          w[11] || (w[11] = //@ts-ignore
          (...T) => F(P) && F(P)(...T))
        ],
        onTransitionend: w[12] || (w[12] = (T) => F(r)(s.value))
      }, [
        c("ul", op, [
          M(m.$slots, "default", {}, void 0, !0)
        ])
      ], 42, rp)
    ], 512));
  }
}), sp = /* @__PURE__ */ Dt(ip, [["__scopeId", "data-v-d316f982"]]), dp = { role: "none" }, up = /* @__PURE__ */ A({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" }
  },
  setup(t) {
    const e = t, { itemCounter: a, incrementCounter: n, addMenuItem: l } = ke("itemCounter");
    n();
    const r = ke("id"), o = a.value;
    return oe(() => {
      l(e.label, o);
    }), (s, d) => {
      const u = ie("dsfr-button");
      return i(), f("li", dp, [
        X(u, H({
          tabindex: "-1",
          role: "menuitem",
          label: s.label,
          id: `${F(r)}_item_${F(o)}`,
          secondary: "",
          class: "fr-nav__link"
        }, s.$attrs), null, 16, ["label", "id"])
      ]);
    };
  }
}), cp = ["for"], fp = {
  key: 0,
  class: "required"
}, pp = {
  key: 0,
  class: "fr-hint-text"
}, vp = ["id", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], mp = ["id"], gp = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, bp = ["id"], hp = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, yp = ["id"], kp = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, _p = {
  key: 0,
  class: "fr-hint-text"
}, wp = {
  role: "listbox",
  "aria-multiselectable": "true",
  class: "fr-select__ul"
}, xp = ["aria-selected"], Ip = ["id", "data-id", "value"], Dp = ["for"], Cp = ["id"], Tp = /* @__PURE__ */ A({
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ De({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => el("select-multiple") },
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
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: r
    } = Ja(), o = t, s = q(!1), d = ce(t, "modelValue"), u = q(o.options);
    ae(s, (C, S) => {
      C !== S && l(C);
    });
    const p = q(null), v = q(null), h = y(() => o.errorMessage || o.successMessage), I = y(() => o.errorMessage !== "" ? "error" : "valid"), x = y(() => o.modelValue.length === u.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), P = y(() => o.modelValue.length === u.value.length ? "Tout déselectionner" : "Tout sélectionner"), m = y(() => {
      let C = `${o.modelValue.length} options séléctionnées`;
      return o.modelValue.length > 2 ? C : o.options.filter((S) => o.modelValue.includes(S.value)).map((S) => S.text).join(", ");
    });
    let w = function() {
      if (o.modelValue.length >= u.value.length)
        o.modelValue.length = 0;
      else
        for (let C of u.value)
          o.modelValue.push(C.value);
    }, T = function(C) {
      const S = C.target.value.toLowerCase();
      u.value = o.options.filter((R) => R.text.toLowerCase().indexOf(S) > -1);
    }, O = function(C) {
      document.getElementById(`${o.id}_option_${C}`).focus();
    }, E = function(C) {
      const S = document.activeElement.id, R = S.startsWith(`${o.id}_option_`) ? Number(S.split("_")[2]) : -1, U = R + 1 < u.value.length - 1 ? R + 1 : 0;
      O(U);
    }, z = function(C) {
      const S = document.activeElement.id, R = S.startsWith(`${o.id}_option_`) ? Number(S.split("_")[2]) : -1, U = R - 1 >= 0 ? R - 1 : u.value.length - 1;
      O(U);
    }, k = function(C) {
      O(0);
    }, j = function(C) {
      O(u.value.length - 1);
    }, B = function(C) {
      C.shiftKey || (o.comboHasButton ? s.value || (s.value = !0, C.preventDefault(), setTimeout(() => p.value.focus(), 100)) : o.comboHasFilter && (s.value || (s.value = !0, C.preventDefault(), setTimeout(() => v.value.focus(), 100))));
    }, W = function(C) {
      C.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.id}_button` || o.comboHasFilter && document.activeElement.id === `${o.id}_filter`) && (C.preventDefault(), s.value = !1), !o.comboHasFilter && !o.comboHasButton && (s.value = !1));
    }, _ = function(C) {
      document.activeElement.id.startsWith(`${o.id}_option_`) && (o.comboHasFilter ? (C.preventDefault(), v.value.focus()) : o.comboHasButton && p.value.focus());
    }, D = (C) => {
      let S = C.key;
      if (S.length > 1 && S.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      S = S.toLowerCase();
      let R = u.value.filter((Z) => Z.text.toLowerCase().startsWith(S)), U = document.activeElement.id;
      for (let Z of R) {
        let ee = document.querySelector(`[data-id='${Z.value}']`);
        if (U !== ee.id) {
          ee.focus();
          break;
        }
      }
    };
    return (C, S) => (i(), f($, null, [
      c("div", {
        class: L(["fr-select-group", { [`fr-select-group--${I.value}`]: h.value !== "" }])
      }, [
        c("label", {
          class: "fr-label",
          for: C.id
        }, [
          M(C.$slots, "label", {}, () => [
            N(g(C.label) + " ", 1),
            M(C.$slots, "required-tip", {}, () => [
              C.required ? (i(), f("span", fp, " *")) : b("", !0)
            ], !0)
          ], !0),
          C.description ? (i(), f("span", pp, g(C.description), 1)) : b("", !0)
        ], 8, cp),
        c("div", H({
          id: C.id,
          class: [{ [`fr-select--${I.value}`]: h.value !== "" }, "fr-input"],
          onClick: S[0] || (S[0] = K((R) => s.value = !s.value, ["prevent", "stop"])),
          onKeydown: [
            S[1] || (S[1] = J(K((R) => s.value = !1, ["stop"]), ["esc"])),
            S[2] || (S[2] = J(K((R) => s.value = !s.value, ["prevent"]), ["space"])),
            S[3] || (S[3] = J(K(
              //@ts-ignore
              (...R) => F(k) && F(k)(...R),
              ["prevent"]
            ), ["down"])),
            S[4] || (S[4] = J(K(
              //@ts-ignore
              (...R) => F(j) && F(j)(...R),
              ["prevent"]
            ), ["up"])),
            S[5] || (S[5] = J(
              //@ts-ignore
              (...R) => F(B) && F(B)(...R),
              ["tab"]
            )),
            S[6] || (S[6] = //@ts-ignore
            (...R) => F(D) && F(D)(...R))
          ],
          tabindex: "0",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-autocomplete": "none",
          "aria-disabled": C.disabled,
          "aria-controls": `${C.id}_list`,
          "aria-expanded": s.value,
          "aria-required": C.required
        }, C.$attrs), [
          c("p", null, g(m.value), 1)
        ], 16, vp),
        c("div", {
          id: `${C.id}_list`,
          ref_key: "collapse",
          ref: e,
          class: L(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": F(n), "fr-collapsing": F(a) }]),
          onKeyup: S[10] || (S[10] = J((R) => s.value = !1, ["esc"])),
          onKeydown: [
            S[11] || (S[11] = J(
              //@ts-ignore
              (...R) => F(W) && F(W)(...R),
              ["tab"]
            )),
            S[12] || (S[12] = J(K(
              //@ts-ignore
              (...R) => F(E) && F(E)(...R),
              ["prevent"]
            ), ["down"])),
            S[13] || (S[13] = J(K(
              //@ts-ignore
              (...R) => F(z) && F(z)(...R),
              ["prevent"]
            ), ["up"])),
            S[14] || (S[14] = J(K(
              //@ts-ignore
              (...R) => F(_) && F(_)(...R),
              ["shift"]
            ), ["tab"])),
            S[15] || (S[15] = //@ts-ignore
            (...R) => F(D) && F(D)(...R))
          ],
          onTransitionend: S[16] || (S[16] = (R) => F(r)(s.value))
        }, [
          C.comboHasButton ? (i(), f("ul", gp, [
            c("li", null, [
              c("button", {
                class: L(["fr-btn fr-btn--tertiary", `${x.value}`]),
                id: `${C.id}_button`,
                onClick: S[7] || (S[7] = (R) => F(w)()),
                ref_key: "button",
                ref: p,
                type: "button"
              }, g(P.value), 11, bp)
            ])
          ])) : b("", !0),
          C.comboHasFilter ? (i(), f("div", hp, [
            c("input", {
              class: "fr-input",
              id: `${C.id}_filter`,
              ref_key: "filter",
              ref: v,
              onInput: S[8] || (S[8] = //@ts-ignore
              (...R) => F(T) && F(T)(...R)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, yp)
          ])) : b("", !0),
          C.comboLabel ? (i(), f("p", kp, [
            N(g(C.comboLabel) + " ", 1),
            C.comboDescription ? (i(), f("span", _p, g(C.comboDescription), 1)) : b("", !0)
          ])) : b("", !0),
          c("ul", wp, [
            (i(!0), f($, null, Q(u.value, (R, U) => (i(), f("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": d.value.includes(R.value)
            }, [
              me(c("input", {
                id: `${C.id}_option_${U}`,
                "data-id": R.value,
                type: "checkbox",
                class: "",
                tabindex: "-1",
                value: R.value,
                "onUpdate:modelValue": S[9] || (S[9] = (Z) => d.value = Z)
              }, null, 8, Ip), [
                [ft, d.value]
              ]),
              c("label", {
                class: "fr-label",
                for: `opt_${U}`
              }, g(R.text), 9, Dp)
            ], 8, xp))), 256))
          ])
        ], 42, mp)
      ], 2),
      h.value ? (i(), f("p", {
        key: 0,
        id: `select-${I.value}-desc-${I.value}`,
        class: L(`fr-${I.value}-text`)
      }, g(h.value), 11, Cp)) : b("", !0)
    ], 64));
  }
}), Bp = /* @__PURE__ */ Dt(Tp, [["__scopeId", "data-v-fb03bb26"]]);
var Ep = {
  install: function(t, e) {
    t.use(Sf), t.component("RouterLink", Ff), t.component("DsfrSelectMultiple", Bp), t.component("DsfrFacets", Jf), t.component("DsfrMenu", sp), t.component("DsfrMenuLink", up);
  },
  methods: Af
};
window && (window.DSFR = Ep);
export {
  Ep as default
};
//# sourceMappingURL=dsfr.es.js.map
