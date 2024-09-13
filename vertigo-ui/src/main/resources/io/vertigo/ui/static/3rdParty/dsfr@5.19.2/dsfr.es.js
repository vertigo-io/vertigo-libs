import { defineComponent as D, ref as N, computed as h, onMounted as ne, watch as ee, onUnmounted as ue, Comment as Ka, cloneVNode as Xa, h as ht, openBlock as i, createElementBlock as f, normalizeClass as A, createElementVNode as c, mergeProps as V, renderSlot as C, createTextVNode as S, toDisplayString as m, createCommentVNode as b, inject as rt, toRef as Pe, createBlock as T, resolveDynamicComponent as te, withCtx as j, unref as Q, provide as Kt, resolveComponent as oe, withDirectives as nt, vShow as Xt, Fragment as P, renderList as O, normalizeStyle as se, createVNode as G, withModifiers as J, normalizeProps as ie, guardReactiveProps as ot, withKeys as Wa, useSlots as Wt, reactive as Ua, Teleport as Ya, useCssVars as Ut, nextTick as Yt, useAttrs as Za, onBeforeUnmount as Ja, Transition as $a, vModelSelect as el, pushScopeId as Zt, popScopeId as Jt } from "vue";
const tl = /* @__PURE__ */ D({
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
}), al = "abcdefghijklmnopqrstuvwyz0123456789", yt = al.repeat(10), ll = () => {
  const t = Math.floor(Math.random() * yt.length);
  return yt[t];
}, rl = (t) => Array.from({ length: t }).map(ll).join(""), K = (t = "", e = "") => (t ? `${t}-` : "") + rl(5) + (e ? `-${e}` : ""), ce = () => {
  const t = N(), e = N(!1), a = N(!1), r = () => {
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
}, $t = Symbol("accordions"), nl = { class: "fr-accordion" }, ol = ["aria-expanded", "aria-controls"], il = ["id"], sl = /* @__PURE__ */ D({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => K("accordion") },
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
    } = ce(), s = N(), u = rt($t), { isActive: d, expand: p } = (u == null ? void 0 : u(Pe(() => e.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return ne(() => {
      d.value && n(!0);
    }), ee(d, (v, y) => {
      v !== y && n(v);
    }), (v, y) => (i(), f("section", nl, [
      (i(), T(te(v.titleTag), { class: "fr-accordion__title" }, {
        default: j(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": Q(d),
            "aria-controls": v.id,
            type: "button",
            onClick: y[0] || (y[0] = (x) => Q(p)())
          }, [
            C(v.$slots, "title", {}, () => [
              S(m(v.title), 1)
            ])
          ], 8, ol)
        ]),
        _: 3
      })),
      c("div", {
        id: v.id,
        ref_key: "collapse",
        ref: a,
        class: A(["fr-collapse", {
          "fr-collapse--expanded": Q(l),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": Q(r)
        }]),
        onTransitionend: y[1] || (y[1] = (x) => Q(o)(Q(d)))
      }, [
        C(v.$slots, "default")
      ], 42, il)
    ]));
  }
}), dl = { class: "fr-accordions-group" }, ul = /* @__PURE__ */ D({
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
    }), n = N(/* @__PURE__ */ new Map()), o = N(0);
    return Kt($t, (s) => {
      const u = o.value++;
      n.value.set(u, s.value);
      const d = h(() => u === l.value);
      ee(s, () => {
        n.value.set(u, s.value);
      });
      function p() {
        if (l.value === u) {
          l.value = -1;
          return;
        }
        l.value = u;
      }
      return ue(() => {
        n.value.delete(u);
      }), { isActive: d, expand: p };
    }), (s, u) => (i(), f("div", dl, [
      C(s.$slots, "default")
    ]));
  }
}), cl = ["id", "role"], fl = ["title", "aria-label"], pl = /* @__PURE__ */ D({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => K("basic", "alert") },
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
      o.small ? b("", !0) : (i(), T(te(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: j(() => [
          S(m(o.title), 1)
        ]),
        _: 1
      })),
      C(o.$slots, "default", {}, () => [
        S(m(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: l
      }, null, 8, fl)) : b("", !0)
    ], 10, cl));
  }
}), vl = ["title"], ea = /* @__PURE__ */ D({
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
    ], 10, vl));
  }
}), ml = ["aria-label"], gl = ["aria-expanded", "aria-controls"], bl = ["id"], hl = { class: "fr-breadcrumb__list" }, yl = ["aria-current"], kl = /* @__PURE__ */ D({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => K("breadcrumb") },
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
    } = ce(), o = N(!1);
    return ee(o, (s, u) => {
      s !== u && l(s);
    }), (s, u) => {
      const d = oe("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        nt(c("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => o.value = !o.value)
        }, m(s.showBreadcrumbLabel), 9, gl), [
          [Xt, !o.value]
        ]),
        c("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: A(["fr-collapse", {
            "fr-collapse--expanded": Q(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Q(a)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => Q(n)(o.value))
        }, [
          c("ol", hl, [
            (i(!0), f(P, null, O(s.links, (p, v) => (i(), f("li", {
              key: v,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), T(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": v === s.links.length - 1 ? "page" : void 0
              }, {
                default: j(() => [
                  S(m(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : b("", !0),
              p.to ? b("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": v === s.links.length - 1 ? "page" : void 0
              }, m(p.text), 9, yl))
            ]))), 128))
          ])
        ], 42, bl)
      ], 8, ml);
    };
  }
}), ye = /^[a-z0-9]+(-[a-z0-9]+)*$/, Ve = (t, e, a, r = "") => {
  const l = t.split(":");
  if (t.slice(0, 1) === "@") {
    if (l.length < 2 || l.length > 3)
      return null;
    r = l.shift().slice(1);
  }
  if (l.length > 3 || !l.length)
    return null;
  if (l.length > 1) {
    const s = l.pop(), u = l.pop(), d = {
      // Allow provider without '@': "provider:prefix:name"
      provider: l.length > 0 ? l[0] : r,
      prefix: u,
      name: s
    };
    return e && !Te(d) ? null : d;
  }
  const n = l[0], o = n.split("-");
  if (o.length > 1) {
    const s = {
      provider: r,
      prefix: o.shift(),
      name: o.join("-")
    };
    return e && !Te(s) ? null : s;
  }
  if (a && r === "") {
    const s = {
      provider: r,
      prefix: "",
      name: n
    };
    return e && !Te(s, a) ? null : s;
  }
  return null;
}, Te = (t, e) => t ? !!((t.provider === "" || t.provider.match(ye)) && (e && t.prefix === "" || t.prefix.match(ye)) && t.name.match(ye)) : !1, ta = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), Be = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), Ne = Object.freeze({
  ...ta,
  ...Be
}), Ke = Object.freeze({
  ...Ne,
  body: "",
  hidden: !1
});
function _l(t, e) {
  const a = {};
  !t.hFlip != !e.hFlip && (a.hFlip = !0), !t.vFlip != !e.vFlip && (a.vFlip = !0);
  const r = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return r && (a.rotate = r), a;
}
function kt(t, e) {
  const a = _l(t, e);
  for (const r in Ke)
    r in Be ? r in t && !(r in a) && (a[r] = Be[r]) : r in e ? a[r] = e[r] : r in t && (a[r] = t[r]);
  return a;
}
function wl(t, e) {
  const a = t.icons, r = t.aliases || /* @__PURE__ */ Object.create(null), l = /* @__PURE__ */ Object.create(null);
  function n(o) {
    if (a[o])
      return l[o] = [];
    if (!(o in l)) {
      l[o] = null;
      const s = r[o] && r[o].parent, u = s && n(s);
      u && (l[o] = [s].concat(u));
    }
    return l[o];
  }
  return Object.keys(a).concat(Object.keys(r)).forEach(n), l;
}
function xl(t, e, a) {
  const r = t.icons, l = t.aliases || /* @__PURE__ */ Object.create(null);
  let n = {};
  function o(s) {
    n = kt(
      r[s] || l[s],
      n
    );
  }
  return o(e), a.forEach(o), kt(t, n);
}
function aa(t, e) {
  const a = [];
  if (typeof t != "object" || typeof t.icons != "object")
    return a;
  t.not_found instanceof Array && t.not_found.forEach((l) => {
    e(l, null), a.push(l);
  });
  const r = wl(t);
  for (const l in r) {
    const n = r[l];
    n && (e(l, xl(t, l, n)), a.push(l));
  }
  return a;
}
const Dl = {
  provider: "",
  aliases: {},
  not_found: {},
  ...ta
};
function Qe(t, e) {
  for (const a in e)
    if (a in t && typeof t[a] != typeof e[a])
      return !1;
  return !0;
}
function la(t) {
  if (typeof t != "object" || t === null)
    return null;
  const e = t;
  if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !Qe(t, Dl))
    return null;
  const a = e.icons;
  for (const l in a) {
    const n = a[l];
    if (!l.match(ye) || typeof n.body != "string" || !Qe(
      n,
      Ke
    ))
      return null;
  }
  const r = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const l in r) {
    const n = r[l], o = n.parent;
    if (!l.match(ye) || typeof o != "string" || !a[o] && !r[o] || !Qe(
      n,
      Ke
    ))
      return null;
  }
  return e;
}
const _t = /* @__PURE__ */ Object.create(null);
function Il(t, e) {
  return {
    provider: t,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function pe(t, e) {
  const a = _t[t] || (_t[t] = /* @__PURE__ */ Object.create(null));
  return a[e] || (a[e] = Il(t, e));
}
function it(t, e) {
  return la(e) ? aa(e, (a, r) => {
    r ? t.icons[a] = r : t.missing.add(a);
  }) : [];
}
function Cl(t, e, a) {
  try {
    if (typeof a.body == "string")
      return t.icons[e] = { ...a }, !0;
  } catch {
  }
  return !1;
}
let _e = !1;
function ra(t) {
  return typeof t == "boolean" && (_e = t), _e;
}
function Tl(t) {
  const e = typeof t == "string" ? Ve(t, !0, _e) : t;
  if (e) {
    const a = pe(e.provider, e.prefix), r = e.name;
    return a.icons[r] || (a.missing.has(r) ? null : void 0);
  }
}
function El(t, e) {
  const a = Ve(t, !0, _e);
  if (!a)
    return !1;
  const r = pe(a.provider, a.prefix);
  return Cl(r, a.name, e);
}
function Bl(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), _e && !e && !t.prefix) {
    let l = !1;
    return la(t) && (t.prefix = "", aa(t, (n, o) => {
      o && El(n, o) && (l = !0);
    })), l;
  }
  const a = t.prefix;
  if (!Te({
    provider: e,
    prefix: a,
    name: "a"
  }))
    return !1;
  const r = pe(e, a);
  return !!it(r, t);
}
const na = Object.freeze({
  width: null,
  height: null
}), oa = Object.freeze({
  // Dimensions
  ...na,
  // Transformations
  ...Be
}), Sl = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Al = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function wt(t, e, a) {
  if (e === 1)
    return t;
  if (a = a || 100, typeof t == "number")
    return Math.ceil(t * e * a) / a;
  if (typeof t != "string")
    return t;
  const r = t.split(Sl);
  if (r === null || !r.length)
    return t;
  const l = [];
  let n = r.shift(), o = Al.test(n);
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
function Ll(t, e = "defs") {
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
function Ml(t, e) {
  return t ? "<defs>" + t + "</defs>" + e : e;
}
function Fl(t, e, a) {
  const r = Ll(t);
  return Ml(r.defs, e + r.content + a);
}
const Pl = (t) => t === "unset" || t === "undefined" || t === "none";
function Vl(t, e) {
  const a = {
    ...Ne,
    ...t
  }, r = {
    ...oa,
    ...e
  }, l = {
    left: a.left,
    top: a.top,
    width: a.width,
    height: a.height
  };
  let n = a.body;
  [a, r].forEach((L) => {
    const g = [], I = L.hFlip, F = L.vFlip;
    let R = L.rotate;
    I ? F ? R += 2 : (g.push(
      "translate(" + (l.width + l.left).toString() + " " + (0 - l.top).toString() + ")"
    ), g.push("scale(-1 1)"), l.top = l.left = 0) : F && (g.push(
      "translate(" + (0 - l.left).toString() + " " + (l.height + l.top).toString() + ")"
    ), g.push("scale(1 -1)"), l.top = l.left = 0);
    let B;
    switch (R < 0 && (R -= Math.floor(R / 4) * 4), R = R % 4, R) {
      case 1:
        B = l.height / 2 + l.top, g.unshift(
          "rotate(90 " + B.toString() + " " + B.toString() + ")"
        );
        break;
      case 2:
        g.unshift(
          "rotate(180 " + (l.width / 2 + l.left).toString() + " " + (l.height / 2 + l.top).toString() + ")"
        );
        break;
      case 3:
        B = l.width / 2 + l.left, g.unshift(
          "rotate(-90 " + B.toString() + " " + B.toString() + ")"
        );
        break;
    }
    R % 2 === 1 && (l.left !== l.top && (B = l.left, l.left = l.top, l.top = B), l.width !== l.height && (B = l.width, l.width = l.height, l.height = B)), g.length && (n = Fl(
      n,
      '<g transform="' + g.join(" ") + '">',
      "</g>"
    ));
  });
  const o = r.width, s = r.height, u = l.width, d = l.height;
  let p, v;
  o === null ? (v = s === null ? "1em" : s === "auto" ? d : s, p = wt(v, u / d)) : (p = o === "auto" ? u : o, v = s === null ? wt(p, d / u) : s === "auto" ? d : s);
  const y = {}, x = (L, g) => {
    Pl(g) || (y[L] = g.toString());
  };
  x("width", p), x("height", v);
  const k = [l.left, l.top, u, d];
  return y.viewBox = k.join(" "), {
    attributes: y,
    viewBox: k,
    body: n
  };
}
const Nl = /\sid="(\S+)"/g, jl = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Rl = 0;
function Ol(t, e = jl) {
  const a = [];
  let r;
  for (; r = Nl.exec(t); )
    a.push(r[1]);
  if (!a.length)
    return t;
  const l = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return a.forEach((n) => {
    const o = typeof e == "function" ? e(n) : e + (Rl++).toString(), s = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', "g"),
      "$1" + o + l + "$3"
    );
  }), t = t.replace(new RegExp(l, "g"), ""), t;
}
const Xe = /* @__PURE__ */ Object.create(null);
function ql(t, e) {
  Xe[t] = e;
}
function We(t) {
  return Xe[t] || Xe[""];
}
function st(t) {
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
const dt = /* @__PURE__ */ Object.create(null), De = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], Ue = [];
for (; De.length > 0; )
  De.length === 1 || Math.random() > 0.5 ? Ue.push(De.shift()) : Ue.push(De.pop());
dt[""] = st({
  resources: ["https://api.iconify.design"].concat(Ue)
});
function zl(t, e) {
  const a = st(e);
  return a === null ? !1 : (dt[t] = a, !0);
}
function ut(t) {
  return dt[t];
}
const Ql = () => {
  let t;
  try {
    if (t = fetch, typeof t == "function")
      return t;
  } catch {
  }
};
let xt = Ql();
function Hl(t, e) {
  const a = ut(t);
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
function Gl(t) {
  return t === 404;
}
const Kl = (t, e, a) => {
  const r = [], l = Hl(t, e), n = "icons";
  let o = {
    type: n,
    provider: t,
    prefix: e,
    icons: []
  }, s = 0;
  return a.forEach((u, d) => {
    s += u.length + 1, s >= l && d > 0 && (r.push(o), o = {
      type: n,
      provider: t,
      prefix: e,
      icons: []
    }, s = u.length), o.icons.push(u);
  }), r.push(o), r;
};
function Xl(t) {
  if (typeof t == "string") {
    const e = ut(t);
    if (e)
      return e.path;
  }
  return "/";
}
const Wl = (t, e, a) => {
  if (!xt) {
    a("abort", 424);
    return;
  }
  let r = Xl(e.provider);
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
  xt(t + r).then((n) => {
    const o = n.status;
    if (o !== 200) {
      setTimeout(() => {
        a(Gl(o) ? "abort" : "next", o);
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
}, Ul = {
  prepare: Kl,
  send: Wl
};
function Yl(t) {
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
    const n = l.provider, o = l.prefix, s = l.name, u = a[n] || (a[n] = /* @__PURE__ */ Object.create(null)), d = u[o] || (u[o] = pe(n, o));
    let p;
    s in d.icons ? p = e.loaded : o === "" || d.missing.has(s) ? p = e.missing : p = e.pending;
    const v = {
      provider: n,
      prefix: o,
      name: s
    };
    p.push(v);
  }), e;
}
function ia(t, e) {
  t.forEach((a) => {
    const r = a.loaderCallbacks;
    r && (a.loaderCallbacks = r.filter((l) => l.id !== e));
  });
}
function Zl(t) {
  t.pendingCallbacksFlag || (t.pendingCallbacksFlag = !0, setTimeout(() => {
    t.pendingCallbacksFlag = !1;
    const e = t.loaderCallbacks ? t.loaderCallbacks.slice(0) : [];
    if (!e.length)
      return;
    let a = !1;
    const r = t.provider, l = t.prefix;
    e.forEach((n) => {
      const o = n.icons, s = o.pending.length;
      o.pending = o.pending.filter((u) => {
        if (u.prefix !== l)
          return !0;
        const d = u.name;
        if (t.icons[d])
          o.loaded.push({
            provider: r,
            prefix: l,
            name: d
          });
        else if (t.missing.has(d))
          o.missing.push({
            provider: r,
            prefix: l,
            name: d
          });
        else
          return a = !0, !0;
        return !1;
      }), o.pending.length !== s && (a || ia([t], n.id), n.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        n.abort
      ));
    });
  }));
}
let Jl = 0;
function $l(t, e, a) {
  const r = Jl++, l = ia.bind(null, a, r);
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
function er(t, e = !0, a = !1) {
  const r = [];
  return t.forEach((l) => {
    const n = typeof l == "string" ? Ve(l, e, a) : l;
    n && r.push(n);
  }), r;
}
var tr = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function ar(t, e, a, r) {
  const l = t.resources.length, n = t.random ? Math.floor(Math.random() * l) : t.index;
  let o;
  if (t.random) {
    let E = t.resources.slice(0);
    for (o = []; E.length > 1; ) {
      const z = Math.floor(Math.random() * E.length);
      o.push(E[z]), E = E.slice(0, z).concat(E.slice(z + 1));
    }
    o = o.concat(E);
  } else
    o = t.resources.slice(n).concat(t.resources.slice(0, n));
  const s = Date.now();
  let u = "pending", d = 0, p, v = null, y = [], x = [];
  typeof r == "function" && x.push(r);
  function k() {
    v && (clearTimeout(v), v = null);
  }
  function L() {
    u === "pending" && (u = "aborted"), k(), y.forEach((E) => {
      E.status === "pending" && (E.status = "aborted");
    }), y = [];
  }
  function g(E, z) {
    z && (x = []), typeof E == "function" && x.push(E);
  }
  function I() {
    return {
      startTime: s,
      payload: e,
      status: u,
      queriesSent: d,
      queriesPending: y.length,
      subscribe: g,
      abort: L
    };
  }
  function F() {
    u = "failed", x.forEach((E) => {
      E(void 0, p);
    });
  }
  function R() {
    y.forEach((E) => {
      E.status === "pending" && (E.status = "aborted");
    }), y = [];
  }
  function B(E, z, U) {
    const Y = z !== "success";
    switch (y = y.filter((_) => _ !== E), u) {
      case "pending":
        break;
      case "failed":
        if (Y || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (z === "abort") {
      p = U, F();
      return;
    }
    if (Y) {
      p = U, y.length || (o.length ? q() : F());
      return;
    }
    if (k(), R(), !t.random) {
      const _ = t.resources.indexOf(E.resource);
      _ !== -1 && _ !== t.index && (t.index = _);
    }
    u = "completed", x.forEach((_) => {
      _(U);
    });
  }
  function q() {
    if (u !== "pending")
      return;
    k();
    const E = o.shift();
    if (E === void 0) {
      if (y.length) {
        v = setTimeout(() => {
          k(), u === "pending" && (R(), F());
        }, t.timeout);
        return;
      }
      F();
      return;
    }
    const z = {
      status: "pending",
      resource: E,
      callback: (U, Y) => {
        B(z, U, Y);
      }
    };
    y.push(z), d++, v = setTimeout(q, t.rotate), a(E, e, z.callback);
  }
  return setTimeout(q), I;
}
function sa(t) {
  const e = {
    ...tr,
    ...t
  };
  let a = [];
  function r() {
    a = a.filter((o) => o().status === "pending");
  }
  function l(o, s, u) {
    const d = ar(
      e,
      o,
      s,
      (p, v) => {
        r(), u && u(p, v);
      }
    );
    return a.push(d), d;
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
function Dt() {
}
const He = /* @__PURE__ */ Object.create(null);
function lr(t) {
  if (!He[t]) {
    const e = ut(t);
    if (!e)
      return;
    const a = sa(e), r = {
      config: e,
      redundancy: a
    };
    He[t] = r;
  }
  return He[t];
}
function rr(t, e, a) {
  let r, l;
  if (typeof t == "string") {
    const n = We(t);
    if (!n)
      return a(void 0, 424), Dt;
    l = n.send;
    const o = lr(t);
    o && (r = o.redundancy);
  } else {
    const n = st(t);
    if (n) {
      r = sa(n);
      const o = t.resources ? t.resources[0] : "", s = We(o);
      s && (l = s.send);
    }
  }
  return !r || !l ? (a(void 0, 424), Dt) : r.query(e, l, a)().abort;
}
const It = "iconify2", we = "iconify", da = we + "-count", Ct = we + "-version", ua = 36e5, nr = 168, or = 50;
function Ye(t, e) {
  try {
    return t.getItem(e);
  } catch {
  }
}
function ct(t, e, a) {
  try {
    return t.setItem(e, a), !0;
  } catch {
  }
}
function Tt(t, e) {
  try {
    t.removeItem(e);
  } catch {
  }
}
function Ze(t, e) {
  return ct(t, da, e.toString());
}
function Je(t) {
  return parseInt(Ye(t, da)) || 0;
}
const je = {
  local: !0,
  session: !0
}, ca = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let ft = !1;
function ir(t) {
  ft = t;
}
let Ie = typeof window > "u" ? {} : window;
function fa(t) {
  const e = t + "Storage";
  try {
    if (Ie && Ie[e] && typeof Ie[e].length == "number")
      return Ie[e];
  } catch {
  }
  je[t] = !1;
}
function pa(t, e) {
  const a = fa(t);
  if (!a)
    return;
  const r = Ye(a, Ct);
  if (r !== It) {
    if (r) {
      const s = Je(a);
      for (let u = 0; u < s; u++)
        Tt(a, we + u.toString());
    }
    ct(a, Ct, It), Ze(a, 0);
    return;
  }
  const l = Math.floor(Date.now() / ua) - nr, n = (s) => {
    const u = we + s.toString(), d = Ye(a, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > l && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        e(p, s))
          return !0;
      } catch {
      }
      Tt(a, u);
    }
  };
  let o = Je(a);
  for (let s = o - 1; s >= 0; s--)
    n(s) || (s === o - 1 ? (o--, Ze(a, o)) : ca[t].add(s));
}
function va() {
  if (!ft) {
    ir(!0);
    for (const t in je)
      pa(t, (e) => {
        const a = e.data, r = e.provider, l = a.prefix, n = pe(
          r,
          l
        );
        if (!it(n, a).length)
          return !1;
        const o = a.lastModified || -1;
        return n.lastModifiedCached = n.lastModifiedCached ? Math.min(n.lastModifiedCached, o) : o, !0;
      });
  }
}
function sr(t, e) {
  const a = t.lastModifiedCached;
  if (
    // Matches or newer
    a && a >= e
  )
    return a === e;
  if (t.lastModifiedCached = e, a)
    for (const r in je)
      pa(r, (l) => {
        const n = l.data;
        return l.provider !== t.provider || n.prefix !== t.prefix || n.lastModified === e;
      });
  return !0;
}
function dr(t, e) {
  ft || va();
  function a(r) {
    let l;
    if (!je[r] || !(l = fa(r)))
      return;
    const n = ca[r];
    let o;
    if (n.size)
      n.delete(o = Array.from(n).shift());
    else if (o = Je(l), o >= or || !Ze(l, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / ua),
      provider: t.provider,
      data: e
    };
    return ct(
      l,
      we + o.toString(),
      JSON.stringify(s)
    );
  }
  e.lastModified && !sr(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && (e = Object.assign({}, e), delete e.not_found), a("local") || a("session"));
}
function Et() {
}
function ur(t) {
  t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
    t.iconsLoaderFlag = !1, Zl(t);
  }));
}
function cr(t, e) {
  t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
    t.iconsQueueFlag = !1;
    const { provider: a, prefix: r } = t, l = t.iconsToLoad;
    delete t.iconsToLoad;
    let n;
    !l || !(n = We(a)) || n.prepare(a, r, l).forEach((o) => {
      rr(a, o, (s) => {
        if (typeof s != "object")
          o.icons.forEach((u) => {
            t.missing.add(u);
          });
        else
          try {
            const u = it(
              t,
              s
            );
            if (!u.length)
              return;
            const d = t.pendingIcons;
            d && u.forEach((p) => {
              d.delete(p);
            }), dr(t, s);
          } catch (u) {
            console.error(u);
          }
        ur(t);
      });
    });
  }));
}
const fr = (t, e) => {
  const a = er(t, !0, ra()), r = Yl(a);
  if (!r.pending.length) {
    let u = !0;
    return e && setTimeout(() => {
      u && e(
        r.loaded,
        r.missing,
        r.pending,
        Et
      );
    }), () => {
      u = !1;
    };
  }
  const l = /* @__PURE__ */ Object.create(null), n = [];
  let o, s;
  return r.pending.forEach((u) => {
    const { provider: d, prefix: p } = u;
    if (p === s && d === o)
      return;
    o = d, s = p, n.push(pe(d, p));
    const v = l[d] || (l[d] = /* @__PURE__ */ Object.create(null));
    v[p] || (v[p] = []);
  }), r.pending.forEach((u) => {
    const { provider: d, prefix: p, name: v } = u, y = pe(d, p), x = y.pendingIcons || (y.pendingIcons = /* @__PURE__ */ new Set());
    x.has(v) || (x.add(v), l[d][p].push(v));
  }), n.forEach((u) => {
    const { provider: d, prefix: p } = u;
    l[d][p].length && cr(u, l[d][p]);
  }), e ? $l(e, r, n) : Et;
};
function pr(t, e) {
  const a = {
    ...t
  };
  for (const r in e) {
    const l = e[r], n = typeof l;
    r in na ? (l === null || l && (n === "string" || n === "number")) && (a[r] = l) : n === typeof a[r] && (a[r] = r === "rotate" ? l % 4 : l);
  }
  return a;
}
const vr = /[\s,]+/;
function mr(t, e) {
  e.split(vr).forEach((a) => {
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
function gr(t, e = 0) {
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
function br(t, e) {
  let a = t.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in e)
    a += " " + r + '="' + e[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + a + ">" + t + "</svg>";
}
function hr(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function yr(t) {
  return "data:image/svg+xml," + hr(t);
}
function kr(t) {
  return 'url("' + yr(t) + '")';
}
const Bt = {
  ...oa,
  inline: !1
}, _r = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, wr = {
  display: "inline-block"
}, $e = {
  backgroundColor: "currentColor"
}, ma = {
  backgroundColor: "transparent"
}, St = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, At = {
  webkitMask: $e,
  mask: $e,
  background: ma
};
for (const t in At) {
  const e = At[t];
  for (const a in St)
    e[t + a] = St[a];
}
const Ee = {};
["horizontal", "vertical"].forEach((t) => {
  const e = t.slice(0, 1) + "Flip";
  Ee[t + "-flip"] = e, Ee[t.slice(0, 1) + "-flip"] = e, Ee[t + "Flip"] = e;
});
function Lt(t) {
  return t + (t.match(/^[-0-9.]+$/) ? "px" : "");
}
const Mt = (t, e) => {
  const a = pr(Bt, e), r = { ..._r }, l = e.mode || "svg", n = {}, o = e.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
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
          typeof g == "string" && mr(a, g);
          break;
        case "color":
          n.color = g;
          break;
        case "rotate":
          typeof g == "string" ? a[L] = gr(g) : typeof g == "number" && (a[L] = g);
          break;
        case "ariaHidden":
        case "aria-hidden":
          g !== !0 && g !== "true" && delete r["aria-hidden"];
          break;
        default: {
          const I = Ee[L];
          I ? (g === !0 || g === "true" || g === 1) && (a[I] = !0) : Bt[L] === void 0 && (r[L] = g);
        }
      }
  }
  const u = Vl(t, a), d = u.attributes;
  if (a.inline && (n.verticalAlign = "-0.125em"), l === "svg") {
    r.style = {
      ...n,
      ...s
    }, Object.assign(r, d);
    let L = 0, g = e.id;
    return typeof g == "string" && (g = g.replace(/-/g, "_")), r.innerHTML = Ol(u.body, g ? () => g + "ID" + L++ : "iconifyVue"), ht("svg", r);
  }
  const { body: p, width: v, height: y } = t, x = l === "mask" || (l === "bg" ? !1 : p.indexOf("currentColor") !== -1), k = br(p, {
    ...d,
    width: v + "",
    height: y + ""
  });
  return r.style = {
    ...n,
    "--svg": kr(k),
    width: Lt(d.width),
    height: Lt(d.height),
    ...wr,
    ...x ? $e : ma,
    ...s
  }, ht("span", r);
};
ra(!0);
ql("", Ul);
if (typeof document < "u" && typeof window < "u") {
  va();
  const t = window;
  if (t.IconifyPreload !== void 0) {
    const e = t.IconifyPreload, a = "Invalid IconifyPreload syntax.";
    typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach((r) => {
      try {
        (typeof r != "object" || r === null || r instanceof Array || // Check for 'icons' and 'prefix'
        typeof r.icons != "object" || typeof r.prefix != "string" || // Add icon set
        !Bl(r)) && console.error(a);
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
          zl(a, l) || console.error(r);
        } catch {
          console.error(r);
        }
      }
  }
}
const xr = {
  ...Ne,
  body: ""
}, Dr = D({
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
      if (typeof t != "string" || (a = Ve(t, !1, !0)) === null)
        return this.abortLoading(), null;
      const r = Tl(a);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== t) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: t,
          abort: fr([a], () => {
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
      return Mt(xr, t);
    let a = t;
    return e.classes && (a = {
      ...t,
      class: (typeof t.class == "string" ? t.class + " " : "") + e.classes.join(" ")
    }), Mt({
      ...Ne,
      ...e.data
    }, a);
  }
}), Ir = /* @__PURE__ */ D({
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
    Ut((u) => ({
      "3ef38e54": s.value
    }));
    const e = t, a = N(null), r = h(() => `${+e.scale * 1.2}rem`), l = h(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    ee(() => e.title, n);
    async function n() {
      var u, d, p, v;
      if (!((u = a.value) != null && u.$el))
        return;
      const y = !!((d = a.value) == null ? void 0 : d.$el).querySelector("title"), x = document.createElement("title");
      if (!e.title) {
        x.remove();
        return;
      }
      x.innerHTML = e.title, await Yt(), y || (v = ((p = a.value) == null ? void 0 : p.$el).firstChild) == null || v.before(x);
    }
    ne(n);
    const o = h(() => {
      var u;
      return (u = e.name) != null && u.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), s = h(() => e.color ?? e.fill ?? "inherit");
    return (u, d) => (i(), T(Q(Dr), {
      ref_key: "icon",
      ref: a,
      icon: o.value,
      style: se({ fontSize: r.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
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
      ssr: u.ssr
    }, null, 8, ["icon", "style", "aria-label", "class", "flip", "ssr"]));
  }
}), le = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [r, l] of e)
    a[r] = l;
  return a;
}, ae = /* @__PURE__ */ le(Ir, [["__scopeId", "data-v-55df88e4"]]), Cr = ["title", "disabled", "aria-disabled"], Tr = { key: 1 }, Er = /* @__PURE__ */ D({
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
    const a = t, r = h(() => ["sm", "small"].includes(a.size)), l = h(() => ["md", "medium"].includes(a.size)), n = h(() => ["lg", "large"].includes(a.size)), o = N(null);
    e({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const s = h(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), u = h(() => a.iconOnly ? 1.25 : 0.8325), d = h(
      () => typeof a.icon == "string" ? { scale: u.value, name: a.icon } : { scale: u.value, ...a.icon }
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
      p.icon && !s.value ? (i(), T(ae, ie(V({ key: 0 }, d.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", Tr, [
        S(m(p.label) + " ", 1),
        C(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Cr));
  }
}), xe = /* @__PURE__ */ le(Er, [["__scopeId", "data-v-77b13897"]]), Re = /* @__PURE__ */ D({
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
    const e = t, a = N(null), r = h(() => ["sm", "small"].includes(e.size)), l = h(() => ["md", "medium"].includes(e.size)), n = h(() => ["lg", "large"].includes(e.size)), o = h(() => ["always", "", !0].includes(e.inlineLayoutWhen)), s = h(() => ["sm", "small"].includes(e.inlineLayoutWhen)), u = h(() => ["md", "medium"].includes(e.inlineLayoutWhen)), d = h(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = h(() => e.align === "center"), v = h(() => e.align === "right"), y = N("auto"), x = h(() => `--equisized-width: ${y.value};`), k = async () => {
      var L;
      let g = 0;
      await new Promise((I) => setTimeout(I, 100)), (L = a.value) == null || L.querySelectorAll(".fr-btn").forEach((I) => {
        const F = I, R = F.offsetWidth, B = window.getComputedStyle(F), q = +B.marginLeft.replace("px", ""), E = +B.marginRight.replace("px", "");
        F.style.width = "var(--equisized-width)";
        const z = R + q + E;
        z > g && (g = z);
      }), y.value = `${g}px`;
    };
    return ne(async () => {
      !a.value || !e.equisized || await k();
    }), (L, g) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: se(x.value),
      class: A(["fr-btns-group", {
        "fr-btns-group--equisized": L.equisized,
        "fr-btns-group--sm": r.value,
        "fr-btns-group--md": l.value,
        "fr-btns-group--lg": n.value,
        "fr-btns-group--inline-sm": o.value || s.value,
        "fr-btns-group--inline-md": o.value || u.value,
        "fr-btns-group--inline-lg": o.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": v.value,
        "fr-btns-group--icon-right": L.iconRight,
        "fr-btns-group--inline-reverse": L.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(P, null, O(L.buttons, ({ onClick: I, ...F }, R) => (i(), f("li", { key: R }, [
        G(xe, V({ ref_for: !0 }, F, { onClick: I }), null, 16, ["onClick"])
      ]))), 128)),
      C(L.$slots, "default")
    ], 6));
  }
}), Br = { class: "fr-callout__text" }, Sr = /* @__PURE__ */ D({
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
      l.icon && r.value ? (i(), T(ae, ie(V({ key: 0 }, r.value)), null, 16)) : b("", !0),
      l.title ? (i(), T(te(l.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: j(() => [
          S(m(l.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      c("p", Br, m(l.content), 1),
      l.button ? (i(), T(xe, ie(V({ key: 2 }, l.button)), null, 16)) : b("", !0),
      C(l.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Ar = /* @__PURE__ */ le(Sr, [["__scopeId", "data-v-1cb1f075"]]), Ft = /* @__PURE__ */ D({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = h(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), r = h(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, n) => (i(), f("p", {
      class: A(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
    }, [
      l.icon && !a.value ? (i(), T(ae, ie(V({ key: 0 }, r.value)), null, 16)) : b("", !0),
      C(l.$slots, "default")
    ], 2));
  }
}), Lr = { class: "fr-card__body" }, Mr = { class: "fr-card__content" }, Fr = ["href"], Pr = { class: "fr-card__desc" }, Vr = {
  key: 0,
  class: "fr-card__start"
}, Nr = {
  key: 1,
  class: "fr-card__end"
}, jr = {
  key: 0,
  class: "fr-card__footer"
}, Rr = {
  key: 1,
  class: "fr-links-group"
}, Or = ["href"], qr = {
  key: 0,
  class: "fr-card__header"
}, zr = {
  key: 0,
  class: "fr-card__img"
}, Qr = ["src", "alt"], Hr = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, Gr = /* @__PURE__ */ D({
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
    linksGroup: { default: () => [] },
    noArrow: { type: Boolean },
    horizontal: { type: Boolean },
    download: { type: Boolean },
    enlarge: { type: Boolean }
  },
  setup(t, { expose: e }) {
    const a = t, r = h(() => ["sm", "small"].includes(a.size)), l = h(() => ["lg", "large"].includes(a.size)), n = h(() => ["sm", "small"].includes(a.imgRatio)), o = h(() => ["lg", "large"].includes(a.imgRatio)), s = h(() => typeof a.link == "string" && a.link.startsWith("http")), u = N(null);
    return e({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const v = oe("RouterLink");
      return i(), f("div", {
        class: A(["fr-card", {
          "fr-card--horizontal": d.horizontal,
          "fr-enlarge-link": !d.noArrow,
          "fr-card--sm": r.value,
          "fr-card--lg": l.value,
          "fr-card--horizontal-tier": n.value,
          "fr-card--horizontal-half": o.value,
          "fr-card--download": d.download,
          "fr-enlarge-button": d.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        c("div", Lr, [
          c("div", Mr, [
            (i(), T(te(d.titleTag), { class: "fr-card__title" }, {
              default: j(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, m(d.title), 9, Fr)) : d.link ? (i(), T(v, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (y) => y.stopPropagation())
                }, {
                  default: j(() => [
                    S(m(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(P, { key: 2 }, [
                  S(m(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Pr, m(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Vr, [
              C(d.$slots, "start-details"),
              d.detail ? (i(), T(Ft, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: j(() => [
                  S(m(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", Nr, [
              C(d.$slots, "end-details"),
              d.endDetail ? (i(), T(Ft, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: j(() => [
                  S(m(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", jr, [
            d.buttons.length ? (i(), T(Re, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            d.linksGroup.length ? (i(), f("ul", Rr, [
              (i(!0), f(P, null, O(d.linksGroup, (y, x) => (i(), f("li", {
                key: `card-link-${x}`
              }, [
                y.to ? (i(), T(v, {
                  key: 0,
                  to: y.to
                }, {
                  default: j(() => [
                    S(m(y.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: y.link || y.href,
                  class: A(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": r.value,
                    "fr-link--lg": l.value
                  }])
                }, m(y.label), 11, Or))
              ]))), 128))
            ])) : b("", !0)
          ])) : b("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", qr, [
          d.imgSrc ? (i(), f("div", zr, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, Qr)
          ])) : b("", !0),
          d.badges.length ? (i(), f("ul", Hr, [
            (i(!0), f(P, null, O(d.badges, (y, x) => (i(), f("li", { key: x }, [
              G(ea, V({ ref_for: !0 }, y), null, 16)
            ]))), 128))
          ])) : b("", !0)
        ])) : b("", !0)
      ], 2);
    };
  }
}), Kr = ["id", "name", "checked", "required", "data-testid", "data-test"], Xr = ["for"], Wr = {
  key: 0,
  class: "required"
}, Ur = {
  key: 0,
  class: "fr-hint-text"
}, Yr = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, pt = /* @__PURE__ */ D({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: {
    id: { default: () => K("basic", "checkbox") },
    name: {},
    required: { type: Boolean },
    modelValue: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    label: { default: "" },
    errorMessage: { default: "" },
    validMessage: { default: "" },
    hint: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, r = e, l = h(() => a.errorMessage || a.validMessage), n = h(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (s) => {
      r("update:modelValue", s.target.checked);
    };
    return (s, u) => (i(), f("div", {
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": s.inline }])
    }, [
      c("div", {
        class: A(["fr-checkbox-group", {
          "fr-checkbox-group--error": s.errorMessage,
          "fr-checkbox-group--valid": !s.errorMessage && s.validMessage,
          "fr-checkbox-group--sm": s.small
        }])
      }, [
        c("input", V({
          id: s.id,
          name: s.name,
          type: "checkbox",
          checked: s.modelValue,
          required: s.required
        }, s.$attrs, {
          "data-testid": `input-checkbox-${s.id}`,
          "data-test": `input-checkbox-${s.id}`,
          onChange: u[0] || (u[0] = (d) => o(d))
        }), null, 16, Kr),
        c("label", {
          for: s.id,
          class: "fr-label"
        }, [
          C(s.$slots, "label", {}, () => [
            S(m(s.label) + " ", 1),
            C(s.$slots, "required-tip", {}, () => [
              s.required ? (i(), f("span", Wr, " *")) : b("", !0)
            ])
          ]),
          s.hint ? (i(), f("span", Ur, m(s.hint), 1)) : b("", !0)
        ], 8, Xr),
        l.value ? (i(), f("div", Yr, [
          c("p", {
            class: A(["fr-message--info flex items-center", n.value])
          }, m(l.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Zr = { class: "fr-form-group" }, Jr = ["disabled", "aria-labelledby", "aria-invalid", "role"], $r = ["id"], en = {
  key: 0,
  class: "required"
}, tn = ["id"], an = /* @__PURE__ */ D({
  __name: "DsfrCheckboxSet",
  props: {
    titleId: { default: () => K("checkbox", "group") },
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
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, r = e, l = h(() => a.errorMessage || a.validMessage), n = h(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = ({ name: u, checked: d }) => {
      const p = d ? [...a.modelValue, u] : a.modelValue.filter((v) => v !== u);
      r("update:modelValue", p);
    }, s = h(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (u, d) => (i(), f("div", Zr, [
      c("fieldset", {
        class: A(["fr-fieldset", {
          "fr-fieldset--error": u.errorMessage,
          "fr-fieldset--valid": !u.errorMessage && u.validMessage
        }]),
        disabled: u.disabled,
        "aria-labelledby": s.value,
        "aria-invalid": u.ariaInvalid,
        role: u.errorMessage || u.validMessage ? "group" : void 0
      }, [
        c("legend", {
          id: u.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          C(u.$slots, "legend", {}, () => [
            S(m(u.legend) + " ", 1),
            C(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", en, " *")) : b("", !0)
            ])
          ])
        ], 8, $r),
        C(u.$slots, "default", {}, () => [
          (i(!0), f(P, null, O(u.options, (p) => (i(), T(pt, {
            id: p.id,
            key: p.id || p.name,
            name: p.name,
            label: p.label,
            disabled: p.disabled,
            "aria-disabled": p.disabled,
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue.includes(p.name),
            hint: p.hint,
            "onUpdate:modelValue": (v) => o({ name: p.name, checked: v })
          }, null, 8, ["id", "name", "label", "disabled", "aria-disabled", "small", "inline", "model-value", "hint", "onUpdate:modelValue"]))), 128))
        ]),
        l.value ? (i(), f("div", {
          key: 0,
          id: `messages-${u.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          c("p", {
            class: A(["fr-message--info flex items-center", n.value])
          }, [
            c("span", null, m(l.value), 1)
          ], 2)
        ], 8, tn)) : b("", !0)
      ], 10, Jr)
    ]));
  }
}), ln = { class: "fr-consent-banner__content" }, rn = { class: "fr-text--sm" }, nn = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, on = /* @__PURE__ */ D({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = h(() => typeof e.url == "string" && e.url.startsWith("http")), r = h(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = h(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (n, o) => (i(), f(P, null, [
      c("div", ln, [
        c("p", rn, [
          C(n.$slots, "default", {}, () => [
            S(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page "),
            (i(), T(te(r.value), V(l.value, { "data-testid": "link" }), {
              default: j(() => [
                S(" Données personnelles et cookies ")
              ]),
              _: 1
            }, 16)),
            S(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. ")
          ])
        ])
      ]),
      c("ul", nn, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = J((s) => n.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = J((s) => n.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = J((s) => n.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), sn = "data:image/png;base64,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", dn = (t) => (Zt("data-v-0f6cf5b4"), t = t(), Jt(), t), un = { class: "fr-container flex" }, cn = { class: "half" }, fn = { class: "fr-h1" }, pn = { class: "flex fr-my-md-3w" }, vn = { class: "fr-h6" }, mn = /* @__PURE__ */ dn(() => /* @__PURE__ */ c("div", { class: "half self-center text-center" }, [
  /* @__PURE__ */ c("img", {
    class: "error-img",
    src: sn
  })
], -1)), gn = /* @__PURE__ */ D({
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
      return i(), f("div", un, [
        c("div", cn, [
          c("h1", fn, m(e.title), 1),
          c("span", pn, m(e.subtitle), 1),
          c("p", vn, m(e.description), 1),
          c("p", null, m(e.help), 1),
          (r = e.buttons) != null && r.length ? (i(), T(Re, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : b("", !0),
          C(e.$slots, "default", {}, void 0, !0)
        ]),
        mn
      ]);
    };
  }
}), bn = /* @__PURE__ */ le(gn, [["__scopeId", "data-v-0f6cf5b4"]]), hn = { class: "fr-fieldset" }, yn = ["id"], kn = {
  key: 1,
  class: "fr-fieldset__element"
}, _n = { class: "fr-fieldset__element" }, wn = /* @__PURE__ */ D({
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
      return i(), f("fieldset", hn, [
        e.legend || (l = (r = e.$slots).legend) != null && l.call(r).length ? (i(), f("legend", {
          key: 0,
          id: e.legendId,
          class: A(["fr-fieldset__legend", e.legendClass])
        }, [
          S(m(e.legend) + " ", 1),
          C(e.$slots, "legend")
        ], 10, yn)) : b("", !0),
        e.hint || (o = (n = e.$slots).hint) != null && o.call(n).length ? (i(), f("div", kn, [
          c("span", {
            class: A(["fr-hint-text", e.hintClass])
          }, [
            S(m(e.hint) + " ", 1),
            C(e.$slots, "hint")
          ], 2)
        ])) : b("", !0),
        c("div", _n, [
          C(e.$slots, "default")
        ])
      ]);
    };
  }
}), xn = ["href", "download"], Dn = { class: "fr-link__detail" }, ga = /* @__PURE__ */ D({
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
      S(m(e.title) + " ", 1),
      c("span", Dn, m(e.format) + " – " + m(e.size), 1)
    ], 8, xn));
  }
}), In = { class: "fr-downloads-group fr-downloads-group--bordered" }, Cn = {
  key: 0,
  class: "fr-downloads-group__title"
}, Tn = /* @__PURE__ */ D({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", In, [
      e.title ? (i(), f("h4", Cn, m(e.title), 1)) : b("", !0),
      c("ul", null, [
        (i(!0), f(P, null, O(e.files, (r, l) => (i(), f("li", { key: l }, [
          G(ga, {
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
}), En = ["for"], Bn = {
  key: 0,
  class: "required"
}, Sn = {
  key: 1,
  class: "fr-hint-text"
}, An = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Ln = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Mn = ["id"], Fn = /* @__PURE__ */ D({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => K("file-upload") },
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
      var s, u;
      r("update:modelValue", (s = o.target) == null ? void 0 : s.value), r("change", (u = o.target) == null ? void 0 : u.files);
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
        S(m(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", Bn, " *")) : b("", !0),
        o.hint ? (i(), f("span", Sn, m(o.hint), 1)) : b("", !0)
      ], 8, En),
      c("input", V({
        id: o.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": o.error || o.validMessage ? `${o.id}-desc` : void 0
      }, o.$attrs, {
        value: o.modelValue,
        disabled: o.disabled,
        "aria-disabled": o.disabled,
        accept: n.value,
        onChange: s[0] || (s[0] = (u) => l(u))
      }), null, 16, An),
      o.error || o.validMessage ? (i(), f("div", Ln, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, m(o.error ?? o.validMessage), 9, Mn)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Pn = { class: "fr-follow__social" }, Vn = /* @__PURE__ */ c("br", null, null, -1), Nn = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, jn = ["title", "href"], ba = /* @__PURE__ */ D({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Pn, [
      (i(), T(te(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: j(() => [
          S(" Suivez-nous "),
          Vn,
          S(" sur les réseaux sociaux ")
        ]),
        _: 1
      })),
      e.networks.length ? (i(), f("ul", Nn, [
        (i(!0), f(P, null, O(e.networks, (r, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: A(["fr-btn", `fr-btn--${r.type}`]),
            title: r.name,
            href: r.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, m(r.name), 11, jn)
        ]))), 128))
      ])) : b("", !0)
    ]));
  }
}), Rn = { class: "fr-follow__newsletter" }, On = { class: "fr-h5 fr-follow__title" }, qn = { class: "fr-text--sm fr-follow__desc" }, zn = { key: 0 }, Qn = ["title"], Hn = { key: 1 }, Gn = { action: "" }, Kn = {
  class: "fr-label",
  for: "newsletter-email"
}, Xn = { class: "fr-input-wrap fr-input-wrap--addon" }, Wn = ["title", "placeholder", "value"], Un = ["title"], Yn = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Zn = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Jn = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, ha = /* @__PURE__ */ D({
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
    return (l, n) => (i(), f("div", Rn, [
      c("div", null, [
        c("h3", On, m(l.title), 1),
        c("p", qn, m(l.description), 1)
      ]),
      l.onlyCallout ? (i(), f("div", zn, [
        c("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: n[0] || (n[0] = (o) => l.buttonAction ? l.buttonAction(o) : () => {
          })
        }, m(l.buttonText), 9, Qn)
      ])) : (i(), f("div", Hn, [
        c("form", Gn, [
          c("label", Kn, m(l.labelEmail), 1),
          c("div", Xn, [
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
            }, null, 40, Wn),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, m(l.buttonText), 9, Un)
          ]),
          l.error ? (i(), f("div", Yn, [
            c("p", Zn, m(l.error), 1)
          ])) : b("", !0),
          c("p", Jn, m(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), $n = { class: "fr-follow" }, eo = { class: "fr-container" }, to = { class: "fr-grid-row" }, ao = /* @__PURE__ */ D({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = h(() => e.networks && e.networks.length), r = h(() => typeof e.newsletterData == "object");
    return (l, n) => (i(), f("div", $n, [
      c("div", eo, [
        c("div", to, [
          C(l.$slots, "default", {}, () => [
            l.newsletterData ? (i(), f("div", {
              key: 0,
              class: A(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              G(ha, ie(ot(l.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            a.value ? (i(), f("div", {
              key: 1,
              class: A(["fr-col-12", { "fr-col-md-4": r.value }])
            }, [
              G(ba, { networks: l.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), lo = ["innerHTML"], Se = /* @__PURE__ */ D({
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
    }, null, 10, lo));
  }
}), ro = { class: "fr-footer__partners" }, no = {
  key: 0,
  class: "fr-footer__partners-title"
}, oo = { class: "fr-footer__partners-logos" }, io = {
  key: 0,
  class: "fr-footer__partners-main"
}, so = ["href"], uo = ["src", "alt"], co = { class: "fr-footer__partners-sub" }, fo = ["href"], po = ["src", "alt"], ya = /* @__PURE__ */ D({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", ro, [
      e.title ? (i(), f("h4", no, m(e.title), 1)) : b("", !0),
      c("div", oo, [
        e.mainPartner ? (i(), f("div", io, [
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
            }, null, 8, uo)
          ], 8, so)
        ])) : b("", !0),
        c("div", co, [
          c("ul", null, [
            (i(!0), f(P, null, O(e.subPartners, (r, l) => (i(), f("li", { key: l }, [
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
                }, null, 8, po)
              ], 8, fo)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), Pt = 1, vo = /* @__PURE__ */ D({
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
    href: { default: void 0 }
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
    }), s = h(() => o.value ? { to: o.value } : { href: n.value }), u = h(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), d = h(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Pt, ...e.iconAttrs ?? {} } : { scale: Pt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, v) => (i(), T(te(l.value), V({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, s.value, {
      target: p.target,
      onClick: J(p.onClick, ["stop"])
    }), {
      default: j(() => {
        var y, x;
        return [
          !u.value && (p.icon || (y = p.iconAttrs) != null && y.name) && !p.iconRight ? (i(), T(ae, V({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : b("", !0),
          S(" " + m(p.label) + " ", 1),
          !u.value && (p.icon || (x = p.iconAttrs) != null && x.name) && p.iconRight ? (i(), T(ae, V({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), mo = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, go = {
  key: 0,
  class: "fr-footer__top"
}, bo = { class: "fr-container" }, ho = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, yo = { class: "fr-container" }, ko = { class: "fr-footer__body" }, _o = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, wo = ["href"], xo = ["src", "alt"], Do = ["src", "alt"], Io = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, Co = { class: "fr-footer__content" }, To = { class: "fr-footer__content-desc" }, Eo = { class: "fr-footer__content-list" }, Bo = ["href"], So = { class: "fr-footer__bottom" }, Ao = { class: "fr-footer__bottom-list" }, Lo = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, Mo = /* @__PURE__ */ D({
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
        href: "https://info.gouv.fr"
      },
      {
        label: "service-public.fr",
        href: "https://service-public.fr"
      },
      {
        label: "legifrance.gouv.fr",
        href: "https://legifrance.gouv.fr"
      },
      {
        label: "data.gouv.fr",
        href: "https://data.gouv.fr"
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
    ]), r = Wt(), l = h(() => {
      var d;
      return (d = r["footer-link-lists"]) == null ? void 0 : d.call(r).length;
    }), n = h(() => {
      const d = e.licenceTo || e.licenceLinkProps.to;
      return d && typeof d == "string" && d.startsWith("http");
    }), o = h(() => n.value ? "" : e.licenceTo), s = h(() => n.value ? e.licenceTo : ""), u = h(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (d, p) => {
      const v = oe("RouterLink");
      return i(), f("footer", mo, [
        l.value ? (i(), f("div", go, [
          c("div", bo, [
            c("div", ho, [
              C(d.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : b("", !0),
        c("div", yo, [
          c("div", ko, [
            d.operatorImgSrc ? (i(), f("div", _o, [
              G(Se, { "logo-text": d.logoText }, null, 8, ["logo-text"]),
              u.value ? (i(), f("a", {
                key: 0,
                href: d.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: se(d.operatorImgStyle),
                  src: d.operatorImgSrc,
                  alt: d.operatorImgAlt
                }, null, 12, xo)
              ], 8, wo)) : (i(), T(v, {
                key: 1,
                class: "fr-footer__brand-link",
                to: d.homeLink,
                title: d.homeTitle
              }, {
                default: j(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: se(d.operatorImgStyle),
                    src: d.operatorImgSrc,
                    alt: d.operatorImgAlt
                  }, null, 12, Do)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", Io, [
              G(v, {
                to: d.homeLink,
                title: d.homeTitle
              }, {
                default: j(() => [
                  G(Se, { "logo-text": d.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", Co, [
              c("p", To, [
                C(d.$slots, "description", {}, () => [
                  S(m(d.descText), 1)
                ], !0)
              ]),
              c("ul", Eo, [
                (i(!0), f(P, null, O(d.ecosystemLinks, (y, x) => (i(), f("li", {
                  key: x,
                  class: "fr-footer__content-item"
                }, [
                  c("a", {
                    class: "fr-footer__content-link",
                    href: y.href,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  }, m(y.label), 9, Bo)
                ]))), 128))
              ])
            ])
          ]),
          d.partners ? (i(), T(ya, ie(V({ key: 0 }, d.partners)), null, 16)) : b("", !0),
          c("div", So, [
            c("ul", Ao, [
              (i(!0), f(P, null, O(a.value, (y, x) => (i(), f("li", {
                key: x,
                class: "fr-footer__bottom-item"
              }, [
                G(vo, V({ ref_for: !0 }, y), null, 16)
              ]))), 128))
            ]),
            d.licenceText ? (i(), f("div", Lo, [
              c("p", null, [
                S(m(d.licenceText) + " ", 1),
                (i(), T(te(n.value ? "a" : "RouterLink"), V({
                  class: "fr-link-licence no-content-after",
                  to: n.value ? null : o.value,
                  href: s.value,
                  target: n.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, d.licenceLinkProps), {
                  default: j(() => [
                    S(m(d.licenceName), 1)
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
}), Fo = /* @__PURE__ */ le(Mo, [["__scopeId", "data-v-c7f57597"]]), Po = { class: "fr-footer__top-cat" }, Vo = { class: "fr-footer__top-list" }, No = ["href"], jo = /* @__PURE__ */ D({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const r = oe("RouterLink");
      return i(), f("div", null, [
        c("h3", Po, m(e.categoryName), 1),
        c("ul", Vo, [
          (i(!0), f(P, null, O(e.links, (l, n) => (i(), f("li", { key: n }, [
            typeof l.to == "string" && l.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: l.to
            }, m(l.label), 9, No)) : b("", !0),
            typeof l.to == "object" || typeof l.to == "string" && !l.to.startsWith("http") ? (i(), T(r, {
              key: 1,
              class: "fr-footer__top-link",
              to: l.to
            }, {
              default: j(() => [
                S(m(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : b("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Ro = { class: "fr-connect-group" }, Oo = /* @__PURE__ */ c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1), qo = { class: "fr-connect__brand" }, zo = ["href", "title"], Qo = /* @__PURE__ */ D({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", Ro, [
      c("button", {
        class: A(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        Oo,
        c("span", qo, "FranceConnect" + m(e.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, m(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, zo)
      ])
    ]));
  }
}), Ho = ["for"], Go = {
  key: 0,
  class: "required"
}, Ko = {
  key: 0,
  class: "fr-hint-text"
}, Xo = /* @__PURE__ */ D({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => K("basic", "input") },
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
    const a = t, r = Za(), l = N(null), n = () => {
      var d;
      return (d = l.value) == null ? void 0 : d.focus();
    }, o = h(() => a.isTextarea ? "textarea" : "input"), s = h(() => a.isWithWrapper || r.type === "date" || !!a.wrapperClass), u = h(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: n
    }), (d, p) => (i(), f(P, null, [
      c("label", {
        class: A(u.value),
        for: d.id
      }, [
        C(d.$slots, "label", {}, () => [
          S(m(d.label) + " ", 1),
          C(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", Go, "*")) : b("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", Ko, m(d.hint), 1)) : b("", !0)
      ], 10, Ho),
      s.value ? (i(), f("div", {
        key: 1,
        class: A([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), T(te(o.value), V({ id: d.id }, d.$attrs, {
          ref_key: "__input",
          ref: l,
          class: ["fr-input", {
            "fr-input--error": d.isInvalid,
            "fr-input--valid": d.isValid
          }],
          value: d.modelValue,
          "aria-describedby": d.descriptionId || void 0,
          onInput: p[1] || (p[1] = (v) => d.$emit("update:modelValue", v.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (i(), T(te(o.value), V({
        key: 0,
        id: d.id
      }, d.$attrs, {
        ref_key: "__input",
        ref: l,
        class: ["fr-input", {
          "fr-input--error": d.isInvalid,
          "fr-input--valid": d.isValid
        }],
        value: d.modelValue,
        "aria-describedby": d.descriptionId || void 0,
        onInput: p[0] || (p[0] = (v) => d.$emit("update:modelValue", v.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), vt = /* @__PURE__ */ le(Xo, [["__scopeId", "data-v-771f90df"]]), et = /* @__PURE__ */ D({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => K("search", "input") },
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
      G(vt, {
        id: r.id,
        type: "search",
        placeholder: r.placeholder,
        "model-value": r.modelValue,
        "label-visible": r.labelVisible,
        label: r.label,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        "onUpdate:modelValue": l[0] || (l[0] = (n) => a("update:modelValue", n)),
        onKeydown: l[1] || (l[1] = Wa((n) => a("search", r.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      G(xe, {
        title: "Rechercher",
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        onClick: l[2] || (l[2] = (n) => a("search", r.modelValue))
      }, {
        default: j(() => [
          S(m(r.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Vt = 1, ka = /* @__PURE__ */ D({
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
    href: { default: void 0 }
  },
  setup(t) {
    const e = t, a = h(() => typeof e.path == "string"), r = h(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("http")) || a.value && e.path.startsWith("http");
    }), l = h(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("mailto")) || a.value && e.path.startsWith("mailto");
    }), n = h(() => e.button ? "button" : r.value || l.value ? "a" : "RouterLink"), o = h(() => {
      if (!(!r.value && !l.value))
        return e.href !== void 0 ? e.href : e.path;
    }), s = h(() => {
      if (!(r.value || l.value))
        return e.to || e.path;
    }), u = h(() => s.value ? { to: s.value } : { href: o.value }), d = h(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = h(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Vt, ...e.iconAttrs ?? {} } : { scale: Vt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (v, y) => (i(), T(te(n.value), V({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && v.iconRight,
        "fr-btn--icon-left": d.value && !v.iconRight,
        [String(v.icon)]: d.value
      }]
    }, u.value, {
      target: v.target,
      onClick: J(v.onClick, ["stop"])
    }), {
      default: j(() => {
        var x, k;
        return [
          !d.value && (v.icon || (x = v.iconAttrs) != null && x.name) && !v.iconRight ? (i(), T(ae, V({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          S(" " + m(v.label) + " ", 1),
          !d.value && (v.icon || (k = v.iconAttrs) != null && k.name) && v.iconRight ? (i(), T(ae, V({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Wo = ["aria-label"], Uo = { class: "fr-btns-group" }, tt = /* @__PURE__ */ D({
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
      c("ul", Uo, [
        (i(!0), f(P, null, O(r.links, (n, o) => (i(), f("li", { key: o }, [
          G(ka, V({ ref_for: !0 }, n, {
            "on-click": (s) => {
              var u;
              a("linkClick", s), (u = n.onClick) == null || u.call(n, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Wo));
  }
}), Yo = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Zo = { class: "fr-nav__item" }, Jo = ["aria-controls", "aria-expanded"], $o = { class: "fr-hidden-lg" }, ei = ["id"], ti = { class: "fr-menu__list" }, ai = ["hreflang", "lang", "aria-current", "href", "onClick"], at = /* @__PURE__ */ D({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => K("translate") },
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
      onTransitionEnd: u
    } = ce(), d = N(!1);
    function p(y) {
      d.value = !1, r("select", y);
    }
    const v = h(
      () => a.languages.find(({ codeIso: y }) => y === a.currentLanguage)
    );
    return ee(d, (y, x) => {
      y !== x && s(y);
    }), (y, x) => {
      var k, L;
      return i(), f("nav", Yo, [
        c("div", Zo, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": y.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: x[0] || (x[0] = J((g) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            S(m((k = v.value) == null ? void 0 : k.codeIso.toUpperCase()), 1),
            c("span", $o, " - " + m((L = v.value) == null ? void 0 : L.label), 1)
          ], 8, Jo),
          c("div", {
            id: y.id,
            ref_key: "collapse",
            ref: l,
            class: A(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": Q(o), "fr-collapsing": Q(n) }]),
            onTransitionend: x[1] || (x[1] = (g) => Q(u)(d.value))
          }, [
            c("ul", ti, [
              (i(!0), f(P, null, O(y.languages, (g, I) => (i(), f("li", { key: I }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: g.codeIso,
                  lang: g.codeIso,
                  "aria-current": y.currentLanguage === g.codeIso ? !0 : void 0,
                  href: `#${g.codeIso}`,
                  onClick: J((F) => p(g), ["prevent", "stop"])
                }, m(`${g.codeIso.toUpperCase()} - ${g.label}`), 9, ai)
              ]))), 128))
            ])
          ], 42, ei)
        ])
      ]);
    };
  }
}), li = {
  role: "banner",
  class: "fr-header"
}, ri = { class: "fr-header__body" }, ni = { class: "fr-container width-inherit" }, oi = { class: "fr-header__body-row" }, ii = { class: "fr-header__brand fr-enlarge-link" }, si = { class: "fr-header__brand-top" }, di = { class: "fr-header__logo" }, ui = {
  key: 0,
  class: "fr-header__operator"
}, ci = ["src", "alt"], fi = {
  key: 1,
  class: "fr-header__navbar"
}, pi = ["aria-label", "title", "data-fr-opened"], vi = ["aria-label", "title"], mi = {
  key: 0,
  class: "fr-header__service"
}, gi = { class: "fr-header__service-title" }, bi = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, hi = {
  key: 0,
  class: "fr-header__service-tagline"
}, yi = {
  key: 1,
  class: "fr-header__service"
}, ki = /* @__PURE__ */ c("p", { class: "fr-header__service-title" }, [
  /* @__PURE__ */ c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
], -1), _i = [
  ki
], wi = { class: "fr-header__tools" }, xi = {
  key: 0,
  class: "fr-header__tools-links"
}, Di = {
  key: 1,
  class: "fr-header__search fr-modal"
}, Ii = ["aria-label"], Ci = { class: "fr-container" }, Ti = { class: "fr-header__menu-links" }, Ei = { role: "navigation" }, Bi = {
  key: 1,
  class: "flex justify-center items-center"
}, Si = {
  key: 1,
  class: "fr-hidden fr-unhidden-lg"
}, Ai = /* @__PURE__ */ D({
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
    const a = t, r = e, l = Pe(a, "languageSelector"), n = N(!1), o = N(!1), s = N(!1), u = () => {
      var g;
      s.value = !1, n.value = !1, o.value = !1, (g = document.getElementById("button-menu")) == null || g.focus();
    }, d = (g) => {
      g.key === "Escape" && u();
    };
    ne(() => {
      document.addEventListener("keydown", d);
    }), ue(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var g;
      s.value = !0, n.value = !0, o.value = !1, (g = document.getElementById("close-button")) == null || g.focus();
    }, v = () => {
      s.value = !0, n.value = !1, o.value = !0;
    }, y = u, x = Wt(), k = h(() => {
      var g;
      return !!((g = x.operator) != null && g.call(x).length) || !!a.operatorImgSrc;
    }), L = h(() => !!x.mainnav);
    return (g, I) => {
      var F, R, B;
      const q = oe("RouterLink");
      return i(), f("header", li, [
        c("div", ri, [
          c("div", ni, [
            c("div", oi, [
              c("div", ii, [
                c("div", si, [
                  c("div", di, [
                    G(Se, {
                      "logo-text": g.logoText,
                      "data-testid": "header-logo"
                    }, null, 8, ["logo-text"])
                  ]),
                  k.value ? (i(), f("div", ui, [
                    C(g.$slots, "operator", {}, () => [
                      g.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: g.operatorImgSrc,
                        alt: g.operatorImgAlt,
                        style: se(g.operatorImgStyle)
                      }, null, 12, ci)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  g.showSearch || L.value || (F = g.quickLinks) != null && F.length ? (i(), f("div", fi, [
                    g.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": g.showSearchLabel,
                      title: g.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: I[0] || (I[0] = J((E) => v(), ["prevent", "stop"]))
                    }, null, 8, pi)) : b("", !0),
                    L.value || (R = g.quickLinks) != null && R.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": g.menuLabel,
                      title: g.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: I[1] || (I[1] = J((E) => p(), ["prevent", "stop"]))
                    }, null, 8, vi)) : b("", !0)
                  ])) : b("", !0)
                ]),
                g.serviceTitle ? (i(), f("div", mi, [
                  G(q, V({
                    to: g.homeTo,
                    title: `${g.homeLabel} - ${g.serviceTitle}`
                  }, g.$attrs), {
                    default: j(() => [
                      c("p", gi, [
                        S(m(g.serviceTitle) + " ", 1),
                        g.showBeta ? (i(), f("span", bi, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  g.serviceDescription ? (i(), f("p", hi, m(g.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !g.serviceTitle && g.showBeta ? (i(), f("div", yi, _i)) : b("", !0)
              ]),
              c("div", wi, [
                (B = g.quickLinks) != null && B.length || l.value ? (i(), f("div", xi, [
                  n.value ? b("", !0) : (i(), T(tt, {
                    key: 0,
                    links: g.quickLinks,
                    "nav-aria-label": g.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (i(), T(at, V({ key: 1 }, l.value, {
                    onSelect: I[2] || (I[2] = (E) => r("language-select", E))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                g.showSearch ? (i(), f("div", Di, [
                  G(et, {
                    "searchbar-id": g.searchbarId,
                    label: g.searchLabel,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": I[3] || (I[3] = (E) => r("update:modelValue", E)),
                    onSearch: I[4] || (I[4] = (E) => r("search", E))
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
              c("div", Ci, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: I[5] || (I[5] = J((E) => u(), ["prevent", "stop"]))
                }, m(g.closeMenuModalLabel), 1),
                c("div", Ti, [
                  l.value ? (i(), T(at, V({ key: 0 }, l.value, {
                    onSelect: I[6] || (I[6] = (E) => l.value.currentLanguage = E.codeIso)
                  }), null, 16)) : b("", !0),
                  c("nav", Ei, [
                    n.value ? (i(), T(tt, {
                      key: 0,
                      role: "navigation",
                      links: g.quickLinks,
                      "nav-aria-label": g.quickLinksAriaLabel,
                      onLinkClick: Q(y)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0)
                  ])
                ]),
                s.value ? C(g.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : b("", !0),
                o.value ? (i(), f("div", Bi, [
                  G(et, {
                    "searchbar-id": g.searchbarId,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    "onUpdate:modelValue": I[7] || (I[7] = (E) => r("update:modelValue", E)),
                    onSearch: I[8] || (I[8] = (E) => r("search", E))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, Ii)) : b("", !0),
            L.value && !s.value ? (i(), f("div", Si, [
              C(g.$slots, "mainnav", { hidemodal: u })
            ])) : b("", !0),
            C(g.$slots, "default")
          ])
        ])
      ]);
    };
  }
}), Li = { class: "fr-highlight" }, Mi = /* @__PURE__ */ D({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Li, [
      c("p", {
        class: A({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        S(m(e.text) + " ", 1),
        C(e.$slots, "default")
      ], 2)
    ]));
  }
}), Fi = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, Pi = ["id", "data-testid"], Vi = ["id", "data-testid"], Ni = ["id", "data-testid"], ji = ["id", "data-testid"], Ri = /* @__PURE__ */ D({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => K("basic", "input") },
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
      C(e.$slots, "before-input"),
      C(e.$slots, "default"),
      e.$slots.default ? b("", !0) : (i(), T(vt, V({ key: 0 }, e.$attrs, {
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
      c("div", Fi, [
        Array.isArray(e.errorMessage) ? (i(!0), f(P, { key: 0 }, O(e.errorMessage, (r) => (i(), f("p", {
          id: e.descriptionId,
          key: r,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, m(r), 9, Pi))), 128)) : e.errorMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, m(e.errorMessage), 9, Vi)) : b("", !0),
        Array.isArray(e.validMessage) ? (i(!0), f(P, { key: 2 }, O(e.validMessage, (r) => (i(), f("p", {
          id: e.descriptionId,
          key: r,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, m(r), 9, Ni))), 128)) : e.validMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, m(e.validMessage), 9, ji)) : b("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var _a = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Ae = /* @__PURE__ */ _a.join(","), wa = typeof Element > "u", ve = wa ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Le = !wa && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, Me = function t(e, a) {
  var r;
  a === void 0 && (a = !0);
  var l = e == null || (r = e.getAttribute) === null || r === void 0 ? void 0 : r.call(e, "inert"), n = l === "" || l === "true", o = n || a && e && t(e.parentNode);
  return o;
}, Oi = function(t) {
  var e, a = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return a === "" || a === "true";
}, xa = function(t, e, a) {
  if (Me(t))
    return [];
  var r = Array.prototype.slice.apply(t.querySelectorAll(Ae));
  return e && ve.call(t, Ae) && r.unshift(t), r = r.filter(a), r;
}, Da = function t(e, a, r) {
  for (var l = [], n = Array.from(e); n.length; ) {
    var o = n.shift();
    if (!Me(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), u = s.length ? s : o.children, d = t(u, !0, r);
        r.flatten ? l.push.apply(l, d) : l.push({
          scopeParent: o,
          candidates: d
        });
      } else {
        var p = ve.call(o, Ae);
        p && r.filter(o) && (a || !e.includes(o)) && l.push(o);
        var v = o.shadowRoot || // check for an undisclosed shadow
        typeof r.getShadowRoot == "function" && r.getShadowRoot(o), y = !Me(v, !1) && (!r.shadowRootFilter || r.shadowRootFilter(o));
        if (v && y) {
          var x = t(v === !0 ? o.children : v.children, !0, r);
          r.flatten ? l.push.apply(l, x) : l.push({
            scopeParent: o,
            candidates: x
          });
        } else
          n.unshift.apply(n, o.children);
      }
  }
  return l;
}, Ia = function(t) {
  return !isNaN(parseInt(t.getAttribute("tabindex"), 10));
}, fe = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || Oi(t)) && !Ia(t) ? 0 : t.tabIndex;
}, qi = function(t, e) {
  var a = fe(t);
  return a < 0 && e && !Ia(t) ? 0 : a;
}, zi = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, Ca = function(t) {
  return t.tagName === "INPUT";
}, Qi = function(t) {
  return Ca(t) && t.type === "hidden";
}, Hi = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return e;
}, Gi = function(t, e) {
  for (var a = 0; a < t.length; a++)
    if (t[a].checked && t[a].form === e)
      return t[a];
}, Ki = function(t) {
  if (!t.name)
    return !0;
  var e = t.form || Le(t), a = function(n) {
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
  var l = Gi(r, t.form);
  return !l || l === t;
}, Xi = function(t) {
  return Ca(t) && t.type === "radio";
}, Wi = function(t) {
  return Xi(t) && !Ki(t);
}, Ui = function(t) {
  var e, a = t && Le(t), r = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var n, o, s;
    for (l = !!((n = r) !== null && n !== void 0 && (o = n.ownerDocument) !== null && o !== void 0 && o.contains(r) || t != null && (s = t.ownerDocument) !== null && s !== void 0 && s.contains(t)); !l && r; ) {
      var u, d, p;
      a = Le(r), r = (u = a) === null || u === void 0 ? void 0 : u.host, l = !!((d = r) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(r));
    }
  }
  return l;
}, Nt = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, r = e.height;
  return a === 0 && r === 0;
}, Yi = function(t, e) {
  var a = e.displayCheck, r = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = ve.call(t, "details>summary:first-of-type"), n = l ? t.parentElement : t;
  if (ve.call(n, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof r == "function") {
      for (var o = t; t; ) {
        var s = t.parentElement, u = Le(t);
        if (s && !s.shadowRoot && r(s) === !0)
          return Nt(t);
        t.assignedSlot ? t = t.assignedSlot : !s && u !== t.ownerDocument ? t = u.host : t = s;
      }
      t = o;
    }
    if (Ui(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Nt(t);
  return !1;
}, Zi = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var a = 0; a < e.children.length; a++) {
          var r = e.children.item(a);
          if (r.tagName === "LEGEND")
            return ve.call(e, "fieldset[disabled] *") ? !0 : !r.contains(t);
        }
        return !0;
      }
      e = e.parentElement;
    }
  return !1;
}, Fe = function(t, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Me(e) || Qi(e) || Yi(e, t) || // For a details element with a summary, the summary element gets the focus
  Hi(e) || Zi(e));
}, lt = function(t, e) {
  return !(Wi(e) || fe(e) < 0 || !Fe(t, e));
}, Ji = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, $i = function t(e) {
  var a = [], r = [];
  return e.forEach(function(l, n) {
    var o = !!l.scopeParent, s = o ? l.scopeParent : l, u = qi(s, o), d = o ? t(l.candidates) : s;
    u === 0 ? o ? a.push.apply(a, d) : a.push(s) : r.push({
      documentOrder: n,
      tabIndex: u,
      item: l,
      isScope: o,
      content: d
    });
  }), r.sort(zi).reduce(function(l, n) {
    return n.isScope ? l.push.apply(l, n.content) : l.push(n.content), l;
  }, []).concat(a);
}, es = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Da([t], e.includeContainer, {
    filter: lt.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: Ji
  }) : a = xa(t, e.includeContainer, lt.bind(null, e)), $i(a);
}, ts = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Da([t], e.includeContainer, {
    filter: Fe.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = xa(t, e.includeContainer, Fe.bind(null, e)), a;
}, ge = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return ve.call(t, Ae) === !1 ? !1 : lt(e, t);
}, as = /* @__PURE__ */ _a.concat("iframe").join(","), Ge = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return ve.call(t, as) === !1 ? !1 : Fe(e, t);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function jt(t, e) {
  var a = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(l) {
      return Object.getOwnPropertyDescriptor(t, l).enumerable;
    })), a.push.apply(a, r);
  }
  return a;
}
function Rt(t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e] != null ? arguments[e] : {};
    e % 2 ? jt(Object(a), !0).forEach(function(r) {
      ls(t, r, a[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : jt(Object(a)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(a, r));
    });
  }
  return t;
}
function ls(t, e, a) {
  return e = ns(e), e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function rs(t, e) {
  if (typeof t != "object" || t === null) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var r = a.call(t, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function ns(t) {
  var e = rs(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
var Ot = {
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
}, os = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, is = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, ke = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, ss = function(t) {
  return ke(t) && !t.shiftKey;
}, ds = function(t) {
  return ke(t) && t.shiftKey;
}, qt = function(t) {
  return setTimeout(t, 0);
}, zt = function(t, e) {
  var a = -1;
  return t.every(function(r, l) {
    return e(r) ? (a = l, !1) : !0;
  }), a;
}, he = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    a[r - 1] = arguments[r];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, Ce = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, us = [], cs = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, r = (e == null ? void 0 : e.trapStack) || us, l = Rt({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: ss,
    isKeyBackward: ds
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
  }, o, s = function(_, w, M) {
    return _ && _[w] !== void 0 ? _[w] : l[M || w];
  }, u = function(_, w) {
    var M = typeof (w == null ? void 0 : w.composedPath) == "function" ? w.composedPath() : void 0;
    return n.containerGroups.findIndex(function(X) {
      var H = X.container, W = X.tabbableNodes;
      return H.contains(_) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (M == null ? void 0 : M.includes(H)) || W.find(function(Z) {
        return Z === _;
      });
    });
  }, d = function(_) {
    var w = l[_];
    if (typeof w == "function") {
      for (var M = arguments.length, X = new Array(M > 1 ? M - 1 : 0), H = 1; H < M; H++)
        X[H - 1] = arguments[H];
      w = w.apply(void 0, X);
    }
    if (w === !0 && (w = void 0), !w) {
      if (w === void 0 || w === !1)
        return w;
      throw new Error("`".concat(_, "` was specified but was not a node, or did not return a node"));
    }
    var W = w;
    if (typeof w == "string" && (W = a.querySelector(w), !W))
      throw new Error("`".concat(_, "` as selector refers to no known node"));
    return W;
  }, p = function() {
    var _ = d("initialFocus");
    if (_ === !1)
      return !1;
    if (_ === void 0 || !Ge(_, l.tabbableOptions))
      if (u(a.activeElement) >= 0)
        _ = a.activeElement;
      else {
        var w = n.tabbableGroups[0], M = w && w.firstTabbableNode;
        _ = M || d("fallbackFocus");
      }
    if (!_)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return _;
  }, v = function() {
    if (n.containerGroups = n.containers.map(function(_) {
      var w = es(_, l.tabbableOptions), M = ts(_, l.tabbableOptions), X = w.length > 0 ? w[0] : void 0, H = w.length > 0 ? w[w.length - 1] : void 0, W = M.find(function($) {
        return ge($);
      }), Z = M.slice().reverse().find(function($) {
        return ge($);
      }), re = !!w.find(function($) {
        return fe($) > 0;
      });
      return {
        container: _,
        tabbableNodes: w,
        focusableNodes: M,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: re,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: X,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: H,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: W,
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
        nextTabbableNode: function($) {
          var me = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, be = w.indexOf($);
          return be < 0 ? me ? M.slice(M.indexOf($) + 1).find(function(de) {
            return ge(de);
          }) : M.slice(0, M.indexOf($)).reverse().find(function(de) {
            return ge(de);
          }) : w[be + (me ? 1 : -1)];
        }
      };
    }), n.tabbableGroups = n.containerGroups.filter(function(_) {
      return _.tabbableNodes.length > 0;
    }), n.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (n.containerGroups.find(function(_) {
      return _.posTabIndexesFound;
    }) && n.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, y = function _(w) {
    var M = w.activeElement;
    if (M)
      return M.shadowRoot && M.shadowRoot.activeElement !== null ? _(M.shadowRoot) : M;
  }, x = function _(w) {
    if (w !== !1 && w !== y(document)) {
      if (!w || !w.focus) {
        _(p());
        return;
      }
      w.focus({
        preventScroll: !!l.preventScroll
      }), n.mostRecentlyFocusedNode = w, os(w) && w.select();
    }
  }, k = function(_) {
    var w = d("setReturnFocus", _);
    return w || (w === !1 ? !1 : _);
  }, L = function(_) {
    var w = _.target, M = _.event, X = _.isBackward, H = X === void 0 ? !1 : X;
    w = w || Ce(M), v();
    var W = null;
    if (n.tabbableGroups.length > 0) {
      var Z = u(w, M), re = Z >= 0 ? n.containerGroups[Z] : void 0;
      if (Z < 0)
        H ? W = n.tabbableGroups[n.tabbableGroups.length - 1].lastTabbableNode : W = n.tabbableGroups[0].firstTabbableNode;
      else if (H) {
        var $ = zt(n.tabbableGroups, function(qe) {
          var ze = qe.firstTabbableNode;
          return w === ze;
        });
        if ($ < 0 && (re.container === w || Ge(w, l.tabbableOptions) && !ge(w, l.tabbableOptions) && !re.nextTabbableNode(w, !1)) && ($ = Z), $ >= 0) {
          var me = $ === 0 ? n.tabbableGroups.length - 1 : $ - 1, be = n.tabbableGroups[me];
          W = fe(w) >= 0 ? be.lastTabbableNode : be.lastDomTabbableNode;
        } else ke(M) || (W = re.nextTabbableNode(w, !1));
      } else {
        var de = zt(n.tabbableGroups, function(qe) {
          var ze = qe.lastTabbableNode;
          return w === ze;
        });
        if (de < 0 && (re.container === w || Ge(w, l.tabbableOptions) && !ge(w, l.tabbableOptions) && !re.nextTabbableNode(w)) && (de = Z), de >= 0) {
          var Ga = de === n.tabbableGroups.length - 1 ? 0 : de + 1, bt = n.tabbableGroups[Ga];
          W = fe(w) >= 0 ? bt.firstTabbableNode : bt.firstDomTabbableNode;
        } else ke(M) || (W = re.nextTabbableNode(w));
      }
    } else
      W = d("fallbackFocus");
    return W;
  }, g = function(_) {
    var w = Ce(_);
    if (!(u(w, _) >= 0)) {
      if (he(l.clickOutsideDeactivates, _)) {
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
      he(l.allowOutsideClick, _) || _.preventDefault();
    }
  }, I = function(_) {
    var w = Ce(_), M = u(w, _) >= 0;
    if (M || w instanceof Document)
      M && (n.mostRecentlyFocusedNode = w);
    else {
      _.stopImmediatePropagation();
      var X, H = !0;
      if (n.mostRecentlyFocusedNode)
        if (fe(n.mostRecentlyFocusedNode) > 0) {
          var W = u(n.mostRecentlyFocusedNode), Z = n.containerGroups[W].tabbableNodes;
          if (Z.length > 0) {
            var re = Z.findIndex(function($) {
              return $ === n.mostRecentlyFocusedNode;
            });
            re >= 0 && (l.isKeyForward(n.recentNavEvent) ? re + 1 < Z.length && (X = Z[re + 1], H = !1) : re - 1 >= 0 && (X = Z[re - 1], H = !1));
          }
        } else
          n.containerGroups.some(function($) {
            return $.tabbableNodes.some(function(me) {
              return fe(me) > 0;
            });
          }) || (H = !1);
      else
        H = !1;
      H && (X = L({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: n.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(n.recentNavEvent)
      })), x(X || n.mostRecentlyFocusedNode || p());
    }
    n.recentNavEvent = void 0;
  }, F = function(_) {
    var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    n.recentNavEvent = _;
    var M = L({
      event: _,
      isBackward: w
    });
    M && (ke(_) && _.preventDefault(), x(M));
  }, R = function(_) {
    if (is(_) && he(l.escapeDeactivates, _) !== !1) {
      _.preventDefault(), o.deactivate();
      return;
    }
    (l.isKeyForward(_) || l.isKeyBackward(_)) && F(_, l.isKeyBackward(_));
  }, B = function(_) {
    var w = Ce(_);
    u(w, _) >= 0 || he(l.clickOutsideDeactivates, _) || he(l.allowOutsideClick, _) || (_.preventDefault(), _.stopImmediatePropagation());
  }, q = function() {
    if (n.active)
      return Ot.activateTrap(r, o), n.delayInitialFocusTimer = l.delayInitialFocus ? qt(function() {
        x(p());
      }) : x(p()), a.addEventListener("focusin", I, !0), a.addEventListener("mousedown", g, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", g, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", B, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", R, {
        capture: !0,
        passive: !1
      }), o;
  }, E = function() {
    if (n.active)
      return a.removeEventListener("focusin", I, !0), a.removeEventListener("mousedown", g, !0), a.removeEventListener("touchstart", g, !0), a.removeEventListener("click", B, !0), a.removeEventListener("keydown", R, !0), o;
  }, z = function(_) {
    var w = _.some(function(M) {
      var X = Array.from(M.removedNodes);
      return X.some(function(H) {
        return H === n.mostRecentlyFocusedNode;
      });
    });
    w && x(p());
  }, U = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(z) : void 0, Y = function() {
    U && (U.disconnect(), n.active && !n.paused && n.containers.map(function(_) {
      U.observe(_, {
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
      var w = s(_, "onActivate"), M = s(_, "onPostActivate"), X = s(_, "checkCanFocusTrap");
      X || v(), n.active = !0, n.paused = !1, n.nodeFocusedBeforeActivation = a.activeElement, w == null || w();
      var H = function() {
        X && v(), q(), Y(), M == null || M();
      };
      return X ? (X(n.containers.concat()).then(H, H), this) : (H(), this);
    },
    deactivate: function(_) {
      if (!n.active)
        return this;
      var w = Rt({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, _);
      clearTimeout(n.delayInitialFocusTimer), n.delayInitialFocusTimer = void 0, E(), n.active = !1, n.paused = !1, Y(), Ot.deactivateTrap(r, o);
      var M = s(w, "onDeactivate"), X = s(w, "onPostDeactivate"), H = s(w, "checkCanReturnFocus"), W = s(w, "returnFocus", "returnFocusOnDeactivate");
      M == null || M();
      var Z = function() {
        qt(function() {
          W && x(k(n.nodeFocusedBeforeActivation)), X == null || X();
        });
      };
      return W && H ? (H(k(n.nodeFocusedBeforeActivation)).then(Z, Z), this) : (Z(), this);
    },
    pause: function(_) {
      if (n.paused || !n.active)
        return this;
      var w = s(_, "onPause"), M = s(_, "onPostPause");
      return n.paused = !0, w == null || w(), E(), Y(), M == null || M(), this;
    },
    unpause: function(_) {
      if (!n.paused || !n.active)
        return this;
      var w = s(_, "onUnpause"), M = s(_, "onPostUnpause");
      return n.paused = !1, w == null || w(), v(), q(), Y(), M == null || M(), this;
    },
    updateContainerElements: function(_) {
      var w = [].concat(_).filter(Boolean);
      return n.containers = w.map(function(M) {
        return typeof M == "string" ? a.querySelector(M) : M;
      }), n.active && v(), Y(), this;
    }
  }, o.updateContainerElements(t), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const fs = {
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
}, ps = D({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, fs),
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
    const l = N(null), n = h(() => {
      const s = l.value;
      return s && (s instanceof HTMLElement ? s : s.$el);
    });
    function o() {
      return r || (r = cs(n.value, {
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
        const s = e.default().filter((u) => u.type !== Ka);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : Xa(s[0], { ref: l });
      }
    };
  }
}), vs = ["aria-labelledby", "role", "open"], ms = { class: "fr-container fr-container--fluid fr-container-md" }, gs = { class: "fr-grid-row fr-grid-row--center" }, bs = { class: "fr-modal__body" }, hs = { class: "fr-modal__header" }, ys = ["title"], ks = { class: "fr-modal__content" }, _s = ["id"], ws = {
  key: 0,
  class: "fr-modal__footer"
}, Qt = 2, xs = /* @__PURE__ */ D({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => K("modal", "dialog") },
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
    const a = t, r = e, l = (k) => {
      k.key === "Escape" && v();
    }, n = h(() => a.isAlert ? "alertdialog" : "dialog"), o = N(null), s = N();
    ee(() => a.opened, (k) => {
      var L, g;
      k ? ((L = s.value) == null || L.showModal(), setTimeout(() => {
        var I;
        (I = o.value) == null || I.focus();
      }, 100)) : (g = s.value) == null || g.close(), u(k);
    });
    function u(k) {
      typeof window < "u" && document.body.classList.toggle("modal-open", k);
    }
    ne(() => {
      d(), u(a.opened);
    }), Ja(() => {
      p(), u(!1);
    });
    function d() {
      document.addEventListener("keydown", l);
    }
    function p() {
      document.removeEventListener("keydown", l);
    }
    async function v() {
      var k;
      await Yt(), (k = a.origin) == null || k.focus(), r("close");
    }
    const y = h(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), x = h(
      () => y.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: Qt } : { scale: Qt, ...a.icon ?? {} }
    );
    return (k, L) => k.opened ? (i(), T(Q(ps), { key: 0 }, {
      default: j(() => {
        var g, I;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-labelledby": k.modalId,
            role: n.value,
            class: A(["fr-modal", { "fr-modal--opened": k.opened }]),
            open: k.opened
          }, [
            c("div", ms, [
              c("div", gs, [
                c("div", {
                  class: A(["fr-col-12", {
                    "fr-col-md-8": k.size === "lg",
                    "fr-col-md-6": k.size === "md",
                    "fr-col-md-4": k.size === "sm"
                  }])
                }, [
                  c("div", bs, [
                    c("div", hs, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: k.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: L[0] || (L[0] = (F) => v())
                      }, [
                        c("span", null, m(k.closeButtonLabel), 1)
                      ], 8, ys)
                    ]),
                    c("div", ks, [
                      c("h1", {
                        id: k.modalId,
                        class: "fr-modal__title"
                      }, [
                        y.value || x.value ? (i(), f("span", {
                          key: 0,
                          class: A({
                            [String(k.icon)]: y.value
                          })
                        }, [
                          k.icon && x.value ? (i(), T(ae, ie(V({ key: 0 }, x.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        S(" " + m(k.title), 1)
                      ], 8, _s),
                      C(k.$slots, "default", {}, void 0, !0)
                    ]),
                    (g = k.actions) != null && g.length || k.$slots.footer ? (i(), f("div", ws, [
                      C(k.$slots, "footer", {}, void 0, !0),
                      (I = k.actions) != null && I.length ? (i(), T(Re, {
                        key: 0,
                        align: "right",
                        buttons: k.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : b("", !0)
                    ])) : b("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, vs)
        ];
      }),
      _: 3
    })) : b("", !0);
  }
}), Ds = /* @__PURE__ */ le(xs, [["__scopeId", "data-v-d221644d"]]), Is = ["id", "aria-current"], Cs = /* @__PURE__ */ D({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => K("nav", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-nav__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      C(e.$slots, "default", {}, void 0, !0)
    ], 8, Is));
  }
}), Ta = /* @__PURE__ */ le(Cs, [["__scopeId", "data-v-5909c19f"]]), Ts = ["href"], Ht = 2, Oe = /* @__PURE__ */ D({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => K("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, a = h(() => typeof e.to == "string" && e.to.startsWith("http")), r = h(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), l = h(
      () => r.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: Ht, name: e.icon } : { scale: Ht, ...e.icon || {} }
    );
    return (n, o) => {
      const s = oe("RouterLink");
      return a.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: n.to,
        onClick: o[0] || (o[0] = (u) => n.$emit("toggleId", n.id))
      }, m(n.text), 9, Ts)) : (i(), T(s, {
        key: 1,
        class: A(["fr-nav__link", {
          [String(n.icon)]: r.value
        }]),
        "data-testid": "nav-router-link",
        to: n.to,
        onClick: o[1] || (o[1] = (u) => n.$emit("toggleId", n.id))
      }, {
        default: j(() => [
          n.icon && l.value ? (i(), T(ae, ie(V({ key: 0 }, l.value)), null, 16)) : b("", !0),
          S(" " + m(n.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), Es = ["id", "aria-current"], Ea = /* @__PURE__ */ D({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => K("menu", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-menu__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      C(e.$slots, "default")
    ], 8, Es));
  }
}), Bs = ["aria-expanded", "aria-current", "aria-controls"], Ss = ["id"], As = { class: "fr-menu__list" }, Ba = /* @__PURE__ */ D({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => K("menu") },
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
    return ee(s, (u, d) => {
      u !== d && n(u);
    }), ne(() => {
      s.value && n(!0);
    }), (u, d) => (i(), f(P, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: d[0] || (d[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        c("span", null, m(u.title), 1)
      ], 8, Bs),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: a,
        class: A(["fr-collapse fr-menu", { "fr-collapse--expanded": Q(l), "fr-collapsing": Q(r) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => Q(o)(s.value))
      }, [
        c("ul", As, [
          C(u.$slots, "default"),
          (i(!0), f(P, null, O(u.links, (p, v) => (i(), T(Ea, { key: v }, {
            default: j(() => [
              G(Oe, V({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (y) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Ss)
    ], 64));
  }
}), Ls = { class: "fr-col-12 fr-col-lg-3" }, Ms = { class: "fr-mega-menu__category" }, Fs = { class: "fr-mega-menu__list" }, Sa = /* @__PURE__ */ D({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", Ls, [
      c("h5", Ms, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: a[0] || (a[0] = J(() => {
          }, ["prevent"]))
        }, m(e.title), 1)
      ]),
      c("ul", Fs, [
        (i(!0), f(P, null, O(e.links, (r, l) => (i(), f("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          G(Oe, V({ ref_for: !0 }, r), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Ps = ["aria-expanded", "aria-current", "aria-controls"], Vs = ["id"], Ns = { class: "fr-container fr-container--fluid fr-container-lg" }, js = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Rs = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, Os = { class: "fr-mega-menu__leader" }, qs = { class: "fr-h4 fr-mb-2v" }, zs = { class: "fr-hidden fr-displayed-lg" }, Qs = /* @__PURE__ */ D({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => K("menu") },
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
    return ee(s, (u, d) => {
      u !== d && n(u);
    }), ne(() => {
      s.value && n(!0);
    }), (u, d) => {
      const p = oe("RouterLink");
      return i(), f(P, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: d[0] || (d[0] = (v) => u.$emit("toggleId", u.id))
        }, m(u.title), 9, Ps),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: A(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": Q(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Q(r)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (v) => Q(o)(s.value))
        }, [
          c("div", Ns, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (v) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            c("div", js, [
              c("div", Rs, [
                c("div", Os, [
                  c("h4", qs, m(u.title), 1),
                  c("p", zs, [
                    S(m(u.description) + " ", 1),
                    C(u.$slots, "description", {}, void 0, !0)
                  ]),
                  G(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: j(() => [
                      S(m(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              C(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(P, null, O(u.menus, (v, y) => (i(), T(Sa, V({
                key: y,
                ref_for: !0
              }, v), null, 16))), 128))
            ])
          ])
        ], 42, Vs)
      ], 64);
    };
  }
}), Aa = /* @__PURE__ */ le(Qs, [["__scopeId", "data-v-020a2672"]]), Hs = ["id", "aria-label"], Gs = { class: "fr-nav__list" }, Ks = /* @__PURE__ */ D({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => K("menu") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(t) {
    const e = t, a = N(void 0), r = (s) => {
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
    }), (s, u) => (i(), f("nav", {
      id: s.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": s.label
    }, [
      c("ul", Gs, [
        C(s.$slots, "default"),
        (i(!0), f(P, null, O(s.navItems, (d, p) => (i(), T(Ta, { key: p }, {
          default: j(() => [
            d.to && d.text ? (i(), T(Oe, V({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": a.value,
              onToggleId: u[0] || (u[0] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), T(Ba, V({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": a.value,
              onToggleId: u[1] || (u[1] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), T(Aa, V({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": a.value,
              onToggleId: u[2] || (u[2] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, Hs));
  }
}), Xs = { class: "fr-container" }, Ws = { class: "fr-notice__body" }, Us = { class: "fr-notice__title" }, Ys = { class: "fr-notice__desc" }, Zs = /* @__PURE__ */ D({
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
      c("div", Xs, [
        c("div", Ws, [
          c("p", null, [
            c("span", Us, [
              C(e.$slots, "default", {}, () => [
                S(m(e.title), 1)
              ])
            ]),
            c("span", Ys, [
              C(e.$slots, "desc", {}, () => [
                S(m(e.desc), 1)
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
}), Js = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, $s = { class: "fr-pagination__list" }, ed = ["href", "title", "disabled", "aria-disabled"], td = ["href", "title", "disabled", "aria-disabled"], ad = ["href", "title", "aria-current", "onClick"], ld = { key: 0 }, rd = { key: 1 }, nd = ["href", "title", "disabled", "aria-disabled"], od = ["href", "title", "disabled", "aria-disabled"], id = /* @__PURE__ */ D({
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
    const a = t, r = e, l = h(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), n = h(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), o = h(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, n.value + 1) : a.pages), s = (k) => r("update:current-page", k), u = (k) => s(k), d = () => u(0), p = () => u(Math.max(0, a.currentPage - 1)), v = () => u(Math.min(a.pages.length - 1, a.currentPage + 1)), y = () => u(a.pages.length - 1), x = (k) => a.pages.indexOf(k) === a.currentPage;
    return (k, L) => {
      var g, I, F, R;
      return i(), f("nav", Js, [
        c("ul", $s, [
          c("li", null, [
            c("a", {
              href: (g = k.pages[0]) == null ? void 0 : g.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: k.firstPageTitle,
              disabled: k.currentPage === 0 ? !0 : void 0,
              "aria-disabled": k.currentPage === 0 ? !0 : void 0,
              onClick: L[0] || (L[0] = J((B) => d(), ["prevent"]))
            }, null, 8, ed)
          ]),
          c("li", null, [
            c("a", {
              href: (I = k.pages[Math.max(k.currentPage - 1, 0)]) == null ? void 0 : I.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: k.prevPageTitle,
              disabled: k.currentPage === 0 ? !0 : void 0,
              "aria-disabled": k.currentPage === 0 ? !0 : void 0,
              onClick: L[1] || (L[1] = J((B) => p(), ["prevent"]))
            }, m(k.prevPageTitle), 9, td)
          ]),
          (i(!0), f(P, null, O(o.value, (B, q) => (i(), f("li", { key: q }, [
            c("a", {
              href: B == null ? void 0 : B.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: B.title,
              "aria-current": x(B) ? "page" : void 0,
              onClick: J((E) => u(k.pages.indexOf(B)), ["prevent"])
            }, [
              o.value.indexOf(B) === 0 && l.value > 0 ? (i(), f("span", ld, "...")) : b("", !0),
              S(" " + m(B.label) + " ", 1),
              o.value.indexOf(B) === o.value.length - 1 && n.value < k.pages.length - 1 ? (i(), f("span", rd, "...")) : b("", !0)
            ], 8, ad)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (F = k.pages[Math.min(k.currentPage + 1, k.pages.length - 1)]) == null ? void 0 : F.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: k.nextPageTitle,
              disabled: k.currentPage === k.pages.length - 1 ? !0 : void 0,
              "aria-disabled": k.currentPage === k.pages.length - 1 ? !0 : void 0,
              onClick: L[2] || (L[2] = J((B) => v(), ["prevent"]))
            }, m(k.nextPageTitle), 9, nd)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (R = k.pages.at(-1)) == null ? void 0 : R.href,
              title: k.lastPageTitle,
              disabled: k.currentPage === k.pages.length - 1 ? !0 : void 0,
              "aria-disabled": k.currentPage === k.pages.length - 1 ? !0 : void 0,
              onClick: L[3] || (L[3] = J((B) => y(), ["prevent"]))
            }, null, 8, od)
          ])
        ])
      ]);
    };
  }
}), sd = /* @__PURE__ */ le(id, [["__scopeId", "data-v-4dfa8248"]]), dd = ["aria-label"], ud = { class: "fr-content-media__img" }, cd = ["src", "alt", "title", "ratio"], fd = { class: "fr-content-media__caption" }, pd = /* @__PURE__ */ D({
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
      c("div", ud, [
        C(e.$slots, "default", {}, () => [
          e.src ? (i(), f("img", {
            key: 0,
            src: e.src,
            class: A(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, cd)) : b("", !0)
        ])
      ]),
      c("figcaption", fd, m(e.legend), 1)
    ], 10, dd));
  }
}), vd = { class: "fr-quote fr-quote--column" }, md = ["cite"], gd = { class: "fr-quote__author" }, bd = { class: "fr-quote__source" }, hd = ["href"], yd = {
  key: 0,
  class: "fr-quote__image"
}, kd = ["src"], _d = /* @__PURE__ */ D({
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
    return (e, a) => (i(), f("figure", vd, [
      e.source ? (i(), f("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        c("p", null, "« " + m(e.quote) + " »", 1)
      ], 8, md)) : b("", !0),
      c("figcaption", null, [
        c("p", gd, m(e.author), 1),
        c("ul", bd, [
          c("li", null, [
            c("cite", null, m(e.source), 1)
          ]),
          (i(!0), f(P, null, O(e.details, (r, l) => (i(), f("li", { key: l }, [
            typeof r == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.url
            }, m(r.label), 9, hd)) : (i(), f(P, { key: 1 }, [
              S(m(r), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (i(), f("div", yd, [
          c("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, kd)
        ])) : b("", !0)
      ])
    ]));
  }
}), wd = ["id", "name", "value", "checked", "disabled"], xd = ["for"], Dd = {
  key: 0,
  class: "required"
}, Id = {
  key: 0,
  class: "fr-hint-text"
}, Cd = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Td = ["src", "title"], Ed = { key: 0 }, Bd = ["href"], Sd = ["href"], Ad = ["href"], La = /* @__PURE__ */ D({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => K("basic", "radio") },
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
        c("input", V({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: n[0] || (n[0] = (o) => l.$emit("update:modelValue", l.value))
        }), null, 16, wd),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          C(l.$slots, "label", {}, () => [
            S(m(l.label) + " ", 1),
            C(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (i(), f("span", Dd, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", Id, m(l.hint), 1)) : b("", !0)
        ], 8, xd),
        l.img || l.svgPath ? (i(), f("div", Cd, [
          l.img ? (i(), f("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: "",
            title: l.imgTitle
          }, null, 8, Td)) : (i(), f("svg", V({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            l.imgTitle ? (i(), f("title", Ed, m(l.imgTitle), 1)) : b("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${l.svgPath}#artwork-decorative`
            }, null, 8, Bd),
            c("use", {
              class: "fr-artwork-minor",
              href: `${l.svgPath}#artwork-minor`
            }, null, 8, Sd),
            c("use", {
              class: "fr-artwork-major",
              href: `${l.svgPath}#artwork-major`
            }, null, 8, Ad)
          ], 16))
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Ld = { class: "fr-form-group" }, Md = ["disabled", "aria-labelledby", "aria-invalid", "role"], Fd = ["id"], Pd = {
  key: 0,
  class: "fr-hint-text"
}, Vd = {
  key: 0,
  class: "required"
}, Nd = ["id"], jd = /* @__PURE__ */ D({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => K("radio-button", "group") },
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
    const a = t, r = e, l = h(() => a.errorMessage || a.validMessage), n = h(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (u) => {
      u !== a.modelValue && r("update:modelValue", u);
    }, s = h(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (u, d) => (i(), f("div", Ld, [
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
          C(u.$slots, "legend", {}, () => [
            S(m(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Pd, [
              C(u.$slots, "hint", {}, () => [
                S(m(u.hint), 1)
              ])
            ])) : b("", !0),
            C(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Vd, " *")) : b("", !0)
            ])
          ])
        ], 8, Fd)) : b("", !0),
        C(u.$slots, "default", {}, () => [
          (i(!0), f(P, null, O(u.options, (p, v) => (i(), T(La, V({
            key: typeof p.value == "boolean" ? v : p.value || v,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": d[0] || (d[0] = (y) => o(y))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        l.value ? (i(), f("div", {
          key: 1,
          id: `messages-${u.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: A(["fr-message--info flex items-center", n.value])
          }, m(l.value), 3)
        ], 8, Nd)) : b("", !0)
      ], 10, Md)
    ]));
  }
}), Rd = ["id"], Od = ["id"], qd = { class: "fr-hint-text" }, zd = ["data-fr-prefix", "data-fr-suffix"], Qd = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Hd = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Gd = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Kd = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Xd = ["id"], Wd = ["id"], Ud = /* @__PURE__ */ D({
  __name: "DsfrRange",
  props: {
    id: { default: () => K("range") },
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
    const a = t, r = e, l = N(), n = N(), o = N(), s = h(() => a.lowerValue !== void 0), u = h(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * o.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * o.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), d = h(() => {
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
        C(v.$slots, "label", {}, () => [
          S(m(v.label), 1)
        ]),
        c("span", qd, [
          C(v.$slots, "hint", {}, () => [
            S(m(v.hint), 1)
          ])
        ])
      ], 8, Od),
      c("div", {
        class: A(["fr-range", {
          "fr-range--sm": v.small,
          "fr-range--double": s.value,
          "fr-range-group--disabled": v.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": v.prefix ?? void 0,
        "data-fr-suffix": v.suffix ?? void 0,
        style: se(d.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: n,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: se(u.value)
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
          onInput: y[0] || (y[0] = (x) => {
            var k;
            return r("update:lowerValue", +((k = x.target) == null ? void 0 : k.value));
          })
        }, null, 40, Qd)) : b("", !0),
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
          onInput: y[1] || (y[1] = (x) => {
            var k;
            return r("update:modelValue", +((k = x.target) == null ? void 0 : k.value));
          })
        }, null, 40, Hd),
        v.hideIndicators ? b("", !0) : (i(), f("span", Gd, m(v.min), 1)),
        v.hideIndicators ? b("", !0) : (i(), f("span", Kd, m(v.max), 1))
      ], 14, zd),
      v.message || v.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${v.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        C(v.$slots, "messages", {}, () => [
          v.message ? (i(), f("p", {
            key: 0,
            id: `${v.id}-message-error`,
            class: "fr-message fr-message--error"
          }, m(v.message), 9, Wd)) : b("", !0)
        ])
      ], 8, Xd)) : b("", !0)
    ], 10, Rd));
  }
}), Yd = { class: "fr-segmented__element" }, Zd = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Jd = ["for"], $d = { key: 1 }, Ma = /* @__PURE__ */ D({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => K("basic", "checkbox") },
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
    return (l, n) => (i(), f("div", Yd, [
      c("input", V({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: n[0] || (n[0] = (o) => l.$emit("update:modelValue", l.value))
      }), null, 16, Zd),
      c("label", {
        for: l.id,
        class: A(["fr-label", { [r.value]: r.value }])
      }, [
        l.icon && !r.value ? (i(), T(ae, ie(V({ key: 0 }, a.value)), null, 16)) : b("", !0),
        l.icon ? (i(), f("span", $d, " ")) : b("", !0),
        S(" " + m(l.label), 1)
      ], 10, Jd)
    ]));
  }
}), eu = { class: "fr-form-group" }, tu = ["disabled"], au = ["id"], lu = {
  key: 0,
  class: "fr-hint-text"
}, ru = { class: "fr-segmented__elements" }, nu = /* @__PURE__ */ D({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => K("radio-button", "group") },
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
    return (n, o) => (i(), f("div", eu, [
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
          C(n.$slots, "legend", {}, () => [
            S(m(n.legend), 1)
          ]),
          n.hint ? (i(), f("span", lu, m(n.hint), 1)) : b("", !0)
        ], 10, au)) : b("", !0),
        c("div", ru, [
          C(n.$slots, "default", {}, () => [
            (i(!0), f(P, null, O(n.options, (s, u) => (i(), T(Ma, V({
              key: s.value || u,
              name: n.name || s.name,
              ref_for: !0
            }, { ...s, disabled: n.disabled || s.disabled }, {
              "model-value": n.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (d) => l(d))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, tu)
    ]));
  }
}), ou = ["for"], iu = {
  key: 0,
  class: "required"
}, su = {
  key: 0,
  class: "fr-hint-text"
}, du = ["id", "name", "disabled", "aria-disabled", "required"], uu = ["selected"], cu = ["selected", "value", "disabled", "aria-disabled"], fu = ["id"], pu = /* @__PURE__ */ D({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => K("select") },
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
        C(l.$slots, "label", {}, () => [
          S(m(l.label) + " ", 1),
          C(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", iu, " *")) : b("", !0)
          ])
        ]),
        l.description ? (i(), f("span", su, m(l.description), 1)) : b("", !0)
      ], 8, ou),
      c("select", V({
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
        }, m(l.defaultUnselectedText), 9, uu),
        (i(!0), f(P, null, O(l.options, (o, s) => (i(), f("option", {
          key: s,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, m(typeof o == "object" ? o.text : o), 9, cu))), 128))
      ], 16, du),
      a.value ? (i(), f("p", {
        key: 0,
        id: `select-${r.value}-desc-${r.value}`,
        class: A(`fr-${r.value}-text`)
      }, m(a.value), 11, fu)) : b("", !0)
    ], 2));
  }
}), vu = { class: "fr-share" }, mu = { class: "fr-share__title" }, gu = { class: "fr-btns-group" }, bu = ["title", "href", "onClick"], hu = { key: 0 }, yu = ["href", "title"], ku = ["title"], _u = /* @__PURE__ */ D({
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
      return i(), f("div", vu, [
        c("p", mu, m(r.title), 1),
        c("ul", gu, [
          (i(!0), f(P, null, O(r.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: A(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: J((u) => a(o), ["prevent"])
            }, m(o.label), 11, bu)
          ]))), 128)),
          (n = r.mail) != null && n.to ? (i(), f("li", hu, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: r.mail.to,
              title: r.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, m(r.mail.label), 9, yu)
          ])) : b("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: r.copyLabel,
              onClick: l[0] || (l[0] = (o) => e())
            }, m(r.copyLabel), 9, ku)
          ])
        ])
      ]);
    };
  }
}), Fa = /* @__PURE__ */ D({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      class: A(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      C(e.$slots, "default")
    ], 2));
  }
}), wu = ["aria-current", "aria-expanded", "aria-controls"], Pa = /* @__PURE__ */ D({
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
      C(e.$slots, "default")
    ], 8, wu));
  }
}), xu = ["id"], Du = { class: "fr-sidemenu__list" }, Va = /* @__PURE__ */ D({
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
    const s = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => s(p) ? "a" : "RouterLink", d = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, v) => {
      const y = oe("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: a,
        class: A({
          "fr-collapse": p.collapsable,
          "fr-collapsing": Q(r),
          "fr-collapse--expanded": Q(l)
        }),
        onTransitionend: v[2] || (v[2] = (x) => Q(o)(!!p.expanded))
      }, [
        c("ul", Du, [
          C(p.$slots, "default"),
          (i(!0), f(P, null, O(p.menuItems, (x, k) => (i(), T(Fa, {
            key: k,
            active: x.active
          }, {
            default: j(() => [
              x.menuItems ? b("", !0) : (i(), T(te(u(x.to)), V({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": x.active ? "page" : void 0,
                ref_for: !0
              }, d(x.to)), {
                default: j(() => [
                  S(m(x.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              x.menuItems ? (i(), f(P, { key: 1 }, [
                G(Pa, {
                  active: !!x.active,
                  expanded: !!x.expanded,
                  "control-id": x.id,
                  onToggleExpand: v[0] || (v[0] = (L) => p.$emit("toggleExpand", L))
                }, {
                  default: j(() => [
                    S(m(x.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                x.menuItems ? (i(), T(y, {
                  key: 0,
                  id: x.id,
                  collapsable: "",
                  expanded: x.expanded,
                  "menu-items": x.menuItems,
                  onToggleExpand: v[1] || (v[1] = (L) => p.$emit("toggleExpand", L))
                }, null, 8, ["id", "expanded", "menu-items"])) : b("", !0)
              ], 64)) : b("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, xu);
    };
  }
}), Iu = ["aria-labelledby"], Cu = { class: "fr-sidemenu__inner" }, Tu = ["aria-controls", "aria-expanded"], Eu = ["id"], Bu = { class: "fr-sidemenu__title" }, Su = /* @__PURE__ */ D({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => K("sidemenu") },
    sideMenuListId: { default: () => K("sidemenu", "list") },
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
    } = ce(), o = N(!1);
    return ee(o, (s, u) => {
      s !== u && l(s);
    }), (s, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": s.id
    }, [
      c("div", Cu, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": s.id,
          "aria-expanded": o.value,
          onClick: u[0] || (u[0] = J((d) => o.value = !o.value, ["prevent", "stop"]))
        }, m(s.buttonLabel), 9, Tu),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: e,
          class: A(["fr-collapse", {
            "fr-collapse--expanded": Q(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Q(a)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => Q(n)(o.value))
        }, [
          c("div", Bu, m(s.headingTitle), 1),
          C(s.$slots, "default", {}, () => [
            G(Va, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: u[1] || (u[1] = (d) => s.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Eu)
      ])
    ], 8, Iu));
  }
}), Au = /* @__PURE__ */ D({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = h(() => typeof e.to == "string" && e.to.startsWith("http")), r = h(() => a.value ? "a" : "RouterLink"), l = h(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (n, o) => (i(), T(te(r.value), V({
      "aria-current": n.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: j(() => [
        C(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), Lu = { class: "fr-skiplinks" }, Mu = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Fu = { class: "fr-skiplinks__list" }, Pu = ["href", "onClick"], Vu = /* @__PURE__ */ D({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(t) {
    const e = (a) => {
      const r = document.getElementById(a);
      r == null || r.focus();
    };
    return (a, r) => (i(), f("div", Lu, [
      c("nav", Mu, [
        c("ul", Fu, [
          (i(!0), f(P, null, O(a.links, (l) => (i(), f("li", {
            key: l.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: J((n) => e(l.id), ["prevent"])
            }, m(l.text), 9, Pu)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Nu = { class: "fr-stepper" }, ju = { class: "fr-stepper__title" }, Ru = { class: "fr-stepper__state" }, Ou = ["data-fr-current-step", "data-fr-steps"], qu = { class: "fr-stepper__details" }, zu = {
  key: 0,
  class: "fr-text--bold"
}, Qu = /* @__PURE__ */ D({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Nu, [
      c("h2", ju, [
        S(m(e.steps[e.currentStep - 1]) + " ", 1),
        c("span", Ru, "Étape " + m(e.currentStep) + " sur " + m(e.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, Ou),
      c("p", qu, [
        e.currentStep < e.steps.length ? (i(), f("span", zu, "Étape suivante :")) : b("", !0),
        S(" " + m(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), Hu = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, Gu = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, Ku = { class: "fr-summary__list" }, Xu = ["href"], Wu = /* @__PURE__ */ D({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("nav", Hu, [
      c("h2", Gu, m(e.title), 1),
      c("ol", Ku, [
        (i(!0), f(P, null, O(e.anchors, (r, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: "fr-summary__link",
            href: r.link
          }, m(r.name), 9, Xu)
        ]))), 128))
      ])
    ]));
  }
}), mt = Symbol("tabs"), Uu = { role: "presentation" }, Yu = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Zu = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Na = /* @__PURE__ */ D({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    selected: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(t, { emit: e }) {
    const a = t, r = e, l = N(null);
    ee(() => a.selected, (d) => {
      var p;
      d && ((p = l.value) == null || p.focus());
    });
    const n = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      ArrowDown: "next",
      ArrowUp: "previous",
      Home: "first",
      End: "last"
    };
    function o(d) {
      const p = d == null ? void 0 : d.key, v = n[p];
      v && r(v);
    }
    const s = rt(mt), { isVisible: u } = s(Pe(() => a.tabId));
    return (d, p) => (i(), f("li", Uu, [
      c("button", {
        id: d.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${d.tabId}`,
        class: "fr-tabs__tab",
        tabindex: Q(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": Q(u),
        "aria-controls": d.panelId,
        onClick: p[0] || (p[0] = J((v) => d.$emit("click", d.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (v) => o(v))
      }, [
        d.icon ? (i(), f("span", Zu, [
          G(ae, { name: d.icon }, null, 8, ["name"])
        ])) : b("", !0),
        C(d.$slots, "default")
      ], 40, Yu)
    ]));
  }
}), Ju = ["id", "aria-labelledby", "tabindex"], $u = /* @__PURE__ */ D({
  __name: "DsfrTabContent",
  props: {
    asc: { type: Boolean },
    selected: { type: Boolean },
    panelId: {},
    tabId: {}
  },
  setup(t) {
    Ut((u) => ({
      "28f7416a": o.value,
      "1d586b48": s.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, r = rt(mt), { isVisible: l, asc: n } = r(Pe(() => e.tabId)), o = h(() => a[String(n == null ? void 0 : n.value)]), s = h(() => a[String(!(n != null && n.value))]);
    return (u, d) => (i(), T($a, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: j(() => [
        nt(c("div", {
          id: u.panelId,
          class: A(["fr-tabs__panel", {
            "fr-tabs__panel--selected": Q(l)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: Q(l) ? 0 : -1
        }, [
          C(u.$slots, "default", {}, void 0, !0)
        ], 10, Ju), [
          [Xt, Q(l)]
        ])
      ]),
      _: 3
    }));
  }
}), ja = /* @__PURE__ */ le($u, [["__scopeId", "data-v-70975c25"]]), ec = ["aria-label"], tc = /* @__PURE__ */ D({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: e, emit: a }) {
    const r = t, l = a, n = N(!1), o = h({
      get: () => r.modelValue,
      set(B) {
        l("update:modelValue", B);
      }
    }), s = N(/* @__PURE__ */ new Map()), u = N(0);
    Kt(mt, (B) => {
      const q = N(!0);
      if (ee(o, (U, Y) => {
        q.value = U > Y;
      }), [...s.value.values()].includes(B.value))
        return { isVisible: h(() => s.value.get(o.value) === B.value), asc: q };
      const E = u.value++;
      s.value.set(E, B.value);
      const z = h(() => E === o.value);
      return ee(B, () => {
        s.value.set(E, B.value);
      }), ue(() => {
        s.value.delete(E);
      }), { isVisible: z };
    });
    const d = N(null), p = N(null), v = Ua({}), y = (B) => {
      if (v[B])
        return v[B];
      const q = K("tab");
      return v[B] = q, q;
    }, x = async () => {
      const B = o.value === 0 ? r.tabTitles.length - 1 : o.value - 1;
      n.value = !1, o.value = B;
    }, k = async () => {
      const B = o.value === r.tabTitles.length - 1 ? 0 : o.value + 1;
      n.value = !0, o.value = B;
    }, L = async () => {
      o.value = 0;
    }, g = async () => {
      o.value = r.tabTitles.length - 1;
    }, I = N({ "--tabs-height": "100px" }), F = () => {
      var B;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const q = p.value.offsetHeight, E = (B = d.value) == null ? void 0 : B.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!E || !E.offsetHeight)
        return;
      const z = E.offsetHeight;
      I.value["--tabs-height"] = `${q + z}px`;
    }, R = N(null);
    return ne(() => {
      var B;
      window.ResizeObserver && (R.value = new window.ResizeObserver(() => {
        F();
      })), (B = d.value) == null || B.querySelectorAll(".fr-tabs__panel").forEach((q) => {
        var E;
        q && ((E = R.value) == null || E.observe(q));
      });
    }), ue(() => {
      var B;
      (B = d.value) == null || B.querySelectorAll(".fr-tabs__panel").forEach((q) => {
        var E;
        q && ((E = R.value) == null || E.unobserve(q));
      });
    }), e({
      renderTabs: F,
      selectFirst: L,
      selectLast: g
    }), (B, q) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: se(I.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": B.tabListName
      }, [
        C(B.$slots, "tab-items", {}, () => [
          (i(!0), f(P, null, O(B.tabTitles, (E, z) => (i(), T(Na, {
            key: z,
            icon: E.icon,
            "panel-id": E.panelId || `${y(z)}-panel`,
            "tab-id": E.tabId || y(z),
            onClick: (U) => o.value = z,
            onNext: q[0] || (q[0] = (U) => k()),
            onPrevious: q[1] || (q[1] = (U) => x()),
            onFirst: q[2] || (q[2] = (U) => L()),
            onLast: q[3] || (q[3] = (U) => g())
          }, {
            default: j(() => [
              S(m(E.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, ec),
      (i(!0), f(P, null, O(B.tabContents, (E, z) => {
        var U, Y, _, w;
        return i(), T(ja, {
          key: z,
          "panel-id": ((Y = (U = B.tabTitles) == null ? void 0 : U[z]) == null ? void 0 : Y.panelId) || `${y(z)}-panel`,
          "tab-id": ((w = (_ = B.tabTitles) == null ? void 0 : _[z]) == null ? void 0 : w.tabId) || y(z)
        }, {
          default: j(() => [
            S(m(E), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      C(B.$slots, "default")
    ], 4));
  }
}), Ra = /* @__PURE__ */ D({
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
    return (l, n) => (i(), f("td", ie(ot(l.cellAttrs)), [
      a.value ? (i(), T(te(a.value), ie(V({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: j(() => [
          S(m(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(P, { key: 1 }, [
        S(m(r.value ? l.field : l.field.text), 1)
      ], 64))
    ], 16));
  }
}), Oa = /* @__PURE__ */ D({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(t) {
    return (e, a) => (i(), f("tr", ie(ot(e.rowAttrs)), [
      C(e.$slots, "default"),
      (i(!0), f(P, null, O(e.rowData, (r, l) => (i(), T(Ra, {
        key: l,
        field: r ?? "",
        "cell-attrs": typeof r == "object" && r !== null && !r.component ? r.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), qa = /* @__PURE__ */ D({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = h(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), r = h(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, n) => (i(), f("th", V(l.headerAttrs, { scope: "col" }), [
      S(m(l.header) + " ", 1),
      l.icon && !a.value ? (i(), T(ae, ie(V({ key: 0 }, r.value)), null, 16)) : b("", !0),
      a.value ? (i(), f("span", {
        key: 1,
        class: A({ [String(l.icon)]: a.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), ac = { key: 0 }, za = /* @__PURE__ */ D({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (i(), f("tr", ac, [
      (i(!0), f(P, null, O(e.headers, (r, l) => (i(), T(qa, {
        key: l,
        header: (typeof r == "object" ? r : {}).text || r,
        "header-attrs": r.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), lc = (t) => (Zt("data-v-d7bee41c"), t = t(), Jt(), t), rc = { class: "caption" }, nc = { key: 1 }, oc = ["colspan"], ic = { class: "flex justify-right" }, sc = { class: "self-center" }, dc = /* @__PURE__ */ lc(() => /* @__PURE__ */ c("span", null, "Résultats par page : ", -1)), uc = ["value"], cc = { class: "flex ml-1" }, fc = { class: "self-center" }, pc = { class: "flex ml-1" }, vc = /* @__PURE__ */ D({
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
    const a = t, r = e, l = (g) => Array.isArray(g) ? g : g.rowData, n = N(a.currentPage), o = N(a.resultsDisplayed), s = N(
      a.rows.length > o.value ? Math.ceil(a.rows.length / o.value) : 1
    ), u = [5, 10, 25, 50, 100], d = () => n.value * o.value - o.value, p = () => n.value * o.value;
    ee(
      () => o.value,
      (g) => {
        s.value = a.rows.length > o.value ? Math.ceil(a.rows.length / g) : 1;
      }
    );
    const v = h(() => a.pagination ? a.rows.slice(d(), p()) : a.rows), y = () => {
      n.value = 1, r("update:currentPage");
    }, x = () => {
      n.value > 1 && (n.value -= 1, r("update:currentPage"));
    }, k = () => {
      n.value < s.value && (n.value += 1, r("update:currentPage"));
    }, L = () => {
      n.value = s.value, r("update:currentPage");
    };
    return (g, I) => (i(), f("div", {
      class: A(["fr-table", { "fr-table--no-caption": g.noCaption }])
    }, [
      c("table", null, [
        c("caption", rc, m(g.title), 1),
        c("thead", null, [
          C(g.$slots, "header", {}, () => [
            g.headers && g.headers.length ? (i(), T(za, {
              key: 0,
              headers: g.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          C(g.$slots, "default", {}, void 0, !0),
          g.rows && g.rows.length ? (i(!0), f(P, { key: 0 }, O(v.value, (F, R) => (i(), T(Oa, {
            key: g.rowKey && l(F) ? typeof g.rowKey == "string" ? l(F)[g.headers.indexOf(g.rowKey)].toString() : g.rowKey(l(F)) : R,
            "row-data": l(F),
            "row-attrs": "rowAttrs" in F ? F.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : b("", !0),
          g.pagination ? (i(), f("tr", nc, [
            c("td", {
              colspan: g.headers.length
            }, [
              c("div", ic, [
                c("div", sc, [
                  dc,
                  nt(c("select", {
                    "onUpdate:modelValue": I[0] || (I[0] = (F) => o.value = F),
                    onChange: I[1] || (I[1] = (F) => r("update:currentPage"))
                  }, [
                    (i(), f(P, null, O(u, (F, R) => c("option", {
                      key: R,
                      value: F
                    }, m(F), 9, uc)), 64))
                  ], 544), [
                    [el, o.value]
                  ])
                ]),
                c("div", cc, [
                  c("span", fc, "Page " + m(n.value) + " sur " + m(s.value), 1)
                ]),
                c("div", pc, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: I[2] || (I[2] = (F) => y())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: I[3] || (I[3] = (F) => x())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: I[4] || (I[4] = (F) => k())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: I[5] || (I[5] = (F) => L())
                  })
                ])
              ])
            ], 8, oc)
          ])) : b("", !0)
        ])
      ])
    ], 2));
  }
}), mc = /* @__PURE__ */ le(vc, [["__scopeId", "data-v-d7bee41c"]]), Gt = 0.9, gc = /* @__PURE__ */ D({
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
    const e = t, a = h(() => typeof e.link == "string" && e.link.startsWith("http")), r = h(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = h(() => ({ [a.value ? "href" : "to"]: e.link })), n = h(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), o = h(() => n.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Gt } : { scale: Gt, ...e.icon ?? {} });
    return (s, u) => (i(), T(te(r.value), V({
      class: ["fr-tag", {
        "fr-tag--sm": s.small,
        [s.icon]: n.value,
        "fr-tag--icon-left": n.value
      }],
      disabled: s.disabled
    }, l.value), {
      default: j(() => [
        e.icon && !n.value ? (i(), T(ae, V({
          key: 0,
          label: s.iconOnly ? s.label : void 0,
          class: "fr-mr-1v"
        }, o.value), null, 16, ["label"])) : b("", !0),
        s.iconOnly ? b("", !0) : (i(), f(P, { key: 1 }, [
          S(m(s.label), 1)
        ], 64)),
        C(s.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), gt = /* @__PURE__ */ le(gc, [["__scopeId", "data-v-4e27795a"]]), bc = { class: "fr-tags-group" }, hc = /* @__PURE__ */ D({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("ul", bc, [
      (i(!0), f(P, null, O(e.tags, ({ icon: r, label: l, ...n }, o) => (i(), f("li", { key: o }, [
        G(gt, V({ ref_for: !0 }, n, {
          icon: r,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), yc = { class: "fr-tile__body" }, kc = { class: "fr-tile__content" }, _c = ["download", "href"], wc = {
  key: 0,
  class: "fr-tile__desc"
}, xc = {
  key: 1,
  class: "fr-tile__detail"
}, Dc = {
  key: 2,
  class: "fr-tile__start"
}, Ic = { class: "fr-tile__header" }, Cc = {
  key: 0,
  class: "fr-tile__pictogram"
}, Tc = ["src"], Ec = ["href"], Bc = ["href"], Sc = ["href"], Ac = /* @__PURE__ */ D({
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
      const o = oe("RouterLink");
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
        c("div", yc, [
          c("div", kc, [
            (i(), T(te(l.titleTag), { class: "fr-tile__title" }, {
              default: j(() => [
                r.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, m(l.title), 9, _c)) : b("", !0),
                r.value ? b("", !0) : (i(), T(o, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: j(() => [
                    S(m(l.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            l.description ? (i(), f("p", wc, m(l.description), 1)) : b("", !0),
            l.details ? (i(), f("p", xc, m(l.details), 1)) : b("", !0),
            l.$slots["start-details"] ? (i(), f("div", Dc, [
              C(l.$slots, "start-details", {}, void 0, !0)
            ])) : b("", !0)
          ])
        ]),
        c("div", Ic, [
          C(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (i(), f("div", Cc, [
            l.imgSrc ? (i(), f("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Tc)) : (i(), f("svg", V({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...a, ...l.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${l.svgPath}#artwork-decorative`
              }, null, 8, Ec),
              c("use", {
                class: "fr-artwork-minor",
                href: `${l.svgPath}#artwork-minor`
              }, null, 8, Bc),
              c("use", {
                class: "fr-artwork-major",
                href: `${l.svgPath}#artwork-major`
              }, null, 8, Sc)
            ], 16))
          ])) : b("", !0)
        ])
      ], 2);
    };
  }
}), Qa = /* @__PURE__ */ le(Ac, [["__scopeId", "data-v-f4d836a2"]]), Lc = { class: "fr-grid-row fr-grid-row--gutters" }, Mc = /* @__PURE__ */ D({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Lc, [
      (i(!0), f(P, null, O(e.tiles, (r, l) => (i(), f("div", {
        key: l,
        class: A({
          [r.containerClass]: r.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !r.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        G(Qa, V({
          horizontal: e.horizontal,
          ref_for: !0
        }, r), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Fc = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], Pc = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Vc = ["id"], Nc = /* @__PURE__ */ D({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => K("toggle") },
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
      }, null, 40, Fc),
      c("label", {
        id: a.value,
        class: "fr-toggle__label",
        for: r.inputId,
        "data-fr-checked-label": r.noText ? void 0 : r.activeText,
        "data-fr-unchecked-label": r.noText ? void 0 : r.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, m(r.label), 9, Pc),
      r.hint ? (i(), f("p", {
        key: 0,
        id: `${r.inputId}-hint-text`,
        class: "fr-hint-text"
      }, m(r.hint), 9, Vc)) : b("", !0)
    ], 2));
  }
}), jc = ["id"], Rc = /* @__PURE__ */ D({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => K("tooltip") }
  },
  setup(t) {
    const e = t, a = N(!1), r = N(null), l = N(null), n = N("0px"), o = N("0px"), s = N("0px"), u = N(!1), d = N(0);
    async function p() {
      var I, F, R, B, q, E;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((Z) => setTimeout(Z, 100));
      const z = (I = r.value) == null ? void 0 : I.getBoundingClientRect().top, U = (F = r.value) == null ? void 0 : F.offsetHeight, Y = (R = r.value) == null ? void 0 : R.offsetWidth, _ = (B = r.value) == null ? void 0 : B.getBoundingClientRect().left, w = (q = l.value) == null ? void 0 : q.offsetHeight, M = (E = l.value) == null ? void 0 : E.offsetWidth, X = !(z - w < 0) && z + U + w >= document.documentElement.offsetHeight;
      u.value = X;
      const H = _ + Y >= document.documentElement.offsetWidth, W = _ + Y / 2 - M / 2 <= 0;
      o.value = X ? `${z - w + 8}px` : `${z + U - 8}px`, d.value = 1, n.value = H ? `${_ + Y - M - 4}px` : W ? `${_ + 4}px` : `${_ + Y / 2 - M / 2}px`, s.value = H ? `${M / 2 - Y / 2 + 4}px` : W ? `${-(M / 2) + Y / 2 - 4}px` : "0px";
    }
    ee(a, p, { immediate: !0 }), ne(() => {
      window.addEventListener("scroll", p);
    }), ue(() => {
      window.removeEventListener("scroll", p);
    });
    const v = h(() => `transform: translate(${n.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), y = h(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), x = (I) => {
      var F, R;
      a.value && (I.target === r.value || (F = r.value) != null && F.contains(I.target) || I.target === l.value || (R = l.value) != null && R.contains(I.target) || (a.value = !1));
    };
    ne(() => {
      document.documentElement.addEventListener("click", x);
    }), ue(() => {
      document.documentElement.removeEventListener("click", x);
    });
    const k = () => {
      e.onHover && (a.value = !0);
    }, L = () => {
      e.onHover && (a.value = !1);
    }, g = () => {
      e.onHover || (a.value = !a.value);
    };
    return (I, F) => (i(), f(P, null, [
      (i(), T(te(I.onHover ? "a" : "button"), {
        id: `link-${I.id}`,
        ref_key: "source",
        ref: r,
        class: A(I.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": I.id,
        href: I.onHover ? "#" : void 0,
        onClick: F[0] || (F[0] = (R) => g()),
        onMouseenter: F[1] || (F[1] = (R) => k()),
        onMouseleave: F[2] || (F[2] = (R) => L())
      }, {
        default: j(() => [
          C(I.$slots, "default", {}, void 0, !0)
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
      }, m(I.content), 15, jc)
    ], 64));
  }
}), Oc = /* @__PURE__ */ le(Rc, [["__scopeId", "data-v-c54626f2"]]), qc = { class: "fr-transcription" }, zc = ["aria-expanded", "aria-controls"], Qc = ["id"], Hc = ["id", "aria-labelledby"], Gc = { class: "fr-container fr-container--fluid fr-container-md" }, Kc = { class: "fr-grid-row fr-grid-row--center" }, Xc = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Wc = { class: "fr-modal__body" }, Uc = { class: "fr-modal__header" }, Yc = ["aria-controls"], Zc = { class: "fr-modal__content" }, Jc = ["id"], $c = { class: "fr-transcription__footer" }, ef = { class: "fr-transcription__actions-group" }, tf = ["aria-controls"], Ha = /* @__PURE__ */ D({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => K("transcription") },
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
    } = ce(), s = N(!1), u = N(!1), d = h(() => `fr-transcription__modal-${e.id}`), p = h(() => `fr-transcription__collapse-${e.id}`);
    return ee(u, (v, y) => {
      v !== y && n(v);
    }), (v, y) => {
      const x = oe("DsfrModal");
      return i(), f("div", qc, [
        c("button", {
          class: "fr-transcription__btn",
          "aria-expanded": u.value,
          "aria-controls": p.value,
          onClick: y[0] || (y[0] = (k) => u.value = !u.value)
        }, " Transcription ", 8, zc),
        c("div", {
          id: p.value,
          ref_key: "collapse",
          ref: a,
          class: A(["fr-collapse", { "fr-collapse--expanded": Q(l), "fr-collapsing": Q(r) }]),
          onTransitionend: y[2] || (y[2] = (k) => Q(o)(u.value))
        }, [
          c("dialog", {
            id: d.value,
            class: "fr-modal",
            role: "dialog",
            "aria-labelledby": `${d.value}-title`
          }, [
            c("div", Gc, [
              c("div", Kc, [
                c("div", Xc, [
                  c("div", Wc, [
                    c("div", Uc, [
                      c("button", {
                        class: "fr-btn--close fr-btn",
                        "aria-controls": d.value,
                        title: "Fermer"
                      }, " Fermer ", 8, Yc)
                    ]),
                    c("div", Zc, [
                      c("h1", {
                        id: `${d.value}-title`,
                        class: "fr-modal__title"
                      }, m(v.title), 9, Jc),
                      S(" " + m(v.content), 1)
                    ]),
                    c("div", $c, [
                      c("div", ef, [
                        c("button", {
                          class: "fr-btn fr-btn--fullscreen",
                          "aria-controls": d.value,
                          "data-fr-opened": "false",
                          title: "",
                          onClick: y[1] || (y[1] = (k) => s.value = !0)
                        }, " Agrandir ", 8, tf)
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ], 8, Hc)
        ], 42, Qc),
        (i(), T(Ya, { to: "body" }, [
          G(x, {
            title: v.title,
            opened: s.value,
            onClose: y[3] || (y[3] = (k) => s.value = !1)
          }, {
            default: j(() => [
              C(v.$slots, "default", {}, () => [
                S(m(v.content), 1)
              ])
            ]),
            _: 3
          }, 8, ["title", "opened"])
        ]))
      ]);
    };
  }
}), af = ["src"], lf = { class: "fr-content-media__caption" }, rf = /* @__PURE__ */ D({
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
    return (e, a) => (i(), f(P, null, [
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
          }, null, 8, af)
        ], 2),
        c("div", lf, m(e.legend), 1)
      ], 2),
      G(Ha, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), nf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: sl,
  DsfrAccordionsGroup: ul,
  DsfrAlert: pl,
  DsfrBackToTop: tl,
  DsfrBadge: ea,
  DsfrBreadcrumb: kl,
  DsfrButton: xe,
  DsfrButtonGroup: Re,
  DsfrCallout: Ar,
  DsfrCard: Gr,
  DsfrCheckbox: pt,
  DsfrCheckboxSet: an,
  DsfrConsent: on,
  DsfrErrorPage: bn,
  DsfrFieldset: wn,
  DsfrFileDownload: ga,
  DsfrFileDownloadList: Tn,
  DsfrFileUpload: Fn,
  DsfrFollow: ao,
  DsfrFooter: Fo,
  DsfrFooterLinkList: jo,
  DsfrFooterPartners: ya,
  DsfrFranceConnect: Qo,
  DsfrHeader: Ai,
  DsfrHeaderMenuLink: ka,
  DsfrHeaderMenuLinks: tt,
  DsfrHighlight: Mi,
  DsfrInput: vt,
  DsfrInputGroup: Ri,
  DsfrLanguageSelector: at,
  DsfrLogo: Se,
  DsfrModal: Ds,
  DsfrNavigation: Ks,
  DsfrNavigationItem: Ta,
  DsfrNavigationMegaMenu: Aa,
  DsfrNavigationMegaMenuCategory: Sa,
  DsfrNavigationMenu: Ba,
  DsfrNavigationMenuItem: Ea,
  DsfrNavigationMenuLink: Oe,
  DsfrNewsLetter: ha,
  DsfrNotice: Zs,
  DsfrPagination: sd,
  DsfrPicture: pd,
  DsfrQuote: _d,
  DsfrRadioButton: La,
  DsfrRadioButtonSet: jd,
  DsfrRange: Ud,
  DsfrSearchBar: et,
  DsfrSegmented: Ma,
  DsfrSegmentedSet: nu,
  DsfrSelect: pu,
  DsfrShare: _u,
  DsfrSideMenu: Su,
  DsfrSideMenuButton: Pa,
  DsfrSideMenuLink: Au,
  DsfrSideMenuList: Va,
  DsfrSideMenuListItem: Fa,
  DsfrSkipLinks: Vu,
  DsfrSocialNetworks: ba,
  DsfrStepper: Qu,
  DsfrSummary: Wu,
  DsfrTabContent: ja,
  DsfrTabItem: Na,
  DsfrTable: mc,
  DsfrTableCell: Ra,
  DsfrTableHeader: qa,
  DsfrTableHeaders: za,
  DsfrTableRow: Oa,
  DsfrTabs: tc,
  DsfrTag: gt,
  DsfrTags: hc,
  DsfrTile: Qa,
  DsfrTiles: Mc,
  DsfrToggleSwitch: Nc,
  DsfrTooltip: Oc,
  DsfrTranscription: Ha,
  DsfrVideo: rf,
  VIcon: ae
}, Symbol.toStringTag, { value: "Module" })), of = {
  install: (t, { components: e } = {}) => {
    Object.entries(nf).forEach(([a, r]) => {
      (e === void 0 || e === "all" || e.map(({ name: l }) => l).includes(a)) && t.component(a, r);
    }), t.component("VIcon", ae);
  }
}, sf = {
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
    return this._searchAndFilterList(t, e, a, n, o).map(function(u) {
      return { value: u[e], label: u[a].toString(), hint: u[l], disabled: u[r] };
    });
  },
  dsfrTransformListForCheckbox: function(t, e, a, r, l, n, o, s) {
    return this._searchAndFilterList(t, e, a, o, s).map(function(d) {
      return { value: d[e], label: d[a].toString(), name: n, hint: d[l], disabled: d[r] };
    });
  }
}, df = ["href"], uf = {
  __name: "Routerlink",
  props: ["to"],
  setup(t) {
    const e = t;
    return (a, r) => (i(), f("a", {
      href: e.to
    }, [
      C(a.$slots, "default")
    ], 8, df));
  }
}, cf = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [r, l] of e)
    a[r] = l;
  return a;
}, ff = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: pt, DsfrTag: gt, DsfrButton: xe },
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
}, pf = {
  key: 0,
  class: "fr-mb-2w"
}, vf = { class: "fr-mb-1w" }, mf = { key: 0 }, gf = { class: "facet" }, bf = { class: "flex justify-between w-full fr-mb-0" }, hf = { class: "facet--count" }, yf = { key: 1 }, kf = { class: "flex justify-between w-full" }, _f = { class: "facet--count" }, wf = { key: 0 }, xf = { class: "facet" }, Df = { class: "flex justify-between w-full fr-mb-0" }, If = { class: "facet--count" }, Cf = { key: 1 }, Tf = { class: "flex justify-between w-full" }, Ef = { class: "facet--count" }, Bf = { class: "fr-mb-2w" };
function Sf(t, e, a, r, l, n) {
  const o = oe("DsfrTag"), s = oe("DsfrCheckbox"), u = oe("DsfrButton");
  return i(), f("div", null, [
    n.isAnyFacetValueSelected() ? (i(), f("div", pf, [
      (i(!0), f(P, null, O(a.selectedFacets, (d, p) => (i(), f("div", { key: p }, [
        n.facetMultipleByCode(p) ? b("", !0) : (i(!0), f(P, { key: 0 }, O(d, (v) => (i(), T(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: v.code,
          onClick: (y) => t.$emit("toogle-facet", p, v, a.contextKey)
        }, {
          default: j(() => [
            S(m(n.facetLabelByCode(p)) + ": " + m(n.facetValueLabelByCode(p, v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : b("", !0),
    (i(!0), f(P, null, O(a.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !n.isFacetSelected(d.code) ? (i(), f(P, { key: 0 }, [
        c("h6", vf, m(d.label), 1),
        c("ul", null, [
          (i(!0), f(P, null, O(n.selectedInvisibleFacets(d.code), (p) => (i(), f(P, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", mf, [
              c("div", gf, [
                G(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", d.code, p.code, a.contextKey)
                }, {
                  label: j(() => [
                    c("p", bf, [
                      S(m(n.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", hf, m(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", yf, [
              G(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", d.code, p.code, a.contextKey)
              }, {
                default: j(() => [
                  c("span", kf, [
                    S(m(n.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", _f, m(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(P, null, O(n.visibleFacets(d.code, d.values), (p) => (i(), f(P, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", wf, [
              c("div", xf, [
                G(s, {
                  small: "",
                  modelValue: n.isFacetValueSelected(d.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", d.code, p.code, a.contextKey)
                }, {
                  label: j(() => [
                    c("p", Df, [
                      S(m(n.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", If, m(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", Cf, [
              G(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", d.code, p.code, a.contextKey)
              }, {
                default: j(() => [
                  c("span", Tf, [
                    S(m(n.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", Ef, m(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", Bf, [
          d.values.length > a.maxValues && !n.isFacetExpanded(d.code) ? (i(), T(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => n.expandFacet(d.code)
          }, {
            default: j(() => [
              S(m(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0),
          d.values.length > a.maxValues && n.isFacetExpanded(d.code) ? (i(), T(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => n.reduceFacet(d.code)
          }, {
            default: j(() => [
              S(m(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0)
        ])
      ], 64)) : b("", !0)
    ]))), 128))
  ]);
}
const Af = /* @__PURE__ */ cf(ff, [["render", Sf], ["__scopeId", "data-v-e1d6020e"]]);
var Lf = {
  install: function(t, e) {
    t.use(of), t.component("RouterLink", uf), t.component("DsfrFacets", Af);
  },
  methods: sf
};
window && (window.DSFR = Lf);
export {
  Lf as default
};
//# sourceMappingURL=dsfr.es.js.map
