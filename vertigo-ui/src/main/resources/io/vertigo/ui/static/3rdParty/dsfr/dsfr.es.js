var sr = Object.defineProperty;
var or = (n, t, e) => t in n ? sr(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var q = (n, t, e) => or(n, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as F, h as vn, ref as Q, computed as k, onMounted as we, watch as fe, onUnmounted as Ee, Comment as ir, cloneVNode as ur, openBlock as i, createElementBlock as f, normalizeClass as R, createElementVNode as c, withModifiers as te, createTextVNode as V, toDisplayString as h, unref as H, Fragment as G, renderList as J, createVNode as ee, withKeys as ne, withCtx as U, createBlock as W, resolveDynamicComponent as ve, mergeProps as Y, createCommentVNode as b, useId as zt, inject as Qe, toRef as st, renderSlot as $, provide as Re, resolveComponent as xe, useCssVars as Gt, nextTick as Xn, normalizeStyle as Te, normalizeProps as Ie, mergeModels as Be, useModel as _e, withDirectives as Le, vModelCheckbox as kt, guardReactiveProps as wt, useAttrs as dr, useSlots as Xt, hasInjectionContext as cr, useTemplateRef as fr, reactive as pr, Teleport as mr, vModelSelect as Ut, onBeforeUnmount as hr, Transition as vr, vShow as gr, vModelText as gn, toHandlers as br } from "vue";
const Un = /^[a-z0-9]+(-[a-z0-9]+)*$/, _t = (n, t, e, a = "") => {
  const r = n.split(":");
  if (n.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3)
      return null;
    a = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length)
    return null;
  if (r.length > 1) {
    const o = r.pop(), u = r.pop(), d = {
      // Allow provider without '@': "provider:prefix:name"
      provider: r.length > 0 ? r[0] : a,
      prefix: u,
      name: o
    };
    return t && !dt(d) ? null : d;
  }
  const l = r[0], s = l.split("-");
  if (s.length > 1) {
    const o = {
      provider: a,
      prefix: s.shift(),
      name: s.join("-")
    };
    return t && !dt(o) ? null : o;
  }
  if (e && a === "") {
    const o = {
      provider: a,
      prefix: "",
      name: l
    };
    return t && !dt(o, e) ? null : o;
  }
  return null;
}, dt = (n, t) => n ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && n.prefix === "" || n.prefix) && n.name) : !1, Zn = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), pt = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), xt = Object.freeze({
  ...Zn,
  ...pt
}), $t = Object.freeze({
  ...xt,
  body: "",
  hidden: !1
});
function yr(n, t) {
  const e = {};
  !n.hFlip != !t.hFlip && (e.hFlip = !0), !n.vFlip != !t.vFlip && (e.vFlip = !0);
  const a = ((n.rotate || 0) + (t.rotate || 0)) % 4;
  return a && (e.rotate = a), e;
}
function bn(n, t) {
  const e = yr(n, t);
  for (const a in $t)
    a in pt ? a in n && !(a in e) && (e[a] = pt[a]) : a in t ? e[a] = t[a] : a in n && (e[a] = n[a]);
  return e;
}
function kr(n, t) {
  const e = n.icons, a = n.aliases || /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function l(s) {
    if (e[s])
      return r[s] = [];
    if (!(s in r)) {
      r[s] = null;
      const o = a[s] && a[s].parent, u = o && l(o);
      u && (r[s] = [o].concat(u));
    }
    return r[s];
  }
  return Object.keys(e).concat(Object.keys(a)).forEach(l), r;
}
function wr(n, t, e) {
  const a = n.icons, r = n.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function s(o) {
    l = bn(
      a[o] || r[o],
      l
    );
  }
  return s(t), e.forEach(s), bn(n, l);
}
function Jn(n, t) {
  const e = [];
  if (typeof n != "object" || typeof n.icons != "object")
    return e;
  n.not_found instanceof Array && n.not_found.forEach((r) => {
    t(r, null), e.push(r);
  });
  const a = kr(n);
  for (const r in a) {
    const l = a[r];
    l && (t(r, wr(n, r, l)), e.push(r));
  }
  return e;
}
const _r = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Zn
};
function Mt(n, t) {
  for (const e in t)
    if (e in n && typeof n[e] != typeof t[e])
      return !1;
  return !0;
}
function ea(n) {
  if (typeof n != "object" || n === null)
    return null;
  const t = n;
  if (typeof t.prefix != "string" || !n.icons || typeof n.icons != "object" || !Mt(n, _r))
    return null;
  const e = t.icons;
  for (const r in e) {
    const l = e[r];
    if (
      // Name cannot be empty
      !r || // Must have body
      typeof l.body != "string" || // Check other props
      !Mt(
        l,
        $t
      )
    )
      return null;
  }
  const a = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const r in a) {
    const l = a[r], s = l.parent;
    if (
      // Name cannot be empty
      !r || // Parent must be set and point to existing icon
      typeof s != "string" || !e[s] && !a[s] || // Check other props
      !Mt(
        l,
        $t
      )
    )
      return null;
  }
  return t;
}
const yn = /* @__PURE__ */ Object.create(null);
function xr(n, t) {
  return {
    provider: n,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function qe(n, t) {
  const e = yn[n] || (yn[n] = /* @__PURE__ */ Object.create(null));
  return e[t] || (e[t] = xr(n, t));
}
function Zt(n, t) {
  return ea(t) ? Jn(t, (e, a) => {
    a ? n.icons[e] = a : n.missing.add(e);
  }) : [];
}
function Dr(n, t, e) {
  try {
    if (typeof e.body == "string")
      return n.icons[t] = { ...e }, !0;
  } catch {
  }
  return !1;
}
let tt = !1;
function ta(n) {
  return typeof n == "boolean" && (tt = n), tt;
}
function Tr(n) {
  const t = typeof n == "string" ? _t(n, !0, tt) : n;
  if (t) {
    const e = qe(t.provider, t.prefix), a = t.name;
    return e.icons[a] || (e.missing.has(a) ? null : void 0);
  }
}
function Ir(n, t) {
  const e = _t(n, !0, tt);
  if (!e)
    return !1;
  const a = qe(e.provider, e.prefix);
  return t ? Dr(a, e.name, t) : (a.missing.add(e.name), !0);
}
function Cr(n, t) {
  if (typeof n != "object")
    return !1;
  if (typeof t != "string" && (t = n.provider || ""), tt && !t && !n.prefix) {
    let r = !1;
    return ea(n) && (n.prefix = "", Jn(n, (l, s) => {
      Ir(l, s) && (r = !0);
    })), r;
  }
  const e = n.prefix;
  if (!dt({
    provider: t,
    prefix: e,
    name: "a"
  }))
    return !1;
  const a = qe(t, e);
  return !!Zt(a, n);
}
const na = Object.freeze({
  width: null,
  height: null
}), aa = Object.freeze({
  // Dimensions
  ...na,
  // Transformations
  ...pt
}), Er = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Pr = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function kn(n, t, e) {
  if (t === 1)
    return n;
  if (e = e || 100, typeof n == "number")
    return Math.ceil(n * t * e) / e;
  if (typeof n != "string")
    return n;
  const a = n.split(Er);
  if (a === null || !a.length)
    return n;
  const r = [];
  let l = a.shift(), s = Pr.test(l);
  for (; ; ) {
    if (s) {
      const o = parseFloat(l);
      isNaN(o) ? r.push(l) : r.push(Math.ceil(o * t * e) / e);
    } else
      r.push(l);
    if (l = a.shift(), l === void 0)
      return r.join("");
    s = !s;
  }
}
function Mr(n, t = "defs") {
  let e = "";
  const a = n.indexOf("<" + t);
  for (; a >= 0; ) {
    const r = n.indexOf(">", a), l = n.indexOf("</" + t);
    if (r === -1 || l === -1)
      break;
    const s = n.indexOf(">", l);
    if (s === -1)
      break;
    e += n.slice(r + 1, l).trim(), n = n.slice(0, a).trim() + n.slice(s + 1);
  }
  return {
    defs: e,
    content: n
  };
}
function Lr(n, t) {
  return n ? "<defs>" + n + "</defs>" + t : t;
}
function Br(n, t, e) {
  const a = Mr(n);
  return Lr(a.defs, t + a.content + e);
}
const Sr = (n) => n === "unset" || n === "undefined" || n === "none";
function $r(n, t) {
  const e = {
    ...xt,
    ...n
  }, a = {
    ...aa,
    ...t
  }, r = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  let l = e.body;
  [e, a].forEach((L) => {
    const y = [], w = L.hFlip, T = L.vFlip;
    let S = L.rotate;
    w ? T ? S += 2 : (y.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), y.push("scale(-1 1)"), r.top = r.left = 0) : T && (y.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), y.push("scale(1 -1)"), r.top = r.left = 0);
    let D;
    switch (S < 0 && (S -= Math.floor(S / 4) * 4), S = S % 4, S) {
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
    S % 2 === 1 && (r.left !== r.top && (D = r.left, r.left = r.top, r.top = D), r.width !== r.height && (D = r.width, r.width = r.height, r.height = D)), y.length && (l = Br(
      l,
      '<g transform="' + y.join(" ") + '">',
      "</g>"
    ));
  });
  const s = a.width, o = a.height, u = r.width, d = r.height;
  let p, v;
  s === null ? (v = o === null ? "1em" : o === "auto" ? d : o, p = kn(v, u / d)) : (p = s === "auto" ? u : s, v = o === null ? kn(p, d / u) : o === "auto" ? d : o);
  const m = {}, I = (L, y) => {
    Sr(y) || (m[L] = y.toString());
  };
  I("width", p), I("height", v);
  const _ = [r.left, r.top, u, d];
  return m.viewBox = _.join(" "), {
    attributes: m,
    viewBox: _,
    body: l
  };
}
const Ar = /\sid="(\S+)"/g, Or = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Rr = 0;
function Fr(n, t = Or) {
  const e = [];
  let a;
  for (; a = Ar.exec(n); )
    e.push(a[1]);
  if (!e.length)
    return n;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return e.forEach((l) => {
    const s = typeof t == "function" ? t(l) : t + (Rr++).toString(), o = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    n = n.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + o + ')([")]|\\.[a-z])', "g"),
      "$1" + s + r + "$3"
    );
  }), n = n.replace(new RegExp(r, "g"), ""), n;
}
const At = /* @__PURE__ */ Object.create(null);
function Vr(n, t) {
  At[n] = t;
}
function Ot(n) {
  return At[n] || At[""];
}
function Jt(n) {
  let t;
  if (typeof n.resources == "string")
    t = [n.resources];
  else if (t = n.resources, !(t instanceof Array) || !t.length)
    return null;
  return {
    // API hosts
    resources: t,
    // Root path
    path: n.path || "/",
    // URL length limit
    maxURL: n.maxURL || 500,
    // Timeout before next host is used.
    rotate: n.rotate || 750,
    // Timeout before failing query.
    timeout: n.timeout || 5e3,
    // Randomise default API end point.
    random: n.random === !0,
    // Start index
    index: n.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: n.dataAfterTimeout !== !1
  };
}
const en = /* @__PURE__ */ Object.create(null), Ge = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ct = [];
for (; Ge.length > 0; )
  Ge.length === 1 || Math.random() > 0.5 ? ct.push(Ge.shift()) : ct.push(Ge.pop());
