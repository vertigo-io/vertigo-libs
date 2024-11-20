import { defineComponent as M, ref as O, computed as w, onMounted as ne, watch as ae, onUnmounted as fe, Comment as nl, cloneVNode as ol, h as $t, openBlock as i, createElementBlock as f, normalizeClass as N, createElementVNode as d, withModifiers as U, createTextVNode as j, toDisplayString as b, unref as F, Fragment as K, renderList as W, createVNode as X, withKeys as Y, withCtx as G, createBlock as R, resolveDynamicComponent as oe, mergeProps as q, createCommentVNode as h, mergeModels as ke, useModel as se, withDirectives as ve, vModelCheckbox as Qe, renderSlot as A, inject as De, toRef as $e, provide as ge, resolveComponent as ie, vShow as ia, useCssVars as sa, nextTick as ua, normalizeStyle as de, normalizeProps as ue, guardReactiveProps as gt, useAttrs as rl, useSlots as bt, hasInjectionContext as il, reactive as sl, Teleport as ul, vModelSelect as ht, onBeforeUnmount as dl, Transition as cl } from "vue";
const yt = Symbol("accordions"), kt = Symbol("header"), Ge = Symbol("tabs"), be = () => {
  const t = O(), e = O(!1), a = O(!1), n = () => {
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
}, fl = "abcdefghijklmnopqrstuvwyz0123456789", Ft = fl.repeat(10), pl = () => {
  const t = Math.floor(Math.random() * Ft.length);
  return Ft[t];
}, vl = (t) => Array.from({ length: t }).map(pl).join(""), J = (t = "", e = "") => (t ? `${t}-` : "") + vl(5) + (e ? `-${e}` : ""), ml = { class: "fr-accordion" }, gl = ["aria-expanded", "aria-controls"], bl = ["id"], hl = /* @__PURE__ */ M({
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
    } = be(), s = O(), u = De(yt), { isActive: c, expand: p } = (u == null ? void 0 : u($e(() => e.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return ne(() => {
      c.value && r(!0);
    }), ae(c, (g, _) => {
      g !== _ && r(g);
    }), (g, _) => (i(), f("section", ml, [
      (i(), R(oe(g.titleTag), { class: "fr-accordion__title" }, {
        default: G(() => [
          d("button", {
            class: "fr-accordion__btn",
            "aria-expanded": F(c),
            "aria-controls": g.id,
            type: "button",
            onClick: _[0] || (_[0] = (C) => F(p)())
          }, [
            A(g.$slots, "title", {}, () => [
              j(b(g.title), 1)
            ])
          ], 8, gl)
        ]),
        _: 3
      })),
      d("div", {
        id: g.id,
        ref_key: "collapse",
        ref: a,
        class: N(["fr-collapse", {
          "fr-collapse--expanded": F(l),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": F(n)
        }]),
        onTransitionend: _[1] || (_[1] = (C) => F(o)(F(c)))
      }, [
        A(g.$slots, "default")
      ], 42, bl)
    ]));
  }
}), yl = { class: "fr-accordions-group" }, kl = /* @__PURE__ */ M({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = w({
      get: () => a.modelValue,
      set(s) {
        n("update:modelValue", s);
      }
    }), r = O(/* @__PURE__ */ new Map()), o = O(0);
    return ge(yt, (s) => {
      const u = o.value++;
      r.value.set(u, s.value);
      const c = w(() => u === l.value);
      ae(s, () => {
        r.value.set(u, s.value);
      });
      function p() {
        if (l.value === u) {
          l.value = -1;
          return;
        }
        l.value = u;
      }
      return fe(() => {
        r.value.delete(u);
      }), { isActive: c, expand: p };
    }), (s, u) => (i(), f("div", yl, [
      A(s.$slots, "default")
    ]));
  }
}), wl = ["id", "role"], _l = ["title", "aria-label"], Il = /* @__PURE__ */ M({
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
    return (o, s) => o.closed ? h("", !0) : (i(), f("div", {
      key: 0,
      id: o.id,
      class: N(["fr-alert", r.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? h("", !0) : (i(), R(oe(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: G(() => [
          j(b(o.title), 1)
        ]),
        _: 1
      })),
      A(o.$slots, "default", {}, () => [
        j(b(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: l
      }, null, 8, _l)) : h("", !0)
    ], 10, wl));
  }
}), Dl = /* @__PURE__ */ M({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(t) {
    return (e, a) => (i(), f("a", {
      class: N(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, b(e.label), 3));
  }
}), Bl = ["title"], da = /* @__PURE__ */ M({
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
      class: N(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      d("span", {
        class: N(e.ellipsis ? "fr-ellipsis" : "")
      }, b(e.label), 3)
    ], 10, Bl));
  }
}), Cl = ["aria-label"], xl = ["aria-expanded", "aria-controls"], Tl = ["id"], El = { class: "fr-breadcrumb__list" }, Sl = ["aria-current"], Ll = /* @__PURE__ */ M({
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
    } = be(), o = O(!1);
    return ae(o, (s, u) => {
      s !== u && l(s);
    }), (s, u) => {
      const c = ie("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        ve(d("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => o.value = !o.value)
        }, b(s.showBreadcrumbLabel), 9, xl), [
          [ia, !o.value]
        ]),
        d("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: N(["fr-collapse", {
            "fr-collapse--expanded": F(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(a)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => F(r)(o.value))
        }, [
          d("ol", El, [
            (i(!0), f(K, null, W(s.links, (p, g) => (i(), f("li", {
              key: g,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), R(c, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": g === s.links.length - 1 ? "page" : void 0
              }, {
                default: G(() => [
                  j(b(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : h("", !0),
              p.to ? h("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": g === s.links.length - 1 ? "page" : void 0
              }, b(p.text), 9, Sl))
            ]))), 128))
          ])
        ], 42, Tl)
      ], 8, Cl);
    };
  }
}), xe = /^[a-z0-9]+(-[a-z0-9]+)*$/, We = (t, e, a, n = "") => {
  const l = t.split(":");
  if (t.slice(0, 1) === "@") {
    if (l.length < 2 || l.length > 3)
      return null;
    n = l.shift().slice(1);
  }
  if (l.length > 3 || !l.length)
    return null;
  if (l.length > 1) {
    const s = l.pop(), u = l.pop(), c = {
      // Allow provider without '@': "provider:prefix:name"
      provider: l.length > 0 ? l[0] : n,
      prefix: u,
      name: s
    };
    return e && !Ve(c) ? null : c;
  }
  const r = l[0], o = r.split("-");
  if (o.length > 1) {
    const s = {
      provider: n,
      prefix: o.shift(),
      name: o.join("-")
    };
    return e && !Ve(s) ? null : s;
  }
  if (a && n === "") {
    const s = {
      provider: n,
      prefix: "",
      name: r
    };
    return e && !Ve(s, a) ? null : s;
  }
  return null;
}, Ve = (t, e) => t ? !!((t.provider === "" || t.provider.match(xe)) && (e && t.prefix === "" || t.prefix.match(xe)) && t.name.match(xe)) : !1, ca = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), Oe = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Ue = Object.freeze({
  ...ca,
  ...Oe
}), nt = Object.freeze({
  ...Ue,
  body: "",
  hidden: !1
});
function Al(t, e) {
  const a = {};
  !t.hFlip != !e.hFlip && (a.hFlip = !0), !t.vFlip != !e.vFlip && (a.vFlip = !0);
  const n = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return n && (a.rotate = n), a;
}
function Pt(t, e) {
  const a = Al(t, e);
  for (const n in nt)
    n in Oe ? n in t && !(n in a) && (a[n] = Oe[n]) : n in e ? a[n] = e[n] : n in t && (a[n] = t[n]);
  return a;
}
function Ml(t, e) {
  const a = t.icons, n = t.aliases || /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  function r(o) {
    if (a[o])
      return l[o] = [];
    if (!(o in l)) {
      l[o] = null;
      const s = n[o] && n[o].parent, u = s && r(s);
      u && (l[o] = [s].concat(u));
    }
    return l[o];
  }
  return Object.keys(a).concat(Object.keys(n)).forEach(r), l;
}
function $l(t, e, a) {
  const n = t.icons, l = t.aliases || /* @__PURE__ */ Object.create(null);
  let r = {};
  function o(s) {
    r = Pt(
      n[s] || l[s],
      r
    );
  }
  return o(e), a.forEach(o), Pt(t, r);
}
function fa(t, e) {
  const a = [];
  if (typeof t != "object" || typeof t.icons != "object")
    return a;
  t.not_found instanceof Array && t.not_found.forEach((l) => {
    e(l, null), a.push(l);
  });
  const n = Ml(t);
  for (const l in n) {
    const r = n[l];
    r && (e(l, $l(t, l, r)), a.push(l));
  }
  return a;
}
const Fl = {
  provider: "",
  aliases: {},
  not_found: {},
  ...ca
};
function tt(t, e) {
  for (const a in e)
    if (a in t && typeof t[a] != typeof e[a])
      return !1;
  return !0;
}
function pa(t) {
  if (typeof t != "object" || t === null)
    return null;
  const e = t;
  if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !tt(t, Fl))
    return null;
  const a = e.icons;
  for (const l in a) {
    const r = a[l];
    if (!l.match(xe) || typeof r.body != "string" || !tt(
      r,
      nt
    ))
      return null;
  }
  const n = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const l in n) {
    const r = n[l], o = r.parent;
    if (!l.match(xe) || typeof o != "string" || !a[o] && !n[o] || !tt(
      r,
      nt
    ))
      return null;
  }
  return e;
}
const Rt = /* @__PURE__ */ Object.create(null);
function Pl(t, e) {
  return {
    provider: t,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function we(t, e) {
  const a = Rt[t] || (Rt[t] = /* @__PURE__ */ Object.create(null));
  return a[e] || (a[e] = Pl(t, e));
}
function wt(t, e) {
  return pa(e) ? fa(e, (a, n) => {
    n ? t.icons[a] = n : t.missing.add(a);
  }) : [];
}
function Rl(t, e, a) {
  try {
    if (typeof a.body == "string")
      return t.icons[e] = { ...a }, !0;
  } catch {
  }
  return !1;
}
let Ee = !1;
function va(t) {
  return typeof t == "boolean" && (Ee = t), Ee;
}
function Nl(t) {
  const e = typeof t == "string" ? We(t, !0, Ee) : t;
  if (e) {
    const a = we(e.provider, e.prefix), n = e.name;
    return a.icons[n] || (a.missing.has(n) ? null : void 0);
  }
}
function Vl(t, e) {
  const a = We(t, !0, Ee);
  if (!a)
    return !1;
  const n = we(a.provider, a.prefix);
  return Rl(n, a.name, e);
}
function jl(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), Ee && !e && !t.prefix) {
    let l = !1;
    return pa(t) && (t.prefix = "", fa(t, (r, o) => {
      o && Vl(r, o) && (l = !0);
    })), l;
  }
  const a = t.prefix;
  if (!Ve({
    provider: e,
    prefix: a,
    name: "a"
  }))
    return !1;
  const n = we(e, a);
  return !!wt(n, t);
}
const ma = Object.freeze({
  width: null,
  height: null
}), ga = Object.freeze({
  // Dimensions
  ...ma,
  // Transformations
  ...Oe
}), Ol = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Hl = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Nt(t, e, a) {
  if (e === 1)
    return t;
  if (a = a || 100, typeof t == "number")
    return Math.ceil(t * e * a) / a;
  if (typeof t != "string")
    return t;
  const n = t.split(Ol);
  if (n === null || !n.length)
    return t;
  const l = [];
  let r = n.shift(), o = Hl.test(r);
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
function ql(t, e = "defs") {
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
function Kl(t, e) {
  return t ? "<defs>" + t + "</defs>" + e : e;
}
function zl(t, e, a) {
  const n = ql(t);
  return Kl(n.defs, e + n.content + a);
}
const Ql = (t) => t === "unset" || t === "undefined" || t === "none";
function Gl(t, e) {
  const a = {
    ...Ue,
    ...t
  }, n = {
    ...ga,
    ...e
  }, l = {
    left: a.left,
    top: a.top,
    width: a.width,
    height: a.height
  };
  let r = a.body;
  [a, n].forEach((P) => {
    const v = [], S = P.hFlip, x = P.vFlip;
    let L = P.rotate;
    S ? x ? L += 2 : (v.push(
      "translate(" + (l.width + l.left).toString() + " " + (0 - l.top).toString() + ")"
    ), v.push("scale(-1 1)"), l.top = l.left = 0) : x && (v.push(
      "translate(" + (0 - l.left).toString() + " " + (l.height + l.top).toString() + ")"
    ), v.push("scale(1 -1)"), l.top = l.left = 0);
    let D;
    switch (L < 0 && (L -= Math.floor(L / 4) * 4), L = L % 4, L) {
      case 1:
        D = l.height / 2 + l.top, v.unshift(
          "rotate(90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
      case 2:
        v.unshift(
          "rotate(180 " + (l.width / 2 + l.left).toString() + " " + (l.height / 2 + l.top).toString() + ")"
        );
        break;
      case 3:
        D = l.width / 2 + l.left, v.unshift(
          "rotate(-90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
    }
    L % 2 === 1 && (l.left !== l.top && (D = l.left, l.left = l.top, l.top = D), l.width !== l.height && (D = l.width, l.width = l.height, l.height = D)), v.length && (r = zl(
      r,
      '<g transform="' + v.join(" ") + '">',
      "</g>"
    ));
  });
  const o = n.width, s = n.height, u = l.width, c = l.height;
  let p, g;
  o === null ? (g = s === null ? "1em" : s === "auto" ? c : s, p = Nt(g, u / c)) : (p = o === "auto" ? u : o, g = s === null ? Nt(p, c / u) : s === "auto" ? c : s);
  const _ = {}, C = (P, v) => {
    Ql(v) || (_[P] = v.toString());
  };
  C("width", p), C("height", g);
  const B = [l.left, l.top, u, c];
  return _.viewBox = B.join(" "), {
    attributes: _,
    viewBox: B,
    body: r
  };
}
const Wl = /\sid="(\S+)"/g, Ul = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Xl = 0;
function Yl(t, e = Ul) {
  const a = [];
  let n;
  for (; n = Wl.exec(t); )
    a.push(n[1]);
  if (!a.length)
    return t;
  const l = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return a.forEach((r) => {
    const o = typeof e == "function" ? e(r) : e + (Xl++).toString(), s = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"),
      "$1" + o + l + "$3"
    );
  }), t = t.replace(new RegExp(l, "g"), ""), t;
}
const ot = /* @__PURE__ */ Object.create(null);
function Zl(t, e) {
  ot[t] = e;
}
function rt(t) {
  return ot[t] || ot[""];
}
function _t(t) {
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
const It = /* @__PURE__ */ Object.create(null), Pe = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], it = [];
for (; Pe.length > 0; )
  Pe.length === 1 || Math.random() > 0.5 ? it.push(Pe.shift()) : it.push(Pe.pop());
It[""] = _t({
  resources: ["https://api.iconify.design"].concat(it)
});
function Jl(t, e) {
  const a = _t(e);
  return a === null ? !1 : (It[t] = a, !0);
}
function Dt(t) {
  return It[t];
}
const en = () => {
  let t;
  try {
    if (t = fetch, typeof t == "function")
      return t;
  } catch {
  }
};
let Vt = en();
function tn(t, e) {
  const a = Dt(t);
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
function an(t) {
  return t === 404;
}
const ln = (t, e, a) => {
  const n = [], l = tn(t, e), r = "icons";
  let o = {
    type: r,
    provider: t,
    prefix: e,
    icons: []
  }, s = 0;
  return a.forEach((u, c) => {
    s += u.length + 1, s >= l && c > 0 && (n.push(o), o = {
      type: r,
      provider: t,
      prefix: e,
      icons: []
    }, s = u.length), o.icons.push(u);
  }), n.push(o), n;
};
function nn(t) {
  if (typeof t == "string") {
    const e = Dt(t);
    if (e)
      return e.path;
  }
  return "/";
}
const on = (t, e, a) => {
  if (!Vt) {
    a("abort", 424);
    return;
  }
  let n = nn(e.provider);
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
  Vt(t + n).then((r) => {
    const o = r.status;
    if (o !== 200) {
      setTimeout(() => {
        a(an(o) ? "abort" : "next", o);
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
}, rn = {
  prepare: ln,
  send: on
};
function sn(t) {
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
    const r = l.provider, o = l.prefix, s = l.name, u = a[r] || (a[r] = /* @__PURE__ */ Object.create(null)), c = u[o] || (u[o] = we(r, o));
    let p;
    s in c.icons ? p = e.loaded : o === "" || c.missing.has(s) ? p = e.missing : p = e.pending;
    const g = {
      provider: r,
      prefix: o,
      name: s
    };
    p.push(g);
  }), e;
}
function ba(t, e) {
  t.forEach((a) => {
    const n = a.loaderCallbacks;
    n && (a.loaderCallbacks = n.filter((l) => l.id !== e));
  });
}
function un(t) {
  t.pendingCallbacksFlag || (t.pendingCallbacksFlag = !0, setTimeout(() => {
    t.pendingCallbacksFlag = !1;
    const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
    if (!e.length)
      return;
    let a = !1;
    const n = t.provider, l = t.prefix;
    e.forEach((r) => {
      const o = r.icons, s = o.pending.length;
      o.pending = o.pending.filter((u) => {
        if (u.prefix !== l)
          return !0;
        const c = u.name;
        if (t.icons[c])
          o.loaded.push({
            provider: n,
            prefix: l,
            name: c
          });
        else if (t.missing.has(c))
          o.missing.push({
            provider: n,
            prefix: l,
            name: c
          });
        else
          return a = !0, !0;
        return !1;
      }), o.pending.length !== s && (a || ba([t], r.id), r.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        r.abort
      ));
    });
  }));
}
let dn = 0;
function cn(t, e, a) {
  const n = dn++, l = ba.bind(null, a, n);
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
function fn(t, e = !0, a = !1) {
  const n = [];
  return t.forEach((l) => {
    const r = typeof l == "string" ? We(l, e, a) : l;
    r && n.push(r);
  }), n;
}
var pn = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function vn(t, e, a, n) {
  const l = t.resources.length, r = t.random ? Math.floor(Math.random() * l) : t.index;
  let o;
  if (t.random) {
    let m = t.resources.slice(0);
    for (o = []; m.length > 1; ) {
      const T = Math.floor(Math.random() * m.length);
      o.push(m[T]), m = m.slice(0, T).concat(m.slice(T + 1));
    }
    o = o.concat(m);
  } else
    o = t.resources.slice(r).concat(t.resources.slice(0, r));
  const s = Date.now();
  let u = "pending", c = 0, p, g = null, _ = [], C = [];
  typeof n == "function" && C.push(n);
  function B() {
    g && (clearTimeout(g), g = null);
  }
  function P() {
    u === "pending" && (u = "aborted"), B(), _.forEach((m) => {
      m.status === "pending" && (m.status = "aborted");
    }), _ = [];
  }
  function v(m, T) {
    T && (C = []), typeof m == "function" && C.push(m);
  }
  function S() {
    return {
      startTime: s,
      payload: e,
      status: u,
      queriesSent: c,
      queriesPending: _.length,
      subscribe: v,
      abort: P
    };
  }
  function x() {
    u = "failed", C.forEach((m) => {
      m(void 0, p);
    });
  }
  function L() {
    _.forEach((m) => {
      m.status === "pending" && (m.status = "aborted");
    }), _ = [];
  }
  function D(m, T, y) {
    const Q = T !== "success";
    switch (_ = _.filter((k) => k !== m), u) {
      case "pending":
        break;
      case "failed":
        if (Q || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (T === "abort") {
      p = y, x();
      return;
    }
    if (Q) {
      p = y, _.length || (o.length ? I() : x());
      return;
    }
    if (B(), L(), !t.random) {
      const k = t.resources.indexOf(m.resource);
      k !== -1 && k !== t.index && (t.index = k);
    }
    u = "completed", C.forEach((k) => {
      k(y);
    });
  }
  function I() {
    if (u !== "pending")
      return;
    B();
    const m = o.shift();
    if (m === void 0) {
      if (_.length) {
        g = setTimeout(() => {
          B(), u === "pending" && (L(), x());
        }, t.timeout);
        return;
      }
      x();
      return;
    }
    const T = {
      status: "pending",
      resource: m,
      callback: (y, Q) => {
        D(T, y, Q);
      }
    };
    _.push(T), c++, g = setTimeout(I, t.rotate), a(m, e, T.callback);
  }
  return setTimeout(I), S;
}
function ha(t) {
  const e = {
    ...pn,
    ...t
  };
  let a = [];
  function n() {
    a = a.filter((o) => o().status === "pending");
  }
  function l(o, s, u) {
    const c = vn(
      e,
      o,
      s,
      (p, g) => {
        n(), u && u(p, g);
      }
    );
    return a.push(c), c;
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
function jt() {
}
const at = /* @__PURE__ */ Object.create(null);
function mn(t) {
  if (!at[t]) {
    const e = Dt(t);
    if (!e)
      return;
    const a = ha(e), n = {
      config: e,
      redundancy: a
    };
    at[t] = n;
  }
  return at[t];
}
function gn(t, e, a) {
  let n, l;
  if (typeof t == "string") {
    const r = rt(t);
    if (!r)
      return a(void 0, 424), jt;
    l = r.send;
    const o = mn(t);
    o && (n = o.redundancy);
  } else {
    const r = _t(t);
    if (r) {
      n = ha(r);
      const o = t.resources ? t.resources[0] : "", s = rt(o);
      s && (l = s.send);
    }
  }
  return !n || !l ? (a(void 0, 424), jt) : n.query(e, l, a)().abort;
}
const Ot = "iconify2", Se = "iconify", ya = Se + "-count", Ht = Se + "-version", ka = 36e5, bn = 168, hn = 50;
function st(t, e) {
  try {
    return t.getItem(e);
  } catch {
  }
}
function Bt(t, e, a) {
  try {
    return t.setItem(e, a), !0;
  } catch {
  }
}
function qt(t, e) {
  try {
    t.removeItem(e);
  } catch {
  }
}
function ut(t, e) {
  return Bt(t, ya, e.toString());
}
function dt(t) {
  return parseInt(st(t, ya)) || 0;
}
const Xe = {
  local: !0,
  session: !0
}, wa = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let Ct = !1;
function yn(t) {
  Ct = t;
}
let Re = typeof window > "u" ? {} : window;
function _a(t) {
  const e = t + "Storage";
  try {
    if (Re && Re[e] && typeof Re[e].length == "number")
      return Re[e];
  } catch {
  }
  Xe[t] = !1;
}
function Ia(t, e) {
  const a = _a(t);
  if (!a)
    return;
  const n = st(a, Ht);
  if (n !== Ot) {
    if (n) {
      const s = dt(a);
      for (let u = 0; u < s; u++)
        qt(a, Se + u.toString());
    }
    Bt(a, Ht, Ot), ut(a, 0);
    return;
  }
  const l = Math.floor(Date.now() / ka) - bn, r = (s) => {
    const u = Se + s.toString(), c = st(a, u);
    if (typeof c == "string") {
      try {
        const p = JSON.parse(c);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > l && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        e(p, s))
          return !0;
      } catch {
      }
      qt(a, u);
    }
  };
  let o = dt(a);
  for (let s = o - 1; s >= 0; s--)
    r(s) || (s === o - 1 ? (o--, ut(a, o)) : wa[t].add(s));
}
function Da() {
  if (!Ct) {
    yn(!0);
    for (const t in Xe)
      Ia(t, (e) => {
        const a = e.data, n = e.provider, l = a.prefix, r = we(
          n,
          l
        );
        if (!wt(r, a).length)
          return !1;
        const o = a.lastModified || -1;
        return r.lastModifiedCached = r.lastModifiedCached ? Math.min(r.lastModifiedCached, o) : o, !0;
      });
  }
}
function kn(t, e) {
  const a = t.lastModifiedCached;
  if (
    // Matches or newer
    a && a >= e
  )
    return a === e;
  if (t.lastModifiedCached = e, a)
    for (const n in Xe)
      Ia(n, (l) => {
        const r = l.data;
        return l.provider !== t.provider || r.prefix !== t.prefix || r.lastModified === e;
      });
  return !0;
}
function wn(t, e) {
  Ct || Da();
  function a(n) {
    let l;
    if (!Xe[n] || !(l = _a(n)))
      return;
    const r = wa[n];
    let o;
    if (r.size)
      r.delete(o = Array.from(r).shift());
    else if (o = dt(l), o >= hn || !ut(l, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / ka),
      provider: t.provider,
      data: e
    };
    return Bt(
      l,
      Se + o.toString(),
      JSON.stringify(s)
    );
  }
  e.lastModified && !kn(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && (e = Object.assign({}, e), delete e.not_found), a("local") || a("session"));
}
function Kt() {
}
function _n(t) {
  t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
    t.iconsLoaderFlag = !1, un(t);
  }));
}
function In(t, e) {
  t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
    t.iconsQueueFlag = !1;
    const { provider: a, prefix: n } = t, l = t.iconsToLoad;
    delete t.iconsToLoad;
    let r;
    !l || !(r = rt(a)) || r.prepare(a, n, l).forEach((o) => {
      gn(a, o, (s) => {
        if (typeof s != "object")
          o.icons.forEach((u) => {
            t.missing.add(u);
          });
        else
          try {
            const u = wt(
              t,
              s
            );
            if (!u.length)
              return;
            const c = t.pendingIcons;
            c && u.forEach((p) => {
              c.delete(p);
            }), wn(t, s);
          } catch (u) {
            console.error(u);
          }
        _n(t);
      });
    });
  }));
}
const Dn = (t, e) => {
  const a = fn(t, !0, va()), n = sn(a);
  if (!n.pending.length) {
    let u = !0;
    return e && setTimeout(() => {
      u && e(
        n.loaded,
        n.missing,
        n.pending,
        Kt
      );
    }), () => {
      u = !1;
    };
  }
  const l = /* @__PURE__ */ Object.create(null), r = [];
  let o, s;
  return n.pending.forEach((u) => {
    const { provider: c, prefix: p } = u;
    if (p === s && c === o)
      return;
    o = c, s = p, r.push(we(c, p));
    const g = l[c] || (l[c] = /* @__PURE__ */ Object.create(null));
    g[p] || (g[p] = []);
  }), n.pending.forEach((u) => {
    const { provider: c, prefix: p, name: g } = u, _ = we(c, p), C = _.pendingIcons || (_.pendingIcons = /* @__PURE__ */ new Set());
    C.has(g) || (C.add(g), l[c][p].push(g));
  }), r.forEach((u) => {
    const { provider: c, prefix: p } = u;
    l[c][p].length && In(u, l[c][p]);
  }), e ? cn(e, n, r) : Kt;
};
function Bn(t, e) {
  const a = {
    ...t
  };
  for (const n in e) {
    const l = e[n], r = typeof l;
    n in ma ? (l === null || l && (r === "string" || r === "number")) && (a[n] = l) : r === typeof a[n] && (a[n] = n === "rotate" ? l % 4 : l);
  }
  return a;
}
const Cn = /[\s,]+/;
function xn(t, e) {
  e.split(Cn).forEach((a) => {
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
function Tn(t, e = 0) {
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
function En(t, e) {
  let a = t.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in e)
    a += " " + n + '="' + e[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + a + ">" + t + "</svg>";
}
function Sn(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Ln(t) {
  return "data:image/svg+xml," + Sn(t);
}
function An(t) {
  return 'url("' + Ln(t) + '")';
}
const zt = {
  ...ga,
  inline: !1
}, Mn = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, $n = {
  display: "inline-block"
}, ct = {
  backgroundColor: "currentColor"
}, Ba = {
  backgroundColor: "transparent"
}, Qt = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Gt = {
  webkitMask: ct,
  mask: ct,
  background: Ba
};
for (const t in Gt) {
  const e = Gt[t];
  for (const a in Qt)
    e[t + a] = Qt[a];
}
const je = {};
["horizontal", "vertical"].forEach((t) => {
  const e = t.slice(0, 1) + "Flip";
  je[t + "-flip"] = e, je[t.slice(0, 1) + "-flip"] = e, je[t + "Flip"] = e;
});
function Wt(t) {
  return t + (t.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ut = (t, e) => {
  const a = Bn(zt, e), n = { ...Mn }, l = e.mode || "svg", r = {}, o = e.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
  for (let P in e) {
    const v = e[P];
    if (v !== void 0)
      switch (P) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          a[P] = v === !0 || v === "true" || v === 1;
          break;
        case "flip":
          typeof v == "string" && xn(a, v);
          break;
        case "color":
          r.color = v;
          break;
        case "rotate":
          typeof v == "string" ? a[P] = Tn(v) : typeof v == "number" && (a[P] = v);
          break;
        case "ariaHidden":
        case "aria-hidden":
          v !== !0 && v !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const S = je[P];
          S ? (v === !0 || v === "true" || v === 1) && (a[S] = !0) : zt[P] === void 0 && (n[P] = v);
        }
      }
  }
  const u = Gl(t, a), c = u.attributes;
  if (a.inline && (r.verticalAlign = "-0.125em"), l === "svg") {
    n.style = {
      ...r,
      ...s
    }, Object.assign(n, c);
    let P = 0, v = e.id;
    return typeof v == "string" && (v = v.replace(/-/g, "_")), n.innerHTML = Yl(u.body, v ? () => v + "ID" + P++ : "iconifyVue"), $t("svg", n);
  }
  const { body: p, width: g, height: _ } = t, C = l === "mask" || (l === "bg" ? !1 : p.indexOf("currentColor") !== -1), B = En(p, {
    ...c,
    width: g + "",
    height: _ + ""
  });
  return n.style = {
    ...r,
    "--svg": An(B),
    width: Wt(c.width),
    height: Wt(c.height),
    ...$n,
    ...C ? ct : Ba,
    ...s
  }, $t("span", n);
};
va(!0);
Zl("", rn);
if (typeof document < "u" && typeof window < "u") {
  Da();
  const t = window;
  if (t.IconifyPreload !== void 0) {
    const e = t.IconifyPreload, a = "Invalid IconifyPreload syntax.";
    typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach((n) => {
      try {
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !jl(n)) && console.error(a);
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
          Jl(a, l) || console.error(n);
        } catch {
          console.error(n);
        }
      }
  }
}
const Fn = {
  ...Ue,
  body: ""
}, Pn = M({
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
      if (typeof t != "string" || (a = We(t, !1, !0)) === null)
        return this.abortLoading(), null;
      const n = Nl(a);
      if (!n)
        return (!this._loadingIcon || this._loadingIcon.name !== t) && (this.abortLoading(), this._name = "", n !== null && (this._loadingIcon = {
          name: t,
          abort: Dn([a], () => {
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
      return Ut(Fn, t);
    let a = t;
    return e.classes && (a = {
      ...t,
      class: (typeof t.class == "string" ? t.class + " " : "") + e.classes.join(" ")
    }), Ut({
      ...Ue,
      ...e.data
    }, a);
  }
}), Rn = /* @__PURE__ */ M({
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
    sa((u) => ({
      "98d5b8bc": s.value
    }));
    const e = t, a = O(null), n = w(() => `${+e.scale * 1.2}rem`), l = w(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    ae(() => e.title, r);
    async function r() {
      var u, c, p, g;
      if (!((u = a.value) != null && u.$el))
        return;
      const _ = !!((c = a.value) == null ? void 0 : c.$el).querySelector("title"), C = document.createElement("title");
      if (!e.title) {
        C.remove();
        return;
      }
      C.innerHTML = e.title, await ua(), _ || (g = ((p = a.value) == null ? void 0 : p.$el).firstChild) == null || g.before(C);
    }
    ne(r);
    const o = w(() => {
      var u;
      return (u = e.name) != null && u.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), s = w(() => e.color ?? e.fill ?? "inherit");
    return (u, c) => (i(), R(F(Pn), {
      ref_key: "icon",
      ref: a,
      icon: o.value,
      style: de({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: N(["vicon", {
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
      ssr: u.ssr
    }, null, 8, ["icon", "style", "aria-label", "class", "flip", "ssr"]));
  }
}), re = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, le = /* @__PURE__ */ re(Rn, [["__scopeId", "data-v-33ecc4e5"]]), Nn = ["title", "disabled", "aria-disabled"], Vn = { key: 1 }, jn = /* @__PURE__ */ M({
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
    const a = t, n = w(() => ["sm", "small"].includes(a.size)), l = w(() => ["md", "medium"].includes(a.size)), r = w(() => ["lg", "large"].includes(a.size)), o = O(null);
    e({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const s = w(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), u = w(() => a.iconOnly ? 1.25 : 0.8325), c = w(
      () => typeof a.icon == "string" ? { scale: u.value, name: a.icon } : { scale: u.value, ...a.icon }
    );
    return (p, g) => (i(), f("button", {
      ref_key: "btn",
      ref: o,
      class: N(["fr-btn", {
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
      onClick: g[0] || (g[0] = (_) => p.onClick ? p.onClick(_) : () => {
      })
    }, [
      p.icon && !s.value ? (i(), R(le, ue(q({ key: 0 }, c.value)), null, 16)) : h("", !0),
      p.iconOnly ? h("", !0) : (i(), f("span", Vn, [
        j(b(p.label) + " ", 1),
        A(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Nn));
  }
}), Fe = /* @__PURE__ */ re(jn, [["__scopeId", "data-v-77b13897"]]), Ye = /* @__PURE__ */ M({
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
    const e = t, a = O(null), n = w(() => ["sm", "small"].includes(e.size)), l = w(() => ["md", "medium"].includes(e.size)), r = w(() => ["lg", "large"].includes(e.size)), o = w(() => ["always", "", !0].includes(e.inlineLayoutWhen)), s = w(() => ["sm", "small"].includes(e.inlineLayoutWhen)), u = w(() => ["md", "medium"].includes(e.inlineLayoutWhen)), c = w(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = w(() => e.align === "center"), g = w(() => e.align === "right"), _ = O("auto"), C = w(() => `--equisized-width: ${_.value};`), B = async () => {
      var P;
      let v = 0;
      await new Promise((S) => setTimeout(S, 100)), (P = a.value) == null || P.querySelectorAll(".fr-btn").forEach((S) => {
        const x = S, L = x.offsetWidth, D = window.getComputedStyle(x), I = +D.marginLeft.replace("px", ""), m = +D.marginRight.replace("px", "");
        x.style.width = "var(--equisized-width)";
        const T = L + I + m;
        T > v && (v = T);
      }), _.value = `${v}px`;
    };
    return ne(async () => {
      !a.value || !e.equisized || await B();
    }), (P, v) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: de(C.value),
      class: N(["fr-btns-group", {
        "fr-btns-group--equisized": P.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": l.value,
        "fr-btns-group--lg": r.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || u.value,
        "fr-btns-group--inline-lg": o.value || c.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": g.value,
        "fr-btns-group--icon-right": P.iconRight,
        "fr-btns-group--inline-reverse": P.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(K, null, W(P.buttons, ({ onClick: S, ...x }, L) => (i(), f("li", { key: L }, [
        X(Fe, q({ ref_for: !0 }, x, { onClick: S }), null, 16, ["onClick"])
      ]))), 128)),
      A(P.$slots, "default")
    ], 6));
  }
}), On = { class: "fr-callout__text" }, Hn = /* @__PURE__ */ M({
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
      class: N(["fr-callout", { [String(l.icon)]: a.value }])
    }, [
      l.icon && n.value ? (i(), R(le, ue(q({ key: 0 }, n.value)), null, 16)) : h("", !0),
      l.title ? (i(), R(oe(l.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: G(() => [
          j(b(l.title), 1)
        ]),
        _: 1
      })) : h("", !0),
      d("p", On, b(l.content), 1),
      l.button ? (i(), R(Fe, ue(q({ key: 2 }, l.button)), null, 16)) : h("", !0),
      A(l.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), qn = /* @__PURE__ */ re(Hn, [["__scopeId", "data-v-a34b4ad8"]]), ft = /* @__PURE__ */ M({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = w(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, r) => (i(), f("p", {
      class: N(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
    }, [
      l.icon && !a.value ? (i(), R(le, ue(q({ key: 0 }, n.value)), null, 16)) : h("", !0),
      A(l.$slots, "default")
    ], 2));
  }
}), Kn = { class: "fr-card__body" }, zn = { class: "fr-card__content" }, Qn = ["href"], Gn = { class: "fr-card__desc" }, Wn = {
  key: 0,
  class: "fr-card__start"
}, Un = {
  key: 1,
  class: "fr-card__end"
}, Xn = {
  key: 0,
  class: "fr-card__footer"
}, Yn = {
  key: 1,
  class: "fr-links-group"
}, Zn = ["href"], Jn = {
  key: 0,
  class: "fr-card__header"
}, eo = {
  key: 0,
  class: "fr-card__img"
}, to = ["src", "alt"], ao = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, lo = /* @__PURE__ */ M({
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
    const a = t, n = w(() => ["sm", "small"].includes(a.size)), l = w(() => ["lg", "large"].includes(a.size)), r = w(() => ["sm", "small"].includes(a.imgRatio)), o = w(() => ["lg", "large"].includes(a.imgRatio)), s = w(() => typeof a.link == "string" && a.link.startsWith("http")), u = O(null);
    return e({ goToTargetLink: () => {
      var c;
      ((c = u.value) == null ? void 0 : c.querySelector(".fr-card__link")).click();
    } }), (c, p) => {
      const g = ie("RouterLink");
      return i(), f("div", {
        class: N(["fr-card", {
          "fr-card--horizontal": c.horizontal,
          "fr-enlarge-link": !c.noArrow,
          "fr-card--sm": n.value,
          "fr-card--lg": l.value,
          "fr-card--horizontal-tier": r.value,
          "fr-card--horizontal-half": o.value,
          "fr-card--download": c.download,
          "fr-enlarge-button": c.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        d("div", Kn, [
          d("div", zn, [
            (i(), R(oe(c.titleTag), { class: "fr-card__title" }, {
              default: G(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: c.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, b(c.title), 9, Qn)) : c.link ? (i(), R(g, {
                  key: 1,
                  to: c.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (_) => _.stopPropagation())
                }, {
                  default: G(() => [
                    j(b(c.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(K, { key: 2 }, [
                  j(b(c.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            d("p", Gn, b(c.description), 1),
            c.$slots["start-details"] || c.detail ? (i(), f("div", Wn, [
              A(c.$slots, "start-details"),
              c.detail ? (i(), R(ft, {
                key: 0,
                icon: c.detailIcon
              }, {
                default: G(() => [
                  j(b(c.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : h("", !0)
            ])) : h("", !0),
            c.$slots["end-details"] || c.endDetail ? (i(), f("div", Un, [
              A(c.$slots, "end-details"),
              c.endDetail ? (i(), R(ft, {
                key: 0,
                icon: c.endDetailIcon
              }, {
                default: G(() => [
                  j(b(c.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : h("", !0)
            ])) : h("", !0)
          ]),
          c.buttons.length || c.linksGroup.length ? (i(), f("div", Xn, [
            c.buttons.length ? (i(), R(Ye, {
              key: 0,
              buttons: c.buttons,
              "inline-layout-when": "always",
              size: c.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : h("", !0),
            c.linksGroup.length ? (i(), f("ul", Yn, [
              (i(!0), f(K, null, W(c.linksGroup, (_, C) => (i(), f("li", {
                key: `card-link-${C}`
              }, [
                _.to ? (i(), R(g, {
                  key: 0,
                  to: _.to
                }, {
                  default: G(() => [
                    j(b(_.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: _.link || _.href,
                  class: N(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": l.value
                  }])
                }, b(_.label), 11, Zn))
              ]))), 128))
            ])) : h("", !0)
          ])) : h("", !0)
        ]),
        c.imgSrc || c.badges.length ? (i(), f("div", Jn, [
          c.imgSrc ? (i(), f("div", eo, [
            d("img", {
              src: c.imgSrc,
              class: "fr-responsive-img",
              alt: c.altImg,
              "data-testid": "card-img"
            }, null, 8, to)
          ])) : h("", !0),
          c.badges.length ? (i(), f("ul", ao, [
            (i(!0), f(K, null, W(c.badges, (_, C) => (i(), f("li", { key: C }, [
              X(da, q({ ref_for: !0 }, _), null, 16)
            ]))), 128))
          ])) : h("", !0)
        ])) : h("", !0)
      ], 2);
    };
  }
}), no = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], oo = ["for"], ro = {
  key: 0,
  class: "required"
}, io = {
  key: 0,
  class: "fr-hint-text"
}, so = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, xt = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ ke({
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
    const e = t, a = w(() => e.errorMessage || e.validMessage), n = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = se(t, "modelValue");
    return (r, o) => (i(), f("div", {
      class: N(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      d("div", {
        class: N(["fr-checkbox-group", {
          "fr-checkbox-group--error": r.errorMessage,
          "fr-checkbox-group--valid": !r.errorMessage && r.validMessage,
          "fr-checkbox-group--sm": r.small
        }])
      }, [
        ve(d("input", q({
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
        }), null, 16, no), [
          [Qe, l.value]
        ]),
        d("label", {
          for: r.id,
          class: "fr-label"
        }, [
          A(r.$slots, "label", {}, () => [
            j(b(r.label) + " ", 1),
            A(r.$slots, "required-tip", {}, () => [
              r.required ? (i(), f("span", ro, " *")) : h("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", io, b(r.hint), 1)) : h("", !0)
        ], 8, oo),
        a.value ? (i(), f("div", so, [
          d("p", {
            class: N(["fr-message--info flex items-center", n.value])
          }, b(a.value), 3)
        ])) : h("", !0)
      ], 2)
    ], 2));
  }
}), uo = { class: "fr-form-group" }, co = ["disabled", "aria-labelledby", "aria-invalid", "role"], fo = ["id"], po = {
  key: 0,
  class: "required"
}, vo = ["id"], mo = /* @__PURE__ */ M({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ ke({
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
    const e = t, a = w(() => e.errorMessage || e.validMessage), n = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = w(() => a.value ? `${e.titleId} messages-${e.titleId}` : e.titleId), r = se(t, "modelValue");
    return (o, s) => (i(), f("div", uo, [
      d("fieldset", {
        class: N(["fr-fieldset", {
          "fr-fieldset--error": o.errorMessage,
          "fr-fieldset--valid": !o.errorMessage && o.validMessage
        }]),
        disabled: o.disabled,
        "aria-labelledby": l.value,
        "aria-invalid": o.ariaInvalid,
        role: o.errorMessage || o.validMessage ? "group" : void 0
      }, [
        d("legend", {
          id: o.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          A(o.$slots, "legend", {}, () => [
            j(b(o.legend) + " ", 1),
            A(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", po, " *")) : h("", !0)
            ])
          ])
        ], 8, fo),
        A(o.$slots, "default", {}, () => [
          (i(!0), f(K, null, W(o.options, (u) => (i(), R(xt, {
            id: u.id,
            key: u.id || u.name,
            modelValue: r.value,
            "onUpdate:modelValue": s[0] || (s[0] = (c) => r.value = c),
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
        a.value ? (i(), f("div", {
          key: 0,
          id: `messages-${o.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          d("p", {
            class: N(["fr-message--info flex items-center", n.value])
          }, [
            d("span", null, b(a.value), 1)
          ], 2)
        ], 8, vo)) : h("", !0)
      ], 10, co)
    ]));
  }
}), go = { class: "fr-consent-banner__content" }, bo = { class: "fr-text--sm" }, ho = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, yo = /* @__PURE__ */ M({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = w(() => typeof e.url == "string" && e.url.startsWith("http")), n = w(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = w(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (r, o) => (i(), f(K, null, [
      d("div", go, [
        d("p", bo, [
          A(r.$slots, "default", {}, () => [
            o[4] || (o[4] = j(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), R(oe(n.value), q(l.value, { "data-testid": "link" }), {
              default: G(() => o[3] || (o[3] = [
                j(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = j(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      d("ul", ho, [
        d("li", null, [
          d("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = U((s) => r.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        d("li", null, [
          d("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = U((s) => r.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        d("li", null, [
          d("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = U((s) => r.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), ko = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, wo = { class: "fr-pagination__list" }, _o = ["href", "title", "disabled", "aria-disabled"], Io = ["href", "title", "disabled", "aria-disabled"], Do = ["href", "title", "aria-current", "onClick"], Bo = { key: 0 }, Co = { key: 1 }, xo = ["href", "title", "disabled", "aria-disabled"], To = ["href", "title", "disabled", "aria-disabled"], Eo = /* @__PURE__ */ M({
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
    const a = t, n = e, l = w(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), r = w(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), o = w(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, r.value + 1) : a.pages), s = (B) => n("update:current-page", B), u = (B) => s(B), c = () => u(0), p = () => u(Math.max(0, a.currentPage - 1)), g = () => u(Math.min(a.pages.length - 1, a.currentPage + 1)), _ = () => u(a.pages.length - 1), C = (B) => a.pages.indexOf(B) === a.currentPage;
    return (B, P) => {
      var v, S, x, L;
      return i(), f("nav", ko, [
        d("ul", wo, [
          d("li", null, [
            d("a", {
              href: (v = B.pages[0]) == null ? void 0 : v.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: B.firstPageTitle,
              disabled: B.currentPage === 0 ? !0 : void 0,
              "aria-disabled": B.currentPage === 0 ? !0 : void 0,
              onClick: P[0] || (P[0] = U((D) => c(), ["prevent"]))
            }, null, 8, _o)
          ]),
          d("li", null, [
            d("a", {
              href: (S = B.pages[Math.max(B.currentPage - 1, 0)]) == null ? void 0 : S.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: B.prevPageTitle,
              disabled: B.currentPage === 0 ? !0 : void 0,
              "aria-disabled": B.currentPage === 0 ? !0 : void 0,
              onClick: P[1] || (P[1] = U((D) => p(), ["prevent"]))
            }, b(B.prevPageTitle), 9, Io)
          ]),
          (i(!0), f(K, null, W(o.value, (D, I) => (i(), f("li", { key: I }, [
            d("a", {
              href: D == null ? void 0 : D.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: D.title,
              "aria-current": C(D) ? "page" : void 0,
              onClick: U((m) => u(B.pages.indexOf(D)), ["prevent"])
            }, [
              o.value.indexOf(D) === 0 && l.value > 0 ? (i(), f("span", Bo, "...")) : h("", !0),
              j(" " + b(D.label) + " ", 1),
              o.value.indexOf(D) === o.value.length - 1 && r.value < B.pages.length - 1 ? (i(), f("span", Co, "...")) : h("", !0)
            ], 8, Do)
          ]))), 128)),
          d("li", null, [
            d("a", {
              href: (x = B.pages[Math.min(B.currentPage + 1, B.pages.length - 1)]) == null ? void 0 : x.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: B.nextPageTitle,
              disabled: B.currentPage === B.pages.length - 1 ? !0 : void 0,
              "aria-disabled": B.currentPage === B.pages.length - 1 ? !0 : void 0,
              onClick: P[2] || (P[2] = U((D) => g(), ["prevent"]))
            }, b(B.nextPageTitle), 9, xo)
          ]),
          d("li", null, [
            d("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (L = B.pages.at(-1)) == null ? void 0 : L.href,
              title: B.lastPageTitle,
              disabled: B.currentPage === B.pages.length - 1 ? !0 : void 0,
              "aria-disabled": B.currentPage === B.pages.length - 1 ? !0 : void 0,
              onClick: P[3] || (P[3] = U((D) => _(), ["prevent"]))
            }, null, 8, To)
          ])
        ])
      ]);
    };
  }
}), Tt = /* @__PURE__ */ re(Eo, [["__scopeId", "data-v-4dfa8248"]]), So = { class: "fr-table" }, Lo = { class: "fr-table__wrapper" }, Ao = { class: "fr-table__container" }, Mo = { class: "fr-table__content" }, $o = ["id"], Fo = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Po = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ro = ["id", "checked"], No = ["for"], Vo = ["tabindex", "onClick", "onKeydown"], jo = { key: 0 }, Oo = { key: 1 }, Ho = ["data-row-key"], qo = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Ko = { class: "fr-checkbox-group fr-checkbox-group--sm" }, zo = ["id", "value"], Qo = ["for"], Go = ["onKeydown"], Wo = { class: "flex gap-2 items-center" }, Uo = ["selected"], Xo = ["value", "selected"], Yo = { class: "flex ml-1" }, Zo = { class: "self-center" }, Jo = /* @__PURE__ */ M({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ ke({
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
  emits: /* @__PURE__ */ ke(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(t, { emit: e }) {
    const a = t, n = e, l = se(t, "selection"), r = se(t, "rowsPerPage"), o = se(t, "currentPage"), s = w(() => Math.ceil(a.rows.length / r.value)), u = w(() => a.pages ?? Array.from({ length: s.value }).map((m, T) => ({ label: `${T + 1}`, title: `Page ${T + 1}`, href: `#${T + 1}` }))), c = w(() => o.value * r.value), p = w(() => (o.value + 1) * r.value);
    function g(m, T) {
      const y = a.sorted;
      return (m[y] ?? m) < (T[y] ?? T) ? -1 : (m[y] ?? m) > (T[y] ?? T) ? 1 : 0;
    }
    const _ = se(t, "sortedBy"), C = se(t, "sortedDesc");
    function B(m) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(m))) {
        if (_.value === m) {
          if (C.value) {
            _.value = void 0, C.value = !1;
            return;
          }
          C.value = !0;
          return;
        }
        C.value = !1, _.value = m;
      }
    }
    const P = w(() => {
      const m = _.value ? a.rows.slice().sort(a.sortFn ?? g) : a.rows.slice();
      return C.value && m.reverse(), m;
    }), v = w(() => {
      const m = a.headersRow.map((y) => typeof y != "object" ? y : y.key), T = P.value.map((y) => Array.isArray(y) ? y : m.map((Q) => typeof y != "object" ? y : y[Q] ?? y));
      return a.pagination ? T.slice(c.value, p.value) : T;
    });
    function S(m) {
      if (m) {
        const T = a.headersRow.findIndex((y) => y.key ?? y);
        l.value = v.value.map((y) => y[T]);
      }
      l.value.length = 0;
    }
    const x = O(!1);
    function L() {
      x.value = l.value.length === v.value.length;
    }
    function D() {
      n("update:current-page", 0), x.value = !1, l.value.length = 0;
    }
    function I(m) {
      navigator.clipboard.writeText(m);
    }
    return (m, T) => (i(), f("div", So, [
      d("div", Lo, [
        d("div", Ao, [
          d("div", Mo, [
            d("table", { id: m.id }, [
              d("caption", null, b(m.title), 1),
              d("thead", null, [
                d("tr", null, [
                  m.selectableRows ? (i(), f("th", Fo, [
                    d("div", Po, [
                      d("input", {
                        id: `table-select--${m.id}-all`,
                        checked: x.value,
                        type: "checkbox",
                        onInput: T[0] || (T[0] = (y) => S(y.target.checked))
                      }, null, 40, Ro),
                      d("label", {
                        class: "fr-label",
                        for: `table-select--${m.id}-all`
                      }, " Sélectionner tout ", 8, No)
                    ])
                  ])) : h("", !0),
                  (i(!0), f(K, null, W(m.headersRow, (y, Q) => (i(), f("th", q({
                    key: typeof y == "object" ? y.key : y,
                    scope: "col",
                    ref_for: !0
                  }, typeof y == "object" && y.headerAttrs, {
                    tabindex: m.sortableRows ? 0 : void 0,
                    onClick: (k) => B(y.key ?? (Array.isArray(m.rows[0]) ? Q : y)),
                    onKeydown: [
                      Y((k) => B(y.key ?? y), ["enter"]),
                      Y((k) => B(y.key ?? y), ["space"])
                    ]
                  }), [
                    d("div", {
                      class: N({ "sortable-header": m.sortableRows === !0 || Array.isArray(m.sortableRows) && m.sortableRows.includes(y.key ?? y) })
                    }, [
                      A(m.$slots, "header", q({ ref_for: !0 }, typeof y == "object" ? y : { key: y, label: y }), () => [
                        j(b(typeof y == "object" ? y.label : y), 1)
                      ], !0),
                      _.value !== (y.key ?? y) && (m.sortableRows === !0 || Array.isArray(m.sortableRows) && m.sortableRows.includes(y.key ?? y)) ? (i(), f("span", jo, [
                        X(le, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : _.value === (y.key ?? y) ? (i(), f("span", Oo, [
                        X(le, {
                          name: C.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : h("", !0)
                    ], 2)
                  ], 16, Vo))), 128))
                ])
              ]),
              d("tbody", null, [
                (i(!0), f(K, null, W(v.value, (y, Q) => (i(), f("tr", {
                  key: `row-${Q}`,
                  "data-row-key": Q + 1
                }, [
                  m.selectableRows ? (i(), f("th", qo, [
                    d("div", Ko, [
                      ve(d("input", {
                        id: `row-select-${m.id}-${Q}`,
                        "onUpdate:modelValue": T[1] || (T[1] = (k) => l.value = k),
                        value: m.rows[Q][m.rowKey] ?? `row-${Q}`,
                        type: "checkbox",
                        onChange: T[2] || (T[2] = (k) => L())
                      }, null, 40, zo), [
                        [Qe, l.value]
                      ]),
                      d("label", {
                        class: "fr-label",
                        for: `row-select-${m.id}-${Q}`
                      }, " Sélectionner la ligne " + b(Q + 1), 9, Qo)
                    ])
                  ])) : h("", !0),
                  (i(!0), f(K, null, W(y, (k, E) => (i(), f("td", {
                    key: typeof k == "object" ? k[m.rowKey] : k,
                    tabindex: "0",
                    onKeydown: [
                      Y(U((H) => I(typeof k == "object" ? k[m.rowKey] : k), ["ctrl"]), ["c"]),
                      Y(U((H) => I(typeof k == "object" ? k[m.rowKey] : k), ["meta"]), ["c"])
                    ]
                  }, [
                    A(m.$slots, "cell", q({ ref_for: !0 }, {
                      colKey: typeof m.headersRow[E] == "object" ? m.headersRow[E].key : m.headersRow[E],
                      cell: k
                    }), () => [
                      j(b(typeof k == "object" ? k[m.rowKey] : k), 1)
                    ], !0)
                  ], 40, Go))), 128))
                ], 8, Ho))), 128))
              ])
            ], 8, $o)
          ])
        ])
      ]),
      d("div", {
        class: N(m.bottomActionBarClass)
      }, [
        A(m.$slots, "pagination", {}, () => [
          m.pagination && !m.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: N(["flex justify-between items-center", m.paginationWrapperClass])
          }, [
            d("div", Wo, [
              T[6] || (T[6] = d("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              ve(d("select", {
                id: "pagination-options",
                "onUpdate:modelValue": T[3] || (T[3] = (y) => r.value = y),
                class: "fr-select",
                onChange: T[4] || (T[4] = (y) => D())
              }, [
                d("option", {
                  value: "",
                  selected: !m.paginationOptions.includes(r.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Uo),
                (i(!0), f(K, null, W(m.paginationOptions, (y, Q) => (i(), f("option", {
                  key: Q,
                  value: y,
                  selected: +y === r.value
                }, b(y), 9, Xo))), 128))
              ], 544), [
                [ht, r.value]
              ])
            ]),
            d("div", Yo, [
              d("span", Zo, "Page " + b(o.value + 1) + " sur " + b(s.value), 1)
            ]),
            X(Tt, {
              "current-page": o.value,
              "onUpdate:currentPage": T[5] || (T[5] = (y) => o.value = y),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : h("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), er = /* @__PURE__ */ re(Jo, [["__scopeId", "data-v-1d55e1f1"]]), tr = "data:image/png;base64,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", ar = { class: "fr-container flex" }, lr = { class: "half" }, nr = { class: "fr-h1" }, or = { class: "flex fr-my-md-3w" }, rr = { class: "fr-h6" }, ir = /* @__PURE__ */ M({
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
      return i(), f("div", ar, [
        d("div", lr, [
          d("h1", nr, b(e.title), 1),
          d("span", or, b(e.subtitle), 1),
          d("p", rr, b(e.description), 1),
          d("p", null, b(e.help), 1),
          (n = e.buttons) != null && n.length ? (i(), R(Ye, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : h("", !0),
          A(e.$slots, "default", {}, void 0, !0)
        ]),
        a[0] || (a[0] = d("div", { class: "half self-center text-center" }, [
          d("img", {
            class: "error-img",
            src: tr
          })
        ], -1))
      ]);
    };
  }
}), sr = /* @__PURE__ */ re(ir, [["__scopeId", "data-v-0f6cf5b4"]]), ur = { class: "fr-fieldset" }, dr = ["id"], cr = {
  key: 1,
  class: "fr-fieldset__element"
}, fr = { class: "fr-fieldset__element" }, pr = /* @__PURE__ */ M({
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
      return i(), f("fieldset", ur, [
        e.legend || (l = (n = e.$slots).legend) != null && l.call(n).length ? (i(), f("legend", {
          key: 0,
          id: e.legendId,
          class: N(["fr-fieldset__legend", e.legendClass])
        }, [
          j(b(e.legend) + " ", 1),
          A(e.$slots, "legend")
        ], 10, dr)) : h("", !0),
        e.hint || (o = (r = e.$slots).hint) != null && o.call(r).length ? (i(), f("div", cr, [
          d("span", {
            class: N(["fr-hint-text", e.hintClass])
          }, [
            j(b(e.hint) + " ", 1),
            A(e.$slots, "hint")
          ], 2)
        ])) : h("", !0),
        d("div", fr, [
          A(e.$slots, "default")
        ])
      ]);
    };
  }
}), vr = ["href", "download"], mr = { class: "fr-link__detail" }, Ca = /* @__PURE__ */ M({
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
      j(b(e.title) + " ", 1),
      d("span", mr, b(e.format) + " – " + b(e.size), 1)
    ], 8, vr));
  }
}), gr = { class: "fr-downloads-group fr-downloads-group--bordered" }, br = {
  key: 0,
  class: "fr-downloads-group__title"
}, hr = /* @__PURE__ */ M({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", gr, [
      e.title ? (i(), f("h4", br, b(e.title), 1)) : h("", !0),
      d("ul", null, [
        (i(!0), f(K, null, W(e.files, (n, l) => (i(), f("li", { key: l }, [
          X(Ca, {
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
}), yr = ["for"], kr = {
  key: 0,
  class: "required"
}, wr = {
  key: 1,
  class: "fr-hint-text"
}, _r = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Ir = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Dr = ["id"], Br = /* @__PURE__ */ M({
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
      var s, u;
      n("update:modelValue", (s = o.target) == null ? void 0 : s.value), n("change", (u = o.target) == null ? void 0 : u.files);
    }, r = w(() => Array.isArray(a.accept) ? a.accept.join(",") : a.accept);
    return (o, s) => (i(), f("div", {
      class: N(["fr-upload-group", {
        "fr-upload-group--error": o.error,
        "fr-upload-group--valid": o.validMessage,
        "fr-upload-group--disabled": o.disabled
      }])
    }, [
      d("label", {
        class: "fr-label",
        for: o.id
      }, [
        j(b(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", kr, " *")) : h("", !0),
        o.hint ? (i(), f("span", wr, b(o.hint), 1)) : h("", !0)
      ], 8, yr),
      d("input", q({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: r.value,
        onChange: s[0] || (s[0] = (u) => l(u))
      }), null, 16, _r),
      o.error || o.validMessage ? (i(), f("div", Ir, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, b(o.error ?? o.validMessage), 9, Dr)) : h("", !0)
      ])) : h("", !0)
    ], 2));
  }
}), Cr = { class: "fr-follow__newsletter" }, xr = { class: "fr-h5 fr-follow__title" }, Tr = { class: "fr-text--sm fr-follow__desc" }, Er = { key: 0 }, Sr = ["title"], Lr = { key: 1 }, Ar = { action: "" }, Mr = {
  class: "fr-label",
  for: "newsletter-email"
}, $r = { class: "fr-input-wrap fr-input-wrap--addon" }, Fr = ["title", "placeholder", "value"], Pr = ["title"], Rr = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Nr = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Vr = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, xa = /* @__PURE__ */ M({
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
    return (l, r) => (i(), f("div", Cr, [
      d("div", null, [
        d("h3", xr, b(l.title), 1),
        d("p", Tr, b(l.description), 1)
      ]),
      l.onlyCallout ? (i(), f("div", Er, [
        d("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: r[0] || (r[0] = (o) => l.buttonAction ? l.buttonAction(o) : () => {
          })
        }, b(l.buttonText), 9, Sr)
      ])) : (i(), f("div", Lr, [
        d("form", Ar, [
          d("label", Mr, b(l.labelEmail), 1),
          d("div", $r, [
            d("input", {
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
            }, null, 40, Fr),
            d("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, b(l.buttonText), 9, Pr)
          ]),
          l.error ? (i(), f("div", Rr, [
            d("p", Nr, b(l.error), 1)
          ])) : h("", !0),
          d("p", Vr, b(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), jr = { class: "fr-follow__social" }, Or = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Hr = ["title", "href"], Ta = /* @__PURE__ */ M({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", jr, [
      (i(), R(oe(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: G(() => a[0] || (a[0] = [
          j(" Suivez-nous "),
          d("br", null, null, -1),
          j(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (i(), f("ul", Or, [
        (i(!0), f(K, null, W(e.networks, (n, l) => (i(), f("li", { key: l }, [
          d("a", {
            class: N(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, b(n.name), 11, Hr)
        ]))), 128))
      ])) : h("", !0)
    ]));
  }
}), qr = { class: "fr-follow" }, Kr = { class: "fr-container" }, zr = { class: "fr-grid-row" }, Qr = /* @__PURE__ */ M({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = w(() => e.networks && e.networks.length), n = w(() => typeof e.newsletterData == "object");
    return (l, r) => (i(), f("div", qr, [
      d("div", Kr, [
        d("div", zr, [
          A(l.$slots, "default", {}, () => [
            l.newsletterData ? (i(), f("div", {
              key: 0,
              class: N(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              X(xa, ue(gt(l.newsletterData)), null, 16)
            ], 2)) : h("", !0),
            a.value ? (i(), f("div", {
              key: 1,
              class: N(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              X(Ta, { networks: l.networks }, null, 8, ["networks"])
            ], 2)) : h("", !0)
          ])
        ])
      ])
    ]));
  }
}), Xt = 1, Ea = /* @__PURE__ */ M({
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
    }), s = w(() => o.value ? { to: o.value } : { href: r.value }), u = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), c = w(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Xt, ...e.iconAttrs ?? {} } : { scale: Xt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, g) => (i(), R(oe(l.value), q({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, s.value, {
      target: p.target,
      onClick: U(p.onClick, ["stop"])
    }), {
      default: G(() => {
        var _, C;
        return [
          !u.value && (p.icon || (_ = p.iconAttrs) != null && _.name) && !p.iconRight ? (i(), R(le, q({
            key: 0,
            class: "fr-mr-1w"
          }, c.value), null, 16)) : h("", !0),
          j(" " + b(p.label) + " ", 1),
          !u.value && (p.icon || (C = p.iconAttrs) != null && C.name) && p.iconRight ? (i(), R(le, q({
            key: 1,
            class: "fr-ml-1w"
          }, c.value), null, 16)) : h("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Gr = { class: "fr-footer__partners" }, Wr = {
  key: 0,
  class: "fr-footer__partners-title"
}, Ur = { class: "fr-footer__partners-logos" }, Xr = {
  key: 0,
  class: "fr-footer__partners-main"
}, Yr = ["href"], Zr = ["src", "alt"], Jr = { class: "fr-footer__partners-sub" }, ei = ["href"], ti = ["src", "alt"], Sa = /* @__PURE__ */ M({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Gr, [
      e.title ? (i(), f("h4", Wr, b(e.title), 1)) : h("", !0),
      d("div", Ur, [
        e.mainPartner ? (i(), f("div", Xr, [
          d("a", {
            class: "fr-footer__partners-link",
            href: e.mainPartner.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, [
            d("img", {
              class: "fr-footer__logo",
              src: e.mainPartner.logo,
              alt: e.mainPartner.name
            }, null, 8, Zr)
          ], 8, Yr)
        ])) : h("", !0),
        d("div", Jr, [
          d("ul", null, [
            (i(!0), f(K, null, W(e.subPartners, (n, l) => (i(), f("li", { key: l }, [
              d("a", {
                class: "fr-footer__partners-link",
                href: n.href,
                target: "_blank",
                rel: "noopener noreferrer"
              }, [
                d("img", {
                  class: "fr-footer__logo",
                  src: n.logo,
                  alt: n.name
                }, null, 8, ti)
              ], 8, ei)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), ai = ["innerHTML"], Le = /* @__PURE__ */ M({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(t) {
    const e = t, a = w(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (n, l) => (i(), f("p", {
      class: N(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: a.value
    }, null, 10, ai));
  }
}), li = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, ni = {
  key: 0,
  class: "fr-footer__top"
}, oi = { class: "fr-container" }, ri = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, ii = { class: "fr-container" }, si = { class: "fr-footer__body" }, ui = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, di = ["href"], ci = ["src", "alt"], fi = ["src", "alt"], pi = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, vi = { class: "fr-footer__content" }, mi = { class: "fr-footer__content-desc" }, gi = { class: "fr-footer__content-list" }, bi = ["href", "title"], hi = { class: "fr-footer__bottom" }, yi = { class: "fr-footer__bottom-list" }, ki = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, wi = /* @__PURE__ */ M({
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
    ]), n = bt(), l = w(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n).length;
    }), r = w(() => {
      const p = e.licenceTo || e.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = w(() => {
      const { to: p, href: g, ..._ } = e.licenceLinkProps ?? {};
      return _;
    }), s = w(() => r.value ? "" : e.licenceTo), u = w(() => r.value ? e.licenceTo : ""), c = w(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (p, g) => {
      const _ = ie("RouterLink");
      return i(), f("footer", li, [
        l.value ? (i(), f("div", ni, [
          d("div", oi, [
            d("div", ri, [
              A(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : h("", !0),
        d("div", ii, [
          d("div", si, [
            p.operatorImgSrc ? (i(), f("div", ui, [
              X(Le, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              c.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                d("img", {
                  class: "fr-footer__logo",
                  style: de(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, ci)
              ], 8, di)) : (i(), R(_, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: G(() => [
                  d("img", {
                    class: "fr-footer__logo",
                    style: de(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, fi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", pi, [
              X(_, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: G(() => [
                  X(Le, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            d("div", vi, [
              d("p", mi, [
                A(p.$slots, "description", {}, () => [
                  j(b(p.descText), 1)
                ], !0)
              ]),
              d("ul", gi, [
                (i(!0), f(K, null, W(p.ecosystemLinks, ({ href: C, label: B, title: P, ...v }, S) => (i(), f("li", {
                  key: S,
                  class: "fr-footer__content-item"
                }, [
                  d("a", q({
                    class: "fr-footer__content-link",
                    href: C,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: P,
                    ref_for: !0
                  }, v), b(B), 17, bi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), R(Sa, ue(q({ key: 0 }, p.partners)), null, 16)) : h("", !0),
          d("div", hi, [
            d("ul", yi, [
              (i(!0), f(K, null, W(a.value, (C, B) => (i(), f("li", {
                key: B,
                class: "fr-footer__bottom-item"
              }, [
                X(Ea, q({ ref_for: !0 }, C), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", ki, [
              d("p", null, [
                j(b(p.licenceText) + " ", 1),
                (i(), R(oe(r.value ? "a" : "RouterLink"), q({
                  class: "fr-link-licence no-content-after",
                  to: r.value ? void 0 : s.value,
                  href: r.value ? u.value : void 0,
                  target: r.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: G(() => [
                    j(b(p.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target"]))
              ])
            ])) : h("", !0)
          ])
        ])
      ]);
    };
  }
}), _i = /* @__PURE__ */ re(wi, [["__scopeId", "data-v-4d6f52aa"]]), Ii = { class: "fr-footer__top-cat" }, Di = { class: "fr-footer__top-list" }, Bi = ["href"], Ci = /* @__PURE__ */ M({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const n = ie("RouterLink");
      return i(), f("div", null, [
        d("h3", Ii, b(e.categoryName), 1),
        d("ul", Di, [
          (i(!0), f(K, null, W(e.links, (l, r) => (i(), f("li", { key: r }, [
            typeof l.to == "string" && l.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: l.to
            }, b(l.label), 9, Bi)) : h("", !0),
            typeof l.to == "object" || typeof l.to == "string" && !l.to.startsWith("http") ? (i(), R(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: l.to
            }, {
              default: G(() => [
                j(b(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : h("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), xi = { class: "fr-connect-group" }, Ti = { class: "fr-connect__brand" }, Ei = ["href", "title"], Si = /* @__PURE__ */ M({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", xi, [
      d("button", {
        class: N(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        a[0] || (a[0] = d("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        d("span", Ti, "FranceConnect" + b(e.secure ? "+" : ""), 1)
      ], 2),
      d("p", null, [
        d("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, b(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, Ei)
      ])
    ]));
  }
}), Li = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Ai = { class: "fr-nav__item" }, Mi = ["aria-controls", "aria-expanded"], $i = { class: "fr-hidden-lg" }, Fi = ["id"], Pi = { class: "fr-menu__list" }, Ri = ["hreflang", "lang", "aria-current", "href", "onClick"], Ae = /* @__PURE__ */ M({
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
      doExpand: s,
      onTransitionEnd: u
    } = be(), c = O(!1);
    function p(_) {
      c.value = !1, n("select", _);
    }
    const g = w(
      () => a.languages.find(({ codeIso: _ }) => _ === a.currentLanguage)
    );
    return ae(c, (_, C) => {
      _ !== C && s(_);
    }), (_, C) => {
      var B, P;
      return i(), f("nav", Li, [
        d("div", Ai, [
          d("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": _.id,
            "aria-expanded": c.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: C[0] || (C[0] = U((v) => c.value = !c.value, ["prevent", "stop"]))
          }, [
            j(b((B = g.value) == null ? void 0 : B.codeIso.toUpperCase()), 1),
            d("span", $i, " - " + b((P = g.value) == null ? void 0 : P.label), 1)
          ], 8, Mi),
          d("div", {
            id: _.id,
            ref_key: "collapse",
            ref: l,
            class: N(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": F(o), "fr-collapsing": F(r) }]),
            onTransitionend: C[1] || (C[1] = (v) => F(u)(c.value))
          }, [
            d("ul", Pi, [
              (i(!0), f(K, null, W(_.languages, (v, S) => (i(), f("li", { key: S }, [
                d("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: v.codeIso,
                  lang: v.codeIso,
                  "aria-current": _.currentLanguage === v.codeIso ? !0 : void 0,
                  href: `#${v.codeIso}`,
                  onClick: U((x) => p(v), ["prevent", "stop"])
                }, b(`${v.codeIso.toUpperCase()} - ${v.label}`), 9, Ri)
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
}, ji = {
  key: 0,
  class: "fr-hint-text"
}, Oi = /* @__PURE__ */ M({
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
    const a = t, n = rl(), l = O(null), r = () => {
      var c;
      return (c = l.value) == null ? void 0 : c.focus();
    }, o = w(() => a.isTextarea ? "textarea" : "input"), s = w(() => a.isWithWrapper || n.type === "date" || !!a.wrapperClass), u = w(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: r
    }), (c, p) => (i(), f(K, null, [
      d("label", {
        class: N(u.value),
        for: c.id
      }, [
        A(c.$slots, "label", {}, () => [
          j(b(c.label) + " ", 1),
          A(c.$slots, "required-tip", {}, () => [
            "required" in c.$attrs && c.$attrs.required !== !1 ? (i(), f("span", Vi, "*")) : h("", !0)
          ], !0)
        ], !0),
        c.hint ? (i(), f("span", ji, b(c.hint), 1)) : h("", !0)
      ], 10, Ni),
      s.value ? (i(), f("div", {
        key: 1,
        class: N([
          { "fr-input-wrap": c.isWithWrapper || c.$attrs.type === "date" },
          c.wrapperClass
        ])
      }, [
        (i(), R(oe(o.value), q({ id: c.id }, c.$attrs, {
          ref_key: "__input",
          ref: l,
          class: ["fr-input", {
            "fr-input--error": c.isInvalid,
            "fr-input--valid": c.isValid
          }],
          value: c.modelValue,
          "aria-describedby": c.descriptionId || void 0,
          onInput: p[1] || (p[1] = (g) => c.$emit("update:modelValue", g.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (i(), R(oe(o.value), q({
        key: 0,
        id: c.id
      }, c.$attrs, {
        ref_key: "__input",
        ref: l,
        class: ["fr-input", {
          "fr-input--error": c.isInvalid,
          "fr-input--valid": c.isValid
        }],
        value: c.modelValue,
        "aria-describedby": c.descriptionId || void 0,
        onInput: p[0] || (p[0] = (g) => c.$emit("update:modelValue", g.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), Et = /* @__PURE__ */ re(Oi, [["__scopeId", "data-v-6e6c295a"]]), Me = /* @__PURE__ */ M({
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
      class: N(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      X(Et, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        "label-visible": n.labelVisible,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": l[0] || (l[0] = (r) => a("update:modelValue", r)),
        onKeydown: l[1] || (l[1] = Y((r) => a("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      X(Fe, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: l[2] || (l[2] = (r) => a("search", n.modelValue))
      }, {
        default: G(() => [
          j(b(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Yt = 1, St = /* @__PURE__ */ M({
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
      var g;
      return ((g = e.href) == null ? void 0 : g.startsWith("http")) || a.value && e.path.startsWith("http") || typeof e.to == "string" && e.to.startsWith("http");
    }), l = w(() => {
      var g;
      return ((g = e.href) == null ? void 0 : g.startsWith("mailto")) || a.value && e.path.startsWith("mailto") || typeof e.to == "string" && e.to.startsWith("mailto");
    }), r = w(() => e.button ? "button" : n.value || l.value ? "a" : "RouterLink"), o = w(() => {
      if (!(!n.value && !l.value))
        return e.to ?? e.href ?? e.path;
    }), s = w(() => {
      if (!(n.value || l.value))
        return e.to ?? e.path;
    }), u = w(() => s.value ? { to: s.value } : { href: o.value }), c = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = w(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Yt, ...e.iconAttrs ?? {} } : { scale: Yt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (g, _) => (i(), R(oe(r.value), q({
      class: ["fr-btn", {
        "fr-btn--icon-right": c.value && g.iconRight,
        "fr-btn--icon-left": c.value && !g.iconRight,
        [String(g.icon)]: c.value
      }]
    }, u.value, {
      target: g.target,
      onClick: _[0] || (_[0] = U((C) => g.onClick(C), ["stop"]))
    }), {
      default: G(() => {
        var C, B;
        return [
          !c.value && (g.icon || (C = g.iconAttrs) != null && C.name) && !g.iconRight ? (i(), R(le, q({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : h("", !0),
          j(" " + b(g.label) + " ", 1),
          !c.value && (g.icon || (B = g.iconAttrs) != null && B.name) && g.iconRight ? (i(), R(le, q({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : h("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Hi = ["aria-label"], qi = { class: "fr-btns-group" }, pt = /* @__PURE__ */ M({
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
      d("ul", qi, [
        (i(!0), f(K, null, W(n.links, (r, o) => (i(), f("li", { key: o }, [
          X(St, q({ ref_for: !0 }, r, {
            "on-click": (s) => {
              var u;
              a("linkClick", s), (u = r.onClick) == null || u.call(r, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Hi));
  }
}), Ki = {
  role: "banner",
  class: "fr-header"
}, zi = { class: "fr-header__body" }, Qi = { class: "fr-container width-inherit" }, Gi = { class: "fr-header__body-row" }, Wi = { class: "fr-header__brand fr-enlarge-link" }, Ui = { class: "fr-header__brand-top" }, Xi = { class: "fr-header__logo" }, Yi = {
  key: 0,
  class: "fr-header__operator"
}, Zi = ["src", "alt"], Ji = {
  key: 1,
  class: "fr-header__navbar"
}, es = ["aria-label", "title", "data-fr-opened"], ts = ["aria-label", "title"], as = {
  key: 0,
  class: "fr-header__service"
}, ls = { class: "fr-header__service-title" }, ns = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, os = {
  key: 0,
  class: "fr-header__service-tagline"
}, rs = {
  key: 1,
  class: "fr-header__service"
}, is = { class: "fr-header__tools" }, ss = {
  key: 0,
  class: "fr-header__tools-links"
}, us = {
  key: 1,
  class: "fr-header__search fr-modal"
}, ds = ["aria-label"], cs = { class: "fr-container" }, fs = { class: "fr-header__menu-links" }, ps = { role: "navigation" }, vs = {
  key: 1,
  class: "flex justify-center items-center"
}, ms = { class: "fr-header__menu fr-modal" }, gs = {
  key: 0,
  class: "fr-container"
}, bs = /* @__PURE__ */ M({
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
    const a = t, n = e, l = $e(a, "languageSelector"), r = O(!1), o = O(!1), s = O(!1), u = () => {
      var v;
      s.value = !1, r.value = !1, o.value = !1, (v = document.getElementById("button-menu")) == null || v.focus();
    }, c = (v) => {
      v.key === "Escape" && u();
    };
    ne(() => {
      document.addEventListener("keydown", c);
    }), fe(() => {
      document.removeEventListener("keydown", c);
    });
    const p = () => {
      var v;
      s.value = !0, r.value = !0, o.value = !1, (v = document.getElementById("close-button")) == null || v.focus();
    }, g = () => {
      s.value = !0, r.value = !1, o.value = !0;
    }, _ = u, C = bt(), B = w(() => {
      var v;
      return !!((v = C.operator) != null && v.call(C).length) || !!a.operatorImgSrc;
    }), P = w(() => !!C.mainnav);
    return ge(kt, () => u), (v, S) => {
      var x, L, D;
      const I = ie("RouterLink");
      return i(), f("header", Ki, [
        d("div", zi, [
          d("div", Qi, [
            d("div", Gi, [
              d("div", Wi, [
                d("div", Ui, [
                  d("div", Xi, [
                    X(I, {
                      to: v.homeTo,
                      title: `${v.homeLabel} - ${v.serviceTitle}`
                    }, {
                      default: G(() => [
                        X(Le, {
                          "logo-text": v.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  B.value ? (i(), f("div", Yi, [
                    A(v.$slots, "operator", {}, () => [
                      v.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: v.operatorImgSrc,
                        alt: v.operatorImgAlt,
                        style: de(v.operatorImgStyle)
                      }, null, 12, Zi)) : h("", !0)
                    ])
                  ])) : h("", !0),
                  v.showSearch || P.value || (x = v.quickLinks) != null && x.length ? (i(), f("div", Ji, [
                    v.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": v.showSearchLabel,
                      title: v.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: S[0] || (S[0] = U((m) => g(), ["prevent", "stop"]))
                    }, null, 8, es)) : h("", !0),
                    P.value || (L = v.quickLinks) != null && L.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": v.menuLabel,
                      title: v.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: S[1] || (S[1] = U((m) => p(), ["prevent", "stop"]))
                    }, null, 8, ts)) : h("", !0)
                  ])) : h("", !0)
                ]),
                v.serviceTitle ? (i(), f("div", as, [
                  X(I, q({
                    to: v.homeTo,
                    title: `${v.homeLabel} - ${v.serviceTitle}`
                  }, v.$attrs), {
                    default: G(() => [
                      d("p", ls, [
                        j(b(v.serviceTitle) + " ", 1),
                        v.showBeta ? (i(), f("span", ns, " BETA ")) : h("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  v.serviceDescription ? (i(), f("p", os, b(v.serviceDescription), 1)) : h("", !0)
                ])) : h("", !0),
                !v.serviceTitle && v.showBeta ? (i(), f("div", rs, S[9] || (S[9] = [
                  d("p", { class: "fr-header__service-title" }, [
                    d("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : h("", !0)
              ]),
              d("div", is, [
                (D = v.quickLinks) != null && D.length || l.value ? (i(), f("div", ss, [
                  r.value ? h("", !0) : (i(), R(pt, {
                    key: 0,
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (i(), R(Ae, q({ key: 1 }, l.value, {
                    onSelect: S[2] || (S[2] = (m) => n("language-select", m))
                  }), null, 16)) : h("", !0)
                ])) : h("", !0),
                v.showSearch ? (i(), f("div", us, [
                  X(Me, {
                    "searchbar-id": v.searchbarId,
                    label: v.searchLabel,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": S[3] || (S[3] = (m) => n("update:modelValue", m)),
                    onSearch: S[4] || (S[4] = (m) => n("search", m))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ]),
            v.showSearch || P.value || v.quickLinks && v.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: N(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": v.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              d("div", cs, [
                d("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: S[5] || (S[5] = U((m) => u(), ["prevent", "stop"]))
                }, b(v.closeMenuModalLabel), 1),
                d("div", fs, [
                  l.value ? (i(), R(Ae, q({ key: 0 }, l.value, {
                    onSelect: S[6] || (S[6] = (m) => l.value.currentLanguage = m.codeIso)
                  }), null, 16)) : h("", !0),
                  d("nav", ps, [
                    r.value ? (i(), R(pt, {
                      key: 0,
                      role: "navigation",
                      links: v.quickLinks,
                      "nav-aria-label": v.quickLinksAriaLabel,
                      onLinkClick: F(_)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : h("", !0)
                  ])
                ]),
                s.value ? A(v.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : h("", !0),
                o.value ? (i(), f("div", vs, [
                  X(Me, {
                    "searchbar-id": v.searchbarId,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    "onUpdate:modelValue": S[7] || (S[7] = (m) => n("update:modelValue", m)),
                    onSearch: S[8] || (S[8] = (m) => n("search", m))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ], 10, ds)) : h("", !0),
            A(v.$slots, "default")
          ])
        ]),
        d("div", ms, [
          P.value && !s.value ? (i(), f("div", gs, [
            A(v.$slots, "mainnav", { hidemodal: u })
          ])) : h("", !0)
        ])
      ]);
    };
  }
}), hs = /* @__PURE__ */ M({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", {
      class: N(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      d("p", {
        class: N({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        j(b(e.text) + " ", 1),
        A(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), ys = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, ks = ["id", "data-testid"], ws = ["id", "data-testid"], _s = ["id", "data-testid"], Is = ["id", "data-testid"], Ds = /* @__PURE__ */ M({
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
      class: N(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      A(e.$slots, "before-input"),
      A(e.$slots, "default"),
      e.$slots.default ? h("", !0) : (i(), R(Et, q({ key: 0 }, e.$attrs, {
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
      d("div", ys, [
        Array.isArray(e.errorMessage) ? (i(!0), f(K, { key: 0 }, W(e.errorMessage, (n) => (i(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, b(n), 9, ks))), 128)) : e.errorMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, b(e.errorMessage), 9, ws)) : h("", !0),
        Array.isArray(e.validMessage) ? (i(!0), f(K, { key: 2 }, W(e.validMessage, (n) => (i(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, b(n), 9, _s))), 128)) : e.validMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, b(e.validMessage), 9, Is)) : h("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var La = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], He = /* @__PURE__ */ La.join(","), Aa = typeof Element > "u", _e = Aa ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, qe = !Aa && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, Ke = function t(e, a) {
  var n;
  a === void 0 && (a = !0);
  var l = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), r = l === "" || l === "true", o = r || a && e && t(e.parentNode);
  return o;
}, Bs = function(t) {
  var e, a = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return a === "" || a === "true";
}, Ma = function(t, e, a) {
  if (Ke(t))
    return [];
  var n = Array.prototype.slice.apply(t.querySelectorAll(He));
  return e && _e.call(t, He) && n.unshift(t), n = n.filter(a), n;
}, $a = function t(e, a, n) {
  for (var l = [], r = Array.from(e); r.length; ) {
    var o = r.shift();
    if (!Ke(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), u = s.length ? s : o.children, c = t(u, !0, n);
        n.flatten ? l.push.apply(l, c) : l.push({
          scopeParent: o,
          candidates: c
        });
      } else {
        var p = _e.call(o, He);
        p && n.filter(o) && (a || !e.includes(o)) && l.push(o);
        var g = o.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(o), _ = !Ke(g, !1) && (!n.shadowRootFilter || n.shadowRootFilter(o));
        if (g && _) {
          var C = t(g === !0 ? o.children : g.children, !0, n);
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
}, ye = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || Bs(t)) && !Fa(t) ? 0 : t.tabIndex;
}, Cs = function(t, e) {
  var a = ye(t);
  return a < 0 && e && !Fa(t) ? 0 : a;
}, xs = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, Pa = function(t) {
  return t.tagName === "INPUT";
}, Ts = function(t) {
  return Pa(t) && t.type === "hidden";
}, Es = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return e;
}, Ss = function(t, e) {
  for (var a = 0; a < t.length; a++)
    if (t[a].checked && t[a].form === e)
      return t[a];
}, Ls = function(t) {
  if (!t.name)
    return !0;
  var e = t.form || qe(t), a = function(r) {
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
  var l = Ss(n, t.form);
  return !l || l === t;
}, As = function(t) {
  return Pa(t) && t.type === "radio";
}, Ms = function(t) {
  return As(t) && !Ls(t);
}, $s = function(t) {
  var e, a = t && qe(t), n = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var r, o, s;
    for (l = !!((r = n) !== null && r !== void 0 && (o = r.ownerDocument) !== null && o !== void 0 && o.contains(n) || t != null && (s = t.ownerDocument) !== null && s !== void 0 && s.contains(t)); !l && n; ) {
      var u, c, p;
      a = qe(n), n = (u = a) === null || u === void 0 ? void 0 : u.host, l = !!((c = n) !== null && c !== void 0 && (p = c.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return l;
}, Zt = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, n = e.height;
  return a === 0 && n === 0;
}, Fs = function(t, e) {
  var a = e.displayCheck, n = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = _e.call(t, "details>summary:first-of-type"), r = l ? t.parentElement : t;
  if (_e.call(r, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof n == "function") {
      for (var o = t; t; ) {
        var s = t.parentElement, u = qe(t);
        if (s && !s.shadowRoot && n(s) === !0)
          return Zt(t);
        t.assignedSlot ? t = t.assignedSlot : !s && u !== t.ownerDocument ? t = u.host : t = s;
      }
      t = o;
    }
    if ($s(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Zt(t);
  return !1;
}, Ps = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var a = 0; a < e.children.length; a++) {
          var n = e.children.item(a);
          if (n.tagName === "LEGEND")
            return _e.call(e, "fieldset[disabled] *") ? !0 : !n.contains(t);
        }
        return !0;
      }
      e = e.parentElement;
    }
  return !1;
}, ze = function(t, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Ke(e) || Ts(e) || Fs(e, t) || // For a details element with a summary, the summary element gets the focus
  Es(e) || Ps(e));
}, vt = function(t, e) {
  return !(Ms(e) || ye(e) < 0 || !ze(t, e));
}, Rs = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, Ns = function t(e) {
  var a = [], n = [];
  return e.forEach(function(l, r) {
    var o = !!l.scopeParent, s = o ? l.scopeParent : l, u = Cs(s, o), c = o ? t(l.candidates) : s;
    u === 0 ? o ? a.push.apply(a, c) : a.push(s) : n.push({
      documentOrder: r,
      tabIndex: u,
      item: l,
      isScope: o,
      content: c
    });
  }), n.sort(xs).reduce(function(l, r) {
    return r.isScope ? l.push.apply(l, r.content) : l.push(r.content), l;
  }, []).concat(a);
}, Vs = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = $a([t], e.includeContainer, {
    filter: vt.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: Rs
  }) : a = Ma(t, e.includeContainer, vt.bind(null, e)), Ns(a);
}, js = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = $a([t], e.includeContainer, {
    filter: ze.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = Ma(t, e.includeContainer, ze.bind(null, e)), a;
}, Ie = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return _e.call(t, He) === !1 ? !1 : vt(e, t);
}, Os = /* @__PURE__ */ La.concat("iframe").join(","), lt = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return _e.call(t, Os) === !1 ? !1 : ze(e, t);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Jt(t, e) {
  var a = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(l) {
      return Object.getOwnPropertyDescriptor(t, l).enumerable;
    })), a.push.apply(a, n);
  }
  return a;
}
function ea(t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Jt(Object(a), !0).forEach(function(n) {
      Hs(t, n, a[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Jt(Object(a)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(a, n));
    });
  }
  return t;
}
function Hs(t, e, a) {
  return e = Ks(e), e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function qs(t, e) {
  if (typeof t != "object" || t === null) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var n = a.call(t, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Ks(t) {
  var e = qs(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
var ta = {
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
}, zs = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, Qs = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, Te = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, Gs = function(t) {
  return Te(t) && !t.shiftKey;
}, Ws = function(t) {
  return Te(t) && t.shiftKey;
}, aa = function(t) {
  return setTimeout(t, 0);
}, la = function(t, e) {
  var a = -1;
  return t.every(function(n, l) {
    return e(n) ? (a = l, !1) : !0;
  }), a;
}, Ce = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    a[n - 1] = arguments[n];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, Ne = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, Us = [], Xs = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, n = (e == null ? void 0 : e.trapStack) || Us, l = ea({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Gs,
    isKeyBackward: Ws
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
  }, o, s = function(k, E, H) {
    return k && k[E] !== void 0 ? k[E] : l[H || E];
  }, u = function(k, E) {
    var H = typeof (E == null ? void 0 : E.composedPath) == "function" ? E.composedPath() : void 0;
    return r.containerGroups.findIndex(function($) {
      var V = $.container, z = $.tabbableNodes;
      return V.contains(k) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (H == null ? void 0 : H.includes(V)) || z.find(function(Z) {
        return Z === k;
      });
    });
  }, c = function(k) {
    var E = l[k];
    if (typeof E == "function") {
      for (var H = arguments.length, $ = new Array(H > 1 ? H - 1 : 0), V = 1; V < H; V++)
        $[V - 1] = arguments[V];
      E = E.apply(void 0, $);
    }
    if (E === !0 && (E = void 0), !E) {
      if (E === void 0 || E === !1)
        return E;
      throw new Error("`".concat(k, "` was specified but was not a node, or did not return a node"));
    }
    var z = E;
    if (typeof E == "string" && (z = a.querySelector(E), !z))
      throw new Error("`".concat(k, "` as selector refers to no known node"));
    return z;
  }, p = function() {
    var k = c("initialFocus");
    if (k === !1)
      return !1;
    if (k === void 0 || !lt(k, l.tabbableOptions))
      if (u(a.activeElement) >= 0)
        k = a.activeElement;
      else {
        var E = r.tabbableGroups[0], H = E && E.firstTabbableNode;
        k = H || c("fallbackFocus");
      }
    if (!k)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return k;
  }, g = function() {
    if (r.containerGroups = r.containers.map(function(k) {
      var E = Vs(k, l.tabbableOptions), H = js(k, l.tabbableOptions), $ = E.length > 0 ? E[0] : void 0, V = E.length > 0 ? E[E.length - 1] : void 0, z = H.find(function(te) {
        return Ie(te);
      }), Z = H.slice().reverse().find(function(te) {
        return Ie(te);
      }), ee = !!E.find(function(te) {
        return ye(te) > 0;
      });
      return {
        container: k,
        tabbableNodes: E,
        focusableNodes: H,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ee,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: $,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: V,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: z,
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
          var pe = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, me = E.indexOf(te);
          return me < 0 ? pe ? H.slice(H.indexOf(te) + 1).find(function(ce) {
            return Ie(ce);
          }) : H.slice(0, H.indexOf(te)).reverse().find(function(ce) {
            return Ie(ce);
          }) : E[me + (pe ? 1 : -1)];
        }
      };
    }), r.tabbableGroups = r.containerGroups.filter(function(k) {
      return k.tabbableNodes.length > 0;
    }), r.tabbableGroups.length <= 0 && !c("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (r.containerGroups.find(function(k) {
      return k.posTabIndexesFound;
    }) && r.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, _ = function k(E) {
    var H = E.activeElement;
    if (H)
      return H.shadowRoot && H.shadowRoot.activeElement !== null ? k(H.shadowRoot) : H;
  }, C = function k(E) {
    if (E !== !1 && E !== _(document)) {
      if (!E || !E.focus) {
        k(p());
        return;
      }
      E.focus({
        preventScroll: !!l.preventScroll
      }), r.mostRecentlyFocusedNode = E, zs(E) && E.select();
    }
  }, B = function(k) {
    var E = c("setReturnFocus", k);
    return E || (E === !1 ? !1 : k);
  }, P = function(k) {
    var E = k.target, H = k.event, $ = k.isBackward, V = $ === void 0 ? !1 : $;
    E = E || Ne(H), g();
    var z = null;
    if (r.tabbableGroups.length > 0) {
      var Z = u(E, H), ee = Z >= 0 ? r.containerGroups[Z] : void 0;
      if (Z < 0)
        V ? z = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : z = r.tabbableGroups[0].firstTabbableNode;
      else if (V) {
        var te = la(r.tabbableGroups, function(Je) {
          var et = Je.firstTabbableNode;
          return E === et;
        });
        if (te < 0 && (ee.container === E || lt(E, l.tabbableOptions) && !Ie(E, l.tabbableOptions) && !ee.nextTabbableNode(E, !1)) && (te = Z), te >= 0) {
          var pe = te === 0 ? r.tabbableGroups.length - 1 : te - 1, me = r.tabbableGroups[pe];
          z = ye(E) >= 0 ? me.lastTabbableNode : me.lastDomTabbableNode;
        } else Te(H) || (z = ee.nextTabbableNode(E, !1));
      } else {
        var ce = la(r.tabbableGroups, function(Je) {
          var et = Je.lastTabbableNode;
          return E === et;
        });
        if (ce < 0 && (ee.container === E || lt(E, l.tabbableOptions) && !Ie(E, l.tabbableOptions) && !ee.nextTabbableNode(E)) && (ce = Z), ce >= 0) {
          var ll = ce === r.tabbableGroups.length - 1 ? 0 : ce + 1, Mt = r.tabbableGroups[ll];
          z = ye(E) >= 0 ? Mt.firstTabbableNode : Mt.firstDomTabbableNode;
        } else Te(H) || (z = ee.nextTabbableNode(E));
      }
    } else
      z = c("fallbackFocus");
    return z;
  }, v = function(k) {
    var E = Ne(k);
    if (!(u(E, k) >= 0)) {
      if (Ce(l.clickOutsideDeactivates, k)) {
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
      Ce(l.allowOutsideClick, k) || k.preventDefault();
    }
  }, S = function(k) {
    var E = Ne(k), H = u(E, k) >= 0;
    if (H || E instanceof Document)
      H && (r.mostRecentlyFocusedNode = E);
    else {
      k.stopImmediatePropagation();
      var $, V = !0;
      if (r.mostRecentlyFocusedNode)
        if (ye(r.mostRecentlyFocusedNode) > 0) {
          var z = u(r.mostRecentlyFocusedNode), Z = r.containerGroups[z].tabbableNodes;
          if (Z.length > 0) {
            var ee = Z.findIndex(function(te) {
              return te === r.mostRecentlyFocusedNode;
            });
            ee >= 0 && (l.isKeyForward(r.recentNavEvent) ? ee + 1 < Z.length && ($ = Z[ee + 1], V = !1) : ee - 1 >= 0 && ($ = Z[ee - 1], V = !1));
          }
        } else
          r.containerGroups.some(function(te) {
            return te.tabbableNodes.some(function(pe) {
              return ye(pe) > 0;
            });
          }) || (V = !1);
      else
        V = !1;
      V && ($ = P({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(r.recentNavEvent)
      })), C($ || r.mostRecentlyFocusedNode || p());
    }
    r.recentNavEvent = void 0;
  }, x = function(k) {
    var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = k;
    var H = P({
      event: k,
      isBackward: E
    });
    H && (Te(k) && k.preventDefault(), C(H));
  }, L = function(k) {
    if (Qs(k) && Ce(l.escapeDeactivates, k) !== !1) {
      k.preventDefault(), o.deactivate();
      return;
    }
    (l.isKeyForward(k) || l.isKeyBackward(k)) && x(k, l.isKeyBackward(k));
  }, D = function(k) {
    var E = Ne(k);
    u(E, k) >= 0 || Ce(l.clickOutsideDeactivates, k) || Ce(l.allowOutsideClick, k) || (k.preventDefault(), k.stopImmediatePropagation());
  }, I = function() {
    if (r.active)
      return ta.activateTrap(n, o), r.delayInitialFocusTimer = l.delayInitialFocus ? aa(function() {
        C(p());
      }) : C(p()), a.addEventListener("focusin", S, !0), a.addEventListener("mousedown", v, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", v, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", D, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", L, {
        capture: !0,
        passive: !1
      }), o;
  }, m = function() {
    if (r.active)
      return a.removeEventListener("focusin", S, !0), a.removeEventListener("mousedown", v, !0), a.removeEventListener("touchstart", v, !0), a.removeEventListener("click", D, !0), a.removeEventListener("keydown", L, !0), o;
  }, T = function(k) {
    var E = k.some(function(H) {
      var $ = Array.from(H.removedNodes);
      return $.some(function(V) {
        return V === r.mostRecentlyFocusedNode;
      });
    });
    E && C(p());
  }, y = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(T) : void 0, Q = function() {
    y && (y.disconnect(), r.active && !r.paused && r.containers.map(function(k) {
      y.observe(k, {
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
    activate: function(k) {
      if (r.active)
        return this;
      var E = s(k, "onActivate"), H = s(k, "onPostActivate"), $ = s(k, "checkCanFocusTrap");
      $ || g(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = a.activeElement, E == null || E();
      var V = function() {
        $ && g(), I(), Q(), H == null || H();
      };
      return $ ? ($(r.containers.concat()).then(V, V), this) : (V(), this);
    },
    deactivate: function(k) {
      if (!r.active)
        return this;
      var E = ea({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, k);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, m(), r.active = !1, r.paused = !1, Q(), ta.deactivateTrap(n, o);
      var H = s(E, "onDeactivate"), $ = s(E, "onPostDeactivate"), V = s(E, "checkCanReturnFocus"), z = s(E, "returnFocus", "returnFocusOnDeactivate");
      H == null || H();
      var Z = function() {
        aa(function() {
          z && C(B(r.nodeFocusedBeforeActivation)), $ == null || $();
        });
      };
      return z && V ? (V(B(r.nodeFocusedBeforeActivation)).then(Z, Z), this) : (Z(), this);
    },
    pause: function(k) {
      if (r.paused || !r.active)
        return this;
      var E = s(k, "onPause"), H = s(k, "onPostPause");
      return r.paused = !0, E == null || E(), m(), Q(), H == null || H(), this;
    },
    unpause: function(k) {
      if (!r.paused || !r.active)
        return this;
      var E = s(k, "onUnpause"), H = s(k, "onPostUnpause");
      return r.paused = !1, E == null || E(), g(), I(), Q(), H == null || H(), this;
    },
    updateContainerElements: function(k) {
      var E = [].concat(k).filter(Boolean);
      return r.containers = E.map(function(H) {
        return typeof H == "string" ? a.querySelector(H) : H;
      }), r.active && g(), Q(), this;
    }
  }, o.updateContainerElements(t), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Ys = {
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
}, Zs = M({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, Ys),
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
    const l = O(null), r = w(() => {
      const s = l.value;
      return s && (s instanceof HTMLElement ? s : s.$el);
    });
    function o() {
      return n || (n = Xs(r.value, {
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
    return ne(() => {
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
        const s = e.default().filter((u) => u.type !== nl);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : ol(s[0], { ref: l });
      }
    };
  }
}), Js = ["aria-labelledby", "role", "open"], eu = { class: "fr-container fr-container--fluid fr-container-md" }, tu = { class: "fr-grid-row fr-grid-row--center" }, au = { class: "fr-modal__body" }, lu = { class: "fr-modal__header" }, nu = ["title"], ou = { class: "fr-modal__content" }, ru = ["id"], iu = {
  key: 0,
  class: "fr-modal__footer"
}, na = 2, su = /* @__PURE__ */ M({
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
    const a = t, n = e, l = (B) => {
      B.key === "Escape" && g();
    }, r = w(() => a.isAlert ? "alertdialog" : "dialog"), o = O(null), s = O();
    ae(() => a.opened, (B) => {
      var P, v;
      B ? ((P = s.value) == null || P.showModal(), setTimeout(() => {
        var S;
        (S = o.value) == null || S.focus();
      }, 100)) : (v = s.value) == null || v.close(), u(B);
    });
    function u(B) {
      typeof window < "u" && document.body.classList.toggle("modal-open", B);
    }
    ne(() => {
      c(), u(a.opened);
    }), dl(() => {
      p(), u(!1);
    });
    function c() {
      document.addEventListener("keydown", l);
    }
    function p() {
      document.removeEventListener("keydown", l);
    }
    async function g() {
      var B;
      await ua(), (B = a.origin) == null || B.focus(), n("close");
    }
    const _ = w(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), C = w(
      () => _.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: na } : { scale: na, ...a.icon ?? {} }
    );
    return (B, P) => B.opened ? (i(), R(F(Zs), { key: 0 }, {
      default: G(() => {
        var v, S;
        return [
          d("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-labelledby": B.modalId,
            role: r.value,
            class: N(["fr-modal", { "fr-modal--opened": B.opened }]),
            open: B.opened
          }, [
            d("div", eu, [
              d("div", tu, [
                d("div", {
                  class: N(["fr-col-12", {
                    "fr-col-md-8": B.size === "lg",
                    "fr-col-md-6": B.size === "md",
                    "fr-col-md-4": B.size === "sm"
                  }])
                }, [
                  d("div", au, [
                    d("div", lu, [
                      d("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: B.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: P[0] || (P[0] = (x) => g())
                      }, [
                        d("span", null, b(B.closeButtonLabel), 1)
                      ], 8, nu)
                    ]),
                    d("div", ou, [
                      d("h1", {
                        id: B.modalId,
                        class: "fr-modal__title"
                      }, [
                        _.value || C.value ? (i(), f("span", {
                          key: 0,
                          class: N({
                            [String(B.icon)]: _.value
                          })
                        }, [
                          B.icon && C.value ? (i(), R(le, ue(q({ key: 0 }, C.value)), null, 16)) : h("", !0)
                        ], 2)) : h("", !0),
                        j(" " + b(B.title), 1)
                      ], 8, ru),
                      A(B.$slots, "default", {}, void 0, !0)
                    ]),
                    (v = B.actions) != null && v.length || B.$slots.footer ? (i(), f("div", iu, [
                      A(B.$slots, "footer", {}, void 0, !0),
                      (S = B.actions) != null && S.length ? (i(), R(Ye, {
                        key: 0,
                        align: "right",
                        buttons: B.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : h("", !0)
                    ])) : h("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, Js)
        ];
      }),
      _: 3
    })) : h("", !0);
  }
}), Ra = /* @__PURE__ */ re(su, [["__scopeId", "data-v-d11515b3"]]), uu = ["id", "aria-current"], du = /* @__PURE__ */ M({
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
      A(e.$slots, "default", {}, void 0, !0)
    ], 8, uu));
  }
}), Na = /* @__PURE__ */ re(du, [["__scopeId", "data-v-5909c19f"]]), cu = ["href"], oa = 2, Ze = /* @__PURE__ */ M({
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
      () => n.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: oa, name: e.icon } : { scale: oa, ...e.icon || {} }
    ), r = il() ? De(kt) : void 0, o = (r == null ? void 0 : r()) ?? (() => {
    });
    return (s, u) => {
      const c = ie("RouterLink");
      return a.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: s.to,
        onClick: u[0] || (u[0] = (p) => {
          s.$emit("toggleId", s.id), s.onClick(p);
        })
      }, b(s.text), 9, cu)) : (i(), R(c, {
        key: 1,
        class: N(["fr-nav__link", {
          [String(s.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: u[1] || (u[1] = (p) => {
          var g;
          F(o)(), s.$emit("toggleId", s.id), (g = s.onClick) == null || g.call(s, p);
        })
      }, {
        default: G(() => [
          s.icon && l.value ? (i(), R(le, ue(q({ key: 0 }, l.value)), null, 16)) : h("", !0),
          j(" " + b(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), fu = { class: "fr-col-12 fr-col-lg-3" }, pu = { class: "fr-mega-menu__category" }, vu = { class: "fr-mega-menu__list" }, Va = /* @__PURE__ */ M({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", fu, [
      d("h5", pu, [
        d("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: a[0] || (a[0] = U(() => {
          }, ["prevent"]))
        }, b(e.title), 1)
      ]),
      d("ul", vu, [
        (i(!0), f(K, null, W(e.links, (n, l) => (i(), f("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          X(Ze, q({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), mu = ["aria-expanded", "aria-current", "aria-controls"], gu = ["id"], bu = { class: "fr-container fr-container--fluid fr-container-lg" }, hu = { class: "fr-grid-row fr-grid-row-lg--gutters" }, yu = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, ku = { class: "fr-mega-menu__leader" }, wu = { class: "fr-h4 fr-mb-2v" }, _u = { class: "fr-hidden fr-displayed-lg" }, Iu = /* @__PURE__ */ M({
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
    } = be(), s = w(() => e.id === e.expandedId);
    return ae(s, (u, c) => {
      u !== c && r(u);
    }), ne(() => {
      s.value && r(!0);
    }), (u, c) => {
      const p = ie("RouterLink");
      return i(), f(K, null, [
        d("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: c[0] || (c[0] = (g) => u.$emit("toggleId", u.id))
        }, b(u.title), 9, mu),
        d("div", {
          id: u.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: N(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": F(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(n)
          }]),
          tabindex: "-1",
          onTransitionend: c[2] || (c[2] = (g) => F(o)(s.value))
        }, [
          d("div", bu, [
            d("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: c[1] || (c[1] = (g) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            d("div", hu, [
              d("div", yu, [
                d("div", ku, [
                  d("h4", wu, b(u.title), 1),
                  d("p", _u, [
                    j(b(u.description) + " ", 1),
                    A(u.$slots, "description", {}, void 0, !0)
                  ]),
                  X(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: G(() => [
                      j(b(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              A(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(K, null, W(u.menus, (g, _) => (i(), R(Va, q({
                key: _,
                ref_for: !0
              }, g), null, 16))), 128))
            ])
          ])
        ], 42, gu)
      ], 64);
    };
  }
}), ja = /* @__PURE__ */ re(Iu, [["__scopeId", "data-v-7e339b1d"]]), Du = ["id", "aria-current"], Oa = /* @__PURE__ */ M({
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
      A(e.$slots, "default")
    ], 8, Du));
  }
}), Bu = ["aria-expanded", "aria-current", "aria-controls"], Cu = ["id"], xu = { class: "fr-menu__list" }, Ha = /* @__PURE__ */ M({
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
    } = be(), s = w(() => e.id === e.expandedId);
    return ae(s, (u, c) => {
      u !== c && r(u);
    }), ne(() => {
      s.value && r(!0);
    }), (u, c) => (i(), f(K, null, [
      d("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: c[0] || (c[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        d("span", null, b(u.title), 1)
      ], 8, Bu),
      d("div", {
        id: u.id,
        ref_key: "collapse",
        ref: a,
        class: N(["fr-collapse fr-menu", { "fr-collapse--expanded": F(l), "fr-collapsing": F(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: c[2] || (c[2] = (p) => F(o)(s.value))
      }, [
        d("ul", xu, [
          A(u.$slots, "default"),
          (i(!0), f(K, null, W(u.links, (p, g) => (i(), R(Oa, { key: g }, {
            default: G(() => [
              X(Ze, q({ ref_for: !0 }, p, {
                onToggleId: c[1] || (c[1] = (_) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Cu)
    ], 64));
  }
}), Tu = ["id", "aria-label"], Eu = { class: "fr-nav__list" }, Su = /* @__PURE__ */ M({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => J("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(t) {
    const e = t, a = O(void 0), n = (s) => {
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
    return ne(() => {
      document.addEventListener("click", r), document.addEventListener("keydown", o);
    }), fe(() => {
      document.removeEventListener("click", r), document.removeEventListener("keydown", o);
    }), (s, u) => (i(), f("nav", {
      id: s.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": s.label
    }, [
      d("ul", Eu, [
        A(s.$slots, "default"),
        (i(!0), f(K, null, W(s.navItems, (c, p) => (i(), R(Na, { key: p }, {
          default: G(() => [
            c.to && c.text ? (i(), R(Ze, q({
              key: 0,
              ref_for: !0
            }, c, {
              "expanded-id": a.value,
              onToggleId: u[0] || (u[0] = (g) => n(g))
            }), null, 16, ["expanded-id"])) : c.title && c.links ? (i(), R(Ha, q({
              key: 1,
              ref_for: !0
            }, c, {
              "expanded-id": a.value,
              onToggleId: u[1] || (u[1] = (g) => n(g))
            }), null, 16, ["expanded-id"])) : c.title && c.menus ? (i(), R(ja, q({
              key: 2,
              ref_for: !0
            }, c, {
              "expanded-id": a.value,
              onToggleId: u[2] || (u[2] = (g) => n(g))
            }), null, 16, ["expanded-id"])) : h("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, Tu));
  }
}), Lu = { class: "fr-container" }, Au = { class: "fr-notice__body" }, Mu = { class: "fr-notice__title" }, $u = { class: "fr-notice__desc" }, Fu = /* @__PURE__ */ M({
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
      class: N(["fr-notice", `fr-notice--${e.type}`])
    }, [
      d("div", Lu, [
        d("div", Au, [
          d("p", null, [
            d("span", Mu, [
              A(e.$slots, "default", {}, () => [
                j(b(e.title), 1)
              ])
            ]),
            d("span", $u, [
              A(e.$slots, "desc", {}, () => [
                j(b(e.desc), 1)
              ])
            ])
          ]),
          e.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: a[0] || (a[0] = (n) => e.$emit("close"))
          }, " Masquer le message ")) : h("", !0)
        ])
      ])
    ], 2));
  }
}), Pu = ["aria-label"], Ru = { class: "fr-content-media__img" }, Nu = ["src", "alt", "title", "ratio"], Vu = { class: "fr-content-media__caption" }, ju = /* @__PURE__ */ M({
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
      class: N(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      d("div", Ru, [
        A(e.$slots, "default", {}, () => [
          e.src ? (i(), f("img", {
            key: 0,
            src: e.src,
            class: N(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, Nu)) : h("", !0)
        ])
      ]),
      d("figcaption", Vu, b(e.legend), 1)
    ], 10, Pu));
  }
}), Ou = { class: "fr-quote fr-quote--column" }, Hu = ["cite"], qu = { class: "fr-quote__author" }, Ku = { class: "fr-quote__source" }, zu = ["href"], Qu = {
  key: 0,
  class: "fr-quote__image"
}, Gu = ["src"], Wu = /* @__PURE__ */ M({
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
    return (e, a) => (i(), f("figure", Ou, [
      e.source ? (i(), f("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        d("p", null, "« " + b(e.quote) + " »", 1)
      ], 8, Hu)) : h("", !0),
      d("figcaption", null, [
        d("p", qu, b(e.author), 1),
        d("ul", Ku, [
          d("li", null, [
            d("cite", null, b(e.source), 1)
          ]),
          (i(!0), f(K, null, W(e.details, (n, l) => (i(), f("li", { key: l }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, b(n.label), 9, zu)) : (i(), f(K, { key: 1 }, [
              j(b(n), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (i(), f("div", Qu, [
          d("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, Gu)
        ])) : h("", !0)
      ])
    ]));
  }
}), Uu = ["id", "name", "value", "checked", "disabled"], Xu = ["for"], Yu = {
  key: 0,
  class: "required"
}, Zu = {
  key: 0,
  class: "fr-hint-text"
}, Ju = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, ed = ["src", "title"], td = { key: 0 }, ad = ["href"], ld = ["href"], nd = ["href"], qa = /* @__PURE__ */ M({
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
      class: N(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      d("div", {
        class: N(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": l.small
        }])
      }, [
        d("input", q({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: r[0] || (r[0] = (o) => l.$emit("update:modelValue", l.value))
        }), null, 16, Uu),
        d("label", {
          for: l.id,
          class: "fr-label"
        }, [
          A(l.$slots, "label", {}, () => [
            j(b(l.label) + " ", 1),
            A(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (i(), f("span", Yu, " *")) : h("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", Zu, b(l.hint), 1)) : h("", !0)
        ], 8, Xu),
        l.img || l.svgPath ? (i(), f("div", Ju, [
          l.img ? (i(), f("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: "",
            title: l.imgTitle
          }, null, 8, ed)) : (i(), f("svg", q({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            l.imgTitle ? (i(), f("title", td, b(l.imgTitle), 1)) : h("", !0),
            d("use", {
              class: "fr-artwork-decorative",
              href: `${l.svgPath}#artwork-decorative`
            }, null, 8, ad),
            d("use", {
              class: "fr-artwork-minor",
              href: `${l.svgPath}#artwork-minor`
            }, null, 8, ld),
            d("use", {
              class: "fr-artwork-major",
              href: `${l.svgPath}#artwork-major`
            }, null, 8, nd)
          ], 16))
        ])) : h("", !0)
      ], 2)
    ], 2));
  }
}), od = { class: "fr-form-group" }, rd = ["disabled", "aria-labelledby", "aria-invalid", "role"], id = ["id"], sd = {
  key: 0,
  class: "fr-hint-text"
}, ud = {
  key: 0,
  class: "required"
}, dd = ["id"], cd = /* @__PURE__ */ M({
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
    const a = t, n = e, l = w(() => a.errorMessage || a.validMessage), r = w(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (u) => {
      u !== a.modelValue && n("update:modelValue", u);
    }, s = w(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (u, c) => (i(), f("div", od, [
      d("fieldset", {
        class: N(["fr-fieldset", {
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
          A(u.$slots, "legend", {}, () => [
            j(b(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", sd, [
              A(u.$slots, "hint", {}, () => [
                j(b(u.hint), 1)
              ])
            ])) : h("", !0),
            A(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", ud, " *")) : h("", !0)
            ])
          ])
        ], 8, id)) : h("", !0),
        A(u.$slots, "default", {}, () => [
          (i(!0), f(K, null, W(u.options, (p, g) => (i(), R(qa, q({
            key: typeof p.value == "boolean" ? g : p.value || g,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": c[0] || (c[0] = (_) => o(_))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        l.value ? (i(), f("div", {
          key: 1,
          id: `messages-${u.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          d("p", {
            class: N(["fr-message fr-message--info flex items-center", r.value])
          }, b(l.value), 3)
        ], 8, dd)) : h("", !0)
      ], 10, rd)
    ]));
  }
}), fd = ["id"], pd = ["id"], vd = { class: "fr-hint-text" }, md = ["data-fr-prefix", "data-fr-suffix"], gd = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], bd = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], hd = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, yd = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, kd = ["id"], wd = ["id"], _d = /* @__PURE__ */ M({
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
    const a = t, n = e, l = O(), r = O(), o = O(), s = w(() => a.lowerValue !== void 0), u = w(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * o.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * o.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), c = w(() => {
      const g = (a.modelValue - a.min) / (a.max - a.min) * o.value - (s.value ? 12 : 0), _ = ((a.lowerValue ?? 0) - a.min) / (a.max - a.min) * o.value;
      return {
        "--progress-right": `${g + 24}px`,
        ...s.value ? { "--progress-left": `${_ + 12}px` } : {}
      };
    });
    ae([() => a.modelValue, () => a.lowerValue], ([g, _]) => {
      _ !== void 0 && (s.value && g < _ && n("update:lowerValue", g), s.value && _ > g && n("update:modelValue", _));
    });
    const p = w(() => (a.prefix ?? "").concat(s.value ? `${a.lowerValue} - ` : "").concat(`${a.modelValue}`).concat(a.suffix ?? ""));
    return ne(() => {
      var g;
      o.value = (g = l.value) == null ? void 0 : g.offsetWidth;
    }), (g, _) => (i(), f("div", {
      id: `${g.id}-group`,
      class: N(["fr-range-group", { "fr-range-group--error": g.message }])
    }, [
      d("label", {
        id: `${g.id}-label`,
        class: "fr-label"
      }, [
        A(g.$slots, "label", {}, () => [
          j(b(g.label), 1)
        ]),
        d("span", vd, [
          A(g.$slots, "hint", {}, () => [
            j(b(g.hint), 1)
          ])
        ])
      ], 8, pd),
      d("div", {
        class: N(["fr-range", {
          "fr-range--sm": g.small,
          "fr-range--double": s.value,
          "fr-range-group--disabled": g.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": g.prefix ?? void 0,
        "data-fr-suffix": g.suffix ?? void 0,
        style: de(c.value)
      }, [
        d("span", {
          ref_key: "output",
          ref: r,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: de(u.value)
        }, b(p.value), 5),
        s.value ? (i(), f("input", {
          key: 0,
          id: `${g.id}-2`,
          type: "range",
          min: g.min,
          max: g.max,
          step: g.step,
          value: g.lowerValue,
          disabled: g.disabled,
          "aria-disabled": g.disabled,
          "aria-labelledby": `${g.id}-label`,
          "aria-describedby": `${g.id}-messages`,
          onInput: _[0] || (_[0] = (C) => {
            var B;
            return n("update:lowerValue", +((B = C.target) == null ? void 0 : B.value));
          })
        }, null, 40, gd)) : h("", !0),
        d("input", {
          id: g.id,
          ref_key: "input",
          ref: l,
          type: "range",
          min: g.min,
          max: g.max,
          step: g.step,
          value: g.modelValue,
          disabled: g.disabled,
          "aria-disabled": g.disabled,
          "aria-labelledby": `${g.id}-label`,
          "aria-describedby": `${g.id}-messages`,
          onInput: _[1] || (_[1] = (C) => {
            var B;
            return n("update:modelValue", +((B = C.target) == null ? void 0 : B.value));
          })
        }, null, 40, bd),
        g.hideIndicators ? h("", !0) : (i(), f("span", hd, b(g.min), 1)),
        g.hideIndicators ? h("", !0) : (i(), f("span", yd, b(g.max), 1))
      ], 14, md),
      g.message || g.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${g.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        A(g.$slots, "messages", {}, () => [
          g.message ? (i(), f("p", {
            key: 0,
            id: `${g.id}-message-error`,
            class: "fr-message fr-message--error"
          }, b(g.message), 9, wd)) : h("", !0)
        ])
      ], 8, kd)) : h("", !0)
    ], 10, fd));
  }
}), Id = { class: "fr-segmented__element" }, Dd = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Bd = ["for"], Cd = { key: 1 }, Ka = /* @__PURE__ */ M({
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
    return (l, r) => (i(), f("div", Id, [
      d("input", q({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: r[0] || (r[0] = (o) => l.$emit("update:modelValue", l.value))
      }), null, 16, Dd),
      d("label", {
        for: l.id,
        class: N(["fr-label", { [n.value]: n.value }])
      }, [
        l.icon && !n.value ? (i(), R(le, ue(q({ key: 0 }, a.value)), null, 16)) : h("", !0),
        l.icon ? (i(), f("span", Cd, " ")) : h("", !0),
        j(" " + b(l.label), 1)
      ], 10, Bd)
    ]));
  }
}), xd = { class: "fr-form-group" }, Td = ["disabled"], Ed = ["id"], Sd = {
  key: 0,
  class: "fr-hint-text"
}, Ld = { class: "fr-segmented__elements" }, Ad = /* @__PURE__ */ M({
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
    return (r, o) => (i(), f("div", xd, [
      d("fieldset", {
        class: N(["fr-segmented", {
          "fr-segmented--sm": r.small,
          "fr-segmented--no-legend": !r.legend
        }]),
        disabled: r.disabled
      }, [
        r.legend ? (i(), f("legend", {
          key: 0,
          id: r.titleId,
          class: N(["fr-segmented__legend", {
            "fr-segmented__legend--inline": r.inline
          }])
        }, [
          A(r.$slots, "legend", {}, () => [
            j(b(r.legend), 1)
          ]),
          r.hint ? (i(), f("span", Sd, b(r.hint), 1)) : h("", !0)
        ], 10, Ed)) : h("", !0),
        d("div", Ld, [
          A(r.$slots, "default", {}, () => [
            (i(!0), f(K, null, W(r.options, (s, u) => (i(), R(Ka, q({
              key: s.value || u,
              name: r.name || s.name,
              ref_for: !0
            }, { ...s, disabled: r.disabled || s.disabled }, {
              "model-value": r.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (c) => l(c))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Td)
    ]));
  }
}), Md = ["for"], $d = {
  key: 0,
  class: "required"
}, Fd = {
  key: 0,
  class: "fr-hint-text"
}, Pd = ["id", "name", "disabled", "aria-disabled", "required"], Rd = ["selected"], Nd = ["selected", "value", "disabled", "aria-disabled"], Vd = ["id"], jd = /* @__PURE__ */ M({
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
      class: N(["fr-select-group", { [`fr-select-group--${n.value}`]: a.value }])
    }, [
      d("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        A(l.$slots, "label", {}, () => [
          j(b(l.label) + " ", 1),
          A(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", $d, " *")) : h("", !0)
          ])
        ]),
        l.description ? (i(), f("span", Fd, b(l.description), 1)) : h("", !0)
      ], 8, Md),
      d("select", q({
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
        d("option", {
          selected: l.modelValue == null,
          disabled: "",
          hidden: ""
        }, b(l.defaultUnselectedText), 9, Rd),
        (i(!0), f(K, null, W(l.options, (o, s) => (i(), f("option", {
          key: s,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, b(typeof o == "object" ? o.text : o), 9, Nd))), 128))
      ], 16, Pd),
      a.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: N(`fr-${n.value}-text`)
      }, b(a.value), 11, Vd)) : h("", !0)
    ], 2));
  }
}), Od = { class: "fr-share" }, Hd = { class: "fr-share__title" }, qd = { class: "fr-btns-group" }, Kd = ["title", "href", "onClick"], zd = { key: 0 }, Qd = ["href", "title"], Gd = ["title"], Wd = /* @__PURE__ */ M({
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
      return i(), f("div", Od, [
        d("p", Hd, b(n.title), 1),
        d("ul", qd, [
          (i(!0), f(K, null, W(n.networks, (o, s) => (i(), f("li", { key: s }, [
            d("a", {
              class: N(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: U((u) => a(o), ["prevent"])
            }, b(o.label), 11, Kd)
          ]))), 128)),
          (r = n.mail) != null && r.to ? (i(), f("li", zd, [
            d("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, b(n.mail.label), 9, Qd)
          ])) : h("", !0),
          d("li", null, [
            d("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: l[0] || (l[0] = (o) => e())
            }, b(n.copyLabel), 9, Gd)
          ])
        ])
      ]);
    };
  }
}), Ud = ["aria-current", "aria-expanded", "aria-controls"], za = /* @__PURE__ */ M({
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
      A(e.$slots, "default")
    ], 8, Ud));
  }
}), Qa = /* @__PURE__ */ M({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      class: N(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      A(e.$slots, "default")
    ], 2));
  }
}), Xd = ["id"], Yd = { class: "fr-sidemenu__list" }, Ga = /* @__PURE__ */ M({
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
    } = be();
    ae(() => e.expanded, (p, g) => {
      p !== g && r(p);
    }), ne(() => {
      e.expanded && r(!0);
    });
    const s = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => s(p) ? "a" : "RouterLink", c = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, g) => {
      const _ = ie("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: a,
        class: N({
          "fr-collapse": p.collapsable,
          "fr-collapsing": F(n),
          "fr-collapse--expanded": F(l)
        }),
        onTransitionend: g[2] || (g[2] = (C) => F(o)(!!p.expanded))
      }, [
        d("ul", Yd, [
          A(p.$slots, "default"),
          (i(!0), f(K, null, W(p.menuItems, (C, B) => (i(), R(Qa, {
            key: B,
            active: C.active
          }, {
            default: G(() => [
              C.menuItems ? h("", !0) : (i(), R(oe(u(C.to)), q({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": C.active ? "page" : void 0,
                ref_for: !0
              }, c(C.to)), {
                default: G(() => [
                  j(b(C.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              C.menuItems ? (i(), f(K, { key: 1 }, [
                X(za, {
                  active: !!C.active,
                  expanded: !!C.expanded,
                  "control-id": C.id,
                  onToggleExpand: g[0] || (g[0] = (P) => p.$emit("toggleExpand", P))
                }, {
                  default: G(() => [
                    j(b(C.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                C.menuItems ? (i(), R(_, {
                  key: 0,
                  id: C.id,
                  collapsable: "",
                  expanded: C.expanded,
                  "menu-items": C.menuItems,
                  onToggleExpand: g[1] || (g[1] = (P) => p.$emit("toggleExpand", P))
                }, null, 8, ["id", "expanded", "menu-items"])) : h("", !0)
              ], 64)) : h("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, Xd);
    };
  }
}), Zd = ["aria-labelledby"], Jd = { class: "fr-sidemenu__inner" }, ec = ["aria-controls", "aria-expanded"], tc = ["id"], ac = { class: "fr-sidemenu__title" }, lc = /* @__PURE__ */ M({
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
    } = be(), o = O(!1);
    return ae(o, (s, u) => {
      s !== u && l(s);
    }), (s, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": s.id
    }, [
      d("div", Jd, [
        d("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": s.id,
          "aria-expanded": o.value,
          onClick: u[0] || (u[0] = U((c) => o.value = !o.value, ["prevent", "stop"]))
        }, b(s.buttonLabel), 9, ec),
        d("div", {
          id: s.id,
          ref_key: "collapse",
          ref: e,
          class: N(["fr-collapse", {
            "fr-collapse--expanded": F(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(a)
          }]),
          onTransitionend: u[2] || (u[2] = (c) => F(r)(o.value))
        }, [
          d("div", ac, b(s.headingTitle), 1),
          A(s.$slots, "default", {}, () => [
            X(Ga, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: u[1] || (u[1] = (c) => s.$emit("toggleExpand", c))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, tc)
      ])
    ], 8, Zd));
  }
}), nc = /* @__PURE__ */ M({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = w(() => typeof e.to == "string" && e.to.startsWith("http")), n = w(() => a.value ? "a" : "RouterLink"), l = w(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (r, o) => (i(), R(oe(n.value), q({
      "aria-current": r.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: G(() => [
        A(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), oc = { class: "fr-skiplinks" }, rc = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, ic = { class: "fr-skiplinks__list" }, sc = ["href", "onClick"], uc = /* @__PURE__ */ M({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(t) {
    const e = (a) => {
      const n = document.getElementById(a);
      n == null || n.focus();
    };
    return (a, n) => (i(), f("div", oc, [
      d("nav", rc, [
        d("ul", ic, [
          (i(!0), f(K, null, W(a.links, (l) => (i(), f("li", {
            key: l.id
          }, [
            d("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: U((r) => e(l.id), ["prevent"])
            }, b(l.text), 9, sc)
          ]))), 128))
        ])
      ])
    ]));
  }
}), dc = { class: "fr-stepper" }, cc = { class: "fr-stepper__title" }, fc = { class: "fr-stepper__state" }, pc = ["data-fr-current-step", "data-fr-steps"], vc = { class: "fr-stepper__details" }, mc = {
  key: 0,
  class: "fr-text--bold"
}, gc = /* @__PURE__ */ M({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (i(), f("div", dc, [
      d("h2", cc, [
        j(b(e.steps[e.currentStep - 1]) + " ", 1),
        d("span", fc, "Étape " + b(e.currentStep) + " sur " + b(e.steps.length), 1)
      ]),
      d("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, pc),
      d("p", vc, [
        e.currentStep < e.steps.length ? (i(), f("span", mc, "Étape suivante :")) : h("", !0),
        j(" " + b(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), bc = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, hc = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, yc = { class: "fr-summary__list" }, kc = ["href"], wc = /* @__PURE__ */ M({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("nav", bc, [
      d("h2", hc, b(e.title), 1),
      d("ol", yc, [
        (i(!0), f(K, null, W(e.anchors, (n, l) => (i(), f("li", { key: l }, [
          d("a", {
            class: "fr-summary__link",
            href: n.link
          }, b(n.name), 9, kc)
        ]))), 128))
      ])
    ]));
  }
}), _c = ["id", "aria-labelledby", "tabindex"], Ic = /* @__PURE__ */ M({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(t) {
    sa((u) => ({
      "7152af7e": o.value,
      "2a62e962": s.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, n = De(Ge), { isVisible: l, asc: r } = n($e(() => e.tabId)), o = w(() => a[String(r == null ? void 0 : r.value)]), s = w(() => a[String(!(r != null && r.value))]);
    return (u, c) => (i(), R(cl, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: G(() => [
        ve(d("div", {
          id: u.panelId,
          class: N(["fr-tabs__panel", {
            "fr-tabs__panel--selected": F(l)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: F(l) ? 0 : -1
        }, [
          A(u.$slots, "default", {}, void 0, !0)
        ], 10, _c), [
          [ia, F(l)]
        ])
      ]),
      _: 3
    }));
  }
}), Wa = /* @__PURE__ */ re(Ic, [["__scopeId", "data-v-5774b16c"]]), Dc = { role: "presentation" }, Bc = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Cc = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Ua = /* @__PURE__ */ M({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = O(null), r = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      ArrowDown: "next",
      ArrowUp: "previous",
      Home: "first",
      End: "last"
    };
    function o(c) {
      const p = c == null ? void 0 : c.key, g = r[p];
      g && n(g);
    }
    const s = De(Ge), { isVisible: u } = s($e(() => a.tabId));
    return (c, p) => (i(), f("li", Dc, [
      d("button", {
        id: c.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${c.tabId}`,
        class: "fr-tabs__tab",
        tabindex: F(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": F(u),
        "aria-controls": c.panelId,
        onClick: p[0] || (p[0] = U((g) => c.$emit("click", c.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (g) => o(g))
      }, [
        c.icon ? (i(), f("span", Cc, [
          X(le, { name: c.icon }, null, 8, ["name"])
        ])) : h("", !0),
        A(c.$slots, "default")
      ], 40, Bc)
    ]));
  }
}), Xa = /* @__PURE__ */ M({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = w(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, r) => (i(), f("th", q(l.headerAttrs, { scope: "col" }), [
      j(b(l.header) + " ", 1),
      l.icon && !a.value ? (i(), R(le, ue(q({ key: 0 }, n.value)), null, 16)) : h("", !0),
      a.value ? (i(), f("span", {
        key: 1,
        class: N({ [String(l.icon)]: a.value })
      }, null, 2)) : h("", !0)
    ], 16));
  }
}), xc = { key: 0 }, Ya = /* @__PURE__ */ M({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (i(), f("tr", xc, [
      (i(!0), f(K, null, W(e.headers, (n, l) => (i(), R(Xa, {
        key: l,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : h("", !0);
  }
}), Za = /* @__PURE__ */ M({
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
    return (l, r) => (i(), f("td", ue(gt(l.cellAttrs)), [
      a.value ? (i(), R(oe(a.value), ue(q({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: G(() => [
          j(b(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(K, { key: 1 }, [
        j(b(n.value ? l.field : l.field.text), 1)
      ], 64))
    ], 16));
  }
}), Ja = /* @__PURE__ */ M({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(t) {
    return (e, a) => (i(), f("tr", ue(gt(e.rowAttrs)), [
      A(e.$slots, "default"),
      (i(!0), f(K, null, W(e.rowData, (n, l) => (i(), R(Za, {
        key: l,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Tc = { class: "caption" }, Ec = { key: 1 }, Sc = ["colspan"], Lc = { class: "flex justify-right" }, Ac = { class: "self-center" }, Mc = ["value"], $c = { class: "flex ml-1" }, Fc = { class: "self-center" }, Pc = { class: "flex ml-1" }, Rc = /* @__PURE__ */ M({
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
    const a = t, n = e, l = (v) => Array.isArray(v) ? v : v.rowData, r = O(a.currentPage), o = O(a.resultsDisplayed), s = O(
      a.rows.length > o.value ? Math.ceil(a.rows.length / o.value) : 1
    ), u = [5, 10, 25, 50, 100], c = () => r.value * o.value - o.value, p = () => r.value * o.value;
    ae(
      () => o.value,
      (v) => {
        s.value = a.rows.length > o.value ? Math.ceil(a.rows.length / v) : 1;
      }
    );
    const g = w(() => a.pagination ? a.rows.slice(c(), p()) : a.rows), _ = () => {
      r.value = 1, n("update:currentPage");
    }, C = () => {
      r.value > 1 && (r.value -= 1, n("update:currentPage"));
    }, B = () => {
      r.value < s.value && (r.value += 1, n("update:currentPage"));
    }, P = () => {
      r.value = s.value, n("update:currentPage");
    };
    return (v, S) => (i(), f("div", {
      class: N(["fr-table", { "fr-table--no-caption": v.noCaption }])
    }, [
      d("table", null, [
        d("caption", Tc, b(v.title), 1),
        d("thead", null, [
          A(v.$slots, "header", {}, () => [
            v.headers && v.headers.length ? (i(), R(Ya, {
              key: 0,
              headers: v.headers
            }, null, 8, ["headers"])) : h("", !0)
          ], !0)
        ]),
        d("tbody", null, [
          A(v.$slots, "default", {}, void 0, !0),
          v.rows && v.rows.length ? (i(!0), f(K, { key: 0 }, W(g.value, (x, L) => (i(), R(Ja, {
            key: v.rowKey && l(x) ? typeof v.rowKey == "string" ? l(x)[v.headers.indexOf(v.rowKey)].toString() : v.rowKey(l(x)) : L,
            "row-data": l(x),
            "row-attrs": "rowAttrs" in x ? x.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : h("", !0),
          v.pagination ? (i(), f("tr", Ec, [
            d("td", {
              colspan: v.headers.length
            }, [
              d("div", Lc, [
                d("div", Ac, [
                  S[6] || (S[6] = d("span", null, "Résultats par page : ", -1)),
                  ve(d("select", {
                    "onUpdate:modelValue": S[0] || (S[0] = (x) => o.value = x),
                    onChange: S[1] || (S[1] = (x) => n("update:currentPage"))
                  }, [
                    (i(), f(K, null, W(u, (x, L) => d("option", {
                      key: L,
                      value: x
                    }, b(x), 9, Mc)), 64))
                  ], 544), [
                    [ht, o.value]
                  ])
                ]),
                d("div", $c, [
                  d("span", Fc, "Page " + b(r.value) + " sur " + b(s.value), 1)
                ]),
                d("div", Pc, [
                  d("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: S[2] || (S[2] = (x) => _())
                  }),
                  d("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: S[3] || (S[3] = (x) => C())
                  }),
                  d("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: S[4] || (S[4] = (x) => B())
                  }),
                  d("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: S[5] || (S[5] = (x) => P())
                  })
                ])
              ])
            ], 8, Sc)
          ])) : h("", !0)
        ])
      ])
    ], 2));
  }
}), Nc = /* @__PURE__ */ re(Rc, [["__scopeId", "data-v-3998acc8"]]), Vc = ["aria-label"], jc = /* @__PURE__ */ M({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: e, emit: a }) {
    const n = t, l = a, r = O(!1), o = w({
      get: () => n.modelValue,
      set(D) {
        l("update:modelValue", D);
      }
    }), s = O(/* @__PURE__ */ new Map()), u = O(0);
    ge(Ge, (D) => {
      const I = O(!0);
      if (ae(o, (y, Q) => {
        I.value = y > Q;
      }), [...s.value.values()].includes(D.value))
        return { isVisible: w(() => s.value.get(o.value) === D.value), asc: I };
      const m = u.value++;
      s.value.set(m, D.value);
      const T = w(() => m === o.value);
      return ae(D, () => {
        s.value.set(m, D.value);
      }), fe(() => {
        s.value.delete(m);
      }), { isVisible: T };
    });
    const c = O(null), p = O(null), g = sl({}), _ = (D) => {
      if (g[D])
        return g[D];
      const I = J("tab");
      return g[D] = I, I;
    }, C = async () => {
      const D = o.value === 0 ? n.tabTitles.length - 1 : o.value - 1;
      r.value = !1, o.value = D;
    }, B = async () => {
      const D = o.value === n.tabTitles.length - 1 ? 0 : o.value + 1;
      r.value = !0, o.value = D;
    }, P = async () => {
      o.value = 0;
    }, v = async () => {
      o.value = n.tabTitles.length - 1;
    }, S = O({ "--tabs-height": "100px" }), x = () => {
      var D;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const I = p.value.offsetHeight, m = (D = c.value) == null ? void 0 : D.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!m || !m.offsetHeight)
        return;
      const T = m.offsetHeight;
      S.value["--tabs-height"] = `${I + T}px`;
    }, L = O(null);
    return ne(() => {
      var D;
      window.ResizeObserver && (L.value = new window.ResizeObserver(() => {
        x();
      })), (D = c.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((I) => {
        var m;
        I && ((m = L.value) == null || m.observe(I));
      });
    }), fe(() => {
      var D;
      (D = c.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((I) => {
        var m;
        I && ((m = L.value) == null || m.unobserve(I));
      });
    }), e({
      renderTabs: x,
      selectFirst: P,
      selectLast: v
    }), (D, I) => (i(), f("div", {
      ref_key: "$el",
      ref: c,
      class: "fr-tabs",
      style: de(S.value)
    }, [
      d("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": D.tabListName
      }, [
        A(D.$slots, "tab-items", {}, () => [
          (i(!0), f(K, null, W(D.tabTitles, (m, T) => (i(), R(Ua, {
            key: T,
            icon: m.icon,
            "panel-id": m.panelId || `${_(T)}-panel`,
            "tab-id": m.tabId || _(T),
            onClick: (y) => o.value = T,
            onNext: I[0] || (I[0] = (y) => B()),
            onPrevious: I[1] || (I[1] = (y) => C()),
            onFirst: I[2] || (I[2] = (y) => P()),
            onLast: I[3] || (I[3] = (y) => v())
          }, {
            default: G(() => [
              j(b(m.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, Vc),
      (i(!0), f(K, null, W(D.tabContents, (m, T) => {
        var y, Q, k, E;
        return i(), R(Wa, {
          key: T,
          "panel-id": ((Q = (y = D.tabTitles) == null ? void 0 : y[T]) == null ? void 0 : Q.panelId) || `${_(T)}-panel`,
          "tab-id": ((E = (k = D.tabTitles) == null ? void 0 : k[T]) == null ? void 0 : E.tabId) || _(T)
        }, {
          default: G(() => [
            j(b(m), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      A(D.$slots, "default")
    ], 4));
  }
}), Oc = /* @__PURE__ */ M({
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
    const e = t, a = w(() => typeof e.link == "string" && e.link.startsWith("http")), n = w(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = w(() => ({ [a.value ? "href" : "to"]: e.link })), r = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), o = e.small ? 0.65 : 0.9, s = w(() => r.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: o } : { scale: o, ...e.icon ?? {} });
    return (u, c) => (i(), R(oe(n.value), q({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: r.value,
        "fr-tag--icon-left": r.value
      }],
      disabled: u.disabled
    }, l.value), {
      default: G(() => [
        e.icon && !r.value ? (i(), R(le, q({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : h("", !0),
        u.iconOnly ? h("", !0) : (i(), f(K, { key: 1 }, [
          j(b(u.label), 1)
        ], 64)),
        A(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), Lt = /* @__PURE__ */ re(Oc, [["__scopeId", "data-v-f6a89dc8"]]), Hc = { class: "fr-tags-group" }, qc = /* @__PURE__ */ M({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("ul", Hc, [
      (i(!0), f(K, null, W(e.tags, ({ icon: n, label: l, ...r }, o) => (i(), f("li", { key: o }, [
        X(Lt, q({ ref_for: !0 }, r, {
          icon: n,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), Kc = { class: "fr-tile__body" }, zc = { class: "fr-tile__content" }, Qc = ["download", "href"], Gc = {
  key: 0,
  class: "fr-tile__desc"
}, Wc = {
  key: 1,
  class: "fr-tile__detail"
}, Uc = {
  key: 2,
  class: "fr-tile__start"
}, Xc = { class: "fr-tile__header" }, Yc = {
  key: 0,
  class: "fr-tile__pictogram"
}, Zc = ["src"], Jc = ["href"], ef = ["href"], tf = ["href"], af = /* @__PURE__ */ M({
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
        class: N(["fr-tile fr-enlarge-link", [{
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
        d("div", Kc, [
          d("div", zc, [
            (i(), R(oe(l.titleTag), { class: "fr-tile__title" }, {
              default: G(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, b(l.title), 9, Qc)) : h("", !0),
                n.value ? h("", !0) : (i(), R(o, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: G(() => [
                    j(b(l.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            l.description ? (i(), f("p", Gc, b(l.description), 1)) : h("", !0),
            l.details ? (i(), f("p", Wc, b(l.details), 1)) : h("", !0),
            l.$slots["start-details"] ? (i(), f("div", Uc, [
              A(l.$slots, "start-details", {}, void 0, !0)
            ])) : h("", !0)
          ])
        ]),
        d("div", Xc, [
          A(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (i(), f("div", Yc, [
            l.imgSrc ? (i(), f("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Zc)) : (i(), f("svg", q({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...a, ...l.svgAttrs }), [
              d("use", {
                class: "fr-artwork-decorative",
                href: `${l.svgPath}#artwork-decorative`
              }, null, 8, Jc),
              d("use", {
                class: "fr-artwork-minor",
                href: `${l.svgPath}#artwork-minor`
              }, null, 8, ef),
              d("use", {
                class: "fr-artwork-major",
                href: `${l.svgPath}#artwork-major`
              }, null, 8, tf)
            ], 16))
          ])) : h("", !0)
        ])
      ], 2);
    };
  }
}), el = /* @__PURE__ */ re(af, [["__scopeId", "data-v-f4d836a2"]]), lf = { class: "fr-grid-row fr-grid-row--gutters" }, nf = /* @__PURE__ */ M({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("div", lf, [
      (i(!0), f(K, null, W(e.tiles, (n, l) => (i(), f("div", {
        key: l,
        class: N({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        X(el, q({
          horizontal: e.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), of = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], rf = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], sf = ["id"], uf = /* @__PURE__ */ M({
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
      class: N(["fr-toggle", {
        "fr-toggle--label-left": n.labelLeft,
        "fr-toggle--border-bottom": n.borderBottom
      }])
    }, [
      d("input", {
        id: n.inputId,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        type: "checkbox",
        checked: n.modelValue,
        "data-testid": n.inputId,
        class: "fr-toggle__input",
        "aria-describedby": a.value,
        onInput: l[0] || (l[0] = (r) => n.$emit("update:modelValue", r.target.checked))
      }, null, 40, of),
      d("label", {
        id: a.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, b(n.label), 9, rf),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, b(n.hint), 9, sf)) : h("", !0)
    ], 2));
  }
}), df = ["id"], cf = /* @__PURE__ */ M({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => J("tooltip") }
  },
  setup(t) {
    const e = t, a = O(!1), n = O(null), l = O(null), r = O("0px"), o = O("0px"), s = O("0px"), u = O(!1), c = O(0);
    async function p() {
      var x, L, D, I, m, T;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((ee) => setTimeout(ee, 100));
      const y = (x = n.value) == null ? void 0 : x.getBoundingClientRect().top, Q = (L = n.value) == null ? void 0 : L.offsetHeight, k = (D = n.value) == null ? void 0 : D.offsetWidth, E = (I = n.value) == null ? void 0 : I.getBoundingClientRect().left, H = (m = l.value) == null ? void 0 : m.offsetHeight, $ = (T = l.value) == null ? void 0 : T.offsetWidth, V = !(y - H < 0) && y + Q + H >= document.documentElement.offsetHeight;
      u.value = V;
      const z = E + k >= document.documentElement.offsetWidth, Z = E + k / 2 - $ / 2 <= 0;
      o.value = V ? `${y - H + 8}px` : `${y + Q - 8}px`, c.value = 1, r.value = z ? `${E + k - $ - 4}px` : Z ? `${E + 4}px` : `${E + k / 2 - $ / 2}px`, s.value = z ? `${$ / 2 - k / 2 + 4}px` : Z ? `${-($ / 2) + k / 2 - 4}px` : "0px";
    }
    ae(a, p, { immediate: !0 }), ne(() => {
      window.addEventListener("scroll", p);
    }), fe(() => {
      window.removeEventListener("scroll", p);
    });
    const g = w(() => `transform: translate(${r.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${c.value};'`), _ = w(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), C = (x) => {
      var L, D;
      a.value && (x.target === n.value || (L = n.value) != null && L.contains(x.target) || x.target === l.value || (D = l.value) != null && D.contains(x.target) || (a.value = !1));
    }, B = (x) => {
      x.key === "Escape" && (a.value = !1);
    };
    ne(() => {
      document.documentElement.addEventListener("click", C), document.documentElement.addEventListener("keydown", B);
    }), fe(() => {
      document.documentElement.removeEventListener("click", C), document.documentElement.removeEventListener("keydown", B);
    });
    const P = () => {
      e.onHover && (a.value = !0);
    }, v = () => {
      e.onHover && (a.value = !1);
    }, S = () => {
      e.onHover || (a.value = !a.value);
    };
    return (x, L) => (i(), f(K, null, [
      (i(), R(oe(x.onHover ? "a" : "button"), {
        id: `link-${x.id}`,
        ref_key: "source",
        ref: n,
        class: N(x.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": x.id,
        href: x.onHover ? "#" : void 0,
        onClick: L[0] || (L[0] = U((D) => S(), ["stop"])),
        onMouseenter: L[1] || (L[1] = (D) => P()),
        onMouseleave: L[2] || (L[2] = (D) => v()),
        onFocus: L[3] || (L[3] = (D) => P()),
        onBlur: L[4] || (L[4] = (D) => v())
      }, {
        default: G(() => [
          A(x.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      d("span", {
        id: x.id,
        ref_key: "tooltip",
        ref: l,
        class: N(["fr-tooltip fr-placement", _.value]),
        style: de(g.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, b(x.content), 15, df)
    ], 64));
  }
}), ff = /* @__PURE__ */ re(cf, [["__scopeId", "data-v-67870551"]]), pf = { class: "fr-transcription" }, vf = ["aria-expanded", "aria-controls"], mf = ["id"], gf = ["id", "aria-labelledby"], bf = { class: "fr-container fr-container--fluid fr-container-md" }, hf = { class: "fr-grid-row fr-grid-row--center" }, yf = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, kf = { class: "fr-modal__body" }, wf = { class: "fr-modal__header" }, _f = ["aria-controls"], If = { class: "fr-modal__content" }, Df = ["id"], Bf = { class: "fr-transcription__footer" }, Cf = { class: "fr-transcription__actions-group" }, xf = ["aria-controls"], tl = /* @__PURE__ */ M({
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
    } = be(), s = O(!1), u = O(!1), c = w(() => `fr-transcription__modal-${e.id}`), p = w(() => `fr-transcription__collapse-${e.id}`);
    return ae(u, (g, _) => {
      g !== _ && r(g);
    }), (g, _) => (i(), f("div", pf, [
      d("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: _[0] || (_[0] = (C) => u.value = !u.value)
      }, " Transcription ", 8, vf),
      d("div", {
        id: p.value,
        ref_key: "collapse",
        ref: a,
        class: N(["fr-collapse", { "fr-collapse--expanded": F(l), "fr-collapsing": F(n) }]),
        onTransitionend: _[2] || (_[2] = (C) => F(o)(u.value))
      }, [
        d("dialog", {
          id: c.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${c.value}-title`
        }, [
          d("div", bf, [
            d("div", hf, [
              d("div", yf, [
                d("div", kf, [
                  d("div", wf, [
                    d("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": c.value,
                      title: "Fermer"
                    }, " Fermer ", 8, _f)
                  ]),
                  d("div", If, [
                    d("h1", {
                      id: `${c.value}-title`,
                      class: "fr-modal__title"
                    }, b(g.title), 9, Df),
                    j(" " + b(g.content), 1)
                  ]),
                  d("div", Bf, [
                    d("div", Cf, [
                      d("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": c.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: _[1] || (_[1] = (C) => s.value = !0)
                      }, " Agrandir ", 8, xf)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, gf)
      ], 42, mf),
      (i(), R(ul, { to: "body" }, [
        X(Ra, {
          title: g.title,
          opened: s.value,
          onClose: _[3] || (_[3] = (C) => s.value = !1)
        }, {
          default: G(() => [
            A(g.$slots, "default", {}, () => [
              j(b(g.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Tf = ["src"], Ef = { class: "fr-content-media__caption" }, Sf = /* @__PURE__ */ M({
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
    return (e, a) => (i(), f(K, null, [
      d("figure", {
        class: N(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        d("div", {
          class: N(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          d("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Tf)
        ], 2),
        d("div", Ef, b(e.legend), 1)
      ], 2),
      X(tl, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Lf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: hl,
  DsfrAccordionsGroup: kl,
  DsfrAlert: Il,
  DsfrBackToTop: Dl,
  DsfrBadge: da,
  DsfrBreadcrumb: Ll,
  DsfrButton: Fe,
  DsfrButtonGroup: Ye,
  DsfrCallout: qn,
  DsfrCard: lo,
  DsfrCardDetail: ft,
  DsfrCheckbox: xt,
  DsfrCheckboxSet: mo,
  DsfrConsent: yo,
  DsfrDataTable: er,
  DsfrErrorPage: sr,
  DsfrFieldset: pr,
  DsfrFileDownload: Ca,
  DsfrFileDownloadList: hr,
  DsfrFileUpload: Br,
  DsfrFollow: Qr,
  DsfrFooter: _i,
  DsfrFooterLink: Ea,
  DsfrFooterLinkList: Ci,
  DsfrFooterPartners: Sa,
  DsfrFranceConnect: Si,
  DsfrHeader: bs,
  DsfrHeaderMenuLink: St,
  DsfrHeaderMenuLinks: pt,
  DsfrHighlight: hs,
  DsfrInput: Et,
  DsfrInputGroup: Ds,
  DsfrLanguageSelector: Ae,
  DsfrLogo: Le,
  DsfrModal: Ra,
  DsfrNavigation: Su,
  DsfrNavigationItem: Na,
  DsfrNavigationMegaMenu: ja,
  DsfrNavigationMegaMenuCategory: Va,
  DsfrNavigationMenu: Ha,
  DsfrNavigationMenuItem: Oa,
  DsfrNavigationMenuLink: Ze,
  DsfrNewsLetter: xa,
  DsfrNotice: Fu,
  DsfrPagination: Tt,
  DsfrPicture: ju,
  DsfrQuote: Wu,
  DsfrRadioButton: qa,
  DsfrRadioButtonSet: cd,
  DsfrRange: _d,
  DsfrSearchBar: Me,
  DsfrSegmented: Ka,
  DsfrSegmentedSet: Ad,
  DsfrSelect: jd,
  DsfrShare: Wd,
  DsfrSideMenu: lc,
  DsfrSideMenuButton: za,
  DsfrSideMenuLink: nc,
  DsfrSideMenuList: Ga,
  DsfrSideMenuListItem: Qa,
  DsfrSkipLinks: uc,
  DsfrSocialNetworks: Ta,
  DsfrStepper: gc,
  DsfrSummary: wc,
  DsfrTabContent: Wa,
  DsfrTabItem: Ua,
  DsfrTable: Nc,
  DsfrTableCell: Za,
  DsfrTableHeader: Xa,
  DsfrTableHeaders: Ya,
  DsfrTableRow: Ja,
  DsfrTabs: jc,
  DsfrTag: Lt,
  DsfrTags: qc,
  DsfrTile: el,
  DsfrTiles: nf,
  DsfrToggleSwitch: uf,
  DsfrTooltip: ff,
  DsfrTranscription: tl,
  DsfrVideo: Sf,
  VIcon: le,
  registerAccordionKey: yt,
  registerNavigationLinkKey: kt,
  registerTabKey: Ge
}, Symbol.toStringTag, { value: "Module" })), Af = {
  install: (t, { components: e } = {}) => {
    Object.entries(Lf).forEach(([a, n]) => {
      (e === void 0 || e === "all" || e.map(({ name: l }) => l).includes(a)) && t.component(a, n);
    }), t.component("VIcon", le);
  }
}, Mf = {
  _searchAndFilterList: function(t, e, a, n, l) {
    let r = this.$data.vueData[t];
    if (n && (r = r.filter(n)), l != null && l.trim() !== "") {
      const o = this.unaccentLower(l);
      r = r.filter((s) => this.unaccentLower(s[a].toString()).indexOf(o) > -1);
    }
    return r;
  },
  dsfrTransformListForSelection: function(t, e, a, n, l, r) {
    let s = this._searchAndFilterList(t, e, a, l, r).map(function(u) {
      return { value: u[e], text: u[a].toString() };
    });
    return n != null && n !== "" && s.unshift({ value: "", text: n }), s;
  },
  dsfrTransformListForRadio: function(t, e, a, n, l, r, o) {
    return this._searchAndFilterList(t, e, a, r, o).map(function(u) {
      return {
        value: u[e],
        label: u[a].toString(),
        hint: u[l],
        disabled: u[n]
      };
    });
  },
  dsfrTransformListForCheckbox: function(t, e, a, n, l, r, o, s) {
    return this._searchAndFilterList(t, e, a, o, s).map(function(c) {
      return {
        value: c[e],
        label: c[a].toString(),
        name: r,
        hint: c[l],
        disabled: c[n]
      };
    });
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var t, e;
    (e = (t = this.componentStates) == null ? void 0 : t.dsfrHeader) == null || e.navItems.filter((a) => a.title).forEach((a) => {
      a.active = a.links.some((n) => window.location.pathname.startsWith(n.to));
    });
  }
}, $f = ["href", "aria-current"], Ff = {
  __name: "RouterLink",
  props: ["to"],
  setup(t) {
    const e = t, a = e.to === "/" ? window.location.pathname === e.to : window.location.pathname.startsWith(e.to);
    return (n, l) => (i(), f("a", {
      href: e.to,
      "aria-current": F(a) ? "page" : void 0
    }, [
      A(n.$slots, "default")
    ], 8, $f));
  }
}, he = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, Pf = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: xt, DsfrTag: Lt, DsfrButton: Fe },
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
}, Rf = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, Nf = { class: "fr-mb-1w fr-text--md" }, Vf = { key: 0 }, jf = { class: "facet" }, Of = { class: "flex justify-between w-full fr-mb-0" }, Hf = { class: "facet--count" }, qf = { key: 1 }, Kf = { class: "flex justify-between w-full" }, zf = { class: "facet--count" }, Qf = { key: 0 }, Gf = { class: "facet" }, Wf = { class: "flex justify-between w-full fr-mb-0" }, Uf = { class: "facet--count" }, Xf = { key: 1 }, Yf = { class: "flex justify-between w-full" }, Zf = { class: "facet--count" }, Jf = { class: "fr-mb-2w" };
function ep(t, e, a, n, l, r) {
  const o = ie("DsfrTag"), s = ie("DsfrCheckbox"), u = ie("DsfrButton");
  return i(), f("div", null, [
    r.isAnyFacetValueSelected() ? (i(), f("div", Rf, [
      (i(!0), f(K, null, W(a.selectedFacets, (c, p) => (i(), f(K, { key: p }, [
        r.facetMultipleByCode(p) ? h("", !0) : (i(!0), f(K, { key: 0 }, W(c, (g) => (i(), R(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: g.code,
          onClick: (_) => t.$emit("toogle-facet", p, g, a.contextKey)
        }, {
          default: G(() => [
            j(b(r.facetLabelByCode(p)) + ": " + b(r.facetValueLabelByCode(p, g)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : h("", !0),
    (i(!0), f(K, null, W(a.facets, (c) => (i(), f("div", {
      key: c.code,
      class: "facets"
    }, [
      c.multiple || !r.isFacetSelected(c.code) ? (i(), f(K, { key: 0 }, [
        d("h6", Nf, b(c.label), 1),
        d("ul", null, [
          (i(!0), f(K, null, W(r.selectedInvisibleFacets(c.code), (p) => (i(), f(K, {
            key: p.code
          }, [
            c.multiple ? (i(), f("li", Vf, [
              d("div", jf, [
                X(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (g) => t.$emit("toogle-facet", c.code, p.code, a.contextKey)
                }, {
                  label: G(() => [
                    d("p", Of, [
                      j(b(r.facetValueLabelByCode(c.code, p.code)) + " ", 1),
                      d("span", Hf, b(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", qf, [
              X(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (g) => t.$emit("toogle-facet", c.code, p.code, a.contextKey)
              }, {
                default: G(() => [
                  d("span", Kf, [
                    j(b(r.facetValueLabelByCode(c.code, p.code)) + " ", 1),
                    d("span", zf, b(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        d("ul", null, [
          (i(!0), f(K, null, W(r.visibleFacets(c.code, c.values), (p) => (i(), f(K, {
            key: p.code
          }, [
            c.multiple ? (i(), f("li", Qf, [
              d("div", Gf, [
                X(s, {
                  small: "",
                  modelValue: r.isFacetValueSelected(c.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (g) => t.$emit("toogle-facet", c.code, p.code, a.contextKey)
                }, {
                  label: G(() => [
                    d("p", Wf, [
                      j(b(r.facetValueLabelByCode(c.code, p.code)) + " ", 1),
                      d("span", Uf, b(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", Xf, [
              X(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (g) => t.$emit("toogle-facet", c.code, p.code, a.contextKey)
              }, {
                default: G(() => [
                  d("span", Yf, [
                    j(b(r.facetValueLabelByCode(c.code, p.code)) + " ", 1),
                    d("span", Zf, b(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        d("div", Jf, [
          c.values.length > a.maxValues && !r.isFacetExpanded(c.code) ? (i(), R(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => r.expandFacet(c.code)
          }, {
            default: G(() => [
              j(b(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : h("", !0),
          c.values.length > a.maxValues && r.isFacetExpanded(c.code) ? (i(), R(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => r.reduceFacet(c.code)
          }, {
            default: G(() => [
              j(b(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : h("", !0)
        ])
      ], 64)) : h("", !0)
    ]))), 128))
  ]);
}
const tp = /* @__PURE__ */ he(Pf, [["render", ep], ["__scopeId", "data-v-0be4e596"]]), At = () => {
  const t = O(), e = O(!1), a = O(!1), n = () => {
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
}, ap = "abcdefghijklmnopqrstuvwyz0123456789", ra = ap.repeat(10), lp = () => {
  const t = Math.floor(Math.random() * ra.length);
  return ra[t];
}, np = (t) => Array.from({ length: t }).map(lp).join(""), Be = (t = "", e = "") => (t ? `${t}-` : "") + np(5) + (e ? `-${e}` : ""), op = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], rp = ["id", "aria-labelledby", "onKeydown"], ip = {
  class: "fr-menu__list",
  role: "none"
}, sp = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Be("menu") },
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 },
    tertiary: { type: Boolean, default: !1 }
  },
  setup(t, { expose: e }) {
    const {
      collapse: a,
      collapsing: n,
      cssExpanded: l,
      doExpand: r,
      onTransitionEnd: o
    } = At(), s = t, u = O(null), c = O(!1);
    let p = O(0), g = [];
    ge("menuItem", { menuItemIndex: p, addMenuItem: (D, I) => {
      p.value += 1, g.push(`${D}@${I}`);
    } }), ge("id", s.id), ae(c, (D, I) => {
      D !== I && (r(D), D ? (setTimeout(() => P(), 100), document.addEventListener("click", x), document.addEventListener("touchstart", x)) : (document.removeEventListener("click", x), document.removeEventListener("touchstart", x)));
    });
    const C = (D, I) => {
      const m = I === "down" ? (D + 1) % g.length : (D - 1 + g.length) % g.length, T = document.getElementById(`${s.id}_item_${m}`);
      return T.ariaDisabled === "true" ? C(m, I) : T;
    }, B = (D) => {
      const I = document.activeElement.id, m = I.startsWith(`${s.id}_item_`) ? Number(I.split("_")[2]) : D === "down" ? -1 : 0;
      C(m, D).focus();
    }, P = (D) => B("down"), v = (D) => B("up");
    let S = (D) => {
      let I = D.key;
      if (I.length > 1 && I.match(/\S/))
        return;
      I = I.toLowerCase();
      let m = g.filter((y) => y.toLowerCase().startsWith(I)), T = document.activeElement.id;
      for (let y of m) {
        let Q = y.split("@")[1], k = document.getElementById(`${s.id}_item_${Q}`);
        if (T !== k.id) {
          k.focus();
          break;
        }
      }
    }, x = (D) => {
      u.value.contains(D.target) || (c.value = !1);
    };
    function L() {
      c.value = !1;
    }
    return e({ closeMenu: L }), (D, I) => (i(), f("div", {
      class: "relative-position",
      onKeydown: I[9] || (I[9] = Y(
        //@ts-ignore
        (...m) => F(x) && F(x)(...m),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      d("button", q({
        id: D.id,
        onClick: I[0] || (I[0] = U((m) => c.value = !c.value, ["prevent", "stop"])),
        onKeyup: [
          I[1] || (I[1] = Y(U((m) => c.value = !1, ["stop"]), ["esc"])),
          I[2] || (I[2] = Y(U((m) => c.value = !c.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Y(U(P, ["prevent"]), ["down"]),
          Y(U(v, ["prevent"]), ["up"]),
          I[3] || (I[3] = //@ts-ignore
          (...m) => F(S) && F(S)(...m)),
          I[4] || (I[4] = Y((m) => c.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          "fr-btn--secondary": D.secondary,
          "fr-btn--tertiary": D.tertiary
        }],
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": D.disabled,
        "aria-controls": `${D.id}_menu`,
        "aria-expanded": c.value
      }, D.$attrs), [
        D.icon !== "" ? (i(), R(F(le), {
          key: 0,
          class: "fr-mr-2v",
          name: D.icon
        }, null, 8, ["name"])) : h("", !0),
        d("span", null, b(D.label), 1)
      ], 16, op),
      d("div", {
        id: `${D.id}_menu`,
        ref_key: "collapse",
        ref: a,
        class: N(["fr-collapse fr-menu", { "fr-collapse--expanded": F(l), "fr-collapsing": F(n) }]),
        role: "menu",
        "aria-labelledby": D.id,
        onKeyup: I[5] || (I[5] = Y((m) => c.value = !1, ["esc"])),
        onKeydown: [
          I[6] || (I[6] = Y((m) => c.value = !1, ["tab"])),
          Y(U(P, ["prevent"]), ["down"]),
          Y(U(v, ["prevent"]), ["up"]),
          I[7] || (I[7] = //@ts-ignore
          (...m) => F(S) && F(S)(...m))
        ],
        onTransitionend: I[8] || (I[8] = (m) => F(o)(c.value))
      }, [
        d("ul", ip, [
          A(D.$slots, "default", {}, void 0, !0)
        ])
      ], 42, rp)
    ], 544));
  }
}), up = /* @__PURE__ */ he(sp, [["__scopeId", "data-v-089ea365"]]), dp = { role: "none" }, cp = ["id", "href"], fp = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(t) {
    const e = t, { menuItemIndex: a, addMenuItem: n } = De("menuItem"), l = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), r = `fr-btn fr-btn--secondary fr-nav__link ${l ? e.icon : ""} fr-btn--icon-left`, o = De("id"), s = a.value;
    return n(e.label, s), (u, c) => {
      const p = ie("dsfr-button"), g = ie("v-icon");
      return i(), f("li", dp, [
        u.url === "" ? (i(), R(p, q({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${F(o)}_item_${F(s)}`,
          icon: u.icon,
          secondary: "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", q({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${F(o)}_item_${F(s)}`,
          href: u.url,
          class: r
        }, u.$attrs), [
          l.value ? h("", !0) : (i(), R(g, {
            key: 0,
            name: u.icon
          }, null, 8, ["name"])),
          j(" " + b(u.label), 1)
        ], 16, cp))
      ]);
    };
  }
}), pp = /* @__PURE__ */ he(fp, [["__scopeId", "data-v-ca9ed6c2"]]), vp = ["for", "id"], mp = {
  key: 0,
  class: "required"
}, gp = {
  key: 0,
  class: "fr-hint-text"
}, bp = ["id", "onKeydown", "aria-labelledby", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], hp = ["id", "onKeydown"], yp = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, kp = ["id"], wp = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, _p = ["id"], Ip = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, Dp = {
  key: 0,
  class: "fr-hint-text"
}, Bp = {
  role: "listbox",
  "aria-multiselectable": "true",
  class: "fr-select__ul"
}, Cp = ["aria-selected"], xp = ["id", "data-id", "value"], Tp = ["for"], Ep = ["id"], Sp = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ ke({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Be("select-multiple") },
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
    } = At(), o = t, s = O(!1), u = se(t, "modelValue"), c = O(o.options);
    ae(s, ($, V) => {
      $ !== V && (l($), $ ? (document.addEventListener("click", H), document.addEventListener("touchstart", H)) : (document.removeEventListener("click", H), document.removeEventListener("touchstart", H)));
    });
    const p = O(null), g = O(null), _ = O(null), C = w(() => o.errorMessage || o.successMessage), B = w(() => o.errorMessage !== "" ? "error" : "valid"), P = w(() => o.modelValue.length === c.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), v = w(() => o.modelValue.length === c.value.length ? "Tout déselectionner" : "Tout sélectionner"), S = w(() => {
      let $ = `${o.modelValue.length} options séléctionnées`;
      return o.modelValue.length > 2 ? $ : o.options.filter((V) => o.modelValue.includes(V.value)).map((V) => V.text).join(", ");
    });
    let x = function() {
      if (o.modelValue.length >= c.value.length)
        o.modelValue.length = 0;
      else
        for (let $ of c.value)
          o.modelValue.push($.value);
    }, L = function($) {
      const V = $.target.value.toLowerCase();
      c.value = o.options.filter((z) => z.text.toLowerCase().indexOf(V) > -1);
    };
    const D = ($, V) => {
      const z = V === "down" ? ($ + 1) % c.value.length : ($ - 1 + c.value.length) % c.value.length, Z = document.getElementById(`${o.id}_option_${z}`);
      return Z.ariaDisabled === "true" ? D(z, V) : Z;
    }, I = ($) => {
      const V = document.activeElement.id, z = V.startsWith(`${o.id}_option_`) ? Number(V.split("_")[2]) : $ === "down" ? -1 : 0;
      D(z, $).focus();
    }, m = ($) => I("down"), T = ($) => I("up");
    let y = function($) {
      $.shiftKey || (o.comboHasButton ? s.value || (s.value = !0, $.preventDefault(), setTimeout(() => g.value.focus(), 100)) : o.comboHasFilter && (s.value || (s.value = !0, $.preventDefault(), setTimeout(() => _.value.focus(), 100))));
    }, Q = function($) {
      $.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.id}_button` || o.comboHasFilter && document.activeElement.id === `${o.id}_filter`) && ($.preventDefault(), s.value = !1), !o.comboHasFilter && !o.comboHasButton && (s.value = !1));
    }, k = function($) {
      document.activeElement.id.startsWith(`${o.id}_option_`) && (o.comboHasFilter ? ($.preventDefault(), _.value.focus()) : o.comboHasButton && g.value.focus());
    }, E = ($) => {
      let V = $.key;
      if (V.length > 1 && V.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      V = V.toLowerCase();
      let z = c.value.filter((ee) => ee.text.toLowerCase().startsWith(V)), Z = document.activeElement.id;
      for (let ee of z) {
        let te = document.querySelector(`[data-id='${ee.value}']`);
        if (Z !== te.id) {
          te.focus();
          break;
        }
      }
    }, H = ($) => {
      p.value.contains($.target) || (s.value = !1);
    };
    return ($, V) => (i(), f(K, null, [
      d("div", {
        ref_key: "container",
        ref: p,
        class: N(["fr-select-group", { [`fr-select-group--${B.value}`]: C.value !== "" }]),
        onKeyup: V[13] || (V[13] = Y(
          //@ts-ignore
          (...z) => F(H) && F(H)(...z),
          ["tab"]
        ))
      }, [
        d("label", {
          class: "fr-label",
          for: $.id,
          id: `${$.id}_label`
        }, [
          A($.$slots, "label", {}, () => [
            j(b($.label) + " ", 1),
            A($.$slots, "required-tip", {}, () => [
              $.required ? (i(), f("span", mp, " *")) : h("", !0)
            ], !0)
          ], !0),
          $.description ? (i(), f("span", gp, b($.description), 1)) : h("", !0)
        ], 8, vp),
        d("div", q({
          id: $.id,
          class: [{ [`fr-select--${B.value}`]: C.value !== "" }, "fr-input"],
          onClick: V[0] || (V[0] = (z) => s.value = !s.value),
          onKeydown: [
            V[1] || (V[1] = Y(U((z) => s.value = !1, ["stop"]), ["esc"])),
            V[2] || (V[2] = Y(U((z) => s.value = !s.value, ["prevent"]), ["space"])),
            Y(U(m, ["prevent"]), ["down"]),
            Y(U(T, ["prevent"]), ["up"]),
            V[3] || (V[3] = Y(
              //@ts-ignore
              (...z) => F(y) && F(y)(...z),
              ["tab"]
            )),
            V[4] || (V[4] = //@ts-ignore
            (...z) => F(E) && F(E)(...z))
          ],
          tabindex: "0",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-autocomplete": "none",
          "aria-labelledby": `${$.id}_label`,
          "aria-disabled": $.disabled,
          "aria-controls": `${$.id}_list`,
          "aria-expanded": s.value,
          "aria-required": $.required
        }, $.$attrs), [
          d("p", null, b(S.value), 1)
        ], 16, bp),
        d("div", {
          id: `${$.id}_list`,
          ref_key: "collapse",
          ref: e,
          class: N(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": F(n), "fr-collapsing": F(a) }]),
          onKeyup: V[8] || (V[8] = Y((z) => s.value = !1, ["esc"])),
          onKeydown: [
            V[9] || (V[9] = Y(
              //@ts-ignore
              (...z) => F(Q) && F(Q)(...z),
              ["tab"]
            )),
            Y(U(m, ["prevent"]), ["down"]),
            Y(U(T, ["prevent"]), ["up"]),
            V[10] || (V[10] = Y(U(
              //@ts-ignore
              (...z) => F(k) && F(k)(...z),
              ["shift"]
            ), ["tab"])),
            V[11] || (V[11] = //@ts-ignore
            (...z) => F(E) && F(E)(...z))
          ],
          onTransitionend: V[12] || (V[12] = (z) => F(r)(s.value))
        }, [
          $.comboHasButton ? (i(), f("ul", yp, [
            d("li", null, [
              d("button", {
                class: N(["fr-btn fr-btn--tertiary", `${P.value}`]),
                id: `${$.id}_button`,
                onClick: V[5] || (V[5] = (z) => F(x)()),
                ref_key: "button",
                ref: g,
                type: "button"
              }, b(v.value), 11, kp)
            ])
          ])) : h("", !0),
          $.comboHasFilter ? (i(), f("div", wp, [
            d("input", {
              class: "fr-input",
              id: `${$.id}_filter`,
              ref_key: "filter",
              ref: _,
              onInput: V[6] || (V[6] = //@ts-ignore
              (...z) => F(L) && F(L)(...z)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, _p)
          ])) : h("", !0),
          $.comboLabel ? (i(), f("p", Ip, [
            j(b($.comboLabel) + " ", 1),
            $.comboDescription ? (i(), f("span", Dp, b($.comboDescription), 1)) : h("", !0)
          ])) : h("", !0),
          d("ul", Bp, [
            (i(!0), f(K, null, W(c.value, (z, Z) => (i(), f("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": u.value.includes(z.value)
            }, [
              ve(d("input", {
                id: `${$.id}_option_${Z}`,
                "data-id": z.value,
                type: "checkbox",
                class: "",
                tabindex: "-1",
                value: z.value,
                "onUpdate:modelValue": V[7] || (V[7] = (ee) => u.value = ee)
              }, null, 8, xp), [
                [Qe, u.value]
              ]),
              d("label", {
                class: "fr-label",
                for: `${$.id}_option_${Z}`
              }, b(z.text), 9, Tp)
            ], 8, Cp))), 256))
          ])
        ], 42, hp)
      ], 34),
      C.value ? (i(), f("p", {
        key: 0,
        id: `select-${B.value}-desc-${B.value}`,
        class: N(`fr-${B.value}-text`)
      }, b(C.value), 11, Ep)) : h("", !0)
    ], 64));
  }
}), Lp = /* @__PURE__ */ he(Sp, [["__scopeId", "data-v-512052ab"]]), Ap = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Mp = ["id", "aria-labelledby", "onKeydown"], $p = {
  key: 0,
  class: "fr-label fr-mb-0"
}, Fp = {
  key: 0,
  class: "fr-hint-text"
}, Pp = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, Rp = {
  role: "none",
  class: "fr-p-2v"
}, Np = ["id", "href"], Vp = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DsfrHeaderMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Be("header-menu") },
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
    } = At(), o = t, s = O(null), u = O(!1);
    let c = O(0), p = [];
    const g = (x, L) => {
      c.value += 1, p.push(`${x}@${L}`);
    };
    ge("menuItem", { menuItemIndex: c, addMenuItem: g }), ge("id", o.id), ae(u, (x, L) => {
      x !== L && (l(x), x ? (setTimeout(() => B(), 100), document.addEventListener("click", S), document.addEventListener("touchstart", S)) : (document.removeEventListener("click", S), document.removeEventListener("touchstart", S)));
    }), ne(() => {
      g(o.logoutLabel, c.value);
    });
    const _ = (x, L) => {
      const D = L === "down" ? (x + 1) % p.length : (x - 1 + p.length) % p.length, I = document.getElementById(`${o.id}_item_${D}`);
      return I.ariaDisabled === "true" ? _(D, L) : I;
    }, C = (x) => {
      const L = document.activeElement.id, D = L.startsWith(`${o.id}_item_`) ? Number(L.split("_")[2]) : x === "down" ? -1 : 0;
      _(D, x).focus();
    }, B = (x) => C("down"), P = (x) => C("up");
    let v = (x) => {
      let L = x.key;
      if (L.length > 1 && L.match(/\S/))
        return;
      L = L.toLowerCase();
      let D = p.filter((m) => m.toLowerCase().startsWith(L)), I = document.activeElement.id;
      for (let m of D) {
        let T = m.split("@")[1], y = document.getElementById(`${o.id}_item_${T}`);
        if (I !== y.id) {
          y.focus();
          break;
        }
      }
    }, S = (x) => {
      s.value.contains(x.target) || (u.value = !1);
    };
    return (x, L) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: L[9] || (L[9] = Y(
        //@ts-ignore
        (...D) => F(S) && F(S)(...D),
        ["tab"]
      )),
      ref_key: "container",
      ref: s
    }, [
      d("button", q({
        id: x.id,
        onClick: L[0] || (L[0] = U((D) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          L[1] || (L[1] = Y(U((D) => u.value = !1, ["stop"]), ["esc"])),
          L[2] || (L[2] = Y(U((D) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Y(U(B, ["prevent"]), ["down"]),
          Y(U(P, ["prevent"]), ["up"]),
          L[3] || (L[3] = //@ts-ignore
          (...D) => F(v) && F(v)(...D)),
          L[4] || (L[4] = Y((D) => u.value = !1, ["tab"]))
        ],
        class: "fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm",
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": x.disabled,
        "aria-controls": `${x.id}_menu`,
        "aria-expanded": u.value
      }, x.$attrs), [
        x.icon !== "" ? (i(), R(F(le), {
          key: 0,
          class: "fr-mr-2v",
          name: x.icon
        }, null, 8, ["name"])) : h("", !0),
        d("span", null, b(x.label), 1)
      ], 16, Ap),
      d("div", {
        id: `${x.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: N(["fr-collapse fr-menu fr-menu-header__modal fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": F(n), "fr-collapsing": F(a) }]),
        role: "menu",
        "aria-labelledby": x.id,
        onKeyup: L[5] || (L[5] = Y((D) => u.value = !1, ["esc"])),
        onKeydown: [
          L[6] || (L[6] = Y((D) => u.value = !1, ["tab"])),
          Y(U(B, ["prevent"]), ["down"]),
          Y(U(P, ["prevent"]), ["up"]),
          L[7] || (L[7] = //@ts-ignore
          (...D) => F(v) && F(v)(...D))
        ],
        onTransitionend: L[8] || (L[8] = (D) => F(r)(u.value))
      }, [
        A(x.$slots, "detail", {}, () => [
          x.nom === "" && x.email === "" ? h("", !0) : (i(), f("p", $p, [
            j(b(x.nom) + " ", 1),
            x.email !== "" ? (i(), f("span", Fp, b(x.email), 1)) : h("", !0)
          ]))
        ], !0),
        d("ul", Pp, [
          A(x.$slots, "default", {}, void 0, !0),
          d("li", Rp, [
            x.logoutUrl !== "" ? (i(), f("a", {
              key: 0,
              id: `${x.id}_item_${F(c) - 1}`,
              class: "fr-btn w-full fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
              role: "menuitem",
              tabindex: "-1",
              href: x.logoutUrl
            }, b(x.logoutLabel), 9, Np)) : h("", !0)
          ])
        ])
      ], 42, Mp)
    ], 544));
  }
}), jp = /* @__PURE__ */ he(Vp, [["__scopeId", "data-v-2c51eb4a"]]), Op = Symbol("header"), Hp = ["aria-label"], qp = { class: "fr-btns-group" }, mt = /* @__PURE__ */ M({
  __name: "DsfrCustomHeaderMenuLinks",
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
      d("ul", qp, [
        (i(!0), f(K, null, W(n.links, (r, o) => (i(), f("li", { key: o }, [
          X(F(St), q({ ref_for: !0 }, r, {
            "on-click": (s) => {
              var u;
              a("linkClick", s), (u = r.onClick) == null || u.call(r, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        A(n.$slots, "default")
      ])
    ], 8, Hp));
  }
}), Kp = {
  role: "banner",
  class: "fr-header"
}, zp = { class: "fr-header__body" }, Qp = { class: "fr-container width-inherit" }, Gp = { class: "fr-header__body-row" }, Wp = { class: "fr-header__brand fr-enlarge-link" }, Up = { class: "fr-header__brand-top" }, Xp = { class: "fr-header__logo" }, Yp = {
  key: 0,
  class: "fr-header__operator"
}, Zp = ["src", "alt"], Jp = {
  key: 1,
  class: "fr-header__navbar"
}, ev = ["aria-label", "title", "data-fr-opened"], tv = ["aria-label", "title"], av = {
  key: 0,
  class: "fr-header__service"
}, lv = { class: "fr-header__service-title" }, nv = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, ov = {
  key: 0,
  class: "fr-header__service-tagline"
}, rv = {
  key: 1,
  class: "fr-header__service"
}, iv = { class: "fr-header__tools" }, sv = {
  key: 0,
  class: "fr-header__tools-links"
}, uv = { class: "fr-header__search fr-modal" }, dv = ["aria-label"], cv = { class: "fr-container" }, fv = { class: "fr-header__menu-links" }, pv = {
  key: 1,
  class: "flex justify-center items-center"
}, vv = { class: "fr-header__menu fr-modal" }, mv = {
  key: 0,
  class: "fr-container"
}, gv = /* @__PURE__ */ M({
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
  setup(t, { emit: e }) {
    const a = t, n = e, l = $e(a, "languageSelector"), r = O(!1), o = O(!1), s = O(!1), u = () => {
      var v;
      s.value = !1, r.value = !1, o.value = !1, (v = document.getElementById("button-menu")) == null || v.focus();
    }, c = (v) => {
      v.key === "Escape" && u();
    };
    ne(() => {
      document.addEventListener("keydown", c), n("on-mounted");
    }), fe(() => {
      document.removeEventListener("keydown", c);
    });
    const p = () => {
      var v;
      s.value = !0, r.value = !0, o.value = !1, (v = document.getElementById("close-button")) == null || v.focus();
    }, g = () => {
      s.value = !0, r.value = !1, o.value = !0;
    }, _ = u, C = bt(), B = w(() => {
      var v;
      return !!((v = C.operator) != null && v.call(C).length) || !!a.operatorImgSrc;
    }), P = w(() => !!C.mainnav);
    return ge(Op, () => u), (v, S) => {
      var L, D, I;
      const x = ie("RouterLink");
      return i(), f("header", Kp, [
        d("div", zp, [
          d("div", Qp, [
            d("div", Gp, [
              d("div", Wp, [
                d("div", Up, [
                  d("div", Xp, [
                    X(x, {
                      to: v.homeTo,
                      title: `${v.homeLabel} - ${v.serviceTitle}`
                    }, {
                      default: G(() => [
                        X(F(Le), {
                          "logo-text": v.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  B.value ? (i(), f("div", Yp, [
                    A(v.$slots, "operator", {}, () => [
                      v.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: v.operatorImgSrc,
                        alt: v.operatorImgAlt,
                        style: de(v.operatorImgStyle)
                      }, null, 12, Zp)) : h("", !0)
                    ])
                  ])) : h("", !0),
                  v.showSearch || P.value || (L = v.quickLinks) != null && L.length ? (i(), f("div", Jp, [
                    v.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": v.showSearchLabel,
                      title: v.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: S[0] || (S[0] = U((m) => g(), ["prevent", "stop"]))
                    }, null, 8, ev)) : h("", !0),
                    P.value || (D = v.quickLinks) != null && D.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": v.menuLabel,
                      title: v.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: S[1] || (S[1] = U((m) => p(), ["prevent", "stop"]))
                    }, null, 8, tv)) : h("", !0)
                  ])) : h("", !0)
                ]),
                v.serviceTitle ? (i(), f("div", av, [
                  X(x, q({
                    to: v.homeTo,
                    title: `${v.homeLabel} - ${v.serviceTitle}`
                  }, v.$attrs), {
                    default: G(() => [
                      d("p", lv, [
                        j(b(v.serviceTitle) + " ", 1),
                        v.showBeta ? (i(), f("span", nv, " BETA ")) : h("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  v.serviceDescription ? (i(), f("p", ov, b(v.serviceDescription), 1)) : h("", !0)
                ])) : h("", !0),
                !v.serviceTitle && v.showBeta ? (i(), f("div", rv, S[9] || (S[9] = [
                  d("p", { class: "fr-header__service-title" }, [
                    d("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : h("", !0)
              ]),
              d("div", iv, [
                (I = v.quickLinks) != null && I.length || l.value ? (i(), f("div", sv, [
                  r.value ? h("", !0) : (i(), R(mt, {
                    key: 0,
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel
                  }, {
                    default: G(() => [
                      A(v.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  l.value ? (i(), R(F(Ae), q({ key: 1 }, l.value, {
                    onSelect: S[2] || (S[2] = (m) => n("language-select", m))
                  }), null, 16)) : h("", !0)
                ])) : h("", !0),
                d("div", uv, [
                  A(v.$slots, "header-search"),
                  v.showSearch ? (i(), R(F(Me), {
                    key: 0,
                    "searchbar-id": v.searchbarId,
                    label: v.searchLabel,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": S[3] || (S[3] = (m) => n("update:modelValue", m)),
                    onSearch: S[4] || (S[4] = (m) => n("search", m))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : h("", !0)
                ])
              ])
            ]),
            v.showSearch || P.value || v.quickLinks && v.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: N(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": v.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              d("div", cv, [
                d("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: S[5] || (S[5] = U((m) => u(), ["prevent", "stop"]))
                }, b(v.closeMenuModalLabel), 1),
                d("div", fv, [
                  l.value ? (i(), R(F(Ae), q({ key: 0 }, l.value, {
                    onSelect: S[6] || (S[6] = (m) => l.value.currentLanguage = m.codeIso)
                  }), null, 16)) : h("", !0),
                  r.value ? (i(), R(mt, {
                    key: 1,
                    role: "navigation",
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel,
                    onLinkClick: F(_)
                  }, {
                    default: G(() => [
                      A(v.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : h("", !0),
                  A(v.$slots, "header-search")
                ]),
                s.value ? A(v.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : h("", !0),
                o.value ? (i(), f("div", pv, [
                  X(F(Me), {
                    "searchbar-id": v.searchbarId,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    "onUpdate:modelValue": S[7] || (S[7] = (m) => n("update:modelValue", m)),
                    onSearch: S[8] || (S[8] = (m) => n("search", m))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ], 10, dv)) : h("", !0),
            A(v.$slots, "default")
          ])
        ]),
        d("div", vv, [
          P.value && !s.value ? (i(), f("div", mv, [
            A(v.$slots, "mainnav", { hidemodal: u })
          ])) : h("", !0)
        ])
      ]);
    };
  }
}), bv = { class: "fr-table" }, hv = { class: "fr-table__wrapper" }, yv = { class: "fr-table__container" }, kv = { class: "fr-table__content" }, wv = ["id"], _v = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Iv = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Dv = ["id", "checked"], Bv = ["for"], Cv = ["tabindex", "onClick", "onKeydown"], xv = { key: 0 }, Tv = { key: 1 }, Ev = ["data-row-key"], Sv = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Lv = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Av = ["id", "value"], Mv = ["for"], $v = ["onKeydown"], Fv = { class: "flex gap-2 items-center" }, Pv = ["selected"], Rv = ["value", "selected"], Nv = { class: "flex ml-1" }, Vv = { class: "self-center" }, jv = /* @__PURE__ */ M({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ ke({
    id: { default: () => Be("table") },
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
  emits: /* @__PURE__ */ ke(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(t, { emit: e }) {
    const a = t, n = e, l = se(t, "selection"), r = se(t, "rowsPerPage"), o = se(t, "currentPage"), s = w(() => Math.ceil(a.rows.length / r.value)), u = w(() => a.pages ?? Array.from({ length: s.value }).map((m, T) => ({ label: `${T + 1}`, title: `Page ${T + 1}`, href: `#${T + 1}` }))), c = w(() => o.value * r.value), p = w(() => (o.value + 1) * r.value);
    function g(m, T) {
      const y = _.value;
      return (m[y] ?? m) < (T[y] ?? T) ? -1 : (m[y] ?? m) > (T[y] ?? T) ? 1 : 0;
    }
    const _ = se(t, "sortedBy");
    _.value = a.sorted;
    const C = se(t, "sortedDesc");
    function B(m) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(m))) {
        if (_.value === m) {
          if (C.value) {
            _.value = void 0, C.value = !1;
            return;
          }
          C.value = !0;
          return;
        }
        C.value = !1, _.value = m;
      }
    }
    const P = w(() => {
      const m = _.value ? a.rows.slice().sort(a.sortFn ?? g) : a.rows.slice();
      return C.value && m.reverse(), m;
    }), v = w(() => {
      const m = a.headersRow.map((y) => typeof y != "object" ? y : y.key), T = P.value.map((y) => Array.isArray(y) ? y : m.map((Q) => y));
      return a.pagination ? T.slice(c.value, p.value) : T;
    });
    function S(m) {
      if (m) {
        const T = a.headersRow.findIndex((y) => y.key ?? y);
        l.value = v.value.map((y) => y[T]);
      }
      l.value.length = 0;
    }
    const x = O(!1);
    function L() {
      x.value = l.value.length === v.value.length;
    }
    function D() {
      n("update:current-page", 0), x.value = !1, l.value.length = 0;
    }
    function I(m) {
      navigator.clipboard.writeText(m);
    }
    return (m, T) => (i(), f("div", bv, [
      d("div", hv, [
        d("div", yv, [
          d("div", kv, [
            d("table", { id: m.id }, [
              d("caption", null, b(m.title), 1),
              d("thead", null, [
                d("tr", null, [
                  m.selectableRows ? (i(), f("th", _v, [
                    d("div", Iv, [
                      d("input", {
                        id: `table-select--${m.id}-all`,
                        checked: x.value,
                        type: "checkbox",
                        onInput: T[0] || (T[0] = (y) => S(y.target.checked))
                      }, null, 40, Dv),
                      d("label", {
                        class: "fr-label",
                        for: `table-select--${m.id}-all`
                      }, " Sélectionner tout ", 8, Bv)
                    ])
                  ])) : h("", !0),
                  (i(!0), f(K, null, W(m.headersRow, (y, Q) => (i(), f("th", q({
                    key: typeof y == "object" ? y.key : y,
                    scope: "col",
                    ref_for: !0
                  }, typeof y == "object" && y.headerAttrs, {
                    tabindex: m.sortableRows ? 0 : void 0,
                    onClick: (k) => B(y.key ?? (Array.isArray(m.rows[0]) ? Q : y)),
                    onKeydown: [
                      Y((k) => B(y.key ?? y), ["enter"]),
                      Y((k) => B(y.key ?? y), ["space"])
                    ]
                  }), [
                    d("div", {
                      class: N({ "sortable-header": m.sortableRows === !0 || Array.isArray(m.sortableRows) && m.sortableRows.includes(y.key ?? y) })
                    }, [
                      A(m.$slots, "header", q({ ref_for: !0 }, typeof y == "object" ? y : { key: y, label: y }), () => [
                        j(b(typeof y == "object" ? y.label : y), 1)
                      ], !0),
                      _.value !== (y.key ?? y) && (m.sortableRows === !0 || Array.isArray(m.sortableRows) && m.sortableRows.includes(y.key ?? y)) ? (i(), f("span", xv, [
                        X(F(le), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : _.value === (y.key ?? y) ? (i(), f("span", Tv, [
                        X(F(le), {
                          name: C.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : h("", !0)
                    ], 2)
                  ], 16, Cv))), 128))
                ])
              ]),
              d("tbody", null, [
                (i(!0), f(K, null, W(v.value, (y, Q) => (i(), f("tr", {
                  key: `row-${Q}`,
                  "data-row-key": Q + 1
                }, [
                  m.selectableRows ? (i(), f("th", Sv, [
                    d("div", Lv, [
                      ve(d("input", {
                        id: `row-select-${m.id}-${Q}`,
                        "onUpdate:modelValue": T[1] || (T[1] = (k) => l.value = k),
                        value: m.rows[Q][m.rowKey] ?? `row-${Q}`,
                        type: "checkbox",
                        onChange: T[2] || (T[2] = (k) => L())
                      }, null, 40, Av), [
                        [Qe, l.value]
                      ]),
                      d("label", {
                        class: "fr-label",
                        for: `row-select-${m.id}-${Q}`
                      }, " Sélectionner la ligne " + b(Q + 1), 9, Mv)
                    ])
                  ])) : h("", !0),
                  (i(!0), f(K, null, W(y, (k, E) => (i(), f("td", {
                    key: typeof k == "object" ? k[m.rowKey] : k,
                    onKeydown: [
                      Y(U((H) => I(typeof k == "object" ? k[m.rowKey] : k), ["ctrl"]), ["c"]),
                      Y(U((H) => I(typeof k == "object" ? k[m.rowKey] : k), ["meta"]), ["c"])
                    ]
                  }, [
                    A(m.$slots, "cell", q({ ref_for: !0 }, {
                      colKey: typeof m.headersRow[E] == "object" ? m.headersRow[E].key : m.headersRow[E],
                      cell: k,
                      idx: Q + 1
                    }), () => [
                      j(b(typeof k == "object" ? k[m.rowKey] : k), 1)
                    ], !0)
                  ], 40, $v))), 128))
                ], 8, Ev))), 128))
              ])
            ], 8, wv)
          ])
        ])
      ]),
      d("div", {
        class: N(m.bottomActionBarClass)
      }, [
        A(m.$slots, "pagination", {}, () => [
          m.pagination && !m.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: N(["flex justify-between items-center", m.paginationWrapperClass])
          }, [
            d("div", Fv, [
              T[6] || (T[6] = d("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              ve(d("select", {
                id: "pagination-options",
                "onUpdate:modelValue": T[3] || (T[3] = (y) => r.value = y),
                class: "fr-select",
                onChange: T[4] || (T[4] = (y) => D())
              }, [
                d("option", {
                  value: "",
                  selected: !m.paginationOptions.includes(r.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Pv),
                (i(!0), f(K, null, W(m.paginationOptions, (y, Q) => (i(), f("option", {
                  key: Q,
                  value: y,
                  selected: +y === r.value
                }, b(y), 9, Rv))), 128))
              ], 544), [
                [ht, r.value]
              ])
            ]),
            d("div", Nv, [
              d("span", Vv, "Page " + b(o.value + 1) + " sur " + b(s.value), 1)
            ]),
            X(F(Tt), {
              "current-page": o.value,
              "onUpdate:currentPage": T[5] || (T[5] = (y) => o.value = y),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : h("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Ov = /* @__PURE__ */ he(jv, [["__scopeId", "data-v-72248729"]]), Hv = ["id"], qv = /* @__PURE__ */ M({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => Be("tooltip") },
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
  setup(t) {
    const e = t, a = O(!1), n = O(null), l = O(null), r = O("0px"), o = O("0px"), s = O("0px"), u = O(!1), c = O(0);
    async function p() {
      var z, Z, ee, te, pe, me;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((ce) => setTimeout(ce, 100));
      const I = (z = n.value) == null ? void 0 : z.getBoundingClientRect().top, m = (Z = n.value) == null ? void 0 : Z.offsetHeight, T = (ee = n.value) == null ? void 0 : ee.offsetWidth, y = (te = n.value) == null ? void 0 : te.getBoundingClientRect().left, Q = (pe = l.value) == null ? void 0 : pe.offsetHeight, k = (me = l.value) == null ? void 0 : me.offsetWidth, H = !(I - Q < 0) && I + m + Q >= document.documentElement.offsetHeight;
      u.value = H;
      const $ = y + T >= document.documentElement.offsetWidth, V = y + T / 2 - k / 2 <= 0;
      o.value = H ? `${I - Q + 8}px` : `${I + m - 8}px`, c.value = 1, r.value = $ ? `${y + T - k - 4}px` : V ? `${y + 4}px` : `${y + T / 2 - k / 2}px`, s.value = $ ? `${k / 2 - T / 2 + 4}px` : V ? `${-(k / 2) + T / 2 - 4}px` : "0px";
    }
    ae(a, p, { immediate: !0 }), ne(() => {
      window.addEventListener("scroll", p);
    }), fe(() => {
      window.removeEventListener("scroll", p);
    });
    const g = w(() => ["sm", "small"].includes(e.size)), _ = w(() => ["md", "medium"].includes(e.size)), C = w(() => ["lg", "large"].includes(e.size)), B = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), P = w(() => `transform: translate(${r.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${c.value};'`), v = w(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), S = (I) => {
      var m, T;
      a.value && (I.target === n.value || (m = n.value) != null && m.contains(I.target) || I.target === l.value || (T = l.value) != null && T.contains(I.target) || (a.value = !1));
    }, x = (I) => {
      I.key === "Escape" && (a.value = !1);
    };
    ne(() => {
      document.documentElement.addEventListener("click", S), document.documentElement.addEventListener("keydown", x);
    }), fe(() => {
      document.documentElement.removeEventListener("click", S), document.documentElement.removeEventListener("keydown", x);
    });
    const L = () => {
      a.value = !0;
    }, D = () => {
      a.value = !1;
    };
    return (I, m) => (i(), f(K, null, [
      (i(), R(oe(I.href !== "" ? "a" : "button"), q({
        id: `button-${I.id}`,
        ref_key: "source",
        ref: n,
        href: I.href !== "" ? I.href : void 0,
        class: {
          "fr-link": I.isLink && !I.inline,
          "fr-btn": !I.isLink,
          "fr-btn--secondary": I.secondary && !I.tertiary,
          "fr-btn--tertiary": I.tertiary && !I.secondary && !I.noOutline,
          "fr-btn--tertiary-no-outline": I.tertiary && !I.secondary && I.noOutline,
          "fr-btn--sm": g.value,
          "fr-btn--md": _.value,
          "fr-btn--lg": C.value,
          "fr-btn--icon-right": !I.isLink && !I.iconOnly && B.value && I.iconRight,
          "fr-btn--icon-left": !I.isLink && !I.iconOnly && B.value && !I.iconRight,
          "fr-link--icon-right": I.isLink && !I.inline && !I.iconOnly && B.value && I.iconRight,
          "fr-link--icon-left": I.isLink && !I.inline && !I.iconOnly && B.value && !I.iconRight,
          "inline-flex": !B.value,
          reverse: I.iconRight && !B.value,
          "fr-btn--custom-tooltip": I.iconOnly,
          "justify-center": !B.value && I.iconOnly,
          [I.icon]: B.value
        },
        "aria-labelledby": I.id,
        onMouseenter: m[0] || (m[0] = (T) => L()),
        onMouseleave: m[1] || (m[1] = (T) => D()),
        onFocus: m[2] || (m[2] = (T) => L()),
        onBlur: m[3] || (m[3] = (T) => D())
      }, I.$attrs), {
        default: G(() => [
          j(b(I.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-labelledby"])),
      d("p", {
        id: I.id,
        ref_key: "tooltip",
        ref: l,
        class: N(["fr-tooltip fr-placement", v.value]),
        style: de(P.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        A(I.$slots, "default", {}, () => [
          j(b(I.content), 1)
        ], !0)
      ], 14, Hv)
    ], 64));
  }
}), al = /* @__PURE__ */ he(qv, [["__scopeId", "data-v-95dd9f76"]]), Kv = /* @__PURE__ */ M({
  __name: "DsfrButtonTooltip",
  setup(t) {
    return (e, a) => (i(), R(al, q({ "is-link": !1 }, e.$attrs), {
      default: G(() => [
        A(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), zv = /* @__PURE__ */ M({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(t) {
    return (e, a) => (i(), R(al, q({
      "is-link": !e.asButton
    }, e.$attrs), {
      default: G(() => [
        A(e.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), Qv = ["id", "href", "aria-disabled"], Gv = /* @__PURE__ */ M({
  __name: "DsfrLink",
  props: {
    id: { default: () => Be("link") },
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
  setup(t) {
    const e = t, a = w(() => ["sm", "small"].includes(e.size)), n = w(() => ["md", "medium"].includes(e.size)), l = w(() => ["lg", "large"].includes(e.size)), r = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-"));
    return (o, s) => (i(), f("a", q({
      id: `link-${o.id}`,
      ref: "source",
      href: o.href !== "" && !o.disabled ? o.href : void 0,
      "aria-disabled": o.disabled,
      class: {
        "fr-link": !o.asButton && !o.inline,
        "fr-btn": o.asButton,
        "fr-btn--secondary": o.secondary && !o.tertiary,
        "fr-btn--tertiary": o.tertiary && !o.secondary && !o.noOutline,
        "fr-btn--tertiary-no-outline": o.tertiary && !o.secondary && o.noOutline,
        "fr-btn--sm": a.value,
        "fr-btn--md": n.value,
        "fr-btn--lg": l.value,
        "fr-btn--icon-right": o.asButton && !o.iconOnly && r.value && o.iconRight,
        "fr-btn--icon-left": o.asButton && !o.iconOnly && r.value && !o.iconRight,
        "fr-link--icon-right": !o.asButton && !o.inline && !o.iconOnly && r.value && o.iconRight,
        "fr-link--icon-left": !o.asButton && !o.inline && !o.iconOnly && r.value && !o.iconRight,
        "inline-flex": !r.value,
        reverse: o.iconRight && !r.value,
        "fr-btn--custom-tooltip": o.iconOnly,
        "justify-center": !r.value && o.iconOnly,
        [o.icon]: r.value
      }
    }, o.$attrs), [
      A(o.$slots, "default", {}, void 0, !0)
    ], 16, Qv));
  }
}), Wv = /* @__PURE__ */ he(Gv, [["__scopeId", "data-v-36410ee2"]]);
var Uv = {
  install: function(t, e) {
    t.use(Af), t.component("RouterLink", Ff), t.component("DsfrFacets", tp), t.component("DsfrSelectMultiple", Lp), t.component("DsfrMenu", up), t.component("DsfrMenuLink", pp), t.component("DsfrHeaderMenu", jp), t.component("DsfrCustomHeader", gv), t.component("DsfrCustomHeaderMenuLinks", mt), t.component("DsfrCustomDataTable", Ov), t.component("DsfrButtonTooltip", Kv), t.component("DsfrLinkTooltip", zv), t.component("DsfrLink", Wv);
  },
  methods: Mf
};
window && (window.DSFR = Uv);
export {
  Uv as default
};
//# sourceMappingURL=dsfr.es.js.map
