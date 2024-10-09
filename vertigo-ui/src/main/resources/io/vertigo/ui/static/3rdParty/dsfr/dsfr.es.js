import { defineComponent as S, ref as $, computed as w, onMounted as oe, watch as ae, onUnmounted as fe, Comment as al, cloneVNode as ll, h as Et, mergeModels as Ce, useModel as ce, openBlock as i, createElementBlock as f, normalizeClass as F, createElementVNode as c, withDirectives as me, mergeProps as K, vModelCheckbox as pt, renderSlot as M, createTextVNode as V, toDisplayString as m, createCommentVNode as b, inject as we, toRef as $e, createBlock as R, resolveDynamicComponent as ne, withCtx as W, unref as N, provide as ge, resolveComponent as ie, vShow as aa, Fragment as q, renderList as Q, useCssVars as la, nextTick as na, normalizeStyle as de, normalizeProps as se, createVNode as Y, withModifiers as G, guardReactiveProps as vt, withKeys as U, useSlots as ra, hasInjectionContext as nl, reactive as rl, Teleport as ol, vModelSelect as oa, useAttrs as il, onBeforeUnmount as sl, Transition as dl } from "vue";
const mt = Symbol("accordions"), gt = Symbol("header"), qe = Symbol("tabs"), pe = () => {
  const t = $(), e = $(!1), a = $(!1), n = () => {
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
}, ul = "abcdefghijklmnopqrstuvwyz0123456789", St = ul.repeat(10), cl = () => {
  const t = Math.floor(Math.random() * St.length);
  return St[t];
}, fl = (t) => Array.from({ length: t }).map(cl).join(""), J = (t = "", e = "") => (t ? `${t}-` : "") + fl(5) + (e ? `-${e}` : ""), pl = { class: "fr-accordion" }, vl = ["aria-expanded", "aria-controls"], ml = ["id"], gl = /* @__PURE__ */ S({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => J("accordion") },
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
    } = pe(), d = $(), s = we(mt), { isActive: u, expand: p } = (s == null ? void 0 : s($e(() => e.title))) ?? { isActive: d, expand: () => d.value = !d.value };
    return oe(() => {
      u.value && r(!0);
    }), ae(u, (v, y) => {
      v !== y && r(v);
    }), (v, y) => (i(), f("section", pl, [
      (i(), R(ne(v.titleTag), { class: "fr-accordion__title" }, {
        default: W(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": N(u),
            "aria-controls": v.id,
            type: "button",
            onClick: y[0] || (y[0] = (C) => N(p)())
          }, [
            M(v.$slots, "title", {}, () => [
              V(m(v.title), 1)
            ])
          ], 8, vl)
        ]),
        _: 3
      })),
      c("div", {
        id: v.id,
        ref_key: "collapse",
        ref: a,
        class: F(["fr-collapse", {
          "fr-collapse--expanded": N(l),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": N(n)
        }]),
        onTransitionend: y[1] || (y[1] = (C) => N(o)(N(u)))
      }, [
        M(v.$slots, "default")
      ], 42, ml)
    ]));
  }
}), bl = { class: "fr-accordions-group" }, hl = /* @__PURE__ */ S({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = w({
      get: () => a.modelValue,
      set(d) {
        n("update:modelValue", d);
      }
    }), r = $(/* @__PURE__ */ new Map()), o = $(0);
    return ge(mt, (d) => {
      const s = o.value++;
      r.value.set(s, d.value);
      const u = w(() => s === l.value);
      ae(d, () => {
        r.value.set(s, d.value);
      });
      function p() {
        if (l.value === s) {
          l.value = -1;
          return;
        }
        l.value = s;
      }
      return fe(() => {
        r.value.delete(s);
      }), { isActive: u, expand: p };
    }), (d, s) => (i(), f("div", bl, [
      M(d.$slots, "default")
    ]));
  }
}), yl = ["id", "role"], kl = ["title", "aria-label"], wl = /* @__PURE__ */ S({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => J("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = () => n("close"), r = w(
      () => [
        `fr-alert--${a.type}`,
        {
          "fr-alert--sm": a.small
        }
      ]
    );
    return (o, d) => o.closed ? b("", !0) : (i(), f("div", {
      key: 0,
      id: o.id,
      class: F(["fr-alert", r.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? b("", !0) : (i(), R(ne(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: W(() => [
          V(m(o.title), 1)
        ]),
        _: 1
      })),
      M(o.$slots, "default", {}, () => [
        V(m(o.description), 1)
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
}), _l = /* @__PURE__ */ S({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(t) {
    return (e, a) => (i(), f("a", {
      class: F(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, m(e.label), 3));
  }
}), xl = ["title"], ia = /* @__PURE__ */ S({
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
      class: F(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      c("span", {
        class: F(e.ellipsis ? "fr-ellipsis" : "")
      }, m(e.label), 3)
    ], 10, xl));
  }
}), Il = ["aria-label"], Dl = ["aria-expanded", "aria-controls"], Cl = ["id"], Tl = { class: "fr-breadcrumb__list" }, Bl = ["aria-current"], El = /* @__PURE__ */ S({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => J("breadcrumb") },
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
    } = pe(), o = $(!1);
    return ae(o, (d, s) => {
      d !== s && l(d);
    }), (d, s) => {
      const u = ie("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": d.navigationLabel
      }, [
        me(c("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": d.breadcrumbId,
          onClick: s[0] || (s[0] = (p) => o.value = !o.value)
        }, m(d.showBreadcrumbLabel), 9, Dl), [
          [aa, !o.value]
        ]),
        c("div", {
          id: d.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: F(["fr-collapse", {
            "fr-collapse--expanded": N(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": N(a)
          }]),
          onTransitionend: s[1] || (s[1] = (p) => N(r)(o.value))
        }, [
          c("ol", Tl, [
            (i(!0), f(q, null, Q(d.links, (p, v) => (i(), f("li", {
              key: v,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), R(u, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": v === d.links.length - 1 ? "page" : void 0
              }, {
                default: W(() => [
                  V(m(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : b("", !0),
              p.to ? b("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": v === d.links.length - 1 ? "page" : void 0
              }, m(p.text), 9, Bl))
            ]))), 128))
          ])
        ], 42, Cl)
      ], 8, Il);
    };
  }
}), Ie = /^[a-z0-9]+(-[a-z0-9]+)*$/, He = (t, e, a, n = "") => {
  const l = t.split(":");
  if (t.slice(0, 1) === "@") {
    if (l.length < 2 || l.length > 3)
      return null;
    n = l.shift().slice(1);
  }
  if (l.length > 3 || !l.length)
    return null;
  if (l.length > 1) {
    const d = l.pop(), s = l.pop(), u = {
      // Allow provider without '@': "provider:prefix:name"
      provider: l.length > 0 ? l[0] : n,
      prefix: s,
      name: d
    };
    return e && !Le(u) ? null : u;
  }
  const r = l[0], o = r.split("-");
  if (o.length > 1) {
    const d = {
      provider: n,
      prefix: o.shift(),
      name: o.join("-")
    };
    return e && !Le(d) ? null : d;
  }
  if (a && n === "") {
    const d = {
      provider: n,
      prefix: "",
      name: r
    };
    return e && !Le(d, a) ? null : d;
  }
  return null;
}, Le = (t, e) => t ? !!((t.provider === "" || t.provider.match(Ie)) && (e && t.prefix === "" || t.prefix.match(Ie)) && t.name.match(Ie)) : !1, sa = Object.freeze(
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
}), Ke = Object.freeze({
  ...sa,
  ...Pe
}), et = Object.freeze({
  ...Ke,
  body: "",
  hidden: !1
});
function Sl(t, e) {
  const a = {};
  !t.hFlip != !e.hFlip && (a.hFlip = !0), !t.vFlip != !e.vFlip && (a.vFlip = !0);
  const n = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return n && (a.rotate = n), a;
}
function At(t, e) {
  const a = Sl(t, e);
  for (const n in et)
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
      const d = n[o] && n[o].parent, s = d && r(d);
      s && (l[o] = [d].concat(s));
    }
    return l[o];
  }
  return Object.keys(a).concat(Object.keys(n)).forEach(r), l;
}
function Ml(t, e, a) {
  const n = t.icons, l = t.aliases || /* @__PURE__ */ Object.create(null);
  let r = {};
  function o(d) {
    r = At(
      n[d] || l[d],
      r
    );
  }
  return o(e), a.forEach(o), At(t, r);
}
function da(t, e) {
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
const Ll = {
  provider: "",
  aliases: {},
  not_found: {},
  ...sa
};
function Ye(t, e) {
  for (const a in e)
    if (a in t && typeof t[a] != typeof e[a])
      return !1;
  return !0;
}
function ua(t) {
  if (typeof t != "object" || t === null)
    return null;
  const e = t;
  if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !Ye(t, Ll))
    return null;
  const a = e.icons;
  for (const l in a) {
    const r = a[l];
    if (!l.match(Ie) || typeof r.body != "string" || !Ye(
      r,
      et
    ))
      return null;
  }
  const n = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const l in n) {
    const r = n[l], o = r.parent;
    if (!l.match(Ie) || typeof o != "string" || !a[o] && !n[o] || !Ye(
      r,
      et
    ))
      return null;
  }
  return e;
}
const Mt = /* @__PURE__ */ Object.create(null);
function Fl(t, e) {
  return {
    provider: t,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function be(t, e) {
  const a = Mt[t] || (Mt[t] = /* @__PURE__ */ Object.create(null));
  return a[e] || (a[e] = Fl(t, e));
}
function bt(t, e) {
  return ua(e) ? da(e, (a, n) => {
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
function ca(t) {
  return typeof t == "boolean" && (Te = t), Te;
}
function Nl(t) {
  const e = typeof t == "string" ? He(t, !0, Te) : t;
  if (e) {
    const a = be(e.provider, e.prefix), n = e.name;
    return a.icons[n] || (a.missing.has(n) ? null : void 0);
  }
}
function Vl(t, e) {
  const a = He(t, !0, Te);
  if (!a)
    return !1;
  const n = be(a.provider, a.prefix);
  return Pl(n, a.name, e);
}
function Rl(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), Te && !e && !t.prefix) {
    let l = !1;
    return ua(t) && (t.prefix = "", da(t, (r, o) => {
      o && Vl(r, o) && (l = !0);
    })), l;
  }
  const a = t.prefix;
  if (!Le({
    provider: e,
    prefix: a,
    name: "a"
  }))
    return !1;
  const n = be(e, a);
  return !!bt(n, t);
}
const fa = Object.freeze({
  width: null,
  height: null
}), pa = Object.freeze({
  // Dimensions
  ...fa,
  // Transformations
  ...Pe
}), jl = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Ol = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Lt(t, e, a) {
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
      const d = parseFloat(r);
      isNaN(d) ? l.push(r) : l.push(Math.ceil(d * e * a) / a);
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
const Kl = (t) => t === "unset" || t === "undefined" || t === "none";
function zl(t, e) {
  const a = {
    ...Ke,
    ...t
  }, n = {
    ...pa,
    ...e
  }, l = {
    left: a.left,
    top: a.top,
    width: a.width,
    height: a.height
  };
  let r = a.body;
  [a, n].forEach((P) => {
    const g = [], E = P.hFlip, k = P.vFlip;
    let _ = P.rotate;
    E ? k ? _ += 2 : (g.push(
      "translate(" + (l.width + l.left).toString() + " " + (0 - l.top).toString() + ")"
    ), g.push("scale(-1 1)"), l.top = l.left = 0) : k && (g.push(
      "translate(" + (0 - l.left).toString() + " " + (l.height + l.top).toString() + ")"
    ), g.push("scale(1 -1)"), l.top = l.left = 0);
    let D;
    switch (_ < 0 && (_ -= Math.floor(_ / 4) * 4), _ = _ % 4, _) {
      case 1:
        D = l.height / 2 + l.top, g.unshift(
          "rotate(90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
      case 2:
        g.unshift(
          "rotate(180 " + (l.width / 2 + l.left).toString() + " " + (l.height / 2 + l.top).toString() + ")"
        );
        break;
      case 3:
        D = l.width / 2 + l.left, g.unshift(
          "rotate(-90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
    }
    _ % 2 === 1 && (l.left !== l.top && (D = l.left, l.left = l.top, l.top = D), l.width !== l.height && (D = l.width, l.width = l.height, l.height = D)), g.length && (r = Hl(
      r,
      '<g transform="' + g.join(" ") + '">',
      "</g>"
    ));
  });
  const o = n.width, d = n.height, s = l.width, u = l.height;
  let p, v;
  o === null ? (v = d === null ? "1em" : d === "auto" ? u : d, p = Lt(v, s / u)) : (p = o === "auto" ? s : o, v = d === null ? Lt(p, u / s) : d === "auto" ? u : d);
  const y = {}, C = (P, g) => {
    Kl(g) || (y[P] = g.toString());
  };
  C("width", p), C("height", v);
  const I = [l.left, l.top, s, u];
  return y.viewBox = I.join(" "), {
    attributes: y,
    viewBox: I,
    body: r
  };
}
const Ql = /\sid="(\S+)"/g, Gl = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Wl = 0;
function Ul(t, e = Gl) {
  const a = [];
  let n;
  for (; n = Ql.exec(t); )
    a.push(n[1]);
  if (!a.length)
    return t;
  const l = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return a.forEach((r) => {
    const o = typeof e == "function" ? e(r) : e + (Wl++).toString(), d = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + d + ')([")]|\\.[a-z])', "g"),
      "$1" + o + l + "$3"
    );
  }), t = t.replace(new RegExp(l, "g"), ""), t;
}
const tt = /* @__PURE__ */ Object.create(null);
function Xl(t, e) {
  tt[t] = e;
}
function at(t) {
  return tt[t] || tt[""];
}
function ht(t) {
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
const yt = /* @__PURE__ */ Object.create(null), Se = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], lt = [];
for (; Se.length > 0; )
  Se.length === 1 || Math.random() > 0.5 ? lt.push(Se.shift()) : lt.push(Se.pop());
yt[""] = ht({
  resources: ["https://api.iconify.design"].concat(lt)
});
function Yl(t, e) {
  const a = ht(e);
  return a === null ? !1 : (yt[t] = a, !0);
}
function kt(t) {
  return yt[t];
}
const Zl = () => {
  let t;
  try {
    if (t = fetch, typeof t == "function")
      return t;
  } catch {
  }
};
let Ft = Zl();
function Jl(t, e) {
  const a = kt(t);
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
  }, d = 0;
  return a.forEach((s, u) => {
    d += s.length + 1, d >= l && u > 0 && (n.push(o), o = {
      type: r,
      provider: t,
      prefix: e,
      icons: []
    }, d = s.length), o.icons.push(s);
  }), n.push(o), n;
};
function an(t) {
  if (typeof t == "string") {
    const e = kt(t);
    if (e)
      return e.path;
  }
  return "/";
}
const ln = (t, e, a) => {
  if (!Ft) {
    a("abort", 424);
    return;
  }
  let n = an(e.provider);
  switch (e.type) {
    case "icons": {
      const r = e.prefix, o = e.icons.join(","), d = new URLSearchParams({
        icons: o
      });
      n += r + ".json?" + d.toString();
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
  Ft(t + n).then((r) => {
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
    const r = l.provider, o = l.prefix, d = l.name, s = a[r] || (a[r] = /* @__PURE__ */ Object.create(null)), u = s[o] || (s[o] = be(r, o));
    let p;
    d in u.icons ? p = e.loaded : o === "" || u.missing.has(d) ? p = e.missing : p = e.pending;
    const v = {
      provider: r,
      prefix: o,
      name: d
    };
    p.push(v);
  }), e;
}
function va(t, e) {
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
      const o = r.icons, d = o.pending.length;
      o.pending = o.pending.filter((s) => {
        if (s.prefix !== l)
          return !0;
        const u = s.name;
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
      }), o.pending.length !== d && (a || va([t], r.id), r.callback(
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
  const n = sn++, l = va.bind(null, a, n);
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
    let h = t.resources.slice(0);
    for (o = []; h.length > 1; ) {
      const j = Math.floor(Math.random() * h.length);
      o.push(h[j]), h = h.slice(0, j).concat(h.slice(j + 1));
    }
    o = o.concat(h);
  } else
    o = t.resources.slice(r).concat(t.resources.slice(0, r));
  const d = Date.now();
  let s = "pending", u = 0, p, v = null, y = [], C = [];
  typeof n == "function" && C.push(n);
  function I() {
    v && (clearTimeout(v), v = null);
  }
  function P() {
    s === "pending" && (s = "aborted"), I(), y.forEach((h) => {
      h.status === "pending" && (h.status = "aborted");
    }), y = [];
  }
  function g(h, j) {
    j && (C = []), typeof h == "function" && C.push(h);
  }
  function E() {
    return {
      startTime: d,
      payload: e,
      status: s,
      queriesSent: u,
      queriesPending: y.length,
      subscribe: g,
      abort: P
    };
  }
  function k() {
    s = "failed", C.forEach((h) => {
      h(void 0, p);
    });
  }
  function _() {
    y.forEach((h) => {
      h.status === "pending" && (h.status = "aborted");
    }), y = [];
  }
  function D(h, j, B) {
    const X = j !== "success";
    switch (y = y.filter((x) => x !== h), s) {
      case "pending":
        break;
      case "failed":
        if (X || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (j === "abort") {
      p = B, k();
      return;
    }
    if (X) {
      p = B, y.length || (o.length ? z() : k());
      return;
    }
    if (I(), _(), !t.random) {
      const x = t.resources.indexOf(h.resource);
      x !== -1 && x !== t.index && (t.index = x);
    }
    s = "completed", C.forEach((x) => {
      x(B);
    });
  }
  function z() {
    if (s !== "pending")
      return;
    I();
    const h = o.shift();
    if (h === void 0) {
      if (y.length) {
        v = setTimeout(() => {
          I(), s === "pending" && (_(), k());
        }, t.timeout);
        return;
      }
      k();
      return;
    }
    const j = {
      status: "pending",
      resource: h,
      callback: (B, X) => {
        D(j, B, X);
      }
    };
    y.push(j), u++, v = setTimeout(z, t.rotate), a(h, e, j.callback);
  }
  return setTimeout(z), E;
}
function ma(t) {
  const e = {
    ...cn,
    ...t
  };
  let a = [];
  function n() {
    a = a.filter((o) => o().status === "pending");
  }
  function l(o, d, s) {
    const u = fn(
      e,
      o,
      d,
      (p, v) => {
        n(), s && s(p, v);
      }
    );
    return a.push(u), u;
  }
  function r(o) {
    return a.find((d) => o(d)) || null;
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
function Pt() {
}
const Ze = /* @__PURE__ */ Object.create(null);
function pn(t) {
  if (!Ze[t]) {
    const e = kt(t);
    if (!e)
      return;
    const a = ma(e), n = {
      config: e,
      redundancy: a
    };
    Ze[t] = n;
  }
  return Ze[t];
}
function vn(t, e, a) {
  let n, l;
  if (typeof t == "string") {
    const r = at(t);
    if (!r)
      return a(void 0, 424), Pt;
    l = r.send;
    const o = pn(t);
    o && (n = o.redundancy);
  } else {
    const r = ht(t);
    if (r) {
      n = ma(r);
      const o = t.resources ? t.resources[0] : "", d = at(o);
      d && (l = d.send);
    }
  }
  return !n || !l ? (a(void 0, 424), Pt) : n.query(e, l, a)().abort;
}
const Nt = "iconify2", Be = "iconify", ga = Be + "-count", Vt = Be + "-version", ba = 36e5, mn = 168, gn = 50;
function nt(t, e) {
  try {
    return t.getItem(e);
  } catch {
  }
}
function wt(t, e, a) {
  try {
    return t.setItem(e, a), !0;
  } catch {
  }
}
function Rt(t, e) {
  try {
    t.removeItem(e);
  } catch {
  }
}
function rt(t, e) {
  return wt(t, ga, e.toString());
}
function ot(t) {
  return parseInt(nt(t, ga)) || 0;
}
const ze = {
  local: !0,
  session: !0
}, ha = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let _t = !1;
function bn(t) {
  _t = t;
}
let Ae = typeof window > "u" ? {} : window;
function ya(t) {
  const e = t + "Storage";
  try {
    if (Ae && Ae[e] && typeof Ae[e].length == "number")
      return Ae[e];
  } catch {
  }
  ze[t] = !1;
}
function ka(t, e) {
  const a = ya(t);
  if (!a)
    return;
  const n = nt(a, Vt);
  if (n !== Nt) {
    if (n) {
      const d = ot(a);
      for (let s = 0; s < d; s++)
        Rt(a, Be + s.toString());
    }
    wt(a, Vt, Nt), rt(a, 0);
    return;
  }
  const l = Math.floor(Date.now() / ba) - mn, r = (d) => {
    const s = Be + d.toString(), u = nt(a, s);
    if (typeof u == "string") {
      try {
        const p = JSON.parse(u);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > l && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        e(p, d))
          return !0;
      } catch {
      }
      Rt(a, s);
    }
  };
  let o = ot(a);
  for (let d = o - 1; d >= 0; d--)
    r(d) || (d === o - 1 ? (o--, rt(a, o)) : ha[t].add(d));
}
function wa() {
  if (!_t) {
    bn(!0);
    for (const t in ze)
      ka(t, (e) => {
        const a = e.data, n = e.provider, l = a.prefix, r = be(
          n,
          l
        );
        if (!bt(r, a).length)
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
    for (const n in ze)
      ka(n, (l) => {
        const r = l.data;
        return l.provider !== t.provider || r.prefix !== t.prefix || r.lastModified === e;
      });
  return !0;
}
function yn(t, e) {
  _t || wa();
  function a(n) {
    let l;
    if (!ze[n] || !(l = ya(n)))
      return;
    const r = ha[n];
    let o;
    if (r.size)
      r.delete(o = Array.from(r).shift());
    else if (o = ot(l), o >= gn || !rt(l, o + 1))
      return;
    const d = {
      cached: Math.floor(Date.now() / ba),
      provider: t.provider,
      data: e
    };
    return wt(
      l,
      Be + o.toString(),
      JSON.stringify(d)
    );
  }
  e.lastModified && !hn(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && (e = Object.assign({}, e), delete e.not_found), a("local") || a("session"));
}
function jt() {
}
function kn(t) {
  t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
    t.iconsLoaderFlag = !1, on(t);
  }));
}
function wn(t, e) {
  t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
    t.iconsQueueFlag = !1;
    const { provider: a, prefix: n } = t, l = t.iconsToLoad;
    delete t.iconsToLoad;
    let r;
    !l || !(r = at(a)) || r.prepare(a, n, l).forEach((o) => {
      vn(a, o, (d) => {
        if (typeof d != "object")
          o.icons.forEach((s) => {
            t.missing.add(s);
          });
        else
          try {
            const s = bt(
              t,
              d
            );
            if (!s.length)
              return;
            const u = t.pendingIcons;
            u && s.forEach((p) => {
              u.delete(p);
            }), yn(t, d);
          } catch (s) {
            console.error(s);
          }
        kn(t);
      });
    });
  }));
}
const _n = (t, e) => {
  const a = un(t, !0, ca()), n = rn(a);
  if (!n.pending.length) {
    let s = !0;
    return e && setTimeout(() => {
      s && e(
        n.loaded,
        n.missing,
        n.pending,
        jt
      );
    }), () => {
      s = !1;
    };
  }
  const l = /* @__PURE__ */ Object.create(null), r = [];
  let o, d;
  return n.pending.forEach((s) => {
    const { provider: u, prefix: p } = s;
    if (p === d && u === o)
      return;
    o = u, d = p, r.push(be(u, p));
    const v = l[u] || (l[u] = /* @__PURE__ */ Object.create(null));
    v[p] || (v[p] = []);
  }), n.pending.forEach((s) => {
    const { provider: u, prefix: p, name: v } = s, y = be(u, p), C = y.pendingIcons || (y.pendingIcons = /* @__PURE__ */ new Set());
    C.has(v) || (C.add(v), l[u][p].push(v));
  }), r.forEach((s) => {
    const { provider: u, prefix: p } = s;
    l[u][p].length && wn(s, l[u][p]);
  }), e ? dn(e, n, r) : jt;
};
function xn(t, e) {
  const a = {
    ...t
  };
  for (const n in e) {
    const l = e[n], r = typeof l;
    n in fa ? (l === null || l && (r === "string" || r === "number")) && (a[n] = l) : r === typeof a[n] && (a[n] = n === "rotate" ? l % 4 : l);
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
const Ot = {
  ...pa,
  inline: !1
}, An = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Mn = {
  display: "inline-block"
}, it = {
  backgroundColor: "currentColor"
}, _a = {
  backgroundColor: "transparent"
}, $t = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, qt = {
  webkitMask: it,
  mask: it,
  background: _a
};
for (const t in qt) {
  const e = qt[t];
  for (const a in $t)
    e[t + a] = $t[a];
}
const Fe = {};
["horizontal", "vertical"].forEach((t) => {
  const e = t.slice(0, 1) + "Flip";
  Fe[t + "-flip"] = e, Fe[t.slice(0, 1) + "-flip"] = e, Fe[t + "Flip"] = e;
});
function Ht(t) {
  return t + (t.match(/^[-0-9.]+$/) ? "px" : "");
}
const Kt = (t, e) => {
  const a = xn(Ot, e), n = { ...An }, l = e.mode || "svg", r = {}, o = e.style, d = typeof o == "object" && !(o instanceof Array) ? o : {};
  for (let P in e) {
    const g = e[P];
    if (g !== void 0)
      switch (P) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          a[P] = g === !0 || g === "true" || g === 1;
          break;
        case "flip":
          typeof g == "string" && Dn(a, g);
          break;
        case "color":
          r.color = g;
          break;
        case "rotate":
          typeof g == "string" ? a[P] = Cn(g) : typeof g == "number" && (a[P] = g);
          break;
        case "ariaHidden":
        case "aria-hidden":
          g !== !0 && g !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const E = Fe[P];
          E ? (g === !0 || g === "true" || g === 1) && (a[E] = !0) : Ot[P] === void 0 && (n[P] = g);
        }
      }
  }
  const s = zl(t, a), u = s.attributes;
  if (a.inline && (r.verticalAlign = "-0.125em"), l === "svg") {
    n.style = {
      ...r,
      ...d
    }, Object.assign(n, u);
    let P = 0, g = e.id;
    return typeof g == "string" && (g = g.replace(/-/g, "_")), n.innerHTML = Ul(s.body, g ? () => g + "ID" + P++ : "iconifyVue"), Et("svg", n);
  }
  const { body: p, width: v, height: y } = t, C = l === "mask" || (l === "bg" ? !1 : p.indexOf("currentColor") !== -1), I = Tn(p, {
    ...u,
    width: v + "",
    height: y + ""
  });
  return n.style = {
    ...r,
    "--svg": Sn(I),
    width: Ht(u.width),
    height: Ht(u.height),
    ...Mn,
    ...C ? it : _a,
    ...d
  }, Et("span", n);
};
ca(!0);
Xl("", nn);
if (typeof document < "u" && typeof window < "u") {
  wa();
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
const Ln = {
  ...Ke,
  body: ""
}, Fn = S({
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
          abort: _n([a], () => {
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
      return Kt(Ln, t);
    let a = t;
    return e.classes && (a = {
      ...t,
      class: (typeof t.class == "string" ? t.class + " " : "") + e.classes.join(" ")
    }), Kt({
      ...Ke,
      ...e.data
    }, a);
  }
}), Pn = /* @__PURE__ */ S({
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
    la((s) => ({
      "98d5b8bc": d.value
    }));
    const e = t, a = $(null), n = w(() => `${+e.scale * 1.2}rem`), l = w(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    ae(() => e.title, r);
    async function r() {
      var s, u, p, v;
      if (!((s = a.value) != null && s.$el))
        return;
      const y = !!((u = a.value) == null ? void 0 : u.$el).querySelector("title"), C = document.createElement("title");
      if (!e.title) {
        C.remove();
        return;
      }
      C.innerHTML = e.title, await na(), y || (v = ((p = a.value) == null ? void 0 : p.$el).firstChild) == null || v.before(C);
    }
    oe(r);
    const o = w(() => {
      var s;
      return (s = e.name) != null && s.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), d = w(() => e.color ?? e.fill ?? "inherit");
    return (s, u) => (i(), R(N(Fn), {
      ref_key: "icon",
      ref: a,
      icon: o.value,
      style: de({ fontSize: n.value, verticalAlign: s.verticalAlign, display: s.display }),
      "aria-label": s.label,
      class: F(["vicon", {
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
      ssr: s.ssr
    }, null, 8, ["icon", "style", "aria-label", "class", "flip", "ssr"]));
  }
}), re = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, le = /* @__PURE__ */ re(Pn, [["__scopeId", "data-v-33ecc4e5"]]), Nn = ["title", "disabled", "aria-disabled"], Vn = { key: 1 }, Rn = /* @__PURE__ */ S({
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
    const a = t, n = w(() => ["sm", "small"].includes(a.size)), l = w(() => ["md", "medium"].includes(a.size)), r = w(() => ["lg", "large"].includes(a.size)), o = $(null);
    e({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const d = w(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), s = w(() => a.iconOnly ? 1.25 : 0.8325), u = w(
      () => typeof a.icon == "string" ? { scale: s.value, name: a.icon } : { scale: s.value, ...a.icon }
    );
    return (p, v) => (i(), f("button", {
      ref_key: "btn",
      ref: o,
      class: F(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": n.value,
        "fr-btn--md": l.value,
        "fr-btn--lg": r.value,
        "fr-btn--icon-right": !p.iconOnly && d.value && p.iconRight,
        "fr-btn--icon-left": !p.iconOnly && d.value && !p.iconRight,
        "inline-flex": !d.value,
        reverse: p.iconRight && !d.value,
        "justify-center": !d.value && p.iconOnly,
        [p.icon]: d.value
      }]),
      title: p.iconOnly ? p.label : void 0,
      disabled: p.disabled,
      "aria-disabled": p.disabled,
      style: de(!d.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: v[0] || (v[0] = (y) => p.onClick ? p.onClick(y) : () => {
      })
    }, [
      p.icon && !d.value ? (i(), R(le, se(K({ key: 0 }, u.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", Vn, [
        V(m(p.label) + " ", 1),
        M(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Nn));
  }
}), Ee = /* @__PURE__ */ re(Rn, [["__scopeId", "data-v-77b13897"]]), Qe = /* @__PURE__ */ S({
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
    const e = t, a = $(null), n = w(() => ["sm", "small"].includes(e.size)), l = w(() => ["md", "medium"].includes(e.size)), r = w(() => ["lg", "large"].includes(e.size)), o = w(() => ["always", "", !0].includes(e.inlineLayoutWhen)), d = w(() => ["sm", "small"].includes(e.inlineLayoutWhen)), s = w(() => ["md", "medium"].includes(e.inlineLayoutWhen)), u = w(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = w(() => e.align === "center"), v = w(() => e.align === "right"), y = $("auto"), C = w(() => `--equisized-width: ${y.value};`), I = async () => {
      var P;
      let g = 0;
      await new Promise((E) => setTimeout(E, 100)), (P = a.value) == null || P.querySelectorAll(".fr-btn").forEach((E) => {
        const k = E, _ = k.offsetWidth, D = window.getComputedStyle(k), z = +D.marginLeft.replace("px", ""), h = +D.marginRight.replace("px", "");
        k.style.width = "var(--equisized-width)";
        const j = _ + z + h;
        j > g && (g = j);
      }), y.value = `${g}px`;
    };
    return oe(async () => {
      !a.value || !e.equisized || await I();
    }), (P, g) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: de(C.value),
      class: F(["fr-btns-group", {
        "fr-btns-group--equisized": P.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": l.value,
        "fr-btns-group--lg": r.value,
        "fr-btns-group--inline-sm": o.value || d.value,
        "fr-btns-group--inline-md": o.value || s.value,
        "fr-btns-group--inline-lg": o.value || u.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": v.value,
        "fr-btns-group--icon-right": P.iconRight,
        "fr-btns-group--inline-reverse": P.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(q, null, Q(P.buttons, ({ onClick: E, ...k }, _) => (i(), f("li", { key: _ }, [
        Y(Ee, K({ ref_for: !0 }, k, { onClick: E }), null, 16, ["onClick"])
      ]))), 128)),
      M(P.$slots, "default")
    ], 6));
  }
}), jn = { class: "fr-callout__text" }, On = /* @__PURE__ */ S({
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
    const e = t, a = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), n = w(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : { ...e.icon ?? {} });
    return (l, r) => (i(), f("div", {
      class: F(["fr-callout", { [String(l.icon)]: a.value }])
    }, [
      l.icon && n.value ? (i(), R(le, se(K({ key: 0 }, n.value)), null, 16)) : b("", !0),
      l.title ? (i(), R(ne(l.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: W(() => [
          V(m(l.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      c("p", jn, m(l.content), 1),
      l.button ? (i(), R(Ee, se(K({ key: 2 }, l.button)), null, 16)) : b("", !0),
      M(l.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), $n = /* @__PURE__ */ re(On, [["__scopeId", "data-v-a34b4ad8"]]), st = /* @__PURE__ */ S({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = w(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, r) => (i(), f("p", {
      class: F(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
    }, [
      l.icon && !a.value ? (i(), R(le, se(K({ key: 0 }, n.value)), null, 16)) : b("", !0),
      M(l.$slots, "default")
    ], 2));
  }
}), qn = { class: "fr-card__body" }, Hn = { class: "fr-card__content" }, Kn = ["href"], zn = { class: "fr-card__desc" }, Qn = {
  key: 0,
  class: "fr-card__start"
}, Gn = {
  key: 1,
  class: "fr-card__end"
}, Wn = {
  key: 0,
  class: "fr-card__footer"
}, Un = {
  key: 1,
  class: "fr-links-group"
}, Xn = ["href"], Yn = {
  key: 0,
  class: "fr-card__header"
}, Zn = {
  key: 0,
  class: "fr-card__img"
}, Jn = ["src", "alt"], er = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, tr = /* @__PURE__ */ S({
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
    const a = t, n = w(() => ["sm", "small"].includes(a.size)), l = w(() => ["lg", "large"].includes(a.size)), r = w(() => ["sm", "small"].includes(a.imgRatio)), o = w(() => ["lg", "large"].includes(a.imgRatio)), d = w(() => typeof a.link == "string" && a.link.startsWith("http")), s = $(null);
    return e({ goToTargetLink: () => {
      var u;
      ((u = s.value) == null ? void 0 : u.querySelector(".fr-card__link")).click();
    } }), (u, p) => {
      const v = ie("RouterLink");
      return i(), f("div", {
        class: F(["fr-card", {
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
            (i(), R(ne(u.titleTag), { class: "fr-card__title" }, {
              default: W(() => [
                d.value ? (i(), f("a", {
                  key: 0,
                  href: u.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, m(u.title), 9, Kn)) : u.link ? (i(), R(v, {
                  key: 1,
                  to: u.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (y) => y.stopPropagation())
                }, {
                  default: W(() => [
                    V(m(u.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(q, { key: 2 }, [
                  V(m(u.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", zn, m(u.description), 1),
            u.$slots["start-details"] || u.detail ? (i(), f("div", Qn, [
              M(u.$slots, "start-details"),
              u.detail ? (i(), R(st, {
                key: 0,
                icon: u.detailIcon
              }, {
                default: W(() => [
                  V(m(u.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0),
            u.$slots["end-details"] || u.endDetail ? (i(), f("div", Gn, [
              M(u.$slots, "end-details"),
              u.endDetail ? (i(), R(st, {
                key: 0,
                icon: u.endDetailIcon
              }, {
                default: W(() => [
                  V(m(u.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0)
          ]),
          u.buttons.length || u.linksGroup.length ? (i(), f("div", Wn, [
            u.buttons.length ? (i(), R(Qe, {
              key: 0,
              buttons: u.buttons,
              "inline-layout-when": "always",
              size: u.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            u.linksGroup.length ? (i(), f("ul", Un, [
              (i(!0), f(q, null, Q(u.linksGroup, (y, C) => (i(), f("li", {
                key: `card-link-${C}`
              }, [
                y.to ? (i(), R(v, {
                  key: 0,
                  to: y.to
                }, {
                  default: W(() => [
                    V(m(y.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: y.link || y.href,
                  class: F(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": l.value
                  }])
                }, m(y.label), 11, Xn))
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
            (i(!0), f(q, null, Q(u.badges, (y, C) => (i(), f("li", { key: C }, [
              Y(ia, K({ ref_for: !0 }, y), null, 16)
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
}, xt = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ Ce({
    id: { default: () => J("basic", "checkbox") },
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
    const e = t, a = w(() => e.errorMessage || e.validMessage), n = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = ce(t, "modelValue");
    return (r, o) => (i(), f("div", {
      class: F(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: F(["fr-checkbox-group", {
          "fr-checkbox-group--error": r.errorMessage,
          "fr-checkbox-group--valid": !r.errorMessage && r.validMessage,
          "fr-checkbox-group--sm": r.small
        }])
      }, [
        me(c("input", K({
          id: r.id,
          "onUpdate:modelValue": o[0] || (o[0] = (d) => l.value = d),
          name: r.name,
          type: "checkbox",
          value: r.value,
          checked: l.value === !0 || Array.isArray(l.value) && l.value.includes(r.value),
          required: r.required
        }, r.$attrs, {
          "data-testid": `input-checkbox-${r.id}`,
          "data-test": `input-checkbox-${r.id}`
        }), null, 16, ar), [
          [pt, l.value]
        ]),
        c("label", {
          for: r.id,
          class: "fr-label"
        }, [
          M(r.$slots, "label", {}, () => [
            V(m(r.label) + " ", 1),
            M(r.$slots, "required-tip", {}, () => [
              r.required ? (i(), f("span", nr, " *")) : b("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", rr, m(r.hint), 1)) : b("", !0)
        ], 8, lr),
        a.value ? (i(), f("div", or, [
          c("p", {
            class: F(["fr-message--info flex items-center", n.value])
          }, m(a.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), ir = { class: "fr-form-group" }, sr = ["disabled", "aria-labelledby", "aria-invalid", "role"], dr = ["id"], ur = {
  key: 0,
  class: "required"
}, cr = ["id"], fr = /* @__PURE__ */ S({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Ce({
    titleId: { default: () => J("checkbox", "group") },
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
    const e = t, a = w(() => e.errorMessage || e.validMessage), n = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = w(() => a.value ? `${e.titleId} messages-${e.titleId}` : e.titleId), r = ce(t, "modelValue");
    return (o, d) => (i(), f("div", ir, [
      c("fieldset", {
        class: F(["fr-fieldset", {
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
            V(m(o.legend) + " ", 1),
            M(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", ur, " *")) : b("", !0)
            ])
          ])
        ], 8, dr),
        M(o.$slots, "default", {}, () => [
          (i(!0), f(q, null, Q(o.options, (s) => (i(), R(xt, {
            id: s.id,
            key: s.id || s.name,
            modelValue: r.value,
            "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u),
            value: s.value,
            name: s.name,
            label: s.label,
            disabled: s.disabled,
            "aria-disabled": s.disabled,
            small: o.small,
            inline: o.inline,
            hint: s.hint
          }, null, 8, ["id", "modelValue", "value", "name", "label", "disabled", "aria-disabled", "small", "inline", "hint"]))), 128))
        ]),
        a.value ? (i(), f("div", {
          key: 0,
          id: `messages-${o.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          c("p", {
            class: F(["fr-message--info flex items-center", n.value])
          }, [
            c("span", null, m(a.value), 1)
          ], 2)
        ], 8, cr)) : b("", !0)
      ], 10, sr)
    ]));
  }
}), pr = { class: "fr-consent-banner__content" }, vr = { class: "fr-text--sm" }, mr = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, gr = /* @__PURE__ */ S({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = w(() => typeof e.url == "string" && e.url.startsWith("http")), n = w(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = w(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (r, o) => (i(), f(q, null, [
      c("div", pr, [
        c("p", vr, [
          M(r.$slots, "default", {}, () => [
            o[4] || (o[4] = V(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), R(ne(n.value), K(l.value, { "data-testid": "link" }), {
              default: W(() => o[3] || (o[3] = [
                V(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = V(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", mr, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = G((d) => r.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = G((d) => r.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = G((d) => r.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), br = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, hr = { class: "fr-pagination__list" }, yr = ["href", "title", "disabled", "aria-disabled"], kr = ["href", "title", "disabled", "aria-disabled"], wr = ["href", "title", "aria-current", "onClick"], _r = { key: 0 }, xr = { key: 1 }, Ir = ["href", "title", "disabled", "aria-disabled"], Dr = ["href", "title", "disabled", "aria-disabled"], Cr = /* @__PURE__ */ S({
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
    const a = t, n = e, l = w(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), r = w(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), o = w(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, r.value + 1) : a.pages), d = (I) => n("update:current-page", I), s = (I) => d(I), u = () => s(0), p = () => s(Math.max(0, a.currentPage - 1)), v = () => s(Math.min(a.pages.length - 1, a.currentPage + 1)), y = () => s(a.pages.length - 1), C = (I) => a.pages.indexOf(I) === a.currentPage;
    return (I, P) => {
      var g, E, k, _;
      return i(), f("nav", br, [
        c("ul", hr, [
          c("li", null, [
            c("a", {
              href: (g = I.pages[0]) == null ? void 0 : g.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: I.firstPageTitle,
              disabled: I.currentPage === 0 ? !0 : void 0,
              "aria-disabled": I.currentPage === 0 ? !0 : void 0,
              onClick: P[0] || (P[0] = G((D) => u(), ["prevent"]))
            }, null, 8, yr)
          ]),
          c("li", null, [
            c("a", {
              href: (E = I.pages[Math.max(I.currentPage - 1, 0)]) == null ? void 0 : E.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: I.prevPageTitle,
              disabled: I.currentPage === 0 ? !0 : void 0,
              "aria-disabled": I.currentPage === 0 ? !0 : void 0,
              onClick: P[1] || (P[1] = G((D) => p(), ["prevent"]))
            }, m(I.prevPageTitle), 9, kr)
          ]),
          (i(!0), f(q, null, Q(o.value, (D, z) => (i(), f("li", { key: z }, [
            c("a", {
              href: D == null ? void 0 : D.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: D.title,
              "aria-current": C(D) ? "page" : void 0,
              onClick: G((h) => s(I.pages.indexOf(D)), ["prevent"])
            }, [
              o.value.indexOf(D) === 0 && l.value > 0 ? (i(), f("span", _r, "...")) : b("", !0),
              V(" " + m(D.label) + " ", 1),
              o.value.indexOf(D) === o.value.length - 1 && r.value < I.pages.length - 1 ? (i(), f("span", xr, "...")) : b("", !0)
            ], 8, wr)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (k = I.pages[Math.min(I.currentPage + 1, I.pages.length - 1)]) == null ? void 0 : k.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: I.nextPageTitle,
              disabled: I.currentPage === I.pages.length - 1 ? !0 : void 0,
              "aria-disabled": I.currentPage === I.pages.length - 1 ? !0 : void 0,
              onClick: P[2] || (P[2] = G((D) => v(), ["prevent"]))
            }, m(I.nextPageTitle), 9, Ir)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (_ = I.pages.at(-1)) == null ? void 0 : _.href,
              title: I.lastPageTitle,
              disabled: I.currentPage === I.pages.length - 1 ? !0 : void 0,
              "aria-disabled": I.currentPage === I.pages.length - 1 ? !0 : void 0,
              onClick: P[3] || (P[3] = G((D) => y(), ["prevent"]))
            }, null, 8, Dr)
          ])
        ])
      ]);
    };
  }
}), xa = /* @__PURE__ */ re(Cr, [["__scopeId", "data-v-4dfa8248"]]), Tr = { class: "fr-table" }, Br = { class: "fr-table__wrapper" }, Er = { class: "fr-table__container" }, Sr = { class: "fr-table__content" }, Ar = ["id"], Mr = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Lr = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Fr = ["id", "checked"], Pr = ["for"], Nr = ["tabindex", "onClick", "onKeydown"], Vr = { key: 0 }, Rr = { key: 1 }, jr = ["data-row-key"], Or = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, $r = { class: "fr-checkbox-group fr-checkbox-group--sm" }, qr = ["id", "value"], Hr = ["for"], Kr = ["onKeydown"], zr = { class: "flex gap-2 items-center" }, Qr = ["selected"], Gr = ["value", "selected"], Wr = { class: "flex ml-1" }, Ur = { class: "self-center" }, Xr = /* @__PURE__ */ S({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Ce({
    id: { default: () => J("table") },
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
  emits: /* @__PURE__ */ Ce(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(t, { emit: e }) {
    const a = t, n = e, l = ce(t, "selection"), r = ce(t, "rowsPerPage"), o = ce(t, "currentPage"), d = w(() => Math.ceil(a.rows.length / r.value)), s = w(() => a.pages ?? Array.from({ length: d.value }).map((h, j) => ({ label: `${j + 1}`, title: `Page ${j + 1}`, href: `#${j + 1}` }))), u = w(() => o.value * r.value), p = w(() => (o.value + 1) * r.value);
    function v(h, j) {
      const B = a.sorted;
      return (h[B] ?? h) < (j[B] ?? j) ? -1 : (h[B] ?? h) > (j[B] ?? j) ? 1 : 0;
    }
    const y = ce(t, "sortedBy"), C = ce(t, "sortedDesc");
    function I(h) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(h))) {
        if (y.value === h) {
          if (C.value) {
            y.value = void 0, C.value = !1;
            return;
          }
          C.value = !0;
          return;
        }
        C.value = !1, y.value = h;
      }
    }
    const P = w(() => {
      const h = y.value ? a.rows.slice().sort(a.sortFn ?? v) : a.rows.slice();
      return C.value && h.reverse(), h;
    }), g = w(() => {
      const h = a.headersRow.map((B) => typeof B != "object" ? B : B.key), j = P.value.map((B) => Array.isArray(B) ? B : h.map((X) => typeof B != "object" ? B : B[X] ?? B));
      return a.pagination ? j.slice(u.value, p.value) : j;
    });
    function E(h) {
      if (h) {
        const j = a.headersRow.findIndex((B) => B.key ?? B);
        l.value = g.value.map((B) => B[j]);
      }
      l.value.length = 0;
    }
    const k = $(!1);
    function _() {
      k.value = l.value.length === g.value.length;
    }
    function D() {
      n("update:current-page", 0), k.value = !1, l.value.length = 0;
    }
    function z(h) {
      navigator.clipboard.writeText(h);
    }
    return (h, j) => (i(), f("div", Tr, [
      c("div", Br, [
        c("div", Er, [
          c("div", Sr, [
            c("table", { id: h.id }, [
              c("caption", null, m(h.title), 1),
              c("thead", null, [
                c("tr", null, [
                  h.selectableRows ? (i(), f("th", Mr, [
                    c("div", Lr, [
                      c("input", {
                        id: `table-select--${h.id}-all`,
                        checked: k.value,
                        type: "checkbox",
                        onInput: j[0] || (j[0] = (B) => E(B.target.checked))
                      }, null, 40, Fr),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${h.id}-all`
                      }, " Sélectionner tout ", 8, Pr)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(q, null, Q(h.headersRow, (B, X) => (i(), f("th", K({
                    key: typeof B == "object" ? B.key : B,
                    scope: "col",
                    ref_for: !0
                  }, typeof B == "object" && B.headerAttrs, {
                    tabindex: h.sortableRows ? 0 : void 0,
                    onClick: (x) => I(B.key ?? (Array.isArray(h.rows[0]) ? X : B)),
                    onKeydown: [
                      U((x) => I(B.key ?? B), ["enter"]),
                      U((x) => I(B.key ?? B), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: F({ "sortable-header": h.sortableRows === !0 || Array.isArray(h.sortableRows) && h.sortableRows.includes(B.key ?? B) })
                    }, [
                      M(h.$slots, "header", K({ ref_for: !0 }, typeof B == "object" ? B : { key: B, label: B }), () => [
                        V(m(typeof B == "object" ? B.label : B), 1)
                      ], !0),
                      y.value !== (B.key ?? B) && (h.sortableRows === !0 || Array.isArray(h.sortableRows) && h.sortableRows.includes(B.key ?? B)) ? (i(), f("span", Vr, [
                        Y(le, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : y.value === (B.key ?? B) ? (i(), f("span", Rr, [
                        Y(le, {
                          name: C.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Nr))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(q, null, Q(g.value, (B, X) => (i(), f("tr", {
                  key: `row-${X}`,
                  "data-row-key": X + 1
                }, [
                  h.selectableRows ? (i(), f("th", Or, [
                    c("div", $r, [
                      me(c("input", {
                        id: `row-select-${h.id}-${X}`,
                        "onUpdate:modelValue": j[1] || (j[1] = (x) => l.value = x),
                        value: h.rows[X][h.rowKey] ?? `row-${X}`,
                        type: "checkbox",
                        onChange: j[2] || (j[2] = (x) => _())
                      }, null, 40, qr), [
                        [pt, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${h.id}-${X}`
                      }, " Sélectionner la ligne " + m(X + 1), 9, Hr)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(q, null, Q(B, (x, T) => (i(), f("td", {
                    key: typeof x == "object" ? x[h.rowKey] : x,
                    tabindex: "0",
                    onKeydown: [
                      U(G((O) => z(typeof x == "object" ? x[h.rowKey] : x), ["ctrl"]), ["c"]),
                      U(G((O) => z(typeof x == "object" ? x[h.rowKey] : x), ["meta"]), ["c"])
                    ]
                  }, [
                    M(h.$slots, "cell", K({ ref_for: !0 }, {
                      colKey: typeof h.headersRow[T] == "object" ? h.headersRow[T].key : h.headersRow[T],
                      cell: x
                    }), () => [
                      V(m(typeof x == "object" ? x[h.rowKey] : x), 1)
                    ], !0)
                  ], 40, Kr))), 128))
                ], 8, jr))), 128))
              ])
            ], 8, Ar)
          ])
        ])
      ]),
      c("div", {
        class: F(h.bottomActionBarClass)
      }, [
        M(h.$slots, "pagination", {}, () => [
          h.pagination && !h.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: F(["flex justify-between items-center", h.paginationWrapperClass])
          }, [
            c("div", zr, [
              j[6] || (j[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              me(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": j[3] || (j[3] = (B) => r.value = B),
                class: "fr-select",
                onChange: j[4] || (j[4] = (B) => D())
              }, [
                c("option", {
                  value: "",
                  selected: !h.paginationOptions.includes(r.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Qr),
                (i(!0), f(q, null, Q(h.paginationOptions, (B, X) => (i(), f("option", {
                  key: X,
                  value: B,
                  selected: +B === r.value
                }, m(B), 9, Gr))), 128))
              ], 544), [
                [oa, r.value]
              ])
            ]),
            c("div", Wr, [
              c("span", Ur, "Page " + m(o.value + 1) + " sur " + m(d.value), 1)
            ]),
            Y(xa, {
              "current-page": o.value,
              "onUpdate:currentPage": j[5] || (j[5] = (B) => o.value = B),
              pages: s.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Yr = /* @__PURE__ */ re(Xr, [["__scopeId", "data-v-1d55e1f1"]]), Zr = "data:image/png;base64,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", Jr = { class: "fr-container flex" }, eo = { class: "half" }, to = { class: "fr-h1" }, ao = { class: "flex fr-my-md-3w" }, lo = { class: "fr-h6" }, no = /* @__PURE__ */ S({
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
          c("h1", to, m(e.title), 1),
          c("span", ao, m(e.subtitle), 1),
          c("p", lo, m(e.description), 1),
          c("p", null, m(e.help), 1),
          (n = e.buttons) != null && n.length ? (i(), R(Qe, {
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
}, uo = { class: "fr-fieldset__element" }, co = /* @__PURE__ */ S({
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
          class: F(["fr-fieldset__legend", e.legendClass])
        }, [
          V(m(e.legend) + " ", 1),
          M(e.$slots, "legend")
        ], 10, io)) : b("", !0),
        e.hint || (o = (r = e.$slots).hint) != null && o.call(r).length ? (i(), f("div", so, [
          c("span", {
            class: F(["fr-hint-text", e.hintClass])
          }, [
            V(m(e.hint) + " ", 1),
            M(e.$slots, "hint")
          ], 2)
        ])) : b("", !0),
        c("div", uo, [
          M(e.$slots, "default")
        ])
      ]);
    };
  }
}), fo = ["href", "download"], po = { class: "fr-link__detail" }, Ia = /* @__PURE__ */ S({
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
      V(m(e.title) + " ", 1),
      c("span", po, m(e.format) + " – " + m(e.size), 1)
    ], 8, fo));
  }
}), vo = { class: "fr-downloads-group fr-downloads-group--bordered" }, mo = {
  key: 0,
  class: "fr-downloads-group__title"
}, go = /* @__PURE__ */ S({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", vo, [
      e.title ? (i(), f("h4", mo, m(e.title), 1)) : b("", !0),
      c("ul", null, [
        (i(!0), f(q, null, Q(e.files, (n, l) => (i(), f("li", { key: l }, [
          Y(Ia, {
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
}, ko = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], wo = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, _o = ["id"], xo = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => J("file-upload") },
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
      var d, s;
      n("update:modelValue", (d = o.target) == null ? void 0 : d.value), n("change", (s = o.target) == null ? void 0 : s.files);
    }, r = w(() => Array.isArray(a.accept) ? a.accept.join(",") : a.accept);
    return (o, d) => (i(), f("div", {
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
        V(m(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", ho, " *")) : b("", !0),
        o.hint ? (i(), f("span", yo, m(o.hint), 1)) : b("", !0)
      ], 8, bo),
      c("input", K({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: r.value,
        onChange: d[0] || (d[0] = (s) => l(s))
      }), null, 16, ko),
      o.error || o.validMessage ? (i(), f("div", wo, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, m(o.error ?? o.validMessage), 9, _o)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Io = { class: "fr-follow__newsletter" }, Do = { class: "fr-h5 fr-follow__title" }, Co = { class: "fr-text--sm fr-follow__desc" }, To = { key: 0 }, Bo = ["title"], Eo = { key: 1 }, So = { action: "" }, Ao = {
  class: "fr-label",
  for: "newsletter-email"
}, Mo = { class: "fr-input-wrap fr-input-wrap--addon" }, Lo = ["title", "placeholder", "value"], Fo = ["title"], Po = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, No = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Vo = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, Da = /* @__PURE__ */ S({
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
        c("h3", Do, m(l.title), 1),
        c("p", Co, m(l.description), 1)
      ]),
      l.onlyCallout ? (i(), f("div", To, [
        c("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: r[0] || (r[0] = (o) => l.buttonAction ? l.buttonAction(o) : () => {
          })
        }, m(l.buttonText), 9, Bo)
      ])) : (i(), f("div", Eo, [
        c("form", So, [
          c("label", Ao, m(l.labelEmail), 1),
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
            }, null, 40, Lo),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, m(l.buttonText), 9, Fo)
          ]),
          l.error ? (i(), f("div", Po, [
            c("p", No, m(l.error), 1)
          ])) : b("", !0),
          c("p", Vo, m(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), Ro = { class: "fr-follow__social" }, jo = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Oo = ["title", "href"], Ca = /* @__PURE__ */ S({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Ro, [
      (i(), R(ne(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: W(() => a[0] || (a[0] = [
          V(" Suivez-nous "),
          c("br", null, null, -1),
          V(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (i(), f("ul", jo, [
        (i(!0), f(q, null, Q(e.networks, (n, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: F(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, m(n.name), 11, Oo)
        ]))), 128))
      ])) : b("", !0)
    ]));
  }
}), $o = { class: "fr-follow" }, qo = { class: "fr-container" }, Ho = { class: "fr-grid-row" }, Ko = /* @__PURE__ */ S({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = w(() => e.networks && e.networks.length), n = w(() => typeof e.newsletterData == "object");
    return (l, r) => (i(), f("div", $o, [
      c("div", qo, [
        c("div", Ho, [
          M(l.$slots, "default", {}, () => [
            l.newsletterData ? (i(), f("div", {
              key: 0,
              class: F(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              Y(Da, se(vt(l.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            a.value ? (i(), f("div", {
              key: 1,
              class: F(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              Y(Ca, { networks: l.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), zt = 1, Ta = /* @__PURE__ */ S({
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
    const e = t, a = w(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("http");
    }), n = w(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("mailto");
    }), l = w(() => e.button ? "button" : a.value || n.value ? "a" : "RouterLink"), r = w(() => {
      if (!(!a.value && !n.value))
        return e.href;
    }), o = w(() => {
      if (!(a.value || n.value))
        return e.to;
    }), d = w(() => o.value ? { to: o.value } : { href: r.value }), s = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = w(
      () => typeof e.icon == "string" ? { name: e.icon, scale: zt, ...e.iconAttrs ?? {} } : { scale: zt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, v) => (i(), R(ne(l.value), K({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": s.value && p.iconRight,
        "fr-btn--icon-left": s.value && !p.iconRight,
        [String(p.icon)]: s.value
      }]
    }, d.value, {
      target: p.target,
      onClick: G(p.onClick, ["stop"])
    }), {
      default: W(() => {
        var y, C;
        return [
          !s.value && (p.icon || (y = p.iconAttrs) != null && y.name) && !p.iconRight ? (i(), R(le, K({
            key: 0,
            class: "fr-mr-1w"
          }, u.value), null, 16)) : b("", !0),
          V(" " + m(p.label) + " ", 1),
          !s.value && (p.icon || (C = p.iconAttrs) != null && C.name) && p.iconRight ? (i(), R(le, K({
            key: 1,
            class: "fr-ml-1w"
          }, u.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), zo = { class: "fr-footer__partners" }, Qo = {
  key: 0,
  class: "fr-footer__partners-title"
}, Go = { class: "fr-footer__partners-logos" }, Wo = {
  key: 0,
  class: "fr-footer__partners-main"
}, Uo = ["href"], Xo = ["src", "alt"], Yo = { class: "fr-footer__partners-sub" }, Zo = ["href"], Jo = ["src", "alt"], Ba = /* @__PURE__ */ S({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", zo, [
      e.title ? (i(), f("h4", Qo, m(e.title), 1)) : b("", !0),
      c("div", Go, [
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
            }, null, 8, Xo)
          ], 8, Uo)
        ])) : b("", !0),
        c("div", Yo, [
          c("ul", null, [
            (i(!0), f(q, null, Q(e.subPartners, (n, l) => (i(), f("li", { key: l }, [
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
}), ei = ["innerHTML"], Ne = /* @__PURE__ */ S({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(t) {
    const e = t, a = w(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (n, l) => (i(), f("p", {
      class: F(["fr-logo", {
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
}, yi = /* @__PURE__ */ S({
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
    const e = t, a = w(() => [
      ...e.beforeMandatoryLinks,
      ...e.mandatoryLinks,
      ...e.afterMandatoryLinks
    ]), n = ra(), l = w(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n).length;
    }), r = w(() => {
      const p = e.licenceTo || e.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = w(() => {
      const { to: p, href: v, ...y } = e.licenceLinkProps ?? {};
      return y;
    }), d = w(() => r.value ? "" : e.licenceTo), s = w(() => r.value ? e.licenceTo : ""), u = w(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (p, v) => {
      const y = ie("RouterLink");
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
              Y(Ne, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
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
              ], 8, si)) : (i(), R(y, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: W(() => [
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
              Y(y, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: W(() => [
                  Y(Ne, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", fi, [
              c("p", pi, [
                M(p.$slots, "description", {}, () => [
                  V(m(p.descText), 1)
                ], !0)
              ]),
              c("ul", vi, [
                (i(!0), f(q, null, Q(p.ecosystemLinks, ({ href: C, label: I, title: P, ...g }, E) => (i(), f("li", {
                  key: E,
                  class: "fr-footer__content-item"
                }, [
                  c("a", K({
                    class: "fr-footer__content-link",
                    href: C,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: P,
                    ref_for: !0
                  }, g), m(I), 17, mi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), R(Ba, se(K({ key: 0 }, p.partners)), null, 16)) : b("", !0),
          c("div", gi, [
            c("ul", bi, [
              (i(!0), f(q, null, Q(a.value, (C, I) => (i(), f("li", {
                key: I,
                class: "fr-footer__bottom-item"
              }, [
                Y(Ta, K({ ref_for: !0 }, C), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", hi, [
              c("p", null, [
                V(m(p.licenceText) + " ", 1),
                (i(), R(ne(r.value ? "a" : "RouterLink"), K({
                  class: "fr-link-licence no-content-after",
                  to: r.value ? void 0 : d.value,
                  href: r.value ? s.value : void 0,
                  target: r.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: W(() => [
                    V(m(p.licenceName), 1)
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
}), ki = /* @__PURE__ */ re(yi, [["__scopeId", "data-v-4d6f52aa"]]), wi = { class: "fr-footer__top-cat" }, _i = { class: "fr-footer__top-list" }, xi = ["href"], Ii = /* @__PURE__ */ S({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const n = ie("RouterLink");
      return i(), f("div", null, [
        c("h3", wi, m(e.categoryName), 1),
        c("ul", _i, [
          (i(!0), f(q, null, Q(e.links, (l, r) => (i(), f("li", { key: r }, [
            typeof l.to == "string" && l.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: l.to
            }, m(l.label), 9, xi)) : b("", !0),
            typeof l.to == "object" || typeof l.to == "string" && !l.to.startsWith("http") ? (i(), R(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: l.to
            }, {
              default: W(() => [
                V(m(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : b("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Di = { class: "fr-connect-group" }, Ci = { class: "fr-connect__brand" }, Ti = ["href", "title"], Bi = /* @__PURE__ */ S({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", Di, [
      c("button", {
        class: F(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        a[0] || (a[0] = c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        c("span", Ci, "FranceConnect" + m(e.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, m(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, Ti)
      ])
    ]));
  }
}), Ei = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Si = { class: "fr-nav__item" }, Ai = ["aria-controls", "aria-expanded"], Mi = { class: "fr-hidden-lg" }, Li = ["id"], Fi = { class: "fr-menu__list" }, Pi = ["hreflang", "lang", "aria-current", "href", "onClick"], dt = /* @__PURE__ */ S({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => J("translate") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const a = t, n = e, {
      collapse: l,
      collapsing: r,
      cssExpanded: o,
      doExpand: d,
      onTransitionEnd: s
    } = pe(), u = $(!1);
    function p(y) {
      u.value = !1, n("select", y);
    }
    const v = w(
      () => a.languages.find(({ codeIso: y }) => y === a.currentLanguage)
    );
    return ae(u, (y, C) => {
      y !== C && d(y);
    }), (y, C) => {
      var I, P;
      return i(), f("nav", Ei, [
        c("div", Si, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": y.id,
            "aria-expanded": u.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: C[0] || (C[0] = G((g) => u.value = !u.value, ["prevent", "stop"]))
          }, [
            V(m((I = v.value) == null ? void 0 : I.codeIso.toUpperCase()), 1),
            c("span", Mi, " - " + m((P = v.value) == null ? void 0 : P.label), 1)
          ], 8, Ai),
          c("div", {
            id: y.id,
            ref_key: "collapse",
            ref: l,
            class: F(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": N(o), "fr-collapsing": N(r) }]),
            onTransitionend: C[1] || (C[1] = (g) => N(s)(u.value))
          }, [
            c("ul", Fi, [
              (i(!0), f(q, null, Q(y.languages, (g, E) => (i(), f("li", { key: E }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: g.codeIso,
                  lang: g.codeIso,
                  "aria-current": y.currentLanguage === g.codeIso ? !0 : void 0,
                  href: `#${g.codeIso}`,
                  onClick: G((k) => p(g), ["prevent", "stop"])
                }, m(`${g.codeIso.toUpperCase()} - ${g.label}`), 9, Pi)
              ]))), 128))
            ])
          ], 42, Li)
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
}, ji = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => J("basic", "input") },
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
    const a = t, n = il(), l = $(null), r = () => {
      var u;
      return (u = l.value) == null ? void 0 : u.focus();
    }, o = w(() => a.isTextarea ? "textarea" : "input"), d = w(() => a.isWithWrapper || n.type === "date" || !!a.wrapperClass), s = w(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: r
    }), (u, p) => (i(), f(q, null, [
      c("label", {
        class: F(s.value),
        for: u.id
      }, [
        M(u.$slots, "label", {}, () => [
          V(m(u.label) + " ", 1),
          M(u.$slots, "required-tip", {}, () => [
            "required" in u.$attrs && u.$attrs.required !== !1 ? (i(), f("span", Vi, "*")) : b("", !0)
          ], !0)
        ], !0),
        u.hint ? (i(), f("span", Ri, m(u.hint), 1)) : b("", !0)
      ], 10, Ni),
      d.value ? (i(), f("div", {
        key: 1,
        class: F([
          { "fr-input-wrap": u.isWithWrapper || u.$attrs.type === "date" },
          u.wrapperClass
        ])
      }, [
        (i(), R(ne(o.value), K({ id: u.id }, u.$attrs, {
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
      ], 2)) : (i(), R(ne(o.value), K({
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
}), It = /* @__PURE__ */ re(ji, [["__scopeId", "data-v-6e6c295a"]]), ut = /* @__PURE__ */ S({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => J("search", "input") },
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
      class: F(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      Y(It, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        "label-visible": n.labelVisible,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": l[0] || (l[0] = (r) => a("update:modelValue", r)),
        onKeydown: l[1] || (l[1] = U((r) => a("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      Y(Ee, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: l[2] || (l[2] = (r) => a("search", n.modelValue))
      }, {
        default: W(() => [
          V(m(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Qt = 1, Ea = /* @__PURE__ */ S({
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
    const e = t, a = w(() => typeof e.path == "string"), n = w(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("http")) || a.value && e.path.startsWith("http") || typeof e.to == "string" && e.to.startsWith("http");
    }), l = w(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("mailto")) || a.value && e.path.startsWith("mailto") || typeof e.to == "string" && e.to.startsWith("mailto");
    }), r = w(() => e.button ? "button" : n.value || l.value ? "a" : "RouterLink"), o = w(() => {
      if (!(!n.value && !l.value))
        return e.to ?? e.href ?? e.path;
    }), d = w(() => {
      if (!(n.value || l.value))
        return e.to ?? e.path;
    }), s = w(() => d.value ? { to: d.value } : { href: o.value }), u = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = w(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Qt, ...e.iconAttrs ?? {} } : { scale: Qt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (v, y) => (i(), R(ne(r.value), K({
      class: ["fr-btn", {
        "fr-btn--icon-right": u.value && v.iconRight,
        "fr-btn--icon-left": u.value && !v.iconRight,
        [String(v.icon)]: u.value
      }]
    }, s.value, {
      target: v.target,
      onClick: y[0] || (y[0] = G((C) => v.onClick(C), ["stop"]))
    }), {
      default: W(() => {
        var C, I;
        return [
          !u.value && (v.icon || (C = v.iconAttrs) != null && C.name) && !v.iconRight ? (i(), R(le, K({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          V(" " + m(v.label) + " ", 1),
          !u.value && (v.icon || (I = v.iconAttrs) != null && I.name) && v.iconRight ? (i(), R(le, K({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Oi = ["aria-label"], $i = { class: "fr-btns-group" }, ct = /* @__PURE__ */ S({
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
        (i(!0), f(q, null, Q(n.links, (r, o) => (i(), f("li", { key: o }, [
          Y(Ea, K({ ref_for: !0 }, r, {
            "on-click": (d) => {
              var s;
              a("linkClick", d), (s = r.onClick) == null || s.call(r, d);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Oi));
  }
}), qi = {
  role: "banner",
  class: "fr-header"
}, Hi = { class: "fr-header__body" }, Ki = { class: "fr-container width-inherit" }, zi = { class: "fr-header__body-row" }, Qi = { class: "fr-header__brand fr-enlarge-link" }, Gi = { class: "fr-header__brand-top" }, Wi = { class: "fr-header__logo" }, Ui = {
  key: 0,
  class: "fr-header__operator"
}, Xi = ["src", "alt"], Yi = {
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
}, ms = /* @__PURE__ */ S({
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
    const a = t, n = e, l = $e(a, "languageSelector"), r = $(!1), o = $(!1), d = $(!1), s = () => {
      var g;
      d.value = !1, r.value = !1, o.value = !1, (g = document.getElementById("button-menu")) == null || g.focus();
    }, u = (g) => {
      g.key === "Escape" && s();
    };
    oe(() => {
      document.addEventListener("keydown", u);
    }), fe(() => {
      document.removeEventListener("keydown", u);
    });
    const p = () => {
      var g;
      d.value = !0, r.value = !0, o.value = !1, (g = document.getElementById("close-button")) == null || g.focus();
    }, v = () => {
      d.value = !0, r.value = !1, o.value = !0;
    }, y = s, C = ra(), I = w(() => {
      var g;
      return !!((g = C.operator) != null && g.call(C).length) || !!a.operatorImgSrc;
    }), P = w(() => !!C.mainnav);
    return ge(gt, () => s), (g, E) => {
      var k, _, D;
      const z = ie("RouterLink");
      return i(), f("header", qi, [
        c("div", Hi, [
          c("div", Ki, [
            c("div", zi, [
              c("div", Qi, [
                c("div", Gi, [
                  c("div", Wi, [
                    Y(z, {
                      to: g.homeTo,
                      title: `${g.homeLabel} - ${g.serviceTitle}`
                    }, {
                      default: W(() => [
                        Y(Ne, {
                          "logo-text": g.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  I.value ? (i(), f("div", Ui, [
                    M(g.$slots, "operator", {}, () => [
                      g.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: g.operatorImgSrc,
                        alt: g.operatorImgAlt,
                        style: de(g.operatorImgStyle)
                      }, null, 12, Xi)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  g.showSearch || P.value || (k = g.quickLinks) != null && k.length ? (i(), f("div", Yi, [
                    g.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": g.showSearchLabel,
                      title: g.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: E[0] || (E[0] = G((h) => v(), ["prevent", "stop"]))
                    }, null, 8, Zi)) : b("", !0),
                    P.value || (_ = g.quickLinks) != null && _.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": g.menuLabel,
                      title: g.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: E[1] || (E[1] = G((h) => p(), ["prevent", "stop"]))
                    }, null, 8, Ji)) : b("", !0)
                  ])) : b("", !0)
                ]),
                g.serviceTitle ? (i(), f("div", es, [
                  Y(z, K({
                    to: g.homeTo,
                    title: `${g.homeLabel} - ${g.serviceTitle}`
                  }, g.$attrs), {
                    default: W(() => [
                      c("p", ts, [
                        V(m(g.serviceTitle) + " ", 1),
                        g.showBeta ? (i(), f("span", as, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  g.serviceDescription ? (i(), f("p", ls, m(g.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !g.serviceTitle && g.showBeta ? (i(), f("div", ns, E[9] || (E[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", rs, [
                (D = g.quickLinks) != null && D.length || l.value ? (i(), f("div", os, [
                  r.value ? b("", !0) : (i(), R(ct, {
                    key: 0,
                    links: g.quickLinks,
                    "nav-aria-label": g.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (i(), R(dt, K({ key: 1 }, l.value, {
                    onSelect: E[2] || (E[2] = (h) => n("language-select", h))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                g.showSearch ? (i(), f("div", is, [
                  Y(ut, {
                    "searchbar-id": g.searchbarId,
                    label: g.searchLabel,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": E[3] || (E[3] = (h) => n("update:modelValue", h)),
                    onSearch: E[4] || (E[4] = (h) => n("search", h))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ]),
            g.showSearch || P.value || g.quickLinks && g.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: F(["fr-header__menu fr-modal", { "fr-modal--opened": d.value }]),
              "aria-label": g.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", ds, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: E[5] || (E[5] = G((h) => s(), ["prevent", "stop"]))
                }, m(g.closeMenuModalLabel), 1),
                c("div", us, [
                  l.value ? (i(), R(dt, K({ key: 0 }, l.value, {
                    onSelect: E[6] || (E[6] = (h) => l.value.currentLanguage = h.codeIso)
                  }), null, 16)) : b("", !0),
                  c("nav", cs, [
                    r.value ? (i(), R(ct, {
                      key: 0,
                      role: "navigation",
                      links: g.quickLinks,
                      "nav-aria-label": g.quickLinksAriaLabel,
                      onLinkClick: N(y)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0)
                  ])
                ]),
                d.value ? M(g.$slots, "mainnav", {
                  key: 0,
                  hidemodal: s
                }) : b("", !0),
                o.value ? (i(), f("div", fs, [
                  Y(ut, {
                    "searchbar-id": g.searchbarId,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    "onUpdate:modelValue": E[7] || (E[7] = (h) => n("update:modelValue", h)),
                    onSearch: E[8] || (E[8] = (h) => n("search", h))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, ss)) : b("", !0),
            M(g.$slots, "default")
          ])
        ]),
        c("div", ps, [
          P.value && !d.value ? (i(), f("div", vs, [
            M(g.$slots, "mainnav", { hidemodal: s })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), gs = /* @__PURE__ */ S({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", {
      class: F(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      c("p", {
        class: F({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        V(m(e.text) + " ", 1),
        M(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), bs = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, hs = ["id", "data-testid"], ys = ["id", "data-testid"], ks = ["id", "data-testid"], ws = ["id", "data-testid"], _s = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => J("basic", "input") },
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
      class: F(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      M(e.$slots, "before-input"),
      M(e.$slots, "default"),
      e.$slots.default ? b("", !0) : (i(), R(It, K({ key: 0 }, e.$attrs, {
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
        Array.isArray(e.errorMessage) ? (i(!0), f(q, { key: 0 }, Q(e.errorMessage, (n) => (i(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, m(n), 9, hs))), 128)) : e.errorMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, m(e.errorMessage), 9, ys)) : b("", !0),
        Array.isArray(e.validMessage) ? (i(!0), f(q, { key: 2 }, Q(e.validMessage, (n) => (i(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, m(n), 9, ks))), 128)) : e.validMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, m(e.validMessage), 9, ws)) : b("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var Sa = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Ve = /* @__PURE__ */ Sa.join(","), Aa = typeof Element > "u", he = Aa ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Re = !Aa && Element.prototype.getRootNode ? function(t) {
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
}, Ma = function(t, e, a) {
  if (je(t))
    return [];
  var n = Array.prototype.slice.apply(t.querySelectorAll(Ve));
  return e && he.call(t, Ve) && n.unshift(t), n = n.filter(a), n;
}, La = function t(e, a, n) {
  for (var l = [], r = Array.from(e); r.length; ) {
    var o = r.shift();
    if (!je(o, !1))
      if (o.tagName === "SLOT") {
        var d = o.assignedElements(), s = d.length ? d : o.children, u = t(s, !0, n);
        n.flatten ? l.push.apply(l, u) : l.push({
          scopeParent: o,
          candidates: u
        });
      } else {
        var p = he.call(o, Ve);
        p && n.filter(o) && (a || !e.includes(o)) && l.push(o);
        var v = o.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(o), y = !je(v, !1) && (!n.shadowRootFilter || n.shadowRootFilter(o));
        if (v && y) {
          var C = t(v === !0 ? o.children : v.children, !0, n);
          n.flatten ? l.push.apply(l, C) : l.push({
            scopeParent: o,
            candidates: C
          });
        } else
          r.unshift.apply(r, o.children);
      }
  }
  return l;
}, Fa = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, ve = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || xs(t)) && !Fa(t) ? 0 : t.tabIndex;
}, Is = function(t, e) {
  var a = ve(t);
  return a < 0 && e && !Fa(t) ? 0 : a;
}, Ds = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, Pa = function(t) {
  return t.tagName === "INPUT";
}, Cs = function(t) {
  return Pa(t) && t.type === "hidden";
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
  return Pa(t) && t.type === "radio";
}, As = function(t) {
  return Ss(t) && !Es(t);
}, Ms = function(t) {
  var e, a = t && Re(t), n = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var r, o, d;
    for (l = !!((r = n) !== null && r !== void 0 && (o = r.ownerDocument) !== null && o !== void 0 && o.contains(n) || t != null && (d = t.ownerDocument) !== null && d !== void 0 && d.contains(t)); !l && n; ) {
      var s, u, p;
      a = Re(n), n = (s = a) === null || s === void 0 ? void 0 : s.host, l = !!((u = n) !== null && u !== void 0 && (p = u.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return l;
}, Gt = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, n = e.height;
  return a === 0 && n === 0;
}, Ls = function(t, e) {
  var a = e.displayCheck, n = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = he.call(t, "details>summary:first-of-type"), r = l ? t.parentElement : t;
  if (he.call(r, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof n == "function") {
      for (var o = t; t; ) {
        var d = t.parentElement, s = Re(t);
        if (d && !d.shadowRoot && n(d) === !0)
          return Gt(t);
        t.assignedSlot ? t = t.assignedSlot : !d && s !== t.ownerDocument ? t = s.host : t = d;
      }
      t = o;
    }
    if (Ms(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Gt(t);
  return !1;
}, Fs = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var a = 0; a < e.children.length; a++) {
          var n = e.children.item(a);
          if (n.tagName === "LEGEND")
            return he.call(e, "fieldset[disabled] *") ? !0 : !n.contains(t);
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
  je(e) || Cs(e) || Ls(e, t) || // For a details element with a summary, the summary element gets the focus
  Ts(e) || Fs(e));
}, ft = function(t, e) {
  return !(As(e) || ve(e) < 0 || !Oe(t, e));
}, Ps = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, Ns = function t(e) {
  var a = [], n = [];
  return e.forEach(function(l, r) {
    var o = !!l.scopeParent, d = o ? l.scopeParent : l, s = Is(d, o), u = o ? t(l.candidates) : d;
    s === 0 ? o ? a.push.apply(a, u) : a.push(d) : n.push({
      documentOrder: r,
      tabIndex: s,
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
  return e.getShadowRoot ? a = La([t], e.includeContainer, {
    filter: ft.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: Ps
  }) : a = Ma(t, e.includeContainer, ft.bind(null, e)), Ns(a);
}, Rs = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = La([t], e.includeContainer, {
    filter: Oe.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = Ma(t, e.includeContainer, Oe.bind(null, e)), a;
}, ke = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return he.call(t, Ve) === !1 ? !1 : ft(e, t);
}, js = /* @__PURE__ */ Sa.concat("iframe").join(","), Je = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return he.call(t, js) === !1 ? !1 : Oe(e, t);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Wt(t, e) {
  var a = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(l) {
      return Object.getOwnPropertyDescriptor(t, l).enumerable;
    })), a.push.apply(a, n);
  }
  return a;
}
function Ut(t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Wt(Object(a), !0).forEach(function(n) {
      Os(t, n, a[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Wt(Object(a)).forEach(function(n) {
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
var Xt = {
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
}, Ks = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, De = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, zs = function(t) {
  return De(t) && !t.shiftKey;
}, Qs = function(t) {
  return De(t) && t.shiftKey;
}, Yt = function(t) {
  return setTimeout(t, 0);
}, Zt = function(t, e) {
  var a = -1;
  return t.every(function(n, l) {
    return e(n) ? (a = l, !1) : !0;
  }), a;
}, xe = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    a[n - 1] = arguments[n];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, Me = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, Gs = [], Ws = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, n = (e == null ? void 0 : e.trapStack) || Gs, l = Ut({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: zs,
    isKeyBackward: Qs
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
  }, o, d = function(x, T, O) {
    return x && x[T] !== void 0 ? x[T] : l[O || T];
  }, s = function(x, T) {
    var O = typeof (T == null ? void 0 : T.composedPath) == "function" ? T.composedPath() : void 0;
    return r.containerGroups.findIndex(function(A) {
      var L = A.container, H = A.tabbableNodes;
      return L.contains(x) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (O == null ? void 0 : O.includes(L)) || H.find(function(Z) {
        return Z === x;
      });
    });
  }, u = function(x) {
    var T = l[x];
    if (typeof T == "function") {
      for (var O = arguments.length, A = new Array(O > 1 ? O - 1 : 0), L = 1; L < O; L++)
        A[L - 1] = arguments[L];
      T = T.apply(void 0, A);
    }
    if (T === !0 && (T = void 0), !T) {
      if (T === void 0 || T === !1)
        return T;
      throw new Error("`".concat(x, "` was specified but was not a node, or did not return a node"));
    }
    var H = T;
    if (typeof T == "string" && (H = a.querySelector(T), !H))
      throw new Error("`".concat(x, "` as selector refers to no known node"));
    return H;
  }, p = function() {
    var x = u("initialFocus");
    if (x === !1)
      return !1;
    if (x === void 0 || !Je(x, l.tabbableOptions))
      if (s(a.activeElement) >= 0)
        x = a.activeElement;
      else {
        var T = r.tabbableGroups[0], O = T && T.firstTabbableNode;
        x = O || u("fallbackFocus");
      }
    if (!x)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return x;
  }, v = function() {
    if (r.containerGroups = r.containers.map(function(x) {
      var T = Vs(x, l.tabbableOptions), O = Rs(x, l.tabbableOptions), A = T.length > 0 ? T[0] : void 0, L = T.length > 0 ? T[T.length - 1] : void 0, H = O.find(function(te) {
        return ke(te);
      }), Z = O.slice().reverse().find(function(te) {
        return ke(te);
      }), ee = !!T.find(function(te) {
        return ve(te) > 0;
      });
      return {
        container: x,
        tabbableNodes: T,
        focusableNodes: O,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ee,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: A,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: L,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: H,
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
          var ye = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, _e = T.indexOf(te);
          return _e < 0 ? ye ? O.slice(O.indexOf(te) + 1).find(function(ue) {
            return ke(ue);
          }) : O.slice(0, O.indexOf(te)).reverse().find(function(ue) {
            return ke(ue);
          }) : T[_e + (ye ? 1 : -1)];
        }
      };
    }), r.tabbableGroups = r.containerGroups.filter(function(x) {
      return x.tabbableNodes.length > 0;
    }), r.tabbableGroups.length <= 0 && !u("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (r.containerGroups.find(function(x) {
      return x.posTabIndexesFound;
    }) && r.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, y = function x(T) {
    var O = T.activeElement;
    if (O)
      return O.shadowRoot && O.shadowRoot.activeElement !== null ? x(O.shadowRoot) : O;
  }, C = function x(T) {
    if (T !== !1 && T !== y(document)) {
      if (!T || !T.focus) {
        x(p());
        return;
      }
      T.focus({
        preventScroll: !!l.preventScroll
      }), r.mostRecentlyFocusedNode = T, Hs(T) && T.select();
    }
  }, I = function(x) {
    var T = u("setReturnFocus", x);
    return T || (T === !1 ? !1 : x);
  }, P = function(x) {
    var T = x.target, O = x.event, A = x.isBackward, L = A === void 0 ? !1 : A;
    T = T || Me(O), v();
    var H = null;
    if (r.tabbableGroups.length > 0) {
      var Z = s(T, O), ee = Z >= 0 ? r.containerGroups[Z] : void 0;
      if (Z < 0)
        L ? H = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : H = r.tabbableGroups[0].firstTabbableNode;
      else if (L) {
        var te = Zt(r.tabbableGroups, function(Ue) {
          var Xe = Ue.firstTabbableNode;
          return T === Xe;
        });
        if (te < 0 && (ee.container === T || Je(T, l.tabbableOptions) && !ke(T, l.tabbableOptions) && !ee.nextTabbableNode(T, !1)) && (te = Z), te >= 0) {
          var ye = te === 0 ? r.tabbableGroups.length - 1 : te - 1, _e = r.tabbableGroups[ye];
          H = ve(T) >= 0 ? _e.lastTabbableNode : _e.lastDomTabbableNode;
        } else De(O) || (H = ee.nextTabbableNode(T, !1));
      } else {
        var ue = Zt(r.tabbableGroups, function(Ue) {
          var Xe = Ue.lastTabbableNode;
          return T === Xe;
        });
        if (ue < 0 && (ee.container === T || Je(T, l.tabbableOptions) && !ke(T, l.tabbableOptions) && !ee.nextTabbableNode(T)) && (ue = Z), ue >= 0) {
          var tl = ue === r.tabbableGroups.length - 1 ? 0 : ue + 1, Bt = r.tabbableGroups[tl];
          H = ve(T) >= 0 ? Bt.firstTabbableNode : Bt.firstDomTabbableNode;
        } else De(O) || (H = ee.nextTabbableNode(T));
      }
    } else
      H = u("fallbackFocus");
    return H;
  }, g = function(x) {
    var T = Me(x);
    if (!(s(T, x) >= 0)) {
      if (xe(l.clickOutsideDeactivates, x)) {
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
      xe(l.allowOutsideClick, x) || x.preventDefault();
    }
  }, E = function(x) {
    var T = Me(x), O = s(T, x) >= 0;
    if (O || T instanceof Document)
      O && (r.mostRecentlyFocusedNode = T);
    else {
      x.stopImmediatePropagation();
      var A, L = !0;
      if (r.mostRecentlyFocusedNode)
        if (ve(r.mostRecentlyFocusedNode) > 0) {
          var H = s(r.mostRecentlyFocusedNode), Z = r.containerGroups[H].tabbableNodes;
          if (Z.length > 0) {
            var ee = Z.findIndex(function(te) {
              return te === r.mostRecentlyFocusedNode;
            });
            ee >= 0 && (l.isKeyForward(r.recentNavEvent) ? ee + 1 < Z.length && (A = Z[ee + 1], L = !1) : ee - 1 >= 0 && (A = Z[ee - 1], L = !1));
          }
        } else
          r.containerGroups.some(function(te) {
            return te.tabbableNodes.some(function(ye) {
              return ve(ye) > 0;
            });
          }) || (L = !1);
      else
        L = !1;
      L && (A = P({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(r.recentNavEvent)
      })), C(A || r.mostRecentlyFocusedNode || p());
    }
    r.recentNavEvent = void 0;
  }, k = function(x) {
    var T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = x;
    var O = P({
      event: x,
      isBackward: T
    });
    O && (De(x) && x.preventDefault(), C(O));
  }, _ = function(x) {
    if (Ks(x) && xe(l.escapeDeactivates, x) !== !1) {
      x.preventDefault(), o.deactivate();
      return;
    }
    (l.isKeyForward(x) || l.isKeyBackward(x)) && k(x, l.isKeyBackward(x));
  }, D = function(x) {
    var T = Me(x);
    s(T, x) >= 0 || xe(l.clickOutsideDeactivates, x) || xe(l.allowOutsideClick, x) || (x.preventDefault(), x.stopImmediatePropagation());
  }, z = function() {
    if (r.active)
      return Xt.activateTrap(n, o), r.delayInitialFocusTimer = l.delayInitialFocus ? Yt(function() {
        C(p());
      }) : C(p()), a.addEventListener("focusin", E, !0), a.addEventListener("mousedown", g, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", g, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", D, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", _, {
        capture: !0,
        passive: !1
      }), o;
  }, h = function() {
    if (r.active)
      return a.removeEventListener("focusin", E, !0), a.removeEventListener("mousedown", g, !0), a.removeEventListener("touchstart", g, !0), a.removeEventListener("click", D, !0), a.removeEventListener("keydown", _, !0), o;
  }, j = function(x) {
    var T = x.some(function(O) {
      var A = Array.from(O.removedNodes);
      return A.some(function(L) {
        return L === r.mostRecentlyFocusedNode;
      });
    });
    T && C(p());
  }, B = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(j) : void 0, X = function() {
    B && (B.disconnect(), r.active && !r.paused && r.containers.map(function(x) {
      B.observe(x, {
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
    activate: function(x) {
      if (r.active)
        return this;
      var T = d(x, "onActivate"), O = d(x, "onPostActivate"), A = d(x, "checkCanFocusTrap");
      A || v(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = a.activeElement, T == null || T();
      var L = function() {
        A && v(), z(), X(), O == null || O();
      };
      return A ? (A(r.containers.concat()).then(L, L), this) : (L(), this);
    },
    deactivate: function(x) {
      if (!r.active)
        return this;
      var T = Ut({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, x);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, h(), r.active = !1, r.paused = !1, X(), Xt.deactivateTrap(n, o);
      var O = d(T, "onDeactivate"), A = d(T, "onPostDeactivate"), L = d(T, "checkCanReturnFocus"), H = d(T, "returnFocus", "returnFocusOnDeactivate");
      O == null || O();
      var Z = function() {
        Yt(function() {
          H && C(I(r.nodeFocusedBeforeActivation)), A == null || A();
        });
      };
      return H && L ? (L(I(r.nodeFocusedBeforeActivation)).then(Z, Z), this) : (Z(), this);
    },
    pause: function(x) {
      if (r.paused || !r.active)
        return this;
      var T = d(x, "onPause"), O = d(x, "onPostPause");
      return r.paused = !0, T == null || T(), h(), X(), O == null || O(), this;
    },
    unpause: function(x) {
      if (!r.paused || !r.active)
        return this;
      var T = d(x, "onUnpause"), O = d(x, "onPostUnpause");
      return r.paused = !1, T == null || T(), v(), z(), X(), O == null || O(), this;
    },
    updateContainerElements: function(x) {
      var T = [].concat(x).filter(Boolean);
      return r.containers = T.map(function(O) {
        return typeof O == "string" ? a.querySelector(O) : O;
      }), r.active && v(), X(), this;
    }
  }, o.updateContainerElements(t), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Us = {
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
}, Xs = S({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, Us),
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
    const l = $(null), r = w(() => {
      const d = l.value;
      return d && (d instanceof HTMLElement ? d : d.$el);
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
      ae(() => t.active, (d) => {
        d && r.value ? o().activate() : n && (n.deactivate(), (!r.value || r.value.nodeType === Node.COMMENT_NODE) && (n = null));
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
        const d = e.default().filter((s) => s.type !== al);
        return !d || !d.length || d.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), d) : ll(d[0], { ref: l });
      }
    };
  }
}), Ys = ["aria-labelledby", "role", "open"], Zs = { class: "fr-container fr-container--fluid fr-container-md" }, Js = { class: "fr-grid-row fr-grid-row--center" }, ed = { class: "fr-modal__body" }, td = { class: "fr-modal__header" }, ad = ["title"], ld = { class: "fr-modal__content" }, nd = ["id"], rd = {
  key: 0,
  class: "fr-modal__footer"
}, Jt = 2, od = /* @__PURE__ */ S({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => J("modal", "dialog") },
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
    const a = t, n = e, l = (I) => {
      I.key === "Escape" && v();
    }, r = w(() => a.isAlert ? "alertdialog" : "dialog"), o = $(null), d = $();
    ae(() => a.opened, (I) => {
      var P, g;
      I ? ((P = d.value) == null || P.showModal(), setTimeout(() => {
        var E;
        (E = o.value) == null || E.focus();
      }, 100)) : (g = d.value) == null || g.close(), s(I);
    });
    function s(I) {
      typeof window < "u" && document.body.classList.toggle("modal-open", I);
    }
    oe(() => {
      u(), s(a.opened);
    }), sl(() => {
      p(), s(!1);
    });
    function u() {
      document.addEventListener("keydown", l);
    }
    function p() {
      document.removeEventListener("keydown", l);
    }
    async function v() {
      var I;
      await na(), (I = a.origin) == null || I.focus(), n("close");
    }
    const y = w(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), C = w(
      () => y.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: Jt } : { scale: Jt, ...a.icon ?? {} }
    );
    return (I, P) => I.opened ? (i(), R(N(Xs), { key: 0 }, {
      default: W(() => {
        var g, E;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: d,
            "aria-labelledby": I.modalId,
            role: r.value,
            class: F(["fr-modal", { "fr-modal--opened": I.opened }]),
            open: I.opened
          }, [
            c("div", Zs, [
              c("div", Js, [
                c("div", {
                  class: F(["fr-col-12", {
                    "fr-col-md-8": I.size === "lg",
                    "fr-col-md-6": I.size === "md",
                    "fr-col-md-4": I.size === "sm"
                  }])
                }, [
                  c("div", ed, [
                    c("div", td, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: I.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: P[0] || (P[0] = (k) => v())
                      }, [
                        c("span", null, m(I.closeButtonLabel), 1)
                      ], 8, ad)
                    ]),
                    c("div", ld, [
                      c("h1", {
                        id: I.modalId,
                        class: "fr-modal__title"
                      }, [
                        y.value || C.value ? (i(), f("span", {
                          key: 0,
                          class: F({
                            [String(I.icon)]: y.value
                          })
                        }, [
                          I.icon && C.value ? (i(), R(le, se(K({ key: 0 }, C.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        V(" " + m(I.title), 1)
                      ], 8, nd),
                      M(I.$slots, "default", {}, void 0, !0)
                    ]),
                    (g = I.actions) != null && g.length || I.$slots.footer ? (i(), f("div", rd, [
                      M(I.$slots, "footer", {}, void 0, !0),
                      (E = I.actions) != null && E.length ? (i(), R(Qe, {
                        key: 0,
                        align: "right",
                        buttons: I.actions,
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
}), Na = /* @__PURE__ */ re(od, [["__scopeId", "data-v-d11515b3"]]), id = ["id", "aria-current"], sd = /* @__PURE__ */ S({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => J("nav", "item") },
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
}), Va = /* @__PURE__ */ re(sd, [["__scopeId", "data-v-5909c19f"]]), dd = ["href"], ea = 2, Ge = /* @__PURE__ */ S({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => J("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, a = w(() => typeof e.to == "string" && e.to.startsWith("http")), n = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), l = w(
      () => n.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: ea, name: e.icon } : { scale: ea, ...e.icon || {} }
    ), r = nl() ? we(gt) : void 0, o = (r == null ? void 0 : r()) ?? (() => {
    });
    return (d, s) => {
      const u = ie("RouterLink");
      return a.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: d.to,
        onClick: s[0] || (s[0] = (p) => {
          d.$emit("toggleId", d.id), d.onClick(p);
        })
      }, m(d.text), 9, dd)) : (i(), R(u, {
        key: 1,
        class: F(["fr-nav__link", {
          [String(d.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: d.to,
        onClick: s[1] || (s[1] = (p) => {
          var v;
          N(o)(), d.$emit("toggleId", d.id), (v = d.onClick) == null || v.call(d, p);
        })
      }, {
        default: W(() => [
          d.icon && l.value ? (i(), R(le, se(K({ key: 0 }, l.value)), null, 16)) : b("", !0),
          V(" " + m(d.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), ud = { class: "fr-col-12 fr-col-lg-3" }, cd = { class: "fr-mega-menu__category" }, fd = { class: "fr-mega-menu__list" }, Ra = /* @__PURE__ */ S({
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
          onClick: a[0] || (a[0] = G(() => {
          }, ["prevent"]))
        }, m(e.title), 1)
      ]),
      c("ul", fd, [
        (i(!0), f(q, null, Q(e.links, (n, l) => (i(), f("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          Y(Ge, K({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), pd = ["aria-expanded", "aria-current", "aria-controls"], vd = ["id"], md = { class: "fr-container fr-container--fluid fr-container-lg" }, gd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, bd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, hd = { class: "fr-mega-menu__leader" }, yd = { class: "fr-h4 fr-mb-2v" }, kd = { class: "fr-hidden fr-displayed-lg" }, wd = /* @__PURE__ */ S({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => J("menu") },
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
    } = pe(), d = w(() => e.id === e.expandedId);
    return ae(d, (s, u) => {
      s !== u && r(s);
    }), oe(() => {
      d.value && r(!0);
    }), (s, u) => {
      const p = ie("RouterLink");
      return i(), f(q, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": d.value,
          "aria-current": s.active || void 0,
          "aria-controls": s.id,
          onClick: u[0] || (u[0] = (v) => s.$emit("toggleId", s.id))
        }, m(s.title), 9, pd),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: F(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": N(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": N(n)
          }]),
          tabindex: "-1",
          onTransitionend: u[2] || (u[2] = (v) => N(o)(d.value))
        }, [
          c("div", md, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: u[1] || (u[1] = (v) => s.$emit("toggleId", s.id))
            }, " Fermer "),
            c("div", gd, [
              c("div", bd, [
                c("div", hd, [
                  c("h4", yd, m(s.title), 1),
                  c("p", kd, [
                    V(m(s.description) + " ", 1),
                    M(s.$slots, "description", {}, void 0, !0)
                  ]),
                  Y(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: s.link.to
                  }, {
                    default: W(() => [
                      V(m(s.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              M(s.$slots, "default", {}, void 0, !0),
              (i(!0), f(q, null, Q(s.menus, (v, y) => (i(), R(Ra, K({
                key: y,
                ref_for: !0
              }, v), null, 16))), 128))
            ])
          ])
        ], 42, vd)
      ], 64);
    };
  }
}), ja = /* @__PURE__ */ re(wd, [["__scopeId", "data-v-7e339b1d"]]), _d = ["id", "aria-current"], Oa = /* @__PURE__ */ S({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => J("menu", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-menu__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      M(e.$slots, "default")
    ], 8, _d));
  }
}), xd = ["aria-expanded", "aria-current", "aria-controls"], Id = ["id"], Dd = { class: "fr-menu__list" }, $a = /* @__PURE__ */ S({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => J("menu") },
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
    } = pe(), d = w(() => e.id === e.expandedId);
    return ae(d, (s, u) => {
      s !== u && r(s);
    }), oe(() => {
      d.value && r(!0);
    }), (s, u) => (i(), f(q, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": d.value,
        "aria-current": s.active || void 0,
        "aria-controls": s.id,
        onClick: u[0] || (u[0] = (p) => s.$emit("toggleId", s.id))
      }, [
        c("span", null, m(s.title), 1)
      ], 8, xd),
      c("div", {
        id: s.id,
        ref_key: "collapse",
        ref: a,
        class: F(["fr-collapse fr-menu", { "fr-collapse--expanded": N(l), "fr-collapsing": N(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: u[2] || (u[2] = (p) => N(o)(d.value))
      }, [
        c("ul", Dd, [
          M(s.$slots, "default"),
          (i(!0), f(q, null, Q(s.links, (p, v) => (i(), R(Oa, { key: v }, {
            default: W(() => [
              Y(Ge, K({ ref_for: !0 }, p, {
                onToggleId: u[1] || (u[1] = (y) => s.$emit("toggleId", s.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Id)
    ], 64));
  }
}), Cd = ["id", "aria-label"], Td = { class: "fr-nav__list" }, Bd = /* @__PURE__ */ S({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => J("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(t) {
    const e = t, a = $(void 0), n = (d) => {
      if (d === a.value) {
        a.value = void 0;
        return;
      }
      a.value = d;
    }, l = (d) => {
      if (d !== document.getElementById(e.id)) {
        if (!(d != null && d.parentNode)) {
          n(a.value);
          return;
        }
        l(d.parentNode);
      }
    }, r = (d) => {
      l(d.target);
    }, o = (d) => {
      d.key === "Escape" && n(a.value);
    };
    return oe(() => {
      document.addEventListener("click", r), document.addEventListener("keydown", o);
    }), fe(() => {
      document.removeEventListener("click", r), document.removeEventListener("keydown", o);
    }), (d, s) => (i(), f("nav", {
      id: d.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": d.label
    }, [
      c("ul", Td, [
        M(d.$slots, "default"),
        (i(!0), f(q, null, Q(d.navItems, (u, p) => (i(), R(Va, { key: p }, {
          default: W(() => [
            u.to && u.text ? (i(), R(Ge, K({
              key: 0,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: s[0] || (s[0] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : u.title && u.links ? (i(), R($a, K({
              key: 1,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: s[1] || (s[1] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : u.title && u.menus ? (i(), R(ja, K({
              key: 2,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: s[2] || (s[2] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, Cd));
  }
}), Ed = { class: "fr-container" }, Sd = { class: "fr-notice__body" }, Ad = { class: "fr-notice__title" }, Md = { class: "fr-notice__desc" }, Ld = /* @__PURE__ */ S({
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
      class: F(["fr-notice", `fr-notice--${e.type}`])
    }, [
      c("div", Ed, [
        c("div", Sd, [
          c("p", null, [
            c("span", Ad, [
              M(e.$slots, "default", {}, () => [
                V(m(e.title), 1)
              ])
            ]),
            c("span", Md, [
              M(e.$slots, "desc", {}, () => [
                V(m(e.desc), 1)
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
}), Fd = ["aria-label"], Pd = { class: "fr-content-media__img" }, Nd = ["src", "alt", "title", "ratio"], Vd = { class: "fr-content-media__caption" }, Rd = /* @__PURE__ */ S({
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
      class: F(["fr-content-media", {
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
            class: F(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, Nd)) : b("", !0)
        ])
      ]),
      c("figcaption", Vd, m(e.legend), 1)
    ], 10, Fd));
  }
}), jd = { class: "fr-quote fr-quote--column" }, Od = ["cite"], $d = { class: "fr-quote__author" }, qd = { class: "fr-quote__source" }, Hd = ["href"], Kd = {
  key: 0,
  class: "fr-quote__image"
}, zd = ["src"], Qd = /* @__PURE__ */ S({
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
        c("p", null, "« " + m(e.quote) + " »", 1)
      ], 8, Od)) : b("", !0),
      c("figcaption", null, [
        c("p", $d, m(e.author), 1),
        c("ul", qd, [
          c("li", null, [
            c("cite", null, m(e.source), 1)
          ]),
          (i(!0), f(q, null, Q(e.details, (n, l) => (i(), f("li", { key: l }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, m(n.label), 9, Hd)) : (i(), f(q, { key: 1 }, [
              V(m(n), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (i(), f("div", Kd, [
          c("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, zd)
        ])) : b("", !0)
      ])
    ]));
  }
}), Gd = ["id", "name", "value", "checked", "disabled"], Wd = ["for"], Ud = {
  key: 0,
  class: "required"
}, Xd = {
  key: 0,
  class: "fr-hint-text"
}, Yd = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Zd = ["src", "title"], Jd = { key: 0 }, eu = ["href"], tu = ["href"], au = ["href"], qa = /* @__PURE__ */ S({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => J("basic", "radio") },
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
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = w(() => !!e.img || !!e.svgPath);
    return (l, r) => (i(), f("div", {
      class: F(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: F(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": l.small
        }])
      }, [
        c("input", K({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: r[0] || (r[0] = (o) => l.$emit("update:modelValue", l.value))
        }), null, 16, Gd),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          M(l.$slots, "label", {}, () => [
            V(m(l.label) + " ", 1),
            M(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (i(), f("span", Ud, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", Xd, m(l.hint), 1)) : b("", !0)
        ], 8, Wd),
        l.img || l.svgPath ? (i(), f("div", Yd, [
          l.img ? (i(), f("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: "",
            title: l.imgTitle
          }, null, 8, Zd)) : (i(), f("svg", K({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            l.imgTitle ? (i(), f("title", Jd, m(l.imgTitle), 1)) : b("", !0),
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
}, su = ["id"], du = /* @__PURE__ */ S({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => J("radio-button", "group") },
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
    const a = t, n = e, l = w(() => a.errorMessage || a.validMessage), r = w(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (s) => {
      s !== a.modelValue && n("update:modelValue", s);
    }, d = w(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (s, u) => (i(), f("div", lu, [
      c("fieldset", {
        class: F(["fr-fieldset", {
          "fr-fieldset--error": s.errorMessage,
          "fr-fieldset--valid": s.validMessage
        }]),
        disabled: s.disabled,
        "aria-labelledby": d.value,
        "aria-invalid": s.ariaInvalid,
        role: s.errorMessage || s.validMessage ? "group" : void 0
      }, [
        s.legend || s.$slots.legend || s.hint || s.$slots.hint ? (i(), f("legend", {
          key: 0,
          id: s.titleId,
          class: "fr-fieldset__legend fr-fieldset__legend--regular"
        }, [
          M(s.$slots, "legend", {}, () => [
            V(m(s.legend) + " ", 1),
            s.hint || s.$slots.hint ? (i(), f("span", ou, [
              M(s.$slots, "hint", {}, () => [
                V(m(s.hint), 1)
              ])
            ])) : b("", !0),
            M(s.$slots, "required-tip", {}, () => [
              s.required ? (i(), f("span", iu, " *")) : b("", !0)
            ])
          ])
        ], 8, ru)) : b("", !0),
        M(s.$slots, "default", {}, () => [
          (i(!0), f(q, null, Q(s.options, (p, v) => (i(), R(qa, K({
            key: typeof p.value == "boolean" ? v : p.value || v,
            name: s.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: s.small,
            inline: s.inline,
            "model-value": s.modelValue,
            "onUpdate:modelValue": u[0] || (u[0] = (y) => o(y))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        l.value ? (i(), f("div", {
          key: 1,
          id: `messages-${s.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: F(["fr-message fr-message--info flex items-center", r.value])
          }, m(l.value), 3)
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
}, hu = ["id"], yu = ["id"], ku = /* @__PURE__ */ S({
  __name: "DsfrRange",
  props: {
    id: { default: () => J("range") },
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
    const a = t, n = e, l = $(), r = $(), o = $(), d = w(() => a.lowerValue !== void 0), s = w(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * o.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * o.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), u = w(() => {
      const v = (a.modelValue - a.min) / (a.max - a.min) * o.value - (d.value ? 12 : 0), y = ((a.lowerValue ?? 0) - a.min) / (a.max - a.min) * o.value;
      return {
        "--progress-right": `${v + 24}px`,
        ...d.value ? { "--progress-left": `${y + 12}px` } : {}
      };
    });
    ae([() => a.modelValue, () => a.lowerValue], ([v, y]) => {
      y !== void 0 && (d.value && v < y && n("update:lowerValue", v), d.value && y > v && n("update:modelValue", y));
    });
    const p = w(() => (a.prefix ?? "").concat(d.value ? `${a.lowerValue} - ` : "").concat(`${a.modelValue}`).concat(a.suffix ?? ""));
    return oe(() => {
      var v;
      o.value = (v = l.value) == null ? void 0 : v.offsetWidth;
    }), (v, y) => (i(), f("div", {
      id: `${v.id}-group`,
      class: F(["fr-range-group", { "fr-range-group--error": v.message }])
    }, [
      c("label", {
        id: `${v.id}-label`,
        class: "fr-label"
      }, [
        M(v.$slots, "label", {}, () => [
          V(m(v.label), 1)
        ]),
        c("span", fu, [
          M(v.$slots, "hint", {}, () => [
            V(m(v.hint), 1)
          ])
        ])
      ], 8, cu),
      c("div", {
        class: F(["fr-range", {
          "fr-range--sm": v.small,
          "fr-range--double": d.value,
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
          style: de(s.value)
        }, m(p.value), 5),
        d.value ? (i(), f("input", {
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
          onInput: y[0] || (y[0] = (C) => {
            var I;
            return n("update:lowerValue", +((I = C.target) == null ? void 0 : I.value));
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
          onInput: y[1] || (y[1] = (C) => {
            var I;
            return n("update:modelValue", +((I = C.target) == null ? void 0 : I.value));
          })
        }, null, 40, mu),
        v.hideIndicators ? b("", !0) : (i(), f("span", gu, m(v.min), 1)),
        v.hideIndicators ? b("", !0) : (i(), f("span", bu, m(v.max), 1))
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
          }, m(v.message), 9, yu)) : b("", !0)
        ])
      ], 8, hu)) : b("", !0)
    ], 10, uu));
  }
}), wu = { class: "fr-segmented__element" }, _u = ["id", "name", "value", "checked", "disabled", "aria-disabled"], xu = ["for"], Iu = { key: 1 }, Ha = /* @__PURE__ */ S({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => J("basic", "checkbox") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = w(() => typeof e.icon == "string" ? { name: e.icon } : e.icon), n = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : "");
    return (l, r) => (i(), f("div", wu, [
      c("input", K({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: r[0] || (r[0] = (o) => l.$emit("update:modelValue", l.value))
      }), null, 16, _u),
      c("label", {
        for: l.id,
        class: F(["fr-label", { [n.value]: n.value }])
      }, [
        l.icon && !n.value ? (i(), R(le, se(K({ key: 0 }, a.value)), null, 16)) : b("", !0),
        l.icon ? (i(), f("span", Iu, " ")) : b("", !0),
        V(" " + m(l.label), 1)
      ], 10, xu)
    ]));
  }
}), Du = { class: "fr-form-group" }, Cu = ["disabled"], Tu = ["id"], Bu = {
  key: 0,
  class: "fr-hint-text"
}, Eu = { class: "fr-segmented__elements" }, Su = /* @__PURE__ */ S({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => J("radio-button", "group") },
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
        class: F(["fr-segmented", {
          "fr-segmented--sm": r.small,
          "fr-segmented--no-legend": !r.legend
        }]),
        disabled: r.disabled
      }, [
        r.legend ? (i(), f("legend", {
          key: 0,
          id: r.titleId,
          class: F(["fr-segmented__legend", {
            "fr-segmented__legend--inline": r.inline
          }])
        }, [
          M(r.$slots, "legend", {}, () => [
            V(m(r.legend), 1)
          ]),
          r.hint ? (i(), f("span", Bu, m(r.hint), 1)) : b("", !0)
        ], 10, Tu)) : b("", !0),
        c("div", Eu, [
          M(r.$slots, "default", {}, () => [
            (i(!0), f(q, null, Q(r.options, (d, s) => (i(), R(Ha, K({
              key: d.value || s,
              name: r.name || d.name,
              ref_for: !0
            }, { ...d, disabled: r.disabled || d.disabled }, {
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
}, Lu = {
  key: 0,
  class: "fr-hint-text"
}, Fu = ["id", "name", "disabled", "aria-disabled", "required"], Pu = ["selected"], Nu = ["selected", "value", "disabled", "aria-disabled"], Vu = ["id"], Ru = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => J("select") },
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
    const e = t, a = w(() => e.errorMessage || e.successMessage), n = w(() => e.errorMessage ? "error" : "valid");
    return (l, r) => (i(), f("div", {
      class: F(["fr-select-group", { [`fr-select-group--${n.value}`]: a.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        M(l.$slots, "label", {}, () => [
          V(m(l.label) + " ", 1),
          M(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", Mu, " *")) : b("", !0)
          ])
        ]),
        l.description ? (i(), f("span", Lu, m(l.description), 1)) : b("", !0)
      ], 8, Au),
      c("select", K({
        id: l.selectId,
        class: [{ [`fr-select--${n.value}`]: a.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: r[0] || (r[0] = (o) => {
          var d;
          return l.$emit("update:modelValue", (d = o.target) == null ? void 0 : d.value);
        })
      }), [
        c("option", {
          selected: l.modelValue == null,
          disabled: "",
          hidden: ""
        }, m(l.defaultUnselectedText), 9, Pu),
        (i(!0), f(q, null, Q(l.options, (o, d) => (i(), f("option", {
          key: d,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, m(typeof o == "object" ? o.text : o), 9, Nu))), 128))
      ], 16, Fu),
      a.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: F(`fr-${n.value}-text`)
      }, m(a.value), 11, Vu)) : b("", !0)
    ], 2));
  }
}), ju = { class: "fr-share" }, Ou = { class: "fr-share__title" }, $u = { class: "fr-btns-group" }, qu = ["title", "href", "onClick"], Hu = { key: 0 }, Ku = ["href", "title"], zu = ["title"], Qu = /* @__PURE__ */ S({
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
        c("p", Ou, m(n.title), 1),
        c("ul", $u, [
          (i(!0), f(q, null, Q(n.networks, (o, d) => (i(), f("li", { key: d }, [
            c("a", {
              class: F(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: G((s) => a(o), ["prevent"])
            }, m(o.label), 11, qu)
          ]))), 128)),
          (r = n.mail) != null && r.to ? (i(), f("li", Hu, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, m(n.mail.label), 9, Ku)
          ])) : b("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: l[0] || (l[0] = (o) => e())
            }, m(n.copyLabel), 9, zu)
          ])
        ])
      ]);
    };
  }
}), Gu = ["aria-current", "aria-expanded", "aria-controls"], Ka = /* @__PURE__ */ S({
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
    ], 8, Gu));
  }
}), za = /* @__PURE__ */ S({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      class: F(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      M(e.$slots, "default")
    ], 2));
  }
}), Wu = ["id"], Uu = { class: "fr-sidemenu__list" }, Qa = /* @__PURE__ */ S({
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
    const d = (p) => typeof p == "string" && p.startsWith("http"), s = (p) => d(p) ? "a" : "RouterLink", u = (p) => ({ [d(p) ? "href" : "to"]: p });
    return (p, v) => {
      const y = ie("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: a,
        class: F({
          "fr-collapse": p.collapsable,
          "fr-collapsing": N(n),
          "fr-collapse--expanded": N(l)
        }),
        onTransitionend: v[2] || (v[2] = (C) => N(o)(!!p.expanded))
      }, [
        c("ul", Uu, [
          M(p.$slots, "default"),
          (i(!0), f(q, null, Q(p.menuItems, (C, I) => (i(), R(za, {
            key: I,
            active: C.active
          }, {
            default: W(() => [
              C.menuItems ? b("", !0) : (i(), R(ne(s(C.to)), K({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": C.active ? "page" : void 0,
                ref_for: !0
              }, u(C.to)), {
                default: W(() => [
                  V(m(C.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              C.menuItems ? (i(), f(q, { key: 1 }, [
                Y(Ka, {
                  active: !!C.active,
                  expanded: !!C.expanded,
                  "control-id": C.id,
                  onToggleExpand: v[0] || (v[0] = (P) => p.$emit("toggleExpand", P))
                }, {
                  default: W(() => [
                    V(m(C.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                C.menuItems ? (i(), R(y, {
                  key: 0,
                  id: C.id,
                  collapsable: "",
                  expanded: C.expanded,
                  "menu-items": C.menuItems,
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
}), Xu = ["aria-labelledby"], Yu = { class: "fr-sidemenu__inner" }, Zu = ["aria-controls", "aria-expanded"], Ju = ["id"], ec = { class: "fr-sidemenu__title" }, tc = /* @__PURE__ */ S({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => J("sidemenu") },
    sideMenuListId: { default: () => J("sidemenu", "list") },
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
    } = pe(), o = $(!1);
    return ae(o, (d, s) => {
      d !== s && l(d);
    }), (d, s) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": d.id
    }, [
      c("div", Yu, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": d.id,
          "aria-expanded": o.value,
          onClick: s[0] || (s[0] = G((u) => o.value = !o.value, ["prevent", "stop"]))
        }, m(d.buttonLabel), 9, Zu),
        c("div", {
          id: d.id,
          ref_key: "collapse",
          ref: e,
          class: F(["fr-collapse", {
            "fr-collapse--expanded": N(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": N(a)
          }]),
          onTransitionend: s[2] || (s[2] = (u) => N(r)(o.value))
        }, [
          c("div", ec, m(d.headingTitle), 1),
          M(d.$slots, "default", {}, () => [
            Y(Qa, {
              id: d.sideMenuListId,
              "menu-items": d.menuItems,
              onToggleExpand: s[1] || (s[1] = (u) => d.$emit("toggleExpand", u))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Ju)
      ])
    ], 8, Xu));
  }
}), ac = /* @__PURE__ */ S({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = w(() => typeof e.to == "string" && e.to.startsWith("http")), n = w(() => a.value ? "a" : "RouterLink"), l = w(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (r, o) => (i(), R(ne(n.value), K({
      "aria-current": r.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: W(() => [
        M(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), lc = { class: "fr-skiplinks" }, nc = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, rc = { class: "fr-skiplinks__list" }, oc = ["href", "onClick"], ic = /* @__PURE__ */ S({
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
          (i(!0), f(q, null, Q(a.links, (l) => (i(), f("li", {
            key: l.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: G((r) => e(l.id), ["prevent"])
            }, m(l.text), 9, oc)
          ]))), 128))
        ])
      ])
    ]));
  }
}), sc = { class: "fr-stepper" }, dc = { class: "fr-stepper__title" }, uc = { class: "fr-stepper__state" }, cc = ["data-fr-current-step", "data-fr-steps"], fc = { class: "fr-stepper__details" }, pc = {
  key: 0,
  class: "fr-text--bold"
}, vc = /* @__PURE__ */ S({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (i(), f("div", sc, [
      c("h2", dc, [
        V(m(e.steps[e.currentStep - 1]) + " ", 1),
        c("span", uc, "Étape " + m(e.currentStep) + " sur " + m(e.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, cc),
      c("p", fc, [
        e.currentStep < e.steps.length ? (i(), f("span", pc, "Étape suivante :")) : b("", !0),
        V(" " + m(e.steps[e.currentStep]), 1)
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
}, bc = { class: "fr-summary__list" }, hc = ["href"], yc = /* @__PURE__ */ S({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("nav", mc, [
      c("h2", gc, m(e.title), 1),
      c("ol", bc, [
        (i(!0), f(q, null, Q(e.anchors, (n, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, m(n.name), 9, hc)
        ]))), 128))
      ])
    ]));
  }
}), kc = ["id", "aria-labelledby", "tabindex"], wc = /* @__PURE__ */ S({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(t) {
    la((s) => ({
      "7152af7e": o.value,
      "2a62e962": d.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, n = we(qe), { isVisible: l, asc: r } = n($e(() => e.tabId)), o = w(() => a[String(r == null ? void 0 : r.value)]), d = w(() => a[String(!(r != null && r.value))]);
    return (s, u) => (i(), R(dl, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: W(() => [
        me(c("div", {
          id: s.panelId,
          class: F(["fr-tabs__panel", {
            "fr-tabs__panel--selected": N(l)
          }]),
          role: "tabpanel",
          "aria-labelledby": s.tabId,
          tabindex: N(l) ? 0 : -1
        }, [
          M(s.$slots, "default", {}, void 0, !0)
        ], 10, kc), [
          [aa, N(l)]
        ])
      ]),
      _: 3
    }));
  }
}), Ga = /* @__PURE__ */ re(wc, [["__scopeId", "data-v-5774b16c"]]), _c = { role: "presentation" }, xc = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Ic = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Wa = /* @__PURE__ */ S({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = $(null), r = {
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
    const d = we(qe), { isVisible: s } = d($e(() => a.tabId));
    return (u, p) => (i(), f("li", _c, [
      c("button", {
        id: u.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${u.tabId}`,
        class: "fr-tabs__tab",
        tabindex: N(s) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": N(s),
        "aria-controls": u.panelId,
        onClick: p[0] || (p[0] = G((v) => u.$emit("click", u.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (v) => o(v))
      }, [
        u.icon ? (i(), f("span", Ic, [
          Y(le, { name: u.icon }, null, 8, ["name"])
        ])) : b("", !0),
        M(u.$slots, "default")
      ], 40, xc)
    ]));
  }
}), Ua = /* @__PURE__ */ S({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = w(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, r) => (i(), f("th", K(l.headerAttrs, { scope: "col" }), [
      V(m(l.header) + " ", 1),
      l.icon && !a.value ? (i(), R(le, se(K({ key: 0 }, n.value)), null, 16)) : b("", !0),
      a.value ? (i(), f("span", {
        key: 1,
        class: F({ [String(l.icon)]: a.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), Dc = { key: 0 }, Xa = /* @__PURE__ */ S({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (i(), f("tr", Dc, [
      (i(!0), f(q, null, Q(e.headers, (n, l) => (i(), R(Ua, {
        key: l,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), Ya = /* @__PURE__ */ S({
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
    const e = t, a = w(() => typeof e.field == "object" && e.field !== null && e.field.component ? e.field.component : !1), n = w(() => ["string", "number", "boolean"].includes(typeof e.field));
    return (l, r) => (i(), f("td", se(vt(l.cellAttrs)), [
      a.value ? (i(), R(ne(a.value), se(K({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: W(() => [
          V(m(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(q, { key: 1 }, [
        V(m(n.value ? l.field : l.field.text), 1)
      ], 64))
    ], 16));
  }
}), Za = /* @__PURE__ */ S({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(t) {
    return (e, a) => (i(), f("tr", se(vt(e.rowAttrs)), [
      M(e.$slots, "default"),
      (i(!0), f(q, null, Q(e.rowData, (n, l) => (i(), R(Ya, {
        key: l,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Cc = { class: "caption" }, Tc = { key: 1 }, Bc = ["colspan"], Ec = { class: "flex justify-right" }, Sc = { class: "self-center" }, Ac = ["value"], Mc = { class: "flex ml-1" }, Lc = { class: "self-center" }, Fc = { class: "flex ml-1" }, Pc = /* @__PURE__ */ S({
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
    const a = t, n = e, l = (g) => Array.isArray(g) ? g : g.rowData, r = $(a.currentPage), o = $(a.resultsDisplayed), d = $(
      a.rows.length > o.value ? Math.ceil(a.rows.length / o.value) : 1
    ), s = [5, 10, 25, 50, 100], u = () => r.value * o.value - o.value, p = () => r.value * o.value;
    ae(
      () => o.value,
      (g) => {
        d.value = a.rows.length > o.value ? Math.ceil(a.rows.length / g) : 1;
      }
    );
    const v = w(() => a.pagination ? a.rows.slice(u(), p()) : a.rows), y = () => {
      r.value = 1, n("update:currentPage");
    }, C = () => {
      r.value > 1 && (r.value -= 1, n("update:currentPage"));
    }, I = () => {
      r.value < d.value && (r.value += 1, n("update:currentPage"));
    }, P = () => {
      r.value = d.value, n("update:currentPage");
    };
    return (g, E) => (i(), f("div", {
      class: F(["fr-table", { "fr-table--no-caption": g.noCaption }])
    }, [
      c("table", null, [
        c("caption", Cc, m(g.title), 1),
        c("thead", null, [
          M(g.$slots, "header", {}, () => [
            g.headers && g.headers.length ? (i(), R(Xa, {
              key: 0,
              headers: g.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          M(g.$slots, "default", {}, void 0, !0),
          g.rows && g.rows.length ? (i(!0), f(q, { key: 0 }, Q(v.value, (k, _) => (i(), R(Za, {
            key: g.rowKey && l(k) ? typeof g.rowKey == "string" ? l(k)[g.headers.indexOf(g.rowKey)].toString() : g.rowKey(l(k)) : _,
            "row-data": l(k),
            "row-attrs": "rowAttrs" in k ? k.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : b("", !0),
          g.pagination ? (i(), f("tr", Tc, [
            c("td", {
              colspan: g.headers.length
            }, [
              c("div", Ec, [
                c("div", Sc, [
                  E[6] || (E[6] = c("span", null, "Résultats par page : ", -1)),
                  me(c("select", {
                    "onUpdate:modelValue": E[0] || (E[0] = (k) => o.value = k),
                    onChange: E[1] || (E[1] = (k) => n("update:currentPage"))
                  }, [
                    (i(), f(q, null, Q(s, (k, _) => c("option", {
                      key: _,
                      value: k
                    }, m(k), 9, Ac)), 64))
                  ], 544), [
                    [oa, o.value]
                  ])
                ]),
                c("div", Mc, [
                  c("span", Lc, "Page " + m(r.value) + " sur " + m(d.value), 1)
                ]),
                c("div", Fc, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: E[2] || (E[2] = (k) => y())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: E[3] || (E[3] = (k) => C())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: E[4] || (E[4] = (k) => I())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: E[5] || (E[5] = (k) => P())
                  })
                ])
              ])
            ], 8, Bc)
          ])) : b("", !0)
        ])
      ])
    ], 2));
  }
}), Nc = /* @__PURE__ */ re(Pc, [["__scopeId", "data-v-3998acc8"]]), Vc = ["aria-label"], Rc = /* @__PURE__ */ S({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: e, emit: a }) {
    const n = t, l = a, r = $(!1), o = w({
      get: () => n.modelValue,
      set(D) {
        l("update:modelValue", D);
      }
    }), d = $(/* @__PURE__ */ new Map()), s = $(0);
    ge(qe, (D) => {
      const z = $(!0);
      if (ae(o, (B, X) => {
        z.value = B > X;
      }), [...d.value.values()].includes(D.value))
        return { isVisible: w(() => d.value.get(o.value) === D.value), asc: z };
      const h = s.value++;
      d.value.set(h, D.value);
      const j = w(() => h === o.value);
      return ae(D, () => {
        d.value.set(h, D.value);
      }), fe(() => {
        d.value.delete(h);
      }), { isVisible: j };
    });
    const u = $(null), p = $(null), v = rl({}), y = (D) => {
      if (v[D])
        return v[D];
      const z = J("tab");
      return v[D] = z, z;
    }, C = async () => {
      const D = o.value === 0 ? n.tabTitles.length - 1 : o.value - 1;
      r.value = !1, o.value = D;
    }, I = async () => {
      const D = o.value === n.tabTitles.length - 1 ? 0 : o.value + 1;
      r.value = !0, o.value = D;
    }, P = async () => {
      o.value = 0;
    }, g = async () => {
      o.value = n.tabTitles.length - 1;
    }, E = $({ "--tabs-height": "100px" }), k = () => {
      var D;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const z = p.value.offsetHeight, h = (D = u.value) == null ? void 0 : D.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!h || !h.offsetHeight)
        return;
      const j = h.offsetHeight;
      E.value["--tabs-height"] = `${z + j}px`;
    }, _ = $(null);
    return oe(() => {
      var D;
      window.ResizeObserver && (_.value = new window.ResizeObserver(() => {
        k();
      })), (D = u.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((z) => {
        var h;
        z && ((h = _.value) == null || h.observe(z));
      });
    }), fe(() => {
      var D;
      (D = u.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((z) => {
        var h;
        z && ((h = _.value) == null || h.unobserve(z));
      });
    }), e({
      renderTabs: k,
      selectFirst: P,
      selectLast: g
    }), (D, z) => (i(), f("div", {
      ref_key: "$el",
      ref: u,
      class: "fr-tabs",
      style: de(E.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": D.tabListName
      }, [
        M(D.$slots, "tab-items", {}, () => [
          (i(!0), f(q, null, Q(D.tabTitles, (h, j) => (i(), R(Wa, {
            key: j,
            icon: h.icon,
            "panel-id": h.panelId || `${y(j)}-panel`,
            "tab-id": h.tabId || y(j),
            onClick: (B) => o.value = j,
            onNext: z[0] || (z[0] = (B) => I()),
            onPrevious: z[1] || (z[1] = (B) => C()),
            onFirst: z[2] || (z[2] = (B) => P()),
            onLast: z[3] || (z[3] = (B) => g())
          }, {
            default: W(() => [
              V(m(h.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, Vc),
      (i(!0), f(q, null, Q(D.tabContents, (h, j) => {
        var B, X, x, T;
        return i(), R(Ga, {
          key: j,
          "panel-id": ((X = (B = D.tabTitles) == null ? void 0 : B[j]) == null ? void 0 : X.panelId) || `${y(j)}-panel`,
          "tab-id": ((T = (x = D.tabTitles) == null ? void 0 : x[j]) == null ? void 0 : T.tabId) || y(j)
        }, {
          default: W(() => [
            V(m(h), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      M(D.$slots, "default")
    ], 4));
  }
}), jc = /* @__PURE__ */ S({
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
    const e = t, a = w(() => typeof e.link == "string" && e.link.startsWith("http")), n = w(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = w(() => ({ [a.value ? "href" : "to"]: e.link })), r = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), o = e.small ? 0.65 : 0.9, d = w(() => r.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: o } : { scale: o, ...e.icon ?? {} });
    return (s, u) => (i(), R(ne(n.value), K({
      class: ["fr-tag", {
        "fr-tag--sm": s.small,
        [s.icon]: r.value,
        "fr-tag--icon-left": r.value
      }],
      disabled: s.disabled
    }, l.value), {
      default: W(() => [
        e.icon && !r.value ? (i(), R(le, K({
          key: 0,
          label: s.iconOnly ? s.label : void 0,
          class: "fr-mr-1v"
        }, d.value), null, 16, ["label"])) : b("", !0),
        s.iconOnly ? b("", !0) : (i(), f(q, { key: 1 }, [
          V(m(s.label), 1)
        ], 64)),
        M(s.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), Dt = /* @__PURE__ */ re(jc, [["__scopeId", "data-v-f6a89dc8"]]), Oc = { class: "fr-tags-group" }, $c = /* @__PURE__ */ S({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("ul", Oc, [
      (i(!0), f(q, null, Q(e.tags, ({ icon: n, label: l, ...r }, o) => (i(), f("li", { key: o }, [
        Y(Dt, K({ ref_for: !0 }, r, {
          icon: n,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), qc = { class: "fr-tile__body" }, Hc = { class: "fr-tile__content" }, Kc = ["download", "href"], zc = {
  key: 0,
  class: "fr-tile__desc"
}, Qc = {
  key: 1,
  class: "fr-tile__detail"
}, Gc = {
  key: 2,
  class: "fr-tile__start"
}, Wc = { class: "fr-tile__header" }, Uc = {
  key: 0,
  class: "fr-tile__pictogram"
}, Xc = ["src"], Yc = ["href"], Zc = ["href"], Jc = ["href"], ef = /* @__PURE__ */ S({
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
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = w(() => typeof e.to == "string" && e.to.startsWith("http"));
    return (l, r) => {
      const o = ie("RouterLink");
      return i(), f("div", {
        class: F(["fr-tile fr-enlarge-link", [{
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
            (i(), R(ne(l.titleTag), { class: "fr-tile__title" }, {
              default: W(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, m(l.title), 9, Kc)) : b("", !0),
                n.value ? b("", !0) : (i(), R(o, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: W(() => [
                    V(m(l.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            l.description ? (i(), f("p", zc, m(l.description), 1)) : b("", !0),
            l.details ? (i(), f("p", Qc, m(l.details), 1)) : b("", !0),
            l.$slots["start-details"] ? (i(), f("div", Gc, [
              M(l.$slots, "start-details", {}, void 0, !0)
            ])) : b("", !0)
          ])
        ]),
        c("div", Wc, [
          M(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (i(), f("div", Uc, [
            l.imgSrc ? (i(), f("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Xc)) : (i(), f("svg", K({
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
}), Ja = /* @__PURE__ */ re(ef, [["__scopeId", "data-v-f4d836a2"]]), tf = { class: "fr-grid-row fr-grid-row--gutters" }, af = /* @__PURE__ */ S({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("div", tf, [
      (i(!0), f(q, null, Q(e.tiles, (n, l) => (i(), f("div", {
        key: l,
        class: F({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        Y(Ja, K({
          horizontal: e.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), lf = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], nf = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], rf = ["id"], of = /* @__PURE__ */ S({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => J("toggle") },
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
    const e = t, a = w(() => `${e.inputId}-hint-text`);
    return (n, l) => (i(), f("div", {
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
      }, m(n.label), 9, nf),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, m(n.hint), 9, rf)) : b("", !0)
    ], 2));
  }
}), sf = ["id"], df = /* @__PURE__ */ S({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => J("tooltip") }
  },
  setup(t) {
    const e = t, a = $(!1), n = $(null), l = $(null), r = $("0px"), o = $("0px"), d = $("0px"), s = $(!1), u = $(0);
    async function p() {
      var k, _, D, z, h, j;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((ee) => setTimeout(ee, 100));
      const B = (k = n.value) == null ? void 0 : k.getBoundingClientRect().top, X = (_ = n.value) == null ? void 0 : _.offsetHeight, x = (D = n.value) == null ? void 0 : D.offsetWidth, T = (z = n.value) == null ? void 0 : z.getBoundingClientRect().left, O = (h = l.value) == null ? void 0 : h.offsetHeight, A = (j = l.value) == null ? void 0 : j.offsetWidth, L = !(B - O < 0) && B + X + O >= document.documentElement.offsetHeight;
      s.value = L;
      const H = T + x >= document.documentElement.offsetWidth, Z = T + x / 2 - A / 2 <= 0;
      o.value = L ? `${B - O + 8}px` : `${B + X - 8}px`, u.value = 1, r.value = H ? `${T + x - A - 4}px` : Z ? `${T + 4}px` : `${T + x / 2 - A / 2}px`, d.value = H ? `${A / 2 - x / 2 + 4}px` : Z ? `${-(A / 2) + x / 2 - 4}px` : "0px";
    }
    ae(a, p, { immediate: !0 }), oe(() => {
      window.addEventListener("scroll", p);
    }), fe(() => {
      window.removeEventListener("scroll", p);
    });
    const v = w(() => `transform: translate(${r.value}, ${o.value}); --arrow-x: ${d.value}; opacity: ${u.value};'`), y = w(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": s.value,
      "fr-placement--bottom": !s.value
    })), C = (k) => {
      var _, D;
      a.value && (k.target === n.value || (_ = n.value) != null && _.contains(k.target) || k.target === l.value || (D = l.value) != null && D.contains(k.target) || (a.value = !1));
    }, I = (k) => {
      k.key === "Escape" && (a.value = !1);
    };
    oe(() => {
      document.documentElement.addEventListener("click", C), document.documentElement.addEventListener("keydown", I);
    }), fe(() => {
      document.documentElement.removeEventListener("click", C), document.documentElement.removeEventListener("keydown", I);
    });
    const P = () => {
      e.onHover && (a.value = !0);
    }, g = () => {
      e.onHover && (a.value = !1);
    }, E = () => {
      e.onHover || (a.value = !a.value);
    };
    return (k, _) => (i(), f(q, null, [
      (i(), R(ne(k.onHover ? "a" : "button"), {
        id: `link-${k.id}`,
        ref_key: "source",
        ref: n,
        class: F(k.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": k.id,
        href: k.onHover ? "#" : void 0,
        onClick: _[0] || (_[0] = G((D) => E(), ["stop"])),
        onMouseenter: _[1] || (_[1] = (D) => P()),
        onMouseleave: _[2] || (_[2] = (D) => g()),
        onFocus: _[3] || (_[3] = (D) => P()),
        onBlur: _[4] || (_[4] = (D) => g())
      }, {
        default: W(() => [
          M(k.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: k.id,
        ref_key: "tooltip",
        ref: l,
        class: F(["fr-tooltip fr-placement", y.value]),
        style: de(v.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, m(k.content), 15, sf)
    ], 64));
  }
}), uf = /* @__PURE__ */ re(df, [["__scopeId", "data-v-67870551"]]), cf = { class: "fr-transcription" }, ff = ["aria-expanded", "aria-controls"], pf = ["id"], vf = ["id", "aria-labelledby"], mf = { class: "fr-container fr-container--fluid fr-container-md" }, gf = { class: "fr-grid-row fr-grid-row--center" }, bf = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, hf = { class: "fr-modal__body" }, yf = { class: "fr-modal__header" }, kf = ["aria-controls"], wf = { class: "fr-modal__content" }, _f = ["id"], xf = { class: "fr-transcription__footer" }, If = { class: "fr-transcription__actions-group" }, Df = ["aria-controls"], el = /* @__PURE__ */ S({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => J("transcription") },
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
    } = pe(), d = $(!1), s = $(!1), u = w(() => `fr-transcription__modal-${e.id}`), p = w(() => `fr-transcription__collapse-${e.id}`);
    return ae(s, (v, y) => {
      v !== y && r(v);
    }), (v, y) => (i(), f("div", cf, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": s.value,
        "aria-controls": p.value,
        onClick: y[0] || (y[0] = (C) => s.value = !s.value)
      }, " Transcription ", 8, ff),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: a,
        class: F(["fr-collapse", { "fr-collapse--expanded": N(l), "fr-collapsing": N(n) }]),
        onTransitionend: y[2] || (y[2] = (C) => N(o)(s.value))
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
                  c("div", wf, [
                    c("h1", {
                      id: `${u.value}-title`,
                      class: "fr-modal__title"
                    }, m(v.title), 9, _f),
                    V(" " + m(v.content), 1)
                  ]),
                  c("div", xf, [
                    c("div", If, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": u.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: y[1] || (y[1] = (C) => d.value = !0)
                      }, " Agrandir ", 8, Df)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, vf)
      ], 42, pf),
      (i(), R(ol, { to: "body" }, [
        Y(Na, {
          title: v.title,
          opened: d.value,
          onClose: y[3] || (y[3] = (C) => d.value = !1)
        }, {
          default: W(() => [
            M(v.$slots, "default", {}, () => [
              V(m(v.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Cf = ["src"], Tf = { class: "fr-content-media__caption" }, Bf = /* @__PURE__ */ S({
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
    return (e, a) => (i(), f(q, null, [
      c("figure", {
        class: F(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        c("div", {
          class: F(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          c("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Cf)
        ], 2),
        c("div", Tf, m(e.legend), 1)
      ], 2),
      Y(el, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Ef = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: gl,
  DsfrAccordionsGroup: hl,
  DsfrAlert: wl,
  DsfrBackToTop: _l,
  DsfrBadge: ia,
  DsfrBreadcrumb: El,
  DsfrButton: Ee,
  DsfrButtonGroup: Qe,
  DsfrCallout: $n,
  DsfrCard: tr,
  DsfrCardDetail: st,
  DsfrCheckbox: xt,
  DsfrCheckboxSet: fr,
  DsfrConsent: gr,
  DsfrDataTable: Yr,
  DsfrErrorPage: ro,
  DsfrFieldset: co,
  DsfrFileDownload: Ia,
  DsfrFileDownloadList: go,
  DsfrFileUpload: xo,
  DsfrFollow: Ko,
  DsfrFooter: ki,
  DsfrFooterLink: Ta,
  DsfrFooterLinkList: Ii,
  DsfrFooterPartners: Ba,
  DsfrFranceConnect: Bi,
  DsfrHeader: ms,
  DsfrHeaderMenuLink: Ea,
  DsfrHeaderMenuLinks: ct,
  DsfrHighlight: gs,
  DsfrInput: It,
  DsfrInputGroup: _s,
  DsfrLanguageSelector: dt,
  DsfrLogo: Ne,
  DsfrModal: Na,
  DsfrNavigation: Bd,
  DsfrNavigationItem: Va,
  DsfrNavigationMegaMenu: ja,
  DsfrNavigationMegaMenuCategory: Ra,
  DsfrNavigationMenu: $a,
  DsfrNavigationMenuItem: Oa,
  DsfrNavigationMenuLink: Ge,
  DsfrNewsLetter: Da,
  DsfrNotice: Ld,
  DsfrPagination: xa,
  DsfrPicture: Rd,
  DsfrQuote: Qd,
  DsfrRadioButton: qa,
  DsfrRadioButtonSet: du,
  DsfrRange: ku,
  DsfrSearchBar: ut,
  DsfrSegmented: Ha,
  DsfrSegmentedSet: Su,
  DsfrSelect: Ru,
  DsfrShare: Qu,
  DsfrSideMenu: tc,
  DsfrSideMenuButton: Ka,
  DsfrSideMenuLink: ac,
  DsfrSideMenuList: Qa,
  DsfrSideMenuListItem: za,
  DsfrSkipLinks: ic,
  DsfrSocialNetworks: Ca,
  DsfrStepper: vc,
  DsfrSummary: yc,
  DsfrTabContent: Ga,
  DsfrTabItem: Wa,
  DsfrTable: Nc,
  DsfrTableCell: Ya,
  DsfrTableHeader: Ua,
  DsfrTableHeaders: Xa,
  DsfrTableRow: Za,
  DsfrTabs: Rc,
  DsfrTag: Dt,
  DsfrTags: $c,
  DsfrTile: Ja,
  DsfrTiles: af,
  DsfrToggleSwitch: of,
  DsfrTooltip: uf,
  DsfrTranscription: el,
  DsfrVideo: Bf,
  VIcon: le,
  registerAccordionKey: mt,
  registerNavigationLinkKey: gt,
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
      r = r.filter((d) => this.unaccentLower(d[a].toString()).indexOf(o) > -1);
    }
    return r;
  },
  dsfrTransformListForSelection: function(t, e, a, n, l) {
    return this._searchAndFilterList(t, e, a, n, l).map(function(o) {
      return { value: o[e], text: o[a].toString() };
    });
  },
  dsfrTransformListForRadio: function(t, e, a, n, l, r, o) {
    return this._searchAndFilterList(t, e, a, r, o).map(function(s) {
      return { value: s[e], label: s[a].toString(), hint: s[l], disabled: s[n] };
    });
  },
  dsfrTransformListForCheckbox: function(t, e, a, n, l, r, o, d) {
    return this._searchAndFilterList(t, e, a, o, d).map(function(u) {
      return { value: u[e], label: u[a].toString(), name: r, hint: u[l], disabled: u[n] };
    });
  }
}, Mf = ["href"], Lf = {
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
}, We = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, Ff = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: xt, DsfrTag: Dt, DsfrButton: Ee },
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
}, Nf = { class: "fr-mb-1w" }, Vf = { key: 0 }, Rf = { class: "facet" }, jf = { class: "flex justify-between w-full fr-mb-0" }, Of = { class: "facet--count" }, $f = { key: 1 }, qf = { class: "flex justify-between w-full" }, Hf = { class: "facet--count" }, Kf = { key: 0 }, zf = { class: "facet" }, Qf = { class: "flex justify-between w-full fr-mb-0" }, Gf = { class: "facet--count" }, Wf = { key: 1 }, Uf = { class: "flex justify-between w-full" }, Xf = { class: "facet--count" }, Yf = { class: "fr-mb-2w" };
function Zf(t, e, a, n, l, r) {
  const o = ie("DsfrTag"), d = ie("DsfrCheckbox"), s = ie("DsfrButton");
  return i(), f("div", null, [
    r.isAnyFacetValueSelected() ? (i(), f("div", Pf, [
      (i(!0), f(q, null, Q(a.selectedFacets, (u, p) => (i(), f("div", { key: p }, [
        r.facetMultipleByCode(p) ? b("", !0) : (i(!0), f(q, { key: 0 }, Q(u, (v) => (i(), R(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: v.code,
          onClick: (y) => t.$emit("toogle-facet", p, v, a.contextKey)
        }, {
          default: W(() => [
            V(m(r.facetLabelByCode(p)) + ": " + m(r.facetValueLabelByCode(p, v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : b("", !0),
    (i(!0), f(q, null, Q(a.facets, (u) => (i(), f("div", {
      key: u.code,
      class: "facets"
    }, [
      u.multiple || !r.isFacetSelected(u.code) ? (i(), f(q, { key: 0 }, [
        c("h6", Nf, m(u.label), 1),
        c("ul", null, [
          (i(!0), f(q, null, Q(r.selectedInvisibleFacets(u.code), (p) => (i(), f(q, {
            key: p.code
          }, [
            u.multiple ? (i(), f("li", Vf, [
              c("div", Rf, [
                Y(d, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
                }, {
                  label: W(() => [
                    c("p", jf, [
                      V(m(r.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                      c("span", Of, m(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", $f, [
              Y(s, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
              }, {
                default: W(() => [
                  c("span", qf, [
                    V(m(r.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                    c("span", Hf, m(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(q, null, Q(r.visibleFacets(u.code, u.values), (p) => (i(), f(q, {
            key: p.code
          }, [
            u.multiple ? (i(), f("li", Kf, [
              c("div", zf, [
                Y(d, {
                  small: "",
                  modelValue: r.isFacetValueSelected(u.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
                }, {
                  label: W(() => [
                    c("p", Qf, [
                      V(m(r.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                      c("span", Gf, m(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", Wf, [
              Y(s, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
              }, {
                default: W(() => [
                  c("span", Uf, [
                    V(m(r.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                    c("span", Xf, m(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", Yf, [
          u.values.length > a.maxValues && !r.isFacetExpanded(u.code) ? (i(), R(s, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => r.expandFacet(u.code)
          }, {
            default: W(() => [
              V(m(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0),
          u.values.length > a.maxValues && r.isFacetExpanded(u.code) ? (i(), R(s, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => r.reduceFacet(u.code)
          }, {
            default: W(() => [
              V(m(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0)
        ])
      ], 64)) : b("", !0)
    ]))), 128))
  ]);
}
const Jf = /* @__PURE__ */ We(Ff, [["render", Zf], ["__scopeId", "data-v-e1d6020e"]]), Ct = () => {
  const t = $(), e = $(!1), a = $(!1), n = () => {
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
}, ep = "abcdefghijklmnopqrstuvwyz0123456789", ta = ep.repeat(10), tp = () => {
  const t = Math.floor(Math.random() * ta.length);
  return ta[t];
}, ap = (t) => Array.from({ length: t }).map(tp).join(""), Tt = (t = "", e = "") => (t ? `${t}-` : "") + ap(5) + (e ? `-${e}` : ""), lp = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], np = ["id", "aria-labelledby", "onKeydown"], rp = {
  class: "fr-menu__list",
  role: "none"
}, op = /* @__PURE__ */ S({
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Tt("menu") },
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
    } = Ct(), o = t, d = $(null), s = $(!1);
    let u = $(0), p = [];
    ge("menuItem", { menuItemIndex: u, addMenuItem: (k, _) => {
      u.value += 1, p.push(`${k}@${_}`);
    } }), ge("id", o.id), ae(s, (k, _) => {
      k !== _ && (l(k), k ? (setTimeout(() => I(), 100), document.addEventListener("click", E), document.addEventListener("touchstart", E)) : (document.removeEventListener("click", E), document.removeEventListener("touchstart", E)));
    });
    const y = (k, _) => {
      const D = _ === "down" ? (k + 1) % p.length : (k - 1 + p.length) % p.length, z = document.getElementById(`${o.id}_item_${D}`);
      return z.ariaDisabled === "true" ? y(D, _) : z;
    }, C = (k) => {
      const _ = document.activeElement.id, D = _.startsWith(`${o.id}_item_`) ? Number(_.split("_")[2]) : k === "down" ? -1 : 0;
      y(D, k).focus();
    }, I = (k) => C("down"), P = (k) => C("up");
    let g = (k) => {
      let _ = k.key;
      if (_.length > 1 && _.match(/\S/))
        return;
      _ = _.toLowerCase();
      let D = p.filter((h) => h.toLowerCase().startsWith(_)), z = document.activeElement.id;
      for (let h of D) {
        let j = h.split("@")[1], B = document.getElementById(`${o.id}_item_${j}`);
        if (z !== B.id) {
          B.focus();
          break;
        }
      }
    }, E = (k) => {
      d.value.contains(document.activeElement) || (s.value = !1);
    };
    return (k, _) => (i(), f("div", {
      class: "relative-position",
      onKeydown: _[9] || (_[9] = U(
        //@ts-ignore
        (...D) => N(E) && N(E)(...D),
        ["tab"]
      )),
      ref_key: "container",
      ref: d
    }, [
      c("button", K({
        id: k.id,
        onClick: _[0] || (_[0] = G((D) => s.value = !s.value, ["prevent", "stop"])),
        onKeyup: [
          _[1] || (_[1] = U(G((D) => s.value = !1, ["stop"]), ["esc"])),
          _[2] || (_[2] = U(G((D) => s.value = !s.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          U(G(I, ["prevent"]), ["down"]),
          U(G(P, ["prevent"]), ["up"]),
          _[3] || (_[3] = //@ts-ignore
          (...D) => N(g) && N(g)(...D)),
          _[4] || (_[4] = U((D) => s.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          "fr-btn--secondary": k.secondary,
          "fr-btn--tertiary": k.tertiary
        }],
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": k.disabled,
        "aria-controls": `${k.id}_menu`,
        "aria-expanded": s.value
      }, k.$attrs), [
        k.icon !== "" ? (i(), R(N(le), {
          key: 0,
          class: "fr-mr-2v",
          name: k.icon
        }, null, 8, ["name"])) : b("", !0),
        c("span", null, m(k.label), 1)
      ], 16, lp),
      c("div", {
        id: `${k.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: F(["fr-collapse fr-menu", { "fr-collapse--expanded": N(n), "fr-collapsing": N(a) }]),
        role: "menu",
        "aria-labelledby": k.id,
        onKeyup: _[5] || (_[5] = U((D) => s.value = !1, ["esc"])),
        onKeydown: [
          _[6] || (_[6] = U((D) => s.value = !1, ["tab"])),
          U(G(I, ["prevent"]), ["down"]),
          U(G(P, ["prevent"]), ["up"]),
          _[7] || (_[7] = //@ts-ignore
          (...D) => N(g) && N(g)(...D))
        ],
        onTransitionend: _[8] || (_[8] = (D) => N(r)(s.value))
      }, [
        c("ul", rp, [
          M(k.$slots, "default", {}, void 0, !0)
        ])
      ], 42, np)
    ], 544));
  }
}), ip = /* @__PURE__ */ We(op, [["__scopeId", "data-v-f34aeaea"]]), sp = { role: "none" }, dp = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" }
  },
  setup(t) {
    const e = t, { menuItemIndex: a, addMenuItem: n } = we("menuItem"), l = we("id"), r = a.value;
    return n(e.label, r), (o, d) => {
      const s = ie("dsfr-button");
      return i(), f("li", sp, [
        Y(s, K({
          tabindex: "-1",
          role: "menuitem",
          label: o.label,
          id: `${N(l)}_item_${N(r)}`,
          secondary: "",
          class: "fr-nav__link"
        }, o.$attrs), null, 16, ["label", "id"])
      ]);
    };
  }
}), up = ["for"], cp = {
  key: 0,
  class: "required"
}, fp = {
  key: 0,
  class: "fr-hint-text"
}, pp = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], vp = ["id", "onKeydown"], mp = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, gp = ["id"], bp = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, hp = ["id"], yp = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, kp = {
  key: 0,
  class: "fr-hint-text"
}, wp = {
  role: "listbox",
  "aria-multiselectable": "true",
  class: "fr-select__ul"
}, _p = ["aria-selected"], xp = ["id", "data-id", "value"], Ip = ["for"], Dp = ["id"], Cp = /* @__PURE__ */ S({
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ Ce({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Tt("select-multiple") },
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
    } = Ct(), o = t, d = $(!1), s = ce(t, "modelValue"), u = $(o.options);
    ae(d, (A, L) => {
      A !== L && (l(A), A ? (document.addEventListener("click", O), document.addEventListener("touchstart", O)) : (document.removeEventListener("click", O), document.removeEventListener("touchstart", O)));
    });
    const p = $(null), v = $(null), y = $(null), C = w(() => o.errorMessage || o.successMessage), I = w(() => o.errorMessage !== "" ? "error" : "valid"), P = w(() => o.modelValue.length === u.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), g = w(() => o.modelValue.length === u.value.length ? "Tout déselectionner" : "Tout sélectionner"), E = w(() => {
      let A = `${o.modelValue.length} options séléctionnées`;
      return o.modelValue.length > 2 ? A : o.options.filter((L) => o.modelValue.includes(L.value)).map((L) => L.text).join(", ");
    });
    let k = function() {
      if (o.modelValue.length >= u.value.length)
        o.modelValue.length = 0;
      else
        for (let A of u.value)
          o.modelValue.push(A.value);
    }, _ = function(A) {
      const L = A.target.value.toLowerCase();
      u.value = o.options.filter((H) => H.text.toLowerCase().indexOf(L) > -1);
    };
    const D = (A, L) => {
      const H = L === "down" ? (A + 1) % u.value.length : (A - 1 + u.value.length) % u.value.length, Z = document.getElementById(`${o.id}_option_${H}`);
      return Z.ariaDisabled === "true" ? D(H, L) : Z;
    }, z = (A) => {
      const L = document.activeElement.id, H = L.startsWith(`${o.id}_option_`) ? Number(L.split("_")[2]) : A === "down" ? -1 : 0;
      D(H, A).focus();
    }, h = (A) => z("down"), j = (A) => z("up");
    let B = function(A) {
      A.shiftKey || (o.comboHasButton ? d.value || (d.value = !0, A.preventDefault(), setTimeout(() => v.value.focus(), 100)) : o.comboHasFilter && (d.value || (d.value = !0, A.preventDefault(), setTimeout(() => y.value.focus(), 100))));
    }, X = function(A) {
      A.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.id}_button` || o.comboHasFilter && document.activeElement.id === `${o.id}_filter`) && (A.preventDefault(), d.value = !1), !o.comboHasFilter && !o.comboHasButton && (d.value = !1));
    }, x = function(A) {
      document.activeElement.id.startsWith(`${o.id}_option_`) && (o.comboHasFilter ? (A.preventDefault(), y.value.focus()) : o.comboHasButton && v.value.focus());
    }, T = (A) => {
      let L = A.key;
      if (L.length > 1 && L.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      L = L.toLowerCase();
      let H = u.value.filter((ee) => ee.text.toLowerCase().startsWith(L)), Z = document.activeElement.id;
      for (let ee of H) {
        let te = document.querySelector(`[data-id='${ee.value}']`);
        if (Z !== te.id) {
          te.focus();
          break;
        }
      }
    }, O = (A) => {
      p.value.contains(document.activeElement) || (d.value = !1);
    };
    return (A, L) => (i(), f(q, null, [
      c("div", {
        ref_key: "container",
        ref: p,
        class: F(["fr-select-group", { [`fr-select-group--${I.value}`]: C.value !== "" }]),
        onKeyup: L[13] || (L[13] = U(
          //@ts-ignore
          (...H) => N(O) && N(O)(...H),
          ["tab"]
        ))
      }, [
        c("label", {
          class: "fr-label",
          for: A.id
        }, [
          M(A.$slots, "label", {}, () => [
            V(m(A.label) + " ", 1),
            M(A.$slots, "required-tip", {}, () => [
              A.required ? (i(), f("span", cp, " *")) : b("", !0)
            ], !0)
          ], !0),
          A.description ? (i(), f("span", fp, m(A.description), 1)) : b("", !0)
        ], 8, up),
        c("div", K({
          id: A.id,
          class: [{ [`fr-select--${I.value}`]: C.value !== "" }, "fr-input"],
          onClick: L[0] || (L[0] = G((H) => d.value = !d.value, ["prevent", "stop"])),
          onKeydown: [
            L[1] || (L[1] = U(G((H) => d.value = !1, ["stop"]), ["esc"])),
            L[2] || (L[2] = U(G((H) => d.value = !d.value, ["prevent"]), ["space"])),
            U(G(h, ["prevent"]), ["down"]),
            U(G(j, ["prevent"]), ["up"]),
            L[3] || (L[3] = U(
              //@ts-ignore
              (...H) => N(B) && N(B)(...H),
              ["tab"]
            )),
            L[4] || (L[4] = //@ts-ignore
            (...H) => N(T) && N(T)(...H))
          ],
          tabindex: "0",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-autocomplete": "none",
          "aria-disabled": A.disabled,
          "aria-controls": `${A.id}_list`,
          "aria-expanded": d.value,
          "aria-required": A.required
        }, A.$attrs), [
          c("p", null, m(E.value), 1)
        ], 16, pp),
        c("div", {
          id: `${A.id}_list`,
          ref_key: "collapse",
          ref: e,
          class: F(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": N(n), "fr-collapsing": N(a) }]),
          onKeyup: L[8] || (L[8] = U((H) => d.value = !1, ["esc"])),
          onKeydown: [
            L[9] || (L[9] = U(
              //@ts-ignore
              (...H) => N(X) && N(X)(...H),
              ["tab"]
            )),
            U(G(h, ["prevent"]), ["down"]),
            U(G(j, ["prevent"]), ["up"]),
            L[10] || (L[10] = U(G(
              //@ts-ignore
              (...H) => N(x) && N(x)(...H),
              ["shift"]
            ), ["tab"])),
            L[11] || (L[11] = //@ts-ignore
            (...H) => N(T) && N(T)(...H))
          ],
          onTransitionend: L[12] || (L[12] = (H) => N(r)(d.value))
        }, [
          A.comboHasButton ? (i(), f("ul", mp, [
            c("li", null, [
              c("button", {
                class: F(["fr-btn fr-btn--tertiary", `${P.value}`]),
                id: `${A.id}_button`,
                onClick: L[5] || (L[5] = (H) => N(k)()),
                ref_key: "button",
                ref: v,
                type: "button"
              }, m(g.value), 11, gp)
            ])
          ])) : b("", !0),
          A.comboHasFilter ? (i(), f("div", bp, [
            c("input", {
              class: "fr-input",
              id: `${A.id}_filter`,
              ref_key: "filter",
              ref: y,
              onInput: L[6] || (L[6] = //@ts-ignore
              (...H) => N(_) && N(_)(...H)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, hp)
          ])) : b("", !0),
          A.comboLabel ? (i(), f("p", yp, [
            V(m(A.comboLabel) + " ", 1),
            A.comboDescription ? (i(), f("span", kp, m(A.comboDescription), 1)) : b("", !0)
          ])) : b("", !0),
          c("ul", wp, [
            (i(!0), f(q, null, Q(u.value, (H, Z) => (i(), f("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": s.value.includes(H.value)
            }, [
              me(c("input", {
                id: `${A.id}_option_${Z}`,
                "data-id": H.value,
                type: "checkbox",
                class: "",
                tabindex: "-1",
                value: H.value,
                "onUpdate:modelValue": L[7] || (L[7] = (ee) => s.value = ee)
              }, null, 8, xp), [
                [pt, s.value]
              ]),
              c("label", {
                class: "fr-label",
                for: `opt_${Z}`
              }, m(H.text), 9, Ip)
            ], 8, _p))), 256))
          ])
        ], 42, vp)
      ], 34),
      C.value ? (i(), f("p", {
        key: 0,
        id: `select-${I.value}-desc-${I.value}`,
        class: F(`fr-${I.value}-text`)
      }, m(C.value), 11, Dp)) : b("", !0)
    ], 64));
  }
}), Tp = /* @__PURE__ */ We(Cp, [["__scopeId", "data-v-db1df94a"]]), Bp = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Ep = ["id", "aria-labelledby", "onKeydown"], Sp = {
  key: 0,
  class: "fr-label fr-mb-0"
}, Ap = {
  key: 0,
  class: "fr-hint-text"
}, Mp = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, Lp = {
  role: "none",
  class: "fr-p-2v"
}, Fp = ["id", "href"], Pp = /* @__PURE__ */ S({
  __name: "DsfrHeaderMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Tt("header-menu") },
    disabled: { type: Boolean, default: !1 },
    logoutUrl: { default: "" },
    logoutLabel: { default: "Se déconnecter" },
    nom: { default: "" },
    email: { default: "" }
  },
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: r
    } = Ct(), o = t, d = $(null), s = $(!1);
    let u = $(0), p = [];
    const v = (k, _) => {
      u.value += 1, p.push(`${k}@${_}`);
    };
    ge("menuItem", { menuItemIndex: u, addMenuItem: v }), ge("id", o.id), ae(s, (k, _) => {
      k !== _ && (l(k), k ? (setTimeout(() => I(), 100), document.addEventListener("click", E), document.addEventListener("touchstart", E)) : (document.removeEventListener("click", E), document.removeEventListener("touchstart", E)));
    }), oe(() => {
      v(o.logoutLabel, u.value);
    });
    const y = (k, _) => {
      const D = _ === "down" ? (k + 1) % p.length : (k - 1 + p.length) % p.length, z = document.getElementById(`${o.id}_item_${D}`);
      return z.ariaDisabled === "true" ? y(D, _) : z;
    }, C = (k) => {
      const _ = document.activeElement.id, D = _.startsWith(`${o.id}_item_`) ? Number(_.split("_")[2]) : k === "down" ? -1 : 0;
      y(D, k).focus();
    }, I = (k) => C("down"), P = (k) => C("up");
    let g = (k) => {
      let _ = k.key;
      if (_.length > 1 && _.match(/\S/))
        return;
      _ = _.toLowerCase();
      let D = p.filter((h) => h.toLowerCase().startsWith(_)), z = document.activeElement.id;
      for (let h of D) {
        let j = h.split("@")[1], B = document.getElementById(`${o.id}_item_${j}`);
        if (z !== B.id) {
          B.focus();
          break;
        }
      }
    }, E = (k) => {
      d.value.contains(document.activeElement) || (s.value = !1);
    };
    return (k, _) => (i(), f("div", {
      class: "relative-position",
      onKeyup: _[9] || (_[9] = U(
        //@ts-ignore
        (...D) => N(E) && N(E)(...D),
        ["tab"]
      )),
      ref_key: "container",
      ref: d
    }, [
      c("button", K({
        id: k.id,
        onClick: _[0] || (_[0] = G((D) => s.value = !s.value, ["prevent", "stop"])),
        onKeyup: [
          _[1] || (_[1] = U(G((D) => s.value = !1, ["stop"]), ["esc"])),
          _[2] || (_[2] = U(G((D) => s.value = !s.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          U(G(I, ["prevent"]), ["down"]),
          U(G(P, ["prevent"]), ["up"]),
          _[3] || (_[3] = //@ts-ignore
          (...D) => N(g) && N(g)(...D)),
          _[4] || (_[4] = U((D) => s.value = !1, ["tab"]))
        ],
        class: "fr-btn fr-btn--tertiary fr-menu__btn",
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": k.disabled,
        "aria-controls": `${k.id}_menu`,
        "aria-expanded": s.value
      }, k.$attrs), [
        k.icon !== "" ? (i(), R(N(le), {
          key: 0,
          class: "fr-mr-2v",
          name: k.icon
        }, null, 8, ["name"])) : b("", !0),
        c("span", null, m(k.label), 1)
      ], 16, Bp),
      c("div", {
        id: `${k.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: F(["fr-collapse fr-menu fr-menu-header fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": N(n), "fr-collapsing": N(a) }]),
        role: "menu",
        "aria-labelledby": k.id,
        onKeyup: _[5] || (_[5] = U((D) => s.value = !1, ["esc"])),
        onKeydown: [
          _[6] || (_[6] = U((D) => s.value = !1, ["tab"])),
          U(G(I, ["prevent"]), ["down"]),
          U(G(P, ["prevent"]), ["up"]),
          _[7] || (_[7] = //@ts-ignore
          (...D) => N(g) && N(g)(...D))
        ],
        onTransitionend: _[8] || (_[8] = (D) => N(r)(s.value))
      }, [
        M(k.$slots, "detail", {}, () => [
          k.nom === "" && k.email === "" ? b("", !0) : (i(), f("p", Sp, [
            V(m(k.nom) + " ", 1),
            k.email !== "" ? (i(), f("span", Ap, m(k.email), 1)) : b("", !0)
          ]))
        ], !0),
        c("ul", Mp, [
          M(k.$slots, "default", {}, void 0, !0),
          c("li", Lp, [
            k.logoutUrl !== "" ? (i(), f("a", {
              key: 0,
              id: `${k.id}_item_${N(u) - 1}`,
              class: "fr-btn w-full fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
              role: "menuitem",
              tabindex: "-1",
              href: k.logoutUrl
            }, m(k.logoutLabel), 9, Fp)) : b("", !0)
          ])
        ])
      ], 42, Ep)
    ], 544));
  }
}), Np = /* @__PURE__ */ We(Pp, [["__scopeId", "data-v-6e512b94"]]);
var Vp = {
  install: function(t, e) {
    t.use(Sf), t.component("RouterLink", Lf), t.component("DsfrSelectMultiple", Tp), t.component("DsfrFacets", Jf), t.component("DsfrMenu", ip), t.component("DsfrMenuLink", dp), t.component("DsfrHeaderMenu", Np);
  },
  methods: Af
};
window && (window.DSFR = Vp);
export {
  Vp as default
};
//# sourceMappingURL=dsfr.es.js.map