en[""] = Jt({
  resources: ["https://api.iconify.design"].concat(ct)
});
function Nr(n, t) {
  const e = Jt(t);
  return e === null ? !1 : (en[n] = e, !0);
}
function tn(n) {
  return en[n];
}
const qr = () => {
  let n;
  try {
    if (n = fetch, typeof n == "function")
      return n;
  } catch {
  }
};
let wn = qr();
function jr(n, t) {
  const e = tn(n);
  if (!e)
    return 0;
  let a;
  if (!e.maxURL)
    a = 0;
  else {
    let r = 0;
    e.resources.forEach((s) => {
      r = Math.max(r, s.length);
    });
    const l = t + ".json?icons=";
    a = e.maxURL - r - e.path.length - l.length;
  }
  return a;
}
function Hr(n) {
  return n === 404;
}
const Wr = (n, t, e) => {
  const a = [], r = jr(n, t), l = "icons";
  let s = {
    type: l,
    provider: n,
    prefix: t,
    icons: []
  }, o = 0;
  return e.forEach((u, d) => {
    o += u.length + 1, o >= r && d > 0 && (a.push(s), s = {
      type: l,
      provider: n,
      prefix: t,
      icons: []
    }, o = u.length), s.icons.push(u);
  }), a.push(s), a;
};
function Kr(n) {
  if (typeof n == "string") {
    const t = tn(n);
    if (t)
      return t.path;
  }
  return "/";
}
const Qr = (n, t, e) => {
  if (!wn) {
    e("abort", 424);
    return;
  }
  let a = Kr(t.provider);
  switch (t.type) {
    case "icons": {
      const l = t.prefix, o = t.icons.join(","), u = new URLSearchParams({
        icons: o
      });
      a += l + ".json?" + u.toString();
      break;
    }
    case "custom": {
      const l = t.uri;
      a += l.slice(0, 1) === "/" ? l.slice(1) : l;
      break;
    }
    default:
      e("abort", 400);
      return;
  }
  let r = 503;
  wn(n + a).then((l) => {
    const s = l.status;
    if (s !== 200) {
      setTimeout(() => {
        e(Hr(s) ? "abort" : "next", s);
      });
      return;
    }
    return r = 501, l.json();
  }).then((l) => {
    if (typeof l != "object" || l === null) {
      setTimeout(() => {
        l === 404 ? e("abort", l) : e("next", r);
      });
      return;
    }
    setTimeout(() => {
      e("success", l);
    });
  }).catch(() => {
    e("next", r);
  });
}, Yr = {
  prepare: Wr,
  send: Qr
};
function zr(n) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, e = /* @__PURE__ */ Object.create(null);
  n.sort((r, l) => r.provider !== l.provider ? r.provider.localeCompare(l.provider) : r.prefix !== l.prefix ? r.prefix.localeCompare(l.prefix) : r.name.localeCompare(l.name));
  let a = {
    provider: "",
    prefix: "",
    name: ""
  };
  return n.forEach((r) => {
    if (a.name === r.name && a.prefix === r.prefix && a.provider === r.provider)
      return;
    a = r;
    const l = r.provider, s = r.prefix, o = r.name, u = e[l] || (e[l] = /* @__PURE__ */ Object.create(null)), d = u[s] || (u[s] = qe(l, s));
    let p;
    o in d.icons ? p = t.loaded : s === "" || d.missing.has(o) ? p = t.missing : p = t.pending;
    const v = {
      provider: l,
      prefix: s,
      name: o
    };
    p.push(v);
  }), t;
}
function ra(n, t) {
  n.forEach((e) => {
    const a = e.loaderCallbacks;
    a && (e.loaderCallbacks = a.filter((r) => r.id !== t));
  });
}
function Gr(n) {
  n.pendingCallbacksFlag || (n.pendingCallbacksFlag = !0, setTimeout(() => {
    n.pendingCallbacksFlag = !1;
    const t = n.loaderCallbacks ? n.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let e = !1;
    const a = n.provider, r = n.prefix;
    t.forEach((l) => {
      const s = l.icons, o = s.pending.length;
      s.pending = s.pending.filter((u) => {
        if (u.prefix !== r)
          return !0;
        const d = u.name;
        if (n.icons[d])
          s.loaded.push({
            provider: a,
            prefix: r,
            name: d
          });
        else if (n.missing.has(d))
          s.missing.push({
            provider: a,
            prefix: r,
            name: d
          });
        else
          return e = !0, !0;
        return !1;
      }), s.pending.length !== o && (e || ra([n], l.id), l.callback(
        s.loaded.slice(0),
        s.missing.slice(0),
        s.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let Xr = 0;
function Ur(n, t, e) {
  const a = Xr++, r = ra.bind(null, e, a);
  if (!t.pending.length)
    return r;
  const l = {
    id: a,
    icons: t,
    callback: n,
    abort: r
  };
  return e.forEach((s) => {
    (s.loaderCallbacks || (s.loaderCallbacks = [])).push(l);
  }), r;
}
function Zr(n, t = !0, e = !1) {
  const a = [];
  return n.forEach((r) => {
    const l = typeof r == "string" ? _t(r, t, e) : r;
    l && a.push(l);
  }), a;
}
var Jr = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function el(n, t, e, a) {
  const r = n.resources.length, l = n.random ? Math.floor(Math.random() * r) : n.index;
  let s;
  if (n.random) {
    let P = n.resources.slice(0);
    for (s = []; P.length > 1; ) {
      const x = Math.floor(Math.random() * P.length);
      s.push(P[x]), P = P.slice(0, x).concat(P.slice(x + 1));
    }
    s = s.concat(P);
  } else
    s = n.resources.slice(l).concat(n.resources.slice(0, l));
  const o = Date.now();
  let u = "pending", d = 0, p, v = null, m = [], I = [];
  typeof a == "function" && I.push(a);
  function _() {
    v && (clearTimeout(v), v = null);
  }
  function L() {
    u === "pending" && (u = "aborted"), _(), m.forEach((P) => {
      P.status === "pending" && (P.status = "aborted");
    }), m = [];
  }
  function y(P, x) {
    x && (I = []), typeof P == "function" && I.push(P);
  }
  function w() {
    return {
      startTime: o,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: m.length,
      subscribe: y,
      abort: L
    };
  }
  function T() {
    u = "failed", I.forEach((P) => {
      P(void 0, p);
    });
  }
  function S() {
    m.forEach((P) => {
      P.status === "pending" && (P.status = "aborted");
    }), m = [];
  }
  function D(P, x, N) {
    const E = x !== "success";
    switch (m = m.filter((B) => B !== P), u) {
      case "pending":
        break;
      case "failed":
        if (E || !n.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (x === "abort") {
      p = N, T();
      return;
    }
    if (E) {
      p = N, m.length || (s.length ? C() : T());
      return;
    }
    if (_(), S(), !n.random) {
      const B = n.resources.indexOf(P.resource);
      B !== -1 && B !== n.index && (n.index = B);
    }
    u = "completed", I.forEach((B) => {
      B(N);
    });
  }
  function C() {
    if (u !== "pending")
      return;
    _();
    const P = s.shift();
    if (P === void 0) {
      if (m.length) {
        v = setTimeout(() => {
          _(), u === "pending" && (S(), T());
        }, n.timeout);
        return;
      }
      T();
      return;
    }
    const x = {
      status: "pending",
      resource: P,
      callback: (N, E) => {
        D(x, N, E);
      }
    };
    m.push(x), d++, v = setTimeout(C, n.rotate), e(P, t, x.callback);
  }
  return setTimeout(C), w;
}
function la(n) {
  const t = {
    ...Jr,
    ...n
  };
  let e = [];
  function a() {
    e = e.filter((o) => o().status === "pending");
  }
  function r(o, u, d) {
    const p = el(
      t,
      o,
      u,
      (v, m) => {
        a(), d && d(v, m);
      }
    );
    return e.push(p), p;
  }
  function l(o) {
    return e.find((u) => o(u)) || null;
  }
  return {
    query: r,
    find: l,
    setIndex: (o) => {
      t.index = o;
    },
    getIndex: () => t.index,
    cleanup: a
  };
}
function _n() {
}
const Lt = /* @__PURE__ */ Object.create(null);
function tl(n) {
  if (!Lt[n]) {
    const t = tn(n);
    if (!t)
      return;
    const e = la(t), a = {
      config: t,
      redundancy: e
    };
    Lt[n] = a;
  }
  return Lt[n];
}
function nl(n, t, e) {
  let a, r;
  if (typeof n == "string") {
    const l = Ot(n);
    if (!l)
      return e(void 0, 424), _n;
    r = l.send;
    const s = tl(n);
    s && (a = s.redundancy);
  } else {
    const l = Jt(n);
    if (l) {
      a = la(l);
      const s = n.resources ? n.resources[0] : "", o = Ot(s);
      o && (r = o.send);
    }
  }
  return !a || !r ? (e(void 0, 424), _n) : a.query(t, r, e)().abort;
}
const xn = "iconify2", nt = "iconify", sa = nt + "-count", Dn = nt + "-version", oa = 36e5, al = 168, rl = 50;
function Rt(n, t) {
  try {
    return n.getItem(t);
  } catch {
  }
}
function nn(n, t, e) {
  try {
    return n.setItem(t, e), !0;
  } catch {
  }
}
function Tn(n, t) {
  try {
    n.removeItem(t);
  } catch {
  }
}
function Ft(n, t) {
  return nn(n, sa, t.toString());
}
function Vt(n) {
  return parseInt(Rt(n, sa)) || 0;
}
const Dt = {
  local: !0,
  session: !0
}, ia = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let an = !1;
function ll(n) {
  an = n;
}
let it = typeof window > "u" ? {} : window;
function ua(n) {
  const t = n + "Storage";
  try {
    if (it && it[t] && typeof it[t].length == "number")
      return it[t];
  } catch {
  }
  Dt[n] = !1;
}
function da(n, t) {
  const e = ua(n);
  if (!e)
    return;
  const a = Rt(e, Dn);
  if (a !== xn) {
    if (a) {
      const o = Vt(e);
      for (let u = 0; u < o; u++)
        Tn(e, nt + u.toString());
    }
    nn(e, Dn, xn), Ft(e, 0);
    return;
  }
  const r = Math.floor(Date.now() / oa) - al, l = (o) => {
    const u = nt + o.toString(), d = Rt(e, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > r && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        t(p, o))
          return !0;
      } catch {
      }
      Tn(e, u);
    }
  };
  let s = Vt(e);
  for (let o = s - 1; o >= 0; o--)
    l(o) || (o === s - 1 ? (s--, Ft(e, s)) : ia[n].add(o));
}
function ca() {
  if (!an) {
    ll(!0);
    for (const n in Dt)
      da(n, (t) => {
        const e = t.data, a = t.provider, r = e.prefix, l = qe(
          a,
          r
        );
        if (!Zt(l, e).length)
          return !1;
        const s = e.lastModified || -1;
        return l.lastModifiedCached = l.lastModifiedCached ? Math.min(l.lastModifiedCached, s) : s, !0;
      });
  }
}
function sl(n, t) {
  const e = n.lastModifiedCached;
  if (
    // Matches or newer
    e && e >= t
  )
    return e === t;
  if (n.lastModifiedCached = t, e)
    for (const a in Dt)
      da(a, (r) => {
        const l = r.data;
        return r.provider !== n.provider || l.prefix !== n.prefix || l.lastModified === t;
      });
  return !0;
}
function ol(n, t) {
  an || ca();
  function e(a) {
    let r;
    if (!Dt[a] || !(r = ua(a)))
      return;
    const l = ia[a];
    let s;
    if (l.size)
      l.delete(s = Array.from(l).shift());
    else if (s = Vt(r), s >= rl || !Ft(r, s + 1))
      return;
    const o = {
      cached: Math.floor(Date.now() / oa),
      provider: n.provider,
      data: t
    };
    return nn(
      r,
      nt + s.toString(),
      JSON.stringify(o)
    );
  }
  t.lastModified && !sl(n, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), e("local") || e("session"));
}
function In() {
}
function il(n) {
  n.iconsLoaderFlag || (n.iconsLoaderFlag = !0, setTimeout(() => {
    n.iconsLoaderFlag = !1, Gr(n);
  }));
}
function ul(n) {
  const t = [], e = [];
  return n.forEach((a) => {
    (a.match(Un) ? t : e).push(a);
  }), {
    valid: t,
    invalid: e
  };
}
function Xe(n, t, e, a) {
  function r() {
    const l = n.pendingIcons;
    t.forEach((s) => {
      l && l.delete(s), n.icons[s] || n.missing.add(s);
    });
  }
  if (e && typeof e == "object")
    try {
      if (!Zt(n, e).length) {
        r();
        return;
      }
      a && ol(n, e);
    } catch (l) {
      console.error(l);
    }
  r(), il(n);
}
function Cn(n, t) {
  n instanceof Promise ? n.then((e) => {
    t(e);
  }).catch(() => {
    t(null);
  }) : t(n);
}
function dl(n, t) {
  n.iconsToLoad ? n.iconsToLoad = n.iconsToLoad.concat(t).sort() : n.iconsToLoad = t, n.iconsQueueFlag || (n.iconsQueueFlag = !0, setTimeout(() => {
    n.iconsQueueFlag = !1;
    const { provider: e, prefix: a } = n, r = n.iconsToLoad;
    if (delete n.iconsToLoad, !r || !r.length)
      return;
    const l = n.loadIcon;
    if (n.loadIcons && (r.length > 1 || !l)) {
      Cn(
        n.loadIcons(r, a, e),
        (p) => {
          Xe(n, r, p, !1);
        }
      );
      return;
    }
    if (l) {
      r.forEach((p) => {
        const v = l(p, a, e);
        Cn(v, (m) => {
          const I = m ? {
            prefix: a,
            icons: {
              [p]: m
            }
          } : null;
          Xe(n, [p], I, !1);
        });
      });
      return;
    }
    const { valid: s, invalid: o } = ul(r);
    if (o.length && Xe(n, o, null, !1), !s.length)
      return;
    const u = a.match(Un) ? Ot(e) : null;
    if (!u) {
      Xe(n, s, null, !1);
      return;
    }
    u.prepare(e, a, s).forEach((p) => {
      nl(e, p, (v) => {
        Xe(n, p.icons, v, !0);
      });
    });
  }));
}
const cl = (n, t) => {
  const e = Zr(n, !0, ta()), a = zr(e);
  if (!a.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        a.loaded,
        a.missing,
        a.pending,
        In
      );
    }), () => {
      u = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), l = [];
  let s, o;
  return a.pending.forEach((u) => {
    const { provider: d, prefix: p } = u;
    if (p === o && d === s)
      return;
    s = d, o = p, l.push(qe(d, p));
    const v = r[d] || (r[d] = /* @__PURE__ */ Object.create(null));
    v[p] || (v[p] = []);
  }), a.pending.forEach((u) => {
    const { provider: d, prefix: p, name: v } = u, m = qe(d, p), I = m.pendingIcons || (m.pendingIcons = /* @__PURE__ */ new Set());
    I.has(v) || (I.add(v), r[d][p].push(v));
  }), l.forEach((u) => {
    const d = r[u.provider][u.prefix];
    d.length && dl(u, d);
  }), t ? Ur(t, a, l) : In;
};
function fl(n, t) {
  const e = {
    ...n
  };
  for (const a in t) {
    const r = t[a], l = typeof r;
    a in na ? (r === null || r && (l === "string" || l === "number")) && (e[a] = r) : l === typeof e[a] && (e[a] = a === "rotate" ? r % 4 : r);
  }
  return e;
}
const pl = /[\s,]+/;
function ml(n, t) {
  t.split(pl).forEach((e) => {
    switch (e.trim()) {
      case "horizontal":
        n.hFlip = !0;
        break;
      case "vertical":
        n.vFlip = !0;
        break;
    }
  });
}
function hl(n, t = 0) {
  const e = n.replace(/^-?[0-9.]*/, "");
  function a(r) {
    for (; r < 0; )
      r += 4;
    return r % 4;
  }
  if (e === "") {
    const r = parseInt(n);
    return isNaN(r) ? 0 : a(r);
  } else if (e !== n) {
    let r = 0;
    switch (e) {
      case "%":
        r = 25;
        break;
      case "deg":
        r = 90;
    }
    if (r) {
      let l = parseFloat(n.slice(0, n.length - e.length));
      return isNaN(l) ? 0 : (l = l / r, l % 1 === 0 ? a(l) : 0);
    }
  }
  return t;
}
function vl(n, t) {
  let e = n.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const a in t)
    e += " " + a + '="' + t[a] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + n + "</svg>";
}
function gl(n) {
  return n.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function bl(n) {
  return "data:image/svg+xml," + gl(n);
}
function yl(n) {
  return 'url("' + bl(n) + '")';
}
const En = {
  ...aa,
  inline: !1
}, kl = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, wl = {
  display: "inline-block"
}, Nt = {
  backgroundColor: "currentColor"
}, fa = {
  backgroundColor: "transparent"
}, Pn = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Mn = {
  webkitMask: Nt,
  mask: Nt,
  background: fa
};
for (const n in Mn) {
  const t = Mn[n];
  for (const e in Pn)
    t[n + e] = Pn[e];
}
const ft = {};
["horizontal", "vertical"].forEach((n) => {
  const t = n.slice(0, 1) + "Flip";
  ft[n + "-flip"] = t, ft[n.slice(0, 1) + "-flip"] = t, ft[n + "Flip"] = t;
});
function Ln(n) {
  return n + (n.match(/^[-0-9.]+$/) ? "px" : "");
}
const Bn = (n, t) => {
  const e = fl(En, t), a = { ...kl }, r = t.mode || "svg", l = {}, s = t.style, o = typeof s == "object" && !(s instanceof Array) ? s : {};
  for (let L in t) {
    const y = t[L];
    if (y !== void 0)
      switch (L) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          e[L] = y === !0 || y === "true" || y === 1;
          break;
        case "flip":
          typeof y == "string" && ml(e, y);
          break;
        case "color":
          l.color = y;
          break;
        case "rotate":
          typeof y == "string" ? e[L] = hl(y) : typeof y == "number" && (e[L] = y);
          break;
        case "ariaHidden":
        case "aria-hidden":
          y !== !0 && y !== "true" && delete a["aria-hidden"];
          break;
        default: {
          const w = ft[L];
          w ? (y === !0 || y === "true" || y === 1) && (e[w] = !0) : En[L] === void 0 && (a[L] = y);
        }
      }
  }
  const u = $r(n, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    a.style = {
      ...l,
      ...o
    }, Object.assign(a, d);
    let L = 0, y = t.id;
    return typeof y == "string" && (y = y.replace(/-/g, "_")), a.innerHTML = Fr(u.body, y ? () => y + "ID" + L++ : "iconifyVue"), vn("svg", a);
  }
  const { body: p, width: v, height: m } = n, I = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), _ = vl(p, {
    ...d,
    width: v + "",
    height: m + ""
  });
  return a.style = {
    ...l,
    "--svg": yl(_),
    width: Ln(d.width),
    height: Ln(d.height),
    ...wl,
    ...I ? Nt : fa,
    ...o
  }, vn("span", a);
};
ta(!0);
Vr("", Yr);
if (typeof document < "u" && typeof window < "u") {
  ca();
  const n = window;
  if (n.IconifyPreload !== void 0) {
    const t = n.IconifyPreload, e = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((a) => {
      try {
        // Check if item is an object and not null/array
        (typeof a != "object" || a === null || a instanceof Array || // Check for 'icons' and 'prefix'
        typeof a.icons != "object" || typeof a.prefix != "string" || // Add icon set
        !Cr(a)) && console.error(e);
      } catch {
        console.error(e);
      }
    });
  }
  if (n.IconifyProviders !== void 0) {
    const t = n.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let e in t) {
        const a = "IconifyProviders[" + e + "] is invalid.";
        try {
          const r = t[e];
          if (typeof r != "object" || !r || r.resources === void 0)
            continue;
          Nr(e, r) || console.error(a);
        } catch {
          console.error(a);
        }
      }
  }
}
const _l = {
  ...xt,
  body: ""
}, xl = F({
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
    getIcon(n, t, e) {
      if (typeof n == "object" && n !== null && typeof n.body == "string")
        return this._name = "", this.abortLoading(), {
          data: n
        };
      let a;
      if (typeof n != "string" || (a = _t(n, !1, !0)) === null)
        return this.abortLoading(), null;
      let r = Tr(a);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== n) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: n,
          abort: cl([a], () => {
            this.counter++;
          })
        })), null;
      if (this.abortLoading(), this._name !== n && (this._name = n, t && t(n)), e) {
        r = Object.assign({}, r);
        const s = e(r.body, a.name, a.prefix, a.provider);
        typeof s == "string" && (r.body = s);
      }
      const l = ["iconify"];
      return a.prefix !== "" && l.push("iconify--" + a.prefix), a.provider !== "" && l.push("iconify--" + a.provider), { data: r, classes: l };
    }
  },
  // Render icon
  render() {
    this.counter;
    const n = this.$attrs, t = this.iconMounted || n.ssr ? this.getIcon(n.icon, n.onLoad, n.customise) : null;
    if (!t)
      return Bn(_l, n);
    let e = n;
    return t.classes && (e = {
      ...n,
      class: (typeof n.class == "string" ? n.class + " " : "") + t.classes.join(" ")
    }), Bn({
      ...xt,
      ...t.data
    }, e);
  }
}), rn = Symbol("accordions"), ln = Symbol("header"), Tt = Symbol("tabs"), Se = () => {
  const n = Q(), t = Q(!1), e = Q(!1), a = () => {
    if (!n.value)
      return;
    n.value.style.setProperty("--collapser", "none");
    const r = n.value.offsetHeight;
    n.value.style.setProperty("--collapse", `${-r}px`), n.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: n,
    collapsing: t,
    cssExpanded: e,
    doExpand: (r) => {
      n.value && (r === !0 && n.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        t.value = !0, a(), window.requestAnimationFrame(() => {
          e.value = r;
        });
      }));
    },
    adjust: a,
    onTransitionEnd: (r, l = !0) => {
      var s, o;
      t.value = !1, l && ((o = (s = n.value) == null ? void 0 : s.querySelector("a")) == null || o.focus()), n.value && r === !1 && n.value.style.removeProperty("--collapse-max-height");
    }
  };
}, se = (n = "", t = "") => (n ? `${n}-` : "") + zt() + (t ? `-${t}` : ""), Dl = { class: "fr-accordion" }, Tl = ["aria-expanded", "aria-controls"], Il = ["id"], Cl = /* @__PURE__ */ F({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => se("accordion") },
    selected: { type: Boolean },
    title: { default: "Sans intitulé" },
    titleTag: { default: "h3" }
  },
  setup(n) {
    const t = n, {
      collapse: e,
      collapsing: a,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se(), o = Q(), u = Qe(rn), { isActive: d, expand: p } = (u == null ? void 0 : u(st(() => t.title))) ?? { isActive: o, expand: () => o.value = !o.value };
    return we(() => {
      d.value && l(!0);
    }), fe(d, (v, m) => {
      v !== m && l(v);
    }), (v, m) => (i(), f("section", Dl, [
      (i(), W(ve(v.titleTag), { class: "fr-accordion__title" }, {
        default: U(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": H(d),
            "aria-controls": v.id,
            type: "button",
            onClick: m[0] || (m[0] = (I) => H(p)())
          }, [
            $(v.$slots, "title", {}, () => [
              V(h(v.title), 1)
            ])
          ], 8, Tl)
        ]),
        _: 3
      })),
      c("div", {
        id: v.id,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse", {
          "fr-collapse--expanded": H(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": H(a)
        }]),
        onTransitionend: m[1] || (m[1] = (I) => H(s)(H(d), !1))
      }, [
        $(v.$slots, "default")
      ], 42, Il)
    ]));
  }
}), El = { class: "fr-accordions-group" }, Pl = /* @__PURE__ */ F({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: t }) {
    const e = n, a = t, r = k({
      get: () => e.modelValue,
      set(o) {
        a("update:modelValue", o);
      }
    }), l = Q(/* @__PURE__ */ new Map()), s = Q(0);
    return Re(rn, (o) => {
      const u = s.value++;
      l.value.set(u, o.value);
      const d = k(() => u === r.value);
      fe(o, () => {
        l.value.set(u, o.value);
      });
      function p() {
        if (r.value === u) {
          r.value = -1;
          return;
        }
        r.value = u;
      }
      return Ee(() => {
        l.value.delete(u);
      }), { isActive: d, expand: p };
    }), (o, u) => (i(), f("div", El, [
      $(o.$slots, "default")
    ]));
  }
}), Ml = ["id", "role"], Ll = ["title", "aria-label"], Bl = /* @__PURE__ */ F({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => se("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(n, { emit: t }) {
    const e = n, a = t, r = () => a("close"), l = k(
      () => [
        `fr-alert--${e.type}`,
        {
          "fr-alert--sm": e.small
        }
      ]
    );
    return (s, o) => s.closed ? b("", !0) : (i(), f("div", {
      key: 0,
      id: s.id,
      class: R(["fr-alert", l.value]),
      role: s.alert ? "alert" : void 0
    }, [
      s.small ? b("", !0) : (i(), W(ve(s.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: U(() => [
          V(h(s.title), 1)
        ]),
        _: 1
      })),
      $(s.$slots, "default", {}, () => [
        V(h(s.description), 1)
      ]),
      s.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: s.closeButtonLabel,
        "aria-label": s.closeButtonLabel,
        onClick: r
      }, null, 8, Ll)) : b("", !0)
    ], 10, Ml));
  }
}), Sl = /* @__PURE__ */ F({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(n) {
    return (t, e) => (i(), f("a", {
      class: R(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, h(t.label), 3));
  }
}), $l = ["title"], pa = /* @__PURE__ */ F({
  __name: "DsfrBadge",
  props: {
    label: {},
    type: { default: "info" },
    noIcon: { type: Boolean },
    small: { type: Boolean },
    ellipsis: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("p", {
      class: R(["fr-badge", {
        [`fr-badge--${t.type}`]: t.type,
        "fr-badge--no-icon": t.noIcon,
        "fr-badge--sm": t.small
      }]),
      title: t.ellipsis ? t.label : void 0
    }, [
      c("span", {
        class: R(t.ellipsis ? "fr-ellipsis" : "")
      }, h(t.label), 3)
    ], 10, $l));
  }
}), Al = ["aria-label"], Ol = ["aria-expanded", "aria-controls"], Rl = ["id"], Fl = { class: "fr-breadcrumb__list" }, Vl = ["aria-current"], Nl = /* @__PURE__ */ F({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => se("breadcrumb") },
    links: { default: () => [{ text: "" }] },
    navigationLabel: { default: "vous êtes ici :" },
    showBreadcrumbLabel: { default: "Voir le fil d’Ariane" }
  },
  setup(n) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: a,
      doExpand: r,
      onTransitionEnd: l
    } = Se(), s = Q(!1);
    return fe(s, (o, u) => {
      o !== u && r(o);
    }), (o, u) => {
      const d = xe("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": o.navigationLabel
      }, [
        s.value ? b("", !0) : (i(), f("button", {
          key: 0,
          class: "fr-breadcrumb__button",
          "aria-expanded": s.value,
          "aria-controls": o.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => s.value = !s.value)
        }, h(o.showBreadcrumbLabel), 9, Ol)),
        c("div", {
          id: o.breadcrumbId,
          ref_key: "collapse",
          ref: t,
          class: R(["fr-collapse", {
            "fr-collapse--expanded": H(a),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": H(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => H(l)(s.value))
        }, [
          c("ol", Fl, [
            (i(!0), f(G, null, J(o.links, (p, v) => (i(), f("li", {
              key: v,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), W(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": v === o.links.length - 1 ? "page" : void 0
              }, {
                default: U(() => [
                  V(h(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : b("", !0),
              p.to ? b("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": v === o.links.length - 1 ? "page" : void 0
              }, h(p.text), 9, Vl))
            ]))), 128))
          ])
        ], 42, Rl)
      ], 8, Al);
    };
  }
}), ql = /* @__PURE__ */ F({
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
  setup(n) {
    Gt((u) => ({
      "177d0d84": o.value
    }));
    const t = n, e = Q(null), a = k(() => `${+t.scale * 1.2}rem`), r = k(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    fe(() => t.title, l);
    async function l() {
      var u, d, p, v;
      if (!((u = e.value) != null && u.$el))
        return;
      const m = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), I = document.createElement("title");
      if (!t.title) {
        I.remove();
        return;
      }
      I.innerHTML = t.title, await Xn(), m || (v = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || v.before(I);
    }
    we(l);
    const s = k(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), o = k(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), W(H(xl), {
      ref_key: "icon",
      ref: e,
      icon: s.value,
      style: Te({ fontSize: a.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: R(["vicon", {
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
      flip: r.value,
      ssr: u.ssr
    }, null, 8, ["icon", "style", "aria-label", "class", "flip", "ssr"]));
  }
}), ke = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [a, r] of t)
    e[a] = r;
  return e;
}, be = /* @__PURE__ */ ke(ql, [["__scopeId", "data-v-73a1cd7e"]]), jl = ["title", "disabled", "aria-disabled"], Hl = { key: 1 }, Wl = /* @__PURE__ */ F({
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
  setup(n, { expose: t }) {
    const e = n, a = k(() => ["sm", "small"].includes(e.size)), r = k(() => ["md", "medium"].includes(e.size)), l = k(() => ["lg", "large"].includes(e.size)), s = Q(null);
    t({ focus: () => {
      var p;
      (p = s.value) == null || p.focus();
    } });
    const o = k(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = k(() => e.iconOnly ? 1.25 : 0.8325), d = k(
      () => typeof e.icon == "string" ? { scale: u.value, name: e.icon } : { scale: u.value, ...e.icon }
    );
    return (p, v) => (i(), f("button", {
      ref_key: "btn",
      ref: s,
      class: R(["fr-btn", {
        "fr-btn--secondary": p.secondary && !p.tertiary,
        "fr-btn--tertiary": p.tertiary && !p.secondary && !p.noOutline,
        "fr-btn--tertiary-no-outline": p.tertiary && !p.secondary && p.noOutline,
        "fr-btn--sm": a.value,
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
      style: Te(!o.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: v[0] || (v[0] = (m) => p.onClick ? p.onClick(m) : () => {
      })
    }, [
      p.icon && !o.value ? (i(), W(be, Ie(Y({ key: 0 }, d.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", Hl, [
        V(h(p.label) + " ", 1),
        $(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, jl));
  }
}), je = /* @__PURE__ */ ke(Wl, [["__scopeId", "data-v-118397f5"]]), It = /* @__PURE__ */ F({
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
  setup(n) {
    const t = n, e = Q(null), a = k(() => ["sm", "small"].includes(t.size)), r = k(() => ["md", "medium"].includes(t.size)), l = k(() => ["lg", "large"].includes(t.size)), s = k(() => ["always", "", !0].includes(t.inlineLayoutWhen)), o = k(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = k(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = k(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = k(() => t.align === "center"), v = k(() => t.align === "right"), m = Q("auto"), I = k(() => `--equisized-width: ${m.value};`), _ = async () => {
      var L;
      let y = 0;
      await new Promise((w) => setTimeout(w, 100)), (L = e.value) == null || L.querySelectorAll(".fr-btn").forEach((w) => {
        const T = w, S = T.offsetWidth, D = window.getComputedStyle(T), C = +D.marginLeft.replace("px", ""), P = +D.marginRight.replace("px", "");
        T.style.width = "var(--equisized-width)";
        const x = S + C + P;
        x > y && (y = x);
      }), m.value = `${y}px`;
    };
    return we(async () => {
      !e.value || !t.equisized || await _();
    }), (L, y) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: Te(I.value),
      class: R(["fr-btns-group", {
        "fr-btns-group--equisized": L.equisized,
        "fr-btns-group--sm": a.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": s.value || o.value,
        "fr-btns-group--inline-md": s.value || u.value,
        "fr-btns-group--inline-lg": s.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": v.value,
        "fr-btns-group--icon-right": L.iconRight,
        "fr-btns-group--inline-reverse": L.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(G, null, J(L.buttons, ({ onClick: w, ...T }, S) => (i(), f("li", { key: S }, [
        ee(je, Y({ ref_for: !0 }, T, { onClick: w }), null, 16, ["onClick"])
      ]))), 128)),
      $(L.$slots, "default")
    ], 6));
  }
}), Kl = {
  key: 2,
  class: "fr-callout__text"
}, Ql = {
  key: 4,
  class: "fr-callout__text"
}, Yl = /* @__PURE__ */ F({
  __name: "DsfrCallout",
  props: {
    title: {},
    content: {},
    titleTag: { default: "h3" },
    button: { default: () => {
    } },
    icon: { default: void 0 }
  },
  setup(n) {
    const t = n, e = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), a = k(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : { ...t.icon ?? {} });
    return (r, l) => (i(), f("div", {
      class: R(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && a.value ? (i(), W(be, Ie(Y({ key: 0 }, a.value)), null, 16)) : b("", !0),
      r.title ? (i(), W(ve(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: U(() => [
          V(h(r.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      r.content ? (i(), f("p", Kl, h(r.content), 1)) : b("", !0),
      r.button ? (i(), W(je, Ie(Y({ key: 3 }, r.button)), null, 16)) : b("", !0),
      r.$slots.default && !r.content ? (i(), f("div", Ql, [
        $(r.$slots, "default", {}, void 0, !0)
      ])) : $(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), zl = /* @__PURE__ */ ke(Yl, [["__scopeId", "data-v-c59b3cec"]]), qt = /* @__PURE__ */ F({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(n) {
    const t = n, e = k(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), a = k(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: R(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), W(be, Ie(Y({ key: 0 }, a.value)), null, 16)) : b("", !0),
      $(r.$slots, "default")
    ], 2));
  }
}), Gl = { class: "fr-card__body" }, Xl = { class: "fr-card__content" }, Ul = ["href"], Zl = { class: "fr-card__desc" }, Jl = {
  key: 0,
  class: "fr-card__start"
}, es = {
  key: 1,
  class: "fr-card__end"
}, ts = {
  key: 0,
  class: "fr-card__footer"
}, ns = {
  key: 1,
  class: "fr-links-group"
}, as = ["href"], rs = {
  key: 0,
  class: "fr-card__header"
}, ls = {
  key: 0,
  class: "fr-card__img"
}, ss = ["src", "alt"], os = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, is = /* @__PURE__ */ F({
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
  setup(n, { expose: t }) {
    const e = n, a = k(() => ["sm", "small"].includes(e.size)), r = k(() => ["lg", "large"].includes(e.size)), l = k(() => ["sm", "small"].includes(e.imgRatio)), s = k(() => ["lg", "large"].includes(e.imgRatio)), o = k(() => typeof e.link == "string" && e.link.startsWith("http")), u = Q(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const v = xe("RouterLink");
      return i(), f("div", {
        class: R(["fr-card", {
          "fr-card--horizontal": d.horizontal,
          "fr-enlarge-link": !d.noArrow,
          "fr-card--sm": a.value,
          "fr-card--lg": r.value,
          "fr-card--horizontal-tier": l.value,
          "fr-card--horizontal-half": s.value,
          "fr-card--download": d.download,
          "fr-enlarge-button": d.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        c("div", Gl, [
          c("div", Xl, [
            (i(), W(ve(d.titleTag), { class: "fr-card__title" }, {
              default: U(() => [
                o.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, h(d.title), 9, Ul)) : d.link ? (i(), W(v, {
                  key: 1,
                  to: d.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (m) => m.stopPropagation())
                }, {
                  default: U(() => [
                    V(h(d.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(G, { key: 2 }, [
                  V(h(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Zl, h(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Jl, [
              $(d.$slots, "start-details"),
              d.detail ? (i(), W(qt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: U(() => [
                  V(h(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", es, [
              $(d.$slots, "end-details"),
              d.endDetail ? (i(), W(qt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: U(() => [
                  V(h(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", ts, [
            d.buttons.length ? (i(), W(It, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            d.linksGroup.length ? (i(), f("ul", ns, [
              (i(!0), f(G, null, J(d.linksGroup, (m, I) => (i(), f("li", {
                key: `card-link-${I}`
              }, [
                m.to ? (i(), W(v, {
                  key: 0,
                  to: m.to
                }, {
                  default: U(() => [
                    V(h(m.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: m.link || m.href,
                  class: R(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": a.value,
                    "fr-link--lg": r.value
                  }])
                }, h(m.label), 11, as))
              ]))), 128))
            ])) : b("", !0)
          ])) : b("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", rs, [
          d.imgSrc ? (i(), f("div", ls, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, ss)
          ])) : b("", !0),
          d.badges.length ? (i(), f("ul", os, [
            (i(!0), f(G, null, J(d.badges, (m, I) => (i(), f("li", { key: I }, [
              ee(pa, Y({ ref_for: !0 }, m), null, 16)
            ]))), 128))
          ])) : b("", !0)
        ])) : b("", !0)
      ], 2);
    };
  }
}), us = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex"], ds = ["for"], cs = {
  key: 0,
  class: "required"
}, fs = {
  key: 0,
  class: "fr-hint-text"
}, ps = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, ms = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ Be({
    id: { default: () => se("basic", "checkbox") },
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
  setup(n) {
    Gt((l) => ({
      "5f542ece": l.readonlyOpacity
    }));
    const t = n, e = k(() => t.errorMessage || t.validMessage), a = k(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _e(n, "modelValue");
    return (l, s) => (i(), f("div", {
      class: R(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline, readonly: l.readonly }])
    }, [
      c("div", {
        class: R(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Le(c("input", Y({
          id: l.id,
          "onUpdate:modelValue": s[0] || (s[0] = (o) => r.value = o),
          name: l.name,
          type: "checkbox",
          value: l.value,
          checked: r.value === !0 || Array.isArray(r.value) && r.value.includes(l.value),
          required: l.required
        }, l.$attrs, {
          "data-testid": `input-checkbox-${l.id}`,
          "data-test": `input-checkbox-${l.id}`,
          tabindex: l.readonly ? -1 : void 0
        }), null, 16, us), [
          [kt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          $(l.$slots, "label", {}, () => [
            V(h(l.label) + " ", 1),
            $(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", cs, " *")) : b("", !0)
            ], !0)
          ], !0),
          l.hint ? (i(), f("span", fs, h(l.hint), 1)) : b("", !0)
        ], 8, ds),
        e.value ? (i(), f("div", ps, [
          c("p", {
            class: R(["fr-message--info flex items-center", a.value])
          }, h(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Ct = /* @__PURE__ */ ke(ms, [["__scopeId", "data-v-18fa6c7b"]]), hs = { class: "fr-form-group" }, vs = ["disabled", "aria-labelledby", "aria-invalid", "role"], gs = ["id"], bs = {
  key: 0,
  class: "required"
}, ys = ["id"], ks = /* @__PURE__ */ F({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Be({
    titleId: { default: () => se("checkbox", "set") },
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
  setup(n) {
    const t = n, e = k(() => t.errorMessage || t.validMessage), a = k(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = k(() => e.value ? `${t.titleId} messages-${t.titleId}` : t.titleId), l = _e(n, "modelValue");
    return (s, o) => (i(), f("div", hs, [
      c("fieldset", {
        class: R(["fr-fieldset", {
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
          $(s.$slots, "legend", {}, () => [
            V(h(s.legend) + " ", 1),
            $(s.$slots, "required-tip", {}, () => [
              s.required ? (i(), f("span", bs, " *")) : b("", !0)
            ])
          ])
        ], 8, gs),
        $(s.$slots, "default", {}, () => [
          (i(!0), f(G, null, J(s.options, (u) => (i(), W(Ct, {
            id: u.id,
            key: u.id || u.name,
            modelValue: l.value,
            "onUpdate:modelValue": o[0] || (o[0] = (d) => l.value = d),
            value: u.value,
            name: u.name,
            label: u.label,
            disabled: u.disabled,
            "aria-disabled": u.disabled,
            small: s.small,
            inline: s.inline,
            hint: u.hint
          }, null, 8, ["id", "modelValue", "value", "name", "label", "disabled", "aria-disabled", "small", "inline", "hint"]))), 128))
        ]),
        e.value ? (i(), f("div", {
          key: 0,
          id: `messages-${s.titleId}`,
          class: "fr-messages-group",
          role: "alert"
        }, [
          c("p", {
            class: R(["fr-message--info flex items-center", a.value])
          }, [
            c("span", null, h(e.value), 1)
          ], 2)
        ], 8, ys)) : b("", !0)
      ], 10, vs)
    ]));
  }
}), ws = { class: "fr-consent-banner__content" }, _s = { class: "fr-text--sm" }, xs = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, Ds = /* @__PURE__ */ F({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(n) {
    const t = n, e = k(() => typeof t.url == "string" && t.url.startsWith("http")), a = k(() => t.url ? e.value ? "a" : "RouterLink" : "a"), r = k(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, s) => (i(), f(G, null, [
      c("div", ws, [
        c("p", _s, [
          $(l.$slots, "default", {}, () => [
            s[4] || (s[4] = V(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), W(ve(a.value), Y(r.value, { "data-testid": "link" }), {
              default: U(() => s[3] || (s[3] = [
                V(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            s[5] || (s[5] = V(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", xs, [
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: s[0] || (s[0] = te((o) => l.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: s[1] || (s[1] = te((o) => l.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        c("li", null, [
          c("button", {
            class: "fr-btn fr-btn--secondary",
            "data-fr-opened": "false",
            "aria-controls": "fr-consent-modal",
            title: "Personnaliser les cookies",
            onClick: s[2] || (s[2] = te((o) => l.$emit("customize"), ["stop"]))
          }, " Personnaliser ")
        ])
      ])
    ], 64));
  }
}), Ts = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, Is = { class: "fr-pagination__list" }, Cs = ["href", "title", "disabled", "aria-disabled"], Es = ["href", "title", "disabled", "aria-disabled"], Ps = ["href", "title", "aria-current", "onClick"], Ms = { key: 0 }, Ls = { key: 1 }, Bs = ["href", "title", "disabled", "aria-disabled"], Ss = ["href", "title", "disabled", "aria-disabled"], $s = /* @__PURE__ */ F({
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
  setup(n, { emit: t }) {
    const e = n, a = t, r = k(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = k(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), s = k(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), o = (_) => a("update:current-page", _), u = (_) => o(_), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), v = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), m = () => u(e.pages.length - 1), I = (_) => e.pages.indexOf(_) === e.currentPage;
    return (_, L) => {
      var y, w, T, S;
      return i(), f("nav", Ts, [
        c("ul", Is, [
          c("li", null, [
            c("a", {
              href: (y = _.pages[0]) == null ? void 0 : y.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: _.firstPageTitle,
              disabled: _.currentPage === 0 ? !0 : void 0,
              "aria-disabled": _.currentPage === 0 ? !0 : void 0,
              onClick: L[0] || (L[0] = te((D) => d(), ["prevent"]))
            }, null, 8, Cs)
          ]),
          c("li", null, [
            c("a", {
              href: (w = _.pages[Math.max(_.currentPage - 1, 0)]) == null ? void 0 : w.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: _.prevPageTitle,
              disabled: _.currentPage === 0 ? !0 : void 0,
              "aria-disabled": _.currentPage === 0 ? !0 : void 0,
              onClick: L[1] || (L[1] = te((D) => p(), ["prevent"]))
            }, h(_.prevPageTitle), 9, Es)
          ]),
          (i(!0), f(G, null, J(s.value, (D, C) => (i(), f("li", { key: C }, [
            c("a", {
              href: D == null ? void 0 : D.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: D.title,
              "aria-current": I(D) ? "page" : void 0,
              onClick: te((P) => u(_.pages.indexOf(D)), ["prevent"])
            }, [
              s.value.indexOf(D) === 0 && r.value > 0 ? (i(), f("span", Ms, "...")) : b("", !0),
              V(" " + h(D.label) + " ", 1),
              s.value.indexOf(D) === s.value.length - 1 && l.value < _.pages.length - 1 ? (i(), f("span", Ls, "...")) : b("", !0)
            ], 8, Ps)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (T = _.pages[Math.min(_.currentPage + 1, _.pages.length - 1)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: _.nextPageTitle,
              disabled: _.currentPage === _.pages.length - 1 ? !0 : void 0,
              "aria-disabled": _.currentPage === _.pages.length - 1 ? !0 : void 0,
              onClick: L[2] || (L[2] = te((D) => v(), ["prevent"]))
            }, h(_.nextPageTitle), 9, Bs)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (S = _.pages.at(-1)) == null ? void 0 : S.href,
              title: _.lastPageTitle,
              disabled: _.currentPage === _.pages.length - 1 ? !0 : void 0,
              "aria-disabled": _.currentPage === _.pages.length - 1 ? !0 : void 0,
              onClick: L[3] || (L[3] = te((D) => m(), ["prevent"]))
            }, null, 8, Ss)
          ])
        ])
      ]);
    };
  }
}), sn = /* @__PURE__ */ ke($s, [["__scopeId", "data-v-4dfa8248"]]), As = { class: "fr-table" }, Os = { class: "fr-table__wrapper" }, Rs = { class: "fr-table__container" }, Fs = { class: "fr-table__content" }, Vs = ["id"], Ns = { key: 0 }, qs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, js = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Hs = ["id", "checked"], Ws = ["for"], Ks = ["tabindex", "onClick", "onKeydown"], Qs = { key: 0 }, Ys = { key: 1 }, zs = ["data-row-key"], Gs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Xs = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Us = ["id", "value"], Zs = ["for"], Js = ["onKeydown"], eo = { class: "flex gap-2 items-center" }, to = ["selected"], no = ["value", "selected"], ao = { class: "flex ml-1" }, ro = { class: "self-center" }, lo = /* @__PURE__ */ F({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Be({
    id: { default: () => se("table") },
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
    currentPage: { default: 0 },
    currentPageModifiers: {},
    sortedBy: { default: void 0 },
    sortedByModifiers: {},
    sortedDesc: { default: !1 },
    sortedDescModifiers: {}
  }),
  emits: /* @__PURE__ */ Be(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(n, { emit: t }) {
    const e = n, a = t, r = _e(n, "selection"), l = _e(n, "rowsPerPage"), s = _e(n, "currentPage"), o = k(() => Math.ceil(e.rows.length / l.value)), u = k(() => e.pages ?? Array.from({ length: o.value }).map((C, P) => ({ label: `${P + 1}`, title: `Page ${P + 1}`, href: `#${P + 1}` }))), d = k(() => s.value * l.value), p = k(() => (s.value + 1) * l.value), v = _e(n, "sortedBy"), m = _e(n, "sortedDesc");
    function I(C, P) {
      const x = v.value ?? e.sorted;
      return (C[x] ?? C) < (P[x] ?? P) ? -1 : (C[x] ?? C) > (P[x] ?? P) ? 1 : 0;
    }
    function _(C) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(C))) {
        if (v.value === C) {
          if (m.value) {
            v.value = void 0, m.value = !1;
            return;
          }
          m.value = !0;
          return;
        }
        m.value = !1, v.value = C;
      }
    }
    const L = k(() => {
      const C = v.value ? e.rows.slice().sort(e.sortFn ?? I) : e.rows.slice();
      return m.value && C.reverse(), C;
    }), y = k(() => {
      const C = e.headersRow.map((x) => typeof x != "object" ? x : x.key), P = L.value.map((x) => Array.isArray(x) ? x : C.map((N) => typeof x != "object" ? x : x[N] ?? x));
      return e.pagination ? P.slice(d.value, p.value) : P;
    });
    function w(C) {
      if (C) {
        const P = e.headersRow.findIndex((x) => x.key ?? x);
        r.value = y.value.map((x) => x[P]);
      } else
        r.value.length = 0;
    }
    const T = k(() => r.value.length === y.value.length);
    function S() {
      a("update:current-page", 0), r.value.length = 0;
    }
    function D(C) {
      navigator.clipboard.writeText(C);
    }
    return (C, P) => (i(), f("div", As, [
      c("div", Os, [
        c("div", Rs, [
          c("div", Fs, [
            c("table", { id: C.id }, [
              C.noCaption ? b("", !0) : (i(), f("caption", Ns, h(C.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  C.selectableRows ? (i(), f("th", qs, [
                    c("div", js, [
                      c("input", {
                        id: `table-select--${C.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: P[0] || (P[0] = (x) => w(x.target.checked))
                      }, null, 40, Hs),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${C.id}-all`
                      }, " Sélectionner tout ", 8, Ws)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(G, null, J(C.headersRow, (x, N) => (i(), f("th", Y({
                    key: typeof x == "object" ? x.key : x,
                    scope: "col",
                    ref_for: !0
                  }, typeof x == "object" && x.headerAttrs, {
                    tabindex: C.sortableRows ? 0 : void 0,
                    onClick: (E) => _(x.key ?? (Array.isArray(C.rows[0]) ? N : x)),
                    onKeydown: [
                      ne((E) => _(x.key ?? x), ["enter"]),
                      ne((E) => _(x.key ?? x), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: R({ "sortable-header": C.sortableRows === !0 || Array.isArray(C.sortableRows) && C.sortableRows.includes(x.key ?? x) })
                    }, [
                      $(C.$slots, "header", Y({ ref_for: !0 }, typeof x == "object" ? x : { key: x, label: x }), () => [
                        V(h(typeof x == "object" ? x.label : x), 1)
                      ], !0),
                      v.value !== (x.key ?? x) && (C.sortableRows === !0 || Array.isArray(C.sortableRows) && C.sortableRows.includes(x.key ?? x)) ? (i(), f("span", Qs, [
                        ee(be, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : v.value === (x.key ?? x) ? (i(), f("span", Ys, [
                        ee(be, {
                          name: m.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Ks))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(G, null, J(y.value, (x, N) => (i(), f("tr", {
                  key: `row-${N}`,
                  "data-row-key": N + 1
                }, [
                  C.selectableRows ? (i(), f("th", Gs, [
                    c("div", Xs, [
                      Le(c("input", {
                        id: `row-select-${C.id}-${N}`,
                        "onUpdate:modelValue": P[1] || (P[1] = (E) => r.value = E),
                        value: C.rows[N][C.rowKey] ?? `row-${N}`,
                        type: "checkbox"
                      }, null, 8, Us), [
                        [kt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${C.id}-${N}`
                      }, " Sélectionner la ligne " + h(N + 1), 9, Zs)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(G, null, J(x, (E, B) => (i(), f("td", {
                    key: typeof E == "object" ? E[C.rowKey] : E,
                    tabindex: "0",
                    onKeydown: [
                      ne(te((g) => D(typeof E == "object" ? E[C.rowKey] : E), ["ctrl"]), ["c"]),
                      ne(te((g) => D(typeof E == "object" ? E[C.rowKey] : E), ["meta"]), ["c"])
                    ]
                  }, [
                    $(C.$slots, "cell", Y({ ref_for: !0 }, {
                      colKey: typeof C.headersRow[B] == "object" ? C.headersRow[B].key : C.headersRow[B],
                      cell: E
                    }), () => [
                      V(h(typeof E == "object" ? E[C.rowKey] : E), 1)
                    ], !0)
                  ], 40, Js))), 128))
                ], 8, zs))), 128))
              ])
            ], 8, Vs)
          ])
        ])
      ]),
      c("div", {
        class: R(C.bottomActionBarClass)
      }, [
        $(C.$slots, "pagination", {}, () => [
          C.pagination && !C.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: R(["flex justify-between items-center", C.paginationWrapperClass])
          }, [
            c("div", eo, [
              P[6] || (P[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Le(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": P[2] || (P[2] = (x) => l.value = x),
                class: "fr-select",
                onChange: P[3] || (P[3] = (x) => S())
              }, [
                c("option", {
                  value: "",
                  selected: !C.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, to),
                (i(!0), f(G, null, J(C.paginationOptions, (x, N) => (i(), f("option", {
                  key: N,
                  value: x,
                  selected: +x === l.value
                }, h(x), 9, no))), 128))
              ], 544), [
                [Ut, l.value]
              ])
            ]),
            c("div", ao, [
              c("span", ro, "Page " + h(s.value + 1) + " sur " + h(o.value), 1)
            ]),
            ee(sn, {
              "current-page": s.value,
              "onUpdate:currentPage": [
                P[4] || (P[4] = (x) => s.value = x),
                P[5] || (P[5] = (x) => r.value.length = 0)
              ],
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), so = /* @__PURE__ */ ke(lo, [["__scopeId", "data-v-831b7391"]]), oo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", io = { class: "fr-container flex" }, uo = { class: "half" }, co = { class: "fr-h1" }, fo = { class: "flex fr-my-md-3w" }, po = { class: "fr-h6" }, mo = /* @__PURE__ */ F({
  __name: "DsfrErrorPage",
  props: {
    title: { default: "Page non trouvée" },
    subtitle: { default: "Erreur 404" },
    description: { default: "La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée." },
    help: { default: "Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est correcte. La page n'est peut être plus disponible." },
    buttons: { default: void 0 }
  },
  setup(n) {
    return (t, e) => {
      var a;
      return i(), f("div", io, [
        c("div", uo, [
          c("h1", co, h(t.title), 1),
          c("span", fo, h(t.subtitle), 1),
          c("p", po, h(t.description), 1),
          c("p", null, h(t.help), 1),
          (a = t.buttons) != null && a.length ? (i(), W(It, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : b("", !0),
          $(t.$slots, "default", {}, void 0, !0)
        ]),
        e[0] || (e[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: oo
          })
        ], -1))
      ]);
    };
  }
}), ho = /* @__PURE__ */ ke(mo, [["__scopeId", "data-v-0f6cf5b4"]]), vo = { class: "fr-fieldset" }, go = ["id"], bo = {
  key: 1,
  class: "fr-fieldset__element"
}, yo = { class: "fr-fieldset__element" }, ma = /* @__PURE__ */ F({
  __name: "DsfrFieldset",
  props: {
    legend: { default: "" },
    legendClass: { default: "" },
    legendId: { default: "" },
    hint: { default: "" },
    hintClass: { default: "" }
  },
  setup(n) {
    return (t, e) => {
      var a, r, l, s;
      return i(), f("fieldset", vo, [
        t.legend || (r = (a = t.$slots).legend) != null && r.call(a) ? (i(), f("legend", {
          key: 0,
          id: t.legendId,
          class: R(["fr-fieldset__legend", t.legendClass])
        }, [
          V(h(t.legend) + " ", 1),
          $(t.$slots, "legend")
        ], 10, go)) : b("", !0),
        t.hint || (s = (l = t.$slots).hint) != null && s.call(l) ? (i(), f("div", bo, [
          c("span", {
            class: R(["fr-hint-text", t.hintClass])
          }, [
            V(h(t.hint) + " ", 1),
            $(t.$slots, "hint")
          ], 2)
        ])) : b("", !0),
        c("div", yo, [
          $(t.$slots, "default")
        ])
      ]);
    };
  }
}), ko = ["href", "download"], wo = { class: "fr-link__detail" }, ha = /* @__PURE__ */ F({
  __name: "DsfrFileDownload",
  props: {
    title: { default: "Télécharger le document" },
    format: { default: "JPEG" },
    size: { default: "250 Ko" },
    href: { default: "#" },
    download: { default: "" }
  },
  setup(n) {
    return (t, e) => (i(), f("a", {
      href: t.href,
      download: t.download,
      class: "fr-link fr-link--download"
    }, [
      V(h(t.title) + " ", 1),
      c("span", wo, h(t.format) + " – " + h(t.size), 1)
    ], 8, ko));
  }
}), _o = { class: "fr-downloads-group fr-downloads-group--bordered" }, xo = {
  key: 0,
  class: "fr-downloads-group__title"
}, Do = /* @__PURE__ */ F({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(n) {
    return (t, e) => (i(), f("div", _o, [
      t.title ? (i(), f("h4", xo, h(t.title), 1)) : b("", !0),
      c("ul", null, [
        (i(!0), f(G, null, J(t.files, (a, r) => (i(), f("li", { key: r }, [
          ee(ha, {
            title: a.title,
            format: a.format,
            size: a.size,
            href: a.href,
            download: a.download
          }, null, 8, ["title", "format", "size", "href", "download"])
        ]))), 128))
      ])
    ]));
  }
}), To = ["for"], Io = {
  key: 0,
  class: "required"
}, Co = {
  key: 1,
  class: "fr-hint-text"
}, Eo = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Po = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Mo = ["id"], Lo = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => se("file-upload") },
    label: { default: "Ajouter un fichier" },
    accept: { default: void 0 },
    hint: { default: "" },
    error: { default: "" },
    validMessage: { default: "" },
    disabled: { type: Boolean },
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { emit: t }) {
    const e = n, a = t, r = (s) => {
      var o, u;
      a("update:modelValue", (o = s.target) == null ? void 0 : o.value), a("change", (u = s.target) == null ? void 0 : u.files);
    }, l = k(() => Array.isArray(e.accept) ? e.accept.join(",") : e.accept);
    return (s, o) => (i(), f("div", {
      class: R(["fr-upload-group", {
        "fr-upload-group--error": s.error,
        "fr-upload-group--valid": s.validMessage,
        "fr-upload-group--disabled": s.disabled
      }])
    }, [
      c("label", {
        class: "fr-label",
        for: s.id
      }, [
        V(h(s.label) + " ", 1),
        "required" in s.$attrs && s.$attrs.required !== !1 ? (i(), f("span", Io, " *")) : b("", !0),
        s.hint ? (i(), f("span", Co, h(s.hint), 1)) : b("", !0)
      ], 8, To),
      c("input", Y({
        id: s.id,
        class: "fr-upload",
        type: "file",
        "aria-describedby": s.error || s.validMessage ? `${s.id}-desc` : void 0
      }, s.$attrs, {
        value: s.modelValue,
        disabled: s.disabled,
        "aria-disabled": s.disabled,
        accept: l.value,
        onChange: o[0] || (o[0] = (u) => r(u))
      }), null, 16, Eo),
      s.error || s.validMessage ? (i(), f("div", Po, [
        s.error ? (i(), f("p", {
          key: 0,
          id: `${s.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, h(s.error ?? s.validMessage), 9, Mo)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Bo = { class: "fr-follow__newsletter" }, So = { class: "fr-h5 fr-follow__title" }, $o = { class: "fr-text--sm fr-follow__desc" }, Ao = { key: 0 }, Oo = ["title"], Ro = { key: 1 }, Fo = { action: "" }, Vo = {
  class: "fr-label",
  for: "newsletter-email"
}, No = { class: "fr-input-wrap fr-input-wrap--addon" }, qo = ["title", "placeholder", "value"], jo = ["title"], Ho = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Wo = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, Ko = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, va = /* @__PURE__ */ F({
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
  setup(n, { emit: t }) {
    const e = t, a = (r) => e("update:email", r.target.value);
    return (r, l) => (i(), f("div", Bo, [
      c("div", null, [
        c("h3", So, h(r.title), 1),
        c("p", $o, h(r.description), 1)
      ]),
      r.onlyCallout ? (i(), f("div", Ao, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (s) => r.buttonAction ? r.buttonAction(s) : () => {
          })
        }, h(r.buttonText), 9, Oo)
      ])) : (i(), f("div", Ro, [
        c("form", Fo, [
          c("label", Vo, h(r.labelEmail), 1),
          c("div", No, [
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
              onInput: l[1] || (l[1] = (s) => a(s))
            }, null, 40, qo),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: r.buttonTitle,
              type: "submit"
            }, h(r.buttonText), 9, jo)
          ]),
          r.error ? (i(), f("div", Ho, [
            c("p", Wo, h(r.error), 1)
          ])) : b("", !0),
          c("p", Ko, h(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), Qo = { class: "fr-follow__social" }, Yo = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, zo = ["title", "href"], ga = /* @__PURE__ */ F({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(n) {
    return (t, e) => (i(), f("div", Qo, [
      (i(), W(ve(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: U(() => e[0] || (e[0] = [
          V(" Suivez-nous "),
          c("br", null, null, -1),
          V(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Yo, [
        (i(!0), f(G, null, J(t.networks, (a, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: R(["fr-btn", `fr-btn--${a.type}`]),
            title: a.name,
            href: a.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h(a.name), 11, zo)
        ]))), 128))
      ])) : b("", !0)
    ]));
  }
}), Go = { class: "fr-follow" }, Xo = { class: "fr-container" }, Uo = { class: "fr-grid-row" }, Zo = /* @__PURE__ */ F({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(n) {
    const t = n, e = k(() => t.networks && t.networks.length), a = k(() => typeof t.newsletterData == "object");
    return (r, l) => (i(), f("div", Go, [
      c("div", Xo, [
        c("div", Uo, [
          $(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: R(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ee(va, Ie(wt(r.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: R(["fr-col-12", { "fr-col-md-4": a.value }])
            }, [
              ee(ga, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), Sn = 1, ba = /* @__PURE__ */ F({
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
  setup(n) {
    const t = n, e = k(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("http");
    }), a = k(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("mailto");
    }), r = k(() => t.button ? "button" : e.value || a.value ? "a" : "RouterLink"), l = k(() => {
      if (!(!e.value && !a.value))
        return t.href;
    }), s = k(() => {
      if (!(e.value || a.value))
        return t.to;
    }), o = k(() => s.value ? { to: s.value } : { href: l.value }), u = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), d = k(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Sn, ...t.iconAttrs ?? {} } : { scale: Sn, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (p, v) => (i(), W(ve(r.value), Y({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, o.value, {
      target: p.target,
      onClick: te(p.onClick, ["stop"])
    }), {
      default: U(() => {
        var m, I;
        return [
          !u.value && (p.icon || (m = p.iconAttrs) != null && m.name) && !p.iconRight ? (i(), W(be, Y({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : b("", !0),
          V(" " + h(p.label) + " ", 1),
          !u.value && (p.icon || (I = p.iconAttrs) != null && I.name) && p.iconRight ? (i(), W(be, Y({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Jo = { class: "fr-footer__partners" }, ei = {
  key: 0,
  class: "fr-footer__partners-title"
}, ti = { class: "fr-footer__partners-logos" }, ni = {
  key: 0,
  class: "fr-footer__partners-main"
}, ai = ["href"], ri = ["src", "alt"], li = { class: "fr-footer__partners-sub" }, si = ["href"], oi = ["src", "alt"], ya = /* @__PURE__ */ F({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(n) {
    return (t, e) => (i(), f("div", Jo, [
      t.title ? (i(), f("h4", ei, h(t.title), 1)) : b("", !0),
      c("div", ti, [
        t.mainPartner ? (i(), f("div", ni, [
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
            }, null, 8, ri)
          ], 8, ai)
        ])) : b("", !0),
        c("div", li, [
          c("ul", null, [
            (i(!0), f(G, null, J(t.subPartners, (a, r) => (i(), f("li", { key: r }, [
              c("a", {
                class: "fr-footer__partners-link",
                href: a.href,
                target: "_blank",
                rel: "noopener noreferrer"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  src: a.logo,
                  alt: a.name
                }, null, 8, oi)
              ], 8, si)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), ii = ["innerHTML"], at = /* @__PURE__ */ F({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(n) {
    const t = n, e = k(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (a, r) => (i(), f("p", {
      class: R(["fr-logo", {
        "fr-logo--sm": a.small && !a.large,
        "fr-logo--lg": a.large && !a.small
      }]),
      innerHTML: e.value
    }, null, 10, ii));
  }
}), ui = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, di = {
  key: 0,
  class: "fr-footer__top"
}, ci = { class: "fr-container" }, fi = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, pi = { class: "fr-container" }, mi = { class: "fr-footer__body" }, hi = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, vi = ["href"], gi = ["src", "alt"], bi = ["src", "alt"], yi = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, ki = { class: "fr-footer__content" }, wi = { class: "fr-footer__content-desc" }, _i = { class: "fr-footer__content-list" }, xi = ["href", "title"], Di = { class: "fr-footer__bottom" }, Ti = { class: "fr-footer__bottom-list" }, Ii = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, Ci = /* @__PURE__ */ F({
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
    mandatoryLinks: { default: (n) => [
      {
        label: `Accessibilité : ${n.a11yCompliance}`,
        to: n.a11yComplianceLink
      },
      {
        label: "Mentions légales",
        to: n.legalLink,
        "data-testid": "/mentions-legales"
      },
      {
        label: "Données personnelles",
        to: n.personalDataLink
      },
      {
        label: "Gestion des cookies",
        to: n.cookiesLink
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
  setup(n) {
    const t = n, e = k(() => [
      ...t.beforeMandatoryLinks,
      ...t.mandatoryLinks,
      ...t.afterMandatoryLinks
    ]), a = Xt(), r = k(() => {
      var p;
      return (p = a["footer-link-lists"]) == null ? void 0 : p.call(a);
    }), l = k(() => {
      const p = t.licenceTo || t.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), s = k(() => {
      const { to: p, href: v, ...m } = t.licenceLinkProps ?? {};
      return m;
    }), o = k(() => l.value ? "" : t.licenceTo), u = k(() => l.value ? t.licenceTo : ""), d = k(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, v) => {
      const m = xe("RouterLink");
      return i(), f("footer", ui, [
        r.value ? (i(), f("div", di, [
          c("div", ci, [
            c("div", fi, [
              $(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : b("", !0),
        c("div", pi, [
          c("div", mi, [
            p.operatorImgSrc ? (i(), f("div", hi, [
              ee(at, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              d.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                c("img", {
                  class: "fr-footer__logo",
                  style: Te(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, gi)
              ], 8, vi)) : (i(), W(m, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: Te(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, bi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", yi, [
              ee(m, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  ee(at, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", ki, [
              c("p", wi, [
                $(p.$slots, "description", {}, () => [
                  V(h(p.descText), 1)
                ], !0)
              ]),
              c("ul", _i, [
                (i(!0), f(G, null, J(p.ecosystemLinks, ({ href: I, label: _, title: L, ...y }, w) => (i(), f("li", {
                  key: w,
                  class: "fr-footer__content-item"
                }, [
                  c("a", Y({
                    class: "fr-footer__content-link",
                    href: I,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: L,
                    ref_for: !0
                  }, y), h(_), 17, xi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), W(ya, Ie(Y({ key: 0 }, p.partners)), null, 16)) : b("", !0),
          c("div", Di, [
            c("ul", Ti, [
              (i(!0), f(G, null, J(e.value, (I, _) => (i(), f("li", {
                key: _,
                class: "fr-footer__bottom-item"
              }, [
                ee(ba, Y({ ref_for: !0 }, I), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", Ii, [
              c("p", null, [
                V(h(p.licenceText) + " ", 1),
                (i(), W(ve(l.value ? "a" : "RouterLink"), Y({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : o.value,
                  href: l.value ? u.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, s.value), {
                  default: U(() => [
                    V(h(p.licenceName), 1)
                  ]),
                  _: 1
                }, 16, ["to", "href", "target", "title"]))
              ])
            ])) : b("", !0)
          ])
        ])
      ]);
    };
  }
}), Ei = /* @__PURE__ */ ke(Ci, [["__scopeId", "data-v-4030eed5"]]), Pi = { class: "fr-footer__top-cat" }, Mi = { class: "fr-footer__top-list" }, Li = ["href"], Bi = /* @__PURE__ */ F({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(n) {
    return (t, e) => {
      const a = xe("RouterLink");
      return i(), f("div", null, [
        c("h3", Pi, h(t.categoryName), 1),
        c("ul", Mi, [
          (i(!0), f(G, null, J(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, h(r.label), 9, Li)) : b("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), W(a, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: U(() => [
                V(h(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : b("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Si = { class: "fr-connect-group" }, $i = ["href", "title"], Ai = /* @__PURE__ */ F({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(n) {
    return (t, e) => (i(), f("div", Si, [
      c("button", {
        class: R(["fr-connect", [{ "fr-connect--plus": t.secure }]])
      }, e[0] || (e[0] = [
        c("span", { class: "fr-connect__login" }, "S’identifier avec ", -1),
        c("span", { class: "fr-connect__brand" }, "FranceConnect", -1)
      ]), 2),
      c("p", null, [
        c("a", {
          href: t.url ?? `https://franceconnect.gouv.fr/${t.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, h(`Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ?`), 9, $i)
      ])
    ]));
  }
}), Oi = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Ri = { class: "fr-nav__item" }, Fi = ["aria-controls", "aria-expanded"], Vi = { class: "fr-hidden-lg" }, Ni = ["id"], qi = { class: "fr-menu__list" }, ji = ["hreflang", "lang", "aria-current", "href", "onClick"], rt = /* @__PURE__ */ F({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => se("language-selector") },
    languages: { default: () => [] },
    currentLanguage: { default: "fr" }
  },
  emits: ["select"],
  setup(n, { emit: t }) {
    const e = n, a = t, {
      collapse: r,
      collapsing: l,
      cssExpanded: s,
      doExpand: o,
      onTransitionEnd: u
    } = Se(), d = Q(!1);
    function p(m) {
      d.value = !1, a("select", m);
    }
    const v = k(
      () => e.languages.find(({ codeIso: m }) => m === e.currentLanguage)
    );
    return fe(d, (m, I) => {
      m !== I && o(m);
    }), (m, I) => {
      var _, L;
      return i(), f("nav", Oi, [
        c("div", Ri, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": m.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: I[0] || (I[0] = te((y) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            V(h((_ = v.value) == null ? void 0 : _.codeIso.toUpperCase()), 1),
            c("span", Vi, " - " + h((L = v.value) == null ? void 0 : L.label), 1)
          ], 8, Fi),
          c("div", {
            id: m.id,
            ref_key: "collapse",
            ref: r,
            class: R(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": H(s), "fr-collapsing": H(l) }]),
            onTransitionend: I[1] || (I[1] = (y) => H(u)(d.value))
          }, [
            c("ul", qi, [
              (i(!0), f(G, null, J(m.languages, (y, w) => (i(), f("li", { key: w }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: y.codeIso,
                  lang: y.codeIso,
                  "aria-current": m.currentLanguage === y.codeIso ? !0 : void 0,
                  href: `#${y.codeIso}`,
                  onClick: te((T) => p(y), ["prevent", "stop"])
                }, h(`${y.codeIso.toUpperCase()} - ${y.label}`), 9, ji)
              ]))), 128))
            ])
          ], 42, Ni)
        ])
      ]);
    };
  }
}), Hi = ["for"], Wi = {
  key: 0,
  class: "required"
}, Ki = {
  key: 0,
  class: "fr-hint-text"
}, Qi = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => se("basic", "input") },
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
  setup(n, { expose: t }) {
    const e = n, a = dr(), r = Q(null), l = () => {
      var d;
      return (d = r.value) == null ? void 0 : d.focus();
    }, s = k(() => e.isTextarea ? "textarea" : "input"), o = k(() => e.isWithWrapper || a.type === "date" || !!e.wrapperClass), u = k(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return t({
      focus: l
    }), (d, p) => (i(), f(G, null, [
      c("label", {
        class: R(u.value),
        for: d.id
      }, [
        $(d.$slots, "label", {}, () => [
          V(h(d.label) + " ", 1),
          $(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", Wi, "*")) : b("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", Ki, h(d.hint), 1)) : b("", !0)
      ], 10, Hi),
      o.value ? (i(), f("div", {
        key: 1,
        class: R([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), W(ve(s.value), Y({ id: d.id }, d.$attrs, {
          ref_key: "__input",
          ref: r,
          class: ["fr-input", {
            "fr-input--error": d.isInvalid,
            "fr-input--valid": d.isValid
          }],
          value: d.modelValue,
          "aria-describedby": d.descriptionId || void 0,
          onInput: p[1] || (p[1] = (v) => d.$emit("update:modelValue", v.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (i(), W(ve(s.value), Y({
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
        onInput: p[0] || (p[0] = (v) => d.$emit("update:modelValue", v.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), Et = /* @__PURE__ */ ke(Qi, [["__scopeId", "data-v-7ca45de8"]]), lt = /* @__PURE__ */ F({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => se("search", "input") },
    label: { default: "" },
    large: { type: Boolean },
    buttonText: { default: "" },
    modelValue: { default: "" },
    placeholder: { default: "Rechercher" },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "search"],
  setup(n, { emit: t }) {
    const e = t;
    return (a, r) => (i(), f("div", {
      class: R(["fr-search-bar", { "fr-search-bar--lg": a.large }]),
      role: "search"
    }, [
      ee(Et, {
        id: a.id,
        type: "search",
        placeholder: a.placeholder,
        "model-value": a.modelValue,
        label: a.label,
        disabled: a.disabled,
        "aria-disabled": a.disabled,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => e("update:modelValue", l)),
        onKeydown: r[1] || (r[1] = ne((l) => e("search", a.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label", "disabled", "aria-disabled"]),
      ee(je, {
        title: "Rechercher",
        disabled: a.disabled,
        "aria-disabled": a.disabled,
        onClick: r[2] || (r[2] = (l) => e("search", a.modelValue))
      }, {
        default: U(() => [
          V(h(a.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), $n = 1, on = /* @__PURE__ */ F({
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
  setup(n) {
    const t = n, e = k(() => typeof t.path == "string"), a = k(() => {
      var v;
      return ((v = t.href) == null ? void 0 : v.startsWith("http")) || e.value && t.path.startsWith("http") || typeof t.to == "string" && t.to.startsWith("http");
    }), r = k(() => {
      var v;
      return ((v = t.href) == null ? void 0 : v.startsWith("mailto")) || e.value && t.path.startsWith("mailto") || typeof t.to == "string" && t.to.startsWith("mailto");
    }), l = k(() => t.button ? "button" : a.value || r.value ? "a" : "RouterLink"), s = k(() => {
      if (!(!a.value && !r.value))
        return t.to ?? t.href ?? t.path;
    }), o = k(() => {
      if (!(a.value || r.value))
        return t.to ?? t.path;
    }), u = k(() => o.value ? { to: o.value } : { href: s.value }), d = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), p = k(
      () => typeof t.icon == "string" ? { name: t.icon, scale: $n, ...t.iconAttrs ?? {} } : { scale: $n, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (v, m) => (i(), W(ve(l.value), Y({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && v.iconRight,
        "fr-btn--icon-left": d.value && !v.iconRight,
        [String(v.icon)]: d.value
      }]
    }, u.value, {
      target: v.target,
      onClick: m[0] || (m[0] = te((I) => v.onClick(I), ["stop"]))
    }), {
      default: U(() => {
        var I, _;
        return [
          !d.value && (v.icon || (I = v.iconAttrs) != null && I.name) && !v.iconRight ? (i(), W(be, Y({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          V(" " + h(v.label) + " ", 1),
          !d.value && (v.icon || (_ = v.iconAttrs) != null && _.name) && v.iconRight ? (i(), W(be, Y({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Yi = ["aria-label"], zi = { class: "fr-btns-group" }, jt = /* @__PURE__ */ F({
  __name: "DsfrHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(n, { emit: t }) {
    const e = t;
    return (a, r) => (i(), f("nav", {
      role: "navigation",
      "aria-label": a.navAriaLabel
    }, [
      c("ul", zi, [
        (i(!0), f(G, null, J(a.links, (l, s) => (i(), f("li", { key: s }, [
          ee(on, Y({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var u;
              e("linkClick", o), (u = l.onClick) == null || u.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Yi));
  }
}), Gi = {
  role: "banner",
  class: "fr-header"
}, Xi = { class: "fr-header__body" }, Ui = { class: "fr-container width-inherit" }, Zi = { class: "fr-header__body-row" }, Ji = { class: "fr-header__brand fr-enlarge-link" }, eu = { class: "fr-header__brand-top" }, tu = { class: "fr-header__logo" }, nu = {
  key: 0,
  class: "fr-header__operator"
}, au = ["src", "alt"], ru = {
  key: 1,
  class: "fr-header__navbar"
}, lu = ["aria-label", "title", "data-fr-opened"], su = ["aria-label", "title"], ou = {
  key: 0,
  class: "fr-header__service"
}, iu = { class: "fr-header__service-title" }, uu = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, du = {
  key: 0,
  class: "fr-header__service-tagline"
}, cu = {
  key: 1,
  class: "fr-header__service"
}, fu = { class: "fr-header__tools" }, pu = {
  key: 0,
  class: "fr-header__tools-links"
}, mu = {
  key: 1,
  class: "fr-header__search fr-modal"
}, hu = ["aria-label"], vu = { class: "fr-container" }, gu = { class: "fr-header__menu-links" }, bu = {
  key: 1,
  class: "flex justify-center items-center"
}, yu = { class: "fr-header__menu fr-modal" }, ku = {
  key: 0,
  class: "fr-container"
}, wu = /* @__PURE__ */ F({
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
  setup(n, { emit: t }) {
    const e = n, a = t, r = Xt(), l = st(e, "languageSelector"), s = Q(!1), o = Q(!1), u = Q(!1), d = () => {
      var w;
      u.value = !1, s.value = !1, o.value = !1, (w = document.getElementById("button-menu")) == null || w.focus();
    }, p = (w) => {
      w.key === "Escape" && d();
    };
    we(() => {
      document.addEventListener("keydown", p);
    }), Ee(() => {
      document.removeEventListener("keydown", p);
    });
    const v = () => {
      u.value = !0, s.value = !0, o.value = !1, setTimeout(() => {
        var w;
        (w = document.getElementById("close-button")) == null || w.focus();
      });
    }, m = () => {
      u.value = !0, s.value = !1, o.value = !0;
    }, I = d, _ = k(() => [e.homeLabel, e.serviceTitle].filter((w) => w).join(" - ")), L = k(() => !!r.operator || !!e.operatorImgSrc), y = k(() => !!r.mainnav);
    return Re(ln, () => d), (w, T) => {
      var S, D, C;
      const P = xe("RouterLink");
      return i(), f("header", Gi, [
        c("div", Xi, [
          c("div", Ui, [
            c("div", Zi, [
              c("div", Ji, [
                c("div", eu, [
                  c("div", tu, [
                    ee(P, {
                      to: w.homeTo,
                      title: _.value
                    }, {
                      default: U(() => [
                        ee(at, {
                          "logo-text": w.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  L.value ? (i(), f("div", nu, [
                    $(w.$slots, "operator", {}, () => [
                      w.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: w.operatorImgSrc,
                        alt: w.operatorImgAlt,
                        style: Te(w.operatorImgStyle)
                      }, null, 12, au)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  w.showSearch || y.value || (S = w.quickLinks) != null && S.length ? (i(), f("div", ru, [
                    w.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": w.showSearchLabel,
                      title: w.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: T[0] || (T[0] = te((x) => m(), ["prevent", "stop"]))
                    }, null, 8, lu)) : b("", !0),
                    y.value || (D = w.quickLinks) != null && D.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": v,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": w.menuLabel,
                      title: w.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: T[1] || (T[1] = te((x) => v(), ["prevent", "stop"]))
                    }, null, 8, su)) : b("", !0)
                  ])) : b("", !0)
                ]),
                w.serviceTitle ? (i(), f("div", ou, [
                  ee(P, Y({
                    to: w.homeTo,
                    title: _.value
                  }, w.$attrs), {
                    default: U(() => [
                      c("p", iu, [
                        V(h(w.serviceTitle) + " ", 1),
                        w.showBeta ? (i(), f("span", uu, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  w.serviceDescription ? (i(), f("p", du, h(w.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !w.serviceTitle && w.showBeta ? (i(), f("div", cu, T[9] || (T[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", fu, [
                (C = w.quickLinks) != null && C.length || l.value ? (i(), f("div", pu, [
                  $(w.$slots, "before-quick-links"),
                  s.value ? b("", !0) : (i(), W(jt, {
                    key: 0,
                    links: w.quickLinks,
                    "nav-aria-label": w.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  $(w.$slots, "after-quick-links"),
                  l.value ? (i(), W(rt, Y({ key: 1 }, l.value, {
                    onSelect: T[2] || (T[2] = (x) => a("languageSelect", x))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                w.showSearch ? (i(), f("div", mu, [
                  ee(lt, {
                    id: w.searchbarId,
                    label: w.searchLabel,
                    "model-value": w.modelValue,
                    placeholder: w.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (x) => a("update:modelValue", x)),
                    onSearch: T[4] || (T[4] = (x) => a("search", x))
                  }, null, 8, ["id", "label", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ]),
            w.showSearch || y.value || w.quickLinks && w.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: R(["fr-header__menu fr-modal", { "fr-modal--opened": u.value }]),
              "aria-label": w.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", vu, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: T[5] || (T[5] = te((x) => d(), ["prevent", "stop"]))
                }, h(w.closeMenuModalLabel), 1),
                c("div", gu, [
                  l.value ? (i(), W(rt, Y({ key: 0 }, l.value, {
                    onSelect: T[6] || (T[6] = (x) => l.value.currentLanguage = x.codeIso)
                  }), null, 16)) : b("", !0),
                  $(w.$slots, "before-quick-links"),
                  s.value ? (i(), W(jt, {
                    key: 1,
                    role: "navigation",
                    links: w.quickLinks,
                    "nav-aria-label": w.quickLinksAriaLabel,
                    onLinkClick: H(I)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0),
                  $(w.$slots, "after-quick-links")
                ]),
                u.value ? $(w.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : b("", !0),
                o.value ? (i(), f("div", bu, [
                  ee(lt, {
                    "searchbar-id": w.searchbarId,
                    "model-value": w.modelValue,
                    placeholder: w.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (x) => a("update:modelValue", x)),
                    onSearch: T[8] || (T[8] = (x) => a("search", x))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, hu)) : b("", !0),
            $(w.$slots, "default")
          ])
        ]),
        c("div", yu, [
          y.value && !u.value ? (i(), f("div", ku, [
            $(w.$slots, "mainnav", { hidemodal: d })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), _u = /* @__PURE__ */ F({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(n) {
    return (t, e) => (i(), f("div", {
      class: R(["fr-highlight", { [`fr-highlight--${t.color}`]: t.color }])
    }, [
      c("p", {
        class: R({
          "fr-text--lg": t.large && !t.small,
          "fr-text--sm": t.small && !t.large
        })
      }, [
        V(h(t.text) + " ", 1),
        $(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), xu = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, Du = ["id", "data-testid"], Tu = ["id", "data-testid"], Iu = ["id", "data-testid"], Cu = ["id", "data-testid"], Eu = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => se("input", "group") },
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
  setup(n) {
    return (t, e) => (i(), f("div", {
      class: R(["fr-input-group", [
        {
          "fr-input-group--error": t.errorMessage,
          "fr-input-group--valid": t.validMessage && !t.errorMessage
        },
        t.wrapperClass
      ]])
    }, [
      $(t.$slots, "before-input"),
      $(t.$slots, "default"),
      t.$slots.default ? b("", !0) : (i(), W(Et, Y({ key: 0 }, t.$attrs, {
        "is-valid": !!t.validMessage,
        "is-invalid": !!t.errorMessage,
        label: t.label,
        hint: t.hint,
        "description-id": (t.errorMessage || t.validMessage) && t.descriptionId || void 0,
        "label-visible": t.labelVisible,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": e[0] || (e[0] = (a) => t.$emit("update:modelValue", a))
      }), null, 16, ["is-valid", "is-invalid", "label", "hint", "description-id", "label-visible", "model-value", "placeholder"])),
      c("div", xu, [
        Array.isArray(t.errorMessage) ? (i(!0), f(G, { key: 0 }, J(t.errorMessage, (a) => (i(), f("p", {
          id: t.descriptionId,
          key: a,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(a), 9, Du))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(t.errorMessage), 9, Tu)) : b("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(G, { key: 2 }, J(t.validMessage, (a) => (i(), f("p", {
          id: t.descriptionId,
          key: a,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(a), 9, Iu))), 128)) : t.validMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.validMessage,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(t.validMessage), 9, Cu)) : b("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var ka = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], mt = /* @__PURE__ */ ka.join(","), wa = typeof Element > "u", He = wa ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ht = !wa && Element.prototype.getRootNode ? function(n) {
  var t;
  return n == null || (t = n.getRootNode) === null || t === void 0 ? void 0 : t.call(n);
} : function(n) {
  return n == null ? void 0 : n.ownerDocument;
}, vt = function n(t, e) {
  var a;
  e === void 0 && (e = !0);
  var r = t == null || (a = t.getAttribute) === null || a === void 0 ? void 0 : a.call(t, "inert"), l = r === "" || r === "true", s = l || e && t && n(t.parentNode);
  return s;
}, Pu = function(n) {
  var t, e = n == null || (t = n.getAttribute) === null || t === void 0 ? void 0 : t.call(n, "contenteditable");
  return e === "" || e === "true";
}, _a = function(n, t, e) {
  if (vt(n))
    return [];
  var a = Array.prototype.slice.apply(n.querySelectorAll(mt));
  return t && He.call(n, mt) && a.unshift(n), a = a.filter(e), a;
}, xa = function n(t, e, a) {
  for (var r = [], l = Array.from(t); l.length; ) {
    var s = l.shift();
    if (!vt(s, !1))
      if (s.tagName === "SLOT") {
        var o = s.assignedElements(), u = o.length ? o : s.children, d = n(u, !0, a);
        a.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: s,
          candidates: d
        });
      } else {
        var p = He.call(s, mt);
        p && a.filter(s) && (e || !t.includes(s)) && r.push(s);
        var v = s.shadowRoot || // check for an undisclosed shadow
        typeof a.getShadowRoot == "function" && a.getShadowRoot(s), m = !vt(v, !1) && (!a.shadowRootFilter || a.shadowRootFilter(s));
        if (v && m) {
          var I = n(v === !0 ? s.children : v.children, !0, a);
          a.flatten ? r.push.apply(r, I) : r.push({
            scopeParent: s,
            candidates: I
          });
        } else
          l.unshift.apply(l, s.children);
      }
  }
  return r;
}, Da = function(n) {
  return !isNaN(parseInt(n.getAttribute("tabindex"), 10));
}, Ne = function(n) {
  if (!n)
    throw new Error("No node provided");
  return n.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(n.tagName) || Pu(n)) && !Da(n) ? 0 : n.tabIndex;
}, Mu = function(n, t) {
  var e = Ne(n);
  return e < 0 && t && !Da(n) ? 0 : e;
}, Lu = function(n, t) {
  return n.tabIndex === t.tabIndex ? n.documentOrder - t.documentOrder : n.tabIndex - t.tabIndex;
}, Ta = function(n) {
  return n.tagName === "INPUT";
}, Bu = function(n) {
  return Ta(n) && n.type === "hidden";
}, Su = function(n) {
  var t = n.tagName === "DETAILS" && Array.prototype.slice.apply(n.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, $u = function(n, t) {
  for (var e = 0; e < n.length; e++)
    if (n[e].checked && n[e].form === t)
      return n[e];
}, Au = function(n) {
  if (!n.name)
    return !0;
  var t = n.form || ht(n), e = function(l) {
    return t.querySelectorAll('input[type="radio"][name="' + l + '"]');
  }, a;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    a = e(window.CSS.escape(n.name));
  else
    try {
      a = e(n.name);
    } catch (l) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", l.message), !1;
    }
  var r = $u(a, n.form);
  return !r || r === n;
}, Ou = function(n) {
  return Ta(n) && n.type === "radio";
}, Ru = function(n) {
  return Ou(n) && !Au(n);
}, Fu = function(n) {
  var t, e = n && ht(n), a = (t = e) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (e && e !== n) {
    var l, s, o;
    for (r = !!((l = a) !== null && l !== void 0 && (s = l.ownerDocument) !== null && s !== void 0 && s.contains(a) || n != null && (o = n.ownerDocument) !== null && o !== void 0 && o.contains(n)); !r && a; ) {
      var u, d, p;
      e = ht(a), a = (u = e) === null || u === void 0 ? void 0 : u.host, r = !!((d = a) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(a));
    }
  }
  return r;
}, An = function(n) {
  var t = n.getBoundingClientRect(), e = t.width, a = t.height;
  return e === 0 && a === 0;
}, Vu = function(n, t) {
  var e = t.displayCheck, a = t.getShadowRoot;
  if (getComputedStyle(n).visibility === "hidden")
    return !0;
  var r = He.call(n, "details>summary:first-of-type"), l = r ? n.parentElement : n;
  if (He.call(l, "details:not([open]) *"))
    return !0;
  if (!e || e === "full" || e === "legacy-full") {
    if (typeof a == "function") {
      for (var s = n; n; ) {
        var o = n.parentElement, u = ht(n);
        if (o && !o.shadowRoot && a(o) === !0)
          return An(n);
        n.assignedSlot ? n = n.assignedSlot : !o && u !== n.ownerDocument ? n = u.host : n = o;
      }
      n = s;
    }
    if (Fu(n))
      return !n.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return An(n);
  return !1;
}, Nu = function(n) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(n.tagName))
    for (var t = n.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var e = 0; e < t.children.length; e++) {
          var a = t.children.item(e);
          if (a.tagName === "LEGEND")
            return He.call(t, "fieldset[disabled] *") ? !0 : !a.contains(n);
        }
        return !0;
      }
      t = t.parentElement;
    }
  return !1;
}, gt = function(n, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  vt(t) || Bu(t) || Vu(t, n) || // For a details element with a summary, the summary element gets the focus
  Su(t) || Nu(t));
}, Ht = function(n, t) {
  return !(Ru(t) || Ne(t) < 0 || !gt(n, t));
}, qu = function(n) {
  var t = parseInt(n.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, ju = function n(t) {
  var e = [], a = [];
  return t.forEach(function(r, l) {
    var s = !!r.scopeParent, o = s ? r.scopeParent : r, u = Mu(o, s), d = s ? n(r.candidates) : o;
    u === 0 ? s ? e.push.apply(e, d) : e.push(o) : a.push({
      documentOrder: l,
      tabIndex: u,
      item: r,
      isScope: s,
      content: d
    });
  }), a.sort(Lu).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(e);
}, Hu = function(n, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = xa([n], t.includeContainer, {
    filter: Ht.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: qu
  }) : e = _a(n, t.includeContainer, Ht.bind(null, t)), ju(e);
}, Wu = function(n, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = xa([n], t.includeContainer, {
    filter: gt.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : e = _a(n, t.includeContainer, gt.bind(null, t)), e;
}, We = function(n, t) {
  if (t = t || {}, !n)
    throw new Error("No node provided");
  return He.call(n, mt) === !1 ? !1 : Ht(t, n);
}, Ku = /* @__PURE__ */ ka.concat("iframe").join(","), Bt = function(n, t) {
  if (t = t || {}, !n)
    throw new Error("No node provided");
  return He.call(n, Ku) === !1 ? !1 : gt(t, n);
};
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Wt(n, t) {
  (t == null || t > n.length) && (t = n.length);
  for (var e = 0, a = Array(t); e < t; e++) a[e] = n[e];
  return a;
}
function Qu(n) {
  if (Array.isArray(n)) return Wt(n);
}
function Yu(n, t, e) {
  return (t = Zu(t)) in n ? Object.defineProperty(n, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[t] = e, n;
}
function zu(n) {
  if (typeof Symbol < "u" && n[Symbol.iterator] != null || n["@@iterator"] != null) return Array.from(n);
}
function Gu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function On(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(n);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(n, r).enumerable;
    })), e.push.apply(e, a);
  }
  return e;
}
function Rn(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? On(Object(e), !0).forEach(function(a) {
      Yu(n, a, e[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : On(Object(e)).forEach(function(a) {
      Object.defineProperty(n, a, Object.getOwnPropertyDescriptor(e, a));
    });
  }
  return n;
}
function Xu(n) {
  return Qu(n) || zu(n) || Ju(n) || Gu();
}
function Uu(n, t) {
  if (typeof n != "object" || !n) return n;
  var e = n[Symbol.toPrimitive];
  if (e !== void 0) {
    var a = e.call(n, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(n);
}
function Zu(n) {
  var t = Uu(n, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ju(n, t) {
  if (n) {
    if (typeof n == "string") return Wt(n, t);
    var e = {}.toString.call(n).slice(8, -1);
    return e === "Object" && n.constructor && (e = n.constructor.name), e === "Map" || e === "Set" ? Array.from(n) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Wt(n, t) : void 0;
  }
}
var Fn = {
  activateTrap: function(n, t) {
    if (n.length > 0) {
      var e = n[n.length - 1];
      e !== t && e._setPausedState(!0);
    }
    var a = n.indexOf(t);
    a === -1 || n.splice(a, 1), n.push(t);
  },
  deactivateTrap: function(n, t) {
    var e = n.indexOf(t);
    e !== -1 && n.splice(e, 1), n.length > 0 && !n[n.length - 1]._isManuallyPaused() && n[n.length - 1]._setPausedState(!1);
  }
}, ed = function(n) {
  return n.tagName && n.tagName.toLowerCase() === "input" && typeof n.select == "function";
}, td = function(n) {
  return (n == null ? void 0 : n.key) === "Escape" || (n == null ? void 0 : n.key) === "Esc" || (n == null ? void 0 : n.keyCode) === 27;
}, et = function(n) {
  return (n == null ? void 0 : n.key) === "Tab" || (n == null ? void 0 : n.keyCode) === 9;
}, nd = function(n) {
  return et(n) && !n.shiftKey;
}, ad = function(n) {
  return et(n) && n.shiftKey;
}, Vn = function(n) {
  return setTimeout(n, 0);
}, Ue = function(n) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    e[a - 1] = arguments[a];
  return typeof n == "function" ? n.apply(void 0, e) : n;
}, ut = function(n) {
  return n.target.shadowRoot && typeof n.composedPath == "function" ? n.composedPath()[0] : n.target;
}, rd = [], ld = function(n, t) {
  var e = (t == null ? void 0 : t.document) || document, a = (t == null ? void 0 : t.trapStack) || rd, r = Rn({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: nd,
    isKeyBackward: ad
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
    manuallyPaused: !1,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  }, s, o = function(g, M, j) {
    return g && g[M] !== void 0 ? g[M] : r[j || M];
  }, u = function(g, M) {
    var j = typeof (M == null ? void 0 : M.composedPath) == "function" ? M.composedPath() : void 0;
    return l.containerGroups.findIndex(function(A) {
      var O = A.container, Z = A.tabbableNodes;
      return O.contains(g) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (j == null ? void 0 : j.includes(O)) || Z.find(function(z) {
        return z === g;
      });
    });
  }, d = function(g) {
    var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, j = M.hasFallback, A = j === void 0 ? !1 : j, O = M.params, Z = O === void 0 ? [] : O, z = r[g];
    if (typeof z == "function" && (z = z.apply(void 0, Xu(Z))), z === !0 && (z = void 0), !z) {
      if (z === void 0 || z === !1)
        return z;
      throw new Error("`".concat(g, "` was specified but was not a node, or did not return a node"));
    }
    var le = z;
    if (typeof z == "string") {
      try {
        le = e.querySelector(z);
      } catch (ae) {
        throw new Error("`".concat(g, '` appears to be an invalid selector; error="').concat(ae.message, '"'));
      }
      if (!le && !A)
        throw new Error("`".concat(g, "` as selector refers to no known node"));
    }
    return le;
  }, p = function() {
    var g = d("initialFocus", {
      hasFallback: !0
    });
    if (g === !1)
      return !1;
    if (g === void 0 || g && !Bt(g, r.tabbableOptions))
      if (u(e.activeElement) >= 0)
        g = e.activeElement;
      else {
        var M = l.tabbableGroups[0], j = M && M.firstTabbableNode;
        g = j || d("fallbackFocus");
      }
    else g === null && (g = d("fallbackFocus"));
    if (!g)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return g;
  }, v = function() {
    if (l.containerGroups = l.containers.map(function(g) {
      var M = Hu(g, r.tabbableOptions), j = Wu(g, r.tabbableOptions), A = M.length > 0 ? M[0] : void 0, O = M.length > 0 ? M[M.length - 1] : void 0, Z = j.find(function(ae) {
        return We(ae);
      }), z = j.slice().reverse().find(function(ae) {
        return We(ae);
      }), le = !!M.find(function(ae) {
        return Ne(ae) > 0;
      });
      return {
        container: g,
        tabbableNodes: M,
        focusableNodes: j,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: le,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: A,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: O,
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
        lastDomTabbableNode: z,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(ae) {
          var De = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ce = M.indexOf(ae);
          return Ce < 0 ? De ? j.slice(j.indexOf(ae) + 1).find(function(K) {
            return We(K);
          }) : j.slice(0, j.indexOf(ae)).reverse().find(function(K) {
            return We(K);
          }) : M[Ce + (De ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(g) {
      return g.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(g) {
      return g.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, m = function(g) {
    var M = g.activeElement;
    if (M)
      return M.shadowRoot && M.shadowRoot.activeElement !== null ? m(M.shadowRoot) : M;
  }, I = function(g) {
    if (g !== !1 && g !== m(document)) {
      if (!g || !g.focus) {
        I(p());
        return;
      }
      g.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = g, ed(g) && g.select();
    }
  }, _ = function(g) {
    var M = d("setReturnFocus", {
      params: [g]
    });
    return M || (M === !1 ? !1 : g);
  }, L = function(g) {
    var M = g.target, j = g.event, A = g.isBackward, O = A === void 0 ? !1 : A;
    M = M || ut(j), v();
    var Z = null;
    if (l.tabbableGroups.length > 0) {
      var z = u(M, j), le = z >= 0 ? l.containerGroups[z] : void 0;
      if (z < 0)
        O ? Z = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : Z = l.tabbableGroups[0].firstTabbableNode;
      else if (O) {
        var ae = l.tabbableGroups.findIndex(function(ue) {
          var ce = ue.firstTabbableNode;
          return M === ce;
        });
        if (ae < 0 && (le.container === M || Bt(M, r.tabbableOptions) && !We(M, r.tabbableOptions) && !le.nextTabbableNode(M, !1)) && (ae = z), ae >= 0) {
          var De = ae === 0 ? l.tabbableGroups.length - 1 : ae - 1, Ce = l.tabbableGroups[De];
          Z = Ne(M) >= 0 ? Ce.lastTabbableNode : Ce.lastDomTabbableNode;
        } else et(j) || (Z = le.nextTabbableNode(M, !1));
      } else {
        var K = l.tabbableGroups.findIndex(function(ue) {
          var ce = ue.lastTabbableNode;
          return M === ce;
        });
        if (K < 0 && (le.container === M || Bt(M, r.tabbableOptions) && !We(M, r.tabbableOptions) && !le.nextTabbableNode(M)) && (K = z), K >= 0) {
          var X = K === l.tabbableGroups.length - 1 ? 0 : K + 1, re = l.tabbableGroups[X];
          Z = Ne(M) >= 0 ? re.firstTabbableNode : re.firstDomTabbableNode;
        } else et(j) || (Z = le.nextTabbableNode(M));
      }
    } else
      Z = d("fallbackFocus");
    return Z;
  }, y = function(g) {
    var M = ut(g);
    if (!(u(M, g) >= 0)) {
      if (Ue(r.clickOutsideDeactivates, g)) {
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
      Ue(r.allowOutsideClick, g) || g.preventDefault();
    }
  }, w = function(g) {
    var M = ut(g), j = u(M, g) >= 0;
    if (j || M instanceof Document)
      j && (l.mostRecentlyFocusedNode = M);
    else {
      g.stopImmediatePropagation();
      var A, O = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ne(l.mostRecentlyFocusedNode) > 0) {
          var Z = u(l.mostRecentlyFocusedNode), z = l.containerGroups[Z].tabbableNodes;
          if (z.length > 0) {
            var le = z.findIndex(function(ae) {
              return ae === l.mostRecentlyFocusedNode;
            });
            le >= 0 && (r.isKeyForward(l.recentNavEvent) ? le + 1 < z.length && (A = z[le + 1], O = !1) : le - 1 >= 0 && (A = z[le - 1], O = !1));
          }
        } else
          l.containerGroups.some(function(ae) {
            return ae.tabbableNodes.some(function(De) {
              return Ne(De) > 0;
            });
          }) || (O = !1);
      else
        O = !1;
      O && (A = L({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), I(A || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, T = function(g) {
    var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = g;
    var j = L({
      event: g,
      isBackward: M
    });
    j && (et(g) && g.preventDefault(), I(j));
  }, S = function(g) {
    (r.isKeyForward(g) || r.isKeyBackward(g)) && T(g, r.isKeyBackward(g));
  }, D = function(g) {
    td(g) && Ue(r.escapeDeactivates, g) !== !1 && (g.preventDefault(), s.deactivate());
  }, C = function(g) {
    var M = ut(g);
    u(M, g) >= 0 || Ue(r.clickOutsideDeactivates, g) || Ue(r.allowOutsideClick, g) || (g.preventDefault(), g.stopImmediatePropagation());
  }, P = function() {
    if (l.active)
      return Fn.activateTrap(a, s), l.delayInitialFocusTimer = r.delayInitialFocus ? Vn(function() {
        I(p());
      }) : I(p()), e.addEventListener("focusin", w, !0), e.addEventListener("mousedown", y, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", y, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", C, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", S, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", D), s;
  }, x = function() {
    if (l.active)
      return e.removeEventListener("focusin", w, !0), e.removeEventListener("mousedown", y, !0), e.removeEventListener("touchstart", y, !0), e.removeEventListener("click", C, !0), e.removeEventListener("keydown", S, !0), e.removeEventListener("keydown", D), s;
  }, N = function(g) {
    var M = g.some(function(j) {
      var A = Array.from(j.removedNodes);
      return A.some(function(O) {
        return O === l.mostRecentlyFocusedNode;
      });
    });
    M && I(p());
  }, E = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(N) : void 0, B = function() {
    E && (E.disconnect(), l.active && !l.paused && l.containers.map(function(g) {
      E.observe(g, {
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
    activate: function(g) {
      if (l.active)
        return this;
      var M = o(g, "onActivate"), j = o(g, "onPostActivate"), A = o(g, "checkCanFocusTrap");
      A || v(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, M == null || M();
      var O = function() {
        A && v(), P(), B(), j == null || j();
      };
      return A ? (A(l.containers.concat()).then(O, O), this) : (O(), this);
    },
    deactivate: function(g) {
      if (!l.active)
        return this;
      var M = Rn({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, g);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, x(), l.active = !1, l.paused = !1, B(), Fn.deactivateTrap(a, s);
      var j = o(M, "onDeactivate"), A = o(M, "onPostDeactivate"), O = o(M, "checkCanReturnFocus"), Z = o(M, "returnFocus", "returnFocusOnDeactivate");
      j == null || j();
      var z = function() {
        Vn(function() {
          Z && I(_(l.nodeFocusedBeforeActivation)), A == null || A();
        });
      };
      return Z && O ? (O(_(l.nodeFocusedBeforeActivation)).then(z, z), this) : (z(), this);
    },
    pause: function(g) {
      return l.active ? (l.manuallyPaused = !0, this._setPausedState(!0, g)) : this;
    },
    unpause: function(g) {
      return l.active ? (l.manuallyPaused = !1, a[a.length - 1] !== this ? this : this._setPausedState(!1, g)) : this;
    },
    updateContainerElements: function(g) {
      var M = [].concat(g).filter(Boolean);
      return l.containers = M.map(function(j) {
        return typeof j == "string" ? e.querySelector(j) : j;
      }), l.active && v(), B(), this;
    }
  }, Object.defineProperties(s, {
    _isManuallyPaused: {
      value: function() {
        return l.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(g, M) {
        if (l.paused === g)
          return this;
        if (l.paused = g, g) {
          var j = o(M, "onPause"), A = o(M, "onPostPause");
          j == null || j(), x(), B(), A == null || A();
        } else {
          var O = o(M, "onUnpause"), Z = o(M, "onPostUnpause");
          O == null || O(), v(), P(), B(), Z == null || Z();
        }
        return this;
      }
    }
  }), s.updateContainerElements(n), s;
};
/*!
  * focus-trap-vue v4.0.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const sd = {
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
}, od = F({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, sd),
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
  setup(n, { slots: t, emit: e }) {
    let a;
    const r = Q(null), l = k(() => {
      const o = r.value;
      return o && (o instanceof HTMLElement ? o : o.$el);
    });
    function s() {
      return a || (a = ld(l.value, {
        escapeDeactivates: n.escapeDeactivates,
        allowOutsideClick: n.allowOutsideClick,
        returnFocusOnDeactivate: n.returnFocusOnDeactivate,
        clickOutsideDeactivates: n.clickOutsideDeactivates,
        onActivate: () => {
          e("update:active", !0), e("activate");
        },
        onDeactivate: () => {
          e("update:active", !1), e("deactivate");
        },
        onPostActivate: () => e("postActivate"),
        onPostDeactivate: () => e("postDeactivate"),
        initialFocus: n.initialFocus,
        fallbackFocus: n.fallbackFocus,
        tabbableOptions: n.tabbableOptions,
        delayInitialFocus: n.delayInitialFocus,
        preventScroll: n.preventScroll
      }));
    }
    return we(() => {
      fe(() => n.active, (o) => {
        o && l.value ? s().activate() : a && (a.deactivate(), (!l.value || l.value.nodeType === Node.COMMENT_NODE) && (a = null));
      }, { immediate: !0, flush: "post" });
    }), Ee(() => {
      a && a.deactivate(), a = null;
    }), {
      activate() {
        s().activate();
      },
      deactivate() {
        a && a.deactivate();
      },
      renderImpl() {
        if (!t.default)
          return null;
        const o = t.default().filter((u) => u.type !== ir);
        return !o || !o.length || o.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), o) : ur(o[0], { ref: r });
      }
    };
  }
}), id = ["aria-labelledby", "role", "open"], ud = { class: "fr-container fr-container--fluid fr-container-md" }, dd = { class: "fr-grid-row fr-grid-row--center" }, cd = { class: "fr-modal__body" }, fd = { class: "fr-modal__header" }, pd = ["title"], md = { class: "fr-modal__content" }, hd = ["id"], vd = {
  key: 0,
  class: "fr-modal__footer"
}, Nn = 2, gd = /* @__PURE__ */ F({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => se("modal", "dialog") },
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
  setup(n, { emit: t }) {
    const e = n, a = t, r = (_) => {
      _.key === "Escape" && v();
    }, l = k(() => e.isAlert ? "alertdialog" : "dialog"), s = Q(null), o = Q();
    fe(() => e.opened, (_) => {
      var L, y;
      _ ? ((L = o.value) == null || L.showModal(), setTimeout(() => {
        var w;
        (w = s.value) == null || w.focus();
      }, 100)) : (y = o.value) == null || y.close(), u(_);
    });
    function u(_) {
      typeof window < "u" && document.body.classList.toggle("modal-open", _);
    }
    we(() => {
      d(), u(e.opened);
    }), hr(() => {
      p(), u(!1);
    });
    function d() {
      document.addEventListener("keydown", r);
    }
    function p() {
      document.removeEventListener("keydown", r);
    }
    async function v() {
      var _;
      await Xn(), (_ = e.origin) == null || _.focus(), a("close");
    }
    const m = k(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), I = k(
      () => m.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Nn } : { scale: Nn, ...e.icon ?? {} }
    );
    return (_, L) => _.opened ? (i(), W(H(od), { key: 0 }, {
      default: U(() => {
        var y, w;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: o,
            "aria-modal": "true",
            "aria-labelledby": _.modalId,
            role: l.value,
            class: R(["fr-modal", { "fr-modal--opened": _.opened }]),
            open: _.opened
          }, [
            c("div", ud, [
              c("div", dd, [
                c("div", {
                  class: R(["fr-col-12", {
                    "fr-col-md-8": _.size === "lg",
                    "fr-col-md-6": _.size === "md",
                    "fr-col-md-4": _.size === "sm"
                  }])
                }, [
                  c("div", cd, [
                    c("div", fd, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: s,
                        class: "fr-btn fr-btn--close",
                        title: _.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: L[0] || (L[0] = (T) => v())
                      }, [
                        c("span", null, h(_.closeButtonLabel), 1)
                      ], 8, pd)
                    ]),
                    c("div", md, [
                      c("h1", {
                        id: _.modalId,
                        class: "fr-modal__title"
                      }, [
                        m.value || I.value ? (i(), f("span", {
                          key: 0,
                          class: R({
                            [String(_.icon)]: m.value
                          })
                        }, [
                          _.icon && I.value ? (i(), W(be, Ie(Y({ key: 0 }, I.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        V(" " + h(_.title), 1)
                      ], 8, hd),
                      $(_.$slots, "default", {}, void 0, !0)
                    ]),
                    (y = _.actions) != null && y.length || _.$slots.footer ? (i(), f("div", vd, [
                      $(_.$slots, "footer", {}, void 0, !0),
                      (w = _.actions) != null && w.length ? (i(), W(It, {
                        key: 0,
                        align: "right",
                        buttons: _.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : b("", !0)
                    ])) : b("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, id)
        ];
      }),
      _: 3
    })) : b("", !0);
  }
}), Ia = /* @__PURE__ */ ke(gd, [["__scopeId", "data-v-70fe954b"]]), bd = ["for"], yd = {
  key: 0,
  class: "required"
}, kd = {
  key: 0,
  class: "fr-hint-text"
}, wd = ["id"], _d = ["id"], xd = {
  key: 0,
  class: "fr-btns-group"
}, Dd = {
  key: 1,
  class: "fr-input-group"
}, Td = { class: "fr-input-wrap fr-icon-search-line" }, Id = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Cd = { key: 2 }, Ed = ["id"], Pd = /* @__PURE__ */ F({
  __name: "DsfrMultiselect",
  props: /* @__PURE__ */ Be({
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
    id: { default: () => se("multiselect") },
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
  setup(n) {
    const t = n, e = (K, X) => typeof K == "object" && K !== null && !!X && X in K, a = (K, X) => {
      if (X && e(K, X)) {
        const re = K[X];
        if (typeof re == "string" || typeof re == "number")
          return re;
        throw new Error(
          `The value of idKey ${String(X)} is not a string or number.`
        );
      }
      if (typeof K == "string" || typeof K == "number")
        return K;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (K, X, re) => `${X}-${a(K, re)}`, l = Q(null), s = Q(!1), o = _e(n, "modelValue"), u = Q(0), d = k(() => t.errorMessage || t.successMessage), p = k(() => t.errorMessage ? "error" : "valid"), v = [], {
      collapse: m,
      collapsing: I,
      cssExpanded: _,
      doExpand: L,
      onTransitionEnd: y
    } = Se(), w = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), T = Q(!1), S = Q("");
    function D(K) {
      K.key === "Escape" && E();
    }
    function C(K) {
      var X, re;
      const ue = K.target;
      !((X = l.value) != null && X.$el.contains(ue)) && !((re = m.value) != null && re.contains(ue)) && E();
    }
    function P(K, X) {
      if (window.ResizeObserver) {
        const re = new window.ResizeObserver((ue) => {
          for (const ce of ue)
            X(K, ce);
        });
        return re.observe(K), () => {
          re.unobserve(K), re.disconnect();
        };
      }
      return () => {
      };
    }
    function x(K) {
      const X = K.getBoundingClientRect();
      X.width !== u.value && (u.value = X.width);
    }
    function N() {
      s.value = !0, T.value = !0, l.value && v.push(P(l.value.$el, x)), document.addEventListener("click", C), document.addEventListener("keydown", D), setTimeout(() => {
        L(!0);
      }, 100);
    }
    function E() {
      s.value = !1, L(!1), setTimeout(() => {
        T.value = !1;
      }, 300), g();
    }
    const B = async () => {
      T.value ? E() : N();
    };
    function g() {
      for (; v.length; ) {
        const K = v.pop();
        K && K();
      }
      document.removeEventListener("click", C), document.removeEventListener("keydown", D);
    }
    const M = k(
      () => t.options.filter((K) => typeof K == "object" && K !== null ? t.filteringKeys.some(
        (X) => `${K[X]}`.toLowerCase().includes(S.value.toLowerCase())
      ) : `${K}`.toLowerCase().includes(S.value.toLowerCase()))
    ), j = k(() => t.modelValue.length < M.value.length ? !1 : M.value.every((K) => {
      const X = a(K, t.idKey);
      return t.modelValue.includes(X);
    })), A = () => {
      const K = new Set(o.value || []);
      j.value ? M.value.forEach((X) => {
        const re = a(X, t.idKey);
        K.delete(re);
      }) : M.value.forEach((X) => {
        const re = a(X, t.idKey);
        K.add(re);
      }), o.value = Array.from(K);
    }, O = (K) => {
      const [X] = w();
      X && (K.preventDefault(), X.focus());
    }, Z = (K) => {
      K.preventDefault();
      const X = w(), re = document.activeElement, ue = Array.from(X).indexOf(re);
      if (ue !== -1) {
        const ce = (ue + 1) % X.length;
        X[ce].focus();
      }
    }, z = (K) => {
      K.preventDefault();
      const X = w(), re = document.activeElement, ue = Array.from(X).indexOf(re);
      if (ue !== -1) {
        const ce = (ue - 1 + X.length) % X.length;
        X[ce].focus();
      }
    }, le = (K) => {
      const X = w(), re = document.activeElement;
      Array.from(X).indexOf(re) + 1 === X.length && l.value && !K.shiftKey && E();
    }, ae = (K) => {
      var X;
      const re = document.activeElement;
      K.shiftKey && re === ((X = l.value) == null ? void 0 : X.$el) && E();
    };
    Ee(() => {
      g();
    });
    const De = k(() => {
      var K;
      const X = ((K = o.value) == null ? void 0 : K.length) ?? 0, re = X === 0, ue = X > 1;
      return re ? "Sélectionner une option" : `${X} option${ue ? "s" : ""} sélectionnée${ue ? "s" : ""}`;
    }), Ce = k(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (K, X) => {
      var re, ue;
      return i(), f("div", {
        class: R(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
      }, [
        c("label", {
          class: R(Ce.value),
          for: K.id
        }, [
          $(K.$slots, "label", {}, () => [
            V(h(K.label) + " ", 1),
            $(K.$slots, "required-tip", {}, () => [
              "required" in K.$attrs && K.$attrs.required !== !1 ? (i(), f("span", yd)) : b("", !0)
            ], !0)
          ], !0),
          t.hint || (ue = (re = K.$slots).hint) != null && ue.call(re) ? (i(), f("span", kd, [
            $(K.$slots, "hint", {}, () => [
              V(h(t.hint), 1)
            ], !0)
          ])) : b("", !0)
        ], 10, bd),
        ee(je, Y({
          id: t.id,
          ref_key: "host",
          ref: l,
          type: "button"
        }, K.$attrs, {
          class: ["fr-select fr-multiselect", {
            "fr-multiselect--is-open": s.value,
            [`fr-select--${p.value}`]: d.value
          }],
          "aria-expanded": s.value,
          "aria-controls": `${t.id}-collapse`,
          onClick: B,
          onKeydown: ne(te(ae, ["shift"]), ["tab"])
        }), {
          default: U(() => [
            $(K.$slots, "button-label", {}, () => [
              V(h(t.buttonLabel || De.value), 1)
            ], !0)
          ]),
          _: 3
        }, 16, ["id", "aria-expanded", "aria-controls", "class", "onKeydown"]),
        T.value ? (i(), f("div", {
          key: 0,
          id: `${t.id}-collapse`,
          ref_key: "collapse",
          ref: m,
          style: Te({
            "--width-host": `${u.value}px`
          }),
          class: R(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": H(_), "fr-collapsing": H(I) }]),
          onTransitionend: X[2] || (X[2] = (ce) => H(y)(s.value))
        }, [
          c("p", {
            id: `${K.id}-text-hint`,
            class: "fr-sr-only"
          }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, _d),
          K.selectAll ? (i(), f("ul", xd, [
            c("li", null, [
              ee(je, {
                type: "button",
                name: "select-all",
                secondary: "",
                size: "sm",
                disabled: M.value.length === 0,
                onClick: A,
                onKeydown: ne(te(ae, ["shift"]), ["tab"])
              }, {
                default: U(() => [
                  c("span", {
                    class: R([
                      "fr-multiselect__search__icon",
                      j.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                    ])
                  }, null, 2),
                  V(" " + h(t.selectAllLabel[j.value ? 1 : 0]), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onKeydown"])
            ])
          ])) : b("", !0),
          t.search ? (i(), f("div", Dd, [
            c("div", Td, [
              ee(Et, {
                modelValue: S.value,
                "onUpdate:modelValue": X[0] || (X[0] = (ce) => S.value = ce),
                "aria-describedby": `${t.id}-text-hint`,
                "aria-controls": `${t.id}-checkboxes`,
                "aria-live": "polite",
                placeholder: "Rechercher",
                type: "text",
                onKeydown: [
                  ne(O, ["down"]),
                  ne(O, ["right"]),
                  ne(ae, ["tab"])
                ]
              }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
            ]),
            X[3] || (X[3] = c("div", {
              class: "fr-messages-group",
              "aria-live": "assertive"
            }, null, -1))
          ])) : b("", !0),
          ee(ma, {
            id: `${t.id}-checkboxes`,
            class: "fr-multiselect__collapse__fieldset",
            "aria-live": "polite",
            style: Te({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
            legend: t.legend,
            "legend-id": `${t.id}-checkboxes-legend`
          }, {
            default: U(() => [
              $(K.$slots, "legend", {}, void 0, !0),
              (i(!0), f(G, null, J(M.value, (ce) => (i(), f("div", {
                key: `${r(ce, K.id, t.idKey)}-checkbox`,
                class: "fr-fieldset__element"
              }, [
                c("div", Id, [
                  ee(Ct, {
                    id: `${r(ce, K.id, t.idKey)}-checkbox`,
                    modelValue: o.value,
                    "onUpdate:modelValue": X[1] || (X[1] = (ot) => o.value = ot),
                    value: a(ce, t.idKey),
                    name: `${r(ce, K.id, t.idKey)}-checkbox`,
                    small: "",
                    onKeydown: [
                      ne(Z, ["down"]),
                      ne(Z, ["right"]),
                      ne(z, ["up"]),
                      ne(z, ["left"]),
                      ne(le, ["tab"])
                    ]
                  }, {
                    label: U(() => [
                      $(K.$slots, "checkbox-label", {
                        option: ce
                      }, () => [
                        V(h(a(ce, t.labelKey)), 1)
                      ], !0)
                    ]),
                    _: 2
                  }, 1032, ["id", "modelValue", "value", "name"])
                ])
              ]))), 128))
            ]),
            _: 3
          }, 8, ["id", "style", "legend", "legend-id"]),
          M.value.length === 0 ? (i(), f("div", Cd, [
            $(K.$slots, "no-results", {}, () => [
              X[4] || (X[4] = V(" Pas de résultat "))
            ], !0)
          ])) : b("", !0)
        ], 46, wd)) : b("", !0),
        d.value ? (i(), f("p", {
          key: 1,
          id: `select-${p.value}-desc-${p.value}`,
          class: R(`fr-${p.value}-text`)
        }, h(d.value), 11, Ed)) : b("", !0)
      ], 2);
    };
  }
}), Md = /* @__PURE__ */ ke(Pd, [["__scopeId", "data-v-829d79d0"]]), Ld = ["id", "aria-current"], Bd = /* @__PURE__ */ F({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => se("nav", "item") },
    active: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-nav__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      $(t.$slots, "default", {}, void 0, !0)
    ], 8, Ld));
  }
}), Ca = /* @__PURE__ */ ke(Bd, [["__scopeId", "data-v-aa4076c4"]]), Sd = ["href"], qn = 2, Pt = /* @__PURE__ */ F({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => se("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(n) {
    const t = n, e = k(() => typeof t.to == "string" && t.to.startsWith("http")), a = k(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = k(
      () => a.value || !t.icon ? void 0 : typeof t.icon == "string" ? { scale: qn, name: t.icon } : { scale: qn, ...t.icon || {} }
    ), l = cr() ? Qe(ln) : void 0, s = (l == null ? void 0 : l()) ?? (() => {
    });
    return (o, u) => {
      const d = xe("RouterLink");
      return e.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: o.to,
        onClick: u[0] || (u[0] = (p) => {
          o.$emit("toggleId", o.id), o.onClick(p);
        })
      }, h(o.text), 9, Sd)) : (i(), W(d, {
        key: 1,
        class: R(["fr-nav__link", {
          [String(o.icon)]: a.value
        }]),
        "data-testid": "nav-router-link",
        to: o.to,
        onClick: u[1] || (u[1] = (p) => {
          var v;
          H(s)(), o.$emit("toggleId", o.id), (v = o.onClick) == null || v.call(o, p);
        })
      }, {
        default: U(() => [
          o.icon && r.value ? (i(), W(be, Ie(Y({ key: 0 }, r.value)), null, 16)) : b("", !0),
          V(" " + h(o.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), $d = { class: "fr-col-12 fr-col-lg-3" }, Ad = { class: "fr-mega-menu__category" }, Od = { class: "fr-mega-menu__list" }, Ea = /* @__PURE__ */ F({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(n) {
    return (t, e) => (i(), f("div", $d, [
      c("h5", Ad, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: e[0] || (e[0] = te(() => {
          }, ["prevent"]))
        }, h(t.title), 1)
      ]),
      c("ul", Od, [
        (i(!0), f(G, null, J(t.links, (a, r) => (i(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          ee(Pt, Y({ ref_for: !0 }, a), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Rd = ["aria-expanded", "aria-current", "aria-controls"], Fd = ["id"], Vd = { class: "fr-container fr-container--fluid fr-container-lg" }, Nd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, qd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, jd = { class: "fr-mega-menu__leader" }, Hd = { class: "fr-h4 fr-mb-2v" }, Wd = { class: "fr-hidden fr-displayed-lg" }, Kd = /* @__PURE__ */ F({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => se("mega-menu") },
    title: {},
    description: { default: "" },
    link: { default: () => ({ to: "#", text: "Voir toute la rubrique" }) },
    menus: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(n) {
    const t = n, {
      collapse: e,
      collapsing: a,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se(), o = k(() => t.id === t.expandedId);
    return fe(o, (u, d) => {
      u !== d && l(u);
    }), we(() => {
      o.value && l(!0);
    }), (u, d) => {
      const p = xe("RouterLink");
      return i(), f(G, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": o.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: d[0] || (d[0] = (v) => u.$emit("toggleId", u.id))
        }, h(u.title), 9, Rd),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: R(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": H(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": H(a)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (v) => H(s)(o.value))
        }, [
          c("div", Vd, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (v) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            c("div", Nd, [
              c("div", qd, [
                c("div", jd, [
                  c("h4", Hd, h(u.title), 1),
                  c("p", Wd, [
                    V(h(u.description) + " ", 1),
                    $(u.$slots, "description", {}, void 0, !0)
                  ]),
                  ee(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: U(() => [
                      V(h(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              $(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(G, null, J(u.menus, (v, m) => (i(), W(Ea, Y({
                key: m,
                ref_for: !0
              }, v), null, 16))), 128))
            ])
          ])
        ], 42, Fd)
      ], 64);
    };
  }
}), Pa = /* @__PURE__ */ ke(Kd, [["__scopeId", "data-v-1e103394"]]), Qd = ["id", "aria-current"], Ma = /* @__PURE__ */ F({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => se("menu", "item") },
    active: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-menu__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      $(t.$slots, "default")
    ], 8, Qd));
  }
}), Yd = ["aria-expanded", "aria-current", "aria-controls"], zd = ["id"], Gd = { class: "fr-menu__list" }, La = /* @__PURE__ */ F({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => se("menu") },
    title: {},
    links: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(n) {
    const t = n, {
      collapse: e,
      collapsing: a,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se(), o = k(() => t.id === t.expandedId);
    return fe(o, (u, d) => {
      u !== d && l(u);
    }), we(() => {
      o.value && l(!0);
    }), (u, d) => (i(), f(G, null, [
      c("button", {
        class: "fr-nav__btn",
        "aria-expanded": o.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: d[0] || (d[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        c("span", null, h(u.title), 1)
      ], 8, Yd),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse fr-menu", { "fr-collapse--expanded": H(r), "fr-collapsing": H(a) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => H(s)(o.value))
      }, [
        c("ul", Gd, [
          $(u.$slots, "default"),
          (i(!0), f(G, null, J(u.links, (p, v) => (i(), W(Ma, { key: v }, {
            default: U(() => [
              ee(Pt, Y({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (m) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, zd)
    ], 64));
  }
}), Xd = ["id", "aria-label"], Ud = { class: "fr-nav__list" }, Zd = /* @__PURE__ */ F({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => se("nav") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(n) {
    const t = n, e = Q(void 0), a = (o) => {
      if (o === e.value) {
        e.value = void 0;
        return;
      }
      e.value = o;
    }, r = (o) => {
      if (o !== document.getElementById(t.id)) {
        if (!(o != null && o.parentNode)) {
          a(e.value);
          return;
        }
        r(o.parentNode);
      }
    }, l = (o) => {
      r(o.target);
    }, s = (o) => {
      o.key === "Escape" && a(e.value);
    };
    return we(() => {
      document.addEventListener("click", l), document.addEventListener("keydown", s);
    }), Ee(() => {
      document.removeEventListener("click", l), document.removeEventListener("keydown", s);
    }), (o, u) => (i(), f("nav", {
      id: o.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": o.label
    }, [
      c("ul", Ud, [
        $(o.$slots, "default"),
        (i(!0), f(G, null, J(o.navItems, (d, p) => (i(), W(Ca, {
          id: d.id,
          key: p
        }, {
          default: U(() => [
            d.to && d.text ? (i(), W(Pt, Y({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (v) => a(v))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), W(La, Y({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (v) => a(v))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), W(Pa, Y({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (v) => a(v))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, Xd));
  }
}), Jd = { class: "fr-container" }, ec = { class: "fr-notice__body" }, tc = { class: "fr-notice__title" }, nc = { class: "fr-notice__desc" }, ac = /* @__PURE__ */ F({
  __name: "DsfrNotice",
  props: {
    title: { default: "" },
    desc: { default: "" },
    closeable: { type: Boolean },
    type: { default: "info" }
  },
  emits: ["close"],
  setup(n) {
    return (t, e) => (i(), f("div", {
      class: R(["fr-notice", `fr-notice--${t.type}`])
    }, [
      c("div", Jd, [
        c("div", ec, [
          c("p", null, [
            c("span", tc, [
              $(t.$slots, "default", {}, () => [
                V(h(t.title), 1)
              ])
            ]),
            c("span", nc, [
              $(t.$slots, "desc", {}, () => [
                V(h(t.desc), 1)
              ])
            ])
          ]),
          t.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: e[0] || (e[0] = (a) => t.$emit("close"))
          }, " Masquer le message ")) : b("", !0)
        ])
      ])
    ], 2));
  }
}), rc = ["aria-label"], lc = { class: "fr-content-media__img" }, sc = ["src", "alt", "title", "ratio"], oc = { class: "fr-content-media__caption" }, ic = /* @__PURE__ */ F({
  __name: "DsfrPicture",
  props: {
    alt: { default: "" },
    legend: { default: "" },
    size: { default: "medium" },
    src: {},
    title: { default: "" },
    ratio: { default: "16x9" }
  },
  setup(n) {
    return (t, e) => (i(), f("figure", {
      class: R(["fr-content-media", {
        "fr-content-media--sm": t.size === "small",
        "fr-content-media--lg": t.size === "large"
      }]),
      role: "group",
      "aria-label": t.legend
    }, [
      c("div", lc, [
        $(t.$slots, "default", {}, () => [
          t.src ? (i(), f("img", {
            key: 0,
            src: t.src,
            class: R(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
            alt: t.alt,
            title: t.title,
            ratio: t.ratio
          }, null, 10, sc)) : b("", !0)
        ])
      ]),
      c("figcaption", oc, h(t.legend), 1)
    ], 10, rc));
  }
}), uc = { class: "fr-quote fr-quote--column" }, dc = ["cite"], cc = { class: "fr-quote__author" }, fc = { class: "fr-quote__source" }, pc = ["href"], mc = {
  key: 0,
  class: "fr-quote__image"
}, hc = ["src"], vc = /* @__PURE__ */ F({
  __name: "DsfrQuote",
  props: {
    quote: { default: void 0 },
    author: { default: void 0 },
    details: { default: () => [] },
    source: { default: "" },
    sourceUrl: { default: "" },
    quoteImage: { default: "" }
  },
  setup(n) {
    return (t, e) => (i(), f("figure", uc, [
      t.source ? (i(), f("blockquote", {
        key: 0,
        cite: t.sourceUrl
      }, [
        c("p", null, "« " + h(t.quote) + " »", 1)
      ], 8, dc)) : b("", !0),
      c("figcaption", null, [
        c("p", cc, h(t.author), 1),
        c("ul", fc, [
          c("li", null, [
            c("cite", null, h(t.source), 1)
          ]),
          (i(!0), f(G, null, J(t.details, (a, r) => (i(), f("li", { key: r }, [
            typeof a == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: a.url
            }, h(a.label), 9, pc)) : (i(), f(G, { key: 1 }, [
              V(h(a), 1)
            ], 64))
          ]))), 128))
        ]),
        t.quoteImage ? (i(), f("div", mc, [
          c("img", {
            src: t.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, hc)
        ])) : b("", !0)
      ])
    ]));
  }
}), gc = ["id", "name", "value", "checked", "disabled"], bc = ["for"], yc = {
  key: 0,
  class: "required"
}, kc = {
  key: 0,
  class: "fr-hint-text"
}, wc = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, _c = ["src", "title"], xc = { key: 0 }, Dc = ["href"], Tc = ["href"], Ic = ["href"], Ba = /* @__PURE__ */ F({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => se("basic", "radio") },
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
  setup(n) {
    const t = n, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, a = k(() => !!t.img || !!t.svgPath);
    return (r, l) => (i(), f("div", {
      class: R(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: R(["fr-radio-group", {
          "fr-radio-rich": a.value,
          "fr-radio-group--sm": r.small
        }])
      }, [
        c("input", Y({
          id: r.id,
          type: "radio",
          name: r.name,
          value: r.value,
          checked: r.modelValue === r.value,
          disabled: r.disabled
        }, r.$attrs, {
          onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
        }), null, 16, gc),
        c("label", {
          for: r.id,
          class: "fr-label"
        }, [
          $(r.$slots, "label", {}, () => [
            V(h(r.label) + " ", 1),
            $(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (i(), f("span", yc, " *")) : b("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", kc, h(r.hint), 1)) : b("", !0)
        ], 8, bc),
        r.img || r.svgPath ? (i(), f("div", wc, [
          r.img ? (i(), f("img", {
            key: 0,
            src: r.img,
            class: "fr-artwork",
            alt: "",
            title: r.imgTitle
          }, null, 8, _c)) : (i(), f("svg", Y({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...e, ...r.svgAttrs }), [
            r.imgTitle ? (i(), f("title", xc, h(r.imgTitle), 1)) : b("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${r.svgPath}#artwork-decorative`
            }, null, 8, Dc),
            c("use", {
              class: "fr-artwork-minor",
              href: `${r.svgPath}#artwork-minor`
            }, null, 8, Tc),
            c("use", {
              class: "fr-artwork-major",
              href: `${r.svgPath}#artwork-major`
            }, null, 8, Ic)
          ], 16))
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Cc = { class: "fr-form-group" }, Ec = ["disabled", "aria-labelledby", "aria-invalid", "role"], Pc = ["id"], Mc = {
  key: 0,
  class: "fr-hint-text"
}, Lc = {
  key: 0,
  class: "required"
}, Bc = ["id"], Sc = /* @__PURE__ */ F({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => se("radio-button", "group") },
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
  setup(n, { emit: t }) {
    const e = n, a = t, r = k(() => e.errorMessage || e.validMessage), l = k(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), s = (u) => {
      u !== e.modelValue && a("update:modelValue", u);
    }, o = k(() => r.value ? `${e.titleId} messages-${e.titleId}` : e.titleId);
    return (u, d) => (i(), f("div", Cc, [
      c("fieldset", {
        class: R(["fr-fieldset", {
          "fr-fieldset--error": u.errorMessage,
          "fr-fieldset--valid": u.validMessage
        }]),
        disabled: u.disabled,
        "aria-labelledby": o.value,
        "aria-invalid": u.ariaInvalid,
        role: u.errorMessage || u.validMessage ? "group" : void 0
      }, [
        u.legend || u.$slots.legend || u.hint || u.$slots.hint ? (i(), f("legend", {
          key: 0,
          id: u.titleId,
          class: "fr-fieldset__legend fr-fieldset__legend--regular"
        }, [
          $(u.$slots, "legend", {}, () => [
            V(h(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Mc, [
              $(u.$slots, "hint", {}, () => [
                V(h(u.hint), 1)
              ])
            ])) : b("", !0),
            $(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Lc, " *")) : b("", !0)
            ])
          ])
        ], 8, Pc)) : b("", !0),
        $(u.$slots, "default", {}, () => [
          (i(!0), f(G, null, J(u.options, (p, v) => (i(), W(Ba, Y({
            key: typeof p.value == "boolean" ? v : p.value || v,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": d[0] || (d[0] = (m) => s(m))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        r.value ? (i(), f("div", {
          key: 1,
          id: `messages-${u.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          c("p", {
            class: R(["fr-message fr-message--info flex items-center", l.value])
          }, h(r.value), 3)
        ], 8, Bc)) : b("", !0)
      ], 10, Ec)
    ]));
  }
}), $c = ["id"], Ac = ["id"], Oc = { class: "fr-hint-text" }, Rc = ["data-fr-prefix", "data-fr-suffix"], Fc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Vc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Nc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, qc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, jc = ["id"], Hc = ["id"], Wc = /* @__PURE__ */ F({
  __name: "DsfrRange",
  props: {
    id: { default: () => se("range") },
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
  setup(n, { emit: t }) {
    const e = n, a = t, r = Q(), l = Q(), s = Q(), o = k(() => e.lowerValue !== void 0), u = k(() => e.step !== void 0), d = k(() => {
      if (e.lowerValue === void 0) {
        const m = (e.modelValue - e.min) / (e.max - e.min) * s.value;
        return `transform: translateX(${m}px) translateX(-${m / s.value * 100}%);`;
      }
      return `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * s.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`;
    }), p = k(() => {
      const m = e.max - e.min, I = (e.modelValue - e.min) / m, _ = ((e.lowerValue ?? 0) - e.min) / m, L = e.small ? 12 : 24, y = (s.value - L) / (m / (e.step ?? 2)), w = o.value ? 32 * (1 - I) : 0;
      return {
        "--progress-right": `${(I * s.value + w).toFixed(2)}px`,
        ...o.value ? { "--progress-left": `${(_ * s.value).toFixed(2)}px` } : {},
        ...u.value ? { "--step-width": `${Math.floor(y)}px` } : {}
      };
    });
    fe([() => e.modelValue, () => e.lowerValue], ([m, I]) => {
      I !== void 0 && (o.value && m < I && a("update:lowerValue", m), o.value && I > m && a("update:modelValue", I));
    });
    const v = k(() => (e.prefix ?? "").concat(o.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return we(() => {
      var m;
      s.value = (m = r.value) == null ? void 0 : m.offsetWidth;
    }), (m, I) => (i(), f("div", {
      id: `${m.id}-group`,
      class: R(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      c("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        $(m.$slots, "label", {}, () => [
          V(h(m.label), 1)
        ]),
        c("span", Oc, [
          $(m.$slots, "hint", {}, () => [
            V(h(m.hint), 1)
          ])
        ])
      ], 8, Ac),
      c("div", {
        class: R(["fr-range", {
          "fr-range--sm": m.small,
          "fr-range--step": u.value,
          "fr-range--double": o.value,
          "fr-range-group--disabled": m.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": m.prefix ?? void 0,
        "data-fr-suffix": m.suffix ?? void 0,
        style: Te(p.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: l,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: Te(d.value)
        }, h(v.value), 5),
        o.value ? (i(), f("input", {
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
          onInput: I[0] || (I[0] = (_) => {
            var L;
            return a("update:lowerValue", +((L = _.target) == null ? void 0 : L.value));
          })
        }, null, 40, Fc)) : b("", !0),
        c("input", {
          id: m.id,
          ref_key: "input",
          ref: r,
          type: "range",
          min: m.min,
          max: m.max,
          step: m.step,
          value: m.modelValue,
          disabled: m.disabled,
          "aria-disabled": m.disabled,
          "aria-labelledby": `${m.id}-label`,
          "aria-describedby": `${m.id}-messages`,
          onInput: I[1] || (I[1] = (_) => {
            var L;
            return a("update:modelValue", +((L = _.target) == null ? void 0 : L.value));
          })
        }, null, 40, Vc),
        m.hideIndicators ? b("", !0) : (i(), f("span", Nc, h(m.min), 1)),
        m.hideIndicators ? b("", !0) : (i(), f("span", qc, h(m.max), 1))
      ], 14, Rc),
      m.message || m.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${m.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        $(m.$slots, "messages", {}, () => [
          m.message ? (i(), f("p", {
            key: 0,
            id: `${m.id}-message-error`,
            class: "fr-message fr-message--error"
          }, h(m.message), 9, Hc)) : b("", !0)
        ])
      ], 8, jc)) : b("", !0)
    ], 10, $c));
  }
}), Kc = { class: "fr-segmented__element" }, Qc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Yc = ["for"], zc = { key: 1 }, Sa = /* @__PURE__ */ F({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => se("segmented") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(n) {
    const t = n, e = k(() => typeof t.icon == "string" ? { name: t.icon } : t.icon), a = k(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : "");
    return (r, l) => (i(), f("div", Kc, [
      c("input", Y({
        id: r.id,
        type: "radio",
        name: r.name,
        value: r.value,
        checked: r.modelValue === r.value,
        disabled: r.disabled,
        "aria-disabled": r.disabled
      }, r.$attrs, {
        onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
      }), null, 16, Qc),
      c("label", {
        for: r.id,
        class: R(["fr-label", { [a.value]: a.value }])
      }, [
        r.icon && !a.value ? (i(), W(be, Ie(Y({ key: 0 }, e.value)), null, 16)) : b("", !0),
        r.icon ? (i(), f("span", zc, " ")) : b("", !0),
        V(" " + h(r.label), 1)
      ], 10, Yc)
    ]));
  }
}), Gc = { class: "fr-form-group" }, Xc = ["disabled"], Uc = ["id"], Zc = {
  key: 0,
  class: "fr-hint-text"
}, Jc = { class: "fr-segmented__elements" }, ef = /* @__PURE__ */ F({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => se("segmented-button", "set") },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    name: { default: () => se("segmented-button", "set") },
    hint: {},
    legend: { default: "" },
    modelValue: {},
    options: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: t }) {
    const e = n, a = t, r = (l) => {
      l !== e.modelValue && a("update:modelValue", l);
    };
    return (l, s) => (i(), f("div", Gc, [
      c("fieldset", {
        class: R(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (i(), f("legend", {
          key: 0,
          id: l.titleId,
          class: R(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          $(l.$slots, "legend", {}, () => [
            V(h(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", Zc, h(l.hint), 1)) : b("", !0)
        ], 10, Uc)) : b("", !0),
        c("div", Jc, [
          $(l.$slots, "default", {}, () => [
            (i(!0), f(G, null, J(l.options, (o, u) => (i(), W(Sa, Y({
              key: o.value || u,
              name: l.name || o.name,
              ref_for: !0
            }, { ...o, disabled: l.disabled || o.disabled }, {
              "model-value": l.modelValue,
              "onUpdate:modelValue": s[0] || (s[0] = (d) => r(d))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Xc)
    ]));
  }
}), tf = ["for"], nf = {
  key: 0,
  class: "required"
}, af = {
  key: 0,
  class: "fr-hint-text"
}, rf = ["id", "name", "disabled", "aria-disabled", "required"], lf = ["selected"], sf = ["selected", "value", "disabled", "aria-disabled"], of = ["id"], uf = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => se("select") },
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
  setup(n) {
    const t = n;
    t.description && console.warn(
      "[DsfrSelect] : La prop `description` est dépréciée. Veuillez utiliser `hint` à la place."
    );
    const e = k(() => t.errorMessage || t.successMessage), a = k(() => t.errorMessage ? "error" : "valid");
    return (r, l) => (i(), f("div", {
      class: R(["fr-select-group", { [`fr-select-group--${a.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        $(r.$slots, "label", {}, () => [
          V(h(r.label) + " ", 1),
          $(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", nf, " *")) : b("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", af, h(r.hint ?? r.description), 1)) : b("", !0)
      ], 8, tf),
      c("select", Y({
        id: r.selectId,
        class: [{ [`fr-select--${a.value}`]: e.value }, "fr-select"],
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
        }, h(r.defaultUnselectedText), 9, lf),
        (i(!0), f(G, null, J(r.options, (s, o) => (i(), f("option", {
          key: o,
          selected: r.modelValue === s || typeof s == "object" && s.value === r.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, h(typeof s == "object" ? s.text : s), 9, sf))), 128))
      ], 16, rf),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${a.value}-desc-${a.value}`,
        class: R(`fr-${a.value}-text`)
      }, h(e.value), 11, of)) : b("", !0)
    ], 2));
  }
}), df = { class: "fr-share" }, cf = { class: "fr-share__title" }, ff = { class: "fr-btns-group" }, pf = ["title", "href", "onClick"], mf = { key: 0 }, hf = ["href", "title"], vf = ["title"], gf = /* @__PURE__ */ F({
  __name: "DsfrShare",
  props: {
    title: { default: "Partager la page" },
    copyLabel: { default: "Copier dans le presse-papier" },
    mail: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(n) {
    const t = () => {
      const a = window.location.href;
      navigator.clipboard.writeText(a);
    }, e = ({ url: a, label: r }) => {
      window.open(
        a,
        r,
        "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
    };
    return (a, r) => {
      var l;
      return i(), f("div", df, [
        c("p", cf, h(a.title), 1),
        c("ul", ff, [
          (i(!0), f(G, null, J(a.networks, (s, o) => (i(), f("li", { key: o }, [
            c("a", {
              class: R(`fr-btn fr-btn--${s.name}`),
              title: `${s.label} - nouvelle fenêtre`,
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: te((u) => e(s), ["prevent"])
            }, h(s.label), 11, pf)
          ]))), 128)),
          (l = a.mail) != null && l.to ? (i(), f("li", mf, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: a.mail.to,
              title: a.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, h(a.mail.label), 9, hf)
          ])) : b("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: a.copyLabel,
              onClick: r[0] || (r[0] = (s) => t())
            }, h(a.copyLabel), 9, vf)
          ])
        ])
      ]);
    };
  }
}), bf = ["aria-current", "aria-expanded", "aria-controls"], $a = /* @__PURE__ */ F({
  __name: "DsfrSideMenuButton",
  props: {
    active: { type: Boolean },
    expanded: { type: Boolean },
    controlId: {}
  },
  emits: ["toggleExpand"],
  setup(n) {
    return (t, e) => (i(), f("button", {
      class: "fr-sidemenu__btn",
      "aria-current": t.active ? "page" : void 0,
      "aria-expanded": !!t.expanded,
      "aria-controls": t.controlId,
      onClick: e[0] || (e[0] = (a) => t.$emit("toggleExpand", t.controlId))
    }, [
      $(t.$slots, "default")
    ], 8, bf));
  }
}), Aa = /* @__PURE__ */ F({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("li", {
      class: R(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      $(t.$slots, "default")
    ], 2));
  }
}), yf = ["id"], kf = { class: "fr-sidemenu__list" }, Oa = /* @__PURE__ */ F({
  __name: "DsfrSideMenuList",
  props: {
    id: {},
    collapsable: { type: Boolean },
    expanded: { type: Boolean },
    menuItems: { default: () => [] },
    focusOnExpanding: { type: Boolean }
  },
  emits: ["toggleExpand"],
  setup(n) {
    const t = n, {
      collapse: e,
      collapsing: a,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se();
    fe(() => t.expanded, (p, v) => {
      p !== v && l(p);
    }), we(() => {
      t.expanded && l(!0);
    });
    const o = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => o(p) ? "a" : "RouterLink", d = (p) => ({ [o(p) ? "href" : "to"]: p });
    return (p, v) => {
      const m = xe("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: R({
          "fr-collapse": p.collapsable,
          "fr-collapsing": H(a),
          "fr-collapse--expanded": H(r)
        }),
        onTransitionend: v[2] || (v[2] = (I) => H(s)(!!p.expanded, p.focusOnExpanding))
      }, [
        c("ul", kf, [
          $(p.$slots, "default"),
          (i(!0), f(G, null, J(p.menuItems, (I, _) => (i(), W(Aa, {
            key: _,
            active: I.active
          }, {
            default: U(() => [
              I.menuItems ? b("", !0) : (i(), W(ve(u(I.to)), Y({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": I.active ? "page" : void 0,
                ref_for: !0
              }, d(I.to)), {
                default: U(() => [
                  V(h(I.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              I.menuItems ? (i(), f(G, { key: 1 }, [
                ee($a, {
                  active: !!I.active,
                  expanded: !!I.expanded,
                  "control-id": I.id,
                  onToggleExpand: v[0] || (v[0] = (L) => p.$emit("toggleExpand", L))
                }, {
                  default: U(() => [
                    V(h(I.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                I.menuItems ? (i(), W(m, {
                  key: 0,
                  id: I.id,
                  collapsable: "",
                  expanded: I.expanded,
                  "menu-items": I.menuItems,
                  onToggleExpand: v[1] || (v[1] = (L) => p.$emit("toggleExpand", L))
                }, null, 8, ["id", "expanded", "menu-items"])) : b("", !0)
              ], 64)) : b("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, yf);
    };
  }
}), wf = ["aria-labelledby"], _f = { class: "fr-sidemenu__inner" }, xf = ["aria-controls", "aria-expanded"], Df = ["id"], Tf = /* @__PURE__ */ F({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => se("sidemenu") },
    sideMenuListId: { default: () => se("sidemenu", "list") },
    collapseValue: { default: "-492px" },
    menuItems: { default: () => {
    } },
    headingTitle: { default: "" },
    titleTag: { default: "h3" },
    focusOnExpanding: { type: Boolean, default: !0 }
  },
  emits: ["toggleExpand"],
  setup(n) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: a,
      doExpand: r,
      onTransitionEnd: l
    } = Se(), s = Q(!1);
    return fe(s, (o, u) => {
      o !== u && r(o);
    }), (o, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": o.id
    }, [
      c("div", _f, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": o.id,
          "aria-expanded": s.value,
          onClick: u[0] || (u[0] = te((d) => s.value = !s.value, ["prevent", "stop"]))
        }, h(o.buttonLabel), 9, xf),
        c("div", {
          id: o.id,
          ref_key: "collapse",
          ref: t,
          class: R(["fr-collapse", {
            "fr-collapse--expanded": H(a),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": H(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => H(l)(s.value, o.focusOnExpanding))
        }, [
          (i(), W(ve(o.titleTag), { class: "fr-sidemenu__title" }, {
            default: U(() => [
              V(h(o.headingTitle), 1)
            ]),
            _: 1
          })),
          $(o.$slots, "default", {}, () => [
            ee(Oa, {
              id: o.sideMenuListId,
              "menu-items": o.menuItems,
              onToggleExpand: u[1] || (u[1] = (d) => o.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, Df)
      ])
    ], 8, wf));
  }
}), If = /* @__PURE__ */ F({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(n) {
    const t = n, e = k(() => typeof t.to == "string" && t.to.startsWith("http")), a = k(() => e.value ? "a" : "RouterLink"), r = k(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, s) => (i(), W(ve(a.value), Y({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: U(() => [
        $(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), Cf = { class: "fr-skiplinks" }, Ef = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Pf = { class: "fr-skiplinks__list" }, Mf = ["href", "onClick"], Lf = /* @__PURE__ */ F({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(n) {
    const t = (e) => {
      const a = document.getElementById(e);
      a == null || a.focus();
    };
    return (e, a) => (i(), f("div", Cf, [
      c("nav", Ef, [
        c("ul", Pf, [
          (i(!0), f(G, null, J(e.links, (r) => (i(), f("li", {
            key: r.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${r.id}`,
              onClick: (l) => t(r.id)
            }, h(r.text), 9, Mf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Bf = { class: "fr-stepper" }, Sf = { class: "fr-stepper__title" }, $f = { class: "fr-stepper__state" }, Af = ["data-fr-current-step", "data-fr-steps"], Of = { class: "fr-stepper__details" }, Rf = {
  key: 0,
  class: "fr-text--bold"
}, Ff = /* @__PURE__ */ F({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(n) {
    return (t, e) => (i(), f("div", Bf, [
      c("h2", Sf, [
        V(h(t.steps[t.currentStep - 1]) + " ", 1),
        c("span", $f, "Étape " + h(t.currentStep) + " sur " + h(t.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, Af),
      c("p", Of, [
        t.currentStep < t.steps.length ? (i(), f("span", Rf, "Étape suivante :")) : b("", !0),
        V(" " + h(t.steps[t.currentStep]), 1)
      ])
    ]));
  }
}), Vf = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, Nf = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, qf = { class: "fr-summary__list" }, jf = ["href"], Hf = /* @__PURE__ */ F({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(n) {
    return (t, e) => (i(), f("nav", Vf, [
      c("h2", Nf, h(t.title), 1),
      c("ol", qf, [
        (i(!0), f(G, null, J(t.anchors, (a, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: a.link
          }, h(a.name), 9, jf)
        ]))), 128))
      ])
    ]));
  }
}), Wf = ["id", "aria-labelledby", "tabindex"], Kf = /* @__PURE__ */ F({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(n) {
    Gt((u) => ({
      "7152af7e": s.value,
      "2a62e962": o.value
    }));
    const t = n, e = { true: "100%", false: "-100%" }, a = Qe(Tt), { isVisible: r, asc: l } = a(st(() => t.tabId)), s = k(() => e[String(l == null ? void 0 : l.value)]), o = k(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), W(vr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: U(() => [
        Le(c("div", {
          id: u.panelId,
          class: R(["fr-tabs__panel", {
            "fr-tabs__panel--selected": H(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: H(r) ? 0 : -1
        }, [
          $(u.$slots, "default", {}, void 0, !0)
        ], 10, Wf), [
          [gr, H(r)]
        ])
      ]),
      _: 3
    }));
  }
}), Ra = /* @__PURE__ */ ke(Kf, [["__scopeId", "data-v-5774b16c"]]), Qf = { role: "presentation" }, Yf = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], zf = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Fa = /* @__PURE__ */ F({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(n, { emit: t }) {
    const e = n, a = t, r = Q(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      Home: "first",
      End: "last"
    };
    function s(p) {
      const v = p == null ? void 0 : p.key, m = l[v];
      m && a(m);
    }
    const o = Qe(Tt), { isVisible: u } = o(st(() => e.tabId)), d = fr("button");
    return fe(u, () => {
      var p;
      u.value && ((p = d.value) == null || p.focus());
    }), (p, v) => (i(), f("li", Qf, [
      c("button", {
        id: p.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${p.tabId}`,
        class: "fr-tabs__tab",
        tabindex: H(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": H(u),
        "aria-controls": p.panelId,
        onClick: v[0] || (v[0] = te((m) => p.$emit("click", p.tabId), ["prevent"])),
        onKeydown: v[1] || (v[1] = (m) => s(m))
      }, [
        p.icon ? (i(), f("span", zf, [
          ee(be, { name: p.icon }, null, 8, ["name"])
        ])) : b("", !0),
        $(p.$slots, "default")
      ], 40, Yf)
    ]));
  }
}), Va = /* @__PURE__ */ F({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(n) {
    const t = n, e = k(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), a = k(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", Y(r.headerAttrs, { scope: "col" }), [
      V(h(r.header) + " ", 1),
      r.icon && !e.value ? (i(), W(be, Ie(Y({ key: 0 }, a.value)), null, 16)) : b("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: R({ [String(r.icon)]: e.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), Gf = { key: 0 }, Na = /* @__PURE__ */ F({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(n) {
    return (t, e) => t.headers ? (i(), f("tr", Gf, [
      (i(!0), f(G, null, J(t.headers, (a, r) => (i(), W(Va, {
        key: r,
        header: (typeof a == "object" ? a : {}).text || a,
        "header-attrs": a.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), qa = /* @__PURE__ */ F({
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
  setup(n) {
    const t = n, e = k(() => typeof t.field == "object" && t.field !== null && t.field.component ? t.field.component : !1), a = k(() => ["string", "number", "boolean"].includes(typeof t.field));
    return (r, l) => (i(), f("td", Ie(wt(r.cellAttrs)), [
      e.value ? (i(), W(ve(e.value), Ie(Y({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: U(() => [
          V(h(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(G, { key: 1 }, [
        V(h(a.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), ja = /* @__PURE__ */ F({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(n) {
    return (t, e) => (i(), f("tr", Ie(wt(t.rowAttrs)), [
      $(t.$slots, "default"),
      (i(!0), f(G, null, J(t.rowData, (a, r) => (i(), W(qa, {
        key: r,
        field: a ?? "",
        "cell-attrs": typeof a == "object" && a !== null && !a.component ? a.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Xf = { class: "caption" }, Uf = { key: 1 }, Zf = ["colspan"], Jf = { class: "flex justify-right" }, ep = { class: "self-center" }, tp = ["for"], np = ["id"], ap = ["value"], rp = {
  class: "flex ml-1",
  "aria-live": "polite",
  "aria-atomic": "true"
}, lp = { class: "self-center fr-m-0" }, sp = { class: "flex ml-1" }, op = /* @__PURE__ */ F({
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
  setup(n, { emit: t }) {
    const e = n, a = t, r = (w) => Array.isArray(w) ? w : w.rowData, l = Q(e.currentPage), s = se("resultPerPage"), o = Q(e.resultsDisplayed), u = k(
      () => e.rows.length > o.value ? Math.ceil(e.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * o.value - o.value, v = () => l.value * o.value, m = k(() => e.pagination ? e.rows.slice(p(), v()) : e.rows), I = () => {
      l.value = 1, a("update:currentPage");
    }, _ = () => {
      l.value > 1 && (l.value -= 1, a("update:currentPage"));
    }, L = () => {
      l.value < u.value && (l.value += 1, a("update:currentPage"));
    }, y = () => {
      l.value = u.value, a("update:currentPage");
    };
    return (w, T) => (i(), f("div", {
      class: R(["fr-table", { "fr-table--no-caption": w.noCaption }])
    }, [
      c("table", null, [
        c("caption", Xf, h(w.title), 1),
        c("thead", null, [
          $(w.$slots, "header", {}, () => [
            w.headers && w.headers.length ? (i(), W(Na, {
              key: 0,
              headers: w.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          $(w.$slots, "default", {}, void 0, !0),
          w.rows && w.rows.length ? (i(!0), f(G, { key: 0 }, J(m.value, (S, D) => (i(), W(ja, {
            key: w.rowKey && r(S) ? typeof w.rowKey == "string" ? r(S)[w.headers.indexOf(w.rowKey)].toString() : w.rowKey(r(S)) : D,
            "row-data": r(S),
            "row-attrs": "rowAttrs" in S ? S.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : b("", !0),
          w.pagination ? (i(), f("tr", Uf, [
            c("td", {
              colspan: w.headers.length
            }, [
              c("div", Jf, [
                c("div", ep, [
                  c("label", { for: H(s) }, "Résultats par page : ", 8, tp),
                  Le(c("select", {
                    id: H(s),
                    "onUpdate:modelValue": T[0] || (T[0] = (S) => o.value = S),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: T[1] || (T[1] = (S) => a("update:currentPage"))
                  }, [
                    (i(), f(G, null, J(d, (S, D) => c("option", {
                      key: D,
                      value: S
                    }, h(S), 9, ap)), 64))
                  ], 40, np), [
                    [Ut, o.value]
                  ])
                ]),
                c("div", rp, [
                  c("p", lp, " Page " + h(l.value) + " sur " + h(u.value), 1)
                ]),
                c("div", sp, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: T[2] || (T[2] = (S) => I())
                  }, T[6] || (T[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: T[3] || (T[3] = (S) => _())
                  }, T[7] || (T[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (S) => L())
                  }, T[8] || (T[8] = [
                    c("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: T[5] || (T[5] = (S) => y())
                  }, T[9] || (T[9] = [
                    c("span", { class: "fr-sr-only" }, "Dernière page du tableau", -1)
                  ]))
                ])
              ])
            ], 8, Zf)
          ])) : b("", !0)
        ])
      ])
    ], 2));
  }
}), ip = /* @__PURE__ */ ke(op, [["__scopeId", "data-v-129bf2b7"]]), up = ["aria-label"], dp = /* @__PURE__ */ F({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(n, { expose: t, emit: e }) {
    const a = n, r = e, l = Q(!1), s = k({
      get: () => a.modelValue,
      set(D) {
        r("update:modelValue", D);
      }
    }), o = Q(/* @__PURE__ */ new Map()), u = Q(0);
    Re(Tt, (D) => {
      const C = Q(!0);
      if (fe(s, (N, E) => {
        C.value = N > E;
      }), [...o.value.values()].includes(D.value))
        return { isVisible: k(() => o.value.get(s.value) === D.value), asc: C };
      const P = u.value++;
      o.value.set(P, D.value);
      const x = k(() => P === s.value);
      return fe(D, () => {
        o.value.set(P, D.value);
      }), Ee(() => {
        o.value.delete(P);
      }), { isVisible: x };
    });
    const d = Q(null), p = Q(null), v = pr({}), m = (D) => {
      if (v[D])
        return v[D];
      const C = se("tab");
      return v[D] = C, C;
    }, I = async () => {
      const D = s.value === 0 ? a.tabTitles.length - 1 : s.value - 1;
      l.value = !1, s.value = D;
    }, _ = async () => {
      const D = s.value === a.tabTitles.length - 1 ? 0 : s.value + 1;
      l.value = !0, s.value = D;
    }, L = async () => {
      s.value = 0;
    }, y = async () => {
      s.value = a.tabTitles.length - 1;
    }, w = Q({ "--tabs-height": "100px" }), T = () => {
      var D;
      if (s.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const C = p.value.offsetHeight, P = (D = d.value) == null ? void 0 : D.querySelectorAll(".fr-tabs__panel")[s.value];
      if (!P || !P.offsetHeight)
        return;
      const x = P.offsetHeight;
      w.value["--tabs-height"] = `${C + x}px`;
    }, S = Q(null);
    return we(() => {
      var D;
      window.ResizeObserver && (S.value = new window.ResizeObserver(() => {
        T();
      })), (D = d.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((C) => {
        var P;
        C && ((P = S.value) == null || P.observe(C));
      });
    }), Ee(() => {
      var D;
      (D = d.value) == null || D.querySelectorAll(".fr-tabs__panel").forEach((C) => {
        var P;
        C && ((P = S.value) == null || P.unobserve(C));
      });
    }), t({
      renderTabs: T,
      selectFirst: L,
      selectLast: y
    }), (D, C) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: Te(w.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": D.tabListName
      }, [
        $(D.$slots, "tab-items", {}, () => [
          (i(!0), f(G, null, J(D.tabTitles, (P, x) => (i(), W(Fa, {
            key: x,
            icon: P.icon,
            "panel-id": P.panelId || `${m(x)}-panel`,
            "tab-id": P.tabId || m(x),
            onClick: (N) => s.value = x,
            onNext: C[0] || (C[0] = (N) => _()),
            onPrevious: C[1] || (C[1] = (N) => I()),
            onFirst: C[2] || (C[2] = (N) => L()),
            onLast: C[3] || (C[3] = (N) => y())
          }, {
            default: U(() => [
              V(h(P.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, up),
      (i(!0), f(G, null, J(D.tabContents, (P, x) => {
        var N, E, B, g;
        return i(), W(Ra, {
          key: x,
          "panel-id": ((E = (N = D.tabTitles) == null ? void 0 : N[x]) == null ? void 0 : E.panelId) || `${m(x)}-panel`,
          "tab-id": ((g = (B = D.tabTitles) == null ? void 0 : B[x]) == null ? void 0 : g.tabId) || m(x)
        }, {
          default: U(() => [
            V(h(P), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      $(D.$slots, "default")
    ], 4));
  }
}), cp = /* @__PURE__ */ F({
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
  setup(n) {
    const t = n, e = k(() => typeof t.link == "string" && t.link.startsWith("http")), a = k(() => t.link ? e.value ? "a" : "RouterLink" : t.disabled && t.tagName === "p" || t.selectable ? "button" : t.tagName), r = k(() => ({ [e.value ? "href" : "to"]: t.link })), l = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), s = k(() => t.small ? 0.65 : 0.9), o = k(
      () => typeof t.icon == "string" ? { scale: s.value, name: t.icon } : { scale: s.value, ...t.icon }
    );
    return (u, d) => (i(), W(ve(a.value), Y({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: l.value,
        "fr-tag--icon-left": l.value
      }],
      disabled: u.disabled,
      "aria-pressed": u.selectable ? u.selected : void 0
    }, { ...r.value, ...u.$attrs }, {
      onClick: d[0] || (d[0] = (p) => !u.disabled && u.$emit("select", [u.value, u.selected]))
    }), {
      default: U(() => [
        t.icon && !l.value ? (i(), W(be, Y({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: { "fr-mr-1v": !u.iconOnly }
        }, o.value), null, 16, ["label", "class"])) : b("", !0),
        u.iconOnly ? b("", !0) : (i(), f(G, { key: 1 }, [
          V(h(u.label), 1)
        ], 64)),
        $(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class", "aria-pressed"]));
  }
}), un = /* @__PURE__ */ ke(cp, [["__scopeId", "data-v-0cada598"]]), fp = { class: "fr-tags-group" }, pp = /* @__PURE__ */ F({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] },
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(n, { emit: t }) {
    const e = n, a = t;
    function r([l, s]) {
      if (typeof e.modelValue > "u")
        return;
      if (s) {
        const u = /* @__PURE__ */ new Set([...e.modelValue]);
        u.delete(l), a("update:modelValue", [...u]);
        return;
      }
      const o = [.../* @__PURE__ */ new Set([...e.modelValue, l])];
      a("update:modelValue", o);
    }
    return (l, s) => (i(), f("ul", fp, [
      (i(!0), f(G, null, J(l.tags, ({ icon: o, label: u, ...d }, p) => {
        var v;
        return i(), f("li", { key: p }, [
          ee(un, Y({ ref_for: !0 }, d, {
            icon: o,
            label: u,
            selectable: d.selectable,
            selected: d.selectable ? (v = l.modelValue) == null ? void 0 : v.includes(d.value) : void 0,
            onSelect: s[0] || (s[0] = (m) => r(m))
          }), null, 16, ["icon", "label", "selectable", "selected"])
        ]);
      }), 128))
    ]));
  }
}), mp = { class: "fr-tile__body" }, hp = { class: "fr-tile__content" }, vp = ["download", "href"], gp = {
  key: 0,
  class: "fr-tile__desc"
}, bp = {
  key: 1,
  class: "fr-tile__detail"
}, yp = {
  key: 2,
  class: "fr-tile__start"
}, kp = { class: "fr-tile__header" }, wp = {
  key: 0,
  class: "fr-tile__pictogram"
}, _p = ["src"], xp = ["href"], Dp = ["href"], Tp = ["href"], Ip = /* @__PURE__ */ F({
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
  setup(n) {
    const t = n, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, a = k(() => typeof t.to == "string" && t.to.startsWith("http"));
    return (r, l) => {
      const s = xe("RouterLink");
      return i(), f("div", {
        class: R(["fr-tile fr-enlarge-link", [{
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
        c("div", mp, [
          c("div", hp, [
            (i(), W(ve(r.titleTag), { class: "fr-tile__title" }, {
              default: U(() => [
                a.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, h(r.title), 9, vp)) : b("", !0),
                a.value ? b("", !0) : (i(), W(s, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: U(() => [
                    V(h(r.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            r.description ? (i(), f("p", gp, h(r.description), 1)) : b("", !0),
            r.details ? (i(), f("p", bp, h(r.details), 1)) : b("", !0),
            r.$slots["start-details"] ? (i(), f("div", yp, [
              $(r.$slots, "start-details", {}, void 0, !0)
            ])) : b("", !0)
          ])
        ]),
        c("div", kp, [
          $(r.$slots, "header", {}, void 0, !0),
          r.imgSrc || r.svgPath ? (i(), f("div", wp, [
            r.imgSrc ? (i(), f("img", {
              key: 0,
              src: r.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, _p)) : (i(), f("svg", Y({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...e, ...r.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${r.svgPath}#artwork-decorative`
              }, null, 8, xp),
              c("use", {
                class: "fr-artwork-minor",
                href: `${r.svgPath}#artwork-minor`
              }, null, 8, Dp),
              c("use", {
                class: "fr-artwork-major",
                href: `${r.svgPath}#artwork-major`
              }, null, 8, Tp)
            ], 16))
          ])) : b("", !0)
        ])
      ], 2);
    };
  }
}), Ha = /* @__PURE__ */ ke(Ip, [["__scopeId", "data-v-f4d836a2"]]), Cp = { class: "fr-grid-row fr-grid-row--gutters" }, Ep = /* @__PURE__ */ F({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(n) {
    return (t, e) => (i(), f("div", Cp, [
      (i(!0), f(G, null, J(t.tiles, (a, r) => (i(), f("div", {
        key: r,
        class: R({
          [a.containerClass ?? "no-class"]: a.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !a.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        ee(Ha, Y({
          horizontal: t.horizontal,
          ref_for: !0
        }, a), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Pp = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Mp = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Lp = ["id"], Bp = /* @__PURE__ */ F({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => se("toggle") },
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
  setup(n) {
    const t = n, e = k(() => `${t.inputId}-hint-text`);
    return (a, r) => (i(), f("div", {
      class: R(["fr-toggle", {
        "fr-toggle--label-left": a.labelLeft,
        "fr-toggle--border-bottom": a.borderBottom
      }])
    }, [
      c("input", {
        id: a.inputId,
        disabled: a.disabled,
        "aria-disabled": a.disabled,
        type: "checkbox",
        checked: a.modelValue,
        "data-testid": a.inputId,
        class: "fr-toggle__input",
        "aria-describedby": e.value,
        name: a.name,
        onInput: r[0] || (r[0] = (l) => a.$emit("update:modelValue", l.target.checked))
      }, null, 40, Pp),
      c("label", {
        id: e.value,
        class: "fr-toggle__label",
        for: a.inputId,
        "data-fr-checked-label": a.noText ? void 0 : a.activeText,
        "data-fr-unchecked-label": a.noText ? void 0 : a.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, h(a.label), 9, Mp),
      a.hint ? (i(), f("p", {
        key: 0,
        id: `${a.inputId}-hint-text`,
        class: "fr-hint-text"
      }, h(a.hint), 9, Lp)) : b("", !0)
    ], 2));
  }
}), Sp = ["id"], $p = /* @__PURE__ */ F({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => se("tooltip") }
  },
  setup(n) {
    const t = n, e = Q(!1), a = Q(null), r = Q(null), l = Q("0px"), s = Q("0px"), o = Q("0px"), u = Q(!1), d = Q(0);
    async function p() {
      var T, S, D, C, P, x, N, E;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((Ce) => setTimeout(Ce, 100));
      const B = (T = a.value) == null ? void 0 : T.getBoundingClientRect().top, g = (S = a.value) == null ? void 0 : S.offsetHeight, M = (D = a.value) == null ? void 0 : D.offsetWidth, j = (C = a.value) == null ? void 0 : C.getBoundingClientRect().left, A = (P = r.value) == null ? void 0 : P.offsetHeight, O = (x = r.value) == null ? void 0 : x.offsetWidth, Z = (N = r.value) == null ? void 0 : N.offsetTop, z = (E = r.value) == null ? void 0 : E.offsetLeft, le = !(B - A < 0) && B + g + A >= document.documentElement.offsetHeight;
      u.value = le;
      const ae = j + M >= document.documentElement.offsetWidth, De = j + M / 2 - O / 2 <= 0;
      s.value = le ? `${B - Z - A + 8}px` : `${B - Z + g - 8}px`, d.value = 1, l.value = ae ? `${j - z + M - O - 4}px` : De ? `${j - z + 4}px` : `${j - z + M / 2 - O / 2}px`, o.value = ae ? `${O / 2 - M / 2 + 4}px` : De ? `${-(O / 2) + M / 2 - 4}px` : "0px";
    }
    fe(e, p, { immediate: !0 }), we(() => {
      window.addEventListener("scroll", p);
    }), Ee(() => {
      window.removeEventListener("scroll", p);
    });
    const v = k(() => `transform: translate(${l.value}, ${s.value}); --arrow-x: ${o.value}; opacity: ${d.value};'`), m = k(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), I = (T) => {
      var S, D;
      e.value && (T.target === a.value || (S = a.value) != null && S.contains(T.target) || T.target === r.value || (D = r.value) != null && D.contains(T.target) || (e.value = !1));
    }, _ = (T) => {
      T.key === "Escape" && (e.value = !1);
    }, L = (T) => {
      var S;
      t.onHover && (T.target === a.value || (S = a.value) != null && S.contains(T.target)) && (e.value = !0, globalThis.__vueDsfr__lastTooltipShow.value = !1);
    }, y = () => {
      t.onHover && (e.value = !1);
    }, w = () => {
      t.onHover || (e.value = !0, globalThis.__vueDsfr__lastTooltipShow = e);
    };
    return we(() => {
      document.documentElement.addEventListener("click", I), document.documentElement.addEventListener("keydown", _), document.documentElement.addEventListener("mouseover", L);
    }), Ee(() => {
      document.documentElement.removeEventListener("click", I), document.documentElement.removeEventListener("keydown", _), document.documentElement.removeEventListener("mouseover", L);
    }), (T, S) => (i(), f(G, null, [
      (i(), W(ve(T.onHover ? "a" : "button"), Y(T.$attrs, {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: a,
        class: T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: S[0] || (S[0] = (D) => w()),
        onMouseleave: S[1] || (S[1] = (D) => y()),
        onFocus: S[2] || (S[2] = (D) => L(D)),
        onBlur: S[3] || (S[3] = (D) => y())
      }), {
        default: U(() => [
          $(T.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: T.id,
        ref_key: "tooltip",
        ref: r,
        class: R(["fr-tooltip fr-placement", m.value]),
        style: Te(v.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, h(T.content), 15, Sp)
    ], 64));
  }
}), Ap = /* @__PURE__ */ ke($p, [["__scopeId", "data-v-ed1e8874"]]), Op = { class: "fr-transcription" }, Rp = ["aria-expanded", "aria-controls"], Fp = ["id"], Vp = ["id", "aria-labelledby"], Np = { class: "fr-container fr-container--fluid fr-container-md" }, qp = { class: "fr-grid-row fr-grid-row--center" }, jp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Hp = { class: "fr-modal__body" }, Wp = { class: "fr-modal__header" }, Kp = ["aria-controls"], Qp = { class: "fr-modal__content" }, Yp = ["id"], zp = { class: "fr-transcription__footer" }, Gp = { class: "fr-transcription__actions-group" }, Xp = ["aria-controls"], Wa = /* @__PURE__ */ F({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => se("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(n) {
    const t = n, {
      collapse: e,
      collapsing: a,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se(), o = Q(!1), u = Q(!1), d = k(() => `fr-transcription__modal-${t.id}`), p = k(() => `fr-transcription__collapse-${t.id}`);
    return fe(u, (v, m) => {
      v !== m && l(v);
    }), (v, m) => (i(), f("div", Op, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: m[0] || (m[0] = (I) => u.value = !u.value)
      }, " Transcription ", 8, Rp),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse", { "fr-collapse--expanded": H(r), "fr-collapsing": H(a) }]),
        onTransitionend: m[2] || (m[2] = (I) => H(s)(u.value))
      }, [
        c("dialog", {
          id: d.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${d.value}-title`
        }, [
          c("div", Np, [
            c("div", qp, [
              c("div", jp, [
                c("div", Hp, [
                  c("div", Wp, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": d.value,
                      title: "Fermer"
                    }, " Fermer ", 8, Kp)
                  ]),
                  c("div", Qp, [
                    c("h1", {
                      id: `${d.value}-title`,
                      class: "fr-modal__title"
                    }, h(v.title), 9, Yp),
                    V(" " + h(v.content), 1)
                  ]),
                  c("div", zp, [
                    c("div", Gp, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: m[1] || (m[1] = (I) => o.value = !0)
                      }, " Agrandir ", 8, Xp)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, Vp)
      ], 42, Fp),
      (i(), W(mr, { to: "body" }, [
        ee(Ia, {
          title: v.title,
          opened: o.value,
          onClose: m[3] || (m[3] = (I) => o.value = !1)
        }, {
          default: U(() => [
            $(v.$slots, "default", {}, () => [
              V(h(v.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Up = ["src"], Zp = { class: "fr-content-media__caption" }, Jp = /* @__PURE__ */ F({
  __name: "DsfrVideo",
  props: {
    src: {},
    legend: { default: "" },
    size: { default: "medium" },
    transcriptionTitle: { default: "" },
    transcriptionContent: { default: "" },
    ratio: { default: "16x9" }
  },
  setup(n) {
    return (t, e) => (i(), f(G, null, [
      c("figure", {
        class: R(["fr-content-media", {
          "fr-content-media--sm": t.size === "small",
          "fr-content-media--lg": t.size === "large"
        }])
      }, [
        c("div", {
          class: R(["fr-responsive-vid", `fr-ratio-${t.ratio}`])
        }, [
          c("iframe", {
            src: t.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Up)
        ], 2),
        c("div", Zp, h(t.legend), 1)
      ], 2),
      ee(Wa, {
        title: t.transcriptionTitle,
        content: t.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), em = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: Cl,
  DsfrAccordionsGroup: Pl,
  DsfrAlert: Bl,
  DsfrBackToTop: Sl,
  DsfrBadge: pa,
  DsfrBreadcrumb: Nl,
  DsfrButton: je,
  DsfrButtonGroup: It,
  DsfrCallout: zl,
  DsfrCard: is,
  DsfrCardDetail: qt,
  DsfrCheckbox: Ct,
  DsfrCheckboxSet: ks,
  DsfrConsent: Ds,
  DsfrDataTable: so,
  DsfrErrorPage: ho,
  DsfrFieldset: ma,
  DsfrFileDownload: ha,
  DsfrFileDownloadList: Do,
  DsfrFileUpload: Lo,
  DsfrFollow: Zo,
  DsfrFooter: Ei,
  DsfrFooterLink: ba,
  DsfrFooterLinkList: Bi,
  DsfrFooterPartners: ya,
  DsfrFranceConnect: Ai,
  DsfrHeader: wu,
  DsfrHeaderMenuLink: on,
  DsfrHeaderMenuLinks: jt,
  DsfrHighlight: _u,
  DsfrInput: Et,
  DsfrInputGroup: Eu,
  DsfrLanguageSelector: rt,
  DsfrLogo: at,
  DsfrModal: Ia,
  DsfrMultiselect: Md,
  DsfrNavigation: Zd,
  DsfrNavigationItem: Ca,
  DsfrNavigationMegaMenu: Pa,
  DsfrNavigationMegaMenuCategory: Ea,
  DsfrNavigationMenu: La,
  DsfrNavigationMenuItem: Ma,
  DsfrNavigationMenuLink: Pt,
  DsfrNewsLetter: va,
  DsfrNotice: ac,
  DsfrPagination: sn,
  DsfrPicture: ic,
  DsfrQuote: vc,
  DsfrRadioButton: Ba,
  DsfrRadioButtonSet: Sc,
  DsfrRange: Wc,
  DsfrSearchBar: lt,
  DsfrSegmented: Sa,
  DsfrSegmentedSet: ef,
  DsfrSelect: uf,
  DsfrShare: gf,
  DsfrSideMenu: Tf,
  DsfrSideMenuButton: $a,
  DsfrSideMenuLink: If,
  DsfrSideMenuList: Oa,
  DsfrSideMenuListItem: Aa,
  DsfrSkipLinks: Lf,
  DsfrSocialNetworks: ga,
  DsfrStepper: Ff,
  DsfrSummary: Hf,
  DsfrTabContent: Ra,
  DsfrTabItem: Fa,
  DsfrTable: ip,
  DsfrTableCell: qa,
  DsfrTableHeader: Va,
  DsfrTableHeaders: Na,
  DsfrTableRow: ja,
  DsfrTabs: dp,
  DsfrTag: un,
  DsfrTags: pp,
  DsfrTile: Ha,
  DsfrTiles: Ep,
  DsfrToggleSwitch: Bp,
  DsfrTooltip: Ap,
  DsfrTranscription: Wa,
  DsfrVideo: Jp,
  VIcon: be,
  registerAccordionKey: rn,
  registerNavigationLinkKey: ln,
  registerTabKey: Tt
}, Symbol.toStringTag, { value: "Module" })), tm = {
  install: (n, { components: t } = {}) => {
    Object.entries(em).forEach(([e, a]) => {
      (t === void 0 || t === "all" || t.map(({ name: r }) => r).includes(e)) && n.component(e, a);
    }), n.component("VIcon", be);
  }
}, Ka = 6048e5, nm = 864e5, am = 6e4, rm = 36e5, lm = 1e3, jn = Symbol.for("constructDateFrom");
function ye(n, t) {
  return typeof n == "function" ? n(t) : n && typeof n == "object" && jn in n ? n[jn](t) : n instanceof Date ? new n.constructor(t) : new Date(t);
}
function ge(n, t) {
  return ye(t || n, n);
}
function Qa(n, t, e) {
  const a = ge(n, e == null ? void 0 : e.in);
  return isNaN(t) ? ye((e == null ? void 0 : e.in) || n, NaN) : (t && a.setDate(a.getDate() + t), a);
}
let sm = {};
function ze() {
  return sm;
}
function Fe(n, t) {
  var o, u, d, p;
  const e = ze(), a = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = ge(n, t == null ? void 0 : t.in), l = r.getDay(), s = (l < a ? 7 : 0) + l - a;
  return r.setDate(r.getDate() - s), r.setHours(0, 0, 0, 0), r;
}
function Ye(n, t) {
  return Fe(n, { ...t, weekStartsOn: 1 });
}
function Ya(n, t) {
  const e = ge(n, t == null ? void 0 : t.in), a = e.getFullYear(), r = ye(e, 0);
  r.setFullYear(a + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Ye(r), s = ye(e, 0);
  s.setFullYear(a, 0, 4), s.setHours(0, 0, 0, 0);
  const o = Ye(s);
  return e.getTime() >= l.getTime() ? a + 1 : e.getTime() >= o.getTime() ? a : a - 1;
}
function bt(n) {
  const t = ge(n), e = new Date(
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
  return e.setUTCFullYear(t.getFullYear()), +n - +e;
}
function om(n, ...t) {
  const e = ye.bind(
    null,
    t.find((a) => typeof a == "object")
  );
  return t.map(e);
}
function Hn(n, t) {
  const e = ge(n, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function im(n, t, e) {
  const [a, r] = om(
    e == null ? void 0 : e.in,
    n,
    t
  ), l = Hn(a), s = Hn(r), o = +l - bt(l), u = +s - bt(s);
  return Math.round((o - u) / nm);
}
function um(n, t) {
  const e = Ya(n, t), a = ye(n, 0);
  return a.setFullYear(e, 0, 4), a.setHours(0, 0, 0, 0), Ye(a);
}
function dm(n) {
  return n instanceof Date || typeof n == "object" && Object.prototype.toString.call(n) === "[object Date]";
}
function cm(n) {
  return !(!dm(n) && typeof n != "number" || isNaN(+ge(n)));
}
function fm(n, t) {
  const e = ge(n, t == null ? void 0 : t.in);
  return e.setFullYear(e.getFullYear(), 0, 1), e.setHours(0, 0, 0, 0), e;
}
const pm = {
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
}, mm = (n, t, e) => {
  let a;
  const r = pm[n];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), e != null && e.addSuffix ? e.comparison && e.comparison > 0 ? "in " + a : a + " ago" : a;
};
function St(n) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : n.defaultWidth;
    return n.formats[e] || n.formats[n.defaultWidth];
  };
}
const hm = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, vm = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, gm = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, bm = {
  date: St({
    formats: hm,
    defaultWidth: "full"
  }),
  time: St({
    formats: vm,
    defaultWidth: "full"
  }),
  dateTime: St({
    formats: gm,
    defaultWidth: "full"
  })
}, ym = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, km = (n, t, e, a) => ym[n];
function Ze(n) {
  return (t, e) => {
    const a = e != null && e.context ? String(e.context) : "standalone";
    let r;
    if (a === "formatting" && n.formattingValues) {
      const s = n.defaultFormattingWidth || n.defaultWidth, o = e != null && e.width ? String(e.width) : s;
      r = n.formattingValues[o] || n.formattingValues[s];
    } else {
      const s = n.defaultWidth, o = e != null && e.width ? String(e.width) : n.defaultWidth;
      r = n.values[o] || n.values[s];
    }
    const l = n.argumentCallback ? n.argumentCallback(t) : t;
    return r[l];
  };
}
const wm = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, _m = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, xm = {
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
}, Dm = {
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
}, Tm = {
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
}, Im = {
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
}, Cm = (n, t) => {
  const e = Number(n), a = e % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return e + "st";
      case 2:
        return e + "nd";
      case 3:
        return e + "rd";
    }
  return e + "th";
}, Em = {
  ordinalNumber: Cm,
  era: Ze({
    values: wm,
    defaultWidth: "wide"
  }),
  quarter: Ze({
    values: _m,
    defaultWidth: "wide",
    argumentCallback: (n) => n - 1
  }),
  month: Ze({
    values: xm,
    defaultWidth: "wide"
  }),
  day: Ze({
    values: Dm,
    defaultWidth: "wide"
  }),
  dayPeriod: Ze({
    values: Tm,
    defaultWidth: "wide",
    formattingValues: Im,
    defaultFormattingWidth: "wide"
  })
};
function Je(n) {
  return (t, e = {}) => {
    const a = e.width, r = a && n.matchPatterns[a] || n.matchPatterns[n.defaultMatchWidth], l = t.match(r);
    if (!l)
      return null;
    const s = l[0], o = a && n.parsePatterns[a] || n.parsePatterns[n.defaultParseWidth], u = Array.isArray(o) ? Mm(o, (v) => v.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Pm(o, (v) => v.test(s))
    );
    let d;
    d = n.valueCallback ? n.valueCallback(u) : u, d = e.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      e.valueCallback(d)
    ) : d;
    const p = t.slice(s.length);
    return { value: d, rest: p };
  };
}
function Pm(n, t) {
  for (const e in n)
    if (Object.prototype.hasOwnProperty.call(n, e) && t(n[e]))
      return e;
}
function Mm(n, t) {
  for (let e = 0; e < n.length; e++)
    if (t(n[e]))
      return e;
}
function Lm(n) {
  return (t, e = {}) => {
    const a = t.match(n.matchPattern);
    if (!a) return null;
    const r = a[0], l = t.match(n.parsePattern);
    if (!l) return null;
    let s = n.valueCallback ? n.valueCallback(l[0]) : l[0];
    s = e.valueCallback ? e.valueCallback(s) : s;
    const o = t.slice(r.length);
    return { value: s, rest: o };
  };
}
const Bm = /^(\d+)(th|st|nd|rd)?/i, Sm = /\d+/i, $m = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Am = {
  any: [/^b/i, /^(a|c)/i]
}, Om = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Rm = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Fm = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Vm = {
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
}, Nm = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, qm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, jm = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Hm = {
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
}, Wm = {
  ordinalNumber: Lm({
    matchPattern: Bm,
    parsePattern: Sm,
    valueCallback: (n) => parseInt(n, 10)
  }),
  era: Je({
    matchPatterns: $m,
    defaultMatchWidth: "wide",
    parsePatterns: Am,
    defaultParseWidth: "any"
  }),
  quarter: Je({
    matchPatterns: Om,
    defaultMatchWidth: "wide",
    parsePatterns: Rm,
    defaultParseWidth: "any",
    valueCallback: (n) => n + 1
  }),
  month: Je({
    matchPatterns: Fm,
    defaultMatchWidth: "wide",
    parsePatterns: Vm,
    defaultParseWidth: "any"
  }),
  day: Je({
    matchPatterns: Nm,
    defaultMatchWidth: "wide",
    parsePatterns: qm,
    defaultParseWidth: "any"
  }),
  dayPeriod: Je({
    matchPatterns: jm,
    defaultMatchWidth: "any",
    parsePatterns: Hm,
    defaultParseWidth: "any"
  })
}, za = {
  code: "en-US",
  formatDistance: mm,
  formatLong: bm,
  formatRelative: km,
  localize: Em,
  match: Wm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Km(n, t) {
  const e = ge(n, t == null ? void 0 : t.in);
  return im(e, fm(e)) + 1;
}
function Ga(n, t) {
  const e = ge(n, t == null ? void 0 : t.in), a = +Ye(e) - +um(e);
  return Math.round(a / Ka) + 1;
}
function dn(n, t) {
  var p, v, m, I;
  const e = ge(n, t == null ? void 0 : t.in), a = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((v = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : v.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((I = (m = r.locale) == null ? void 0 : m.options) == null ? void 0 : I.firstWeekContainsDate) ?? 1, s = ye((t == null ? void 0 : t.in) || n, 0);
  s.setFullYear(a + 1, 0, l), s.setHours(0, 0, 0, 0);
  const o = Fe(s, t), u = ye((t == null ? void 0 : t.in) || n, 0);
  u.setFullYear(a, 0, l), u.setHours(0, 0, 0, 0);
  const d = Fe(u, t);
  return +e >= +o ? a + 1 : +e >= +d ? a : a - 1;
}
function Qm(n, t) {
  var o, u, d, p;
  const e = ze(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = dn(n, t), l = ye((t == null ? void 0 : t.in) || n, 0);
  return l.setFullYear(r, 0, a), l.setHours(0, 0, 0, 0), Fe(l, t);
}
function Xa(n, t) {
  const e = ge(n, t == null ? void 0 : t.in), a = +Fe(e, t) - +Qm(e, t);
  return Math.round(a / Ka) + 1;
}
function ie(n, t) {
  const e = n < 0 ? "-" : "", a = Math.abs(n).toString().padStart(t, "0");
  return e + a;
}
const Oe = {
  // Year
  y(n, t) {
    const e = n.getFullYear(), a = e > 0 ? e : 1 - e;
    return ie(t === "yy" ? a % 100 : a, t.length);
  },
  // Month
  M(n, t) {
    const e = n.getMonth();
    return t === "M" ? String(e + 1) : ie(e + 1, 2);
  },
  // Day of the month
  d(n, t) {
    return ie(n.getDate(), t.length);
  },
  // AM or PM
  a(n, t) {
    const e = n.getHours() / 12 >= 1 ? "pm" : "am";
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
  h(n, t) {
    return ie(n.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(n, t) {
    return ie(n.getHours(), t.length);
  },
  // Minute
  m(n, t) {
    return ie(n.getMinutes(), t.length);
  },
  // Second
  s(n, t) {
    return ie(n.getSeconds(), t.length);
  },
  // Fraction of second
  S(n, t) {
    const e = t.length, a = n.getMilliseconds(), r = Math.trunc(
      a * Math.pow(10, e - 3)
    );
    return ie(r, t.length);
  }
}, Ke = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Wn = {
  // Era
  G: function(n, t, e) {
    const a = n.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return e.era(a, { width: "abbreviated" });
      case "GGGGG":
        return e.era(a, { width: "narrow" });
      case "GGGG":
      default:
        return e.era(a, { width: "wide" });
    }
  },
  // Year
  y: function(n, t, e) {
    if (t === "yo") {
      const a = n.getFullYear(), r = a > 0 ? a : 1 - a;
      return e.ordinalNumber(r, { unit: "year" });
    }
    return Oe.y(n, t);
  },
  // Local week-numbering year
  Y: function(n, t, e, a) {
    const r = dn(n, a), l = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const s = l % 100;
      return ie(s, 2);
    }
    return t === "Yo" ? e.ordinalNumber(l, { unit: "year" }) : ie(l, t.length);
  },
  // ISO week-numbering year
  R: function(n, t) {
    const e = Ya(n);
    return ie(e, t.length);
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
  u: function(n, t) {
    const e = n.getFullYear();
    return ie(e, t.length);
  },
  // Quarter
  Q: function(n, t, e) {
    const a = Math.ceil((n.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(a);
      case "QQ":
        return ie(a, 2);
      case "Qo":
        return e.ordinalNumber(a, { unit: "quarter" });
      case "QQQ":
        return e.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return e.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return e.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(n, t, e) {
    const a = Math.ceil((n.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(a);
      case "qq":
        return ie(a, 2);
      case "qo":
        return e.ordinalNumber(a, { unit: "quarter" });
      case "qqq":
        return e.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return e.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return e.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(n, t, e) {
    const a = n.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Oe.M(n, t);
      case "Mo":
        return e.ordinalNumber(a + 1, { unit: "month" });
      case "MMM":
        return e.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return e.month(a, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return e.month(a, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(n, t, e) {
    const a = n.getMonth();
    switch (t) {
      case "L":
        return String(a + 1);
      case "LL":
        return ie(a + 1, 2);
      case "Lo":
        return e.ordinalNumber(a + 1, { unit: "month" });
      case "LLL":
        return e.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return e.month(a, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return e.month(a, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(n, t, e, a) {
    const r = Xa(n, a);
    return t === "wo" ? e.ordinalNumber(r, { unit: "week" }) : ie(r, t.length);
  },
  // ISO week of year
  I: function(n, t, e) {
    const a = Ga(n);
    return t === "Io" ? e.ordinalNumber(a, { unit: "week" }) : ie(a, t.length);
  },
  // Day of the month
  d: function(n, t, e) {
    return t === "do" ? e.ordinalNumber(n.getDate(), { unit: "date" }) : Oe.d(n, t);
  },
  // Day of year
  D: function(n, t, e) {
    const a = Km(n);
    return t === "Do" ? e.ordinalNumber(a, { unit: "dayOfYear" }) : ie(a, t.length);
  },
  // Day of week
  E: function(n, t, e) {
    const a = n.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return e.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return e.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return e.day(a, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return e.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(n, t, e, a) {
    const r = n.getDay(), l = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(l);
      case "ee":
        return ie(l, 2);
      case "eo":
        return e.ordinalNumber(l, { unit: "day" });
      case "eee":
        return e.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return e.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return e.day(r, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return e.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(n, t, e, a) {
    const r = n.getDay(), l = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(l);
      case "cc":
        return ie(l, t.length);
      case "co":
        return e.ordinalNumber(l, { unit: "day" });
      case "ccc":
        return e.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return e.day(r, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return e.day(r, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return e.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(n, t, e) {
    const a = n.getDay(), r = a === 0 ? 7 : a;
    switch (t) {
      case "i":
        return String(r);
      case "ii":
        return ie(r, t.length);
      case "io":
        return e.ordinalNumber(r, { unit: "day" });
      case "iii":
        return e.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return e.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return e.day(a, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return e.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(n, t, e) {
    const r = n.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return e.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return e.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(n, t, e) {
    const a = n.getHours();
    let r;
    switch (a === 12 ? r = Ke.noon : a === 0 ? r = Ke.midnight : r = a / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return e.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return e.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(n, t, e) {
    const a = n.getHours();
    let r;
    switch (a >= 17 ? r = Ke.evening : a >= 12 ? r = Ke.afternoon : a >= 4 ? r = Ke.morning : r = Ke.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return e.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return e.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return e.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(n, t, e) {
    if (t === "ho") {
      let a = n.getHours() % 12;
      return a === 0 && (a = 12), e.ordinalNumber(a, { unit: "hour" });
    }
    return Oe.h(n, t);
  },
  // Hour [0-23]
  H: function(n, t, e) {
    return t === "Ho" ? e.ordinalNumber(n.getHours(), { unit: "hour" }) : Oe.H(n, t);
  },
  // Hour [0-11]
  K: function(n, t, e) {
    const a = n.getHours() % 12;
    return t === "Ko" ? e.ordinalNumber(a, { unit: "hour" }) : ie(a, t.length);
  },
  // Hour [1-24]
  k: function(n, t, e) {
    let a = n.getHours();
    return a === 0 && (a = 24), t === "ko" ? e.ordinalNumber(a, { unit: "hour" }) : ie(a, t.length);
  },
  // Minute
  m: function(n, t, e) {
    return t === "mo" ? e.ordinalNumber(n.getMinutes(), { unit: "minute" }) : Oe.m(n, t);
  },
  // Second
  s: function(n, t, e) {
    return t === "so" ? e.ordinalNumber(n.getSeconds(), { unit: "second" }) : Oe.s(n, t);
  },
  // Fraction of second
  S: function(n, t) {
    return Oe.S(n, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(n, t, e) {
    const a = n.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (t) {
      case "X":
        return Qn(a);
      case "XXXX":
      case "XX":
        return Ve(a);
      case "XXXXX":
      case "XXX":
      default:
        return Ve(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(n, t, e) {
    const a = n.getTimezoneOffset();
    switch (t) {
      case "x":
        return Qn(a);
      case "xxxx":
      case "xx":
        return Ve(a);
      case "xxxxx":
      case "xxx":
      default:
        return Ve(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(n, t, e) {
    const a = n.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Kn(a, ":");
      case "OOOO":
      default:
        return "GMT" + Ve(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(n, t, e) {
    const a = n.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Kn(a, ":");
      case "zzzz":
      default:
        return "GMT" + Ve(a, ":");
    }
  },
  // Seconds timestamp
  t: function(n, t, e) {
    const a = Math.trunc(+n / 1e3);
    return ie(a, t.length);
  },
  // Milliseconds timestamp
  T: function(n, t, e) {
    return ie(+n, t.length);
  }
};
function Kn(n, t = "") {
  const e = n > 0 ? "-" : "+", a = Math.abs(n), r = Math.trunc(a / 60), l = a % 60;
  return l === 0 ? e + String(r) : e + String(r) + t + ie(l, 2);
}
function Qn(n, t) {
  return n % 60 === 0 ? (n > 0 ? "-" : "+") + ie(Math.abs(n) / 60, 2) : Ve(n, t);
}
function Ve(n, t = "") {
  const e = n > 0 ? "-" : "+", a = Math.abs(n), r = ie(Math.trunc(a / 60), 2), l = ie(a % 60, 2);
  return e + r + t + l;
}
const Yn = (n, t) => {
  switch (n) {
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
}, Ua = (n, t) => {
  switch (n) {
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
}, Ym = (n, t) => {
  const e = n.match(/(P+)(p+)?/) || [], a = e[1], r = e[2];
  if (!r)
    return Yn(n, t);
  let l;
  switch (a) {
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
  return l.replace("{{date}}", Yn(a, t)).replace("{{time}}", Ua(r, t));
}, Kt = {
  p: Ua,
  P: Ym
}, zm = /^D+$/, Gm = /^Y+$/, Xm = ["D", "DD", "YY", "YYYY"];
function Za(n) {
  return zm.test(n);
}
function Ja(n) {
  return Gm.test(n);
}
function Qt(n, t, e) {
  const a = Um(n, t, e);
  if (console.warn(a), Xm.includes(n)) throw new RangeError(a);
}
function Um(n, t, e) {
  const a = n[0] === "Y" ? "years" : "days of the month";
  return `Use \`${n.toLowerCase()}\` instead of \`${n}\` (in \`${t}\`) for formatting ${a} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Zm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Jm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, eh = /^'([^]*?)'?$/, th = /''/g, nh = /[a-zA-Z]/;
function zn(n, t, e) {
  var p, v, m, I;
  const a = ze(), r = a.locale ?? za, l = a.firstWeekContainsDate ?? ((v = (p = a.locale) == null ? void 0 : p.options) == null ? void 0 : v.firstWeekContainsDate) ?? 1, s = a.weekStartsOn ?? ((I = (m = a.locale) == null ? void 0 : m.options) == null ? void 0 : I.weekStartsOn) ?? 0, o = ge(n, e == null ? void 0 : e.in);
  if (!cm(o))
    throw new RangeError("Invalid time value");
  let u = t.match(Jm).map((_) => {
    const L = _[0];
    if (L === "p" || L === "P") {
      const y = Kt[L];
      return y(_, r.formatLong);
    }
    return _;
  }).join("").match(Zm).map((_) => {
    if (_ === "''")
      return { isToken: !1, value: "'" };
    const L = _[0];
    if (L === "'")
      return { isToken: !1, value: ah(_) };
    if (Wn[L])
      return { isToken: !0, value: _ };
    if (L.match(nh))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + L + "`"
      );
    return { isToken: !1, value: _ };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(o, u));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: s,
    locale: r
  };
  return u.map((_) => {
    if (!_.isToken) return _.value;
    const L = _.value;
    (Ja(L) || Za(L)) && Qt(L, t, String(n));
    const y = Wn[L[0]];
    return y(o, L, r.localize, d);
  }).join("");
}
function ah(n) {
  const t = n.match(eh);
  return t ? t[1].replace(th, "'") : n;
}
function rh() {
  return Object.assign({}, ze());
}
function lh(n, t) {
  const e = ge(n, t == null ? void 0 : t.in).getDay();
  return e === 0 ? 7 : e;
}
function sh(n, t) {
  const e = oh(t) ? new t(0) : ye(t, 0);
  return e.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), e.setHours(
    n.getHours(),
    n.getMinutes(),
    n.getSeconds(),
    n.getMilliseconds()
  ), e;
}
function oh(n) {
  var t;
  return typeof n == "function" && ((t = n.prototype) == null ? void 0 : t.constructor) === n;
}
const ih = 10;
class er {
  constructor() {
    q(this, "subPriority", 0);
  }
  validate(t, e) {
    return !0;
  }
}
class uh extends er {
  constructor(t, e, a, r, l) {
    super(), this.value = t, this.validateValue = e, this.setValue = a, this.priority = r, l && (this.subPriority = l);
  }
  validate(t, e) {
    return this.validateValue(t, this.value, e);
  }
  set(t, e, a) {
    return this.setValue(t, e, this.value, a);
  }
}
class dh extends er {
  constructor(e, a) {
    super();
    q(this, "priority", ih);
    q(this, "subPriority", -1);
    this.context = e || ((r) => ye(a, r));
  }
  set(e, a) {
    return a.timestampIsSet ? e : ye(e, sh(e, this.context));
  }
}
class oe {
  run(t, e, a, r) {
    const l = this.parse(t, e, a, r);
    return l ? {
      setter: new uh(
        l.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: l.rest
    } : null;
  }
  validate(t, e, a) {
    return !0;
  }
}
class ch extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 140);
    q(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "G":
      case "GG":
      case "GGG":
        return r.era(e, { width: "abbreviated" }) || r.era(e, { width: "narrow" });
      case "GGGGG":
        return r.era(e, { width: "narrow" });
      case "GGGG":
      default:
        return r.era(e, { width: "wide" }) || r.era(e, { width: "abbreviated" }) || r.era(e, { width: "narrow" });
    }
  }
  set(e, a, r) {
    return a.era = r, e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
const me = {
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
function he(n, t) {
  return n && {
    value: t(n.value),
    rest: n.rest
  };
}
function de(n, t) {
  const e = t.match(n);
  return e ? {
    value: parseInt(e[0], 10),
    rest: t.slice(e[0].length)
  } : null;
}
function Me(n, t) {
  const e = t.match(n);
  if (!e)
    return null;
  if (e[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  const a = e[1] === "+" ? 1 : -1, r = e[2] ? parseInt(e[2], 10) : 0, l = e[3] ? parseInt(e[3], 10) : 0, s = e[5] ? parseInt(e[5], 10) : 0;
  return {
    value: a * (r * rm + l * am + s * lm),
    rest: t.slice(e[0].length)
  };
}
function tr(n) {
  return de(me.anyDigitsSigned, n);
}
function pe(n, t) {
  switch (n) {
    case 1:
      return de(me.singleDigit, t);
    case 2:
      return de(me.twoDigits, t);
    case 3:
      return de(me.threeDigits, t);
    case 4:
      return de(me.fourDigits, t);
    default:
      return de(new RegExp("^\\d{1," + n + "}"), t);
  }
}
function yt(n, t) {
  switch (n) {
    case 1:
      return de(me.singleDigitSigned, t);
    case 2:
      return de(me.twoDigitsSigned, t);
    case 3:
      return de(me.threeDigitsSigned, t);
    case 4:
      return de(me.fourDigitsSigned, t);
    default:
      return de(new RegExp("^-?\\d{1," + n + "}"), t);
  }
}
function cn(n) {
  switch (n) {
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
function nr(n, t) {
  const e = t > 0, a = e ? t : 1 - t;
  let r;
  if (a <= 50)
    r = n || 100;
  else {
    const l = a + 50, s = Math.trunc(l / 100) * 100, o = n >= l % 100;
    r = n + s - (o ? 100 : 0);
  }
  return e ? r : 1 - r;
}
function ar(n) {
  return n % 400 === 0 || n % 4 === 0 && n % 100 !== 0;
}
class fh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 130);
    q(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, r) {
    const l = (s) => ({
      year: s,
      isTwoDigitYear: a === "yy"
    });
    switch (a) {
      case "y":
        return he(pe(4, e), l);
      case "yo":
        return he(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return he(pe(a.length, e), l);
    }
  }
  validate(e, a) {
    return a.isTwoDigitYear || a.year > 0;
  }
  set(e, a, r) {
    const l = e.getFullYear();
    if (r.isTwoDigitYear) {
      const o = nr(
        r.year,
        l
      );
      return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const s = !("era" in a) || a.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class ph extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 130);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    const l = (s) => ({
      year: s,
      isTwoDigitYear: a === "YY"
    });
    switch (a) {
      case "Y":
        return he(pe(4, e), l);
      case "Yo":
        return he(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return he(pe(a.length, e), l);
    }
  }
  validate(e, a) {
    return a.isTwoDigitYear || a.year > 0;
  }
  set(e, a, r, l) {
    const s = dn(e, l);
    if (r.isTwoDigitYear) {
      const u = nr(
        r.year,
        s
      );
      return e.setFullYear(
        u,
        0,
        l.firstWeekContainsDate
      ), e.setHours(0, 0, 0, 0), Fe(e, l);
    }
    const o = !("era" in a) || a.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(o, 0, l.firstWeekContainsDate), e.setHours(0, 0, 0, 0), Fe(e, l);
  }
}
class mh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 130);
    q(this, "incompatibleTokens", [
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
  parse(e, a) {
    return yt(a === "R" ? 4 : a.length, e);
  }
  set(e, a, r) {
    const l = ye(e, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), Ye(l);
  }
}
class hh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 130);
    q(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, a) {
    return yt(a === "u" ? 4 : a.length, e);
  }
  set(e, a, r) {
    return e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class vh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 120);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    switch (a) {
      case "Q":
      case "QQ":
        return pe(a.length, e);
      case "Qo":
        return r.ordinalNumber(e, { unit: "quarter" });
      case "QQQ":
        return r.quarter(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQQ":
        return r.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return r.quarter(e, {
          width: "wide",
          context: "formatting"
        }) || r.quarter(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.quarter(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 4;
  }
  set(e, a, r) {
    return e.setMonth((r - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class gh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 120);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    switch (a) {
      case "q":
      case "qq":
        return pe(a.length, e);
      case "qo":
        return r.ordinalNumber(e, { unit: "quarter" });
      case "qqq":
        return r.quarter(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqqq":
        return r.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return r.quarter(e, {
          width: "wide",
          context: "standalone"
        }) || r.quarter(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.quarter(e, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 4;
  }
  set(e, a, r) {
    return e.setMonth((r - 1) * 3, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class bh extends oe {
  constructor() {
    super(...arguments);
    q(this, "incompatibleTokens", [
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
    q(this, "priority", 110);
  }
  parse(e, a, r) {
    const l = (s) => s - 1;
    switch (a) {
      case "M":
        return he(
          de(me.month, e),
          l
        );
      case "MM":
        return he(pe(2, e), l);
      case "Mo":
        return he(
          r.ordinalNumber(e, {
            unit: "month"
          }),
          l
        );
      case "MMM":
        return r.month(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.month(e, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return r.month(e, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return r.month(e, { width: "wide", context: "formatting" }) || r.month(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.month(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 11;
  }
  set(e, a, r) {
    return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class yh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 110);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    const l = (s) => s - 1;
    switch (a) {
      case "L":
        return he(
          de(me.month, e),
          l
        );
      case "LL":
        return he(pe(2, e), l);
      case "Lo":
        return he(
          r.ordinalNumber(e, {
            unit: "month"
          }),
          l
        );
      case "LLL":
        return r.month(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.month(e, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return r.month(e, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return r.month(e, { width: "wide", context: "standalone" }) || r.month(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.month(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 11;
  }
  set(e, a, r) {
    return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
  }
}
function kh(n, t, e) {
  const a = ge(n, e == null ? void 0 : e.in), r = Xa(a, e) - t;
  return a.setDate(a.getDate() - r * 7), ge(a, e == null ? void 0 : e.in);
}
class wh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 100);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    switch (a) {
      case "w":
        return de(me.week, e);
      case "wo":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 53;
  }
  set(e, a, r, l) {
    return Fe(kh(e, r, l), l);
  }
}
function _h(n, t, e) {
  const a = ge(n, e == null ? void 0 : e.in), r = Ga(a, e) - t;
  return a.setDate(a.getDate() - r * 7), a;
}
class xh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 100);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    switch (a) {
      case "I":
        return de(me.week, e);
      case "Io":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 53;
  }
  set(e, a, r) {
    return Ye(_h(e, r));
  }
}
const Dh = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], Th = [
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
class Ih extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 90);
    q(this, "subPriority", 1);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    switch (a) {
      case "d":
        return de(me.date, e);
      case "do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    const r = e.getFullYear(), l = ar(r), s = e.getMonth();
    return l ? a >= 1 && a <= Th[s] : a >= 1 && a <= Dh[s];
  }
  set(e, a, r) {
    return e.setDate(r), e.setHours(0, 0, 0, 0), e;
  }
}
class Ch extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 90);
    q(this, "subpriority", 1);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    switch (a) {
      case "D":
      case "DD":
        return de(me.dayOfYear, e);
      case "Do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    const r = e.getFullYear();
    return ar(r) ? a >= 1 && a <= 366 : a >= 1 && a <= 365;
  }
  set(e, a, r) {
    return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
  }
}
function fn(n, t, e) {
  var v, m, I, _;
  const a = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((m = (v = e == null ? void 0 : e.locale) == null ? void 0 : v.options) == null ? void 0 : m.weekStartsOn) ?? a.weekStartsOn ?? ((_ = (I = a.locale) == null ? void 0 : I.options) == null ? void 0 : _.weekStartsOn) ?? 0, l = ge(n, e == null ? void 0 : e.in), s = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - r, p = t < 0 || t > 6 ? t - (s + d) % 7 : (u + d) % 7 - (s + d) % 7;
  return Qa(l, p, e);
}
class Eh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 90);
    q(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "E":
      case "EE":
      case "EEE":
        return r.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return r.day(e, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return r.day(e, { width: "wide", context: "formatting" }) || r.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 6;
  }
  set(e, a, r, l) {
    return e = fn(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Ph extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 90);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r, l) {
    const s = (o) => {
      const u = Math.floor((o - 1) / 7) * 7;
      return (o + l.weekStartsOn + 6) % 7 + u;
    };
    switch (a) {
      case "e":
      case "ee":
        return he(pe(a.length, e), s);
      case "eo":
        return he(
          r.ordinalNumber(e, {
            unit: "day"
          }),
          s
        );
      case "eee":
        return r.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
      case "eeeee":
        return r.day(e, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return r.day(e, { width: "wide", context: "formatting" }) || r.day(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.day(e, { width: "short", context: "formatting" }) || r.day(e, { width: "narrow", context: "formatting" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 6;
  }
  set(e, a, r, l) {
    return e = fn(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Mh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 90);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r, l) {
    const s = (o) => {
      const u = Math.floor((o - 1) / 7) * 7;
      return (o + l.weekStartsOn + 6) % 7 + u;
    };
    switch (a) {
      case "c":
      case "cc":
        return he(pe(a.length, e), s);
      case "co":
        return he(
          r.ordinalNumber(e, {
            unit: "day"
          }),
          s
        );
      case "ccc":
        return r.day(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.day(e, { width: "short", context: "standalone" }) || r.day(e, { width: "narrow", context: "standalone" });
      case "ccccc":
        return r.day(e, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return r.day(e, { width: "short", context: "standalone" }) || r.day(e, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return r.day(e, { width: "wide", context: "standalone" }) || r.day(e, {
          width: "abbreviated",
          context: "standalone"
        }) || r.day(e, { width: "short", context: "standalone" }) || r.day(e, { width: "narrow", context: "standalone" });
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 6;
  }
  set(e, a, r, l) {
    return e = fn(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
function Lh(n, t, e) {
  const a = ge(n, e == null ? void 0 : e.in), r = lh(a, e), l = t - r;
  return Qa(a, l, e);
}
class Bh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 90);
    q(this, "incompatibleTokens", [
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
  parse(e, a, r) {
    const l = (s) => s === 0 ? 7 : s;
    switch (a) {
      case "i":
      case "ii":
        return pe(a.length, e);
      case "io":
        return r.ordinalNumber(e, { unit: "day" });
      case "iii":
        return he(
          r.day(e, {
            width: "abbreviated",
            context: "formatting"
          }) || r.day(e, {
            width: "short",
            context: "formatting"
          }) || r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiii":
        return he(
          r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiiii":
        return he(
          r.day(e, {
            width: "short",
            context: "formatting"
          }) || r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiii":
      default:
        return he(
          r.day(e, {
            width: "wide",
            context: "formatting"
          }) || r.day(e, {
            width: "abbreviated",
            context: "formatting"
          }) || r.day(e, {
            width: "short",
            context: "formatting"
          }) || r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 7;
  }
  set(e, a, r) {
    return e = Lh(e, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Sh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 80);
    q(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "a":
      case "aa":
      case "aaa":
        return r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, a, r) {
    return e.setHours(cn(r), 0, 0, 0), e;
  }
}
class $h extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 80);
    q(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "b":
      case "bb":
      case "bbb":
        return r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, a, r) {
    return e.setHours(cn(r), 0, 0, 0), e;
  }
}
class Ah extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 80);
    q(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(e, {
          width: "wide",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "abbreviated",
          context: "formatting"
        }) || r.dayPeriod(e, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(e, a, r) {
    return e.setHours(cn(r), 0, 0, 0), e;
  }
}
class Oh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "h":
        return de(me.hour12h, e);
      case "ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 12;
  }
  set(e, a, r) {
    const l = e.getHours() >= 12;
    return l && r < 12 ? e.setHours(r + 12, 0, 0, 0) : !l && r === 12 ? e.setHours(0, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
  }
}
class Rh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "H":
        return de(me.hour23h, e);
      case "Ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 23;
  }
  set(e, a, r) {
    return e.setHours(r, 0, 0, 0), e;
  }
}
class Fh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "K":
        return de(me.hour11h, e);
      case "Ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 11;
  }
  set(e, a, r) {
    return e.getHours() >= 12 && r < 12 ? e.setHours(r + 12, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
  }
}
class Vh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "k":
        return de(me.hour24h, e);
      case "ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 1 && a <= 24;
  }
  set(e, a, r) {
    const l = r <= 24 ? r % 24 : r;
    return e.setHours(l, 0, 0, 0), e;
  }
}
class Nh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 60);
    q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "m":
        return de(me.minute, e);
      case "mo":
        return r.ordinalNumber(e, { unit: "minute" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 59;
  }
  set(e, a, r) {
    return e.setMinutes(r, 0, 0), e;
  }
}
class qh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 50);
    q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a, r) {
    switch (a) {
      case "s":
        return de(me.second, e);
      case "so":
        return r.ordinalNumber(e, { unit: "second" });
      default:
        return pe(a.length, e);
    }
  }
  validate(e, a) {
    return a >= 0 && a <= 59;
  }
  set(e, a, r) {
    return e.setSeconds(r, 0), e;
  }
}
class jh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 30);
    q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, a) {
    const r = (l) => Math.trunc(l * Math.pow(10, -a.length + 3));
    return he(pe(a.length, e), r);
  }
  set(e, a, r) {
    return e.setMilliseconds(r), e;
  }
}
class Hh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 10);
    q(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(e, a) {
    switch (a) {
      case "X":
        return Me(
          Pe.basicOptionalMinutes,
          e
        );
      case "XX":
        return Me(Pe.basic, e);
      case "XXXX":
        return Me(
          Pe.basicOptionalSeconds,
          e
        );
      case "XXXXX":
        return Me(
          Pe.extendedOptionalSeconds,
          e
        );
      case "XXX":
      default:
        return Me(Pe.extended, e);
    }
  }
  set(e, a, r) {
    return a.timestampIsSet ? e : ye(
      e,
      e.getTime() - bt(e) - r
    );
  }
}
class Wh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 10);
    q(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(e, a) {
    switch (a) {
      case "x":
        return Me(
          Pe.basicOptionalMinutes,
          e
        );
      case "xx":
        return Me(Pe.basic, e);
      case "xxxx":
        return Me(
          Pe.basicOptionalSeconds,
          e
        );
      case "xxxxx":
        return Me(
          Pe.extendedOptionalSeconds,
          e
        );
      case "xxx":
      default:
        return Me(Pe.extended, e);
    }
  }
  set(e, a, r) {
    return a.timestampIsSet ? e : ye(
      e,
      e.getTime() - bt(e) - r
    );
  }
}
class Kh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 40);
    q(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return tr(e);
  }
  set(e, a, r) {
    return [ye(e, r * 1e3), { timestampIsSet: !0 }];
  }
}
class Qh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 20);
    q(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return tr(e);
  }
  set(e, a, r) {
    return [ye(e, r), { timestampIsSet: !0 }];
  }
}
const Yh = {
  G: new ch(),
  y: new fh(),
  Y: new ph(),
  R: new mh(),
  u: new hh(),
  Q: new vh(),
  q: new gh(),
  M: new bh(),
  L: new yh(),
  w: new wh(),
  I: new xh(),
  d: new Ih(),
  D: new Ch(),
  E: new Eh(),
  e: new Ph(),
  c: new Mh(),
  i: new Bh(),
  a: new Sh(),
  b: new $h(),
  B: new Ah(),
  h: new Oh(),
  H: new Rh(),
  K: new Fh(),
  k: new Vh(),
  m: new Nh(),
  s: new qh(),
  S: new jh(),
  X: new Hh(),
  x: new Wh(),
  t: new Kh(),
  T: new Qh()
}, zh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Gh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Xh = /^'([^]*?)'?$/, Uh = /''/g, Zh = /\S/, Jh = /[a-zA-Z]/;
function Gn(n, t, e, a) {
  var y, w, T, S;
  const r = () => ye(e, NaN), l = rh(), s = l.locale ?? za, o = l.firstWeekContainsDate ?? ((w = (y = l.locale) == null ? void 0 : y.options) == null ? void 0 : w.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((S = (T = l.locale) == null ? void 0 : T.options) == null ? void 0 : S.weekStartsOn) ?? 0;
  if (!t)
    return n ? r() : ge(e, a == null ? void 0 : a.in);
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: u,
    locale: s
  }, p = [new dh(a == null ? void 0 : a.in, e)], v = t.match(Gh).map((D) => {
    const C = D[0];
    if (C in Kt) {
      const P = Kt[C];
      return P(D, s.formatLong);
    }
    return D;
  }).join("").match(zh), m = [];
  for (let D of v) {
    Ja(D) && Qt(D, t, n), Za(D) && Qt(D, t, n);
    const C = D[0], P = Yh[C];
    if (P) {
      const { incompatibleTokens: x } = P;
      if (Array.isArray(x)) {
        const E = m.find(
          (B) => x.includes(B.token) || B.token === C
        );
        if (E)
          throw new RangeError(
            `The format string mustn't contain \`${E.fullToken}\` and \`${D}\` at the same time`
          );
      } else if (P.incompatibleTokens === "*" && m.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${D}\` and any other token at the same time`
        );
      m.push({ token: C, fullToken: D });
      const N = P.run(
        n,
        D,
        s.match,
        d
      );
      if (!N)
        return r();
      p.push(N.setter), n = N.rest;
    } else {
      if (C.match(Jh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + C + "`"
        );
      if (D === "''" ? D = "'" : C === "'" && (D = ev(D)), n.indexOf(D) === 0)
        n = n.slice(D.length);
      else
        return r();
    }
  }
  if (n.length > 0 && Zh.test(n))
    return r();
  const I = p.map((D) => D.priority).sort((D, C) => C - D).filter((D, C, P) => P.indexOf(D) === C).map(
    (D) => p.filter((C) => C.priority === D).sort((C, P) => P.subPriority - C.subPriority)
  ).map((D) => D[0]);
  let _ = ge(e, a == null ? void 0 : a.in);
  if (isNaN(+_)) return r();
  const L = {};
  for (const D of I) {
    if (!D.validate(_, d))
      return r();
    const C = D.set(_, L, d);
    Array.isArray(C) ? (_ = C[0], Object.assign(L, C[1])) : _ = C;
  }
  return _;
}
function ev(n) {
  return n.match(Xh)[1].replace(Uh, "'");
}
const tv = {
  dsfrDecodeDate: function(n, t) {
    if (typeof n != "string" || n === "" || /^\d{4}-\d{2}-\d{2}$/.test(n))
      return n;
    const a = Gn(n, t, /* @__PURE__ */ new Date());
    return zn(a, "yyyy-MM-dd");
  },
  dsfrSearch: function(n) {
    return this.search(n, 0);
  },
  dsfrDecodeDateTime: function(n, t) {
    if (n === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(n))
      return n;
    const a = Gn(n, t, /* @__PURE__ */ new Date());
    return zn(a, "yyyy-MM-dd'T'HH:mm");
  },
  _searchAndFilterList: function(n, t, e, a, r) {
    let l = this.$data.vueData[n];
    if (a && (l = l.filter(a)), r != null && r.trim() !== "") {
      const s = this.unaccentLower(r);
      l = l.filter((o) => this.unaccentLower(o[e].toString()).indexOf(s) > -1);
    }
    return l;
  },
  dsfrTransformListForSelection: function(n, t, e, a, r, l) {
    let o = this._searchAndFilterList(n, t, e, r, l).map(function(u) {
      return { value: u[t], text: u[e].toString() };
    });
    return a != null && a !== "" && o.unshift({ value: "", text: a }), o;
  },
  dsfrTransformListForRadio: function(n, t, e, a, r, l, s) {
    return this._searchAndFilterList(n, t, e, l, s).map(function(u) {
      return {
        value: u[t],
        label: u[e].toString(),
        hint: u[r],
        disabled: u[a]
      };
    });
  },
  dsfrTransformListForCheckbox: function(n, t, e, a, r, l, s, o) {
    return this._searchAndFilterList(n, t, e, s, o).map(function(d) {
      return {
        value: d[t],
        label: d[e].toString(),
        name: l,
        hint: d[r],
        disabled: d[a]
      };
    });
  },
  dsfrSearchAutocomplete: function(n, t, e, a, r, l, s) {
    return s.length < l ? Promise.resolve([]) : this.$http.post(r, this.objectToFormData({ terms: s, list: n, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((o) => o.data.map((u) => ({
      value: u[t],
      label: u[e].toString()
      // A label is always a string
    }))).catch(() => []);
  },
  dsfrLoadAutocompleteById: function(n, t, e, a, r, l, s, o) {
    let u = o != null && o !== "null" ? this.$data.vueData[l][o][s] : this.$data.vueData[l][s];
    Array.isArray(u) ? u.forEach((d) => this.dsfrLoadMissingAutocompleteOption(n, t, e, a, r, d)) : this.dsfrLoadMissingAutocompleteOption(n, t, e, a, r, u);
  },
  dsfrLoadMissingAutocompleteOption: function(n, t, e, a, r, l) {
    let s = this.componentStates[a].options.find((o) => o.value === l);
    if (!l || s !== void 0) {
      (s == null ? void 0 : s.label) !== void 0 && (this.componentStates[a].field = s.label);
      return;
    }
    this.$data.componentStates[a].loading = !0, this.$http.post(r, this.objectToFormData({ value: l, list: n, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((function(o) {
      let u = o.data.map(function(d) {
        return { value: d[t], label: d[e].toString() };
      });
      return this.$data.componentStates[a].options = this.$data.componentStates[a].options.concat(u), this.componentStates[a].field = u[0].label, this.$data.componentStates[a].options;
    }).bind(this)).catch((function(o) {
      this.$q.notify(o.response.status + ":" + o.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[a].loading = !1;
    }).bind(this));
  },
  dsfrResetAutocomplete: function(n, t, e, a) {
    let r = this.componentStates[n].field;
    if (r === void 0)
      return;
    let l = this.componentStates[n].options.find((s) => s.label.toLowerCase().startsWith(r.trim().toLowerCase()));
    l === void 0 || r === "" ? (this.componentStates[n].field = void 0, a != null && a !== "null" ? this.$data.vueData[t][a][e] = void 0 : this.$data.vueData[t][e] = void 0) : (this.$data.componentStates[n].field = l.label, a != null && a !== "null" ? this.$data.vueData[t][a][e] = l.value : this.$data.vueData[t][e] = l.value);
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var n, t;
    (t = (n = this.componentStates) == null ? void 0 : n.dsfrHeader) == null || t.navItems.forEach((e) => {
      e.title ? e.active = e.links.some((a) => a["data-set-active"] === !0 || window.location.pathname.startsWith(a.to)) : e.active = e["data-set-active"] === !0;
    });
  },
  dsfrTableRows: function(n) {
    let t = this.$data.componentStates[n].pagination, e = this.$data.vueData[t.listKey];
    return t.sortUrl && t.descending ? e.slice().reverse() : e;
  },
  dsfrServerSideSort: function(n) {
    let e = this.$data.componentStates[n].pagination, a = this.$data.vueData;
    e.page = 0, e.sortUrl && e.sortBy && this.$http.post(e.sortUrl, this.objectToFormData({ sortFieldName: e.sortBy, sortDesc: e.descending, CTX: this.$data.vueData.CTX })).then(
      (function(r) {
        a[e.listKey] = r.data.model[e.listKey], this.$data.vueData.CTX = r.data.model.CTX;
      }).bind(this)
    );
  }
}, $e = (n = "", t = "") => (n ? `${n}-` : "") + zt() + (t ? `-${t}` : ""), nv = {
  useRandomId: $e
}, av = ["href", "aria-current"], rv = {
  __name: "RouterLink",
  props: ["to", "active"],
  setup(n) {
    const t = n, e = t.to === "/" ? window.location.pathname === t.to : window.location.pathname.startsWith(t.to);
    return (a, r) => (i(), f("a", {
      href: t.to,
      "aria-current": H(e) || n.active ? "page" : void 0
    }, [
      $(a.$slots, "default")
    ], 8, av));
  }
}, Ae = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [a, r] of t)
    e[a] = r;
  return e;
}, lv = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Ct, DsfrTag: un, DsfrButton: je },
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
    addFacetValueTranslator(n, t) {
      this.codeToLabelTranslater[n] = t;
    },
    facetByCode(n) {
      return this.facets.filter(function(t) {
        return t.code === n;
      })[0];
    },
    facetValueByCode(n, t) {
      return this.facetByCode(n).values.filter(function(e) {
        return e.code === t;
      })[0];
    },
    facetLabelByCode(n) {
      return this.facetByCode(n).label;
    },
    facetMultipleByCode(n) {
      return this.facetByCode(n).multiple;
    },
    facetValueLabelByCode(n, t) {
      if (this.codeToLabelTranslater[n])
        return this.codeToLabelTranslater[n](n, t);
      var e = this.facetValueByCode(n, t);
      return e ? e.label : t;
    },
    isFacetValueSelected(n, t) {
      return this.selectedFacets[n].includes(t);
    },
    isFacetSelected(n) {
      return this.selectedFacets[n] ? this.selectedFacets[n].length > 0 : !1;
    },
    isAnyFacetValueSelected() {
      return Object.keys(this.selectedFacets).some((function(n) {
        return !this.facetMultipleByCode(n);
      }).bind(this));
    },
    expandFacet(n) {
      this.isFacetExpanded(n) || this.$data.expandedFacets.push(n);
    },
    reduceFacet(n) {
      this.isFacetExpanded(n) && this.$data.expandedFacets.splice(this.$data.expandedFacets.indexOf(n), 1);
    },
    isFacetExpanded(n) {
      return this.$data.expandedFacets.includes(n);
    },
    selectedInvisibleFacets(n) {
      return this.selectedFacets[n].filter((t) => !this.facetValueByCode(n, t)).map((t) => {
        var e = {};
        return e.code = t, e.label = t, e.count = 0, e;
      });
    },
    visibleFacets(n, t) {
      return this.isFacetExpanded(n) ? t : t.slice(0, this.maxValues);
    }
  }
}, sv = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, ov = ["aria-labelledby"], iv = {
  key: 0,
  class: "facet"
}, uv = { class: "flex justify-between w-full fr-mb-0" }, dv = {
  class: "facet--count",
  "aria-hidden": "true"
}, cv = { class: "fr-sr-only" }, fv = { class: "flex justify-between w-full" }, pv = {
  class: "facet--count",
  "aria-hidden": "true"
}, mv = { class: "fr-sr-only" }, hv = ["aria-labelledby"], vv = {
  key: 0,
  class: "facet"
}, gv = { class: "flex justify-between w-full fr-mb-0" }, bv = {
  class: "facet--count",
  "aria-hidden": "true"
}, yv = { class: "fr-sr-only" }, kv = { class: "flex justify-between w-full" }, wv = {
  class: "facet--count",
  "aria-hidden": "true"
}, _v = { class: "fr-sr-only" }, xv = { class: "fr-mb-2w" };
function Dv(n, t, e, a, r, l) {
  const s = xe("DsfrTag"), o = xe("DsfrCheckbox"), u = xe("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", sv, [
      (i(!0), f(G, null, J(e.selectedFacets, (d, p) => (i(), f(G, { key: p }, [
        l.facetMultipleByCode(p) ? b("", !0) : (i(!0), f(G, { key: 0 }, J(d, (v) => (i(), W(s, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: v.code,
          onClick: (m) => n.$emit("toogle-facet", p, v, e.contextKey)
        }, {
          default: U(() => [
            V(h(l.facetLabelByCode(p)) + ": " + h(l.facetValueLabelByCode(p, v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : b("", !0),
    (i(!0), f(G, null, J(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(G, { key: 0 }, [
        (i(), W(ve(e.heading), {
          class: "fr-mb-1w fr-text--md",
          id: d.code
        }, {
          default: U(() => [
            V(h(d.label), 1)
          ]),
          _: 2
        }, 1032, ["id"])),
        l.selectedInvisibleFacets(d.code, d.values).length > 0 ? (i(), f("div", {
          key: 0,
          role: "group",
          "aria-labelledby": d.code
        }, [
          (i(!0), f(G, null, J(l.selectedInvisibleFacets(d.code), (p) => (i(), f(G, {
            key: p.code
          }, [
            d.multiple ? (i(), f("div", iv, [
              ee(o, {
                small: "",
                modelValue: !0,
                "onUpdate:modelValue": (v) => n.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                label: U(() => [
                  c("span", uv, [
                    V(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", dv, h(p.count), 1),
                    c("span", cv, "(" + h(p.count) + " élément(s))", 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onUpdate:modelValue"])
            ])) : (i(), W(u, {
              key: 1,
              tertiary: "",
              "no-outline": "",
              onClick: (v) => n.$emit("toogle-facet", d.code, p.code, e.contextKey)
            }, {
              default: U(() => [
                c("span", fv, [
                  V(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                  c("span", pv, h(p.count), 1),
                  c("span", mv, "(" + h(p.count) + " élément(s))", 1)
                ])
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ], 64))), 128))
        ], 8, ov)) : b("", !0),
        l.visibleFacets(d.code, d.values).length > 0 ? (i(), f("div", {
          key: 1,
          role: "group",
          "aria-labelledby": d.code
        }, [
          (i(!0), f(G, null, J(l.visibleFacets(d.code, d.values), (p) => (i(), f(G, {
            key: p.code
          }, [
            d.multiple ? (i(), f("div", vv, [
              ee(o, {
                small: "",
                modelValue: l.isFacetValueSelected(d.code, p.code),
                class: "facet",
                "onUpdate:modelValue": (v) => n.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                label: U(() => [
                  c("span", gv, [
                    V(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", bv, h(p.count), 1),
                    c("span", yv, "(" + h(p.count) + " élément(s))", 1)
                  ])
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue"])
            ])) : (i(), W(u, {
              key: 1,
              tertiary: "",
              "no-outline": "",
              onClick: (v) => n.$emit("toogle-facet", d.code, p.code, e.contextKey)
            }, {
              default: U(() => [
                c("span", kv, [
                  V(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                  c("span", wv, h(p.count), 1),
                  c("span", _v, "(" + h(p.count) + " élément(s))", 1)
                ])
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ], 64))), 128))
        ], 8, hv)) : b("", !0),
        c("div", xv, [
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), W(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: U(() => t[0] || (t[0] = [
              V(" Voir plus ")
            ])),
            _: 2
          }, 1032, ["onClick"])) : b("", !0),
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), W(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: U(() => t[1] || (t[1] = [
              V(" Voir moins ")
            ])),
            _: 2
          }, 1032, ["onClick"])) : b("", !0)
        ])
      ], 64)) : b("", !0)
    ]))), 128))
  ]);
}
const Tv = /* @__PURE__ */ Ae(lv, [["render", Dv], ["__scopeId", "data-v-628fafbe"]]), pn = () => {
  const n = Q(), t = Q(!1), e = Q(!1), a = () => {
    if (!n.value)
      return;
    n.value.style.setProperty("--collapser", "none");
    const s = n.value.offsetHeight;
    n.value.style.setProperty("--collapse", `${-s}px`), n.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: n,
    collapsing: t,
    cssExpanded: e,
    doExpand: (s) => {
      n.value && (s === !0 && n.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        t.value = !0, a(), window.requestAnimationFrame(() => {
          e.value = s;
        });
      }));
    },
    adjust: a,
    onTransitionEnd: (s) => {
      t.value = !1, n.value && s === !1 && n.value.style.removeProperty("--collapse-max-height");
    }
  };
}, Iv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Cv = ["id", "aria-labelledby", "onKeydown"], Ev = {
  class: "fr-menu__list",
  role: "none"
}, Pv = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => $e("menu") },
    size: {},
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 },
    tertiary: { type: Boolean, default: !1 }
  },
  setup(n, { expose: t }) {
    const {
      collapse: e,
      collapsing: a,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = pn(), o = n, u = Q(null), d = Q(!1);
    let p = Q(0), v = [];
    Re("menuItem", { menuItemIndex: p, addMenuItem: (x, N) => {
      p.value += 1, v.push(`${x}@${N}`);
    } }), Re("id", o.id), fe(d, (x, N) => {
      x !== N && (l(x), x ? (setTimeout(() => L(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    });
    const I = (x, N) => {
      const E = N === "down" ? (x + 1) % v.length : (x - 1 + v.length) % v.length, B = document.getElementById(`${o.id}_item_${E}`);
      return B.ariaDisabled === "true" ? I(E, N) : B;
    }, _ = (x) => {
      const N = document.activeElement.id, E = N.startsWith(`${o.id}_item_`) ? Number(N.split("_")[2]) : x === "down" ? -1 : 0;
      I(E, x).focus();
    }, L = (x) => _("down"), y = (x) => _("up");
    let w = (x) => {
      let N = x.key;
      if (N.length > 1 && N.match(/\S/))
        return;
      N = N.toLowerCase();
      let E = v.filter((g) => g.toLowerCase().startsWith(N)), B = document.activeElement.id;
      for (let g of E) {
        let M = g.split("@")[1], j = document.getElementById(`${o.id}_item_${M}`);
        if (B !== j.id) {
          j.focus();
          break;
        }
      }
    }, T = (x) => {
      u.value.contains(x.target) || (d.value = !1);
    };
    function S() {
      d.value = !1;
    }
    const D = k(() => ["sm", "small"].includes(o.size)), C = k(() => ["md", "medium"].includes(o.size)), P = k(() => ["lg", "large"].includes(o.size));
    return t({ closeMenu: S }), (x, N) => (i(), f("div", {
      class: "relative-position fr-menu__wrapper",
      onKeydown: N[9] || (N[9] = ne(
        //@ts-ignore
        (...E) => H(T) && H(T)(...E),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", Y({
        id: x.id,
        onClick: N[0] || (N[0] = te((E) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          N[1] || (N[1] = ne(te((E) => d.value = !1, ["stop"]), ["esc"])),
          N[2] || (N[2] = ne(te((E) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          ne(te(L, ["prevent"]), ["down"]),
          ne(te(y, ["prevent"]), ["up"]),
          N[3] || (N[3] = //@ts-ignore
          (...E) => H(w) && H(w)(...E)),
          N[4] || (N[4] = ne((E) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [x.icon]: !0,
          "fr-btn--secondary": x.secondary,
          "fr-btn--tertiary": x.tertiary,
          "fr-btn--sm": D.value,
          "fr-btn--md": C.value,
          "fr-btn--lg": P.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": x.disabled,
        "aria-controls": `${x.id}_menu`,
        "aria-expanded": d.value
      }, x.$attrs), [
        c("span", null, h(x.label), 1)
      ], 16, Iv),
      c("div", {
        id: `${x.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse fr-menu", { "fr-collapse--expanded": H(r), "fr-collapsing": H(a) }]),
        role: "menu",
        "aria-labelledby": x.id,
        onKeyup: N[5] || (N[5] = ne((E) => d.value = !1, ["esc"])),
        onKeydown: [
          N[6] || (N[6] = ne((E) => d.value = !1, ["tab"])),
          ne(te(L, ["prevent"]), ["down"]),
          ne(te(y, ["prevent"]), ["up"]),
          N[7] || (N[7] = //@ts-ignore
          (...E) => H(w) && H(w)(...E))
        ],
        onTransitionend: N[8] || (N[8] = (E) => H(s)(d.value))
      }, [
        c("ul", Ev, [
          $(x.$slots, "default", {}, void 0, !0)
        ])
      ], 42, Cv)
    ], 544));
  }
}), Mv = /* @__PURE__ */ Ae(Pv, [["__scopeId", "data-v-7c863055"]]), Lv = { role: "none" }, Bv = ["id", "href"], Sv = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(n) {
    const t = n, { menuItemIndex: e, addMenuItem: a } = Qe("menuItem"), l = `fr-btn fr-btn--secondary fr-nav__link ${k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")) ? t.icon : ""} fr-btn--icon-left`, s = Qe("id"), o = e.value;
    return a(t.label, o), (u, d) => {
      const p = xe("dsfr-button");
      return i(), f("li", Lv, [
        u.url === "" ? (i(), W(p, Y({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${H(s)}_item_${H(o)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", Y({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${H(s)}_item_${H(o)}`,
          href: u.url,
          class: l
        }, u.$attrs), h(u.label), 17, Bv))
      ]);
    };
  }
}), $v = /* @__PURE__ */ Ae(Sv, [["__scopeId", "data-v-b29bb72d"]]), Av = ["id"], Ov = {
  key: 0,
  class: "required"
}, Rv = {
  key: 0,
  class: "fr-hint-text"
}, Fv = ["id", "aria-expanded", "aria-describedby", "aria-controls", "aria-disabled", "aria-required"], Vv = { class: "grow overflow" }, Nv = { class: "fr-pl-1v fr-select__icon" }, qv = ["id"], jv = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, Hv = ["id"], Wv = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, Kv = ["id", "aria-controls"], Qv = ["id"], Yv = {
  key: 0,
  class: "fr-hint-text"
}, zv = ["aria-describedby", "id"], Gv = ["id", "onKeydown", "onClick", "aria-selected"], Xv = ["data-id", "value"], Uv = ["id"], Zv = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ Be({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => $e("select-multiple") },
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
  setup(n) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: a,
      doExpand: r,
      onTransitionEnd: l
    } = pn(), s = n, o = Q(!1), u = _e(n, "modelValue"), d = Q(s.options);
    fe(o, (A, O) => {
      A !== O && (r(A), A ? (document.addEventListener("click", M), document.addEventListener("touchstart", M)) : (document.removeEventListener("click", M), document.removeEventListener("touchstart", M)));
    });
    const p = Q(null), v = Q(null), m = Q(null), I = Q(""), _ = k(() => s.errorMessage || s.successMessage), L = k(() => s.errorMessage !== "" ? "error" : "valid"), y = k(() => d.value.every((A) => s.modelValue.includes(A.value)) ? "fr-icon-close-circle-line" : "fr-icon-check-line"), w = k(() => d.value.every((A) => s.modelValue.includes(A.value)) ? "Tout déselectionner" : "Tout sélectionner"), T = k(() => {
      let O = `${s.options.filter((Z) => s.modelValue.includes(Z.value)).length} options séléctionnées`;
      return s.modelValue.length > 2 ? O : s.options.filter((Z) => s.modelValue.includes(Z.value)).map((Z) => Z.text).join(", ");
    });
    let S = function() {
      if (d.value.every((O) => s.modelValue.includes(O.value))) {
        const O = d.value.map((z) => z.value), Z = s.modelValue.filter((z) => !O.includes(z));
        s.modelValue.length = 0, Z.forEach((z) => s.modelValue.push(z));
      } else
        d.value.filter((Z) => !s.modelValue.includes(Z.value)).forEach((Z) => s.modelValue.push(Z.value));
    }, D = function(A) {
      const O = A.target.value.toLowerCase();
      d.value = s.options.filter((Z) => Z.text.toLowerCase().indexOf(O) > -1);
    };
    const C = function(A) {
      switch (A.key) {
        case "Escape":
        case "Esc":
          A.stopPropagation(), o.value = !1;
          break;
        case " ":
        case "Space":
          document.activeElement.id === s.id && (A.preventDefault(), o.value = !o.value);
          break;
        case "Down":
        case "ArrowDown":
          A.preventDefault(), o.value ? N() : (o.value = !0, setTimeout(() => N(), 100));
          break;
        case "Up":
        case "ArrowUp":
          A.preventDefault(), o.value ? E() : (o.value = !0, setTimeout(() => E(), 100));
          break;
        case "Tab":
          B(A);
          break;
        default:
          let O = /^[a-zA-Z0-9àâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]$/.test(A.key);
          if (!O && A.shiftKey)
            return;
          s.comboHasFilter && document.activeElement.id === `${s.id}_filter` || (s.comboHasFilter && O ? m.value.focus() : g(A));
      }
    }, P = (A, O) => {
      const Z = O === "down" ? (A + 1) % d.value.length : (A - 1 + d.value.length) % d.value.length, z = document.getElementById(`${s.id}_item_${Z}`);
      return z === null || z.ariaDisabled === "true" ? P(Z, O) : z;
    }, x = (A) => {
      const O = document.activeElement.id, Z = O.startsWith(`${s.id}_item_`) ? Number(O.split("_")[2]) : A === "down" ? -1 : 0;
      P(Z, A).focus();
    }, N = (A) => x("down"), E = (A) => x("up"), B = (A) => {
      if (!o.value)
        return;
      const O = [];
      s.comboHasButton && O.push(`${s.id}_button`), s.comboHasFilter && O.push(`${s.id}_filter`), O.push("item");
      const Z = O.indexOf(A.target.id);
      let z;
      A.shiftKey ? z = (Z - 1 + O.length) % O.length : z = (Z + 1) % O.length;
      const le = document.getElementById(O[z]);
      O[z] === "item" ? (N(), A.preventDefault()) : le && (le.focus(), A.preventDefault());
    };
    let g = (A) => {
      let O = A.key;
      if (O.length > 1 && O.match(/\S/) || document.activeElement.id === `${s.id}_filter`)
        return;
      O = O.toLowerCase();
      let Z = d.value.filter((le) => le.text.toLowerCase().startsWith(O)), z = document.activeElement.id;
      for (let le of Z) {
        let ae = document.querySelector(`[data-id='${le.value}']`);
        if (z !== ae.id) {
          ae.focus();
          break;
        }
      }
    }, M = (A) => {
      p.value.contains(A.target) || (o.value = !1);
    }, j = (A, O) => {
      u.value.includes(O) ? u.value.splice(u.value.indexOf(O), 1) : (u.value.push(O), d.value.length === 1 && (I.value = "", d.value = s.options));
    };
    return (A, O) => {
      const Z = xe("v-icon");
      return i(), f(G, null, [
        c("div", Y({
          ref_key: "container",
          ref: p,
          class: ["fr-select-group", { [`fr-select-group--${L.value}`]: _.value !== "" }],
          onKeyup: O[6] || (O[6] = ne(
            //@ts-ignore
            (...z) => H(M) && H(M)(...z),
            ["tab"]
          ))
        }, A.$attrs), [
          c("p", {
            class: "fr-label fr-mb-0",
            id: `${A.id}_label`
          }, [
            $(A.$slots, "label", {}, () => [
              V(h(A.label) + " ", 1),
              $(A.$slots, "required-tip", {}, () => [
                A.required ? (i(), f("span", Ov, " *")) : b("", !0)
              ], !0)
            ], !0),
            A.description ? (i(), f("span", Rv, h(A.description), 1)) : b("", !0)
          ], 8, Av),
          c("div", {
            id: A.id,
            class: R([{ [`fr-select--${L.value}`]: _.value !== "" }, "fr-input fr-select--menu flex"]),
            onClick: O[0] || (O[0] = (z) => o.value = !o.value),
            onKeydown: C,
            tabindex: "0",
            "aria-autocomplete": "none",
            role: "combobox",
            "aria-expanded": o.value,
            "aria-haspopup": "dialog",
            "aria-describedby": `${A.id}_label`,
            "aria-controls": `${A.id}_dialog`,
            "aria-disabled": A.disabled,
            "aria-required": A.required
          }, [
            c("p", Vv, h(T.value), 1),
            c("div", Nv, [
              ee(Z, {
                style: { "font-size": "1rem" },
                name: "ri-arrow-down-s-line"
              })
            ])
          ], 42, Fv),
          c("div", {
            id: `${A.id}_dialog`,
            ref_key: "collapse",
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Choix des options",
            class: R(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": H(a), "fr-collapsing": H(e) }]),
            onKeydown: C,
            onTransitionend: O[5] || (O[5] = (z) => H(l)(o.value))
          }, [
            A.comboHasButton ? (i(), f("div", jv, [
              c("button", {
                class: R(["fr-btn fr-btn--tertiary fr-btn--sm", `${y.value}`]),
                id: `${A.id}_button`,
                onClick: O[1] || (O[1] = (z) => H(S)()),
                ref_key: "button",
                ref: v,
                type: "button"
              }, h(w.value), 11, Hv)
            ])) : b("", !0),
            A.comboHasFilter ? (i(), f("div", Wv, [
              Le(c("input", {
                class: "fr-input",
                id: `${A.id}_filter`,
                ref_key: "filter",
                ref: m,
                onInput: O[2] || (O[2] = //@ts-ignore
                (...z) => H(D) && H(D)(...z)),
                "onUpdate:modelValue": O[3] || (O[3] = (z) => I.value = z),
                "aria-label": "Rechercher une option",
                "aria-controls": `${A.id}_listbox`,
                placeholder: "Rechercher",
                type: "text"
              }, null, 40, Kv), [
                [gn, I.value]
              ])
            ])) : b("", !0),
            A.comboLabel ? (i(), f("p", {
              key: 2,
              class: "fr-label fr-mb-2v",
              id: `${A.id}_combolabel`
            }, [
              V(h(A.comboLabel) + " ", 1),
              A.comboDescription ? (i(), f("span", Yv, h(A.comboDescription), 1)) : b("", !0)
            ], 8, Qv)) : b("", !0),
            c("ul", {
              role: "listbox",
              "aria-multiselectable": "true",
              "aria-describedby": A.comboLabel ? `${A.id}_combolabel` : null,
              id: `${A.id}_listbox`,
              "aria-live": "polite",
              class: "fr-select__ul"
            }, [
              (i(!0), f(G, null, J(d.value, (z, le) => (i(), f("li", {
                class: "fr-checkbox-group fr-checkbox-group--sm fr-py-0 fr-my-1v",
                id: `${A.id}_item_${le}`,
                tabindex: "-1",
                role: "option",
                onKeydown: ne(te((ae) => H(j)(ae, z.value), ["prevent"]), ["space"]),
                onClick: (ae) => H(j)(ae, z.value),
                "aria-selected": u.value.includes(z.value)
              }, [
                Le(c("input", {
                  "data-id": z.value,
                  type: "hidden",
                  class: "",
                  tabindex: "-1",
                  value: z.value,
                  "onUpdate:modelValue": O[4] || (O[4] = (ae) => u.value = ae)
                }, null, 8, Xv), [
                  [gn, u.value]
                ]),
                c("span", null, h(z.text), 1)
              ], 40, Gv))), 256))
            ], 8, zv)
          ], 42, qv)
        ], 16),
        _.value ? (i(), f("p", {
          key: 0,
          id: `select-${L.value}-desc-${L.value}`,
          class: R(`fr-${L.value}-text`)
        }, h(_.value), 11, Uv)) : b("", !0)
      ], 64);
    };
  }
}), Jv = /* @__PURE__ */ Ae(Zv, [["__scopeId", "data-v-8c7de2e6"]]), eg = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], tg = ["id", "aria-labelledby", "onKeydown"], ng = {
  key: 0,
  class: "fr-label fr-mb-0"
}, ag = {
  key: 0,
  class: "fr-hint-text"
}, rg = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, lg = { role: "none" }, sg = { class: "fr-p-2v" }, og = ["id", "href"], ig = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrHeaderMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => $e("header-menu") },
    disabled: { type: Boolean, default: !1 },
    logoutUrl: { default: "" },
    logoutLabel: { default: "Se déconnecter" },
    nom: { default: "" },
    email: { default: "" }
  },
  setup(n) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: a,
      doExpand: r,
      onTransitionEnd: l
    } = pn(), s = n, o = Q(null), u = Q(!1);
    let d = Q(0), p = [];
    const v = (T, S) => {
      d.value += 1, p.push(`${T}@${S}`);
    };
    Re("menuItem", { menuItemIndex: d, addMenuItem: v }), Re("id", s.id), fe(u, (T, S) => {
      T !== S && (r(T), T ? (setTimeout(() => _(), 100), document.addEventListener("click", w), document.addEventListener("touchstart", w)) : (document.removeEventListener("click", w), document.removeEventListener("touchstart", w)));
    }), we(() => {
      v(s.logoutLabel, d.value);
    });
    const m = (T, S) => {
      const D = S === "down" ? (T + 1) % p.length : (T - 1 + p.length) % p.length, C = document.getElementById(`${s.id}_item_${D}`);
      return C.ariaDisabled === "true" ? m(D, S) : C;
    }, I = (T) => {
      const S = document.activeElement.id, D = S.startsWith(`${s.id}_item_`) ? Number(S.split("_")[2]) : T === "down" ? -1 : 0;
      m(D, T).focus();
    }, _ = (T) => I("down"), L = (T) => I("up");
    let y = (T) => {
      let S = T.key;
      if (S.length > 1 && S.match(/\S/))
        return;
      S = S.toLowerCase();
      let D = p.filter((P) => P.toLowerCase().startsWith(S)), C = document.activeElement.id;
      for (let P of D) {
        let x = P.split("@")[1], N = document.getElementById(`${s.id}_item_${x}`);
        if (C !== N.id) {
          N.focus();
          break;
        }
      }
    }, w = (T) => {
      o.value.contains(T.target) || (u.value = !1);
    };
    return (T, S) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: S[9] || (S[9] = ne(
        //@ts-ignore
        (...D) => H(w) && H(w)(...D),
        ["tab"]
      )),
      ref_key: "container",
      ref: o
    }, [
      c("button", Y({
        id: T.id,
        onClick: S[0] || (S[0] = te((D) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          S[1] || (S[1] = ne(te((D) => u.value = !1, ["stop"]), ["esc"])),
          S[2] || (S[2] = ne(te((D) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          ne(te(_, ["prevent"]), ["down"]),
          ne(te(L, ["prevent"]), ["up"]),
          S[3] || (S[3] = //@ts-ignore
          (...D) => H(y) && H(y)(...D)),
          S[4] || (S[4] = ne((D) => u.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm fr-btn--icon-left", { [T.icon]: !0 }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": T.disabled,
        "aria-controls": `${T.id}_menu`,
        "aria-expanded": u.value
      }, T.$attrs), [
        c("span", null, h(T.label), 1)
      ], 16, eg),
      c("div", {
        id: `${T.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: R(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": H(a), "fr-collapsing": H(e) }]),
        role: "menu",
        "aria-labelledby": T.id,
        onKeyup: S[5] || (S[5] = ne((D) => u.value = !1, ["esc"])),
        onKeydown: [
          S[6] || (S[6] = ne((D) => u.value = !1, ["tab"])),
          ne(te(_, ["prevent"]), ["down"]),
          ne(te(L, ["prevent"]), ["up"]),
          S[7] || (S[7] = //@ts-ignore
          (...D) => H(y) && H(y)(...D))
        ],
        onTransitionend: S[8] || (S[8] = (D) => H(l)(u.value))
      }, [
        $(T.$slots, "detail", {}, () => [
          T.nom === "" && T.email === "" ? b("", !0) : (i(), f("p", ng, [
            V(h(T.nom) + " ", 1),
            T.email !== "" ? (i(), f("span", ag, h(T.email), 1)) : b("", !0)
          ]))
        ], !0),
        c("ul", rg, [
          $(T.$slots, "default", {}, void 0, !0),
          c("li", lg, [
            c("div", sg, [
              T.logoutUrl !== "" ? (i(), f("a", {
                key: 0,
                id: `${T.id}_item_${H(d) - 1}`,
                class: "fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
                role: "menuitem",
                tabindex: "-1",
                href: T.logoutUrl
              }, h(T.logoutLabel), 9, og)) : b("", !0)
            ])
          ])
        ])
      ], 42, tg)
    ], 544));
  }
}), ug = /* @__PURE__ */ Ae(ig, [["__scopeId", "data-v-3a8c3dd5"]]), dg = Symbol("header"), cg = ["aria-label"], fg = { class: "fr-btns-group" }, Yt = /* @__PURE__ */ F({
  __name: "DsfrCustomHeaderMenuLinks",
  props: {
    links: { default: () => [] },
    navAriaLabel: { default: "Menu secondaire" }
  },
  emits: ["linkClick"],
  setup(n, { emit: t }) {
    const e = t;
    return (a, r) => (i(), f("nav", {
      role: "navigation",
      "aria-label": a.navAriaLabel
    }, [
      c("ul", fg, [
        (i(!0), f(G, null, J(a.links, (l, s) => (i(), f("li", { key: s }, [
          ee(H(on), Y({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var u;
              e("linkClick", o), (u = l.onClick) == null || u.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        $(a.$slots, "default")
      ])
    ], 8, cg));
  }
}), pg = {
  role: "banner",
  class: "fr-header"
}, mg = { class: "fr-header__body" }, hg = { class: "fr-container width-inherit" }, vg = { class: "fr-header__body-row" }, gg = { class: "fr-header__brand fr-enlarge-link" }, bg = { class: "fr-header__brand-top" }, yg = { class: "fr-header__logo" }, kg = {
  key: 0,
  class: "fr-header__operator"
}, wg = ["src", "alt"], _g = {
  key: 1,
  class: "fr-header__navbar"
}, xg = ["aria-label", "title", "data-fr-opened"], Dg = ["aria-label", "title"], Tg = {
  key: 0,
  class: "fr-header__service"
}, Ig = { class: "fr-header__service-title" }, Cg = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Eg = {
  key: 0,
  class: "fr-header__service-tagline"
}, Pg = {
  key: 1,
  class: "fr-header__service"
}, Mg = { class: "fr-header__tools" }, Lg = {
  key: 0,
  class: "fr-header__tools-links"
}, Bg = { class: "fr-header__search fr-modal" }, Sg = ["aria-label"], $g = { class: "fr-container" }, Ag = { class: "fr-header__menu-links" }, Og = {
  key: 1,
  class: "flex justify-center items-center"
}, Rg = { class: "fr-header__menu fr-modal" }, Fg = {
  key: 0,
  class: "fr-container"
}, Vg = /* @__PURE__ */ F({
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
  setup(n, { emit: t }) {
    const e = n, a = t, r = st(e, "languageSelector"), l = Q(!1), s = Q(!1), o = Q(!1), u = () => {
      var y;
      o.value = !1, l.value = !1, s.value = !1, (y = document.getElementById("button-menu")) == null || y.focus();
    }, d = (y) => {
      y.key === "Escape" && u();
    };
    we(() => {
      document.addEventListener("keydown", d), a("on-mounted");
    }), Ee(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var y;
      o.value = !0, l.value = !0, s.value = !1, (y = document.getElementById("close-button")) == null || y.focus();
    }, v = () => {
      o.value = !0, l.value = !1, s.value = !0;
    }, m = u, I = Xt(), _ = k(() => {
      var y;
      return !!((y = I.operator) != null && y.call(I).length) || !!e.operatorImgSrc;
    }), L = k(() => !!I.mainnav);
    return Re(dg, () => u), (y, w) => {
      var S, D, C;
      const T = xe("RouterLink");
      return i(), f("header", pg, [
        c("div", mg, [
          c("div", hg, [
            c("div", vg, [
              c("div", gg, [
                c("div", bg, [
                  c("div", yg, [
                    ee(T, {
                      to: y.homeTo,
                      title: `${y.homeLabel} - ${y.serviceTitle}`
                    }, {
                      default: U(() => [
                        ee(H(at), {
                          "logo-text": y.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  _.value ? (i(), f("div", kg, [
                    $(y.$slots, "operator", {}, () => [
                      y.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: y.operatorImgSrc,
                        alt: y.operatorImgAlt,
                        style: Te(y.operatorImgStyle)
                      }, null, 12, wg)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  y.showSearch || L.value || (S = y.quickLinks) != null && S.length ? (i(), f("div", _g, [
                    y.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": y.showSearchLabel,
                      title: y.showSearchLabel,
                      "data-fr-opened": s.value,
                      onClick: w[0] || (w[0] = te((P) => v(), ["prevent", "stop"]))
                    }, null, 8, xg)) : b("", !0),
                    L.value || (D = y.quickLinks) != null && D.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": y.menuLabel,
                      title: y.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: w[1] || (w[1] = te((P) => p(), ["prevent", "stop"]))
                    }, null, 8, Dg)) : b("", !0)
                  ])) : b("", !0)
                ]),
                y.serviceTitle ? (i(), f("div", Tg, [
                  ee(T, Y({
                    to: y.homeTo,
                    title: `${y.homeLabel} - ${y.serviceTitle}`
                  }, y.$attrs), {
                    default: U(() => [
                      c("p", Ig, [
                        V(h(y.serviceTitle) + " ", 1),
                        y.showBeta ? (i(), f("span", Cg, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  y.serviceDescription ? (i(), f("p", Eg, h(y.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !y.serviceTitle && y.showBeta ? (i(), f("div", Pg, w[9] || (w[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              c("div", Mg, [
                (C = y.quickLinks) != null && C.length || r.value ? (i(), f("div", Lg, [
                  l.value ? b("", !0) : (i(), W(Yt, {
                    key: 0,
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel
                  }, {
                    default: U(() => [
                      $(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), W(H(rt), Y({ key: 1 }, r.value, {
                    onSelect: w[2] || (w[2] = (P) => a("language-select", P))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                c("div", Bg, [
                  $(y.$slots, "header-search"),
                  y.showSearch ? (i(), W(H(lt), {
                    key: 0,
                    "searchbar-id": y.searchbarId,
                    label: y.searchLabel,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": w[3] || (w[3] = (P) => a("update:modelValue", P)),
                    onSearch: w[4] || (w[4] = (P) => a("search", P))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : b("", !0)
                ])
              ])
            ]),
            y.showSearch || L.value || y.quickLinks && y.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: R(["fr-header__menu fr-modal", { "fr-modal--opened": o.value }]),
              "aria-label": y.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", $g, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: w[5] || (w[5] = te((P) => u(), ["prevent", "stop"]))
                }, h(y.closeMenuModalLabel), 1),
                c("div", Ag, [
                  r.value ? (i(), W(H(rt), Y({ key: 0 }, r.value, {
                    onSelect: w[6] || (w[6] = (P) => r.value.currentLanguage = P.codeIso)
                  }), null, 16)) : b("", !0),
                  l.value ? (i(), W(Yt, {
                    key: 1,
                    role: "navigation",
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel,
                    onLinkClick: H(m)
                  }, {
                    default: U(() => [
                      $(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0),
                  $(y.$slots, "header-search")
                ]),
                o.value ? $(y.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : b("", !0),
                s.value ? (i(), f("div", Og, [
                  ee(H(lt), {
                    "searchbar-id": y.searchbarId,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    "onUpdate:modelValue": w[7] || (w[7] = (P) => a("update:modelValue", P)),
                    onSearch: w[8] || (w[8] = (P) => a("search", P))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, Sg)) : b("", !0),
            $(y.$slots, "default")
          ])
        ]),
        c("div", Rg, [
          L.value && !o.value ? (i(), f("div", Fg, [
            $(y.$slots, "mainnav", { hidemodal: u })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), Ng = { class: "fr-table" }, qg = { class: "fr-table__wrapper" }, jg = { class: "fr-table__container" }, Hg = { class: "fr-table__content" }, Wg = ["id"], Kg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Qg = {
  key: 0,
  class: "fr-checkbox-group fr-checkbox-group--sm"
}, Yg = ["id", "checked"], zg = ["for"], Gg = ["tabindex", "onClick", "onKeydown"], Xg = { key: 0 }, Ug = { key: 1 }, Zg = ["data-row-key"], Jg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, eb = { class: "fr-checkbox-group fr-checkbox-group--sm" }, tb = ["id", "value"], nb = ["for"], ab = ["onKeydown"], rb = { key: 0 }, lb = ["colspan"], sb = { class: "flex gap-2 items-center" }, ob = ["selected"], ib = ["value", "selected"], ub = { class: "flex ml-1" }, db = /* @__PURE__ */ F({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ Be({
    id: { default: () => $e("table") },
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
  emits: /* @__PURE__ */ Be(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(n, { expose: t, emit: e }) {
    const a = n, r = e, l = _e(n, "selection"), s = _e(n, "rowsPerPage"), o = _e(n, "currentPage"), u = k(() => Math.max(Math.ceil(a.rows.length / s.value), 1)), d = k(() => a.pages ?? Array.from({ length: u.value }).map((E, B) => ({
      label: `${B + 1}`,
      title: `Page ${B + 1}`,
      href: `#${B + 1}`
    }))), p = k(() => o.value * s.value), v = k(() => (o.value + 1) * s.value), m = k(() => ["sm", "small"].includes(a.footerSize));
    function I(E, B) {
      const g = _.value;
      return (E[g] ?? E) < (B[g] ?? B) ? -1 : (E[g] ?? E) > (B[g] ?? B) ? 1 : 0;
    }
    const _ = _e(n, "sortedBy");
    _.value = a.sorted;
    const L = _e(n, "sortedDesc");
    function y(E) {
      if (!(!a.sortableRows || Array.isArray(a.sortableRows) && !a.sortableRows.includes(E))) {
        if (_.value === E) {
          if (L.value) {
            _.value = void 0, L.value = !1;
            return;
          }
          L.value = !0;
          return;
        }
        L.value = !1, _.value = E;
      }
    }
    const w = k(() => {
      const E = _.value ? a.rows.slice().sort(a.sortFn ?? I) : a.rows.slice();
      return L.value && E.reverse(), E;
    }), T = k(() => {
      const E = a.headersRow.map((g) => typeof g != "object" ? g : g.key), B = w.value.map((g) => Array.isArray(g) ? g : E.map((M) => g));
      return a.pagination ? B.slice(p.value, v.value) : B;
    });
    function S(E) {
      E && (l.value = T.value.map((B) => B[0][a.rowKey])), l.value.length = 0;
    }
    const D = Q(!1);
    function C() {
      D.value = l.value.length === T.value.length;
    }
    function P() {
      r("update:current-page", 0), D.value = !1, l.value.length = 0;
    }
    function x(E) {
      navigator.clipboard.writeText(E);
    }
    function N() {
      o.value = 0;
    }
    return t({ resetCurrentPage: N }), (E, B) => (i(), f("div", Ng, [
      c("div", qg, [
        c("div", jg, [
          c("div", Hg, [
            c("table", { id: E.id }, [
              c("caption", {
                class: R({ "fr-sr-only": E.noCaption })
              }, h(E.title), 3),
              c("thead", null, [
                c("tr", null, [
                  E.selectableRows ? (i(), f("th", Kg, [
                    E.showToggleAll ? (i(), f("div", Qg, [
                      c("input", {
                        id: `table-select--${E.id}-all`,
                        checked: D.value,
                        type: "checkbox",
                        onInput: B[0] || (B[0] = (g) => S(g.target.checked))
                      }, null, 40, Yg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${E.id}-all`
                      }, " Sélectionner tout ", 8, zg)
                    ])) : b("", !0)
                  ])) : b("", !0),
                  (i(!0), f(G, null, J(E.headersRow, (g, M) => (i(), f("th", Y({
                    key: typeof g == "object" ? g.key : g,
                    scope: "col",
                    ref_for: !0
                  }, typeof g == "object" && g.headerAttrs, {
                    class: {
                      "text-right": g.align === "right",
                      "text-left": g.align === "left"
                    },
                    tabindex: E.sortableRows ? 0 : void 0,
                    onClick: (j) => y(g.key ?? (Array.isArray(E.rows[0]) ? M : g)),
                    onKeydown: [
                      ne((j) => y(g.key ?? g), ["enter"]),
                      ne((j) => y(g.key ?? g), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: R({
                        "sortable-header": E.sortableRows === !0 || Array.isArray(E.sortableRows) && E.sortableRows.includes(g.key ?? g),
                        "fr-sr-only": typeof g == "object" ? g.hideLabel : !1,
                        "flex-row-reverse": typeof g == "object" ? g.align === "right" : !1
                      })
                    }, [
                      $(E.$slots, "header", Y({ ref_for: !0 }, typeof g == "object" ? g : { key: g, label: g }), () => [
                        V(h(typeof g == "object" ? g.label : g), 1)
                      ], !0),
                      _.value !== (g.key ?? g) && (E.sortableRows === !0 || Array.isArray(E.sortableRows) && E.sortableRows.includes(g.key ?? g)) ? (i(), f("span", Xg, [
                        ee(H(be), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : _.value === (g.key ?? g) ? (i(), f("span", Ug, [
                        ee(H(be), {
                          name: L.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Gg))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(G, null, J(T.value, (g, M) => (i(), f("tr", {
                  key: `row-${M}`,
                  "data-row-key": M + 1
                }, [
                  E.selectableRows ? (i(), f("th", Jg, [
                    c("div", eb, [
                      Le(c("input", {
                        id: `row-select-${E.id}-${M}`,
                        "onUpdate:modelValue": B[1] || (B[1] = (j) => l.value = j),
                        value: g[0][E.rowKey] ?? `row-${M}`,
                        type: "checkbox",
                        onChange: B[2] || (B[2] = (j) => C())
                      }, null, 40, tb), [
                        [kt, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${E.id}-${M}`
                      }, " Sélectionner la ligne " + h(M + 1), 9, nb)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(G, null, J(g, (j, A) => (i(), f("td", {
                    key: typeof j == "object" ? j[E.rowKey] : j,
                    class: R({
                      "text-right": E.headersRow[A].align === "right",
                      "text-left": E.headersRow[A].align === "left"
                    }),
                    onKeydown: [
                      ne(te((O) => x(typeof j == "object" ? j[E.rowKey] : j), ["ctrl"]), ["c"]),
                      ne(te((O) => x(typeof j == "object" ? j[E.rowKey] : j), ["meta"]), ["c"])
                    ]
                  }, [
                    $(E.$slots, "cell", Y({ ref_for: !0 }, {
                      colKey: typeof E.headersRow[A] == "object" ? E.headersRow[A].key : E.headersRow[A],
                      cell: j,
                      idx: M + 1
                    }), () => [
                      V(h(typeof j == "object" ? j[E.rowKey] : j), 1)
                    ], !0)
                  ], 42, ab))), 128))
                ], 8, Zg))), 128)),
                T.value.length === 0 ? (i(), f("tr", rb, [
                  c("td", {
                    colspan: E.selectableRows ? E.headersRow.length + 1 : E.headersRow.length
                  }, h(a.noResultLabel), 9, lb)
                ])) : b("", !0)
              ])
            ], 8, Wg)
          ])
        ])
      ]),
      c("div", {
        class: R(E.bottomActionBarClass)
      }, [
        $(E.$slots, "pagination", {}, () => [
          E.pagination && !E.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: R(["flex justify-between items-center flex-wrap", E.paginationWrapperClass])
          }, [
            E.showNbRows ? (i(), f("p", {
              key: 0,
              class: R(["fr-mb-0 fr-ml-1v", { "fr-text--sm": m.value }])
            }, h(E.rows.length) + " résulat(s)", 3)) : b("", !0),
            c("div", sb, [
              c("label", {
                class: R(["fr-label", { "fr-text--sm": m.value }]),
                for: "pagination-options"
              }, " Résultats par page : ", 2),
              Le(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": B[3] || (B[3] = (g) => s.value = g),
                class: "fr-select",
                onChange: B[4] || (B[4] = (g) => P())
              }, [
                c("option", {
                  value: "",
                  selected: !E.paginationOptions.includes(s.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, ob),
                (i(!0), f(G, null, J(E.paginationOptions, (g, M) => (i(), f("option", {
                  key: M,
                  value: g,
                  selected: +g === s.value
                }, h(g), 9, ib))), 128))
              ], 544), [
                [Ut, s.value]
              ])
            ]),
            c("div", ub, [
              c("span", {
                class: R(["self-center", { "fr-text--sm": m.value }])
              }, " Page " + h(o.value + 1) + " sur " + h(u.value), 3)
            ]),
            ee(H(sn), {
              "current-page": o.value,
              "onUpdate:currentPage": B[5] || (B[5] = (g) => o.value = g),
              pages: d.value,
              "next-page-title": "Suivant",
              "prev-page-title": "Précédent"
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), cb = /* @__PURE__ */ Ae(db, [["__scopeId", "data-v-50097005"]]), fb = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], pb = ["for"], mb = {
  key: 0,
  class: "required"
}, hb = {
  key: 0,
  class: "fr-hint-text"
}, vb = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, gb = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrCustomCheckbox",
  props: /* @__PURE__ */ Be({
    id: { default: () => $e("basic", "checkbox") },
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
  setup(n) {
    const t = n, e = k(() => t.errorMessage || t.validMessage), a = k(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _e(n, "modelValue");
    return (l, s) => (i(), f("div", {
      class: R(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      c("div", {
        class: R(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Le(c("input", Y({
          id: l.id,
          "onUpdate:modelValue": s[0] || (s[0] = (o) => r.value = o),
          name: l.name,
          type: "checkbox",
          value: l.value,
          checked: r.value === !0 || Array.isArray(r.value) && r.value.includes(l.value),
          required: l.required
        }, l.$attrs, {
          "data-testid": `input-checkbox-${l.id}`,
          "data-test": `input-checkbox-${l.id}`
        }), null, 16, fb), [
          [kt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          $(l.$slots, "label", {}, () => [
            V(h(l.label) + " ", 1),
            $(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", mb, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", hb, [
            $(l.$slots, "hint", {}, () => [
              V(h(l.hint), 1)
            ])
          ])) : b("", !0)
        ], 8, pb),
        e.value ? (i(), f("div", vb, [
          c("p", {
            class: R(["fr-message--info flex items-center", a.value])
          }, h(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), bb = ["for"], yb = {
  key: 0,
  class: "required"
}, kb = {
  key: 0,
  class: "fr-hint-text"
}, wb = ["id", "name", "disabled", "aria-disabled", "required"], _b = ["selected"], xb = ["selected", "value", "disabled", "aria-disabled"], Db = ["id"], Tb = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrCustomSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => $e("select") },
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
  setup(n) {
    const t = n;
    t.description && console.warn(
      "[DsfrSelect] : La prop `description` est dépréciée. Veuillez utiliser `hint` à la place."
    );
    const e = k(() => t.errorMessage || t.successMessage), a = k(() => t.errorMessage ? "error" : "valid"), r = function(l) {
      if (l === "")
        return null;
      let o = t.options.length > 0 && t.options[0].value !== "" && typeof t.options[0].value == "string" ? 0 : 1, u = t.options.length > o && typeof t.options[o].value == "string";
      return isNaN(l) || u ? l : parseInt(l, 10);
    };
    return (l, s) => (i(), f("div", {
      class: R(["fr-select-group", { [`fr-select-group--${a.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        $(l.$slots, "label", {}, () => [
          V(h(l.label) + " ", 1),
          $(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", yb, " *")) : b("", !0)
          ])
        ]),
        l.hint ?? l.description ? (i(), f("span", kb, h(l.hint ?? l.description), 1)) : b("", !0)
      ], 8, bb),
      c("select", Y({
        id: l.selectId,
        class: [{ [`fr-select--${a.value}`]: e.value }, "fr-select"],
        name: l.name || l.selectId,
        disabled: l.disabled,
        "aria-disabled": l.disabled,
        required: l.required
      }, l.$attrs, {
        onChange: s[0] || (s[0] = (o) => {
          var u;
          return l.$emit("update:modelValue", r((u = o.target) == null ? void 0 : u.value));
        })
      }), [
        c("option", {
          selected: !l.options.some((o) => typeof o != "object" || o === null ? o === l.modelValue : o.value === l.modelValue),
          value: "",
          disabled: "",
          hidden: ""
        }, h(l.defaultUnselectedText), 9, _b),
        (i(!0), f(G, null, J(l.options, (o, u) => (i(), f("option", {
          key: u,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, h(typeof o == "object" ? o.text : o), 9, xb))), 128))
      ], 16, wb),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${a.value}-desc-${a.value}`,
        class: R(`fr-${a.value}-text`)
      }, h(e.value), 11, Db)) : b("", !0)
    ], 2));
  }
}), Ib = {
  key: 0,
  class: "fr-sr-only"
}, Cb = ["id"], Eb = /* @__PURE__ */ F({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => $e("tooltip") },
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
  setup(n) {
    const t = n, e = Q(!1), a = Q(!1), r = Q(!1), l = Q(null), s = Q(null), o = Q("0px"), u = Q("0px"), d = Q("0px"), p = Q(!1), v = Q(0);
    async function m() {
      var K, X, re, ue, ce, ot, mn, hn;
      if (typeof document > "u" || !e.value || s.value.matches(":empty"))
        return;
      await new Promise((lr) => setTimeout(lr, 100));
      const B = (K = l.value) == null ? void 0 : K.getBoundingClientRect().top, g = (X = l.value) == null ? void 0 : X.offsetHeight, M = (re = l.value) == null ? void 0 : re.offsetWidth, j = (ue = l.value) == null ? void 0 : ue.getBoundingClientRect().left, A = (ce = s.value) == null ? void 0 : ce.offsetHeight, O = (ot = s.value) == null ? void 0 : ot.offsetWidth, Z = (mn = s.value) == null ? void 0 : mn.offsetTop, z = (hn = s.value) == null ? void 0 : hn.offsetLeft, ae = !(B - A < 0) && B + g + A >= document.documentElement.offsetHeight;
      p.value = ae;
      const De = j + M >= document.documentElement.offsetWidth, Ce = j + M / 2 - O / 2 <= 0;
      u.value = ae ? `${B - Z - A + 8}px` : `${B - Z + g - 8}px`, v.value = 1, o.value = De ? `${j - z + M - O - 4}px` : Ce ? `${j - z + 4}px` : `${j - z + M / 2 - O / 2}px`, d.value = De ? `${O / 2 - M / 2 + 4}px` : Ce ? `${-(O / 2) + M / 2 - 4}px` : "0px";
    }
    fe(e, m, { immediate: !0 });
    const I = k(() => ["sm", "small"].includes(t.size)), _ = k(() => ["md", "medium"].includes(t.size)), L = k(() => ["lg", "large"].includes(t.size)), y = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), w = k(() => `transform: translate(${o.value}, ${u.value}); --arrow-x: ${d.value}; opacity: ${v.value};'`), T = k(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": p.value,
      "fr-placement--bottom": !p.value
    })), S = (B) => {
      B.key === "Escape" && (e.value = !1, B.preventDefault());
    }, D = (B) => {
      var g;
      (B.target === l.value || (g = l.value) != null && g.contains(B.target)) && (e.value = !0);
    }, C = (B) => {
      setTimeout(() => {
        !a.value && !r.value && (e.value = !1);
      }, 50);
    };
    let P, x = !1;
    const N = () => {
      var B;
      x !== !0 && (P = (B = l.value) == null ? void 0 : B.onclick, x = !0, l.value.onclick = function(g) {
        g.stopImmediatePropagation(), g.preventDefault();
      });
    }, E = () => {
      x !== !1 && (l.value.onclick = P, x = !1, P = null);
    };
    return we(() => {
      window.addEventListener("scroll", m), l.value.addEventListener("click", () => e.value = !1), document.documentElement.addEventListener("keydown", S), document.documentElement.addEventListener("mouseover", D), t.disabled && N();
    }), Ee(() => {
      window.removeEventListener("scroll", m), document.documentElement.removeEventListener("keydown", S), document.documentElement.removeEventListener("mouseover", D);
    }), fe(() => t.disabled, () => {
      t.disabled ? N() : E();
    }), (B, g) => (i(), f(G, null, [
      (i(), W(ve(B.href !== "" ? "a" : "button"), Y({
        id: `button-${B.id}`,
        ref_key: "source",
        ref: l,
        href: B.href !== "" && !B.disabled ? B.href : void 0,
        class: {
          "fr-link": B.isLink && !B.inline,
          "fr-btn": !B.isLink,
          "fr-btn--secondary": B.secondary && !B.tertiary,
          "fr-btn--tertiary": B.tertiary && !B.secondary && !B.noOutline,
          "fr-btn--tertiary-no-outline": B.tertiary && !B.secondary && B.noOutline,
          "fr-btn--sm": I.value,
          "fr-btn--md": _.value,
          "fr-btn--lg": L.value,
          "fr-btn--icon-right": !B.isLink && !B.iconOnly && y.value && B.iconRight,
          "fr-btn--icon-left": !B.isLink && !B.iconOnly && y.value && !B.iconRight,
          "fr-link--icon-right": B.isLink && !B.inline && !B.iconOnly && y.value && B.iconRight,
          "fr-link--icon-left": B.isLink && !B.inline && !B.iconOnly && y.value && !B.iconRight,
          "inline-flex": !y.value,
          reverse: B.iconRight && !y.value,
          "fr-btn--custom-tooltip": B.iconOnly,
          "justify-center": !y.value && B.iconOnly,
          [B.icon]: y.value
        },
        "aria-disabled": B.disabled,
        "aria-labelledby": B.id,
        onMouseenter: g[0] || (g[0] = (M) => r.value = !0),
        onMouseleave: g[1] || (g[1] = (M) => {
          r.value = !1, C();
        }),
        onFocus: g[2] || (g[2] = (M) => D(M)),
        onBlur: g[3] || (g[3] = (M) => C())
      }, B.$attrs), {
        default: U(() => [
          B.iconOnly ? (i(), f("span", Ib, h(B.label), 1)) : (i(), f(G, { key: 1 }, [
            V(h(B.label), 1)
          ], 64))
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-disabled", "aria-labelledby"])),
      c("p", {
        id: B.id,
        ref_key: "tooltip",
        ref: s,
        class: R(["fr-tooltip fr-placement", T.value]),
        style: Te(w.value),
        role: "tooltip",
        "aria-hidden": "true",
        onMouseenter: g[4] || (g[4] = (M) => a.value = !0),
        onMouseleave: g[5] || (g[5] = (M) => {
          a.value = !1, C();
        })
      }, [
        $(B.$slots, "default", {}, () => [
          V(h(B.content), 1)
        ], !0)
      ], 46, Cb)
    ], 64));
  }
}), rr = /* @__PURE__ */ Ae(Eb, [["__scopeId", "data-v-d14dbb55"]]), Pb = /* @__PURE__ */ F({
  __name: "DsfrButtonTooltip",
  setup(n) {
    return (t, e) => (i(), W(rr, Y({ "is-link": !1 }, t.$attrs), {
      default: U(() => [
        $(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Mb = /* @__PURE__ */ F({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(n) {
    return (t, e) => (i(), W(rr, Y({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: U(() => [
        $(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), Lb = ["id", "href"], Bb = /* @__PURE__ */ F({
  __name: "DsfrLink",
  props: {
    id: { default: () => $e("link") },
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
  setup(n) {
    const t = n, e = k(() => ["sm", "small"].includes(t.size)), a = k(() => ["md", "medium"].includes(t.size)), r = k(() => ["lg", "large"].includes(t.size)), l = k(() => t.asButton ? "btn" : "link"), s = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-"));
    return (o, u) => (i(), f("a", Y({
      id: `link-${o.id}`,
      ref: "source",
      href: o.href !== "" && !o.disabled ? o.href : void 0,
      class: {
        [`fr-${l.value}`]: !o.inline,
        "fr-btn--secondary": o.secondary && !o.tertiary,
        "fr-btn--tertiary": o.tertiary && !o.secondary && !o.noOutline,
        "fr-btn--tertiary-no-outline": o.tertiary && !o.secondary && o.noOutline,
        [`fr-${l.value}--sm`]: e.value,
        [`fr-${l.value}--md`]: a.value,
        [`fr-${l.value}--lg`]: r.value,
        [`fr-${l.value}--icon-right`]: !o.iconOnly && s.value && o.iconRight,
        [`fr-${l.value}--icon-left`]: !o.iconOnly && s.value && !o.iconRight,
        reverse: o.iconRight && !s.value,
        "fr-btn--custom-tooltip": o.iconOnly,
        "justify-center": !s.value && o.iconOnly,
        [o.icon]: s.value
      }
    }, o.$attrs), [
      $(o.$slots, "default", {}, () => [
        V(h(o.label), 1)
      ], !0)
    ], 16, Lb));
  }
}), Sb = /* @__PURE__ */ Ae(Bb, [["__scopeId", "data-v-edcd30c2"]]), $b = (n, t) => n.matches ? n.matches(t) : n.msMatchesSelector ? n.msMatchesSelector(t) : n.webkitMatchesSelector ? n.webkitMatchesSelector(t) : null, Ab = (n, t) => {
  let e = n;
  for (; e && e.nodeType === 1; ) {
    if ($b(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, Ob = (n, t) => n.closest ? n.closest(t) : Ab(n, t), Rb = (n) => !!(n && typeof n.then == "function");
class Fb {
  constructor({
    search: t,
    autoSelect: e = !1,
    setValue: a = () => {
    },
    setAttribute: r = () => {
    },
    onUpdate: l = () => {
    },
    onSubmit: s = () => {
    },
    onShow: o = () => {
    },
    autocorrect: u = !1,
    onHide: d = () => {
    },
    onLoading: p = () => {
    },
    onLoaded: v = () => {
    },
    submitOnEnter: m = !1
  } = {}) {
    q(this, "value", "");
    q(this, "searchCounter", 0);
    q(this, "results", []);
    q(this, "selectedIndex", -1);
    q(this, "selectedResult", null);
    q(this, "destroy", () => {
      this.search = null, this.setValue = null, this.setAttribute = null, this.onUpdate = null, this.onSubmit = null, this.autocorrect = null, this.onShow = null, this.onHide = null, this.onLoading = null, this.onLoaded = null;
    });
    q(this, "handleInput", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    q(this, "handleKeyDown", (t) => {
      const { key: e } = t;
      switch (e) {
        case "Up":
        case "Down":
        case "ArrowUp":
        case "ArrowDown": {
          const a = e === "ArrowUp" || e === "Up" ? this.selectedIndex - 1 : this.selectedIndex + 1;
          t.preventDefault(), this.handleArrows(a);
          break;
        }
        case "Tab": {
          this.selectResult();
          break;
        }
        case "Enter": {
          const a = t.target.getAttribute("aria-activedescendant").length > 0;
          this.selectedResult = this.results[this.selectedIndex] || this.selectedResult, this.selectResult(), this.submitOnEnter ? this.selectedResult && this.onSubmit(this.selectedResult) : a ? t.preventDefault() : (this.selectedResult && this.onSubmit(this.selectedResult), this.selectedResult = null);
          break;
        }
        case "Esc":
        case "Escape": {
          this.hideResults(), this.setValue();
          break;
        }
        default:
          return;
      }
    });
    q(this, "handleFocus", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    q(this, "handleBlur", () => {
      this.hideResults();
    });
    // The mousedown event fires before the blur event. Calling preventDefault() when
    // the results list is clicked will prevent it from taking focus, firing the
    // blur event on the input element, and closing the results list before click fires.
    q(this, "handleResultMouseDown", (t) => {
      t.preventDefault();
    });
    q(this, "handleResultClick", (t) => {
      const { target: e } = t, a = Ob(e, "[data-result-index]");
      if (a) {
        this.selectedIndex = parseInt(a.dataset.resultIndex, 10);
        const r = this.results[this.selectedIndex];
        this.selectResult(), this.onSubmit(r);
      }
    });
    q(this, "handleArrows", (t) => {
      const e = this.results.length;
      this.selectedIndex = (t % e + e) % e, this.onUpdate(this.results, this.selectedIndex);
    });
    q(this, "selectResult", () => {
      const t = this.results[this.selectedIndex];
      t && this.setValue(t), this.hideResults();
    });
    q(this, "updateResults", (t) => {
      const e = ++this.searchCounter;
      this.onLoading(), this.search(t).then((a) => {
        if (e === this.searchCounter) {
          if (this.results = a, this.onLoaded(), this.results.length === 0) {
            this.hideResults();
            return;
          }
          this.selectedIndex = this.autoSelect ? 0 : -1, this.onUpdate(this.results, this.selectedIndex), this.showResults();
        }
      });
    });
    q(this, "showResults", () => {
      this.setAttribute("aria-expanded", !0), this.onShow();
    });
    q(this, "hideResults", () => {
      this.selectedIndex = -1, this.results = [], this.setAttribute("aria-expanded", !1), this.setAttribute("aria-activedescendant", ""), this.onUpdate(this.results, this.selectedIndex), this.onHide();
    });
    // Make sure selected result isn't scrolled out of view
    q(this, "checkSelectedResultVisible", (t) => {
      const e = t.querySelector(
        `[data-result-index="${this.selectedIndex}"]`
      );
      if (!e)
        return;
      const a = t.getBoundingClientRect(), r = e.getBoundingClientRect();
      r.top < a.top ? t.scrollTop -= a.top - r.top : r.bottom > a.bottom && (t.scrollTop += r.bottom - a.bottom);
    });
    this.search = Rb(t) ? t : (I) => Promise.resolve(t(I)), this.autoSelect = e, this.setValue = a, this.setAttribute = r, this.onUpdate = l, this.onSubmit = s, this.autocorrect = u, this.onShow = o, this.onHide = d, this.onLoading = p, this.onLoaded = v, this.submitOnEnter = m;
  }
}
const Vb = (n, t) => {
  const e = n.getBoundingClientRect(), a = t.getBoundingClientRect();
  return /* 1 */ e.bottom + a.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - a.height > 0 ? "above" : "below";
}, Nb = (n, t, e) => {
  let a;
  return function() {
    const l = this, s = arguments, o = function() {
      a = null, n.apply(l, s);
    };
    clearTimeout(a), a = setTimeout(o, t);
  };
}, qb = (n) => {
  if (n != null && n.length) {
    const t = n.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? n.substring(1) : n
    };
  }
}, jb = {
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
      default: (n) => n
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
    const n = new Fb({
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
    return this.debounceTime > 0 && (n.handleInput = Nb(n.handleInput, this.debounceTime)), {
      core: n,
      value: this.defaultValue,
      resultListId: `${this.baseClass}-result-list-${zt()}`,
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
        class: n,
        style: t,
        ...e
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
        ...e
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
      const n = this.position === "below" ? "top" : "bottom", t = qb(this.resultListLabel);
      return {
        id: this.resultListId,
        class: `${this.baseClass}-result-list`,
        role: "listbox",
        [t == null ? void 0 : t.attribute]: t == null ? void 0 : t.content,
        style: {
          position: "absolute",
          zIndex: 1,
          width: "100%",
          visibility: this.expanded ? "visible" : "hidden",
          pointerEvents: this.expanded ? "auto" : "none",
          [n]: "100%"
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
      return this.results.map((n, t) => ({
        id: `${this.baseClass}-result-${t}`,
        class: `${this.baseClass}-result`,
        "data-result-index": t,
        role: "option",
        ...this.selectedIndex === t ? { "aria-selected": "true" } : {}
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Vb(
      this.$refs.input,
      this.$refs.resultList
    )), this.core.checkSelectedResultVisible(this.$refs.resultList));
  },
  methods: {
    setValue(n) {
      this.value = n ? this.getResultValue(n) : "";
    },
    handleUpdate(n, t) {
      this.results = n, this.selectedIndex = t, this.$emit("update", n, t);
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
    handleInput(n) {
      this.value = n.target.value, this.core.handleInput(n);
    },
    handleSubmit(n) {
      this.$emit("submit", n);
    },
    handleDocumentClick(n) {
      this.$refs.root.contains(n.target) || this.core.hideResults();
    }
  }
};
function Hb(n, t, e, a, r, l) {
  return i(), f("div", Y({ ref: "root" }, {
    class: n.$attrs.class,
    ...n.$attrs.style ? { style: n.$attrs.style } : {}
  }), [
    $(n.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      c("div", Ie(wt(l.rootProps)), [
        c("input", Y({ ref: "input" }, l.inputProps, {
          onInput: t[0] || (t[0] = (...s) => l.handleInput && l.handleInput(...s)),
          onKeydown: t[1] || (t[1] = (...s) => r.core.handleKeyDown && r.core.handleKeyDown(...s)),
          onFocus: t[2] || (t[2] = (...s) => r.core.handleFocus && r.core.handleFocus(...s)),
          onBlur: t[3] || (t[3] = (...s) => r.core.handleBlur && r.core.handleBlur(...s))
        }), null, 16),
        c("ul", Y({ ref: "resultList" }, l.resultListProps, br(l.resultListListeners, !0)), [
          (i(!0), f(G, null, J(r.results, (s, o) => $(n.$slots, "result", {
            result: s,
            props: l.resultProps[o]
          }, () => [
            (i(), f("li", Y({
              key: l.resultProps[o].id,
              ref_for: !0
            }, l.resultProps[o]), h(e.getResultValue(s)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Wb = /* @__PURE__ */ Ae(jb, [["render", Hb]]);
var Kb = {
  install: function(n, t) {
    n.use(tm), n.component("RouterLink", rv), n.component("DsfrFacets", Tv), n.component("DsfrSelectMultiple", Jv), n.component("DsfrMenu", Mv), n.component("DsfrMenuLink", $v), n.component("DsfrHeaderMenu", ug), n.component("DsfrCustomHeader", Vg), n.component("DsfrCustomHeaderMenuLinks", Yt), n.component("DsfrCustomDataTable", cb), n.component("DsfrCustomCheckbox", gb), n.component("DsfrCustomSelect", Tb), n.component("DsfrButtonTooltip", Pb), n.component("DsfrLinkTooltip", Mb), n.component("DsfrLink", Sb), n.component("autocomplete", Wb);
  },
  methods: tv,
  utils: nv
};
window && (window.DSFR = Kb);
export {
  Kb as default
};
//# sourceMappingURL=dsfr.es.js.map
