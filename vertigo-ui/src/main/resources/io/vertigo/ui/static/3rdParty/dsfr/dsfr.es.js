var hr = Object.defineProperty;
var br = (a, e, t) => e in a ? hr(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var Y = (a, e, t) => br(a, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as q, h as ba, ref as z, computed as w, onMounted as ke, watch as ve, onUnmounted as Ce, Comment as Ja, cloneVNode as en, createElementBlock as f, openBlock as u, normalizeClass as V, createBlock as j, resolveDynamicComponent as me, mergeProps as G, withModifiers as ae, withCtx as ee, createCommentVNode as k, createTextVNode as H, toDisplayString as h, createElementVNode as c, unref as Q, Fragment as U, renderList as te, createVNode as le, withKeys as re, renderSlot as O, mergeModels as $e, useCssVars as Et, useModel as De, withDirectives as Be, vModelCheckbox as Lt, useId as na, Teleport as gr, provide as Re, reactive as yr, normalizeStyle as Ie, normalizeProps as Pe, guardReactiveProps as Mt, inject as Ue, toRef as ft, useTemplateRef as kr, resolveComponent as xe, hasInjectionContext as wr, useSlots as ra, nextTick as tn, useAttrs as _r, vModelSelect as la, Transition as Tr, vShow as xr, onBeforeUnmount as Dr, vModelText as ga, toHandlers as Ir } from "vue";
const an = /^[a-z0-9]+(-[a-z0-9]+)*$/, Bt = (a, e, t, n = "") => {
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
((e && a.prefix === "" || a.prefix) && a.name) : !1, nn = Object.freeze(
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
  ...nn,
  ...gt
}), Kt = Object.freeze({
  ...St,
  body: "",
  hidden: !1
});
function Pr(a, e) {
  const t = {};
  !a.hFlip != !e.hFlip && (t.hFlip = !0), !a.vFlip != !e.vFlip && (t.vFlip = !0);
  const n = ((a.rotate || 0) + (e.rotate || 0)) % 4;
  return n && (t.rotate = n), t;
}
function ya(a, e) {
  const t = Pr(a, e);
  for (const n in Kt)
    n in gt ? n in a && !(n in t) && (t[n] = gt[n]) : n in e ? t[n] = e[n] : n in a && (t[n] = a[n]);
  return t;
}
function Cr(a, e) {
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
function Er(a, e, t) {
  const n = a.icons, r = a.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function s(o) {
    l = ya(
      n[o] || r[o],
      l
    );
  }
  return s(e), t.forEach(s), ya(a, l);
}
function rn(a, e) {
  const t = [];
  if (typeof a != "object" || typeof a.icons != "object")
    return t;
  a.not_found instanceof Array && a.not_found.forEach((r) => {
    e(r, null), t.push(r);
  });
  const n = Cr(a);
  for (const r in n) {
    const l = n[r];
    l && (e(r, Er(a, r, l)), t.push(r));
  }
  return t;
}
const Lr = {
  provider: "",
  aliases: {},
  not_found: {},
  ...nn
};
function Nt(a, e) {
  for (const t in e)
    if (t in a && typeof a[t] != typeof e[t])
      return !1;
  return !0;
}
function ln(a) {
  if (typeof a != "object" || a === null)
    return null;
  const e = a;
  if (typeof e.prefix != "string" || !a.icons || typeof a.icons != "object" || !Nt(a, Lr))
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
const ka = /* @__PURE__ */ Object.create(null);
function Mr(a, e) {
  return {
    provider: a,
    prefix: e,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Ze(a, e) {
  const t = ka[a] || (ka[a] = /* @__PURE__ */ Object.create(null));
  return t[e] || (t[e] = Mr(a, e));
}
function sn(a, e) {
  return ln(e) ? rn(e, (t, n) => {
    n ? a.icons[t] = n : a.missing.add(t);
  }) : [];
}
function Br(a, e, t) {
  try {
    if (typeof t.body == "string")
      return a.icons[e] = { ...t }, !0;
  } catch {
  }
  return !1;
}
let ut = !1;
function on(a) {
  return typeof a == "boolean" && (ut = a), ut;
}
function Sr(a) {
  const e = typeof a == "string" ? Bt(a, !0, ut) : a;
  if (e) {
    const t = Ze(e.provider, e.prefix), n = e.name;
    return t.icons[n] || (t.missing.has(n) ? null : void 0);
  }
}
function Ar(a, e) {
  const t = Bt(a, !0, ut);
  if (!t)
    return !1;
  const n = Ze(t.provider, t.prefix);
  return e ? Br(n, t.name, e) : (n.missing.add(t.name), !0);
}
function Fr(a, e) {
  if (typeof a != "object")
    return !1;
  if (typeof e != "string" && (e = a.provider || ""), ut && !e && !a.prefix) {
    let r = !1;
    return ln(a) && (a.prefix = "", rn(a, (l, s) => {
      Ar(l, s) && (r = !0);
    })), r;
  }
  const t = a.prefix;
  if (!mt({
    prefix: t,
    name: "a"
  }))
    return !1;
  const n = Ze(e, t);
  return !!sn(n, a);
}
const un = Object.freeze({
  width: null,
  height: null
}), dn = Object.freeze({
  // Dimensions
  ...un,
  // Transformations
  ...gt
}), Or = /(-?[0-9.]*[0-9]+[0-9.]*)/g, $r = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function wa(a, e, t) {
  if (e === 1)
    return a;
  if (t = t || 100, typeof a == "number")
    return Math.ceil(a * e * t) / t;
  if (typeof a != "string")
    return a;
  const n = a.split(Or);
  if (n === null || !n.length)
    return a;
  const r = [];
  let l = n.shift(), s = $r.test(l);
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
function Nr(a, e) {
  return a ? "<defs>" + a + "</defs>" + e : e;
}
function Vr(a, e, t) {
  const n = Rr(a);
  return Nr(n.defs, e + n.content + t);
}
const qr = (a) => a === "unset" || a === "undefined" || a === "none";
function jr(a, e) {
  const t = {
    ...St,
    ...a
  }, n = {
    ...dn,
    ...e
  }, r = {
    left: t.left,
    top: t.top,
    width: t.width,
    height: t.height
  };
  let l = t.body;
  [t, n].forEach((S) => {
    const y = [], x = S.hFlip, E = S.vFlip;
    let A = S.rotate;
    x ? E ? A += 2 : (y.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), y.push("scale(-1 1)"), r.top = r.left = 0) : E && (y.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), y.push("scale(1 -1)"), r.top = r.left = 0);
    let D;
    switch (A < 0 && (A -= Math.floor(A / 4) * 4), A = A % 4, A) {
      case 1:
        D = r.height / 2 + r.top, y.unshift(
          "rotate(90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
      case 2:
        y.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        D = r.width / 2 + r.left, y.unshift(
          "rotate(-90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
    }
    A % 2 === 1 && (r.left !== r.top && (D = r.left, r.left = r.top, r.top = D), r.width !== r.height && (D = r.width, r.width = r.height, r.height = D)), y.length && (l = Vr(
      l,
      '<g transform="' + y.join(" ") + '">',
      "</g>"
    ));
  });
  const s = n.width, o = n.height, i = r.width, d = r.height;
  let p, m;
  s === null ? (m = o === null ? "1em" : o === "auto" ? d : o, p = wa(m, i / d)) : (p = s === "auto" ? i : s, m = o === null ? wa(p, d / i) : o === "auto" ? d : o);
  const v = {}, L = (S, y) => {
    qr(y) || (v[S] = y.toString());
  };
  L("width", p), L("height", m);
  const b = [r.left, r.top, i, d];
  return v.viewBox = b.join(" "), {
    attributes: v,
    viewBox: b,
    body: l
  };
}
const Hr = /\sid="(\S+)"/g, Kr = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Wr = 0;
function Yr(a, e = Kr) {
  const t = [];
  let n;
  for (; n = Hr.exec(a); )
    t.push(n[1]);
  if (!t.length)
    return a;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return t.forEach((l) => {
    const s = typeof e == "function" ? e(l) : e + (Wr++).toString(), o = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    a = a.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + o + ')([")]|\\.[a-z])', "g"),
      "$1" + s + r + "$3"
    );
  }), a = a.replace(new RegExp(r, "g"), ""), a;
}
const Wt = /* @__PURE__ */ Object.create(null);
function Qr(a, e) {
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
function zr(a, e) {
  const t = sa(e);
  return t === null ? !1 : (oa[a] = t, !0);
}
function ia(a) {
  return oa[a];
}
const Gr = () => {
  let a;
  try {
    if (a = fetch, typeof a == "function")
      return a;
  } catch {
  }
};
let _a = Gr();
function Xr(a, e) {
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
function Ur(a) {
  return a === 404;
}
const Zr = (a, e, t) => {
  const n = [], r = Xr(a, e), l = "icons";
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
function Jr(a) {
  if (typeof a == "string") {
    const e = ia(a);
    if (e)
      return e.path;
  }
  return "/";
}
const el = (a, e, t) => {
  if (!_a) {
    t("abort", 424);
    return;
  }
  let n = Jr(e.provider);
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
  _a(a + n).then((l) => {
    const s = l.status;
    if (s !== 200) {
      setTimeout(() => {
        t(Ur(s) ? "abort" : "next", s);
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
}, tl = {
  prepare: Zr,
  send: el
};
function al(a) {
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
function cn(a, e) {
  a.forEach((t) => {
    const n = t.loaderCallbacks;
    n && (t.loaderCallbacks = n.filter((r) => r.id !== e));
  });
}
function nl(a) {
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
      }), s.pending.length !== o && (t || cn([a], l.id), l.callback(
        s.loaded.slice(0),
        s.missing.slice(0),
        s.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let rl = 0;
function ll(a, e, t) {
  const n = rl++, r = cn.bind(null, t, n);
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
function sl(a, e = !0, t = !1) {
  const n = [];
  return a.forEach((r) => {
    const l = typeof r == "string" ? Bt(r, e, t) : r;
    l && n.push(l);
  }), n;
}
var ol = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function il(a, e, t, n) {
  const r = a.resources.length, l = a.random ? Math.floor(Math.random() * r) : a.index;
  let s;
  if (a.random) {
    let R = a.resources.slice(0);
    for (s = []; R.length > 1; ) {
      const C = Math.floor(Math.random() * R.length);
      s.push(R[C]), R = R.slice(0, C).concat(R.slice(C + 1));
    }
    s = s.concat(R);
  } else
    s = a.resources.slice(l).concat(a.resources.slice(0, l));
  const o = Date.now();
  let i = "pending", d = 0, p, m = null, v = [], L = [];
  typeof n == "function" && L.push(n);
  function b() {
    m && (clearTimeout(m), m = null);
  }
  function S() {
    i === "pending" && (i = "aborted"), b(), v.forEach((R) => {
      R.status === "pending" && (R.status = "aborted");
    }), v = [];
  }
  function y(R, C) {
    C && (L = []), typeof R == "function" && L.push(R);
  }
  function x() {
    return {
      startTime: o,
      payload: e,
      status: i,
      queriesSent: d,
      queriesPending: v.length,
      subscribe: y,
      abort: S
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
  function D(R, C, N) {
    const I = C !== "success";
    switch (v = v.filter((M) => M !== R), i) {
      case "pending":
        break;
      case "failed":
        if (I || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (C === "abort") {
      p = N, E();
      return;
    }
    if (I) {
      p = N, v.length || (s.length ? K() : E());
      return;
    }
    if (b(), A(), !a.random) {
      const M = a.resources.indexOf(R.resource);
      M !== -1 && M !== a.index && (a.index = M);
    }
    i = "completed", L.forEach((M) => {
      M(N);
    });
  }
  function K() {
    if (i !== "pending")
      return;
    b();
    const R = s.shift();
    if (R === void 0) {
      if (v.length) {
        m = setTimeout(() => {
          b(), i === "pending" && (A(), E());
        }, a.timeout);
        return;
      }
      E();
      return;
    }
    const C = {
      status: "pending",
      resource: R,
      callback: (N, I) => {
        D(C, N, I);
      }
    };
    v.push(C), d++, m = setTimeout(K, a.rotate), t(R, e, C.callback);
  }
  return setTimeout(K), x;
}
function fn(a) {
  const e = {
    ...ol,
    ...a
  };
  let t = [];
  function n() {
    t = t.filter((o) => o().status === "pending");
  }
  function r(o, i, d) {
    const p = il(
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
function Ta() {
}
const Vt = /* @__PURE__ */ Object.create(null);
function ul(a) {
  if (!Vt[a]) {
    const e = ia(a);
    if (!e)
      return;
    const t = fn(e), n = {
      config: e,
      redundancy: t
    };
    Vt[a] = n;
  }
  return Vt[a];
}
function dl(a, e, t) {
  let n, r;
  if (typeof a == "string") {
    const l = Yt(a);
    if (!l)
      return t(void 0, 424), Ta;
    r = l.send;
    const s = ul(a);
    s && (n = s.redundancy);
  } else {
    const l = sa(a);
    if (l) {
      n = fn(l);
      const s = a.resources ? a.resources[0] : "", o = Yt(s);
      o && (r = o.send);
    }
  }
  return !n || !r ? (t(void 0, 424), Ta) : n.query(e, r, t)().abort;
}
function xa() {
}
function cl(a) {
  a.iconsLoaderFlag || (a.iconsLoaderFlag = !0, setTimeout(() => {
    a.iconsLoaderFlag = !1, nl(a);
  }));
}
function fl(a) {
  const e = [], t = [];
  return a.forEach((n) => {
    (n.match(an) ? e : t).push(n);
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
      if (!sn(a, t).length) {
        n();
        return;
      }
    } catch (r) {
      console.error(r);
    }
  n(), cl(a);
}
function Da(a, e) {
  a instanceof Promise ? a.then((t) => {
    e(t);
  }).catch(() => {
    e(null);
  }) : e(a);
}
function pl(a, e) {
  a.iconsToLoad ? a.iconsToLoad = a.iconsToLoad.concat(e).sort() : a.iconsToLoad = e, a.iconsQueueFlag || (a.iconsQueueFlag = !0, setTimeout(() => {
    a.iconsQueueFlag = !1;
    const { provider: t, prefix: n } = a, r = a.iconsToLoad;
    if (delete a.iconsToLoad, !r || !r.length)
      return;
    const l = a.loadIcon;
    if (a.loadIcons && (r.length > 1 || !l)) {
      Da(
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
        Da(m, (v) => {
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
    const { valid: s, invalid: o } = fl(r);
    if (o.length && at(a, o, null), !s.length)
      return;
    const i = n.match(an) ? Yt(t) : null;
    if (!i) {
      at(a, s, null);
      return;
    }
    i.prepare(t, n, s).forEach((p) => {
      dl(t, p, (m) => {
        at(a, p.icons, m);
      });
    });
  }));
}
const vl = (a, e) => {
  const t = sl(a, !0, on()), n = al(t);
  if (!n.pending.length) {
    let i = !0;
    return e && setTimeout(() => {
      i && e(
        n.loaded,
        n.missing,
        n.pending,
        xa
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
    d.length && pl(i, d);
  }), e ? ll(e, n, l) : xa;
};
function ml(a, e) {
  const t = {
    ...a
  };
  for (const n in e) {
    const r = e[n], l = typeof r;
    n in un ? (r === null || r && (l === "string" || l === "number")) && (t[n] = r) : l === typeof t[n] && (t[n] = n === "rotate" ? r % 4 : r);
  }
  return t;
}
const hl = /[\s,]+/;
function bl(a, e) {
  e.split(hl).forEach((t) => {
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
function gl(a, e = 0) {
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
function yl(a, e) {
  let t = a.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in e)
    t += " " + n + '="' + e[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + t + ">" + a + "</svg>";
}
function kl(a) {
  return a.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function wl(a) {
  return "data:image/svg+xml," + kl(a);
}
function _l(a) {
  return 'url("' + wl(a) + '")';
}
const Ia = {
  ...dn,
  inline: !1
}, Tl = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, xl = {
  display: "inline-block"
}, Qt = {
  backgroundColor: "currentColor"
}, pn = {
  backgroundColor: "transparent"
}, Pa = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Ca = {
  webkitMask: Qt,
  mask: Qt,
  background: pn
};
for (const a in Ca) {
  const e = Ca[a];
  for (const t in Pa)
    e[a + t] = Pa[t];
}
const bt = {};
["horizontal", "vertical"].forEach((a) => {
  const e = a.slice(0, 1) + "Flip";
  bt[a + "-flip"] = e, bt[a.slice(0, 1) + "-flip"] = e, bt[a + "Flip"] = e;
});
function Ea(a) {
  return a + (a.match(/^[-0-9.]+$/) ? "px" : "");
}
const La = (a, e) => {
  const t = ml(Ia, e), n = { ...Tl }, r = e.mode || "svg", l = {}, s = e.style, o = typeof s == "object" && !(s instanceof Array) ? s : {};
  for (let S in e) {
    const y = e[S];
    if (y !== void 0)
      switch (S) {
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
          t[S] = y === !0 || y === "true" || y === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof y == "string" && bl(t, y);
          break;
        // Color: override style
        case "color":
          l.color = y;
          break;
        // Rotation as string
        case "rotate":
          typeof y == "string" ? t[S] = gl(y) : typeof y == "number" && (t[S] = y);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          y !== !0 && y !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const x = bt[S];
          x ? (y === !0 || y === "true" || y === 1) && (t[x] = !0) : Ia[S] === void 0 && (n[S] = y);
        }
      }
  }
  const i = jr(a, t), d = i.attributes;
  if (t.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...o
    }, Object.assign(n, d);
    let S = 0, y = e.id;
    return typeof y == "string" && (y = y.replace(/-/g, "_")), n.innerHTML = Yr(i.body, y ? () => y + "ID" + S++ : "iconifyVue"), ba("svg", n);
  }
  const { body: p, width: m, height: v } = a, L = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), b = yl(p, {
    ...d,
    width: m + "",
    height: v + ""
  });
  return n.style = {
    ...l,
    "--svg": _l(b),
    width: Ea(d.width),
    height: Ea(d.height),
    ...xl,
    ...L ? Qt : pn,
    ...o
  }, ba("span", n);
};
on(!0);
Qr("", tl);
if (typeof document < "u" && typeof window < "u") {
  const a = window;
  if (a.IconifyPreload !== void 0) {
    const e = a.IconifyPreload, t = "Invalid IconifyPreload syntax.";
    typeof e == "object" && e !== null && (e instanceof Array ? e : [e]).forEach((n) => {
      try {
        // Check if item is an object and not null/array
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !Fr(n)) && console.error(t);
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
          zr(t, r) || console.error(n);
        } catch {
          console.error(n);
        }
      }
  }
}
const Dl = {
  ...St,
  body: ""
}, Il = q({
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
      let r = Sr(n);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== a) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: a,
          abort: vl([n], () => {
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
      return La(Dl, a);
    let t = a;
    return e.classes && (t = {
      ...a,
      class: (typeof a.class == "string" ? a.class + " " : "") + e.classes.join(" ")
    }), La({
      ...St,
      ...e.data
    }, t);
  }
}), ua = Symbol("accordions"), da = Symbol("header"), At = Symbol("tabs"), Ae = () => {
  const a = z(), e = z(!1), t = z(!1), n = () => {
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
}, oe = (a = "", e = "") => (a ? `${a}-` : "") + na() + (e ? `-${e}` : ""), Pl = { class: "fr-accordion" }, Cl = ["aria-expanded", "aria-controls"], El = ["id"], Ll = /* @__PURE__ */ q({
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
    } = Ae(), o = z(), i = Ue(ua), { isActive: d, expand: p } = (i == null ? void 0 : i(ft(() => e.title))) ?? { isActive: o, expand: () => o.value = !o.value };
    return ke(() => {
      d.value && l(!0);
    }), ve(d, (m, v) => {
      m !== v && l(m);
    }), (m, v) => (u(), f("section", Pl, [
      (u(), j(me(m.titleTag), { class: "fr-accordion__title" }, {
        default: ee(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": Q(d),
            "aria-controls": m.id,
            type: "button",
            onClick: v[0] || (v[0] = (L) => Q(p)())
          }, [
            O(m.$slots, "title", {}, () => [
              H(h(m.title), 1)
            ])
          ], 8, Cl)
        ]),
        _: 3
      })),
      c("div", {
        id: m.id,
        ref_key: "collapse",
        ref: t,
        class: V(["fr-collapse", {
          "fr-collapse--expanded": Q(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": Q(n)
        }]),
        onTransitionend: v[1] || (v[1] = (L) => Q(s)(Q(d), !1))
      }, [
        O(m.$slots, "default")
      ], 42, El)
    ]));
  }
}), Ml = { class: "fr-accordions-group" }, Bl = /* @__PURE__ */ q({
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
    }), l = z(/* @__PURE__ */ new Map()), s = z(0);
    return Re(ua, (o) => {
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
    }), (o, i) => (u(), f("div", Ml, [
      O(o.$slots, "default")
    ]));
  }
}), Sl = ["id", "role"], Al = ["id"], Fl = ["aria-describedby", "title"], Ol = { class: "fr-sr-only" }, $l = /* @__PURE__ */ q({
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
    return (d, p) => d.closed ? k("", !0) : (u(), f("div", {
      key: 0,
      id: d.id,
      class: V(["fr-alert", l.value]),
      role: d.alert ? "alert" : void 0
    }, [
      d.small ? k("", !0) : (u(), j(me(d.titleTag), {
        key: 0,
        id: s.value,
        class: "fr-alert__title"
      }, {
        default: ee(() => [
          H(h(d.title), 1)
        ]),
        _: 1
      }, 8, ["id"])),
      d.description ? (u(), f("p", {
        key: 1,
        id: o.value
      }, h(d.description), 9, Al)) : O(d.$slots, "default", { key: 2 }, void 0, !0),
      d.closeable ? (u(), f("button", {
        key: 3,
        "aria-describedby": i.value,
        title: d.closeButtonLabel,
        class: "fr-btn fr-btn--close",
        onClick: r
      }, [
        c("span", Ol, h(d.closeButtonLabel), 1)
      ], 8, Fl)) : k("", !0)
    ], 10, Sl));
  }
}), we = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, Rl = /* @__PURE__ */ we($l, [["__scopeId", "data-v-97587b27"]]), Nl = /* @__PURE__ */ q({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(a) {
    return (e, t) => (u(), f("a", {
      class: V(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${e.position}`]),
      href: "#top"
    }, h(e.label), 3));
  }
}), Vl = ["title"], vn = /* @__PURE__ */ q({
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
      class: V(["fr-badge", {
        [`fr-badge--${e.type}`]: e.type,
        "fr-badge--no-icon": e.noIcon,
        "fr-badge--sm": e.small
      }]),
      title: e.ellipsis ? e.label : void 0
    }, [
      c("span", {
        class: V(e.ellipsis ? "fr-ellipsis" : "")
      }, h(e.label), 3)
    ], 10, Vl));
  }
}), ql = ["aria-label"], jl = ["aria-expanded", "aria-controls"], Hl = ["id"], Kl = { class: "fr-breadcrumb__list" }, Wl = ["aria-current"], Yl = /* @__PURE__ */ q({
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
    } = Ae(), s = z(!1);
    return ve(s, (o, i) => {
      o !== i && r(o);
    }), (o, i) => {
      const d = xe("RouterLink");
      return u(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": o.navigationLabel
      }, [
        s.value ? k("", !0) : (u(), f("button", {
          key: 0,
          class: "fr-breadcrumb__button",
          "aria-expanded": s.value,
          "aria-controls": o.breadcrumbId,
          onClick: i[0] || (i[0] = (p) => s.value = !s.value)
        }, h(o.showBreadcrumbLabel), 9, jl)),
        c("div", {
          id: o.breadcrumbId,
          ref_key: "collapse",
          ref: e,
          class: V(["fr-collapse", {
            "fr-collapse--expanded": Q(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Q(t)
          }]),
          onTransitionend: i[1] || (i[1] = (p) => Q(l)(s.value))
        }, [
          c("ol", Kl, [
            (u(!0), f(U, null, te(o.links, (p, m) => (u(), f("li", {
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
                  H(h(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : k("", !0),
              p.to ? k("", !0) : (u(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === o.links.length - 1 ? "page" : void 0
              }, h(p.text), 9, Wl))
            ]))), 128))
          ])
        ], 42, Hl)
      ], 8, ql);
    };
  }
}), Ql = /* @__PURE__ */ q({
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
    Et((i) => ({
      "177d0d84": o.value
    }));
    const e = a, t = z(null), n = w(() => `${+e.scale * 1.2}rem`), r = w(() => e.flip === "both" ? "horizontal,vertical" : e.flip);
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
      L.innerHTML = e.title, await tn(), v || (m = ((p = t.value) == null ? void 0 : p.$el).firstChild) == null || m.before(L);
    }
    ke(l);
    const s = w(() => {
      var i;
      return (i = e.name) != null && i.startsWith("vi-") ? e.name.replace(/vi-(.*)/, "vscode-icons:$1") : e.name ?? "";
    }), o = w(() => e.color ?? e.fill ?? "inherit");
    return (i, d) => (u(), j(Q(Il), {
      ref_key: "icon",
      ref: t,
      icon: s.value,
      style: Ie({ fontSize: n.value, verticalAlign: i.verticalAlign, display: i.display }),
      "aria-label": i.label,
      class: V(["vicon", {
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
}), Te = /* @__PURE__ */ we(Ql, [["__scopeId", "data-v-73a1cd7e"]]), zl = ["title", "disabled", "aria-disabled"], Gl = { key: 1 }, Xl = /* @__PURE__ */ q({
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
    const t = a, n = w(() => ["sm", "small"].includes(t.size)), r = w(() => ["md", "medium"].includes(t.size)), l = w(() => ["lg", "large"].includes(t.size)), s = z(null);
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
      class: V(["fr-btn", {
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
      p.icon && !o.value ? (u(), j(Te, Pe(G({ key: 0 }, d.value)), null, 16)) : k("", !0),
      p.iconOnly ? k("", !0) : (u(), f("span", Gl, [
        H(h(p.label) + " ", 1),
        O(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, zl));
  }
}), He = /* @__PURE__ */ we(Xl, [["__scopeId", "data-v-118397f5"]]), Ft = /* @__PURE__ */ q({
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
    const e = a, t = z(null), n = w(() => ["sm", "small"].includes(e.size)), r = w(() => ["md", "medium"].includes(e.size)), l = w(() => ["lg", "large"].includes(e.size)), s = w(() => ["always", "", !0].includes(e.inlineLayoutWhen)), o = w(() => ["sm", "small"].includes(e.inlineLayoutWhen)), i = w(() => ["md", "medium"].includes(e.inlineLayoutWhen)), d = w(() => ["lg", "large"].includes(e.inlineLayoutWhen)), p = w(() => e.align === "center"), m = w(() => e.align === "right"), v = z("auto"), L = w(() => `--equisized-width: ${v.value};`), b = async () => {
      var S;
      let y = 0;
      await new Promise((x) => setTimeout(x, 100)), (S = t.value) == null || S.querySelectorAll(".fr-btn").forEach((x) => {
        const E = x, A = E.offsetWidth, D = window.getComputedStyle(E), K = +D.marginLeft.replace("px", ""), R = +D.marginRight.replace("px", "");
        E.style.width = "var(--equisized-width)";
        const C = A + K + R;
        C > y && (y = C);
      }), v.value = `${y}px`;
    };
    return ke(async () => {
      !t.value || !e.equisized || await b();
    }), (S, y) => (u(), f("ul", {
      ref_key: "buttonsEl",
      ref: t,
      style: Ie(L.value),
      class: V(["fr-btns-group", {
        "fr-btns-group--equisized": S.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": s.value || o.value,
        "fr-btns-group--inline-md": s.value || i.value,
        "fr-btns-group--inline-lg": s.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": S.iconRight,
        "fr-btns-group--inline-reverse": S.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (u(!0), f(U, null, te(S.buttons, ({ onClick: x, ...E }, A) => (u(), f("li", { key: A }, [
        le(He, G({ ref_for: !0 }, E, { onClick: x }), null, 16, ["onClick"])
      ]))), 128)),
      O(S.$slots, "default")
    ], 6));
  }
}), Ul = {
  key: 2,
  class: "fr-callout__text"
}, Zl = {
  key: 4,
  class: "fr-callout__text"
}, Jl = /* @__PURE__ */ q({
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
      class: V(["fr-callout", { [String(r.icon)]: t.value }])
    }, [
      r.icon && n.value ? (u(), j(Te, Pe(G({ key: 0 }, n.value)), null, 16)) : k("", !0),
      r.title ? (u(), j(me(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: ee(() => [
          H(h(r.title), 1)
        ]),
        _: 1
      })) : k("", !0),
      r.content ? (u(), f("p", Ul, h(r.content), 1)) : k("", !0),
      r.button ? (u(), j(He, Pe(G({ key: 3 }, r.button)), null, 16)) : k("", !0),
      r.$slots.default && !r.content ? (u(), f("div", Zl, [
        O(r.$slots, "default", {}, void 0, !0)
      ])) : O(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), es = /* @__PURE__ */ we(Jl, [["__scopeId", "data-v-c59b3cec"]]), zt = /* @__PURE__ */ q({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const e = a, t = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = w(() => t.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (r, l) => (u(), f("p", {
      class: V(["fr-card__detail", t.value ? { [String(r.icon)]: t.value } : {}])
    }, [
      r.icon && !t.value ? (u(), j(Te, Pe(G({ key: 0 }, n.value)), null, 16)) : k("", !0),
      O(r.$slots, "default")
    ], 2));
  }
}), ts = { class: "fr-card__body" }, as = { class: "fr-card__content" }, ns = ["href"], rs = { class: "fr-card__desc" }, ls = {
  key: 0,
  class: "fr-card__start"
}, ss = {
  key: 1,
  class: "fr-card__end"
}, os = {
  key: 0,
  class: "fr-card__footer"
}, is = {
  key: 1,
  class: "fr-links-group"
}, us = ["href"], ds = {
  key: 0,
  class: "fr-card__header"
}, cs = {
  key: 0,
  class: "fr-card__img"
}, fs = ["src", "alt"], ps = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, vs = /* @__PURE__ */ q({
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
    const t = a, n = w(() => ["sm", "small"].includes(t.size)), r = w(() => ["lg", "large"].includes(t.size)), l = w(() => ["sm", "small"].includes(t.imgRatio)), s = w(() => ["lg", "large"].includes(t.imgRatio)), o = w(() => typeof t.link == "string" && t.link.startsWith("http")), i = z(null);
    return e({ goToTargetLink: () => {
      var d;
      ((d = i.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const m = xe("RouterLink");
      return u(), f("div", {
        class: V(["fr-card", {
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
        c("div", ts, [
          c("div", as, [
            (u(), j(me(d.titleTag), { class: "fr-card__title" }, {
              default: ee(() => [
                o.value ? (u(), f("a", G({
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, d.titleLinkAttrs), h(d.title), 17, ns)) : d.link ? (u(), j(m, G({
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link"
                }, d.titleLinkAttrs, {
                  onClick: p[0] || (p[0] = ae(() => {
                  }, ["stop"]))
                }), {
                  default: ee(() => [
                    H(h(d.title), 1)
                  ]),
                  _: 1
                }, 16, ["to"])) : (u(), f(U, { key: 2 }, [
                  H(h(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", rs, h(d.description), 1),
            d.$slots["start-details"] || d.detail ? (u(), f("div", ls, [
              O(d.$slots, "start-details"),
              d.detail ? (u(), j(zt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: ee(() => [
                  H(h(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : k("", !0)
            ])) : k("", !0),
            d.$slots["end-details"] || d.endDetail ? (u(), f("div", ss, [
              O(d.$slots, "end-details"),
              d.endDetail ? (u(), j(zt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: ee(() => [
                  H(h(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : k("", !0)
            ])) : k("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (u(), f("div", os, [
            d.buttons.length ? (u(), j(Ft, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : k("", !0),
            d.linksGroup.length ? (u(), f("ul", is, [
              (u(!0), f(U, null, te(d.linksGroup, (v, L) => (u(), f("li", {
                key: `card-link-${L}`
              }, [
                v.to ? (u(), j(m, {
                  key: 0,
                  to: v.to
                }, {
                  default: ee(() => [
                    H(h(v.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (u(), f("a", {
                  key: 1,
                  href: v.link || v.href,
                  class: V(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": r.value
                  }])
                }, h(v.label), 11, us))
              ]))), 128))
            ])) : k("", !0)
          ])) : k("", !0)
        ]),
        d.imgSrc || d.badges.length ? (u(), f("div", ds, [
          d.imgSrc ? (u(), f("div", cs, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, fs)
          ])) : k("", !0),
          d.badges.length ? (u(), f("ul", ps, [
            (u(!0), f(U, null, te(d.badges, (v, L) => (u(), f("li", { key: L }, [
              le(vn, G({ ref_for: !0 }, v), null, 16)
            ]))), 128))
          ])) : k("", !0)
        ])) : k("", !0)
      ], 2);
    };
  }
}), ms = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex", "aria-describedby"], hs = ["for"], bs = {
  key: 0,
  class: "required"
}, gs = {
  key: 0,
  class: "fr-hint-text"
}, ys = ["id"], ks = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ $e({
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
    Et((s) => ({
      "111a1563": s.readonlyOpacity
    }));
    const e = a, t = w(() => e.errorMessage || e.validMessage), n = w(() => t.value ? oe("message", "checkbox") : void 0), r = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = De(a, "modelValue");
    return (s, o) => (u(), f("div", {
      class: V(["fr-fieldset__element", { "fr-fieldset__element--inline": s.inline, readonly: s.readonly }])
    }, [
      c("div", {
        class: V(["fr-checkbox-group", {
          "fr-checkbox-group--error": s.errorMessage,
          "fr-checkbox-group--valid": !s.errorMessage && s.validMessage,
          "fr-checkbox-group--sm": s.small
        }])
      }, [
        Be(c("input", G({
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
        }), null, 16, ms), [
          [Lt, l.value]
        ]),
        c("label", {
          for: s.id,
          class: "fr-label"
        }, [
          O(s.$slots, "label", {}, () => [
            H(h(s.label) + " ", 1),
            O(s.$slots, "required-tip", {}, () => [
              s.required ? (u(), f("span", bs, " *")) : k("", !0)
            ], !0)
          ], !0),
          s.hint ? (u(), f("span", gs, h(s.hint), 1)) : k("", !0)
        ], 8, hs),
        t.value ? (u(), f("div", {
          key: 0,
          id: n.value,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: V(["fr-message--info flex items-center", r.value])
          }, h(t.value), 3)
        ], 8, ys)) : k("", !0)
      ], 2)
    ], 2));
  }
}), Ot = /* @__PURE__ */ we(ks, [["__scopeId", "data-v-922852d8"]]), ws = { class: "fr-form-group" }, _s = ["disabled", "aria-labelledby", "aria-invalid", "role"], Ts = ["id"], xs = {
  key: 0,
  class: "required"
}, Ds = ["id"], Is = /* @__PURE__ */ q({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ $e({
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
    return (s, o) => (u(), f("div", ws, [
      c("fieldset", {
        class: V(["fr-fieldset", {
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
          O(s.$slots, "legend", {}, () => [
            H(h(s.legend) + " ", 1),
            O(s.$slots, "required-tip", {}, () => [
              s.required ? (u(), f("span", xs, " *")) : k("", !0)
            ])
          ])
        ], 8, Ts),
        O(s.$slots, "default", {}, () => [
          (u(!0), f(U, null, te(s.options, (i) => (u(), j(Ot, {
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
            class: V(["fr-message--info flex items-center", n.value])
          }, [
            c("span", null, h(t.value), 1)
          ], 2)
        ], 8, Ds)) : k("", !0)
      ], 10, _s)
    ]));
  }
}), Ps = { class: "fr-consent-banner__content" }, Cs = { class: "fr-text--sm" }, Es = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, Ls = /* @__PURE__ */ q({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(a) {
    const e = a, t = w(() => typeof e.url == "string" && e.url.startsWith("http")), n = w(() => e.url ? t.value ? "a" : "RouterLink" : "a"), r = w(() => ({ [t.value ? "href" : "to"]: e.url }));
    return (l, s) => (u(), f(U, null, [
      c("div", Ps, [
        c("p", Cs, [
          O(l.$slots, "default", {}, () => [
            s[4] || (s[4] = H(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (u(), j(me(n.value), G(r.value, { "data-testid": "link" }), {
              default: ee(() => s[3] || (s[3] = [
                H(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            s[5] || (s[5] = H(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", Es, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: s[0] || (s[0] = ae((o) => l.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: s[1] || (s[1] = ae((o) => l.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: s[2] || (s[2] = ae((o) => l.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), Ms = ["aria-label"], Bs = { class: "fr-pagination__list" }, Ss = ["href", "title", "aria-disabled"], As = { class: "fr-sr-only" }, Fs = ["href", "title", "aria-disabled"], Os = ["href", "title", "aria-current", "onClick"], $s = { key: 0 }, Rs = { key: 1 }, Ns = ["href", "title", "disabled", "aria-disabled"], Vs = ["href", "title", "disabled", "aria-disabled"], qs = { class: "fr-sr-only" }, js = /* @__PURE__ */ q({
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
    const t = a, n = e, r = w(() => Math.min(t.pages.length - 1 - t.truncLimit, Math.max(t.currentPage - (t.truncLimit - t.truncLimit % 2) / 2, 0))), l = w(() => Math.min(t.pages.length - 1, r.value + t.truncLimit)), s = w(() => t.pages.length > t.truncLimit ? t.pages.slice(r.value, l.value + 1) : t.pages), o = (b) => n("update:current-page", b), i = (b) => o(b), d = () => i(0), p = () => i(Math.max(0, t.currentPage - 1)), m = () => i(Math.min(t.pages.length - 1, t.currentPage + 1)), v = () => i(t.pages.length - 1), L = (b) => t.pages.indexOf(b) === t.currentPage;
    return (b, S) => {
      var y, x, E, A;
      return u(), f("nav", {
        role: "navigation",
        class: "fr-pagination",
        "aria-label": b.ariaLabel
      }, [
        c("ul", Bs, [
          c("li", null, [
            c("a", {
              href: (y = b.pages[0]) == null ? void 0 : y.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: b.firstPageTitle,
              "aria-disabled": b.currentPage === 0 ? !0 : void 0,
              onClick: S[0] || (S[0] = ae((D) => d(), ["prevent"]))
            }, [
              c("span", As, h(b.firstPageTitle), 1)
            ], 8, Ss)
          ]),
          c("li", null, [
            c("a", {
              href: (x = b.pages[Math.max(b.currentPage - 1, 0)]) == null ? void 0 : x.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: b.prevPageTitle,
              "aria-disabled": b.currentPage === 0 ? !0 : void 0,
              onClick: S[1] || (S[1] = ae((D) => p(), ["prevent"]))
            }, h(b.prevPageTitle), 9, Fs)
          ]),
          (u(!0), f(U, null, te(s.value, (D, K) => (u(), f("li", { key: K }, [
            c("a", {
              href: D == null ? void 0 : D.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: D.title,
              "aria-current": L(D) ? "page" : void 0,
              onClick: ae((R) => i(b.pages.indexOf(D)), ["prevent"])
            }, [
              s.value.indexOf(D) === 0 && r.value > 0 ? (u(), f("span", $s, "...")) : k("", !0),
              H(" " + h(D.label) + " ", 1),
              s.value.indexOf(D) === s.value.length - 1 && l.value < b.pages.length - 1 ? (u(), f("span", Rs, "...")) : k("", !0)
            ], 8, Os)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (E = b.pages[Math.min(b.currentPage + 1, b.pages.length - 1)]) == null ? void 0 : E.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: b.nextPageTitle,
              disabled: b.currentPage === b.pages.length - 1 ? !0 : void 0,
              "aria-disabled": b.currentPage === b.pages.length - 1 ? !0 : void 0,
              onClick: S[2] || (S[2] = ae((D) => m(), ["prevent"]))
            }, h(b.nextPageTitle), 9, Ns)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (A = b.pages.at(-1)) == null ? void 0 : A.href,
              title: b.lastPageTitle,
              disabled: b.currentPage === b.pages.length - 1 ? !0 : void 0,
              "aria-disabled": b.currentPage === b.pages.length - 1 ? !0 : void 0,
              onClick: S[3] || (S[3] = ae((D) => v(), ["prevent"]))
            }, [
              c("span", qs, h(b.lastPageTitle), 1)
            ], 8, Vs)
          ])
        ])
      ], 8, Ms);
    };
  }
}), mn = /* @__PURE__ */ we(js, [["__scopeId", "data-v-5b44f494"]]), Hs = { class: "fr-table" }, Ks = { class: "fr-table__wrapper" }, Ws = { class: "fr-table__container" }, Ys = { class: "fr-table__content" }, Qs = ["id"], zs = { key: 0 }, Gs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Xs = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Us = ["id", "checked"], Zs = ["for"], Js = ["tabindex", "onClick", "onKeydown"], eo = { key: 0 }, to = { key: 1 }, ao = ["data-row-key"], no = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, ro = { class: "fr-checkbox-group fr-checkbox-group--sm" }, lo = ["id", "value"], so = ["for"], oo = ["onKeydown"], io = { class: "flex gap-2 items-center" }, uo = ["for"], co = ["id"], fo = ["selected"], po = ["value", "selected"], vo = { class: "flex ml-1" }, mo = { class: "self-center" }, ho = /* @__PURE__ */ q({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ $e({
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
  emits: /* @__PURE__ */ $e(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: e }) {
    const t = a, n = e, r = De(a, "selection"), l = De(a, "rowsPerPage"), s = De(a, "currentPage"), o = w(() => Math.ceil(t.rows.length / l.value)), i = w(() => t.pages ?? Array.from({ length: o.value }).map((C, N) => ({ label: `${N + 1}`, title: `Page ${N + 1}`, href: `#${N + 1}` }))), d = w(() => s.value * l.value), p = w(() => (s.value + 1) * l.value), m = De(a, "sortedBy"), v = De(a, "sortedDesc");
    function L(C, N) {
      const I = m.value ?? t.sorted;
      return (C[I] ?? C) < (N[I] ?? N) ? -1 : (C[I] ?? C) > (N[I] ?? N) ? 1 : 0;
    }
    function b(C) {
      if (!(!t.sortableRows || Array.isArray(t.sortableRows) && !t.sortableRows.includes(C))) {
        if (m.value === C) {
          if (v.value) {
            m.value = void 0, v.value = !1;
            return;
          }
          v.value = !0;
          return;
        }
        v.value = !1, m.value = C;
      }
    }
    const S = w(() => {
      const C = m.value ? t.rows.slice().sort(t.sortFn ?? L) : t.rows.slice();
      return v.value && C.reverse(), C;
    }), y = w(() => t.headersRow.map((C) => typeof C != "object" ? C : C.key)), x = w(() => y.value.findIndex((C) => C === t.rowKey)), E = w(() => {
      const C = S.value.map((N) => Array.isArray(N) ? N : y.value.map((I) => typeof N != "object" ? N : N[I] ?? N));
      return t.pagination ? C.slice(d.value, p.value) : C;
    });
    function A(C) {
      if (C) {
        const N = t.headersRow.findIndex((I) => I.key ?? I);
        r.value = E.value.map((I) => I[N]);
      } else
        r.value.length = 0;
    }
    const D = w(() => r.value.length === E.value.length);
    function K() {
      n("update:current-page", 0), r.value.length = 0;
    }
    function R(C) {
      navigator.clipboard.writeText(C);
    }
    return (C, N) => (u(), f("div", Hs, [
      c("div", Ks, [
        c("div", Ws, [
          c("div", Ys, [
            c("table", { id: C.id }, [
              C.noCaption ? k("", !0) : (u(), f("caption", zs, h(C.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  C.selectableRows ? (u(), f("th", Gs, [
                    c("div", Xs, [
                      c("input", {
                        id: `table-select--${C.id}-all`,
                        checked: D.value,
                        type: "checkbox",
                        onInput: N[0] || (N[0] = (I) => A(I.target.checked))
                      }, null, 40, Us),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${C.id}-all`
                      }, " Sélectionner tout ", 8, Zs)
                    ])
                  ])) : k("", !0),
                  (u(!0), f(U, null, te(C.headersRow, (I, M) => (u(), f("th", G({
                    key: typeof I == "object" ? I.key : I,
                    scope: "col",
                    ref_for: !0
                  }, typeof I == "object" && I.headerAttrs, {
                    tabindex: C.sortableRows ? 0 : void 0,
                    onClick: (T) => b(I.key ?? (Array.isArray(C.rows[0]) ? M : I)),
                    onKeydown: [
                      re((T) => b(I.key ?? I), ["enter"]),
                      re((T) => b(I.key ?? I), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: V({ "sortable-header": C.sortableRows === !0 || Array.isArray(C.sortableRows) && C.sortableRows.includes(I.key ?? I) })
                    }, [
                      O(C.$slots, "header", G({ ref_for: !0 }, typeof I == "object" ? I : { key: I, label: I }), () => [
                        H(h(typeof I == "object" ? I.label : I), 1)
                      ], !0),
                      m.value !== (I.key ?? I) && (C.sortableRows === !0 || Array.isArray(C.sortableRows) && C.sortableRows.includes(I.key ?? I)) ? (u(), f("span", eo, [
                        le(Te, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : m.value === (I.key ?? I) ? (u(), f("span", to, [
                        le(Te, {
                          name: v.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : k("", !0)
                    ], 2)
                  ], 16, Js))), 128))
                ])
              ]),
              c("tbody", null, [
                (u(!0), f(U, null, te(E.value, (I, M) => (u(), f("tr", {
                  key: `row-${M}`,
                  "data-row-key": M + 1
                }, [
                  C.selectableRows ? (u(), f("th", no, [
                    c("div", ro, [
                      Be(c("input", {
                        id: `row-select-${C.id}-${M}`,
                        "onUpdate:modelValue": N[1] || (N[1] = (T) => r.value = T),
                        value: I[x.value] ?? `row-${M}`,
                        type: "checkbox"
                      }, null, 8, lo), [
                        [Lt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${C.id}-${M}`
                      }, " Sélectionner la ligne " + h(M + 1), 9, so)
                    ])
                  ])) : k("", !0),
                  (u(!0), f(U, null, te(I, (T, g) => (u(), f("td", {
                    key: typeof T == "object" ? T[C.rowKey] : T,
                    tabindex: "0",
                    onKeydown: [
                      re(ae((_) => R(typeof T == "object" ? T[C.rowKey] : T), ["ctrl"]), ["c"]),
                      re(ae((_) => R(typeof T == "object" ? T[C.rowKey] : T), ["meta"]), ["c"])
                    ]
                  }, [
                    O(C.$slots, "cell", G({ ref_for: !0 }, {
                      colKey: typeof C.headersRow[g] == "object" ? C.headersRow[g].key : C.headersRow[g],
                      cell: T
                    }), () => [
                      H(h(typeof T == "object" ? T[C.rowKey] : T), 1)
                    ], !0)
                  ], 40, oo))), 128))
                ], 8, ao))), 128))
              ])
            ], 8, Qs)
          ])
        ])
      ]),
      c("div", {
        class: V(C.bottomActionBarClass)
      }, [
        O(C.$slots, "pagination", {}, () => [
          C.pagination && !C.$slots.pagination ? (u(), f("div", {
            key: 0,
            class: V(["flex justify-between items-center", C.paginationWrapperClass])
          }, [
            c("div", io, [
              c("label", {
                class: "fr-label",
                for: `${C.id}-pagination-options`
              }, " Résultats par page : ", 8, uo),
              Be(c("select", {
                id: `${C.id}-pagination-options`,
                "onUpdate:modelValue": N[2] || (N[2] = (I) => l.value = I),
                class: "fr-select",
                onChange: N[3] || (N[3] = (I) => K())
              }, [
                c("option", {
                  value: "",
                  selected: !C.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, fo),
                (u(!0), f(U, null, te(C.paginationOptions, (I, M) => (u(), f("option", {
                  key: M,
                  value: I,
                  selected: +I === l.value
                }, h(I), 9, po))), 128))
              ], 40, co), [
                [la, l.value]
              ])
            ]),
            c("div", vo, [
              c("span", mo, "Page " + h(s.value + 1) + " sur " + h(o.value), 1)
            ]),
            le(mn, {
              "current-page": s.value,
              "onUpdate:currentPage": [
                N[4] || (N[4] = (I) => s.value = I),
                N[5] || (N[5] = (I) => r.value.length = 0)
              ],
              pages: i.value,
              "aria-label": C.paginationAriaLabel
            }, null, 8, ["current-page", "pages", "aria-label"])
          ], 2)) : k("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), bo = /* @__PURE__ */ we(ho, [["__scopeId", "data-v-3d58686c"]]), go = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", yo = { class: "fr-container flex" }, ko = { class: "half" }, wo = { class: "fr-h1" }, _o = { class: "flex fr-my-md-3w" }, To = { class: "fr-h6" }, xo = /* @__PURE__ */ q({
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
      return u(), f("div", yo, [
        c("div", ko, [
          c("h1", wo, h(e.title), 1),
          c("span", _o, h(e.subtitle), 1),
          c("p", To, h(e.description), 1),
          c("p", null, h(e.help), 1),
          (n = e.buttons) != null && n.length ? (u(), j(Ft, {
            key: 0,
            buttons: e.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : k("", !0),
          O(e.$slots, "default", {}, void 0, !0)
        ]),
        t[0] || (t[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: go
          })
        ], -1))
      ]);
    };
  }
}), Do = /* @__PURE__ */ we(xo, [["__scopeId", "data-v-0f6cf5b4"]]), Io = { class: "fr-fieldset" }, Po = ["id"], Co = {
  key: 1,
  class: "fr-fieldset__element"
}, Eo = { class: "fr-fieldset__element" }, hn = /* @__PURE__ */ q({
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
      return u(), f("fieldset", Io, [
        e.legend || (r = (n = e.$slots).legend) != null && r.call(n) ? (u(), f("legend", {
          key: 0,
          id: e.legendId,
          class: V(["fr-fieldset__legend", e.legendClass])
        }, [
          H(h(e.legend) + " ", 1),
          O(e.$slots, "legend")
        ], 10, Po)) : k("", !0),
        e.hint || (s = (l = e.$slots).hint) != null && s.call(l) ? (u(), f("div", Co, [
          c("span", {
            class: V(["fr-hint-text", e.hintClass])
          }, [
            H(h(e.hint) + " ", 1),
            O(e.$slots, "hint")
          ], 2)
        ])) : k("", !0),
        c("div", Eo, [
          O(e.$slots, "default")
        ])
      ]);
    };
  }
}), Lo = ["href", "download"], Mo = { class: "fr-link__detail" }, bn = /* @__PURE__ */ q({
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
      H(h(e.title) + " ", 1),
      c("span", Mo, h(e.format) + " – " + h(e.size), 1)
    ], 8, Lo));
  }
}), Bo = { class: "fr-downloads-group fr-downloads-group--bordered" }, So = {
  key: 0,
  class: "fr-downloads-group__title"
}, Ao = /* @__PURE__ */ q({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (e, t) => (u(), f("div", Bo, [
      e.title ? (u(), f("h4", So, h(e.title), 1)) : k("", !0),
      c("ul", null, [
        (u(!0), f(U, null, te(e.files, (n, r) => (u(), f("li", { key: r }, [
          le(bn, {
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
}), Fo = ["for"], Oo = {
  key: 0,
  class: "required"
}, $o = {
  key: 1,
  class: "fr-hint-text"
}, Ro = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], No = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Vo = ["id"], qo = /* @__PURE__ */ q({
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
      class: V(["fr-upload-group", {
        "fr-upload-group--error": s.error,
        "fr-upload-group--valid": s.validMessage,
        "fr-upload-group--disabled": s.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: s.id
      }, [
        H(h(s.label) + " ", 1),
        "required" in s.$attrs && s.$attrs.required !== !1 ? (u(), f("span", Oo, " *")) : k("", !0),
        s.hint ? (u(), f("span", $o, h(s.hint), 1)) : k("", !0)
      ], 8, Fo),
      c("input", G({
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
      s.error || s.validMessage ? (u(), f("div", No, [
        s.error ? (u(), f("p", {
          key: 0,
          id: `${s.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, h(s.error ?? s.validMessage), 9, Vo)) : k("", !0)
      ])) : k("", !0)
    ], 2));
  }
}), jo = { class: "fr-follow__newsletter" }, Ho = { class: "fr-h5 fr-follow__title" }, Ko = { class: "fr-text--sm fr-follow__desc" }, Wo = { key: 0 }, Yo = ["title"], Qo = { key: 1 }, zo = { action: "" }, Go = {
  class: "fr-label",
  for: "newsletter-email"
}, Xo = { class: "fr-input-wrap fr-input-wrap--addon" }, Uo = ["title", "placeholder", "value"], Zo = ["title"], Jo = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, ei = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, ti = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, gn = /* @__PURE__ */ q({
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
    return (r, l) => (u(), f("div", jo, [
      c("div", null, [
        c("h3", Ho, h(r.title), 1),
        c("p", Ko, h(r.description), 1)
      ]),
      r.onlyCallout ? (u(), f("div", Wo, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (s) => r.buttonAction ? r.buttonAction(s) : () => {
          })
        }, h(r.buttonText), 9, Yo)
      ])) : (u(), f("div", Qo, [
        c("form", zo, [
          c("label", Go, h(r.labelEmail), 1),
          c("div", Xo, [
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
            }, null, 40, Uo),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: r.buttonTitle,
              type: "submit"
            }, h(r.buttonText), 9, Zo)
          ]),
          r.error ? (u(), f("div", Jo, [
            c("p", ei, h(r.error), 1)
          ])) : k("", !0),
          c("p", ti, h(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), ai = { class: "fr-follow__social" }, ni = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, ri = ["title", "href"], yn = /* @__PURE__ */ q({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (e, t) => (u(), f("div", ai, [
      (u(), j(me(e.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: ee(() => t[0] || (t[0] = [
          H(" Suivez-nous "),
          c("br", null, null, -1),
          H(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      e.networks.length ? (u(), f("ul", ni, [
        (u(!0), f(U, null, te(e.networks, (n, r) => (u(), f("li", { key: r }, [
          c("a", {
            class: V(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h(n.name), 11, ri)
        ]))), 128))
      ])) : k("", !0)
    ]));
  }
}), li = { class: "fr-follow" }, si = { class: "fr-container" }, oi = { class: "fr-grid-row" }, ii = /* @__PURE__ */ q({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const e = a, t = w(() => e.networks && e.networks.length), n = w(() => typeof e.newsletterData == "object");
    return (r, l) => (u(), f("div", li, [
      c("div", si, [
        c("div", oi, [
          O(r.$slots, "default", {}, () => [
            r.newsletterData ? (u(), f("div", {
              key: 0,
              class: V(["fr-col-12", { "fr-col-md-8": t.value }])
            }, [
              le(gn, Pe(Mt(r.newsletterData)), null, 16)
            ], 2)) : k("", !0),
            t.value ? (u(), f("div", {
              key: 1,
              class: V(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              le(yn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : k("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ma = 1, kn = /* @__PURE__ */ q({
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
      () => typeof e.icon == "string" ? { name: e.icon, scale: Ma, ...e.iconAttrs ?? {} } : { scale: Ma, ...e.icon ?? {}, ...e.iconAttrs ?? {} }
    );
    return (p, m) => (u(), j(me(r.value), G({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": i.value && p.iconRight,
        "fr-btn--icon-left": i.value && !p.iconRight,
        [String(p.icon)]: i.value
      }]
    }, o.value, {
      target: p.target,
      onClick: ae(p.onClick, ["stop"])
    }), {
      default: ee(() => {
        var v, L;
        return [
          !i.value && (p.icon || (v = p.iconAttrs) != null && v.name) && !p.iconRight ? (u(), j(Te, G({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : k("", !0),
          H(" " + h(p.label) + " ", 1),
          !i.value && (p.icon || (L = p.iconAttrs) != null && L.name) && p.iconRight ? (u(), j(Te, G({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : k("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), ui = { class: "fr-footer__partners" }, di = { class: "fr-footer__partners-logos" }, ci = {
  key: 0,
  class: "fr-footer__partners-main"
}, fi = ["href"], pi = ["src", "alt"], vi = { class: "fr-footer__partners-sub" }, mi = ["href"], hi = ["src", "alt"], wn = /* @__PURE__ */ q({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" },
    titleTag: { default: "h4" }
  },
  setup(a) {
    return (e, t) => (u(), f("div", ui, [
      e.title ? (u(), j(me(e.titleTag), {
        key: 0,
        class: "fr-footer__partners-title"
      }, {
        default: ee(() => [
          H(h(e.title), 1)
        ]),
        _: 1
      })) : k("", !0),
      c("div", di, [
        e.mainPartner ? (u(), f("div", ci, [
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
            }, null, 8, pi)
          ], 8, fi)
        ])) : k("", !0),
        c("div", vi, [
          c("ul", null, [
            (u(!0), f(U, null, te(e.subPartners, (n, r) => (u(), f("li", { key: r }, [
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
                }, null, 8, hi)
              ], 8, mi)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), bi = ["innerHTML"], Ke = /* @__PURE__ */ q({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const e = a, t = w(() => Array.isArray(e.logoText) ? e.logoText.join("<br>") : e.logoText);
    return (n, r) => (u(), f("p", {
      class: V(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: t.value
    }, null, 10, bi));
  }
}), gi = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, yi = {
  key: 0,
  class: "fr-footer__top"
}, ki = { class: "fr-container" }, wi = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, _i = { class: "fr-container" }, Ti = { class: "fr-footer__body" }, xi = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, Di = ["href"], Ii = ["src", "alt"], Pi = ["src", "alt"], Ci = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, Ei = { class: "fr-footer__content" }, Li = { class: "fr-footer__content-desc" }, Mi = { class: "fr-footer__content-list" }, Bi = ["href", "title"], Si = { class: "fr-footer__bottom" }, Ai = { class: "fr-footer__bottom-list" }, Fi = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, Oi = /* @__PURE__ */ q({
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
      return u(), f("footer", gi, [
        r.value ? (u(), f("div", yi, [
          c("div", ki, [
            c("div", wi, [
              O(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : k("", !0),
        c("div", _i, [
          c("div", Ti, [
            p.operatorImgSrc ? (u(), f("div", xi, [
              le(Ke, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
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
                }, null, 12, Ii)
              ], 8, Di)) : (u(), j(v, {
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
                  }, null, 12, Pi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (u(), f("div", Ci, [
              le(v, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: ee(() => [
                  le(Ke, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", Ei, [
              c("p", Li, [
                O(p.$slots, "description", {}, () => [
                  H(h(p.descText), 1)
                ], !0)
              ]),
              c("ul", Mi, [
                (u(!0), f(U, null, te(p.ecosystemLinks, ({ href: L, label: b, title: S, ...y }, x) => (u(), f("li", {
                  key: x,
                  class: "fr-footer__content-item"
                }, [
                  c("a", G({
                    class: "fr-footer__content-link",
                    href: L,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: S,
                    ref_for: !0
                  }, y), h(b), 17, Bi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (u(), j(wn, Pe(G({ key: 0 }, p.partners)), null, 16)) : k("", !0),
          c("div", Si, [
            c("ul", Ai, [
              (u(!0), f(U, null, te(t.value, (L, b) => (u(), f("li", {
                key: b,
                class: "fr-footer__bottom-item"
              }, [
                le(kn, G({ ref_for: !0 }, L), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (u(), f("div", Fi, [
              c("p", null, [
                H(h(p.licenceText) + " ", 1),
                (u(), j(me(l.value ? "a" : "RouterLink"), G({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : o.value,
                  href: l.value ? i.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, s.value), {
                  default: ee(() => [
                    H(h(p.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target", "title"]))
              ])
            ])) : k("", !0)
          ])
        ])
      ]);
    };
  }
}), $i = /* @__PURE__ */ we(Oi, [["__scopeId", "data-v-4030eed5"]]), Ri = { class: "fr-footer__top-list" }, Ni = ["href"], Vi = /* @__PURE__ */ q({
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
            H(h(e.categoryName), 1)
          ]),
          _: 1
        })),
        c("ul", Ri, [
          (u(!0), f(U, null, te(e.links, (r, l) => (u(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (u(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, h(r.label), 9, Ni)) : k("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (u(), j(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: ee(() => [
                H(h(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : k("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), qi = { class: "fr-connect-group" }, ji = ["href", "title"], Hi = /* @__PURE__ */ q({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (e, t) => (u(), f("div", qi, [
      c("button", {
        class: V(["fr-connect", [{ "fr-connect--plus": e.secure }]])
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
        }, h(`Qu’est-ce que FranceConnect${e.secure ? "+" : ""} ?`), 9, ji)
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
}, Ki = function(a) {
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
  return a.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(a.tagName) || Ki(a)) && !In(a) ? 0 : a.tabIndex;
}, Wi = function(a, e) {
  var t = qe(a);
  return t < 0 && e && !In(a) ? 0 : t;
}, Yi = function(a, e) {
  return a.tabIndex === e.tabIndex ? a.documentOrder - e.documentOrder : a.tabIndex - e.tabIndex;
}, Pn = function(a) {
  return a.tagName === "INPUT";
}, Qi = function(a) {
  return Pn(a) && a.type === "hidden";
}, zi = function(a) {
  var e = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(t) {
    return t.tagName === "SUMMARY";
  });
  return e;
}, Gi = function(a, e) {
  for (var t = 0; t < a.length; t++)
    if (a[t].checked && a[t].form === e)
      return a[t];
}, Xi = function(a) {
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
  var r = Gi(n, a.form);
  return !r || r === a;
}, Ui = function(a) {
  return Pn(a) && a.type === "radio";
}, Zi = function(a) {
  return Ui(a) && !Xi(a);
}, Ji = function(a) {
  var e, t = a && kt(a), n = (e = t) === null || e === void 0 ? void 0 : e.host, r = !1;
  if (t && t !== a) {
    var l, s, o;
    for (r = !!((l = n) !== null && l !== void 0 && (s = l.ownerDocument) !== null && s !== void 0 && s.contains(n) || a != null && (o = a.ownerDocument) !== null && o !== void 0 && o.contains(a)); !r && n; ) {
      var i, d, p;
      t = kt(n), n = (i = t) === null || i === void 0 ? void 0 : i.host, r = !!((d = n) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return r;
}, Ba = function(a) {
  var e = a.getBoundingClientRect(), t = e.width, n = e.height;
  return t === 0 && n === 0;
}, eu = function(a, e) {
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
          return Ba(a);
        a.assignedSlot ? a = a.assignedSlot : !o && i !== a.ownerDocument ? a = i.host : a = o;
      }
      a = s;
    }
    if (Ji(a))
      return !a.getClientRects().length;
    if (t !== "legacy-full")
      return !0;
  } else if (t === "non-zero-area")
    return Ba(a);
  return !1;
}, tu = function(a) {
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
  wt(e) || Qi(e) || eu(e, a) || // For a details element with a summary, the summary element gets the focus
  zi(e) || tu(e));
}, Gt = function(a, e) {
  return !(Zi(e) || qe(e) < 0 || !_t(a, e));
}, au = function(a) {
  var e = parseInt(a.getAttribute("tabindex"), 10);
  return !!(isNaN(e) || e >= 0);
}, nu = function a(e) {
  var t = [], n = [];
  return e.forEach(function(r, l) {
    var s = !!r.scopeParent, o = s ? r.scopeParent : r, i = Wi(o, s), d = s ? a(r.candidates) : o;
    i === 0 ? s ? t.push.apply(t, d) : t.push(o) : n.push({
      documentOrder: l,
      tabIndex: i,
      item: r,
      isScope: s,
      content: d
    });
  }), n.sort(Yi).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(t);
}, ru = function(a, e) {
  e = e || {};
  var t;
  return e.getShadowRoot ? t = Dn([a], e.includeContainer, {
    filter: Gt.bind(null, e),
    flatten: !1,
    getShadowRoot: e.getShadowRoot,
    shadowRootFilter: au
  }) : t = xn(a, e.includeContainer, Gt.bind(null, e)), nu(t);
}, lu = function(a, e) {
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
}, su = /* @__PURE__ */ _n.concat("iframe").join(","), qt = function(a, e) {
  if (e = e || {}, !a)
    throw new Error("No node provided");
  return We.call(a, su) === !1 ? !1 : _t(e, a);
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
function ou(a) {
  if (Array.isArray(a)) return Xt(a);
}
function iu(a, e, t) {
  return (e = pu(e)) in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function uu(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function du() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Sa(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    e && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Aa(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Sa(Object(t), !0).forEach(function(n) {
      iu(a, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : Sa(Object(t)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return a;
}
function cu(a) {
  return ou(a) || uu(a) || vu(a) || du();
}
function fu(a, e) {
  if (typeof a != "object" || !a) return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(a, e);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(a);
}
function pu(a) {
  var e = fu(a, "string");
  return typeof e == "symbol" ? e : e + "";
}
function vu(a, e) {
  if (a) {
    if (typeof a == "string") return Xt(a, e);
    var t = {}.toString.call(a).slice(8, -1);
    return t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set" ? Array.from(a) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Xt(a, e) : void 0;
  }
}
var Fa = {
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
}, mu = function(a) {
  return a.tagName && a.tagName.toLowerCase() === "input" && typeof a.select == "function";
}, hu = function(a) {
  return (a == null ? void 0 : a.key) === "Escape" || (a == null ? void 0 : a.key) === "Esc" || (a == null ? void 0 : a.keyCode) === 27;
}, ot = function(a) {
  return (a == null ? void 0 : a.key) === "Tab" || (a == null ? void 0 : a.keyCode) === 9;
}, bu = function(a) {
  return ot(a) && !a.shiftKey;
}, gu = function(a) {
  return ot(a) && a.shiftKey;
}, Oa = function(a) {
  return setTimeout(a, 0);
}, nt = function(a) {
  for (var e = arguments.length, t = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    t[n - 1] = arguments[n];
  return typeof a == "function" ? a.apply(void 0, t) : a;
}, pt = function(a) {
  return a.target.shadowRoot && typeof a.composedPath == "function" ? a.composedPath()[0] : a.target;
}, yu = [], ku = function(a, e) {
  var t = (e == null ? void 0 : e.document) || document, n = (e == null ? void 0 : e.trapStack) || yu, r = Aa({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: bu,
    isKeyBackward: gu
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
  }, s, o = function(T, g, _) {
    return T && T[g] !== void 0 ? T[g] : r[_ || g];
  }, i = function(T, g) {
    var _ = typeof (g == null ? void 0 : g.composedPath) == "function" ? g.composedPath() : void 0;
    return l.containerGroups.findIndex(function(B) {
      var P = B.container, F = B.tabbableNodes;
      return P.contains(T) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (_ == null ? void 0 : _.includes(P)) || F.find(function($) {
        return $ === T;
      });
    });
  }, d = function(T) {
    var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ = g.hasFallback, B = _ === void 0 ? !1 : _, P = g.params, F = P === void 0 ? [] : P, $ = r[T];
    if (typeof $ == "function" && ($ = $.apply(void 0, cu(F))), $ === !0 && ($ = void 0), !$) {
      if ($ === void 0 || $ === !1)
        return $;
      throw new Error("`".concat(T, "` was specified but was not a node, or did not return a node"));
    }
    var Z = $;
    if (typeof $ == "string") {
      try {
        Z = t.querySelector($);
      } catch (X) {
        throw new Error("`".concat(T, '` appears to be an invalid selector; error="').concat(X.message, '"'));
      }
      if (!Z && !B)
        throw new Error("`".concat(T, "` as selector refers to no known node"));
    }
    return Z;
  }, p = function() {
    var T = d("initialFocus", {
      hasFallback: !0
    });
    if (T === !1)
      return !1;
    if (T === void 0 || T && !qt(T, r.tabbableOptions))
      if (i(t.activeElement) >= 0)
        T = t.activeElement;
      else {
        var g = l.tabbableGroups[0], _ = g && g.firstTabbableNode;
        T = _ || d("fallbackFocus");
      }
    else T === null && (T = d("fallbackFocus"));
    if (!T)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return T;
  }, m = function() {
    if (l.containerGroups = l.containers.map(function(T) {
      var g = ru(T, r.tabbableOptions), _ = lu(T, r.tabbableOptions), B = g.length > 0 ? g[0] : void 0, P = g.length > 0 ? g[g.length - 1] : void 0, F = _.find(function(X) {
        return ze(X);
      }), $ = _.slice().reverse().find(function(X) {
        return ze(X);
      }), Z = !!g.find(function(X) {
        return qe(X) > 0;
      });
      return {
        container: T,
        tabbableNodes: g,
        focusableNodes: _,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: Z,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: B,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: P,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: F,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: $,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(X) {
          var se = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ie = g.indexOf(X);
          return ie < 0 ? se ? _.slice(_.indexOf(X) + 1).find(function(W) {
            return ze(W);
          }) : _.slice(0, _.indexOf(X)).reverse().find(function(W) {
            return ze(W);
          }) : g[ie + (se ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(T) {
      return T.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(T) {
      return T.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, v = function(T) {
    var g = T.activeElement;
    if (g)
      return g.shadowRoot && g.shadowRoot.activeElement !== null ? v(g.shadowRoot) : g;
  }, L = function(T) {
    if (T !== !1 && T !== v(document)) {
      if (!T || !T.focus) {
        L(p());
        return;
      }
      T.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = T, mu(T) && T.select();
    }
  }, b = function(T) {
    var g = d("setReturnFocus", {
      params: [T]
    });
    return g || (g === !1 ? !1 : T);
  }, S = function(T) {
    var g = T.target, _ = T.event, B = T.isBackward, P = B === void 0 ? !1 : B;
    g = g || pt(_), m();
    var F = null;
    if (l.tabbableGroups.length > 0) {
      var $ = i(g, _), Z = $ >= 0 ? l.containerGroups[$] : void 0;
      if ($ < 0)
        P ? F = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : F = l.tabbableGroups[0].firstTabbableNode;
      else if (P) {
        var X = l.tabbableGroups.findIndex(function(de) {
          var fe = de.firstTabbableNode;
          return g === fe;
        });
        if (X < 0 && (Z.container === g || qt(g, r.tabbableOptions) && !ze(g, r.tabbableOptions) && !Z.nextTabbableNode(g, !1)) && (X = $), X >= 0) {
          var se = X === 0 ? l.tabbableGroups.length - 1 : X - 1, ie = l.tabbableGroups[se];
          F = qe(g) >= 0 ? ie.lastTabbableNode : ie.lastDomTabbableNode;
        } else ot(_) || (F = Z.nextTabbableNode(g, !1));
      } else {
        var W = l.tabbableGroups.findIndex(function(de) {
          var fe = de.lastTabbableNode;
          return g === fe;
        });
        if (W < 0 && (Z.container === g || qt(g, r.tabbableOptions) && !ze(g, r.tabbableOptions) && !Z.nextTabbableNode(g)) && (W = $), W >= 0) {
          var J = W === l.tabbableGroups.length - 1 ? 0 : W + 1, ne = l.tabbableGroups[J];
          F = qe(g) >= 0 ? ne.firstTabbableNode : ne.firstDomTabbableNode;
        } else ot(_) || (F = Z.nextTabbableNode(g));
      }
    } else
      F = d("fallbackFocus");
    return F;
  }, y = function(T) {
    var g = pt(T);
    if (!(i(g, T) >= 0)) {
      if (nt(r.clickOutsideDeactivates, T)) {
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
      nt(r.allowOutsideClick, T) || T.preventDefault();
    }
  }, x = function(T) {
    var g = pt(T), _ = i(g, T) >= 0;
    if (_ || g instanceof Document)
      _ && (l.mostRecentlyFocusedNode = g);
    else {
      T.stopImmediatePropagation();
      var B, P = !0;
      if (l.mostRecentlyFocusedNode)
        if (qe(l.mostRecentlyFocusedNode) > 0) {
          var F = i(l.mostRecentlyFocusedNode), $ = l.containerGroups[F].tabbableNodes;
          if ($.length > 0) {
            var Z = $.findIndex(function(X) {
              return X === l.mostRecentlyFocusedNode;
            });
            Z >= 0 && (r.isKeyForward(l.recentNavEvent) ? Z + 1 < $.length && (B = $[Z + 1], P = !1) : Z - 1 >= 0 && (B = $[Z - 1], P = !1));
          }
        } else
          l.containerGroups.some(function(X) {
            return X.tabbableNodes.some(function(se) {
              return qe(se) > 0;
            });
          }) || (P = !1);
      else
        P = !1;
      P && (B = S({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), L(B || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, E = function(T) {
    var g = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = T;
    var _ = S({
      event: T,
      isBackward: g
    });
    _ && (ot(T) && T.preventDefault(), L(_));
  }, A = function(T) {
    (r.isKeyForward(T) || r.isKeyBackward(T)) && E(T, r.isKeyBackward(T));
  }, D = function(T) {
    hu(T) && nt(r.escapeDeactivates, T) !== !1 && (T.preventDefault(), s.deactivate());
  }, K = function(T) {
    var g = pt(T);
    i(g, T) >= 0 || nt(r.clickOutsideDeactivates, T) || nt(r.allowOutsideClick, T) || (T.preventDefault(), T.stopImmediatePropagation());
  }, R = function() {
    if (l.active)
      return Fa.activateTrap(n, s), l.delayInitialFocusTimer = r.delayInitialFocus ? Oa(function() {
        L(p());
      }) : L(p()), t.addEventListener("focusin", x, !0), t.addEventListener("mousedown", y, {
        capture: !0,
        passive: !1
      }), t.addEventListener("touchstart", y, {
        capture: !0,
        passive: !1
      }), t.addEventListener("click", K, {
        capture: !0,
        passive: !1
      }), t.addEventListener("keydown", A, {
        capture: !0,
        passive: !1
      }), t.addEventListener("keydown", D), s;
  }, C = function() {
    if (l.active)
      return t.removeEventListener("focusin", x, !0), t.removeEventListener("mousedown", y, !0), t.removeEventListener("touchstart", y, !0), t.removeEventListener("click", K, !0), t.removeEventListener("keydown", A, !0), t.removeEventListener("keydown", D), s;
  }, N = function(T) {
    var g = T.some(function(_) {
      var B = Array.from(_.removedNodes);
      return B.some(function(P) {
        return P === l.mostRecentlyFocusedNode;
      });
    });
    g && L(p());
  }, I = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(N) : void 0, M = function() {
    I && (I.disconnect(), l.active && !l.paused && l.containers.map(function(T) {
      I.observe(T, {
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
    activate: function(T) {
      if (l.active)
        return this;
      var g = o(T, "onActivate"), _ = o(T, "onPostActivate"), B = o(T, "checkCanFocusTrap");
      B || m(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = t.activeElement, g == null || g();
      var P = function() {
        B && m(), R(), M(), _ == null || _();
      };
      return B ? (B(l.containers.concat()).then(P, P), this) : (P(), this);
    },
    deactivate: function(T) {
      if (!l.active)
        return this;
      var g = Aa({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, T);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, C(), l.active = !1, l.paused = !1, M(), Fa.deactivateTrap(n, s);
      var _ = o(g, "onDeactivate"), B = o(g, "onPostDeactivate"), P = o(g, "checkCanReturnFocus"), F = o(g, "returnFocus", "returnFocusOnDeactivate");
      _ == null || _();
      var $ = function() {
        Oa(function() {
          F && L(b(l.nodeFocusedBeforeActivation)), B == null || B();
        });
      };
      return F && P ? (P(b(l.nodeFocusedBeforeActivation)).then($, $), this) : ($(), this);
    },
    pause: function(T) {
      return l.active ? (l.manuallyPaused = !0, this._setPausedState(!0, T)) : this;
    },
    unpause: function(T) {
      return l.active ? (l.manuallyPaused = !1, n[n.length - 1] !== this ? this : this._setPausedState(!1, T)) : this;
    },
    updateContainerElements: function(T) {
      var g = [].concat(T).filter(Boolean);
      return l.containers = g.map(function(_) {
        return typeof _ == "string" ? t.querySelector(_) : _;
      }), l.active && m(), M(), this;
    }
  }, Object.defineProperties(s, {
    _isManuallyPaused: {
      value: function() {
        return l.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(T, g) {
        if (l.paused === T)
          return this;
        if (l.paused = T, T) {
          var _ = o(g, "onPause"), B = o(g, "onPostPause");
          _ == null || _(), C(), M(), B == null || B();
        } else {
          var P = o(g, "onUnpause"), F = o(g, "onPostUnpause");
          P == null || P(), m(), R(), M(), F == null || F();
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
const wu = {
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
}, Cn = q({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, wu),
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
    const r = z(null), l = w(() => {
      const o = r.value;
      return o && (o instanceof HTMLElement ? o : o.$el);
    });
    function s() {
      return n || (n = ku(l.value, {
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
        const o = e.default().filter((i) => i.type !== Ja);
        return !o || !o.length || o.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), o) : en(o[0], { ref: r });
      }
    };
  }
}), _u = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Tu = { class: "fr-nav__item" }, xu = ["aria-controls", "aria-expanded", "title"], Du = { class: "fr-hidden-lg" }, Iu = ["id"], Pu = { class: "fr-menu__list" }, Cu = ["hreflang", "lang", "aria-current", "href", "onClick"], dt = /* @__PURE__ */ q({
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
    } = Ae(), d = z(!1);
    function p(v) {
      d.value = !1, n("select", v);
    }
    const m = w(
      () => t.languages.find(({ codeIso: v }) => v === t.currentLanguage)
    );
    return ve(d, (v, L) => {
      v !== L && o(v);
    }), (v, L) => {
      var b, S;
      return u(), f("nav", _u, [
        c("div", Tu, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": v.id,
            "aria-expanded": d.value,
            title: v.title,
            type: "button",
            onClick: L[0] || (L[0] = ae((y) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            H(h((b = m.value) == null ? void 0 : b.codeIso.toUpperCase()), 1),
            c("span", Du, " - " + h((S = m.value) == null ? void 0 : S.label), 1)
          ], 8, xu),
          c("div", {
            id: v.id,
            ref_key: "collapse",
            ref: r,
            class: V(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": Q(s), "fr-collapsing": Q(l) }]),
            onTransitionend: L[1] || (L[1] = (y) => Q(i)(d.value))
          }, [
            c("ul", Pu, [
              (u(!0), f(U, null, te(v.languages, (y, x) => (u(), f("li", { key: x }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: y.codeIso,
                  lang: y.codeIso,
                  "aria-current": v.currentLanguage === y.codeIso ? !0 : void 0,
                  href: `#${y.codeIso}`,
                  onClick: ae((E) => p(y), ["prevent", "stop"])
                }, h(`${y.codeIso.toUpperCase()} - ${y.label}`), 9, Cu)
              ]))), 128))
            ])
          ], 42, Iu)
        ])
      ]);
    };
  }
}), Eu = ["for"], Lu = {
  key: 0,
  class: "required"
}, Mu = {
  key: 0,
  class: "fr-hint-text"
}, Bu = /* @__PURE__ */ q({
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
    const t = a, n = _r(), r = z(null), l = () => {
      var d;
      return (d = r.value) == null ? void 0 : d.focus();
    }, s = w(() => t.isTextarea ? "textarea" : "input"), o = w(() => t.isWithWrapper || n.type === "date" || !!t.wrapperClass), i = w(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return e({
      focus: l
    }), (d, p) => (u(), f(U, null, [
      c("label", {
        class: V(i.value),
        for: d.id
      }, [
        O(d.$slots, "label", {}, () => [
          H(h(d.label) + " ", 1),
          O(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (u(), f("span", Lu, "*")) : k("", !0)
          ], !0)
        ], !0),
        d.hint ? (u(), f("span", Mu, h(d.hint), 1)) : k("", !0)
      ], 10, Eu),
      o.value ? (u(), f("div", {
        key: 1,
        class: V([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (u(), j(me(s.value), G({ id: d.id }, d.$attrs, {
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
      ], 2)) : (u(), j(me(s.value), G({
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
}), $t = /* @__PURE__ */ we(Bu, [["__scopeId", "data-v-7ca45de8"]]), Su = {
  key: 1,
  class: "fr-sr-only"
}, ct = /* @__PURE__ */ q({
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
      class: V(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      le($t, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => t("update:modelValue", l)),
        onKeydown: r[1] || (r[1] = re((l) => t("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label", "disabled", "aria-disabled"]),
      le(He, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: r[2] || (r[2] = (l) => t("search", n.modelValue))
      }, {
        default: ee(() => [
          n.buttonText ? (u(), f(U, { key: 0 }, [
            H(h(n.buttonText), 1)
          ], 64)) : (u(), f("span", Su, " Rechercher "))
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), $a = 1, ca = /* @__PURE__ */ q({
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
    return (m, v) => (u(), j(me(l.value), G({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && m.iconRight,
        "fr-btn--icon-left": d.value && !m.iconRight,
        [String(m.icon)]: d.value
      }]
    }, i.value, {
      target: m.target,
      onClick: v[0] || (v[0] = ae((L) => m.onClick(L), ["stop"]))
    }), {
      default: ee(() => {
        var L, b;
        return [
          !d.value && (m.icon || (L = m.iconAttrs) != null && L.name) && !m.iconRight ? (u(), j(Te, G({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : k("", !0),
          H(" " + h(m.label) + " ", 1),
          !d.value && (m.icon || (b = m.iconAttrs) != null && b.name) && m.iconRight ? (u(), j(Te, G({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : k("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Au = ["aria-label"], Fu = { class: "fr-btns-group" }, Ut = /* @__PURE__ */ q({
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
      c("ul", Fu, [
        (u(!0), f(U, null, te(n.links, (l, s) => (u(), f("li", { key: s }, [
          le(ca, G({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var i;
              t("linkClick", o), (i = l.onClick) == null || i.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Au));
  }
}), Ou = {
  role: "banner",
  class: "fr-header"
}, $u = { class: "fr-header__body" }, Ru = { class: "fr-container width-inherit" }, Nu = { class: "fr-header__body-row" }, Vu = { class: "fr-header__brand fr-enlarge-link" }, qu = { class: "fr-header__brand-top" }, ju = { class: "fr-header__logo" }, Hu = {
  key: 0,
  class: "fr-header__operator"
}, Ku = ["src", "alt"], Wu = {
  key: 1,
  class: "fr-header__navbar"
}, Yu = ["aria-label", "title", "data-fr-opened"], Qu = { class: "fr-sr-only" }, zu = { class: "fr-sr-only" }, Gu = {
  key: 0,
  class: "fr-header__service"
}, Xu = { class: "fr-header__service-title" }, Uu = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Zu = {
  key: 0,
  class: "fr-header__service-tagline"
}, Ju = {
  key: 1,
  class: "fr-header__service"
}, ed = { class: "fr-header__tools" }, td = {
  key: 0,
  class: "fr-header__tools-links"
}, ad = {
  key: 1,
  class: "fr-header__search fr-modal"
}, nd = ["aria-label"], rd = { class: "fr-container" }, ld = { class: "fr-header__menu-links" }, sd = {
  key: 1,
  class: "flex justify-center items-center"
}, od = { class: "fr-header__menu fr-modal" }, id = {
  key: 0,
  class: "fr-container"
}, ud = /* @__PURE__ */ q({
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
    const t = a, n = e, r = ra(), l = ft(t, "languageSelector"), s = z(!1), o = z(!1), i = z(!1), d = () => {
      var x;
      i.value = !1, s.value = !1, o.value = !1, (x = document.getElementById("button-menu")) == null || x.focus();
    }, p = (x) => {
      x.key === "Escape" && d();
    };
    ke(() => {
      document.addEventListener("keydown", p);
    }), Ce(() => {
      document.removeEventListener("keydown", p);
    });
    const m = () => {
      i.value = !0, s.value = !0, o.value = !1, setTimeout(() => {
        var x;
        (x = document.getElementById("close-button")) == null || x.focus();
      }, 50);
    }, v = () => {
      i.value = !0, s.value = !1, o.value = !0;
    }, L = d, b = w(() => [t.homeLabel, t.serviceTitle].filter((x) => x).join(" - ")), S = w(() => !!r.operator || !!t.operatorImgSrc), y = w(() => !!r.mainnav);
    return Re(da, () => d), (x, E) => {
      var A, D, K;
      const R = xe("RouterLink");
      return u(), f("header", Ou, [
        c("div", $u, [
          c("div", Ru, [
            c("div", Nu, [
              c("div", Vu, [
                c("div", qu, [
                  c("div", ju, [
                    x.serviceTitle ? (u(), j(Ke, {
                      key: 1,
                      "logo-text": x.logoText,
                      "data-testid": "header-logo"
                    }, null, 8, ["logo-text"])) : (u(), j(R, {
                      key: 0,
                      to: x.homeTo,
                      title: b.value
                    }, {
                      default: ee(() => [
                        le(Ke, {
                          "logo-text": x.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"]))
                  ]),
                  S.value ? (u(), f("div", Hu, [
                    O(x.$slots, "operator", {}, () => [
                      x.operatorImgSrc ? (u(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: x.operatorImgSrc,
                        alt: x.operatorImgAlt,
                        style: Ie(x.operatorImgStyle)
                      }, null, 12, Ku)) : k("", !0)
                    ])
                  ])) : k("", !0),
                  x.showSearch || y.value || (A = x.quickLinks) != null && A.length ? (u(), f("div", Wu, [
                    x.showSearch ? (u(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": x.showSearchLabel,
                      title: x.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: E[0] || (E[0] = ae((C) => v(), ["prevent", "stop"]))
                    }, [
                      c("span", Qu, h(x.showSearchLabel), 1)
                    ], 8, Yu)) : k("", !0),
                    y.value || (D = x.quickLinks) != null && D.length ? (u(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": m,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "data-testid": "open-menu-btn",
                      onClick: E[1] || (E[1] = ae((C) => m(), ["prevent", "stop"]))
                    }, [
                      c("span", zu, h(x.menuLabel), 1)
                    ])) : k("", !0)
                  ])) : k("", !0)
                ]),
                x.serviceTitle ? (u(), f("div", Gu, [
                  le(R, G({
                    to: x.homeTo,
                    title: b.value
                  }, x.$attrs), {
                    default: ee(() => [
                      c("p", Xu, [
                        H(h(x.serviceTitle) + " ", 1),
                        x.showBeta ? (u(), f("span", Uu, " BETA ")) : k("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  x.serviceDescription ? (u(), f("p", Zu, h(x.serviceDescription), 1)) : k("", !0)
                ])) : k("", !0),
                !x.serviceTitle && x.showBeta ? (u(), f("div", Ju, E[9] || (E[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : k("", !0)
              ]),
              c("div", ed, [
                (K = x.quickLinks) != null && K.length || l.value ? (u(), f("div", td, [
                  O(x.$slots, "before-quick-links"),
                  s.value ? k("", !0) : (u(), j(Ut, {
                    key: 0,
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  O(x.$slots, "after-quick-links"),
                  l.value ? (u(), j(dt, G({ key: 1 }, l.value, {
                    onSelect: E[2] || (E[2] = (C) => n("languageSelect", C))
                  }), null, 16)) : k("", !0)
                ])) : k("", !0),
                x.showSearch ? (u(), f("div", ad, [
                  le(ct, {
                    id: x.searchbarId,
                    label: x.searchLabel,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": E[3] || (E[3] = (C) => n("update:modelValue", C)),
                    onSearch: E[4] || (E[4] = (C) => n("search", C))
                  }, null, 8, ["id", "label", "model-value", "placeholder"])
                ])) : k("", !0)
              ])
            ]),
            i.value ? (u(), j(Q(Cn), {
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
                (x.showSearch || y.value || x.quickLinks && x.quickLinks.length || l.value) && i.value ? (u(), f("div", {
                  key: 0,
                  id: "header-navigation",
                  class: "fr-header__menu fr-modal fr-modal--opened",
                  "aria-label": x.menuModalLabel,
                  role: "dialog",
                  "aria-modal": "true"
                }, [
                  c("div", rd, [
                    c("button", {
                      id: "close-button",
                      class: "fr-btn fr-btn--close",
                      "aria-controls": "header-navigation",
                      "data-testid": "close-modal-btn",
                      onClick: E[5] || (E[5] = ae((C) => d(), ["prevent", "stop"]))
                    }, h(x.closeMenuModalLabel), 1),
                    c("div", ld, [
                      l.value ? (u(), j(dt, G({ key: 0 }, l.value, {
                        onSelect: E[6] || (E[6] = (C) => l.value.currentLanguage = C.codeIso)
                      }), null, 16)) : k("", !0),
                      O(x.$slots, "before-quick-links"),
                      s.value ? (u(), j(Ut, {
                        key: 1,
                        role: "navigation",
                        links: x.quickLinks,
                        "nav-aria-label": x.quickLinksAriaLabel,
                        onLinkClick: Q(L)
                      }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : k("", !0),
                      O(x.$slots, "after-quick-links")
                    ]),
                    i.value ? O(x.$slots, "mainnav", {
                      key: 0,
                      hidemodal: d
                    }) : k("", !0),
                    o.value ? (u(), f("div", sd, [
                      le(ct, {
                        "searchbar-id": x.searchbarId,
                        "model-value": x.modelValue,
                        placeholder: x.placeholder,
                        "onUpdate:modelValue": E[7] || (E[7] = (C) => n("update:modelValue", C)),
                        onSearch: E[8] || (E[8] = (C) => n("search", C))
                      }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                    ])) : k("", !0)
                  ])
                ], 8, nd)) : k("", !0)
              ]),
              _: 3
            }, 8, ["active"])) : k("", !0),
            O(x.$slots, "default")
          ])
        ]),
        c("div", od, [
          y.value && !i.value ? (u(), f("div", id, [
            O(x.$slots, "mainnav", { hidemodal: d })
          ])) : k("", !0)
        ])
      ]);
    };
  }
}), dd = /* @__PURE__ */ q({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(a) {
    return (e, t) => (u(), f("div", {
      class: V(["fr-highlight", { [`fr-highlight--${e.color}`]: e.color }])
    }, [
      c("p", {
        class: V({
          "fr-text--lg": e.large && !e.small,
          "fr-text--sm": e.small && !e.large
        })
      }, [
        H(h(e.text) + " ", 1),
        O(e.$slots, "default")
      ], 2)
    ], 2));
  }
}), cd = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, fd = ["id", "data-testid"], pd = ["id", "data-testid"], vd = ["id", "data-testid"], md = ["id", "data-testid"], hd = /* @__PURE__ */ q({
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
      class: V(["fr-input-group", [
        {
          "fr-input-group--error": e.errorMessage,
          "fr-input-group--valid": e.validMessage && !e.errorMessage
        },
        e.wrapperClass
      ]])
    }, [
      O(e.$slots, "before-input"),
      O(e.$slots, "default", {
        isValid: !!e.validMessage,
        isInvalid: !!e.errorMessage,
        descriptionId: (e.errorMessage || e.validMessage) && e.descriptionId || void 0
      }),
      e.$slots.default ? k("", !0) : (u(), j($t, G({ key: 0 }, e.$attrs, {
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
      c("div", cd, [
        Array.isArray(e.errorMessage) ? (u(!0), f(U, { key: 0 }, te(e.errorMessage, (n) => (u(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, h(n), 9, fd))), 128)) : e.errorMessage ? (u(), f("p", {
          id: e.descriptionId,
          key: e.errorMessage,
          "data-testid": e.descriptionId,
          class: "fr-error-text"
        }, h(e.errorMessage), 9, pd)) : k("", !0),
        Array.isArray(e.validMessage) ? (u(!0), f(U, { key: 2 }, te(e.validMessage, (n) => (u(), f("p", {
          id: e.descriptionId,
          key: n,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, h(n), 9, vd))), 128)) : e.validMessage ? (u(), f("p", {
          id: e.descriptionId,
          key: e.validMessage,
          "data-testid": e.descriptionId,
          class: "fr-valid-text"
        }, h(e.validMessage), 9, md)) : k("", !0)
      ])
    ], 2));
  }
}), bd = ["aria-labelledby", "role", "open"], gd = { class: "fr-container fr-container--fluid fr-container-md" }, yd = { class: "fr-grid-row fr-grid-row--center" }, kd = { class: "fr-modal__body" }, wd = { class: "fr-modal__header" }, _d = ["title"], Td = { class: "fr-modal__content" }, xd = ["id"], Dd = {
  key: 0,
  class: "fr-modal__footer"
}, Ra = 2, Id = /* @__PURE__ */ q({
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
    const t = a, n = e, r = (b) => {
      b.key === "Escape" && m();
    }, l = w(() => t.isAlert ? "alertdialog" : "dialog"), s = z(null), o = z();
    ve(() => t.opened, (b) => {
      var S, y;
      b ? ((S = o.value) == null || S.showModal(), setTimeout(() => {
        var x;
        (x = s.value) == null || x.focus();
      }, 100)) : (y = o.value) == null || y.close(), i(b);
    });
    function i(b) {
      typeof window < "u" && document.body.classList.toggle("modal-open", b);
    }
    ke(() => {
      d(), i(t.opened);
    }), Dr(() => {
      p(), i(!1);
    });
    function d() {
      document.addEventListener("keydown", r);
    }
    function p() {
      document.removeEventListener("keydown", r);
    }
    async function m() {
      var b;
      await tn(), (b = t.origin) == null || b.focus(), n("close");
    }
    const v = w(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), L = w(
      () => v.value ? void 0 : typeof t.icon == "string" ? { name: t.icon, scale: Ra } : { scale: Ra, ...t.icon ?? {} }
    );
    return (b, S) => b.opened ? (u(), j(Q(Cn), { key: 0 }, {
      default: ee(() => {
        var y, x;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: o,
            "aria-modal": "true",
            "aria-labelledby": b.modalId,
            role: l.value,
            class: V(["fr-modal", { "fr-modal--opened": b.opened }]),
            open: b.opened
          }, [
            c("div", gd, [
              c("div", yd, [
                c("div", {
                  class: V(["fr-col-12", {
                    "fr-col-md-8": b.size === "lg",
                    "fr-col-md-6": b.size === "md",
                    "fr-col-md-4": b.size === "sm"
                  }])
                }, [
                  c("div", kd, [
                    c("div", wd, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: s,
                        class: "fr-btn fr-btn--close",
                        title: b.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: S[0] || (S[0] = (E) => m())
                      }, [
                        c("span", null, h(b.closeButtonLabel), 1)
                      ], 8, _d)
                    ]),
                    c("div", Td, [
                      c("h1", {
                        id: b.modalId,
                        class: "fr-modal__title"
                      }, [
                        v.value || L.value ? (u(), f("span", {
                          key: 0,
                          class: V({
                            [String(b.icon)]: v.value
                          })
                        }, [
                          b.icon && L.value ? (u(), j(Te, Pe(G({ key: 0 }, L.value)), null, 16)) : k("", !0)
                        ], 2)) : k("", !0),
                        H(" " + h(b.title), 1)
                      ], 8, xd),
                      O(b.$slots, "default", {}, void 0, !0)
                    ]),
                    (y = b.actions) != null && y.length || b.$slots.footer ? (u(), f("div", Dd, [
                      O(b.$slots, "footer", {}, void 0, !0),
                      (x = b.actions) != null && x.length ? (u(), j(Ft, {
                        key: 0,
                        align: "right",
                        buttons: b.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : k("", !0)
                    ])) : k("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, bd)
        ];
      }),
      _: 3
    })) : k("", !0);
  }
}), En = /* @__PURE__ */ we(Id, [["__scopeId", "data-v-70fe954b"]]), Pd = ["for"], Cd = {
  key: 0,
  class: "required"
}, Ed = {
  key: 0,
  class: "fr-hint-text"
}, Ld = ["id"], Md = ["id"], Bd = {
  key: 0,
  class: "fr-btns-group"
}, Sd = {
  key: 1,
  class: "fr-input-group"
}, Ad = { class: "fr-input-wrap fr-icon-search-line" }, Fd = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Od = { key: 2 }, $d = ["id"], Rd = /* @__PURE__ */ q({
  __name: "DsfrMultiselect",
  props: /* @__PURE__ */ $e({
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
        const ne = W[J];
        if (typeof ne == "string" || typeof ne == "number")
          return ne;
        throw new Error(
          `The value of idKey ${String(J)} is not a string or number.`
        );
      }
      if (typeof W == "string" || typeof W == "number")
        return W;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (W, J, ne) => `${J}-${n(W, ne)}`, l = z(null), s = z(!1), o = De(a, "modelValue"), i = z(0), d = w(() => e.errorMessage || e.successMessage), p = w(() => e.errorMessage ? "error" : "valid"), m = [], {
      collapse: v,
      collapsing: L,
      cssExpanded: b,
      doExpand: S,
      onTransitionEnd: y
    } = Ae(), x = () => document.querySelectorAll(`[id^="${e.id}-"][id$="-checkbox"]`), E = z(!1), A = z("");
    function D(W) {
      W.key === "Escape" && I();
    }
    function K(W) {
      var J, ne;
      const de = W.target;
      !((J = l.value) != null && J.$el.contains(de)) && !((ne = v.value) != null && ne.contains(de)) && I();
    }
    function R(W, J) {
      if (window.ResizeObserver) {
        const ne = new window.ResizeObserver((de) => {
          for (const fe of de)
            J(W, fe);
        });
        return ne.observe(W), () => {
          ne.unobserve(W), ne.disconnect();
        };
      }
      return () => {
      };
    }
    function C(W) {
      const J = W.getBoundingClientRect();
      J.width !== i.value && (i.value = J.width);
    }
    function N() {
      s.value = !0, E.value = !0, l.value && m.push(R(l.value.$el, C)), document.addEventListener("click", K), document.addEventListener("keydown", D), setTimeout(() => {
        S(!0);
      }, 100);
    }
    function I() {
      s.value = !1, S(!1), setTimeout(() => {
        E.value = !1;
      }, 300), T();
    }
    const M = async () => {
      E.value ? I() : N();
    };
    function T() {
      for (; m.length; ) {
        const W = m.pop();
        W && W();
      }
      document.removeEventListener("click", K), document.removeEventListener("keydown", D);
    }
    const g = w(
      () => e.options.filter((W) => typeof W == "object" && W !== null ? e.filteringKeys.some(
        (J) => `${W[J]}`.toLowerCase().includes(A.value.toLowerCase())
      ) : `${W}`.toLowerCase().includes(A.value.toLowerCase()))
    ), _ = w(() => e.modelValue.length < g.value.length ? !1 : g.value.every((W) => {
      const J = n(W, e.idKey);
      return e.modelValue.includes(J);
    })), B = () => {
      const W = new Set(o.value || []);
      _.value ? g.value.forEach((J) => {
        const ne = n(J, e.idKey);
        W.delete(ne);
      }) : g.value.forEach((J) => {
        const ne = n(J, e.idKey);
        W.add(ne);
      }), o.value = Array.from(W);
    }, P = (W) => {
      const [J] = x();
      J && (W.preventDefault(), J.focus());
    }, F = (W) => {
      W.preventDefault();
      const J = x(), ne = document.activeElement, de = Array.from(J).indexOf(ne);
      if (de !== -1) {
        const fe = (de + 1) % J.length;
        J[fe].focus();
      }
    }, $ = (W) => {
      W.preventDefault();
      const J = x(), ne = document.activeElement, de = Array.from(J).indexOf(ne);
      if (de !== -1) {
        const fe = (de - 1 + J.length) % J.length;
        J[fe].focus();
      }
    }, Z = (W) => {
      const J = x(), ne = document.activeElement;
      Array.from(J).indexOf(ne) + 1 === J.length && l.value && !W.shiftKey && I();
    }, X = (W) => {
      var J;
      const ne = document.activeElement;
      W.shiftKey && ne === ((J = l.value) == null ? void 0 : J.$el) && I();
    };
    Ce(() => {
      T();
    });
    const se = w(() => {
      var W;
      const J = ((W = o.value) == null ? void 0 : W.length) ?? 0, ne = J === 0, de = J > 1;
      return ne ? "Sélectionner une option" : `${J} option${de ? "s" : ""} sélectionnée${de ? "s" : ""}`;
    }), ie = w(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return (W, J) => {
      var ne, de;
      return u(), f("div", {
        class: V(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
      }, [
        c("label", {
          class: V(ie.value),
          for: W.id
        }, [
          O(W.$slots, "label", {}, () => [
            H(h(W.label) + " ", 1),
            O(W.$slots, "required-tip", {}, () => [
              "required" in W.$attrs && W.$attrs.required !== !1 ? (u(), f("span", Cd)) : k("", !0)
            ], !0)
          ], !0),
          e.hint || (de = (ne = W.$slots).hint) != null && de.call(ne) ? (u(), f("span", Ed, [
            O(W.$slots, "hint", {}, () => [
              H(h(e.hint), 1)
            ], !0)
          ])) : k("", !0)
        ], 10, Pd),
        le(He, G({
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
          onKeydown: re(ae(X, ["shift"]), ["tab"])
        }), {
          default: ee(() => [
            O(W.$slots, "button-label", {}, () => [
              H(h(e.buttonLabel || se.value), 1)
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
          class: V(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": Q(b), "fr-collapsing": Q(L) }]),
          onTransitionend: J[2] || (J[2] = (fe) => Q(y)(s.value))
        }, [
          c("p", {
            id: `${W.id}-text-hint`,
            class: "fr-sr-only"
          }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, Md),
          W.selectAll ? (u(), f("ul", Bd, [
            c("li", null, [
              le(He, {
                type: "button",
                name: "select-all",
                secondary: "",
                size: "sm",
                disabled: g.value.length === 0,
                onClick: B,
                onKeydown: re(ae(X, ["shift"]), ["tab"])
              }, {
                default: ee(() => [
                  c("span", {
                    class: V([
                      "fr-multiselect__search__icon",
                      _.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                    ])
                  }, null, 2),
                  H(" " + h(e.selectAllLabel[_.value ? 1 : 0]), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onKeydown"])
            ])
          ])) : k("", !0),
          e.search ? (u(), f("div", Sd, [
            c("div", Ad, [
              le($t, {
                modelValue: A.value,
                "onUpdate:modelValue": J[0] || (J[0] = (fe) => A.value = fe),
                "aria-describedby": `${e.id}-text-hint`,
                "aria-controls": `${e.id}-checkboxes`,
                "aria-live": "polite",
                placeholder: "Rechercher",
                type: "text",
                onKeydown: [
                  re(P, ["down"]),
                  re(P, ["right"]),
                  re(X, ["tab"])
                ]
              }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
            ]),
            J[3] || (J[3] = c("div", {
              class: "fr-messages-group",
              "aria-live": "assertive"
            }, null, -1))
          ])) : k("", !0),
          le(hn, {
            id: `${e.id}-checkboxes`,
            class: "fr-multiselect__collapse__fieldset",
            "aria-live": "polite",
            style: Ie({ "--maxOverflowHeight": `${e.maxOverflowHeight}` }),
            legend: e.legend,
            "legend-id": `${e.id}-checkboxes-legend`
          }, {
            default: ee(() => [
              O(W.$slots, "legend", {}, void 0, !0),
              (u(!0), f(U, null, te(g.value, (fe) => (u(), f("div", {
                key: `${r(fe, W.id, e.idKey)}-checkbox`,
                class: "fr-fieldset__element"
              }, [
                c("div", Fd, [
                  le(Ot, {
                    id: `${r(fe, W.id, e.idKey)}-checkbox`,
                    modelValue: o.value,
                    "onUpdate:modelValue": J[1] || (J[1] = (Fe) => o.value = Fe),
                    value: n(fe, e.idKey),
                    name: `${r(fe, W.id, e.idKey)}-checkbox`,
                    small: "",
                    onKeydown: [
                      re(F, ["down"]),
                      re(F, ["right"]),
                      re($, ["up"]),
                      re($, ["left"]),
                      re(Z, ["tab"])
                    ]
                  }, {
                    label: ee(() => [
                      O(W.$slots, "checkbox-label", {
                        option: fe
                      }, () => [
                        H(h(n(fe, e.labelKey)), 1)
                      ], !0)
                    ]),
                    _: 2
                  }, 1032, ["id", "modelValue", "value", "name"])
                ])
              ]))), 128))
            ]),
            _: 3
          }, 8, ["id", "style", "legend", "legend-id"]),
          g.value.length === 0 ? (u(), f("div", Od, [
            O(W.$slots, "no-results", {}, () => [
              J[4] || (J[4] = H(" Pas de résultat "))
            ], !0)
          ])) : k("", !0)
        ], 46, Ld)) : k("", !0),
        d.value ? (u(), f("p", {
          key: 1,
          id: `select-${p.value}-desc-${p.value}`,
          class: V(`fr-${p.value}-text`)
        }, h(d.value), 11, $d)) : k("", !0)
      ], 2);
    };
  }
}), Nd = /* @__PURE__ */ we(Rd, [["__scopeId", "data-v-829d79d0"]]), Vd = ["id", "aria-current"], qd = /* @__PURE__ */ q({
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
      O(e.$slots, "default", {}, void 0, !0)
    ], 8, Vd));
  }
}), Ln = /* @__PURE__ */ we(qd, [["__scopeId", "data-v-aa4076c4"]]), jd = ["href"], Na = 2, Rt = /* @__PURE__ */ q({
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
      () => n.value || !e.icon ? void 0 : typeof e.icon == "string" ? { scale: Na, name: e.icon } : { scale: Na, ...e.icon || {} }
    ), l = wr() ? Ue(da) : void 0, s = (l == null ? void 0 : l()) ?? (() => {
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
      }, h(o.text), 9, jd)) : (u(), j(d, {
        key: 1,
        class: V(["fr-nav__link", {
          [String(o.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: o.to,
        onClick: i[1] || (i[1] = (p) => {
          var m;
          Q(s)(), o.$emit("toggleId", o.id), (m = o.onClick) == null || m.call(o, p);
        })
      }, {
        default: ee(() => [
          o.icon && r.value ? (u(), j(Te, Pe(G({ key: 0 }, r.value)), null, 16)) : k("", !0),
          H(" " + h(o.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), Hd = { class: "fr-col-12 fr-col-lg-3" }, Kd = { class: "fr-mega-menu__category" }, Wd = { class: "fr-mega-menu__list" }, Mn = /* @__PURE__ */ q({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (e, t) => (u(), f("div", Hd, [
      c("h5", Kd, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: t[0] || (t[0] = ae(() => {
          }, ["prevent"]))
        }, h(e.title), 1)
      ]),
      c("ul", Wd, [
        (u(!0), f(U, null, te(e.links, (n, r) => (u(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          le(Rt, G({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Yd = ["aria-expanded", "aria-current", "aria-controls"], Qd = ["id"], zd = { class: "fr-container fr-container--fluid fr-container-lg" }, Gd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Xd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, Ud = { class: "fr-mega-menu__leader" }, Zd = { class: "fr-h4 fr-mb-2v" }, Jd = { class: "fr-hidden fr-displayed-lg" }, ec = /* @__PURE__ */ q({
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
      return u(), f(U, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": o.value,
          "aria-current": i.active || void 0,
          "aria-controls": i.id,
          onClick: d[0] || (d[0] = (m) => i.$emit("toggleId", i.id))
        }, h(i.title), 9, Yd),
        c("div", {
          id: i.id,
          ref_key: "collapse",
          ref: t,
          "data-testid": "mega-menu-wrapper",
          class: V(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": Q(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Q(n)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (m) => Q(s)(o.value))
        }, [
          c("div", zd, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (m) => i.$emit("toggleId", i.id))
            }, " Fermer "),
            c("div", Gd, [
              c("div", Xd, [
                c("div", Ud, [
                  c("h4", Zd, h(i.title), 1),
                  c("p", Jd, [
                    H(h(i.description) + " ", 1),
                    O(i.$slots, "description", {}, void 0, !0)
                  ]),
                  le(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: i.link.to
                  }, {
                    default: ee(() => [
                      H(h(i.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              O(i.$slots, "default", {}, void 0, !0),
              (u(!0), f(U, null, te(i.menus, (m, v) => (u(), j(Mn, G({
                key: v,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, Qd)
      ], 64);
    };
  }
}), Bn = /* @__PURE__ */ we(ec, [["__scopeId", "data-v-1e103394"]]), tc = ["id", "aria-current"], Sn = /* @__PURE__ */ q({
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
      O(e.$slots, "default")
    ], 8, tc));
  }
}), ac = ["aria-expanded", "aria-current", "aria-controls"], nc = ["id"], rc = { class: "fr-menu__list" }, An = /* @__PURE__ */ q({
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
    }), (i, d) => (u(), f(U, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": o.value,
        "aria-current": i.active || void 0,
        "aria-controls": i.id,
        onClick: d[0] || (d[0] = (p) => i.$emit("toggleId", i.id))
      }, [
        c("span", null, h(i.title), 1)
      ], 8, ac),
      c("div", {
        id: i.id,
        ref_key: "collapse",
        ref: t,
        class: V(["fr-collapse fr-menu", { "fr-collapse--expanded": Q(r), "fr-collapsing": Q(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => Q(s)(o.value))
      }, [
        c("ul", rc, [
          O(i.$slots, "default"),
          (u(!0), f(U, null, te(i.links, (p, m) => (u(), j(Sn, { key: m }, {
            default: ee(() => [
              le(Rt, G({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (v) => i.$emit("toggleId", i.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, nc)
    ], 64));
  }
}), lc = ["id", "aria-label"], sc = { class: "fr-nav__list" }, oc = /* @__PURE__ */ q({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => oe("nav") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(a) {
    const e = a, t = z(void 0), n = (o) => {
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
      c("ul", sc, [
        O(o.$slots, "default"),
        (u(!0), f(U, null, te(o.navItems, (d, p) => (u(), j(Ln, {
          id: d.id,
          key: p
        }, {
          default: ee(() => [
            d.to && d.text ? (u(), j(Rt, G({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": t.value,
              onToggleId: i[0] || (i[0] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (u(), j(An, G({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": t.value,
              onToggleId: i[1] || (i[1] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (u(), j(Bn, G({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": t.value,
              onToggleId: i[2] || (i[2] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : k("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, lc));
  }
}), ic = { class: "fr-container" }, uc = { class: "fr-notice__body" }, dc = { class: "fr-notice__title" }, cc = { class: "fr-notice__desc" }, fc = /* @__PURE__ */ q({
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
      class: V(["fr-notice", `fr-notice--${e.type}`])
    }, [
      c("div", ic, [
        c("div", uc, [
          c("p", null, [
            c("span", dc, [
              O(e.$slots, "default", {}, () => [
                H(h(e.title), 1)
              ])
            ]),
            c("span", cc, [
              O(e.$slots, "desc", {}, () => [
                H(h(e.desc), 1)
              ])
            ])
          ]),
          e.closeable ? (u(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: t[0] || (t[0] = (n) => e.$emit("close"))
          }, " Masquer le message ")) : k("", !0)
        ])
      ])
    ], 2));
  }
}), pc = ["aria-label"], vc = { class: "fr-content-media__img" }, mc = ["src", "alt", "title", "ratio"], hc = { class: "fr-content-media__caption" }, bc = /* @__PURE__ */ q({
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
      class: V(["fr-content-media", {
        "fr-content-media--sm": e.size === "small",
        "fr-content-media--lg": e.size === "large"
      }]),
      role: "group",
      "aria-label": e.legend
    }, [
      c("div", vc, [
        O(e.$slots, "default", {}, () => [
          e.src ? (u(), f("img", {
            key: 0,
            src: e.src,
            class: V(["fr-responsive-img", `fr-ratio-${e.ratio}`]),
            alt: e.alt,
            title: e.title,
            ratio: e.ratio
          }, null, 10, mc)) : k("", !0)
        ])
      ]),
      c("figcaption", hc, h(e.legend), 1)
    ], 10, pc));
  }
}), gc = { class: "fr-quote fr-quote--column" }, yc = ["cite"], kc = { class: "fr-quote__author" }, wc = { class: "fr-quote__source" }, _c = ["href"], Tc = {
  key: 0,
  class: "fr-quote__image"
}, xc = ["src"], Dc = /* @__PURE__ */ q({
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
    return (e, t) => (u(), f("figure", gc, [
      e.source ? (u(), f("blockquote", {
        key: 0,
        cite: e.sourceUrl
      }, [
        c("p", null, "« " + h(e.quote) + " »", 1)
      ], 8, yc)) : k("", !0),
      c("figcaption", null, [
        c("p", kc, h(e.author), 1),
        c("ul", wc, [
          c("li", null, [
            c("cite", null, h(e.source), 1)
          ]),
          (u(!0), f(U, null, te(e.details, (n, r) => (u(), f("li", { key: r }, [
            typeof n == "object" ? (u(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, h(n.label), 9, _c)) : (u(), f(U, { key: 1 }, [
              H(h(n), 1)
            ], 64))
          ]))), 128))
        ]),
        e.quoteImage ? (u(), f("div", Tc, [
          c("img", {
            src: e.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, xc)
        ])) : k("", !0)
      ])
    ]));
  }
}), Ic = ["id", "name", "value", "checked", "disabled"], Pc = ["for"], Cc = {
  key: 0,
  class: "required"
}, Ec = {
  key: 0,
  class: "fr-hint-text"
}, Lc = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, Mc = ["src", "title"], Bc = { key: 0 }, Sc = ["href"], Ac = ["href"], Fc = ["href"], Fn = /* @__PURE__ */ q({
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
      class: V(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: V(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": r.small
        }])
      }, [
        c("input", G({
          id: r.id,
          type: "radio",
          name: r.name,
          value: r.value,
          checked: r.modelValue === r.value,
          disabled: r.disabled
        }, r.$attrs, {
          onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
        }), null, 16, Ic),
        c("label", {
          for: r.id,
          class: "fr-label"
        }, [
          O(r.$slots, "label", {}, () => [
            H(h(r.label) + " ", 1),
            O(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (u(), f("span", Cc, " *")) : k("", !0)
            ])
          ]),
          r.hint ? (u(), f("span", Ec, h(r.hint), 1)) : k("", !0)
        ], 8, Pc),
        r.img || r.svgPath ? (u(), f("div", Lc, [
          r.img ? (u(), f("img", {
            key: 0,
            src: r.img,
            class: "fr-artwork",
            alt: "",
            title: r.imgTitle
          }, null, 8, Mc)) : (u(), f("svg", G({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...t, ...r.svgAttrs }), [
            r.imgTitle ? (u(), f("title", Bc, h(r.imgTitle), 1)) : k("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${r.svgPath}#artwork-decorative`
            }, null, 8, Sc),
            c("use", {
              class: "fr-artwork-minor",
              href: `${r.svgPath}#artwork-minor`
            }, null, 8, Ac),
            c("use", {
              class: "fr-artwork-major",
              href: `${r.svgPath}#artwork-major`
            }, null, 8, Fc)
          ], 16))
        ])) : k("", !0)
      ], 2)
    ], 2));
  }
}), Oc = { class: "fr-form-group" }, $c = ["disabled", "aria-labelledby", "aria-describedby", "aria-invalid", "role"], Rc = ["id"], Nc = {
  key: 0,
  class: "fr-hint-text"
}, Vc = {
  key: 0,
  class: "required"
}, qc = ["id"], jc = /* @__PURE__ */ q({
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
    return (i, d) => (u(), f("div", Oc, [
      c("fieldset", {
        class: V(["fr-fieldset", {
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
          O(i.$slots, "legend", {}, () => [
            H(h(i.legend) + " ", 1),
            i.hint || i.$slots.hint ? (u(), f("span", Nc, [
              O(i.$slots, "hint", {}, () => [
                H(h(i.hint), 1)
              ])
            ])) : k("", !0),
            O(i.$slots, "required-tip", {}, () => [
              i.required ? (u(), f("span", Vc, " *")) : k("", !0)
            ])
          ])
        ], 8, Rc)) : k("", !0),
        O(i.$slots, "default", {}, () => [
          (u(!0), f(U, null, te(i.options, (p, m) => (u(), j(Fn, G({
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
            class: V(["fr-message fr-message--info flex items-center", l.value])
          }, h(r.value), 3)
        ], 8, qc)) : k("", !0)
      ], 10, $c)
    ]));
  }
}), Hc = ["id"], Kc = ["id"], Wc = { class: "fr-hint-text" }, Yc = ["data-fr-prefix", "data-fr-suffix"], Qc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], zc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Gc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Xc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Uc = ["id"], Zc = ["id"], Jc = /* @__PURE__ */ q({
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
    const t = a, n = e, r = z(), l = z(), s = z(), o = w(() => t.lowerValue !== void 0), i = w(() => t.step !== void 0), d = w(() => {
      if (t.lowerValue === void 0) {
        const v = (t.modelValue - t.min) / (t.max - t.min) * s.value;
        return `transform: translateX(${v}px) translateX(-${v / s.value * 100}%);`;
      }
      return `transform: translateX(${(t.modelValue + t.lowerValue - t.min) / 2 / (t.max - t.min) * s.value}px) translateX(-${t.lowerValue + (t.modelValue - t.lowerValue) / 2}%);`;
    }), p = w(() => {
      const v = t.max - t.min, L = (t.modelValue - t.min) / v, b = ((t.lowerValue ?? 0) - t.min) / v, S = t.small ? 12 : 24, y = (s.value - S) / (v / (t.step ?? 2)), x = o.value ? 32 * (1 - L) : 0;
      return {
        "--progress-right": `${(L * s.value + x).toFixed(2)}px`,
        ...o.value ? { "--progress-left": `${(b * s.value).toFixed(2)}px` } : {},
        ...i.value ? { "--step-width": `${Math.floor(y)}px` } : {}
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
      class: V(["fr-range-group", { "fr-range-group--error": v.message }])
    }, [
      c("label", {
        id: `${v.id}-label`,
        class: "fr-label"
      }, [
        O(v.$slots, "label", {}, () => [
          H(h(v.label), 1)
        ]),
        c("span", Wc, [
          O(v.$slots, "hint", {}, () => [
            H(h(v.hint), 1)
          ])
        ])
      ], 8, Kc),
      c("div", {
        class: V(["fr-range", {
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
        }, h(m.value), 5),
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
          onInput: L[0] || (L[0] = (b) => {
            var S;
            return n("update:lowerValue", +((S = b.target) == null ? void 0 : S.value));
          })
        }, null, 40, Qc)) : k("", !0),
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
          onInput: L[1] || (L[1] = (b) => {
            var S;
            return n("update:modelValue", +((S = b.target) == null ? void 0 : S.value));
          })
        }, null, 40, zc),
        v.hideIndicators ? k("", !0) : (u(), f("span", Gc, h(v.min), 1)),
        v.hideIndicators ? k("", !0) : (u(), f("span", Xc, h(v.max), 1))
      ], 14, Yc),
      v.message || v.$slots.messages ? (u(), f("div", {
        key: 0,
        id: `${v.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        O(v.$slots, "messages", {}, () => [
          v.message ? (u(), f("p", {
            key: 0,
            id: `${v.id}-message-error`,
            class: "fr-message fr-message--error"
          }, h(v.message), 9, Zc)) : k("", !0)
        ])
      ], 8, Uc)) : k("", !0)
    ], 10, Hc));
  }
}), ef = { class: "fr-segmented__element" }, tf = ["id", "name", "value", "checked", "disabled", "aria-disabled"], af = ["for"], nf = { key: 1 }, On = /* @__PURE__ */ q({
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
    return (r, l) => (u(), f("div", ef, [
      c("input", G({
        id: r.id,
        type: "radio",
        name: r.name,
        value: r.value,
        checked: r.modelValue === r.value,
        disabled: r.disabled,
        "aria-disabled": r.disabled
      }, r.$attrs, {
        onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
      }), null, 16, tf),
      c("label", {
        for: r.id,
        class: V(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (u(), j(Te, Pe(G({ key: 0 }, t.value)), null, 16)) : k("", !0),
        r.icon ? (u(), f("span", nf, " ")) : k("", !0),
        H(" " + h(r.label), 1)
      ], 10, af)
    ]));
  }
}), rf = { class: "fr-form-group" }, lf = ["disabled"], sf = ["id"], of = {
  key: 0,
  class: "fr-hint-text"
}, uf = { class: "fr-segmented__elements" }, df = /* @__PURE__ */ q({
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
    return (l, s) => (u(), f("div", rf, [
      c("fieldset", {
        class: V(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (u(), f("legend", {
          key: 0,
          id: l.titleId,
          class: V(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          O(l.$slots, "legend", {}, () => [
            H(h(l.legend), 1)
          ]),
          l.hint ? (u(), f("span", of, h(l.hint), 1)) : k("", !0)
        ], 10, sf)) : k("", !0),
        c("div", uf, [
          O(l.$slots, "default", {}, () => [
            (u(!0), f(U, null, te(l.options, (o, i) => (u(), j(On, G({
              key: o.value || i,
              name: l.name || o.name,
              ref_for: !0
            }, { ...o, disabled: l.disabled || o.disabled }, {
              "model-value": l.modelValue,
              "onUpdate:modelValue": s[0] || (s[0] = (d) => r(d))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, lf)
    ]));
  }
}), cf = ["for"], ff = {
  key: 0,
  class: "required"
}, pf = {
  key: 0,
  class: "fr-hint-text"
}, vf = ["id", "name", "disabled", "aria-disabled", "required"], mf = ["selected"], hf = ["selected", "value", "disabled", "aria-disabled"], bf = ["id"], gf = /* @__PURE__ */ q({
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
      class: V(["fr-select-group", { [`fr-select-group--${n.value}`]: t.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        O(r.$slots, "label", {}, () => [
          H(h(r.label) + " ", 1),
          O(r.$slots, "required-tip", {}, () => [
            r.required ? (u(), f("span", ff, " *")) : k("", !0)
          ])
        ]),
        r.hint ?? r.description ? (u(), f("span", pf, h(r.hint ?? r.description), 1)) : k("", !0)
      ], 8, cf),
      c("select", G({
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
        }, h(r.defaultUnselectedText), 9, mf),
        (u(!0), f(U, null, te(r.options, (s, o) => (u(), f("option", {
          key: o,
          selected: r.modelValue === s || typeof s == "object" && s.value === r.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, h(typeof s == "object" ? s.text : s), 9, hf))), 128))
      ], 16, vf),
      t.value ? (u(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: V(`fr-${n.value}-text`)
      }, h(t.value), 11, bf)) : k("", !0)
    ], 2));
  }
}), yf = { class: "fr-share" }, kf = { class: "fr-share__title" }, wf = { class: "fr-btns-group" }, _f = ["title", "href", "onClick"], Tf = { key: 0 }, xf = ["href", "title"], Df = ["title"], If = /* @__PURE__ */ q({
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
      return u(), f("div", yf, [
        c("p", kf, h(n.title), 1),
        c("ul", wf, [
          (u(!0), f(U, null, te(n.networks, (s, o) => (u(), f("li", { key: o }, [
            c("a", {
              class: V(`fr-btn fr-btn--${s.name}`),
              title: `${s.label} - nouvelle fenêtre`,
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: ae((i) => t(s), ["prevent"])
            }, h(s.label), 11, _f)
          ]))), 128)),
          (l = n.mail) != null && l.to ? (u(), f("li", Tf, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, h(n.mail.label), 9, xf)
          ])) : k("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: r[0] || (r[0] = (s) => e())
            }, h(n.copyLabel), 9, Df)
          ])
        ])
      ]);
    };
  }
}), Pf = ["aria-current", "aria-expanded", "aria-controls"], $n = /* @__PURE__ */ q({
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
      O(e.$slots, "default")
    ], 8, Pf));
  }
}), Rn = /* @__PURE__ */ q({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (e, t) => (u(), f("li", {
      class: V(["fr-sidemenu__item", { "fr-sidemenu__item--active": e.active }])
    }, [
      O(e.$slots, "default")
    ], 2));
  }
}), Cf = ["id"], Ef = { class: "fr-sidemenu__list" }, Nn = /* @__PURE__ */ q({
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
        class: V({
          "fr-collapse": p.collapsable,
          "fr-collapsing": Q(n),
          "fr-collapse--expanded": Q(r)
        }),
        onTransitionend: m[2] || (m[2] = (L) => Q(s)(!!p.expanded, p.focusOnExpanding))
      }, [
        c("ul", Ef, [
          O(p.$slots, "default"),
          (u(!0), f(U, null, te(p.menuItems, (L, b) => (u(), j(Rn, {
            key: b,
            active: L.active
          }, {
            default: ee(() => [
              L.menuItems ? k("", !0) : (u(), j(me(i(L.to)), G({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": L.active ? "page" : void 0,
                ref_for: !0
              }, d(L.to)), {
                default: ee(() => [
                  H(h(L.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              L.menuItems ? (u(), f(U, { key: 1 }, [
                le($n, {
                  active: !!L.active,
                  expanded: !!L.expanded,
                  "control-id": L.id,
                  onToggleExpand: m[0] || (m[0] = (S) => p.$emit("toggleExpand", S))
                }, {
                  default: ee(() => [
                    H(h(L.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                L.menuItems ? (u(), j(v, {
                  key: 0,
                  id: L.id,
                  collapsable: "",
                  expanded: L.expanded,
                  "menu-items": L.menuItems,
                  onToggleExpand: m[1] || (m[1] = (S) => p.$emit("toggleExpand", S))
                }, null, 8, ["id", "expanded", "menu-items"])) : k("", !0)
              ], 64)) : k("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, Cf);
    };
  }
}), Lf = ["aria-labelledby"], Mf = { class: "fr-sidemenu__inner" }, Bf = ["aria-controls", "aria-expanded"], Sf = ["id"], Af = /* @__PURE__ */ q({
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
    } = Ae(), s = z(!1);
    return ve(s, (o, i) => {
      o !== i && r(o);
    }), (o, i) => (u(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": o.id
    }, [
      c("div", Mf, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": o.id,
          "aria-expanded": s.value,
          onClick: i[0] || (i[0] = ae((d) => s.value = !s.value, ["prevent", "stop"]))
        }, h(o.buttonLabel), 9, Bf),
        c("div", {
          id: o.id,
          ref_key: "collapse",
          ref: e,
          class: V(["fr-collapse", {
            "fr-collapse--expanded": Q(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": Q(t)
          }]),
          onTransitionend: i[2] || (i[2] = (d) => Q(l)(s.value, o.focusOnExpanding))
        }, [
          (u(), j(me(o.titleTag), { class: "fr-sidemenu__title" }, {
            default: ee(() => [
              H(h(o.headingTitle), 1)
            ]),
            _: 1
          })),
          O(o.$slots, "default", {}, () => [
            le(Nn, {
              id: o.sideMenuListId,
              "menu-items": o.menuItems,
              onToggleExpand: i[1] || (i[1] = (d) => o.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Sf)
      ])
    ], 8, Lf));
  }
}), Ff = /* @__PURE__ */ q({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const e = a, t = w(() => typeof e.to == "string" && e.to.startsWith("http")), n = w(() => t.value ? "a" : "RouterLink"), r = w(() => ({ [t.value ? "href" : "to"]: e.to }));
    return (l, s) => (u(), j(me(n.value), G({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: ee(() => [
        O(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), Of = { class: "fr-skiplinks" }, $f = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Rf = { class: "fr-skiplinks__list" }, Nf = ["href", "onClick"], Vf = /* @__PURE__ */ q({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(a) {
    const e = (t) => {
      const n = document.getElementById(t);
      n == null || n.focus();
    };
    return (t, n) => (u(), f("div", Of, [
      c("nav", $f, [
        c("ul", Rf, [
          (u(!0), f(U, null, te(t.links, (r) => (u(), f("li", {
            key: r.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${r.id}`,
              onClick: (l) => e(r.id)
            }, h(r.text), 9, Nf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), qf = { class: "fr-stepper" }, jf = { class: "fr-stepper__title" }, Hf = { class: "fr-stepper__state" }, Kf = ["data-fr-current-step", "data-fr-steps"], Wf = { class: "fr-stepper__details" }, Yf = {
  key: 0,
  class: "fr-text--bold"
}, Qf = /* @__PURE__ */ q({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(a) {
    return (e, t) => (u(), f("div", qf, [
      c("h2", jf, [
        H(h(e.steps[e.currentStep - 1]) + " ", 1),
        c("span", Hf, "Étape " + h(e.currentStep) + " sur " + h(e.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": e.currentStep,
        "data-fr-steps": e.steps.length
      }, null, 8, Kf),
      c("p", Wf, [
        e.currentStep < e.steps.length ? (u(), f("span", Yf, "Étape suivante :")) : k("", !0),
        H(" " + h(e.steps[e.currentStep]), 1)
      ])
    ]));
  }
}), zf = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, Gf = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, Xf = { class: "fr-summary__list" }, Uf = ["href"], Zf = /* @__PURE__ */ q({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(a) {
    return (e, t) => (u(), f("nav", zf, [
      c("h2", Gf, h(e.title), 1),
      c("ol", Xf, [
        (u(!0), f(U, null, te(e.anchors, (n, r) => (u(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, h(n.name), 9, Uf)
        ]))), 128))
      ])
    ]));
  }
}), Jf = ["id", "aria-labelledby", "tabindex"], ep = /* @__PURE__ */ q({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(a) {
    Et((i) => ({
      "7152af7e": s.value,
      "2a62e962": o.value
    }));
    const e = a, t = { true: "100%", false: "-100%" }, n = Ue(At), { isVisible: r, asc: l } = n(ft(() => e.tabId)), s = w(() => t[String(l == null ? void 0 : l.value)]), o = w(() => t[String(!(l != null && l.value))]);
    return (i, d) => (u(), j(Tr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: ee(() => [
        Be(c("div", {
          id: i.panelId,
          class: V(["fr-tabs__panel", {
            "fr-tabs__panel--selected": Q(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": i.tabId,
          tabindex: Q(r) ? 0 : -1
        }, [
          O(i.$slots, "default", {}, void 0, !0)
        ], 10, Jf), [
          [xr, Q(r)]
        ])
      ]),
      _: 3
    }));
  }
}), Vn = /* @__PURE__ */ we(ep, [["__scopeId", "data-v-5774b16c"]]), tp = { role: "presentation" }, ap = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], np = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, qn = /* @__PURE__ */ q({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: e }) {
    const t = a, n = e, r = z(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      Home: "first",
      End: "last"
    };
    function s(p) {
      const m = p == null ? void 0 : p.key, v = l[m];
      v && n(v);
    }
    const o = Ue(At), { isVisible: i } = o(ft(() => t.tabId)), d = kr("button");
    return ve(i, () => {
      var p;
      i.value && ((p = d.value) == null || p.focus());
    }), (p, m) => (u(), f("li", tp, [
      c("button", G(p.$attrs, {
        id: p.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${p.tabId}`,
        class: "fr-tabs__tab",
        tabindex: Q(i) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": Q(i),
        "aria-controls": p.panelId,
        onClick: m[0] || (m[0] = ae((v) => p.$emit("click", p.tabId), ["prevent"])),
        onKeydown: m[1] || (m[1] = (v) => s(v))
      }), [
        p.icon ? (u(), f("span", np, [
          le(Te, { name: p.icon }, null, 8, ["name"])
        ])) : k("", !0),
        O(p.$slots, "default")
      ], 16, ap)
    ]));
  }
}), jn = /* @__PURE__ */ q({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const e = a, t = w(() => e.icon && typeof e.icon == "string" && e.icon.startsWith("fr-") ? e.icon : ""), n = w(() => t.value ? void 0 : typeof e.icon == "string" ? { name: e.icon } : e.icon);
    return (r, l) => (u(), f("th", G(r.headerAttrs, { scope: "col" }), [
      H(h(r.header) + " ", 1),
      r.icon && !t.value ? (u(), j(Te, Pe(G({ key: 0 }, n.value)), null, 16)) : k("", !0),
      t.value ? (u(), f("span", {
        key: 1,
        class: V({ [String(r.icon)]: t.value })
      }, null, 2)) : k("", !0)
    ], 16));
  }
}), rp = { key: 0 }, Hn = /* @__PURE__ */ q({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (e, t) => e.headers ? (u(), f("tr", rp, [
      (u(!0), f(U, null, te(e.headers, (n, r) => (u(), j(jn, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : k("", !0);
  }
}), Kn = /* @__PURE__ */ q({
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
    return (r, l) => (u(), f("td", Pe(Mt(r.cellAttrs)), [
      t.value ? (u(), j(me(t.value), Pe(G({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: ee(() => [
          H(h(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (u(), f(U, { key: 1 }, [
        H(h(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Wn = /* @__PURE__ */ q({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (e, t) => (u(), f("tr", Pe(Mt(e.rowAttrs)), [
      O(e.$slots, "default"),
      (u(!0), f(U, null, te(e.rowData, (n, r) => (u(), j(Kn, {
        key: r,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), lp = { class: "caption" }, sp = { key: 1 }, op = ["colspan"], ip = { class: "flex justify-right" }, up = { class: "self-center" }, dp = ["for"], cp = ["id"], fp = ["value"], pp = {
  class: "flex ml-1",
  "aria-live": "polite",
  "aria-atomic": "true"
}, vp = { class: "self-center fr-m-0" }, mp = { class: "flex ml-1" }, hp = /* @__PURE__ */ q({
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
    const t = a, n = e, r = (x) => Array.isArray(x) ? x : x.rowData, l = z(t.currentPage), s = oe("resultPerPage"), o = z(t.resultsDisplayed), i = w(
      () => t.rows.length > o.value ? Math.ceil(t.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * o.value - o.value, m = () => l.value * o.value, v = w(() => t.pagination ? t.rows.slice(p(), m()) : t.rows), L = () => {
      l.value = 1, n("update:currentPage");
    }, b = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, S = () => {
      l.value < i.value && (l.value += 1, n("update:currentPage"));
    }, y = () => {
      l.value = i.value, n("update:currentPage");
    };
    return (x, E) => (u(), f("div", {
      class: V(["fr-table", { "fr-table--no-caption": x.noCaption }])
    }, [
      c("table", null, [
        c("caption", lp, h(x.title), 1),
        c("thead", null, [
          O(x.$slots, "header", {}, () => [
            x.headers && x.headers.length ? (u(), j(Hn, {
              key: 0,
              headers: x.headers
            }, null, 8, ["headers"])) : k("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          O(x.$slots, "default", {}, void 0, !0),
          x.rows && x.rows.length ? (u(!0), f(U, { key: 0 }, te(v.value, (A, D) => (u(), j(Wn, {
            key: x.rowKey && r(A) ? typeof x.rowKey == "string" ? r(A)[x.headers.indexOf(x.rowKey)].toString() : x.rowKey(r(A)) : D,
            "row-data": r(A),
            "row-attrs": "rowAttrs" in A ? A.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : k("", !0),
          x.pagination ? (u(), f("tr", sp, [
            c("td", {
              colspan: x.headers.length
            }, [
              c("div", ip, [
                c("div", up, [
                  c("label", { for: Q(s) }, "Résultats par page : ", 8, dp),
                  Be(c("select", {
                    id: Q(s),
                    "onUpdate:modelValue": E[0] || (E[0] = (A) => o.value = A),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: E[1] || (E[1] = (A) => n("update:currentPage"))
                  }, [
                    (u(), f(U, null, te(d, (A, D) => c("option", {
                      key: D,
                      value: A
                    }, h(A), 9, fp)), 64))
                  ], 40, cp), [
                    [la, o.value]
                  ])
                ]),
                c("div", pp, [
                  c("p", vp, " Page " + h(l.value) + " sur " + h(i.value), 1)
                ]),
                c("div", mp, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: E[2] || (E[2] = (A) => L())
                  }, E[6] || (E[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: E[3] || (E[3] = (A) => b())
                  }, E[7] || (E[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: E[4] || (E[4] = (A) => S())
                  }, E[8] || (E[8] = [
                    c("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: E[5] || (E[5] = (A) => y())
                  }, E[9] || (E[9] = [
                    c("span", { class: "fr-sr-only" }, "Dernière page du tableau", -1)
                  ]))
                ])
              ])
            ], 8, op)
          ])) : k("", !0)
        ])
      ])
    ], 2));
  }
}), bp = /* @__PURE__ */ we(hp, [["__scopeId", "data-v-129bf2b7"]]), gp = ["aria-label"], yp = /* @__PURE__ */ q({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: e, emit: t }) {
    const n = a, r = t, l = z(!1), s = w({
      get: () => n.modelValue,
      set(D) {
        r("update:modelValue", D);
      }
    }), o = z(/* @__PURE__ */ new Map()), i = z(0);
    Re(At, (D) => {
      const K = z(!0);
      if (ve(s, (N, I) => {
        K.value = N > I;
      }), [...o.value.values()].includes(D.value))
        return { isVisible: w(() => o.value.get(s.value) === D.value), asc: K };
      const R = i.value++;
      o.value.set(R, D.value);
      const C = w(() => R === s.value);
      return ve(D, () => {
        o.value.set(R, D.value);
      }), Ce(() => {
        o.value.delete(R);
      }), { isVisible: C };
    });
    const d = z(null), p = z(null), m = yr({}), v = (D) => {
      if (m[D])
        return m[D];
      const K = oe("tab");
      return m[D] = K, K;
    }, L = async () => {
      const D = s.value === 0 ? n.tabTitles.length - 1 : s.value - 1;
      l.value = !1, s.value = D;
    }, b = async () => {
      const D = s.value === n.tabTitles.length - 1 ? 0 : s.value + 1;
      l.value = !0, s.value = D;
    }, S = async () => {
      s.value = 0;
    }, y = async () => {
      s.value = n.tabTitles.length - 1;
    }, x = z({ "--tabs-height": "100px" }), E = () => {
      var D;
      if (s.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const K = p.value.offsetHeight, R = (D = d.value) == null ? void 0 : D.querySelectorAll(".fr-tabs__panel")[s.value];
      if (!R || !R.offsetHeight)
        return;
      const C = R.offsetHeight;
      x.value["--tabs-height"] = `${K + C}px`;
    }, A = z(null);
    return ke(() => {
      var D;
      window.ResizeObserver && (A.value = new window.ResizeObserver(() => {
        E();
      })), (D = d.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((K) => {
        var R;
        K && ((R = A.value) == null || R.observe(K));
      });
    }), Ce(() => {
      var D;
      (D = d.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((K) => {
        var R;
        K && ((R = A.value) == null || R.unobserve(K));
      });
    }), e({
      renderTabs: E,
      selectFirst: S,
      selectLast: y
    }), (D, K) => (u(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: Ie(x.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": D.tabListName
      }, [
        O(D.$slots, "tab-items", {}, () => [
          (u(!0), f(U, null, te(D.tabTitles, (R, C) => (u(), j(qn, {
            key: C,
            icon: R.icon,
            "panel-id": R.panelId || `${v(C)}-panel`,
            "tab-id": R.tabId || v(C),
            onClick: (N) => s.value = C,
            onNext: K[0] || (K[0] = (N) => b()),
            onPrevious: K[1] || (K[1] = (N) => L()),
            onFirst: K[2] || (K[2] = (N) => S()),
            onLast: K[3] || (K[3] = (N) => y())
          }, {
            default: ee(() => [
              H(h(R.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, gp),
      (u(!0), f(U, null, te(D.tabContents, (R, C) => {
        var N, I, M, T;
        return u(), j(Vn, {
          key: C,
          "panel-id": ((I = (N = D.tabTitles) == null ? void 0 : N[C]) == null ? void 0 : I.panelId) || `${v(C)}-panel`,
          "tab-id": ((T = (M = D.tabTitles) == null ? void 0 : M[C]) == null ? void 0 : T.tabId) || v(C)
        }, {
          default: ee(() => [
            H(h(R), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      O(D.$slots, "default")
    ], 4));
  }
}), kp = /* @__PURE__ */ q({
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
    return (i, d) => (u(), j(me(n.value), G({
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
        e.icon && !l.value ? (u(), j(Te, G({
          key: 0,
          label: i.iconOnly ? i.label : void 0,
          class: { "fr-mr-1v": !i.iconOnly }
        }, o.value), null, 16, ["label", "class"])) : k("", !0),
        i.iconOnly ? k("", !0) : (u(), f(U, { key: 1 }, [
          H(h(i.label), 1)
        ], 64)),
        O(i.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class", "aria-pressed"]));
  }
}), fa = /* @__PURE__ */ we(kp, [["__scopeId", "data-v-0cada598"]]), wp = { class: "fr-tags-group" }, _p = /* @__PURE__ */ q({
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
    return (l, s) => (u(), f("ul", wp, [
      (u(!0), f(U, null, te(l.tags, ({ icon: o, label: i, ...d }, p) => {
        var m;
        return u(), f("li", { key: p }, [
          le(fa, G({ ref_for: !0 }, d, {
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
}), Tp = { class: "fr-tile__body" }, xp = { class: "fr-tile__content" }, Dp = ["download", "href"], Ip = {
  key: 0,
  class: "fr-tile__desc"
}, Pp = {
  key: 1,
  class: "fr-tile__detail"
}, Cp = {
  key: 2,
  class: "fr-tile__start"
}, Ep = { class: "fr-tile__header" }, Lp = {
  key: 0,
  class: "fr-tile__pictogram"
}, Mp = ["src"], Bp = ["href"], Sp = ["href"], Ap = ["href"], Fp = /* @__PURE__ */ q({
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
        class: V(["fr-tile fr-enlarge-link", [{
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
        c("div", Tp, [
          c("div", xp, [
            (u(), j(me(r.titleTag), { class: "fr-tile__title" }, {
              default: ee(() => [
                n.value ? (u(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, h(r.title), 9, Dp)) : k("", !0),
                n.value ? k("", !0) : (u(), j(s, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: ee(() => [
                    H(h(r.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            r.description ? (u(), f("p", Ip, h(r.description), 1)) : k("", !0),
            r.details ? (u(), f("p", Pp, h(r.details), 1)) : k("", !0),
            r.$slots["start-details"] ? (u(), f("div", Cp, [
              O(r.$slots, "start-details", {}, void 0, !0)
            ])) : k("", !0)
          ])
        ]),
        c("div", Ep, [
          O(r.$slots, "header", {}, void 0, !0),
          r.imgSrc || r.svgPath ? (u(), f("div", Lp, [
            r.imgSrc ? (u(), f("img", {
              key: 0,
              src: r.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, Mp)) : (u(), f("svg", G({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...t, ...r.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${r.svgPath}#artwork-decorative`
              }, null, 8, Bp),
              c("use", {
                class: "fr-artwork-minor",
                href: `${r.svgPath}#artwork-minor`
              }, null, 8, Sp),
              c("use", {
                class: "fr-artwork-major",
                href: `${r.svgPath}#artwork-major`
              }, null, 8, Ap)
            ], 16))
          ])) : k("", !0)
        ])
      ], 2);
    };
  }
}), Yn = /* @__PURE__ */ we(Fp, [["__scopeId", "data-v-f4d836a2"]]), Op = { class: "fr-grid-row fr-grid-row--gutters" }, $p = /* @__PURE__ */ q({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (e, t) => (u(), f("div", Op, [
      (u(!0), f(U, null, te(e.tiles, (n, r) => (u(), f("div", {
        key: r,
        class: V({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !e.horizontal,
          "fr-col-12": e.horizontal
        })
      }, [
        le(Yn, G({
          horizontal: e.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Rp = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Np = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Vp = ["id"], qp = /* @__PURE__ */ q({
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
      class: V(["fr-toggle", {
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
      }, h(n.label), 9, Np),
      n.hint ? (u(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, h(n.hint), 9, Vp)) : k("", !0)
    ], 2));
  }
}), jp = ["id"], Hp = /* @__PURE__ */ q({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => oe("tooltip") }
  },
  setup(a) {
    const e = a, t = z(!1), n = z(null), r = z(null), l = z("0px"), s = z("0px"), o = z("0px"), i = z(!1), d = z(0);
    async function p() {
      var E, A, D, K, R, C, N, I;
      if (typeof document > "u" || typeof window > "u" || !t.value)
        return;
      await new Promise((ie) => setTimeout(ie, 100));
      const M = (E = n.value) == null ? void 0 : E.getBoundingClientRect().top, T = (A = n.value) == null ? void 0 : A.offsetHeight, g = (D = n.value) == null ? void 0 : D.offsetWidth, _ = (K = n.value) == null ? void 0 : K.getBoundingClientRect().left, B = (R = r.value) == null ? void 0 : R.offsetHeight, P = (C = r.value) == null ? void 0 : C.offsetWidth, F = (N = r.value) == null ? void 0 : N.offsetTop, $ = (I = r.value) == null ? void 0 : I.offsetLeft, Z = M + T + B >= window.innerHeight;
      i.value = Z;
      const X = _ + g / 2 + P / 2 >= document.documentElement.offsetWidth, se = _ + g / 2 - P / 2 < 0;
      s.value = Z ? `${M - F - B + 8}px` : `${M - F + T - 8}px`, d.value = 1, l.value = X ? `${_ - $ + g - P - 4}px` : se ? `${_ - $ + 4}px` : `${_ - $ + g / 2 - P / 2}px`, o.value = X ? `${P / 2 - g / 2 + 4}px` : se ? `${-(P / 2) + g / 2 - 4}px` : "0px";
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
      var A, D;
      t.value && (E.target === n.value || (A = n.value) != null && A.contains(E.target) || E.target === r.value || (D = r.value) != null && D.contains(E.target) || (t.value = !1));
    }, b = (E) => {
      E.key === "Escape" && (t.value = !1);
    }, S = (E) => {
      var A;
      e.onHover && (E.target === n.value || (A = n.value) != null && A.contains(E.target)) && (t.value = !0, globalThis.__vueDsfr__lastTooltipShow && (globalThis.__vueDsfr__lastTooltipShow.value = !1));
    }, y = () => {
      e.onHover && (t.value = !1);
    }, x = () => {
      e.onHover || (t.value = !0, globalThis.__vueDsfr__lastTooltipShow = t);
    };
    return ke(() => {
      document.documentElement.addEventListener("click", L), document.documentElement.addEventListener("keydown", b), document.documentElement.addEventListener("mouseover", S);
    }), Ce(() => {
      document.documentElement.removeEventListener("click", L), document.documentElement.removeEventListener("keydown", b), document.documentElement.removeEventListener("mouseover", S);
    }), (E, A) => (u(), f(U, null, [
      (u(), j(me(E.onHover ? "a" : "button"), G(E.$attrs, {
        id: `link-${E.id}`,
        ref_key: "source",
        ref: n,
        class: E.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": E.id,
        href: E.onHover ? "#" : void 0,
        onClick: A[0] || (A[0] = (D) => x()),
        onMouseleave: A[1] || (A[1] = (D) => y()),
        onFocus: A[2] || (A[2] = (D) => S(D)),
        onBlur: A[3] || (A[3] = (D) => y())
      }), {
        default: ee(() => [
          O(E.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: E.id,
        ref_key: "tooltip",
        ref: r,
        class: V(["fr-tooltip fr-placement", v.value]),
        style: Ie(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, h(E.content), 15, jp)
    ], 64));
  }
}), Kp = /* @__PURE__ */ we(Hp, [["__scopeId", "data-v-70cada30"]]), Wp = { class: "fr-transcription" }, Yp = ["aria-expanded", "aria-controls"], Qp = ["id"], zp = ["id", "aria-labelledby"], Gp = { class: "fr-container fr-container--fluid fr-container-md" }, Xp = { class: "fr-grid-row fr-grid-row--center" }, Up = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Zp = { class: "fr-modal__body" }, Jp = { class: "fr-modal__header" }, ev = ["aria-controls"], tv = { class: "fr-modal__content" }, av = ["id"], nv = { class: "fr-transcription__footer" }, rv = { class: "fr-transcription__actions-group" }, lv = ["aria-controls"], Qn = /* @__PURE__ */ q({
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
    } = Ae(), o = z(!1), i = z(!1), d = w(() => `fr-transcription__modal-${e.id}`), p = w(() => `fr-transcription__collapse-${e.id}`);
    return ve(i, (m, v) => {
      m !== v && l(m);
    }), (m, v) => (u(), f("div", Wp, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": i.value,
        "aria-controls": p.value,
        onClick: v[0] || (v[0] = (L) => i.value = !i.value)
      }, " Transcription ", 8, Yp),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: t,
        class: V(["fr-collapse", { "fr-collapse--expanded": Q(r), "fr-collapsing": Q(n) }]),
        onTransitionend: v[2] || (v[2] = (L) => Q(s)(i.value))
      }, [
        c("dialog", {
          id: d.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${d.value}-title`
        }, [
          c("div", Gp, [
            c("div", Xp, [
              c("div", Up, [
                c("div", Zp, [
                  c("div", Jp, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": d.value,
                      title: "Fermer"
                    }, " Fermer ", 8, ev)
                  ]),
                  c("div", tv, [
                    c("h1", {
                      id: `${d.value}-title`,
                      class: "fr-modal__title"
                    }, h(m.title), 9, av),
                    H(" " + h(m.content), 1)
                  ]),
                  c("div", nv, [
                    c("div", rv, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: v[1] || (v[1] = (L) => o.value = !0)
                      }, " Agrandir ", 8, lv)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, zp)
      ], 42, Qp),
      (u(), j(gr, { to: "body" }, [
        le(En, {
          title: m.title,
          opened: o.value,
          onClose: v[3] || (v[3] = (L) => o.value = !1)
        }, {
          default: ee(() => [
            O(m.$slots, "default", {}, () => [
              H(h(m.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), sv = ["src"], ov = { class: "fr-content-media__caption" }, iv = /* @__PURE__ */ q({
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
    return (e, t) => (u(), f(U, null, [
      c("figure", {
        class: V(["fr-content-media", {
          "fr-content-media--sm": e.size === "small",
          "fr-content-media--lg": e.size === "large"
        }])
      }, [
        c("div", {
          class: V(["fr-responsive-vid", `fr-ratio-${e.ratio}`])
        }, [
          c("iframe", {
            src: e.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, sv)
        ], 2),
        c("div", ov, h(e.legend), 1)
      ], 2),
      le(Qn, {
        title: e.transcriptionTitle,
        content: e.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), uv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: Ll,
  DsfrAccordionsGroup: Bl,
  DsfrAlert: Rl,
  DsfrBackToTop: Nl,
  DsfrBadge: vn,
  DsfrBreadcrumb: Yl,
  DsfrButton: He,
  DsfrButtonGroup: Ft,
  DsfrCallout: es,
  DsfrCard: vs,
  DsfrCardDetail: zt,
  DsfrCheckbox: Ot,
  DsfrCheckboxSet: Is,
  DsfrConsent: Ls,
  DsfrDataTable: bo,
  DsfrErrorPage: Do,
  DsfrFieldset: hn,
  DsfrFileDownload: bn,
  DsfrFileDownloadList: Ao,
  DsfrFileUpload: qo,
  DsfrFollow: ii,
  DsfrFooter: $i,
  DsfrFooterLink: kn,
  DsfrFooterLinkList: Vi,
  DsfrFooterPartners: wn,
  DsfrFranceConnect: Hi,
  DsfrHeader: ud,
  DsfrHeaderMenuLink: ca,
  DsfrHeaderMenuLinks: Ut,
  DsfrHighlight: dd,
  DsfrInput: $t,
  DsfrInputGroup: hd,
  DsfrLanguageSelector: dt,
  DsfrLogo: Ke,
  DsfrModal: En,
  DsfrMultiselect: Nd,
  DsfrNavigation: oc,
  DsfrNavigationItem: Ln,
  DsfrNavigationMegaMenu: Bn,
  DsfrNavigationMegaMenuCategory: Mn,
  DsfrNavigationMenu: An,
  DsfrNavigationMenuItem: Sn,
  DsfrNavigationMenuLink: Rt,
  DsfrNewsLetter: gn,
  DsfrNotice: fc,
  DsfrPagination: mn,
  DsfrPicture: bc,
  DsfrQuote: Dc,
  DsfrRadioButton: Fn,
  DsfrRadioButtonSet: jc,
  DsfrRange: Jc,
  DsfrSearchBar: ct,
  DsfrSegmented: On,
  DsfrSegmentedSet: df,
  DsfrSelect: gf,
  DsfrShare: If,
  DsfrSideMenu: Af,
  DsfrSideMenuButton: $n,
  DsfrSideMenuLink: Ff,
  DsfrSideMenuList: Nn,
  DsfrSideMenuListItem: Rn,
  DsfrSkipLinks: Vf,
  DsfrSocialNetworks: yn,
  DsfrStepper: Qf,
  DsfrSummary: Zf,
  DsfrTabContent: Vn,
  DsfrTabItem: qn,
  DsfrTable: bp,
  DsfrTableCell: Kn,
  DsfrTableHeader: jn,
  DsfrTableHeaders: Hn,
  DsfrTableRow: Wn,
  DsfrTabs: yp,
  DsfrTag: fa,
  DsfrTags: _p,
  DsfrTile: Yn,
  DsfrTiles: $p,
  DsfrToggleSwitch: qp,
  DsfrTooltip: Kp,
  DsfrTranscription: Qn,
  DsfrVideo: iv,
  VIcon: Te,
  registerAccordionKey: ua,
  registerNavigationLinkKey: da,
  registerTabKey: At
}, Symbol.toStringTag, { value: "Module" })), dv = {
  install: (a, { components: e } = {}) => {
    Object.entries(uv).forEach(([t, n]) => {
      (e === void 0 || e === "all" || e.map(({ name: r }) => r).includes(t)) && a.component(t, n);
    }), a.component("VIcon", Te);
  }
}, zn = 6048e5, cv = 864e5, fv = 6e4, pv = 36e5, vv = 1e3, Va = Symbol.for("constructDateFrom");
function _e(a, e) {
  return typeof a == "function" ? a(e) : a && typeof a == "object" && Va in a ? a[Va](e) : a instanceof Date ? new a.constructor(e) : new Date(e);
}
function ye(a, e) {
  return _e(e || a, a);
}
function Gn(a, e, t) {
  const n = ye(a, t == null ? void 0 : t.in);
  return isNaN(e) ? _e((t == null ? void 0 : t.in) || a, NaN) : (e && n.setDate(n.getDate() + e), n);
}
let mv = {};
function et() {
  return mv;
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
  const t = ye(a, e == null ? void 0 : e.in), n = t.getFullYear(), r = _e(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Je(r), s = _e(t, 0);
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
function hv(a, ...e) {
  const t = _e.bind(
    null,
    e.find((n) => typeof n == "object")
  );
  return e.map(t);
}
function qa(a, e) {
  const t = ye(a, e == null ? void 0 : e.in);
  return t.setHours(0, 0, 0, 0), t;
}
function bv(a, e, t) {
  const [n, r] = hv(
    t == null ? void 0 : t.in,
    a,
    e
  ), l = qa(n), s = qa(r), o = +l - Tt(l), i = +s - Tt(s);
  return Math.round((o - i) / cv);
}
function gv(a, e) {
  const t = Xn(a, e), n = _e(a, 0);
  return n.setFullYear(t, 0, 4), n.setHours(0, 0, 0, 0), Je(n);
}
function yv(a) {
  return a instanceof Date || typeof a == "object" && Object.prototype.toString.call(a) === "[object Date]";
}
function kv(a) {
  return !(!yv(a) && typeof a != "number" || isNaN(+ye(a)));
}
function wv(a, e) {
  const t = ye(a, e == null ? void 0 : e.in);
  return t.setFullYear(t.getFullYear(), 0, 1), t.setHours(0, 0, 0, 0), t;
}
const _v = {
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
}, Tv = (a, e, t) => {
  let n;
  const r = _v[a];
  return typeof r == "string" ? n = r : e === 1 ? n = r.one : n = r.other.replace("{{count}}", e.toString()), t != null && t.addSuffix ? t.comparison && t.comparison > 0 ? "in " + n : n + " ago" : n;
};
function jt(a) {
  return (e = {}) => {
    const t = e.width ? String(e.width) : a.defaultWidth;
    return a.formats[t] || a.formats[a.defaultWidth];
  };
}
const xv = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Dv = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Iv = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Pv = {
  date: jt({
    formats: xv,
    defaultWidth: "full"
  }),
  time: jt({
    formats: Dv,
    defaultWidth: "full"
  }),
  dateTime: jt({
    formats: Iv,
    defaultWidth: "full"
  })
}, Cv = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Ev = (a, e, t, n) => Cv[a];
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
const Lv = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, Mv = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Bv = {
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
}, Sv = {
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
}, Av = {
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
}, Fv = {
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
}, Ov = (a, e) => {
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
}, $v = {
  ordinalNumber: Ov,
  era: rt({
    values: Lv,
    defaultWidth: "wide"
  }),
  quarter: rt({
    values: Mv,
    defaultWidth: "wide",
    argumentCallback: (a) => a - 1
  }),
  month: rt({
    values: Bv,
    defaultWidth: "wide"
  }),
  day: rt({
    values: Sv,
    defaultWidth: "wide"
  }),
  dayPeriod: rt({
    values: Av,
    defaultWidth: "wide",
    formattingValues: Fv,
    defaultFormattingWidth: "wide"
  })
};
function lt(a) {
  return (e, t = {}) => {
    const n = t.width, r = n && a.matchPatterns[n] || a.matchPatterns[a.defaultMatchWidth], l = e.match(r);
    if (!l)
      return null;
    const s = l[0], o = n && a.parsePatterns[n] || a.parsePatterns[a.defaultParseWidth], i = Array.isArray(o) ? Nv(o, (m) => m.test(s)) : (
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
function Nv(a, e) {
  for (let t = 0; t < a.length; t++)
    if (e(a[t]))
      return t;
}
function Vv(a) {
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
const qv = /^(\d+)(th|st|nd|rd)?/i, jv = /\d+/i, Hv = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Kv = {
  any: [/^b/i, /^(a|c)/i]
}, Wv = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Yv = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Qv = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, zv = {
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
}, Gv = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Xv = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Uv = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Zv = {
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
}, Jv = {
  ordinalNumber: Vv({
    matchPattern: qv,
    parsePattern: jv,
    valueCallback: (a) => parseInt(a, 10)
  }),
  era: lt({
    matchPatterns: Hv,
    defaultMatchWidth: "wide",
    parsePatterns: Kv,
    defaultParseWidth: "any"
  }),
  quarter: lt({
    matchPatterns: Wv,
    defaultMatchWidth: "wide",
    parsePatterns: Yv,
    defaultParseWidth: "any",
    valueCallback: (a) => a + 1
  }),
  month: lt({
    matchPatterns: Qv,
    defaultMatchWidth: "wide",
    parsePatterns: zv,
    defaultParseWidth: "any"
  }),
  day: lt({
    matchPatterns: Gv,
    defaultMatchWidth: "wide",
    parsePatterns: Xv,
    defaultParseWidth: "any"
  }),
  dayPeriod: lt({
    matchPatterns: Uv,
    defaultMatchWidth: "any",
    parsePatterns: Zv,
    defaultParseWidth: "any"
  })
}, Un = {
  code: "en-US",
  formatDistance: Tv,
  formatLong: Pv,
  formatRelative: Ev,
  localize: $v,
  match: Jv,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function em(a, e) {
  const t = ye(a, e == null ? void 0 : e.in);
  return bv(t, wv(t)) + 1;
}
function Zn(a, e) {
  const t = ye(a, e == null ? void 0 : e.in), n = +Je(t) - +gv(t);
  return Math.round(n / zn) + 1;
}
function pa(a, e) {
  var p, m, v, L;
  const t = ye(a, e == null ? void 0 : e.in), n = t.getFullYear(), r = et(), l = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((m = (p = e == null ? void 0 : e.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((L = (v = r.locale) == null ? void 0 : v.options) == null ? void 0 : L.firstWeekContainsDate) ?? 1, s = _e((e == null ? void 0 : e.in) || a, 0);
  s.setFullYear(n + 1, 0, l), s.setHours(0, 0, 0, 0);
  const o = Ne(s, e), i = _e((e == null ? void 0 : e.in) || a, 0);
  i.setFullYear(n, 0, l), i.setHours(0, 0, 0, 0);
  const d = Ne(i, e);
  return +t >= +o ? n + 1 : +t >= +d ? n : n - 1;
}
function tm(a, e) {
  var o, i, d, p;
  const t = et(), n = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((i = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.options) == null ? void 0 : i.firstWeekContainsDate) ?? t.firstWeekContainsDate ?? ((p = (d = t.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = pa(a, e), l = _e((e == null ? void 0 : e.in) || a, 0);
  return l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0), Ne(l, e);
}
function Jn(a, e) {
  const t = ye(a, e == null ? void 0 : e.in), n = +Ne(t, e) - +tm(t, e);
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
}, ja = {
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
    const r = pa(a, n), l = r > 0 ? r : 1 - r;
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
    const n = em(a);
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
        return Ka(n);
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
        return Ka(n);
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
        return "GMT" + Ha(n, ":");
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
        return "GMT" + Ha(n, ":");
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
function Ha(a, e = "") {
  const t = a > 0 ? "-" : "+", n = Math.abs(a), r = Math.trunc(n / 60), l = n % 60;
  return l === 0 ? t + String(r) : t + String(r) + e + ce(l, 2);
}
function Ka(a, e) {
  return a % 60 === 0 ? (a > 0 ? "-" : "+") + ce(Math.abs(a) / 60, 2) : Ve(a, e);
}
function Ve(a, e = "") {
  const t = a > 0 ? "-" : "+", n = Math.abs(a), r = ce(Math.trunc(n / 60), 2), l = ce(n % 60, 2);
  return t + r + e + l;
}
const Wa = (a, e) => {
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
}, am = (a, e) => {
  const t = a.match(/(P+)(p+)?/) || [], n = t[1], r = t[2];
  if (!r)
    return Wa(a, e);
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
  return l.replace("{{date}}", Wa(n, e)).replace("{{time}}", er(r, e));
}, Zt = {
  p: er,
  P: am
}, nm = /^D+$/, rm = /^Y+$/, lm = ["D", "DD", "YY", "YYYY"];
function tr(a) {
  return nm.test(a);
}
function ar(a) {
  return rm.test(a);
}
function Jt(a, e, t) {
  const n = sm(a, e, t);
  if (console.warn(n), lm.includes(a)) throw new RangeError(n);
}
function sm(a, e, t) {
  const n = a[0] === "Y" ? "years" : "days of the month";
  return `Use \`${a.toLowerCase()}\` instead of \`${a}\` (in \`${e}\`) for formatting ${n} to the input \`${t}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const om = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, im = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, um = /^'([^]*?)'?$/, dm = /''/g, cm = /[a-zA-Z]/;
function Ya(a, e, t) {
  var p, m, v, L;
  const n = et(), r = n.locale ?? Un, l = n.firstWeekContainsDate ?? ((m = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = n.weekStartsOn ?? ((L = (v = n.locale) == null ? void 0 : v.options) == null ? void 0 : L.weekStartsOn) ?? 0, o = ye(a, t == null ? void 0 : t.in);
  if (!kv(o))
    throw new RangeError("Invalid time value");
  let i = e.match(im).map((b) => {
    const S = b[0];
    if (S === "p" || S === "P") {
      const y = Zt[S];
      return y(b, r.formatLong);
    }
    return b;
  }).join("").match(om).map((b) => {
    if (b === "''")
      return { isToken: !1, value: "'" };
    const S = b[0];
    if (S === "'")
      return { isToken: !1, value: fm(b) };
    if (ja[S])
      return { isToken: !0, value: b };
    if (S.match(cm))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + S + "`"
      );
    return { isToken: !1, value: b };
  });
  r.localize.preprocessor && (i = r.localize.preprocessor(o, i));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: s,
    locale: r
  };
  return i.map((b) => {
    if (!b.isToken) return b.value;
    const S = b.value;
    (ar(S) || tr(S)) && Jt(S, e, String(a));
    const y = ja[S[0]];
    return y(o, S, r.localize, d);
  }).join("");
}
function fm(a) {
  const e = a.match(um);
  return e ? e[1].replace(dm, "'") : a;
}
function pm() {
  return Object.assign({}, et());
}
function vm(a, e) {
  const t = ye(a, e == null ? void 0 : e.in).getDay();
  return t === 0 ? 7 : t;
}
function mm(a, e) {
  const t = hm(e) ? new e(0) : _e(e, 0);
  return t.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), t.setHours(
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
    a.getMilliseconds()
  ), t;
}
function hm(a) {
  var e;
  return typeof a == "function" && ((e = a.prototype) == null ? void 0 : e.constructor) === a;
}
const bm = 10;
class nr {
  constructor() {
    Y(this, "subPriority", 0);
  }
  validate(e, t) {
    return !0;
  }
}
class gm extends nr {
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
class ym extends nr {
  constructor(t, n) {
    super();
    Y(this, "priority", bm);
    Y(this, "subPriority", -1);
    this.context = t || ((r) => _e(n, r));
  }
  set(t, n) {
    return n.timestampIsSet ? t : _e(t, mm(t, this.context));
  }
}
class ue {
  run(e, t, n, r) {
    const l = this.parse(e, t, n, r);
    return l ? {
      setter: new gm(
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
class km extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 140);
    Y(this, "incompatibleTokens", ["R", "u", "t", "T"]);
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
}, Le = {
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
function Me(a, e) {
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
    value: n * (r * pv + l * fv + s * vv),
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
function va(a) {
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
class wm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 130);
    Y(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
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
class _m extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 130);
    Y(this, "incompatibleTokens", [
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
    const s = pa(t, l);
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
class Tm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 130);
    Y(this, "incompatibleTokens", [
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
    const l = _e(t, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), Je(l);
  }
}
class xm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 130);
    Y(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(t, n) {
    return xt(n === "u" ? 4 : n.length, t);
  }
  set(t, n, r) {
    return t.setFullYear(r, 0, 1), t.setHours(0, 0, 0, 0), t;
  }
}
class Dm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 120);
    Y(this, "incompatibleTokens", [
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
class Im extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 120);
    Y(this, "incompatibleTokens", [
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
class Pm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "incompatibleTokens", [
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
    Y(this, "priority", 110);
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
class Cm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 110);
    Y(this, "incompatibleTokens", [
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
function Em(a, e, t) {
  const n = ye(a, t == null ? void 0 : t.in), r = Jn(n, t) - e;
  return n.setDate(n.getDate() - r * 7), ye(n, t == null ? void 0 : t.in);
}
class Lm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 100);
    Y(this, "incompatibleTokens", [
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
    return Ne(Em(t, r, l), l);
  }
}
function Mm(a, e, t) {
  const n = ye(a, t == null ? void 0 : t.in), r = Zn(n, t) - e;
  return n.setDate(n.getDate() - r * 7), n;
}
class Bm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 100);
    Y(this, "incompatibleTokens", [
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
    return Je(Mm(t, r));
  }
}
const Sm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Am = [
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
class Fm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 90);
    Y(this, "subPriority", 1);
    Y(this, "incompatibleTokens", [
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
    return l ? n >= 1 && n <= Am[s] : n >= 1 && n <= Sm[s];
  }
  set(t, n, r) {
    return t.setDate(r), t.setHours(0, 0, 0, 0), t;
  }
}
class Om extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 90);
    Y(this, "subpriority", 1);
    Y(this, "incompatibleTokens", [
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
function ma(a, e, t) {
  var m, v, L, b;
  const n = et(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((v = (m = t == null ? void 0 : t.locale) == null ? void 0 : m.options) == null ? void 0 : v.weekStartsOn) ?? n.weekStartsOn ?? ((b = (L = n.locale) == null ? void 0 : L.options) == null ? void 0 : b.weekStartsOn) ?? 0, l = ye(a, t == null ? void 0 : t.in), s = l.getDay(), i = (e % 7 + 7) % 7, d = 7 - r, p = e < 0 || e > 6 ? e - (s + d) % 7 : (i + d) % 7 - (s + d) % 7;
  return Gn(l, p, t);
}
class $m extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 90);
    Y(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
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
    return t = ma(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
class Rm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 90);
    Y(this, "incompatibleTokens", [
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
    return t = ma(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
class Nm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 90);
    Y(this, "incompatibleTokens", [
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
    return t = ma(t, r, l), t.setHours(0, 0, 0, 0), t;
  }
}
function Vm(a, e, t) {
  const n = ye(a, t == null ? void 0 : t.in), r = vm(n, t), l = e - r;
  return Gn(n, l, t);
}
class qm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 90);
    Y(this, "incompatibleTokens", [
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
    return t = Vm(t, r), t.setHours(0, 0, 0, 0), t;
  }
}
class jm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 80);
    Y(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
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
    return t.setHours(va(r), 0, 0, 0), t;
  }
}
class Hm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 80);
    Y(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
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
    return t.setHours(va(r), 0, 0, 0), t;
  }
}
class Km extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 80);
    Y(this, "incompatibleTokens", ["a", "b", "t", "T"]);
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
    return t.setHours(va(r), 0, 0, 0), t;
  }
}
class Wm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 70);
    Y(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
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
class Ym extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 70);
    Y(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
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
class Qm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 70);
    Y(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
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
class zm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 70);
    Y(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
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
class Gm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 60);
    Y(this, "incompatibleTokens", ["t", "T"]);
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
class Xm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 50);
    Y(this, "incompatibleTokens", ["t", "T"]);
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
class Um extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 30);
    Y(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(t, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return ge(he(n.length, t), r);
  }
  set(t, n, r) {
    return t.setMilliseconds(r), t;
  }
}
class Zm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 10);
    Y(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(t, n) {
    switch (n) {
      case "X":
        return Me(
          Le.basicOptionalMinutes,
          t
        );
      case "XX":
        return Me(Le.basic, t);
      case "XXXX":
        return Me(
          Le.basicOptionalSeconds,
          t
        );
      case "XXXXX":
        return Me(
          Le.extendedOptionalSeconds,
          t
        );
      case "XXX":
      default:
        return Me(Le.extended, t);
    }
  }
  set(t, n, r) {
    return n.timestampIsSet ? t : _e(
      t,
      t.getTime() - Tt(t) - r
    );
  }
}
class Jm extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 10);
    Y(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(t, n) {
    switch (n) {
      case "x":
        return Me(
          Le.basicOptionalMinutes,
          t
        );
      case "xx":
        return Me(Le.basic, t);
      case "xxxx":
        return Me(
          Le.basicOptionalSeconds,
          t
        );
      case "xxxxx":
        return Me(
          Le.extendedOptionalSeconds,
          t
        );
      case "xxx":
      default:
        return Me(Le.extended, t);
    }
  }
  set(t, n, r) {
    return n.timestampIsSet ? t : _e(
      t,
      t.getTime() - Tt(t) - r
    );
  }
}
class eh extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 40);
    Y(this, "incompatibleTokens", "*");
  }
  parse(t) {
    return rr(t);
  }
  set(t, n, r) {
    return [_e(t, r * 1e3), { timestampIsSet: !0 }];
  }
}
class th extends ue {
  constructor() {
    super(...arguments);
    Y(this, "priority", 20);
    Y(this, "incompatibleTokens", "*");
  }
  parse(t) {
    return rr(t);
  }
  set(t, n, r) {
    return [_e(t, r), { timestampIsSet: !0 }];
  }
}
const ah = {
  G: new km(),
  y: new wm(),
  Y: new _m(),
  R: new Tm(),
  u: new xm(),
  Q: new Dm(),
  q: new Im(),
  M: new Pm(),
  L: new Cm(),
  w: new Lm(),
  I: new Bm(),
  d: new Fm(),
  D: new Om(),
  E: new $m(),
  e: new Rm(),
  c: new Nm(),
  i: new qm(),
  a: new jm(),
  b: new Hm(),
  B: new Km(),
  h: new Wm(),
  H: new Ym(),
  K: new Qm(),
  k: new zm(),
  m: new Gm(),
  s: new Xm(),
  S: new Um(),
  X: new Zm(),
  x: new Jm(),
  t: new eh(),
  T: new th()
}, nh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, rh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, lh = /^'([^]*?)'?$/, sh = /''/g, oh = /\S/, ih = /[a-zA-Z]/;
function Qa(a, e, t, n) {
  var y, x, E, A;
  const r = () => _e(t, NaN), l = pm(), s = l.locale ?? Un, o = l.firstWeekContainsDate ?? ((x = (y = l.locale) == null ? void 0 : y.options) == null ? void 0 : x.firstWeekContainsDate) ?? 1, i = l.weekStartsOn ?? ((A = (E = l.locale) == null ? void 0 : E.options) == null ? void 0 : A.weekStartsOn) ?? 0;
  if (!e)
    return a ? r() : ye(t, n == null ? void 0 : n.in);
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: i,
    locale: s
  }, p = [new ym(n == null ? void 0 : n.in, t)], m = e.match(rh).map((D) => {
    const K = D[0];
    if (K in Zt) {
      const R = Zt[K];
      return R(D, s.formatLong);
    }
    return D;
  }).join("").match(nh), v = [];
  for (let D of m) {
    ar(D) && Jt(D, e, a), tr(D) && Jt(D, e, a);
    const K = D[0], R = ah[K];
    if (R) {
      const { incompatibleTokens: C } = R;
      if (Array.isArray(C)) {
        const I = v.find(
          (M) => C.includes(M.token) || M.token === K
        );
        if (I)
          throw new RangeError(
            `The format string mustn't contain \`${I.fullToken}\` and \`${D}\` at the same time`
          );
      } else if (R.incompatibleTokens === "*" && v.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${D}\` and any other token at the same time`
        );
      v.push({ token: K, fullToken: D });
      const N = R.run(
        a,
        D,
        s.match,
        d
      );
      if (!N)
        return r();
      p.push(N.setter), a = N.rest;
    } else {
      if (K.match(ih))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + K + "`"
        );
      if (D === "''" ? D = "'" : K === "'" && (D = uh(D)), a.indexOf(D) === 0)
        a = a.slice(D.length);
      else
        return r();
    }
  }
  if (a.length > 0 && oh.test(a))
    return r();
  const L = p.map((D) => D.priority).sort((D, K) => K - D).filter((D, K, R) => R.indexOf(D) === K).map(
    (D) => p.filter((K) => K.priority === D).sort((K, R) => R.subPriority - K.subPriority)
  ).map((D) => D[0]);
  let b = ye(t, n == null ? void 0 : n.in);
  if (isNaN(+b)) return r();
  const S = {};
  for (const D of L) {
    if (!D.validate(b, d))
      return r();
    const K = D.set(b, S, d);
    Array.isArray(K) ? (b = K[0], Object.assign(S, K[1])) : b = K;
  }
  return b;
}
function uh(a) {
  return a.match(lh)[1].replace(sh, "'");
}
const dh = {
  dsfrDecodeDate: function(a, e) {
    if (typeof a != "string" || a === "" || /^\d{4}-\d{2}-\d{2}$/.test(a))
      return a;
    const n = Qa(a, e, /* @__PURE__ */ new Date());
    return Ya(n, "yyyy-MM-dd");
  },
  dsfrSearch: function(a) {
    return this.search(a, 0);
  },
  dsfrDecodeDateTime: function(a, e) {
    if (a === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(a))
      return a;
    const n = Qa(a, e, /* @__PURE__ */ new Date());
    return Ya(n, "yyyy-MM-dd'T'HH:mm");
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
}, Se = (a = "", e = "") => (a ? `${a}-` : "") + na() + (e ? `-${e}` : ""), ch = {
  useRandomId: Se
}, fh = ["href", "aria-current"], ph = {
  __name: "RouterLink",
  props: ["to", "active"],
  setup(a) {
    const e = a, t = e.to === "/" ? window.location.pathname === e.to : window.location.pathname.startsWith(e.to);
    return (n, r) => (u(), f("a", {
      href: e.to,
      "aria-current": Q(t) || a.active ? "page" : void 0
    }, [
      O(n.$slots, "default")
    ], 8, fh));
  }
}, Ee = (a, e) => {
  const t = a.__vccOpts || a;
  for (const [n, r] of e)
    t[n] = r;
  return t;
}, vh = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Ot, DsfrTag: fa, DsfrButton: He },
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
}, mh = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, hh = ["aria-labelledby"], bh = {
  key: 0,
  class: "facet"
}, gh = { class: "flex justify-between w-full fr-mb-0" }, yh = {
  class: "facet--count",
  "aria-hidden": "true"
}, kh = { class: "fr-sr-only" }, wh = { class: "flex justify-between w-full" }, _h = {
  class: "facet--count",
  "aria-hidden": "true"
}, Th = { class: "fr-sr-only" }, xh = ["aria-labelledby"], Dh = {
  key: 0,
  class: "facet"
}, Ih = { class: "flex justify-between w-full fr-mb-0" }, Ph = {
  class: "facet--count",
  "aria-hidden": "true"
}, Ch = { class: "fr-sr-only" }, Eh = { class: "flex justify-between w-full" }, Lh = {
  class: "facet--count",
  "aria-hidden": "true"
}, Mh = { class: "fr-sr-only" }, Bh = { class: "fr-mb-2w" };
function Sh(a, e, t, n, r, l) {
  const s = xe("DsfrTag"), o = xe("DsfrCheckbox"), i = xe("DsfrButton");
  return u(), f("div", null, [
    l.isAnyFacetValueSelected() ? (u(), f("div", mh, [
      (u(!0), f(U, null, te(t.selectedFacets, (d, p) => (u(), f(U, { key: p }, [
        l.facetMultipleByCode(p) ? k("", !0) : (u(!0), f(U, { key: 0 }, te(d, (m) => (u(), j(s, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (v) => a.$emit("toogle-facet", p, m, t.contextKey)
        }, {
          default: ee(() => [
            H(h(l.facetLabelByCode(p)) + ": " + h(l.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : k("", !0),
    (u(!0), f(U, null, te(t.facets, (d) => (u(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (u(), f(U, { key: 0 }, [
        (u(), j(me(t.heading), {
          class: "fr-mb-1w fr-text--md",
          id: d.code
        }, {
          default: ee(() => [
            H(h(d.label), 1)
          ]),
          _: 2
        }, 1032, ["id"])),
        l.selectedInvisibleFacets(d.code, d.values).length > 0 ? (u(), f("div", {
          key: 0,
          role: "group",
          "aria-labelledby": d.code
        }, [
          (u(!0), f(U, null, te(l.selectedInvisibleFacets(d.code), (p) => (u(), f(U, {
            key: p.code
          }, [
            d.multiple ? (u(), f("div", bh, [
              le(o, {
                small: "",
                modelValue: !0,
                "onUpdate:modelValue": (m) => a.$emit("toogle-facet", d.code, p.code, t.contextKey)
              }, {
                label: ee(() => [
                  c("span", gh, [
                    H(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", yh, h(p.count), 1),
                    c("span", kh, "(" + h(p.count) + " élément(s))", 1)
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
                c("span", wh, [
                  H(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                  c("span", _h, h(p.count), 1),
                  c("span", Th, "(" + h(p.count) + " élément(s))", 1)
                ])
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ], 64))), 128))
        ], 8, hh)) : k("", !0),
        l.visibleFacets(d.code, d.values).length > 0 ? (u(), f("div", {
          key: 1,
          role: "group",
          "aria-labelledby": d.code
        }, [
          (u(!0), f(U, null, te(l.visibleFacets(d.code, d.values), (p) => (u(), f(U, {
            key: p.code
          }, [
            d.multiple ? (u(), f("div", Dh, [
              le(o, {
                small: "",
                modelValue: l.isFacetValueSelected(d.code, p.code),
                class: "facet",
                "onUpdate:modelValue": (m) => a.$emit("toogle-facet", d.code, p.code, t.contextKey)
              }, {
                label: ee(() => [
                  c("span", Ih, [
                    H(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", Ph, h(p.count), 1),
                    c("span", Ch, "(" + h(p.count) + " élément(s))", 1)
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
                c("span", Eh, [
                  H(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                  c("span", Lh, h(p.count), 1),
                  c("span", Mh, "(" + h(p.count) + " élément(s))", 1)
                ])
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ], 64))), 128))
        ], 8, xh)) : k("", !0),
        c("div", Bh, [
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
          }, 1032, ["onClick"])) : k("", !0),
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
          }, 1032, ["onClick"])) : k("", !0)
        ])
      ], 64)) : k("", !0)
    ]))), 128))
  ]);
}
const Ah = /* @__PURE__ */ Ee(vh, [["render", Sh], ["__scopeId", "data-v-628fafbe"]]), ha = () => {
  const a = z(), e = z(!1), t = z(!1), n = () => {
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
}, Fh = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Oh = ["id", "aria-labelledby", "onKeydown"], $h = {
  class: "fr-menu__list",
  role: "none"
}, Rh = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Se("menu") },
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
    } = ha(), o = a, i = z(null), d = z(!1);
    let p = z(0), m = [];
    Re("menuItem", { menuItemIndex: p, addMenuItem: (C, N) => {
      p.value += 1, m.push(`${C}@${N}`);
    } }), Re("id", o.id), ve(d, (C, N) => {
      C !== N && (l(C), C ? (setTimeout(() => S(), 100), document.addEventListener("click", E), document.addEventListener("touchstart", E)) : (document.removeEventListener("click", E), document.removeEventListener("touchstart", E)));
    });
    const L = (C, N) => {
      const I = N === "down" ? (C + 1) % m.length : (C - 1 + m.length) % m.length, M = document.getElementById(`${o.id}_item_${I}`);
      return M.ariaDisabled === "true" ? L(I, N) : M;
    }, b = (C) => {
      const N = document.activeElement.id, I = N.startsWith(`${o.id}_item_`) ? Number(N.split("_")[2]) : C === "down" ? -1 : 0;
      L(I, C).focus();
    }, S = (C) => b("down"), y = (C) => b("up");
    let x = (C) => {
      let N = C.key;
      if (N.length > 1 && N.match(/\S/))
        return;
      N = N.toLowerCase();
      let I = m.filter((T) => T.toLowerCase().startsWith(N)), M = document.activeElement.id;
      for (let T of I) {
        let g = T.split("@")[1], _ = document.getElementById(`${o.id}_item_${g}`);
        if (M !== _.id) {
          _.focus();
          break;
        }
      }
    }, E = (C) => {
      i.value.contains(C.target) || (d.value = !1);
    };
    function A() {
      d.value = !1;
    }
    const D = w(() => ["sm", "small"].includes(o.size)), K = w(() => ["md", "medium"].includes(o.size)), R = w(() => ["lg", "large"].includes(o.size));
    return e({ closeMenu: A }), (C, N) => (u(), f("div", {
      class: "relative-position fr-menu__wrapper",
      onKeydown: N[9] || (N[9] = re(
        //@ts-ignore
        (...I) => Q(E) && Q(E)(...I),
        ["tab"]
      )),
      ref_key: "container",
      ref: i
    }, [
      c("button", G({
        id: C.id,
        onClick: N[0] || (N[0] = ae((I) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          N[1] || (N[1] = re(ae((I) => d.value = !1, ["stop"]), ["esc"])),
          N[2] || (N[2] = re(ae((I) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          re(ae(S, ["prevent"]), ["down"]),
          re(ae(y, ["prevent"]), ["up"]),
          N[3] || (N[3] = //@ts-ignore
          (...I) => Q(x) && Q(x)(...I)),
          N[4] || (N[4] = re((I) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [C.icon]: !0,
          "fr-btn--secondary": C.secondary,
          "fr-btn--tertiary": C.tertiary,
          "fr-btn--sm": D.value,
          "fr-btn--md": K.value,
          "fr-btn--lg": R.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": C.disabled,
        "aria-controls": `${C.id}_menu`,
        "aria-expanded": d.value
      }, C.$attrs), [
        c("span", null, h(C.label), 1)
      ], 16, Fh),
      c("div", {
        id: `${C.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: V(["fr-collapse fr-menu", { "fr-collapse--expanded": Q(r), "fr-collapsing": Q(n) }]),
        role: "menu",
        "aria-labelledby": C.id,
        onKeyup: N[5] || (N[5] = re((I) => d.value = !1, ["esc"])),
        onKeydown: [
          N[6] || (N[6] = re((I) => d.value = !1, ["tab"])),
          re(ae(S, ["prevent"]), ["down"]),
          re(ae(y, ["prevent"]), ["up"]),
          N[7] || (N[7] = //@ts-ignore
          (...I) => Q(x) && Q(x)(...I))
        ],
        onTransitionend: N[8] || (N[8] = (I) => Q(s)(d.value))
      }, [
        c("ul", $h, [
          O(C.$slots, "default", {}, void 0, !0)
        ])
      ], 42, Oh)
    ], 544));
  }
}), Nh = /* @__PURE__ */ Ee(Rh, [["__scopeId", "data-v-7c863055"]]), Vh = { role: "none" }, qh = ["id", "href"], jh = /* @__PURE__ */ q({
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
      return u(), f("li", Vh, [
        i.url === "" ? (u(), j(p, G({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: i.label,
          id: `${Q(s)}_item_${Q(o)}`,
          icon: i.icon,
          tertiary: "",
          "no-outline": "",
          class: "fr-nav__link"
        }, i.$attrs), null, 16, ["label", "id", "icon"])) : (u(), f("a", G({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${Q(s)}_item_${Q(o)}`,
          href: i.url,
          class: l
        }, i.$attrs), h(i.label), 17, qh))
      ]);
    };
  }
}), Hh = /* @__PURE__ */ Ee(jh, [["__scopeId", "data-v-b29bb72d"]]), Kh = ["id"], Wh = {
  key: 0,
  class: "required"
}, Yh = {
  key: 0,
  class: "fr-hint-text"
}, Qh = ["id", "aria-expanded", "aria-describedby", "aria-controls", "aria-disabled", "aria-required"], zh = { class: "grow overflow" }, Gh = ["id"], Xh = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, Uh = ["id"], Zh = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, Jh = ["id", "aria-controls"], eb = ["id"], tb = {
  key: 0,
  class: "fr-hint-text"
}, ab = ["aria-describedby", "id"], nb = ["id", "onKeydown", "onClick", "aria-selected"], rb = ["data-id", "value"], lb = ["id"], sb = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Se("select-multiple") },
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
    } = ha(), o = a, i = z(!1), d = z(o.options);
    ve(i, (P, F) => {
      P !== F && (l(P), P ? (document.addEventListener("click", _), document.addEventListener("touchstart", _)) : (document.removeEventListener("click", _), document.removeEventListener("touchstart", _)));
    });
    const p = z(null), m = z(null), v = z(null), L = z(""), b = e, S = w(() => o.errorMessage || o.successMessage), y = w(() => o.errorMessage !== "" ? "error" : "valid"), x = w(() => d.value.every((P) => o.modelValue.includes(P.value)) ? "fr-icon-close-circle-line" : "fr-icon-check-line"), E = w(() => d.value.every((P) => o.modelValue.includes(P.value)) ? "Tout déselectionner" : "Tout sélectionner"), A = w(() => {
      let F = `${o.options.filter(($) => o.modelValue.includes($.value)).length} options séléctionnées`;
      return o.modelValue.length > 2 ? F : o.options.filter(($) => o.modelValue.includes($.value)).map(($) => $.text).join(", ");
    });
    let D = function() {
      if (d.value.every((F) => o.modelValue.includes(F.value))) {
        const F = d.value.map((Z) => Z.value), $ = o.modelValue.filter((Z) => !F.includes(Z));
        o.modelValue.length = 0, $.forEach((Z) => o.modelValue.push(Z));
      } else
        d.value.filter(($) => !o.modelValue.includes($.value)).forEach(($) => o.modelValue.push($.value));
      b("update:model-value", o.modelValue);
    }, K = function(P) {
      const F = P.target.value.toLowerCase();
      d.value = o.options.filter(($) => $.text.toLowerCase().indexOf(F) > -1);
    };
    const R = function(P) {
      switch (P.key) {
        case "Escape":
        case "Esc":
          P.stopPropagation(), i.value = !1;
          break;
        case " ":
        case "Space":
          document.activeElement.id === o.id && (P.preventDefault(), i.value = !i.value);
          break;
        case "Down":
        case "ArrowDown":
          P.preventDefault(), i.value ? I() : (i.value = !0, setTimeout(() => I(), 100));
          break;
        case "Up":
        case "ArrowUp":
          P.preventDefault(), i.value ? M() : (i.value = !0, setTimeout(() => M(), 100));
          break;
        case "Tab":
          T(P);
          break;
        default:
          let F = /^[a-zA-Z0-9àâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]$/.test(P.key);
          if (!F && P.shiftKey)
            return;
          o.comboHasFilter && document.activeElement.id === `${o.id}_filter` || (o.comboHasFilter && F ? v.value.focus() : g(P));
      }
    }, C = (P, F) => {
      const $ = F === "down" ? (P + 1) % d.value.length : (P - 1 + d.value.length) % d.value.length, Z = document.getElementById(`${o.id}_item_${$}`);
      return Z === null || Z.ariaDisabled === "true" ? C($, F) : Z;
    }, N = (P) => {
      const F = document.activeElement.id, $ = F.startsWith(`${o.id}_item_`) ? Number(F.split("_")[2]) : P === "down" ? -1 : 0;
      C($, P).focus();
    }, I = (P) => N("down"), M = (P) => N("up"), T = (P) => {
      if (!i.value) {
        b("blur");
        return;
      }
      const F = [];
      o.comboHasButton && F.push(`${o.id}_button`), o.comboHasFilter && F.push(`${o.id}_filter`), F.push("item");
      const $ = F.indexOf(P.target.id);
      let Z;
      P.shiftKey ? Z = ($ - 1 + F.length) % F.length : Z = ($ + 1) % F.length;
      const X = document.getElementById(F[Z]);
      F[Z] === "item" ? (I(), P.preventDefault()) : X && (X.focus(), P.preventDefault());
    };
    let g = (P) => {
      let F = P.key;
      if (F.length > 1 && F.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      F = F.toLowerCase();
      let $ = d.value.filter((X) => X.text.toLowerCase().startsWith(F)), Z = document.activeElement.id;
      for (let X of $) {
        let se = document.querySelector(`[data-id='${X.value}']`);
        if (Z !== se.id) {
          se.focus();
          break;
        }
      }
    }, _ = (P) => {
      p.value.contains(P.target) || (i.value = !1, b("blur"));
    }, B = (P, F) => {
      o.modelValue.includes(F) ? o.modelValue.splice(o.modelValue.indexOf(F), 1) : (o.modelValue.push(F), d.value.length === 1 && (L.value = "", d.value = o.options)), b("update:model-value", o.modelValue);
    };
    return (P, F) => (u(), f(U, null, [
      c("div", G({
        ref_key: "container",
        ref: p,
        class: ["fr-select-group", { [`fr-select-group--${y.value}`]: S.value !== "" }],
        onKeyup: F[6] || (F[6] = re(
          //@ts-ignore
          (...$) => Q(_) && Q(_)(...$),
          ["tab"]
        ))
      }, P.$attrs), [
        c("p", {
          class: "fr-label fr-mb-0",
          id: `${P.id}_label`
        }, [
          O(P.$slots, "label", {}, () => [
            H(h(P.label) + " ", 1),
            O(P.$slots, "required-tip", {}, () => [
              P.required ? (u(), f("span", Wh, " *")) : k("", !0)
            ], !0)
          ], !0),
          P.description ? (u(), f("span", Yh, h(P.description), 1)) : k("", !0)
        ], 8, Kh),
        c("div", {
          id: P.id,
          class: V([{ [`fr-select--${y.value}`]: S.value !== "" }, "fr-input fr-select--menu flex"]),
          onClick: F[0] || (F[0] = ($) => i.value = !i.value),
          onKeydown: R,
          tabindex: "0",
          "aria-autocomplete": "none",
          role: "combobox",
          "aria-expanded": i.value,
          "aria-haspopup": "dialog",
          "aria-describedby": `${P.id}_label`,
          "aria-controls": `${P.id}_dialog`,
          "aria-disabled": P.disabled,
          "aria-required": P.required
        }, [
          c("p", zh, h(A.value), 1),
          F[7] || (F[7] = c("div", { class: "fr-pl-1v fr-select__icon" }, [
            c("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              "aria-hidden": "true",
              role: "img",
              class: "vicon iconify iconify--local",
              width: "1em",
              height: "1em",
              viewBox: "0 0 24 24"
            }, [
              c("path", {
                fill: "currentColor",
                d: "m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z"
              })
            ])
          ], -1))
        ], 42, Qh),
        c("div", {
          id: `${P.id}_dialog`,
          ref_key: "collapse",
          ref: t,
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Choix des options",
          class: V(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": Q(r), "fr-collapsing": Q(n) }]),
          onKeydown: R,
          onTransitionend: F[5] || (F[5] = ($) => Q(s)(i.value))
        }, [
          P.comboHasButton ? (u(), f("div", Xh, [
            c("button", {
              class: V(["fr-btn fr-btn--tertiary fr-btn--sm", `${x.value}`]),
              id: `${P.id}_button`,
              onClick: F[1] || (F[1] = ($) => Q(D)()),
              ref_key: "button",
              ref: m,
              type: "button"
            }, h(E.value), 11, Uh)
          ])) : k("", !0),
          P.comboHasFilter ? (u(), f("div", Zh, [
            Be(c("input", {
              class: "fr-input",
              id: `${P.id}_filter`,
              ref_key: "filter",
              ref: v,
              onInput: F[2] || (F[2] = //@ts-ignore
              (...$) => Q(K) && Q(K)(...$)),
              "onUpdate:modelValue": F[3] || (F[3] = ($) => L.value = $),
              "aria-label": "Rechercher une option",
              "aria-controls": `${P.id}_listbox`,
              placeholder: "Rechercher",
              type: "text"
            }, null, 40, Jh), [
              [ga, L.value]
            ])
          ])) : k("", !0),
          P.comboLabel ? (u(), f("p", {
            key: 2,
            class: "fr-label fr-mb-2v",
            id: `${P.id}_combolabel`
          }, [
            H(h(P.comboLabel) + " ", 1),
            P.comboDescription ? (u(), f("span", tb, h(P.comboDescription), 1)) : k("", !0)
          ], 8, eb)) : k("", !0),
          c("ul", {
            role: "listbox",
            "aria-multiselectable": "true",
            "aria-describedby": P.comboLabel ? `${P.id}_combolabel` : null,
            id: `${P.id}_listbox`,
            "aria-live": "polite",
            class: "fr-select__ul"
          }, [
            (u(!0), f(U, null, te(d.value, ($, Z) => (u(), f("li", {
              class: "fr-checkbox-group fr-checkbox-group--sm fr-py-0 fr-my-1v",
              id: `${P.id}_item_${Z}`,
              tabindex: "-1",
              role: "option",
              onKeydown: re(ae((X) => Q(B)(X, $.value), ["prevent"]), ["space"]),
              onClick: (X) => Q(B)(X, $.value),
              "aria-selected": o.modelValue.includes($.value)
            }, [
              Be(c("input", {
                "data-id": $.value,
                type: "hidden",
                class: "",
                tabindex: "-1",
                value: $.value,
                "onUpdate:modelValue": F[4] || (F[4] = (X) => o.modelValue = X)
              }, null, 8, rb), [
                [ga, o.modelValue]
              ]),
              c("span", null, h($.text), 1)
            ], 40, nb))), 256))
          ], 8, ab)
        ], 42, Gh)
      ], 16),
      S.value ? (u(), f("p", {
        key: 0,
        id: `select-${y.value}-desc-${y.value}`,
        class: V(`fr-${y.value}-text`)
      }, h(S.value), 11, lb)) : k("", !0)
    ], 64));
  }
}), ob = /* @__PURE__ */ Ee(sb, [["__scopeId", "data-v-c0307d95"]]), ib = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], ub = ["id", "aria-labelledby", "onKeydown"], db = {
  key: 0,
  class: "fr-label fr-mb-0"
}, cb = {
  key: 0,
  class: "fr-hint-text"
}, fb = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, pb = { role: "none" }, vb = { class: "fr-p-2v" }, mb = ["id", "href"], hb = /* @__PURE__ */ q({
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
      collapse: e,
      collapsing: t,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = ha(), s = a, o = z(null), i = z(!1);
    let d = z(0), p = [];
    const m = (E, A) => {
      d.value += 1, p.push(`${E}@${A}`);
    };
    Re("menuItem", { menuItemIndex: d, addMenuItem: m }), Re("id", s.id), ve(i, (E, A) => {
      E !== A && (r(E), E ? (setTimeout(() => b(), 100), document.addEventListener("click", x), document.addEventListener("touchstart", x)) : (document.removeEventListener("click", x), document.removeEventListener("touchstart", x)));
    }), ke(() => {
      m(s.logoutLabel, d.value);
    });
    const v = (E, A) => {
      const D = A === "down" ? (E + 1) % p.length : (E - 1 + p.length) % p.length, K = document.getElementById(`${s.id}_item_${D}`);
      return K.ariaDisabled === "true" ? v(D, A) : K;
    }, L = (E) => {
      const A = document.activeElement.id, D = A.startsWith(`${s.id}_item_`) ? Number(A.split("_")[2]) : E === "down" ? -1 : 0;
      v(D, E).focus();
    }, b = (E) => L("down"), S = (E) => L("up");
    let y = (E) => {
      let A = E.key;
      if (A.length > 1 && A.match(/\S/))
        return;
      A = A.toLowerCase();
      let D = p.filter((R) => R.toLowerCase().startsWith(A)), K = document.activeElement.id;
      for (let R of D) {
        let C = R.split("@")[1], N = document.getElementById(`${s.id}_item_${C}`);
        if (K !== N.id) {
          N.focus();
          break;
        }
      }
    }, x = (E) => {
      o.value.contains(E.target) || (i.value = !1);
    };
    return (E, A) => (u(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: A[9] || (A[9] = re(
        //@ts-ignore
        (...D) => Q(x) && Q(x)(...D),
        ["tab"]
      )),
      ref_key: "container",
      ref: o
    }, [
      c("button", G({
        id: E.id,
        onClick: A[0] || (A[0] = ae((D) => i.value = !i.value, ["prevent", "stop"])),
        onKeyup: [
          A[1] || (A[1] = re(ae((D) => i.value = !1, ["stop"]), ["esc"])),
          A[2] || (A[2] = re(ae((D) => i.value = !i.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          re(ae(b, ["prevent"]), ["down"]),
          re(ae(S, ["prevent"]), ["up"]),
          A[3] || (A[3] = //@ts-ignore
          (...D) => Q(y) && Q(y)(...D)),
          A[4] || (A[4] = re((D) => i.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm fr-btn--icon-left", { [E.icon]: !0 }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": E.disabled,
        "aria-controls": `${E.id}_menu`,
        "aria-expanded": i.value
      }, E.$attrs), [
        c("span", null, h(E.label), 1)
      ], 16, ib),
      c("div", {
        id: `${E.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: V(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": Q(n), "fr-collapsing": Q(t) }]),
        role: "menu",
        "aria-labelledby": E.id,
        onKeyup: A[5] || (A[5] = re((D) => i.value = !1, ["esc"])),
        onKeydown: [
          A[6] || (A[6] = re((D) => i.value = !1, ["tab"])),
          re(ae(b, ["prevent"]), ["down"]),
          re(ae(S, ["prevent"]), ["up"]),
          A[7] || (A[7] = //@ts-ignore
          (...D) => Q(y) && Q(y)(...D))
        ],
        onTransitionend: A[8] || (A[8] = (D) => Q(l)(i.value))
      }, [
        O(E.$slots, "detail", {}, () => [
          E.nom === "" && E.email === "" ? k("", !0) : (u(), f("p", db, [
            H(h(E.nom) + " ", 1),
            E.email !== "" ? (u(), f("span", cb, h(E.email), 1)) : k("", !0)
          ]))
        ], !0),
        c("ul", fb, [
          O(E.$slots, "default", {}, void 0, !0),
          c("li", pb, [
            c("div", vb, [
              E.logoutUrl !== "" ? (u(), f("a", {
                key: 0,
                id: `${E.id}_item_${Q(d) - 1}`,
                class: "fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
                role: "menuitem",
                tabindex: "-1",
                href: E.logoutUrl
              }, h(E.logoutLabel), 9, mb)) : k("", !0)
            ])
          ])
        ])
      ], 42, ub)
    ], 544));
  }
}), bb = /* @__PURE__ */ Ee(hb, [["__scopeId", "data-v-3a8c3dd5"]]), gb = Symbol("header");
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
}, Pt = function a(e, t) {
  var n;
  t === void 0 && (t = !0);
  var r = e == null || (n = e.getAttribute) === null || n === void 0 ? void 0 : n.call(e, "inert"), l = r === "" || r === "true", s = l || t && e && a(e.parentNode);
  return s;
}, yb = function(e) {
  var t, n = e == null || (t = e.getAttribute) === null || t === void 0 ? void 0 : t.call(e, "contenteditable");
  return n === "" || n === "true";
}, ur = function(e, t, n) {
  if (Pt(e))
    return [];
  var r = Array.prototype.slice.apply(e.querySelectorAll(Dt));
  return t && Ye.call(e, Dt) && r.unshift(e), r = r.filter(n), r;
}, dr = function a(e, t, n) {
  for (var r = [], l = Array.from(e); l.length; ) {
    var s = l.shift();
    if (!Pt(s, !1))
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
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), v = !Pt(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
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
}, Pb = function(e) {
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
}, za = function(e) {
  var t = e.getBoundingClientRect(), n = t.width, r = t.height;
  return n === 0 && r === 0;
}, Eb = function(e, t) {
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
          return za(e);
        e.assignedSlot ? e = e.assignedSlot : !i && d !== e.ownerDocument ? e = d.host : e = i;
      }
      e = o;
    }
    if (Cb(e))
      return !e.getClientRects().length;
    if (n !== "legacy-full")
      return !0;
  } else if (n === "non-zero-area")
    return za(e);
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
  Pt(t) || _b(t) || Eb(t, e) || // For a details element with a summary, the summary element gets the focus
  Tb(t) || Lb(t));
}, ea = function(e, t) {
  return !(Pb(t) || je(t) < 0 || !Ct(e, t));
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
function $b(a, e, t) {
  return (e = jb(e)) in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function Rb(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function Nb() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ga(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    e && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Xa(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ga(Object(t), !0).forEach(function(n) {
      $b(a, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : Ga(Object(t)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return a;
}
function Vb(a) {
  return Ob(a) || Rb(a) || Hb(a) || Nb();
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
var Ua = {
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
}, Za = function(e) {
  return setTimeout(e, 0);
}, st = function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return typeof e == "function" ? e.apply(void 0, n) : e;
}, vt = function(e) {
  return e.target.shadowRoot && typeof e.composedPath == "function" ? e.composedPath()[0] : e.target;
}, zb = [], Gb = function(e, t) {
  var n = (t == null ? void 0 : t.document) || document, r = (t == null ? void 0 : t.trapStack) || zb, l = Xa({
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
  }, o, i = function(_, B, P) {
    return _ && _[B] !== void 0 ? _[B] : l[P || B];
  }, d = function(_, B) {
    var P = typeof (B == null ? void 0 : B.composedPath) == "function" ? B.composedPath() : void 0;
    return s.containerGroups.findIndex(function(F) {
      var $ = F.container, Z = F.tabbableNodes;
      return $.contains(_) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (P == null ? void 0 : P.includes($)) || Z.find(function(X) {
        return X === _;
      });
    });
  }, p = function(_) {
    var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, P = B.hasFallback, F = P === void 0 ? !1 : P, $ = B.params, Z = $ === void 0 ? [] : $, X = l[_];
    if (typeof X == "function" && (X = X.apply(void 0, Vb(Z))), X === !0 && (X = void 0), !X) {
      if (X === void 0 || X === !1)
        return X;
      throw new Error("`".concat(_, "` was specified but was not a node, or did not return a node"));
    }
    var se = X;
    if (typeof X == "string") {
      try {
        se = n.querySelector(X);
      } catch (ie) {
        throw new Error("`".concat(_, '` appears to be an invalid selector; error="').concat(ie.message, '"'));
      }
      if (!se && !F)
        throw new Error("`".concat(_, "` as selector refers to no known node"));
    }
    return se;
  }, m = function() {
    var _ = p("initialFocus", {
      hasFallback: !0
    });
    if (_ === !1)
      return !1;
    if (_ === void 0 || _ && !Ht(_, l.tabbableOptions))
      if (d(n.activeElement) >= 0)
        _ = n.activeElement;
      else {
        var B = s.tabbableGroups[0], P = B && B.firstTabbableNode;
        _ = P || p("fallbackFocus");
      }
    else _ === null && (_ = p("fallbackFocus"));
    if (!_)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return _;
  }, v = function() {
    if (s.containerGroups = s.containers.map(function(_) {
      var B = Sb(_, l.tabbableOptions), P = Ab(_, l.tabbableOptions), F = B.length > 0 ? B[0] : void 0, $ = B.length > 0 ? B[B.length - 1] : void 0, Z = P.find(function(ie) {
        return Xe(ie);
      }), X = P.slice().reverse().find(function(ie) {
        return Xe(ie);
      }), se = !!B.find(function(ie) {
        return je(ie) > 0;
      });
      return {
        container: _,
        tabbableNodes: B,
        focusableNodes: P,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: se,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: F,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: $,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: Z,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: X,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(W) {
          var J = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ne = B.indexOf(W);
          return ne < 0 ? J ? P.slice(P.indexOf(W) + 1).find(function(de) {
            return Xe(de);
          }) : P.slice(0, P.indexOf(W)).reverse().find(function(de) {
            return Xe(de);
          }) : B[ne + (J ? 1 : -1)];
        }
      };
    }), s.tabbableGroups = s.containerGroups.filter(function(_) {
      return _.tabbableNodes.length > 0;
    }), s.tabbableGroups.length <= 0 && !p("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (s.containerGroups.find(function(_) {
      return _.posTabIndexesFound;
    }) && s.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, L = function(_) {
    var B = _.activeElement;
    if (B)
      return B.shadowRoot && B.shadowRoot.activeElement !== null ? L(B.shadowRoot) : B;
  }, b = function(_) {
    if (_ !== !1 && _ !== L(document)) {
      if (!_ || !_.focus) {
        b(m());
        return;
      }
      _.focus({
        preventScroll: !!l.preventScroll
      }), s.mostRecentlyFocusedNode = _, Kb(_) && _.select();
    }
  }, S = function(_) {
    var B = p("setReturnFocus", {
      params: [_]
    });
    return B || (B === !1 ? !1 : _);
  }, y = function(_) {
    var B = _.target, P = _.event, F = _.isBackward, $ = F === void 0 ? !1 : F;
    B = B || vt(P), v();
    var Z = null;
    if (s.tabbableGroups.length > 0) {
      var X = d(B, P), se = X >= 0 ? s.containerGroups[X] : void 0;
      if (X < 0)
        $ ? Z = s.tabbableGroups[s.tabbableGroups.length - 1].lastTabbableNode : Z = s.tabbableGroups[0].firstTabbableNode;
      else if ($) {
        var ie = s.tabbableGroups.findIndex(function(Fe) {
          var Qe = Fe.firstTabbableNode;
          return B === Qe;
        });
        if (ie < 0 && (se.container === B || Ht(B, l.tabbableOptions) && !Xe(B, l.tabbableOptions) && !se.nextTabbableNode(B, !1)) && (ie = X), ie >= 0) {
          var W = ie === 0 ? s.tabbableGroups.length - 1 : ie - 1, J = s.tabbableGroups[W];
          Z = je(B) >= 0 ? J.lastTabbableNode : J.lastDomTabbableNode;
        } else it(P) || (Z = se.nextTabbableNode(B, !1));
      } else {
        var ne = s.tabbableGroups.findIndex(function(Fe) {
          var Qe = Fe.lastTabbableNode;
          return B === Qe;
        });
        if (ne < 0 && (se.container === B || Ht(B, l.tabbableOptions) && !Xe(B, l.tabbableOptions) && !se.nextTabbableNode(B)) && (ne = X), ne >= 0) {
          var de = ne === s.tabbableGroups.length - 1 ? 0 : ne + 1, fe = s.tabbableGroups[de];
          Z = je(B) >= 0 ? fe.firstTabbableNode : fe.firstDomTabbableNode;
        } else it(P) || (Z = se.nextTabbableNode(B));
      }
    } else
      Z = p("fallbackFocus");
    return Z;
  }, x = function(_) {
    var B = vt(_);
    if (!(d(B, _) >= 0)) {
      if (st(l.clickOutsideDeactivates, _)) {
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
      st(l.allowOutsideClick, _) || _.preventDefault();
    }
  }, E = function(_) {
    var B = vt(_), P = d(B, _) >= 0;
    if (P || B instanceof Document)
      P && (s.mostRecentlyFocusedNode = B);
    else {
      _.stopImmediatePropagation();
      var F, $ = !0;
      if (s.mostRecentlyFocusedNode)
        if (je(s.mostRecentlyFocusedNode) > 0) {
          var Z = d(s.mostRecentlyFocusedNode), X = s.containerGroups[Z].tabbableNodes;
          if (X.length > 0) {
            var se = X.findIndex(function(ie) {
              return ie === s.mostRecentlyFocusedNode;
            });
            se >= 0 && (l.isKeyForward(s.recentNavEvent) ? se + 1 < X.length && (F = X[se + 1], $ = !1) : se - 1 >= 0 && (F = X[se - 1], $ = !1));
          }
        } else
          s.containerGroups.some(function(ie) {
            return ie.tabbableNodes.some(function(W) {
              return je(W) > 0;
            });
          }) || ($ = !1);
      else
        $ = !1;
      $ && (F = y({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: s.mostRecentlyFocusedNode,
        isBackward: l.isKeyBackward(s.recentNavEvent)
      })), b(F || s.mostRecentlyFocusedNode || m());
    }
    s.recentNavEvent = void 0;
  }, A = function(_) {
    var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    s.recentNavEvent = _;
    var P = y({
      event: _,
      isBackward: B
    });
    P && (it(_) && _.preventDefault(), b(P));
  }, D = function(_) {
    (l.isKeyForward(_) || l.isKeyBackward(_)) && A(_, l.isKeyBackward(_));
  }, K = function(_) {
    Wb(_) && st(l.escapeDeactivates, _) !== !1 && (_.preventDefault(), o.deactivate());
  }, R = function(_) {
    var B = vt(_);
    d(B, _) >= 0 || st(l.clickOutsideDeactivates, _) || st(l.allowOutsideClick, _) || (_.preventDefault(), _.stopImmediatePropagation());
  }, C = function() {
    if (s.active)
      return Ua.activateTrap(r, o), s.delayInitialFocusTimer = l.delayInitialFocus ? Za(function() {
        b(m());
      }) : b(m()), n.addEventListener("focusin", E, !0), n.addEventListener("mousedown", x, {
        capture: !0,
        passive: !1
      }), n.addEventListener("touchstart", x, {
        capture: !0,
        passive: !1
      }), n.addEventListener("click", R, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", D, {
        capture: !0,
        passive: !1
      }), n.addEventListener("keydown", K), o;
  }, N = function() {
    if (s.active)
      return n.removeEventListener("focusin", E, !0), n.removeEventListener("mousedown", x, !0), n.removeEventListener("touchstart", x, !0), n.removeEventListener("click", R, !0), n.removeEventListener("keydown", D, !0), n.removeEventListener("keydown", K), o;
  }, I = function(_) {
    var B = _.some(function(P) {
      var F = Array.from(P.removedNodes);
      return F.some(function($) {
        return $ === s.mostRecentlyFocusedNode;
      });
    });
    B && b(m());
  }, M = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(I) : void 0, T = function() {
    M && (M.disconnect(), s.active && !s.paused && s.containers.map(function(_) {
      M.observe(_, {
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
    activate: function(_) {
      if (s.active)
        return this;
      var B = i(_, "onActivate"), P = i(_, "onPostActivate"), F = i(_, "checkCanFocusTrap");
      F || v(), s.active = !0, s.paused = !1, s.nodeFocusedBeforeActivation = L(n), B == null || B();
      var $ = function() {
        F && v(), C(), T(), P == null || P();
      };
      return F ? (F(s.containers.concat()).then($, $), this) : ($(), this);
    },
    deactivate: function(_) {
      if (!s.active)
        return this;
      var B = Xa({
        onDeactivate: l.onDeactivate,
        onPostDeactivate: l.onPostDeactivate,
        checkCanReturnFocus: l.checkCanReturnFocus
      }, _);
      clearTimeout(s.delayInitialFocusTimer), s.delayInitialFocusTimer = void 0, N(), s.active = !1, s.paused = !1, T(), Ua.deactivateTrap(r, o);
      var P = i(B, "onDeactivate"), F = i(B, "onPostDeactivate"), $ = i(B, "checkCanReturnFocus"), Z = i(B, "returnFocus", "returnFocusOnDeactivate");
      P == null || P();
      var X = function() {
        Za(function() {
          Z && b(S(s.nodeFocusedBeforeActivation)), F == null || F();
        });
      };
      return Z && $ ? ($(S(s.nodeFocusedBeforeActivation)).then(X, X), this) : (X(), this);
    },
    pause: function(_) {
      return s.active ? (s.manuallyPaused = !0, this._setPausedState(!0, _)) : this;
    },
    unpause: function(_) {
      return s.active ? (s.manuallyPaused = !1, r[r.length - 1] !== this ? this : this._setPausedState(!1, _)) : this;
    },
    updateContainerElements: function(_) {
      var B = [].concat(_).filter(Boolean);
      return s.containers = B.map(function(P) {
        return typeof P == "string" ? n.querySelector(P) : P;
      }), s.active && v(), T(), this;
    }
  }, Object.defineProperties(o, {
    _isManuallyPaused: {
      value: function() {
        return s.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(_, B) {
        if (s.paused === _)
          return this;
        if (s.paused = _, _) {
          var P = i(B, "onPause"), F = i(B, "onPostPause");
          P == null || P(), N(), T(), F == null || F();
        } else {
          var $ = i(B, "onUnpause"), Z = i(B, "onPostUnpause");
          $ == null || $(), v(), C(), T(), Z == null || Z();
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
}, Ub = q({
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
    const r = z(null), l = w(() => {
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
        const o = e.default().filter((d) => d.type !== Ja);
        return !o || !o.length || o.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), o) : en(o[0], { ref: r });
      }
    };
  }
}), Zb = ["aria-label"], Jb = { class: "fr-btns-group" }, aa = /* @__PURE__ */ q({
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
        (u(!0), f(U, null, te(n.links, (l, s) => (u(), f("li", { key: s }, [
          le(Q(ca), G({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var i;
              t("linkClick", o), (i = l.onClick) == null || i.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        O(n.$slots, "default")
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
}, Pg = /* @__PURE__ */ q({
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
    const t = a, n = e, r = ra(), l = ft(t, "languageSelector"), s = z(!1), o = z(!1), i = z(!1), d = () => {
      var y;
      i.value = !1, s.value = !1, o.value = !1, (y = document.getElementById("button-menu")) == null || y.focus();
    }, p = (y) => {
      y.key === "Escape" && d();
    };
    ke(() => {
      document.addEventListener("keydown", p), n("on-mounted");
    }), Ce(() => {
      document.removeEventListener("keydown", p);
    });
    const m = () => {
      i.value = !0, s.value = !0, o.value = !1, setTimeout(() => {
        var y;
        (y = document.getElementById("close-button")) == null || y.focus();
      }, 50);
    }, v = () => {
      i.value = !0, s.value = !1, o.value = !0;
    }, L = d;
    w(() => [t.homeLabel, t.serviceTitle].filter((y) => y).join(" - "));
    const b = w(() => !!r.operator || !!t.operatorImgSrc), S = w(() => !!r.mainnav);
    return Re(gb, () => d), (y, x) => {
      var A, D, K;
      const E = xe("RouterLink");
      return u(), f("header", eg, [
        c("div", tg, [
          c("div", ag, [
            c("div", ng, [
              c("div", rg, [
                c("div", lg, [
                  c("div", sg, [
                    y.serviceTitle ? (u(), j(Q(Ke), {
                      key: 1,
                      "logo-text": y.logoText,
                      "data-testid": "header-logo"
                    }, null, 8, ["logo-text"])) : (u(), j(E, {
                      key: 0,
                      to: y.homeTo,
                      title: `${y.homeLabel} - ${y.serviceTitle}`
                    }, {
                      default: ee(() => [
                        le(Q(Ke), {
                          "logo-text": y.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"]))
                  ]),
                  b.value ? (u(), f("div", og, [
                    O(y.$slots, "operator", {}, () => [
                      y.operatorImgSrc ? (u(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: y.operatorImgSrc,
                        alt: y.operatorImgAlt,
                        style: Ie(y.operatorImgStyle)
                      }, null, 12, ig)) : k("", !0)
                    ])
                  ])) : k("", !0),
                  y.showSearch || S.value || (A = y.quickLinks) != null && A.length ? (u(), f("div", ug, [
                    y.showSearch ? (u(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": y.showSearchLabel,
                      title: y.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: x[0] || (x[0] = ae((R) => v(), ["prevent", "stop"]))
                    }, [
                      c("span", cg, h(y.showSearchLabel), 1)
                    ], 8, dg)) : k("", !0),
                    S.value || (D = y.quickLinks) != null && D.length ? (u(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": m,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "data-testid": "open-menu-btn",
                      onClick: x[1] || (x[1] = ae((R) => m(), ["prevent", "stop"]))
                    }, [
                      c("span", fg, h(y.menuLabel), 1)
                    ])) : k("", !0)
                  ])) : k("", !0)
                ]),
                y.serviceTitle ? (u(), f("div", pg, [
                  le(E, G({
                    to: y.homeTo,
                    title: `${y.homeLabel} - ${y.serviceTitle}`
                  }, y.$attrs), {
                    default: ee(() => [
                      c("p", vg, [
                        H(h(y.serviceTitle) + " ", 1),
                        y.showBeta ? (u(), f("span", mg, " BETA ")) : k("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  y.serviceDescription ? (u(), f("p", hg, h(y.serviceDescription), 1)) : k("", !0)
                ])) : k("", !0),
                !y.serviceTitle && y.showBeta ? (u(), f("div", bg, x[9] || (x[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : k("", !0)
              ]),
              c("div", gg, [
                (K = y.quickLinks) != null && K.length || l.value ? (u(), f("div", yg, [
                  O(y.$slots, "before-quick-links"),
                  s.value ? k("", !0) : (u(), j(aa, {
                    key: 0,
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel
                  }, {
                    default: ee(() => [
                      O(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  O(y.$slots, "after-quick-links"),
                  l.value ? (u(), j(Q(dt), G({ key: 1 }, l.value, {
                    onSelect: x[2] || (x[2] = (R) => n("language-select", R))
                  }), null, 16)) : k("", !0)
                ])) : k("", !0),
                c("div", kg, [
                  O(y.$slots, "header-search"),
                  y.showSearch ? (u(), j(Q(ct), {
                    key: 0,
                    "searchbar-id": y.searchbarId,
                    label: y.searchLabel,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": x[3] || (x[3] = (R) => n("update:modelValue", R)),
                    onSearch: x[4] || (x[4] = (R) => n("search", R))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : k("", !0)
                ])
              ])
            ]),
            i.value ? (u(), j(Q(Ub), {
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
                (y.showSearch || S.value || y.quickLinks && y.quickLinks.length || l.value) && i.value ? (u(), f("div", {
                  key: 0,
                  id: "header-navigation",
                  class: V(["fr-header__menu fr-modal", { "fr-modal--opened": i.value }]),
                  "aria-label": y.menuModalLabel,
                  role: "dialog",
                  "aria-modal": "true"
                }, [
                  c("div", _g, [
                    c("button", {
                      id: "close-button",
                      class: "fr-btn fr-btn--close",
                      "aria-controls": "header-navigation",
                      "data-testid": "close-modal-btn",
                      onClick: x[5] || (x[5] = ae((R) => d(), ["prevent", "stop"]))
                    }, h(y.closeMenuModalLabel), 1),
                    c("div", Tg, [
                      l.value ? (u(), j(Q(dt), G({ key: 0 }, l.value, {
                        onSelect: x[6] || (x[6] = (R) => l.value.currentLanguage = R.codeIso)
                      }), null, 16)) : k("", !0),
                      O(y.$slots, "before-quick-links"),
                      s.value ? (u(), j(aa, {
                        key: 1,
                        role: "navigation",
                        links: y.quickLinks,
                        "nav-aria-label": y.quickLinksAriaLabel,
                        onLinkClick: Q(L)
                      }, {
                        default: ee(() => [
                          O(y.$slots, "header-menu-link")
                        ]),
                        _: 3
                      }, 8, ["links", "nav-aria-label", "onLinkClick"])) : k("", !0),
                      O(y.$slots, "after-quick-links")
                    ]),
                    i.value ? O(y.$slots, "mainnav", {
                      key: 0,
                      hidemodal: d
                    }) : k("", !0),
                    o.value ? (u(), f("div", xg, [
                      le(Q(ct), {
                        "searchbar-id": y.searchbarId,
                        "model-value": y.modelValue,
                        placeholder: y.placeholder,
                        "onUpdate:modelValue": x[7] || (x[7] = (R) => n("update:modelValue", R)),
                        onSearch: x[8] || (x[8] = (R) => n("search", R))
                      }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                    ])) : k("", !0)
                  ])
                ], 10, wg)) : k("", !0)
              ]),
              _: 3
            }, 8, ["active"])) : k("", !0),
            O(y.$slots, "default")
          ])
        ]),
        c("div", Dg, [
          S.value && !i.value ? (u(), f("div", Ig, [
            O(y.$slots, "mainnav", { hidemodal: d })
          ])) : k("", !0)
        ])
      ]);
    };
  }
}), Cg = ["aria-label"], Eg = { class: "fr-pagination__list" }, Lg = ["href", "title", "aria-disabled"], Mg = { class: "fr-sr-only" }, Bg = ["href", "title", "aria-disabled"], Sg = ["href", "title", "aria-current", "onClick"], Ag = { key: 0 }, Fg = { key: 1 }, Og = ["href", "title", "disabled", "aria-disabled"], $g = ["href", "title", "disabled", "aria-disabled"], Rg = { class: "fr-sr-only" }, Ng = /* @__PURE__ */ q({
  __name: "DsfrCustomPagination",
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
    const t = a, n = e, r = w(() => Math.min(t.pages.length - 1 - t.truncLimit, Math.max(t.currentPage - (t.truncLimit - t.truncLimit % 2) / 2, 0))), l = w(() => Math.min(t.pages.length - 1, r.value + t.truncLimit)), s = w(() => t.pages.length > t.truncLimit ? t.pages.slice(r.value, l.value + 1) : t.pages), o = (b) => n("update:current-page", b), i = (b) => o(b), d = () => i(0), p = () => i(Math.max(0, t.currentPage - 1)), m = () => i(Math.min(t.pages.length - 1, t.currentPage + 1)), v = () => i(t.pages.length - 1), L = (b) => t.pages.indexOf(b) === t.currentPage;
    return (b, S) => {
      var y, x, E, A;
      return u(), f("nav", {
        role: "navigation",
        class: "fr-pagination",
        "aria-label": b.ariaLabel
      }, [
        c("ul", Eg, [
          c("li", null, [
            c("a", {
              role: "button",
              href: (y = b.pages[0]) == null ? void 0 : y.href,
              class: V(["fr-pagination__link fr-pagination__link--first", { "fr-pagination__link--disabled": b.currentPage === 0 }]),
              title: b.firstPageTitle,
              "aria-disabled": b.currentPage === 0 ? !0 : void 0,
              onClick: S[0] || (S[0] = ae((D) => b.currentPage === 0 ? null : d(), ["prevent"]))
            }, [
              c("span", Mg, h(b.firstPageTitle), 1)
            ], 10, Lg)
          ]),
          c("li", null, [
            c("a", {
              role: "button",
              href: (x = b.pages[Math.max(b.currentPage - 1, 0)]) == null ? void 0 : x.href,
              class: V(["fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label", { "fr-pagination__link--disabled": b.currentPage === 0 }]),
              title: b.prevPageTitle,
              "aria-disabled": b.currentPage === 0 ? !0 : void 0,
              onClick: S[1] || (S[1] = ae((D) => b.currentPage === 0 ? null : p(), ["prevent"]))
            }, h(b.prevPageTitle), 11, Bg)
          ]),
          (u(!0), f(U, null, te(s.value, (D, K) => (u(), f("li", { key: K }, [
            c("a", {
              role: "button",
              href: D == null ? void 0 : D.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: D.title,
              "aria-current": L(D) ? "page" : void 0,
              onClick: ae((R) => i(b.pages.indexOf(D)), ["prevent"])
            }, [
              s.value.indexOf(D) === 0 && r.value > 0 ? (u(), f("span", Ag, "...")) : k("", !0),
              H(" " + h(D.label) + " ", 1),
              s.value.indexOf(D) === s.value.length - 1 && l.value < b.pages.length - 1 ? (u(), f("span", Fg, "...")) : k("", !0)
            ], 8, Sg)
          ]))), 128)),
          c("li", null, [
            c("a", {
              role: "button",
              href: (E = b.pages[Math.min(b.currentPage + 1, b.pages.length - 1)]) == null ? void 0 : E.href,
              class: V(["fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label", { "fr-pagination__link--disabled": b.currentPage === b.pages.length - 1 }]),
              title: b.nextPageTitle,
              disabled: b.currentPage === b.pages.length - 1 ? !0 : void 0,
              "aria-disabled": b.currentPage === b.pages.length - 1 ? !0 : void 0,
              onClick: S[2] || (S[2] = ae((D) => b.currentPage === b.pages.length - 1 ? null : m(), ["prevent"]))
            }, h(b.nextPageTitle), 11, Og)
          ]),
          c("li", null, [
            c("a", {
              role: "button",
              href: (A = b.pages.at(-1)) == null ? void 0 : A.href,
              class: V(["fr-pagination__link fr-pagination__link--last", { "fr-pagination__link--disabled": b.currentPage === b.pages.length - 1 }]),
              title: b.lastPageTitle,
              disabled: b.currentPage === b.pages.length - 1 ? !0 : void 0,
              "aria-disabled": b.currentPage === b.pages.length - 1 ? !0 : void 0,
              onClick: S[3] || (S[3] = ae((D) => b.currentPage === b.pages.length - 1 ? null : v(), ["prevent"]))
            }, [
              c("span", Rg, h(b.lastPageTitle), 1)
            ], 10, $g)
          ])
        ])
      ], 8, Cg);
    };
  }
}), pr = /* @__PURE__ */ Ee(Ng, [["__scopeId", "data-v-bc4efce7"]]), Vg = { class: "fr-table" }, qg = { class: "fr-table__wrapper" }, jg = { class: "fr-table__container" }, Hg = { class: "fr-table__content" }, Kg = ["id"], Wg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Yg = {
  key: 0,
  class: "fr-checkbox-group fr-checkbox-group--sm"
}, Qg = ["id", "checked"], zg = ["for"], Gg = { class: "fr-sr-only" }, Xg = { key: 0 }, Ug = { key: 1 }, Zg = ["data-row-key"], Jg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, ey = { class: "fr-checkbox-group fr-checkbox-group--sm" }, ty = ["id", "value"], ay = ["for"], ny = ["onKeydown"], ry = { key: 0 }, ly = ["colspan"], sy = { class: "flex gap-2 items-center" }, oy = ["selected"], iy = ["value", "selected"], uy = { class: "flex ml-1" }, dy = /* @__PURE__ */ q({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ $e({
    id: { default: () => Se("table") },
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
  emits: /* @__PURE__ */ $e(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { expose: e, emit: t }) {
    const n = a, r = t, l = De(a, "selection"), s = De(a, "rowsPerPage"), o = De(a, "currentPage"), i = w(() => Math.max(Math.ceil(n.rows.length / s.value), 1)), d = w(() => n.pages ?? Array.from({ length: i.value }).map((I, M) => ({
      label: `${M + 1}`,
      title: `Page ${M + 1}`,
      href: `#${M + 1}`
    }))), p = w(() => o.value * s.value), m = w(() => (o.value + 1) * s.value), v = w(() => ["sm", "small"].includes(n.footerSize));
    function L(I, M) {
      const T = b.value;
      return (I[T] ?? I) < (M[T] ?? M) ? -1 : (I[T] ?? I) > (M[T] ?? M) ? 1 : 0;
    }
    const b = De(a, "sortedBy");
    b.value = n.sorted;
    const S = De(a, "sortedDesc");
    function y(I) {
      if (!(!n.sortableRows || Array.isArray(n.sortableRows) && !n.sortableRows.includes(I))) {
        if (b.value === I) {
          if (S.value) {
            b.value = void 0, S.value = !1;
            return;
          }
          S.value = !0;
          return;
        }
        S.value = !1, b.value = I;
      }
    }
    const x = w(() => {
      const I = b.value ? n.rows.slice().sort(n.sortFn ?? L) : n.rows.slice();
      return S.value && I.reverse(), I;
    }), E = w(() => {
      const I = n.headersRow.map((T) => typeof T != "object" ? T : T.key), M = x.value.map((T) => Array.isArray(T) ? T : I.map((g) => T));
      return n.pagination ? M.slice(p.value, m.value) : M;
    });
    function A(I) {
      I && (l.value = E.value.map((M) => M[0][n.rowKey])), l.value.length = 0;
    }
    const D = z(!1);
    function K() {
      D.value = l.value.length === E.value.length;
    }
    function R() {
      r("update:current-page", 0), D.value = !1, l.value.length = 0;
    }
    function C(I) {
      navigator.clipboard.writeText(I);
    }
    function N() {
      o.value = 0;
    }
    return e({ resetCurrentPage: N }), (I, M) => {
      const T = xe("dsfr-button");
      return u(), f("div", Vg, [
        c("div", qg, [
          c("div", jg, [
            c("div", Hg, [
              c("table", { id: I.id }, [
                c("caption", {
                  class: V({ "fr-sr-only": I.noCaption })
                }, h(I.title), 3),
                c("thead", null, [
                  c("tr", null, [
                    I.selectableRows ? (u(), f("th", Wg, [
                      I.showToggleAll ? (u(), f("div", Yg, [
                        c("input", {
                          id: `table-select--${I.id}-all`,
                          checked: D.value,
                          type: "checkbox",
                          onInput: M[0] || (M[0] = (g) => A(g.target.checked))
                        }, null, 40, Qg),
                        c("label", {
                          class: "fr-label",
                          for: `table-select--${I.id}-all`
                        }, " Sélectionner tout ", 8, zg)
                      ])) : k("", !0)
                    ])) : k("", !0),
                    (u(!0), f(U, null, te(I.headersRow, (g, _) => (u(), f("th", G({
                      key: typeof g == "object" ? g.key : g,
                      scope: "col"
                    }, { ref_for: !0 }, typeof g == "object" && g.headerAttrs, {
                      class: {
                        "text-right": g.align === "right",
                        "text-left": g.align === "left"
                      }
                    }), [
                      c("div", {
                        class: V([{
                          "sortable-header": I.sortableRows === !0 || Array.isArray(I.sortableRows) && I.sortableRows.includes(g.key ?? g),
                          "fr-sr-only": typeof g == "object" ? g.hideLabel : !1,
                          "flex-row-reverse": typeof g == "object" ? g.align === "right" : !1
                        }, "flex gap--sm items-center"])
                      }, [
                        O(I.$slots, "header", G({ ref_for: !0 }, typeof g == "object" ? g : { key: g, label: g }), () => [
                          H(h(typeof g == "object" ? g.label : g), 1)
                        ], !0),
                        I.sortableRows === !0 || Array.isArray(I.sortableRows) && I.sortableRows.includes(g.key ?? g) ? (u(), j(T, {
                          key: 0,
                          type: "button",
                          size: "sm",
                          tertiary: "",
                          class: "sortable-button",
                          title: `Trier la colonne '${typeof g == "object" ? g.label : g}'`,
                          onClick: (B) => y(g.key ?? (Array.isArray(I.rows[0]) ? _ : g)),
                          onKeydown: [
                            re((B) => y(g.key ?? g), ["enter"]),
                            re((B) => y(g.key ?? g), ["space"])
                          ]
                        }, {
                          default: ee(() => [
                            c("span", Gg, h(typeof g == "object" ? g.label : g), 1),
                            b.value !== (g.key ?? g) && (I.sortableRows === !0 || Array.isArray(I.sortableRows) && I.sortableRows.includes(g.key ?? g)) ? (u(), f("span", Xg, M[6] || (M[6] = [
                              c("span", { class: "fr-sr-only" }, "(aucun tri)", -1),
                              c("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "1em",
                                height: "1em",
                                viewBox: "0 0 24 24",
                                "aria-hidden": "true",
                                color: "var(--grey-625-425)"
                              }, [
                                c("path", {
                                  fill: "currentColor",
                                  d: "m19 3l4 5h-3v12h-2V8h-3zm-5 15v2H3v-2zm0-7v2H3v-2zm-2-7v2H3V4z"
                                })
                              ], -1)
                            ]))) : b.value === (g.key ?? g) ? (u(), f("span", Ug, [
                              S.value ? (u(), f(U, { key: 0 }, [
                                M[7] || (M[7] = c("span", { class: "fr-sr-only" }, "(tri décroissant)", -1)),
                                M[8] || (M[8] = c("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  width: "1em",
                                  height: "1em",
                                  viewBox: "0 0 24 24",
                                  "aria-hidden": "true"
                                }, [
                                  c("path", {
                                    fill: "currentColor",
                                    d: "M20 4v12h3l-4 5l-4-5h3V4zm-8 14v2H3v-2zm2-7v2H3v-2zm0-7v2H3V4z"
                                  })
                                ], -1))
                              ], 64)) : (u(), f(U, { key: 1 }, [
                                M[9] || (M[9] = c("span", { class: "fr-sr-only" }, "(tri croissant)", -1)),
                                M[10] || (M[10] = c("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  width: "1em",
                                  height: "1em",
                                  viewBox: "0 0 24 24",
                                  "aria-hidden": "true"
                                }, [
                                  c("path", {
                                    fill: "currentColor",
                                    d: "m19 3l4 5h-3v12h-2V8h-3zm-5 15v2H3v-2zm0-7v2H3v-2zm-2-7v2H3V4z"
                                  })
                                ], -1))
                              ], 64))
                            ])) : k("", !0)
                          ]),
                          _: 2
                        }, 1032, ["title", "onClick", "onKeydown"])) : k("", !0)
                      ], 2)
                    ], 16))), 128))
                  ])
                ]),
                c("tbody", null, [
                  (u(!0), f(U, null, te(E.value, (g, _) => (u(), f("tr", {
                    key: `row-${_}`,
                    "data-row-key": _ + 1
                  }, [
                    I.selectableRows ? (u(), f("th", Jg, [
                      c("div", ey, [
                        Be(c("input", {
                          id: `row-select-${I.id}-${_}`,
                          "onUpdate:modelValue": M[1] || (M[1] = (B) => l.value = B),
                          value: g[0][I.rowKey] ?? `row-${_}`,
                          type: "checkbox",
                          onChange: M[2] || (M[2] = (B) => K())
                        }, null, 40, ty), [
                          [Lt, l.value]
                        ]),
                        c("label", {
                          class: "fr-label",
                          for: `row-select-${I.id}-${_}`
                        }, " Sélectionner la ligne " + h(_ + 1), 9, ay)
                      ])
                    ])) : k("", !0),
                    (u(!0), f(U, null, te(g, (B, P) => (u(), f("td", {
                      key: typeof B == "object" ? B[I.rowKey] : B,
                      class: V({
                        "text-right": I.headersRow[P].align === "right",
                        "text-left": I.headersRow[P].align === "left"
                      }),
                      onKeydown: [
                        re(ae((F) => C(typeof B == "object" ? B[I.rowKey] : B), ["ctrl"]), ["c"]),
                        re(ae((F) => C(typeof B == "object" ? B[I.rowKey] : B), ["meta"]), ["c"])
                      ]
                    }, [
                      O(I.$slots, "cell", G({ ref_for: !0 }, {
                        colKey: typeof I.headersRow[P] == "object" ? I.headersRow[P].key : I.headersRow[P],
                        cell: B,
                        idx: _ + 1
                      }), () => [
                        H(h(typeof B == "object" ? B[I.rowKey] : B), 1)
                      ], !0)
                    ], 42, ny))), 128))
                  ], 8, Zg))), 128)),
                  E.value.length === 0 ? (u(), f("tr", ry, [
                    c("td", {
                      colspan: I.selectableRows ? I.headersRow.length + 1 : I.headersRow.length
                    }, h(n.noResultLabel), 9, ly)
                  ])) : k("", !0)
                ])
              ], 8, Kg)
            ])
          ])
        ]),
        c("div", {
          class: V(I.bottomActionBarClass)
        }, [
          O(I.$slots, "pagination", {}, () => [
            I.pagination && !I.$slots.pagination ? (u(), f("div", {
              key: 0,
              class: V(["flex justify-between items-center flex-wrap", I.paginationWrapperClass])
            }, [
              I.showNbRows ? (u(), f("p", {
                key: 0,
                class: V(["fr-mb-0 fr-ml-1v", { "fr-text--sm": v.value }])
              }, h(I.rows.length) + " résultat(s)", 3)) : k("", !0),
              c("div", sy, [
                c("label", {
                  class: V(["fr-label", { "fr-text--sm": v.value }]),
                  for: "pagination-options"
                }, " Résultats par page : ", 2),
                Be(c("select", {
                  id: "pagination-options",
                  "onUpdate:modelValue": M[3] || (M[3] = (g) => s.value = g),
                  class: "fr-select",
                  onChange: M[4] || (M[4] = (g) => R())
                }, [
                  c("option", {
                    value: "",
                    selected: !I.paginationOptions.includes(s.value),
                    disabled: "true",
                    hidden: "hidden"
                  }, " Sélectionner une option ", 8, oy),
                  (u(!0), f(U, null, te(I.paginationOptions, (g, _) => (u(), f("option", {
                    key: _,
                    value: g,
                    selected: +g === s.value
                  }, h(g), 9, iy))), 128))
                ], 544), [
                  [la, s.value]
                ])
              ]),
              c("div", uy, [
                c("p", {
                  class: V(["self-center", { "fr-text--sm": v.value }])
                }, " Page " + h(o.value + 1) + " sur " + h(i.value), 3)
              ]),
              le(pr, {
                "current-page": o.value,
                "onUpdate:currentPage": M[5] || (M[5] = (g) => o.value = g),
                pages: d.value,
                "next-page-title": "Suivant",
                "prev-page-title": "Précédent"
              }, null, 8, ["current-page", "pages"])
            ], 2)) : k("", !0)
          ], !0)
        ], 2)
      ]);
    };
  }
}), cy = /* @__PURE__ */ Ee(dy, [["__scopeId", "data-v-4d29fc98"]]), fy = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex", "aria-describedby"], py = ["for"], vy = {
  key: 0,
  class: "required"
}, my = {
  key: 0,
  class: "fr-hint-text"
}, hy = ["id"], by = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "DsfrCustomCheckbox",
  props: /* @__PURE__ */ $e({
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
    Et((s) => ({
      "1e443861": s.readonlyOpacity
    }));
    const e = a, t = w(() => e.errorMessage || e.validMessage), n = w(() => t.value ? Se("message", "checkbox") : void 0), r = w(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), l = De(a, "modelValue");
    return (s, o) => (u(), f("div", {
      class: V(["fr-fieldset__element", { "fr-fieldset__element--inline": s.inline, readonly: s.readonly }])
    }, [
      c("div", {
        class: V(["fr-checkbox-group", {
          "fr-checkbox-group--error": s.errorMessage,
          "fr-checkbox-group--valid": !s.errorMessage && s.validMessage,
          "fr-checkbox-group--sm": s.small
        }])
      }, [
        Be(c("input", G({
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
        }), null, 16, fy), [
          [Lt, l.value]
        ]),
        c("label", {
          for: s.id,
          class: "fr-label"
        }, [
          O(s.$slots, "label", {}, () => [
            H(h(s.label) + " ", 1),
            O(s.$slots, "required-tip", {}, () => [
              s.required ? (u(), f("span", vy, " *")) : k("", !0)
            ], !0)
          ], !0),
          s.hint ? (u(), f("span", my, [
            O(s.$slots, "hint", {}, () => [
              H(h(s.hint), 1)
            ], !0)
          ])) : k("", !0)
        ], 8, py),
        t.value ? (u(), f("div", {
          key: 0,
          id: n.value,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: V(["fr-message--info flex items-center", r.value])
          }, h(t.value), 3)
        ], 8, hy)) : k("", !0)
      ], 2)
    ], 2));
  }
}), gy = /* @__PURE__ */ Ee(by, [["__scopeId", "data-v-2fa06bbe"]]), yy = ["for"], ky = {
  key: 0,
  class: "required"
}, wy = {
  key: 0,
  class: "fr-hint-text"
}, _y = ["id", "name", "disabled", "aria-disabled", "required"], Ty = ["selected", "disabled", "hidden"], xy = ["selected", "value", "disabled", "aria-disabled"], Dy = ["id"], Iy = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "DsfrCustomSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => Se("select") },
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
      class: V(["fr-select-group", { [`fr-select-group--${n.value}`]: t.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        O(l.$slots, "label", {}, () => [
          H(h(l.label) + " ", 1),
          O(l.$slots, "required-tip", {}, () => [
            l.required ? (u(), f("span", ky, " *")) : k("", !0)
          ])
        ]),
        l.hint ?? l.description ? (u(), f("span", wy, h(l.hint ?? l.description), 1)) : k("", !0)
      ], 8, yy),
      c("select", G({
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
        }, h(l.defaultUnselectedText), 9, Ty),
        (u(!0), f(U, null, te(l.options, (o, i) => (u(), f("option", {
          key: i,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, h(typeof o == "object" ? o.text : o), 9, xy))), 128))
      ], 16, _y),
      t.value ? (u(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: V(`fr-${n.value}-text`)
      }, h(t.value), 11, Dy)) : k("", !0)
    ], 2));
  }
}), Py = {
  key: 0,
  class: "fr-sr-only"
}, Cy = ["id"], Ey = /* @__PURE__ */ q({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => Se("tooltip") },
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
    const e = a, t = z(!1), n = z(!1), r = z(!1), l = z(null), s = z(null), o = z("0px"), i = z("0px"), d = z("0px"), p = z(!1), m = z(0);
    async function v() {
      var ie, W, J, ne, de, fe, Fe, Qe;
      if (typeof document > "u" || typeof window > "u" || !t.value || s.value.matches(":empty"))
        return;
      await new Promise((mr) => setTimeout(mr, 100));
      const M = (ie = l.value) == null ? void 0 : ie.getBoundingClientRect().top, T = (W = l.value) == null ? void 0 : W.offsetHeight, g = (J = l.value) == null ? void 0 : J.offsetWidth, _ = (ne = l.value) == null ? void 0 : ne.getBoundingClientRect().left, B = (de = s.value) == null ? void 0 : de.offsetHeight, P = (fe = s.value) == null ? void 0 : fe.offsetWidth, F = (Fe = s.value) == null ? void 0 : Fe.offsetTop, $ = (Qe = s.value) == null ? void 0 : Qe.offsetLeft, Z = M + T + B >= window.innerHeight;
      p.value = Z;
      const X = _ + g / 2 + P / 2 >= document.documentElement.offsetWidth, se = _ + g / 2 - P / 2 < 0;
      i.value = Z ? `${M - F - B + 8}px` : `${M - F + T - 8}px`, m.value = 1, o.value = X ? `${_ - $ + g - P - 4}px` : se ? `${_ - $ + 4}px` : `${_ - $ + g / 2 - P / 2}px`, d.value = X ? `${P / 2 - g / 2 + 4}px` : se ? `${-(P / 2) + g / 2 - 4}px` : "0px";
    }
    ve(t, v, { immediate: !0 }), ke(() => {
      window.addEventListener("scroll", v), window.addEventListener("resize", v);
    }), Ce(() => {
      window.removeEventListener("scroll", v), window.removeEventListener("resize", v);
    });
    const L = w(() => ["sm", "small"].includes(e.size)), b = w(() => ["md", "medium"].includes(e.size)), S = w(() => ["lg", "large"].includes(e.size)), y = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), x = w(() => `transform: translate(${o.value}, ${i.value}); --arrow-x: ${d.value}; opacity: ${m.value};'`), E = w(() => ({
      "fr-tooltip--shown": t.value,
      "fr-placement--top": p.value,
      "fr-placement--bottom": !p.value
    })), A = (M) => {
      M.key === "Escape" && (t.value = !1, M.preventDefault());
    }, D = (M) => {
      var T;
      (M.target === l.value || (T = l.value) != null && T.contains(M.target)) && (t.value = !0, globalThis.__vueDsfr__lastTooltipShow && (globalThis.__vueDsfr__lastTooltipShow.value = !1));
    }, K = (M) => {
      setTimeout(() => {
        !n.value && !r.value && (t.value = !1);
      }, 50);
    };
    let R, C = !1;
    const N = () => {
      var M;
      C !== !0 && (R = (M = l.value) == null ? void 0 : M.onclick, C = !0, l.value.onclick = function(T) {
        T.stopImmediatePropagation(), T.preventDefault();
      });
    }, I = () => {
      C !== !1 && (l.value.onclick = R, C = !1, R = null);
    };
    return ke(() => {
      window.addEventListener("scroll", v), l.value.addEventListener("click", () => t.value = !1), document.documentElement.addEventListener("keydown", A), document.documentElement.addEventListener("mouseover", D), e.disabled && N();
    }), Ce(() => {
      window.removeEventListener("scroll", v), document.documentElement.removeEventListener("keydown", A), document.documentElement.removeEventListener("mouseover", D);
    }), ve(() => e.disabled, () => {
      e.disabled ? N() : I();
    }), (M, T) => (u(), f(U, null, [
      (u(), j(me(M.href !== "" ? "a" : "button"), G({
        id: `button-${M.id}`,
        ref_key: "source",
        ref: l,
        href: M.href !== "" && !M.disabled ? M.href : void 0,
        onClick: T[0] || (T[0] = (g) => {
          M.disabled && (g.preventDefault(), g.stopImmediatePropagation());
        }),
        class: {
          "fr-link": M.isLink && !M.inline,
          "fr-btn": !M.isLink,
          "fr-btn--secondary": M.secondary && !M.tertiary,
          "fr-btn--tertiary": M.tertiary && !M.secondary && !M.noOutline,
          "fr-btn--tertiary-no-outline": M.tertiary && !M.secondary && M.noOutline,
          "fr-btn--sm": L.value,
          "fr-btn--md": b.value,
          "fr-btn--lg": S.value,
          "fr-btn--icon-right": !M.isLink && !M.iconOnly && y.value && M.iconRight,
          "fr-btn--icon-left": !M.isLink && !M.iconOnly && y.value && !M.iconRight,
          "fr-link--icon-right": M.isLink && !M.inline && !M.iconOnly && y.value && M.iconRight,
          "fr-link--icon-left": M.isLink && !M.inline && !M.iconOnly && y.value && !M.iconRight,
          "inline-flex": !y.value,
          reverse: M.iconRight && !y.value,
          "fr-btn--custom-tooltip": M.iconOnly,
          "justify-center": !y.value && M.iconOnly,
          [M.icon]: y.value
        },
        "aria-disabled": M.disabled,
        "aria-labelledby": M.id,
        onMouseenter: T[1] || (T[1] = (g) => r.value = !0),
        onMouseleave: T[2] || (T[2] = (g) => {
          r.value = !1, K();
        }),
        onFocus: T[3] || (T[3] = (g) => D(g)),
        onBlur: T[4] || (T[4] = (g) => K())
      }, M.$attrs), {
        default: ee(() => [
          M.iconOnly ? (u(), f("span", Py, h(M.label), 1)) : (u(), f(U, { key: 1 }, [
            H(h(M.label), 1)
          ], 64))
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-disabled", "aria-labelledby"])),
      c("p", {
        id: M.id,
        ref_key: "tooltip",
        ref: s,
        class: V(["fr-tooltip fr-placement", E.value]),
        style: Ie(x.value),
        role: "tooltip",
        "aria-hidden": "true",
        onMouseenter: T[5] || (T[5] = (g) => n.value = !0),
        onMouseleave: T[6] || (T[6] = (g) => {
          n.value = !1, K();
        })
      }, [
        O(M.$slots, "default", {}, () => [
          H(h(M.content), 1)
        ], !0)
      ], 46, Cy)
    ], 64));
  }
}), vr = /* @__PURE__ */ Ee(Ey, [["__scopeId", "data-v-951d76d7"]]), Ly = /* @__PURE__ */ q({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (e, t) => (u(), j(vr, G({ "is-link": !1 }, e.$attrs), {
      default: ee(() => [
        O(e.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), My = /* @__PURE__ */ q({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (e, t) => (u(), j(vr, G({
      "is-link": !e.asButton
    }, e.$attrs), {
      default: ee(() => [
        O(e.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), By = ["id", "href"], Sy = /* @__PURE__ */ q({
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
    const e = a, t = w(() => ["sm", "small"].includes(e.size)), n = w(() => ["md", "medium"].includes(e.size)), r = w(() => ["lg", "large"].includes(e.size)), l = w(() => e.asButton ? "btn" : "link"), s = w(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-"));
    return (o, i) => (u(), f("a", G({
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
      O(o.$slots, "default", {}, () => [
        H(h(o.label), 1)
      ], !0)
    ], 16, By));
  }
}), Ay = /* @__PURE__ */ Ee(Sy, [["__scopeId", "data-v-edcd30c2"]]), Fy = (a, e) => a.matches ? a.matches(e) : a.msMatchesSelector ? a.msMatchesSelector(e) : a.webkitMatchesSelector ? a.webkitMatchesSelector(e) : null, Oy = (a, e) => {
  let t = a;
  for (; t && t.nodeType === 1; ) {
    if (Fy(t, e))
      return t;
    t = t.parentNode;
  }
  return null;
}, $y = (a, e) => a.closest ? a.closest(e) : Oy(a, e), Ry = (a) => !!(a && typeof a.then == "function");
class Ny {
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
    Y(this, "value", "");
    Y(this, "searchCounter", 0);
    Y(this, "results", []);
    Y(this, "selectedIndex", -1);
    Y(this, "selectedResult", null);
    Y(this, "destroy", () => {
      this.search = null, this.setValue = null, this.setAttribute = null, this.onUpdate = null, this.onSubmit = null, this.autocorrect = null, this.onShow = null, this.onHide = null, this.onLoading = null, this.onLoaded = null;
    });
    Y(this, "handleInput", (e) => {
      const { value: t } = e.target;
      this.updateResults(t), this.value = t;
    });
    Y(this, "handleKeyDown", (e) => {
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
    Y(this, "handleFocus", (e) => {
      const { value: t } = e.target;
      this.updateResults(t), this.value = t;
    });
    Y(this, "handleBlur", () => {
      this.hideResults();
    });
    // The mousedown event fires before the blur event. Calling preventDefault() when
    // the results list is clicked will prevent it from taking focus, firing the
    // blur event on the input element, and closing the results list before click fires.
    Y(this, "handleResultMouseDown", (e) => {
      e.preventDefault();
    });
    Y(this, "handleResultClick", (e) => {
      const { target: t } = e, n = $y(t, "[data-result-index]");
      if (n) {
        this.selectedIndex = parseInt(n.dataset.resultIndex, 10);
        const r = this.results[this.selectedIndex];
        this.selectResult(), this.onSubmit(r);
      }
    });
    Y(this, "handleArrows", (e) => {
      const t = this.results.length;
      this.selectedIndex = (e % t + t) % t, this.onUpdate(this.results, this.selectedIndex);
    });
    Y(this, "selectResult", () => {
      const e = this.results[this.selectedIndex];
      e && this.setValue(e), this.hideResults();
    });
    Y(this, "updateResults", (e) => {
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
    Y(this, "showResults", () => {
      this.setAttribute("aria-expanded", !0), this.onShow();
    });
    Y(this, "hideResults", () => {
      this.selectedIndex = -1, this.results = [], this.setAttribute("aria-expanded", !1), this.setAttribute("aria-activedescendant", ""), this.onUpdate(this.results, this.selectedIndex), this.onHide();
    });
    // Make sure selected result isn't scrolled out of view
    Y(this, "checkSelectedResultVisible", (e) => {
      const t = e.querySelector(
        `[data-result-index="${this.selectedIndex}"]`
      );
      if (!t)
        return;
      const n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
      r.top < n.top ? e.scrollTop -= n.top - r.top : r.bottom > n.bottom && (e.scrollTop += r.bottom - n.bottom);
    });
    this.search = Ry(e) ? e : (L) => Promise.resolve(e(L)), this.autoSelect = t, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = s, this.autocorrect = i, this.onShow = o, this.onHide = d, this.onLoading = p, this.onLoaded = m, this.submitOnEnter = v;
  }
}
const Vy = (a, e) => {
  const t = a.getBoundingClientRect(), n = e.getBoundingClientRect();
  return /* 1 */ t.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - t.bottom < t.top && /* 3 */
  window.pageYOffset + t.top - n.height > 0 ? "above" : "below";
}, qy = (a, e, t) => {
  let n;
  return function() {
    const l = this, s = arguments, o = function() {
      n = null, a.apply(l, s);
    };
    clearTimeout(n), n = setTimeout(o, e);
  };
}, jy = (a) => {
  if (a != null && a.length) {
    const e = a.startsWith("#");
    return {
      attribute: e ? "aria-labelledby" : "aria-label",
      content: e ? a.substring(1) : a
    };
  }
}, Hy = {
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
    const a = new Ny({
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
    return this.debounceTime > 0 && (a.handleInput = qy(a.handleInput, this.debounceTime)), {
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
      const a = this.position === "below" ? "top" : "bottom", e = jy(this.resultListLabel);
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Vy(
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
function Ky(a, e, t, n, r, l) {
  return u(), f("div", G({ ref: "root" }, {
    class: a.$attrs.class,
    ...a.$attrs.style ? { style: a.$attrs.style } : {}
  }), [
    O(a.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      c("div", Pe(Mt(l.rootProps)), [
        c("input", G({ ref: "input" }, l.inputProps, {
          onInput: e[0] || (e[0] = (...s) => l.handleInput && l.handleInput(...s)),
          onKeydown: e[1] || (e[1] = (...s) => r.core.handleKeyDown && r.core.handleKeyDown(...s)),
          onFocus: e[2] || (e[2] = (...s) => r.core.handleFocus && r.core.handleFocus(...s)),
          onBlur: e[3] || (e[3] = (...s) => r.core.handleBlur && r.core.handleBlur(...s))
        }), null, 16),
        c("ul", G({ ref: "resultList" }, l.resultListProps, Ir(l.resultListListeners, !0)), [
          (u(!0), f(U, null, te(r.results, (s, o) => O(a.$slots, "result", {
            result: s,
            props: l.resultProps[o]
          }, () => [
            (u(), f("li", G({
              key: l.resultProps[o].id
            }, { ref_for: !0 }, l.resultProps[o]), h(t.getResultValue(s)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Wy = /* @__PURE__ */ Ee(Hy, [["render", Ky]]);
var Yy = {
  install: function(a, e) {
    a.use(dv), a.component("RouterLink", ph), a.component("DsfrFacets", Ah), a.component("DsfrSelectMultiple", ob), a.component("DsfrMenu", Nh), a.component("DsfrMenuLink", Hh), a.component("DsfrHeaderMenu", bb), a.component("DsfrCustomHeader", Pg), a.component("DsfrCustomHeaderMenuLinks", aa), a.component("DsfrCustomDataTable", cy), a.component("DsfrCustomPagination", pr), a.component("DsfrCustomCheckbox", gy), a.component("DsfrCustomSelect", Iy), a.component("DsfrButtonTooltip", Ly), a.component("DsfrLinkTooltip", My), a.component("DsfrLink", Ay), a.component("autocomplete", Wy);
  },
  methods: dh,
  utils: ch
};
window && (window.DSFR = Yy);
export {
  Yy as default
};
//# sourceMappingURL=dsfr.es.js.map
