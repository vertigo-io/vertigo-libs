var Jn = Object.defineProperty;
var er = (a, t, e) => t in a ? Jn(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var W = (a, t, e) => er(a, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as O, ref as j, computed as T, onMounted as fe, watch as ue, onUnmounted as we, Comment as tr, cloneVNode as ar, h as sa, openBlock as i, createElementBlock as f, normalizeClass as S, createElementVNode as c, withModifiers as X, createTextVNode as R, toDisplayString as b, unref as F, Fragment as Y, renderList as z, createVNode as U, withKeys as Z, withCtx as K, createBlock as N, resolveDynamicComponent as pe, mergeProps as H, createCommentVNode as y, mergeModels as Ee, useModel as be, withDirectives as xe, vModelCheckbox as Je, renderSlot as A, inject as Ve, toRef as et, provide as Ce, resolveComponent as he, vShow as qa, useCssVars as Ha, nextTick as Wa, normalizeStyle as ye, normalizeProps as ge, guardReactiveProps as Vt, useAttrs as nr, useSlots as jt, hasInjectionContext as rr, reactive as lr, Teleport as or, vModelSelect as qt, onBeforeUnmount as sr, Transition as ir } from "vue";
const Ht = Symbol("accordions"), Wt = Symbol("header"), mt = Symbol("tabs"), Pe = () => {
  const a = j(), t = j(!1), e = j(!1), r = () => {
    if (!a.value)
      return;
    a.value.style.setProperty("--collapser", "none");
    const n = a.value.offsetHeight;
    a.value.style.setProperty("--collapse", `${-n}px`), a.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: a,
    collapsing: t,
    cssExpanded: e,
    doExpand: (n) => {
      a.value && (n === !0 && a.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        t.value = !0, r(), window.requestAnimationFrame(() => {
          e.value = n;
        });
      }));
    },
    adjust: r,
    onTransitionEnd: (n) => {
      t.value = !1, a.value && n === !1 && a.value.style.removeProperty("--collapse-max-height");
    }
  };
}, ur = "abcdefghijklmnopqrstuvwyz0123456789", ia = ur.repeat(10), dr = () => {
  const a = Math.floor(Math.random() * ia.length);
  return ia[a];
}, cr = (a) => Array.from({ length: a }).map(dr).join(""), te = (a = "", t = "") => (a ? `${a}-` : "") + cr(5) + (t ? `-${t}` : ""), fr = { class: "fr-accordion" }, pr = ["aria-expanded", "aria-controls"], mr = ["id"], vr = /* @__PURE__ */ O({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => te("accordion") },
    selected: { type: Boolean },
    title: { default: "Sans intitulé" },
    titleTag: { default: "h3" }
  },
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: r,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: o
    } = Pe(), s = j(), u = Ve(Ht), { isActive: d, expand: p } = (u == null ? void 0 : u(et(() => t.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return fe(() => {
      d.value && l(!0);
    }), ue(d, (h, D) => {
      h !== D && l(h);
    }), (h, D) => (i(), f("section", fr, [
      (i(), N(pe(h.titleTag), { class: "fr-accordion__title" }, {
        default: K(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": F(d),
            "aria-controls": h.id,
            type: "button",
            onClick: D[0] || (D[0] = (I) => F(p)())
          }, [
            A(h.$slots, "title", {}, () => [
              R(b(h.title), 1)
            ])
          ], 8, pr)
        ]),
        _: 3
      })),
      c("div", {
        id: h.id,
        ref_key: "collapse",
        ref: e,
        class: S(["fr-collapse", {
          "fr-collapse--expanded": F(n),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": F(r)
        }]),
        onTransitionend: D[1] || (D[1] = (I) => F(o)(F(d)))
      }, [
        A(h.$slots, "default")
      ], 42, mr)
    ]));
  }
}), hr = { class: "fr-accordions-group" }, br = /* @__PURE__ */ O({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: t }) {
    const e = a, r = t, n = T({
      get: () => e.modelValue,
      set(s) {
        r("update:modelValue", s);
      }
    }), l = j(/* @__PURE__ */ new Map()), o = j(0);
    return Ce(Ht, (s) => {
      const u = o.value++;
      l.value.set(u, s.value);
      const d = T(() => u === n.value);
      ue(s, () => {
        l.value.set(u, s.value);
      });
      function p() {
        if (n.value === u) {
          n.value = -1;
          return;
        }
        n.value = u;
      }
      return we(() => {
        l.value.delete(u);
      }), { isActive: d, expand: p };
    }), (s, u) => (i(), f("div", hr, [
      A(s.$slots, "default")
    ]));
  }
}), gr = ["id", "role"], yr = ["title", "aria-label"], kr = /* @__PURE__ */ O({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => te("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(a, { emit: t }) {
    const e = a, r = t, n = () => r("close"), l = T(
      () => [
        `fr-alert--${e.type}`,
        {
          "fr-alert--sm": e.small
        }
      ]
    );
    return (o, s) => o.closed ? y("", !0) : (i(), f("div", {
      key: 0,
      id: o.id,
      class: S(["fr-alert", l.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? y("", !0) : (i(), N(pe(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: K(() => [
          R(b(o.title), 1)
        ]),
        _: 1
      })),
      A(o.$slots, "default", {}, () => [
        R(b(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: n
      }, null, 8, yr)) : y("", !0)
    ], 10, gr));
  }
}), wr = /* @__PURE__ */ O({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(a) {
    return (t, e) => (i(), f("a", {
      class: S(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, b(t.label), 3));
  }
}), _r = ["title"], Ya = /* @__PURE__ */ O({
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
      class: S(["fr-badge", {
        [`fr-badge--${t.type}`]: t.type,
        "fr-badge--no-icon": t.noIcon,
        "fr-badge--sm": t.small
      }]),
      title: t.ellipsis ? t.label : void 0
    }, [
      c("span", {
        class: S(t.ellipsis ? "fr-ellipsis" : "")
      }, b(t.label), 3)
    ], 10, _r));
  }
}), Dr = ["aria-label"], xr = ["aria-expanded", "aria-controls"], Tr = ["id"], Ir = { class: "fr-breadcrumb__list" }, Mr = ["aria-current"], Er = /* @__PURE__ */ O({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => te("breadcrumb") },
    links: { default: () => [{ text: "" }] },
    navigationLabel: { default: "vous êtes ici :" },
    showBreadcrumbLabel: { default: "Voir le fil d’Ariane" }
  },
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: r,
      doExpand: n,
      onTransitionEnd: l
    } = Pe(), o = j(!1);
    return ue(o, (s, u) => {
      s !== u && n(s);
    }), (s, u) => {
      const d = he("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        xe(c("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => o.value = !o.value)
        }, b(s.showBreadcrumbLabel), 9, xr), [
          [qa, !o.value]
        ]),
        c("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: t,
          class: S(["fr-collapse", {
            "fr-collapse--expanded": F(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => F(l)(o.value))
        }, [
          c("ol", Ir, [
            (i(!0), f(Y, null, z(s.links, (p, h) => (i(), f("li", {
              key: h,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), N(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": h === s.links.length - 1 ? "page" : void 0
              }, {
                default: K(() => [
                  R(b(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : y("", !0),
              p.to ? y("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": h === s.links.length - 1 ? "page" : void 0
              }, b(p.text), 9, Mr))
            ]))), 128))
          ])
        ], 42, Tr)
      ], 8, Dr);
    };
  }
}), Qe = /^[a-z0-9]+(-[a-z0-9]+)*$/, vt = (a, t, e, r = "") => {
  const n = a.split(":");
  if (a.slice(0, 1) === "@") {
    if (n.length < 2 || n.length > 3)
      return null;
    r = n.shift().slice(1);
  }
  if (n.length > 3 || !n.length)
    return null;
  if (n.length > 1) {
    const s = n.pop(), u = n.pop(), d = {
      // Allow provider without '@': "provider:prefix:name"
      provider: n.length > 0 ? n[0] : r,
      prefix: u,
      name: s
    };
    return t && !lt(d) ? null : d;
  }
  const l = n[0], o = l.split("-");
  if (o.length > 1) {
    const s = {
      provider: r,
      prefix: o.shift(),
      name: o.join("-")
    };
    return t && !lt(s) ? null : s;
  }
  if (e && r === "") {
    const s = {
      provider: r,
      prefix: "",
      name: l
    };
    return t && !lt(s, e) ? null : s;
  }
  return null;
}, lt = (a, t) => a ? !!((a.provider === "" || a.provider.match(Qe)) && (t && a.prefix === "" || a.prefix.match(Qe)) && a.name.match(Qe)) : !1, Qa = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), st = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), ht = Object.freeze({
  ...Qa,
  ...st
}), It = Object.freeze({
  ...ht,
  body: "",
  hidden: !1
});
function Cr(a, t) {
  const e = {};
  !a.hFlip != !t.hFlip && (e.hFlip = !0), !a.vFlip != !t.vFlip && (e.vFlip = !0);
  const r = ((a.rotate || 0) + (t.rotate || 0)) % 4;
  return r && (e.rotate = r), e;
}
function ua(a, t) {
  const e = Cr(a, t);
  for (const r in It)
    r in st ? r in a && !(r in e) && (e[r] = st[r]) : r in t ? e[r] = t[r] : r in a && (e[r] = a[r]);
  return e;
}
function Br(a, t) {
  const e = a.icons, r = a.aliases || /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
  function l(o) {
    if (e[o])
      return n[o] = [];
    if (!(o in n)) {
      n[o] = null;
      const s = r[o] && r[o].parent, u = s && l(s);
      u && (n[o] = [s].concat(u));
    }
    return n[o];
  }
  return Object.keys(e).concat(Object.keys(r)).forEach(l), n;
}
function Pr(a, t, e) {
  const r = a.icons, n = a.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function o(s) {
    l = ua(
      r[s] || n[s],
      l
    );
  }
  return o(t), e.forEach(o), ua(a, l);
}
function Ga(a, t) {
  const e = [];
  if (typeof a != "object" || typeof a.icons != "object")
    return e;
  a.not_found instanceof Array && a.not_found.forEach((n) => {
    t(n, null), e.push(n);
  });
  const r = Br(a);
  for (const n in r) {
    const l = r[n];
    l && (t(n, Pr(a, n, l)), e.push(n));
  }
  return e;
}
const Lr = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Qa
};
function _t(a, t) {
  for (const e in t)
    if (e in a && typeof a[e] != typeof t[e])
      return !1;
  return !0;
}
function Ka(a) {
  if (typeof a != "object" || a === null)
    return null;
  const t = a;
  if (typeof t.prefix != "string" || !a.icons || typeof a.icons != "object" || !_t(a, Lr))
    return null;
  const e = t.icons;
  for (const n in e) {
    const l = e[n];
    if (!n.match(Qe) || typeof l.body != "string" || !_t(
      l,
      It
    ))
      return null;
  }
  const r = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const n in r) {
    const l = r[n], o = l.parent;
    if (!n.match(Qe) || typeof o != "string" || !e[o] && !r[o] || !_t(
      l,
      It
    ))
      return null;
  }
  return t;
}
const da = /* @__PURE__ */ Object.create(null);
function Ar(a, t) {
  return {
    provider: a,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function $e(a, t) {
  const e = da[a] || (da[a] = /* @__PURE__ */ Object.create(null));
  return e[t] || (e[t] = Ar(a, t));
}
function Yt(a, t) {
  return Ka(t) ? Ga(t, (e, r) => {
    r ? a.icons[e] = r : a.missing.add(e);
  }) : [];
}
function Or(a, t, e) {
  try {
    if (typeof e.body == "string")
      return a.icons[t] = { ...e }, !0;
  } catch {
  }
  return !1;
}
let Ke = !1;
function za(a) {
  return typeof a == "boolean" && (Ke = a), Ke;
}
function $r(a) {
  const t = typeof a == "string" ? vt(a, !0, Ke) : a;
  if (t) {
    const e = $e(t.provider, t.prefix), r = t.name;
    return e.icons[r] || (e.missing.has(r) ? null : void 0);
  }
}
function Fr(a, t) {
  const e = vt(a, !0, Ke);
  if (!e)
    return !1;
  const r = $e(e.provider, e.prefix);
  return Or(r, e.name, t);
}
function Sr(a, t) {
  if (typeof a != "object")
    return !1;
  if (typeof t != "string" && (t = a.provider || ""), Ke && !t && !a.prefix) {
    let n = !1;
    return Ka(a) && (a.prefix = "", Ga(a, (l, o) => {
      o && Fr(l, o) && (n = !0);
    })), n;
  }
  const e = a.prefix;
  if (!lt({
    provider: t,
    prefix: e,
    name: "a"
  }))
    return !1;
  const r = $e(t, e);
  return !!Yt(r, a);
}
const Xa = Object.freeze({
  width: null,
  height: null
}), Ua = Object.freeze({
  // Dimensions
  ...Xa,
  // Transformations
  ...st
}), Nr = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Rr = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ca(a, t, e) {
  if (t === 1)
    return a;
  if (e = e || 100, typeof a == "number")
    return Math.ceil(a * t * e) / e;
  if (typeof a != "string")
    return a;
  const r = a.split(Nr);
  if (r === null || !r.length)
    return a;
  const n = [];
  let l = r.shift(), o = Rr.test(l);
  for (; ; ) {
    if (o) {
      const s = parseFloat(l);
      isNaN(s) ? n.push(l) : n.push(Math.ceil(s * t * e) / e);
    } else
      n.push(l);
    if (l = r.shift(), l === void 0)
      return n.join("");
    o = !o;
  }
}
function Vr(a, t = "defs") {
  let e = "";
  const r = a.indexOf("<" + t);
  for (; r >= 0; ) {
    const n = a.indexOf(">", r), l = a.indexOf("</" + t);
    if (n === -1 || l === -1)
      break;
    const o = a.indexOf(">", l);
    if (o === -1)
      break;
    e += a.slice(n + 1, l).trim(), a = a.slice(0, r).trim() + a.slice(o + 1);
  }
  return {
    defs: e,
    content: a
  };
}
function jr(a, t) {
  return a ? "<defs>" + a + "</defs>" + t : t;
}
function qr(a, t, e) {
  const r = Vr(a);
  return jr(r.defs, t + r.content + e);
}
const Hr = (a) => a === "unset" || a === "undefined" || a === "none";
function Wr(a, t) {
  const e = {
    ...ht,
    ...a
  }, r = {
    ...Ua,
    ...t
  }, n = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  let l = e.body;
  [e, r].forEach((P) => {
    const m = [], B = P.hFlip, M = P.vFlip;
    let L = P.rotate;
    B ? M ? L += 2 : (m.push(
      "translate(" + (n.width + n.left).toString() + " " + (0 - n.top).toString() + ")"
    ), m.push("scale(-1 1)"), n.top = n.left = 0) : M && (m.push(
      "translate(" + (0 - n.left).toString() + " " + (n.height + n.top).toString() + ")"
    ), m.push("scale(1 -1)"), n.top = n.left = 0);
    let g;
    switch (L < 0 && (L -= Math.floor(L / 4) * 4), L = L % 4, L) {
      case 1:
        g = n.height / 2 + n.top, m.unshift(
          "rotate(90 " + g.toString() + " " + g.toString() + ")"
        );
        break;
      case 2:
        m.unshift(
          "rotate(180 " + (n.width / 2 + n.left).toString() + " " + (n.height / 2 + n.top).toString() + ")"
        );
        break;
      case 3:
        g = n.width / 2 + n.left, m.unshift(
          "rotate(-90 " + g.toString() + " " + g.toString() + ")"
        );
        break;
    }
    L % 2 === 1 && (n.left !== n.top && (g = n.left, n.left = n.top, n.top = g), n.width !== n.height && (g = n.width, n.width = n.height, n.height = g)), m.length && (l = qr(
      l,
      '<g transform="' + m.join(" ") + '">',
      "</g>"
    ));
  });
  const o = r.width, s = r.height, u = n.width, d = n.height;
  let p, h;
  o === null ? (h = s === null ? "1em" : s === "auto" ? d : s, p = ca(h, u / d)) : (p = o === "auto" ? u : o, h = s === null ? ca(p, d / u) : s === "auto" ? d : s);
  const D = {}, I = (P, m) => {
    Hr(m) || (D[P] = m.toString());
  };
  I("width", p), I("height", h);
  const _ = [n.left, n.top, u, d];
  return D.viewBox = _.join(" "), {
    attributes: D,
    viewBox: _,
    body: l
  };
}
const Yr = /\sid="(\S+)"/g, Qr = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Gr = 0;
function Kr(a, t = Qr) {
  const e = [];
  let r;
  for (; r = Yr.exec(a); )
    e.push(r[1]);
  if (!e.length)
    return a;
  const n = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return e.forEach((l) => {
    const o = typeof t == "function" ? t(l) : t + (Gr++).toString(), s = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    a = a.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"),
      "$1" + o + n + "$3"
    );
  }), a = a.replace(new RegExp(n, "g"), ""), a;
}
const Mt = /* @__PURE__ */ Object.create(null);
function zr(a, t) {
  Mt[a] = t;
}
function Et(a) {
  return Mt[a] || Mt[""];
}
function Qt(a) {
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
const Gt = /* @__PURE__ */ Object.create(null), at = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], Ct = [];
for (; at.length > 0; )
  at.length === 1 || Math.random() > 0.5 ? Ct.push(at.shift()) : Ct.push(at.pop());
Gt[""] = Qt({
  resources: ["https://api.iconify.design"].concat(Ct)
});
function Xr(a, t) {
  const e = Qt(t);
  return e === null ? !1 : (Gt[a] = e, !0);
}
function Kt(a) {
  return Gt[a];
}
const Ur = () => {
  let a;
  try {
    if (a = fetch, typeof a == "function")
      return a;
  } catch {
  }
};
let fa = Ur();
function Zr(a, t) {
  const e = Kt(a);
  if (!e)
    return 0;
  let r;
  if (!e.maxURL)
    r = 0;
  else {
    let n = 0;
    e.resources.forEach((o) => {
      n = Math.max(n, o.length);
    });
    const l = t + ".json?icons=";
    r = e.maxURL - n - e.path.length - l.length;
  }
  return r;
}
function Jr(a) {
  return a === 404;
}
const el = (a, t, e) => {
  const r = [], n = Zr(a, t), l = "icons";
  let o = {
    type: l,
    provider: a,
    prefix: t,
    icons: []
  }, s = 0;
  return e.forEach((u, d) => {
    s += u.length + 1, s >= n && d > 0 && (r.push(o), o = {
      type: l,
      provider: a,
      prefix: t,
      icons: []
    }, s = u.length), o.icons.push(u);
  }), r.push(o), r;
};
function tl(a) {
  if (typeof a == "string") {
    const t = Kt(a);
    if (t)
      return t.path;
  }
  return "/";
}
const al = (a, t, e) => {
  if (!fa) {
    e("abort", 424);
    return;
  }
  let r = tl(t.provider);
  switch (t.type) {
    case "icons": {
      const l = t.prefix, o = t.icons.join(","), s = new URLSearchParams({
        icons: o
      });
      r += l + ".json?" + s.toString();
      break;
    }
    case "custom": {
      const l = t.uri;
      r += l.slice(0, 1) === "/" ? l.slice(1) : l;
      break;
    }
    default:
      e("abort", 400);
      return;
  }
  let n = 503;
  fa(a + r).then((l) => {
    const o = l.status;
    if (o !== 200) {
      setTimeout(() => {
        e(Jr(o) ? "abort" : "next", o);
      });
      return;
    }
    return n = 501, l.json();
  }).then((l) => {
    if (typeof l != "object" || l === null) {
      setTimeout(() => {
        l === 404 ? e("abort", l) : e("next", n);
      });
      return;
    }
    setTimeout(() => {
      e("success", l);
    });
  }).catch(() => {
    e("next", n);
  });
}, nl = {
  prepare: el,
  send: al
};
function rl(a) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, e = /* @__PURE__ */ Object.create(null);
  a.sort((n, l) => n.provider !== l.provider ? n.provider.localeCompare(l.provider) : n.prefix !== l.prefix ? n.prefix.localeCompare(l.prefix) : n.name.localeCompare(l.name));
  let r = {
    provider: "",
    prefix: "",
    name: ""
  };
  return a.forEach((n) => {
    if (r.name === n.name && r.prefix === n.prefix && r.provider === n.provider)
      return;
    r = n;
    const l = n.provider, o = n.prefix, s = n.name, u = e[l] || (e[l] = /* @__PURE__ */ Object.create(null)), d = u[o] || (u[o] = $e(l, o));
    let p;
    s in d.icons ? p = t.loaded : o === "" || d.missing.has(s) ? p = t.missing : p = t.pending;
    const h = {
      provider: l,
      prefix: o,
      name: s
    };
    p.push(h);
  }), t;
}
function Za(a, t) {
  a.forEach((e) => {
    const r = e.loaderCallbacks;
    r && (e.loaderCallbacks = r.filter((n) => n.id !== t));
  });
}
function ll(a) {
  a.pendingCallbacksFlag || (a.pendingCallbacksFlag = !0, setTimeout(() => {
    a.pendingCallbacksFlag = !1;
    const t = a.loaderCallbacks ? a.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let e = !1;
    const r = a.provider, n = a.prefix;
    t.forEach((l) => {
      const o = l.icons, s = o.pending.length;
      o.pending = o.pending.filter((u) => {
        if (u.prefix !== n)
          return !0;
        const d = u.name;
        if (a.icons[d])
          o.loaded.push({
            provider: r,
            prefix: n,
            name: d
          });
        else if (a.missing.has(d))
          o.missing.push({
            provider: r,
            prefix: n,
            name: d
          });
        else
          return e = !0, !0;
        return !1;
      }), o.pending.length !== s && (e || Za([a], l.id), l.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let ol = 0;
function sl(a, t, e) {
  const r = ol++, n = Za.bind(null, e, r);
  if (!t.pending.length)
    return n;
  const l = {
    id: r,
    icons: t,
    callback: a,
    abort: n
  };
  return e.forEach((o) => {
    (o.loaderCallbacks || (o.loaderCallbacks = [])).push(l);
  }), n;
}
function il(a, t = !0, e = !1) {
  const r = [];
  return a.forEach((n) => {
    const l = typeof n == "string" ? vt(n, t, e) : n;
    l && r.push(l);
  }), r;
}
var ul = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function dl(a, t, e, r) {
  const n = a.resources.length, l = a.random ? Math.floor(Math.random() * n) : a.index;
  let o;
  if (a.random) {
    let v = a.resources.slice(0);
    for (o = []; v.length > 1; ) {
      const E = Math.floor(Math.random() * v.length);
      o.push(v[E]), v = v.slice(0, E).concat(v.slice(E + 1));
    }
    o = o.concat(v);
  } else
    o = a.resources.slice(l).concat(a.resources.slice(0, l));
  const s = Date.now();
  let u = "pending", d = 0, p, h = null, D = [], I = [];
  typeof r == "function" && I.push(r);
  function _() {
    h && (clearTimeout(h), h = null);
  }
  function P() {
    u === "pending" && (u = "aborted"), _(), D.forEach((v) => {
      v.status === "pending" && (v.status = "aborted");
    }), D = [];
  }
  function m(v, E) {
    E && (I = []), typeof v == "function" && I.push(v);
  }
  function B() {
    return {
      startTime: s,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: D.length,
      subscribe: m,
      abort: P
    };
  }
  function M() {
    u = "failed", I.forEach((v) => {
      v(void 0, p);
    });
  }
  function L() {
    D.forEach((v) => {
      v.status === "pending" && (v.status = "aborted");
    }), D = [];
  }
  function g(v, E, w) {
    const G = E !== "success";
    switch (D = D.filter((x) => x !== v), u) {
      case "pending":
        break;
      case "failed":
        if (G || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (E === "abort") {
      p = w, M();
      return;
    }
    if (G) {
      p = w, D.length || (o.length ? k() : M());
      return;
    }
    if (_(), L(), !a.random) {
      const x = a.resources.indexOf(v.resource);
      x !== -1 && x !== a.index && (a.index = x);
    }
    u = "completed", I.forEach((x) => {
      x(w);
    });
  }
  function k() {
    if (u !== "pending")
      return;
    _();
    const v = o.shift();
    if (v === void 0) {
      if (D.length) {
        h = setTimeout(() => {
          _(), u === "pending" && (L(), M());
        }, a.timeout);
        return;
      }
      M();
      return;
    }
    const E = {
      status: "pending",
      resource: v,
      callback: (w, G) => {
        g(E, w, G);
      }
    };
    D.push(E), d++, h = setTimeout(k, a.rotate), e(v, t, E.callback);
  }
  return setTimeout(k), B;
}
function Ja(a) {
  const t = {
    ...ul,
    ...a
  };
  let e = [];
  function r() {
    e = e.filter((o) => o().status === "pending");
  }
  function n(o, s, u) {
    const d = dl(
      t,
      o,
      s,
      (p, h) => {
        r(), u && u(p, h);
      }
    );
    return e.push(d), d;
  }
  function l(o) {
    return e.find((s) => o(s)) || null;
  }
  return {
    query: n,
    find: l,
    setIndex: (o) => {
      t.index = o;
    },
    getIndex: () => t.index,
    cleanup: r
  };
}
function pa() {
}
const Dt = /* @__PURE__ */ Object.create(null);
function cl(a) {
  if (!Dt[a]) {
    const t = Kt(a);
    if (!t)
      return;
    const e = Ja(t), r = {
      config: t,
      redundancy: e
    };
    Dt[a] = r;
  }
  return Dt[a];
}
function fl(a, t, e) {
  let r, n;
  if (typeof a == "string") {
    const l = Et(a);
    if (!l)
      return e(void 0, 424), pa;
    n = l.send;
    const o = cl(a);
    o && (r = o.redundancy);
  } else {
    const l = Qt(a);
    if (l) {
      r = Ja(l);
      const o = a.resources ? a.resources[0] : "", s = Et(o);
      s && (n = s.send);
    }
  }
  return !r || !n ? (e(void 0, 424), pa) : r.query(t, n, e)().abort;
}
const ma = "iconify2", ze = "iconify", en = ze + "-count", va = ze + "-version", tn = 36e5, pl = 168, ml = 50;
function Bt(a, t) {
  try {
    return a.getItem(t);
  } catch {
  }
}
function zt(a, t, e) {
  try {
    return a.setItem(t, e), !0;
  } catch {
  }
}
function ha(a, t) {
  try {
    a.removeItem(t);
  } catch {
  }
}
function Pt(a, t) {
  return zt(a, en, t.toString());
}
function Lt(a) {
  return parseInt(Bt(a, en)) || 0;
}
const bt = {
  local: !0,
  session: !0
}, an = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let Xt = !1;
function vl(a) {
  Xt = a;
}
let nt = typeof window > "u" ? {} : window;
function nn(a) {
  const t = a + "Storage";
  try {
    if (nt && nt[t] && typeof nt[t].length == "number")
      return nt[t];
  } catch {
  }
  bt[a] = !1;
}
function rn(a, t) {
  const e = nn(a);
  if (!e)
    return;
  const r = Bt(e, va);
  if (r !== ma) {
    if (r) {
      const s = Lt(e);
      for (let u = 0; u < s; u++)
        ha(e, ze + u.toString());
    }
    zt(e, va, ma), Pt(e, 0);
    return;
  }
  const n = Math.floor(Date.now() / tn) - pl, l = (s) => {
    const u = ze + s.toString(), d = Bt(e, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > n && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        t(p, s))
          return !0;
      } catch {
      }
      ha(e, u);
    }
  };
  let o = Lt(e);
  for (let s = o - 1; s >= 0; s--)
    l(s) || (s === o - 1 ? (o--, Pt(e, o)) : an[a].add(s));
}
function ln() {
  if (!Xt) {
    vl(!0);
    for (const a in bt)
      rn(a, (t) => {
        const e = t.data, r = t.provider, n = e.prefix, l = $e(
          r,
          n
        );
        if (!Yt(l, e).length)
          return !1;
        const o = e.lastModified || -1;
        return l.lastModifiedCached = l.lastModifiedCached ? Math.min(l.lastModifiedCached, o) : o, !0;
      });
  }
}
function hl(a, t) {
  const e = a.lastModifiedCached;
  if (
    // Matches or newer
    e && e >= t
  )
    return e === t;
  if (a.lastModifiedCached = t, e)
    for (const r in bt)
      rn(r, (n) => {
        const l = n.data;
        return n.provider !== a.provider || l.prefix !== a.prefix || l.lastModified === t;
      });
  return !0;
}
function bl(a, t) {
  Xt || ln();
  function e(r) {
    let n;
    if (!bt[r] || !(n = nn(r)))
      return;
    const l = an[r];
    let o;
    if (l.size)
      l.delete(o = Array.from(l).shift());
    else if (o = Lt(n), o >= ml || !Pt(n, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / tn),
      provider: a.provider,
      data: t
    };
    return zt(
      n,
      ze + o.toString(),
      JSON.stringify(s)
    );
  }
  t.lastModified && !hl(a, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), e("local") || e("session"));
}
function ba() {
}
function gl(a) {
  a.iconsLoaderFlag || (a.iconsLoaderFlag = !0, setTimeout(() => {
    a.iconsLoaderFlag = !1, ll(a);
  }));
}
function yl(a, t) {
  a.iconsToLoad ? a.iconsToLoad = a.iconsToLoad.concat(t).sort() : a.iconsToLoad = t, a.iconsQueueFlag || (a.iconsQueueFlag = !0, setTimeout(() => {
    a.iconsQueueFlag = !1;
    const { provider: e, prefix: r } = a, n = a.iconsToLoad;
    delete a.iconsToLoad;
    let l;
    !n || !(l = Et(e)) || l.prepare(e, r, n).forEach((o) => {
      fl(e, o, (s) => {
        if (typeof s != "object")
          o.icons.forEach((u) => {
            a.missing.add(u);
          });
        else
          try {
            const u = Yt(
              a,
              s
            );
            if (!u.length)
              return;
            const d = a.pendingIcons;
            d && u.forEach((p) => {
              d.delete(p);
            }), bl(a, s);
          } catch (u) {
            console.error(u);
          }
        gl(a);
      });
    });
  }));
}
const kl = (a, t) => {
  const e = il(a, !0, za()), r = rl(e);
  if (!r.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        r.loaded,
        r.missing,
        r.pending,
        ba
      );
    }), () => {
      u = !1;
    };
  }
  const n = /* @__PURE__ */ Object.create(null), l = [];
  let o, s;
  return r.pending.forEach((u) => {
    const { provider: d, prefix: p } = u;
    if (p === s && d === o)
      return;
    o = d, s = p, l.push($e(d, p));
    const h = n[d] || (n[d] = /* @__PURE__ */ Object.create(null));
    h[p] || (h[p] = []);
  }), r.pending.forEach((u) => {
    const { provider: d, prefix: p, name: h } = u, D = $e(d, p), I = D.pendingIcons || (D.pendingIcons = /* @__PURE__ */ new Set());
    I.has(h) || (I.add(h), n[d][p].push(h));
  }), l.forEach((u) => {
    const { provider: d, prefix: p } = u;
    n[d][p].length && yl(u, n[d][p]);
  }), t ? sl(t, r, l) : ba;
};
function wl(a, t) {
  const e = {
    ...a
  };
  for (const r in t) {
    const n = t[r], l = typeof n;
    r in Xa ? (n === null || n && (l === "string" || l === "number")) && (e[r] = n) : l === typeof e[r] && (e[r] = r === "rotate" ? n % 4 : n);
  }
  return e;
}
const _l = /[\s,]+/;
function Dl(a, t) {
  t.split(_l).forEach((e) => {
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
function xl(a, t = 0) {
  const e = a.replace(/^-?[0-9.]*/, "");
  function r(n) {
    for (; n < 0; )
      n += 4;
    return n % 4;
  }
  if (e === "") {
    const n = parseInt(a);
    return isNaN(n) ? 0 : r(n);
  } else if (e !== a) {
    let n = 0;
    switch (e) {
      case "%":
        n = 25;
        break;
      case "deg":
        n = 90;
    }
    if (n) {
      let l = parseFloat(a.slice(0, a.length - e.length));
      return isNaN(l) ? 0 : (l = l / n, l % 1 === 0 ? r(l) : 0);
    }
  }
  return t;
}
function Tl(a, t) {
  let e = a.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in t)
    e += " " + r + '="' + t[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + a + "</svg>";
}
function Il(a) {
  return a.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Ml(a) {
  return "data:image/svg+xml," + Il(a);
}
function El(a) {
  return 'url("' + Ml(a) + '")';
}
const ga = {
  ...Ua,
  inline: !1
}, Cl = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Bl = {
  display: "inline-block"
}, At = {
  backgroundColor: "currentColor"
}, on = {
  backgroundColor: "transparent"
}, ya = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, ka = {
  webkitMask: At,
  mask: At,
  background: on
};
for (const a in ka) {
  const t = ka[a];
  for (const e in ya)
    t[a + e] = ya[e];
}
const ot = {};
["horizontal", "vertical"].forEach((a) => {
  const t = a.slice(0, 1) + "Flip";
  ot[a + "-flip"] = t, ot[a.slice(0, 1) + "-flip"] = t, ot[a + "Flip"] = t;
});
function wa(a) {
  return a + (a.match(/^[-0-9.]+$/) ? "px" : "");
}
const _a = (a, t) => {
  const e = wl(ga, t), r = { ...Cl }, n = t.mode || "svg", l = {}, o = t.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
  for (let P in t) {
    const m = t[P];
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
          e[P] = m === !0 || m === "true" || m === 1;
          break;
        case "flip":
          typeof m == "string" && Dl(e, m);
          break;
        case "color":
          l.color = m;
          break;
        case "rotate":
          typeof m == "string" ? e[P] = xl(m) : typeof m == "number" && (e[P] = m);
          break;
        case "ariaHidden":
        case "aria-hidden":
          m !== !0 && m !== "true" && delete r["aria-hidden"];
          break;
        default: {
          const B = ot[P];
          B ? (m === !0 || m === "true" || m === 1) && (e[B] = !0) : ga[P] === void 0 && (r[P] = m);
        }
      }
  }
  const u = Wr(a, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), n === "svg") {
    r.style = {
      ...l,
      ...s
    }, Object.assign(r, d);
    let P = 0, m = t.id;
    return typeof m == "string" && (m = m.replace(/-/g, "_")), r.innerHTML = Kr(u.body, m ? () => m + "ID" + P++ : "iconifyVue"), sa("svg", r);
  }
  const { body: p, width: h, height: D } = a, I = n === "mask" || (n === "bg" ? !1 : p.indexOf("currentColor") !== -1), _ = Tl(p, {
    ...d,
    width: h + "",
    height: D + ""
  });
  return r.style = {
    ...l,
    "--svg": El(_),
    width: wa(d.width),
    height: wa(d.height),
    ...Bl,
    ...I ? At : on,
    ...s
  }, sa("span", r);
};
za(!0);
zr("", nl);
if (typeof document < "u" && typeof window < "u") {
  ln();
  const a = window;
  if (a.IconifyPreload !== void 0) {
    const t = a.IconifyPreload, e = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((r) => {
      try {
        (typeof r != "object" || r === null || r instanceof Array || // Check for 'icons' and 'prefix'
        typeof r.icons != "object" || typeof r.prefix != "string" || // Add icon set
        !Sr(r)) && console.error(e);
      } catch {
        console.error(e);
      }
    });
  }
  if (a.IconifyProviders !== void 0) {
    const t = a.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let e in t) {
        const r = "IconifyProviders[" + e + "] is invalid.";
        try {
          const n = t[e];
          if (typeof n != "object" || !n || n.resources === void 0)
            continue;
          Xr(e, n) || console.error(r);
        } catch {
          console.error(r);
        }
      }
  }
}
const Pl = {
  ...ht,
  body: ""
}, Ll = O({
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
    getIcon(a, t) {
      if (typeof a == "object" && a !== null && typeof a.body == "string")
        return this._name = "", this.abortLoading(), {
          data: a
        };
      let e;
      if (typeof a != "string" || (e = vt(a, !1, !0)) === null)
        return this.abortLoading(), null;
      const r = $r(e);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== a) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: a,
          abort: kl([e], () => {
            this.counter++;
          })
        })), null;
      this.abortLoading(), this._name !== a && (this._name = a, t && t(a));
      const n = ["iconify"];
      return e.prefix !== "" && n.push("iconify--" + e.prefix), e.provider !== "" && n.push("iconify--" + e.provider), { data: r, classes: n };
    }
  },
  // Render icon
  render() {
    this.counter;
    const a = this.$attrs, t = this.iconMounted || a.ssr ? this.getIcon(a.icon, a.onLoad) : null;
    if (!t)
      return _a(Pl, a);
    let e = a;
    return t.classes && (e = {
      ...a,
      class: (typeof a.class == "string" ? a.class + " " : "") + t.classes.join(" ")
    }), _a({
      ...ht,
      ...t.data
    }, e);
  }
}), Al = /* @__PURE__ */ O({
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
    Ha((u) => ({
      "98d5b8bc": s.value
    }));
    const t = a, e = j(null), r = T(() => `${+t.scale * 1.2}rem`), n = T(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    ue(() => t.title, l);
    async function l() {
      var u, d, p, h;
      if (!((u = e.value) != null && u.$el))
        return;
      const D = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), I = document.createElement("title");
      if (!t.title) {
        I.remove();
        return;
      }
      I.innerHTML = t.title, await Wa(), D || (h = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || h.before(I);
    }
    fe(l);
    const o = T(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), s = T(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), N(F(Ll), {
      ref_key: "icon",
      ref: e,
      icon: o.value,
      style: ye({ fontSize: r.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: S(["vicon", {
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
      flip: n.value,
      ssr: u.ssr
    }, null, 8, ["icon", "style", "aria-label", "class", "flip", "ssr"]));
  }
}), ve = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [r, n] of t)
    e[r] = n;
  return e;
}, de = /* @__PURE__ */ ve(Al, [["__scopeId", "data-v-33ecc4e5"]]), Ol = ["title", "disabled", "aria-disabled"], $l = { key: 1 }, Fl = /* @__PURE__ */ O({
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
    const e = a, r = T(() => ["sm", "small"].includes(e.size)), n = T(() => ["md", "medium"].includes(e.size)), l = T(() => ["lg", "large"].includes(e.size)), o = j(null);
    t({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const s = T(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = T(() => e.iconOnly ? 1.25 : 0.8325), d = T(
      () => typeof e.icon == "string" ? { scale: u.value, name: e.icon } : { scale: u.value, ...e.icon }
    );
    return (p, h) => (i(), f("button", {
      ref_key: "btn",
      ref: o,
      class: S(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": r.value,
        "fr-btn--md": n.value,
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
      style: ye(!s.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: h[0] || (h[0] = (D) => p.onClick ? p.onClick(D) : () => {
      })
    }, [
      p.icon && !s.value ? (i(), N(de, ge(H({ key: 0 }, d.value)), null, 16)) : y("", !0),
      p.iconOnly ? y("", !0) : (i(), f("span", $l, [
        R(b(p.label) + " ", 1),
        A(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Ol));
  }
}), tt = /* @__PURE__ */ ve(Fl, [["__scopeId", "data-v-77b13897"]]), gt = /* @__PURE__ */ O({
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
    const t = a, e = j(null), r = T(() => ["sm", "small"].includes(t.size)), n = T(() => ["md", "medium"].includes(t.size)), l = T(() => ["lg", "large"].includes(t.size)), o = T(() => ["always", "", !0].includes(t.inlineLayoutWhen)), s = T(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = T(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = T(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = T(() => t.align === "center"), h = T(() => t.align === "right"), D = j("auto"), I = T(() => `--equisized-width: ${D.value};`), _ = async () => {
      var P;
      let m = 0;
      await new Promise((B) => setTimeout(B, 100)), (P = e.value) == null || P.querySelectorAll(".fr-btn").forEach((B) => {
        const M = B, L = M.offsetWidth, g = window.getComputedStyle(M), k = +g.marginLeft.replace("px", ""), v = +g.marginRight.replace("px", "");
        M.style.width = "var(--equisized-width)";
        const E = L + k + v;
        E > m && (m = E);
      }), D.value = `${m}px`;
    };
    return fe(async () => {
      !e.value || !t.equisized || await _();
    }), (P, m) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: ye(I.value),
      class: S(["fr-btns-group", {
        "fr-btns-group--equisized": P.equisized,
        "fr-btns-group--sm": r.value,
        "fr-btns-group--md": n.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || u.value,
        "fr-btns-group--inline-lg": o.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": h.value,
        "fr-btns-group--icon-right": P.iconRight,
        "fr-btns-group--inline-reverse": P.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(Y, null, z(P.buttons, ({ onClick: B, ...M }, L) => (i(), f("li", { key: L }, [
        U(tt, H({ ref_for: !0 }, M, { onClick: B }), null, 16, ["onClick"])
      ]))), 128)),
      A(P.$slots, "default")
    ], 6));
  }
}), Sl = { class: "fr-callout__text" }, Nl = /* @__PURE__ */ O({
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
    const t = a, e = T(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = T(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : { ...t.icon ?? {} });
    return (n, l) => (i(), f("div", {
      class: S(["fr-callout", { [String(n.icon)]: e.value }])
    }, [
      n.icon && r.value ? (i(), N(de, ge(H({ key: 0 }, r.value)), null, 16)) : y("", !0),
      n.title ? (i(), N(pe(n.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: K(() => [
          R(b(n.title), 1)
        ]),
        _: 1
      })) : y("", !0),
      c("p", Sl, b(n.content), 1),
      n.button ? (i(), N(tt, ge(H({ key: 2 }, n.button)), null, 16)) : y("", !0),
      A(n.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Rl = /* @__PURE__ */ ve(Nl, [["__scopeId", "data-v-a34b4ad8"]]), Ot = /* @__PURE__ */ O({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const t = a, e = T(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), r = T(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (n, l) => (i(), f("p", {
      class: S(["fr-card__detail", e.value ? { [String(n.icon)]: e.value } : {}])
    }, [
      n.icon && !e.value ? (i(), N(de, ge(H({ key: 0 }, r.value)), null, 16)) : y("", !0),
      A(n.$slots, "default")
    ], 2));
  }
}), Vl = { class: "fr-card__body" }, jl = { class: "fr-card__content" }, ql = ["href"], Hl = { class: "fr-card__desc" }, Wl = {
  key: 0,
  class: "fr-card__start"
}, Yl = {
  key: 1,
  class: "fr-card__end"
}, Ql = {
  key: 0,
  class: "fr-card__footer"
}, Gl = {
  key: 1,
  class: "fr-links-group"
}, Kl = ["href"], zl = {
  key: 0,
  class: "fr-card__header"
}, Xl = {
  key: 0,
  class: "fr-card__img"
}, Ul = ["src", "alt"], Zl = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, Jl = /* @__PURE__ */ O({
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
    const e = a, r = T(() => ["sm", "small"].includes(e.size)), n = T(() => ["lg", "large"].includes(e.size)), l = T(() => ["sm", "small"].includes(e.imgRatio)), o = T(() => ["lg", "large"].includes(e.imgRatio)), s = T(() => typeof e.link == "string" && e.link.startsWith("http")), u = j(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const h = he("RouterLink");
      return i(), f("div", {
        class: S(["fr-card", {
          "fr-card--horizontal": d.horizontal,
          "fr-enlarge-link": !d.noArrow,
          "fr-card--sm": r.value,
          "fr-card--lg": n.value,
          "fr-card--horizontal-tier": l.value,
          "fr-card--horizontal-half": o.value,
          "fr-card--download": d.download,
          "fr-enlarge-button": d.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        c("div", Vl, [
          c("div", jl, [
            (i(), N(pe(d.titleTag), { class: "fr-card__title" }, {
              default: K(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, b(d.title), 9, ql)) : d.link ? (i(), N(h, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (D) => D.stopPropagation())
                }, {
                  default: K(() => [
                    R(b(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(Y, { key: 2 }, [
                  R(b(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Hl, b(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Wl, [
              A(d.$slots, "start-details"),
              d.detail ? (i(), N(Ot, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: K(() => [
                  R(b(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : y("", !0)
            ])) : y("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", Yl, [
              A(d.$slots, "end-details"),
              d.endDetail ? (i(), N(Ot, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: K(() => [
                  R(b(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : y("", !0)
            ])) : y("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", Ql, [
            d.buttons.length ? (i(), N(gt, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : y("", !0),
            d.linksGroup.length ? (i(), f("ul", Gl, [
              (i(!0), f(Y, null, z(d.linksGroup, (D, I) => (i(), f("li", {
                key: `card-link-${I}`
              }, [
                D.to ? (i(), N(h, {
                  key: 0,
                  to: D.to
                }, {
                  default: K(() => [
                    R(b(D.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: D.link || D.href,
                  class: S(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": r.value,
                    "fr-link--lg": n.value
                  }])
                }, b(D.label), 11, Kl))
              ]))), 128))
            ])) : y("", !0)
          ])) : y("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", zl, [
          d.imgSrc ? (i(), f("div", Xl, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, Ul)
          ])) : y("", !0),
          d.badges.length ? (i(), f("ul", Zl, [
            (i(!0), f(Y, null, z(d.badges, (D, I) => (i(), f("li", { key: I }, [
              U(Ya, H({ ref_for: !0 }, D), null, 16)
            ]))), 128))
          ])) : y("", !0)
        ])) : y("", !0)
      ], 2);
    };
  }
}), eo = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], to = ["for"], ao = {
  key: 0,
  class: "required"
}, no = {
  key: 0,
  class: "fr-hint-text"
}, ro = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, Ut = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ Ee({
    id: { default: () => te("basic", "checkbox") },
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
    const t = a, e = T(() => t.errorMessage || t.validMessage), r = T(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), n = be(a, "modelValue");
    return (l, o) => (i(), f("div", {
      class: S(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: S(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        xe(c("input", H({
          id: l.id,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => n.value = s),
          name: l.name,
          type: "checkbox",
          value: l.value,
          checked: n.value === !0 || Array.isArray(n.value) && n.value.includes(l.value),
          required: l.required
        }, l.$attrs, {
          "data-testid": `input-checkbox-${l.id}`,
          "data-test": `input-checkbox-${l.id}`
        }), null, 16, eo), [
          [Je, n.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          A(l.$slots, "label", {}, () => [
            R(b(l.label) + " ", 1),
            A(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", ao, " *")) : y("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", no, b(l.hint), 1)) : y("", !0)
        ], 8, to),
        e.value ? (i(), f("div", ro, [
          c("p", {
            class: S(["fr-message--info flex items-center", r.value])
          }, b(e.value), 3)
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), lo = { class: "fr-form-group" }, oo = ["disabled", "aria-labelledby", "aria-invalid", "role"], so = ["id"], io = {
  key: 0,
  class: "required"
}, uo = ["id"], co = /* @__PURE__ */ O({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Ee({
    titleId: { default: () => te("checkbox", "group") },
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
    const t = a, e = T(() => t.errorMessage || t.validMessage), r = T(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), n = T(() => e.value ? `${t.titleId} messages-${t.titleId}` : t.titleId), l = be(a, "modelValue");
    return (o, s) => (i(), f("div", lo, [
      c("fieldset", {
        class: S(["fr-fieldset", {
          "fr-fieldset--error": o.errorMessage,
          "fr-fieldset--valid": !o.errorMessage && o.validMessage
        }]),
        disabled: o.disabled,
        "aria-labelledby": n.value,
        "aria-invalid": o.ariaInvalid,
        role: o.errorMessage || o.validMessage ? "group" : void 0
      }, [
        c("legend", {
          id: o.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          A(o.$slots, "legend", {}, () => [
            R(b(o.legend) + " ", 1),
            A(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", io, " *")) : y("", !0)
            ])
          ])
        ], 8, so),
        A(o.$slots, "default", {}, () => [
          (i(!0), f(Y, null, z(o.options, (u) => (i(), N(Ut, {
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
            class: S(["fr-message--info flex items-center", r.value])
          }, [
            c("span", null, b(e.value), 1)
          ], 2)
        ], 8, uo)) : y("", !0)
      ], 10, oo)
    ]));
  }
}), fo = { class: "fr-consent-banner__content" }, po = { class: "fr-text--sm" }, mo = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, vo = /* @__PURE__ */ O({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(a) {
    const t = a, e = T(() => typeof t.url == "string" && t.url.startsWith("http")), r = T(() => t.url ? e.value ? "a" : "RouterLink" : "a"), n = T(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, o) => (i(), f(Y, null, [
      c("div", fo, [
        c("p", po, [
          A(l.$slots, "default", {}, () => [
            o[4] || (o[4] = R(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), N(pe(r.value), H(n.value, { "data-testid": "link" }), {
              default: K(() => o[3] || (o[3] = [
                R(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = R(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", mo, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = X((s) => l.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = X((s) => l.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = X((s) => l.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), ho = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, bo = { class: "fr-pagination__list" }, go = ["href", "title", "disabled", "aria-disabled"], yo = ["href", "title", "disabled", "aria-disabled"], ko = ["href", "title", "aria-current", "onClick"], wo = { key: 0 }, _o = { key: 1 }, Do = ["href", "title", "disabled", "aria-disabled"], xo = ["href", "title", "disabled", "aria-disabled"], To = /* @__PURE__ */ O({
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
    const e = a, r = t, n = T(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = T(() => Math.min(e.pages.length - 1, n.value + e.truncLimit)), o = T(() => e.pages.length > e.truncLimit ? e.pages.slice(n.value, l.value + 1) : e.pages), s = (_) => r("update:current-page", _), u = (_) => s(_), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), h = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), D = () => u(e.pages.length - 1), I = (_) => e.pages.indexOf(_) === e.currentPage;
    return (_, P) => {
      var m, B, M, L;
      return i(), f("nav", ho, [
        c("ul", bo, [
          c("li", null, [
            c("a", {
              href: (m = _.pages[0]) == null ? void 0 : m.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: _.firstPageTitle,
              disabled: _.currentPage === 0 ? !0 : void 0,
              "aria-disabled": _.currentPage === 0 ? !0 : void 0,
              onClick: P[0] || (P[0] = X((g) => d(), ["prevent"]))
            }, null, 8, go)
          ]),
          c("li", null, [
            c("a", {
              href: (B = _.pages[Math.max(_.currentPage - 1, 0)]) == null ? void 0 : B.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: _.prevPageTitle,
              disabled: _.currentPage === 0 ? !0 : void 0,
              "aria-disabled": _.currentPage === 0 ? !0 : void 0,
              onClick: P[1] || (P[1] = X((g) => p(), ["prevent"]))
            }, b(_.prevPageTitle), 9, yo)
          ]),
          (i(!0), f(Y, null, z(o.value, (g, k) => (i(), f("li", { key: k }, [
            c("a", {
              href: g == null ? void 0 : g.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: g.title,
              "aria-current": I(g) ? "page" : void 0,
              onClick: X((v) => u(_.pages.indexOf(g)), ["prevent"])
            }, [
              o.value.indexOf(g) === 0 && n.value > 0 ? (i(), f("span", wo, "...")) : y("", !0),
              R(" " + b(g.label) + " ", 1),
              o.value.indexOf(g) === o.value.length - 1 && l.value < _.pages.length - 1 ? (i(), f("span", _o, "...")) : y("", !0)
            ], 8, ko)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (M = _.pages[Math.min(_.currentPage + 1, _.pages.length - 1)]) == null ? void 0 : M.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: _.nextPageTitle,
              disabled: _.currentPage === _.pages.length - 1 ? !0 : void 0,
              "aria-disabled": _.currentPage === _.pages.length - 1 ? !0 : void 0,
              onClick: P[2] || (P[2] = X((g) => h(), ["prevent"]))
            }, b(_.nextPageTitle), 9, Do)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (L = _.pages.at(-1)) == null ? void 0 : L.href,
              title: _.lastPageTitle,
              disabled: _.currentPage === _.pages.length - 1 ? !0 : void 0,
              "aria-disabled": _.currentPage === _.pages.length - 1 ? !0 : void 0,
              onClick: P[3] || (P[3] = X((g) => D(), ["prevent"]))
            }, null, 8, xo)
          ])
        ])
      ]);
    };
  }
}), Zt = /* @__PURE__ */ ve(To, [["__scopeId", "data-v-4dfa8248"]]), Io = { class: "fr-table" }, Mo = { class: "fr-table__wrapper" }, Eo = { class: "fr-table__container" }, Co = { class: "fr-table__content" }, Bo = ["id"], Po = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Lo = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ao = ["id", "checked"], Oo = ["for"], $o = ["tabindex", "onClick", "onKeydown"], Fo = { key: 0 }, So = { key: 1 }, No = ["data-row-key"], Ro = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Vo = { class: "fr-checkbox-group fr-checkbox-group--sm" }, jo = ["id", "value"], qo = ["for"], Ho = ["onKeydown"], Wo = { class: "flex gap-2 items-center" }, Yo = ["selected"], Qo = ["value", "selected"], Go = { class: "flex ml-1" }, Ko = { class: "self-center" }, zo = /* @__PURE__ */ O({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Ee({
    id: { default: () => te("table") },
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
  emits: /* @__PURE__ */ Ee(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: t }) {
    const e = a, r = t, n = be(a, "selection"), l = be(a, "rowsPerPage"), o = be(a, "currentPage"), s = T(() => Math.ceil(e.rows.length / l.value)), u = T(() => e.pages ?? Array.from({ length: s.value }).map((v, E) => ({ label: `${E + 1}`, title: `Page ${E + 1}`, href: `#${E + 1}` }))), d = T(() => o.value * l.value), p = T(() => (o.value + 1) * l.value);
    function h(v, E) {
      const w = e.sorted;
      return (v[w] ?? v) < (E[w] ?? E) ? -1 : (v[w] ?? v) > (E[w] ?? E) ? 1 : 0;
    }
    const D = be(a, "sortedBy"), I = be(a, "sortedDesc");
    function _(v) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(v))) {
        if (D.value === v) {
          if (I.value) {
            D.value = void 0, I.value = !1;
            return;
          }
          I.value = !0;
          return;
        }
        I.value = !1, D.value = v;
      }
    }
    const P = T(() => {
      const v = D.value ? e.rows.slice().sort(e.sortFn ?? h) : e.rows.slice();
      return I.value && v.reverse(), v;
    }), m = T(() => {
      const v = e.headersRow.map((w) => typeof w != "object" ? w : w.key), E = P.value.map((w) => Array.isArray(w) ? w : v.map((G) => typeof w != "object" ? w : w[G] ?? w));
      return e.pagination ? E.slice(d.value, p.value) : E;
    });
    function B(v) {
      if (v) {
        const E = e.headersRow.findIndex((w) => w.key ?? w);
        n.value = m.value.map((w) => w[E]);
      }
      n.value.length = 0;
    }
    const M = j(!1);
    function L() {
      M.value = n.value.length === m.value.length;
    }
    function g() {
      r("update:current-page", 0), M.value = !1, n.value.length = 0;
    }
    function k(v) {
      navigator.clipboard.writeText(v);
    }
    return (v, E) => (i(), f("div", Io, [
      c("div", Mo, [
        c("div", Eo, [
          c("div", Co, [
            c("table", { id: v.id }, [
              c("caption", null, b(v.title), 1),
              c("thead", null, [
                c("tr", null, [
                  v.selectableRows ? (i(), f("th", Po, [
                    c("div", Lo, [
                      c("input", {
                        id: `table-select--${v.id}-all`,
                        checked: M.value,
                        type: "checkbox",
                        onInput: E[0] || (E[0] = (w) => B(w.target.checked))
                      }, null, 40, Ao),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${v.id}-all`
                      }, " Sélectionner tout ", 8, Oo)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(Y, null, z(v.headersRow, (w, G) => (i(), f("th", H({
                    key: typeof w == "object" ? w.key : w,
                    scope: "col",
                    ref_for: !0
                  }, typeof w == "object" && w.headerAttrs, {
                    tabindex: v.sortableRows ? 0 : void 0,
                    onClick: (x) => _(w.key ?? (Array.isArray(v.rows[0]) ? G : w)),
                    onKeydown: [
                      Z((x) => _(w.key ?? w), ["enter"]),
                      Z((x) => _(w.key ?? w), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: S({ "sortable-header": v.sortableRows === !0 || Array.isArray(v.sortableRows) && v.sortableRows.includes(w.key ?? w) })
                    }, [
                      A(v.$slots, "header", H({ ref_for: !0 }, typeof w == "object" ? w : { key: w, label: w }), () => [
                        R(b(typeof w == "object" ? w.label : w), 1)
                      ], !0),
                      D.value !== (w.key ?? w) && (v.sortableRows === !0 || Array.isArray(v.sortableRows) && v.sortableRows.includes(w.key ?? w)) ? (i(), f("span", Fo, [
                        U(de, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : D.value === (w.key ?? w) ? (i(), f("span", So, [
                        U(de, {
                          name: I.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : y("", !0)
                    ], 2)
                  ], 16, $o))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(Y, null, z(m.value, (w, G) => (i(), f("tr", {
                  key: `row-${G}`,
                  "data-row-key": G + 1
                }, [
                  v.selectableRows ? (i(), f("th", Ro, [
                    c("div", Vo, [
                      xe(c("input", {
                        id: `row-select-${v.id}-${G}`,
                        "onUpdate:modelValue": E[1] || (E[1] = (x) => n.value = x),
                        value: v.rows[G][v.rowKey] ?? `row-${G}`,
                        type: "checkbox",
                        onChange: E[2] || (E[2] = (x) => L())
                      }, null, 40, jo), [
                        [Je, n.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${v.id}-${G}`
                      }, " Sélectionner la ligne " + b(G + 1), 9, qo)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(Y, null, z(w, (x, C) => (i(), f("td", {
                    key: typeof x == "object" ? x[v.rowKey] : x,
                    tabindex: "0",
                    onKeydown: [
                      Z(X((q) => k(typeof x == "object" ? x[v.rowKey] : x), ["ctrl"]), ["c"]),
                      Z(X((q) => k(typeof x == "object" ? x[v.rowKey] : x), ["meta"]), ["c"])
                    ]
                  }, [
                    A(v.$slots, "cell", H({ ref_for: !0 }, {
                      colKey: typeof v.headersRow[C] == "object" ? v.headersRow[C].key : v.headersRow[C],
                      cell: x
                    }), () => [
                      R(b(typeof x == "object" ? x[v.rowKey] : x), 1)
                    ], !0)
                  ], 40, Ho))), 128))
                ], 8, No))), 128))
              ])
            ], 8, Bo)
          ])
        ])
      ]),
      c("div", {
        class: S(v.bottomActionBarClass)
      }, [
        A(v.$slots, "pagination", {}, () => [
          v.pagination && !v.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: S(["flex justify-between items-center", v.paginationWrapperClass])
          }, [
            c("div", Wo, [
              E[6] || (E[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              xe(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": E[3] || (E[3] = (w) => l.value = w),
                class: "fr-select",
                onChange: E[4] || (E[4] = (w) => g())
              }, [
                c("option", {
                  value: "",
                  selected: !v.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Yo),
                (i(!0), f(Y, null, z(v.paginationOptions, (w, G) => (i(), f("option", {
                  key: G,
                  value: w,
                  selected: +w === l.value
                }, b(w), 9, Qo))), 128))
              ], 544), [
                [qt, l.value]
              ])
            ]),
            c("div", Go, [
              c("span", Ko, "Page " + b(o.value + 1) + " sur " + b(s.value), 1)
            ]),
            U(Zt, {
              "current-page": o.value,
              "onUpdate:currentPage": E[5] || (E[5] = (w) => o.value = w),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : y("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Xo = /* @__PURE__ */ ve(zo, [["__scopeId", "data-v-1d55e1f1"]]), Uo = "data:image/png;base64,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", Zo = { class: "fr-container flex" }, Jo = { class: "half" }, es = { class: "fr-h1" }, ts = { class: "flex fr-my-md-3w" }, as = { class: "fr-h6" }, ns = /* @__PURE__ */ O({
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
      var r;
      return i(), f("div", Zo, [
        c("div", Jo, [
          c("h1", es, b(t.title), 1),
          c("span", ts, b(t.subtitle), 1),
          c("p", as, b(t.description), 1),
          c("p", null, b(t.help), 1),
          (r = t.buttons) != null && r.length ? (i(), N(gt, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : y("", !0),
          A(t.$slots, "default", {}, void 0, !0)
        ]),
        e[0] || (e[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: Uo
          })
        ], -1))
      ]);
    };
  }
}), rs = /* @__PURE__ */ ve(ns, [["__scopeId", "data-v-0f6cf5b4"]]), ls = { class: "fr-fieldset" }, os = ["id"], ss = {
  key: 1,
  class: "fr-fieldset__element"
}, is = { class: "fr-fieldset__element" }, us = /* @__PURE__ */ O({
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
      var r, n, l, o;
      return i(), f("fieldset", ls, [
        t.legend || (n = (r = t.$slots).legend) != null && n.call(r).length ? (i(), f("legend", {
          key: 0,
          id: t.legendId,
          class: S(["fr-fieldset__legend", t.legendClass])
        }, [
          R(b(t.legend) + " ", 1),
          A(t.$slots, "legend")
        ], 10, os)) : y("", !0),
        t.hint || (o = (l = t.$slots).hint) != null && o.call(l).length ? (i(), f("div", ss, [
          c("span", {
            class: S(["fr-hint-text", t.hintClass])
          }, [
            R(b(t.hint) + " ", 1),
            A(t.$slots, "hint")
          ], 2)
        ])) : y("", !0),
        c("div", is, [
          A(t.$slots, "default")
        ])
      ]);
    };
  }
}), ds = ["href", "download"], cs = { class: "fr-link__detail" }, sn = /* @__PURE__ */ O({
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
      R(b(t.title) + " ", 1),
      c("span", cs, b(t.format) + " – " + b(t.size), 1)
    ], 8, ds));
  }
}), fs = { class: "fr-downloads-group fr-downloads-group--bordered" }, ps = {
  key: 0,
  class: "fr-downloads-group__title"
}, ms = /* @__PURE__ */ O({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", fs, [
      t.title ? (i(), f("h4", ps, b(t.title), 1)) : y("", !0),
      c("ul", null, [
        (i(!0), f(Y, null, z(t.files, (r, n) => (i(), f("li", { key: n }, [
          U(sn, {
            title: r.title,
            format: r.format,
            size: r.size,
            href: r.href,
            download: r.download
          }, null, 8, ["title", "format", "size", "href", "download"])
        ]))), 128))
      ])
    ]));
  }
}), vs = ["for"], hs = {
  key: 0,
  class: "required"
}, bs = {
  key: 1,
  class: "fr-hint-text"
}, gs = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], ys = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, ks = ["id"], ws = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => te("file-upload") },
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
    const e = a, r = t, n = (o) => {
      var s, u;
      r("update:modelValue", (s = o.target) == null ? void 0 : s.value), r("change", (u = o.target) == null ? void 0 : u.files);
    }, l = T(() => Array.isArray(e.accept) ? e.accept.join(",") : e.accept);
    return (o, s) => (i(), f("div", {
      class: S(["fr-upload-group", {
        "fr-upload-group--error": o.error,
        "fr-upload-group--valid": o.validMessage,
        "fr-upload-group--disabled": o.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: o.id
      }, [
        R(b(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", hs, " *")) : y("", !0),
        o.hint ? (i(), f("span", bs, b(o.hint), 1)) : y("", !0)
      ], 8, vs),
      c("input", H({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: l.value,
        onChange: s[0] || (s[0] = (u) => n(u))
      }), null, 16, gs),
      o.error || o.validMessage ? (i(), f("div", ys, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, b(o.error ?? o.validMessage), 9, ks)) : y("", !0)
      ])) : y("", !0)
    ], 2));
  }
}), _s = { class: "fr-follow__newsletter" }, Ds = { class: "fr-h5 fr-follow__title" }, xs = { class: "fr-text--sm fr-follow__desc" }, Ts = { key: 0 }, Is = ["title"], Ms = { key: 1 }, Es = { action: "" }, Cs = {
  class: "fr-label",
  for: "newsletter-email"
}, Bs = { class: "fr-input-wrap fr-input-wrap--addon" }, Ps = ["title", "placeholder", "value"], Ls = ["title"], As = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Os = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, $s = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, un = /* @__PURE__ */ O({
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
    const e = t, r = (n) => e("update:email", n.target.value);
    return (n, l) => (i(), f("div", _s, [
      c("div", null, [
        c("h3", Ds, b(n.title), 1),
        c("p", xs, b(n.description), 1)
      ]),
      n.onlyCallout ? (i(), f("div", Ts, [
        c("button", {
          class: "fr-btn",
          title: n.buttonTitle,
          onClick: l[0] || (l[0] = (o) => n.buttonAction ? n.buttonAction(o) : () => {
          })
        }, b(n.buttonText), 9, Is)
      ])) : (i(), f("div", Ms, [
        c("form", Es, [
          c("label", Cs, b(n.labelEmail), 1),
          c("div", Bs, [
            c("input", {
              id: "newsletter-email",
              class: "fr-input",
              "aria-describedby": "fr-newsletter-hint-text",
              title: n.inputTitle || n.labelEmail,
              placeholder: n.placeholder || n.labelEmail,
              type: "email",
              name: "newsletter-email",
              value: n.email,
              autocomplete: "email",
              onInput: l[1] || (l[1] = (o) => r(o))
            }, null, 40, Ps),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: n.buttonTitle,
              type: "submit"
            }, b(n.buttonText), 9, Ls)
          ]),
          n.error ? (i(), f("div", As, [
            c("p", Os, b(n.error), 1)
          ])) : y("", !0),
          c("p", $s, b(n.hintText), 1)
        ])
      ]))
    ]));
  }
}), Fs = { class: "fr-follow__social" }, Ss = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Ns = ["title", "href"], dn = /* @__PURE__ */ O({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Fs, [
      (i(), N(pe(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: K(() => e[0] || (e[0] = [
          R(" Suivez-nous "),
          c("br", null, null, -1),
          R(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Ss, [
        (i(!0), f(Y, null, z(t.networks, (r, n) => (i(), f("li", { key: n }, [
          c("a", {
            class: S(["fr-btn", `fr-btn--${r.type}`]),
            title: r.name,
            href: r.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, b(r.name), 11, Ns)
        ]))), 128))
      ])) : y("", !0)
    ]));
  }
}), Rs = { class: "fr-follow" }, Vs = { class: "fr-container" }, js = { class: "fr-grid-row" }, qs = /* @__PURE__ */ O({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const t = a, e = T(() => t.networks && t.networks.length), r = T(() => typeof t.newsletterData == "object");
    return (n, l) => (i(), f("div", Rs, [
      c("div", Vs, [
        c("div", js, [
          A(n.$slots, "default", {}, () => [
            n.newsletterData ? (i(), f("div", {
              key: 0,
              class: S(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              U(un, ge(Vt(n.newsletterData)), null, 16)
            ], 2)) : y("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: S(["fr-col-12", { "fr-col-md-4": r.value }])
            }, [
              U(dn, { networks: n.networks }, null, 8, ["networks"])
            ], 2)) : y("", !0)
          ])
        ])
      ])
    ]));
  }
}), Da = 1, cn = /* @__PURE__ */ O({
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
    const t = a, e = T(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("http");
    }), r = T(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("mailto");
    }), n = T(() => t.button ? "button" : e.value || r.value ? "a" : "RouterLink"), l = T(() => {
      if (!(!e.value && !r.value))
        return t.href;
    }), o = T(() => {
      if (!(e.value || r.value))
        return t.to;
    }), s = T(() => o.value ? { to: o.value } : { href: l.value }), u = T(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), d = T(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Da, ...t.iconAttrs ?? {} } : { scale: Da, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (p, h) => (i(), N(pe(n.value), H({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, s.value, {
      target: p.target,
      onClick: X(p.onClick, ["stop"])
    }), {
      default: K(() => {
        var D, I;
        return [
          !u.value && (p.icon || (D = p.iconAttrs) != null && D.name) && !p.iconRight ? (i(), N(de, H({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : y("", !0),
          R(" " + b(p.label) + " ", 1),
          !u.value && (p.icon || (I = p.iconAttrs) != null && I.name) && p.iconRight ? (i(), N(de, H({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : y("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Hs = { class: "fr-footer__partners" }, Ws = {
  key: 0,
  class: "fr-footer__partners-title"
}, Ys = { class: "fr-footer__partners-logos" }, Qs = {
  key: 0,
  class: "fr-footer__partners-main"
}, Gs = ["href"], Ks = ["src", "alt"], zs = { class: "fr-footer__partners-sub" }, Xs = ["href"], Us = ["src", "alt"], fn = /* @__PURE__ */ O({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Hs, [
      t.title ? (i(), f("h4", Ws, b(t.title), 1)) : y("", !0),
      c("div", Ys, [
        t.mainPartner ? (i(), f("div", Qs, [
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
            }, null, 8, Ks)
          ], 8, Gs)
        ])) : y("", !0),
        c("div", zs, [
          c("ul", null, [
            (i(!0), f(Y, null, z(t.subPartners, (r, n) => (i(), f("li", { key: n }, [
              c("a", {
                class: "fr-footer__partners-link",
                href: r.href,
                target: "_blank",
                rel: "noopener noreferrer"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  src: r.logo,
                  alt: r.name
                }, null, 8, Us)
              ], 8, Xs)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Zs = ["innerHTML"], Xe = /* @__PURE__ */ O({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const t = a, e = T(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (r, n) => (i(), f("p", {
      class: S(["fr-logo", {
        "fr-logo--sm": r.small && !r.large,
        "fr-logo--lg": r.large && !r.small
      }]),
      innerHTML: e.value
    }, null, 10, Zs));
  }
}), Js = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, ei = {
  key: 0,
  class: "fr-footer__top"
}, ti = { class: "fr-container" }, ai = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, ni = { class: "fr-container" }, ri = { class: "fr-footer__body" }, li = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, oi = ["href"], si = ["src", "alt"], ii = ["src", "alt"], ui = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, di = { class: "fr-footer__content" }, ci = { class: "fr-footer__content-desc" }, fi = { class: "fr-footer__content-list" }, pi = ["href", "title"], mi = { class: "fr-footer__bottom" }, vi = { class: "fr-footer__bottom-list" }, hi = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, bi = /* @__PURE__ */ O({
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
    const t = a, e = T(() => [
      ...t.beforeMandatoryLinks,
      ...t.mandatoryLinks,
      ...t.afterMandatoryLinks
    ]), r = jt(), n = T(() => {
      var p;
      return (p = r["footer-link-lists"]) == null ? void 0 : p.call(r).length;
    }), l = T(() => {
      const p = t.licenceTo || t.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = T(() => {
      const { to: p, href: h, ...D } = t.licenceLinkProps ?? {};
      return D;
    }), s = T(() => l.value ? "" : t.licenceTo), u = T(() => l.value ? t.licenceTo : ""), d = T(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, h) => {
      const D = he("RouterLink");
      return i(), f("footer", Js, [
        n.value ? (i(), f("div", ei, [
          c("div", ti, [
            c("div", ai, [
              A(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : y("", !0),
        c("div", ni, [
          c("div", ri, [
            p.operatorImgSrc ? (i(), f("div", li, [
              U(Xe, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              d.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: ye(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, si)
              ], 8, oi)) : (i(), N(D, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: K(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: ye(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, ii)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", ui, [
              U(D, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: K(() => [
                  U(Xe, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", di, [
              c("p", ci, [
                A(p.$slots, "description", {}, () => [
                  R(b(p.descText), 1)
                ], !0)
              ]),
              c("ul", fi, [
                (i(!0), f(Y, null, z(p.ecosystemLinks, ({ href: I, label: _, title: P, ...m }, B) => (i(), f("li", {
                  key: B,
                  class: "fr-footer__content-item"
                }, [
                  c("a", H({
                    class: "fr-footer__content-link",
                    href: I,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: P,
                    ref_for: !0
                  }, m), b(_), 17, pi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), N(fn, ge(H({ key: 0 }, p.partners)), null, 16)) : y("", !0),
          c("div", mi, [
            c("ul", vi, [
              (i(!0), f(Y, null, z(e.value, (I, _) => (i(), f("li", {
                key: _,
                class: "fr-footer__bottom-item"
              }, [
                U(cn, H({ ref_for: !0 }, I), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", hi, [
              c("p", null, [
                R(b(p.licenceText) + " ", 1),
                (i(), N(pe(l.value ? "a" : "RouterLink"), H({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : s.value,
                  href: l.value ? u.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: K(() => [
                    R(b(p.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target"]))
              ])
            ])) : y("", !0)
          ])
        ])
      ]);
    };
  }
}), gi = /* @__PURE__ */ ve(bi, [["__scopeId", "data-v-4d6f52aa"]]), yi = { class: "fr-footer__top-cat" }, ki = { class: "fr-footer__top-list" }, wi = ["href"], _i = /* @__PURE__ */ O({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(a) {
    return (t, e) => {
      const r = he("RouterLink");
      return i(), f("div", null, [
        c("h3", yi, b(t.categoryName), 1),
        c("ul", ki, [
          (i(!0), f(Y, null, z(t.links, (n, l) => (i(), f("li", { key: l }, [
            typeof n.to == "string" && n.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.to
            }, b(n.label), 9, wi)) : y("", !0),
            typeof n.to == "object" || typeof n.to == "string" && !n.to.startsWith("http") ? (i(), N(r, {
              key: 1,
              class: "fr-footer__top-link",
              to: n.to
            }, {
              default: K(() => [
                R(b(n.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : y("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Di = { class: "fr-connect-group" }, xi = { class: "fr-connect__brand" }, Ti = ["href", "title"], Ii = /* @__PURE__ */ O({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Di, [
      c("button", {
        class: S(["fr-connect", [{ "fr-connect--plus": t.secure }]])
      }, [
        e[0] || (e[0] = c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        c("span", xi, "FranceConnect" + b(t.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: t.url ?? `https://franceconnect.gouv.fr/${t.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, b(`Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ?`), 9, Ti)
      ])
    ]));
  }
}), Mi = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Ei = { class: "fr-nav__item" }, Ci = ["aria-controls", "aria-expanded"], Bi = { class: "fr-hidden-lg" }, Pi = ["id"], Li = { class: "fr-menu__list" }, Ai = ["hreflang", "lang", "aria-current", "href", "onClick"], Ue = /* @__PURE__ */ O({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => te("translate") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" }
  },
  emits: ["select"],
  setup(a, { emit: t }) {
    const e = a, r = t, {
      collapse: n,
      collapsing: l,
      cssExpanded: o,
      doExpand: s,
      onTransitionEnd: u
    } = Pe(), d = j(!1);
    function p(D) {
      d.value = !1, r("select", D);
    }
    const h = T(
      () => e.languages.find(({ codeIso: D }) => D === e.currentLanguage)
    );
    return ue(d, (D, I) => {
      D !== I && s(D);
    }), (D, I) => {
      var _, P;
      return i(), f("nav", Mi, [
        c("div", Ei, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": D.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: I[0] || (I[0] = X((m) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            R(b((_ = h.value) == null ? void 0 : _.codeIso.toUpperCase()), 1),
            c("span", Bi, " - " + b((P = h.value) == null ? void 0 : P.label), 1)
          ], 8, Ci),
          c("div", {
            id: D.id,
            ref_key: "collapse",
            ref: n,
            class: S(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": F(o), "fr-collapsing": F(l) }]),
            onTransitionend: I[1] || (I[1] = (m) => F(u)(d.value))
          }, [
            c("ul", Li, [
              (i(!0), f(Y, null, z(D.languages, (m, B) => (i(), f("li", { key: B }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: m.codeIso,
                  lang: m.codeIso,
                  "aria-current": D.currentLanguage === m.codeIso ? !0 : void 0,
                  href: `#${m.codeIso}`,
                  onClick: X((M) => p(m), ["prevent", "stop"])
                }, b(`${m.codeIso.toUpperCase()} - ${m.label}`), 9, Ai)
              ]))), 128))
            ])
          ], 42, Pi)
        ])
      ]);
    };
  }
}), Oi = ["for"], $i = {
  key: 0,
  class: "required"
}, Fi = {
  key: 0,
  class: "fr-hint-text"
}, Si = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => te("basic", "input") },
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
    const e = a, r = nr(), n = j(null), l = () => {
      var d;
      return (d = n.value) == null ? void 0 : d.focus();
    }, o = T(() => e.isTextarea ? "textarea" : "input"), s = T(() => e.isWithWrapper || r.type === "date" || !!e.wrapperClass), u = T(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return t({
      focus: l
    }), (d, p) => (i(), f(Y, null, [
      c("label", {
        class: S(u.value),
        for: d.id
      }, [
        A(d.$slots, "label", {}, () => [
          R(b(d.label) + " ", 1),
          A(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", $i, "*")) : y("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", Fi, b(d.hint), 1)) : y("", !0)
      ], 10, Oi),
      s.value ? (i(), f("div", {
        key: 1,
        class: S([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), N(pe(o.value), H({ id: d.id }, d.$attrs, {
          ref_key: "__input",
          ref: n,
          class: ["fr-input", {
            "fr-input--error": d.isInvalid,
            "fr-input--valid": d.isValid
          }],
          value: d.modelValue,
          "aria-describedby": d.descriptionId || void 0,
          onInput: p[1] || (p[1] = (h) => d.$emit("update:modelValue", h.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (i(), N(pe(o.value), H({
        key: 0,
        id: d.id
      }, d.$attrs, {
        ref_key: "__input",
        ref: n,
        class: ["fr-input", {
          "fr-input--error": d.isInvalid,
          "fr-input--valid": d.isValid
        }],
        value: d.modelValue,
        "aria-describedby": d.descriptionId || void 0,
        onInput: p[0] || (p[0] = (h) => d.$emit("update:modelValue", h.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), Jt = /* @__PURE__ */ ve(Si, [["__scopeId", "data-v-6e6c295a"]]), Ze = /* @__PURE__ */ O({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => te("search", "input") },
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
    return (r, n) => (i(), f("div", {
      class: S(["fr-search-bar", { "fr-search-bar--lg": r.large }]),
      role: "search"
    }, [
      U(Jt, {
        id: r.id,
        type: "search",
        placeholder: r.placeholder,
        "model-value": r.modelValue,
        "label-visible": r.labelVisible,
        label: r.label,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        "onUpdate:modelValue": n[0] || (n[0] = (l) => e("update:modelValue", l)),
        onKeydown: n[1] || (n[1] = Z((l) => e("search", r.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      U(tt, {
        title: "Rechercher",
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        onClick: n[2] || (n[2] = (l) => e("search", r.modelValue))
      }, {
        default: K(() => [
          R(b(r.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), xa = 1, ea = /* @__PURE__ */ O({
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
  setup(a) {
    const t = a, e = T(() => typeof t.path == "string"), r = T(() => {
      var h;
      return ((h = t.href) == null ? void 0 : h.startsWith("http")) || e.value && t.path.startsWith("http") || typeof t.to == "string" && t.to.startsWith("http");
    }), n = T(() => {
      var h;
      return ((h = t.href) == null ? void 0 : h.startsWith("mailto")) || e.value && t.path.startsWith("mailto") || typeof t.to == "string" && t.to.startsWith("mailto");
    }), l = T(() => t.button ? "button" : r.value || n.value ? "a" : "RouterLink"), o = T(() => {
      if (!(!r.value && !n.value))
        return t.to ?? t.href ?? t.path;
    }), s = T(() => {
      if (!(r.value || n.value))
        return t.to ?? t.path;
    }), u = T(() => s.value ? { to: s.value } : { href: o.value }), d = T(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), p = T(
      () => typeof t.icon == "string" ? { name: t.icon, scale: xa, ...t.iconAttrs ?? {} } : { scale: xa, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (h, D) => (i(), N(pe(l.value), H({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && h.iconRight,
        "fr-btn--icon-left": d.value && !h.iconRight,
        [String(h.icon)]: d.value
      }]
    }, u.value, {
      target: h.target,
      onClick: D[0] || (D[0] = X((I) => h.onClick(I), ["stop"]))
    }), {
      default: K(() => {
        var I, _;
        return [
          !d.value && (h.icon || (I = h.iconAttrs) != null && I.name) && !h.iconRight ? (i(), N(de, H({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : y("", !0),
          R(" " + b(h.label) + " ", 1),
          !d.value && (h.icon || (_ = h.iconAttrs) != null && _.name) && h.iconRight ? (i(), N(de, H({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : y("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Ni = ["aria-label"], Ri = { class: "fr-btns-group" }, $t = /* @__PURE__ */ O({
  __name: "DsfrHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(a, { emit: t }) {
    const e = t;
    return (r, n) => (i(), f("nav", {
      role: "navigation",
      "aria-label": r.navAriaLabel
    }, [
      c("ul", Ri, [
        (i(!0), f(Y, null, z(r.links, (l, o) => (i(), f("li", { key: o }, [
          U(ea, H({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Ni));
  }
}), Vi = {
  role: "banner",
  class: "fr-header"
}, ji = { class: "fr-header__body" }, qi = { class: "fr-container width-inherit" }, Hi = { class: "fr-header__body-row" }, Wi = { class: "fr-header__brand fr-enlarge-link" }, Yi = { class: "fr-header__brand-top" }, Qi = { class: "fr-header__logo" }, Gi = {
  key: 0,
  class: "fr-header__operator"
}, Ki = ["src", "alt"], zi = {
  key: 1,
  class: "fr-header__navbar"
}, Xi = ["aria-label", "title", "data-fr-opened"], Ui = ["aria-label", "title"], Zi = {
  key: 0,
  class: "fr-header__service"
}, Ji = { class: "fr-header__service-title" }, eu = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, tu = {
  key: 0,
  class: "fr-header__service-tagline"
}, au = {
  key: 1,
  class: "fr-header__service"
}, nu = { class: "fr-header__tools" }, ru = {
  key: 0,
  class: "fr-header__tools-links"
}, lu = {
  key: 1,
  class: "fr-header__search fr-modal"
}, ou = ["aria-label"], su = { class: "fr-container" }, iu = { class: "fr-header__menu-links" }, uu = { role: "navigation" }, du = {
  key: 1,
  class: "flex justify-center items-center"
}, cu = { class: "fr-header__menu fr-modal" }, fu = {
  key: 0,
  class: "fr-container"
}, pu = /* @__PURE__ */ O({
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
  setup(a, { emit: t }) {
    const e = a, r = t, n = et(e, "languageSelector"), l = j(!1), o = j(!1), s = j(!1), u = () => {
      var m;
      s.value = !1, l.value = !1, o.value = !1, (m = document.getElementById("button-menu")) == null || m.focus();
    }, d = (m) => {
      m.key === "Escape" && u();
    };
    fe(() => {
      document.addEventListener("keydown", d);
    }), we(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var m;
      s.value = !0, l.value = !0, o.value = !1, (m = document.getElementById("close-button")) == null || m.focus();
    }, h = () => {
      s.value = !0, l.value = !1, o.value = !0;
    }, D = u, I = jt(), _ = T(() => {
      var m;
      return !!((m = I.operator) != null && m.call(I).length) || !!e.operatorImgSrc;
    }), P = T(() => !!I.mainnav);
    return Ce(Wt, () => u), (m, B) => {
      var M, L, g;
      const k = he("RouterLink");
      return i(), f("header", Vi, [
        c("div", ji, [
          c("div", qi, [
            c("div", Hi, [
              c("div", Wi, [
                c("div", Yi, [
                  c("div", Qi, [
                    U(k, {
                      to: m.homeTo,
                      title: `${m.homeLabel} - ${m.serviceTitle}`
                    }, {
                      default: K(() => [
                        U(Xe, {
                          "logo-text": m.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  _.value ? (i(), f("div", Gi, [
                    A(m.$slots, "operator", {}, () => [
                      m.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: m.operatorImgSrc,
                        alt: m.operatorImgAlt,
                        style: ye(m.operatorImgStyle)
                      }, null, 12, Ki)) : y("", !0)
                    ])
                  ])) : y("", !0),
                  m.showSearch || P.value || (M = m.quickLinks) != null && M.length ? (i(), f("div", zi, [
                    m.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": m.showSearchLabel,
                      title: m.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: B[0] || (B[0] = X((v) => h(), ["prevent", "stop"]))
                    }, null, 8, Xi)) : y("", !0),
                    P.value || (L = m.quickLinks) != null && L.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": m.menuLabel,
                      title: m.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: B[1] || (B[1] = X((v) => p(), ["prevent", "stop"]))
                    }, null, 8, Ui)) : y("", !0)
                  ])) : y("", !0)
                ]),
                m.serviceTitle ? (i(), f("div", Zi, [
                  U(k, H({
                    to: m.homeTo,
                    title: `${m.homeLabel} - ${m.serviceTitle}`
                  }, m.$attrs), {
                    default: K(() => [
                      c("p", Ji, [
                        R(b(m.serviceTitle) + " ", 1),
                        m.showBeta ? (i(), f("span", eu, " BETA ")) : y("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  m.serviceDescription ? (i(), f("p", tu, b(m.serviceDescription), 1)) : y("", !0)
                ])) : y("", !0),
                !m.serviceTitle && m.showBeta ? (i(), f("div", au, B[9] || (B[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : y("", !0)
              ]),
              c("div", nu, [
                (g = m.quickLinks) != null && g.length || n.value ? (i(), f("div", ru, [
                  l.value ? y("", !0) : (i(), N($t, {
                    key: 0,
                    links: m.quickLinks,
                    "nav-aria-label": m.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  n.value ? (i(), N(Ue, H({ key: 1 }, n.value, {
                    onSelect: B[2] || (B[2] = (v) => r("language-select", v))
                  }), null, 16)) : y("", !0)
                ])) : y("", !0),
                m.showSearch ? (i(), f("div", lu, [
                  U(Ze, {
                    "searchbar-id": m.searchbarId,
                    label: m.searchLabel,
                    "model-value": m.modelValue,
                    placeholder: m.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": B[3] || (B[3] = (v) => r("update:modelValue", v)),
                    onSearch: B[4] || (B[4] = (v) => r("search", v))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ]),
            m.showSearch || P.value || m.quickLinks && m.quickLinks.length || n.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: S(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": m.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", su, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: B[5] || (B[5] = X((v) => u(), ["prevent", "stop"]))
                }, b(m.closeMenuModalLabel), 1),
                c("div", iu, [
                  n.value ? (i(), N(Ue, H({ key: 0 }, n.value, {
                    onSelect: B[6] || (B[6] = (v) => n.value.currentLanguage = v.codeIso)
                  }), null, 16)) : y("", !0),
                  c("nav", uu, [
                    l.value ? (i(), N($t, {
                      key: 0,
                      role: "navigation",
                      links: m.quickLinks,
                      "nav-aria-label": m.quickLinksAriaLabel,
                      onLinkClick: F(D)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : y("", !0)
                  ])
                ]),
                s.value ? A(m.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : y("", !0),
                o.value ? (i(), f("div", du, [
                  U(Ze, {
                    "searchbar-id": m.searchbarId,
                    "model-value": m.modelValue,
                    placeholder: m.placeholder,
                    "onUpdate:modelValue": B[7] || (B[7] = (v) => r("update:modelValue", v)),
                    onSearch: B[8] || (B[8] = (v) => r("search", v))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ], 10, ou)) : y("", !0),
            A(m.$slots, "default")
          ])
        ]),
        c("div", cu, [
          P.value && !s.value ? (i(), f("div", fu, [
            A(m.$slots, "mainnav", { hidemodal: u })
          ])) : y("", !0)
        ])
      ]);
    };
  }
}), mu = /* @__PURE__ */ O({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", {
      class: S(["fr-highlight", { [`fr-highlight--${t.color}`]: t.color }])
    }, [
      c("p", {
        class: S({
          "fr-text--lg": t.large && !t.small,
          "fr-text--sm": t.small && !t.large
        })
      }, [
        R(b(t.text) + " ", 1),
        A(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), vu = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, hu = ["id", "data-testid"], bu = ["id", "data-testid"], gu = ["id", "data-testid"], yu = ["id", "data-testid"], ku = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => te("basic", "input") },
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
      class: S(["fr-input-group", [
        {
          "fr-input-group--error": t.errorMessage,
          "fr-input-group--valid": t.validMessage && !t.errorMessage
        },
        t.wrapperClass
      ]])
    }, [
      A(t.$slots, "before-input"),
      A(t.$slots, "default"),
      t.$slots.default ? y("", !0) : (i(), N(Jt, H({ key: 0 }, t.$attrs, {
        "is-valid": !!t.validMessage,
        "is-invalid": !!t.errorMessage,
        label: t.label,
        hint: t.hint,
        "description-id": (t.errorMessage || t.validMessage) && t.descriptionId || void 0,
        "label-visible": t.labelVisible,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": e[0] || (e[0] = (r) => t.$emit("update:modelValue", r))
      }), null, 16, ["is-valid", "is-invalid", "label", "hint", "description-id", "label-visible", "model-value", "placeholder"])),
      c("div", vu, [
        Array.isArray(t.errorMessage) ? (i(!0), f(Y, { key: 0 }, z(t.errorMessage, (r) => (i(), f("p", {
          id: t.descriptionId,
          key: r,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, b(r), 9, hu))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, b(t.errorMessage), 9, bu)) : y("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(Y, { key: 2 }, z(t.validMessage, (r) => (i(), f("p", {
          id: t.descriptionId,
          key: r,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, b(r), 9, gu))), 128)) : t.validMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.validMessage,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, b(t.validMessage), 9, yu)) : y("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var pn = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], it = /* @__PURE__ */ pn.join(","), mn = typeof Element > "u", Fe = mn ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ut = !mn && Element.prototype.getRootNode ? function(a) {
  var t;
  return a == null || (t = a.getRootNode) === null || t === void 0 ? void 0 : t.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, dt = function a(t, e) {
  var r;
  e === void 0 && (e = !0);
  var n = t == null || (r = t.getAttribute) === null || r === void 0 ? void 0 : r.call(t, "inert"), l = n === "" || n === "true", o = l || e && t && a(t.parentNode);
  return o;
}, wu = function(a) {
  var t, e = a == null || (t = a.getAttribute) === null || t === void 0 ? void 0 : t.call(a, "contenteditable");
  return e === "" || e === "true";
}, vn = function(a, t, e) {
  if (dt(a))
    return [];
  var r = Array.prototype.slice.apply(a.querySelectorAll(it));
  return t && Fe.call(a, it) && r.unshift(a), r = r.filter(e), r;
}, hn = function a(t, e, r) {
  for (var n = [], l = Array.from(t); l.length; ) {
    var o = l.shift();
    if (!dt(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), u = s.length ? s : o.children, d = a(u, !0, r);
        r.flatten ? n.push.apply(n, d) : n.push({
          scopeParent: o,
          candidates: d
        });
      } else {
        var p = Fe.call(o, it);
        p && r.filter(o) && (e || !t.includes(o)) && n.push(o);
        var h = o.shadowRoot || // check for an undisclosed shadow
        typeof r.getShadowRoot == "function" && r.getShadowRoot(o), D = !dt(h, !1) && (!r.shadowRootFilter || r.shadowRootFilter(o));
        if (h && D) {
          var I = a(h === !0 ? o.children : h.children, !0, r);
          r.flatten ? n.push.apply(n, I) : n.push({
            scopeParent: o,
            candidates: I
          });
        } else
          l.unshift.apply(l, o.children);
      }
  }
  return n;
}, bn = function(a) {
  return !isNaN(parseInt(a.getAttribute("tabindex"), 10));
}, Oe = function(a) {
  if (!a)
    throw new Error("No node provided");
  return a.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(a.tagName) || wu(a)) && !bn(a) ? 0 : a.tabIndex;
}, _u = function(a, t) {
  var e = Oe(a);
  return e < 0 && t && !bn(a) ? 0 : e;
}, Du = function(a, t) {
  return a.tabIndex === t.tabIndex ? a.documentOrder - t.documentOrder : a.tabIndex - t.tabIndex;
}, gn = function(a) {
  return a.tagName === "INPUT";
}, xu = function(a) {
  return gn(a) && a.type === "hidden";
}, Tu = function(a) {
  var t = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, Iu = function(a, t) {
  for (var e = 0; e < a.length; e++)
    if (a[e].checked && a[e].form === t)
      return a[e];
}, Mu = function(a) {
  if (!a.name)
    return !0;
  var t = a.form || ut(a), e = function(l) {
    return t.querySelectorAll('input[type="radio"][name="' + l + '"]');
  }, r;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    r = e(window.CSS.escape(a.name));
  else
    try {
      r = e(a.name);
    } catch (l) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", l.message), !1;
    }
  var n = Iu(r, a.form);
  return !n || n === a;
}, Eu = function(a) {
  return gn(a) && a.type === "radio";
}, Cu = function(a) {
  return Eu(a) && !Mu(a);
}, Bu = function(a) {
  var t, e = a && ut(a), r = (t = e) === null || t === void 0 ? void 0 : t.host, n = !1;
  if (e && e !== a) {
    var l, o, s;
    for (n = !!((l = r) !== null && l !== void 0 && (o = l.ownerDocument) !== null && o !== void 0 && o.contains(r) || a != null && (s = a.ownerDocument) !== null && s !== void 0 && s.contains(a)); !n && r; ) {
      var u, d, p;
      e = ut(r), r = (u = e) === null || u === void 0 ? void 0 : u.host, n = !!((d = r) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(r));
    }
  }
  return n;
}, Ta = function(a) {
  var t = a.getBoundingClientRect(), e = t.width, r = t.height;
  return e === 0 && r === 0;
}, Pu = function(a, t) {
  var e = t.displayCheck, r = t.getShadowRoot;
  if (getComputedStyle(a).visibility === "hidden")
    return !0;
  var n = Fe.call(a, "details>summary:first-of-type"), l = n ? a.parentElement : a;
  if (Fe.call(l, "details:not([open]) *"))
    return !0;
  if (!e || e === "full" || e === "legacy-full") {
    if (typeof r == "function") {
      for (var o = a; a; ) {
        var s = a.parentElement, u = ut(a);
        if (s && !s.shadowRoot && r(s) === !0)
          return Ta(a);
        a.assignedSlot ? a = a.assignedSlot : !s && u !== a.ownerDocument ? a = u.host : a = s;
      }
      a = o;
    }
    if (Bu(a))
      return !a.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return Ta(a);
  return !1;
}, Lu = function(a) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(a.tagName))
    for (var t = a.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var e = 0; e < t.children.length; e++) {
          var r = t.children.item(e);
          if (r.tagName === "LEGEND")
            return Fe.call(t, "fieldset[disabled] *") ? !0 : !r.contains(a);
        }
        return !0;
      }
      t = t.parentElement;
    }
  return !1;
}, ct = function(a, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  dt(t) || xu(t) || Pu(t, a) || // For a details element with a summary, the summary element gets the focus
  Tu(t) || Lu(t));
}, Ft = function(a, t) {
  return !(Cu(t) || Oe(t) < 0 || !ct(a, t));
}, Au = function(a) {
  var t = parseInt(a.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, Ou = function a(t) {
  var e = [], r = [];
  return t.forEach(function(n, l) {
    var o = !!n.scopeParent, s = o ? n.scopeParent : n, u = _u(s, o), d = o ? a(n.candidates) : s;
    u === 0 ? o ? e.push.apply(e, d) : e.push(s) : r.push({
      documentOrder: l,
      tabIndex: u,
      item: n,
      isScope: o,
      content: d
    });
  }), r.sort(Du).reduce(function(n, l) {
    return l.isScope ? n.push.apply(n, l.content) : n.push(l.content), n;
  }, []).concat(e);
}, $u = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = hn([a], t.includeContainer, {
    filter: Ft.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Au
  }) : e = vn(a, t.includeContainer, Ft.bind(null, t)), Ou(e);
}, Fu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = hn([a], t.includeContainer, {
    filter: ct.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : e = vn(a, t.includeContainer, ct.bind(null, t)), e;
}, Ne = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return Fe.call(a, it) === !1 ? !1 : Ft(t, a);
}, Su = /* @__PURE__ */ pn.concat("iframe").join(","), xt = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return Fe.call(a, Su) === !1 ? !1 : ct(t, a);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Ia(a, t) {
  var e = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(a);
    t && (r = r.filter(function(n) {
      return Object.getOwnPropertyDescriptor(a, n).enumerable;
    })), e.push.apply(e, r);
  }
  return e;
}
function Ma(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ia(Object(e), !0).forEach(function(r) {
      Nu(a, r, e[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : Ia(Object(e)).forEach(function(r) {
      Object.defineProperty(a, r, Object.getOwnPropertyDescriptor(e, r));
    });
  }
  return a;
}
function Nu(a, t, e) {
  return t = Vu(t), t in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}
function Ru(a, t) {
  if (typeof a != "object" || a === null) return a;
  var e = a[Symbol.toPrimitive];
  if (e !== void 0) {
    var r = e.call(a, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(a);
}
function Vu(a) {
  var t = Ru(a, "string");
  return typeof t == "symbol" ? t : String(t);
}
var Ea = {
  activateTrap: function(a, t) {
    if (a.length > 0) {
      var e = a[a.length - 1];
      e !== t && e.pause();
    }
    var r = a.indexOf(t);
    r === -1 || a.splice(r, 1), a.push(t);
  },
  deactivateTrap: function(a, t) {
    var e = a.indexOf(t);
    e !== -1 && a.splice(e, 1), a.length > 0 && a[a.length - 1].unpause();
  }
}, ju = function(a) {
  return a.tagName && a.tagName.toLowerCase() === "input" && typeof a.select == "function";
}, qu = function(a) {
  return (a == null ? void 0 : a.key) === "Escape" || (a == null ? void 0 : a.key) === "Esc" || (a == null ? void 0 : a.keyCode) === 27;
}, Ge = function(a) {
  return (a == null ? void 0 : a.key) === "Tab" || (a == null ? void 0 : a.keyCode) === 9;
}, Hu = function(a) {
  return Ge(a) && !a.shiftKey;
}, Wu = function(a) {
  return Ge(a) && a.shiftKey;
}, Ca = function(a) {
  return setTimeout(a, 0);
}, Ba = function(a, t) {
  var e = -1;
  return a.every(function(r, n) {
    return t(r) ? (e = n, !1) : !0;
  }), e;
}, He = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    e[r - 1] = arguments[r];
  return typeof a == "function" ? a.apply(void 0, e) : a;
}, rt = function(a) {
  return a.target.shadowRoot && typeof a.composedPath == "function" ? a.composedPath()[0] : a.target;
}, Yu = [], Qu = function(a, t) {
  var e = (t == null ? void 0 : t.document) || document, r = (t == null ? void 0 : t.trapStack) || Yu, n = Ma({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Hu,
    isKeyBackward: Wu
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
  }, o, s = function(x, C, q) {
    return x && x[C] !== void 0 ? x[C] : n[q || C];
  }, u = function(x, C) {
    var q = typeof (C == null ? void 0 : C.composedPath) == "function" ? C.composedPath() : void 0;
    return l.containerGroups.findIndex(function($) {
      var V = $.container, Q = $.tabbableNodes;
      return V.contains(x) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (q == null ? void 0 : q.includes(V)) || Q.find(function(J) {
        return J === x;
      });
    });
  }, d = function(x) {
    var C = n[x];
    if (typeof C == "function") {
      for (var q = arguments.length, $ = new Array(q > 1 ? q - 1 : 0), V = 1; V < q; V++)
        $[V - 1] = arguments[V];
      C = C.apply(void 0, $);
    }
    if (C === !0 && (C = void 0), !C) {
      if (C === void 0 || C === !1)
        return C;
      throw new Error("`".concat(x, "` was specified but was not a node, or did not return a node"));
    }
    var Q = C;
    if (typeof C == "string" && (Q = e.querySelector(C), !Q))
      throw new Error("`".concat(x, "` as selector refers to no known node"));
    return Q;
  }, p = function() {
    var x = d("initialFocus");
    if (x === !1)
      return !1;
    if (x === void 0 || !xt(x, n.tabbableOptions))
      if (u(e.activeElement) >= 0)
        x = e.activeElement;
      else {
        var C = l.tabbableGroups[0], q = C && C.firstTabbableNode;
        x = q || d("fallbackFocus");
      }
    if (!x)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return x;
  }, h = function() {
    if (l.containerGroups = l.containers.map(function(x) {
      var C = $u(x, n.tabbableOptions), q = Fu(x, n.tabbableOptions), $ = C.length > 0 ? C[0] : void 0, V = C.length > 0 ? C[C.length - 1] : void 0, Q = q.find(function(re) {
        return Ne(re);
      }), J = q.slice().reverse().find(function(re) {
        return Ne(re);
      }), ne = !!C.find(function(re) {
        return Oe(re) > 0;
      });
      return {
        container: x,
        tabbableNodes: C,
        focusableNodes: q,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ne,
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
        firstDomTabbableNode: Q,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: J,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(re) {
          var Te = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ie = C.indexOf(re);
          return Ie < 0 ? Te ? q.slice(q.indexOf(re) + 1).find(function(ke) {
            return Ne(ke);
          }) : q.slice(0, q.indexOf(re)).reverse().find(function(ke) {
            return Ne(ke);
          }) : C[Ie + (Te ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(x) {
      return x.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(x) {
      return x.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, D = function x(C) {
    var q = C.activeElement;
    if (q)
      return q.shadowRoot && q.shadowRoot.activeElement !== null ? x(q.shadowRoot) : q;
  }, I = function x(C) {
    if (C !== !1 && C !== D(document)) {
      if (!C || !C.focus) {
        x(p());
        return;
      }
      C.focus({
        preventScroll: !!n.preventScroll
      }), l.mostRecentlyFocusedNode = C, ju(C) && C.select();
    }
  }, _ = function(x) {
    var C = d("setReturnFocus", x);
    return C || (C === !1 ? !1 : x);
  }, P = function(x) {
    var C = x.target, q = x.event, $ = x.isBackward, V = $ === void 0 ? !1 : $;
    C = C || rt(q), h();
    var Q = null;
    if (l.tabbableGroups.length > 0) {
      var J = u(C, q), ne = J >= 0 ? l.containerGroups[J] : void 0;
      if (J < 0)
        V ? Q = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : Q = l.tabbableGroups[0].firstTabbableNode;
      else if (V) {
        var re = Ba(l.tabbableGroups, function(kt) {
          var wt = kt.firstTabbableNode;
          return C === wt;
        });
        if (re < 0 && (ne.container === C || xt(C, n.tabbableOptions) && !Ne(C, n.tabbableOptions) && !ne.nextTabbableNode(C, !1)) && (re = J), re >= 0) {
          var Te = re === 0 ? l.tabbableGroups.length - 1 : re - 1, Ie = l.tabbableGroups[Te];
          Q = Oe(C) >= 0 ? Ie.lastTabbableNode : Ie.lastDomTabbableNode;
        } else Ge(q) || (Q = ne.nextTabbableNode(C, !1));
      } else {
        var ke = Ba(l.tabbableGroups, function(kt) {
          var wt = kt.lastTabbableNode;
          return C === wt;
        });
        if (ke < 0 && (ne.container === C || xt(C, n.tabbableOptions) && !Ne(C, n.tabbableOptions) && !ne.nextTabbableNode(C)) && (ke = J), ke >= 0) {
          var Zn = ke === l.tabbableGroups.length - 1 ? 0 : ke + 1, oa = l.tabbableGroups[Zn];
          Q = Oe(C) >= 0 ? oa.firstTabbableNode : oa.firstDomTabbableNode;
        } else Ge(q) || (Q = ne.nextTabbableNode(C));
      }
    } else
      Q = d("fallbackFocus");
    return Q;
  }, m = function(x) {
    var C = rt(x);
    if (!(u(C, x) >= 0)) {
      if (He(n.clickOutsideDeactivates, x)) {
        o.deactivate({
          // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
          //  which will result in the outside click setting focus to the node
          //  that was clicked (and if not focusable, to "nothing"); by setting
          //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
          //  on activation (or the configured `setReturnFocus` node), whether the
          //  outside click was on a focusable node or not
          returnFocus: n.returnFocusOnDeactivate
        });
        return;
      }
      He(n.allowOutsideClick, x) || x.preventDefault();
    }
  }, B = function(x) {
    var C = rt(x), q = u(C, x) >= 0;
    if (q || C instanceof Document)
      q && (l.mostRecentlyFocusedNode = C);
    else {
      x.stopImmediatePropagation();
      var $, V = !0;
      if (l.mostRecentlyFocusedNode)
        if (Oe(l.mostRecentlyFocusedNode) > 0) {
          var Q = u(l.mostRecentlyFocusedNode), J = l.containerGroups[Q].tabbableNodes;
          if (J.length > 0) {
            var ne = J.findIndex(function(re) {
              return re === l.mostRecentlyFocusedNode;
            });
            ne >= 0 && (n.isKeyForward(l.recentNavEvent) ? ne + 1 < J.length && ($ = J[ne + 1], V = !1) : ne - 1 >= 0 && ($ = J[ne - 1], V = !1));
          }
        } else
          l.containerGroups.some(function(re) {
            return re.tabbableNodes.some(function(Te) {
              return Oe(Te) > 0;
            });
          }) || (V = !1);
      else
        V = !1;
      V && ($ = P({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: n.isKeyBackward(l.recentNavEvent)
      })), I($ || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, M = function(x) {
    var C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = x;
    var q = P({
      event: x,
      isBackward: C
    });
    q && (Ge(x) && x.preventDefault(), I(q));
  }, L = function(x) {
    if (qu(x) && He(n.escapeDeactivates, x) !== !1) {
      x.preventDefault(), o.deactivate();
      return;
    }
    (n.isKeyForward(x) || n.isKeyBackward(x)) && M(x, n.isKeyBackward(x));
  }, g = function(x) {
    var C = rt(x);
    u(C, x) >= 0 || He(n.clickOutsideDeactivates, x) || He(n.allowOutsideClick, x) || (x.preventDefault(), x.stopImmediatePropagation());
  }, k = function() {
    if (l.active)
      return Ea.activateTrap(r, o), l.delayInitialFocusTimer = n.delayInitialFocus ? Ca(function() {
        I(p());
      }) : I(p()), e.addEventListener("focusin", B, !0), e.addEventListener("mousedown", m, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", m, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", g, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", L, {
        capture: !0,
        passive: !1
      }), o;
  }, v = function() {
    if (l.active)
      return e.removeEventListener("focusin", B, !0), e.removeEventListener("mousedown", m, !0), e.removeEventListener("touchstart", m, !0), e.removeEventListener("click", g, !0), e.removeEventListener("keydown", L, !0), o;
  }, E = function(x) {
    var C = x.some(function(q) {
      var $ = Array.from(q.removedNodes);
      return $.some(function(V) {
        return V === l.mostRecentlyFocusedNode;
      });
    });
    C && I(p());
  }, w = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(E) : void 0, G = function() {
    w && (w.disconnect(), l.active && !l.paused && l.containers.map(function(x) {
      w.observe(x, {
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
    activate: function(x) {
      if (l.active)
        return this;
      var C = s(x, "onActivate"), q = s(x, "onPostActivate"), $ = s(x, "checkCanFocusTrap");
      $ || h(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, C == null || C();
      var V = function() {
        $ && h(), k(), G(), q == null || q();
      };
      return $ ? ($(l.containers.concat()).then(V, V), this) : (V(), this);
    },
    deactivate: function(x) {
      if (!l.active)
        return this;
      var C = Ma({
        onDeactivate: n.onDeactivate,
        onPostDeactivate: n.onPostDeactivate,
        checkCanReturnFocus: n.checkCanReturnFocus
      }, x);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, v(), l.active = !1, l.paused = !1, G(), Ea.deactivateTrap(r, o);
      var q = s(C, "onDeactivate"), $ = s(C, "onPostDeactivate"), V = s(C, "checkCanReturnFocus"), Q = s(C, "returnFocus", "returnFocusOnDeactivate");
      q == null || q();
      var J = function() {
        Ca(function() {
          Q && I(_(l.nodeFocusedBeforeActivation)), $ == null || $();
        });
      };
      return Q && V ? (V(_(l.nodeFocusedBeforeActivation)).then(J, J), this) : (J(), this);
    },
    pause: function(x) {
      if (l.paused || !l.active)
        return this;
      var C = s(x, "onPause"), q = s(x, "onPostPause");
      return l.paused = !0, C == null || C(), v(), G(), q == null || q(), this;
    },
    unpause: function(x) {
      if (!l.paused || !l.active)
        return this;
      var C = s(x, "onUnpause"), q = s(x, "onPostUnpause");
      return l.paused = !1, C == null || C(), h(), k(), G(), q == null || q(), this;
    },
    updateContainerElements: function(x) {
      var C = [].concat(x).filter(Boolean);
      return l.containers = C.map(function(q) {
        return typeof q == "string" ? e.querySelector(q) : q;
      }), l.active && h(), G(), this;
    }
  }, o.updateContainerElements(a), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Gu = {
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
}, Ku = O({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, Gu),
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
    let r;
    const n = j(null), l = T(() => {
      const s = n.value;
      return s && (s instanceof HTMLElement ? s : s.$el);
    });
    function o() {
      return r || (r = Qu(l.value, {
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
    return fe(() => {
      ue(() => a.active, (s) => {
        s && l.value ? o().activate() : r && (r.deactivate(), (!l.value || l.value.nodeType === Node.COMMENT_NODE) && (r = null));
      }, { immediate: !0, flush: "post" });
    }), we(() => {
      r && r.deactivate(), r = null;
    }), {
      activate() {
        o().activate();
      },
      deactivate() {
        r && r.deactivate();
      },
      renderImpl() {
        if (!t.default)
          return null;
        const s = t.default().filter((u) => u.type !== tr);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : ar(s[0], { ref: n });
      }
    };
  }
}), zu = ["aria-labelledby", "role", "open"], Xu = { class: "fr-container fr-container--fluid fr-container-md" }, Uu = { class: "fr-grid-row fr-grid-row--center" }, Zu = { class: "fr-modal__body" }, Ju = { class: "fr-modal__header" }, ed = ["title"], td = { class: "fr-modal__content" }, ad = ["id"], nd = {
  key: 0,
  class: "fr-modal__footer"
}, Pa = 2, rd = /* @__PURE__ */ O({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => te("modal", "dialog") },
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
    const e = a, r = t, n = (_) => {
      _.key === "Escape" && h();
    }, l = T(() => e.isAlert ? "alertdialog" : "dialog"), o = j(null), s = j();
    ue(() => e.opened, (_) => {
      var P, m;
      _ ? ((P = s.value) == null || P.showModal(), setTimeout(() => {
        var B;
        (B = o.value) == null || B.focus();
      }, 100)) : (m = s.value) == null || m.close(), u(_);
    });
    function u(_) {
      typeof window < "u" && document.body.classList.toggle("modal-open", _);
    }
    fe(() => {
      d(), u(e.opened);
    }), sr(() => {
      p(), u(!1);
    });
    function d() {
      document.addEventListener("keydown", n);
    }
    function p() {
      document.removeEventListener("keydown", n);
    }
    async function h() {
      var _;
      await Wa(), (_ = e.origin) == null || _.focus(), r("close");
    }
    const D = T(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), I = T(
      () => D.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Pa } : { scale: Pa, ...e.icon ?? {} }
    );
    return (_, P) => _.opened ? (i(), N(F(Ku), { key: 0 }, {
      default: K(() => {
        var m, B;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-labelledby": _.modalId,
            role: l.value,
            class: S(["fr-modal", { "fr-modal--opened": _.opened }]),
            open: _.opened
          }, [
            c("div", Xu, [
              c("div", Uu, [
                c("div", {
                  class: S(["fr-col-12", {
                    "fr-col-md-8": _.size === "lg",
                    "fr-col-md-6": _.size === "md",
                    "fr-col-md-4": _.size === "sm"
                  }])
                }, [
                  c("div", Zu, [
                    c("div", Ju, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: _.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: P[0] || (P[0] = (M) => h())
                      }, [
                        c("span", null, b(_.closeButtonLabel), 1)
                      ], 8, ed)
                    ]),
                    c("div", td, [
                      c("h1", {
                        id: _.modalId,
                        class: "fr-modal__title"
                      }, [
                        D.value || I.value ? (i(), f("span", {
                          key: 0,
                          class: S({
                            [String(_.icon)]: D.value
                          })
                        }, [
                          _.icon && I.value ? (i(), N(de, ge(H({ key: 0 }, I.value)), null, 16)) : y("", !0)
                        ], 2)) : y("", !0),
                        R(" " + b(_.title), 1)
                      ], 8, ad),
                      A(_.$slots, "default", {}, void 0, !0)
                    ]),
                    (m = _.actions) != null && m.length || _.$slots.footer ? (i(), f("div", nd, [
                      A(_.$slots, "footer", {}, void 0, !0),
                      (B = _.actions) != null && B.length ? (i(), N(gt, {
                        key: 0,
                        align: "right",
                        buttons: _.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : y("", !0)
                    ])) : y("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, zu)
        ];
      }),
      _: 3
    })) : y("", !0);
  }
}), yn = /* @__PURE__ */ ve(rd, [["__scopeId", "data-v-d11515b3"]]), ld = ["id", "aria-current"], od = /* @__PURE__ */ O({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => te("nav", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-nav__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      A(t.$slots, "default", {}, void 0, !0)
    ], 8, ld));
  }
}), kn = /* @__PURE__ */ ve(od, [["__scopeId", "data-v-5909c19f"]]), sd = ["href"], La = 2, yt = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => te("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(a) {
    const t = a, e = T(() => typeof t.to == "string" && t.to.startsWith("http")), r = T(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), n = T(
      () => r.value || !t.icon ? void 0 : typeof t.icon == "string" ? { scale: La, name: t.icon } : { scale: La, ...t.icon || {} }
    ), l = rr() ? Ve(Wt) : void 0, o = (l == null ? void 0 : l()) ?? (() => {
    });
    return (s, u) => {
      const d = he("RouterLink");
      return e.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: s.to,
        onClick: u[0] || (u[0] = (p) => {
          s.$emit("toggleId", s.id), s.onClick(p);
        })
      }, b(s.text), 9, sd)) : (i(), N(d, {
        key: 1,
        class: S(["fr-nav__link", {
          [String(s.icon)]: r.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: u[1] || (u[1] = (p) => {
          var h;
          F(o)(), s.$emit("toggleId", s.id), (h = s.onClick) == null || h.call(s, p);
        })
      }, {
        default: K(() => [
          s.icon && n.value ? (i(), N(de, ge(H({ key: 0 }, n.value)), null, 16)) : y("", !0),
          R(" " + b(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), id = { class: "fr-col-12 fr-col-lg-3" }, ud = { class: "fr-mega-menu__category" }, dd = { class: "fr-mega-menu__list" }, wn = /* @__PURE__ */ O({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", id, [
      c("h5", ud, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: e[0] || (e[0] = X(() => {
          }, ["prevent"]))
        }, b(t.title), 1)
      ]),
      c("ul", dd, [
        (i(!0), f(Y, null, z(t.links, (r, n) => (i(), f("li", {
          key: n,
          class: "fr-nav__link"
        }, [
          U(yt, H({ ref_for: !0 }, r), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), cd = ["aria-expanded", "aria-current", "aria-controls"], fd = ["id"], pd = { class: "fr-container fr-container--fluid fr-container-lg" }, md = { class: "fr-grid-row fr-grid-row-lg--gutters" }, vd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, hd = { class: "fr-mega-menu__leader" }, bd = { class: "fr-h4 fr-mb-2v" }, gd = { class: "fr-hidden fr-displayed-lg" }, yd = /* @__PURE__ */ O({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => te("menu") },
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
      collapsing: r,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: o
    } = Pe(), s = T(() => t.id === t.expandedId);
    return ue(s, (u, d) => {
      u !== d && l(u);
    }), fe(() => {
      s.value && l(!0);
    }), (u, d) => {
      const p = he("RouterLink");
      return i(), f(Y, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: d[0] || (d[0] = (h) => u.$emit("toggleId", u.id))
        }, b(u.title), 9, cd),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: S(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": F(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(r)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (h) => F(o)(s.value))
        }, [
          c("div", pd, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (h) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            c("div", md, [
              c("div", vd, [
                c("div", hd, [
                  c("h4", bd, b(u.title), 1),
                  c("p", gd, [
                    R(b(u.description) + " ", 1),
                    A(u.$slots, "description", {}, void 0, !0)
                  ]),
                  U(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: K(() => [
                      R(b(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              A(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(Y, null, z(u.menus, (h, D) => (i(), N(wn, H({
                key: D,
                ref_for: !0
              }, h), null, 16))), 128))
            ])
          ])
        ], 42, fd)
      ], 64);
    };
  }
}), _n = /* @__PURE__ */ ve(yd, [["__scopeId", "data-v-7e339b1d"]]), kd = ["id", "aria-current"], Dn = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => te("menu", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-menu__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      A(t.$slots, "default")
    ], 8, kd));
  }
}), wd = ["aria-expanded", "aria-current", "aria-controls"], _d = ["id"], Dd = { class: "fr-menu__list" }, xn = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => te("menu") },
    title: {},
    links: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: r,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: o
    } = Pe(), s = T(() => t.id === t.expandedId);
    return ue(s, (u, d) => {
      u !== d && l(u);
    }), fe(() => {
      s.value && l(!0);
    }), (u, d) => (i(), f(Y, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: d[0] || (d[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        c("span", null, b(u.title), 1)
      ], 8, wd),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: e,
        class: S(["fr-collapse fr-menu", { "fr-collapse--expanded": F(n), "fr-collapsing": F(r) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => F(o)(s.value))
      }, [
        c("ul", Dd, [
          A(u.$slots, "default"),
          (i(!0), f(Y, null, z(u.links, (p, h) => (i(), N(Dn, { key: h }, {
            default: K(() => [
              U(yt, H({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (D) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, _d)
    ], 64));
  }
}), xd = ["id", "aria-label"], Td = { class: "fr-nav__list" }, Id = /* @__PURE__ */ O({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => te("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(a) {
    const t = a, e = j(void 0), r = (s) => {
      if (s === e.value) {
        e.value = void 0;
        return;
      }
      e.value = s;
    }, n = (s) => {
      if (s !== document.getElementById(t.id)) {
        if (!(s != null && s.parentNode)) {
          r(e.value);
          return;
        }
        n(s.parentNode);
      }
    }, l = (s) => {
      n(s.target);
    }, o = (s) => {
      s.key === "Escape" && r(e.value);
    };
    return fe(() => {
      document.addEventListener("click", l), document.addEventListener("keydown", o);
    }), we(() => {
      document.removeEventListener("click", l), document.removeEventListener("keydown", o);
    }), (s, u) => (i(), f("nav", {
      id: s.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": s.label
    }, [
      c("ul", Td, [
        A(s.$slots, "default"),
        (i(!0), f(Y, null, z(s.navItems, (d, p) => (i(), N(kn, { key: p }, {
          default: K(() => [
            d.to && d.text ? (i(), N(yt, H({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (h) => r(h))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), N(xn, H({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (h) => r(h))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), N(_n, H({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (h) => r(h))
            }), null, 16, ["expanded-id"])) : y("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, xd));
  }
}), Md = { class: "fr-container" }, Ed = { class: "fr-notice__body" }, Cd = { class: "fr-notice__title" }, Bd = { class: "fr-notice__desc" }, Pd = /* @__PURE__ */ O({
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
      class: S(["fr-notice", `fr-notice--${t.type}`])
    }, [
      c("div", Md, [
        c("div", Ed, [
          c("p", null, [
            c("span", Cd, [
              A(t.$slots, "default", {}, () => [
                R(b(t.title), 1)
              ])
            ]),
            c("span", Bd, [
              A(t.$slots, "desc", {}, () => [
                R(b(t.desc), 1)
              ])
            ])
          ]),
          t.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: e[0] || (e[0] = (r) => t.$emit("close"))
          }, " Masquer le message ")) : y("", !0)
        ])
      ])
    ], 2));
  }
}), Ld = ["aria-label"], Ad = { class: "fr-content-media__img" }, Od = ["src", "alt", "title", "ratio"], $d = { class: "fr-content-media__caption" }, Fd = /* @__PURE__ */ O({
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
      class: S(["fr-content-media", {
        "fr-content-media--sm": t.size === "small",
        "fr-content-media--lg": t.size === "large"
      }]),
      role: "group",
      "aria-label": t.legend
    }, [
      c("div", Ad, [
        A(t.$slots, "default", {}, () => [
          t.src ? (i(), f("img", {
            key: 0,
            src: t.src,
            class: S(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
            alt: t.alt,
            title: t.title,
            ratio: t.ratio
          }, null, 10, Od)) : y("", !0)
        ])
      ]),
      c("figcaption", $d, b(t.legend), 1)
    ], 10, Ld));
  }
}), Sd = { class: "fr-quote fr-quote--column" }, Nd = ["cite"], Rd = { class: "fr-quote__author" }, Vd = { class: "fr-quote__source" }, jd = ["href"], qd = {
  key: 0,
  class: "fr-quote__image"
}, Hd = ["src"], Wd = /* @__PURE__ */ O({
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
    return (t, e) => (i(), f("figure", Sd, [
      t.source ? (i(), f("blockquote", {
        key: 0,
        cite: t.sourceUrl
      }, [
        c("p", null, "« " + b(t.quote) + " »", 1)
      ], 8, Nd)) : y("", !0),
      c("figcaption", null, [
        c("p", Rd, b(t.author), 1),
        c("ul", Vd, [
          c("li", null, [
            c("cite", null, b(t.source), 1)
          ]),
          (i(!0), f(Y, null, z(t.details, (r, n) => (i(), f("li", { key: n }, [
            typeof r == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.url
            }, b(r.label), 9, jd)) : (i(), f(Y, { key: 1 }, [
              R(b(r), 1)
            ], 64))
          ]))), 128))
        ]),
        t.quoteImage ? (i(), f("div", qd, [
          c("img", {
            src: t.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, Hd)
        ])) : y("", !0)
      ])
    ]));
  }
}), Yd = ["id", "name", "value", "checked", "disabled"], Qd = ["for"], Gd = {
  key: 0,
  class: "required"
}, Kd = {
  key: 0,
  class: "fr-hint-text"
}, zd = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Xd = ["src", "title"], Ud = { key: 0 }, Zd = ["href"], Jd = ["href"], ec = ["href"], Tn = /* @__PURE__ */ O({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => te("basic", "radio") },
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
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, r = T(() => !!t.img || !!t.svgPath);
    return (n, l) => (i(), f("div", {
      class: S(["fr-fieldset__element", { "fr-fieldset__element--inline": n.inline }])
    }, [
      c("div", {
        class: S(["fr-radio-group", {
          "fr-radio-rich": r.value,
          "fr-radio-group--sm": n.small
        }])
      }, [
        c("input", H({
          id: n.id,
          type: "radio",
          name: n.name,
          value: n.value,
          checked: n.modelValue === n.value,
          disabled: n.disabled
        }, n.$attrs, {
          onClick: l[0] || (l[0] = (o) => n.$emit("update:modelValue", n.value))
        }), null, 16, Yd),
        c("label", {
          for: n.id,
          class: "fr-label"
        }, [
          A(n.$slots, "label", {}, () => [
            R(b(n.label) + " ", 1),
            A(n.$slots, "required-tip", {}, () => [
              n.$attrs.required ? (i(), f("span", Gd, " *")) : y("", !0)
            ])
          ]),
          n.hint ? (i(), f("span", Kd, b(n.hint), 1)) : y("", !0)
        ], 8, Qd),
        n.img || n.svgPath ? (i(), f("div", zd, [
          n.img ? (i(), f("img", {
            key: 0,
            src: n.img,
            class: "fr-artwork",
            alt: "",
            title: n.imgTitle
          }, null, 8, Xd)) : (i(), f("svg", H({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...e, ...n.svgAttrs }), [
            n.imgTitle ? (i(), f("title", Ud, b(n.imgTitle), 1)) : y("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${n.svgPath}#artwork-decorative`
            }, null, 8, Zd),
            c("use", {
              class: "fr-artwork-minor",
              href: `${n.svgPath}#artwork-minor`
            }, null, 8, Jd),
            c("use", {
              class: "fr-artwork-major",
              href: `${n.svgPath}#artwork-major`
            }, null, 8, ec)
          ], 16))
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), tc = { class: "fr-form-group" }, ac = ["disabled", "aria-labelledby", "aria-invalid", "role"], nc = ["id"], rc = {
  key: 0,
  class: "fr-hint-text"
}, lc = {
  key: 0,
  class: "required"
}, oc = ["id"], sc = /* @__PURE__ */ O({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => te("radio-button", "group") },
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
    const e = a, r = t, n = T(() => e.errorMessage || e.validMessage), l = T(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (u) => {
      u !== e.modelValue && r("update:modelValue", u);
    }, s = T(() => n.value ? `${e.titleId} messages-${e.titleId}` : e.titleId);
    return (u, d) => (i(), f("div", tc, [
      c("fieldset", {
        class: S(["fr-fieldset", {
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
            R(b(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", rc, [
              A(u.$slots, "hint", {}, () => [
                R(b(u.hint), 1)
              ])
            ])) : y("", !0),
            A(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", lc, " *")) : y("", !0)
            ])
          ])
        ], 8, nc)) : y("", !0),
        A(u.$slots, "default", {}, () => [
          (i(!0), f(Y, null, z(u.options, (p, h) => (i(), N(Tn, H({
            key: typeof p.value == "boolean" ? h : p.value || h,
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
        n.value ? (i(), f("div", {
          key: 1,
          id: `messages-${u.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: S(["fr-message fr-message--info flex items-center", l.value])
          }, b(n.value), 3)
        ], 8, oc)) : y("", !0)
      ], 10, ac)
    ]));
  }
}), ic = ["id"], uc = ["id"], dc = { class: "fr-hint-text" }, cc = ["data-fr-prefix", "data-fr-suffix"], fc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], pc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], mc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, vc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, hc = ["id"], bc = ["id"], gc = /* @__PURE__ */ O({
  __name: "DsfrRange",
  props: {
    id: { default: () => te("range") },
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
    const e = a, r = t, n = j(), l = j(), o = j(), s = T(() => e.lowerValue !== void 0), u = T(() => e.lowerValue === void 0 ? `transform: translateX(${(e.modelValue - e.min) / (e.max - e.min) * o.value}px) translateX(-${e.modelValue}%);` : `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * o.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`), d = T(() => {
      const h = (e.modelValue - e.min) / (e.max - e.min) * o.value - (s.value ? 12 : 0), D = ((e.lowerValue ?? 0) - e.min) / (e.max - e.min) * o.value;
      return {
        "--progress-right": `${h + 24}px`,
        ...s.value ? { "--progress-left": `${D + 12}px` } : {}
      };
    });
    ue([() => e.modelValue, () => e.lowerValue], ([h, D]) => {
      D !== void 0 && (s.value && h < D && r("update:lowerValue", h), s.value && D > h && r("update:modelValue", D));
    });
    const p = T(() => (e.prefix ?? "").concat(s.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return fe(() => {
      var h;
      o.value = (h = n.value) == null ? void 0 : h.offsetWidth;
    }), (h, D) => (i(), f("div", {
      id: `${h.id}-group`,
      class: S(["fr-range-group", { "fr-range-group--error": h.message }])
    }, [
      c("label", {
        id: `${h.id}-label`,
        class: "fr-label"
      }, [
        A(h.$slots, "label", {}, () => [
          R(b(h.label), 1)
        ]),
        c("span", dc, [
          A(h.$slots, "hint", {}, () => [
            R(b(h.hint), 1)
          ])
        ])
      ], 8, uc),
      c("div", {
        class: S(["fr-range", {
          "fr-range--sm": h.small,
          "fr-range--double": s.value,
          "fr-range-group--disabled": h.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": h.prefix ?? void 0,
        "data-fr-suffix": h.suffix ?? void 0,
        style: ye(d.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: l,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: ye(u.value)
        }, b(p.value), 5),
        s.value ? (i(), f("input", {
          key: 0,
          id: `${h.id}-2`,
          type: "range",
          min: h.min,
          max: h.max,
          step: h.step,
          value: h.lowerValue,
          disabled: h.disabled,
          "aria-disabled": h.disabled,
          "aria-labelledby": `${h.id}-label`,
          "aria-describedby": `${h.id}-messages`,
          onInput: D[0] || (D[0] = (I) => {
            var _;
            return r("update:lowerValue", +((_ = I.target) == null ? void 0 : _.value));
          })
        }, null, 40, fc)) : y("", !0),
        c("input", {
          id: h.id,
          ref_key: "input",
          ref: n,
          type: "range",
          min: h.min,
          max: h.max,
          step: h.step,
          value: h.modelValue,
          disabled: h.disabled,
          "aria-disabled": h.disabled,
          "aria-labelledby": `${h.id}-label`,
          "aria-describedby": `${h.id}-messages`,
          onInput: D[1] || (D[1] = (I) => {
            var _;
            return r("update:modelValue", +((_ = I.target) == null ? void 0 : _.value));
          })
        }, null, 40, pc),
        h.hideIndicators ? y("", !0) : (i(), f("span", mc, b(h.min), 1)),
        h.hideIndicators ? y("", !0) : (i(), f("span", vc, b(h.max), 1))
      ], 14, cc),
      h.message || h.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${h.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        A(h.$slots, "messages", {}, () => [
          h.message ? (i(), f("p", {
            key: 0,
            id: `${h.id}-message-error`,
            class: "fr-message fr-message--error"
          }, b(h.message), 9, bc)) : y("", !0)
        ])
      ], 8, hc)) : y("", !0)
    ], 10, ic));
  }
}), yc = { class: "fr-segmented__element" }, kc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], wc = ["for"], _c = { key: 1 }, In = /* @__PURE__ */ O({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => te("basic", "checkbox") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = T(() => typeof t.icon == "string" ? { name: t.icon } : t.icon), r = T(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : "");
    return (n, l) => (i(), f("div", yc, [
      c("input", H({
        id: n.id,
        type: "radio",
        name: n.name,
        value: n.value,
        checked: n.modelValue === n.value,
        disabled: n.disabled,
        "aria-disabled": n.disabled
      }, n.$attrs, {
        onClick: l[0] || (l[0] = (o) => n.$emit("update:modelValue", n.value))
      }), null, 16, kc),
      c("label", {
        for: n.id,
        class: S(["fr-label", { [r.value]: r.value }])
      }, [
        n.icon && !r.value ? (i(), N(de, ge(H({ key: 0 }, e.value)), null, 16)) : y("", !0),
        n.icon ? (i(), f("span", _c, " ")) : y("", !0),
        R(" " + b(n.label), 1)
      ], 10, wc)
    ]));
  }
}), Dc = { class: "fr-form-group" }, xc = ["disabled"], Tc = ["id"], Ic = {
  key: 0,
  class: "fr-hint-text"
}, Mc = { class: "fr-segmented__elements" }, Ec = /* @__PURE__ */ O({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => te("radio-button", "group") },
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
    const e = a, r = t, n = (l) => {
      l !== e.modelValue && r("update:modelValue", l);
    };
    return (l, o) => (i(), f("div", Dc, [
      c("fieldset", {
        class: S(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (i(), f("legend", {
          key: 0,
          id: l.titleId,
          class: S(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          A(l.$slots, "legend", {}, () => [
            R(b(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", Ic, b(l.hint), 1)) : y("", !0)
        ], 10, Tc)) : y("", !0),
        c("div", Mc, [
          A(l.$slots, "default", {}, () => [
            (i(!0), f(Y, null, z(l.options, (s, u) => (i(), N(In, H({
              key: s.value || u,
              name: l.name || s.name,
              ref_for: !0
            }, { ...s, disabled: l.disabled || s.disabled }, {
              "model-value": l.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (d) => n(d))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, xc)
    ]));
  }
}), Cc = ["for"], Bc = {
  key: 0,
  class: "required"
}, Pc = {
  key: 0,
  class: "fr-hint-text"
}, Lc = ["id", "name", "disabled", "aria-disabled", "required"], Ac = ["selected"], Oc = ["selected", "value", "disabled", "aria-disabled"], $c = ["id"], Fc = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => te("select") },
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
  setup(a) {
    const t = a, e = T(() => t.errorMessage || t.successMessage), r = T(() => t.errorMessage ? "error" : "valid");
    return (n, l) => (i(), f("div", {
      class: S(["fr-select-group", { [`fr-select-group--${r.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: n.selectId
      }, [
        A(n.$slots, "label", {}, () => [
          R(b(n.label) + " ", 1),
          A(n.$slots, "required-tip", {}, () => [
            n.required ? (i(), f("span", Bc, " *")) : y("", !0)
          ])
        ]),
        n.description ? (i(), f("span", Pc, b(n.description), 1)) : y("", !0)
      ], 8, Cc),
      c("select", H({
        id: n.selectId,
        class: [{ [`fr-select--${r.value}`]: e.value }, "fr-select"],
        name: n.name || n.selectId,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        required: n.required
      }, n.$attrs, {
        onChange: l[0] || (l[0] = (o) => {
          var s;
          return n.$emit("update:modelValue", (s = o.target) == null ? void 0 : s.value);
        })
      }), [
        c("option", {
          selected: n.modelValue == null,
          disabled: "",
          hidden: ""
        }, b(n.defaultUnselectedText), 9, Ac),
        (i(!0), f(Y, null, z(n.options, (o, s) => (i(), f("option", {
          key: s,
          selected: n.modelValue === o || typeof o == "object" && o.value === n.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, b(typeof o == "object" ? o.text : o), 9, Oc))), 128))
      ], 16, Lc),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${r.value}-desc-${r.value}`,
        class: S(`fr-${r.value}-text`)
      }, b(e.value), 11, $c)) : y("", !0)
    ], 2));
  }
}), Sc = { class: "fr-share" }, Nc = { class: "fr-share__title" }, Rc = { class: "fr-btns-group" }, Vc = ["title", "href", "onClick"], jc = { key: 0 }, qc = ["href", "title"], Hc = ["title"], Wc = /* @__PURE__ */ O({
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
      const r = window.location.href;
      navigator.clipboard.writeText(r);
    }, e = ({ url: r, label: n }) => {
      window.open(
        r,
        n,
        "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
    };
    return (r, n) => {
      var l;
      return i(), f("div", Sc, [
        c("p", Nc, b(r.title), 1),
        c("ul", Rc, [
          (i(!0), f(Y, null, z(r.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: S(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: X((u) => e(o), ["prevent"])
            }, b(o.label), 11, Vc)
          ]))), 128)),
          (l = r.mail) != null && l.to ? (i(), f("li", jc, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: r.mail.to,
              title: r.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, b(r.mail.label), 9, qc)
          ])) : y("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: r.copyLabel,
              onClick: n[0] || (n[0] = (o) => t())
            }, b(r.copyLabel), 9, Hc)
          ])
        ])
      ]);
    };
  }
}), Yc = ["aria-current", "aria-expanded", "aria-controls"], Mn = /* @__PURE__ */ O({
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
      onClick: e[0] || (e[0] = (r) => t.$emit("toggleExpand", t.controlId))
    }, [
      A(t.$slots, "default")
    ], 8, Yc));
  }
}), En = /* @__PURE__ */ O({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      class: S(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      A(t.$slots, "default")
    ], 2));
  }
}), Qc = ["id"], Gc = { class: "fr-sidemenu__list" }, Cn = /* @__PURE__ */ O({
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
      collapsing: r,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: o
    } = Pe();
    ue(() => t.expanded, (p, h) => {
      p !== h && l(p);
    }), fe(() => {
      t.expanded && l(!0);
    });
    const s = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => s(p) ? "a" : "RouterLink", d = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, h) => {
      const D = he("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: S({
          "fr-collapse": p.collapsable,
          "fr-collapsing": F(r),
          "fr-collapse--expanded": F(n)
        }),
        onTransitionend: h[2] || (h[2] = (I) => F(o)(!!p.expanded))
      }, [
        c("ul", Gc, [
          A(p.$slots, "default"),
          (i(!0), f(Y, null, z(p.menuItems, (I, _) => (i(), N(En, {
            key: _,
            active: I.active
          }, {
            default: K(() => [
              I.menuItems ? y("", !0) : (i(), N(pe(u(I.to)), H({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": I.active ? "page" : void 0,
                ref_for: !0
              }, d(I.to)), {
                default: K(() => [
                  R(b(I.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              I.menuItems ? (i(), f(Y, { key: 1 }, [
                U(Mn, {
                  active: !!I.active,
                  expanded: !!I.expanded,
                  "control-id": I.id,
                  onToggleExpand: h[0] || (h[0] = (P) => p.$emit("toggleExpand", P))
                }, {
                  default: K(() => [
                    R(b(I.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                I.menuItems ? (i(), N(D, {
                  key: 0,
                  id: I.id,
                  collapsable: "",
                  expanded: I.expanded,
                  "menu-items": I.menuItems,
                  onToggleExpand: h[1] || (h[1] = (P) => p.$emit("toggleExpand", P))
                }, null, 8, ["id", "expanded", "menu-items"])) : y("", !0)
              ], 64)) : y("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, Qc);
    };
  }
}), Kc = ["aria-labelledby"], zc = { class: "fr-sidemenu__inner" }, Xc = ["aria-controls", "aria-expanded"], Uc = ["id"], Zc = { class: "fr-sidemenu__title" }, Jc = /* @__PURE__ */ O({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => te("sidemenu") },
    sideMenuListId: { default: () => te("sidemenu", "list") },
    collapseValue: { default: "-492px" },
    menuItems: { default: () => {
    } },
    headingTitle: { default: "" }
  },
  emits: ["toggleExpand"],
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: r,
      doExpand: n,
      onTransitionEnd: l
    } = Pe(), o = j(!1);
    return ue(o, (s, u) => {
      s !== u && n(s);
    }), (s, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": s.id
    }, [
      c("div", zc, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": s.id,
          "aria-expanded": o.value,
          onClick: u[0] || (u[0] = X((d) => o.value = !o.value, ["prevent", "stop"]))
        }, b(s.buttonLabel), 9, Xc),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: t,
          class: S(["fr-collapse", {
            "fr-collapse--expanded": F(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => F(l)(o.value))
        }, [
          c("div", Zc, b(s.headingTitle), 1),
          A(s.$slots, "default", {}, () => [
            U(Cn, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: u[1] || (u[1] = (d) => s.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Uc)
      ])
    ], 8, Kc));
  }
}), ef = /* @__PURE__ */ O({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const t = a, e = T(() => typeof t.to == "string" && t.to.startsWith("http")), r = T(() => e.value ? "a" : "RouterLink"), n = T(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, o) => (i(), N(pe(r.value), H({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, n.value), {
      default: K(() => [
        A(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), tf = { class: "fr-skiplinks" }, af = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, nf = { class: "fr-skiplinks__list" }, rf = ["href", "onClick"], lf = /* @__PURE__ */ O({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(a) {
    const t = (e) => {
      const r = document.getElementById(e);
      r == null || r.focus();
    };
    return (e, r) => (i(), f("div", tf, [
      c("nav", af, [
        c("ul", nf, [
          (i(!0), f(Y, null, z(e.links, (n) => (i(), f("li", {
            key: n.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${n.id}`,
              onClick: X((l) => t(n.id), ["prevent"])
            }, b(n.text), 9, rf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), of = { class: "fr-stepper" }, sf = { class: "fr-stepper__title" }, uf = { class: "fr-stepper__state" }, df = ["data-fr-current-step", "data-fr-steps"], cf = { class: "fr-stepper__details" }, ff = {
  key: 0,
  class: "fr-text--bold"
}, pf = /* @__PURE__ */ O({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(a) {
    return (t, e) => (i(), f("div", of, [
      c("h2", sf, [
        R(b(t.steps[t.currentStep - 1]) + " ", 1),
        c("span", uf, "Étape " + b(t.currentStep) + " sur " + b(t.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, df),
      c("p", cf, [
        t.currentStep < t.steps.length ? (i(), f("span", ff, "Étape suivante :")) : y("", !0),
        R(" " + b(t.steps[t.currentStep]), 1)
      ])
    ]));
  }
}), mf = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, vf = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, hf = { class: "fr-summary__list" }, bf = ["href"], gf = /* @__PURE__ */ O({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("nav", mf, [
      c("h2", vf, b(t.title), 1),
      c("ol", hf, [
        (i(!0), f(Y, null, z(t.anchors, (r, n) => (i(), f("li", { key: n }, [
          c("a", {
            class: "fr-summary__link",
            href: r.link
          }, b(r.name), 9, bf)
        ]))), 128))
      ])
    ]));
  }
}), yf = ["id", "aria-labelledby", "tabindex"], kf = /* @__PURE__ */ O({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(a) {
    Ha((u) => ({
      "7152af7e": o.value,
      "2a62e962": s.value
    }));
    const t = a, e = { true: "100%", false: "-100%" }, r = Ve(mt), { isVisible: n, asc: l } = r(et(() => t.tabId)), o = T(() => e[String(l == null ? void 0 : l.value)]), s = T(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), N(ir, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: K(() => [
        xe(c("div", {
          id: u.panelId,
          class: S(["fr-tabs__panel", {
            "fr-tabs__panel--selected": F(n)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: F(n) ? 0 : -1
        }, [
          A(u.$slots, "default", {}, void 0, !0)
        ], 10, yf), [
          [qa, F(n)]
        ])
      ]),
      _: 3
    }));
  }
}), Bn = /* @__PURE__ */ ve(kf, [["__scopeId", "data-v-5774b16c"]]), wf = { role: "presentation" }, _f = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Df = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Pn = /* @__PURE__ */ O({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: t }) {
    const e = a, r = t, n = j(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      ArrowDown: "next",
      ArrowUp: "previous",
      Home: "first",
      End: "last"
    };
    function o(d) {
      const p = d == null ? void 0 : d.key, h = l[p];
      h && r(h);
    }
    const s = Ve(mt), { isVisible: u } = s(et(() => e.tabId));
    return (d, p) => (i(), f("li", wf, [
      c("button", {
        id: d.tabId,
        ref_key: "button",
        ref: n,
        "data-testid": `test-${d.tabId}`,
        class: "fr-tabs__tab",
        tabindex: F(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": F(u),
        "aria-controls": d.panelId,
        onClick: p[0] || (p[0] = X((h) => d.$emit("click", d.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (h) => o(h))
      }, [
        d.icon ? (i(), f("span", Df, [
          U(de, { name: d.icon }, null, 8, ["name"])
        ])) : y("", !0),
        A(d.$slots, "default")
      ], 40, _f)
    ]));
  }
}), Ln = /* @__PURE__ */ O({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = T(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), r = T(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (n, l) => (i(), f("th", H(n.headerAttrs, { scope: "col" }), [
      R(b(n.header) + " ", 1),
      n.icon && !e.value ? (i(), N(de, ge(H({ key: 0 }, r.value)), null, 16)) : y("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: S({ [String(n.icon)]: e.value })
      }, null, 2)) : y("", !0)
    ], 16));
  }
}), xf = { key: 0 }, An = /* @__PURE__ */ O({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (t, e) => t.headers ? (i(), f("tr", xf, [
      (i(!0), f(Y, null, z(t.headers, (r, n) => (i(), N(Ln, {
        key: n,
        header: (typeof r == "object" ? r : {}).text || r,
        "header-attrs": r.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : y("", !0);
  }
}), On = /* @__PURE__ */ O({
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
    const t = a, e = T(() => typeof t.field == "object" && t.field !== null && t.field.component ? t.field.component : !1), r = T(() => ["string", "number", "boolean"].includes(typeof t.field));
    return (n, l) => (i(), f("td", ge(Vt(n.cellAttrs)), [
      e.value ? (i(), N(pe(e.value), ge(H({ key: 0 }, typeof n.field == "object" ? n.field : {})), {
        default: K(() => [
          R(b(n.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(Y, { key: 1 }, [
        R(b(r.value ? n.field : n.field.text), 1)
      ], 64))
    ], 16));
  }
}), $n = /* @__PURE__ */ O({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (t, e) => (i(), f("tr", ge(Vt(t.rowAttrs)), [
      A(t.$slots, "default"),
      (i(!0), f(Y, null, z(t.rowData, (r, n) => (i(), N(On, {
        key: n,
        field: r ?? "",
        "cell-attrs": typeof r == "object" && r !== null && !r.component ? r.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Tf = { class: "caption" }, If = { key: 1 }, Mf = ["colspan"], Ef = { class: "flex justify-right" }, Cf = { class: "self-center" }, Bf = ["value"], Pf = { class: "flex ml-1" }, Lf = { class: "self-center" }, Af = { class: "flex ml-1" }, Of = /* @__PURE__ */ O({
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
    const e = a, r = t, n = (m) => Array.isArray(m) ? m : m.rowData, l = j(e.currentPage), o = j(e.resultsDisplayed), s = j(
      e.rows.length > o.value ? Math.ceil(e.rows.length / o.value) : 1
    ), u = [5, 10, 25, 50, 100], d = () => l.value * o.value - o.value, p = () => l.value * o.value;
    ue(
      () => o.value,
      (m) => {
        s.value = e.rows.length > o.value ? Math.ceil(e.rows.length / m) : 1;
      }
    );
    const h = T(() => e.pagination ? e.rows.slice(d(), p()) : e.rows), D = () => {
      l.value = 1, r("update:currentPage");
    }, I = () => {
      l.value > 1 && (l.value -= 1, r("update:currentPage"));
    }, _ = () => {
      l.value < s.value && (l.value += 1, r("update:currentPage"));
    }, P = () => {
      l.value = s.value, r("update:currentPage");
    };
    return (m, B) => (i(), f("div", {
      class: S(["fr-table", { "fr-table--no-caption": m.noCaption }])
    }, [
      c("table", null, [
        c("caption", Tf, b(m.title), 1),
        c("thead", null, [
          A(m.$slots, "header", {}, () => [
            m.headers && m.headers.length ? (i(), N(An, {
              key: 0,
              headers: m.headers
            }, null, 8, ["headers"])) : y("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          A(m.$slots, "default", {}, void 0, !0),
          m.rows && m.rows.length ? (i(!0), f(Y, { key: 0 }, z(h.value, (M, L) => (i(), N($n, {
            key: m.rowKey && n(M) ? typeof m.rowKey == "string" ? n(M)[m.headers.indexOf(m.rowKey)].toString() : m.rowKey(n(M)) : L,
            "row-data": n(M),
            "row-attrs": "rowAttrs" in M ? M.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : y("", !0),
          m.pagination ? (i(), f("tr", If, [
            c("td", {
              colspan: m.headers.length
            }, [
              c("div", Ef, [
                c("div", Cf, [
                  B[6] || (B[6] = c("span", null, "Résultats par page : ", -1)),
                  xe(c("select", {
                    "onUpdate:modelValue": B[0] || (B[0] = (M) => o.value = M),
                    onChange: B[1] || (B[1] = (M) => r("update:currentPage"))
                  }, [
                    (i(), f(Y, null, z(u, (M, L) => c("option", {
                      key: L,
                      value: M
                    }, b(M), 9, Bf)), 64))
                  ], 544), [
                    [qt, o.value]
                  ])
                ]),
                c("div", Pf, [
                  c("span", Lf, "Page " + b(l.value) + " sur " + b(s.value), 1)
                ]),
                c("div", Af, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: B[2] || (B[2] = (M) => D())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: B[3] || (B[3] = (M) => I())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: B[4] || (B[4] = (M) => _())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: B[5] || (B[5] = (M) => P())
                  })
                ])
              ])
            ], 8, Mf)
          ])) : y("", !0)
        ])
      ])
    ], 2));
  }
}), $f = /* @__PURE__ */ ve(Of, [["__scopeId", "data-v-3998acc8"]]), Ff = ["aria-label"], Sf = /* @__PURE__ */ O({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: t, emit: e }) {
    const r = a, n = e, l = j(!1), o = T({
      get: () => r.modelValue,
      set(g) {
        n("update:modelValue", g);
      }
    }), s = j(/* @__PURE__ */ new Map()), u = j(0);
    Ce(mt, (g) => {
      const k = j(!0);
      if (ue(o, (w, G) => {
        k.value = w > G;
      }), [...s.value.values()].includes(g.value))
        return { isVisible: T(() => s.value.get(o.value) === g.value), asc: k };
      const v = u.value++;
      s.value.set(v, g.value);
      const E = T(() => v === o.value);
      return ue(g, () => {
        s.value.set(v, g.value);
      }), we(() => {
        s.value.delete(v);
      }), { isVisible: E };
    });
    const d = j(null), p = j(null), h = lr({}), D = (g) => {
      if (h[g])
        return h[g];
      const k = te("tab");
      return h[g] = k, k;
    }, I = async () => {
      const g = o.value === 0 ? r.tabTitles.length - 1 : o.value - 1;
      l.value = !1, o.value = g;
    }, _ = async () => {
      const g = o.value === r.tabTitles.length - 1 ? 0 : o.value + 1;
      l.value = !0, o.value = g;
    }, P = async () => {
      o.value = 0;
    }, m = async () => {
      o.value = r.tabTitles.length - 1;
    }, B = j({ "--tabs-height": "100px" }), M = () => {
      var g;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const k = p.value.offsetHeight, v = (g = d.value) == null ? void 0 : g.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!v || !v.offsetHeight)
        return;
      const E = v.offsetHeight;
      B.value["--tabs-height"] = `${k + E}px`;
    }, L = j(null);
    return fe(() => {
      var g;
      window.ResizeObserver && (L.value = new window.ResizeObserver(() => {
        M();
      })), (g = d.value) == null || g.querySelectorAll(".fr-tabs__panel").forEach((k) => {
        var v;
        k && ((v = L.value) == null || v.observe(k));
      });
    }), we(() => {
      var g;
      (g = d.value) == null || g.querySelectorAll(".fr-tabs__panel").forEach((k) => {
        var v;
        k && ((v = L.value) == null || v.unobserve(k));
      });
    }), t({
      renderTabs: M,
      selectFirst: P,
      selectLast: m
    }), (g, k) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: ye(B.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": g.tabListName
      }, [
        A(g.$slots, "tab-items", {}, () => [
          (i(!0), f(Y, null, z(g.tabTitles, (v, E) => (i(), N(Pn, {
            key: E,
            icon: v.icon,
            "panel-id": v.panelId || `${D(E)}-panel`,
            "tab-id": v.tabId || D(E),
            onClick: (w) => o.value = E,
            onNext: k[0] || (k[0] = (w) => _()),
            onPrevious: k[1] || (k[1] = (w) => I()),
            onFirst: k[2] || (k[2] = (w) => P()),
            onLast: k[3] || (k[3] = (w) => m())
          }, {
            default: K(() => [
              R(b(v.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, Ff),
      (i(!0), f(Y, null, z(g.tabContents, (v, E) => {
        var w, G, x, C;
        return i(), N(Bn, {
          key: E,
          "panel-id": ((G = (w = g.tabTitles) == null ? void 0 : w[E]) == null ? void 0 : G.panelId) || `${D(E)}-panel`,
          "tab-id": ((C = (x = g.tabTitles) == null ? void 0 : x[E]) == null ? void 0 : C.tabId) || D(E)
        }, {
          default: K(() => [
            R(b(v), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      A(g.$slots, "default")
    ], 4));
  }
}), Nf = /* @__PURE__ */ O({
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
    const t = a, e = T(() => typeof t.link == "string" && t.link.startsWith("http")), r = T(() => t.link ? e.value ? "a" : "RouterLink" : t.disabled && t.tagName === "p" ? "button" : t.tagName), n = T(() => ({ [e.value ? "href" : "to"]: t.link })), l = T(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), o = t.small ? 0.65 : 0.9, s = T(() => l.value ? void 0 : typeof t.icon == "string" ? { name: t.icon, scale: o } : { scale: o, ...t.icon ?? {} });
    return (u, d) => (i(), N(pe(r.value), H({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: l.value,
        "fr-tag--icon-left": l.value
      }],
      disabled: u.disabled
    }, n.value), {
      default: K(() => [
        t.icon && !l.value ? (i(), N(de, H({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : y("", !0),
        u.iconOnly ? y("", !0) : (i(), f(Y, { key: 1 }, [
          R(b(u.label), 1)
        ], 64)),
        A(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), ta = /* @__PURE__ */ ve(Nf, [["__scopeId", "data-v-f6a89dc8"]]), Rf = { class: "fr-tags-group" }, Vf = /* @__PURE__ */ O({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("ul", Rf, [
      (i(!0), f(Y, null, z(t.tags, ({ icon: r, label: n, ...l }, o) => (i(), f("li", { key: o }, [
        U(ta, H({ ref_for: !0 }, l, {
          icon: r,
          label: n
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), jf = { class: "fr-tile__body" }, qf = { class: "fr-tile__content" }, Hf = ["download", "href"], Wf = {
  key: 0,
  class: "fr-tile__desc"
}, Yf = {
  key: 1,
  class: "fr-tile__detail"
}, Qf = {
  key: 2,
  class: "fr-tile__start"
}, Gf = { class: "fr-tile__header" }, Kf = {
  key: 0,
  class: "fr-tile__pictogram"
}, zf = ["src"], Xf = ["href"], Uf = ["href"], Zf = ["href"], Jf = /* @__PURE__ */ O({
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
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, r = T(() => typeof t.to == "string" && t.to.startsWith("http"));
    return (n, l) => {
      const o = he("RouterLink");
      return i(), f("div", {
        class: S(["fr-tile fr-enlarge-link", [{
          "fr-tile--disabled": n.disabled,
          "fr-tile--sm": n.small === !0,
          "fr-tile--horizontal": n.horizontal === !0,
          "fr-tile--vertical": n.horizontal === !1 || n.vertical === "md" || n.vertical === "lg",
          "fr-tile--vertical@md": n.vertical === "md",
          "fr-tile--vertical@lg": n.vertical === "lg",
          "fr-tile--download": n.download,
          "fr-tile--no-icon": n.icon === !1,
          "fr-tile--no-border": n.noBorder,
          "fr-tile--no-background": n.noBackground,
          "fr-tile--shadow": n.shadow,
          "fr-tile--grey": n.grey,
          "fr-enlarge-button": n.enlarge
        }]])
      }, [
        c("div", jf, [
          c("div", qf, [
            (i(), N(pe(n.titleTag), { class: "fr-tile__title" }, {
              default: K(() => [
                r.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: n.download,
                  href: n.disabled ? "" : n.to
                }, b(n.title), 9, Hf)) : y("", !0),
                r.value ? y("", !0) : (i(), N(o, {
                  key: 1,
                  download: n.download,
                  class: "fr-tile__link",
                  to: n.disabled ? "" : n.to
                }, {
                  default: K(() => [
                    R(b(n.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            n.description ? (i(), f("p", Wf, b(n.description), 1)) : y("", !0),
            n.details ? (i(), f("p", Yf, b(n.details), 1)) : y("", !0),
            n.$slots["start-details"] ? (i(), f("div", Qf, [
              A(n.$slots, "start-details", {}, void 0, !0)
            ])) : y("", !0)
          ])
        ]),
        c("div", Gf, [
          A(n.$slots, "header", {}, void 0, !0),
          n.imgSrc || n.svgPath ? (i(), f("div", Kf, [
            n.imgSrc ? (i(), f("img", {
              key: 0,
              src: n.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, zf)) : (i(), f("svg", H({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...e, ...n.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${n.svgPath}#artwork-decorative`
              }, null, 8, Xf),
              c("use", {
                class: "fr-artwork-minor",
                href: `${n.svgPath}#artwork-minor`
              }, null, 8, Uf),
              c("use", {
                class: "fr-artwork-major",
                href: `${n.svgPath}#artwork-major`
              }, null, 8, Zf)
            ], 16))
          ])) : y("", !0)
        ])
      ], 2);
    };
  }
}), Fn = /* @__PURE__ */ ve(Jf, [["__scopeId", "data-v-f4d836a2"]]), ep = { class: "fr-grid-row fr-grid-row--gutters" }, tp = /* @__PURE__ */ O({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("div", ep, [
      (i(!0), f(Y, null, z(t.tiles, (r, n) => (i(), f("div", {
        key: n,
        class: S({
          [r.containerClass ?? "no-class"]: r.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !r.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        U(Fn, H({
          horizontal: t.horizontal,
          ref_for: !0
        }, r), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), ap = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], np = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], rp = ["id"], lp = /* @__PURE__ */ O({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => te("toggle") },
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
  setup(a) {
    const t = a, e = T(() => `${t.inputId}-hint-text`);
    return (r, n) => (i(), f("div", {
      class: S(["fr-toggle", {
        "fr-toggle--label-left": r.labelLeft,
        "fr-toggle--border-bottom": r.borderBottom
      }])
    }, [
      c("input", {
        id: r.inputId,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        type: "checkbox",
        checked: r.modelValue,
        "data-testid": r.inputId,
        class: "fr-toggle__input",
        "aria-describedby": e.value,
        onInput: n[0] || (n[0] = (l) => r.$emit("update:modelValue", l.target.checked))
      }, null, 40, ap),
      c("label", {
        id: e.value,
        class: "fr-toggle__label",
        for: r.inputId,
        "data-fr-checked-label": r.noText ? void 0 : r.activeText,
        "data-fr-unchecked-label": r.noText ? void 0 : r.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, b(r.label), 9, np),
      r.hint ? (i(), f("p", {
        key: 0,
        id: `${r.inputId}-hint-text`,
        class: "fr-hint-text"
      }, b(r.hint), 9, rp)) : y("", !0)
    ], 2));
  }
}), op = ["id"], sp = /* @__PURE__ */ O({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => te("tooltip") }
  },
  setup(a) {
    const t = a, e = j(!1), r = j(null), n = j(null), l = j("0px"), o = j("0px"), s = j("0px"), u = j(!1), d = j(0);
    async function p() {
      var M, L, g, k, v, E;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((ne) => setTimeout(ne, 100));
      const w = (M = r.value) == null ? void 0 : M.getBoundingClientRect().top, G = (L = r.value) == null ? void 0 : L.offsetHeight, x = (g = r.value) == null ? void 0 : g.offsetWidth, C = (k = r.value) == null ? void 0 : k.getBoundingClientRect().left, q = (v = n.value) == null ? void 0 : v.offsetHeight, $ = (E = n.value) == null ? void 0 : E.offsetWidth, V = !(w - q < 0) && w + G + q >= document.documentElement.offsetHeight;
      u.value = V;
      const Q = C + x >= document.documentElement.offsetWidth, J = C + x / 2 - $ / 2 <= 0;
      o.value = V ? `${w - q + 8}px` : `${w + G - 8}px`, d.value = 1, l.value = Q ? `${C + x - $ - 4}px` : J ? `${C + 4}px` : `${C + x / 2 - $ / 2}px`, s.value = Q ? `${$ / 2 - x / 2 + 4}px` : J ? `${-($ / 2) + x / 2 - 4}px` : "0px";
    }
    ue(e, p, { immediate: !0 }), fe(() => {
      window.addEventListener("scroll", p);
    }), we(() => {
      window.removeEventListener("scroll", p);
    });
    const h = T(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), D = T(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), I = (M) => {
      var L, g;
      e.value && (M.target === r.value || (L = r.value) != null && L.contains(M.target) || M.target === n.value || (g = n.value) != null && g.contains(M.target) || (e.value = !1));
    }, _ = (M) => {
      M.key === "Escape" && (e.value = !1);
    };
    fe(() => {
      document.documentElement.addEventListener("click", I), document.documentElement.addEventListener("keydown", _);
    }), we(() => {
      document.documentElement.removeEventListener("click", I), document.documentElement.removeEventListener("keydown", _);
    });
    const P = () => {
      t.onHover && (e.value = !0);
    }, m = () => {
      t.onHover && (e.value = !1);
    }, B = () => {
      t.onHover || (e.value = !e.value);
    };
    return (M, L) => (i(), f(Y, null, [
      (i(), N(pe(M.onHover ? "a" : "button"), {
        id: `link-${M.id}`,
        ref_key: "source",
        ref: r,
        class: S(M.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": M.id,
        href: M.onHover ? "#" : void 0,
        onClick: L[0] || (L[0] = X((g) => B(), ["stop"])),
        onMouseenter: L[1] || (L[1] = (g) => P()),
        onMouseleave: L[2] || (L[2] = (g) => m()),
        onFocus: L[3] || (L[3] = (g) => P()),
        onBlur: L[4] || (L[4] = (g) => m())
      }, {
        default: K(() => [
          A(M.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: M.id,
        ref_key: "tooltip",
        ref: n,
        class: S(["fr-tooltip fr-placement", D.value]),
        style: ye(h.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, b(M.content), 15, op)
    ], 64));
  }
}), ip = /* @__PURE__ */ ve(sp, [["__scopeId", "data-v-67870551"]]), up = { class: "fr-transcription" }, dp = ["aria-expanded", "aria-controls"], cp = ["id"], fp = ["id", "aria-labelledby"], pp = { class: "fr-container fr-container--fluid fr-container-md" }, mp = { class: "fr-grid-row fr-grid-row--center" }, vp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, hp = { class: "fr-modal__body" }, bp = { class: "fr-modal__header" }, gp = ["aria-controls"], yp = { class: "fr-modal__content" }, kp = ["id"], wp = { class: "fr-transcription__footer" }, _p = { class: "fr-transcription__actions-group" }, Dp = ["aria-controls"], Sn = /* @__PURE__ */ O({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => te("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: r,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: o
    } = Pe(), s = j(!1), u = j(!1), d = T(() => `fr-transcription__modal-${t.id}`), p = T(() => `fr-transcription__collapse-${t.id}`);
    return ue(u, (h, D) => {
      h !== D && l(h);
    }), (h, D) => (i(), f("div", up, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: D[0] || (D[0] = (I) => u.value = !u.value)
      }, " Transcription ", 8, dp),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: e,
        class: S(["fr-collapse", { "fr-collapse--expanded": F(n), "fr-collapsing": F(r) }]),
        onTransitionend: D[2] || (D[2] = (I) => F(o)(u.value))
      }, [
        c("dialog", {
          id: d.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${d.value}-title`
        }, [
          c("div", pp, [
            c("div", mp, [
              c("div", vp, [
                c("div", hp, [
                  c("div", bp, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": d.value,
                      title: "Fermer"
                    }, " Fermer ", 8, gp)
                  ]),
                  c("div", yp, [
                    c("h1", {
                      id: `${d.value}-title`,
                      class: "fr-modal__title"
                    }, b(h.title), 9, kp),
                    R(" " + b(h.content), 1)
                  ]),
                  c("div", wp, [
                    c("div", _p, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: D[1] || (D[1] = (I) => s.value = !0)
                      }, " Agrandir ", 8, Dp)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, fp)
      ], 42, cp),
      (i(), N(or, { to: "body" }, [
        U(yn, {
          title: h.title,
          opened: s.value,
          onClose: D[3] || (D[3] = (I) => s.value = !1)
        }, {
          default: K(() => [
            A(h.$slots, "default", {}, () => [
              R(b(h.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), xp = ["src"], Tp = { class: "fr-content-media__caption" }, Ip = /* @__PURE__ */ O({
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
    return (t, e) => (i(), f(Y, null, [
      c("figure", {
        class: S(["fr-content-media", {
          "fr-content-media--sm": t.size === "small",
          "fr-content-media--lg": t.size === "large"
        }])
      }, [
        c("div", {
          class: S(["fr-responsive-vid", `fr-ratio-${t.ratio}`])
        }, [
          c("iframe", {
            src: t.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, xp)
        ], 2),
        c("div", Tp, b(t.legend), 1)
      ], 2),
      U(Sn, {
        title: t.transcriptionTitle,
        content: t.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Mp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: vr,
  DsfrAccordionsGroup: br,
  DsfrAlert: kr,
  DsfrBackToTop: wr,
  DsfrBadge: Ya,
  DsfrBreadcrumb: Er,
  DsfrButton: tt,
  DsfrButtonGroup: gt,
  DsfrCallout: Rl,
  DsfrCard: Jl,
  DsfrCardDetail: Ot,
  DsfrCheckbox: Ut,
  DsfrCheckboxSet: co,
  DsfrConsent: vo,
  DsfrDataTable: Xo,
  DsfrErrorPage: rs,
  DsfrFieldset: us,
  DsfrFileDownload: sn,
  DsfrFileDownloadList: ms,
  DsfrFileUpload: ws,
  DsfrFollow: qs,
  DsfrFooter: gi,
  DsfrFooterLink: cn,
  DsfrFooterLinkList: _i,
  DsfrFooterPartners: fn,
  DsfrFranceConnect: Ii,
  DsfrHeader: pu,
  DsfrHeaderMenuLink: ea,
  DsfrHeaderMenuLinks: $t,
  DsfrHighlight: mu,
  DsfrInput: Jt,
  DsfrInputGroup: ku,
  DsfrLanguageSelector: Ue,
  DsfrLogo: Xe,
  DsfrModal: yn,
  DsfrNavigation: Id,
  DsfrNavigationItem: kn,
  DsfrNavigationMegaMenu: _n,
  DsfrNavigationMegaMenuCategory: wn,
  DsfrNavigationMenu: xn,
  DsfrNavigationMenuItem: Dn,
  DsfrNavigationMenuLink: yt,
  DsfrNewsLetter: un,
  DsfrNotice: Pd,
  DsfrPagination: Zt,
  DsfrPicture: Fd,
  DsfrQuote: Wd,
  DsfrRadioButton: Tn,
  DsfrRadioButtonSet: sc,
  DsfrRange: gc,
  DsfrSearchBar: Ze,
  DsfrSegmented: In,
  DsfrSegmentedSet: Ec,
  DsfrSelect: Fc,
  DsfrShare: Wc,
  DsfrSideMenu: Jc,
  DsfrSideMenuButton: Mn,
  DsfrSideMenuLink: ef,
  DsfrSideMenuList: Cn,
  DsfrSideMenuListItem: En,
  DsfrSkipLinks: lf,
  DsfrSocialNetworks: dn,
  DsfrStepper: pf,
  DsfrSummary: gf,
  DsfrTabContent: Bn,
  DsfrTabItem: Pn,
  DsfrTable: $f,
  DsfrTableCell: On,
  DsfrTableHeader: Ln,
  DsfrTableHeaders: An,
  DsfrTableRow: $n,
  DsfrTabs: Sf,
  DsfrTag: ta,
  DsfrTags: Vf,
  DsfrTile: Fn,
  DsfrTiles: tp,
  DsfrToggleSwitch: lp,
  DsfrTooltip: ip,
  DsfrTranscription: Sn,
  DsfrVideo: Ip,
  VIcon: de,
  registerAccordionKey: Ht,
  registerNavigationLinkKey: Wt,
  registerTabKey: mt
}, Symbol.toStringTag, { value: "Module" })), Ep = {
  install: (a, { components: t } = {}) => {
    Object.entries(Mp).forEach(([e, r]) => {
      (t === void 0 || t === "all" || t.map(({ name: n }) => n).includes(e)) && a.component(e, r);
    }), a.component("VIcon", de);
  }
}, Nn = 6048e5, Cp = 864e5, Bp = 6e4, Pp = 36e5, Lp = 1e3, Aa = Symbol.for("constructDateFrom");
function me(a, t) {
  return typeof a == "function" ? a(t) : a && typeof a == "object" && Aa in a ? a[Aa](t) : a instanceof Date ? new a.constructor(t) : new Date(t);
}
function ce(a, t) {
  return me(t || a, a);
}
function Rn(a, t, e) {
  const r = ce(a, e == null ? void 0 : e.in);
  return isNaN(t) ? me((e == null ? void 0 : e.in) || a, NaN) : (t && r.setDate(r.getDate() + t), r);
}
let Ap = {};
function qe() {
  return Ap;
}
function Be(a, t) {
  var s, u, d, p;
  const e = qe(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, n = ce(a, t == null ? void 0 : t.in), l = n.getDay(), o = (l < r ? 7 : 0) + l - r;
  return n.setDate(n.getDate() - o), n.setHours(0, 0, 0, 0), n;
}
function je(a, t) {
  return Be(a, { ...t, weekStartsOn: 1 });
}
function Vn(a, t) {
  const e = ce(a, t == null ? void 0 : t.in), r = e.getFullYear(), n = me(e, 0);
  n.setFullYear(r + 1, 0, 4), n.setHours(0, 0, 0, 0);
  const l = je(n), o = me(e, 0);
  o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
  const s = je(o);
  return e.getTime() >= l.getTime() ? r + 1 : e.getTime() >= s.getTime() ? r : r - 1;
}
function ft(a) {
  const t = ce(a), e = new Date(
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
function Op(a, ...t) {
  const e = me.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(e);
}
function Oa(a, t) {
  const e = ce(a, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function $p(a, t, e) {
  const [r, n] = Op(
    e == null ? void 0 : e.in,
    a,
    t
  ), l = Oa(r), o = Oa(n), s = +l - ft(l), u = +o - ft(o);
  return Math.round((s - u) / Cp);
}
function Fp(a, t) {
  const e = Vn(a, t), r = me(a, 0);
  return r.setFullYear(e, 0, 4), r.setHours(0, 0, 0, 0), je(r);
}
function Sp(a) {
  return a instanceof Date || typeof a == "object" && Object.prototype.toString.call(a) === "[object Date]";
}
function Np(a) {
  return !(!Sp(a) && typeof a != "number" || isNaN(+ce(a)));
}
function Rp(a, t) {
  const e = ce(a, t == null ? void 0 : t.in);
  return e.setFullYear(e.getFullYear(), 0, 1), e.setHours(0, 0, 0, 0), e;
}
const Vp = {
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
}, jp = (a, t, e) => {
  let r;
  const n = Vp[a];
  return typeof n == "string" ? r = n : t === 1 ? r = n.one : r = n.other.replace("{{count}}", t.toString()), e != null && e.addSuffix ? e.comparison && e.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Tt(a) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : a.defaultWidth;
    return a.formats[e] || a.formats[a.defaultWidth];
  };
}
const qp = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Hp = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Wp = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Yp = {
  date: Tt({
    formats: qp,
    defaultWidth: "full"
  }),
  time: Tt({
    formats: Hp,
    defaultWidth: "full"
  }),
  dateTime: Tt({
    formats: Wp,
    defaultWidth: "full"
  })
}, Qp = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Gp = (a, t, e, r) => Qp[a];
function We(a) {
  return (t, e) => {
    const r = e != null && e.context ? String(e.context) : "standalone";
    let n;
    if (r === "formatting" && a.formattingValues) {
      const o = a.defaultFormattingWidth || a.defaultWidth, s = e != null && e.width ? String(e.width) : o;
      n = a.formattingValues[s] || a.formattingValues[o];
    } else {
      const o = a.defaultWidth, s = e != null && e.width ? String(e.width) : a.defaultWidth;
      n = a.values[s] || a.values[o];
    }
    const l = a.argumentCallback ? a.argumentCallback(t) : t;
    return n[l];
  };
}
const Kp = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, zp = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Xp = {
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
}, Up = {
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
}, Zp = {
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
}, Jp = {
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
}, em = (a, t) => {
  const e = Number(a), r = e % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return e + "st";
      case 2:
        return e + "nd";
      case 3:
        return e + "rd";
    }
  return e + "th";
}, tm = {
  ordinalNumber: em,
  era: We({
    values: Kp,
    defaultWidth: "wide"
  }),
  quarter: We({
    values: zp,
    defaultWidth: "wide",
    argumentCallback: (a) => a - 1
  }),
  month: We({
    values: Xp,
    defaultWidth: "wide"
  }),
  day: We({
    values: Up,
    defaultWidth: "wide"
  }),
  dayPeriod: We({
    values: Zp,
    defaultWidth: "wide",
    formattingValues: Jp,
    defaultFormattingWidth: "wide"
  })
};
function Ye(a) {
  return (t, e = {}) => {
    const r = e.width, n = r && a.matchPatterns[r] || a.matchPatterns[a.defaultMatchWidth], l = t.match(n);
    if (!l)
      return null;
    const o = l[0], s = r && a.parsePatterns[r] || a.parsePatterns[a.defaultParseWidth], u = Array.isArray(s) ? nm(s, (h) => h.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      am(s, (h) => h.test(o))
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
function am(a, t) {
  for (const e in a)
    if (Object.prototype.hasOwnProperty.call(a, e) && t(a[e]))
      return e;
}
function nm(a, t) {
  for (let e = 0; e < a.length; e++)
    if (t(a[e]))
      return e;
}
function rm(a) {
  return (t, e = {}) => {
    const r = t.match(a.matchPattern);
    if (!r) return null;
    const n = r[0], l = t.match(a.parsePattern);
    if (!l) return null;
    let o = a.valueCallback ? a.valueCallback(l[0]) : l[0];
    o = e.valueCallback ? e.valueCallback(o) : o;
    const s = t.slice(n.length);
    return { value: o, rest: s };
  };
}
const lm = /^(\d+)(th|st|nd|rd)?/i, om = /\d+/i, sm = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, im = {
  any: [/^b/i, /^(a|c)/i]
}, um = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, dm = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, cm = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, fm = {
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
}, pm = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, mm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, vm = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, hm = {
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
}, bm = {
  ordinalNumber: rm({
    matchPattern: lm,
    parsePattern: om,
    valueCallback: (a) => parseInt(a, 10)
  }),
  era: Ye({
    matchPatterns: sm,
    defaultMatchWidth: "wide",
    parsePatterns: im,
    defaultParseWidth: "any"
  }),
  quarter: Ye({
    matchPatterns: um,
    defaultMatchWidth: "wide",
    parsePatterns: dm,
    defaultParseWidth: "any",
    valueCallback: (a) => a + 1
  }),
  month: Ye({
    matchPatterns: cm,
    defaultMatchWidth: "wide",
    parsePatterns: fm,
    defaultParseWidth: "any"
  }),
  day: Ye({
    matchPatterns: pm,
    defaultMatchWidth: "wide",
    parsePatterns: mm,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ye({
    matchPatterns: vm,
    defaultMatchWidth: "any",
    parsePatterns: hm,
    defaultParseWidth: "any"
  })
}, jn = {
  code: "en-US",
  formatDistance: jp,
  formatLong: Yp,
  formatRelative: Gp,
  localize: tm,
  match: bm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function gm(a, t) {
  const e = ce(a, t == null ? void 0 : t.in);
  return $p(e, Rp(e)) + 1;
}
function qn(a, t) {
  const e = ce(a, t == null ? void 0 : t.in), r = +je(e) - +Fp(e);
  return Math.round(r / Nn) + 1;
}
function aa(a, t) {
  var p, h, D, I;
  const e = ce(a, t == null ? void 0 : t.in), r = e.getFullYear(), n = qe(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((h = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((I = (D = n.locale) == null ? void 0 : D.options) == null ? void 0 : I.firstWeekContainsDate) ?? 1, o = me((t == null ? void 0 : t.in) || a, 0);
  o.setFullYear(r + 1, 0, l), o.setHours(0, 0, 0, 0);
  const s = Be(o, t), u = me((t == null ? void 0 : t.in) || a, 0);
  u.setFullYear(r, 0, l), u.setHours(0, 0, 0, 0);
  const d = Be(u, t);
  return +e >= +s ? r + 1 : +e >= +d ? r : r - 1;
}
function ym(a, t) {
  var s, u, d, p;
  const e = qe(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (s = t == null ? void 0 : t.locale) == null ? void 0 : s.options) == null ? void 0 : u.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, n = aa(a, t), l = me((t == null ? void 0 : t.in) || a, 0);
  return l.setFullYear(n, 0, r), l.setHours(0, 0, 0, 0), Be(l, t);
}
function Hn(a, t) {
  const e = ce(a, t == null ? void 0 : t.in), r = +Be(e, t) - +ym(e, t);
  return Math.round(r / Nn) + 1;
}
function ae(a, t) {
  const e = a < 0 ? "-" : "", r = Math.abs(a).toString().padStart(t, "0");
  return e + r;
}
const Me = {
  // Year
  y(a, t) {
    const e = a.getFullYear(), r = e > 0 ? e : 1 - e;
    return ae(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(a, t) {
    const e = a.getMonth();
    return t === "M" ? String(e + 1) : ae(e + 1, 2);
  },
  // Day of the month
  d(a, t) {
    return ae(a.getDate(), t.length);
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
    return ae(a.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(a, t) {
    return ae(a.getHours(), t.length);
  },
  // Minute
  m(a, t) {
    return ae(a.getMinutes(), t.length);
  },
  // Second
  s(a, t) {
    return ae(a.getSeconds(), t.length);
  },
  // Fraction of second
  S(a, t) {
    const e = t.length, r = a.getMilliseconds(), n = Math.trunc(
      r * Math.pow(10, e - 3)
    );
    return ae(n, t.length);
  }
}, Re = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, $a = {
  // Era
  G: function(a, t, e) {
    const r = a.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return e.era(r, { width: "abbreviated" });
      case "GGGGG":
        return e.era(r, { width: "narrow" });
      case "GGGG":
      default:
        return e.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(a, t, e) {
    if (t === "yo") {
      const r = a.getFullYear(), n = r > 0 ? r : 1 - r;
      return e.ordinalNumber(n, { unit: "year" });
    }
    return Me.y(a, t);
  },
  // Local week-numbering year
  Y: function(a, t, e, r) {
    const n = aa(a, r), l = n > 0 ? n : 1 - n;
    if (t === "YY") {
      const o = l % 100;
      return ae(o, 2);
    }
    return t === "Yo" ? e.ordinalNumber(l, { unit: "year" }) : ae(l, t.length);
  },
  // ISO week-numbering year
  R: function(a, t) {
    const e = Vn(a);
    return ae(e, t.length);
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
    return ae(e, t.length);
  },
  // Quarter
  Q: function(a, t, e) {
    const r = Math.ceil((a.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return ae(r, 2);
      case "Qo":
        return e.ordinalNumber(r, { unit: "quarter" });
      case "QQQ":
        return e.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return e.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return e.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(a, t, e) {
    const r = Math.ceil((a.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(r);
      case "qq":
        return ae(r, 2);
      case "qo":
        return e.ordinalNumber(r, { unit: "quarter" });
      case "qqq":
        return e.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return e.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return e.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(a, t, e) {
    const r = a.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Me.M(a, t);
      case "Mo":
        return e.ordinalNumber(r + 1, { unit: "month" });
      case "MMM":
        return e.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return e.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return e.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(a, t, e) {
    const r = a.getMonth();
    switch (t) {
      case "L":
        return String(r + 1);
      case "LL":
        return ae(r + 1, 2);
      case "Lo":
        return e.ordinalNumber(r + 1, { unit: "month" });
      case "LLL":
        return e.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return e.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return e.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(a, t, e, r) {
    const n = Hn(a, r);
    return t === "wo" ? e.ordinalNumber(n, { unit: "week" }) : ae(n, t.length);
  },
  // ISO week of year
  I: function(a, t, e) {
    const r = qn(a);
    return t === "Io" ? e.ordinalNumber(r, { unit: "week" }) : ae(r, t.length);
  },
  // Day of the month
  d: function(a, t, e) {
    return t === "do" ? e.ordinalNumber(a.getDate(), { unit: "date" }) : Me.d(a, t);
  },
  // Day of year
  D: function(a, t, e) {
    const r = gm(a);
    return t === "Do" ? e.ordinalNumber(r, { unit: "dayOfYear" }) : ae(r, t.length);
  },
  // Day of week
  E: function(a, t, e) {
    const r = a.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return e.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return e.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return e.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return e.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(a, t, e, r) {
    const n = a.getDay(), l = (n - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(l);
      case "ee":
        return ae(l, 2);
      case "eo":
        return e.ordinalNumber(l, { unit: "day" });
      case "eee":
        return e.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return e.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return e.day(n, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return e.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(a, t, e, r) {
    const n = a.getDay(), l = (n - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(l);
      case "cc":
        return ae(l, t.length);
      case "co":
        return e.ordinalNumber(l, { unit: "day" });
      case "ccc":
        return e.day(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return e.day(n, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return e.day(n, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return e.day(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(a, t, e) {
    const r = a.getDay(), n = r === 0 ? 7 : r;
    switch (t) {
      case "i":
        return String(n);
      case "ii":
        return ae(n, t.length);
      case "io":
        return e.ordinalNumber(n, { unit: "day" });
      case "iii":
        return e.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return e.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return e.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return e.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(a, t, e) {
    const n = a.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return e.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return e.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return e.dayPeriod(n, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return e.dayPeriod(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(a, t, e) {
    const r = a.getHours();
    let n;
    switch (r === 12 ? n = Re.noon : r === 0 ? n = Re.midnight : n = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return e.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return e.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return e.dayPeriod(n, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return e.dayPeriod(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(a, t, e) {
    const r = a.getHours();
    let n;
    switch (r >= 17 ? n = Re.evening : r >= 12 ? n = Re.afternoon : r >= 4 ? n = Re.morning : n = Re.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return e.dayPeriod(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return e.dayPeriod(n, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return e.dayPeriod(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(a, t, e) {
    if (t === "ho") {
      let r = a.getHours() % 12;
      return r === 0 && (r = 12), e.ordinalNumber(r, { unit: "hour" });
    }
    return Me.h(a, t);
  },
  // Hour [0-23]
  H: function(a, t, e) {
    return t === "Ho" ? e.ordinalNumber(a.getHours(), { unit: "hour" }) : Me.H(a, t);
  },
  // Hour [0-11]
  K: function(a, t, e) {
    const r = a.getHours() % 12;
    return t === "Ko" ? e.ordinalNumber(r, { unit: "hour" }) : ae(r, t.length);
  },
  // Hour [1-24]
  k: function(a, t, e) {
    let r = a.getHours();
    return r === 0 && (r = 24), t === "ko" ? e.ordinalNumber(r, { unit: "hour" }) : ae(r, t.length);
  },
  // Minute
  m: function(a, t, e) {
    return t === "mo" ? e.ordinalNumber(a.getMinutes(), { unit: "minute" }) : Me.m(a, t);
  },
  // Second
  s: function(a, t, e) {
    return t === "so" ? e.ordinalNumber(a.getSeconds(), { unit: "second" }) : Me.s(a, t);
  },
  // Fraction of second
  S: function(a, t) {
    return Me.S(a, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(a, t, e) {
    const r = a.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return Sa(r);
      case "XXXX":
      case "XX":
        return Ae(r);
      case "XXXXX":
      case "XXX":
      default:
        return Ae(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(a, t, e) {
    const r = a.getTimezoneOffset();
    switch (t) {
      case "x":
        return Sa(r);
      case "xxxx":
      case "xx":
        return Ae(r);
      case "xxxxx":
      case "xxx":
      default:
        return Ae(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(a, t, e) {
    const r = a.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Fa(r, ":");
      case "OOOO":
      default:
        return "GMT" + Ae(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(a, t, e) {
    const r = a.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Fa(r, ":");
      case "zzzz":
      default:
        return "GMT" + Ae(r, ":");
    }
  },
  // Seconds timestamp
  t: function(a, t, e) {
    const r = Math.trunc(+a / 1e3);
    return ae(r, t.length);
  },
  // Milliseconds timestamp
  T: function(a, t, e) {
    return ae(+a, t.length);
  }
};
function Fa(a, t = "") {
  const e = a > 0 ? "-" : "+", r = Math.abs(a), n = Math.trunc(r / 60), l = r % 60;
  return l === 0 ? e + String(n) : e + String(n) + t + ae(l, 2);
}
function Sa(a, t) {
  return a % 60 === 0 ? (a > 0 ? "-" : "+") + ae(Math.abs(a) / 60, 2) : Ae(a, t);
}
function Ae(a, t = "") {
  const e = a > 0 ? "-" : "+", r = Math.abs(a), n = ae(Math.trunc(r / 60), 2), l = ae(r % 60, 2);
  return e + n + t + l;
}
const Na = (a, t) => {
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
}, Wn = (a, t) => {
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
}, km = (a, t) => {
  const e = a.match(/(P+)(p+)?/) || [], r = e[1], n = e[2];
  if (!n)
    return Na(a, t);
  let l;
  switch (r) {
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
  return l.replace("{{date}}", Na(r, t)).replace("{{time}}", Wn(n, t));
}, St = {
  p: Wn,
  P: km
}, wm = /^D+$/, _m = /^Y+$/, Dm = ["D", "DD", "YY", "YYYY"];
function Yn(a) {
  return wm.test(a);
}
function Qn(a) {
  return _m.test(a);
}
function Nt(a, t, e) {
  const r = xm(a, t, e);
  if (console.warn(r), Dm.includes(a)) throw new RangeError(r);
}
function xm(a, t, e) {
  const r = a[0] === "Y" ? "years" : "days of the month";
  return `Use \`${a.toLowerCase()}\` instead of \`${a}\` (in \`${t}\`) for formatting ${r} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Tm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Im = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Mm = /^'([^]*?)'?$/, Em = /''/g, Cm = /[a-zA-Z]/;
function Ra(a, t, e) {
  var p, h, D, I;
  const r = qe(), n = r.locale ?? jn, l = r.firstWeekContainsDate ?? ((h = (p = r.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, o = r.weekStartsOn ?? ((I = (D = r.locale) == null ? void 0 : D.options) == null ? void 0 : I.weekStartsOn) ?? 0, s = ce(a, e == null ? void 0 : e.in);
  if (!Np(s))
    throw new RangeError("Invalid time value");
  let u = t.match(Im).map((_) => {
    const P = _[0];
    if (P === "p" || P === "P") {
      const m = St[P];
      return m(_, n.formatLong);
    }
    return _;
  }).join("").match(Tm).map((_) => {
    if (_ === "''")
      return { isToken: !1, value: "'" };
    const P = _[0];
    if (P === "'")
      return { isToken: !1, value: Bm(_) };
    if ($a[P])
      return { isToken: !0, value: _ };
    if (P.match(Cm))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + P + "`"
      );
    return { isToken: !1, value: _ };
  });
  n.localize.preprocessor && (u = n.localize.preprocessor(s, u));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: o,
    locale: n
  };
  return u.map((_) => {
    if (!_.isToken) return _.value;
    const P = _.value;
    (Qn(P) || Yn(P)) && Nt(P, t, String(a));
    const m = $a[P[0]];
    return m(s, P, n.localize, d);
  }).join("");
}
function Bm(a) {
  const t = a.match(Mm);
  return t ? t[1].replace(Em, "'") : a;
}
function Pm() {
  return Object.assign({}, qe());
}
function Lm(a, t) {
  const e = ce(a, t == null ? void 0 : t.in).getDay();
  return e === 0 ? 7 : e;
}
function Am(a, t) {
  const e = Om(t) ? new t(0) : me(t, 0);
  return e.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), e.setHours(
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
    a.getMilliseconds()
  ), e;
}
function Om(a) {
  var t;
  return typeof a == "function" && ((t = a.prototype) == null ? void 0 : t.constructor) === a;
}
const $m = 10;
class Gn {
  constructor() {
    W(this, "subPriority", 0);
  }
  validate(t, e) {
    return !0;
  }
}
class Fm extends Gn {
  constructor(t, e, r, n, l) {
    super(), this.value = t, this.validateValue = e, this.setValue = r, this.priority = n, l && (this.subPriority = l);
  }
  validate(t, e) {
    return this.validateValue(t, this.value, e);
  }
  set(t, e, r) {
    return this.setValue(t, e, this.value, r);
  }
}
class Sm extends Gn {
  constructor(e, r) {
    super();
    W(this, "priority", $m);
    W(this, "subPriority", -1);
    this.context = e || ((n) => me(r, n));
  }
  set(e, r) {
    return r.timestampIsSet ? e : me(e, Am(e, this.context));
  }
}
class ee {
  run(t, e, r, n) {
    const l = this.parse(t, e, r, n);
    return l ? {
      setter: new Fm(
        l.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: l.rest
    } : null;
  }
  validate(t, e, r) {
    return !0;
  }
}
class Nm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 140);
    W(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(e, { width: "abbreviated" }) || n.era(e, { width: "narrow" });
      case "GGGGG":
        return n.era(e, { width: "narrow" });
      case "GGGG":
      default:
        return n.era(e, { width: "wide" }) || n.era(e, { width: "abbreviated" }) || n.era(e, { width: "narrow" });
    }
  }
  set(e, r, n) {
    return r.era = n, e.setFullYear(n, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
const se = {
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
}, _e = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function ie(a, t) {
  return a && {
    value: t(a.value),
    rest: a.rest
  };
}
function le(a, t) {
  const e = t.match(a);
  return e ? {
    value: parseInt(e[0], 10),
    rest: t.slice(e[0].length)
  } : null;
}
function De(a, t) {
  const e = t.match(a);
  if (!e)
    return null;
  if (e[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  const r = e[1] === "+" ? 1 : -1, n = e[2] ? parseInt(e[2], 10) : 0, l = e[3] ? parseInt(e[3], 10) : 0, o = e[5] ? parseInt(e[5], 10) : 0;
  return {
    value: r * (n * Pp + l * Bp + o * Lp),
    rest: t.slice(e[0].length)
  };
}
function Kn(a) {
  return le(se.anyDigitsSigned, a);
}
function oe(a, t) {
  switch (a) {
    case 1:
      return le(se.singleDigit, t);
    case 2:
      return le(se.twoDigits, t);
    case 3:
      return le(se.threeDigits, t);
    case 4:
      return le(se.fourDigits, t);
    default:
      return le(new RegExp("^\\d{1," + a + "}"), t);
  }
}
function pt(a, t) {
  switch (a) {
    case 1:
      return le(se.singleDigitSigned, t);
    case 2:
      return le(se.twoDigitsSigned, t);
    case 3:
      return le(se.threeDigitsSigned, t);
    case 4:
      return le(se.fourDigitsSigned, t);
    default:
      return le(new RegExp("^-?\\d{1," + a + "}"), t);
  }
}
function na(a) {
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
function zn(a, t) {
  const e = t > 0, r = e ? t : 1 - t;
  let n;
  if (r <= 50)
    n = a || 100;
  else {
    const l = r + 50, o = Math.trunc(l / 100) * 100, s = a >= l % 100;
    n = a + o - (s ? 100 : 0);
  }
  return e ? n : 1 - n;
}
function Xn(a) {
  return a % 400 === 0 || a % 4 === 0 && a % 100 !== 0;
}
class Rm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 130);
    W(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, r, n) {
    const l = (o) => ({
      year: o,
      isTwoDigitYear: r === "yy"
    });
    switch (r) {
      case "y":
        return ie(oe(4, e), l);
      case "yo":
        return ie(
          n.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return ie(oe(r.length, e), l);
    }
  }
  validate(e, r) {
    return r.isTwoDigitYear || r.year > 0;
  }
  set(e, r, n) {
    const l = e.getFullYear();
    if (n.isTwoDigitYear) {
      const s = zn(
        n.year,
        l
      );
      return e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const o = !("era" in r) || r.era === 1 ? n.year : 1 - n.year;
    return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Vm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 130);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    const l = (o) => ({
      year: o,
      isTwoDigitYear: r === "YY"
    });
    switch (r) {
      case "Y":
        return ie(oe(4, e), l);
      case "Yo":
        return ie(
          n.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return ie(oe(r.length, e), l);
    }
  }
  validate(e, r) {
    return r.isTwoDigitYear || r.year > 0;
  }
  set(e, r, n, l) {
    const o = aa(e, l);
    if (n.isTwoDigitYear) {
      const u = zn(
        n.year,
        o
      );
      return e.setFullYear(
        u,
        0,
        l.firstWeekContainsDate
      ), e.setHours(0, 0, 0, 0), Be(e, l);
    }
    const s = !("era" in r) || r.era === 1 ? n.year : 1 - n.year;
    return e.setFullYear(s, 0, l.firstWeekContainsDate), e.setHours(0, 0, 0, 0), Be(e, l);
  }
}
class jm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 130);
    W(this, "incompatibleTokens", [
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
  parse(e, r) {
    return pt(r === "R" ? 4 : r.length, e);
  }
  set(e, r, n) {
    const l = me(e, 0);
    return l.setFullYear(n, 0, 4), l.setHours(0, 0, 0, 0), je(l);
  }
}
class qm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 130);
    W(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, r) {
    return pt(r === "u" ? 4 : r.length, e);
  }
  set(e, r, n) {
    return e.setFullYear(n, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Hm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 120);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    switch (r) {
      case "Q":
      case "QQ":
        return oe(r.length, e);
      case "Qo":
        return n.ordinalNumber(e, { unit: "quarter" });
      case "QQQ":
        return n.quarter(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(e, {
          width: "wide",
          context: "formatting"
        }) || n.quarter(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(e, r) {
    return r >= 1 && r <= 4;
  }
  set(e, r, n) {
    return e.setMonth((n - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Wm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 120);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    switch (r) {
      case "q":
      case "qq":
        return oe(r.length, e);
      case "qo":
        return n.ordinalNumber(e, { unit: "quarter" });
      case "qqq":
        return n.quarter(e, {
          width: "abbreviated",
          context: "standalone"
        }) || n.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(e, {
          width: "wide",
          context: "standalone"
        }) || n.quarter(e, {
          width: "abbreviated",
          context: "standalone"
        }) || n.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(e, r) {
    return r >= 1 && r <= 4;
  }
  set(e, r, n) {
    return e.setMonth((n - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Ym extends ee {
  constructor() {
    super(...arguments);
    W(this, "incompatibleTokens", [
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
    W(this, "priority", 110);
  }
  parse(e, r, n) {
    const l = (o) => o - 1;
    switch (r) {
      case "M":
        return ie(
          le(se.month, e),
          l
        );
      case "MM":
        return ie(oe(2, e), l);
      case "Mo":
        return ie(
          n.ordinalNumber(e, {
            unit: "month"
          }),
          l
        );
      case "MMM":
        return n.month(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.month(e, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return n.month(e, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(e, { width: "wide", context: "formatting" }) || n.month(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.month(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 11;
  }
  set(e, r, n) {
    return e.setMonth(n, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class Qm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 110);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    const l = (o) => o - 1;
    switch (r) {
      case "L":
        return ie(
          le(se.month, e),
          l
        );
      case "LL":
        return ie(oe(2, e), l);
      case "Lo":
        return ie(
          n.ordinalNumber(e, {
            unit: "month"
          }),
          l
        );
      case "LLL":
        return n.month(e, {
          width: "abbreviated",
          context: "standalone"
        }) || n.month(e, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return n.month(e, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(e, { width: "wide", context: "standalone" }) || n.month(e, {
          width: "abbreviated",
          context: "standalone"
        }) || n.month(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 11;
  }
  set(e, r, n) {
    return e.setMonth(n, 1), e.setHours(0, 0, 0, 0), e;
  }
}
function Gm(a, t, e) {
  const r = ce(a, e == null ? void 0 : e.in), n = Hn(r, e) - t;
  return r.setDate(r.getDate() - n * 7), ce(r, e == null ? void 0 : e.in);
}
class Km extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 100);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    switch (r) {
      case "w":
        return le(se.week, e);
      case "wo":
        return n.ordinalNumber(e, { unit: "week" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    return r >= 1 && r <= 53;
  }
  set(e, r, n, l) {
    return Be(Gm(e, n, l), l);
  }
}
function zm(a, t, e) {
  const r = ce(a, e == null ? void 0 : e.in), n = qn(r, e) - t;
  return r.setDate(r.getDate() - n * 7), r;
}
class Xm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 100);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    switch (r) {
      case "I":
        return le(se.week, e);
      case "Io":
        return n.ordinalNumber(e, { unit: "week" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    return r >= 1 && r <= 53;
  }
  set(e, r, n) {
    return je(zm(e, n));
  }
}
const Um = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Zm = [
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
class Jm extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 90);
    W(this, "subPriority", 1);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    switch (r) {
      case "d":
        return le(se.date, e);
      case "do":
        return n.ordinalNumber(e, { unit: "date" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    const n = e.getFullYear(), l = Xn(n), o = e.getMonth();
    return l ? r >= 1 && r <= Zm[o] : r >= 1 && r <= Um[o];
  }
  set(e, r, n) {
    return e.setDate(n), e.setHours(0, 0, 0, 0), e;
  }
}
class ev extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 90);
    W(this, "subpriority", 1);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    switch (r) {
      case "D":
      case "DD":
        return le(se.dayOfYear, e);
      case "Do":
        return n.ordinalNumber(e, { unit: "date" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    const n = e.getFullYear();
    return Xn(n) ? r >= 1 && r <= 366 : r >= 1 && r <= 365;
  }
  set(e, r, n) {
    return e.setMonth(0, n), e.setHours(0, 0, 0, 0), e;
  }
}
function ra(a, t, e) {
  var h, D, I, _;
  const r = qe(), n = (e == null ? void 0 : e.weekStartsOn) ?? ((D = (h = e == null ? void 0 : e.locale) == null ? void 0 : h.options) == null ? void 0 : D.weekStartsOn) ?? r.weekStartsOn ?? ((_ = (I = r.locale) == null ? void 0 : I.options) == null ? void 0 : _.weekStartsOn) ?? 0, l = ce(a, e == null ? void 0 : e.in), o = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - n, p = t < 0 || t > 6 ? t - (o + d) % 7 : (u + d) % 7 - (o + d) % 7;
  return Rn(l, p, e);
}
class tv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 90);
    W(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.day(e, { width: "short", context: "formatting" }) || n.day(e, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return n.day(e, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(e, { width: "short", context: "formatting" }) || n.day(e, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return n.day(e, { width: "wide", context: "formatting" }) || n.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.day(e, { width: "short", context: "formatting" }) || n.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 6;
  }
  set(e, r, n, l) {
    return e = ra(e, n, l), e.setHours(0, 0, 0, 0), e;
  }
}
class av extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 90);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n, l) {
    const o = (s) => {
      const u = Math.floor((s - 1) / 7) * 7;
      return (s + l.weekStartsOn + 6) % 7 + u;
    };
    switch (r) {
      case "e":
      case "ee":
        return ie(oe(r.length, e), o);
      case "eo":
        return ie(
          n.ordinalNumber(e, {
            unit: "day"
          }),
          o
        );
      case "eee":
        return n.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.day(e, { width: "short", context: "formatting" }) || n.day(e, { width: "narrow", context: "formatting" });
      case "eeeee":
        return n.day(e, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(e, { width: "short", context: "formatting" }) || n.day(e, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return n.day(e, { width: "wide", context: "formatting" }) || n.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.day(e, { width: "short", context: "formatting" }) || n.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 6;
  }
  set(e, r, n, l) {
    return e = ra(e, n, l), e.setHours(0, 0, 0, 0), e;
  }
}
class nv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 90);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n, l) {
    const o = (s) => {
      const u = Math.floor((s - 1) / 7) * 7;
      return (s + l.weekStartsOn + 6) % 7 + u;
    };
    switch (r) {
      case "c":
      case "cc":
        return ie(oe(r.length, e), o);
      case "co":
        return ie(
          n.ordinalNumber(e, {
            unit: "day"
          }),
          o
        );
      case "ccc":
        return n.day(e, {
          width: "abbreviated",
          context: "standalone"
        }) || n.day(e, { width: "short", context: "standalone" }) || n.day(e, { width: "narrow", context: "standalone" });
      case "ccccc":
        return n.day(e, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(e, { width: "short", context: "standalone" }) || n.day(e, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return n.day(e, { width: "wide", context: "standalone" }) || n.day(e, {
          width: "abbreviated",
          context: "standalone"
        }) || n.day(e, { width: "short", context: "standalone" }) || n.day(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 6;
  }
  set(e, r, n, l) {
    return e = ra(e, n, l), e.setHours(0, 0, 0, 0), e;
  }
}
function rv(a, t, e) {
  const r = ce(a, e == null ? void 0 : e.in), n = Lm(r, e), l = t - n;
  return Rn(r, l, e);
}
class lv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 90);
    W(this, "incompatibleTokens", [
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
  parse(e, r, n) {
    const l = (o) => o === 0 ? 7 : o;
    switch (r) {
      case "i":
      case "ii":
        return oe(r.length, e);
      case "io":
        return n.ordinalNumber(e, { unit: "day" });
      case "iii":
        return ie(
          n.day(e, {
            width: "abbreviated",
            context: "formatting"
          }) || n.day(e, {
            width: "short",
            context: "formatting"
          }) || n.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiii":
        return ie(
          n.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiiii":
        return ie(
          n.day(e, {
            width: "short",
            context: "formatting"
          }) || n.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiii":
      default:
        return ie(
          n.day(e, {
            width: "wide",
            context: "formatting"
          }) || n.day(e, {
            width: "abbreviated",
            context: "formatting"
          }) || n.day(e, {
            width: "short",
            context: "formatting"
          }) || n.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
    }
  }
  validate(e, r) {
    return r >= 1 && r <= 7;
  }
  set(e, r, n) {
    return e = rv(e, n), e.setHours(0, 0, 0, 0), e;
  }
}
class ov extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 80);
    W(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "a":
      case "aa":
      case "aaa":
        return n.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, r, n) {
    return e.setHours(na(n), 0, 0, 0), e;
  }
}
class sv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 80);
    W(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "b":
      case "bb":
      case "bbb":
        return n.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, r, n) {
    return e.setHours(na(n), 0, 0, 0), e;
  }
}
class iv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 80);
    W(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || n.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, r, n) {
    return e.setHours(na(n), 0, 0, 0), e;
  }
}
class uv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 70);
    W(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "h":
        return le(se.hour12h, e);
      case "ho":
        return n.ordinalNumber(e, { unit: "hour" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    return r >= 1 && r <= 12;
  }
  set(e, r, n) {
    const l = e.getHours() >= 12;
    return l && n < 12 ? e.setHours(n + 12, 0, 0, 0) : !l && n === 12 ? e.setHours(0, 0, 0, 0) : e.setHours(n, 0, 0, 0), e;
  }
}
class dv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 70);
    W(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "H":
        return le(se.hour23h, e);
      case "Ho":
        return n.ordinalNumber(e, { unit: "hour" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 23;
  }
  set(e, r, n) {
    return e.setHours(n, 0, 0, 0), e;
  }
}
class cv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 70);
    W(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "K":
        return le(se.hour11h, e);
      case "Ko":
        return n.ordinalNumber(e, { unit: "hour" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 11;
  }
  set(e, r, n) {
    return e.getHours() >= 12 && n < 12 ? e.setHours(n + 12, 0, 0, 0) : e.setHours(n, 0, 0, 0), e;
  }
}
class fv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 70);
    W(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "k":
        return le(se.hour24h, e);
      case "ko":
        return n.ordinalNumber(e, { unit: "hour" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    return r >= 1 && r <= 24;
  }
  set(e, r, n) {
    const l = n <= 24 ? n % 24 : n;
    return e.setHours(l, 0, 0, 0), e;
  }
}
class pv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 60);
    W(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "m":
        return le(se.minute, e);
      case "mo":
        return n.ordinalNumber(e, { unit: "minute" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 59;
  }
  set(e, r, n) {
    return e.setMinutes(n, 0, 0), e;
  }
}
class mv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 50);
    W(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, r, n) {
    switch (r) {
      case "s":
        return le(se.second, e);
      case "so":
        return n.ordinalNumber(e, { unit: "second" });
      default:
        return oe(r.length, e);
    }
  }
  validate(e, r) {
    return r >= 0 && r <= 59;
  }
  set(e, r, n) {
    return e.setSeconds(n, 0), e;
  }
}
class vv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 30);
    W(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, r) {
    const n = (l) => Math.trunc(l * Math.pow(10, -r.length + 3));
    return ie(oe(r.length, e), n);
  }
  set(e, r, n) {
    return e.setMilliseconds(n), e;
  }
}
class hv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 10);
    W(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(e, r) {
    switch (r) {
      case "X":
        return De(
          _e.basicOptionalMinutes,
          e
        );
      case "XX":
        return De(_e.basic, e);
      case "XXXX":
        return De(
          _e.basicOptionalSeconds,
          e
        );
      case "XXXXX":
        return De(
          _e.extendedOptionalSeconds,
          e
        );
      case "XXX":
      default:
        return De(_e.extended, e);
    }
  }
  set(e, r, n) {
    return r.timestampIsSet ? e : me(
      e,
      e.getTime() - ft(e) - n
    );
  }
}
class bv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 10);
    W(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(e, r) {
    switch (r) {
      case "x":
        return De(
          _e.basicOptionalMinutes,
          e
        );
      case "xx":
        return De(_e.basic, e);
      case "xxxx":
        return De(
          _e.basicOptionalSeconds,
          e
        );
      case "xxxxx":
        return De(
          _e.extendedOptionalSeconds,
          e
        );
      case "xxx":
      default:
        return De(_e.extended, e);
    }
  }
  set(e, r, n) {
    return r.timestampIsSet ? e : me(
      e,
      e.getTime() - ft(e) - n
    );
  }
}
class gv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 40);
    W(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Kn(e);
  }
  set(e, r, n) {
    return [me(e, n * 1e3), { timestampIsSet: !0 }];
  }
}
class yv extends ee {
  constructor() {
    super(...arguments);
    W(this, "priority", 20);
    W(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Kn(e);
  }
  set(e, r, n) {
    return [me(e, n), { timestampIsSet: !0 }];
  }
}
const kv = {
  G: new Nm(),
  y: new Rm(),
  Y: new Vm(),
  R: new jm(),
  u: new qm(),
  Q: new Hm(),
  q: new Wm(),
  M: new Ym(),
  L: new Qm(),
  w: new Km(),
  I: new Xm(),
  d: new Jm(),
  D: new ev(),
  E: new tv(),
  e: new av(),
  c: new nv(),
  i: new lv(),
  a: new ov(),
  b: new sv(),
  B: new iv(),
  h: new uv(),
  H: new dv(),
  K: new cv(),
  k: new fv(),
  m: new pv(),
  s: new mv(),
  S: new vv(),
  X: new hv(),
  x: new bv(),
  t: new gv(),
  T: new yv()
}, wv = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, _v = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Dv = /^'([^]*?)'?$/, xv = /''/g, Tv = /\S/, Iv = /[a-zA-Z]/;
function Va(a, t, e, r) {
  var m, B, M, L;
  const n = () => me(e, NaN), l = Pm(), o = l.locale ?? jn, s = l.firstWeekContainsDate ?? ((B = (m = l.locale) == null ? void 0 : m.options) == null ? void 0 : B.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((L = (M = l.locale) == null ? void 0 : M.options) == null ? void 0 : L.weekStartsOn) ?? 0;
  if (!t)
    return a ? n() : ce(e, r == null ? void 0 : r.in);
  const d = {
    firstWeekContainsDate: s,
    weekStartsOn: u,
    locale: o
  }, p = [new Sm(r == null ? void 0 : r.in, e)], h = t.match(_v).map((g) => {
    const k = g[0];
    if (k in St) {
      const v = St[k];
      return v(g, o.formatLong);
    }
    return g;
  }).join("").match(wv), D = [];
  for (let g of h) {
    Qn(g) && Nt(g, t, a), Yn(g) && Nt(g, t, a);
    const k = g[0], v = kv[k];
    if (v) {
      const { incompatibleTokens: E } = v;
      if (Array.isArray(E)) {
        const G = D.find(
          (x) => E.includes(x.token) || x.token === k
        );
        if (G)
          throw new RangeError(
            `The format string mustn't contain \`${G.fullToken}\` and \`${g}\` at the same time`
          );
      } else if (v.incompatibleTokens === "*" && D.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${g}\` and any other token at the same time`
        );
      D.push({ token: k, fullToken: g });
      const w = v.run(
        a,
        g,
        o.match,
        d
      );
      if (!w)
        return n();
      p.push(w.setter), a = w.rest;
    } else {
      if (k.match(Iv))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + k + "`"
        );
      if (g === "''" ? g = "'" : k === "'" && (g = Mv(g)), a.indexOf(g) === 0)
        a = a.slice(g.length);
      else
        return n();
    }
  }
  if (a.length > 0 && Tv.test(a))
    return n();
  const I = p.map((g) => g.priority).sort((g, k) => k - g).filter((g, k, v) => v.indexOf(g) === k).map(
    (g) => p.filter((k) => k.priority === g).sort((k, v) => v.subPriority - k.subPriority)
  ).map((g) => g[0]);
  let _ = ce(e, r == null ? void 0 : r.in);
  if (isNaN(+_)) return n();
  const P = {};
  for (const g of I) {
    if (!g.validate(_, d))
      return n();
    const k = g.set(_, P, d);
    Array.isArray(k) ? (_ = k[0], Object.assign(P, k[1])) : _ = k;
  }
  return _;
}
function Mv(a) {
  return a.match(Dv)[1].replace(xv, "'");
}
const Ev = {
  dsfrDecodeDate: function(a, t) {
    if (typeof a != "string" || a === "" || /^\d{4}-\d{2}-\d{2}$/.test(a))
      return a;
    const r = Va(a, t, /* @__PURE__ */ new Date());
    return Ra(r, "yyyy-MM-dd");
  },
  dsfrDecodeDateTime: function(a, t) {
    if (a === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(a))
      return a;
    const r = Va(a, t, /* @__PURE__ */ new Date());
    return Ra(r, "yyyy-MM-dd'T'HH:mm");
  },
  _searchAndFilterList: function(a, t, e, r, n) {
    let l = this.$data.vueData[a];
    if (r && (l = l.filter(r)), n != null && n.trim() !== "") {
      const o = this.unaccentLower(n);
      l = l.filter((s) => this.unaccentLower(s[e].toString()).indexOf(o) > -1);
    }
    return l;
  },
  dsfrTransformListForSelection: function(a, t, e, r, n, l) {
    let s = this._searchAndFilterList(a, t, e, n, l).map(function(u) {
      return { value: u[t], text: u[e].toString() };
    });
    return r != null && r !== "" && s.unshift({ value: "", text: r }), s;
  },
  dsfrTransformListForRadio: function(a, t, e, r, n, l, o) {
    return this._searchAndFilterList(a, t, e, l, o).map(function(u) {
      return {
        value: u[t],
        label: u[e].toString(),
        hint: u[n],
        disabled: u[r]
      };
    });
  },
  dsfrTransformListForCheckbox: function(a, t, e, r, n, l, o, s) {
    return this._searchAndFilterList(a, t, e, o, s).map(function(d) {
      return {
        value: d[t],
        label: d[e].toString(),
        name: l,
        hint: d[n],
        disabled: d[r]
      };
    });
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var a, t;
    (t = (a = this.componentStates) == null ? void 0 : a.dsfrHeader) == null || t.navItems.filter((e) => e.title).forEach((e) => {
      e.active = e.links.some((r) => window.location.pathname.startsWith(r.to));
    });
  }
}, Cv = ["href", "aria-current"], Bv = {
  __name: "RouterLink",
  props: ["to"],
  setup(a) {
    const t = a, e = t.to === "/" ? window.location.pathname === t.to : window.location.pathname.startsWith(t.to);
    return (r, n) => (i(), f("a", {
      href: t.to,
      "aria-current": F(e) ? "page" : void 0
    }, [
      A(r.$slots, "default")
    ], 8, Cv));
  }
}, Le = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [r, n] of t)
    e[r] = n;
  return e;
}, Pv = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Ut, DsfrTag: ta, DsfrButton: tt },
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
}, Lv = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, Av = { class: "fr-mb-1w fr-text--md" }, Ov = { key: 0 }, $v = { class: "facet" }, Fv = { class: "flex justify-between w-full fr-mb-0" }, Sv = { class: "facet--count" }, Nv = { key: 1 }, Rv = { class: "flex justify-between w-full" }, Vv = { class: "facet--count" }, jv = { key: 0 }, qv = { class: "facet" }, Hv = { class: "flex justify-between w-full fr-mb-0" }, Wv = { class: "facet--count" }, Yv = { key: 1 }, Qv = { class: "flex justify-between w-full" }, Gv = { class: "facet--count" }, Kv = { class: "fr-mb-2w" };
function zv(a, t, e, r, n, l) {
  const o = he("DsfrTag"), s = he("DsfrCheckbox"), u = he("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", Lv, [
      (i(!0), f(Y, null, z(e.selectedFacets, (d, p) => (i(), f(Y, { key: p }, [
        l.facetMultipleByCode(p) ? y("", !0) : (i(!0), f(Y, { key: 0 }, z(d, (h) => (i(), N(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: h.code,
          onClick: (D) => a.$emit("toogle-facet", p, h, e.contextKey)
        }, {
          default: K(() => [
            R(b(l.facetLabelByCode(p)) + ": " + b(l.facetValueLabelByCode(p, h)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : y("", !0),
    (i(!0), f(Y, null, z(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(Y, { key: 0 }, [
        c("h6", Av, b(d.label), 1),
        c("ul", null, [
          (i(!0), f(Y, null, z(l.selectedInvisibleFacets(d.code), (p) => (i(), f(Y, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", Ov, [
              c("div", $v, [
                U(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (h) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: K(() => [
                    c("p", Fv, [
                      R(b(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", Sv, b(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", Nv, [
              U(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (h) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: K(() => [
                  c("span", Rv, [
                    R(b(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", Vv, b(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(Y, null, z(l.visibleFacets(d.code, d.values), (p) => (i(), f(Y, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", jv, [
              c("div", qv, [
                U(s, {
                  small: "",
                  modelValue: l.isFacetValueSelected(d.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (h) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
                }, {
                  label: K(() => [
                    c("p", Hv, [
                      R(b(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", Wv, b(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", Yv, [
              U(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (h) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                default: K(() => [
                  c("span", Qv, [
                    R(b(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", Gv, b(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", Kv, [
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), N(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: K(() => [
              R(b(a.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : y("", !0),
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), N(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: K(() => [
              R(b(a.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : y("", !0)
        ])
      ], 64)) : y("", !0)
    ]))), 128))
  ]);
}
const Xv = /* @__PURE__ */ Le(Pv, [["render", zv], ["__scopeId", "data-v-0be4e596"]]), la = () => {
  const a = j(), t = j(!1), e = j(!1), r = () => {
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
        t.value = !0, r(), window.requestAnimationFrame(() => {
          e.value = o;
        });
      }));
    },
    adjust: r,
    onTransitionEnd: (o) => {
      t.value = !1, a.value && o === !1 && a.value.style.removeProperty("--collapse-max-height");
    }
  };
}, Uv = "abcdefghijklmnopqrstuvwyz0123456789", ja = Uv.repeat(10), Zv = () => {
  const a = Math.floor(Math.random() * ja.length);
  return ja[a];
}, Jv = (a) => Array.from({ length: a }).map(Zv).join(""), Se = (a = "", t = "") => (a ? `${a}-` : "") + Jv(5) + (t ? `-${t}` : ""), eh = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], th = ["id", "aria-labelledby", "onKeydown"], ah = {
  class: "fr-menu__list",
  role: "none"
}, nh = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Se("menu") },
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 },
    tertiary: { type: Boolean, default: !1 }
  },
  setup(a, { expose: t }) {
    const {
      collapse: e,
      collapsing: r,
      cssExpanded: n,
      doExpand: l,
      onTransitionEnd: o
    } = la(), s = a, u = j(null), d = j(!1);
    let p = j(0), h = [];
    Ce("menuItem", { menuItemIndex: p, addMenuItem: (g, k) => {
      p.value += 1, h.push(`${g}@${k}`);
    } }), Ce("id", s.id), ue(d, (g, k) => {
      g !== k && (l(g), g ? (setTimeout(() => P(), 100), document.addEventListener("click", M), document.addEventListener("touchstart", M)) : (document.removeEventListener("click", M), document.removeEventListener("touchstart", M)));
    });
    const I = (g, k) => {
      const v = k === "down" ? (g + 1) % h.length : (g - 1 + h.length) % h.length, E = document.getElementById(`${s.id}_item_${v}`);
      return E.ariaDisabled === "true" ? I(v, k) : E;
    }, _ = (g) => {
      const k = document.activeElement.id, v = k.startsWith(`${s.id}_item_`) ? Number(k.split("_")[2]) : g === "down" ? -1 : 0;
      I(v, g).focus();
    }, P = (g) => _("down"), m = (g) => _("up");
    let B = (g) => {
      let k = g.key;
      if (k.length > 1 && k.match(/\S/))
        return;
      k = k.toLowerCase();
      let v = h.filter((w) => w.toLowerCase().startsWith(k)), E = document.activeElement.id;
      for (let w of v) {
        let G = w.split("@")[1], x = document.getElementById(`${s.id}_item_${G}`);
        if (E !== x.id) {
          x.focus();
          break;
        }
      }
    }, M = (g) => {
      u.value.contains(g.target) || (d.value = !1);
    };
    function L() {
      d.value = !1;
    }
    return t({ closeMenu: L }), (g, k) => (i(), f("div", {
      class: "relative-position",
      onKeydown: k[9] || (k[9] = Z(
        //@ts-ignore
        (...v) => F(M) && F(M)(...v),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", H({
        id: g.id,
        onClick: k[0] || (k[0] = X((v) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          k[1] || (k[1] = Z(X((v) => d.value = !1, ["stop"]), ["esc"])),
          k[2] || (k[2] = Z(X((v) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Z(X(P, ["prevent"]), ["down"]),
          Z(X(m, ["prevent"]), ["up"]),
          k[3] || (k[3] = //@ts-ignore
          (...v) => F(B) && F(B)(...v)),
          k[4] || (k[4] = Z((v) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          "fr-btn--secondary": g.secondary,
          "fr-btn--tertiary": g.tertiary
        }],
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": g.disabled,
        "aria-controls": `${g.id}_menu`,
        "aria-expanded": d.value
      }, g.$attrs), [
        g.icon !== "" ? (i(), N(F(de), {
          key: 0,
          class: "fr-mr-2v",
          name: g.icon
        }, null, 8, ["name"])) : y("", !0),
        c("span", null, b(g.label), 1)
      ], 16, eh),
      c("div", {
        id: `${g.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: S(["fr-collapse fr-menu", { "fr-collapse--expanded": F(n), "fr-collapsing": F(r) }]),
        role: "menu",
        "aria-labelledby": g.id,
        onKeyup: k[5] || (k[5] = Z((v) => d.value = !1, ["esc"])),
        onKeydown: [
          k[6] || (k[6] = Z((v) => d.value = !1, ["tab"])),
          Z(X(P, ["prevent"]), ["down"]),
          Z(X(m, ["prevent"]), ["up"]),
          k[7] || (k[7] = //@ts-ignore
          (...v) => F(B) && F(B)(...v))
        ],
        onTransitionend: k[8] || (k[8] = (v) => F(o)(d.value))
      }, [
        c("ul", ah, [
          A(g.$slots, "default", {}, void 0, !0)
        ])
      ], 42, th)
    ], 544));
  }
}), rh = /* @__PURE__ */ Le(nh, [["__scopeId", "data-v-089ea365"]]), lh = { role: "none" }, oh = ["id", "href"], sh = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(a) {
    const t = a, { menuItemIndex: e, addMenuItem: r } = Ve("menuItem"), n = T(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), l = `fr-btn fr-btn--secondary fr-nav__link ${n ? t.icon : ""} fr-btn--icon-left`, o = Ve("id"), s = e.value;
    return r(t.label, s), (u, d) => {
      const p = he("dsfr-button"), h = he("v-icon");
      return i(), f("li", lh, [
        u.url === "" ? (i(), N(p, H({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${F(o)}_item_${F(s)}`,
          icon: u.icon,
          secondary: "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", H({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${F(o)}_item_${F(s)}`,
          href: u.url,
          class: l
        }, u.$attrs), [
          n.value ? y("", !0) : (i(), N(h, {
            key: 0,
            name: u.icon
          }, null, 8, ["name"])),
          R(" " + b(u.label), 1)
        ], 16, oh))
      ]);
    };
  }
}), ih = /* @__PURE__ */ Le(sh, [["__scopeId", "data-v-ca9ed6c2"]]), uh = ["for", "id"], dh = {
  key: 0,
  class: "required"
}, ch = {
  key: 0,
  class: "fr-hint-text"
}, fh = ["id", "onKeydown", "aria-labelledby", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], ph = ["id", "onKeydown"], mh = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, vh = ["id"], hh = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, bh = ["id"], gh = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, yh = {
  key: 0,
  class: "fr-hint-text"
}, kh = {
  role: "listbox",
  "aria-multiselectable": "true",
  class: "fr-select__ul"
}, wh = ["aria-selected"], _h = ["id", "data-id", "value"], Dh = ["for"], xh = ["id"], Th = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ Ee({
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
      cssExpanded: r,
      doExpand: n,
      onTransitionEnd: l
    } = la(), o = a, s = j(!1), u = be(a, "modelValue"), d = j(o.options);
    ue(s, ($, V) => {
      $ !== V && (n($), $ ? (document.addEventListener("click", q), document.addEventListener("touchstart", q)) : (document.removeEventListener("click", q), document.removeEventListener("touchstart", q)));
    });
    const p = j(null), h = j(null), D = j(null), I = T(() => o.errorMessage || o.successMessage), _ = T(() => o.errorMessage !== "" ? "error" : "valid"), P = T(() => o.modelValue.length === d.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), m = T(() => o.modelValue.length === d.value.length ? "Tout déselectionner" : "Tout sélectionner"), B = T(() => {
      let $ = `${o.modelValue.length} options séléctionnées`;
      return o.modelValue.length > 2 ? $ : o.options.filter((V) => o.modelValue.includes(V.value)).map((V) => V.text).join(", ");
    });
    let M = function() {
      if (o.modelValue.length >= d.value.length)
        o.modelValue.length = 0;
      else
        for (let $ of d.value)
          o.modelValue.push($.value);
    }, L = function($) {
      const V = $.target.value.toLowerCase();
      d.value = o.options.filter((Q) => Q.text.toLowerCase().indexOf(V) > -1);
    };
    const g = ($, V) => {
      const Q = V === "down" ? ($ + 1) % d.value.length : ($ - 1 + d.value.length) % d.value.length, J = document.getElementById(`${o.id}_option_${Q}`);
      return J.ariaDisabled === "true" ? g(Q, V) : J;
    }, k = ($) => {
      const V = document.activeElement.id, Q = V.startsWith(`${o.id}_option_`) ? Number(V.split("_")[2]) : $ === "down" ? -1 : 0;
      g(Q, $).focus();
    }, v = ($) => k("down"), E = ($) => k("up");
    let w = function($) {
      $.shiftKey || (o.comboHasButton ? s.value || (s.value = !0, $.preventDefault(), setTimeout(() => h.value.focus(), 100)) : o.comboHasFilter && (s.value || (s.value = !0, $.preventDefault(), setTimeout(() => D.value.focus(), 100))));
    }, G = function($) {
      $.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.id}_button` || o.comboHasFilter && document.activeElement.id === `${o.id}_filter`) && ($.preventDefault(), s.value = !1), !o.comboHasFilter && !o.comboHasButton && (s.value = !1));
    }, x = function($) {
      document.activeElement.id.startsWith(`${o.id}_option_`) && (o.comboHasFilter ? ($.preventDefault(), D.value.focus()) : o.comboHasButton && h.value.focus());
    }, C = ($) => {
      let V = $.key;
      if (V.length > 1 && V.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      V = V.toLowerCase();
      let Q = d.value.filter((ne) => ne.text.toLowerCase().startsWith(V)), J = document.activeElement.id;
      for (let ne of Q) {
        let re = document.querySelector(`[data-id='${ne.value}']`);
        if (J !== re.id) {
          re.focus();
          break;
        }
      }
    }, q = ($) => {
      p.value.contains($.target) || (s.value = !1);
    };
    return ($, V) => (i(), f(Y, null, [
      c("div", H({
        ref_key: "container",
        ref: p,
        class: ["fr-select-group", { [`fr-select-group--${_.value}`]: I.value !== "" }],
        onKeyup: V[13] || (V[13] = Z(
          //@ts-ignore
          (...Q) => F(q) && F(q)(...Q),
          ["tab"]
        ))
      }, $.$attrs), [
        c("label", {
          class: "fr-label",
          for: $.id,
          id: `${$.id}_label`
        }, [
          A($.$slots, "label", {}, () => [
            R(b($.label) + " ", 1),
            A($.$slots, "required-tip", {}, () => [
              $.required ? (i(), f("span", dh, " *")) : y("", !0)
            ], !0)
          ], !0),
          $.description ? (i(), f("span", ch, b($.description), 1)) : y("", !0)
        ], 8, uh),
        c("div", {
          id: $.id,
          class: S([{ [`fr-select--${_.value}`]: I.value !== "" }, "fr-input"]),
          onClick: V[0] || (V[0] = (Q) => s.value = !s.value),
          onKeydown: [
            V[1] || (V[1] = Z(X((Q) => s.value = !1, ["stop"]), ["esc"])),
            V[2] || (V[2] = Z(X((Q) => s.value = !s.value, ["prevent"]), ["space"])),
            Z(X(v, ["prevent"]), ["down"]),
            Z(X(E, ["prevent"]), ["up"]),
            V[3] || (V[3] = Z(
              //@ts-ignore
              (...Q) => F(w) && F(w)(...Q),
              ["tab"]
            )),
            V[4] || (V[4] = //@ts-ignore
            (...Q) => F(C) && F(C)(...Q))
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
        }, [
          c("p", null, b(B.value), 1)
        ], 42, fh),
        c("div", {
          id: `${$.id}_list`,
          ref_key: "collapse",
          ref: t,
          class: S(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": F(r), "fr-collapsing": F(e) }]),
          onKeyup: V[8] || (V[8] = Z((Q) => s.value = !1, ["esc"])),
          onKeydown: [
            V[9] || (V[9] = Z(
              //@ts-ignore
              (...Q) => F(G) && F(G)(...Q),
              ["tab"]
            )),
            Z(X(v, ["prevent"]), ["down"]),
            Z(X(E, ["prevent"]), ["up"]),
            V[10] || (V[10] = Z(X(
              //@ts-ignore
              (...Q) => F(x) && F(x)(...Q),
              ["shift"]
            ), ["tab"])),
            V[11] || (V[11] = //@ts-ignore
            (...Q) => F(C) && F(C)(...Q))
          ],
          onTransitionend: V[12] || (V[12] = (Q) => F(l)(s.value))
        }, [
          $.comboHasButton ? (i(), f("ul", mh, [
            c("li", null, [
              c("button", {
                class: S(["fr-btn fr-btn--tertiary", `${P.value}`]),
                id: `${$.id}_button`,
                onClick: V[5] || (V[5] = (Q) => F(M)()),
                ref_key: "button",
                ref: h,
                type: "button"
              }, b(m.value), 11, vh)
            ])
          ])) : y("", !0),
          $.comboHasFilter ? (i(), f("div", hh, [
            c("input", {
              class: "fr-input",
              id: `${$.id}_filter`,
              ref_key: "filter",
              ref: D,
              onInput: V[6] || (V[6] = //@ts-ignore
              (...Q) => F(L) && F(L)(...Q)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, bh)
          ])) : y("", !0),
          $.comboLabel ? (i(), f("p", gh, [
            R(b($.comboLabel) + " ", 1),
            $.comboDescription ? (i(), f("span", yh, b($.comboDescription), 1)) : y("", !0)
          ])) : y("", !0),
          c("ul", kh, [
            (i(!0), f(Y, null, z(d.value, (Q, J) => (i(), f("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": u.value.includes(Q.value)
            }, [
              xe(c("input", {
                id: `${$.id}_option_${J}`,
                "data-id": Q.value,
                type: "checkbox",
                class: "",
                tabindex: "-1",
                value: Q.value,
                "onUpdate:modelValue": V[7] || (V[7] = (ne) => u.value = ne)
              }, null, 8, _h), [
                [Je, u.value]
              ]),
              c("label", {
                class: "fr-label",
                for: `${$.id}_option_${J}`
              }, b(Q.text), 9, Dh)
            ], 8, wh))), 256))
          ])
        ], 42, ph)
      ], 16),
      I.value ? (i(), f("p", {
        key: 0,
        id: `select-${_.value}-desc-${_.value}`,
        class: S(`fr-${_.value}-text`)
      }, b(I.value), 11, xh)) : y("", !0)
    ], 64));
  }
}), Ih = /* @__PURE__ */ Le(Th, [["__scopeId", "data-v-7e35aa8f"]]), Mh = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Eh = ["id", "aria-labelledby", "onKeydown"], Ch = {
  key: 0,
  class: "fr-label fr-mb-0"
}, Bh = {
  key: 0,
  class: "fr-hint-text"
}, Ph = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, Lh = {
  role: "none",
  class: "fr-p-2v"
}, Ah = ["id", "href"], Oh = /* @__PURE__ */ O({
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
      cssExpanded: r,
      doExpand: n,
      onTransitionEnd: l
    } = la(), o = a, s = j(null), u = j(!1);
    let d = j(0), p = [];
    const h = (M, L) => {
      d.value += 1, p.push(`${M}@${L}`);
    };
    Ce("menuItem", { menuItemIndex: d, addMenuItem: h }), Ce("id", o.id), ue(u, (M, L) => {
      M !== L && (n(M), M ? (setTimeout(() => _(), 100), document.addEventListener("click", B), document.addEventListener("touchstart", B)) : (document.removeEventListener("click", B), document.removeEventListener("touchstart", B)));
    }), fe(() => {
      h(o.logoutLabel, d.value);
    });
    const D = (M, L) => {
      const g = L === "down" ? (M + 1) % p.length : (M - 1 + p.length) % p.length, k = document.getElementById(`${o.id}_item_${g}`);
      return k.ariaDisabled === "true" ? D(g, L) : k;
    }, I = (M) => {
      const L = document.activeElement.id, g = L.startsWith(`${o.id}_item_`) ? Number(L.split("_")[2]) : M === "down" ? -1 : 0;
      D(g, M).focus();
    }, _ = (M) => I("down"), P = (M) => I("up");
    let m = (M) => {
      let L = M.key;
      if (L.length > 1 && L.match(/\S/))
        return;
      L = L.toLowerCase();
      let g = p.filter((v) => v.toLowerCase().startsWith(L)), k = document.activeElement.id;
      for (let v of g) {
        let E = v.split("@")[1], w = document.getElementById(`${o.id}_item_${E}`);
        if (k !== w.id) {
          w.focus();
          break;
        }
      }
    }, B = (M) => {
      s.value.contains(M.target) || (u.value = !1);
    };
    return (M, L) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: L[9] || (L[9] = Z(
        //@ts-ignore
        (...g) => F(B) && F(B)(...g),
        ["tab"]
      )),
      ref_key: "container",
      ref: s
    }, [
      c("button", H({
        id: M.id,
        onClick: L[0] || (L[0] = X((g) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          L[1] || (L[1] = Z(X((g) => u.value = !1, ["stop"]), ["esc"])),
          L[2] || (L[2] = Z(X((g) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          Z(X(_, ["prevent"]), ["down"]),
          Z(X(P, ["prevent"]), ["up"]),
          L[3] || (L[3] = //@ts-ignore
          (...g) => F(m) && F(m)(...g)),
          L[4] || (L[4] = Z((g) => u.value = !1, ["tab"]))
        ],
        class: "fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm",
        "aria-haspopup": "menu",
        "aria-autocomplete": "none",
        "aria-disabled": M.disabled,
        "aria-controls": `${M.id}_menu`,
        "aria-expanded": u.value
      }, M.$attrs), [
        M.icon !== "" ? (i(), N(F(de), {
          key: 0,
          class: "fr-mr-2v",
          name: M.icon
        }, null, 8, ["name"])) : y("", !0),
        c("span", null, b(M.label), 1)
      ], 16, Mh),
      c("div", {
        id: `${M.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: S(["fr-collapse fr-menu fr-menu-header__modal fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": F(r), "fr-collapsing": F(e) }]),
        role: "menu",
        "aria-labelledby": M.id,
        onKeyup: L[5] || (L[5] = Z((g) => u.value = !1, ["esc"])),
        onKeydown: [
          L[6] || (L[6] = Z((g) => u.value = !1, ["tab"])),
          Z(X(_, ["prevent"]), ["down"]),
          Z(X(P, ["prevent"]), ["up"]),
          L[7] || (L[7] = //@ts-ignore
          (...g) => F(m) && F(m)(...g))
        ],
        onTransitionend: L[8] || (L[8] = (g) => F(l)(u.value))
      }, [
        A(M.$slots, "detail", {}, () => [
          M.nom === "" && M.email === "" ? y("", !0) : (i(), f("p", Ch, [
            R(b(M.nom) + " ", 1),
            M.email !== "" ? (i(), f("span", Bh, b(M.email), 1)) : y("", !0)
          ]))
        ], !0),
        c("ul", Ph, [
          A(M.$slots, "default", {}, void 0, !0),
          c("li", Lh, [
            M.logoutUrl !== "" ? (i(), f("a", {
              key: 0,
              id: `${M.id}_item_${F(d) - 1}`,
              class: "fr-btn w-full fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
              role: "menuitem",
              tabindex: "-1",
              href: M.logoutUrl
            }, b(M.logoutLabel), 9, Ah)) : y("", !0)
          ])
        ])
      ], 42, Eh)
    ], 544));
  }
}), $h = /* @__PURE__ */ Le(Oh, [["__scopeId", "data-v-2c51eb4a"]]), Fh = Symbol("header"), Sh = ["aria-label"], Nh = { class: "fr-btns-group" }, Rt = /* @__PURE__ */ O({
  __name: "DsfrCustomHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(a, { emit: t }) {
    const e = t;
    return (r, n) => (i(), f("nav", {
      role: "navigation",
      "aria-label": r.navAriaLabel
    }, [
      c("ul", Nh, [
        (i(!0), f(Y, null, z(r.links, (l, o) => (i(), f("li", { key: o }, [
          U(F(ea), H({ ref_for: !0 }, l, {
            "on-click": (s) => {
              var u;
              e("linkClick", s), (u = l.onClick) == null || u.call(l, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        A(r.$slots, "default")
      ])
    ], 8, Sh));
  }
}), Rh = {
  role: "banner",
  class: "fr-header"
}, Vh = { class: "fr-header__body" }, jh = { class: "fr-container width-inherit" }, qh = { class: "fr-header__body-row" }, Hh = { class: "fr-header__brand fr-enlarge-link" }, Wh = { class: "fr-header__brand-top" }, Yh = { class: "fr-header__logo" }, Qh = {
  key: 0,
  class: "fr-header__operator"
}, Gh = ["src", "alt"], Kh = {
  key: 1,
  class: "fr-header__navbar"
}, zh = ["aria-label", "title", "data-fr-opened"], Xh = ["aria-label", "title"], Uh = {
  key: 0,
  class: "fr-header__service"
}, Zh = { class: "fr-header__service-title" }, Jh = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, eb = {
  key: 0,
  class: "fr-header__service-tagline"
}, tb = {
  key: 1,
  class: "fr-header__service"
}, ab = { class: "fr-header__tools" }, nb = {
  key: 0,
  class: "fr-header__tools-links"
}, rb = { class: "fr-header__search fr-modal" }, lb = ["aria-label"], ob = { class: "fr-container" }, sb = { class: "fr-header__menu-links" }, ib = {
  key: 1,
  class: "flex justify-center items-center"
}, ub = { class: "fr-header__menu fr-modal" }, db = {
  key: 0,
  class: "fr-container"
}, cb = /* @__PURE__ */ O({
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
    const e = a, r = t, n = et(e, "languageSelector"), l = j(!1), o = j(!1), s = j(!1), u = () => {
      var m;
      s.value = !1, l.value = !1, o.value = !1, (m = document.getElementById("button-menu")) == null || m.focus();
    }, d = (m) => {
      m.key === "Escape" && u();
    };
    fe(() => {
      document.addEventListener("keydown", d), r("on-mounted");
    }), we(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var m;
      s.value = !0, l.value = !0, o.value = !1, (m = document.getElementById("close-button")) == null || m.focus();
    }, h = () => {
      s.value = !0, l.value = !1, o.value = !0;
    }, D = u, I = jt(), _ = T(() => {
      var m;
      return !!((m = I.operator) != null && m.call(I).length) || !!e.operatorImgSrc;
    }), P = T(() => !!I.mainnav);
    return Ce(Fh, () => u), (m, B) => {
      var L, g, k;
      const M = he("RouterLink");
      return i(), f("header", Rh, [
        c("div", Vh, [
          c("div", jh, [
            c("div", qh, [
              c("div", Hh, [
                c("div", Wh, [
                  c("div", Yh, [
                    U(M, {
                      to: m.homeTo,
                      title: `${m.homeLabel} - ${m.serviceTitle}`
                    }, {
                      default: K(() => [
                        U(F(Xe), {
                          "logo-text": m.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  _.value ? (i(), f("div", Qh, [
                    A(m.$slots, "operator", {}, () => [
                      m.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: m.operatorImgSrc,
                        alt: m.operatorImgAlt,
                        style: ye(m.operatorImgStyle)
                      }, null, 12, Gh)) : y("", !0)
                    ])
                  ])) : y("", !0),
                  m.showSearch || P.value || (L = m.quickLinks) != null && L.length ? (i(), f("div", Kh, [
                    m.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": m.showSearchLabel,
                      title: m.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: B[0] || (B[0] = X((v) => h(), ["prevent", "stop"]))
                    }, null, 8, zh)) : y("", !0),
                    P.value || (g = m.quickLinks) != null && g.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": m.menuLabel,
                      title: m.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: B[1] || (B[1] = X((v) => p(), ["prevent", "stop"]))
                    }, null, 8, Xh)) : y("", !0)
                  ])) : y("", !0)
                ]),
                m.serviceTitle ? (i(), f("div", Uh, [
                  U(M, H({
                    to: m.homeTo,
                    title: `${m.homeLabel} - ${m.serviceTitle}`
                  }, m.$attrs), {
                    default: K(() => [
                      c("p", Zh, [
                        R(b(m.serviceTitle) + " ", 1),
                        m.showBeta ? (i(), f("span", Jh, " BETA ")) : y("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  m.serviceDescription ? (i(), f("p", eb, b(m.serviceDescription), 1)) : y("", !0)
                ])) : y("", !0),
                !m.serviceTitle && m.showBeta ? (i(), f("div", tb, B[9] || (B[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : y("", !0)
              ]),
              c("div", ab, [
                (k = m.quickLinks) != null && k.length || n.value ? (i(), f("div", nb, [
                  l.value ? y("", !0) : (i(), N(Rt, {
                    key: 0,
                    links: m.quickLinks,
                    "nav-aria-label": m.quickLinksAriaLabel
                  }, {
                    default: K(() => [
                      A(m.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  n.value ? (i(), N(F(Ue), H({ key: 1 }, n.value, {
                    onSelect: B[2] || (B[2] = (v) => r("language-select", v))
                  }), null, 16)) : y("", !0)
                ])) : y("", !0),
                c("div", rb, [
                  A(m.$slots, "header-search"),
                  m.showSearch ? (i(), N(F(Ze), {
                    key: 0,
                    "searchbar-id": m.searchbarId,
                    label: m.searchLabel,
                    "model-value": m.modelValue,
                    placeholder: m.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": B[3] || (B[3] = (v) => r("update:modelValue", v)),
                    onSearch: B[4] || (B[4] = (v) => r("search", v))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : y("", !0)
                ])
              ])
            ]),
            m.showSearch || P.value || m.quickLinks && m.quickLinks.length || n.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: S(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": m.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", ob, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: B[5] || (B[5] = X((v) => u(), ["prevent", "stop"]))
                }, b(m.closeMenuModalLabel), 1),
                c("div", sb, [
                  n.value ? (i(), N(F(Ue), H({ key: 0 }, n.value, {
                    onSelect: B[6] || (B[6] = (v) => n.value.currentLanguage = v.codeIso)
                  }), null, 16)) : y("", !0),
                  l.value ? (i(), N(Rt, {
                    key: 1,
                    role: "navigation",
                    links: m.quickLinks,
                    "nav-aria-label": m.quickLinksAriaLabel,
                    onLinkClick: F(D)
                  }, {
                    default: K(() => [
                      A(m.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : y("", !0),
                  A(m.$slots, "header-search")
                ]),
                s.value ? A(m.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : y("", !0),
                o.value ? (i(), f("div", ib, [
                  U(F(Ze), {
                    "searchbar-id": m.searchbarId,
                    "model-value": m.modelValue,
                    placeholder: m.placeholder,
                    "onUpdate:modelValue": B[7] || (B[7] = (v) => r("update:modelValue", v)),
                    onSearch: B[8] || (B[8] = (v) => r("search", v))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ], 10, lb)) : y("", !0),
            A(m.$slots, "default")
          ])
        ]),
        c("div", ub, [
          P.value && !s.value ? (i(), f("div", db, [
            A(m.$slots, "mainnav", { hidemodal: u })
          ])) : y("", !0)
        ])
      ]);
    };
  }
}), fb = { class: "fr-table" }, pb = { class: "fr-table__wrapper" }, mb = { class: "fr-table__container" }, vb = { class: "fr-table__content" }, hb = ["id"], bb = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, gb = { class: "fr-checkbox-group fr-checkbox-group--sm" }, yb = ["id", "checked"], kb = ["for"], wb = ["tabindex", "onClick", "onKeydown"], _b = { key: 0 }, Db = { key: 1 }, xb = ["data-row-key"], Tb = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Ib = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Mb = ["id", "value"], Eb = ["for"], Cb = ["onKeydown"], Bb = { class: "flex gap-2 items-center" }, Pb = ["selected"], Lb = ["value", "selected"], Ab = { class: "flex ml-1" }, Ob = { class: "self-center" }, $b = /* @__PURE__ */ O({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ Ee({
    id: { default: () => Se("table") },
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
  emits: /* @__PURE__ */ Ee(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: t }) {
    const e = a, r = t, n = be(a, "selection"), l = be(a, "rowsPerPage"), o = be(a, "currentPage"), s = T(() => Math.ceil(e.rows.length / l.value)), u = T(() => e.pages ?? Array.from({ length: s.value }).map((v, E) => ({
      label: `${E + 1}`,
      title: `Page ${E + 1}`,
      href: `#${E + 1}`
    }))), d = T(() => o.value * l.value), p = T(() => (o.value + 1) * l.value);
    function h(v, E) {
      const w = D.value;
      return (v[w] ?? v) < (E[w] ?? E) ? -1 : (v[w] ?? v) > (E[w] ?? E) ? 1 : 0;
    }
    const D = be(a, "sortedBy");
    D.value = e.sorted;
    const I = be(a, "sortedDesc");
    function _(v) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(v))) {
        if (D.value === v) {
          if (I.value) {
            D.value = void 0, I.value = !1;
            return;
          }
          I.value = !0;
          return;
        }
        I.value = !1, D.value = v;
      }
    }
    const P = T(() => {
      const v = D.value ? e.rows.slice().sort(e.sortFn ?? h) : e.rows.slice();
      return I.value && v.reverse(), v;
    }), m = T(() => {
      const v = e.headersRow.map((w) => typeof w != "object" ? w : w.key), E = P.value.map((w) => Array.isArray(w) ? w : v.map((G) => w));
      return e.pagination ? E.slice(d.value, p.value) : E;
    });
    function B(v) {
      if (v) {
        const E = e.headersRow.findIndex((w) => w.key ?? w);
        n.value = m.value.map((w) => w[E]);
      }
      n.value.length = 0;
    }
    const M = j(!1);
    function L() {
      M.value = n.value.length === m.value.length;
    }
    function g() {
      r("update:current-page", 0), M.value = !1, n.value.length = 0;
    }
    function k(v) {
      navigator.clipboard.writeText(v);
    }
    return (v, E) => (i(), f("div", fb, [
      c("div", pb, [
        c("div", mb, [
          c("div", vb, [
            c("table", { id: v.id }, [
              c("caption", {
                class: S({ "sr-only": v.noCaption })
              }, b(v.title), 3),
              c("thead", null, [
                c("tr", null, [
                  v.selectableRows ? (i(), f("th", bb, [
                    c("div", gb, [
                      c("input", {
                        id: `table-select--${v.id}-all`,
                        checked: M.value,
                        type: "checkbox",
                        onInput: E[0] || (E[0] = (w) => B(w.target.checked))
                      }, null, 40, yb),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${v.id}-all`
                      }, " Sélectionner tout ", 8, kb)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(Y, null, z(v.headersRow, (w, G) => (i(), f("th", H({
                    key: typeof w == "object" ? w.key : w,
                    scope: "col",
                    ref_for: !0
                  }, typeof w == "object" && w.headerAttrs, {
                    tabindex: v.sortableRows ? 0 : void 0,
                    onClick: (x) => _(w.key ?? (Array.isArray(v.rows[0]) ? G : w)),
                    onKeydown: [
                      Z((x) => _(w.key ?? w), ["enter"]),
                      Z((x) => _(w.key ?? w), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: S({ "sortable-header": v.sortableRows === !0 || Array.isArray(v.sortableRows) && v.sortableRows.includes(w.key ?? w) })
                    }, [
                      A(v.$slots, "header", H({ ref_for: !0 }, typeof w == "object" ? w : { key: w, label: w }), () => [
                        R(b(typeof w == "object" ? w.label : w), 1)
                      ], !0),
                      D.value !== (w.key ?? w) && (v.sortableRows === !0 || Array.isArray(v.sortableRows) && v.sortableRows.includes(w.key ?? w)) ? (i(), f("span", _b, [
                        U(F(de), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : D.value === (w.key ?? w) ? (i(), f("span", Db, [
                        U(F(de), {
                          name: I.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : y("", !0)
                    ], 2)
                  ], 16, wb))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(Y, null, z(m.value, (w, G) => (i(), f("tr", {
                  key: `row-${G}`,
                  "data-row-key": G + 1
                }, [
                  v.selectableRows ? (i(), f("th", Tb, [
                    c("div", Ib, [
                      xe(c("input", {
                        id: `row-select-${v.id}-${G}`,
                        "onUpdate:modelValue": E[1] || (E[1] = (x) => n.value = x),
                        value: v.rows[G][v.rowKey] ?? `row-${G}`,
                        type: "checkbox",
                        onChange: E[2] || (E[2] = (x) => L())
                      }, null, 40, Mb), [
                        [Je, n.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${v.id}-${G}`
                      }, " Sélectionner la ligne " + b(G + 1), 9, Eb)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(Y, null, z(w, (x, C) => (i(), f("td", {
                    key: typeof x == "object" ? x[v.rowKey] : x,
                    onKeydown: [
                      Z(X((q) => k(typeof x == "object" ? x[v.rowKey] : x), ["ctrl"]), ["c"]),
                      Z(X((q) => k(typeof x == "object" ? x[v.rowKey] : x), ["meta"]), ["c"])
                    ]
                  }, [
                    A(v.$slots, "cell", H({ ref_for: !0 }, {
                      colKey: typeof v.headersRow[C] == "object" ? v.headersRow[C].key : v.headersRow[C],
                      cell: x,
                      idx: G + 1
                    }), () => [
                      R(b(typeof x == "object" ? x[v.rowKey] : x), 1)
                    ], !0)
                  ], 40, Cb))), 128))
                ], 8, xb))), 128))
              ])
            ], 8, hb)
          ])
        ])
      ]),
      c("div", {
        class: S(v.bottomActionBarClass)
      }, [
        A(v.$slots, "pagination", {}, () => [
          v.pagination && !v.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: S(["flex justify-between items-center", v.paginationWrapperClass])
          }, [
            c("div", Bb, [
              E[6] || (E[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              xe(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": E[3] || (E[3] = (w) => l.value = w),
                class: "fr-select",
                onChange: E[4] || (E[4] = (w) => g())
              }, [
                c("option", {
                  value: "",
                  selected: !v.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Pb),
                (i(!0), f(Y, null, z(v.paginationOptions, (w, G) => (i(), f("option", {
                  key: G,
                  value: w,
                  selected: +w === l.value
                }, b(w), 9, Lb))), 128))
              ], 544), [
                [qt, l.value]
              ])
            ]),
            c("div", Ab, [
              c("span", Ob, "Page " + b(o.value + 1) + " sur " + b(s.value), 1)
            ]),
            U(F(Zt), {
              "current-page": o.value,
              "onUpdate:currentPage": E[5] || (E[5] = (w) => o.value = w),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : y("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Fb = /* @__PURE__ */ Le($b, [["__scopeId", "data-v-0bee5f91"]]), Sb = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], Nb = ["for"], Rb = {
  key: 0,
  class: "required"
}, Vb = {
  key: 0,
  class: "fr-hint-text"
}, jb = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, qb = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrCustomCheckbox",
  props: /* @__PURE__ */ Ee({
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
    const t = a, e = T(() => t.errorMessage || t.validMessage), r = T(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), n = be(a, "modelValue");
    return (l, o) => (i(), f("div", {
      class: S(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: S(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        xe(c("input", H({
          id: l.id,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => n.value = s),
          name: l.name,
          type: "checkbox",
          value: l.value,
          checked: n.value === !0 || Array.isArray(n.value) && n.value.includes(l.value),
          required: l.required
        }, l.$attrs, {
          "data-testid": `input-checkbox-${l.id}`,
          "data-test": `input-checkbox-${l.id}`
        }), null, 16, Sb), [
          [Je, n.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          A(l.$slots, "label", {}, () => [
            R(b(l.label) + " ", 1),
            A(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", Rb, " *")) : y("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", Vb, [
            A(l.$slots, "hint", {}, () => [
              R(b(l.hint), 1)
            ])
          ])) : y("", !0)
        ], 8, Nb),
        e.value ? (i(), f("div", jb, [
          c("p", {
            class: S(["fr-message--info flex items-center", r.value])
          }, b(e.value), 3)
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), Hb = ["id"], Wb = /* @__PURE__ */ O({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => Se("tooltip") },
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
    const t = a, e = j(!1), r = j(null), n = j(null), l = j("0px"), o = j("0px"), s = j("0px"), u = j(!1), d = j(0);
    async function p() {
      var Q, J, ne, re, Te, Ie;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((ke) => setTimeout(ke, 100));
      const k = (Q = r.value) == null ? void 0 : Q.getBoundingClientRect().top, v = (J = r.value) == null ? void 0 : J.offsetHeight, E = (ne = r.value) == null ? void 0 : ne.offsetWidth, w = (re = r.value) == null ? void 0 : re.getBoundingClientRect().left, G = (Te = n.value) == null ? void 0 : Te.offsetHeight, x = (Ie = n.value) == null ? void 0 : Ie.offsetWidth, q = !(k - G < 0) && k + v + G >= document.documentElement.offsetHeight;
      u.value = q;
      const $ = w + E >= document.documentElement.offsetWidth, V = w + E / 2 - x / 2 <= 0;
      o.value = q ? `${k - G + 8}px` : `${k + v - 8}px`, d.value = 1, l.value = $ ? `${w + E - x - 4}px` : V ? `${w + 4}px` : `${w + E / 2 - x / 2}px`, s.value = $ ? `${x / 2 - E / 2 + 4}px` : V ? `${-(x / 2) + E / 2 - 4}px` : "0px";
    }
    ue(e, p, { immediate: !0 }), fe(() => {
      window.addEventListener("scroll", p);
    }), we(() => {
      window.removeEventListener("scroll", p);
    });
    const h = T(() => ["sm", "small"].includes(t.size)), D = T(() => ["md", "medium"].includes(t.size)), I = T(() => ["lg", "large"].includes(t.size)), _ = T(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), P = T(() => `transform: translate(${l.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), m = T(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), B = (k) => {
      var v, E;
      e.value && (k.target === r.value || (v = r.value) != null && v.contains(k.target) || k.target === n.value || (E = n.value) != null && E.contains(k.target) || (e.value = !1));
    }, M = (k) => {
      k.key === "Escape" && (e.value = !1);
    };
    fe(() => {
      document.documentElement.addEventListener("click", B), document.documentElement.addEventListener("keydown", M);
    }), we(() => {
      document.documentElement.removeEventListener("click", B), document.documentElement.removeEventListener("keydown", M);
    });
    const L = () => {
      e.value = !0;
    }, g = () => {
      e.value = !1;
    };
    return (k, v) => (i(), f(Y, null, [
      (i(), N(pe(k.href !== "" ? "a" : "button"), H({
        id: `button-${k.id}`,
        ref_key: "source",
        ref: r,
        href: k.href !== "" ? k.href : void 0,
        class: {
          "fr-link": k.isLink && !k.inline,
          "fr-btn": !k.isLink,
          "fr-btn--secondary": k.secondary && !k.tertiary,
          "fr-btn--tertiary": k.tertiary && !k.secondary && !k.noOutline,
          "fr-btn--tertiary-no-outline": k.tertiary && !k.secondary && k.noOutline,
          "fr-btn--sm": h.value,
          "fr-btn--md": D.value,
          "fr-btn--lg": I.value,
          "fr-btn--icon-right": !k.isLink && !k.iconOnly && _.value && k.iconRight,
          "fr-btn--icon-left": !k.isLink && !k.iconOnly && _.value && !k.iconRight,
          "fr-link--icon-right": k.isLink && !k.inline && !k.iconOnly && _.value && k.iconRight,
          "fr-link--icon-left": k.isLink && !k.inline && !k.iconOnly && _.value && !k.iconRight,
          "inline-flex": !_.value,
          reverse: k.iconRight && !_.value,
          "fr-btn--custom-tooltip": k.iconOnly,
          "justify-center": !_.value && k.iconOnly,
          [k.icon]: _.value
        },
        "aria-labelledby": k.id,
        onMouseenter: v[0] || (v[0] = (E) => L()),
        onMouseleave: v[1] || (v[1] = (E) => g()),
        onFocus: v[2] || (v[2] = (E) => L()),
        onBlur: v[3] || (v[3] = (E) => g())
      }, k.$attrs), {
        default: K(() => [
          R(b(k.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-labelledby"])),
      c("p", {
        id: k.id,
        ref_key: "tooltip",
        ref: n,
        class: S(["fr-tooltip fr-placement", m.value]),
        style: ye(P.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        A(k.$slots, "default", {}, () => [
          R(b(k.content), 1)
        ], !0)
      ], 14, Hb)
    ], 64));
  }
}), Un = /* @__PURE__ */ Le(Wb, [["__scopeId", "data-v-95dd9f76"]]), Yb = /* @__PURE__ */ O({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (t, e) => (i(), N(Un, H({ "is-link": !1 }, t.$attrs), {
      default: K(() => [
        A(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Qb = /* @__PURE__ */ O({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (t, e) => (i(), N(Un, H({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: K(() => [
        A(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), Gb = ["id", "href", "aria-disabled"], Kb = /* @__PURE__ */ O({
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
    const t = a, e = T(() => ["sm", "small"].includes(t.size)), r = T(() => ["md", "medium"].includes(t.size)), n = T(() => ["lg", "large"].includes(t.size)), l = T(() => t.asButton ? "btn" : "link"), o = T(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-"));
    return (s, u) => (i(), f("a", H({
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
        [`fr-${l.value}--md`]: r.value,
        [`fr-${l.value}--lg`]: n.value,
        [`fr-${l.value}--icon-right`]: !s.iconOnly && o.value && s.iconRight,
        [`fr-${l.value}--icon-left`]: !s.iconOnly && o.value && !s.iconRight,
        "inline-flex": !o.value,
        reverse: s.iconRight && !o.value,
        "fr-btn--custom-tooltip": s.iconOnly,
        "justify-center": !o.value && s.iconOnly,
        [s.icon]: o.value
      }
    }, s.$attrs), [
      A(s.$slots, "default", {}, () => [
        R(b(s.label), 1)
      ], !0)
    ], 16, Gb));
  }
}), zb = /* @__PURE__ */ Le(Kb, [["__scopeId", "data-v-940896f7"]]);
var Xb = {
  install: function(a, t) {
    a.use(Ep), a.component("RouterLink", Bv), a.component("DsfrFacets", Xv), a.component("DsfrSelectMultiple", Ih), a.component("DsfrMenu", rh), a.component("DsfrMenuLink", ih), a.component("DsfrHeaderMenu", $h), a.component("DsfrCustomHeader", cb), a.component("DsfrCustomHeaderMenuLinks", Rt), a.component("DsfrCustomDataTable", Fb), a.component("DsfrCustomCheckbox", qb), a.component("DsfrButtonTooltip", Yb), a.component("DsfrLinkTooltip", Qb), a.component("DsfrLink", zb);
  },
  methods: Ev
};
window && (window.DSFR = Xb);
export {
  Xb as default
};
//# sourceMappingURL=dsfr.es.js.map
