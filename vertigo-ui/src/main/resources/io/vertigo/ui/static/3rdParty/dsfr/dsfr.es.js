import { defineComponent as L, ref as O, computed as I, onMounted as re, watch as le, onUnmounted as fe, Comment as ll, cloneVNode as nl, h as Ft, openBlock as s, createElementBlock as c, normalizeClass as $, createElementVNode as u, withModifiers as G, createTextVNode as V, toDisplayString as b, unref as M, Fragment as q, renderList as Q, createVNode as X, withKeys as Y, withCtx as W, createBlock as N, resolveDynamicComponent as ne, mergeProps as H, createCommentVNode as h, mergeModels as be, useModel as ie, withDirectives as pe, vModelCheckbox as ze, renderSlot as A, inject as _e, toRef as Le, provide as ve, resolveComponent as se, vShow as sa, useCssVars as ia, nextTick as da, normalizeStyle as ue, normalizeProps as de, guardReactiveProps as gt, useAttrs as rl, useSlots as bt, hasInjectionContext as ol, reactive as sl, Teleport as il, vModelSelect as ht, onBeforeUnmount as dl, Transition as ul } from "vue";
const yt = Symbol("accordions"), kt = Symbol("header"), Qe = Symbol("tabs"), me = () => {
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
}, cl = "abcdefghijklmnopqrstuvwyz0123456789", Pt = cl.repeat(10), fl = () => {
  const t = Math.floor(Math.random() * Pt.length);
  return Pt[t];
}, pl = (t) => Array.from({ length: t }).map(fl).join(""), J = (t = "", e = "") => (t ? `${t}-` : "") + pl(5) + (e ? `-${e}` : ""), vl = { class: "fr-accordion" }, ml = ["aria-expanded", "aria-controls"], gl = ["id"], bl = /* @__PURE__ */ L({
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
    } = me(), i = O(), d = _e(yt), { isActive: f, expand: p } = (d == null ? void 0 : d(Le(() => e.title))) ?? { isActive: i, expand: () => i.value = !i.value };
    return re(() => {
      f.value && r(!0);
    }), le(f, (m, k) => {
      m !== k && r(m);
    }), (m, k) => (s(), c("section", vl, [
      (s(), N(ne(m.titleTag), { class: "fr-accordion__title" }, {
        default: W(() => [
          u("button", {
            class: "fr-accordion__btn",
            "aria-expanded": M(f),
            "aria-controls": m.id,
            type: "button",
            onClick: k[0] || (k[0] = (B) => M(p)())
          }, [
            A(m.$slots, "title", {}, () => [
              V(b(m.title), 1)
            ])
          ], 8, ml)
        ]),
        _: 3
      })),
      u("div", {
        id: m.id,
        ref_key: "collapse",
        ref: a,
        class: $(["fr-collapse", {
          "fr-collapse--expanded": M(l),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": M(n)
        }]),
        onTransitionend: k[1] || (k[1] = (B) => M(o)(M(f)))
      }, [
        A(m.$slots, "default")
      ], 42, gl)
    ]));
  }
}), hl = { class: "fr-accordions-group" }, yl = /* @__PURE__ */ L({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = I({
      get: () => a.modelValue,
      set(i) {
        n("update:modelValue", i);
      }
    }), r = O(/* @__PURE__ */ new Map()), o = O(0);
    return ve(yt, (i) => {
      const d = o.value++;
      r.value.set(d, i.value);
      const f = I(() => d === l.value);
      le(i, () => {
        r.value.set(d, i.value);
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
      }), { isActive: f, expand: p };
    }), (i, d) => (s(), c("div", hl, [
      A(i.$slots, "default")
    ]));
  }
}), kl = ["id", "role"], wl = ["title", "aria-label"], _l = /* @__PURE__ */ L({
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
    const a = t, n = e, l = () => n("close"), r = I(
      () => [
        `fr-alert--${a.type}`,
        {
          "fr-alert--sm": a.small
        }
      ]
    );
    return (o, i) => o.closed ? h("", !0) : (s(), c("div", {
      key: 0,
      id: o.id,
      class: $(["fr-alert", r.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? h("", !0) : (s(), N(ne(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: W(() => [
          V(b(o.title), 1)
        ]),
        _: 1
      })),
      A(o.$slots, "default", {}, () => [
        V(b(o.description), 1)
      ]),
      o.closeable ? (s(), c("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: l
      }, null, 8, wl)) : h("", !0)
    ], 10, kl));
  }
}), Il = /* @__PURE__ */ L({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(t) {
    return (e, a) => (s(), c("a", {
      class: $(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, b(e.label), 3));
  }
}), Dl = ["title"], ua = /* @__PURE__ */ L({
  __name: "DsfrBadge",
  props: {
    label: {},
    type: { default: "info" },
    noIcon: { type: Boolean },
    small: { type: Boolean },
    ellipsis: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (s(), c("p", {
      class: $(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      u("span", {
        class: $(e.ellipsis ? "fr-ellipsis" : "")
      }, b(e.label), 3)
    ], 10, Dl));
  }
}), xl = ["aria-label"], Cl = ["aria-expanded", "aria-controls"], Bl = ["id"], Tl = { class: "fr-breadcrumb__list" }, Sl = ["aria-current"], El = /* @__PURE__ */ L({
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
    } = me(), o = O(!1);
    return le(o, (i, d) => {
      i !== d && l(i);
    }), (i, d) => {
      const f = se("RouterLink");
      return s(), c("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": i.navigationLabel
      }, [
        pe(u("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": i.breadcrumbId,
          onClick: d[0] || (d[0] = (p) => o.value = !o.value)
        }, b(i.showBreadcrumbLabel), 9, Cl), [
          [sa, !o.value]
        ]),
        u("div", {
          id: i.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: $(["fr-collapse", {
            "fr-collapse--expanded": M(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": M(a)
          }]),
          onTransitionend: d[1] || (d[1] = (p) => M(r)(o.value))
        }, [
          u("ol", Tl, [
            (s(!0), c(q, null, Q(i.links, (p, m) => (s(), c("li", {
              key: m,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (s(), N(f, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": m === i.links.length - 1 ? "page" : void 0
              }, {
                default: W(() => [
                  V(b(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : h("", !0),
              p.to ? h("", !0) : (s(), c("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === i.links.length - 1 ? "page" : void 0
              }, b(p.text), 9, Sl))
            ]))), 128))
          ])
        ], 42, Bl)
      ], 8, xl);
    };
  }
}), xe = /^[a-z0-9]+(-[a-z0-9]+)*$/, Ge = (t, e, a, n = "") => {
  const l = t.split(":");
  if (t.slice(0, 1) === "@") {
    if (l.length < 2 || l.length > 3)
      return null;
    n = l.shift().slice(1);
  }
  if (l.length > 3 || !l.length)
    return null;
  if (l.length > 1) {
    const i = l.pop(), d = l.pop(), f = {
      // Allow provider without '@': "provider:prefix:name"
      provider: l.length > 0 ? l[0] : n,
      prefix: d,
      name: i
    };
    return e && !Ne(f) ? null : f;
  }
  const r = l[0], o = r.split("-");
  if (o.length > 1) {
    const i = {
      provider: n,
      prefix: o.shift(),
      name: o.join("-")
    };
    return e && !Ne(i) ? null : i;
  }
  if (a && n === "") {
    const i = {
      provider: n,
      prefix: "",
      name: r
    };
    return e && !Ne(i, a) ? null : i;
  }
  return null;
}, Ne = (t, e) => t ? !!((t.provider === "" || t.provider.match(xe)) && (e && t.prefix === "" || t.prefix.match(xe)) && t.name.match(xe)) : !1, ca = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), je = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), We = Object.freeze({
  ...ca,
  ...je
}), nt = Object.freeze({
  ...We,
  body: "",
  hidden: !1
});
function Al(t, e) {
  const a = {};
  !t.hFlip != !e.hFlip && (a.hFlip = !0), !t.vFlip != !e.vFlip && (a.vFlip = !0);
  const n = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return n && (a.rotate = n), a;
}
function $t(t, e) {
  const a = Al(t, e);
  for (const n in nt)
    n in je ? n in t && !(n in a) && (a[n] = je[n]) : n in e ? a[n] = e[n] : n in t && (a[n] = t[n]);
  return a;
}
function Ll(t, e) {
  const a = t.icons, n = t.aliases || /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  function r(o) {
    if (a[o])
      return l[o] = [];
    if (!(o in l)) {
      l[o] = null;
      const i = n[o] && n[o].parent, d = i && r(i);
      d && (l[o] = [i].concat(d));
    }
    return l[o];
  }
  return Object.keys(a).concat(Object.keys(n)).forEach(r), l;
}
function Ml(t, e, a) {
  const n = t.icons, l = t.aliases || /* @__PURE__ */ Object.create(null);
  let r = {};
  function o(i) {
    r = $t(
      n[i] || l[i],
      r
    );
  }
  return o(e), a.forEach(o), $t(t, r);
}
function fa(t, e) {
  const a = [];
  if (typeof t != "object" || typeof t.icons != "object")
    return a;
  t.not_found instanceof Array && t.not_found.forEach((l) => {
    e(l, null), a.push(l);
  });
  const n = Ll(t);
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
function he(t, e) {
  const a = Rt[t] || (Rt[t] = /* @__PURE__ */ Object.create(null));
  return a[e] || (a[e] = Pl(t, e));
}
function wt(t, e) {
  return pa(e) ? fa(e, (a, n) => {
    n ? t.icons[a] = n : t.missing.add(a);
  }) : [];
}
function $l(t, e, a) {
  try {
    if (typeof a.body == "string")
      return t.icons[e] = { ...a }, !0;
  } catch {
  }
  return !1;
}
let Be = !1;
function va(t) {
  return typeof t == "boolean" && (Be = t), Be;
}
function Rl(t) {
  const e = typeof t == "string" ? Ge(t, !0, Be) : t;
  if (e) {
    const a = he(e.provider, e.prefix), n = e.name;
    return a.icons[n] || (a.missing.has(n) ? null : void 0);
  }
}
function Nl(t, e) {
  const a = Ge(t, !0, Be);
  if (!a)
    return !1;
  const n = he(a.provider, a.prefix);
  return $l(n, a.name, e);
}
function Vl(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), Be && !e && !t.prefix) {
    let l = !1;
    return pa(t) && (t.prefix = "", fa(t, (r, o) => {
      o && Nl(r, o) && (l = !0);
    })), l;
  }
  const a = t.prefix;
  if (!Ne({
    provider: e,
    prefix: a,
    name: "a"
  }))
    return !1;
  const n = he(e, a);
  return !!wt(n, t);
}
const ma = Object.freeze({
  width: null,
  height: null
}), ga = Object.freeze({
  // Dimensions
  ...ma,
  // Transformations
  ...je
}), jl = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Ol = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Nt(t, e, a) {
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
      const i = parseFloat(r);
      isNaN(i) ? l.push(r) : l.push(Math.ceil(i * e * a) / a);
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
function Hl(t, e) {
  return t ? "<defs>" + t + "</defs>" + e : e;
}
function Kl(t, e, a) {
  const n = ql(t);
  return Hl(n.defs, e + n.content + a);
}
const zl = (t) => t === "unset" || t === "undefined" || t === "none";
function Ql(t, e) {
  const a = {
    ...We,
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
    const v = [], S = P.hFlip, _ = P.vFlip;
    let D = P.rotate;
    S ? _ ? D += 2 : (v.push(
      "translate(" + (l.width + l.left).toString() + " " + (0 - l.top).toString() + ")"
    ), v.push("scale(-1 1)"), l.top = l.left = 0) : _ && (v.push(
      "translate(" + (0 - l.left).toString() + " " + (l.height + l.top).toString() + ")"
    ), v.push("scale(1 -1)"), l.top = l.left = 0);
    let C;
    switch (D < 0 && (D -= Math.floor(D / 4) * 4), D = D % 4, D) {
      case 1:
        C = l.height / 2 + l.top, v.unshift(
          "rotate(90 " + C.toString() + " " + C.toString() + ")"
        );
        break;
      case 2:
        v.unshift(
          "rotate(180 " + (l.width / 2 + l.left).toString() + " " + (l.height / 2 + l.top).toString() + ")"
        );
        break;
      case 3:
        C = l.width / 2 + l.left, v.unshift(
          "rotate(-90 " + C.toString() + " " + C.toString() + ")"
        );
        break;
    }
    D % 2 === 1 && (l.left !== l.top && (C = l.left, l.left = l.top, l.top = C), l.width !== l.height && (C = l.width, l.width = l.height, l.height = C)), v.length && (r = Kl(
      r,
      '<g transform="' + v.join(" ") + '">',
      "</g>"
    ));
  });
  const o = n.width, i = n.height, d = l.width, f = l.height;
  let p, m;
  o === null ? (m = i === null ? "1em" : i === "auto" ? f : i, p = Nt(m, d / f)) : (p = o === "auto" ? d : o, m = i === null ? Nt(p, f / d) : i === "auto" ? f : i);
  const k = {}, B = (P, v) => {
    zl(v) || (k[P] = v.toString());
  };
  B("width", p), B("height", m);
  const x = [l.left, l.top, d, f];
  return k.viewBox = x.join(" "), {
    attributes: k,
    viewBox: x,
    body: r
  };
}
const Gl = /\sid="(\S+)"/g, Wl = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Ul = 0;
function Xl(t, e = Wl) {
  const a = [];
  let n;
  for (; n = Gl.exec(t); )
    a.push(n[1]);
  if (!a.length)
    return t;
  const l = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return a.forEach((r) => {
    const o = typeof e == "function" ? e(r) : e + (Ul++).toString(), i = r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + i + ')([")]|\\.[a-z])', "g"),
      "$1" + o + l + "$3"
    );
  }), t = t.replace(new RegExp(l, "g"), ""), t;
}
const rt = /* @__PURE__ */ Object.create(null);
function Yl(t, e) {
  rt[t] = e;
}
function ot(t) {
  return rt[t] || rt[""];
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
], st = [];
for (; Pe.length > 0; )
  Pe.length === 1 || Math.random() > 0.5 ? st.push(Pe.shift()) : st.push(Pe.pop());
