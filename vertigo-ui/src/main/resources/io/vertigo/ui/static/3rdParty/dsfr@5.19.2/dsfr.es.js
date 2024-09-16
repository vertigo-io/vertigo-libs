import { defineComponent as T, ref as R, computed as h, onMounted as ne, watch as ee, onUnmounted as ue, Comment as Za, cloneVNode as Ja, h as It, mergeModels as Me, useModel as fe, openBlock as i, createElementBlock as f, normalizeClass as A, createElementVNode as c, withDirectives as he, mergeProps as j, vModelCheckbox as $t, renderSlot as B, createTextVNode as M, toDisplayString as m, createCommentVNode as b, inject as Re, toRef as Oe, createBlock as S, resolveDynamicComponent as te, withCtx as O, unref as G, provide as ct, resolveComponent as ie, vShow as Zt, Fragment as V, renderList as q, normalizeStyle as se, createVNode as K, normalizeProps as oe, withModifiers as $, guardReactiveProps as ft, withKeys as _e, useSlots as Jt, hasInjectionContext as el, reactive as tl, Teleport as al, useCssVars as ea, nextTick as ta, vModelSelect as aa, useAttrs as ll, onBeforeUnmount as rl, Transition as nl } from "vue";
const pt = Symbol("accordions"), vt = Symbol("header"), qe = Symbol("tabs"), ce = () => {
  const t = R(), e = R(!1), a = R(!1), r = () => {
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
        e.value = !0, r(), window.requestAnimationFrame(() => {
          a.value = l;
        });
      }));
    },
    adjust: r,
    onTransitionEnd: (l) => {
      e.value = !1, t.value && l === !1 && t.value.style.removeProperty("--collapse-max-height");
    }
  };
}, ol = "abcdefghijklmnopqrstuvwyz0123456789", Ct = ol.repeat(10), il = () => {
  const t = Math.floor(Math.random() * Ct.length);
  return Ct[t];
}, sl = (t) => Array.from({ length: t }).map(il).join(""), W = (t = "", e = "") => (t ? `${t}-` : "") + sl(5) + (e ? `-${e}` : ""), dl = { class: "fr-accordion" }, ul = ["aria-expanded", "aria-controls"], cl = ["id"], fl = /* @__PURE__ */ T({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => W("accordion") },
    selected: { type: Boolean },
    title: { default: "Sans intitulé" },
    titleTag: { default: "h3" }
  },
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: r,
      cssExpanded: l,
      doExpand: n,
      onTransitionEnd: o
    } = ce(), s = R(), d = Re(pt), { isActive: u, expand: p } = (d == null ? void 0 : d(Oe(() => e.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return ne(() => {
      u.value && n(!0);
    }), ee(u, (v, y) => {
      v !== y && n(v);
    }), (v, y) => (i(), f("section", dl, [
      (i(), S(te(v.titleTag), { class: "fr-accordion__title" }, {
        default: O(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": G(u),
            "aria-controls": v.id,
            type: "button",
            onClick: y[0] || (y[0] = (D) => G(p)())
          }, [
            B(v.$slots, "title", {}, () => [
              M(m(v.title), 1)
            ])
          ], 8, ul)
        ]),
        _: 3
      })),
      c("div", {
        id: v.id,
        ref_key: "collapse",
        ref: a,
        class: A(["fr-collapse", {
          "fr-collapse--expanded": G(l),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": G(r)
        }]),
        onTransitionend: y[1] || (y[1] = (D) => G(o)(G(u)))
      }, [
        B(v.$slots, "default")
      ], 42, cl)
    ]));
  }
}), pl = { class: "fr-accordions-group" }, vl = /* @__PURE__ */ T({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, r = e, l = h({
      get: () => a.modelValue,
      set(s) {
        r("update:modelValue", s);
      }
    }), n = R(/* @__PURE__ */ new Map()), o = R(0);
    return ct(pt, (s) => {
      const d = o.value++;
      n.value.set(d, s.value);
      const u = h(() => d === l.value);
      ee(s, () => {
        n.value.set(d, s.value);
      });
      function p() {
        if (l.value === d) {
          l.value = -1;
          return;
        }
        l.value = d;
      }
      return ue(() => {
        n.value.delete(d);
      }), { isActive: u, expand: p };
    }), (s, d) => (i(), f("div", pl, [
      B(s.$slots, "default")
    ]));
  }
}), ml = ["id", "role"], gl = ["title", "aria-label"], bl = /* @__PURE__ */ T({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => W("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(t, { emit: e }) {
    const a = t, r = e, l = () => r("close"), n = h(
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
      class: A(["fr-alert", n.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? b("", !0) : (i(), S(te(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: O(() => [
          M(m(o.title), 1)
        ]),
        _: 1
      })),
      B(o.$slots, "default", {}, () => [
        M(m(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: l
      }, null, 8, gl)) : b("", !0)
    ], 10, ml));
  }
}), hl = /* @__PURE__ */ T({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(t) {
    return (e, a) => (i(), f("a", {
      class: A(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, m(e.label), 3));
  }
}), yl = ["title"], la = /* @__PURE__ */ T({
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
      class: A(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      c("span", {
        class: A(e.ellipsis ? "fr-ellipsis" : "")
      }, m(e.label), 3)
    ], 10, yl));
  }
}), kl = ["aria-label"], _l = ["aria-expanded", "aria-controls"], wl = ["id"], xl = { class: "fr-breadcrumb__list" }, Dl = ["aria-current"], Il = /* @__PURE__ */ T({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => W("breadcrumb") },
    links: { default: () => [{ text: "" }] },
    navigationLabel: { default: "vous êtes ici :" },
    showBreadcrumbLabel: { default: "Voir le fil d’Ariane" }
  },
  setup(t) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: n
    } = ce(), o = R(!1);
    return ee(o, (s, d) => {
      s !== d && l(s);
    }), (s, d) => {
      const u = ie("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        he(c("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: d[0] || (d[0] = (p) => o.value = !o.value)
        }, m(s.showBreadcrumbLabel), 9, _l), [
          [Zt, !o.value]
        ]),
        c("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: A(["fr-collapse", {
            "fr-collapse--expanded": G(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": G(a)
          }]),
          onTransitionend: d[1] || (d[1] = (p) => G(n)(o.value))
        }, [
          c("ol", xl, [
            (i(!0), f(V, null, q(s.links, (p, v) => (i(), f("li", {
              key: v,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), S(u, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": v === s.links.length - 1 ? "page" : void 0
              }, {
                default: O(() => [
                  M(m(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : b("", !0),
              p.to ? b("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": v === s.links.length - 1 ? "page" : void 0
              }, m(p.text), 9, Dl))
            ]))), 128))
          ])
        ], 42, wl)
      ], 8, kl);
    };
  }
}), we = /^[a-z0-9]+(-[a-z0-9]+)*$/, ze = (t, e, a, r = "") => {
  const l = t.split(":");
  if (t.slice(0, 1) === "@") {
    if (l.length < 2 || l.length > 3)
      return null;
    r = l.shift().slice(1);
  }
  if (l.length > 3 || !l.length)
    return null;
  if (l.length > 1) {
    const s = l.pop(), d = l.pop(), u = {
      // Allow provider without '@': "provider:prefix:name"
      provider: l.length > 0 ? l[0] : r,
      prefix: d,
      name: s
    };
    return e && !Se(u) ? null : u;
  }
  const n = l[0], o = n.split("-");
  if (o.length > 1) {
    const s = {
      provider: r,
      prefix: o.shift(),
      name: o.join("-")
    };
    return e && !Se(s) ? null : s;
  }
  if (a && r === "") {
    const s = {
      provider: r,
      prefix: "",
      name: n
    };
    return e && !Se(s, a) ? null : s;
  }
  return null;
}, Se = (t, e) => t ? !!((t.provider === "" || t.provider.match(we)) && (e && t.prefix === "" || t.prefix.match(we)) && t.name.match(we)) : !1, ra = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), Le = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Qe = Object.freeze({
  ...ra,
  ...Le
}), Ze = Object.freeze({
  ...Qe,
  body: "",
  hidden: !1
});
function Cl(t, e) {
  const a = {};
  !t.hFlip != !e.hFlip && (a.hFlip = !0), !t.vFlip != !e.vFlip && (a.vFlip = !0);
  const r = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return r && (a.rotate = r), a;
}
function Tt(t, e) {
  const a = Cl(t, e);
  for (const r in Ze)
    r in Le ? r in t && !(r in a) && (a[r] = Le[r]) : r in e ? a[r] = e[r] : r in t && (a[r] = t[r]);
  return a;
}
function Tl(t, e) {
  const a = t.icons, r = t.aliases || /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  function n(o) {
    if (a[o])
      return l[o] = [];
    if (!(o in l)) {
      l[o] = null;
      const s = r[o] && r[o].parent, d = s && n(s);
      d && (l[o] = [s].concat(d));
    }
    return l[o];
  }
  return Object.keys(a).concat(Object.keys(r)).forEach(n), l;
}
function Bl(t, e, a) {
  const r = t.icons, l = t.aliases || /* @__PURE__ */ Object.create(null);
  let n = {};
  function o(s) {
    n = Tt(
      r[s] || l[s],
      n
    );
  }
  return o(e), a.forEach(o), Tt(t, n);
}
function na(t, e) {
  const a = [];
  if (typeof t != "object" || typeof t.icons != "object")
    return a;
  t.not_found instanceof Array && t.not_found.forEach((l) => {
    e(l, null), a.push(l);
  });
  const r = Tl(t);
  for (const l in r) {
    const n = r[l];
    n && (e(l, Bl(t, l, n)), a.push(l));
  }
  return a;
}
const El = {
  provider: "",
  aliases: {},
  not_found: {},
  ...ra
};
function Ue(t, e) {
  for (const a in e)
    if (a in t && typeof t[a] != typeof e[a])
      return !1;
  return !0;
}
function oa(t) {
  if (typeof t != "object" || t === null)
    return null;
  const e = t;
  if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !Ue(t, El))
    return null;
  const a = e.icons;
  for (const l in a) {
    const n = a[l];
    if (!l.match(we) || typeof n.body != "string" || !Ue(
      n,
      Ze
    ))
      return null;
  }
  const r = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const l in r) {
    const n = r[l], o = n.parent;
    if (!l.match(we) || typeof o != "string" || !a[o] && !r[o] || !Ue(
      n,
      Ze
    ))
      return null;
  }
  return e;
}
const Bt = /* @__PURE__ */ Object.create(null);
function Sl(t, e) {
  return {
    provider: t,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function ve(t, e) {
  const a = Bt[t] || (Bt[t] = /* @__PURE__ */ Object.create(null));
  return a[e] || (a[e] = Sl(t, e));
}
function mt(t, e) {
  return oa(e) ? na(e, (a, r) => {
    r ? t.icons[a] = r : t.missing.add(a);
  }) : [];
}
function Al(t, e, a) {
  try {
    if (typeof a.body == "string")
      return t.icons[e] = { ...a }, !0;
  } catch {
  }
  return !1;
}
let De = !1;
function ia(t) {
  return typeof t == "boolean" && (De = t), De;
}
function Ml(t) {
  const e = typeof t == "string" ? ze(t, !0, De) : t;
  if (e) {
    const a = ve(e.provider, e.prefix), r = e.name;
    return a.icons[r] || (a.missing.has(r) ? null : void 0);
  }
}
function Ll(t, e) {
  const a = ze(t, !0, De);
  if (!a)
    return !1;
  const r = ve(a.provider, a.prefix);
  return Al(r, a.name, e);
}
function Fl(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), De && !e && !t.prefix) {
    let l = !1;
    return oa(t) && (t.prefix = "", na(t, (n, o) => {
      o && Ll(n, o) && (l = !0);
    })), l;
  }
  const a = t.prefix;
  if (!Se({
    provider: e,
    prefix: a,
    name: "a"
  }))
    return !1;
  const r = ve(e, a);
  return !!mt(r, t);
}
const sa = Object.freeze({
  width: null,
  height: null
}), da = Object.freeze({
  // Dimensions
  ...sa,
  // Transformations
  ...Le
}), Pl = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Nl = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function Et(t, e, a) {
  if (e === 1)
    return t;
  if (a = a || 100, typeof t == "number")
    return Math.ceil(t * e * a) / a;
  if (typeof t != "string")
    return t;
  const r = t.split(Pl);
  if (r === null || !r.length)
    return t;
  const l = [];
  let n = r.shift(), o = Nl.test(n);
  for (; ; ) {
    if (o) {
      const s = parseFloat(n);
      isNaN(s) ? l.push(n) : l.push(Math.ceil(s * e * a) / a);
    } else
      l.push(n);
    if (n = r.shift(), n === void 0)
      return l.join("");
    o = !o;
  }
}
function Vl(t, e = "defs") {
  let a = "";
  const r = t.indexOf("<" + e);
  for (; r >= 0; ) {
    const l = t.indexOf(">", r), n = t.indexOf("</" + e);
    if (l === -1 || n === -1)
      break;
    const o = t.indexOf(">", n);
    if (o === -1)
      break;
    a += t.slice(l + 1, n).trim(), t = t.slice(0, r).trim() + t.slice(o + 1);
  }
  return {
    defs: a,
    content: t
  };
}
function jl(t, e) {
  return t ? "<defs>" + t + "</defs>" + e : e;
}
function Rl(t, e, a) {
  const r = Vl(t);
  return jl(r.defs, e + r.content + a);
}
const Ol = (t) => t === "unset" || t === "undefined" || t === "none";
function ql(t, e) {
  const a = {
    ...Qe,
    ...t
  }, r = {
    ...da,
    ...e
  }, l = {
    left: a.left,
    top: a.top,
    width: a.width,
    height: a.height
  };
  let n = a.body;
  [a, r].forEach((L) => {
    const g = [], I = L.hFlip, N = L.vFlip;
    let z = L.rotate;
    I ? N ? z += 2 : (g.push(
      "translate(" + (l.width + l.left).toString() + " " + (0 - l.top).toString() + ")"
    ), g.push("scale(-1 1)"), l.top = l.left = 0) : N && (g.push(
      "translate(" + (0 - l.left).toString() + " " + (l.height + l.top).toString() + ")"
    ), g.push("scale(1 -1)"), l.top = l.left = 0);
    let E;
    switch (z < 0 && (z -= Math.floor(z / 4) * 4), z = z % 4, z) {
      case 1:
        E = l.height / 2 + l.top, g.unshift(
          "rotate(90 " + E.toString() + " " + E.toString() + ")"
        );
        break;
      case 2:
        g.unshift(
          "rotate(180 " + (l.width / 2 + l.left).toString() + " " + (l.height / 2 + l.top).toString() + ")"
        );
        break;
      case 3:
        E = l.width / 2 + l.left, g.unshift(
          "rotate(-90 " + E.toString() + " " + E.toString() + ")"
        );
        break;
    }
    z % 2 === 1 && (l.left !== l.top && (E = l.left, l.left = l.top, l.top = E), l.width !== l.height && (E = l.width, l.width = l.height, l.height = E)), g.length && (n = Rl(
      n,
      '<g transform="' + g.join(" ") + '">',
      "</g>"
    ));
  });
  const o = r.width, s = r.height, d = l.width, u = l.height;
  let p, v;
  o === null ? (v = s === null ? "1em" : s === "auto" ? u : s, p = Et(v, d / u)) : (p = o === "auto" ? d : o, v = s === null ? Et(p, u / d) : s === "auto" ? u : s);
  const y = {}, D = (L, g) => {
    Ol(g) || (y[L] = g.toString());
  };
  D("width", p), D("height", v);
  const w = [l.left, l.top, d, u];
  return y.viewBox = w.join(" "), {
    attributes: y,
    viewBox: w,
    body: n
  };
}
const zl = /\sid="(\S+)"/g, Ql = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Hl = 0;
function Gl(t, e = Ql) {
  const a = [];
  let r;
  for (; r = zl.exec(t); )
    a.push(r[1]);
  if (!a.length)
    return t;
  const l = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return a.forEach((n) => {
    const o = typeof e == "function" ? e(n) : e + (Hl++).toString(), s = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"),
      "$1" + o + l + "$3"
    );
  }), t = t.replace(new RegExp(l, "g"), ""), t;
}
const Je = /* @__PURE__ */ Object.create(null);
function Kl(t, e) {
  Je[t] = e;
}
function et(t) {
  return Je[t] || Je[""];
}
function gt(t) {
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
const bt = /* @__PURE__ */ Object.create(null), Te = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], tt = [];
for (; Te.length > 0; )
  Te.length === 1 || Math.random() > 0.5 ? tt.push(Te.shift()) : tt.push(Te.pop());
