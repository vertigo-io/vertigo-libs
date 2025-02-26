var ar = Object.defineProperty;
var nr = (a, t, e) => t in a ? ar(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var q = (a, t, e) => nr(a, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as O, h as fa, ref as W, computed as _, onMounted as ge, watch as de, onUnmounted as Ee, Comment as rr, cloneVNode as lr, openBlock as i, createElementBlock as f, normalizeClass as A, createElementVNode as d, withModifiers as te, createTextVNode as V, toDisplayString as v, unref as F, Fragment as Q, renderList as Z, createVNode as ae, withKeys as J, withCtx as U, createBlock as j, resolveDynamicComponent as be, mergeProps as K, createCommentVNode as b, useId as Yt, inject as Qe, toRef as st, renderSlot as B, provide as Re, resolveComponent as Ie, useCssVars as zt, nextTick as Ka, normalizeStyle as _e, normalizeProps as Te, mergeModels as Be, useModel as xe, withDirectives as Se, vModelCheckbox as ot, guardReactiveProps as wt, useAttrs as sr, useSlots as Gt, hasInjectionContext as or, useTemplateRef as ir, reactive as ur, Teleport as dr, vModelSelect as Xt, onBeforeUnmount as cr, Transition as fr, vShow as pr, toHandlers as mr } from "vue";
const Qa = /^[a-z0-9]+(-[a-z0-9]+)*$/, kt = (a, t, e, n = "") => {
  const r = a.split(":");
  if (a.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3)
      return null;
    n = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length)
    return null;
  if (r.length > 1) {
    const o = r.pop(), u = r.pop(), c = {
      // Allow provider without '@': "provider:prefix:name"
      provider: r.length > 0 ? r[0] : n,
      prefix: u,
      name: o
    };
    return t && !dt(c) ? null : c;
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
((t && a.prefix === "" || a.prefix) && a.name) : !1, Ya = Object.freeze(
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
}), _t = Object.freeze({
  ...Ya,
  ...pt
}), St = Object.freeze({
  ..._t,
  body: "",
  hidden: !1
});
function hr(a, t) {
  const e = {};
  !a.hFlip != !t.hFlip && (e.hFlip = !0), !a.vFlip != !t.vFlip && (e.vFlip = !0);
  const n = ((a.rotate || 0) + (t.rotate || 0)) % 4;
  return n && (e.rotate = n), e;
}
function pa(a, t) {
  const e = hr(a, t);
  for (const n in St)
    n in pt ? n in a && !(n in e) && (e[n] = pt[n]) : n in t ? e[n] = t[n] : n in a && (e[n] = a[n]);
  return e;
}
function vr(a, t) {
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
function gr(a, t, e) {
  const n = a.icons, r = a.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function s(o) {
    l = pa(
      n[o] || r[o],
      l
    );
  }
  return s(t), e.forEach(s), pa(a, l);
}
function za(a, t) {
  const e = [];
  if (typeof a != "object" || typeof a.icons != "object")
    return e;
  a.not_found instanceof Array && a.not_found.forEach((r) => {
    t(r, null), e.push(r);
  });
  const n = vr(a);
  for (const r in n) {
    const l = n[r];
    l && (t(r, gr(a, r, l)), e.push(r));
  }
  return e;
}
const br = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Ya
};
function Pt(a, t) {
  for (const e in t)
    if (e in a && typeof a[e] != typeof t[e])
      return !1;
  return !0;
}
function Ga(a) {
  if (typeof a != "object" || a === null)
    return null;
  const t = a;
  if (typeof t.prefix != "string" || !a.icons || typeof a.icons != "object" || !Pt(a, br))
    return null;
  const e = t.icons;
  for (const r in e) {
    const l = e[r];
    if (
      // Name cannot be empty
      !r || // Must have body
      typeof l.body != "string" || // Check other props
      !Pt(
        l,
        St
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
      !Pt(
        l,
        St
      )
    )
      return null;
  }
  return t;
}
const ma = /* @__PURE__ */ Object.create(null);
function yr(a, t) {
  return {
    provider: a,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function qe(a, t) {
  const e = ma[a] || (ma[a] = /* @__PURE__ */ Object.create(null));
  return e[t] || (e[t] = yr(a, t));
}
function Ut(a, t) {
  return Ga(t) ? za(t, (e, n) => {
    n ? a.icons[e] = n : a.missing.add(e);
  }) : [];
}
function wr(a, t, e) {
  try {
    if (typeof e.body == "string")
      return a.icons[t] = { ...e }, !0;
  } catch {
  }
  return !1;
}
let tt = !1;
function Xa(a) {
  return typeof a == "boolean" && (tt = a), tt;
}
function kr(a) {
  const t = typeof a == "string" ? kt(a, !0, tt) : a;
  if (t) {
    const e = qe(t.provider, t.prefix), n = t.name;
    return e.icons[n] || (e.missing.has(n) ? null : void 0);
  }
}
function _r(a, t) {
  const e = kt(a, !0, tt);
  if (!e)
    return !1;
  const n = qe(e.provider, e.prefix);
  return t ? wr(n, e.name, t) : (n.missing.add(e.name), !0);
}
function xr(a, t) {
  if (typeof a != "object")
    return !1;
  if (typeof t != "string" && (t = a.provider || ""), tt && !t && !a.prefix) {
    let r = !1;
    return Ga(a) && (a.prefix = "", za(a, (l, s) => {
      _r(l, s) && (r = !0);
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
  return !!Ut(n, a);
}
const Ua = Object.freeze({
  width: null,
  height: null
}), Za = Object.freeze({
  // Dimensions
  ...Ua,
  // Transformations
  ...pt
}), Ir = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Dr = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function ha(a, t, e) {
  if (t === 1)
    return a;
  if (e = e || 100, typeof a == "number")
    return Math.ceil(a * t * e) / e;
  if (typeof a != "string")
    return a;
  const n = a.split(Ir);
  if (n === null || !n.length)
    return a;
  const r = [];
  let l = n.shift(), s = Dr.test(l);
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
function Tr(a, t = "defs") {
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
function Cr(a, t) {
  return a ? "<defs>" + a + "</defs>" + t : t;
}
function Er(a, t, e) {
  const n = Tr(a);
  return Cr(n.defs, t + n.content + e);
}
const Pr = (a) => a === "unset" || a === "undefined" || a === "none";
function Lr(a, t) {
  const e = {
    ..._t,
    ...a
  }, n = {
    ...Za,
    ...t
  }, r = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  let l = e.body;
  [e, n].forEach((S) => {
    const w = [], x = S.hFlip, D = S.vFlip;
    let M = S.rotate;
    x ? D ? M += 2 : (w.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), w.push("scale(-1 1)"), r.top = r.left = 0) : D && (w.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), w.push("scale(1 -1)"), r.top = r.left = 0);
    let g;
    switch (M < 0 && (M -= Math.floor(M / 4) * 4), M = M % 4, M) {
      case 1:
        g = r.height / 2 + r.top, w.unshift(
          "rotate(90 " + g.toString() + " " + g.toString() + ")"
        );
        break;
      case 2:
        w.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        g = r.width / 2 + r.left, w.unshift(
          "rotate(-90 " + g.toString() + " " + g.toString() + ")"
        );
        break;
    }
    M % 2 === 1 && (r.left !== r.top && (g = r.left, r.left = r.top, r.top = g), r.width !== r.height && (g = r.width, r.width = r.height, r.height = g)), w.length && (l = Er(
      l,
      '<g transform="' + w.join(" ") + '">',
      "</g>"
    ));
  });
  const s = n.width, o = n.height, u = r.width, c = r.height;
  let p, m;
  s === null ? (m = o === null ? "1em" : o === "auto" ? c : o, p = ha(m, u / c)) : (p = s === "auto" ? u : s, m = o === null ? ha(p, c / u) : o === "auto" ? c : o);
  const h = {}, T = (S, w) => {
    Pr(w) || (h[S] = w.toString());
  };
  T("width", p), T("height", m);
  const k = [r.left, r.top, u, c];
  return h.viewBox = k.join(" "), {
    attributes: h,
    viewBox: k,
    body: l
  };
}
const Mr = /\sid="(\S+)"/g, Br = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Sr = 0;
function $r(a, t = Br) {
  const e = [];
  let n;
  for (; n = Mr.exec(a); )
    e.push(n[1]);
  if (!e.length)
    return a;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return e.forEach((l) => {
    const s = typeof t == "function" ? t(l) : t + (Sr++).toString(), o = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    a = a.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + o + ')([")]|\\.[a-z])', "g"),
      "$1" + s + r + "$3"
    );
  }), a = a.replace(new RegExp(r, "g"), ""), a;
}
const $t = /* @__PURE__ */ Object.create(null);
function Ar(a, t) {
  $t[a] = t;
}
function At(a) {
  return $t[a] || $t[""];
}
function Zt(a) {
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
const Jt = /* @__PURE__ */ Object.create(null), Ge = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ct = [];
for (; Ge.length > 0; )
  Ge.length === 1 || Math.random() > 0.5 ? ct.push(Ge.shift()) : ct.push(Ge.pop());
Jt[""] = Zt({
  resources: ["https://api.iconify.design"].concat(ct)
});
function Or(a, t) {
  const e = Zt(t);
  return e === null ? !1 : (Jt[a] = e, !0);
}
function ea(a) {
  return Jt[a];
}
const Rr = () => {
  let a;
  try {
    if (a = fetch, typeof a == "function")
      return a;
  } catch {
  }
};
let va = Rr();
function Fr(a, t) {
  const e = ea(a);
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
function Vr(a) {
  return a === 404;
}
const Nr = (a, t, e) => {
  const n = [], r = Fr(a, t), l = "icons";
  let s = {
    type: l,
    provider: a,
    prefix: t,
    icons: []
  }, o = 0;
  return e.forEach((u, c) => {
    o += u.length + 1, o >= r && c > 0 && (n.push(s), s = {
      type: l,
      provider: a,
      prefix: t,
      icons: []
    }, o = u.length), s.icons.push(u);
  }), n.push(s), n;
};
function qr(a) {
  if (typeof a == "string") {
    const t = ea(a);
    if (t)
      return t.path;
  }
  return "/";
}
const jr = (a, t, e) => {
  if (!va) {
    e("abort", 424);
    return;
  }
  let n = qr(t.provider);
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
  va(a + n).then((l) => {
    const s = l.status;
    if (s !== 200) {
      setTimeout(() => {
        e(Vr(s) ? "abort" : "next", s);
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
}, Hr = {
  prepare: Nr,
  send: jr
};
function Wr(a) {
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
    const l = r.provider, s = r.prefix, o = r.name, u = e[l] || (e[l] = /* @__PURE__ */ Object.create(null)), c = u[s] || (u[s] = qe(l, s));
    let p;
    o in c.icons ? p = t.loaded : s === "" || c.missing.has(o) ? p = t.missing : p = t.pending;
    const m = {
      provider: l,
      prefix: s,
      name: o
    };
    p.push(m);
  }), t;
}
function Ja(a, t) {
  a.forEach((e) => {
    const n = e.loaderCallbacks;
    n && (e.loaderCallbacks = n.filter((r) => r.id !== t));
  });
}
function Kr(a) {
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
        const c = u.name;
        if (a.icons[c])
          s.loaded.push({
            provider: n,
            prefix: r,
            name: c
          });
        else if (a.missing.has(c))
          s.missing.push({
            provider: n,
            prefix: r,
            name: c
          });
        else
          return e = !0, !0;
        return !1;
      }), s.pending.length !== o && (e || Ja([a], l.id), l.callback(
        s.loaded.slice(0),
        s.missing.slice(0),
        s.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let Qr = 0;
function Yr(a, t, e) {
  const n = Qr++, r = Ja.bind(null, e, n);
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
function zr(a, t = !0, e = !1) {
  const n = [];
  return a.forEach((r) => {
    const l = typeof r == "string" ? kt(r, t, e) : r;
    l && n.push(l);
  }), n;
}
var Gr = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Xr(a, t, e, n) {
  const r = a.resources.length, l = a.random ? Math.floor(Math.random() * r) : a.index;
  let s;
  if (a.random) {
    let E = a.resources.slice(0);
    for (s = []; E.length > 1; ) {
      const I = Math.floor(Math.random() * E.length);
      s.push(E[I]), E = E.slice(0, I).concat(E.slice(I + 1));
    }
    s = s.concat(E);
  } else
    s = a.resources.slice(l).concat(a.resources.slice(0, l));
  const o = Date.now();
  let u = "pending", c = 0, p, m = null, h = [], T = [];
  typeof n == "function" && T.push(n);
  function k() {
    m && (clearTimeout(m), m = null);
  }
  function S() {
    u === "pending" && (u = "aborted"), k(), h.forEach((E) => {
      E.status === "pending" && (E.status = "aborted");
    }), h = [];
  }
  function w(E, I) {
    I && (T = []), typeof E == "function" && T.push(E);
  }
  function x() {
    return {
      startTime: o,
      payload: t,
      status: u,
      queriesSent: c,
      queriesPending: h.length,
      subscribe: w,
      abort: S
    };
  }
  function D() {
    u = "failed", T.forEach((E) => {
      E(void 0, p);
    });
  }
  function M() {
    h.forEach((E) => {
      E.status === "pending" && (E.status = "aborted");
    }), h = [];
  }
  function g(E, I, N) {
    const P = I !== "success";
    switch (h = h.filter((Y) => Y !== E), u) {
      case "pending":
        break;
      case "failed":
        if (P || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (I === "abort") {
      p = N, D();
      return;
    }
    if (P) {
      p = N, h.length || (s.length ? C() : D());
      return;
    }
    if (k(), M(), !a.random) {
      const Y = a.resources.indexOf(E.resource);
      Y !== -1 && Y !== a.index && (a.index = Y);
    }
    u = "completed", T.forEach((Y) => {
      Y(N);
    });
  }
  function C() {
    if (u !== "pending")
      return;
    k();
    const E = s.shift();
    if (E === void 0) {
      if (h.length) {
        m = setTimeout(() => {
          k(), u === "pending" && (M(), D());
        }, a.timeout);
        return;
      }
      D();
      return;
    }
    const I = {
      status: "pending",
      resource: E,
      callback: (N, P) => {
        g(I, N, P);
      }
    };
    h.push(I), c++, m = setTimeout(C, a.rotate), e(E, t, I.callback);
  }
  return setTimeout(C), x;
}
function en(a) {
  const t = {
    ...Gr,
    ...a
  };
  let e = [];
  function n() {
    e = e.filter((o) => o().status === "pending");
  }
  function r(o, u, c) {
    const p = Xr(
      t,
      o,
      u,
      (m, h) => {
        n(), c && c(m, h);
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
function ga() {
}
const Lt = /* @__PURE__ */ Object.create(null);
function Ur(a) {
  if (!Lt[a]) {
    const t = ea(a);
    if (!t)
      return;
    const e = en(t), n = {
      config: t,
      redundancy: e
    };
    Lt[a] = n;
  }
  return Lt[a];
}
function Zr(a, t, e) {
  let n, r;
  if (typeof a == "string") {
    const l = At(a);
    if (!l)
      return e(void 0, 424), ga;
    r = l.send;
    const s = Ur(a);
    s && (n = s.redundancy);
  } else {
    const l = Zt(a);
    if (l) {
      n = en(l);
      const s = a.resources ? a.resources[0] : "", o = At(s);
      o && (r = o.send);
    }
  }
  return !n || !r ? (e(void 0, 424), ga) : n.query(t, r, e)().abort;
}
const ba = "iconify2", at = "iconify", tn = at + "-count", ya = at + "-version", an = 36e5, Jr = 168, el = 50;
function Ot(a, t) {
  try {
    return a.getItem(t);
  } catch {
  }
}
function ta(a, t, e) {
  try {
    return a.setItem(t, e), !0;
  } catch {
  }
}
function wa(a, t) {
  try {
    a.removeItem(t);
  } catch {
  }
}
function Rt(a, t) {
  return ta(a, tn, t.toString());
}
function Ft(a) {
  return parseInt(Ot(a, tn)) || 0;
}
const xt = {
  local: !0,
  session: !0
}, nn = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let aa = !1;
function tl(a) {
  aa = a;
}
let it = typeof window > "u" ? {} : window;
function rn(a) {
  const t = a + "Storage";
  try {
    if (it && it[t] && typeof it[t].length == "number")
      return it[t];
  } catch {
  }
  xt[a] = !1;
}
function ln(a, t) {
  const e = rn(a);
  if (!e)
    return;
  const n = Ot(e, ya);
  if (n !== ba) {
    if (n) {
      const o = Ft(e);
      for (let u = 0; u < o; u++)
        wa(e, at + u.toString());
    }
    ta(e, ya, ba), Rt(e, 0);
    return;
  }
  const r = Math.floor(Date.now() / an) - Jr, l = (o) => {
    const u = at + o.toString(), c = Ot(e, u);
    if (typeof c == "string") {
      try {
        const p = JSON.parse(c);
        if (typeof p == "object" && typeof p.cached == "number" && p.cached > r && typeof p.provider == "string" && typeof p.data == "object" && typeof p.data.prefix == "string" && // Valid item: run callback
        t(p, o))
          return !0;
      } catch {
      }
      wa(e, u);
    }
  };
  let s = Ft(e);
  for (let o = s - 1; o >= 0; o--)
    l(o) || (o === s - 1 ? (s--, Rt(e, s)) : nn[a].add(o));
}
function sn() {
  if (!aa) {
    tl(!0);
    for (const a in xt)
      ln(a, (t) => {
        const e = t.data, n = t.provider, r = e.prefix, l = qe(
          n,
          r
        );
        if (!Ut(l, e).length)
          return !1;
        const s = e.lastModified || -1;
        return l.lastModifiedCached = l.lastModifiedCached ? Math.min(l.lastModifiedCached, s) : s, !0;
      });
  }
}
function al(a, t) {
  const e = a.lastModifiedCached;
  if (
    // Matches or newer
    e && e >= t
  )
    return e === t;
  if (a.lastModifiedCached = t, e)
    for (const n in xt)
      ln(n, (r) => {
        const l = r.data;
        return r.provider !== a.provider || l.prefix !== a.prefix || l.lastModified === t;
      });
  return !0;
}
function nl(a, t) {
  aa || sn();
  function e(n) {
    let r;
    if (!xt[n] || !(r = rn(n)))
      return;
    const l = nn[n];
    let s;
    if (l.size)
      l.delete(s = Array.from(l).shift());
    else if (s = Ft(r), s >= el || !Rt(r, s + 1))
      return;
    const o = {
      cached: Math.floor(Date.now() / an),
      provider: a.provider,
      data: t
    };
    return ta(
      r,
      at + s.toString(),
      JSON.stringify(o)
    );
  }
  t.lastModified && !al(a, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), e("local") || e("session"));
}
function ka() {
}
function rl(a) {
  a.iconsLoaderFlag || (a.iconsLoaderFlag = !0, setTimeout(() => {
    a.iconsLoaderFlag = !1, Kr(a);
  }));
}
function ll(a) {
  const t = [], e = [];
  return a.forEach((n) => {
    (n.match(Qa) ? t : e).push(n);
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
      if (!Ut(a, e).length) {
        r();
        return;
      }
      n && nl(a, e);
    } catch (l) {
      console.error(l);
    }
  r(), rl(a);
}
function _a(a, t) {
  a instanceof Promise ? a.then((e) => {
    t(e);
  }).catch(() => {
    t(null);
  }) : t(a);
}
function sl(a, t) {
  a.iconsToLoad ? a.iconsToLoad = a.iconsToLoad.concat(t).sort() : a.iconsToLoad = t, a.iconsQueueFlag || (a.iconsQueueFlag = !0, setTimeout(() => {
    a.iconsQueueFlag = !1;
    const { provider: e, prefix: n } = a, r = a.iconsToLoad;
    if (delete a.iconsToLoad, !r || !r.length)
      return;
    const l = a.loadIcon;
    if (a.loadIcons && (r.length > 1 || !l)) {
      _a(
        a.loadIcons(r, n, e),
        (p) => {
          Xe(a, r, p, !1);
        }
      );
      return;
    }
    if (l) {
      r.forEach((p) => {
        const m = l(p, n, e);
        _a(m, (h) => {
          const T = h ? {
            prefix: n,
            icons: {
              [p]: h
            }
          } : null;
          Xe(a, [p], T, !1);
        });
      });
      return;
    }
    const { valid: s, invalid: o } = ll(r);
    if (o.length && Xe(a, o, null, !1), !s.length)
      return;
    const u = n.match(Qa) ? At(e) : null;
    if (!u) {
      Xe(a, s, null, !1);
      return;
    }
    u.prepare(e, n, s).forEach((p) => {
      Zr(e, p, (m) => {
        Xe(a, p.icons, m, !0);
      });
    });
  }));
}
const ol = (a, t) => {
  const e = zr(a, !0, Xa()), n = Wr(e);
  if (!n.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        n.loaded,
        n.missing,
        n.pending,
        ka
      );
    }), () => {
      u = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), l = [];
  let s, o;
  return n.pending.forEach((u) => {
    const { provider: c, prefix: p } = u;
    if (p === o && c === s)
      return;
    s = c, o = p, l.push(qe(c, p));
    const m = r[c] || (r[c] = /* @__PURE__ */ Object.create(null));
    m[p] || (m[p] = []);
  }), n.pending.forEach((u) => {
    const { provider: c, prefix: p, name: m } = u, h = qe(c, p), T = h.pendingIcons || (h.pendingIcons = /* @__PURE__ */ new Set());
    T.has(m) || (T.add(m), r[c][p].push(m));
  }), l.forEach((u) => {
    const c = r[u.provider][u.prefix];
    c.length && sl(u, c);
  }), t ? Yr(t, n, l) : ka;
};
function il(a, t) {
  const e = {
    ...a
  };
  for (const n in t) {
    const r = t[n], l = typeof r;
    n in Ua ? (r === null || r && (l === "string" || l === "number")) && (e[n] = r) : l === typeof e[n] && (e[n] = n === "rotate" ? r % 4 : r);
  }
  return e;
}
const ul = /[\s,]+/;
function dl(a, t) {
  t.split(ul).forEach((e) => {
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
function cl(a, t = 0) {
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
function fl(a, t) {
  let e = a.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in t)
    e += " " + n + '="' + t[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + a + "</svg>";
}
function pl(a) {
  return a.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function ml(a) {
  return "data:image/svg+xml," + pl(a);
}
function hl(a) {
  return 'url("' + ml(a) + '")';
}
const xa = {
  ...Za,
  inline: !1
}, vl = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, gl = {
  display: "inline-block"
}, Vt = {
  backgroundColor: "currentColor"
}, on = {
  backgroundColor: "transparent"
}, Ia = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Da = {
  webkitMask: Vt,
  mask: Vt,
  background: on
};
for (const a in Da) {
  const t = Da[a];
  for (const e in Ia)
    t[a + e] = Ia[e];
}
const ft = {};
["horizontal", "vertical"].forEach((a) => {
  const t = a.slice(0, 1) + "Flip";
  ft[a + "-flip"] = t, ft[a.slice(0, 1) + "-flip"] = t, ft[a + "Flip"] = t;
});
function Ta(a) {
  return a + (a.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ca = (a, t) => {
  const e = il(xa, t), n = { ...vl }, r = t.mode || "svg", l = {}, s = t.style, o = typeof s == "object" && !(s instanceof Array) ? s : {};
  for (let S in t) {
    const w = t[S];
    if (w !== void 0)
      switch (S) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          e[S] = w === !0 || w === "true" || w === 1;
          break;
        case "flip":
          typeof w == "string" && dl(e, w);
          break;
        case "color":
          l.color = w;
          break;
        case "rotate":
          typeof w == "string" ? e[S] = cl(w) : typeof w == "number" && (e[S] = w);
          break;
        case "ariaHidden":
        case "aria-hidden":
          w !== !0 && w !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const x = ft[S];
          x ? (w === !0 || w === "true" || w === 1) && (e[x] = !0) : xa[S] === void 0 && (n[S] = w);
        }
      }
  }
  const u = Lr(a, e), c = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...o
    }, Object.assign(n, c);
    let S = 0, w = t.id;
    return typeof w == "string" && (w = w.replace(/-/g, "_")), n.innerHTML = $r(u.body, w ? () => w + "ID" + S++ : "iconifyVue"), fa("svg", n);
  }
  const { body: p, width: m, height: h } = a, T = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), k = fl(p, {
    ...c,
    width: m + "",
    height: h + ""
  });
  return n.style = {
    ...l,
    "--svg": hl(k),
    width: Ta(c.width),
    height: Ta(c.height),
    ...gl,
    ...T ? Vt : on,
    ...o
  }, fa("span", n);
};
Xa(!0);
Ar("", Hr);
if (typeof document < "u" && typeof window < "u") {
  sn();
  const a = window;
  if (a.IconifyPreload !== void 0) {
    const t = a.IconifyPreload, e = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((n) => {
      try {
        // Check if item is an object and not null/array
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !xr(n)) && console.error(e);
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
          Or(e, r) || console.error(n);
        } catch {
          console.error(n);
        }
      }
  }
}
const bl = {
  ..._t,
  body: ""
}, yl = O({
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
      if (typeof a != "string" || (n = kt(a, !1, !0)) === null)
        return this.abortLoading(), null;
      let r = kr(n);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== a) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: a,
          abort: ol([n], () => {
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
      return Ca(bl, a);
    let e = a;
    return t.classes && (e = {
      ...a,
      class: (typeof a.class == "string" ? a.class + " " : "") + t.classes.join(" ")
    }), Ca({
      ..._t,
      ...t.data
    }, e);
  }
}), na = Symbol("accordions"), ra = Symbol("header"), It = Symbol("tabs"), $e = () => {
  const a = W(), t = W(!1), e = W(!1), n = () => {
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
}, re = (a = "", t = "") => (a ? `${a}-` : "") + Yt() + (t ? `-${t}` : ""), wl = { class: "fr-accordion" }, kl = ["aria-expanded", "aria-controls"], _l = ["id"], xl = /* @__PURE__ */ O({
  __name: "DsfrAccordion",
  props: {
    id: { default: () => re("accordion") },
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
    } = $e(), o = W(), u = Qe(na), { isActive: c, expand: p } = (u == null ? void 0 : u(st(() => t.title))) ?? { isActive: o, expand: () => o.value = !o.value };
    return ge(() => {
      c.value && l(!0);
    }), de(c, (m, h) => {
      m !== h && l(m);
    }), (m, h) => (i(), f("section", wl, [
      (i(), j(be(m.titleTag), { class: "fr-accordion__title" }, {
        default: U(() => [
          d("button", {
            class: "fr-accordion__btn",
            "aria-expanded": F(c),
            "aria-controls": m.id,
            type: "button",
            onClick: h[0] || (h[0] = (T) => F(p)())
          }, [
            B(m.$slots, "title", {}, () => [
              V(v(m.title), 1)
            ])
          ], 8, kl)
        ]),
        _: 3
      })),
      d("div", {
        id: m.id,
        ref_key: "collapse",
        ref: e,
        class: A(["fr-collapse", {
          "fr-collapse--expanded": F(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": F(n)
        }]),
        onTransitionend: h[1] || (h[1] = (T) => F(s)(F(c), !1))
      }, [
        B(m.$slots, "default")
      ], 42, _l)
    ]));
  }
}), Il = { class: "fr-accordions-group" }, Dl = /* @__PURE__ */ O({
  __name: "DsfrAccordionsGroup",
  props: {
    modelValue: { default: -1 }
  },
  emits: ["update:modelValue"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = _({
      get: () => e.modelValue,
      set(o) {
        n("update:modelValue", o);
      }
    }), l = W(/* @__PURE__ */ new Map()), s = W(0);
    return Re(na, (o) => {
      const u = s.value++;
      l.value.set(u, o.value);
      const c = _(() => u === r.value);
      de(o, () => {
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
      }), { isActive: c, expand: p };
    }), (o, u) => (i(), f("div", Il, [
      B(o.$slots, "default")
    ]));
  }
}), Tl = ["id", "role"], Cl = ["title", "aria-label"], El = /* @__PURE__ */ O({
  __name: "DsfrAlert",
  props: {
    alert: { type: Boolean },
    closed: { type: Boolean },
    closeable: { type: Boolean },
    id: { default: () => re("basic", "alert") },
    title: { default: "" },
    description: {},
    small: { type: Boolean },
    titleTag: { default: "h3" },
    type: { default: "info" },
    closeButtonLabel: { default: "Fermer" }
  },
  emits: ["close"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = () => n("close"), l = _(
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
      class: A(["fr-alert", l.value]),
      role: s.alert ? "alert" : void 0
    }, [
      s.small ? b("", !0) : (i(), j(be(s.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: U(() => [
          V(v(s.title), 1)
        ]),
        _: 1
      })),
      B(s.$slots, "default", {}, () => [
        V(v(s.description), 1)
      ]),
      s.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: s.closeButtonLabel,
        "aria-label": s.closeButtonLabel,
        onClick: r
      }, null, 8, Cl)) : b("", !0)
    ], 10, Tl));
  }
}), Pl = /* @__PURE__ */ O({
  __name: "DsfrBackToTop",
  props: {
    label: { default: "Haut de page" },
    position: { default: "right" }
  },
  setup(a) {
    return (t, e) => (i(), f("a", {
      class: A(["fr-link fr-icon-arrow-up-fill", `fr-link--icon-${t.position}`]),
      href: "#top"
    }, v(t.label), 3));
  }
}), Ll = ["title"], un = /* @__PURE__ */ O({
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
      class: A(["fr-badge", {
        [`fr-badge--${t.type}`]: t.type,
        "fr-badge--no-icon": t.noIcon,
        "fr-badge--sm": t.small
      }]),
      title: t.ellipsis ? t.label : void 0
    }, [
      d("span", {
        class: A(t.ellipsis ? "fr-ellipsis" : "")
      }, v(t.label), 3)
    ], 10, Ll));
  }
}), Ml = ["aria-label"], Bl = ["aria-expanded", "aria-controls"], Sl = ["id"], $l = { class: "fr-breadcrumb__list" }, Al = ["aria-current"], Ol = /* @__PURE__ */ O({
  __name: "DsfrBreadcrumb",
  props: {
    breadcrumbId: { default: () => re("breadcrumb") },
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
    } = $e(), s = W(!1);
    return de(s, (o, u) => {
      o !== u && r(o);
    }), (o, u) => {
      const c = Ie("RouterLink");
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
        }, v(o.showBreadcrumbLabel), 9, Bl)),
        d("div", {
          id: o.breadcrumbId,
          ref_key: "collapse",
          ref: t,
          class: A(["fr-collapse", {
            "fr-collapse--expanded": F(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => F(l)(s.value))
        }, [
          d("ol", $l, [
            (i(!0), f(Q, null, Z(o.links, (p, m) => (i(), f("li", {
              key: m,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), j(c, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": m === o.links.length - 1 ? "page" : void 0
              }, {
                default: U(() => [
                  V(v(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : b("", !0),
              p.to ? b("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": m === o.links.length - 1 ? "page" : void 0
              }, v(p.text), 9, Al))
            ]))), 128))
          ])
        ], 42, Sl)
      ], 8, Ml);
    };
  }
}), Rl = /* @__PURE__ */ O({
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
    zt((u) => ({
      "177d0d84": o.value
    }));
    const t = a, e = W(null), n = _(() => `${+t.scale * 1.2}rem`), r = _(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    de(() => t.title, l);
    async function l() {
      var u, c, p, m;
      if (!((u = e.value) != null && u.$el))
        return;
      const h = !!((c = e.value) == null ? void 0 : c.$el).querySelector("title"), T = document.createElement("title");
      if (!t.title) {
        T.remove();
        return;
      }
      T.innerHTML = t.title, await Ka(), h || (m = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || m.before(T);
    }
    ge(l);
    const s = _(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), o = _(() => t.color ?? t.fill ?? "inherit");
    return (u, c) => (i(), j(F(yl), {
      ref_key: "icon",
      ref: e,
      icon: s.value,
      style: _e({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
      "aria-label": u.label,
      class: A(["vicon", {
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
}), ke = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, ye = /* @__PURE__ */ ke(Rl, [["__scopeId", "data-v-73a1cd7e"]]), Fl = ["title", "disabled", "aria-disabled"], Vl = { key: 1 }, Nl = /* @__PURE__ */ O({
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
    const e = a, n = _(() => ["sm", "small"].includes(e.size)), r = _(() => ["md", "medium"].includes(e.size)), l = _(() => ["lg", "large"].includes(e.size)), s = W(null);
    t({ focus: () => {
      var p;
      (p = s.value) == null || p.focus();
    } });
    const o = _(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = _(() => e.iconOnly ? 1.25 : 0.8325), c = _(
      () => typeof e.icon == "string" ? { scale: u.value, name: e.icon } : { scale: u.value, ...e.icon }
    );
    return (p, m) => (i(), f("button", {
      ref_key: "btn",
      ref: s,
      class: A(["fr-btn", {
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
      style: _e(!o.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: m[0] || (m[0] = (h) => p.onClick ? p.onClick(h) : () => {
      })
    }, [
      p.icon && !o.value ? (i(), j(ye, Te(K({ key: 0 }, c.value)), null, 16)) : b("", !0),
      p.iconOnly ? b("", !0) : (i(), f("span", Vl, [
        V(v(p.label) + " ", 1),
        B(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Fl));
  }
}), je = /* @__PURE__ */ ke(Nl, [["__scopeId", "data-v-118397f5"]]), Dt = /* @__PURE__ */ O({
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
    const t = a, e = W(null), n = _(() => ["sm", "small"].includes(t.size)), r = _(() => ["md", "medium"].includes(t.size)), l = _(() => ["lg", "large"].includes(t.size)), s = _(() => ["always", "", !0].includes(t.inlineLayoutWhen)), o = _(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = _(() => ["md", "medium"].includes(t.inlineLayoutWhen)), c = _(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = _(() => t.align === "center"), m = _(() => t.align === "right"), h = W("auto"), T = _(() => `--equisized-width: ${h.value};`), k = async () => {
      var S;
      let w = 0;
      await new Promise((x) => setTimeout(x, 100)), (S = e.value) == null || S.querySelectorAll(".fr-btn").forEach((x) => {
        const D = x, M = D.offsetWidth, g = window.getComputedStyle(D), C = +g.marginLeft.replace("px", ""), E = +g.marginRight.replace("px", "");
        D.style.width = "var(--equisized-width)";
        const I = M + C + E;
        I > w && (w = I);
      }), h.value = `${w}px`;
    };
    return ge(async () => {
      !e.value || !t.equisized || await k();
    }), (S, w) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: _e(T.value),
      class: A(["fr-btns-group", {
        "fr-btns-group--equisized": S.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": s.value || o.value,
        "fr-btns-group--inline-md": s.value || u.value,
        "fr-btns-group--inline-lg": s.value || c.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": m.value,
        "fr-btns-group--icon-right": S.iconRight,
        "fr-btns-group--inline-reverse": S.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(Q, null, Z(S.buttons, ({ onClick: x, ...D }, M) => (i(), f("li", { key: M }, [
        ae(je, K({ ref_for: !0 }, D, { onClick: x }), null, 16, ["onClick"])
      ]))), 128)),
      B(S.$slots, "default")
    ], 6));
  }
}), ql = {
  key: 2,
  class: "fr-callout__text"
}, jl = {
  key: 4,
  class: "fr-callout__text"
}, Hl = /* @__PURE__ */ O({
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
    const t = a, e = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), n = _(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : { ...t.icon ?? {} });
    return (r, l) => (i(), f("div", {
      class: A(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && n.value ? (i(), j(ye, Te(K({ key: 0 }, n.value)), null, 16)) : b("", !0),
      r.title ? (i(), j(be(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: U(() => [
          V(v(r.title), 1)
        ]),
        _: 1
      })) : b("", !0),
      r.content ? (i(), f("p", ql, v(r.content), 1)) : b("", !0),
      r.button ? (i(), j(je, Te(K({ key: 3 }, r.button)), null, 16)) : b("", !0),
      r.$slots.default && !r.content ? (i(), f("div", jl, [
        B(r.$slots, "default", {}, void 0, !0)
      ])) : B(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), Wl = /* @__PURE__ */ ke(Hl, [["__scopeId", "data-v-c59b3cec"]]), Nt = /* @__PURE__ */ O({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const t = a, e = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = _(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: A(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), j(ye, Te(K({ key: 0 }, n.value)), null, 16)) : b("", !0),
      B(r.$slots, "default")
    ], 2));
  }
}), Kl = { class: "fr-card__body" }, Ql = { class: "fr-card__content" }, Yl = ["href"], zl = { class: "fr-card__desc" }, Gl = {
  key: 0,
  class: "fr-card__start"
}, Xl = {
  key: 1,
  class: "fr-card__end"
}, Ul = {
  key: 0,
  class: "fr-card__footer"
}, Zl = {
  key: 1,
  class: "fr-links-group"
}, Jl = ["href"], es = {
  key: 0,
  class: "fr-card__header"
}, ts = {
  key: 0,
  class: "fr-card__img"
}, as = ["src", "alt"], ns = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, rs = /* @__PURE__ */ O({
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
    const e = a, n = _(() => ["sm", "small"].includes(e.size)), r = _(() => ["lg", "large"].includes(e.size)), l = _(() => ["sm", "small"].includes(e.imgRatio)), s = _(() => ["lg", "large"].includes(e.imgRatio)), o = _(() => typeof e.link == "string" && e.link.startsWith("http")), u = W(null);
    return t({ goToTargetLink: () => {
      var c;
      ((c = u.value) == null ? void 0 : c.querySelector(".fr-card__link")).click();
    } }), (c, p) => {
      const m = Ie("RouterLink");
      return i(), f("div", {
        class: A(["fr-card", {
          "fr-card--horizontal": c.horizontal,
          "fr-enlarge-link": !c.noArrow,
          "fr-card--sm": n.value,
          "fr-card--lg": r.value,
          "fr-card--horizontal-tier": l.value,
          "fr-card--horizontal-half": s.value,
          "fr-card--download": c.download,
          "fr-enlarge-button": c.enlarge
        }]),
        "data-testid": "fr-card"
      }, [
        d("div", Kl, [
          d("div", Ql, [
            (i(), j(be(c.titleTag), { class: "fr-card__title" }, {
              default: U(() => [
                o.value ? (i(), f("a", {
                  key: 0,
                  href: c.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, v(c.title), 9, Yl)) : c.link ? (i(), j(m, {
                  key: 1,
                  to: c.link,
                  class: "fr-card__link",
                  "data-testid": "card-link",
                  onClick: p[0] || (p[0] = (h) => h.stopPropagation())
                }, {
                  default: U(() => [
                    V(v(c.title), 1)
                  ]),
                  _: 1
                }, 8, ["to"])) : (i(), f(Q, { key: 2 }, [
                  V(v(c.title), 1)
                ], 64))
              ]),
              _: 1
            })),
            d("p", zl, v(c.description), 1),
            c.$slots["start-details"] || c.detail ? (i(), f("div", Gl, [
              B(c.$slots, "start-details"),
              c.detail ? (i(), j(Nt, {
                key: 0,
                icon: c.detailIcon
              }, {
                default: U(() => [
                  V(v(c.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0),
            c.$slots["end-details"] || c.endDetail ? (i(), f("div", Xl, [
              B(c.$slots, "end-details"),
              c.endDetail ? (i(), j(Nt, {
                key: 0,
                icon: c.endDetailIcon
              }, {
                default: U(() => [
                  V(v(c.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : b("", !0)
            ])) : b("", !0)
          ]),
          c.buttons.length || c.linksGroup.length ? (i(), f("div", Ul, [
            c.buttons.length ? (i(), j(Dt, {
              key: 0,
              buttons: c.buttons,
              "inline-layout-when": "always",
              size: c.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : b("", !0),
            c.linksGroup.length ? (i(), f("ul", Zl, [
              (i(!0), f(Q, null, Z(c.linksGroup, (h, T) => (i(), f("li", {
                key: `card-link-${T}`
              }, [
                h.to ? (i(), j(m, {
                  key: 0,
                  to: h.to
                }, {
                  default: U(() => [
                    V(v(h.label), 1)
                  ]),
                  _: 2
                }, 1032, ["to"])) : (i(), f("a", {
                  key: 1,
                  href: h.link || h.href,
                  class: A(["fr-link fr-icon-arrow-right-line fr-link--icon-right", {
                    "fr-link--sm": n.value,
                    "fr-link--lg": r.value
                  }])
                }, v(h.label), 11, Jl))
              ]))), 128))
            ])) : b("", !0)
          ])) : b("", !0)
        ]),
        c.imgSrc || c.badges.length ? (i(), f("div", es, [
          c.imgSrc ? (i(), f("div", ts, [
            d("img", {
              src: c.imgSrc,
              class: "fr-responsive-img",
              alt: c.altImg,
              "data-testid": "card-img"
            }, null, 8, as)
          ])) : b("", !0),
          c.badges.length ? (i(), f("ul", ns, [
            (i(!0), f(Q, null, Z(c.badges, (h, T) => (i(), f("li", { key: T }, [
              ae(un, K({ ref_for: !0 }, h), null, 16)
            ]))), 128))
          ])) : b("", !0)
        ])) : b("", !0)
      ], 2);
    };
  }
}), ls = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex"], ss = ["for"], os = {
  key: 0,
  class: "required"
}, is = {
  key: 0,
  class: "fr-hint-text"
}, us = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, ds = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrCheckbox",
  props: /* @__PURE__ */ Be({
    id: { default: () => re("basic", "checkbox") },
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
    zt((l) => ({
      "5f542ece": l.readonlyOpacity
    }));
    const t = a, e = _(() => t.errorMessage || t.validMessage), n = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = xe(a, "modelValue");
    return (l, s) => (i(), f("div", {
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline, readonly: l.readonly }])
    }, [
      d("div", {
        class: A(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Se(d("input", K({
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
        }), null, 16, ls), [
          [ot, r.value]
        ]),
        d("label", {
          for: l.id,
          class: "fr-label"
        }, [
          B(l.$slots, "label", {}, () => [
            V(v(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", os, " *")) : b("", !0)
            ], !0)
          ], !0),
          l.hint ? (i(), f("span", is, v(l.hint), 1)) : b("", !0)
        ], 8, ss),
        e.value ? (i(), f("div", us, [
          d("p", {
            class: A(["fr-message--info flex items-center", n.value])
          }, v(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), Tt = /* @__PURE__ */ ke(ds, [["__scopeId", "data-v-18fa6c7b"]]), cs = { class: "fr-form-group" }, fs = ["disabled", "aria-labelledby", "aria-invalid", "role"], ps = ["id"], ms = {
  key: 0,
  class: "required"
}, hs = ["id"], vs = /* @__PURE__ */ O({
  __name: "DsfrCheckboxSet",
  props: /* @__PURE__ */ Be({
    titleId: { default: () => re("checkbox", "set") },
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
    const t = a, e = _(() => t.errorMessage || t.validMessage), n = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _(() => e.value ? `${t.titleId} messages-${t.titleId}` : t.titleId), l = xe(a, "modelValue");
    return (s, o) => (i(), f("div", cs, [
      d("fieldset", {
        class: A(["fr-fieldset", {
          "fr-fieldset--error": s.errorMessage,
          "fr-fieldset--valid": !s.errorMessage && s.validMessage
        }]),
        disabled: s.disabled,
        "aria-labelledby": r.value,
        "aria-invalid": s.ariaInvalid,
        role: s.errorMessage || s.validMessage ? "group" : void 0
      }, [
        d("legend", {
          id: s.titleId,
          class: "fr-fieldset__legend fr-text--regular"
        }, [
          B(s.$slots, "legend", {}, () => [
            V(v(s.legend) + " ", 1),
            B(s.$slots, "required-tip", {}, () => [
              s.required ? (i(), f("span", ms, " *")) : b("", !0)
            ])
          ])
        ], 8, ps),
        B(s.$slots, "default", {}, () => [
          (i(!0), f(Q, null, Z(s.options, (u) => (i(), j(Tt, {
            id: u.id,
            key: u.id || u.name,
            modelValue: l.value,
            "onUpdate:modelValue": o[0] || (o[0] = (c) => l.value = c),
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
          d("p", {
            class: A(["fr-message--info flex items-center", n.value])
          }, [
            d("span", null, v(e.value), 1)
          ], 2)
        ], 8, hs)) : b("", !0)
      ], 10, fs)
    ]));
  }
}), gs = { class: "fr-consent-banner__content" }, bs = { class: "fr-text--sm" }, ys = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, ws = /* @__PURE__ */ O({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(a) {
    const t = a, e = _(() => typeof t.url == "string" && t.url.startsWith("http")), n = _(() => t.url ? e.value ? "a" : "RouterLink" : "a"), r = _(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, s) => (i(), f(Q, null, [
      d("div", gs, [
        d("p", bs, [
          B(l.$slots, "default", {}, () => [
            s[4] || (s[4] = V(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), j(be(n.value), K(r.value, { "data-testid": "link" }), {
              default: U(() => s[3] || (s[3] = [
                V(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            s[5] || (s[5] = V(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      d("ul", ys, [
        d("li", null, [
          d("button", {
            class: "fr-btn",
            title: "Autoriser tous les cookies",
            onClick: s[0] || (s[0] = te((o) => l.$emit("acceptAll"), ["stop"]))
          }, " Tout accepter ")
        ]),
        d("li", null, [
          d("button", {
            class: "fr-btn",
            title: "Refuser tous les cookies",
            onClick: s[1] || (s[1] = te((o) => l.$emit("refuseAll"), ["stop"]))
          }, " Tout refuser ")
        ]),
        d("li", null, [
          d("button", {
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
}), ks = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, _s = { class: "fr-pagination__list" }, xs = ["href", "title", "disabled", "aria-disabled"], Is = ["href", "title", "disabled", "aria-disabled"], Ds = ["href", "title", "aria-current", "onClick"], Ts = { key: 0 }, Cs = { key: 1 }, Es = ["href", "title", "disabled", "aria-disabled"], Ps = ["href", "title", "disabled", "aria-disabled"], Ls = /* @__PURE__ */ O({
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
    const e = a, n = t, r = _(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = _(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), s = _(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), o = (k) => n("update:current-page", k), u = (k) => o(k), c = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), m = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), h = () => u(e.pages.length - 1), T = (k) => e.pages.indexOf(k) === e.currentPage;
    return (k, S) => {
      var w, x, D, M;
      return i(), f("nav", ks, [
        d("ul", _s, [
          d("li", null, [
            d("a", {
              href: (w = k.pages[0]) == null ? void 0 : w.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: k.firstPageTitle,
              disabled: k.currentPage === 0 ? !0 : void 0,
              "aria-disabled": k.currentPage === 0 ? !0 : void 0,
              onClick: S[0] || (S[0] = te((g) => c(), ["prevent"]))
            }, null, 8, xs)
          ]),
          d("li", null, [
            d("a", {
              href: (x = k.pages[Math.max(k.currentPage - 1, 0)]) == null ? void 0 : x.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: k.prevPageTitle,
              disabled: k.currentPage === 0 ? !0 : void 0,
              "aria-disabled": k.currentPage === 0 ? !0 : void 0,
              onClick: S[1] || (S[1] = te((g) => p(), ["prevent"]))
            }, v(k.prevPageTitle), 9, Is)
          ]),
          (i(!0), f(Q, null, Z(s.value, (g, C) => (i(), f("li", { key: C }, [
            d("a", {
              href: g == null ? void 0 : g.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: g.title,
              "aria-current": T(g) ? "page" : void 0,
              onClick: te((E) => u(k.pages.indexOf(g)), ["prevent"])
            }, [
              s.value.indexOf(g) === 0 && r.value > 0 ? (i(), f("span", Ts, "...")) : b("", !0),
              V(" " + v(g.label) + " ", 1),
              s.value.indexOf(g) === s.value.length - 1 && l.value < k.pages.length - 1 ? (i(), f("span", Cs, "...")) : b("", !0)
            ], 8, Ds)
          ]))), 128)),
          d("li", null, [
            d("a", {
              href: (D = k.pages[Math.min(k.currentPage + 1, k.pages.length - 1)]) == null ? void 0 : D.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: k.nextPageTitle,
              disabled: k.currentPage === k.pages.length - 1 ? !0 : void 0,
              "aria-disabled": k.currentPage === k.pages.length - 1 ? !0 : void 0,
              onClick: S[2] || (S[2] = te((g) => m(), ["prevent"]))
            }, v(k.nextPageTitle), 9, Es)
          ]),
          d("li", null, [
            d("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (M = k.pages.at(-1)) == null ? void 0 : M.href,
              title: k.lastPageTitle,
              disabled: k.currentPage === k.pages.length - 1 ? !0 : void 0,
              "aria-disabled": k.currentPage === k.pages.length - 1 ? !0 : void 0,
              onClick: S[3] || (S[3] = te((g) => h(), ["prevent"]))
            }, null, 8, Ps)
          ])
        ])
      ]);
    };
  }
}), la = /* @__PURE__ */ ke(Ls, [["__scopeId", "data-v-4dfa8248"]]), Ms = { class: "fr-table" }, Bs = { class: "fr-table__wrapper" }, Ss = { class: "fr-table__container" }, $s = { class: "fr-table__content" }, As = ["id"], Os = { key: 0 }, Rs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Fs = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Vs = ["id", "checked"], Ns = ["for"], qs = ["tabindex", "onClick", "onKeydown"], js = { key: 0 }, Hs = { key: 1 }, Ws = ["data-row-key"], Ks = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Qs = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ys = ["id", "value"], zs = ["for"], Gs = ["onKeydown"], Xs = { class: "flex gap-2 items-center" }, Us = ["selected"], Zs = ["value", "selected"], Js = { class: "flex ml-1" }, eo = { class: "self-center" }, to = /* @__PURE__ */ O({
  __name: "DsfrDataTable",
  props: /* @__PURE__ */ Be({
    id: { default: () => re("table") },
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = xe(a, "selection"), l = xe(a, "rowsPerPage"), s = xe(a, "currentPage"), o = _(() => Math.ceil(e.rows.length / l.value)), u = _(() => e.pages ?? Array.from({ length: o.value }).map((C, E) => ({ label: `${E + 1}`, title: `Page ${E + 1}`, href: `#${E + 1}` }))), c = _(() => s.value * l.value), p = _(() => (s.value + 1) * l.value), m = xe(a, "sortedBy"), h = xe(a, "sortedDesc");
    function T(C, E) {
      const I = m.value ?? e.sorted;
      return (C[I] ?? C) < (E[I] ?? E) ? -1 : (C[I] ?? C) > (E[I] ?? E) ? 1 : 0;
    }
    function k(C) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(C))) {
        if (m.value === C) {
          if (h.value) {
            m.value = void 0, h.value = !1;
            return;
          }
          h.value = !0;
          return;
        }
        h.value = !1, m.value = C;
      }
    }
    const S = _(() => {
      const C = m.value ? e.rows.slice().sort(e.sortFn ?? T) : e.rows.slice();
      return h.value && C.reverse(), C;
    }), w = _(() => {
      const C = e.headersRow.map((I) => typeof I != "object" ? I : I.key), E = S.value.map((I) => Array.isArray(I) ? I : C.map((N) => typeof I != "object" ? I : I[N] ?? I));
      return e.pagination ? E.slice(c.value, p.value) : E;
    });
    function x(C) {
      if (C) {
        const E = e.headersRow.findIndex((I) => I.key ?? I);
        r.value = w.value.map((I) => I[E]);
      } else
        r.value.length = 0;
    }
    const D = _(() => r.value.length === w.value.length);
    function M() {
      n("update:current-page", 0), r.value.length = 0;
    }
    function g(C) {
      navigator.clipboard.writeText(C);
    }
    return (C, E) => (i(), f("div", Ms, [
      d("div", Bs, [
        d("div", Ss, [
          d("div", $s, [
            d("table", { id: C.id }, [
              C.noCaption ? b("", !0) : (i(), f("caption", Os, v(C.title), 1)),
              d("thead", null, [
                d("tr", null, [
                  C.selectableRows ? (i(), f("th", Rs, [
                    d("div", Fs, [
                      d("input", {
                        id: `table-select--${C.id}-all`,
                        checked: D.value,
                        type: "checkbox",
                        onInput: E[0] || (E[0] = (I) => x(I.target.checked))
                      }, null, 40, Vs),
                      d("label", {
                        class: "fr-label",
                        for: `table-select--${C.id}-all`
                      }, " Sélectionner tout ", 8, Ns)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(Q, null, Z(C.headersRow, (I, N) => (i(), f("th", K({
                    key: typeof I == "object" ? I.key : I,
                    scope: "col",
                    ref_for: !0
                  }, typeof I == "object" && I.headerAttrs, {
                    tabindex: C.sortableRows ? 0 : void 0,
                    onClick: (P) => k(I.key ?? (Array.isArray(C.rows[0]) ? N : I)),
                    onKeydown: [
                      J((P) => k(I.key ?? I), ["enter"]),
                      J((P) => k(I.key ?? I), ["space"])
                    ]
                  }), [
                    d("div", {
                      class: A({ "sortable-header": C.sortableRows === !0 || Array.isArray(C.sortableRows) && C.sortableRows.includes(I.key ?? I) })
                    }, [
                      B(C.$slots, "header", K({ ref_for: !0 }, typeof I == "object" ? I : { key: I, label: I }), () => [
                        V(v(typeof I == "object" ? I.label : I), 1)
                      ], !0),
                      m.value !== (I.key ?? I) && (C.sortableRows === !0 || Array.isArray(C.sortableRows) && C.sortableRows.includes(I.key ?? I)) ? (i(), f("span", js, [
                        ae(ye, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : m.value === (I.key ?? I) ? (i(), f("span", Hs, [
                        ae(ye, {
                          name: h.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, qs))), 128))
                ])
              ]),
              d("tbody", null, [
                (i(!0), f(Q, null, Z(w.value, (I, N) => (i(), f("tr", {
                  key: `row-${N}`,
                  "data-row-key": N + 1
                }, [
                  C.selectableRows ? (i(), f("th", Ks, [
                    d("div", Qs, [
                      Se(d("input", {
                        id: `row-select-${C.id}-${N}`,
                        "onUpdate:modelValue": E[1] || (E[1] = (P) => r.value = P),
                        value: C.rows[N][C.rowKey] ?? `row-${N}`,
                        type: "checkbox"
                      }, null, 8, Ys), [
                        [ot, r.value]
                      ]),
                      d("label", {
                        class: "fr-label",
                        for: `row-select-${C.id}-${N}`
                      }, " Sélectionner la ligne " + v(N + 1), 9, zs)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(Q, null, Z(I, (P, Y) => (i(), f("td", {
                    key: typeof P == "object" ? P[C.rowKey] : P,
                    tabindex: "0",
                    onKeydown: [
                      J(te((y) => g(typeof P == "object" ? P[C.rowKey] : P), ["ctrl"]), ["c"]),
                      J(te((y) => g(typeof P == "object" ? P[C.rowKey] : P), ["meta"]), ["c"])
                    ]
                  }, [
                    B(C.$slots, "cell", K({ ref_for: !0 }, {
                      colKey: typeof C.headersRow[Y] == "object" ? C.headersRow[Y].key : C.headersRow[Y],
                      cell: P
                    }), () => [
                      V(v(typeof P == "object" ? P[C.rowKey] : P), 1)
                    ], !0)
                  ], 40, Gs))), 128))
                ], 8, Ws))), 128))
              ])
            ], 8, As)
          ])
        ])
      ]),
      d("div", {
        class: A(C.bottomActionBarClass)
      }, [
        B(C.$slots, "pagination", {}, () => [
          C.pagination && !C.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: A(["flex justify-between items-center", C.paginationWrapperClass])
          }, [
            d("div", Xs, [
              E[6] || (E[6] = d("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Se(d("select", {
                id: "pagination-options",
                "onUpdate:modelValue": E[2] || (E[2] = (I) => l.value = I),
                class: "fr-select",
                onChange: E[3] || (E[3] = (I) => M())
              }, [
                d("option", {
                  value: "",
                  selected: !C.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Us),
                (i(!0), f(Q, null, Z(C.paginationOptions, (I, N) => (i(), f("option", {
                  key: N,
                  value: I,
                  selected: +I === l.value
                }, v(I), 9, Zs))), 128))
              ], 544), [
                [Xt, l.value]
              ])
            ]),
            d("div", Js, [
              d("span", eo, "Page " + v(s.value + 1) + " sur " + v(o.value), 1)
            ]),
            ae(la, {
              "current-page": s.value,
              "onUpdate:currentPage": [
                E[4] || (E[4] = (I) => s.value = I),
                E[5] || (E[5] = (I) => r.value.length = 0)
              ],
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), ao = /* @__PURE__ */ ke(to, [["__scopeId", "data-v-831b7391"]]), no = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", ro = { class: "fr-container flex" }, lo = { class: "half" }, so = { class: "fr-h1" }, oo = { class: "flex fr-my-md-3w" }, io = { class: "fr-h6" }, uo = /* @__PURE__ */ O({
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
      return i(), f("div", ro, [
        d("div", lo, [
          d("h1", so, v(t.title), 1),
          d("span", oo, v(t.subtitle), 1),
          d("p", io, v(t.description), 1),
          d("p", null, v(t.help), 1),
          (n = t.buttons) != null && n.length ? (i(), j(Dt, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : b("", !0),
          B(t.$slots, "default", {}, void 0, !0)
        ]),
        e[0] || (e[0] = d("div", { class: "half self-center text-center" }, [
          d("img", {
            class: "error-img",
            src: no
          })
        ], -1))
      ]);
    };
  }
}), co = /* @__PURE__ */ ke(uo, [["__scopeId", "data-v-0f6cf5b4"]]), fo = { class: "fr-fieldset" }, po = ["id"], mo = {
  key: 1,
  class: "fr-fieldset__element"
}, ho = { class: "fr-fieldset__element" }, dn = /* @__PURE__ */ O({
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
      return i(), f("fieldset", fo, [
        t.legend || (r = (n = t.$slots).legend) != null && r.call(n) ? (i(), f("legend", {
          key: 0,
          id: t.legendId,
          class: A(["fr-fieldset__legend", t.legendClass])
        }, [
          V(v(t.legend) + " ", 1),
          B(t.$slots, "legend")
        ], 10, po)) : b("", !0),
        t.hint || (s = (l = t.$slots).hint) != null && s.call(l) ? (i(), f("div", mo, [
          d("span", {
            class: A(["fr-hint-text", t.hintClass])
          }, [
            V(v(t.hint) + " ", 1),
            B(t.$slots, "hint")
          ], 2)
        ])) : b("", !0),
        d("div", ho, [
          B(t.$slots, "default")
        ])
      ]);
    };
  }
}), vo = ["href", "download"], go = { class: "fr-link__detail" }, cn = /* @__PURE__ */ O({
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
      V(v(t.title) + " ", 1),
      d("span", go, v(t.format) + " – " + v(t.size), 1)
    ], 8, vo));
  }
}), bo = { class: "fr-downloads-group fr-downloads-group--bordered" }, yo = {
  key: 0,
  class: "fr-downloads-group__title"
}, wo = /* @__PURE__ */ O({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", bo, [
      t.title ? (i(), f("h4", yo, v(t.title), 1)) : b("", !0),
      d("ul", null, [
        (i(!0), f(Q, null, Z(t.files, (n, r) => (i(), f("li", { key: r }, [
          ae(cn, {
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
}), ko = ["for"], _o = {
  key: 0,
  class: "required"
}, xo = {
  key: 1,
  class: "fr-hint-text"
}, Io = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Do = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, To = ["id"], Co = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrFileUpload",
  props: {
    id: { default: () => re("file-upload") },
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
    }, l = _(() => Array.isArray(e.accept) ? e.accept.join(",") : e.accept);
    return (s, o) => (i(), f("div", {
      class: A(["fr-upload-group", {
        "fr-upload-group--error": s.error,
        "fr-upload-group--valid": s.validMessage,
        "fr-upload-group--disabled": s.disabled
      }])
    }, [
      d("label", {
        class: "fr-label",
        for: s.id
      }, [
        V(v(s.label) + " ", 1),
        "required" in s.$attrs && s.$attrs.required !== !1 ? (i(), f("span", _o, " *")) : b("", !0),
        s.hint ? (i(), f("span", xo, v(s.hint), 1)) : b("", !0)
      ], 8, ko),
      d("input", K({
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
      }), null, 16, Io),
      s.error || s.validMessage ? (i(), f("div", Do, [
        s.error ? (i(), f("p", {
          key: 0,
          id: `${s.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, v(s.error ?? s.validMessage), 9, To)) : b("", !0)
      ])) : b("", !0)
    ], 2));
  }
}), Eo = { class: "fr-follow__newsletter" }, Po = { class: "fr-h5 fr-follow__title" }, Lo = { class: "fr-text--sm fr-follow__desc" }, Mo = { key: 0 }, Bo = ["title"], So = { key: 1 }, $o = { action: "" }, Ao = {
  class: "fr-label",
  for: "newsletter-email"
}, Oo = { class: "fr-input-wrap fr-input-wrap--addon" }, Ro = ["title", "placeholder", "value"], Fo = ["title"], Vo = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, No = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, qo = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, fn = /* @__PURE__ */ O({
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
    return (r, l) => (i(), f("div", Eo, [
      d("div", null, [
        d("h3", Po, v(r.title), 1),
        d("p", Lo, v(r.description), 1)
      ]),
      r.onlyCallout ? (i(), f("div", Mo, [
        d("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (s) => r.buttonAction ? r.buttonAction(s) : () => {
          })
        }, v(r.buttonText), 9, Bo)
      ])) : (i(), f("div", So, [
        d("form", $o, [
          d("label", Ao, v(r.labelEmail), 1),
          d("div", Oo, [
            d("input", {
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
            }, null, 40, Ro),
            d("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: r.buttonTitle,
              type: "submit"
            }, v(r.buttonText), 9, Fo)
          ]),
          r.error ? (i(), f("div", Vo, [
            d("p", No, v(r.error), 1)
          ])) : b("", !0),
          d("p", qo, v(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), jo = { class: "fr-follow__social" }, Ho = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Wo = ["title", "href"], pn = /* @__PURE__ */ O({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", jo, [
      (i(), j(be(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: U(() => e[0] || (e[0] = [
          V(" Suivez-nous "),
          d("br", null, null, -1),
          V(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Ho, [
        (i(!0), f(Q, null, Z(t.networks, (n, r) => (i(), f("li", { key: r }, [
          d("a", {
            class: A(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, v(n.name), 11, Wo)
        ]))), 128))
      ])) : b("", !0)
    ]));
  }
}), Ko = { class: "fr-follow" }, Qo = { class: "fr-container" }, Yo = { class: "fr-grid-row" }, zo = /* @__PURE__ */ O({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const t = a, e = _(() => t.networks && t.networks.length), n = _(() => typeof t.newsletterData == "object");
    return (r, l) => (i(), f("div", Ko, [
      d("div", Qo, [
        d("div", Yo, [
          B(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: A(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ae(fn, Te(wt(r.newsletterData)), null, 16)
            ], 2)) : b("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: A(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              ae(pn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : b("", !0)
          ])
        ])
      ])
    ]));
  }
}), Ea = 1, mn = /* @__PURE__ */ O({
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
    const t = a, e = _(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("http");
    }), n = _(() => {
      var p;
      return (p = t.href) == null ? void 0 : p.startsWith("mailto");
    }), r = _(() => t.button ? "button" : e.value || n.value ? "a" : "RouterLink"), l = _(() => {
      if (!(!e.value && !n.value))
        return t.href;
    }), s = _(() => {
      if (!(e.value || n.value))
        return t.to;
    }), o = _(() => s.value ? { to: s.value } : { href: l.value }), u = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), c = _(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Ea, ...t.iconAttrs ?? {} } : { scale: Ea, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (p, m) => (i(), j(be(r.value), K({
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
        var h, T;
        return [
          !u.value && (p.icon || (h = p.iconAttrs) != null && h.name) && !p.iconRight ? (i(), j(ye, K({
            key: 0,
            class: "fr-mr-1w"
          }, c.value), null, 16)) : b("", !0),
          V(" " + v(p.label) + " ", 1),
          !u.value && (p.icon || (T = p.iconAttrs) != null && T.name) && p.iconRight ? (i(), j(ye, K({
            key: 1,
            class: "fr-ml-1w"
          }, c.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Go = { class: "fr-footer__partners" }, Xo = {
  key: 0,
  class: "fr-footer__partners-title"
}, Uo = { class: "fr-footer__partners-logos" }, Zo = {
  key: 0,
  class: "fr-footer__partners-main"
}, Jo = ["href"], ei = ["src", "alt"], ti = { class: "fr-footer__partners-sub" }, ai = ["href"], ni = ["src", "alt"], hn = /* @__PURE__ */ O({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Go, [
      t.title ? (i(), f("h4", Xo, v(t.title), 1)) : b("", !0),
      d("div", Uo, [
        t.mainPartner ? (i(), f("div", Zo, [
          d("a", {
            class: "fr-footer__partners-link",
            href: t.mainPartner.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, [
            d("img", {
              class: "fr-footer__logo",
              src: t.mainPartner.logo,
              alt: t.mainPartner.name
            }, null, 8, ei)
          ], 8, Jo)
        ])) : b("", !0),
        d("div", ti, [
          d("ul", null, [
            (i(!0), f(Q, null, Z(t.subPartners, (n, r) => (i(), f("li", { key: r }, [
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
                }, null, 8, ni)
              ], 8, ai)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), ri = ["innerHTML"], nt = /* @__PURE__ */ O({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const t = a, e = _(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (n, r) => (i(), f("p", {
      class: A(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: e.value
    }, null, 10, ri));
  }
}), li = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, si = {
  key: 0,
  class: "fr-footer__top"
}, oi = { class: "fr-container" }, ii = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, ui = { class: "fr-container" }, di = { class: "fr-footer__body" }, ci = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, fi = ["href"], pi = ["src", "alt"], mi = ["src", "alt"], hi = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, vi = { class: "fr-footer__content" }, gi = { class: "fr-footer__content-desc" }, bi = { class: "fr-footer__content-list" }, yi = ["href", "title"], wi = { class: "fr-footer__bottom" }, ki = { class: "fr-footer__bottom-list" }, _i = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, xi = /* @__PURE__ */ O({
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
    const t = a, e = _(() => [
      ...t.beforeMandatoryLinks,
      ...t.mandatoryLinks,
      ...t.afterMandatoryLinks
    ]), n = Gt(), r = _(() => {
      var p;
      return (p = n["footer-link-lists"]) == null ? void 0 : p.call(n);
    }), l = _(() => {
      const p = t.licenceTo || t.licenceLinkProps.to;
      return p && typeof p == "string" && p.startsWith("http");
    }), s = _(() => {
      const { to: p, href: m, ...h } = t.licenceLinkProps ?? {};
      return h;
    }), o = _(() => l.value ? "" : t.licenceTo), u = _(() => l.value ? t.licenceTo : ""), c = _(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, m) => {
      const h = Ie("RouterLink");
      return i(), f("footer", li, [
        r.value ? (i(), f("div", si, [
          d("div", oi, [
            d("div", ii, [
              B(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : b("", !0),
        d("div", ui, [
          d("div", di, [
            p.operatorImgSrc ? (i(), f("div", ci, [
              ae(nt, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
              c.value ? (i(), f("a", {
                key: 0,
                href: p.operatorTo,
                "data-testid": "card-link",
                class: "fr-footer__brand-link"
              }, [
                d("img", {
                  class: "fr-footer__logo",
                  style: _e(p.operatorImgStyle),
                  src: p.operatorImgSrc,
                  alt: p.operatorImgAlt
                }, null, 12, pi)
              ], 8, fi)) : (i(), j(h, {
                key: 1,
                class: "fr-footer__brand-link",
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  d("img", {
                    class: "fr-footer__logo",
                    style: _e(p.operatorImgStyle),
                    src: p.operatorImgSrc,
                    alt: p.operatorImgAlt
                  }, null, 12, mi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", hi, [
              ae(h, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  ae(nt, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            d("div", vi, [
              d("p", gi, [
                B(p.$slots, "description", {}, () => [
                  V(v(p.descText), 1)
                ], !0)
              ]),
              d("ul", bi, [
                (i(!0), f(Q, null, Z(p.ecosystemLinks, ({ href: T, label: k, title: S, ...w }, x) => (i(), f("li", {
                  key: x,
                  class: "fr-footer__content-item"
                }, [
                  d("a", K({
                    class: "fr-footer__content-link",
                    href: T,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: S,
                    ref_for: !0
                  }, w), v(k), 17, yi)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), j(hn, Te(K({ key: 0 }, p.partners)), null, 16)) : b("", !0),
          d("div", wi, [
            d("ul", ki, [
              (i(!0), f(Q, null, Z(e.value, (T, k) => (i(), f("li", {
                key: k,
                class: "fr-footer__bottom-item"
              }, [
                ae(mn, K({ ref_for: !0 }, T), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", _i, [
              d("p", null, [
                V(v(p.licenceText) + " ", 1),
                (i(), j(be(l.value ? "a" : "RouterLink"), K({
                  class: "fr-link-licence no-content-after",
                  to: l.value ? void 0 : o.value,
                  href: l.value ? u.value : void 0,
                  target: l.value ? "_blank" : void 0,
                  title: l.value ? `${p.licenceName} (nouvelle fenêtre)` : p.licenceName,
                  rel: "noopener noreferrer"
                }, s.value), {
                  default: U(() => [
                    V(v(p.licenceName), 1)
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
}), Ii = /* @__PURE__ */ ke(xi, [["__scopeId", "data-v-4030eed5"]]), Di = { class: "fr-footer__top-cat" }, Ti = { class: "fr-footer__top-list" }, Ci = ["href"], Ei = /* @__PURE__ */ O({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(a) {
    return (t, e) => {
      const n = Ie("RouterLink");
      return i(), f("div", null, [
        d("h3", Di, v(t.categoryName), 1),
        d("ul", Ti, [
          (i(!0), f(Q, null, Z(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, v(r.label), 9, Ci)) : b("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), j(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: U(() => [
                V(v(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : b("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Pi = { class: "fr-connect-group" }, Li = ["href", "title"], Mi = /* @__PURE__ */ O({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Pi, [
      d("button", {
        class: A(["fr-connect", [{ "fr-connect--plus": t.secure }]])
      }, e[0] || (e[0] = [
        d("span", { class: "fr-connect__login" }, "S’identifier avec ", -1),
        d("span", { class: "fr-connect__brand" }, "FranceConnect", -1)
      ]), 2),
      d("p", null, [
        d("a", {
          href: t.url ?? `https://franceconnect.gouv.fr/${t.secure ? "france-connect-plus" : ""}`,
          target: "_blank",
          rel: "noopener noreferrer",
          title: `Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ? - nouvelle fenêtre`
        }, v(`Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ?`), 9, Li)
      ])
    ]));
  }
}), Bi = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, Si = { class: "fr-nav__item" }, $i = ["aria-controls", "aria-expanded"], Ai = { class: "fr-hidden-lg" }, Oi = ["id"], Ri = { class: "fr-menu__list" }, Fi = ["hreflang", "lang", "aria-current", "href", "onClick"], rt = /* @__PURE__ */ O({
  __name: "DsfrLanguageSelector",
  props: {
    id: { default: () => re("language-selector") },
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
    } = $e(), c = W(!1);
    function p(h) {
      c.value = !1, n("select", h);
    }
    const m = _(
      () => e.languages.find(({ codeIso: h }) => h === e.currentLanguage)
    );
    return de(c, (h, T) => {
      h !== T && o(h);
    }), (h, T) => {
      var k, S;
      return i(), f("nav", Bi, [
        d("div", Si, [
          d("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": h.id,
            "aria-expanded": c.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: T[0] || (T[0] = te((w) => c.value = !c.value, ["prevent", "stop"]))
          }, [
            V(v((k = m.value) == null ? void 0 : k.codeIso.toUpperCase()), 1),
            d("span", Ai, " - " + v((S = m.value) == null ? void 0 : S.label), 1)
          ], 8, $i),
          d("div", {
            id: h.id,
            ref_key: "collapse",
            ref: r,
            class: A(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": F(s), "fr-collapsing": F(l) }]),
            onTransitionend: T[1] || (T[1] = (w) => F(u)(c.value))
          }, [
            d("ul", Ri, [
              (i(!0), f(Q, null, Z(h.languages, (w, x) => (i(), f("li", { key: x }, [
                d("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: w.codeIso,
                  lang: w.codeIso,
                  "aria-current": h.currentLanguage === w.codeIso ? !0 : void 0,
                  href: `#${w.codeIso}`,
                  onClick: te((D) => p(w), ["prevent", "stop"])
                }, v(`${w.codeIso.toUpperCase()} - ${w.label}`), 9, Fi)
              ]))), 128))
            ])
          ], 42, Oi)
        ])
      ]);
    };
  }
}), Vi = ["for"], Ni = {
  key: 0,
  class: "required"
}, qi = {
  key: 0,
  class: "fr-hint-text"
}, ji = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrInput",
  props: {
    id: { default: () => re("basic", "input") },
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
    const e = a, n = sr(), r = W(null), l = () => {
      var c;
      return (c = r.value) == null ? void 0 : c.focus();
    }, s = _(() => e.isTextarea ? "textarea" : "input"), o = _(() => e.isWithWrapper || n.type === "date" || !!e.wrapperClass), u = _(() => [
      "fr-label",
      { invisible: !e.labelVisible },
      e.labelClass
    ]);
    return t({
      focus: l
    }), (c, p) => (i(), f(Q, null, [
      d("label", {
        class: A(u.value),
        for: c.id
      }, [
        B(c.$slots, "label", {}, () => [
          V(v(c.label) + " ", 1),
          B(c.$slots, "required-tip", {}, () => [
            "required" in c.$attrs && c.$attrs.required !== !1 ? (i(), f("span", Ni, "*")) : b("", !0)
          ], !0)
        ], !0),
        c.hint ? (i(), f("span", qi, v(c.hint), 1)) : b("", !0)
      ], 10, Vi),
      o.value ? (i(), f("div", {
        key: 1,
        class: A([
          { "fr-input-wrap": c.isWithWrapper || c.$attrs.type === "date" },
          c.wrapperClass
        ])
      }, [
        (i(), j(be(s.value), K({ id: c.id }, c.$attrs, {
          ref_key: "__input",
          ref: r,
          class: ["fr-input", {
            "fr-input--error": c.isInvalid,
            "fr-input--valid": c.isValid
          }],
          value: c.modelValue,
          "aria-describedby": c.descriptionId || void 0,
          onInput: p[1] || (p[1] = (m) => c.$emit("update:modelValue", m.target.value))
        }), null, 16, ["id", "class", "value", "aria-describedby"]))
      ], 2)) : (i(), j(be(s.value), K({
        key: 0,
        id: c.id
      }, c.$attrs, {
        ref_key: "__input",
        ref: r,
        class: ["fr-input", {
          "fr-input--error": c.isInvalid,
          "fr-input--valid": c.isValid
        }],
        value: c.modelValue,
        "aria-describedby": c.descriptionId || void 0,
        onInput: p[0] || (p[0] = (m) => c.$emit("update:modelValue", m.target.value))
      }), null, 16, ["id", "class", "value", "aria-describedby"]))
    ], 64));
  }
}), Ct = /* @__PURE__ */ ke(ji, [["__scopeId", "data-v-7ca45de8"]]), lt = /* @__PURE__ */ O({
  __name: "DsfrSearchBar",
  props: {
    id: { default: () => re("search", "input") },
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
      class: A(["fr-search-bar", { "fr-search-bar--lg": n.large }]),
      role: "search"
    }, [
      ae(Ct, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => e("update:modelValue", l)),
        onKeydown: r[1] || (r[1] = J((l) => e("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label", "disabled", "aria-disabled"]),
      ae(je, {
        title: "Rechercher",
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        onClick: r[2] || (r[2] = (l) => e("search", n.modelValue))
      }, {
        default: U(() => [
          V(v(n.buttonText), 1)
        ]),
        _: 1
      }, 8, ["disabled", "aria-disabled"])
    ], 2));
  }
}), Pa = 1, sa = /* @__PURE__ */ O({
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
    const t = a, e = _(() => typeof t.path == "string"), n = _(() => {
      var m;
      return ((m = t.href) == null ? void 0 : m.startsWith("http")) || e.value && t.path.startsWith("http") || typeof t.to == "string" && t.to.startsWith("http");
    }), r = _(() => {
      var m;
      return ((m = t.href) == null ? void 0 : m.startsWith("mailto")) || e.value && t.path.startsWith("mailto") || typeof t.to == "string" && t.to.startsWith("mailto");
    }), l = _(() => t.button ? "button" : n.value || r.value ? "a" : "RouterLink"), s = _(() => {
      if (!(!n.value && !r.value))
        return t.to ?? t.href ?? t.path;
    }), o = _(() => {
      if (!(n.value || r.value))
        return t.to ?? t.path;
    }), u = _(() => o.value ? { to: o.value } : { href: s.value }), c = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), p = _(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Pa, ...t.iconAttrs ?? {} } : { scale: Pa, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (m, h) => (i(), j(be(l.value), K({
      class: ["fr-btn", {
        "fr-btn--icon-right": c.value && m.iconRight,
        "fr-btn--icon-left": c.value && !m.iconRight,
        [String(m.icon)]: c.value
      }]
    }, u.value, {
      target: m.target,
      onClick: h[0] || (h[0] = te((T) => m.onClick(T), ["stop"]))
    }), {
      default: U(() => {
        var T, k;
        return [
          !c.value && (m.icon || (T = m.iconAttrs) != null && T.name) && !m.iconRight ? (i(), j(ye, K({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : b("", !0),
          V(" " + v(m.label) + " ", 1),
          !c.value && (m.icon || (k = m.iconAttrs) != null && k.name) && m.iconRight ? (i(), j(ye, K({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : b("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Hi = ["aria-label"], Wi = { class: "fr-btns-group" }, qt = /* @__PURE__ */ O({
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
      d("ul", Wi, [
        (i(!0), f(Q, null, Z(n.links, (l, s) => (i(), f("li", { key: s }, [
          ae(sa, K({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var u;
              e("linkClick", o), (u = l.onClick) == null || u.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Hi));
  }
}), Ki = {
  role: "banner",
  class: "fr-header"
}, Qi = { class: "fr-header__body" }, Yi = { class: "fr-container width-inherit" }, zi = { class: "fr-header__body-row" }, Gi = { class: "fr-header__brand fr-enlarge-link" }, Xi = { class: "fr-header__brand-top" }, Ui = { class: "fr-header__logo" }, Zi = {
  key: 0,
  class: "fr-header__operator"
}, Ji = ["src", "alt"], eu = {
  key: 1,
  class: "fr-header__navbar"
}, tu = ["aria-label", "title", "data-fr-opened"], au = ["aria-label", "title"], nu = {
  key: 0,
  class: "fr-header__service"
}, ru = { class: "fr-header__service-title" }, lu = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, su = {
  key: 0,
  class: "fr-header__service-tagline"
}, ou = {
  key: 1,
  class: "fr-header__service"
}, iu = { class: "fr-header__tools" }, uu = {
  key: 0,
  class: "fr-header__tools-links"
}, du = {
  key: 1,
  class: "fr-header__search fr-modal"
}, cu = ["aria-label"], fu = { class: "fr-container" }, pu = { class: "fr-header__menu-links" }, mu = {
  key: 1,
  class: "flex justify-center items-center"
}, hu = { class: "fr-header__menu fr-modal" }, vu = {
  key: 0,
  class: "fr-container"
}, gu = /* @__PURE__ */ O({
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
    const e = a, n = t, r = Gt(), l = st(e, "languageSelector"), s = W(!1), o = W(!1), u = W(!1), c = () => {
      var x;
      u.value = !1, s.value = !1, o.value = !1, (x = document.getElementById("button-menu")) == null || x.focus();
    }, p = (x) => {
      x.key === "Escape" && c();
    };
    ge(() => {
      document.addEventListener("keydown", p);
    }), Ee(() => {
      document.removeEventListener("keydown", p);
    });
    const m = () => {
      u.value = !0, s.value = !0, o.value = !1, setTimeout(() => {
        var x;
        (x = document.getElementById("close-button")) == null || x.focus();
      });
    }, h = () => {
      u.value = !0, s.value = !1, o.value = !0;
    }, T = c, k = _(() => [e.homeLabel, e.serviceTitle].filter((x) => x).join(" - ")), S = _(() => !!r.operator || !!e.operatorImgSrc), w = _(() => !!r.mainnav);
    return Re(ra, () => c), (x, D) => {
      var M, g, C;
      const E = Ie("RouterLink");
      return i(), f("header", Ki, [
        d("div", Qi, [
          d("div", Yi, [
            d("div", zi, [
              d("div", Gi, [
                d("div", Xi, [
                  d("div", Ui, [
                    ae(E, {
                      to: x.homeTo,
                      title: k.value
                    }, {
                      default: U(() => [
                        ae(nt, {
                          "logo-text": x.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  S.value ? (i(), f("div", Zi, [
                    B(x.$slots, "operator", {}, () => [
                      x.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: x.operatorImgSrc,
                        alt: x.operatorImgAlt,
                        style: _e(x.operatorImgStyle)
                      }, null, 12, Ji)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  x.showSearch || w.value || (M = x.quickLinks) != null && M.length ? (i(), f("div", eu, [
                    x.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": x.showSearchLabel,
                      title: x.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: D[0] || (D[0] = te((I) => h(), ["prevent", "stop"]))
                    }, null, 8, tu)) : b("", !0),
                    w.value || (g = x.quickLinks) != null && g.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": m,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": x.menuLabel,
                      title: x.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: D[1] || (D[1] = te((I) => m(), ["prevent", "stop"]))
                    }, null, 8, au)) : b("", !0)
                  ])) : b("", !0)
                ]),
                x.serviceTitle ? (i(), f("div", nu, [
                  ae(E, K({
                    to: x.homeTo,
                    title: k.value
                  }, x.$attrs), {
                    default: U(() => [
                      d("p", ru, [
                        V(v(x.serviceTitle) + " ", 1),
                        x.showBeta ? (i(), f("span", lu, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  x.serviceDescription ? (i(), f("p", su, v(x.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !x.serviceTitle && x.showBeta ? (i(), f("div", ou, D[9] || (D[9] = [
                  d("p", { class: "fr-header__service-title" }, [
                    d("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              d("div", iu, [
                (C = x.quickLinks) != null && C.length || l.value ? (i(), f("div", uu, [
                  B(x.$slots, "before-quick-links"),
                  s.value ? b("", !0) : (i(), j(qt, {
                    key: 0,
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  B(x.$slots, "after-quick-links"),
                  l.value ? (i(), j(rt, K({ key: 1 }, l.value, {
                    onSelect: D[2] || (D[2] = (I) => n("languageSelect", I))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                x.showSearch ? (i(), f("div", du, [
                  ae(lt, {
                    id: x.searchbarId,
                    label: x.searchLabel,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": D[3] || (D[3] = (I) => n("update:modelValue", I)),
                    onSearch: D[4] || (D[4] = (I) => n("search", I))
                  }, null, 8, ["id", "label", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ]),
            x.showSearch || w.value || x.quickLinks && x.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: A(["fr-header__menu fr-modal", { "fr-modal--opened": u.value }]),
              "aria-label": x.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              d("div", fu, [
                d("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: D[5] || (D[5] = te((I) => c(), ["prevent", "stop"]))
                }, v(x.closeMenuModalLabel), 1),
                d("div", pu, [
                  l.value ? (i(), j(rt, K({ key: 0 }, l.value, {
                    onSelect: D[6] || (D[6] = (I) => l.value.currentLanguage = I.codeIso)
                  }), null, 16)) : b("", !0),
                  B(x.$slots, "before-quick-links"),
                  s.value ? (i(), j(qt, {
                    key: 1,
                    role: "navigation",
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel,
                    onLinkClick: F(T)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0),
                  B(x.$slots, "after-quick-links")
                ]),
                u.value ? B(x.$slots, "mainnav", {
                  key: 0,
                  hidemodal: c
                }) : b("", !0),
                o.value ? (i(), f("div", mu, [
                  ae(lt, {
                    "searchbar-id": x.searchbarId,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    "onUpdate:modelValue": D[7] || (D[7] = (I) => n("update:modelValue", I)),
                    onSearch: D[8] || (D[8] = (I) => n("search", I))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, cu)) : b("", !0),
            B(x.$slots, "default")
          ])
        ]),
        d("div", hu, [
          w.value && !u.value ? (i(), f("div", vu, [
            B(x.$slots, "mainnav", { hidemodal: c })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), bu = /* @__PURE__ */ O({
  __name: "DsfrHighlight",
  props: {
    text: { default: void 0 },
    small: { type: Boolean },
    large: { type: Boolean },
    color: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", {
      class: A(["fr-highlight", { [`fr-highlight--${t.color}`]: t.color }])
    }, [
      d("p", {
        class: A({
          "fr-text--lg": t.large && !t.small,
          "fr-text--sm": t.small && !t.large
        })
      }, [
        V(v(t.text) + " ", 1),
        B(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), yu = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, wu = ["id", "data-testid"], ku = ["id", "data-testid"], _u = ["id", "data-testid"], xu = ["id", "data-testid"], Iu = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrInputGroup",
  props: {
    descriptionId: { default: () => re("input", "group") },
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
      class: A(["fr-input-group", [
        {
          "fr-input-group--error": t.errorMessage,
          "fr-input-group--valid": t.validMessage && !t.errorMessage
        },
        t.wrapperClass
      ]])
    }, [
      B(t.$slots, "before-input"),
      B(t.$slots, "default"),
      t.$slots.default ? b("", !0) : (i(), j(Ct, K({ key: 0 }, t.$attrs, {
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
      d("div", yu, [
        Array.isArray(t.errorMessage) ? (i(!0), f(Q, { key: 0 }, Z(t.errorMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, v(n), 9, wu))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, v(t.errorMessage), 9, ku)) : b("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(Q, { key: 2 }, Z(t.validMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, v(n), 9, _u))), 128)) : t.validMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.validMessage,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, v(t.validMessage), 9, xu)) : b("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var vn = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], mt = /* @__PURE__ */ vn.join(","), gn = typeof Element > "u", He = gn ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, ht = !gn && Element.prototype.getRootNode ? function(a) {
  var t;
  return a == null || (t = a.getRootNode) === null || t === void 0 ? void 0 : t.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, vt = function a(t, e) {
  var n;
  e === void 0 && (e = !0);
  var r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "inert"), l = r === "" || r === "true", s = l || e && t && a(t.parentNode);
  return s;
}, Du = function(a) {
  var t, e = a == null || (t = a.getAttribute) === null || t === void 0 ? void 0 : t.call(a, "contenteditable");
  return e === "" || e === "true";
}, bn = function(a, t, e) {
  if (vt(a))
    return [];
  var n = Array.prototype.slice.apply(a.querySelectorAll(mt));
  return t && He.call(a, mt) && n.unshift(a), n = n.filter(e), n;
}, yn = function a(t, e, n) {
  for (var r = [], l = Array.from(t); l.length; ) {
    var s = l.shift();
    if (!vt(s, !1))
      if (s.tagName === "SLOT") {
        var o = s.assignedElements(), u = o.length ? o : s.children, c = a(u, !0, n);
        n.flatten ? r.push.apply(r, c) : r.push({
          scopeParent: s,
          candidates: c
        });
      } else {
        var p = He.call(s, mt);
        p && n.filter(s) && (e || !t.includes(s)) && r.push(s);
        var m = s.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), h = !vt(m, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
        if (m && h) {
          var T = a(m === !0 ? s.children : m.children, !0, n);
          n.flatten ? r.push.apply(r, T) : r.push({
            scopeParent: s,
            candidates: T
          });
        } else
          l.unshift.apply(l, s.children);
      }
  }
  return r;
}, wn = function(a) {
  return !isNaN(parseInt(a.getAttribute("tabindex"), 10));
}, Ne = function(a) {
  if (!a)
    throw new Error("No node provided");
  return a.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(a.tagName) || Du(a)) && !wn(a) ? 0 : a.tabIndex;
}, Tu = function(a, t) {
  var e = Ne(a);
  return e < 0 && t && !wn(a) ? 0 : e;
}, Cu = function(a, t) {
  return a.tabIndex === t.tabIndex ? a.documentOrder - t.documentOrder : a.tabIndex - t.tabIndex;
}, kn = function(a) {
  return a.tagName === "INPUT";
}, Eu = function(a) {
  return kn(a) && a.type === "hidden";
}, Pu = function(a) {
  var t = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, Lu = function(a, t) {
  for (var e = 0; e < a.length; e++)
    if (a[e].checked && a[e].form === t)
      return a[e];
}, Mu = function(a) {
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
  var r = Lu(n, a.form);
  return !r || r === a;
}, Bu = function(a) {
  return kn(a) && a.type === "radio";
}, Su = function(a) {
  return Bu(a) && !Mu(a);
}, $u = function(a) {
  var t, e = a && ht(a), n = (t = e) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (e && e !== a) {
    var l, s, o;
    for (r = !!((l = n) !== null && l !== void 0 && (s = l.ownerDocument) !== null && s !== void 0 && s.contains(n) || a != null && (o = a.ownerDocument) !== null && o !== void 0 && o.contains(a)); !r && n; ) {
      var u, c, p;
      e = ht(n), n = (u = e) === null || u === void 0 ? void 0 : u.host, r = !!((c = n) !== null && c !== void 0 && (p = c.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return r;
}, La = function(a) {
  var t = a.getBoundingClientRect(), e = t.width, n = t.height;
  return e === 0 && n === 0;
}, Au = function(a, t) {
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
          return La(a);
        a.assignedSlot ? a = a.assignedSlot : !o && u !== a.ownerDocument ? a = u.host : a = o;
      }
      a = s;
    }
    if ($u(a))
      return !a.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return La(a);
  return !1;
}, Ou = function(a) {
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
  vt(t) || Eu(t) || Au(t, a) || // For a details element with a summary, the summary element gets the focus
  Pu(t) || Ou(t));
}, jt = function(a, t) {
  return !(Su(t) || Ne(t) < 0 || !gt(a, t));
}, Ru = function(a) {
  var t = parseInt(a.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, Fu = function a(t) {
  var e = [], n = [];
  return t.forEach(function(r, l) {
    var s = !!r.scopeParent, o = s ? r.scopeParent : r, u = Tu(o, s), c = s ? a(r.candidates) : o;
    u === 0 ? s ? e.push.apply(e, c) : e.push(o) : n.push({
      documentOrder: l,
      tabIndex: u,
      item: r,
      isScope: s,
      content: c
    });
  }), n.sort(Cu).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(e);
}, Vu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = yn([a], t.includeContainer, {
    filter: jt.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Ru
  }) : e = bn(a, t.includeContainer, jt.bind(null, t)), Fu(e);
}, Nu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = yn([a], t.includeContainer, {
    filter: gt.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : e = bn(a, t.includeContainer, gt.bind(null, t)), e;
}, We = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, mt) === !1 ? !1 : jt(t, a);
}, qu = /* @__PURE__ */ vn.concat("iframe").join(","), Mt = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, qu) === !1 ? !1 : gt(t, a);
};
/*!
* focus-trap 7.6.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
function Ht(a, t) {
  (t == null || t > a.length) && (t = a.length);
  for (var e = 0, n = Array(t); e < t; e++) n[e] = a[e];
  return n;
}
function ju(a) {
  if (Array.isArray(a)) return Ht(a);
}
function Hu(a, t, e) {
  return (t = zu(t)) in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}
function Wu(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function Ku() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ma(a, t) {
  var e = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), e.push.apply(e, n);
  }
  return e;
}
function Ba(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ma(Object(e), !0).forEach(function(n) {
      Hu(a, n, e[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : Ma(Object(e)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(e, n));
    });
  }
  return a;
}
function Qu(a) {
  return ju(a) || Wu(a) || Gu(a) || Ku();
}
function Yu(a, t) {
  if (typeof a != "object" || !a) return a;
  var e = a[Symbol.toPrimitive];
  if (e !== void 0) {
    var n = e.call(a, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(a);
}
function zu(a) {
  var t = Yu(a, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Gu(a, t) {
  if (a) {
    if (typeof a == "string") return Ht(a, t);
    var e = {}.toString.call(a).slice(8, -1);
    return e === "Object" && a.constructor && (e = a.constructor.name), e === "Map" || e === "Set" ? Array.from(a) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Ht(a, t) : void 0;
  }
}
var Sa = {
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
}, Xu = function(a) {
  return a.tagName && a.tagName.toLowerCase() === "input" && typeof a.select == "function";
}, Uu = function(a) {
  return (a == null ? void 0 : a.key) === "Escape" || (a == null ? void 0 : a.key) === "Esc" || (a == null ? void 0 : a.keyCode) === 27;
}, et = function(a) {
  return (a == null ? void 0 : a.key) === "Tab" || (a == null ? void 0 : a.keyCode) === 9;
}, Zu = function(a) {
  return et(a) && !a.shiftKey;
}, Ju = function(a) {
  return et(a) && a.shiftKey;
}, $a = function(a) {
  return setTimeout(a, 0);
}, Ue = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    e[n - 1] = arguments[n];
  return typeof a == "function" ? a.apply(void 0, e) : a;
}, ut = function(a) {
  return a.target.shadowRoot && typeof a.composedPath == "function" ? a.composedPath()[0] : a.target;
}, ed = [], td = function(a, t) {
  var e = (t == null ? void 0 : t.document) || document, n = (t == null ? void 0 : t.trapStack) || ed, r = Ba({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Zu,
    isKeyBackward: Ju
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
  }, s, o = function(y, $, L) {
    return y && y[$] !== void 0 ? y[$] : r[L || $];
  }, u = function(y, $) {
    var L = typeof ($ == null ? void 0 : $.composedPath) == "function" ? $.composedPath() : void 0;
    return l.containerGroups.findIndex(function(R) {
      var X = R.container, G = R.tabbableNodes;
      return X.contains(y) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (L == null ? void 0 : L.includes(X)) || G.find(function(ee) {
        return ee === y;
      });
    });
  }, c = function(y) {
    var $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, L = $.hasFallback, R = L === void 0 ? !1 : L, X = $.params, G = X === void 0 ? [] : X, ee = r[y];
    if (typeof ee == "function" && (ee = ee.apply(void 0, Qu(G))), ee === !0 && (ee = void 0), !ee) {
      if (ee === void 0 || ee === !1)
        return ee;
      throw new Error("`".concat(y, "` was specified but was not a node, or did not return a node"));
    }
    var le = ee;
    if (typeof ee == "string") {
      try {
        le = e.querySelector(ee);
      } catch (se) {
        throw new Error("`".concat(y, '` appears to be an invalid selector; error="').concat(se.message, '"'));
      }
      if (!le && !R)
        throw new Error("`".concat(y, "` as selector refers to no known node"));
    }
    return le;
  }, p = function() {
    var y = c("initialFocus", {
      hasFallback: !0
    });
    if (y === !1)
      return !1;
    if (y === void 0 || y && !Mt(y, r.tabbableOptions))
      if (u(e.activeElement) >= 0)
        y = e.activeElement;
      else {
        var $ = l.tabbableGroups[0], L = $ && $.firstTabbableNode;
        y = L || c("fallbackFocus");
      }
    else y === null && (y = c("fallbackFocus"));
    if (!y)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return y;
  }, m = function() {
    if (l.containerGroups = l.containers.map(function(y) {
      var $ = Vu(y, r.tabbableOptions), L = Nu(y, r.tabbableOptions), R = $.length > 0 ? $[0] : void 0, X = $.length > 0 ? $[$.length - 1] : void 0, G = L.find(function(se) {
        return We(se);
      }), ee = L.slice().reverse().find(function(se) {
        return We(se);
      }), le = !!$.find(function(se) {
        return Ne(se) > 0;
      });
      return {
        container: y,
        tabbableNodes: $,
        focusableNodes: L,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: le,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: R,
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
        firstDomTabbableNode: G,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode: ee,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(se) {
          var De = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ce = $.indexOf(se);
          return Ce < 0 ? De ? L.slice(L.indexOf(se) + 1).find(function(H) {
            return We(H);
          }) : L.slice(0, L.indexOf(se)).reverse().find(function(H) {
            return We(H);
          }) : $[Ce + (De ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(y) {
      return y.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !c("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(y) {
      return y.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, h = function(y) {
    var $ = y.activeElement;
    if ($)
      return $.shadowRoot && $.shadowRoot.activeElement !== null ? h($.shadowRoot) : $;
  }, T = function(y) {
    if (y !== !1 && y !== h(document)) {
      if (!y || !y.focus) {
        T(p());
        return;
      }
      y.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = y, Xu(y) && y.select();
    }
  }, k = function(y) {
    var $ = c("setReturnFocus", {
      params: [y]
    });
    return $ || ($ === !1 ? !1 : y);
  }, S = function(y) {
    var $ = y.target, L = y.event, R = y.isBackward, X = R === void 0 ? !1 : R;
    $ = $ || ut(L), m();
    var G = null;
    if (l.tabbableGroups.length > 0) {
      var ee = u($, L), le = ee >= 0 ? l.containerGroups[ee] : void 0;
      if (ee < 0)
        X ? G = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : G = l.tabbableGroups[0].firstTabbableNode;
      else if (X) {
        var se = l.tabbableGroups.findIndex(function(me) {
          var ve = me.firstTabbableNode;
          return $ === ve;
        });
        if (se < 0 && (le.container === $ || Mt($, r.tabbableOptions) && !We($, r.tabbableOptions) && !le.nextTabbableNode($, !1)) && (se = ee), se >= 0) {
          var De = se === 0 ? l.tabbableGroups.length - 1 : se - 1, Ce = l.tabbableGroups[De];
          G = Ne($) >= 0 ? Ce.lastTabbableNode : Ce.lastDomTabbableNode;
        } else et(L) || (G = le.nextTabbableNode($, !1));
      } else {
        var H = l.tabbableGroups.findIndex(function(me) {
          var ve = me.lastTabbableNode;
          return $ === ve;
        });
        if (H < 0 && (le.container === $ || Mt($, r.tabbableOptions) && !We($, r.tabbableOptions) && !le.nextTabbableNode($)) && (H = ee), H >= 0) {
          var z = H === l.tabbableGroups.length - 1 ? 0 : H + 1, ne = l.tabbableGroups[z];
          G = Ne($) >= 0 ? ne.firstTabbableNode : ne.firstDomTabbableNode;
        } else et(L) || (G = le.nextTabbableNode($));
      }
    } else
      G = c("fallbackFocus");
    return G;
  }, w = function(y) {
    var $ = ut(y);
    if (!(u($, y) >= 0)) {
      if (Ue(r.clickOutsideDeactivates, y)) {
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
      Ue(r.allowOutsideClick, y) || y.preventDefault();
    }
  }, x = function(y) {
    var $ = ut(y), L = u($, y) >= 0;
    if (L || $ instanceof Document)
      L && (l.mostRecentlyFocusedNode = $);
    else {
      y.stopImmediatePropagation();
      var R, X = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ne(l.mostRecentlyFocusedNode) > 0) {
          var G = u(l.mostRecentlyFocusedNode), ee = l.containerGroups[G].tabbableNodes;
          if (ee.length > 0) {
            var le = ee.findIndex(function(se) {
              return se === l.mostRecentlyFocusedNode;
            });
            le >= 0 && (r.isKeyForward(l.recentNavEvent) ? le + 1 < ee.length && (R = ee[le + 1], X = !1) : le - 1 >= 0 && (R = ee[le - 1], X = !1));
          }
        } else
          l.containerGroups.some(function(se) {
            return se.tabbableNodes.some(function(De) {
              return Ne(De) > 0;
            });
          }) || (X = !1);
      else
        X = !1;
      X && (R = S({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), T(R || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, D = function(y) {
    var $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = y;
    var L = S({
      event: y,
      isBackward: $
    });
    L && (et(y) && y.preventDefault(), T(L));
  }, M = function(y) {
    (r.isKeyForward(y) || r.isKeyBackward(y)) && D(y, r.isKeyBackward(y));
  }, g = function(y) {
    Uu(y) && Ue(r.escapeDeactivates, y) !== !1 && (y.preventDefault(), s.deactivate());
  }, C = function(y) {
    var $ = ut(y);
    u($, y) >= 0 || Ue(r.clickOutsideDeactivates, y) || Ue(r.allowOutsideClick, y) || (y.preventDefault(), y.stopImmediatePropagation());
  }, E = function() {
    if (l.active)
      return Sa.activateTrap(n, s), l.delayInitialFocusTimer = r.delayInitialFocus ? $a(function() {
        T(p());
      }) : T(p()), e.addEventListener("focusin", x, !0), e.addEventListener("mousedown", w, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", w, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", C, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", M, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", g), s;
  }, I = function() {
    if (l.active)
      return e.removeEventListener("focusin", x, !0), e.removeEventListener("mousedown", w, !0), e.removeEventListener("touchstart", w, !0), e.removeEventListener("click", C, !0), e.removeEventListener("keydown", M, !0), e.removeEventListener("keydown", g), s;
  }, N = function(y) {
    var $ = y.some(function(L) {
      var R = Array.from(L.removedNodes);
      return R.some(function(X) {
        return X === l.mostRecentlyFocusedNode;
      });
    });
    $ && T(p());
  }, P = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(N) : void 0, Y = function() {
    P && (P.disconnect(), l.active && !l.paused && l.containers.map(function(y) {
      P.observe(y, {
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
    activate: function(y) {
      if (l.active)
        return this;
      var $ = o(y, "onActivate"), L = o(y, "onPostActivate"), R = o(y, "checkCanFocusTrap");
      R || m(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, $ == null || $();
      var X = function() {
        R && m(), E(), Y(), L == null || L();
      };
      return R ? (R(l.containers.concat()).then(X, X), this) : (X(), this);
    },
    deactivate: function(y) {
      if (!l.active)
        return this;
      var $ = Ba({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, y);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, I(), l.active = !1, l.paused = !1, Y(), Sa.deactivateTrap(n, s);
      var L = o($, "onDeactivate"), R = o($, "onPostDeactivate"), X = o($, "checkCanReturnFocus"), G = o($, "returnFocus", "returnFocusOnDeactivate");
      L == null || L();
      var ee = function() {
        $a(function() {
          G && T(k(l.nodeFocusedBeforeActivation)), R == null || R();
        });
      };
      return G && X ? (X(k(l.nodeFocusedBeforeActivation)).then(ee, ee), this) : (ee(), this);
    },
    pause: function(y) {
      return l.active ? (l.manuallyPaused = !0, this._setPausedState(!0, y)) : this;
    },
    unpause: function(y) {
      return l.active ? (l.manuallyPaused = !1, n[n.length - 1] !== this ? this : this._setPausedState(!1, y)) : this;
    },
    updateContainerElements: function(y) {
      var $ = [].concat(y).filter(Boolean);
      return l.containers = $.map(function(L) {
        return typeof L == "string" ? e.querySelector(L) : L;
      }), l.active && m(), Y(), this;
    }
  }, Object.defineProperties(s, {
    _isManuallyPaused: {
      value: function() {
        return l.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(y, $) {
        if (l.paused === y)
          return this;
        if (l.paused = y, y) {
          var L = o($, "onPause"), R = o($, "onPostPause");
          L == null || L(), I(), Y(), R == null || R();
        } else {
          var X = o($, "onUnpause"), G = o($, "onPostUnpause");
          X == null || X(), m(), E(), Y(), G == null || G();
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
const ad = {
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
}, nd = O({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, ad),
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
    const r = W(null), l = _(() => {
      const o = r.value;
      return o && (o instanceof HTMLElement ? o : o.$el);
    });
    function s() {
      return n || (n = td(l.value, {
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
    return ge(() => {
      de(() => a.active, (o) => {
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
        const o = t.default().filter((u) => u.type !== rr);
        return !o || !o.length || o.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), o) : lr(o[0], { ref: r });
      }
    };
  }
}), rd = ["aria-labelledby", "role", "open"], ld = { class: "fr-container fr-container--fluid fr-container-md" }, sd = { class: "fr-grid-row fr-grid-row--center" }, od = { class: "fr-modal__body" }, id = { class: "fr-modal__header" }, ud = ["title"], dd = { class: "fr-modal__content" }, cd = ["id"], fd = {
  key: 0,
  class: "fr-modal__footer"
}, Aa = 2, pd = /* @__PURE__ */ O({
  __name: "DsfrModal",
  props: {
    modalId: { default: () => re("modal", "dialog") },
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
    const e = a, n = t, r = (k) => {
      k.key === "Escape" && m();
    }, l = _(() => e.isAlert ? "alertdialog" : "dialog"), s = W(null), o = W();
    de(() => e.opened, (k) => {
      var S, w;
      k ? ((S = o.value) == null || S.showModal(), setTimeout(() => {
        var x;
        (x = s.value) == null || x.focus();
      }, 100)) : (w = o.value) == null || w.close(), u(k);
    });
    function u(k) {
      typeof window < "u" && document.body.classList.toggle("modal-open", k);
    }
    ge(() => {
      c(), u(e.opened);
    }), cr(() => {
      p(), u(!1);
    });
    function c() {
      document.addEventListener("keydown", r);
    }
    function p() {
      document.removeEventListener("keydown", r);
    }
    async function m() {
      var k;
      await Ka(), (k = e.origin) == null || k.focus(), n("close");
    }
    const h = _(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), T = _(
      () => h.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Aa } : { scale: Aa, ...e.icon ?? {} }
    );
    return (k, S) => k.opened ? (i(), j(F(nd), { key: 0 }, {
      default: U(() => {
        var w, x;
        return [
          d("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: o,
            "aria-modal": "true",
            "aria-labelledby": k.modalId,
            role: l.value,
            class: A(["fr-modal", { "fr-modal--opened": k.opened }]),
            open: k.opened
          }, [
            d("div", ld, [
              d("div", sd, [
                d("div", {
                  class: A(["fr-col-12", {
                    "fr-col-md-8": k.size === "lg",
                    "fr-col-md-6": k.size === "md",
                    "fr-col-md-4": k.size === "sm"
                  }])
                }, [
                  d("div", od, [
                    d("div", id, [
                      d("button", {
                        ref_key: "closeBtn",
                        ref: s,
                        class: "fr-btn fr-btn--close",
                        title: k.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: S[0] || (S[0] = (D) => m())
                      }, [
                        d("span", null, v(k.closeButtonLabel), 1)
                      ], 8, ud)
                    ]),
                    d("div", dd, [
                      d("h1", {
                        id: k.modalId,
                        class: "fr-modal__title"
                      }, [
                        h.value || T.value ? (i(), f("span", {
                          key: 0,
                          class: A({
                            [String(k.icon)]: h.value
                          })
                        }, [
                          k.icon && T.value ? (i(), j(ye, Te(K({ key: 0 }, T.value)), null, 16)) : b("", !0)
                        ], 2)) : b("", !0),
                        V(" " + v(k.title), 1)
                      ], 8, cd),
                      B(k.$slots, "default", {}, void 0, !0)
                    ]),
                    (w = k.actions) != null && w.length || k.$slots.footer ? (i(), f("div", fd, [
                      B(k.$slots, "footer", {}, void 0, !0),
                      (x = k.actions) != null && x.length ? (i(), j(Dt, {
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
          ], 10, rd)
        ];
      }),
      _: 3
    })) : b("", !0);
  }
}), _n = /* @__PURE__ */ ke(pd, [["__scopeId", "data-v-70fe954b"]]), md = ["for"], hd = {
  key: 0,
  class: "required"
}, vd = {
  key: 0,
  class: "fr-hint-text"
}, gd = ["id"], bd = ["id"], yd = {
  key: 0,
  class: "fr-btns-group"
}, wd = {
  key: 1,
  class: "fr-input-group"
}, kd = { class: "fr-input-wrap fr-icon-search-line" }, _d = { class: "fr-checkbox-group fr-checkbox-group--sm" }, xd = { key: 2 }, Id = ["id"], Dd = /* @__PURE__ */ O({
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
    id: { default: () => re("multiselect") },
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
    const t = a, e = (H, z) => typeof H == "object" && H !== null && !!z && z in H, n = (H, z) => {
      if (z && e(H, z)) {
        const ne = H[z];
        if (typeof ne == "string" || typeof ne == "number")
          return ne;
        throw new Error(
          `The value of idKey ${String(z)} is not a string or number.`
        );
      }
      if (typeof H == "string" || typeof H == "number")
        return H;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (H, z, ne) => `${z}-${n(H, ne)}`, l = W(null), s = W(!1), o = xe(a, "modelValue"), u = W(0), c = _(() => t.errorMessage || t.successMessage), p = _(() => t.errorMessage ? "error" : "valid"), m = [], {
      collapse: h,
      collapsing: T,
      cssExpanded: k,
      doExpand: S,
      onTransitionEnd: w
    } = $e(), x = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), D = W(!1), M = W("");
    function g(H) {
      H.key === "Escape" && P();
    }
    function C(H) {
      var z, ne;
      const me = H.target;
      !((z = l.value) != null && z.$el.contains(me)) && !((ne = h.value) != null && ne.contains(me)) && P();
    }
    function E(H, z) {
      if (window.ResizeObserver) {
        const ne = new window.ResizeObserver((me) => {
          for (const ve of me)
            z(H, ve);
        });
        return ne.observe(H), () => {
          ne.unobserve(H), ne.disconnect();
        };
      }
      return () => {
      };
    }
    function I(H) {
      const z = H.getBoundingClientRect();
      z.width !== u.value && (u.value = z.width);
    }
    function N() {
      s.value = !0, D.value = !0, l.value && m.push(E(l.value.$el, I)), document.addEventListener("click", C), document.addEventListener("keydown", g), setTimeout(() => {
        S(!0);
      }, 100);
    }
    function P() {
      s.value = !1, S(!1), setTimeout(() => {
        D.value = !1;
      }, 300), y();
    }
    const Y = async () => {
      D.value ? P() : N();
    };
    function y() {
      for (; m.length; ) {
        const H = m.pop();
        H && H();
      }
      document.removeEventListener("click", C), document.removeEventListener("keydown", g);
    }
    const $ = _(
      () => t.options.filter((H) => typeof H == "object" && H !== null ? t.filteringKeys.some(
        (z) => `${H[z]}`.toLowerCase().includes(M.value.toLowerCase())
      ) : `${H}`.toLowerCase().includes(M.value.toLowerCase()))
    ), L = _(() => t.modelValue.length < $.value.length ? !1 : $.value.every((H) => {
      const z = n(H, t.idKey);
      return t.modelValue.includes(z);
    })), R = () => {
      const H = new Set(o.value || []);
      L.value ? $.value.forEach((z) => {
        const ne = n(z, t.idKey);
        H.delete(ne);
      }) : $.value.forEach((z) => {
        const ne = n(z, t.idKey);
        H.add(ne);
      }), o.value = Array.from(H);
    }, X = (H) => {
      const [z] = x();
      z && (H.preventDefault(), z.focus());
    }, G = (H) => {
      H.preventDefault();
      const z = x(), ne = document.activeElement, me = Array.from(z).indexOf(ne);
      if (me !== -1) {
        const ve = (me + 1) % z.length;
        z[ve].focus();
      }
    }, ee = (H) => {
      H.preventDefault();
      const z = x(), ne = document.activeElement, me = Array.from(z).indexOf(ne);
      if (me !== -1) {
        const ve = (me - 1 + z.length) % z.length;
        z[ve].focus();
      }
    }, le = (H) => {
      const z = x(), ne = document.activeElement;
      Array.from(z).indexOf(ne) + 1 === z.length && l.value && !H.shiftKey && P();
    }, se = (H) => {
      var z;
      const ne = document.activeElement;
      H.shiftKey && ne === ((z = l.value) == null ? void 0 : z.$el) && P();
    };
    Ee(() => {
      y();
    });
    const De = _(() => {
      var H;
      const z = ((H = o.value) == null ? void 0 : H.length) ?? 0, ne = z === 0, me = z > 1;
      return ne ? "Sélectionner une option" : `${z} option${me ? "s" : ""} sélectionnée${me ? "s" : ""}`;
    }), Ce = _(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (H, z) => {
      var ne, me;
      return i(), f("div", {
        class: A(["fr-select-group", { [`fr-select-group--${p.value}`]: c.value }])
      }, [
        d("label", {
          class: A(Ce.value),
          for: H.id
        }, [
          B(H.$slots, "label", {}, () => [
            V(v(H.label) + " ", 1),
            B(H.$slots, "required-tip", {}, () => [
              "required" in H.$attrs && H.$attrs.required !== !1 ? (i(), f("span", hd)) : b("", !0)
            ], !0)
          ], !0),
          t.hint || (me = (ne = H.$slots).hint) != null && me.call(ne) ? (i(), f("span", vd, [
            B(H.$slots, "hint", {}, () => [
              V(v(t.hint), 1)
            ], !0)
          ])) : b("", !0)
        ], 10, md),
        ae(je, K({
          id: t.id,
          ref_key: "host",
          ref: l,
          type: "button"
        }, H.$attrs, {
          class: ["fr-select fr-multiselect", {
            "fr-multiselect--is-open": s.value,
            [`fr-select--${p.value}`]: c.value
          }],
          "aria-expanded": s.value,
          "aria-controls": `${t.id}-collapse`,
          onClick: Y,
          onKeydown: J(te(se, ["shift"]), ["tab"])
        }), {
          default: U(() => [
            B(H.$slots, "button-label", {}, () => [
              V(v(t.buttonLabel || De.value), 1)
            ], !0)
          ]),
          _: 3
        }, 16, ["id", "aria-expanded", "aria-controls", "class", "onKeydown"]),
        D.value ? (i(), f("div", {
          key: 0,
          id: `${t.id}-collapse`,
          ref_key: "collapse",
          ref: h,
          style: _e({
            "--width-host": `${u.value}px`
          }),
          class: A(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": F(k), "fr-collapsing": F(T) }]),
          onTransitionend: z[2] || (z[2] = (ve) => F(w)(s.value))
        }, [
          d("p", {
            id: `${H.id}-text-hint`,
            class: "fr-sr-only"
          }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, bd),
          H.selectAll ? (i(), f("ul", yd, [
            d("li", null, [
              ae(je, {
                type: "button",
                name: "select-all",
                secondary: "",
                size: "sm",
                disabled: $.value.length === 0,
                onClick: R,
                onKeydown: J(te(se, ["shift"]), ["tab"])
              }, {
                default: U(() => [
                  d("span", {
                    class: A([
                      "fr-multiselect__search__icon",
                      L.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                    ])
                  }, null, 2),
                  V(" " + v(t.selectAllLabel[L.value ? 1 : 0]), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onKeydown"])
            ])
          ])) : b("", !0),
          t.search ? (i(), f("div", wd, [
            d("div", kd, [
              ae(Ct, {
                modelValue: M.value,
                "onUpdate:modelValue": z[0] || (z[0] = (ve) => M.value = ve),
                "aria-describedby": `${t.id}-text-hint`,
                "aria-controls": `${t.id}-checkboxes`,
                "aria-live": "polite",
                placeholder: "Rechercher",
                type: "text",
                onKeydown: [
                  J(X, ["down"]),
                  J(X, ["right"]),
                  J(se, ["tab"])
                ]
              }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
            ]),
            z[3] || (z[3] = d("div", {
              class: "fr-messages-group",
              "aria-live": "assertive"
            }, null, -1))
          ])) : b("", !0),
          ae(dn, {
            id: `${t.id}-checkboxes`,
            class: "fr-multiselect__collapse__fieldset",
            "aria-live": "polite",
            style: _e({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
            legend: t.legend,
            "legend-id": `${t.id}-checkboxes-legend`
          }, {
            default: U(() => [
              B(H.$slots, "legend", {}, void 0, !0),
              (i(!0), f(Q, null, Z($.value, (ve) => (i(), f("div", {
                key: `${r(ve, H.id, t.idKey)}-checkbox`,
                class: "fr-fieldset__element"
              }, [
                d("div", _d, [
                  ae(Tt, {
                    id: `${r(ve, H.id, t.idKey)}-checkbox`,
                    modelValue: o.value,
                    "onUpdate:modelValue": z[1] || (z[1] = (tr) => o.value = tr),
                    value: n(ve, t.idKey),
                    name: `${r(ve, H.id, t.idKey)}-checkbox`,
                    small: "",
                    onKeydown: [
                      J(G, ["down"]),
                      J(G, ["right"]),
                      J(ee, ["up"]),
                      J(ee, ["left"]),
                      J(le, ["tab"])
                    ]
                  }, {
                    label: U(() => [
                      B(H.$slots, "checkbox-label", {
                        option: ve
                      }, () => [
                        V(v(n(ve, t.labelKey)), 1)
                      ], !0)
                    ]),
                    _: 2
                  }, 1032, ["id", "modelValue", "value", "name"])
                ])
              ]))), 128))
            ]),
            _: 3
          }, 8, ["id", "style", "legend", "legend-id"]),
          $.value.length === 0 ? (i(), f("div", xd, [
            B(H.$slots, "no-results", {}, () => [
              z[4] || (z[4] = V(" Pas de résultat "))
            ], !0)
          ])) : b("", !0)
        ], 46, gd)) : b("", !0),
        c.value ? (i(), f("p", {
          key: 1,
          id: `select-${p.value}-desc-${p.value}`,
          class: A(`fr-${p.value}-text`)
        }, v(c.value), 11, Id)) : b("", !0)
      ], 2);
    };
  }
}), Td = /* @__PURE__ */ ke(Dd, [["__scopeId", "data-v-829d79d0"]]), Cd = ["id", "aria-current"], Ed = /* @__PURE__ */ O({
  __name: "DsfrNavigationItem",
  props: {
    id: { default: () => re("nav", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-nav__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      B(t.$slots, "default", {}, void 0, !0)
    ], 8, Cd));
  }
}), xn = /* @__PURE__ */ ke(Ed, [["__scopeId", "data-v-aa4076c4"]]), Pd = ["href"], Oa = 2, Et = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenuLink",
  props: {
    id: { default: () => re("menu-link") },
    to: { default: "#" },
    text: { default: "" },
    icon: { default: void 0 },
    onClick: { type: Function, default: () => {
    } }
  },
  emits: ["toggleId"],
  setup(a) {
    const t = a, e = _(() => typeof t.to == "string" && t.to.startsWith("http")), n = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = _(
      () => n.value || !t.icon ? void 0 : typeof t.icon == "string" ? { scale: Oa, name: t.icon } : { scale: Oa, ...t.icon || {} }
    ), l = or() ? Qe(ra) : void 0, s = (l == null ? void 0 : l()) ?? (() => {
    });
    return (o, u) => {
      const c = Ie("RouterLink");
      return e.value ? (i(), f("a", {
        key: 0,
        class: "fr-nav__link",
        "data-testid": "nav-external-link",
        href: o.to,
        onClick: u[0] || (u[0] = (p) => {
          o.$emit("toggleId", o.id), o.onClick(p);
        })
      }, v(o.text), 9, Pd)) : (i(), j(c, {
        key: 1,
        class: A(["fr-nav__link", {
          [String(o.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: o.to,
        onClick: u[1] || (u[1] = (p) => {
          var m;
          F(s)(), o.$emit("toggleId", o.id), (m = o.onClick) == null || m.call(o, p);
        })
      }, {
        default: U(() => [
          o.icon && r.value ? (i(), j(ye, Te(K({ key: 0 }, r.value)), null, 16)) : b("", !0),
          V(" " + v(o.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), Ld = { class: "fr-col-12 fr-col-lg-3" }, Md = { class: "fr-mega-menu__category" }, Bd = { class: "fr-mega-menu__list" }, In = /* @__PURE__ */ O({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ld, [
      d("h5", Md, [
        d("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: e[0] || (e[0] = te(() => {
          }, ["prevent"]))
        }, v(t.title), 1)
      ]),
      d("ul", Bd, [
        (i(!0), f(Q, null, Z(t.links, (n, r) => (i(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          ae(Et, K({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), Sd = ["aria-expanded", "aria-current", "aria-controls"], $d = ["id"], Ad = { class: "fr-container fr-container--fluid fr-container-lg" }, Od = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Rd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, Fd = { class: "fr-mega-menu__leader" }, Vd = { class: "fr-h4 fr-mb-2v" }, Nd = { class: "fr-hidden fr-displayed-lg" }, qd = /* @__PURE__ */ O({
  __name: "DsfrNavigationMegaMenu",
  props: {
    id: { default: () => re("mega-menu") },
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
    } = $e(), o = _(() => t.id === t.expandedId);
    return de(o, (u, c) => {
      u !== c && l(u);
    }), ge(() => {
      o.value && l(!0);
    }), (u, c) => {
      const p = Ie("RouterLink");
      return i(), f(Q, null, [
        d("button", {
          class: "fr-nav__btn",
          "aria-expanded": o.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: c[0] || (c[0] = (m) => u.$emit("toggleId", u.id))
        }, v(u.title), 9, Sd),
        d("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: A(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": F(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(n)
          }]),
          tabindex: "-1",
          onTransitionend: c[2] || (c[2] = (m) => F(s)(o.value))
        }, [
          d("div", Ad, [
            d("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: c[1] || (c[1] = (m) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            d("div", Od, [
              d("div", Rd, [
                d("div", Fd, [
                  d("h4", Vd, v(u.title), 1),
                  d("p", Nd, [
                    V(v(u.description) + " ", 1),
                    B(u.$slots, "description", {}, void 0, !0)
                  ]),
                  ae(p, {
                    class: "fr-link fr-icon-arrow-right-line fr-link--icon-right fr-link--align-on-content",
                    to: u.link.to
                  }, {
                    default: U(() => [
                      V(v(u.link.text), 1)
                    ]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]),
              B(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(Q, null, Z(u.menus, (m, h) => (i(), j(In, K({
                key: h,
                ref_for: !0
              }, m), null, 16))), 128))
            ])
          ])
        ], 42, $d)
      ], 64);
    };
  }
}), Dn = /* @__PURE__ */ ke(qd, [["__scopeId", "data-v-1e103394"]]), jd = ["id", "aria-current"], Tn = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenuItem",
  props: {
    id: { default: () => re("menu", "item") },
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      id: t.id,
      class: "fr-menu__item",
      "aria-current": t.active ? "page" : void 0
    }, [
      B(t.$slots, "default")
    ], 8, jd));
  }
}), Hd = ["aria-expanded", "aria-current", "aria-controls"], Wd = ["id"], Kd = { class: "fr-menu__list" }, Cn = /* @__PURE__ */ O({
  __name: "DsfrNavigationMenu",
  props: {
    id: { default: () => re("menu") },
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
    } = $e(), o = _(() => t.id === t.expandedId);
    return de(o, (u, c) => {
      u !== c && l(u);
    }), ge(() => {
      o.value && l(!0);
    }), (u, c) => (i(), f(Q, null, [
      d("button", {
        class: "fr-nav__btn",
        "aria-expanded": o.value,
        "aria-current": u.active || void 0,
        "aria-controls": u.id,
        onClick: c[0] || (c[0] = (p) => u.$emit("toggleId", u.id))
      }, [
        d("span", null, v(u.title), 1)
      ], 8, Hd),
      d("div", {
        id: u.id,
        ref_key: "collapse",
        ref: e,
        class: A(["fr-collapse fr-menu", { "fr-collapse--expanded": F(r), "fr-collapsing": F(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: c[2] || (c[2] = (p) => F(s)(o.value))
      }, [
        d("ul", Kd, [
          B(u.$slots, "default"),
          (i(!0), f(Q, null, Z(u.links, (p, m) => (i(), j(Tn, { key: m }, {
            default: U(() => [
              ae(Et, K({ ref_for: !0 }, p, {
                onToggleId: c[1] || (c[1] = (h) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Wd)
    ], 64));
  }
}), Qd = ["id", "aria-label"], Yd = { class: "fr-nav__list" }, zd = /* @__PURE__ */ O({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => re("nav") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(a) {
    const t = a, e = W(void 0), n = (o) => {
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
    return ge(() => {
      document.addEventListener("click", l), document.addEventListener("keydown", s);
    }), Ee(() => {
      document.removeEventListener("click", l), document.removeEventListener("keydown", s);
    }), (o, u) => (i(), f("nav", {
      id: o.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": o.label
    }, [
      d("ul", Yd, [
        B(o.$slots, "default"),
        (i(!0), f(Q, null, Z(o.navItems, (c, p) => (i(), j(xn, {
          id: c.id,
          key: p
        }, {
          default: U(() => [
            c.to && c.text ? (i(), j(Et, K({
              key: 0,
              ref_for: !0
            }, c, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : c.title && c.links ? (i(), j(Cn, K({
              key: 1,
              ref_for: !0
            }, c, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : c.title && c.menus ? (i(), j(Dn, K({
              key: 2,
              ref_for: !0
            }, c, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (m) => n(m))
            }), null, 16, ["expanded-id"])) : b("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, Qd));
  }
}), Gd = { class: "fr-container" }, Xd = { class: "fr-notice__body" }, Ud = { class: "fr-notice__title" }, Zd = { class: "fr-notice__desc" }, Jd = /* @__PURE__ */ O({
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
      class: A(["fr-notice", `fr-notice--${t.type}`])
    }, [
      d("div", Gd, [
        d("div", Xd, [
          d("p", null, [
            d("span", Ud, [
              B(t.$slots, "default", {}, () => [
                V(v(t.title), 1)
              ])
            ]),
            d("span", Zd, [
              B(t.$slots, "desc", {}, () => [
                V(v(t.desc), 1)
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
}), ec = ["aria-label"], tc = { class: "fr-content-media__img" }, ac = ["src", "alt", "title", "ratio"], nc = { class: "fr-content-media__caption" }, rc = /* @__PURE__ */ O({
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
      class: A(["fr-content-media", {
        "fr-content-media--sm": t.size === "small",
        "fr-content-media--lg": t.size === "large"
      }]),
      role: "group",
      "aria-label": t.legend
    }, [
      d("div", tc, [
        B(t.$slots, "default", {}, () => [
          t.src ? (i(), f("img", {
            key: 0,
            src: t.src,
            class: A(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
            alt: t.alt,
            title: t.title,
            ratio: t.ratio
          }, null, 10, ac)) : b("", !0)
        ])
      ]),
      d("figcaption", nc, v(t.legend), 1)
    ], 10, ec));
  }
}), lc = { class: "fr-quote fr-quote--column" }, sc = ["cite"], oc = { class: "fr-quote__author" }, ic = { class: "fr-quote__source" }, uc = ["href"], dc = {
  key: 0,
  class: "fr-quote__image"
}, cc = ["src"], fc = /* @__PURE__ */ O({
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
    return (t, e) => (i(), f("figure", lc, [
      t.source ? (i(), f("blockquote", {
        key: 0,
        cite: t.sourceUrl
      }, [
        d("p", null, "« " + v(t.quote) + " »", 1)
      ], 8, sc)) : b("", !0),
      d("figcaption", null, [
        d("p", oc, v(t.author), 1),
        d("ul", ic, [
          d("li", null, [
            d("cite", null, v(t.source), 1)
          ]),
          (i(!0), f(Q, null, Z(t.details, (n, r) => (i(), f("li", { key: r }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, v(n.label), 9, uc)) : (i(), f(Q, { key: 1 }, [
              V(v(n), 1)
            ], 64))
          ]))), 128))
        ]),
        t.quoteImage ? (i(), f("div", dc, [
          d("img", {
            src: t.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, cc)
        ])) : b("", !0)
      ])
    ]));
  }
}), pc = ["id", "name", "value", "checked", "disabled"], mc = ["for"], hc = {
  key: 0,
  class: "required"
}, vc = {
  key: 0,
  class: "fr-hint-text"
}, gc = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, bc = ["src", "title"], yc = { key: 0 }, wc = ["href"], kc = ["href"], _c = ["href"], En = /* @__PURE__ */ O({
  __name: "DsfrRadioButton",
  props: {
    id: { default: () => re("basic", "radio") },
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
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = _(() => !!t.img || !!t.svgPath);
    return (r, l) => (i(), f("div", {
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      d("div", {
        class: A(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": r.small
        }])
      }, [
        d("input", K({
          id: r.id,
          type: "radio",
          name: r.name,
          value: r.value,
          checked: r.modelValue === r.value,
          disabled: r.disabled
        }, r.$attrs, {
          onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
        }), null, 16, pc),
        d("label", {
          for: r.id,
          class: "fr-label"
        }, [
          B(r.$slots, "label", {}, () => [
            V(v(r.label) + " ", 1),
            B(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (i(), f("span", hc, " *")) : b("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", vc, v(r.hint), 1)) : b("", !0)
        ], 8, mc),
        r.img || r.svgPath ? (i(), f("div", gc, [
          r.img ? (i(), f("img", {
            key: 0,
            src: r.img,
            class: "fr-artwork",
            alt: "",
            title: r.imgTitle
          }, null, 8, bc)) : (i(), f("svg", K({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...e, ...r.svgAttrs }), [
            r.imgTitle ? (i(), f("title", yc, v(r.imgTitle), 1)) : b("", !0),
            d("use", {
              class: "fr-artwork-decorative",
              href: `${r.svgPath}#artwork-decorative`
            }, null, 8, wc),
            d("use", {
              class: "fr-artwork-minor",
              href: `${r.svgPath}#artwork-minor`
            }, null, 8, kc),
            d("use", {
              class: "fr-artwork-major",
              href: `${r.svgPath}#artwork-major`
            }, null, 8, _c)
          ], 16))
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), xc = { class: "fr-form-group" }, Ic = ["disabled", "aria-labelledby", "aria-invalid", "role"], Dc = ["id"], Tc = {
  key: 0,
  class: "fr-hint-text"
}, Cc = {
  key: 0,
  class: "required"
}, Ec = ["id"], Pc = /* @__PURE__ */ O({
  __name: "DsfrRadioButtonSet",
  props: {
    titleId: { default: () => re("radio-button", "group") },
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
    const e = a, n = t, r = _(() => e.errorMessage || e.validMessage), l = _(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), s = (u) => {
      u !== e.modelValue && n("update:modelValue", u);
    }, o = _(() => r.value ? `${e.titleId} messages-${e.titleId}` : e.titleId);
    return (u, c) => (i(), f("div", xc, [
      d("fieldset", {
        class: A(["fr-fieldset", {
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
          B(u.$slots, "legend", {}, () => [
            V(v(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Tc, [
              B(u.$slots, "hint", {}, () => [
                V(v(u.hint), 1)
              ])
            ])) : b("", !0),
            B(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Cc, " *")) : b("", !0)
            ])
          ])
        ], 8, Dc)) : b("", !0),
        B(u.$slots, "default", {}, () => [
          (i(!0), f(Q, null, Z(u.options, (p, m) => (i(), j(En, K({
            key: typeof p.value == "boolean" ? m : p.value || m,
            name: u.name,
            "aria-disabled": p.disabled,
            ref_for: !0
          }, p, {
            small: u.small,
            inline: u.inline,
            "model-value": u.modelValue,
            "onUpdate:modelValue": c[0] || (c[0] = (h) => s(h))
          }), null, 16, ["name", "aria-disabled", "small", "inline", "model-value"]))), 128))
        ]),
        r.value ? (i(), f("div", {
          key: 1,
          id: `messages-${u.titleId}`,
          class: "fr-messages-group",
          "aria-live": "assertive",
          role: "alert"
        }, [
          d("p", {
            class: A(["fr-message fr-message--info flex items-center", l.value])
          }, v(r.value), 3)
        ], 8, Ec)) : b("", !0)
      ], 10, Ic)
    ]));
  }
}), Lc = ["id"], Mc = ["id"], Bc = { class: "fr-hint-text" }, Sc = ["data-fr-prefix", "data-fr-suffix"], $c = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Ac = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Oc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Rc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Fc = ["id"], Vc = ["id"], Nc = /* @__PURE__ */ O({
  __name: "DsfrRange",
  props: {
    id: { default: () => re("range") },
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
    const e = a, n = t, r = W(), l = W(), s = W(), o = _(() => e.lowerValue !== void 0), u = _(() => e.lowerValue === void 0 ? `transform: translateX(${(e.modelValue - e.min) / (e.max - e.min) * s.value}px) translateX(-${e.modelValue}%);` : `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * s.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`), c = _(() => {
      const m = (e.modelValue - e.min) / (e.max - e.min) * s.value - (o.value ? 12 : 0), h = ((e.lowerValue ?? 0) - e.min) / (e.max - e.min) * s.value;
      return {
        "--progress-right": `${m + 24}px`,
        ...o.value ? { "--progress-left": `${h + 12}px` } : {}
      };
    });
    de([() => e.modelValue, () => e.lowerValue], ([m, h]) => {
      h !== void 0 && (o.value && m < h && n("update:lowerValue", m), o.value && h > m && n("update:modelValue", h));
    });
    const p = _(() => (e.prefix ?? "").concat(o.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return ge(() => {
      var m;
      s.value = (m = r.value) == null ? void 0 : m.offsetWidth;
    }), (m, h) => (i(), f("div", {
      id: `${m.id}-group`,
      class: A(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      d("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        B(m.$slots, "label", {}, () => [
          V(v(m.label), 1)
        ]),
        d("span", Bc, [
          B(m.$slots, "hint", {}, () => [
            V(v(m.hint), 1)
          ])
        ])
      ], 8, Mc),
      d("div", {
        class: A(["fr-range", {
          "fr-range--sm": m.small,
          "fr-range--double": o.value,
          "fr-range-group--disabled": m.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": m.prefix ?? void 0,
        "data-fr-suffix": m.suffix ?? void 0,
        style: _e(c.value)
      }, [
        d("span", {
          ref_key: "output",
          ref: l,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: _e(u.value)
        }, v(p.value), 5),
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
          onInput: h[0] || (h[0] = (T) => {
            var k;
            return n("update:lowerValue", +((k = T.target) == null ? void 0 : k.value));
          })
        }, null, 40, $c)) : b("", !0),
        d("input", {
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
          onInput: h[1] || (h[1] = (T) => {
            var k;
            return n("update:modelValue", +((k = T.target) == null ? void 0 : k.value));
          })
        }, null, 40, Ac),
        m.hideIndicators ? b("", !0) : (i(), f("span", Oc, v(m.min), 1)),
        m.hideIndicators ? b("", !0) : (i(), f("span", Rc, v(m.max), 1))
      ], 14, Sc),
      m.message || m.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${m.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        B(m.$slots, "messages", {}, () => [
          m.message ? (i(), f("p", {
            key: 0,
            id: `${m.id}-message-error`,
            class: "fr-message fr-message--error"
          }, v(m.message), 9, Vc)) : b("", !0)
        ])
      ], 8, Fc)) : b("", !0)
    ], 10, Lc));
  }
}), qc = { class: "fr-segmented__element" }, jc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Hc = ["for"], Wc = { key: 1 }, Pn = /* @__PURE__ */ O({
  __name: "DsfrSegmented",
  props: {
    id: { default: () => re("segmented") },
    name: { default: void 0 },
    modelValue: { default: "" },
    value: {},
    label: { default: "" },
    disabled: { type: Boolean },
    icon: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(a) {
    const t = a, e = _(() => typeof t.icon == "string" ? { name: t.icon } : t.icon), n = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : "");
    return (r, l) => (i(), f("div", qc, [
      d("input", K({
        id: r.id,
        type: "radio",
        name: r.name,
        value: r.value,
        checked: r.modelValue === r.value,
        disabled: r.disabled,
        "aria-disabled": r.disabled
      }, r.$attrs, {
        onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
      }), null, 16, jc),
      d("label", {
        for: r.id,
        class: A(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (i(), j(ye, Te(K({ key: 0 }, e.value)), null, 16)) : b("", !0),
        r.icon ? (i(), f("span", Wc, " ")) : b("", !0),
        V(" " + v(r.label), 1)
      ], 10, Hc)
    ]));
  }
}), Kc = { class: "fr-form-group" }, Qc = ["disabled"], Yc = ["id"], zc = {
  key: 0,
  class: "fr-hint-text"
}, Gc = { class: "fr-segmented__elements" }, Xc = /* @__PURE__ */ O({
  __name: "DsfrSegmentedSet",
  props: {
    titleId: { default: () => re("segmented-button", "set") },
    disabled: { type: Boolean },
    small: { type: Boolean },
    inline: { type: Boolean },
    name: { default: () => re("segmented-button", "set") },
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
    return (l, s) => (i(), f("div", Kc, [
      d("fieldset", {
        class: A(["fr-segmented", {
          "fr-segmented--sm": l.small,
          "fr-segmented--no-legend": !l.legend
        }]),
        disabled: l.disabled
      }, [
        l.legend ? (i(), f("legend", {
          key: 0,
          id: l.titleId,
          class: A(["fr-segmented__legend", {
            "fr-segmented__legend--inline": l.inline
          }])
        }, [
          B(l.$slots, "legend", {}, () => [
            V(v(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", zc, v(l.hint), 1)) : b("", !0)
        ], 10, Yc)) : b("", !0),
        d("div", Gc, [
          B(l.$slots, "default", {}, () => [
            (i(!0), f(Q, null, Z(l.options, (o, u) => (i(), j(Pn, K({
              key: o.value || u,
              name: l.name || o.name,
              ref_for: !0
            }, { ...o, disabled: l.disabled || o.disabled }, {
              "model-value": l.modelValue,
              "onUpdate:modelValue": s[0] || (s[0] = (c) => r(c))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Qc)
    ]));
  }
}), Uc = ["for"], Zc = {
  key: 0,
  class: "required"
}, Jc = {
  key: 0,
  class: "fr-hint-text"
}, ef = ["id", "name", "disabled", "aria-disabled", "required"], tf = ["selected"], af = ["selected", "value", "disabled", "aria-disabled"], nf = ["id"], rf = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => re("select") },
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
    const e = _(() => t.errorMessage || t.successMessage), n = _(() => t.errorMessage ? "error" : "valid");
    return (r, l) => (i(), f("div", {
      class: A(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      d("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        B(r.$slots, "label", {}, () => [
          V(v(r.label) + " ", 1),
          B(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", Zc, " *")) : b("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", Jc, v(r.hint ?? r.description), 1)) : b("", !0)
      ], 8, Uc),
      d("select", K({
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
        d("option", {
          selected: !r.options.some((s) => typeof s != "object" || s === null ? s === r.modelValue : s.value === r.modelValue),
          disabled: "",
          hidden: ""
        }, v(r.defaultUnselectedText), 9, tf),
        (i(!0), f(Q, null, Z(r.options, (s, o) => (i(), f("option", {
          key: o,
          selected: r.modelValue === s || typeof s == "object" && s.value === r.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, v(typeof s == "object" ? s.text : s), 9, af))), 128))
      ], 16, ef),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: A(`fr-${n.value}-text`)
      }, v(e.value), 11, nf)) : b("", !0)
    ], 2));
  }
}), lf = { class: "fr-share" }, sf = { class: "fr-share__title" }, of = { class: "fr-btns-group" }, uf = ["title", "href", "onClick"], df = { key: 0 }, cf = ["href", "title"], ff = ["title"], pf = /* @__PURE__ */ O({
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
      return i(), f("div", lf, [
        d("p", sf, v(n.title), 1),
        d("ul", of, [
          (i(!0), f(Q, null, Z(n.networks, (s, o) => (i(), f("li", { key: o }, [
            d("a", {
              class: A(`fr-btn fr-btn--${s.name}`),
              title: `${s.label} - nouvelle fenêtre`,
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: te((u) => e(s), ["prevent"])
            }, v(s.label), 11, uf)
          ]))), 128)),
          (l = n.mail) != null && l.to ? (i(), f("li", df, [
            d("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, v(n.mail.label), 9, cf)
          ])) : b("", !0),
          d("li", null, [
            d("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: r[0] || (r[0] = (s) => t())
            }, v(n.copyLabel), 9, ff)
          ])
        ])
      ]);
    };
  }
}), mf = ["aria-current", "aria-expanded", "aria-controls"], Ln = /* @__PURE__ */ O({
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
      B(t.$slots, "default")
    ], 8, mf));
  }
}), Mn = /* @__PURE__ */ O({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      class: A(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      B(t.$slots, "default")
    ], 2));
  }
}), hf = ["id"], vf = { class: "fr-sidemenu__list" }, Bn = /* @__PURE__ */ O({
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
    } = $e();
    de(() => t.expanded, (p, m) => {
      p !== m && l(p);
    }), ge(() => {
      t.expanded && l(!0);
    });
    const o = (p) => typeof p == "string" && p.startsWith("http"), u = (p) => o(p) ? "a" : "RouterLink", c = (p) => ({ [o(p) ? "href" : "to"]: p });
    return (p, m) => {
      const h = Ie("DsfrSideMenuList", !0);
      return i(), f("div", {
        id: p.id,
        ref_key: "collapse",
        ref: e,
        class: A({
          "fr-collapse": p.collapsable,
          "fr-collapsing": F(n),
          "fr-collapse--expanded": F(r)
        }),
        onTransitionend: m[2] || (m[2] = (T) => F(s)(!!p.expanded, p.focusOnExpanding))
      }, [
        d("ul", vf, [
          B(p.$slots, "default"),
          (i(!0), f(Q, null, Z(p.menuItems, (T, k) => (i(), j(Mn, {
            key: k,
            active: T.active
          }, {
            default: U(() => [
              T.menuItems ? b("", !0) : (i(), j(be(u(T.to)), K({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": T.active ? "page" : void 0,
                ref_for: !0
              }, c(T.to)), {
                default: U(() => [
                  V(v(T.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              T.menuItems ? (i(), f(Q, { key: 1 }, [
                ae(Ln, {
                  active: !!T.active,
                  expanded: !!T.expanded,
                  "control-id": T.id,
                  onToggleExpand: m[0] || (m[0] = (S) => p.$emit("toggleExpand", S))
                }, {
                  default: U(() => [
                    V(v(T.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                T.menuItems ? (i(), j(h, {
                  key: 0,
                  id: T.id,
                  collapsable: "",
                  expanded: T.expanded,
                  "menu-items": T.menuItems,
                  onToggleExpand: m[1] || (m[1] = (S) => p.$emit("toggleExpand", S))
                }, null, 8, ["id", "expanded", "menu-items"])) : b("", !0)
              ], 64)) : b("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, hf);
    };
  }
}), gf = ["aria-labelledby"], bf = { class: "fr-sidemenu__inner" }, yf = ["aria-controls", "aria-expanded"], wf = ["id"], kf = /* @__PURE__ */ O({
  __name: "DsfrSideMenu",
  props: {
    buttonLabel: { default: "Dans cette rubrique" },
    id: { default: () => re("sidemenu") },
    sideMenuListId: { default: () => re("sidemenu", "list") },
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
    } = $e(), s = W(!1);
    return de(s, (o, u) => {
      o !== u && r(o);
    }), (o, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": o.id
    }, [
      d("div", bf, [
        d("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": o.id,
          "aria-expanded": s.value,
          onClick: u[0] || (u[0] = te((c) => s.value = !s.value, ["prevent", "stop"]))
        }, v(o.buttonLabel), 9, yf),
        d("div", {
          id: o.id,
          ref_key: "collapse",
          ref: t,
          class: A(["fr-collapse", {
            "fr-collapse--expanded": F(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": F(e)
          }]),
          onTransitionend: u[2] || (u[2] = (c) => F(l)(s.value, o.focusOnExpanding))
        }, [
          (i(), j(be(o.titleTag), { class: "fr-sidemenu__title" }, {
            default: U(() => [
              V(v(o.headingTitle), 1)
            ]),
            _: 1
          })),
          B(o.$slots, "default", {}, () => [
            ae(Bn, {
              id: o.sideMenuListId,
              "menu-items": o.menuItems,
              onToggleExpand: u[1] || (u[1] = (c) => o.$emit("toggleExpand", c))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, wf)
      ])
    ], 8, gf));
  }
}), _f = /* @__PURE__ */ O({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const t = a, e = _(() => typeof t.to == "string" && t.to.startsWith("http")), n = _(() => e.value ? "a" : "RouterLink"), r = _(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, s) => (i(), j(be(n.value), K({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: U(() => [
        B(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), xf = { class: "fr-skiplinks" }, If = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, Df = { class: "fr-skiplinks__list" }, Tf = ["href", "onClick"], Cf = /* @__PURE__ */ O({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(a) {
    const t = (e) => {
      const n = document.getElementById(e);
      n == null || n.focus();
    };
    return (e, n) => (i(), f("div", xf, [
      d("nav", If, [
        d("ul", Df, [
          (i(!0), f(Q, null, Z(e.links, (r) => (i(), f("li", {
            key: r.id
          }, [
            d("a", {
              class: "fr-link",
              href: `#${r.id}`,
              onClick: (l) => t(r.id)
            }, v(r.text), 9, Tf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Ef = { class: "fr-stepper" }, Pf = { class: "fr-stepper__title" }, Lf = { class: "fr-stepper__state" }, Mf = ["data-fr-current-step", "data-fr-steps"], Bf = { class: "fr-stepper__details" }, Sf = {
  key: 0,
  class: "fr-text--bold"
}, $f = /* @__PURE__ */ O({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ef, [
      d("h2", Pf, [
        V(v(t.steps[t.currentStep - 1]) + " ", 1),
        d("span", Lf, "Étape " + v(t.currentStep) + " sur " + v(t.steps.length), 1)
      ]),
      d("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, Mf),
      d("p", Bf, [
        t.currentStep < t.steps.length ? (i(), f("span", Sf, "Étape suivante :")) : b("", !0),
        V(" " + v(t.steps[t.currentStep]), 1)
      ])
    ]));
  }
}), Af = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, Of = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, Rf = { class: "fr-summary__list" }, Ff = ["href"], Vf = /* @__PURE__ */ O({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("nav", Af, [
      d("h2", Of, v(t.title), 1),
      d("ol", Rf, [
        (i(!0), f(Q, null, Z(t.anchors, (n, r) => (i(), f("li", { key: r }, [
          d("a", {
            class: "fr-summary__link",
            href: n.link
          }, v(n.name), 9, Ff)
        ]))), 128))
      ])
    ]));
  }
}), Nf = ["id", "aria-labelledby", "tabindex"], qf = /* @__PURE__ */ O({
  __name: "DsfrTabContent",
  props: {
    panelId: {},
    tabId: {}
  },
  setup(a) {
    zt((u) => ({
      "7152af7e": s.value,
      "2a62e962": o.value
    }));
    const t = a, e = { true: "100%", false: "-100%" }, n = Qe(It), { isVisible: r, asc: l } = n(st(() => t.tabId)), s = _(() => e[String(l == null ? void 0 : l.value)]), o = _(() => e[String(!(l != null && l.value))]);
    return (u, c) => (i(), j(fr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: U(() => [
        Se(d("div", {
          id: u.panelId,
          class: A(["fr-tabs__panel", {
            "fr-tabs__panel--selected": F(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: F(r) ? 0 : -1
        }, [
          B(u.$slots, "default", {}, void 0, !0)
        ], 10, Nf), [
          [pr, F(r)]
        ])
      ]),
      _: 3
    }));
  }
}), Sn = /* @__PURE__ */ ke(qf, [["__scopeId", "data-v-5774b16c"]]), jf = { role: "presentation" }, Hf = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Wf = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, $n = /* @__PURE__ */ O({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = W(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      Home: "first",
      End: "last"
    };
    function s(p) {
      const m = p == null ? void 0 : p.key, h = l[m];
      h && n(h);
    }
    const o = Qe(It), { isVisible: u } = o(st(() => e.tabId)), c = ir("button");
    return de(u, () => {
      var p;
      u.value && ((p = c.value) == null || p.focus());
    }), (p, m) => (i(), f("li", jf, [
      d("button", {
        id: p.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${p.tabId}`,
        class: "fr-tabs__tab",
        tabindex: F(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": F(u),
        "aria-controls": p.panelId,
        onClick: m[0] || (m[0] = te((h) => p.$emit("click", p.tabId), ["prevent"])),
        onKeydown: m[1] || (m[1] = (h) => s(h))
      }, [
        p.icon ? (i(), f("span", Wf, [
          ae(ye, { name: p.icon }, null, 8, ["name"])
        ])) : b("", !0),
        B(p.$slots, "default")
      ], 40, Hf)
    ]));
  }
}), An = /* @__PURE__ */ O({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = _(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", K(r.headerAttrs, { scope: "col" }), [
      V(v(r.header) + " ", 1),
      r.icon && !e.value ? (i(), j(ye, Te(K({ key: 0 }, n.value)), null, 16)) : b("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: A({ [String(r.icon)]: e.value })
      }, null, 2)) : b("", !0)
    ], 16));
  }
}), Kf = { key: 0 }, On = /* @__PURE__ */ O({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (t, e) => t.headers ? (i(), f("tr", Kf, [
      (i(!0), f(Q, null, Z(t.headers, (n, r) => (i(), j(An, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : b("", !0);
  }
}), Rn = /* @__PURE__ */ O({
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
    const t = a, e = _(() => typeof t.field == "object" && t.field !== null && t.field.component ? t.field.component : !1), n = _(() => ["string", "number", "boolean"].includes(typeof t.field));
    return (r, l) => (i(), f("td", Te(wt(r.cellAttrs)), [
      e.value ? (i(), j(be(e.value), Te(K({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: U(() => [
          V(v(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(Q, { key: 1 }, [
        V(v(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Fn = /* @__PURE__ */ O({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (t, e) => (i(), f("tr", Te(wt(t.rowAttrs)), [
      B(t.$slots, "default"),
      (i(!0), f(Q, null, Z(t.rowData, (n, r) => (i(), j(Rn, {
        key: r,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Qf = { class: "caption" }, Yf = { key: 1 }, zf = ["colspan"], Gf = { class: "flex justify-right" }, Xf = { class: "self-center" }, Uf = ["for"], Zf = ["id"], Jf = ["value"], ep = {
  class: "flex ml-1",
  "aria-live": "polite",
  "aria-atomic": "true"
}, tp = { class: "self-center fr-m-0" }, ap = { class: "flex ml-1" }, np = /* @__PURE__ */ O({
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
    const e = a, n = t, r = (x) => Array.isArray(x) ? x : x.rowData, l = W(e.currentPage), s = re("resultPerPage"), o = W(e.resultsDisplayed), u = _(
      () => e.rows.length > o.value ? Math.ceil(e.rows.length / o.value) : 1
    ), c = [5, 10, 25, 50, 100], p = () => l.value * o.value - o.value, m = () => l.value * o.value, h = _(() => e.pagination ? e.rows.slice(p(), m()) : e.rows), T = () => {
      l.value = 1, n("update:currentPage");
    }, k = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, S = () => {
      l.value < u.value && (l.value += 1, n("update:currentPage"));
    }, w = () => {
      l.value = u.value, n("update:currentPage");
    };
    return (x, D) => (i(), f("div", {
      class: A(["fr-table", { "fr-table--no-caption": x.noCaption }])
    }, [
      d("table", null, [
        d("caption", Qf, v(x.title), 1),
        d("thead", null, [
          B(x.$slots, "header", {}, () => [
            x.headers && x.headers.length ? (i(), j(On, {
              key: 0,
              headers: x.headers
            }, null, 8, ["headers"])) : b("", !0)
          ], !0)
        ]),
        d("tbody", null, [
          B(x.$slots, "default", {}, void 0, !0),
          x.rows && x.rows.length ? (i(!0), f(Q, { key: 0 }, Z(h.value, (M, g) => (i(), j(Fn, {
            key: x.rowKey && r(M) ? typeof x.rowKey == "string" ? r(M)[x.headers.indexOf(x.rowKey)].toString() : x.rowKey(r(M)) : g,
            "row-data": r(M),
            "row-attrs": "rowAttrs" in M ? M.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : b("", !0),
          x.pagination ? (i(), f("tr", Yf, [
            d("td", {
              colspan: x.headers.length
            }, [
              d("div", Gf, [
                d("div", Xf, [
                  d("label", { for: F(s) }, "Résultats par page : ", 8, Uf),
                  Se(d("select", {
                    id: F(s),
                    "onUpdate:modelValue": D[0] || (D[0] = (M) => o.value = M),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: D[1] || (D[1] = (M) => n("update:currentPage"))
                  }, [
                    (i(), f(Q, null, Z(c, (M, g) => d("option", {
                      key: g,
                      value: M
                    }, v(M), 9, Jf)), 64))
                  ], 40, Zf), [
                    [Xt, o.value]
                  ])
                ]),
                d("div", ep, [
                  d("p", tp, " Page " + v(l.value) + " sur " + v(u.value), 1)
                ]),
                d("div", ap, [
                  d("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: D[2] || (D[2] = (M) => T())
                  }, D[6] || (D[6] = [
                    d("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  d("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: D[3] || (D[3] = (M) => k())
                  }, D[7] || (D[7] = [
                    d("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  d("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: D[4] || (D[4] = (M) => S())
                  }, D[8] || (D[8] = [
                    d("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  d("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: D[5] || (D[5] = (M) => w())
                  }, D[9] || (D[9] = [
                    d("span", { class: "fr-sr-only" }, "Dernière page du tableau", -1)
                  ]))
                ])
              ])
            ], 8, zf)
          ])) : b("", !0)
        ])
      ])
    ], 2));
  }
}), rp = /* @__PURE__ */ ke(np, [["__scopeId", "data-v-129bf2b7"]]), lp = ["aria-label"], sp = /* @__PURE__ */ O({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = W(!1), s = _({
      get: () => n.modelValue,
      set(g) {
        r("update:modelValue", g);
      }
    }), o = W(/* @__PURE__ */ new Map()), u = W(0);
    Re(It, (g) => {
      const C = W(!0);
      if (de(s, (N, P) => {
        C.value = N > P;
      }), [...o.value.values()].includes(g.value))
        return { isVisible: _(() => o.value.get(s.value) === g.value), asc: C };
      const E = u.value++;
      o.value.set(E, g.value);
      const I = _(() => E === s.value);
      return de(g, () => {
        o.value.set(E, g.value);
      }), Ee(() => {
        o.value.delete(E);
      }), { isVisible: I };
    });
    const c = W(null), p = W(null), m = ur({}), h = (g) => {
      if (m[g])
        return m[g];
      const C = re("tab");
      return m[g] = C, C;
    }, T = async () => {
      const g = s.value === 0 ? n.tabTitles.length - 1 : s.value - 1;
      l.value = !1, s.value = g;
    }, k = async () => {
      const g = s.value === n.tabTitles.length - 1 ? 0 : s.value + 1;
      l.value = !0, s.value = g;
    }, S = async () => {
      s.value = 0;
    }, w = async () => {
      s.value = n.tabTitles.length - 1;
    }, x = W({ "--tabs-height": "100px" }), D = () => {
      var g;
      if (s.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const C = p.value.offsetHeight, E = (g = c.value) == null ? void 0 : g.querySelectorAll(".fr-tabs__panel")[s.value];
      if (!E || !E.offsetHeight)
        return;
      const I = E.offsetHeight;
      x.value["--tabs-height"] = `${C + I}px`;
    }, M = W(null);
    return ge(() => {
      var g;
      window.ResizeObserver && (M.value = new window.ResizeObserver(() => {
        D();
      })), (g = c.value) == null || g.querySelectorAll(".fr-tabs__panel").forEach((C) => {
        var E;
        C && ((E = M.value) == null || E.observe(C));
      });
    }), Ee(() => {
      var g;
      (g = c.value) == null || g.querySelectorAll(".fr-tabs__panel").forEach((C) => {
        var E;
        C && ((E = M.value) == null || E.unobserve(C));
      });
    }), t({
      renderTabs: D,
      selectFirst: S,
      selectLast: w
    }), (g, C) => (i(), f("div", {
      ref_key: "$el",
      ref: c,
      class: "fr-tabs",
      style: _e(x.value)
    }, [
      d("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": g.tabListName
      }, [
        B(g.$slots, "tab-items", {}, () => [
          (i(!0), f(Q, null, Z(g.tabTitles, (E, I) => (i(), j($n, {
            key: I,
            icon: E.icon,
            "panel-id": E.panelId || `${h(I)}-panel`,
            "tab-id": E.tabId || h(I),
            onClick: (N) => s.value = I,
            onNext: C[0] || (C[0] = (N) => k()),
            onPrevious: C[1] || (C[1] = (N) => T()),
            onFirst: C[2] || (C[2] = (N) => S()),
            onLast: C[3] || (C[3] = (N) => w())
          }, {
            default: U(() => [
              V(v(E.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, lp),
      (i(!0), f(Q, null, Z(g.tabContents, (E, I) => {
        var N, P, Y, y;
        return i(), j(Sn, {
          key: I,
          "panel-id": ((P = (N = g.tabTitles) == null ? void 0 : N[I]) == null ? void 0 : P.panelId) || `${h(I)}-panel`,
          "tab-id": ((y = (Y = g.tabTitles) == null ? void 0 : Y[I]) == null ? void 0 : y.tabId) || h(I)
        }, {
          default: U(() => [
            V(v(E), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      B(g.$slots, "default")
    ], 4));
  }
}), op = /* @__PURE__ */ O({
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
    const t = a, e = _(() => typeof t.link == "string" && t.link.startsWith("http")), n = _(() => t.link ? e.value ? "a" : "RouterLink" : t.disabled && t.tagName === "p" || t.selectable ? "button" : t.tagName), r = _(() => ({ [e.value ? "href" : "to"]: t.link })), l = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), s = t.small ? 0.65 : 0.9, o = _(() => l.value ? void 0 : typeof t.icon == "string" ? { name: t.icon, scale: s } : { scale: s, ...t.icon ?? {} });
    return (u, c) => (i(), j(be(n.value), K({
      class: ["fr-tag", {
        "fr-tag--sm": u.small,
        [u.icon]: l.value,
        "fr-tag--icon-left": l.value
      }],
      disabled: u.disabled,
      "aria-pressed": u.selectable ? u.selected : void 0
    }, { ...r.value, ...u.$attrs }, {
      onClick: c[0] || (c[0] = (p) => !u.disabled && u.$emit("select", [u.value, u.selected]))
    }), {
      default: U(() => [
        t.icon && !l.value ? (i(), j(ye, K({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: { "fr-mr-1v": !u.iconOnly }
        }, o.value), null, 16, ["label", "class"])) : b("", !0),
        u.iconOnly ? b("", !0) : (i(), f(Q, { key: 1 }, [
          V(v(u.label), 1)
        ], 64)),
        B(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class", "aria-pressed"]));
  }
}), oa = /* @__PURE__ */ ke(op, [["__scopeId", "data-v-e0195cb2"]]), ip = { class: "fr-tags-group" }, up = /* @__PURE__ */ O({
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
    return (l, s) => (i(), f("ul", ip, [
      (i(!0), f(Q, null, Z(l.tags, ({ icon: o, label: u, ...c }, p) => {
        var m;
        return i(), f("li", { key: p }, [
          ae(oa, K({ ref_for: !0 }, c, {
            icon: o,
            label: u,
            selectable: c.selectable,
            selected: c.selectable ? (m = l.modelValue) == null ? void 0 : m.includes(c.value) : void 0,
            onSelect: s[0] || (s[0] = (h) => r(h))
          }), null, 16, ["icon", "label", "selectable", "selected"])
        ]);
      }), 128))
    ]));
  }
}), dp = { class: "fr-tile__body" }, cp = { class: "fr-tile__content" }, fp = ["download", "href"], pp = {
  key: 0,
  class: "fr-tile__desc"
}, mp = {
  key: 1,
  class: "fr-tile__detail"
}, hp = {
  key: 2,
  class: "fr-tile__start"
}, vp = { class: "fr-tile__header" }, gp = {
  key: 0,
  class: "fr-tile__pictogram"
}, bp = ["src"], yp = ["href"], wp = ["href"], kp = ["href"], _p = /* @__PURE__ */ O({
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
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = _(() => typeof t.to == "string" && t.to.startsWith("http"));
    return (r, l) => {
      const s = Ie("RouterLink");
      return i(), f("div", {
        class: A(["fr-tile fr-enlarge-link", [{
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
        d("div", dp, [
          d("div", cp, [
            (i(), j(be(r.titleTag), { class: "fr-tile__title" }, {
              default: U(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, v(r.title), 9, fp)) : b("", !0),
                n.value ? b("", !0) : (i(), j(s, {
                  key: 1,
                  download: r.download,
                  class: "fr-tile__link",
                  to: r.disabled ? "" : r.to
                }, {
                  default: U(() => [
                    V(v(r.title), 1)
                  ]),
                  _: 1
                }, 8, ["download", "to"]))
              ]),
              _: 1
            })),
            r.description ? (i(), f("p", pp, v(r.description), 1)) : b("", !0),
            r.details ? (i(), f("p", mp, v(r.details), 1)) : b("", !0),
            r.$slots["start-details"] ? (i(), f("div", hp, [
              B(r.$slots, "start-details", {}, void 0, !0)
            ])) : b("", !0)
          ])
        ]),
        d("div", vp, [
          B(r.$slots, "header", {}, void 0, !0),
          r.imgSrc || r.svgPath ? (i(), f("div", gp, [
            r.imgSrc ? (i(), f("img", {
              key: 0,
              src: r.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, bp)) : (i(), f("svg", K({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...e, ...r.svgAttrs }), [
              d("use", {
                class: "fr-artwork-decorative",
                href: `${r.svgPath}#artwork-decorative`
              }, null, 8, yp),
              d("use", {
                class: "fr-artwork-minor",
                href: `${r.svgPath}#artwork-minor`
              }, null, 8, wp),
              d("use", {
                class: "fr-artwork-major",
                href: `${r.svgPath}#artwork-major`
              }, null, 8, kp)
            ], 16))
          ])) : b("", !0)
        ])
      ], 2);
    };
  }
}), Vn = /* @__PURE__ */ ke(_p, [["__scopeId", "data-v-f4d836a2"]]), xp = { class: "fr-grid-row fr-grid-row--gutters" }, Ip = /* @__PURE__ */ O({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("div", xp, [
      (i(!0), f(Q, null, Z(t.tiles, (n, r) => (i(), f("div", {
        key: r,
        class: A({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        ae(Vn, K({
          horizontal: t.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Dp = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Tp = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Cp = ["id"], Ep = /* @__PURE__ */ O({
  __name: "DsfrToggleSwitch",
  props: {
    modelValue: { type: Boolean },
    inputId: { default: () => re("toggle") },
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
    const t = a, e = _(() => `${t.inputId}-hint-text`);
    return (n, r) => (i(), f("div", {
      class: A(["fr-toggle", {
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
        "aria-describedby": e.value,
        name: n.name,
        onInput: r[0] || (r[0] = (l) => n.$emit("update:modelValue", l.target.checked))
      }, null, 40, Dp),
      d("label", {
        id: e.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, v(n.label), 9, Tp),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, v(n.hint), 9, Cp)) : b("", !0)
    ], 2));
  }
}), Pp = ["id"], Lp = /* @__PURE__ */ O({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => re("tooltip") }
  },
  setup(a) {
    const t = a, e = W(!1), n = W(null), r = W(null), l = W("0px"), s = W("0px"), o = W("0px"), u = W(!1), c = W(0);
    async function p() {
      var D, M, g, C, E, I, N, P;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((Ce) => setTimeout(Ce, 100));
      const Y = (D = n.value) == null ? void 0 : D.getBoundingClientRect().top, y = (M = n.value) == null ? void 0 : M.offsetHeight, $ = (g = n.value) == null ? void 0 : g.offsetWidth, L = (C = n.value) == null ? void 0 : C.getBoundingClientRect().left, R = (E = r.value) == null ? void 0 : E.offsetHeight, X = (I = r.value) == null ? void 0 : I.offsetWidth, G = (N = r.value) == null ? void 0 : N.offsetTop, ee = (P = r.value) == null ? void 0 : P.offsetLeft, le = !(Y - R < 0) && Y + y + R >= document.documentElement.offsetHeight;
      u.value = le;
      const se = L + $ >= document.documentElement.offsetWidth, De = L + $ / 2 - X / 2 <= 0;
      s.value = le ? `${Y - G - R + 8}px` : `${Y - G + y - 8}px`, c.value = 1, l.value = se ? `${L - ee + $ - X - 4}px` : De ? `${L - ee + 4}px` : `${L - ee + $ / 2 - X / 2}px`, o.value = se ? `${X / 2 - $ / 2 + 4}px` : De ? `${-(X / 2) + $ / 2 - 4}px` : "0px";
    }
    de(e, p, { immediate: !0 }), ge(() => {
      window.addEventListener("scroll", p);
    }), Ee(() => {
      window.removeEventListener("scroll", p);
    });
    const m = _(() => `transform: translate(${l.value}, ${s.value}); --arrow-x: ${o.value}; opacity: ${c.value};'`), h = _(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), T = (D) => {
      var M, g;
      e.value && (D.target === n.value || (M = n.value) != null && M.contains(D.target) || D.target === r.value || (g = r.value) != null && g.contains(D.target) || (e.value = !1));
    }, k = (D) => {
      D.key === "Escape" && (e.value = !1);
    }, S = (D) => {
      var M;
      t.onHover && (D.target === n.value || (M = n.value) != null && M.contains(D.target)) && (e.value = !0, globalThis.__vueDsfr__lastTooltipShow.value = !1);
    }, w = () => {
      t.onHover && (e.value = !1);
    }, x = () => {
      t.onHover || (e.value = !0, globalThis.__vueDsfr__lastTooltipShow = e);
    };
    return ge(() => {
      document.documentElement.addEventListener("click", T), document.documentElement.addEventListener("keydown", k), document.documentElement.addEventListener("mouseover", S);
    }), Ee(() => {
      document.documentElement.removeEventListener("click", T), document.documentElement.removeEventListener("keydown", k), document.documentElement.removeEventListener("mouseover", S);
    }), (D, M) => (i(), f(Q, null, [
      (i(), j(be(D.onHover ? "a" : "button"), K(D.$attrs, {
        id: `link-${D.id}`,
        ref_key: "source",
        ref: n,
        class: D.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": D.id,
        href: D.onHover ? "#" : void 0,
        onClick: M[0] || (M[0] = (g) => x()),
        onMouseleave: M[1] || (M[1] = (g) => w()),
        onFocus: M[2] || (M[2] = (g) => S(g)),
        onBlur: M[3] || (M[3] = (g) => w())
      }), {
        default: U(() => [
          B(D.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      d("span", {
        id: D.id,
        ref_key: "tooltip",
        ref: r,
        class: A(["fr-tooltip fr-placement", h.value]),
        style: _e(m.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, v(D.content), 15, Pp)
    ], 64));
  }
}), Mp = /* @__PURE__ */ ke(Lp, [["__scopeId", "data-v-ed1e8874"]]), Bp = { class: "fr-transcription" }, Sp = ["aria-expanded", "aria-controls"], $p = ["id"], Ap = ["id", "aria-labelledby"], Op = { class: "fr-container fr-container--fluid fr-container-md" }, Rp = { class: "fr-grid-row fr-grid-row--center" }, Fp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Vp = { class: "fr-modal__body" }, Np = { class: "fr-modal__header" }, qp = ["aria-controls"], jp = { class: "fr-modal__content" }, Hp = ["id"], Wp = { class: "fr-transcription__footer" }, Kp = { class: "fr-transcription__actions-group" }, Qp = ["aria-controls"], Nn = /* @__PURE__ */ O({
  __name: "DsfrTranscription",
  props: {
    id: { default: () => re("transcription") },
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
    } = $e(), o = W(!1), u = W(!1), c = _(() => `fr-transcription__modal-${t.id}`), p = _(() => `fr-transcription__collapse-${t.id}`);
    return de(u, (m, h) => {
      m !== h && l(m);
    }), (m, h) => (i(), f("div", Bp, [
      d("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: h[0] || (h[0] = (T) => u.value = !u.value)
      }, " Transcription ", 8, Sp),
      d("div", {
        id: p.value,
        ref_key: "collapse",
        ref: e,
        class: A(["fr-collapse", { "fr-collapse--expanded": F(r), "fr-collapsing": F(n) }]),
        onTransitionend: h[2] || (h[2] = (T) => F(s)(u.value))
      }, [
        d("dialog", {
          id: c.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${c.value}-title`
        }, [
          d("div", Op, [
            d("div", Rp, [
              d("div", Fp, [
                d("div", Vp, [
                  d("div", Np, [
                    d("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": c.value,
                      title: "Fermer"
                    }, " Fermer ", 8, qp)
                  ]),
                  d("div", jp, [
                    d("h1", {
                      id: `${c.value}-title`,
                      class: "fr-modal__title"
                    }, v(m.title), 9, Hp),
                    V(" " + v(m.content), 1)
                  ]),
                  d("div", Wp, [
                    d("div", Kp, [
                      d("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": c.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: h[1] || (h[1] = (T) => o.value = !0)
                      }, " Agrandir ", 8, Qp)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, Ap)
      ], 42, $p),
      (i(), j(dr, { to: "body" }, [
        ae(_n, {
          title: m.title,
          opened: o.value,
          onClose: h[3] || (h[3] = (T) => o.value = !1)
        }, {
          default: U(() => [
            B(m.$slots, "default", {}, () => [
              V(v(m.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), Yp = ["src"], zp = { class: "fr-content-media__caption" }, Gp = /* @__PURE__ */ O({
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
    return (t, e) => (i(), f(Q, null, [
      d("figure", {
        class: A(["fr-content-media", {
          "fr-content-media--sm": t.size === "small",
          "fr-content-media--lg": t.size === "large"
        }])
      }, [
        d("div", {
          class: A(["fr-responsive-vid", `fr-ratio-${t.ratio}`])
        }, [
          d("iframe", {
            src: t.src,
            class: "fr-responsive-vid__player",
            width: "100%",
            height: "100%",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          }, null, 8, Yp)
        ], 2),
        d("div", zp, v(t.legend), 1)
      ], 2),
      ae(Nn, {
        title: t.transcriptionTitle,
        content: t.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Xp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: xl,
  DsfrAccordionsGroup: Dl,
  DsfrAlert: El,
  DsfrBackToTop: Pl,
  DsfrBadge: un,
  DsfrBreadcrumb: Ol,
  DsfrButton: je,
  DsfrButtonGroup: Dt,
  DsfrCallout: Wl,
  DsfrCard: rs,
  DsfrCardDetail: Nt,
  DsfrCheckbox: Tt,
  DsfrCheckboxSet: vs,
  DsfrConsent: ws,
  DsfrDataTable: ao,
  DsfrErrorPage: co,
  DsfrFieldset: dn,
  DsfrFileDownload: cn,
  DsfrFileDownloadList: wo,
  DsfrFileUpload: Co,
  DsfrFollow: zo,
  DsfrFooter: Ii,
  DsfrFooterLink: mn,
  DsfrFooterLinkList: Ei,
  DsfrFooterPartners: hn,
  DsfrFranceConnect: Mi,
  DsfrHeader: gu,
  DsfrHeaderMenuLink: sa,
  DsfrHeaderMenuLinks: qt,
  DsfrHighlight: bu,
  DsfrInput: Ct,
  DsfrInputGroup: Iu,
  DsfrLanguageSelector: rt,
  DsfrLogo: nt,
  DsfrModal: _n,
  DsfrMultiselect: Td,
  DsfrNavigation: zd,
  DsfrNavigationItem: xn,
  DsfrNavigationMegaMenu: Dn,
  DsfrNavigationMegaMenuCategory: In,
  DsfrNavigationMenu: Cn,
  DsfrNavigationMenuItem: Tn,
  DsfrNavigationMenuLink: Et,
  DsfrNewsLetter: fn,
  DsfrNotice: Jd,
  DsfrPagination: la,
  DsfrPicture: rc,
  DsfrQuote: fc,
  DsfrRadioButton: En,
  DsfrRadioButtonSet: Pc,
  DsfrRange: Nc,
  DsfrSearchBar: lt,
  DsfrSegmented: Pn,
  DsfrSegmentedSet: Xc,
  DsfrSelect: rf,
  DsfrShare: pf,
  DsfrSideMenu: kf,
  DsfrSideMenuButton: Ln,
  DsfrSideMenuLink: _f,
  DsfrSideMenuList: Bn,
  DsfrSideMenuListItem: Mn,
  DsfrSkipLinks: Cf,
  DsfrSocialNetworks: pn,
  DsfrStepper: $f,
  DsfrSummary: Vf,
  DsfrTabContent: Sn,
  DsfrTabItem: $n,
  DsfrTable: rp,
  DsfrTableCell: Rn,
  DsfrTableHeader: An,
  DsfrTableHeaders: On,
  DsfrTableRow: Fn,
  DsfrTabs: sp,
  DsfrTag: oa,
  DsfrTags: up,
  DsfrTile: Vn,
  DsfrTiles: Ip,
  DsfrToggleSwitch: Ep,
  DsfrTooltip: Mp,
  DsfrTranscription: Nn,
  DsfrVideo: Gp,
  VIcon: ye,
  registerAccordionKey: na,
  registerNavigationLinkKey: ra,
  registerTabKey: It
}, Symbol.toStringTag, { value: "Module" })), Up = {
  install: (a, { components: t } = {}) => {
    Object.entries(Xp).forEach(([e, n]) => {
      (t === void 0 || t === "all" || t.map(({ name: r }) => r).includes(e)) && a.component(e, n);
    }), a.component("VIcon", ye);
  }
}, qn = 6048e5, Zp = 864e5, Jp = 6e4, em = 36e5, tm = 1e3, Ra = Symbol.for("constructDateFrom");
function we(a, t) {
  return typeof a == "function" ? a(t) : a && typeof a == "object" && Ra in a ? a[Ra](t) : a instanceof Date ? new a.constructor(t) : new Date(t);
}
function he(a, t) {
  return we(t || a, a);
}
function jn(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in);
  return isNaN(t) ? we((e == null ? void 0 : e.in) || a, NaN) : (t && n.setDate(n.getDate() + t), n);
}
let am = {};
function ze() {
  return am;
}
function Fe(a, t) {
  var o, u, c, p;
  const e = ze(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (c = e.locale) == null ? void 0 : c.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = he(a, t == null ? void 0 : t.in), l = r.getDay(), s = (l < n ? 7 : 0) + l - n;
  return r.setDate(r.getDate() - s), r.setHours(0, 0, 0, 0), r;
}
function Ye(a, t) {
  return Fe(a, { ...t, weekStartsOn: 1 });
}
function Hn(a, t) {
  const e = he(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = we(e, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Ye(r), s = we(e, 0);
  s.setFullYear(n, 0, 4), s.setHours(0, 0, 0, 0);
  const o = Ye(s);
  return e.getTime() >= l.getTime() ? n + 1 : e.getTime() >= o.getTime() ? n : n - 1;
}
function bt(a) {
  const t = he(a), e = new Date(
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
function nm(a, ...t) {
  const e = we.bind(
    null,
    t.find((n) => typeof n == "object")
  );
  return t.map(e);
}
function Fa(a, t) {
  const e = he(a, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function rm(a, t, e) {
  const [n, r] = nm(
    e == null ? void 0 : e.in,
    a,
    t
  ), l = Fa(n), s = Fa(r), o = +l - bt(l), u = +s - bt(s);
  return Math.round((o - u) / Zp);
}
function lm(a, t) {
  const e = Hn(a, t), n = we(a, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Ye(n);
}
function sm(a) {
  return a instanceof Date || typeof a == "object" && Object.prototype.toString.call(a) === "[object Date]";
}
function om(a) {
  return !(!sm(a) && typeof a != "number" || isNaN(+he(a)));
}
function im(a, t) {
  const e = he(a, t == null ? void 0 : t.in);
  return e.setFullYear(e.getFullYear(), 0, 1), e.setHours(0, 0, 0, 0), e;
}
const um = {
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
}, dm = (a, t, e) => {
  let n;
  const r = um[a];
  return typeof r == "string" ? n = r : t === 1 ? n = r.one : n = r.other.replace("{{count}}", t.toString()), e != null && e.addSuffix ? e.comparison && e.comparison > 0 ? "in " + n : n + " ago" : n;
};
function Bt(a) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : a.defaultWidth;
    return a.formats[e] || a.formats[a.defaultWidth];
  };
}
const cm = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, fm = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, pm = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, mm = {
  date: Bt({
    formats: cm,
    defaultWidth: "full"
  }),
  time: Bt({
    formats: fm,
    defaultWidth: "full"
  }),
  dateTime: Bt({
    formats: pm,
    defaultWidth: "full"
  })
}, hm = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, vm = (a, t, e, n) => hm[a];
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
const gm = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, bm = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ym = {
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
}, wm = {
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
}, km = {
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
}, _m = {
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
}, xm = (a, t) => {
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
}, Im = {
  ordinalNumber: xm,
  era: Ze({
    values: gm,
    defaultWidth: "wide"
  }),
  quarter: Ze({
    values: bm,
    defaultWidth: "wide",
    argumentCallback: (a) => a - 1
  }),
  month: Ze({
    values: ym,
    defaultWidth: "wide"
  }),
  day: Ze({
    values: wm,
    defaultWidth: "wide"
  }),
  dayPeriod: Ze({
    values: km,
    defaultWidth: "wide",
    formattingValues: _m,
    defaultFormattingWidth: "wide"
  })
};
function Je(a) {
  return (t, e = {}) => {
    const n = e.width, r = n && a.matchPatterns[n] || a.matchPatterns[a.defaultMatchWidth], l = t.match(r);
    if (!l)
      return null;
    const s = l[0], o = n && a.parsePatterns[n] || a.parsePatterns[a.defaultParseWidth], u = Array.isArray(o) ? Tm(o, (m) => m.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Dm(o, (m) => m.test(s))
    );
    let c;
    c = a.valueCallback ? a.valueCallback(u) : u, c = e.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      e.valueCallback(c)
    ) : c;
    const p = t.slice(s.length);
    return { value: c, rest: p };
  };
}
function Dm(a, t) {
  for (const e in a)
    if (Object.prototype.hasOwnProperty.call(a, e) && t(a[e]))
      return e;
}
function Tm(a, t) {
  for (let e = 0; e < a.length; e++)
    if (t(a[e]))
      return e;
}
function Cm(a) {
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
const Em = /^(\d+)(th|st|nd|rd)?/i, Pm = /\d+/i, Lm = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Mm = {
  any: [/^b/i, /^(a|c)/i]
}, Bm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, Sm = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, $m = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Am = {
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
}, Om = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Rm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Fm = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Vm = {
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
}, Nm = {
  ordinalNumber: Cm({
    matchPattern: Em,
    parsePattern: Pm,
    valueCallback: (a) => parseInt(a, 10)
  }),
  era: Je({
    matchPatterns: Lm,
    defaultMatchWidth: "wide",
    parsePatterns: Mm,
    defaultParseWidth: "any"
  }),
  quarter: Je({
    matchPatterns: Bm,
    defaultMatchWidth: "wide",
    parsePatterns: Sm,
    defaultParseWidth: "any",
    valueCallback: (a) => a + 1
  }),
  month: Je({
    matchPatterns: $m,
    defaultMatchWidth: "wide",
    parsePatterns: Am,
    defaultParseWidth: "any"
  }),
  day: Je({
    matchPatterns: Om,
    defaultMatchWidth: "wide",
    parsePatterns: Rm,
    defaultParseWidth: "any"
  }),
  dayPeriod: Je({
    matchPatterns: Fm,
    defaultMatchWidth: "any",
    parsePatterns: Vm,
    defaultParseWidth: "any"
  })
}, Wn = {
  code: "en-US",
  formatDistance: dm,
  formatLong: mm,
  formatRelative: vm,
  localize: Im,
  match: Nm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function qm(a, t) {
  const e = he(a, t == null ? void 0 : t.in);
  return rm(e, im(e)) + 1;
}
function Kn(a, t) {
  const e = he(a, t == null ? void 0 : t.in), n = +Ye(e) - +lm(e);
  return Math.round(n / qn) + 1;
}
function ia(a, t) {
  var p, m, h, T;
  const e = he(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((m = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((T = (h = r.locale) == null ? void 0 : h.options) == null ? void 0 : T.firstWeekContainsDate) ?? 1, s = we((t == null ? void 0 : t.in) || a, 0);
  s.setFullYear(n + 1, 0, l), s.setHours(0, 0, 0, 0);
  const o = Fe(s, t), u = we((t == null ? void 0 : t.in) || a, 0);
  u.setFullYear(n, 0, l), u.setHours(0, 0, 0, 0);
  const c = Fe(u, t);
  return +e >= +o ? n + 1 : +e >= +c ? n : n - 1;
}
function jm(a, t) {
  var o, u, c, p;
  const e = ze(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((p = (c = e.locale) == null ? void 0 : c.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = ia(a, t), l = we((t == null ? void 0 : t.in) || a, 0);
  return l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0), Fe(l, t);
}
function Qn(a, t) {
  const e = he(a, t == null ? void 0 : t.in), n = +Fe(e, t) - +jm(e, t);
  return Math.round(n / qn) + 1;
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
}, Va = {
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
    const r = ia(a, n), l = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const s = l % 100;
      return ie(s, 2);
    }
    return t === "Yo" ? e.ordinalNumber(l, { unit: "year" }) : ie(l, t.length);
  },
  // ISO week-numbering year
  R: function(a, t) {
    const e = Hn(a);
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
    const r = Qn(a, n);
    return t === "wo" ? e.ordinalNumber(r, { unit: "week" }) : ie(r, t.length);
  },
  // ISO week of year
  I: function(a, t, e) {
    const n = Kn(a);
    return t === "Io" ? e.ordinalNumber(n, { unit: "week" }) : ie(n, t.length);
  },
  // Day of the month
  d: function(a, t, e) {
    return t === "do" ? e.ordinalNumber(a.getDate(), { unit: "date" }) : Oe.d(a, t);
  },
  // Day of year
  D: function(a, t, e) {
    const n = qm(a);
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
        return qa(n);
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
        return qa(n);
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
        return "GMT" + Na(n, ":");
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
        return "GMT" + Na(n, ":");
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
function Na(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = Math.trunc(n / 60), l = n % 60;
  return l === 0 ? e + String(r) : e + String(r) + t + ie(l, 2);
}
function qa(a, t) {
  return a % 60 === 0 ? (a > 0 ? "-" : "+") + ie(Math.abs(a) / 60, 2) : Ve(a, t);
}
function Ve(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = ie(Math.trunc(n / 60), 2), l = ie(n % 60, 2);
  return e + r + t + l;
}
const ja = (a, t) => {
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
}, Yn = (a, t) => {
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
}, Hm = (a, t) => {
  const e = a.match(/(P+)(p+)?/) || [], n = e[1], r = e[2];
  if (!r)
    return ja(a, t);
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
  return l.replace("{{date}}", ja(n, t)).replace("{{time}}", Yn(r, t));
}, Wt = {
  p: Yn,
  P: Hm
}, Wm = /^D+$/, Km = /^Y+$/, Qm = ["D", "DD", "YY", "YYYY"];
function zn(a) {
  return Wm.test(a);
}
function Gn(a) {
  return Km.test(a);
}
function Kt(a, t, e) {
  const n = Ym(a, t, e);
  if (console.warn(n), Qm.includes(a)) throw new RangeError(n);
}
function Ym(a, t, e) {
  const n = a[0] === "Y" ? "years" : "days of the month";
  return `Use \`${a.toLowerCase()}\` instead of \`${a}\` (in \`${t}\`) for formatting ${n} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const zm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Gm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Xm = /^'([^]*?)'?$/, Um = /''/g, Zm = /[a-zA-Z]/;
function Ha(a, t, e) {
  var p, m, h, T;
  const n = ze(), r = n.locale ?? Wn, l = n.firstWeekContainsDate ?? ((m = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, s = n.weekStartsOn ?? ((T = (h = n.locale) == null ? void 0 : h.options) == null ? void 0 : T.weekStartsOn) ?? 0, o = he(a, e == null ? void 0 : e.in);
  if (!om(o))
    throw new RangeError("Invalid time value");
  let u = t.match(Gm).map((k) => {
    const S = k[0];
    if (S === "p" || S === "P") {
      const w = Wt[S];
      return w(k, r.formatLong);
    }
    return k;
  }).join("").match(zm).map((k) => {
    if (k === "''")
      return { isToken: !1, value: "'" };
    const S = k[0];
    if (S === "'")
      return { isToken: !1, value: Jm(k) };
    if (Va[S])
      return { isToken: !0, value: k };
    if (S.match(Zm))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + S + "`"
      );
    return { isToken: !1, value: k };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(o, u));
  const c = {
    firstWeekContainsDate: l,
    weekStartsOn: s,
    locale: r
  };
  return u.map((k) => {
    if (!k.isToken) return k.value;
    const S = k.value;
    (Gn(S) || zn(S)) && Kt(S, t, String(a));
    const w = Va[S[0]];
    return w(o, S, r.localize, c);
  }).join("");
}
function Jm(a) {
  const t = a.match(Xm);
  return t ? t[1].replace(Um, "'") : a;
}
function eh() {
  return Object.assign({}, ze());
}
function th(a, t) {
  const e = he(a, t == null ? void 0 : t.in).getDay();
  return e === 0 ? 7 : e;
}
function ah(a, t) {
  const e = nh(t) ? new t(0) : we(t, 0);
  return e.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), e.setHours(
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
    a.getMilliseconds()
  ), e;
}
function nh(a) {
  var t;
  return typeof a == "function" && ((t = a.prototype) == null ? void 0 : t.constructor) === a;
}
const rh = 10;
class Xn {
  constructor() {
    q(this, "subPriority", 0);
  }
  validate(t, e) {
    return !0;
  }
}
class lh extends Xn {
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
class sh extends Xn {
  constructor(e, n) {
    super();
    q(this, "priority", rh);
    q(this, "subPriority", -1);
    this.context = e || ((r) => we(n, r));
  }
  set(e, n) {
    return n.timestampIsSet ? e : we(e, ah(e, this.context));
  }
}
class oe {
  run(t, e, n, r) {
    const l = this.parse(t, e, n, r);
    return l ? {
      setter: new lh(
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
class oh extends oe {
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
const fe = {
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
function pe(a, t) {
  return a && {
    value: t(a.value),
    rest: a.rest
  };
}
function ue(a, t) {
  const e = t.match(a);
  return e ? {
    value: parseInt(e[0], 10),
    rest: t.slice(e[0].length)
  } : null;
}
function Le(a, t) {
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
    value: n * (r * em + l * Jp + s * tm),
    rest: t.slice(e[0].length)
  };
}
function Un(a) {
  return ue(fe.anyDigitsSigned, a);
}
function ce(a, t) {
  switch (a) {
    case 1:
      return ue(fe.singleDigit, t);
    case 2:
      return ue(fe.twoDigits, t);
    case 3:
      return ue(fe.threeDigits, t);
    case 4:
      return ue(fe.fourDigits, t);
    default:
      return ue(new RegExp("^\\d{1," + a + "}"), t);
  }
}
function yt(a, t) {
  switch (a) {
    case 1:
      return ue(fe.singleDigitSigned, t);
    case 2:
      return ue(fe.twoDigitsSigned, t);
    case 3:
      return ue(fe.threeDigitsSigned, t);
    case 4:
      return ue(fe.fourDigitsSigned, t);
    default:
      return ue(new RegExp("^-?\\d{1," + a + "}"), t);
  }
}
function ua(a) {
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
function Zn(a, t) {
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
function Jn(a) {
  return a % 400 === 0 || a % 4 === 0 && a % 100 !== 0;
}
class ih extends oe {
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
        return pe(ce(4, e), l);
      case "yo":
        return pe(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return pe(ce(n.length, e), l);
    }
  }
  validate(e, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(e, n, r) {
    const l = e.getFullYear();
    if (r.isTwoDigitYear) {
      const o = Zn(
        r.year,
        l
      );
      return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const s = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class uh extends oe {
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
        return pe(ce(4, e), l);
      case "Yo":
        return pe(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return pe(ce(n.length, e), l);
    }
  }
  validate(e, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(e, n, r, l) {
    const s = ia(e, l);
    if (r.isTwoDigitYear) {
      const u = Zn(
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
class dh extends oe {
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
class ch extends oe {
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
class fh extends oe {
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
        return ce(n.length, e);
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
class ph extends oe {
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
        return ce(n.length, e);
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
class mh extends oe {
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
        return pe(
          ue(fe.month, e),
          l
        );
      case "MM":
        return pe(ce(2, e), l);
      case "Mo":
        return pe(
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
class hh extends oe {
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
        return pe(
          ue(fe.month, e),
          l
        );
      case "LL":
        return pe(ce(2, e), l);
      case "Lo":
        return pe(
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
function vh(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = Qn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), he(n, e == null ? void 0 : e.in);
}
class gh extends oe {
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
        return ue(fe.week, e);
      case "wo":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return ce(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 53;
  }
  set(e, n, r, l) {
    return Fe(vh(e, r, l), l);
  }
}
function bh(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = Kn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), n;
}
class yh extends oe {
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
        return ue(fe.week, e);
      case "Io":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return ce(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 53;
  }
  set(e, n, r) {
    return Ye(bh(e, r));
  }
}
const wh = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], kh = [
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
class _h extends oe {
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
        return ue(fe.date, e);
      case "do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return ce(n.length, e);
    }
  }
  validate(e, n) {
    const r = e.getFullYear(), l = Jn(r), s = e.getMonth();
    return l ? n >= 1 && n <= kh[s] : n >= 1 && n <= wh[s];
  }
  set(e, n, r) {
    return e.setDate(r), e.setHours(0, 0, 0, 0), e;
  }
}
class xh extends oe {
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
        return ue(fe.dayOfYear, e);
      case "Do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return ce(n.length, e);
    }
  }
  validate(e, n) {
    const r = e.getFullYear();
    return Jn(r) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
  }
  set(e, n, r) {
    return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
  }
}
function da(a, t, e) {
  var m, h, T, k;
  const n = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((h = (m = e == null ? void 0 : e.locale) == null ? void 0 : m.options) == null ? void 0 : h.weekStartsOn) ?? n.weekStartsOn ?? ((k = (T = n.locale) == null ? void 0 : T.options) == null ? void 0 : k.weekStartsOn) ?? 0, l = he(a, e == null ? void 0 : e.in), s = l.getDay(), u = (t % 7 + 7) % 7, c = 7 - r, p = t < 0 || t > 6 ? t - (s + c) % 7 : (u + c) % 7 - (s + c) % 7;
  return jn(l, p, e);
}
class Ih extends oe {
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
    return e = da(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Dh extends oe {
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
        return pe(ce(n.length, e), s);
      case "eo":
        return pe(
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
    return e = da(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Th extends oe {
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
        return pe(ce(n.length, e), s);
      case "co":
        return pe(
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
    return e = da(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
function Ch(a, t, e) {
  const n = he(a, e == null ? void 0 : e.in), r = th(n, e), l = t - r;
  return jn(n, l, e);
}
class Eh extends oe {
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
        return ce(n.length, e);
      case "io":
        return r.ordinalNumber(e, { unit: "day" });
      case "iii":
        return pe(
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
        return pe(
          r.day(e, {
            width: "narrow",
            context: "formatting"
          }),
          l
        );
      case "iiiiii":
        return pe(
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
        return pe(
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
    return e = Ch(e, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Ph extends oe {
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
    return e.setHours(ua(r), 0, 0, 0), e;
  }
}
class Lh extends oe {
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
    return e.setHours(ua(r), 0, 0, 0), e;
  }
}
class Mh extends oe {
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
    return e.setHours(ua(r), 0, 0, 0), e;
  }
}
class Bh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "h":
        return ue(fe.hour12h, e);
      case "ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return ce(n.length, e);
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
class Sh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "H":
        return ue(fe.hour23h, e);
      case "Ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return ce(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 23;
  }
  set(e, n, r) {
    return e.setHours(r, 0, 0, 0), e;
  }
}
class $h extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "K":
        return ue(fe.hour11h, e);
      case "Ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return ce(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.getHours() >= 12 && r < 12 ? e.setHours(r + 12, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
  }
}
class Ah extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 70);
    q(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "k":
        return ue(fe.hour24h, e);
      case "ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return ce(n.length, e);
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
class Oh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 60);
    q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "m":
        return ue(fe.minute, e);
      case "mo":
        return r.ordinalNumber(e, { unit: "minute" });
      default:
        return ce(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 59;
  }
  set(e, n, r) {
    return e.setMinutes(r, 0, 0), e;
  }
}
class Rh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 50);
    q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "s":
        return ue(fe.second, e);
      case "so":
        return r.ordinalNumber(e, { unit: "second" });
      default:
        return ce(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 59;
  }
  set(e, n, r) {
    return e.setSeconds(r, 0), e;
  }
}
class Fh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 30);
    q(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return pe(ce(n.length, e), r);
  }
  set(e, n, r) {
    return e.setMilliseconds(r), e;
  }
}
class Vh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 10);
    q(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(e, n) {
    switch (n) {
      case "X":
        return Le(
          Pe.basicOptionalMinutes,
          e
        );
      case "XX":
        return Le(Pe.basic, e);
      case "XXXX":
        return Le(
          Pe.basicOptionalSeconds,
          e
        );
      case "XXXXX":
        return Le(
          Pe.extendedOptionalSeconds,
          e
        );
      case "XXX":
      default:
        return Le(Pe.extended, e);
    }
  }
  set(e, n, r) {
    return n.timestampIsSet ? e : we(
      e,
      e.getTime() - bt(e) - r
    );
  }
}
class Nh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 10);
    q(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(e, n) {
    switch (n) {
      case "x":
        return Le(
          Pe.basicOptionalMinutes,
          e
        );
      case "xx":
        return Le(Pe.basic, e);
      case "xxxx":
        return Le(
          Pe.basicOptionalSeconds,
          e
        );
      case "xxxxx":
        return Le(
          Pe.extendedOptionalSeconds,
          e
        );
      case "xxx":
      default:
        return Le(Pe.extended, e);
    }
  }
  set(e, n, r) {
    return n.timestampIsSet ? e : we(
      e,
      e.getTime() - bt(e) - r
    );
  }
}
class qh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 40);
    q(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Un(e);
  }
  set(e, n, r) {
    return [we(e, r * 1e3), { timestampIsSet: !0 }];
  }
}
class jh extends oe {
  constructor() {
    super(...arguments);
    q(this, "priority", 20);
    q(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Un(e);
  }
  set(e, n, r) {
    return [we(e, r), { timestampIsSet: !0 }];
  }
}
const Hh = {
  G: new oh(),
  y: new ih(),
  Y: new uh(),
  R: new dh(),
  u: new ch(),
  Q: new fh(),
  q: new ph(),
  M: new mh(),
  L: new hh(),
  w: new gh(),
  I: new yh(),
  d: new _h(),
  D: new xh(),
  E: new Ih(),
  e: new Dh(),
  c: new Th(),
  i: new Eh(),
  a: new Ph(),
  b: new Lh(),
  B: new Mh(),
  h: new Bh(),
  H: new Sh(),
  K: new $h(),
  k: new Ah(),
  m: new Oh(),
  s: new Rh(),
  S: new Fh(),
  X: new Vh(),
  x: new Nh(),
  t: new qh(),
  T: new jh()
}, Wh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Kh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Qh = /^'([^]*?)'?$/, Yh = /''/g, zh = /\S/, Gh = /[a-zA-Z]/;
function Wa(a, t, e, n) {
  var w, x, D, M;
  const r = () => we(e, NaN), l = eh(), s = l.locale ?? Wn, o = l.firstWeekContainsDate ?? ((x = (w = l.locale) == null ? void 0 : w.options) == null ? void 0 : x.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((M = (D = l.locale) == null ? void 0 : D.options) == null ? void 0 : M.weekStartsOn) ?? 0;
  if (!t)
    return a ? r() : he(e, n == null ? void 0 : n.in);
  const c = {
    firstWeekContainsDate: o,
    weekStartsOn: u,
    locale: s
  }, p = [new sh(n == null ? void 0 : n.in, e)], m = t.match(Kh).map((g) => {
    const C = g[0];
    if (C in Wt) {
      const E = Wt[C];
      return E(g, s.formatLong);
    }
    return g;
  }).join("").match(Wh), h = [];
  for (let g of m) {
    Gn(g) && Kt(g, t, a), zn(g) && Kt(g, t, a);
    const C = g[0], E = Hh[C];
    if (E) {
      const { incompatibleTokens: I } = E;
      if (Array.isArray(I)) {
        const P = h.find(
          (Y) => I.includes(Y.token) || Y.token === C
        );
        if (P)
          throw new RangeError(
            `The format string mustn't contain \`${P.fullToken}\` and \`${g}\` at the same time`
          );
      } else if (E.incompatibleTokens === "*" && h.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${g}\` and any other token at the same time`
        );
      h.push({ token: C, fullToken: g });
      const N = E.run(
        a,
        g,
        s.match,
        c
      );
      if (!N)
        return r();
      p.push(N.setter), a = N.rest;
    } else {
      if (C.match(Gh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + C + "`"
        );
      if (g === "''" ? g = "'" : C === "'" && (g = Xh(g)), a.indexOf(g) === 0)
        a = a.slice(g.length);
      else
        return r();
    }
  }
  if (a.length > 0 && zh.test(a))
    return r();
  const T = p.map((g) => g.priority).sort((g, C) => C - g).filter((g, C, E) => E.indexOf(g) === C).map(
    (g) => p.filter((C) => C.priority === g).sort((C, E) => E.subPriority - C.subPriority)
  ).map((g) => g[0]);
  let k = he(e, n == null ? void 0 : n.in);
  if (isNaN(+k)) return r();
  const S = {};
  for (const g of T) {
    if (!g.validate(k, c))
      return r();
    const C = g.set(k, S, c);
    Array.isArray(C) ? (k = C[0], Object.assign(S, C[1])) : k = C;
  }
  return k;
}
function Xh(a) {
  return a.match(Qh)[1].replace(Yh, "'");
}
const Uh = {
  dsfrDecodeDate: function(a, t) {
    if (typeof a != "string" || a === "" || /^\d{4}-\d{2}-\d{2}$/.test(a))
      return a;
    const n = Wa(a, t, /* @__PURE__ */ new Date());
    return Ha(n, "yyyy-MM-dd");
  },
  dsfrDecodeDateTime: function(a, t) {
    if (a === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(a))
      return a;
    const n = Wa(a, t, /* @__PURE__ */ new Date());
    return Ha(n, "yyyy-MM-dd'T'HH:mm");
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
    return this._searchAndFilterList(a, t, e, s, o).map(function(c) {
      return {
        value: c[t],
        label: c[e].toString(),
        name: l,
        hint: c[r],
        disabled: c[n]
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
    var u;
    o != null ? u = this.$data.vueData[l][o][s] : u = this.$data.vueData[l][s], Array.isArray(u) ? u.forEach((c) => this.dsfrLoadMissingAutocompleteOption(a, t, e, n, r, c)) : this.dsfrLoadMissingAutocompleteOption(a, t, e, n, r, u);
  },
  dsfrLoadMissingAutocompleteOption: function(a, t, e, n, r, l) {
    !l || this.$data.componentStates[n].options.filter((function(s) {
      return s.value === l;
    }).bind(this)).length > 0 || (this.$data.componentStates[n].loading = !0, this.$http.post(r, this.objectToFormData({ value: l, list: a, valueField: t, labelField: e, CTX: this.$data.vueData.CTX })).then((function(s) {
      let o = s.data.map(function(u) {
        return { value: u[t], label: u[e].toString() };
      });
      return this.$data.componentStates[n].options = this.$data.componentStates[n].options.concat(o), this.$data.componentStates[n].options;
    }).bind(this)).catch((function(s) {
      this.$q.notify(s.response.status + ":" + s.response.statusText);
    }).bind(this)).then((function() {
      this.$data.componentStates[n].loading = !1;
    }).bind(this)));
  },
  dsfrUpdateMenuNavigationActiveState: function() {
    var a, t;
    (t = (a = this.componentStates) == null ? void 0 : a.dsfrHeader) == null || t.navItems.forEach((e) => {
      e.title ? e.active = e.links.some((n) => n.setActive === !0 || window.location.pathname.startsWith(n.to)) : e.active = e.setActive === !0;
    });
  }
}, Me = (a = "", t = "") => (a ? `${a}-` : "") + Yt() + (t ? `-${t}` : ""), Zh = {
  useRandomId: Me
}, Jh = ["href", "aria-current"], ev = {
  __name: "RouterLink",
  props: ["to", "active"],
  setup(a) {
    const t = a, e = t.to === "/" ? window.location.pathname === t.to : window.location.pathname.startsWith(t.to);
    return (n, r) => (i(), f("a", {
      href: t.to,
      "aria-current": F(e) || a.active ? "page" : void 0
    }, [
      B(n.$slots, "default")
    ], 8, Jh));
  }
}, Ae = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, tv = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: Tt, DsfrTag: oa, DsfrButton: je },
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
}, av = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, nv = { class: "fr-mb-1w fr-text--md" }, rv = { key: 0 }, lv = { class: "facet" }, sv = { class: "flex justify-between w-full fr-mb-0" }, ov = { class: "facet--count" }, iv = { key: 1 }, uv = { class: "flex justify-between w-full" }, dv = { class: "facet--count" }, cv = { key: 0 }, fv = { class: "facet" }, pv = { class: "flex justify-between w-full fr-mb-0" }, mv = { class: "facet--count" }, hv = { key: 1 }, vv = { class: "flex justify-between w-full" }, gv = { class: "facet--count" }, bv = { class: "fr-mb-2w" };
function yv(a, t, e, n, r, l) {
  const s = Ie("DsfrTag"), o = Ie("DsfrCheckbox"), u = Ie("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", av, [
      (i(!0), f(Q, null, Z(e.selectedFacets, (c, p) => (i(), f(Q, { key: p }, [
        l.facetMultipleByCode(p) ? b("", !0) : (i(!0), f(Q, { key: 0 }, Z(c, (m) => (i(), j(s, {
          class: "fr-tag--dismiss",
          "tag-name": "button",
          key: m.code,
          onClick: (h) => a.$emit("toogle-facet", p, m, e.contextKey)
        }, {
          default: U(() => [
            V(v(l.facetLabelByCode(p)) + ": " + v(l.facetValueLabelByCode(p, m)), 1)
          ]),
          _: 2
        }, 1032, ["onClick"]))), 128))
      ], 64))), 128))
    ])) : b("", !0),
    (i(!0), f(Q, null, Z(e.facets, (c) => (i(), f("div", {
      key: c.code,
      class: "facets"
    }, [
      c.multiple || !l.isFacetSelected(c.code) ? (i(), f(Q, { key: 0 }, [
        d("h6", nv, v(c.label), 1),
        d("ul", null, [
          (i(!0), f(Q, null, Z(l.selectedInvisibleFacets(c.code), (p) => (i(), f(Q, {
            key: p.code
          }, [
            c.multiple ? (i(), f("li", rv, [
              d("div", lv, [
                ae(o, {
                  small: "",
                  modelValue: !0,
                  "onUpdate:modelValue": (m) => a.$emit("toogle-facet", c.code, p.code, e.contextKey)
                }, {
                  label: U(() => [
                    d("p", sv, [
                      V(v(l.facetValueLabelByCode(c.code, p.code)) + " ", 1),
                      d("span", ov, v(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", iv, [
              ae(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => a.$emit("toogle-facet", c.code, p.code, e.contextKey)
              }, {
                default: U(() => [
                  d("span", uv, [
                    V(v(l.facetValueLabelByCode(c.code, p.code)) + " ", 1),
                    d("span", dv, v(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        d("ul", null, [
          (i(!0), f(Q, null, Z(l.visibleFacets(c.code, c.values), (p) => (i(), f(Q, {
            key: p.code
          }, [
            c.multiple ? (i(), f("li", cv, [
              d("div", fv, [
                ae(o, {
                  small: "",
                  modelValue: l.isFacetValueSelected(c.code, p.code),
                  class: "facet",
                  "onUpdate:modelValue": (m) => a.$emit("toogle-facet", c.code, p.code, e.contextKey)
                }, {
                  label: U(() => [
                    d("p", pv, [
                      V(v(l.facetValueLabelByCode(c.code, p.code)) + " ", 1),
                      d("span", mv, v(p.count), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue"])
              ])
            ])) : (i(), f("li", hv, [
              ae(u, {
                tertiary: "",
                "no-outline": "",
                onClick: (m) => a.$emit("toogle-facet", c.code, p.code, e.contextKey)
              }, {
                default: U(() => [
                  d("span", vv, [
                    V(v(l.facetValueLabelByCode(c.code, p.code)) + " ", 1),
                    d("span", gv, v(p.count), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])
            ]))
          ], 64))), 128))
        ]),
        d("div", bv, [
          c.values.length > e.maxValues && !l.isFacetExpanded(c.code) ? (i(), j(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(c.code)
          }, {
            default: U(() => [
              V(v(a.$q.lang.vui.facets.showAll), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0),
          c.values.length > e.maxValues && l.isFacetExpanded(c.code) ? (i(), j(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(c.code)
          }, {
            default: U(() => [
              V(v(a.$q.lang.vui.facets.showLess), 1)
            ]),
            _: 2
          }, 1032, ["onClick"])) : b("", !0)
        ])
      ], 64)) : b("", !0)
    ]))), 128))
  ]);
}
const wv = /* @__PURE__ */ Ae(tv, [["render", yv], ["__scopeId", "data-v-0be4e596"]]), ca = () => {
  const a = W(), t = W(!1), e = W(!1), n = () => {
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
}, kv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], _v = ["id", "aria-labelledby", "onKeydown"], xv = {
  class: "fr-menu__list",
  role: "none"
}, Iv = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Me("menu") },
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
    } = ca(), o = a, u = W(null), c = W(!1);
    let p = W(0), m = [];
    Re("menuItem", { menuItemIndex: p, addMenuItem: (I, N) => {
      p.value += 1, m.push(`${I}@${N}`);
    } }), Re("id", o.id), de(c, (I, N) => {
      I !== N && (l(I), I ? (setTimeout(() => S(), 100), document.addEventListener("click", D), document.addEventListener("touchstart", D)) : (document.removeEventListener("click", D), document.removeEventListener("touchstart", D)));
    });
    const T = (I, N) => {
      const P = N === "down" ? (I + 1) % m.length : (I - 1 + m.length) % m.length, Y = document.getElementById(`${o.id}_item_${P}`);
      return Y.ariaDisabled === "true" ? T(P, N) : Y;
    }, k = (I) => {
      const N = document.activeElement.id, P = N.startsWith(`${o.id}_item_`) ? Number(N.split("_")[2]) : I === "down" ? -1 : 0;
      T(P, I).focus();
    }, S = (I) => k("down"), w = (I) => k("up");
    let x = (I) => {
      let N = I.key;
      if (N.length > 1 && N.match(/\S/))
        return;
      N = N.toLowerCase();
      let P = m.filter((y) => y.toLowerCase().startsWith(N)), Y = document.activeElement.id;
      for (let y of P) {
        let $ = y.split("@")[1], L = document.getElementById(`${o.id}_item_${$}`);
        if (Y !== L.id) {
          L.focus();
          break;
        }
      }
    }, D = (I) => {
      u.value.contains(I.target) || (c.value = !1);
    };
    function M() {
      c.value = !1;
    }
    const g = _(() => ["sm", "small"].includes(o.size)), C = _(() => ["md", "medium"].includes(o.size)), E = _(() => ["lg", "large"].includes(o.size));
    return t({ closeMenu: M }), (I, N) => (i(), f("div", {
      class: "relative-position",
      onKeydown: N[9] || (N[9] = J(
        //@ts-ignore
        (...P) => F(D) && F(D)(...P),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      d("button", K({
        id: I.id,
        onClick: N[0] || (N[0] = te((P) => c.value = !c.value, ["prevent", "stop"])),
        onKeyup: [
          N[1] || (N[1] = J(te((P) => c.value = !1, ["stop"]), ["esc"])),
          N[2] || (N[2] = J(te((P) => c.value = !c.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          J(te(S, ["prevent"]), ["down"]),
          J(te(w, ["prevent"]), ["up"]),
          N[3] || (N[3] = //@ts-ignore
          (...P) => F(x) && F(x)(...P)),
          N[4] || (N[4] = J((P) => c.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [I.icon]: !0,
          "fr-btn--secondary": I.secondary,
          "fr-btn--tertiary": I.tertiary,
          "fr-btn--sm": g.value,
          "fr-btn--md": C.value,
          "fr-btn--lg": E.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": I.disabled,
        "aria-controls": `${I.id}_menu`,
        "aria-expanded": c.value
      }, I.$attrs), [
        d("span", null, v(I.label), 1)
      ], 16, kv),
      d("div", {
        id: `${I.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: A(["fr-collapse fr-menu", { "fr-collapse--expanded": F(r), "fr-collapsing": F(n) }]),
        role: "menu",
        "aria-labelledby": I.id,
        onKeyup: N[5] || (N[5] = J((P) => c.value = !1, ["esc"])),
        onKeydown: [
          N[6] || (N[6] = J((P) => c.value = !1, ["tab"])),
          J(te(S, ["prevent"]), ["down"]),
          J(te(w, ["prevent"]), ["up"]),
          N[7] || (N[7] = //@ts-ignore
          (...P) => F(x) && F(x)(...P))
        ],
        onTransitionend: N[8] || (N[8] = (P) => F(s)(c.value))
      }, [
        d("ul", xv, [
          B(I.$slots, "default", {}, void 0, !0)
        ])
      ], 42, _v)
    ], 544));
  }
}), Dv = /* @__PURE__ */ Ae(Iv, [["__scopeId", "data-v-7e2a2d17"]]), Tv = { role: "none" }, Cv = ["id", "href"], Ev = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(a) {
    const t = a, { menuItemIndex: e, addMenuItem: n } = Qe("menuItem"), l = `fr-btn fr-btn--secondary fr-nav__link ${_(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")) ? t.icon : ""} fr-btn--icon-left`, s = Qe("id"), o = e.value;
    return n(t.label, o), (u, c) => {
      const p = Ie("dsfr-button");
      return i(), f("li", Tv, [
        u.url === "" ? (i(), j(p, K({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${F(s)}_item_${F(o)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          "icon-left": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", K({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${F(s)}_item_${F(o)}`,
          href: u.url,
          class: l
        }, u.$attrs), v(u.label), 17, Cv))
      ]);
    };
  }
}), Pv = /* @__PURE__ */ Ae(Ev, [["__scopeId", "data-v-2b0119ca"]]), Lv = ["for", "id"], Mv = {
  key: 0,
  class: "required"
}, Bv = {
  key: 0,
  class: "fr-hint-text"
}, Sv = ["id", "onKeydown", "aria-labelledby", "aria-disabled", "aria-controls", "aria-expanded", "aria-required"], $v = { class: "grow overflow" }, Av = { class: "fr-pl-1v fr-select__icon" }, Ov = ["id", "onKeydown"], Rv = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, Fv = ["id"], Vv = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, Nv = ["id"], qv = {
  key: 2,
  class: "fr-label fr-mb-2v"
}, jv = {
  key: 0,
  class: "fr-hint-text"
}, Hv = {
  role: "listbox",
  "aria-multiselectable": "true",
  class: "fr-select__ul"
}, Wv = ["aria-selected"], Kv = ["id", "data-id", "value"], Qv = ["for"], Yv = ["id"], zv = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrSelectMultiple",
  props: /* @__PURE__ */ Be({
    required: { type: Boolean },
    disabled: { type: Boolean },
    id: { default: () => Me("select-multiple") },
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
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = ca(), s = a, o = W(!1), u = xe(a, "modelValue"), c = W(s.options);
    de(o, (L, R) => {
      L !== R && (r(L), L ? (document.addEventListener("click", $), document.addEventListener("touchstart", $)) : (document.removeEventListener("click", $), document.removeEventListener("touchstart", $)));
    });
    const p = W(null), m = W(null), h = W(null), T = _(() => s.errorMessage || s.successMessage), k = _(() => s.errorMessage !== "" ? "error" : "valid"), S = _(() => s.modelValue.length === c.value.length ? "fr-icon-close-circle-line" : "fr-icon-check-line"), w = _(() => s.modelValue.length === c.value.length ? "Tout déselectionner" : "Tout sélectionner"), x = _(() => {
      let R = `${s.options.filter((X) => s.modelValue.includes(X.value)).length} options séléctionnées`;
      return s.modelValue.length > 2 ? R : s.options.filter((X) => s.modelValue.includes(X.value)).map((X) => X.text).join(", ");
    });
    let D = function() {
      if (s.modelValue.length >= c.value.length)
        s.modelValue.length = 0;
      else {
        const L = c.value.filter((R) => !s.modelValue.includes(R.value));
        for (let R of L)
          s.modelValue.push(R.value);
      }
    }, M = function(L) {
      const R = L.target.value.toLowerCase();
      c.value = s.options.filter((X) => X.text.toLowerCase().indexOf(R) > -1);
    };
    const g = (L, R) => {
      const X = R === "down" ? (L + 1) % c.value.length : (L - 1 + c.value.length) % c.value.length, G = document.getElementById(`${s.id}_option_${X}`);
      return G.ariaDisabled === "true" ? g(X, R) : G;
    }, C = (L) => {
      const R = document.activeElement.id, X = R.startsWith(`${s.id}_option_`) ? Number(R.split("_")[2]) : L === "down" ? -1 : 0;
      g(X, L).focus();
    }, E = (L) => C("down"), I = (L) => C("up");
    let N = function(L) {
      L.shiftKey || (s.comboHasButton ? o.value || (o.value = !0, L.preventDefault(), setTimeout(() => m.value.focus(), 100)) : s.comboHasFilter && (o.value || (o.value = !0, L.preventDefault(), setTimeout(() => h.value.focus(), 100))));
    }, P = function(L) {
      L.shiftKey || ((s.comboHasButton && !s.comboHasFilter && document.activeElement.id === `${s.id}_button` || s.comboHasFilter && document.activeElement.id === `${s.id}_filter`) && (L.preventDefault(), o.value = !1), !s.comboHasFilter && !s.comboHasButton && (o.value = !1));
    }, Y = function(L) {
      document.activeElement.id.startsWith(`${s.id}_option_`) && (s.comboHasFilter ? (L.preventDefault(), h.value.focus()) : s.comboHasButton && m.value.focus());
    }, y = (L) => {
      let R = L.key;
      if (R.length > 1 && R.match(/\S/) || document.activeElement.id === `${s.id}_filter`)
        return;
      R = R.toLowerCase();
      let X = c.value.filter((ee) => ee.text.toLowerCase().startsWith(R)), G = document.activeElement.id;
      for (let ee of X) {
        let le = document.querySelector(`[data-id='${ee.value}']`);
        if (G !== le.id) {
          le.focus();
          break;
        }
      }
    }, $ = (L) => {
      p.value.contains(L.target) || (o.value = !1);
    };
    return (L, R) => {
      const X = Ie("v-icon");
      return i(), f(Q, null, [
        d("div", K({
          ref_key: "container",
          ref: p,
          class: ["fr-select-group", { [`fr-select-group--${k.value}`]: T.value !== "" }],
          onKeyup: R[13] || (R[13] = J(
            //@ts-ignore
            (...G) => F($) && F($)(...G),
            ["tab"]
          ))
        }, L.$attrs), [
          d("label", {
            class: "fr-label",
            for: L.id,
            id: `${L.id}_label`
          }, [
            B(L.$slots, "label", {}, () => [
              V(v(L.label) + " ", 1),
              B(L.$slots, "required-tip", {}, () => [
                L.required ? (i(), f("span", Mv, " *")) : b("", !0)
              ], !0)
            ], !0),
            L.description ? (i(), f("span", Bv, v(L.description), 1)) : b("", !0)
          ], 8, Lv),
          d("div", {
            id: L.id,
            class: A([{ [`fr-select--${k.value}`]: T.value !== "" }, "fr-input fr-select--menu flex"]),
            onClick: R[0] || (R[0] = (G) => o.value = !o.value),
            onKeydown: [
              R[1] || (R[1] = J(te((G) => o.value = !1, ["stop"]), ["esc"])),
              R[2] || (R[2] = J(te((G) => o.value = !o.value, ["prevent"]), ["space"])),
              J(te(E, ["prevent"]), ["down"]),
              J(te(I, ["prevent"]), ["up"]),
              R[3] || (R[3] = J(
                //@ts-ignore
                (...G) => F(N) && F(N)(...G),
                ["tab"]
              )),
              R[4] || (R[4] = //@ts-ignore
              (...G) => F(y) && F(y)(...G))
            ],
            tabindex: "0",
            role: "combobox",
            "aria-haspopup": "listbox",
            "aria-autocomplete": "none",
            "aria-labelledby": `${L.id}_label`,
            "aria-disabled": L.disabled,
            "aria-controls": `${L.id}_list`,
            "aria-expanded": o.value,
            "aria-required": L.required
          }, [
            d("p", $v, v(x.value), 1),
            d("div", Av, [
              ae(X, {
                style: { "font-size": "1rem" },
                name: "ri-arrow-down-s-line"
              })
            ])
          ], 42, Sv),
          d("div", {
            id: `${L.id}_list`,
            ref_key: "collapse",
            ref: t,
            class: A(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": F(n), "fr-collapsing": F(e) }]),
            onKeyup: R[8] || (R[8] = J((G) => o.value = !1, ["esc"])),
            onKeydown: [
              R[9] || (R[9] = J(
                //@ts-ignore
                (...G) => F(P) && F(P)(...G),
                ["tab"]
              )),
              J(te(E, ["prevent"]), ["down"]),
              J(te(I, ["prevent"]), ["up"]),
              R[10] || (R[10] = J(te(
                //@ts-ignore
                (...G) => F(Y) && F(Y)(...G),
                ["shift"]
              ), ["tab"])),
              R[11] || (R[11] = //@ts-ignore
              (...G) => F(y) && F(y)(...G))
            ],
            onTransitionend: R[12] || (R[12] = (G) => F(l)(o.value))
          }, [
            L.comboHasButton ? (i(), f("ul", Rv, [
              d("li", null, [
                d("button", {
                  class: A(["fr-btn fr-btn--tertiary fr-btn--sm", `${S.value}`]),
                  id: `${L.id}_button`,
                  onClick: R[5] || (R[5] = (G) => F(D)()),
                  ref_key: "button",
                  ref: m,
                  type: "button"
                }, v(w.value), 11, Fv)
              ])
            ])) : b("", !0),
            L.comboHasFilter ? (i(), f("div", Vv, [
              d("input", {
                class: "fr-input",
                id: `${L.id}_filter`,
                ref_key: "filter",
                ref: h,
                onInput: R[6] || (R[6] = //@ts-ignore
                (...G) => F(M) && F(M)(...G)),
                "aria-label": "Rechercher une option",
                placeholder: "Rechercher",
                type: "text"
              }, null, 40, Nv)
            ])) : b("", !0),
            L.comboLabel ? (i(), f("p", qv, [
              V(v(L.comboLabel) + " ", 1),
              L.comboDescription ? (i(), f("span", jv, v(L.comboDescription), 1)) : b("", !0)
            ])) : b("", !0),
            d("ul", Hv, [
              (i(!0), f(Q, null, Z(c.value, (G, ee) => (i(), f("li", {
                class: "fr-checkbox-group fr-checkbox-group--sm fr-py-1v",
                role: "option",
                "aria-selected": u.value.includes(G.value)
              }, [
                Se(d("input", {
                  id: `${L.id}_option_${ee}`,
                  "data-id": G.value,
                  type: "checkbox",
                  class: "",
                  tabindex: "-1",
                  value: G.value,
                  "onUpdate:modelValue": R[7] || (R[7] = (le) => u.value = le)
                }, null, 8, Kv), [
                  [ot, u.value]
                ]),
                d("label", {
                  class: "fr-label",
                  for: `${L.id}_option_${ee}`
                }, v(G.text), 9, Qv)
              ], 8, Wv))), 256))
            ])
          ], 42, Ov)
        ], 16),
        T.value ? (i(), f("p", {
          key: 0,
          id: `select-${k.value}-desc-${k.value}`,
          class: A(`fr-${k.value}-text`)
        }, v(T.value), 11, Yv)) : b("", !0)
      ], 64);
    };
  }
}), Gv = /* @__PURE__ */ Ae(zv, [["__scopeId", "data-v-f9cbc3bf"]]), Xv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Uv = ["id", "aria-labelledby", "onKeydown"], Zv = {
  key: 0,
  class: "fr-label fr-mb-0"
}, Jv = {
  key: 0,
  class: "fr-hint-text"
}, eg = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, tg = { role: "none" }, ag = { class: "fr-p-2v" }, ng = ["id", "href"], rg = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrHeaderMenu",
  props: {
    label: { default: "" },
    icon: { default: "" },
    id: { default: () => Me("header-menu") },
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
    } = ca(), s = a, o = W(null), u = W(!1);
    let c = W(0), p = [];
    const m = (D, M) => {
      c.value += 1, p.push(`${D}@${M}`);
    };
    Re("menuItem", { menuItemIndex: c, addMenuItem: m }), Re("id", s.id), de(u, (D, M) => {
      D !== M && (r(D), D ? (setTimeout(() => k(), 100), document.addEventListener("click", x), document.addEventListener("touchstart", x)) : (document.removeEventListener("click", x), document.removeEventListener("touchstart", x)));
    }), ge(() => {
      m(s.logoutLabel, c.value);
    });
    const h = (D, M) => {
      const g = M === "down" ? (D + 1) % p.length : (D - 1 + p.length) % p.length, C = document.getElementById(`${s.id}_item_${g}`);
      return C.ariaDisabled === "true" ? h(g, M) : C;
    }, T = (D) => {
      const M = document.activeElement.id, g = M.startsWith(`${s.id}_item_`) ? Number(M.split("_")[2]) : D === "down" ? -1 : 0;
      h(g, D).focus();
    }, k = (D) => T("down"), S = (D) => T("up");
    let w = (D) => {
      let M = D.key;
      if (M.length > 1 && M.match(/\S/))
        return;
      M = M.toLowerCase();
      let g = p.filter((E) => E.toLowerCase().startsWith(M)), C = document.activeElement.id;
      for (let E of g) {
        let I = E.split("@")[1], N = document.getElementById(`${s.id}_item_${I}`);
        if (C !== N.id) {
          N.focus();
          break;
        }
      }
    }, x = (D) => {
      o.value.contains(D.target) || (u.value = !1);
    };
    return (D, M) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: M[9] || (M[9] = J(
        //@ts-ignore
        (...g) => F(x) && F(x)(...g),
        ["tab"]
      )),
      ref_key: "container",
      ref: o
    }, [
      d("button", K({
        id: D.id,
        onClick: M[0] || (M[0] = te((g) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          M[1] || (M[1] = J(te((g) => u.value = !1, ["stop"]), ["esc"])),
          M[2] || (M[2] = J(te((g) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          J(te(k, ["prevent"]), ["down"]),
          J(te(S, ["prevent"]), ["up"]),
          M[3] || (M[3] = //@ts-ignore
          (...g) => F(w) && F(w)(...g)),
          M[4] || (M[4] = J((g) => u.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm fr-btn--icon-left", { [D.icon]: !0 }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": D.disabled,
        "aria-controls": `${D.id}_menu`,
        "aria-expanded": u.value
      }, D.$attrs), [
        d("span", null, v(D.label), 1)
      ], 16, Xv),
      d("div", {
        id: `${D.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: A(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": F(n), "fr-collapsing": F(e) }]),
        role: "menu",
        "aria-labelledby": D.id,
        onKeyup: M[5] || (M[5] = J((g) => u.value = !1, ["esc"])),
        onKeydown: [
          M[6] || (M[6] = J((g) => u.value = !1, ["tab"])),
          J(te(k, ["prevent"]), ["down"]),
          J(te(S, ["prevent"]), ["up"]),
          M[7] || (M[7] = //@ts-ignore
          (...g) => F(w) && F(w)(...g))
        ],
        onTransitionend: M[8] || (M[8] = (g) => F(l)(u.value))
      }, [
        B(D.$slots, "detail", {}, () => [
          D.nom === "" && D.email === "" ? b("", !0) : (i(), f("p", Zv, [
            V(v(D.nom) + " ", 1),
            D.email !== "" ? (i(), f("span", Jv, v(D.email), 1)) : b("", !0)
          ]))
        ], !0),
        d("ul", eg, [
          B(D.$slots, "default", {}, void 0, !0),
          d("li", tg, [
            d("div", ag, [
              D.logoutUrl !== "" ? (i(), f("a", {
                key: 0,
                id: `${D.id}_item_${F(c) - 1}`,
                class: "fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
                role: "menuitem",
                tabindex: "-1",
                href: D.logoutUrl
              }, v(D.logoutLabel), 9, ng)) : b("", !0)
            ])
          ])
        ])
      ], 42, Uv)
    ], 544));
  }
}), lg = /* @__PURE__ */ Ae(rg, [["__scopeId", "data-v-3a8c3dd5"]]), sg = Symbol("header"), og = ["aria-label"], ig = { class: "fr-btns-group" }, Qt = /* @__PURE__ */ O({
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
      d("ul", ig, [
        (i(!0), f(Q, null, Z(n.links, (l, s) => (i(), f("li", { key: s }, [
          ae(F(sa), K({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var u;
              e("linkClick", o), (u = l.onClick) == null || u.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        B(n.$slots, "default")
      ])
    ], 8, og));
  }
}), ug = {
  role: "banner",
  class: "fr-header"
}, dg = { class: "fr-header__body" }, cg = { class: "fr-container width-inherit" }, fg = { class: "fr-header__body-row" }, pg = { class: "fr-header__brand fr-enlarge-link" }, mg = { class: "fr-header__brand-top" }, hg = { class: "fr-header__logo" }, vg = {
  key: 0,
  class: "fr-header__operator"
}, gg = ["src", "alt"], bg = {
  key: 1,
  class: "fr-header__navbar"
}, yg = ["aria-label", "title", "data-fr-opened"], wg = ["aria-label", "title"], kg = {
  key: 0,
  class: "fr-header__service"
}, _g = { class: "fr-header__service-title" }, xg = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Ig = {
  key: 0,
  class: "fr-header__service-tagline"
}, Dg = {
  key: 1,
  class: "fr-header__service"
}, Tg = { class: "fr-header__tools" }, Cg = {
  key: 0,
  class: "fr-header__tools-links"
}, Eg = { class: "fr-header__search fr-modal" }, Pg = ["aria-label"], Lg = { class: "fr-container" }, Mg = { class: "fr-header__menu-links" }, Bg = {
  key: 1,
  class: "flex justify-center items-center"
}, Sg = { class: "fr-header__menu fr-modal" }, $g = {
  key: 0,
  class: "fr-container"
}, Ag = /* @__PURE__ */ O({
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
    const e = a, n = t, r = st(e, "languageSelector"), l = W(!1), s = W(!1), o = W(!1), u = () => {
      var w;
      o.value = !1, l.value = !1, s.value = !1, (w = document.getElementById("button-menu")) == null || w.focus();
    }, c = (w) => {
      w.key === "Escape" && u();
    };
    ge(() => {
      document.addEventListener("keydown", c), n("on-mounted");
    }), Ee(() => {
      document.removeEventListener("keydown", c);
    });
    const p = () => {
      var w;
      o.value = !0, l.value = !0, s.value = !1, (w = document.getElementById("close-button")) == null || w.focus();
    }, m = () => {
      o.value = !0, l.value = !1, s.value = !0;
    }, h = u, T = Gt(), k = _(() => {
      var w;
      return !!((w = T.operator) != null && w.call(T).length) || !!e.operatorImgSrc;
    }), S = _(() => !!T.mainnav);
    return Re(sg, () => u), (w, x) => {
      var M, g, C;
      const D = Ie("RouterLink");
      return i(), f("header", ug, [
        d("div", dg, [
          d("div", cg, [
            d("div", fg, [
              d("div", pg, [
                d("div", mg, [
                  d("div", hg, [
                    ae(D, {
                      to: w.homeTo,
                      title: `${w.homeLabel} - ${w.serviceTitle}`
                    }, {
                      default: U(() => [
                        ae(F(nt), {
                          "logo-text": w.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  k.value ? (i(), f("div", vg, [
                    B(w.$slots, "operator", {}, () => [
                      w.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: w.operatorImgSrc,
                        alt: w.operatorImgAlt,
                        style: _e(w.operatorImgStyle)
                      }, null, 12, gg)) : b("", !0)
                    ])
                  ])) : b("", !0),
                  w.showSearch || S.value || (M = w.quickLinks) != null && M.length ? (i(), f("div", bg, [
                    w.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": w.showSearchLabel,
                      title: w.showSearchLabel,
                      "data-fr-opened": s.value,
                      onClick: x[0] || (x[0] = te((E) => m(), ["prevent", "stop"]))
                    }, null, 8, yg)) : b("", !0),
                    S.value || (g = w.quickLinks) != null && g.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": w.menuLabel,
                      title: w.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: x[1] || (x[1] = te((E) => p(), ["prevent", "stop"]))
                    }, null, 8, wg)) : b("", !0)
                  ])) : b("", !0)
                ]),
                w.serviceTitle ? (i(), f("div", kg, [
                  ae(D, K({
                    to: w.homeTo,
                    title: `${w.homeLabel} - ${w.serviceTitle}`
                  }, w.$attrs), {
                    default: U(() => [
                      d("p", _g, [
                        V(v(w.serviceTitle) + " ", 1),
                        w.showBeta ? (i(), f("span", xg, " BETA ")) : b("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  w.serviceDescription ? (i(), f("p", Ig, v(w.serviceDescription), 1)) : b("", !0)
                ])) : b("", !0),
                !w.serviceTitle && w.showBeta ? (i(), f("div", Dg, x[9] || (x[9] = [
                  d("p", { class: "fr-header__service-title" }, [
                    d("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : b("", !0)
              ]),
              d("div", Tg, [
                (C = w.quickLinks) != null && C.length || r.value ? (i(), f("div", Cg, [
                  l.value ? b("", !0) : (i(), j(Qt, {
                    key: 0,
                    links: w.quickLinks,
                    "nav-aria-label": w.quickLinksAriaLabel
                  }, {
                    default: U(() => [
                      B(w.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), j(F(rt), K({ key: 1 }, r.value, {
                    onSelect: x[2] || (x[2] = (E) => n("language-select", E))
                  }), null, 16)) : b("", !0)
                ])) : b("", !0),
                d("div", Eg, [
                  B(w.$slots, "header-search"),
                  w.showSearch ? (i(), j(F(lt), {
                    key: 0,
                    "searchbar-id": w.searchbarId,
                    label: w.searchLabel,
                    "model-value": w.modelValue,
                    placeholder: w.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": x[3] || (x[3] = (E) => n("update:modelValue", E)),
                    onSearch: x[4] || (x[4] = (E) => n("search", E))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : b("", !0)
                ])
              ])
            ]),
            w.showSearch || S.value || w.quickLinks && w.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: A(["fr-header__menu fr-modal", { "fr-modal--opened": o.value }]),
              "aria-label": w.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              d("div", Lg, [
                d("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: x[5] || (x[5] = te((E) => u(), ["prevent", "stop"]))
                }, v(w.closeMenuModalLabel), 1),
                d("div", Mg, [
                  r.value ? (i(), j(F(rt), K({ key: 0 }, r.value, {
                    onSelect: x[6] || (x[6] = (E) => r.value.currentLanguage = E.codeIso)
                  }), null, 16)) : b("", !0),
                  l.value ? (i(), j(Qt, {
                    key: 1,
                    role: "navigation",
                    links: w.quickLinks,
                    "nav-aria-label": w.quickLinksAriaLabel,
                    onLinkClick: F(h)
                  }, {
                    default: U(() => [
                      B(w.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : b("", !0),
                  B(w.$slots, "header-search")
                ]),
                o.value ? B(w.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : b("", !0),
                s.value ? (i(), f("div", Bg, [
                  ae(F(lt), {
                    "searchbar-id": w.searchbarId,
                    "model-value": w.modelValue,
                    placeholder: w.placeholder,
                    "onUpdate:modelValue": x[7] || (x[7] = (E) => n("update:modelValue", E)),
                    onSearch: x[8] || (x[8] = (E) => n("search", E))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : b("", !0)
              ])
            ], 10, Pg)) : b("", !0),
            B(w.$slots, "default")
          ])
        ]),
        d("div", Sg, [
          S.value && !o.value ? (i(), f("div", $g, [
            B(w.$slots, "mainnav", { hidemodal: u })
          ])) : b("", !0)
        ])
      ]);
    };
  }
}), Og = { class: "fr-table" }, Rg = { class: "fr-table__wrapper" }, Fg = { class: "fr-table__container" }, Vg = { class: "fr-table__content" }, Ng = ["id"], qg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, jg = {
  key: 0,
  class: "fr-checkbox-group fr-checkbox-group--sm"
}, Hg = ["id", "checked"], Wg = ["for"], Kg = ["tabindex", "onClick", "onKeydown"], Qg = { key: 0 }, Yg = { key: 1 }, zg = ["data-row-key"], Gg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Xg = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ug = ["id", "value"], Zg = ["for"], Jg = ["onKeydown"], eb = { key: 0 }, tb = ["colspan"], ab = { class: "flex gap-2 items-center" }, nb = ["selected"], rb = ["value", "selected"], lb = { class: "flex ml-1" }, sb = /* @__PURE__ */ O({
  __name: "DsfrCustomDataTable",
  props: /* @__PURE__ */ Be({
    id: { default: () => Me("table") },
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
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = xe(a, "selection"), s = xe(a, "rowsPerPage"), o = xe(a, "currentPage"), u = _(() => Math.max(Math.ceil(n.rows.length / s.value), 1)), c = _(() => n.pages ?? Array.from({ length: u.value }).map((P, Y) => ({
      label: `${Y + 1}`,
      title: `Page ${Y + 1}`,
      href: `#${Y + 1}`
    }))), p = _(() => o.value * s.value), m = _(() => (o.value + 1) * s.value), h = _(() => ["sm", "small"].includes(n.footerSize));
    function T(P, Y) {
      const y = k.value;
      return (P[y] ?? P) < (Y[y] ?? Y) ? -1 : (P[y] ?? P) > (Y[y] ?? Y) ? 1 : 0;
    }
    const k = xe(a, "sortedBy");
    k.value = n.sorted;
    const S = xe(a, "sortedDesc");
    function w(P) {
      if (!(!n.sortableRows || Array.isArray(n.sortableRows) && !n.sortableRows.includes(P))) {
        if (k.value === P) {
          if (S.value) {
            k.value = void 0, S.value = !1;
            return;
          }
          S.value = !0;
          return;
        }
        S.value = !1, k.value = P;
      }
    }
    const x = _(() => {
      const P = k.value ? n.rows.slice().sort(n.sortFn ?? T) : n.rows.slice();
      return S.value && P.reverse(), P;
    }), D = _(() => {
      const P = n.headersRow.map((y) => typeof y != "object" ? y : y.key), Y = x.value.map((y) => Array.isArray(y) ? y : P.map(($) => y));
      return n.pagination ? Y.slice(p.value, m.value) : Y;
    });
    function M(P) {
      P && (l.value = D.value.map((Y) => Y[0][n.rowKey])), l.value.length = 0;
    }
    const g = W(!1);
    function C() {
      g.value = l.value.length === D.value.length;
    }
    function E() {
      r("update:current-page", 0), g.value = !1, l.value.length = 0;
    }
    function I(P) {
      navigator.clipboard.writeText(P);
    }
    function N() {
      o.value = 0;
    }
    return t({ resetCurrentPage: N }), (P, Y) => (i(), f("div", Og, [
      d("div", Rg, [
        d("div", Fg, [
          d("div", Vg, [
            d("table", { id: P.id }, [
              d("caption", {
                class: A({ "fr-sr-only": P.noCaption })
              }, v(P.title), 3),
              d("thead", null, [
                d("tr", null, [
                  P.selectableRows ? (i(), f("th", qg, [
                    P.showToggleAll ? (i(), f("div", jg, [
                      d("input", {
                        id: `table-select--${P.id}-all`,
                        checked: g.value,
                        type: "checkbox",
                        onInput: Y[0] || (Y[0] = (y) => M(y.target.checked))
                      }, null, 40, Hg),
                      d("label", {
                        class: "fr-label",
                        for: `table-select--${P.id}-all`
                      }, " Sélectionner tout ", 8, Wg)
                    ])) : b("", !0)
                  ])) : b("", !0),
                  (i(!0), f(Q, null, Z(P.headersRow, (y, $) => (i(), f("th", K({
                    key: typeof y == "object" ? y.key : y,
                    scope: "col",
                    ref_for: !0
                  }, typeof y == "object" && y.headerAttrs, {
                    class: {
                      "text-right": y.align === "right",
                      "text-left": y.align === "left"
                    },
                    tabindex: P.sortableRows ? 0 : void 0,
                    onClick: (L) => w(y.key ?? (Array.isArray(P.rows[0]) ? $ : y)),
                    onKeydown: [
                      J((L) => w(y.key ?? y), ["enter"]),
                      J((L) => w(y.key ?? y), ["space"])
                    ]
                  }), [
                    d("div", {
                      class: A({
                        "sortable-header": P.sortableRows === !0 || Array.isArray(P.sortableRows) && P.sortableRows.includes(y.key ?? y),
                        "fr-sr-only": typeof y == "object" ? y.hideLabel : !1,
                        "flex-row-reverse": typeof y == "object" ? y.align === "right" : !1
                      })
                    }, [
                      B(P.$slots, "header", K({ ref_for: !0 }, typeof y == "object" ? y : { key: y, label: y }), () => [
                        V(v(typeof y == "object" ? y.label : y), 1)
                      ], !0),
                      k.value !== (y.key ?? y) && (P.sortableRows === !0 || Array.isArray(P.sortableRows) && P.sortableRows.includes(y.key ?? y)) ? (i(), f("span", Qg, [
                        ae(F(ye), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : k.value === (y.key ?? y) ? (i(), f("span", Yg, [
                        ae(F(ye), {
                          name: S.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : b("", !0)
                    ], 2)
                  ], 16, Kg))), 128))
                ])
              ]),
              d("tbody", null, [
                (i(!0), f(Q, null, Z(D.value, (y, $) => (i(), f("tr", {
                  key: `row-${$}`,
                  "data-row-key": $ + 1
                }, [
                  P.selectableRows ? (i(), f("th", Gg, [
                    d("div", Xg, [
                      Se(d("input", {
                        id: `row-select-${P.id}-${$}`,
                        "onUpdate:modelValue": Y[1] || (Y[1] = (L) => l.value = L),
                        value: y[0][P.rowKey] ?? `row-${$}`,
                        type: "checkbox",
                        onChange: Y[2] || (Y[2] = (L) => C())
                      }, null, 40, Ug), [
                        [ot, l.value]
                      ]),
                      d("label", {
                        class: "fr-label",
                        for: `row-select-${P.id}-${$}`
                      }, " Sélectionner la ligne " + v($ + 1), 9, Zg)
                    ])
                  ])) : b("", !0),
                  (i(!0), f(Q, null, Z(y, (L, R) => (i(), f("td", {
                    key: typeof L == "object" ? L[P.rowKey] : L,
                    class: A({
                      "text-right": P.headersRow[R].align === "right",
                      "text-left": P.headersRow[R].align === "left"
                    }),
                    onKeydown: [
                      J(te((X) => I(typeof L == "object" ? L[P.rowKey] : L), ["ctrl"]), ["c"]),
                      J(te((X) => I(typeof L == "object" ? L[P.rowKey] : L), ["meta"]), ["c"])
                    ]
                  }, [
                    B(P.$slots, "cell", K({ ref_for: !0 }, {
                      colKey: typeof P.headersRow[R] == "object" ? P.headersRow[R].key : P.headersRow[R],
                      cell: L,
                      idx: $ + 1
                    }), () => [
                      V(v(typeof L == "object" ? L[P.rowKey] : L), 1)
                    ], !0)
                  ], 42, Jg))), 128))
                ], 8, zg))), 128)),
                D.value.length === 0 ? (i(), f("tr", eb, [
                  d("td", {
                    colspan: P.selectableRows ? P.headersRow.length + 1 : P.headersRow.length
                  }, v(n.noResultLabel), 9, tb)
                ])) : b("", !0)
              ])
            ], 8, Ng)
          ])
        ])
      ]),
      d("div", {
        class: A(P.bottomActionBarClass)
      }, [
        B(P.$slots, "pagination", {}, () => [
          P.pagination && !P.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: A(["flex justify-between items-center flex-wrap", P.paginationWrapperClass])
          }, [
            P.showNbRows ? (i(), f("p", {
              key: 0,
              class: A(["fr-mb-0 fr-ml-1v", { "fr-text--sm": h.value }])
            }, v(P.rows.length) + " résulat(s)", 3)) : b("", !0),
            d("div", ab, [
              d("label", {
                class: A(["fr-label", { "fr-text--sm": h.value }]),
                for: "pagination-options"
              }, " Résultats par page : ", 2),
              Se(d("select", {
                id: "pagination-options",
                "onUpdate:modelValue": Y[3] || (Y[3] = (y) => s.value = y),
                class: "fr-select",
                onChange: Y[4] || (Y[4] = (y) => E())
              }, [
                d("option", {
                  value: "",
                  selected: !P.paginationOptions.includes(s.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, nb),
                (i(!0), f(Q, null, Z(P.paginationOptions, (y, $) => (i(), f("option", {
                  key: $,
                  value: y,
                  selected: +y === s.value
                }, v(y), 9, rb))), 128))
              ], 544), [
                [Xt, s.value]
              ])
            ]),
            d("div", lb, [
              d("span", {
                class: A(["self-center", { "fr-text--sm": h.value }])
              }, " Page " + v(o.value + 1) + " sur " + v(u.value), 3)
            ]),
            ae(F(la), {
              "current-page": o.value,
              "onUpdate:currentPage": Y[5] || (Y[5] = (y) => o.value = y),
              pages: c.value,
              "next-page-title": "Précédent",
              "prev-page-title": "Suivant"
            }, null, 8, ["current-page", "pages"])
          ], 2)) : b("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), ob = /* @__PURE__ */ Ae(sb, [["__scopeId", "data-v-4330f69d"]]), ib = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], ub = ["for"], db = {
  key: 0,
  class: "required"
}, cb = {
  key: 0,
  class: "fr-hint-text"
}, fb = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, pb = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrCustomCheckbox",
  props: /* @__PURE__ */ Be({
    id: { default: () => Me("basic", "checkbox") },
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
    const t = a, e = _(() => t.errorMessage || t.validMessage), n = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = xe(a, "modelValue");
    return (l, s) => (i(), f("div", {
      class: A(["fr-fieldset__element", { "fr-fieldset__element--inline": l.inline }])
    }, [
      d("div", {
        class: A(["fr-checkbox-group", {
          "fr-checkbox-group--error": l.errorMessage,
          "fr-checkbox-group--valid": !l.errorMessage && l.validMessage,
          "fr-checkbox-group--sm": l.small
        }])
      }, [
        Se(d("input", K({
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
        }), null, 16, ib), [
          [ot, r.value]
        ]),
        d("label", {
          for: l.id,
          class: "fr-label"
        }, [
          B(l.$slots, "label", {}, () => [
            V(v(l.label) + " ", 1),
            B(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", db, " *")) : b("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", cb, [
            B(l.$slots, "hint", {}, () => [
              V(v(l.hint), 1)
            ])
          ])) : b("", !0)
        ], 8, ub),
        e.value ? (i(), f("div", fb, [
          d("p", {
            class: A(["fr-message--info flex items-center", n.value])
          }, v(e.value), 3)
        ])) : b("", !0)
      ], 2)
    ], 2));
  }
}), mb = ["id"], hb = ["id"], vb = { class: "fr-hint-text" }, gb = ["data-fr-prefix", "data-fr-suffix"], bb = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], yb = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], wb = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, kb = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, _b = ["id"], xb = ["id"], Ib = /* @__PURE__ */ O({
  __name: "DsfrCustomRange",
  props: {
    id: { default: () => Me("range") },
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
    const e = a, n = t, r = W(), l = W(), s = W(), o = _(() => e.lowerValue !== void 0), u = _(() => e.step !== void 0), c = _(() => {
      if (e.lowerValue === void 0) {
        const T = (e.modelValue - e.min) / (e.max - e.min) * s.value;
        return `transform: translateX(${T}px) translateX(-${T / s.value * 100}%);`;
      }
      return `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * s.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`;
    }), p = _(() => {
      const h = e.max - e.min, T = (e.modelValue - e.min) / h, k = ((e.lowerValue ?? 0) - e.min) / h, S = e.small ? 12 : 24, w = (s.value - S) / (h / (e.step ?? 2)), x = o.value ? 32 * (1 - T) : 0;
      return {
        "--progress-right": `${(T * s.value + x).toFixed(2)}px`,
        ...o.value ? { "--progress-left": `${(k * s.value).toFixed(2)}px` } : {},
        ...u.value ? { "--step-width": `${Math.floor(w)}px` } : {}
      };
    });
    de([() => e.modelValue, () => e.lowerValue], ([h, T]) => {
      T !== void 0 && (o.value && h < T && n("update:lowerValue", h), o.value && T > h && n("update:modelValue", T));
    });
    const m = _(() => (e.prefix ?? "").concat(o.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return ge(() => {
      var h;
      s.value = (h = r.value) == null ? void 0 : h.offsetWidth;
    }), (h, T) => (i(), f("div", {
      id: `${h.id}-group`,
      class: A(["fr-range-group", { "fr-range-group--error": h.message }])
    }, [
      d("label", {
        id: `${h.id}-label`,
        class: "fr-label"
      }, [
        B(h.$slots, "label", {}, () => [
          V(v(h.label), 1)
        ]),
        d("span", vb, [
          B(h.$slots, "hint", {}, () => [
            V(v(h.hint), 1)
          ])
        ])
      ], 8, hb),
      d("div", {
        class: A(["fr-range", {
          "fr-range--sm": h.small,
          "fr-range--step": u.value,
          "fr-range--double": o.value,
          "fr-range-group--disabled": h.disabled
        }]),
        "data-fr-js-range": "true",
        "data-fr-prefix": h.prefix ?? void 0,
        "data-fr-suffix": h.suffix ?? void 0,
        style: _e(p.value)
      }, [
        d("span", {
          ref_key: "output",
          ref: l,
          class: "fr-range__output",
          "data-fr-js-range-output": "true",
          style: _e(c.value)
        }, v(m.value), 5),
        o.value ? (i(), f("input", {
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
          onInput: T[0] || (T[0] = (k) => {
            var S;
            return n("update:lowerValue", +((S = k.target) == null ? void 0 : S.value));
          })
        }, null, 40, bb)) : b("", !0),
        d("input", {
          id: h.id,
          ref_key: "input",
          ref: r,
          type: "range",
          min: h.min,
          max: h.max,
          step: h.step,
          value: h.modelValue,
          disabled: h.disabled,
          "aria-disabled": h.disabled,
          "aria-labelledby": `${h.id}-label`,
          "aria-describedby": `${h.id}-messages`,
          onInput: T[1] || (T[1] = (k) => {
            var S;
            return n("update:modelValue", +((S = k.target) == null ? void 0 : S.value));
          })
        }, null, 40, yb),
        h.hideIndicators ? b("", !0) : (i(), f("span", wb, v(h.min), 1)),
        h.hideIndicators ? b("", !0) : (i(), f("span", kb, v(h.max), 1))
      ], 14, gb),
      h.message || h.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${h.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        B(h.$slots, "messages", {}, () => [
          h.message ? (i(), f("p", {
            key: 0,
            id: `${h.id}-message-error`,
            class: "fr-message fr-message--error"
          }, v(h.message), 9, xb)) : b("", !0)
        ])
      ], 8, _b)) : b("", !0)
    ], 10, mb));
  }
}), Db = ["for"], Tb = {
  key: 0,
  class: "required"
}, Cb = {
  key: 0,
  class: "fr-hint-text"
}, Eb = ["id", "name", "disabled", "aria-disabled", "required"], Pb = ["selected"], Lb = ["selected", "value", "disabled", "aria-disabled"], Mb = ["id"], Bb = /* @__PURE__ */ O({
  inheritAttrs: !1,
  __name: "DsfrCustomSelect",
  props: {
    required: { type: Boolean },
    disabled: { type: Boolean },
    selectId: { default: () => Me("select") },
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
    const e = _(() => t.errorMessage || t.successMessage), n = _(() => t.errorMessage ? "error" : "valid"), r = function(l) {
      if (l === "")
        return null;
      let o = t.options.length > 0 && t.options[0].value !== "" && typeof t.options[0].value == "string" ? 0 : 1, u = t.options.length > o && typeof t.options[o].value == "string";
      return isNaN(l) || u ? l : parseInt(l, 10);
    };
    return (l, s) => (i(), f("div", {
      class: A(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      d("label", {
        class: "fr-label",
        for: l.selectId
      }, [
        B(l.$slots, "label", {}, () => [
          V(v(l.label) + " ", 1),
          B(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", Tb, " *")) : b("", !0)
          ])
        ]),
        l.hint ?? l.description ? (i(), f("span", Cb, v(l.hint ?? l.description), 1)) : b("", !0)
      ], 8, Db),
      d("select", K({
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
        d("option", {
          selected: !l.options.some((o) => typeof o != "object" || o === null ? o === l.modelValue : o.value === l.modelValue),
          disabled: "",
          hidden: ""
        }, v(l.defaultUnselectedText), 9, Pb),
        (i(!0), f(Q, null, Z(l.options, (o, u) => (i(), f("option", {
          key: u,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, v(typeof o == "object" ? o.text : o), 9, Lb))), 128))
      ], 16, Eb),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: A(`fr-${n.value}-text`)
      }, v(e.value), 11, Mb)) : b("", !0)
    ], 2));
  }
}), Sb = ["id"], $b = /* @__PURE__ */ O({
  __name: "DsfrComponentTooltip",
  props: {
    id: { default: () => Me("tooltip") },
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
    const t = a, e = W(!1), n = W(null), r = W(null), l = W("0px"), s = W("0px"), o = W("0px"), u = W(!1), c = W(0);
    async function p() {
      var G, ee, le, se, De, Ce, H, z;
      if (typeof document > "u" || !e.value || r.value.matches(":empty"))
        return;
      await new Promise((ne) => setTimeout(ne, 100));
      const g = (G = n.value) == null ? void 0 : G.getBoundingClientRect().top, C = (ee = n.value) == null ? void 0 : ee.offsetHeight, E = (le = n.value) == null ? void 0 : le.offsetWidth, I = (se = n.value) == null ? void 0 : se.getBoundingClientRect().left, N = (De = r.value) == null ? void 0 : De.offsetHeight, P = (Ce = r.value) == null ? void 0 : Ce.offsetWidth, Y = (H = r.value) == null ? void 0 : H.offsetTop, y = (z = r.value) == null ? void 0 : z.offsetLeft, L = !(g - N < 0) && g + C + N >= document.documentElement.offsetHeight;
      u.value = L;
      const R = I + E >= document.documentElement.offsetWidth, X = I + E / 2 - P / 2 <= 0;
      s.value = L ? `${g - Y - N + 8}px` : `${g - Y + C - 8}px`, c.value = 1, l.value = R ? `${I - y + E - P - 4}px` : X ? `${I - y + 4}px` : `${I - y + E / 2 - P / 2}px`, o.value = R ? `${P / 2 - E / 2 + 4}px` : X ? `${-(P / 2) + E / 2 - 4}px` : "0px";
    }
    de(e, p, { immediate: !0 }), ge(() => {
      window.addEventListener("scroll", p), n.value.addEventListener("click", () => e.value = !1);
    }), Ee(() => {
      window.removeEventListener("scroll", p);
    });
    const m = _(() => ["sm", "small"].includes(t.size)), h = _(() => ["md", "medium"].includes(t.size)), T = _(() => ["lg", "large"].includes(t.size)), k = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), S = _(() => `transform: translate(${l.value}, ${s.value}); --arrow-x: ${o.value}; opacity: ${c.value};'`), w = _(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), x = (g) => {
      g.key === "Escape" && (e.value = !1);
    }, D = (g) => {
      var C;
      (g.target === n.value || (C = n.value) != null && C.contains(g.target)) && (e.value = !0, globalThis.__vueDsfr__lastTooltipShow.value = !1);
    }, M = () => {
      e.value = !1;
    };
    return ge(() => {
      document.documentElement.addEventListener("keydown", x), document.documentElement.addEventListener("mouseover", D), t.disabled && n.value.addEventListener("click", (g) => g.preventDefault());
    }), Ee(() => {
      document.documentElement.removeEventListener("keydown", x), document.documentElement.removeEventListener("mouseover", D);
    }), de(t.disabled, () => {
      t.disabled ? n.value.addEventListener("click", (g) => g.preventDefault()) : n.value.removeEventListener("click", (g) => g.preventDefault());
    }), (g, C) => (i(), f(Q, null, [
      (i(), j(be(g.href !== "" ? "a" : "button"), K({
        id: `button-${g.id}`,
        ref_key: "source",
        ref: n,
        href: g.href !== "" && !g.disabled ? g.href : void 0,
        class: {
          "fr-link": g.isLink && !g.inline,
          "fr-btn": !g.isLink,
          "fr-btn--secondary": g.secondary && !g.tertiary,
          "fr-btn--tertiary": g.tertiary && !g.secondary && !g.noOutline,
          "fr-btn--tertiary-no-outline": g.tertiary && !g.secondary && g.noOutline,
          "fr-btn--sm": m.value,
          "fr-btn--md": h.value,
          "fr-btn--lg": T.value,
          "fr-btn--icon-right": !g.isLink && !g.iconOnly && k.value && g.iconRight,
          "fr-btn--icon-left": !g.isLink && !g.iconOnly && k.value && !g.iconRight,
          "fr-link--icon-right": g.isLink && !g.inline && !g.iconOnly && k.value && g.iconRight,
          "fr-link--icon-left": g.isLink && !g.inline && !g.iconOnly && k.value && !g.iconRight,
          "inline-flex": !k.value,
          reverse: g.iconRight && !k.value,
          "fr-btn--custom-tooltip": g.iconOnly,
          "justify-center": !k.value && g.iconOnly,
          [g.icon]: k.value
        },
        "aria-disabled": g.disabled,
        "aria-labelledby": g.id,
        onMouseleave: C[0] || (C[0] = (E) => M()),
        onFocus: C[1] || (C[1] = (E) => D(E)),
        onBlur: C[2] || (C[2] = (E) => M())
      }, g.$attrs), {
        default: U(() => [
          V(v(g.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-disabled", "aria-labelledby"])),
      d("p", {
        id: g.id,
        ref_key: "tooltip",
        ref: r,
        class: A(["fr-tooltip fr-placement", w.value]),
        style: _e(S.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, [
        B(g.$slots, "default", {}, () => [
          V(v(g.content), 1)
        ], !0)
      ], 14, Sb)
    ], 64));
  }
}), er = /* @__PURE__ */ Ae($b, [["__scopeId", "data-v-fa8d0ce5"]]), Ab = /* @__PURE__ */ O({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (t, e) => (i(), j(er, K({ "is-link": !1 }, t.$attrs), {
      default: U(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Ob = /* @__PURE__ */ O({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (t, e) => (i(), j(er, K({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: U(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), Rb = ["id", "href", "aria-disabled"], Fb = /* @__PURE__ */ O({
  __name: "DsfrLink",
  props: {
    id: { default: () => Me("link") },
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
    const t = a, e = _(() => ["sm", "small"].includes(t.size)), n = _(() => ["md", "medium"].includes(t.size)), r = _(() => ["lg", "large"].includes(t.size)), l = _(() => t.asButton ? "btn" : "link"), s = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-"));
    return (o, u) => (i(), f("a", K({
      id: `link-${o.id}`,
      ref: "source",
      href: o.href !== "" && !o.disabled ? o.href : void 0,
      "aria-disabled": o.disabled,
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
      B(o.$slots, "default", {}, () => [
        V(v(o.label), 1)
      ], !0)
    ], 16, Rb));
  }
}), Vb = /* @__PURE__ */ Ae(Fb, [["__scopeId", "data-v-44994a07"]]), Nb = (a, t) => a.matches ? a.matches(t) : a.msMatchesSelector ? a.msMatchesSelector(t) : a.webkitMatchesSelector ? a.webkitMatchesSelector(t) : null, qb = (a, t) => {
  let e = a;
  for (; e && e.nodeType === 1; ) {
    if (Nb(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, jb = (a, t) => a.closest ? a.closest(t) : qb(a, t), Hb = (a) => !!(a && typeof a.then == "function");
class Wb {
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
    onHide: c = () => {
    },
    onLoading: p = () => {
    },
    onLoaded: m = () => {
    },
    submitOnEnter: h = !1
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
      const { target: e } = t, n = jb(e, "[data-result-index]");
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
    this.search = Hb(t) ? t : (T) => Promise.resolve(t(T)), this.autoSelect = e, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = s, this.autocorrect = u, this.onShow = o, this.onHide = c, this.onLoading = p, this.onLoaded = m, this.submitOnEnter = h;
  }
}
const Kb = (a, t) => {
  const e = a.getBoundingClientRect(), n = t.getBoundingClientRect();
  return /* 1 */ e.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - n.height > 0 ? "above" : "below";
}, Qb = (a, t, e) => {
  let n;
  return function() {
    const l = this, s = arguments, o = function() {
      n = null, a.apply(l, s);
    };
    clearTimeout(n), n = setTimeout(o, t);
  };
}, Yb = (a) => {
  if (a != null && a.length) {
    const t = a.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? a.substring(1) : a
    };
  }
}, zb = {
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
    const a = new Wb({
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
    return this.debounceTime > 0 && (a.handleInput = Qb(a.handleInput, this.debounceTime)), {
      core: a,
      value: this.defaultValue,
      resultListId: `${this.baseClass}-result-list-${Yt()}`,
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
      const a = this.position === "below" ? "top" : "bottom", t = Yb(this.resultListLabel);
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Kb(
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
function Gb(a, t, e, n, r, l) {
  return i(), f("div", K({ ref: "root" }, {
    class: a.$attrs.class,
    ...a.$attrs.style ? { style: a.$attrs.style } : {}
  }), [
    B(a.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      d("div", Te(wt(l.rootProps)), [
        d("input", K({ ref: "input" }, l.inputProps, {
          onInput: t[0] || (t[0] = (...s) => l.handleInput && l.handleInput(...s)),
          onKeydown: t[1] || (t[1] = (...s) => r.core.handleKeyDown && r.core.handleKeyDown(...s)),
          onFocus: t[2] || (t[2] = (...s) => r.core.handleFocus && r.core.handleFocus(...s)),
          onBlur: t[3] || (t[3] = (...s) => r.core.handleBlur && r.core.handleBlur(...s))
        }), null, 16),
        d("ul", K({ ref: "resultList" }, l.resultListProps, mr(l.resultListListeners, !0)), [
          (i(!0), f(Q, null, Z(r.results, (s, o) => B(a.$slots, "result", {
            result: s,
            props: l.resultProps[o]
          }, () => [
            (i(), f("li", K({
              key: l.resultProps[o].id,
              ref_for: !0
            }, l.resultProps[o]), v(e.getResultValue(s)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Xb = /* @__PURE__ */ Ae(zb, [["render", Gb]]);
var Ub = {
  install: function(a, t) {
    a.use(Up), a.component("RouterLink", ev), a.component("DsfrFacets", wv), a.component("DsfrSelectMultiple", Gv), a.component("DsfrMenu", Dv), a.component("DsfrMenuLink", Pv), a.component("DsfrHeaderMenu", lg), a.component("DsfrCustomHeader", Ag), a.component("DsfrCustomHeaderMenuLinks", Qt), a.component("DsfrCustomDataTable", ob), a.component("DsfrCustomCheckbox", pb), a.component("DsfrCustomRange", Ib), a.component("DsfrCustomSelect", Bb), a.component("DsfrButtonTooltip", Ab), a.component("DsfrLinkTooltip", Ob), a.component("DsfrLink", Vb), a.component("autocomplete", Xb);
  },
  methods: Uh,
  utils: Zh
};
window && (window.DSFR = Ub);
export {
  Ub as default
};
//# sourceMappingURL=dsfr.es.js.map
