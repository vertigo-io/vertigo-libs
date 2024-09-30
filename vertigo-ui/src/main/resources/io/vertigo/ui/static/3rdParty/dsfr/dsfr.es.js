import { defineComponent as B, ref as R, computed as k, onMounted as oe, watch as ee, onUnmounted as fe, Comment as Ja, cloneVNode as el, h as Tt, mergeModels as De, useModel as ce, openBlock as i, createElementBlock as f, normalizeClass as S, createElementVNode as c, withDirectives as me, mergeProps as O, vModelCheckbox as ct, renderSlot as E, createTextVNode as M, toDisplayString as m, createCommentVNode as y, inject as Re, toRef as Oe, createBlock as F, resolveDynamicComponent as te, withCtx as Q, unref as j, provide as ft, resolveComponent as se, vShow as Zt, Fragment as V, renderList as z, normalizeStyle as ue, createVNode as G, normalizeProps as ie, withModifiers as W, guardReactiveProps as pt, withKeys as re, useSlots as Jt, hasInjectionContext as tl, reactive as al, Teleport as ll, useCssVars as ea, nextTick as ta, vModelSelect as aa, useAttrs as rl, onBeforeUnmount as nl, Transition as ol } from "vue";
const vt = Symbol("accordions"), mt = Symbol("header"), qe = Symbol("tabs"), pe = () => {
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
}, il = "abcdefghijklmnopqrstuvwyz0123456789", Ct = il.repeat(10), sl = () => {
  const t = Math.floor(Math.random() * Ct.length);
  return Ct[t];
}, ul = (t) => Array.from({ length: t }).map(sl).join(""), U = (t = "", e = "") => (t ? `${t}-` : "") + ul(5) + (e ? `-${e}` : ""), dl = { class: "fr-accordion" }, cl = ["aria-expanded", "aria-controls"], fl = ["id"], pl = /* @__PURE__ */ B({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => U("accordion") },
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
    } = pe(), s = R(), u = Re(vt), { isActive: d, expand: p } = (u == null ? void 0 : u(Oe(() => e.title))) ?? { isActive: s, expand: () => s.value = !s.value };
    return oe(() => {
      d.value && n(!0);
    }), ee(d, (v, _) => {
      v !== _ && n(v);
    }), (v, _) => (i(), f("section", dl, [
      (i(), F(te(v.titleTag), { class: "fr-accordion__title" }, {
        default: Q(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": j(d),
            "aria-controls": v.id,
            type: "button",
            onClick: _[0] || (_[0] = (D) => j(p)())
          }, [
            E(v.$slots, "title", {}, () => [
              M(m(v.title), 1)
            ])
          ], 8, cl)
        ]),
        _: 3
      })),
      c("div", {
        id: v.id,
        ref_key: "collapse",
        ref: a,
        class: S(["fr-collapse", {
          "fr-collapse--expanded": j(l),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": j(r)
        }]),
        onTransitionend: _[1] || (_[1] = (D) => j(o)(j(d)))
      }, [
        E(v.$slots, "default")
      ], 42, fl)
    ]));
  }
}), vl = { class: "fr-accordions-group" }, ml = /* @__PURE__ */ B({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const a = t, r = e, l = k({
      get: () => a.modelValue,
      set(s) {
        r("update:modelValue", s);
      }
    }), n = R(/* @__PURE__ */ new Map()), o = R(0);
    return ft(vt, (s) => {
      const u = o.value++;
      n.value.set(u, s.value);
      const d = k(() => u === l.value);
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
      return fe(() => {
        n.value.delete(u);
      }), { isActive: d, expand: p };
    }), (s, u) => (i(), f("div", vl, [
      E(s.$slots, "default")
    ]));
  }
}), gl = ["id", "role"], bl = ["title", "aria-label"], hl = /* @__PURE__ */ B({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => U("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(t, { emit: e }) {
    const a = t, r = e, l = () => r("close"), n = k(
      () => [
        `fr-alert--${a.type}`,
        {
          "fr-alert--sm": a.small
        }
      ]
    );
    return (o, s) => o.closed ? y("", !0) : (i(), f("div", {
      key: 0,
      id: o.id,
      class: S(["fr-alert", n.value]),
      role: o.alert ? "alert" : void 0
    }, [
      o.small ? y("", !0) : (i(), F(te(o.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: Q(() => [
          M(m(o.title), 1)
        ]),
        _: 1
      })),
      E(o.$slots, "default", {}, () => [
        M(m(o.description), 1)
      ]),
      o.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: o.closeButtonLabel,
        "aria-label": o.closeButtonLabel,
        onClick: l
      }, null, 8, bl)) : y("", !0)
    ], 10, gl));
  }
}), yl = /* @__PURE__ */ B({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(t) {
    return (e, a) => (i(), f("a", {
      class: S(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, m(e.label), 3));
  }
}), kl = ["title"], la = /* @__PURE__ */ B({
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
      class: S(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      c("span", {
        class: S(e.ellipsis ? "fr-ellipsis" : "")
      }, m(e.label), 3)
    ], 10, kl));
  }
}), _l = ["aria-label"], wl = ["aria-expanded", "aria-controls"], xl = ["id"], Dl = { class: "fr-breadcrumb__list" }, Il = ["aria-current"], Tl = /* @__PURE__ */ B({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => U("breadcrumb") },
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
    } = pe(), o = R(!1);
    return ee(o, (s, u) => {
      s !== u && l(s);
    }), (s, u) => {
      const d = se("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": s.navigationLabel
      }, [
        me(c("button", {
          class: "fr-breadcrumb__button",
          "aria-expanded": o.value,
          "aria-controls": s.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => o.value = !o.value)
        }, m(s.showBreadcrumbLabel), 9, wl), [
          [Zt, !o.value]
        ]),
        c("div", {
          id: s.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: S(["fr-collapse", {
            "fr-collapse--expanded": j(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": j(a)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => j(n)(o.value))
        }, [
          c("ol", Dl, [
            (i(!0), f(V, null, z(s.links, (p, v) => (i(), f("li", {
              key: v,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), F(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": v === s.links.length - 1 ? "page" : void 0
              }, {
                default: Q(() => [
                  M(m(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : y("", !0),
              p.to ? y("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": v === s.links.length - 1 ? "page" : void 0
              }, m(p.text), 9, Il))
            ]))), 128))
          ])
        ], 42, xl)
      ], 8, _l);
    };
  }
}), we = /^[a-z0-9]+(-[a-z0-9]+)*$/, He = (t, e, a, r = "") => {
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
    return e && !Ae(d) ? null : d;
  }
  const n = l[0], o = n.split("-");
  if (o.length > 1) {
    const s = {
      provider: r,
      prefix: o.shift(),
      name: o.join("-")
    };
    return e && !Ae(s) ? null : s;
  }
  if (a && r === "") {
    const s = {
      provider: r,
      prefix: "",
      name: n
    };
    return e && !Ae(s, a) ? null : s;
  }
  return null;
}, Ae = (t, e) => t ? !!((t.provider === "" || t.provider.match(we)) && (e && t.prefix === "" || t.prefix.match(we)) && t.name.match(we)) : !1, ra = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), Fe = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), ze = Object.freeze({
  ...ra,
  ...Fe
}), Ze = Object.freeze({
  ...ze,
  body: "",
  hidden: !1
});
function Cl(t, e) {
  const a = {};
  !t.hFlip != !e.hFlip && (a.hFlip = !0), !t.vFlip != !e.vFlip && (a.vFlip = !0);
  const r = ((t.rotate || 0) + (e.rotate || 0)) % 4;
  return r && (a.rotate = r), a;
}
function Bt(t, e) {
  const a = Cl(t, e);
  for (const r in Ze)
    r in Fe ? r in t && !(r in a) && (a[r] = Fe[r]) : r in e ? a[r] = e[r] : r in t && (a[r] = t[r]);
  return a;
}
function Bl(t, e) {
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
function El(t, e, a) {
  const r = t.icons, l = t.aliases || /* @__PURE__ */ Object.create(null);
  let n = {};
  function o(s) {
    n = Bt(
      r[s] || l[s],
      n
    );
  }
  return o(e), a.forEach(o), Bt(t, n);
}
function na(t, e) {
  const a = [];
  if (typeof t != "object" || typeof t.icons != "object")
    return a;
  t.not_found instanceof Array && t.not_found.forEach((l) => {
    e(l, null), a.push(l);
  });
  const r = Bl(t);
  for (const l in r) {
    const n = r[l];
    n && (e(l, El(t, l, n)), a.push(l));
  }
  return a;
}
const Sl = {
  provider: "",
  aliases: {},
  not_found: {},
  ...ra
};
function We(t, e) {
  for (const a in e)
    if (a in t && typeof t[a] != typeof e[a])
      return !1;
  return !0;
}
function oa(t) {
  if (typeof t != "object" || t === null)
    return null;
  const e = t;
  if (typeof e.prefix != "string" || !t.icons || typeof t.icons != "object" || !We(t, Sl))
    return null;
  const a = e.icons;
  for (const l in a) {
    const n = a[l];
    if (!l.match(we) || typeof n.body != "string" || !We(
      n,
      Ze
    ))
      return null;
  }
  const r = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const l in r) {
    const n = r[l], o = n.parent;
    if (!l.match(we) || typeof o != "string" || !a[o] && !r[o] || !We(
      n,
      Ze
    ))
      return null;
  }
  return e;
}
const Et = /* @__PURE__ */ Object.create(null);
function Al(t, e) {
  return {
    provider: t,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function ge(t, e) {
  const a = Et[t] || (Et[t] = /* @__PURE__ */ Object.create(null));
  return a[e] || (a[e] = Al(t, e));
}
function gt(t, e) {
  return oa(e) ? na(e, (a, r) => {
    r ? t.icons[a] = r : t.missing.add(a);
  }) : [];
}
function Ml(t, e, a) {
  try {
    if (typeof a.body == "string")
      return t.icons[e] = { ...a }, !0;
  } catch {
  }
  return !1;
}
let Ie = !1;
function ia(t) {
  return typeof t == "boolean" && (Ie = t), Ie;
}
function Fl(t) {
  const e = typeof t == "string" ? He(t, !0, Ie) : t;
  if (e) {
    const a = ge(e.provider, e.prefix), r = e.name;
    return a.icons[r] || (a.missing.has(r) ? null : void 0);
  }
}
function Ll(t, e) {
  const a = He(t, !0, Ie);
  if (!a)
    return !1;
  const r = ge(a.provider, a.prefix);
  return Ml(r, a.name, e);
}
function Pl(t, e) {
  if (typeof t != "object")
    return !1;
  if (typeof e != "string" && (e = t.provider || ""), Ie && !e && !t.prefix) {
    let l = !1;
    return oa(t) && (t.prefix = "", na(t, (n, o) => {
      o && Ll(n, o) && (l = !0);
    })), l;
  }
  const a = t.prefix;
  if (!Ae({
    provider: e,
    prefix: a,
    name: "a"
  }))
    return !1;
  const r = ge(e, a);
  return !!gt(r, t);
}
const sa = Object.freeze({
  width: null,
  height: null
}), ua = Object.freeze({
  // Dimensions
  ...sa,
  // Transformations
  ...Fe
}), Nl = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Vl = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function St(t, e, a) {
  if (e === 1)
    return t;
  if (a = a || 100, typeof t == "number")
    return Math.ceil(t * e * a) / a;
  if (typeof t != "string")
    return t;
  const r = t.split(Nl);
  if (r === null || !r.length)
    return t;
  const l = [];
  let n = r.shift(), o = Vl.test(n);
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
function jl(t, e = "defs") {
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
function Rl(t, e) {
  return t ? "<defs>" + t + "</defs>" + e : e;
}
function Ol(t, e, a) {
  const r = jl(t);
  return Rl(r.defs, e + r.content + a);
}
const ql = (t) => t === "unset" || t === "undefined" || t === "none";
function Hl(t, e) {
  const a = {
    ...ze,
    ...t
  }, r = {
    ...ua,
    ...e
  }, l = {
    left: a.left,
    top: a.top,
    width: a.width,
    height: a.height
  };
  let n = a.body;
  [a, r].forEach((L) => {
    const b = [], T = L.hFlip, N = L.vFlip;
    let H = L.rotate;
    T ? N ? H += 2 : (b.push(
      "translate(" + (l.width + l.left).toString() + " " + (0 - l.top).toString() + ")"
    ), b.push("scale(-1 1)"), l.top = l.left = 0) : N && (b.push(
      "translate(" + (0 - l.left).toString() + " " + (l.height + l.top).toString() + ")"
    ), b.push("scale(1 -1)"), l.top = l.left = 0);
    let A;
    switch (H < 0 && (H -= Math.floor(H / 4) * 4), H = H % 4, H) {
      case 1:
        A = l.height / 2 + l.top, b.unshift(
          "rotate(90 " + A.toString() + " " + A.toString() + ")"
        );
        break;
      case 2:
        b.unshift(
          "rotate(180 " + (l.width / 2 + l.left).toString() + " " + (l.height / 2 + l.top).toString() + ")"
        );
        break;
      case 3:
        A = l.width / 2 + l.left, b.unshift(
          "rotate(-90 " + A.toString() + " " + A.toString() + ")"
        );
        break;
    }
    H % 2 === 1 && (l.left !== l.top && (A = l.left, l.left = l.top, l.top = A), l.width !== l.height && (A = l.width, l.width = l.height, l.height = A)), b.length && (n = Ol(
      n,
      '<g transform="' + b.join(" ") + '">',
      "</g>"
    ));
  });
  const o = r.width, s = r.height, u = l.width, d = l.height;
  let p, v;
  o === null ? (v = s === null ? "1em" : s === "auto" ? d : s, p = St(v, u / d)) : (p = o === "auto" ? u : o, v = s === null ? St(p, d / u) : s === "auto" ? d : s);
  const _ = {}, D = (L, b) => {
    ql(b) || (_[L] = b.toString());
  };
  D("width", p), D("height", v);
  const x = [l.left, l.top, u, d];
  return _.viewBox = x.join(" "), {
    attributes: _,
    viewBox: x,
    body: n
  };
}
const zl = /\sid="(\S+)"/g, Ql = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let $l = 0;
function Gl(t, e = Ql) {
  const a = [];
  let r;
  for (; r = zl.exec(t); )
    a.push(r[1]);
  if (!a.length)
    return t;
  const l = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return a.forEach((n) => {
    const o = typeof e == "function" ? e(n) : e + ($l++).toString(), s = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
const ht = /* @__PURE__ */ Object.create(null), Be = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], tt = [];
for (; Be.length > 0; )
  Be.length === 1 || Math.random() > 0.5 ? tt.push(Be.shift()) : tt.push(Be.pop());
ht[""] = bt({
  resources: ["https://api.iconify.design"].concat(tt)
});
function Xl(t, e) {
  const a = bt(e);
  return a === null ? !1 : (ht[t] = a, !0);
}
function yt(t) {
  return ht[t];
}
const Wl = () => {
  let t;
  try {
    if (t = fetch, typeof t == "function")
      return t;
  } catch {
  }
};
let At = Wl();
function Ul(t, e) {
  const a = yt(t);
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
const Zl = (t, e, a) => {
  const r = [], l = Ul(t, e), n = "icons";
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
function Jl(t) {
  if (typeof t == "string") {
    const e = yt(t);
    if (e)
      return e.path;
  }
  return "/";
}
const er = (t, e, a) => {
  if (!At) {
    a("abort", 424);
    return;
  }
  let r = Jl(e.provider);
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
  At(t + r).then((n) => {
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
}, tr = {
  prepare: Zl,
  send: er
};
function ar(t) {
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
    const n = l.provider, o = l.prefix, s = l.name, u = a[n] || (a[n] = /* @__PURE__ */ Object.create(null)), d = u[o] || (u[o] = ge(n, o));
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
function da(t, e) {
  t.forEach((a) => {
    const r = a.loaderCallbacks;
    r && (a.loaderCallbacks = r.filter((l) => l.id !== e));
  });
}
function lr(t) {
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
      }), o.pending.length !== s && (a || da([t], n.id), n.callback(
        o.loaded.slice(0),
        o.missing.slice(0),
        o.pending.slice(0),
        n.abort
      ));
    });
  }));
}
let rr = 0;
function nr(t, e, a) {
  const r = rr++, l = da.bind(null, a, r);
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
function or(t, e = !0, a = !1) {
  const r = [];
  return t.forEach((l) => {
    const n = typeof l == "string" ? He(l, e, a) : l;
    n && r.push(n);
  }), r;
}
var ir = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function sr(t, e, a, r) {
  const l = t.resources.length, n = t.random ? Math.floor(Math.random() * l) : t.index;
  let o;
  if (t.random) {
    let w = t.resources.slice(0);
    for (o = []; w.length > 1; ) {
      const P = Math.floor(Math.random() * w.length);
      o.push(w[P]), w = w.slice(0, P).concat(w.slice(P + 1));
    }
    o = o.concat(w);
  } else
    o = t.resources.slice(n).concat(t.resources.slice(0, n));
  const s = Date.now();
  let u = "pending", d = 0, p, v = null, _ = [], D = [];
  typeof r == "function" && D.push(r);
  function x() {
    v && (clearTimeout(v), v = null);
  }
  function L() {
    u === "pending" && (u = "aborted"), x(), _.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), _ = [];
  }
  function b(w, P) {
    P && (D = []), typeof w == "function" && D.push(w);
  }
  function T() {
    return {
      startTime: s,
      payload: e,
      status: u,
      queriesSent: d,
      queriesPending: _.length,
      subscribe: b,
      abort: L
    };
  }
  function N() {
    u = "failed", D.forEach((w) => {
      w(void 0, p);
    });
  }
  function H() {
    _.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), _ = [];
  }
  function A(w, P, C) {
    const $ = P !== "success";
    switch (_ = _.filter((g) => g !== w), u) {
      case "pending":
        break;
      case "failed":
        if ($ || !t.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (P === "abort") {
      p = C, N();
      return;
    }
    if ($) {
      p = C, _.length || (o.length ? q() : N());
      return;
    }
    if (x(), H(), !t.random) {
      const g = t.resources.indexOf(w.resource);
      g !== -1 && g !== t.index && (t.index = g);
    }
    u = "completed", D.forEach((g) => {
      g(C);
    });
  }
  function q() {
    if (u !== "pending")
      return;
    x();
    const w = o.shift();
    if (w === void 0) {
      if (_.length) {
        v = setTimeout(() => {
          x(), u === "pending" && (H(), N());
        }, t.timeout);
        return;
      }
      N();
      return;
    }
    const P = {
      status: "pending",
      resource: w,
      callback: (C, $) => {
        A(P, C, $);
      }
    };
    _.push(P), d++, v = setTimeout(q, t.rotate), a(w, e, P.callback);
  }
  return setTimeout(q), T;
}
function ca(t) {
  const e = {
    ...ir,
    ...t
  };
  let a = [];
  function r() {
    a = a.filter((o) => o().status === "pending");
  }
  function l(o, s, u) {
    const d = sr(
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
function Mt() {
}
const Ue = /* @__PURE__ */ Object.create(null);
function ur(t) {
  if (!Ue[t]) {
    const e = yt(t);
    if (!e)
      return;
    const a = ca(e), r = {
      config: e,
      redundancy: a
    };
    Ue[t] = r;
  }
  return Ue[t];
}
function dr(t, e, a) {
  let r, l;
  if (typeof t == "string") {
    const n = et(t);
    if (!n)
      return a(void 0, 424), Mt;
    l = n.send;
    const o = ur(t);
    o && (r = o.redundancy);
  } else {
    const n = bt(t);
    if (n) {
      r = ca(n);
      const o = t.resources ? t.resources[0] : "", s = et(o);
      s && (l = s.send);
    }
  }
  return !r || !l ? (a(void 0, 424), Mt) : r.query(e, l, a)().abort;
}
const Ft = "iconify2", Te = "iconify", fa = Te + "-count", Lt = Te + "-version", pa = 36e5, cr = 168, fr = 50;
function at(t, e) {
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
function Pt(t, e) {
  try {
    t.removeItem(e);
  } catch {
  }
}
function lt(t, e) {
  return kt(t, fa, e.toString());
}
function rt(t) {
  return parseInt(at(t, fa)) || 0;
}
const Qe = {
  local: !0,
  session: !0
}, va = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let _t = !1;
function pr(t) {
  _t = t;
}
let Ee = typeof window > "u" ? {} : window;
function ma(t) {
  const e = t + "Storage";
  try {
    if (Ee && Ee[e] && typeof Ee[e].length == "number")
      return Ee[e];
  } catch {
  }
  Qe[t] = !1;
}
function ga(t, e) {
  const a = ma(t);
  if (!a)
    return;
  const r = at(a, Lt);
  if (r !== Ft) {
    if (r) {
      const s = rt(a);
      for (let u = 0; u < s; u++)
        Pt(a, Te + u.toString());
    }
    kt(a, Lt, Ft), lt(a, 0);
    return;
  }
  const l = Math.floor(Date.now() / pa) - cr, n = (s) => {
    const u = Te + s.toString(), d = at(a, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > l && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        e(p, s))
          return !0;
      } catch {
      }
      Pt(a, u);
    }
  };
  let o = rt(a);
  for (let s = o - 1; s >= 0; s--)
    n(s) || (s === o - 1 ? (o--, lt(a, o)) : va[t].add(s));
}
function ba() {
  if (!_t) {
    pr(!0);
    for (const t in Qe)
      ga(t, (e) => {
        const a = e.data, r = e.provider, l = a.prefix, n = ge(
          r,
          l
        );
        if (!gt(n, a).length)
          return !1;
        const o = a.lastModified || -1;
        return n.lastModifiedCached = n.lastModifiedCached ? Math.min(n.lastModifiedCached, o) : o, !0;
      });
  }
}
function vr(t, e) {
  const a = t.lastModifiedCached;
  if (
    // Matches or newer
    a && a >= e
  )
    return a === e;
  if (t.lastModifiedCached = e, a)
    for (const r in Qe)
      ga(r, (l) => {
        const n = l.data;
        return l.provider !== t.provider || n.prefix !== t.prefix || n.lastModified === e;
      });
  return !0;
}
function mr(t, e) {
  _t || ba();
  function a(r) {
    let l;
    if (!Qe[r] || !(l = ma(r)))
      return;
    const n = va[r];
    let o;
    if (n.size)
      n.delete(o = Array.from(n).shift());
    else if (o = rt(l), o >= fr || !lt(l, o + 1))
      return;
    const s = {
      cached: Math.floor(Date.now() / pa),
      provider: t.provider,
      data: e
    };
    return kt(
      l,
      Te + o.toString(),
      JSON.stringify(s)
    );
  }
  e.lastModified && !vr(t, e.lastModified) || Object.keys(e.icons).length && (e.not_found && (e = Object.assign({}, e), delete e.not_found), a("local") || a("session"));
}
function Nt() {
}
function gr(t) {
  t.iconsLoaderFlag || (t.iconsLoaderFlag = !0, setTimeout(() => {
    t.iconsLoaderFlag = !1, lr(t);
  }));
}
function br(t, e) {
  t.iconsToLoad ? t.iconsToLoad = t.iconsToLoad.concat(e).sort() : t.iconsToLoad = e, t.iconsQueueFlag || (t.iconsQueueFlag = !0, setTimeout(() => {
    t.iconsQueueFlag = !1;
    const { provider: a, prefix: r } = t, l = t.iconsToLoad;
    delete t.iconsToLoad;
    let n;
    !l || !(n = et(a)) || n.prepare(a, r, l).forEach((o) => {
      dr(a, o, (s) => {
        if (typeof s != "object")
          o.icons.forEach((u) => {
            t.missing.add(u);
          });
        else
          try {
            const u = gt(
              t,
              s
            );
            if (!u.length)
              return;
            const d = t.pendingIcons;
            d && u.forEach((p) => {
              d.delete(p);
            }), mr(t, s);
          } catch (u) {
            console.error(u);
          }
        gr(t);
      });
    });
  }));
}
const hr = (t, e) => {
  const a = or(t, !0, ia()), r = ar(a);
  if (!r.pending.length) {
    let u = !0;
    return e && setTimeout(() => {
      u && e(
        r.loaded,
        r.missing,
        r.pending,
        Nt
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
    o = d, s = p, n.push(ge(d, p));
    const v = l[d] || (l[d] = /* @__PURE__ */ Object.create(null));
    v[p] || (v[p] = []);
  }), r.pending.forEach((u) => {
    const { provider: d, prefix: p, name: v } = u, _ = ge(d, p), D = _.pendingIcons || (_.pendingIcons = /* @__PURE__ */ new Set());
    D.has(v) || (D.add(v), l[d][p].push(v));
  }), n.forEach((u) => {
    const { provider: d, prefix: p } = u;
    l[d][p].length && br(u, l[d][p]);
  }), e ? nr(e, r, n) : Nt;
};
function yr(t, e) {
  const a = {
    ...t
  };
  for (const r in e) {
    const l = e[r], n = typeof l;
    r in sa ? (l === null || l && (n === "string" || n === "number")) && (a[r] = l) : n === typeof a[r] && (a[r] = r === "rotate" ? l % 4 : l);
  }
  return a;
}
const kr = /[\s,]+/;
function _r(t, e) {
  e.split(kr).forEach((a) => {
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
function wr(t, e = 0) {
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
function xr(t, e) {
  let a = t.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const r in e)
    a += " " + r + '="' + e[r] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + a + ">" + t + "</svg>";
}
function Dr(t) {
  return t.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function Ir(t) {
  return "data:image/svg+xml," + Dr(t);
}
function Tr(t) {
  return 'url("' + Ir(t) + '")';
}
const Vt = {
  ...ua,
  inline: !1
}, Cr = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Br = {
  display: "inline-block"
}, nt = {
  backgroundColor: "currentColor"
}, ha = {
  backgroundColor: "transparent"
}, jt = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Rt = {
  webkitMask: nt,
  mask: nt,
  background: ha
};
for (const t in Rt) {
  const e = Rt[t];
  for (const a in jt)
    e[t + a] = jt[a];
}
const Me = {};
["horizontal", "vertical"].forEach((t) => {
  const e = t.slice(0, 1) + "Flip";
  Me[t + "-flip"] = e, Me[t.slice(0, 1) + "-flip"] = e, Me[t + "Flip"] = e;
});
function Ot(t) {
  return t + (t.match(/^[-0-9.]+$/) ? "px" : "");
}
const qt = (t, e) => {
  const a = yr(Vt, e), r = { ...Cr }, l = e.mode || "svg", n = {}, o = e.style, s = typeof o == "object" && !(o instanceof Array) ? o : {};
  for (let L in e) {
    const b = e[L];
    if (b !== void 0)
      switch (L) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          a[L] = b === !0 || b === "true" || b === 1;
          break;
        case "flip":
          typeof b == "string" && _r(a, b);
          break;
        case "color":
          n.color = b;
          break;
        case "rotate":
          typeof b == "string" ? a[L] = wr(b) : typeof b == "number" && (a[L] = b);
          break;
        case "ariaHidden":
        case "aria-hidden":
          b !== !0 && b !== "true" && delete r["aria-hidden"];
          break;
        default: {
          const T = Me[L];
          T ? (b === !0 || b === "true" || b === 1) && (a[T] = !0) : Vt[L] === void 0 && (r[L] = b);
        }
      }
  }
  const u = Hl(t, a), d = u.attributes;
  if (a.inline && (n.verticalAlign = "-0.125em"), l === "svg") {
    r.style = {
      ...n,
      ...s
    }, Object.assign(r, d);
    let L = 0, b = e.id;
    return typeof b == "string" && (b = b.replace(/-/g, "_")), r.innerHTML = Gl(u.body, b ? () => b + "ID" + L++ : "iconifyVue"), Tt("svg", r);
  }
  const { body: p, width: v, height: _ } = t, D = l === "mask" || (l === "bg" ? !1 : p.indexOf("currentColor") !== -1), x = xr(p, {
    ...d,
    width: v + "",
    height: _ + ""
  });
  return r.style = {
    ...n,
    "--svg": Tr(x),
    width: Ot(d.width),
    height: Ot(d.height),
    ...Br,
    ...D ? nt : ha,
    ...s
  }, Tt("span", r);
};
ia(!0);
Kl("", tr);
if (typeof document < "u" && typeof window < "u") {
  ba();
  const t = window;
  if (t.IconifyPreload !== void 0) {
    const e = t.IconifyPreload, a = "Invalid IconifyPreload syntax.";
    typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach((r) => {
      try {
        (typeof r != "object" || r === null || r instanceof Array || // Check for 'icons' and 'prefix'
        typeof r.icons != "object" || typeof r.prefix != "string" || // Add icon set
        !Pl(r)) && console.error(a);
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
const Er = {
  ...ze,
  body: ""
}, Sr = B({
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
      const r = Fl(a);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== t) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: t,
          abort: hr([a], () => {
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
      return qt(Er, t);
    let a = t;
    return e.classes && (a = {
      ...t,
      class: (typeof t.class == "string" ? t.class + " " : "") + e.classes.join(" ")
    }), qt({
      ...ze,
      ...e.data
    }, a);
  }
}), Ar = /* @__PURE__ */ B({
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
    ea((u) => ({
      "98d5b8bc": s.value
    }));
    const e = t, a = R(null), r = k(() => `${+e.scale * 1.2}rem`), l = k(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    ee(() => e.title, n);
    async function n() {
      var u, d, p, v;
      if (!((u = a.value) != null && u.$el))
        return;
      const _ = !!((d = a.value) == null ? void 0 : d.$el).querySelector("title"), D = document.createElement("title");
      if (!e.title) {
        D.remove();
        return;
      }
      D.innerHTML = e.title, await ta(), _ || (v = ((p = a.value) == null ? void 0 : p.$el).firstChild) == null || v.before(D);
    }
    oe(n);
    const o = k(() => {
      var u;
      return (u = e.name) != null && u.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), s = k(() => e.color ?? e.fill ?? "inherit");
    return (u, d) => (i(), F(j(Sr), {
      ref_key: "icon",
      ref: a,
      icon: o.value,
      style: ue({ fontSize: r.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: S(["vicon", {
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
}, ae = /* @__PURE__ */ le(Ar, [["__scopeId", "data-v-33ecc4e5"]]), Mr = ["title", "disabled", "aria-disabled"], Fr = { key: 1 }, Lr = /* @__PURE__ */ B({
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
    const a = t, r = k(() => ["sm", "small"].includes(a.size)), l = k(() => ["md", "medium"].includes(a.size)), n = k(() => ["lg", "large"].includes(a.size)), o = R(null);
    e({ focus: () => {
      var p;
      (p = o.value) == null || p.focus();
    } });
    const s = k(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), u = k(() => a.iconOnly ? 1.25 : 0.8325), d = k(
      () => typeof a.icon == "string" ? { scale: u.value, name: a.icon } : { scale: u.value, ...a.icon }
    );
    return (p, v) => (i(), f("button", {
      ref_key: "btn",
      ref: o,
      class: S(["fr-btn", {
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
      style: ue(!s.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: v[0] || (v[0] = (_) => p.onClick ? p.onClick(_) : () => {
      })
    }, [
      p.icon && !s.value ? (i(), F(ae, ie(O({ key: 0 }, d.value)), null, 16)) : y("", !0),
      p.iconOnly ? y("", !0) : (i(), f("span", Fr, [
        M(m(p.label) + " ", 1),
        E(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Mr));
  }
}), Ce = /* @__PURE__ */ le(Lr, [["__scopeId", "data-v-77b13897"]]), $e = /* @__PURE__ */ B({
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
    const e = t, a = R(null), r = k(() => ["sm", "small"].includes(e.size)), l = k(() => ["md", "medium"].includes(e.size)), n = k(() => ["lg", "large"].includes(e.size)), o = k(() => ["always", "", !0].includes(e.inlineLayoutWhen)), s = k(() => ["sm", "small"].includes(e.inlineLayoutWhen)), u = k(() => ["md", "medium"].includes(e.inlineLayoutWhen)), d = k(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = k(() => e.align === "center"), v = k(() => e.align === "right"), _ = R("auto"), D = k(() => `--equisized-width: ${_.value};`), x = async () => {
      var L;
      let b = 0;
      await new Promise((T) => setTimeout(T, 100)), (L = a.value) == null || L.querySelectorAll(".fr-btn").forEach((T) => {
        const N = T, H = N.offsetWidth, A = window.getComputedStyle(N), q = +A.marginLeft.replace("px", ""), w = +A.marginRight.replace("px", "");
        N.style.width = "var(--equisized-width)";
        const P = H + q + w;
        P > b && (b = P);
      }), _.value = `${b}px`;
    };
    return oe(async () => {
      !a.value || !e.equisized || await x();
    }), (L, b) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: a,
      style: ue(D.value),
      class: S(["fr-btns-group", {
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
      (i(!0), f(V, null, z(L.buttons, ({ onClick: T, ...N }, H) => (i(), f("li", { key: H }, [
        G(Ce, O({ ref_for: !0 }, N, { onClick: T }), null, 16, ["onClick"])
      ]))), 128)),
      E(L.$slots, "default")
    ], 6));
  }
}), Pr = { class: "fr-callout__text" }, Nr = /* @__PURE__ */ B({
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
    const e = t, a = k(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), r = k(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : { ...e.icon ?? {} });
    return (l, n) => (i(), f("div", {
      class: S(["fr-callout", { [String(l.icon)]: a.value }])
    }, [
      l.icon && r.value ? (i(), F(ae, ie(O({ key: 0 }, r.value)), null, 16)) : y("", !0),
      l.title ? (i(), F(te(l.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: Q(() => [
          M(m(l.title), 1)
        ]),
        _: 1
      })) : y("", !0),
      c("p", Pr, m(l.content), 1),
      l.button ? (i(), F(Ce, ie(O({ key: 2 }, l.button)), null, 16)) : y("", !0),
      E(l.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Vr = /* @__PURE__ */ le(Nr, [["__scopeId", "data-v-a34b4ad8"]]), ot = /* @__PURE__ */ B({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(t) {
    const e = t, a = k(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), r = k(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, n) => (i(), f("p", {
      class: S(["fr-card__detail", a.value ? { [String(l.icon)]: a.value } : {}])
    }, [
      l.icon && !a.value ? (i(), F(ae, ie(O({ key: 0 }, r.value)), null, 16)) : y("", !0),
      E(l.$slots, "default")
    ], 2));
  }
}), jr = { class: "fr-card__body" }, Rr = { class: "fr-card__content" }, Or = ["href"], qr = { class: "fr-card__desc" }, Hr = {
  key: 0,
  class: "fr-card__start"
}, zr = {
  key: 1,
  class: "fr-card__end"
}, Qr = {
  key: 0,
  class: "fr-card__footer"
}, $r = {
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
}, Yr = /* @__PURE__ */ B({
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
    const a = t, r = k(() => ["sm", "small"].includes(a.size)), l = k(() => ["lg", "large"].includes(a.size)), n = k(() => ["sm", "small"].includes(a.imgRatio)), o = k(() => ["lg", "large"].includes(a.imgRatio)), s = k(() => typeof a.link == "string" && a.link.startsWith("http")), u = R(null);
    return e({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const v = se("RouterLink");
      return i(), f("div", {
        class: S(["fr-card", {
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
        c("div", jr, [
          c("div", Rr, [
            (i(), F(te(d.titleTag), { class: "fr-card__title" }, {
              default: Q(() => [
                s.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, m(d.title), 9, Or)) : d.link ? (i(), F(v, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (_) => _.stopPropagation())
                }, {
                  default: Q(() => [
                    M(m(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(V, { key: 2 }, [
                  M(m(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", qr, m(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Hr, [
              E(d.$slots, "start-details"),
              d.detail ? (i(), F(ot, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: Q(() => [
                  M(m(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : y("", !0)
            ])) : y("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", zr, [
              E(d.$slots, "end-details"),
              d.endDetail ? (i(), F(ot, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: Q(() => [
                  M(m(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : y("", !0)
            ])) : y("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", Qr, [
            d.buttons.length ? (i(), F($e, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : y("", !0),
            d.linksGroup.length ? (i(), f("ul", $r, [
              (i(!0), f(V, null, z(d.linksGroup, (_, D) => (i(), f("li", {
                key: `card-link-${D}`
              }, [
                _.to ? (i(), F(v, {
                  key: 0,
                  to: _.to
                }, {
                  default: Q(() => [
                    M(m(_.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: _.link || _.href,
                  class: S(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": r.value,
                    "fr-link--lg": l.value
                  }])
                }, m(_.label), 11, Gr))
              ]))), 128))
            ])) : y("", !0)
          ])) : y("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", Kr, [
          d.imgSrc ? (i(), f("div", Xr, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, Wr)
          ])) : y("", !0),
          d.badges.length ? (i(), f("ul", Ur, [
            (i(!0), f(V, null, z(d.badges, (_, D) => (i(), f("li", { key: D }, [
              G(la, O({ ref_for: !0 }, _), null, 16)
            ]))), 128))
          ])) : y("", !0)
        ])) : y("", !0)
      ], 2);
    };
  }
}), Zr = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], Jr = ["for"], en = {
  key: 0,
  class: "required"
}, tn = {
  key: 0,
  class: "fr-hint-text"
}, an = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, wt = /* @__PURE__ */ B({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ De({
    id: { default: () => U("basic", "checkbox") },
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
    const e = t, a = k(() => e.errorMessage || e.validMessage), r = k(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = ce(t, "modelValue");
    return (n, o) => (i(), f("div", {
      class: S(["fr-fieldset__element", { "fr-fieldset__element--inline": n.inline }])
    }, [
      c("div", {
        class: S(["fr-checkbox-group", {
          "fr-checkbox-group--error": n.errorMessage,
          "fr-checkbox-group--valid": !n.errorMessage && n.validMessage,
          "fr-checkbox-group--sm": n.small
        }])
      }, [
        me(c("input", O({
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
        }), null, 16, Zr), [
          [ct, l.value]
        ]),
        c("label", {
          for: n.id,
          class: "fr-label"
        }, [
          E(n.$slots, "label", {}, () => [
            M(m(n.label) + " ", 1),
            E(n.$slots, "required-tip", {}, () => [
              n.required ? (i(), f("span", en, " *")) : y("", !0)
            ])
          ]),
          n.hint ? (i(), f("span", tn, m(n.hint), 1)) : y("", !0)
        ], 8, Jr),
        a.value ? (i(), f("div", an, [
          c("p", {
            class: S(["fr-message--info flex items-center", r.value])
          }, m(a.value), 3)
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), ln = { class: "fr-form-group" }, rn = ["disabled", "aria-labelledby", "aria-invalid", "role"], nn = ["id"], on = {
  key: 0,
  class: "required"
}, sn = ["id"], un = /* @__PURE__ */ B({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ De({
    titleId: { default: () => U("checkbox", "group") },
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
    const e = t, a = k(() => e.errorMessage || e.validMessage), r = k(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = k(() => a.value ? `${e.titleId} messages-${e.titleId}` : e.titleId), n = ce(t, "modelValue");
    return (o, s) => (i(), f("div", ln, [
      c("fieldset", {
        class: S(["fr-fieldset", {
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
          E(o.$slots, "legend", {}, () => [
            M(m(o.legend) + " ", 1),
            E(o.$slots, "required-tip", {}, () => [
              o.required ? (i(), f("span", on, " *")) : y("", !0)
            ])
          ])
        ], 8, nn),
        E(o.$slots, "default", {}, () => [
          (i(!0), f(V, null, z(o.options, (u) => (i(), F(wt, {
            id: u.id,
            key: u.id || u.name,
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (d) => n.value = d),
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
          c("p", {
            class: S(["fr-message--info flex items-center", r.value])
          }, [
            c("span", null, m(a.value), 1)
          ], 2)
        ], 8, sn)) : y("", !0)
      ], 10, rn)
    ]));
  }
}), dn = { class: "fr-consent-banner__content" }, cn = { class: "fr-text--sm" }, fn = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, pn = /* @__PURE__ */ B({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(t) {
    const e = t, a = k(() => typeof e.url == "string" && e.url.startsWith("http")), r = k(() => e.url ? a.value ? "a" : "RouterLink" : "a"), l = k(() => ({ [a.value ? "href" : "to"]: e.url }));
    return (n, o) => (i(), f(V, null, [
      c("div", dn, [
        c("p", cn, [
          E(n.$slots, "default", {}, () => [
            o[4] || (o[4] = M(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), F(te(r.value), O(l.value, { "data-testid": "link" }), {
              default: Q(() => o[3] || (o[3] = [
                M(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            o[5] || (o[5] = M(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", fn, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: o[0] || (o[0] = W((s) => n.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: o[1] || (o[1] = W((s) => n.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: o[2] || (o[2] = W((s) => n.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), vn = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, mn = { class: "fr-pagination__list" }, gn = ["href", "title", "disabled", "aria-disabled"], bn = ["href", "title", "disabled", "aria-disabled"], hn = ["href", "title", "aria-current", "onClick"], yn = { key: 0 }, kn = { key: 1 }, _n = ["href", "title", "disabled", "aria-disabled"], wn = ["href", "title", "disabled", "aria-disabled"], xn = /* @__PURE__ */ B({
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
    const a = t, r = e, l = k(() => Math.min(a.pages.length - 1 - a.truncLimit, Math.max(a.currentPage - (a.truncLimit - a.truncLimit % 2) / 2, 0))), n = k(() => Math.min(a.pages.length - 1, l.value + a.truncLimit)), o = k(() => a.pages.length > a.truncLimit ? a.pages.slice(l.value, n.value + 1) : a.pages), s = (x) => r("update:current-page", x), u = (x) => s(x), d = () => u(0), p = () => u(Math.max(0, a.currentPage - 1)), v = () => u(Math.min(a.pages.length - 1, a.currentPage + 1)), _ = () => u(a.pages.length - 1), D = (x) => a.pages.indexOf(x) === a.currentPage;
    return (x, L) => {
      var b, T, N, H;
      return i(), f("nav", vn, [
        c("ul", mn, [
          c("li", null, [
            c("a", {
              href: (b = x.pages[0]) == null ? void 0 : b.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: x.firstPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: L[0] || (L[0] = W((A) => d(), ["prevent"]))
            }, null, 8, gn)
          ]),
          c("li", null, [
            c("a", {
              href: (T = x.pages[Math.max(x.currentPage - 1, 0)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: x.prevPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: L[1] || (L[1] = W((A) => p(), ["prevent"]))
            }, m(x.prevPageTitle), 9, bn)
          ]),
          (i(!0), f(V, null, z(o.value, (A, q) => (i(), f("li", { key: q }, [
            c("a", {
              href: A == null ? void 0 : A.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: A.title,
              "aria-current": D(A) ? "page" : void 0,
              onClick: W((w) => u(x.pages.indexOf(A)), ["prevent"])
            }, [
              o.value.indexOf(A) === 0 && l.value > 0 ? (i(), f("span", yn, "...")) : y("", !0),
              M(" " + m(A.label) + " ", 1),
              o.value.indexOf(A) === o.value.length - 1 && n.value < x.pages.length - 1 ? (i(), f("span", kn, "...")) : y("", !0)
            ], 8, hn)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (N = x.pages[Math.min(x.currentPage + 1, x.pages.length - 1)]) == null ? void 0 : N.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: x.nextPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: L[2] || (L[2] = W((A) => v(), ["prevent"]))
            }, m(x.nextPageTitle), 9, _n)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (H = x.pages.at(-1)) == null ? void 0 : H.href,
              title: x.lastPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: L[3] || (L[3] = W((A) => _(), ["prevent"]))
            }, null, 8, wn)
          ])
        ])
      ]);
    };
  }
}), ya = /* @__PURE__ */ le(xn, [["__scopeId", "data-v-4dfa8248"]]), Dn = { class: "fr-table" }, In = { class: "fr-table__wrapper" }, Tn = { class: "fr-table__container" }, Cn = { class: "fr-table__content" }, Bn = ["id"], En = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Sn = { class: "fr-checkbox-group fr-checkbox-group--sm" }, An = ["id", "checked"], Mn = ["for"], Fn = ["tabindex", "onClick", "onKeydown"], Ln = { key: 0 }, Pn = { key: 1 }, Nn = ["data-row-key"], Vn = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, jn = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Rn = ["id", "value"], On = ["for"], qn = ["onKeydown"], Hn = { class: "flex gap-2 items-center" }, zn = ["selected"], Qn = ["value", "selected"], $n = { class: "flex ml-1" }, Gn = { class: "self-center" }, Kn = /* @__PURE__ */ B({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ De({
    id: { default: () => U("table") },
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
    const a = t, r = e, l = ce(t, "selection"), n = ce(t, "rowsPerPage"), o = ce(t, "currentPage"), s = k(() => Math.ceil(a.rows.length / n.value)), u = k(() => a.pages ?? Array.from({ length: s.value }).map((w, P) => ({ label: `${P + 1}`, title: `Page ${P + 1}`, href: `#${P + 1}` }))), d = k(() => o.value * n.value), p = k(() => (o.value + 1) * n.value);
    function v(w, P) {
      const C = a.sorted;
      return (w[C] ?? w) < (P[C] ?? P) ? -1 : (w[C] ?? w) > (P[C] ?? P) ? 1 : 0;
    }
    const _ = ce(t, "sortedBy"), D = ce(t, "sortedDesc");
    function x(w) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(w))) {
        if (_.value === w) {
          if (D.value) {
            _.value = void 0, D.value = !1;
            return;
          }
          D.value = !0;
          return;
        }
        D.value = !1, _.value = w;
      }
    }
    const L = k(() => {
      const w = _.value ? a.rows.slice().sort(a.sortFn ?? v) : a.rows.slice();
      return D.value && w.reverse(), w;
    }), b = k(() => {
      const w = a.headersRow.map((C) => typeof C != "object" ? C : C.key), P = L.value.map((C) => Array.isArray(C) ? C : w.map(($) => typeof C != "object" ? C : C[$] ?? C));
      return a.pagination ? P.slice(d.value, p.value) : P;
    });
    function T(w) {
      if (w) {
        const P = a.headersRow.findIndex((C) => C.key ?? C);
        l.value = b.value.map((C) => C[P]);
      }
      l.value.length = 0;
    }
    const N = R(!1);
    function H() {
      N.value = l.value.length === b.value.length;
    }
    function A() {
      r("update:current-page", 0), N.value = !1, l.value.length = 0;
    }
    function q(w) {
      navigator.clipboard.writeText(w);
    }
    return (w, P) => (i(), f("div", Dn, [
      c("div", In, [
        c("div", Tn, [
          c("div", Cn, [
            c("table", { id: w.id }, [
              c("caption", null, m(w.title), 1),
              c("thead", null, [
                c("tr", null, [
                  w.selectableRows ? (i(), f("th", En, [
                    c("div", Sn, [
                      c("input", {
                        id: `table-select--${w.id}-all`,
                        checked: N.value,
                        type: "checkbox",
                        onInput: P[0] || (P[0] = (C) => T(C.target.checked))
                      }, null, 40, An),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${w.id}-all`
                      }, " Sélectionner tout ", 8, Mn)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(V, null, z(w.headersRow, (C, $) => (i(), f("th", O({
                    key: typeof C == "object" ? C.key : C,
                    scope: "col",
                    ref_for: !0
                  }, typeof C == "object" && C.headerAttrs, {
                    tabindex: w.sortableRows ? 0 : void 0,
                    onClick: (g) => x(C.key ?? (Array.isArray(w.rows[0]) ? $ : C)),
                    onKeydown: [
                      re((g) => x(C.key ?? C), ["enter"]),
                      re((g) => x(C.key ?? C), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: S({ "sortable-header": w.sortableRows === !0 || Array.isArray(w.sortableRows) && w.sortableRows.includes(C.key ?? C) })
                    }, [
                      E(w.$slots, "header", O({ ref_for: !0 }, typeof C == "object" ? C : { key: C, label: C }), () => [
                        M(m(typeof C == "object" ? C.label : C), 1)
                      ], !0),
                      _.value !== (C.key ?? C) && (w.sortableRows === !0 || Array.isArray(w.sortableRows) && w.sortableRows.includes(C.key ?? C)) ? (i(), f("span", Ln, [
                        G(ae, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : _.value === (C.key ?? C) ? (i(), f("span", Pn, [
                        G(ae, {
                          name: D.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : y("", !0)
                    ], 2)
                  ], 16, Fn))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(V, null, z(b.value, (C, $) => (i(), f("tr", {
                  key: `row-${$}`,
                  "data-row-key": $ + 1
                }, [
                  w.selectableRows ? (i(), f("th", Vn, [
                    c("div", jn, [
                      me(c("input", {
                        id: `row-select-${w.id}-${$}`,
                        "onUpdate:modelValue": P[1] || (P[1] = (g) => l.value = g),
                        value: w.rows[$][w.rowKey] ?? `row-${$}`,
                        type: "checkbox",
                        onChange: P[2] || (P[2] = (g) => H())
                      }, null, 40, Rn), [
                        [ct, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${w.id}-${$}`
                      }, " Sélectionner la ligne " + m($ + 1), 9, On)
                    ])
                  ])) : y("", !0),
                  (i(!0), f(V, null, z(C, (g, h) => (i(), f("td", {
                    key: typeof g == "object" ? g[w.rowKey] : g,
                    tabindex: "0",
                    onKeydown: [
                      re(W((I) => q(typeof g == "object" ? g[w.rowKey] : g), ["ctrl"]), ["c"]),
                      re(W((I) => q(typeof g == "object" ? g[w.rowKey] : g), ["meta"]), ["c"])
                    ]
                  }, [
                    E(w.$slots, "cell", O({ ref_for: !0 }, {
                      colKey: typeof w.headersRow[h] == "object" ? w.headersRow[h].key : w.headersRow[h],
                      cell: g
                    }), () => [
                      M(m(typeof g == "object" ? g[w.rowKey] : g), 1)
                    ], !0)
                  ], 40, qn))), 128))
                ], 8, Nn))), 128))
              ])
            ], 8, Bn)
          ])
        ])
      ]),
      c("div", {
        class: S(w.bottomActionBarClass)
      }, [
        E(w.$slots, "pagination", {}, () => [
          w.pagination && !w.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: S(["flex justify-between items-center", w.paginationWrapperClass])
          }, [
            c("div", Hn, [
              P[6] || (P[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              me(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": P[3] || (P[3] = (C) => n.value = C),
                class: "fr-select",
                onChange: P[4] || (P[4] = (C) => A())
              }, [
                c("option", {
                  value: "",
                  selected: !w.paginationOptions.includes(n.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, zn),
                (i(!0), f(V, null, z(w.paginationOptions, (C, $) => (i(), f("option", {
                  key: $,
                  value: C,
                  selected: +C === n.value
                }, m(C), 9, Qn))), 128))
              ], 544), [
                [aa, n.value]
              ])
            ]),
            c("div", $n, [
              c("span", Gn, "Page " + m(o.value + 1) + " sur " + m(s.value), 1)
            ]),
            G(ya, {
              "current-page": o.value,
              "onUpdate:currentPage": P[5] || (P[5] = (C) => o.value = C),
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : y("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Xn = /* @__PURE__ */ le(Kn, [["__scopeId", "data-v-1d55e1f1"]]), Wn = "data:image/png;base64,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", Un = { class: "fr-container flex" }, Yn = { class: "half" }, Zn = { class: "fr-h1" }, Jn = { class: "flex fr-my-md-3w" }, eo = { class: "fr-h6" }, to = /* @__PURE__ */ B({
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
          c("h1", Zn, m(e.title), 1),
          c("span", Jn, m(e.subtitle), 1),
          c("p", eo, m(e.description), 1),
          c("p", null, m(e.help), 1),
          (r = e.buttons) != null && r.length ? (i(), F($e, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : y("", !0),
          E(e.$slots, "default", {}, void 0, !0)
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
}), ao = /* @__PURE__ */ le(to, [["__scopeId", "data-v-0f6cf5b4"]]), lo = { class: "fr-fieldset" }, ro = ["id"], no = {
  key: 1,
  class: "fr-fieldset__element"
}, oo = { class: "fr-fieldset__element" }, io = /* @__PURE__ */ B({
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
      return i(), f("fieldset", lo, [
        e.legend || (l = (r = e.$slots).legend) != null && l.call(r).length ? (i(), f("legend", {
          key: 0,
          id: e.legendId,
          class: S(["fr-fieldset__legend", e.legendClass])
        }, [
          M(m(e.legend) + " ", 1),
          E(e.$slots, "legend")
        ], 10, ro)) : y("", !0),
        e.hint || (o = (n = e.$slots).hint) != null && o.call(n).length ? (i(), f("div", no, [
          c("span", {
            class: S(["fr-hint-text", e.hintClass])
          }, [
            M(m(e.hint) + " ", 1),
            E(e.$slots, "hint")
          ], 2)
        ])) : y("", !0),
        c("div", oo, [
          E(e.$slots, "default")
        ])
      ]);
    };
  }
}), so = ["href", "download"], uo = { class: "fr-link__detail" }, ka = /* @__PURE__ */ B({
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
      c("span", uo, m(e.format) + " – " + m(e.size), 1)
    ], 8, so));
  }
}), co = { class: "fr-downloads-group fr-downloads-group--bordered" }, fo = {
  key: 0,
  class: "fr-downloads-group__title"
}, po = /* @__PURE__ */ B({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", co, [
      e.title ? (i(), f("h4", fo, m(e.title), 1)) : y("", !0),
      c("ul", null, [
        (i(!0), f(V, null, z(e.files, (r, l) => (i(), f("li", { key: l }, [
          G(ka, {
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
}), vo = ["for"], mo = {
  key: 0,
  class: "required"
}, go = {
  key: 1,
  class: "fr-hint-text"
}, bo = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], ho = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, yo = ["id"], ko = /* @__PURE__ */ B({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => U("file-upload") },
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
    }, n = k(() => Array.isArray(a.accept) ? a.accept.join(",") : a.accept);
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
        M(m(o.label) + " ", 1),
        "required" in o.$attrs && o.$attrs.required !== !1 ? (i(), f("span", mo, " *")) : y("", !0),
        o.hint ? (i(), f("span", go, m(o.hint), 1)) : y("", !0)
      ], 8, vo),
      c("input", O({
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
      }), null, 16, bo),
      o.error || o.validMessage ? (i(), f("div", ho, [
        o.error ? (i(), f("p", {
          key: 0,
          id: `${o.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, m(o.error ?? o.validMessage), 9, yo)) : y("", !0)
      ])) : y("", !0)
    ], 2));
  }
}), _o = { class: "fr-follow__newsletter" }, wo = { class: "fr-h5 fr-follow__title" }, xo = { class: "fr-text--sm fr-follow__desc" }, Do = { key: 0 }, Io = ["title"], To = { key: 1 }, Co = { action: "" }, Bo = {
  class: "fr-label",
  for: "newsletter-email"
}, Eo = { class: "fr-input-wrap fr-input-wrap--addon" }, So = ["title", "placeholder", "value"], Ao = ["title"], Mo = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Fo = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Lo = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, _a = /* @__PURE__ */ B({
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
    return (l, n) => (i(), f("div", _o, [
      c("div", null, [
        c("h3", wo, m(l.title), 1),
        c("p", xo, m(l.description), 1)
      ]),
      l.onlyCallout ? (i(), f("div", Do, [
        c("button", {
          class: "fr-btn",
          title: l.buttonTitle,
          onClick: n[0] || (n[0] = (o) => l.buttonAction ? l.buttonAction(o) : () => {
          })
        }, m(l.buttonText), 9, Io)
      ])) : (i(), f("div", To, [
        c("form", Co, [
          c("label", Bo, m(l.labelEmail), 1),
          c("div", Eo, [
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
            }, null, 40, So),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: l.buttonTitle,
              type: "submit"
            }, m(l.buttonText), 9, Ao)
          ]),
          l.error ? (i(), f("div", Mo, [
            c("p", Fo, m(l.error), 1)
          ])) : y("", !0),
          c("p", Lo, m(l.hintText), 1)
        ])
      ]))
    ]));
  }
}), Po = { class: "fr-follow__social" }, No = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Vo = ["title", "href"], wa = /* @__PURE__ */ B({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Po, [
      (i(), F(te(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: Q(() => a[0] || (a[0] = [
          M(" Suivez-nous "),
          c("br", null, null, -1),
          M(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (i(), f("ul", No, [
        (i(!0), f(V, null, z(e.networks, (r, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: S(["fr-btn", `fr-btn--${r.type}`]),
            title: r.name,
            href: r.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, m(r.name), 11, Vo)
        ]))), 128))
      ])) : y("", !0)
    ]));
  }
}), jo = { class: "fr-follow" }, Ro = { class: "fr-container" }, Oo = { class: "fr-grid-row" }, qo = /* @__PURE__ */ B({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(t) {
    const e = t, a = k(() => e.networks && e.networks.length), r = k(() => typeof e.newsletterData == "object");
    return (l, n) => (i(), f("div", jo, [
      c("div", Ro, [
        c("div", Oo, [
          E(l.$slots, "default", {}, () => [
            l.newsletterData ? (i(), f("div", {
              key: 0,
              class: S(["fr-col-12", { "fr-col-md-8": a.value }])
            }, [
              G(_a, ie(pt(l.newsletterData)), null, 16)
            ], 2)) : y("", !0),
            a.value ? (i(), f("div", {
              key: 1,
              class: S(["fr-col-12", { "fr-col-md-4": r.value }])
            }, [
              G(wa, { networks: l.networks }, null, 8, ["networks"])
            ], 2)) : y("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ht = 1, xa = /* @__PURE__ */ B({
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
    const e = t, a = k(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("http");
    }), r = k(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("mailto");
    }), l = k(() => e.button ? "button" : a.value || r.value ? "a" : "RouterLink"), n = k(() => {
      if (!(!a.value && !r.value))
        return e.href;
    }), o = k(() => {
      if (!(a.value || r.value))
        return e.to;
    }), s = k(() => o.value ? { to: o.value } : { href: n.value }), u = k(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), d = k(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Ht, ...e.iconAttrs ?? {} } : { scale: Ht, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, v) => (i(), F(te(l.value), O({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, s.value, {
      target: p.target,
      onClick: W(p.onClick, ["stop"])
    }), {
      default: Q(() => {
        var _, D;
        return [
          !u.value && (p.icon || (_ = p.iconAttrs) != null && _.name) && !p.iconRight ? (i(), F(ae, O({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : y("", !0),
          M(" " + m(p.label) + " ", 1),
          !u.value && (p.icon || (D = p.iconAttrs) != null && D.name) && p.iconRight ? (i(), F(ae, O({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : y("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Ho = { class: "fr-footer__partners" }, zo = {
  key: 0,
  class: "fr-footer__partners-title"
}, Qo = { class: "fr-footer__partners-logos" }, $o = {
  key: 0,
  class: "fr-footer__partners-main"
}, Go = ["href"], Ko = ["src", "alt"], Xo = { class: "fr-footer__partners-sub" }, Wo = ["href"], Uo = ["src", "alt"], Da = /* @__PURE__ */ B({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Ho, [
      e.title ? (i(), f("h4", zo, m(e.title), 1)) : y("", !0),
      c("div", Qo, [
        e.mainPartner ? (i(), f("div", $o, [
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
        ])) : y("", !0),
        c("div", Xo, [
          c("ul", null, [
            (i(!0), f(V, null, z(e.subPartners, (r, l) => (i(), f("li", { key: l }, [
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
}), Yo = ["innerHTML"], Le = /* @__PURE__ */ B({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(t) {
    const e = t, a = k(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (r, l) => (i(), f("p", {
      class: S(["fr-logo", {
        "fr-logo--sm": r.small && !r.large,
        "fr-logo--lg": r.large && !r.small
      }]),
      innerHTML: a.value
    }, null, 10, Yo));
  }
}), Zo = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, Jo = {
  key: 0,
  class: "fr-footer__top"
}, ei = { class: "fr-container" }, ti = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, ai = { class: "fr-container" }, li = { class: "fr-footer__body" }, ri = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, ni = ["href"], oi = ["src", "alt"], ii = ["src", "alt"], si = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, ui = { class: "fr-footer__content" }, di = { class: "fr-footer__content-desc" }, ci = { class: "fr-footer__content-list" }, fi = ["href", "title"], pi = { class: "fr-footer__bottom" }, vi = { class: "fr-footer__bottom-list" }, mi = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, gi = /* @__PURE__ */ B({
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
    const e = t, a = k(() => [
      ...e.beforeMandatoryLinks,
      ...e.mandatoryLinks,
      ...e.afterMandatoryLinks
    ]), r = Jt(), l = k(() => {
      var p;
      return (p = r["footer-link-lists"]) == null ? void 0 : p.call(r).length;
    }), n = k(() => {
      const p = e.licenceTo || e.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), o = k(() => {
      const { to: p, href: v, ..._ } = e.licenceLinkProps ?? {};
      return _;
    }), s = k(() => n.value ? "" : e.licenceTo), u = k(() => n.value ? e.licenceTo : ""), d = k(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (p, v) => {
      const _ = se("RouterLink");
      return i(), f("footer", Zo, [
        l.value ? (i(), f("div", Jo, [
          c("div", ei, [
            c("div", ti, [
              E(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : y("", !0),
        c("div", ai, [
          c("div", li, [
            p.operatorImgSrc ? (i(), f("div", ri, [
              G(Le, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              d.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: ue(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, oi)
              ], 8, ni)) : (i(), F(_, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: Q(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: ue(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, ii)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", si, [
              G(_, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: Q(() => [
                  G(Le, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", ui, [
              c("p", di, [
                E(p.$slots, "description", {}, () => [
                  M(m(p.descText), 1)
                ], !0)
              ]),
              c("ul", ci, [
                (i(!0), f(V, null, z(p.ecosystemLinks, ({ href: D, label: x, title: L, ...b }, T) => (i(), f("li", {
                  key: T,
                  class: "fr-footer__content-item"
                }, [
                  c("a", O({
                    class: "fr-footer__content-link",
                    href: D,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: L,
                    ref_for: !0
                  }, b), m(x), 17, fi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), F(Da, ie(O({ key: 0 }, p.partners)), null, 16)) : y("", !0),
          c("div", pi, [
            c("ul", vi, [
              (i(!0), f(V, null, z(a.value, (D, x) => (i(), f("li", {
                key: x,
                class: "fr-footer__bottom-item"
              }, [
                G(xa, O({ ref_for: !0 }, D), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", mi, [
              c("p", null, [
                M(m(p.licenceText) + " ", 1),
                (i(), F(te(n.value ? "a" : "RouterLink"), O({
                  class: "fr-link-licence no-content-after",
                  to: n.value ? void 0 : s.value,
                  href: n.value ? u.value : void 0,
                  target: n.value ? "_blank" : void 0,
                  rel: "noopener noreferrer"
                }, o.value), {
                  default: Q(() => [
                    M(m(p.licenceName), 1)
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
}), bi = /* @__PURE__ */ le(gi, [["__scopeId", "data-v-4d6f52aa"]]), hi = { class: "fr-footer__top-cat" }, yi = { class: "fr-footer__top-list" }, ki = ["href"], _i = /* @__PURE__ */ B({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(t) {
    return (e, a) => {
      const r = se("RouterLink");
      return i(), f("div", null, [
        c("h3", hi, m(e.categoryName), 1),
        c("ul", yi, [
          (i(!0), f(V, null, z(e.links, (l, n) => (i(), f("li", { key: n }, [
            typeof l.to == "string" && l.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: l.to
            }, m(l.label), 9, ki)) : y("", !0),
            typeof l.to == "object" || typeof l.to == "string" && !l.to.startsWith("http") ? (i(), F(r, {
              key: 1,
              class: "fr-footer__top-link",
              to: l.to
            }, {
              default: Q(() => [
                M(m(l.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : y("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), wi = { class: "fr-connect-group" }, xi = { class: "fr-connect__brand" }, Di = ["href", "title"], Ii = /* @__PURE__ */ B({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", wi, [
      c("button", {
        class: S(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, [
        a[0] || (a[0] = c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1)),
        c("span", xi, "FranceConnect" + m(e.secure ? "+" : ""), 1)
      ], 2),
      c("p", null, [
        c("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, m(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, Di)
      ])
    ]));
  }
}), Ti = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Ci = { class: "fr-nav__item" }, Bi = ["aria-controls", "aria-expanded"], Ei = { class: "fr-hidden-lg" }, Si = ["id"], Ai = { class: "fr-menu__list" }, Mi = ["hreflang", "lang", "aria-current", "href", "onClick"], it = /* @__PURE__ */ B({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => U("translate") },
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
    } = pe(), d = R(!1);
    function p(_) {
      d.value = !1, r("select", _);
    }
    const v = k(
      () => a.languages.find(({ codeIso: _ }) => _ === a.currentLanguage)
    );
    return ee(d, (_, D) => {
      _ !== D && s(_);
    }), (_, D) => {
      var x, L;
      return i(), f("nav", Ti, [
        c("div", Ci, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": _.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: D[0] || (D[0] = W((b) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            M(m((x = v.value) == null ? void 0 : x.codeIso.toUpperCase()), 1),
            c("span", Ei, " - " + m((L = v.value) == null ? void 0 : L.label), 1)
          ], 8, Bi),
          c("div", {
            id: _.id,
            ref_key: "collapse",
            ref: l,
            class: S(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": j(o), "fr-collapsing": j(n) }]),
            onTransitionend: D[1] || (D[1] = (b) => j(u)(d.value))
          }, [
            c("ul", Ai, [
              (i(!0), f(V, null, z(_.languages, (b, T) => (i(), f("li", { key: T }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: b.codeIso,
                  lang: b.codeIso,
                  "aria-current": _.currentLanguage === b.codeIso ? !0 : void 0,
                  href: `#${b.codeIso}`,
                  onClick: W((N) => p(b), ["prevent", "stop"])
                }, m(`${b.codeIso.toUpperCase()} - ${b.label}`), 9, Mi)
              ]))), 128))
            ])
          ], 42, Si)
        ])
      ]);
    };
  }
}), Fi = ["for"], Li = {
  key: 0,
  class: "required"
}, Pi = {
  key: 0,
  class: "fr-hint-text"
}, Ni = /* @__PURE__ */ B({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => U("basic", "input") },
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
    const a = t, r = rl(), l = R(null), n = () => {
      var d;
      return (d = l.value) == null ? void 0 : d.focus();
    }, o = k(() => a.isTextarea ? "textarea" : "input"), s = k(() => a.isWithWrapper || r.type === "date" || !!a.wrapperClass), u = k(() => [
      "fr-label",
      { invisible: !a.labelVisible },
      a.labelClass
    ]);
    return e({
      focus: n
    }), (d, p) => (i(), f(V, null, [
      c("label", {
        class: S(u.value),
        for: d.id
      }, [
        E(d.$slots, "label", {}, () => [
          M(m(d.label) + " ", 1),
          E(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", Li, "*")) : y("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", Pi, m(d.hint), 1)) : y("", !0)
      ], 10, Fi),
      s.value ? (i(), f("div", {
        key: 1,
        class: S([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), F(te(o.value), O({ id: d.id }, d.$attrs, {
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
      ], 2)) : (i(), F(te(o.value), O({
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
}), xt = /* @__PURE__ */ le(Ni, [["__scopeId", "data-v-6e6c295a"]]), st = /* @__PURE__ */ B({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => U("search", "input") },
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
      class: S(["fr-search-bar", { "fr-search-bar--lg": r.large }]),
      role: "search"
    }, [
      G(xt, {
        id: r.id,
        type: "search",
        placeholder: r.placeholder,
        "model-value": r.modelValue,
        "label-visible": r.labelVisible,
        label: r.label,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        "onUpdate:modelValue": l[0] || (l[0] = (n) => a("update:modelValue", n)),
        onKeydown: l[1] || (l[1] = re((n) => a("search", r.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label-visible", "label", "disabled", "aria-disabled"]),
      G(Ce, {
        title: "Rechercher",
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        onClick: l[2] || (l[2] = (n) => a("search", r.modelValue))
      }, {
        default: Q(() => [
          M(m(r.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), zt = 1, Ia = /* @__PURE__ */ B({
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
    const e = t, a = k(() => typeof e.path == "string"), r = k(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("http")) || a.value && e.path.startsWith("http") || typeof e.to == "string" && e.to.startsWith("http");
    }), l = k(() => {
      var v;
      return ((v = e.href) == null ? void 0 : v.startsWith("mailto")) || a.value && e.path.startsWith("mailto") || typeof e.to == "string" && e.to.startsWith("mailto");
    }), n = k(() => e.button ? "button" : r.value || l.value ? "a" : "RouterLink"), o = k(() => {
      if (!(!r.value && !l.value))
        return e.to ?? e.href ?? e.path;
    }), s = k(() => {
      if (!(r.value || l.value))
        return e.to ?? e.path;
    }), u = k(() => s.value ? { to: s.value } : { href: o.value }), d = k(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = k(
      () => typeof e.icon == "string" ? { name: e.icon, scale: zt, ...e.iconAttrs ?? {} } : { scale: zt, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (v, _) => (i(), F(te(n.value), O({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && v.iconRight,
        "fr-btn--icon-left": d.value && !v.iconRight,
        [String(v.icon)]: d.value
      }]
    }, u.value, {
      target: v.target,
      onClick: _[0] || (_[0] = W((D) => v.onClick(D), ["stop"]))
    }), {
      default: Q(() => {
        var D, x;
        return [
          !d.value && (v.icon || (D = v.iconAttrs) != null && D.name) && !v.iconRight ? (i(), F(ae, O({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : y("", !0),
          M(" " + m(v.label) + " ", 1),
          !d.value && (v.icon || (x = v.iconAttrs) != null && x.name) && v.iconRight ? (i(), F(ae, O({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : y("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Vi = ["aria-label"], ji = { class: "fr-btns-group" }, ut = /* @__PURE__ */ B({
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
      c("ul", ji, [
        (i(!0), f(V, null, z(r.links, (n, o) => (i(), f("li", { key: o }, [
          G(Ia, O({ ref_for: !0 }, n, {
            "on-click": (s) => {
              var u;
              a("linkClick", s), (u = n.onClick) == null || u.call(n, s);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Vi));
  }
}), Ri = {
  role: "banner",
  class: "fr-header"
}, Oi = { class: "fr-header__body" }, qi = { class: "fr-container width-inherit" }, Hi = { class: "fr-header__body-row" }, zi = { class: "fr-header__brand fr-enlarge-link" }, Qi = { class: "fr-header__brand-top" }, $i = { class: "fr-header__logo" }, Gi = {
  key: 0,
  class: "fr-header__operator"
}, Ki = ["src", "alt"], Xi = {
  key: 1,
  class: "fr-header__navbar"
}, Wi = ["aria-label", "title", "data-fr-opened"], Ui = ["aria-label", "title"], Yi = {
  key: 0,
  class: "fr-header__service"
}, Zi = { class: "fr-header__service-title" }, Ji = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, es = {
  key: 0,
  class: "fr-header__service-tagline"
}, ts = {
  key: 1,
  class: "fr-header__service"
}, as = { class: "fr-header__tools" }, ls = {
  key: 0,
  class: "fr-header__tools-links"
}, rs = {
  key: 1,
  class: "fr-header__search fr-modal"
}, ns = ["aria-label"], os = { class: "fr-container" }, is = { class: "fr-header__menu-links" }, ss = { role: "navigation" }, us = {
  key: 1,
  class: "flex justify-center items-center"
}, ds = { class: "fr-header__menu fr-modal" }, cs = {
  key: 0,
  class: "fr-container"
}, fs = /* @__PURE__ */ B({
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
    const a = t, r = e, l = Oe(a, "languageSelector"), n = R(!1), o = R(!1), s = R(!1), u = () => {
      var b;
      s.value = !1, n.value = !1, o.value = !1, (b = document.getElementById("button-menu")) == null || b.focus();
    }, d = (b) => {
      b.key === "Escape" && u();
    };
    oe(() => {
      document.addEventListener("keydown", d);
    }), fe(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var b;
      s.value = !0, n.value = !0, o.value = !1, (b = document.getElementById("close-button")) == null || b.focus();
    }, v = () => {
      s.value = !0, n.value = !1, o.value = !0;
    }, _ = u, D = Jt(), x = k(() => {
      var b;
      return !!((b = D.operator) != null && b.call(D).length) || !!a.operatorImgSrc;
    }), L = k(() => !!D.mainnav);
    return ft(mt, () => u), (b, T) => {
      var N, H, A;
      const q = se("RouterLink");
      return i(), f("header", Ri, [
        c("div", Oi, [
          c("div", qi, [
            c("div", Hi, [
              c("div", zi, [
                c("div", Qi, [
                  c("div", $i, [
                    G(q, {
                      to: b.homeTo,
                      title: `${b.homeLabel} - ${b.serviceTitle}`
                    }, {
                      default: Q(() => [
                        G(Le, {
                          "logo-text": b.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  x.value ? (i(), f("div", Gi, [
                    E(b.$slots, "operator", {}, () => [
                      b.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: b.operatorImgSrc,
                        alt: b.operatorImgAlt,
                        style: ue(b.operatorImgStyle)
                      }, null, 12, Ki)) : y("", !0)
                    ])
                  ])) : y("", !0),
                  b.showSearch || L.value || (N = b.quickLinks) != null && N.length ? (i(), f("div", Xi, [
                    b.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": b.showSearchLabel,
                      title: b.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: T[0] || (T[0] = W((w) => v(), ["prevent", "stop"]))
                    }, null, 8, Wi)) : y("", !0),
                    L.value || (H = b.quickLinks) != null && H.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": b.menuLabel,
                      title: b.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = W((w) => p(), ["prevent", "stop"]))
                    }, null, 8, Ui)) : y("", !0)
                  ])) : y("", !0)
                ]),
                b.serviceTitle ? (i(), f("div", Yi, [
                  G(q, O({
                    to: b.homeTo,
                    title: `${b.homeLabel} - ${b.serviceTitle}`
                  }, b.$attrs), {
                    default: Q(() => [
                      c("p", Zi, [
                        M(m(b.serviceTitle) + " ", 1),
                        b.showBeta ? (i(), f("span", Ji, " BETA ")) : y("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  b.serviceDescription ? (i(), f("p", es, m(b.serviceDescription), 1)) : y("", !0)
                ])) : y("", !0),
                !b.serviceTitle && b.showBeta ? (i(), f("div", ts, T[9] || (T[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : y("", !0)
              ]),
              c("div", as, [
                (A = b.quickLinks) != null && A.length || l.value ? (i(), f("div", ls, [
                  n.value ? y("", !0) : (i(), F(ut, {
                    key: 0,
                    links: b.quickLinks,
                    "nav-aria-label": b.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  l.value ? (i(), F(it, O({ key: 1 }, l.value, {
                    onSelect: T[2] || (T[2] = (w) => r("language-select", w))
                  }), null, 16)) : y("", !0)
                ])) : y("", !0),
                b.showSearch ? (i(), f("div", rs, [
                  G(st, {
                    "searchbar-id": b.searchbarId,
                    label: b.searchLabel,
                    "model-value": b.modelValue,
                    placeholder: b.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (w) => r("update:modelValue", w)),
                    onSearch: T[4] || (T[4] = (w) => r("search", w))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ]),
            b.showSearch || L.value || b.quickLinks && b.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: S(["fr-header__menu fr-modal", { "fr-modal--opened": s.value }]),
              "aria-label": b.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", os, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: T[5] || (T[5] = W((w) => u(), ["prevent", "stop"]))
                }, m(b.closeMenuModalLabel), 1),
                c("div", is, [
                  l.value ? (i(), F(it, O({ key: 0 }, l.value, {
                    onSelect: T[6] || (T[6] = (w) => l.value.currentLanguage = w.codeIso)
                  }), null, 16)) : y("", !0),
                  c("nav", ss, [
                    n.value ? (i(), F(ut, {
                      key: 0,
                      role: "navigation",
                      links: b.quickLinks,
                      "nav-aria-label": b.quickLinksAriaLabel,
                      onLinkClick: j(_)
                    }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : y("", !0)
                  ])
                ]),
                s.value ? E(b.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : y("", !0),
                o.value ? (i(), f("div", us, [
                  G(st, {
                    "searchbar-id": b.searchbarId,
                    "model-value": b.modelValue,
                    placeholder: b.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (w) => r("update:modelValue", w)),
                    onSearch: T[8] || (T[8] = (w) => r("search", w))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ], 10, ns)) : y("", !0),
            E(b.$slots, "default")
          ])
        ]),
        c("div", ds, [
          L.value && !s.value ? (i(), f("div", cs, [
            E(b.$slots, "mainnav", { hidemodal: u })
          ])) : y("", !0)
        ])
      ]);
    };
  }
}), ps = /* @__PURE__ */ B({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", {
      class: S(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      c("p", {
        class: S({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        M(m(e.text) + " ", 1),
        E(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), vs = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, ms = ["id", "data-testid"], gs = ["id", "data-testid"], bs = ["id", "data-testid"], hs = ["id", "data-testid"], ys = /* @__PURE__ */ B({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => U("basic", "input") },
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
      class: S(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      E(e.$slots, "before-input"),
      E(e.$slots, "default"),
      e.$slots.default ? y("", !0) : (i(), F(xt, O({ key: 0 }, e.$attrs, {
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
      c("div", vs, [
        Array.isArray(e.errorMessage) ? (i(!0), f(V, { key: 0 }, z(e.errorMessage, (r) => (i(), f("p", {
          id: e.descriptionId,
          key: r,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, m(r), 9, ms))), 128)) : e.errorMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, m(e.errorMessage), 9, gs)) : y("", !0),
        Array.isArray(e.validMessage) ? (i(!0), f(V, { key: 2 }, z(e.validMessage, (r) => (i(), f("p", {
          id: e.descriptionId,
          key: r,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, m(r), 9, bs))), 128)) : e.validMessage ? (i(), f("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, m(e.validMessage), 9, hs)) : y("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var Ta = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Pe = /* @__PURE__ */ Ta.join(","), Ca = typeof Element > "u", be = Ca ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, Ne = !Ca && Element.prototype.getRootNode ? function(t) {
  var e;
  return t == null || (e = t.getRootNode) === null || e === void 0 ? void 0 : e.call(t);
} : function(t) {
  return t == null ? void 0 : t.ownerDocument;
}, Ve = function t(e, a) {
  var r;
  a === void 0 && (a = !0);
  var l = e == null || (r = e.getAttribute) === null || r === void 0 ? void 0 : r.call(e, "inert"), n = l === "" || l === "true", o = n || a && e && t(e.parentNode);
  return o;
}, ks = function(t) {
  var e, a = t == null || (e = t.getAttribute) === null || e === void 0 ? void 0 : e.call(t, "contenteditable");
  return a === "" || a === "true";
}, Ba = function(t, e, a) {
  if (Ve(t))
    return [];
  var r = Array.prototype.slice.apply(t.querySelectorAll(Pe));
  return e && be.call(t, Pe) && r.unshift(t), r = r.filter(a), r;
}, Ea = function t(e, a, r) {
  for (var l = [], n = Array.from(e); n.length; ) {
    var o = n.shift();
    if (!Ve(o, !1))
      if (o.tagName === "SLOT") {
        var s = o.assignedElements(), u = s.length ? s : o.children, d = t(u, !0, r);
        r.flatten ? l.push.apply(l, d) : l.push({
          scopeParent: o,
          candidates: d
        });
      } else {
        var p = be.call(o, Pe);
        p && r.filter(o) && (a || !e.includes(o)) && l.push(o);
        var v = o.shadowRoot || // check for an undisclosed shadow
        typeof r.getShadowRoot == "function" && r.getShadowRoot(o), _ = !Ve(v, !1) && (!r.shadowRootFilter || r.shadowRootFilter(o));
        if (v && _) {
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
}, ve = function(t) {
  if (!t)
    throw new Error("No node provided");
  return t.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || ks(t)) && !Sa(t) ? 0 : t.tabIndex;
}, _s = function(t, e) {
  var a = ve(t);
  return a < 0 && e && !Sa(t) ? 0 : a;
}, ws = function(t, e) {
  return t.tabIndex === e.tabIndex ? t.documentOrder - e.documentOrder : t.tabIndex - e.tabIndex;
}, Aa = function(t) {
  return t.tagName === "INPUT";
}, xs = function(t) {
  return Aa(t) && t.type === "hidden";
}, Ds = function(t) {
  var e = t.tagName === "DETAILS" && Array.prototype.slice.apply(t.children).some(function(a) {
    return a.tagName === "SUMMARY";
  });
  return e;
}, Is = function(t, e) {
  for (var a = 0; a < t.length; a++)
    if (t[a].checked && t[a].form === e)
      return t[a];
}, Ts = function(t) {
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
  var l = Is(r, t.form);
  return !l || l === t;
}, Cs = function(t) {
  return Aa(t) && t.type === "radio";
}, Bs = function(t) {
  return Cs(t) && !Ts(t);
}, Es = function(t) {
  var e, a = t && Ne(t), r = (e = a) === null || e === void 0 ? void 0 : e.host, l = !1;
  if (a && a !== t) {
    var n, o, s;
    for (l = !!((n = r) !== null && n !== void 0 && (o = n.ownerDocument) !== null && o !== void 0 && o.contains(r) || t != null && (s = t.ownerDocument) !== null && s !== void 0 && s.contains(t)); !l && r; ) {
      var u, d, p;
      a = Ne(r), r = (u = a) === null || u === void 0 ? void 0 : u.host, l = !!((d = r) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(r));
    }
  }
  return l;
}, Qt = function(t) {
  var e = t.getBoundingClientRect(), a = e.width, r = e.height;
  return a === 0 && r === 0;
}, Ss = function(t, e) {
  var a = e.displayCheck, r = e.getShadowRoot;
  if (getComputedStyle(t).visibility === "hidden")
    return !0;
  var l = be.call(t, "details>summary:first-of-type"), n = l ? t.parentElement : t;
  if (be.call(n, "details:not([open]) *"))
    return !0;
  if (!a || a === "full" || a === "legacy-full") {
    if (typeof r == "function") {
      for (var o = t; t; ) {
        var s = t.parentElement, u = Ne(t);
        if (s && !s.shadowRoot && r(s) === !0)
          return Qt(t);
        t.assignedSlot ? t = t.assignedSlot : !s && u !== t.ownerDocument ? t = u.host : t = s;
      }
      t = o;
    }
    if (Es(t))
      return !t.getClientRects().length;
    if (a !== "legacy-full")
      return !0;
  } else if (a === "non-zero-area")
    return Qt(t);
  return !1;
}, As = function(t) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
    for (var e = t.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var a = 0; a < e.children.length; a++) {
          var r = e.children.item(a);
          if (r.tagName === "LEGEND")
            return be.call(e, "fieldset[disabled] *") ? !0 : !r.contains(t);
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
  Ve(e) || xs(e) || Ss(e, t) || // For a details element with a summary, the summary element gets the focus
  Ds(e) || As(e));
}, dt = function(t, e) {
  return !(Bs(e) || ve(e) < 0 || !je(t, e));
}, Ms = function(t) {
  var e = parseInt(t.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, Fs = function t(e) {
  var a = [], r = [];
  return e.forEach(function(l, n) {
    var o = !!l.scopeParent, s = o ? l.scopeParent : l, u = _s(s, o), d = o ? t(l.candidates) : s;
    u === 0 ? o ? a.push.apply(a, d) : a.push(s) : r.push({
      documentOrder: n,
      tabIndex: u,
      item: l,
      isScope: o,
      content: d
    });
  }), r.sort(ws).reduce(function(l, n) {
    return n.isScope ? l.push.apply(l, n.content) : l.push(n.content), l;
  }, []).concat(a);
}, Ls = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Ea([t], e.includeContainer, {
    filter: dt.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: Ms
  }) : a = Ba(t, e.includeContainer, dt.bind(null, e)), Fs(a);
}, Ps = function(t, e) {
  e = e || {};
  var a;
  return e.getShadowRoot ? a = Ea([t], e.includeContainer, {
    filter: je.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : a = Ba(t, e.includeContainer, je.bind(null, e)), a;
}, ye = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return be.call(t, Pe) === !1 ? !1 : dt(e, t);
}, Ns = /* @__PURE__ */ Ta.concat("iframe").join(","), Ye = function(t, e) {
  if (e = e || {}, !t)
    throw new Error("No node provided");
  return be.call(t, Ns) === !1 ? !1 : je(e, t);
};
/*!
* focus-trap 7.5.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function $t(t, e) {
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
    e % 2 ? $t(Object(a), !0).forEach(function(r) {
      Vs(t, r, a[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : $t(Object(a)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(a, r));
    });
  }
  return t;
}
function Vs(t, e, a) {
  return e = Rs(e), e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}
function js(t, e) {
  if (typeof t != "object" || t === null) return t;
  var a = t[Symbol.toPrimitive];
  if (a !== void 0) {
    var r = a.call(t, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Rs(t) {
  var e = js(t, "string");
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
}, Os = function(t) {
  return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
}, qs = function(t) {
  return (t == null ? void 0 : t.key) === "Escape" || (t == null ? void 0 : t.key) === "Esc" || (t == null ? void 0 : t.keyCode) === 27;
}, xe = function(t) {
  return (t == null ? void 0 : t.key) === "Tab" || (t == null ? void 0 : t.keyCode) === 9;
}, Hs = function(t) {
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
}, _e = function(t) {
  for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    a[r - 1] = arguments[r];
  return typeof t == "function" ? t.apply(void 0, a) : t;
}, Se = function(t) {
  return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
}, Qs = [], $s = function(t, e) {
  var a = (e == null ? void 0 : e.document) || document, r = (e == null ? void 0 : e.trapStack) || Qs, l = Gt({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Hs,
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
  }, o, s = function(g, h, I) {
    return g && g[h] !== void 0 ? g[h] : l[I || h];
  }, u = function(g, h) {
    var I = typeof (h == null ? void 0 : h.composedPath) == "function" ? h.composedPath() : void 0;
    return n.containerGroups.findIndex(function(X) {
      var K = X.container, Y = X.tabbableNodes;
      return K.contains(g) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (I == null ? void 0 : I.includes(K)) || Y.find(function(Z) {
        return Z === g;
      });
    });
  }, d = function(g) {
    var h = l[g];
    if (typeof h == "function") {
      for (var I = arguments.length, X = new Array(I > 1 ? I - 1 : 0), K = 1; K < I; K++)
        X[K - 1] = arguments[K];
      h = h.apply(void 0, X);
    }
    if (h === !0 && (h = void 0), !h) {
      if (h === void 0 || h === !1)
        return h;
      throw new Error("`".concat(g, "` was specified but was not a node, or did not return a node"));
    }
    var Y = h;
    if (typeof h == "string" && (Y = a.querySelector(h), !Y))
      throw new Error("`".concat(g, "` as selector refers to no known node"));
    return Y;
  }, p = function() {
    var g = d("initialFocus");
    if (g === !1)
      return !1;
    if (g === void 0 || !Ye(g, l.tabbableOptions))
      if (u(a.activeElement) >= 0)
        g = a.activeElement;
      else {
        var h = n.tabbableGroups[0], I = h && h.firstTabbableNode;
        g = I || d("fallbackFocus");
      }
    if (!g)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return g;
  }, v = function() {
    if (n.containerGroups = n.containers.map(function(g) {
      var h = Ls(g, l.tabbableOptions), I = Ps(g, l.tabbableOptions), X = h.length > 0 ? h[0] : void 0, K = h.length > 0 ? h[h.length - 1] : void 0, Y = I.find(function(J) {
        return ye(J);
      }), Z = I.slice().reverse().find(function(J) {
        return ye(J);
      }), ne = !!h.find(function(J) {
        return ve(J) > 0;
      });
      return {
        container: g,
        tabbableNodes: h,
        focusableNodes: I,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ne,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: X,
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
          var he = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ke = h.indexOf(J);
          return ke < 0 ? he ? I.slice(I.indexOf(J) + 1).find(function(de) {
            return ye(de);
          }) : I.slice(0, I.indexOf(J)).reverse().find(function(de) {
            return ye(de);
          }) : h[ke + (he ? 1 : -1)];
        }
      };
    }), n.tabbableGroups = n.containerGroups.filter(function(g) {
      return g.tabbableNodes.length > 0;
    }), n.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (n.containerGroups.find(function(g) {
      return g.posTabIndexesFound;
    }) && n.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, _ = function g(h) {
    var I = h.activeElement;
    if (I)
      return I.shadowRoot && I.shadowRoot.activeElement !== null ? g(I.shadowRoot) : I;
  }, D = function g(h) {
    if (h !== !1 && h !== _(document)) {
      if (!h || !h.focus) {
        g(p());
        return;
      }
      h.focus({
        preventScroll: !!l.preventScroll
      }), n.mostRecentlyFocusedNode = h, Os(h) && h.select();
    }
  }, x = function(g) {
    var h = d("setReturnFocus", g);
    return h || (h === !1 ? !1 : g);
  }, L = function(g) {
    var h = g.target, I = g.event, X = g.isBackward, K = X === void 0 ? !1 : X;
    h = h || Se(I), v();
    var Y = null;
    if (n.tabbableGroups.length > 0) {
      var Z = u(h, I), ne = Z >= 0 ? n.containerGroups[Z] : void 0;
      if (Z < 0)
        K ? Y = n.tabbableGroups[n.tabbableGroups.length - 1].lastTabbableNode : Y = n.tabbableGroups[0].firstTabbableNode;
      else if (K) {
        var J = Wt(n.tabbableGroups, function(Ke) {
          var Xe = Ke.firstTabbableNode;
          return h === Xe;
        });
        if (J < 0 && (ne.container === h || Ye(h, l.tabbableOptions) && !ye(h, l.tabbableOptions) && !ne.nextTabbableNode(h, !1)) && (J = Z), J >= 0) {
          var he = J === 0 ? n.tabbableGroups.length - 1 : J - 1, ke = n.tabbableGroups[he];
          Y = ve(h) >= 0 ? ke.lastTabbableNode : ke.lastDomTabbableNode;
        } else xe(I) || (Y = ne.nextTabbableNode(h, !1));
      } else {
        var de = Wt(n.tabbableGroups, function(Ke) {
          var Xe = Ke.lastTabbableNode;
          return h === Xe;
        });
        if (de < 0 && (ne.container === h || Ye(h, l.tabbableOptions) && !ye(h, l.tabbableOptions) && !ne.nextTabbableNode(h)) && (de = Z), de >= 0) {
          var Za = de === n.tabbableGroups.length - 1 ? 0 : de + 1, It = n.tabbableGroups[Za];
          Y = ve(h) >= 0 ? It.firstTabbableNode : It.firstDomTabbableNode;
        } else xe(I) || (Y = ne.nextTabbableNode(h));
      }
    } else
      Y = d("fallbackFocus");
    return Y;
  }, b = function(g) {
    var h = Se(g);
    if (!(u(h, g) >= 0)) {
      if (_e(l.clickOutsideDeactivates, g)) {
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
      _e(l.allowOutsideClick, g) || g.preventDefault();
    }
  }, T = function(g) {
    var h = Se(g), I = u(h, g) >= 0;
    if (I || h instanceof Document)
      I && (n.mostRecentlyFocusedNode = h);
    else {
      g.stopImmediatePropagation();
      var X, K = !0;
      if (n.mostRecentlyFocusedNode)
        if (ve(n.mostRecentlyFocusedNode) > 0) {
          var Y = u(n.mostRecentlyFocusedNode), Z = n.containerGroups[Y].tabbableNodes;
          if (Z.length > 0) {
            var ne = Z.findIndex(function(J) {
              return J === n.mostRecentlyFocusedNode;
            });
            ne >= 0 && (l.isKeyForward(n.recentNavEvent) ? ne + 1 < Z.length && (X = Z[ne + 1], K = !1) : ne - 1 >= 0 && (X = Z[ne - 1], K = !1));
          }
        } else
          n.containerGroups.some(function(J) {
            return J.tabbableNodes.some(function(he) {
              return ve(he) > 0;
            });
          }) || (K = !1);
      else
        K = !1;
      K && (X = L({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: n.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(n.recentNavEvent)
      })), D(X || n.mostRecentlyFocusedNode || p());
    }
    n.recentNavEvent = void 0;
  }, N = function(g) {
    var h = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    n.recentNavEvent = g;
    var I = L({
      event: g,
      isBackward: h
    });
    I && (xe(g) && g.preventDefault(), D(I));
  }, H = function(g) {
    if (qs(g) && _e(l.escapeDeactivates, g) !== !1) {
      g.preventDefault(), o.deactivate();
      return;
    }
    (l.isKeyForward(g) || l.isKeyBackward(g)) && N(g, l.isKeyBackward(g));
  }, A = function(g) {
    var h = Se(g);
    u(h, g) >= 0 || _e(l.clickOutsideDeactivates, g) || _e(l.allowOutsideClick, g) || (g.preventDefault(), g.stopImmediatePropagation());
  }, q = function() {
    if (n.active)
      return Kt.activateTrap(r, o), n.delayInitialFocusTimer = l.delayInitialFocus ? Xt(function() {
        D(p());
      }) : D(p()), a.addEventListener("focusin", T, !0), a.addEventListener("mousedown", b, {
        capture: !0,
        passive: !1
      }), a.addEventListener("touchstart", b, {
        capture: !0,
        passive: !1
      }), a.addEventListener("click", A, {
        capture: !0,
        passive: !1
      }), a.addEventListener("keydown", H, {
        capture: !0,
        passive: !1
      }), o;
  }, w = function() {
    if (n.active)
      return a.removeEventListener("focusin", T, !0), a.removeEventListener("mousedown", b, !0), a.removeEventListener("touchstart", b, !0), a.removeEventListener("click", A, !0), a.removeEventListener("keydown", H, !0), o;
  }, P = function(g) {
    var h = g.some(function(I) {
      var X = Array.from(I.removedNodes);
      return X.some(function(K) {
        return K === n.mostRecentlyFocusedNode;
      });
    });
    h && D(p());
  }, C = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(P) : void 0, $ = function() {
    C && (C.disconnect(), n.active && !n.paused && n.containers.map(function(g) {
      C.observe(g, {
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
    activate: function(g) {
      if (n.active)
        return this;
      var h = s(g, "onActivate"), I = s(g, "onPostActivate"), X = s(g, "checkCanFocusTrap");
      X || v(), n.active = !0, n.paused = !1, n.nodeFocusedBeforeActivation = a.activeElement, h == null || h();
      var K = function() {
        X && v(), q(), $(), I == null || I();
      };
      return X ? (X(n.containers.concat()).then(K, K), this) : (K(), this);
    },
    deactivate: function(g) {
      if (!n.active)
        return this;
      var h = Gt({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, g);
      clearTimeout(n.delayInitialFocusTimer), n.delayInitialFocusTimer = void 0, w(), n.active = !1, n.paused = !1, $(), Kt.deactivateTrap(r, o);
      var I = s(h, "onDeactivate"), X = s(h, "onPostDeactivate"), K = s(h, "checkCanReturnFocus"), Y = s(h, "returnFocus", "returnFocusOnDeactivate");
      I == null || I();
      var Z = function() {
        Xt(function() {
          Y && D(x(n.nodeFocusedBeforeActivation)), X == null || X();
        });
      };
      return Y && K ? (K(x(n.nodeFocusedBeforeActivation)).then(Z, Z), this) : (Z(), this);
    },
    pause: function(g) {
      if (n.paused || !n.active)
        return this;
      var h = s(g, "onPause"), I = s(g, "onPostPause");
      return n.paused = !0, h == null || h(), w(), $(), I == null || I(), this;
    },
    unpause: function(g) {
      if (!n.paused || !n.active)
        return this;
      var h = s(g, "onUnpause"), I = s(g, "onPostUnpause");
      return n.paused = !1, h == null || h(), v(), q(), $(), I == null || I(), this;
    },
    updateContainerElements: function(g) {
      var h = [].concat(g).filter(Boolean);
      return n.containers = h.map(function(I) {
        return typeof I == "string" ? a.querySelector(I) : I;
      }), n.active && v(), $(), this;
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
}, Ks = B({
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
    const l = R(null), n = k(() => {
      const s = l.value;
      return s && (s instanceof HTMLElement ? s : s.$el);
    });
    function o() {
      return r || (r = $s(n.value, {
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
      ee(() => t.active, (s) => {
        s && n.value ? o().activate() : r && (r.deactivate(), (!n.value || n.value.nodeType === Node.COMMENT_NODE) && (r = null));
      }, { immediate: !0, flush: "post" });
    }), fe(() => {
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
        const s = e.default().filter((u) => u.type !== Ja);
        return !s || !s.length || s.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), s) : el(s[0], { ref: l });
      }
    };
  }
}), Xs = ["aria-labelledby", "role", "open"], Ws = { class: "fr-container fr-container--fluid fr-container-md" }, Us = { class: "fr-grid-row fr-grid-row--center" }, Ys = { class: "fr-modal__body" }, Zs = { class: "fr-modal__header" }, Js = ["title"], eu = { class: "fr-modal__content" }, tu = ["id"], au = {
  key: 0,
  class: "fr-modal__footer"
}, Ut = 2, lu = /* @__PURE__ */ B({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => U("modal", "dialog") },
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
    const a = t, r = e, l = (x) => {
      x.key === "Escape" && v();
    }, n = k(() => a.isAlert ? "alertdialog" : "dialog"), o = R(null), s = R();
    ee(() => a.opened, (x) => {
      var L, b;
      x ? ((L = s.value) == null || L.showModal(), setTimeout(() => {
        var T;
        (T = o.value) == null || T.focus();
      }, 100)) : (b = s.value) == null || b.close(), u(x);
    });
    function u(x) {
      typeof window < "u" && document.body.classList.toggle("modal-open", x);
    }
    oe(() => {
      d(), u(a.opened);
    }), nl(() => {
      p(), u(!1);
    });
    function d() {
      document.addEventListener("keydown", l);
    }
    function p() {
      document.removeEventListener("keydown", l);
    }
    async function v() {
      var x;
      await ta(), (x = a.origin) == null || x.focus(), r("close");
    }
    const _ = k(() => typeof a.icon == "string" && a.icon.startsWith("fr-icon-")), D = k(
      () => _.value ? void 0 : typeof a.icon == "string" ? { name: a.icon, scale: Ut } : { scale: Ut, ...a.icon ?? {} }
    );
    return (x, L) => x.opened ? (i(), F(j(Ks), { key: 0 }, {
      default: Q(() => {
        var b, T;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: s,
            "aria-labelledby": x.modalId,
            role: n.value,
            class: S(["fr-modal", { "fr-modal--opened": x.opened }]),
            open: x.opened
          }, [
            c("div", Ws, [
              c("div", Us, [
                c("div", {
                  class: S(["fr-col-12", {
                    "fr-col-md-8": x.size === "lg",
                    "fr-col-md-6": x.size === "md",
                    "fr-col-md-4": x.size === "sm"
                  }])
                }, [
                  c("div", Ys, [
                    c("div", Zs, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: o,
                        class: "fr-btn fr-btn--close",
                        title: x.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: L[0] || (L[0] = (N) => v())
                      }, [
                        c("span", null, m(x.closeButtonLabel), 1)
                      ], 8, Js)
                    ]),
                    c("div", eu, [
                      c("h1", {
                        id: x.modalId,
                        class: "fr-modal__title"
                      }, [
                        _.value || D.value ? (i(), f("span", {
                          key: 0,
                          class: S({
                            [String(x.icon)]: _.value
                          })
                        }, [
                          x.icon && D.value ? (i(), F(ae, ie(O({ key: 0 }, D.value)), null, 16)) : y("", !0)
                        ], 2)) : y("", !0),
                        M(" " + m(x.title), 1)
                      ], 8, tu),
                      E(x.$slots, "default", {}, void 0, !0)
                    ]),
                    (b = x.actions) != null && b.length || x.$slots.footer ? (i(), f("div", au, [
                      E(x.$slots, "footer", {}, void 0, !0),
                      (T = x.actions) != null && T.length ? (i(), F($e, {
                        key: 0,
                        align: "right",
                        buttons: x.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : y("", !0)
                    ])) : y("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, Xs)
        ];
      }),
      _: 3
    })) : y("", !0);
  }
}), Ma = /* @__PURE__ */ le(lu, [["__scopeId", "data-v-d11515b3"]]), ru = ["id", "aria-current"], nu = /* @__PURE__ */ B({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => U("nav", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-nav__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      E(e.$slots, "default", {}, void 0, !0)
    ], 8, ru));
  }
}), Fa = /* @__PURE__ */ le(nu, [["__scopeId", "data-v-5909c19f"]]), ou = ["href"], Yt = 2, Ge = /* @__PURE__ */ B({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => U("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(t) {
    const e = t, a = k(() => typeof e.to == "string" && e.to.startsWith("http")), r = k(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), l = k(
      () => r.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: Yt, name: e.icon } : { scale: Yt, ...e.icon || {} }
    ), n = tl() ? Re(mt) : void 0, o = (n == null ? void 0 : n()) ?? (() => {
    });
    return (s, u) => {
      const d = se("RouterLink");
      return a.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: s.to,
        onClick: u[0] || (u[0] = (p) => {
          s.$emit("toggleId", s.id), s.onClick(p);
        })
      }, m(s.text), 9, ou)) : (i(), F(d, {
        key: 1,
        class: S(["fr-nav__link", {
          [String(s.icon)]: r.value
        }]),
        "data-testid": "nav-router-link",
        to: s.to,
        onClick: u[1] || (u[1] = (p) => {
          var v;
          j(o)(), s.$emit("toggleId", s.id), (v = s.onClick) == null || v.call(s, p);
        })
      }, {
        default: Q(() => [
          s.icon && l.value ? (i(), F(ae, ie(O({ key: 0 }, l.value)), null, 16)) : y("", !0),
          M(" " + m(s.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), iu = { class: "fr-col-12 fr-col-lg-3" }, su = { class: "fr-mega-menu__category" }, uu = { class: "fr-mega-menu__list" }, La = /* @__PURE__ */ B({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(t) {
    return (e, a) => (i(), f("div", iu, [
      c("h5", su, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: a[0] || (a[0] = W(() => {
          }, ["prevent"]))
        }, m(e.title), 1)
      ]),
      c("ul", uu, [
        (i(!0), f(V, null, z(e.links, (r, l) => (i(), f("li", {
          key: l,
          class: "fr-nav__link"
        }, [
          G(Ge, O({ ref_for: !0 }, r), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), du = ["aria-expanded", "aria-current", "aria-controls"], cu = ["id"], fu = { class: "fr-container fr-container--fluid fr-container-lg" }, pu = { class: "fr-grid-row fr-grid-row-lg--gutters" }, vu = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, mu = { class: "fr-mega-menu__leader" }, gu = { class: "fr-h4 fr-mb-2v" }, bu = { class: "fr-hidden fr-displayed-lg" }, hu = /* @__PURE__ */ B({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => U("menu") },
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
    } = pe(), s = k(() => e.id === e.expandedId);
    return ee(s, (u, d) => {
      u !== d && n(u);
    }), oe(() => {
      s.value && n(!0);
    }), (u, d) => {
      const p = se("RouterLink");
      return i(), f(V, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": s.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: d[0] || (d[0] = (v) => u.$emit("toggleId", u.id))
        }, m(u.title), 9, du),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: a,
          "data-testid": "mega-menu-wrapper",
          class: S(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": j(l),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": j(r)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (v) => j(o)(s.value))
        }, [
          c("div", fu, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (v) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            c("div", pu, [
              c("div", vu, [
                c("div", mu, [
                  c("h4", gu, m(u.title), 1),
                  c("p", bu, [
                    M(m(u.description) + " ", 1),
                    E(u.$slots, "description", {}, void 0, !0)
                  ]),
                  G(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: Q(() => [
                      M(m(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              E(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(V, null, z(u.menus, (v, _) => (i(), F(La, O({
                key: _,
                ref_for: !0
              }, v), null, 16))), 128))
            ])
          ])
        ], 42, cu)
      ], 64);
    };
  }
}), Pa = /* @__PURE__ */ le(hu, [["__scopeId", "data-v-7e339b1d"]]), yu = ["id", "aria-current"], Na = /* @__PURE__ */ B({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => U("menu", "item") },
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      id: e.id,
      class: "fr-menu__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      E(e.$slots, "default")
    ], 8, yu));
  }
}), ku = ["aria-expanded", "aria-current", "aria-controls"], _u = ["id"], wu = { class: "fr-menu__list" }, Va = /* @__PURE__ */ B({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => U("menu") },
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
    } = pe(), s = k(() => e.id === e.expandedId);
    return ee(s, (u, d) => {
      u !== d && n(u);
    }), oe(() => {
      s.value && n(!0);
    }), (u, d) => (i(), f(V, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": s.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: d[0] || (d[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        c("span", null, m(u.title), 1)
      ], 8, ku),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: a,
        class: S(["fr-collapse fr-menu", { "fr-collapse--expanded": j(l), "fr-collapsing": j(r) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => j(o)(s.value))
      }, [
        c("ul", wu, [
          E(u.$slots, "default"),
          (i(!0), f(V, null, z(u.links, (p, v) => (i(), F(Na, { key: v }, {
            default: Q(() => [
              G(Ge, O({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (_) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, _u)
    ], 64));
  }
}), xu = ["id", "aria-label"], Du = { class: "fr-nav__list" }, Iu = /* @__PURE__ */ B({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => U("menu") },
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
    return oe(() => {
      document.addEventListener("click", n), document.addEventListener("keydown", o);
    }), fe(() => {
      document.removeEventListener("click", n), document.removeEventListener("keydown", o);
    }), (s, u) => (i(), f("nav", {
      id: s.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": s.label
    }, [
      c("ul", Du, [
        E(s.$slots, "default"),
        (i(!0), f(V, null, z(s.navItems, (d, p) => (i(), F(Fa, { key: p }, {
          default: Q(() => [
            d.to && d.text ? (i(), F(Ge, O({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": a.value,
              onToggleId: u[0] || (u[0] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), F(Va, O({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": a.value,
              onToggleId: u[1] || (u[1] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), F(Pa, O({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": a.value,
              onToggleId: u[2] || (u[2] = (v) => r(v))
            }), null, 16, ["expanded-id"])) : y("", !0)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ], 8, xu));
  }
}), Tu = { class: "fr-container" }, Cu = { class: "fr-notice__body" }, Bu = { class: "fr-notice__title" }, Eu = { class: "fr-notice__desc" }, Su = /* @__PURE__ */ B({
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
      class: S(["fr-notice", `fr-notice--${e.type}`])
    }, [
      c("div", Tu, [
        c("div", Cu, [
          c("p", null, [
            c("span", Bu, [
              E(e.$slots, "default", {}, () => [
                M(m(e.title), 1)
              ])
            ]),
            c("span", Eu, [
              E(e.$slots, "desc", {}, () => [
                M(m(e.desc), 1)
              ])
            ])
          ]),
          e.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: a[0] || (a[0] = (r) => e.$emit("close"))
          }, " Masquer le message ")) : y("", !0)
        ])
      ])
    ], 2));
  }
}), Au = ["aria-label"], Mu = { class: "fr-content-media__img" }, Fu = ["src", "alt", "title", "ratio"], Lu = { class: "fr-content-media__caption" }, Pu = /* @__PURE__ */ B({
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
      class: S(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      c("div", Mu, [
        E(e.$slots, "default", {}, () => [
          e.src ? (i(), f("img", {
            key: 0,
            src: e.src,
            class: S(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, Fu)) : y("", !0)
        ])
      ]),
      c("figcaption", Lu, m(e.legend), 1)
    ], 10, Au));
  }
}), Nu = { class: "fr-quote fr-quote--column" }, Vu = ["cite"], ju = { class: "fr-quote__author" }, Ru = { class: "fr-quote__source" }, Ou = ["href"], qu = {
  key: 0,
  class: "fr-quote__image"
}, Hu = ["src"], zu = /* @__PURE__ */ B({
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
    return (e, a) => (i(), f("figure", Nu, [
      e.source ? (i(), f("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        c("p", null, "« " + m(e.quote) + " »", 1)
      ], 8, Vu)) : y("", !0),
      c("figcaption", null, [
        c("p", ju, m(e.author), 1),
        c("ul", Ru, [
          c("li", null, [
            c("cite", null, m(e.source), 1)
          ]),
          (i(!0), f(V, null, z(e.details, (r, l) => (i(), f("li", { key: l }, [
            typeof r == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.url
            }, m(r.label), 9, Ou)) : (i(), f(V, { key: 1 }, [
              M(m(r), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (i(), f("div", qu, [
          c("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, Hu)
        ])) : y("", !0)
      ])
    ]));
  }
}), Qu = ["id", "name", "value", "checked", "disabled"], $u = ["for"], Gu = {
  key: 0,
  class: "required"
}, Ku = {
  key: 0,
  class: "fr-hint-text"
}, Xu = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Wu = ["src", "title"], Uu = { key: 0 }, Yu = ["href"], Zu = ["href"], Ju = ["href"], ja = /* @__PURE__ */ B({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => U("basic", "radio") },
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
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, r = k(() => !!e.img || !!e.svgPath);
    return (l, n) => (i(), f("div", {
      class: S(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: S(["fr-radio-group", {
          "fr-radio-rich": r.value,
          "fr-radio-group--sm": l.small
        }])
      }, [
        c("input", O({
          id: l.id,
          type: "radio",
          name: l.name,
          value: l.value,
          checked: l.modelValue === l.value,
          disabled: l.disabled
        }, l.$attrs, {
          onClick: n[0] || (n[0] = (o) => l.$emit("update:modelValue", l.value))
        }), null, 16, Qu),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          E(l.$slots, "label", {}, () => [
            M(m(l.label) + " ", 1),
            E(l.$slots, "required-tip", {}, () => [
              l.$attrs.required ? (i(), f("span", Gu, " *")) : y("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", Ku, m(l.hint), 1)) : y("", !0)
        ], 8, $u),
        l.img || l.svgPath ? (i(), f("div", Xu, [
          l.img ? (i(), f("img", {
            key: 0,
            src: l.img,
            class: "fr-artwork",
            alt: "",
            title: l.imgTitle
          }, null, 8, Wu)) : (i(), f("svg", O({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...a, ...l.svgAttrs }), [
            l.imgTitle ? (i(), f("title", Uu, m(l.imgTitle), 1)) : y("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${l.svgPath}#artwork-decorative`
            }, null, 8, Yu),
            c("use", {
              class: "fr-artwork-minor",
              href: `${l.svgPath}#artwork-minor`
            }, null, 8, Zu),
            c("use", {
              class: "fr-artwork-major",
              href: `${l.svgPath}#artwork-major`
            }, null, 8, Ju)
          ], 16))
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), ed = { class: "fr-form-group" }, td = ["disabled", "aria-labelledby", "aria-invalid", "role"], ad = ["id"], ld = {
  key: 0,
  class: "fr-hint-text"
}, rd = {
  key: 0,
  class: "required"
}, nd = ["id"], od = /* @__PURE__ */ B({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => U("radio-button", "group") },
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
    const a = t, r = e, l = k(() => a.errorMessage || a.validMessage), n = k(() => a.errorMessage ? "fr-error-text" : "fr-valid-text"), o = (u) => {
      u !== a.modelValue && r("update:modelValue", u);
    }, s = k(() => l.value ? `${a.titleId} messages-${a.titleId}` : a.titleId);
    return (u, d) => (i(), f("div", ed, [
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
          E(u.$slots, "legend", {}, () => [
            M(m(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", ld, [
              E(u.$slots, "hint", {}, () => [
                M(m(u.hint), 1)
              ])
            ])) : y("", !0),
            E(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", rd, " *")) : y("", !0)
            ])
          ])
        ], 8, ad)) : y("", !0),
        E(u.$slots, "default", {}, () => [
          (i(!0), f(V, null, z(u.options, (p, v) => (i(), F(ja, O({
            key: typeof p.value == "boolean" ? v : p.value || v,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": d[0] || (d[0] = (_) => o(_))
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
            class: S(["fr-message fr-message--info flex items-center", n.value])
          }, m(l.value), 3)
        ], 8, nd)) : y("", !0)
      ], 10, td)
    ]));
  }
}), id = ["id"], sd = ["id"], ud = { class: "fr-hint-text" }, dd = ["data-fr-prefix", "data-fr-suffix"], cd = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], fd = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], pd = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, vd = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, md = ["id"], gd = ["id"], bd = /* @__PURE__ */ B({
  __name: "DsfrRange",
  props: {
    id: { default: () => U("range") },
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
    const a = t, r = e, l = R(), n = R(), o = R(), s = k(() => a.lowerValue !== void 0), u = k(() => a.lowerValue === void 0 ? `transform: translateX(${(a.modelValue - a.min) / (a.max - a.min) * o.value}px) translateX(-${a.modelValue}%);` : `transform: translateX(${(a.modelValue + a.lowerValue - a.min) / 2 / (a.max - a.min) * o.value}px) translateX(-${a.lowerValue + (a.modelValue - a.lowerValue) / 2}%);`), d = k(() => {
      const v = (a.modelValue - a.min) / (a.max - a.min) * o.value - (s.value ? 12 : 0), _ = ((a.lowerValue ?? 0) - a.min) / (a.max - a.min) * o.value;
      return {
        "--progress-right": `${v + 24}px`,
        ...s.value ? { "--progress-left": `${_ + 12}px` } : {}
      };
    });
    ee([() => a.modelValue, () => a.lowerValue], ([v, _]) => {
      _ !== void 0 && (s.value && v < _ && r("update:lowerValue", v), s.value && _ > v && r("update:modelValue", _));
    });
    const p = k(() => (a.prefix ?? "").concat(s.value ? `${a.lowerValue} - ` : "").concat(`${a.modelValue}`).concat(a.suffix ?? ""));
    return oe(() => {
      var v;
      o.value = (v = l.value) == null ? void 0 : v.offsetWidth;
    }), (v, _) => (i(), f("div", {
      id: `${v.id}-group`,
      class: S(["fr-range-group", { "fr-range-group--error": v.message }])
    }, [
      c("label", {
        id: `${v.id}-label`,
        class: "fr-label"
      }, [
        E(v.$slots, "label", {}, () => [
          M(m(v.label), 1)
        ]),
        c("span", ud, [
          E(v.$slots, "hint", {}, () => [
            M(m(v.hint), 1)
          ])
        ])
      ], 8, sd),
      c("div", {
        class: S(["fr-range", {
          "fr-range--sm": v.small,
          "fr-range--double": s.value,
          "fr-range-group--disabled": v.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": v.prefix ?? void 0,
        "data-fr-suffix": v.suffix ?? void 0,
        style: ue(d.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: n,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: ue(u.value)
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
          onInput: _[0] || (_[0] = (D) => {
            var x;
            return r("update:lowerValue", +((x = D.target) == null ? void 0 : x.value));
          })
        }, null, 40, cd)) : y("", !0),
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
          onInput: _[1] || (_[1] = (D) => {
            var x;
            return r("update:modelValue", +((x = D.target) == null ? void 0 : x.value));
          })
        }, null, 40, fd),
        v.hideIndicators ? y("", !0) : (i(), f("span", pd, m(v.min), 1)),
        v.hideIndicators ? y("", !0) : (i(), f("span", vd, m(v.max), 1))
      ], 14, dd),
      v.message || v.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${v.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        E(v.$slots, "messages", {}, () => [
          v.message ? (i(), f("p", {
            key: 0,
            id: `${v.id}-message-error`,
            class: "fr-message fr-message--error"
          }, m(v.message), 9, gd)) : y("", !0)
        ])
      ], 8, md)) : y("", !0)
    ], 10, id));
  }
}), hd = { class: "fr-segmented__element" }, yd = ["id", "name", "value", "checked", "disabled", "aria-disabled"], kd = ["for"], _d = { key: 1 }, Ra = /* @__PURE__ */ B({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => U("basic", "checkbox") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, a = k(() => typeof e.icon == "string" ? { name: e.icon } : e.icon), r = k(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : "");
    return (l, n) => (i(), f("div", hd, [
      c("input", O({
        id: l.id,
        type: "radio",
        name: l.name,
        value: l.value,
        checked: l.modelValue === l.value,
        disabled: l.disabled,
        "aria-disabled": l.disabled
      }, l.$attrs, {
        onClick: n[0] || (n[0] = (o) => l.$emit("update:modelValue", l.value))
      }), null, 16, yd),
      c("label", {
        for: l.id,
        class: S(["fr-label", { [r.value]: r.value }])
      }, [
        l.icon && !r.value ? (i(), F(ae, ie(O({ key: 0 }, a.value)), null, 16)) : y("", !0),
        l.icon ? (i(), f("span", _d, " ")) : y("", !0),
        M(" " + m(l.label), 1)
      ], 10, kd)
    ]));
  }
}), wd = { class: "fr-form-group" }, xd = ["disabled"], Dd = ["id"], Id = {
  key: 0,
  class: "fr-hint-text"
}, Td = { class: "fr-segmented__elements" }, Cd = /* @__PURE__ */ B({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => U("radio-button", "group") },
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
    return (n, o) => (i(), f("div", wd, [
      c("fieldset", {
        class: S(["fr-segmented", {
          "fr-segmented--sm": n.small,
          "fr-segmented--no-legend": !n.legend
        }]),
        disabled: n.disabled
      }, [
        n.legend ? (i(), f("legend", {
          key: 0,
          id: n.titleId,
          class: S(["fr-segmented__legend", {
            "fr-segmented__legend--inline": n.inline
          }])
        }, [
          E(n.$slots, "legend", {}, () => [
            M(m(n.legend), 1)
          ]),
          n.hint ? (i(), f("span", Id, m(n.hint), 1)) : y("", !0)
        ], 10, Dd)) : y("", !0),
        c("div", Td, [
          E(n.$slots, "default", {}, () => [
            (i(!0), f(V, null, z(n.options, (s, u) => (i(), F(Ra, O({
              key: s.value || u,
              name: n.name || s.name,
              ref_for: !0
            }, { ...s, disabled: n.disabled || s.disabled }, {
              "model-value": n.modelValue,
              "onUpdate:modelValue": o[0] || (o[0] = (d) => l(d))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, xd)
    ]));
  }
}), Bd = ["for"], Ed = {
  key: 0,
  class: "required"
}, Sd = {
  key: 0,
  class: "fr-hint-text"
}, Ad = ["id", "name", "disabled", "aria-disabled", "required"], Md = ["selected"], Fd = ["selected", "value", "disabled", "aria-disabled"], Ld = ["id"], Pd = /* @__PURE__ */ B({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => U("select") },
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
    const e = t, a = k(() => e.errorMessage || e.successMessage), r = k(() => e.errorMessage ? "error" : "valid");
    return (l, n) => (i(), f("div", {
      class: S(["fr-select-group", { [`fr-select-group--${r.value}`]: a.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        E(l.$slots, "label", {}, () => [
          M(m(l.label) + " ", 1),
          E(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", Ed, " *")) : y("", !0)
          ])
        ]),
        l.description ? (i(), f("span", Sd, m(l.description), 1)) : y("", !0)
      ], 8, Bd),
      c("select", O({
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
        }, m(l.defaultUnselectedText), 9, Md),
        (i(!0), f(V, null, z(l.options, (o, s) => (i(), f("option", {
          key: s,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, m(typeof o == "object" ? o.text : o), 9, Fd))), 128))
      ], 16, Ad),
      a.value ? (i(), f("p", {
        key: 0,
        id: `select-${r.value}-desc-${r.value}`,
        class: S(`fr-${r.value}-text`)
      }, m(a.value), 11, Ld)) : y("", !0)
    ], 2));
  }
}), Nd = { class: "fr-share" }, Vd = { class: "fr-share__title" }, jd = { class: "fr-btns-group" }, Rd = ["title", "href", "onClick"], Od = { key: 0 }, qd = ["href", "title"], Hd = ["title"], zd = /* @__PURE__ */ B({
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
      return i(), f("div", Nd, [
        c("p", Vd, m(r.title), 1),
        c("ul", jd, [
          (i(!0), f(V, null, z(r.networks, (o, s) => (i(), f("li", { key: s }, [
            c("a", {
              class: S(`fr-btn fr-btn--${o.name}`),
              title: `${o.label} - nouvelle fenêtre`,
              href: o.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: W((u) => a(o), ["prevent"])
            }, m(o.label), 11, Rd)
          ]))), 128)),
          (n = r.mail) != null && n.to ? (i(), f("li", Od, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: r.mail.to,
              title: r.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, m(r.mail.label), 9, qd)
          ])) : y("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: r.copyLabel,
              onClick: l[0] || (l[0] = (o) => e())
            }, m(r.copyLabel), 9, Hd)
          ])
        ])
      ]);
    };
  }
}), Qd = ["aria-current", "aria-expanded", "aria-controls"], Oa = /* @__PURE__ */ B({
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
      E(e.$slots, "default")
    ], 8, Qd));
  }
}), qa = /* @__PURE__ */ B({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("li", {
      class: S(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      E(e.$slots, "default")
    ], 2));
  }
}), $d = ["id"], Gd = { class: "fr-sidemenu__list" }, Ha = /* @__PURE__ */ B({
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
    } = pe();
    ee(() => e.expanded, (p, v) => {
      p !== v && n(p);
    }), oe(() => {
      e.expanded && n(!0);
    });
    const s = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => s(p) ? "a" : "RouterLink", d = (p) => ({ [s(p) ? "href" : "to"]: p });
    return (p, v) => {
      const _ = se("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: a,
        class: S({
          "fr-collapse": p.collapsable,
          "fr-collapsing": j(r),
          "fr-collapse--expanded": j(l)
        }),
        onTransitionend: v[2] || (v[2] = (D) => j(o)(!!p.expanded))
      }, [
        c("ul", Gd, [
          E(p.$slots, "default"),
          (i(!0), f(V, null, z(p.menuItems, (D, x) => (i(), F(qa, {
            key: x,
            active: D.active
          }, {
            default: Q(() => [
              D.menuItems ? y("", !0) : (i(), F(te(u(D.to)), O({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": D.active ? "page" : void 0,
                ref_for: !0
              }, d(D.to)), {
                default: Q(() => [
                  M(m(D.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              D.menuItems ? (i(), f(V, { key: 1 }, [
                G(Oa, {
                  active: !!D.active,
                  expanded: !!D.expanded,
                  "control-id": D.id,
                  onToggleExpand: v[0] || (v[0] = (L) => p.$emit("toggleExpand", L))
                }, {
                  default: Q(() => [
                    M(m(D.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                D.menuItems ? (i(), F(_, {
                  key: 0,
                  id: D.id,
                  collapsable: "",
                  expanded: D.expanded,
                  "menu-items": D.menuItems,
                  onToggleExpand: v[1] || (v[1] = (L) => p.$emit("toggleExpand", L))
                }, null, 8, ["id", "expanded", "menu-items"])) : y("", !0)
              ], 64)) : y("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, $d);
    };
  }
}), Kd = ["aria-labelledby"], Xd = { class: "fr-sidemenu__inner" }, Wd = ["aria-controls", "aria-expanded"], Ud = ["id"], Yd = { class: "fr-sidemenu__title" }, Zd = /* @__PURE__ */ B({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => U("sidemenu") },
    sideMenuListId: { default: () => U("sidemenu", "list") },
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
    } = pe(), o = R(!1);
    return ee(o, (s, u) => {
      s !== u && l(s);
    }), (s, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": s.id
    }, [
      c("div", Xd, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": s.id,
          "aria-expanded": o.value,
          onClick: u[0] || (u[0] = W((d) => o.value = !o.value, ["prevent", "stop"]))
        }, m(s.buttonLabel), 9, Wd),
        c("div", {
          id: s.id,
          ref_key: "collapse",
          ref: e,
          class: S(["fr-collapse", {
            "fr-collapse--expanded": j(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": j(a)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => j(n)(o.value))
        }, [
          c("div", Yd, m(s.headingTitle), 1),
          E(s.$slots, "default", {}, () => [
            G(Ha, {
              id: s.sideMenuListId,
              "menu-items": s.menuItems,
              onToggleExpand: u[1] || (u[1] = (d) => s.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Ud)
      ])
    ], 8, Kd));
  }
}), Jd = /* @__PURE__ */ B({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(t) {
    const e = t, a = k(() => typeof e.to == "string" && e.to.startsWith("http")), r = k(() => a.value ? "a" : "RouterLink"), l = k(() => ({ [a.value ? "href" : "to"]: e.to }));
    return (n, o) => (i(), F(te(r.value), O({
      "aria-current": n.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, l.value), {
      default: Q(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), ec = { class: "fr-skiplinks" }, tc = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, ac = { class: "fr-skiplinks__list" }, lc = ["href", "onClick"], rc = /* @__PURE__ */ B({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(t) {
    const e = (a) => {
      const r = document.getElementById(a);
      r == null || r.focus();
    };
    return (a, r) => (i(), f("div", ec, [
      c("nav", tc, [
        c("ul", ac, [
          (i(!0), f(V, null, z(a.links, (l) => (i(), f("li", {
            key: l.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${l.id}`,
              onClick: W((n) => e(l.id), ["prevent"])
            }, m(l.text), 9, lc)
          ]))), 128))
        ])
      ])
    ]));
  }
}), nc = { class: "fr-stepper" }, oc = { class: "fr-stepper__title" }, ic = { class: "fr-stepper__state" }, sc = ["data-fr-current-step", "data-fr-steps"], uc = { class: "fr-stepper__details" }, dc = {
  key: 0,
  class: "fr-text--bold"
}, cc = /* @__PURE__ */ B({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(t) {
    return (e, a) => (i(), f("div", nc, [
      c("h2", oc, [
        M(m(e.steps[e.currentStep - 1]) + " ", 1),
        c("span", ic, "Étape " + m(e.currentStep) + " sur " + m(e.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, sc),
      c("p", uc, [
        e.currentStep < e.steps.length ? (i(), f("span", dc, "Étape suivante :")) : y("", !0),
        M(" " + m(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), fc = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, pc = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, vc = { class: "fr-summary__list" }, mc = ["href"], gc = /* @__PURE__ */ B({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("nav", fc, [
      c("h2", pc, m(e.title), 1),
      c("ol", vc, [
        (i(!0), f(V, null, z(e.anchors, (r, l) => (i(), f("li", { key: l }, [
          c("a", {
            class: "fr-summary__link",
            href: r.link
          }, m(r.name), 9, mc)
        ]))), 128))
      ])
    ]));
  }
}), bc = ["id", "aria-labelledby", "tabindex"], hc = /* @__PURE__ */ B({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(t) {
    ea((u) => ({
      "7152af7e": o.value,
      "2a62e962": s.value
    }));
    const e = t, a = { true: "100%", false: "-100%" }, r = Re(qe), { isVisible: l, asc: n } = r(Oe(() => e.tabId)), o = k(() => a[String(n == null ? void 0 : n.value)]), s = k(() => a[String(!(n != null && n.value))]);
    return (u, d) => (i(), F(ol, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: Q(() => [
        me(c("div", {
          id: u.panelId,
          class: S(["fr-tabs__panel", {
            "fr-tabs__panel--selected": j(l)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: j(l) ? 0 : -1
        }, [
          E(u.$slots, "default", {}, void 0, !0)
        ], 10, bc), [
          [Zt, j(l)]
        ])
      ]),
      _: 3
    }));
  }
}), za = /* @__PURE__ */ le(hc, [["__scopeId", "data-v-5774b16c"]]), yc = { role: "presentation" }, kc = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], _c = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Qa = /* @__PURE__ */ B({
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
    function o(d) {
      const p = d == null ? void 0 : d.key, v = n[p];
      v && r(v);
    }
    const s = Re(qe), { isVisible: u } = s(Oe(() => a.tabId));
    return (d, p) => (i(), f("li", yc, [
      c("button", {
        id: d.tabId,
        ref_key: "button",
        ref: l,
        "data-testid": `test-${d.tabId}`,
        class: "fr-tabs__tab",
        tabindex: j(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": j(u),
        "aria-controls": d.panelId,
        onClick: p[0] || (p[0] = W((v) => d.$emit("click", d.tabId), ["prevent"])),
        onKeydown: p[1] || (p[1] = (v) => o(v))
      }, [
        d.icon ? (i(), f("span", _c, [
          G(ae, { name: d.icon }, null, 8, ["name"])
        ])) : y("", !0),
        E(d.$slots, "default")
      ], 40, kc)
    ]));
  }
}), $a = /* @__PURE__ */ B({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(t) {
    const e = t, a = k(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), r = k(() => a.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (l, n) => (i(), f("th", O(l.headerAttrs, { scope: "col" }), [
      M(m(l.header) + " ", 1),
      l.icon && !a.value ? (i(), F(ae, ie(O({ key: 0 }, r.value)), null, 16)) : y("", !0),
      a.value ? (i(), f("span", {
        key: 1,
        class: S({ [String(l.icon)]: a.value })
      }, null, 2)) : y("", !0)
    ], 16));
  }
}), wc = { key: 0 }, Ga = /* @__PURE__ */ B({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(t) {
    return (e, a) => e.headers ? (i(), f("tr", wc, [
      (i(!0), f(V, null, z(e.headers, (r, l) => (i(), F($a, {
        key: l,
        header: (typeof r == "object" ? r : {}).text || r,
        "header-attrs": r.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : y("", !0);
  }
}), Ka = /* @__PURE__ */ B({
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
    const e = t, a = k(() => typeof e.field == "object" && e.field !== null && e.field.component ? e.field.component : !1), r = k(() => ["string", "number", "boolean"].includes(typeof e.field));
    return (l, n) => (i(), f("td", ie(pt(l.cellAttrs)), [
      a.value ? (i(), F(te(a.value), ie(O({ key: 0 }, typeof l.field == "object" ? l.field : {})), {
        default: Q(() => [
          M(m(l.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(V, { key: 1 }, [
        M(m(r.value ? l.field : l.field.text), 1)
      ], 64))
    ], 16));
  }
}), Xa = /* @__PURE__ */ B({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(t) {
    return (e, a) => (i(), f("tr", ie(pt(e.rowAttrs)), [
      E(e.$slots, "default"),
      (i(!0), f(V, null, z(e.rowData, (r, l) => (i(), F(Ka, {
        key: l,
        field: r ?? "",
        "cell-attrs": typeof r == "object" && r !== null && !r.component ? r.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), xc = { class: "caption" }, Dc = { key: 1 }, Ic = ["colspan"], Tc = { class: "flex justify-right" }, Cc = { class: "self-center" }, Bc = ["value"], Ec = { class: "flex ml-1" }, Sc = { class: "self-center" }, Ac = { class: "flex ml-1" }, Mc = /* @__PURE__ */ B({
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
    const a = t, r = e, l = (b) => Array.isArray(b) ? b : b.rowData, n = R(a.currentPage), o = R(a.resultsDisplayed), s = R(
      a.rows.length > o.value ? Math.ceil(a.rows.length / o.value) : 1
    ), u = [5, 10, 25, 50, 100], d = () => n.value * o.value - o.value, p = () => n.value * o.value;
    ee(
      () => o.value,
      (b) => {
        s.value = a.rows.length > o.value ? Math.ceil(a.rows.length / b) : 1;
      }
    );
    const v = k(() => a.pagination ? a.rows.slice(d(), p()) : a.rows), _ = () => {
      n.value = 1, r("update:currentPage");
    }, D = () => {
      n.value > 1 && (n.value -= 1, r("update:currentPage"));
    }, x = () => {
      n.value < s.value && (n.value += 1, r("update:currentPage"));
    }, L = () => {
      n.value = s.value, r("update:currentPage");
    };
    return (b, T) => (i(), f("div", {
      class: S(["fr-table", { "fr-table--no-caption": b.noCaption }])
    }, [
      c("table", null, [
        c("caption", xc, m(b.title), 1),
        c("thead", null, [
          E(b.$slots, "header", {}, () => [
            b.headers && b.headers.length ? (i(), F(Ga, {
              key: 0,
              headers: b.headers
            }, null, 8, ["headers"])) : y("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          E(b.$slots, "default", {}, void 0, !0),
          b.rows && b.rows.length ? (i(!0), f(V, { key: 0 }, z(v.value, (N, H) => (i(), F(Xa, {
            key: b.rowKey && l(N) ? typeof b.rowKey == "string" ? l(N)[b.headers.indexOf(b.rowKey)].toString() : b.rowKey(l(N)) : H,
            "row-data": l(N),
            "row-attrs": "rowAttrs" in N ? N.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : y("", !0),
          b.pagination ? (i(), f("tr", Dc, [
            c("td", {
              colspan: b.headers.length
            }, [
              c("div", Tc, [
                c("div", Cc, [
                  T[6] || (T[6] = c("span", null, "Résultats par page : ", -1)),
                  me(c("select", {
                    "onUpdate:modelValue": T[0] || (T[0] = (N) => o.value = N),
                    onChange: T[1] || (T[1] = (N) => r("update:currentPage"))
                  }, [
                    (i(), f(V, null, z(u, (N, H) => c("option", {
                      key: H,
                      value: N
                    }, m(N), 9, Bc)), 64))
                  ], 544), [
                    [aa, o.value]
                  ])
                ]),
                c("div", Ec, [
                  c("span", Sc, "Page " + m(n.value) + " sur " + m(s.value), 1)
                ]),
                c("div", Ac, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: T[2] || (T[2] = (N) => _())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: T[3] || (T[3] = (N) => D())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (N) => x())
                  }),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: T[5] || (T[5] = (N) => L())
                  })
                ])
              ])
            ], 8, Ic)
          ])) : y("", !0)
        ])
      ])
    ], 2));
  }
}), Fc = /* @__PURE__ */ le(Mc, [["__scopeId", "data-v-3998acc8"]]), Lc = ["aria-label"], Pc = /* @__PURE__ */ B({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: e, emit: a }) {
    const r = t, l = a, n = R(!1), o = k({
      get: () => r.modelValue,
      set(A) {
        l("update:modelValue", A);
      }
    }), s = R(/* @__PURE__ */ new Map()), u = R(0);
    ft(qe, (A) => {
      const q = R(!0);
      if (ee(o, (C, $) => {
        q.value = C > $;
      }), [...s.value.values()].includes(A.value))
        return { isVisible: k(() => s.value.get(o.value) === A.value), asc: q };
      const w = u.value++;
      s.value.set(w, A.value);
      const P = k(() => w === o.value);
      return ee(A, () => {
        s.value.set(w, A.value);
      }), fe(() => {
        s.value.delete(w);
      }), { isVisible: P };
    });
    const d = R(null), p = R(null), v = al({}), _ = (A) => {
      if (v[A])
        return v[A];
      const q = U("tab");
      return v[A] = q, q;
    }, D = async () => {
      const A = o.value === 0 ? r.tabTitles.length - 1 : o.value - 1;
      n.value = !1, o.value = A;
    }, x = async () => {
      const A = o.value === r.tabTitles.length - 1 ? 0 : o.value + 1;
      n.value = !0, o.value = A;
    }, L = async () => {
      o.value = 0;
    }, b = async () => {
      o.value = r.tabTitles.length - 1;
    }, T = R({ "--tabs-height": "100px" }), N = () => {
      var A;
      if (o.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const q = p.value.offsetHeight, w = (A = d.value) == null ? void 0 : A.querySelectorAll(".fr-tabs__panel")[o.value];
      if (!w || !w.offsetHeight)
        return;
      const P = w.offsetHeight;
      T.value["--tabs-height"] = `${q + P}px`;
    }, H = R(null);
    return oe(() => {
      var A;
      window.ResizeObserver && (H.value = new window.ResizeObserver(() => {
        N();
      })), (A = d.value) == null || A.querySelectorAll(".fr-tabs__panel").forEach((q) => {
        var w;
        q && ((w = H.value) == null || w.observe(q));
      });
    }), fe(() => {
      var A;
      (A = d.value) == null || A.querySelectorAll(".fr-tabs__panel").forEach((q) => {
        var w;
        q && ((w = H.value) == null || w.unobserve(q));
      });
    }), e({
      renderTabs: N,
      selectFirst: L,
      selectLast: b
    }), (A, q) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: ue(T.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": A.tabListName
      }, [
        E(A.$slots, "tab-items", {}, () => [
          (i(!0), f(V, null, z(A.tabTitles, (w, P) => (i(), F(Qa, {
            key: P,
            icon: w.icon,
            "panel-id": w.panelId || `${_(P)}-panel`,
            "tab-id": w.tabId || _(P),
            onClick: (C) => o.value = P,
            onNext: q[0] || (q[0] = (C) => x()),
            onPrevious: q[1] || (q[1] = (C) => D()),
            onFirst: q[2] || (q[2] = (C) => L()),
            onLast: q[3] || (q[3] = (C) => b())
          }, {
            default: Q(() => [
              M(m(w.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, Lc),
      (i(!0), f(V, null, z(A.tabContents, (w, P) => {
        var C, $, g, h;
        return i(), F(za, {
          key: P,
          "panel-id": (($ = (C = A.tabTitles) == null ? void 0 : C[P]) == null ? void 0 : $.panelId) || `${_(P)}-panel`,
          "tab-id": ((h = (g = A.tabTitles) == null ? void 0 : g[P]) == null ? void 0 : h.tabId) || _(P)
        }, {
          default: Q(() => [
            M(m(w), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      E(A.$slots, "default")
    ], 4));
  }
}), Nc = /* @__PURE__ */ B({
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
    const e = t, a = k(() => typeof e.link == "string" && e.link.startsWith("http")), r = k(() => e.link ? a.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" ? "button" : e.tagName), l = k(() => ({ [a.value ? "href" : "to"]: e.link })), n = k(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), o = e.small ? 0.65 : 0.9, s = k(() => n.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: o } : { scale: o, ...e.icon ?? {} });
    return (u, d) => (i(), F(te(r.value), O({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: n.value,
        "fr-tag--icon-left": n.value
      }],
      disabled: u.disabled
    }, l.value), {
      default: Q(() => [
        e.icon && !n.value ? (i(), F(ae, O({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: "fr-mr-1v"
        }, s.value), null, 16, ["label"])) : y("", !0),
        u.iconOnly ? y("", !0) : (i(), f(V, { key: 1 }, [
          M(m(u.label), 1)
        ], 64)),
        E(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class"]));
  }
}), Dt = /* @__PURE__ */ le(Nc, [["__scopeId", "data-v-f6a89dc8"]]), Vc = { class: "fr-tags-group" }, jc = /* @__PURE__ */ B({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] }
  },
  setup(t) {
    return (e, a) => (i(), f("ul", Vc, [
      (i(!0), f(V, null, z(e.tags, ({ icon: r, label: l, ...n }, o) => (i(), f("li", { key: o }, [
        G(Dt, O({ ref_for: !0 }, n, {
          icon: r,
          label: l
        }), null, 16, ["icon", "label"])
      ]))), 128))
    ]));
  }
}), Rc = { class: "fr-tile__body" }, Oc = { class: "fr-tile__content" }, qc = ["download", "href"], Hc = {
  key: 0,
  class: "fr-tile__desc"
}, zc = {
  key: 1,
  class: "fr-tile__detail"
}, Qc = {
  key: 2,
  class: "fr-tile__start"
}, $c = { class: "fr-tile__header" }, Gc = {
  key: 0,
  class: "fr-tile__pictogram"
}, Kc = ["src"], Xc = ["href"], Wc = ["href"], Uc = ["href"], Yc = /* @__PURE__ */ B({
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
    const e = t, a = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, r = k(() => typeof e.to == "string" && e.to.startsWith("http"));
    return (l, n) => {
      const o = se("RouterLink");
      return i(), f("div", {
        class: S(["fr-tile fr-enlarge-link", [{
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
        c("div", Rc, [
          c("div", Oc, [
            (i(), F(te(l.titleTag), { class: "fr-tile__title" }, {
              default: Q(() => [
                r.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: l.download,
                  href: l.disabled ? "" : l.to
                }, m(l.title), 9, qc)) : y("", !0),
                r.value ? y("", !0) : (i(), F(o, {
                  key: 1,
                  download: l.download,
                  class: "fr-tile__link",
                  to: l.disabled ? "" : l.to
                }, {
                  default: Q(() => [
                    M(m(l.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            l.description ? (i(), f("p", Hc, m(l.description), 1)) : y("", !0),
            l.details ? (i(), f("p", zc, m(l.details), 1)) : y("", !0),
            l.$slots["start-details"] ? (i(), f("div", Qc, [
              E(l.$slots, "start-details", {}, void 0, !0)
            ])) : y("", !0)
          ])
        ]),
        c("div", $c, [
          E(l.$slots, "header", {}, void 0, !0),
          l.imgSrc || l.svgPath ? (i(), f("div", Gc, [
            l.imgSrc ? (i(), f("img", {
              key: 0,
              src: l.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Kc)) : (i(), f("svg", O({
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
          ])) : y("", !0)
        ])
      ], 2);
    };
  }
}), Wa = /* @__PURE__ */ le(Yc, [["__scopeId", "data-v-f4d836a2"]]), Zc = { class: "fr-grid-row fr-grid-row--gutters" }, Jc = /* @__PURE__ */ B({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(t) {
    return (e, a) => (i(), f("div", Zc, [
      (i(!0), f(V, null, z(e.tiles, (r, l) => (i(), f("div", {
        key: l,
        class: S({
          [r.containerClass ?? "no-class"]: r.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !r.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        G(Wa, O({
          horizontal: e.horizontal,
          ref_for: !0
        }, r), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), ef = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby"], tf = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], af = ["id"], lf = /* @__PURE__ */ B({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => U("toggle") },
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
    const e = t, a = k(() => `${e.inputId}-hint-text`);
    return (r, l) => (i(), f("div", {
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
        "aria-describedby": a.value,
        onInput: l[0] || (l[0] = (n) => r.$emit("update:modelValue", n.target.checked))
      }, null, 40, ef),
      c("label", {
        id: a.value,
        class: "fr-toggle__label",
        for: r.inputId,
        "data-fr-checked-label": r.noText ? void 0 : r.activeText,
        "data-fr-unchecked-label": r.noText ? void 0 : r.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, m(r.label), 9, tf),
      r.hint ? (i(), f("p", {
        key: 0,
        id: `${r.inputId}-hint-text`,
        class: "fr-hint-text"
      }, m(r.hint), 9, af)) : y("", !0)
    ], 2));
  }
}), rf = ["id"], nf = /* @__PURE__ */ B({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => U("tooltip") }
  },
  setup(t) {
    const e = t, a = R(!1), r = R(null), l = R(null), n = R("0px"), o = R("0px"), s = R("0px"), u = R(!1), d = R(0);
    async function p() {
      var T, N, H, A, q, w;
      if (typeof document > "u" || !a.value)
        return;
      await new Promise((Z) => setTimeout(Z, 100));
      const P = (T = r.value) == null ? void 0 : T.getBoundingClientRect().top, C = (N = r.value) == null ? void 0 : N.offsetHeight, $ = (H = r.value) == null ? void 0 : H.offsetWidth, g = (A = r.value) == null ? void 0 : A.getBoundingClientRect().left, h = (q = l.value) == null ? void 0 : q.offsetHeight, I = (w = l.value) == null ? void 0 : w.offsetWidth, X = !(P - h < 0) && P + C + h >= document.documentElement.offsetHeight;
      u.value = X;
      const K = g + $ >= document.documentElement.offsetWidth, Y = g + $ / 2 - I / 2 <= 0;
      o.value = X ? `${P - h + 8}px` : `${P + C - 8}px`, d.value = 1, n.value = K ? `${g + $ - I - 4}px` : Y ? `${g + 4}px` : `${g + $ / 2 - I / 2}px`, s.value = K ? `${I / 2 - $ / 2 + 4}px` : Y ? `${-(I / 2) + $ / 2 - 4}px` : "0px";
    }
    ee(a, p, { immediate: !0 }), oe(() => {
      window.addEventListener("scroll", p);
    }), fe(() => {
      window.removeEventListener("scroll", p);
    });
    const v = k(() => `transform: translate(${n.value}, ${o.value}); --arrow-x: ${s.value}; opacity: ${d.value};'`), _ = k(() => ({
      "fr-tooltip--shown": a.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), D = (T) => {
      var N, H;
      a.value && (T.target === r.value || (N = r.value) != null && N.contains(T.target) || T.target === l.value || (H = l.value) != null && H.contains(T.target) || (a.value = !1));
    };
    oe(() => {
      document.documentElement.addEventListener("click", D);
    }), fe(() => {
      document.documentElement.removeEventListener("click", D);
    });
    const x = () => {
      e.onHover && (a.value = !0);
    }, L = () => {
      e.onHover && (a.value = !1);
    }, b = () => {
      e.onHover || (a.value = !a.value);
    };
    return (T, N) => (i(), f(V, null, [
      (i(), F(te(T.onHover ? "a" : "button"), {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: r,
        class: S(T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip"),
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: N[0] || (N[0] = (H) => b()),
        onMouseenter: N[1] || (N[1] = (H) => x()),
        onMouseleave: N[2] || (N[2] = (H) => L())
      }, {
        default: Q(() => [
          E(T.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 40, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: T.id,
        ref_key: "tooltip",
        ref: l,
        class: S(["fr-tooltip fr-placement", _.value]),
        style: ue(v.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, m(T.content), 15, rf)
    ], 64));
  }
}), of = /* @__PURE__ */ le(nf, [["__scopeId", "data-v-ae4d443e"]]), sf = { class: "fr-transcription" }, uf = ["aria-expanded", "aria-controls"], df = ["id"], cf = ["id", "aria-labelledby"], ff = { class: "fr-container fr-container--fluid fr-container-md" }, pf = { class: "fr-grid-row fr-grid-row--center" }, vf = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, mf = { class: "fr-modal__body" }, gf = { class: "fr-modal__header" }, bf = ["aria-controls"], hf = { class: "fr-modal__content" }, yf = ["id"], kf = { class: "fr-transcription__footer" }, _f = { class: "fr-transcription__actions-group" }, wf = ["aria-controls"], Ua = /* @__PURE__ */ B({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => U("transcription") },
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
    } = pe(), s = R(!1), u = R(!1), d = k(() => `fr-transcription__modal-${e.id}`), p = k(() => `fr-transcription__collapse-${e.id}`);
    return ee(u, (v, _) => {
      v !== _ && n(v);
    }), (v, _) => (i(), f("div", sf, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: _[0] || (_[0] = (D) => u.value = !u.value)
      }, " Transcription ", 8, uf),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: a,
        class: S(["fr-collapse", { "fr-collapse--expanded": j(l), "fr-collapsing": j(r) }]),
        onTransitionend: _[2] || (_[2] = (D) => j(o)(u.value))
      }, [
        c("dialog", {
          id: d.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${d.value}-title`
        }, [
          c("div", ff, [
            c("div", pf, [
              c("div", vf, [
                c("div", mf, [
                  c("div", gf, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": d.value,
                      title: "Fermer"
                    }, " Fermer ", 8, bf)
                  ]),
                  c("div", hf, [
                    c("h1", {
                      id: `${d.value}-title`,
                      class: "fr-modal__title"
                    }, m(v.title), 9, yf),
                    M(" " + m(v.content), 1)
                  ]),
                  c("div", kf, [
                    c("div", _f, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: _[1] || (_[1] = (D) => s.value = !0)
                      }, " Agrandir ", 8, wf)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, cf)
      ], 42, df),
      (i(), F(ll, { to: "body" }, [
        G(Ma, {
          title: v.title,
          opened: s.value,
          onClose: _[3] || (_[3] = (D) => s.value = !1)
        }, {
          default: Q(() => [
            E(v.$slots, "default", {}, () => [
              M(m(v.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), xf = ["src"], Df = { class: "fr-content-media__caption" }, If = /* @__PURE__ */ B({
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
        class: S(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        c("div", {
          class: S(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          c("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, xf)
        ], 2),
        c("div", Df, m(e.legend), 1)
      ], 2),
      G(Ua, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: pl,
  DsfrAccordionsGroup: ml,
  DsfrAlert: hl,
  DsfrBackToTop: yl,
  DsfrBadge: la,
  DsfrBreadcrumb: Tl,
  DsfrButton: Ce,
  DsfrButtonGroup: $e,
  DsfrCallout: Vr,
  DsfrCard: Yr,
  DsfrCardDetail: ot,
  DsfrCheckbox: wt,
  DsfrCheckboxSet: un,
  DsfrConsent: pn,
  DsfrDataTable: Xn,
  DsfrErrorPage: ao,
  DsfrFieldset: io,
  DsfrFileDownload: ka,
  DsfrFileDownloadList: po,
  DsfrFileUpload: ko,
  DsfrFollow: qo,
  DsfrFooter: bi,
  DsfrFooterLink: xa,
  DsfrFooterLinkList: _i,
  DsfrFooterPartners: Da,
  DsfrFranceConnect: Ii,
  DsfrHeader: fs,
  DsfrHeaderMenuLink: Ia,
  DsfrHeaderMenuLinks: ut,
  DsfrHighlight: ps,
  DsfrInput: xt,
  DsfrInputGroup: ys,
  DsfrLanguageSelector: it,
  DsfrLogo: Le,
  DsfrModal: Ma,
  DsfrNavigation: Iu,
  DsfrNavigationItem: Fa,
  DsfrNavigationMegaMenu: Pa,
  DsfrNavigationMegaMenuCategory: La,
  DsfrNavigationMenu: Va,
  DsfrNavigationMenuItem: Na,
  DsfrNavigationMenuLink: Ge,
  DsfrNewsLetter: _a,
  DsfrNotice: Su,
  DsfrPagination: ya,
  DsfrPicture: Pu,
  DsfrQuote: zu,
  DsfrRadioButton: ja,
  DsfrRadioButtonSet: od,
  DsfrRange: bd,
  DsfrSearchBar: st,
  DsfrSegmented: Ra,
  DsfrSegmentedSet: Cd,
  DsfrSelect: Pd,
  DsfrShare: zd,
  DsfrSideMenu: Zd,
  DsfrSideMenuButton: Oa,
  DsfrSideMenuLink: Jd,
  DsfrSideMenuList: Ha,
  DsfrSideMenuListItem: qa,
  DsfrSkipLinks: rc,
  DsfrSocialNetworks: wa,
  DsfrStepper: cc,
  DsfrSummary: gc,
  DsfrTabContent: za,
  DsfrTabItem: Qa,
  DsfrTable: Fc,
  DsfrTableCell: Ka,
  DsfrTableHeader: $a,
  DsfrTableHeaders: Ga,
  DsfrTableRow: Xa,
  DsfrTabs: Pc,
  DsfrTag: Dt,
  DsfrTags: jc,
  DsfrTile: Wa,
  DsfrTiles: Jc,
  DsfrToggleSwitch: lf,
  DsfrTooltip: of,
  DsfrTranscription: Ua,
  DsfrVideo: If,
  VIcon: ae,
  registerAccordionKey: vt,
  registerNavigationLinkKey: mt,
  registerTabKey: qe
}, Symbol.toStringTag, { value: "Module" })), Cf = {
  install: (t, { components: e } = {}) => {
    Object.entries(Tf).forEach(([a, r]) => {
      (e === void 0 || e === "all" || e.map(({ name: l }) => l).includes(a)) && t.component(a, r);
    }), t.component("VIcon", ae);
  }
}, Bf = {
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
}, Ef = ["href"], Sf = {
  __name: "RouterLink",
  props: ["to"],
  setup(t) {
    const e = t;
    return (a, r) => (i(), f("a", {
      href: e.to
    }, [
      E(a.$slots, "default")
    ], 8, Ef));
  }
}, Ya = (t, e) => {
  const a = t.__vccOpts || t;
  for (const [r, l] of e)
    a[r] = l;
  return a;
}, Af = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: wt, DsfrTag: Dt, DsfrButton: Ce },
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
}, Ff = { class: "fr-mb-1w" }, Lf = { key: 0 }, Pf = { class: "facet" }, Nf = { class: "flex justify-between w-full fr-mb-0" }, Vf = { class: "facet--count" }, jf = { key: 1 }, Rf = { class: "flex justify-between w-full" }, Of = { class: "facet--count" }, qf = { key: 0 }, Hf = { class: "facet" }, zf = { class: "flex justify-between w-full fr-mb-0" }, Qf = { class: "facet--count" }, $f = { key: 1 }, Gf = { class: "flex justify-between w-full" }, Kf = { class: "facet--count" }, Xf = { class: "fr-mb-2w" };
function Wf(t, e, a, r, l, n) {
  const o = se("DsfrTag"), s = se("DsfrCheckbox"), u = se("DsfrButton");
  return i(), f("div", null, [
    n.isAnyFacetValueSelected() ? (i(), f("div", Mf, [
      (i(!0), f(V, null, z(a.selectedFacets, (d, p) => (i(), f("div", { key: p }, [
        n.facetMultipleByCode(p) ? y("", !0) : (i(!0), f(V, { key: 0 }, z(d, (v) => (i(), F(o, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: v.code,
          onClick: (_) => t.$emit("toogle-facet", p, v, a.contextKey)
        }, {
          default: Q(() => [
            M(m(n.facetLabelByCode(p)) + ": " + m(n.facetValueLabelByCode(p, v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ]))), 128))
    ])) : y("", !0),
    (i(!0), f(V, null, z(a.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !n.isFacetSelected(d.code) ? (i(), f(V, { key: 0 }, [
        c("h6", Ff, m(d.label), 1),
        c("ul", null, [
          (i(!0), f(V, null, z(n.selectedInvisibleFacets(d.code), (p) => (i(), f(V, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", Lf, [
              c("div", Pf, [
                G(s, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", d.code, p.code, a.contextKey)
                }, {
                  label: Q(() => [
                    c("p", Nf, [
                      M(m(n.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", Vf, m(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", jf, [
              G(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", d.code, p.code, a.contextKey)
              }, {
                default: Q(() => [
                  c("span", Rf, [
                    M(m(n.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", Of, m(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("ul", null, [
          (i(!0), f(V, null, z(n.visibleFacets(d.code, d.values), (p) => (i(), f(V, {
            key: p.code
          }, [
            d.multiple ? (i(), f("li", qf, [
              c("div", Hf, [
                G(s, {
                  small: "",
                  modelValue: n.isFacetValueSelected(d.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (v) => t.$emit("toogle-facet", d.code, p.code, a.contextKey)
                }, {
                  label: Q(() => [
                    c("p", zf, [
                      M(m(n.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                      c("span", Qf, m(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", $f, [
              G(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (v) => t.$emit("toogle-facet", d.code, p.code, a.contextKey)
              }, {
                default: Q(() => [
                  c("span", Gf, [
                    M(m(n.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", Kf, m(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        c("div", Xf, [
          d.values.length > a.maxValues && !n.isFacetExpanded(d.code) ? (i(), F(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => n.expandFacet(d.code)
          }, {
            default: Q(() => [
              M(m(t.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : y("", !0),
          d.values.length > a.maxValues && n.isFacetExpanded(d.code) ? (i(), F(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => n.reduceFacet(d.code)
          }, {
            default: Q(() => [
              M(m(t.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : y("", !0)
        ])
      ], 64)) : y("", !0)
    ]))), 128))
  ]);
}
const Uf = /* @__PURE__ */ Ya(Af, [["render", Wf], ["__scopeId", "data-v-e1d6020e"]]), Yf = () => {
  const t = R(), e = R(!1), a = R(!1), r = () => {
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
        e.value = !0, r(), window.requestAnimationFrame(() => {
          a.value = o;
        });
      }));
    },
    adjust: r,
    onTransitionEnd: (o) => {
      e.value = !1, t.value && o === !1 && t.value.style.removeProperty("--collapse-max-height");
    }
  };
}, Zf = {
  class: "fr-label",
  for: "selectId"
}, Jf = {
  key: 0,
  class: "required"
}, ep = {
  key: 0,
  class: "fr-hint-text"
}, tp = ["id", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], ap = ["id"], lp = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, rp = ["id"], np = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, op = ["id"], ip = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, sp = {
  key: 0,
  class: "fr-hint-text"
}, up = {
  role: "listbox",
  class: "fr-select__ul"
}, dp = ["aria-selected"], cp = ["id", "value"], fp = ["for"], pp = ["id"], vp = /* @__PURE__ */ B({
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ De({
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => "id" },
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
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: n
    } = Yf(), o = t, s = R(!1), u = ce(t, "modelValue"), d = R(o.options);
    ee(s, (g, h) => {
      g !== h && l(g);
    });
    const p = R(null), v = R(null), _ = k(() => o.errorMessage || o.successMessage), D = k(() => o.errorMessage !== "" ? "error" : "valid"), x = k(() => o.modelValue.length === d.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), L = k(() => o.modelValue.length === d.value.length ? "Tout déselectionner" : "Tout sélectionner"), b = k(() => {
      let g = `${o.modelValue.length} options séléctionnées`;
      return o.modelValue.length > 2 ? g : o.options.filter((h) => o.modelValue.includes(h.value)).map((h) => h.text).join(", ");
    });
    let T = function() {
      if (o.modelValue.length >= d.value.length)
        o.modelValue.length = 0;
      else
        for (let g of d.value)
          o.modelValue.push(g.value);
    }, N = function(g) {
      const h = g.target.value.toLowerCase();
      d.value = o.options.filter((I) => I.text.toLowerCase().indexOf(h) > -1);
    }, H = function(g) {
      if (document.activeElement.id.startsWith("opt-")) {
        const h = Number(document.activeElement.id.split("-")[1]);
        h < d.value.length - 1 ? document.getElementById(`opt-${h + 1}`).focus() : q();
      } else
        q();
    }, A = function(g) {
      if (document.activeElement.id.startsWith("opt-")) {
        const h = Number(document.activeElement.id.split("-")[1]);
        h > 0 ? document.getElementById(`opt-${h - 1}`).focus() : w();
      } else
        w();
    }, q = function(g) {
      document.getElementById("opt-0").focus();
    }, w = function(g) {
      document.getElementById(`opt-${d.value.length - 1}`).focus();
    }, P = function(g) {
      g.shiftKey || (o.comboHasButton ? s.value || (s.value = !0, g.preventDefault(), setTimeout(() => p.value.focus(), 100)) : o.comboHasFilter && (s.value || (s.value = !0, g.preventDefault(), setTimeout(() => v.value.focus(), 100))));
    }, C = function(g) {
      g.shiftKey || ((o.comboHasButton && !o.comboHasFilter && document.activeElement.id === `${o.selectId}_button` || o.comboHasFilter && document.activeElement.id === `${o.selectId}_filter`) && (g.preventDefault(), s.value = !1), !o.comboHasFilter && !o.comboHasButton && (s.value = !1));
    }, $ = function(g) {
      document.activeElement.id.startsWith("opt-") && (o.comboHasFilter ? (g.preventDefault(), v.value.focus()) : o.comboHasButton && p.value.focus());
    };
    return (g, h) => (i(), f(V, null, [
      c("div", {
        class: S(["fr-select-group", { [`fr-select-group--${D.value}`]: _.value !== "" }])
      }, [
        c("label", Zf, [
          E(g.$slots, "label", {}, () => [
            M(m(g.label) + " ", 1),
            E(g.$slots, "required-tip", {}, () => [
              g.required ? (i(), f("span", Jf, " *")) : y("", !0)
            ], !0)
          ], !0),
          g.description ? (i(), f("span", ep, m(g.description), 1)) : y("", !0)
        ]),
        c("div", O({
          id: g.selectId,
          class: [{ [`fr-select--${D.value}`]: _.value !== "" }, "fr-input"],
          onClick: h[0] || (h[0] = W((I) => s.value = !s.value, ["prevent", "stop"])),
          onKeyup: [
            h[1] || (h[1] = re(W((I) => s.value = !1, ["stop"]), ["esc"])),
            h[2] || (h[2] = re(W((I) => s.value = !s.value, ["prevent"]), ["space"]))
          ],
          onKeydown: [
            h[3] || (h[3] = re(W(
              //@ts-ignore
              (...I) => j(q) && j(q)(...I),
              ["prevent"]
            ), ["down"])),
            h[4] || (h[4] = re(W(
              //@ts-ignore
              (...I) => j(w) && j(w)(...I),
              ["prevent"]
            ), ["up"])),
            h[5] || (h[5] = re(
              //@ts-ignore
              (...I) => j(P) && j(P)(...I),
              ["tab"]
            ))
          ],
          tabindex: "0",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-autocomplete": "none",
          "aria-disabled": g.disabled,
          "aria-controls": `${g.selectId}_list`,
          "aria-expanded": s.value,
          "aria-required": g.required
        }, g.$attrs), [
          c("p", null, m(b.value), 1)
        ], 16, tp),
        c("div", {
          id: `${g.selectId}_list`,
          ref_key: "collapse",
          ref: e,
          class: S(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": j(r), "fr-collapsing": j(a) }]),
          onKeyup: h[9] || (h[9] = re((I) => s.value = !1, ["esc"])),
          onKeydown: [
            h[10] || (h[10] = re(
              //@ts-ignore
              (...I) => j(C) && j(C)(...I),
              ["tab"]
            )),
            h[11] || (h[11] = re(W(
              //@ts-ignore
              (...I) => j(H) && j(H)(...I),
              ["prevent"]
            ), ["down"])),
            h[12] || (h[12] = re(W(
              //@ts-ignore
              (...I) => j(A) && j(A)(...I),
              ["prevent"]
            ), ["up"])),
            h[13] || (h[13] = re(W(
              //@ts-ignore
              (...I) => j($) && j($)(...I),
              ["shift"]
            ), ["tab"]))
          ],
          onTransitionend: h[14] || (h[14] = (I) => j(n)(s.value))
        }, [
          g.comboHasButton ? (i(), f("ul", lp, [
            c("li", null, [
              c("button", {
                class: S(["fr-btn fr-btn--tertiary", `${x.value}`]),
                id: `${g.selectId}_button`,
                onClick: h[6] || (h[6] = (I) => j(T)()),
                ref_key: "button",
                ref: p,
                type: "button"
              }, m(L.value), 11, rp)
            ])
          ])) : y("", !0),
          g.comboHasFilter ? (i(), f("div", np, [
            c("input", {
              class: "fr-input",
              id: `${g.selectId}_filter`,
              ref_key: "filter",
              ref: v,
              onInput: h[7] || (h[7] = //@ts-ignore
              (...I) => j(N) && j(N)(...I)),
              "aria-label": "Rechercher une option",
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, op)
          ])) : y("", !0),
          g.comboLabel ? (i(), f("p", ip, [
            M(m(g.comboLabel) + " ", 1),
            g.comboDescription ? (i(), f("span", sp, m(g.comboDescription), 1)) : y("", !0)
          ])) : y("", !0),
          c("ul", up, [
            (i(!0), f(V, null, z(d.value, (I, X) => (i(), f("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
              role: "option",
              "aria-selected": u.value.includes(I.value)
            }, [
              me(c("input", {
                id: `opt-${X}`,
                type: "checkbox",
                class: "",
                value: I.value,
                "onUpdate:modelValue": h[8] || (h[8] = (K) => u.value = K)
              }, null, 8, cp), [
                [ct, u.value]
              ]),
              c("label", {
                class: "fr-label",
                for: `opt-${X}`
              }, m(I.text), 9, fp)
            ], 8, dp))), 256))
          ])
        ], 42, ap)
      ], 2),
      _.value ? (i(), f("p", {
        key: 0,
        id: `select-${D.value}-desc-${D.value}`,
        class: S(`fr-${D.value}-text`)
      }, m(_.value), 11, pp)) : y("", !0)
    ], 64));
  }
}), mp = /* @__PURE__ */ Ya(vp, [["__scopeId", "data-v-6547ac2f"]]);
var gp = {
  install: function(t, e) {
    t.use(Cf), t.component("RouterLink", Sf), t.component("DsfrSelectMultiple", mp), t.component("DsfrFacets", Uf);
  },
  methods: Bf
};
window && (window.DSFR = gp);
export {
  gp as default
};
//# sourceMappingURL=dsfr.es.js.map