bt[""] = gt({
  resources: ["https://api.iconify.design"].concat(tt)
});
function Xl(t, e) {
  const a = gt(e);
  return a === null ? !1 : (bt[t] = a, !0);
}
function ht(t) {
  return bt[t];
}
const Wl = () => {
  let t;
  try {
    if (t = fetch, typeof t == "function")
      return t;
  } catch {
  }
};
let St = Wl();
function Ul(t, e) {
  const a = ht(t);
  if (!a)
    return 0;
  let r;
  if (!a.maxURL)
    r = 0;
  else {
    let l = 0;
    a.resources.forEach((o) => {
      l = Math.max(l, o.length);
    });
    const n = e + ".json?icons=";
    r = a.maxURL - l - a.path.length - n.length;
  }
  return r;
}
function Yl(t) {
  return t === 404;
}
const $l = (t, e, a) => {
  const r = [], l = Ul(t, e), n = "icons";
  let o = {
    type: n,
    provider: t,
    prefix: e,
    icons: []
  }, s = 0;
  return a.forEach((d, u) => {
    s += d.length + 1, s >= l && u > 0 && (r.push(o), o = {
      type: n,
      provider: t,
      prefix: e,
      icons: []
    }, s = d.length), o.icons.push(d);
  }), r.push(o), r;
};
function Zl(t) {
  if (typeof t == "string") {
    const e = ht(t);
    if (e)
      return e.path;
  }
  return "/";
}
const Jl = (t, e, a) => {
  if (!St) {
    a("abort", 424);
    return;
  }
  let r = Zl(e.provider);
  switch (e.type) {
    case "icons": {
      const n = e.prefix, o = e.icons.join(","), s = new URLSearchParams({
        icons: o
      });
      r += n + ".json?" + s.toString();
      break;
    }
    case "custom": {
      const n = e.uri;
      r += n.slice(0, 1) === "/" ? n.slice(1) : n;
      break;
    }
    default:
      a("abort", 400);
      return;
  }
  let l = 503;
  St(t + r).then((n) => {
    const o = n.status;
    if (o !== 200) {
      setTimeout(() => {
        a(Yl(o) ? "abort" : "next", o);
      });
      return;
    }
    return l = 501, n.json();
  }).then((n) => {
    if (typeof n != "object" || n === null) {
      setTimeout(() => {
        n === 404 ? a("abort", n) : a("next", l);
      });
      return;
    }
    setTimeout(() => {
      a("success", n);
    });
  }).catch(() => {
    a("next", l);
  });
}, er = {
  prepare: $l,
  send: Jl
};
function tr(t) {
  const e = {
    loaded: [],
    missing: [],
    pending: []
  }, a = /* @__PURE__ */ Object.create(null);
  t.sort((l, n) => l.provider !== n.provider ? l.provider.localeCompare(n.provider) : l.prefix !== n.prefix ? l.prefix.localeCompare(n.prefix) : l.name.localeCompare(n.name));
  let r = {
    provider: "",
    prefix: "",
    name: ""
  };
  return t.forEach((l) => {
    if (r.name === l.name && r.prefix === l.prefix && r.provider === l.provider)
      return;
    r = l;
    const n = l.provider, o = l.prefix, s = l.name, d = a[n] || (a[n] = /* @__PURE__ */ Object.create(null)), u = d[o] || (d[o] = ve(n, o));
    let p;
    s in u.icons ? p = e.loaded : o === "" || u.missing.has(s) ? p = e.missing : p = e.pending;
    const v = {
      provider: n,
      prefix: o,
      name: s
    };
    p.push(v);
  }), e;
}
function ua(t, e) {
  t.forEach((a) => {
    const r = a.loaderCallbacks;
    r && (a.loaderCallbacks = r.filter((l) => l.id !== e));
  });
}
function ar(t) {
  t.pendingCallbacksFlag || (t.pendingCallbacksFlag = !0, setTimeout(() => {
    t.pendingCallbacksFlag = !1;
    const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
    if (!e.length)
      return;
    let a = !1;
    const r = t.provider, l = t.prefix;
    e.forEach((n) => {
      const o = n.icons, s = o.pending.length;
      o.pending = o.pending.filter((d) => {
        if (d.prefix !== l)
          return !0;
        const u = d.name;
        if (t.icons[u])
          o.loaded.push({
            provider: r,
            prefix: l,
            name: u
          });
        else if (t.missing.has(u))
          o.missing.push({
            provider: r,
            prefix: l,
            name: u
          });
        else
          return a = !0, !0;
        return !1;
      }), o.pending.length !== s && (a || ua([t], n.id), n.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        n.abort
      ));
    });
  }));
}
let lr = 0;
function rr(t, e, a) {
  const r = lr++, l = ua.bind(null, a, r);
  if (!e.pending.length)
    return l;
  const n = {
    id: r,
    icons: e,
    callback: t,
    abort: l
  };
  return a.forEach((o) => {
    (o.loaderCallbacks || (o.loaderCallbacks = [])).push(n);
  }), l;
}
function nr(t, e = !0, a = !1) {
  const r = [];
  return t.forEach((l) => {
    const n = typeof l == "string" ? ze(l, e, a) : l;
    n && r.push(n);
  }), r;
}
var or = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function ir(t, e, a, r) {
  const l = t.resources.length, n = t.random ? Math.floor(Math.random() * l) : t.index;
  let o;
  if (t.random) {
    let k = t.resources.slice(0);
    for (o = []; k.length > 1; ) {
      const F = Math.floor(Math.random() * k.length);
      o.push(k[F]), k = k.slice(0, F).concat(k.slice(F + 1));
    }
    o = o.concat(k);
  } else
    o = t.resources.slice(n).concat(t.resources.slice(0, n));
  const s = Date.now();
  let d = "pending", u = 0, p, v = null, y = [], D = [];
  typeof r == "function" && D.push(r);
  function w() {
    v && (clearTimeout(v), v = null);
  }
  function L() {
    d === "pending" && (d = "aborted"), w(), y.forEach((k) => {
      k.status === "pending" && (k.status = "aborted");
    }), y = [];
  }
  function g(k, F) {
    F && (D = []), typeof k == "function" && D.push(k);
  }
  function I() {
    return {
      startTime: s,
      payload: e,
      status: d,
      queriesSent: u,
      queriesPending: y.length,
      subscribe: g,
      abort: L
    };
  }
  function N() {
    d = "failed", D.forEach((k) => {
      k(void 0, p);
    });
  }
  function z() {
    y.forEach((k) => {
      k.status === "pending" && (k.status = "aborted");
    }), y = [];
  }
  function E(k, F, C) {
    const H = F !== "success";
    switch (y = y.filter((_) => _ !== k), d) {
      case "pending":
        break;
      case "failed":
        if (H || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (F === "abort") {
      p = C, N();
      return;
    }
    if (H) {
      p = C, y.length || (o.length ? Q() : N());
      return;
    }
    if (w(), z(), !t.random) {
      const _ = t.resources.indexOf(k.resource);
      _ !== -1 && _ !== t.index && (t.index = _);
    }
    d = "completed", D.forEach((_) => {
      _(C);
    });
  }
  function Q() {
    if (d !== "pending")
      return;
    w();
    const k = o.shift();
    if (k === void 0) {
      if (y.length) {
        v = setTimeout(() => {
          w(), d === "pending" && (z(), N());
        }, t.timeout);
        return;
      }
      N();
      return;
    }
    const F = {
      status: "pending",
      resource: k,
      callback: (C, H) => {
        E(F, C, H);
      }
    };
    y.push(F), u++, v = setTimeout(Q, t.rotate), a(k, e, F.callback);
  }
  return setTimeout(Q), I;
}
function ca(t) {
  const e = {
    ...or,
    ...t
  };
  let a = [];
  function r() {
    a = a.filter((o) => o().status === "pending");
  }
  function l(o, s, d) {
    const u = ir(
      e,
      o,
      s,
      (p, v) => {
        r(), d && d(p, v);
      }
    );
    return a.push(u), u;
  }
  function n(o) {
    return a.find((s) => o(s)) || null;
  }
  return {
    query: l,
    find: n,
    setIndex: (o) => {
      e.index = o;
    },
    getIndex: () => e.index,
    cleanup: r
  };
}
function At() {
}
const Ye = /* @__PURE__ */ Object.create(null);
function sr(t) {
  if (!Ye[t]) {
    const e = ht(t);
    if (!e)
      return;
    const a = ca(e), r = {
      config: e,
      redundancy: a
    };
    Ye[t] = r;
  }
  return Ye[t];
}
function dr(t, e, a) {
  let r, l;
  if (typeof t == "string") {
    const n = et(t);
    if (!n)
      return a(void 0, 424), At;
    l = n.send;
    const o = sr(t);
    o && (r = o.redundancy);
  } else {
    const n = gt(t);
    if (n) {
      r = ca(n);
      const o = t.resources ? t.resources[0] : "", s = et(o);
      s && (l = s.send);
    }
  }
  return !r || !l ? (a(void 0, 424), At) : r.query(e, l, a)().abort;
}
const Mt = "iconify2", Ie = "iconify", fa = Ie + "-count", Lt = Ie + "-version", pa = 36e5, ur = 168, cr = 50;
function at(t, e) {
  try {
    return t.getItem(e);
  } catch {
  }
}
function yt(t, e, a) {
  try {
    return t.setItem(e, a), !0;
  } catch {
  }
}
function Ft(t, e) {
  try {
    t.removeItem(e);
  } catch {
  }
}
function lt(t, e) {
  return yt(t, fa, e.toString());
}
function rt(t) {
  return parseInt(at(t, fa)) || 0;
}
const He = {
  local: !0,
  session: !0
}, va = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let kt = !1;
function fr(t) {
  kt = t;
}
let Be = typeof window > "u" ? {} : window;
function ma(t) {
  const e = t + "Storage";
  try {
    if (Be && Be[e] && typeof Be[e].length == "number")
      return Be[e];
  } catch {
  }
  He[t] = !1;
}
function ga(t, e) {
  const a = ma(t);
  if (!a)
    return;
  const r = at(a, Lt);
  if (r !== Mt) {
    if (r) {
      const s = rt(a);
      for (let d = 0; d < s; d++)
        Ft(a, Ie + d.toString());
    }
    yt(a, Lt, Mt), lt(a, 0);
    return;
  }
  const l = Math.floor(Date.now() / pa) - ur, n = (s) => {
    const d = Ie + s.toString(), u = at(a, d);
    if (typeof u == "string") {
      try {
        const p = JSON.parse(u);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > l && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        e(p, s))
          return !0;
      } catch {
      }
      Ft(a, d);
    }
  };
  let o = rt(a);
  for (let s = o - 1; s >= 0; s--)
    n(s) || (s === o - 1 ? (o--, lt(a, o)) : va[t].add(s));
}
function ba() {
  if (!kt) {
    fr(!0);
    for (const t in He)
      ga(t, (e) => {
        const a = e.data, r = e.provider, l = a.prefix, n = ve(
          r,
          l
        );
        if (!mt(n, a).length)
          return !1;
        const o = a.lastModified || -1;
        return n.lastModifiedCached = n.lastModifiedCached ? Math.min(n.lastModifiedCached, o) : o, !0;
      });
  }
}
function pr(t, e) {
  const a = t.lastModifiedCached;
  if (
    // Matches or newer
    a && a >= e
  )
    return a === e;
  if (t.lastModifiedCached = e, a)
    for (const r in He)
      ga(r, (l) => {
        const n = l.data;
        return l.provider !== t.provider || n.prefix !== t.prefix || n.lastModified === e;
      });
  return !0;
}
function vr(t, e) {
  kt || ba();
  function a(r) {
    let l;
    if (!He[r] || !(l = ma(r)))
      return;
    const n = va[r];
    let o;
    if (n.size)
      n.delete(o = Array.from(n).shift());
    else if (o = rt(l), o >= cr || !lt(l, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / pa),
      provider: t.provider,
      data: e
    };
    return yt(
      l,
      Ie + o.toString(),
      JSON.stringify(s)
    );
  }
  e.lastModified && !pr(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && (e = Object.assign({}, e), delete e.not_found), a("local") || a("session"));
}
function Pt() {
}
function mr(t) {
  t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
    t.iconsLoaderFlag = !1, ar(t);
  }));
}
function gr(t, e) {
  t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
    t.iconsQueueFlag = !1;
    const { provider: a, prefix: r } = t, l = t.iconsToLoad;
    delete t.iconsToLoad;
    let n;
    !l || !(n = et(a)) || n.prepare(a, r, l).forEach((o) => {
      dr(a, o, (s) => {
        if (typeof s != "object")
          o.icons.forEach((d) => {
            t.missing.add(d);
          });
        else
          try {
            const d = mt(
              t,
              s
            );
            if (!d.length)
              return;
            const u = t.pendingIcons;
            u && d.forEach((p) => {
              u.delete(p);
            }), vr(t, s);
          } catch (d) {
            console.error(d);
          }
        mr(t);
      });
    });
  }));
}
const br = (t, e) => {
  const a = nr(t, !0, ia()), r = tr(a);
  if (!r.pending.length) {
    let d = !0;
    return e && setTimeout(() => {
      d && e(
        r.loaded,
        r.missing,
        r.pending,
        Pt
      );
    }), () => {
      d = !1;
    };
  }
  const l = /* @__PURE__ */ Object.create(null), n = [];
  let o, s;
  return r.pending.forEach((d) => {
    const { provider: u, prefix: p } = d;
    if (p === s && u === o)
      return;
    o = u, s = p, n.push(ve(u, p));
    const v = l[u] || (l[u] = /* @__PURE__ */ Object.create(null));
    v[p] || (v[p] = []);
  }), r.pending.forEach((d) => {
    const { provider: u, prefix: p, name: v } = d, y = ve(u, p), D = y.pendingIcons || (y.pendingIcons = /* @__PURE__ */ new Set());
    D.has(v) || (D.add(v), l[u][p].push(v));
  }), n.forEach((d) => {
    const { provider: u, prefix: p } = d;
    l[u][p].length && gr(d, l[u][p]);
  }), e ? rr(e, r, n) : Pt;
};
function hr(t, e) {
  const a = {
    ...t
  };
  for (const r in e) {
    const l = e[r], n = typeof l;
    r in sa ? (l === null || l && (n === "string" || n === "number")) && (a[r] = l) : n === typeof a[r] && (a[r] = r === "rotate" ? l % 4 : l);
  }
  return a;
}
const yr = /[\s,]+/;
function kr(t, e) {
  e.split(yr).forEach((a) => {
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
function _r(t, e = 0) {
  const a = t.replace(/^-?[0-9.]*/, "");
  function r(l) {
    for (; l < 0; )
      l += 4;
    return l % 4;
  }
  if (a === "") {
    const l = parseInt(t);
    return isNaN(l) ? 0 : r(l);
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
      let n = parseFloat(t.slice(0, t.length - a.length));
      return isNaN(n) ? 0 : (n = n / l, n % 1 === 0 ? r(n) : 0);
    }
  }
  return e;
}
function wr(t, e) {
  let a = t.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in e)
    a += " " + r + '="' + e[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + a + ">" + t + "</svg>";
}
function xr(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Dr(t) {
  return "data:image/svg+xml," + xr(t);
}
function Ir(t) {
  return 'url("' + Dr(t) + '")';
}
const Nt = {
  ...da,
  inline: !1
}, Cr = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Tr = {
  display: "inline-block"
}, nt = {
  backgroundColor: "currentColor"
}, ha = {
  backgroundColor: "transparent"
}, Vt = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, jt = {
  webkitMask: nt,
  mask: nt,
  background: ha
};
for (const t in jt) {
  const e = jt[t];
  for (const a in Vt)
    e[t + a] = Vt[a];
}
const Ae = {};
["horizontal", "vertical"].forEach((t) => {
  const e = t.slice(0, 1) + "Flip";
  Ae[t + "-flip"] = e, Ae[t.slice(0, 1) + "-flip"] = e, Ae[t + "Flip"] = e;
});
function Rt(t) {
  return t + (t.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ot = (t, e) => {
  const a = hr(Nt, e), r = { ...Cr }, l = e.mode || "svg", n = {}, o = e.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
  for (let L in e) {
    const g = e[L];
    if (g !== void 0)
      switch (L) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          a[L] = g === !0 || g === "true" || g === 1;
          break;
        case "flip":
          typeof g == "string" && kr(a, g);
          break;
        case "color":
          n.color = g;
          break;
        case "rotate":
          typeof g == "string" ? a[L] = _r(g) : typeof g == "number" && (a[L] = g);
          break;
        case "ariaHidden":
        case "aria-hidden":
          g !== !0 && g !== "true" && delete r["aria-hidden"];
          break;
        default: {
          const I = Ae[L];
          I ? (g === !0 || g === "true" || g === 1) && (a[I] = !0) : Nt[L] === void 0 && (r[L] = g);
        }
      }
  }
  const d = ql(t, a), u = d.attributes;
  if (a.inline && (n.verticalAlign = "-0.125em"), l === "svg") {
    r.style = {
      ...n,
      ...s
    }, Object.assign(r, u);
    let L = 0, g = e.id;
    return typeof g == "string" && (g = g.replace(/-/g, "_")), r.innerHTML = Gl(d.body, g ? () => g + "ID" + L++ : "iconifyVue"), It("svg", r);
  }
  const { body: p, width: v, height: y } = t, D = l === "mask" || (l === "bg" ? !1 : p.indexOf("currentColor") !== -1), w = wr(p, {
    ...u,
    width: v + "",
    height: y + ""
  });
  return r.style = {
    ...n,
    "--svg": Ir(w),
    width: Rt(u.width),
    height: Rt(u.height),
    ...Tr,
    ...D ? nt : ha,
    ...s
  }, It("span", r);
};
ia(!0);
Kl("", er);
if (typeof document < "u" && typeof window < "u") {
  ba();
  const t = window;
  if (t.IconifyPreload !== void 0) {
    const e = t.IconifyPreload, a = "Invalid IconifyPreload syntax.";
    typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach((r) => {
      try {
        (typeof r != "object" || r === null || r instanceof Array || // Check for 'icons' and 'prefix'
        typeof r.icons != "object" || typeof r.prefix != "string" || // Add icon set
        !Fl(r)) && console.error(a);
      } catch {
        console.error(a);
      }
    });
  }
  if (t.IconifyProviders !== void 0) {
    const e = t.IconifyProviders;
    if (typeof e == "object" && e !== null)
      for (let a in e) {
        const r = "IconifyProviders[" + a + "] is invalid.";
        try {
          const l = e[a];
          if (typeof l != "object" || !l || l.resources === void 0)
            continue;
          Xl(a, l) || console.error(r);
        } catch {
          console.error(r);
        }
      }
  }
}
const Br = {
  ...Qe,
  body: ""
}, Er = T({
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
      if (typeof t != "string" || (a = ze(t, !1, !0)) === null)
        return this.abortLoading(), null;
      const r = Ml(a);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== t) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: t,
          abort: br([a], () => {
            this.counter++;
          })
        })), null;
      this.abortLoading(), this._name !== t && (this._name = t, e && e(t));
      const l = ["iconify"];
      return a.prefix !== "" && l.push("iconify--" + a.prefix), a.provider !== "" && l.push("iconify--" + a.provider), { data: r, classes: l };
    }
  },
  // Render icon
  render() {
    this.counter;
    const t = this.$attrs, e = this.iconMounted || t.ssr ? this.getIcon(t.icon, t.onLoad) : null;
    if (!e)
      return Ot(Br, t);
    let a = t;
    return e.classes && (a = {
      ...t,
      class: (typeof t.class == "string" ? t.class + " " : "") + e.classes.join(" ")
    }), Ot({
      ...Qe,
      ...e.data
    }, a);
  }
}), Sr = /* @__PURE__ */ T({
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
    ea((d) => ({
      "98d5b8bc": s.value
    }));
    const e = t, a = R(null), r = h(() => `${+e.scale * 1.2}rem`), l = h(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    ee(() => e.title, n);
    async function n() {
      var d, u, p, v;
      if (!((d = a.value) != null && d.$el))
        return;
      const y = !!((u = a.value) == null ? void 0 : u.$el).querySelector("title"), D = document.createElement("title");
      if (!e.title) {
        D.remove();
        return;
      }
      D.innerHTML = e.title, await ta(), y || (v = ((p = a.value) == null ? void 0 : p.$el).firstChild) == null || v.before(D);
    }
    ne(n);
    const o = h(() => {
      var d;
      return (d = e.name) != null && d.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), s = h(() => e.color ?? e.fill ?? "inherit");
    return (d, u) => (i(), S(G(Er), {
      ref_key: "icon",
      ref: a,
      icon: o.value,
      style: se({ fontSize: r.value, verticalAlign: d.verticalAlign, display: d.display }),
      "aria-label": d.label,
      class: A(["vicon", {
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
}), le = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [r, l] of e)
    a[r] = l;
  return a;
}, ae = /* @__PURE__ */ le(Sr, [["__scopeId", "data-v-33ecc4e5"]]), Ar = ["title", "disabled", "aria-disabled"], Mr = { key: 1 }, Lr = /* @__PURE__ */ T({
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
    const a = t, r = h(() => ["sm", "small"].includes(a.size)), l = h(() => ["md", "medium"].includes(a.size)), n = h(() => ["lg", "large"].includes(a.size)), o = R(null);
    e({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const s = h(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), d = h(() => a.iconOnly ? 1.25 : 0.8325), u = h(
      () => typeof a.icon == "string" ? { scale: d.value, name: a.icon } : { scale: d.value, ...a.icon }
    );
    return (p, v) => (i(), f("button", {
      ref_key: "btn",
      ref: o,
      class: A(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": r.value,
        "fr-btn--md": l.value,
        "fr-btn--lg": n.value,
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
      style: se(!s.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: v[0] || (v[0] = (y) => p.onClick ? p.onClick(y) : () => {
      })
    }, [
      p.icon && !s.value ? (i(), S(ae, oe(j({ key: 0 }, u.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", Mr, [
        M(m(p.label) + " ", 1),
        B(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Ar));
  }
}), Ce = /* @__PURE__ */ le(Lr, [["__scopeId", "data-v-77b13897"]]), Ge = /* @__PURE__ */ T({
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
    const e = t, a = R(null), r = h(() => ["sm", "small"].includes(e.size)), l = h(() => ["md", "medium"].includes(e.size)), n = h(() => ["lg", "large"].includes(e.size)), o = h(() => ["always", "", !0].includes(e.inlineLayoutWhen)), s = h(() => ["sm", "small"].includes(e.inlineLayoutWhen)), d = h(() => ["md", "medium"].includes(e.inlineLayoutWhen)), u = h(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = h(() => e.align === "center"), v = h(() => e.align === "right"), y = R("auto"), D = h(() => `--equisized-width: ${y.value};`), w = async () => {
      var L;
      let g = 0;
      await new Promise((I) => setTimeout(I, 100)), (L = a.value) == null || L.querySelectorAll(".fr-btn").forEach((I) => {
        const N = I, z = N.offsetWidth, E = window.getComputedStyle(N), Q = +E.marginLeft.replace("px", ""), k = +E.marginRight.replace("px", "");
        N.style.width = "var(--equisized-width)";
        const F = z + Q + k;
        F > g && (g = F);
      }), y.value = `${g}px`;
    };
    return ne(async () => {
      !a.value || !e.equisized || await w();
    }), (L, g) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: se(D.value),
      class: A(["fr-btns-group", {
        "fr-btns-group--equisized": L.equisized,
        "fr-btns-group--sm": r.value,
        "fr-btns-group--md": l.value,
        "fr-btns-group--lg": n.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || d.value,
        "fr-btns-group--inline-lg": o.value || u.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": v.value,
        "fr-btns-group--icon-right": L.iconRight,
        "fr-btns-group--inline-reverse": L.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(V, null, q(L.buttons, ({ onClick: I, ...N }, z) => (i(), f("li", { key: z }, [
        K(Ce, j({ ref_for: !0 }, N, { onClick: I }), null, 16, ["onClick"])
      ]))), 128)),
      B(L.$slots, "default")
    ], 6));
  }
}), Fr = { class: "fr-callout__text" }, Pr = /* @__PURE__ */ T({
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
    const e = t, a = h(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), r = h(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : { ...e.icon ?? {} });
    return (l, n) => (i(), f("div", {
      class: A(["fr-callout", { [String(l.icon)]: a.value }])
    }, [
      l.icon && r.value ? (i(), S(ae, oe(j({ key: 0 }, r.value)), null, 16)) : b("", !0),
      l.title ? (i(), S(te(l.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: O(() => [
          M(m(l.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      c("p", Fr, m(l.content), 1),
      l.button ? (i(), S(Ce, oe(j({ key: 2 }, l.button)), null, 16)) : b("", !0),
      B(l.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Nr = /* @__PURE__ */ le(Pr, [["__scopeId", "data-v-a34b4ad8"]]), ot = /* @__PURE__ */ T({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = h(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), r = h(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, n) => (i(), f("p", {
      class: A(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
    }, [
      l.icon && !a.value ? (i(), S(ae, oe(j({ key: 0 }, r.value)), null, 16)) : b("", !0),
      B(l.$slots, "default")
    ], 2));
  }
}), Vr = { class: "fr-card__body" }, jr = { class: "fr-card__content" }, Rr = ["href"], Or = { class: "fr-card__desc" }, qr = {
  key: 0,
  class: "fr-card__start"
}, zr = {
  key: 1,
  class: "fr-card__end"
}, Qr = {
  key: 0,
  class: "fr-card__footer"
}, Hr = {
  key: 1,
  class: "fr-links-group"
}, Gr = ["href"], Kr = {
  key: 0,
  class: "fr-card__header"
}, Xr = {
  key: 0,
  class: "fr-card__img"
}, Wr = ["src", "alt"], Ur = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, Yr = /* @__PURE__ */ T({
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
    const a = t, r = h(() => ["sm", "small"].includes(a.size)), l = h(() => ["lg", "large"].includes(a.size)), n = h(() => ["sm", "small"].includes(a.imgRatio)), o = h(() => ["lg", "large"].includes(a.imgRatio)), s = h(() => typeof a.link == "string" && a.link.startsWith("http")), d = R(null);
    return e({ goToTargetLink: () => {
      var u;
      ((u = d.value) == null ? void 0 : u.querySelector(".fr-card__link")).click();
    } }), (u, p) => {
      const v = ie("RouterLink");
      return i(), f("div", {
        class: A(["fr-card", {
          "fr-card--horizontal": u.horizontal,
          "fr-enlarge-link": !u.noArrow,
          "fr-card--sm": r.value,
          "fr-card--lg": l.value,
          "fr-card--horizontal-tier": n.value,
          "fr-card--horizontal-half": o.value,
          "fr-card--download": u.download,
          "fr-enlarge-button": u.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        c("div", Vr, [
          c("div", jr, [
            (i(), S(te(u.titleTag), { class: "fr-card__title" }, {
              default: O(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: u.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, m(u.title), 9, Rr)) : u.link ? (i(), S(v, {
                  key: 1,
                  to: u.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (y) => y.stopPropagation())
                }, {
                  default: O(() => [
                    M(m(u.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(V, { key: 2 }, [
                  M(m(u.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Or, m(u.description), 1),
            u.$slots["start-details"] || u.detail ? (i(), f("div", qr, [
              B(u.$slots, "start-details"),
              u.detail ? (i(), S(ot, {
                key: 0,
                icon: u.detailIcon
              }, {
                default: O(() => [
                  M(m(u.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0),
            u.$slots["end-details"] || u.endDetail ? (i(), f("div", zr, [
              B(u.$slots, "end-details"),
              u.endDetail ? (i(), S(ot, {
                key: 0,
                icon: u.endDetailIcon
              }, {
                default: O(() => [
                  M(m(u.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0)
          ]),
          u.buttons.length || u.linksGroup.length ? (i(), f("div", Qr, [
            u.buttons.length ? (i(), S(Ge, {
              key: 0,
              buttons: u.buttons,
              "inline-layout-when": "always",
              size: u.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            u.linksGroup.length ? (i(), f("ul", Hr, [
              (i(!0), f(V, null, q(u.linksGroup, (y, D) => (i(), f("li", {
                key: `card-link-${D}`
              }, [
                y.to ? (i(), S(v, {
                  key: 0,
                  to: y.to
                }, {
                  default: O(() => [
                    M(m(y.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: y.link || y.href,
                  class: A(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": r.value,
                    "fr-link--lg": l.value
                  }])
                }, m(y.label), 11, Gr))
              ]))), 128))
            ])) : b("", !0)
          ])) : b("", !0)
        ]),
        u.imgSrc || u.badges.length ? (i(), f("div", Kr, [
          u.imgSrc ? (i(), f("div", Xr, [
            c("img", {
              src: u.imgSrc,
              class: "fr-responsive-img",
              alt: u.altImg,
              "data-testid": "card-img"
            }, null, 8, Wr)
          ])) : b("", !0),
          u.badges.length ? (i(), f("ul", Ur, [
            (i(!0), f(V, null, q(u.badges, (y, D) => (i(), f("li", { key: D }, [
              K(la, j({ ref_for: !0 }, y), null, 16)
            ]))), 128))
          ])) : b("", !0)
        ])) : b("", !0)
      ], 2);
    };
  }
}), $r = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], Zr = ["for"], Jr = {
  key: 0,
  class: "required"
}, en = {
  key: 0,
  class: "fr-hint-text"
}, tn = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, _t = /* @__PURE__ */ T({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ Me({
    id: { default: () => W("basic", "checkbox") },
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
    const e = t, a = h(() => e.errorMessage || e.validMessage), r = h(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = fe(t, "modelValue");
    return (n, o) => (i(), f("div", {
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": n.inline }])
    }, [
      c("div", {
        class: A(["fr-checkbox-group", {
          "fr-checkbox-group--error": n.errorMessage,
          "fr-checkbox-group--valid": !n.errorMessage && n.validMessage,
          "fr-checkbox-group--sm": n.small
        }])
      }, [
        he(c("input", j({
          id: n.id,
          "onUpdate:modelValue": o[0] || (o[0] = (s) => l.value = s),
          name: n.name,
          type: "checkbox",
          value: n.value,
          checked: l.value === !0 || Array.isArray(l.value) && l.value.includes(n.value),
          required: n.required
        }, n.$attrs, {
          "data-testid": `input-checkbox-${n.id}`,
          "data-test": `input-checkbox-${n.id}`
        }), null, 16, $r), [
          [$t, l.value]
        ]),
        c("label", {
          for: n.id,
          class: "fr-label"
        }, [
          B(n.$slots, "label", {}, () => [
            M(m(n.label) + " ", 1),
            B(n.$slots, "required-tip", {}, () => [
              n.required ? (i(), f("span", Jr, " *")) : b("", !0)
            ])
          ]),
          n.hint ? (i(), f("span", en, m(n.hint), 1)) : b("", !0)
        ], 8, Zr),
        a.value ? (i(), f("div", tn, [
          c("p", {
            class: A(["fr-message--info flex items-center", r.value])
          }, m(a.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), an = { class: "fr-form-group" }, ln = ["disabled", "aria-labelledby", "aria-invalid", "role"], rn = ["id"], nn = {
  key: 0,
  class: "required"
}, on = ["id"], sn = /* @__PURE__ */ T({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Me({
    titleId: { default: () => W("checkbox", "group") },
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
    const e = t, a = h(() => e.errorMessage || e.validMessage), r = h(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = h(() => a.value ? `${e.titleId} messages-${e.titleId}` : e.titleId), n = fe(t, "modelValue");
    return (o, s) => (i(), f("div", an, [
      c("fieldset", {
        class: A(["fr-fieldset", {
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
          B(o.$slots, "legend", {}, () => [
            M(m(o.legend) + " ", 1),
            B(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", nn, " *")) : b("", !0)
            ])
          ])
        ], 8, rn),
        B(o.$slots, "default", {}, () => [
          (i(!0), f(V, null, q(o.options, (d) => (i(), S(_t, {
            id: d.id,
            key: d.id || d.name,
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (u) => n.value = u),
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
            class: A(["fr-message--info flex items-center", r.value])
          }, [
            c("span", null, m(a.value), 1)
          ], 2)
        ], 8, on)) : b("", !0)
      ], 10, ln)
    ]));
  }
}), dn = { class: "fr-consent-banner__content" }, un = { class: "fr-text--sm" }, cn = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, fn = /* @__PURE__ */ T({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = h(() => typeof e.url == "string" && e.url.startsWith("http")), r = h(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = h(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (n, o) => (i(), f(V, null, [
      c("div", dn, [
        c("p", un, [
          B(n.$slots, "default", {}, () => [
            o[4] || (o[4] = M(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), S(te(r.value), j(l.value, { "data-testid": "link" }), {
              default: O(() => o[3] || (o[3] = [
                M(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = M(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", cn, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = $((s) => n.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = $((s) => n.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = $((s) => n.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), pn = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, vn = { class: "fr-pagination__list" }, mn = ["href", "title", "disabled", "aria-disabled"], gn = ["href", "title", "disabled", "aria-disabled"], bn = ["href", "title", "aria-current", "onClick"], hn = { key: 0 }, yn = { key: 1 }, kn = ["href", "title", "disabled", "aria-disabled"], _n = ["href", "title", "disabled", "aria-disabled"], wn = /* @__PURE__ */ T({
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
    const a = t, r = e, l = h(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), n = h(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), o = h(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, n.value + 1) : a.pages), s = (w) => r("update:current-page", w), d = (w) => s(w), u = () => d(0), p = () => d(Math.max(0, a.currentPage - 1)), v = () => d(Math.min(a.pages.length - 1, a.currentPage + 1)), y = () => d(a.pages.length - 1), D = (w) => a.pages.indexOf(w) === a.currentPage;
    return (w, L) => {
      var g, I, N, z;
      return i(), f("nav", pn, [
        c("ul", vn, [
          c("li", null, [
            c("a", {
              href: (g = w.pages[0]) == null ? void 0 : g.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: w.firstPageTitle,
              disabled: w.currentPage === 0 ? !0 : void 0,
              "aria-disabled": w.currentPage === 0 ? !0 : void 0,
              onClick: L[0] || (L[0] = $((E) => u(), ["prevent"]))
            }, null, 8, mn)
          ]),
          c("li", null, [
            c("a", {
              href: (I = w.pages[Math.max(w.currentPage - 1, 0)]) == null ? void 0 : I.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: w.prevPageTitle,
              disabled: w.currentPage === 0 ? !0 : void 0,
              "aria-disabled": w.currentPage === 0 ? !0 : void 0,
              onClick: L[1] || (L[1] = $((E) => p(), ["prevent"]))
            }, m(w.prevPageTitle), 9, gn)
          ]),
          (i(!0), f(V, null, q(o.value, (E, Q) => (i(), f("li", { key: Q }, [
            c("a", {
              href: E == null ? void 0 : E.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: E.title,
              "aria-current": D(E) ? "page" : void 0,
              onClick: $((k) => d(w.pages.indexOf(E)), ["prevent"])
            }, [
              o.value.indexOf(E) === 0 && l.value > 0 ? (i(), f("span", hn, "...")) : b("", !0),
              M(" " + m(E.label) + " ", 1),
              o.value.indexOf(E) === o.value.length - 1 && n.value < w.pages.length - 1 ? (i(), f("span", yn, "...")) : b("", !0)
            ], 8, bn)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (N = w.pages[Math.min(w.currentPage + 1, w.pages.length - 1)]) == null ? void 0 : N.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: w.nextPageTitle,
              disabled: w.currentPage === w.pages.length - 1 ? !0 : void 0,
              "aria-disabled": w.currentPage === w.pages.length - 1 ? !0 : void 0,
              onClick: L[2] || (L[2] = $((E) => v(), ["prevent"]))
            }, m(w.nextPageTitle), 9, kn)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (z = w.pages.at(-1)) == null ? void 0 : z.href,
              title: w.lastPageTitle,
              disabled: w.currentPage === w.pages.length - 1 ? !0 : void 0,
              "aria-disabled": w.currentPage === w.pages.length - 1 ? !0 : void 0,
              onClick: L[3] || (L[3] = $((E) => y(), ["prevent"]))
            }, null, 8, _n)
          ])
        ])
      ]);
    };
  }
}), ya = /* @__PURE__ */ le(wn, [["__scopeId", "data-v-4dfa8248"]]), xn = { class: "fr-table" }, Dn = { class: "fr-table__wrapper" }, In = { class: "fr-table__container" }, Cn = { class: "fr-table__content" }, Tn = ["id"], Bn = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, En = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Sn = ["id", "checked"], An = ["for"], Mn = ["tabindex", "onClick", "onKeydown"], Ln = { key: 0 }, Fn = { key: 1 }, Pn = ["data-row-key"], Nn = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Vn = { class: "fr-checkbox-group fr-checkbox-group--sm" }, jn = ["id", "value"], Rn = ["for"], On = ["onKeydown"], qn = { class: "flex gap-2 items-center" }, zn = ["selected"], Qn = ["value", "selected"], Hn = { class: "flex ml-1" }, Gn = { class: "self-center" }, Kn = /* @__PURE__ */ T({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Me({
    id: { default: () => W("table") },
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
  emits: /* @__PURE__ */ Me(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(t, { emit: e }) {
    const a = t, r = e, l = fe(t, "selection"), n = fe(t, "rowsPerPage"), o = fe(t, "currentPage"), s = h(() => Math.ceil(a.rows.length / n.value)), d = h(() => a.pages ?? Array.from({ length: s.value }).map((k, F) => ({ label: `${F + 1}`, title: `Page ${F + 1}`, href: `#${F + 1}` }))), u = h(() => o.value * n.value), p = h(() => (o.value + 1) * n.value);
    function v(k, F) {
      const C = a.sorted;
      return (k[C] ?? k) < (F[C] ?? F) ? -1 : (k[C] ?? k) > (F[C] ?? F) ? 1 : 0;
    }
    const y = fe(t, "sortedBy"), D = fe(t, "sortedDesc");
    function w(k) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(k))) {
        if (y.value === k) {
          if (D.value) {
            y.value = void 0, D.value = !1;
            return;
          }
          D.value = !0;
          return;
        }
        D.value = !1, y.value = k;
      }
    }
    const L = h(() => {
      const k = y.value ? a.rows.slice().sort(a.sortFn ?? v) : a.rows.slice();
      return D.value && k.reverse(), k;
    }), g = h(() => {
      const k = a.headersRow.map((C) => typeof C != "object" ? C : C.key), F = L.value.map((C) => Array.isArray(C) ? C : k.map((H) => typeof C != "object" ? C : C[H] ?? C));
      return a.pagination ? F.slice(u.value, p.value) : F;
    });
    function I(k) {
      if (k) {
        const F = a.headersRow.findIndex((C) => C.key ?? C);
        l.value = g.value.map((C) => C[F]);
      }
      l.value.length = 0;
    }
    const N = R(!1);
    function z() {
      N.value = l.value.length === g.value.length;
    }
    function E() {
      r("update:current-page", 0), N.value = !1, l.value.length = 0;
    }
    function Q(k) {
      navigator.clipboard.writeText(k);
    }
    return (k, F) => (i(), f("div", xn, [
      c("div", Dn, [
        c("div", In, [
          c("div", Cn, [
            c("table", { id: k.id }, [
              c("caption", null, m(k.title), 1),
              c("thead", null, [
                c("tr", null, [
                  k.selectableRows ? (i(), f("th", Bn, [
                    c("div", En, [
                      c("input", {
                        id: `table-select--${k.id}-all`,
                        checked: N.value,
                        type: "checkbox",
                        onInput: F[0] || (F[0] = (C) => I(C.target.checked))
                      }, null, 40, Sn),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${k.id}-all`
                      }, " Sélectionner tout ", 8, An)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(V, null, q(k.headersRow, (C, H) => (i(), f("th", j({
                    key: typeof C == "object" ? C.key : C,
                    scope: "col",
                    ref_for: !0
                  }, typeof C == "object" && C.headerAttrs, {
                    tabindex: k.sortableRows ? 0 : void 0,
                    onClick: (_) => w(C.key ?? (Array.isArray(k.rows[0]) ? H : C)),
                    onKeydown: [
                      _e((_) => w(C.key ?? C), ["enter"]),
                      _e((_) => w(C.key ?? C), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: A({ "sortable-header": k.sortableRows === !0 || Array.isArray(k.sortableRows) && k.sortableRows.includes(C.key ?? C) })
                    }, [
                      B(k.$slots, "header", j({ ref_for: !0 }, typeof C == "object" ? C : { key: C, label: C }), () => [
                        M(m(typeof C == "object" ? C.label : C), 1)
                      ], !0),
                      y.value !== (C.key ?? C) && (k.sortableRows === !0 || Array.isArray(k.sortableRows) && k.sortableRows.includes(C.key ?? C)) ? (i(), f("span", Ln, [
                        K(ae, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : y.value === (C.key ?? C) ? (i(), f("span", Fn, [
                        K(ae, {
                          name: D.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Mn))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(V, null, q(g.value, (C, H) => (i(), f("tr", {
                  key: `row-${H}`,
                  "data-row-key": H + 1
                }, [
                  k.selectableRows ? (i(), f("th", Nn, [
                    c("div", Vn, [
                      he(c("input", {
                        id: `row-select-${k.id}-${H}`,
                        "onUpdate:modelValue": F[1] || (F[1] = (_) => l.value = _),
                        value: k.rows[H][k.rowKey] ?? `row-${H}`,
                        type: "checkbox",
                        onChange: F[2] || (F[2] = (_) => z())
                      }, null, 40, jn), [
                        [$t, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${k.id}-${H}`
                      }, " Sélectionner la ligne " + m(H + 1), 9, Rn)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(V, null, q(C, (_, x) => (i(), f("td", {
                    key: typeof _ == "object" ? _[k.rowKey] : _,
                    tabindex: "0",
                    onKeydown: [
                      _e($((P) => Q(typeof _ == "object" ? _[k.rowKey] : _), ["ctrl"]), ["c"]),
                      _e($((P) => Q(typeof _ == "object" ? _[k.rowKey] : _), ["meta"]), ["c"])
                    ]
                  }, [
                    B(k.$slots, "cell", j({ ref_for: !0 }, {
                      colKey: typeof k.headersRow[x] == "object" ? k.headersRow[x].key : k.headersRow[x],
                      cell: _
                    }), () => [
                      M(m(typeof _ == "object" ? _[k.rowKey] : _), 1)
                    ], !0)
                  ], 40, On))), 128))
                ], 8, Pn))), 128))
              ])
            ], 8, Tn)
          ])
        ])
      ]),
      c("div", {
        class: A(k.bottomActionBarClass)
      }, [
        B(k.$slots, "pagination", {}, () => [
          k.pagination && !k.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: A(["flex justify-between items-center", k.paginationWrapperClass])
          }, [
            c("div", qn, [
              F[6] || (F[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              he(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": F[3] || (F[3] = (C) => n.value = C),
                class: "fr-select",
                onChange: F[4] || (F[4] = (C) => E())
              }, [
                c("option", {
                  value: "",
                  selected: !k.paginationOptions.includes(n.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, zn),
                (i(!0), f(V, null, q(k.paginationOptions, (C, H) => (i(), f("option", {
                  key: H,
                  value: C,
                  selected: +C === n.value
                }, m(C), 9, Qn))), 128))
              ], 544), [
                [aa, n.value]
              ])
            ]),
            c("div", Hn, [
              c("span", Gn, "Page " + m(o.value + 1) + " sur " + m(s.value), 1)
            ]),
            K(ya, {
              "current-page": o.value,
              "onUpdate:currentPage": F[5] || (F[5] = (C) => o.value = C),
              pages: d.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Xn = /* @__PURE__ */ le(Kn, [["__scopeId", "data-v-1d55e1f1"]]), Wn = "data:image/png;base64,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", Un = { class: "fr-container flex" }, Yn = { class: "half" }, $n = { class: "fr-h1" }, Zn = { class: "flex fr-my-md-3w" }, Jn = { class: "fr-h6" }, eo = /* @__PURE__ */ T({
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
      var r;
      return i(), f("div", Un, [
        c("div", Yn, [
          c("h1", $n, m(e.title), 1),
          c("span", Zn, m(e.subtitle), 1),
          c("p", Jn, m(e.description), 1),
          c("p", null, m(e.help), 1),
          (r = e.buttons) != null && r.length ? (i(), S(Ge, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : b("", !0),
          B(e.$slots, "default", {}, void 0, !0)
        ]),
        a[0] || (a[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: Wn
          })
        ], -1))
      ]);
    };
  }
}), to = /* @__PURE__ */ le(eo, [["__scopeId", "data-v-0f6cf5b4"]]), ao = { class: "fr-fieldset" }, lo = ["id"], ro = {
  key: 1,
  class: "fr-fieldset__element"
}, no = { class: "fr-fieldset__element" }, oo = /* @__PURE__ */ T({
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
      var r, l, n, o;
      return i(), f("fieldset", ao, [
        e.legend || (l = (r = e.$slots).legend) != null && l.call(r).length ? (i(), f("legend", {
          key: 0,
          id: e.legendId,
          class: A(["fr-fieldset__legend", e.legendClass])
        }, [
          M(m(e.legend) + " ", 1),
          B(e.$slots, "legend")
        ], 10, lo)) : b("", !0),
        e.hint || (o = (n = e.$slots).hint) != null && o.call(n).length ? (i(), f("div", ro, [
          c("span", {
            class: A(["fr-hint-text", e.hintClass])
          }, [
            M(m(e.hint) + " ", 1),
            B(e.$slots, "hint")
          ], 2)
        ])) : b("", !0),
        c("div", no, [
          B(e.$slots, "default")
        ])
      ]);
    };
  }
}), io = ["href", "download"], so = { class: "fr-link__detail" }, ka = /* @__PURE__ */ T({
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
      M(m(e.title) + " ", 1),
      c("span", so, m(e.format) + " – " + m(e.size), 1)
    ], 8, io));
  }
}), uo = { class: "fr-downloads-group fr-downloads-group--bordered" }, co = {
  key: 0,
  class: "fr-downloads-group__title"
}, fo = /* @__PURE__ */ T({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", uo, [
      e.title ? (i(), f("h4", co, m(e.title), 1)) : b("", !0),
      c("ul", null, [
        (i(!0), f(V, null, q(e.files, (r, l) => (i(), f("li", { key: l }, [
          K(ka, {
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
}), po = ["for"], vo = {
  key: 0,
  class: "required"
}, mo = {
  key: 1,
  class: "fr-hint-text"
}, go = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], bo = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, ho = ["id"], yo = /* @__PURE__ */ T({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => W("file-upload") },
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
    const a = t, r = e, l = (o) => {
      var s, d;
      r("update:modelValue", (s = o.target) == null ? void 0 : s.value), r("change", (d = o.target) == null ? void 0 : d.files);
    }, n = h(() => Array.isArray(a.accept) ? a.accept.join(",") : a.accept);
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
        M(m(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", vo, " *")) : b("", !0),
        o.hint ? (i(), f("span", mo, m(o.hint), 1)) : b("", !0)
      ], 8, po),
      c("input", j({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: n.value,
        onChange: s[0] || (s[0] = (d) => l(d))
      }), null, 16, go),
      o.error || o.validMessage ? (i(), f("div", bo, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, m(o.error ?? o.validMessage), 9, ho)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), ko = { class: "fr-follow__newsletter" }, _o = { class: "fr-h5 fr-follow__title" }, wo = { class: "fr-text--sm fr-follow__desc" }, xo = { key: 0 }, Do = ["title"], Io = { key: 1 }, Co = { action: "" }, To = {
  class: "fr-label",
  for: "newsletter-email"
}, Bo = { class: "fr-input-wrap fr-input-wrap--addon" }, Eo = ["title", "placeholder", "value"], So = ["title"], Ao = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Mo = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Lo = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, _a = /* @__PURE__ */ T({
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
    const a = e, r = (l) => a("update:email", l.target.value);
    return (l, n) => (i(), f("div", ko, [
      c("div", null, [
        c("h3", _o, m(l.title), 1),
        c("p", wo, m(l.description), 1)
      ]),
      l.onlyCallout ? (i(), f("div", xo, [
        c("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: n[0] || (n[0] = (o) => l.buttonAction ? l.buttonAction(o) : () => {
          })
        }, m(l.buttonText), 9, Do)
      ])) : (i(), f("div", Io, [
        c("form", Co, [
          c("label", To, m(l.labelEmail), 1),
          c("div", Bo, [
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
              onInput: n[1] || (n[1] = (o) => r(o))
            }, null, 40, Eo),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, m(l.buttonText), 9, So)
          ]),
          l.error ? (i(), f("div", Ao, [
            c("p", Mo, m(l.error), 1)
          ])) : b("", !0),
          c("p", Lo, m(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), Fo = { class: "fr-follow__social" }, Po = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, No = ["title", "href"], wa = /* @__PURE__ */ T({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Fo, [
      (i(), S(te(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: O(() => a[0] || (a[0] = [
          M(" Suivez-nous "),
          c("br", null, null, -1),
          M(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (i(), f("ul", Po, [
        (i(!0), f(V, null, q(e.networks, (r, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: A(["fr-btn", `fr-btn--${r.type}`]),
            title: r.name,
            href: r.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, m(r.name), 11, No)
        ]))), 128))
      ])) : b("", !0)
    ]));
  }
}), Vo = { class: "fr-follow" }, jo = { class: "fr-container" }, Ro = { class: "fr-grid-row" }, Oo = /* @__PURE__ */ T({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = h(() => e.networks && e.networks.length), r = h(() => typeof e.newsletterData == "object");
    return (l, n) => (i(), f("div", Vo, [
      c("div", jo, [
        c("div", Ro, [
          B(l.$slots, "default", {}, () => [
            l.newsletterData ? (i(), f("div", {
              key: 0,
              class: A(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              K(_a, oe(ft(l.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            a.value ? (i(), f("div", {
              key: 1,
              class: A(["fr-col-12", { "fr-col-md-4": r.value }])
            }, [
              K(wa, { networks: l.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), qt = 1, xa = /* @__PURE__ */ T({
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
    const e = t, a = h(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("http");
    }), r = h(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("mailto");
    }), l = h(() => e.button ? "button" : a.value || r.value ? "a" : "RouterLink"), n = h(() => {
      if (!(!a.value && !r.value))
        return e.href;
    }), o = h(() => {
      if (!(a.value || r.value))
        return e.to;
    }), s = h(() => o.value ? { to: o.value } : { href: n.value }), d = h(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = h(
      () => typeof e.icon == "string" ? { name: e.icon, scale: qt, ...e.iconAttrs ?? {} } : { scale: qt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, v) => (i(), S(te(l.value), j({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": d.value && p.iconRight,
        "fr-btn--icon-left": d.value && !p.iconRight,
        [String(p.icon)]: d.value
      }]
    }, s.value, {
      target: p.target,
      onClick: $(p.onClick, ["stop"])
    }), {
      default: O(() => {
        var y, D;
        return [
          !d.value && (p.icon || (y = p.iconAttrs) != null && y.name) && !p.iconRight ? (i(), S(ae, j({
            key: 0,
            class: "fr-mr-1w"
          }, u.value), null, 16)) : b("", !0),
          M(" " + m(p.label) + " ", 1),
          !d.value && (p.icon || (D = p.iconAttrs) != null && D.name) && p.iconRight ? (i(), S(ae, j({
            key: 1,
            class: "fr-ml-1w"
          }, u.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), qo = { class: "fr-footer__partners" }, zo = {
  key: 0,
  class: "fr-footer__partners-title"
}, Qo = { class: "fr-footer__partners-logos" }, Ho = {
  key: 0,
  class: "fr-footer__partners-main"
}, Go = ["href"], Ko = ["src", "alt"], Xo = { class: "fr-footer__partners-sub" }, Wo = ["href"], Uo = ["src", "alt"], Da = /* @__PURE__ */ T({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", qo, [
      e.title ? (i(), f("h4", zo, m(e.title), 1)) : b("", !0),
      c("div", Qo, [
        e.mainPartner ? (i(), f("div", Ho, [
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
            }, null, 8, Ko)
          ], 8, Go)
        ])) : b("", !0),
        c("div", Xo, [
          c("ul", null, [
            (i(!0), f(V, null, q(e.subPartners, (r, l) => (i(), f("li", { key: l }, [
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
                }, null, 8, Uo)
              ], 8, Wo)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Yo = ["innerHTML"], Fe = /* @__PURE__ */ T({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(t) {
    const e = t, a = h(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (r, l) => (i(), f("p", {
      class: A(["fr-logo", {
        "fr-logo--sm": r.small && !r.large,
        "fr-logo--lg": r.large && !r.small
      }]),
      innerHTML: a.value
    }, null, 10, Yo));
  }
}), $o = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, Zo = {
  key: 0,
  class: "fr-footer__top"
}, Jo = { class: "fr-container" }, ei = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, ti = { class: "fr-container" }, ai = { class: "fr-footer__body" }, li = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, ri = ["href"], ni = ["src", "alt"], oi = ["src", "alt"], ii = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, si = { class: "fr-footer__content" }, di = { class: "fr-footer__content-desc" }, ui = { class: "fr-footer__content-list" }, ci = ["href", "title"], fi = { class: "fr-footer__bottom" }, pi = { class: "fr-footer__bottom-list" }, vi = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, mi = /* @__PURE__ */ T({
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
    const e = t, a = h(() => [
      ...e.beforeMandatoryLinks,
      ...e.mandatoryLinks,
      ...e.afterMandatoryLinks
    ]), r = Jt(), l = h(() => {
      var p;
      return (p = r["footer-link-lists"]) == null ? void 0 : p.call(r).length;
    }), n = h(() => {
      const p = e.licenceTo || e.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = h(() => {
      const { to: p, href: v, ...y } = e.licenceLinkProps ?? {};
      return y;
    }), s = h(() => n.value ? "" : e.licenceTo), d = h(() => n.value ? e.licenceTo : ""), u = h(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (p, v) => {
      const y = ie("RouterLink");
      return i(), f("footer", $o, [
        l.value ? (i(), f("div", Zo, [
          c("div", Jo, [
            c("div", ei, [
              B(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : b("", !0),
        c("div", ti, [
          c("div", ai, [
            p.operatorImgSrc ? (i(), f("div", li, [
              K(Fe, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              u.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: se(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, ni)
              ], 8, ri)) : (i(), S(y, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: O(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: se(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, oi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", ii, [
              K(y, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: O(() => [
                  K(Fe, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", si, [
              c("p", di, [
                B(p.$slots, "description", {}, () => [
                  M(m(p.descText), 1)
                ], !0)
              ]),
              c("ul", ui, [
                (i(!0), f(V, null, q(p.ecosystemLinks, ({ href: D, label: w, title: L, ...g }, I) => (i(), f("li", {
                  key: I,
                  class: "fr-footer__content-item"
                }, [
                  c("a", j({
                    class: "fr-footer__content-link",
                    href: D,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: L,
                    ref_for: !0
                  }, g), m(w), 17, ci)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), S(Da, oe(j({ key: 0 }, p.partners)), null, 16)) : b("", !0),
          c("div", fi, [
            c("ul", pi, [
              (i(!0), f(V, null, q(a.value, (D, w) => (i(), f("li", {
                key: w,
                class: "fr-footer__bottom-item"
              }, [
                K(xa, j({ ref_for: !0 }, D), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", vi, [
              c("p", null, [
                M(m(p.licenceText) + " ", 1),
                (i(), S(te(n.value ? "a" : "RouterLink"), j({
                  class: "fr-link-licence no-content-after",
                  to: n.value ? void 0 : s.value,
                  href: n.value ? d.value : void 0,
                  target: n.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: O(() => [
                    M(m(p.licenceName), 1)
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
}), gi = /* @__PURE__ */ le(mi, [["__scopeId", "data-v-4d6f52aa"]]), bi = { class: "fr-footer__top-cat" }, hi = { class: "fr-footer__top-list" }, yi = ["href"], ki = /* @__PURE__ */ T({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const r = ie("RouterLink");
      return i(), f("div", null, [
        c("h3", bi, m(e.categoryName), 1),
        c("ul", hi, [
          (i(!0), f(V, null, q(e.links, (l, n) => (i(), f("li", { key: n }, [
            typeof l.to == "string" && l.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: l.to
            }, m(l.label), 9, yi)) : b("", !0),
            typeof l.to == "object" || typeof l.to == "string" && !l.to.startsWith("http") ? (i(), S(r, {
              key: 1,
              class: "fr-footer__top-link",
              to: l.to
            }, {
              default: O(() => [
                M(m(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : b("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), _i = { class: "fr-connect-group" }, wi = { class: "fr-connect__brand" }, xi = ["href", "title"], Di = /* @__PURE__ */ T({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", _i, [
      c("button", {
        class: A(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        a[0] || (a[0] = c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        c("span", wi, "FranceConnect" + m(e.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, m(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, xi)
      ])
    ]));
  }
}), Ii = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Ci = { class: "fr-nav__item" }, Ti = ["aria-controls", "aria-expanded"], Bi = { class: "fr-hidden-lg" }, Ei = ["id"], Si = { class: "fr-menu__list" }, Ai = ["hreflang", "lang", "aria-current", "href", "onClick"], it = /* @__PURE__ */ T({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => W("translate") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" }
  },
  emits: ["select"],
  setup(t, { emit: e }) {
    const a = t, r = e, {
      collapse: l,
      collapsing: n,
      cssExpanded: o,
      doExpand: s,
      onTransitionEnd: d
    } = ce(), u = R(!1);
    function p(y) {
      u.value = !1, r("select", y);
    }
    const v = h(
      () => a.languages.find(({ codeIso: y }) => y === a.currentLanguage)
    );
    return ee(u, (y, D) => {
      y !== D && s(y);
    }), (y, D) => {
      var w, L;
      return i(), f("nav", Ii, [
        c("div", Ci, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": y.id,
            "aria-expanded": u.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: D[0] || (D[0] = $((g) => u.value = !u.value, ["prevent", "stop"]))
          }, [
            M(m((w = v.value) == null ? void 0 : w.codeIso.toUpperCase()), 1),
            c("span", Bi, " - " + m((L = v.value) == null ? void 0 : L.label), 1)
          ], 8, Ti),
          c("div", {
            id: y.id,
            ref_key: "collapse",
            ref: l,
            class: A(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": G(o), "fr-collapsing": G(n) }]),
            onTransitionend: D[1] || (D[1] = (g) => G(d)(u.value))
          }, [
            c("ul", Si, [
              (i(!0), f(V, null, q(y.languages, (g, I) => (i(), f("li", { key: I }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: g.codeIso,
                  lang: g.codeIso,
                  "aria-current": y.currentLanguage === g.codeIso ? !0 : void 0,
                  href: `#${g.codeIso}`,
                  onClick: $((N) => p(g), ["prevent", "stop"])
                }, m(`${g.codeIso.toUpperCase()} - ${g.label}`), 9, Ai)
              ]))), 128))
            ])
          ], 42, Ei)
        ])
      ]);
    };
  }
}), Mi = ["for"], Li = {
  key: 0,
  class: "required"
}, Fi = {
  key: 0,
  class: "fr-hint-text"
}, Pi = /* @__PURE__ */ T({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => W("basic", "input") },
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
    const a = t, r = ll(), l = R(null), n = () => {
      var u;
      return (u = l.value) == null ? void 0 : u.focus();
    }, o = h(() => a.isTextarea ? "textarea" : "input"), s = h(() => a.isWithWrapper || r.type === "date" || !!a.wrapperClass), d = h(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: n
    }), (u, p) => (i(), f(V, null, [
      c("label", {
        class: A(d.value),
        for: u.id
      }, [
        B(u.$slots, "label", {}, () => [
          M(m(u.label) + " ", 1),
          B(u.$slots, "required-tip", {}, () => [
            "required" in u.$attrs && u.$attrs.required !== !1 ? (i(), f("span", Li, "*")) : b("", !0)
          ], !0)
        ], !0),
        u.hint ? (i(), f("span", Fi, m(u.hint), 1)) : b("", !0)
      ], 10, Mi),
      s.value ? (i(), f("div", {
        key: 1,
        class: A([
          { "fr-input-wrap": u.isWithWrapper || u.$attrs.type === "date" },
          u.wrapperClass
        ])
      }, [
        (i(), S(te(o.value), j({ id: u.id }, u.$attrs, {
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
      ], 2)) : (i(), S(te(o.value), j({
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
}), wt = /* @__PURE__ */ le(Pi, [["__scopeId", "data-v-6e6c295a"]]), st = /* @__PURE__ */ T({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => W("search", "input") },
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
    return (r, l) => (i(), f("div", {
      class: A(["fr-search-bar", { "fr-search-bar--lg": r.large }]),
      role: "search"
    }, [
      K(wt, {
        id: r.id,
        type: "search",
        placeholder: r.placeholder,
        "model-value": r.modelValue,
        "label-visible": r.labelVisible,
        label: r.label,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        "onUpdate:modelValue": l[0] || (l[0] = (n) => a("update:modelValue", n)),
        onKeydown: l[1] || (l[1] = _e((n) => a("search", r.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      K(Ce, {
        title: "Rechercher",
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        onClick: l[2] || (l[2] = (n) => a("search", r.modelValue))
      }, {
        default: O(() => [
          M(m(r.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), zt = 1, Ia = /* @__PURE__ */ T({
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
    const e = t, a = h(() => typeof e.path == "string"), r = h(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("http")) || a.value && e.path.startsWith("http") || typeof e.to == "string" && e.to.startsWith("http");
    }), l = h(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("mailto")) || a.value && e.path.startsWith("mailto") || typeof e.to == "string" && e.to.startsWith("mailto");
    }), n = h(() => e.button ? "button" : r.value || l.value ? "a" : "RouterLink"), o = h(() => {
      if (!(!r.value && !l.value))
        return e.to ?? e.href ?? e.path;
    }), s = h(() => {
      if (!(r.value || l.value))
        return e.to ?? e.path;
    }), d = h(() => s.value ? { to: s.value } : { href: o.value }), u = h(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = h(
      () => typeof e.icon == "string" ? { name: e.icon, scale: zt, ...e.iconAttrs ?? {} } : { scale: zt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (v, y) => (i(), S(te(n.value), j({
      class: ["fr-btn", {
        "fr-btn--icon-right": u.value && v.iconRight,
        "fr-btn--icon-left": u.value && !v.iconRight,
        [String(v.icon)]: u.value
      }]
    }, d.value, {
      target: v.target,
      onClick: y[0] || (y[0] = $((D) => v.onClick(D), ["stop"]))
    }), {
      default: O(() => {
        var D, w;
        return [
          !u.value && (v.icon || (D = v.iconAttrs) != null && D.name) && !v.iconRight ? (i(), S(ae, j({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          M(" " + m(v.label) + " ", 1),
          !u.value && (v.icon || (w = v.iconAttrs) != null && w.name) && v.iconRight ? (i(), S(ae, j({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Ni = ["aria-label"], Vi = { class: "fr-btns-group" }, dt = /* @__PURE__ */ T({
  __name: "DsfrHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(t, { emit: e }) {
    const a = e;
    return (r, l) => (i(), f("nav", {
      role: "navigation",
      "aria-label": r.navAriaLabel
    }, [
      c("ul", Vi, [
        (i(!0), f(V, null, q(r.links, (n, o) => (i(), f("li", { key: o }, [
          K(Ia, j({ ref_for: !0 }, n, {
            "on-click": (s) => {
              var d;
              a("linkClick", s), (d = n.onClick) == null || d.call(n, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Ni));
  }
}), ji = {
  role: "banner",
  class: "fr-header"
}, Ri = { class: "fr-header__body" }, Oi = { class: "fr-container width-inherit" }, qi = { class: "fr-header__body-row" }, zi = { class: "fr-header__brand fr-enlarge-link" }, Qi = { class: "fr-header__brand-top" }, Hi = { class: "fr-header__logo" }, Gi = {
  key: 0,
  class: "fr-header__operator"
}, Ki = ["src", "alt"], Xi = {
  key: 1,
  class: "fr-header__navbar"
}, Wi = ["aria-label", "title", "data-fr-opened"], Ui = ["aria-label", "title"], Yi = {
  key: 0,
  class: "fr-header__service"
}, $i = { class: "fr-header__service-title" }, Zi = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Ji = {
  key: 0,
  class: "fr-header__service-tagline"
}, es = {
  key: 1,
  class: "fr-header__service"
}, ts = { class: "fr-header__tools" }, as = {
  key: 0,
  class: "fr-header__tools-links"
}, ls = {
  key: 1,
  class: "fr-header__search fr-modal"
}, rs = ["aria-label"], ns = { class: "fr-container" }, os = { class: "fr-header__menu-links" }, is = { role: "navigation" }, ss = {
  key: 1,
  class: "flex justify-center items-center"
}, ds = { class: "fr-header__menu fr-modal" }, us = {
  key: 0,
  class: "fr-container"
}, cs = /* @__PURE__ */ T({
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
    const a = t, r = e, l = Oe(a, "languageSelector"), n = R(!1), o = R(!1), s = R(!1), d = () => {
      var g;
      s.value = !1, n.value = !1, o.value = !1, (g = document.getElementById("button-menu")) == null || g.focus();
    }, u = (g) => {
      g.key === "Escape" && d();
    };
    ne(() => {
      document.addEventListener("keydown", u);
    }), ue(() => {
      document.removeEventListener("keydown", u);
    });
    const p = () => {
      var g;
      s.value = !0, n.value = !0, o.value = !1, (g = document.getElementById("close-button")) == null || g.focus();
    }, v = () => {
      s.value = !0, n.value = !1, o.value = !0;
    }, y = d, D = Jt(), w = h(() => {
      var g;
      return !!((g = D.operator) != null && g.call(D).length) || !!a.operatorImgSrc;
    }), L = h(() => !!D.mainnav);
    return ct(vt, () => d), (g, I) => {
      var N, z, E;
      const Q = ie("RouterLink");
      return i(), f("header", ji, [
        c("div", Ri, [
          c("div", Oi, [
            c("div", qi, [
              c("div", zi, [
                c("div", Qi, [
                  c("div", Hi, [
                    K(Q, {
                      to: g.homeTo,
                      title: `${g.homeLabel} - ${g.serviceTitle}`
                    }, {
                      default: O(() => [
                        K(Fe, {
                          "logo-text": g.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  w.value ? (i(), f("div", Gi, [
                    B(g.$slots, "operator", {}, () => [
                      g.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: g.operatorImgSrc,
                        alt: g.operatorImgAlt,
                        style: se(g.operatorImgStyle)
                      }, null, 12, Ki)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  g.showSearch || L.value || (N = g.quickLinks) != null && N.length ? (i(), f("div", Xi, [
                    g.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": g.showSearchLabel,
                      title: g.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: I[0] || (I[0] = $((k) => v(), ["prevent", "stop"]))
                    }, null, 8, Wi)) : b("", !0),
                    L.value || (z = g.quickLinks) != null && z.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": g.menuLabel,
                      title: g.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: I[1] || (I[1] = $((k) => p(), ["prevent", "stop"]))
                    }, null, 8, Ui)) : b("", !0)
                  ])) : b("", !0)
                ]),
                g.serviceTitle ? (i(), f("div", Yi, [
                  K(Q, j({
                    to: g.homeTo,
                    title: `${g.homeLabel} - ${g.serviceTitle}`
                  }, g.$attrs), {
                    default: O(() => [
                      c("p", $i, [
                        M(m(g.serviceTitle) + " ", 1),
                        g.showBeta ? (i(), f("span", Zi, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  g.serviceDescription ? (i(), f("p", Ji, m(g.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !g.serviceTitle && g.showBeta ? (i(), f("div", es, I[9] || (I[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", ts, [
                (E = g.quickLinks) != null && E.length || l.value ? (i(), f("div", as, [
                  n.value ? b("", !0) : (i(), S(dt, {
                    key: 0,
                    links: g.quickLinks,
                    "nav-aria-label": g.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (i(), S(it, j({ key: 1 }, l.value, {
                    onSelect: I[2] || (I[2] = (k) => r("language-select", k))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                g.showSearch ? (i(), f("div", ls, [
                  K(st, {
                    "searchbar-id": g.searchbarId,
                    label: g.searchLabel,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": I[3] || (I[3] = (k) => r("update:modelValue", k)),
                    onSearch: I[4] || (I[4] = (k) => r("search", k))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ]),
            g.showSearch || L.value || g.quickLinks && g.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: A(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": g.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", ns, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: I[5] || (I[5] = $((k) => d(), ["prevent", "stop"]))
                }, m(g.closeMenuModalLabel), 1),
                c("div", os, [
                  l.value ? (i(), S(it, j({ key: 0 }, l.value, {
                    onSelect: I[6] || (I[6] = (k) => l.value.currentLanguage = k.codeIso)
                  }), null, 16)) : b("", !0),
                  c("nav", is, [
                    n.value ? (i(), S(dt, {
                      key: 0,
                      role: "navigation",
                      links: g.quickLinks,
                      "nav-aria-label": g.quickLinksAriaLabel,
                      onLinkClick: G(y)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0)
                  ])
                ]),
                s.value ? B(g.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : b("", !0),
                o.value ? (i(), f("div", ss, [
                  K(st, {
                    "searchbar-id": g.searchbarId,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    "onUpdate:modelValue": I[7] || (I[7] = (k) => r("update:modelValue", k)),
                    onSearch: I[8] || (I[8] = (k) => r("search", k))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, rs)) : b("", !0),
            B(g.$slots, "default")
          ])
        ]),
        c("div", ds, [
          L.value && !s.value ? (i(), f("div", us, [
            B(g.$slots, "mainnav", { hidemodal: d })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), fs = /* @__PURE__ */ T({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", {
      class: A(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      c("p", {
        class: A({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        M(m(e.text) + " ", 1),
        B(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), ps = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, vs = ["id", "data-testid"], ms = ["id", "data-testid"], gs = ["id", "data-testid"], bs = ["id", "data-testid"], hs = /* @__PURE__ */ T({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => W("basic", "input") },
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
      class: A(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      B(e.$slots, "before-input"),
      B(e.$slots, "default"),
      e.$slots.default ? b("", !0) : (i(), S(wt, j({ key: 0 }, e.$attrs, {
        "is-valid": !!e.validMessage,
        "is-invalid": !!e.errorMessage,
        label: e.label,
        hint: e.hint,
        "description-id": (e.errorMessage || e.validMessage) && e.descriptionId || void 0,
        "label-visible": e.labelVisible,
        "model-value": e.modelValue,
        placeholder: e.placeholder,
        "onUpdate:modelValue": a[0] || (a[0] = (r) => e.$emit("update:modelValue", r))
      }), null, 16, ["is-valid", "is-invalid", "label", "hint", "description-id", "label-visible", "model-value", "placeholder"])),
      c("div", ps, [
        Array.isArray(e.errorMessage) ? (i(!0), f(V, { key: 0 }, q(e.errorMessage, (r) => (i(), f("p", {
          id: e.descriptionId,
          key: r,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, m(r), 9, vs))), 128)) : e.errorMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, m(e.errorMessage), 9, ms)) : b("", !0),
        Array.isArray(e.validMessage) ? (i(!0), f(V, { key: 2 }, q(e.validMessage, (r) => (i(), f("p", {
          id: e.descriptionId,
          key: r,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, m(r), 9, gs))), 128)) : e.validMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, m(e.validMessage), 9, bs)) : b("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var Ca = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Pe = /* @__PURE__ */ Ca.join(","), Ta = typeof Element > "u", me = Ta ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Ne = !Ta && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, Ve = function t(e, a) {
  var r;
  a === void 0 && (a = !0);
  var l = e == null || (r = e.getAttribute) === null || r === void 0 ? void 0 : r.call(e, "inert"), n = l === "" || l === "true", o = n || a && e && t(e.parentNode);
  return o;
}, ys = function(t) {
  var e, a = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return a === "" || a === "true";
}, Ba = function(t, e, a) {
  if (Ve(t))
    return [];
  var r = Array.prototype.slice.apply(t.querySelectorAll(Pe));
  return e && me.call(t, Pe) && r.unshift(t), r = r.filter(a), r;
}, Ea = function t(e, a, r) {
  for (var l = [], n = Array.from(e); n.length; ) {
    var o = n.shift();
    if (!Ve(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), d = s.length ? s : o.children, u = t(d, !0, r);
        r.flatten ? l.push.apply(l, u) : l.push({
          scopeParent: o,
          candidates: u
        });
      } else {
        var p = me.call(o, Pe);
        p && r.filter(o) && (a || !e.includes(o)) && l.push(o);
        var v = o.shadowRoot || // check for an undisclosed shadow
        typeof r.getShadowRoot == "function" && r.getShadowRoot(o), y = !Ve(v, !1) && (!r.shadowRootFilter || r.shadowRootFilter(o));
        if (v && y) {
          var D = t(v === !0 ? o.children : v.children, !0, r);
          r.flatten ? l.push.apply(l, D) : l.push({
            scopeParent: o,
            candidates: D
          });
        } else
          n.unshift.apply(n, o.children);
      }
  }
  return l;
}, Sa = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, pe = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || ys(t)) && !Sa(t) ? 0 : t.tabIndex;
}, ks = function(t, e) {
  var a = pe(t);
  return a < 0 && e && !Sa(t) ? 0 : a;
}, _s = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, Aa = function(t) {
  return t.tagName === "INPUT";
}, ws = function(t) {
  return Aa(t) && t.type === "hidden";
}, xs = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return e;
}, Ds = function(t, e) {
  for (var a = 0; a < t.length; a++)
    if (t[a].checked && t[a].form === e)
      return t[a];
}, Is = function(t) {
  if (!t.name)
    return !0;
  var e = t.form || Ne(t), a = function(n) {
    return e.querySelectorAll('input[type="radio"][name="' + n + '"]');
  }, r;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    r = a(window.CSS.escape(t.name));
  else
    try {
      r = a(t.name);
    } catch (n) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", n.message), !1;
    }
  var l = Ds(r, t.form);
  return !l || l === t;
}, Cs = function(t) {
  return Aa(t) && t.type === "radio";
}, Ts = function(t) {
  return Cs(t) && !Is(t);
}, Bs = function(t) {
  var e, a = t && Ne(t), r = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var n, o, s;
    for (l = !!((n = r) !== null && n !== void 0 && (o = n.ownerDocument) !== null && o !== void 0 && o.contains(r) || t != null && (s = t.ownerDocument) !== null && s !== void 0 && s.contains(t)); !l && r; ) {
      var d, u, p;
      a = Ne(r), r = (d = a) === null || d === void 0 ? void 0 : d.host, l = !!((u = r) !== null && u !== void 0 && (p = u.ownerDocument) !== null && p !== void 0 && p.contains(r));
    }
  }
  return l;
}, Qt = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, r = e.height;
  return a === 0 && r === 0;
}, Es = function(t, e) {
  var a = e.displayCheck, r = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = me.call(t, "details>summary:first-of-type"), n = l ? t.parentElement : t;
  if (me.call(n, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof r == "function") {
      for (var o = t; t; ) {
        var s = t.parentElement, d = Ne(t);
        if (s && !s.shadowRoot && r(s) === !0)
          return Qt(t);
        t.assignedSlot ? t = t.assignedSlot : !s && d !== t.ownerDocument ? t = d.host : t = s;
      }
      t = o;
    }
    if (Bs(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Qt(t);
  return !1;
}, Ss = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var a = 0; a < e.children.length; a++) {
          var r = e.children.item(a);
          if (r.tagName === "LEGEND")
            return me.call(e, "fieldset[disabled] *") ? !0 : !r.contains(t);
        }
        return !0;
      }
      e = e.parentElement;
    }
  return !1;
}, je = function(t, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Ve(e) || ws(e) || Es(e, t) || // For a details element with a summary, the summary element gets the focus
  xs(e) || Ss(e));
}, ut = function(t, e) {
  return !(Ts(e) || pe(e) < 0 || !je(t, e));
}, As = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, Ms = function t(e) {
  var a = [], r = [];
  return e.forEach(function(l, n) {
    var o = !!l.scopeParent, s = o ? l.scopeParent : l, d = ks(s, o), u = o ? t(l.candidates) : s;
    d === 0 ? o ? a.push.apply(a, u) : a.push(s) : r.push({
      documentOrder: n,
      tabIndex: d,
      item: l,
      isScope: o,
      content: u
    });
  }), r.sort(_s).reduce(function(l, n) {
    return n.isScope ? l.push.apply(l, n.content) : l.push(n.content), l;
  }, []).concat(a);
}, Ls = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Ea([t], e.includeContainer, {
    filter: ut.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: As
  }) : a = Ba(t, e.includeContainer, ut.bind(null, e)), Ms(a);
}, Fs = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Ea([t], e.includeContainer, {
    filter: je.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = Ba(t, e.includeContainer, je.bind(null, e)), a;
}, be = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return me.call(t, Pe) === !1 ? !1 : ut(e, t);
}, Ps = /* @__PURE__ */ Ca.concat("iframe").join(","), $e = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return me.call(t, Ps) === !1 ? !1 : je(e, t);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Ht(t, e) {
  var a = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(l) {
      return Object.getOwnPropertyDescriptor(t, l).enumerable;
    })), a.push.apply(a, r);
  }
  return a;
}
function Gt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ht(Object(a), !0).forEach(function(r) {
      Ns(t, r, a[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : Ht(Object(a)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(a, r));
    });
  }
  return t;
}
function Ns(t, e, a) {
  return e = js(e), e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function Vs(t, e) {
  if (typeof t != "object" || t === null) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var r = a.call(t, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function js(t) {
  var e = Vs(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
var Kt = {
  activateTrap: function(t, e) {
    if (t.length > 0) {
      var a = t[t.length - 1];
      a !== e && a.pause();
    }
    var r = t.indexOf(e);
    r === -1 || t.splice(r, 1), t.push(e);
  },
  deactivateTrap: function(t, e) {
    var a = t.indexOf(e);
    a !== -1 && t.splice(a, 1), t.length > 0 && t[t.length - 1].unpause();
  }
}, Rs = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, Os = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, xe = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, qs = function(t) {
  return xe(t) && !t.shiftKey;
}, zs = function(t) {
  return xe(t) && t.shiftKey;
}, Xt = function(t) {
  return setTimeout(t, 0);
}, Wt = function(t, e) {
  var a = -1;
  return t.every(function(r, l) {
    return e(r) ? (a = l, !1) : !0;
  }), a;
}, ke = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    a[r - 1] = arguments[r];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, Ee = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, Qs = [], Hs = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, r = (e == null ? void 0 : e.trapStack) || Qs, l = Gt({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: qs,
    isKeyBackward: zs
  }, e), n = {
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
  }, o, s = function(_, x, P) {
    return _ && _[x] !== void 0 ? _[x] : l[P || x];
  }, d = function(_, x) {
    var P = typeof (x == null ? void 0 : x.composedPath) == "function" ? x.composedPath() : void 0;
    return n.containerGroups.findIndex(function(U) {
      var X = U.container, Y = U.tabbableNodes;
      return X.contains(_) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (P == null ? void 0 : P.includes(X)) || Y.find(function(Z) {
        return Z === _;
      });
    });
  }, u = function(_) {
    var x = l[_];
    if (typeof x == "function") {
      for (var P = arguments.length, U = new Array(P > 1 ? P - 1 : 0), X = 1; X < P; X++)
        U[X - 1] = arguments[X];
      x = x.apply(void 0, U);
    }
    if (x === !0 && (x = void 0), !x) {
      if (x === void 0 || x === !1)
        return x;
      throw new Error("`".concat(_, "` was specified but was not a node, or did not return a node"));
    }
    var Y = x;
    if (typeof x == "string" && (Y = a.querySelector(x), !Y))
      throw new Error("`".concat(_, "` as selector refers to no known node"));
    return Y;
  }, p = function() {
    var _ = u("initialFocus");
    if (_ === !1)
      return !1;
    if (_ === void 0 || !$e(_, l.tabbableOptions))
      if (d(a.activeElement) >= 0)
        _ = a.activeElement;
      else {
        var x = n.tabbableGroups[0], P = x && x.firstTabbableNode;
        _ = P || u("fallbackFocus");
      }
    if (!_)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return _;
  }, v = function() {
    if (n.containerGroups = n.containers.map(function(_) {
      var x = Ls(_, l.tabbableOptions), P = Fs(_, l.tabbableOptions), U = x.length > 0 ? x[0] : void 0, X = x.length > 0 ? x[x.length - 1] : void 0, Y = P.find(function(J) {
        return be(J);
      }), Z = P.slice().reverse().find(function(J) {
        return be(J);
      }), re = !!x.find(function(J) {
        return pe(J) > 0;
      });
      return {
        container: _,
        tabbableNodes: x,
        focusableNodes: P,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: re,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: U,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: X,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: Y,
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
        nextTabbableNode: function(J) {
          var ge = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ye = x.indexOf(J);
          return ye < 0 ? ge ? P.slice(P.indexOf(J) + 1).find(function(de) {
            return be(de);
          }) : P.slice(0, P.indexOf(J)).reverse().find(function(de) {
            return be(de);
          }) : x[ye + (ge ? 1 : -1)];
        }
      };
    }), n.tabbableGroups = n.containerGroups.filter(function(_) {
      return _.tabbableNodes.length > 0;
    }), n.tabbableGroups.length <= 0 && !u("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (n.containerGroups.find(function(_) {
      return _.posTabIndexesFound;
    }) && n.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, y = function _(x) {
    var P = x.activeElement;
    if (P)
      return P.shadowRoot && P.shadowRoot.activeElement !== null ? _(P.shadowRoot) : P;
  }, D = function _(x) {
    if (x !== !1 && x !== y(document)) {
      if (!x || !x.focus) {
        _(p());
        return;
      }
      x.focus({
        preventScroll: !!l.preventScroll
      }), n.mostRecentlyFocusedNode = x, Rs(x) && x.select();
    }
  }, w = function(_) {
    var x = u("setReturnFocus", _);
    return x || (x === !1 ? !1 : _);
  }, L = function(_) {
    var x = _.target, P = _.event, U = _.isBackward, X = U === void 0 ? !1 : U;
    x = x || Ee(P), v();
    var Y = null;
    if (n.tabbableGroups.length > 0) {
      var Z = d(x, P), re = Z >= 0 ? n.containerGroups[Z] : void 0;
      if (Z < 0)
        X ? Y = n.tabbableGroups[n.tabbableGroups.length - 1].lastTabbableNode : Y = n.tabbableGroups[0].firstTabbableNode;
      else if (X) {
        var J = Wt(n.tabbableGroups, function(Xe) {
          var We = Xe.firstTabbableNode;
          return x === We;
        });
        if (J < 0 && (re.container === x || $e(x, l.tabbableOptions) && !be(x, l.tabbableOptions) && !re.nextTabbableNode(x, !1)) && (J = Z), J >= 0) {
          var ge = J === 0 ? n.tabbableGroups.length - 1 : J - 1, ye = n.tabbableGroups[ge];
          Y = pe(x) >= 0 ? ye.lastTabbableNode : ye.lastDomTabbableNode;
        } else xe(P) || (Y = re.nextTabbableNode(x, !1));
      } else {
        var de = Wt(n.tabbableGroups, function(Xe) {
          var We = Xe.lastTabbableNode;
          return x === We;
        });
        if (de < 0 && (re.container === x || $e(x, l.tabbableOptions) && !be(x, l.tabbableOptions) && !re.nextTabbableNode(x)) && (de = Z), de >= 0) {
          var $a = de === n.tabbableGroups.length - 1 ? 0 : de + 1, Dt = n.tabbableGroups[$a];
          Y = pe(x) >= 0 ? Dt.firstTabbableNode : Dt.firstDomTabbableNode;
        } else xe(P) || (Y = re.nextTabbableNode(x));
      }
    } else
      Y = u("fallbackFocus");
    return Y;
  }, g = function(_) {
    var x = Ee(_);
    if (!(d(x, _) >= 0)) {
      if (ke(l.clickOutsideDeactivates, _)) {
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
      ke(l.allowOutsideClick, _) || _.preventDefault();
    }
  }, I = function(_) {
    var x = Ee(_), P = d(x, _) >= 0;
    if (P || x instanceof Document)
      P && (n.mostRecentlyFocusedNode = x);
    else {
      _.stopImmediatePropagation();
      var U, X = !0;
      if (n.mostRecentlyFocusedNode)
        if (pe(n.mostRecentlyFocusedNode) > 0) {
          var Y = d(n.mostRecentlyFocusedNode), Z = n.containerGroups[Y].tabbableNodes;
          if (Z.length > 0) {
            var re = Z.findIndex(function(J) {
              return J === n.mostRecentlyFocusedNode;
            });
            re >= 0 && (l.isKeyForward(n.recentNavEvent) ? re + 1 < Z.length && (U = Z[re + 1], X = !1) : re - 1 >= 0 && (U = Z[re - 1], X = !1));
          }
        } else
          n.containerGroups.some(function(J) {
            return J.tabbableNodes.some(function(ge) {
              return pe(ge) > 0;
            });
          }) || (X = !1);
      else
        X = !1;
      X && (U = L({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: n.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(n.recentNavEvent)
      })), D(U || n.mostRecentlyFocusedNode || p());
    }
    n.recentNavEvent = void 0;
  }, N = function(_) {
    var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    n.recentNavEvent = _;
    var P = L({
      event: _,
      isBackward: x
    });
    P && (xe(_) && _.preventDefault(), D(P));
  }, z = function(_) {
    if (Os(_) && ke(l.escapeDeactivates, _) !== !1) {
      _.preventDefault(), o.deactivate();
      return;
    }
    (l.isKeyForward(_) || l.isKeyBackward(_)) && N(_, l.isKeyBackward(_));
  }, E = function(_) {
    var x = Ee(_);
    d(x, _) >= 0 || ke(l.clickOutsideDeactivates, _) || ke(l.allowOutsideClick, _) || (_.preventDefault(), _.stopImmediatePropagation());
  }, Q = function() {
    if (n.active)
      return Kt.activateTrap(r, o), n.delayInitialFocusTimer = l.delayInitialFocus ? Xt(function() {
        D(p());
      }) : D(p()), a.addEventListener("focusin", I, !0), a.addEventListener("mousedown", g, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", g, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", E, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", z, {
        capture: !0,
        passive: !1
      }), o;
  }, k = function() {
    if (n.active)
      return a.removeEventListener("focusin", I, !0), a.removeEventListener("mousedown", g, !0), a.removeEventListener("touchstart", g, !0), a.removeEventListener("click", E, !0), a.removeEventListener("keydown", z, !0), o;
  }, F = function(_) {
    var x = _.some(function(P) {
      var U = Array.from(P.removedNodes);
      return U.some(function(X) {
        return X === n.mostRecentlyFocusedNode;
      });
    });
    x && D(p());
  }, C = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(F) : void 0, H = function() {
    C && (C.disconnect(), n.active && !n.paused && n.containers.map(function(_) {
      C.observe(_, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return o = {
    get active() {
      return n.active;
    },
    get paused() {
      return n.paused;
    },
    activate: function(_) {
      if (n.active)
        return this;
      var x = s(_, "onActivate"), P = s(_, "onPostActivate"), U = s(_, "checkCanFocusTrap");
      U || v(), n.active = !0, n.paused = !1, n.nodeFocusedBeforeActivation = a.activeElement, x == null || x();
      var X = function() {
        U && v(), Q(), H(), P == null || P();
      };
      return U ? (U(n.containers.concat()).then(X, X), this) : (X(), this);
    },
    deactivate: function(_) {
      if (!n.active)
        return this;
      var x = Gt({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, _);
      clearTimeout(n.delayInitialFocusTimer), n.delayInitialFocusTimer = void 0, k(), n.active = !1, n.paused = !1, H(), Kt.deactivateTrap(r, o);
      var P = s(x, "onDeactivate"), U = s(x, "onPostDeactivate"), X = s(x, "checkCanReturnFocus"), Y = s(x, "returnFocus", "returnFocusOnDeactivate");
      P == null || P();
      var Z = function() {
        Xt(function() {
          Y && D(w(n.nodeFocusedBeforeActivation)), U == null || U();
        });
      };
      return Y && X ? (X(w(n.nodeFocusedBeforeActivation)).then(Z, Z), this) : (Z(), this);
    },
    pause: function(_) {
      if (n.paused || !n.active)
        return this;
      var x = s(_, "onPause"), P = s(_, "onPostPause");
      return n.paused = !0, x == null || x(), k(), H(), P == null || P(), this;
    },
    unpause: function(_) {
      if (!n.paused || !n.active)
        return this;
      var x = s(_, "onUnpause"), P = s(_, "onPostUnpause");
      return n.paused = !1, x == null || x(), v(), Q(), H(), P == null || P(), this;
    },
    updateContainerElements: function(_) {
      var x = [].concat(_).filter(Boolean);
      return n.containers = x.map(function(P) {
        return typeof P == "string" ? a.querySelector(P) : P;
      }), n.active && v(), H(), this;
    }
  }, o.updateContainerElements(t), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Gs = {
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
}, Ks = T({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, Gs),
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
    let r;
    const l = R(null), n = h(() => {
      const s = l.value;
      return s && (s instanceof HTMLElement ? s : s.$el);
    });
    function o() {
      return r || (r = Hs(n.value, {
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
      ee(() => t.active, (s) => {
        s && n.value ? o().activate() : r && (r.deactivate(), (!n.value || n.value.nodeType === Node.COMMENT_NODE) && (r = null));
      }, { immediate: !0, flush: "post" });
    }), ue(() => {
      r && r.deactivate(), r = null;
    }), {
      activate() {
        o().activate();
      },
      deactivate() {
        r && r.deactivate();
      },
      renderImpl() {
        if (!e.default)
          return null;
        const s = e.default().filter((d) => d.type !== Za);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : Ja(s[0], { ref: l });
      }
    };
  }
}), Xs = ["aria-labelledby", "role", "open"], Ws = { class: "fr-container fr-container--fluid fr-container-md" }, Us = { class: "fr-grid-row fr-grid-row--center" }, Ys = { class: "fr-modal__body" }, $s = { class: "fr-modal__header" }, Zs = ["title"], Js = { class: "fr-modal__content" }, ed = ["id"], td = {
  key: 0,
  class: "fr-modal__footer"
}, Ut = 2, ad = /* @__PURE__ */ T({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => W("modal", "dialog") },
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
    const a = t, r = e, l = (w) => {
      w.key === "Escape" && v();
    }, n = h(() => a.isAlert ? "alertdialog" : "dialog"), o = R(null), s = R();
    ee(() => a.opened, (w) => {
      var L, g;
      w ? ((L = s.value) == null || L.showModal(), setTimeout(() => {
        var I;
        (I = o.value) == null || I.focus();
      }, 100)) : (g = s.value) == null || g.close(), d(w);
    });
    function d(w) {
      typeof window < "u" && document.body.classList.toggle("modal-open", w);
    }
    ne(() => {
      u(), d(a.opened);
    }), rl(() => {
      p(), d(!1);
    });
    function u() {
      document.addEventListener("keydown", l);
    }
    function p() {
      document.removeEventListener("keydown", l);
    }
    async function v() {
      var w;
      await ta(), (w = a.origin) == null || w.focus(), r("close");
    }
    const y = h(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), D = h(
      () => y.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: Ut } : { scale: Ut, ...a.icon ?? {} }
    );
    return (w, L) => w.opened ? (i(), S(G(Ks), { key: 0 }, {
      default: O(() => {
        var g, I;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-labelledby": w.modalId,
            role: n.value,
            class: A(["fr-modal", { "fr-modal--opened": w.opened }]),
            open: w.opened
          }, [
            c("div", Ws, [
              c("div", Us, [
                c("div", {
                  class: A(["fr-col-12", {
                    "fr-col-md-8": w.size === "lg",
                    "fr-col-md-6": w.size === "md",
                    "fr-col-md-4": w.size === "sm"
                  }])
                }, [
                  c("div", Ys, [
                    c("div", $s, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: w.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: L[0] || (L[0] = (N) => v())
                      }, [
                        c("span", null, m(w.closeButtonLabel), 1)
                      ], 8, Zs)
                    ]),
                    c("div", Js, [
                      c("h1", {
                        id: w.modalId,
                        class: "fr-modal__title"
                      }, [
                        y.value || D.value ? (i(), f("span", {
                          key: 0,
                          class: A({
                            [String(w.icon)]: y.value
                          })
                        }, [
                          w.icon && D.value ? (i(), S(ae, oe(j({ key: 0 }, D.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        M(" " + m(w.title), 1)
                      ], 8, ed),
                      B(w.$slots, "default", {}, void 0, !0)
                    ]),
                    (g = w.actions) != null && g.length || w.$slots.footer ? (i(), f("div", td, [
                      B(w.$slots, "footer", {}, void 0, !0),
                      (I = w.actions) != null && I.length ? (i(), S(Ge, {
                        key: 0,
                        align: "right",
                        buttons: w.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : b("", !0)
                    ])) : b("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, Xs)
        ];
      }),
      _: 3
    })) : b("", !0);
  }
}), Ma = /* @__PURE__ */ le(ad, [["__scopeId", "data-v-d11515b3"]]), ld = ["id", "aria-current"], rd = /* @__PURE__ */ T({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => W("nav", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-nav__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      B(e.$slots, "default", {}, void 0, !0)
    ], 8, ld));
  }
}), La = /* @__PURE__ */ le(rd, [["__scopeId", "data-v-5909c19f"]]), nd = ["href"], Yt = 2, Ke = /* @__PURE__ */ T({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => W("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, a = h(() => typeof e.to == "string" && e.to.startsWith("http")), r = h(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), l = h(
      () => r.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: Yt, name: e.icon } : { scale: Yt, ...e.icon || {} }
    ), n = el() ? Re(vt) : void 0, o = (n == null ? void 0 : n()) ?? (() => {
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
      }, m(s.text), 9, nd)) : (i(), S(u, {
        key: 1,
        class: A(["fr-nav__link", {
          [String(s.icon)]: r.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: d[1] || (d[1] = (p) => {
          var v;
          G(o)(), s.$emit("toggleId", s.id), (v = s.onClick) == null || v.call(s, p);
        })
      }, {
        default: O(() => [
          s.icon && l.value ? (i(), S(ae, oe(j({ key: 0 }, l.value)), null, 16)) : b("", !0),
          M(" " + m(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), od = { class: "fr-col-12 fr-col-lg-3" }, id = { class: "fr-mega-menu__category" }, sd = { class: "fr-mega-menu__list" }, Fa = /* @__PURE__ */ T({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", od, [
      c("h5", id, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: a[0] || (a[0] = $(() => {
          }, ["prevent"]))
        }, m(e.title), 1)
      ]),
      c("ul", sd, [
        (i(!0), f(V, null, q(e.links, (r, l) => (i(), f("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          K(Ke, j({ ref_for: !0 }, r), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), dd = ["aria-expanded", "aria-current", "aria-controls"], ud = ["id"], cd = { class: "fr-container fr-container--fluid fr-container-lg" }, fd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, pd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, vd = { class: "fr-mega-menu__leader" }, md = { class: "fr-h4 fr-mb-2v" }, gd = { class: "fr-hidden fr-displayed-lg" }, bd = /* @__PURE__ */ T({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => W("menu") },
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
      collapsing: r,
      cssExpanded: l,
      doExpand: n,
      onTransitionEnd: o
    } = ce(), s = h(() => e.id === e.expandedId);
    return ee(s, (d, u) => {
      d !== u && n(d);
    }), ne(() => {
      s.value && n(!0);
    }), (d, u) => {
      const p = ie("RouterLink");
      return i(), f(V, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": d.active || void 0,
          "aria-controls": d.id,
          onClick: u[0] || (u[0] = (v) => d.$emit("toggleId", d.id))
        }, m(d.title), 9, dd),
        c("div", {
          id: d.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: A(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": G(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": G(r)
          }]),
          tabindex: "-1",
          onTransitionend: u[2] || (u[2] = (v) => G(o)(s.value))
        }, [
          c("div", cd, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: u[1] || (u[1] = (v) => d.$emit("toggleId", d.id))
            }, " Fermer "),
            c("div", fd, [
              c("div", pd, [
                c("div", vd, [
                  c("h4", md, m(d.title), 1),
                  c("p", gd, [
                    M(m(d.description) + " ", 1),
                    B(d.$slots, "description", {}, void 0, !0)
                  ]),
                  K(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: d.link.to
                  }, {
                    default: O(() => [
                      M(m(d.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              B(d.$slots, "default", {}, void 0, !0),
              (i(!0), f(V, null, q(d.menus, (v, y) => (i(), S(Fa, j({
                key: y,
                ref_for: !0
              }, v), null, 16))), 128))
            ])
          ])
        ], 42, ud)
      ], 64);
    };
  }
}), Pa = /* @__PURE__ */ le(bd, [["__scopeId", "data-v-7e339b1d"]]), hd = ["id", "aria-current"], Na = /* @__PURE__ */ T({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => W("menu", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-menu__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      B(e.$slots, "default")
    ], 8, hd));
  }
}), yd = ["aria-expanded", "aria-current", "aria-controls"], kd = ["id"], _d = { class: "fr-menu__list" }, Va = /* @__PURE__ */ T({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => W("menu") },
    title: {},
    links: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: r,
      cssExpanded: l,
      doExpand: n,
      onTransitionEnd: o
    } = ce(), s = h(() => e.id === e.expandedId);
    return ee(s, (d, u) => {
      d !== u && n(d);
    }), ne(() => {
      s.value && n(!0);
    }), (d, u) => (i(), f(V, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
        "aria-current": d.active || void 0,
        "aria-controls": d.id,
        onClick: u[0] || (u[0] = (p) => d.$emit("toggleId", d.id))
      }, [
        c("span", null, m(d.title), 1)
      ], 8, yd),
      c("div", {
        id: d.id,
        ref_key: "collapse",
        ref: a,
        class: A(["fr-collapse fr-menu", { "fr-collapse--expanded": G(l), "fr-collapsing": G(r) }]),
        "data-testid": "navigation-menu",
        onTransitionend: u[2] || (u[2] = (p) => G(o)(s.value))
      }, [
        c("ul", _d, [
          B(d.$slots, "default"),
          (i(!0), f(V, null, q(d.links, (p, v) => (i(), S(Na, { key: v }, {
            default: O(() => [
              K(Ke, j({ ref_for: !0 }, p, {
                onToggleId: u[1] || (u[1] = (y) => d.$emit("toggleId", d.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, kd)
    ], 64));
  }
}), wd = ["id", "aria-label"], xd = { class: "fr-nav__list" }, Dd = /* @__PURE__ */ T({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => W("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(t) {
    const e = t, a = R(void 0), r = (s) => {
      if (s === a.value) {
        a.value = void 0;
        return;
      }
      a.value = s;
    }, l = (s) => {
      if (s !== document.getElementById(e.id)) {
        if (!(s != null && s.parentNode)) {
          r(a.value);
          return;
        }
        l(s.parentNode);
      }
    }, n = (s) => {
      l(s.target);
    }, o = (s) => {
      s.key === "Escape" && r(a.value);
    };
    return ne(() => {
      document.addEventListener("click", n), document.addEventListener("keydown", o);
    }), ue(() => {
      document.removeEventListener("click", n), document.removeEventListener("keydown", o);
    }), (s, d) => (i(), f("nav", {
      id: s.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": s.label
    }, [
      c("ul", xd, [
        B(s.$slots, "default"),
        (i(!0), f(V, null, q(s.navItems, (u, p) => (i(), S(La, { key: p }, {
          default: O(() => [
            u.to && u.text ? (i(), S(Ke, j({
              key: 0,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: d[0] || (d[0] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : u.title && u.links ? (i(), S(Va, j({
              key: 1,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: d[1] || (d[1] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : u.title && u.menus ? (i(), S(Pa, j({
              key: 2,
              ref_for: !0
            }, u, {
              "expanded-id": a.value,
              onToggleId: d[2] || (d[2] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, wd));
  }
}), Id = { class: "fr-container" }, Cd = { class: "fr-notice__body" }, Td = { class: "fr-notice__title" }, Bd = { class: "fr-notice__desc" }, Ed = /* @__PURE__ */ T({
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
      class: A(["fr-notice", `fr-notice--${e.type}`])
    }, [
      c("div", Id, [
        c("div", Cd, [
          c("p", null, [
            c("span", Td, [
              B(e.$slots, "default", {}, () => [
                M(m(e.title), 1)
              ])
            ]),
            c("span", Bd, [
              B(e.$slots, "desc", {}, () => [
                M(m(e.desc), 1)
              ])
            ])
          ]),
          e.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: a[0] || (a[0] = (r) => e.$emit("close"))
          }, " Masquer le message ")) : b("", !0)
        ])
      ])
    ], 2));
  }
}), Sd = ["aria-label"], Ad = { class: "fr-content-media__img" }, Md = ["src", "alt", "title", "ratio"], Ld = { class: "fr-content-media__caption" }, Fd = /* @__PURE__ */ T({
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
      class: A(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      c("div", Ad, [
        B(e.$slots, "default", {}, () => [
          e.src ? (i(), f("img", {
            key: 0,
            src: e.src,
            class: A(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, Md)) : b("", !0)
        ])
      ]),
      c("figcaption", Ld, m(e.legend), 1)
    ], 10, Sd));
  }
}), Pd = { class: "fr-quote fr-quote--column" }, Nd = ["cite"], Vd = { class: "fr-quote__author" }, jd = { class: "fr-quote__source" }, Rd = ["href"], Od = {
  key: 0,
  class: "fr-quote__image"
}, qd = ["src"], zd = /* @__PURE__ */ T({
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
    return (e, a) => (i(), f("figure", Pd, [
      e.source ? (i(), f("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        c("p", null, "« " + m(e.quote) + " »", 1)
      ], 8, Nd)) : b("", !0),
      c("figcaption", null, [
        c("p", Vd, m(e.author), 1),
        c("ul", jd, [
          c("li", null, [
            c("cite", null, m(e.source), 1)
          ]),
          (i(!0), f(V, null, q(e.details, (r, l) => (i(), f("li", { key: l }, [
            typeof r == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.url
            }, m(r.label), 9, Rd)) : (i(), f(V, { key: 1 }, [
              M(m(r), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (i(), f("div", Od, [
          c("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, qd)
        ])) : b("", !0)
      ])
    ]));
  }
}), Qd = ["id", "name", "value", "checked", "disabled"], Hd = ["for"], Gd = {
  key: 0,
  class: "required"
}, Kd = {
  key: 0,
  class: "fr-hint-text"
}, Xd = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Wd = ["src", "title"], Ud = { key: 0 }, Yd = ["href"], $d = ["href"], Zd = ["href"], ja = /* @__PURE__ */ T({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => W("basic", "radio") },
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
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, r = h(() => !!e.img || !!e.svgPath);
    return (l, n) => (i(), f("div", {
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: A(["fr-radio-group", {
          "fr-radio-rich": r.value,
          "fr-radio-group--sm": l.small
        }])
      }, [
        c("input", j({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: n[0] || (n[0] = (o) => l.$emit("update:modelValue", l.value))
        }), null, 16, Qd),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          B(l.$slots, "label", {}, () => [
            M(m(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (i(), f("span", Gd, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", Kd, m(l.hint), 1)) : b("", !0)
        ], 8, Hd),
        l.img || l.svgPath ? (i(), f("div", Xd, [
          l.img ? (i(), f("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: "",
            title: l.imgTitle
          }, null, 8, Wd)) : (i(), f("svg", j({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            l.imgTitle ? (i(), f("title", Ud, m(l.imgTitle), 1)) : b("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${l.svgPath}#artwork-decorative`
            }, null, 8, Yd),
            c("use", {
              class: "fr-artwork-minor",
              href: `${l.svgPath}#artwork-minor`
            }, null, 8, $d),
            c("use", {
              class: "fr-artwork-major",
              href: `${l.svgPath}#artwork-major`
            }, null, 8, Zd)
          ], 16))
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Jd = { class: "fr-form-group" }, eu = ["disabled", "aria-labelledby", "aria-invalid", "role"], tu = ["id"], au = {
  key: 0,
  class: "fr-hint-text"
}, lu = {
  key: 0,
  class: "required"
}, ru = ["id"], nu = /* @__PURE__ */ T({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => W("radio-button", "group") },
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
    const a = t, r = e, l = h(() => a.errorMessage || a.validMessage), n = h(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (d) => {
      d !== a.modelValue && r("update:modelValue", d);
    }, s = h(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (d, u) => (i(), f("div", Jd, [
      c("fieldset", {
        class: A(["fr-fieldset", {
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
          B(d.$slots, "legend", {}, () => [
            M(m(d.legend) + " ", 1),
            d.hint || d.$slots.hint ? (i(), f("span", au, [
              B(d.$slots, "hint", {}, () => [
                M(m(d.hint), 1)
              ])
            ])) : b("", !0),
            B(d.$slots, "required-tip", {}, () => [
              d.required ? (i(), f("span", lu, " *")) : b("", !0)
            ])
          ])
        ], 8, tu)) : b("", !0),
        B(d.$slots, "default", {}, () => [
          (i(!0), f(V, null, q(d.options, (p, v) => (i(), S(ja, j({
            key: typeof p.value == "boolean" ? v : p.value || v,
            name: d.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: d.small,
            inline: d.inline,
            "model-value": d.modelValue,
            "onUpdate:modelValue": u[0] || (u[0] = (y) => o(y))
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
            class: A(["fr-message fr-message--info flex items-center", n.value])
          }, m(l.value), 3)
        ], 8, ru)) : b("", !0)
      ], 10, eu)
    ]));
  }
}), ou = ["id"], iu = ["id"], su = { class: "fr-hint-text" }, du = ["data-fr-prefix", "data-fr-suffix"], uu = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], cu = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], fu = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, pu = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, vu = ["id"], mu = ["id"], gu = /* @__PURE__ */ T({
  __name: "DsfrRange",
  props: {
    id: { default: () => W("range") },
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
    const a = t, r = e, l = R(), n = R(), o = R(), s = h(() => a.lowerValue !== void 0), d = h(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * o.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * o.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), u = h(() => {
      const v = (a.modelValue - a.min) / (a.max - a.min) * o.value - (s.value ? 12 : 0), y = ((a.lowerValue ?? 0) - a.min) / (a.max - a.min) * o.value;
      return {
        "--progress-right": `${v + 24}px`,
        ...s.value ? { "--progress-left": `${y + 12}px` } : {}
      };
    });
    ee([() => a.modelValue, () => a.lowerValue], ([v, y]) => {
      y !== void 0 && (s.value && v < y && r("update:lowerValue", v), s.value && y > v && r("update:modelValue", y));
    });
    const p = h(() => (a.prefix ?? "").concat(s.value ? `${a.lowerValue} - ` : "").concat(`${a.modelValue}`).concat(a.suffix ?? ""));
    return ne(() => {
      var v;
      o.value = (v = l.value) == null ? void 0 : v.offsetWidth;
    }), (v, y) => (i(), f("div", {
      id: `${v.id}-group`,
      class: A(["fr-range-group", { "fr-range-group--error": v.message }])
    }, [
      c("label", {
        id: `${v.id}-label`,
        class: "fr-label"
      }, [
        B(v.$slots, "label", {}, () => [
          M(m(v.label), 1)
        ]),
        c("span", su, [
          B(v.$slots, "hint", {}, () => [
            M(m(v.hint), 1)
          ])
        ])
      ], 8, iu),
      c("div", {
        class: A(["fr-range", {
          "fr-range--sm": v.small,
          "fr-range--double": s.value,
          "fr-range-group--disabled": v.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": v.prefix ?? void 0,
        "data-fr-suffix": v.suffix ?? void 0,
        style: se(u.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: n,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: se(d.value)
        }, m(p.value), 5),
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
          onInput: y[0] || (y[0] = (D) => {
            var w;
            return r("update:lowerValue", +((w = D.target) == null ? void 0 : w.value));
          })
        }, null, 40, uu)) : b("", !0),
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
          onInput: y[1] || (y[1] = (D) => {
            var w;
            return r("update:modelValue", +((w = D.target) == null ? void 0 : w.value));
          })
        }, null, 40, cu),
        v.hideIndicators ? b("", !0) : (i(), f("span", fu, m(v.min), 1)),
        v.hideIndicators ? b("", !0) : (i(), f("span", pu, m(v.max), 1))
      ], 14, du),
      v.message || v.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${v.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        B(v.$slots, "messages", {}, () => [
          v.message ? (i(), f("p", {
            key: 0,
            id: `${v.id}-message-error`,
            class: "fr-message fr-message--error"
          }, m(v.message), 9, mu)) : b("", !0)
        ])
      ], 8, vu)) : b("", !0)
    ], 10, ou));
  }
}), bu = { class: "fr-segmented__element" }, hu = ["id", "name", "value", "checked", "disabled", "aria-disabled"], yu = ["for"], ku = { key: 1 }, Ra = /* @__PURE__ */ T({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => W("basic", "checkbox") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = h(() => typeof e.icon == "string" ? { name: e.icon } : e.icon), r = h(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : "");
    return (l, n) => (i(), f("div", bu, [
      c("input", j({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: n[0] || (n[0] = (o) => l.$emit("update:modelValue", l.value))
      }), null, 16, hu),
      c("label", {
        for: l.id,
        class: A(["fr-label", { [r.value]: r.value }])
      }, [
        l.icon && !r.value ? (i(), S(ae, oe(j({ key: 0 }, a.value)), null, 16)) : b("", !0),
        l.icon ? (i(), f("span", ku, " ")) : b("", !0),
        M(" " + m(l.label), 1)
      ], 10, yu)
    ]));
  }
}), _u = { class: "fr-form-group" }, wu = ["disabled"], xu = ["id"], Du = {
  key: 0,
  class: "fr-hint-text"
}, Iu = { class: "fr-segmented__elements" }, Cu = /* @__PURE__ */ T({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => W("radio-button", "group") },
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
    const a = t, r = e, l = (n) => {
      n !== a.modelValue && r("update:modelValue", n);
    };
    return (n, o) => (i(), f("div", _u, [
      c("fieldset", {
        class: A(["fr-segmented", {
          "fr-segmented--sm": n.small,
          "fr-segmented--no-legend": !n.legend
        }]),
        disabled: n.disabled
      }, [
        n.legend ? (i(), f("legend", {
          key: 0,
          id: n.titleId,
          class: A(["fr-segmented__legend", {
            "fr-segmented__legend--inline": n.inline
          }])
        }, [
          B(n.$slots, "legend", {}, () => [
            M(m(n.legend), 1)
          ]),
          n.hint ? (i(), f("span", Du, m(n.hint), 1)) : b("", !0)
        ], 10, xu)) : b("", !0),
        c("div", Iu, [
          B(n.$slots, "default", {}, () => [
            (i(!0), f(V, null, q(n.options, (s, d) => (i(), S(Ra, j({
              key: s.value || d,
              name: n.name || s.name,
              ref_for: !0
            }, { ...s, disabled: n.disabled || s.disabled }, {
              "model-value": n.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (u) => l(u))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, wu)
    ]));
  }
}), Tu = ["for"], Bu = {
  key: 0,
  class: "required"
}, Eu = {
  key: 0,
  class: "fr-hint-text"
}, Su = ["id", "name", "disabled", "aria-disabled", "required"], Au = ["selected"], Mu = ["selected", "value", "disabled", "aria-disabled"], Lu = ["id"], Fu = /* @__PURE__ */ T({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => W("select") },
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
    const e = t, a = h(() => e.errorMessage || e.successMessage), r = h(() => e.errorMessage ? "error" : "valid");
    return (l, n) => (i(), f("div", {
      class: A(["fr-select-group", { [`fr-select-group--${r.value}`]: a.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        B(l.$slots, "label", {}, () => [
          M(m(l.label) + " ", 1),
          B(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", Bu, " *")) : b("", !0)
          ])
        ]),
        l.description ? (i(), f("span", Eu, m(l.description), 1)) : b("", !0)
      ], 8, Tu),
      c("select", j({
        id: l.selectId,
        class: [{ [`fr-select--${r.value}`]: a.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: n[0] || (n[0] = (o) => {
          var s;
          return l.$emit("update:modelValue", (s = o.target) == null ? void 0 : s.value);
        })
      }), [
        c("option", {
          selected: l.modelValue == null,
          disabled: "",
          hidden: ""
        }, m(l.defaultUnselectedText), 9, Au),
        (i(!0), f(V, null, q(l.options, (o, s) => (i(), f("option", {
          key: s,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, m(typeof o == "object" ? o.text : o), 9, Mu))), 128))
      ], 16, Su),
      a.value ? (i(), f("p", {
        key: 0,
        id: `select-${r.value}-desc-${r.value}`,
        class: A(`fr-${r.value}-text`)
      }, m(a.value), 11, Lu)) : b("", !0)
    ], 2));
  }
}), Pu = { class: "fr-share" }, Nu = { class: "fr-share__title" }, Vu = { class: "fr-btns-group" }, ju = ["title", "href", "onClick"], Ru = { key: 0 }, Ou = ["href", "title"], qu = ["title"], zu = /* @__PURE__ */ T({
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
      const r = window.location.href;
      navigator.clipboard.writeText(r);
    }, a = ({ url: r, label: l }) => {
      window.open(
        r,
        l,
        "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
    };
    return (r, l) => {
      var n;
      return i(), f("div", Pu, [
        c("p", Nu, m(r.title), 1),
        c("ul", Vu, [
          (i(!0), f(V, null, q(r.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: A(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: $((d) => a(o), ["prevent"])
            }, m(o.label), 11, ju)
          ]))), 128)),
          (n = r.mail) != null && n.to ? (i(), f("li", Ru, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: r.mail.to,
              title: r.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, m(r.mail.label), 9, Ou)
          ])) : b("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: r.copyLabel,
              onClick: l[0] || (l[0] = (o) => e())
            }, m(r.copyLabel), 9, qu)
          ])
        ])
      ]);
    };
  }
}), Qu = ["aria-current", "aria-expanded", "aria-controls"], Oa = /* @__PURE__ */ T({
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
      onClick: a[0] || (a[0] = (r) => e.$emit("toggleExpand", e.controlId))
    }, [
      B(e.$slots, "default")
    ], 8, Qu));
  }
}), qa = /* @__PURE__ */ T({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      class: A(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      B(e.$slots, "default")
    ], 2));
  }
}), Hu = ["id"], Gu = { class: "fr-sidemenu__list" }, za = /* @__PURE__ */ T({
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
      collapsing: r,
      cssExpanded: l,
      doExpand: n,
      onTransitionEnd: o
    } = ce();
    ee(() => e.expanded, (p, v) => {
      p !== v && n(p);
    }), ne(() => {
      e.expanded && n(!0);
    });
    const s = (p) => typeof p == "string" && p.startsWith("http"), d = (p) => s(p) ? "a" : "RouterLink", u = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, v) => {
      const y = ie("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: a,
        class: A({
          "fr-collapse": p.collapsable,
          "fr-collapsing": G(r),
          "fr-collapse--expanded": G(l)
        }),
        onTransitionend: v[2] || (v[2] = (D) => G(o)(!!p.expanded))
      }, [
        c("ul", Gu, [
          B(p.$slots, "default"),
          (i(!0), f(V, null, q(p.menuItems, (D, w) => (i(), S(qa, {
            key: w,
            active: D.active
          }, {
            default: O(() => [
              D.menuItems ? b("", !0) : (i(), S(te(d(D.to)), j({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": D.active ? "page" : void 0,
                ref_for: !0
              }, u(D.to)), {
                default: O(() => [
                  M(m(D.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              D.menuItems ? (i(), f(V, { key: 1 }, [
                K(Oa, {
                  active: !!D.active,
                  expanded: !!D.expanded,
                  "control-id": D.id,
                  onToggleExpand: v[0] || (v[0] = (L) => p.$emit("toggleExpand", L))
                }, {
                  default: O(() => [
                    M(m(D.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                D.menuItems ? (i(), S(y, {
                  key: 0,
                  id: D.id,
                  collapsable: "",
                  expanded: D.expanded,
                  "menu-items": D.menuItems,
                  onToggleExpand: v[1] || (v[1] = (L) => p.$emit("toggleExpand", L))
                }, null, 8, ["id", "expanded", "menu-items"])) : b("", !0)
              ], 64)) : b("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, Hu);
    };
  }
}), Ku = ["aria-labelledby"], Xu = { class: "fr-sidemenu__inner" }, Wu = ["aria-controls", "aria-expanded"], Uu = ["id"], Yu = { class: "fr-sidemenu__title" }, $u = /* @__PURE__ */ T({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => W("sidemenu") },
    sideMenuListId: { default: () => W("sidemenu", "list") },
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
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: n
    } = ce(), o = R(!1);
    return ee(o, (s, d) => {
      s !== d && l(s);
    }), (s, d) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": s.id
    }, [
      c("div", Xu, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": s.id,
          "aria-expanded": o.value,
          onClick: d[0] || (d[0] = $((u) => o.value = !o.value, ["prevent", "stop"]))
        }, m(s.buttonLabel), 9, Wu),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: e,
          class: A(["fr-collapse", {
            "fr-collapse--expanded": G(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": G(a)
          }]),
          onTransitionend: d[2] || (d[2] = (u) => G(n)(o.value))
        }, [
          c("div", Yu, m(s.headingTitle), 1),
          B(s.$slots, "default", {}, () => [
            K(za, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: d[1] || (d[1] = (u) => s.$emit("toggleExpand", u))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Uu)
      ])
    ], 8, Ku));
  }
}), Zu = /* @__PURE__ */ T({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = h(() => typeof e.to == "string" && e.to.startsWith("http")), r = h(() => a.value ? "a" : "RouterLink"), l = h(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (n, o) => (i(), S(te(r.value), j({
      "aria-current": n.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: O(() => [
        B(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), Ju = { class: "fr-skiplinks" }, ec = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, tc = { class: "fr-skiplinks__list" }, ac = ["href", "onClick"], lc = /* @__PURE__ */ T({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(t) {
    const e = (a) => {
      const r = document.getElementById(a);
      r == null || r.focus();
    };
    return (a, r) => (i(), f("div", Ju, [
      c("nav", ec, [
        c("ul", tc, [
          (i(!0), f(V, null, q(a.links, (l) => (i(), f("li", {
            key: l.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: $((n) => e(l.id), ["prevent"])
            }, m(l.text), 9, ac)
          ]))), 128))
        ])
      ])
    ]));
  }
}), rc = { class: "fr-stepper" }, nc = { class: "fr-stepper__title" }, oc = { class: "fr-stepper__state" }, ic = ["data-fr-current-step", "data-fr-steps"], sc = { class: "fr-stepper__details" }, dc = {
  key: 0,
  class: "fr-text--bold"
}, uc = /* @__PURE__ */ T({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (i(), f("div", rc, [
      c("h2", nc, [
        M(m(e.steps[e.currentStep - 1]) + " ", 1),
        c("span", oc, "Étape " + m(e.currentStep) + " sur " + m(e.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, ic),
      c("p", sc, [
        e.currentStep < e.steps.length ? (i(), f("span", dc, "Étape suivante :")) : b("", !0),
        M(" " + m(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), cc = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, fc = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, pc = { class: "fr-summary__list" }, vc = ["href"], mc = /* @__PURE__ */ T({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("nav", cc, [
      c("h2", fc, m(e.title), 1),
      c("ol", pc, [
        (i(!0), f(V, null, q(e.anchors, (r, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: "fr-summary__link",
            href: r.link
          }, m(r.name), 9, vc)
        ]))), 128))
      ])
    ]));
  }
}), gc = ["id", "aria-labelledby", "tabindex"], bc = /* @__PURE__ */ T({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(t) {
    ea((d) => ({
      "7152af7e": o.value,
      "2a62e962": s.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, r = Re(qe), { isVisible: l, asc: n } = r(Oe(() => e.tabId)), o = h(() => a[String(n == null ? void 0 : n.value)]), s = h(() => a[String(!(n != null && n.value))]);
    return (d, u) => (i(), S(nl, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: O(() => [
        he(c("div", {
          id: d.panelId,
          class: A(["fr-tabs__panel", {
            "fr-tabs__panel--selected": G(l)
          }]),
          role: "tabpanel",
          "aria-labelledby": d.tabId,
          tabindex: G(l) ? 0 : -1
        }, [
          B(d.$slots, "default", {}, void 0, !0)
        ], 10, gc), [
          [Zt, G(l)]
        ])
      ]),
      _: 3
    }));
  }
}), Qa = /* @__PURE__ */ le(bc, [["__scopeId", "data-v-5774b16c"]]), hc = { role: "presentation" }, yc = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], kc = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Ha = /* @__PURE__ */ T({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(t, { emit: e }) {
    const a = t, r = e, l = R(null), n = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      ArrowDown: "next",
      ArrowUp: "previous",
      Home: "first",
      End: "last"
    };
    function o(u) {
      const p = u == null ? void 0 : u.key, v = n[p];
      v && r(v);
    }
    const s = Re(qe), { isVisible: d } = s(Oe(() => a.tabId));
    return (u, p) => (i(), f("li", hc, [
      c("button", {
        id: u.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${u.tabId}`,
        class: "fr-tabs__tab",
        tabindex: G(d) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": G(d),
        "aria-controls": u.panelId,
        onClick: p[0] || (p[0] = $((v) => u.$emit("click", u.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (v) => o(v))
      }, [
        u.icon ? (i(), f("span", kc, [
          K(ae, { name: u.icon }, null, 8, ["name"])
        ])) : b("", !0),
        B(u.$slots, "default")
      ], 40, yc)
    ]));
  }
}), Ga = /* @__PURE__ */ T({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = h(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), r = h(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, n) => (i(), f("th", j(l.headerAttrs, { scope: "col" }), [
      M(m(l.header) + " ", 1),
      l.icon && !a.value ? (i(), S(ae, oe(j({ key: 0 }, r.value)), null, 16)) : b("", !0),
      a.value ? (i(), f("span", {
        key: 1,
        class: A({ [String(l.icon)]: a.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), _c = { key: 0 }, Ka = /* @__PURE__ */ T({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (i(), f("tr", _c, [
      (i(!0), f(V, null, q(e.headers, (r, l) => (i(), S(Ga, {
        key: l,
        header: (typeof r == "object" ? r : {}).text || r,
        "header-attrs": r.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), Xa = /* @__PURE__ */ T({
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
    const e = t, a = h(() => typeof e.field == "object" && e.field !== null && e.field.component ? e.field.component : !1), r = h(() => ["string", "number", "boolean"].includes(typeof e.field));
    return (l, n) => (i(), f("td", oe(ft(l.cellAttrs)), [
      a.value ? (i(), S(te(a.value), oe(j({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: O(() => [
          M(m(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(V, { key: 1 }, [
        M(m(r.value ? l.field : l.field.text), 1)
      ], 64))
    ], 16));
  }
}), Wa = /* @__PURE__ */ T({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(t) {
    return (e, a) => (i(), f("tr", oe(ft(e.rowAttrs)), [
      B(e.$slots, "default"),
      (i(!0), f(V, null, q(e.rowData, (r, l) => (i(), S(Xa, {
        key: l,
        field: r ?? "",
        "cell-attrs": typeof r == "object" && r !== null && !r.component ? r.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), wc = { class: "caption" }, xc = { key: 1 }, Dc = ["colspan"], Ic = { class: "flex justify-right" }, Cc = { class: "self-center" }, Tc = ["value"], Bc = { class: "flex ml-1" }, Ec = { class: "self-center" }, Sc = { class: "flex ml-1" }, Ac = /* @__PURE__ */ T({
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
    const a = t, r = e, l = (g) => Array.isArray(g) ? g : g.rowData, n = R(a.currentPage), o = R(a.resultsDisplayed), s = R(
      a.rows.length > o.value ? Math.ceil(a.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], u = () => n.value * o.value - o.value, p = () => n.value * o.value;
    ee(
      () => o.value,
      (g) => {
        s.value = a.rows.length > o.value ? Math.ceil(a.rows.length / g) : 1;
      }
    );
    const v = h(() => a.pagination ? a.rows.slice(u(), p()) : a.rows), y = () => {
      n.value = 1, r("update:currentPage");
    }, D = () => {
      n.value > 1 && (n.value -= 1, r("update:currentPage"));
    }, w = () => {
      n.value < s.value && (n.value += 1, r("update:currentPage"));
    }, L = () => {
      n.value = s.value, r("update:currentPage");
    };
    return (g, I) => (i(), f("div", {
      class: A(["fr-table", { "fr-table--no-caption": g.noCaption }])
    }, [
      c("table", null, [
        c("caption", wc, m(g.title), 1),
        c("thead", null, [
          B(g.$slots, "header", {}, () => [
            g.headers && g.headers.length ? (i(), S(Ka, {
              key: 0,
              headers: g.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          B(g.$slots, "default", {}, void 0, !0),
          g.rows && g.rows.length ? (i(!0), f(V, { key: 0 }, q(v.value, (N, z) => (i(), S(Wa, {
            key: g.rowKey && l(N) ? typeof g.rowKey == "string" ? l(N)[g.headers.indexOf(g.rowKey)].toString() : g.rowKey(l(N)) : z,
            "row-data": l(N),
            "row-attrs": "rowAttrs" in N ? N.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : b("", !0),
          g.pagination ? (i(), f("tr", xc, [
            c("td", {
              colspan: g.headers.length
            }, [
              c("div", Ic, [
                c("div", Cc, [
                  I[6] || (I[6] = c("span", null, "Résultats par page : ", -1)),
                  he(c("select", {
                    "onUpdate:modelValue": I[0] || (I[0] = (N) => o.value = N),
                    onChange: I[1] || (I[1] = (N) => r("update:currentPage"))
                  }, [
                    (i(), f(V, null, q(d, (N, z) => c("option", {
                      key: z,
                      value: N
                    }, m(N), 9, Tc)), 64))
                  ], 544), [
                    [aa, o.value]
                  ])
                ]),
                c("div", Bc, [
                  c("span", Ec, "Page " + m(n.value) + " sur " + m(s.value), 1)
                ]),
                c("div", Sc, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: I[2] || (I[2] = (N) => y())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: I[3] || (I[3] = (N) => D())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: I[4] || (I[4] = (N) => w())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: I[5] || (I[5] = (N) => L())
                  })
                ])
              ])
            ], 8, Dc)
          ])) : b("", !0)
        ])
      ])
    ], 2));
  }
}), Mc = /* @__PURE__ */ le(Ac, [["__scopeId", "data-v-3998acc8"]]), Lc = ["aria-label"], Fc = /* @__PURE__ */ T({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: e, emit: a }) {
    const r = t, l = a, n = R(!1), o = h({
      get: () => r.modelValue,
      set(E) {
        l("update:modelValue", E);
      }
    }), s = R(/* @__PURE__ */ new Map()), d = R(0);
    ct(qe, (E) => {
      const Q = R(!0);
      if (ee(o, (C, H) => {
        Q.value = C > H;
      }), [...s.value.values()].includes(E.value))
        return { isVisible: h(() => s.value.get(o.value) === E.value), asc: Q };
      const k = d.value++;
      s.value.set(k, E.value);
      const F = h(() => k === o.value);
      return ee(E, () => {
        s.value.set(k, E.value);
      }), ue(() => {
        s.value.delete(k);
      }), { isVisible: F };
    });
    const u = R(null), p = R(null), v = tl({}), y = (E) => {
      if (v[E])
        return v[E];
      const Q = W("tab");
      return v[E] = Q, Q;
    }, D = async () => {
      const E = o.value === 0 ? r.tabTitles.length - 1 : o.value - 1;
      n.value = !1, o.value = E;
    }, w = async () => {
      const E = o.value === r.tabTitles.length - 1 ? 0 : o.value + 1;
      n.value = !0, o.value = E;
    }, L = async () => {
      o.value = 0;
    }, g = async () => {
      o.value = r.tabTitles.length - 1;
    }, I = R({ "--tabs-height": "100px" }), N = () => {
      var E;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const Q = p.value.offsetHeight, k = (E = u.value) == null ? void 0 : E.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!k || !k.offsetHeight)
        return;
      const F = k.offsetHeight;
      I.value["--tabs-height"] = `${Q + F}px`;
    }, z = R(null);
    return ne(() => {
      var E;
      window.ResizeObserver && (z.value = new window.ResizeObserver(() => {
        N();
      })), (E = u.value) == null || E.querySelectorAll(".fr-tabs__panel").forEach((Q) => {
        var k;
        Q && ((k = z.value) == null || k.observe(Q));
      });
    }), ue(() => {
      var E;
      (E = u.value) == null || E.querySelectorAll(".fr-tabs__panel").forEach((Q) => {
        var k;
        Q && ((k = z.value) == null || k.unobserve(Q));
      });
    }), e({
      renderTabs: N,
      selectFirst: L,
      selectLast: g
    }), (E, Q) => (i(), f("div", {
      ref_key: "$el",
      ref: u,
      class: "fr-tabs",
      style: se(I.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": E.tabListName
      }, [
        B(E.$slots, "tab-items", {}, () => [
          (i(!0), f(V, null, q(E.tabTitles, (k, F) => (i(), S(Ha, {
            key: F,
            icon: k.icon,
            "panel-id": k.panelId || `${y(F)}-panel`,
            "tab-id": k.tabId || y(F),
            onClick: (C) => o.value = F,
            onNext: Q[0] || (Q[0] = (C) => w()),
            onPrevious: Q[1] || (Q[1] = (C) => D()),
            onFirst: Q[2] || (Q[2] = (C) => L()),
            onLast: Q[3] || (Q[3] = (C) => g())
          }, {
            default: O(() => [
              M(m(k.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, Lc),
      (i(!0), f(V, null, q(E.tabContents, (k, F) => {
        var C, H, _, x;
        return i(), S(Qa, {
          key: F,
          "panel-id": ((H = (C = E.tabTitles) == null ? void 0 : C[F]) == null ? void 0 : H.panelId) || `${y(F)}-panel`,
          "tab-id": ((x = (_ = E.tabTitles) == null ? void 0 : _[F]) == null ? void 0 : x.tabId) || y(F)
        }, {
          default: O(() => [
            M(m(k), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      B(E.$slots, "default")
    ], 4));
  }
}), Pc = /* @__PURE__ */ T({
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
    const e = t, a = h(() => typeof e.link == "string" && e.link.startsWith("http")), r = h(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = h(() => ({ [a.value ? "href" : "to"]: e.link })), n = h(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), o = e.small ? 0.65 : 0.9, s = h(() => n.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: o } : { scale: o, ...e.icon ?? {} });
    return (d, u) => (i(), S(te(r.value), j({
      class: ["fr-tag", {
        "fr-tag--sm": d.small,
        [d.icon]: n.value,
        "fr-tag--icon-left": n.value
      }],
      disabled: d.disabled
    }, l.value), {
      default: O(() => [
        e.icon && !n.value ? (i(), S(ae, j({
          key: 0,
          label: d.iconOnly ? d.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : b("", !0),
        d.iconOnly ? b("", !0) : (i(), f(V, { key: 1 }, [
          M(m(d.label), 1)
        ], 64)),
        B(d.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), xt = /* @__PURE__ */ le(Pc, [["__scopeId", "data-v-f6a89dc8"]]), Nc = { class: "fr-tags-group" }, Vc = /* @__PURE__ */ T({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("ul", Nc, [
      (i(!0), f(V, null, q(e.tags, ({ icon: r, label: l, ...n }, o) => (i(), f("li", { key: o }, [
        K(xt, j({ ref_for: !0 }, n, {
          icon: r,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), jc = { class: "fr-tile__body" }, Rc = { class: "fr-tile__content" }, Oc = ["download", "href"], qc = {
  key: 0,
  class: "fr-tile__desc"
}, zc = {
  key: 1,
  class: "fr-tile__detail"
}, Qc = {
  key: 2,
  class: "fr-tile__start"
}, Hc = { class: "fr-tile__header" }, Gc = {
  key: 0,
  class: "fr-tile__pictogram"
}, Kc = ["src"], Xc = ["href"], Wc = ["href"], Uc = ["href"], Yc = /* @__PURE__ */ T({
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
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, r = h(() => typeof e.to == "string" && e.to.startsWith("http"));
    return (l, n) => {
      const o = ie("RouterLink");
      return i(), f("div", {
        class: A(["fr-tile fr-enlarge-link", [{
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
        c("div", jc, [
          c("div", Rc, [
            (i(), S(te(l.titleTag), { class: "fr-tile__title" }, {
              default: O(() => [
                r.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, m(l.title), 9, Oc)) : b("", !0),
                r.value ? b("", !0) : (i(), S(o, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: O(() => [
                    M(m(l.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            l.description ? (i(), f("p", qc, m(l.description), 1)) : b("", !0),
            l.details ? (i(), f("p", zc, m(l.details), 1)) : b("", !0),
            l.$slots["start-details"] ? (i(), f("div", Qc, [
              B(l.$slots, "start-details", {}, void 0, !0)
            ])) : b("", !0)
          ])
        ]),
        c("div", Hc, [
          B(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (i(), f("div", Gc, [
            l.imgSrc ? (i(), f("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Kc)) : (i(), f("svg", j({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...a, ...l.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${l.svgPath}#artwork-decorative`
              }, null, 8, Xc),
              c("use", {
                class: "fr-artwork-minor",
                href: `${l.svgPath}#artwork-minor`
              }, null, 8, Wc),
              c("use", {
                class: "fr-artwork-major",
                href: `${l.svgPath}#artwork-major`
              }, null, 8, Uc)
            ], 16))
          ])) : b("", !0)
        ])
      ], 2);
    };
  }
}), Ua = /* @__PURE__ */ le(Yc, [["__scopeId", "data-v-f4d836a2"]]), $c = { class: "fr-grid-row fr-grid-row--gutters" }, Zc = /* @__PURE__ */ T({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("div", $c, [
      (i(!0), f(V, null, q(e.tiles, (r, l) => (i(), f("div", {
        key: l,
        class: A({
          [r.containerClass ?? "no-class"]: r.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !r.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        K(Ua, j({
          horizontal: e.horizontal,
          ref_for: !0
        }, r), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Jc = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], ef = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], tf = ["id"], af = /* @__PURE__ */ T({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => W("toggle") },
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
    const e = t, a = h(() => `${e.inputId}-hint-text`);
    return (r, l) => (i(), f("div", {
      class: A(["fr-toggle", {
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
        "aria-describedby": a.value,
        onInput: l[0] || (l[0] = (n) => r.$emit("update:modelValue", n.target.checked))
      }, null, 40, Jc),
      c("label", {
        id: a.value,
        class: "fr-toggle__label",
        for: r.inputId,
        "data-fr-checked-label": r.noText ? void 0 : r.activeText,
        "data-fr-unchecked-label": r.noText ? void 0 : r.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, m(r.label), 9, ef),
      r.hint ? (i(), f("p", {
        key: 0,
        id: `${r.inputId}-hint-text`,
        class: "fr-hint-text"
      }, m(r.hint), 9, tf)) : b("", !0)
    ], 2));
  }
}), lf = ["id"], rf = /* @__PURE__ */ T({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => W("tooltip") }
  },
  setup(t) {
    const e = t, a = R(!1), r = R(null), l = R(null), n = R("0px"), o = R("0px"), s = R("0px"), d = R(!1), u = R(0);
    async function p() {
      var I, N, z, E, Q, k;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((Z) => setTimeout(Z, 100));
      const F = (I = r.value) == null ? void 0 : I.getBoundingClientRect().top, C = (N = r.value) == null ? void 0 : N.offsetHeight, H = (z = r.value) == null ? void 0 : z.offsetWidth, _ = (E = r.value) == null ? void 0 : E.getBoundingClientRect().left, x = (Q = l.value) == null ? void 0 : Q.offsetHeight, P = (k = l.value) == null ? void 0 : k.offsetWidth, U = !(F - x < 0) && F + C + x >= document.documentElement.offsetHeight;
      d.value = U;
      const X = _ + H >= document.documentElement.offsetWidth, Y = _ + H / 2 - P / 2 <= 0;
      o.value = U ? `${F - x + 8}px` : `${F + C - 8}px`, u.value = 1, n.value = X ? `${_ + H - P - 4}px` : Y ? `${_ + 4}px` : `${_ + H / 2 - P / 2}px`, s.value = X ? `${P / 2 - H / 2 + 4}px` : Y ? `${-(P / 2) + H / 2 - 4}px` : "0px";
    }
    ee(a, p, { immediate: !0 }), ne(() => {
      window.addEventListener("scroll", p);
    }), ue(() => {
      window.removeEventListener("scroll", p);
    });
    const v = h(() => `transform: translate(${n.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${u.value};'`), y = h(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": d.value,
      "fr-placement--bottom": !d.value
    })), D = (I) => {
      var N, z;
      a.value && (I.target === r.value || (N = r.value) != null && N.contains(I.target) || I.target === l.value || (z = l.value) != null && z.contains(I.target) || (a.value = !1));
    };
    ne(() => {
      document.documentElement.addEventListener("click", D);
    }), ue(() => {
      document.documentElement.removeEventListener("click", D);
    });
    const w = () => {
      e.onHover && (a.value = !0);
    }, L = () => {
      e.onHover && (a.value = !1);
    }, g = () => {
      e.onHover || (a.value = !a.value);
    };
    return (I, N) => (i(), f(V, null, [
      (i(), S(te(I.onHover ? "a" : "button"), {
        id: `link-${I.id}`,
        ref_key: "source",
        ref: r,
        class: A(I.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": I.id,
        href: I.onHover ? "#" : void 0,
        onClick: N[0] || (N[0] = (z) => g()),
        onMouseenter: N[1] || (N[1] = (z) => w()),
        onMouseleave: N[2] || (N[2] = (z) => L())
      }, {
        default: O(() => [
          B(I.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: I.id,
        ref_key: "tooltip",
        ref: l,
        class: A(["fr-tooltip fr-placement", y.value]),
        style: se(v.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, m(I.content), 15, lf)
    ], 64));
  }
}), nf = /* @__PURE__ */ le(rf, [["__scopeId", "data-v-ae4d443e"]]), of = { class: "fr-transcription" }, sf = ["aria-expanded", "aria-controls"], df = ["id"], uf = ["id", "aria-labelledby"], cf = { class: "fr-container fr-container--fluid fr-container-md" }, ff = { class: "fr-grid-row fr-grid-row--center" }, pf = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, vf = { class: "fr-modal__body" }, mf = { class: "fr-modal__header" }, gf = ["aria-controls"], bf = { class: "fr-modal__content" }, hf = ["id"], yf = { class: "fr-transcription__footer" }, kf = { class: "fr-transcription__actions-group" }, _f = ["aria-controls"], Ya = /* @__PURE__ */ T({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => W("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(t) {
    const e = t, {
      collapse: a,
      collapsing: r,
      cssExpanded: l,
      doExpand: n,
      onTransitionEnd: o
    } = ce(), s = R(!1), d = R(!1), u = h(() => `fr-transcription__modal-${e.id}`), p = h(() => `fr-transcription__collapse-${e.id}`);
    return ee(d, (v, y) => {
      v !== y && n(v);
    }), (v, y) => (i(), f("div", of, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": d.value,
        "aria-controls": p.value,
        onClick: y[0] || (y[0] = (D) => d.value = !d.value)
      }, " Transcription ", 8, sf),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: a,
        class: A(["fr-collapse", { "fr-collapse--expanded": G(l), "fr-collapsing": G(r) }]),
        onTransitionend: y[2] || (y[2] = (D) => G(o)(d.value))
      }, [
        c("dialog", {
          id: u.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${u.value}-title`
        }, [
          c("div", cf, [
            c("div", ff, [
              c("div", pf, [
                c("div", vf, [
                  c("div", mf, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": u.value,
                      title: "Fermer"
                    }, " Fermer ", 8, gf)
                  ]),
                  c("div", bf, [
                    c("h1", {
                      id: `${u.value}-title`,
                      class: "fr-modal__title"
                    }, m(v.title), 9, hf),
                    M(" " + m(v.content), 1)
                  ]),
                  c("div", yf, [
                    c("div", kf, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": u.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: y[1] || (y[1] = (D) => s.value = !0)
                      }, " Agrandir ", 8, _f)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, uf)
      ], 42, df),
      (i(), S(al, { to: "body" }, [
        K(Ma, {
          title: v.title,
          opened: s.value,
          onClose: y[3] || (y[3] = (D) => s.value = !1)
        }, {
          default: O(() => [
            B(v.$slots, "default", {}, () => [
              M(m(v.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), wf = ["src"], xf = { class: "fr-content-media__caption" }, Df = /* @__PURE__ */ T({
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
    return (e, a) => (i(), f(V, null, [
      c("figure", {
        class: A(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        c("div", {
          class: A(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          c("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, wf)
        ], 2),
        c("div", xf, m(e.legend), 1)
      ], 2),
      K(Ya, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), If = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: fl,
  DsfrAccordionsGroup: vl,
  DsfrAlert: bl,
  DsfrBackToTop: hl,
  DsfrBadge: la,
  DsfrBreadcrumb: Il,
  DsfrButton: Ce,
  DsfrButtonGroup: Ge,
  DsfrCallout: Nr,
  DsfrCard: Yr,
  DsfrCardDetail: ot,
  DsfrCheckbox: _t,
  DsfrCheckboxSet: sn,
  DsfrConsent: fn,
  DsfrDataTable: Xn,
  DsfrErrorPage: to,
  DsfrFieldset: oo,
  DsfrFileDownload: ka,
  DsfrFileDownloadList: fo,
  DsfrFileUpload: yo,
  DsfrFollow: Oo,
  DsfrFooter: gi,
  DsfrFooterLink: xa,
  DsfrFooterLinkList: ki,
  DsfrFooterPartners: Da,
  DsfrFranceConnect: Di,
  DsfrHeader: cs,
  DsfrHeaderMenuLink: Ia,
  DsfrHeaderMenuLinks: dt,
  DsfrHighlight: fs,
  DsfrInput: wt,
  DsfrInputGroup: hs,
  DsfrLanguageSelector: it,
  DsfrLogo: Fe,
  DsfrModal: Ma,
  DsfrNavigation: Dd,
  DsfrNavigationItem: La,
  DsfrNavigationMegaMenu: Pa,
  DsfrNavigationMegaMenuCategory: Fa,
  DsfrNavigationMenu: Va,
  DsfrNavigationMenuItem: Na,
  DsfrNavigationMenuLink: Ke,
  DsfrNewsLetter: _a,
  DsfrNotice: Ed,
  DsfrPagination: ya,
  DsfrPicture: Fd,
  DsfrQuote: zd,
  DsfrRadioButton: ja,
  DsfrRadioButtonSet: nu,
  DsfrRange: gu,
  DsfrSearchBar: st,
  DsfrSegmented: Ra,
  DsfrSegmentedSet: Cu,
  DsfrSelect: Fu,
  DsfrShare: zu,
  DsfrSideMenu: $u,
  DsfrSideMenuButton: Oa,
  DsfrSideMenuLink: Zu,
  DsfrSideMenuList: za,
  DsfrSideMenuListItem: qa,
  DsfrSkipLinks: lc,
  DsfrSocialNetworks: wa,
  DsfrStepper: uc,
  DsfrSummary: mc,
  DsfrTabContent: Qa,
  DsfrTabItem: Ha,
  DsfrTable: Mc,
  DsfrTableCell: Xa,
  DsfrTableHeader: Ga,
  DsfrTableHeaders: Ka,
  DsfrTableRow: Wa,
  DsfrTabs: Fc,
  DsfrTag: xt,
  DsfrTags: Vc,
  DsfrTile: Ua,
  DsfrTiles: Zc,
  DsfrToggleSwitch: af,
  DsfrTooltip: nf,
  DsfrTranscription: Ya,
  DsfrVideo: Df,
  VIcon: ae,
  registerAccordionKey: pt,
  registerNavigationLinkKey: vt,
  registerTabKey: qe
}, Symbol.toStringTag, { value: "Module" })), Cf = {
  install: (t, { components: e } = {}) => {
    Object.entries(If).forEach(([a, r]) => {
      (e === void 0 || e === "all" || e.map(({ name: l }) => l).includes(a)) && t.component(a, r);
    }), t.component("VIcon", ae);
  }
}, Tf = {
  _searchAndFilterList: function(t, e, a, r, l) {
    let n = this.$data.vueData[t];
    if (r && (n = n.filter(r)), l != null && l.trim() !== "") {
      const o = this.unaccentLower(l);
      n = n.filter((s) => this.unaccentLower(s[a].toString()).indexOf(o) > -1);
    }
    return n;
  },
  dsfrTransformListForSelection: function(t, e, a, r, l) {
    return this._searchAndFilterList(t, e, a, r, l).map(function(o) {
      return { value: o[e], text: o[a].toString() };
    });
  },
  dsfrTransformListForRadio: function(t, e, a, r, l, n, o) {
    return this._searchAndFilterList(t, e, a, n, o).map(function(d) {
      return { value: d[e], label: d[a].toString(), hint: d[l], disabled: d[r] };
    });
  },
  dsfrTransformListForCheckbox: function(t, e, a, r, l, n, o, s) {
    return this._searchAndFilterList(t, e, a, o, s).map(function(u) {
      return { value: u[e], label: u[a].toString(), name: n, hint: u[l], disabled: u[r] };
    });
  }
}, Bf = ["href"], Ef = {
  __name: "RouterLink",
  props: ["to"],
  setup(t) {
    const e = t;
    return (a, r) => (i(), f("a", {
      href: e.to
    }, [
      B(a.$slots, "default")
    ], 8, Bf));
  }
}, Sf = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [r, l] of e)
    a[r] = l;
  return a;
}, Af = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: _t, DsfrTag: xt, DsfrButton: Ce },
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
}, Mf = {
  key: 0,
  class: "fr-mb-2w"
}, Lf = { class: "fr-mb-1w" }, Ff = { key: 0 }, Pf = { class: "facet" }, Nf = { class: "flex justify-between w-full fr-mb-0" }, Vf = { class: "facet--count" }, jf = { key: 1 }, Rf = { class: "flex justify-between w-full" }, Of = { class: "facet--count" }, qf = { key: 0 }, zf = { class: "facet" }, Qf = { class: "flex justify-between w-full fr-mb-0" }, Hf = { class: "facet--count" }, Gf = { key: 1 }, Kf = { class: "flex justify-between w-full" }, Xf = { class: "facet--count" }, Wf = { class: "fr-mb-2w" };
function Uf(t, e, a, r, l, n) {
  const o = ie("DsfrTag"), s = ie("DsfrCheckbox"), d = ie("DsfrButton");
  return i(), f("div", null, [
    n.isAnyFacetValueSelected() ? (i(), f("div", Mf, [
      (i(!0), f(V, null, q(a.selectedFacets, (u, p) => (i(), f("div", { key: p }, [
        n.facetMultipleByCode(p) ? b("", !0) : (i(!0), f(V, { key: 0 }, q(u, (v) => (i(), S(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: v.code,
          onClick: (y) => t.$emit("toogle-facet", p, v, a.contextKey)
        }, {
          default: O(() => [
            M(m(n.facetLabelByCode(p)) + ": " + m(n.facetValueLabelByCode(p, v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : b("", !0),
    (i(!0), f(V, null, q(a.facets, (u) => (i(), f("div", {
      key: u.code,
      class: "facets"
    }, [
      u.multiple || !n.isFacetSelected(u.code) ? (i(), f(V, { key: 0 }, [
        c("h6", Lf, m(u.label), 1),
        c("ul", null, [
          (i(!0), f(V, null, q(n.selectedInvisibleFacets(u.code), (p) => (i(), f(V, {
            key: p.code
          }, [
            u.multiple ? (i(), f("li", Ff, [
              c("div", Pf, [
                K(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
                }, {
                  label: O(() => [
                    c("p", Nf, [
                      M(m(n.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                      c("span", Vf, m(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", jf, [
              K(d, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
              }, {
                default: O(() => [
                  c("span", Rf, [
                    M(m(n.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                    c("span", Of, m(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(V, null, q(n.visibleFacets(u.code, u.values), (p) => (i(), f(V, {
            key: p.code
          }, [
            u.multiple ? (i(), f("li", qf, [
              c("div", zf, [
                K(s, {
                  small: "",
                  modelValue: n.isFacetValueSelected(u.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
                }, {
                  label: O(() => [
                    c("p", Qf, [
                      M(m(n.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                      c("span", Hf, m(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", Gf, [
              K(d, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", u.code, p.code, a.contextKey)
              }, {
                default: O(() => [
                  c("span", Kf, [
                    M(m(n.facetValueLabelByCode(u.code, p.code)) + " ", 1),
                    c("span", Xf, m(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", Wf, [
          u.values.length > a.maxValues && !n.isFacetExpanded(u.code) ? (i(), S(d, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => n.expandFacet(u.code)
          }, {
            default: O(() => [
              M(m(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0),
          u.values.length > a.maxValues && n.isFacetExpanded(u.code) ? (i(), S(d, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => n.reduceFacet(u.code)
          }, {
            default: O(() => [
              M(m(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0)
        ])
      ], 64)) : b("", !0)
    ]))), 128))
  ]);
}
const Yf = /* @__PURE__ */ Sf(Af, [["render", Uf], ["__scopeId", "data-v-e1d6020e"]]);
var $f = {
  install: function(t, e) {
    t.use(Cf), t.component("RouterLink", Ef), t.component("DsfrFacets", Yf);
  },
  methods: Tf
};
window && (window.DSFR = $f);
export {
  $f as default
};
//# sourceMappingURL=dsfr.es.js.map
