import { defineComponent as M, ref as j, computed as I, onMounted as ne, watch as ae, onUnmounted as ce, Comment as ll, cloneVNode as nl, h as $t, openBlock as s, createElementBlock as c, normalizeClass as P, createElementVNode as d, withModifiers as W, createTextVNode as V, toDisplayString as b, unref as $, Fragment as H, renderList as G, createVNode as X, withKeys as Y, withCtx as U, createBlock as N, resolveDynamicComponent as oe, mergeProps as K, createCommentVNode as h, mergeModels as be, useModel as ie, withDirectives as pe, vModelCheckbox as Qe, renderSlot as L, inject as _e, toRef as Me, provide as ve, resolveComponent as se, vShow as sa, useCssVars as ia, nextTick as ua, normalizeStyle as de, normalizeProps as ue, guardReactiveProps as gt, useAttrs as ol, useSlots as bt, hasInjectionContext as rl, reactive as sl, Teleport as il, vModelSelect as ht, onBeforeUnmount as ul, Transition as dl } from "vue";
const yt = Symbol("accordions"), kt = Symbol("header"), Ge = Symbol("tabs"), me = () => {
  const t = j(), e = j(!1), a = j(!1), n = () => {
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
}, cl = "abcdefghijklmnopqrstuvwyz0123456789", Ft = cl.repeat(10), fl = () => {
  const t = Math.floor(Math.random() * Ft.length);
  return Ft[t];
}, pl = (t) => Array.from({ length: t }).map(fl).join(""), J = (t = "", e = "") => (t ? `${t}-` : "") + pl(5) + (e ? `-${e}` : ""), vl = { class: "fr-accordion" }, ml = ["aria-expanded", "aria-controls"], gl = ["id"], bl = /* @__PURE__ */ M({
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
      doExpand: o,
      onTransitionEnd: r
    } = me(), i = j(), u = _e(yt), { isActive: f, expand: p } = (u == null ? void 0 : u(Me(() => e.title))) ?? { isActive: i, expand: () => i.value = !i.value };
    return ne(() => {
      f.value && o(!0);
    }), ae(f, (m, w) => {
      m !== w && o(m);
    }), (m, w) => (s(), c("section", vl, [
      (s(), N(oe(m.titleTag), { class: "fr-accordion__title" }, {
        default: U(() => [
          d("button", {
            class: "fr-accordion__btn",
            "aria-expanded": $(f),
            "aria-controls": m.id,
            type: "button",
            onClick: w[0] || (w[0] = (B) => $(p)())
          }, [
            L(m.$slots, "title", {}, () => [
              V(b(m.title), 1)
            ])
          ], 8, ml)
        ]),
        _: 3
      })),
      d("div", {
        id: m.id,
        ref_key: "collapse",
        ref: a,
        class: P(["fr-collapse", {
          "fr-collapse--expanded": $(l),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": $(n)
        }]),
        onTransitionend: w[1] || (w[1] = (B) => $(r)($(f)))
      }, [
        L(m.$slots, "default")
      ], 42, gl)
    ]));
  }
}), hl = { class: "fr-accordions-group" }, yl = /* @__PURE__ */ M({
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
    }), o = j(/* @__PURE__ */ new Map()), r = j(0);
    return ve(yt, (i) => {
      const u = r.value++;
      o.value.set(u, i.value);
      const f = I(() => u === l.value);
      ae(i, () => {
        o.value.set(u, i.value);
      });
      function p() {
        if (l.value === u) {
          l.value = -1;
          return;
        }
        l.value = u;
      }
      return ce(() => {
        o.value.delete(u);
      }), { isActive: f, expand: p };
    }), (i, u) => (s(), c("div", hl, [
      L(i.$slots, "default")
    ]));
  }
}), kl = ["id", "role"], wl = ["title", "aria-label"], _l = /* @__PURE__ */ M({
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
    const a = t, n = e, l = () => n("close"), o = I(
      () => [
        `fr-alert--${a.type}`,
        {
          "fr-alert--sm": a.small
        }
      ]
    );
    return (r, i) => r.closed ? h("", !0) : (s(), c("div", {
      key: 0,
      id: r.id,
      class: P(["fr-alert", o.value]),
      role: r.alert ? "alert" : void 0
    }, [
      r.small ? h("", !0) : (s(), N(oe(r.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: U(() => [
          V(b(r.title), 1)
        ]),
        _: 1
      })),
      L(r.$slots, "default", {}, () => [
        V(b(r.description), 1)
      ]),
      r.closeable ? (s(), c("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: r.closeButtonLabel,
        "aria-label": r.closeButtonLabel,
        onClick: l
      }, null, 8, wl)) : h("", !0)
    ], 10, kl));
  }
}), Il = /* @__PURE__ */ M({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(t) {
    return (e, a) => (s(), c("a", {
      class: P(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, b(e.label), 3));
  }
}), Dl = ["title"], da = /* @__PURE__ */ M({
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
      class: P(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      d("span", {
        class: P(e.ellipsis ? "fr-ellipsis" : "")
      }, b(e.label), 3)
    ], 10, Dl));
  }
}), xl = ["aria-label"], Cl = ["aria-expanded", "aria-controls"], Bl = ["id"], Tl = { class: "fr-breadcrumb__list" }, El = ["aria-current"], Sl = /* @__PURE__ */ M({
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
      onTransitionEnd: o
    } = me(), r = j(!1);
    return ae(r, (i, u) => {
      i !== u && l(i);
    }), (i, u) => {
      const f = se("RouterLink");
      return s(), c("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": i.navigationLabel
      }, [
        pe(d("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": r.value,
          "aria-controls": i.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => r.value = !r.value)
        }, b(i.showBreadcrumbLabel), 9, Cl), [
          [sa, !r.value]
        ]),
        d("div", {
          id: i.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: P(["fr-collapse", {
            "fr-collapse--expanded": $(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": $(a)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => $(o)(r.value))
        }, [
          d("ol", Tl, [
            (s(!0), c(H, null, G(i.links, (p, m) => (s(), c("li", {
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
                default: U(() => [
                  V(b(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : h("", !0),
              p.to ? h("", !0) : (s(), c("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === i.links.length - 1 ? "page" : void 0
              }, b(p.text), 9, El))
            ]))), 128))
          ])
        ], 42, Bl)
      ], 8, xl);
    };
  }
}), Ce = /^[a-z0-9]+(-[a-z0-9]+)*$/, We = (t, e, a, n = "") => {
  const l = t.split(":");
  if (t.slice(0, 1) === "@") {
    if (l.length < 2 || l.length > 3)
      return null;
    n = l.shift().slice(1);
  }
  if (l.length > 3 || !l.length)
    return null;
  if (l.length > 1) {
    const i = l.pop(), u = l.pop(), f = {
      // Allow provider without '@': "provider:prefix:name"
      provider: l.length > 0 ? l[0] : n,
      prefix: u,
      name: i
    };
    return e && !Ve(f) ? null : f;
  }
  const o = l[0], r = o.split("-");
  if (r.length > 1) {
    const i = {
      provider: n,
      prefix: r.shift(),
      name: r.join("-")
    };
    return e && !Ve(i) ? null : i;
  }
  if (a && n === "") {
    const i = {
      provider: n,
      prefix: "",
      name: o
    };
    return e && !Ve(i, a) ? null : i;
  }
  return null;
}, Ve = (t, e) => t ? !!((t.provider === "" || t.provider.match(Ce)) && (e && t.prefix === "" || t.prefix.match(Ce)) && t.name.match(Ce)) : !1, ca = Object.freeze(
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
function Ll(t, e) {
  const a = {};
  !t.hFlip != !e.hFlip && (a.hFlip = !0), !t.vFlip != !e.vFlip && (a.vFlip = !0);
  const n = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return n && (a.rotate = n), a;
}
function Pt(t, e) {
  const a = Ll(t, e);
  for (const n in nt)
    n in Oe ? n in t && !(n in a) && (a[n] = Oe[n]) : n in e ? a[n] = e[n] : n in t && (a[n] = t[n]);
  return a;
}
function Al(t, e) {
  const a = t.icons, n = t.aliases || /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  function o(r) {
    if (a[r])
      return l[r] = [];
    if (!(r in l)) {
      l[r] = null;
      const i = n[r] && n[r].parent, u = i && o(i);
      u && (l[r] = [i].concat(u));
    }
    return l[r];
  }
  return Object.keys(a).concat(Object.keys(n)).forEach(o), l;
}
function Ml(t, e, a) {
  const n = t.icons, l = t.aliases || /* @__PURE__ */ Object.create(null);
  let o = {};
  function r(i) {
    o = Pt(
      n[i] || l[i],
      o
    );
  }
  return r(e), a.forEach(r), Pt(t, o);
}
function fa(t, e) {
  const a = [];
  if (typeof t != "object" || typeof t.icons != "object")
    return a;
  t.not_found instanceof Array && t.not_found.forEach((l) => {
    e(l, null), a.push(l);
  });
  const n = Al(t);
  for (const l in n) {
    const o = n[l];
    o && (e(l, Ml(t, l, o)), a.push(l));
  }
  return a;
}
const $l = {
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
  if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !tt(t, $l))
    return null;
  const a = e.icons;
  for (const l in a) {
    const o = a[l];
    if (!l.match(Ce) || typeof o.body != "string" || !tt(
      o,
      nt
    ))
      return null;
  }
  const n = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const l in n) {
    const o = n[l], r = o.parent;
    if (!l.match(Ce) || typeof r != "string" || !a[r] && !n[r] || !tt(
      o,
      nt
    ))
      return null;
  }
  return e;
}
const Rt = /* @__PURE__ */ Object.create(null);
function Fl(t, e) {
  return {
    provider: t,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function he(t, e) {
  const a = Rt[t] || (Rt[t] = /* @__PURE__ */ Object.create(null));
  return a[e] || (a[e] = Fl(t, e));
}
function wt(t, e) {
  return pa(e) ? fa(e, (a, n) => {
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
function va(t) {
  return typeof t == "boolean" && (Te = t), Te;
}
function Rl(t) {
  const e = typeof t == "string" ? We(t, !0, Te) : t;
  if (e) {
    const a = he(e.provider, e.prefix), n = e.name;
    return a.icons[n] || (a.missing.has(n) ? null : void 0);
  }
}
function Nl(t, e) {
  const a = We(t, !0, Te);
  if (!a)
    return !1;
  const n = he(a.provider, a.prefix);
  return Pl(n, a.name, e);
}
function Vl(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), Te && !e && !t.prefix) {
    let l = !1;
    return pa(t) && (t.prefix = "", fa(t, (o, r) => {
      r && Nl(o, r) && (l = !0);
    })), l;
  }
  const a = t.prefix;
  if (!Ve({
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
  ...Oe
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
  let o = n.shift(), r = Ol.test(o);
  for (; ; ) {
    if (r) {
      const i = parseFloat(o);
      isNaN(i) ? l.push(o) : l.push(Math.ceil(i * e * a) / a);
    } else
      l.push(o);
    if (o = n.shift(), o === void 0)
      return l.join("");
    r = !r;
  }
}
function Hl(t, e = "defs") {
  let a = "";
  const n = t.indexOf("<" + e);
  for (; n >= 0; ) {
    const l = t.indexOf(">", n), o = t.indexOf("</" + e);
    if (l === -1 || o === -1)
      break;
    const r = t.indexOf(">", o);
    if (r === -1)
      break;
    a += t.slice(l + 1, o).trim(), t = t.slice(0, n).trim() + t.slice(r + 1);
  }
  return {
    defs: a,
    content: t
  };
}
function ql(t, e) {
  return t ? "<defs>" + t + "</defs>" + e : e;
}
function Kl(t, e, a) {
  const n = Hl(t);
  return ql(n.defs, e + n.content + a);
}
const zl = (t) => t === "unset" || t === "undefined" || t === "none";
function Ql(t, e) {
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
  let o = a.body;
  [a, n].forEach((F) => {
    const v = [], T = F.hFlip, y = F.vFlip;
    let D = F.rotate;
    T ? y ? D += 2 : (v.push(
      "translate(" + (l.width + l.left).toString() + " " + (0 - l.top).toString() + ")"
    ), v.push("scale(-1 1)"), l.top = l.left = 0) : y && (v.push(
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
    D % 2 === 1 && (l.left !== l.top && (C = l.left, l.left = l.top, l.top = C), l.width !== l.height && (C = l.width, l.width = l.height, l.height = C)), v.length && (o = Kl(
      o,
      '<g transform="' + v.join(" ") + '">',
      "</g>"
    ));
  });
  const r = n.width, i = n.height, u = l.width, f = l.height;
  let p, m;
  r === null ? (m = i === null ? "1em" : i === "auto" ? f : i, p = Nt(m, u / f)) : (p = r === "auto" ? u : r, m = i === null ? Nt(p, f / u) : i === "auto" ? f : i);
  const w = {}, B = (F, v) => {
    zl(v) || (w[F] = v.toString());
  };
  B("width", p), B("height", m);
  const x = [l.left, l.top, u, f];
  return w.viewBox = x.join(" "), {
    attributes: w,
    viewBox: x,
    body: o
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
  return a.forEach((o) => {
    const r = typeof e == "function" ? e(o) : e + (Ul++).toString(), i = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + i + ')([")]|\\.[a-z])', "g"),
      "$1" + r + l + "$3"
    );
  }), t = t.replace(new RegExp(l, "g"), ""), t;
}
const ot = /* @__PURE__ */ Object.create(null);
function Yl(t, e) {
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
    a.resources.forEach((r) => {
      l = Math.max(l, r.length);
    });
    const o = e + ".json?icons=";
    n = a.maxURL - l - a.path.length - o.length;
  }
  return n;
}
function tn(t) {
  return t === 404;
}
const an = (t, e, a) => {
  const n = [], l = en(t, e), o = "icons";
  let r = {
    type: o,
    provider: t,
    prefix: e,
    icons: []
  }, i = 0;
  return a.forEach((u, f) => {
    i += u.length + 1, i >= l && f > 0 && (n.push(r), r = {
      type: o,
      provider: t,
      prefix: e,
      icons: []
    }, i = u.length), r.icons.push(u);
  }), n.push(r), n;
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
      const o = e.prefix, r = e.icons.join(","), i = new URLSearchParams({
        icons: r
      });
      n += o + ".json?" + i.toString();
      break;
    }
    case "custom": {
      const o = e.uri;
      n += o.slice(0, 1) === "/" ? o.slice(1) : o;
      break;
    }
    default:
      a("abort", 400);
      return;
  }
  let l = 503;
  Vt(t + n).then((o) => {
    const r = o.status;
    if (r !== 200) {
      setTimeout(() => {
        a(tn(r) ? "abort" : "next", r);
      });
      return;
    }
    return l = 501, o.json();
  }).then((o) => {
    if (typeof o != "object" || o === null) {
      setTimeout(() => {
        o === 404 ? a("abort", o) : a("next", l);
      });
      return;
    }
    setTimeout(() => {
      a("success", o);
    });
  }).catch(() => {
    a("next", l);
  });
}, on = {
  prepare: an,
  send: nn
};
function rn(t) {
  const e = {
    loaded: [],
    missing: [],
    pending: []
  }, a = /* @__PURE__ */ Object.create(null);
  t.sort((l, o) => l.provider !== o.provider ? l.provider.localeCompare(o.provider) : l.prefix !== o.prefix ? l.prefix.localeCompare(o.prefix) : l.name.localeCompare(o.name));
  let n = {
    provider: "",
    prefix: "",
    name: ""
  };
  return t.forEach((l) => {
    if (n.name === l.name && n.prefix === l.prefix && n.provider === l.provider)
      return;
    n = l;
    const o = l.provider, r = l.prefix, i = l.name, u = a[o] || (a[o] = /* @__PURE__ */ Object.create(null)), f = u[r] || (u[r] = he(o, r));
    let p;
    i in f.icons ? p = e.loaded : r === "" || f.missing.has(i) ? p = e.missing : p = e.pending;
    const m = {
      provider: o,
      prefix: r,
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
    e.forEach((o) => {
      const r = o.icons, i = r.pending.length;
      r.pending = r.pending.filter((u) => {
        if (u.prefix !== l)
          return !0;
        const f = u.name;
        if (t.icons[f])
          r.loaded.push({
            provider: n,
            prefix: l,
            name: f
          });
        else if (t.missing.has(f))
          r.missing.push({
            provider: n,
            prefix: l,
            name: f
          });
        else
          return a = !0, !0;
        return !1;
      }), r.pending.length !== i && (a || ba([t], o.id), o.callback(
        r.loaded.slice(0),
        r.missing.slice(0),
        r.pending.slice(0),
        o.abort
      ));
    });
  }));
}
let un = 0;
function dn(t, e, a) {
  const n = un++, l = ba.bind(null, a, n);
  if (!e.pending.length)
    return l;
  const o = {
    id: n,
    icons: e,
    callback: t,
    abort: l
  };
  return a.forEach((r) => {
    (r.loaderCallbacks || (r.loaderCallbacks = [])).push(o);
  }), l;
}
function cn(t, e = !0, a = !1) {
  const n = [];
  return t.forEach((l) => {
    const o = typeof l == "string" ? We(l, e, a) : l;
    o && n.push(o);
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
  const l = t.resources.length, o = t.random ? Math.floor(Math.random() * l) : t.index;
  let r;
  if (t.random) {
    let g = t.resources.slice(0);
    for (r = []; g.length > 1; ) {
      const S = Math.floor(Math.random() * g.length);
      r.push(g[S]), g = g.slice(0, S).concat(g.slice(S + 1));
    }
    r = r.concat(g);
  } else
    r = t.resources.slice(o).concat(t.resources.slice(0, o));
  const i = Date.now();
  let u = "pending", f = 0, p, m = null, w = [], B = [];
  typeof n == "function" && B.push(n);
  function x() {
    m && (clearTimeout(m), m = null);
  }
  function F() {
    u === "pending" && (u = "aborted"), x(), w.forEach((g) => {
      g.status === "pending" && (g.status = "aborted");
    }), w = [];
  }
  function v(g, S) {
    S && (B = []), typeof g == "function" && B.push(g);
  }
  function T() {
    return {
      startTime: i,
      payload: e,
      status: u,
      queriesSent: f,
      queriesPending: w.length,
      subscribe: v,
      abort: F
    };
  }
  function y() {
    u = "failed", B.forEach((g) => {
      g(void 0, p);
    });
  }
  function D() {
    w.forEach((g) => {
      g.status === "pending" && (g.status = "aborted");
    }), w = [];
  }
  function C(g, S, k) {
    const Q = S !== "success";
    switch (w = w.filter((_) => _ !== g), u) {
      case "pending":
        break;
      case "failed":
        if (Q || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (S === "abort") {
      p = k, y();
      return;
    }
    if (Q) {
      p = k, w.length || (r.length ? q() : y());
      return;
    }
    if (x(), D(), !t.random) {
      const _ = t.resources.indexOf(g.resource);
      _ !== -1 && _ !== t.index && (t.index = _);
    }
    u = "completed", B.forEach((_) => {
      _(k);
    });
  }
  function q() {
    if (u !== "pending")
      return;
    x();
    const g = r.shift();
    if (g === void 0) {
      if (w.length) {
        m = setTimeout(() => {
          x(), u === "pending" && (D(), y());
        }, t.timeout);
        return;
      }
      y();
      return;
    }
    const S = {
      status: "pending",
      resource: g,
      callback: (k, Q) => {
        C(S, k, Q);
      }
    };
    w.push(S), f++, m = setTimeout(q, t.rotate), a(g, e, S.callback);
  }
  return setTimeout(q), T;
}
function ha(t) {
  const e = {
    ...fn,
    ...t
  };
  let a = [];
  function n() {
    a = a.filter((r) => r().status === "pending");
  }
  function l(r, i, u) {
    const f = pn(
      e,
      r,
      i,
      (p, m) => {
        n(), u && u(p, m);
      }
    );
    return a.push(f), f;
  }
  function o(r) {
    return a.find((i) => r(i)) || null;
  }
  return {
    query: l,
    find: o,
    setIndex: (r) => {
      e.index = r;
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
    const o = rt(t);
    if (!o)
      return a(void 0, 424), jt;
    l = o.send;
    const r = vn(t);
    r && (n = r.redundancy);
  } else {
    const o = _t(t);
    if (o) {
      n = ha(o);
      const r = t.resources ? t.resources[0] : "", i = rt(r);
      i && (l = i.send);
    }
  }
  return !n || !l ? (a(void 0, 424), jt) : n.query(e, l, a)().abort;
}
const Ot = "iconify2", Ee = "iconify", ya = Ee + "-count", Ht = Ee + "-version", ka = 36e5, gn = 168, bn = 50;
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
function qt(t, e) {
  try {
    t.removeItem(e);
  } catch {
  }
}
function ut(t, e) {
  return xt(t, ya, e.toString());
}
function dt(t) {
  return parseInt(it(t, ya)) || 0;
}
const Xe = {
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
  const n = it(a, Ht);
  if (n !== Ot) {
    if (n) {
      const i = dt(a);
      for (let u = 0; u < i; u++)
        qt(a, Ee + u.toString());
    }
    xt(a, Ht, Ot), ut(a, 0);
    return;
  }
  const l = Math.floor(Date.now() / ka) - gn, o = (i) => {
    const u = Ee + i.toString(), f = it(a, u);
    if (typeof f == "string") {
      try {
        const p = JSON.parse(f);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > l && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        e(p, i))
          return !0;
      } catch {
      }
      qt(a, u);
    }
  };
  let r = dt(a);
  for (let i = r - 1; i >= 0; i--)
    o(i) || (i === r - 1 ? (r--, ut(a, r)) : wa[t].add(i));
}
function Da() {
  if (!Ct) {
    hn(!0);
    for (const t in Xe)
      Ia(t, (e) => {
        const a = e.data, n = e.provider, l = a.prefix, o = he(
          n,
          l
        );
        if (!wt(o, a).length)
          return !1;
        const r = a.lastModified || -1;
        return o.lastModifiedCached = o.lastModifiedCached ? Math.min(o.lastModifiedCached, r) : r, !0;
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
    for (const n in Xe)
      Ia(n, (l) => {
        const o = l.data;
        return l.provider !== t.provider || o.prefix !== t.prefix || o.lastModified === e;
      });
  return !0;
}
function kn(t, e) {
  Ct || Da();
  function a(n) {
    let l;
    if (!Xe[n] || !(l = _a(n)))
      return;
    const o = wa[n];
    let r;
    if (o.size)
      o.delete(r = Array.from(o).shift());
    else if (r = dt(l), r >= bn || !ut(l, r + 1))
      return;
    const i = {
      cached: Math.floor(Date.now() / ka),
      provider: t.provider,
      data: e
    };
    return xt(
      l,
      Ee + r.toString(),
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
    let o;
    !l || !(o = rt(a)) || o.prepare(a, n, l).forEach((r) => {
      mn(a, r, (i) => {
        if (typeof i != "object")
          r.icons.forEach((u) => {
            t.missing.add(u);
          });
        else
          try {
            const u = wt(
              t,
              i
            );
            if (!u.length)
              return;
            const f = t.pendingIcons;
            f && u.forEach((p) => {
              f.delete(p);
            }), kn(t, i);
          } catch (u) {
            console.error(u);
          }
        wn(t);
      });
    });
  }));
}
const In = (t, e) => {
  const a = cn(t, !0, va()), n = rn(a);
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
  const l = /* @__PURE__ */ Object.create(null), o = [];
  let r, i;
  return n.pending.forEach((u) => {
    const { provider: f, prefix: p } = u;
    if (p === i && f === r)
      return;
    r = f, i = p, o.push(he(f, p));
    const m = l[f] || (l[f] = /* @__PURE__ */ Object.create(null));
    m[p] || (m[p] = []);
  }), n.pending.forEach((u) => {
    const { provider: f, prefix: p, name: m } = u, w = he(f, p), B = w.pendingIcons || (w.pendingIcons = /* @__PURE__ */ new Set());
    B.has(m) || (B.add(m), l[f][p].push(m));
  }), o.forEach((u) => {
    const { provider: f, prefix: p } = u;
    l[f][p].length && _n(u, l[f][p]);
  }), e ? dn(e, n, o) : Kt;
};
function Dn(t, e) {
  const a = {
    ...t
  };
  for (const n in e) {
    const l = e[n], o = typeof l;
    n in ma ? (l === null || l && (o === "string" || o === "number")) && (a[n] = l) : o === typeof a[n] && (a[n] = n === "rotate" ? l % 4 : l);
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
      let o = parseFloat(t.slice(0, t.length - a.length));
      return isNaN(o) ? 0 : (o = o / l, o % 1 === 0 ? n(o) : 0);
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
function En(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Sn(t) {
  return "data:image/svg+xml," + En(t);
}
function Ln(t) {
  return 'url("' + Sn(t) + '")';
}
const zt = {
  ...ga,
  inline: !1
}, An = {
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
const je = {};
["horizontal", "vertical"].forEach((t) => {
  const e = t.slice(0, 1) + "Flip";
  je[t + "-flip"] = e, je[t.slice(0, 1) + "-flip"] = e, je[t + "Flip"] = e;
});
function Wt(t) {
  return t + (t.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ut = (t, e) => {
  const a = Dn(zt, e), n = { ...An }, l = e.mode || "svg", o = {}, r = e.style, i = typeof r == "object" && !(r instanceof Array) ? r : {};
  for (let F in e) {
    const v = e[F];
    if (v !== void 0)
      switch (F) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          a[F] = v === !0 || v === "true" || v === 1;
          break;
        case "flip":
          typeof v == "string" && Cn(a, v);
          break;
        case "color":
          o.color = v;
          break;
        case "rotate":
          typeof v == "string" ? a[F] = Bn(v) : typeof v == "number" && (a[F] = v);
          break;
        case "ariaHidden":
        case "aria-hidden":
          v !== !0 && v !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const T = je[F];
          T ? (v === !0 || v === "true" || v === 1) && (a[T] = !0) : zt[F] === void 0 && (n[F] = v);
        }
      }
  }
  const u = Ql(t, a), f = u.attributes;
  if (a.inline && (o.verticalAlign = "-0.125em"), l === "svg") {
    n.style = {
      ...o,
      ...i
    }, Object.assign(n, f);
    let F = 0, v = e.id;
    return typeof v == "string" && (v = v.replace(/-/g, "_")), n.innerHTML = Xl(u.body, v ? () => v + "ID" + F++ : "iconifyVue"), $t("svg", n);
  }
  const { body: p, width: m, height: w } = t, B = l === "mask" || (l === "bg" ? !1 : p.indexOf("currentColor") !== -1), x = Tn(p, {
    ...f,
    width: m + "",
    height: w + ""
  });
  return n.style = {
    ...o,
    "--svg": Ln(x),
    width: Wt(f.width),
    height: Wt(f.height),
    ...Mn,
    ...B ? ct : xa,
    ...i
  }, $t("span", n);
};
va(!0);
Yl("", on);
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
const $n = {
  ...Ue,
  body: ""
}, Fn = M({
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
      return Ut($n, t);
    let a = t;
    return e.classes && (a = {
      ...t,
      class: (typeof t.class == "string" ? t.class + " " : "") + e.classes.join(" ")
    }), Ut({
      ...Ue,
      ...e.data
    }, a);
  }
}), Pn = /* @__PURE__ */ M({
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
    ia((u) => ({
      "98d5b8bc": i.value
    }));
    const e = t, a = j(null), n = I(() => `${+e.scale * 1.2}rem`), l = I(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    ae(() => e.title, o);
    async function o() {
      var u, f, p, m;
      if (!((u = a.value) != null && u.$el))
        return;
      const w = !!((f = a.value) == null ? void 0 : f.$el).querySelector("title"), B = document.createElement("title");
      if (!e.title) {
        B.remove();
        return;
      }
      B.innerHTML = e.title, await ua(), w || (m = ((p = a.value) == null ? void 0 : p.$el).firstChild) == null || m.before(B);
    }
    ne(o);
    const r = I(() => {
      var u;
      return (u = e.name) != null && u.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), i = I(() => e.color ?? e.fill ?? "inherit");
    return (u, f) => (s(), N($(Fn), {
      ref_key: "icon",
      ref: a,
      icon: r.value,
      style: de({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: P(["vicon", {
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
}, le = /* @__PURE__ */ re(Pn, [["__scopeId", "data-v-33ecc4e5"]]), Rn = ["title", "disabled", "aria-disabled"], Nn = { key: 1 }, Vn = /* @__PURE__ */ M({
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
    const a = t, n = I(() => ["sm", "small"].includes(a.size)), l = I(() => ["md", "medium"].includes(a.size)), o = I(() => ["lg", "large"].includes(a.size)), r = j(null);
    e({ focus: () => {
      var p;
      (p = r.value) == null || p.focus();
    } });
    const i = I(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), u = I(() => a.iconOnly ? 1.25 : 0.8325), f = I(
      () => typeof a.icon == "string" ? { scale: u.value, name: a.icon } : { scale: u.value, ...a.icon }
    );
    return (p, m) => (s(), c("button", {
      ref_key: "btn",
      ref: r,
      class: P(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": n.value,
        "fr-btn--md": l.value,
        "fr-btn--lg": o.value,
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
      style: de(!i.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: m[0] || (m[0] = (w) => p.onClick ? p.onClick(w) : () => {
      })
    }, [
      p.icon && !i.value ? (s(), N(le, ue(K({ key: 0 }, f.value)), null, 16)) : h("", !0),
      p.iconOnly ? h("", !0) : (s(), c("span", Nn, [
        V(b(p.label) + " ", 1),
        L(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Rn));
  }
}), $e = /* @__PURE__ */ re(Vn, [["__scopeId", "data-v-77b13897"]]), Ye = /* @__PURE__ */ M({
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
    const e = t, a = j(null), n = I(() => ["sm", "small"].includes(e.size)), l = I(() => ["md", "medium"].includes(e.size)), o = I(() => ["lg", "large"].includes(e.size)), r = I(() => ["always", "", !0].includes(e.inlineLayoutWhen)), i = I(() => ["sm", "small"].includes(e.inlineLayoutWhen)), u = I(() => ["md", "medium"].includes(e.inlineLayoutWhen)), f = I(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = I(() => e.align === "center"), m = I(() => e.align === "right"), w = j("auto"), B = I(() => `--equisized-width: ${w.value};`), x = async () => {
      var F;
      let v = 0;
      await new Promise((T) => setTimeout(T, 100)), (F = a.value) == null || F.querySelectorAll(".fr-btn").forEach((T) => {
        const y = T, D = y.offsetWidth, C = window.getComputedStyle(y), q = +C.marginLeft.replace("px", ""), g = +C.marginRight.replace("px", "");
        y.style.width = "var(--equisized-width)";
        const S = D + q + g;
        S > v && (v = S);
      }), w.value = `${v}px`;
    };
    return ne(async () => {
      !a.value || !e.equisized || await x();
    }), (F, v) => (s(), c("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: de(B.value),
      class: P(["fr-btns-group", {
        "fr-btns-group--equisized": F.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": l.value,
        "fr-btns-group--lg": o.value,
        "fr-btns-group--inline-sm": r.value || i.value,
        "fr-btns-group--inline-md": r.value || u.value,
        "fr-btns-group--inline-lg": r.value || f.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": F.iconRight,
        "fr-btns-group--inline-reverse": F.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (s(!0), c(H, null, G(F.buttons, ({ onClick: T, ...y }, D) => (s(), c("li", { key: D }, [
        X($e, K({ ref_for: !0 }, y, { onClick: T }), null, 16, ["onClick"])
      ]))), 128)),
      L(F.$slots, "default")
    ], 6));
  }
}), jn = { class: "fr-callout__text" }, On = /* @__PURE__ */ M({
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
    return (l, o) => (s(), c("div", {
      class: P(["fr-callout", { [String(l.icon)]: a.value }])
    }, [
      l.icon && n.value ? (s(), N(le, ue(K({ key: 0 }, n.value)), null, 16)) : h("", !0),
      l.title ? (s(), N(oe(l.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: U(() => [
          V(b(l.title), 1)
        ]),
        _: 1
      })) : h("", !0),
      d("p", jn, b(l.content), 1),
      l.button ? (s(), N($e, ue(K({ key: 2 }, l.button)), null, 16)) : h("", !0),
      L(l.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Hn = /* @__PURE__ */ re(On, [["__scopeId", "data-v-a34b4ad8"]]), ft = /* @__PURE__ */ M({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = I(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = I(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, o) => (s(), c("p", {
      class: P(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
    }, [
      l.icon && !a.value ? (s(), N(le, ue(K({ key: 0 }, n.value)), null, 16)) : h("", !0),
      L(l.$slots, "default")
    ], 2));
  }
}), qn = { class: "fr-card__body" }, Kn = { class: "fr-card__content" }, zn = ["href"], Qn = { class: "fr-card__desc" }, Gn = {
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
}, eo = ["src", "alt"], to = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, ao = /* @__PURE__ */ M({
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
    const a = t, n = I(() => ["sm", "small"].includes(a.size)), l = I(() => ["lg", "large"].includes(a.size)), o = I(() => ["sm", "small"].includes(a.imgRatio)), r = I(() => ["lg", "large"].includes(a.imgRatio)), i = I(() => typeof a.link == "string" && a.link.startsWith("http")), u = j(null);
    return e({ goToTargetLink: () => {
      var f;
      ((f = u.value) == null ? void 0 : f.querySelector(".fr-card__link")).click();
    } }), (f, p) => {
      const m = se("RouterLink");
      return s(), c("div", {
        class: P(["fr-card", {
          "fr-card--horizontal": f.horizontal,
          "fr-enlarge-link": !f.noArrow,
          "fr-card--sm": n.value,
          "fr-card--lg": l.value,
          "fr-card--horizontal-tier": o.value,
          "fr-card--horizontal-half": r.value,
          "fr-card--download": f.download,
          "fr-enlarge-button": f.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        d("div", qn, [
          d("div", Kn, [
            (s(), N(oe(f.titleTag), { class: "fr-card__title" }, {
              default: U(() => [
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
                  onClick: p[0] || (p[0] = (w) => w.stopPropagation())
                }, {
                  default: U(() => [
                    V(b(f.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (s(), c(H, { key: 2 }, [
                  V(b(f.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            d("p", Qn, b(f.description), 1),
            f.$slots["start-details"] || f.detail ? (s(), c("div", Gn, [
              L(f.$slots, "start-details"),
              f.detail ? (s(), N(ft, {
                key: 0,
                icon: f.detailIcon
              }, {
                default: U(() => [
                  V(b(f.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : h("", !0)
            ])) : h("", !0),
            f.$slots["end-details"] || f.endDetail ? (s(), c("div", Wn, [
              L(f.$slots, "end-details"),
              f.endDetail ? (s(), N(ft, {
                key: 0,
                icon: f.endDetailIcon
              }, {
                default: U(() => [
                  V(b(f.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : h("", !0)
            ])) : h("", !0)
          ]),
          f.buttons.length || f.linksGroup.length ? (s(), c("div", Un, [
            f.buttons.length ? (s(), N(Ye, {
              key: 0,
              buttons: f.buttons,
              "inline-layout-when": "always",
              size: f.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : h("", !0),
            f.linksGroup.length ? (s(), c("ul", Xn, [
              (s(!0), c(H, null, G(f.linksGroup, (w, B) => (s(), c("li", {
                key: `card-link-${B}`
              }, [
                w.to ? (s(), N(m, {
                  key: 0,
                  to: w.to
                }, {
                  default: U(() => [
                    V(b(w.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (s(), c("a", {
                  key: 1,
                  href: w.link || w.href,
                  class: P(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": l.value
                  }])
                }, b(w.label), 11, Yn))
              ]))), 128))
            ])) : h("", !0)
          ])) : h("", !0)
        ]),
        f.imgSrc || f.badges.length ? (s(), c("div", Zn, [
          f.imgSrc ? (s(), c("div", Jn, [
            d("img", {
              src: f.imgSrc,
              class: "fr-responsive-img",
              alt: f.altImg,
              "data-testid": "card-img"
            }, null, 8, eo)
          ])) : h("", !0),
          f.badges.length ? (s(), c("ul", to, [
            (s(!0), c(H, null, G(f.badges, (w, B) => (s(), c("li", { key: B }, [
              X(da, K({ ref_for: !0 }, w), null, 16)
            ]))), 128))
          ])) : h("", !0)
        ])) : h("", !0)
      ], 2);
    };
  }
}), lo = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], no = ["for"], oo = {
  key: 0,
  class: "required"
}, ro = {
  key: 0,
  class: "fr-hint-text"
}, so = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, Bt = /* @__PURE__ */ M({
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
    return (o, r) => (s(), c("div", {
      class: P(["fr-fieldset__element", { "fr-fieldset__element--inline": o.inline }])
    }, [
      d("div", {
        class: P(["fr-checkbox-group", {
          "fr-checkbox-group--error": o.errorMessage,
          "fr-checkbox-group--valid": !o.errorMessage && o.validMessage,
          "fr-checkbox-group--sm": o.small
        }])
      }, [
        pe(d("input", K({
          id: o.id,
          "onUpdate:modelValue": r[0] || (r[0] = (i) => l.value = i),
          name: o.name,
          type: "checkbox",
          value: o.value,
          checked: l.value === !0 || Array.isArray(l.value) && l.value.includes(o.value),
          required: o.required
        }, o.$attrs, {
          "data-testid": `input-checkbox-${o.id}`,
          "data-test": `input-checkbox-${o.id}`
        }), null, 16, lo), [
          [Qe, l.value]
        ]),
        d("label", {
          for: o.id,
          class: "fr-label"
        }, [
          L(o.$slots, "label", {}, () => [
            V(b(o.label) + " ", 1),
            L(o.$slots, "required-tip", {}, () => [
              o.required ? (s(), c("span", oo, " *")) : h("", !0)
            ])
          ]),
          o.hint ? (s(), c("span", ro, b(o.hint), 1)) : h("", !0)
        ], 8, no),
        a.value ? (s(), c("div", so, [
          d("p", {
            class: P(["fr-message--info flex items-center", n.value])
          }, b(a.value), 3)
        ])) : h("", !0)
      ], 2)
    ], 2));
  }
}), io = { class: "fr-form-group" }, uo = ["disabled", "aria-labelledby", "aria-invalid", "role"], co = ["id"], fo = {
  key: 0,
  class: "required"
}, po = ["id"], vo = /* @__PURE__ */ M({
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
    const e = t, a = I(() => e.errorMessage || e.validMessage), n = I(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = I(() => a.value ? `${e.titleId} messages-${e.titleId}` : e.titleId), o = ie(t, "modelValue");
    return (r, i) => (s(), c("div", io, [
      d("fieldset", {
        class: P(["fr-fieldset", {
          "fr-fieldset--error": r.errorMessage,
          "fr-fieldset--valid": !r.errorMessage && r.validMessage
        }]),
        disabled: r.disabled,
        "aria-labelledby": l.value,
        "aria-invalid": r.ariaInvalid,
        role: r.errorMessage || r.validMessage ? "group" : void 0
      }, [
        d("legend", {
          id: r.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          L(r.$slots, "legend", {}, () => [
            V(b(r.legend) + " ", 1),
            L(r.$slots, "required-tip", {}, () => [
              r.required ? (s(), c("span", fo, " *")) : h("", !0)
            ])
          ])
        ], 8, co),
        L(r.$slots, "default", {}, () => [
          (s(!0), c(H, null, G(r.options, (u) => (s(), N(Bt, {
            id: u.id,
            key: u.id || u.name,
            modelValue: o.value,
            "onUpdate:modelValue": i[0] || (i[0] = (f) => o.value = f),
            value: u.value,
            name: u.name,
            label: u.label,
            disabled: u.disabled,
            "aria-disabled": u.disabled,
            small: r.small,
            inline: r.inline,
            hint: u.hint
          }, null, 8, ["id", "modelValue", "value", "name", "label", "disabled", "aria-disabled", "small", "inline", "hint"]))), 128))
        ]),
        a.value ? (s(), c("div", {
          key: 0,
          id: `messages-${r.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          d("p", {
            class: P(["fr-message--info flex items-center", n.value])
          }, [
            d("span", null, b(a.value), 1)
          ], 2)
        ], 8, po)) : h("", !0)
      ], 10, uo)
    ]));
  }
}), mo = { class: "fr-consent-banner__content" }, go = { class: "fr-text--sm" }, bo = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, ho = /* @__PURE__ */ M({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = I(() => typeof e.url == "string" && e.url.startsWith("http")), n = I(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = I(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (o, r) => (s(), c(H, null, [
      d("div", mo, [
        d("p", go, [
          L(o.$slots, "default", {}, () => [
            r[4] || (r[4] = V(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (s(), N(oe(n.value), K(l.value, { "data-testid": "link" }), {
              default: U(() => r[3] || (r[3] = [
                V(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            r[5] || (r[5] = V(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      d("ul", bo, [
        d("li", null, [
          d("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: r[0] || (r[0] = W((i) => o.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        d("li", null, [
          d("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: r[1] || (r[1] = W((i) => o.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        d("li", null, [
          d("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: r[2] || (r[2] = W((i) => o.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), yo = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, ko = { class: "fr-pagination__list" }, wo = ["href", "title", "disabled", "aria-disabled"], _o = ["href", "title", "disabled", "aria-disabled"], Io = ["href", "title", "aria-current", "onClick"], Do = { key: 0 }, xo = { key: 1 }, Co = ["href", "title", "disabled", "aria-disabled"], Bo = ["href", "title", "disabled", "aria-disabled"], To = /* @__PURE__ */ M({
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
    const a = t, n = e, l = I(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), o = I(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), r = I(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, o.value + 1) : a.pages), i = (x) => n("update:current-page", x), u = (x) => i(x), f = () => u(0), p = () => u(Math.max(0, a.currentPage - 1)), m = () => u(Math.min(a.pages.length - 1, a.currentPage + 1)), w = () => u(a.pages.length - 1), B = (x) => a.pages.indexOf(x) === a.currentPage;
    return (x, F) => {
      var v, T, y, D;
      return s(), c("nav", yo, [
        d("ul", ko, [
          d("li", null, [
            d("a", {
              href: (v = x.pages[0]) == null ? void 0 : v.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: x.firstPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: F[0] || (F[0] = W((C) => f(), ["prevent"]))
            }, null, 8, wo)
          ]),
          d("li", null, [
            d("a", {
              href: (T = x.pages[Math.max(x.currentPage - 1, 0)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: x.prevPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: F[1] || (F[1] = W((C) => p(), ["prevent"]))
            }, b(x.prevPageTitle), 9, _o)
          ]),
          (s(!0), c(H, null, G(r.value, (C, q) => (s(), c("li", { key: q }, [
            d("a", {
              href: C == null ? void 0 : C.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: C.title,
              "aria-current": B(C) ? "page" : void 0,
              onClick: W((g) => u(x.pages.indexOf(C)), ["prevent"])
            }, [
              r.value.indexOf(C) === 0 && l.value > 0 ? (s(), c("span", Do, "...")) : h("", !0),
              V(" " + b(C.label) + " ", 1),
              r.value.indexOf(C) === r.value.length - 1 && o.value < x.pages.length - 1 ? (s(), c("span", xo, "...")) : h("", !0)
            ], 8, Io)
          ]))), 128)),
          d("li", null, [
            d("a", {
              href: (y = x.pages[Math.min(x.currentPage + 1, x.pages.length - 1)]) == null ? void 0 : y.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: x.nextPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: F[2] || (F[2] = W((C) => m(), ["prevent"]))
            }, b(x.nextPageTitle), 9, Co)
          ]),
          d("li", null, [
            d("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (D = x.pages.at(-1)) == null ? void 0 : D.href,
              title: x.lastPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: F[3] || (F[3] = W((C) => w(), ["prevent"]))
            }, null, 8, Bo)
          ])
        ])
      ]);
    };
  }
}), Tt = /* @__PURE__ */ re(To, [["__scopeId", "data-v-4dfa8248"]]), Eo = { class: "fr-table" }, So = { class: "fr-table__wrapper" }, Lo = { class: "fr-table__container" }, Ao = { class: "fr-table__content" }, Mo = ["id"], $o = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Fo = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Po = ["id", "checked"], Ro = ["for"], No = ["tabindex", "onClick", "onKeydown"], Vo = { key: 0 }, jo = { key: 1 }, Oo = ["data-row-key"], Ho = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, qo = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ko = ["id", "value"], zo = ["for"], Qo = ["onKeydown"], Go = { class: "flex gap-2 items-center" }, Wo = ["selected"], Uo = ["value", "selected"], Xo = { class: "flex ml-1" }, Yo = { class: "self-center" }, Zo = /* @__PURE__ */ M({
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
    const a = t, n = e, l = ie(t, "selection"), o = ie(t, "rowsPerPage"), r = ie(t, "currentPage"), i = I(() => Math.ceil(a.rows.length / o.value)), u = I(() => a.pages ?? Array.from({ length: i.value }).map((g, S) => ({ label: `${S + 1}`, title: `Page ${S + 1}`, href: `#${S + 1}` }))), f = I(() => r.value * o.value), p = I(() => (r.value + 1) * o.value);
    function m(g, S) {
      const k = a.sorted;
      return (g[k] ?? g) < (S[k] ?? S) ? -1 : (g[k] ?? g) > (S[k] ?? S) ? 1 : 0;
    }
    const w = ie(t, "sortedBy"), B = ie(t, "sortedDesc");
    function x(g) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(g))) {
        if (w.value === g) {
          if (B.value) {
            w.value = void 0, B.value = !1;
            return;
          }
          B.value = !0;
          return;
        }
        B.value = !1, w.value = g;
      }
    }
    const F = I(() => {
      const g = w.value ? a.rows.slice().sort(a.sortFn ?? m) : a.rows.slice();
      return B.value && g.reverse(), g;
    }), v = I(() => {
      const g = a.headersRow.map((k) => typeof k != "object" ? k : k.key), S = F.value.map((k) => Array.isArray(k) ? k : g.map((Q) => typeof k != "object" ? k : k[Q] ?? k));
      return a.pagination ? S.slice(f.value, p.value) : S;
    });
    function T(g) {
      if (g) {
        const S = a.headersRow.findIndex((k) => k.key ?? k);
        l.value = v.value.map((k) => k[S]);
      }
      l.value.length = 0;
    }
    const y = j(!1);
    function D() {
      y.value = l.value.length === v.value.length;
    }
    function C() {
      n("update:current-page", 0), y.value = !1, l.value.length = 0;
    }
    function q(g) {
      navigator.clipboard.writeText(g);
    }
    return (g, S) => (s(), c("div", Eo, [
      d("div", So, [
        d("div", Lo, [
          d("div", Ao, [
            d("table", { id: g.id }, [
              d("caption", null, b(g.title), 1),
              d("thead", null, [
                d("tr", null, [
                  g.selectableRows ? (s(), c("th", $o, [
                    d("div", Fo, [
                      d("input", {
                        id: `table-select--${g.id}-all`,
                        checked: y.value,
                        type: "checkbox",
                        onInput: S[0] || (S[0] = (k) => T(k.target.checked))
                      }, null, 40, Po),
                      d("label", {
                        class: "fr-label",
                        for: `table-select--${g.id}-all`
                      }, " Sélectionner tout ", 8, Ro)
                    ])
                  ])) : h("", !0),
                  (s(!0), c(H, null, G(g.headersRow, (k, Q) => (s(), c("th", K({
                    key: typeof k == "object" ? k.key : k,
                    scope: "col",
                    ref_for: !0
                  }, typeof k == "object" && k.headerAttrs, {
                    tabindex: g.sortableRows ? 0 : void 0,
                    onClick: (_) => x(k.key ?? (Array.isArray(g.rows[0]) ? Q : k)),
                    onKeydown: [
                      Y((_) => x(k.key ?? k), ["enter"]),
                      Y((_) => x(k.key ?? k), ["space"])
                    ]
                  }), [
                    d("div", {
                      class: P({ "sortable-header": g.sortableRows === !0 || Array.isArray(g.sortableRows) && g.sortableRows.includes(k.key ?? k) })
                    }, [
                      L(g.$slots, "header", K({ ref_for: !0 }, typeof k == "object" ? k : { key: k, label: k }), () => [
                        V(b(typeof k == "object" ? k.label : k), 1)
                      ], !0),
                      w.value !== (k.key ?? k) && (g.sortableRows === !0 || Array.isArray(g.sortableRows) && g.sortableRows.includes(k.key ?? k)) ? (s(), c("span", Vo, [
                        X(le, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : w.value === (k.key ?? k) ? (s(), c("span", jo, [
                        X(le, {
                          name: B.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : h("", !0)
                    ], 2)
                  ], 16, No))), 128))
                ])
              ]),
              d("tbody", null, [
                (s(!0), c(H, null, G(v.value, (k, Q) => (s(), c("tr", {
                  key: `row-${Q}`,
                  "data-row-key": Q + 1
                }, [
                  g.selectableRows ? (s(), c("th", Ho, [
                    d("div", qo, [
                      pe(d("input", {
                        id: `row-select-${g.id}-${Q}`,
                        "onUpdate:modelValue": S[1] || (S[1] = (_) => l.value = _),
                        value: g.rows[Q][g.rowKey] ?? `row-${Q}`,
                        type: "checkbox",
                        onChange: S[2] || (S[2] = (_) => D())
                      }, null, 40, Ko), [
                        [Qe, l.value]
                      ]),
                      d("label", {
                        class: "fr-label",
                        for: `row-select-${g.id}-${Q}`
                      }, " Sélectionner la ligne " + b(Q + 1), 9, zo)
                    ])
                  ])) : h("", !0),
                  (s(!0), c(H, null, G(k, (_, E) => (s(), c("td", {
                    key: typeof _ == "object" ? _[g.rowKey] : _,
                    tabindex: "0",
                    onKeydown: [
                      Y(W((O) => q(typeof _ == "object" ? _[g.rowKey] : _), ["ctrl"]), ["c"]),
                      Y(W((O) => q(typeof _ == "object" ? _[g.rowKey] : _), ["meta"]), ["c"])
                    ]
                  }, [
                    L(g.$slots, "cell", K({ ref_for: !0 }, {
                      colKey: typeof g.headersRow[E] == "object" ? g.headersRow[E].key : g.headersRow[E],
                      cell: _
                    }), () => [
                      V(b(typeof _ == "object" ? _[g.rowKey] : _), 1)
                    ], !0)
                  ], 40, Qo))), 128))
                ], 8, Oo))), 128))
              ])
            ], 8, Mo)
          ])
        ])
      ]),
      d("div", {
        class: P(g.bottomActionBarClass)
      }, [
        L(g.$slots, "pagination", {}, () => [
          g.pagination && !g.$slots.pagination ? (s(), c("div", {
            key: 0,
            class: P(["flex justify-between items-center", g.paginationWrapperClass])
          }, [
            d("div", Go, [
              S[6] || (S[6] = d("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              pe(d("select", {
                id: "pagination-options",
                "onUpdate:modelValue": S[3] || (S[3] = (k) => o.value = k),
                class: "fr-select",
                onChange: S[4] || (S[4] = (k) => C())
              }, [
                d("option", {
                  value: "",
                  selected: !g.paginationOptions.includes(o.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Wo),
                (s(!0), c(H, null, G(g.paginationOptions, (k, Q) => (s(), c("option", {
                  key: Q,
                  value: k,
                  selected: +k === o.value
                }, b(k), 9, Uo))), 128))
              ], 544), [
                [ht, o.value]
              ])
            ]),
            d("div", Xo, [
              d("span", Yo, "Page " + b(r.value + 1) + " sur " + b(i.value), 1)
            ]),
            X(Tt, {
              "current-page": r.value,
              "onUpdate:currentPage": S[5] || (S[5] = (k) => r.value = k),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : h("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Jo = /* @__PURE__ */ re(Zo, [["__scopeId", "data-v-1d55e1f1"]]), er = "data:image/png;base64,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", tr = { class: "fr-container flex" }, ar = { class: "half" }, lr = { class: "fr-h1" }, nr = { class: "flex fr-my-md-3w" }, or = { class: "fr-h6" }, rr = /* @__PURE__ */ M({
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
      return s(), c("div", tr, [
        d("div", ar, [
          d("h1", lr, b(e.title), 1),
          d("span", nr, b(e.subtitle), 1),
          d("p", or, b(e.description), 1),
          d("p", null, b(e.help), 1),
          (n = e.buttons) != null && n.length ? (s(), N(Ye, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : h("", !0),
          L(e.$slots, "default", {}, void 0, !0)
        ]),
        a[0] || (a[0] = d("div", { class: "half self-center text-center" }, [
          d("img", {
            class: "error-img",
            src: er
          })
        ], -1))
      ]);
    };
  }
}), sr = /* @__PURE__ */ re(rr, [["__scopeId", "data-v-0f6cf5b4"]]), ir = { class: "fr-fieldset" }, ur = ["id"], dr = {
  key: 1,
  class: "fr-fieldset__element"
}, cr = { class: "fr-fieldset__element" }, fr = /* @__PURE__ */ M({
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
      var n, l, o, r;
      return s(), c("fieldset", ir, [
        e.legend || (l = (n = e.$slots).legend) != null && l.call(n).length ? (s(), c("legend", {
          key: 0,
          id: e.legendId,
          class: P(["fr-fieldset__legend", e.legendClass])
        }, [
          V(b(e.legend) + " ", 1),
          L(e.$slots, "legend")
        ], 10, ur)) : h("", !0),
        e.hint || (r = (o = e.$slots).hint) != null && r.call(o).length ? (s(), c("div", dr, [
          d("span", {
            class: P(["fr-hint-text", e.hintClass])
          }, [
            V(b(e.hint) + " ", 1),
            L(e.$slots, "hint")
          ], 2)
        ])) : h("", !0),
        d("div", cr, [
          L(e.$slots, "default")
        ])
      ]);
    };
  }
}), pr = ["href", "download"], vr = { class: "fr-link__detail" }, Ca = /* @__PURE__ */ M({
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
      d("span", vr, b(e.format) + " – " + b(e.size), 1)
    ], 8, pr));
  }
}), mr = { class: "fr-downloads-group fr-downloads-group--bordered" }, gr = {
  key: 0,
  class: "fr-downloads-group__title"
}, br = /* @__PURE__ */ M({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (s(), c("div", mr, [
      e.title ? (s(), c("h4", gr, b(e.title), 1)) : h("", !0),
      d("ul", null, [
        (s(!0), c(H, null, G(e.files, (n, l) => (s(), c("li", { key: l }, [
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
}), hr = ["for"], yr = {
  key: 0,
  class: "required"
}, kr = {
  key: 1,
  class: "fr-hint-text"
}, wr = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], _r = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Ir = ["id"], Dr = /* @__PURE__ */ M({
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
    const a = t, n = e, l = (r) => {
      var i, u;
      n("update:modelValue", (i = r.target) == null ? void 0 : i.value), n("change", (u = r.target) == null ? void 0 : u.files);
    }, o = I(() => Array.isArray(a.accept) ? a.accept.join(",") : a.accept);
    return (r, i) => (s(), c("div", {
      class: P(["fr-upload-group", {
        "fr-upload-group--error": r.error,
        "fr-upload-group--valid": r.validMessage,
        "fr-upload-group--disabled": r.disabled
      }])
    }, [
      d("label", {
        class: "fr-label",
        for: r.id
      }, [
        V(b(r.label) + " ", 1),
        "required" in r.$attrs && r.$attrs.required !== !1 ? (s(), c("span", yr, " *")) : h("", !0),
        r.hint ? (s(), c("span", kr, b(r.hint), 1)) : h("", !0)
      ], 8, hr),
      d("input", K({
        id: r.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": r.error || r.validMessage ? `${r.id}-desc` : void 0
      }, r.$attrs, {
        value: r.modelValue,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        accept: o.value,
        onChange: i[0] || (i[0] = (u) => l(u))
      }), null, 16, wr),
      r.error || r.validMessage ? (s(), c("div", _r, [
        r.error ? (s(), c("p", {
          key: 0,
          id: `${r.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, b(r.error ?? r.validMessage), 9, Ir)) : h("", !0)
      ])) : h("", !0)
    ], 2));
  }
}), xr = { class: "fr-follow__newsletter" }, Cr = { class: "fr-h5 fr-follow__title" }, Br = { class: "fr-text--sm fr-follow__desc" }, Tr = { key: 0 }, Er = ["title"], Sr = { key: 1 }, Lr = { action: "" }, Ar = {
  class: "fr-label",
  for: "newsletter-email"
}, Mr = { class: "fr-input-wrap fr-input-wrap--addon" }, $r = ["title", "placeholder", "value"], Fr = ["title"], Pr = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Rr = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Nr = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, Ba = /* @__PURE__ */ M({
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
    return (l, o) => (s(), c("div", xr, [
      d("div", null, [
        d("h3", Cr, b(l.title), 1),
        d("p", Br, b(l.description), 1)
      ]),
      l.onlyCallout ? (s(), c("div", Tr, [
        d("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: o[0] || (o[0] = (r) => l.buttonAction ? l.buttonAction(r) : () => {
          })
        }, b(l.buttonText), 9, Er)
      ])) : (s(), c("div", Sr, [
        d("form", Lr, [
          d("label", Ar, b(l.labelEmail), 1),
          d("div", Mr, [
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
              onInput: o[1] || (o[1] = (r) => n(r))
            }, null, 40, $r),
            d("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, b(l.buttonText), 9, Fr)
          ]),
          l.error ? (s(), c("div", Pr, [
            d("p", Rr, b(l.error), 1)
          ])) : h("", !0),
          d("p", Nr, b(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), Vr = { class: "fr-follow__social" }, jr = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Or = ["title", "href"], Ta = /* @__PURE__ */ M({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (s(), c("div", Vr, [
      (s(), N(oe(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: U(() => a[0] || (a[0] = [
          V(" Suivez-nous "),
          d("br", null, null, -1),
          V(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (s(), c("ul", jr, [
        (s(!0), c(H, null, G(e.networks, (n, l) => (s(), c("li", { key: l }, [
          d("a", {
            class: P(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, b(n.name), 11, Or)
        ]))), 128))
      ])) : h("", !0)
    ]));
  }
}), Hr = { class: "fr-follow" }, qr = { class: "fr-container" }, Kr = { class: "fr-grid-row" }, zr = /* @__PURE__ */ M({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = I(() => e.networks && e.networks.length), n = I(() => typeof e.newsletterData == "object");
    return (l, o) => (s(), c("div", Hr, [
      d("div", qr, [
        d("div", Kr, [
          L(l.$slots, "default", {}, () => [
            l.newsletterData ? (s(), c("div", {
              key: 0,
              class: P(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              X(Ba, ue(gt(l.newsletterData)), null, 16)
            ], 2)) : h("", !0),
            a.value ? (s(), c("div", {
              key: 1,
              class: P(["fr-col-12", { "fr-col-md-4": n.value }])
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
    const e = t, a = I(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("http");
    }), n = I(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("mailto");
    }), l = I(() => e.button ? "button" : a.value || n.value ? "a" : "RouterLink"), o = I(() => {
      if (!(!a.value && !n.value))
        return e.href;
    }), r = I(() => {
      if (!(a.value || n.value))
        return e.to;
    }), i = I(() => r.value ? { to: r.value } : { href: o.value }), u = I(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), f = I(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Xt, ...e.iconAttrs ?? {} } : { scale: Xt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, m) => (s(), N(oe(l.value), K({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, i.value, {
      target: p.target,
      onClick: W(p.onClick, ["stop"])
    }), {
      default: U(() => {
        var w, B;
        return [
          !u.value && (p.icon || (w = p.iconAttrs) != null && w.name) && !p.iconRight ? (s(), N(le, K({
            key: 0,
            class: "fr-mr-1w"
          }, f.value), null, 16)) : h("", !0),
          V(" " + b(p.label) + " ", 1),
          !u.value && (p.icon || (B = p.iconAttrs) != null && B.name) && p.iconRight ? (s(), N(le, K({
            key: 1,
            class: "fr-ml-1w"
          }, f.value), null, 16)) : h("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Qr = { class: "fr-footer__partners" }, Gr = {
  key: 0,
  class: "fr-footer__partners-title"
}, Wr = { class: "fr-footer__partners-logos" }, Ur = {
  key: 0,
  class: "fr-footer__partners-main"
}, Xr = ["href"], Yr = ["src", "alt"], Zr = { class: "fr-footer__partners-sub" }, Jr = ["href"], es = ["src", "alt"], Sa = /* @__PURE__ */ M({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (s(), c("div", Qr, [
      e.title ? (s(), c("h4", Gr, b(e.title), 1)) : h("", !0),
      d("div", Wr, [
        e.mainPartner ? (s(), c("div", Ur, [
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
            }, null, 8, Yr)
          ], 8, Xr)
        ])) : h("", !0),
        d("div", Zr, [
          d("ul", null, [
            (s(!0), c(H, null, G(e.subPartners, (n, l) => (s(), c("li", { key: l }, [
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
                }, null, 8, es)
              ], 8, Jr)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), ts = ["innerHTML"], Se = /* @__PURE__ */ M({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(t) {
    const e = t, a = I(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (n, l) => (s(), c("p", {
      class: P(["fr-logo", {
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
}, ns = { class: "fr-container" }, os = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, rs = { class: "fr-container" }, ss = { class: "fr-footer__body" }, is = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, us = ["href"], ds = ["src", "alt"], cs = ["src", "alt"], fs = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, ps = { class: "fr-footer__content" }, vs = { class: "fr-footer__content-desc" }, ms = { class: "fr-footer__content-list" }, gs = ["href", "title"], bs = { class: "fr-footer__bottom" }, hs = { class: "fr-footer__bottom-list" }, ys = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, ks = /* @__PURE__ */ M({
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
    }), o = I(() => {
      const p = e.licenceTo || e.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), r = I(() => {
      const { to: p, href: m, ...w } = e.licenceLinkProps ?? {};
      return w;
    }), i = I(() => o.value ? "" : e.licenceTo), u = I(() => o.value ? e.licenceTo : ""), f = I(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (p, m) => {
      const w = se("RouterLink");
      return s(), c("footer", as, [
        l.value ? (s(), c("div", ls, [
          d("div", ns, [
            d("div", os, [
              L(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : h("", !0),
        d("div", rs, [
          d("div", ss, [
            p.operatorImgSrc ? (s(), c("div", is, [
              X(Se, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              f.value ? (s(), c("a", {
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
                }, null, 12, ds)
              ], 8, us)) : (s(), N(w, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  d("img", {
                    class: "fr-footer__logo",
                    style: de(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, cs)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (s(), c("div", fs, [
              X(w, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  X(Se, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            d("div", ps, [
              d("p", vs, [
                L(p.$slots, "description", {}, () => [
                  V(b(p.descText), 1)
                ], !0)
              ]),
              d("ul", ms, [
                (s(!0), c(H, null, G(p.ecosystemLinks, ({ href: B, label: x, title: F, ...v }, T) => (s(), c("li", {
                  key: T,
                  class: "fr-footer__content-item"
                }, [
                  d("a", K({
                    class: "fr-footer__content-link",
                    href: B,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: F,
                    ref_for: !0
                  }, v), b(x), 17, gs)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (s(), N(Sa, ue(K({ key: 0 }, p.partners)), null, 16)) : h("", !0),
          d("div", bs, [
            d("ul", hs, [
              (s(!0), c(H, null, G(a.value, (B, x) => (s(), c("li", {
                key: x,
                class: "fr-footer__bottom-item"
              }, [
                X(Ea, K({ ref_for: !0 }, B), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (s(), c("div", ys, [
              d("p", null, [
                V(b(p.licenceText) + " ", 1),
                (s(), N(oe(o.value ? "a" : "RouterLink"), K({
                  class: "fr-link-licence no-content-after",
                  to: o.value ? void 0 : i.value,
                  href: o.value ? u.value : void 0,
                  target: o.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, r.value), {
                  default: U(() => [
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
}), ws = /* @__PURE__ */ re(ks, [["__scopeId", "data-v-4d6f52aa"]]), _s = { class: "fr-footer__top-cat" }, Is = { class: "fr-footer__top-list" }, Ds = ["href"], xs = /* @__PURE__ */ M({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const n = se("RouterLink");
      return s(), c("div", null, [
        d("h3", _s, b(e.categoryName), 1),
        d("ul", Is, [
          (s(!0), c(H, null, G(e.links, (l, o) => (s(), c("li", { key: o }, [
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
              default: U(() => [
                V(b(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : h("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Cs = { class: "fr-connect-group" }, Bs = { class: "fr-connect__brand" }, Ts = ["href", "title"], Es = /* @__PURE__ */ M({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (s(), c("div", Cs, [
      d("button", {
        class: P(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        a[0] || (a[0] = d("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        d("span", Bs, "FranceConnect" + b(e.secure ? "+" : ""), 1)
      ], 2),
      d("p", null, [
        d("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, b(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, Ts)
      ])
    ]));
  }
}), Ss = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Ls = { class: "fr-nav__item" }, As = ["aria-controls", "aria-expanded"], Ms = { class: "fr-hidden-lg" }, $s = ["id"], Fs = { class: "fr-menu__list" }, Ps = ["hreflang", "lang", "aria-current", "href", "onClick"], Le = /* @__PURE__ */ M({
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
      collapsing: o,
      cssExpanded: r,
      doExpand: i,
      onTransitionEnd: u
    } = me(), f = j(!1);
    function p(w) {
      f.value = !1, n("select", w);
    }
    const m = I(
      () => a.languages.find(({ codeIso: w }) => w === a.currentLanguage)
    );
    return ae(f, (w, B) => {
      w !== B && i(w);
    }), (w, B) => {
      var x, F;
      return s(), c("nav", Ss, [
        d("div", Ls, [
          d("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": w.id,
            "aria-expanded": f.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: B[0] || (B[0] = W((v) => f.value = !f.value, ["prevent", "stop"]))
          }, [
            V(b((x = m.value) == null ? void 0 : x.codeIso.toUpperCase()), 1),
            d("span", Ms, " - " + b((F = m.value) == null ? void 0 : F.label), 1)
          ], 8, As),
          d("div", {
            id: w.id,
            ref_key: "collapse",
            ref: l,
            class: P(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": $(r), "fr-collapsing": $(o) }]),
            onTransitionend: B[1] || (B[1] = (v) => $(u)(f.value))
          }, [
            d("ul", Fs, [
              (s(!0), c(H, null, G(w.languages, (v, T) => (s(), c("li", { key: T }, [
                d("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: v.codeIso,
                  lang: v.codeIso,
                  "aria-current": w.currentLanguage === v.codeIso ? !0 : void 0,
                  href: `#${v.codeIso}`,
                  onClick: W((y) => p(v), ["prevent", "stop"])
                }, b(`${v.codeIso.toUpperCase()} - ${v.label}`), 9, Ps)
              ]))), 128))
            ])
          ], 42, $s)
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
}, js = /* @__PURE__ */ M({
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
    const a = t, n = ol(), l = j(null), o = () => {
      var f;
      return (f = l.value) == null ? void 0 : f.focus();
    }, r = I(() => a.isTextarea ? "textarea" : "input"), i = I(() => a.isWithWrapper || n.type === "date" || !!a.wrapperClass), u = I(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: o
    }), (f, p) => (s(), c(H, null, [
      d("label", {
        class: P(u.value),
        for: f.id
      }, [
        L(f.$slots, "label", {}, () => [
          V(b(f.label) + " ", 1),
          L(f.$slots, "required-tip", {}, () => [
            "required" in f.$attrs && f.$attrs.required !== !1 ? (s(), c("span", Ns, "*")) : h("", !0)
          ], !0)
        ], !0),
        f.hint ? (s(), c("span", Vs, b(f.hint), 1)) : h("", !0)
      ], 10, Rs),
      i.value ? (s(), c("div", {
        key: 1,
        class: P([
          { "fr-input-wrap": f.isWithWrapper || f.$attrs.type === "date" },
          f.wrapperClass
        ])
      }, [
        (s(), N(oe(r.value), K({ id: f.id }, f.$attrs, {
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
      ], 2)) : (s(), N(oe(r.value), K({
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
}), Et = /* @__PURE__ */ re(js, [["__scopeId", "data-v-6e6c295a"]]), Ae = /* @__PURE__ */ M({
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
      class: P(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
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
        "onUpdate:modelValue": l[0] || (l[0] = (o) => a("update:modelValue", o)),
        onKeydown: l[1] || (l[1] = Y((o) => a("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      X($e, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: l[2] || (l[2] = (o) => a("search", n.modelValue))
      }, {
        default: U(() => [
          V(b(n.buttonText), 1)
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
    const e = t, a = I(() => typeof e.path == "string"), n = I(() => {
      var m;
      return ((m = e.href) == null ? void 0 : m.startsWith("http")) || a.value && e.path.startsWith("http") || typeof e.to == "string" && e.to.startsWith("http");
    }), l = I(() => {
      var m;
      return ((m = e.href) == null ? void 0 : m.startsWith("mailto")) || a.value && e.path.startsWith("mailto") || typeof e.to == "string" && e.to.startsWith("mailto");
    }), o = I(() => e.button ? "button" : n.value || l.value ? "a" : "RouterLink"), r = I(() => {
      if (!(!n.value && !l.value))
        return e.to ?? e.href ?? e.path;
    }), i = I(() => {
      if (!(n.value || l.value))
        return e.to ?? e.path;
    }), u = I(() => i.value ? { to: i.value } : { href: r.value }), f = I(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = I(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Yt, ...e.iconAttrs ?? {} } : { scale: Yt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (m, w) => (s(), N(oe(o.value), K({
      class: ["fr-btn", {
        "fr-btn--icon-right": f.value && m.iconRight,
        "fr-btn--icon-left": f.value && !m.iconRight,
        [String(m.icon)]: f.value
      }]
    }, u.value, {
      target: m.target,
      onClick: w[0] || (w[0] = W((B) => m.onClick(B), ["stop"]))
    }), {
      default: U(() => {
        var B, x;
        return [
          !f.value && (m.icon || (B = m.iconAttrs) != null && B.name) && !m.iconRight ? (s(), N(le, K({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : h("", !0),
          V(" " + b(m.label) + " ", 1),
          !f.value && (m.icon || (x = m.iconAttrs) != null && x.name) && m.iconRight ? (s(), N(le, K({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : h("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Os = ["aria-label"], Hs = { class: "fr-btns-group" }, pt = /* @__PURE__ */ M({
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
      d("ul", Hs, [
        (s(!0), c(H, null, G(n.links, (o, r) => (s(), c("li", { key: r }, [
          X(St, K({ ref_for: !0 }, o, {
            "on-click": (i) => {
              var u;
              a("linkClick", i), (u = o.onClick) == null || u.call(o, i);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Os));
  }
}), qs = {
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
}, oi = {
  key: 1,
  class: "fr-header__service"
}, ri = { class: "fr-header__tools" }, si = {
  key: 0,
  class: "fr-header__tools-links"
}, ii = {
  key: 1,
  class: "fr-header__search fr-modal"
}, ui = ["aria-label"], di = { class: "fr-container" }, ci = { class: "fr-header__menu-links" }, fi = { role: "navigation" }, pi = {
  key: 1,
  class: "flex justify-center items-center"
}, vi = { class: "fr-header__menu fr-modal" }, mi = {
  key: 0,
  class: "fr-container"
}, gi = /* @__PURE__ */ M({
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
    const a = t, n = e, l = Me(a, "languageSelector"), o = j(!1), r = j(!1), i = j(!1), u = () => {
      var v;
      i.value = !1, o.value = !1, r.value = !1, (v = document.getElementById("button-menu")) == null || v.focus();
    }, f = (v) => {
      v.key === "Escape" && u();
    };
    ne(() => {
      document.addEventListener("keydown", f);
    }), ce(() => {
      document.removeEventListener("keydown", f);
    });
    const p = () => {
      var v;
      i.value = !0, o.value = !0, r.value = !1, (v = document.getElementById("close-button")) == null || v.focus();
    }, m = () => {
      i.value = !0, o.value = !1, r.value = !0;
    }, w = u, B = bt(), x = I(() => {
      var v;
      return !!((v = B.operator) != null && v.call(B).length) || !!a.operatorImgSrc;
    }), F = I(() => !!B.mainnav);
    return ve(kt, () => u), (v, T) => {
      var y, D, C;
      const q = se("RouterLink");
      return s(), c("header", qs, [
        d("div", Ks, [
          d("div", zs, [
            d("div", Qs, [
              d("div", Gs, [
                d("div", Ws, [
                  d("div", Us, [
                    X(q, {
                      to: v.homeTo,
                      title: `${v.homeLabel} - ${v.serviceTitle}`
                    }, {
                      default: U(() => [
                        X(Se, {
                          "logo-text": v.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  x.value ? (s(), c("div", Xs, [
                    L(v.$slots, "operator", {}, () => [
                      v.operatorImgSrc ? (s(), c("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: v.operatorImgSrc,
                        alt: v.operatorImgAlt,
                        style: de(v.operatorImgStyle)
                      }, null, 12, Ys)) : h("", !0)
                    ])
                  ])) : h("", !0),
                  v.showSearch || F.value || (y = v.quickLinks) != null && y.length ? (s(), c("div", Zs, [
                    v.showSearch ? (s(), c("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": v.showSearchLabel,
                      title: v.showSearchLabel,
                      "data-fr-opened": r.value,
                      onClick: T[0] || (T[0] = W((g) => m(), ["prevent", "stop"]))
                    }, null, 8, Js)) : h("", !0),
                    F.value || (D = v.quickLinks) != null && D.length ? (s(), c("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": v.menuLabel,
                      title: v.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = W((g) => p(), ["prevent", "stop"]))
                    }, null, 8, ei)) : h("", !0)
                  ])) : h("", !0)
                ]),
                v.serviceTitle ? (s(), c("div", ti, [
                  X(q, K({
                    to: v.homeTo,
                    title: `${v.homeLabel} - ${v.serviceTitle}`
                  }, v.$attrs), {
                    default: U(() => [
                      d("p", ai, [
                        V(b(v.serviceTitle) + " ", 1),
                        v.showBeta ? (s(), c("span", li, " BETA ")) : h("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  v.serviceDescription ? (s(), c("p", ni, b(v.serviceDescription), 1)) : h("", !0)
                ])) : h("", !0),
                !v.serviceTitle && v.showBeta ? (s(), c("div", oi, T[9] || (T[9] = [
                  d("p", { class: "fr-header__service-title" }, [
                    d("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : h("", !0)
              ]),
              d("div", ri, [
                (C = v.quickLinks) != null && C.length || l.value ? (s(), c("div", si, [
                  o.value ? h("", !0) : (s(), N(pt, {
                    key: 0,
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (s(), N(Le, K({ key: 1 }, l.value, {
                    onSelect: T[2] || (T[2] = (g) => n("language-select", g))
                  }), null, 16)) : h("", !0)
                ])) : h("", !0),
                v.showSearch ? (s(), c("div", ii, [
                  X(Ae, {
                    "searchbar-id": v.searchbarId,
                    label: v.searchLabel,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (g) => n("update:modelValue", g)),
                    onSearch: T[4] || (T[4] = (g) => n("search", g))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ]),
            v.showSearch || F.value || v.quickLinks && v.quickLinks.length || l.value ? (s(), c("div", {
              key: 0,
              id: "header-navigation",
              class: P(["fr-header__menu fr-modal", { "fr-modal--opened": i.value }]),
              "aria-label": v.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              d("div", di, [
                d("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: T[5] || (T[5] = W((g) => u(), ["prevent", "stop"]))
                }, b(v.closeMenuModalLabel), 1),
                d("div", ci, [
                  l.value ? (s(), N(Le, K({ key: 0 }, l.value, {
                    onSelect: T[6] || (T[6] = (g) => l.value.currentLanguage = g.codeIso)
                  }), null, 16)) : h("", !0),
                  d("nav", fi, [
                    o.value ? (s(), N(pt, {
                      key: 0,
                      role: "navigation",
                      links: v.quickLinks,
                      "nav-aria-label": v.quickLinksAriaLabel,
                      onLinkClick: $(w)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : h("", !0)
                  ])
                ]),
                i.value ? L(v.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : h("", !0),
                r.value ? (s(), c("div", pi, [
                  X(Ae, {
                    "searchbar-id": v.searchbarId,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (g) => n("update:modelValue", g)),
                    onSearch: T[8] || (T[8] = (g) => n("search", g))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ], 10, ui)) : h("", !0),
            L(v.$slots, "default")
          ])
        ]),
        d("div", vi, [
          F.value && !i.value ? (s(), c("div", mi, [
            L(v.$slots, "mainnav", { hidemodal: u })
          ])) : h("", !0)
        ])
      ]);
    };
  }
}), bi = /* @__PURE__ */ M({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(t) {
    return (e, a) => (s(), c("div", {
      class: P(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      d("p", {
        class: P({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        V(b(e.text) + " ", 1),
        L(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), hi = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, yi = ["id", "data-testid"], ki = ["id", "data-testid"], wi = ["id", "data-testid"], _i = ["id", "data-testid"], Ii = /* @__PURE__ */ M({
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
      class: P(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      L(e.$slots, "before-input"),
      L(e.$slots, "default"),
      e.$slots.default ? h("", !0) : (s(), N(Et, K({ key: 0 }, e.$attrs, {
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
      d("div", hi, [
        Array.isArray(e.errorMessage) ? (s(!0), c(H, { key: 0 }, G(e.errorMessage, (n) => (s(), c("p", {
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
        Array.isArray(e.validMessage) ? (s(!0), c(H, { key: 2 }, G(e.validMessage, (n) => (s(), c("p", {
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
var La = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], He = /* @__PURE__ */ La.join(","), Aa = typeof Element > "u", ye = Aa ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, qe = !Aa && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, Ke = function t(e, a) {
  var n;
  a === void 0 && (a = !0);
  var l = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), o = l === "" || l === "true", r = o || a && e && t(e.parentNode);
  return r;
}, Di = function(t) {
  var e, a = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return a === "" || a === "true";
}, Ma = function(t, e, a) {
  if (Ke(t))
    return [];
  var n = Array.prototype.slice.apply(t.querySelectorAll(He));
  return e && ye.call(t, He) && n.unshift(t), n = n.filter(a), n;
}, $a = function t(e, a, n) {
  for (var l = [], o = Array.from(e); o.length; ) {
    var r = o.shift();
    if (!Ke(r, !1))
      if (r.tagName === "SLOT") {
        var i = r.assignedElements(), u = i.length ? i : r.children, f = t(u, !0, n);
        n.flatten ? l.push.apply(l, f) : l.push({
          scopeParent: r,
          candidates: f
        });
      } else {
        var p = ye.call(r, He);
        p && n.filter(r) && (a || !e.includes(r)) && l.push(r);
        var m = r.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(r), w = !Ke(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(r));
        if (m && w) {
          var B = t(m === !0 ? r.children : m.children, !0, n);
          n.flatten ? l.push.apply(l, B) : l.push({
            scopeParent: r,
            candidates: B
          });
        } else
          o.unshift.apply(o, r.children);
      }
  }
  return l;
}, Fa = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, ge = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || Di(t)) && !Fa(t) ? 0 : t.tabIndex;
}, xi = function(t, e) {
  var a = ge(t);
  return a < 0 && e && !Fa(t) ? 0 : a;
}, Ci = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, Pa = function(t) {
  return t.tagName === "INPUT";
}, Bi = function(t) {
  return Pa(t) && t.type === "hidden";
}, Ti = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return e;
}, Ei = function(t, e) {
  for (var a = 0; a < t.length; a++)
    if (t[a].checked && t[a].form === e)
      return t[a];
}, Si = function(t) {
  if (!t.name)
    return !0;
  var e = t.form || qe(t), a = function(o) {
    return e.querySelectorAll('input[type="radio"][name="' + o + '"]');
  }, n;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    n = a(window.CSS.escape(t.name));
  else
    try {
      n = a(t.name);
    } catch (o) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", o.message), !1;
    }
  var l = Ei(n, t.form);
  return !l || l === t;
}, Li = function(t) {
  return Pa(t) && t.type === "radio";
}, Ai = function(t) {
  return Li(t) && !Si(t);
}, Mi = function(t) {
  var e, a = t && qe(t), n = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var o, r, i;
    for (l = !!((o = n) !== null && o !== void 0 && (r = o.ownerDocument) !== null && r !== void 0 && r.contains(n) || t != null && (i = t.ownerDocument) !== null && i !== void 0 && i.contains(t)); !l && n; ) {
      var u, f, p;
      a = qe(n), n = (u = a) === null || u === void 0 ? void 0 : u.host, l = !!((f = n) !== null && f !== void 0 && (p = f.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return l;
}, Zt = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, n = e.height;
  return a === 0 && n === 0;
}, $i = function(t, e) {
  var a = e.displayCheck, n = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = ye.call(t, "details>summary:first-of-type"), o = l ? t.parentElement : t;
  if (ye.call(o, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof n == "function") {
      for (var r = t; t; ) {
        var i = t.parentElement, u = qe(t);
        if (i && !i.shadowRoot && n(i) === !0)
          return Zt(t);
        t.assignedSlot ? t = t.assignedSlot : !i && u !== t.ownerDocument ? t = u.host : t = i;
      }
      t = r;
    }
    if (Mi(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Zt(t);
  return !1;
}, Fi = function(t) {
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
}, ze = function(t, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Ke(e) || Bi(e) || $i(e, t) || // For a details element with a summary, the summary element gets the focus
  Ti(e) || Fi(e));
}, vt = function(t, e) {
  return !(Ai(e) || ge(e) < 0 || !ze(t, e));
}, Pi = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, Ri = function t(e) {
  var a = [], n = [];
  return e.forEach(function(l, o) {
    var r = !!l.scopeParent, i = r ? l.scopeParent : l, u = xi(i, r), f = r ? t(l.candidates) : i;
    u === 0 ? r ? a.push.apply(a, f) : a.push(i) : n.push({
      documentOrder: o,
      tabIndex: u,
      item: l,
      isScope: r,
      content: f
    });
  }), n.sort(Ci).reduce(function(l, o) {
    return o.isScope ? l.push.apply(l, o.content) : l.push(o.content), l;
  }, []).concat(a);
}, Ni = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = $a([t], e.includeContainer, {
    filter: vt.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: Pi
  }) : a = Ma(t, e.includeContainer, vt.bind(null, e)), Ri(a);
}, Vi = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = $a([t], e.includeContainer, {
    filter: ze.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = Ma(t, e.includeContainer, ze.bind(null, e)), a;
}, we = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return ye.call(t, He) === !1 ? !1 : vt(e, t);
}, ji = /* @__PURE__ */ La.concat("iframe").join(","), lt = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return ye.call(t, ji) === !1 ? !1 : ze(e, t);
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
  return e = qi(e), e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function Hi(t, e) {
  if (typeof t != "object" || t === null) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var n = a.call(t, e || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function qi(t) {
  var e = Hi(t, "string");
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
}, Be = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, Qi = function(t) {
  return Be(t) && !t.shiftKey;
}, Gi = function(t) {
  return Be(t) && t.shiftKey;
}, aa = function(t) {
  return setTimeout(t, 0);
}, la = function(t, e) {
  var a = -1;
  return t.every(function(n, l) {
    return e(n) ? (a = l, !1) : !0;
  }), a;
}, xe = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    a[n - 1] = arguments[n];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, Ne = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, Wi = [], Ui = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, n = (e == null ? void 0 : e.trapStack) || Wi, l = ea({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Qi,
    isKeyBackward: Gi
  }, e), o = {
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
  }, r, i = function(_, E, O) {
    return _ && _[E] !== void 0 ? _[E] : l[O || E];
  }, u = function(_, E) {
    var O = typeof (E == null ? void 0 : E.composedPath) == "function" ? E.composedPath() : void 0;
    return o.containerGroups.findIndex(function(A) {
      var R = A.container, z = A.tabbableNodes;
      return R.contains(_) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (O == null ? void 0 : O.includes(R)) || z.find(function(Z) {
        return Z === _;
      });
    });
  }, f = function(_) {
    var E = l[_];
    if (typeof E == "function") {
      for (var O = arguments.length, A = new Array(O > 1 ? O - 1 : 0), R = 1; R < O; R++)
        A[R - 1] = arguments[R];
      E = E.apply(void 0, A);
    }
    if (E === !0 && (E = void 0), !E) {
      if (E === void 0 || E === !1)
        return E;
      throw new Error("`".concat(_, "` was specified but was not a node, or did not return a node"));
    }
    var z = E;
    if (typeof E == "string" && (z = a.querySelector(E), !z))
      throw new Error("`".concat(_, "` as selector refers to no known node"));
    return z;
  }, p = function() {
    var _ = f("initialFocus");
    if (_ === !1)
      return !1;
    if (_ === void 0 || !lt(_, l.tabbableOptions))
      if (u(a.activeElement) >= 0)
        _ = a.activeElement;
      else {
        var E = o.tabbableGroups[0], O = E && E.firstTabbableNode;
        _ = O || f("fallbackFocus");
      }
    if (!_)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return _;
  }, m = function() {
    if (o.containerGroups = o.containers.map(function(_) {
      var E = Ni(_, l.tabbableOptions), O = Vi(_, l.tabbableOptions), A = E.length > 0 ? E[0] : void 0, R = E.length > 0 ? E[E.length - 1] : void 0, z = O.find(function(te) {
        return we(te);
      }), Z = O.slice().reverse().find(function(te) {
        return we(te);
      }), ee = !!E.find(function(te) {
        return ge(te) > 0;
      });
      return {
        container: _,
        tabbableNodes: E,
        focusableNodes: O,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ee,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: A,
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
          var ke = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, De = E.indexOf(te);
          return De < 0 ? ke ? O.slice(O.indexOf(te) + 1).find(function(fe) {
            return we(fe);
          }) : O.slice(0, O.indexOf(te)).reverse().find(function(fe) {
            return we(fe);
          }) : E[De + (ke ? 1 : -1)];
        }
      };
    }), o.tabbableGroups = o.containerGroups.filter(function(_) {
      return _.tabbableNodes.length > 0;
    }), o.tabbableGroups.length <= 0 && !f("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (o.containerGroups.find(function(_) {
      return _.posTabIndexesFound;
    }) && o.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, w = function _(E) {
    var O = E.activeElement;
    if (O)
      return O.shadowRoot && O.shadowRoot.activeElement !== null ? _(O.shadowRoot) : O;
  }, B = function _(E) {
    if (E !== !1 && E !== w(document)) {
      if (!E || !E.focus) {
        _(p());
        return;
      }
      E.focus({
        preventScroll: !!l.preventScroll
      }), o.mostRecentlyFocusedNode = E, Ki(E) && E.select();
    }
  }, x = function(_) {
    var E = f("setReturnFocus", _);
    return E || (E === !1 ? !1 : _);
  }, F = function(_) {
    var E = _.target, O = _.event, A = _.isBackward, R = A === void 0 ? !1 : A;
    E = E || Ne(O), m();
    var z = null;
    if (o.tabbableGroups.length > 0) {
      var Z = u(E, O), ee = Z >= 0 ? o.containerGroups[Z] : void 0;
      if (Z < 0)
        R ? z = o.tabbableGroups[o.tabbableGroups.length - 1].lastTabbableNode : z = o.tabbableGroups[0].firstTabbableNode;
      else if (R) {
        var te = la(o.tabbableGroups, function(Je) {
          var et = Je.firstTabbableNode;
          return E === et;
        });
        if (te < 0 && (ee.container === E || lt(E, l.tabbableOptions) && !we(E, l.tabbableOptions) && !ee.nextTabbableNode(E, !1)) && (te = Z), te >= 0) {
          var ke = te === 0 ? o.tabbableGroups.length - 1 : te - 1, De = o.tabbableGroups[ke];
          z = ge(E) >= 0 ? De.lastTabbableNode : De.lastDomTabbableNode;
        } else Be(O) || (z = ee.nextTabbableNode(E, !1));
      } else {
        var fe = la(o.tabbableGroups, function(Je) {
          var et = Je.lastTabbableNode;
          return E === et;
        });
        if (fe < 0 && (ee.container === E || lt(E, l.tabbableOptions) && !we(E, l.tabbableOptions) && !ee.nextTabbableNode(E)) && (fe = Z), fe >= 0) {
          var al = fe === o.tabbableGroups.length - 1 ? 0 : fe + 1, Mt = o.tabbableGroups[al];
          z = ge(E) >= 0 ? Mt.firstTabbableNode : Mt.firstDomTabbableNode;
        } else Be(O) || (z = ee.nextTabbableNode(E));
      }
    } else
      z = f("fallbackFocus");
    return z;
  }, v = function(_) {
    var E = Ne(_);
    if (!(u(E, _) >= 0)) {
      if (xe(l.clickOutsideDeactivates, _)) {
        r.deactivate({
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
      xe(l.allowOutsideClick, _) || _.preventDefault();
    }
  }, T = function(_) {
    var E = Ne(_), O = u(E, _) >= 0;
    if (O || E instanceof Document)
      O && (o.mostRecentlyFocusedNode = E);
    else {
      _.stopImmediatePropagation();
      var A, R = !0;
      if (o.mostRecentlyFocusedNode)
        if (ge(o.mostRecentlyFocusedNode) > 0) {
          var z = u(o.mostRecentlyFocusedNode), Z = o.containerGroups[z].tabbableNodes;
          if (Z.length > 0) {
            var ee = Z.findIndex(function(te) {
              return te === o.mostRecentlyFocusedNode;
            });
            ee >= 0 && (l.isKeyForward(o.recentNavEvent) ? ee + 1 < Z.length && (A = Z[ee + 1], R = !1) : ee - 1 >= 0 && (A = Z[ee - 1], R = !1));
          }
        } else
          o.containerGroups.some(function(te) {
            return te.tabbableNodes.some(function(ke) {
              return ge(ke) > 0;
            });
          }) || (R = !1);
      else
        R = !1;
      R && (A = F({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: o.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(o.recentNavEvent)
      })), B(A || o.mostRecentlyFocusedNode || p());
    }
    o.recentNavEvent = void 0;
  }, y = function(_) {
    var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    o.recentNavEvent = _;
    var O = F({
      event: _,
      isBackward: E
    });
    O && (Be(_) && _.preventDefault(), B(O));
  }, D = function(_) {
    if (zi(_) && xe(l.escapeDeactivates, _) !== !1) {
      _.preventDefault(), r.deactivate();
      return;
    }
    (l.isKeyForward(_) || l.isKeyBackward(_)) && y(_, l.isKeyBackward(_));
  }, C = function(_) {
    var E = Ne(_);
    u(E, _) >= 0 || xe(l.clickOutsideDeactivates, _) || xe(l.allowOutsideClick, _) || (_.preventDefault(), _.stopImmediatePropagation());
  }, q = function() {
    if (o.active)
      return ta.activateTrap(n, r), o.delayInitialFocusTimer = l.delayInitialFocus ? aa(function() {
        B(p());
      }) : B(p()), a.addEventListener("focusin", T, !0), a.addEventListener("mousedown", v, {
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
      }), r;
  }, g = function() {
    if (o.active)
      return a.removeEventListener("focusin", T, !0), a.removeEventListener("mousedown", v, !0), a.removeEventListener("touchstart", v, !0), a.removeEventListener("click", C, !0), a.removeEventListener("keydown", D, !0), r;
  }, S = function(_) {
    var E = _.some(function(O) {
      var A = Array.from(O.removedNodes);
      return A.some(function(R) {
        return R === o.mostRecentlyFocusedNode;
      });
    });
    E && B(p());
  }, k = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(S) : void 0, Q = function() {
    k && (k.disconnect(), o.active && !o.paused && o.containers.map(function(_) {
      k.observe(_, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return r = {
    get active() {
      return o.active;
    },
    get paused() {
      return o.paused;
    },
    activate: function(_) {
      if (o.active)
        return this;
      var E = i(_, "onActivate"), O = i(_, "onPostActivate"), A = i(_, "checkCanFocusTrap");
      A || m(), o.active = !0, o.paused = !1, o.nodeFocusedBeforeActivation = a.activeElement, E == null || E();
      var R = function() {
        A && m(), q(), Q(), O == null || O();
      };
      return A ? (A(o.containers.concat()).then(R, R), this) : (R(), this);
    },
    deactivate: function(_) {
      if (!o.active)
        return this;
      var E = ea({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, _);
      clearTimeout(o.delayInitialFocusTimer), o.delayInitialFocusTimer = void 0, g(), o.active = !1, o.paused = !1, Q(), ta.deactivateTrap(n, r);
      var O = i(E, "onDeactivate"), A = i(E, "onPostDeactivate"), R = i(E, "checkCanReturnFocus"), z = i(E, "returnFocus", "returnFocusOnDeactivate");
      O == null || O();
      var Z = function() {
        aa(function() {
          z && B(x(o.nodeFocusedBeforeActivation)), A == null || A();
        });
      };
      return z && R ? (R(x(o.nodeFocusedBeforeActivation)).then(Z, Z), this) : (Z(), this);
    },
    pause: function(_) {
      if (o.paused || !o.active)
        return this;
      var E = i(_, "onPause"), O = i(_, "onPostPause");
      return o.paused = !0, E == null || E(), g(), Q(), O == null || O(), this;
    },
    unpause: function(_) {
      if (!o.paused || !o.active)
        return this;
      var E = i(_, "onUnpause"), O = i(_, "onPostUnpause");
      return o.paused = !1, E == null || E(), m(), q(), Q(), O == null || O(), this;
    },
    updateContainerElements: function(_) {
      var E = [].concat(_).filter(Boolean);
      return o.containers = E.map(function(O) {
        return typeof O == "string" ? a.querySelector(O) : O;
      }), o.active && m(), Q(), this;
    }
  }, r.updateContainerElements(t), r;
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
}, Yi = M({
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
    const l = j(null), o = I(() => {
      const i = l.value;
      return i && (i instanceof HTMLElement ? i : i.$el);
    });
    function r() {
      return n || (n = Ui(o.value, {
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
      ae(() => t.active, (i) => {
        i && o.value ? r().activate() : n && (n.deactivate(), (!o.value || o.value.nodeType === Node.COMMENT_NODE) && (n = null));
      }, { immediate: !0, flush: "post" });
    }), ce(() => {
      n && n.deactivate(), n = null;
    }), {
      activate() {
        r().activate();
      },
      deactivate() {
        n && n.deactivate();
      },
      renderImpl() {
        if (!e.default)
          return null;
        const i = e.default().filter((u) => u.type !== ll);
        return !i || !i.length || i.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), i) : nl(i[0], { ref: l });
      }
    };
  }
}), Zi = ["aria-labelledby", "role", "open"], Ji = { class: "fr-container fr-container--fluid fr-container-md" }, eu = { class: "fr-grid-row fr-grid-row--center" }, tu = { class: "fr-modal__body" }, au = { class: "fr-modal__header" }, lu = ["title"], nu = { class: "fr-modal__content" }, ou = ["id"], ru = {
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
    const a = t, n = e, l = (x) => {
      x.key === "Escape" && m();
    }, o = I(() => a.isAlert ? "alertdialog" : "dialog"), r = j(null), i = j();
    ae(() => a.opened, (x) => {
      var F, v;
      x ? ((F = i.value) == null || F.showModal(), setTimeout(() => {
        var T;
        (T = r.value) == null || T.focus();
      }, 100)) : (v = i.value) == null || v.close(), u(x);
    });
    function u(x) {
      typeof window < "u" && document.body.classList.toggle("modal-open", x);
    }
    ne(() => {
      f(), u(a.opened);
    }), ul(() => {
      p(), u(!1);
    });
    function f() {
      document.addEventListener("keydown", l);
    }
    function p() {
      document.removeEventListener("keydown", l);
    }
    async function m() {
      var x;
      await ua(), (x = a.origin) == null || x.focus(), n("close");
    }
    const w = I(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), B = I(
      () => w.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: na } : { scale: na, ...a.icon ?? {} }
    );
    return (x, F) => x.opened ? (s(), N($(Yi), { key: 0 }, {
      default: U(() => {
        var v, T;
        return [
          d("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: i,
            "aria-labelledby": x.modalId,
            role: o.value,
            class: P(["fr-modal", { "fr-modal--opened": x.opened }]),
            open: x.opened
          }, [
            d("div", Ji, [
              d("div", eu, [
                d("div", {
                  class: P(["fr-col-12", {
                    "fr-col-md-8": x.size === "lg",
                    "fr-col-md-6": x.size === "md",
                    "fr-col-md-4": x.size === "sm"
                  }])
                }, [
                  d("div", tu, [
                    d("div", au, [
                      d("button", {
                        ref_key: "closeBtn",
                        ref: r,
                        class: "fr-btn fr-btn--close",
                        title: x.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: F[0] || (F[0] = (y) => m())
                      }, [
                        d("span", null, b(x.closeButtonLabel), 1)
                      ], 8, lu)
                    ]),
                    d("div", nu, [
                      d("h1", {
                        id: x.modalId,
                        class: "fr-modal__title"
                      }, [
                        w.value || B.value ? (s(), c("span", {
                          key: 0,
                          class: P({
                            [String(x.icon)]: w.value
                          })
                        }, [
                          x.icon && B.value ? (s(), N(le, ue(K({ key: 0 }, B.value)), null, 16)) : h("", !0)
                        ], 2)) : h("", !0),
                        V(" " + b(x.title), 1)
                      ], 8, ou),
                      L(x.$slots, "default", {}, void 0, !0)
                    ]),
                    (v = x.actions) != null && v.length || x.$slots.footer ? (s(), c("div", ru, [
                      L(x.$slots, "footer", {}, void 0, !0),
                      (T = x.actions) != null && T.length ? (s(), N(Ye, {
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
}), Ra = /* @__PURE__ */ re(su, [["__scopeId", "data-v-d11515b3"]]), iu = ["id", "aria-current"], uu = /* @__PURE__ */ M({
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
      L(e.$slots, "default", {}, void 0, !0)
    ], 8, iu));
  }
}), Na = /* @__PURE__ */ re(uu, [["__scopeId", "data-v-5909c19f"]]), du = ["href"], oa = 2, Ze = /* @__PURE__ */ M({
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
      () => n.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: oa, name: e.icon } : { scale: oa, ...e.icon || {} }
    ), o = rl() ? _e(kt) : void 0, r = (o == null ? void 0 : o()) ?? (() => {
    });
    return (i, u) => {
      const f = se("RouterLink");
      return a.value ? (s(), c("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: i.to,
        onClick: u[0] || (u[0] = (p) => {
          i.$emit("toggleId", i.id), i.onClick(p);
        })
      }, b(i.text), 9, du)) : (s(), N(f, {
        key: 1,
        class: P(["fr-nav__link", {
          [String(i.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: i.to,
        onClick: u[1] || (u[1] = (p) => {
          var m;
          $(r)(), i.$emit("toggleId", i.id), (m = i.onClick) == null || m.call(i, p);
        })
      }, {
        default: U(() => [
          i.icon && l.value ? (s(), N(le, ue(K({ key: 0 }, l.value)), null, 16)) : h("", !0),
          V(" " + b(i.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), cu = { class: "fr-col-12 fr-col-lg-3" }, fu = { class: "fr-mega-menu__category" }, pu = { class: "fr-mega-menu__list" }, Va = /* @__PURE__ */ M({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(t) {
    return (e, a) => (s(), c("div", cu, [
      d("h5", fu, [
        d("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: a[0] || (a[0] = W(() => {
          }, ["prevent"]))
        }, b(e.title), 1)
      ]),
      d("ul", pu, [
        (s(!0), c(H, null, G(e.links, (n, l) => (s(), c("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          X(Ze, K({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), vu = ["aria-expanded", "aria-current", "aria-controls"], mu = ["id"], gu = { class: "fr-container fr-container--fluid fr-container-lg" }, bu = { class: "fr-grid-row fr-grid-row-lg--gutters" }, hu = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, yu = { class: "fr-mega-menu__leader" }, ku = { class: "fr-h4 fr-mb-2v" }, wu = { class: "fr-hidden fr-displayed-lg" }, _u = /* @__PURE__ */ M({
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
      doExpand: o,
      onTransitionEnd: r
    } = me(), i = I(() => e.id === e.expandedId);
    return ae(i, (u, f) => {
      u !== f && o(u);
    }), ne(() => {
      i.value && o(!0);
    }), (u, f) => {
      const p = se("RouterLink");
      return s(), c(H, null, [
        d("button", {
          class: "fr-nav__btn",
          "aria-expanded": i.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: f[0] || (f[0] = (m) => u.$emit("toggleId", u.id))
        }, b(u.title), 9, vu),
        d("div", {
          id: u.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: P(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": $(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": $(n)
          }]),
          tabindex: "-1",
          onTransitionend: f[2] || (f[2] = (m) => $(r)(i.value))
        }, [
          d("div", gu, [
            d("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: f[1] || (f[1] = (m) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            d("div", bu, [
              d("div", hu, [
                d("div", yu, [
                  d("h4", ku, b(u.title), 1),
                  d("p", wu, [
                    V(b(u.description) + " ", 1),
                    L(u.$slots, "description", {}, void 0, !0)
                  ]),
                  X(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: U(() => [
                      V(b(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              L(u.$slots, "default", {}, void 0, !0),
              (s(!0), c(H, null, G(u.menus, (m, w) => (s(), N(Va, K({
                key: w,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, mu)
      ], 64);
    };
  }
}), ja = /* @__PURE__ */ re(_u, [["__scopeId", "data-v-7e339b1d"]]), Iu = ["id", "aria-current"], Oa = /* @__PURE__ */ M({
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
      L(e.$slots, "default")
    ], 8, Iu));
  }
}), Du = ["aria-expanded", "aria-current", "aria-controls"], xu = ["id"], Cu = { class: "fr-menu__list" }, Ha = /* @__PURE__ */ M({
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
      doExpand: o,
      onTransitionEnd: r
    } = me(), i = I(() => e.id === e.expandedId);
    return ae(i, (u, f) => {
      u !== f && o(u);
    }), ne(() => {
      i.value && o(!0);
    }), (u, f) => (s(), c(H, null, [
      d("button", {
        class: "fr-nav__btn",
        "aria-expanded": i.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: f[0] || (f[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        d("span", null, b(u.title), 1)
      ], 8, Du),
      d("div", {
        id: u.id,
        ref_key: "collapse",
        ref: a,
        class: P(["fr-collapse fr-menu", { "fr-collapse--expanded": $(l), "fr-collapsing": $(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: f[2] || (f[2] = (p) => $(r)(i.value))
      }, [
        d("ul", Cu, [
          L(u.$slots, "default"),
          (s(!0), c(H, null, G(u.links, (p, m) => (s(), N(Oa, { key: m }, {
            default: U(() => [
              X(Ze, K({ ref_for: !0 }, p, {
                onToggleId: f[1] || (f[1] = (w) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, xu)
    ], 64));
  }
}), Bu = ["id", "aria-label"], Tu = { class: "fr-nav__list" }, Eu = /* @__PURE__ */ M({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => J("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(t) {
    const e = t, a = j(void 0), n = (i) => {
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
    }, o = (i) => {
      l(i.target);
    }, r = (i) => {
      i.key === "Escape" && n(a.value);
    };
    return ne(() => {
      document.addEventListener("click", o), document.addEventListener("keydown", r);
    }), ce(() => {
      document.removeEventListener("click", o), document.removeEventListener("keydown", r);
    }), (i, u) => (s(), c("nav", {
      id: i.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": i.label
    }, [
      d("ul", Tu, [
        L(i.$slots, "default"),
        (s(!0), c(H, null, G(i.navItems, (f, p) => (s(), N(Na, { key: p }, {
          default: U(() => [
            f.to && f.text ? (s(), N(Ze, K({
              key: 0,
              ref_for: !0
            }, f, {
              "expanded-id": a.value,
              onToggleId: u[0] || (u[0] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : f.title && f.links ? (s(), N(Ha, K({
              key: 1,
              ref_for: !0
            }, f, {
              "expanded-id": a.value,
              onToggleId: u[1] || (u[1] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : f.title && f.menus ? (s(), N(ja, K({
              key: 2,
              ref_for: !0
            }, f, {
              "expanded-id": a.value,
              onToggleId: u[2] || (u[2] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : h("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, Bu));
  }
}), Su = { class: "fr-container" }, Lu = { class: "fr-notice__body" }, Au = { class: "fr-notice__title" }, Mu = { class: "fr-notice__desc" }, $u = /* @__PURE__ */ M({
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
      class: P(["fr-notice", `fr-notice--${e.type}`])
    }, [
      d("div", Su, [
        d("div", Lu, [
          d("p", null, [
            d("span", Au, [
              L(e.$slots, "default", {}, () => [
                V(b(e.title), 1)
              ])
            ]),
            d("span", Mu, [
              L(e.$slots, "desc", {}, () => [
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
}), Fu = ["aria-label"], Pu = { class: "fr-content-media__img" }, Ru = ["src", "alt", "title", "ratio"], Nu = { class: "fr-content-media__caption" }, Vu = /* @__PURE__ */ M({
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
      class: P(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      d("div", Pu, [
        L(e.$slots, "default", {}, () => [
          e.src ? (s(), c("img", {
            key: 0,
            src: e.src,
            class: P(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, Ru)) : h("", !0)
        ])
      ]),
      d("figcaption", Nu, b(e.legend), 1)
    ], 10, Fu));
  }
}), ju = { class: "fr-quote fr-quote--column" }, Ou = ["cite"], Hu = { class: "fr-quote__author" }, qu = { class: "fr-quote__source" }, Ku = ["href"], zu = {
  key: 0,
  class: "fr-quote__image"
}, Qu = ["src"], Gu = /* @__PURE__ */ M({
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
    return (e, a) => (s(), c("figure", ju, [
      e.source ? (s(), c("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        d("p", null, "« " + b(e.quote) + " »", 1)
      ], 8, Ou)) : h("", !0),
      d("figcaption", null, [
        d("p", Hu, b(e.author), 1),
        d("ul", qu, [
          d("li", null, [
            d("cite", null, b(e.source), 1)
          ]),
          (s(!0), c(H, null, G(e.details, (n, l) => (s(), c("li", { key: l }, [
            typeof n == "object" ? (s(), c("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, b(n.label), 9, Ku)) : (s(), c(H, { key: 1 }, [
              V(b(n), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (s(), c("div", zu, [
          d("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, Qu)
        ])) : h("", !0)
      ])
    ]));
  }
}), Wu = ["id", "name", "value", "checked", "disabled"], Uu = ["for"], Xu = {
  key: 0,
  class: "required"
}, Yu = {
  key: 0,
  class: "fr-hint-text"
}, Zu = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Ju = ["src", "title"], ed = { key: 0 }, td = ["href"], ad = ["href"], ld = ["href"], qa = /* @__PURE__ */ M({
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
    return (l, o) => (s(), c("div", {
      class: P(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      d("div", {
        class: P(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": l.small
        }])
      }, [
        d("input", K({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: o[0] || (o[0] = (r) => l.$emit("update:modelValue", l.value))
        }), null, 16, Wu),
        d("label", {
          for: l.id,
          class: "fr-label"
        }, [
          L(l.$slots, "label", {}, () => [
            V(b(l.label) + " ", 1),
            L(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (s(), c("span", Xu, " *")) : h("", !0)
            ])
          ]),
          l.hint ? (s(), c("span", Yu, b(l.hint), 1)) : h("", !0)
        ], 8, Uu),
        l.img || l.svgPath ? (s(), c("div", Zu, [
          l.img ? (s(), c("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: "",
            title: l.imgTitle
          }, null, 8, Ju)) : (s(), c("svg", K({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            l.imgTitle ? (s(), c("title", ed, b(l.imgTitle), 1)) : h("", !0),
            d("use", {
              class: "fr-artwork-decorative",
              href: `${l.svgPath}#artwork-decorative`
            }, null, 8, td),
            d("use", {
              class: "fr-artwork-minor",
              href: `${l.svgPath}#artwork-minor`
            }, null, 8, ad),
            d("use", {
              class: "fr-artwork-major",
              href: `${l.svgPath}#artwork-major`
            }, null, 8, ld)
          ], 16))
        ])) : h("", !0)
      ], 2)
    ], 2));
  }
}), nd = { class: "fr-form-group" }, od = ["disabled", "aria-labelledby", "aria-invalid", "role"], rd = ["id"], sd = {
  key: 0,
  class: "fr-hint-text"
}, id = {
  key: 0,
  class: "required"
}, ud = ["id"], dd = /* @__PURE__ */ M({
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
    const a = t, n = e, l = I(() => a.errorMessage || a.validMessage), o = I(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), r = (u) => {
      u !== a.modelValue && n("update:modelValue", u);
    }, i = I(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (u, f) => (s(), c("div", nd, [
      d("fieldset", {
        class: P(["fr-fieldset", {
          "fr-fieldset--error": u.errorMessage,
          "fr-fieldset--valid": u.validMessage
        }]),
        disabled: u.disabled,
        "aria-labelledby": i.value,
        "aria-invalid": u.ariaInvalid,
        role: u.errorMessage || u.validMessage ? "group" : void 0
      }, [
        u.legend || u.$slots.legend || u.hint || u.$slots.hint ? (s(), c("legend", {
          key: 0,
          id: u.titleId,
          class: "fr-fieldset__legend fr-fieldset__legend--regular"
        }, [
          L(u.$slots, "legend", {}, () => [
            V(b(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (s(), c("span", sd, [
              L(u.$slots, "hint", {}, () => [
                V(b(u.hint), 1)
              ])
            ])) : h("", !0),
            L(u.$slots, "required-tip", {}, () => [
              u.required ? (s(), c("span", id, " *")) : h("", !0)
            ])
          ])
        ], 8, rd)) : h("", !0),
        L(u.$slots, "default", {}, () => [
          (s(!0), c(H, null, G(u.options, (p, m) => (s(), N(qa, K({
            key: typeof p.value == "boolean" ? m : p.value || m,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": f[0] || (f[0] = (w) => r(w))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        l.value ? (s(), c("div", {
          key: 1,
          id: `messages-${u.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          d("p", {
            class: P(["fr-message fr-message--info flex items-center", o.value])
          }, b(l.value), 3)
        ], 8, ud)) : h("", !0)
      ], 10, od)
    ]));
  }
}), cd = ["id"], fd = ["id"], pd = { class: "fr-hint-text" }, vd = ["data-fr-prefix", "data-fr-suffix"], md = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], gd = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], bd = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, hd = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, yd = ["id"], kd = ["id"], wd = /* @__PURE__ */ M({
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
    const a = t, n = e, l = j(), o = j(), r = j(), i = I(() => a.lowerValue !== void 0), u = I(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * r.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * r.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), f = I(() => {
      const m = (a.modelValue - a.min) / (a.max - a.min) * r.value - (i.value ? 12 : 0), w = ((a.lowerValue ?? 0) - a.min) / (a.max - a.min) * r.value;
      return {
        "--progress-right": `${m + 24}px`,
        ...i.value ? { "--progress-left": `${w + 12}px` } : {}
      };
    });
    ae([() => a.modelValue, () => a.lowerValue], ([m, w]) => {
      w !== void 0 && (i.value && m < w && n("update:lowerValue", m), i.value && w > m && n("update:modelValue", w));
    });
    const p = I(() => (a.prefix ?? "").concat(i.value ? `${a.lowerValue} - ` : "").concat(`${a.modelValue}`).concat(a.suffix ?? ""));
    return ne(() => {
      var m;
      r.value = (m = l.value) == null ? void 0 : m.offsetWidth;
    }), (m, w) => (s(), c("div", {
      id: `${m.id}-group`,
      class: P(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      d("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        L(m.$slots, "label", {}, () => [
          V(b(m.label), 1)
        ]),
        d("span", pd, [
          L(m.$slots, "hint", {}, () => [
            V(b(m.hint), 1)
          ])
        ])
      ], 8, fd),
      d("div", {
        class: P(["fr-range", {
          "fr-range--sm": m.small,
          "fr-range--double": i.value,
          "fr-range-group--disabled": m.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": m.prefix ?? void 0,
        "data-fr-suffix": m.suffix ?? void 0,
        style: de(f.value)
      }, [
        d("span", {
          ref_key: "output",
          ref: o,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: de(u.value)
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
          onInput: w[0] || (w[0] = (B) => {
            var x;
            return n("update:lowerValue", +((x = B.target) == null ? void 0 : x.value));
          })
        }, null, 40, md)) : h("", !0),
        d("input", {
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
          onInput: w[1] || (w[1] = (B) => {
            var x;
            return n("update:modelValue", +((x = B.target) == null ? void 0 : x.value));
          })
        }, null, 40, gd),
        m.hideIndicators ? h("", !0) : (s(), c("span", bd, b(m.min), 1)),
        m.hideIndicators ? h("", !0) : (s(), c("span", hd, b(m.max), 1))
      ], 14, vd),
      m.message || m.$slots.messages ? (s(), c("div", {
        key: 0,
        id: `${m.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        L(m.$slots, "messages", {}, () => [
          m.message ? (s(), c("p", {
            key: 0,
            id: `${m.id}-message-error`,
            class: "fr-message fr-message--error"
          }, b(m.message), 9, kd)) : h("", !0)
        ])
      ], 8, yd)) : h("", !0)
    ], 10, cd));
  }
}), _d = { class: "fr-segmented__element" }, Id = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Dd = ["for"], xd = { key: 1 }, Ka = /* @__PURE__ */ M({
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
    return (l, o) => (s(), c("div", _d, [
      d("input", K({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: o[0] || (o[0] = (r) => l.$emit("update:modelValue", l.value))
      }), null, 16, Id),
      d("label", {
        for: l.id,
        class: P(["fr-label", { [n.value]: n.value }])
      }, [
        l.icon && !n.value ? (s(), N(le, ue(K({ key: 0 }, a.value)), null, 16)) : h("", !0),
        l.icon ? (s(), c("span", xd, " ")) : h("", !0),
        V(" " + b(l.label), 1)
      ], 10, Dd)
    ]));
  }
}), Cd = { class: "fr-form-group" }, Bd = ["disabled"], Td = ["id"], Ed = {
  key: 0,
  class: "fr-hint-text"
}, Sd = { class: "fr-segmented__elements" }, Ld = /* @__PURE__ */ M({
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
    const a = t, n = e, l = (o) => {
      o !== a.modelValue && n("update:modelValue", o);
    };
    return (o, r) => (s(), c("div", Cd, [
      d("fieldset", {
        class: P(["fr-segmented", {
          "fr-segmented--sm": o.small,
          "fr-segmented--no-legend": !o.legend
        }]),
        disabled: o.disabled
      }, [
        o.legend ? (s(), c("legend", {
          key: 0,
          id: o.titleId,
          class: P(["fr-segmented__legend", {
            "fr-segmented__legend--inline": o.inline
          }])
        }, [
          L(o.$slots, "legend", {}, () => [
            V(b(o.legend), 1)
          ]),
          o.hint ? (s(), c("span", Ed, b(o.hint), 1)) : h("", !0)
        ], 10, Td)) : h("", !0),
        d("div", Sd, [
          L(o.$slots, "default", {}, () => [
            (s(!0), c(H, null, G(o.options, (i, u) => (s(), N(Ka, K({
              key: i.value || u,
              name: o.name || i.name,
              ref_for: !0
            }, { ...i, disabled: o.disabled || i.disabled }, {
              "model-value": o.modelValue,
              "onUpdate:modelValue": r[0] || (r[0] = (f) => l(f))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Bd)
    ]));
  }
}), Ad = ["for"], Md = {
  key: 0,
  class: "required"
}, $d = {
  key: 0,
  class: "fr-hint-text"
}, Fd = ["id", "name", "disabled", "aria-disabled", "required"], Pd = ["selected"], Rd = ["selected", "value", "disabled", "aria-disabled"], Nd = ["id"], Vd = /* @__PURE__ */ M({
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
    return (l, o) => (s(), c("div", {
      class: P(["fr-select-group", { [`fr-select-group--${n.value}`]: a.value }])
    }, [
      d("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        L(l.$slots, "label", {}, () => [
          V(b(l.label) + " ", 1),
          L(l.$slots, "required-tip", {}, () => [
            l.required ? (s(), c("span", Md, " *")) : h("", !0)
          ])
        ]),
        l.description ? (s(), c("span", $d, b(l.description), 1)) : h("", !0)
      ], 8, Ad),
      d("select", K({
        id: l.selectId,
        class: [{ [`fr-select--${n.value}`]: a.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: o[0] || (o[0] = (r) => {
          var i;
          return l.$emit("update:modelValue", (i = r.target) == null ? void 0 : i.value);
        })
      }), [
        d("option", {
          selected: l.modelValue == null,
          disabled: "",
          hidden: ""
        }, b(l.defaultUnselectedText), 9, Pd),
        (s(!0), c(H, null, G(l.options, (r, i) => (s(), c("option", {
          key: i,
          selected: l.modelValue === r || typeof r == "object" && r.value === l.modelValue,
          value: typeof r == "object" ? r.value : r,
          disabled: !!(typeof r == "object" && r.disabled),
          "aria-disabled": !!(typeof r == "object" && r.disabled)
        }, b(typeof r == "object" ? r.text : r), 9, Rd))), 128))
      ], 16, Fd),
      a.value ? (s(), c("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: P(`fr-${n.value}-text`)
      }, b(a.value), 11, Nd)) : h("", !0)
    ], 2));
  }
}), jd = { class: "fr-share" }, Od = { class: "fr-share__title" }, Hd = { class: "fr-btns-group" }, qd = ["title", "href", "onClick"], Kd = { key: 0 }, zd = ["href", "title"], Qd = ["title"], Gd = /* @__PURE__ */ M({
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
      var o;
      return s(), c("div", jd, [
        d("p", Od, b(n.title), 1),
        d("ul", Hd, [
          (s(!0), c(H, null, G(n.networks, (r, i) => (s(), c("li", { key: i }, [
            d("a", {
              class: P(`fr-btn fr-btn--${r.name}`),
              title: `${r.label} - nouvelle fenêtre`,
              href: r.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: W((u) => a(r), ["prevent"])
            }, b(r.label), 11, qd)
          ]))), 128)),
          (o = n.mail) != null && o.to ? (s(), c("li", Kd, [
            d("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, b(n.mail.label), 9, zd)
          ])) : h("", !0),
          d("li", null, [
            d("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: l[0] || (l[0] = (r) => e())
            }, b(n.copyLabel), 9, Qd)
          ])
        ])
      ]);
    };
  }
}), Wd = ["aria-current", "aria-expanded", "aria-controls"], za = /* @__PURE__ */ M({
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
      L(e.$slots, "default")
    ], 8, Wd));
  }
}), Qa = /* @__PURE__ */ M({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (s(), c("li", {
      class: P(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      L(e.$slots, "default")
    ], 2));
  }
}), Ud = ["id"], Xd = { class: "fr-sidemenu__list" }, Ga = /* @__PURE__ */ M({
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
      doExpand: o,
      onTransitionEnd: r
    } = me();
    ae(() => e.expanded, (p, m) => {
      p !== m && o(p);
    }), ne(() => {
      e.expanded && o(!0);
    });
    const i = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => i(p) ? "a" : "RouterLink", f = (p) => ({ [i(p) ? "href" : "to"]: p });
    return (p, m) => {
      const w = se("DsfrSideMenuList", !0);
      return s(), c("div", {
        id: p.id,
        ref_key: "collapse",
        ref: a,
        class: P({
          "fr-collapse": p.collapsable,
          "fr-collapsing": $(n),
          "fr-collapse--expanded": $(l)
        }),
        onTransitionend: m[2] || (m[2] = (B) => $(r)(!!p.expanded))
      }, [
        d("ul", Xd, [
          L(p.$slots, "default"),
          (s(!0), c(H, null, G(p.menuItems, (B, x) => (s(), N(Qa, {
            key: x,
            active: B.active
          }, {
            default: U(() => [
              B.menuItems ? h("", !0) : (s(), N(oe(u(B.to)), K({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": B.active ? "page" : void 0,
                ref_for: !0
              }, f(B.to)), {
                default: U(() => [
                  V(b(B.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              B.menuItems ? (s(), c(H, { key: 1 }, [
                X(za, {
                  active: !!B.active,
                  expanded: !!B.expanded,
                  "control-id": B.id,
                  onToggleExpand: m[0] || (m[0] = (F) => p.$emit("toggleExpand", F))
                }, {
                  default: U(() => [
                    V(b(B.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                B.menuItems ? (s(), N(w, {
                  key: 0,
                  id: B.id,
                  collapsable: "",
                  expanded: B.expanded,
                  "menu-items": B.menuItems,
                  onToggleExpand: m[1] || (m[1] = (F) => p.$emit("toggleExpand", F))
                }, null, 8, ["id", "expanded", "menu-items"])) : h("", !0)
              ], 64)) : h("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, Ud);
    };
  }
}), Yd = ["aria-labelledby"], Zd = { class: "fr-sidemenu__inner" }, Jd = ["aria-controls", "aria-expanded"], ec = ["id"], tc = { class: "fr-sidemenu__title" }, ac = /* @__PURE__ */ M({
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
      onTransitionEnd: o
    } = me(), r = j(!1);
    return ae(r, (i, u) => {
      i !== u && l(i);
    }), (i, u) => (s(), c("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": i.id
    }, [
      d("div", Zd, [
        d("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": i.id,
          "aria-expanded": r.value,
          onClick: u[0] || (u[0] = W((f) => r.value = !r.value, ["prevent", "stop"]))
        }, b(i.buttonLabel), 9, Jd),
        d("div", {
          id: i.id,
          ref_key: "collapse",
          ref: e,
          class: P(["fr-collapse", {
            "fr-collapse--expanded": $(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": $(a)
          }]),
          onTransitionend: u[2] || (u[2] = (f) => $(o)(r.value))
        }, [
          d("div", tc, b(i.headingTitle), 1),
          L(i.$slots, "default", {}, () => [
            X(Ga, {
              id: i.sideMenuListId,
              "menu-items": i.menuItems,
              onToggleExpand: u[1] || (u[1] = (f) => i.$emit("toggleExpand", f))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, ec)
      ])
    ], 8, Yd));
  }
}), lc = /* @__PURE__ */ M({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = I(() => typeof e.to == "string" && e.to.startsWith("http")), n = I(() => a.value ? "a" : "RouterLink"), l = I(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (o, r) => (s(), N(oe(n.value), K({
      "aria-current": o.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: U(() => [
        L(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), nc = { class: "fr-skiplinks" }, oc = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, rc = { class: "fr-skiplinks__list" }, sc = ["href", "onClick"], ic = /* @__PURE__ */ M({
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
      d("nav", oc, [
        d("ul", rc, [
          (s(!0), c(H, null, G(a.links, (l) => (s(), c("li", {
            key: l.id
          }, [
            d("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: W((o) => e(l.id), ["prevent"])
            }, b(l.text), 9, sc)
          ]))), 128))
        ])
      ])
    ]));
  }
}), uc = { class: "fr-stepper" }, dc = { class: "fr-stepper__title" }, cc = { class: "fr-stepper__state" }, fc = ["data-fr-current-step", "data-fr-steps"], pc = { class: "fr-stepper__details" }, vc = {
  key: 0,
  class: "fr-text--bold"
}, mc = /* @__PURE__ */ M({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (s(), c("div", uc, [
      d("h2", dc, [
        V(b(e.steps[e.currentStep - 1]) + " ", 1),
        d("span", cc, "Étape " + b(e.currentStep) + " sur " + b(e.steps.length), 1)
      ]),
      d("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, fc),
      d("p", pc, [
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
}, hc = { class: "fr-summary__list" }, yc = ["href"], kc = /* @__PURE__ */ M({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (s(), c("nav", gc, [
      d("h2", bc, b(e.title), 1),
      d("ol", hc, [
        (s(!0), c(H, null, G(e.anchors, (n, l) => (s(), c("li", { key: l }, [
          d("a", {
            class: "fr-summary__link",
            href: n.link
          }, b(n.name), 9, yc)
        ]))), 128))
      ])
    ]));
  }
}), wc = ["id", "aria-labelledby", "tabindex"], _c = /* @__PURE__ */ M({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(t) {
    ia((u) => ({
      "7152af7e": r.value,
      "2a62e962": i.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, n = _e(Ge), { isVisible: l, asc: o } = n(Me(() => e.tabId)), r = I(() => a[String(o == null ? void 0 : o.value)]), i = I(() => a[String(!(o != null && o.value))]);
    return (u, f) => (s(), N(dl, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: U(() => [
        pe(d("div", {
          id: u.panelId,
          class: P(["fr-tabs__panel", {
            "fr-tabs__panel--selected": $(l)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: $(l) ? 0 : -1
        }, [
          L(u.$slots, "default", {}, void 0, !0)
        ], 10, wc), [
          [sa, $(l)]
        ])
      ]),
      _: 3
    }));
  }
}), Wa = /* @__PURE__ */ re(_c, [["__scopeId", "data-v-5774b16c"]]), Ic = { role: "presentation" }, Dc = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], xc = {
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
    const a = t, n = e, l = j(null), o = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      ArrowDown: "next",
      ArrowUp: "previous",
      Home: "first",
      End: "last"
    };
    function r(f) {
      const p = f == null ? void 0 : f.key, m = o[p];
      m && n(m);
    }
    const i = _e(Ge), { isVisible: u } = i(Me(() => a.tabId));
    return (f, p) => (s(), c("li", Ic, [
      d("button", {
        id: f.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${f.tabId}`,
        class: "fr-tabs__tab",
        tabindex: $(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": $(u),
        "aria-controls": f.panelId,
        onClick: p[0] || (p[0] = W((m) => f.$emit("click", f.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (m) => r(m))
      }, [
        f.icon ? (s(), c("span", xc, [
          X(le, { name: f.icon }, null, 8, ["name"])
        ])) : h("", !0),
        L(f.$slots, "default")
      ], 40, Dc)
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
    const e = t, a = I(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = I(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, o) => (s(), c("th", K(l.headerAttrs, { scope: "col" }), [
      V(b(l.header) + " ", 1),
      l.icon && !a.value ? (s(), N(le, ue(K({ key: 0 }, n.value)), null, 16)) : h("", !0),
      a.value ? (s(), c("span", {
        key: 1,
        class: P({ [String(l.icon)]: a.value })
      }, null, 2)) : h("", !0)
    ], 16));
  }
}), Cc = { key: 0 }, Ya = /* @__PURE__ */ M({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (s(), c("tr", Cc, [
      (s(!0), c(H, null, G(e.headers, (n, l) => (s(), N(Xa, {
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
    const e = t, a = I(() => typeof e.field == "object" && e.field !== null && e.field.component ? e.field.component : !1), n = I(() => ["string", "number", "boolean"].includes(typeof e.field));
    return (l, o) => (s(), c("td", ue(gt(l.cellAttrs)), [
      a.value ? (s(), N(oe(a.value), ue(K({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: U(() => [
          V(b(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (s(), c(H, { key: 1 }, [
        V(b(n.value ? l.field : l.field.text), 1)
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
    return (e, a) => (s(), c("tr", ue(gt(e.rowAttrs)), [
      L(e.$slots, "default"),
      (s(!0), c(H, null, G(e.rowData, (n, l) => (s(), N(Za, {
        key: l,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Bc = { class: "caption" }, Tc = { key: 1 }, Ec = ["colspan"], Sc = { class: "flex justify-right" }, Lc = { class: "self-center" }, Ac = ["value"], Mc = { class: "flex ml-1" }, $c = { class: "self-center" }, Fc = { class: "flex ml-1" }, Pc = /* @__PURE__ */ M({
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
    const a = t, n = e, l = (v) => Array.isArray(v) ? v : v.rowData, o = j(a.currentPage), r = j(a.resultsDisplayed), i = j(
      a.rows.length > r.value ? Math.ceil(a.rows.length / r.value) : 1
    ), u = [5, 10, 25, 50, 100], f = () => o.value * r.value - r.value, p = () => o.value * r.value;
    ae(
      () => r.value,
      (v) => {
        i.value = a.rows.length > r.value ? Math.ceil(a.rows.length / v) : 1;
      }
    );
    const m = I(() => a.pagination ? a.rows.slice(f(), p()) : a.rows), w = () => {
      o.value = 1, n("update:currentPage");
    }, B = () => {
      o.value > 1 && (o.value -= 1, n("update:currentPage"));
    }, x = () => {
      o.value < i.value && (o.value += 1, n("update:currentPage"));
    }, F = () => {
      o.value = i.value, n("update:currentPage");
    };
    return (v, T) => (s(), c("div", {
      class: P(["fr-table", { "fr-table--no-caption": v.noCaption }])
    }, [
      d("table", null, [
        d("caption", Bc, b(v.title), 1),
        d("thead", null, [
          L(v.$slots, "header", {}, () => [
            v.headers && v.headers.length ? (s(), N(Ya, {
              key: 0,
              headers: v.headers
            }, null, 8, ["headers"])) : h("", !0)
          ], !0)
        ]),
        d("tbody", null, [
          L(v.$slots, "default", {}, void 0, !0),
          v.rows && v.rows.length ? (s(!0), c(H, { key: 0 }, G(m.value, (y, D) => (s(), N(Ja, {
            key: v.rowKey && l(y) ? typeof v.rowKey == "string" ? l(y)[v.headers.indexOf(v.rowKey)].toString() : v.rowKey(l(y)) : D,
            "row-data": l(y),
            "row-attrs": "rowAttrs" in y ? y.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : h("", !0),
          v.pagination ? (s(), c("tr", Tc, [
            d("td", {
              colspan: v.headers.length
            }, [
              d("div", Sc, [
                d("div", Lc, [
                  T[6] || (T[6] = d("span", null, "Résultats par page : ", -1)),
                  pe(d("select", {
                    "onUpdate:modelValue": T[0] || (T[0] = (y) => r.value = y),
                    onChange: T[1] || (T[1] = (y) => n("update:currentPage"))
                  }, [
                    (s(), c(H, null, G(u, (y, D) => d("option", {
                      key: D,
                      value: y
                    }, b(y), 9, Ac)), 64))
                  ], 544), [
                    [ht, r.value]
                  ])
                ]),
                d("div", Mc, [
                  d("span", $c, "Page " + b(o.value) + " sur " + b(i.value), 1)
                ]),
                d("div", Fc, [
                  d("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: T[2] || (T[2] = (y) => w())
                  }),
                  d("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: T[3] || (T[3] = (y) => B())
                  }),
                  d("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (y) => x())
                  }),
                  d("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: T[5] || (T[5] = (y) => F())
                  })
                ])
              ])
            ], 8, Ec)
          ])) : h("", !0)
        ])
      ])
    ], 2));
  }
}), Rc = /* @__PURE__ */ re(Pc, [["__scopeId", "data-v-3998acc8"]]), Nc = ["aria-label"], Vc = /* @__PURE__ */ M({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: e, emit: a }) {
    const n = t, l = a, o = j(!1), r = I({
      get: () => n.modelValue,
      set(C) {
        l("update:modelValue", C);
      }
    }), i = j(/* @__PURE__ */ new Map()), u = j(0);
    ve(Ge, (C) => {
      const q = j(!0);
      if (ae(r, (k, Q) => {
        q.value = k > Q;
      }), [...i.value.values()].includes(C.value))
        return { isVisible: I(() => i.value.get(r.value) === C.value), asc: q };
      const g = u.value++;
      i.value.set(g, C.value);
      const S = I(() => g === r.value);
      return ae(C, () => {
        i.value.set(g, C.value);
      }), ce(() => {
        i.value.delete(g);
      }), { isVisible: S };
    });
    const f = j(null), p = j(null), m = sl({}), w = (C) => {
      if (m[C])
        return m[C];
      const q = J("tab");
      return m[C] = q, q;
    }, B = async () => {
      const C = r.value === 0 ? n.tabTitles.length - 1 : r.value - 1;
      o.value = !1, r.value = C;
    }, x = async () => {
      const C = r.value === n.tabTitles.length - 1 ? 0 : r.value + 1;
      o.value = !0, r.value = C;
    }, F = async () => {
      r.value = 0;
    }, v = async () => {
      r.value = n.tabTitles.length - 1;
    }, T = j({ "--tabs-height": "100px" }), y = () => {
      var C;
      if (r.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const q = p.value.offsetHeight, g = (C = f.value) == null ? void 0 : C.querySelectorAll(".fr-tabs__panel")[r.value];
      if (!g || !g.offsetHeight)
        return;
      const S = g.offsetHeight;
      T.value["--tabs-height"] = `${q + S}px`;
    }, D = j(null);
    return ne(() => {
      var C;
      window.ResizeObserver && (D.value = new window.ResizeObserver(() => {
        y();
      })), (C = f.value) == null || C.querySelectorAll(".fr-tabs__panel").forEach((q) => {
        var g;
        q && ((g = D.value) == null || g.observe(q));
      });
    }), ce(() => {
      var C;
      (C = f.value) == null || C.querySelectorAll(".fr-tabs__panel").forEach((q) => {
        var g;
        q && ((g = D.value) == null || g.unobserve(q));
      });
    }), e({
      renderTabs: y,
      selectFirst: F,
      selectLast: v
    }), (C, q) => (s(), c("div", {
      ref_key: "$el",
      ref: f,
      class: "fr-tabs",
      style: de(T.value)
    }, [
      d("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": C.tabListName
      }, [
        L(C.$slots, "tab-items", {}, () => [
          (s(!0), c(H, null, G(C.tabTitles, (g, S) => (s(), N(Ua, {
            key: S,
            icon: g.icon,
            "panel-id": g.panelId || `${w(S)}-panel`,
            "tab-id": g.tabId || w(S),
            onClick: (k) => r.value = S,
            onNext: q[0] || (q[0] = (k) => x()),
            onPrevious: q[1] || (q[1] = (k) => B()),
            onFirst: q[2] || (q[2] = (k) => F()),
            onLast: q[3] || (q[3] = (k) => v())
          }, {
            default: U(() => [
              V(b(g.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, Nc),
      (s(!0), c(H, null, G(C.tabContents, (g, S) => {
        var k, Q, _, E;
        return s(), N(Wa, {
          key: S,
          "panel-id": ((Q = (k = C.tabTitles) == null ? void 0 : k[S]) == null ? void 0 : Q.panelId) || `${w(S)}-panel`,
          "tab-id": ((E = (_ = C.tabTitles) == null ? void 0 : _[S]) == null ? void 0 : E.tabId) || w(S)
        }, {
          default: U(() => [
            V(b(g), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      L(C.$slots, "default")
    ], 4));
  }
}), jc = /* @__PURE__ */ M({
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
    const e = t, a = I(() => typeof e.link == "string" && e.link.startsWith("http")), n = I(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = I(() => ({ [a.value ? "href" : "to"]: e.link })), o = I(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), r = e.small ? 0.65 : 0.9, i = I(() => o.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: r } : { scale: r, ...e.icon ?? {} });
    return (u, f) => (s(), N(oe(n.value), K({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: o.value,
        "fr-tag--icon-left": o.value
      }],
      disabled: u.disabled
    }, l.value), {
      default: U(() => [
        e.icon && !o.value ? (s(), N(le, K({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: "fr-mr-1v"
        }, i.value), null, 16, ["label"])) : h("", !0),
        u.iconOnly ? h("", !0) : (s(), c(H, { key: 1 }, [
          V(b(u.label), 1)
        ], 64)),
        L(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), Lt = /* @__PURE__ */ re(jc, [["__scopeId", "data-v-f6a89dc8"]]), Oc = { class: "fr-tags-group" }, Hc = /* @__PURE__ */ M({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (s(), c("ul", Oc, [
      (s(!0), c(H, null, G(e.tags, ({ icon: n, label: l, ...o }, r) => (s(), c("li", { key: r }, [
        X(Lt, K({ ref_for: !0 }, o, {
          icon: n,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), qc = { class: "fr-tile__body" }, Kc = { class: "fr-tile__content" }, zc = ["download", "href"], Qc = {
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
}, Yc = ["src"], Zc = ["href"], Jc = ["href"], ef = ["href"], tf = /* @__PURE__ */ M({
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
    return (l, o) => {
      const r = se("RouterLink");
      return s(), c("div", {
        class: P(["fr-tile fr-enlarge-link", [{
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
        d("div", qc, [
          d("div", Kc, [
            (s(), N(oe(l.titleTag), { class: "fr-tile__title" }, {
              default: U(() => [
                n.value ? (s(), c("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, b(l.title), 9, zc)) : h("", !0),
                n.value ? h("", !0) : (s(), N(r, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: U(() => [
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
              L(l.$slots, "start-details", {}, void 0, !0)
            ])) : h("", !0)
          ])
        ]),
        d("div", Uc, [
          L(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (s(), c("div", Xc, [
            l.imgSrc ? (s(), c("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Yc)) : (s(), c("svg", K({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...a, ...l.svgAttrs }), [
              d("use", {
                class: "fr-artwork-decorative",
                href: `${l.svgPath}#artwork-decorative`
              }, null, 8, Zc),
              d("use", {
                class: "fr-artwork-minor",
                href: `${l.svgPath}#artwork-minor`
              }, null, 8, Jc),
              d("use", {
                class: "fr-artwork-major",
                href: `${l.svgPath}#artwork-major`
              }, null, 8, ef)
            ], 16))
          ])) : h("", !0)
        ])
      ], 2);
    };
  }
}), el = /* @__PURE__ */ re(tf, [["__scopeId", "data-v-f4d836a2"]]), af = { class: "fr-grid-row fr-grid-row--gutters" }, lf = /* @__PURE__ */ M({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (s(), c("div", af, [
      (s(!0), c(H, null, G(e.tiles, (n, l) => (s(), c("div", {
        key: l,
        class: P({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        X(el, K({
          horizontal: e.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), nf = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], of = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], rf = ["id"], sf = /* @__PURE__ */ M({
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
      class: P(["fr-toggle", {
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
        onInput: l[0] || (l[0] = (o) => n.$emit("update:modelValue", o.target.checked))
      }, null, 40, nf),
      d("label", {
        id: a.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, b(n.label), 9, of),
      n.hint ? (s(), c("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, b(n.hint), 9, rf)) : h("", !0)
    ], 2));
  }
}), uf = ["id"], df = /* @__PURE__ */ M({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => J("tooltip") }
  },
  setup(t) {
    const e = t, a = j(!1), n = j(null), l = j(null), o = j("0px"), r = j("0px"), i = j("0px"), u = j(!1), f = j(0);
    async function p() {
      var y, D, C, q, g, S;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((ee) => setTimeout(ee, 100));
      const k = (y = n.value) == null ? void 0 : y.getBoundingClientRect().top, Q = (D = n.value) == null ? void 0 : D.offsetHeight, _ = (C = n.value) == null ? void 0 : C.offsetWidth, E = (q = n.value) == null ? void 0 : q.getBoundingClientRect().left, O = (g = l.value) == null ? void 0 : g.offsetHeight, A = (S = l.value) == null ? void 0 : S.offsetWidth, R = !(k - O < 0) && k + Q + O >= document.documentElement.offsetHeight;
      u.value = R;
      const z = E + _ >= document.documentElement.offsetWidth, Z = E + _ / 2 - A / 2 <= 0;
      r.value = R ? `${k - O + 8}px` : `${k + Q - 8}px`, f.value = 1, o.value = z ? `${E + _ - A - 4}px` : Z ? `${E + 4}px` : `${E + _ / 2 - A / 2}px`, i.value = z ? `${A / 2 - _ / 2 + 4}px` : Z ? `${-(A / 2) + _ / 2 - 4}px` : "0px";
    }
    ae(a, p, { immediate: !0 }), ne(() => {
      window.addEventListener("scroll", p);
    }), ce(() => {
      window.removeEventListener("scroll", p);
    });
    const m = I(() => `transform: translate(${o.value}, ${r.value}); --arrow-x: ${i.value}; opacity: ${f.value};'`), w = I(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), B = (y) => {
      var D, C;
      a.value && (y.target === n.value || (D = n.value) != null && D.contains(y.target) || y.target === l.value || (C = l.value) != null && C.contains(y.target) || (a.value = !1));
    }, x = (y) => {
      y.key === "Escape" && (a.value = !1);
    };
    ne(() => {
      document.documentElement.addEventListener("click", B), document.documentElement.addEventListener("keydown", x);
    }), ce(() => {
      document.documentElement.removeEventListener("click", B), document.documentElement.removeEventListener("keydown", x);
    });
    const F = () => {
      e.onHover && (a.value = !0);
    }, v = () => {
      e.onHover && (a.value = !1);
    }, T = () => {
      e.onHover || (a.value = !a.value);
    };
    return (y, D) => (s(), c(H, null, [
      (s(), N(oe(y.onHover ? "a" : "button"), {
        id: `link-${y.id}`,
        ref_key: "source",
        ref: n,
        class: P(y.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": y.id,
        href: y.onHover ? "#" : void 0,
        onClick: D[0] || (D[0] = W((C) => T(), ["stop"])),
        onMouseenter: D[1] || (D[1] = (C) => F()),
        onMouseleave: D[2] || (D[2] = (C) => v()),
        onFocus: D[3] || (D[3] = (C) => F()),
        onBlur: D[4] || (D[4] = (C) => v())
      }, {
        default: U(() => [
          L(y.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      d("span", {
        id: y.id,
        ref_key: "tooltip",
        ref: l,
        class: P(["fr-tooltip fr-placement", w.value]),
        style: de(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, b(y.content), 15, uf)
    ], 64));
  }
}), cf = /* @__PURE__ */ re(df, [["__scopeId", "data-v-67870551"]]), ff = { class: "fr-transcription" }, pf = ["aria-expanded", "aria-controls"], vf = ["id"], mf = ["id", "aria-labelledby"], gf = { class: "fr-container fr-container--fluid fr-container-md" }, bf = { class: "fr-grid-row fr-grid-row--center" }, hf = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, yf = { class: "fr-modal__body" }, kf = { class: "fr-modal__header" }, wf = ["aria-controls"], _f = { class: "fr-modal__content" }, If = ["id"], Df = { class: "fr-transcription__footer" }, xf = { class: "fr-transcription__actions-group" }, Cf = ["aria-controls"], tl = /* @__PURE__ */ M({
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
      doExpand: o,
      onTransitionEnd: r
    } = me(), i = j(!1), u = j(!1), f = I(() => `fr-transcription__modal-${e.id}`), p = I(() => `fr-transcription__collapse-${e.id}`);
    return ae(u, (m, w) => {
      m !== w && o(m);
    }), (m, w) => (s(), c("div", ff, [
      d("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: w[0] || (w[0] = (B) => u.value = !u.value)
      }, " Transcription ", 8, pf),
      d("div", {
        id: p.value,
        ref_key: "collapse",
        ref: a,
        class: P(["fr-collapse", { "fr-collapse--expanded": $(l), "fr-collapsing": $(n) }]),
        onTransitionend: w[2] || (w[2] = (B) => $(r)(u.value))
      }, [
        d("dialog", {
          id: f.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${f.value}-title`
        }, [
          d("div", gf, [
            d("div", bf, [
              d("div", hf, [
                d("div", yf, [
                  d("div", kf, [
                    d("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": f.value,
                      title: "Fermer"
                    }, " Fermer ", 8, wf)
                  ]),
                  d("div", _f, [
                    d("h1", {
                      id: `${f.value}-title`,
                      class: "fr-modal__title"
                    }, b(m.title), 9, If),
                    V(" " + b(m.content), 1)
                  ]),
                  d("div", Df, [
                    d("div", xf, [
                      d("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": f.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: w[1] || (w[1] = (B) => i.value = !0)
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
          onClose: w[3] || (w[3] = (B) => i.value = !1)
        }, {
          default: U(() => [
            L(m.$slots, "default", {}, () => [
              V(b(m.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Bf = ["src"], Tf = { class: "fr-content-media__caption" }, Ef = /* @__PURE__ */ M({
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
    return (e, a) => (s(), c(H, null, [
      d("figure", {
        class: P(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        d("div", {
          class: P(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          d("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Bf)
        ], 2),
        d("div", Tf, b(e.legend), 1)
      ], 2),
      X(tl, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Sf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: bl,
  DsfrAccordionsGroup: yl,
  DsfrAlert: _l,
  DsfrBackToTop: Il,
  DsfrBadge: da,
  DsfrBreadcrumb: Sl,
  DsfrButton: $e,
  DsfrButtonGroup: Ye,
  DsfrCallout: Hn,
  DsfrCard: ao,
  DsfrCardDetail: ft,
  DsfrCheckbox: Bt,
  DsfrCheckboxSet: vo,
  DsfrConsent: ho,
  DsfrDataTable: Jo,
  DsfrErrorPage: sr,
  DsfrFieldset: fr,
  DsfrFileDownload: Ca,
  DsfrFileDownloadList: br,
  DsfrFileUpload: Dr,
  DsfrFollow: zr,
  DsfrFooter: ws,
  DsfrFooterLink: Ea,
  DsfrFooterLinkList: xs,
  DsfrFooterPartners: Sa,
  DsfrFranceConnect: Es,
  DsfrHeader: gi,
  DsfrHeaderMenuLink: St,
  DsfrHeaderMenuLinks: pt,
  DsfrHighlight: bi,
  DsfrInput: Et,
  DsfrInputGroup: Ii,
  DsfrLanguageSelector: Le,
  DsfrLogo: Se,
  DsfrModal: Ra,
  DsfrNavigation: Eu,
  DsfrNavigationItem: Na,
  DsfrNavigationMegaMenu: ja,
  DsfrNavigationMegaMenuCategory: Va,
  DsfrNavigationMenu: Ha,
  DsfrNavigationMenuItem: Oa,
  DsfrNavigationMenuLink: Ze,
  DsfrNewsLetter: Ba,
  DsfrNotice: $u,
  DsfrPagination: Tt,
  DsfrPicture: Vu,
  DsfrQuote: Gu,
  DsfrRadioButton: qa,
  DsfrRadioButtonSet: dd,
  DsfrRange: wd,
  DsfrSearchBar: Ae,
  DsfrSegmented: Ka,
  DsfrSegmentedSet: Ld,
  DsfrSelect: Vd,
  DsfrShare: Gd,
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
  DsfrTag: Lt,
  DsfrTags: Hc,
  DsfrTile: el,
  DsfrTiles: lf,
  DsfrToggleSwitch: sf,
  DsfrTooltip: cf,
  DsfrTranscription: tl,
  DsfrVideo: Ef,
  VIcon: le,
  registerAccordionKey: yt,
  registerNavigationLinkKey: kt,
  registerTabKey: Ge
}, Symbol.toStringTag, { value: "Module" })), Lf = {
  install: (t, { components: e } = {}) => {
    Object.entries(Sf).forEach(([a, n]) => {
      (e === void 0 || e === "all" || e.map(({ name: l }) => l).includes(a)) && t.component(a, n);
    }), t.component("VIcon", le);
  }
}, Af = {
  _searchAndFilterList: function(t, e, a, n, l) {
    let o = this.$data.vueData[t];
    if (n && (o = o.filter(n)), l != null && l.trim() !== "") {
      const r = this.unaccentLower(l);
      o = o.filter((i) => this.unaccentLower(i[a].toString()).indexOf(r) > -1);
    }
    return o;
  },
  dsfrTransformListForSelection: function(t, e, a, n, l, o) {
    let i = this._searchAndFilterList(t, e, a, l, o).map(function(u) {
      return { value: u[e], text: u[a].toString() };
    });
    return n != null && n !== "" && i.unshift({ value: "", text: n }), i;
  },
  dsfrTransformListForRadio: function(t, e, a, n, l, o, r) {
    return this._searchAndFilterList(t, e, a, o, r).map(function(u) {
      return {
        value: u[e],
        label: u[a].toString(),
        hint: u[l],
        disabled: u[n]
      };
    });
  },
  dsfrTransformListForCheckbox: function(t, e, a, n, l, o, r, i) {
    return this._searchAndFilterList(t, e, a, r, i).map(function(f) {
      return {
        value: f[e],
        label: f[a].toString(),
        name: o,
        hint: f[l],
        disabled: f[n]
      };
    });
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var t, e;
    (e = (t = this.componentStates) == null ? void 0 : t.dsfrHeader) == null || e.navItems.filter((a) => a.title).forEach((a) => {
      a.active = a.links.some((n) => window.location.pathname.startsWith(n.to));
    });
  }
}, Mf = ["href", "aria-current"], $f = {
  __name: "RouterLink",
  props: ["to"],
  setup(t) {
    const e = t, a = e.to === "/" ? window.location.pathname === e.to : window.location.pathname.startsWith(e.to);
    return (n, l) => (s(), c("a", {
      href: e.to,
      "aria-current": $(a) ? "page" : void 0
    }, [
      L(n.$slots, "default")
    ], 8, Mf));
  }
}, Ie = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [n, l] of e)
    a[n] = l;
  return a;
}, Ff = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Bt, DsfrTag: Lt, DsfrButton: $e },
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
  class: "fr-mb-2w flex flex-column gap--sm"
}, Rf = { class: "fr-mb-1w fr-text--md" }, Nf = { key: 0 }, Vf = { class: "facet" }, jf = { class: "flex justify-between w-full fr-mb-0" }, Of = { class: "facet--count" }, Hf = { key: 1 }, qf = { class: "flex justify-between w-full" }, Kf = { class: "facet--count" }, zf = { key: 0 }, Qf = { class: "facet" }, Gf = { class: "flex justify-between w-full fr-mb-0" }, Wf = { class: "facet--count" }, Uf = { key: 1 }, Xf = { class: "flex justify-between w-full" }, Yf = { class: "facet--count" }, Zf = { class: "fr-mb-2w" };
function Jf(t, e, a, n, l, o) {
  const r = se("DsfrTag"), i = se("DsfrCheckbox"), u = se("DsfrButton");
  return s(), c("div", null, [
    o.isAnyFacetValueSelected() ? (s(), c("div", Pf, [
      (s(!0), c(H, null, G(a.selectedFacets, (f, p) => (s(), c(H, { key: p }, [
        o.facetMultipleByCode(p) ? h("", !0) : (s(!0), c(H, { key: 0 }, G(f, (m) => (s(), N(r, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (w) => t.$emit("toogle-facet", p, m, a.contextKey)
        }, {
          default: U(() => [
            V(b(o.facetLabelByCode(p)) + ": " + b(o.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : h("", !0),
    (s(!0), c(H, null, G(a.facets, (f) => (s(), c("div", {
      key: f.code,
      class: "facets"
    }, [
      f.multiple || !o.isFacetSelected(f.code) ? (s(), c(H, { key: 0 }, [
        d("h6", Rf, b(f.label), 1),
        d("ul", null, [
          (s(!0), c(H, null, G(o.selectedInvisibleFacets(f.code), (p) => (s(), c(H, {
            key: p.code
          }, [
            f.multiple ? (s(), c("li", Nf, [
              d("div", Vf, [
                X(i, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (m) => t.$emit("toogle-facet", f.code, p.code, a.contextKey)
                }, {
                  label: U(() => [
                    d("p", jf, [
                      V(b(o.facetValueLabelByCode(f.code, p.code)) + " ", 1),
                      d("span", Of, b(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (s(), c("li", Hf, [
              X(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => t.$emit("toogle-facet", f.code, p.code, a.contextKey)
              }, {
                default: U(() => [
                  d("span", qf, [
                    V(b(o.facetValueLabelByCode(f.code, p.code)) + " ", 1),
                    d("span", Kf, b(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        d("ul", null, [
          (s(!0), c(H, null, G(o.visibleFacets(f.code, f.values), (p) => (s(), c(H, {
            key: p.code
          }, [
            f.multiple ? (s(), c("li", zf, [
              d("div", Qf, [
                X(i, {
                  small: "",
                  modelValue: o.isFacetValueSelected(f.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (m) => t.$emit("toogle-facet", f.code, p.code, a.contextKey)
                }, {
                  label: U(() => [
                    d("p", Gf, [
                      V(b(o.facetValueLabelByCode(f.code, p.code)) + " ", 1),
                      d("span", Wf, b(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (s(), c("li", Uf, [
              X(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => t.$emit("toogle-facet", f.code, p.code, a.contextKey)
              }, {
                default: U(() => [
                  d("span", Xf, [
                    V(b(o.facetValueLabelByCode(f.code, p.code)) + " ", 1),
                    d("span", Yf, b(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        d("div", Zf, [
          f.values.length > a.maxValues && !o.isFacetExpanded(f.code) ? (s(), N(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => o.expandFacet(f.code)
          }, {
            default: U(() => [
              V(b(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : h("", !0),
          f.values.length > a.maxValues && o.isFacetExpanded(f.code) ? (s(), N(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => o.reduceFacet(f.code)
          }, {
            default: U(() => [
              V(b(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : h("", !0)
        ])
      ], 64)) : h("", !0)
    ]))), 128))
  ]);
}
const ep = /* @__PURE__ */ Ie(Ff, [["render", Jf], ["__scopeId", "data-v-0be4e596"]]), At = () => {
  const t = j(), e = j(!1), a = j(!1), n = () => {
    if (!t.value)
      return;
    t.value.style.setProperty("--collapser", "none");
    const r = t.value.offsetHeight;
    t.value.style.setProperty("--collapse", `${-r}px`), t.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: t,
    collapsing: e,
    cssExpanded: a,
    doExpand: (r) => {
      t.value && (r === !0 && t.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        e.value = !0, n(), window.requestAnimationFrame(() => {
          a.value = r;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (r) => {
      e.value = !1, t.value && r === !1 && t.value.style.removeProperty("--collapse-max-height");
    }
  };
}, tp = "abcdefghijklmnopqrstuvwyz0123456789", ra = tp.repeat(10), ap = () => {
  const t = Math.floor(Math.random() * ra.length);
  return ra[t];
}, lp = (t) => Array.from({ length: t }).map(ap).join(""), Fe = (t = "", e = "") => (t ? `${t}-` : "") + lp(5) + (e ? `-${e}` : ""), np = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], op = ["id", "aria-labelledby", "onKeydown"], rp = {
  class: "fr-menu__list",
  role: "none"
}, sp = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Fe("menu") },
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
      onTransitionEnd: o
    } = At(), r = t, i = j(null), u = j(!1);
    let f = j(0), p = [];
    ve("menuItem", { menuItemIndex: f, addMenuItem: (y, D) => {
      f.value += 1, p.push(`${y}@${D}`);
    } }), ve("id", r.id), ae(u, (y, D) => {
      y !== D && (l(y), y ? (setTimeout(() => x(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    });
    const w = (y, D) => {
      const C = D === "down" ? (y + 1) % p.length : (y - 1 + p.length) % p.length, q = document.getElementById(`${r.id}_item_${C}`);
      return q.ariaDisabled === "true" ? w(C, D) : q;
    }, B = (y) => {
      const D = document.activeElement.id, C = D.startsWith(`${r.id}_item_`) ? Number(D.split("_")[2]) : y === "down" ? -1 : 0;
      w(C, y).focus();
    }, x = (y) => B("down"), F = (y) => B("up");
    let v = (y) => {
      let D = y.key;
      if (D.length > 1 && D.match(/\S/))
        return;
      D = D.toLowerCase();
      let C = p.filter((g) => g.toLowerCase().startsWith(D)), q = document.activeElement.id;
      for (let g of C) {
        let S = g.split("@")[1], k = document.getElementById(`${r.id}_item_${S}`);
        if (q !== k.id) {
          k.focus();
          break;
        }
      }
    }, T = (y) => {
      i.value.contains(y.target) || (u.value = !1);
    };
    return (y, D) => (s(), c("div", {
      class: "relative-position",
      onKeydown: D[9] || (D[9] = Y(
        //@ts-ignore
        (...C) => $(T) && $(T)(...C),
        ["tab"]
      )),
      ref_key: "container",
      ref: i
    }, [
      d("button", K({
        id: y.id,
        onClick: D[0] || (D[0] = W((C) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          D[1] || (D[1] = Y(W((C) => u.value = !1, ["stop"]), ["esc"])),
          D[2] || (D[2] = Y(W((C) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Y(W(x, ["prevent"]), ["down"]),
          Y(W(F, ["prevent"]), ["up"]),
          D[3] || (D[3] = //@ts-ignore
          (...C) => $(v) && $(v)(...C)),
          D[4] || (D[4] = Y((C) => u.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          "fr-btn--secondary": y.secondary,
          "fr-btn--tertiary": y.tertiary
        }],
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": y.disabled,
        "aria-controls": `${y.id}_menu`,
        "aria-expanded": u.value
      }, y.$attrs), [
        y.icon !== "" ? (s(), N($(le), {
          key: 0,
          class: "fr-mr-2v",
          name: y.icon
        }, null, 8, ["name"])) : h("", !0),
        d("span", null, b(y.label), 1)
      ], 16, np),
      d("div", {
        id: `${y.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: P(["fr-collapse fr-menu", { "fr-collapse--expanded": $(n), "fr-collapsing": $(a) }]),
        role: "menu",
        "aria-labelledby": y.id,
        onKeyup: D[5] || (D[5] = Y((C) => u.value = !1, ["esc"])),
        onKeydown: [
          D[6] || (D[6] = Y((C) => u.value = !1, ["tab"])),
          Y(W(x, ["prevent"]), ["down"]),
          Y(W(F, ["prevent"]), ["up"]),
          D[7] || (D[7] = //@ts-ignore
          (...C) => $(v) && $(v)(...C))
        ],
        onTransitionend: D[8] || (D[8] = (C) => $(o)(u.value))
      }, [
        d("ul", rp, [
          L(y.$slots, "default", {}, void 0, !0)
        ])
      ], 42, op)
    ], 544));
  }
}), ip = /* @__PURE__ */ Ie(sp, [["__scopeId", "data-v-e161f8ec"]]), up = { role: "none" }, dp = ["id", "href"], cp = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    url: { default: "" }
  },
  setup(t) {
    const e = t, { menuItemIndex: a, addMenuItem: n } = _e("menuItem"), l = _e("id"), o = a.value;
    return n(e.label, o), (r, i) => {
      const u = se("dsfr-button");
      return s(), c("li", up, [
        r.url === "" ? (s(), N(u, K({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: r.label,
          id: `${$(l)}_item_${$(o)}`,
          secondary: "",
          class: "fr-nav__link"
        }, r.$attrs), null, 16, ["label", "id"])) : (s(), c("a", K({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${$(l)}_item_${$(o)}`,
          href: r.url,
          class: "fr-btn fr-btn--secondary fr-nav__link"
        }, r.$attrs), b(r.label), 17, dp))
      ]);
    };
  }
}), fp = ["for", "id"], pp = {
  key: 0,
  class: "required"
}, vp = {
  key: 0,
  class: "fr-hint-text"
}, mp = ["id", "onKeydown", "aria-labelledby", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], gp = ["id", "onKeydown"], bp = {
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
}, Dp = ["aria-selected"], xp = ["id", "data-id", "value"], Cp = ["for"], Bp = ["id"], Tp = /* @__PURE__ */ M({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ be({
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
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: o
    } = At(), r = t, i = j(!1), u = ie(t, "modelValue"), f = j(r.options);
    ae(i, (A, R) => {
      A !== R && (l(A), A ? (document.addEventListener("click", O), document.addEventListener("touchstart", O)) : (document.removeEventListener("click", O), document.removeEventListener("touchstart", O)));
    });
    const p = j(null), m = j(null), w = j(null), B = I(() => r.errorMessage || r.successMessage), x = I(() => r.errorMessage !== "" ? "error" : "valid"), F = I(() => r.modelValue.length === f.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), v = I(() => r.modelValue.length === f.value.length ? "Tout déselectionner" : "Tout sélectionner"), T = I(() => {
      let A = `${r.modelValue.length} options séléctionnées`;
      return r.modelValue.length > 2 ? A : r.options.filter((R) => r.modelValue.includes(R.value)).map((R) => R.text).join(", ");
    });
    let y = function() {
      if (r.modelValue.length >= f.value.length)
        r.modelValue.length = 0;
      else
        for (let A of f.value)
          r.modelValue.push(A.value);
    }, D = function(A) {
      const R = A.target.value.toLowerCase();
      f.value = r.options.filter((z) => z.text.toLowerCase().indexOf(R) > -1);
    };
    const C = (A, R) => {
      const z = R === "down" ? (A + 1) % f.value.length : (A - 1 + f.value.length) % f.value.length, Z = document.getElementById(`${r.id}_option_${z}`);
      return Z.ariaDisabled === "true" ? C(z, R) : Z;
    }, q = (A) => {
      const R = document.activeElement.id, z = R.startsWith(`${r.id}_option_`) ? Number(R.split("_")[2]) : A === "down" ? -1 : 0;
      C(z, A).focus();
    }, g = (A) => q("down"), S = (A) => q("up");
    let k = function(A) {
      A.shiftKey || (r.comboHasButton ? i.value || (i.value = !0, A.preventDefault(), setTimeout(() => m.value.focus(), 100)) : r.comboHasFilter && (i.value || (i.value = !0, A.preventDefault(), setTimeout(() => w.value.focus(), 100))));
    }, Q = function(A) {
      A.shiftKey || ((r.comboHasButton && !r.comboHasFilter && document.activeElement.id === `${r.id}_button` || r.comboHasFilter && document.activeElement.id === `${r.id}_filter`) && (A.preventDefault(), i.value = !1), !r.comboHasFilter && !r.comboHasButton && (i.value = !1));
    }, _ = function(A) {
      document.activeElement.id.startsWith(`${r.id}_option_`) && (r.comboHasFilter ? (A.preventDefault(), w.value.focus()) : r.comboHasButton && m.value.focus());
    }, E = (A) => {
      let R = A.key;
      if (R.length > 1 && R.match(/\S/) || document.activeElement.id === `${r.id}_filter`)
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
    }, O = (A) => {
      p.value.contains(A.target) || (i.value = !1);
    };
    return (A, R) => (s(), c(H, null, [
      d("div", {
        ref_key: "container",
        ref: p,
        class: P(["fr-select-group", { [`fr-select-group--${x.value}`]: B.value !== "" }]),
        onKeyup: R[13] || (R[13] = Y(
          //@ts-ignore
          (...z) => $(O) && $(O)(...z),
          ["tab"]
        ))
      }, [
        d("label", {
          class: "fr-label",
          for: A.id,
          id: `${A.id}_label`
        }, [
          L(A.$slots, "label", {}, () => [
            V(b(A.label) + " ", 1),
            L(A.$slots, "required-tip", {}, () => [
              A.required ? (s(), c("span", pp, " *")) : h("", !0)
            ], !0)
          ], !0),
          A.description ? (s(), c("span", vp, b(A.description), 1)) : h("", !0)
        ], 8, fp),
        d("div", K({
          id: A.id,
          class: [{ [`fr-select--${x.value}`]: B.value !== "" }, "fr-input"],
          onClick: R[0] || (R[0] = (z) => i.value = !i.value),
          onKeydown: [
            R[1] || (R[1] = Y(W((z) => i.value = !1, ["stop"]), ["esc"])),
            R[2] || (R[2] = Y(W((z) => i.value = !i.value, ["prevent"]), ["space"])),
            Y(W(g, ["prevent"]), ["down"]),
            Y(W(S, ["prevent"]), ["up"]),
            R[3] || (R[3] = Y(
              //@ts-ignore
              (...z) => $(k) && $(k)(...z),
              ["tab"]
            )),
            R[4] || (R[4] = //@ts-ignore
            (...z) => $(E) && $(E)(...z))
          ],
          tabindex: "0",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-autocomplete": "none",
          "aria-labelledby": `${A.id}_label`,
          "aria-disabled": A.disabled,
          "aria-controls": `${A.id}_list`,
          "aria-expanded": i.value,
          "aria-required": A.required
        }, A.$attrs), [
          d("p", null, b(T.value), 1)
        ], 16, mp),
        d("div", {
          id: `${A.id}_list`,
          ref_key: "collapse",
          ref: e,
          class: P(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": $(n), "fr-collapsing": $(a) }]),
          onKeyup: R[8] || (R[8] = Y((z) => i.value = !1, ["esc"])),
          onKeydown: [
            R[9] || (R[9] = Y(
              //@ts-ignore
              (...z) => $(Q) && $(Q)(...z),
              ["tab"]
            )),
            Y(W(g, ["prevent"]), ["down"]),
            Y(W(S, ["prevent"]), ["up"]),
            R[10] || (R[10] = Y(W(
              //@ts-ignore
              (...z) => $(_) && $(_)(...z),
              ["shift"]
            ), ["tab"])),
            R[11] || (R[11] = //@ts-ignore
            (...z) => $(E) && $(E)(...z))
          ],
          onTransitionend: R[12] || (R[12] = (z) => $(o)(i.value))
        }, [
          A.comboHasButton ? (s(), c("ul", bp, [
            d("li", null, [
              d("button", {
                class: P(["fr-btn fr-btn--tertiary", `${F.value}`]),
                id: `${A.id}_button`,
                onClick: R[5] || (R[5] = (z) => $(y)()),
                ref_key: "button",
                ref: m,
                type: "button"
              }, b(v.value), 11, hp)
            ])
          ])) : h("", !0),
          A.comboHasFilter ? (s(), c("div", yp, [
            d("input", {
              class: "fr-input",
              id: `${A.id}_filter`,
              ref_key: "filter",
              ref: w,
              onInput: R[6] || (R[6] = //@ts-ignore
              (...z) => $(D) && $(D)(...z)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, kp)
          ])) : h("", !0),
          A.comboLabel ? (s(), c("p", wp, [
            V(b(A.comboLabel) + " ", 1),
            A.comboDescription ? (s(), c("span", _p, b(A.comboDescription), 1)) : h("", !0)
          ])) : h("", !0),
          d("ul", Ip, [
            (s(!0), c(H, null, G(f.value, (z, Z) => (s(), c("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": u.value.includes(z.value)
            }, [
              pe(d("input", {
                id: `${A.id}_option_${Z}`,
                "data-id": z.value,
                type: "checkbox",
                class: "",
                tabindex: "-1",
                value: z.value,
                "onUpdate:modelValue": R[7] || (R[7] = (ee) => u.value = ee)
              }, null, 8, xp), [
                [Qe, u.value]
              ]),
              d("label", {
                class: "fr-label",
                for: `${A.id}_option_${Z}`
              }, b(z.text), 9, Cp)
            ], 8, Dp))), 256))
          ])
        ], 42, gp)
      ], 34),
      B.value ? (s(), c("p", {
        key: 0,
        id: `select-${x.value}-desc-${x.value}`,
        class: P(`fr-${x.value}-text`)
      }, b(B.value), 11, Bp)) : h("", !0)
    ], 64));
  }
}), Ep = /* @__PURE__ */ Ie(Tp, [["__scopeId", "data-v-512052ab"]]), Sp = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Lp = ["id", "aria-labelledby", "onKeydown"], Ap = {
  key: 0,
  class: "fr-label fr-mb-0"
}, Mp = {
  key: 0,
  class: "fr-hint-text"
}, $p = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, Fp = {
  role: "none",
  class: "fr-p-2v"
}, Pp = ["id", "href"], Rp = /* @__PURE__ */ M({
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
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: o
    } = At(), r = t, i = j(null), u = j(!1);
    let f = j(0), p = [];
    const m = (y, D) => {
      f.value += 1, p.push(`${y}@${D}`);
    };
    ve("menuItem", { menuItemIndex: f, addMenuItem: m }), ve("id", r.id), ae(u, (y, D) => {
      y !== D && (l(y), y ? (setTimeout(() => x(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    }), ne(() => {
      m(r.logoutLabel, f.value);
    });
    const w = (y, D) => {
      const C = D === "down" ? (y + 1) % p.length : (y - 1 + p.length) % p.length, q = document.getElementById(`${r.id}_item_${C}`);
      return q.ariaDisabled === "true" ? w(C, D) : q;
    }, B = (y) => {
      const D = document.activeElement.id, C = D.startsWith(`${r.id}_item_`) ? Number(D.split("_")[2]) : y === "down" ? -1 : 0;
      w(C, y).focus();
    }, x = (y) => B("down"), F = (y) => B("up");
    let v = (y) => {
      let D = y.key;
      if (D.length > 1 && D.match(/\S/))
        return;
      D = D.toLowerCase();
      let C = p.filter((g) => g.toLowerCase().startsWith(D)), q = document.activeElement.id;
      for (let g of C) {
        let S = g.split("@")[1], k = document.getElementById(`${r.id}_item_${S}`);
        if (q !== k.id) {
          k.focus();
          break;
        }
      }
    }, T = (y) => {
      i.value.contains(y.target) || (u.value = !1);
    };
    return (y, D) => (s(), c("div", {
      class: "relative-position fr-menu-header",
      onKeyup: D[9] || (D[9] = Y(
        //@ts-ignore
        (...C) => $(T) && $(T)(...C),
        ["tab"]
      )),
      ref_key: "container",
      ref: i
    }, [
      d("button", K({
        id: y.id,
        onClick: D[0] || (D[0] = W((C) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          D[1] || (D[1] = Y(W((C) => u.value = !1, ["stop"]), ["esc"])),
          D[2] || (D[2] = Y(W((C) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Y(W(x, ["prevent"]), ["down"]),
          Y(W(F, ["prevent"]), ["up"]),
          D[3] || (D[3] = //@ts-ignore
          (...C) => $(v) && $(v)(...C)),
          D[4] || (D[4] = Y((C) => u.value = !1, ["tab"]))
        ],
        class: "fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm",
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": y.disabled,
        "aria-controls": `${y.id}_menu`,
        "aria-expanded": u.value
      }, y.$attrs), [
        y.icon !== "" ? (s(), N($(le), {
          key: 0,
          class: "fr-mr-2v",
          name: y.icon
        }, null, 8, ["name"])) : h("", !0),
        d("span", null, b(y.label), 1)
      ], 16, Sp),
      d("div", {
        id: `${y.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: P(["fr-collapse fr-menu fr-menu-header__modal fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": $(n), "fr-collapsing": $(a) }]),
        role: "menu",
        "aria-labelledby": y.id,
        onKeyup: D[5] || (D[5] = Y((C) => u.value = !1, ["esc"])),
        onKeydown: [
          D[6] || (D[6] = Y((C) => u.value = !1, ["tab"])),
          Y(W(x, ["prevent"]), ["down"]),
          Y(W(F, ["prevent"]), ["up"]),
          D[7] || (D[7] = //@ts-ignore
          (...C) => $(v) && $(v)(...C))
        ],
        onTransitionend: D[8] || (D[8] = (C) => $(o)(u.value))
      }, [
        L(y.$slots, "detail", {}, () => [
          y.nom === "" && y.email === "" ? h("", !0) : (s(), c("p", Ap, [
            V(b(y.nom) + " ", 1),
            y.email !== "" ? (s(), c("span", Mp, b(y.email), 1)) : h("", !0)
          ]))
        ], !0),
        d("ul", $p, [
          L(y.$slots, "default", {}, void 0, !0),
          d("li", Fp, [
            y.logoutUrl !== "" ? (s(), c("a", {
              key: 0,
              id: `${y.id}_item_${$(f) - 1}`,
              class: "fr-btn w-full fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
              role: "menuitem",
              tabindex: "-1",
              href: y.logoutUrl
            }, b(y.logoutLabel), 9, Pp)) : h("", !0)
          ])
        ])
      ], 42, Lp)
    ], 544));
  }
}), Np = /* @__PURE__ */ Ie(Rp, [["__scopeId", "data-v-2c51eb4a"]]), Vp = Symbol("header"), jp = ["aria-label"], Op = { class: "fr-btns-group" }, mt = /* @__PURE__ */ M({
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
      d("ul", Op, [
        (s(!0), c(H, null, G(n.links, (o, r) => (s(), c("li", { key: r }, [
          X($(St), K({ ref_for: !0 }, o, {
            "on-click": (i) => {
              var u;
              a("linkClick", i), (u = o.onClick) == null || u.call(o, i);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        L(n.$slots, "default")
      ])
    ], 8, jp));
  }
}), Hp = {
  role: "banner",
  class: "fr-header"
}, qp = { class: "fr-header__body" }, Kp = { class: "fr-container width-inherit" }, zp = { class: "fr-header__body-row" }, Qp = { class: "fr-header__brand fr-enlarge-link" }, Gp = { class: "fr-header__brand-top" }, Wp = { class: "fr-header__logo" }, Up = {
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
}, ov = { class: "fr-header__tools" }, rv = {
  key: 0,
  class: "fr-header__tools-links"
}, sv = { class: "fr-header__search fr-modal" }, iv = ["aria-label"], uv = { class: "fr-container" }, dv = { class: "fr-header__menu-links" }, cv = {
  key: 1,
  class: "flex justify-center items-center"
}, fv = { class: "fr-header__menu fr-modal" }, pv = {
  key: 0,
  class: "fr-container"
}, vv = /* @__PURE__ */ M({
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
    const a = t, n = e, l = Me(a, "languageSelector"), o = j(!1), r = j(!1), i = j(!1), u = () => {
      var v;
      i.value = !1, o.value = !1, r.value = !1, (v = document.getElementById("button-menu")) == null || v.focus();
    }, f = (v) => {
      v.key === "Escape" && u();
    };
    ne(() => {
      document.addEventListener("keydown", f), n("on-mounted");
    }), ce(() => {
      document.removeEventListener("keydown", f);
    });
    const p = () => {
      var v;
      i.value = !0, o.value = !0, r.value = !1, (v = document.getElementById("close-button")) == null || v.focus();
    }, m = () => {
      i.value = !0, o.value = !1, r.value = !0;
    }, w = u, B = bt(), x = I(() => {
      var v;
      return !!((v = B.operator) != null && v.call(B).length) || !!a.operatorImgSrc;
    }), F = I(() => !!B.mainnav);
    return ve(Vp, () => u), (v, T) => {
      var D, C, q;
      const y = se("RouterLink");
      return s(), c("header", Hp, [
        d("div", qp, [
          d("div", Kp, [
            d("div", zp, [
              d("div", Qp, [
                d("div", Gp, [
                  d("div", Wp, [
                    X(y, {
                      to: v.homeTo,
                      title: `${v.homeLabel} - ${v.serviceTitle}`
                    }, {
                      default: U(() => [
                        X($(Se), {
                          "logo-text": v.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  x.value ? (s(), c("div", Up, [
                    L(v.$slots, "operator", {}, () => [
                      v.operatorImgSrc ? (s(), c("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: v.operatorImgSrc,
                        alt: v.operatorImgAlt,
                        style: de(v.operatorImgStyle)
                      }, null, 12, Xp)) : h("", !0)
                    ])
                  ])) : h("", !0),
                  v.showSearch || F.value || (D = v.quickLinks) != null && D.length ? (s(), c("div", Yp, [
                    v.showSearch ? (s(), c("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": v.showSearchLabel,
                      title: v.showSearchLabel,
                      "data-fr-opened": r.value,
                      onClick: T[0] || (T[0] = W((g) => m(), ["prevent", "stop"]))
                    }, null, 8, Zp)) : h("", !0),
                    F.value || (C = v.quickLinks) != null && C.length ? (s(), c("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": v.menuLabel,
                      title: v.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = W((g) => p(), ["prevent", "stop"]))
                    }, null, 8, Jp)) : h("", !0)
                  ])) : h("", !0)
                ]),
                v.serviceTitle ? (s(), c("div", ev, [
                  X(y, K({
                    to: v.homeTo,
                    title: `${v.homeLabel} - ${v.serviceTitle}`
                  }, v.$attrs), {
                    default: U(() => [
                      d("p", tv, [
                        V(b(v.serviceTitle) + " ", 1),
                        v.showBeta ? (s(), c("span", av, " BETA ")) : h("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  v.serviceDescription ? (s(), c("p", lv, b(v.serviceDescription), 1)) : h("", !0)
                ])) : h("", !0),
                !v.serviceTitle && v.showBeta ? (s(), c("div", nv, T[9] || (T[9] = [
                  d("p", { class: "fr-header__service-title" }, [
                    d("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : h("", !0)
              ]),
              d("div", ov, [
                (q = v.quickLinks) != null && q.length || l.value ? (s(), c("div", rv, [
                  o.value ? h("", !0) : (s(), N(mt, {
                    key: 0,
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel
                  }, {
                    default: U(() => [
                      L(v.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  l.value ? (s(), N($(Le), K({ key: 1 }, l.value, {
                    onSelect: T[2] || (T[2] = (g) => n("language-select", g))
                  }), null, 16)) : h("", !0)
                ])) : h("", !0),
                d("div", sv, [
                  L(v.$slots, "header-search"),
                  v.showSearch ? (s(), N($(Ae), {
                    key: 0,
                    "searchbar-id": v.searchbarId,
                    label: v.searchLabel,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (g) => n("update:modelValue", g)),
                    onSearch: T[4] || (T[4] = (g) => n("search", g))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : h("", !0)
                ])
              ])
            ]),
            v.showSearch || F.value || v.quickLinks && v.quickLinks.length || l.value ? (s(), c("div", {
              key: 0,
              id: "header-navigation",
              class: P(["fr-header__menu fr-modal", { "fr-modal--opened": i.value }]),
              "aria-label": v.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              d("div", uv, [
                d("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: T[5] || (T[5] = W((g) => u(), ["prevent", "stop"]))
                }, b(v.closeMenuModalLabel), 1),
                d("div", dv, [
                  l.value ? (s(), N($(Le), K({ key: 0 }, l.value, {
                    onSelect: T[6] || (T[6] = (g) => l.value.currentLanguage = g.codeIso)
                  }), null, 16)) : h("", !0),
                  o.value ? (s(), N(mt, {
                    key: 1,
                    role: "navigation",
                    links: v.quickLinks,
                    "nav-aria-label": v.quickLinksAriaLabel,
                    onLinkClick: $(w)
                  }, {
                    default: U(() => [
                      L(v.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : h("", !0),
                  L(v.$slots, "header-search")
                ]),
                i.value ? L(v.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : h("", !0),
                r.value ? (s(), c("div", cv, [
                  X($(Ae), {
                    "searchbar-id": v.searchbarId,
                    "model-value": v.modelValue,
                    placeholder: v.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (g) => n("update:modelValue", g)),
                    onSearch: T[8] || (T[8] = (g) => n("search", g))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : h("", !0)
              ])
            ], 10, iv)) : h("", !0),
            L(v.$slots, "default")
          ])
        ]),
        d("div", fv, [
          F.value && !i.value ? (s(), c("div", pv, [
            L(v.$slots, "mainnav", { hidemodal: u })
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
}, Ev = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Sv = ["id", "value"], Lv = ["for"], Av = ["onKeydown"], Mv = { class: "flex gap-2 items-center" }, $v = ["selected"], Fv = ["value", "selected"], Pv = { class: "flex ml-1" }, Rv = { class: "self-center" }, Nv = /* @__PURE__ */ M({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ be({
    id: { default: () => Fe("table") },
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
    const a = t, n = e, l = ie(t, "selection"), o = ie(t, "rowsPerPage"), r = ie(t, "currentPage"), i = I(() => Math.ceil(a.rows.length / o.value)), u = I(() => a.pages ?? Array.from({ length: i.value }).map((g, S) => ({ label: `${S + 1}`, title: `Page ${S + 1}`, href: `#${S + 1}` }))), f = I(() => r.value * o.value), p = I(() => (r.value + 1) * o.value);
    function m(g, S) {
      const k = w.value;
      return (g[k] ?? g) < (S[k] ?? S) ? -1 : (g[k] ?? g) > (S[k] ?? S) ? 1 : 0;
    }
    const w = ie(t, "sortedBy");
    w.value = a.sorted;
    const B = ie(t, "sortedDesc");
    function x(g) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(g))) {
        if (w.value === g) {
          if (B.value) {
            w.value = void 0, B.value = !1;
            return;
          }
          B.value = !0;
          return;
        }
        B.value = !1, w.value = g;
      }
    }
    const F = I(() => {
      const g = w.value ? a.rows.slice().sort(a.sortFn ?? m) : a.rows.slice();
      return B.value && g.reverse(), g;
    }), v = I(() => {
      const g = a.headersRow.map((k) => typeof k != "object" ? k : k.key), S = F.value.map((k) => Array.isArray(k) ? k : g.map((Q) => k));
      return a.pagination ? S.slice(f.value, p.value) : S;
    });
    function T(g) {
      if (g) {
        const S = a.headersRow.findIndex((k) => k.key ?? k);
        l.value = v.value.map((k) => k[S]);
      }
      l.value.length = 0;
    }
    const y = j(!1);
    function D() {
      y.value = l.value.length === v.value.length;
    }
    function C() {
      n("update:current-page", 0), y.value = !1, l.value.length = 0;
    }
    function q(g) {
      navigator.clipboard.writeText(g);
    }
    return (g, S) => (s(), c("div", mv, [
      d("div", gv, [
        d("div", bv, [
          d("div", hv, [
            d("table", { id: g.id }, [
              d("caption", null, b(g.title), 1),
              d("thead", null, [
                d("tr", null, [
                  g.selectableRows ? (s(), c("th", kv, [
                    d("div", wv, [
                      d("input", {
                        id: `table-select--${g.id}-all`,
                        checked: y.value,
                        type: "checkbox",
                        onInput: S[0] || (S[0] = (k) => T(k.target.checked))
                      }, null, 40, _v),
                      d("label", {
                        class: "fr-label",
                        for: `table-select--${g.id}-all`
                      }, " Sélectionner tout ", 8, Iv)
                    ])
                  ])) : h("", !0),
                  (s(!0), c(H, null, G(g.headersRow, (k, Q) => (s(), c("th", K({
                    key: typeof k == "object" ? k.key : k,
                    scope: "col",
                    ref_for: !0
                  }, typeof k == "object" && k.headerAttrs, {
                    tabindex: g.sortableRows ? 0 : void 0,
                    onClick: (_) => x(k.key ?? (Array.isArray(g.rows[0]) ? Q : k)),
                    onKeydown: [
                      Y((_) => x(k.key ?? k), ["enter"]),
                      Y((_) => x(k.key ?? k), ["space"])
                    ]
                  }), [
                    d("div", {
                      class: P({ "sortable-header": g.sortableRows === !0 || Array.isArray(g.sortableRows) && g.sortableRows.includes(k.key ?? k) })
                    }, [
                      L(g.$slots, "header", K({ ref_for: !0 }, typeof k == "object" ? k : { key: k, label: k }), () => [
                        V(b(typeof k == "object" ? k.label : k), 1)
                      ], !0),
                      w.value !== (k.key ?? k) && (g.sortableRows === !0 || Array.isArray(g.sortableRows) && g.sortableRows.includes(k.key ?? k)) ? (s(), c("span", xv, [
                        X($(le), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : w.value === (k.key ?? k) ? (s(), c("span", Cv, [
                        X($(le), {
                          name: B.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : h("", !0)
                    ], 2)
                  ], 16, Dv))), 128))
                ])
              ]),
              d("tbody", null, [
                (s(!0), c(H, null, G(v.value, (k, Q) => (s(), c("tr", {
                  key: `row-${Q}`,
                  "data-row-key": Q + 1
                }, [
                  g.selectableRows ? (s(), c("th", Tv, [
                    d("div", Ev, [
                      pe(d("input", {
                        id: `row-select-${g.id}-${Q}`,
                        "onUpdate:modelValue": S[1] || (S[1] = (_) => l.value = _),
                        value: g.rows[Q][g.rowKey] ?? `row-${Q}`,
                        type: "checkbox",
                        onChange: S[2] || (S[2] = (_) => D())
                      }, null, 40, Sv), [
                        [Qe, l.value]
                      ]),
                      d("label", {
                        class: "fr-label",
                        for: `row-select-${g.id}-${Q}`
                      }, " Sélectionner la ligne " + b(Q + 1), 9, Lv)
                    ])
                  ])) : h("", !0),
                  (s(!0), c(H, null, G(k, (_, E) => (s(), c("td", {
                    key: typeof _ == "object" ? _[g.rowKey] : _,
                    onKeydown: [
                      Y(W((O) => q(typeof _ == "object" ? _[g.rowKey] : _), ["ctrl"]), ["c"]),
                      Y(W((O) => q(typeof _ == "object" ? _[g.rowKey] : _), ["meta"]), ["c"])
                    ]
                  }, [
                    L(g.$slots, "cell", K({ ref_for: !0 }, {
                      colKey: typeof g.headersRow[E] == "object" ? g.headersRow[E].key : g.headersRow[E],
                      cell: _,
                      idx: Q + 1
                    }), () => [
                      V(b(typeof _ == "object" ? _[g.rowKey] : _), 1)
                    ], !0)
                  ], 40, Av))), 128))
                ], 8, Bv))), 128))
              ])
            ], 8, yv)
          ])
        ])
      ]),
      d("div", {
        class: P(g.bottomActionBarClass)
      }, [
        L(g.$slots, "pagination", {}, () => [
          g.pagination && !g.$slots.pagination ? (s(), c("div", {
            key: 0,
            class: P(["flex justify-between items-center", g.paginationWrapperClass])
          }, [
            d("div", Mv, [
              S[6] || (S[6] = d("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              pe(d("select", {
                id: "pagination-options",
                "onUpdate:modelValue": S[3] || (S[3] = (k) => o.value = k),
                class: "fr-select",
                onChange: S[4] || (S[4] = (k) => C())
              }, [
                d("option", {
                  value: "",
                  selected: !g.paginationOptions.includes(o.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, $v),
                (s(!0), c(H, null, G(g.paginationOptions, (k, Q) => (s(), c("option", {
                  key: Q,
                  value: k,
                  selected: +k === o.value
                }, b(k), 9, Fv))), 128))
              ], 544), [
                [ht, o.value]
              ])
            ]),
            d("div", Pv, [
              d("span", Rv, "Page " + b(r.value + 1) + " sur " + b(i.value), 1)
            ]),
            X($(Tt), {
              "current-page": r.value,
              "onUpdate:currentPage": S[5] || (S[5] = (k) => r.value = k),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : h("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Vv = /* @__PURE__ */ Ie(Nv, [["__scopeId", "data-v-72248729"]]), jv = ["id", "aria-labelledby"], Ov = ["id"], Hv = /* @__PURE__ */ M({
  __name: "DsfrButtonIcon",
  props: {
    id: { default: () => Fe("tooltip") },
    noOutline: { type: Boolean, default: !1 },
    icon: { default: "" },
    content: {}
  },
  setup(t) {
    const e = j(!1), a = j(null), n = j(null), l = j("0px"), o = j("0px"), r = j("0px"), i = j(!1), u = j(0);
    async function f() {
      var _, E, O, A, R, z;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((Z) => setTimeout(Z, 100));
      const v = (_ = a.value) == null ? void 0 : _.getBoundingClientRect().top, T = (E = a.value) == null ? void 0 : E.offsetHeight, y = (O = a.value) == null ? void 0 : O.offsetWidth, D = (A = a.value) == null ? void 0 : A.getBoundingClientRect().left, C = (R = n.value) == null ? void 0 : R.offsetHeight, q = (z = n.value) == null ? void 0 : z.offsetWidth, S = !(v - C < 0) && v + T + C >= document.documentElement.offsetHeight;
      i.value = S;
      const k = D + y >= document.documentElement.offsetWidth, Q = D + y / 2 - q / 2 <= 0;
      o.value = S ? `${v - C + 8}px` : `${v + T - 8}px`, u.value = 1, l.value = k ? `${D + y - q - 4}px` : Q ? `${D + 4}px` : `${D + y / 2 - q / 2}px`, r.value = k ? `${q / 2 - y / 2 + 4}px` : Q ? `${-(q / 2) + y / 2 - 4}px` : "0px";
    }
    ae(e, f, { immediate: !0 }), ne(() => {
      window.addEventListener("scroll", f);
    }), ce(() => {
      window.removeEventListener("scroll", f);
    });
    const p = I(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${r.value}; opacity: ${u.value};'`), m = I(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": i.value,
      "fr-placement--bottom": !i.value
    })), w = (v) => {
      var T, y;
      e.value && (v.target === a.value || (T = a.value) != null && T.contains(v.target) || v.target === n.value || (y = n.value) != null && y.contains(v.target) || (e.value = !1));
    }, B = (v) => {
      v.key === "Escape" && (e.value = !1);
    };
    ne(() => {
      document.documentElement.addEventListener("click", w), document.documentElement.addEventListener("keydown", B);
    }), ce(() => {
      document.documentElement.removeEventListener("click", w), document.documentElement.removeEventListener("keydown", B);
    });
    const x = () => {
      e.value = !0;
    }, F = () => {
      e.value = !1;
    };
    return (v, T) => (s(), c(H, null, [
      d("button", K({
        id: `button-${v.id}`,
        ref_key: "source",
        ref: a,
        class: ["fr-btn fr-btn--sm", {
          "fr-btn--tertiary": !v.noOutline,
          "fr-btn--tertiary-no-outline": v.noOutline,
          [v.icon]: !0
        }],
        "aria-labelledby": v.id,
        onMouseenter: T[0] || (T[0] = (y) => x()),
        onMouseleave: T[1] || (T[1] = (y) => F()),
        onFocus: T[2] || (T[2] = (y) => x()),
        onBlur: T[3] || (T[3] = (y) => F())
      }, v.$attrs), null, 16, jv),
      d("p", {
        id: v.id,
        ref_key: "tooltip",
        ref: n,
        class: P(["fr-tooltip fr-placement", m.value]),
        style: de(p.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        L(v.$slots, "default", {}, () => [
          V(b(v.content), 1)
        ], !0)
      ], 14, Ov)
    ], 64));
  }
}), qv = /* @__PURE__ */ Ie(Hv, [["__scopeId", "data-v-994c0be2"]]);
var Kv = {
  install: function(t, e) {
    t.use(Lf), t.component("RouterLink", $f), t.component("DsfrFacets", ep), t.component("DsfrSelectMultiple", Ep), t.component("DsfrMenu", ip), t.component("DsfrMenuLink", cp), t.component("DsfrHeaderMenu", Np), t.component("DsfrCustomHeader", vv), t.component("DsfrCustomHeaderMenuLinks", mt), t.component("DsfrCustomDataTable", Vv), t.component("DsfrButtonIcon", qv);
  },
  methods: Af
};
window && (window.DSFR = Kv);
export {
  Kv as default
};
//# sourceMappingURL=dsfr.es.js.map