It[""] = _t({
  resources: ["https://api.iconify.design"].concat(st)
});
function Zl(t, e) {
  const a = _t(e);
  return a === null ? !1 : (It[t] = a, !0);
}
function Dt(t) {
  return It[t];
}
const Jl = () => {
  let t;
  try {
    if (t = fetch, typeof t == "function")
      return t;
  } catch {
  }
};
let Vt = Jl();
function en(t, e) {
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
function tn(t) {
  return t === 404;
}
const an = (t, e, a) => {
  const n = [], l = en(t, e), r = "icons";
  let o = {
    type: r,
    provider: t,
    prefix: e,
    icons: []
  }, i = 0;
  return a.forEach((d, f) => {
    i += d.length + 1, i >= l && f > 0 && (n.push(o), o = {
      type: r,
      provider: t,
      prefix: e,
      icons: []
    }, i = d.length), o.icons.push(d);
  }), n.push(o), n;
};
function ln(t) {
  if (typeof t == "string") {
    const e = Dt(t);
    if (e)
      return e.path;
  }
  return "/";
}
const nn = (t, e, a) => {
  if (!Vt) {
    a("abort", 424);
    return;
  }
  let n = ln(e.provider);
  switch (e.type) {
    case "icons": {
      const r = e.prefix, o = e.icons.join(","), i = new URLSearchParams({
        icons: o
      });
      n += r + ".json?" + i.toString();
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
        a(tn(o) ? "abort" : "next", o);
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
  prepare: an,
  send: nn
};
function on(t) {
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
    const r = l.provider, o = l.prefix, i = l.name, d = a[r] || (a[r] = /* @__PURE__ */ Object.create(null)), f = d[o] || (d[o] = he(r, o));
    let p;
    i in f.icons ? p = e.loaded : o === "" || f.missing.has(i) ? p = e.missing : p = e.pending;
    const m = {
      provider: r,
      prefix: o,
      name: i
    };
    p.push(m);
  }), e;
}
function ba(t, e) {
  t.forEach((a) => {
    const n = a.loaderCallbacks;
    n && (a.loaderCallbacks = n.filter((l) => l.id !== e));
  });
}
function sn(t) {
  t.pendingCallbacksFlag || (t.pendingCallbacksFlag = !0, setTimeout(() => {
    t.pendingCallbacksFlag = !1;
    const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
    if (!e.length)
      return;
    let a = !1;
    const n = t.provider, l = t.prefix;
    e.forEach((r) => {
      const o = r.icons, i = o.pending.length;
      o.pending = o.pending.filter((d) => {
        if (d.prefix !== l)
          return !0;
        const f = d.name;
        if (t.icons[f])
          o.loaded.push({
            provider: n,
            prefix: l,
            name: f
          });
        else if (t.missing.has(f))
          o.missing.push({
            provider: n,
            prefix: l,
            name: f
          });
        else
          return a = !0, !0;
        return !1;
      }), o.pending.length !== i && (a || ba([t], r.id), r.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        r.abort
      ));
    });
  }));
}
let dn = 0;
function un(t, e, a) {
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
function cn(t, e = !0, a = !1) {
  const n = [];
  return t.forEach((l) => {
    const r = typeof l == "string" ? Ge(l, e, a) : l;
    r && n.push(r);
  }), n;
}
var fn = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function pn(t, e, a, n) {
  const l = t.resources.length, r = t.random ? Math.floor(Math.random() * l) : t.index;
  let o;
  if (t.random) {
    let g = t.resources.slice(0);
    for (o = []; g.length > 1; ) {
      const E = Math.floor(Math.random() * g.length);
      o.push(g[E]), g = g.slice(0, E).concat(g.slice(E + 1));
    }
    o = o.concat(g);
  } else
    o = t.resources.slice(r).concat(t.resources.slice(0, r));
  const i = Date.now();
  let d = "pending", f = 0, p, m = null, k = [], B = [];
  typeof n == "function" && B.push(n);
  function x() {
    m && (clearTimeout(m), m = null);
  }
  function P() {
    d === "pending" && (d = "aborted"), x(), k.forEach((g) => {
      g.status === "pending" && (g.status = "aborted");
    }), k = [];
  }
  function v(g, E) {
    E && (B = []), typeof g == "function" && B.push(g);
  }
  function S() {
    return {
      startTime: i,
      payload: e,
      status: d,
      queriesSent: f,
      queriesPending: k.length,
      subscribe: v,
      abort: P
    };
  }
  function _() {
    d = "failed", B.forEach((g) => {
      g(void 0, p);
    });
  }
  function D() {
    k.forEach((g) => {
      g.status === "pending" && (g.status = "aborted");
    }), k = [];
  }
  function C(g, E, y) {
    const U = E !== "success";
    switch (k = k.filter((w) => w !== g), d) {
      case "pending":
        break;
      case "failed":
        if (U || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (E === "abort") {
      p = y, _();
      return;
    }
    if (U) {
      p = y, k.length || (o.length ? K() : _());
      return;
    }
    if (x(), D(), !t.random) {
      const w = t.resources.indexOf(g.resource);
      w !== -1 && w !== t.index && (t.index = w);
    }
    d = "completed", B.forEach((w) => {
      w(y);
    });
  }
  function K() {
    if (d !== "pending")
      return;
    x();
    const g = o.shift();
    if (g === void 0) {
      if (k.length) {
        m = setTimeout(() => {
          x(), d === "pending" && (D(), _());
        }, t.timeout);
        return;
      }
      _();
      return;
    }
    const E = {
      status: "pending",
      resource: g,
      callback: (y, U) => {
        C(E, y, U);
      }
    };
    k.push(E), f++, m = setTimeout(K, t.rotate), a(g, e, E.callback);
  }
  return setTimeout(K), S;
}
function ha(t) {
  const e = {
    ...fn,
    ...t
  };
  let a = [];
  function n() {
    a = a.filter((o) => o().status === "pending");
  }
  function l(o, i, d) {
    const f = pn(
      e,
      o,
      i,
      (p, m) => {
        n(), d && d(p, m);
      }
    );
    return a.push(f), f;
  }
  function r(o) {
    return a.find((i) => o(i)) || null;
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
function vn(t) {
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
function mn(t, e, a) {
  let n, l;
  if (typeof t == "string") {
    const r = ot(t);
    if (!r)
      return a(void 0, 424), jt;
    l = r.send;
    const o = vn(t);
    o && (n = o.redundancy);
  } else {
    const r = _t(t);
    if (r) {
      n = ha(r);
      const o = t.resources ? t.resources[0] : "", i = ot(o);
      i && (l = i.send);
    }
  }
  return !n || !l ? (a(void 0, 424), jt) : n.query(e, l, a)().abort;
}
const Ot = "iconify2", Te = "iconify", ya = Te + "-count", qt = Te + "-version", ka = 36e5, gn = 168, bn = 50;
function it(t, e) {
  try {
    return t.getItem(e);
  } catch {
  }
}
function xt(t, e, a) {
  try {
    return t.setItem(e, a), !0;
  } catch {
  }
}
function Ht(t, e) {
  try {
    t.removeItem(e);
  } catch {
  }
}
function dt(t, e) {
  return xt(t, ya, e.toString());
}
function ut(t) {
  return parseInt(it(t, ya)) || 0;
}
const Ue = {
  local: !0,
  session: !0
}, wa = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let Ct = !1;
function hn(t) {
  Ct = t;
}
let $e = typeof window > "u" ? {} : window;
function _a(t) {
  const e = t + "Storage";
  try {
    if ($e && $e[e] && typeof $e[e].length == "number")
      return $e[e];
  } catch {
  }
  Ue[t] = !1;
}
function Ia(t, e) {
  const a = _a(t);
  if (!a)
    return;
  const n = it(a, qt);
  if (n !== Ot) {
    if (n) {
      const i = ut(a);
      for (let d = 0; d < i; d++)
        Ht(a, Te + d.toString());
    }
    xt(a, qt, Ot), dt(a, 0);
    return;
  }
  const l = Math.floor(Date.now() / ka) - gn, r = (i) => {
    const d = Te + i.toString(), f = it(a, d);
    if (typeof f == "string") {
      try {
        const p = JSON.parse(f);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > l && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        e(p, i))
          return !0;
      } catch {
      }
      Ht(a, d);
    }
  };
  let o = ut(a);
  for (let i = o - 1; i >= 0; i--)
    r(i) || (i === o - 1 ? (o--, dt(a, o)) : wa[t].add(i));
}
function Da() {
  if (!Ct) {
    hn(!0);
    for (const t in Ue)
      Ia(t, (e) => {
        const a = e.data, n = e.provider, l = a.prefix, r = he(
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
function yn(t, e) {
  const a = t.lastModifiedCached;
  if (
    // Matches or newer
    a && a >= e
  )
    return a === e;
  if (t.lastModifiedCached = e, a)
    for (const n in Ue)
      Ia(n, (l) => {
        const r = l.data;
        return l.provider !== t.provider || r.prefix !== t.prefix || r.lastModified === e;
      });
  return !0;
}
function kn(t, e) {
  Ct || Da();
  function a(n) {
    let l;
    if (!Ue[n] || !(l = _a(n)))
      return;
    const r = wa[n];
    let o;
    if (r.size)
      r.delete(o = Array.from(r).shift());
    else if (o = ut(l), o >= bn || !dt(l, o + 1))
      return;
    const i = {
      cached: Math.floor(Date.now() / ka),
      provider: t.provider,
      data: e
    };
    return xt(
      l,
      Te + o.toString(),
      JSON.stringify(i)
    );
  }
  e.lastModified && !yn(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && (e = Object.assign({}, e), delete e.not_found), a("local") || a("session"));
}
function Kt() {
}
function wn(t) {
  t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
    t.iconsLoaderFlag = !1, sn(t);
  }));
}
function _n(t, e) {
  t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
    t.iconsQueueFlag = !1;
    const { provider: a, prefix: n } = t, l = t.iconsToLoad;
    delete t.iconsToLoad;
    let r;
    !l || !(r = ot(a)) || r.prepare(a, n, l).forEach((o) => {
      mn(a, o, (i) => {
        if (typeof i != "object")
          o.icons.forEach((d) => {
            t.missing.add(d);
          });
        else
          try {
            const d = wt(
              t,
              i
            );
            if (!d.length)
              return;
            const f = t.pendingIcons;
            f && d.forEach((p) => {
              f.delete(p);
            }), kn(t, i);
          } catch (d) {
            console.error(d);
          }
        wn(t);
      });
    });
  }));
}
const In = (t, e) => {
  const a = cn(t, !0, va()), n = on(a);
  if (!n.pending.length) {
    let d = !0;
    return e && setTimeout(() => {
      d && e(
        n.loaded,
        n.missing,
        n.pending,
        Kt
      );
    }), () => {
      d = !1;
    };
  }
  const l = /* @__PURE__ */ Object.create(null), r = [];
  let o, i;
  return n.pending.forEach((d) => {
    const { provider: f, prefix: p } = d;
    if (p === i && f === o)
      return;
    o = f, i = p, r.push(he(f, p));
    const m = l[f] || (l[f] = /* @__PURE__ */ Object.create(null));
    m[p] || (m[p] = []);
  }), n.pending.forEach((d) => {
    const { provider: f, prefix: p, name: m } = d, k = he(f, p), B = k.pendingIcons || (k.pendingIcons = /* @__PURE__ */ new Set());
    B.has(m) || (B.add(m), l[f][p].push(m));
  }), r.forEach((d) => {
    const { provider: f, prefix: p } = d;
    l[f][p].length && _n(d, l[f][p]);
  }), e ? un(e, n, r) : Kt;
};
function Dn(t, e) {
  const a = {
    ...t
  };
  for (const n in e) {
    const l = e[n], r = typeof l;
    n in ma ? (l === null || l && (r === "string" || r === "number")) && (a[n] = l) : r === typeof a[n] && (a[n] = n === "rotate" ? l % 4 : l);
  }
  return a;
}
const xn = /[\s,]+/;
function Cn(t, e) {
  e.split(xn).forEach((a) => {
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
function Bn(t, e = 0) {
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
function Sn(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function En(t) {
  return "data:image/svg+xml," + Sn(t);
}
function An(t) {
  return 'url("' + En(t) + '")';
}
const zt = {
  ...ga,
  inline: !1
}, Ln = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Mn = {
  display: "inline-block"
}, ct = {
  backgroundColor: "currentColor"
}, xa = {
  backgroundColor: "transparent"
}, Qt = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Gt = {
  webkitMask: ct,
  mask: ct,
  background: xa
};
for (const t in Gt) {
  const e = Gt[t];
  for (const a in Qt)
    e[t + a] = Qt[a];
}
const Ve = {};
["horizontal", "vertical"].forEach((t) => {
  const e = t.slice(0, 1) + "Flip";
  Ve[t + "-flip"] = e, Ve[t.slice(0, 1) + "-flip"] = e, Ve[t + "Flip"] = e;
});
function Wt(t) {
  return t + (t.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ut = (t, e) => {
  const a = Dn(zt, e), n = { ...Ln }, l = e.mode || "svg", r = {}, o = e.style, i = typeof o == "object" && !(o instanceof Array) ? o : {};
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
          typeof v == "string" && Cn(a, v);
          break;
        case "color":
          r.color = v;
          break;
        case "rotate":
          typeof v == "string" ? a[P] = Bn(v) : typeof v == "number" && (a[P] = v);
          break;
        case "ariaHidden":
        case "aria-hidden":
          v !== !0 && v !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const S = Ve[P];
          S ? (v === !0 || v === "true" || v === 1) && (a[S] = !0) : zt[P] === void 0 && (n[P] = v);
        }
      }
  }
  const d = Ql(t, a), f = d.attributes;
  if (a.inline && (r.verticalAlign = "-0.125em"), l === "svg") {
    n.style = {
      ...r,
      ...i
    }, Object.assign(n, f);
    let P = 0, v = e.id;
    return typeof v == "string" && (v = v.replace(/-/g, "_")), n.innerHTML = Xl(d.body, v ? () => v + "ID" + P++ : "iconifyVue"), Ft("svg", n);
  }
  const { body: p, width: m, height: k } = t, B = l === "mask" || (l === "bg" ? !1 : p.indexOf("currentColor") !== -1), x = Tn(p, {
    ...f,
    width: m + "",
    height: k + ""
  });
  return n.style = {
    ...r,
    "--svg": An(x),
    width: Wt(f.width),
    height: Wt(f.height),
    ...Mn,
    ...B ? ct : xa,
    ...i
  }, Ft("span", n);
};
va(!0);
Yl("", rn);
if (typeof document < "u" && typeof window < "u") {
  Da();
  const t = window;
  if (t.IconifyPreload !== void 0) {
    const e = t.IconifyPreload, a = "Invalid IconifyPreload syntax.";
    typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach((n) => {
      try {
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !Vl(n)) && console.error(a);
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
          Zl(a, l) || console.error(n);
        } catch {
          console.error(n);
        }
      }
  }
}
const Fn = {
  ...We,
  body: ""
}, Pn = L({
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
      if (typeof t != "string" || (a = Ge(t, !1, !0)) === null)
        return this.abortLoading(), null;
      const n = Rl(a);
      if (!n)
        return (!this._loadingIcon || this._loadingIcon.name !== t) && (this.abortLoading(), this._name = "", n !== null && (this._loadingIcon = {
          name: t,
          abort: In([a], () => {
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
      ...We,
      ...e.data
    }, a);
  }
}), $n = /* @__PURE__ */ L({
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
    ia((d) => ({
      "98d5b8bc": i.value
    }));
    const e = t, a = O(null), n = I(() => `${+e.scale * 1.2}rem`), l = I(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    le(() => e.title, r);
    async function r() {
      var d, f, p, m;
      if (!((d = a.value) != null && d.$el))
        return;
      const k = !!((f = a.value) == null ? void 0 : f.$el).querySelector("title"), B = document.createElement("title");
      if (!e.title) {
        B.remove();
        return;
      }
      B.innerHTML = e.title, await da(), k || (m = ((p = a.value) == null ? void 0 : p.$el).firstChild) == null || m.before(B);
    }
    re(r);
    const o = I(() => {
      var d;
      return (d = e.name) != null && d.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), i = I(() => e.color ?? e.fill ?? "inherit");
    return (d, f) => (s(), N(M(Pn), {
      ref_key: "icon",
      ref: a,
      icon: o.value,
      style: ue({ fontSize: n.value, verticalAlign: d.verticalAlign, display: d.display }),
      "aria-label": d.label,
      class: $(["vicon", {
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
}), oe = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, ae = /* @__PURE__ */ oe($n, [["__scopeId", "data-v-33ecc4e5"]]), Rn = ["title", "disabled", "aria-disabled"], Nn = { key: 1 }, Vn = /* @__PURE__ */ L({
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
    const a = t, n = I(() => ["sm", "small"].includes(a.size)), l = I(() => ["md", "medium"].includes(a.size)), r = I(() => ["lg", "large"].includes(a.size)), o = O(null);
    e({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const i = I(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), d = I(() => a.iconOnly ? 1.25 : 0.8325), f = I(
      () => typeof a.icon == "string" ? { scale: d.value, name: a.icon } : { scale: d.value, ...a.icon }
    );
    return (p, m) => (s(), c("button", {
      ref_key: "btn",
      ref: o,
      class: $(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": n.value,
        "fr-btn--md": l.value,
        "fr-btn--lg": r.value,
        "fr-btn--icon-right": !p.iconOnly && i.value && p.iconRight,
        "fr-btn--icon-left": !p.iconOnly && i.value && !p.iconRight,
        "inline-flex": !i.value,
        reverse: p.iconRight && !i.value,
        "justify-center": !i.value && p.iconOnly,
        [p.icon]: i.value
      }]),
      title: p.iconOnly ? p.label : void 0,
      disabled: p.disabled,
      "aria-disabled": p.disabled,
      style: ue(!i.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: m[0] || (m[0] = (k) => p.onClick ? p.onClick(k) : () => {
      })
    }, [
      p.icon && !i.value ? (s(), N(ae, de(H({ key: 0 }, f.value)), null, 16)) : h("", !0),
      p.iconOnly ? h("", !0) : (s(), c("span", Nn, [
        V(b(p.label) + " ", 1),
        A(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Rn));
  }
}), Me = /* @__PURE__ */ oe(Vn, [["__scopeId", "data-v-77b13897"]]), Xe = /* @__PURE__ */ L({
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
    const e = t, a = O(null), n = I(() => ["sm", "small"].includes(e.size)), l = I(() => ["md", "medium"].includes(e.size)), r = I(() => ["lg", "large"].includes(e.size)), o = I(() => ["always", "", !0].includes(e.inlineLayoutWhen)), i = I(() => ["sm", "small"].includes(e.inlineLayoutWhen)), d = I(() => ["md", "medium"].includes(e.inlineLayoutWhen)), f = I(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = I(() => e.align === "center"), m = I(() => e.align === "right"), k = O("auto"), B = I(() => `--equisized-width: ${k.value};`), x = async () => {
      var P;
      let v = 0;
      await new Promise((S) => setTimeout(S, 100)), (P = a.value) == null || P.querySelectorAll(".fr-btn").forEach((S) => {
        const _ = S, D = _.offsetWidth, C = window.getComputedStyle(_), K = +C.marginLeft.replace("px", ""), g = +C.marginRight.replace("px", "");
        _.style.width = "var(--equisized-width)";
        const E = D + K + g;
        E > v && (v = E);
      }), k.value = `${v}px`;
    };
    return re(async () => {
      !a.value || !e.equisized || await x();
    }), (P, v) => (s(), c("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: ue(B.value),
      class: $(["fr-btns-group", {
        "fr-btns-group--equisized": P.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": l.value,
        "fr-btns-group--lg": r.value,
        "fr-btns-group--inline-sm": o.value || i.value,
        "fr-btns-group--inline-md": o.value || d.value,
        "fr-btns-group--inline-lg": o.value || f.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": P.iconRight,
        "fr-btns-group--inline-reverse": P.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (s(!0), c(q, null, Q(P.buttons, ({ onClick: S, ..._ }, D) => (s(), c("li", { key: D }, [
        X(Me, H({ ref_for: !0 }, _, { onClick: S }), null, 16, ["onClick"])
      ]))), 128)),
      A(P.$slots, "default")
    ], 6));
  }
}), jn = { class: "fr-callout__text" }, On = /* @__PURE__ */ L({
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
    const e = t, a = I(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), n = I(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : { ...e.icon ?? {} });
    return (l, r) => (s(), c("div", {
      class: $(["fr-callout", { [String(l.icon)]: a.value }])
    }, [
      l.icon && n.value ? (s(), N(ae, de(H({ key: 0 }, n.value)), null, 16)) : h("", !0),
      l.title ? (s(), N(ne(l.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: W(() => [
          V(b(l.title), 1)
        ]),
        _: 1
      })) : h("", !0),
      u("p", jn, b(l.content), 1),
      l.button ? (s(), N(Me, de(H({ key: 2 }, l.button)), null, 16)) : h("", !0),
      A(l.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), qn = /* @__PURE__ */ oe(On, [["__scopeId", "data-v-a34b4ad8"]]), ft = /* @__PURE__ */ L({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = I(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = I(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, r) => (s(), c("p", {
      class: $(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
    }, [
      l.icon && !a.value ? (s(), N(ae, de(H({ key: 0 }, n.value)), null, 16)) : h("", !0),
      A(l.$slots, "default")
    ], 2));
  }
}), Hn = { class: "fr-card__body" }, Kn = { class: "fr-card__content" }, zn = ["href"], Qn = { class: "fr-card__desc" }, Gn = {
  key: 0,
  class: "fr-card__start"
}, Wn = {
  key: 1,
  class: "fr-card__end"
}, Un = {
  key: 0,
  class: "fr-card__footer"
}, Xn = {
  key: 1,
  class: "fr-links-group"
}, Yn = ["href"], Zn = {
  key: 0,
  class: "fr-card__header"
}, Jn = {
  key: 0,
  class: "fr-card__img"
}, er = ["src", "alt"], tr = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, ar = /* @__PURE__ */ L({
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
    const a = t, n = I(() => ["sm", "small"].includes(a.size)), l = I(() => ["lg", "large"].includes(a.size)), r = I(() => ["sm", "small"].includes(a.imgRatio)), o = I(() => ["lg", "large"].includes(a.imgRatio)), i = I(() => typeof a.link == "string" && a.link.startsWith("http")), d = O(null);
    return e({ goToTargetLink: () => {
      var f;
      ((f = d.value) == null ? void 0 : f.querySelector(".fr-card__link")).click();
    } }), (f, p) => {
      const m = se("RouterLink");
      return s(), c("div", {
        class: $(["fr-card", {
          "fr-card--horizontal": f.horizontal,
          "fr-enlarge-link": !f.noArrow,
          "fr-card--sm": n.value,
          "fr-card--lg": l.value,
          "fr-card--horizontal-tier": r.value,
          "fr-card--horizontal-half": o.value,
          "fr-card--download": f.download,
          "fr-enlarge-button": f.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        u("div", Hn, [
          u("div", Kn, [
            (s(), N(ne(f.titleTag), { class: "fr-card__title" }, {
              default: W(() => [
                i.value ? (s(), c("a", {
                  key: 0,
                  href: f.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, b(f.title), 9, zn)) : f.link ? (s(), N(m, {
                  key: 1,
                  to: f.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (k) => k.stopPropagation())
                }, {
                  default: W(() => [
                    V(b(f.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (s(), c(q, { key: 2 }, [
                  V(b(f.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            u("p", Qn, b(f.description), 1),
            f.$slots["start-details"] || f.detail ? (s(), c("div", Gn, [
              A(f.$slots, "start-details"),
              f.detail ? (s(), N(ft, {
                key: 0,
                icon: f.detailIcon
              }, {
                default: W(() => [
                  V(b(f.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : h("", !0)
            ])) : h("", !0),
            f.$slots["end-details"] || f.endDetail ? (s(), c("div", Wn, [
              A(f.$slots, "end-details"),
              f.endDetail ? (s(), N(ft, {
                key: 0,
                icon: f.endDetailIcon
              }, {
                default: W(() => [
                  V(b(f.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : h("", !0)
            ])) : h("", !0)
          ]),
          f.buttons.length || f.linksGroup.length ? (s(), c("div", Un, [
            f.buttons.length ? (s(), N(Xe, {
              key: 0,
              buttons: f.buttons,
              "inline-layout-when": "always",
              size: f.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : h("", !0),
            f.linksGroup.length ? (s(), c("ul", Xn, [
              (s(!0), c(q, null, Q(f.linksGroup, (k, B) => (s(), c("li", {
                key: `card-link-${B}`
              }, [
                k.to ? (s(), N(m, {
                  key: 0,
                  to: k.to
                }, {
                  default: W(() => [
                    V(b(k.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (s(), c("a", {
                  key: 1,
                  href: k.link || k.href,
                  class: $(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": l.value
                  }])
                }, b(k.label), 11, Yn))
              ]))), 128))
            ])) : h("", !0)
          ])) : h("", !0)
        ]),
        f.imgSrc || f.badges.length ? (s(), c("div", Zn, [
          f.imgSrc ? (s(), c("div", Jn, [
            u("img", {
              src: f.imgSrc,
              class: "fr-responsive-img",
              alt: f.altImg,
              "data-testid": "card-img"
            }, null, 8, er)
          ])) : h("", !0),
          f.badges.length ? (s(), c("ul", tr, [
            (s(!0), c(q, null, Q(f.badges, (k, B) => (s(), c("li", { key: B }, [
              X(ua, H({ ref_for: !0 }, k), null, 16)
            ]))), 128))
          ])) : h("", !0)
        ])) : h("", !0)
      ], 2);
    };
  }
}), lr = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], nr = ["for"], rr = {
  key: 0,
  class: "required"
}, or = {
  key: 0,
  class: "fr-hint-text"
}, sr = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, Bt = /* @__PURE__ */ L({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ be({
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
    const e = t, a = I(() => e.errorMessage || e.validMessage), n = I(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = ie(t, "modelValue");
    return (r, o) => (s(), c("div", {
      class: $(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      u("div", {
        class: $(["fr-checkbox-group", {
          "fr-checkbox-group--error": r.errorMessage,
          "fr-checkbox-group--valid": !r.errorMessage && r.validMessage,
          "fr-checkbox-group--sm": r.small
        }])
      }, [
        pe(u("input", H({
          id: r.id,
          "onUpdate:modelValue": o[0] || (o[0] = (i) => l.value = i),
          name: r.name,
          type: "checkbox",
          value: r.value,
          checked: l.value === !0 || Array.isArray(l.value) && l.value.includes(r.value),
          required: r.required
        }, r.$attrs, {
          "data-testid": `input-checkbox-${r.id}`,
          "data-test": `input-checkbox-${r.id}`
        }), null, 16, lr), [
          [ze, l.value]
        ]),
        u("label", {
          for: r.id,
          class: "fr-label"
        }, [
          A(r.$slots, "label", {}, () => [
            V(b(r.label) + " ", 1),
            A(r.$slots, "required-tip", {}, () => [
              r.required ? (s(), c("span", rr, " *")) : h("", !0)
            ])
          ]),
          r.hint ? (s(), c("span", or, b(r.hint), 1)) : h("", !0)
        ], 8, nr),
        a.value ? (s(), c("div", sr, [
          u("p", {
            class: $(["fr-message--info flex items-center", n.value])
          }, b(a.value), 3)
        ])) : h("", !0)
      ], 2)
    ], 2));
  }
}), ir = { class: "fr-form-group" }, dr = ["disabled", "aria-labelledby", "aria-invalid", "role"], ur = ["id"], cr = {
  key: 0,
  class: "required"
}, fr = ["id"], pr = /* @__PURE__ */ L({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ be({
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
    const e = t, a = I(() => e.errorMessage || e.validMessage), n = I(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = I(() => a.value ? `${e.titleId} messages-${e.titleId}` : e.titleId), r = ie(t, "modelValue");
    return (o, i) => (s(), c("div", ir, [
      u("fieldset", {
        class: $(["fr-fieldset", {
          "fr-fieldset--error": o.errorMessage,
          "fr-fieldset--valid": !o.errorMessage && o.validMessage
        }]),
        disabled: o.disabled,
        "aria-labelledby": l.value,
        "aria-invalid": o.ariaInvalid,
        role: o.errorMessage || o.validMessage ? "group" : void 0
      }, [
        u("legend", {
          id: o.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          A(o.$slots, "legend", {}, () => [
            V(b(o.legend) + " ", 1),
            A(o.$slots, "required-tip", {}, () => [
              o.required ? (s(), c("span", cr, " *")) : h("", !0)
            ])
          ])
        ], 8, ur),
        A(o.$slots, "default", {}, () => [
          (s(!0), c(q, null, Q(o.options, (d) => (s(), N(Bt, {
            id: d.id,
            key: d.id || d.name,
            modelValue: r.value,
            "onUpdate:modelValue": i[0] || (i[0] = (f) => r.value = f),
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
        a.value ? (s(), c("div", {
          key: 0,
          id: `messages-${o.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          u("p", {
            class: $(["fr-message--info flex items-center", n.value])
          }, [
            u("span", null, b(a.value), 1)
          ], 2)
        ], 8, fr)) : h("", !0)
      ], 10, dr)
    ]));
  }
}), vr = { class: "fr-consent-banner__content" }, mr = { class: "fr-text--sm" }, gr = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, br = /* @__PURE__ */ L({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = I(() => typeof e.url == "string" && e.url.startsWith("http")), n = I(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = I(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (r, o) => (s(), c(q, null, [
      u("div", vr, [
        u("p", mr, [
          A(r.$slots, "default", {}, () => [
            o[4] || (o[4] = V(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (s(), N(ne(n.value), H(l.value, { "data-testid": "link" }), {
              default: W(() => o[3] || (o[3] = [
                V(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = V(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      u("ul", gr, [
        u("li", null, [
          u("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = G((i) => r.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        u("li", null, [
          u("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = G((i) => r.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        u("li", null, [
          u("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = G((i) => r.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), hr = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, yr = { class: "fr-pagination__list" }, kr = ["href", "title", "disabled", "aria-disabled"], wr = ["href", "title", "disabled", "aria-disabled"], _r = ["href", "title", "aria-current", "onClick"], Ir = { key: 0 }, Dr = { key: 1 }, xr = ["href", "title", "disabled", "aria-disabled"], Cr = ["href", "title", "disabled", "aria-disabled"], Br = /* @__PURE__ */ L({
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
    const a = t, n = e, l = I(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), r = I(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), o = I(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, r.value + 1) : a.pages), i = (x) => n("update:current-page", x), d = (x) => i(x), f = () => d(0), p = () => d(Math.max(0, a.currentPage - 1)), m = () => d(Math.min(a.pages.length - 1, a.currentPage + 1)), k = () => d(a.pages.length - 1), B = (x) => a.pages.indexOf(x) === a.currentPage;
    return (x, P) => {
      var v, S, _, D;
      return s(), c("nav", hr, [
        u("ul", yr, [
          u("li", null, [
            u("a", {
              href: (v = x.pages[0]) == null ? void 0 : v.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: x.firstPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: P[0] || (P[0] = G((C) => f(), ["prevent"]))
            }, null, 8, kr)
          ]),
          u("li", null, [
            u("a", {
              href: (S = x.pages[Math.max(x.currentPage - 1, 0)]) == null ? void 0 : S.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: x.prevPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: P[1] || (P[1] = G((C) => p(), ["prevent"]))
            }, b(x.prevPageTitle), 9, wr)
          ]),
          (s(!0), c(q, null, Q(o.value, (C, K) => (s(), c("li", { key: K }, [
            u("a", {
              href: C == null ? void 0 : C.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: C.title,
              "aria-current": B(C) ? "page" : void 0,
              onClick: G((g) => d(x.pages.indexOf(C)), ["prevent"])
            }, [
              o.value.indexOf(C) === 0 && l.value > 0 ? (s(), c("span", Ir, "...")) : h("", !0),
              V(" " + b(C.label) + " ", 1),
              o.value.indexOf(C) === o.value.length - 1 && r.value < x.pages.length - 1 ? (s(), c("span", Dr, "...")) : h("", !0)
            ], 8, _r)
          ]))), 128)),
          u("li", null, [
            u("a", {
              href: (_ = x.pages[Math.min(x.currentPage + 1, x.pages.length - 1)]) == null ? void 0 : _.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: x.nextPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: P[2] || (P[2] = G((C) => m(), ["prevent"]))
            }, b(x.nextPageTitle), 9, xr)
          ]),
          u("li", null, [
            u("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (D = x.pages.at(-1)) == null ? void 0 : D.href,
              title: x.lastPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: P[3] || (P[3] = G((C) => k(), ["prevent"]))
            }, null, 8, Cr)
          ])
        ])
      ]);
    };
  }
}), Tt = /* @__PURE__ */ oe(Br, [["__scopeId", "data-v-4dfa8248"]]), Tr = { class: "fr-table" }, Sr = { class: "fr-table__wrapper" }, Er = { class: "fr-table__container" }, Ar = { class: "fr-table__content" }, Lr = ["id"], Mr = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Fr = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Pr = ["id", "checked"], $r = ["for"], Rr = ["tabindex", "onClick", "onKeydown"], Nr = { key: 0 }, Vr = { key: 1 }, jr = ["data-row-key"], Or = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, qr = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Hr = ["id", "value"], Kr = ["for"], zr = ["onKeydown"], Qr = { class: "flex gap-2 items-center" }, Gr = ["selected"], Wr = ["value", "selected"], Ur = { class: "flex ml-1" }, Xr = { class: "self-center" }, Yr = /* @__PURE__ */ L({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ be({
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
  emits: /* @__PURE__ */ be(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(t, { emit: e }) {
    const a = t, n = e, l = ie(t, "selection"), r = ie(t, "rowsPerPage"), o = ie(t, "currentPage"), i = I(() => Math.ceil(a.rows.length / r.value)), d = I(() => a.pages ?? Array.from({ length: i.value }).map((g, E) => ({ label: `${E + 1}`, title: `Page ${E + 1}`, href: `#${E + 1}` }))), f = I(() => o.value * r.value), p = I(() => (o.value + 1) * r.value);
    function m(g, E) {
      const y = a.sorted;
      return (g[y] ?? g) < (E[y] ?? E) ? -1 : (g[y] ?? g) > (E[y] ?? E) ? 1 : 0;
    }
    const k = ie(t, "sortedBy"), B = ie(t, "sortedDesc");
    function x(g) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(g))) {
        if (k.value === g) {
          if (B.value) {
            k.value = void 0, B.value = !1;
            return;
          }
          B.value = !0;
          return;
        }
        B.value = !1, k.value = g;
      }
    }
    const P = I(() => {
      const g = k.value ? a.rows.slice().sort(a.sortFn ?? m) : a.rows.slice();
      return B.value && g.reverse(), g;
    }), v = I(() => {
      const g = a.headersRow.map((y) => typeof y != "object" ? y : y.key), E = P.value.map((y) => Array.isArray(y) ? y : g.map((U) => typeof y != "object" ? y : y[U] ?? y));
      return a.pagination ? E.slice(f.value, p.value) : E;
    });
    function S(g) {
      if (g) {
        const E = a.headersRow.findIndex((y) => y.key ?? y);
        l.value = v.value.map((y) => y[E]);
      }
      l.value.length = 0;
    }
    const _ = O(!1);
    function D() {
      _.value = l.value.length === v.value.length;
    }
    function C() {
      n("update:current-page", 0), _.value = !1, l.value.length = 0;
    }
    function K(g) {
      navigator.clipboard.writeText(g);
    }
    return (g, E) => (s(), c("div", Tr, [
      u("div", Sr, [
        u("div", Er, [
          u("div", Ar, [
            u("table", { id: g.id }, [
              u("caption", null, b(g.title), 1),
              u("thead", null, [
                u("tr", null, [
                  g.selectableRows ? (s(), c("th", Mr, [
                    u("div", Fr, [
                      u("input", {
                        id: `table-select--${g.id}-all`,
                        checked: _.value,
                        type: "checkbox",
                        onInput: E[0] || (E[0] = (y) => S(y.target.checked))
                      }, null, 40, Pr),
                      u("label", {
                        class: "fr-label",
                        for: `table-select--${g.id}-all`
                      }, " Sélectionner tout ", 8, $r)
                    ])
                  ])) : h("", !0),
                  (s(!0), c(q, null, Q(g.headersRow, (y, U) => (s(), c("th", H({
                    key: typeof y == "object" ? y.key : y,
                    scope: "col",
                    ref_for: !0
                  }, typeof y == "object" && y.headerAttrs, {
                    tabindex: g.sortableRows ? 0 : void 0,
                    onClick: (w) => x(y.key ?? (Array.isArray(g.rows[0]) ? U : y)),
                    onKeydown: [
                      Y((w) => x(y.key ?? y), ["enter"]),
                      Y((w) => x(y.key ?? y), ["space"])
                    ]
                  }), [
                    u("div", {
                      class: $({ "sortable-header": g.sortableRows === !0 || Array.isArray(g.sortableRows) && g.sortableRows.includes(y.key ?? y) })
                    }, [
                      A(g.$slots, "header", H({ ref_for: !0 }, typeof y == "object" ? y : { key: y, label: y }), () => [
                        V(b(typeof y == "object" ? y.label : y), 1)
                      ], !0),
                      k.value !== (y.key ?? y) && (g.sortableRows === !0 || Array.isArray(g.sortableRows) && g.sortableRows.includes(y.key ?? y)) ? (s(), c("span", Nr, [
                        X(ae, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : k.value === (y.key ?? y) ? (s(), c("span", Vr, [
                        X(ae, {
                          name: B.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : h("", !0)
                    ], 2)
                  ], 16, Rr))), 128))
                ])
              ]),
              u("tbody", null, [
                (s(!0), c(q, null, Q(v.value, (y, U) => (s(), c("tr", {
                  key: `row-${U}`,
                  "data-row-key": U + 1
                }, [
                  g.selectableRows ? (s(), c("th", Or, [
                    u("div", qr, [
                      pe(u("input", {
                        id: `row-select-${g.id}-${U}`,
                        "onUpdate:modelValue": E[1] || (E[1] = (w) => l.value = w),
                        value: g.rows[U][g.rowKey] ?? `row-${U}`,
                        type: "checkbox",
                        onChange: E[2] || (E[2] = (w) => D())
                      }, null, 40, Hr), [
                        [ze, l.value]
                      ]),
                      u("label", {
                        class: "fr-label",
                        for: `row-select-${g.id}-${U}`
                      }, " Sélectionner la ligne " + b(U + 1), 9, Kr)
                    ])
                  ])) : h("", !0),
                  (s(!0), c(q, null, Q(y, (w, T) => (s(), c("td", {
                    key: typeof w == "object" ? w[g.rowKey] : w,
                    tabindex: "0",
                    onKeydown: [
                      Y(G((j) => K(typeof w == "object" ? w[g.rowKey] : w), ["ctrl"]), ["c"]),
                      Y(G((j) => K(typeof w == "object" ? w[g.rowKey] : w), ["meta"]), ["c"])
                    ]
                  }, [
                    A(g.$slots, "cell", H({ ref_for: !0 }, {
                      colKey: typeof g.headersRow[T] == "object" ? g.headersRow[T].key : g.headersRow[T],
                      cell: w
                    }), () => [
                      V(b(typeof w == "object" ? w[g.rowKey] : w), 1)
                    ], !0)
                  ], 40, zr))), 128))
                ], 8, jr))), 128))
              ])
            ], 8, Lr)
          ])
        ])
      ]),
      u("div", {
        class: $(g.bottomActionBarClass)
      }, [
        A(g.$slots, "pagination", {}, () => [
          g.pagination && !g.$slots.pagination ? (s(), c("div", {
            key: 0,
            class: $(["flex justify-between items-center", g.paginationWrapperClass])
          }, [
            u("div", Qr, [
              E[6] || (E[6] = u("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              pe(u("select", {
                id: "pagination-options",
                "onUpdate:modelValue": E[3] || (E[3] = (y) => r.value = y),
                class: "fr-select",
                onChange: E[4] || (E[4] = (y) => C())
              }, [
                u("option", {
                  value: "",
                  selected: !g.paginationOptions.includes(r.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Gr),
                (s(!0), c(q, null, Q(g.paginationOptions, (y, U) => (s(), c("option", {
                  key: U,
                  value: y,
                  selected: +y === r.value
                }, b(y), 9, Wr))), 128))
              ], 544), [
                [ht, r.value]
              ])
            ]),
            u("div", Ur, [
              u("span", Xr, "Page " + b(o.value + 1) + " sur " + b(i.value), 1)
            ]),
            X(Tt, {
              "current-page": o.value,
              "onUpdate:currentPage": E[5] || (E[5] = (y) => o.value = y),
              pages: d.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : h("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Zr = /* @__PURE__ */ oe(Yr, [["__scopeId", "data-v-1d55e1f1"]]), Jr = "data:image/png;base64,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", eo = { class: "fr-container flex" }, to = { class: "half" }, ao = { class: "fr-h1" }, lo = { class: "flex fr-my-md-3w" }, no = { class: "fr-h6" }, ro = /* @__PURE__ */ L({
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
      return s(), c("div", eo, [
        u("div", to, [
          u("h1", ao, b(e.title), 1),
          u("span", lo, b(e.subtitle), 1),
          u("p", no, b(e.description), 1),
          u("p", null, b(e.help), 1),
          (n = e.buttons) != null && n.length ? (s(), N(Xe, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : h("", !0),
          A(e.$slots, "default", {}, void 0, !0)
        ]),
        a[0] || (a[0] = u("div", { class: "half self-center text-center" }, [
          u("img", {
            class: "error-img",
            src: Jr
          })
        ], -1))
      ]);
    };
  }
}), oo = /* @__PURE__ */ oe(ro, [["__scopeId", "data-v-0f6cf5b4"]]), so = { class: "fr-fieldset" }, io = ["id"], uo = {
  key: 1,
  class: "fr-fieldset__element"
}, co = { class: "fr-fieldset__element" }, fo = /* @__PURE__ */ L({
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
      return s(), c("fieldset", so, [
        e.legend || (l = (n = e.$slots).legend) != null && l.call(n).length ? (s(), c("legend", {
          key: 0,
          id: e.legendId,
          class: $(["fr-fieldset__legend", e.legendClass])
        }, [
          V(b(e.legend) + " ", 1),
          A(e.$slots, "legend")
        ], 10, io)) : h("", !0),
        e.hint || (o = (r = e.$slots).hint) != null && o.call(r).length ? (s(), c("div", uo, [
          u("span", {
            class: $(["fr-hint-text", e.hintClass])
          }, [
            V(b(e.hint) + " ", 1),
            A(e.$slots, "hint")
          ], 2)
        ])) : h("", !0),
        u("div", co, [
          A(e.$slots, "default")
        ])
      ]);
    };
  }
}), po = ["href", "download"], vo = { class: "fr-link__detail" }, Ca = /* @__PURE__ */ L({
  __name: "DsfrFileDownload",
  props: {
    title: { default: "Télécharger le document" },
    format: { default: "JPEG" },
    size: { default: "250 Ko" },
    href: { default: "#" },
    download: { default: "" }
  },
  setup(t) {
    return (e, a) => (s(), c("a", {
      href: e.href,
      download: e.download,
      class: "fr-link fr-link--download"
    }, [
      V(b(e.title) + " ", 1),
      u("span", vo, b(e.format) + " – " + b(e.size), 1)
    ], 8, po));
  }
}), mo = { class: "fr-downloads-group fr-downloads-group--bordered" }, go = {
  key: 0,
  class: "fr-downloads-group__title"
}, bo = /* @__PURE__ */ L({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (s(), c("div", mo, [
      e.title ? (s(), c("h4", go, b(e.title), 1)) : h("", !0),
      u("ul", null, [
        (s(!0), c(q, null, Q(e.files, (n, l) => (s(), c("li", { key: l }, [
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
}), ho = ["for"], yo = {
  key: 0,
  class: "required"
}, ko = {
  key: 1,
  class: "fr-hint-text"
}, wo = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], _o = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Io = ["id"], Do = /* @__PURE__ */ L({
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
      var i, d;
      n("update:modelValue", (i = o.target) == null ? void 0 : i.value), n("change", (d = o.target) == null ? void 0 : d.files);
    }, r = I(() => Array.isArray(a.accept) ? a.accept.join(",") : a.accept);
    return (o, i) => (s(), c("div", {
      class: $(["fr-upload-group", {
        "fr-upload-group--error": o.error,
        "fr-upload-group--valid": o.validMessage,
        "fr-upload-group--disabled": o.disabled
      }])
    }, [
      u("label", {
        class: "fr-label",
        for: o.id
      }, [
        V(b(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (s(), c("span", yo, " *")) : h("", !0),
        o.hint ? (s(), c("span", ko, b(o.hint), 1)) : h("", !0)
      ], 8, ho),
      u("input", H({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: r.value,
        onChange: i[0] || (i[0] = (d) => l(d))
      }), null, 16, wo),
      o.error || o.validMessage ? (s(), c("div", _o, [
        o.error ? (s(), c("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, b(o.error ?? o.validMessage), 9, Io)) : h("", !0)
      ])) : h("", !0)
    ], 2));
  }
}), xo = { class: "fr-follow__newsletter" }, Co = { class: "fr-h5 fr-follow__title" }, Bo = { class: "fr-text--sm fr-follow__desc" }, To = { key: 0 }, So = ["title"], Eo = { key: 1 }, Ao = { action: "" }, Lo = {
  class: "fr-label",
  for: "newsletter-email"
}, Mo = { class: "fr-input-wrap fr-input-wrap--addon" }, Fo = ["title", "placeholder", "value"], Po = ["title"], $o = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Ro = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, No = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, Ba = /* @__PURE__ */ L({
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
    return (l, r) => (s(), c("div", xo, [
      u("div", null, [
        u("h3", Co, b(l.title), 1),
        u("p", Bo, b(l.description), 1)
      ]),
      l.onlyCallout ? (s(), c("div", To, [
        u("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: r[0] || (r[0] = (o) => l.buttonAction ? l.buttonAction(o) : () => {
          })
        }, b(l.buttonText), 9, So)
      ])) : (s(), c("div", Eo, [
        u("form", Ao, [
          u("label", Lo, b(l.labelEmail), 1),
          u("div", Mo, [
            u("input", {
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
            u("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, b(l.buttonText), 9, Po)
          ]),
          l.error ? (s(), c("div", $o, [
            u("p", Ro, b(l.error), 1)
          ])) : h("", !0),
          u("p", No, b(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), Vo = { class: "fr-follow__social" }, jo = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Oo = ["title", "href"], Ta = /* @__PURE__ */ L({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (s(), c("div", Vo, [
      (s(), N(ne(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: W(() => a[0] || (a[0] = [
          V(" Suivez-nous "),
          u("br", null, null, -1),
          V(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (s(), c("ul", jo, [
        (s(!0), c(q, null, Q(e.networks, (n, l) => (s(), c("li", { key: l }, [
          u("a", {
            class: $(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, b(n.name), 11, Oo)
        ]))), 128))
      ])) : h("", !0)
    ]));
  }
}), qo = { class: "fr-follow" }, Ho = { class: "fr-container" }, Ko = { class: "fr-grid-row" }, zo = /* @__PURE__ */ L({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = I(() => e.networks && e.networks.length), n = I(() => typeof e.newsletterData == "object");
    return (l, r) => (s(), c("div", qo, [
      u("div", Ho, [
        u("div", Ko, [
          A(l.$slots, "default", {}, () => [
            l.newsletterData ? (s(), c("div", {
              key: 0,
              class: $(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              X(Ba, de(gt(l.newsletterData)), null, 16)
            ], 2)) : h("", !0),
            a.value ? (s(), c("div", {
              key: 1,
              class: $(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              X(Ta, { networks: l.networks }, null, 8, ["networks"])
            ], 2)) : h("", !0)
          ])
        ])
      ])
    ]));
  }
}), Xt = 1, Sa = /* @__PURE__ */ L({
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
    const e = t, a = I(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("http");
    }), n = I(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("mailto");
    }), l = I(() => e.button ? "button" : a.value || n.value ? "a" : "RouterLink"), r = I(() => {
      if (!(!a.value && !n.value))
        return e.href;
    }), o = I(() => {
      if (!(a.value || n.value))
        return e.to;
    }), i = I(() => o.value ? { to: o.value } : { href: r.value }), d = I(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), f = I(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Xt, ...e.iconAttrs ?? {} } : { scale: Xt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, m) => (s(), N(ne(l.value), H({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": d.value && p.iconRight,
        "fr-btn--icon-left": d.value && !p.iconRight,
        [String(p.icon)]: d.value
      }]
    }, i.value, {
      target: p.target,
      onClick: G(p.onClick, ["stop"])
    }), {
      default: W(() => {
        var k, B;
        return [
          !d.value && (p.icon || (k = p.iconAttrs) != null && k.name) && !p.iconRight ? (s(), N(ae, H({
            key: 0,
            class: "fr-mr-1w"
          }, f.value), null, 16)) : h("", !0),
          V(" " + b(p.label) + " ", 1),
          !d.value && (p.icon || (B = p.iconAttrs) != null && B.name) && p.iconRight ? (s(), N(ae, H({
            key: 1,
            class: "fr-ml-1w"
          }, f.value), null, 16)) : h("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Qo = { class: "fr-footer__partners" }, Go = {
  key: 0,
  class: "fr-footer__partners-title"
}, Wo = { class: "fr-footer__partners-logos" }, Uo = {
  key: 0,
  class: "fr-footer__partners-main"
}, Xo = ["href"], Yo = ["src", "alt"], Zo = { class: "fr-footer__partners-sub" }, Jo = ["href"], es = ["src", "alt"], Ea = /* @__PURE__ */ L({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (s(), c("div", Qo, [
      e.title ? (s(), c("h4", Go, b(e.title), 1)) : h("", !0),
      u("div", Wo, [
        e.mainPartner ? (s(), c("div", Uo, [
          u("a", {
            class: "fr-footer__partners-link",
            href: e.mainPartner.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, [
            u("img", {
              class: "fr-footer__logo",
              src: e.mainPartner.logo,
              alt: e.mainPartner.name
            }, null, 8, Yo)
          ], 8, Xo)
        ])) : h("", !0),
        u("div", Zo, [
          u("ul", null, [
            (s(!0), c(q, null, Q(e.subPartners, (n, l) => (s(), c("li", { key: l }, [
              u("a", {
                class: "fr-footer__partners-link",
                href: n.href,
                target: "_blank",
                rel: "noopener noreferrer"
              }, [
                u("img", {
                  class: "fr-footer__logo",
                  src: n.logo,
                  alt: n.name
                }, null, 8, es)
              ], 8, Jo)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), ts = ["innerHTML"], Se = /* @__PURE__ */ L({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(t) {
    const e = t, a = I(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (n, l) => (s(), c("p", {
      class: $(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: a.value
    }, null, 10, ts));
  }
}), as = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, ls = {
  key: 0,
  class: "fr-footer__top"
}, ns = { class: "fr-container" }, rs = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, os = { class: "fr-container" }, ss = { class: "fr-footer__body" }, is = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, ds = ["href"], us = ["src", "alt"], cs = ["src", "alt"], fs = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, ps = { class: "fr-footer__content" }, vs = { class: "fr-footer__content-desc" }, ms = { class: "fr-footer__content-list" }, gs = ["href", "title"], bs = { class: "fr-footer__bottom" }, hs = { class: "fr-footer__bottom-list" }, ys = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, ks = /* @__PURE__ */ L({
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
    const e = t, a = I(() => [
      ...e.beforeMandatoryLinks,
      ...e.mandatoryLinks,
      ...e.afterMandatoryLinks
    ]), n = bt(), l = I(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n).length;
    }), r = I(() => {
      const p = e.licenceTo || e.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = I(() => {
      const { to: p, href: m, ...k } = e.licenceLinkProps ?? {};
      return k;
    }), i = I(() => r.value ? "" : e.licenceTo), d = I(() => r.value ? e.licenceTo : ""), f = I(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (p, m) => {
      const k = se("RouterLink");
      return s(), c("footer", as, [
        l.value ? (s(), c("div", ls, [
          u("div", ns, [
            u("div", rs, [
              A(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : h("", !0),
        u("div", os, [
          u("div", ss, [
            p.operatorImgSrc ? (s(), c("div", is, [
              X(Se, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              f.value ? (s(), c("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                u("img", {
                  class: "fr-footer__logo",
                  style: ue(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, us)
              ], 8, ds)) : (s(), N(k, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: W(() => [
                  u("img", {
                    class: "fr-footer__logo",
                    style: ue(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, cs)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (s(), c("div", fs, [
              X(k, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: W(() => [
                  X(Se, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            u("div", ps, [
              u("p", vs, [
                A(p.$slots, "description", {}, () => [
                  V(b(p.descText), 1)
                ], !0)
              ]),
              u("ul", ms, [
                (s(!0), c(q, null, Q(p.ecosystemLinks, ({ href: B, label: x, title: P, ...v }, S) => (s(), c("li", {
                  key: S,
                  class: "fr-footer__content-item"
                }, [
                  u("a", H({
                    class: "fr-footer__content-link",
                    href: B,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: P,
                    ref_for: !0
                  }, v), b(x), 17, gs)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (s(), N(Ea, de(H({ key: 0 }, p.partners)), null, 16)) : h("", !0),
          u("div", bs, [
            u("ul", hs, [
              (s(!0), c(q, null, Q(a.value, (B, x) => (s(), c("li", {
                key: x,
                class: "fr-footer__bottom-item"
              }, [
                X(Sa, H({ ref_for: !0 }, B), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (s(), c("div", ys, [
              u("p", null, [
                V(b(p.licenceText) + " ", 1),
                (s(), N(ne(r.value ? "a" : "RouterLink"), H({
                  class: "fr-link-licence no-content-after",
                  to: r.value ? void 0 : i.value,
                  href: r.value ? d.value : void 0,
                  target: r.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: W(() => [
                    V(b(p.licenceName), 1)
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
}), ws = /* @__PURE__ */ oe(ks, [["__scopeId", "data-v-4d6f52aa"]]), _s = { class: "fr-footer__top-cat" }, Is = { class: "fr-footer__top-list" }, Ds = ["href"], xs = /* @__PURE__ */ L({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const n = se("RouterLink");
      return s(), c("div", null, [
        u("h3", _s, b(e.categoryName), 1),
        u("ul", Is, [
          (s(!0), c(q, null, Q(e.links, (l, r) => (s(), c("li", { key: r }, [
            typeof l.to == "string" && l.to.startsWith("http") ? (s(), c("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: l.to
            }, b(l.label), 9, Ds)) : h("", !0),
            typeof l.to == "object" || typeof l.to == "string" && !l.to.startsWith("http") ? (s(), N(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: l.to
            }, {
              default: W(() => [
                V(b(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : h("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Cs = { class: "fr-connect-group" }, Bs = { class: "fr-connect__brand" }, Ts = ["href", "title"], Ss = /* @__PURE__ */ L({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (s(), c("div", Cs, [
      u("button", {
        class: $(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        a[0] || (a[0] = u("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        u("span", Bs, "FranceConnect" + b(e.secure ? "+" : ""), 1)
      ], 2),
      u("p", null, [
        u("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, b(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, Ts)
      ])
    ]));
  }
}), Es = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, As = { class: "fr-nav__item" }, Ls = ["aria-controls", "aria-expanded"], Ms = { class: "fr-hidden-lg" }, Fs = ["id"], Ps = { class: "fr-menu__list" }, $s = ["hreflang", "lang", "aria-current", "href", "onClick"], Ee = /* @__PURE__ */ L({
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
      doExpand: i,
      onTransitionEnd: d
    } = me(), f = O(!1);
    function p(k) {
      f.value = !1, n("select", k);
    }
    const m = I(
      () => a.languages.find(({ codeIso: k }) => k === a.currentLanguage)
    );
    return le(f, (k, B) => {
      k !== B && i(k);
    }), (k, B) => {
      var x, P;
      return s(), c("nav", Es, [
        u("div", As, [
          u("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": k.id,
            "aria-expanded": f.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: B[0] || (B[0] = G((v) => f.value = !f.value, ["prevent", "stop"]))
          }, [
            V(b((x = m.value) == null ? void 0 : x.codeIso.toUpperCase()), 1),
            u("span", Ms, " - " + b((P = m.value) == null ? void 0 : P.label), 1)
          ], 8, Ls),
          u("div", {
            id: k.id,
            ref_key: "collapse",
            ref: l,
            class: $(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": M(o), "fr-collapsing": M(r) }]),
            onTransitionend: B[1] || (B[1] = (v) => M(d)(f.value))
          }, [
            u("ul", Ps, [
              (s(!0), c(q, null, Q(k.languages, (v, S) => (s(), c("li", { key: S }, [
                u("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: v.codeIso,
                  lang: v.codeIso,
                  "aria-current": k.currentLanguage === v.codeIso ? !0 : void 0,
                  href: `#${v.codeIso}`,
                  onClick: G((_) => p(v), ["prevent", "stop"])
                }, b(`${v.codeIso.toUpperCase()} - ${v.label}`), 9, $s)
              ]))), 128))
            ])
          ], 42, Fs)
        ])
      ]);
    };
  }
}), Rs = ["for"], Ns = {
  key: 0,
  class: "required"
}, Vs = {
  key: 0,
  class: "fr-hint-text"
}, js = /* @__PURE__ */ L({
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
      var f;
      return (f = l.value) == null ? void 0 : f.focus();
    }, o = I(() => a.isTextarea ? "textarea" : "input"), i = I(() => a.isWithWrapper || n.type === "date" || !!a.wrapperClass), d = I(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: r
    }), (f, p) => (s(), c(q, null, [
      u("label", {
        class: $(d.value),
        for: f.id
      }, [
        A(f.$slots, "label", {}, () => [
          V(b(f.label) + " ", 1),
          A(f.$slots, "required-tip", {}, () => [
            "required" in f.$attrs && f.$attrs.required !== !1 ? (s(), c("span", Ns, "*")) : h("", !0)
          ], !0)
        ], !0),
        f.hint ? (s(), c("span", Vs, b(f.hint), 1)) : h("", !0)
      ], 10, Rs),
      i.value ? (s(), c("div", {
        key: 1,
        class: $([
          { "fr-input-wrap": f.isWithWrapper || f.$attrs.type === "date" },
          f.wrapperClass
        ])
      }, [
        (s(), N(ne(o.value), H({ id: f.id }, f.$attrs, {
          ref_key: "__input",
          ref: l,
          class: ["fr-input", {
            "fr-input--error": f.isInvalid,
            "fr-input--valid": f.isValid
          }],
          value: f.modelValue,
          "aria-describedby": f.descriptionId || void 0,
          onInput: p[1] || (p[1] = (m) => f.$emit("update:modelValue", m.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (s(), N(ne(o.value), H({
        key: 0,
        id: f.id
      }, f.$attrs, {
        ref_key: "__input",
        ref: l,
        class: ["fr-input", {
          "fr-input--error": f.isInvalid,
          "fr-input--valid": f.isValid
        }],
        value: f.modelValue,
        "aria-describedby": f.descriptionId || void 0,
        onInput: p[0] || (p[0] = (m) => f.$emit("update:modelValue", m.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), St = /* @__PURE__ */ oe(js, [["__scopeId", "data-v-6e6c295a"]]), Ae = /* @__PURE__ */ L({
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
    return (n, l) => (s(), c("div", {
      class: $(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      X(St, {
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
      X(Me, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: l[2] || (l[2] = (r) => a("search", n.modelValue))
      }, {
        default: W(() => [
          V(b(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Yt = 1, Et = /* @__PURE__ */ L({
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
    const e = t, a = I(() => typeof e.path == "string"), n = I(() => {
      var m;
      return ((m = e.href) == null ? void 0 : m.startsWith("http")) || a.value && e.path.startsWith("http") || typeof e.to == "string" && e.to.startsWith("http");
    }), l = I(() => {
      var m;
      return ((m = e.href) == null ? void 0 : m.startsWith("mailto")) || a.value && e.path.startsWith("mailto") || typeof e.to == "string" && e.to.startsWith("mailto");
    }), r = I(() => e.button ? "button" : n.value || l.value ? "a" : "RouterLink"), o = I(() => {
      if (!(!n.value && !l.value))
        return e.to ?? e.href ?? e.path;
    }), i = I(() => {
      if (!(n.value || l.value))
        return e.to ?? e.path;
    }), d = I(() => i.value ? { to: i.value } : { href: o.value }), f = I(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = I(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Yt, ...e.iconAttrs ?? {} } : { scale: Yt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (m, k) => (s(), N(ne(r.value), H({
      class: ["fr-btn", {
        "fr-btn--icon-right": f.value && m.iconRight,
        "fr-btn--icon-left": f.value && !m.iconRight,
        [String(m.icon)]: f.value
      }]
    }, d.value, {
      target: m.target,
      onClick: k[0] || (k[0] = G((B) => m.onClick(B), ["stop"]))
    }), {
      default: W(() => {
        var B, x;
        return [
          !f.value && (m.icon || (B = m.iconAttrs) != null && B.name) && !m.iconRight ? (s(), N(ae, H({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : h("", !0),
          V(" " + b(m.label) + " ", 1),
          !f.value && (m.icon || (x = m.iconAttrs) != null && x.name) && m.iconRight ? (s(), N(ae, H({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : h("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Os = ["aria-label"], qs = { class: "fr-btns-group" }, pt = /* @__PURE__ */ L({
  __name: "DsfrHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(t, { emit: e }) {
    const a = e;
    return (n, l) => (s(), c("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      u("ul", qs, [
        (s(!0), c(q, null, Q(n.links, (r, o) => (s(), c("li", { key: o }, [
          X(Et, H({ ref_for: !0 }, r, {
            "on-click": (i) => {
              var d;
              a("linkClick", i), (d = r.onClick) == null || d.call(r, i);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Os));
  }
}), Hs = {
  role: "banner",
  class: "fr-header"
}, Ks = { class: "fr-header__body" }, zs = { class: "fr-container width-inherit" }, Qs = { class: "fr-header__body-row" }, Gs = { class: "fr-header__brand fr-enlarge-link" }, Ws = { class: "fr-header__brand-top" }, Us = { class: "fr-header__logo" }, Xs = {
  key: 0,
  class: "fr-header__operator"
}, Ys = ["src", "alt"], Zs = {
  key: 1,
  class: "fr-header__navbar"
}, Js = ["aria-label", "title", "data-fr-opened"], ei = ["aria-label", "title"], ti = {
  key: 0,
  class: "fr-header__service"
}, ai = { class: "fr-header__service-title" }, li = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, ni = {
  key: 0,
  class: "fr-header__service-tagline"
}, ri = {
  key: 1,
  class: "fr-header__service"
}, oi = { class: "fr-header__tools" }, si = {
  key: 0,
  class: "fr-header__tools-links"
}, ii = {
  key: 1,
  class: "fr-header__search fr-modal"
}, di = ["aria-label"], ui = { class: "fr-container" }, ci = { class: "fr-header__menu-links" }, fi = { role: "navigation" }, pi = {
  key: 1,
  class: "flex justify-center items-center"
}, vi = { class: "fr-header__menu fr-modal" }, mi = {
  key: 0,
  class: "fr-container"
}, gi = /* @__PURE__ */ L({
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
    const a = t, n = e, l = Le(a, "languageSelector"), r = O(!1), o = O(!1), i = O(!1), d = () => {
      var v;
      i.value = !1, r.value = !1, o.value = !1, (v = document.getElementById("button-menu")) == null || v.focus();
    }, f = (v) => {
      v.key === "Escape" && d();
    };
    re(() => {
      document.addEventListener("keydown", f);
    }), fe(() => {
      document.removeEventListener("keydown", f);
    });
    const p = () => {
      var v;
      i.value = !0, r.value = !0, o.value = !1, (v = document.getElementById("close-button")) == null || v.focus();
    }, m = () => {
      i.value = !0, r.value = !1, o.value = !0;
    }, k = d, B = bt(), x = I(() => {
      var v;
      return !!((v = B.operator) != null && v.call(B).length) || !!a.operatorImgSrc;
    }), P = I(() => !!B.mainnav);
    return ve(kt, () => d), (v, S) => {
      var _, D, C;
      const K = se("RouterLink");
      return s(), c("header", Hs, [
        u("div", Ks, [
          u("div", zs, [
            u("div", Qs, [
              u("div", Gs, [
                u("div", Ws, [
                  u("div", Us, [
                    X(K, {
                      to: v.homeTo,
                      title: `${v.homeLabel} - ${v.serviceTitle}`
                    }, {
                      default: W(() => [
                        X(Se, {
                          "logo-text": v.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  x.value ? (s(), c("div", Xs, [
                    A(v.$slots, "operator", {}, () => [
                      v.operatorImgSrc ? (s(), c("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: v.operatorImgSrc,
                        alt: v.operatorImgAlt,
                        style: ue(v.operatorImgStyle)
                      }, null, 12, Ys)) : h("", !0)
                    ])
                  ])) : h("", !0),
                  v.showSearch || P.value || (_ = v.quickLinks) != null && _.length ? (s(), c("div", Zs, [
                    v.showSearch ? (s(), c("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": v.showSearchLabel,
                      title: v.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: S[0] || (S[0] = G((g) => m(), ["prevent", "stop"]))
                    }, null, 8, Js)) : h("", !0),
                    P.value || (D = v.quickLinks) != null && D.length ? (s(), c("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": v.menuLabel,
                      title: v.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: S[1] || (S[1] = G((g) => p(), ["prevent", "stop"]))
                    }, null, 8, ei)) : h("", !0)
                  ])) : h("", !0)
                ]),
                v.serviceTitle ? (s(), c("div", ti, [
                  X(K, H({
                    to: v.homeTo,
                    title: `${v.homeLabel} - ${v.serviceTitle}`
                  }, v.$attrs), {
                    default: W(() => [
                      u("p", ai, [
                        V(b(v.serviceTitle) + " ", 1),
                        v.showBeta ? (s(), c("span", li, " BETA ")) : h("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  v.serviceDescription ? (s(), c("p", ni, b(v.serviceDescription), 1)) : h("", !0)
                ])) : h("", !0),
                !v.serviceTitle && v.showBeta ? (s(), c("div", ri, S[9] || (S[9] = [
                  u("p", { class: "fr-header__service-title" }, [
                    u("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : h("", !0)
              ]),
              u("div", oi, [
                (C = v.quickLinks) != null && C.length || l.value ? (s(), c("div", si, [
                  r.value ? h("", !0) : (s(), N(pt, {
                    key: 0,
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (s(), N(Ee, H({ key: 1 }, l.value, {
                    onSelect: S[2] || (S[2] = (g) => n("language-select", g))
                  }), null, 16)) : h("", !0)
                ])) : h("", !0),
                v.showSearch ? (s(), c("div", ii, [
                  X(Ae, {
                    "searchbar-id": v.searchbarId,
                    label: v.searchLabel,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": S[3] || (S[3] = (g) => n("update:modelValue", g)),
                    onSearch: S[4] || (S[4] = (g) => n("search", g))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ]),
            v.showSearch || P.value || v.quickLinks && v.quickLinks.length || l.value ? (s(), c("div", {
              key: 0,
              id: "header-navigation",
              class: $(["fr-header__menu fr-modal", { "fr-modal--opened": i.value }]),
              "aria-label": v.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              u("div", ui, [
                u("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: S[5] || (S[5] = G((g) => d(), ["prevent", "stop"]))
                }, b(v.closeMenuModalLabel), 1),
                u("div", ci, [
                  l.value ? (s(), N(Ee, H({ key: 0 }, l.value, {
                    onSelect: S[6] || (S[6] = (g) => l.value.currentLanguage = g.codeIso)
                  }), null, 16)) : h("", !0),
                  u("nav", fi, [
                    r.value ? (s(), N(pt, {
                      key: 0,
                      role: "navigation",
                      links: v.quickLinks,
                      "nav-aria-label": v.quickLinksAriaLabel,
                      onLinkClick: M(k)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : h("", !0)
                  ])
                ]),
                i.value ? A(v.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : h("", !0),
                o.value ? (s(), c("div", pi, [
                  X(Ae, {
                    "searchbar-id": v.searchbarId,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    "onUpdate:modelValue": S[7] || (S[7] = (g) => n("update:modelValue", g)),
                    onSearch: S[8] || (S[8] = (g) => n("search", g))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ], 10, di)) : h("", !0),
            A(v.$slots, "default")
          ])
        ]),
        u("div", vi, [
          P.value && !i.value ? (s(), c("div", mi, [
            A(v.$slots, "mainnav", { hidemodal: d })
          ])) : h("", !0)
        ])
      ]);
    };
  }
}), bi = /* @__PURE__ */ L({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(t) {
    return (e, a) => (s(), c("div", {
      class: $(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      u("p", {
        class: $({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        V(b(e.text) + " ", 1),
        A(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), hi = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, yi = ["id", "data-testid"], ki = ["id", "data-testid"], wi = ["id", "data-testid"], _i = ["id", "data-testid"], Ii = /* @__PURE__ */ L({
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
    return (e, a) => (s(), c("div", {
      class: $(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      A(e.$slots, "before-input"),
      A(e.$slots, "default"),
      e.$slots.default ? h("", !0) : (s(), N(St, H({ key: 0 }, e.$attrs, {
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
      u("div", hi, [
        Array.isArray(e.errorMessage) ? (s(!0), c(q, { key: 0 }, Q(e.errorMessage, (n) => (s(), c("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, b(n), 9, yi))), 128)) : e.errorMessage ? (s(), c("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, b(e.errorMessage), 9, ki)) : h("", !0),
        Array.isArray(e.validMessage) ? (s(!0), c(q, { key: 2 }, Q(e.validMessage, (n) => (s(), c("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, b(n), 9, wi))), 128)) : e.validMessage ? (s(), c("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, b(e.validMessage), 9, _i)) : h("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var Aa = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Oe = /* @__PURE__ */ Aa.join(","), La = typeof Element > "u", ye = La ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, qe = !La && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, He = function t(e, a) {
  var n;
  a === void 0 && (a = !0);
  var l = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), r = l === "" || l === "true", o = r || a && e && t(e.parentNode);
  return o;
}, Di = function(t) {
  var e, a = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return a === "" || a === "true";
}, Ma = function(t, e, a) {
  if (He(t))
    return [];
  var n = Array.prototype.slice.apply(t.querySelectorAll(Oe));
  return e && ye.call(t, Oe) && n.unshift(t), n = n.filter(a), n;
}, Fa = function t(e, a, n) {
  for (var l = [], r = Array.from(e); r.length; ) {
    var o = r.shift();
    if (!He(o, !1))
      if (o.tagName === "SLOT") {
        var i = o.assignedElements(), d = i.length ? i : o.children, f = t(d, !0, n);
        n.flatten ? l.push.apply(l, f) : l.push({
          scopeParent: o,
          candidates: f
        });
      } else {
        var p = ye.call(o, Oe);
        p && n.filter(o) && (a || !e.includes(o)) && l.push(o);
        var m = o.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(o), k = !He(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(o));
        if (m && k) {
          var B = t(m === !0 ? o.children : m.children, !0, n);
          n.flatten ? l.push.apply(l, B) : l.push({
            scopeParent: o,
            candidates: B
          });
        } else
          r.unshift.apply(r, o.children);
      }
  }
  return l;
}, Pa = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, ge = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || Di(t)) && !Pa(t) ? 0 : t.tabIndex;
}, xi = function(t, e) {
  var a = ge(t);
  return a < 0 && e && !Pa(t) ? 0 : a;
}, Ci = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, $a = function(t) {
  return t.tagName === "INPUT";
}, Bi = function(t) {
  return $a(t) && t.type === "hidden";
}, Ti = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return e;
}, Si = function(t, e) {
  for (var a = 0; a < t.length; a++)
    if (t[a].checked && t[a].form === e)
      return t[a];
}, Ei = function(t) {
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
  var l = Si(n, t.form);
  return !l || l === t;
}, Ai = function(t) {
  return $a(t) && t.type === "radio";
}, Li = function(t) {
  return Ai(t) && !Ei(t);
}, Mi = function(t) {
  var e, a = t && qe(t), n = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var r, o, i;
    for (l = !!((r = n) !== null && r !== void 0 && (o = r.ownerDocument) !== null && o !== void 0 && o.contains(n) || t != null && (i = t.ownerDocument) !== null && i !== void 0 && i.contains(t)); !l && n; ) {
      var d, f, p;
      a = qe(n), n = (d = a) === null || d === void 0 ? void 0 : d.host, l = !!((f = n) !== null && f !== void 0 && (p = f.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return l;
}, Zt = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, n = e.height;
  return a === 0 && n === 0;
}, Fi = function(t, e) {
  var a = e.displayCheck, n = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = ye.call(t, "details>summary:first-of-type"), r = l ? t.parentElement : t;
  if (ye.call(r, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof n == "function") {
      for (var o = t; t; ) {
        var i = t.parentElement, d = qe(t);
        if (i && !i.shadowRoot && n(i) === !0)
          return Zt(t);
        t.assignedSlot ? t = t.assignedSlot : !i && d !== t.ownerDocument ? t = d.host : t = i;
      }
      t = o;
    }
    if (Mi(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Zt(t);
  return !1;
}, Pi = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var a = 0; a < e.children.length; a++) {
          var n = e.children.item(a);
          if (n.tagName === "LEGEND")
            return ye.call(e, "fieldset[disabled] *") ? !0 : !n.contains(t);
        }
        return !0;
      }
      e = e.parentElement;
    }
  return !1;
}, Ke = function(t, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  He(e) || Bi(e) || Fi(e, t) || // For a details element with a summary, the summary element gets the focus
  Ti(e) || Pi(e));
}, vt = function(t, e) {
  return !(Li(e) || ge(e) < 0 || !Ke(t, e));
}, $i = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, Ri = function t(e) {
  var a = [], n = [];
  return e.forEach(function(l, r) {
    var o = !!l.scopeParent, i = o ? l.scopeParent : l, d = xi(i, o), f = o ? t(l.candidates) : i;
    d === 0 ? o ? a.push.apply(a, f) : a.push(i) : n.push({
      documentOrder: r,
      tabIndex: d,
      item: l,
      isScope: o,
      content: f
    });
  }), n.sort(Ci).reduce(function(l, r) {
    return r.isScope ? l.push.apply(l, r.content) : l.push(r.content), l;
  }, []).concat(a);
}, Ni = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Fa([t], e.includeContainer, {
    filter: vt.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: $i
  }) : a = Ma(t, e.includeContainer, vt.bind(null, e)), Ri(a);
}, Vi = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Fa([t], e.includeContainer, {
    filter: Ke.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = Ma(t, e.includeContainer, Ke.bind(null, e)), a;
}, we = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return ye.call(t, Oe) === !1 ? !1 : vt(e, t);
}, ji = /* @__PURE__ */ Aa.concat("iframe").join(","), lt = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return ye.call(t, ji) === !1 ? !1 : Ke(e, t);
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
      Oi(t, n, a[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Jt(Object(a)).forEach(function(n) {
      Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(a, n));
    });
  }
  return t;
}
function Oi(t, e, a) {
  return e = Hi(e), e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function qi(t, e) {
  if (typeof t != "object" || t === null) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var n = a.call(t, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Hi(t) {
  var e = qi(t, "string");
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
}, Ki = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, zi = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, Ce = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, Qi = function(t) {
  return Ce(t) && !t.shiftKey;
}, Gi = function(t) {
  return Ce(t) && t.shiftKey;
}, aa = function(t) {
  return setTimeout(t, 0);
}, la = function(t, e) {
  var a = -1;
  return t.every(function(n, l) {
    return e(n) ? (a = l, !1) : !0;
  }), a;
}, De = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    a[n - 1] = arguments[n];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, Re = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, Wi = [], Ui = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, n = (e == null ? void 0 : e.trapStack) || Wi, l = ea({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Qi,
    isKeyBackward: Gi
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
  }, o, i = function(w, T, j) {
    return w && w[T] !== void 0 ? w[T] : l[j || T];
  }, d = function(w, T) {
    var j = typeof (T == null ? void 0 : T.composedPath) == "function" ? T.composedPath() : void 0;
    return r.containerGroups.findIndex(function(F) {
      var R = F.container, z = F.tabbableNodes;
      return R.contains(w) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (j == null ? void 0 : j.includes(R)) || z.find(function(Z) {
        return Z === w;
      });
    });
  }, f = function(w) {
    var T = l[w];
    if (typeof T == "function") {
      for (var j = arguments.length, F = new Array(j > 1 ? j - 1 : 0), R = 1; R < j; R++)
        F[R - 1] = arguments[R];
      T = T.apply(void 0, F);
    }
    if (T === !0 && (T = void 0), !T) {
      if (T === void 0 || T === !1)
        return T;
      throw new Error("`".concat(w, "` was specified but was not a node, or did not return a node"));
    }
    var z = T;
    if (typeof T == "string" && (z = a.querySelector(T), !z))
      throw new Error("`".concat(w, "` as selector refers to no known node"));
    return z;
  }, p = function() {
    var w = f("initialFocus");
    if (w === !1)
      return !1;
    if (w === void 0 || !lt(w, l.tabbableOptions))
      if (d(a.activeElement) >= 0)
        w = a.activeElement;
      else {
        var T = r.tabbableGroups[0], j = T && T.firstTabbableNode;
        w = j || f("fallbackFocus");
      }
    if (!w)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return w;
  }, m = function() {
    if (r.containerGroups = r.containers.map(function(w) {
      var T = Ni(w, l.tabbableOptions), j = Vi(w, l.tabbableOptions), F = T.length > 0 ? T[0] : void 0, R = T.length > 0 ? T[T.length - 1] : void 0, z = j.find(function(te) {
        return we(te);
      }), Z = j.slice().reverse().find(function(te) {
        return we(te);
      }), ee = !!T.find(function(te) {
        return ge(te) > 0;
      });
      return {
        container: w,
        tabbableNodes: T,
        focusableNodes: j,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ee,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: F,
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
          var ke = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ie = T.indexOf(te);
          return Ie < 0 ? ke ? j.slice(j.indexOf(te) + 1).find(function(ce) {
            return we(ce);
          }) : j.slice(0, j.indexOf(te)).reverse().find(function(ce) {
            return we(ce);
          }) : T[Ie + (ke ? 1 : -1)];
        }
      };
    }), r.tabbableGroups = r.containerGroups.filter(function(w) {
      return w.tabbableNodes.length > 0;
    }), r.tabbableGroups.length <= 0 && !f("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (r.containerGroups.find(function(w) {
      return w.posTabIndexesFound;
    }) && r.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, k = function w(T) {
    var j = T.activeElement;
    if (j)
      return j.shadowRoot && j.shadowRoot.activeElement !== null ? w(j.shadowRoot) : j;
  }, B = function w(T) {
    if (T !== !1 && T !== k(document)) {
      if (!T || !T.focus) {
        w(p());
        return;
      }
      T.focus({
        preventScroll: !!l.preventScroll
      }), r.mostRecentlyFocusedNode = T, Ki(T) && T.select();
    }
  }, x = function(w) {
    var T = f("setReturnFocus", w);
    return T || (T === !1 ? !1 : w);
  }, P = function(w) {
    var T = w.target, j = w.event, F = w.isBackward, R = F === void 0 ? !1 : F;
    T = T || Re(j), m();
    var z = null;
    if (r.tabbableGroups.length > 0) {
      var Z = d(T, j), ee = Z >= 0 ? r.containerGroups[Z] : void 0;
      if (Z < 0)
        R ? z = r.tabbableGroups[r.tabbableGroups.length - 1].lastTabbableNode : z = r.tabbableGroups[0].firstTabbableNode;
      else if (R) {
        var te = la(r.tabbableGroups, function(Je) {
          var et = Je.firstTabbableNode;
          return T === et;
        });
        if (te < 0 && (ee.container === T || lt(T, l.tabbableOptions) && !we(T, l.tabbableOptions) && !ee.nextTabbableNode(T, !1)) && (te = Z), te >= 0) {
          var ke = te === 0 ? r.tabbableGroups.length - 1 : te - 1, Ie = r.tabbableGroups[ke];
          z = ge(T) >= 0 ? Ie.lastTabbableNode : Ie.lastDomTabbableNode;
        } else Ce(j) || (z = ee.nextTabbableNode(T, !1));
      } else {
        var ce = la(r.tabbableGroups, function(Je) {
          var et = Je.lastTabbableNode;
          return T === et;
        });
        if (ce < 0 && (ee.container === T || lt(T, l.tabbableOptions) && !we(T, l.tabbableOptions) && !ee.nextTabbableNode(T)) && (ce = Z), ce >= 0) {
          var al = ce === r.tabbableGroups.length - 1 ? 0 : ce + 1, Mt = r.tabbableGroups[al];
          z = ge(T) >= 0 ? Mt.firstTabbableNode : Mt.firstDomTabbableNode;
        } else Ce(j) || (z = ee.nextTabbableNode(T));
      }
    } else
      z = f("fallbackFocus");
    return z;
  }, v = function(w) {
    var T = Re(w);
    if (!(d(T, w) >= 0)) {
      if (De(l.clickOutsideDeactivates, w)) {
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
      De(l.allowOutsideClick, w) || w.preventDefault();
    }
  }, S = function(w) {
    var T = Re(w), j = d(T, w) >= 0;
    if (j || T instanceof Document)
      j && (r.mostRecentlyFocusedNode = T);
    else {
      w.stopImmediatePropagation();
      var F, R = !0;
      if (r.mostRecentlyFocusedNode)
        if (ge(r.mostRecentlyFocusedNode) > 0) {
          var z = d(r.mostRecentlyFocusedNode), Z = r.containerGroups[z].tabbableNodes;
          if (Z.length > 0) {
            var ee = Z.findIndex(function(te) {
              return te === r.mostRecentlyFocusedNode;
            });
            ee >= 0 && (l.isKeyForward(r.recentNavEvent) ? ee + 1 < Z.length && (F = Z[ee + 1], R = !1) : ee - 1 >= 0 && (F = Z[ee - 1], R = !1));
          }
        } else
          r.containerGroups.some(function(te) {
            return te.tabbableNodes.some(function(ke) {
              return ge(ke) > 0;
            });
          }) || (R = !1);
      else
        R = !1;
      R && (F = P({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: r.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(r.recentNavEvent)
      })), B(F || r.mostRecentlyFocusedNode || p());
    }
    r.recentNavEvent = void 0;
  }, _ = function(w) {
    var T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    r.recentNavEvent = w;
    var j = P({
      event: w,
      isBackward: T
    });
    j && (Ce(w) && w.preventDefault(), B(j));
  }, D = function(w) {
    if (zi(w) && De(l.escapeDeactivates, w) !== !1) {
      w.preventDefault(), o.deactivate();
      return;
    }
    (l.isKeyForward(w) || l.isKeyBackward(w)) && _(w, l.isKeyBackward(w));
  }, C = function(w) {
    var T = Re(w);
    d(T, w) >= 0 || De(l.clickOutsideDeactivates, w) || De(l.allowOutsideClick, w) || (w.preventDefault(), w.stopImmediatePropagation());
  }, K = function() {
    if (r.active)
      return ta.activateTrap(n, o), r.delayInitialFocusTimer = l.delayInitialFocus ? aa(function() {
        B(p());
      }) : B(p()), a.addEventListener("focusin", S, !0), a.addEventListener("mousedown", v, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", v, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", C, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", D, {
        capture: !0,
        passive: !1
      }), o;
  }, g = function() {
    if (r.active)
      return a.removeEventListener("focusin", S, !0), a.removeEventListener("mousedown", v, !0), a.removeEventListener("touchstart", v, !0), a.removeEventListener("click", C, !0), a.removeEventListener("keydown", D, !0), o;
  }, E = function(w) {
    var T = w.some(function(j) {
      var F = Array.from(j.removedNodes);
      return F.some(function(R) {
        return R === r.mostRecentlyFocusedNode;
      });
    });
    T && B(p());
  }, y = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(E) : void 0, U = function() {
    y && (y.disconnect(), r.active && !r.paused && r.containers.map(function(w) {
      y.observe(w, {
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
    activate: function(w) {
      if (r.active)
        return this;
      var T = i(w, "onActivate"), j = i(w, "onPostActivate"), F = i(w, "checkCanFocusTrap");
      F || m(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = a.activeElement, T == null || T();
      var R = function() {
        F && m(), K(), U(), j == null || j();
      };
      return F ? (F(r.containers.concat()).then(R, R), this) : (R(), this);
    },
    deactivate: function(w) {
      if (!r.active)
        return this;
      var T = ea({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, w);
      clearTimeout(r.delayInitialFocusTimer), r.delayInitialFocusTimer = void 0, g(), r.active = !1, r.paused = !1, U(), ta.deactivateTrap(n, o);
      var j = i(T, "onDeactivate"), F = i(T, "onPostDeactivate"), R = i(T, "checkCanReturnFocus"), z = i(T, "returnFocus", "returnFocusOnDeactivate");
      j == null || j();
      var Z = function() {
        aa(function() {
          z && B(x(r.nodeFocusedBeforeActivation)), F == null || F();
        });
      };
      return z && R ? (R(x(r.nodeFocusedBeforeActivation)).then(Z, Z), this) : (Z(), this);
    },
    pause: function(w) {
      if (r.paused || !r.active)
        return this;
      var T = i(w, "onPause"), j = i(w, "onPostPause");
      return r.paused = !0, T == null || T(), g(), U(), j == null || j(), this;
    },
    unpause: function(w) {
      if (!r.paused || !r.active)
        return this;
      var T = i(w, "onUnpause"), j = i(w, "onPostUnpause");
      return r.paused = !1, T == null || T(), m(), K(), U(), j == null || j(), this;
    },
    updateContainerElements: function(w) {
      var T = [].concat(w).filter(Boolean);
      return r.containers = T.map(function(j) {
        return typeof j == "string" ? a.querySelector(j) : j;
      }), r.active && m(), U(), this;
    }
  }, o.updateContainerElements(t), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Xi = {
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
}, Yi = L({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, Xi),
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
    const l = O(null), r = I(() => {
      const i = l.value;
      return i && (i instanceof HTMLElement ? i : i.$el);
    });
    function o() {
      return n || (n = Ui(r.value, {
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
    return re(() => {
      le(() => t.active, (i) => {
        i && r.value ? o().activate() : n && (n.deactivate(), (!r.value || r.value.nodeType === Node.COMMENT_NODE) && (n = null));
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
        const i = e.default().filter((d) => d.type !== ll);
        return !i || !i.length || i.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), i) : nl(i[0], { ref: l });
      }
    };
  }
}), Zi = ["aria-labelledby", "role", "open"], Ji = { class: "fr-container fr-container--fluid fr-container-md" }, ed = { class: "fr-grid-row fr-grid-row--center" }, td = { class: "fr-modal__body" }, ad = { class: "fr-modal__header" }, ld = ["title"], nd = { class: "fr-modal__content" }, rd = ["id"], od = {
  key: 0,
  class: "fr-modal__footer"
}, na = 2, sd = /* @__PURE__ */ L({
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
    const a = t, n = e, l = (x) => {
      x.key === "Escape" && m();
    }, r = I(() => a.isAlert ? "alertdialog" : "dialog"), o = O(null), i = O();
    le(() => a.opened, (x) => {
      var P, v;
      x ? ((P = i.value) == null || P.showModal(), setTimeout(() => {
        var S;
        (S = o.value) == null || S.focus();
      }, 100)) : (v = i.value) == null || v.close(), d(x);
    });
    function d(x) {
      typeof window < "u" && document.body.classList.toggle("modal-open", x);
    }
    re(() => {
      f(), d(a.opened);
    }), dl(() => {
      p(), d(!1);
    });
    function f() {
      document.addEventListener("keydown", l);
    }
    function p() {
      document.removeEventListener("keydown", l);
    }
    async function m() {
      var x;
      await da(), (x = a.origin) == null || x.focus(), n("close");
    }
    const k = I(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), B = I(
      () => k.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: na } : { scale: na, ...a.icon ?? {} }
    );
    return (x, P) => x.opened ? (s(), N(M(Yi), { key: 0 }, {
      default: W(() => {
        var v, S;
        return [
          u("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: i,
            "aria-labelledby": x.modalId,
            role: r.value,
            class: $(["fr-modal", { "fr-modal--opened": x.opened }]),
            open: x.opened
          }, [
            u("div", Ji, [
              u("div", ed, [
                u("div", {
                  class: $(["fr-col-12", {
                    "fr-col-md-8": x.size === "lg",
                    "fr-col-md-6": x.size === "md",
                    "fr-col-md-4": x.size === "sm"
                  }])
                }, [
                  u("div", td, [
                    u("div", ad, [
                      u("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: x.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: P[0] || (P[0] = (_) => m())
                      }, [
                        u("span", null, b(x.closeButtonLabel), 1)
                      ], 8, ld)
                    ]),
                    u("div", nd, [
                      u("h1", {
                        id: x.modalId,
                        class: "fr-modal__title"
                      }, [
                        k.value || B.value ? (s(), c("span", {
                          key: 0,
                          class: $({
                            [String(x.icon)]: k.value
                          })
                        }, [
                          x.icon && B.value ? (s(), N(ae, de(H({ key: 0 }, B.value)), null, 16)) : h("", !0)
                        ], 2)) : h("", !0),
                        V(" " + b(x.title), 1)
                      ], 8, rd),
                      A(x.$slots, "default", {}, void 0, !0)
                    ]),
                    (v = x.actions) != null && v.length || x.$slots.footer ? (s(), c("div", od, [
                      A(x.$slots, "footer", {}, void 0, !0),
                      (S = x.actions) != null && S.length ? (s(), N(Xe, {
                        key: 0,
                        align: "right",
                        buttons: x.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : h("", !0)
                    ])) : h("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, Zi)
        ];
      }),
      _: 3
    })) : h("", !0);
  }
}), Ra = /* @__PURE__ */ oe(sd, [["__scopeId", "data-v-d11515b3"]]), id = ["id", "aria-current"], dd = /* @__PURE__ */ L({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => J("nav", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (s(), c("li", {
      id: e.id,
      class: "fr-nav__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      A(e.$slots, "default", {}, void 0, !0)
    ], 8, id));
  }
}), Na = /* @__PURE__ */ oe(dd, [["__scopeId", "data-v-5909c19f"]]), ud = ["href"], ra = 2, Ye = /* @__PURE__ */ L({
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
    const e = t, a = I(() => typeof e.to == "string" && e.to.startsWith("http")), n = I(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), l = I(
      () => n.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: ra, name: e.icon } : { scale: ra, ...e.icon || {} }
    ), r = ol() ? _e(kt) : void 0, o = (r == null ? void 0 : r()) ?? (() => {
    });
    return (i, d) => {
      const f = se("RouterLink");
      return a.value ? (s(), c("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: i.to,
        onClick: d[0] || (d[0] = (p) => {
          i.$emit("toggleId", i.id), i.onClick(p);
        })
      }, b(i.text), 9, ud)) : (s(), N(f, {
        key: 1,
        class: $(["fr-nav__link", {
          [String(i.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: i.to,
        onClick: d[1] || (d[1] = (p) => {
          var m;
          M(o)(), i.$emit("toggleId", i.id), (m = i.onClick) == null || m.call(i, p);
        })
      }, {
        default: W(() => [
          i.icon && l.value ? (s(), N(ae, de(H({ key: 0 }, l.value)), null, 16)) : h("", !0),
          V(" " + b(i.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), cd = { class: "fr-col-12 fr-col-lg-3" }, fd = { class: "fr-mega-menu__category" }, pd = { class: "fr-mega-menu__list" }, Va = /* @__PURE__ */ L({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(t) {
    return (e, a) => (s(), c("div", cd, [
      u("h5", fd, [
        u("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: a[0] || (a[0] = G(() => {
          }, ["prevent"]))
        }, b(e.title), 1)
      ]),
      u("ul", pd, [
        (s(!0), c(q, null, Q(e.links, (n, l) => (s(), c("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          X(Ye, H({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), vd = ["aria-expanded", "aria-current", "aria-controls"], md = ["id"], gd = { class: "fr-container fr-container--fluid fr-container-lg" }, bd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, hd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, yd = { class: "fr-mega-menu__leader" }, kd = { class: "fr-h4 fr-mb-2v" }, wd = { class: "fr-hidden fr-displayed-lg" }, _d = /* @__PURE__ */ L({
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
    } = me(), i = I(() => e.id === e.expandedId);
    return le(i, (d, f) => {
      d !== f && r(d);
    }), re(() => {
      i.value && r(!0);
    }), (d, f) => {
      const p = se("RouterLink");
      return s(), c(q, null, [
        u("button", {
          class: "fr-nav__btn",
          "aria-expanded": i.value,
          "aria-current": d.active || void 0,
          "aria-controls": d.id,
          onClick: f[0] || (f[0] = (m) => d.$emit("toggleId", d.id))
        }, b(d.title), 9, vd),
        u("div", {
          id: d.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: $(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": M(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": M(n)
          }]),
          tabindex: "-1",
          onTransitionend: f[2] || (f[2] = (m) => M(o)(i.value))
        }, [
          u("div", gd, [
            u("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: f[1] || (f[1] = (m) => d.$emit("toggleId", d.id))
            }, " Fermer "),
            u("div", bd, [
              u("div", hd, [
                u("div", yd, [
                  u("h4", kd, b(d.title), 1),
                  u("p", wd, [
                    V(b(d.description) + " ", 1),
                    A(d.$slots, "description", {}, void 0, !0)
                  ]),
                  X(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: d.link.to
                  }, {
                    default: W(() => [
                      V(b(d.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              A(d.$slots, "default", {}, void 0, !0),
              (s(!0), c(q, null, Q(d.menus, (m, k) => (s(), N(Va, H({
                key: k,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, md)
      ], 64);
    };
  }
}), ja = /* @__PURE__ */ oe(_d, [["__scopeId", "data-v-7e339b1d"]]), Id = ["id", "aria-current"], Oa = /* @__PURE__ */ L({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => J("menu", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (s(), c("li", {
      id: e.id,
      class: "fr-menu__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      A(e.$slots, "default")
    ], 8, Id));
  }
}), Dd = ["aria-expanded", "aria-current", "aria-controls"], xd = ["id"], Cd = { class: "fr-menu__list" }, qa = /* @__PURE__ */ L({
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
    } = me(), i = I(() => e.id === e.expandedId);
    return le(i, (d, f) => {
      d !== f && r(d);
    }), re(() => {
      i.value && r(!0);
    }), (d, f) => (s(), c(q, null, [
      u("button", {
        class: "fr-nav__btn",
        "aria-expanded": i.value,
        "aria-current": d.active || void 0,
        "aria-controls": d.id,
        onClick: f[0] || (f[0] = (p) => d.$emit("toggleId", d.id))
      }, [
        u("span", null, b(d.title), 1)
      ], 8, Dd),
      u("div", {
        id: d.id,
        ref_key: "collapse",
        ref: a,
        class: $(["fr-collapse fr-menu", { "fr-collapse--expanded": M(l), "fr-collapsing": M(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: f[2] || (f[2] = (p) => M(o)(i.value))
      }, [
        u("ul", Cd, [
          A(d.$slots, "default"),
          (s(!0), c(q, null, Q(d.links, (p, m) => (s(), N(Oa, { key: m }, {
            default: W(() => [
              X(Ye, H({ ref_for: !0 }, p, {
                onToggleId: f[1] || (f[1] = (k) => d.$emit("toggleId", d.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, xd)
    ], 64));
  }
}), Bd = ["id", "aria-label"], Td = { class: "fr-nav__list" }, Sd = /* @__PURE__ */ L({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => J("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(t) {
    const e = t, a = O(void 0), n = (i) => {
      if (i === a.value) {
        a.value = void 0;
        return;
      }
      a.value = i;
    }, l = (i) => {
      if (i !== document.getElementById(e.id)) {
        if (!(i != null && i.parentNode)) {
          n(a.value);
          return;
        }
        l(i.parentNode);
      }
    }, r = (i) => {
      l(i.target);
    }, o = (i) => {
      i.key === "Escape" && n(a.value);
    };
    return re(() => {
      document.addEventListener("click", r), document.addEventListener("keydown", o);
    }), fe(() => {
      document.removeEventListener("click", r), document.removeEventListener("keydown", o);
    }), (i, d) => (s(), c("nav", {
      id: i.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": i.label
    }, [
      u("ul", Td, [
        A(i.$slots, "default"),
        (s(!0), c(q, null, Q(i.navItems, (f, p) => (s(), N(Na, { key: p }, {
          default: W(() => [
            f.to && f.text ? (s(), N(Ye, H({
              key: 0,
              ref_for: !0
            }, f, {
              "expanded-id": a.value,
              onToggleId: d[0] || (d[0] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : f.title && f.links ? (s(), N(qa, H({
              key: 1,
              ref_for: !0
            }, f, {
              "expanded-id": a.value,
              onToggleId: d[1] || (d[1] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : f.title && f.menus ? (s(), N(ja, H({
              key: 2,
              ref_for: !0
            }, f, {
              "expanded-id": a.value,
              onToggleId: d[2] || (d[2] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : h("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, Bd));
  }
}), Ed = { class: "fr-container" }, Ad = { class: "fr-notice__body" }, Ld = { class: "fr-notice__title" }, Md = { class: "fr-notice__desc" }, Fd = /* @__PURE__ */ L({
  __name: "DsfrNotice",
  props: {
    title: { default: "" },
    desc: { default: "" },
    closeable: { type: Boolean },
    type: { default: "info" }
  },
  emits: ["close"],
  setup(t) {
    return (e, a) => (s(), c("div", {
      class: $(["fr-notice", `fr-notice--${e.type}`])
    }, [
      u("div", Ed, [
        u("div", Ad, [
          u("p", null, [
            u("span", Ld, [
              A(e.$slots, "default", {}, () => [
                V(b(e.title), 1)
              ])
            ]),
            u("span", Md, [
              A(e.$slots, "desc", {}, () => [
                V(b(e.desc), 1)
              ])
            ])
          ]),
          e.closeable ? (s(), c("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: a[0] || (a[0] = (n) => e.$emit("close"))
          }, " Masquer le message ")) : h("", !0)
        ])
      ])
    ], 2));
  }
}), Pd = ["aria-label"], $d = { class: "fr-content-media__img" }, Rd = ["src", "alt", "title", "ratio"], Nd = { class: "fr-content-media__caption" }, Vd = /* @__PURE__ */ L({
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
    return (e, a) => (s(), c("figure", {
      class: $(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      u("div", $d, [
        A(e.$slots, "default", {}, () => [
          e.src ? (s(), c("img", {
            key: 0,
            src: e.src,
            class: $(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, Rd)) : h("", !0)
        ])
      ]),
      u("figcaption", Nd, b(e.legend), 1)
    ], 10, Pd));
  }
}), jd = { class: "fr-quote fr-quote--column" }, Od = ["cite"], qd = { class: "fr-quote__author" }, Hd = { class: "fr-quote__source" }, Kd = ["href"], zd = {
  key: 0,
  class: "fr-quote__image"
}, Qd = ["src"], Gd = /* @__PURE__ */ L({
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
    return (e, a) => (s(), c("figure", jd, [
      e.source ? (s(), c("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        u("p", null, "« " + b(e.quote) + " »", 1)
      ], 8, Od)) : h("", !0),
      u("figcaption", null, [
        u("p", qd, b(e.author), 1),
        u("ul", Hd, [
          u("li", null, [
            u("cite", null, b(e.source), 1)
          ]),
          (s(!0), c(q, null, Q(e.details, (n, l) => (s(), c("li", { key: l }, [
            typeof n == "object" ? (s(), c("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, b(n.label), 9, Kd)) : (s(), c(q, { key: 1 }, [
              V(b(n), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (s(), c("div", zd, [
          u("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, Qd)
        ])) : h("", !0)
      ])
    ]));
  }
}), Wd = ["id", "name", "value", "checked", "disabled"], Ud = ["for"], Xd = {
  key: 0,
  class: "required"
}, Yd = {
  key: 0,
  class: "fr-hint-text"
}, Zd = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Jd = ["src", "title"], eu = { key: 0 }, tu = ["href"], au = ["href"], lu = ["href"], Ha = /* @__PURE__ */ L({
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
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = I(() => !!e.img || !!e.svgPath);
    return (l, r) => (s(), c("div", {
      class: $(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      u("div", {
        class: $(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": l.small
        }])
      }, [
        u("input", H({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: r[0] || (r[0] = (o) => l.$emit("update:modelValue", l.value))
        }), null, 16, Wd),
        u("label", {
          for: l.id,
          class: "fr-label"
        }, [
          A(l.$slots, "label", {}, () => [
            V(b(l.label) + " ", 1),
            A(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (s(), c("span", Xd, " *")) : h("", !0)
            ])
          ]),
          l.hint ? (s(), c("span", Yd, b(l.hint), 1)) : h("", !0)
        ], 8, Ud),
        l.img || l.svgPath ? (s(), c("div", Zd, [
          l.img ? (s(), c("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: "",
            title: l.imgTitle
          }, null, 8, Jd)) : (s(), c("svg", H({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            l.imgTitle ? (s(), c("title", eu, b(l.imgTitle), 1)) : h("", !0),
            u("use", {
              class: "fr-artwork-decorative",
              href: `${l.svgPath}#artwork-decorative`
            }, null, 8, tu),
            u("use", {
              class: "fr-artwork-minor",
              href: `${l.svgPath}#artwork-minor`
            }, null, 8, au),
            u("use", {
              class: "fr-artwork-major",
              href: `${l.svgPath}#artwork-major`
            }, null, 8, lu)
          ], 16))
        ])) : h("", !0)
      ], 2)
    ], 2));
  }
}), nu = { class: "fr-form-group" }, ru = ["disabled", "aria-labelledby", "aria-invalid", "role"], ou = ["id"], su = {
  key: 0,
  class: "fr-hint-text"
}, iu = {
  key: 0,
  class: "required"
}, du = ["id"], uu = /* @__PURE__ */ L({
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
    const a = t, n = e, l = I(() => a.errorMessage || a.validMessage), r = I(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (d) => {
      d !== a.modelValue && n("update:modelValue", d);
    }, i = I(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (d, f) => (s(), c("div", nu, [
      u("fieldset", {
        class: $(["fr-fieldset", {
          "fr-fieldset--error": d.errorMessage,
          "fr-fieldset--valid": d.validMessage
        }]),
        disabled: d.disabled,
        "aria-labelledby": i.value,
        "aria-invalid": d.ariaInvalid,
        role: d.errorMessage || d.validMessage ? "group" : void 0
      }, [
        d.legend || d.$slots.legend || d.hint || d.$slots.hint ? (s(), c("legend", {
          key: 0,
          id: d.titleId,
          class: "fr-fieldset__legend fr-fieldset__legend--regular"
        }, [
          A(d.$slots, "legend", {}, () => [
            V(b(d.legend) + " ", 1),
            d.hint || d.$slots.hint ? (s(), c("span", su, [
              A(d.$slots, "hint", {}, () => [
                V(b(d.hint), 1)
              ])
            ])) : h("", !0),
            A(d.$slots, "required-tip", {}, () => [
              d.required ? (s(), c("span", iu, " *")) : h("", !0)
            ])
          ])
        ], 8, ou)) : h("", !0),
        A(d.$slots, "default", {}, () => [
          (s(!0), c(q, null, Q(d.options, (p, m) => (s(), N(Ha, H({
            key: typeof p.value == "boolean" ? m : p.value || m,
            name: d.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: d.small,
            inline: d.inline,
            "model-value": d.modelValue,
            "onUpdate:modelValue": f[0] || (f[0] = (k) => o(k))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        l.value ? (s(), c("div", {
          key: 1,
          id: `messages-${d.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          u("p", {
            class: $(["fr-message fr-message--info flex items-center", r.value])
          }, b(l.value), 3)
        ], 8, du)) : h("", !0)
      ], 10, ru)
    ]));
  }
}), cu = ["id"], fu = ["id"], pu = { class: "fr-hint-text" }, vu = ["data-fr-prefix", "data-fr-suffix"], mu = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], gu = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], bu = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, hu = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, yu = ["id"], ku = ["id"], wu = /* @__PURE__ */ L({
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
    const a = t, n = e, l = O(), r = O(), o = O(), i = I(() => a.lowerValue !== void 0), d = I(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * o.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * o.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), f = I(() => {
      const m = (a.modelValue - a.min) / (a.max - a.min) * o.value - (i.value ? 12 : 0), k = ((a.lowerValue ?? 0) - a.min) / (a.max - a.min) * o.value;
      return {
        "--progress-right": `${m + 24}px`,
        ...i.value ? { "--progress-left": `${k + 12}px` } : {}
      };
    });
    le([() => a.modelValue, () => a.lowerValue], ([m, k]) => {
      k !== void 0 && (i.value && m < k && n("update:lowerValue", m), i.value && k > m && n("update:modelValue", k));
    });
    const p = I(() => (a.prefix ?? "").concat(i.value ? `${a.lowerValue} - ` : "").concat(`${a.modelValue}`).concat(a.suffix ?? ""));
    return re(() => {
      var m;
      o.value = (m = l.value) == null ? void 0 : m.offsetWidth;
    }), (m, k) => (s(), c("div", {
      id: `${m.id}-group`,
      class: $(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      u("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        A(m.$slots, "label", {}, () => [
          V(b(m.label), 1)
        ]),
        u("span", pu, [
          A(m.$slots, "hint", {}, () => [
            V(b(m.hint), 1)
          ])
        ])
      ], 8, fu),
      u("div", {
        class: $(["fr-range", {
          "fr-range--sm": m.small,
          "fr-range--double": i.value,
          "fr-range-group--disabled": m.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": m.prefix ?? void 0,
        "data-fr-suffix": m.suffix ?? void 0,
        style: ue(f.value)
      }, [
        u("span", {
          ref_key: "output",
          ref: r,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: ue(d.value)
        }, b(p.value), 5),
        i.value ? (s(), c("input", {
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
          onInput: k[0] || (k[0] = (B) => {
            var x;
            return n("update:lowerValue", +((x = B.target) == null ? void 0 : x.value));
          })
        }, null, 40, mu)) : h("", !0),
        u("input", {
          id: m.id,
          ref_key: "input",
          ref: l,
          type: "range",
          min: m.min,
          max: m.max,
          step: m.step,
          value: m.modelValue,
          disabled: m.disabled,
          "aria-disabled": m.disabled,
          "aria-labelledby": `${m.id}-label`,
          "aria-describedby": `${m.id}-messages`,
          onInput: k[1] || (k[1] = (B) => {
            var x;
            return n("update:modelValue", +((x = B.target) == null ? void 0 : x.value));
          })
        }, null, 40, gu),
        m.hideIndicators ? h("", !0) : (s(), c("span", bu, b(m.min), 1)),
        m.hideIndicators ? h("", !0) : (s(), c("span", hu, b(m.max), 1))
      ], 14, vu),
      m.message || m.$slots.messages ? (s(), c("div", {
        key: 0,
        id: `${m.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        A(m.$slots, "messages", {}, () => [
          m.message ? (s(), c("p", {
            key: 0,
            id: `${m.id}-message-error`,
            class: "fr-message fr-message--error"
          }, b(m.message), 9, ku)) : h("", !0)
        ])
      ], 8, yu)) : h("", !0)
    ], 10, cu));
  }
}), _u = { class: "fr-segmented__element" }, Iu = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Du = ["for"], xu = { key: 1 }, Ka = /* @__PURE__ */ L({
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
    const e = t, a = I(() => typeof e.icon == "string" ? { name: e.icon } : e.icon), n = I(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : "");
    return (l, r) => (s(), c("div", _u, [
      u("input", H({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: r[0] || (r[0] = (o) => l.$emit("update:modelValue", l.value))
      }), null, 16, Iu),
      u("label", {
        for: l.id,
        class: $(["fr-label", { [n.value]: n.value }])
      }, [
        l.icon && !n.value ? (s(), N(ae, de(H({ key: 0 }, a.value)), null, 16)) : h("", !0),
        l.icon ? (s(), c("span", xu, " ")) : h("", !0),
        V(" " + b(l.label), 1)
      ], 10, Du)
    ]));
  }
}), Cu = { class: "fr-form-group" }, Bu = ["disabled"], Tu = ["id"], Su = {
  key: 0,
  class: "fr-hint-text"
}, Eu = { class: "fr-segmented__elements" }, Au = /* @__PURE__ */ L({
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
    return (r, o) => (s(), c("div", Cu, [
      u("fieldset", {
        class: $(["fr-segmented", {
          "fr-segmented--sm": r.small,
          "fr-segmented--no-legend": !r.legend
        }]),
        disabled: r.disabled
      }, [
        r.legend ? (s(), c("legend", {
          key: 0,
          id: r.titleId,
          class: $(["fr-segmented__legend", {
            "fr-segmented__legend--inline": r.inline
          }])
        }, [
          A(r.$slots, "legend", {}, () => [
            V(b(r.legend), 1)
          ]),
          r.hint ? (s(), c("span", Su, b(r.hint), 1)) : h("", !0)
        ], 10, Tu)) : h("", !0),
        u("div", Eu, [
          A(r.$slots, "default", {}, () => [
            (s(!0), c(q, null, Q(r.options, (i, d) => (s(), N(Ka, H({
              key: i.value || d,
              name: r.name || i.name,
              ref_for: !0
            }, { ...i, disabled: r.disabled || i.disabled }, {
              "model-value": r.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (f) => l(f))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Bu)
    ]));
  }
}), Lu = ["for"], Mu = {
  key: 0,
  class: "required"
}, Fu = {
  key: 0,
  class: "fr-hint-text"
}, Pu = ["id", "name", "disabled", "aria-disabled", "required"], $u = ["selected"], Ru = ["selected", "value", "disabled", "aria-disabled"], Nu = ["id"], Vu = /* @__PURE__ */ L({
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
    const e = t, a = I(() => e.errorMessage || e.successMessage), n = I(() => e.errorMessage ? "error" : "valid");
    return (l, r) => (s(), c("div", {
      class: $(["fr-select-group", { [`fr-select-group--${n.value}`]: a.value }])
    }, [
      u("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        A(l.$slots, "label", {}, () => [
          V(b(l.label) + " ", 1),
          A(l.$slots, "required-tip", {}, () => [
            l.required ? (s(), c("span", Mu, " *")) : h("", !0)
          ])
        ]),
        l.description ? (s(), c("span", Fu, b(l.description), 1)) : h("", !0)
      ], 8, Lu),
      u("select", H({
        id: l.selectId,
        class: [{ [`fr-select--${n.value}`]: a.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: r[0] || (r[0] = (o) => {
          var i;
          return l.$emit("update:modelValue", (i = o.target) == null ? void 0 : i.value);
        })
      }), [
        u("option", {
          selected: l.modelValue == null,
          disabled: "",
          hidden: ""
        }, b(l.defaultUnselectedText), 9, $u),
        (s(!0), c(q, null, Q(l.options, (o, i) => (s(), c("option", {
          key: i,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, b(typeof o == "object" ? o.text : o), 9, Ru))), 128))
      ], 16, Pu),
      a.value ? (s(), c("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: $(`fr-${n.value}-text`)
      }, b(a.value), 11, Nu)) : h("", !0)
    ], 2));
  }
}), ju = { class: "fr-share" }, Ou = { class: "fr-share__title" }, qu = { class: "fr-btns-group" }, Hu = ["title", "href", "onClick"], Ku = { key: 0 }, zu = ["href", "title"], Qu = ["title"], Gu = /* @__PURE__ */ L({
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
      return s(), c("div", ju, [
        u("p", Ou, b(n.title), 1),
        u("ul", qu, [
          (s(!0), c(q, null, Q(n.networks, (o, i) => (s(), c("li", { key: i }, [
            u("a", {
              class: $(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: G((d) => a(o), ["prevent"])
            }, b(o.label), 11, Hu)
          ]))), 128)),
          (r = n.mail) != null && r.to ? (s(), c("li", Ku, [
            u("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, b(n.mail.label), 9, zu)
          ])) : h("", !0),
          u("li", null, [
            u("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: l[0] || (l[0] = (o) => e())
            }, b(n.copyLabel), 9, Qu)
          ])
        ])
      ]);
    };
  }
}), Wu = ["aria-current", "aria-expanded", "aria-controls"], za = /* @__PURE__ */ L({
  __name: "DsfrSideMenuButton",
  props: {
    active: { type: Boolean },
    expanded: { type: Boolean },
    controlId: {}
  },
  emits: ["toggleExpand"],
  setup(t) {
    return (e, a) => (s(), c("button", {
      class: "fr-sidemenu__btn",
      "aria-current": e.active ? "page" : void 0,
      "aria-expanded": !!e.expanded,
      "aria-controls": e.controlId,
      onClick: a[0] || (a[0] = (n) => e.$emit("toggleExpand", e.controlId))
    }, [
      A(e.$slots, "default")
    ], 8, Wu));
  }
}), Qa = /* @__PURE__ */ L({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (s(), c("li", {
      class: $(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      A(e.$slots, "default")
    ], 2));
  }
}), Uu = ["id"], Xu = { class: "fr-sidemenu__list" }, Ga = /* @__PURE__ */ L({
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
    } = me();
    le(() => e.expanded, (p, m) => {
      p !== m && r(p);
    }), re(() => {
      e.expanded && r(!0);
    });
    const i = (p) => typeof p == "string" && p.startsWith("http"), d = (p) => i(p) ? "a" : "RouterLink", f = (p) => ({ [i(p) ? "href" : "to"]: p });
    return (p, m) => {
      const k = se("DsfrSideMenuList", !0);
      return s(), c("div", {
        id: p.id,
        ref_key: "collapse",
        ref: a,
        class: $({
          "fr-collapse": p.collapsable,
          "fr-collapsing": M(n),
          "fr-collapse--expanded": M(l)
        }),
        onTransitionend: m[2] || (m[2] = (B) => M(o)(!!p.expanded))
      }, [
        u("ul", Xu, [
          A(p.$slots, "default"),
          (s(!0), c(q, null, Q(p.menuItems, (B, x) => (s(), N(Qa, {
            key: x,
            active: B.active
          }, {
            default: W(() => [
              B.menuItems ? h("", !0) : (s(), N(ne(d(B.to)), H({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": B.active ? "page" : void 0,
                ref_for: !0
              }, f(B.to)), {
                default: W(() => [
                  V(b(B.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              B.menuItems ? (s(), c(q, { key: 1 }, [
                X(za, {
                  active: !!B.active,
                  expanded: !!B.expanded,
                  "control-id": B.id,
                  onToggleExpand: m[0] || (m[0] = (P) => p.$emit("toggleExpand", P))
                }, {
                  default: W(() => [
                    V(b(B.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                B.menuItems ? (s(), N(k, {
                  key: 0,
                  id: B.id,
                  collapsable: "",
                  expanded: B.expanded,
                  "menu-items": B.menuItems,
                  onToggleExpand: m[1] || (m[1] = (P) => p.$emit("toggleExpand", P))
                }, null, 8, ["id", "expanded", "menu-items"])) : h("", !0)
              ], 64)) : h("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, Uu);
    };
  }
}), Yu = ["aria-labelledby"], Zu = { class: "fr-sidemenu__inner" }, Ju = ["aria-controls", "aria-expanded"], ec = ["id"], tc = { class: "fr-sidemenu__title" }, ac = /* @__PURE__ */ L({
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
    } = me(), o = O(!1);
    return le(o, (i, d) => {
      i !== d && l(i);
    }), (i, d) => (s(), c("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": i.id
    }, [
      u("div", Zu, [
        u("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": i.id,
          "aria-expanded": o.value,
          onClick: d[0] || (d[0] = G((f) => o.value = !o.value, ["prevent", "stop"]))
        }, b(i.buttonLabel), 9, Ju),
        u("div", {
          id: i.id,
          ref_key: "collapse",
          ref: e,
          class: $(["fr-collapse", {
            "fr-collapse--expanded": M(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": M(a)
          }]),
          onTransitionend: d[2] || (d[2] = (f) => M(r)(o.value))
        }, [
          u("div", tc, b(i.headingTitle), 1),
          A(i.$slots, "default", {}, () => [
            X(Ga, {
              id: i.sideMenuListId,
              "menu-items": i.menuItems,
              onToggleExpand: d[1] || (d[1] = (f) => i.$emit("toggleExpand", f))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, ec)
      ])
    ], 8, Yu));
  }
}), lc = /* @__PURE__ */ L({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = I(() => typeof e.to == "string" && e.to.startsWith("http")), n = I(() => a.value ? "a" : "RouterLink"), l = I(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (r, o) => (s(), N(ne(n.value), H({
      "aria-current": r.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: W(() => [
        A(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), nc = { class: "fr-skiplinks" }, rc = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, oc = { class: "fr-skiplinks__list" }, sc = ["href", "onClick"], ic = /* @__PURE__ */ L({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(t) {
    const e = (a) => {
      const n = document.getElementById(a);
      n == null || n.focus();
    };
    return (a, n) => (s(), c("div", nc, [
      u("nav", rc, [
        u("ul", oc, [
          (s(!0), c(q, null, Q(a.links, (l) => (s(), c("li", {
            key: l.id
          }, [
            u("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: G((r) => e(l.id), ["prevent"])
            }, b(l.text), 9, sc)
          ]))), 128))
        ])
      ])
    ]));
  }
}), dc = { class: "fr-stepper" }, uc = { class: "fr-stepper__title" }, cc = { class: "fr-stepper__state" }, fc = ["data-fr-current-step", "data-fr-steps"], pc = { class: "fr-stepper__details" }, vc = {
  key: 0,
  class: "fr-text--bold"
}, mc = /* @__PURE__ */ L({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (s(), c("div", dc, [
      u("h2", uc, [
        V(b(e.steps[e.currentStep - 1]) + " ", 1),
        u("span", cc, "Étape " + b(e.currentStep) + " sur " + b(e.steps.length), 1)
      ]),
      u("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, fc),
      u("p", pc, [
        e.currentStep < e.steps.length ? (s(), c("span", vc, "Étape suivante :")) : h("", !0),
        V(" " + b(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), gc = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, bc = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, hc = { class: "fr-summary__list" }, yc = ["href"], kc = /* @__PURE__ */ L({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (s(), c("nav", gc, [
      u("h2", bc, b(e.title), 1),
      u("ol", hc, [
        (s(!0), c(q, null, Q(e.anchors, (n, l) => (s(), c("li", { key: l }, [
          u("a", {
            class: "fr-summary__link",
            href: n.link
          }, b(n.name), 9, yc)
        ]))), 128))
      ])
    ]));
  }
}), wc = ["id", "aria-labelledby", "tabindex"], _c = /* @__PURE__ */ L({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(t) {
    ia((d) => ({
      "7152af7e": o.value,
      "2a62e962": i.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, n = _e(Qe), { isVisible: l, asc: r } = n(Le(() => e.tabId)), o = I(() => a[String(r == null ? void 0 : r.value)]), i = I(() => a[String(!(r != null && r.value))]);
    return (d, f) => (s(), N(ul, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: W(() => [
        pe(u("div", {
          id: d.panelId,
          class: $(["fr-tabs__panel", {
            "fr-tabs__panel--selected": M(l)
          }]),
          role: "tabpanel",
          "aria-labelledby": d.tabId,
          tabindex: M(l) ? 0 : -1
        }, [
          A(d.$slots, "default", {}, void 0, !0)
        ], 10, wc), [
          [sa, M(l)]
        ])
      ]),
      _: 3
    }));
  }
}), Wa = /* @__PURE__ */ oe(_c, [["__scopeId", "data-v-5774b16c"]]), Ic = { role: "presentation" }, Dc = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], xc = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Ua = /* @__PURE__ */ L({
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
    function o(f) {
      const p = f == null ? void 0 : f.key, m = r[p];
      m && n(m);
    }
    const i = _e(Qe), { isVisible: d } = i(Le(() => a.tabId));
    return (f, p) => (s(), c("li", Ic, [
      u("button", {
        id: f.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${f.tabId}`,
        class: "fr-tabs__tab",
        tabindex: M(d) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": M(d),
        "aria-controls": f.panelId,
        onClick: p[0] || (p[0] = G((m) => f.$emit("click", f.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (m) => o(m))
      }, [
        f.icon ? (s(), c("span", xc, [
          X(ae, { name: f.icon }, null, 8, ["name"])
        ])) : h("", !0),
        A(f.$slots, "default")
      ], 40, Dc)
    ]));
  }
}), Xa = /* @__PURE__ */ L({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = I(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = I(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, r) => (s(), c("th", H(l.headerAttrs, { scope: "col" }), [
      V(b(l.header) + " ", 1),
      l.icon && !a.value ? (s(), N(ae, de(H({ key: 0 }, n.value)), null, 16)) : h("", !0),
      a.value ? (s(), c("span", {
        key: 1,
        class: $({ [String(l.icon)]: a.value })
      }, null, 2)) : h("", !0)
    ], 16));
  }
}), Cc = { key: 0 }, Ya = /* @__PURE__ */ L({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (s(), c("tr", Cc, [
      (s(!0), c(q, null, Q(e.headers, (n, l) => (s(), N(Xa, {
        key: l,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : h("", !0);
  }
}), Za = /* @__PURE__ */ L({
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
    const e = t, a = I(() => typeof e.field == "object" && e.field !== null && e.field.component ? e.field.component : !1), n = I(() => ["string", "number", "boolean"].includes(typeof e.field));
    return (l, r) => (s(), c("td", de(gt(l.cellAttrs)), [
      a.value ? (s(), N(ne(a.value), de(H({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: W(() => [
          V(b(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (s(), c(q, { key: 1 }, [
        V(b(n.value ? l.field : l.field.text), 1)
      ], 64))
    ], 16));
  }
}), Ja = /* @__PURE__ */ L({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(t) {
    return (e, a) => (s(), c("tr", de(gt(e.rowAttrs)), [
      A(e.$slots, "default"),
      (s(!0), c(q, null, Q(e.rowData, (n, l) => (s(), N(Za, {
        key: l,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Bc = { class: "caption" }, Tc = { key: 1 }, Sc = ["colspan"], Ec = { class: "flex justify-right" }, Ac = { class: "self-center" }, Lc = ["value"], Mc = { class: "flex ml-1" }, Fc = { class: "self-center" }, Pc = { class: "flex ml-1" }, $c = /* @__PURE__ */ L({
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
    const a = t, n = e, l = (v) => Array.isArray(v) ? v : v.rowData, r = O(a.currentPage), o = O(a.resultsDisplayed), i = O(
      a.rows.length > o.value ? Math.ceil(a.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], f = () => r.value * o.value - o.value, p = () => r.value * o.value;
    le(
      () => o.value,
      (v) => {
        i.value = a.rows.length > o.value ? Math.ceil(a.rows.length / v) : 1;
      }
    );
    const m = I(() => a.pagination ? a.rows.slice(f(), p()) : a.rows), k = () => {
      r.value = 1, n("update:currentPage");
    }, B = () => {
      r.value > 1 && (r.value -= 1, n("update:currentPage"));
    }, x = () => {
      r.value < i.value && (r.value += 1, n("update:currentPage"));
    }, P = () => {
      r.value = i.value, n("update:currentPage");
    };
    return (v, S) => (s(), c("div", {
      class: $(["fr-table", { "fr-table--no-caption": v.noCaption }])
    }, [
      u("table", null, [
        u("caption", Bc, b(v.title), 1),
        u("thead", null, [
          A(v.$slots, "header", {}, () => [
            v.headers && v.headers.length ? (s(), N(Ya, {
              key: 0,
              headers: v.headers
            }, null, 8, ["headers"])) : h("", !0)
          ], !0)
        ]),
        u("tbody", null, [
          A(v.$slots, "default", {}, void 0, !0),
          v.rows && v.rows.length ? (s(!0), c(q, { key: 0 }, Q(m.value, (_, D) => (s(), N(Ja, {
            key: v.rowKey && l(_) ? typeof v.rowKey == "string" ? l(_)[v.headers.indexOf(v.rowKey)].toString() : v.rowKey(l(_)) : D,
            "row-data": l(_),
            "row-attrs": "rowAttrs" in _ ? _.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : h("", !0),
          v.pagination ? (s(), c("tr", Tc, [
            u("td", {
              colspan: v.headers.length
            }, [
              u("div", Ec, [
                u("div", Ac, [
                  S[6] || (S[6] = u("span", null, "Résultats par page : ", -1)),
                  pe(u("select", {
                    "onUpdate:modelValue": S[0] || (S[0] = (_) => o.value = _),
                    onChange: S[1] || (S[1] = (_) => n("update:currentPage"))
                  }, [
                    (s(), c(q, null, Q(d, (_, D) => u("option", {
                      key: D,
                      value: _
                    }, b(_), 9, Lc)), 64))
                  ], 544), [
                    [ht, o.value]
                  ])
                ]),
                u("div", Mc, [
                  u("span", Fc, "Page " + b(r.value) + " sur " + b(i.value), 1)
                ]),
                u("div", Pc, [
                  u("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: S[2] || (S[2] = (_) => k())
                  }),
                  u("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: S[3] || (S[3] = (_) => B())
                  }),
                  u("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: S[4] || (S[4] = (_) => x())
                  }),
                  u("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: S[5] || (S[5] = (_) => P())
                  })
                ])
              ])
            ], 8, Sc)
          ])) : h("", !0)
        ])
      ])
    ], 2));
  }
}), Rc = /* @__PURE__ */ oe($c, [["__scopeId", "data-v-3998acc8"]]), Nc = ["aria-label"], Vc = /* @__PURE__ */ L({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: e, emit: a }) {
    const n = t, l = a, r = O(!1), o = I({
      get: () => n.modelValue,
      set(C) {
        l("update:modelValue", C);
      }
    }), i = O(/* @__PURE__ */ new Map()), d = O(0);
    ve(Qe, (C) => {
      const K = O(!0);
      if (le(o, (y, U) => {
        K.value = y > U;
      }), [...i.value.values()].includes(C.value))
        return { isVisible: I(() => i.value.get(o.value) === C.value), asc: K };
      const g = d.value++;
      i.value.set(g, C.value);
      const E = I(() => g === o.value);
      return le(C, () => {
        i.value.set(g, C.value);
      }), fe(() => {
        i.value.delete(g);
      }), { isVisible: E };
    });
    const f = O(null), p = O(null), m = sl({}), k = (C) => {
      if (m[C])
        return m[C];
      const K = J("tab");
      return m[C] = K, K;
    }, B = async () => {
      const C = o.value === 0 ? n.tabTitles.length - 1 : o.value - 1;
      r.value = !1, o.value = C;
    }, x = async () => {
      const C = o.value === n.tabTitles.length - 1 ? 0 : o.value + 1;
      r.value = !0, o.value = C;
    }, P = async () => {
      o.value = 0;
    }, v = async () => {
      o.value = n.tabTitles.length - 1;
    }, S = O({ "--tabs-height": "100px" }), _ = () => {
      var C;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const K = p.value.offsetHeight, g = (C = f.value) == null ? void 0 : C.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!g || !g.offsetHeight)
        return;
      const E = g.offsetHeight;
      S.value["--tabs-height"] = `${K + E}px`;
    }, D = O(null);
    return re(() => {
      var C;
      window.ResizeObserver && (D.value = new window.ResizeObserver(() => {
        _();
      })), (C = f.value) == null || C.querySelectorAll(".fr-tabs__panel").forEach((K) => {
        var g;
        K && ((g = D.value) == null || g.observe(K));
      });
    }), fe(() => {
      var C;
      (C = f.value) == null || C.querySelectorAll(".fr-tabs__panel").forEach((K) => {
        var g;
        K && ((g = D.value) == null || g.unobserve(K));
      });
    }), e({
      renderTabs: _,
      selectFirst: P,
      selectLast: v
    }), (C, K) => (s(), c("div", {
      ref_key: "$el",
      ref: f,
      class: "fr-tabs",
      style: ue(S.value)
    }, [
      u("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": C.tabListName
      }, [
        A(C.$slots, "tab-items", {}, () => [
          (s(!0), c(q, null, Q(C.tabTitles, (g, E) => (s(), N(Ua, {
            key: E,
            icon: g.icon,
            "panel-id": g.panelId || `${k(E)}-panel`,
            "tab-id": g.tabId || k(E),
            onClick: (y) => o.value = E,
            onNext: K[0] || (K[0] = (y) => x()),
            onPrevious: K[1] || (K[1] = (y) => B()),
            onFirst: K[2] || (K[2] = (y) => P()),
            onLast: K[3] || (K[3] = (y) => v())
          }, {
            default: W(() => [
              V(b(g.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, Nc),
      (s(!0), c(q, null, Q(C.tabContents, (g, E) => {
        var y, U, w, T;
        return s(), N(Wa, {
          key: E,
          "panel-id": ((U = (y = C.tabTitles) == null ? void 0 : y[E]) == null ? void 0 : U.panelId) || `${k(E)}-panel`,
          "tab-id": ((T = (w = C.tabTitles) == null ? void 0 : w[E]) == null ? void 0 : T.tabId) || k(E)
        }, {
          default: W(() => [
            V(b(g), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      A(C.$slots, "default")
    ], 4));
  }
}), jc = /* @__PURE__ */ L({
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
    const e = t, a = I(() => typeof e.link == "string" && e.link.startsWith("http")), n = I(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = I(() => ({ [a.value ? "href" : "to"]: e.link })), r = I(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), o = e.small ? 0.65 : 0.9, i = I(() => r.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: o } : { scale: o, ...e.icon ?? {} });
    return (d, f) => (s(), N(ne(n.value), H({
      class: ["fr-tag", {
        "fr-tag--sm": d.small,
        [d.icon]: r.value,
        "fr-tag--icon-left": r.value
      }],
      disabled: d.disabled
    }, l.value), {
      default: W(() => [
        e.icon && !r.value ? (s(), N(ae, H({
          key: 0,
          label: d.iconOnly ? d.label : void 0,
          class: "fr-mr-1v"
        }, i.value), null, 16, ["label"])) : h("", !0),
        d.iconOnly ? h("", !0) : (s(), c(q, { key: 1 }, [
          V(b(d.label), 1)
        ], 64)),
        A(d.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), At = /* @__PURE__ */ oe(jc, [["__scopeId", "data-v-f6a89dc8"]]), Oc = { class: "fr-tags-group" }, qc = /* @__PURE__ */ L({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (s(), c("ul", Oc, [
      (s(!0), c(q, null, Q(e.tags, ({ icon: n, label: l, ...r }, o) => (s(), c("li", { key: o }, [
        X(At, H({ ref_for: !0 }, r, {
          icon: n,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), Hc = { class: "fr-tile__body" }, Kc = { class: "fr-tile__content" }, zc = ["download", "href"], Qc = {
  key: 0,
  class: "fr-tile__desc"
}, Gc = {
  key: 1,
  class: "fr-tile__detail"
}, Wc = {
  key: 2,
  class: "fr-tile__start"
}, Uc = { class: "fr-tile__header" }, Xc = {
  key: 0,
  class: "fr-tile__pictogram"
}, Yc = ["src"], Zc = ["href"], Jc = ["href"], ef = ["href"], tf = /* @__PURE__ */ L({
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
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = I(() => typeof e.to == "string" && e.to.startsWith("http"));
    return (l, r) => {
      const o = se("RouterLink");
      return s(), c("div", {
        class: $(["fr-tile fr-enlarge-link", [{
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
        u("div", Hc, [
          u("div", Kc, [
            (s(), N(ne(l.titleTag), { class: "fr-tile__title" }, {
              default: W(() => [
                n.value ? (s(), c("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, b(l.title), 9, zc)) : h("", !0),
                n.value ? h("", !0) : (s(), N(o, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: W(() => [
                    V(b(l.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            l.description ? (s(), c("p", Qc, b(l.description), 1)) : h("", !0),
            l.details ? (s(), c("p", Gc, b(l.details), 1)) : h("", !0),
            l.$slots["start-details"] ? (s(), c("div", Wc, [
              A(l.$slots, "start-details", {}, void 0, !0)
            ])) : h("", !0)
          ])
        ]),
        u("div", Uc, [
          A(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (s(), c("div", Xc, [
            l.imgSrc ? (s(), c("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Yc)) : (s(), c("svg", H({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...a, ...l.svgAttrs }), [
              u("use", {
                class: "fr-artwork-decorative",
                href: `${l.svgPath}#artwork-decorative`
              }, null, 8, Zc),
              u("use", {
                class: "fr-artwork-minor",
                href: `${l.svgPath}#artwork-minor`
              }, null, 8, Jc),
              u("use", {
                class: "fr-artwork-major",
                href: `${l.svgPath}#artwork-major`
              }, null, 8, ef)
            ], 16))
          ])) : h("", !0)
        ])
      ], 2);
    };
  }
}), el = /* @__PURE__ */ oe(tf, [["__scopeId", "data-v-f4d836a2"]]), af = { class: "fr-grid-row fr-grid-row--gutters" }, lf = /* @__PURE__ */ L({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (s(), c("div", af, [
      (s(!0), c(q, null, Q(e.tiles, (n, l) => (s(), c("div", {
        key: l,
        class: $({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        X(el, H({
          horizontal: e.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), nf = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], rf = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], of = ["id"], sf = /* @__PURE__ */ L({
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
    const e = t, a = I(() => `${e.inputId}-hint-text`);
    return (n, l) => (s(), c("div", {
      class: $(["fr-toggle", {
        "fr-toggle--label-left": n.labelLeft,
        "fr-toggle--border-bottom": n.borderBottom
      }])
    }, [
      u("input", {
        id: n.inputId,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        type: "checkbox",
        checked: n.modelValue,
        "data-testid": n.inputId,
        class: "fr-toggle__input",
        "aria-describedby": a.value,
        onInput: l[0] || (l[0] = (r) => n.$emit("update:modelValue", r.target.checked))
      }, null, 40, nf),
      u("label", {
        id: a.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, b(n.label), 9, rf),
      n.hint ? (s(), c("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, b(n.hint), 9, of)) : h("", !0)
    ], 2));
  }
}), df = ["id"], uf = /* @__PURE__ */ L({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => J("tooltip") }
  },
  setup(t) {
    const e = t, a = O(!1), n = O(null), l = O(null), r = O("0px"), o = O("0px"), i = O("0px"), d = O(!1), f = O(0);
    async function p() {
      var _, D, C, K, g, E;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((ee) => setTimeout(ee, 100));
      const y = (_ = n.value) == null ? void 0 : _.getBoundingClientRect().top, U = (D = n.value) == null ? void 0 : D.offsetHeight, w = (C = n.value) == null ? void 0 : C.offsetWidth, T = (K = n.value) == null ? void 0 : K.getBoundingClientRect().left, j = (g = l.value) == null ? void 0 : g.offsetHeight, F = (E = l.value) == null ? void 0 : E.offsetWidth, R = !(y - j < 0) && y + U + j >= document.documentElement.offsetHeight;
      d.value = R;
      const z = T + w >= document.documentElement.offsetWidth, Z = T + w / 2 - F / 2 <= 0;
      o.value = R ? `${y - j + 8}px` : `${y + U - 8}px`, f.value = 1, r.value = z ? `${T + w - F - 4}px` : Z ? `${T + 4}px` : `${T + w / 2 - F / 2}px`, i.value = z ? `${F / 2 - w / 2 + 4}px` : Z ? `${-(F / 2) + w / 2 - 4}px` : "0px";
    }
    le(a, p, { immediate: !0 }), re(() => {
      window.addEventListener("scroll", p);
    }), fe(() => {
      window.removeEventListener("scroll", p);
    });
    const m = I(() => `transform: translate(${r.value}, ${o.value}); --arrow-x: ${i.value}; opacity: ${f.value};'`), k = I(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": d.value,
      "fr-placement--bottom": !d.value
    })), B = (_) => {
      var D, C;
      a.value && (_.target === n.value || (D = n.value) != null && D.contains(_.target) || _.target === l.value || (C = l.value) != null && C.contains(_.target) || (a.value = !1));
    }, x = (_) => {
      _.key === "Escape" && (a.value = !1);
    };
    re(() => {
      document.documentElement.addEventListener("click", B), document.documentElement.addEventListener("keydown", x);
    }), fe(() => {
      document.documentElement.removeEventListener("click", B), document.documentElement.removeEventListener("keydown", x);
    });
    const P = () => {
      e.onHover && (a.value = !0);
    }, v = () => {
      e.onHover && (a.value = !1);
    }, S = () => {
      e.onHover || (a.value = !a.value);
    };
    return (_, D) => (s(), c(q, null, [
      (s(), N(ne(_.onHover ? "a" : "button"), {
        id: `link-${_.id}`,
        ref_key: "source",
        ref: n,
        class: $(_.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": _.id,
        href: _.onHover ? "#" : void 0,
        onClick: D[0] || (D[0] = G((C) => S(), ["stop"])),
        onMouseenter: D[1] || (D[1] = (C) => P()),
        onMouseleave: D[2] || (D[2] = (C) => v()),
        onFocus: D[3] || (D[3] = (C) => P()),
        onBlur: D[4] || (D[4] = (C) => v())
      }, {
        default: W(() => [
          A(_.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      u("span", {
        id: _.id,
        ref_key: "tooltip",
        ref: l,
        class: $(["fr-tooltip fr-placement", k.value]),
        style: ue(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, b(_.content), 15, df)
    ], 64));
  }
}), cf = /* @__PURE__ */ oe(uf, [["__scopeId", "data-v-67870551"]]), ff = { class: "fr-transcription" }, pf = ["aria-expanded", "aria-controls"], vf = ["id"], mf = ["id", "aria-labelledby"], gf = { class: "fr-container fr-container--fluid fr-container-md" }, bf = { class: "fr-grid-row fr-grid-row--center" }, hf = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, yf = { class: "fr-modal__body" }, kf = { class: "fr-modal__header" }, wf = ["aria-controls"], _f = { class: "fr-modal__content" }, If = ["id"], Df = { class: "fr-transcription__footer" }, xf = { class: "fr-transcription__actions-group" }, Cf = ["aria-controls"], tl = /* @__PURE__ */ L({
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
    } = me(), i = O(!1), d = O(!1), f = I(() => `fr-transcription__modal-${e.id}`), p = I(() => `fr-transcription__collapse-${e.id}`);
    return le(d, (m, k) => {
      m !== k && r(m);
    }), (m, k) => (s(), c("div", ff, [
      u("button", {
        class: "fr-transcription__btn",
        "aria-expanded": d.value,
        "aria-controls": p.value,
        onClick: k[0] || (k[0] = (B) => d.value = !d.value)
      }, " Transcription ", 8, pf),
      u("div", {
        id: p.value,
        ref_key: "collapse",
        ref: a,
        class: $(["fr-collapse", { "fr-collapse--expanded": M(l), "fr-collapsing": M(n) }]),
        onTransitionend: k[2] || (k[2] = (B) => M(o)(d.value))
      }, [
        u("dialog", {
          id: f.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${f.value}-title`
        }, [
          u("div", gf, [
            u("div", bf, [
              u("div", hf, [
                u("div", yf, [
                  u("div", kf, [
                    u("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": f.value,
                      title: "Fermer"
                    }, " Fermer ", 8, wf)
                  ]),
                  u("div", _f, [
                    u("h1", {
                      id: `${f.value}-title`,
                      class: "fr-modal__title"
                    }, b(m.title), 9, If),
                    V(" " + b(m.content), 1)
                  ]),
                  u("div", Df, [
                    u("div", xf, [
                      u("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": f.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: k[1] || (k[1] = (B) => i.value = !0)
                      }, " Agrandir ", 8, Cf)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, mf)
      ], 42, vf),
      (s(), N(il, { to: "body" }, [
        X(Ra, {
          title: m.title,
          opened: i.value,
          onClose: k[3] || (k[3] = (B) => i.value = !1)
        }, {
          default: W(() => [
            A(m.$slots, "default", {}, () => [
              V(b(m.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Bf = ["src"], Tf = { class: "fr-content-media__caption" }, Sf = /* @__PURE__ */ L({
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
    return (e, a) => (s(), c(q, null, [
      u("figure", {
        class: $(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        u("div", {
          class: $(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          u("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Bf)
        ], 2),
        u("div", Tf, b(e.legend), 1)
      ], 2),
      X(tl, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Ef = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: bl,
  DsfrAccordionsGroup: yl,
  DsfrAlert: _l,
  DsfrBackToTop: Il,
  DsfrBadge: ua,
  DsfrBreadcrumb: El,
  DsfrButton: Me,
  DsfrButtonGroup: Xe,
  DsfrCallout: qn,
  DsfrCard: ar,
  DsfrCardDetail: ft,
  DsfrCheckbox: Bt,
  DsfrCheckboxSet: pr,
  DsfrConsent: br,
  DsfrDataTable: Zr,
  DsfrErrorPage: oo,
  DsfrFieldset: fo,
  DsfrFileDownload: Ca,
  DsfrFileDownloadList: bo,
  DsfrFileUpload: Do,
  DsfrFollow: zo,
  DsfrFooter: ws,
  DsfrFooterLink: Sa,
  DsfrFooterLinkList: xs,
  DsfrFooterPartners: Ea,
  DsfrFranceConnect: Ss,
  DsfrHeader: gi,
  DsfrHeaderMenuLink: Et,
  DsfrHeaderMenuLinks: pt,
  DsfrHighlight: bi,
  DsfrInput: St,
  DsfrInputGroup: Ii,
  DsfrLanguageSelector: Ee,
  DsfrLogo: Se,
  DsfrModal: Ra,
  DsfrNavigation: Sd,
  DsfrNavigationItem: Na,
  DsfrNavigationMegaMenu: ja,
  DsfrNavigationMegaMenuCategory: Va,
  DsfrNavigationMenu: qa,
  DsfrNavigationMenuItem: Oa,
  DsfrNavigationMenuLink: Ye,
  DsfrNewsLetter: Ba,
  DsfrNotice: Fd,
  DsfrPagination: Tt,
  DsfrPicture: Vd,
  DsfrQuote: Gd,
  DsfrRadioButton: Ha,
  DsfrRadioButtonSet: uu,
  DsfrRange: wu,
  DsfrSearchBar: Ae,
  DsfrSegmented: Ka,
  DsfrSegmentedSet: Au,
  DsfrSelect: Vu,
  DsfrShare: Gu,
  DsfrSideMenu: ac,
  DsfrSideMenuButton: za,
  DsfrSideMenuLink: lc,
  DsfrSideMenuList: Ga,
  DsfrSideMenuListItem: Qa,
  DsfrSkipLinks: ic,
  DsfrSocialNetworks: Ta,
  DsfrStepper: mc,
  DsfrSummary: kc,
  DsfrTabContent: Wa,
  DsfrTabItem: Ua,
  DsfrTable: Rc,
  DsfrTableCell: Za,
  DsfrTableHeader: Xa,
  DsfrTableHeaders: Ya,
  DsfrTableRow: Ja,
  DsfrTabs: Vc,
  DsfrTag: At,
  DsfrTags: qc,
  DsfrTile: el,
  DsfrTiles: lf,
  DsfrToggleSwitch: sf,
  DsfrTooltip: cf,
  DsfrTranscription: tl,
  DsfrVideo: Sf,
  VIcon: ae,
  registerAccordionKey: yt,
  registerNavigationLinkKey: kt,
  registerTabKey: Qe
}, Symbol.toStringTag, { value: "Module" })), Af = {
  install: (t, { components: e } = {}) => {
    Object.entries(Ef).forEach(([a, n]) => {
      (e === void 0 || e === "all" || e.map(({ name: l }) => l).includes(a)) && t.component(a, n);
    }), t.component("VIcon", ae);
  }
}, Lf = {
  _searchAndFilterList: function(t, e, a, n, l) {
    let r = this.$data.vueData[t];
    if (n && (r = r.filter(n)), l != null && l.trim() !== "") {
      const o = this.unaccentLower(l);
      r = r.filter((i) => this.unaccentLower(i[a].toString()).indexOf(o) > -1);
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
      return {
        value: d[e],
        label: d[a].toString(),
        hint: d[l],
        disabled: d[n]
      };
    });
  },
  dsfrTransformListForCheckbox: function(t, e, a, n, l, r, o, i) {
    return this._searchAndFilterList(t, e, a, o, i).map(function(f) {
      return {
        value: f[e],
        label: f[a].toString(),
        name: r,
        hint: f[l],
        disabled: f[n]
      };
    });
  },
  dsfrDefaultSortFn: function(t, e, a) {
    const n = this.componentStates[t].sortedColumn;
    return e[n] < a[n] ? -1 : e[n] > a[n] ? 1 : 0;
  }
}, Mf = ["href"], Ff = {
  __name: "RouterLink",
  props: ["to"],
  setup(t) {
    const e = t;
    return (a, n) => (s(), c("a", {
      href: e.to
    }, [
      A(a.$slots, "default")
    ], 8, Mf));
  }
}, Fe = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, Pf = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Bt, DsfrTag: At, DsfrButton: Me },
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
}, $f = {
  key: 0,
  class: "fr-mb-2w"
}, Rf = { class: "fr-mb-1w" }, Nf = { key: 0 }, Vf = { class: "facet" }, jf = { class: "flex justify-between w-full fr-mb-0" }, Of = { class: "facet--count" }, qf = { key: 1 }, Hf = { class: "flex justify-between w-full" }, Kf = { class: "facet--count" }, zf = { key: 0 }, Qf = { class: "facet" }, Gf = { class: "flex justify-between w-full fr-mb-0" }, Wf = { class: "facet--count" }, Uf = { key: 1 }, Xf = { class: "flex justify-between w-full" }, Yf = { class: "facet--count" }, Zf = { class: "fr-mb-2w" };
function Jf(t, e, a, n, l, r) {
  const o = se("DsfrTag"), i = se("DsfrCheckbox"), d = se("DsfrButton");
  return s(), c("div", null, [
    r.isAnyFacetValueSelected() ? (s(), c("div", $f, [
      (s(!0), c(q, null, Q(a.selectedFacets, (f, p) => (s(), c("div", { key: p }, [
        r.facetMultipleByCode(p) ? h("", !0) : (s(!0), c(q, { key: 0 }, Q(f, (m) => (s(), N(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (k) => t.$emit("toogle-facet", p, m, a.contextKey)
        }, {
          default: W(() => [
            V(b(r.facetLabelByCode(p)) + ": " + b(r.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : h("", !0),
    (s(!0), c(q, null, Q(a.facets, (f) => (s(), c("div", {
      key: f.code,
      class: "facets"
    }, [
      f.multiple || !r.isFacetSelected(f.code) ? (s(), c(q, { key: 0 }, [
        u("h6", Rf, b(f.label), 1),
        u("ul", null, [
          (s(!0), c(q, null, Q(r.selectedInvisibleFacets(f.code), (p) => (s(), c(q, {
            key: p.code
          }, [
            f.multiple ? (s(), c("li", Nf, [
              u("div", Vf, [
                X(i, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (m) => t.$emit("toogle-facet", f.code, p.code, a.contextKey)
                }, {
                  label: W(() => [
                    u("p", jf, [
                      V(b(r.facetValueLabelByCode(f.code, p.code)) + " ", 1),
                      u("span", Of, b(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (s(), c("li", qf, [
              X(d, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => t.$emit("toogle-facet", f.code, p.code, a.contextKey)
              }, {
                default: W(() => [
                  u("span", Hf, [
                    V(b(r.facetValueLabelByCode(f.code, p.code)) + " ", 1),
                    u("span", Kf, b(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        u("ul", null, [
          (s(!0), c(q, null, Q(r.visibleFacets(f.code, f.values), (p) => (s(), c(q, {
            key: p.code
          }, [
            f.multiple ? (s(), c("li", zf, [
              u("div", Qf, [
                X(i, {
                  small: "",
                  modelValue: r.isFacetValueSelected(f.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (m) => t.$emit("toogle-facet", f.code, p.code, a.contextKey)
                }, {
                  label: W(() => [
                    u("p", Gf, [
                      V(b(r.facetValueLabelByCode(f.code, p.code)) + " ", 1),
                      u("span", Wf, b(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (s(), c("li", Uf, [
              X(d, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => t.$emit("toogle-facet", f.code, p.code, a.contextKey)
              }, {
                default: W(() => [
                  u("span", Xf, [
                    V(b(r.facetValueLabelByCode(f.code, p.code)) + " ", 1),
                    u("span", Yf, b(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        u("div", Zf, [
          f.values.length > a.maxValues && !r.isFacetExpanded(f.code) ? (s(), N(d, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => r.expandFacet(f.code)
          }, {
            default: W(() => [
              V(b(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : h("", !0),
          f.values.length > a.maxValues && r.isFacetExpanded(f.code) ? (s(), N(d, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => r.reduceFacet(f.code)
          }, {
            default: W(() => [
              V(b(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : h("", !0)
        ])
      ], 64)) : h("", !0)
    ]))), 128))
  ]);
}
const ep = /* @__PURE__ */ Fe(Pf, [["render", Jf], ["__scopeId", "data-v-e1d6020e"]]), Lt = () => {
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
}, tp = "abcdefghijklmnopqrstuvwyz0123456789", oa = tp.repeat(10), ap = () => {
  const t = Math.floor(Math.random() * oa.length);
  return oa[t];
}, lp = (t) => Array.from({ length: t }).map(ap).join(""), Ze = (t = "", e = "") => (t ? `${t}-` : "") + lp(5) + (e ? `-${e}` : ""), np = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], rp = ["id", "aria-labelledby", "onKeydown"], op = {
  class: "fr-menu__list",
  role: "none"
}, sp = /* @__PURE__ */ L({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Ze("menu") },
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
    } = Lt(), o = t, i = O(null), d = O(!1);
    let f = O(0), p = [];
    ve("menuItem", { menuItemIndex: f, addMenuItem: (_, D) => {
      f.value += 1, p.push(`${_}@${D}`);
    } }), ve("id", o.id), le(d, (_, D) => {
      _ !== D && (l(_), _ ? (setTimeout(() => x(), 100), document.addEventListener("click", S), document.addEventListener("touchstart", S)) : (document.removeEventListener("click", S), document.removeEventListener("touchstart", S)));
    });
    const k = (_, D) => {
      const C = D === "down" ? (_ + 1) % p.length : (_ - 1 + p.length) % p.length, K = document.getElementById(`${o.id}_item_${C}`);
      return K.ariaDisabled === "true" ? k(C, D) : K;
    }, B = (_) => {
      const D = document.activeElement.id, C = D.startsWith(`${o.id}_item_`) ? Number(D.split("_")[2]) : _ === "down" ? -1 : 0;
      k(C, _).focus();
    }, x = (_) => B("down"), P = (_) => B("up");
    let v = (_) => {
      let D = _.key;
      if (D.length > 1 && D.match(/\S/))
        return;
      D = D.toLowerCase();
      let C = p.filter((g) => g.toLowerCase().startsWith(D)), K = document.activeElement.id;
      for (let g of C) {
        let E = g.split("@")[1], y = document.getElementById(`${o.id}_item_${E}`);
        if (K !== y.id) {
          y.focus();
          break;
        }
      }
    }, S = (_) => {
      i.value.contains(document.activeElement) || (d.value = !1);
    };
    return (_, D) => (s(), c("div", {
      class: "relative-position",
      onKeydown: D[9] || (D[9] = Y(
        //@ts-ignore
        (...C) => M(S) && M(S)(...C),
        ["tab"]
      )),
      ref_key: "container",
      ref: i
    }, [
      u("button", H({
        id: _.id,
        onClick: D[0] || (D[0] = G((C) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          D[1] || (D[1] = Y(G((C) => d.value = !1, ["stop"]), ["esc"])),
          D[2] || (D[2] = Y(G((C) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Y(G(x, ["prevent"]), ["down"]),
          Y(G(P, ["prevent"]), ["up"]),
          D[3] || (D[3] = //@ts-ignore
          (...C) => M(v) && M(v)(...C)),
          D[4] || (D[4] = Y((C) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          "fr-btn--secondary": _.secondary,
          "fr-btn--tertiary": _.tertiary
        }],
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": _.disabled,
        "aria-controls": `${_.id}_menu`,
        "aria-expanded": d.value
      }, _.$attrs), [
        _.icon !== "" ? (s(), N(M(ae), {
          key: 0,
          class: "fr-mr-2v",
          name: _.icon
        }, null, 8, ["name"])) : h("", !0),
        u("span", null, b(_.label), 1)
      ], 16, np),
      u("div", {
        id: `${_.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: $(["fr-collapse fr-menu", { "fr-collapse--expanded": M(n), "fr-collapsing": M(a) }]),
        role: "menu",
        "aria-labelledby": _.id,
        onKeyup: D[5] || (D[5] = Y((C) => d.value = !1, ["esc"])),
        onKeydown: [
          D[6] || (D[6] = Y((C) => d.value = !1, ["tab"])),
          Y(G(x, ["prevent"]), ["down"]),
          Y(G(P, ["prevent"]), ["up"]),
          D[7] || (D[7] = //@ts-ignore
          (...C) => M(v) && M(v)(...C))
        ],
        onTransitionend: D[8] || (D[8] = (C) => M(r)(d.value))
      }, [
        u("ul", op, [
          A(_.$slots, "default", {}, void 0, !0)
        ])
      ], 42, rp)
    ], 544));
  }
}), ip = /* @__PURE__ */ Fe(sp, [["__scopeId", "data-v-af8f1fef"]]), dp = { role: "none" }, up = ["id", "href"], cp = /* @__PURE__ */ L({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    url: { default: "" }
  },
  setup(t) {
    const e = t, { menuItemIndex: a, addMenuItem: n } = _e("menuItem"), l = _e("id"), r = a.value;
    return n(e.label, r), (o, i) => {
      const d = se("dsfr-button");
      return s(), c("li", dp, [
        o.url === "" ? (s(), N(d, H({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: o.label,
          id: `${M(l)}_item_${M(r)}`,
          secondary: "",
          class: "fr-nav__link"
        }, o.$attrs), null, 16, ["label", "id"])) : (s(), c("a", H({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${M(l)}_item_${M(r)}`,
          href: o.url,
          class: "fr-btn fr-btn--secondary fr-nav__link"
        }, o.$attrs), b(o.label), 17, up))
      ]);
    };
  }
}), fp = ["for"], pp = {
  key: 0,
  class: "required"
}, vp = {
  key: 0,
  class: "fr-hint-text"
}, mp = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], gp = ["id", "onKeydown"], bp = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, hp = ["id"], yp = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, kp = ["id"], wp = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, _p = {
  key: 0,
  class: "fr-hint-text"
}, Ip = {
  role: "listbox",
  "aria-multiselectable": "true",
  class: "fr-select__ul"
}, Dp = ["aria-selected"], xp = ["id", "data-id", "value"], Cp = ["for"], Bp = ["id"], Tp = /* @__PURE__ */ L({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ be({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Ze("select-multiple") },
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
    } = Lt(), o = t, i = O(!1), d = ie(t, "modelValue"), f = O(o.options);
    le(i, (F, R) => {
      F !== R && (l(F), F ? (document.addEventListener("click", j), document.addEventListener("touchstart", j)) : (document.removeEventListener("click", j), document.removeEventListener("touchstart", j)));
    });
    const p = O(null), m = O(null), k = O(null), B = I(() => o.errorMessage || o.successMessage), x = I(() => o.errorMessage !== "" ? "error" : "valid"), P = I(() => o.modelValue.length === f.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), v = I(() => o.modelValue.length === f.value.length ? "Tout déselectionner" : "Tout sélectionner"), S = I(() => {
      let F = `${o.modelValue.length} options séléctionnées`;
      return o.modelValue.length > 2 ? F : o.options.filter((R) => o.modelValue.includes(R.value)).map((R) => R.text).join(", ");
    });
    let _ = function() {
      if (o.modelValue.length >= f.value.length)
        o.modelValue.length = 0;
      else
        for (let F of f.value)
          o.modelValue.push(F.value);
    }, D = function(F) {
      const R = F.target.value.toLowerCase();
      f.value = o.options.filter((z) => z.text.toLowerCase().indexOf(R) > -1);
    };
    const C = (F, R) => {
      const z = R === "down" ? (F + 1) % f.value.length : (F - 1 + f.value.length) % f.value.length, Z = document.getElementById(`${o.id}_option_${z}`);
      return Z.ariaDisabled === "true" ? C(z, R) : Z;
    }, K = (F) => {
      const R = document.activeElement.id, z = R.startsWith(`${o.id}_option_`) ? Number(R.split("_")[2]) : F === "down" ? -1 : 0;
      C(z, F).focus();
    }, g = (F) => K("down"), E = (F) => K("up");
    let y = function(F) {
      F.shiftKey || (o.comboHasButton ? i.value || (i.value = !0, F.preventDefault(), setTimeout(() => m.value.focus(), 100)) : o.comboHasFilter && (i.value || (i.value = !0, F.preventDefault(), setTimeout(() => k.value.focus(), 100))));
    }, U = function(F) {
      F.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.id}_button` || o.comboHasFilter && document.activeElement.id === `${o.id}_filter`) && (F.preventDefault(), i.value = !1), !o.comboHasFilter && !o.comboHasButton && (i.value = !1));
    }, w = function(F) {
      document.activeElement.id.startsWith(`${o.id}_option_`) && (o.comboHasFilter ? (F.preventDefault(), k.value.focus()) : o.comboHasButton && m.value.focus());
    }, T = (F) => {
      let R = F.key;
      if (R.length > 1 && R.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      R = R.toLowerCase();
      let z = f.value.filter((ee) => ee.text.toLowerCase().startsWith(R)), Z = document.activeElement.id;
      for (let ee of z) {
        let te = document.querySelector(`[data-id='${ee.value}']`);
        if (Z !== te.id) {
          te.focus();
          break;
        }
      }
    }, j = (F) => {
      p.value.contains(document.activeElement) || (i.value = !1);
    };
    return (F, R) => (s(), c(q, null, [
      u("div", {
        ref_key: "container",
        ref: p,
        class: $(["fr-select-group", { [`fr-select-group--${x.value}`]: B.value !== "" }]),
        onKeyup: R[13] || (R[13] = Y(
          //@ts-ignore
          (...z) => M(j) && M(j)(...z),
          ["tab"]
        ))
      }, [
        u("label", {
          class: "fr-label",
          for: F.id
        }, [
          A(F.$slots, "label", {}, () => [
            V(b(F.label) + " ", 1),
            A(F.$slots, "required-tip", {}, () => [
              F.required ? (s(), c("span", pp, " *")) : h("", !0)
            ], !0)
          ], !0),
          F.description ? (s(), c("span", vp, b(F.description), 1)) : h("", !0)
        ], 8, fp),
        u("div", H({
          id: F.id,
          class: [{ [`fr-select--${x.value}`]: B.value !== "" }, "fr-input"],
          onClick: R[0] || (R[0] = G((z) => i.value = !i.value, ["prevent", "stop"])),
          onKeydown: [
            R[1] || (R[1] = Y(G((z) => i.value = !1, ["stop"]), ["esc"])),
            R[2] || (R[2] = Y(G((z) => i.value = !i.value, ["prevent"]), ["space"])),
            Y(G(g, ["prevent"]), ["down"]),
            Y(G(E, ["prevent"]), ["up"]),
            R[3] || (R[3] = Y(
              //@ts-ignore
              (...z) => M(y) && M(y)(...z),
              ["tab"]
            )),
            R[4] || (R[4] = //@ts-ignore
            (...z) => M(T) && M(T)(...z))
          ],
          tabindex: "0",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-autocomplete": "none",
          "aria-disabled": F.disabled,
          "aria-controls": `${F.id}_list`,
          "aria-expanded": i.value,
          "aria-required": F.required
        }, F.$attrs), [
          u("p", null, b(S.value), 1)
        ], 16, mp),
        u("div", {
          id: `${F.id}_list`,
          ref_key: "collapse",
          ref: e,
          class: $(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": M(n), "fr-collapsing": M(a) }]),
          onKeyup: R[8] || (R[8] = Y((z) => i.value = !1, ["esc"])),
          onKeydown: [
            R[9] || (R[9] = Y(
              //@ts-ignore
              (...z) => M(U) && M(U)(...z),
              ["tab"]
            )),
            Y(G(g, ["prevent"]), ["down"]),
            Y(G(E, ["prevent"]), ["up"]),
            R[10] || (R[10] = Y(G(
              //@ts-ignore
              (...z) => M(w) && M(w)(...z),
              ["shift"]
            ), ["tab"])),
            R[11] || (R[11] = //@ts-ignore
            (...z) => M(T) && M(T)(...z))
          ],
          onTransitionend: R[12] || (R[12] = (z) => M(r)(i.value))
        }, [
          F.comboHasButton ? (s(), c("ul", bp, [
            u("li", null, [
              u("button", {
                class: $(["fr-btn fr-btn--tertiary", `${P.value}`]),
                id: `${F.id}_button`,
                onClick: R[5] || (R[5] = (z) => M(_)()),
                ref_key: "button",
                ref: m,
                type: "button"
              }, b(v.value), 11, hp)
            ])
          ])) : h("", !0),
          F.comboHasFilter ? (s(), c("div", yp, [
            u("input", {
              class: "fr-input",
              id: `${F.id}_filter`,
              ref_key: "filter",
              ref: k,
              onInput: R[6] || (R[6] = //@ts-ignore
              (...z) => M(D) && M(D)(...z)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, kp)
          ])) : h("", !0),
          F.comboLabel ? (s(), c("p", wp, [
            V(b(F.comboLabel) + " ", 1),
            F.comboDescription ? (s(), c("span", _p, b(F.comboDescription), 1)) : h("", !0)
          ])) : h("", !0),
          u("ul", Ip, [
            (s(!0), c(q, null, Q(f.value, (z, Z) => (s(), c("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": d.value.includes(z.value)
            }, [
              pe(u("input", {
                id: `${F.id}_option_${Z}`,
                "data-id": z.value,
                type: "checkbox",
                class: "",
                tabindex: "-1",
                value: z.value,
                "onUpdate:modelValue": R[7] || (R[7] = (ee) => d.value = ee)
              }, null, 8, xp), [
                [ze, d.value]
              ]),
              u("label", {
                class: "fr-label",
                for: `opt_${Z}`
              }, b(z.text), 9, Cp)
            ], 8, Dp))), 256))
          ])
        ], 42, gp)
      ], 34),
      B.value ? (s(), c("p", {
        key: 0,
        id: `select-${x.value}-desc-${x.value}`,
        class: $(`fr-${x.value}-text`)
      }, b(B.value), 11, Bp)) : h("", !0)
    ], 64));
  }
}), Sp = /* @__PURE__ */ Fe(Tp, [["__scopeId", "data-v-578b4345"]]), Ep = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Ap = ["id", "aria-labelledby", "onKeydown"], Lp = {
  key: 0,
  class: "fr-label fr-mb-0"
}, Mp = {
  key: 0,
  class: "fr-hint-text"
}, Fp = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, Pp = {
  role: "none",
  class: "fr-p-2v"
}, $p = ["id", "href"], Rp = /* @__PURE__ */ L({
  inheritAttrs: !1,
  __name: "DsfrHeaderMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Ze("header-menu") },
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
    } = Lt(), o = t, i = O(null), d = O(!1);
    let f = O(0), p = [];
    const m = (_, D) => {
      f.value += 1, p.push(`${_}@${D}`);
    };
    ve("menuItem", { menuItemIndex: f, addMenuItem: m }), ve("id", o.id), le(d, (_, D) => {
      _ !== D && (l(_), _ ? (setTimeout(() => x(), 100), document.addEventListener("click", S), document.addEventListener("touchstart", S)) : (document.removeEventListener("click", S), document.removeEventListener("touchstart", S)));
    }), re(() => {
      m(o.logoutLabel, f.value);
    });
    const k = (_, D) => {
      const C = D === "down" ? (_ + 1) % p.length : (_ - 1 + p.length) % p.length, K = document.getElementById(`${o.id}_item_${C}`);
      return K.ariaDisabled === "true" ? k(C, D) : K;
    }, B = (_) => {
      const D = document.activeElement.id, C = D.startsWith(`${o.id}_item_`) ? Number(D.split("_")[2]) : _ === "down" ? -1 : 0;
      k(C, _).focus();
    }, x = (_) => B("down"), P = (_) => B("up");
    let v = (_) => {
      let D = _.key;
      if (D.length > 1 && D.match(/\S/))
        return;
      D = D.toLowerCase();
      let C = p.filter((g) => g.toLowerCase().startsWith(D)), K = document.activeElement.id;
      for (let g of C) {
        let E = g.split("@")[1], y = document.getElementById(`${o.id}_item_${E}`);
        if (K !== y.id) {
          y.focus();
          break;
        }
      }
    }, S = (_) => {
      i.value.contains(document.activeElement) || (d.value = !1);
    };
    return (_, D) => (s(), c("div", {
      class: "relative-position fr-menu-header",
      onKeyup: D[9] || (D[9] = Y(
        //@ts-ignore
        (...C) => M(S) && M(S)(...C),
        ["tab"]
      )),
      ref_key: "container",
      ref: i
    }, [
      u("button", H({
        id: _.id,
        onClick: D[0] || (D[0] = G((C) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          D[1] || (D[1] = Y(G((C) => d.value = !1, ["stop"]), ["esc"])),
          D[2] || (D[2] = Y(G((C) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Y(G(x, ["prevent"]), ["down"]),
          Y(G(P, ["prevent"]), ["up"]),
          D[3] || (D[3] = //@ts-ignore
          (...C) => M(v) && M(v)(...C)),
          D[4] || (D[4] = Y((C) => d.value = !1, ["tab"]))
        ],
        class: "fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm",
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": _.disabled,
        "aria-controls": `${_.id}_menu`,
        "aria-expanded": d.value
      }, _.$attrs), [
        _.icon !== "" ? (s(), N(M(ae), {
          key: 0,
          class: "fr-mr-2v",
          name: _.icon
        }, null, 8, ["name"])) : h("", !0),
        u("span", null, b(_.label), 1)
      ], 16, Ep),
      u("div", {
        id: `${_.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: $(["fr-collapse fr-menu fr-menu-header__modal fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": M(n), "fr-collapsing": M(a) }]),
        role: "menu",
        "aria-labelledby": _.id,
        onKeyup: D[5] || (D[5] = Y((C) => d.value = !1, ["esc"])),
        onKeydown: [
          D[6] || (D[6] = Y((C) => d.value = !1, ["tab"])),
          Y(G(x, ["prevent"]), ["down"]),
          Y(G(P, ["prevent"]), ["up"]),
          D[7] || (D[7] = //@ts-ignore
          (...C) => M(v) && M(v)(...C))
        ],
        onTransitionend: D[8] || (D[8] = (C) => M(r)(d.value))
      }, [
        A(_.$slots, "detail", {}, () => [
          _.nom === "" && _.email === "" ? h("", !0) : (s(), c("p", Lp, [
            V(b(_.nom) + " ", 1),
            _.email !== "" ? (s(), c("span", Mp, b(_.email), 1)) : h("", !0)
          ]))
        ], !0),
        u("ul", Fp, [
          A(_.$slots, "default", {}, void 0, !0),
          u("li", Pp, [
            _.logoutUrl !== "" ? (s(), c("a", {
              key: 0,
              id: `${_.id}_item_${M(f) - 1}`,
              class: "fr-btn w-full fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
              role: "menuitem",
              tabindex: "-1",
              href: _.logoutUrl
            }, b(_.logoutLabel), 9, $p)) : h("", !0)
          ])
        ])
      ], 42, Ap)
    ], 544));
  }
}), Np = /* @__PURE__ */ Fe(Rp, [["__scopeId", "data-v-c14e7d15"]]), Vp = Symbol("header"), jp = ["aria-label"], Op = { class: "fr-btns-group" }, mt = /* @__PURE__ */ L({
  __name: "DsfrCustomHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(t, { emit: e }) {
    const a = e;
    return (n, l) => (s(), c("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      u("ul", Op, [
        (s(!0), c(q, null, Q(n.links, (r, o) => (s(), c("li", { key: o }, [
          X(M(Et), H({ ref_for: !0 }, r, {
            "on-click": (i) => {
              var d;
              a("linkClick", i), (d = r.onClick) == null || d.call(r, i);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        A(n.$slots, "default")
      ])
    ], 8, jp));
  }
}), qp = {
  role: "banner",
  class: "fr-header"
}, Hp = { class: "fr-header__body" }, Kp = { class: "fr-container width-inherit" }, zp = { class: "fr-header__body-row" }, Qp = { class: "fr-header__brand fr-enlarge-link" }, Gp = { class: "fr-header__brand-top" }, Wp = { class: "fr-header__logo" }, Up = {
  key: 0,
  class: "fr-header__operator"
}, Xp = ["src", "alt"], Yp = {
  key: 1,
  class: "fr-header__navbar"
}, Zp = ["aria-label", "title", "data-fr-opened"], Jp = ["aria-label", "title"], ev = {
  key: 0,
  class: "fr-header__service"
}, tv = { class: "fr-header__service-title" }, av = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, lv = {
  key: 0,
  class: "fr-header__service-tagline"
}, nv = {
  key: 1,
  class: "fr-header__service"
}, rv = { class: "fr-header__tools" }, ov = {
  key: 0,
  class: "fr-header__tools-links"
}, sv = {
  key: 1,
  class: "fr-header__search fr-modal"
}, iv = ["aria-label"], dv = { class: "fr-container" }, uv = { class: "fr-header__menu-links" }, cv = {
  key: 1,
  class: "flex justify-center items-center"
}, fv = { class: "fr-header__menu fr-modal" }, pv = {
  key: 0,
  class: "fr-container"
}, vv = /* @__PURE__ */ L({
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
  emits: ["update:modelValue", "search", "language-select"],
  setup(t, { emit: e }) {
    const a = t, n = e, l = Le(a, "languageSelector"), r = O(!1), o = O(!1), i = O(!1), d = () => {
      var v;
      i.value = !1, r.value = !1, o.value = !1, (v = document.getElementById("button-menu")) == null || v.focus();
    }, f = (v) => {
      v.key === "Escape" && d();
    };
    re(() => {
      document.addEventListener("keydown", f);
    }), fe(() => {
      document.removeEventListener("keydown", f);
    });
    const p = () => {
      var v;
      i.value = !0, r.value = !0, o.value = !1, (v = document.getElementById("close-button")) == null || v.focus();
    }, m = () => {
      i.value = !0, r.value = !1, o.value = !0;
    }, k = d, B = bt(), x = I(() => {
      var v;
      return !!((v = B.operator) != null && v.call(B).length) || !!a.operatorImgSrc;
    }), P = I(() => !!B.mainnav);
    return ve(Vp, () => d), (v, S) => {
      var D, C, K;
      const _ = se("RouterLink");
      return s(), c("header", qp, [
        u("div", Hp, [
          u("div", Kp, [
            u("div", zp, [
              u("div", Qp, [
                u("div", Gp, [
                  u("div", Wp, [
                    X(_, {
                      to: v.homeTo,
                      title: `${v.homeLabel} - ${v.serviceTitle}`
                    }, {
                      default: W(() => [
                        X(M(Se), {
                          "logo-text": v.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  x.value ? (s(), c("div", Up, [
                    A(v.$slots, "operator", {}, () => [
                      v.operatorImgSrc ? (s(), c("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: v.operatorImgSrc,
                        alt: v.operatorImgAlt,
                        style: ue(v.operatorImgStyle)
                      }, null, 12, Xp)) : h("", !0)
                    ])
                  ])) : h("", !0),
                  v.showSearch || P.value || (D = v.quickLinks) != null && D.length ? (s(), c("div", Yp, [
                    v.showSearch ? (s(), c("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": v.showSearchLabel,
                      title: v.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: S[0] || (S[0] = G((g) => m(), ["prevent", "stop"]))
                    }, null, 8, Zp)) : h("", !0),
                    P.value || (C = v.quickLinks) != null && C.length ? (s(), c("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": v.menuLabel,
                      title: v.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: S[1] || (S[1] = G((g) => p(), ["prevent", "stop"]))
                    }, null, 8, Jp)) : h("", !0)
                  ])) : h("", !0)
                ]),
                v.serviceTitle ? (s(), c("div", ev, [
                  X(_, H({
                    to: v.homeTo,
                    title: `${v.homeLabel} - ${v.serviceTitle}`
                  }, v.$attrs), {
                    default: W(() => [
                      u("p", tv, [
                        V(b(v.serviceTitle) + " ", 1),
                        v.showBeta ? (s(), c("span", av, " BETA ")) : h("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  v.serviceDescription ? (s(), c("p", lv, b(v.serviceDescription), 1)) : h("", !0)
                ])) : h("", !0),
                !v.serviceTitle && v.showBeta ? (s(), c("div", nv, S[9] || (S[9] = [
                  u("p", { class: "fr-header__service-title" }, [
                    u("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : h("", !0)
              ]),
              u("div", rv, [
                (K = v.quickLinks) != null && K.length || l.value ? (s(), c("div", ov, [
                  r.value ? h("", !0) : (s(), N(mt, {
                    key: 0,
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel
                  }, {
                    default: W(() => [
                      A(v.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  l.value ? (s(), N(M(Ee), H({ key: 1 }, l.value, {
                    onSelect: S[2] || (S[2] = (g) => n("language-select", g))
                  }), null, 16)) : h("", !0)
                ])) : h("", !0),
                v.showSearch ? (s(), c("div", sv, [
                  X(M(Ae), {
                    "searchbar-id": v.searchbarId,
                    label: v.searchLabel,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": S[3] || (S[3] = (g) => n("update:modelValue", g)),
                    onSearch: S[4] || (S[4] = (g) => n("search", g))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ]),
            v.showSearch || P.value || v.quickLinks && v.quickLinks.length || l.value ? (s(), c("div", {
              key: 0,
              id: "header-navigation",
              class: $(["fr-header__menu fr-modal", { "fr-modal--opened": i.value }]),
              "aria-label": v.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              u("div", dv, [
                u("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: S[5] || (S[5] = G((g) => d(), ["prevent", "stop"]))
                }, b(v.closeMenuModalLabel), 1),
                u("div", uv, [
                  l.value ? (s(), N(M(Ee), H({ key: 0 }, l.value, {
                    onSelect: S[6] || (S[6] = (g) => l.value.currentLanguage = g.codeIso)
                  }), null, 16)) : h("", !0),
                  r.value ? (s(), N(mt, {
                    key: 1,
                    role: "navigation",
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel,
                    onLinkClick: M(k)
                  }, {
                    default: W(() => [
                      A(v.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : h("", !0)
                ]),
                i.value ? A(v.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : h("", !0),
                o.value ? (s(), c("div", cv, [
                  X(M(Ae), {
                    "searchbar-id": v.searchbarId,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    "onUpdate:modelValue": S[7] || (S[7] = (g) => n("update:modelValue", g)),
                    onSearch: S[8] || (S[8] = (g) => n("search", g))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ], 10, iv)) : h("", !0),
            A(v.$slots, "default")
          ])
        ]),
        u("div", fv, [
          P.value && !i.value ? (s(), c("div", pv, [
            A(v.$slots, "mainnav", { hidemodal: d })
          ])) : h("", !0)
        ])
      ]);
    };
  }
}), mv = { class: "fr-table" }, gv = { class: "fr-table__wrapper" }, bv = { class: "fr-table__container" }, hv = { class: "fr-table__content" }, yv = ["id"], kv = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, wv = { class: "fr-checkbox-group fr-checkbox-group--sm" }, _v = ["id", "checked"], Iv = ["for"], Dv = ["tabindex", "onClick", "onKeydown"], xv = { key: 0 }, Cv = { key: 1 }, Bv = ["data-row-key"], Tv = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Sv = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ev = ["id", "value"], Av = ["for"], Lv = ["onKeydown"], Mv = { class: "flex gap-2 items-center" }, Fv = ["selected"], Pv = ["value", "selected"], $v = { class: "flex ml-1" }, Rv = { class: "self-center" }, Nv = /* @__PURE__ */ L({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ be({
    id: { default: () => Ze("table") },
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
  emits: /* @__PURE__ */ be(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(t, { emit: e }) {
    const a = t, n = e, l = ie(t, "selection"), r = ie(t, "rowsPerPage"), o = ie(t, "currentPage"), i = I(() => Math.ceil(a.rows.length / r.value)), d = I(() => a.pages ?? Array.from({ length: i.value }).map((g, E) => ({ label: `${E + 1}`, title: `Page ${E + 1}`, href: `#${E + 1}` }))), f = I(() => o.value * r.value), p = I(() => (o.value + 1) * r.value);
    function m(g, E) {
      const y = k.value ?? a.sorted;
      return (g[y] ?? g) < (E[y] ?? E) ? -1 : (g[y] ?? g) > (E[y] ?? E) ? 1 : 0;
    }
    const k = ie(t, "sortedBy"), B = ie(t, "sortedDesc");
    function x(g) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(g))) {
        if (k.value === g) {
          if (B.value) {
            k.value = void 0, B.value = !1;
            return;
          }
          B.value = !0;
          return;
        }
        B.value = !1, k.value = g;
      }
    }
    const P = I(() => {
      const g = k.value ? a.rows.slice().sort(a.sortFn ?? m) : a.rows.slice();
      return B.value && g.reverse(), g;
    }), v = I(() => {
      const g = a.headersRow.map((y) => typeof y != "object" ? y : y.key), E = P.value.map((y) => Array.isArray(y) ? y : g.map((U) => y));
      return a.pagination ? E.slice(f.value, p.value) : E;
    });
    function S(g) {
      if (g) {
        const E = a.headersRow.findIndex((y) => y.key ?? y);
        l.value = v.value.map((y) => y[E]);
      }
      l.value.length = 0;
    }
    const _ = O(!1);
    function D() {
      _.value = l.value.length === v.value.length;
    }
    function C() {
      n("update:current-page", 0), _.value = !1, l.value.length = 0;
    }
    function K(g) {
      navigator.clipboard.writeText(g);
    }
    return (g, E) => (s(), c("div", mv, [
      u("div", gv, [
        u("div", bv, [
          u("div", hv, [
            u("table", { id: g.id }, [
              u("caption", null, b(g.title), 1),
              u("thead", null, [
                u("tr", null, [
                  g.selectableRows ? (s(), c("th", kv, [
                    u("div", wv, [
                      u("input", {
                        id: `table-select--${g.id}-all`,
                        checked: _.value,
                        type: "checkbox",
                        onInput: E[0] || (E[0] = (y) => S(y.target.checked))
                      }, null, 40, _v),
                      u("label", {
                        class: "fr-label",
                        for: `table-select--${g.id}-all`
                      }, " Sélectionner tout ", 8, Iv)
                    ])
                  ])) : h("", !0),
                  (s(!0), c(q, null, Q(g.headersRow, (y, U) => (s(), c("th", H({
                    key: typeof y == "object" ? y.key : y,
                    scope: "col",
                    ref_for: !0
                  }, typeof y == "object" && y.headerAttrs, {
                    tabindex: g.sortableRows ? 0 : void 0,
                    onClick: (w) => x(y.key ?? (Array.isArray(g.rows[0]) ? U : y)),
                    onKeydown: [
                      Y((w) => x(y.key ?? y), ["enter"]),
                      Y((w) => x(y.key ?? y), ["space"])
                    ]
                  }), [
                    u("div", {
                      class: $({ "sortable-header": g.sortableRows === !0 || Array.isArray(g.sortableRows) && g.sortableRows.includes(y.key ?? y) })
                    }, [
                      A(g.$slots, "header", H({ ref_for: !0 }, typeof y == "object" ? y : { key: y, label: y }), () => [
                        V(b(typeof y == "object" ? y.label : y), 1)
                      ], !0),
                      k.value !== (y.key ?? y) && (g.sortableRows === !0 || Array.isArray(g.sortableRows) && g.sortableRows.includes(y.key ?? y)) ? (s(), c("span", xv, [
                        X(M(ae), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : k.value === (y.key ?? y) ? (s(), c("span", Cv, [
                        X(M(ae), {
                          name: B.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : h("", !0)
                    ], 2)
                  ], 16, Dv))), 128))
                ])
              ]),
              u("tbody", null, [
                (s(!0), c(q, null, Q(v.value, (y, U) => (s(), c("tr", {
                  key: `row-${U}`,
                  "data-row-key": U + 1
                }, [
                  g.selectableRows ? (s(), c("th", Tv, [
                    u("div", Sv, [
                      pe(u("input", {
                        id: `row-select-${g.id}-${U}`,
                        "onUpdate:modelValue": E[1] || (E[1] = (w) => l.value = w),
                        value: g.rows[U][g.rowKey] ?? `row-${U}`,
                        type: "checkbox",
                        onChange: E[2] || (E[2] = (w) => D())
                      }, null, 40, Ev), [
                        [ze, l.value]
                      ]),
                      u("label", {
                        class: "fr-label",
                        for: `row-select-${g.id}-${U}`
                      }, " Sélectionner la ligne " + b(U + 1), 9, Av)
                    ])
                  ])) : h("", !0),
                  (s(!0), c(q, null, Q(y, (w, T) => (s(), c("td", {
                    key: typeof w == "object" ? w[g.rowKey] : w,
                    tabindex: "0",
                    onKeydown: [
                      Y(G((j) => K(typeof w == "object" ? w[g.rowKey] : w), ["ctrl"]), ["c"]),
                      Y(G((j) => K(typeof w == "object" ? w[g.rowKey] : w), ["meta"]), ["c"])
                    ]
                  }, [
                    A(g.$slots, "cell", H({ ref_for: !0 }, {
                      colKey: typeof g.headersRow[T] == "object" ? g.headersRow[T].key : g.headersRow[T],
                      cell: w
                    }), () => [
                      V(b(typeof w == "object" ? w[g.rowKey] : w), 1)
                    ], !0)
                  ], 40, Lv))), 128))
                ], 8, Bv))), 128))
              ])
            ], 8, yv)
          ])
        ])
      ]),
      u("div", {
        class: $(g.bottomActionBarClass)
      }, [
        A(g.$slots, "pagination", {}, () => [
          g.pagination && !g.$slots.pagination ? (s(), c("div", {
            key: 0,
            class: $(["flex justify-between items-center", g.paginationWrapperClass])
          }, [
            u("div", Mv, [
              E[6] || (E[6] = u("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              pe(u("select", {
                id: "pagination-options",
                "onUpdate:modelValue": E[3] || (E[3] = (y) => r.value = y),
                class: "fr-select",
                onChange: E[4] || (E[4] = (y) => C())
              }, [
                u("option", {
                  value: "",
                  selected: !g.paginationOptions.includes(r.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Fv),
                (s(!0), c(q, null, Q(g.paginationOptions, (y, U) => (s(), c("option", {
                  key: U,
                  value: y,
                  selected: +y === r.value
                }, b(y), 9, Pv))), 128))
              ], 544), [
                [ht, r.value]
              ])
            ]),
            u("div", $v, [
              u("span", Rv, "Page " + b(o.value + 1) + " sur " + b(i.value), 1)
            ]),
            X(M(Tt), {
              "current-page": o.value,
              "onUpdate:currentPage": E[5] || (E[5] = (y) => o.value = y),
              pages: d.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : h("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Vv = /* @__PURE__ */ Fe(Nv, [["__scopeId", "data-v-9a183d2e"]]);
var jv = {
  install: function(t, e) {
    t.use(Af), t.component("RouterLink", Ff), t.component("DsfrFacets", ep), t.component("DsfrSelectMultiple", Sp), t.component("DsfrMenu", ip), t.component("DsfrMenuLink", cp), t.component("DsfrHeaderMenu", Np), t.component("DsfrCustomHeader", vv), t.component("DsfrCustomHeaderMenuLinks", mt), t.component("DsfrCustomDataTable", Vv);
  },
  methods: Lf
};
window && (window.DSFR = jv);
export {
  jv as default
};
//# sourceMappingURL=dsfr.es.js.map
