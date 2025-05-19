var sr = Object.defineProperty;
var or = (a, t, e) => t in a ? sr(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var q = (a, t, e) => or(a, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as F, h as ha, ref as Q, computed as k, onMounted as xe, watch as pe, onUnmounted as Ee, Comment as ir, cloneVNode as ur, openBlock as i, createElementBlock as f, normalizeClass as R, createElementVNode as c, withModifiers as ne, createTextVNode as V, toDisplayString as h, unref as j, Fragment as z, renderList as Z, createVNode as ae, withKeys as re, withCtx as U, createBlock as H, resolveDynamicComponent as be, mergeProps as Y, createCommentVNode as b, useId as zt, inject as Qe, toRef as st, renderSlot as $, provide as Re, resolveComponent as Te, useCssVars as Gt, nextTick as Ga, normalizeStyle as Ie, normalizeProps as Ce, mergeModels as Le, useModel as De, withDirectives as Be, vModelCheckbox as kt, guardReactiveProps as wt, useAttrs as dr, useSlots as Xt, hasInjectionContext as cr, useTemplateRef as fr, reactive as pr, Teleport as mr, vModelSelect as Ut, onBeforeUnmount as hr, Transition as vr, vShow as gr, vModelText as va, toHandlers as br } from "vue";
const Xa = /^[a-z0-9]+(-[a-z0-9]+)*$/, _t = (a, t, e, n = "") => {
  const r = a.split(":");
  if (a.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3)
      return null;
    n = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length)
    return null;
  if (r.length > 1) {
    const o = r.pop(), u = r.pop(), d = {
      // Allow provider without '@': "provider:prefix:name"
      provider: r.length > 0 ? r[0] : n,
      prefix: u,
      name: o
    };
    return t && !dt(d) ? null : d;
  }
  const l = r[0], s = l.split("-");
  if (s.length > 1) {
    const o = {
      provider: n,
      prefix: s.shift(),
      name: s.join("-")
    };
    return t && !dt(o) ? null : o;
  }
  if (e && n === "") {
    const o = {
      provider: n,
      prefix: "",
      name: l
    };
    return t && !dt(o, e) ? null : o;
  }
  return null;
}, dt = (a, t) => a ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && a.prefix === "" || a.prefix) && a.name) : !1, Ua = Object.freeze(
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
  ...Ua,
  ...pt
}), $t = Object.freeze({
  ...xt,
  body: "",
  hidden: !1
});
function yr(a, t) {
  const e = {};
  !a.hFlip != !t.hFlip && (e.hFlip = !0), !a.vFlip != !t.vFlip && (e.vFlip = !0);
  const n = ((a.rotate || 0) + (t.rotate || 0)) % 4;
  return n && (e.rotate = n), e;
}
function ga(a, t) {
  const e = yr(a, t);
  for (const n in $t)
    n in pt ? n in a && !(n in e) && (e[n] = pt[n]) : n in t ? e[n] = t[n] : n in a && (e[n] = a[n]);
  return e;
}
function kr(a, t) {
  const e = a.icons, n = a.aliases || /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function l(s) {
    if (e[s])
      return r[s] = [];
    if (!(s in r)) {
      r[s] = null;
      const o = n[s] && n[s].parent, u = o && l(o);
      u && (r[s] = [o].concat(u));
    }
    return r[s];
  }
  return Object.keys(e).concat(Object.keys(n)).forEach(l), r;
}
function wr(a, t, e) {
  const n = a.icons, r = a.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function s(o) {
    l = ga(
      n[o] || r[o],
      l
    );
  }
  return s(t), e.forEach(s), ga(a, l);
}
function Za(a, t) {
  const e = [];
  if (typeof a != "object" || typeof a.icons != "object")
    return e;
  a.not_found instanceof Array && a.not_found.forEach((r) => {
    t(r, null), e.push(r);
  });
  const n = kr(a);
  for (const r in n) {
    const l = n[r];
    l && (t(r, wr(a, r, l)), e.push(r));
  }
  return e;
}
const _r = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Ua
};
function Mt(a, t) {
  for (const e in t)
    if (e in a && typeof a[e] != typeof t[e])
      return !1;
  return !0;
}
function Ja(a) {
  if (typeof a != "object" || a === null)
    return null;
  const t = a;
  if (typeof t.prefix != "string" || !a.icons || typeof a.icons != "object" || !Mt(a, _r))
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
  const n = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const r in n) {
    const l = n[r], s = l.parent;
    if (
      // Name cannot be empty
      !r || // Parent must be set and point to existing icon
      typeof s != "string" || !e[s] && !n[s] || // Check other props
      !Mt(
        l,
        $t
      )
    )
      return null;
  }
  return t;
}
const ba = /* @__PURE__ */ Object.create(null);
function xr(a, t) {
  return {
    provider: a,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function qe(a, t) {
  const e = ba[a] || (ba[a] = /* @__PURE__ */ Object.create(null));
  return e[t] || (e[t] = xr(a, t));
}
function Zt(a, t) {
  return Ja(t) ? Za(t, (e, n) => {
    n ? a.icons[e] = n : a.missing.add(e);
  }) : [];
}
function Dr(a, t, e) {
  try {
    if (typeof e.body == "string")
      return a.icons[t] = { ...e }, !0;
  } catch {
  }
  return !1;
}
let tt = !1;
function en(a) {
  return typeof a == "boolean" && (tt = a), tt;
}
function Tr(a) {
  const t = typeof a == "string" ? _t(a, !0, tt) : a;
  if (t) {
    const e = qe(t.provider, t.prefix), n = t.name;
    return e.icons[n] || (e.missing.has(n) ? null : void 0);
  }
}
function Ir(a, t) {
  const e = _t(a, !0, tt);
  if (!e)
    return !1;
  const n = qe(e.provider, e.prefix);
  return t ? Dr(n, e.name, t) : (n.missing.add(e.name), !0);
}
function Cr(a, t) {
  if (typeof a != "object")
    return !1;
  if (typeof t != "string" && (t = a.provider || ""), tt && !t && !a.prefix) {
    let r = !1;
    return Ja(a) && (a.prefix = "", Za(a, (l, s) => {
      Ir(l, s) && (r = !0);
    })), r;
  }
  const e = a.prefix;
  if (!dt({
    provider: t,
    prefix: e,
    name: "a"
  }))
    return !1;
  const n = qe(t, e);
  return !!Zt(n, a);
}
const tn = Object.freeze({
  width: null,
  height: null
}), an = Object.freeze({
  // Dimensions
  ...tn,
  // Transformations
  ...pt
}), Er = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Pr = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ya(a, t, e) {
  if (t === 1)
    return a;
  if (e = e || 100, typeof a == "number")
    return Math.ceil(a * t * e) / e;
  if (typeof a != "string")
    return a;
  const n = a.split(Er);
  if (n === null || !n.length)
    return a;
  const r = [];
  let l = n.shift(), s = Pr.test(l);
  for (; ; ) {
    if (s) {
      const o = parseFloat(l);
      isNaN(o) ? r.push(l) : r.push(Math.ceil(o * t * e) / e);
    } else
      r.push(l);
    if (l = n.shift(), l === void 0)
      return r.join("");
    s = !s;
  }
}
function Mr(a, t = "defs") {
  let e = "";
  const n = a.indexOf("<" + t);
  for (; n >= 0; ) {
    const r = a.indexOf(">", n), l = a.indexOf("</" + t);
    if (r === -1 || l === -1)
      break;
    const s = a.indexOf(">", l);
    if (s === -1)
      break;
    e += a.slice(r + 1, l).trim(), a = a.slice(0, n).trim() + a.slice(s + 1);
  }
  return {
    defs: e,
    content: a
  };
}
function Lr(a, t) {
  return a ? "<defs>" + a + "</defs>" + t : t;
}
function Br(a, t, e) {
  const n = Mr(a);
  return Lr(n.defs, t + n.content + e);
}
const Sr = (a) => a === "unset" || a === "undefined" || a === "none";
function $r(a, t) {
  const e = {
    ...xt,
    ...a
  }, n = {
    ...an,
    ...t
  }, r = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  let l = e.body;
  [e, n].forEach((B) => {
    const y = [], w = B.hFlip, T = B.vFlip;
    let S = B.rotate;
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
  const s = n.width, o = n.height, u = r.width, d = r.height;
  let p, v;
  s === null ? (v = o === null ? "1em" : o === "auto" ? d : o, p = ya(v, u / d)) : (p = s === "auto" ? u : s, v = o === null ? ya(p, d / u) : o === "auto" ? d : o);
  const m = {}, I = (B, y) => {
    Sr(y) || (m[B] = y.toString());
  };
  I("width", p), I("height", v);
  const x = [r.left, r.top, u, d];
  return m.viewBox = x.join(" "), {
    attributes: m,
    viewBox: x,
    body: l
  };
}
const Ar = /\sid="(\S+)"/g, Or = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Rr = 0;
function Fr(a, t = Or) {
  const e = [];
  let n;
  for (; n = Ar.exec(a); )
    e.push(n[1]);
  if (!e.length)
    return a;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return e.forEach((l) => {
    const s = typeof t == "function" ? t(l) : t + (Rr++).toString(), o = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    a = a.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + o + ')([")]|\\.[a-z])', "g"),
      "$1" + s + r + "$3"
    );
  }), a = a.replace(new RegExp(r, "g"), ""), a;
}
const At = /* @__PURE__ */ Object.create(null);
function Vr(a, t) {
  At[a] = t;
}
function Ot(a) {
  return At[a] || At[""];
}
function Jt(a) {
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
const ea = /* @__PURE__ */ Object.create(null), Ge = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ct = [];
for (; Ge.length > 0; )
  Ge.length === 1 || Math.random() > 0.5 ? ct.push(Ge.shift()) : ct.push(Ge.pop());
ea[""] = Jt({
  resources: ["https://api.iconify.design"].concat(ct)
});
function Nr(a, t) {
  const e = Jt(t);
  return e === null ? !1 : (ea[a] = e, !0);
}
function ta(a) {
  return ea[a];
}
const qr = () => {
  let a;
  try {
    if (a = fetch, typeof a == "function")
      return a;
  } catch {
  }
};
let ka = qr();
function jr(a, t) {
  const e = ta(a);
  if (!e)
    return 0;
  let n;
  if (!e.maxURL)
    n = 0;
  else {
    let r = 0;
    e.resources.forEach((s) => {
      r = Math.max(r, s.length);
    });
    const l = t + ".json?icons=";
    n = e.maxURL - r - e.path.length - l.length;
  }
  return n;
}
function Hr(a) {
  return a === 404;
}
const Wr = (a, t, e) => {
  const n = [], r = jr(a, t), l = "icons";
  let s = {
    type: l,
    provider: a,
    prefix: t,
    icons: []
  }, o = 0;
  return e.forEach((u, d) => {
    o += u.length + 1, o >= r && d > 0 && (n.push(s), s = {
      type: l,
      provider: a,
      prefix: t,
      icons: []
    }, o = u.length), s.icons.push(u);
  }), n.push(s), n;
};
function Kr(a) {
  if (typeof a == "string") {
    const t = ta(a);
    if (t)
      return t.path;
  }
  return "/";
}
const Qr = (a, t, e) => {
  if (!ka) {
    e("abort", 424);
    return;
  }
  let n = Kr(t.provider);
  switch (t.type) {
    case "icons": {
      const l = t.prefix, o = t.icons.join(","), u = new URLSearchParams({
        icons: o
      });
      n += l + ".json?" + u.toString();
      break;
    }
    case "custom": {
      const l = t.uri;
      n += l.slice(0, 1) === "/" ? l.slice(1) : l;
      break;
    }
    default:
      e("abort", 400);
      return;
  }
  let r = 503;
  ka(a + n).then((l) => {
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
function zr(a) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, e = /* @__PURE__ */ Object.create(null);
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
function nn(a, t) {
  a.forEach((e) => {
    const n = e.loaderCallbacks;
    n && (e.loaderCallbacks = n.filter((r) => r.id !== t));
  });
}
function Gr(a) {
  a.pendingCallbacksFlag || (a.pendingCallbacksFlag = !0, setTimeout(() => {
    a.pendingCallbacksFlag = !1;
    const t = a.loaderCallbacks ? a.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let e = !1;
    const n = a.provider, r = a.prefix;
    t.forEach((l) => {
      const s = l.icons, o = s.pending.length;
      s.pending = s.pending.filter((u) => {
        if (u.prefix !== r)
          return !0;
        const d = u.name;
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
          return e = !0, !0;
        return !1;
      }), s.pending.length !== o && (e || nn([a], l.id), l.callback(
        s.loaded.slice(0),
        s.missing.slice(0),
        s.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let Xr = 0;
function Ur(a, t, e) {
  const n = Xr++, r = nn.bind(null, e, n);
  if (!t.pending.length)
    return r;
  const l = {
    id: n,
    icons: t,
    callback: a,
    abort: r
  };
  return e.forEach((s) => {
    (s.loaderCallbacks || (s.loaderCallbacks = [])).push(l);
  }), r;
}
function Zr(a, t = !0, e = !1) {
  const n = [];
  return a.forEach((r) => {
    const l = typeof r == "string" ? _t(r, t, e) : r;
    l && n.push(l);
  }), n;
}
var Jr = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function el(a, t, e, n) {
  const r = a.resources.length, l = a.random ? Math.floor(Math.random() * r) : a.index;
  let s;
  if (a.random) {
    let P = a.resources.slice(0);
    for (s = []; P.length > 1; ) {
      const _ = Math.floor(Math.random() * P.length);
      s.push(P[_]), P = P.slice(0, _).concat(P.slice(_ + 1));
    }
    s = s.concat(P);
  } else
    s = a.resources.slice(l).concat(a.resources.slice(0, l));
  const o = Date.now();
  let u = "pending", d = 0, p, v = null, m = [], I = [];
  typeof n == "function" && I.push(n);
  function x() {
    v && (clearTimeout(v), v = null);
  }
  function B() {
    u === "pending" && (u = "aborted"), x(), m.forEach((P) => {
      P.status === "pending" && (P.status = "aborted");
    }), m = [];
  }
  function y(P, _) {
    _ && (I = []), typeof P == "function" && I.push(P);
  }
  function w() {
    return {
      startTime: o,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: m.length,
      subscribe: y,
      abort: B
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
  function D(P, _, N) {
    const E = _ !== "success";
    switch (m = m.filter((M) => M !== P), u) {
      case "pending":
        break;
      case "failed":
        if (E || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (_ === "abort") {
      p = N, T();
      return;
    }
    if (E) {
      p = N, m.length || (s.length ? C() : T());
      return;
    }
    if (x(), S(), !a.random) {
      const M = a.resources.indexOf(P.resource);
      M !== -1 && M !== a.index && (a.index = M);
    }
    u = "completed", I.forEach((M) => {
      M(N);
    });
  }
  function C() {
    if (u !== "pending")
      return;
    x();
    const P = s.shift();
    if (P === void 0) {
      if (m.length) {
        v = setTimeout(() => {
          x(), u === "pending" && (S(), T());
        }, a.timeout);
        return;
      }
      T();
      return;
    }
    const _ = {
      status: "pending",
      resource: P,
      callback: (N, E) => {
        D(_, N, E);
      }
    };
    m.push(_), d++, v = setTimeout(C, a.rotate), e(P, t, _.callback);
  }
  return setTimeout(C), w;
}
function rn(a) {
  const t = {
    ...Jr,
    ...a
  };
  let e = [];
  function n() {
    e = e.filter((o) => o().status === "pending");
  }
  function r(o, u, d) {
    const p = el(
      t,
      o,
      u,
      (v, m) => {
        n(), d && d(v, m);
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
    cleanup: n
  };
}
function wa() {
}
const Lt = /* @__PURE__ */ Object.create(null);
function tl(a) {
  if (!Lt[a]) {
    const t = ta(a);
    if (!t)
      return;
    const e = rn(t), n = {
      config: t,
      redundancy: e
    };
    Lt[a] = n;
  }
  return Lt[a];
}
function al(a, t, e) {
  let n, r;
  if (typeof a == "string") {
    const l = Ot(a);
    if (!l)
      return e(void 0, 424), wa;
    r = l.send;
    const s = tl(a);
    s && (n = s.redundancy);
  } else {
    const l = Jt(a);
    if (l) {
      n = rn(l);
      const s = a.resources ? a.resources[0] : "", o = Ot(s);
      o && (r = o.send);
    }
  }
  return !n || !r ? (e(void 0, 424), wa) : n.query(t, r, e)().abort;
}
const _a = "iconify2", at = "iconify", ln = at + "-count", xa = at + "-version", sn = 36e5, nl = 168, rl = 50;
function Rt(a, t) {
  try {
    return a.getItem(t);
  } catch {
  }
}
function aa(a, t, e) {
  try {
    return a.setItem(t, e), !0;
  } catch {
  }
}
function Da(a, t) {
  try {
    a.removeItem(t);
  } catch {
  }
}
function Ft(a, t) {
  return aa(a, ln, t.toString());
}
function Vt(a) {
  return parseInt(Rt(a, ln)) || 0;
}
const Dt = {
  local: !0,
  session: !0
}, on = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let na = !1;
function ll(a) {
  na = a;
}
let it = typeof window > "u" ? {} : window;
function un(a) {
  const t = a + "Storage";
  try {
    if (it && it[t] && typeof it[t].length == "number")
      return it[t];
  } catch {
  }
  Dt[a] = !1;
}
function dn(a, t) {
  const e = un(a);
  if (!e)
    return;
  const n = Rt(e, xa);
  if (n !== _a) {
    if (n) {
      const o = Vt(e);
      for (let u = 0; u < o; u++)
        Da(e, at + u.toString());
    }
    aa(e, xa, _a), Ft(e, 0);
    return;
  }
  const r = Math.floor(Date.now() / sn) - nl, l = (o) => {
    const u = at + o.toString(), d = Rt(e, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > r && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        t(p, o))
          return !0;
      } catch {
      }
      Da(e, u);
    }
  };
  let s = Vt(e);
  for (let o = s - 1; o >= 0; o--)
    l(o) || (o === s - 1 ? (s--, Ft(e, s)) : on[a].add(o));
}
function cn() {
  if (!na) {
    ll(!0);
    for (const a in Dt)
      dn(a, (t) => {
        const e = t.data, n = t.provider, r = e.prefix, l = qe(
          n,
          r
        );
        if (!Zt(l, e).length)
          return !1;
        const s = e.lastModified || -1;
        return l.lastModifiedCached = l.lastModifiedCached ? Math.min(l.lastModifiedCached, s) : s, !0;
      });
  }
}
function sl(a, t) {
  const e = a.lastModifiedCached;
  if (
    // Matches or newer
    e && e >= t
  )
    return e === t;
  if (a.lastModifiedCached = t, e)
    for (const n in Dt)
      dn(n, (r) => {
        const l = r.data;
        return r.provider !== a.provider || l.prefix !== a.prefix || l.lastModified === t;
      });
  return !0;
}
function ol(a, t) {
  na || cn();
  function e(n) {
    let r;
    if (!Dt[n] || !(r = un(n)))
      return;
    const l = on[n];
    let s;
    if (l.size)
      l.delete(s = Array.from(l).shift());
    else if (s = Vt(r), s >= rl || !Ft(r, s + 1))
      return;
    const o = {
      cached: Math.floor(Date.now() / sn),
      provider: a.provider,
      data: t
    };
    return aa(
      r,
      at + s.toString(),
      JSON.stringify(o)
    );
  }
  t.lastModified && !sl(a, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), e("local") || e("session"));
}
function Ta() {
}
function il(a) {
  a.iconsLoaderFlag || (a.iconsLoaderFlag = !0, setTimeout(() => {
    a.iconsLoaderFlag = !1, Gr(a);
  }));
}
function ul(a) {
  const t = [], e = [];
  return a.forEach((n) => {
    (n.match(Xa) ? t : e).push(n);
  }), {
    valid: t,
    invalid: e
  };
}
function Xe(a, t, e, n) {
  function r() {
    const l = a.pendingIcons;
    t.forEach((s) => {
      l && l.delete(s), a.icons[s] || a.missing.add(s);
    });
  }
  if (e && typeof e == "object")
    try {
      if (!Zt(a, e).length) {
        r();
        return;
      }
      n && ol(a, e);
    } catch (l) {
      console.error(l);
    }
  r(), il(a);
}
function Ia(a, t) {
  a instanceof Promise ? a.then((e) => {
    t(e);
  }).catch(() => {
    t(null);
  }) : t(a);
}
function dl(a, t) {
  a.iconsToLoad ? a.iconsToLoad = a.iconsToLoad.concat(t).sort() : a.iconsToLoad = t, a.iconsQueueFlag || (a.iconsQueueFlag = !0, setTimeout(() => {
    a.iconsQueueFlag = !1;
    const { provider: e, prefix: n } = a, r = a.iconsToLoad;
    if (delete a.iconsToLoad, !r || !r.length)
      return;
    const l = a.loadIcon;
    if (a.loadIcons && (r.length > 1 || !l)) {
      Ia(
        a.loadIcons(r, n, e),
        (p) => {
          Xe(a, r, p, !1);
        }
      );
      return;
    }
    if (l) {
      r.forEach((p) => {
        const v = l(p, n, e);
        Ia(v, (m) => {
          const I = m ? {
            prefix: n,
            icons: {
              [p]: m
            }
          } : null;
          Xe(a, [p], I, !1);
        });
      });
      return;
    }
    const { valid: s, invalid: o } = ul(r);
    if (o.length && Xe(a, o, null, !1), !s.length)
      return;
    const u = n.match(Xa) ? Ot(e) : null;
    if (!u) {
      Xe(a, s, null, !1);
      return;
    }
    u.prepare(e, n, s).forEach((p) => {
      al(e, p, (v) => {
        Xe(a, p.icons, v, !0);
      });
    });
  }));
}
const cl = (a, t) => {
  const e = Zr(a, !0, en()), n = zr(e);
  if (!n.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        n.loaded,
        n.missing,
        n.pending,
        Ta
      );
    }), () => {
      u = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), l = [];
  let s, o;
  return n.pending.forEach((u) => {
    const { provider: d, prefix: p } = u;
    if (p === o && d === s)
      return;
    s = d, o = p, l.push(qe(d, p));
    const v = r[d] || (r[d] = /* @__PURE__ */ Object.create(null));
    v[p] || (v[p] = []);
  }), n.pending.forEach((u) => {
    const { provider: d, prefix: p, name: v } = u, m = qe(d, p), I = m.pendingIcons || (m.pendingIcons = /* @__PURE__ */ new Set());
    I.has(v) || (I.add(v), r[d][p].push(v));
  }), l.forEach((u) => {
    const d = r[u.provider][u.prefix];
    d.length && dl(u, d);
  }), t ? Ur(t, n, l) : Ta;
};
function fl(a, t) {
  const e = {
    ...a
  };
  for (const n in t) {
    const r = t[n], l = typeof r;
    n in tn ? (r === null || r && (l === "string" || l === "number")) && (e[n] = r) : l === typeof e[n] && (e[n] = n === "rotate" ? r % 4 : r);
  }
  return e;
}
const pl = /[\s,]+/;
function ml(a, t) {
  t.split(pl).forEach((e) => {
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
function hl(a, t = 0) {
  const e = a.replace(/^-?[0-9.]*/, "");
  function n(r) {
    for (; r < 0; )
      r += 4;
    return r % 4;
  }
  if (e === "") {
    const r = parseInt(a);
    return isNaN(r) ? 0 : n(r);
  } else if (e !== a) {
    let r = 0;
    switch (e) {
      case "%":
        r = 25;
        break;
      case "deg":
        r = 90;
    }
    if (r) {
      let l = parseFloat(a.slice(0, a.length - e.length));
      return isNaN(l) ? 0 : (l = l / r, l % 1 === 0 ? n(l) : 0);
    }
  }
  return t;
}
function vl(a, t) {
  let e = a.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in t)
    e += " " + n + '="' + t[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + a + "</svg>";
}
function gl(a) {
  return a.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function bl(a) {
  return "data:image/svg+xml," + gl(a);
}
function yl(a) {
  return 'url("' + bl(a) + '")';
}
const Ca = {
  ...an,
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
}, fn = {
  backgroundColor: "transparent"
}, Ea = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Pa = {
  webkitMask: Nt,
  mask: Nt,
  background: fn
};
for (const a in Pa) {
  const t = Pa[a];
  for (const e in Ea)
    t[a + e] = Ea[e];
}
const ft = {};
["horizontal", "vertical"].forEach((a) => {
  const t = a.slice(0, 1) + "Flip";
  ft[a + "-flip"] = t, ft[a.slice(0, 1) + "-flip"] = t, ft[a + "Flip"] = t;
});
function Ma(a) {
  return a + (a.match(/^[-0-9.]+$/) ? "px" : "");
}
const La = (a, t) => {
  const e = fl(Ca, t), n = { ...kl }, r = t.mode || "svg", l = {}, s = t.style, o = typeof s == "object" && !(s instanceof Array) ? s : {};
  for (let B in t) {
    const y = t[B];
    if (y !== void 0)
      switch (B) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          e[B] = y === !0 || y === "true" || y === 1;
          break;
        case "flip":
          typeof y == "string" && ml(e, y);
          break;
        case "color":
          l.color = y;
          break;
        case "rotate":
          typeof y == "string" ? e[B] = hl(y) : typeof y == "number" && (e[B] = y);
          break;
        case "ariaHidden":
        case "aria-hidden":
          y !== !0 && y !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const w = ft[B];
          w ? (y === !0 || y === "true" || y === 1) && (e[w] = !0) : Ca[B] === void 0 && (n[B] = y);
        }
      }
  }
  const u = $r(a, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...o
    }, Object.assign(n, d);
    let B = 0, y = t.id;
    return typeof y == "string" && (y = y.replace(/-/g, "_")), n.innerHTML = Fr(u.body, y ? () => y + "ID" + B++ : "iconifyVue"), ha("svg", n);
  }
  const { body: p, width: v, height: m } = a, I = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), x = vl(p, {
    ...d,
    width: v + "",
    height: m + ""
  });
  return n.style = {
    ...l,
    "--svg": yl(x),
    width: Ma(d.width),
    height: Ma(d.height),
    ...wl,
    ...I ? Nt : fn,
    ...o
  }, ha("span", n);
};
en(!0);
Vr("", Yr);
if (typeof document < "u" && typeof window < "u") {
  cn();
  const a = window;
  if (a.IconifyPreload !== void 0) {
    const t = a.IconifyPreload, e = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((n) => {
      try {
        // Check if item is an object and not null/array
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !Cr(n)) && console.error(e);
      } catch {
        console.error(e);
      }
    });
  }
  if (a.IconifyProviders !== void 0) {
    const t = a.IconifyProviders;
    if (typeof t == "object" && t !== null)
      for (let e in t) {
        const n = "IconifyProviders[" + e + "] is invalid.";
        try {
          const r = t[e];
          if (typeof r != "object" || !r || r.resources === void 0)
            continue;
          Nr(e, r) || console.error(n);
        } catch {
          console.error(n);
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
    getIcon(a, t, e) {
      if (typeof a == "object" && a !== null && typeof a.body == "string")
        return this._name = "", this.abortLoading(), {
          data: a
        };
      let n;
      if (typeof a != "string" || (n = _t(a, !1, !0)) === null)
        return this.abortLoading(), null;
      let r = Tr(n);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== a) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: a,
          abort: cl([n], () => {
            this.counter++;
          })
        })), null;
      if (this.abortLoading(), this._name !== a && (this._name = a, t && t(a)), e) {
        r = Object.assign({}, r);
        const s = e(r.body, n.name, n.prefix, n.provider);
        typeof s == "string" && (r.body = s);
      }
      const l = ["iconify"];
      return n.prefix !== "" && l.push("iconify--" + n.prefix), n.provider !== "" && l.push("iconify--" + n.provider), { data: r, classes: l };
    }
  },
  // Render icon
  render() {
    this.counter;
    const a = this.$attrs, t = this.iconMounted || a.ssr ? this.getIcon(a.icon, a.onLoad, a.customise) : null;
    if (!t)
      return La(_l, a);
    let e = a;
    return t.classes && (e = {
      ...a,
      class: (typeof a.class == "string" ? a.class + " " : "") + t.classes.join(" ")
    }), La({
      ...xt,
      ...t.data
    }, e);
  }
}), ra = Symbol("accordions"), la = Symbol("header"), Tt = Symbol("tabs"), Se = () => {
  const a = Q(), t = Q(!1), e = Q(!1), n = () => {
    if (!a.value)
      return;
    a.value.style.setProperty("--collapser", "none");
    const r = a.value.offsetHeight;
    a.value.style.setProperty("--collapse", `${-r}px`), a.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: a,
    collapsing: t,
    cssExpanded: e,
    doExpand: (r) => {
      a.value && (r === !0 && a.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        t.value = !0, n(), window.requestAnimationFrame(() => {
          e.value = r;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (r, l = !0) => {
      var s, o;
      t.value = !1, l && ((o = (s = a.value) == null ? void 0 : s.querySelector("a")) == null || o.focus()), a.value && r === !1 && a.value.style.removeProperty("--collapse-max-height");
    }
  };
}, se = (a = "", t = "") => (a ? `${a}-` : "") + zt() + (t ? `-${t}` : ""), Dl = { class: "fr-accordion" }, Tl = ["aria-expanded", "aria-controls"], Il = ["id"], Cl = /* @__PURE__ */ F({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => se("accordion") },
    selected: { type: Boolean },
    title: { default: "Sans intitulé" },
    titleTag: { default: "h3" }
  },
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se(), o = Q(), u = Qe(ra), { isActive: d, expand: p } = (u == null ? void 0 : u(st(() => t.title))) ?? { isActive: o, expand: () => o.value = !o.value };
    return xe(() => {
      d.value && l(!0);
    }), pe(d, (v, m) => {
      v !== m && l(v);
    }), (v, m) => (i(), f("section", Dl, [
      (i(), H(be(v.titleTag), { class: "fr-accordion__title" }, {
        default: U(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": j(d),
            "aria-controls": v.id,
            type: "button",
            onClick: m[0] || (m[0] = (I) => j(p)())
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
          "fr-collapse--expanded": j(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": j(n)
        }]),
        onTransitionend: m[1] || (m[1] = (I) => j(s)(j(d), !1))
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = k({
      get: () => e.modelValue,
      set(o) {
        n("update:modelValue", o);
      }
    }), l = Q(/* @__PURE__ */ new Map()), s = Q(0);
    return Re(ra, (o) => {
      const u = s.value++;
      l.value.set(u, o.value);
      const d = k(() => u === r.value);
      pe(o, () => {
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = () => n("close"), l = k(
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
      s.small ? b("", !0) : (i(), H(be(s.titleTag), {
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
  setup(a) {
    return (t, e) => (i(), f("a", {
      class: R(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, h(t.label), 3));
  }
}), $l = ["title"], pn = /* @__PURE__ */ F({
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
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = Se(), s = Q(!1);
    return pe(s, (o, u) => {
      o !== u && r(o);
    }), (o, u) => {
      const d = Te("RouterLink");
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
            "fr-collapse--expanded": j(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": j(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => j(l)(s.value))
        }, [
          c("ol", Fl, [
            (i(!0), f(z, null, Z(o.links, (p, v) => (i(), f("li", {
              key: v,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), H(d, {
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
  setup(a) {
    Gt((u) => ({
      "177d0d84": o.value
    }));
    const t = a, e = Q(null), n = k(() => `${+t.scale * 1.2}rem`), r = k(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    pe(() => t.title, l);
    async function l() {
      var u, d, p, v;
      if (!((u = e.value) != null && u.$el))
        return;
      const m = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), I = document.createElement("title");
      if (!t.title) {
        I.remove();
        return;
      }
      I.innerHTML = t.title, await Ga(), m || (v = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || v.before(I);
    }
    xe(l);
    const s = k(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), o = k(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), H(j(xl), {
      ref_key: "icon",
      ref: e,
      icon: s.value,
      style: Ie({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
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
}), _e = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, ke = /* @__PURE__ */ _e(ql, [["__scopeId", "data-v-73a1cd7e"]]), jl = ["title", "disabled", "aria-disabled"], Hl = { key: 1 }, Wl = /* @__PURE__ */ F({
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
    const e = a, n = k(() => ["sm", "small"].includes(e.size)), r = k(() => ["md", "medium"].includes(e.size)), l = k(() => ["lg", "large"].includes(e.size)), s = Q(null);
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
      onClick: v[0] || (v[0] = (m) => p.onClick ? p.onClick(m) : () => {
      })
    }, [
      p.icon && !o.value ? (i(), H(ke, Ce(Y({ key: 0 }, d.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", Hl, [
        V(h(p.label) + " ", 1),
        $(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, jl));
  }
}), je = /* @__PURE__ */ _e(Wl, [["__scopeId", "data-v-118397f5"]]), It = /* @__PURE__ */ F({
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
    const t = a, e = Q(null), n = k(() => ["sm", "small"].includes(t.size)), r = k(() => ["md", "medium"].includes(t.size)), l = k(() => ["lg", "large"].includes(t.size)), s = k(() => ["always", "", !0].includes(t.inlineLayoutWhen)), o = k(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = k(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = k(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = k(() => t.align === "center"), v = k(() => t.align === "right"), m = Q("auto"), I = k(() => `--equisized-width: ${m.value};`), x = async () => {
      var B;
      let y = 0;
      await new Promise((w) => setTimeout(w, 100)), (B = e.value) == null || B.querySelectorAll(".fr-btn").forEach((w) => {
        const T = w, S = T.offsetWidth, D = window.getComputedStyle(T), C = +D.marginLeft.replace("px", ""), P = +D.marginRight.replace("px", "");
        T.style.width = "var(--equisized-width)";
        const _ = S + C + P;
        _ > y && (y = _);
      }), m.value = `${y}px`;
    };
    return xe(async () => {
      !e.value || !t.equisized || await x();
    }), (B, y) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: Ie(I.value),
      class: R(["fr-btns-group", {
        "fr-btns-group--equisized": B.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": s.value || o.value,
        "fr-btns-group--inline-md": s.value || u.value,
        "fr-btns-group--inline-lg": s.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": v.value,
        "fr-btns-group--icon-right": B.iconRight,
        "fr-btns-group--inline-reverse": B.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(z, null, Z(B.buttons, ({ onClick: w, ...T }, S) => (i(), f("li", { key: S }, [
        ae(je, Y({ ref_for: !0 }, T, { onClick: w }), null, 16, ["onClick"])
      ]))), 128)),
      $(B.$slots, "default")
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
  setup(a) {
    const t = a, e = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), n = k(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : { ...t.icon ?? {} });
    return (r, l) => (i(), f("div", {
      class: R(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && n.value ? (i(), H(ke, Ce(Y({ key: 0 }, n.value)), null, 16)) : b("", !0),
      r.title ? (i(), H(be(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: U(() => [
          V(h(r.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      r.content ? (i(), f("p", Kl, h(r.content), 1)) : b("", !0),
      r.button ? (i(), H(je, Ce(Y({ key: 3 }, r.button)), null, 16)) : b("", !0),
      r.$slots.default && !r.content ? (i(), f("div", Ql, [
        $(r.$slots, "default", {}, void 0, !0)
      ])) : $(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), zl = /* @__PURE__ */ _e(Yl, [["__scopeId", "data-v-c59b3cec"]]), qt = /* @__PURE__ */ F({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const t = a, e = k(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = k(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: R(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), H(ke, Ce(Y({ key: 0 }, n.value)), null, 16)) : b("", !0),
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
}, as = {
  key: 1,
  class: "fr-links-group"
}, ns = ["href"], rs = {
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
  setup(a, { expose: t }) {
    const e = a, n = k(() => ["sm", "small"].includes(e.size)), r = k(() => ["lg", "large"].includes(e.size)), l = k(() => ["sm", "small"].includes(e.imgRatio)), s = k(() => ["lg", "large"].includes(e.imgRatio)), o = k(() => typeof e.link == "string" && e.link.startsWith("http")), u = Q(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const v = Te("RouterLink");
      return i(), f("div", {
        class: R(["fr-card", {
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
        c("div", Gl, [
          c("div", Xl, [
            (i(), H(be(d.titleTag), { class: "fr-card__title" }, {
              default: U(() => [
                o.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, h(d.title), 9, Ul)) : d.link ? (i(), H(v, {
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
                }, 8, ["to"])) : (i(), f(z, { key: 2 }, [
                  V(h(d.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            c("p", Zl, h(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Jl, [
              $(d.$slots, "start-details"),
              d.detail ? (i(), H(qt, {
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
              d.endDetail ? (i(), H(qt, {
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
            d.buttons.length ? (i(), H(It, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            d.linksGroup.length ? (i(), f("ul", as, [
              (i(!0), f(z, null, Z(d.linksGroup, (m, I) => (i(), f("li", {
                key: `card-link-${I}`
              }, [
                m.to ? (i(), H(v, {
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
                    "fr-link--sm": n.value,
                    "fr-link--lg": r.value
                  }])
                }, h(m.label), 11, ns))
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
            (i(!0), f(z, null, Z(d.badges, (m, I) => (i(), f("li", { key: I }, [
              ae(pn, Y({ ref_for: !0 }, m), null, 16)
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
  props: /* @__PURE__ */ Le({
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
  setup(a) {
    Gt((l) => ({
      "5f542ece": l.readonlyOpacity
    }));
    const t = a, e = k(() => t.errorMessage || t.validMessage), n = k(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = De(a, "modelValue");
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
        Be(c("input", Y({
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
            class: R(["fr-message--info flex items-center", n.value])
          }, h(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Ct = /* @__PURE__ */ _e(ms, [["__scopeId", "data-v-18fa6c7b"]]), hs = { class: "fr-form-group" }, vs = ["disabled", "aria-labelledby", "aria-invalid", "role"], gs = ["id"], bs = {
  key: 0,
  class: "required"
}, ys = ["id"], ks = /* @__PURE__ */ F({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Le({
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
  setup(a) {
    const t = a, e = k(() => t.errorMessage || t.validMessage), n = k(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = k(() => e.value ? `${t.titleId} messages-${t.titleId}` : t.titleId), l = De(a, "modelValue");
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
          (i(!0), f(z, null, Z(s.options, (u) => (i(), H(Ct, {
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
            class: R(["fr-message--info flex items-center", n.value])
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
  setup(a) {
    const t = a, e = k(() => typeof t.url == "string" && t.url.startsWith("http")), n = k(() => t.url ? e.value ? "a" : "RouterLink" : "a"), r = k(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, s) => (i(), f(z, null, [
      c("div", ws, [
        c("p", _s, [
          $(l.$slots, "default", {}, () => [
            s[4] || (s[4] = V(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), H(be(n.value), Y(r.value, { "data-testid": "link" }), {
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = k(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = k(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), s = k(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), o = (x) => n("update:current-page", x), u = (x) => o(x), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), v = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), m = () => u(e.pages.length - 1), I = (x) => e.pages.indexOf(x) === e.currentPage;
    return (x, B) => {
      var y, w, T, S;
      return i(), f("nav", Ts, [
        c("ul", Is, [
          c("li", null, [
            c("a", {
              href: (y = x.pages[0]) == null ? void 0 : y.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: x.firstPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: B[0] || (B[0] = ne((D) => d(), ["prevent"]))
            }, null, 8, Cs)
          ]),
          c("li", null, [
            c("a", {
              href: (w = x.pages[Math.max(x.currentPage - 1, 0)]) == null ? void 0 : w.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: x.prevPageTitle,
              disabled: x.currentPage === 0 ? !0 : void 0,
              "aria-disabled": x.currentPage === 0 ? !0 : void 0,
              onClick: B[1] || (B[1] = ne((D) => p(), ["prevent"]))
            }, h(x.prevPageTitle), 9, Es)
          ]),
          (i(!0), f(z, null, Z(s.value, (D, C) => (i(), f("li", { key: C }, [
            c("a", {
              href: D == null ? void 0 : D.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: D.title,
              "aria-current": I(D) ? "page" : void 0,
              onClick: ne((P) => u(x.pages.indexOf(D)), ["prevent"])
            }, [
              s.value.indexOf(D) === 0 && r.value > 0 ? (i(), f("span", Ms, "...")) : b("", !0),
              V(" " + h(D.label) + " ", 1),
              s.value.indexOf(D) === s.value.length - 1 && l.value < x.pages.length - 1 ? (i(), f("span", Ls, "...")) : b("", !0)
            ], 8, Ps)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (T = x.pages[Math.min(x.currentPage + 1, x.pages.length - 1)]) == null ? void 0 : T.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: x.nextPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: B[2] || (B[2] = ne((D) => v(), ["prevent"]))
            }, h(x.nextPageTitle), 9, Bs)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (S = x.pages.at(-1)) == null ? void 0 : S.href,
              title: x.lastPageTitle,
              disabled: x.currentPage === x.pages.length - 1 ? !0 : void 0,
              "aria-disabled": x.currentPage === x.pages.length - 1 ? !0 : void 0,
              onClick: B[3] || (B[3] = ne((D) => m(), ["prevent"]))
            }, null, 8, Ss)
          ])
        ])
      ]);
    };
  }
}), sa = /* @__PURE__ */ _e($s, [["__scopeId", "data-v-4dfa8248"]]), As = { class: "fr-table" }, Os = { class: "fr-table__wrapper" }, Rs = { class: "fr-table__container" }, Fs = { class: "fr-table__content" }, Vs = ["id"], Ns = { key: 0 }, qs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, js = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Hs = ["id", "checked"], Ws = ["for"], Ks = ["tabindex", "onClick", "onKeydown"], Qs = { key: 0 }, Ys = { key: 1 }, zs = ["data-row-key"], Gs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Xs = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Us = ["id", "value"], Zs = ["for"], Js = ["onKeydown"], eo = { class: "flex gap-2 items-center" }, to = ["selected"], ao = ["value", "selected"], no = { class: "flex ml-1" }, ro = { class: "self-center" }, lo = /* @__PURE__ */ F({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Le({
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
  emits: /* @__PURE__ */ Le(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { emit: t }) {
    const e = a, n = t, r = De(a, "selection"), l = De(a, "rowsPerPage"), s = De(a, "currentPage"), o = k(() => Math.ceil(e.rows.length / l.value)), u = k(() => e.pages ?? Array.from({ length: o.value }).map((C, P) => ({ label: `${P + 1}`, title: `Page ${P + 1}`, href: `#${P + 1}` }))), d = k(() => s.value * l.value), p = k(() => (s.value + 1) * l.value), v = De(a, "sortedBy"), m = De(a, "sortedDesc");
    function I(C, P) {
      const _ = v.value ?? e.sorted;
      return (C[_] ?? C) < (P[_] ?? P) ? -1 : (C[_] ?? C) > (P[_] ?? P) ? 1 : 0;
    }
    function x(C) {
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
    const B = k(() => {
      const C = v.value ? e.rows.slice().sort(e.sortFn ?? I) : e.rows.slice();
      return m.value && C.reverse(), C;
    }), y = k(() => {
      const C = e.headersRow.map((_) => typeof _ != "object" ? _ : _.key), P = B.value.map((_) => Array.isArray(_) ? _ : C.map((N) => typeof _ != "object" ? _ : _[N] ?? _));
      return e.pagination ? P.slice(d.value, p.value) : P;
    });
    function w(C) {
      if (C) {
        const P = e.headersRow.findIndex((_) => _.key ?? _);
        r.value = y.value.map((_) => _[P]);
      } else
        r.value.length = 0;
    }
    const T = k(() => r.value.length === y.value.length);
    function S() {
      n("update:current-page", 0), r.value.length = 0;
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
                        onInput: P[0] || (P[0] = (_) => w(_.target.checked))
                      }, null, 40, Hs),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${C.id}-all`
                      }, " Sélectionner tout ", 8, Ws)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(z, null, Z(C.headersRow, (_, N) => (i(), f("th", Y({
                    key: typeof _ == "object" ? _.key : _,
                    scope: "col",
                    ref_for: !0
                  }, typeof _ == "object" && _.headerAttrs, {
                    tabindex: C.sortableRows ? 0 : void 0,
                    onClick: (E) => x(_.key ?? (Array.isArray(C.rows[0]) ? N : _)),
                    onKeydown: [
                      re((E) => x(_.key ?? _), ["enter"]),
                      re((E) => x(_.key ?? _), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: R({ "sortable-header": C.sortableRows === !0 || Array.isArray(C.sortableRows) && C.sortableRows.includes(_.key ?? _) })
                    }, [
                      $(C.$slots, "header", Y({ ref_for: !0 }, typeof _ == "object" ? _ : { key: _, label: _ }), () => [
                        V(h(typeof _ == "object" ? _.label : _), 1)
                      ], !0),
                      v.value !== (_.key ?? _) && (C.sortableRows === !0 || Array.isArray(C.sortableRows) && C.sortableRows.includes(_.key ?? _)) ? (i(), f("span", Qs, [
                        ae(ke, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : v.value === (_.key ?? _) ? (i(), f("span", Ys, [
                        ae(ke, {
                          name: m.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Ks))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, Z(y.value, (_, N) => (i(), f("tr", {
                  key: `row-${N}`,
                  "data-row-key": N + 1
                }, [
                  C.selectableRows ? (i(), f("th", Gs, [
                    c("div", Xs, [
                      Be(c("input", {
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
                  (i(!0), f(z, null, Z(_, (E, M) => (i(), f("td", {
                    key: typeof E == "object" ? E[C.rowKey] : E,
                    tabindex: "0",
                    onKeydown: [
                      re(ne((g) => D(typeof E == "object" ? E[C.rowKey] : E), ["ctrl"]), ["c"]),
                      re(ne((g) => D(typeof E == "object" ? E[C.rowKey] : E), ["meta"]), ["c"])
                    ]
                  }, [
                    $(C.$slots, "cell", Y({ ref_for: !0 }, {
                      colKey: typeof C.headersRow[M] == "object" ? C.headersRow[M].key : C.headersRow[M],
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
              Be(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": P[2] || (P[2] = (_) => l.value = _),
                class: "fr-select",
                onChange: P[3] || (P[3] = (_) => S())
              }, [
                c("option", {
                  value: "",
                  selected: !C.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, to),
                (i(!0), f(z, null, Z(C.paginationOptions, (_, N) => (i(), f("option", {
                  key: N,
                  value: _,
                  selected: +_ === l.value
                }, h(_), 9, ao))), 128))
              ], 544), [
                [Ut, l.value]
              ])
            ]),
            c("div", no, [
              c("span", ro, "Page " + h(s.value + 1) + " sur " + h(o.value), 1)
            ]),
            ae(sa, {
              "current-page": s.value,
              "onUpdate:currentPage": [
                P[4] || (P[4] = (_) => s.value = _),
                P[5] || (P[5] = (_) => r.value.length = 0)
              ],
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), so = /* @__PURE__ */ _e(lo, [["__scopeId", "data-v-831b7391"]]), oo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", io = { class: "fr-container flex" }, uo = { class: "half" }, co = { class: "fr-h1" }, fo = { class: "flex fr-my-md-3w" }, po = { class: "fr-h6" }, mo = /* @__PURE__ */ F({
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
      var n;
      return i(), f("div", io, [
        c("div", uo, [
          c("h1", co, h(t.title), 1),
          c("span", fo, h(t.subtitle), 1),
          c("p", po, h(t.description), 1),
          c("p", null, h(t.help), 1),
          (n = t.buttons) != null && n.length ? (i(), H(It, {
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
}), ho = /* @__PURE__ */ _e(mo, [["__scopeId", "data-v-0f6cf5b4"]]), vo = { class: "fr-fieldset" }, go = ["id"], bo = {
  key: 1,
  class: "fr-fieldset__element"
}, yo = { class: "fr-fieldset__element" }, mn = /* @__PURE__ */ F({
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
      var n, r, l, s;
      return i(), f("fieldset", vo, [
        t.legend || (r = (n = t.$slots).legend) != null && r.call(n) ? (i(), f("legend", {
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
}), ko = ["href", "download"], wo = { class: "fr-link__detail" }, hn = /* @__PURE__ */ F({
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
  setup(a) {
    return (t, e) => (i(), f("div", _o, [
      t.title ? (i(), f("h4", xo, h(t.title), 1)) : b("", !0),
      c("ul", null, [
        (i(!0), f(z, null, Z(t.files, (n, r) => (i(), f("li", { key: r }, [
          ae(hn, {
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = (s) => {
      var o, u;
      n("update:modelValue", (o = s.target) == null ? void 0 : o.value), n("change", (u = s.target) == null ? void 0 : u.files);
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
}, vn = /* @__PURE__ */ F({
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
    const e = t, n = (r) => e("update:email", r.target.value);
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
              onInput: l[1] || (l[1] = (s) => n(s))
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
}, zo = ["title", "href"], gn = /* @__PURE__ */ F({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Qo, [
      (i(), H(be(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: U(() => e[0] || (e[0] = [
          V(" Suivez-nous "),
          c("br", null, null, -1),
          V(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Yo, [
        (i(!0), f(z, null, Z(t.networks, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: R(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h(n.name), 11, zo)
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
  setup(a) {
    const t = a, e = k(() => t.networks && t.networks.length), n = k(() => typeof t.newsletterData == "object");
    return (r, l) => (i(), f("div", Go, [
      c("div", Xo, [
        c("div", Uo, [
          $(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: R(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ae(vn, Ce(wt(r.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: R(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              ae(gn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ba = 1, bn = /* @__PURE__ */ F({
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
    const t = a, e = k(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("http");
    }), n = k(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("mailto");
    }), r = k(() => t.button ? "button" : e.value || n.value ? "a" : "RouterLink"), l = k(() => {
      if (!(!e.value && !n.value))
        return t.href;
    }), s = k(() => {
      if (!(e.value || n.value))
        return t.to;
    }), o = k(() => s.value ? { to: s.value } : { href: l.value }), u = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), d = k(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Ba, ...t.iconAttrs ?? {} } : { scale: Ba, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (p, v) => (i(), H(be(r.value), Y({
      class: ["fr-footer__bottom-link", {
        "fr-btn--icon-right": u.value && p.iconRight,
        "fr-btn--icon-left": u.value && !p.iconRight,
        [String(p.icon)]: u.value
      }]
    }, o.value, {
      target: p.target,
      onClick: ne(p.onClick, ["stop"])
    }), {
      default: U(() => {
        var m, I;
        return [
          !u.value && (p.icon || (m = p.iconAttrs) != null && m.name) && !p.iconRight ? (i(), H(ke, Y({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : b("", !0),
          V(" " + h(p.label) + " ", 1),
          !u.value && (p.icon || (I = p.iconAttrs) != null && I.name) && p.iconRight ? (i(), H(ke, Y({
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
}, ti = { class: "fr-footer__partners-logos" }, ai = {
  key: 0,
  class: "fr-footer__partners-main"
}, ni = ["href"], ri = ["src", "alt"], li = { class: "fr-footer__partners-sub" }, si = ["href"], oi = ["src", "alt"], yn = /* @__PURE__ */ F({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Jo, [
      t.title ? (i(), f("h4", ei, h(t.title), 1)) : b("", !0),
      c("div", ti, [
        t.mainPartner ? (i(), f("div", ai, [
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
          ], 8, ni)
        ])) : b("", !0),
        c("div", li, [
          c("ul", null, [
            (i(!0), f(z, null, Z(t.subPartners, (n, r) => (i(), f("li", { key: r }, [
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
                }, null, 8, oi)
              ], 8, si)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), ii = ["innerHTML"], nt = /* @__PURE__ */ F({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const t = a, e = k(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (n, r) => (i(), f("p", {
      class: R(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
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
    const t = a, e = k(() => [
      ...t.beforeMandatoryLinks,
      ...t.mandatoryLinks,
      ...t.afterMandatoryLinks
    ]), n = Xt(), r = k(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n);
    }), l = k(() => {
      const p = t.licenceTo || t.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), s = k(() => {
      const { to: p, href: v, ...m } = t.licenceLinkProps ?? {};
      return m;
    }), o = k(() => l.value ? "" : t.licenceTo), u = k(() => l.value ? t.licenceTo : ""), d = k(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, v) => {
      const m = Te("RouterLink");
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
              ae(nt, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              d.value ? (i(), f("a", {
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
                }, null, 12, gi)
              ], 8, vi)) : (i(), H(m, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  c("img", {
                    class: "fr-footer__logo",
                    style: Ie(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, bi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", yi, [
              ae(m, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  ae(nt, { "logo-text": p.logoText }, null, 8, ["logo-text"])
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
                (i(!0), f(z, null, Z(p.ecosystemLinks, ({ href: I, label: x, title: B, ...y }, w) => (i(), f("li", {
                  key: w,
                  class: "fr-footer__content-item"
                }, [
                  c("a", Y({
                    class: "fr-footer__content-link",
                    href: I,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: B,
                    ref_for: !0
                  }, y), h(x), 17, xi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), H(yn, Ce(Y({ key: 0 }, p.partners)), null, 16)) : b("", !0),
          c("div", Di, [
            c("ul", Ti, [
              (i(!0), f(z, null, Z(e.value, (I, x) => (i(), f("li", {
                key: x,
                class: "fr-footer__bottom-item"
              }, [
                ae(bn, Y({ ref_for: !0 }, I), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", Ii, [
              c("p", null, [
                V(h(p.licenceText) + " ", 1),
                (i(), H(be(l.value ? "a" : "RouterLink"), Y({
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
}), Ei = /* @__PURE__ */ _e(Ci, [["__scopeId", "data-v-4030eed5"]]), Pi = { class: "fr-footer__top-cat" }, Mi = { class: "fr-footer__top-list" }, Li = ["href"], Bi = /* @__PURE__ */ F({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(a) {
    return (t, e) => {
      const n = Te("RouterLink");
      return i(), f("div", null, [
        c("h3", Pi, h(t.categoryName), 1),
        c("ul", Mi, [
          (i(!0), f(z, null, Z(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, h(r.label), 9, Li)) : b("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), H(n, {
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
  setup(a) {
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
  setup(a, { emit: t }) {
    const e = a, n = t, {
      collapse: r,
      collapsing: l,
      cssExpanded: s,
      doExpand: o,
      onTransitionEnd: u
    } = Se(), d = Q(!1);
    function p(m) {
      d.value = !1, n("select", m);
    }
    const v = k(
      () => e.languages.find(({ codeIso: m }) => m === e.currentLanguage)
    );
    return pe(d, (m, I) => {
      m !== I && o(m);
    }), (m, I) => {
      var x, B;
      return i(), f("nav", Oi, [
        c("div", Ri, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": m.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: I[0] || (I[0] = ne((y) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            V(h((x = v.value) == null ? void 0 : x.codeIso.toUpperCase()), 1),
            c("span", Vi, " - " + h((B = v.value) == null ? void 0 : B.label), 1)
          ], 8, Fi),
          c("div", {
            id: m.id,
            ref_key: "collapse",
            ref: r,
            class: R(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": j(s), "fr-collapsing": j(l) }]),
            onTransitionend: I[1] || (I[1] = (y) => j(u)(d.value))
          }, [
            c("ul", qi, [
              (i(!0), f(z, null, Z(m.languages, (y, w) => (i(), f("li", { key: w }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: y.codeIso,
                  lang: y.codeIso,
                  "aria-current": m.currentLanguage === y.codeIso ? !0 : void 0,
                  href: `#${y.codeIso}`,
                  onClick: ne((T) => p(y), ["prevent", "stop"])
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
  setup(a, { expose: t }) {
    const e = a, n = dr(), r = Q(null), l = () => {
      var d;
      return (d = r.value) == null ? void 0 : d.focus();
    }, s = k(() => e.isTextarea ? "textarea" : "input"), o = k(() => e.isWithWrapper || n.type === "date" || !!e.wrapperClass), u = k(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return t({
      focus: l
    }), (d, p) => (i(), f(z, null, [
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
        (i(), H(be(s.value), Y({ id: d.id }, d.$attrs, {
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
      ], 2)) : (i(), H(be(s.value), Y({
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
}), Et = /* @__PURE__ */ _e(Qi, [["__scopeId", "data-v-7ca45de8"]]), lt = /* @__PURE__ */ F({
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
  setup(a, { emit: t }) {
    const e = t;
    return (n, r) => (i(), f("div", {
      class: R(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      ae(Et, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => e("update:modelValue", l)),
        onKeydown: r[1] || (r[1] = re((l) => e("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label", "disabled", "aria-disabled"]),
      ae(je, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: r[2] || (r[2] = (l) => e("search", n.modelValue))
      }, {
        default: U(() => [
          V(h(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Sa = 1, oa = /* @__PURE__ */ F({
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
    const t = a, e = k(() => typeof t.path == "string"), n = k(() => {
      var v;
      return ((v = t.href) == null ? void 0 : v.startsWith("http")) || e.value && t.path.startsWith("http") || typeof t.to == "string" && t.to.startsWith("http");
    }), r = k(() => {
      var v;
      return ((v = t.href) == null ? void 0 : v.startsWith("mailto")) || e.value && t.path.startsWith("mailto") || typeof t.to == "string" && t.to.startsWith("mailto");
    }), l = k(() => t.button ? "button" : n.value || r.value ? "a" : "RouterLink"), s = k(() => {
      if (!(!n.value && !r.value))
        return t.to ?? t.href ?? t.path;
    }), o = k(() => {
      if (!(n.value || r.value))
        return t.to ?? t.path;
    }), u = k(() => o.value ? { to: o.value } : { href: s.value }), d = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), p = k(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Sa, ...t.iconAttrs ?? {} } : { scale: Sa, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (v, m) => (i(), H(be(l.value), Y({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && v.iconRight,
        "fr-btn--icon-left": d.value && !v.iconRight,
        [String(v.icon)]: d.value
      }]
    }, u.value, {
      target: v.target,
      onClick: m[0] || (m[0] = ne((I) => v.onClick(I), ["stop"]))
    }), {
      default: U(() => {
        var I, x;
        return [
          !d.value && (v.icon || (I = v.iconAttrs) != null && I.name) && !v.iconRight ? (i(), H(ke, Y({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          V(" " + h(v.label) + " ", 1),
          !d.value && (v.icon || (x = v.iconAttrs) != null && x.name) && v.iconRight ? (i(), H(ke, Y({
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
  setup(a, { emit: t }) {
    const e = t;
    return (n, r) => (i(), f("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      c("ul", zi, [
        (i(!0), f(z, null, Z(n.links, (l, s) => (i(), f("li", { key: s }, [
          ae(oa, Y({ ref_for: !0 }, l, {
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
}, Xi = { class: "fr-header__body" }, Ui = { class: "fr-container width-inherit" }, Zi = { class: "fr-header__body-row" }, Ji = { class: "fr-header__brand fr-enlarge-link" }, eu = { class: "fr-header__brand-top" }, tu = { class: "fr-header__logo" }, au = {
  key: 0,
  class: "fr-header__operator"
}, nu = ["src", "alt"], ru = {
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = Xt(), l = st(e, "languageSelector"), s = Q(!1), o = Q(!1), u = Q(!1), d = () => {
      var w;
      u.value = !1, s.value = !1, o.value = !1, (w = document.getElementById("button-menu")) == null || w.focus();
    }, p = (w) => {
      w.key === "Escape" && d();
    };
    xe(() => {
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
    }, I = d, x = k(() => [e.homeLabel, e.serviceTitle].filter((w) => w).join(" - ")), B = k(() => !!r.operator || !!e.operatorImgSrc), y = k(() => !!r.mainnav);
    return Re(la, () => d), (w, T) => {
      var S, D, C;
      const P = Te("RouterLink");
      return i(), f("header", Gi, [
        c("div", Xi, [
          c("div", Ui, [
            c("div", Zi, [
              c("div", Ji, [
                c("div", eu, [
                  c("div", tu, [
                    ae(P, {
                      to: w.homeTo,
                      title: x.value
                    }, {
                      default: U(() => [
                        ae(nt, {
                          "logo-text": w.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  B.value ? (i(), f("div", au, [
                    $(w.$slots, "operator", {}, () => [
                      w.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: w.operatorImgSrc,
                        alt: w.operatorImgAlt,
                        style: Ie(w.operatorImgStyle)
                      }, null, 12, nu)) : b("", !0)
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
                      onClick: T[0] || (T[0] = ne((_) => m(), ["prevent", "stop"]))
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
                      onClick: T[1] || (T[1] = ne((_) => v(), ["prevent", "stop"]))
                    }, null, 8, su)) : b("", !0)
                  ])) : b("", !0)
                ]),
                w.serviceTitle ? (i(), f("div", ou, [
                  ae(P, Y({
                    to: w.homeTo,
                    title: x.value
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
                  s.value ? b("", !0) : (i(), H(jt, {
                    key: 0,
                    links: w.quickLinks,
                    "nav-aria-label": w.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  $(w.$slots, "after-quick-links"),
                  l.value ? (i(), H(rt, Y({ key: 1 }, l.value, {
                    onSelect: T[2] || (T[2] = (_) => n("languageSelect", _))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                w.showSearch ? (i(), f("div", mu, [
                  ae(lt, {
                    id: w.searchbarId,
                    label: w.searchLabel,
                    "model-value": w.modelValue,
                    placeholder: w.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": T[3] || (T[3] = (_) => n("update:modelValue", _)),
                    onSearch: T[4] || (T[4] = (_) => n("search", _))
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
                  onClick: T[5] || (T[5] = ne((_) => d(), ["prevent", "stop"]))
                }, h(w.closeMenuModalLabel), 1),
                c("div", gu, [
                  l.value ? (i(), H(rt, Y({ key: 0 }, l.value, {
                    onSelect: T[6] || (T[6] = (_) => l.value.currentLanguage = _.codeIso)
                  }), null, 16)) : b("", !0),
                  $(w.$slots, "before-quick-links"),
                  s.value ? (i(), H(jt, {
                    key: 1,
                    role: "navigation",
                    links: w.quickLinks,
                    "nav-aria-label": w.quickLinksAriaLabel,
                    onLinkClick: j(I)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0),
                  $(w.$slots, "after-quick-links")
                ]),
                u.value ? $(w.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : b("", !0),
                o.value ? (i(), f("div", bu, [
                  ae(lt, {
                    "searchbar-id": w.searchbarId,
                    "model-value": w.modelValue,
                    placeholder: w.placeholder,
                    "onUpdate:modelValue": T[7] || (T[7] = (_) => n("update:modelValue", _)),
                    onSearch: T[8] || (T[8] = (_) => n("search", _))
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
  setup(a) {
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
  setup(a) {
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
      t.$slots.default ? b("", !0) : (i(), H(Et, Y({ key: 0 }, t.$attrs, {
        "is-valid": !!t.validMessage,
        "is-invalid": !!t.errorMessage,
        label: t.label,
        hint: t.hint,
        "description-id": (t.errorMessage || t.validMessage) && t.descriptionId || void 0,
        "label-visible": t.labelVisible,
        "model-value": t.modelValue,
        placeholder: t.placeholder,
        "onUpdate:modelValue": e[0] || (e[0] = (n) => t.$emit("update:modelValue", n))
      }), null, 16, ["is-valid", "is-invalid", "label", "hint", "description-id", "label-visible", "model-value", "placeholder"])),
      c("div", xu, [
        Array.isArray(t.errorMessage) ? (i(!0), f(z, { key: 0 }, Z(t.errorMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(n), 9, Du))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(t.errorMessage), 9, Tu)) : b("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(z, { key: 2 }, Z(t.validMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(n), 9, Iu))), 128)) : t.validMessage ? (i(), f("p", {
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
var kn = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], mt = /* @__PURE__ */ kn.join(","), wn = typeof Element > "u", He = wn ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ht = !wn && Element.prototype.getRootNode ? function(a) {
  var t;
  return a == null || (t = a.getRootNode) === null || t === void 0 ? void 0 : t.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, vt = function a(t, e) {
  var n;
  e === void 0 && (e = !0);
  var r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "inert"), l = r === "" || r === "true", s = l || e && t && a(t.parentNode);
  return s;
}, Pu = function(a) {
  var t, e = a == null || (t = a.getAttribute) === null || t === void 0 ? void 0 : t.call(a, "contenteditable");
  return e === "" || e === "true";
}, _n = function(a, t, e) {
  if (vt(a))
    return [];
  var n = Array.prototype.slice.apply(a.querySelectorAll(mt));
  return t && He.call(a, mt) && n.unshift(a), n = n.filter(e), n;
}, xn = function a(t, e, n) {
  for (var r = [], l = Array.from(t); l.length; ) {
    var s = l.shift();
    if (!vt(s, !1))
      if (s.tagName === "SLOT") {
        var o = s.assignedElements(), u = o.length ? o : s.children, d = a(u, !0, n);
        n.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: s,
          candidates: d
        });
      } else {
        var p = He.call(s, mt);
        p && n.filter(s) && (e || !t.includes(s)) && r.push(s);
        var v = s.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), m = !vt(v, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
        if (v && m) {
          var I = a(v === !0 ? s.children : v.children, !0, n);
          n.flatten ? r.push.apply(r, I) : r.push({
            scopeParent: s,
            candidates: I
          });
        } else
          l.unshift.apply(l, s.children);
      }
  }
  return r;
}, Dn = function(a) {
  return !isNaN(parseInt(a.getAttribute("tabindex"), 10));
}, Ne = function(a) {
  if (!a)
    throw new Error("No node provided");
  return a.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(a.tagName) || Pu(a)) && !Dn(a) ? 0 : a.tabIndex;
}, Mu = function(a, t) {
  var e = Ne(a);
  return e < 0 && t && !Dn(a) ? 0 : e;
}, Lu = function(a, t) {
  return a.tabIndex === t.tabIndex ? a.documentOrder - t.documentOrder : a.tabIndex - t.tabIndex;
}, Tn = function(a) {
  return a.tagName === "INPUT";
}, Bu = function(a) {
  return Tn(a) && a.type === "hidden";
}, Su = function(a) {
  var t = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, $u = function(a, t) {
  for (var e = 0; e < a.length; e++)
    if (a[e].checked && a[e].form === t)
      return a[e];
}, Au = function(a) {
  if (!a.name)
    return !0;
  var t = a.form || ht(a), e = function(l) {
    return t.querySelectorAll('input[type="radio"][name="' + l + '"]');
  }, n;
  if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function")
    n = e(window.CSS.escape(a.name));
  else
    try {
      n = e(a.name);
    } catch (l) {
      return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", l.message), !1;
    }
  var r = $u(n, a.form);
  return !r || r === a;
}, Ou = function(a) {
  return Tn(a) && a.type === "radio";
}, Ru = function(a) {
  return Ou(a) && !Au(a);
}, Fu = function(a) {
  var t, e = a && ht(a), n = (t = e) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (e && e !== a) {
    var l, s, o;
    for (r = !!((l = n) !== null && l !== void 0 && (s = l.ownerDocument) !== null && s !== void 0 && s.contains(n) || a != null && (o = a.ownerDocument) !== null && o !== void 0 && o.contains(a)); !r && n; ) {
      var u, d, p;
      e = ht(n), n = (u = e) === null || u === void 0 ? void 0 : u.host, r = !!((d = n) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return r;
}, $a = function(a) {
  var t = a.getBoundingClientRect(), e = t.width, n = t.height;
  return e === 0 && n === 0;
}, Vu = function(a, t) {
  var e = t.displayCheck, n = t.getShadowRoot;
  if (getComputedStyle(a).visibility === "hidden")
    return !0;
  var r = He.call(a, "details>summary:first-of-type"), l = r ? a.parentElement : a;
  if (He.call(l, "details:not([open]) *"))
    return !0;
  if (!e || e === "full" || e === "legacy-full") {
    if (typeof n == "function") {
      for (var s = a; a; ) {
        var o = a.parentElement, u = ht(a);
        if (o && !o.shadowRoot && n(o) === !0)
          return $a(a);
        a.assignedSlot ? a = a.assignedSlot : !o && u !== a.ownerDocument ? a = u.host : a = o;
      }
      a = s;
    }
    if (Fu(a))
      return !a.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return $a(a);
  return !1;
}, Nu = function(a) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(a.tagName))
    for (var t = a.parentElement; t; ) {
      if (t.tagName === "FIELDSET" && t.disabled) {
        for (var e = 0; e < t.children.length; e++) {
          var n = t.children.item(e);
          if (n.tagName === "LEGEND")
            return He.call(t, "fieldset[disabled] *") ? !0 : !n.contains(a);
        }
        return !0;
      }
      t = t.parentElement;
    }
  return !1;
}, gt = function(a, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  vt(t) || Bu(t) || Vu(t, a) || // For a details element with a summary, the summary element gets the focus
  Su(t) || Nu(t));
}, Ht = function(a, t) {
  return !(Ru(t) || Ne(t) < 0 || !gt(a, t));
}, qu = function(a) {
  var t = parseInt(a.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, ju = function a(t) {
  var e = [], n = [];
  return t.forEach(function(r, l) {
    var s = !!r.scopeParent, o = s ? r.scopeParent : r, u = Mu(o, s), d = s ? a(r.candidates) : o;
    u === 0 ? s ? e.push.apply(e, d) : e.push(o) : n.push({
      documentOrder: l,
      tabIndex: u,
      item: r,
      isScope: s,
      content: d
    });
  }), n.sort(Lu).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(e);
}, Hu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = xn([a], t.includeContainer, {
    filter: Ht.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: qu
  }) : e = _n(a, t.includeContainer, Ht.bind(null, t)), ju(e);
}, Wu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = xn([a], t.includeContainer, {
    filter: gt.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : e = _n(a, t.includeContainer, gt.bind(null, t)), e;
}, We = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, mt) === !1 ? !1 : Ht(t, a);
}, Ku = /* @__PURE__ */ kn.concat("iframe").join(","), Bt = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, Ku) === !1 ? !1 : gt(t, a);
};
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Wt(a, t) {
  (t == null || t > a.length) && (t = a.length);
  for (var e = 0, n = Array(t); e < t; e++) n[e] = a[e];
  return n;
}
function Qu(a) {
  if (Array.isArray(a)) return Wt(a);
}
function Yu(a, t, e) {
  return (t = Zu(t)) in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}
function zu(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function Gu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Aa(a, t) {
  var e = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), e.push.apply(e, n);
  }
  return e;
}
function Oa(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Aa(Object(e), !0).forEach(function(n) {
      Yu(a, n, e[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : Aa(Object(e)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(e, n));
    });
  }
  return a;
}
function Xu(a) {
  return Qu(a) || zu(a) || Ju(a) || Gu();
}
function Uu(a, t) {
  if (typeof a != "object" || !a) return a;
  var e = a[Symbol.toPrimitive];
  if (e !== void 0) {
    var n = e.call(a, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(a);
}
function Zu(a) {
  var t = Uu(a, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ju(a, t) {
  if (a) {
    if (typeof a == "string") return Wt(a, t);
    var e = {}.toString.call(a).slice(8, -1);
    return e === "Object" && a.constructor && (e = a.constructor.name), e === "Map" || e === "Set" ? Array.from(a) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Wt(a, t) : void 0;
  }
}
var Ra = {
  activateTrap: function(a, t) {
    if (a.length > 0) {
      var e = a[a.length - 1];
      e !== t && e._setPausedState(!0);
    }
    var n = a.indexOf(t);
    n === -1 || a.splice(n, 1), a.push(t);
  },
  deactivateTrap: function(a, t) {
    var e = a.indexOf(t);
    e !== -1 && a.splice(e, 1), a.length > 0 && !a[a.length - 1]._isManuallyPaused() && a[a.length - 1]._setPausedState(!1);
  }
}, ed = function(a) {
  return a.tagName && a.tagName.toLowerCase() === "input" && typeof a.select == "function";
}, td = function(a) {
  return (a == null ? void 0 : a.key) === "Escape" || (a == null ? void 0 : a.key) === "Esc" || (a == null ? void 0 : a.keyCode) === 27;
}, et = function(a) {
  return (a == null ? void 0 : a.key) === "Tab" || (a == null ? void 0 : a.keyCode) === 9;
}, ad = function(a) {
  return et(a) && !a.shiftKey;
}, nd = function(a) {
  return et(a) && a.shiftKey;
}, Fa = function(a) {
  return setTimeout(a, 0);
}, Ue = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    e[n - 1] = arguments[n];
  return typeof a == "function" ? a.apply(void 0, e) : a;
}, ut = function(a) {
  return a.target.shadowRoot && typeof a.composedPath == "function" ? a.composedPath()[0] : a.target;
}, rd = [], ld = function(a, t) {
  var e = (t == null ? void 0 : t.document) || document, n = (t == null ? void 0 : t.trapStack) || rd, r = Oa({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: ad,
    isKeyBackward: nd
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
  }, s, o = function(g, L, W) {
    return g && g[L] !== void 0 ? g[L] : r[W || L];
  }, u = function(g, L) {
    var W = typeof (L == null ? void 0 : L.composedPath) == "function" ? L.composedPath() : void 0;
    return l.containerGroups.findIndex(function(J) {
      var te = J.container, A = J.tabbableNodes;
      return te.contains(g) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (W == null ? void 0 : W.includes(te)) || A.find(function(O) {
        return O === g;
      });
    });
  }, d = function(g) {
    var L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, W = L.hasFallback, J = W === void 0 ? !1 : W, te = L.params, A = te === void 0 ? [] : te, O = r[g];
    if (typeof O == "function" && (O = O.apply(void 0, Xu(A))), O === !0 && (O = void 0), !O) {
      if (O === void 0 || O === !1)
        return O;
      throw new Error("`".concat(g, "` was specified but was not a node, or did not return a node"));
    }
    var ee = O;
    if (typeof O == "string") {
      try {
        ee = e.querySelector(O);
      } catch (G) {
        throw new Error("`".concat(g, '` appears to be an invalid selector; error="').concat(G.message, '"'));
      }
      if (!ee && !J)
        throw new Error("`".concat(g, "` as selector refers to no known node"));
    }
    return ee;
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
        var L = l.tabbableGroups[0], W = L && L.firstTabbableNode;
        g = W || d("fallbackFocus");
      }
    else g === null && (g = d("fallbackFocus"));
    if (!g)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return g;
  }, v = function() {
    if (l.containerGroups = l.containers.map(function(g) {
      var L = Hu(g, r.tabbableOptions), W = Wu(g, r.tabbableOptions), J = L.length > 0 ? L[0] : void 0, te = L.length > 0 ? L[L.length - 1] : void 0, A = W.find(function(G) {
        return We(G);
      }), O = W.slice().reverse().find(function(G) {
        return We(G);
      }), ee = !!L.find(function(G) {
        return Ne(G) > 0;
      });
      return {
        container: g,
        tabbableNodes: L,
        focusableNodes: W,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: ee,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: J,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode: te,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode: A,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: O,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(G) {
          var ue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, he = L.indexOf(G);
          return he < 0 ? ue ? W.slice(W.indexOf(G) + 1).find(function(K) {
            return We(K);
          }) : W.slice(0, W.indexOf(G)).reverse().find(function(K) {
            return We(K);
          }) : L[he + (ue ? 1 : -1)];
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
    var L = g.activeElement;
    if (L)
      return L.shadowRoot && L.shadowRoot.activeElement !== null ? m(L.shadowRoot) : L;
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
  }, x = function(g) {
    var L = d("setReturnFocus", {
      params: [g]
    });
    return L || (L === !1 ? !1 : g);
  }, B = function(g) {
    var L = g.target, W = g.event, J = g.isBackward, te = J === void 0 ? !1 : J;
    L = L || ut(W), v();
    var A = null;
    if (l.tabbableGroups.length > 0) {
      var O = u(L, W), ee = O >= 0 ? l.containerGroups[O] : void 0;
      if (O < 0)
        te ? A = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : A = l.tabbableGroups[0].firstTabbableNode;
      else if (te) {
        var G = l.tabbableGroups.findIndex(function(de) {
          var fe = de.firstTabbableNode;
          return L === fe;
        });
        if (G < 0 && (ee.container === L || Bt(L, r.tabbableOptions) && !We(L, r.tabbableOptions) && !ee.nextTabbableNode(L, !1)) && (G = O), G >= 0) {
          var ue = G === 0 ? l.tabbableGroups.length - 1 : G - 1, he = l.tabbableGroups[ue];
          A = Ne(L) >= 0 ? he.lastTabbableNode : he.lastDomTabbableNode;
        } else et(W) || (A = ee.nextTabbableNode(L, !1));
      } else {
        var K = l.tabbableGroups.findIndex(function(de) {
          var fe = de.lastTabbableNode;
          return L === fe;
        });
        if (K < 0 && (ee.container === L || Bt(L, r.tabbableOptions) && !We(L, r.tabbableOptions) && !ee.nextTabbableNode(L)) && (K = O), K >= 0) {
          var X = K === l.tabbableGroups.length - 1 ? 0 : K + 1, le = l.tabbableGroups[X];
          A = Ne(L) >= 0 ? le.firstTabbableNode : le.firstDomTabbableNode;
        } else et(W) || (A = ee.nextTabbableNode(L));
      }
    } else
      A = d("fallbackFocus");
    return A;
  }, y = function(g) {
    var L = ut(g);
    if (!(u(L, g) >= 0)) {
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
    var L = ut(g), W = u(L, g) >= 0;
    if (W || L instanceof Document)
      W && (l.mostRecentlyFocusedNode = L);
    else {
      g.stopImmediatePropagation();
      var J, te = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ne(l.mostRecentlyFocusedNode) > 0) {
          var A = u(l.mostRecentlyFocusedNode), O = l.containerGroups[A].tabbableNodes;
          if (O.length > 0) {
            var ee = O.findIndex(function(G) {
              return G === l.mostRecentlyFocusedNode;
            });
            ee >= 0 && (r.isKeyForward(l.recentNavEvent) ? ee + 1 < O.length && (J = O[ee + 1], te = !1) : ee - 1 >= 0 && (J = O[ee - 1], te = !1));
          }
        } else
          l.containerGroups.some(function(G) {
            return G.tabbableNodes.some(function(ue) {
              return Ne(ue) > 0;
            });
          }) || (te = !1);
      else
        te = !1;
      te && (J = B({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), I(J || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, T = function(g) {
    var L = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = g;
    var W = B({
      event: g,
      isBackward: L
    });
    W && (et(g) && g.preventDefault(), I(W));
  }, S = function(g) {
    (r.isKeyForward(g) || r.isKeyBackward(g)) && T(g, r.isKeyBackward(g));
  }, D = function(g) {
    td(g) && Ue(r.escapeDeactivates, g) !== !1 && (g.preventDefault(), s.deactivate());
  }, C = function(g) {
    var L = ut(g);
    u(L, g) >= 0 || Ue(r.clickOutsideDeactivates, g) || Ue(r.allowOutsideClick, g) || (g.preventDefault(), g.stopImmediatePropagation());
  }, P = function() {
    if (l.active)
      return Ra.activateTrap(n, s), l.delayInitialFocusTimer = r.delayInitialFocus ? Fa(function() {
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
  }, _ = function() {
    if (l.active)
      return e.removeEventListener("focusin", w, !0), e.removeEventListener("mousedown", y, !0), e.removeEventListener("touchstart", y, !0), e.removeEventListener("click", C, !0), e.removeEventListener("keydown", S, !0), e.removeEventListener("keydown", D), s;
  }, N = function(g) {
    var L = g.some(function(W) {
      var J = Array.from(W.removedNodes);
      return J.some(function(te) {
        return te === l.mostRecentlyFocusedNode;
      });
    });
    L && I(p());
  }, E = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(N) : void 0, M = function() {
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
      var L = o(g, "onActivate"), W = o(g, "onPostActivate"), J = o(g, "checkCanFocusTrap");
      J || v(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, L == null || L();
      var te = function() {
        J && v(), P(), M(), W == null || W();
      };
      return J ? (J(l.containers.concat()).then(te, te), this) : (te(), this);
    },
    deactivate: function(g) {
      if (!l.active)
        return this;
      var L = Oa({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, g);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, _(), l.active = !1, l.paused = !1, M(), Ra.deactivateTrap(n, s);
      var W = o(L, "onDeactivate"), J = o(L, "onPostDeactivate"), te = o(L, "checkCanReturnFocus"), A = o(L, "returnFocus", "returnFocusOnDeactivate");
      W == null || W();
      var O = function() {
        Fa(function() {
          A && I(x(l.nodeFocusedBeforeActivation)), J == null || J();
        });
      };
      return A && te ? (te(x(l.nodeFocusedBeforeActivation)).then(O, O), this) : (O(), this);
    },
    pause: function(g) {
      return l.active ? (l.manuallyPaused = !0, this._setPausedState(!0, g)) : this;
    },
    unpause: function(g) {
      return l.active ? (l.manuallyPaused = !1, n[n.length - 1] !== this ? this : this._setPausedState(!1, g)) : this;
    },
    updateContainerElements: function(g) {
      var L = [].concat(g).filter(Boolean);
      return l.containers = L.map(function(W) {
        return typeof W == "string" ? e.querySelector(W) : W;
      }), l.active && v(), M(), this;
    }
  }, Object.defineProperties(s, {
    _isManuallyPaused: {
      value: function() {
        return l.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(g, L) {
        if (l.paused === g)
          return this;
        if (l.paused = g, g) {
          var W = o(L, "onPause"), J = o(L, "onPostPause");
          W == null || W(), _(), M(), J == null || J();
        } else {
          var te = o(L, "onUnpause"), A = o(L, "onPostUnpause");
          te == null || te(), v(), P(), M(), A == null || A();
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
  setup(a, { slots: t, emit: e }) {
    let n;
    const r = Q(null), l = k(() => {
      const o = r.value;
      return o && (o instanceof HTMLElement ? o : o.$el);
    });
    function s() {
      return n || (n = ld(l.value, {
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
    return xe(() => {
      pe(() => a.active, (o) => {
        o && l.value ? s().activate() : n && (n.deactivate(), (!l.value || l.value.nodeType === Node.COMMENT_NODE) && (n = null));
      }, { immediate: !0, flush: "post" });
    }), Ee(() => {
      n && n.deactivate(), n = null;
    }), {
      activate() {
        s().activate();
      },
      deactivate() {
        n && n.deactivate();
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
}, Va = 2, gd = /* @__PURE__ */ F({
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = (x) => {
      x.key === "Escape" && v();
    }, l = k(() => e.isAlert ? "alertdialog" : "dialog"), s = Q(null), o = Q();
    pe(() => e.opened, (x) => {
      var B, y;
      x ? ((B = o.value) == null || B.showModal(), setTimeout(() => {
        var w;
        (w = s.value) == null || w.focus();
      }, 100)) : (y = o.value) == null || y.close(), u(x);
    });
    function u(x) {
      typeof window < "u" && document.body.classList.toggle("modal-open", x);
    }
    xe(() => {
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
      var x;
      await Ga(), (x = e.origin) == null || x.focus(), n("close");
    }
    const m = k(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), I = k(
      () => m.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Va } : { scale: Va, ...e.icon ?? {} }
    );
    return (x, B) => x.opened ? (i(), H(j(od), { key: 0 }, {
      default: U(() => {
        var y, w;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: o,
            "aria-modal": "true",
            "aria-labelledby": x.modalId,
            role: l.value,
            class: R(["fr-modal", { "fr-modal--opened": x.opened }]),
            open: x.opened
          }, [
            c("div", ud, [
              c("div", dd, [
                c("div", {
                  class: R(["fr-col-12", {
                    "fr-col-md-8": x.size === "lg",
                    "fr-col-md-6": x.size === "md",
                    "fr-col-md-4": x.size === "sm"
                  }])
                }, [
                  c("div", cd, [
                    c("div", fd, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: s,
                        class: "fr-btn fr-btn--close",
                        title: x.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: B[0] || (B[0] = (T) => v())
                      }, [
                        c("span", null, h(x.closeButtonLabel), 1)
                      ], 8, pd)
                    ]),
                    c("div", md, [
                      c("h1", {
                        id: x.modalId,
                        class: "fr-modal__title"
                      }, [
                        m.value || I.value ? (i(), f("span", {
                          key: 0,
                          class: R({
                            [String(x.icon)]: m.value
                          })
                        }, [
                          x.icon && I.value ? (i(), H(ke, Ce(Y({ key: 0 }, I.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        V(" " + h(x.title), 1)
                      ], 8, hd),
                      $(x.$slots, "default", {}, void 0, !0)
                    ]),
                    (y = x.actions) != null && y.length || x.$slots.footer ? (i(), f("div", vd, [
                      $(x.$slots, "footer", {}, void 0, !0),
                      (w = x.actions) != null && w.length ? (i(), H(It, {
                        key: 0,
                        align: "right",
                        buttons: x.actions,
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
}), In = /* @__PURE__ */ _e(gd, [["__scopeId", "data-v-70fe954b"]]), bd = ["for"], yd = {
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
  props: /* @__PURE__ */ Le({
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
  setup(a) {
    const t = a, e = (K, X) => typeof K == "object" && K !== null && !!X && X in K, n = (K, X) => {
      if (X && e(K, X)) {
        const le = K[X];
        if (typeof le == "string" || typeof le == "number")
          return le;
        throw new Error(
          `The value of idKey ${String(X)} is not a string or number.`
        );
      }
      if (typeof K == "string" || typeof K == "number")
        return K;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (K, X, le) => `${X}-${n(K, le)}`, l = Q(null), s = Q(!1), o = De(a, "modelValue"), u = Q(0), d = k(() => t.errorMessage || t.successMessage), p = k(() => t.errorMessage ? "error" : "valid"), v = [], {
      collapse: m,
      collapsing: I,
      cssExpanded: x,
      doExpand: B,
      onTransitionEnd: y
    } = Se(), w = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), T = Q(!1), S = Q("");
    function D(K) {
      K.key === "Escape" && E();
    }
    function C(K) {
      var X, le;
      const de = K.target;
      !((X = l.value) != null && X.$el.contains(de)) && !((le = m.value) != null && le.contains(de)) && E();
    }
    function P(K, X) {
      if (window.ResizeObserver) {
        const le = new window.ResizeObserver((de) => {
          for (const fe of de)
            X(K, fe);
        });
        return le.observe(K), () => {
          le.unobserve(K), le.disconnect();
        };
      }
      return () => {
      };
    }
    function _(K) {
      const X = K.getBoundingClientRect();
      X.width !== u.value && (u.value = X.width);
    }
    function N() {
      s.value = !0, T.value = !0, l.value && v.push(P(l.value.$el, _)), document.addEventListener("click", C), document.addEventListener("keydown", D), setTimeout(() => {
        B(!0);
      }, 100);
    }
    function E() {
      s.value = !1, B(!1), setTimeout(() => {
        T.value = !1;
      }, 300), g();
    }
    const M = async () => {
      T.value ? E() : N();
    };
    function g() {
      for (; v.length; ) {
        const K = v.pop();
        K && K();
      }
      document.removeEventListener("click", C), document.removeEventListener("keydown", D);
    }
    const L = k(
      () => t.options.filter((K) => typeof K == "object" && K !== null ? t.filteringKeys.some(
        (X) => `${K[X]}`.toLowerCase().includes(S.value.toLowerCase())
      ) : `${K}`.toLowerCase().includes(S.value.toLowerCase()))
    ), W = k(() => t.modelValue.length < L.value.length ? !1 : L.value.every((K) => {
      const X = n(K, t.idKey);
      return t.modelValue.includes(X);
    })), J = () => {
      const K = new Set(o.value || []);
      W.value ? L.value.forEach((X) => {
        const le = n(X, t.idKey);
        K.delete(le);
      }) : L.value.forEach((X) => {
        const le = n(X, t.idKey);
        K.add(le);
      }), o.value = Array.from(K);
    }, te = (K) => {
      const [X] = w();
      X && (K.preventDefault(), X.focus());
    }, A = (K) => {
      K.preventDefault();
      const X = w(), le = document.activeElement, de = Array.from(X).indexOf(le);
      if (de !== -1) {
        const fe = (de + 1) % X.length;
        X[fe].focus();
      }
    }, O = (K) => {
      K.preventDefault();
      const X = w(), le = document.activeElement, de = Array.from(X).indexOf(le);
      if (de !== -1) {
        const fe = (de - 1 + X.length) % X.length;
        X[fe].focus();
      }
    }, ee = (K) => {
      const X = w(), le = document.activeElement;
      Array.from(X).indexOf(le) + 1 === X.length && l.value && !K.shiftKey && E();
    }, G = (K) => {
      var X;
      const le = document.activeElement;
      K.shiftKey && le === ((X = l.value) == null ? void 0 : X.$el) && E();
    };
    Ee(() => {
      g();
    });
    const ue = k(() => {
      var K;
      const X = ((K = o.value) == null ? void 0 : K.length) ?? 0, le = X === 0, de = X > 1;
      return le ? "Sélectionner une option" : `${X} option${de ? "s" : ""} sélectionnée${de ? "s" : ""}`;
    }), he = k(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (K, X) => {
      var le, de;
      return i(), f("div", {
        class: R(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
      }, [
        c("label", {
          class: R(he.value),
          for: K.id
        }, [
          $(K.$slots, "label", {}, () => [
            V(h(K.label) + " ", 1),
            $(K.$slots, "required-tip", {}, () => [
              "required" in K.$attrs && K.$attrs.required !== !1 ? (i(), f("span", yd)) : b("", !0)
            ], !0)
          ], !0),
          t.hint || (de = (le = K.$slots).hint) != null && de.call(le) ? (i(), f("span", kd, [
            $(K.$slots, "hint", {}, () => [
              V(h(t.hint), 1)
            ], !0)
          ])) : b("", !0)
        ], 10, bd),
        ae(je, Y({
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
          onClick: M,
          onKeydown: re(ne(G, ["shift"]), ["tab"])
        }), {
          default: U(() => [
            $(K.$slots, "button-label", {}, () => [
              V(h(t.buttonLabel || ue.value), 1)
            ], !0)
          ]),
          _: 3
        }, 16, ["id", "aria-expanded", "aria-controls", "class", "onKeydown"]),
        T.value ? (i(), f("div", {
          key: 0,
          id: `${t.id}-collapse`,
          ref_key: "collapse",
          ref: m,
          style: Ie({
            "--width-host": `${u.value}px`
          }),
          class: R(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": j(x), "fr-collapsing": j(I) }]),
          onTransitionend: X[2] || (X[2] = (fe) => j(y)(s.value))
        }, [
          c("p", {
            id: `${K.id}-text-hint`,
            class: "fr-sr-only"
          }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, _d),
          K.selectAll ? (i(), f("ul", xd, [
            c("li", null, [
              ae(je, {
                type: "button",
                name: "select-all",
                secondary: "",
                size: "sm",
                disabled: L.value.length === 0,
                onClick: J,
                onKeydown: re(ne(G, ["shift"]), ["tab"])
              }, {
                default: U(() => [
                  c("span", {
                    class: R([
                      "fr-multiselect__search__icon",
                      W.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                    ])
                  }, null, 2),
                  V(" " + h(t.selectAllLabel[W.value ? 1 : 0]), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onKeydown"])
            ])
          ])) : b("", !0),
          t.search ? (i(), f("div", Dd, [
            c("div", Td, [
              ae(Et, {
                modelValue: S.value,
                "onUpdate:modelValue": X[0] || (X[0] = (fe) => S.value = fe),
                "aria-describedby": `${t.id}-text-hint`,
                "aria-controls": `${t.id}-checkboxes`,
                "aria-live": "polite",
                placeholder: "Rechercher",
                type: "text",
                onKeydown: [
                  re(te, ["down"]),
                  re(te, ["right"]),
                  re(G, ["tab"])
                ]
              }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
            ]),
            X[3] || (X[3] = c("div", {
              class: "fr-messages-group",
              "aria-live": "assertive"
            }, null, -1))
          ])) : b("", !0),
          ae(mn, {
            id: `${t.id}-checkboxes`,
            class: "fr-multiselect__collapse__fieldset",
            "aria-live": "polite",
            style: Ie({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
            legend: t.legend,
            "legend-id": `${t.id}-checkboxes-legend`
          }, {
            default: U(() => [
              $(K.$slots, "legend", {}, void 0, !0),
              (i(!0), f(z, null, Z(L.value, (fe) => (i(), f("div", {
                key: `${r(fe, K.id, t.idKey)}-checkbox`,
                class: "fr-fieldset__element"
              }, [
                c("div", Id, [
                  ae(Ct, {
                    id: `${r(fe, K.id, t.idKey)}-checkbox`,
                    modelValue: o.value,
                    "onUpdate:modelValue": X[1] || (X[1] = (ot) => o.value = ot),
                    value: n(fe, t.idKey),
                    name: `${r(fe, K.id, t.idKey)}-checkbox`,
                    small: "",
                    onKeydown: [
                      re(A, ["down"]),
                      re(A, ["right"]),
                      re(O, ["up"]),
                      re(O, ["left"]),
                      re(ee, ["tab"])
                    ]
                  }, {
                    label: U(() => [
                      $(K.$slots, "checkbox-label", {
                        option: fe
                      }, () => [
                        V(h(n(fe, t.labelKey)), 1)
                      ], !0)
                    ]),
                    _: 2
                  }, 1032, ["id", "modelValue", "value", "name"])
                ])
              ]))), 128))
            ]),
            _: 3
          }, 8, ["id", "style", "legend", "legend-id"]),
          L.value.length === 0 ? (i(), f("div", Cd, [
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
}), Md = /* @__PURE__ */ _e(Pd, [["__scopeId", "data-v-829d79d0"]]), Ld = ["id", "aria-current"], Bd = /* @__PURE__ */ F({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => se("nav", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-nav__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      $(t.$slots, "default", {}, void 0, !0)
    ], 8, Ld));
  }
}), Cn = /* @__PURE__ */ _e(Bd, [["__scopeId", "data-v-aa4076c4"]]), Sd = ["href"], Na = 2, Pt = /* @__PURE__ */ F({
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
  setup(a) {
    const t = a, e = k(() => typeof t.to == "string" && t.to.startsWith("http")), n = k(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = k(
      () => n.value || !t.icon ? void 0 : typeof t.icon == "string" ? { scale: Na, name: t.icon } : { scale: Na, ...t.icon || {} }
    ), l = cr() ? Qe(la) : void 0, s = (l == null ? void 0 : l()) ?? (() => {
    });
    return (o, u) => {
      const d = Te("RouterLink");
      return e.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: o.to,
        onClick: u[0] || (u[0] = (p) => {
          o.$emit("toggleId", o.id), o.onClick(p);
        })
      }, h(o.text), 9, Sd)) : (i(), H(d, {
        key: 1,
        class: R(["fr-nav__link", {
          [String(o.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: o.to,
        onClick: u[1] || (u[1] = (p) => {
          var v;
          j(s)(), o.$emit("toggleId", o.id), (v = o.onClick) == null || v.call(o, p);
        })
      }, {
        default: U(() => [
          o.icon && r.value ? (i(), H(ke, Ce(Y({ key: 0 }, r.value)), null, 16)) : b("", !0),
          V(" " + h(o.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), $d = { class: "fr-col-12 fr-col-lg-3" }, Ad = { class: "fr-mega-menu__category" }, Od = { class: "fr-mega-menu__list" }, En = /* @__PURE__ */ F({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", $d, [
      c("h5", Ad, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: e[0] || (e[0] = ne(() => {
          }, ["prevent"]))
        }, h(t.title), 1)
      ]),
      c("ul", Od, [
        (i(!0), f(z, null, Z(t.links, (n, r) => (i(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          ae(Pt, Y({ ref_for: !0 }, n), null, 16)
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
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se(), o = k(() => t.id === t.expandedId);
    return pe(o, (u, d) => {
      u !== d && l(u);
    }), xe(() => {
      o.value && l(!0);
    }), (u, d) => {
      const p = Te("RouterLink");
      return i(), f(z, null, [
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
            "fr-collapse--expanded": j(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": j(n)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (v) => j(s)(o.value))
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
                  ae(p, {
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
              (i(!0), f(z, null, Z(u.menus, (v, m) => (i(), H(En, Y({
                key: m,
                ref_for: !0
              }, v), null, 16))), 128))
            ])
          ])
        ], 42, Fd)
      ], 64);
    };
  }
}), Pn = /* @__PURE__ */ _e(Kd, [["__scopeId", "data-v-1e103394"]]), Qd = ["id", "aria-current"], Mn = /* @__PURE__ */ F({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => se("menu", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-menu__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      $(t.$slots, "default")
    ], 8, Qd));
  }
}), Yd = ["aria-expanded", "aria-current", "aria-controls"], zd = ["id"], Gd = { class: "fr-menu__list" }, Ln = /* @__PURE__ */ F({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => se("menu") },
    title: {},
    links: { default: () => [] },
    expandedId: { default: "" },
    active: { type: Boolean }
  },
  emits: ["toggleId"],
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se(), o = k(() => t.id === t.expandedId);
    return pe(o, (u, d) => {
      u !== d && l(u);
    }), xe(() => {
      o.value && l(!0);
    }), (u, d) => (i(), f(z, null, [
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
        class: R(["fr-collapse fr-menu", { "fr-collapse--expanded": j(r), "fr-collapsing": j(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => j(s)(o.value))
      }, [
        c("ul", Gd, [
          $(u.$slots, "default"),
          (i(!0), f(z, null, Z(u.links, (p, v) => (i(), H(Mn, { key: v }, {
            default: U(() => [
              ae(Pt, Y({ ref_for: !0 }, p, {
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
  setup(a) {
    const t = a, e = Q(void 0), n = (o) => {
      if (o === e.value) {
        e.value = void 0;
        return;
      }
      e.value = o;
    }, r = (o) => {
      if (o !== document.getElementById(t.id)) {
        if (!(o != null && o.parentNode)) {
          n(e.value);
          return;
        }
        r(o.parentNode);
      }
    }, l = (o) => {
      r(o.target);
    }, s = (o) => {
      o.key === "Escape" && n(e.value);
    };
    return xe(() => {
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
        (i(!0), f(z, null, Z(o.navItems, (d, p) => (i(), H(Cn, {
          id: d.id,
          key: p
        }, {
          default: U(() => [
            d.to && d.text ? (i(), H(Pt, Y({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), H(Ln, Y({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), H(Pn, Y({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, Xd));
  }
}), Jd = { class: "fr-container" }, ec = { class: "fr-notice__body" }, tc = { class: "fr-notice__title" }, ac = { class: "fr-notice__desc" }, nc = /* @__PURE__ */ F({
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
            c("span", ac, [
              $(t.$slots, "desc", {}, () => [
                V(h(t.desc), 1)
              ])
            ])
          ]),
          t.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: e[0] || (e[0] = (n) => t.$emit("close"))
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
  setup(a) {
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
  setup(a) {
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
          (i(!0), f(z, null, Z(t.details, (n, r) => (i(), f("li", { key: r }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, h(n.label), 9, pc)) : (i(), f(z, { key: 1 }, [
              V(h(n), 1)
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
}, _c = ["src", "title"], xc = { key: 0 }, Dc = ["href"], Tc = ["href"], Ic = ["href"], Bn = /* @__PURE__ */ F({
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
  setup(a) {
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = k(() => !!t.img || !!t.svgPath);
    return (r, l) => (i(), f("div", {
      class: R(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: R(["fr-radio-group", {
          "fr-radio-rich": n.value,
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = k(() => e.errorMessage || e.validMessage), l = k(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), s = (u) => {
      u !== e.modelValue && n("update:modelValue", u);
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
          (i(!0), f(z, null, Z(u.options, (p, v) => (i(), H(Bn, Y({
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = Q(), l = Q(), s = Q(), o = k(() => e.lowerValue !== void 0), u = k(() => e.step !== void 0), d = k(() => {
      if (e.lowerValue === void 0) {
        const m = (e.modelValue - e.min) / (e.max - e.min) * s.value;
        return `transform: translateX(${m}px) translateX(-${m / s.value * 100}%);`;
      }
      return `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * s.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`;
    }), p = k(() => {
      const m = e.max - e.min, I = (e.modelValue - e.min) / m, x = ((e.lowerValue ?? 0) - e.min) / m, B = e.small ? 12 : 24, y = (s.value - B) / (m / (e.step ?? 2)), w = o.value ? 32 * (1 - I) : 0;
      return {
        "--progress-right": `${(I * s.value + w).toFixed(2)}px`,
        ...o.value ? { "--progress-left": `${(x * s.value).toFixed(2)}px` } : {},
        ...u.value ? { "--step-width": `${Math.floor(y)}px` } : {}
      };
    });
    pe([() => e.modelValue, () => e.lowerValue], ([m, I]) => {
      I !== void 0 && (o.value && m < I && n("update:lowerValue", m), o.value && I > m && n("update:modelValue", I));
    });
    const v = k(() => (e.prefix ?? "").concat(o.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return xe(() => {
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
        style: Ie(p.value)
      }, [
        c("span", {
          ref_key: "output",
          ref: l,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: Ie(d.value)
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
          onInput: I[0] || (I[0] = (x) => {
            var B;
            return n("update:lowerValue", +((B = x.target) == null ? void 0 : B.value));
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
          onInput: I[1] || (I[1] = (x) => {
            var B;
            return n("update:modelValue", +((B = x.target) == null ? void 0 : B.value));
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
}), Kc = { class: "fr-segmented__element" }, Qc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Yc = ["for"], zc = { key: 1 }, Sn = /* @__PURE__ */ F({
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
  setup(a) {
    const t = a, e = k(() => typeof t.icon == "string" ? { name: t.icon } : t.icon), n = k(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : "");
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
        class: R(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (i(), H(ke, Ce(Y({ key: 0 }, e.value)), null, 16)) : b("", !0),
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = (l) => {
      l !== e.modelValue && n("update:modelValue", l);
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
            (i(!0), f(z, null, Z(l.options, (o, u) => (i(), H(Sn, Y({
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
}), tf = ["for"], af = {
  key: 0,
  class: "required"
}, nf = {
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
  setup(a) {
    const t = a;
    t.description && console.warn(
      "[DsfrSelect] : La prop `description` est dépréciée. Veuillez utiliser `hint` à la place."
    );
    const e = k(() => t.errorMessage || t.successMessage), n = k(() => t.errorMessage ? "error" : "valid");
    return (r, l) => (i(), f("div", {
      class: R(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        $(r.$slots, "label", {}, () => [
          V(h(r.label) + " ", 1),
          $(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", af, " *")) : b("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", nf, h(r.hint ?? r.description), 1)) : b("", !0)
      ], 8, tf),
      c("select", Y({
        id: r.selectId,
        class: [{ [`fr-select--${n.value}`]: e.value }, "fr-select"],
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
        (i(!0), f(z, null, Z(r.options, (s, o) => (i(), f("option", {
          key: o,
          selected: r.modelValue === s || typeof s == "object" && s.value === r.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, h(typeof s == "object" ? s.text : s), 9, sf))), 128))
      ], 16, rf),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: R(`fr-${n.value}-text`)
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
  setup(a) {
    const t = () => {
      const n = window.location.href;
      navigator.clipboard.writeText(n);
    }, e = ({ url: n, label: r }) => {
      window.open(
        n,
        r,
        "toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450"
      );
    };
    return (n, r) => {
      var l;
      return i(), f("div", df, [
        c("p", cf, h(n.title), 1),
        c("ul", ff, [
          (i(!0), f(z, null, Z(n.networks, (s, o) => (i(), f("li", { key: o }, [
            c("a", {
              class: R(`fr-btn fr-btn--${s.name}`),
              title: `${s.label} - nouvelle fenêtre`,
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: ne((u) => e(s), ["prevent"])
            }, h(s.label), 11, pf)
          ]))), 128)),
          (l = n.mail) != null && l.to ? (i(), f("li", mf, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, h(n.mail.label), 9, hf)
          ])) : b("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: r[0] || (r[0] = (s) => t())
            }, h(n.copyLabel), 9, vf)
          ])
        ])
      ]);
    };
  }
}), bf = ["aria-current", "aria-expanded", "aria-controls"], $n = /* @__PURE__ */ F({
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
      onClick: e[0] || (e[0] = (n) => t.$emit("toggleExpand", t.controlId))
    }, [
      $(t.$slots, "default")
    ], 8, bf));
  }
}), An = /* @__PURE__ */ F({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      class: R(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      $(t.$slots, "default")
    ], 2));
  }
}), yf = ["id"], kf = { class: "fr-sidemenu__list" }, On = /* @__PURE__ */ F({
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
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se();
    pe(() => t.expanded, (p, v) => {
      p !== v && l(p);
    }), xe(() => {
      t.expanded && l(!0);
    });
    const o = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => o(p) ? "a" : "RouterLink", d = (p) => ({ [o(p) ? "href" : "to"]: p });
    return (p, v) => {
      const m = Te("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: R({
          "fr-collapse": p.collapsable,
          "fr-collapsing": j(n),
          "fr-collapse--expanded": j(r)
        }),
        onTransitionend: v[2] || (v[2] = (I) => j(s)(!!p.expanded, p.focusOnExpanding))
      }, [
        c("ul", kf, [
          $(p.$slots, "default"),
          (i(!0), f(z, null, Z(p.menuItems, (I, x) => (i(), H(An, {
            key: x,
            active: I.active
          }, {
            default: U(() => [
              I.menuItems ? b("", !0) : (i(), H(be(u(I.to)), Y({
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
              I.menuItems ? (i(), f(z, { key: 1 }, [
                ae($n, {
                  active: !!I.active,
                  expanded: !!I.expanded,
                  "control-id": I.id,
                  onToggleExpand: v[0] || (v[0] = (B) => p.$emit("toggleExpand", B))
                }, {
                  default: U(() => [
                    V(h(I.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                I.menuItems ? (i(), H(m, {
                  key: 0,
                  id: I.id,
                  collapsable: "",
                  expanded: I.expanded,
                  "menu-items": I.menuItems,
                  onToggleExpand: v[1] || (v[1] = (B) => p.$emit("toggleExpand", B))
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
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = Se(), s = Q(!1);
    return pe(s, (o, u) => {
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
          onClick: u[0] || (u[0] = ne((d) => s.value = !s.value, ["prevent", "stop"]))
        }, h(o.buttonLabel), 9, xf),
        c("div", {
          id: o.id,
          ref_key: "collapse",
          ref: t,
          class: R(["fr-collapse", {
            "fr-collapse--expanded": j(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": j(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => j(l)(s.value, o.focusOnExpanding))
        }, [
          (i(), H(be(o.titleTag), { class: "fr-sidemenu__title" }, {
            default: U(() => [
              V(h(o.headingTitle), 1)
            ]),
            _: 1
          })),
          $(o.$slots, "default", {}, () => [
            ae(On, {
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
  setup(a) {
    const t = a, e = k(() => typeof t.to == "string" && t.to.startsWith("http")), n = k(() => e.value ? "a" : "RouterLink"), r = k(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, s) => (i(), H(be(n.value), Y({
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
  setup(a) {
    const t = (e) => {
      const n = document.getElementById(e);
      n == null || n.focus();
    };
    return (e, n) => (i(), f("div", Cf, [
      c("nav", Ef, [
        c("ul", Pf, [
          (i(!0), f(z, null, Z(e.links, (r) => (i(), f("li", {
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
  setup(a) {
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
  setup(a) {
    return (t, e) => (i(), f("nav", Vf, [
      c("h2", Nf, h(t.title), 1),
      c("ol", qf, [
        (i(!0), f(z, null, Z(t.anchors, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, h(n.name), 9, jf)
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
  setup(a) {
    Gt((u) => ({
      "7152af7e": s.value,
      "2a62e962": o.value
    }));
    const t = a, e = { true: "100%", false: "-100%" }, n = Qe(Tt), { isVisible: r, asc: l } = n(st(() => t.tabId)), s = k(() => e[String(l == null ? void 0 : l.value)]), o = k(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), H(vr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: U(() => [
        Be(c("div", {
          id: u.panelId,
          class: R(["fr-tabs__panel", {
            "fr-tabs__panel--selected": j(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: j(r) ? 0 : -1
        }, [
          $(u.$slots, "default", {}, void 0, !0)
        ], 10, Wf), [
          [gr, j(r)]
        ])
      ]),
      _: 3
    }));
  }
}), Rn = /* @__PURE__ */ _e(Kf, [["__scopeId", "data-v-5774b16c"]]), Qf = { role: "presentation" }, Yf = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], zf = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, Fn = /* @__PURE__ */ F({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = Q(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      Home: "first",
      End: "last"
    };
    function s(p) {
      const v = p == null ? void 0 : p.key, m = l[v];
      m && n(m);
    }
    const o = Qe(Tt), { isVisible: u } = o(st(() => e.tabId)), d = fr("button");
    return pe(u, () => {
      var p;
      u.value && ((p = d.value) == null || p.focus());
    }), (p, v) => (i(), f("li", Qf, [
      c("button", {
        id: p.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${p.tabId}`,
        class: "fr-tabs__tab",
        tabindex: j(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": j(u),
        "aria-controls": p.panelId,
        onClick: v[0] || (v[0] = ne((m) => p.$emit("click", p.tabId), ["prevent"])),
        onKeydown: v[1] || (v[1] = (m) => s(m))
      }, [
        p.icon ? (i(), f("span", zf, [
          ae(ke, { name: p.icon }, null, 8, ["name"])
        ])) : b("", !0),
        $(p.$slots, "default")
      ], 40, Yf)
    ]));
  }
}), Vn = /* @__PURE__ */ F({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = k(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = k(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", Y(r.headerAttrs, { scope: "col" }), [
      V(h(r.header) + " ", 1),
      r.icon && !e.value ? (i(), H(ke, Ce(Y({ key: 0 }, n.value)), null, 16)) : b("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: R({ [String(r.icon)]: e.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), Gf = { key: 0 }, Nn = /* @__PURE__ */ F({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (t, e) => t.headers ? (i(), f("tr", Gf, [
      (i(!0), f(z, null, Z(t.headers, (n, r) => (i(), H(Vn, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), qn = /* @__PURE__ */ F({
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
    const t = a, e = k(() => typeof t.field == "object" && t.field !== null && t.field.component ? t.field.component : !1), n = k(() => ["string", "number", "boolean"].includes(typeof t.field));
    return (r, l) => (i(), f("td", Ce(wt(r.cellAttrs)), [
      e.value ? (i(), H(be(e.value), Ce(Y({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: U(() => [
          V(h(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(z, { key: 1 }, [
        V(h(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), jn = /* @__PURE__ */ F({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (t, e) => (i(), f("tr", Ce(wt(t.rowAttrs)), [
      $(t.$slots, "default"),
      (i(!0), f(z, null, Z(t.rowData, (n, r) => (i(), H(qn, {
        key: r,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Xf = { class: "caption" }, Uf = { key: 1 }, Zf = ["colspan"], Jf = { class: "flex justify-right" }, ep = { class: "self-center" }, tp = ["for"], ap = ["id"], np = ["value"], rp = {
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = (w) => Array.isArray(w) ? w : w.rowData, l = Q(e.currentPage), s = se("resultPerPage"), o = Q(e.resultsDisplayed), u = k(
      () => e.rows.length > o.value ? Math.ceil(e.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * o.value - o.value, v = () => l.value * o.value, m = k(() => e.pagination ? e.rows.slice(p(), v()) : e.rows), I = () => {
      l.value = 1, n("update:currentPage");
    }, x = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, B = () => {
      l.value < u.value && (l.value += 1, n("update:currentPage"));
    }, y = () => {
      l.value = u.value, n("update:currentPage");
    };
    return (w, T) => (i(), f("div", {
      class: R(["fr-table", { "fr-table--no-caption": w.noCaption }])
    }, [
      c("table", null, [
        c("caption", Xf, h(w.title), 1),
        c("thead", null, [
          $(w.$slots, "header", {}, () => [
            w.headers && w.headers.length ? (i(), H(Nn, {
              key: 0,
              headers: w.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          $(w.$slots, "default", {}, void 0, !0),
          w.rows && w.rows.length ? (i(!0), f(z, { key: 0 }, Z(m.value, (S, D) => (i(), H(jn, {
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
                  c("label", { for: j(s) }, "Résultats par page : ", 8, tp),
                  Be(c("select", {
                    id: j(s),
                    "onUpdate:modelValue": T[0] || (T[0] = (S) => o.value = S),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: T[1] || (T[1] = (S) => n("update:currentPage"))
                  }, [
                    (i(), f(z, null, Z(d, (S, D) => c("option", {
                      key: D,
                      value: S
                    }, h(S), 9, np)), 64))
                  ], 40, ap), [
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
                    onClick: T[3] || (T[3] = (S) => x())
                  }, T[7] || (T[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: T[4] || (T[4] = (S) => B())
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
}), ip = /* @__PURE__ */ _e(op, [["__scopeId", "data-v-129bf2b7"]]), up = ["aria-label"], dp = /* @__PURE__ */ F({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = Q(!1), s = k({
      get: () => n.modelValue,
      set(D) {
        r("update:modelValue", D);
      }
    }), o = Q(/* @__PURE__ */ new Map()), u = Q(0);
    Re(Tt, (D) => {
      const C = Q(!0);
      if (pe(s, (N, E) => {
        C.value = N > E;
      }), [...o.value.values()].includes(D.value))
        return { isVisible: k(() => o.value.get(s.value) === D.value), asc: C };
      const P = u.value++;
      o.value.set(P, D.value);
      const _ = k(() => P === s.value);
      return pe(D, () => {
        o.value.set(P, D.value);
      }), Ee(() => {
        o.value.delete(P);
      }), { isVisible: _ };
    });
    const d = Q(null), p = Q(null), v = pr({}), m = (D) => {
      if (v[D])
        return v[D];
      const C = se("tab");
      return v[D] = C, C;
    }, I = async () => {
      const D = s.value === 0 ? n.tabTitles.length - 1 : s.value - 1;
      l.value = !1, s.value = D;
    }, x = async () => {
      const D = s.value === n.tabTitles.length - 1 ? 0 : s.value + 1;
      l.value = !0, s.value = D;
    }, B = async () => {
      s.value = 0;
    }, y = async () => {
      s.value = n.tabTitles.length - 1;
    }, w = Q({ "--tabs-height": "100px" }), T = () => {
      var D;
      if (s.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const C = p.value.offsetHeight, P = (D = d.value) == null ? void 0 : D.querySelectorAll(".fr-tabs__panel")[s.value];
      if (!P || !P.offsetHeight)
        return;
      const _ = P.offsetHeight;
      w.value["--tabs-height"] = `${C + _}px`;
    }, S = Q(null);
    return xe(() => {
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
      selectFirst: B,
      selectLast: y
    }), (D, C) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: Ie(w.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": D.tabListName
      }, [
        $(D.$slots, "tab-items", {}, () => [
          (i(!0), f(z, null, Z(D.tabTitles, (P, _) => (i(), H(Fn, {
            key: _,
            icon: P.icon,
            "panel-id": P.panelId || `${m(_)}-panel`,
            "tab-id": P.tabId || m(_),
            onClick: (N) => s.value = _,
            onNext: C[0] || (C[0] = (N) => x()),
            onPrevious: C[1] || (C[1] = (N) => I()),
            onFirst: C[2] || (C[2] = (N) => B()),
            onLast: C[3] || (C[3] = (N) => y())
          }, {
            default: U(() => [
              V(h(P.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, up),
      (i(!0), f(z, null, Z(D.tabContents, (P, _) => {
        var N, E, M, g;
        return i(), H(Rn, {
          key: _,
          "panel-id": ((E = (N = D.tabTitles) == null ? void 0 : N[_]) == null ? void 0 : E.panelId) || `${m(_)}-panel`,
          "tab-id": ((g = (M = D.tabTitles) == null ? void 0 : M[_]) == null ? void 0 : g.tabId) || m(_)
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
  setup(a) {
    const t = a, e = k(() => typeof t.link == "string" && t.link.startsWith("http")), n = k(() => t.link ? e.value ? "a" : "RouterLink" : t.disabled && t.tagName === "p" || t.selectable ? "button" : t.tagName), r = k(() => ({ [e.value ? "href" : "to"]: t.link })), l = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), s = k(() => t.small ? 0.65 : 0.9), o = k(
      () => typeof t.icon == "string" ? { scale: s.value, name: t.icon } : { scale: s.value, ...t.icon }
    );
    return (u, d) => (i(), H(be(n.value), Y({
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
        t.icon && !l.value ? (i(), H(ke, Y({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: { "fr-mr-1v": !u.iconOnly }
        }, o.value), null, 16, ["label", "class"])) : b("", !0),
        u.iconOnly ? b("", !0) : (i(), f(z, { key: 1 }, [
          V(h(u.label), 1)
        ], 64)),
        $(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class", "aria-pressed"]));
  }
}), ia = /* @__PURE__ */ _e(cp, [["__scopeId", "data-v-0cada598"]]), fp = { class: "fr-tags-group" }, pp = /* @__PURE__ */ F({
  __name: "DsfrTags",
  props: {
    tags: { default: () => [] },
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(a, { emit: t }) {
    const e = a, n = t;
    function r([l, s]) {
      if (typeof e.modelValue > "u")
        return;
      if (s) {
        const u = /* @__PURE__ */ new Set([...e.modelValue]);
        u.delete(l), n("update:modelValue", [...u]);
        return;
      }
      const o = [.../* @__PURE__ */ new Set([...e.modelValue, l])];
      n("update:modelValue", o);
    }
    return (l, s) => (i(), f("ul", fp, [
      (i(!0), f(z, null, Z(l.tags, ({ icon: o, label: u, ...d }, p) => {
        var v;
        return i(), f("li", { key: p }, [
          ae(ia, Y({ ref_for: !0 }, d, {
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
  setup(a) {
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = k(() => typeof t.to == "string" && t.to.startsWith("http"));
    return (r, l) => {
      const s = Te("RouterLink");
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
            (i(), H(be(r.titleTag), { class: "fr-tile__title" }, {
              default: U(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, h(r.title), 9, vp)) : b("", !0),
                n.value ? b("", !0) : (i(), H(s, {
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
}), Hn = /* @__PURE__ */ _e(Ip, [["__scopeId", "data-v-f4d836a2"]]), Cp = { class: "fr-grid-row fr-grid-row--gutters" }, Ep = /* @__PURE__ */ F({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Cp, [
      (i(!0), f(z, null, Z(t.tiles, (n, r) => (i(), f("div", {
        key: r,
        class: R({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        ae(Hn, Y({
          horizontal: t.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
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
  setup(a) {
    const t = a, e = k(() => `${t.inputId}-hint-text`);
    return (n, r) => (i(), f("div", {
      class: R(["fr-toggle", {
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
        "aria-describedby": e.value,
        name: n.name,
        onInput: r[0] || (r[0] = (l) => n.$emit("update:modelValue", l.target.checked))
      }, null, 40, Pp),
      c("label", {
        id: e.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, h(n.label), 9, Mp),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, h(n.hint), 9, Lp)) : b("", !0)
    ], 2));
  }
}), Sp = ["id"], $p = /* @__PURE__ */ F({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => se("tooltip") }
  },
  setup(a) {
    const t = a, e = Q(!1), n = Q(null), r = Q(null), l = Q("0px"), s = Q("0px"), o = Q("0px"), u = Q(!1), d = Q(0);
    async function p() {
      var T, S, D, C, P, _, N, E;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((he) => setTimeout(he, 100));
      const M = (T = n.value) == null ? void 0 : T.getBoundingClientRect().top, g = (S = n.value) == null ? void 0 : S.offsetHeight, L = (D = n.value) == null ? void 0 : D.offsetWidth, W = (C = n.value) == null ? void 0 : C.getBoundingClientRect().left, J = (P = r.value) == null ? void 0 : P.offsetHeight, te = (_ = r.value) == null ? void 0 : _.offsetWidth, A = (N = r.value) == null ? void 0 : N.offsetTop, O = (E = r.value) == null ? void 0 : E.offsetLeft, ee = !(M - J < 0) && M + g + J >= document.documentElement.offsetHeight;
      u.value = ee;
      const G = W + L >= document.documentElement.offsetWidth, ue = W + L / 2 - te / 2 <= 0;
      s.value = ee ? `${M - A - J + 8}px` : `${M - A + g - 8}px`, d.value = 1, l.value = G ? `${W - O + L - te - 4}px` : ue ? `${W - O + 4}px` : `${W - O + L / 2 - te / 2}px`, o.value = G ? `${te / 2 - L / 2 + 4}px` : ue ? `${-(te / 2) + L / 2 - 4}px` : "0px";
    }
    pe(e, p, { immediate: !0 }), xe(() => {
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
      e.value && (T.target === n.value || (S = n.value) != null && S.contains(T.target) || T.target === r.value || (D = r.value) != null && D.contains(T.target) || (e.value = !1));
    }, x = (T) => {
      T.key === "Escape" && (e.value = !1);
    }, B = (T) => {
      var S;
      t.onHover && (T.target === n.value || (S = n.value) != null && S.contains(T.target)) && (e.value = !0, globalThis.__vueDsfr__lastTooltipShow.value = !1);
    }, y = () => {
      t.onHover && (e.value = !1);
    }, w = () => {
      t.onHover || (e.value = !0, globalThis.__vueDsfr__lastTooltipShow = e);
    };
    return xe(() => {
      document.documentElement.addEventListener("click", I), document.documentElement.addEventListener("keydown", x), document.documentElement.addEventListener("mouseover", B);
    }), Ee(() => {
      document.documentElement.removeEventListener("click", I), document.documentElement.removeEventListener("keydown", x), document.documentElement.removeEventListener("mouseover", B);
    }), (T, S) => (i(), f(z, null, [
      (i(), H(be(T.onHover ? "a" : "button"), Y(T.$attrs, {
        id: `link-${T.id}`,
        ref_key: "source",
        ref: n,
        class: T.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": T.id,
        href: T.onHover ? "#" : void 0,
        onClick: S[0] || (S[0] = (D) => w()),
        onMouseleave: S[1] || (S[1] = (D) => y()),
        onFocus: S[2] || (S[2] = (D) => B(D)),
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
        style: Ie(v.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, h(T.content), 15, Sp)
    ], 64));
  }
}), Ap = /* @__PURE__ */ _e($p, [["__scopeId", "data-v-ed1e8874"]]), Op = { class: "fr-transcription" }, Rp = ["aria-expanded", "aria-controls"], Fp = ["id"], Vp = ["id", "aria-labelledby"], Np = { class: "fr-container fr-container--fluid fr-container-md" }, qp = { class: "fr-grid-row fr-grid-row--center" }, jp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Hp = { class: "fr-modal__body" }, Wp = { class: "fr-modal__header" }, Kp = ["aria-controls"], Qp = { class: "fr-modal__content" }, Yp = ["id"], zp = { class: "fr-transcription__footer" }, Gp = { class: "fr-transcription__actions-group" }, Xp = ["aria-controls"], Wn = /* @__PURE__ */ F({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => se("transcription") },
    title: { default: "Titre de la vidéo" },
    content: { default: "Transcription du contenu de la vidéo" }
  },
  setup(a) {
    const t = a, {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = Se(), o = Q(!1), u = Q(!1), d = k(() => `fr-transcription__modal-${t.id}`), p = k(() => `fr-transcription__collapse-${t.id}`);
    return pe(u, (v, m) => {
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
        class: R(["fr-collapse", { "fr-collapse--expanded": j(r), "fr-collapsing": j(n) }]),
        onTransitionend: m[2] || (m[2] = (I) => j(s)(u.value))
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
      (i(), H(mr, { to: "body" }, [
        ae(In, {
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
  setup(a) {
    return (t, e) => (i(), f(z, null, [
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
      ae(Wn, {
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
  DsfrBadge: pn,
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
  DsfrFieldset: mn,
  DsfrFileDownload: hn,
  DsfrFileDownloadList: Do,
  DsfrFileUpload: Lo,
  DsfrFollow: Zo,
  DsfrFooter: Ei,
  DsfrFooterLink: bn,
  DsfrFooterLinkList: Bi,
  DsfrFooterPartners: yn,
  DsfrFranceConnect: Ai,
  DsfrHeader: wu,
  DsfrHeaderMenuLink: oa,
  DsfrHeaderMenuLinks: jt,
  DsfrHighlight: _u,
  DsfrInput: Et,
  DsfrInputGroup: Eu,
  DsfrLanguageSelector: rt,
  DsfrLogo: nt,
  DsfrModal: In,
  DsfrMultiselect: Md,
  DsfrNavigation: Zd,
  DsfrNavigationItem: Cn,
  DsfrNavigationMegaMenu: Pn,
  DsfrNavigationMegaMenuCategory: En,
  DsfrNavigationMenu: Ln,
  DsfrNavigationMenuItem: Mn,
  DsfrNavigationMenuLink: Pt,
  DsfrNewsLetter: vn,
  DsfrNotice: nc,
  DsfrPagination: sa,
  DsfrPicture: ic,
  DsfrQuote: vc,
  DsfrRadioButton: Bn,
  DsfrRadioButtonSet: Sc,
  DsfrRange: Wc,
  DsfrSearchBar: lt,
  DsfrSegmented: Sn,
  DsfrSegmentedSet: ef,
  DsfrSelect: uf,
  DsfrShare: gf,
  DsfrSideMenu: Tf,
  DsfrSideMenuButton: $n,
  DsfrSideMenuLink: If,
  DsfrSideMenuList: On,
  DsfrSideMenuListItem: An,
  DsfrSkipLinks: Lf,
  DsfrSocialNetworks: gn,
  DsfrStepper: Ff,
  DsfrSummary: Hf,
  DsfrTabContent: Rn,
  DsfrTabItem: Fn,
  DsfrTable: ip,
  DsfrTableCell: qn,
  DsfrTableHeader: Vn,
  DsfrTableHeaders: Nn,
  DsfrTableRow: jn,
  DsfrTabs: dp,
  DsfrTag: ia,
  DsfrTags: pp,
  DsfrTile: Hn,
  DsfrTiles: Ep,
  DsfrToggleSwitch: Bp,
  DsfrTooltip: Ap,
  DsfrTranscription: Wn,
  DsfrVideo: Jp,
  VIcon: ke,
  registerAccordionKey: ra,
  registerNavigationLinkKey: la,
  registerTabKey: Tt
}, Symbol.toStringTag, { value: "Module" })), tm = {
  install: (a, { components: t } = {}) => {
    Object.entries(em).forEach(([e, n]) => {
      (t === void 0 || t === "all" || t.map(({ name: r }) => r).includes(e)) && a.component(e, n);
    }), a.component("VIcon", ke);
  }
}, Kn = 6048e5, am = 864e5, nm = 6e4, rm = 36e5, lm = 1e3, qa = Symbol.for("constructDateFrom");
function we(a, t) {
  return typeof a == "function" ? a(t) : a && typeof a == "object" && qa in a ? a[qa](t) : a instanceof Date ? new a.constructor(t) : new Date(t);
}
function ye(a, t) {
  return we(t || a, a);
}
function Qn(a, t, e) {
  const n = ye(a, e == null ? void 0 : e.in);
  return isNaN(t) ? we((e == null ? void 0 : e.in) || a, NaN) : (t && n.setDate(n.getDate() + t), n);
}
let sm = {};
function ze() {
  return sm;
}
function Fe(a, t) {
  var o, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = ye(a, t == null ? void 0 : t.in), l = r.getDay(), s = (l < n ? 7 : 0) + l - n;
  return r.setDate(r.getDate() - s), r.setHours(0, 0, 0, 0), r;
}
function Ye(a, t) {
  return Fe(a, { ...t, weekStartsOn: 1 });
}
function Yn(a, t) {
  const e = ye(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = we(e, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Ye(r), s = we(e, 0);
  s.setFullYear(n, 0, 4), s.setHours(0, 0, 0, 0);
  const o = Ye(s);
  return e.getTime() >= l.getTime() ? n + 1 : e.getTime() >= o.getTime() ? n : n - 1;
}
function bt(a) {
  const t = ye(a), e = new Date(
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
function om(a, ...t) {
  const e = we.bind(
    null,
    t.find((n) => typeof n == "object")
  );
  return t.map(e);
}
function ja(a, t) {
  const e = ye(a, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function im(a, t, e) {
  const [n, r] = om(
    e == null ? void 0 : e.in,
    a,
    t
  ), l = ja(n), s = ja(r), o = +l - bt(l), u = +s - bt(s);
  return Math.round((o - u) / am);
}
function um(a, t) {
  const e = Yn(a, t), n = we(a, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Ye(n);
}
function dm(a) {
  return a instanceof Date || typeof a == "object" && Object.prototype.toString.call(a) === "[object Date]";
}
function cm(a) {
  return !(!dm(a) && typeof a != "number" || isNaN(+ye(a)));
}
function fm(a, t) {
  const e = ye(a, t == null ? void 0 : t.in);
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
}, mm = (a, t, e) => {
  let n;
  const r = pm[a];
  return typeof r == "string" ? n = r : t === 1 ? n = r.one : n = r.other.replace("{{count}}", t.toString()), e != null && e.addSuffix ? e.comparison && e.comparison > 0 ? "in " + n : n + " ago" : n;
};
function St(a) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : a.defaultWidth;
    return a.formats[e] || a.formats[a.defaultWidth];
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
}, km = (a, t, e, n) => ym[a];
function Ze(a) {
  return (t, e) => {
    const n = e != null && e.context ? String(e.context) : "standalone";
    let r;
    if (n === "formatting" && a.formattingValues) {
      const s = a.defaultFormattingWidth || a.defaultWidth, o = e != null && e.width ? String(e.width) : s;
      r = a.formattingValues[o] || a.formattingValues[s];
    } else {
      const s = a.defaultWidth, o = e != null && e.width ? String(e.width) : a.defaultWidth;
      r = a.values[o] || a.values[s];
    }
    const l = a.argumentCallback ? a.argumentCallback(t) : t;
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
}, Cm = (a, t) => {
  const e = Number(a), n = e % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
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
    argumentCallback: (a) => a - 1
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
function Je(a) {
  return (t, e = {}) => {
    const n = e.width, r = n && a.matchPatterns[n] || a.matchPatterns[a.defaultMatchWidth], l = t.match(r);
    if (!l)
      return null;
    const s = l[0], o = n && a.parsePatterns[n] || a.parsePatterns[a.defaultParseWidth], u = Array.isArray(o) ? Mm(o, (v) => v.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Pm(o, (v) => v.test(s))
    );
    let d;
    d = a.valueCallback ? a.valueCallback(u) : u, d = e.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      e.valueCallback(d)
    ) : d;
    const p = t.slice(s.length);
    return { value: d, rest: p };
  };
}
function Pm(a, t) {
  for (const e in a)
    if (Object.prototype.hasOwnProperty.call(a, e) && t(a[e]))
      return e;
}
function Mm(a, t) {
  for (let e = 0; e < a.length; e++)
    if (t(a[e]))
      return e;
}
function Lm(a) {
  return (t, e = {}) => {
    const n = t.match(a.matchPattern);
    if (!n) return null;
    const r = n[0], l = t.match(a.parsePattern);
    if (!l) return null;
    let s = a.valueCallback ? a.valueCallback(l[0]) : l[0];
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
    valueCallback: (a) => parseInt(a, 10)
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
    valueCallback: (a) => a + 1
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
}, zn = {
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
function Km(a, t) {
  const e = ye(a, t == null ? void 0 : t.in);
  return im(e, fm(e)) + 1;
}
function Gn(a, t) {
  const e = ye(a, t == null ? void 0 : t.in), n = +Ye(e) - +um(e);
  return Math.round(n / Kn) + 1;
}
function ua(a, t) {
  var p, v, m, I;
  const e = ye(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((v = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : v.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((I = (m = r.locale) == null ? void 0 : m.options) == null ? void 0 : I.firstWeekContainsDate) ?? 1, s = we((t == null ? void 0 : t.in) || a, 0);
  s.setFullYear(n + 1, 0, l), s.setHours(0, 0, 0, 0);
  const o = Fe(s, t), u = we((t == null ? void 0 : t.in) || a, 0);
  u.setFullYear(n, 0, l), u.setHours(0, 0, 0, 0);
  const d = Fe(u, t);
  return +e >= +o ? n + 1 : +e >= +d ? n : n - 1;
}
function Qm(a, t) {
  var o, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = ua(a, t), l = we((t == null ? void 0 : t.in) || a, 0);
  return l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0), Fe(l, t);
}
function Xn(a, t) {
  const e = ye(a, t == null ? void 0 : t.in), n = +Fe(e, t) - +Qm(e, t);
  return Math.round(n / Kn) + 1;
}
function ie(a, t) {
  const e = a < 0 ? "-" : "", n = Math.abs(a).toString().padStart(t, "0");
  return e + n;
}
const Oe = {
  // Year
  y(a, t) {
    const e = a.getFullYear(), n = e > 0 ? e : 1 - e;
    return ie(t === "yy" ? n % 100 : n, t.length);
  },
  // Month
  M(a, t) {
    const e = a.getMonth();
    return t === "M" ? String(e + 1) : ie(e + 1, 2);
  },
  // Day of the month
  d(a, t) {
    return ie(a.getDate(), t.length);
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
    return ie(a.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(a, t) {
    return ie(a.getHours(), t.length);
  },
  // Minute
  m(a, t) {
    return ie(a.getMinutes(), t.length);
  },
  // Second
  s(a, t) {
    return ie(a.getSeconds(), t.length);
  },
  // Fraction of second
  S(a, t) {
    const e = t.length, n = a.getMilliseconds(), r = Math.trunc(
      n * Math.pow(10, e - 3)
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
}, Ha = {
  // Era
  G: function(a, t, e) {
    const n = a.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return e.era(n, { width: "abbreviated" });
      case "GGGGG":
        return e.era(n, { width: "narrow" });
      case "GGGG":
      default:
        return e.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(a, t, e) {
    if (t === "yo") {
      const n = a.getFullYear(), r = n > 0 ? n : 1 - n;
      return e.ordinalNumber(r, { unit: "year" });
    }
    return Oe.y(a, t);
  },
  // Local week-numbering year
  Y: function(a, t, e, n) {
    const r = ua(a, n), l = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const s = l % 100;
      return ie(s, 2);
    }
    return t === "Yo" ? e.ordinalNumber(l, { unit: "year" }) : ie(l, t.length);
  },
  // ISO week-numbering year
  R: function(a, t) {
    const e = Yn(a);
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
  u: function(a, t) {
    const e = a.getFullYear();
    return ie(e, t.length);
  },
  // Quarter
  Q: function(a, t, e) {
    const n = Math.ceil((a.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(n);
      case "QQ":
        return ie(n, 2);
      case "Qo":
        return e.ordinalNumber(n, { unit: "quarter" });
      case "QQQ":
        return e.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return e.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return e.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(a, t, e) {
    const n = Math.ceil((a.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(n);
      case "qq":
        return ie(n, 2);
      case "qo":
        return e.ordinalNumber(n, { unit: "quarter" });
      case "qqq":
        return e.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return e.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return e.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(a, t, e) {
    const n = a.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Oe.M(a, t);
      case "Mo":
        return e.ordinalNumber(n + 1, { unit: "month" });
      case "MMM":
        return e.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return e.month(n, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return e.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(a, t, e) {
    const n = a.getMonth();
    switch (t) {
      case "L":
        return String(n + 1);
      case "LL":
        return ie(n + 1, 2);
      case "Lo":
        return e.ordinalNumber(n + 1, { unit: "month" });
      case "LLL":
        return e.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return e.month(n, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return e.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(a, t, e, n) {
    const r = Xn(a, n);
    return t === "wo" ? e.ordinalNumber(r, { unit: "week" }) : ie(r, t.length);
  },
  // ISO week of year
  I: function(a, t, e) {
    const n = Gn(a);
    return t === "Io" ? e.ordinalNumber(n, { unit: "week" }) : ie(n, t.length);
  },
  // Day of the month
  d: function(a, t, e) {
    return t === "do" ? e.ordinalNumber(a.getDate(), { unit: "date" }) : Oe.d(a, t);
  },
  // Day of year
  D: function(a, t, e) {
    const n = Km(a);
    return t === "Do" ? e.ordinalNumber(n, { unit: "dayOfYear" }) : ie(n, t.length);
  },
  // Day of week
  E: function(a, t, e) {
    const n = a.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return e.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return e.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return e.day(n, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return e.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(a, t, e, n) {
    const r = a.getDay(), l = (r - n.weekStartsOn + 8) % 7 || 7;
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
  c: function(a, t, e, n) {
    const r = a.getDay(), l = (r - n.weekStartsOn + 8) % 7 || 7;
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
  i: function(a, t, e) {
    const n = a.getDay(), r = n === 0 ? 7 : n;
    switch (t) {
      case "i":
        return String(r);
      case "ii":
        return ie(r, t.length);
      case "io":
        return e.ordinalNumber(r, { unit: "day" });
      case "iii":
        return e.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return e.day(n, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return e.day(n, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return e.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(a, t, e) {
    const r = a.getHours() / 12 >= 1 ? "pm" : "am";
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
  b: function(a, t, e) {
    const n = a.getHours();
    let r;
    switch (n === 12 ? r = Ke.noon : n === 0 ? r = Ke.midnight : r = n / 12 >= 1 ? "pm" : "am", t) {
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
  B: function(a, t, e) {
    const n = a.getHours();
    let r;
    switch (n >= 17 ? r = Ke.evening : n >= 12 ? r = Ke.afternoon : n >= 4 ? r = Ke.morning : r = Ke.night, t) {
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
  h: function(a, t, e) {
    if (t === "ho") {
      let n = a.getHours() % 12;
      return n === 0 && (n = 12), e.ordinalNumber(n, { unit: "hour" });
    }
    return Oe.h(a, t);
  },
  // Hour [0-23]
  H: function(a, t, e) {
    return t === "Ho" ? e.ordinalNumber(a.getHours(), { unit: "hour" }) : Oe.H(a, t);
  },
  // Hour [0-11]
  K: function(a, t, e) {
    const n = a.getHours() % 12;
    return t === "Ko" ? e.ordinalNumber(n, { unit: "hour" }) : ie(n, t.length);
  },
  // Hour [1-24]
  k: function(a, t, e) {
    let n = a.getHours();
    return n === 0 && (n = 24), t === "ko" ? e.ordinalNumber(n, { unit: "hour" }) : ie(n, t.length);
  },
  // Minute
  m: function(a, t, e) {
    return t === "mo" ? e.ordinalNumber(a.getMinutes(), { unit: "minute" }) : Oe.m(a, t);
  },
  // Second
  s: function(a, t, e) {
    return t === "so" ? e.ordinalNumber(a.getSeconds(), { unit: "second" }) : Oe.s(a, t);
  },
  // Fraction of second
  S: function(a, t) {
    return Oe.S(a, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(a, t, e) {
    const n = a.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (t) {
      case "X":
        return Ka(n);
      case "XXXX":
      case "XX":
        return Ve(n);
      case "XXXXX":
      case "XXX":
      default:
        return Ve(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(a, t, e) {
    const n = a.getTimezoneOffset();
    switch (t) {
      case "x":
        return Ka(n);
      case "xxxx":
      case "xx":
        return Ve(n);
      case "xxxxx":
      case "xxx":
      default:
        return Ve(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(a, t, e) {
    const n = a.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Wa(n, ":");
      case "OOOO":
      default:
        return "GMT" + Ve(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(a, t, e) {
    const n = a.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Wa(n, ":");
      case "zzzz":
      default:
        return "GMT" + Ve(n, ":");
    }
  },
  // Seconds timestamp
  t: function(a, t, e) {
    const n = Math.trunc(+a / 1e3);
    return ie(n, t.length);
  },
  // Milliseconds timestamp
  T: function(a, t, e) {
    return ie(+a, t.length);
  }
};
function Wa(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = Math.trunc(n / 60), l = n % 60;
  return l === 0 ? e + String(r) : e + String(r) + t + ie(l, 2);
}
function Ka(a, t) {
  return a % 60 === 0 ? (a > 0 ? "-" : "+") + ie(Math.abs(a) / 60, 2) : Ve(a, t);
}
function Ve(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = ie(Math.trunc(n / 60), 2), l = ie(n % 60, 2);
  return e + r + t + l;
}
const Qa = (a, t) => {
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
}, Un = (a, t) => {
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
}, Ym = (a, t) => {
  const e = a.match(/(P+)(p+)?/) || [], n = e[1], r = e[2];
  if (!r)
    return Qa(a, t);
  let l;
  switch (n) {
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
  return l.replace("{{date}}", Qa(n, t)).replace("{{time}}", Un(r, t));
}, Kt = {
  p: Un,
  P: Ym
}, zm = /^D+$/, Gm = /^Y+$/, Xm = ["D", "DD", "YY", "YYYY"];
function Zn(a) {
  return zm.test(a);
}
function Jn(a) {
  return Gm.test(a);
}
function Qt(a, t, e) {
  const n = Um(a, t, e);
  if (console.warn(n), Xm.includes(a)) throw new RangeError(n);
}
function Um(a, t, e) {
  const n = a[0] === "Y" ? "years" : "days of the month";
  return `Use \`${a.toLowerCase()}\` instead of \`${a}\` (in \`${t}\`) for formatting ${n} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Zm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Jm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, eh = /^'([^]*?)'?$/, th = /''/g, ah = /[a-zA-Z]/;
function Ya(a, t, e) {
  var p, v, m, I;
  const n = ze(), r = n.locale ?? zn, l = n.firstWeekContainsDate ?? ((v = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : v.firstWeekContainsDate) ?? 1, s = n.weekStartsOn ?? ((I = (m = n.locale) == null ? void 0 : m.options) == null ? void 0 : I.weekStartsOn) ?? 0, o = ye(a, e == null ? void 0 : e.in);
  if (!cm(o))
    throw new RangeError("Invalid time value");
  let u = t.match(Jm).map((x) => {
    const B = x[0];
    if (B === "p" || B === "P") {
      const y = Kt[B];
      return y(x, r.formatLong);
    }
    return x;
  }).join("").match(Zm).map((x) => {
    if (x === "''")
      return { isToken: !1, value: "'" };
    const B = x[0];
    if (B === "'")
      return { isToken: !1, value: nh(x) };
    if (Ha[B])
      return { isToken: !0, value: x };
    if (B.match(ah))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + B + "`"
      );
    return { isToken: !1, value: x };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(o, u));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: s,
    locale: r
  };
  return u.map((x) => {
    if (!x.isToken) return x.value;
    const B = x.value;
    (Jn(B) || Zn(B)) && Qt(B, t, String(a));
    const y = Ha[B[0]];
    return y(o, B, r.localize, d);
  }).join("");
}
function nh(a) {
  const t = a.match(eh);
  return t ? t[1].replace(th, "'") : a;
}
function rh() {
  return Object.assign({}, ze());
}
function lh(a, t) {
  const e = ye(a, t == null ? void 0 : t.in).getDay();
  return e === 0 ? 7 : e;
}
function sh(a, t) {
  const e = oh(t) ? new t(0) : we(t, 0);
  return e.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), e.setHours(
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
    a.getMilliseconds()
  ), e;
}
function oh(a) {
  var t;
  return typeof a == "function" && ((t = a.prototype) == null ? void 0 : t.constructor) === a;
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
  constructor(t, e, n, r, l) {
    super(), this.value = t, this.validateValue = e, this.setValue = n, this.priority = r, l && (this.subPriority = l);
  }
  validate(t, e) {
    return this.validateValue(t, this.value, e);
  }
  set(t, e, n) {
    return this.setValue(t, e, this.value, n);
  }
}
class dh extends er {
  constructor(e, n) {
    super();
    q(this, "priority", ih);
    q(this, "subPriority", -1);
    this.context = e || ((r) => we(n, r));
  }
  set(e, n) {
    return n.timestampIsSet ? e : we(e, sh(e, this.context));
  }
}
class oe {
  run(t, e, n, r) {
    const l = this.parse(t, e, n, r);
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
  validate(t, e, n) {
    return !0;
  }
}
class ch extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 140);
    q(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
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
  set(e, n, r) {
    return n.era = r, e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
const ve = {
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
function ge(a, t) {
  return a && {
    value: t(a.value),
    rest: a.rest
  };
}
function ce(a, t) {
  const e = t.match(a);
  return e ? {
    value: parseInt(e[0], 10),
    rest: t.slice(e[0].length)
  } : null;
}
function Me(a, t) {
  const e = t.match(a);
  if (!e)
    return null;
  if (e[0] === "Z")
    return {
      value: 0,
      rest: t.slice(1)
    };
  const n = e[1] === "+" ? 1 : -1, r = e[2] ? parseInt(e[2], 10) : 0, l = e[3] ? parseInt(e[3], 10) : 0, s = e[5] ? parseInt(e[5], 10) : 0;
  return {
    value: n * (r * rm + l * nm + s * lm),
    rest: t.slice(e[0].length)
  };
}
function tr(a) {
  return ce(ve.anyDigitsSigned, a);
}
function me(a, t) {
  switch (a) {
    case 1:
      return ce(ve.singleDigit, t);
    case 2:
      return ce(ve.twoDigits, t);
    case 3:
      return ce(ve.threeDigits, t);
    case 4:
      return ce(ve.fourDigits, t);
    default:
      return ce(new RegExp("^\\d{1," + a + "}"), t);
  }
}
function yt(a, t) {
  switch (a) {
    case 1:
      return ce(ve.singleDigitSigned, t);
    case 2:
      return ce(ve.twoDigitsSigned, t);
    case 3:
      return ce(ve.threeDigitsSigned, t);
    case 4:
      return ce(ve.fourDigitsSigned, t);
    default:
      return ce(new RegExp("^-?\\d{1," + a + "}"), t);
  }
}
function da(a) {
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
function ar(a, t) {
  const e = t > 0, n = e ? t : 1 - t;
  let r;
  if (n <= 50)
    r = a || 100;
  else {
    const l = n + 50, s = Math.trunc(l / 100) * 100, o = a >= l % 100;
    r = a + s - (o ? 100 : 0);
  }
  return e ? r : 1 - r;
}
function nr(a) {
  return a % 400 === 0 || a % 4 === 0 && a % 100 !== 0;
}
class fh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 130);
    q(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, n, r) {
    const l = (s) => ({
      year: s,
      isTwoDigitYear: n === "yy"
    });
    switch (n) {
      case "y":
        return ge(me(4, e), l);
      case "yo":
        return ge(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return ge(me(n.length, e), l);
    }
  }
  validate(e, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(e, n, r) {
    const l = e.getFullYear();
    if (r.isTwoDigitYear) {
      const o = ar(
        r.year,
        l
      );
      return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const s = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
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
  parse(e, n, r) {
    const l = (s) => ({
      year: s,
      isTwoDigitYear: n === "YY"
    });
    switch (n) {
      case "Y":
        return ge(me(4, e), l);
      case "Yo":
        return ge(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return ge(me(n.length, e), l);
    }
  }
  validate(e, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(e, n, r, l) {
    const s = ua(e, l);
    if (r.isTwoDigitYear) {
      const u = ar(
        r.year,
        s
      );
      return e.setFullYear(
        u,
        0,
        l.firstWeekContainsDate
      ), e.setHours(0, 0, 0, 0), Fe(e, l);
    }
    const o = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
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
  parse(e, n) {
    return yt(n === "R" ? 4 : n.length, e);
  }
  set(e, n, r) {
    const l = we(e, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), Ye(l);
  }
}
class hh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 130);
    q(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, n) {
    return yt(n === "u" ? 4 : n.length, e);
  }
  set(e, n, r) {
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
  parse(e, n, r) {
    switch (n) {
      case "Q":
      case "QQ":
        return me(n.length, e);
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
  validate(e, n) {
    return n >= 1 && n <= 4;
  }
  set(e, n, r) {
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
  parse(e, n, r) {
    switch (n) {
      case "q":
      case "qq":
        return me(n.length, e);
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
  validate(e, n) {
    return n >= 1 && n <= 4;
  }
  set(e, n, r) {
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
  parse(e, n, r) {
    const l = (s) => s - 1;
    switch (n) {
      case "M":
        return ge(
          ce(ve.month, e),
          l
        );
      case "MM":
        return ge(me(2, e), l);
      case "Mo":
        return ge(
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
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
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
  parse(e, n, r) {
    const l = (s) => s - 1;
    switch (n) {
      case "L":
        return ge(
          ce(ve.month, e),
          l
        );
      case "LL":
        return ge(me(2, e), l);
      case "Lo":
        return ge(
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
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
  }
}
function kh(a, t, e) {
  const n = ye(a, e == null ? void 0 : e.in), r = Xn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), ye(n, e == null ? void 0 : e.in);
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
  parse(e, n, r) {
    switch (n) {
      case "w":
        return ce(ve.week, e);
      case "wo":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 53;
  }
  set(e, n, r, l) {
    return Fe(kh(e, r, l), l);
  }
}
function _h(a, t, e) {
  const n = ye(a, e == null ? void 0 : e.in), r = Gn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), n;
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
  parse(e, n, r) {
    switch (n) {
      case "I":
        return ce(ve.week, e);
      case "Io":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 53;
  }
  set(e, n, r) {
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
  parse(e, n, r) {
    switch (n) {
      case "d":
        return ce(ve.date, e);
      case "do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    const r = e.getFullYear(), l = nr(r), s = e.getMonth();
    return l ? n >= 1 && n <= Th[s] : n >= 1 && n <= Dh[s];
  }
  set(e, n, r) {
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
  parse(e, n, r) {
    switch (n) {
      case "D":
      case "DD":
        return ce(ve.dayOfYear, e);
      case "Do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    const r = e.getFullYear();
    return nr(r) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
  }
  set(e, n, r) {
    return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
  }
}
function ca(a, t, e) {
  var v, m, I, x;
  const n = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((m = (v = e == null ? void 0 : e.locale) == null ? void 0 : v.options) == null ? void 0 : m.weekStartsOn) ?? n.weekStartsOn ?? ((x = (I = n.locale) == null ? void 0 : I.options) == null ? void 0 : x.weekStartsOn) ?? 0, l = ye(a, e == null ? void 0 : e.in), s = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - r, p = t < 0 || t > 6 ? t - (s + d) % 7 : (u + d) % 7 - (s + d) % 7;
  return Qn(l, p, e);
}
class Eh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 90);
    q(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
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
  validate(e, n) {
    return n >= 0 && n <= 6;
  }
  set(e, n, r, l) {
    return e = ca(e, r, l), e.setHours(0, 0, 0, 0), e;
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
  parse(e, n, r, l) {
    const s = (o) => {
      const u = Math.floor((o - 1) / 7) * 7;
      return (o + l.weekStartsOn + 6) % 7 + u;
    };
    switch (n) {
      case "e":
      case "ee":
        return ge(me(n.length, e), s);
      case "eo":
        return ge(
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
  validate(e, n) {
    return n >= 0 && n <= 6;
  }
  set(e, n, r, l) {
    return e = ca(e, r, l), e.setHours(0, 0, 0, 0), e;
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
  parse(e, n, r, l) {
    const s = (o) => {
      const u = Math.floor((o - 1) / 7) * 7;
      return (o + l.weekStartsOn + 6) % 7 + u;
    };
    switch (n) {
      case "c":
      case "cc":
        return ge(me(n.length, e), s);
      case "co":
        return ge(
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
  validate(e, n) {
    return n >= 0 && n <= 6;
  }
  set(e, n, r, l) {
    return e = ca(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
function Lh(a, t, e) {
  const n = ye(a, e == null ? void 0 : e.in), r = lh(n, e), l = t - r;
  return Qn(n, l, e);
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
  parse(e, n, r) {
    const l = (s) => s === 0 ? 7 : s;
    switch (n) {
      case "i":
      case "ii":
        return me(n.length, e);
      case "io":
        return r.ordinalNumber(e, { unit: "day" });
      case "iii":
        return ge(
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
        return ge(
          r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiiii":
        return ge(
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
        return ge(
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
  validate(e, n) {
    return n >= 1 && n <= 7;
  }
  set(e, n, r) {
    return e = Lh(e, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Sh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 80);
    q(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
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
  set(e, n, r) {
    return e.setHours(da(r), 0, 0, 0), e;
  }
}
class $h extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 80);
    q(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
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
  set(e, n, r) {
    return e.setHours(da(r), 0, 0, 0), e;
  }
}
class Ah extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 80);
    q(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
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
  set(e, n, r) {
    return e.setHours(da(r), 0, 0, 0), e;
  }
}
class Oh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "h":
        return ce(ve.hour12h, e);
      case "ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 12;
  }
  set(e, n, r) {
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
  parse(e, n, r) {
    switch (n) {
      case "H":
        return ce(ve.hour23h, e);
      case "Ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 23;
  }
  set(e, n, r) {
    return e.setHours(r, 0, 0, 0), e;
  }
}
class Fh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "K":
        return ce(ve.hour11h, e);
      case "Ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.getHours() >= 12 && r < 12 ? e.setHours(r + 12, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
  }
}
class Vh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "k":
        return ce(ve.hour24h, e);
      case "ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 24;
  }
  set(e, n, r) {
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
  parse(e, n, r) {
    switch (n) {
      case "m":
        return ce(ve.minute, e);
      case "mo":
        return r.ordinalNumber(e, { unit: "minute" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 59;
  }
  set(e, n, r) {
    return e.setMinutes(r, 0, 0), e;
  }
}
class qh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 50);
    q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "s":
        return ce(ve.second, e);
      case "so":
        return r.ordinalNumber(e, { unit: "second" });
      default:
        return me(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 59;
  }
  set(e, n, r) {
    return e.setSeconds(r, 0), e;
  }
}
class jh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 30);
    q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return ge(me(n.length, e), r);
  }
  set(e, n, r) {
    return e.setMilliseconds(r), e;
  }
}
class Hh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 10);
    q(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(e, n) {
    switch (n) {
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
  set(e, n, r) {
    return n.timestampIsSet ? e : we(
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
  parse(e, n) {
    switch (n) {
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
  set(e, n, r) {
    return n.timestampIsSet ? e : we(
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
  set(e, n, r) {
    return [we(e, r * 1e3), { timestampIsSet: !0 }];
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
  set(e, n, r) {
    return [we(e, r), { timestampIsSet: !0 }];
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
function za(a, t, e, n) {
  var y, w, T, S;
  const r = () => we(e, NaN), l = rh(), s = l.locale ?? zn, o = l.firstWeekContainsDate ?? ((w = (y = l.locale) == null ? void 0 : y.options) == null ? void 0 : w.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((S = (T = l.locale) == null ? void 0 : T.options) == null ? void 0 : S.weekStartsOn) ?? 0;
  if (!t)
    return a ? r() : ye(e, n == null ? void 0 : n.in);
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: u,
    locale: s
  }, p = [new dh(n == null ? void 0 : n.in, e)], v = t.match(Gh).map((D) => {
    const C = D[0];
    if (C in Kt) {
      const P = Kt[C];
      return P(D, s.formatLong);
    }
    return D;
  }).join("").match(zh), m = [];
  for (let D of v) {
    Jn(D) && Qt(D, t, a), Zn(D) && Qt(D, t, a);
    const C = D[0], P = Yh[C];
    if (P) {
      const { incompatibleTokens: _ } = P;
      if (Array.isArray(_)) {
        const E = m.find(
          (M) => _.includes(M.token) || M.token === C
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
        a,
        D,
        s.match,
        d
      );
      if (!N)
        return r();
      p.push(N.setter), a = N.rest;
    } else {
      if (C.match(Jh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + C + "`"
        );
      if (D === "''" ? D = "'" : C === "'" && (D = ev(D)), a.indexOf(D) === 0)
        a = a.slice(D.length);
      else
        return r();
    }
  }
  if (a.length > 0 && Zh.test(a))
    return r();
  const I = p.map((D) => D.priority).sort((D, C) => C - D).filter((D, C, P) => P.indexOf(D) === C).map(
    (D) => p.filter((C) => C.priority === D).sort((C, P) => P.subPriority - C.subPriority)
  ).map((D) => D[0]);
  let x = ye(e, n == null ? void 0 : n.in);
  if (isNaN(+x)) return r();
  const B = {};
  for (const D of I) {
    if (!D.validate(x, d))
      return r();
    const C = D.set(x, B, d);
    Array.isArray(C) ? (x = C[0], Object.assign(B, C[1])) : x = C;
  }
  return x;
}
function ev(a) {
  return a.match(Xh)[1].replace(Uh, "'");
}
const tv = {
  dsfrDecodeDate: function(a, t) {
    if (typeof a != "string" || a === "" || /^\d{4}-\d{2}-\d{2}$/.test(a))
      return a;
    const n = za(a, t, /* @__PURE__ */ new Date());
    return Ya(n, "yyyy-MM-dd");
  },
  dsfrSearch: function(a) {
    return this.search(a, 0);
  },
  dsfrDecodeDateTime: function(a, t) {
    if (a === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(a))
      return a;
    const n = za(a, t, /* @__PURE__ */ new Date());
    return Ya(n, "yyyy-MM-dd'T'HH:mm");
  },
  _searchAndFilterList: function(a, t, e, n, r) {
    let l = this.$data.vueData[a];
    if (n && (l = l.filter(n)), r != null && r.trim() !== "") {
      const s = this.unaccentLower(r);
      l = l.filter((o) => this.unaccentLower(o[e].toString()).indexOf(s) > -1);
    }
    return l;
  },
  dsfrTransformListForSelection: function(a, t, e, n, r, l) {
    let o = this._searchAndFilterList(a, t, e, r, l).map(function(u) {
      return { value: u[t], text: u[e].toString() };
    });
    return n != null && n !== "" && o.unshift({ value: "", text: n }), o;
  },
  dsfrTransformListForRadio: function(a, t, e, n, r, l, s) {
    return this._searchAndFilterList(a, t, e, l, s).map(function(u) {
      return {
        value: u[t],
        label: u[e].toString(),
        hint: u[r],
        disabled: u[n]
      };
    });
  },
  dsfrTransformListForCheckbox: function(a, t, e, n, r, l, s, o) {
    return this._searchAndFilterList(a, t, e, s, o).map(function(d) {
      return {
        value: d[t],
        label: d[e].toString(),
        name: l,
        hint: d[r],
        disabled: d[n]
      };
    });
  },
  dsfrSearchAutocomplete: function(a, t, e, n, r, l, s) {
    return s.length < l ? Promise.resolve([]) : this.$http.post(r, this.objectToFormData({ terms: s, list: a, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((o) => o.data.map((u) => ({
      value: u[t],
      label: u[e].toString()
      // A label is always a string
    }))).catch(() => []);
  },
  dsfrLoadAutocompleteById: function(a, t, e, n, r, l, s, o) {
    let u = o != null && o !== "null" ? this.$data.vueData[l][o][s] : this.$data.vueData[l][s];
    Array.isArray(u) ? u.forEach((d) => this.dsfrLoadMissingAutocompleteOption(a, t, e, n, r, d)) : this.dsfrLoadMissingAutocompleteOption(a, t, e, n, r, u);
  },
  dsfrLoadMissingAutocompleteOption: function(a, t, e, n, r, l) {
    let s = this.componentStates[n].options.find((o) => o.value === l);
    if (!l || s !== void 0) {
      (s == null ? void 0 : s.label) !== void 0 && (this.componentStates[n].field = s.label);
      return;
    }
    this.$data.componentStates[n].loading = !0, this.$http.post(r, this.objectToFormData({ value: l, list: a, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((function(o) {
      let u = o.data.map(function(d) {
        return { value: d[t], label: d[e].toString() };
      });
      return this.$data.componentStates[n].options = this.$data.componentStates[n].options.concat(u), this.componentStates[n].field = u[0].label, this.$data.componentStates[n].options;
    }).bind(this)).catch((function(o) {
      this.$q.notify(o.response.status + ":" + o.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[n].loading = !1;
    }).bind(this));
  },
  dsfrResetAutocomplete: function(a, t, e, n) {
    let r = this.componentStates[a].field;
    if (r === void 0)
      return;
    let l = this.componentStates[a].options.find((s) => s.label.toLowerCase().startsWith(r.trim().toLowerCase()));
    l === void 0 || r === "" ? (this.componentStates[a].field = void 0, n != null && n !== "null" ? this.$data.vueData[t][n][e] = void 0 : this.$data.vueData[t][e] = void 0) : (this.$data.componentStates[a].field = l.label, n != null && n !== "null" ? this.$data.vueData[t][n][e] = l.value : this.$data.vueData[t][e] = l.value);
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var a, t;
    (t = (a = this.componentStates) == null ? void 0 : a.dsfrHeader) == null || t.navItems.forEach((e) => {
      e.title ? e.active = e.links.some((n) => n["data-set-active"] === !0 || window.location.pathname.startsWith(n.to)) : e.active = e["data-set-active"] === !0;
    });
  },
  dsfrTableRows: function(a) {
    let t = this.$data.componentStates[a].pagination, e = this.$data.vueData[t.listKey];
    return t.sortUrl && t.descending ? e.slice().reverse() : e;
  },
  dsfrServerSideSort: function(a) {
    let e = this.$data.componentStates[a].pagination, n = this.$data.vueData;
    e.page = 0, e.sortUrl && e.sortBy && this.$http.post(e.sortUrl, this.objectToFormData({ sortFieldName: e.sortBy, sortDesc: e.descending, CTX: this.$data.vueData.CTX })).then(
      (function(r) {
        n[e.listKey] = r.data.model[e.listKey], this.$data.vueData.CTX = r.data.model.CTX;
      }).bind(this)
    );
  }
}, $e = (a = "", t = "") => (a ? `${a}-` : "") + zt() + (t ? `-${t}` : ""), av = {
  useRandomId: $e
}, nv = ["href", "aria-current"], rv = {
  __name: "RouterLink",
  props: ["to", "active"],
  setup(a) {
    const t = a, e = t.to === "/" ? window.location.pathname === t.to : window.location.pathname.startsWith(t.to);
    return (n, r) => (i(), f("a", {
      href: t.to,
      "aria-current": j(e) || a.active ? "page" : void 0
    }, [
      $(n.$slots, "default")
    ], 8, nv));
  }
}, Ae = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, lv = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Ct, DsfrTag: ia, DsfrButton: je },
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
function Dv(a, t, e, n, r, l) {
  const s = Te("DsfrTag"), o = Te("DsfrCheckbox"), u = Te("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", sv, [
      (i(!0), f(z, null, Z(e.selectedFacets, (d, p) => (i(), f(z, { key: p }, [
        l.facetMultipleByCode(p) ? b("", !0) : (i(!0), f(z, { key: 0 }, Z(d, (v) => (i(), H(s, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: v.code,
          onClick: (m) => a.$emit("toogle-facet", p, v, e.contextKey)
        }, {
          default: U(() => [
            V(h(l.facetLabelByCode(p)) + ": " + h(l.facetValueLabelByCode(p, v)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : b("", !0),
    (i(!0), f(z, null, Z(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(z, { key: 0 }, [
        (i(), H(be(e.heading), {
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
          (i(!0), f(z, null, Z(l.selectedInvisibleFacets(d.code), (p) => (i(), f(z, {
            key: p.code
          }, [
            d.multiple ? (i(), f("div", iv, [
              ae(o, {
                small: "",
                modelValue: !0,
                "onUpdate:modelValue": (v) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
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
            ])) : (i(), H(u, {
              key: 1,
              tertiary: "",
              "no-outline": "",
              onClick: (v) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
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
          (i(!0), f(z, null, Z(l.visibleFacets(d.code, d.values), (p) => (i(), f(z, {
            key: p.code
          }, [
            d.multiple ? (i(), f("div", vv, [
              ae(o, {
                small: "",
                modelValue: l.isFacetValueSelected(d.code, p.code),
                class: "facet",
                "onUpdate:modelValue": (v) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
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
            ])) : (i(), H(u, {
              key: 1,
              tertiary: "",
              "no-outline": "",
              onClick: (v) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
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
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), H(u, {
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
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), H(u, {
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
const Tv = /* @__PURE__ */ Ae(lv, [["render", Dv], ["__scopeId", "data-v-628fafbe"]]), fa = () => {
  const a = Q(), t = Q(!1), e = Q(!1), n = () => {
    if (!a.value)
      return;
    a.value.style.setProperty("--collapser", "none");
    const s = a.value.offsetHeight;
    a.value.style.setProperty("--collapse", `${-s}px`), a.value.style.setProperty("--collapser", "");
  };
  return {
    collapse: a,
    collapsing: t,
    cssExpanded: e,
    doExpand: (s) => {
      a.value && (s === !0 && a.value.style.setProperty("--collapse-max-height", "none"), window.requestAnimationFrame(() => {
        t.value = !0, n(), window.requestAnimationFrame(() => {
          e.value = s;
        });
      }));
    },
    adjust: n,
    onTransitionEnd: (s) => {
      t.value = !1, a.value && s === !1 && a.value.style.removeProperty("--collapse-max-height");
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
  setup(a, { expose: t }) {
    const {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = fa(), o = a, u = Q(null), d = Q(!1);
    let p = Q(0), v = [];
    Re("menuItem", { menuItemIndex: p, addMenuItem: (_, N) => {
      p.value += 1, v.push(`${_}@${N}`);
    } }), Re("id", o.id), pe(d, (_, N) => {
      _ !== N && (l(_), _ ? (setTimeout(() => B(), 100), document.addEventListener("click", T), document.addEventListener("touchstart", T)) : (document.removeEventListener("click", T), document.removeEventListener("touchstart", T)));
    });
    const I = (_, N) => {
      const E = N === "down" ? (_ + 1) % v.length : (_ - 1 + v.length) % v.length, M = document.getElementById(`${o.id}_item_${E}`);
      return M.ariaDisabled === "true" ? I(E, N) : M;
    }, x = (_) => {
      const N = document.activeElement.id, E = N.startsWith(`${o.id}_item_`) ? Number(N.split("_")[2]) : _ === "down" ? -1 : 0;
      I(E, _).focus();
    }, B = (_) => x("down"), y = (_) => x("up");
    let w = (_) => {
      let N = _.key;
      if (N.length > 1 && N.match(/\S/))
        return;
      N = N.toLowerCase();
      let E = v.filter((g) => g.toLowerCase().startsWith(N)), M = document.activeElement.id;
      for (let g of E) {
        let L = g.split("@")[1], W = document.getElementById(`${o.id}_item_${L}`);
        if (M !== W.id) {
          W.focus();
          break;
        }
      }
    }, T = (_) => {
      u.value.contains(_.target) || (d.value = !1);
    };
    function S() {
      d.value = !1;
    }
    const D = k(() => ["sm", "small"].includes(o.size)), C = k(() => ["md", "medium"].includes(o.size)), P = k(() => ["lg", "large"].includes(o.size));
    return t({ closeMenu: S }), (_, N) => (i(), f("div", {
      class: "relative-position fr-menu__wrapper",
      onKeydown: N[9] || (N[9] = re(
        //@ts-ignore
        (...E) => j(T) && j(T)(...E),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", Y({
        id: _.id,
        onClick: N[0] || (N[0] = ne((E) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          N[1] || (N[1] = re(ne((E) => d.value = !1, ["stop"]), ["esc"])),
          N[2] || (N[2] = re(ne((E) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          re(ne(B, ["prevent"]), ["down"]),
          re(ne(y, ["prevent"]), ["up"]),
          N[3] || (N[3] = //@ts-ignore
          (...E) => j(w) && j(w)(...E)),
          N[4] || (N[4] = re((E) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [_.icon]: !0,
          "fr-btn--secondary": _.secondary,
          "fr-btn--tertiary": _.tertiary,
          "fr-btn--sm": D.value,
          "fr-btn--md": C.value,
          "fr-btn--lg": P.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": _.disabled,
        "aria-controls": `${_.id}_menu`,
        "aria-expanded": d.value
      }, _.$attrs), [
        c("span", null, h(_.label), 1)
      ], 16, Iv),
      c("div", {
        id: `${_.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse fr-menu", { "fr-collapse--expanded": j(r), "fr-collapsing": j(n) }]),
        role: "menu",
        "aria-labelledby": _.id,
        onKeyup: N[5] || (N[5] = re((E) => d.value = !1, ["esc"])),
        onKeydown: [
          N[6] || (N[6] = re((E) => d.value = !1, ["tab"])),
          re(ne(B, ["prevent"]), ["down"]),
          re(ne(y, ["prevent"]), ["up"]),
          N[7] || (N[7] = //@ts-ignore
          (...E) => j(w) && j(w)(...E))
        ],
        onTransitionend: N[8] || (N[8] = (E) => j(s)(d.value))
      }, [
        c("ul", Ev, [
          $(_.$slots, "default", {}, void 0, !0)
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
  setup(a) {
    const t = a, { menuItemIndex: e, addMenuItem: n } = Qe("menuItem"), l = `fr-btn fr-btn--secondary fr-nav__link ${k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")) ? t.icon : ""} fr-btn--icon-left`, s = Qe("id"), o = e.value;
    return n(t.label, o), (u, d) => {
      const p = Te("dsfr-button");
      return i(), f("li", Lv, [
        u.url === "" ? (i(), H(p, Y({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${j(s)}_item_${j(o)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", Y({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${j(s)}_item_${j(o)}`,
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
  props: /* @__PURE__ */ Le({
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
  emits: /* @__PURE__ */ Le(["update:model-value", "blur"], ["update:modelValue"]),
  setup(a, { emit: t }) {
    const {
      collapse: e,
      collapsing: n,
      cssExpanded: r,
      doExpand: l,
      onTransitionEnd: s
    } = fa(), o = a, u = Q(!1), d = De(a, "modelValue"), p = Q(o.options);
    pe(u, (A, O) => {
      A !== O && (l(A), A ? (document.addEventListener("click", J), document.addEventListener("touchstart", J)) : (document.removeEventListener("click", J), document.removeEventListener("touchstart", J)));
    });
    const v = Q(null), m = Q(null), I = Q(null), x = Q(""), B = t, y = k(() => o.errorMessage || o.successMessage), w = k(() => o.errorMessage !== "" ? "error" : "valid"), T = k(() => p.value.every((A) => o.modelValue.includes(A.value)) ? "fr-icon-close-circle-line" : "fr-icon-check-line"), S = k(() => p.value.every((A) => o.modelValue.includes(A.value)) ? "Tout déselectionner" : "Tout sélectionner"), D = k(() => {
      let O = `${o.options.filter((ee) => o.modelValue.includes(ee.value)).length} options séléctionnées`;
      return o.modelValue.length > 2 ? O : o.options.filter((ee) => o.modelValue.includes(ee.value)).map((ee) => ee.text).join(", ");
    });
    let C = function() {
      if (p.value.every((O) => o.modelValue.includes(O.value))) {
        const O = p.value.map((G) => G.value), ee = o.modelValue.filter((G) => !O.includes(G));
        o.modelValue.length = 0, ee.forEach((G) => o.modelValue.push(G));
      } else
        p.value.filter((ee) => !o.modelValue.includes(ee.value)).forEach((ee) => o.modelValue.push(ee.value));
      B("update:model-value");
    }, P = function(A) {
      const O = A.target.value.toLowerCase();
      p.value = o.options.filter((ee) => ee.text.toLowerCase().indexOf(O) > -1);
    };
    const _ = function(A) {
      switch (A.key) {
        case "Escape":
        case "Esc":
          A.stopPropagation(), u.value = !1;
          break;
        case " ":
        case "Space":
          document.activeElement.id === o.id && (A.preventDefault(), u.value = !u.value);
          break;
        case "Down":
        case "ArrowDown":
          A.preventDefault(), u.value ? M() : (u.value = !0, setTimeout(() => M(), 100));
          break;
        case "Up":
        case "ArrowUp":
          A.preventDefault(), u.value ? g() : (u.value = !0, setTimeout(() => g(), 100));
          break;
        case "Tab":
          L(A);
          break;
        default:
          let O = /^[a-zA-Z0-9àâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]$/.test(A.key);
          if (!O && A.shiftKey)
            return;
          o.comboHasFilter && document.activeElement.id === `${o.id}_filter` || (o.comboHasFilter && O ? I.value.focus() : W(A));
      }
    }, N = (A, O) => {
      const ee = O === "down" ? (A + 1) % p.value.length : (A - 1 + p.value.length) % p.value.length, G = document.getElementById(`${o.id}_item_${ee}`);
      return G === null || G.ariaDisabled === "true" ? N(ee, O) : G;
    }, E = (A) => {
      const O = document.activeElement.id, ee = O.startsWith(`${o.id}_item_`) ? Number(O.split("_")[2]) : A === "down" ? -1 : 0;
      N(ee, A).focus();
    }, M = (A) => E("down"), g = (A) => E("up"), L = (A) => {
      if (!u.value) {
        B("blur");
        return;
      }
      const O = [];
      o.comboHasButton && O.push(`${o.id}_button`), o.comboHasFilter && O.push(`${o.id}_filter`), O.push("item");
      const ee = O.indexOf(A.target.id);
      let G;
      A.shiftKey ? G = (ee - 1 + O.length) % O.length : G = (ee + 1) % O.length;
      const ue = document.getElementById(O[G]);
      O[G] === "item" ? (M(), A.preventDefault()) : ue && (ue.focus(), A.preventDefault());
    };
    let W = (A) => {
      let O = A.key;
      if (O.length > 1 && O.match(/\S/) || document.activeElement.id === `${o.id}_filter`)
        return;
      O = O.toLowerCase();
      let ee = p.value.filter((ue) => ue.text.toLowerCase().startsWith(O)), G = document.activeElement.id;
      for (let ue of ee) {
        let he = document.querySelector(`[data-id='${ue.value}']`);
        if (G !== he.id) {
          he.focus();
          break;
        }
      }
    }, J = (A) => {
      v.value.contains(A.target) || (u.value = !1, B("blur"));
    }, te = (A, O) => {
      Array.isArray(d.value) || (d.value = []), d.value.includes(O) ? d.value.splice(d.value.indexOf(O), 1) : (d.value.push(O), p.value.length === 1 && (x.value = "", p.value = o.options)), B("update:model-value", d.value);
    };
    return (A, O) => {
      const ee = Te("v-icon");
      return i(), f(z, null, [
        c("div", Y({
          ref_key: "container",
          ref: v,
          class: ["fr-select-group", { [`fr-select-group--${w.value}`]: y.value !== "" }],
          onKeyup: O[6] || (O[6] = re(
            //@ts-ignore
            (...G) => j(J) && j(J)(...G),
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
            class: R([{ [`fr-select--${w.value}`]: y.value !== "" }, "fr-input fr-select--menu flex"]),
            onClick: O[0] || (O[0] = (G) => u.value = !u.value),
            onKeydown: _,
            tabindex: "0",
            "aria-autocomplete": "none",
            role: "combobox",
            "aria-expanded": u.value,
            "aria-haspopup": "dialog",
            "aria-describedby": `${A.id}_label`,
            "aria-controls": `${A.id}_dialog`,
            "aria-disabled": A.disabled,
            "aria-required": A.required
          }, [
            c("p", Vv, h(D.value), 1),
            c("div", Nv, [
              ae(ee, {
                style: { "font-size": "1rem" },
                name: "ri-arrow-down-s-line"
              })
            ])
          ], 42, Fv),
          c("div", {
            id: `${A.id}_dialog`,
            ref_key: "collapse",
            ref: e,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Choix des options",
            class: R(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": j(r), "fr-collapsing": j(n) }]),
            onKeydown: _,
            onTransitionend: O[5] || (O[5] = (G) => j(s)(u.value))
          }, [
            A.comboHasButton ? (i(), f("div", jv, [
              c("button", {
                class: R(["fr-btn fr-btn--tertiary fr-btn--sm", `${T.value}`]),
                id: `${A.id}_button`,
                onClick: O[1] || (O[1] = (G) => j(C)()),
                ref_key: "button",
                ref: m,
                type: "button"
              }, h(S.value), 11, Hv)
            ])) : b("", !0),
            A.comboHasFilter ? (i(), f("div", Wv, [
              Be(c("input", {
                class: "fr-input",
                id: `${A.id}_filter`,
                ref_key: "filter",
                ref: I,
                onInput: O[2] || (O[2] = //@ts-ignore
                (...G) => j(P) && j(P)(...G)),
                "onUpdate:modelValue": O[3] || (O[3] = (G) => x.value = G),
                "aria-label": "Rechercher une option",
                "aria-controls": `${A.id}_listbox`,
                placeholder: "Rechercher",
                type: "text"
              }, null, 40, Kv), [
                [va, x.value]
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
              (i(!0), f(z, null, Z(p.value, (G, ue) => (i(), f("li", {
                class: "fr-checkbox-group fr-checkbox-group--sm fr-py-0 fr-my-1v",
                id: `${A.id}_item_${ue}`,
                tabindex: "-1",
                role: "option",
                onKeydown: re(ne((he) => j(te)(he, G.value), ["prevent"]), ["space"]),
                onClick: (he) => j(te)(he, G.value),
                "aria-selected": d.value.includes(G.value)
              }, [
                Be(c("input", {
                  "data-id": G.value,
                  type: "hidden",
                  class: "",
                  tabindex: "-1",
                  value: G.value,
                  "onUpdate:modelValue": O[4] || (O[4] = (he) => d.value = he)
                }, null, 8, Xv), [
                  [va, d.value]
                ]),
                c("span", null, h(G.text), 1)
              ], 40, Gv))), 256))
            ], 8, zv)
          ], 42, qv)
        ], 16),
        y.value ? (i(), f("p", {
          key: 0,
          id: `select-${w.value}-desc-${w.value}`,
          class: R(`fr-${w.value}-text`)
        }, h(y.value), 11, Uv)) : b("", !0)
      ], 64);
    };
  }
}), Jv = /* @__PURE__ */ Ae(Zv, [["__scopeId", "data-v-93e61e6d"]]), eg = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], tg = ["id", "aria-labelledby", "onKeydown"], ag = {
  key: 0,
  class: "fr-label fr-mb-0"
}, ng = {
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
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = fa(), s = a, o = Q(null), u = Q(!1);
    let d = Q(0), p = [];
    const v = (T, S) => {
      d.value += 1, p.push(`${T}@${S}`);
    };
    Re("menuItem", { menuItemIndex: d, addMenuItem: v }), Re("id", s.id), pe(u, (T, S) => {
      T !== S && (r(T), T ? (setTimeout(() => x(), 100), document.addEventListener("click", w), document.addEventListener("touchstart", w)) : (document.removeEventListener("click", w), document.removeEventListener("touchstart", w)));
    }), xe(() => {
      v(s.logoutLabel, d.value);
    });
    const m = (T, S) => {
      const D = S === "down" ? (T + 1) % p.length : (T - 1 + p.length) % p.length, C = document.getElementById(`${s.id}_item_${D}`);
      return C.ariaDisabled === "true" ? m(D, S) : C;
    }, I = (T) => {
      const S = document.activeElement.id, D = S.startsWith(`${s.id}_item_`) ? Number(S.split("_")[2]) : T === "down" ? -1 : 0;
      m(D, T).focus();
    }, x = (T) => I("down"), B = (T) => I("up");
    let y = (T) => {
      let S = T.key;
      if (S.length > 1 && S.match(/\S/))
        return;
      S = S.toLowerCase();
      let D = p.filter((P) => P.toLowerCase().startsWith(S)), C = document.activeElement.id;
      for (let P of D) {
        let _ = P.split("@")[1], N = document.getElementById(`${s.id}_item_${_}`);
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
      onKeyup: S[9] || (S[9] = re(
        //@ts-ignore
        (...D) => j(w) && j(w)(...D),
        ["tab"]
      )),
      ref_key: "container",
      ref: o
    }, [
      c("button", Y({
        id: T.id,
        onClick: S[0] || (S[0] = ne((D) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          S[1] || (S[1] = re(ne((D) => u.value = !1, ["stop"]), ["esc"])),
          S[2] || (S[2] = re(ne((D) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          re(ne(x, ["prevent"]), ["down"]),
          re(ne(B, ["prevent"]), ["up"]),
          S[3] || (S[3] = //@ts-ignore
          (...D) => j(y) && j(y)(...D)),
          S[4] || (S[4] = re((D) => u.value = !1, ["tab"]))
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
        class: R(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": j(n), "fr-collapsing": j(e) }]),
        role: "menu",
        "aria-labelledby": T.id,
        onKeyup: S[5] || (S[5] = re((D) => u.value = !1, ["esc"])),
        onKeydown: [
          S[6] || (S[6] = re((D) => u.value = !1, ["tab"])),
          re(ne(x, ["prevent"]), ["down"]),
          re(ne(B, ["prevent"]), ["up"]),
          S[7] || (S[7] = //@ts-ignore
          (...D) => j(y) && j(y)(...D))
        ],
        onTransitionend: S[8] || (S[8] = (D) => j(l)(u.value))
      }, [
        $(T.$slots, "detail", {}, () => [
          T.nom === "" && T.email === "" ? b("", !0) : (i(), f("p", ag, [
            V(h(T.nom) + " ", 1),
            T.email !== "" ? (i(), f("span", ng, h(T.email), 1)) : b("", !0)
          ]))
        ], !0),
        c("ul", rg, [
          $(T.$slots, "default", {}, void 0, !0),
          c("li", lg, [
            c("div", sg, [
              T.logoutUrl !== "" ? (i(), f("a", {
                key: 0,
                id: `${T.id}_item_${j(d) - 1}`,
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
  setup(a, { emit: t }) {
    const e = t;
    return (n, r) => (i(), f("nav", {
      role: "navigation",
      "aria-label": n.navAriaLabel
    }, [
      c("ul", fg, [
        (i(!0), f(z, null, Z(n.links, (l, s) => (i(), f("li", { key: s }, [
          ae(j(oa), Y({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var u;
              e("linkClick", o), (u = l.onClick) == null || u.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        $(n.$slots, "default")
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = st(e, "languageSelector"), l = Q(!1), s = Q(!1), o = Q(!1), u = () => {
      var y;
      o.value = !1, l.value = !1, s.value = !1, (y = document.getElementById("button-menu")) == null || y.focus();
    }, d = (y) => {
      y.key === "Escape" && u();
    };
    xe(() => {
      document.addEventListener("keydown", d), n("on-mounted");
    }), Ee(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var y;
      o.value = !0, l.value = !0, s.value = !1, (y = document.getElementById("close-button")) == null || y.focus();
    }, v = () => {
      o.value = !0, l.value = !1, s.value = !0;
    }, m = u, I = Xt(), x = k(() => {
      var y;
      return !!((y = I.operator) != null && y.call(I).length) || !!e.operatorImgSrc;
    }), B = k(() => !!I.mainnav);
    return Re(dg, () => u), (y, w) => {
      var S, D, C;
      const T = Te("RouterLink");
      return i(), f("header", pg, [
        c("div", mg, [
          c("div", hg, [
            c("div", vg, [
              c("div", gg, [
                c("div", bg, [
                  c("div", yg, [
                    ae(T, {
                      to: y.homeTo,
                      title: `${y.homeLabel} - ${y.serviceTitle}`
                    }, {
                      default: U(() => [
                        ae(j(nt), {
                          "logo-text": y.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  x.value ? (i(), f("div", kg, [
                    $(y.$slots, "operator", {}, () => [
                      y.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: y.operatorImgSrc,
                        alt: y.operatorImgAlt,
                        style: Ie(y.operatorImgStyle)
                      }, null, 12, wg)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  y.showSearch || B.value || (S = y.quickLinks) != null && S.length ? (i(), f("div", _g, [
                    y.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": y.showSearchLabel,
                      title: y.showSearchLabel,
                      "data-fr-opened": s.value,
                      onClick: w[0] || (w[0] = ne((P) => v(), ["prevent", "stop"]))
                    }, null, 8, xg)) : b("", !0),
                    B.value || (D = y.quickLinks) != null && D.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": y.menuLabel,
                      title: y.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: w[1] || (w[1] = ne((P) => p(), ["prevent", "stop"]))
                    }, null, 8, Dg)) : b("", !0)
                  ])) : b("", !0)
                ]),
                y.serviceTitle ? (i(), f("div", Tg, [
                  ae(T, Y({
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
                  l.value ? b("", !0) : (i(), H(Yt, {
                    key: 0,
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel
                  }, {
                    default: U(() => [
                      $(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), H(j(rt), Y({ key: 1 }, r.value, {
                    onSelect: w[2] || (w[2] = (P) => n("language-select", P))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                c("div", Bg, [
                  $(y.$slots, "header-search"),
                  y.showSearch ? (i(), H(j(lt), {
                    key: 0,
                    "searchbar-id": y.searchbarId,
                    label: y.searchLabel,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": w[3] || (w[3] = (P) => n("update:modelValue", P)),
                    onSearch: w[4] || (w[4] = (P) => n("search", P))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : b("", !0)
                ])
              ])
            ]),
            y.showSearch || B.value || y.quickLinks && y.quickLinks.length || r.value ? (i(), f("div", {
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
                  onClick: w[5] || (w[5] = ne((P) => u(), ["prevent", "stop"]))
                }, h(y.closeMenuModalLabel), 1),
                c("div", Ag, [
                  r.value ? (i(), H(j(rt), Y({ key: 0 }, r.value, {
                    onSelect: w[6] || (w[6] = (P) => r.value.currentLanguage = P.codeIso)
                  }), null, 16)) : b("", !0),
                  l.value ? (i(), H(Yt, {
                    key: 1,
                    role: "navigation",
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel,
                    onLinkClick: j(m)
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
                  ae(j(lt), {
                    "searchbar-id": y.searchbarId,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    "onUpdate:modelValue": w[7] || (w[7] = (P) => n("update:modelValue", P)),
                    onSearch: w[8] || (w[8] = (P) => n("search", P))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, Sg)) : b("", !0),
            $(y.$slots, "default")
          ])
        ]),
        c("div", Rg, [
          B.value && !o.value ? (i(), f("div", Fg, [
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
}, eb = { class: "fr-checkbox-group fr-checkbox-group--sm" }, tb = ["id", "value"], ab = ["for"], nb = ["onKeydown"], rb = { key: 0 }, lb = ["colspan"], sb = { class: "flex gap-2 items-center" }, ob = ["selected"], ib = ["value", "selected"], ub = { class: "flex ml-1" }, db = /* @__PURE__ */ F({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ Le({
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
  emits: /* @__PURE__ */ Le(["update:current-page"], ["update:selection", "update:rowsPerPage", "update:currentPage", "update:sortedBy", "update:sortedDesc"]),
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = De(a, "selection"), s = De(a, "rowsPerPage"), o = De(a, "currentPage"), u = k(() => Math.max(Math.ceil(n.rows.length / s.value), 1)), d = k(() => n.pages ?? Array.from({ length: u.value }).map((E, M) => ({
      label: `${M + 1}`,
      title: `Page ${M + 1}`,
      href: `#${M + 1}`
    }))), p = k(() => o.value * s.value), v = k(() => (o.value + 1) * s.value), m = k(() => ["sm", "small"].includes(n.footerSize));
    function I(E, M) {
      const g = x.value;
      return (E[g] ?? E) < (M[g] ?? M) ? -1 : (E[g] ?? E) > (M[g] ?? M) ? 1 : 0;
    }
    const x = De(a, "sortedBy");
    x.value = n.sorted;
    const B = De(a, "sortedDesc");
    function y(E) {
      if (!(!n.sortableRows || Array.isArray(n.sortableRows) && !n.sortableRows.includes(E))) {
        if (x.value === E) {
          if (B.value) {
            x.value = void 0, B.value = !1;
            return;
          }
          B.value = !0;
          return;
        }
        B.value = !1, x.value = E;
      }
    }
    const w = k(() => {
      const E = x.value ? n.rows.slice().sort(n.sortFn ?? I) : n.rows.slice();
      return B.value && E.reverse(), E;
    }), T = k(() => {
      const E = n.headersRow.map((g) => typeof g != "object" ? g : g.key), M = w.value.map((g) => Array.isArray(g) ? g : E.map((L) => g));
      return n.pagination ? M.slice(p.value, v.value) : M;
    });
    function S(E) {
      E && (l.value = T.value.map((M) => M[0][n.rowKey])), l.value.length = 0;
    }
    const D = Q(!1);
    function C() {
      D.value = l.value.length === T.value.length;
    }
    function P() {
      r("update:current-page", 0), D.value = !1, l.value.length = 0;
    }
    function _(E) {
      navigator.clipboard.writeText(E);
    }
    function N() {
      o.value = 0;
    }
    return t({ resetCurrentPage: N }), (E, M) => (i(), f("div", Ng, [
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
                        onInput: M[0] || (M[0] = (g) => S(g.target.checked))
                      }, null, 40, Yg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${E.id}-all`
                      }, " Sélectionner tout ", 8, zg)
                    ])) : b("", !0)
                  ])) : b("", !0),
                  (i(!0), f(z, null, Z(E.headersRow, (g, L) => (i(), f("th", Y({
                    key: typeof g == "object" ? g.key : g,
                    scope: "col",
                    ref_for: !0
                  }, typeof g == "object" && g.headerAttrs, {
                    class: {
                      "text-right": g.align === "right",
                      "text-left": g.align === "left"
                    },
                    tabindex: E.sortableRows ? 0 : void 0,
                    onClick: (W) => y(g.key ?? (Array.isArray(E.rows[0]) ? L : g)),
                    onKeydown: [
                      re((W) => y(g.key ?? g), ["enter"]),
                      re((W) => y(g.key ?? g), ["space"])
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
                      x.value !== (g.key ?? g) && (E.sortableRows === !0 || Array.isArray(E.sortableRows) && E.sortableRows.includes(g.key ?? g)) ? (i(), f("span", Xg, [
                        ae(j(ke), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : x.value === (g.key ?? g) ? (i(), f("span", Ug, [
                        ae(j(ke), {
                          name: B.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Gg))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, Z(T.value, (g, L) => (i(), f("tr", {
                  key: `row-${L}`,
                  "data-row-key": L + 1
                }, [
                  E.selectableRows ? (i(), f("th", Jg, [
                    c("div", eb, [
                      Be(c("input", {
                        id: `row-select-${E.id}-${L}`,
                        "onUpdate:modelValue": M[1] || (M[1] = (W) => l.value = W),
                        value: g[0][E.rowKey] ?? `row-${L}`,
                        type: "checkbox",
                        onChange: M[2] || (M[2] = (W) => C())
                      }, null, 40, tb), [
                        [kt, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${E.id}-${L}`
                      }, " Sélectionner la ligne " + h(L + 1), 9, ab)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(z, null, Z(g, (W, J) => (i(), f("td", {
                    key: typeof W == "object" ? W[E.rowKey] : W,
                    class: R({
                      "text-right": E.headersRow[J].align === "right",
                      "text-left": E.headersRow[J].align === "left"
                    }),
                    onKeydown: [
                      re(ne((te) => _(typeof W == "object" ? W[E.rowKey] : W), ["ctrl"]), ["c"]),
                      re(ne((te) => _(typeof W == "object" ? W[E.rowKey] : W), ["meta"]), ["c"])
                    ]
                  }, [
                    $(E.$slots, "cell", Y({ ref_for: !0 }, {
                      colKey: typeof E.headersRow[J] == "object" ? E.headersRow[J].key : E.headersRow[J],
                      cell: W,
                      idx: L + 1
                    }), () => [
                      V(h(typeof W == "object" ? W[E.rowKey] : W), 1)
                    ], !0)
                  ], 42, nb))), 128))
                ], 8, Zg))), 128)),
                T.value.length === 0 ? (i(), f("tr", rb, [
                  c("td", {
                    colspan: E.selectableRows ? E.headersRow.length + 1 : E.headersRow.length
                  }, h(n.noResultLabel), 9, lb)
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
              Be(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": M[3] || (M[3] = (g) => s.value = g),
                class: "fr-select",
                onChange: M[4] || (M[4] = (g) => P())
              }, [
                c("option", {
                  value: "",
                  selected: !E.paginationOptions.includes(s.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, ob),
                (i(!0), f(z, null, Z(E.paginationOptions, (g, L) => (i(), f("option", {
                  key: L,
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
            ae(j(sa), {
              "current-page": o.value,
              "onUpdate:currentPage": M[5] || (M[5] = (g) => o.value = g),
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
  props: /* @__PURE__ */ Le({
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
  setup(a) {
    const t = a, e = k(() => t.errorMessage || t.validMessage), n = k(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = De(a, "modelValue");
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
        Be(c("input", Y({
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
            class: R(["fr-message--info flex items-center", n.value])
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
  setup(a) {
    const t = a;
    t.description && console.warn(
      "[DsfrSelect] : La prop `description` est dépréciée. Veuillez utiliser `hint` à la place."
    );
    const e = k(() => t.errorMessage || t.successMessage), n = k(() => t.errorMessage ? "error" : "valid"), r = function(l) {
      if (l === "")
        return null;
      let o = t.options.length > 0 && t.options[0].value !== "" && typeof t.options[0].value == "string" ? 0 : 1, u = t.options.length > o && typeof t.options[o].value == "string";
      return isNaN(l) || u ? l : parseInt(l, 10);
    };
    return (l, s) => (i(), f("div", {
      class: R(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
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
        class: [{ [`fr-select--${n.value}`]: e.value }, "fr-select"],
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
        (i(!0), f(z, null, Z(l.options, (o, u) => (i(), f("option", {
          key: u,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, h(typeof o == "object" ? o.text : o), 9, xb))), 128))
      ], 16, wb),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: R(`fr-${n.value}-text`)
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
  setup(a) {
    const t = a, e = Q(!1), n = Q(!1), r = Q(!1), l = Q(null), s = Q(null), o = Q("0px"), u = Q("0px"), d = Q("0px"), p = Q(!1), v = Q(0);
    async function m() {
      var K, X, le, de, fe, ot, pa, ma;
      if (typeof document > "u" || !e.value || s.value.matches(":empty"))
        return;
      await new Promise((lr) => setTimeout(lr, 100));
      const M = (K = l.value) == null ? void 0 : K.getBoundingClientRect().top, g = (X = l.value) == null ? void 0 : X.offsetHeight, L = (le = l.value) == null ? void 0 : le.offsetWidth, W = (de = l.value) == null ? void 0 : de.getBoundingClientRect().left, J = (fe = s.value) == null ? void 0 : fe.offsetHeight, te = (ot = s.value) == null ? void 0 : ot.offsetWidth, A = (pa = s.value) == null ? void 0 : pa.offsetTop, O = (ma = s.value) == null ? void 0 : ma.offsetLeft, G = !(M - J < 0) && M + g + J >= document.documentElement.offsetHeight;
      p.value = G;
      const ue = W + L >= document.documentElement.offsetWidth, he = W + L / 2 - te / 2 <= 0;
      u.value = G ? `${M - A - J + 8}px` : `${M - A + g - 8}px`, v.value = 1, o.value = ue ? `${W - O + L - te - 4}px` : he ? `${W - O + 4}px` : `${W - O + L / 2 - te / 2}px`, d.value = ue ? `${te / 2 - L / 2 + 4}px` : he ? `${-(te / 2) + L / 2 - 4}px` : "0px";
    }
    pe(e, m, { immediate: !0 });
    const I = k(() => ["sm", "small"].includes(t.size)), x = k(() => ["md", "medium"].includes(t.size)), B = k(() => ["lg", "large"].includes(t.size)), y = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), w = k(() => `transform: translate(${o.value}, ${u.value}); --arrow-x: ${d.value}; opacity: ${v.value};'`), T = k(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": p.value,
      "fr-placement--bottom": !p.value
    })), S = (M) => {
      M.key === "Escape" && (e.value = !1, M.preventDefault());
    }, D = (M) => {
      var g;
      (M.target === l.value || (g = l.value) != null && g.contains(M.target)) && (e.value = !0);
    }, C = (M) => {
      setTimeout(() => {
        !n.value && !r.value && (e.value = !1);
      }, 50);
    };
    let P, _ = !1;
    const N = () => {
      var M;
      _ !== !0 && (P = (M = l.value) == null ? void 0 : M.onclick, _ = !0, l.value.onclick = function(g) {
        g.stopImmediatePropagation(), g.preventDefault();
      });
    }, E = () => {
      _ !== !1 && (l.value.onclick = P, _ = !1, P = null);
    };
    return xe(() => {
      window.addEventListener("scroll", m), l.value.addEventListener("click", () => e.value = !1), document.documentElement.addEventListener("keydown", S), document.documentElement.addEventListener("mouseover", D), t.disabled && N();
    }), Ee(() => {
      window.removeEventListener("scroll", m), document.documentElement.removeEventListener("keydown", S), document.documentElement.removeEventListener("mouseover", D);
    }), pe(() => t.disabled, () => {
      t.disabled ? N() : E();
    }), (M, g) => (i(), f(z, null, [
      (i(), H(be(M.href !== "" ? "a" : "button"), Y({
        id: `button-${M.id}`,
        ref_key: "source",
        ref: l,
        href: M.href !== "" && !M.disabled ? M.href : void 0,
        onClick: g[0] || (g[0] = (L) => {
          M.disabled && (L.preventDefault(), L.stopImmediatePropagation());
        }),
        class: {
          "fr-link": M.isLink && !M.inline,
          "fr-btn": !M.isLink,
          "fr-btn--secondary": M.secondary && !M.tertiary,
          "fr-btn--tertiary": M.tertiary && !M.secondary && !M.noOutline,
          "fr-btn--tertiary-no-outline": M.tertiary && !M.secondary && M.noOutline,
          "fr-btn--sm": I.value,
          "fr-btn--md": x.value,
          "fr-btn--lg": B.value,
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
        onMouseenter: g[1] || (g[1] = (L) => r.value = !0),
        onMouseleave: g[2] || (g[2] = (L) => {
          r.value = !1, C();
        }),
        onFocus: g[3] || (g[3] = (L) => D(L)),
        onBlur: g[4] || (g[4] = (L) => C())
      }, M.$attrs), {
        default: U(() => [
          M.iconOnly ? (i(), f("span", Ib, h(M.label), 1)) : (i(), f(z, { key: 1 }, [
            V(h(M.label), 1)
          ], 64))
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-disabled", "aria-labelledby"])),
      c("p", {
        id: M.id,
        ref_key: "tooltip",
        ref: s,
        class: R(["fr-tooltip fr-placement", T.value]),
        style: Ie(w.value),
        role: "tooltip",
        "aria-hidden": "true",
        onMouseenter: g[5] || (g[5] = (L) => n.value = !0),
        onMouseleave: g[6] || (g[6] = (L) => {
          n.value = !1, C();
        })
      }, [
        $(M.$slots, "default", {}, () => [
          V(h(M.content), 1)
        ], !0)
      ], 46, Cb)
    ], 64));
  }
}), rr = /* @__PURE__ */ Ae(Eb, [["__scopeId", "data-v-cf8d87ce"]]), Pb = /* @__PURE__ */ F({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (t, e) => (i(), H(rr, Y({ "is-link": !1 }, t.$attrs), {
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
  setup(a) {
    return (t, e) => (i(), H(rr, Y({
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
  setup(a) {
    const t = a, e = k(() => ["sm", "small"].includes(t.size)), n = k(() => ["md", "medium"].includes(t.size)), r = k(() => ["lg", "large"].includes(t.size)), l = k(() => t.asButton ? "btn" : "link"), s = k(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-"));
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
      $(o.$slots, "default", {}, () => [
        V(h(o.label), 1)
      ], !0)
    ], 16, Lb));
  }
}), Sb = /* @__PURE__ */ Ae(Bb, [["__scopeId", "data-v-edcd30c2"]]), $b = (a, t) => a.matches ? a.matches(t) : a.msMatchesSelector ? a.msMatchesSelector(t) : a.webkitMatchesSelector ? a.webkitMatchesSelector(t) : null, Ab = (a, t) => {
  let e = a;
  for (; e && e.nodeType === 1; ) {
    if ($b(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, Ob = (a, t) => a.closest ? a.closest(t) : Ab(a, t), Rb = (a) => !!(a && typeof a.then == "function");
class Fb {
  constructor({
    search: t,
    autoSelect: e = !1,
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
          const n = e === "ArrowUp" || e === "Up" ? this.selectedIndex - 1 : this.selectedIndex + 1;
          t.preventDefault(), this.handleArrows(n);
          break;
        }
        case "Tab": {
          this.selectResult();
          break;
        }
        case "Enter": {
          const n = t.target.getAttribute("aria-activedescendant").length > 0;
          this.selectedResult = this.results[this.selectedIndex] || this.selectedResult, this.selectResult(), this.submitOnEnter ? this.selectedResult && this.onSubmit(this.selectedResult) : n ? t.preventDefault() : (this.selectedResult && this.onSubmit(this.selectedResult), this.selectedResult = null);
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
      const { target: e } = t, n = Ob(e, "[data-result-index]");
      if (n) {
        this.selectedIndex = parseInt(n.dataset.resultIndex, 10);
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
      this.onLoading(), this.search(t).then((n) => {
        if (e === this.searchCounter) {
          if (this.results = n, this.onLoaded(), this.results.length === 0) {
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
      const n = t.getBoundingClientRect(), r = e.getBoundingClientRect();
      r.top < n.top ? t.scrollTop -= n.top - r.top : r.bottom > n.bottom && (t.scrollTop += r.bottom - n.bottom);
    });
    this.search = Rb(t) ? t : (I) => Promise.resolve(t(I)), this.autoSelect = e, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = s, this.autocorrect = u, this.onShow = o, this.onHide = d, this.onLoading = p, this.onLoaded = v, this.submitOnEnter = m;
  }
}
const Vb = (a, t) => {
  const e = a.getBoundingClientRect(), n = t.getBoundingClientRect();
  return /* 1 */ e.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - n.height > 0 ? "above" : "below";
}, Nb = (a, t, e) => {
  let n;
  return function() {
    const l = this, s = arguments, o = function() {
      n = null, a.apply(l, s);
    };
    clearTimeout(n), n = setTimeout(o, t);
  };
}, qb = (a) => {
  if (a != null && a.length) {
    const t = a.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? a.substring(1) : a
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
    const a = new Fb({
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
    return this.debounceTime > 0 && (a.handleInput = Nb(a.handleInput, this.debounceTime)), {
      core: a,
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
        class: a,
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
      const a = this.position === "below" ? "top" : "bottom", t = qb(this.resultListLabel);
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
      return this.results.map((a, t) => ({
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
    setValue(a) {
      this.value = a ? this.getResultValue(a) : "";
    },
    handleUpdate(a, t) {
      this.results = a, this.selectedIndex = t, this.$emit("update", a, t);
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
function Hb(a, t, e, n, r, l) {
  return i(), f("div", Y({ ref: "root" }, {
    class: a.$attrs.class,
    ...a.$attrs.style ? { style: a.$attrs.style } : {}
  }), [
    $(a.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      c("div", Ce(wt(l.rootProps)), [
        c("input", Y({ ref: "input" }, l.inputProps, {
          onInput: t[0] || (t[0] = (...s) => l.handleInput && l.handleInput(...s)),
          onKeydown: t[1] || (t[1] = (...s) => r.core.handleKeyDown && r.core.handleKeyDown(...s)),
          onFocus: t[2] || (t[2] = (...s) => r.core.handleFocus && r.core.handleFocus(...s)),
          onBlur: t[3] || (t[3] = (...s) => r.core.handleBlur && r.core.handleBlur(...s))
        }), null, 16),
        c("ul", Y({ ref: "resultList" }, l.resultListProps, br(l.resultListListeners, !0)), [
          (i(!0), f(z, null, Z(r.results, (s, o) => $(a.$slots, "result", {
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
  install: function(a, t) {
    a.use(tm), a.component("RouterLink", rv), a.component("DsfrFacets", Tv), a.component("DsfrSelectMultiple", Jv), a.component("DsfrMenu", Mv), a.component("DsfrMenuLink", $v), a.component("DsfrHeaderMenu", ug), a.component("DsfrCustomHeader", Vg), a.component("DsfrCustomHeaderMenuLinks", Yt), a.component("DsfrCustomDataTable", cb), a.component("DsfrCustomCheckbox", gb), a.component("DsfrCustomSelect", Tb), a.component("DsfrButtonTooltip", Pb), a.component("DsfrLinkTooltip", Mb), a.component("DsfrLink", Sb), a.component("autocomplete", Wb);
  },
  methods: tv,
  utils: av
};
window && (window.DSFR = Kb);
export {
  Kb as default
};
//# sourceMappingURL=dsfr.es.js.map
