var mr = Object.defineProperty;
var hr = (a, e, t) => e in a ? mr(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var Q = (a, e, t) => hr(a, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as V, h as ga, ref as G, computed as w, onMounted as ke, watch as ve, onUnmounted as Ce, Comment as en, cloneVNode as tn, createElementBlock as f, openBlock as u, normalizeClass as q, createBlock as j, resolveDynamicComponent as me, mergeProps as X, withModifiers as ne, withCtx as ee, createCommentVNode as y, createTextVNode as H, toDisplayString as b, createElementVNode as c, unref as Y, Fragment as Z, renderList as te, createVNode as re, withKeys as se, renderSlot as F, mergeModels as Re, useCssVars as Pt, useModel as De, withDirectives as Me, vModelCheckbox as Lt, useId as na, nextTick as an, normalizeStyle as Ie, Teleport as br, provide as $e, reactive as gr, normalizeProps as Ee, guardReactiveProps as Mt, inject as Ue, toRef as ft, useTemplateRef as yr, resolveComponent as xe, hasInjectionContext as kr, useSlots as ra, useAttrs as wr, vModelSelect as la, Transition as _r, vShow as Tr, onBeforeUnmount as xr, vModelText as ya, toHandlers as Dr } from "vue";
const nn = /^[a-z0-9]+(-[a-z0-9]+)*$/, Bt = (a, e, t, n = "") => {
  const r = a.split(":");
  if (a.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3)
      return null;
    n = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length)
    return null;
  if (r.length > 1) {
    const o = r.pop(), i = r.pop(), d = {
      // Allow provider without '@': "provider:prefix:name"
      provider: r.length > 0 ? r[0] : n,
      prefix: i,
      name: o
    };
    return e && !mt(d) ? null : d;
  }
  const l = r[0], s = l.split("-");
  if (s.length > 1) {
    const o = {
      provider: n,
      prefix: s.shift(),
      name: s.join("-")
    };
    return e && !mt(o) ? null : o;
  }
  if (t && n === "") {
    const o = {
      provider: n,
      prefix: "",
      name: l
    };
    return e && !mt(o, t) ? null : o;
  }
  return null;
}, mt = (a, e) => a ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((e && a.prefix === "" || a.prefix) && a.name) : !1, rn = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), gt = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), St = Object.freeze({
  ...rn,
  ...gt
}), Kt = Object.freeze({
  ...St,
  body: "",
  hidden: !1
});
function Ir(a, e) {
  const t = {};
  !a.hFlip != !e.hFlip && (t.hFlip = !0), !a.vFlip != !e.vFlip && (t.vFlip = !0);
  const n = ((a.rotate || 0) + (e.rotate || 0)) % 4;
  return n && (t.rotate = n), t;
}
function ka(a, e) {
  const t = Ir(a, e);
  for (const n in Kt)
    n in gt ? n in a && !(n in t) && (t[n] = gt[n]) : n in e ? t[n] = e[n] : n in a && (t[n] = a[n]);
  return t;
}
function Er(a, e) {
  const t = a.icons, n = a.aliases || /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function l(s) {
    if (t[s])
      return r[s] = [];
    if (!(s in r)) {
      r[s] = null;
      const o = n[s] && n[s].parent, i = o && l(o);
      i && (r[s] = [o].concat(i));
    }
    return r[s];
  }
  return Object.keys(t).concat(Object.keys(n)).forEach(l), r;
}
function Cr(a, e, t) {
  const n = a.icons, r = a.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function s(o) {
    l = ka(
      n[o] || r[o],
      l
    );
  }
  return s(e), t.forEach(s), ka(a, l);
}
function ln(a, e) {
  const t = [];
  if (typeof a != "object" || typeof a.icons != "object")
    return t;
  a.not_found instanceof Array && a.not_found.forEach((r) => {
    e(r, null), t.push(r);
  });
  const n = Er(a);
  for (const r in n) {
    const l = n[r];
    l && (e(r, Cr(a, r, l)), t.push(r));
  }
  return t;
}
const Pr = {
  provider: "",
  aliases: {},
  not_found: {},
  ...rn
};
function Nt(a, e) {
  for (const t in e)
    if (t in a && typeof a[t] != typeof e[t])
      return !1;
  return !0;
}
function sn(a) {
  if (typeof a != "object" || a === null)
    return null;
  const e = a;
  if (typeof e.prefix != "string" || !a.icons || typeof a.icons != "object" || !Nt(a, Pr))
    return null;
  const t = e.icons;
  for (const r in t) {
    const l = t[r];
    if (
      // Name cannot be empty
      !r || // Must have body
      typeof l.body != "string" || // Check other props
      !Nt(
        l,
        Kt
      )
    )
      return null;
  }
  const n = e.aliases || /* @__PURE__ */ Object.create(null);
  for (const r in n) {
    const l = n[r], s = l.parent;
    if (
      // Name cannot be empty
      !r || // Parent must be set and point to existing icon
      typeof s != "string" || !t[s] && !n[s] || // Check other props
      !Nt(
        l,
        Kt
      )
    )
      return null;
  }
  return e;
}
const wa = /* @__PURE__ */ Object.create(null);
function Lr(a, e) {
  return {
    provider: a,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Ze(a, e) {
  const t = wa[a] || (wa[a] = /* @__PURE__ */ Object.create(null));
  return t[e] || (t[e] = Lr(a, e));
}
function on(a, e) {
  return sn(e) ? ln(e, (t, n) => {
    n ? a.icons[t] = n : a.missing.add(t);
  }) : [];
}
function Mr(a, e, t) {
  try {
    if (typeof t.body == "string")
      return a.icons[e] = { ...t }, !0;
  } catch {
  }
  return !1;
}
let ut = !1;
function un(a) {
  return typeof a == "boolean" && (ut = a), ut;
}
function Br(a) {
  const e = typeof a == "string" ? Bt(a, !0, ut) : a;
  if (e) {
    const t = Ze(e.provider, e.prefix), n = e.name;
    return t.icons[n] || (t.missing.has(n) ? null : void 0);
  }
}
function Sr(a, e) {
  const t = Bt(a, !0, ut);
  if (!t)
    return !1;
  const n = Ze(t.provider, t.prefix);
  return e ? Mr(n, t.name, e) : (n.missing.add(t.name), !0);
}
function Ar(a, e) {
  if (typeof a != "object")
    return !1;
  if (typeof e != "string" && (e = a.provider || ""), ut && !e && !a.prefix) {
    let r = !1;
    return sn(a) && (a.prefix = "", ln(a, (l, s) => {
      Sr(l, s) && (r = !0);
    })), r;
  }
  const t = a.prefix;
  if (!mt({
    prefix: t,
    name: "a"
  }))
    return !1;
  const n = Ze(e, t);
  return !!on(n, a);
}
const dn = Object.freeze({
  width: null,
  height: null
}), cn = Object.freeze({
  // Dimensions
  ...dn,
  // Transformations
  ...gt
}), Fr = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Or = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function _a(a, e, t) {
  if (e === 1)
    return a;
  if (t = t || 100, typeof a == "number")
    return Math.ceil(a * e * t) / t;
  if (typeof a != "string")
    return a;
  const n = a.split(Fr);
  if (n === null || !n.length)
    return a;
  const r = [];
  let l = n.shift(), s = Or.test(l);
  for (; ; ) {
    if (s) {
      const o = parseFloat(l);
      isNaN(o) ? r.push(l) : r.push(Math.ceil(o * e * t) / t);
    } else
      r.push(l);
    if (l = n.shift(), l === void 0)
      return r.join("");
    s = !s;
  }
}
function Rr(a, e = "defs") {
  let t = "";
  const n = a.indexOf("<" + e);
  for (; n >= 0; ) {
    const r = a.indexOf(">", n), l = a.indexOf("</" + e);
    if (r === -1 || l === -1)
      break;
    const s = a.indexOf(">", l);
    if (s === -1)
      break;
    t += a.slice(r + 1, l).trim(), a = a.slice(0, n).trim() + a.slice(s + 1);
  }
  return {
    defs: t,
    content: a
  };
}
function $r(a, e) {
  return a ? "<defs>" + a + "</defs>" + e : e;
}
function Nr(a, e, t) {
  const n = Rr(a);
  return $r(n.defs, e + n.content + t);
}
const Vr = (a) => a === "unset" || a === "undefined" || a === "none";
function qr(a, e) {
  const t = {
    ...St,
    ...a
  }, n = {
    ...cn,
    ...e
  }, r = {
    left: t.left,
    top: t.top,
    width: t.width,
    height: t.height
  };
  let l = t.body;
  [t, n].forEach((B) => {
    const g = [], _ = B.hFlip, E = B.vFlip;
    let A = B.rotate;
    _ ? E ? A += 2 : (g.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), g.push("scale(-1 1)"), r.top = r.left = 0) : E && (g.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), g.push("scale(1 -1)"), r.top = r.left = 0);
    let C;
    switch (A < 0 && (A -= Math.floor(A / 4) * 4), A = A % 4, A) {
      case 1:
        C = r.height / 2 + r.top, g.unshift(
          "rotate(90 " + C.toString() + " " + C.toString() + ")"
        );
        break;
      case 2:
        g.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        C = r.width / 2 + r.left, g.unshift(
          "rotate(-90 " + C.toString() + " " + C.toString() + ")"
        );
        break;
    }
    A % 2 === 1 && (r.left !== r.top && (C = r.left, r.left = r.top, r.top = C), r.width !== r.height && (C = r.width, r.width = r.height, r.height = C)), g.length && (l = Nr(
      l,
      '<g transform="' + g.join(" ") + '">',
      "</g>"
    ));
  });
  const s = n.width, o = n.height, i = r.width, d = r.height;
  let p, m;
  s === null ? (m = o === null ? "1em" : o === "auto" ? d : o, p = _a(m, i / d)) : (p = s === "auto" ? i : s, m = o === null ? _a(p, d / i) : o === "auto" ? d : o);
  const v = {}, L = (B, g) => {
    Vr(g) || (v[B] = g.toString());
  };
  L("width", p), L("height", m);
  const T = [r.left, r.top, i, d];
  return v.viewBox = T.join(" "), {
    attributes: v,
    viewBox: T,
    body: l
  };
}
const jr = /\sid="(\S+)"/g, Hr = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Kr = 0;
function Wr(a, e = Hr) {
  const t = [];
  let n;
  for (; n = jr.exec(a); )
    t.push(n[1]);
  if (!t.length)
    return a;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return t.forEach((l) => {
    const s = typeof e == "function" ? e(l) : e + (Kr++).toString(), o = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    a = a.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + o + ')([")]|\\.[a-z])', "g"),
      "$1" + s + r + "$3"
    );
  }), a = a.replace(new RegExp(r, "g"), ""), a;
}
const Wt = /* @__PURE__ */ Object.create(null);
function Yr(a, e) {
  Wt[a] = e;
}
function Yt(a) {
  return Wt[a] || Wt[""];
}
function sa(a) {
  let e;
  if (typeof a.resources == "string")
    e = [a.resources];
  else if (e = a.resources, !(e instanceof Array) || !e.length)
    return null;
  return {
    // API hosts
    resources: e,
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
const oa = /* @__PURE__ */ Object.create(null), tt = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ht = [];
for (; tt.length > 0; )
  tt.length === 1 || Math.random() > 0.5 ? ht.push(tt.shift()) : ht.push(tt.pop());
oa[""] = sa({
  resources: ["https://api.iconify.design"].concat(ht)
});
function Qr(a, e) {
  const t = sa(e);
  return t === null ? !1 : (oa[a] = t, !0);
}
function ia(a) {
  return oa[a];
}
const zr = () => {
  let a;
  try {
    if (a = fetch, typeof a == "function")
      return a;
  } catch {
  }
};
let Ta = zr();
function Gr(a, e) {
  const t = ia(a);
  if (!t)
    return 0;
  let n;
  if (!t.maxURL)
    n = 0;
  else {
    let r = 0;
    t.resources.forEach((s) => {
      r = Math.max(r, s.length);
    });
    const l = e + ".json?icons=";
    n = t.maxURL - r - t.path.length - l.length;
  }
  return n;
}
function Xr(a) {
  return a === 404;
}
const Ur = (a, e, t) => {
  const n = [], r = Gr(a, e), l = "icons";
  let s = {
    type: l,
    provider: a,
    prefix: e,
    icons: []
  }, o = 0;
  return t.forEach((i, d) => {
    o += i.length + 1, o >= r && d > 0 && (n.push(s), s = {
      type: l,
      provider: a,
      prefix: e,
      icons: []
    }, o = i.length), s.icons.push(i);
  }), n.push(s), n;
};
function Zr(a) {
  if (typeof a == "string") {
    const e = ia(a);
    if (e)
      return e.path;
  }
  return "/";
}
const Jr = (a, e, t) => {
  if (!Ta) {
    t("abort", 424);
    return;
  }
  let n = Zr(e.provider);
  switch (e.type) {
    case "icons": {
      const l = e.prefix, o = e.icons.join(","), i = new URLSearchParams({
        icons: o
      });
      n += l + ".json?" + i.toString();
      break;
    }
    case "custom": {
      const l = e.uri;
      n += l.slice(0, 1) === "/" ? l.slice(1) : l;
      break;
    }
    default:
      t("abort", 400);
      return;
  }
  let r = 503;
  Ta(a + n).then((l) => {
    const s = l.status;
    if (s !== 200) {
      setTimeout(() => {
        t(Xr(s) ? "abort" : "next", s);
      });
      return;
    }
    return r = 501, l.json();
  }).then((l) => {
    if (typeof l != "object" || l === null) {
      setTimeout(() => {
        l === 404 ? t("abort", l) : t("next", r);
      });
      return;
    }
    setTimeout(() => {
      t("success", l);
    });
  }).catch(() => {
    t("next", r);
  });
}, el = {
  prepare: Ur,
  send: Jr
};
function tl(a) {
  const e = {
    loaded: [],
    missing: [],
    pending: []
  }, t = /* @__PURE__ */ Object.create(null);
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
    const l = r.provider, s = r.prefix, o = r.name, i = t[l] || (t[l] = /* @__PURE__ */ Object.create(null)), d = i[s] || (i[s] = Ze(l, s));
    let p;
    o in d.icons ? p = e.loaded : s === "" || d.missing.has(o) ? p = e.missing : p = e.pending;
    const m = {
      provider: l,
      prefix: s,
      name: o
    };
    p.push(m);
  }), e;
}
function fn(a, e) {
  a.forEach((t) => {
    const n = t.loaderCallbacks;
    n && (t.loaderCallbacks = n.filter((r) => r.id !== e));
  });
}
function al(a) {
  a.pendingCallbacksFlag || (a.pendingCallbacksFlag = !0, setTimeout(() => {
    a.pendingCallbacksFlag = !1;
    const e = a.loaderCallbacks ? a.loaderCallbacks.slice(0) : [];
    if (!e.length)
      return;
    let t = !1;
    const n = a.provider, r = a.prefix;
    e.forEach((l) => {
      const s = l.icons, o = s.pending.length;
      s.pending = s.pending.filter((i) => {
        if (i.prefix !== r)
          return !0;
        const d = i.name;
        if (a.icons[d])
          s.loaded.push({
            provider: n,
            prefix: r,
            name: d
          });
        else if (a.missing.has(d))
          s.missing.push({
            provider: n,
            prefix: r,
            name: d
          });
        else
          return t = !0, !0;
        return !1;
      }), s.pending.length !== o && (t || fn([a], l.id), l.callback(
        s.loaded.slice(0),
        s.missing.slice(0),
        s.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let nl = 0;
function rl(a, e, t) {
  const n = nl++, r = fn.bind(null, t, n);
  if (!e.pending.length)
    return r;
  const l = {
    id: n,
    icons: e,
    callback: a,
    abort: r
  };
  return t.forEach((s) => {
    (s.loaderCallbacks || (s.loaderCallbacks = [])).push(l);
  }), r;
}
function ll(a, e = !0, t = !1) {
  const n = [];
  return a.forEach((r) => {
    const l = typeof r == "string" ? Bt(r, e, t) : r;
    l && n.push(l);
  }), n;
}
var sl = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function ol(a, e, t, n) {
  const r = a.resources.length, l = a.random ? Math.floor(Math.random() * r) : a.index;
  let s;
  if (a.random) {
    let R = a.resources.slice(0);
    for (s = []; R.length > 1; ) {
      const D = Math.floor(Math.random() * R.length);
      s.push(R[D]), R = R.slice(0, D).concat(R.slice(D + 1));
    }
    s = s.concat(R);
  } else
    s = a.resources.slice(l).concat(a.resources.slice(0, l));
  const o = Date.now();
  let i = "pending", d = 0, p, m = null, v = [], L = [];
  typeof n == "function" && L.push(n);
  function T() {
    m && (clearTimeout(m), m = null);
  }
  function B() {
    i === "pending" && (i = "aborted"), T(), v.forEach((R) => {
      R.status === "pending" && (R.status = "aborted");
    }), v = [];
  }
  function g(R, D) {
    D && (L = []), typeof R == "function" && L.push(R);
  }
  function _() {
    return {
      startTime: o,
      payload: e,
      status: i,
      queriesSent: d,
      queriesPending: v.length,
      subscribe: g,
      abort: B
    };
  }
  function E() {
    i = "failed", L.forEach((R) => {
      R(void 0, p);
    });
  }
  function A() {
    v.forEach((R) => {
      R.status === "pending" && (R.status = "aborted");
    }), v = [];
  }
  function C(R, D, $) {
    const x = D !== "success";
    switch (v = v.filter((M) => M !== R), i) {
      case "pending":
        break;
      case "failed":
        if (x || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (D === "abort") {
      p = $, E();
      return;
    }
    if (x) {
      p = $, v.length || (s.length ? K() : E());
      return;
    }
    if (T(), A(), !a.random) {
      const M = a.resources.indexOf(R.resource);
      M !== -1 && M !== a.index && (a.index = M);
    }
    i = "completed", L.forEach((M) => {
      M($);
    });
  }
  function K() {
    if (i !== "pending")
      return;
    T();
    const R = s.shift();
    if (R === void 0) {
      if (v.length) {
        m = setTimeout(() => {
          T(), i === "pending" && (A(), E());
        }, a.timeout);
        return;
      }
      E();
      return;
    }
    const D = {
      status: "pending",
      resource: R,
      callback: ($, x) => {
        C(D, $, x);
      }
    };
    v.push(D), d++, m = setTimeout(K, a.rotate), t(R, e, D.callback);
  }
  return setTimeout(K), _;
}
function pn(a) {
  const e = {
    ...sl,
    ...a
  };
  let t = [];
  function n() {
    t = t.filter((o) => o().status === "pending");
  }
  function r(o, i, d) {
    const p = ol(
      e,
      o,
      i,
      (m, v) => {
        n(), d && d(m, v);
      }
    );
    return t.push(p), p;
  }
  function l(o) {
    return t.find((i) => o(i)) || null;
  }
  return {
    query: r,
    find: l,
    setIndex: (o) => {
      e.index = o;
    },
    getIndex: () => e.index,
    cleanup: n
  };
}
function xa() {
}
const Vt = /* @__PURE__ */ Object.create(null);
function il(a) {
  if (!Vt[a]) {
    const e = ia(a);
    if (!e)
      return;
    const t = pn(e), n = {
      config: e,
      redundancy: t
    };
    Vt[a] = n;
  }
  return Vt[a];
}
function ul(a, e, t) {
  let n, r;
  if (typeof a == "string") {
    const l = Yt(a);
    if (!l)
      return t(void 0, 424), xa;
    r = l.send;
    const s = il(a);
    s && (n = s.redundancy);
  } else {
    const l = sa(a);
    if (l) {
      n = pn(l);
      const s = a.resources ? a.resources[0] : "", o = Yt(s);
      o && (r = o.send);
    }
  }
  return !n || !r ? (t(void 0, 424), xa) : n.query(e, r, t)().abort;
}
function Da() {
}
function dl(a) {
  a.iconsLoaderFlag || (a.iconsLoaderFlag = !0, setTimeout(() => {
    a.iconsLoaderFlag = !1, al(a);
  }));
}
function cl(a) {
  const e = [], t = [];
  return a.forEach((n) => {
    (n.match(nn) ? e : t).push(n);
  }), {
    valid: e,
    invalid: t
  };
}
function at(a, e, t) {
  function n() {
    const r = a.pendingIcons;
    e.forEach((l) => {
      r && r.delete(l), a.icons[l] || a.missing.add(l);
    });
  }
  if (t && typeof t == "object")
    try {
      if (!on(a, t).length) {
        n();
        return;
      }
    } catch (r) {
      console.error(r);
    }
  n(), dl(a);
}
function Ia(a, e) {
  a instanceof Promise ? a.then((t) => {
    e(t);
  }).catch(() => {
    e(null);
  }) : e(a);
}
function fl(a, e) {
  a.iconsToLoad ? a.iconsToLoad = a.iconsToLoad.concat(e).sort() : a.iconsToLoad = e, a.iconsQueueFlag || (a.iconsQueueFlag = !0, setTimeout(() => {
    a.iconsQueueFlag = !1;
    const { provider: t, prefix: n } = a, r = a.iconsToLoad;
    if (delete a.iconsToLoad, !r || !r.length)
      return;
    const l = a.loadIcon;
    if (a.loadIcons && (r.length > 1 || !l)) {
      Ia(
        a.loadIcons(r, n, t),
        (p) => {
          at(a, r, p);
        }
      );
      return;
    }
    if (l) {
      r.forEach((p) => {
        const m = l(p, n, t);
        Ia(m, (v) => {
          const L = v ? {
            prefix: n,
            icons: {
              [p]: v
            }
          } : null;
          at(a, [p], L);
        });
      });
      return;
    }
    const { valid: s, invalid: o } = cl(r);
    if (o.length && at(a, o, null), !s.length)
      return;
    const i = n.match(nn) ? Yt(t) : null;
    if (!i) {
      at(a, s, null);
      return;
    }
    i.prepare(t, n, s).forEach((p) => {
      ul(t, p, (m) => {
        at(a, p.icons, m);
      });
    });
  }));
}
const pl = (a, e) => {
  const t = ll(a, !0, un()), n = tl(t);
  if (!n.pending.length) {
    let i = !0;
    return e && setTimeout(() => {
      i && e(
        n.loaded,
        n.missing,
        n.pending,
        Da
      );
    }), () => {
      i = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), l = [];
  let s, o;
  return n.pending.forEach((i) => {
    const { provider: d, prefix: p } = i;
    if (p === o && d === s)
      return;
    s = d, o = p, l.push(Ze(d, p));
    const m = r[d] || (r[d] = /* @__PURE__ */ Object.create(null));
    m[p] || (m[p] = []);
  }), n.pending.forEach((i) => {
    const { provider: d, prefix: p, name: m } = i, v = Ze(d, p), L = v.pendingIcons || (v.pendingIcons = /* @__PURE__ */ new Set());
    L.has(m) || (L.add(m), r[d][p].push(m));
  }), l.forEach((i) => {
    const d = r[i.provider][i.prefix];
    d.length && fl(i, d);
  }), e ? rl(e, n, l) : Da;
};
function vl(a, e) {
  const t = {
    ...a
  };
  for (const n in e) {
    const r = e[n], l = typeof r;
    n in dn ? (r === null || r && (l === "string" || l === "number")) && (t[n] = r) : l === typeof t[n] && (t[n] = n === "rotate" ? r % 4 : r);
  }
  return t;
}
const ml = /[\s,]+/;
function hl(a, e) {
  e.split(ml).forEach((t) => {
    switch (t.trim()) {
      case "horizontal":
        a.hFlip = !0;
        break;
      case "vertical":
        a.vFlip = !0;
        break;
    }
  });
}
function bl(a, e = 0) {
  const t = a.replace(/^-?[0-9.]*/, "");
  function n(r) {
    for (; r < 0; )
      r += 4;
    return r % 4;
  }
  if (t === "") {
    const r = parseInt(a);
    return isNaN(r) ? 0 : n(r);
  } else if (t !== a) {
    let r = 0;
    switch (t) {
      case "%":
        r = 25;
        break;
      case "deg":
        r = 90;
    }
    if (r) {
      let l = parseFloat(a.slice(0, a.length - t.length));
      return isNaN(l) ? 0 : (l = l / r, l % 1 === 0 ? n(l) : 0);
    }
  }
  return e;
}
function gl(a, e) {
  let t = a.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in e)
    t += " " + n + '="' + e[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + t + ">" + a + "</svg>";
}
function yl(a) {
  return a.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function kl(a) {
  return "data:image/svg+xml," + yl(a);
}
function wl(a) {
  return 'url("' + kl(a) + '")';
}
const Ea = {
  ...cn,
  inline: !1
}, _l = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, Tl = {
  display: "inline-block"
}, Qt = {
  backgroundColor: "currentColor"
}, vn = {
  backgroundColor: "transparent"
}, Ca = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Pa = {
  webkitMask: Qt,
  mask: Qt,
  background: vn
};
for (const a in Pa) {
  const e = Pa[a];
  for (const t in Ca)
    e[a + t] = Ca[t];
}
const bt = {};
["horizontal", "vertical"].forEach((a) => {
  const e = a.slice(0, 1) + "Flip";
  bt[a + "-flip"] = e, bt[a.slice(0, 1) + "-flip"] = e, bt[a + "Flip"] = e;
});
function La(a) {
  return a + (a.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ma = (a, e) => {
  const t = vl(Ea, e), n = { ..._l }, r = e.mode || "svg", l = {}, s = e.style, o = typeof s == "object" && !(s instanceof Array) ? s : {};
  for (let B in e) {
    const g = e[B];
    if (g !== void 0)
      switch (B) {
        // Properties to ignore
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        // Boolean attributes
        case "inline":
        case "hFlip":
        case "vFlip":
          t[B] = g === !0 || g === "true" || g === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof g == "string" && hl(t, g);
          break;
        // Color: override style
        case "color":
          l.color = g;
          break;
        // Rotation as string
        case "rotate":
          typeof g == "string" ? t[B] = bl(g) : typeof g == "number" && (t[B] = g);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          g !== !0 && g !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const _ = bt[B];
          _ ? (g === !0 || g === "true" || g === 1) && (t[_] = !0) : Ea[B] === void 0 && (n[B] = g);
        }
      }
  }
  const i = qr(a, t), d = i.attributes;
  if (t.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...o
    }, Object.assign(n, d);
    let B = 0, g = e.id;
    return typeof g == "string" && (g = g.replace(/-/g, "_")), n.innerHTML = Wr(i.body, g ? () => g + "ID" + B++ : "iconifyVue"), ga("svg", n);
  }
  const { body: p, width: m, height: v } = a, L = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), T = gl(p, {
    ...d,
    width: m + "",
    height: v + ""
  });
  return n.style = {
    ...l,
    "--svg": wl(T),
    width: La(d.width),
    height: La(d.height),
    ...Tl,
    ...L ? Qt : vn,
    ...o
  }, ga("span", n);
};
un(!0);
Yr("", el);
if (typeof document < "u" && typeof window < "u") {
  const a = window;
  if (a.IconifyPreload !== void 0) {
    const e = a.IconifyPreload, t = "Invalid IconifyPreload syntax.";
    typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach((n) => {
      try {
        // Check if item is an object and not null/array
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !Ar(n)) && console.error(t);
      } catch {
        console.error(t);
      }
    });
  }
  if (a.IconifyProviders !== void 0) {
    const e = a.IconifyProviders;
    if (typeof e == "object" && e !== null)
      for (let t in e) {
        const n = "IconifyProviders[" + t + "] is invalid.";
        try {
          const r = e[t];
          if (typeof r != "object" || !r || r.resources === void 0)
            continue;
          Qr(t, r) || console.error(n);
        } catch {
          console.error(n);
        }
      }
  }
}
const xl = {
  ...St,
  body: ""
}, Dl = V({
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
    getIcon(a, e, t) {
      if (typeof a == "object" && a !== null && typeof a.body == "string")
        return this._name = "", this.abortLoading(), {
          data: a
        };
      let n;
      if (typeof a != "string" || (n = Bt(a, !1, !0)) === null)
        return this.abortLoading(), null;
      let r = Br(n);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== a) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: a,
          abort: pl([n], () => {
            this.counter++;
          })
        })), null;
      if (this.abortLoading(), this._name !== a && (this._name = a, e && e(a)), t) {
        r = Object.assign({}, r);
        const s = t(r.body, n.name, n.prefix, n.provider);
        typeof s == "string" && (r.body = s);
      }
      const l = ["iconify"];
      return n.prefix !== "" && l.push("iconify--" + n.prefix), n.provider !== "" && l.push("iconify--" + n.provider), { data: r, classes: l };
    }
  },
  // Render icon
  render() {
    this.counter;
    const a = this.$attrs, e = this.iconMounted || a.ssr ? this.getIcon(a.icon, a.onLoad, a.customise) : null;
    if (!e)
      return Ma(xl, a);
    let t = a;
    return e.classes && (t = {
      ...a,
      class: (typeof a.class == "string" ? a.class + " " : "") + e.classes.join(" ")
    }), Ma({
      ...St,
      ...e.data
    }, t);
  }
}), ua = Symbol("accordions"), da = Symbol("header"), At = Symbol("tabs"), Ae = () => {
  const a = G(), e = G(!1), t = G(!1), n = () => {
    if (!a.value)
      return;
    a.value.style.setProperty("--collapser", "none");
    const r = a.value.offsetHeight;
    a.value.style.setProperty("--collapse", `${-r}px`), a.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: a,
    collapsing: e,
    cssExpanded: t,
    doExpand: (r) => {
      a.value && (r === !0 && a.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        e.value = !0, n(), window.requestAnimationFrame(() => {
          t.value = r;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (r, l = !0) => {
      var s, o;
      e.value = !1, l && ((o = (s = a.value) == null ? void 0 : s.querySelector("a")) == null || o.focus()), a.value && r === !1 && a.value.style.removeProperty("--collapse-max-height");
    }
  };
}, oe = (a = "", e = "") => (a ? `${a}-` : "") + na() + (e ? `-${e}` : ""), Il = { class: "fr-accordion" }, El = ["aria-expanded", "aria-controls"], Cl = ["id"], Pl = /* @__PURE__ */ V({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => oe("accordion") },
    selected: { type: Boolean },
    title: { default: "Sans intitulé" },
    titleTag: { default: "h3" }
  },
  setup(a) {
    const e = a, {
      collapse: t,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Ae(), o = G(), i = Ue(ua), { isActive: d, expand: p } = (i == null ? void 0 : i(ft(() => e.title))) ?? { isActive: o, expand: () => o.value = !o.value };
    return ke(() => {
      d.value && l(!0);
    }), ve(d, (m, v) => {
      m !== v && l(m);
    }), (m, v) => (u(), f("section", Il, [
      (u(), j(me(m.titleTag), { class: "fr-accordion__title" }, {
        default: ee(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": Y(d),
            "aria-controls": m.id,
            type: "button",
            onClick: v[0] || (v[0] = (L) => Y(p)())
          }, [
            F(m.$slots, "title", {}, () => [
              H(b(m.title), 1)
            ])
          ], 8, El)
        ]),
        _: 3
      })),
      c("div", {
        id: m.id,
        ref_key: "collapse",
        ref: t,
        class: q(["fr-collapse", {
          "fr-collapse--expanded": Y(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": Y(n)
        }]),
        onTransitionend: v[1] || (v[1] = (L) => Y(s)(Y(d), !1))
      }, [
        F(m.$slots, "default")
      ], 42, Cl)
    ]));
  }
}), Ll = { class: "fr-accordions-group" }, Ml = /* @__PURE__ */ V({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: e }) {
    const t = a, n = e, r = w({
      get: () => t.modelValue,
      set(o) {
        n("update:modelValue", o);
      }
    }), l = G(/* @__PURE__ */ new Map()), s = G(0);
    return $e(ua, (o) => {
      const i = s.value++;
      l.value.set(i, o.value);
      const d = w(() => i === r.value);
      ve(o, () => {
        l.value.set(i, o.value);
      });
      function p() {
        if (r.value === i) {
          r.value = -1;
          return;
        }
        r.value = i;
      }
      return Ce(() => {
        l.value.delete(i);
      }), { isActive: d, expand: p };
    }), (o, i) => (u(), f("div", Ll, [
      F(o.$slots, "default")
    ]));
  }
}), Bl = ["id", "role"], Sl = ["id"], Al = ["aria-describedby", "title"], Fl = { class: "fr-sr-only" }, Ol = /* @__PURE__ */ V({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => oe("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer le message" }
  },
  emits: ["close"],
  setup(a, { emit: e }) {
    const t = a, n = e, r = () => n("close"), l = w(
      () => [
        `fr-alert--${t.type}`,
        {
          "fr-alert--sm": t.small
        }
      ]
    ), s = w(() => oe("alert", "title")), o = w(() => oe("alert", "description")), i = w(() => t.description && !t.title ? o.value : !t.description && t.title ? s.value : `${s.value} ${o.value}`);
    return (d, p) => d.closed ? y("", !0) : (u(), f("div", {
      key: 0,
      id: d.id,
      class: q(["fr-alert", l.value]),
      role: d.alert ? "alert" : void 0
    }, [
      d.small ? y("", !0) : (u(), j(me(d.titleTag), {
        key: 0,
        id: s.value,
        class: "fr-alert__title"
      }, {
        default: ee(() => [
          H(b(d.title), 1)
        ]),
        _: 1
      }, 8, ["id"])),
      d.description ? (u(), f("p", {
        key: 1,
        id: o.value
      }, b(d.description), 9, Sl)) : F(d.$slots, "default", { key: 2 }, void 0, !0),
      d.closeable ? (u(), f("button", {
        key: 3,
        "aria-describedby": i.value,
        title: d.closeButtonLabel,
        class: "fr-btn fr-btn--close",
        onClick: r
      }, [
        c("span", Fl, b(d.closeButtonLabel), 1)
      ], 8, Al)) : y("", !0)
    ], 10, Bl));
  }
}), _e = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, Rl = /* @__PURE__ */ _e(Ol, [["__scopeId", "data-v-97587b27"]]), $l = /* @__PURE__ */ V({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(a) {
    return (e, t) => (u(), f("a", {
      class: q(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, b(e.label), 3));
  }
}), Nl = ["title"], mn = /* @__PURE__ */ V({
  __name: "DsfrBadge",
  props: {
    label: {},
    type: { default: "info" },
    noIcon: { type: Boolean },
    small: { type: Boolean },
    ellipsis: { type: Boolean }
  },
  setup(a) {
    return (e, t) => (u(), f("p", {
      class: q(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      c("span", {
        class: q(e.ellipsis ? "fr-ellipsis" : "")
      }, b(e.label), 3)
    ], 10, Nl));
  }
}), Vl = ["aria-label"], ql = ["aria-expanded", "aria-controls"], jl = ["id"], Hl = { class: "fr-breadcrumb__list" }, Kl = ["aria-current"], Wl = /* @__PURE__ */ V({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => oe("breadcrumb") },
    links: { default: () => [{ text: "" }] },
    navigationLabel: { default: "vous êtes ici :" },
    showBreadcrumbLabel: { default: "Voir le fil d’Ariane" }
  },
  setup(a) {
    const {
      collapse: e,
      collapsing: t,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = Ae(), s = G(!1);
    return ve(s, (o, i) => {
      o !== i && r(o);
    }), (o, i) => {
      const d = xe("RouterLink");
      return u(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": o.navigationLabel
      }, [
        s.value ? y("", !0) : (u(), f("button", {
          key: 0,
          class: "fr-breadcrumb__button",
          "aria-expanded": s.value,
          "aria-controls": o.breadcrumbId,
          onClick: i[0] || (i[0] = (p) => s.value = !s.value)
        }, b(o.showBreadcrumbLabel), 9, ql)),
        c("div", {
          id: o.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: q(["fr-collapse", {
            "fr-collapse--expanded": Y(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Y(t)
          }]),
          onTransitionend: i[1] || (i[1] = (p) => Y(l)(s.value))
        }, [
          c("ol", Hl, [
            (u(!0), f(Z, null, te(o.links, (p, m) => (u(), f("li", {
              key: m,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (u(), j(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": m === o.links.length - 1 ? "page" : void 0
              }, {
                default: ee(() => [
                  H(b(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : y("", !0),
              p.to ? y("", !0) : (u(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === o.links.length - 1 ? "page" : void 0
              }, b(p.text), 9, Kl))
            ]))), 128))
          ])
        ], 42, jl)
      ], 8, Vl);
    };
  }
}), Yl = /* @__PURE__ */ V({
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
    Pt((i) => ({
      "177d0d84": o.value
    }));
    const e = a, t = G(null), n = w(() => `${+e.scale * 1.2}rem`), r = w(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
    ve(() => e.title, l);
    async function l() {
      var i, d, p, m;
      if (!((i = t.value) != null && i.$el))
        return;
      const v = !!((d = t.value) == null ? void 0 : d.$el).querySelector("title"), L = document.createElement("title");
      if (!e.title) {
        L.remove();
        return;
      }
      L.innerHTML = e.title, await an(), v || (m = ((p = t.value) == null ? void 0 : p.$el).firstChild) == null || m.before(L);
    }
    ke(l);
    const s = w(() => {
      var i;
      return (i = e.name) != null && i.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), o = w(() => e.color ?? e.fill ?? "inherit");
    return (i, d) => (u(), j(Y(Dl), {
      ref_key: "icon",
      ref: t,
      icon: s.value,
      style: Ie({ fontSize: n.value, verticalAlign: i.verticalAlign, display: i.display }),
      "aria-label": i.label,
      class: q(["vicon", {
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
      flip: r.value,
      ssr: i.ssr
    }, null, 8, ["icon", "style", "aria-label", "class", "flip", "ssr"]));
  }
}), we = /* @__PURE__ */ _e(Yl, [["__scopeId", "data-v-73a1cd7e"]]), Ql = ["title", "disabled", "aria-disabled"], zl = { key: 1 }, Gl = /* @__PURE__ */ V({
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
  setup(a, { expose: e }) {
    const t = a, n = w(() => ["sm", "small"].includes(t.size)), r = w(() => ["md", "medium"].includes(t.size)), l = w(() => ["lg", "large"].includes(t.size)), s = G(null);
    e({ focus: () => {
      var p;
      (p = s.value) == null || p.focus();
    } });
    const o = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), i = w(() => t.iconOnly ? 1.25 : 0.8325), d = w(
      () => typeof t.icon == "string" ? { scale: i.value, name: t.icon } : { scale: i.value, ...t.icon }
    );
    return (p, m) => (u(), f("button", {
      ref_key: "btn",
      ref: s,
      class: q(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": n.value,
        "fr-btn--md": r.value,
        "fr-btn--lg": l.value,
        "fr-btn--icon-right": !p.iconOnly && o.value && p.iconRight,
        "fr-btn--icon-left": !p.iconOnly && o.value && !p.iconRight,
        "inline-flex": !o.value,
        reverse: p.iconRight && !o.value,
        "justify-center": !o.value && p.iconOnly,
        [p.icon]: o.value
      }]),
      title: p.iconOnly ? p.label : void 0,
      disabled: p.disabled,
      "aria-disabled": p.disabled,
      style: Ie(!o.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: m[0] || (m[0] = (v) => p.onClick ? p.onClick(v) : () => {
      })
    }, [
      p.icon && !o.value ? (u(), j(we, Ee(X({ key: 0 }, d.value)), null, 16)) : y("", !0),
      p.iconOnly ? y("", !0) : (u(), f("span", zl, [
        H(b(p.label) + " ", 1),
        F(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Ql));
  }
}), He = /* @__PURE__ */ _e(Gl, [["__scopeId", "data-v-118397f5"]]), Ft = /* @__PURE__ */ V({
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
    const e = a, t = G(null), n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["md", "medium"].includes(e.size)), l = w(() => ["lg", "large"].includes(e.size)), s = w(() => ["always", "", !0].includes(e.inlineLayoutWhen)), o = w(() => ["sm", "small"].includes(e.inlineLayoutWhen)), i = w(() => ["md", "medium"].includes(e.inlineLayoutWhen)), d = w(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = w(() => e.align === "center"), m = w(() => e.align === "right"), v = G("auto"), L = w(() => `--equisized-width: ${v.value};`), T = async () => {
      var B;
      let g = 0;
      await new Promise((_) => setTimeout(_, 100)), (B = t.value) == null || B.querySelectorAll(".fr-btn").forEach((_) => {
        const E = _, A = E.offsetWidth, C = window.getComputedStyle(E), K = +C.marginLeft.replace("px", ""), R = +C.marginRight.replace("px", "");
        E.style.width = "var(--equisized-width)";
        const D = A + K + R;
        D > g && (g = D);
      }), v.value = `${g}px`;
    };
    return ke(async () => {
      !t.value || !e.equisized || await T();
    }), (B, g) => (u(), f("ul", {
      ref_key: "buttonsEl",
      ref: t,
      style: Ie(L.value),
      class: q(["fr-btns-group", {
        "fr-btns-group--equisized": B.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": s.value || o.value,
        "fr-btns-group--inline-md": s.value || i.value,
        "fr-btns-group--inline-lg": s.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": B.iconRight,
        "fr-btns-group--inline-reverse": B.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (u(!0), f(Z, null, te(B.buttons, ({ onClick: _, ...E }, A) => (u(), f("li", { key: A }, [
        re(He, X({ ref_for: !0 }, E, { onClick: _ }), null, 16, ["onClick"])
      ]))), 128)),
      F(B.$slots, "default")
    ], 6));
  }
}), Xl = {
  key: 2,
  class: "fr-callout__text"
}, Ul = {
  key: 4,
  class: "fr-callout__text"
}, Zl = /* @__PURE__ */ V({
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
    const e = a, t = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), n = w(() => t.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : { ...e.icon ?? {} });
    return (r, l) => (u(), f("div", {
      class: q(["fr-callout", { [String(r.icon)]: t.value }])
    }, [
      r.icon && n.value ? (u(), j(we, Ee(X({ key: 0 }, n.value)), null, 16)) : y("", !0),
      r.title ? (u(), j(me(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: ee(() => [
          H(b(r.title), 1)
        ]),
        _: 1
      })) : y("", !0),
      r.content ? (u(), f("p", Xl, b(r.content), 1)) : y("", !0),
      r.button ? (u(), j(He, Ee(X({ key: 3 }, r.button)), null, 16)) : y("", !0),
      r.$slots.default && !r.content ? (u(), f("div", Ul, [
        F(r.$slots, "default", {}, void 0, !0)
      ])) : F(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), Jl = /* @__PURE__ */ _e(Zl, [["__scopeId", "data-v-c59b3cec"]]), zt = /* @__PURE__ */ V({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const e = a, t = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = w(() => t.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (r, l) => (u(), f("p", {
      class: q(["fr-card__detail", t.value ? { [String(r.icon)]: t.value } : {}])
    }, [
      r.icon && !t.value ? (u(), j(we, Ee(X({ key: 0 }, n.value)), null, 16)) : y("", !0),
      F(r.$slots, "default")
    ], 2));
  }
}), es = { class: "fr-card__body" }, ts = { class: "fr-card__content" }, as = ["href"], ns = { class: "fr-card__desc" }, rs = {
  key: 0,
  class: "fr-card__start"
}, ls = {
  key: 1,
  class: "fr-card__end"
}, ss = {
  key: 0,
  class: "fr-card__footer"
}, os = {
  key: 1,
  class: "fr-links-group"
}, is = ["href"], us = {
  key: 0,
  class: "fr-card__header"
}, ds = {
  key: 0,
  class: "fr-card__img"
}, cs = ["src", "alt"], fs = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, ps = /* @__PURE__ */ V({
  __name: "DsfrCard",
  props: {
    imgSrc: { default: void 0 },
    link: { default: void 0 },
    title: {},
    titleLinkAttrs: { default: () => ({}) },
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
  setup(a, { expose: e }) {
    const t = a, n = w(() => ["sm", "small"].includes(t.size)), r = w(() => ["lg", "large"].includes(t.size)), l = w(() => ["sm", "small"].includes(t.imgRatio)), s = w(() => ["lg", "large"].includes(t.imgRatio)), o = w(() => typeof t.link == "string" && t.link.startsWith("http")), i = G(null);
    return e({ goToTargetLink: () => {
      var d;
      ((d = i.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const m = xe("RouterLink");
      return u(), f("div", {
        class: q(["fr-card", {
          "fr-card--horizontal": d.horizontal,
          "fr-enlarge-link": !d.noArrow,
          "fr-card--sm": n.value,
          "fr-card--lg": r.value,
          "fr-card--horizontal-tier": l.value,
          "fr-card--horizontal-half": s.value,
          "fr-card--download": d.download,
          "fr-enlarge-button": d.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        c("div", es, [
          c("div", ts, [
            (u(), j(me(d.titleTag), { class: "fr-card__title" }, {
              default: ee(() => [
                o.value ? (u(), f("a", X({
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, d.titleLinkAttrs), b(d.title), 17, as)) : d.link ? (u(), j(m, X({
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link"
                }, d.titleLinkAttrs, {
                  onClick: p[0] || (p[0] = ne(() => {
                  }, ["stop"]))
                }), {
                  default: ee(() => [
                    H(b(d.title), 1)
                  ]),
                  _: 1
                }, 16, ["to"])) : (u(), f(Z, { key: 2 }, [
                  H(b(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", ns, b(d.description), 1),
            d.$slots["start-details"] || d.detail ? (u(), f("div", rs, [
              F(d.$slots, "start-details"),
              d.detail ? (u(), j(zt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: ee(() => [
                  H(b(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : y("", !0)
            ])) : y("", !0),
            d.$slots["end-details"] || d.endDetail ? (u(), f("div", ls, [
              F(d.$slots, "end-details"),
              d.endDetail ? (u(), j(zt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: ee(() => [
                  H(b(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : y("", !0)
            ])) : y("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (u(), f("div", ss, [
            d.buttons.length ? (u(), j(Ft, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : y("", !0),
            d.linksGroup.length ? (u(), f("ul", os, [
              (u(!0), f(Z, null, te(d.linksGroup, (v, L) => (u(), f("li", {
                key: `card-link-${L}`
              }, [
                v.to ? (u(), j(m, {
                  key: 0,
                  to: v.to
                }, {
                  default: ee(() => [
                    H(b(v.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (u(), f("a", {
                  key: 1,
                  href: v.link || v.href,
                  class: q(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": r.value
                  }])
                }, b(v.label), 11, is))
              ]))), 128))
            ])) : y("", !0)
          ])) : y("", !0)
        ]),
        d.imgSrc || d.badges.length ? (u(), f("div", us, [
          d.imgSrc ? (u(), f("div", ds, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, cs)
          ])) : y("", !0),
          d.badges.length ? (u(), f("ul", fs, [
            (u(!0), f(Z, null, te(d.badges, (v, L) => (u(), f("li", { key: L }, [
              re(mn, X({ ref_for: !0 }, v), null, 16)
            ]))), 128))
          ])) : y("", !0)
        ])) : y("", !0)
      ], 2);
    };
  }
}), vs = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex", "aria-describedby"], ms = ["for"], hs = {
  key: 0,
  class: "required"
}, bs = {
  key: 0,
  class: "fr-hint-text"
}, gs = ["id"], ys = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ Re({
    id: { default: () => oe("basic", "checkbox") },
    name: {},
    required: { type: Boolean },
    value: {},
    checked: { type: Boolean },
    modelValue: {},
    small: { type: Boolean },
    inline: { type: Boolean },
    readonly: { type: Boolean },
    readonlyOpacity: { default: 0.75 },
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
    Pt((s) => ({
      "111a1563": s.readonlyOpacity
    }));
    const e = a, t = w(() => e.errorMessage || e.validMessage), n = w(() => t.value ? oe("message", "checkbox") : void 0), r = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = De(a, "modelValue");
    return (s, o) => (u(), f("div", {
      class: q(["fr-fieldset__element", { "fr-fieldset__element--inline": s.inline, readonly: s.readonly }])
    }, [
      c("div", {
        class: q(["fr-checkbox-group", {
          "fr-checkbox-group--error": s.errorMessage,
          "fr-checkbox-group--valid": !s.errorMessage && s.validMessage,
          "fr-checkbox-group--sm": s.small
        }])
      }, [
        Me(c("input", X({
          id: s.id,
          "onUpdate:modelValue": o[0] || (o[0] = (i) => l.value = i),
          name: s.name,
          type: "checkbox",
          value: s.value,
          checked: l.value === !0 || Array.isArray(l.value) && l.value.includes(s.value),
          required: s.required
        }, s.$attrs, {
          "data-testid": `input-checkbox-${s.id}`,
          "data-test": `input-checkbox-${s.id}`,
          tabindex: s.readonly ? -1 : void 0,
          "aria-describedby": n.value
        }), null, 16, vs), [
          [Lt, l.value]
        ]),
        c("label", {
          for: s.id,
          class: "fr-label"
        }, [
          F(s.$slots, "label", {}, () => [
            H(b(s.label) + " ", 1),
            F(s.$slots, "required-tip", {}, () => [
              s.required ? (u(), f("span", hs, " *")) : y("", !0)
            ], !0)
          ], !0),
          s.hint ? (u(), f("span", bs, b(s.hint), 1)) : y("", !0)
        ], 8, ms),
        t.value ? (u(), f("div", {
          key: 0,
          id: n.value,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: q(["fr-message--info flex items-center", r.value])
          }, b(t.value), 3)
        ], 8, gs)) : y("", !0)
      ], 2)
    ], 2));
  }
}), Ot = /* @__PURE__ */ _e(ys, [["__scopeId", "data-v-922852d8"]]), ks = { class: "fr-form-group" }, ws = ["disabled", "aria-labelledby", "aria-invalid", "role"], _s = ["id"], Ts = {
  key: 0,
  class: "required"
}, xs = ["id"], Ds = /* @__PURE__ */ V({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Re({
    titleId: { default: () => oe("checkbox", "set") },
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
    const e = a, t = w(() => e.errorMessage || e.validMessage), n = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), r = w(() => t.value ? `${e.titleId} messages-${e.titleId}` : e.titleId), l = De(a, "modelValue");
    return (s, o) => (u(), f("div", ks, [
      c("fieldset", {
        class: q(["fr-fieldset", {
          "fr-fieldset--error": s.errorMessage,
          "fr-fieldset--valid": !s.errorMessage && s.validMessage
        }]),
        disabled: s.disabled,
        "aria-labelledby": r.value,
        "aria-invalid": s.ariaInvalid,
        role: s.errorMessage || s.validMessage ? "group" : void 0
      }, [
        c("legend", {
          id: s.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          F(s.$slots, "legend", {}, () => [
            H(b(s.legend) + " ", 1),
            F(s.$slots, "required-tip", {}, () => [
              s.required ? (u(), f("span", Ts, " *")) : y("", !0)
            ])
          ])
        ], 8, _s),
        F(s.$slots, "default", {}, () => [
          (u(!0), f(Z, null, te(s.options, (i) => (u(), j(Ot, {
            id: i.id,
            key: i.id || i.name,
            modelValue: l.value,
            "onUpdate:modelValue": o[0] || (o[0] = (d) => l.value = d),
            value: i.value,
            name: i.name,
            label: i.label,
            disabled: i.disabled,
            "aria-disabled": i.disabled,
            small: s.small,
            inline: s.inline,
            hint: i.hint
          }, null, 8, ["id", "modelValue", "value", "name", "label", "disabled", "aria-disabled", "small", "inline", "hint"]))), 128))
        ]),
        t.value ? (u(), f("div", {
          key: 0,
          id: `messages-${s.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          c("p", {
            class: q(["fr-message--info flex items-center", n.value])
          }, [
            c("span", null, b(t.value), 1)
          ], 2)
        ], 8, xs)) : y("", !0)
      ], 10, ws)
    ]));
  }
}), Is = { class: "fr-consent-banner__content" }, Es = { class: "fr-text--sm" }, Cs = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, Ps = /* @__PURE__ */ V({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(a) {
    const e = a, t = w(() => typeof e.url == "string" && e.url.startsWith("http")), n = w(() => e.url ? t.value ? "a" : "RouterLink" : "a"), r = w(() => ({ [t.value ? "href" : "to"]: e.url }));
    return (l, s) => (u(), f(Z, null, [
      c("div", Is, [
        c("p", Es, [
          F(l.$slots, "default", {}, () => [
            s[4] || (s[4] = H(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (u(), j(me(n.value), X(r.value, { "data-testid": "link" }), {
              default: ee(() => s[3] || (s[3] = [
                H(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            s[5] || (s[5] = H(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", Cs, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: s[0] || (s[0] = ne((o) => l.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: s[1] || (s[1] = ne((o) => l.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: s[2] || (s[2] = ne((o) => l.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), Ls = ["aria-label"], Ms = { class: "fr-pagination__list" }, Bs = ["href", "title", "aria-disabled"], Ss = { class: "fr-sr-only" }, As = ["href", "title", "aria-disabled"], Fs = ["href", "title", "aria-current", "onClick"], Os = { key: 0 }, Rs = { key: 1 }, $s = ["href", "title", "disabled", "aria-disabled"], Ns = ["href", "title", "disabled", "aria-disabled"], Vs = { class: "fr-sr-only" }, qs = /* @__PURE__ */ V({
  __name: "DsfrPagination",
  props: {
    pages: {},
    currentPage: { default: 0 },
    firstPageTitle: { default: "Première page" },
    lastPageTitle: { default: "Dernière page" },
    nextPageTitle: { default: "Page suivante" },
    prevPageTitle: { default: "Page précédente" },
    truncLimit: { default: 5 },
    ariaLabel: { default: "Pagination" }
  },
  emits: ["update:current-page"],
  setup(a, { emit: e }) {
    const t = a, n = e, r = w(() => Math.min(t.pages.length - 1 - t.truncLimit, Math.max(t.currentPage - (t.truncLimit - t.truncLimit % 2) / 2, 0))), l = w(() => Math.min(t.pages.length - 1, r.value + t.truncLimit)), s = w(() => t.pages.length > t.truncLimit ? t.pages.slice(r.value, l.value + 1) : t.pages), o = (T) => n("update:current-page", T), i = (T) => o(T), d = () => i(0), p = () => i(Math.max(0, t.currentPage - 1)), m = () => i(Math.min(t.pages.length - 1, t.currentPage + 1)), v = () => i(t.pages.length - 1), L = (T) => t.pages.indexOf(T) === t.currentPage;
    return (T, B) => {
      var g, _, E, A;
      return u(), f("nav", {
        role: "navigation",
        class: "fr-pagination",
        "aria-label": T.ariaLabel
      }, [
        c("ul", Ms, [
          c("li", null, [
            c("a", {
              href: (g = T.pages[0]) == null ? void 0 : g.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: T.firstPageTitle,
              "aria-disabled": T.currentPage === 0 ? !0 : void 0,
              onClick: B[0] || (B[0] = ne((C) => d(), ["prevent"]))
            }, [
              c("span", Ss, b(T.firstPageTitle), 1)
            ], 8, Bs)
          ]),
          c("li", null, [
            c("a", {
              href: (_ = T.pages[Math.max(T.currentPage - 1, 0)]) == null ? void 0 : _.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: T.prevPageTitle,
              "aria-disabled": T.currentPage === 0 ? !0 : void 0,
              onClick: B[1] || (B[1] = ne((C) => p(), ["prevent"]))
            }, b(T.prevPageTitle), 9, As)
          ]),
          (u(!0), f(Z, null, te(s.value, (C, K) => (u(), f("li", { key: K }, [
            c("a", {
              href: C == null ? void 0 : C.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: C.title,
              "aria-current": L(C) ? "page" : void 0,
              onClick: ne((R) => i(T.pages.indexOf(C)), ["prevent"])
            }, [
              s.value.indexOf(C) === 0 && r.value > 0 ? (u(), f("span", Os, "...")) : y("", !0),
              H(" " + b(C.label) + " ", 1),
              s.value.indexOf(C) === s.value.length - 1 && l.value < T.pages.length - 1 ? (u(), f("span", Rs, "...")) : y("", !0)
            ], 8, Fs)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (E = T.pages[Math.min(T.currentPage + 1, T.pages.length - 1)]) == null ? void 0 : E.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: T.nextPageTitle,
              disabled: T.currentPage === T.pages.length - 1 ? !0 : void 0,
              "aria-disabled": T.currentPage === T.pages.length - 1 ? !0 : void 0,
              onClick: B[2] || (B[2] = ne((C) => m(), ["prevent"]))
            }, b(T.nextPageTitle), 9, $s)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (A = T.pages.at(-1)) == null ? void 0 : A.href,
              title: T.lastPageTitle,
              disabled: T.currentPage === T.pages.length - 1 ? !0 : void 0,
              "aria-disabled": T.currentPage === T.pages.length - 1 ? !0 : void 0,
              onClick: B[3] || (B[3] = ne((C) => v(), ["prevent"]))
            }, [
              c("span", Vs, b(T.lastPageTitle), 1)
            ], 8, Ns)
          ])
        ])
      ], 8, Ls);
    };
  }
}), ca = /* @__PURE__ */ _e(qs, [["__scopeId", "data-v-5b44f494"]]), js = { class: "fr-table" }, Hs = { class: "fr-table__wrapper" }, Ks = { class: "fr-table__container" }, Ws = { class: "fr-table__content" }, Ys = ["id"], Qs = { key: 0 }, zs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Gs = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Xs = ["id", "checked"], Us = ["for"], Zs = ["tabindex", "onClick", "onKeydown"], Js = { key: 0 }, eo = { key: 1 }, to = ["data-row-key"], ao = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, no = { class: "fr-checkbox-group fr-checkbox-group--sm" }, ro = ["id", "value"], lo = ["for"], so = ["onKeydown"], oo = { class: "flex gap-2 items-center" }, io = ["for"], uo = ["id"], co = ["selected"], fo = ["value", "selected"], po = { class: "flex ml-1" }, vo = { class: "self-center" }, mo = /* @__PURE__ */ V({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Re({
    id: { default: () => oe("table") },
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
    paginationAriaLabel: { default: "Pagination" },
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
  emits: /* @__PURE__ */ Re(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: e }) {
    const t = a, n = e, r = De(a, "selection"), l = De(a, "rowsPerPage"), s = De(a, "currentPage"), o = w(() => Math.ceil(t.rows.length / l.value)), i = w(() => t.pages ?? Array.from({ length: o.value }).map((D, $) => ({ label: `${$ + 1}`, title: `Page ${$ + 1}`, href: `#${$ + 1}` }))), d = w(() => s.value * l.value), p = w(() => (s.value + 1) * l.value), m = De(a, "sortedBy"), v = De(a, "sortedDesc");
    function L(D, $) {
      const x = m.value ?? t.sorted;
      return (D[x] ?? D) < ($[x] ?? $) ? -1 : (D[x] ?? D) > ($[x] ?? $) ? 1 : 0;
    }
    function T(D) {
      if (!(!t.sortableRows || Array.isArray(t.sortableRows) && !t.sortableRows.includes(D))) {
        if (m.value === D) {
          if (v.value) {
            m.value = void 0, v.value = !1;
            return;
          }
          v.value = !0;
          return;
        }
        v.value = !1, m.value = D;
      }
    }
    const B = w(() => {
      const D = m.value ? t.rows.slice().sort(t.sortFn ?? L) : t.rows.slice();
      return v.value && D.reverse(), D;
    }), g = w(() => t.headersRow.map((D) => typeof D != "object" ? D : D.key)), _ = w(() => g.value.findIndex((D) => D === t.rowKey)), E = w(() => {
      const D = B.value.map(($) => Array.isArray($) ? $ : g.value.map((x) => typeof $ != "object" ? $ : $[x] ?? $));
      return t.pagination ? D.slice(d.value, p.value) : D;
    });
    function A(D) {
      if (D) {
        const $ = t.headersRow.findIndex((x) => x.key ?? x);
        r.value = E.value.map((x) => x[$]);
      } else
        r.value.length = 0;
    }
    const C = w(() => r.value.length === E.value.length);
    function K() {
      n("update:current-page", 0), r.value.length = 0;
    }
    function R(D) {
      navigator.clipboard.writeText(D);
    }
    return (D, $) => (u(), f("div", js, [
      c("div", Hs, [
        c("div", Ks, [
          c("div", Ws, [
            c("table", { id: D.id }, [
              D.noCaption ? y("", !0) : (u(), f("caption", Qs, b(D.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  D.selectableRows ? (u(), f("th", zs, [
                    c("div", Gs, [
                      c("input", {
                        id: `table-select--${D.id}-all`,
                        checked: C.value,
                        type: "checkbox",
                        onInput: $[0] || ($[0] = (x) => A(x.target.checked))
                      }, null, 40, Xs),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${D.id}-all`
                      }, " Sélectionner tout ", 8, Us)
                    ])
                  ])) : y("", !0),
                  (u(!0), f(Z, null, te(D.headersRow, (x, M) => (u(), f("th", X({
                    key: typeof x == "object" ? x.key : x,
                    scope: "col",
                    ref_for: !0
                  }, typeof x == "object" && x.headerAttrs, {
                    tabindex: D.sortableRows ? 0 : void 0,
                    onClick: (h) => T(x.key ?? (Array.isArray(D.rows[0]) ? M : x)),
                    onKeydown: [
                      se((h) => T(x.key ?? x), ["enter"]),
                      se((h) => T(x.key ?? x), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: q({ "sortable-header": D.sortableRows === !0 || Array.isArray(D.sortableRows) && D.sortableRows.includes(x.key ?? x) })
                    }, [
                      F(D.$slots, "header", X({ ref_for: !0 }, typeof x == "object" ? x : { key: x, label: x }), () => [
                        H(b(typeof x == "object" ? x.label : x), 1)
                      ], !0),
                      m.value !== (x.key ?? x) && (D.sortableRows === !0 || Array.isArray(D.sortableRows) && D.sortableRows.includes(x.key ?? x)) ? (u(), f("span", Js, [
                        re(we, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : m.value === (x.key ?? x) ? (u(), f("span", eo, [
                        re(we, {
                          name: v.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : y("", !0)
                    ], 2)
                  ], 16, Zs))), 128))
                ])
              ]),
              c("tbody", null, [
                (u(!0), f(Z, null, te(E.value, (x, M) => (u(), f("tr", {
                  key: `row-${M}`,
                  "data-row-key": M + 1
                }, [
                  D.selectableRows ? (u(), f("th", ao, [
                    c("div", no, [
                      Me(c("input", {
                        id: `row-select-${D.id}-${M}`,
                        "onUpdate:modelValue": $[1] || ($[1] = (h) => r.value = h),
                        value: x[_.value] ?? `row-${M}`,
                        type: "checkbox"
                      }, null, 8, ro), [
                        [Lt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${D.id}-${M}`
                      }, " Sélectionner la ligne " + b(M + 1), 9, lo)
                    ])
                  ])) : y("", !0),
                  (u(!0), f(Z, null, te(x, (h, P) => (u(), f("td", {
                    key: typeof h == "object" ? h[D.rowKey] : h,
                    tabindex: "0",
                    onKeydown: [
                      se(ne((k) => R(typeof h == "object" ? h[D.rowKey] : h), ["ctrl"]), ["c"]),
                      se(ne((k) => R(typeof h == "object" ? h[D.rowKey] : h), ["meta"]), ["c"])
                    ]
                  }, [
                    F(D.$slots, "cell", X({ ref_for: !0 }, {
                      colKey: typeof D.headersRow[P] == "object" ? D.headersRow[P].key : D.headersRow[P],
                      cell: h
                    }), () => [
                      H(b(typeof h == "object" ? h[D.rowKey] : h), 1)
                    ], !0)
                  ], 40, so))), 128))
                ], 8, to))), 128))
              ])
            ], 8, Ys)
          ])
        ])
      ]),
      c("div", {
        class: q(D.bottomActionBarClass)
      }, [
        F(D.$slots, "pagination", {}, () => [
          D.pagination && !D.$slots.pagination ? (u(), f("div", {
            key: 0,
            class: q(["flex justify-between items-center", D.paginationWrapperClass])
          }, [
            c("div", oo, [
              c("label", {
                class: "fr-label",
                for: `${D.id}-pagination-options`
              }, " Résultats par page : ", 8, io),
              Me(c("select", {
                id: `${D.id}-pagination-options`,
                "onUpdate:modelValue": $[2] || ($[2] = (x) => l.value = x),
                class: "fr-select",
                onChange: $[3] || ($[3] = (x) => K())
              }, [
                c("option", {
                  value: "",
                  selected: !D.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, co),
                (u(!0), f(Z, null, te(D.paginationOptions, (x, M) => (u(), f("option", {
                  key: M,
                  value: x,
                  selected: +x === l.value
                }, b(x), 9, fo))), 128))
              ], 40, uo), [
                [la, l.value]
              ])
            ]),
            c("div", po, [
              c("span", vo, "Page " + b(s.value + 1) + " sur " + b(o.value), 1)
            ]),
            re(ca, {
              "current-page": s.value,
              "onUpdate:currentPage": [
                $[4] || ($[4] = (x) => s.value = x),
                $[5] || ($[5] = (x) => r.value.length = 0)
              ],
              pages: i.value,
              "aria-label": D.paginationAriaLabel
            }, null, 8, ["current-page", "pages", "aria-label"])
          ], 2)) : y("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), ho = /* @__PURE__ */ _e(mo, [["__scopeId", "data-v-3d58686c"]]), bo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", go = { class: "fr-container flex" }, yo = { class: "half" }, ko = { class: "fr-h1" }, wo = { class: "flex fr-my-md-3w" }, _o = { class: "fr-h6" }, To = /* @__PURE__ */ V({
  __name: "DsfrErrorPage",
  props: {
    title: { default: "Page non trouvée" },
    subtitle: { default: "Erreur 404" },
    description: { default: "La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée." },
    help: { default: "Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est correcte. La page n'est peut être plus disponible." },
    buttons: { default: void 0 }
  },
  setup(a) {
    return (e, t) => {
      var n;
      return u(), f("div", go, [
        c("div", yo, [
          c("h1", ko, b(e.title), 1),
          c("span", wo, b(e.subtitle), 1),
          c("p", _o, b(e.description), 1),
          c("p", null, b(e.help), 1),
          (n = e.buttons) != null && n.length ? (u(), j(Ft, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : y("", !0),
          F(e.$slots, "default", {}, void 0, !0)
        ]),
        t[0] || (t[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: bo
          })
        ], -1))
      ]);
    };
  }
}), xo = /* @__PURE__ */ _e(To, [["__scopeId", "data-v-0f6cf5b4"]]), Do = { class: "fr-fieldset" }, Io = ["id"], Eo = {
  key: 1,
  class: "fr-fieldset__element"
}, Co = { class: "fr-fieldset__element" }, hn = /* @__PURE__ */ V({
  __name: "DsfrFieldset",
  props: {
    legend: { default: "" },
    legendClass: { default: "" },
    legendId: { default: "" },
    hint: { default: "" },
    hintClass: { default: "" }
  },
  setup(a) {
    return (e, t) => {
      var n, r, l, s;
      return u(), f("fieldset", Do, [
        e.legend || (r = (n = e.$slots).legend) != null && r.call(n) ? (u(), f("legend", {
          key: 0,
          id: e.legendId,
          class: q(["fr-fieldset__legend", e.legendClass])
        }, [
          H(b(e.legend) + " ", 1),
          F(e.$slots, "legend")
        ], 10, Io)) : y("", !0),
        e.hint || (s = (l = e.$slots).hint) != null && s.call(l) ? (u(), f("div", Eo, [
          c("span", {
            class: q(["fr-hint-text", e.hintClass])
          }, [
            H(b(e.hint) + " ", 1),
            F(e.$slots, "hint")
          ], 2)
        ])) : y("", !0),
        c("div", Co, [
          F(e.$slots, "default")
        ])
      ]);
    };
  }
}), Po = ["href", "download"], Lo = { class: "fr-link__detail" }, bn = /* @__PURE__ */ V({
  __name: "DsfrFileDownload",
  props: {
    title: { default: "Télécharger le document" },
    format: { default: "JPEG" },
    size: { default: "250 Ko" },
    href: { default: "#" },
    download: { default: "" }
  },
  setup(a) {
    return (e, t) => (u(), f("a", {
      href: e.href,
      download: e.download,
      class: "fr-link fr-link--download"
    }, [
      H(b(e.title) + " ", 1),
      c("span", Lo, b(e.format) + " – " + b(e.size), 1)
    ], 8, Po));
  }
}), Mo = { class: "fr-downloads-group fr-downloads-group--bordered" }, Bo = {
  key: 0,
  class: "fr-downloads-group__title"
}, So = /* @__PURE__ */ V({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (e, t) => (u(), f("div", Mo, [
      e.title ? (u(), f("h4", Bo, b(e.title), 1)) : y("", !0),
      c("ul", null, [
        (u(!0), f(Z, null, te(e.files, (n, r) => (u(), f("li", { key: r }, [
          re(bn, {
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
}), Ao = ["for"], Fo = {
  key: 0,
  class: "required"
}, Oo = {
  key: 1,
  class: "fr-hint-text"
}, Ro = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], $o = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, No = ["id"], Vo = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => oe("file-upload") },
    label: { default: "Ajouter un fichier" },
    accept: { default: void 0 },
    hint: { default: "" },
    error: { default: "" },
    validMessage: { default: "" },
    disabled: { type: Boolean },
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "change"],
  setup(a, { emit: e }) {
    const t = a, n = e, r = (s) => {
      var o, i;
      n("update:modelValue", (o = s.target) == null ? void 0 : o.value), n("change", (i = s.target) == null ? void 0 : i.files);
    }, l = w(() => Array.isArray(t.accept) ? t.accept.join(",") : t.accept);
    return (s, o) => (u(), f("div", {
      class: q(["fr-upload-group", {
        "fr-upload-group--error": s.error,
        "fr-upload-group--valid": s.validMessage,
        "fr-upload-group--disabled": s.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: s.id
      }, [
        H(b(s.label) + " ", 1),
        "required" in s.$attrs && s.$attrs.required !== !1 ? (u(), f("span", Fo, " *")) : y("", !0),
        s.hint ? (u(), f("span", Oo, b(s.hint), 1)) : y("", !0)
      ], 8, Ao),
      c("input", X({
        id: s.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": s.error || s.validMessage ? `${s.id}-desc` : void 0
      }, s.$attrs, {
        value: s.modelValue,
        disabled: s.disabled,
        "aria-disabled": s.disabled,
        accept: l.value,
        onChange: o[0] || (o[0] = (i) => r(i))
      }), null, 16, Ro),
      s.error || s.validMessage ? (u(), f("div", $o, [
        s.error ? (u(), f("p", {
          key: 0,
          id: `${s.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, b(s.error ?? s.validMessage), 9, No)) : y("", !0)
      ])) : y("", !0)
    ], 2));
  }
}), qo = { class: "fr-follow__newsletter" }, jo = { class: "fr-h5 fr-follow__title" }, Ho = { class: "fr-text--sm fr-follow__desc" }, Ko = { key: 0 }, Wo = ["title"], Yo = { key: 1 }, Qo = { action: "" }, zo = {
  class: "fr-label",
  for: "newsletter-email"
}, Go = { class: "fr-input-wrap fr-input-wrap--addon" }, Xo = ["title", "placeholder", "value"], Uo = ["title"], Zo = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Jo = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, ei = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, gn = /* @__PURE__ */ V({
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
  setup(a, { emit: e }) {
    const t = e, n = (r) => t("update:email", r.target.value);
    return (r, l) => (u(), f("div", qo, [
      c("div", null, [
        c("h3", jo, b(r.title), 1),
        c("p", Ho, b(r.description), 1)
      ]),
      r.onlyCallout ? (u(), f("div", Ko, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (s) => r.buttonAction ? r.buttonAction(s) : () => {
          })
        }, b(r.buttonText), 9, Wo)
      ])) : (u(), f("div", Yo, [
        c("form", Qo, [
          c("label", zo, b(r.labelEmail), 1),
          c("div", Go, [
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
              onInput: l[1] || (l[1] = (s) => n(s))
            }, null, 40, Xo),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: r.buttonTitle,
              type: "submit"
            }, b(r.buttonText), 9, Uo)
          ]),
          r.error ? (u(), f("div", Zo, [
            c("p", Jo, b(r.error), 1)
          ])) : y("", !0),
          c("p", ei, b(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), ti = { class: "fr-follow__social" }, ai = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, ni = ["title", "href"], yn = /* @__PURE__ */ V({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (e, t) => (u(), f("div", ti, [
      (u(), j(me(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: ee(() => t[0] || (t[0] = [
          H(" Suivez-nous "),
          c("br", null, null, -1),
          H(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (u(), f("ul", ai, [
        (u(!0), f(Z, null, te(e.networks, (n, r) => (u(), f("li", { key: r }, [
          c("a", {
            class: q(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, b(n.name), 11, ni)
        ]))), 128))
      ])) : y("", !0)
    ]));
  }
}), ri = { class: "fr-follow" }, li = { class: "fr-container" }, si = { class: "fr-grid-row" }, oi = /* @__PURE__ */ V({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const e = a, t = w(() => e.networks && e.networks.length), n = w(() => typeof e.newsletterData == "object");
    return (r, l) => (u(), f("div", ri, [
      c("div", li, [
        c("div", si, [
          F(r.$slots, "default", {}, () => [
            r.newsletterData ? (u(), f("div", {
              key: 0,
              class: q(["fr-col-12", { "fr-col-md-8": t.value }])
            }, [
              re(gn, Ee(Mt(r.newsletterData)), null, 16)
            ], 2)) : y("", !0),
            t.value ? (u(), f("div", {
              key: 1,
              class: q(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              re(yn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : y("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ba = 1, kn = /* @__PURE__ */ V({
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
    const e = a, t = w(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("http");
    }), n = w(() => {
      var p;
      return (p = e.href) == null ? void 0 : p.startsWith("mailto");
    }), r = w(() => e.button ? "button" : t.value || n.value ? "a" : "RouterLink"), l = w(() => {
      if (!(!t.value && !n.value))
        return e.href;
    }), s = w(() => {
      if (!(t.value || n.value))
        return e.to;
    }), o = w(() => s.value ? { to: s.value } : { href: l.value }), i = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), d = w(
      () => typeof e.icon == "string" ? { name: e.icon, scale: Ba, ...e.iconAttrs ?? {} } : { scale: Ba, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, m) => (u(), j(me(r.value), X({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": i.value && p.iconRight,
        "fr-btn--icon-left": i.value && !p.iconRight,
        [String(p.icon)]: i.value
      }]
    }, o.value, {
      target: p.target,
      onClick: ne(p.onClick, ["stop"])
    }), {
      default: ee(() => {
        var v, L;
        return [
          !i.value && (p.icon || (v = p.iconAttrs) != null && v.name) && !p.iconRight ? (u(), j(we, X({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : y("", !0),
          H(" " + b(p.label) + " ", 1),
          !i.value && (p.icon || (L = p.iconAttrs) != null && L.name) && p.iconRight ? (u(), j(we, X({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : y("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), ii = { class: "fr-footer__partners" }, ui = { class: "fr-footer__partners-logos" }, di = {
  key: 0,
  class: "fr-footer__partners-main"
}, ci = ["href"], fi = ["src", "alt"], pi = { class: "fr-footer__partners-sub" }, vi = ["href"], mi = ["src", "alt"], wn = /* @__PURE__ */ V({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" },
    titleTag: { default: "h4" }
  },
  setup(a) {
    return (e, t) => (u(), f("div", ii, [
      e.title ? (u(), j(me(e.titleTag), {
        key: 0,
        class: "fr-footer__partners-title"
      }, {
        default: ee(() => [
          H(b(e.title), 1)
        ]),
        _: 1
      })) : y("", !0),
      c("div", ui, [
        e.mainPartner ? (u(), f("div", di, [
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
            }, null, 8, fi)
          ], 8, ci)
        ])) : y("", !0),
        c("div", pi, [
          c("ul", null, [
            (u(!0), f(Z, null, te(e.subPartners, (n, r) => (u(), f("li", { key: r }, [
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
                }, null, 8, mi)
              ], 8, vi)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), hi = ["innerHTML"], Ke = /* @__PURE__ */ V({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const e = a, t = w(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (n, r) => (u(), f("p", {
      class: q(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: t.value
    }, null, 10, hi));
  }
}), bi = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, gi = {
  key: 0,
  class: "fr-footer__top"
}, yi = { class: "fr-container" }, ki = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, wi = { class: "fr-container" }, _i = { class: "fr-footer__body" }, Ti = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, xi = ["href"], Di = ["src", "alt"], Ii = ["src", "alt"], Ei = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, Ci = { class: "fr-footer__content" }, Pi = { class: "fr-footer__content-desc" }, Li = { class: "fr-footer__content-list" }, Mi = ["href", "title"], Bi = { class: "fr-footer__bottom" }, Si = { class: "fr-footer__bottom-list" }, Ai = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, Fi = /* @__PURE__ */ V({
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
    const e = a, t = w(() => [
      ...e.beforeMandatoryLinks,
      ...e.mandatoryLinks,
      ...e.afterMandatoryLinks
    ]), n = ra(), r = w(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n);
    }), l = w(() => {
      const p = e.licenceTo || e.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), s = w(() => {
      const { to: p, href: m, ...v } = e.licenceLinkProps ?? {};
      return v;
    }), o = w(() => l.value ? "" : e.licenceTo), i = w(() => l.value ? e.licenceTo : ""), d = w(() => typeof e.operatorTo == "string" && e.operatorTo.startsWith("http"));
    return (p, m) => {
      const v = xe("RouterLink");
      return u(), f("footer", bi, [
        r.value ? (u(), f("div", gi, [
          c("div", yi, [
            c("div", ki, [
              F(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : y("", !0),
        c("div", wi, [
          c("div", _i, [
            p.operatorImgSrc ? (u(), f("div", Ti, [
              re(Ke, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              d.value ? (u(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: Ie(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, Di)
              ], 8, xi)) : (u(), j(v, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: ee(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: Ie(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, Ii)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (u(), f("div", Ei, [
              re(v, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: ee(() => [
                  re(Ke, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", Ci, [
              c("p", Pi, [
                F(p.$slots, "description", {}, () => [
                  H(b(p.descText), 1)
                ], !0)
              ]),
              c("ul", Li, [
                (u(!0), f(Z, null, te(p.ecosystemLinks, ({ href: L, label: T, title: B, ...g }, _) => (u(), f("li", {
                  key: _,
                  class: "fr-footer__content-item"
                }, [
                  c("a", X({
                    class: "fr-footer__content-link",
                    href: L,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: B,
                    ref_for: !0
                  }, g), b(T), 17, Mi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (u(), j(wn, Ee(X({ key: 0 }, p.partners)), null, 16)) : y("", !0),
          c("div", Bi, [
            c("ul", Si, [
              (u(!0), f(Z, null, te(t.value, (L, T) => (u(), f("li", {
                key: T,
                class: "fr-footer__bottom-item"
              }, [
                re(kn, X({ ref_for: !0 }, L), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (u(), f("div", Ai, [
              c("p", null, [
                H(b(p.licenceText) + " ", 1),
                (u(), j(me(l.value ? "a" : "RouterLink"), X({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : o.value,
                  href: l.value ? i.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, s.value), {
                  default: ee(() => [
                    H(b(p.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target", "title"]))
              ])
            ])) : y("", !0)
          ])
        ])
      ]);
    };
  }
}), Oi = /* @__PURE__ */ _e(Fi, [["__scopeId", "data-v-4030eed5"]]), Ri = { class: "fr-footer__top-list" }, $i = ["href"], Ni = /* @__PURE__ */ V({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] },
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (e, t) => {
      const n = xe("RouterLink");
      return u(), f("div", null, [
        (u(), j(me(e.titleTag), { class: "fr-footer__top-cat" }, {
          default: ee(() => [
            H(b(e.categoryName), 1)
          ]),
          _: 1
        })),
        c("ul", Ri, [
          (u(!0), f(Z, null, te(e.links, (r, l) => (u(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (u(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, b(r.label), 9, $i)) : y("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (u(), j(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: ee(() => [
                H(b(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : y("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Vi = { class: "fr-connect-group" }, qi = ["href", "title"], ji = /* @__PURE__ */ V({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (e, t) => (u(), f("div", Vi, [
      c("button", {
        class: q(["fr-connect", [{ "fr-connect--plus": e.secure }]])
      }, t[0] || (t[0] = [
        c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1),
        c("span", { class: "fr-connect__brand" }, "FranceConnect", -1)
      ]), 2),
      c("p", null, [
        c("a", {
          href: e.url ?? `https://franceconnect.gouv.fr/${e.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, b(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, qi)
      ])
    ]));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var _n = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], yt = /* @__PURE__ */ _n.join(","), Tn = typeof Element > "u", We = Tn ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, kt = !Tn && Element.prototype.getRootNode ? function(a) {
  var e;
  return a == null || (e = a.getRootNode) === null || e === void 0 ? void 0 : e.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, wt = function a(e, t) {
  var n;
  t === void 0 && (t = !0);
  var r = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), l = r === "" || r === "true", s = l || t && e && a(e.parentNode);
  return s;
}, Hi = function(a) {
  var e, t = a == null || (e = a.getAttribute) === null || e === void 0 ? void 0 : e.call(a, "contenteditable");
  return t === "" || t === "true";
}, xn = function(a, e, t) {
  if (wt(a))
    return [];
  var n = Array.prototype.slice.apply(a.querySelectorAll(yt));
  return e && We.call(a, yt) && n.unshift(a), n = n.filter(t), n;
}, Dn = function a(e, t, n) {
  for (var r = [], l = Array.from(e); l.length; ) {
    var s = l.shift();
    if (!wt(s, !1))
      if (s.tagName === "SLOT") {
        var o = s.assignedElements(), i = o.length ? o : s.children, d = a(i, !0, n);
        n.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: s,
          candidates: d
        });
      } else {
        var p = We.call(s, yt);
        p && n.filter(s) && (t || !e.includes(s)) && r.push(s);
        var m = s.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), v = !wt(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
        if (m && v) {
          var L = a(m === !0 ? s.children : m.children, !0, n);
          n.flatten ? r.push.apply(r, L) : r.push({
            scopeParent: s,
            candidates: L
          });
        } else
          l.unshift.apply(l, s.children);
      }
  }
  return r;
}, In = function(a) {
  return !isNaN(parseInt(a.getAttribute("tabindex"), 10));
}, qe = function(a) {
  if (!a)
    throw new Error("No node provided");
  return a.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(a.tagName) || Hi(a)) && !In(a) ? 0 : a.tabIndex;
}, Ki = function(a, e) {
  var t = qe(a);
  return t < 0 && e && !In(a) ? 0 : t;
}, Wi = function(a, e) {
  return a.tabIndex === e.tabIndex ? a.documentOrder - e.documentOrder : a.tabIndex - e.tabIndex;
}, En = function(a) {
  return a.tagName === "INPUT";
}, Yi = function(a) {
  return En(a) && a.type === "hidden";
}, Qi = function(a) {
  var e = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(t) {
    return t.tagName === "SUMMARY";
  });
  return e;
}, zi = function(a, e) {
  for (var t = 0; t < a.length; t++)
    if (a[t].checked && a[t].form === e)
      return a[t];
}, Gi = function(a) {
  if (!a.name)
    return !0;
  var e = a.form || kt(a), t = function(l) {
    return e.querySelectorAll('input[type="radio"][name="' + l + '"]');
  }, n;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    n = t(window.CSS.escape(a.name));
  else
    try {
      n = t(a.name);
    } catch (l) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", l.message), !1;
    }
  var r = zi(n, a.form);
  return !r || r === a;
}, Xi = function(a) {
  return En(a) && a.type === "radio";
}, Ui = function(a) {
  return Xi(a) && !Gi(a);
}, Zi = function(a) {
  var e, t = a && kt(a), n = (e = t) === null || e === void 0 ? void 0 : e.host, r = !1;
  if (t && t !== a) {
    var l, s, o;
    for (r = !!((l = n) !== null && l !== void 0 && (s = l.ownerDocument) !== null && s !== void 0 && s.contains(n) || a != null && (o = a.ownerDocument) !== null && o !== void 0 && o.contains(a)); !r && n; ) {
      var i, d, p;
      t = kt(n), n = (i = t) === null || i === void 0 ? void 0 : i.host, r = !!((d = n) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return r;
}, Sa = function(a) {
  var e = a.getBoundingClientRect(), t = e.width, n = e.height;
  return t === 0 && n === 0;
}, Ji = function(a, e) {
  var t = e.displayCheck, n = e.getShadowRoot;
  if (getComputedStyle(a).visibility === "hidden")
    return !0;
  var r = We.call(a, "details>summary:first-of-type"), l = r ? a.parentElement : a;
  if (We.call(l, "details:not([open]) *"))
    return !0;
  if (!t || t === "full" || t === "legacy-full") {
    if (typeof n == "function") {
      for (var s = a; a; ) {
        var o = a.parentElement, i = kt(a);
        if (o && !o.shadowRoot && n(o) === !0)
          return Sa(a);
        a.assignedSlot ? a = a.assignedSlot : !o && i !== a.ownerDocument ? a = i.host : a = o;
      }
      a = s;
    }
    if (Zi(a))
      return !a.getClientRects().length;
    if (t !== "legacy-full")
      return !0;
  } else if (t === "non-zero-area")
    return Sa(a);
  return !1;
}, eu = function(a) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(a.tagName))
    for (var e = a.parentElement; e; ) {
      if (e.tagName === "FIELDSET" && e.disabled) {
        for (var t = 0; t < e.children.length; t++) {
          var n = e.children.item(t);
          if (n.tagName === "LEGEND")
            return We.call(e, "fieldset[disabled] *") ? !0 : !n.contains(a);
        }
        return !0;
      }
      e = e.parentElement;
    }
  return !1;
}, _t = function(a, e) {
  return !(e.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  wt(e) || Yi(e) || Ji(e, a) || // For a details element with a summary, the summary element gets the focus
  Qi(e) || eu(e));
}, Gt = function(a, e) {
  return !(Ui(e) || qe(e) < 0 || !_t(a, e));
}, tu = function(a) {
  var e = parseInt(a.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, au = function a(e) {
  var t = [], n = [];
  return e.forEach(function(r, l) {
    var s = !!r.scopeParent, o = s ? r.scopeParent : r, i = Ki(o, s), d = s ? a(r.candidates) : o;
    i === 0 ? s ? t.push.apply(t, d) : t.push(o) : n.push({
      documentOrder: l,
      tabIndex: i,
      item: r,
      isScope: s,
      content: d
    });
  }), n.sort(Wi).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(t);
}, nu = function(a, e) {
  e = e || {};
  var t;
  return e.getShadowRoot ? t = Dn([a], e.includeContainer, {
    filter: Gt.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: tu
  }) : t = xn(a, e.includeContainer, Gt.bind(null, e)), au(t);
}, ru = function(a, e) {
  e = e || {};
  var t;
  return e.getShadowRoot ? t = Dn([a], e.includeContainer, {
    filter: _t.bind(null, e),
    flatten: !0,
    getShadowRoot: e.getShadowRoot
  }) : t = xn(a, e.includeContainer, _t.bind(null, e)), t;
}, ze = function(a, e) {
  if (e = e || {}, !a)
    throw new Error("No node provided");
  return We.call(a, yt) === !1 ? !1 : Gt(e, a);
}, lu = /* @__PURE__ */ _n.concat("iframe").join(","), qt = function(a, e) {
  if (e = e || {}, !a)
    throw new Error("No node provided");
  return We.call(a, lu) === !1 ? !1 : _t(e, a);
};
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Xt(a, e) {
  (e == null || e > a.length) && (e = a.length);
  for (var t = 0, n = Array(e); t < e; t++) n[t] = a[t];
  return n;
}
function su(a) {
  if (Array.isArray(a)) return Xt(a);
}
function ou(a, e, t) {
  return (e = fu(e)) in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function iu(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function uu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Aa(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    e && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Fa(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Aa(Object(t), !0).forEach(function(n) {
      ou(a, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : Aa(Object(t)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return a;
}
function du(a) {
  return su(a) || iu(a) || pu(a) || uu();
}
function cu(a, e) {
  if (typeof a != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(a, e);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(a);
}
function fu(a) {
  var e = cu(a, "string");
  return typeof e == "symbol" ? e : e + "";
}
function pu(a, e) {
  if (a) {
    if (typeof a == "string") return Xt(a, e);
    var t = {}.toString.call(a).slice(8, -1);
    return t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set" ? Array.from(a) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Xt(a, e) : void 0;
  }
}
var Oa = {
  activateTrap: function(a, e) {
    if (a.length > 0) {
      var t = a[a.length - 1];
      t !== e && t._setPausedState(!0);
    }
    var n = a.indexOf(e);
    n === -1 || a.splice(n, 1), a.push(e);
  },
  deactivateTrap: function(a, e) {
    var t = a.indexOf(e);
    t !== -1 && a.splice(t, 1), a.length > 0 && !a[a.length - 1]._isManuallyPaused() && a[a.length - 1]._setPausedState(!1);
  }
}, vu = function(a) {
  return a.tagName && a.tagName.toLowerCase() === "input" && typeof a.select == "function";
}, mu = function(a) {
  return (a == null ? void 0 : a.key) === "Escape" || (a == null ? void 0 : a.key) === "Esc" || (a == null ? void 0 : a.keyCode) === 27;
}, ot = function(a) {
  return (a == null ? void 0 : a.key) === "Tab" || (a == null ? void 0 : a.keyCode) === 9;
}, hu = function(a) {
  return ot(a) && !a.shiftKey;
}, bu = function(a) {
  return ot(a) && a.shiftKey;
}, Ra = function(a) {
  return setTimeout(a, 0);
}, nt = function(a) {
  for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    t[n - 1] = arguments[n];
  return typeof a == "function" ? a.apply(void 0, t) : a;
}, pt = function(a) {
  return a.target.shadowRoot && typeof a.composedPath == "function" ? a.composedPath()[0] : a.target;
}, gu = [], yu = function(a, e) {
  var t = (e == null ? void 0 : e.document) || document, n = (e == null ? void 0 : e.trapStack) || gu, r = Fa({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: hu,
    isKeyBackward: bu
  }, e), l = {
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
    manuallyPaused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, s, o = function(h, P, k) {
    return h && h[P] !== void 0 ? h[P] : r[k || P];
  }, i = function(h, P) {
    var k = typeof (P == null ? void 0 : P.composedPath) == "function" ? P.composedPath() : void 0;
    return l.containerGroups.findIndex(function(S) {
      var I = S.container, O = S.tabbableNodes;
      return I.contains(h) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (k == null ? void 0 : k.includes(I)) || O.find(function(N) {
        return N === h;
      });
    });
  }, d = function(h) {
    var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, k = P.hasFallback, S = k === void 0 ? !1 : k, I = P.params, O = I === void 0 ? [] : I, N = r[h];
    if (typeof N == "function" && (N = N.apply(void 0, du(O))), N === !0 && (N = void 0), !N) {
      if (N === void 0 || N === !1)
        return N;
      throw new Error("`".concat(h, "` was specified but was not a node, or did not return a node"));
    }
    var z = N;
    if (typeof N == "string") {
      try {
        z = t.querySelector(N);
      } catch (U) {
        throw new Error("`".concat(h, '` appears to be an invalid selector; error="').concat(U.message, '"'));
      }
      if (!z && !S)
        throw new Error("`".concat(h, "` as selector refers to no known node"));
    }
    return z;
  }, p = function() {
    var h = d("initialFocus", {
      hasFallback: !0
    });
    if (h === !1)
      return !1;
    if (h === void 0 || h && !qt(h, r.tabbableOptions))
      if (i(t.activeElement) >= 0)
        h = t.activeElement;
      else {
        var P = l.tabbableGroups[0], k = P && P.firstTabbableNode;
        h = k || d("fallbackFocus");
      }
    else h === null && (h = d("fallbackFocus"));
    if (!h)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return h;
  }, m = function() {
    if (l.containerGroups = l.containers.map(function(h) {
      var P = nu(h, r.tabbableOptions), k = ru(h, r.tabbableOptions), S = P.length > 0 ? P[0] : void 0, I = P.length > 0 ? P[P.length - 1] : void 0, O = k.find(function(U) {
        return ze(U);
      }), N = k.slice().reverse().find(function(U) {
        return ze(U);
      }), z = !!P.find(function(U) {
        return qe(U) > 0;
      });
      return {
        container: h,
        tabbableNodes: P,
        focusableNodes: k,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: z,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: S,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: I,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: O,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: N,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(U) {
          var le = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ie = P.indexOf(U);
          return ie < 0 ? le ? k.slice(k.indexOf(U) + 1).find(function(W) {
            return ze(W);
          }) : k.slice(0, k.indexOf(U)).reverse().find(function(W) {
            return ze(W);
          }) : P[ie + (le ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(h) {
      return h.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(h) {
      return h.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, v = function(h) {
    var P = h.activeElement;
    if (P)
      return P.shadowRoot && P.shadowRoot.activeElement !== null ? v(P.shadowRoot) : P;
  }, L = function(h) {
    if (h !== !1 && h !== v(document)) {
      if (!h || !h.focus) {
        L(p());
        return;
      }
      h.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = h, vu(h) && h.select();
    }
  }, T = function(h) {
    var P = d("setReturnFocus", {
      params: [h]
    });
    return P || (P === !1 ? !1 : h);
  }, B = function(h) {
    var P = h.target, k = h.event, S = h.isBackward, I = S === void 0 ? !1 : S;
    P = P || pt(k), m();
    var O = null;
    if (l.tabbableGroups.length > 0) {
      var N = i(P, k), z = N >= 0 ? l.containerGroups[N] : void 0;
      if (N < 0)
        I ? O = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : O = l.tabbableGroups[0].firstTabbableNode;
      else if (I) {
        var U = l.tabbableGroups.findIndex(function(de) {
          var fe = de.firstTabbableNode;
          return P === fe;
        });
        if (U < 0 && (z.container === P || qt(P, r.tabbableOptions) && !ze(P, r.tabbableOptions) && !z.nextTabbableNode(P, !1)) && (U = N), U >= 0) {
          var le = U === 0 ? l.tabbableGroups.length - 1 : U - 1, ie = l.tabbableGroups[le];
          O = qe(P) >= 0 ? ie.lastTabbableNode : ie.lastDomTabbableNode;
        } else ot(k) || (O = z.nextTabbableNode(P, !1));
      } else {
        var W = l.tabbableGroups.findIndex(function(de) {
          var fe = de.lastTabbableNode;
          return P === fe;
        });
        if (W < 0 && (z.container === P || qt(P, r.tabbableOptions) && !ze(P, r.tabbableOptions) && !z.nextTabbableNode(P)) && (W = N), W >= 0) {
          var J = W === l.tabbableGroups.length - 1 ? 0 : W + 1, ae = l.tabbableGroups[J];
          O = qe(P) >= 0 ? ae.firstTabbableNode : ae.firstDomTabbableNode;
        } else ot(k) || (O = z.nextTabbableNode(P));
      }
    } else
      O = d("fallbackFocus");
    return O;
  }, g = function(h) {
    var P = pt(h);
    if (!(i(P, h) >= 0)) {
      if (nt(r.clickOutsideDeactivates, h)) {
        s.deactivate({
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
      nt(r.allowOutsideClick, h) || h.preventDefault();
    }
  }, _ = function(h) {
    var P = pt(h), k = i(P, h) >= 0;
    if (k || P instanceof Document)
      k && (l.mostRecentlyFocusedNode = P);
    else {
      h.stopImmediatePropagation();
      var S, I = !0;
      if (l.mostRecentlyFocusedNode)
        if (qe(l.mostRecentlyFocusedNode) > 0) {
          var O = i(l.mostRecentlyFocusedNode), N = l.containerGroups[O].tabbableNodes;
          if (N.length > 0) {
            var z = N.findIndex(function(U) {
              return U === l.mostRecentlyFocusedNode;
            });
            z >= 0 && (r.isKeyForward(l.recentNavEvent) ? z + 1 < N.length && (S = N[z + 1], I = !1) : z - 1 >= 0 && (S = N[z - 1], I = !1));
          }
        } else
          l.containerGroups.some(function(U) {
            return U.tabbableNodes.some(function(le) {
              return qe(le) > 0;
            });
          }) || (I = !1);
      else
        I = !1;
      I && (S = B({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), L(S || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, E = function(h) {
    var P = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = h;
    var k = B({
      event: h,
      isBackward: P
    });
    k && (ot(h) && h.preventDefault(), L(k));
  }, A = function(h) {
    (r.isKeyForward(h) || r.isKeyBackward(h)) && E(h, r.isKeyBackward(h));
  }, C = function(h) {
    mu(h) && nt(r.escapeDeactivates, h) !== !1 && (h.preventDefault(), s.deactivate());
  }, K = function(h) {
    var P = pt(h);
    i(P, h) >= 0 || nt(r.clickOutsideDeactivates, h) || nt(r.allowOutsideClick, h) || (h.preventDefault(), h.stopImmediatePropagation());
  }, R = function() {
    if (l.active)
      return Oa.activateTrap(n, s), l.delayInitialFocusTimer = r.delayInitialFocus ? Ra(function() {
        L(p());
      }) : L(p()), t.addEventListener("focusin", _, !0), t.addEventListener("mousedown", g, {
        capture: !0,
        passive: !1
      }), t.addEventListener("touchstart", g, {
        capture: !0,
        passive: !1
      }), t.addEventListener("click", K, {
        capture: !0,
        passive: !1
      }), t.addEventListener("keydown", A, {
        capture: !0,
        passive: !1
      }), t.addEventListener("keydown", C), s;
  }, D = function() {
    if (l.active)
      return t.removeEventListener("focusin", _, !0), t.removeEventListener("mousedown", g, !0), t.removeEventListener("touchstart", g, !0), t.removeEventListener("click", K, !0), t.removeEventListener("keydown", A, !0), t.removeEventListener("keydown", C), s;
  }, $ = function(h) {
    var P = h.some(function(k) {
      var S = Array.from(k.removedNodes);
      return S.some(function(I) {
        return I === l.mostRecentlyFocusedNode;
      });
    });
    P && L(p());
  }, x = typeof window < "u" && "MutationObserver" in window ? new MutationObserver($) : void 0, M = function() {
    x && (x.disconnect(), l.active && !l.paused && l.containers.map(function(h) {
      x.observe(h, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return s = {
    get active() {
      return l.active;
    },
    get paused() {
      return l.paused;
    },
    activate: function(h) {
      if (l.active)
        return this;
      var P = o(h, "onActivate"), k = o(h, "onPostActivate"), S = o(h, "checkCanFocusTrap");
      S || m(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = t.activeElement, P == null || P();
      var I = function() {
        S && m(), R(), M(), k == null || k();
      };
      return S ? (S(l.containers.concat()).then(I, I), this) : (I(), this);
    },
    deactivate: function(h) {
      if (!l.active)
        return this;
      var P = Fa({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, h);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, D(), l.active = !1, l.paused = !1, M(), Oa.deactivateTrap(n, s);
      var k = o(P, "onDeactivate"), S = o(P, "onPostDeactivate"), I = o(P, "checkCanReturnFocus"), O = o(P, "returnFocus", "returnFocusOnDeactivate");
      k == null || k();
      var N = function() {
        Ra(function() {
          O && L(T(l.nodeFocusedBeforeActivation)), S == null || S();
        });
      };
      return O && I ? (I(T(l.nodeFocusedBeforeActivation)).then(N, N), this) : (N(), this);
    },
    pause: function(h) {
      return l.active ? (l.manuallyPaused = !0, this._setPausedState(!0, h)) : this;
    },
    unpause: function(h) {
      return l.active ? (l.manuallyPaused = !1, n[n.length - 1] !== this ? this : this._setPausedState(!1, h)) : this;
    },
    updateContainerElements: function(h) {
      var P = [].concat(h).filter(Boolean);
      return l.containers = P.map(function(k) {
        return typeof k == "string" ? t.querySelector(k) : k;
      }), l.active && m(), M(), this;
    }
  }, Object.defineProperties(s, {
    _isManuallyPaused: {
      value: function() {
        return l.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(h, P) {
        if (l.paused === h)
          return this;
        if (l.paused = h, h) {
          var k = o(P, "onPause"), S = o(P, "onPostPause");
          k == null || k(), D(), M(), S == null || S();
        } else {
          var I = o(P, "onUnpause"), O = o(P, "onPostUnpause");
          I == null || I(), m(), R(), M(), O == null || O();
        }
        return this;
      }
    }
  }), s.updateContainerElements(a), s;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const ku = {
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
}, Cn = V({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, ku),
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
  setup(a, { slots: e, emit: t }) {
    let n;
    const r = G(null), l = w(() => {
      const o = r.value;
      return o && (o instanceof HTMLElement ? o : o.$el);
    });
    function s() {
      return n || (n = yu(l.value, {
        escapeDeactivates: a.escapeDeactivates,
        allowOutsideClick: a.allowOutsideClick,
        returnFocusOnDeactivate: a.returnFocusOnDeactivate,
        clickOutsideDeactivates: a.clickOutsideDeactivates,
        onActivate: () => {
          t("update:active", !0), t("activate");
        },
        onDeactivate: () => {
          t("update:active", !1), t("deactivate");
        },
        onPostActivate: () => t("postActivate"),
        onPostDeactivate: () => t("postDeactivate"),
        initialFocus: a.initialFocus,
        fallbackFocus: a.fallbackFocus,
        tabbableOptions: a.tabbableOptions,
        delayInitialFocus: a.delayInitialFocus,
        preventScroll: a.preventScroll
      }));
    }
    return ke(() => {
      ve(() => a.active, (o) => {
        o && l.value ? s().activate() : n && (n.deactivate(), (!l.value || l.value.nodeType === Node.COMMENT_NODE) && (n = null));
      }, { immediate: !0, flush: "post" });
    }), Ce(() => {
      n && n.deactivate(), n = null;
    }), {
      activate() {
        s().activate();
      },
      deactivate() {
        n && n.deactivate();
      },
      renderImpl() {
        if (!e.default)
          return null;
        const o = e.default().filter((i) => i.type !== en);
        return !o || !o.length || o.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), o) : tn(o[0], { ref: r });
      }
    };
  }
}), wu = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, _u = { class: "fr-nav__item" }, Tu = ["aria-controls", "aria-expanded", "title"], xu = { class: "fr-hidden-lg" }, Du = ["id"], Iu = { class: "fr-menu__list" }, Eu = ["hreflang", "lang", "aria-current", "href", "onClick"], dt = /* @__PURE__ */ V({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => oe("language-selector") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" },
    title: { default: "Sélectionner une langue" }
  },
  emits: ["select"],
  setup(a, { emit: e }) {
    const t = a, n = e, {
      collapse: r,
      collapsing: l,
      cssExpanded: s,
      doExpand: o,
      onTransitionEnd: i
    } = Ae(), d = G(!1);
    function p(v) {
      d.value = !1, n("select", v);
    }
    const m = w(
      () => t.languages.find(({ codeIso: v }) => v === t.currentLanguage)
    );
    return ve(d, (v, L) => {
      v !== L && o(v);
    }), (v, L) => {
      var T, B;
      return u(), f("nav", wu, [
        c("div", _u, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": v.id,
            "aria-expanded": d.value,
            title: v.title,
            type: "button",
            onClick: L[0] || (L[0] = ne((g) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            H(b((T = m.value) == null ? void 0 : T.codeIso.toUpperCase()), 1),
            c("span", xu, " - " + b((B = m.value) == null ? void 0 : B.label), 1)
          ], 8, Tu),
          c("div", {
            id: v.id,
            ref_key: "collapse",
            ref: r,
            class: q(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": Y(s), "fr-collapsing": Y(l) }]),
            onTransitionend: L[1] || (L[1] = (g) => Y(i)(d.value))
          }, [
            c("ul", Iu, [
              (u(!0), f(Z, null, te(v.languages, (g, _) => (u(), f("li", { key: _ }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: g.codeIso,
                  lang: g.codeIso,
                  "aria-current": v.currentLanguage === g.codeIso ? !0 : void 0,
                  href: `#${g.codeIso}`,
                  onClick: ne((E) => p(g), ["prevent", "stop"])
                }, b(`${g.codeIso.toUpperCase()} - ${g.label}`), 9, Eu)
              ]))), 128))
            ])
          ], 42, Du)
        ])
      ]);
    };
  }
}), Cu = ["for"], Pu = {
  key: 0,
  class: "required"
}, Lu = {
  key: 0,
  class: "fr-hint-text"
}, Mu = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => oe("basic", "input") },
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
  setup(a, { expose: e }) {
    const t = a, n = wr(), r = G(null), l = () => {
      var d;
      return (d = r.value) == null ? void 0 : d.focus();
    }, s = w(() => t.isTextarea ? "textarea" : "input"), o = w(() => t.isWithWrapper || n.type === "date" || !!t.wrapperClass), i = w(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return e({
      focus: l
    }), (d, p) => (u(), f(Z, null, [
      c("label", {
        class: q(i.value),
        for: d.id
      }, [
        F(d.$slots, "label", {}, () => [
          H(b(d.label) + " ", 1),
          F(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (u(), f("span", Pu, "*")) : y("", !0)
          ], !0)
        ], !0),
        d.hint ? (u(), f("span", Lu, b(d.hint), 1)) : y("", !0)
      ], 10, Cu),
      o.value ? (u(), f("div", {
        key: 1,
        class: q([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (u(), j(me(s.value), X({ id: d.id }, d.$attrs, {
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
      ], 2)) : (u(), j(me(s.value), X({
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
}), Rt = /* @__PURE__ */ _e(Mu, [["__scopeId", "data-v-7ca45de8"]]), Bu = {
  key: 1,
  class: "fr-sr-only"
}, ct = /* @__PURE__ */ V({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => oe("search", "input") },
    label: { default: "" },
    large: { type: Boolean },
    buttonText: { default: "" },
    modelValue: { default: "" },
    placeholder: { default: "Rechercher" },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "search"],
  setup(a, { emit: e }) {
    const t = e;
    return (n, r) => (u(), f("div", {
      class: q(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      re(Rt, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => t("update:modelValue", l)),
        onKeydown: r[1] || (r[1] = se((l) => t("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label", "disabled", "aria-disabled"]),
      re(He, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: r[2] || (r[2] = (l) => t("search", n.modelValue))
      }, {
        default: ee(() => [
          n.buttonText ? (u(), f(Z, { key: 0 }, [
            H(b(n.buttonText), 1)
          ], 64)) : (u(), f("span", Bu, " Rechercher "))
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), $a = 1, fa = /* @__PURE__ */ V({
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
    const e = a, t = w(() => typeof e.path == "string"), n = w(() => {
      var m;
      return ((m = e.href) == null ? void 0 : m.startsWith("http")) || t.value && e.path.startsWith("http") || typeof e.to == "string" && e.to.startsWith("http");
    }), r = w(() => {
      var m;
      return ((m = e.href) == null ? void 0 : m.startsWith("mailto")) || t.value && e.path.startsWith("mailto") || typeof e.to == "string" && e.to.startsWith("mailto");
    }), l = w(() => e.button ? "button" : n.value || r.value ? "a" : "RouterLink"), s = w(() => {
      if (!(!n.value && !r.value))
        return e.to ?? e.href ?? e.path;
    }), o = w(() => {
      if (!(n.value || r.value))
        return e.to ?? e.path;
    }), i = w(() => o.value ? { to: o.value } : { href: s.value }), d = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), p = w(
      () => typeof e.icon == "string" ? { name: e.icon, scale: $a, ...e.iconAttrs ?? {} } : { scale: $a, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (m, v) => (u(), j(me(l.value), X({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && m.iconRight,
        "fr-btn--icon-left": d.value && !m.iconRight,
        [String(m.icon)]: d.value
      }]
    }, i.value, {
      target: m.target,
      onClick: v[0] || (v[0] = ne((L) => m.onClick(L), ["stop"]))
    }), {
      default: ee(() => {
        var L, T;
        return [
          !d.value && (m.icon || (L = m.iconAttrs) != null && L.name) && !m.iconRight ? (u(), j(we, X({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : y("", !0),
          H(" " + b(m.label) + " ", 1),
          !d.value && (m.icon || (T = m.iconAttrs) != null && T.name) && m.iconRight ? (u(), j(we, X({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : y("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Su = ["aria-label"], Au = { class: "fr-btns-group" }, Ut = /* @__PURE__ */ V({
  __name: "DsfrHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(a, { emit: e }) {
    const t = e;
    return (n, r) => (u(), f("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      c("ul", Au, [
        (u(!0), f(Z, null, te(n.links, (l, s) => (u(), f("li", { key: s }, [
          re(fa, X({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var i;
              t("linkClick", o), (i = l.onClick) == null || i.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Su));
  }
}), Fu = {
  role: "banner",
  class: "fr-header"
}, Ou = { class: "fr-header__body" }, Ru = { class: "fr-container width-inherit" }, $u = { class: "fr-header__body-row" }, Nu = { class: "fr-header__brand fr-enlarge-link" }, Vu = { class: "fr-header__brand-top" }, qu = { class: "fr-header__logo" }, ju = {
  key: 0,
  class: "fr-header__operator"
}, Hu = ["src", "alt"], Ku = {
  key: 1,
  class: "fr-header__navbar"
}, Wu = ["aria-label", "title", "data-fr-opened"], Yu = { class: "fr-sr-only" }, Qu = { class: "fr-sr-only" }, zu = {
  key: 0,
  class: "fr-header__service"
}, Gu = { class: "fr-header__service-title" }, Xu = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Uu = {
  key: 0,
  class: "fr-header__service-tagline"
}, Zu = {
  key: 1,
  class: "fr-header__service"
}, Ju = { class: "fr-header__tools" }, ed = {
  key: 0,
  class: "fr-header__tools-links"
}, td = {
  key: 1,
  class: "fr-header__search fr-modal"
}, ad = ["aria-label"], nd = { class: "fr-container" }, rd = { class: "fr-header__menu-links" }, ld = {
  key: 1,
  class: "flex justify-center items-center"
}, sd = { class: "fr-header__menu fr-modal" }, od = {
  key: 0,
  class: "fr-container"
}, id = /* @__PURE__ */ V({
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
  setup(a, { emit: e }) {
    const t = a, n = e, r = ra(), l = ft(t, "languageSelector"), s = G(!1), o = G(!1), i = G(!1), d = () => {
      var _;
      i.value = !1, s.value = !1, o.value = !1, (_ = document.getElementById("button-menu")) == null || _.focus();
    }, p = (_) => {
      _.key === "Escape" && d();
    };
    ke(() => {
      document.addEventListener("keydown", p);
    }), Ce(() => {
      document.removeEventListener("keydown", p);
    });
    const m = () => {
      i.value = !0, s.value = !0, o.value = !1, setTimeout(() => {
        var _;
        (_ = document.getElementById("close-button")) == null || _.focus();
      }, 50);
    }, v = () => {
      i.value = !0, s.value = !1, o.value = !0;
    }, L = d, T = w(() => [t.homeLabel, t.serviceTitle].filter((_) => _).join(" - ")), B = w(() => !!r.operator || !!t.operatorImgSrc), g = w(() => !!r.mainnav);
    return $e(da, () => d), (_, E) => {
      var A, C, K;
      const R = xe("RouterLink");
      return u(), f("header", Fu, [
        c("div", Ou, [
          c("div", Ru, [
            c("div", $u, [
              c("div", Nu, [
                c("div", Vu, [
                  c("div", qu, [
                    _.serviceTitle ? (u(), j(Ke, {
                      key: 1,
                      "logo-text": _.logoText,
                      "data-testid": "header-logo"
                    }, null, 8, ["logo-text"])) : (u(), j(R, {
                      key: 0,
                      to: _.homeTo,
                      title: T.value
                    }, {
                      default: ee(() => [
                        re(Ke, {
                          "logo-text": _.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"]))
                  ]),
                  B.value ? (u(), f("div", ju, [
                    F(_.$slots, "operator", {}, () => [
                      _.operatorImgSrc ? (u(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: _.operatorImgSrc,
                        alt: _.operatorImgAlt,
                        style: Ie(_.operatorImgStyle)
                      }, null, 12, Hu)) : y("", !0)
                    ])
                  ])) : y("", !0),
                  _.showSearch || g.value || (A = _.quickLinks) != null && A.length ? (u(), f("div", Ku, [
                    _.showSearch ? (u(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": _.showSearchLabel,
                      title: _.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: E[0] || (E[0] = ne((D) => v(), ["prevent", "stop"]))
                    }, [
                      c("span", Yu, b(_.showSearchLabel), 1)
                    ], 8, Wu)) : y("", !0),
                    g.value || (C = _.quickLinks) != null && C.length ? (u(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": m,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "data-testid": "open-menu-btn",
                      onClick: E[1] || (E[1] = ne((D) => m(), ["prevent", "stop"]))
                    }, [
                      c("span", Qu, b(_.menuLabel), 1)
                    ])) : y("", !0)
                  ])) : y("", !0)
                ]),
                _.serviceTitle ? (u(), f("div", zu, [
                  re(R, X({
                    to: _.homeTo,
                    title: T.value
                  }, _.$attrs), {
                    default: ee(() => [
                      c("p", Gu, [
                        H(b(_.serviceTitle) + " ", 1),
                        _.showBeta ? (u(), f("span", Xu, " BETA ")) : y("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  _.serviceDescription ? (u(), f("p", Uu, b(_.serviceDescription), 1)) : y("", !0)
                ])) : y("", !0),
                !_.serviceTitle && _.showBeta ? (u(), f("div", Zu, E[9] || (E[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : y("", !0)
              ]),
              c("div", Ju, [
                (K = _.quickLinks) != null && K.length || l.value ? (u(), f("div", ed, [
                  F(_.$slots, "before-quick-links"),
                  s.value ? y("", !0) : (u(), j(Ut, {
                    key: 0,
                    links: _.quickLinks,
                    "nav-aria-label": _.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  F(_.$slots, "after-quick-links"),
                  l.value ? (u(), j(dt, X({ key: 1 }, l.value, {
                    onSelect: E[2] || (E[2] = (D) => n("languageSelect", D))
                  }), null, 16)) : y("", !0)
                ])) : y("", !0),
                _.showSearch ? (u(), f("div", td, [
                  re(ct, {
                    id: _.searchbarId,
                    label: _.searchLabel,
                    "model-value": _.modelValue,
                    placeholder: _.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": E[3] || (E[3] = (D) => n("update:modelValue", D)),
                    onSearch: E[4] || (E[4] = (D) => n("search", D))
                  }, null, 8, ["id", "label", "model-value", "placeholder"])
                ])) : y("", !0)
              ])
            ]),
            i.value ? (u(), j(Y(Cn), {
              key: 0,
              active: i.value,
              "focus-trap-options": {
                initialFocus: "#close-button",
                fallbackFocus: "#close-button",
                escapeDeactivates: !0,
                clickOutsideDeactivates: !0,
                returnFocusOnDeactivate: !0
              }
            }, {
              default: ee(() => [
                (_.showSearch || g.value || _.quickLinks && _.quickLinks.length || l.value) && i.value ? (u(), f("div", {
                  key: 0,
                  id: "header-navigation",
                  class: "fr-header__menu fr-modal fr-modal--opened",
                  "aria-label": _.menuModalLabel,
                  role: "dialog",
                  "aria-modal": "true"
                }, [
                  c("div", nd, [
                    c("button", {
                      id: "close-button",
                      class: "fr-btn fr-btn--close",
                      "aria-controls": "header-navigation",
                      "data-testid": "close-modal-btn",
                      onClick: E[5] || (E[5] = ne((D) => d(), ["prevent", "stop"]))
                    }, b(_.closeMenuModalLabel), 1),
                    c("div", rd, [
                      l.value ? (u(), j(dt, X({ key: 0 }, l.value, {
                        onSelect: E[6] || (E[6] = (D) => l.value.currentLanguage = D.codeIso)
                      }), null, 16)) : y("", !0),
                      F(_.$slots, "before-quick-links"),
                      s.value ? (u(), j(Ut, {
                        key: 1,
                        role: "navigation",
                        links: _.quickLinks,
                        "nav-aria-label": _.quickLinksAriaLabel,
                        onLinkClick: Y(L)
                      }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : y("", !0),
                      F(_.$slots, "after-quick-links")
                    ]),
                    i.value ? F(_.$slots, "mainnav", {
                      key: 0,
                      hidemodal: d
                    }) : y("", !0),
                    o.value ? (u(), f("div", ld, [
                      re(ct, {
                        "searchbar-id": _.searchbarId,
                        "model-value": _.modelValue,
                        placeholder: _.placeholder,
                        "onUpdate:modelValue": E[7] || (E[7] = (D) => n("update:modelValue", D)),
                        onSearch: E[8] || (E[8] = (D) => n("search", D))
                      }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                    ])) : y("", !0)
                  ])
                ], 8, ad)) : y("", !0)
              ]),
              _: 3
            }, 8, ["active"])) : y("", !0),
            F(_.$slots, "default")
          ])
        ]),
        c("div", sd, [
          g.value && !i.value ? (u(), f("div", od, [
            F(_.$slots, "mainnav", { hidemodal: d })
          ])) : y("", !0)
        ])
      ]);
    };
  }
}), ud = /* @__PURE__ */ V({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(a) {
    return (e, t) => (u(), f("div", {
      class: q(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      c("p", {
        class: q({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        H(b(e.text) + " ", 1),
        F(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), dd = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, cd = ["id", "data-testid"], fd = ["id", "data-testid"], pd = ["id", "data-testid"], vd = ["id", "data-testid"], md = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => oe("input", "group") },
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
    return (e, t) => (u(), f("div", {
      class: q(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      F(e.$slots, "before-input"),
      F(e.$slots, "default", {
        isValid: !!e.validMessage,
        isInvalid: !!e.errorMessage,
        descriptionId: (e.errorMessage || e.validMessage) && e.descriptionId || void 0
      }),
      e.$slots.default ? y("", !0) : (u(), j(Rt, X({ key: 0 }, e.$attrs, {
        "is-valid": !!e.validMessage,
        "is-invalid": !!e.errorMessage,
        label: e.label,
        hint: e.hint,
        "description-id": (e.errorMessage || e.validMessage) && e.descriptionId || void 0,
        "label-visible": e.labelVisible,
        "model-value": e.modelValue,
        placeholder: e.placeholder,
        "onUpdate:modelValue": t[0] || (t[0] = (n) => e.$emit("update:modelValue", n))
      }), null, 16, ["is-valid", "is-invalid", "label", "hint", "description-id", "label-visible", "model-value", "placeholder"])),
      c("div", dd, [
        Array.isArray(e.errorMessage) ? (u(!0), f(Z, { key: 0 }, te(e.errorMessage, (n) => (u(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, b(n), 9, cd))), 128)) : e.errorMessage ? (u(), f("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, b(e.errorMessage), 9, fd)) : y("", !0),
        Array.isArray(e.validMessage) ? (u(!0), f(Z, { key: 2 }, te(e.validMessage, (n) => (u(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, b(n), 9, pd))), 128)) : e.validMessage ? (u(), f("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, b(e.validMessage), 9, vd)) : y("", !0)
      ])
    ], 2));
  }
}), hd = ["aria-labelledby", "role", "open"], bd = { class: "fr-container fr-container--fluid fr-container-md" }, gd = { class: "fr-grid-row fr-grid-row--center" }, yd = { class: "fr-modal__body" }, kd = { class: "fr-modal__header" }, wd = ["title"], _d = { class: "fr-modal__content" }, Td = ["id"], xd = {
  key: 0,
  class: "fr-modal__footer"
}, Na = 2, Dd = /* @__PURE__ */ V({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => oe("modal", "dialog") },
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
  setup(a, { emit: e }) {
    const t = a, n = e, r = (T) => {
      T.key === "Escape" && m();
    }, l = w(() => t.isAlert ? "alertdialog" : "dialog"), s = G(null), o = G();
    ve(() => t.opened, (T) => {
      var B, g;
      T ? ((B = o.value) == null || B.showModal(), setTimeout(() => {
        var _;
        (_ = s.value) == null || _.focus();
      }, 100)) : (g = o.value) == null || g.close(), i(T);
    });
    function i(T) {
      typeof window < "u" && document.body.classList.toggle("modal-open", T);
    }
    ke(() => {
      d(), i(t.opened);
    }), xr(() => {
      p(), i(!1);
    });
    function d() {
      document.addEventListener("keydown", r);
    }
    function p() {
      document.removeEventListener("keydown", r);
    }
    async function m() {
      var T;
      await an(), (T = t.origin) == null || T.focus(), n("close");
    }
    const v = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), L = w(
      () => v.value ? void 0 : typeof t.icon == "string" ? { name: t.icon, scale: Na } : { scale: Na, ...t.icon ?? {} }
    );
    return (T, B) => T.opened ? (u(), j(Y(Cn), { key: 0 }, {
      default: ee(() => {
        var g, _;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: o,
            "aria-modal": "true",
            "aria-labelledby": T.modalId,
            role: l.value,
            class: q(["fr-modal", { "fr-modal--opened": T.opened }]),
            open: T.opened
          }, [
            c("div", bd, [
              c("div", gd, [
                c("div", {
                  class: q(["fr-col-12", {
                    "fr-col-md-8": T.size === "lg",
                    "fr-col-md-6": T.size === "md",
                    "fr-col-md-4": T.size === "sm"
                  }])
                }, [
                  c("div", yd, [
                    c("div", kd, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: s,
                        class: "fr-btn fr-btn--close",
                        title: T.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: B[0] || (B[0] = (E) => m())
                      }, [
                        c("span", null, b(T.closeButtonLabel), 1)
                      ], 8, wd)
                    ]),
                    c("div", _d, [
                      c("h1", {
                        id: T.modalId,
                        class: "fr-modal__title"
                      }, [
                        v.value || L.value ? (u(), f("span", {
                          key: 0,
                          class: q({
                            [String(T.icon)]: v.value
                          })
                        }, [
                          T.icon && L.value ? (u(), j(we, Ee(X({ key: 0 }, L.value)), null, 16)) : y("", !0)
                        ], 2)) : y("", !0),
                        H(" " + b(T.title), 1)
                      ], 8, Td),
                      F(T.$slots, "default", {}, void 0, !0)
                    ]),
                    (g = T.actions) != null && g.length || T.$slots.footer ? (u(), f("div", xd, [
                      F(T.$slots, "footer", {}, void 0, !0),
                      (_ = T.actions) != null && _.length ? (u(), j(Ft, {
                        key: 0,
                        align: "right",
                        buttons: T.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : y("", !0)
                    ])) : y("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, hd)
        ];
      }),
      _: 3
    })) : y("", !0);
  }
}), Pn = /* @__PURE__ */ _e(Dd, [["__scopeId", "data-v-70fe954b"]]), Id = ["for"], Ed = {
  key: 0,
  class: "required"
}, Cd = {
  key: 0,
  class: "fr-hint-text"
}, Pd = ["id"], Ld = ["id"], Md = {
  key: 0,
  class: "fr-btns-group"
}, Bd = {
  key: 1,
  class: "fr-input-group"
}, Sd = { class: "fr-input-wrap fr-icon-search-line" }, Ad = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Fd = { key: 2 }, Od = ["id"], Rd = /* @__PURE__ */ V({
  __name: "DsfrMultiselect",
  props: /* @__PURE__ */ Re({
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
    id: { default: () => oe("multiselect") },
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
    const e = a, t = (W, J) => typeof W == "object" && W !== null && !!J && J in W, n = (W, J) => {
      if (J && t(W, J)) {
        const ae = W[J];
        if (typeof ae == "string" || typeof ae == "number")
          return ae;
        throw new Error(
          `The value of idKey ${String(J)} is not a string or number.`
        );
      }
      if (typeof W == "string" || typeof W == "number")
        return W;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (W, J, ae) => `${J}-${n(W, ae)}`, l = G(null), s = G(!1), o = De(a, "modelValue"), i = G(0), d = w(() => e.errorMessage || e.successMessage), p = w(() => e.errorMessage ? "error" : "valid"), m = [], {
      collapse: v,
      collapsing: L,
      cssExpanded: T,
      doExpand: B,
      onTransitionEnd: g
    } = Ae(), _ = () => document.querySelectorAll(`[id^="${e.id}-"][id$="-checkbox"]`), E = G(!1), A = G("");
    function C(W) {
      W.key === "Escape" && x();
    }
    function K(W) {
      var J, ae;
      const de = W.target;
      !((J = l.value) != null && J.$el.contains(de)) && !((ae = v.value) != null && ae.contains(de)) && x();
    }
    function R(W, J) {
      if (window.ResizeObserver) {
        const ae = new window.ResizeObserver((de) => {
          for (const fe of de)
            J(W, fe);
        });
        return ae.observe(W), () => {
          ae.unobserve(W), ae.disconnect();
        };
      }
      return () => {
      };
    }
    function D(W) {
      const J = W.getBoundingClientRect();
      J.width !== i.value && (i.value = J.width);
    }
    function $() {
      s.value = !0, E.value = !0, l.value && m.push(R(l.value.$el, D)), document.addEventListener("click", K), document.addEventListener("keydown", C), setTimeout(() => {
        B(!0);
      }, 100);
    }
    function x() {
      s.value = !1, B(!1), setTimeout(() => {
        E.value = !1;
      }, 300), h();
    }
    const M = async () => {
      E.value ? x() : $();
    };
    function h() {
      for (; m.length; ) {
        const W = m.pop();
        W && W();
      }
      document.removeEventListener("click", K), document.removeEventListener("keydown", C);
    }
    const P = w(
      () => e.options.filter((W) => typeof W == "object" && W !== null ? e.filteringKeys.some(
        (J) => `${W[J]}`.toLowerCase().includes(A.value.toLowerCase())
      ) : `${W}`.toLowerCase().includes(A.value.toLowerCase()))
    ), k = w(() => e.modelValue.length < P.value.length ? !1 : P.value.every((W) => {
      const J = n(W, e.idKey);
      return e.modelValue.includes(J);
    })), S = () => {
      const W = new Set(o.value || []);
      k.value ? P.value.forEach((J) => {
        const ae = n(J, e.idKey);
        W.delete(ae);
      }) : P.value.forEach((J) => {
        const ae = n(J, e.idKey);
        W.add(ae);
      }), o.value = Array.from(W);
    }, I = (W) => {
      const [J] = _();
      J && (W.preventDefault(), J.focus());
    }, O = (W) => {
      W.preventDefault();
      const J = _(), ae = document.activeElement, de = Array.from(J).indexOf(ae);
      if (de !== -1) {
        const fe = (de + 1) % J.length;
        J[fe].focus();
      }
    }, N = (W) => {
      W.preventDefault();
      const J = _(), ae = document.activeElement, de = Array.from(J).indexOf(ae);
      if (de !== -1) {
        const fe = (de - 1 + J.length) % J.length;
        J[fe].focus();
      }
    }, z = (W) => {
      const J = _(), ae = document.activeElement;
      Array.from(J).indexOf(ae) + 1 === J.length && l.value && !W.shiftKey && x();
    }, U = (W) => {
      var J;
      const ae = document.activeElement;
      W.shiftKey && ae === ((J = l.value) == null ? void 0 : J.$el) && x();
    };
    Ce(() => {
      h();
    });
    const le = w(() => {
      var W;
      const J = ((W = o.value) == null ? void 0 : W.length) ?? 0, ae = J === 0, de = J > 1;
      return ae ? "Sélectionner une option" : `${J} option${de ? "s" : ""} sélectionnée${de ? "s" : ""}`;
    }), ie = w(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return (W, J) => {
      var ae, de;
      return u(), f("div", {
        class: q(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
      }, [
        c("label", {
          class: q(ie.value),
          for: W.id
        }, [
          F(W.$slots, "label", {}, () => [
            H(b(W.label) + " ", 1),
            F(W.$slots, "required-tip", {}, () => [
              "required" in W.$attrs && W.$attrs.required !== !1 ? (u(), f("span", Ed)) : y("", !0)
            ], !0)
          ], !0),
          e.hint || (de = (ae = W.$slots).hint) != null && de.call(ae) ? (u(), f("span", Cd, [
            F(W.$slots, "hint", {}, () => [
              H(b(e.hint), 1)
            ], !0)
          ])) : y("", !0)
        ], 10, Id),
        re(He, X({
          id: e.id,
          ref_key: "host",
          ref: l,
          type: "button"
        }, W.$attrs, {
          class: ["fr-select fr-multiselect", {
            "fr-multiselect--is-open": s.value,
            [`fr-select--${p.value}`]: d.value
          }],
          "aria-expanded": s.value,
          "aria-controls": `${e.id}-collapse`,
          onClick: M,
          onKeydown: se(ne(U, ["shift"]), ["tab"])
        }), {
          default: ee(() => [
            F(W.$slots, "button-label", {}, () => [
              H(b(e.buttonLabel || le.value), 1)
            ], !0)
          ]),
          _: 3
        }, 16, ["id", "aria-expanded", "aria-controls", "class", "onKeydown"]),
        E.value ? (u(), f("div", {
          key: 0,
          id: `${e.id}-collapse`,
          ref_key: "collapse",
          ref: v,
          style: Ie({
            "--width-host": `${i.value}px`
          }),
          class: q(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": Y(T), "fr-collapsing": Y(L) }]),
          onTransitionend: J[2] || (J[2] = (fe) => Y(g)(s.value))
        }, [
          c("p", {
            id: `${W.id}-text-hint`,
            class: "fr-sr-only"
          }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, Ld),
          W.selectAll ? (u(), f("ul", Md, [
            c("li", null, [
              re(He, {
                type: "button",
                name: "select-all",
                secondary: "",
                size: "sm",
                disabled: P.value.length === 0,
                onClick: S,
                onKeydown: se(ne(U, ["shift"]), ["tab"])
              }, {
                default: ee(() => [
                  c("span", {
                    class: q([
                      "fr-multiselect__search__icon",
                      k.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                    ])
                  }, null, 2),
                  H(" " + b(e.selectAllLabel[k.value ? 1 : 0]), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onKeydown"])
            ])
          ])) : y("", !0),
          e.search ? (u(), f("div", Bd, [
            c("div", Sd, [
              re(Rt, {
                modelValue: A.value,
                "onUpdate:modelValue": J[0] || (J[0] = (fe) => A.value = fe),
                "aria-describedby": `${e.id}-text-hint`,
                "aria-controls": `${e.id}-checkboxes`,
                "aria-live": "polite",
                placeholder: "Rechercher",
                type: "text",
                onKeydown: [
                  se(I, ["down"]),
                  se(I, ["right"]),
                  se(U, ["tab"])
                ]
              }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
            ]),
            J[3] || (J[3] = c("div", {
              class: "fr-messages-group",
              "aria-live": "assertive"
            }, null, -1))
          ])) : y("", !0),
          re(hn, {
            id: `${e.id}-checkboxes`,
            class: "fr-multiselect__collapse__fieldset",
            "aria-live": "polite",
            style: Ie({ "--maxOverflowHeight": `${e.maxOverflowHeight}` }),
            legend: e.legend,
            "legend-id": `${e.id}-checkboxes-legend`
          }, {
            default: ee(() => [
              F(W.$slots, "legend", {}, void 0, !0),
              (u(!0), f(Z, null, te(P.value, (fe) => (u(), f("div", {
                key: `${r(fe, W.id, e.idKey)}-checkbox`,
                class: "fr-fieldset__element"
              }, [
                c("div", Ad, [
                  re(Ot, {
                    id: `${r(fe, W.id, e.idKey)}-checkbox`,
                    modelValue: o.value,
                    "onUpdate:modelValue": J[1] || (J[1] = (Fe) => o.value = Fe),
                    value: n(fe, e.idKey),
                    name: `${r(fe, W.id, e.idKey)}-checkbox`,
                    small: "",
                    onKeydown: [
                      se(O, ["down"]),
                      se(O, ["right"]),
                      se(N, ["up"]),
                      se(N, ["left"]),
                      se(z, ["tab"])
                    ]
                  }, {
                    label: ee(() => [
                      F(W.$slots, "checkbox-label", {
                        option: fe
                      }, () => [
                        H(b(n(fe, e.labelKey)), 1)
                      ], !0)
                    ]),
                    _: 2
                  }, 1032, ["id", "modelValue", "value", "name"])
                ])
              ]))), 128))
            ]),
            _: 3
          }, 8, ["id", "style", "legend", "legend-id"]),
          P.value.length === 0 ? (u(), f("div", Fd, [
            F(W.$slots, "no-results", {}, () => [
              J[4] || (J[4] = H(" Pas de résultat "))
            ], !0)
          ])) : y("", !0)
        ], 46, Pd)) : y("", !0),
        d.value ? (u(), f("p", {
          key: 1,
          id: `select-${p.value}-desc-${p.value}`,
          class: q(`fr-${p.value}-text`)
        }, b(d.value), 11, Od)) : y("", !0)
      ], 2);
    };
  }
}), $d = /* @__PURE__ */ _e(Rd, [["__scopeId", "data-v-829d79d0"]]), Nd = ["id", "aria-current"], Vd = /* @__PURE__ */ V({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => oe("nav", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (e, t) => (u(), f("li", {
      id: e.id,
      class: "fr-nav__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      F(e.$slots, "default", {}, void 0, !0)
    ], 8, Nd));
  }
}), Ln = /* @__PURE__ */ _e(Vd, [["__scopeId", "data-v-aa4076c4"]]), qd = ["href"], Va = 2, $t = /* @__PURE__ */ V({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => oe("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(a) {
    const e = a, t = w(() => typeof e.to == "string" && e.to.startsWith("http")), n = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), r = w(
      () => n.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: Va, name: e.icon } : { scale: Va, ...e.icon || {} }
    ), l = kr() ? Ue(da) : void 0, s = (l == null ? void 0 : l()) ?? (() => {
    });
    return (o, i) => {
      const d = xe("RouterLink");
      return t.value ? (u(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: o.to,
        onClick: i[0] || (i[0] = (p) => {
          o.$emit("toggleId", o.id), o.onClick(p);
        })
      }, b(o.text), 9, qd)) : (u(), j(d, {
        key: 1,
        class: q(["fr-nav__link", {
          [String(o.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: o.to,
        onClick: i[1] || (i[1] = (p) => {
          var m;
          Y(s)(), o.$emit("toggleId", o.id), (m = o.onClick) == null || m.call(o, p);
        })
      }, {
        default: ee(() => [
          o.icon && r.value ? (u(), j(we, Ee(X({ key: 0 }, r.value)), null, 16)) : y("", !0),
          H(" " + b(o.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), jd = { class: "fr-col-12 fr-col-lg-3" }, Hd = { class: "fr-mega-menu__category" }, Kd = { class: "fr-mega-menu__list" }, Mn = /* @__PURE__ */ V({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (e, t) => (u(), f("div", jd, [
      c("h5", Hd, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: t[0] || (t[0] = ne(() => {
          }, ["prevent"]))
        }, b(e.title), 1)
      ]),
      c("ul", Kd, [
        (u(!0), f(Z, null, te(e.links, (n, r) => (u(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          re($t, X({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Wd = ["aria-expanded", "aria-current", "aria-controls"], Yd = ["id"], Qd = { class: "fr-container fr-container--fluid fr-container-lg" }, zd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Gd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, Xd = { class: "fr-mega-menu__leader" }, Ud = { class: "fr-h4 fr-mb-2v" }, Zd = { class: "fr-hidden fr-displayed-lg" }, Jd = /* @__PURE__ */ V({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => oe("mega-menu") },
    title: {},
    description: { default: "" },
    link: { default: () => ({ to: "#", text: "Voir toute la rubrique" }) },
    menus: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(a) {
    const e = a, {
      collapse: t,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Ae(), o = w(() => e.id === e.expandedId);
    return ve(o, (i, d) => {
      i !== d && l(i);
    }), ke(() => {
      o.value && l(!0);
    }), (i, d) => {
      const p = xe("RouterLink");
      return u(), f(Z, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": o.value,
          "aria-current": i.active || void 0,
          "aria-controls": i.id,
          onClick: d[0] || (d[0] = (m) => i.$emit("toggleId", i.id))
        }, b(i.title), 9, Wd),
        c("div", {
          id: i.id,
          ref_key: "collapse",
          ref: t,
          "data-testid": "mega-menu-wrapper",
          class: q(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": Y(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Y(n)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (m) => Y(s)(o.value))
        }, [
          c("div", Qd, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (m) => i.$emit("toggleId", i.id))
            }, " Fermer "),
            c("div", zd, [
              c("div", Gd, [
                c("div", Xd, [
                  c("h4", Ud, b(i.title), 1),
                  c("p", Zd, [
                    H(b(i.description) + " ", 1),
                    F(i.$slots, "description", {}, void 0, !0)
                  ]),
                  re(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: i.link.to
                  }, {
                    default: ee(() => [
                      H(b(i.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              F(i.$slots, "default", {}, void 0, !0),
              (u(!0), f(Z, null, te(i.menus, (m, v) => (u(), j(Mn, X({
                key: v,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, Yd)
      ], 64);
    };
  }
}), Bn = /* @__PURE__ */ _e(Jd, [["__scopeId", "data-v-1e103394"]]), ec = ["id", "aria-current"], Sn = /* @__PURE__ */ V({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => oe("menu", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (e, t) => (u(), f("li", {
      id: e.id,
      class: "fr-menu__item",
      "aria-current": e.active ? "page" : void 0
    }, [
      F(e.$slots, "default")
    ], 8, ec));
  }
}), tc = ["aria-expanded", "aria-current", "aria-controls"], ac = ["id"], nc = { class: "fr-menu__list" }, An = /* @__PURE__ */ V({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => oe("menu") },
    title: {},
    links: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(a) {
    const e = a, {
      collapse: t,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Ae(), o = w(() => e.id === e.expandedId);
    return ve(o, (i, d) => {
      i !== d && l(i);
    }), ke(() => {
      o.value && l(!0);
    }), (i, d) => (u(), f(Z, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": o.value,
        "aria-current": i.active || void 0,
        "aria-controls": i.id,
        onClick: d[0] || (d[0] = (p) => i.$emit("toggleId", i.id))
      }, [
        c("span", null, b(i.title), 1)
      ], 8, tc),
      c("div", {
        id: i.id,
        ref_key: "collapse",
        ref: t,
        class: q(["fr-collapse fr-menu", { "fr-collapse--expanded": Y(r), "fr-collapsing": Y(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => Y(s)(o.value))
      }, [
        c("ul", nc, [
          F(i.$slots, "default"),
          (u(!0), f(Z, null, te(i.links, (p, m) => (u(), j(Sn, { key: m }, {
            default: ee(() => [
              re($t, X({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (v) => i.$emit("toggleId", i.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, ac)
    ], 64));
  }
}), rc = ["id", "aria-label"], lc = { class: "fr-nav__list" }, sc = /* @__PURE__ */ V({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => oe("nav") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(a) {
    const e = a, t = G(void 0), n = (o) => {
      if (o === t.value) {
        t.value = void 0;
        return;
      }
      t.value = o;
    }, r = (o) => {
      if (o !== document.getElementById(e.id)) {
        if (!(o != null && o.parentNode)) {
          n(t.value);
          return;
        }
        r(o.parentNode);
      }
    }, l = (o) => {
      r(o.target);
    }, s = (o) => {
      o.key === "Escape" && n(t.value);
    };
    return ke(() => {
      document.addEventListener("click", l), document.addEventListener("keydown", s);
    }), Ce(() => {
      document.removeEventListener("click", l), document.removeEventListener("keydown", s);
    }), (o, i) => (u(), f("nav", {
      id: o.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": o.label
    }, [
      c("ul", lc, [
        F(o.$slots, "default"),
        (u(!0), f(Z, null, te(o.navItems, (d, p) => (u(), j(Ln, {
          id: d.id,
          key: p
        }, {
          default: ee(() => [
            d.to && d.text ? (u(), j($t, X({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": t.value,
              onToggleId: i[0] || (i[0] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (u(), j(An, X({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": t.value,
              onToggleId: i[1] || (i[1] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (u(), j(Bn, X({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": t.value,
              onToggleId: i[2] || (i[2] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : y("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, rc));
  }
}), oc = { class: "fr-container" }, ic = { class: "fr-notice__body" }, uc = { class: "fr-notice__title" }, dc = { class: "fr-notice__desc" }, cc = /* @__PURE__ */ V({
  __name: "DsfrNotice",
  props: {
    title: { default: "" },
    desc: { default: "" },
    closeable: { type: Boolean },
    type: { default: "info" }
  },
  emits: ["close"],
  setup(a) {
    return (e, t) => (u(), f("div", {
      class: q(["fr-notice", `fr-notice--${e.type}`])
    }, [
      c("div", oc, [
        c("div", ic, [
          c("p", null, [
            c("span", uc, [
              F(e.$slots, "default", {}, () => [
                H(b(e.title), 1)
              ])
            ]),
            c("span", dc, [
              F(e.$slots, "desc", {}, () => [
                H(b(e.desc), 1)
              ])
            ])
          ]),
          e.closeable ? (u(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: t[0] || (t[0] = (n) => e.$emit("close"))
          }, " Masquer le message ")) : y("", !0)
        ])
      ])
    ], 2));
  }
}), fc = ["aria-label"], pc = { class: "fr-content-media__img" }, vc = ["src", "alt", "title", "ratio"], mc = { class: "fr-content-media__caption" }, hc = /* @__PURE__ */ V({
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
    return (e, t) => (u(), f("figure", {
      class: q(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      c("div", pc, [
        F(e.$slots, "default", {}, () => [
          e.src ? (u(), f("img", {
            key: 0,
            src: e.src,
            class: q(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, vc)) : y("", !0)
        ])
      ]),
      c("figcaption", mc, b(e.legend), 1)
    ], 10, fc));
  }
}), bc = { class: "fr-quote fr-quote--column" }, gc = ["cite"], yc = { class: "fr-quote__author" }, kc = { class: "fr-quote__source" }, wc = ["href"], _c = {
  key: 0,
  class: "fr-quote__image"
}, Tc = ["src"], xc = /* @__PURE__ */ V({
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
    return (e, t) => (u(), f("figure", bc, [
      e.source ? (u(), f("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        c("p", null, "« " + b(e.quote) + " »", 1)
      ], 8, gc)) : y("", !0),
      c("figcaption", null, [
        c("p", yc, b(e.author), 1),
        c("ul", kc, [
          c("li", null, [
            c("cite", null, b(e.source), 1)
          ]),
          (u(!0), f(Z, null, te(e.details, (n, r) => (u(), f("li", { key: r }, [
            typeof n == "object" ? (u(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, b(n.label), 9, wc)) : (u(), f(Z, { key: 1 }, [
              H(b(n), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (u(), f("div", _c, [
          c("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, Tc)
        ])) : y("", !0)
      ])
    ]));
  }
}), Dc = ["id", "name", "value", "checked", "disabled"], Ic = ["for"], Ec = {
  key: 0,
  class: "required"
}, Cc = {
  key: 0,
  class: "fr-hint-text"
}, Pc = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Lc = ["src", "title"], Mc = { key: 0 }, Bc = ["href"], Sc = ["href"], Ac = ["href"], Fn = /* @__PURE__ */ V({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => oe("basic", "radio") },
    name: {},
    modelValue: { type: [String, Number, Boolean], default: "" },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    value: { type: [String, Number, Boolean] },
    label: { default: "" },
    hint: { default: "" },
    rich: { type: Boolean, default: !1 },
    img: { default: void 0 },
    imgTitle: {},
    svgPath: { default: void 0 },
    svgAttrs: { default: () => ({ viewBox: "0 0 80 80", width: "80px", height: "80px" }) }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const e = a, t = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = w(() => e.rich || !!e.img || !!e.svgPath);
    return (r, l) => (u(), f("div", {
      class: q(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: q(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": r.small
        }])
      }, [
        c("input", X({
          id: r.id,
          type: "radio",
          name: r.name,
          value: r.value,
          checked: r.modelValue === r.value,
          disabled: r.disabled
        }, r.$attrs, {
          onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
        }), null, 16, Dc),
        c("label", {
          for: r.id,
          class: "fr-label"
        }, [
          F(r.$slots, "label", {}, () => [
            H(b(r.label) + " ", 1),
            F(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (u(), f("span", Ec, " *")) : y("", !0)
            ])
          ]),
          r.hint ? (u(), f("span", Cc, b(r.hint), 1)) : y("", !0)
        ], 8, Ic),
        r.img || r.svgPath ? (u(), f("div", Pc, [
          r.img ? (u(), f("img", {
            key: 0,
            src: r.img,
            class: "fr-artwork",
            alt: "",
            title: r.imgTitle
          }, null, 8, Lc)) : (u(), f("svg", X({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...t, ...r.svgAttrs }), [
            r.imgTitle ? (u(), f("title", Mc, b(r.imgTitle), 1)) : y("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${r.svgPath}#artwork-decorative`
            }, null, 8, Bc),
            c("use", {
              class: "fr-artwork-minor",
              href: `${r.svgPath}#artwork-minor`
            }, null, 8, Sc),
            c("use", {
              class: "fr-artwork-major",
              href: `${r.svgPath}#artwork-major`
            }, null, 8, Ac)
          ], 16))
        ])) : y("", !0)
      ], 2)
    ], 2));
  }
}), Fc = { class: "fr-form-group" }, Oc = ["disabled", "aria-labelledby", "aria-describedby", "aria-invalid", "role"], Rc = ["id"], $c = {
  key: 0,
  class: "fr-hint-text"
}, Nc = {
  key: 0,
  class: "required"
}, Vc = ["id"], qc = /* @__PURE__ */ V({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => oe("radio-button", "group") },
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
  setup(a, { emit: e }) {
    const t = a, n = e, r = w(() => t.errorMessage || t.validMessage), l = w(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), s = (i) => {
      i !== t.modelValue && n("update:modelValue", i);
    }, o = w(() => r.value ? `messages-${t.titleId}` : void 0);
    return (i, d) => (u(), f("div", Fc, [
      c("fieldset", {
        class: q(["fr-fieldset", {
          "fr-fieldset--error": i.errorMessage,
          "fr-fieldset--valid": i.validMessage
        }]),
        disabled: i.disabled,
        "aria-labelledby": i.titleId,
        "aria-describedby": o.value,
        "aria-invalid": i.ariaInvalid,
        role: i.errorMessage || i.validMessage ? "group" : void 0
      }, [
        i.legend || i.$slots.legend || i.hint || i.$slots.hint ? (u(), f("legend", {
          key: 0,
          id: i.titleId,
          class: "fr-fieldset__legend fr-fieldset__legend--regular"
        }, [
          F(i.$slots, "legend", {}, () => [
            H(b(i.legend) + " ", 1),
            i.hint || i.$slots.hint ? (u(), f("span", $c, [
              F(i.$slots, "hint", {}, () => [
                H(b(i.hint), 1)
              ])
            ])) : y("", !0),
            F(i.$slots, "required-tip", {}, () => [
              i.required ? (u(), f("span", Nc, " *")) : y("", !0)
            ])
          ])
        ], 8, Rc)) : y("", !0),
        F(i.$slots, "default", {}, () => [
          (u(!0), f(Z, null, te(i.options, (p, m) => (u(), j(Fn, X({
            key: typeof p.value == "boolean" ? m : p.value || m,
            name: i.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: i.small,
            inline: i.inline,
            "model-value": i.modelValue,
            "onUpdate:modelValue": d[0] || (d[0] = (v) => s(v))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        r.value ? (u(), f("div", {
          key: 1,
          id: `messages-${i.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: q(["fr-message fr-message--info flex items-center", l.value])
          }, b(r.value), 3)
        ], 8, Vc)) : y("", !0)
      ], 10, Oc)
    ]));
  }
}), jc = ["id"], Hc = ["id"], Kc = { class: "fr-hint-text" }, Wc = ["data-fr-prefix", "data-fr-suffix"], Yc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Qc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], zc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Gc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Xc = ["id"], Uc = ["id"], Zc = /* @__PURE__ */ V({
  __name: "DsfrRange",
  props: {
    id: { default: () => oe("range") },
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
  setup(a, { emit: e }) {
    const t = a, n = e, r = G(), l = G(), s = G(), o = w(() => t.lowerValue !== void 0), i = w(() => t.step !== void 0), d = w(() => {
      if (t.lowerValue === void 0) {
        const v = (t.modelValue - t.min) / (t.max - t.min) * s.value;
        return `transform: translateX(${v}px) translateX(-${v / s.value * 100}%);`;
      }
      return `transform: translateX(${(t.modelValue + t.lowerValue - t.min) / 2 / (t.max - t.min) * s.value}px) translateX(-${t.lowerValue + (t.modelValue - t.lowerValue) / 2}%);`;
    }), p = w(() => {
      const v = t.max - t.min, L = (t.modelValue - t.min) / v, T = ((t.lowerValue ?? 0) - t.min) / v, B = t.small ? 12 : 24, g = (s.value - B) / (v / (t.step ?? 2)), _ = o.value ? 32 * (1 - L) : 0;
      return {
        "--progress-right": `${(L * s.value + _).toFixed(2)}px`,
        ...o.value ? { "--progress-left": `${(T * s.value).toFixed(2)}px` } : {},
        ...i.value ? { "--step-width": `${Math.floor(g)}px` } : {}
      };
    });
    ve([() => t.modelValue, () => t.lowerValue], ([v, L]) => {
      L !== void 0 && (o.value && v < L && n("update:lowerValue", v), o.value && L > v && n("update:modelValue", L));
    });
    const m = w(() => (t.prefix ?? "").concat(o.value ? `${t.lowerValue} - ` : "").concat(`${t.modelValue}`).concat(t.suffix ?? ""));
    return ke(() => {
      var v;
      s.value = (v = r.value) == null ? void 0 : v.offsetWidth;
    }), (v, L) => (u(), f("div", {
      id: `${v.id}-group`,
      class: q(["fr-range-group", { "fr-range-group--error": v.message }])
    }, [
      c("label", {
        id: `${v.id}-label`,
        class: "fr-label"
      }, [
        F(v.$slots, "label", {}, () => [
          H(b(v.label), 1)
        ]),
        c("span", Kc, [
          F(v.$slots, "hint", {}, () => [
            H(b(v.hint), 1)
          ])
        ])
      ], 8, Hc),
      c("div", {
        class: q(["fr-range", {
          "fr-range--sm": v.small,
          "fr-range--step": i.value,
          "fr-range--double": o.value,
          "fr-range-group--disabled": v.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": v.prefix ?? void 0,
        "data-fr-suffix": v.suffix ?? void 0,
        style: Ie(p.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: l,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: Ie(d.value)
        }, b(m.value), 5),
        o.value ? (u(), f("input", {
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
          onInput: L[0] || (L[0] = (T) => {
            var B;
            return n("update:lowerValue", +((B = T.target) == null ? void 0 : B.value));
          })
        }, null, 40, Yc)) : y("", !0),
        c("input", {
          id: v.id,
          ref_key: "input",
          ref: r,
          type: "range",
          min: v.min,
          max: v.max,
          step: v.step,
          value: v.modelValue,
          disabled: v.disabled,
          "aria-disabled": v.disabled,
          "aria-labelledby": `${v.id}-label`,
          "aria-describedby": `${v.id}-messages`,
          onInput: L[1] || (L[1] = (T) => {
            var B;
            return n("update:modelValue", +((B = T.target) == null ? void 0 : B.value));
          })
        }, null, 40, Qc),
        v.hideIndicators ? y("", !0) : (u(), f("span", zc, b(v.min), 1)),
        v.hideIndicators ? y("", !0) : (u(), f("span", Gc, b(v.max), 1))
      ], 14, Wc),
      v.message || v.$slots.messages ? (u(), f("div", {
        key: 0,
        id: `${v.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        F(v.$slots, "messages", {}, () => [
          v.message ? (u(), f("p", {
            key: 0,
            id: `${v.id}-message-error`,
            class: "fr-message fr-message--error"
          }, b(v.message), 9, Uc)) : y("", !0)
        ])
      ], 8, Xc)) : y("", !0)
    ], 10, jc));
  }
}), Jc = { class: "fr-segmented__element" }, ef = ["id", "name", "value", "checked", "disabled", "aria-disabled"], tf = ["for"], af = { key: 1 }, On = /* @__PURE__ */ V({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => oe("segmented") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const e = a, t = w(() => typeof e.icon == "string" ? { name: e.icon } : e.icon), n = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : "");
    return (r, l) => (u(), f("div", Jc, [
      c("input", X({
        id: r.id,
        type: "radio",
        name: r.name,
        value: r.value,
        checked: r.modelValue === r.value,
        disabled: r.disabled,
        "aria-disabled": r.disabled
      }, r.$attrs, {
        onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
      }), null, 16, ef),
      c("label", {
        for: r.id,
        class: q(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (u(), j(we, Ee(X({ key: 0 }, t.value)), null, 16)) : y("", !0),
        r.icon ? (u(), f("span", af, " ")) : y("", !0),
        H(" " + b(r.label), 1)
      ], 10, tf)
    ]));
  }
}), nf = { class: "fr-form-group" }, rf = ["disabled"], lf = ["id"], sf = {
  key: 0,
  class: "fr-hint-text"
}, of = { class: "fr-segmented__elements" }, uf = /* @__PURE__ */ V({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => oe("segmented-button", "set") },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    name: { default: () => oe("segmented-button", "set") },
    hint: {},
    legend: { default: "" },
    modelValue: {},
    options: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: e }) {
    const t = a, n = e, r = (l) => {
      l !== t.modelValue && n("update:modelValue", l);
    };
    return (l, s) => (u(), f("div", nf, [
      c("fieldset", {
        class: q(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (u(), f("legend", {
          key: 0,
          id: l.titleId,
          class: q(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          F(l.$slots, "legend", {}, () => [
            H(b(l.legend), 1)
          ]),
          l.hint ? (u(), f("span", sf, b(l.hint), 1)) : y("", !0)
        ], 10, lf)) : y("", !0),
        c("div", of, [
          F(l.$slots, "default", {}, () => [
            (u(!0), f(Z, null, te(l.options, (o, i) => (u(), j(On, X({
              key: o.value || i,
              name: l.name || o.name,
              ref_for: !0
            }, { ...o, disabled: l.disabled || o.disabled }, {
              "model-value": l.modelValue,
              "onUpdate:modelValue": s[0] || (s[0] = (d) => r(d))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, rf)
    ]));
  }
}), df = ["for"], cf = {
  key: 0,
  class: "required"
}, ff = {
  key: 0,
  class: "fr-hint-text"
}, pf = ["id", "name", "disabled", "aria-disabled", "required"], vf = ["selected"], mf = ["selected", "value", "disabled", "aria-disabled"], hf = ["id"], bf = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => oe("select") },
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
    const e = a;
    e.description && console.warn(
      "[DsfrSelect] : La prop `description` est dépréciée. Veuillez utiliser `hint` à la place."
    );
    const t = w(() => e.errorMessage || e.successMessage), n = w(() => e.errorMessage ? "error" : "valid");
    return (r, l) => (u(), f("div", {
      class: q(["fr-select-group", { [`fr-select-group--${n.value}`]: t.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        F(r.$slots, "label", {}, () => [
          H(b(r.label) + " ", 1),
          F(r.$slots, "required-tip", {}, () => [
            r.required ? (u(), f("span", cf, " *")) : y("", !0)
          ])
        ]),
        r.hint ?? r.description ? (u(), f("span", ff, b(r.hint ?? r.description), 1)) : y("", !0)
      ], 8, df),
      c("select", X({
        id: r.selectId,
        class: [{ [`fr-select--${n.value}`]: t.value }, "fr-select"],
        name: r.name || r.selectId,
        disabled: r.disabled,
        "aria-disabled": r.disabled,
        required: r.required
      }, r.$attrs, {
        onChange: l[0] || (l[0] = (s) => {
          var o;
          return r.$emit("update:modelValue", (o = s.target) == null ? void 0 : o.value);
        })
      }), [
        c("option", {
          selected: !r.options.some((s) => typeof s != "object" || s === null ? s === r.modelValue : s.value === r.modelValue),
          disabled: "",
          hidden: ""
        }, b(r.defaultUnselectedText), 9, vf),
        (u(!0), f(Z, null, te(r.options, (s, o) => (u(), f("option", {
          key: o,
          selected: r.modelValue === s || typeof s == "object" && s.value === r.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, b(typeof s == "object" ? s.text : s), 9, mf))), 128))
      ], 16, pf),
      t.value ? (u(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: q(`fr-${n.value}-text`)
      }, b(t.value), 11, hf)) : y("", !0)
    ], 2));
  }
}), gf = { class: "fr-share" }, yf = { class: "fr-share__title" }, kf = { class: "fr-btns-group" }, wf = ["title", "href", "onClick"], _f = { key: 0 }, Tf = ["href", "title"], xf = ["title"], Df = /* @__PURE__ */ V({
  __name: "DsfrShare",
  props: {
    title: { default: "Partager la page" },
    copyLabel: { default: "Copier dans le presse-papier" },
    mail: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const e = () => {
      const n = window.location.href;
      navigator.clipboard.writeText(n);
    }, t = ({ url: n, label: r }) => {
      window.open(
        n,
        r,
        "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
    };
    return (n, r) => {
      var l;
      return u(), f("div", gf, [
        c("p", yf, b(n.title), 1),
        c("ul", kf, [
          (u(!0), f(Z, null, te(n.networks, (s, o) => (u(), f("li", { key: o }, [
            c("a", {
              class: q(`fr-btn fr-btn--${s.name}`),
              title: `${s.label} - nouvelle fenêtre`,
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: ne((i) => t(s), ["prevent"])
            }, b(s.label), 11, wf)
          ]))), 128)),
          (l = n.mail) != null && l.to ? (u(), f("li", _f, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, b(n.mail.label), 9, Tf)
          ])) : y("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: r[0] || (r[0] = (s) => e())
            }, b(n.copyLabel), 9, xf)
          ])
        ])
      ]);
    };
  }
}), If = ["aria-current", "aria-expanded", "aria-controls"], Rn = /* @__PURE__ */ V({
  __name: "DsfrSideMenuButton",
  props: {
    active: { type: Boolean },
    expanded: { type: Boolean },
    controlId: {}
  },
  emits: ["toggleExpand"],
  setup(a) {
    return (e, t) => (u(), f("button", {
      class: "fr-sidemenu__btn",
      "aria-current": e.active ? "page" : void 0,
      "aria-expanded": !!e.expanded,
      "aria-controls": e.controlId,
      onClick: t[0] || (t[0] = (n) => e.$emit("toggleExpand", e.controlId))
    }, [
      F(e.$slots, "default")
    ], 8, If));
  }
}), $n = /* @__PURE__ */ V({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (e, t) => (u(), f("li", {
      class: q(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      F(e.$slots, "default")
    ], 2));
  }
}), Ef = ["id"], Cf = { class: "fr-sidemenu__list" }, Nn = /* @__PURE__ */ V({
  __name: "DsfrSideMenuList",
  props: {
    id: {},
    collapsable: { type: Boolean },
    expanded: { type: Boolean },
    menuItems: { default: () => [] },
    focusOnExpanding: { type: Boolean }
  },
  emits: ["toggleExpand"],
  setup(a) {
    const e = a, {
      collapse: t,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Ae();
    ve(() => e.expanded, (p, m) => {
      p !== m && l(p);
    }), ke(() => {
      e.expanded && l(!0);
    });
    const o = (p) => typeof p == "string" && p.startsWith("http"), i = (p) => o(p) ? "a" : "RouterLink", d = (p) => ({ [o(p) ? "href" : "to"]: p });
    return (p, m) => {
      const v = xe("DsfrSideMenuList", !0);
      return u(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: t,
        class: q({
          "fr-collapse": p.collapsable,
          "fr-collapsing": Y(n),
          "fr-collapse--expanded": Y(r)
        }),
        onTransitionend: m[2] || (m[2] = (L) => Y(s)(!!p.expanded, p.focusOnExpanding))
      }, [
        c("ul", Cf, [
          F(p.$slots, "default"),
          (u(!0), f(Z, null, te(p.menuItems, (L, T) => (u(), j($n, {
            key: T,
            active: L.active
          }, {
            default: ee(() => [
              L.menuItems ? y("", !0) : (u(), j(me(i(L.to)), X({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": L.active ? "page" : void 0,
                ref_for: !0
              }, d(L.to)), {
                default: ee(() => [
                  H(b(L.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              L.menuItems ? (u(), f(Z, { key: 1 }, [
                re(Rn, {
                  active: !!L.active,
                  expanded: !!L.expanded,
                  "control-id": L.id,
                  onToggleExpand: m[0] || (m[0] = (B) => p.$emit("toggleExpand", B))
                }, {
                  default: ee(() => [
                    H(b(L.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                L.menuItems ? (u(), j(v, {
                  key: 0,
                  id: L.id,
                  collapsable: "",
                  expanded: L.expanded,
                  "menu-items": L.menuItems,
                  onToggleExpand: m[1] || (m[1] = (B) => p.$emit("toggleExpand", B))
                }, null, 8, ["id", "expanded", "menu-items"])) : y("", !0)
              ], 64)) : y("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, Ef);
    };
  }
}), Pf = ["aria-labelledby"], Lf = { class: "fr-sidemenu__inner" }, Mf = ["aria-controls", "aria-expanded"], Bf = ["id"], Sf = /* @__PURE__ */ V({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => oe("sidemenu") },
    sideMenuListId: { default: () => oe("sidemenu", "list") },
    collapseValue: { default: "-492px" },
    menuItems: { default: () => {
    } },
    headingTitle: { default: "" },
    titleTag: { default: "h3" },
    focusOnExpanding: { type: Boolean, default: !0 }
  },
  emits: ["toggleExpand"],
  setup(a) {
    const {
      collapse: e,
      collapsing: t,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = Ae(), s = G(!1);
    return ve(s, (o, i) => {
      o !== i && r(o);
    }), (o, i) => (u(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": o.id
    }, [
      c("div", Lf, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": o.id,
          "aria-expanded": s.value,
          onClick: i[0] || (i[0] = ne((d) => s.value = !s.value, ["prevent", "stop"]))
        }, b(o.buttonLabel), 9, Mf),
        c("div", {
          id: o.id,
          ref_key: "collapse",
          ref: e,
          class: q(["fr-collapse", {
            "fr-collapse--expanded": Y(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Y(t)
          }]),
          onTransitionend: i[2] || (i[2] = (d) => Y(l)(s.value, o.focusOnExpanding))
        }, [
          (u(), j(me(o.titleTag), { class: "fr-sidemenu__title" }, {
            default: ee(() => [
              H(b(o.headingTitle), 1)
            ]),
            _: 1
          })),
          F(o.$slots, "default", {}, () => [
            re(Nn, {
              id: o.sideMenuListId,
              "menu-items": o.menuItems,
              onToggleExpand: i[1] || (i[1] = (d) => o.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Bf)
      ])
    ], 8, Pf));
  }
}), Af = /* @__PURE__ */ V({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const e = a, t = w(() => typeof e.to == "string" && e.to.startsWith("http")), n = w(() => t.value ? "a" : "RouterLink"), r = w(() => ({ [t.value ? "href" : "to"]: e.to }));
    return (l, s) => (u(), j(me(n.value), X({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: ee(() => [
        F(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), Ff = { class: "fr-skiplinks" }, Of = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Rf = { class: "fr-skiplinks__list" }, $f = ["href", "onClick"], Nf = /* @__PURE__ */ V({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(a) {
    const e = (t) => {
      const n = document.getElementById(t);
      n == null || n.focus();
    };
    return (t, n) => (u(), f("div", Ff, [
      c("nav", Of, [
        c("ul", Rf, [
          (u(!0), f(Z, null, te(t.links, (r) => (u(), f("li", {
            key: r.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${r.id}`,
              onClick: (l) => e(r.id)
            }, b(r.text), 9, $f)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Vf = { class: "fr-stepper" }, qf = { class: "fr-stepper__title" }, jf = { class: "fr-stepper__state" }, Hf = ["data-fr-current-step", "data-fr-steps"], Kf = { class: "fr-stepper__details" }, Wf = {
  key: 0,
  class: "fr-text--bold"
}, Yf = /* @__PURE__ */ V({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(a) {
    return (e, t) => (u(), f("div", Vf, [
      c("h2", qf, [
        H(b(e.steps[e.currentStep - 1]) + " ", 1),
        c("span", jf, "Étape " + b(e.currentStep) + " sur " + b(e.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, Hf),
      c("p", Kf, [
        e.currentStep < e.steps.length ? (u(), f("span", Wf, "Étape suivante :")) : y("", !0),
        H(" " + b(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), Qf = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, zf = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, Gf = { class: "fr-summary__list" }, Xf = ["href"], Uf = /* @__PURE__ */ V({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(a) {
    return (e, t) => (u(), f("nav", Qf, [
      c("h2", zf, b(e.title), 1),
      c("ol", Gf, [
        (u(!0), f(Z, null, te(e.anchors, (n, r) => (u(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, b(n.name), 9, Xf)
        ]))), 128))
      ])
    ]));
  }
}), Zf = ["id", "aria-labelledby", "tabindex"], Jf = /* @__PURE__ */ V({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(a) {
    Pt((i) => ({
      "7152af7e": s.value,
      "2a62e962": o.value
    }));
    const e = a, t = { true: "100%", false: "-100%" }, n = Ue(At), { isVisible: r, asc: l } = n(ft(() => e.tabId)), s = w(() => t[String(l == null ? void 0 : l.value)]), o = w(() => t[String(!(l != null && l.value))]);
    return (i, d) => (u(), j(_r, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: ee(() => [
        Me(c("div", {
          id: i.panelId,
          class: q(["fr-tabs__panel", {
            "fr-tabs__panel--selected": Y(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": i.tabId,
          tabindex: Y(r) ? 0 : -1
        }, [
          F(i.$slots, "default", {}, void 0, !0)
        ], 10, Zf), [
          [Tr, Y(r)]
        ])
      ]),
      _: 3
    }));
  }
}), Vn = /* @__PURE__ */ _e(Jf, [["__scopeId", "data-v-5774b16c"]]), ep = { role: "presentation" }, tp = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], ap = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, qn = /* @__PURE__ */ V({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: e }) {
    const t = a, n = e, r = G(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      Home: "first",
      End: "last"
    };
    function s(p) {
      const m = p == null ? void 0 : p.key, v = l[m];
      v && n(v);
    }
    const o = Ue(At), { isVisible: i } = o(ft(() => t.tabId)), d = yr("button");
    return ve(i, () => {
      var p;
      i.value && ((p = d.value) == null || p.focus());
    }), (p, m) => (u(), f("li", ep, [
      c("button", X(p.$attrs, {
        id: p.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${p.tabId}`,
        class: "fr-tabs__tab",
        tabindex: Y(i) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": Y(i),
        "aria-controls": p.panelId,
        onClick: m[0] || (m[0] = ne((v) => p.$emit("click", p.tabId), ["prevent"])),
        onKeydown: m[1] || (m[1] = (v) => s(v))
      }), [
        p.icon ? (u(), f("span", ap, [
          re(we, { name: p.icon }, null, 8, ["name"])
        ])) : y("", !0),
        F(p.$slots, "default")
      ], 16, tp)
    ]));
  }
}), jn = /* @__PURE__ */ V({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const e = a, t = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = w(() => t.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (r, l) => (u(), f("th", X(r.headerAttrs, { scope: "col" }), [
      H(b(r.header) + " ", 1),
      r.icon && !t.value ? (u(), j(we, Ee(X({ key: 0 }, n.value)), null, 16)) : y("", !0),
      t.value ? (u(), f("span", {
        key: 1,
        class: q({ [String(r.icon)]: t.value })
      }, null, 2)) : y("", !0)
    ], 16));
  }
}), np = { key: 0 }, Hn = /* @__PURE__ */ V({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (e, t) => e.headers ? (u(), f("tr", np, [
      (u(!0), f(Z, null, te(e.headers, (n, r) => (u(), j(jn, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : y("", !0);
  }
}), Kn = /* @__PURE__ */ V({
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
    const e = a, t = w(() => typeof e.field == "object" && e.field !== null && e.field.component ? e.field.component : !1), n = w(() => ["string", "number", "boolean"].includes(typeof e.field));
    return (r, l) => (u(), f("td", Ee(Mt(r.cellAttrs)), [
      t.value ? (u(), j(me(t.value), Ee(X({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: ee(() => [
          H(b(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (u(), f(Z, { key: 1 }, [
        H(b(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Wn = /* @__PURE__ */ V({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (e, t) => (u(), f("tr", Ee(Mt(e.rowAttrs)), [
      F(e.$slots, "default"),
      (u(!0), f(Z, null, te(e.rowData, (n, r) => (u(), j(Kn, {
        key: r,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), rp = { class: "caption" }, lp = { key: 1 }, sp = ["colspan"], op = { class: "flex justify-right" }, ip = { class: "self-center" }, up = ["for"], dp = ["id"], cp = ["value"], fp = {
  class: "flex ml-1",
  "aria-live": "polite",
  "aria-atomic": "true"
}, pp = { class: "self-center fr-m-0" }, vp = { class: "flex ml-1" }, mp = /* @__PURE__ */ V({
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
  setup(a, { emit: e }) {
    const t = a, n = e, r = (_) => Array.isArray(_) ? _ : _.rowData, l = G(t.currentPage), s = oe("resultPerPage"), o = G(t.resultsDisplayed), i = w(
      () => t.rows.length > o.value ? Math.ceil(t.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * o.value - o.value, m = () => l.value * o.value, v = w(() => t.pagination ? t.rows.slice(p(), m()) : t.rows), L = () => {
      l.value = 1, n("update:currentPage");
    }, T = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, B = () => {
      l.value < i.value && (l.value += 1, n("update:currentPage"));
    }, g = () => {
      l.value = i.value, n("update:currentPage");
    };
    return (_, E) => (u(), f("div", {
      class: q(["fr-table", { "fr-table--no-caption": _.noCaption }])
    }, [
      c("table", null, [
        c("caption", rp, b(_.title), 1),
        c("thead", null, [
          F(_.$slots, "header", {}, () => [
            _.headers && _.headers.length ? (u(), j(Hn, {
              key: 0,
              headers: _.headers
            }, null, 8, ["headers"])) : y("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          F(_.$slots, "default", {}, void 0, !0),
          _.rows && _.rows.length ? (u(!0), f(Z, { key: 0 }, te(v.value, (A, C) => (u(), j(Wn, {
            key: _.rowKey && r(A) ? typeof _.rowKey == "string" ? r(A)[_.headers.indexOf(_.rowKey)].toString() : _.rowKey(r(A)) : C,
            "row-data": r(A),
            "row-attrs": "rowAttrs" in A ? A.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : y("", !0),
          _.pagination ? (u(), f("tr", lp, [
            c("td", {
              colspan: _.headers.length
            }, [
              c("div", op, [
                c("div", ip, [
                  c("label", { for: Y(s) }, "Résultats par page : ", 8, up),
                  Me(c("select", {
                    id: Y(s),
                    "onUpdate:modelValue": E[0] || (E[0] = (A) => o.value = A),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: E[1] || (E[1] = (A) => n("update:currentPage"))
                  }, [
                    (u(), f(Z, null, te(d, (A, C) => c("option", {
                      key: C,
                      value: A
                    }, b(A), 9, cp)), 64))
                  ], 40, dp), [
                    [la, o.value]
                  ])
                ]),
                c("div", fp, [
                  c("p", pp, " Page " + b(l.value) + " sur " + b(i.value), 1)
                ]),
                c("div", vp, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: E[2] || (E[2] = (A) => L())
                  }, E[6] || (E[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: E[3] || (E[3] = (A) => T())
                  }, E[7] || (E[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: E[4] || (E[4] = (A) => B())
                  }, E[8] || (E[8] = [
                    c("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: E[5] || (E[5] = (A) => g())
                  }, E[9] || (E[9] = [
                    c("span", { class: "fr-sr-only" }, "Dernière page du tableau", -1)
                  ]))
                ])
              ])
            ], 8, sp)
          ])) : y("", !0)
        ])
      ])
    ], 2));
  }
}), hp = /* @__PURE__ */ _e(mp, [["__scopeId", "data-v-129bf2b7"]]), bp = ["aria-label"], gp = /* @__PURE__ */ V({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: e, emit: t }) {
    const n = a, r = t, l = G(!1), s = w({
      get: () => n.modelValue,
      set(C) {
        r("update:modelValue", C);
      }
    }), o = G(/* @__PURE__ */ new Map()), i = G(0);
    $e(At, (C) => {
      const K = G(!0);
      if (ve(s, ($, x) => {
        K.value = $ > x;
      }), [...o.value.values()].includes(C.value))
        return { isVisible: w(() => o.value.get(s.value) === C.value), asc: K };
      const R = i.value++;
      o.value.set(R, C.value);
      const D = w(() => R === s.value);
      return ve(C, () => {
        o.value.set(R, C.value);
      }), Ce(() => {
        o.value.delete(R);
      }), { isVisible: D };
    });
    const d = G(null), p = G(null), m = gr({}), v = (C) => {
      if (m[C])
        return m[C];
      const K = oe("tab");
      return m[C] = K, K;
    }, L = async () => {
      const C = s.value === 0 ? n.tabTitles.length - 1 : s.value - 1;
      l.value = !1, s.value = C;
    }, T = async () => {
      const C = s.value === n.tabTitles.length - 1 ? 0 : s.value + 1;
      l.value = !0, s.value = C;
    }, B = async () => {
      s.value = 0;
    }, g = async () => {
      s.value = n.tabTitles.length - 1;
    }, _ = G({ "--tabs-height": "100px" }), E = () => {
      var C;
      if (s.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const K = p.value.offsetHeight, R = (C = d.value) == null ? void 0 : C.querySelectorAll(".fr-tabs__panel")[s.value];
      if (!R || !R.offsetHeight)
        return;
      const D = R.offsetHeight;
      _.value["--tabs-height"] = `${K + D}px`;
    }, A = G(null);
    return ke(() => {
      var C;
      window.ResizeObserver && (A.value = new window.ResizeObserver(() => {
        E();
      })), (C = d.value) == null || C.querySelectorAll(".fr-tabs__panel").forEach((K) => {
        var R;
        K && ((R = A.value) == null || R.observe(K));
      });
    }), Ce(() => {
      var C;
      (C = d.value) == null || C.querySelectorAll(".fr-tabs__panel").forEach((K) => {
        var R;
        K && ((R = A.value) == null || R.unobserve(K));
      });
    }), e({
      renderTabs: E,
      selectFirst: B,
      selectLast: g
    }), (C, K) => (u(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: Ie(_.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": C.tabListName
      }, [
        F(C.$slots, "tab-items", {}, () => [
          (u(!0), f(Z, null, te(C.tabTitles, (R, D) => (u(), j(qn, {
            key: D,
            icon: R.icon,
            "panel-id": R.panelId || `${v(D)}-panel`,
            "tab-id": R.tabId || v(D),
            onClick: ($) => s.value = D,
            onNext: K[0] || (K[0] = ($) => T()),
            onPrevious: K[1] || (K[1] = ($) => L()),
            onFirst: K[2] || (K[2] = ($) => B()),
            onLast: K[3] || (K[3] = ($) => g())
          }, {
            default: ee(() => [
              H(b(R.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, bp),
      (u(!0), f(Z, null, te(C.tabContents, (R, D) => {
        var $, x, M, h;
        return u(), j(Vn, {
          key: D,
          "panel-id": ((x = ($ = C.tabTitles) == null ? void 0 : $[D]) == null ? void 0 : x.panelId) || `${v(D)}-panel`,
          "tab-id": ((h = (M = C.tabTitles) == null ? void 0 : M[D]) == null ? void 0 : h.tabId) || v(D)
        }, {
          default: ee(() => [
            H(b(R), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      F(C.$slots, "default")
    ], 4));
  }
}), yp = /* @__PURE__ */ V({
  __name: "DsfrTag",
  props: {
    label: { default: void 0 },
    link: { default: void 0 },
    tagName: { default: "p" },
    icon: { default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    small: { type: Boolean },
    iconOnly: { type: Boolean },
    selectable: { type: Boolean },
    selected: { type: Boolean },
    value: {}
  },
  emits: ["select"],
  setup(a) {
    const e = a, t = w(() => typeof e.link == "string" && e.link.startsWith("http")), n = w(() => e.link ? t.value ? "a" : "RouterLink" : e.disabled && e.tagName === "p" || e.selectable ? "button" : e.tagName), r = w(() => ({ [t.value ? "href" : "to"]: e.link })), l = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), s = w(() => e.small ? 0.65 : 0.9), o = w(
      () => typeof e.icon == "string" ? { scale: s.value, name: e.icon } : { scale: s.value, ...e.icon }
    );
    return (i, d) => (u(), j(me(n.value), X({
      class: ["fr-tag", {
        "fr-tag--sm": i.small,
        [i.icon]: l.value,
        "fr-tag--icon-left": l.value
      }],
      disabled: i.disabled,
      "aria-pressed": i.selectable ? i.selected : void 0
    }, { ...r.value, ...i.$attrs }, {
      onClick: d[0] || (d[0] = (p) => !i.disabled && i.$emit("select", [i.value, i.selected]))
    }), {
      default: ee(() => [
        e.icon && !l.value ? (u(), j(we, X({
          key: 0,
          label: i.iconOnly ? i.label : void 0,
          class: { "fr-mr-1v": !i.iconOnly }
        }, o.value), null, 16, ["label", "class"])) : y("", !0),
        i.iconOnly ? y("", !0) : (u(), f(Z, { key: 1 }, [
          H(b(i.label), 1)
        ], 64)),
        F(i.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class", "aria-pressed"]));
  }
}), pa = /* @__PURE__ */ _e(yp, [["__scopeId", "data-v-0cada598"]]), kp = { class: "fr-tags-group" }, wp = /* @__PURE__ */ V({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] },
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(a, { emit: e }) {
    const t = a, n = e;
    function r([l, s]) {
      if (typeof t.modelValue > "u")
        return;
      if (s) {
        const i = /* @__PURE__ */ new Set([...t.modelValue]);
        i.delete(l), n("update:modelValue", [...i]);
        return;
      }
      const o = [.../* @__PURE__ */ new Set([...t.modelValue, l])];
      n("update:modelValue", o);
    }
    return (l, s) => (u(), f("ul", kp, [
      (u(!0), f(Z, null, te(l.tags, ({ icon: o, label: i, ...d }, p) => {
        var m;
        return u(), f("li", { key: p }, [
          re(pa, X({ ref_for: !0 }, d, {
            icon: o,
            label: i,
            selectable: d.selectable,
            selected: d.selectable ? (m = l.modelValue) == null ? void 0 : m.includes(d.value) : void 0,
            onSelect: s[0] || (s[0] = (v) => r(v))
          }), null, 16, ["icon", "label", "selectable", "selected"])
        ]);
      }), 128))
    ]));
  }
}), _p = { class: "fr-tile__body" }, Tp = { class: "fr-tile__content" }, xp = ["download", "href"], Dp = {
  key: 0,
  class: "fr-tile__desc"
}, Ip = {
  key: 1,
  class: "fr-tile__detail"
}, Ep = {
  key: 2,
  class: "fr-tile__start"
}, Cp = { class: "fr-tile__header" }, Pp = {
  key: 0,
  class: "fr-tile__pictogram"
}, Lp = ["src"], Mp = ["href"], Bp = ["href"], Sp = ["href"], Ap = /* @__PURE__ */ V({
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
    const e = a, t = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = w(() => typeof e.to == "string" && e.to.startsWith("http"));
    return (r, l) => {
      const s = xe("RouterLink");
      return u(), f("div", {
        class: q(["fr-tile fr-enlarge-link", [{
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
        c("div", _p, [
          c("div", Tp, [
            (u(), j(me(r.titleTag), { class: "fr-tile__title" }, {
              default: ee(() => [
                n.value ? (u(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, b(r.title), 9, xp)) : y("", !0),
                n.value ? y("", !0) : (u(), j(s, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: ee(() => [
                    H(b(r.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            r.description ? (u(), f("p", Dp, b(r.description), 1)) : y("", !0),
            r.details ? (u(), f("p", Ip, b(r.details), 1)) : y("", !0),
            r.$slots["start-details"] ? (u(), f("div", Ep, [
              F(r.$slots, "start-details", {}, void 0, !0)
            ])) : y("", !0)
          ])
        ]),
        c("div", Cp, [
          F(r.$slots, "header", {}, void 0, !0),
          r.imgSrc || r.svgPath ? (u(), f("div", Pp, [
            r.imgSrc ? (u(), f("img", {
              key: 0,
              src: r.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Lp)) : (u(), f("svg", X({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...t, ...r.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${r.svgPath}#artwork-decorative`
              }, null, 8, Mp),
              c("use", {
                class: "fr-artwork-minor",
                href: `${r.svgPath}#artwork-minor`
              }, null, 8, Bp),
              c("use", {
                class: "fr-artwork-major",
                href: `${r.svgPath}#artwork-major`
              }, null, 8, Sp)
            ], 16))
          ])) : y("", !0)
        ])
      ], 2);
    };
  }
}), Yn = /* @__PURE__ */ _e(Ap, [["__scopeId", "data-v-f4d836a2"]]), Fp = { class: "fr-grid-row fr-grid-row--gutters" }, Op = /* @__PURE__ */ V({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (e, t) => (u(), f("div", Fp, [
      (u(!0), f(Z, null, te(e.tiles, (n, r) => (u(), f("div", {
        key: r,
        class: q({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        re(Yn, X({
          horizontal: e.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Rp = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], $p = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Np = ["id"], Vp = /* @__PURE__ */ V({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => oe("toggle") },
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
    const e = a, t = w(() => `${e.inputId}-hint-text`);
    return (n, r) => (u(), f("div", {
      class: q(["fr-toggle", {
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
        "aria-describedby": t.value,
        name: n.name,
        onInput: r[0] || (r[0] = (l) => n.$emit("update:modelValue", l.target.checked))
      }, null, 40, Rp),
      c("label", {
        id: t.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, b(n.label), 9, $p),
      n.hint ? (u(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, b(n.hint), 9, Np)) : y("", !0)
    ], 2));
  }
}), qp = ["id"], jp = /* @__PURE__ */ V({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => oe("tooltip") }
  },
  setup(a) {
    const e = a, t = G(!1), n = G(null), r = G(null), l = G("0px"), s = G("0px"), o = G("0px"), i = G(!1), d = G(0);
    async function p() {
      var E, A, C, K, R, D, $, x;
      if (typeof document > "u" || typeof window > "u" || !t.value)
        return;
      await new Promise((ie) => setTimeout(ie, 100));
      const M = (E = n.value) == null ? void 0 : E.getBoundingClientRect().top, h = (A = n.value) == null ? void 0 : A.offsetHeight, P = (C = n.value) == null ? void 0 : C.offsetWidth, k = (K = n.value) == null ? void 0 : K.getBoundingClientRect().left, S = (R = r.value) == null ? void 0 : R.offsetHeight, I = (D = r.value) == null ? void 0 : D.offsetWidth, O = ($ = r.value) == null ? void 0 : $.offsetTop, N = (x = r.value) == null ? void 0 : x.offsetLeft, z = M + h + S >= window.innerHeight;
      i.value = z;
      const U = k + P / 2 + I / 2 >= document.documentElement.offsetWidth, le = k + P / 2 - I / 2 < 0;
      s.value = z ? `${M - O - S + 8}px` : `${M - O + h - 8}px`, d.value = 1, l.value = U ? `${k - N + P - I - 4}px` : le ? `${k - N + 4}px` : `${k - N + P / 2 - I / 2}px`, o.value = U ? `${I / 2 - P / 2 + 4}px` : le ? `${-(I / 2) + P / 2 - 4}px` : "0px";
    }
    ve(t, p, { immediate: !0 }), ke(() => {
      window.addEventListener("scroll", p), window.addEventListener("resize", p);
    }), Ce(() => {
      window.removeEventListener("scroll", p), window.removeEventListener("resize", p);
    });
    const m = w(() => `transform: translate(${l.value}, ${s.value}); --arrow-x: ${o.value}; opacity: ${d.value};'`), v = w(() => ({
      "fr-tooltip--shown": t.value,
      "fr-placement--top": i.value,
      "fr-placement--bottom": !i.value
    })), L = (E) => {
      var A, C;
      t.value && (E.target === n.value || (A = n.value) != null && A.contains(E.target) || E.target === r.value || (C = r.value) != null && C.contains(E.target) || (t.value = !1));
    }, T = (E) => {
      E.key === "Escape" && (t.value = !1);
    }, B = (E) => {
      var A;
      e.onHover && (E.target === n.value || (A = n.value) != null && A.contains(E.target)) && (t.value = !0, globalThis.__vueDsfr__lastTooltipShow && (globalThis.__vueDsfr__lastTooltipShow.value = !1));
    }, g = () => {
      e.onHover && (t.value = !1);
    }, _ = () => {
      e.onHover || (t.value = !0, globalThis.__vueDsfr__lastTooltipShow = t);
    };
    return ke(() => {
      document.documentElement.addEventListener("click", L), document.documentElement.addEventListener("keydown", T), document.documentElement.addEventListener("mouseover", B);
    }), Ce(() => {
      document.documentElement.removeEventListener("click", L), document.documentElement.removeEventListener("keydown", T), document.documentElement.removeEventListener("mouseover", B);
    }), (E, A) => (u(), f(Z, null, [
      (u(), j(me(E.onHover ? "a" : "button"), X(E.$attrs, {
        id: `link-${E.id}`,
        ref_key: "source",
        ref: n,
        class: E.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": E.id,
        href: E.onHover ? "#" : void 0,
        onClick: A[0] || (A[0] = (C) => _()),
        onMouseleave: A[1] || (A[1] = (C) => g()),
        onFocus: A[2] || (A[2] = (C) => B(C)),
        onBlur: A[3] || (A[3] = (C) => g())
      }), {
        default: ee(() => [
          F(E.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: E.id,
        ref_key: "tooltip",
        ref: r,
        class: q(["fr-tooltip fr-placement", v.value]),
        style: Ie(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, b(E.content), 15, qp)
    ], 64));
  }
}), Hp = /* @__PURE__ */ _e(jp, [["__scopeId", "data-v-70cada30"]]), Kp = { class: "fr-transcription" }, Wp = ["aria-expanded", "aria-controls"], Yp = ["id"], Qp = ["id", "aria-labelledby"], zp = { class: "fr-container fr-container--fluid fr-container-md" }, Gp = { class: "fr-grid-row fr-grid-row--center" }, Xp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Up = { class: "fr-modal__body" }, Zp = { class: "fr-modal__header" }, Jp = ["aria-controls"], ev = { class: "fr-modal__content" }, tv = ["id"], av = { class: "fr-transcription__footer" }, nv = { class: "fr-transcription__actions-group" }, rv = ["aria-controls"], Qn = /* @__PURE__ */ V({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => oe("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(a) {
    const e = a, {
      collapse: t,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Ae(), o = G(!1), i = G(!1), d = w(() => `fr-transcription__modal-${e.id}`), p = w(() => `fr-transcription__collapse-${e.id}`);
    return ve(i, (m, v) => {
      m !== v && l(m);
    }), (m, v) => (u(), f("div", Kp, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": i.value,
        "aria-controls": p.value,
        onClick: v[0] || (v[0] = (L) => i.value = !i.value)
      }, " Transcription ", 8, Wp),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: t,
        class: q(["fr-collapse", { "fr-collapse--expanded": Y(r), "fr-collapsing": Y(n) }]),
        onTransitionend: v[2] || (v[2] = (L) => Y(s)(i.value))
      }, [
        c("dialog", {
          id: d.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${d.value}-title`
        }, [
          c("div", zp, [
            c("div", Gp, [
              c("div", Xp, [
                c("div", Up, [
                  c("div", Zp, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": d.value,
                      title: "Fermer"
                    }, " Fermer ", 8, Jp)
                  ]),
                  c("div", ev, [
                    c("h1", {
                      id: `${d.value}-title`,
                      class: "fr-modal__title"
                    }, b(m.title), 9, tv),
                    H(" " + b(m.content), 1)
                  ]),
                  c("div", av, [
                    c("div", nv, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: v[1] || (v[1] = (L) => o.value = !0)
                      }, " Agrandir ", 8, rv)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, Qp)
      ], 42, Yp),
      (u(), j(br, { to: "body" }, [
        re(Pn, {
          title: m.title,
          opened: o.value,
          onClose: v[3] || (v[3] = (L) => o.value = !1)
        }, {
          default: ee(() => [
            F(m.$slots, "default", {}, () => [
              H(b(m.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), lv = ["src"], sv = { class: "fr-content-media__caption" }, ov = /* @__PURE__ */ V({
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
    return (e, t) => (u(), f(Z, null, [
      c("figure", {
        class: q(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        c("div", {
          class: q(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          c("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, lv)
        ], 2),
        c("div", sv, b(e.legend), 1)
      ], 2),
      re(Qn, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), iv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: Pl,
  DsfrAccordionsGroup: Ml,
  DsfrAlert: Rl,
  DsfrBackToTop: $l,
  DsfrBadge: mn,
  DsfrBreadcrumb: Wl,
  DsfrButton: He,
  DsfrButtonGroup: Ft,
  DsfrCallout: Jl,
  DsfrCard: ps,
  DsfrCardDetail: zt,
  DsfrCheckbox: Ot,
  DsfrCheckboxSet: Ds,
  DsfrConsent: Ps,
  DsfrDataTable: ho,
  DsfrErrorPage: xo,
  DsfrFieldset: hn,
  DsfrFileDownload: bn,
  DsfrFileDownloadList: So,
  DsfrFileUpload: Vo,
  DsfrFollow: oi,
  DsfrFooter: Oi,
  DsfrFooterLink: kn,
  DsfrFooterLinkList: Ni,
  DsfrFooterPartners: wn,
  DsfrFranceConnect: ji,
  DsfrHeader: id,
  DsfrHeaderMenuLink: fa,
  DsfrHeaderMenuLinks: Ut,
  DsfrHighlight: ud,
  DsfrInput: Rt,
  DsfrInputGroup: md,
  DsfrLanguageSelector: dt,
  DsfrLogo: Ke,
  DsfrModal: Pn,
  DsfrMultiselect: $d,
  DsfrNavigation: sc,
  DsfrNavigationItem: Ln,
  DsfrNavigationMegaMenu: Bn,
  DsfrNavigationMegaMenuCategory: Mn,
  DsfrNavigationMenu: An,
  DsfrNavigationMenuItem: Sn,
  DsfrNavigationMenuLink: $t,
  DsfrNewsLetter: gn,
  DsfrNotice: cc,
  DsfrPagination: ca,
  DsfrPicture: hc,
  DsfrQuote: xc,
  DsfrRadioButton: Fn,
  DsfrRadioButtonSet: qc,
  DsfrRange: Zc,
  DsfrSearchBar: ct,
  DsfrSegmented: On,
  DsfrSegmentedSet: uf,
  DsfrSelect: bf,
  DsfrShare: Df,
  DsfrSideMenu: Sf,
  DsfrSideMenuButton: Rn,
  DsfrSideMenuLink: Af,
  DsfrSideMenuList: Nn,
  DsfrSideMenuListItem: $n,
  DsfrSkipLinks: Nf,
  DsfrSocialNetworks: yn,
  DsfrStepper: Yf,
  DsfrSummary: Uf,
  DsfrTabContent: Vn,
  DsfrTabItem: qn,
  DsfrTable: hp,
  DsfrTableCell: Kn,
  DsfrTableHeader: jn,
  DsfrTableHeaders: Hn,
  DsfrTableRow: Wn,
  DsfrTabs: gp,
  DsfrTag: pa,
  DsfrTags: wp,
  DsfrTile: Yn,
  DsfrTiles: Op,
  DsfrToggleSwitch: Vp,
  DsfrTooltip: Hp,
  DsfrTranscription: Qn,
  DsfrVideo: ov,
  VIcon: we,
  registerAccordionKey: ua,
  registerNavigationLinkKey: da,
  registerTabKey: At
}, Symbol.toStringTag, { value: "Module" })), uv = {
  install: (a, { components: e } = {}) => {
    Object.entries(iv).forEach(([t, n]) => {
      (e === void 0 || e === "all" || e.map(({ name: r }) => r).includes(t)) && a.component(t, n);
    }), a.component("VIcon", we);
  }
}, zn = 6048e5, dv = 864e5, cv = 6e4, fv = 36e5, pv = 1e3, qa = Symbol.for("constructDateFrom");
function Te(a, e) {
  return typeof a == "function" ? a(e) : a && typeof a == "object" && qa in a ? a[qa](e) : a instanceof Date ? new a.constructor(e) : new Date(e);
}
function ye(a, e) {
  return Te(e || a, a);
}
function Gn(a, e, t) {
  const n = ye(a, t == null ? void 0 : t.in);
  return isNaN(e) ? Te((t == null ? void 0 : t.in) || a, NaN) : (e && n.setDate(n.getDate() + e), n);
}
let vv = {};
function et() {
  return vv;
}
function Ne(a, e) {
  var o, i, d, p;
  const t = et(), n = (e == null ? void 0 : e.weekStartsOn) ?? ((i = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : i.weekStartsOn) ?? t.weekStartsOn ?? ((p = (d = t.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = ye(a, e == null ? void 0 : e.in), l = r.getDay(), s = (l < n ? 7 : 0) + l - n;
  return r.setDate(r.getDate() - s), r.setHours(0, 0, 0, 0), r;
}
function Je(a, e) {
  return Ne(a, { ...e, weekStartsOn: 1 });
}
function Xn(a, e) {
  const t = ye(a, e == null ? void 0 : e.in), n = t.getFullYear(), r = Te(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Je(r), s = Te(t, 0);
  s.setFullYear(n, 0, 4), s.setHours(0, 0, 0, 0);
  const o = Je(s);
  return t.getTime() >= l.getTime() ? n + 1 : t.getTime() >= o.getTime() ? n : n - 1;
}
function Tt(a) {
  const e = ye(a), t = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return t.setUTCFullYear(e.getFullYear()), +a - +t;
}
function mv(a, ...e) {
  const t = Te.bind(
    null,
    e.find((n) => typeof n == "object")
  );
  return e.map(t);
}
function ja(a, e) {
  const t = ye(a, e == null ? void 0 : e.in);
  return t.setHours(0, 0, 0, 0), t;
}
function hv(a, e, t) {
  const [n, r] = mv(
    t == null ? void 0 : t.in,
    a,
    e
  ), l = ja(n), s = ja(r), o = +l - Tt(l), i = +s - Tt(s);
  return Math.round((o - i) / dv);
}
function bv(a, e) {
  const t = Xn(a, e), n = Te(a, 0);
  return n.setFullYear(t, 0, 4), n.setHours(0, 0, 0, 0), Je(n);
}
function gv(a) {
  return a instanceof Date || typeof a == "object" && Object.prototype.toString.call(a) === "[object Date]";
}
function yv(a) {
  return !(!gv(a) && typeof a != "number" || isNaN(+ye(a)));
}
function kv(a, e) {
  const t = ye(a, e == null ? void 0 : e.in);
  return t.setFullYear(t.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
const wv = {
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
}, _v = (a, e, t) => {
  let n;
  const r = wv[a];
  return typeof r == "string" ? n = r : e === 1 ? n = r.one : n = r.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + n : n + " ago" : n;
};
function jt(a) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : a.defaultWidth;
    return a.formats[t] || a.formats[a.defaultWidth];
  };
}
const Tv = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, xv = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Dv = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Iv = {
  date: jt({
    formats: Tv,
    defaultWidth: "full"
  }),
  time: jt({
    formats: xv,
    defaultWidth: "full"
  }),
  dateTime: jt({
    formats: Dv,
    defaultWidth: "full"
  })
}, Ev = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Cv = (a, e, t, n) => Ev[a];
function rt(a) {
  return (e, t) => {
    const n = t != null && t.context ? String(t.context) : "standalone";
    let r;
    if (n === "formatting" && a.formattingValues) {
      const s = a.defaultFormattingWidth || a.defaultWidth, o = t != null && t.width ? String(t.width) : s;
      r = a.formattingValues[o] || a.formattingValues[s];
    } else {
      const s = a.defaultWidth, o = t != null && t.width ? String(t.width) : a.defaultWidth;
      r = a.values[o] || a.values[s];
    }
    const l = a.argumentCallback ? a.argumentCallback(e) : e;
    return r[l];
  };
}
const Pv = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Lv = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Mv = {
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
}, Bv = {
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
}, Sv = {
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
}, Av = {
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
}, Fv = (a, e) => {
  const t = Number(a), n = t % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return t + "st";
      case 2:
        return t + "nd";
      case 3:
        return t + "rd";
    }
  return t + "th";
}, Ov = {
  ordinalNumber: Fv,
  era: rt({
    values: Pv,
    defaultWidth: "wide"
  }),
  quarter: rt({
    values: Lv,
    defaultWidth: "wide",
    argumentCallback: (a) => a - 1
  }),
  month: rt({
    values: Mv,
    defaultWidth: "wide"
  }),
  day: rt({
    values: Bv,
    defaultWidth: "wide"
  }),
  dayPeriod: rt({
    values: Sv,
    defaultWidth: "wide",
    formattingValues: Av,
    defaultFormattingWidth: "wide"
  })
};
function lt(a) {
  return (e, t = {}) => {
    const n = t.width, r = n && a.matchPatterns[n] || a.matchPatterns[a.defaultMatchWidth], l = e.match(r);
    if (!l)
      return null;
    const s = l[0], o = n && a.parsePatterns[n] || a.parsePatterns[a.defaultParseWidth], i = Array.isArray(o) ? $v(o, (m) => m.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Rv(o, (m) => m.test(s))
    );
    let d;
    d = a.valueCallback ? a.valueCallback(i) : i, d = t.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      t.valueCallback(d)
    ) : d;
    const p = e.slice(s.length);
    return { value: d, rest: p };
  };
}
function Rv(a, e) {
  for (const t in a)
    if (Object.prototype.hasOwnProperty.call(a, t) && e(a[t]))
      return t;
}
function $v(a, e) {
  for (let t = 0; t < a.length; t++)
    if (e(a[t]))
      return t;
}
function Nv(a) {
  return (e, t = {}) => {
    const n = e.match(a.matchPattern);
    if (!n) return null;
    const r = n[0], l = e.match(a.parsePattern);
    if (!l) return null;
    let s = a.valueCallback ? a.valueCallback(l[0]) : l[0];
    s = t.valueCallback ? t.valueCallback(s) : s;
    const o = e.slice(r.length);
    return { value: s, rest: o };
  };
}
const Vv = /^(\d+)(th|st|nd|rd)?/i, qv = /\d+/i, jv = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Hv = {
  any: [/^b/i, /^(a|c)/i]
}, Kv = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Wv = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Yv = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Qv = {
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
}, zv = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Gv = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Xv = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Uv = {
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
}, Zv = {
  ordinalNumber: Nv({
    matchPattern: Vv,
    parsePattern: qv,
    valueCallback: (a) => parseInt(a, 10)
  }),
  era: lt({
    matchPatterns: jv,
    defaultMatchWidth: "wide",
    parsePatterns: Hv,
    defaultParseWidth: "any"
  }),
  quarter: lt({
    matchPatterns: Kv,
    defaultMatchWidth: "wide",
    parsePatterns: Wv,
    defaultParseWidth: "any",
    valueCallback: (a) => a + 1
  }),
  month: lt({
    matchPatterns: Yv,
    defaultMatchWidth: "wide",
    parsePatterns: Qv,
    defaultParseWidth: "any"
  }),
  day: lt({
    matchPatterns: zv,
    defaultMatchWidth: "wide",
    parsePatterns: Gv,
    defaultParseWidth: "any"
  }),
  dayPeriod: lt({
    matchPatterns: Xv,
    defaultMatchWidth: "any",
    parsePatterns: Uv,
    defaultParseWidth: "any"
  })
}, Un = {
  code: "en-US",
  formatDistance: _v,
  formatLong: Iv,
  formatRelative: Cv,
  localize: Ov,
  match: Zv,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Jv(a, e) {
  const t = ye(a, e == null ? void 0 : e.in);
  return hv(t, kv(t)) + 1;
}
function Zn(a, e) {
  const t = ye(a, e == null ? void 0 : e.in), n = +Je(t) - +bv(t);
  return Math.round(n / zn) + 1;
}
function va(a, e) {
  var p, m, v, L;
  const t = ye(a, e == null ? void 0 : e.in), n = t.getFullYear(), r = et(), l = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((m = (p = e == null ? void 0 : e.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((L = (v = r.locale) == null ? void 0 : v.options) == null ? void 0 : L.firstWeekContainsDate) ?? 1, s = Te((e == null ? void 0 : e.in) || a, 0);
  s.setFullYear(n + 1, 0, l), s.setHours(0, 0, 0, 0);
  const o = Ne(s, e), i = Te((e == null ? void 0 : e.in) || a, 0);
  i.setFullYear(n, 0, l), i.setHours(0, 0, 0, 0);
  const d = Ne(i, e);
  return +t >= +o ? n + 1 : +t >= +d ? n : n - 1;
}
function em(a, e) {
  var o, i, d, p;
  const t = et(), n = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((i = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : i.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((p = (d = t.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = va(a, e), l = Te((e == null ? void 0 : e.in) || a, 0);
  return l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0), Ne(l, e);
}
function Jn(a, e) {
  const t = ye(a, e == null ? void 0 : e.in), n = +Ne(t, e) - +em(t, e);
  return Math.round(n / zn) + 1;
}
function ce(a, e) {
  const t = a < 0 ? "-" : "", n = Math.abs(a).toString().padStart(e, "0");
  return t + n;
}
const Oe = {
  // Year
  y(a, e) {
    const t = a.getFullYear(), n = t > 0 ? t : 1 - t;
    return ce(e === "yy" ? n % 100 : n, e.length);
  },
  // Month
  M(a, e) {
    const t = a.getMonth();
    return e === "M" ? String(t + 1) : ce(t + 1, 2);
  },
  // Day of the month
  d(a, e) {
    return ce(a.getDate(), e.length);
  },
  // AM or PM
  a(a, e) {
    const t = a.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.toUpperCase();
      case "aaa":
        return t;
      case "aaaaa":
        return t[0];
      case "aaaa":
      default:
        return t === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(a, e) {
    return ce(a.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(a, e) {
    return ce(a.getHours(), e.length);
  },
  // Minute
  m(a, e) {
    return ce(a.getMinutes(), e.length);
  },
  // Second
  s(a, e) {
    return ce(a.getSeconds(), e.length);
  },
  // Fraction of second
  S(a, e) {
    const t = e.length, n = a.getMilliseconds(), r = Math.trunc(
      n * Math.pow(10, t - 3)
    );
    return ce(r, e.length);
  }
}, Ge = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Ha = {
  // Era
  G: function(a, e, t) {
    const n = a.getFullYear() > 0 ? 1 : 0;
    switch (e) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return t.era(n, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return t.era(n, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return t.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(a, e, t) {
    if (e === "yo") {
      const n = a.getFullYear(), r = n > 0 ? n : 1 - n;
      return t.ordinalNumber(r, { unit: "year" });
    }
    return Oe.y(a, e);
  },
  // Local week-numbering year
  Y: function(a, e, t, n) {
    const r = va(a, n), l = r > 0 ? r : 1 - r;
    if (e === "YY") {
      const s = l % 100;
      return ce(s, 2);
    }
    return e === "Yo" ? t.ordinalNumber(l, { unit: "year" }) : ce(l, e.length);
  },
  // ISO week-numbering year
  R: function(a, e) {
    const t = Xn(a);
    return ce(t, e.length);
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
  u: function(a, e) {
    const t = a.getFullYear();
    return ce(t, e.length);
  },
  // Quarter
  Q: function(a, e, t) {
    const n = Math.ceil((a.getMonth() + 1) / 3);
    switch (e) {
      // 1, 2, 3, 4
      case "Q":
        return String(n);
      // 01, 02, 03, 04
      case "QQ":
        return ce(n, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return t.ordinalNumber(n, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return t.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return t.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return t.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(a, e, t) {
    const n = Math.ceil((a.getMonth() + 1) / 3);
    switch (e) {
      // 1, 2, 3, 4
      case "q":
        return String(n);
      // 01, 02, 03, 04
      case "qq":
        return ce(n, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return t.ordinalNumber(n, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return t.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return t.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return t.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(a, e, t) {
    const n = a.getMonth();
    switch (e) {
      case "M":
      case "MM":
        return Oe.M(a, e);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return t.ordinalNumber(n + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return t.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return t.month(n, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return t.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(a, e, t) {
    const n = a.getMonth();
    switch (e) {
      // 1, 2, ..., 12
      case "L":
        return String(n + 1);
      // 01, 02, ..., 12
      case "LL":
        return ce(n + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return t.ordinalNumber(n + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return t.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return t.month(n, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return t.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(a, e, t, n) {
    const r = Jn(a, n);
    return e === "wo" ? t.ordinalNumber(r, { unit: "week" }) : ce(r, e.length);
  },
  // ISO week of year
  I: function(a, e, t) {
    const n = Zn(a);
    return e === "Io" ? t.ordinalNumber(n, { unit: "week" }) : ce(n, e.length);
  },
  // Day of the month
  d: function(a, e, t) {
    return e === "do" ? t.ordinalNumber(a.getDate(), { unit: "date" }) : Oe.d(a, e);
  },
  // Day of year
  D: function(a, e, t) {
    const n = Jv(a);
    return e === "Do" ? t.ordinalNumber(n, { unit: "dayOfYear" }) : ce(n, e.length);
  },
  // Day of week
  E: function(a, e, t) {
    const n = a.getDay();
    switch (e) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return t.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return t.day(n, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return t.day(n, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return t.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(a, e, t, n) {
    const r = a.getDay(), l = (r - n.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(l);
      // Padded numerical value
      case "ee":
        return ce(l, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return t.ordinalNumber(l, { unit: "day" });
      case "eee":
        return t.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return t.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return t.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return t.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(a, e, t, n) {
    const r = a.getDay(), l = (r - n.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      // Numerical value (same as in `e`)
      case "c":
        return String(l);
      // Padded numerical value
      case "cc":
        return ce(l, e.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return t.ordinalNumber(l, { unit: "day" });
      case "ccc":
        return t.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return t.day(r, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return t.day(r, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return t.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(a, e, t) {
    const n = a.getDay(), r = n === 0 ? 7 : n;
    switch (e) {
      // 2
      case "i":
        return String(r);
      // 02
      case "ii":
        return ce(r, e.length);
      // 2nd
      case "io":
        return t.ordinalNumber(r, { unit: "day" });
      // Tue
      case "iii":
        return t.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return t.day(n, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return t.day(n, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return t.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(a, e, t) {
    const r = a.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(a, e, t) {
    const n = a.getHours();
    let r;
    switch (n === 12 ? r = Ge.noon : n === 0 ? r = Ge.midnight : r = n / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(a, e, t) {
    const n = a.getHours();
    let r;
    switch (n >= 17 ? r = Ge.evening : n >= 12 ? r = Ge.afternoon : n >= 4 ? r = Ge.morning : r = Ge.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return t.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return t.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return t.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(a, e, t) {
    if (e === "ho") {
      let n = a.getHours() % 12;
      return n === 0 && (n = 12), t.ordinalNumber(n, { unit: "hour" });
    }
    return Oe.h(a, e);
  },
  // Hour [0-23]
  H: function(a, e, t) {
    return e === "Ho" ? t.ordinalNumber(a.getHours(), { unit: "hour" }) : Oe.H(a, e);
  },
  // Hour [0-11]
  K: function(a, e, t) {
    const n = a.getHours() % 12;
    return e === "Ko" ? t.ordinalNumber(n, { unit: "hour" }) : ce(n, e.length);
  },
  // Hour [1-24]
  k: function(a, e, t) {
    let n = a.getHours();
    return n === 0 && (n = 24), e === "ko" ? t.ordinalNumber(n, { unit: "hour" }) : ce(n, e.length);
  },
  // Minute
  m: function(a, e, t) {
    return e === "mo" ? t.ordinalNumber(a.getMinutes(), { unit: "minute" }) : Oe.m(a, e);
  },
  // Second
  s: function(a, e, t) {
    return e === "so" ? t.ordinalNumber(a.getSeconds(), { unit: "second" }) : Oe.s(a, e);
  },
  // Fraction of second
  S: function(a, e) {
    return Oe.S(a, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(a, e, t) {
    const n = a.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (e) {
      // Hours and optional minutes
      case "X":
        return Wa(n);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Ve(n);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Ve(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(a, e, t) {
    const n = a.getTimezoneOffset();
    switch (e) {
      // Hours and optional minutes
      case "x":
        return Wa(n);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Ve(n);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Ve(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(a, e, t) {
    const n = a.getTimezoneOffset();
    switch (e) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Ka(n, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Ve(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(a, e, t) {
    const n = a.getTimezoneOffset();
    switch (e) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Ka(n, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Ve(n, ":");
    }
  },
  // Seconds timestamp
  t: function(a, e, t) {
    const n = Math.trunc(+a / 1e3);
    return ce(n, e.length);
  },
  // Milliseconds timestamp
  T: function(a, e, t) {
    return ce(+a, e.length);
  }
};
function Ka(a, e = "") {
  const t = a > 0 ? "-" : "+", n = Math.abs(a), r = Math.trunc(n / 60), l = n % 60;
  return l === 0 ? t + String(r) : t + String(r) + e + ce(l, 2);
}
function Wa(a, e) {
  return a % 60 === 0 ? (a > 0 ? "-" : "+") + ce(Math.abs(a) / 60, 2) : Ve(a, e);
}
function Ve(a, e = "") {
  const t = a > 0 ? "-" : "+", n = Math.abs(a), r = ce(Math.trunc(n / 60), 2), l = ce(n % 60, 2);
  return t + r + e + l;
}
const Ya = (a, e) => {
  switch (a) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, er = (a, e) => {
  switch (a) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, tm = (a, e) => {
  const t = a.match(/(P+)(p+)?/) || [], n = t[1], r = t[2];
  if (!r)
    return Ya(a, e);
  let l;
  switch (n) {
    case "P":
      l = e.dateTime({ width: "short" });
      break;
    case "PP":
      l = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      l = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      l = e.dateTime({ width: "full" });
      break;
  }
  return l.replace("{{date}}", Ya(n, e)).replace("{{time}}", er(r, e));
}, Zt = {
  p: er,
  P: tm
}, am = /^D+$/, nm = /^Y+$/, rm = ["D", "DD", "YY", "YYYY"];
function tr(a) {
  return am.test(a);
}
function ar(a) {
  return nm.test(a);
}
function Jt(a, e, t) {
  const n = lm(a, e, t);
  if (console.warn(n), rm.includes(a)) throw new RangeError(n);
}
function lm(a, e, t) {
  const n = a[0] === "Y" ? "years" : "days of the month";
  return `Use \`${a.toLowerCase()}\` instead of \`${a}\` (in \`${e}\`) for formatting ${n} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const sm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, om = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, im = /^'([^]*?)'?$/, um = /''/g, dm = /[a-zA-Z]/;
function Qa(a, e, t) {
  var p, m, v, L;
  const n = et(), r = n.locale ?? Un, l = n.firstWeekContainsDate ?? ((m = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = n.weekStartsOn ?? ((L = (v = n.locale) == null ? void 0 : v.options) == null ? void 0 : L.weekStartsOn) ?? 0, o = ye(a, t == null ? void 0 : t.in);
  if (!yv(o))
    throw new RangeError("Invalid time value");
  let i = e.match(om).map((T) => {
    const B = T[0];
    if (B === "p" || B === "P") {
      const g = Zt[B];
      return g(T, r.formatLong);
    }
    return T;
  }).join("").match(sm).map((T) => {
    if (T === "''")
      return { isToken: !1, value: "'" };
    const B = T[0];
    if (B === "'")
      return { isToken: !1, value: cm(T) };
    if (Ha[B])
      return { isToken: !0, value: T };
    if (B.match(dm))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + B + "`"
      );
    return { isToken: !1, value: T };
  });
  r.localize.preprocessor && (i = r.localize.preprocessor(o, i));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: s,
    locale: r
  };
  return i.map((T) => {
    if (!T.isToken) return T.value;
    const B = T.value;
    (ar(B) || tr(B)) && Jt(B, e, String(a));
    const g = Ha[B[0]];
    return g(o, B, r.localize, d);
  }).join("");
}
function cm(a) {
  const e = a.match(im);
  return e ? e[1].replace(um, "'") : a;
}
function fm() {
  return Object.assign({}, et());
}
function pm(a, e) {
  const t = ye(a, e == null ? void 0 : e.in).getDay();
  return t === 0 ? 7 : t;
}
function vm(a, e) {
  const t = mm(e) ? new e(0) : Te(e, 0);
  return t.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), t.setHours(
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
    a.getMilliseconds()
  ), t;
}
function mm(a) {
  var e;
  return typeof a == "function" && ((e = a.prototype) == null ? void 0 : e.constructor) === a;
}
const hm = 10;
class nr {
  constructor() {
    Q(this, "subPriority", 0);
  }
  validate(e, t) {
    return !0;
  }
}
class bm extends nr {
  constructor(e, t, n, r, l) {
    super(), this.value = e, this.validateValue = t, this.setValue = n, this.priority = r, l && (this.subPriority = l);
  }
  validate(e, t) {
    return this.validateValue(e, this.value, t);
  }
  set(e, t, n) {
    return this.setValue(e, t, this.value, n);
  }
}
class gm extends nr {
  constructor(t, n) {
    super();
    Q(this, "priority", hm);
    Q(this, "subPriority", -1);
    this.context = t || ((r) => Te(n, r));
  }
  set(t, n) {
    return n.timestampIsSet ? t : Te(t, vm(t, this.context));
  }
}
class ue {
  run(e, t, n, r) {
    const l = this.parse(e, t, n, r);
    return l ? {
      setter: new bm(
        l.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: l.rest
    } : null;
  }
  validate(e, t, n) {
    return !0;
  }
}
class ym extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 140);
    Q(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return r.era(t, { width: "abbreviated" }) || r.era(t, { width: "narrow" });
      // A, B
      case "GGGGG":
        return r.era(t, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return r.era(t, { width: "wide" }) || r.era(t, { width: "abbreviated" }) || r.era(t, { width: "narrow" });
    }
  }
  set(t, n, r) {
    return n.era = r, t.setFullYear(r, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
const be = {
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
}, Pe = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function ge(a, e) {
  return a && {
    value: e(a.value),
    rest: a.rest
  };
}
function pe(a, e) {
  const t = e.match(a);
  return t ? {
    value: parseInt(t[0], 10),
    rest: e.slice(t[0].length)
  } : null;
}
function Le(a, e) {
  const t = e.match(a);
  if (!t)
    return null;
  if (t[0] === "Z")
    return {
      value: 0,
      rest: e.slice(1)
    };
  const n = t[1] === "+" ? 1 : -1, r = t[2] ? parseInt(t[2], 10) : 0, l = t[3] ? parseInt(t[3], 10) : 0, s = t[5] ? parseInt(t[5], 10) : 0;
  return {
    value: n * (r * fv + l * cv + s * pv),
    rest: e.slice(t[0].length)
  };
}
function rr(a) {
  return pe(be.anyDigitsSigned, a);
}
function he(a, e) {
  switch (a) {
    case 1:
      return pe(be.singleDigit, e);
    case 2:
      return pe(be.twoDigits, e);
    case 3:
      return pe(be.threeDigits, e);
    case 4:
      return pe(be.fourDigits, e);
    default:
      return pe(new RegExp("^\\d{1," + a + "}"), e);
  }
}
function xt(a, e) {
  switch (a) {
    case 1:
      return pe(be.singleDigitSigned, e);
    case 2:
      return pe(be.twoDigitsSigned, e);
    case 3:
      return pe(be.threeDigitsSigned, e);
    case 4:
      return pe(be.fourDigitsSigned, e);
    default:
      return pe(new RegExp("^-?\\d{1," + a + "}"), e);
  }
}
function ma(a) {
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
function lr(a, e) {
  const t = e > 0, n = t ? e : 1 - e;
  let r;
  if (n <= 50)
    r = a || 100;
  else {
    const l = n + 50, s = Math.trunc(l / 100) * 100, o = a >= l % 100;
    r = a + s - (o ? 100 : 0);
  }
  return t ? r : 1 - r;
}
function sr(a) {
  return a % 400 === 0 || a % 4 === 0 && a % 100 !== 0;
}
class km extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 130);
    Q(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(t, n, r) {
    const l = (s) => ({
      year: s,
      isTwoDigitYear: n === "yy"
    });
    switch (n) {
      case "y":
        return ge(he(4, t), l);
      case "yo":
        return ge(
          r.ordinalNumber(t, {
            unit: "year"
          }),
          l
        );
      default:
        return ge(he(n.length, t), l);
    }
  }
  validate(t, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(t, n, r) {
    const l = t.getFullYear();
    if (r.isTwoDigitYear) {
      const o = lr(
        r.year,
        l
      );
      return t.setFullYear(o, 0, 1), t.setHours(0, 0, 0, 0), t;
    }
    const s = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return t.setFullYear(s, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class wm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 130);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    const l = (s) => ({
      year: s,
      isTwoDigitYear: n === "YY"
    });
    switch (n) {
      case "Y":
        return ge(he(4, t), l);
      case "Yo":
        return ge(
          r.ordinalNumber(t, {
            unit: "year"
          }),
          l
        );
      default:
        return ge(he(n.length, t), l);
    }
  }
  validate(t, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(t, n, r, l) {
    const s = va(t, l);
    if (r.isTwoDigitYear) {
      const i = lr(
        r.year,
        s
      );
      return t.setFullYear(
        i,
        0,
        l.firstWeekContainsDate
      ), t.setHours(0, 0, 0, 0), Ne(t, l);
    }
    const o = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return t.setFullYear(o, 0, l.firstWeekContainsDate), t.setHours(0, 0, 0, 0), Ne(t, l);
  }
}
class _m extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 130);
    Q(this, "incompatibleTokens", [
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
  parse(t, n) {
    return xt(n === "R" ? 4 : n.length, t);
  }
  set(t, n, r) {
    const l = Te(t, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), Je(l);
  }
}
class Tm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 130);
    Q(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(t, n) {
    return xt(n === "u" ? 4 : n.length, t);
  }
  set(t, n, r) {
    return t.setFullYear(r, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class xm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 120);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    switch (n) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ":
        return he(n.length, t);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return r.ordinalNumber(t, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return r.quarter(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return r.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return r.quarter(t, {
          width: "wide",
          context: "formatting"
        }) || r.quarter(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.quarter(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 4;
  }
  set(t, n, r) {
    return t.setMonth((r - 1) * 3, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Dm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 120);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    switch (n) {
      // 1, 2, 3, 4
      case "q":
      case "qq":
        return he(n.length, t);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return r.ordinalNumber(t, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return r.quarter(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return r.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return r.quarter(t, {
          width: "wide",
          context: "standalone"
        }) || r.quarter(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.quarter(t, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 4;
  }
  set(t, n, r) {
    return t.setMonth((r - 1) * 3, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Im extends ue {
  constructor() {
    super(...arguments);
    Q(this, "incompatibleTokens", [
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
    Q(this, "priority", 110);
  }
  parse(t, n, r) {
    const l = (s) => s - 1;
    switch (n) {
      // 1, 2, ..., 12
      case "M":
        return ge(
          pe(be.month, t),
          l
        );
      // 01, 02, ..., 12
      case "MM":
        return ge(he(2, t), l);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return ge(
          r.ordinalNumber(t, {
            unit: "month"
          }),
          l
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return r.month(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.month(t, { width: "narrow", context: "formatting" });
      // J, F, ..., D
      case "MMMMM":
        return r.month(t, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return r.month(t, { width: "wide", context: "formatting" }) || r.month(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.month(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 11;
  }
  set(t, n, r) {
    return t.setMonth(r, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Em extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 110);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    const l = (s) => s - 1;
    switch (n) {
      // 1, 2, ..., 12
      case "L":
        return ge(
          pe(be.month, t),
          l
        );
      // 01, 02, ..., 12
      case "LL":
        return ge(he(2, t), l);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return ge(
          r.ordinalNumber(t, {
            unit: "month"
          }),
          l
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return r.month(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.month(t, { width: "narrow", context: "standalone" });
      // J, F, ..., D
      case "LLLLL":
        return r.month(t, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return r.month(t, { width: "wide", context: "standalone" }) || r.month(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.month(t, { width: "narrow", context: "standalone" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 11;
  }
  set(t, n, r) {
    return t.setMonth(r, 1), t.setHours(0, 0, 0, 0), t;
  }
}
function Cm(a, e, t) {
  const n = ye(a, t == null ? void 0 : t.in), r = Jn(n, t) - e;
  return n.setDate(n.getDate() - r * 7), ye(n, t == null ? void 0 : t.in);
}
class Pm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 100);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    switch (n) {
      case "w":
        return pe(be.week, t);
      case "wo":
        return r.ordinalNumber(t, { unit: "week" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 53;
  }
  set(t, n, r, l) {
    return Ne(Cm(t, r, l), l);
  }
}
function Lm(a, e, t) {
  const n = ye(a, t == null ? void 0 : t.in), r = Zn(n, t) - e;
  return n.setDate(n.getDate() - r * 7), n;
}
class Mm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 100);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    switch (n) {
      case "I":
        return pe(be.week, t);
      case "Io":
        return r.ordinalNumber(t, { unit: "week" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 53;
  }
  set(t, n, r) {
    return Je(Lm(t, r));
  }
}
const Bm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Sm = [
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
class Am extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 90);
    Q(this, "subPriority", 1);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    switch (n) {
      case "d":
        return pe(be.date, t);
      case "do":
        return r.ordinalNumber(t, { unit: "date" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    const r = t.getFullYear(), l = sr(r), s = t.getMonth();
    return l ? n >= 1 && n <= Sm[s] : n >= 1 && n <= Bm[s];
  }
  set(t, n, r) {
    return t.setDate(r), t.setHours(0, 0, 0, 0), t;
  }
}
class Fm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 90);
    Q(this, "subpriority", 1);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    switch (n) {
      case "D":
      case "DD":
        return pe(be.dayOfYear, t);
      case "Do":
        return r.ordinalNumber(t, { unit: "date" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    const r = t.getFullYear();
    return sr(r) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
  }
  set(t, n, r) {
    return t.setMonth(0, r), t.setHours(0, 0, 0, 0), t;
  }
}
function ha(a, e, t) {
  var m, v, L, T;
  const n = et(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((v = (m = t == null ? void 0 : t.locale) == null ? void 0 : m.options) == null ? void 0 : v.weekStartsOn) ?? n.weekStartsOn ?? ((T = (L = n.locale) == null ? void 0 : L.options) == null ? void 0 : T.weekStartsOn) ?? 0, l = ye(a, t == null ? void 0 : t.in), s = l.getDay(), i = (e % 7 + 7) % 7, d = 7 - r, p = e < 0 || e > 6 ? e - (s + d) % 7 : (i + d) % 7 - (s + d) % 7;
  return Gn(l, p, t);
}
class Om extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 90);
    Q(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return r.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
      // T
      case "EEEEE":
        return r.day(t, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
      // Tuesday
      case "EEEE":
      default:
        return r.day(t, { width: "wide", context: "formatting" }) || r.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 6;
  }
  set(t, n, r, l) {
    return t = ha(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
class Rm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 90);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r, l) {
    const s = (o) => {
      const i = Math.floor((o - 1) / 7) * 7;
      return (o + l.weekStartsOn + 6) % 7 + i;
    };
    switch (n) {
      // 3
      case "e":
      case "ee":
        return ge(he(n.length, t), s);
      // 3rd
      case "eo":
        return ge(
          r.ordinalNumber(t, {
            unit: "day"
          }),
          s
        );
      // Tue
      case "eee":
        return r.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
      // T
      case "eeeee":
        return r.day(t, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
      // Tuesday
      case "eeee":
      default:
        return r.day(t, { width: "wide", context: "formatting" }) || r.day(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(t, { width: "short", context: "formatting" }) || r.day(t, { width: "narrow", context: "formatting" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 6;
  }
  set(t, n, r, l) {
    return t = ha(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
class $m extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 90);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r, l) {
    const s = (o) => {
      const i = Math.floor((o - 1) / 7) * 7;
      return (o + l.weekStartsOn + 6) % 7 + i;
    };
    switch (n) {
      // 3
      case "c":
      case "cc":
        return ge(he(n.length, t), s);
      // 3rd
      case "co":
        return ge(
          r.ordinalNumber(t, {
            unit: "day"
          }),
          s
        );
      // Tue
      case "ccc":
        return r.day(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.day(t, { width: "short", context: "standalone" }) || r.day(t, { width: "narrow", context: "standalone" });
      // T
      case "ccccc":
        return r.day(t, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return r.day(t, { width: "short", context: "standalone" }) || r.day(t, { width: "narrow", context: "standalone" });
      // Tuesday
      case "cccc":
      default:
        return r.day(t, { width: "wide", context: "standalone" }) || r.day(t, {
          width: "abbreviated",
          context: "standalone"
        }) || r.day(t, { width: "short", context: "standalone" }) || r.day(t, { width: "narrow", context: "standalone" });
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 6;
  }
  set(t, n, r, l) {
    return t = ha(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
function Nm(a, e, t) {
  const n = ye(a, t == null ? void 0 : t.in), r = pm(n, t), l = e - r;
  return Gn(n, l, t);
}
class Vm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 90);
    Q(this, "incompatibleTokens", [
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
  parse(t, n, r) {
    const l = (s) => s === 0 ? 7 : s;
    switch (n) {
      // 2
      case "i":
      case "ii":
        return he(n.length, t);
      // 2nd
      case "io":
        return r.ordinalNumber(t, { unit: "day" });
      // Tue
      case "iii":
        return ge(
          r.day(t, {
            width: "abbreviated",
            context: "formatting"
          }) || r.day(t, {
            width: "short",
            context: "formatting"
          }) || r.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      // T
      case "iiiii":
        return ge(
          r.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      // Tu
      case "iiiiii":
        return ge(
          r.day(t, {
            width: "short",
            context: "formatting"
          }) || r.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      // Tuesday
      case "iiii":
      default:
        return ge(
          r.day(t, {
            width: "wide",
            context: "formatting"
          }) || r.day(t, {
            width: "abbreviated",
            context: "formatting"
          }) || r.day(t, {
            width: "short",
            context: "formatting"
          }) || r.day(t, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 7;
  }
  set(t, n, r) {
    return t = Nm(t, r), t.setHours(0, 0, 0, 0), t;
  }
}
class qm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 80);
    Q(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "a":
      case "aa":
      case "aaa":
        return r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, n, r) {
    return t.setHours(ma(r), 0, 0, 0), t;
  }
}
class jm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 80);
    Q(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "b":
      case "bb":
      case "bbb":
        return r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, n, r) {
    return t.setHours(ma(r), 0, 0, 0), t;
  }
}
class Hm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 80);
    Q(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(t, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(t, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(t, n, r) {
    return t.setHours(ma(r), 0, 0, 0), t;
  }
}
class Km extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 70);
    Q(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "h":
        return pe(be.hour12h, t);
      case "ho":
        return r.ordinalNumber(t, { unit: "hour" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 12;
  }
  set(t, n, r) {
    const l = t.getHours() >= 12;
    return l && r < 12 ? t.setHours(r + 12, 0, 0, 0) : !l && r === 12 ? t.setHours(0, 0, 0, 0) : t.setHours(r, 0, 0, 0), t;
  }
}
class Wm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 70);
    Q(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "H":
        return pe(be.hour23h, t);
      case "Ho":
        return r.ordinalNumber(t, { unit: "hour" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 23;
  }
  set(t, n, r) {
    return t.setHours(r, 0, 0, 0), t;
  }
}
class Ym extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 70);
    Q(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "K":
        return pe(be.hour11h, t);
      case "Ko":
        return r.ordinalNumber(t, { unit: "hour" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 11;
  }
  set(t, n, r) {
    return t.getHours() >= 12 && r < 12 ? t.setHours(r + 12, 0, 0, 0) : t.setHours(r, 0, 0, 0), t;
  }
}
class Qm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 70);
    Q(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "k":
        return pe(be.hour24h, t);
      case "ko":
        return r.ordinalNumber(t, { unit: "hour" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 1 && n <= 24;
  }
  set(t, n, r) {
    const l = r <= 24 ? r % 24 : r;
    return t.setHours(l, 0, 0, 0), t;
  }
}
class zm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 60);
    Q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "m":
        return pe(be.minute, t);
      case "mo":
        return r.ordinalNumber(t, { unit: "minute" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 59;
  }
  set(t, n, r) {
    return t.setMinutes(r, 0, 0), t;
  }
}
class Gm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 50);
    Q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, n, r) {
    switch (n) {
      case "s":
        return pe(be.second, t);
      case "so":
        return r.ordinalNumber(t, { unit: "second" });
      default:
        return he(n.length, t);
    }
  }
  validate(t, n) {
    return n >= 0 && n <= 59;
  }
  set(t, n, r) {
    return t.setSeconds(r, 0), t;
  }
}
class Xm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 30);
    Q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return ge(he(n.length, t), r);
  }
  set(t, n, r) {
    return t.setMilliseconds(r), t;
  }
}
class Um extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 10);
    Q(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(t, n) {
    switch (n) {
      case "X":
        return Le(
          Pe.basicOptionalMinutes,
          t
        );
      case "XX":
        return Le(Pe.basic, t);
      case "XXXX":
        return Le(
          Pe.basicOptionalSeconds,
          t
        );
      case "XXXXX":
        return Le(
          Pe.extendedOptionalSeconds,
          t
        );
      case "XXX":
      default:
        return Le(Pe.extended, t);
    }
  }
  set(t, n, r) {
    return n.timestampIsSet ? t : Te(
      t,
      t.getTime() - Tt(t) - r
    );
  }
}
class Zm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 10);
    Q(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(t, n) {
    switch (n) {
      case "x":
        return Le(
          Pe.basicOptionalMinutes,
          t
        );
      case "xx":
        return Le(Pe.basic, t);
      case "xxxx":
        return Le(
          Pe.basicOptionalSeconds,
          t
        );
      case "xxxxx":
        return Le(
          Pe.extendedOptionalSeconds,
          t
        );
      case "xxx":
      default:
        return Le(Pe.extended, t);
    }
  }
  set(t, n, r) {
    return n.timestampIsSet ? t : Te(
      t,
      t.getTime() - Tt(t) - r
    );
  }
}
class Jm extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 40);
    Q(this, "incompatibleTokens", "*");
  }
  parse(t) {
    return rr(t);
  }
  set(t, n, r) {
    return [Te(t, r * 1e3), { timestampIsSet: !0 }];
  }
}
class eh extends ue {
  constructor() {
    super(...arguments);
    Q(this, "priority", 20);
    Q(this, "incompatibleTokens", "*");
  }
  parse(t) {
    return rr(t);
  }
  set(t, n, r) {
    return [Te(t, r), { timestampIsSet: !0 }];
  }
}
const th = {
  G: new ym(),
  y: new km(),
  Y: new wm(),
  R: new _m(),
  u: new Tm(),
  Q: new xm(),
  q: new Dm(),
  M: new Im(),
  L: new Em(),
  w: new Pm(),
  I: new Mm(),
  d: new Am(),
  D: new Fm(),
  E: new Om(),
  e: new Rm(),
  c: new $m(),
  i: new Vm(),
  a: new qm(),
  b: new jm(),
  B: new Hm(),
  h: new Km(),
  H: new Wm(),
  K: new Ym(),
  k: new Qm(),
  m: new zm(),
  s: new Gm(),
  S: new Xm(),
  X: new Um(),
  x: new Zm(),
  t: new Jm(),
  T: new eh()
}, ah = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, nh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, rh = /^'([^]*?)'?$/, lh = /''/g, sh = /\S/, oh = /[a-zA-Z]/;
function za(a, e, t, n) {
  var g, _, E, A;
  const r = () => Te(t, NaN), l = fm(), s = l.locale ?? Un, o = l.firstWeekContainsDate ?? ((_ = (g = l.locale) == null ? void 0 : g.options) == null ? void 0 : _.firstWeekContainsDate) ?? 1, i = l.weekStartsOn ?? ((A = (E = l.locale) == null ? void 0 : E.options) == null ? void 0 : A.weekStartsOn) ?? 0;
  if (!e)
    return a ? r() : ye(t, n == null ? void 0 : n.in);
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: i,
    locale: s
  }, p = [new gm(n == null ? void 0 : n.in, t)], m = e.match(nh).map((C) => {
    const K = C[0];
    if (K in Zt) {
      const R = Zt[K];
      return R(C, s.formatLong);
    }
    return C;
  }).join("").match(ah), v = [];
  for (let C of m) {
    ar(C) && Jt(C, e, a), tr(C) && Jt(C, e, a);
    const K = C[0], R = th[K];
    if (R) {
      const { incompatibleTokens: D } = R;
      if (Array.isArray(D)) {
        const x = v.find(
          (M) => D.includes(M.token) || M.token === K
        );
        if (x)
          throw new RangeError(
            `The format string mustn't contain \`${x.fullToken}\` and \`${C}\` at the same time`
          );
      } else if (R.incompatibleTokens === "*" && v.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${C}\` and any other token at the same time`
        );
      v.push({ token: K, fullToken: C });
      const $ = R.run(
        a,
        C,
        s.match,
        d
      );
      if (!$)
        return r();
      p.push($.setter), a = $.rest;
    } else {
      if (K.match(oh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + K + "`"
        );
      if (C === "''" ? C = "'" : K === "'" && (C = ih(C)), a.indexOf(C) === 0)
        a = a.slice(C.length);
      else
        return r();
    }
  }
  if (a.length > 0 && sh.test(a))
    return r();
  const L = p.map((C) => C.priority).sort((C, K) => K - C).filter((C, K, R) => R.indexOf(C) === K).map(
    (C) => p.filter((K) => K.priority === C).sort((K, R) => R.subPriority - K.subPriority)
  ).map((C) => C[0]);
  let T = ye(t, n == null ? void 0 : n.in);
  if (isNaN(+T)) return r();
  const B = {};
  for (const C of L) {
    if (!C.validate(T, d))
      return r();
    const K = C.set(T, B, d);
    Array.isArray(K) ? (T = K[0], Object.assign(B, K[1])) : T = K;
  }
  return T;
}
function ih(a) {
  return a.match(rh)[1].replace(lh, "'");
}
const uh = {
  dsfrDecodeDate: function(a, e) {
    if (typeof a != "string" || a === "" || /^\d{4}-\d{2}-\d{2}$/.test(a))
      return a;
    const n = za(a, e, /* @__PURE__ */ new Date());
    return Qa(n, "yyyy-MM-dd");
  },
  dsfrSearch: function(a) {
    return this.search(a, 0);
  },
  dsfrDecodeDateTime: function(a, e) {
    if (a === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(a))
      return a;
    const n = za(a, e, /* @__PURE__ */ new Date());
    return Qa(n, "yyyy-MM-dd'T'HH:mm");
  },
  _searchAndFilterList: function(a, e, t, n, r) {
    let l = this.$data.vueData[a];
    if (n && (l = l.filter(n)), r != null && r.trim() !== "") {
      const s = this.unaccentLower(r);
      l = l.filter((o) => this.unaccentLower(o[t].toString()).indexOf(s) > -1);
    }
    return l;
  },
  dsfrTransformListForSelection: function(a, e, t, n, r) {
    return this._searchAndFilterList(a, e, t, n, r).map(function(s) {
      return {
        value: s[e],
        text: s[t].toString()
      };
    });
  },
  dsfrTransformListForRadio: function(a, e, t, n, r, l, s) {
    return this._searchAndFilterList(a, e, t, l, s).map(function(i) {
      return {
        value: i[e],
        label: i[t].toString(),
        hint: i[r],
        disabled: i[n]
      };
    });
  },
  dsfrTransformListForCheckbox: function(a, e, t, n, r, l, s, o) {
    return this._searchAndFilterList(a, e, t, s, o).map(function(d) {
      return {
        value: d[e],
        label: d[t].toString(),
        name: l,
        hint: d[r],
        disabled: d[n]
      };
    });
  },
  dsfrSearchAutocomplete: function(a, e, t, n, r, l, s) {
    return s.length < l ? Promise.resolve([]) : this.$http.post(r, this.objectToFormData({ terms: s, list: a, valueField: e, labelField: t, CTX: this.$data.vueData.CTX })).then((o) => o.data.map((i) => ({
      value: i[e],
      label: i[t].toString()
      // A label is always a string
    }))).catch(() => []);
  },
  dsfrLoadAutocompleteById: function(a, e, t, n, r, l, s, o) {
    let i = o != null && o !== "null" ? this.$data.vueData[l][o][s] : this.$data.vueData[l][s];
    Array.isArray(i) ? i.forEach((d) => this.dsfrLoadMissingAutocompleteOption(a, e, t, n, r, d)) : this.dsfrLoadMissingAutocompleteOption(a, e, t, n, r, i);
  },
  dsfrLoadMissingAutocompleteOption: function(a, e, t, n, r, l) {
    let s = this.componentStates[n].options.find((o) => o.value === l);
    if (!l || s !== void 0) {
      (s == null ? void 0 : s.label) !== void 0 && (this.componentStates[n].field = s.label);
      return;
    }
    this.$data.componentStates[n].loading = !0, this.$http.post(r, this.objectToFormData({ value: l, list: a, valueField: e, labelField: t, CTX: this.$data.vueData.CTX })).then((function(o) {
      let i = o.data.map(function(d) {
        return { value: d[e], label: d[t].toString() };
      });
      return this.$data.componentStates[n].options = this.$data.componentStates[n].options.concat(i), this.componentStates[n].field = i[0].label, this.$data.componentStates[n].options;
    }).bind(this)).catch((function(o) {
      this.$q.notify(o.response.status + ":" + o.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[n].loading = !1;
    }).bind(this));
  },
  dsfrResetAutocomplete: function(a, e, t, n) {
    let r = this.componentStates[a].field;
    if (r === void 0)
      return;
    let l = this.componentStates[a].options.find((s) => s.label.toLowerCase().startsWith(r.trim().toLowerCase()));
    l === void 0 || r === "" ? (this.componentStates[a].field = void 0, n != null && n !== "null" ? this.$data.vueData[e][n][t] = void 0 : this.$data.vueData[e][t] = void 0) : (this.$data.componentStates[a].field = l.label, n != null && n !== "null" ? this.$data.vueData[e][n][t] = l.value : this.$data.vueData[e][t] = l.value);
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var a, e;
    (e = (a = this.componentStates) == null ? void 0 : a.dsfrHeader) == null || e.navItems.forEach((t) => {
      t.title ? t.active = t.links.some((n) => n["data-set-active"] === !0 || window.location.pathname.startsWith(n.to)) : t.active = t["data-set-active"] === !0;
    });
  },
  dsfrTableRows: function(a) {
    let e = this.$data.componentStates[a].pagination, t = this.$data.vueData[e.listKey];
    return e.sortUrl && e.descending ? t.slice().reverse() : t;
  },
  dsfrServerSideSort: function(a) {
    let t = this.$data.componentStates[a].pagination, n = this.$data.vueData;
    t.page = 0, t.sortUrl && t.sortBy && this.$http.post(t.sortUrl, this.objectToFormData({ sortFieldName: t.sortBy, sortDesc: t.descending, CTX: this.$data.vueData.CTX })).then(
      (function(r) {
        n[t.listKey] = r.data.model[t.listKey], this.$data.vueData.CTX = r.data.model.CTX;
      }).bind(this)
    );
  }
}, Be = (a = "", e = "") => (a ? `${a}-` : "") + na() + (e ? `-${e}` : ""), dh = {
  useRandomId: Be
}, ch = ["href", "aria-current"], fh = {
  __name: "RouterLink",
  props: ["to", "active"],
  setup(a) {
    const e = a, t = e.to === "/" ? window.location.pathname === e.to : window.location.pathname.startsWith(e.to);
    return (n, r) => (u(), f("a", {
      href: e.to,
      "aria-current": Y(t) || a.active ? "page" : void 0
    }, [
      F(n.$slots, "default")
    ], 8, ch));
  }
}, Se = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, ph = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Ot, DsfrTag: pa, DsfrButton: He },
  props: {
    facets: Array,
    selectedFacets: Object,
    contextKey: String,
    facetValueTranslatorProvider: Function,
    heading: {
      type: String,
      default: "h6"
    },
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
    addFacetValueTranslator(a, e) {
      this.codeToLabelTranslater[a] = e;
    },
    facetByCode(a) {
      return this.facets.filter(function(e) {
        return e.code === a;
      })[0];
    },
    facetValueByCode(a, e) {
      return this.facetByCode(a).values.filter(function(t) {
        return t.code === e;
      })[0];
    },
    facetLabelByCode(a) {
      return this.facetByCode(a).label;
    },
    facetMultipleByCode(a) {
      return this.facetByCode(a).multiple;
    },
    facetValueLabelByCode(a, e) {
      if (this.codeToLabelTranslater[a])
        return this.codeToLabelTranslater[a](a, e);
      var t = this.facetValueByCode(a, e);
      return t ? t.label : e;
    },
    isFacetValueSelected(a, e) {
      return this.selectedFacets[a].includes(e);
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
      return this.selectedFacets[a].filter((e) => !this.facetValueByCode(a, e)).map((e) => {
        var t = {};
        return t.code = e, t.label = e, t.count = 0, t;
      });
    },
    visibleFacets(a, e) {
      return this.isFacetExpanded(a) ? e : e.slice(0, this.maxValues);
    }
  }
}, vh = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, mh = ["aria-labelledby"], hh = {
  key: 0,
  class: "facet"
}, bh = { class: "flex justify-between w-full fr-mb-0" }, gh = {
  class: "facet--count",
  "aria-hidden": "true"
}, yh = { class: "fr-sr-only" }, kh = { class: "flex justify-between w-full" }, wh = {
  class: "facet--count",
  "aria-hidden": "true"
}, _h = { class: "fr-sr-only" }, Th = ["aria-labelledby"], xh = {
  key: 0,
  class: "facet"
}, Dh = { class: "flex justify-between w-full fr-mb-0" }, Ih = {
  class: "facet--count",
  "aria-hidden": "true"
}, Eh = { class: "fr-sr-only" }, Ch = { class: "flex justify-between w-full" }, Ph = {
  class: "facet--count",
  "aria-hidden": "true"
}, Lh = { class: "fr-sr-only" }, Mh = { class: "fr-mb-2w" };
function Bh(a, e, t, n, r, l) {
  const s = xe("DsfrTag"), o = xe("DsfrCheckbox"), i = xe("DsfrButton");
  return u(), f("div", null, [
    l.isAnyFacetValueSelected() ? (u(), f("div", vh, [
      (u(!0), f(Z, null, te(t.selectedFacets, (d, p) => (u(), f(Z, { key: p }, [
        l.facetMultipleByCode(p) ? y("", !0) : (u(!0), f(Z, { key: 0 }, te(d, (m) => (u(), j(s, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (v) => a.$emit("toogle-facet", p, m, t.contextKey)
        }, {
          default: ee(() => [
            H(b(l.facetLabelByCode(p)) + ": " + b(l.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : y("", !0),
    (u(!0), f(Z, null, te(t.facets, (d) => (u(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (u(), f(Z, { key: 0 }, [
        (u(), j(me(t.heading), {
          class: "fr-mb-1w fr-text--md",
          id: d.code
        }, {
          default: ee(() => [
            H(b(d.label), 1)
          ]),
          _: 2
        }, 1032, ["id"])),
        l.selectedInvisibleFacets(d.code, d.values).length > 0 ? (u(), f("div", {
          key: 0,
          role: "group",
          "aria-labelledby": d.code
        }, [
          (u(!0), f(Z, null, te(l.selectedInvisibleFacets(d.code), (p) => (u(), f(Z, {
            key: p.code
          }, [
            d.multiple ? (u(), f("div", hh, [
              re(o, {
                small: "",
                modelValue: !0,
                "onUpdate:modelValue": (m) => a.$emit("toogle-facet", d.code, p.code, t.contextKey)
              }, {
                label: ee(() => [
                  c("span", bh, [
                    H(b(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", gh, b(p.count), 1),
                    c("span", yh, "(" + b(p.count) + " élément(s))", 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onUpdate:modelValue"])
            ])) : (u(), j(i, {
              key: 1,
              tertiary: "",
              "no-outline": "",
              onClick: (m) => a.$emit("toogle-facet", d.code, p.code, t.contextKey)
            }, {
              default: ee(() => [
                c("span", kh, [
                  H(b(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                  c("span", wh, b(p.count), 1),
                  c("span", _h, "(" + b(p.count) + " élément(s))", 1)
                ])
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ], 64))), 128))
        ], 8, mh)) : y("", !0),
        l.visibleFacets(d.code, d.values).length > 0 ? (u(), f("div", {
          key: 1,
          role: "group",
          "aria-labelledby": d.code
        }, [
          (u(!0), f(Z, null, te(l.visibleFacets(d.code, d.values), (p) => (u(), f(Z, {
            key: p.code
          }, [
            d.multiple ? (u(), f("div", xh, [
              re(o, {
                small: "",
                modelValue: l.isFacetValueSelected(d.code, p.code),
                class: "facet",
                "onUpdate:modelValue": (m) => a.$emit("toogle-facet", d.code, p.code, t.contextKey)
              }, {
                label: ee(() => [
                  c("span", Dh, [
                    H(b(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", Ih, b(p.count), 1),
                    c("span", Eh, "(" + b(p.count) + " élément(s))", 1)
                  ])
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue"])
            ])) : (u(), j(i, {
              key: 1,
              tertiary: "",
              "no-outline": "",
              onClick: (m) => a.$emit("toogle-facet", d.code, p.code, t.contextKey)
            }, {
              default: ee(() => [
                c("span", Ch, [
                  H(b(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                  c("span", Ph, b(p.count), 1),
                  c("span", Lh, "(" + b(p.count) + " élément(s))", 1)
                ])
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ], 64))), 128))
        ], 8, Th)) : y("", !0),
        c("div", Mh, [
          d.values.length > t.maxValues && !l.isFacetExpanded(d.code) ? (u(), j(i, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: ee(() => e[0] || (e[0] = [
              H(" Voir plus ")
            ])),
            _: 2,
            __: [0]
          }, 1032, ["onClick"])) : y("", !0),
          d.values.length > t.maxValues && l.isFacetExpanded(d.code) ? (u(), j(i, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: ee(() => e[1] || (e[1] = [
              H(" Voir moins ")
            ])),
            _: 2,
            __: [1]
          }, 1032, ["onClick"])) : y("", !0)
        ])
      ], 64)) : y("", !0)
    ]))), 128))
  ]);
}
const Sh = /* @__PURE__ */ Se(ph, [["render", Bh], ["__scopeId", "data-v-628fafbe"]]), ba = () => {
  const a = G(), e = G(!1), t = G(!1), n = () => {
    if (!a.value)
      return;
    a.value.style.setProperty("--collapser", "none");
    const s = a.value.offsetHeight;
    a.value.style.setProperty("--collapse", `${-s}px`), a.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: a,
    collapsing: e,
    cssExpanded: t,
    doExpand: (s) => {
      a.value && (s === !0 && a.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        e.value = !0, n(), window.requestAnimationFrame(() => {
          t.value = s;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (s) => {
      e.value = !1, a.value && s === !1 && a.value.style.removeProperty("--collapse-max-height");
    }
  };
}, Ah = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Fh = ["id", "aria-labelledby", "onKeydown"], Oh = {
  class: "fr-menu__list",
  role: "none"
}, Rh = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Be("menu") },
    size: {},
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 },
    tertiary: { type: Boolean, default: !1 }
  },
  setup(a, { expose: e }) {
    const {
      collapse: t,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = ba(), o = a, i = G(null), d = G(!1);
    let p = G(0), m = [];
    $e("menuItem", { menuItemIndex: p, addMenuItem: (D, $) => {
      p.value += 1, m.push(`${D}@${$}`);
    } }), $e("id", o.id), ve(d, (D, $) => {
      D !== $ && (l(D), D ? (setTimeout(() => B(), 100), document.addEventListener("click", E), document.addEventListener("touchstart", E)) : (document.removeEventListener("click", E), document.removeEventListener("touchstart", E)));
    });
    const L = (D, $) => {
      const x = $ === "down" ? (D + 1) % m.length : (D - 1 + m.length) % m.length, M = document.getElementById(`${o.id}_item_${x}`);
      return M.ariaDisabled === "true" ? L(x, $) : M;
    }, T = (D) => {
      const $ = document.activeElement.id, x = $.startsWith(`${o.id}_item_`) ? Number($.split("_")[2]) : D === "down" ? -1 : 0;
      L(x, D).focus();
    }, B = (D) => T("down"), g = (D) => T("up");
    let _ = (D) => {
      let $ = D.key;
      if ($.length > 1 && $.match(/\S/))
        return;
      $ = $.toLowerCase();
      let x = m.filter((h) => h.toLowerCase().startsWith($)), M = document.activeElement.id;
      for (let h of x) {
        let P = h.split("@")[1], k = document.getElementById(`${o.id}_item_${P}`);
        if (M !== k.id) {
          k.focus();
          break;
        }
      }
    }, E = (D) => {
      i.value.contains(D.target) || (d.value = !1);
    };
    function A() {
      d.value = !1;
    }
    const C = w(() => ["sm", "small"].includes(o.size)), K = w(() => ["md", "medium"].includes(o.size)), R = w(() => ["lg", "large"].includes(o.size));
    return e({ closeMenu: A }), (D, $) => (u(), f("div", {
      class: "relative-position fr-menu__wrapper",
      onKeydown: $[9] || ($[9] = se(
        //@ts-ignore
        (...x) => Y(E) && Y(E)(...x),
        ["tab"]
      )),
      ref_key: "container",
      ref: i
    }, [
      c("button", X({
        id: D.id,
        onClick: $[0] || ($[0] = ne((x) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          $[1] || ($[1] = se(ne((x) => d.value = !1, ["stop"]), ["esc"])),
          $[2] || ($[2] = se(ne((x) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          se(ne(B, ["prevent"]), ["down"]),
          se(ne(g, ["prevent"]), ["up"]),
          $[3] || ($[3] = //@ts-ignore
          (...x) => Y(_) && Y(_)(...x)),
          $[4] || ($[4] = se((x) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [D.icon]: !0,
          "fr-btn--secondary": D.secondary,
          "fr-btn--tertiary": D.tertiary,
          "fr-btn--sm": C.value,
          "fr-btn--md": K.value,
          "fr-btn--lg": R.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": D.disabled,
        "aria-controls": `${D.id}_menu`,
        "aria-expanded": d.value
      }, D.$attrs), [
        c("span", null, b(D.label), 1)
      ], 16, Ah),
      c("div", {
        id: `${D.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: q(["fr-collapse fr-menu", { "fr-collapse--expanded": Y(r), "fr-collapsing": Y(n) }]),
        role: "menu",
        "aria-labelledby": D.id,
        onKeyup: $[5] || ($[5] = se((x) => d.value = !1, ["esc"])),
        onKeydown: [
          $[6] || ($[6] = se((x) => d.value = !1, ["tab"])),
          se(ne(B, ["prevent"]), ["down"]),
          se(ne(g, ["prevent"]), ["up"]),
          $[7] || ($[7] = //@ts-ignore
          (...x) => Y(_) && Y(_)(...x))
        ],
        onTransitionend: $[8] || ($[8] = (x) => Y(s)(d.value))
      }, [
        c("ul", Oh, [
          F(D.$slots, "default", {}, void 0, !0)
        ])
      ], 42, Fh)
    ], 544));
  }
}), $h = /* @__PURE__ */ Se(Rh, [["__scopeId", "data-v-7c863055"]]), Nh = { role: "none" }, Vh = ["id", "href"], qh = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(a) {
    const e = a, { menuItemIndex: t, addMenuItem: n } = Ue("menuItem"), l = `fr-btn fr-btn--secondary fr-nav__link ${w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")) ? e.icon : ""} fr-btn--icon-left`, s = Ue("id"), o = t.value;
    return n(e.label, o), (i, d) => {
      const p = xe("dsfr-button");
      return u(), f("li", Nh, [
        i.url === "" ? (u(), j(p, X({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: i.label,
          id: `${Y(s)}_item_${Y(o)}`,
          icon: i.icon,
          tertiary: "",
          "no-outline": "",
          class: "fr-nav__link"
        }, i.$attrs), null, 16, ["label", "id", "icon"])) : (u(), f("a", X({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${Y(s)}_item_${Y(o)}`,
          href: i.url,
          class: l
        }, i.$attrs), b(i.label), 17, Vh))
      ]);
    };
  }
}), jh = /* @__PURE__ */ Se(qh, [["__scopeId", "data-v-b29bb72d"]]), Hh = ["id"], Kh = {
  key: 0,
  class: "required"
}, Wh = {
  key: 0,
  class: "fr-hint-text"
}, Yh = ["id", "aria-expanded", "aria-describedby", "aria-controls", "aria-disabled", "aria-required"], Qh = { class: "grow overflow" }, zh = { class: "fr-pl-1v fr-select__icon" }, Gh = ["id"], Xh = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, Uh = ["id"], Zh = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, Jh = ["id", "aria-controls"], eb = ["id"], tb = {
  key: 0,
  class: "fr-hint-text"
}, ab = ["aria-describedby", "id"], nb = ["id", "onKeydown", "onClick", "aria-selected"], rb = ["data-id", "value"], lb = ["id"], sb = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Be("select-multiple") },
    name: { default: void 0 },
    description: { default: void 0 },
    modelValue: { default: () => [] },
    label: { default: "" },
    options: { default: () => [] },
    successMessage: { default: "" },
    errorMessage: { default: "" },
    comboHasFilter: { type: Boolean, default: !0 },
    comboHasButton: { type: Boolean, default: !0 },
    comboLabel: { default: "" },
    comboDescription: { default: "" }
  },
  emits: ["update:model-value", "blur"],
  setup(a, { emit: e }) {
    const {
      collapse: t,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = ba(), o = a, i = G(!1), d = G(o.options);
    ve(i, (I, O) => {
      I !== O && (l(I), I ? (document.addEventListener("click", k), document.addEventListener("touchstart", k)) : (document.removeEventListener("click", k), document.removeEventListener("touchstart", k)));
    });
    const p = G(null), m = G(null), v = G(null), L = G(""), T = e, B = w(() => o.errorMessage || o.successMessage), g = w(() => o.errorMessage !== "" ? "error" : "valid"), _ = w(() => d.value.every((I) => o.modelValue.includes(I.value)) ? "fr-icon-close-circle-line" : "fr-icon-check-line"), E = w(() => d.value.every((I) => o.modelValue.includes(I.value)) ? "Tout déselectionner" : "Tout sélectionner"), A = w(() => {
      let O = `${o.options.filter((N) => o.modelValue.includes(N.value)).length} options séléctionnées`;
      return o.modelValue.length > 2 ? O : o.options.filter((N) => o.modelValue.includes(N.value)).map((N) => N.text).join(", ");
    });
    let C = function() {
      if (d.value.every((O) => o.modelValue.includes(O.value))) {
        const O = d.value.map((z) => z.value), N = o.modelValue.filter((z) => !O.includes(z));
        o.modelValue.length = 0, N.forEach((z) => o.modelValue.push(z));
      } else
        d.value.filter((N) => !o.modelValue.includes(N.value)).forEach((N) => o.modelValue.push(N.value));
      T("update:model-value", o.modelValue);
    }, K = function(I) {
      const O = I.target.value.toLowerCase();
      d.value = o.options.filter((N) => N.text.toLowerCase().indexOf(O) > -1);
    };
    const R = function(I) {
      switch (I.key) {
        case "Escape":
        case "Esc":
          I.stopPropagation(), i.value = !1;
          break;
        case " ":
        case "Space":
          document.activeElement.id === o.id && (I.preventDefault(), i.value = !i.value);
          break;
        case "Down":
        case "ArrowDown":
          I.preventDefault(), i.value ? x() : (i.value = !0, setTimeout(() => x(), 100));
          break;
        case "Up":
        case "ArrowUp":
          I.preventDefault(), i.value ? M() : (i.value = !0, setTimeout(() => M(), 100));
          break;
        case "Tab":
          h(I);
          break;
        default:
          let O = /^[a-zA-Z0-9àâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]$/.test(I.key);
          if (!O && I.shiftKey)
            return;
          o.comboHasFilter && document.activeElement.id === `${o.id}_filter` || (o.comboHasFilter && O ? v.value.focus() : P(I));
      }
    }, D = (I, O) => {
      const N = O === "down" ? (I + 1) % d.value.length : (I - 1 + d.value.length) % d.value.length, z = document.getElementById(`${o.id}_item_${N}`);
      return z === null || z.ariaDisabled === "true" ? D(N, O) : z;
    }, $ = (I) => {
      const O = document.activeElement.id, N = O.startsWith(`${o.id}_item_`) ? Number(O.split("_")[2]) : I === "down" ? -1 : 0;
      D(N, I).focus();
    }, x = (I) => $("down"), M = (I) => $("up"), h = (I) => {
      if (!i.value) {
        T("blur");
        return;
      }
      const O = [];
      o.comboHasButton && O.push(`${o.id}_button`), o.comboHasFilter && O.push(`${o.id}_filter`), O.push("item");
      const N = O.indexOf(I.target.id);
      let z;
      I.shiftKey ? z = (N - 1 + O.length) % O.length : z = (N + 1) % O.length;
      const U = document.getElementById(O[z]);
      O[z] === "item" ? (x(), I.preventDefault()) : U && (U.focus(), I.preventDefault());
    };
    let P = (I) => {
      let O = I.key;
      if (O.length > 1 && O.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      O = O.toLowerCase();
      let N = d.value.filter((U) => U.text.toLowerCase().startsWith(O)), z = document.activeElement.id;
      for (let U of N) {
        let le = document.querySelector(`[data-id='${U.value}']`);
        if (z !== le.id) {
          le.focus();
          break;
        }
      }
    }, k = (I) => {
      p.value.contains(I.target) || (i.value = !1, T("blur"));
    }, S = (I, O) => {
      o.modelValue.includes(O) ? o.modelValue.splice(o.modelValue.indexOf(O), 1) : (o.modelValue.push(O), d.value.length === 1 && (L.value = "", d.value = o.options)), T("update:model-value", o.modelValue);
    };
    return (I, O) => {
      const N = xe("v-icon");
      return u(), f(Z, null, [
        c("div", X({
          ref_key: "container",
          ref: p,
          class: ["fr-select-group", { [`fr-select-group--${g.value}`]: B.value !== "" }],
          onKeyup: O[6] || (O[6] = se(
            //@ts-ignore
            (...z) => Y(k) && Y(k)(...z),
            ["tab"]
          ))
        }, I.$attrs), [
          c("p", {
            class: "fr-label fr-mb-0",
            id: `${I.id}_label`
          }, [
            F(I.$slots, "label", {}, () => [
              H(b(I.label) + " ", 1),
              F(I.$slots, "required-tip", {}, () => [
                I.required ? (u(), f("span", Kh, " *")) : y("", !0)
              ], !0)
            ], !0),
            I.description ? (u(), f("span", Wh, b(I.description), 1)) : y("", !0)
          ], 8, Hh),
          c("div", {
            id: I.id,
            class: q([{ [`fr-select--${g.value}`]: B.value !== "" }, "fr-input fr-select--menu flex"]),
            onClick: O[0] || (O[0] = (z) => i.value = !i.value),
            onKeydown: R,
            tabindex: "0",
            "aria-autocomplete": "none",
            role: "combobox",
            "aria-expanded": i.value,
            "aria-haspopup": "dialog",
            "aria-describedby": `${I.id}_label`,
            "aria-controls": `${I.id}_dialog`,
            "aria-disabled": I.disabled,
            "aria-required": I.required
          }, [
            c("p", Qh, b(A.value), 1),
            c("div", zh, [
              re(N, {
                style: { "font-size": "1rem" },
                name: "ri-arrow-down-s-line"
              })
            ])
          ], 42, Yh),
          c("div", {
            id: `${I.id}_dialog`,
            ref_key: "collapse",
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Choix des options",
            class: q(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": Y(r), "fr-collapsing": Y(n) }]),
            onKeydown: R,
            onTransitionend: O[5] || (O[5] = (z) => Y(s)(i.value))
          }, [
            I.comboHasButton ? (u(), f("div", Xh, [
              c("button", {
                class: q(["fr-btn fr-btn--tertiary fr-btn--sm", `${_.value}`]),
                id: `${I.id}_button`,
                onClick: O[1] || (O[1] = (z) => Y(C)()),
                ref_key: "button",
                ref: m,
                type: "button"
              }, b(E.value), 11, Uh)
            ])) : y("", !0),
            I.comboHasFilter ? (u(), f("div", Zh, [
              Me(c("input", {
                class: "fr-input",
                id: `${I.id}_filter`,
                ref_key: "filter",
                ref: v,
                onInput: O[2] || (O[2] = //@ts-ignore
                (...z) => Y(K) && Y(K)(...z)),
                "onUpdate:modelValue": O[3] || (O[3] = (z) => L.value = z),
                "aria-label": "Rechercher une option",
                "aria-controls": `${I.id}_listbox`,
                placeholder: "Rechercher",
                type: "text"
              }, null, 40, Jh), [
                [ya, L.value]
              ])
            ])) : y("", !0),
            I.comboLabel ? (u(), f("p", {
              key: 2,
              class: "fr-label fr-mb-2v",
              id: `${I.id}_combolabel`
            }, [
              H(b(I.comboLabel) + " ", 1),
              I.comboDescription ? (u(), f("span", tb, b(I.comboDescription), 1)) : y("", !0)
            ], 8, eb)) : y("", !0),
            c("ul", {
              role: "listbox",
              "aria-multiselectable": "true",
              "aria-describedby": I.comboLabel ? `${I.id}_combolabel` : null,
              id: `${I.id}_listbox`,
              "aria-live": "polite",
              class: "fr-select__ul"
            }, [
              (u(!0), f(Z, null, te(d.value, (z, U) => (u(), f("li", {
                class: "fr-checkbox-group fr-checkbox-group--sm fr-py-0 fr-my-1v",
                id: `${I.id}_item_${U}`,
                tabindex: "-1",
                role: "option",
                onKeydown: se(ne((le) => Y(S)(le, z.value), ["prevent"]), ["space"]),
                onClick: (le) => Y(S)(le, z.value),
                "aria-selected": o.modelValue.includes(z.value)
              }, [
                Me(c("input", {
                  "data-id": z.value,
                  type: "hidden",
                  class: "",
                  tabindex: "-1",
                  value: z.value,
                  "onUpdate:modelValue": O[4] || (O[4] = (le) => o.modelValue = le)
                }, null, 8, rb), [
                  [ya, o.modelValue]
                ]),
                c("span", null, b(z.text), 1)
              ], 40, nb))), 256))
            ], 8, ab)
          ], 42, Gh)
        ], 16),
        B.value ? (u(), f("p", {
          key: 0,
          id: `select-${g.value}-desc-${g.value}`,
          class: q(`fr-${g.value}-text`)
        }, b(B.value), 11, lb)) : y("", !0)
      ], 64);
    };
  }
}), ob = /* @__PURE__ */ Se(sb, [["__scopeId", "data-v-f2a49919"]]), ib = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], ub = ["id", "aria-labelledby", "onKeydown"], db = {
  key: 0,
  class: "fr-label fr-mb-0"
}, cb = {
  key: 0,
  class: "fr-hint-text"
}, fb = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, pb = { role: "none" }, vb = { class: "fr-p-2v" }, mb = ["id", "href"], hb = /* @__PURE__ */ V({
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
  setup(a) {
    const {
      collapse: e,
      collapsing: t,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = ba(), s = a, o = G(null), i = G(!1);
    let d = G(0), p = [];
    const m = (E, A) => {
      d.value += 1, p.push(`${E}@${A}`);
    };
    $e("menuItem", { menuItemIndex: d, addMenuItem: m }), $e("id", s.id), ve(i, (E, A) => {
      E !== A && (r(E), E ? (setTimeout(() => T(), 100), document.addEventListener("click", _), document.addEventListener("touchstart", _)) : (document.removeEventListener("click", _), document.removeEventListener("touchstart", _)));
    }), ke(() => {
      m(s.logoutLabel, d.value);
    });
    const v = (E, A) => {
      const C = A === "down" ? (E + 1) % p.length : (E - 1 + p.length) % p.length, K = document.getElementById(`${s.id}_item_${C}`);
      return K.ariaDisabled === "true" ? v(C, A) : K;
    }, L = (E) => {
      const A = document.activeElement.id, C = A.startsWith(`${s.id}_item_`) ? Number(A.split("_")[2]) : E === "down" ? -1 : 0;
      v(C, E).focus();
    }, T = (E) => L("down"), B = (E) => L("up");
    let g = (E) => {
      let A = E.key;
      if (A.length > 1 && A.match(/\S/))
        return;
      A = A.toLowerCase();
      let C = p.filter((R) => R.toLowerCase().startsWith(A)), K = document.activeElement.id;
      for (let R of C) {
        let D = R.split("@")[1], $ = document.getElementById(`${s.id}_item_${D}`);
        if (K !== $.id) {
          $.focus();
          break;
        }
      }
    }, _ = (E) => {
      o.value.contains(E.target) || (i.value = !1);
    };
    return (E, A) => (u(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: A[9] || (A[9] = se(
        //@ts-ignore
        (...C) => Y(_) && Y(_)(...C),
        ["tab"]
      )),
      ref_key: "container",
      ref: o
    }, [
      c("button", X({
        id: E.id,
        onClick: A[0] || (A[0] = ne((C) => i.value = !i.value, ["prevent", "stop"])),
        onKeyup: [
          A[1] || (A[1] = se(ne((C) => i.value = !1, ["stop"]), ["esc"])),
          A[2] || (A[2] = se(ne((C) => i.value = !i.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          se(ne(T, ["prevent"]), ["down"]),
          se(ne(B, ["prevent"]), ["up"]),
          A[3] || (A[3] = //@ts-ignore
          (...C) => Y(g) && Y(g)(...C)),
          A[4] || (A[4] = se((C) => i.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm fr-btn--icon-left", { [E.icon]: !0 }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": E.disabled,
        "aria-controls": `${E.id}_menu`,
        "aria-expanded": i.value
      }, E.$attrs), [
        c("span", null, b(E.label), 1)
      ], 16, ib),
      c("div", {
        id: `${E.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: q(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": Y(n), "fr-collapsing": Y(t) }]),
        role: "menu",
        "aria-labelledby": E.id,
        onKeyup: A[5] || (A[5] = se((C) => i.value = !1, ["esc"])),
        onKeydown: [
          A[6] || (A[6] = se((C) => i.value = !1, ["tab"])),
          se(ne(T, ["prevent"]), ["down"]),
          se(ne(B, ["prevent"]), ["up"]),
          A[7] || (A[7] = //@ts-ignore
          (...C) => Y(g) && Y(g)(...C))
        ],
        onTransitionend: A[8] || (A[8] = (C) => Y(l)(i.value))
      }, [
        F(E.$slots, "detail", {}, () => [
          E.nom === "" && E.email === "" ? y("", !0) : (u(), f("p", db, [
            H(b(E.nom) + " ", 1),
            E.email !== "" ? (u(), f("span", cb, b(E.email), 1)) : y("", !0)
          ]))
        ], !0),
        c("ul", fb, [
          F(E.$slots, "default", {}, void 0, !0),
          c("li", pb, [
            c("div", vb, [
              E.logoutUrl !== "" ? (u(), f("a", {
                key: 0,
                id: `${E.id}_item_${Y(d) - 1}`,
                class: "fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
                role: "menuitem",
                tabindex: "-1",
                href: E.logoutUrl
              }, b(E.logoutLabel), 9, mb)) : y("", !0)
            ])
          ])
        ])
      ], 42, ub)
    ], 544));
  }
}), bb = /* @__PURE__ */ Se(hb, [["__scopeId", "data-v-3a8c3dd5"]]), gb = Symbol("header");
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var or = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], Dt = /* @__PURE__ */ or.join(","), ir = typeof Element > "u", Ye = ir ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, It = !ir && Element.prototype.getRootNode ? function(a) {
  var e;
  return a == null || (e = a.getRootNode) === null || e === void 0 ? void 0 : e.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, Et = function a(e, t) {
  var n;
  t === void 0 && (t = !0);
  var r = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), l = r === "" || r === "true", s = l || t && e && a(e.parentNode);
  return s;
}, yb = function(e) {
  var t, n = e == null || (t = e.getAttribute) === null || t === void 0 ? void 0 : t.call(e, "contenteditable");
  return n === "" || n === "true";
}, ur = function(e, t, n) {
  if (Et(e))
    return [];
  var r = Array.prototype.slice.apply(e.querySelectorAll(Dt));
  return t && Ye.call(e, Dt) && r.unshift(e), r = r.filter(n), r;
}, dr = function a(e, t, n) {
  for (var r = [], l = Array.from(e); l.length; ) {
    var s = l.shift();
    if (!Et(s, !1))
      if (s.tagName === "SLOT") {
        var o = s.assignedElements(), i = o.length ? o : s.children, d = a(i, !0, n);
        n.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: s,
          candidates: d
        });
      } else {
        var p = Ye.call(s, Dt);
        p && n.filter(s) && (t || !e.includes(s)) && r.push(s);
        var m = s.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), v = !Et(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
        if (m && v) {
          var L = a(m === !0 ? s.children : m.children, !0, n);
          n.flatten ? r.push.apply(r, L) : r.push({
            scopeParent: s,
            candidates: L
          });
        } else
          l.unshift.apply(l, s.children);
      }
  }
  return r;
}, cr = function(e) {
  return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, je = function(e) {
  if (!e)
    throw new Error("No node provided");
  return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || yb(e)) && !cr(e) ? 0 : e.tabIndex;
}, kb = function(e, t) {
  var n = je(e);
  return n < 0 && t && !cr(e) ? 0 : n;
}, wb = function(e, t) {
  return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, fr = function(e) {
  return e.tagName === "INPUT";
}, _b = function(e) {
  return fr(e) && e.type === "hidden";
}, Tb = function(e) {
  var t = e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(n) {
    return n.tagName === "SUMMARY";
  });
  return t;
}, xb = function(e, t) {
  for (var n = 0; n < e.length; n++)
    if (e[n].checked && e[n].form === t)
      return e[n];
}, Db = function(e) {
  if (!e.name)
    return !0;
  var t = e.form || It(e), n = function(o) {
    return t.querySelectorAll('input[type="radio"][name="' + o + '"]');
  }, r;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    r = n(window.CSS.escape(e.name));
  else
    try {
      r = n(e.name);
    } catch (s) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", s.message), !1;
    }
  var l = xb(r, e.form);
  return !l || l === e;
}, Ib = function(e) {
  return fr(e) && e.type === "radio";
}, Eb = function(e) {
  return Ib(e) && !Db(e);
}, Cb = function(e) {
  var t, n = e && It(e), r = (t = n) === null || t === void 0 ? void 0 : t.host, l = !1;
  if (n && n !== e) {
    var s, o, i;
    for (l = !!((s = r) !== null && s !== void 0 && (o = s.ownerDocument) !== null && o !== void 0 && o.contains(r) || e != null && (i = e.ownerDocument) !== null && i !== void 0 && i.contains(e)); !l && r; ) {
      var d, p, m;
      n = It(r), r = (d = n) === null || d === void 0 ? void 0 : d.host, l = !!((p = r) !== null && p !== void 0 && (m = p.ownerDocument) !== null && m !== void 0 && m.contains(r));
    }
  }
  return l;
}, Ga = function(e) {
  var t = e.getBoundingClientRect(), n = t.width, r = t.height;
  return n === 0 && r === 0;
}, Pb = function(e, t) {
  var n = t.displayCheck, r = t.getShadowRoot;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  var l = Ye.call(e, "details>summary:first-of-type"), s = l ? e.parentElement : e;
  if (Ye.call(s, "details:not([open]) *"))
    return !0;
  if (!n || n === "full" || n === "legacy-full") {
    if (typeof r == "function") {
      for (var o = e; e; ) {
        var i = e.parentElement, d = It(e);
        if (i && !i.shadowRoot && r(i) === !0)
          return Ga(e);
        e.assignedSlot ? e = e.assignedSlot : !i && d !== e.ownerDocument ? e = d.host : e = i;
      }
      e = o;
    }
    if (Cb(e))
      return !e.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return Ga(e);
  return !1;
}, Lb = function(e) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
    for (var t = e.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var n = 0; n < t.children.length; n++) {
          var r = t.children.item(n);
          if (r.tagName === "LEGEND")
            return Ye.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
        }
        return !0;
      }
      t = t.parentElement;
    }
  return !1;
}, Ct = function(e, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  Et(t) || _b(t) || Pb(t, e) || // For a details element with a summary, the summary element gets the focus
  Tb(t) || Lb(t));
}, ea = function(e, t) {
  return !(Eb(t) || je(t) < 0 || !Ct(e, t));
}, Mb = function(e) {
  var t = parseInt(e.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, Bb = function a(e) {
  var t = [], n = [];
  return e.forEach(function(r, l) {
    var s = !!r.scopeParent, o = s ? r.scopeParent : r, i = kb(o, s), d = s ? a(r.candidates) : o;
    i === 0 ? s ? t.push.apply(t, d) : t.push(o) : n.push({
      documentOrder: l,
      tabIndex: i,
      item: r,
      isScope: s,
      content: d
    });
  }), n.sort(wb).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(t);
}, Sb = function(e, t) {
  t = t || {};
  var n;
  return t.getShadowRoot ? n = dr([e], t.includeContainer, {
    filter: ea.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Mb
  }) : n = ur(e, t.includeContainer, ea.bind(null, t)), Bb(n);
}, Ab = function(e, t) {
  t = t || {};
  var n;
  return t.getShadowRoot ? n = dr([e], t.includeContainer, {
    filter: Ct.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : n = ur(e, t.includeContainer, Ct.bind(null, t)), n;
}, Xe = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return Ye.call(e, Dt) === !1 ? !1 : ea(t, e);
}, Fb = /* @__PURE__ */ or.concat("iframe").join(","), Ht = function(e, t) {
  if (t = t || {}, !e)
    throw new Error("No node provided");
  return Ye.call(e, Fb) === !1 ? !1 : Ct(t, e);
};
/*!
* focus-trap 7.6.5
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function ta(a, e) {
  (e == null || e > a.length) && (e = a.length);
  for (var t = 0, n = Array(e); t < e; t++) n[t] = a[t];
  return n;
}
function Ob(a) {
  if (Array.isArray(a)) return ta(a);
}
function Rb(a, e, t) {
  return (e = jb(e)) in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function $b(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function Nb() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xa(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    e && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Ua(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Xa(Object(t), !0).forEach(function(n) {
      Rb(a, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : Xa(Object(t)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return a;
}
function Vb(a) {
  return Ob(a) || $b(a) || Hb(a) || Nb();
}
function qb(a, e) {
  if (typeof a != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(a, e);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(a);
}
function jb(a) {
  var e = qb(a, "string");
  return typeof e == "symbol" ? e : e + "";
}
function Hb(a, e) {
  if (a) {
    if (typeof a == "string") return ta(a, e);
    var t = {}.toString.call(a).slice(8, -1);
    return t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set" ? Array.from(a) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ta(a, e) : void 0;
  }
}
var Za = {
  activateTrap: function(e, t) {
    if (e.length > 0) {
      var n = e[e.length - 1];
      n !== t && n._setPausedState(!0);
    }
    var r = e.indexOf(t);
    r === -1 || e.splice(r, 1), e.push(t);
  },
  deactivateTrap: function(e, t) {
    var n = e.indexOf(t);
    n !== -1 && e.splice(n, 1), e.length > 0 && !e[e.length - 1]._isManuallyPaused() && e[e.length - 1]._setPausedState(!1);
  }
}, Kb = function(e) {
  return e.tagName && e.tagName.toLowerCase() === "input" && typeof e.select == "function";
}, Wb = function(e) {
  return (e == null ? void 0 : e.key) === "Escape" || (e == null ? void 0 : e.key) === "Esc" || (e == null ? void 0 : e.keyCode) === 27;
}, it = function(e) {
  return (e == null ? void 0 : e.key) === "Tab" || (e == null ? void 0 : e.keyCode) === 9;
}, Yb = function(e) {
  return it(e) && !e.shiftKey;
}, Qb = function(e) {
  return it(e) && e.shiftKey;
}, Ja = function(e) {
  return setTimeout(e, 0);
}, st = function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return typeof e == "function" ? e.apply(void 0, n) : e;
}, vt = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, zb = [], Gb = function(e, t) {
  var n = (t == null ? void 0 : t.document) || document, r = (t == null ? void 0 : t.trapStack) || zb, l = Ua({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Yb,
    isKeyBackward: Qb
  }, t), s = {
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
    manuallyPaused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, o, i = function(k, S, I) {
    return k && k[S] !== void 0 ? k[S] : l[I || S];
  }, d = function(k, S) {
    var I = typeof (S == null ? void 0 : S.composedPath) == "function" ? S.composedPath() : void 0;
    return s.containerGroups.findIndex(function(O) {
      var N = O.container, z = O.tabbableNodes;
      return N.contains(k) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (I == null ? void 0 : I.includes(N)) || z.find(function(U) {
        return U === k;
      });
    });
  }, p = function(k) {
    var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, I = S.hasFallback, O = I === void 0 ? !1 : I, N = S.params, z = N === void 0 ? [] : N, U = l[k];
    if (typeof U == "function" && (U = U.apply(void 0, Vb(z))), U === !0 && (U = void 0), !U) {
      if (U === void 0 || U === !1)
        return U;
      throw new Error("`".concat(k, "` was specified but was not a node, or did not return a node"));
    }
    var le = U;
    if (typeof U == "string") {
      try {
        le = n.querySelector(U);
      } catch (ie) {
        throw new Error("`".concat(k, '` appears to be an invalid selector; error="').concat(ie.message, '"'));
      }
      if (!le && !O)
        throw new Error("`".concat(k, "` as selector refers to no known node"));
    }
    return le;
  }, m = function() {
    var k = p("initialFocus", {
      hasFallback: !0
    });
    if (k === !1)
      return !1;
    if (k === void 0 || k && !Ht(k, l.tabbableOptions))
      if (d(n.activeElement) >= 0)
        k = n.activeElement;
      else {
        var S = s.tabbableGroups[0], I = S && S.firstTabbableNode;
        k = I || p("fallbackFocus");
      }
    else k === null && (k = p("fallbackFocus"));
    if (!k)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return k;
  }, v = function() {
    if (s.containerGroups = s.containers.map(function(k) {
      var S = Sb(k, l.tabbableOptions), I = Ab(k, l.tabbableOptions), O = S.length > 0 ? S[0] : void 0, N = S.length > 0 ? S[S.length - 1] : void 0, z = I.find(function(ie) {
        return Xe(ie);
      }), U = I.slice().reverse().find(function(ie) {
        return Xe(ie);
      }), le = !!S.find(function(ie) {
        return je(ie) > 0;
      });
      return {
        container: k,
        tabbableNodes: S,
        focusableNodes: I,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: le,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: O,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: N,
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
        lastDomTabbableNode: U,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(W) {
          var J = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ae = S.indexOf(W);
          return ae < 0 ? J ? I.slice(I.indexOf(W) + 1).find(function(de) {
            return Xe(de);
          }) : I.slice(0, I.indexOf(W)).reverse().find(function(de) {
            return Xe(de);
          }) : S[ae + (J ? 1 : -1)];
        }
      };
    }), s.tabbableGroups = s.containerGroups.filter(function(k) {
      return k.tabbableNodes.length > 0;
    }), s.tabbableGroups.length <= 0 && !p("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (s.containerGroups.find(function(k) {
      return k.posTabIndexesFound;
    }) && s.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, L = function(k) {
    var S = k.activeElement;
    if (S)
      return S.shadowRoot && S.shadowRoot.activeElement !== null ? L(S.shadowRoot) : S;
  }, T = function(k) {
    if (k !== !1 && k !== L(document)) {
      if (!k || !k.focus) {
        T(m());
        return;
      }
      k.focus({
        preventScroll: !!l.preventScroll
      }), s.mostRecentlyFocusedNode = k, Kb(k) && k.select();
    }
  }, B = function(k) {
    var S = p("setReturnFocus", {
      params: [k]
    });
    return S || (S === !1 ? !1 : k);
  }, g = function(k) {
    var S = k.target, I = k.event, O = k.isBackward, N = O === void 0 ? !1 : O;
    S = S || vt(I), v();
    var z = null;
    if (s.tabbableGroups.length > 0) {
      var U = d(S, I), le = U >= 0 ? s.containerGroups[U] : void 0;
      if (U < 0)
        N ? z = s.tabbableGroups[s.tabbableGroups.length - 1].lastTabbableNode : z = s.tabbableGroups[0].firstTabbableNode;
      else if (N) {
        var ie = s.tabbableGroups.findIndex(function(Fe) {
          var Qe = Fe.firstTabbableNode;
          return S === Qe;
        });
        if (ie < 0 && (le.container === S || Ht(S, l.tabbableOptions) && !Xe(S, l.tabbableOptions) && !le.nextTabbableNode(S, !1)) && (ie = U), ie >= 0) {
          var W = ie === 0 ? s.tabbableGroups.length - 1 : ie - 1, J = s.tabbableGroups[W];
          z = je(S) >= 0 ? J.lastTabbableNode : J.lastDomTabbableNode;
        } else it(I) || (z = le.nextTabbableNode(S, !1));
      } else {
        var ae = s.tabbableGroups.findIndex(function(Fe) {
          var Qe = Fe.lastTabbableNode;
          return S === Qe;
        });
        if (ae < 0 && (le.container === S || Ht(S, l.tabbableOptions) && !Xe(S, l.tabbableOptions) && !le.nextTabbableNode(S)) && (ae = U), ae >= 0) {
          var de = ae === s.tabbableGroups.length - 1 ? 0 : ae + 1, fe = s.tabbableGroups[de];
          z = je(S) >= 0 ? fe.firstTabbableNode : fe.firstDomTabbableNode;
        } else it(I) || (z = le.nextTabbableNode(S));
      }
    } else
      z = p("fallbackFocus");
    return z;
  }, _ = function(k) {
    var S = vt(k);
    if (!(d(S, k) >= 0)) {
      if (st(l.clickOutsideDeactivates, k)) {
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
      st(l.allowOutsideClick, k) || k.preventDefault();
    }
  }, E = function(k) {
    var S = vt(k), I = d(S, k) >= 0;
    if (I || S instanceof Document)
      I && (s.mostRecentlyFocusedNode = S);
    else {
      k.stopImmediatePropagation();
      var O, N = !0;
      if (s.mostRecentlyFocusedNode)
        if (je(s.mostRecentlyFocusedNode) > 0) {
          var z = d(s.mostRecentlyFocusedNode), U = s.containerGroups[z].tabbableNodes;
          if (U.length > 0) {
            var le = U.findIndex(function(ie) {
              return ie === s.mostRecentlyFocusedNode;
            });
            le >= 0 && (l.isKeyForward(s.recentNavEvent) ? le + 1 < U.length && (O = U[le + 1], N = !1) : le - 1 >= 0 && (O = U[le - 1], N = !1));
          }
        } else
          s.containerGroups.some(function(ie) {
            return ie.tabbableNodes.some(function(W) {
              return je(W) > 0;
            });
          }) || (N = !1);
      else
        N = !1;
      N && (O = g({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: s.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(s.recentNavEvent)
      })), T(O || s.mostRecentlyFocusedNode || m());
    }
    s.recentNavEvent = void 0;
  }, A = function(k) {
    var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    s.recentNavEvent = k;
    var I = g({
      event: k,
      isBackward: S
    });
    I && (it(k) && k.preventDefault(), T(I));
  }, C = function(k) {
    (l.isKeyForward(k) || l.isKeyBackward(k)) && A(k, l.isKeyBackward(k));
  }, K = function(k) {
    Wb(k) && st(l.escapeDeactivates, k) !== !1 && (k.preventDefault(), o.deactivate());
  }, R = function(k) {
    var S = vt(k);
    d(S, k) >= 0 || st(l.clickOutsideDeactivates, k) || st(l.allowOutsideClick, k) || (k.preventDefault(), k.stopImmediatePropagation());
  }, D = function() {
    if (s.active)
      return Za.activateTrap(r, o), s.delayInitialFocusTimer = l.delayInitialFocus ? Ja(function() {
        T(m());
      }) : T(m()), n.addEventListener("focusin", E, !0), n.addEventListener("mousedown", _, {
        capture: !0,
        passive: !1
      }), n.addEventListener("touchstart", _, {
        capture: !0,
        passive: !1
      }), n.addEventListener("click", R, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", C, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", K), o;
  }, $ = function() {
    if (s.active)
      return n.removeEventListener("focusin", E, !0), n.removeEventListener("mousedown", _, !0), n.removeEventListener("touchstart", _, !0), n.removeEventListener("click", R, !0), n.removeEventListener("keydown", C, !0), n.removeEventListener("keydown", K), o;
  }, x = function(k) {
    var S = k.some(function(I) {
      var O = Array.from(I.removedNodes);
      return O.some(function(N) {
        return N === s.mostRecentlyFocusedNode;
      });
    });
    S && T(m());
  }, M = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(x) : void 0, h = function() {
    M && (M.disconnect(), s.active && !s.paused && s.containers.map(function(k) {
      M.observe(k, {
        subtree: !0,
        childList: !0
      });
    }));
  };
  return o = {
    get active() {
      return s.active;
    },
    get paused() {
      return s.paused;
    },
    activate: function(k) {
      if (s.active)
        return this;
      var S = i(k, "onActivate"), I = i(k, "onPostActivate"), O = i(k, "checkCanFocusTrap");
      O || v(), s.active = !0, s.paused = !1, s.nodeFocusedBeforeActivation = L(n), S == null || S();
      var N = function() {
        O && v(), D(), h(), I == null || I();
      };
      return O ? (O(s.containers.concat()).then(N, N), this) : (N(), this);
    },
    deactivate: function(k) {
      if (!s.active)
        return this;
      var S = Ua({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, k);
      clearTimeout(s.delayInitialFocusTimer), s.delayInitialFocusTimer = void 0, $(), s.active = !1, s.paused = !1, h(), Za.deactivateTrap(r, o);
      var I = i(S, "onDeactivate"), O = i(S, "onPostDeactivate"), N = i(S, "checkCanReturnFocus"), z = i(S, "returnFocus", "returnFocusOnDeactivate");
      I == null || I();
      var U = function() {
        Ja(function() {
          z && T(B(s.nodeFocusedBeforeActivation)), O == null || O();
        });
      };
      return z && N ? (N(B(s.nodeFocusedBeforeActivation)).then(U, U), this) : (U(), this);
    },
    pause: function(k) {
      return s.active ? (s.manuallyPaused = !0, this._setPausedState(!0, k)) : this;
    },
    unpause: function(k) {
      return s.active ? (s.manuallyPaused = !1, r[r.length - 1] !== this ? this : this._setPausedState(!1, k)) : this;
    },
    updateContainerElements: function(k) {
      var S = [].concat(k).filter(Boolean);
      return s.containers = S.map(function(I) {
        return typeof I == "string" ? n.querySelector(I) : I;
      }), s.active && v(), h(), this;
    }
  }, Object.defineProperties(o, {
    _isManuallyPaused: {
      value: function() {
        return s.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(k, S) {
        if (s.paused === k)
          return this;
        if (s.paused = k, k) {
          var I = i(S, "onPause"), O = i(S, "onPostPause");
          I == null || I(), $(), h(), O == null || O();
        } else {
          var N = i(S, "onUnpause"), z = i(S, "onPostUnpause");
          N == null || N(), v(), D(), h(), z == null || z();
        }
        return this;
      }
    }
  }), o.updateContainerElements(e), o;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const Xb = {
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
}, Ub = V({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, Xb),
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
  setup(a, { slots: e, emit: t }) {
    let n;
    const r = G(null), l = w(() => {
      const o = r.value;
      return o && (o instanceof HTMLElement ? o : o.$el);
    });
    function s() {
      return n || (n = Gb(l.value, {
        escapeDeactivates: a.escapeDeactivates,
        allowOutsideClick: a.allowOutsideClick,
        returnFocusOnDeactivate: a.returnFocusOnDeactivate,
        clickOutsideDeactivates: a.clickOutsideDeactivates,
        onActivate: () => {
          t("update:active", !0), t("activate");
        },
        onDeactivate: () => {
          t("update:active", !1), t("deactivate");
        },
        onPostActivate: () => t("postActivate"),
        onPostDeactivate: () => t("postDeactivate"),
        initialFocus: a.initialFocus,
        fallbackFocus: a.fallbackFocus,
        tabbableOptions: a.tabbableOptions,
        delayInitialFocus: a.delayInitialFocus,
        preventScroll: a.preventScroll
      }));
    }
    return ke(() => {
      ve(() => a.active, (o) => {
        o && l.value ? s().activate() : n && (n.deactivate(), (!l.value || l.value.nodeType === Node.COMMENT_NODE) && (n = null));
      }, { immediate: !0, flush: "post" });
    }), Ce(() => {
      n && n.deactivate(), n = null;
    }), {
      activate() {
        s().activate();
      },
      deactivate() {
        n && n.deactivate();
      },
      renderImpl() {
        if (!e.default)
          return null;
        const o = e.default().filter((d) => d.type !== en);
        return !o || !o.length || o.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), o) : tn(o[0], { ref: r });
      }
    };
  }
}), Zb = ["aria-label"], Jb = { class: "fr-btns-group" }, aa = /* @__PURE__ */ V({
  __name: "DsfrCustomHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(a, { emit: e }) {
    const t = e;
    return (n, r) => (u(), f("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      c("ul", Jb, [
        (u(!0), f(Z, null, te(n.links, (l, s) => (u(), f("li", { key: s }, [
          re(Y(fa), X({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var i;
              t("linkClick", o), (i = l.onClick) == null || i.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        F(n.$slots, "default")
      ])
    ], 8, Zb));
  }
}), eg = {
  role: "banner",
  class: "fr-header"
}, tg = { class: "fr-header__body" }, ag = { class: "fr-container width-inherit" }, ng = { class: "fr-header__body-row" }, rg = { class: "fr-header__brand fr-enlarge-link" }, lg = { class: "fr-header__brand-top" }, sg = { class: "fr-header__logo" }, og = {
  key: 0,
  class: "fr-header__operator"
}, ig = ["src", "alt"], ug = {
  key: 1,
  class: "fr-header__navbar"
}, dg = ["aria-label", "title", "data-fr-opened"], cg = { class: "fr-sr-only" }, fg = { class: "fr-sr-only" }, pg = {
  key: 0,
  class: "fr-header__service"
}, vg = { class: "fr-header__service-title" }, mg = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, hg = {
  key: 0,
  class: "fr-header__service-tagline"
}, bg = {
  key: 1,
  class: "fr-header__service"
}, gg = { class: "fr-header__tools" }, yg = {
  key: 0,
  class: "fr-header__tools-links"
}, kg = { class: "fr-header__search fr-modal" }, wg = ["aria-label"], _g = { class: "fr-container" }, Tg = { class: "fr-header__menu-links" }, xg = {
  key: 1,
  class: "flex justify-center items-center"
}, Dg = { class: "fr-header__menu fr-modal" }, Ig = {
  key: 0,
  class: "fr-container"
}, Eg = /* @__PURE__ */ V({
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
  setup(a, { emit: e }) {
    const t = a, n = e, r = ra(), l = ft(t, "languageSelector"), s = G(!1), o = G(!1), i = G(!1), d = () => {
      var g;
      i.value = !1, s.value = !1, o.value = !1, (g = document.getElementById("button-menu")) == null || g.focus();
    }, p = (g) => {
      g.key === "Escape" && d();
    };
    ke(() => {
      document.addEventListener("keydown", p), n("on-mounted");
    }), Ce(() => {
      document.removeEventListener("keydown", p);
    });
    const m = () => {
      i.value = !0, s.value = !0, o.value = !1, setTimeout(() => {
        var g;
        (g = document.getElementById("close-button")) == null || g.focus();
      }, 50);
    }, v = () => {
      i.value = !0, s.value = !1, o.value = !0;
    }, L = d;
    w(() => [t.homeLabel, t.serviceTitle].filter((g) => g).join(" - "));
    const T = w(() => !!r.operator || !!t.operatorImgSrc), B = w(() => !!r.mainnav);
    return $e(gb, () => d), (g, _) => {
      var A, C, K;
      const E = xe("RouterLink");
      return u(), f("header", eg, [
        c("div", tg, [
          c("div", ag, [
            c("div", ng, [
              c("div", rg, [
                c("div", lg, [
                  c("div", sg, [
                    g.serviceTitle ? (u(), j(Y(Ke), {
                      key: 1,
                      "logo-text": g.logoText,
                      "data-testid": "header-logo"
                    }, null, 8, ["logo-text"])) : (u(), j(E, {
                      key: 0,
                      to: g.homeTo,
                      title: `${g.homeLabel} - ${g.serviceTitle}`
                    }, {
                      default: ee(() => [
                        re(Y(Ke), {
                          "logo-text": g.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"]))
                  ]),
                  T.value ? (u(), f("div", og, [
                    F(g.$slots, "operator", {}, () => [
                      g.operatorImgSrc ? (u(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: g.operatorImgSrc,
                        alt: g.operatorImgAlt,
                        style: Ie(g.operatorImgStyle)
                      }, null, 12, ig)) : y("", !0)
                    ])
                  ])) : y("", !0),
                  g.showSearch || B.value || (A = g.quickLinks) != null && A.length ? (u(), f("div", ug, [
                    g.showSearch ? (u(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": g.showSearchLabel,
                      title: g.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: _[0] || (_[0] = ne((R) => v(), ["prevent", "stop"]))
                    }, [
                      c("span", cg, b(g.showSearchLabel), 1)
                    ], 8, dg)) : y("", !0),
                    B.value || (C = g.quickLinks) != null && C.length ? (u(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": m,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "data-testid": "open-menu-btn",
                      onClick: _[1] || (_[1] = ne((R) => m(), ["prevent", "stop"]))
                    }, [
                      c("span", fg, b(g.menuLabel), 1)
                    ])) : y("", !0)
                  ])) : y("", !0)
                ]),
                g.serviceTitle ? (u(), f("div", pg, [
                  re(E, X({
                    to: g.homeTo,
                    title: `${g.homeLabel} - ${g.serviceTitle}`
                  }, g.$attrs), {
                    default: ee(() => [
                      c("p", vg, [
                        H(b(g.serviceTitle) + " ", 1),
                        g.showBeta ? (u(), f("span", mg, " BETA ")) : y("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  g.serviceDescription ? (u(), f("p", hg, b(g.serviceDescription), 1)) : y("", !0)
                ])) : y("", !0),
                !g.serviceTitle && g.showBeta ? (u(), f("div", bg, _[9] || (_[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : y("", !0)
              ]),
              c("div", gg, [
                (K = g.quickLinks) != null && K.length || l.value ? (u(), f("div", yg, [
                  F(g.$slots, "before-quick-links"),
                  s.value ? y("", !0) : (u(), j(aa, {
                    key: 0,
                    links: g.quickLinks,
                    "nav-aria-label": g.quickLinksAriaLabel
                  }, {
                    default: ee(() => [
                      F(g.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  F(g.$slots, "after-quick-links"),
                  l.value ? (u(), j(Y(dt), X({ key: 1 }, l.value, {
                    onSelect: _[2] || (_[2] = (R) => n("language-select", R))
                  }), null, 16)) : y("", !0)
                ])) : y("", !0),
                c("div", kg, [
                  F(g.$slots, "header-search"),
                  g.showSearch ? (u(), j(Y(ct), {
                    key: 0,
                    "searchbar-id": g.searchbarId,
                    label: g.searchLabel,
                    "model-value": g.modelValue,
                    placeholder: g.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": _[3] || (_[3] = (R) => n("update:modelValue", R)),
                    onSearch: _[4] || (_[4] = (R) => n("search", R))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : y("", !0)
                ])
              ])
            ]),
            i.value ? (u(), j(Y(Ub), {
              key: 0,
              active: i.value,
              "focus-trap-options": {
                initialFocus: "#close-button",
                fallbackFocus: "#close-button",
                escapeDeactivates: !0,
                clickOutsideDeactivates: !0,
                returnFocusOnDeactivate: !0
              }
            }, {
              default: ee(() => [
                (g.showSearch || B.value || g.quickLinks && g.quickLinks.length || l.value) && i.value ? (u(), f("div", {
                  key: 0,
                  id: "header-navigation",
                  class: q(["fr-header__menu fr-modal", { "fr-modal--opened": i.value }]),
                  "aria-label": g.menuModalLabel,
                  role: "dialog",
                  "aria-modal": "true"
                }, [
                  c("div", _g, [
                    c("button", {
                      id: "close-button",
                      class: "fr-btn fr-btn--close",
                      "aria-controls": "header-navigation",
                      "data-testid": "close-modal-btn",
                      onClick: _[5] || (_[5] = ne((R) => d(), ["prevent", "stop"]))
                    }, b(g.closeMenuModalLabel), 1),
                    c("div", Tg, [
                      l.value ? (u(), j(Y(dt), X({ key: 0 }, l.value, {
                        onSelect: _[6] || (_[6] = (R) => l.value.currentLanguage = R.codeIso)
                      }), null, 16)) : y("", !0),
                      F(g.$slots, "before-quick-links"),
                      s.value ? (u(), j(aa, {
                        key: 1,
                        role: "navigation",
                        links: g.quickLinks,
                        "nav-aria-label": g.quickLinksAriaLabel,
                        onLinkClick: Y(L)
                      }, {
                        default: ee(() => [
                          F(g.$slots, "header-menu-link")
                        ]),
                        _: 3
                      }, 8, ["links", "nav-aria-label", "onLinkClick"])) : y("", !0),
                      F(g.$slots, "after-quick-links")
                    ]),
                    i.value ? F(g.$slots, "mainnav", {
                      key: 0,
                      hidemodal: d
                    }) : y("", !0),
                    o.value ? (u(), f("div", xg, [
                      re(Y(ct), {
                        "searchbar-id": g.searchbarId,
                        "model-value": g.modelValue,
                        placeholder: g.placeholder,
                        "onUpdate:modelValue": _[7] || (_[7] = (R) => n("update:modelValue", R)),
                        onSearch: _[8] || (_[8] = (R) => n("search", R))
                      }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                    ])) : y("", !0)
                  ])
                ], 10, wg)) : y("", !0)
              ]),
              _: 3
            }, 8, ["active"])) : y("", !0),
            F(g.$slots, "default")
          ])
        ]),
        c("div", Dg, [
          B.value && !i.value ? (u(), f("div", Ig, [
            F(g.$slots, "mainnav", { hidemodal: d })
          ])) : y("", !0)
        ])
      ]);
    };
  }
}), Cg = { class: "fr-table" }, Pg = { class: "fr-table__wrapper" }, Lg = { class: "fr-table__container" }, Mg = { class: "fr-table__content" }, Bg = ["id"], Sg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Ag = {
  key: 0,
  class: "fr-checkbox-group fr-checkbox-group--sm"
}, Fg = ["id", "checked"], Og = ["for"], Rg = ["tabindex", "onClick", "onKeydown"], $g = { key: 0 }, Ng = { key: 1 }, Vg = ["data-row-key"], qg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, jg = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Hg = ["id", "value"], Kg = ["for"], Wg = ["onKeydown"], Yg = { key: 0 }, Qg = ["colspan"], zg = { class: "flex gap-2 items-center" }, Gg = ["selected"], Xg = ["value", "selected"], Ug = { class: "flex ml-1" }, Zg = /* @__PURE__ */ V({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ Re({
    id: { default: () => Be("table") },
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
  emits: /* @__PURE__ */ Re(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { expose: e, emit: t }) {
    const n = a, r = t, l = De(a, "selection"), s = De(a, "rowsPerPage"), o = De(a, "currentPage"), i = w(() => Math.max(Math.ceil(n.rows.length / s.value), 1)), d = w(() => n.pages ?? Array.from({ length: i.value }).map((x, M) => ({
      label: `${M + 1}`,
      title: `Page ${M + 1}`,
      href: `#${M + 1}`
    }))), p = w(() => o.value * s.value), m = w(() => (o.value + 1) * s.value), v = w(() => ["sm", "small"].includes(n.footerSize));
    function L(x, M) {
      const h = T.value;
      return (x[h] ?? x) < (M[h] ?? M) ? -1 : (x[h] ?? x) > (M[h] ?? M) ? 1 : 0;
    }
    const T = De(a, "sortedBy");
    T.value = n.sorted;
    const B = De(a, "sortedDesc");
    function g(x) {
      if (!(!n.sortableRows || Array.isArray(n.sortableRows) && !n.sortableRows.includes(x))) {
        if (T.value === x) {
          if (B.value) {
            T.value = void 0, B.value = !1;
            return;
          }
          B.value = !0;
          return;
        }
        B.value = !1, T.value = x;
      }
    }
    const _ = w(() => {
      const x = T.value ? n.rows.slice().sort(n.sortFn ?? L) : n.rows.slice();
      return B.value && x.reverse(), x;
    }), E = w(() => {
      const x = n.headersRow.map((h) => typeof h != "object" ? h : h.key), M = _.value.map((h) => Array.isArray(h) ? h : x.map((P) => h));
      return n.pagination ? M.slice(p.value, m.value) : M;
    });
    function A(x) {
      x && (l.value = E.value.map((M) => M[0][n.rowKey])), l.value.length = 0;
    }
    const C = G(!1);
    function K() {
      C.value = l.value.length === E.value.length;
    }
    function R() {
      r("update:current-page", 0), C.value = !1, l.value.length = 0;
    }
    function D(x) {
      navigator.clipboard.writeText(x);
    }
    function $() {
      o.value = 0;
    }
    return e({ resetCurrentPage: $ }), (x, M) => (u(), f("div", Cg, [
      c("div", Pg, [
        c("div", Lg, [
          c("div", Mg, [
            c("table", { id: x.id }, [
              c("caption", {
                class: q({ "fr-sr-only": x.noCaption })
              }, b(x.title), 3),
              c("thead", null, [
                c("tr", null, [
                  x.selectableRows ? (u(), f("th", Sg, [
                    x.showToggleAll ? (u(), f("div", Ag, [
                      c("input", {
                        id: `table-select--${x.id}-all`,
                        checked: C.value,
                        type: "checkbox",
                        onInput: M[0] || (M[0] = (h) => A(h.target.checked))
                      }, null, 40, Fg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${x.id}-all`
                      }, " Sélectionner tout ", 8, Og)
                    ])) : y("", !0)
                  ])) : y("", !0),
                  (u(!0), f(Z, null, te(x.headersRow, (h, P) => (u(), f("th", X({
                    key: typeof h == "object" ? h.key : h,
                    scope: "col"
                  }, { ref_for: !0 }, typeof h == "object" && h.headerAttrs, {
                    class: {
                      "text-right": h.align === "right",
                      "text-left": h.align === "left"
                    },
                    tabindex: x.sortableRows ? 0 : void 0,
                    onClick: (k) => g(h.key ?? (Array.isArray(x.rows[0]) ? P : h)),
                    onKeydown: [
                      se((k) => g(h.key ?? h), ["enter"]),
                      se((k) => g(h.key ?? h), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: q({
                        "sortable-header": x.sortableRows === !0 || Array.isArray(x.sortableRows) && x.sortableRows.includes(h.key ?? h),
                        "fr-sr-only": typeof h == "object" ? h.hideLabel : !1,
                        "flex-row-reverse": typeof h == "object" ? h.align === "right" : !1
                      })
                    }, [
                      F(x.$slots, "header", X({ ref_for: !0 }, typeof h == "object" ? h : { key: h, label: h }), () => [
                        H(b(typeof h == "object" ? h.label : h), 1)
                      ], !0),
                      T.value !== (h.key ?? h) && (x.sortableRows === !0 || Array.isArray(x.sortableRows) && x.sortableRows.includes(h.key ?? h)) ? (u(), f("span", $g, [
                        re(Y(we), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : T.value === (h.key ?? h) ? (u(), f("span", Ng, [
                        re(Y(we), {
                          name: B.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : y("", !0)
                    ], 2)
                  ], 16, Rg))), 128))
                ])
              ]),
              c("tbody", null, [
                (u(!0), f(Z, null, te(E.value, (h, P) => (u(), f("tr", {
                  key: `row-${P}`,
                  "data-row-key": P + 1
                }, [
                  x.selectableRows ? (u(), f("th", qg, [
                    c("div", jg, [
                      Me(c("input", {
                        id: `row-select-${x.id}-${P}`,
                        "onUpdate:modelValue": M[1] || (M[1] = (k) => l.value = k),
                        value: h[0][x.rowKey] ?? `row-${P}`,
                        type: "checkbox",
                        onChange: M[2] || (M[2] = (k) => K())
                      }, null, 40, Hg), [
                        [Lt, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${x.id}-${P}`
                      }, " Sélectionner la ligne " + b(P + 1), 9, Kg)
                    ])
                  ])) : y("", !0),
                  (u(!0), f(Z, null, te(h, (k, S) => (u(), f("td", {
                    key: typeof k == "object" ? k[x.rowKey] : k,
                    class: q({
                      "text-right": x.headersRow[S].align === "right",
                      "text-left": x.headersRow[S].align === "left"
                    }),
                    onKeydown: [
                      se(ne((I) => D(typeof k == "object" ? k[x.rowKey] : k), ["ctrl"]), ["c"]),
                      se(ne((I) => D(typeof k == "object" ? k[x.rowKey] : k), ["meta"]), ["c"])
                    ]
                  }, [
                    F(x.$slots, "cell", X({ ref_for: !0 }, {
                      colKey: typeof x.headersRow[S] == "object" ? x.headersRow[S].key : x.headersRow[S],
                      cell: k,
                      idx: P + 1
                    }), () => [
                      H(b(typeof k == "object" ? k[x.rowKey] : k), 1)
                    ], !0)
                  ], 42, Wg))), 128))
                ], 8, Vg))), 128)),
                E.value.length === 0 ? (u(), f("tr", Yg, [
                  c("td", {
                    colspan: x.selectableRows ? x.headersRow.length + 1 : x.headersRow.length
                  }, b(n.noResultLabel), 9, Qg)
                ])) : y("", !0)
              ])
            ], 8, Bg)
          ])
        ])
      ]),
      c("div", {
        class: q(x.bottomActionBarClass)
      }, [
        F(x.$slots, "pagination", {}, () => [
          x.pagination && !x.$slots.pagination ? (u(), f("div", {
            key: 0,
            class: q(["flex justify-between items-center flex-wrap", x.paginationWrapperClass])
          }, [
            x.showNbRows ? (u(), f("p", {
              key: 0,
              class: q(["fr-mb-0 fr-ml-1v", { "fr-text--sm": v.value }])
            }, b(x.rows.length) + " résultat(s)", 3)) : y("", !0),
            c("div", zg, [
              c("label", {
                class: q(["fr-label", { "fr-text--sm": v.value }]),
                for: "pagination-options"
              }, " Résultats par page : ", 2),
              Me(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": M[3] || (M[3] = (h) => s.value = h),
                class: "fr-select",
                onChange: M[4] || (M[4] = (h) => R())
              }, [
                c("option", {
                  value: "",
                  selected: !x.paginationOptions.includes(s.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Gg),
                (u(!0), f(Z, null, te(x.paginationOptions, (h, P) => (u(), f("option", {
                  key: P,
                  value: h,
                  selected: +h === s.value
                }, b(h), 9, Xg))), 128))
              ], 544), [
                [la, s.value]
              ])
            ]),
            c("div", Ug, [
              c("span", {
                class: q(["self-center", { "fr-text--sm": v.value }])
              }, " Page " + b(o.value + 1) + " sur " + b(i.value), 3)
            ]),
            re(Y(ca), {
              "current-page": o.value,
              "onUpdate:currentPage": M[5] || (M[5] = (h) => o.value = h),
              pages: d.value,
              "next-page-title": "Suivant",
              "prev-page-title": "Précédent"
            }, null, 8, ["current-page", "pages"])
          ], 2)) : y("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), Jg = /* @__PURE__ */ Se(Zg, [["__scopeId", "data-v-44bdd1e4"]]), ey = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex", "aria-describedby"], ty = ["for"], ay = {
  key: 0,
  class: "required"
}, ny = {
  key: 0,
  class: "fr-hint-text"
}, ry = ["id"], ly = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrCustomCheckbox",
  props: /* @__PURE__ */ Re({
    id: { default: () => Be("basic", "checkbox") },
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
    Pt((s) => ({
      "1e443861": s.readonlyOpacity
    }));
    const e = a, t = w(() => e.errorMessage || e.validMessage), n = w(() => t.value ? Be("message", "checkbox") : void 0), r = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = De(a, "modelValue");
    return (s, o) => (u(), f("div", {
      class: q(["fr-fieldset__element", { "fr-fieldset__element--inline": s.inline, readonly: s.readonly }])
    }, [
      c("div", {
        class: q(["fr-checkbox-group", {
          "fr-checkbox-group--error": s.errorMessage,
          "fr-checkbox-group--valid": !s.errorMessage && s.validMessage,
          "fr-checkbox-group--sm": s.small
        }])
      }, [
        Me(c("input", X({
          id: s.id,
          "onUpdate:modelValue": o[0] || (o[0] = (i) => l.value = i),
          name: s.name,
          type: "checkbox",
          value: s.value,
          checked: l.value === !0 || Array.isArray(l.value) && l.value.includes(s.value),
          required: s.required
        }, s.$attrs, {
          "data-testid": `input-checkbox-${s.id}`,
          "data-test": `input-checkbox-${s.id}`,
          tabindex: s.readonly ? -1 : void 0,
          "aria-describedby": n.value
        }), null, 16, ey), [
          [Lt, l.value]
        ]),
        c("label", {
          for: s.id,
          class: "fr-label"
        }, [
          F(s.$slots, "label", {}, () => [
            H(b(s.label) + " ", 1),
            F(s.$slots, "required-tip", {}, () => [
              s.required ? (u(), f("span", ay, " *")) : y("", !0)
            ], !0)
          ], !0),
          s.hint ? (u(), f("span", ny, [
            F(s.$slots, "hint", {}, () => [
              H(b(s.hint), 1)
            ], !0)
          ])) : y("", !0)
        ], 8, ty),
        t.value ? (u(), f("div", {
          key: 0,
          id: n.value,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: q(["fr-message--info flex items-center", r.value])
          }, b(t.value), 3)
        ], 8, ry)) : y("", !0)
      ], 2)
    ], 2));
  }
}), sy = /* @__PURE__ */ Se(ly, [["__scopeId", "data-v-2fa06bbe"]]), oy = ["for"], iy = {
  key: 0,
  class: "required"
}, uy = {
  key: 0,
  class: "fr-hint-text"
}, dy = ["id", "name", "disabled", "aria-disabled", "required"], cy = ["selected", "disabled", "hidden"], fy = ["selected", "value", "disabled", "aria-disabled"], py = ["id"], vy = /* @__PURE__ */ V({
  inheritAttrs: !1,
  __name: "DsfrCustomSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => Be("select") },
    name: { default: void 0 },
    description: { default: void 0 },
    hint: { default: void 0 },
    modelValue: { default: void 0 },
    showUnselected: { type: Boolean, default: !1 },
    label: { default: "" },
    options: { default: () => [] },
    successMessage: { default: "" },
    errorMessage: { default: "" },
    defaultUnselectedText: { default: "Sélectionner une option" }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const e = a;
    e.description && console.warn(
      "[DsfrSelect] : La prop `description` est dépréciée. Veuillez utiliser `hint` à la place."
    );
    const t = w(() => e.errorMessage || e.successMessage), n = w(() => e.errorMessage ? "error" : "valid"), r = function(l) {
      if (l === "")
        return null;
      let o = e.options.length > 0 && e.options[0].value !== "" && typeof e.options[0].value == "string" ? 0 : 1, i = e.options.length > o && typeof e.options[o].value == "string";
      return isNaN(l) || i ? l : parseInt(l, 10);
    };
    return (l, s) => (u(), f("div", {
      class: q(["fr-select-group", { [`fr-select-group--${n.value}`]: t.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        F(l.$slots, "label", {}, () => [
          H(b(l.label) + " ", 1),
          F(l.$slots, "required-tip", {}, () => [
            l.required ? (u(), f("span", iy, " *")) : y("", !0)
          ])
        ]),
        l.hint ?? l.description ? (u(), f("span", uy, b(l.hint ?? l.description), 1)) : y("", !0)
      ], 8, oy),
      c("select", X({
        id: l.selectId,
        class: [{ [`fr-select--${n.value}`]: t.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: s[0] || (s[0] = (o) => {
          var i;
          return l.$emit("update:modelValue", r((i = o.target) == null ? void 0 : i.value));
        })
      }), [
        c("option", {
          selected: !l.options.some((o) => typeof o != "object" || o === null ? o === l.modelValue : o.value === l.modelValue),
          value: "",
          disabled: l.showUnselected ? void 0 : !0,
          hidden: l.showUnselected ? void 0 : !0
        }, b(l.defaultUnselectedText), 9, cy),
        (u(!0), f(Z, null, te(l.options, (o, i) => (u(), f("option", {
          key: i,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, b(typeof o == "object" ? o.text : o), 9, fy))), 128))
      ], 16, dy),
      t.value ? (u(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: q(`fr-${n.value}-text`)
      }, b(t.value), 11, py)) : y("", !0)
    ], 2));
  }
}), my = {
  key: 0,
  class: "fr-sr-only"
}, hy = ["id"], by = /* @__PURE__ */ V({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => Be("tooltip") },
    label: { default: "" },
    noOutline: { type: Boolean },
    secondary: { type: Boolean },
    tertiary: { type: Boolean },
    disabled: { type: Boolean },
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
    const e = a, t = G(!1), n = G(!1), r = G(!1), l = G(null), s = G(null), o = G("0px"), i = G("0px"), d = G("0px"), p = G(!1), m = G(0);
    async function v() {
      var ie, W, J, ae, de, fe, Fe, Qe;
      if (typeof document > "u" || typeof window > "u" || !t.value || s.value.matches(":empty"))
        return;
      await new Promise((vr) => setTimeout(vr, 100));
      const M = (ie = l.value) == null ? void 0 : ie.getBoundingClientRect().top, h = (W = l.value) == null ? void 0 : W.offsetHeight, P = (J = l.value) == null ? void 0 : J.offsetWidth, k = (ae = l.value) == null ? void 0 : ae.getBoundingClientRect().left, S = (de = s.value) == null ? void 0 : de.offsetHeight, I = (fe = s.value) == null ? void 0 : fe.offsetWidth, O = (Fe = s.value) == null ? void 0 : Fe.offsetTop, N = (Qe = s.value) == null ? void 0 : Qe.offsetLeft, z = M + h + S >= window.innerHeight;
      p.value = z;
      const U = k + P / 2 + I / 2 >= document.documentElement.offsetWidth, le = k + P / 2 - I / 2 < 0;
      i.value = z ? `${M - O - S + 8}px` : `${M - O + h - 8}px`, m.value = 1, o.value = U ? `${k - N + P - I - 4}px` : le ? `${k - N + 4}px` : `${k - N + P / 2 - I / 2}px`, d.value = U ? `${I / 2 - P / 2 + 4}px` : le ? `${-(I / 2) + P / 2 - 4}px` : "0px";
    }
    ve(t, v, { immediate: !0 }), ke(() => {
      window.addEventListener("scroll", v), window.addEventListener("resize", v);
    }), Ce(() => {
      window.removeEventListener("scroll", v), window.removeEventListener("resize", v);
    });
    const L = w(() => ["sm", "small"].includes(e.size)), T = w(() => ["md", "medium"].includes(e.size)), B = w(() => ["lg", "large"].includes(e.size)), g = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), _ = w(() => `transform: translate(${o.value}, ${i.value}); --arrow-x: ${d.value}; opacity: ${m.value};'`), E = w(() => ({
      "fr-tooltip--shown": t.value,
      "fr-placement--top": p.value,
      "fr-placement--bottom": !p.value
    })), A = (M) => {
      M.key === "Escape" && (t.value = !1, M.preventDefault());
    }, C = (M) => {
      var h;
      (M.target === l.value || (h = l.value) != null && h.contains(M.target)) && (t.value = !0, globalThis.__vueDsfr__lastTooltipShow && (globalThis.__vueDsfr__lastTooltipShow.value = !1));
    }, K = (M) => {
      setTimeout(() => {
        !n.value && !r.value && (t.value = !1);
      }, 50);
    };
    let R, D = !1;
    const $ = () => {
      var M;
      D !== !0 && (R = (M = l.value) == null ? void 0 : M.onclick, D = !0, l.value.onclick = function(h) {
        h.stopImmediatePropagation(), h.preventDefault();
      });
    }, x = () => {
      D !== !1 && (l.value.onclick = R, D = !1, R = null);
    };
    return ke(() => {
      window.addEventListener("scroll", v), l.value.addEventListener("click", () => t.value = !1), document.documentElement.addEventListener("keydown", A), document.documentElement.addEventListener("mouseover", C), e.disabled && $();
    }), Ce(() => {
      window.removeEventListener("scroll", v), document.documentElement.removeEventListener("keydown", A), document.documentElement.removeEventListener("mouseover", C);
    }), ve(() => e.disabled, () => {
      e.disabled ? $() : x();
    }), (M, h) => (u(), f(Z, null, [
      (u(), j(me(M.href !== "" ? "a" : "button"), X({
        id: `button-${M.id}`,
        ref_key: "source",
        ref: l,
        href: M.href !== "" && !M.disabled ? M.href : void 0,
        onClick: h[0] || (h[0] = (P) => {
          M.disabled && (P.preventDefault(), P.stopImmediatePropagation());
        }),
        class: {
          "fr-link": M.isLink && !M.inline,
          "fr-btn": !M.isLink,
          "fr-btn--secondary": M.secondary && !M.tertiary,
          "fr-btn--tertiary": M.tertiary && !M.secondary && !M.noOutline,
          "fr-btn--tertiary-no-outline": M.tertiary && !M.secondary && M.noOutline,
          "fr-btn--sm": L.value,
          "fr-btn--md": T.value,
          "fr-btn--lg": B.value,
          "fr-btn--icon-right": !M.isLink && !M.iconOnly && g.value && M.iconRight,
          "fr-btn--icon-left": !M.isLink && !M.iconOnly && g.value && !M.iconRight,
          "fr-link--icon-right": M.isLink && !M.inline && !M.iconOnly && g.value && M.iconRight,
          "fr-link--icon-left": M.isLink && !M.inline && !M.iconOnly && g.value && !M.iconRight,
          "inline-flex": !g.value,
          reverse: M.iconRight && !g.value,
          "fr-btn--custom-tooltip": M.iconOnly,
          "justify-center": !g.value && M.iconOnly,
          [M.icon]: g.value
        },
        "aria-disabled": M.disabled,
        "aria-labelledby": M.id,
        onMouseenter: h[1] || (h[1] = (P) => r.value = !0),
        onMouseleave: h[2] || (h[2] = (P) => {
          r.value = !1, K();
        }),
        onFocus: h[3] || (h[3] = (P) => C(P)),
        onBlur: h[4] || (h[4] = (P) => K())
      }, M.$attrs), {
        default: ee(() => [
          M.iconOnly ? (u(), f("span", my, b(M.label), 1)) : (u(), f(Z, { key: 1 }, [
            H(b(M.label), 1)
          ], 64))
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-disabled", "aria-labelledby"])),
      c("p", {
        id: M.id,
        ref_key: "tooltip",
        ref: s,
        class: q(["fr-tooltip fr-placement", E.value]),
        style: Ie(_.value),
        role: "tooltip",
        "aria-hidden": "true",
        onMouseenter: h[5] || (h[5] = (P) => n.value = !0),
        onMouseleave: h[6] || (h[6] = (P) => {
          n.value = !1, K();
        })
      }, [
        F(M.$slots, "default", {}, () => [
          H(b(M.content), 1)
        ], !0)
      ], 46, hy)
    ], 64));
  }
}), pr = /* @__PURE__ */ Se(by, [["__scopeId", "data-v-951d76d7"]]), gy = /* @__PURE__ */ V({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (e, t) => (u(), j(pr, X({ "is-link": !1 }, e.$attrs), {
      default: ee(() => [
        F(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), yy = /* @__PURE__ */ V({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (e, t) => (u(), j(pr, X({
      "is-link": !e.asButton
    }, e.$attrs), {
      default: ee(() => [
        F(e.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), ky = ["id", "href"], wy = /* @__PURE__ */ V({
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
  setup(a) {
    const e = a, t = w(() => ["sm", "small"].includes(e.size)), n = w(() => ["md", "medium"].includes(e.size)), r = w(() => ["lg", "large"].includes(e.size)), l = w(() => e.asButton ? "btn" : "link"), s = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-"));
    return (o, i) => (u(), f("a", X({
      id: `link-${o.id}`,
      ref: "source",
      href: o.href !== "" && !o.disabled ? o.href : void 0,
      class: {
        [`fr-${l.value}`]: !o.inline,
        "fr-btn--secondary": o.secondary && !o.tertiary,
        "fr-btn--tertiary": o.tertiary && !o.secondary && !o.noOutline,
        "fr-btn--tertiary-no-outline": o.tertiary && !o.secondary && o.noOutline,
        [`fr-${l.value}--sm`]: t.value,
        [`fr-${l.value}--md`]: n.value,
        [`fr-${l.value}--lg`]: r.value,
        [`fr-${l.value}--icon-right`]: !o.iconOnly && s.value && o.iconRight,
        [`fr-${l.value}--icon-left`]: !o.iconOnly && s.value && !o.iconRight,
        reverse: o.iconRight && !s.value,
        "fr-btn--custom-tooltip": o.iconOnly,
        "justify-center": !s.value && o.iconOnly,
        [o.icon]: s.value
      }
    }, o.$attrs), [
      F(o.$slots, "default", {}, () => [
        H(b(o.label), 1)
      ], !0)
    ], 16, ky));
  }
}), _y = /* @__PURE__ */ Se(wy, [["__scopeId", "data-v-edcd30c2"]]), Ty = (a, e) => a.matches ? a.matches(e) : a.msMatchesSelector ? a.msMatchesSelector(e) : a.webkitMatchesSelector ? a.webkitMatchesSelector(e) : null, xy = (a, e) => {
  let t = a;
  for (; t && t.nodeType === 1; ) {
    if (Ty(t, e))
      return t;
    t = t.parentNode;
  }
  return null;
}, Dy = (a, e) => a.closest ? a.closest(e) : xy(a, e), Iy = (a) => !!(a && typeof a.then == "function");
class Ey {
  constructor({
    search: e,
    autoSelect: t = !1,
    setValue: n = () => {
    },
    setAttribute: r = () => {
    },
    onUpdate: l = () => {
    },
    onSubmit: s = () => {
    },
    onShow: o = () => {
    },
    autocorrect: i = !1,
    onHide: d = () => {
    },
    onLoading: p = () => {
    },
    onLoaded: m = () => {
    },
    submitOnEnter: v = !1
  } = {}) {
    Q(this, "value", "");
    Q(this, "searchCounter", 0);
    Q(this, "results", []);
    Q(this, "selectedIndex", -1);
    Q(this, "selectedResult", null);
    Q(this, "destroy", () => {
      this.search = null, this.setValue = null, this.setAttribute = null, this.onUpdate = null, this.onSubmit = null, this.autocorrect = null, this.onShow = null, this.onHide = null, this.onLoading = null, this.onLoaded = null;
    });
    Q(this, "handleInput", (e) => {
      const { value: t } = e.target;
      this.updateResults(t), this.value = t;
    });
    Q(this, "handleKeyDown", (e) => {
      const { key: t } = e;
      switch (t) {
        case "Up":
        // IE/Edge
        case "Down":
        // IE/Edge
        case "ArrowUp":
        case "ArrowDown": {
          const n = t === "ArrowUp" || t === "Up" ? this.selectedIndex - 1 : this.selectedIndex + 1;
          e.preventDefault(), this.handleArrows(n);
          break;
        }
        case "Tab": {
          this.selectResult();
          break;
        }
        case "Enter": {
          const n = e.target.getAttribute("aria-activedescendant").length > 0;
          this.selectedResult = this.results[this.selectedIndex] || this.selectedResult, this.selectResult(), this.submitOnEnter ? this.selectedResult && this.onSubmit(this.selectedResult) : n ? e.preventDefault() : (this.selectedResult && this.onSubmit(this.selectedResult), this.selectedResult = null);
          break;
        }
        case "Esc":
        // IE/Edge
        case "Escape": {
          this.hideResults(), this.setValue();
          break;
        }
        default:
          return;
      }
    });
    Q(this, "handleFocus", (e) => {
      const { value: t } = e.target;
      this.updateResults(t), this.value = t;
    });
    Q(this, "handleBlur", () => {
      this.hideResults();
    });
    // The mousedown event fires before the blur event. Calling preventDefault() when
    // the results list is clicked will prevent it from taking focus, firing the
    // blur event on the input element, and closing the results list before click fires.
    Q(this, "handleResultMouseDown", (e) => {
      e.preventDefault();
    });
    Q(this, "handleResultClick", (e) => {
      const { target: t } = e, n = Dy(t, "[data-result-index]");
      if (n) {
        this.selectedIndex = parseInt(n.dataset.resultIndex, 10);
        const r = this.results[this.selectedIndex];
        this.selectResult(), this.onSubmit(r);
      }
    });
    Q(this, "handleArrows", (e) => {
      const t = this.results.length;
      this.selectedIndex = (e % t + t) % t, this.onUpdate(this.results, this.selectedIndex);
    });
    Q(this, "selectResult", () => {
      const e = this.results[this.selectedIndex];
      e && this.setValue(e), this.hideResults();
    });
    Q(this, "updateResults", (e) => {
      const t = ++this.searchCounter;
      this.onLoading(), this.search(e).then((n) => {
        if (t === this.searchCounter) {
          if (this.results = n, this.onLoaded(), this.results.length === 0) {
            this.hideResults();
            return;
          }
          this.selectedIndex = this.autoSelect ? 0 : -1, this.onUpdate(this.results, this.selectedIndex), this.showResults();
        }
      });
    });
    Q(this, "showResults", () => {
      this.setAttribute("aria-expanded", !0), this.onShow();
    });
    Q(this, "hideResults", () => {
      this.selectedIndex = -1, this.results = [], this.setAttribute("aria-expanded", !1), this.setAttribute("aria-activedescendant", ""), this.onUpdate(this.results, this.selectedIndex), this.onHide();
    });
    // Make sure selected result isn't scrolled out of view
    Q(this, "checkSelectedResultVisible", (e) => {
      const t = e.querySelector(
        `[data-result-index="${this.selectedIndex}"]`
      );
      if (!t)
        return;
      const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
      r.top < n.top ? e.scrollTop -= n.top - r.top : r.bottom > n.bottom && (e.scrollTop += r.bottom - n.bottom);
    });
    this.search = Iy(e) ? e : (L) => Promise.resolve(e(L)), this.autoSelect = t, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = s, this.autocorrect = i, this.onShow = o, this.onHide = d, this.onLoading = p, this.onLoaded = m, this.submitOnEnter = v;
  }
}
const Cy = (a, e) => {
  const t = a.getBoundingClientRect(), n = e.getBoundingClientRect();
  return /* 1 */ t.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - t.bottom < t.top && /* 3 */
  window.pageYOffset + t.top - n.height > 0 ? "above" : "below";
}, Py = (a, e, t) => {
  let n;
  return function() {
    const l = this, s = arguments, o = function() {
      n = null, a.apply(l, s);
    };
    clearTimeout(n), n = setTimeout(o, e);
  };
}, Ly = (a) => {
  if (a != null && a.length) {
    const e = a.startsWith("#");
    return {
      attribute: e ? "aria-labelledby" : "aria-label",
      content: e ? a.substring(1) : a
    };
  }
}, My = {
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
    const a = new Ey({
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
    return this.debounceTime > 0 && (a.handleInput = Py(a.handleInput, this.debounceTime)), {
      core: a,
      value: this.defaultValue,
      resultListId: `${this.baseClass}-result-list-${na()}`,
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
        style: e,
        ...t
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
        ...t
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
      const a = this.position === "below" ? "top" : "bottom", e = Ly(this.resultListLabel);
      return {
        id: this.resultListId,
        class: `${this.baseClass}-result-list`,
        role: "listbox",
        [e == null ? void 0 : e.attribute]: e == null ? void 0 : e.content,
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
      return this.results.map((a, e) => ({
        id: `${this.baseClass}-result-${e}`,
        class: `${this.baseClass}-result`,
        "data-result-index": e,
        role: "option",
        ...this.selectedIndex === e ? { "aria-selected": "true" } : {}
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Cy(
      this.$refs.input,
      this.$refs.resultList
    )), this.core.checkSelectedResultVisible(this.$refs.resultList));
  },
  methods: {
    setValue(a) {
      this.value = a ? this.getResultValue(a) : "";
    },
    handleUpdate(a, e) {
      this.results = a, this.selectedIndex = e, this.$emit("update", a, e);
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
function By(a, e, t, n, r, l) {
  return u(), f("div", X({ ref: "root" }, {
    class: a.$attrs.class,
    ...a.$attrs.style ? { style: a.$attrs.style } : {}
  }), [
    F(a.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      c("div", Ee(Mt(l.rootProps)), [
        c("input", X({ ref: "input" }, l.inputProps, {
          onInput: e[0] || (e[0] = (...s) => l.handleInput && l.handleInput(...s)),
          onKeydown: e[1] || (e[1] = (...s) => r.core.handleKeyDown && r.core.handleKeyDown(...s)),
          onFocus: e[2] || (e[2] = (...s) => r.core.handleFocus && r.core.handleFocus(...s)),
          onBlur: e[3] || (e[3] = (...s) => r.core.handleBlur && r.core.handleBlur(...s))
        }), null, 16),
        c("ul", X({ ref: "resultList" }, l.resultListProps, Dr(l.resultListListeners, !0)), [
          (u(!0), f(Z, null, te(r.results, (s, o) => F(a.$slots, "result", {
            result: s,
            props: l.resultProps[o]
          }, () => [
            (u(), f("li", X({
              key: l.resultProps[o].id
            }, { ref_for: !0 }, l.resultProps[o]), b(t.getResultValue(s)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Sy = /* @__PURE__ */ Se(My, [["render", By]]);
var Ay = {
  install: function(a, e) {
    a.use(uv), a.component("RouterLink", fh), a.component("DsfrFacets", Sh), a.component("DsfrSelectMultiple", ob), a.component("DsfrMenu", $h), a.component("DsfrMenuLink", jh), a.component("DsfrHeaderMenu", bb), a.component("DsfrCustomHeader", Eg), a.component("DsfrCustomHeaderMenuLinks", aa), a.component("DsfrCustomDataTable", Jg), a.component("DsfrCustomCheckbox", sy), a.component("DsfrCustomSelect", vy), a.component("DsfrButtonTooltip", gy), a.component("DsfrLinkTooltip", yy), a.component("DsfrLink", _y), a.component("autocomplete", Sy);
  },
  methods: uh,
  utils: dh
};
window && (window.DSFR = Ay);
export {
  Ay as default
};
//# sourceMappingURL=dsfr.es.js.map
