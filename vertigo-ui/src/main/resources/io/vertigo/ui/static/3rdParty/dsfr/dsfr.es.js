var nr = Object.defineProperty;
var rr = (a, t, e) => t in a ? nr(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var N = (a, t, e) => rr(a, typeof t != "symbol" ? t + "" : t, e);
import { defineComponent as F, h as fa, ref as K, computed as _, onMounted as ye, watch as ce, onUnmounted as Ee, Comment as lr, cloneVNode as sr, openBlock as i, createElementBlock as f, normalizeClass as R, createElementVNode as c, withModifiers as te, createTextVNode as V, toDisplayString as h, unref as q, Fragment as z, renderList as J, createVNode as ee, withKeys as ae, withCtx as U, createBlock as j, resolveDynamicComponent as ve, mergeProps as Q, createCommentVNode as g, useId as Yt, inject as Qe, toRef as st, renderSlot as S, provide as Re, resolveComponent as xe, useCssVars as zt, nextTick as Qa, normalizeStyle as Te, normalizeProps as Ie, mergeModels as Be, useModel as _e, withDirectives as Le, vModelCheckbox as yt, guardReactiveProps as kt, useAttrs as or, useSlots as Gt, hasInjectionContext as ir, useTemplateRef as ur, reactive as dr, Teleport as cr, vModelSelect as Xt, onBeforeUnmount as fr, Transition as pr, vShow as mr, vModelText as pa, toHandlers as hr } from "vue";
const Ya = /^[a-z0-9]+(-[a-z0-9]+)*$/, wt = (a, t, e, n = "") => {
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
    return t && !ut(d) ? null : d;
  }
  const l = r[0], s = l.split("-");
  if (s.length > 1) {
    const o = {
      provider: n,
      prefix: s.shift(),
      name: s.join("-")
    };
    return t && !ut(o) ? null : o;
  }
  if (e && n === "") {
    const o = {
      provider: n,
      prefix: "",
      name: l
    };
    return t && !ut(o, e) ? null : o;
  }
  return null;
}, ut = (a, t) => a ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && a.prefix === "" || a.prefix) && a.name) : !1, za = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), ft = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), _t = Object.freeze({
  ...za,
  ...ft
}), St = Object.freeze({
  ..._t,
  body: "",
  hidden: !1
});
function vr(a, t) {
  const e = {};
  !a.hFlip != !t.hFlip && (e.hFlip = !0), !a.vFlip != !t.vFlip && (e.vFlip = !0);
  const n = ((a.rotate || 0) + (t.rotate || 0)) % 4;
  return n && (e.rotate = n), e;
}
function ma(a, t) {
  const e = vr(a, t);
  for (const n in St)
    n in ft ? n in a && !(n in e) && (e[n] = ft[n]) : n in t ? e[n] = t[n] : n in a && (e[n] = a[n]);
  return e;
}
function gr(a, t) {
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
function br(a, t, e) {
  const n = a.icons, r = a.aliases || /* @__PURE__ */ Object.create(null);
  let l = {};
  function s(o) {
    l = ma(
      n[o] || r[o],
      l
    );
  }
  return s(t), e.forEach(s), ma(a, l);
}
function Ga(a, t) {
  const e = [];
  if (typeof a != "object" || typeof a.icons != "object")
    return e;
  a.not_found instanceof Array && a.not_found.forEach((r) => {
    t(r, null), e.push(r);
  });
  const n = gr(a);
  for (const r in n) {
    const l = n[r];
    l && (t(r, br(a, r, l)), e.push(r));
  }
  return e;
}
const yr = {
  provider: "",
  aliases: {},
  not_found: {},
  ...za
};
function Pt(a, t) {
  for (const e in t)
    if (e in a && typeof a[e] != typeof t[e])
      return !1;
  return !0;
}
function Xa(a) {
  if (typeof a != "object" || a === null)
    return null;
  const t = a;
  if (typeof t.prefix != "string" || !a.icons || typeof a.icons != "object" || !Pt(a, yr))
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
const ha = /* @__PURE__ */ Object.create(null);
function kr(a, t) {
  return {
    provider: a,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function qe(a, t) {
  const e = ha[a] || (ha[a] = /* @__PURE__ */ Object.create(null));
  return e[t] || (e[t] = kr(a, t));
}
function Ut(a, t) {
  return Xa(t) ? Ga(t, (e, n) => {
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
function Ua(a) {
  return typeof a == "boolean" && (tt = a), tt;
}
function _r(a) {
  const t = typeof a == "string" ? wt(a, !0, tt) : a;
  if (t) {
    const e = qe(t.provider, t.prefix), n = t.name;
    return e.icons[n] || (e.missing.has(n) ? null : void 0);
  }
}
function xr(a, t) {
  const e = wt(a, !0, tt);
  if (!e)
    return !1;
  const n = qe(e.provider, e.prefix);
  return t ? wr(n, e.name, t) : (n.missing.add(e.name), !0);
}
function Dr(a, t) {
  if (typeof a != "object")
    return !1;
  if (typeof t != "string" && (t = a.provider || ""), tt && !t && !a.prefix) {
    let r = !1;
    return Xa(a) && (a.prefix = "", Ga(a, (l, s) => {
      xr(l, s) && (r = !0);
    })), r;
  }
  const e = a.prefix;
  if (!ut({
    provider: t,
    prefix: e,
    name: "a"
  }))
    return !1;
  const n = qe(t, e);
  return !!Ut(n, a);
}
const Za = Object.freeze({
  width: null,
  height: null
}), Ja = Object.freeze({
  // Dimensions
  ...Za,
  // Transformations
  ...ft
}), Tr = /(-?[0-9.]*[0-9]+[0-9.]*)/g, Ir = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function va(a, t, e) {
  if (t === 1)
    return a;
  if (e = e || 100, typeof a == "number")
    return Math.ceil(a * t * e) / e;
  if (typeof a != "string")
    return a;
  const n = a.split(Tr);
  if (n === null || !n.length)
    return a;
  const r = [];
  let l = n.shift(), s = Ir.test(l);
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
function Cr(a, t = "defs") {
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
function Er(a, t) {
  return a ? "<defs>" + a + "</defs>" + t : t;
}
function Pr(a, t, e) {
  const n = Cr(a);
  return Er(n.defs, t + n.content + e);
}
const Mr = (a) => a === "unset" || a === "undefined" || a === "none";
function Lr(a, t) {
  const e = {
    ..._t,
    ...a
  }, n = {
    ...Ja,
    ...t
  }, r = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  let l = e.body;
  [e, n].forEach((M) => {
    const y = [], x = M.hFlip, I = M.vFlip;
    let L = M.rotate;
    x ? I ? L += 2 : (y.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), y.push("scale(-1 1)"), r.top = r.left = 0) : I && (y.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), y.push("scale(1 -1)"), r.top = r.left = 0);
    let T;
    switch (L < 0 && (L -= Math.floor(L / 4) * 4), L = L % 4, L) {
      case 1:
        T = r.height / 2 + r.top, y.unshift(
          "rotate(90 " + T.toString() + " " + T.toString() + ")"
        );
        break;
      case 2:
        y.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        T = r.width / 2 + r.left, y.unshift(
          "rotate(-90 " + T.toString() + " " + T.toString() + ")"
        );
        break;
    }
    L % 2 === 1 && (r.left !== r.top && (T = r.left, r.left = r.top, r.top = T), r.width !== r.height && (T = r.width, r.width = r.height, r.height = T)), y.length && (l = Pr(
      l,
      '<g transform="' + y.join(" ") + '">',
      "</g>"
    ));
  });
  const s = n.width, o = n.height, u = r.width, d = r.height;
  let p, v;
  s === null ? (v = o === null ? "1em" : o === "auto" ? d : o, p = va(v, u / d)) : (p = s === "auto" ? u : s, v = o === null ? va(p, d / u) : o === "auto" ? d : o);
  const m = {}, C = (M, y) => {
    Mr(y) || (m[M] = y.toString());
  };
  C("width", p), C("height", v);
  const D = [r.left, r.top, u, d];
  return m.viewBox = D.join(" "), {
    attributes: m,
    viewBox: D,
    body: l
  };
}
const Br = /\sid="(\S+)"/g, Sr = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let $r = 0;
function Ar(a, t = Sr) {
  const e = [];
  let n;
  for (; n = Br.exec(a); )
    e.push(n[1]);
  if (!e.length)
    return a;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return e.forEach((l) => {
    const s = typeof t == "function" ? t(l) : t + ($r++).toString(), o = l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    a = a.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + o + ')([")]|\\.[a-z])', "g"),
      "$1" + s + r + "$3"
    );
  }), a = a.replace(new RegExp(r, "g"), ""), a;
}
const $t = /* @__PURE__ */ Object.create(null);
function Or(a, t) {
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
], dt = [];
for (; Ge.length > 0; )
  Ge.length === 1 || Math.random() > 0.5 ? dt.push(Ge.shift()) : dt.push(Ge.pop());
Jt[""] = Zt({
  resources: ["https://api.iconify.design"].concat(dt)
});
function Rr(a, t) {
  const e = Zt(t);
  return e === null ? !1 : (Jt[a] = e, !0);
}
function ea(a) {
  return Jt[a];
}
const Fr = () => {
  let a;
  try {
    if (a = fetch, typeof a == "function")
      return a;
  } catch {
  }
};
let ga = Fr();
function Vr(a, t) {
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
function Nr(a) {
  return a === 404;
}
const qr = (a, t, e) => {
  const n = [], r = Vr(a, t), l = "icons";
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
function jr(a) {
  if (typeof a == "string") {
    const t = ea(a);
    if (t)
      return t.path;
  }
  return "/";
}
const Hr = (a, t, e) => {
  if (!ga) {
    e("abort", 424);
    return;
  }
  let n = jr(t.provider);
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
  ga(a + n).then((l) => {
    const s = l.status;
    if (s !== 200) {
      setTimeout(() => {
        e(Nr(s) ? "abort" : "next", s);
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
}, Wr = {
  prepare: qr,
  send: Hr
};
function Kr(a) {
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
function en(a, t) {
  a.forEach((e) => {
    const n = e.loaderCallbacks;
    n && (e.loaderCallbacks = n.filter((r) => r.id !== t));
  });
}
function Qr(a) {
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
      }), s.pending.length !== o && (e || en([a], l.id), l.callback(
        s.loaded.slice(0),
        s.missing.slice(0),
        s.pending.slice(0),
        l.abort
      ));
    });
  }));
}
let Yr = 0;
function zr(a, t, e) {
  const n = Yr++, r = en.bind(null, e, n);
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
function Gr(a, t = !0, e = !1) {
  const n = [];
  return a.forEach((r) => {
    const l = typeof r == "string" ? wt(r, t, e) : r;
    l && n.push(l);
  }), n;
}
var Xr = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function Ur(a, t, e, n) {
  const r = a.resources.length, l = a.random ? Math.floor(Math.random() * r) : a.index;
  let s;
  if (a.random) {
    let b = a.resources.slice(0);
    for (s = []; b.length > 1; ) {
      const w = Math.floor(Math.random() * b.length);
      s.push(b[w]), b = b.slice(0, w).concat(b.slice(w + 1));
    }
    s = s.concat(b);
  } else
    s = a.resources.slice(l).concat(a.resources.slice(0, l));
  const o = Date.now();
  let u = "pending", d = 0, p, v = null, m = [], C = [];
  typeof n == "function" && C.push(n);
  function D() {
    v && (clearTimeout(v), v = null);
  }
  function M() {
    u === "pending" && (u = "aborted"), D(), m.forEach((b) => {
      b.status === "pending" && (b.status = "aborted");
    }), m = [];
  }
  function y(b, w) {
    w && (C = []), typeof b == "function" && C.push(b);
  }
  function x() {
    return {
      startTime: o,
      payload: t,
      status: u,
      queriesSent: d,
      queriesPending: m.length,
      subscribe: y,
      abort: M
    };
  }
  function I() {
    u = "failed", C.forEach((b) => {
      b(void 0, p);
    });
  }
  function L() {
    m.forEach((b) => {
      b.status === "pending" && (b.status = "aborted");
    }), m = [];
  }
  function T(b, w, A) {
    const P = w !== "success";
    switch (m = m.filter((G) => G !== b), u) {
      case "pending":
        break;
      case "failed":
        if (P || !a.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (w === "abort") {
      p = A, I();
      return;
    }
    if (P) {
      p = A, m.length || (s.length ? E() : I());
      return;
    }
    if (D(), L(), !a.random) {
      const G = a.resources.indexOf(b.resource);
      G !== -1 && G !== a.index && (a.index = G);
    }
    u = "completed", C.forEach((G) => {
      G(A);
    });
  }
  function E() {
    if (u !== "pending")
      return;
    D();
    const b = s.shift();
    if (b === void 0) {
      if (m.length) {
        v = setTimeout(() => {
          D(), u === "pending" && (L(), I());
        }, a.timeout);
        return;
      }
      I();
      return;
    }
    const w = {
      status: "pending",
      resource: b,
      callback: (A, P) => {
        T(w, A, P);
      }
    };
    m.push(w), d++, v = setTimeout(E, a.rotate), e(b, t, w.callback);
  }
  return setTimeout(E), x;
}
function tn(a) {
  const t = {
    ...Xr,
    ...a
  };
  let e = [];
  function n() {
    e = e.filter((o) => o().status === "pending");
  }
  function r(o, u, d) {
    const p = Ur(
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
function ba() {
}
const Mt = /* @__PURE__ */ Object.create(null);
function Zr(a) {
  if (!Mt[a]) {
    const t = ea(a);
    if (!t)
      return;
    const e = tn(t), n = {
      config: t,
      redundancy: e
    };
    Mt[a] = n;
  }
  return Mt[a];
}
function Jr(a, t, e) {
  let n, r;
  if (typeof a == "string") {
    const l = At(a);
    if (!l)
      return e(void 0, 424), ba;
    r = l.send;
    const s = Zr(a);
    s && (n = s.redundancy);
  } else {
    const l = Zt(a);
    if (l) {
      n = tn(l);
      const s = a.resources ? a.resources[0] : "", o = At(s);
      o && (r = o.send);
    }
  }
  return !n || !r ? (e(void 0, 424), ba) : n.query(t, r, e)().abort;
}
const ya = "iconify2", at = "iconify", an = at + "-count", ka = at + "-version", nn = 36e5, el = 168, tl = 50;
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
  return ta(a, an, t.toString());
}
function Ft(a) {
  return parseInt(Ot(a, an)) || 0;
}
const xt = {
  local: !0,
  session: !0
}, rn = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let aa = !1;
function al(a) {
  aa = a;
}
let ot = typeof window > "u" ? {} : window;
function ln(a) {
  const t = a + "Storage";
  try {
    if (ot && ot[t] && typeof ot[t].length == "number")
      return ot[t];
  } catch {
  }
  xt[a] = !1;
}
function sn(a, t) {
  const e = ln(a);
  if (!e)
    return;
  const n = Ot(e, ka);
  if (n !== ya) {
    if (n) {
      const o = Ft(e);
      for (let u = 0; u < o; u++)
        wa(e, at + u.toString());
    }
    ta(e, ka, ya), Rt(e, 0);
    return;
  }
  const r = Math.floor(Date.now() / nn) - el, l = (o) => {
    const u = at + o.toString(), d = Ot(e, u);
    if (typeof d == "string") {
      try {
        const p = JSON.parse(d);
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
    l(o) || (o === s - 1 ? (s--, Rt(e, s)) : rn[a].add(o));
}
function on() {
  if (!aa) {
    al(!0);
    for (const a in xt)
      sn(a, (t) => {
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
function nl(a, t) {
  const e = a.lastModifiedCached;
  if (
    // Matches or newer
    e && e >= t
  )
    return e === t;
  if (a.lastModifiedCached = t, e)
    for (const n in xt)
      sn(n, (r) => {
        const l = r.data;
        return r.provider !== a.provider || l.prefix !== a.prefix || l.lastModified === t;
      });
  return !0;
}
function rl(a, t) {
  aa || on();
  function e(n) {
    let r;
    if (!xt[n] || !(r = ln(n)))
      return;
    const l = rn[n];
    let s;
    if (l.size)
      l.delete(s = Array.from(l).shift());
    else if (s = Ft(r), s >= tl || !Rt(r, s + 1))
      return;
    const o = {
      cached: Math.floor(Date.now() / nn),
      provider: a.provider,
      data: t
    };
    return ta(
      r,
      at + s.toString(),
      JSON.stringify(o)
    );
  }
  t.lastModified && !nl(a, t.lastModified) || Object.keys(t.icons).length && (t.not_found && (t = Object.assign({}, t), delete t.not_found), e("local") || e("session"));
}
function _a() {
}
function ll(a) {
  a.iconsLoaderFlag || (a.iconsLoaderFlag = !0, setTimeout(() => {
    a.iconsLoaderFlag = !1, Qr(a);
  }));
}
function sl(a) {
  const t = [], e = [];
  return a.forEach((n) => {
    (n.match(Ya) ? t : e).push(n);
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
      n && rl(a, e);
    } catch (l) {
      console.error(l);
    }
  r(), ll(a);
}
function xa(a, t) {
  a instanceof Promise ? a.then((e) => {
    t(e);
  }).catch(() => {
    t(null);
  }) : t(a);
}
function ol(a, t) {
  a.iconsToLoad ? a.iconsToLoad = a.iconsToLoad.concat(t).sort() : a.iconsToLoad = t, a.iconsQueueFlag || (a.iconsQueueFlag = !0, setTimeout(() => {
    a.iconsQueueFlag = !1;
    const { provider: e, prefix: n } = a, r = a.iconsToLoad;
    if (delete a.iconsToLoad, !r || !r.length)
      return;
    const l = a.loadIcon;
    if (a.loadIcons && (r.length > 1 || !l)) {
      xa(
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
        xa(v, (m) => {
          const C = m ? {
            prefix: n,
            icons: {
              [p]: m
            }
          } : null;
          Xe(a, [p], C, !1);
        });
      });
      return;
    }
    const { valid: s, invalid: o } = sl(r);
    if (o.length && Xe(a, o, null, !1), !s.length)
      return;
    const u = n.match(Ya) ? At(e) : null;
    if (!u) {
      Xe(a, s, null, !1);
      return;
    }
    u.prepare(e, n, s).forEach((p) => {
      Jr(e, p, (v) => {
        Xe(a, p.icons, v, !0);
      });
    });
  }));
}
const il = (a, t) => {
  const e = Gr(a, !0, Ua()), n = Kr(e);
  if (!n.pending.length) {
    let u = !0;
    return t && setTimeout(() => {
      u && t(
        n.loaded,
        n.missing,
        n.pending,
        _a
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
    const { provider: d, prefix: p, name: v } = u, m = qe(d, p), C = m.pendingIcons || (m.pendingIcons = /* @__PURE__ */ new Set());
    C.has(v) || (C.add(v), r[d][p].push(v));
  }), l.forEach((u) => {
    const d = r[u.provider][u.prefix];
    d.length && ol(u, d);
  }), t ? zr(t, n, l) : _a;
};
function ul(a, t) {
  const e = {
    ...a
  };
  for (const n in t) {
    const r = t[n], l = typeof r;
    n in Za ? (r === null || r && (l === "string" || l === "number")) && (e[n] = r) : l === typeof e[n] && (e[n] = n === "rotate" ? r % 4 : r);
  }
  return e;
}
const dl = /[\s,]+/;
function cl(a, t) {
  t.split(dl).forEach((e) => {
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
function fl(a, t = 0) {
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
function pl(a, t) {
  let e = a.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const n in t)
    e += " " + n + '="' + t[n] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + e + ">" + a + "</svg>";
}
function ml(a) {
  return a.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function hl(a) {
  return "data:image/svg+xml," + ml(a);
}
function vl(a) {
  return 'url("' + hl(a) + '")';
}
const Da = {
  ...Ja,
  inline: !1
}, gl = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, bl = {
  display: "inline-block"
}, Vt = {
  backgroundColor: "currentColor"
}, un = {
  backgroundColor: "transparent"
}, Ta = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Ia = {
  webkitMask: Vt,
  mask: Vt,
  background: un
};
for (const a in Ia) {
  const t = Ia[a];
  for (const e in Ta)
    t[a + e] = Ta[e];
}
const ct = {};
["horizontal", "vertical"].forEach((a) => {
  const t = a.slice(0, 1) + "Flip";
  ct[a + "-flip"] = t, ct[a.slice(0, 1) + "-flip"] = t, ct[a + "Flip"] = t;
});
function Ca(a) {
  return a + (a.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ea = (a, t) => {
  const e = ul(Da, t), n = { ...gl }, r = t.mode || "svg", l = {}, s = t.style, o = typeof s == "object" && !(s instanceof Array) ? s : {};
  for (let M in t) {
    const y = t[M];
    if (y !== void 0)
      switch (M) {
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        case "inline":
        case "hFlip":
        case "vFlip":
          e[M] = y === !0 || y === "true" || y === 1;
          break;
        case "flip":
          typeof y == "string" && cl(e, y);
          break;
        case "color":
          l.color = y;
          break;
        case "rotate":
          typeof y == "string" ? e[M] = fl(y) : typeof y == "number" && (e[M] = y);
          break;
        case "ariaHidden":
        case "aria-hidden":
          y !== !0 && y !== "true" && delete n["aria-hidden"];
          break;
        default: {
          const x = ct[M];
          x ? (y === !0 || y === "true" || y === 1) && (e[x] = !0) : Da[M] === void 0 && (n[M] = y);
        }
      }
  }
  const u = Lr(a, e), d = u.attributes;
  if (e.inline && (l.verticalAlign = "-0.125em"), r === "svg") {
    n.style = {
      ...l,
      ...o
    }, Object.assign(n, d);
    let M = 0, y = t.id;
    return typeof y == "string" && (y = y.replace(/-/g, "_")), n.innerHTML = Ar(u.body, y ? () => y + "ID" + M++ : "iconifyVue"), fa("svg", n);
  }
  const { body: p, width: v, height: m } = a, C = r === "mask" || (r === "bg" ? !1 : p.indexOf("currentColor") !== -1), D = pl(p, {
    ...d,
    width: v + "",
    height: m + ""
  });
  return n.style = {
    ...l,
    "--svg": vl(D),
    width: Ca(d.width),
    height: Ca(d.height),
    ...bl,
    ...C ? Vt : un,
    ...o
  }, fa("span", n);
};
Ua(!0);
Or("", Wr);
if (typeof document < "u" && typeof window < "u") {
  on();
  const a = window;
  if (a.IconifyPreload !== void 0) {
    const t = a.IconifyPreload, e = "Invalid IconifyPreload syntax.";
    typeof t == "object" && t !== null && (t instanceof Array ? t : [t]).forEach((n) => {
      try {
        // Check if item is an object and not null/array
        (typeof n != "object" || n === null || n instanceof Array || // Check for 'icons' and 'prefix'
        typeof n.icons != "object" || typeof n.prefix != "string" || // Add icon set
        !Dr(n)) && console.error(e);
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
          Rr(e, r) || console.error(n);
        } catch {
          console.error(n);
        }
      }
  }
}
const yl = {
  ..._t,
  body: ""
}, kl = F({
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
      if (typeof a != "string" || (n = wt(a, !1, !0)) === null)
        return this.abortLoading(), null;
      let r = _r(n);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== a) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: a,
          abort: il([n], () => {
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
      return Ea(yl, a);
    let e = a;
    return t.classes && (e = {
      ...a,
      class: (typeof a.class == "string" ? a.class + " " : "") + t.classes.join(" ")
    }), Ea({
      ..._t,
      ...t.data
    }, e);
  }
}), na = Symbol("accordions"), ra = Symbol("header"), Dt = Symbol("tabs"), Se = () => {
  const a = K(), t = K(!1), e = K(!1), n = () => {
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
}, se = (a = "", t = "") => (a ? `${a}-` : "") + Yt() + (t ? `-${t}` : ""), wl = { class: "fr-accordion" }, _l = ["aria-expanded", "aria-controls"], xl = ["id"], Dl = /* @__PURE__ */ F({
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
    } = Se(), o = K(), u = Qe(na), { isActive: d, expand: p } = (u == null ? void 0 : u(st(() => t.title))) ?? { isActive: o, expand: () => o.value = !o.value };
    return ye(() => {
      d.value && l(!0);
    }), ce(d, (v, m) => {
      v !== m && l(v);
    }), (v, m) => (i(), f("section", wl, [
      (i(), j(ve(v.titleTag), { class: "fr-accordion__title" }, {
        default: U(() => [
          c("button", {
            class: "fr-accordion__btn",
            "aria-expanded": q(d),
            "aria-controls": v.id,
            type: "button",
            onClick: m[0] || (m[0] = (C) => q(p)())
          }, [
            S(v.$slots, "title", {}, () => [
              V(h(v.title), 1)
            ])
          ], 8, _l)
        ]),
        _: 3
      })),
      c("div", {
        id: v.id,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse", {
          "fr-collapse--expanded": q(r),
          // Need to use a separate data to add/remove the class after a RAF
          "fr-collapsing": q(n)
        }]),
        onTransitionend: m[1] || (m[1] = (C) => q(s)(q(d), !1))
      }, [
        S(v.$slots, "default")
      ], 42, xl)
    ]));
  }
}), Tl = { class: "fr-accordions-group" }, Il = /* @__PURE__ */ F({
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
    }), l = K(/* @__PURE__ */ new Map()), s = K(0);
    return Re(na, (o) => {
      const u = s.value++;
      l.value.set(u, o.value);
      const d = _(() => u === r.value);
      ce(o, () => {
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
    }), (o, u) => (i(), f("div", Tl, [
      S(o.$slots, "default")
    ]));
  }
}), Cl = ["id", "role"], El = ["title", "aria-label"], Pl = /* @__PURE__ */ F({
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
    const e = a, n = t, r = () => n("close"), l = _(
      () => [
        `fr-alert--${e.type}`,
        {
          "fr-alert--sm": e.small
        }
      ]
    );
    return (s, o) => s.closed ? g("", !0) : (i(), f("div", {
      key: 0,
      id: s.id,
      class: R(["fr-alert", l.value]),
      role: s.alert ? "alert" : void 0
    }, [
      s.small ? g("", !0) : (i(), j(ve(s.titleTag), {
        key: 0,
        class: "fr-alert__title"
      }, {
        default: U(() => [
          V(h(s.title), 1)
        ]),
        _: 1
      })),
      S(s.$slots, "default", {}, () => [
        V(h(s.description), 1)
      ]),
      s.closeable ? (i(), f("button", {
        key: 1,
        class: "fr-btn fr-btn--close",
        title: s.closeButtonLabel,
        "aria-label": s.closeButtonLabel,
        onClick: r
      }, null, 8, El)) : g("", !0)
    ], 10, Cl));
  }
}), Ml = /* @__PURE__ */ F({
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
}), Ll = ["title"], dn = /* @__PURE__ */ F({
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
    ], 10, Ll));
  }
}), Bl = ["aria-label"], Sl = ["aria-expanded", "aria-controls"], $l = ["id"], Al = { class: "fr-breadcrumb__list" }, Ol = ["aria-current"], Rl = /* @__PURE__ */ F({
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
    } = Se(), s = K(!1);
    return ce(s, (o, u) => {
      o !== u && r(o);
    }), (o, u) => {
      const d = xe("RouterLink");
      return i(), f("nav", {
        role: "navigation",
        class: "fr-breadcrumb",
        "aria-label": o.navigationLabel
      }, [
        s.value ? g("", !0) : (i(), f("button", {
          key: 0,
          class: "fr-breadcrumb__button",
          "aria-expanded": s.value,
          "aria-controls": o.breadcrumbId,
          onClick: u[0] || (u[0] = (p) => s.value = !s.value)
        }, h(o.showBreadcrumbLabel), 9, Sl)),
        c("div", {
          id: o.breadcrumbId,
          ref_key: "collapse",
          ref: t,
          class: R(["fr-collapse", {
            "fr-collapse--expanded": q(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": q(e)
          }]),
          onTransitionend: u[1] || (u[1] = (p) => q(l)(s.value))
        }, [
          c("ol", Al, [
            (i(!0), f(z, null, J(o.links, (p, v) => (i(), f("li", {
              key: v,
              class: "fr-breadcrumb__item",
              "data-testid": "lis"
            }, [
              p.to ? (i(), j(d, {
                key: 0,
                class: "fr-breadcrumb__link",
                to: p.to,
                "aria-current": v === o.links.length - 1 ? "page" : void 0
              }, {
                default: U(() => [
                  V(h(p.text), 1)
                ]),
                _: 2
              }, 1032, ["to", "aria-current"])) : g("", !0),
              p.to ? g("", !0) : (i(), f("a", {
                key: 1,
                class: "fr-breadcrumb__link",
                "aria-current": v === o.links.length - 1 ? "page" : void 0
              }, h(p.text), 9, Ol))
            ]))), 128))
          ])
        ], 42, $l)
      ], 8, Bl);
    };
  }
}), Fl = /* @__PURE__ */ F({
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
    const t = a, e = K(null), n = _(() => `${+t.scale * 1.2}rem`), r = _(() => t.flip === "both" ? "horizontal,vertical" : t.flip);
    ce(() => t.title, l);
    async function l() {
      var u, d, p, v;
      if (!((u = e.value) != null && u.$el))
        return;
      const m = !!((d = e.value) == null ? void 0 : d.$el).querySelector("title"), C = document.createElement("title");
      if (!t.title) {
        C.remove();
        return;
      }
      C.innerHTML = t.title, await Qa(), m || (v = ((p = e.value) == null ? void 0 : p.$el).firstChild) == null || v.before(C);
    }
    ye(l);
    const s = _(() => {
      var u;
      return (u = t.name) != null && u.startsWith("vi-") ? t.name.replace(/vi-(.*)/, "vscode-icons:$1") : t.name ?? "";
    }), o = _(() => t.color ?? t.fill ?? "inherit");
    return (u, d) => (i(), j(q(kl), {
      ref_key: "icon",
      ref: e,
      icon: s.value,
      style: Te({ fontSize: n.value, verticalAlign: u.verticalAlign, display: u.display }),
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
}), we = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, be = /* @__PURE__ */ we(Fl, [["__scopeId", "data-v-73a1cd7e"]]), Vl = ["title", "disabled", "aria-disabled"], Nl = { key: 1 }, ql = /* @__PURE__ */ F({
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
    const e = a, n = _(() => ["sm", "small"].includes(e.size)), r = _(() => ["md", "medium"].includes(e.size)), l = _(() => ["lg", "large"].includes(e.size)), s = K(null);
    t({ focus: () => {
      var p;
      (p = s.value) == null || p.focus();
    } });
    const o = _(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), u = _(() => e.iconOnly ? 1.25 : 0.8325), d = _(
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
      style: Te(!o.value && p.iconOnly ? { "padding-inline": "0.5rem" } : {}),
      onClick: v[0] || (v[0] = (m) => p.onClick ? p.onClick(m) : () => {
      })
    }, [
      p.icon && !o.value ? (i(), j(be, Ie(Q({ key: 0 }, d.value)), null, 16)) : g("", !0),
      p.iconOnly ? g("", !0) : (i(), f("span", Nl, [
        V(h(p.label) + " ", 1),
        S(p.$slots, "default", {}, void 0, !0)
      ]))
    ], 14, Vl));
  }
}), je = /* @__PURE__ */ we(ql, [["__scopeId", "data-v-118397f5"]]), Tt = /* @__PURE__ */ F({
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
    const t = a, e = K(null), n = _(() => ["sm", "small"].includes(t.size)), r = _(() => ["md", "medium"].includes(t.size)), l = _(() => ["lg", "large"].includes(t.size)), s = _(() => ["always", "", !0].includes(t.inlineLayoutWhen)), o = _(() => ["sm", "small"].includes(t.inlineLayoutWhen)), u = _(() => ["md", "medium"].includes(t.inlineLayoutWhen)), d = _(() => ["lg", "large"].includes(t.inlineLayoutWhen)), p = _(() => t.align === "center"), v = _(() => t.align === "right"), m = K("auto"), C = _(() => `--equisized-width: ${m.value};`), D = async () => {
      var M;
      let y = 0;
      await new Promise((x) => setTimeout(x, 100)), (M = e.value) == null || M.querySelectorAll(".fr-btn").forEach((x) => {
        const I = x, L = I.offsetWidth, T = window.getComputedStyle(I), E = +T.marginLeft.replace("px", ""), b = +T.marginRight.replace("px", "");
        I.style.width = "var(--equisized-width)";
        const w = L + E + b;
        w > y && (y = w);
      }), m.value = `${y}px`;
    };
    return ye(async () => {
      !e.value || !t.equisized || await D();
    }), (M, y) => (i(), f("ul", {
      ref_key: "buttonsEl",
      ref: e,
      style: Te(C.value),
      class: R(["fr-btns-group", {
        "fr-btns-group--equisized": M.equisized,
        "fr-btns-group--sm": n.value,
        "fr-btns-group--md": r.value,
        "fr-btns-group--lg": l.value,
        "fr-btns-group--inline-sm": s.value || o.value,
        "fr-btns-group--inline-md": s.value || u.value,
        "fr-btns-group--inline-lg": s.value || d.value,
        "fr-btns-group--center": p.value,
        "fr-btns-group--right": v.value,
        "fr-btns-group--icon-right": M.iconRight,
        "fr-btns-group--inline-reverse": M.reverse
      }]),
      "data-testid": "fr-btns"
    }, [
      (i(!0), f(z, null, J(M.buttons, ({ onClick: x, ...I }, L) => (i(), f("li", { key: L }, [
        ee(je, Q({ ref_for: !0 }, I, { onClick: x }), null, 16, ["onClick"])
      ]))), 128)),
      S(M.$slots, "default")
    ], 6));
  }
}), jl = {
  key: 2,
  class: "fr-callout__text"
}, Hl = {
  key: 4,
  class: "fr-callout__text"
}, Wl = /* @__PURE__ */ F({
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
      class: R(["fr-callout", { [String(r.icon)]: e.value }])
    }, [
      r.icon && n.value ? (i(), j(be, Ie(Q({ key: 0 }, n.value)), null, 16)) : g("", !0),
      r.title ? (i(), j(ve(r.titleTag), {
        key: 1,
        class: "fr-callout__title"
      }, {
        default: U(() => [
          V(h(r.title), 1)
        ]),
        _: 1
      })) : g("", !0),
      r.content ? (i(), f("p", jl, h(r.content), 1)) : g("", !0),
      r.button ? (i(), j(je, Ie(Q({ key: 3 }, r.button)), null, 16)) : g("", !0),
      r.$slots.default && !r.content ? (i(), f("div", Hl, [
        S(r.$slots, "default", {}, void 0, !0)
      ])) : S(r.$slots, "default", { key: 5 }, void 0, !0)
    ], 2));
  }
}), Kl = /* @__PURE__ */ we(Wl, [["__scopeId", "data-v-c59b3cec"]]), Nt = /* @__PURE__ */ F({
  __name: "DsfrCardDetail",
  props: {
    icon: {}
  },
  setup(a) {
    const t = a, e = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = _(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("p", {
      class: R(["fr-card__detail", e.value ? { [String(r.icon)]: e.value } : {}])
    }, [
      r.icon && !e.value ? (i(), j(be, Ie(Q({ key: 0 }, n.value)), null, 16)) : g("", !0),
      S(r.$slots, "default")
    ], 2));
  }
}), Ql = { class: "fr-card__body" }, Yl = { class: "fr-card__content" }, zl = ["href"], Gl = { class: "fr-card__desc" }, Xl = {
  key: 0,
  class: "fr-card__start"
}, Ul = {
  key: 1,
  class: "fr-card__end"
}, Zl = {
  key: 0,
  class: "fr-card__footer"
}, Jl = {
  key: 1,
  class: "fr-links-group"
}, es = ["href"], ts = {
  key: 0,
  class: "fr-card__header"
}, as = {
  key: 0,
  class: "fr-card__img"
}, ns = ["src", "alt"], rs = {
  key: 1,
  class: "fr-badges-group",
  "data-testid": "card-badges"
}, ls = /* @__PURE__ */ F({
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
    const e = a, n = _(() => ["sm", "small"].includes(e.size)), r = _(() => ["lg", "large"].includes(e.size)), l = _(() => ["sm", "small"].includes(e.imgRatio)), s = _(() => ["lg", "large"].includes(e.imgRatio)), o = _(() => typeof e.link == "string" && e.link.startsWith("http")), u = K(null);
    return t({ goToTargetLink: () => {
      var d;
      ((d = u.value) == null ? void 0 : d.querySelector(".fr-card__link")).click();
    } }), (d, p) => {
      const v = xe("RouterLink");
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
        c("div", Ql, [
          c("div", Yl, [
            (i(), j(ve(d.titleTag), { class: "fr-card__title" }, {
              default: U(() => [
                o.value ? (i(), f("a", {
                  key: 0,
                  href: d.link,
                  "data-testid": "card-link",
                  class: "fr-card__link"
                }, h(d.title), 9, zl)) : d.link ? (i(), j(v, {
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
            c("p", Gl, h(d.description), 1),
            d.$slots["start-details"] || d.detail ? (i(), f("div", Xl, [
              S(d.$slots, "start-details"),
              d.detail ? (i(), j(Nt, {
                key: 0,
                icon: d.detailIcon
              }, {
                default: U(() => [
                  V(h(d.detail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : g("", !0)
            ])) : g("", !0),
            d.$slots["end-details"] || d.endDetail ? (i(), f("div", Ul, [
              S(d.$slots, "end-details"),
              d.endDetail ? (i(), j(Nt, {
                key: 0,
                icon: d.endDetailIcon
              }, {
                default: U(() => [
                  V(h(d.endDetail), 1)
                ]),
                _: 1
              }, 8, ["icon"])) : g("", !0)
            ])) : g("", !0)
          ]),
          d.buttons.length || d.linksGroup.length ? (i(), f("div", Zl, [
            d.buttons.length ? (i(), j(Tt, {
              key: 0,
              buttons: d.buttons,
              "inline-layout-when": "always",
              size: d.size,
              reverse: ""
            }, null, 8, ["buttons", "size"])) : g("", !0),
            d.linksGroup.length ? (i(), f("ul", Jl, [
              (i(!0), f(z, null, J(d.linksGroup, (m, C) => (i(), f("li", {
                key: `card-link-${C}`
              }, [
                m.to ? (i(), j(v, {
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
                }, h(m.label), 11, es))
              ]))), 128))
            ])) : g("", !0)
          ])) : g("", !0)
        ]),
        d.imgSrc || d.badges.length ? (i(), f("div", ts, [
          d.imgSrc ? (i(), f("div", as, [
            c("img", {
              src: d.imgSrc,
              class: "fr-responsive-img",
              alt: d.altImg,
              "data-testid": "card-img"
            }, null, 8, ns)
          ])) : g("", !0),
          d.badges.length ? (i(), f("ul", rs, [
            (i(!0), f(z, null, J(d.badges, (m, C) => (i(), f("li", { key: C }, [
              ee(dn, Q({ ref_for: !0 }, m), null, 16)
            ]))), 128))
          ])) : g("", !0)
        ])) : g("", !0)
      ], 2);
    };
  }
}), ss = ["id", "name", "value", "checked", "required", "data-testid", "data-test", "tabindex"], os = ["for"], is = {
  key: 0,
  class: "required"
}, us = {
  key: 0,
  class: "fr-hint-text"
}, ds = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, cs = /* @__PURE__ */ F({
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
  setup(a) {
    zt((l) => ({
      "5f542ece": l.readonlyOpacity
    }));
    const t = a, e = _(() => t.errorMessage || t.validMessage), n = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _e(a, "modelValue");
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
        Le(c("input", Q({
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
        }), null, 16, ss), [
          [yt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          S(l.$slots, "label", {}, () => [
            V(h(l.label) + " ", 1),
            S(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", is, " *")) : g("", !0)
            ], !0)
          ], !0),
          l.hint ? (i(), f("span", us, h(l.hint), 1)) : g("", !0)
        ], 8, os),
        e.value ? (i(), f("div", ds, [
          c("p", {
            class: R(["fr-message--info flex items-center", n.value])
          }, h(e.value), 3)
        ])) : g("", !0)
      ], 2)
    ], 2));
  }
}), It = /* @__PURE__ */ we(cs, [["__scopeId", "data-v-18fa6c7b"]]), fs = { class: "fr-form-group" }, ps = ["disabled", "aria-labelledby", "aria-invalid", "role"], ms = ["id"], hs = {
  key: 0,
  class: "required"
}, vs = ["id"], gs = /* @__PURE__ */ F({
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
  setup(a) {
    const t = a, e = _(() => t.errorMessage || t.validMessage), n = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _(() => e.value ? `${t.titleId} messages-${t.titleId}` : t.titleId), l = _e(a, "modelValue");
    return (s, o) => (i(), f("div", fs, [
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
          S(s.$slots, "legend", {}, () => [
            V(h(s.legend) + " ", 1),
            S(s.$slots, "required-tip", {}, () => [
              s.required ? (i(), f("span", hs, " *")) : g("", !0)
            ])
          ])
        ], 8, ms),
        S(s.$slots, "default", {}, () => [
          (i(!0), f(z, null, J(s.options, (u) => (i(), j(It, {
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
        ], 8, vs)) : g("", !0)
      ], 10, ps)
    ]));
  }
}), bs = { class: "fr-consent-banner__content" }, ys = { class: "fr-text--sm" }, ks = { class: "fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm" }, ws = /* @__PURE__ */ F({
  __name: "DsfrConsent",
  props: {
    url: { default: "" }
  },
  emits: ["acceptAll", "refuseAll", "customize"],
  setup(a) {
    const t = a, e = _(() => typeof t.url == "string" && t.url.startsWith("http")), n = _(() => t.url ? e.value ? "a" : "RouterLink" : "a"), r = _(() => ({ [e.value ? "href" : "to"]: t.url }));
    return (l, s) => (i(), f(z, null, [
      c("div", bs, [
        c("p", ys, [
          S(l.$slots, "default", {}, () => [
            s[4] || (s[4] = V(" Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services disponibles sur ce site. Pour en savoir plus, visitez la page ")),
            (i(), j(ve(n.value), Q(r.value, { "data-testid": "link" }), {
              default: U(() => s[3] || (s[3] = [
                V(" Données personnelles et cookies ")
              ])),
              _: 1
            }, 16)),
            s[5] || (s[5] = V(". Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez activer. "))
          ])
        ])
      ]),
      c("ul", ks, [
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
}), _s = {
  role: "navigation",
  class: "fr-pagination",
  "aria-label": "Pagination"
}, xs = { class: "fr-pagination__list" }, Ds = ["href", "title", "disabled", "aria-disabled"], Ts = ["href", "title", "disabled", "aria-disabled"], Is = ["href", "title", "aria-current", "onClick"], Cs = { key: 0 }, Es = { key: 1 }, Ps = ["href", "title", "disabled", "aria-disabled"], Ms = ["href", "title", "disabled", "aria-disabled"], Ls = /* @__PURE__ */ F({
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
    const e = a, n = t, r = _(() => Math.min(e.pages.length - 1 - e.truncLimit, Math.max(e.currentPage - (e.truncLimit - e.truncLimit % 2) / 2, 0))), l = _(() => Math.min(e.pages.length - 1, r.value + e.truncLimit)), s = _(() => e.pages.length > e.truncLimit ? e.pages.slice(r.value, l.value + 1) : e.pages), o = (D) => n("update:current-page", D), u = (D) => o(D), d = () => u(0), p = () => u(Math.max(0, e.currentPage - 1)), v = () => u(Math.min(e.pages.length - 1, e.currentPage + 1)), m = () => u(e.pages.length - 1), C = (D) => e.pages.indexOf(D) === e.currentPage;
    return (D, M) => {
      var y, x, I, L;
      return i(), f("nav", _s, [
        c("ul", xs, [
          c("li", null, [
            c("a", {
              href: (y = D.pages[0]) == null ? void 0 : y.href,
              class: "fr-pagination__link fr-pagination__link--first",
              title: D.firstPageTitle,
              disabled: D.currentPage === 0 ? !0 : void 0,
              "aria-disabled": D.currentPage === 0 ? !0 : void 0,
              onClick: M[0] || (M[0] = te((T) => d(), ["prevent"]))
            }, null, 8, Ds)
          ]),
          c("li", null, [
            c("a", {
              href: (x = D.pages[Math.max(D.currentPage - 1, 0)]) == null ? void 0 : x.href,
              class: "fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label",
              title: D.prevPageTitle,
              disabled: D.currentPage === 0 ? !0 : void 0,
              "aria-disabled": D.currentPage === 0 ? !0 : void 0,
              onClick: M[1] || (M[1] = te((T) => p(), ["prevent"]))
            }, h(D.prevPageTitle), 9, Ts)
          ]),
          (i(!0), f(z, null, J(s.value, (T, E) => (i(), f("li", { key: E }, [
            c("a", {
              href: T == null ? void 0 : T.href,
              class: "fr-pagination__link fr-unhidden-lg",
              title: T.title,
              "aria-current": C(T) ? "page" : void 0,
              onClick: te((b) => u(D.pages.indexOf(T)), ["prevent"])
            }, [
              s.value.indexOf(T) === 0 && r.value > 0 ? (i(), f("span", Cs, "...")) : g("", !0),
              V(" " + h(T.label) + " ", 1),
              s.value.indexOf(T) === s.value.length - 1 && l.value < D.pages.length - 1 ? (i(), f("span", Es, "...")) : g("", !0)
            ], 8, Is)
          ]))), 128)),
          c("li", null, [
            c("a", {
              href: (I = D.pages[Math.min(D.currentPage + 1, D.pages.length - 1)]) == null ? void 0 : I.href,
              class: "fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label",
              title: D.nextPageTitle,
              disabled: D.currentPage === D.pages.length - 1 ? !0 : void 0,
              "aria-disabled": D.currentPage === D.pages.length - 1 ? !0 : void 0,
              onClick: M[2] || (M[2] = te((T) => v(), ["prevent"]))
            }, h(D.nextPageTitle), 9, Ps)
          ]),
          c("li", null, [
            c("a", {
              class: "fr-pagination__link fr-pagination__link--last",
              href: (L = D.pages.at(-1)) == null ? void 0 : L.href,
              title: D.lastPageTitle,
              disabled: D.currentPage === D.pages.length - 1 ? !0 : void 0,
              "aria-disabled": D.currentPage === D.pages.length - 1 ? !0 : void 0,
              onClick: M[3] || (M[3] = te((T) => m(), ["prevent"]))
            }, null, 8, Ms)
          ])
        ])
      ]);
    };
  }
}), la = /* @__PURE__ */ we(Ls, [["__scopeId", "data-v-4dfa8248"]]), Bs = { class: "fr-table" }, Ss = { class: "fr-table__wrapper" }, $s = { class: "fr-table__container" }, As = { class: "fr-table__content" }, Os = ["id"], Rs = { key: 0 }, Fs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Vs = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Ns = ["id", "checked"], qs = ["for"], js = ["tabindex", "onClick", "onKeydown"], Hs = { key: 0 }, Ws = { key: 1 }, Ks = ["data-row-key"], Qs = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Ys = { class: "fr-checkbox-group fr-checkbox-group--sm" }, zs = ["id", "value"], Gs = ["for"], Xs = ["onKeydown"], Us = { class: "flex gap-2 items-center" }, Zs = ["selected"], Js = ["value", "selected"], eo = { class: "flex ml-1" }, to = { class: "self-center" }, ao = /* @__PURE__ */ F({
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
  setup(a, { emit: t }) {
    const e = a, n = t, r = _e(a, "selection"), l = _e(a, "rowsPerPage"), s = _e(a, "currentPage"), o = _(() => Math.ceil(e.rows.length / l.value)), u = _(() => e.pages ?? Array.from({ length: o.value }).map((E, b) => ({ label: `${b + 1}`, title: `Page ${b + 1}`, href: `#${b + 1}` }))), d = _(() => s.value * l.value), p = _(() => (s.value + 1) * l.value), v = _e(a, "sortedBy"), m = _e(a, "sortedDesc");
    function C(E, b) {
      const w = v.value ?? e.sorted;
      return (E[w] ?? E) < (b[w] ?? b) ? -1 : (E[w] ?? E) > (b[w] ?? b) ? 1 : 0;
    }
    function D(E) {
      if (!(!e.sortableRows || Array.isArray(e.sortableRows) && !e.sortableRows.includes(E))) {
        if (v.value === E) {
          if (m.value) {
            v.value = void 0, m.value = !1;
            return;
          }
          m.value = !0;
          return;
        }
        m.value = !1, v.value = E;
      }
    }
    const M = _(() => {
      const E = v.value ? e.rows.slice().sort(e.sortFn ?? C) : e.rows.slice();
      return m.value && E.reverse(), E;
    }), y = _(() => {
      const E = e.headersRow.map((w) => typeof w != "object" ? w : w.key), b = M.value.map((w) => Array.isArray(w) ? w : E.map((A) => typeof w != "object" ? w : w[A] ?? w));
      return e.pagination ? b.slice(d.value, p.value) : b;
    });
    function x(E) {
      if (E) {
        const b = e.headersRow.findIndex((w) => w.key ?? w);
        r.value = y.value.map((w) => w[b]);
      } else
        r.value.length = 0;
    }
    const I = _(() => r.value.length === y.value.length);
    function L() {
      n("update:current-page", 0), r.value.length = 0;
    }
    function T(E) {
      navigator.clipboard.writeText(E);
    }
    return (E, b) => (i(), f("div", Bs, [
      c("div", Ss, [
        c("div", $s, [
          c("div", As, [
            c("table", { id: E.id }, [
              E.noCaption ? g("", !0) : (i(), f("caption", Rs, h(E.title), 1)),
              c("thead", null, [
                c("tr", null, [
                  E.selectableRows ? (i(), f("th", Fs, [
                    c("div", Vs, [
                      c("input", {
                        id: `table-select--${E.id}-all`,
                        checked: I.value,
                        type: "checkbox",
                        onInput: b[0] || (b[0] = (w) => x(w.target.checked))
                      }, null, 40, Ns),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${E.id}-all`
                      }, " Sélectionner tout ", 8, qs)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(z, null, J(E.headersRow, (w, A) => (i(), f("th", Q({
                    key: typeof w == "object" ? w.key : w,
                    scope: "col",
                    ref_for: !0
                  }, typeof w == "object" && w.headerAttrs, {
                    tabindex: E.sortableRows ? 0 : void 0,
                    onClick: (P) => D(w.key ?? (Array.isArray(E.rows[0]) ? A : w)),
                    onKeydown: [
                      ae((P) => D(w.key ?? w), ["enter"]),
                      ae((P) => D(w.key ?? w), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: R({ "sortable-header": E.sortableRows === !0 || Array.isArray(E.sortableRows) && E.sortableRows.includes(w.key ?? w) })
                    }, [
                      S(E.$slots, "header", Q({ ref_for: !0 }, typeof w == "object" ? w : { key: w, label: w }), () => [
                        V(h(typeof w == "object" ? w.label : w), 1)
                      ], !0),
                      v.value !== (w.key ?? w) && (E.sortableRows === !0 || Array.isArray(E.sortableRows) && E.sortableRows.includes(w.key ?? w)) ? (i(), f("span", Hs, [
                        ee(be, {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : v.value === (w.key ?? w) ? (i(), f("span", Ws, [
                        ee(be, {
                          name: m.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : g("", !0)
                    ], 2)
                  ], 16, js))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, J(y.value, (w, A) => (i(), f("tr", {
                  key: `row-${A}`,
                  "data-row-key": A + 1
                }, [
                  E.selectableRows ? (i(), f("th", Qs, [
                    c("div", Ys, [
                      Le(c("input", {
                        id: `row-select-${E.id}-${A}`,
                        "onUpdate:modelValue": b[1] || (b[1] = (P) => r.value = P),
                        value: E.rows[A][E.rowKey] ?? `row-${A}`,
                        type: "checkbox"
                      }, null, 8, zs), [
                        [yt, r.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${E.id}-${A}`
                      }, " Sélectionner la ligne " + h(A + 1), 9, Gs)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(z, null, J(w, (P, G) => (i(), f("td", {
                    key: typeof P == "object" ? P[E.rowKey] : P,
                    tabindex: "0",
                    onKeydown: [
                      ae(te((k) => T(typeof P == "object" ? P[E.rowKey] : P), ["ctrl"]), ["c"]),
                      ae(te((k) => T(typeof P == "object" ? P[E.rowKey] : P), ["meta"]), ["c"])
                    ]
                  }, [
                    S(E.$slots, "cell", Q({ ref_for: !0 }, {
                      colKey: typeof E.headersRow[G] == "object" ? E.headersRow[G].key : E.headersRow[G],
                      cell: P
                    }), () => [
                      V(h(typeof P == "object" ? P[E.rowKey] : P), 1)
                    ], !0)
                  ], 40, Xs))), 128))
                ], 8, Ks))), 128))
              ])
            ], 8, Os)
          ])
        ])
      ]),
      c("div", {
        class: R(E.bottomActionBarClass)
      }, [
        S(E.$slots, "pagination", {}, () => [
          E.pagination && !E.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: R(["flex justify-between items-center", E.paginationWrapperClass])
          }, [
            c("div", Us, [
              b[6] || (b[6] = c("label", {
                class: "fr-label",
                for: "pagination-options"
              }, " Résultats par page : ", -1)),
              Le(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": b[2] || (b[2] = (w) => l.value = w),
                class: "fr-select",
                onChange: b[3] || (b[3] = (w) => L())
              }, [
                c("option", {
                  value: "",
                  selected: !E.paginationOptions.includes(l.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, Zs),
                (i(!0), f(z, null, J(E.paginationOptions, (w, A) => (i(), f("option", {
                  key: A,
                  value: w,
                  selected: +w === l.value
                }, h(w), 9, Js))), 128))
              ], 544), [
                [Xt, l.value]
              ])
            ]),
            c("div", eo, [
              c("span", to, "Page " + h(s.value + 1) + " sur " + h(o.value), 1)
            ]),
            ee(la, {
              "current-page": s.value,
              "onUpdate:currentPage": [
                b[4] || (b[4] = (w) => s.value = w),
                b[5] || (b[5] = (w) => r.value.length = 0)
              ],
              pages: u.value
            }, null, 8, ["current-page", "pages"])
          ], 2)) : g("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), no = /* @__PURE__ */ we(ao, [["__scopeId", "data-v-831b7391"]]), ro = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARoAAAFACAYAAABjprMrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC3eSURBVHgB7Z1bjJxVdu9Xd/XFdl9cHo+i4eryQxIRAjTJC+SEoS2dM/FIMJiMhDMSyM3DwANItqWEh0E6tkeHeQCNbEvwMMwDbeHRAaSMTczRAXIktyGag5JM3FxGhiRSl83FIyWM25dut/ua9a/+vvau3VXV3/7uVfX/SaW6rrrs/X3/WmvtvdfuEBKYCxcuDPX09OzQm+N9fX3HxRG1L3V3d8N+sr+/f1QcUfui2o/Afm5u7vimTZsmxZErV67swbVnXxZHLl26tKNQKAzNzs6OhrG/fPnycGdn5/Di4uLYwMDAmDji98HS0lI5ahuGsSckUSAS09PTS8ZlTwj7Cd9+amrqFXHEtNfLaXEEn2nYT+Ckc7G/evXqPsP+gorWkIu9vn7EbEP9Pjtc7NGGanMhrj7QyzEhqdApJBD6L2gf1LvFAXgBelXy73d0dIyIA/AETHtlSP/Vt4gD1mf63lVg1AsxX1/U93Oy1zbYZT00Ig6oJzOin2mKY6Q+UJy+PwkPhSY44+YdPeDHxAF9vR3mlMWB+fn5cRWWlffAbeWiuFE27+iJNyYOaMhT9RsQvogDKlSnotjbr9c2LYsDUfuAkFRQ1/+Q53qf1DCiJI6o279fL6fD2iM/4tmfdg07AEIdz37CNewA+M56OQl7/BZxBKGa2o16n39MhcMpdAP43Lj6wDX0I4QQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQvYK0OSh2g3ICEwLf3VmKHArZh1jnFbR+1DbK2j9IHhCRG3LVQUNtFHMFiSsP+pDiidgej1KNRm92WfcnF3hOplTZ0Pdlr1JNxXhgatQ9IOFgmIiCoR2PVQtklDti1UJaWlpxOEm+l8ZBhP+xaj0YxP9O5Ho1+3ohp39vb61qPZrfZhp2dnU5tgHo0Ul1PxqkeDVa/S3Uf7BeSChSa4JTNOzVqmzSkxuud7Ofm5sr2Y671aMx6Nt79sjhg16NZXFx0+g36+rPW+10QB+zvz3o0pOUwaqlUymiGqYXi1bNBCcsLYXIEXi2VC1744Rw24B/dqyVzIUw9GfxmI/RwDt1g79WCWQpTT8bqg4mw9Wj8PoiSqyKEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCEkS7xaJkNha6GAOOyj7BmN9UFRarGgDeKwdy1RYZJ1HxCSGFYtlFCLIlFDJmItlYNRaqnAxvj80+IIFiEa9WSc69lYNX0mXAXTrkcTZlFk1D4gJFH8Vb9hC095K6eXjItTiQSclJb9kms9GtveVSyNldehTlR9/TGrDV9xsdc22GN9vpNYRu0DEh7WowmIXQslBpzer1AorHp91Ho0rkStR6Of7/R948a1hhCJDwpNQObm5kbFK5SEE3ZhYWGvg7kMDg4eV7sjvr2epAdc7NevX19WuxUb3N60aZNr8a0Ve/38IwMDA2PigPeby97dMRW/MXFAhWq/YY9rpzaw+8BsjyDg9+rvPmw85GRPSGogmaoHeOhEZlR72Ea1D1MwKi57EId9ln1ACCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhAQg6vT5KHVYfPso7xHV3n8PiUDWSxiifn9CEgMHp1HLZCJM8ampqalXjA3qd4kjZj2ZkPVodhn1YA6KI9oGQ4b9sTD1aIx6MhOuxafy0AeEJIoe1CNZ1qPxTtKqejKuJ7pZNCqLejTGSV65aJsecrGP2gf4vaxHkw0sExGcqn9P19W/nZ2dkdz17u7uVfbFYnGjOGB/Z9ff0NHREckeb2G9X0nciPT5NV7PEColuqSF+Pzzz4f1ahgFjubm5o5v3bq1LDFRKBQO6YH6kN4s4b5rLRR8n97e3n2G/WEX+/7+/nH9Rz+iglVx91FXRX/nWXEDn+mHXOOokSNuwN4Pucr6XUbFAf3N8GAegmChnozaO3lEqEejbbhbvDbE5/temS1atUSshtCgTUe858qe3SSKjKH+j5BAnDt3bof2Rfnmm28et5/74osv8Ac91CEtwPnz51Ff5BW9DMtyYSQcUEU9aA7deOONTgWqGoEk5Pz8fAknfdhqbTgxYIv3kBBEtffzGmHto7ZBI3s8t7CwgH6r1IvBtR7AWzyBKOml6D2eiicCMdTPKnvfs6zifhaChIv+hnHXwmOtypdffnlMr4a1XbaZYgOR0bZDeDvZEkKjP3QC1/pDH/Z/qP7IEf2RB/UyGqfYkPAgp7Ru3bqinrBD2lcl9Rzu8kRkKE0BiQvPKxvX63FPhMbbUYDwR6+/H4JShJd6ww03HDFEBu20remFBm6bHrDHZmdnt9qhkoZS+/WH7/ae479PSkBQurq6cKANwSORZW9kyLtuB/BnN6Yn2Ck99iA8ZWlxDLEpyXKJVIS44ns5TS80npg8dNNNN91tPzcxMVHs6em5oA2w7ZZbbhkTEisQFE1Sl/QmBOUuCAu8lWbzTFLA93qc6zQ3E5bYTJqhVKskg2se2J6bLiQ6ppfihTyVJJ/5Gn0MyVQhq/DbbUSH+JH3QZH0NzFA0IJhln8uFnGcyLJ3J63g0Qzrv+nJWl6LKuw+fXxEvZ2tQpzwksbDnqgMS/uEPamibTuqV2/29fW5jgDmCjNPown9x/W4wegkkvkjyNm0xN/PV199dQz/sBhyVldtFCGTejO79Yfvx7YmKkD7hdTFG+0ZZviTKRjNGtOczoFmy+mYIuOHS2YYBbFpCaGBsKhbX0n8Gg9PesJzSEgV3hA58ir3w1uhqOQLeDnNlM/RP/qT3h991fC2KUAtFVDjh2GOBoZK9R96jCNN13Mr6so+RG+luUAuR4/nA3kXHJx3mP9Ua8Kef04yc9di2MLi5VdIEwPBmZmZebyZh8kpNE2OLyx6uV+WZ2cOC2lJEFI1Yw4HUGiaEC95i4mKDzEUaj+0v/erh3O4mYbGKTQOoMyBXu3A+pdr16497PrPMj09vVv/lfbDXgXi8aDrjcxwSO1HKCxEltdeHdBjaFSaAApNQLDKV0dpXvHvI25ev379tqD2GOlRoTDrp5Q3bNhQd36PN+t2hF4LaUSzhFMtVSYiYSLVo6lRtsC+XxEjO9fC2bakEXpsjPT29g7rH2GuvRsWvgrOKFbr+ndQD8bBtlKPRpZLWFTZe1XfDqL6HTwehFZM6BJHMCkO1QsP5rUeMv8qHfBn0KIeSZi5DbBXwUGuBaHQRuZbSAIgf7gtb6EUhSYl/LAI4iJcN0SSZVI95r15CqUoNAniFXrCsgjObyGpg2FwHbBwKjmbFBSamPFGizDHZRfFheSA4xpKPZ71nBsKTUx4w9ec50LySOZ5GwpNBMy5LvReSM7JVGwoNCGg90KaFMwmfjjsDhhRoNAEhN4LaREwIrUtbbGh0KyBP3KknbOH3gtpEVIXGwpNHbzwCEPTO4SQ1iNVsaHQWHgT6/YxPCJtQGpiQ6GR6/kXr+ZwSQhpH1IZjWproWH+hZAKiYtNWwoNBYaQVYx7YpPIDOK2EhoKDCENOb5hw4aHJQHaQmgoMIQEI6mFmC0tNBQYQtxB1T4VmyMSIy0pNBQYQiIxqfmau+NMDreU0FBgCImNsic2sSSHW6ZmMHYp6O3tPe1tZ0KRISQaJT2f9klMNL1Hw5m8hCSHnlcP9/X1HZeINK3QaJg0pGHSQQoMIYkSS76m6UIn5GGwrYQXJg0LISRJkPd8RSLSVEKDLWV7enom9OYeIYSkAv7Q9dyLdM41RejklWw4KNZukYSQ1EAItTXsKFSuPRqESVNTU694e1ZTZAjJjqKmK0KHULn1aBAmcaiakHyxsLCwLcwurbkTGvViSkg+MdFLSC4pb9iwYas4kqvQ6erVq/vUPZugyBCSW0qaztgvjuTCo8GcGC/+Yx6GkPzjnBjO3KPxvJjTQpEhpFko9vT0OA13Z+bRMBdDSFPjNGM4E4/Gm3jX9jN7v/66UyYmuuS3vy0IIU0GvJrAiy5T9WgwL0a/3EEU1pE2Z2FB5MyZ7pX7W7YsyMDAohDSTHi5mvJar0vNo/ESvqcpMrVZWhJCmo6gXk0qHg0n39Xm0qUODZ8KMji4KJs305shzYl6NZvWGoFK1KPxV1rrzUMUmdUMDi7J1q3zFBnS1AQZgUrMo8GokoZKx4TD1iRnLCx0yORkh3R3L1XEnkRmzXk1iXg0Xj6GCyFJLvn3fy/I+fMFOXeuS6amuCt0DKw5ryZ2obl69eou/VCITEkIyRkY7Zubuy4uMzMUmjjQ1MhDjZ6PVWi8pO8o8zEkrxQKIr/3ewuV293dIgMDDJ1iYgh1o+o9GZucYykBRpaEkCYAeZpCgSITM3W31I1FaCgyhBBpkBSOHDqhAh5FhhAiy1X4Rmo9EUloIDKc6UsI8amXFA4dOjFcIiReNOxAqUxZXFzURHV35dLZ2XybydaaKRxKaCgy7hw9+q/y3ntfCcmOjRt75emn75AtW/olT0BYrly5Urku6LAYxGV+fr7yXH9/f+WxJmOvJoUPmQ84Cw1Fxp0TJ87Kzp3vCsme++67Qd555wHJE5qCqAjLwMDAigej59iK+AwODiIkkWZBv+vY+vXrt5mPOfll/uJIIU589NF/CskH585dkTwBIZmdnRU9MavCJAgLvBkIDp5vJlBnCusczccCCw3WLunVISGExAaEBiAfYwOxgfj4r2km9PfsMO93BTHyFkieFBILZ878leYJBoSkwxNPnKrkyPKIHxLBc6kVHtV7PO9oXul+vRr17wfyaLxV2CUhhMSKn/ydmZlZ9RxGoeDN9PT0SLOhAlnl0awpNEj+CldhE5IYfX19FVHxk8K46HmHnKisW7euKYe4laIms1d0o2HohHIPTP4mz+x7v5K5938l6x7dKYUtt1Q9N//RJ3LtxNs1n1s4+7nMHH1deh/4rnTddbsEZWnyksz84jVZ1OtWA22Etmomurq6KiNOEJbLly9XHkO4pEPEiCakWVGBHNarcdyuKzTIGnshE0kQiMXF7d+v3L764s9l85l/ko7iYNVzEAT7uaWLlyrP4TXTz/1Uiu/8rXTf92eBPnNy+1+qgP1GWpX5D38j/S/8WJoJiA2GsZGTwaVJvZgqvF1OKgNIdX+NigxCppKQRIEn4wPxWLp4seq+73Xg9vzHn6w8tzh5sSIy5v2gLBp2rcis0abNhj/S1Arob7nfv13zF3lD2U470ZFw9D74Xem8dTkkWv/UD6XTCI+67rxdw6Ltldvd991b5bEgRNjw9A9Xnuu5779JUDY8+9fSqnRsHJS+H7Xu72syiurVbMGNmqETQ6b0wImx+dN/rPv84Buv1H2u7/kfVy6urFeBWu+JFCFJogluzBAeXeXRaKZ4RDjKRAiJh4qWrBIajQ8Db3NJCCGN0DxNCddVoZPnzZSEJMqJE2UpFpt32DIu7rhjs9x112YhrYsKzV247rIe3C0kcZ555gMhy2AlNVZUk5alhKkyK6ETKpir0DA3Q1KFNXpan2KxuHFFaDQ3s0sISZGNG3vk0Uf/QEhro07M3WbotENIKiBcuPXWfFV5ywIIDXNVrY86McWK0Fy6dGkHN31LD4gMy0SQdgEjT5XQqVAoPCSEEJIA6tFsqQiNKs6wEEJIAiwuLm7q9NY1lYQQQhJAHZktnRo2cUibEJIkRQoNISRxOv0pwoQQkhDFTg5rE0ISpti5tLRUEkIISZAuFZpiM+4b0058+OHXculStrsVcuEjiUIXQ6d8c9ttr8nZs5cla+68c7N88MFfCiFhaI0qyC3K+++fz4XIgI8++rriWRESBgpNjoEXkZfFl828PssM+x54YIuQ9Am09zbJBqxuxkrvjz76nVy8mG2O5oEHbpViMf6tWeElffzx15XfVy5f1utrVc9D3LDCe1l0B/S+u/A+9tgfSKm0LJLMNWVCGUJTFi5ByC040VpppTcKXSEkfO+98yowv5PJyWtO9hCdP//zb8n3vldS0bgxsPBQYLKFHg1JnMnJWXnppY8r4gKRifZe1+Stt85WLgACAo+FBbRyzSRGncqcS0OSwBeYl176TWDPxSyGFSQRDuHC5bnn/kWeffZPKDg5RDVmsmtxcfEs59GQuHnuuV83FBgIyoMPbtHcyzcrOyE0SjZjxOvs2St6/Z91vSKI0hNPnKLg5BDVmIuYsDdJoSFxgcT1E0+MVcTBxq8RvJxfCZ4zQSIYFwjTs88uh08nTiB8KleuTXzBgSA9++yfhkoek3hRjakkg8eFkBh48cVP5Jln/v+qxyEwTz99hzz11O2x1AjGeyAvgwuEBV7M0aP/WvUa3Ifn89pr/4N7R2VMJXQSCk2u8Udp0uDRR/8wtAcAgYHQmMQtMLVAuPXyy/dXwiVbcCBC9977S3n++Xsq34NkQ8WjmZubK/f2shJ9HkFeYvv2/yNpAaE4c+YHTvNlkPDdufPdVWKI0AgCkNbQvC84+Fzkh86du7LyHDbswzwdhFIkfSA0nZs2bZrUG/Rqcog9eS35z3ObFAiR2b79rVUiA+8CEw2zmP+DcKrW7pfwdiBAJH36+/snKksQVGhOCckdSICm6fJDIFy8mSefPLUq6fuzn92fuecAgYPY2N8DYvPiix8LSRfN0Zz1J+zRo8kpyC/gkjdw0p44UV657y+XgDi6gBwURo6QT8FMYXhV/pA48joY9sblscf+sDLq5AKEc/m7XvdkEEbdddc3OVM4PSraUhGaQqEwpl6NEBIEJFztMOSNN74TWGSQe4Jn8Ytf/FvDiXx4Dhd4TQjPXPNHoJbYPPLIu/LBB9/n0HcKqK5U5h9UQqf169eXZXnNEyENgUjAmzF5/vl7A3kIyOlgjsttt/1veemlT5zWOcHTCVsyw57Ah/fCXB+SCtc9GrC4uPhmZ2fnbiGkAfAMzBP+qaf+WPNIf7ymHUa0fvKTf2k4U/jb376hcr1x4/IoKJLhEDaMIOFz7PkwC2c/l9m3/q/0PPBdKWy5peHnv/DCvZUwzR+NgocEr4rD3smiujKG6xWhURfnuF5RaEhdEDKZ81SQO8EJvBa15tj49si9PPro7zuPUEFkJu/977I4eUk6/tdPZfOZf5KO4mDd10PAEN7dc88vVx6DZ4a5Q0mUvyDLzM/PVzyalcJXAwMDyNNMCiF1sEMmJH/XAqGSLTIQGNh++ukPKmFNmGHwi9u/XxEZsHTxksx//MmaNsghmSNRCKGw6JMkRhnTZ3CjqsKeCs0RIaQG8GTMkAk5j7UEAiJjLw1ACITaw1FGfa488z8rHo1P5623SPd9fxbIFmGeWbUQIojcEYkf1ZMP/dtd1hMMn3IGTgQkTpMAJ9zrr38nUOhgezP+aE6j19sigzk2mFAXhZmjr8vVF3++cr9j46AU3/nbwPYIoeDVYA4Q8L0azhqOn46OjjH/dpXQIHyampqa5M4I+QAJy1qLFOMCHkqQk8wukr6WN4Okqz38HYfIwIuZUm/GpP/5H6+ZCLbB90C7+jOhIeZPPXUHczUx4yeCwari5Ayf8kMahclRh3ctXn212jNZy5t58sn3Vr0+qsgAMy8D1j/1Q1n32E4JgznaBMFB3WISK5P9/f0rE4FXlfJk+JQf4DXAE3j//a8kCbZsGQwkAOZaJiRUG3kzCJls78f2mJZULK7psDTyKkG9kVp5mf4Xflzztfh8DGM3ygMhV2N6Xa+++hlnC8eIvaxpldAgfLp69SpGoIaFZI5fdyUrVodNv9/w9fbwdy3v5/KTu+Xaibcrtwd+dli9kkekES55GSyL2Lnz7yu3ISaYTFgL5GogLL6I2gW0SDQ8h2WFmvs6LSwsvCmEyHK+xQQ7D9TDHpmCQNbyfnyRARCdmVffqPuernkZUzDWGlF68MHSym2ET9wgLz6wrMm8X1No5ubmRjmnhgCUxPSBh9KoWp2dy6lXt3fdo9UeTCOxcc3LmOIBjh79rO5r7d+SVIjahox7y5pWqLndCibZ6OjTYb25T0hbY5aBaLRoEh6BmcvBjpD1cjkDLx+uXM8cvS4uEJuFc+dk8ewXVbmYoHkZH38Zgz+iBA+n3jIDOydTq84xcUdHm1aVnam7r9Ps7Oyh3t5eCk0bg5PVLIbVyJuxT1Lbs7CpJTbTz/207uuDzpfxcy/+vk9riQfE0A/3UFidxMKo/UDdvbfh1XR2dh4X0rbYq6UbjTbZ+Y0gJSMgNnYYVY8Nz/514BGqb3/7eh5prVXfd9zxjarXksiUzWFtn85GFpqrOSykbbFPvEZCc+5c9ckcdOcBCIhN1523V8Ikk1kjgbwW9vc06wfbmEXTXbfnJaupNw+vodBgqNucRkxIPczRHZdFkgsf/abqPkaUNn3w/2Tzp/9YtX5p7v1fVebfBMEuaNXIozFfS48mOhoFjdZ8XNZgfn7+gJC2JGyhKRfmPqpex9X74PaV2/b8mqWLFyUIyNOQ9IFTYo82+awpNPRq2he/AFWS2HmXGSNEmnvvV1XPdWzcKEFoFCqR5FhYWKi7fKlLAgCvplAoDAtpK+xFho0mv5mvdfGEeh/8rlyWPSv3MTkP+ZhKjRnD2ylo3qZRYatGNArlUMGPxMKk5nTrDh6t6dEAejXtib2os9E+U/bizKBig2HrDU//sOox5GPmrZBqYI35Myb2CNjgYP1QykwAZ7EPVaug+nDcL3JVi0BCA5iraT/sbWwbTdFfPcs2+Da+fZoAtsXGBAnioIWtgLlsAvmaRiNgZpiVxmr5FqahPgQKnQAXW7Yfy4XCr8+ybeSl2PNm/u7vynWXINQCYlO443aZfevtldnAEJf1KkCu9Wbs1eaNMCf0cfuVcDRKAvsEFhrAXE37gRPVP3EbeSn2amhcI6fjUkwKa5jC1pfxwcJOc5i6kdjZs4ZdN78jywSZbxc4dAJeAXMWxmojzLBjrVm29mroLAp/2ws7sfapHuaCUYAdLIkz5cHBwTVXEDgJTcWgs3M/V3a3D/aaJXMbXBuUhTDnsKRd+BvejOl1rVVy1N7Sl4Wv3FlcXAyUu3UWGi8W49KENgEnnykejQpE4XV2icyf/OTXkga1dtBsVHIUrzdFiSITCqxrGg3yQmehAVjZTa+mfTC9GpycjUafam1ngh0hk8beQXMtb8auPbPWanOymqDeDAglNBgv10wzh7vbBLuUqL2Nigm8mp//fLjqsWee+cBpuNsVe2uXeiVEbRvz9VmWS21SAnszIJTQgA0bNsCrGZeMWVhYEB12r/mcKq5MT09jRamQ8CCsMEdkcFI3yr3g9XaxqUceeXdVojYOsG2KvbUL6gQ38mbskqNmWQkSDBdvBoQWGu/D9krGQGhmZmZkamqq6nGIzOXLl+XatWsUmhjADpM+QXIvzz9/T1XeAzbYtM0WhbAgx/IXf/HWqu124cl873ulhraum+GRVTh5MyCS0GC4W68yLY7V09ODBDXyRiti44sMrvv6+jBSJiQaCC3s3Mta4dAbb3xn1dwUnOS33fZaw/CrEfCkIFb33vvLVZ8PwVhrM7xa28Fw6YEb+uf+uDgS+QzUXM3erBPD69atWxGbK1euVIkMhIjEg30S/83fNN5FE/ka7LNth1E40bEvty84QRY2+rtf/tEfvVYRC7tIFcKltURmeWTq11Xfj96MG3q+j3oOhhNOM4NrgeHuPBQyh9hAXBAqAYpM/MCrMeeqYGYtciT19k7yQRgFbwgnuTlr1xccAM8Hr4F34c8mxvPwYP7hH35bt/odbGp5TrXYvv2tqvsYIaM340yoQaAOiQlNuk7oVUkywgyXAEQGYpMHcIKZeYEzZ/6qaQ9wnPz33PPLKsEIuq82bO0RorD4c3aeeur2VYs/awFBNPM5EKhPP/2BkOBo5HJAz6n9EoLYkhdh4ra4sHMyds6GxAcE0g5RcBIH2XwNti+/fH9FaJEbCVMJbznc+dPKeyDsCSIywJxoiPd4550HhDhRDisyIHLo5IO4TU/sIxrD7ZIUsUXGDJf8Ye+8eDatAkIOlFfwJ+LBu0FY8vbbDwQqSu4Ljsj9FQFA/gVhGC61CqLfeec39PLNyrqlsDN4MWoGQQTwwBgyuRHVkYgtdAIXLlwo6ok+oWJTlJRATgZzZWrlZDDsDbFREZSurtg01Rk7dGoGkPN4/fXvNCydgOFlc+QHnsLLLw/Lgw9ukTxgrx6HkCFkCuoFkWX0T/ywDmfvkQjEOu6bxYzh3t5ePXCKNRO/SBBv3LgxU5FpVnBSPvfcPzd8jZ2EhTeyc+e7sc2VCQsEZufOv5cbbzxSGdnyJxfiu+ZNZOzcov0cRlH9AY6MiBQy+cQ+wQQzhtMu+6mfV/e5PMyhgdvfjKwVXvi5jlpzZTATOIt6vAjDMMfGX5mNBPRbb5Ulr+DYrSU2/mNzc3OZHsMImfQ7Rp6+Emvo5KPhSkkz1BNCVsD0+2baRH7LlsHAc0zgyUBc7MWTECqMCtXb+9oH4oD3gCCHrXIHrwWzle2ZwiDvo3y+qAANUSrik4e5YFFGmWwSERqgieH92mDcu7uNgNjUCpuWR6r+pGa1O4RoGC73X4eEchixwXwce9gc+Rgs8GyGEhC+2GC5jO/lZDwXrKzRyVaJicR8MpSS0KuykLYBYgLvwS7ybc4ExrU5FG5WucPrMHoVR8gFccGs5GapM4PwCMICoYHIIL+YoSeDXOs2iZHEPBqgCj1cKBROCmk76nk3PvBeIALwXuwRuTCeDUQKCWDwox+tvbAyb5h5GogOBAejpXr+SNrod3jcddHkWiQqNECz5oe04XYLaTuizASOEkY1G/ZcMIyS+mFU2mITZ17GJHGhwdwaHYI+LRkuTyDZAsHBxDwki122q8UkuxdeuFdamXoTTs2cTYpiM6Z5mVhDJp/Ex80wtybL5Qkke+CdYDYx1hZhOBwCEmQRpMtWLc2Kn5OxE78InyAwSAyj5lIKlPWzEjtPE/dofHQUajTt5Qkk32BF9scf/64y58Uelr7jjm9URImzeJMHyV8VtrvX2gQuCqkJTRbLE0j+wQgTJtiZZSAoMumiHtXdmvxNtCxvalMOGUKRWhw9+hlFJlv2Ji0yINW5zd6OdpmW/iT5Atuc+OUiMNxNkUkPjDBhyZCkQGqhkw9DKGKDUanlJQjc+zotkhrGrkfqQgMuXbq0o6ur65gQQlInbZEBmSwLRQiFGhdCCEmVLEQGZOLRAE7kIyRdshIZkFmhC45CEZIeWYoMyLQqFOoMM4QiJFmyFhmQWejkwxCKkORIYiV2GDIXGnDlypUhHe4+ySHv5mB2tkP+4z86Zd06kc2bU1mHQxzBsgIVmYfD7CqZBLkQGjA9PY0q6weF5J7PPuuSubnlQ+eGGxZUbBaF5AoskNyW5NolV3Kz+30WRc1JOBYXr/8/LdChyRvjeRMZkBuhATMzMw8Ly3/mnm99a0HDpiXp61uSYnFJSD7AwIr+Yd+dN5EBuQmdfFj+kxA3vBq/qa1bCkPuhAYwX0NIYMpI+qaxAjsKuRQaoGKDtVA7hBBSj+MaJsWywVvS5CpHY3Lt2jXMGi4LIaQKhEp6tVdDpYebQWRAbj0awPk1hKwCo0oP5zHh24jcejQAcaeq914hhPiFqnI5qrQWufZofLg3FGlzxr2lBLlO+DaiKYQGXL169aQq+rAQ0iZ4uZjDWS+IjIOmERouviRtxhj2WWrGMKkWTSM0QL2akqo8JvOVhJAWBF4M8pJ5WHEdJ00lNIAjUaRVwRIChEnNMmTtQq5HnWrBkSjSgox5m7jtaUWRAU3n0fhwmQJpAcYXFhb25qVmTJI0rdCAqakpuJn7hJAmolXzMI1oaqEBFBvSLPjD1V7tpZYMkerR9EIDOKGP5Jl2FhiflhAaoGIzqmKzSwjJCRSY67SM0ACKDckDFJjVtJTQAIoNyZCyNxdmlAJTTcsJDWCCmKTMmA5TH2iHYeqwtKTQAIoNSYHjKjCHKTBr07JCAyg2JG6YfwlHSwsN0JzNiOZsXhFCosHwKAItLzQACzFVbFDsvCSEBMT3XvT6eDMXncoDbSE0gCUmiAP0XmKmbYQGoHhWd3f3fs4iJjXACuo3OTSdDG0lND5MEhPgh0YqMGP0XpKlSmi++OKLIW30kv7jl2+++eaWjkkZSrUn3vaxRzQ0Ok5xSY+K0EBgtPHtZGl5dnZ229atW8uSEth3W0WuqJ87vmnTprI4Anv9HaW5ubmxIPYMpdoDikv2dJw/f76kXsxp7Yixa9eu7YWwGMIjetLfrY8lHrNOT0+jiNUe725Zv8vdKhaBP9caxp7U37Qt6EiBZ4tQqiSkVSjr5U2KSz7o1BPyoCp++cYbb3zY914QNkFg9Gaxq6trj6SD+Tkl9TSc9t1WYTS9EtQTHgloivKgo9oGp4Q0O2PYZE2Pha0bNmzAZQ9FJh906WVYLwfsJ+DFfP7550e00+6XFNADBFt9Dhn3y+KA2uL1Q8ZDrjmmspCmAiGReqJYBnBKR4uOc7Qov0Bo8O+feQfpQfO4XiH0KekB4zyHQW1QsLyoHhrCvjHXMonqwR3q6enBZ2Pld2Wo08vdlITkBu8P6RRDouai46uvvsLIi2jotM1+8ssvv5zQq7GbbrrpcWlDMDKlgjOiN3dze5dsoNfSGnRoeISRnpN62X/DDTdUQqiJiYmi/rsjObvDSwaXpY3xBGe/3nyIgpMs3ggR9pp+U++Ocep/a+APb2M/GQjLpHepnEza6dtafT6NCxAc/WfdwZAqPkxhQVjEcKg1WZmwh2FuPYmGtbORpyjPzc0dT2NYu1nBkHihUNil7TUsJDCesCAHdorC0j605RKEOPFmGGNo/iGhl7MKP3mrwjKuwjzWKpvWEzcoNDGCmcl6MmH+T7uKThneinrGH0JgkF9h8pYACk1CePkcJNofQnjVSklkP6+iNz+Ep6LX4zoiVKaokHpQaFICxbf0CgW4MM/nLm++T97FpyzLEx/P6vctw0vp6uoqM/whrlBoMgTioydvETOiVYBKngBBfEopiFDZ80wqnoh+7lnMxsaFYkLihkKTY7zwqwgxwgUr2/E4Vqg3sjOXb6iAQEwqF80fTa5bt26SIQ4hhBCSJAglMHIjIUF9GdjrdUlCkLU9iNoGWdvnoQ8wxynsb/Dtp6amnKoHmOCz47AP2wawx2+I2oZZ9UGiaJiwb3p6esm7TODLutijYyz7kos9Xq/vccGzv+DaSLDH5xrfwbm8htqc9u3RHuIIavoY9icdzWPpA6MNo/bBUtZ9oN/FeZsesw/CtGHM50GoNjT7wLUN7T7wj+NOyQmaS4hUj8aqkgd7pwbC640ELPIhrvb4viXjIaeqfd4BYZbJ2O9ykHmv3WPYD3sjXYFRmxHjbqg+MNowah9IDH3gJNZ2H+h3GdE22RLU3u4DWW6Dkjig54HZ5qXe3t4RccCuFqmJfad96O0+UJzsNQ+I9iv5973JrPkRGhskMSUCUROe2mEXJBpOn5/HBK1rH3jFvkNjt4H2wUZxAEPw1kNlcQCjbfZjk5OTF8WBqG2gv7nK3rUPMHpo3tfBBKfvL1abuR6XNV6fr+MaMZ3vcuntUXEE/96Gy3YSIzYu9ni9YT/hao9/M3U5Rz2X+4KrNwGwO4NvH9Lt32O4/fvFEfyjG21wzNHcbsOTYdowSh8AbfdDvn3YPkD7e304Io5cunQJoctE2D40j2P8FnEEbaaf7Yd/JzFa6WJvHsdh+hD4fRD2PEgF14axCdMwcdpH/f7+ULaEJKq9/x4Sgaz7gBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQkjLg3UWUaafR7UHcdi7Lu2P0x62Ue2bvQ+wviZqTaAoa3TiqukjITFq+oQ6DuKqqxTFPjH04Npl1MFwXtCnP2rIqoXiupisalGl64HmnWAn/Xo2YQofof5JlFoqVi2Tg47mdj2Z02HaMGo9mqh9ELUejdkHYWoCWX3gfBzXqKvk2gdDMfbBUhjBM2v6hOmDRLEOkCWsgnWxN07yUKuXjVW/vv1xR/sR0x6/x8XeWzlt2l9wrUdj2S+5nqh2H7iuXrb7wHX1cQJ94FTqo0YfLKXdB8bK61Anqt0Het+peJfdB64F1LzV66v6IDf1aKKuGI77/VxroYi3X7lB1DoekdvDtQ1iWPUda+2REH1gk3pNILsNXNvU3v0iak0g13o0CdRFivv9omHWUkEdDHHEq7N6IWwtE7OWCt4nYi2VpTChE+rwhPXIgF/PZjpkTR+rD067niT4946zD8LkSWZmZo759iHD1/1R+sBswzD1ZPx6NmHPgzjqKkXtA6sezYjkDTRKlCScbx/lnxmClaU9vn+UZGhcbSghwW/Pug+8/dAzq+kD2zwMSkgEsm5DQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIISQFok6/j6OmT5b2oNnrMiWGVUfDuZaKV0fDX2J/LEwtFWOJvXMdD2DUMgm1wTxqmXhtgMVwu8QRtdvtt2GYWipx9IHRhmH6oBi1D0z7MG1o1pMJ04ZmH0xHrwkU6jg2F1WGqUdjtmGY49g8D8L0QaLYtVBcC+7YdThc63jUqMPhWsdjJEodD3TodMb1aOxaKK41gazCXanXBKpRC8WpJlCNPmi6ejQQp+kINYHM1ethjuOmq0fjuvJzcXHRruNREgfsOiBKSdyI9P3Xer+1WLdu3arXh/gOJfNOZ2dnpFoqadcEcv2+aZB2PZqoxNBnNe1zIzTawAeMu+Xu7u5xcUDtj/i3UfynUCg4KbnaHDKLBmkHH3Ywl7m5uVG9Khvv96Y40N/fP6424+bnb9q0KfBBtn79+rLaHDEeGh8YGBgTB+w+0DYcEwfm5+cj9YEyGrEP4AGVje9wxMUefaBXxw37Ay59gNfCxnhozLUPFPM3O/eBttkBvw3D9IH3+rJvH0MfONmnAsIlhCBhVdWrpZKpPVzHKIWlo9rDFu8R9jfkoQ/iaIMoyUyvDZxCHpOoxc2j1lWCfZSaPrCLoy5T1IQyIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEJIVhh1ME6HrKXi20+EqQMCYAd7lDsIU7QHtUi8Ghwnw9RS8e3RBmHWyqCejN+GYTa4z0MfePVg/D4oiSP4XL+mT5g2NOrJTIRpQ9RfgT0uYdvQqKuUek0goN/dLzVxOmRNoH1R+iBRpiPWo7FroYSo47EnSh0Puw6Hax0P7wBbVcfDBbsNXQ8yuxZK1D4IUY9mJM4+wIniYl+rD1zb0O6DJqwJNJJETaDclIkQqxZKR0dHSRzQ1w+b913r0SwtLVUdEIVC4S5xoLOzs2S9X0kc6Orqsl/vVM7RWylbst7T9d+kZN7RNnCyr9EGrrVYhq3Pj9QH4lhTqLu72/6+zhUC7c+MWo+mxnHhZK9tskXcGLLez8m+Rj2aUuVxyQlW3QvnOhxSXcdDXOtw6OePmvcXFhacapno5x03a6m41kKZn58fF6OOh3LctR6NHhRjxkNl11oo5nfGb9H3c/o3q1GDZ1QciNoHNWoCOdVCiVoTCK+1agKVo9ajce0DuyaQXh0QN+KuCVT5/A7JEXDb9KqIkxYnjjgCtw3/wto4YQoOVeqIaMfuCGsPr0JtR/TmeF9fn9MB4tvryVVxldV+VL9L4IMc4B9V/5VhXwxjD7LuA78No9jrwY5+nAxjD7zfIGH60LfHPzvsw/QBQlZ49GHtveNoGH/WYfrQt1eRKMfVB/8F6Hs5AEoN5qAAAAAASUVORK5CYII=", lo = { class: "fr-container flex" }, so = { class: "half" }, oo = { class: "fr-h1" }, io = { class: "flex fr-my-md-3w" }, uo = { class: "fr-h6" }, co = /* @__PURE__ */ F({
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
      return i(), f("div", lo, [
        c("div", so, [
          c("h1", oo, h(t.title), 1),
          c("span", io, h(t.subtitle), 1),
          c("p", uo, h(t.description), 1),
          c("p", null, h(t.help), 1),
          (n = t.buttons) != null && n.length ? (i(), j(Tt, {
            key: 0,
            buttons: t.buttons,
            "inline-layout-when": "always"
          }, null, 8, ["buttons"])) : g("", !0),
          S(t.$slots, "default", {}, void 0, !0)
        ]),
        e[0] || (e[0] = c("div", { class: "half self-center text-center" }, [
          c("img", {
            class: "error-img",
            src: ro
          })
        ], -1))
      ]);
    };
  }
}), fo = /* @__PURE__ */ we(co, [["__scopeId", "data-v-0f6cf5b4"]]), po = { class: "fr-fieldset" }, mo = ["id"], ho = {
  key: 1,
  class: "fr-fieldset__element"
}, vo = { class: "fr-fieldset__element" }, cn = /* @__PURE__ */ F({
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
      return i(), f("fieldset", po, [
        t.legend || (r = (n = t.$slots).legend) != null && r.call(n) ? (i(), f("legend", {
          key: 0,
          id: t.legendId,
          class: R(["fr-fieldset__legend", t.legendClass])
        }, [
          V(h(t.legend) + " ", 1),
          S(t.$slots, "legend")
        ], 10, mo)) : g("", !0),
        t.hint || (s = (l = t.$slots).hint) != null && s.call(l) ? (i(), f("div", ho, [
          c("span", {
            class: R(["fr-hint-text", t.hintClass])
          }, [
            V(h(t.hint) + " ", 1),
            S(t.$slots, "hint")
          ], 2)
        ])) : g("", !0),
        c("div", vo, [
          S(t.$slots, "default")
        ])
      ]);
    };
  }
}), go = ["href", "download"], bo = { class: "fr-link__detail" }, fn = /* @__PURE__ */ F({
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
      c("span", bo, h(t.format) + " – " + h(t.size), 1)
    ], 8, go));
  }
}), yo = { class: "fr-downloads-group fr-downloads-group--bordered" }, ko = {
  key: 0,
  class: "fr-downloads-group__title"
}, wo = /* @__PURE__ */ F({
  __name: "DsfrFileDownloadList",
  props: {
    files: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", yo, [
      t.title ? (i(), f("h4", ko, h(t.title), 1)) : g("", !0),
      c("ul", null, [
        (i(!0), f(z, null, J(t.files, (n, r) => (i(), f("li", { key: r }, [
          ee(fn, {
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
}), _o = ["for"], xo = {
  key: 0,
  class: "required"
}, Do = {
  key: 1,
  class: "fr-hint-text"
}, To = ["id", "aria-describedby", "value", "disabled", "aria-disabled", "accept"], Io = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, Co = ["id"], Eo = /* @__PURE__ */ F({
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
    }, l = _(() => Array.isArray(e.accept) ? e.accept.join(",") : e.accept);
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
        "required" in s.$attrs && s.$attrs.required !== !1 ? (i(), f("span", xo, " *")) : g("", !0),
        s.hint ? (i(), f("span", Do, h(s.hint), 1)) : g("", !0)
      ], 8, _o),
      c("input", Q({
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
      }), null, 16, To),
      s.error || s.validMessage ? (i(), f("div", Io, [
        s.error ? (i(), f("p", {
          key: 0,
          id: `${s.id}-desc`,
          class: "fr-error-text fr-mt-3v"
        }, h(s.error ?? s.validMessage), 9, Co)) : g("", !0)
      ])) : g("", !0)
    ], 2));
  }
}), Po = { class: "fr-follow__newsletter" }, Mo = { class: "fr-h5 fr-follow__title" }, Lo = { class: "fr-text--sm fr-follow__desc" }, Bo = { key: 0 }, So = ["title"], $o = { key: 1 }, Ao = { action: "" }, Oo = {
  class: "fr-label",
  for: "newsletter-email"
}, Ro = { class: "fr-input-wrap fr-input-wrap--addon" }, Fo = ["title", "placeholder", "value"], Vo = ["title"], No = {
  key: 0,
  class: "fr-messages-group",
  role: "alert"
}, qo = {
  id: "newsletter-email-desc-error",
  class: "fr-error-text"
}, jo = {
  id: "fr-newsletter-hint-text",
  class: "fr-hint-text"
}, pn = /* @__PURE__ */ F({
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
    return (r, l) => (i(), f("div", Po, [
      c("div", null, [
        c("h3", Mo, h(r.title), 1),
        c("p", Lo, h(r.description), 1)
      ]),
      r.onlyCallout ? (i(), f("div", Bo, [
        c("button", {
          class: "fr-btn",
          title: r.buttonTitle,
          onClick: l[0] || (l[0] = (s) => r.buttonAction ? r.buttonAction(s) : () => {
          })
        }, h(r.buttonText), 9, So)
      ])) : (i(), f("div", $o, [
        c("form", Ao, [
          c("label", Oo, h(r.labelEmail), 1),
          c("div", Ro, [
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
            }, null, 40, Fo),
            c("button", {
              id: "newsletter-button",
              class: "fr-btn",
              title: r.buttonTitle,
              type: "submit"
            }, h(r.buttonText), 9, Vo)
          ]),
          r.error ? (i(), f("div", No, [
            c("p", qo, h(r.error), 1)
          ])) : g("", !0),
          c("p", jo, h(r.hintText), 1)
        ])
      ]))
    ]));
  }
}), Ho = { class: "fr-follow__social" }, Wo = {
  key: 0,
  class: "fr-btns-group fr-btns-group--lg"
}, Ko = ["title", "href"], mn = /* @__PURE__ */ F({
  __name: "DsfrSocialNetworks",
  props: {
    networks: {},
    titleTag: { default: "h3" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ho, [
      (i(), j(ve(t.titleTag), { class: "fr-h5 fr-mb-3v fr-mb-3v" }, {
        default: U(() => e[0] || (e[0] = [
          V(" Suivez-nous "),
          c("br", null, null, -1),
          V(" sur les réseaux sociaux ")
        ])),
        _: 1
      })),
      t.networks.length ? (i(), f("ul", Wo, [
        (i(!0), f(z, null, J(t.networks, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: R(["fr-btn", `fr-btn--${n.type}`]),
            title: n.name,
            href: n.href,
            target: "_blank",
            rel: "noopener noreferrer"
          }, h(n.name), 11, Ko)
        ]))), 128))
      ])) : g("", !0)
    ]));
  }
}), Qo = { class: "fr-follow" }, Yo = { class: "fr-container" }, zo = { class: "fr-grid-row" }, Go = /* @__PURE__ */ F({
  __name: "DsfrFollow",
  props: {
    newsletterData: { default: () => {
    } },
    networks: { default: () => [] }
  },
  setup(a) {
    const t = a, e = _(() => t.networks && t.networks.length), n = _(() => typeof t.newsletterData == "object");
    return (r, l) => (i(), f("div", Qo, [
      c("div", Yo, [
        c("div", zo, [
          S(r.$slots, "default", {}, () => [
            r.newsletterData ? (i(), f("div", {
              key: 0,
              class: R(["fr-col-12", { "fr-col-md-8": e.value }])
            }, [
              ee(pn, Ie(kt(r.newsletterData)), null, 16)
            ], 2)) : g("", !0),
            e.value ? (i(), f("div", {
              key: 1,
              class: R(["fr-col-12", { "fr-col-md-4": n.value }])
            }, [
              ee(mn, { networks: r.networks }, null, 8, ["networks"])
            ], 2)) : g("", !0)
          ])
        ])
      ])
    ]));
  }
}), Pa = 1, hn = /* @__PURE__ */ F({
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
    }), o = _(() => s.value ? { to: s.value } : { href: l.value }), u = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), d = _(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Pa, ...t.iconAttrs ?? {} } : { scale: Pa, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (p, v) => (i(), j(ve(r.value), Q({
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
        var m, C;
        return [
          !u.value && (p.icon || (m = p.iconAttrs) != null && m.name) && !p.iconRight ? (i(), j(be, Q({
            key: 0,
            class: "fr-mr-1w"
          }, d.value), null, 16)) : g("", !0),
          V(" " + h(p.label) + " ", 1),
          !u.value && (p.icon || (C = p.iconAttrs) != null && C.name) && p.iconRight ? (i(), j(be, Q({
            key: 1,
            class: "fr-ml-1w"
          }, d.value), null, 16)) : g("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target", "onClick"]));
  }
}), Xo = { class: "fr-footer__partners" }, Uo = {
  key: 0,
  class: "fr-footer__partners-title"
}, Zo = { class: "fr-footer__partners-logos" }, Jo = {
  key: 0,
  class: "fr-footer__partners-main"
}, ei = ["href"], ti = ["src", "alt"], ai = { class: "fr-footer__partners-sub" }, ni = ["href"], ri = ["src", "alt"], vn = /* @__PURE__ */ F({
  __name: "DsfrFooterPartners",
  props: {
    mainPartner: { default: void 0 },
    subPartners: { default: () => [] },
    title: { default: "" }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Xo, [
      t.title ? (i(), f("h4", Uo, h(t.title), 1)) : g("", !0),
      c("div", Zo, [
        t.mainPartner ? (i(), f("div", Jo, [
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
            }, null, 8, ti)
          ], 8, ei)
        ])) : g("", !0),
        c("div", ai, [
          c("ul", null, [
            (i(!0), f(z, null, J(t.subPartners, (n, r) => (i(), f("li", { key: r }, [
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
                }, null, 8, ri)
              ], 8, ni)
            ]))), 128))
          ])
        ])
      ])
    ]));
  }
}), li = ["innerHTML"], nt = /* @__PURE__ */ F({
  __name: "DsfrLogo",
  props: {
    small: { type: Boolean },
    large: { type: Boolean },
    logoText: { default: () => "Gouvernement" }
  },
  setup(a) {
    const t = a, e = _(() => Array.isArray(t.logoText) ? t.logoText.join("<br>") : t.logoText);
    return (n, r) => (i(), f("p", {
      class: R(["fr-logo", {
        "fr-logo--sm": n.small && !n.large,
        "fr-logo--lg": n.large && !n.small
      }]),
      innerHTML: e.value
    }, null, 10, li));
  }
}), si = {
  id: "footer",
  class: "fr-footer",
  role: "contentinfo"
}, oi = {
  key: 0,
  class: "fr-footer__top"
}, ii = { class: "fr-container" }, ui = { class: "fr-grid-row fr-grid-row--start fr-grid-row--gutters" }, di = { class: "fr-container" }, ci = { class: "fr-footer__body" }, fi = {
  key: 0,
  class: "fr-footer__brand fr-enlarge-link"
}, pi = ["href"], mi = ["src", "alt"], hi = ["src", "alt"], vi = {
  key: 1,
  class: "fr-footer__brand fr-enlarge-link"
}, gi = { class: "fr-footer__content" }, bi = { class: "fr-footer__content-desc" }, yi = { class: "fr-footer__content-list" }, ki = ["href", "title"], wi = { class: "fr-footer__bottom" }, _i = { class: "fr-footer__bottom-list" }, xi = {
  key: 0,
  class: "fr-footer__bottom-copy"
}, Di = /* @__PURE__ */ F({
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
      const { to: p, href: v, ...m } = t.licenceLinkProps ?? {};
      return m;
    }), o = _(() => l.value ? "" : t.licenceTo), u = _(() => l.value ? t.licenceTo : ""), d = _(() => typeof t.operatorTo == "string" && t.operatorTo.startsWith("http"));
    return (p, v) => {
      const m = xe("RouterLink");
      return i(), f("footer", si, [
        r.value ? (i(), f("div", oi, [
          c("div", ii, [
            c("div", ui, [
              S(p.$slots, "footer-link-lists", {}, void 0, !0)
            ])
          ])
        ])) : g("", !0),
        c("div", di, [
          c("div", ci, [
            p.operatorImgSrc ? (i(), f("div", fi, [
              ee(nt, { "logo-text": p.logoText }, null, 8, ["logo-text"]),
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
                }, null, 12, mi)
              ], 8, pi)) : (i(), j(m, {
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
                  }, null, 12, hi)
                ]),
                _: 1
              }, 8, ["to", "title"]))
            ])) : (i(), f("div", vi, [
              ee(m, {
                to: p.homeLink,
                title: p.homeTitle
              }, {
                default: U(() => [
                  ee(nt, { "logo-text": p.logoText }, null, 8, ["logo-text"])
                ]),
                _: 1
              }, 8, ["to", "title"])
            ])),
            c("div", gi, [
              c("p", bi, [
                S(p.$slots, "description", {}, () => [
                  V(h(p.descText), 1)
                ], !0)
              ]),
              c("ul", yi, [
                (i(!0), f(z, null, J(p.ecosystemLinks, ({ href: C, label: D, title: M, ...y }, x) => (i(), f("li", {
                  key: x,
                  class: "fr-footer__content-item"
                }, [
                  c("a", Q({
                    class: "fr-footer__content-link",
                    href: C,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: M,
                    ref_for: !0
                  }, y), h(D), 17, ki)
                ]))), 128))
              ])
            ])
          ]),
          p.partners ? (i(), j(vn, Ie(Q({ key: 0 }, p.partners)), null, 16)) : g("", !0),
          c("div", wi, [
            c("ul", _i, [
              (i(!0), f(z, null, J(e.value, (C, D) => (i(), f("li", {
                key: D,
                class: "fr-footer__bottom-item"
              }, [
                ee(hn, Q({ ref_for: !0 }, C), null, 16)
              ]))), 128))
            ]),
            p.licenceText ? (i(), f("div", xi, [
              c("p", null, [
                V(h(p.licenceText) + " ", 1),
                (i(), j(ve(l.value ? "a" : "RouterLink"), Q({
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
            ])) : g("", !0)
          ])
        ])
      ]);
    };
  }
}), Ti = /* @__PURE__ */ we(Di, [["__scopeId", "data-v-4030eed5"]]), Ii = { class: "fr-footer__top-cat" }, Ci = { class: "fr-footer__top-list" }, Ei = ["href"], Pi = /* @__PURE__ */ F({
  __name: "DsfrFooterLinkList",
  props: {
    categoryName: { default: "Nom de la catégorie" },
    links: { default: () => [] }
  },
  setup(a) {
    return (t, e) => {
      const n = xe("RouterLink");
      return i(), f("div", null, [
        c("h3", Ii, h(t.categoryName), 1),
        c("ul", Ci, [
          (i(!0), f(z, null, J(t.links, (r, l) => (i(), f("li", { key: l }, [
            typeof r.to == "string" && r.to.startsWith("http") ? (i(), f("a", {
              key: 0,
              class: "fr-footer__top-link",
              target: "_blank",
              rel: "noopener noreferrer",
              href: r.to
            }, h(r.label), 9, Ei)) : g("", !0),
            typeof r.to == "object" || typeof r.to == "string" && !r.to.startsWith("http") ? (i(), j(n, {
              key: 1,
              class: "fr-footer__top-link",
              to: r.to
            }, {
              default: U(() => [
                V(h(r.label), 1)
              ]),
              _: 2
            }, 1032, ["to"])) : g("", !0)
          ]))), 128))
        ])
      ]);
    };
  }
}), Mi = { class: "fr-connect-group" }, Li = ["href", "title"], Bi = /* @__PURE__ */ F({
  __name: "DsfrFranceConnect",
  props: {
    secure: { type: Boolean },
    url: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Mi, [
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
        }, h(`Qu’est-ce que FranceConnect${t.secure ? "+" : ""} ?`), 9, Li)
      ])
    ]));
  }
}), Si = {
  role: "navigation",
  class: "fr-translate fr-nav"
}, $i = { class: "fr-nav__item" }, Ai = ["aria-controls", "aria-expanded"], Oi = { class: "fr-hidden-lg" }, Ri = ["id"], Fi = { class: "fr-menu__list" }, Vi = ["hreflang", "lang", "aria-current", "href", "onClick"], rt = /* @__PURE__ */ F({
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
    } = Se(), d = K(!1);
    function p(m) {
      d.value = !1, n("select", m);
    }
    const v = _(
      () => e.languages.find(({ codeIso: m }) => m === e.currentLanguage)
    );
    return ce(d, (m, C) => {
      m !== C && o(m);
    }), (m, C) => {
      var D, M;
      return i(), f("nav", Si, [
        c("div", $i, [
          c("button", {
            class: "fr-translate__btn fr-btn fr-btn--tertiary",
            "aria-controls": m.id,
            "aria-expanded": d.value,
            title: "Sélectionner une langue",
            type: "button",
            onClick: C[0] || (C[0] = te((y) => d.value = !d.value, ["prevent", "stop"]))
          }, [
            V(h((D = v.value) == null ? void 0 : D.codeIso.toUpperCase()), 1),
            c("span", Oi, " - " + h((M = v.value) == null ? void 0 : M.label), 1)
          ], 8, Ai),
          c("div", {
            id: m.id,
            ref_key: "collapse",
            ref: r,
            class: R(["fr-collapse fr-translate__menu fr-menu", { "fr-collapse--expanded": q(s), "fr-collapsing": q(l) }]),
            onTransitionend: C[1] || (C[1] = (y) => q(u)(d.value))
          }, [
            c("ul", Fi, [
              (i(!0), f(z, null, J(m.languages, (y, x) => (i(), f("li", { key: x }, [
                c("a", {
                  class: "fr-translate__language fr-nav__link",
                  hreflang: y.codeIso,
                  lang: y.codeIso,
                  "aria-current": m.currentLanguage === y.codeIso ? !0 : void 0,
                  href: `#${y.codeIso}`,
                  onClick: te((I) => p(y), ["prevent", "stop"])
                }, h(`${y.codeIso.toUpperCase()} - ${y.label}`), 9, Vi)
              ]))), 128))
            ])
          ], 42, Ri)
        ])
      ]);
    };
  }
}), Ni = ["for"], qi = {
  key: 0,
  class: "required"
}, ji = {
  key: 0,
  class: "fr-hint-text"
}, Hi = /* @__PURE__ */ F({
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
    const e = a, n = or(), r = K(null), l = () => {
      var d;
      return (d = r.value) == null ? void 0 : d.focus();
    }, s = _(() => e.isTextarea ? "textarea" : "input"), o = _(() => e.isWithWrapper || n.type === "date" || !!e.wrapperClass), u = _(() => [
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
        S(d.$slots, "label", {}, () => [
          V(h(d.label) + " ", 1),
          S(d.$slots, "required-tip", {}, () => [
            "required" in d.$attrs && d.$attrs.required !== !1 ? (i(), f("span", qi, "*")) : g("", !0)
          ], !0)
        ], !0),
        d.hint ? (i(), f("span", ji, h(d.hint), 1)) : g("", !0)
      ], 10, Ni),
      o.value ? (i(), f("div", {
        key: 1,
        class: R([
          { "fr-input-wrap": d.isWithWrapper || d.$attrs.type === "date" },
          d.wrapperClass
        ])
      }, [
        (i(), j(ve(s.value), Q({ id: d.id }, d.$attrs, {
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
      ], 2)) : (i(), j(ve(s.value), Q({
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
}), Ct = /* @__PURE__ */ we(Hi, [["__scopeId", "data-v-7ca45de8"]]), lt = /* @__PURE__ */ F({
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
      ee(Ct, {
        id: n.id,
        type: "search",
        placeholder: n.placeholder,
        "model-value": n.modelValue,
        label: n.label,
        disabled: n.disabled,
        "aria-disabled": n.disabled,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => e("update:modelValue", l)),
        onKeydown: r[1] || (r[1] = ae((l) => e("search", n.modelValue), ["enter"]))
      }, null, 8, ["id", "placeholder", "model-value", "label", "disabled", "aria-disabled"]),
      ee(je, {
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
}), Ma = 1, sa = /* @__PURE__ */ F({
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
      var v;
      return ((v = t.href) == null ? void 0 : v.startsWith("http")) || e.value && t.path.startsWith("http") || typeof t.to == "string" && t.to.startsWith("http");
    }), r = _(() => {
      var v;
      return ((v = t.href) == null ? void 0 : v.startsWith("mailto")) || e.value && t.path.startsWith("mailto") || typeof t.to == "string" && t.to.startsWith("mailto");
    }), l = _(() => t.button ? "button" : n.value || r.value ? "a" : "RouterLink"), s = _(() => {
      if (!(!n.value && !r.value))
        return t.to ?? t.href ?? t.path;
    }), o = _(() => {
      if (!(n.value || r.value))
        return t.to ?? t.path;
    }), u = _(() => o.value ? { to: o.value } : { href: s.value }), d = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), p = _(
      () => typeof t.icon == "string" ? { name: t.icon, scale: Ma, ...t.iconAttrs ?? {} } : { scale: Ma, ...t.icon ?? {}, ...t.iconAttrs ?? {} }
    );
    return (v, m) => (i(), j(ve(l.value), Q({
      class: ["fr-btn", {
        "fr-btn--icon-right": d.value && v.iconRight,
        "fr-btn--icon-left": d.value && !v.iconRight,
        [String(v.icon)]: d.value
      }]
    }, u.value, {
      target: v.target,
      onClick: m[0] || (m[0] = te((C) => v.onClick(C), ["stop"]))
    }), {
      default: U(() => {
        var C, D;
        return [
          !d.value && (v.icon || (C = v.iconAttrs) != null && C.name) && !v.iconRight ? (i(), j(be, Q({
            key: 0,
            class: "fr-mr-1w"
          }, p.value), null, 16)) : g("", !0),
          V(" " + h(v.label) + " ", 1),
          !d.value && (v.icon || (D = v.iconAttrs) != null && D.name) && v.iconRight ? (i(), j(be, Q({
            key: 1,
            class: "fr-ml-1w"
          }, p.value), null, 16)) : g("", !0)
        ];
      }),
      _: 1
    }, 16, ["class", "target"]));
  }
}), Wi = ["aria-label"], Ki = { class: "fr-btns-group" }, qt = /* @__PURE__ */ F({
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
      c("ul", Ki, [
        (i(!0), f(z, null, J(n.links, (l, s) => (i(), f("li", { key: s }, [
          ee(sa, Q({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var u;
              e("linkClick", o), (u = l.onClick) == null || u.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128))
      ])
    ], 8, Wi));
  }
}), Qi = {
  role: "banner",
  class: "fr-header"
}, Yi = { class: "fr-header__body" }, zi = { class: "fr-container width-inherit" }, Gi = { class: "fr-header__body-row" }, Xi = { class: "fr-header__brand fr-enlarge-link" }, Ui = { class: "fr-header__brand-top" }, Zi = { class: "fr-header__logo" }, Ji = {
  key: 0,
  class: "fr-header__operator"
}, eu = ["src", "alt"], tu = {
  key: 1,
  class: "fr-header__navbar"
}, au = ["aria-label", "title", "data-fr-opened"], nu = ["aria-label", "title"], ru = {
  key: 0,
  class: "fr-header__service"
}, lu = { class: "fr-header__service-title" }, su = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, ou = {
  key: 0,
  class: "fr-header__service-tagline"
}, iu = {
  key: 1,
  class: "fr-header__service"
}, uu = { class: "fr-header__tools" }, du = {
  key: 0,
  class: "fr-header__tools-links"
}, cu = {
  key: 1,
  class: "fr-header__search fr-modal"
}, fu = ["aria-label"], pu = { class: "fr-container" }, mu = { class: "fr-header__menu-links" }, hu = {
  key: 1,
  class: "flex justify-center items-center"
}, vu = { class: "fr-header__menu fr-modal" }, gu = {
  key: 0,
  class: "fr-container"
}, bu = /* @__PURE__ */ F({
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
    const e = a, n = t, r = Gt(), l = st(e, "languageSelector"), s = K(!1), o = K(!1), u = K(!1), d = () => {
      var x;
      u.value = !1, s.value = !1, o.value = !1, (x = document.getElementById("button-menu")) == null || x.focus();
    }, p = (x) => {
      x.key === "Escape" && d();
    };
    ye(() => {
      document.addEventListener("keydown", p);
    }), Ee(() => {
      document.removeEventListener("keydown", p);
    });
    const v = () => {
      u.value = !0, s.value = !0, o.value = !1, setTimeout(() => {
        var x;
        (x = document.getElementById("close-button")) == null || x.focus();
      });
    }, m = () => {
      u.value = !0, s.value = !1, o.value = !0;
    }, C = d, D = _(() => [e.homeLabel, e.serviceTitle].filter((x) => x).join(" - ")), M = _(() => !!r.operator || !!e.operatorImgSrc), y = _(() => !!r.mainnav);
    return Re(ra, () => d), (x, I) => {
      var L, T, E;
      const b = xe("RouterLink");
      return i(), f("header", Qi, [
        c("div", Yi, [
          c("div", zi, [
            c("div", Gi, [
              c("div", Xi, [
                c("div", Ui, [
                  c("div", Zi, [
                    ee(b, {
                      to: x.homeTo,
                      title: D.value
                    }, {
                      default: U(() => [
                        ee(nt, {
                          "logo-text": x.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  M.value ? (i(), f("div", Ji, [
                    S(x.$slots, "operator", {}, () => [
                      x.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: x.operatorImgSrc,
                        alt: x.operatorImgAlt,
                        style: Te(x.operatorImgStyle)
                      }, null, 12, eu)) : g("", !0)
                    ])
                  ])) : g("", !0),
                  x.showSearch || y.value || (L = x.quickLinks) != null && L.length ? (i(), f("div", tu, [
                    x.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": x.showSearchLabel,
                      title: x.showSearchLabel,
                      "data-fr-opened": o.value,
                      onClick: I[0] || (I[0] = te((w) => m(), ["prevent", "stop"]))
                    }, null, 8, au)) : g("", !0),
                    y.value || (T = x.quickLinks) != null && T.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": v,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "dialog",
                      "aria-label": x.menuLabel,
                      title: x.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: I[1] || (I[1] = te((w) => v(), ["prevent", "stop"]))
                    }, null, 8, nu)) : g("", !0)
                  ])) : g("", !0)
                ]),
                x.serviceTitle ? (i(), f("div", ru, [
                  ee(b, Q({
                    to: x.homeTo,
                    title: D.value
                  }, x.$attrs), {
                    default: U(() => [
                      c("p", lu, [
                        V(h(x.serviceTitle) + " ", 1),
                        x.showBeta ? (i(), f("span", su, " BETA ")) : g("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  x.serviceDescription ? (i(), f("p", ou, h(x.serviceDescription), 1)) : g("", !0)
                ])) : g("", !0),
                !x.serviceTitle && x.showBeta ? (i(), f("div", iu, I[9] || (I[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : g("", !0)
              ]),
              c("div", uu, [
                (E = x.quickLinks) != null && E.length || l.value ? (i(), f("div", du, [
                  S(x.$slots, "before-quick-links"),
                  s.value ? g("", !0) : (i(), j(qt, {
                    key: 0,
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel
                  }, null, 8, ["links", "nav-aria-label"])),
                  S(x.$slots, "after-quick-links"),
                  l.value ? (i(), j(rt, Q({ key: 1 }, l.value, {
                    onSelect: I[2] || (I[2] = (w) => n("languageSelect", w))
                  }), null, 16)) : g("", !0)
                ])) : g("", !0),
                x.showSearch ? (i(), f("div", cu, [
                  ee(lt, {
                    id: x.searchbarId,
                    label: x.searchLabel,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": I[3] || (I[3] = (w) => n("update:modelValue", w)),
                    onSearch: I[4] || (I[4] = (w) => n("search", w))
                  }, null, 8, ["id", "label", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ]),
            x.showSearch || y.value || x.quickLinks && x.quickLinks.length || l.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: R(["fr-header__menu fr-modal", { "fr-modal--opened": u.value }]),
              "aria-label": x.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", pu, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: I[5] || (I[5] = te((w) => d(), ["prevent", "stop"]))
                }, h(x.closeMenuModalLabel), 1),
                c("div", mu, [
                  l.value ? (i(), j(rt, Q({ key: 0 }, l.value, {
                    onSelect: I[6] || (I[6] = (w) => l.value.currentLanguage = w.codeIso)
                  }), null, 16)) : g("", !0),
                  S(x.$slots, "before-quick-links"),
                  s.value ? (i(), j(qt, {
                    key: 1,
                    role: "navigation",
                    links: x.quickLinks,
                    "nav-aria-label": x.quickLinksAriaLabel,
                    onLinkClick: q(C)
                  }, null, 8, ["links", "nav-aria-label", "onLinkClick"])) : g("", !0),
                  S(x.$slots, "after-quick-links")
                ]),
                u.value ? S(x.$slots, "mainnav", {
                  key: 0,
                  hidemodal: d
                }) : g("", !0),
                o.value ? (i(), f("div", hu, [
                  ee(lt, {
                    "searchbar-id": x.searchbarId,
                    "model-value": x.modelValue,
                    placeholder: x.placeholder,
                    "onUpdate:modelValue": I[7] || (I[7] = (w) => n("update:modelValue", w)),
                    onSearch: I[8] || (I[8] = (w) => n("search", w))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ], 10, fu)) : g("", !0),
            S(x.$slots, "default")
          ])
        ]),
        c("div", vu, [
          y.value && !u.value ? (i(), f("div", gu, [
            S(x.$slots, "mainnav", { hidemodal: d })
          ])) : g("", !0)
        ])
      ]);
    };
  }
}), yu = /* @__PURE__ */ F({
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
        S(t.$slots, "default")
      ], 2)
    ], 2));
  }
}), ku = {
  class: "fr-messages-group",
  role: "alert",
  "aria-live": "polite"
}, wu = ["id", "data-testid"], _u = ["id", "data-testid"], xu = ["id", "data-testid"], Du = ["id", "data-testid"], Tu = /* @__PURE__ */ F({
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
      S(t.$slots, "before-input"),
      S(t.$slots, "default"),
      t.$slots.default ? g("", !0) : (i(), j(Ct, Q({ key: 0 }, t.$attrs, {
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
      c("div", ku, [
        Array.isArray(t.errorMessage) ? (i(!0), f(z, { key: 0 }, J(t.errorMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(n), 9, wu))), 128)) : t.errorMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.errorMessage,
          "data-testid": t.descriptionId,
          class: "fr-error-text"
        }, h(t.errorMessage), 9, _u)) : g("", !0),
        Array.isArray(t.validMessage) ? (i(!0), f(z, { key: 2 }, J(t.validMessage, (n) => (i(), f("p", {
          id: t.descriptionId,
          key: n,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(n), 9, xu))), 128)) : t.validMessage ? (i(), f("p", {
          id: t.descriptionId,
          key: t.validMessage,
          "data-testid": t.descriptionId,
          class: "fr-valid-text"
        }, h(t.validMessage), 9, Du)) : g("", !0)
      ])
    ], 2));
  }
});
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var gn = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"], pt = /* @__PURE__ */ gn.join(","), bn = typeof Element > "u", He = bn ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, mt = !bn && Element.prototype.getRootNode ? function(a) {
  var t;
  return a == null || (t = a.getRootNode) === null || t === void 0 ? void 0 : t.call(a);
} : function(a) {
  return a == null ? void 0 : a.ownerDocument;
}, ht = function a(t, e) {
  var n;
  e === void 0 && (e = !0);
  var r = t == null || (n = t.getAttribute) === null || n === void 0 ? void 0 : n.call(t, "inert"), l = r === "" || r === "true", s = l || e && t && a(t.parentNode);
  return s;
}, Iu = function(a) {
  var t, e = a == null || (t = a.getAttribute) === null || t === void 0 ? void 0 : t.call(a, "contenteditable");
  return e === "" || e === "true";
}, yn = function(a, t, e) {
  if (ht(a))
    return [];
  var n = Array.prototype.slice.apply(a.querySelectorAll(pt));
  return t && He.call(a, pt) && n.unshift(a), n = n.filter(e), n;
}, kn = function a(t, e, n) {
  for (var r = [], l = Array.from(t); l.length; ) {
    var s = l.shift();
    if (!ht(s, !1))
      if (s.tagName === "SLOT") {
        var o = s.assignedElements(), u = o.length ? o : s.children, d = a(u, !0, n);
        n.flatten ? r.push.apply(r, d) : r.push({
          scopeParent: s,
          candidates: d
        });
      } else {
        var p = He.call(s, pt);
        p && n.filter(s) && (e || !t.includes(s)) && r.push(s);
        var v = s.shadowRoot || // check for an undisclosed shadow
        typeof n.getShadowRoot == "function" && n.getShadowRoot(s), m = !ht(v, !1) && (!n.shadowRootFilter || n.shadowRootFilter(s));
        if (v && m) {
          var C = a(v === !0 ? s.children : v.children, !0, n);
          n.flatten ? r.push.apply(r, C) : r.push({
            scopeParent: s,
            candidates: C
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
  return a.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(a.tagName) || Iu(a)) && !wn(a) ? 0 : a.tabIndex;
}, Cu = function(a, t) {
  var e = Ne(a);
  return e < 0 && t && !wn(a) ? 0 : e;
}, Eu = function(a, t) {
  return a.tabIndex === t.tabIndex ? a.documentOrder - t.documentOrder : a.tabIndex - t.tabIndex;
}, _n = function(a) {
  return a.tagName === "INPUT";
}, Pu = function(a) {
  return _n(a) && a.type === "hidden";
}, Mu = function(a) {
  var t = a.tagName === "DETAILS" && Array.prototype.slice.apply(a.children).some(function(e) {
    return e.tagName === "SUMMARY";
  });
  return t;
}, Lu = function(a, t) {
  for (var e = 0; e < a.length; e++)
    if (a[e].checked && a[e].form === t)
      return a[e];
}, Bu = function(a) {
  if (!a.name)
    return !0;
  var t = a.form || mt(a), e = function(l) {
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
}, Su = function(a) {
  return _n(a) && a.type === "radio";
}, $u = function(a) {
  return Su(a) && !Bu(a);
}, Au = function(a) {
  var t, e = a && mt(a), n = (t = e) === null || t === void 0 ? void 0 : t.host, r = !1;
  if (e && e !== a) {
    var l, s, o;
    for (r = !!((l = n) !== null && l !== void 0 && (s = l.ownerDocument) !== null && s !== void 0 && s.contains(n) || a != null && (o = a.ownerDocument) !== null && o !== void 0 && o.contains(a)); !r && n; ) {
      var u, d, p;
      e = mt(n), n = (u = e) === null || u === void 0 ? void 0 : u.host, r = !!((d = n) !== null && d !== void 0 && (p = d.ownerDocument) !== null && p !== void 0 && p.contains(n));
    }
  }
  return r;
}, La = function(a) {
  var t = a.getBoundingClientRect(), e = t.width, n = t.height;
  return e === 0 && n === 0;
}, Ou = function(a, t) {
  var e = t.displayCheck, n = t.getShadowRoot;
  if (getComputedStyle(a).visibility === "hidden")
    return !0;
  var r = He.call(a, "details>summary:first-of-type"), l = r ? a.parentElement : a;
  if (He.call(l, "details:not([open]) *"))
    return !0;
  if (!e || e === "full" || e === "legacy-full") {
    if (typeof n == "function") {
      for (var s = a; a; ) {
        var o = a.parentElement, u = mt(a);
        if (o && !o.shadowRoot && n(o) === !0)
          return La(a);
        a.assignedSlot ? a = a.assignedSlot : !o && u !== a.ownerDocument ? a = u.host : a = o;
      }
      a = s;
    }
    if (Au(a))
      return !a.getClientRects().length;
    if (e !== "legacy-full")
      return !0;
  } else if (e === "non-zero-area")
    return La(a);
  return !1;
}, Ru = function(a) {
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
}, vt = function(a, t) {
  return !(t.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  ht(t) || Pu(t) || Ou(t, a) || // For a details element with a summary, the summary element gets the focus
  Mu(t) || Ru(t));
}, jt = function(a, t) {
  return !($u(t) || Ne(t) < 0 || !vt(a, t));
}, Fu = function(a) {
  var t = parseInt(a.getAttribute("tabindex"), 10);
  return !!(isNaN(t) || t >= 0);
}, Vu = function a(t) {
  var e = [], n = [];
  return t.forEach(function(r, l) {
    var s = !!r.scopeParent, o = s ? r.scopeParent : r, u = Cu(o, s), d = s ? a(r.candidates) : o;
    u === 0 ? s ? e.push.apply(e, d) : e.push(o) : n.push({
      documentOrder: l,
      tabIndex: u,
      item: r,
      isScope: s,
      content: d
    });
  }), n.sort(Eu).reduce(function(r, l) {
    return l.isScope ? r.push.apply(r, l.content) : r.push(l.content), r;
  }, []).concat(e);
}, Nu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = kn([a], t.includeContainer, {
    filter: jt.bind(null, t),
    flatten: !1,
    getShadowRoot: t.getShadowRoot,
    shadowRootFilter: Fu
  }) : e = yn(a, t.includeContainer, jt.bind(null, t)), Vu(e);
}, qu = function(a, t) {
  t = t || {};
  var e;
  return t.getShadowRoot ? e = kn([a], t.includeContainer, {
    filter: vt.bind(null, t),
    flatten: !0,
    getShadowRoot: t.getShadowRoot
  }) : e = yn(a, t.includeContainer, vt.bind(null, t)), e;
}, We = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, pt) === !1 ? !1 : jt(t, a);
}, ju = /* @__PURE__ */ gn.concat("iframe").join(","), Lt = function(a, t) {
  if (t = t || {}, !a)
    throw new Error("No node provided");
  return He.call(a, ju) === !1 ? !1 : vt(t, a);
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
function Hu(a) {
  if (Array.isArray(a)) return Ht(a);
}
function Wu(a, t, e) {
  return (t = Gu(t)) in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}
function Ku(a) {
  if (typeof Symbol < "u" && a[Symbol.iterator] != null || a["@@iterator"] != null) return Array.from(a);
}
function Qu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ba(a, t) {
  var e = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(a);
    t && (n = n.filter(function(r) {
      return Object.getOwnPropertyDescriptor(a, r).enumerable;
    })), e.push.apply(e, n);
  }
  return e;
}
function Sa(a) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ba(Object(e), !0).forEach(function(n) {
      Wu(a, n, e[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(e)) : Ba(Object(e)).forEach(function(n) {
      Object.defineProperty(a, n, Object.getOwnPropertyDescriptor(e, n));
    });
  }
  return a;
}
function Yu(a) {
  return Hu(a) || Ku(a) || Xu(a) || Qu();
}
function zu(a, t) {
  if (typeof a != "object" || !a) return a;
  var e = a[Symbol.toPrimitive];
  if (e !== void 0) {
    var n = e.call(a, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(a);
}
function Gu(a) {
  var t = zu(a, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Xu(a, t) {
  if (a) {
    if (typeof a == "string") return Ht(a, t);
    var e = {}.toString.call(a).slice(8, -1);
    return e === "Object" && a.constructor && (e = a.constructor.name), e === "Map" || e === "Set" ? Array.from(a) : e === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? Ht(a, t) : void 0;
  }
}
var $a = {
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
}, Uu = function(a) {
  return a.tagName && a.tagName.toLowerCase() === "input" && typeof a.select == "function";
}, Zu = function(a) {
  return (a == null ? void 0 : a.key) === "Escape" || (a == null ? void 0 : a.key) === "Esc" || (a == null ? void 0 : a.keyCode) === 27;
}, et = function(a) {
  return (a == null ? void 0 : a.key) === "Tab" || (a == null ? void 0 : a.keyCode) === 9;
}, Ju = function(a) {
  return et(a) && !a.shiftKey;
}, ed = function(a) {
  return et(a) && a.shiftKey;
}, Aa = function(a) {
  return setTimeout(a, 0);
}, Ue = function(a) {
  for (var t = arguments.length, e = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    e[n - 1] = arguments[n];
  return typeof a == "function" ? a.apply(void 0, e) : a;
}, it = function(a) {
  return a.target.shadowRoot && typeof a.composedPath == "function" ? a.composedPath()[0] : a.target;
}, td = [], ad = function(a, t) {
  var e = (t == null ? void 0 : t.document) || document, n = (t == null ? void 0 : t.trapStack) || td, r = Sa({
    returnFocusOnDeactivate: !0,
    escapeDeactivates: !0,
    delayInitialFocus: !0,
    isKeyForward: Ju,
    isKeyBackward: ed
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
  }, s, o = function(k, B, H) {
    return k && k[B] !== void 0 ? k[B] : r[H || B];
  }, u = function(k, B) {
    var H = typeof (B == null ? void 0 : B.composedPath) == "function" ? B.composedPath() : void 0;
    return l.containerGroups.findIndex(function($) {
      var O = $.container, Z = $.tabbableNodes;
      return O.contains(k) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (H == null ? void 0 : H.includes(O)) || Z.find(function(Y) {
        return Y === k;
      });
    });
  }, d = function(k) {
    var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, H = B.hasFallback, $ = H === void 0 ? !1 : H, O = B.params, Z = O === void 0 ? [] : O, Y = r[k];
    if (typeof Y == "function" && (Y = Y.apply(void 0, Yu(Z))), Y === !0 && (Y = void 0), !Y) {
      if (Y === void 0 || Y === !1)
        return Y;
      throw new Error("`".concat(k, "` was specified but was not a node, or did not return a node"));
    }
    var re = Y;
    if (typeof Y == "string") {
      try {
        re = e.querySelector(Y);
      } catch (ne) {
        throw new Error("`".concat(k, '` appears to be an invalid selector; error="').concat(ne.message, '"'));
      }
      if (!re && !$)
        throw new Error("`".concat(k, "` as selector refers to no known node"));
    }
    return re;
  }, p = function() {
    var k = d("initialFocus", {
      hasFallback: !0
    });
    if (k === !1)
      return !1;
    if (k === void 0 || k && !Lt(k, r.tabbableOptions))
      if (u(e.activeElement) >= 0)
        k = e.activeElement;
      else {
        var B = l.tabbableGroups[0], H = B && B.firstTabbableNode;
        k = H || d("fallbackFocus");
      }
    else k === null && (k = d("fallbackFocus"));
    if (!k)
      throw new Error("Your focus-trap needs to have at least one focusable element");
    return k;
  }, v = function() {
    if (l.containerGroups = l.containers.map(function(k) {
      var B = Nu(k, r.tabbableOptions), H = qu(k, r.tabbableOptions), $ = B.length > 0 ? B[0] : void 0, O = B.length > 0 ? B[B.length - 1] : void 0, Z = H.find(function(ne) {
        return We(ne);
      }), Y = H.slice().reverse().find(function(ne) {
        return We(ne);
      }), re = !!B.find(function(ne) {
        return Ne(ne) > 0;
      });
      return {
        container: k,
        tabbableNodes: B,
        focusableNodes: H,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound: re,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode: $,
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
        lastDomTabbableNode: Y,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function(ne) {
          var De = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ce = B.indexOf(ne);
          return Ce < 0 ? De ? H.slice(H.indexOf(ne) + 1).find(function(W) {
            return We(W);
          }) : H.slice(0, H.indexOf(ne)).reverse().find(function(W) {
            return We(W);
          }) : B[Ce + (De ? 1 : -1)];
        }
      };
    }), l.tabbableGroups = l.containerGroups.filter(function(k) {
      return k.tabbableNodes.length > 0;
    }), l.tabbableGroups.length <= 0 && !d("fallbackFocus"))
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    if (l.containerGroups.find(function(k) {
      return k.posTabIndexesFound;
    }) && l.containerGroups.length > 1)
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
  }, m = function(k) {
    var B = k.activeElement;
    if (B)
      return B.shadowRoot && B.shadowRoot.activeElement !== null ? m(B.shadowRoot) : B;
  }, C = function(k) {
    if (k !== !1 && k !== m(document)) {
      if (!k || !k.focus) {
        C(p());
        return;
      }
      k.focus({
        preventScroll: !!r.preventScroll
      }), l.mostRecentlyFocusedNode = k, Uu(k) && k.select();
    }
  }, D = function(k) {
    var B = d("setReturnFocus", {
      params: [k]
    });
    return B || (B === !1 ? !1 : k);
  }, M = function(k) {
    var B = k.target, H = k.event, $ = k.isBackward, O = $ === void 0 ? !1 : $;
    B = B || it(H), v();
    var Z = null;
    if (l.tabbableGroups.length > 0) {
      var Y = u(B, H), re = Y >= 0 ? l.containerGroups[Y] : void 0;
      if (Y < 0)
        O ? Z = l.tabbableGroups[l.tabbableGroups.length - 1].lastTabbableNode : Z = l.tabbableGroups[0].firstTabbableNode;
      else if (O) {
        var ne = l.tabbableGroups.findIndex(function(ue) {
          var pe = ue.firstTabbableNode;
          return B === pe;
        });
        if (ne < 0 && (re.container === B || Lt(B, r.tabbableOptions) && !We(B, r.tabbableOptions) && !re.nextTabbableNode(B, !1)) && (ne = Y), ne >= 0) {
          var De = ne === 0 ? l.tabbableGroups.length - 1 : ne - 1, Ce = l.tabbableGroups[De];
          Z = Ne(B) >= 0 ? Ce.lastTabbableNode : Ce.lastDomTabbableNode;
        } else et(H) || (Z = re.nextTabbableNode(B, !1));
      } else {
        var W = l.tabbableGroups.findIndex(function(ue) {
          var pe = ue.lastTabbableNode;
          return B === pe;
        });
        if (W < 0 && (re.container === B || Lt(B, r.tabbableOptions) && !We(B, r.tabbableOptions) && !re.nextTabbableNode(B)) && (W = Y), W >= 0) {
          var X = W === l.tabbableGroups.length - 1 ? 0 : W + 1, le = l.tabbableGroups[X];
          Z = Ne(B) >= 0 ? le.firstTabbableNode : le.firstDomTabbableNode;
        } else et(H) || (Z = re.nextTabbableNode(B));
      }
    } else
      Z = d("fallbackFocus");
    return Z;
  }, y = function(k) {
    var B = it(k);
    if (!(u(B, k) >= 0)) {
      if (Ue(r.clickOutsideDeactivates, k)) {
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
      Ue(r.allowOutsideClick, k) || k.preventDefault();
    }
  }, x = function(k) {
    var B = it(k), H = u(B, k) >= 0;
    if (H || B instanceof Document)
      H && (l.mostRecentlyFocusedNode = B);
    else {
      k.stopImmediatePropagation();
      var $, O = !0;
      if (l.mostRecentlyFocusedNode)
        if (Ne(l.mostRecentlyFocusedNode) > 0) {
          var Z = u(l.mostRecentlyFocusedNode), Y = l.containerGroups[Z].tabbableNodes;
          if (Y.length > 0) {
            var re = Y.findIndex(function(ne) {
              return ne === l.mostRecentlyFocusedNode;
            });
            re >= 0 && (r.isKeyForward(l.recentNavEvent) ? re + 1 < Y.length && ($ = Y[re + 1], O = !1) : re - 1 >= 0 && ($ = Y[re - 1], O = !1));
          }
        } else
          l.containerGroups.some(function(ne) {
            return ne.tabbableNodes.some(function(De) {
              return Ne(De) > 0;
            });
          }) || (O = !1);
      else
        O = !1;
      O && ($ = M({
        // move FROM the MRU node, not event-related node (which will be the node that is
        //  outside the trap causing the focus escape we're trying to fix)
        target: l.mostRecentlyFocusedNode,
        isBackward: r.isKeyBackward(l.recentNavEvent)
      })), C($ || l.mostRecentlyFocusedNode || p());
    }
    l.recentNavEvent = void 0;
  }, I = function(k) {
    var B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    l.recentNavEvent = k;
    var H = M({
      event: k,
      isBackward: B
    });
    H && (et(k) && k.preventDefault(), C(H));
  }, L = function(k) {
    (r.isKeyForward(k) || r.isKeyBackward(k)) && I(k, r.isKeyBackward(k));
  }, T = function(k) {
    Zu(k) && Ue(r.escapeDeactivates, k) !== !1 && (k.preventDefault(), s.deactivate());
  }, E = function(k) {
    var B = it(k);
    u(B, k) >= 0 || Ue(r.clickOutsideDeactivates, k) || Ue(r.allowOutsideClick, k) || (k.preventDefault(), k.stopImmediatePropagation());
  }, b = function() {
    if (l.active)
      return $a.activateTrap(n, s), l.delayInitialFocusTimer = r.delayInitialFocus ? Aa(function() {
        C(p());
      }) : C(p()), e.addEventListener("focusin", x, !0), e.addEventListener("mousedown", y, {
        capture: !0,
        passive: !1
      }), e.addEventListener("touchstart", y, {
        capture: !0,
        passive: !1
      }), e.addEventListener("click", E, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", L, {
        capture: !0,
        passive: !1
      }), e.addEventListener("keydown", T), s;
  }, w = function() {
    if (l.active)
      return e.removeEventListener("focusin", x, !0), e.removeEventListener("mousedown", y, !0), e.removeEventListener("touchstart", y, !0), e.removeEventListener("click", E, !0), e.removeEventListener("keydown", L, !0), e.removeEventListener("keydown", T), s;
  }, A = function(k) {
    var B = k.some(function(H) {
      var $ = Array.from(H.removedNodes);
      return $.some(function(O) {
        return O === l.mostRecentlyFocusedNode;
      });
    });
    B && C(p());
  }, P = typeof window < "u" && "MutationObserver" in window ? new MutationObserver(A) : void 0, G = function() {
    P && (P.disconnect(), l.active && !l.paused && l.containers.map(function(k) {
      P.observe(k, {
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
    activate: function(k) {
      if (l.active)
        return this;
      var B = o(k, "onActivate"), H = o(k, "onPostActivate"), $ = o(k, "checkCanFocusTrap");
      $ || v(), l.active = !0, l.paused = !1, l.nodeFocusedBeforeActivation = e.activeElement, B == null || B();
      var O = function() {
        $ && v(), b(), G(), H == null || H();
      };
      return $ ? ($(l.containers.concat()).then(O, O), this) : (O(), this);
    },
    deactivate: function(k) {
      if (!l.active)
        return this;
      var B = Sa({
        onDeactivate: r.onDeactivate,
        onPostDeactivate: r.onPostDeactivate,
        checkCanReturnFocus: r.checkCanReturnFocus
      }, k);
      clearTimeout(l.delayInitialFocusTimer), l.delayInitialFocusTimer = void 0, w(), l.active = !1, l.paused = !1, G(), $a.deactivateTrap(n, s);
      var H = o(B, "onDeactivate"), $ = o(B, "onPostDeactivate"), O = o(B, "checkCanReturnFocus"), Z = o(B, "returnFocus", "returnFocusOnDeactivate");
      H == null || H();
      var Y = function() {
        Aa(function() {
          Z && C(D(l.nodeFocusedBeforeActivation)), $ == null || $();
        });
      };
      return Z && O ? (O(D(l.nodeFocusedBeforeActivation)).then(Y, Y), this) : (Y(), this);
    },
    pause: function(k) {
      return l.active ? (l.manuallyPaused = !0, this._setPausedState(!0, k)) : this;
    },
    unpause: function(k) {
      return l.active ? (l.manuallyPaused = !1, n[n.length - 1] !== this ? this : this._setPausedState(!1, k)) : this;
    },
    updateContainerElements: function(k) {
      var B = [].concat(k).filter(Boolean);
      return l.containers = B.map(function(H) {
        return typeof H == "string" ? e.querySelector(H) : H;
      }), l.active && v(), G(), this;
    }
  }, Object.defineProperties(s, {
    _isManuallyPaused: {
      value: function() {
        return l.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function(k, B) {
        if (l.paused === k)
          return this;
        if (l.paused = k, k) {
          var H = o(B, "onPause"), $ = o(B, "onPostPause");
          H == null || H(), w(), G(), $ == null || $();
        } else {
          var O = o(B, "onUnpause"), Z = o(B, "onPostUnpause");
          O == null || O(), v(), b(), G(), Z == null || Z();
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
const nd = {
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
}, rd = F({
  props: Object.assign({
    active: {
      // TODO: could be options for activate but what about the options for deactivating?
      type: Boolean,
      default: !0
    }
  }, nd),
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
    const r = K(null), l = _(() => {
      const o = r.value;
      return o && (o instanceof HTMLElement ? o : o.$el);
    });
    function s() {
      return n || (n = ad(l.value, {
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
    return ye(() => {
      ce(() => a.active, (o) => {
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
        const o = t.default().filter((u) => u.type !== lr);
        return !o || !o.length || o.length > 1 ? (console.error("[focus-trap-vue]: FocusTrap requires exactly one child."), o) : sr(o[0], { ref: r });
      }
    };
  }
}), ld = ["aria-labelledby", "role", "open"], sd = { class: "fr-container fr-container--fluid fr-container-md" }, od = { class: "fr-grid-row fr-grid-row--center" }, id = { class: "fr-modal__body" }, ud = { class: "fr-modal__header" }, dd = ["title"], cd = { class: "fr-modal__content" }, fd = ["id"], pd = {
  key: 0,
  class: "fr-modal__footer"
}, Oa = 2, md = /* @__PURE__ */ F({
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
    const e = a, n = t, r = (D) => {
      D.key === "Escape" && v();
    }, l = _(() => e.isAlert ? "alertdialog" : "dialog"), s = K(null), o = K();
    ce(() => e.opened, (D) => {
      var M, y;
      D ? ((M = o.value) == null || M.showModal(), setTimeout(() => {
        var x;
        (x = s.value) == null || x.focus();
      }, 100)) : (y = o.value) == null || y.close(), u(D);
    });
    function u(D) {
      typeof window < "u" && document.body.classList.toggle("modal-open", D);
    }
    ye(() => {
      d(), u(e.opened);
    }), fr(() => {
      p(), u(!1);
    });
    function d() {
      document.addEventListener("keydown", r);
    }
    function p() {
      document.removeEventListener("keydown", r);
    }
    async function v() {
      var D;
      await Qa(), (D = e.origin) == null || D.focus(), n("close");
    }
    const m = _(() => typeof e.icon == "string" && e.icon.startsWith("fr-icon-")), C = _(
      () => m.value ? void 0 : typeof e.icon == "string" ? { name: e.icon, scale: Oa } : { scale: Oa, ...e.icon ?? {} }
    );
    return (D, M) => D.opened ? (i(), j(q(rd), { key: 0 }, {
      default: U(() => {
        var y, x;
        return [
          c("dialog", {
            id: "fr-modal-1",
            ref_key: "modal",
            ref: o,
            "aria-modal": "true",
            "aria-labelledby": D.modalId,
            role: l.value,
            class: R(["fr-modal", { "fr-modal--opened": D.opened }]),
            open: D.opened
          }, [
            c("div", sd, [
              c("div", od, [
                c("div", {
                  class: R(["fr-col-12", {
                    "fr-col-md-8": D.size === "lg",
                    "fr-col-md-6": D.size === "md",
                    "fr-col-md-4": D.size === "sm"
                  }])
                }, [
                  c("div", id, [
                    c("div", ud, [
                      c("button", {
                        ref_key: "closeBtn",
                        ref: s,
                        class: "fr-btn fr-btn--close",
                        title: D.closeButtonTitle,
                        "aria-controls": "fr-modal-1",
                        type: "button",
                        onClick: M[0] || (M[0] = (I) => v())
                      }, [
                        c("span", null, h(D.closeButtonLabel), 1)
                      ], 8, dd)
                    ]),
                    c("div", cd, [
                      c("h1", {
                        id: D.modalId,
                        class: "fr-modal__title"
                      }, [
                        m.value || C.value ? (i(), f("span", {
                          key: 0,
                          class: R({
                            [String(D.icon)]: m.value
                          })
                        }, [
                          D.icon && C.value ? (i(), j(be, Ie(Q({ key: 0 }, C.value)), null, 16)) : g("", !0)
                        ], 2)) : g("", !0),
                        V(" " + h(D.title), 1)
                      ], 8, fd),
                      S(D.$slots, "default", {}, void 0, !0)
                    ]),
                    (y = D.actions) != null && y.length || D.$slots.footer ? (i(), f("div", pd, [
                      S(D.$slots, "footer", {}, void 0, !0),
                      (x = D.actions) != null && x.length ? (i(), j(Tt, {
                        key: 0,
                        align: "right",
                        buttons: D.actions,
                        "inline-layout-when": "large",
                        reverse: ""
                      }, null, 8, ["buttons"])) : g("", !0)
                    ])) : g("", !0)
                  ])
                ], 2)
              ])
            ])
          ], 10, ld)
        ];
      }),
      _: 3
    })) : g("", !0);
  }
}), xn = /* @__PURE__ */ we(md, [["__scopeId", "data-v-70fe954b"]]), hd = ["for"], vd = {
  key: 0,
  class: "required"
}, gd = {
  key: 0,
  class: "fr-hint-text"
}, bd = ["id"], yd = ["id"], kd = {
  key: 0,
  class: "fr-btns-group"
}, wd = {
  key: 1,
  class: "fr-input-group"
}, _d = { class: "fr-input-wrap fr-icon-search-line" }, xd = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Dd = { key: 2 }, Td = ["id"], Id = /* @__PURE__ */ F({
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
  setup(a) {
    const t = a, e = (W, X) => typeof W == "object" && W !== null && !!X && X in W, n = (W, X) => {
      if (X && e(W, X)) {
        const le = W[X];
        if (typeof le == "string" || typeof le == "number")
          return le;
        throw new Error(
          `The value of idKey ${String(X)} is not a string or number.`
        );
      }
      if (typeof W == "string" || typeof W == "number")
        return W;
      throw new Error(
        "Option is not a valid string, number, or object with idKey."
      );
    }, r = (W, X, le) => `${X}-${n(W, le)}`, l = K(null), s = K(!1), o = _e(a, "modelValue"), u = K(0), d = _(() => t.errorMessage || t.successMessage), p = _(() => t.errorMessage ? "error" : "valid"), v = [], {
      collapse: m,
      collapsing: C,
      cssExpanded: D,
      doExpand: M,
      onTransitionEnd: y
    } = Se(), x = () => document.querySelectorAll(`[id^="${t.id}-"][id$="-checkbox"]`), I = K(!1), L = K("");
    function T(W) {
      W.key === "Escape" && P();
    }
    function E(W) {
      var X, le;
      const ue = W.target;
      !((X = l.value) != null && X.$el.contains(ue)) && !((le = m.value) != null && le.contains(ue)) && P();
    }
    function b(W, X) {
      if (window.ResizeObserver) {
        const le = new window.ResizeObserver((ue) => {
          for (const pe of ue)
            X(W, pe);
        });
        return le.observe(W), () => {
          le.unobserve(W), le.disconnect();
        };
      }
      return () => {
      };
    }
    function w(W) {
      const X = W.getBoundingClientRect();
      X.width !== u.value && (u.value = X.width);
    }
    function A() {
      s.value = !0, I.value = !0, l.value && v.push(b(l.value.$el, w)), document.addEventListener("click", E), document.addEventListener("keydown", T), setTimeout(() => {
        M(!0);
      }, 100);
    }
    function P() {
      s.value = !1, M(!1), setTimeout(() => {
        I.value = !1;
      }, 300), k();
    }
    const G = async () => {
      I.value ? P() : A();
    };
    function k() {
      for (; v.length; ) {
        const W = v.pop();
        W && W();
      }
      document.removeEventListener("click", E), document.removeEventListener("keydown", T);
    }
    const B = _(
      () => t.options.filter((W) => typeof W == "object" && W !== null ? t.filteringKeys.some(
        (X) => `${W[X]}`.toLowerCase().includes(L.value.toLowerCase())
      ) : `${W}`.toLowerCase().includes(L.value.toLowerCase()))
    ), H = _(() => t.modelValue.length < B.value.length ? !1 : B.value.every((W) => {
      const X = n(W, t.idKey);
      return t.modelValue.includes(X);
    })), $ = () => {
      const W = new Set(o.value || []);
      H.value ? B.value.forEach((X) => {
        const le = n(X, t.idKey);
        W.delete(le);
      }) : B.value.forEach((X) => {
        const le = n(X, t.idKey);
        W.add(le);
      }), o.value = Array.from(W);
    }, O = (W) => {
      const [X] = x();
      X && (W.preventDefault(), X.focus());
    }, Z = (W) => {
      W.preventDefault();
      const X = x(), le = document.activeElement, ue = Array.from(X).indexOf(le);
      if (ue !== -1) {
        const pe = (ue + 1) % X.length;
        X[pe].focus();
      }
    }, Y = (W) => {
      W.preventDefault();
      const X = x(), le = document.activeElement, ue = Array.from(X).indexOf(le);
      if (ue !== -1) {
        const pe = (ue - 1 + X.length) % X.length;
        X[pe].focus();
      }
    }, re = (W) => {
      const X = x(), le = document.activeElement;
      Array.from(X).indexOf(le) + 1 === X.length && l.value && !W.shiftKey && P();
    }, ne = (W) => {
      var X;
      const le = document.activeElement;
      W.shiftKey && le === ((X = l.value) == null ? void 0 : X.$el) && P();
    };
    Ee(() => {
      k();
    });
    const De = _(() => {
      var W;
      const X = ((W = o.value) == null ? void 0 : W.length) ?? 0, le = X === 0, ue = X > 1;
      return le ? "Sélectionner une option" : `${X} option${ue ? "s" : ""} sélectionnée${ue ? "s" : ""}`;
    }), Ce = _(() => [
      "fr-label",
      { invisible: !t.labelVisible },
      t.labelClass
    ]);
    return (W, X) => {
      var le, ue;
      return i(), f("div", {
        class: R(["fr-select-group", { [`fr-select-group--${p.value}`]: d.value }])
      }, [
        c("label", {
          class: R(Ce.value),
          for: W.id
        }, [
          S(W.$slots, "label", {}, () => [
            V(h(W.label) + " ", 1),
            S(W.$slots, "required-tip", {}, () => [
              "required" in W.$attrs && W.$attrs.required !== !1 ? (i(), f("span", vd)) : g("", !0)
            ], !0)
          ], !0),
          t.hint || (ue = (le = W.$slots).hint) != null && ue.call(le) ? (i(), f("span", gd, [
            S(W.$slots, "hint", {}, () => [
              V(h(t.hint), 1)
            ], !0)
          ])) : g("", !0)
        ], 10, hd),
        ee(je, Q({
          id: t.id,
          ref_key: "host",
          ref: l,
          type: "button"
        }, W.$attrs, {
          class: ["fr-select fr-multiselect", {
            "fr-multiselect--is-open": s.value,
            [`fr-select--${p.value}`]: d.value
          }],
          "aria-expanded": s.value,
          "aria-controls": `${t.id}-collapse`,
          onClick: G,
          onKeydown: ae(te(ne, ["shift"]), ["tab"])
        }), {
          default: U(() => [
            S(W.$slots, "button-label", {}, () => [
              V(h(t.buttonLabel || De.value), 1)
            ], !0)
          ]),
          _: 3
        }, 16, ["id", "aria-expanded", "aria-controls", "class", "onKeydown"]),
        I.value ? (i(), f("div", {
          key: 0,
          id: `${t.id}-collapse`,
          ref_key: "collapse",
          ref: m,
          style: Te({
            "--width-host": `${u.value}px`
          }),
          class: R(["fr-multiselect__collapse fr-collapse", { "fr-collapse--expanded": q(D), "fr-collapsing": q(C) }]),
          onTransitionend: X[2] || (X[2] = (pe) => q(y)(s.value))
        }, [
          c("p", {
            id: `${W.id}-text-hint`,
            class: "fr-sr-only"
          }, " Utilisez la tabulation (ou les touches flèches) pour naviguer dans la liste des suggestions ", 8, yd),
          W.selectAll ? (i(), f("ul", kd, [
            c("li", null, [
              ee(je, {
                type: "button",
                name: "select-all",
                secondary: "",
                size: "sm",
                disabled: B.value.length === 0,
                onClick: $,
                onKeydown: ae(te(ne, ["shift"]), ["tab"])
              }, {
                default: U(() => [
                  c("span", {
                    class: R([
                      "fr-multiselect__search__icon",
                      H.value ? "fr-icon-close-circle-line" : "fr-icon-check-line"
                    ])
                  }, null, 2),
                  V(" " + h(t.selectAllLabel[H.value ? 1 : 0]), 1)
                ]),
                _: 1
              }, 8, ["disabled", "onKeydown"])
            ])
          ])) : g("", !0),
          t.search ? (i(), f("div", wd, [
            c("div", _d, [
              ee(Ct, {
                modelValue: L.value,
                "onUpdate:modelValue": X[0] || (X[0] = (pe) => L.value = pe),
                "aria-describedby": `${t.id}-text-hint`,
                "aria-controls": `${t.id}-checkboxes`,
                "aria-live": "polite",
                placeholder: "Rechercher",
                type: "text",
                onKeydown: [
                  ae(O, ["down"]),
                  ae(O, ["right"]),
                  ae(ne, ["tab"])
                ]
              }, null, 8, ["modelValue", "aria-describedby", "aria-controls"])
            ]),
            X[3] || (X[3] = c("div", {
              class: "fr-messages-group",
              "aria-live": "assertive"
            }, null, -1))
          ])) : g("", !0),
          ee(cn, {
            id: `${t.id}-checkboxes`,
            class: "fr-multiselect__collapse__fieldset",
            "aria-live": "polite",
            style: Te({ "--maxOverflowHeight": `${t.maxOverflowHeight}` }),
            legend: t.legend,
            "legend-id": `${t.id}-checkboxes-legend`
          }, {
            default: U(() => [
              S(W.$slots, "legend", {}, void 0, !0),
              (i(!0), f(z, null, J(B.value, (pe) => (i(), f("div", {
                key: `${r(pe, W.id, t.idKey)}-checkbox`,
                class: "fr-fieldset__element"
              }, [
                c("div", xd, [
                  ee(It, {
                    id: `${r(pe, W.id, t.idKey)}-checkbox`,
                    modelValue: o.value,
                    "onUpdate:modelValue": X[1] || (X[1] = (ar) => o.value = ar),
                    value: n(pe, t.idKey),
                    name: `${r(pe, W.id, t.idKey)}-checkbox`,
                    small: "",
                    onKeydown: [
                      ae(Z, ["down"]),
                      ae(Z, ["right"]),
                      ae(Y, ["up"]),
                      ae(Y, ["left"]),
                      ae(re, ["tab"])
                    ]
                  }, {
                    label: U(() => [
                      S(W.$slots, "checkbox-label", {
                        option: pe
                      }, () => [
                        V(h(n(pe, t.labelKey)), 1)
                      ], !0)
                    ]),
                    _: 2
                  }, 1032, ["id", "modelValue", "value", "name"])
                ])
              ]))), 128))
            ]),
            _: 3
          }, 8, ["id", "style", "legend", "legend-id"]),
          B.value.length === 0 ? (i(), f("div", Dd, [
            S(W.$slots, "no-results", {}, () => [
              X[4] || (X[4] = V(" Pas de résultat "))
            ], !0)
          ])) : g("", !0)
        ], 46, bd)) : g("", !0),
        d.value ? (i(), f("p", {
          key: 1,
          id: `select-${p.value}-desc-${p.value}`,
          class: R(`fr-${p.value}-text`)
        }, h(d.value), 11, Td)) : g("", !0)
      ], 2);
    };
  }
}), Cd = /* @__PURE__ */ we(Id, [["__scopeId", "data-v-829d79d0"]]), Ed = ["id", "aria-current"], Pd = /* @__PURE__ */ F({
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
      S(t.$slots, "default", {}, void 0, !0)
    ], 8, Ed));
  }
}), Dn = /* @__PURE__ */ we(Pd, [["__scopeId", "data-v-aa4076c4"]]), Md = ["href"], Ra = 2, Et = /* @__PURE__ */ F({
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
    const t = a, e = _(() => typeof t.to == "string" && t.to.startsWith("http")), n = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), r = _(
      () => n.value || !t.icon ? void 0 : typeof t.icon == "string" ? { scale: Ra, name: t.icon } : { scale: Ra, ...t.icon || {} }
    ), l = ir() ? Qe(ra) : void 0, s = (l == null ? void 0 : l()) ?? (() => {
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
      }, h(o.text), 9, Md)) : (i(), j(d, {
        key: 1,
        class: R(["fr-nav__link", {
          [String(o.icon)]: n.value
        }]),
        "data-testid": "nav-router-link",
        to: o.to,
        onClick: u[1] || (u[1] = (p) => {
          var v;
          q(s)(), o.$emit("toggleId", o.id), (v = o.onClick) == null || v.call(o, p);
        })
      }, {
        default: U(() => [
          o.icon && r.value ? (i(), j(be, Ie(Q({ key: 0 }, r.value)), null, 16)) : g("", !0),
          V(" " + h(o.text), 1)
        ]),
        _: 1
      }, 8, ["to", "class"]));
    };
  }
}), Ld = { class: "fr-col-12 fr-col-lg-3" }, Bd = { class: "fr-mega-menu__category" }, Sd = { class: "fr-mega-menu__list" }, Tn = /* @__PURE__ */ F({
  __name: "DsfrNavigationMegaMenuCategory",
  props: {
    title: {},
    active: { type: Boolean },
    links: {}
  },
  setup(a) {
    return (t, e) => (i(), f("div", Ld, [
      c("h5", Bd, [
        c("a", {
          class: "fr-nav__link",
          href: "#",
          onClick: e[0] || (e[0] = te(() => {
          }, ["prevent"]))
        }, h(t.title), 1)
      ]),
      c("ul", Sd, [
        (i(!0), f(z, null, J(t.links, (n, r) => (i(), f("li", {
          key: r,
          class: "fr-nav__link"
        }, [
          ee(Et, Q({ ref_for: !0 }, n), null, 16)
        ]))), 128))
      ])
    ]));
  }
}), $d = ["aria-expanded", "aria-current", "aria-controls"], Ad = ["id"], Od = { class: "fr-container fr-container--fluid fr-container-lg" }, Rd = { class: "fr-grid-row fr-grid-row-lg--gutters" }, Fd = { class: "fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right fr-mb-4v" }, Vd = { class: "fr-mega-menu__leader" }, Nd = { class: "fr-h4 fr-mb-2v" }, qd = { class: "fr-hidden fr-displayed-lg" }, jd = /* @__PURE__ */ F({
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
    } = Se(), o = _(() => t.id === t.expandedId);
    return ce(o, (u, d) => {
      u !== d && l(u);
    }), ye(() => {
      o.value && l(!0);
    }), (u, d) => {
      const p = xe("RouterLink");
      return i(), f(z, null, [
        c("button", {
          class: "fr-nav__btn",
          "aria-expanded": o.value,
          "aria-current": u.active || void 0,
          "aria-controls": u.id,
          onClick: d[0] || (d[0] = (v) => u.$emit("toggleId", u.id))
        }, h(u.title), 9, $d),
        c("div", {
          id: u.id,
          ref_key: "collapse",
          ref: e,
          "data-testid": "mega-menu-wrapper",
          class: R(["fr-collapse fr-mega-menu", {
            "fr-collapse--expanded": q(r),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": q(n)
          }]),
          tabindex: "-1",
          onTransitionend: d[2] || (d[2] = (v) => q(s)(o.value))
        }, [
          c("div", Od, [
            c("button", {
              class: "fr-link--close fr-link",
              "aria-controls": "mega-menu-695",
              onClick: d[1] || (d[1] = (v) => u.$emit("toggleId", u.id))
            }, " Fermer "),
            c("div", Rd, [
              c("div", Fd, [
                c("div", Vd, [
                  c("h4", Nd, h(u.title), 1),
                  c("p", qd, [
                    V(h(u.description) + " ", 1),
                    S(u.$slots, "description", {}, void 0, !0)
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
              S(u.$slots, "default", {}, void 0, !0),
              (i(!0), f(z, null, J(u.menus, (v, m) => (i(), j(Tn, Q({
                key: m,
                ref_for: !0
              }, v), null, 16))), 128))
            ])
          ])
        ], 42, Ad)
      ], 64);
    };
  }
}), In = /* @__PURE__ */ we(jd, [["__scopeId", "data-v-1e103394"]]), Hd = ["id", "aria-current"], Cn = /* @__PURE__ */ F({
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
      S(t.$slots, "default")
    ], 8, Hd));
  }
}), Wd = ["aria-expanded", "aria-current", "aria-controls"], Kd = ["id"], Qd = { class: "fr-menu__list" }, En = /* @__PURE__ */ F({
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
    } = Se(), o = _(() => t.id === t.expandedId);
    return ce(o, (u, d) => {
      u !== d && l(u);
    }), ye(() => {
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
      ], 8, Wd),
      c("div", {
        id: u.id,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse fr-menu", { "fr-collapse--expanded": q(r), "fr-collapsing": q(n) }]),
        "data-testid": "navigation-menu",
        onTransitionend: d[2] || (d[2] = (p) => q(s)(o.value))
      }, [
        c("ul", Qd, [
          S(u.$slots, "default"),
          (i(!0), f(z, null, J(u.links, (p, v) => (i(), j(Cn, { key: v }, {
            default: U(() => [
              ee(Et, Q({ ref_for: !0 }, p, {
                onToggleId: d[1] || (d[1] = (m) => u.$emit("toggleId", u.expandedId))
              }), null, 16)
            ]),
            _: 2
          }, 1024))), 128))
        ])
      ], 42, Kd)
    ], 64));
  }
}), Yd = ["id", "aria-label"], zd = { class: "fr-nav__list" }, Gd = /* @__PURE__ */ F({
  __name: "DsfrNavigation",
  props: {
    id: { default: () => se("nav") },
    label: { default: "Menu principal" },
    navItems: { default: () => [] }
  },
  setup(a) {
    const t = a, e = K(void 0), n = (o) => {
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
    return ye(() => {
      document.addEventListener("click", l), document.addEventListener("keydown", s);
    }), Ee(() => {
      document.removeEventListener("click", l), document.removeEventListener("keydown", s);
    }), (o, u) => (i(), f("nav", {
      id: o.id,
      class: "fr-nav",
      role: "navigation",
      "aria-label": o.label
    }, [
      c("ul", zd, [
        S(o.$slots, "default"),
        (i(!0), f(z, null, J(o.navItems, (d, p) => (i(), j(Dn, {
          id: d.id,
          key: p
        }, {
          default: U(() => [
            d.to && d.text ? (i(), j(Et, Q({
              key: 0,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[0] || (u[0] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : d.title && d.links ? (i(), j(En, Q({
              key: 1,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[1] || (u[1] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : d.title && d.menus ? (i(), j(In, Q({
              key: 2,
              ref_for: !0
            }, d, {
              "expanded-id": e.value,
              onToggleId: u[2] || (u[2] = (v) => n(v))
            }), null, 16, ["expanded-id"])) : g("", !0)
          ]),
          _: 2
        }, 1032, ["id"]))), 128))
      ])
    ], 8, Yd));
  }
}), Xd = { class: "fr-container" }, Ud = { class: "fr-notice__body" }, Zd = { class: "fr-notice__title" }, Jd = { class: "fr-notice__desc" }, ec = /* @__PURE__ */ F({
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
      c("div", Xd, [
        c("div", Ud, [
          c("p", null, [
            c("span", Zd, [
              S(t.$slots, "default", {}, () => [
                V(h(t.title), 1)
              ])
            ]),
            c("span", Jd, [
              S(t.$slots, "desc", {}, () => [
                V(h(t.desc), 1)
              ])
            ])
          ]),
          t.closeable ? (i(), f("button", {
            key: 0,
            class: "fr-btn--close fr-btn",
            title: "Masquer le message",
            onClick: e[0] || (e[0] = (n) => t.$emit("close"))
          }, " Masquer le message ")) : g("", !0)
        ])
      ])
    ], 2));
  }
}), tc = ["aria-label"], ac = { class: "fr-content-media__img" }, nc = ["src", "alt", "title", "ratio"], rc = { class: "fr-content-media__caption" }, lc = /* @__PURE__ */ F({
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
      c("div", ac, [
        S(t.$slots, "default", {}, () => [
          t.src ? (i(), f("img", {
            key: 0,
            src: t.src,
            class: R(["fr-responsive-img", `fr-ratio-${t.ratio}`]),
            alt: t.alt,
            title: t.title,
            ratio: t.ratio
          }, null, 10, nc)) : g("", !0)
        ])
      ]),
      c("figcaption", rc, h(t.legend), 1)
    ], 10, tc));
  }
}), sc = { class: "fr-quote fr-quote--column" }, oc = ["cite"], ic = { class: "fr-quote__author" }, uc = { class: "fr-quote__source" }, dc = ["href"], cc = {
  key: 0,
  class: "fr-quote__image"
}, fc = ["src"], pc = /* @__PURE__ */ F({
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
    return (t, e) => (i(), f("figure", sc, [
      t.source ? (i(), f("blockquote", {
        key: 0,
        cite: t.sourceUrl
      }, [
        c("p", null, "« " + h(t.quote) + " »", 1)
      ], 8, oc)) : g("", !0),
      c("figcaption", null, [
        c("p", ic, h(t.author), 1),
        c("ul", uc, [
          c("li", null, [
            c("cite", null, h(t.source), 1)
          ]),
          (i(!0), f(z, null, J(t.details, (n, r) => (i(), f("li", { key: r }, [
            typeof n == "object" ? (i(), f("a", {
              key: 0,
              target: "_blank",
              rel: "noopener noreferrer",
              href: n.url
            }, h(n.label), 9, dc)) : (i(), f(z, { key: 1 }, [
              V(h(n), 1)
            ], 64))
          ]))), 128))
        ]),
        t.quoteImage ? (i(), f("div", cc, [
          c("img", {
            src: t.quoteImage,
            class: "fr-responsive-img",
            alt: ""
          }, null, 8, fc)
        ])) : g("", !0)
      ])
    ]));
  }
}), mc = ["id", "name", "value", "checked", "disabled"], hc = ["for"], vc = {
  key: 0,
  class: "required"
}, gc = {
  key: 0,
  class: "fr-hint-text"
}, bc = {
  key: 0,
  class: "fr-radio-rich__pictogram"
}, yc = ["src", "title"], kc = { key: 0 }, wc = ["href"], _c = ["href"], xc = ["href"], Pn = /* @__PURE__ */ F({
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
    const t = a, e = { viewBox: "0 0 80 80", width: "80px", height: "80px" }, n = _(() => !!t.img || !!t.svgPath);
    return (r, l) => (i(), f("div", {
      class: R(["fr-fieldset__element", { "fr-fieldset__element--inline": r.inline }])
    }, [
      c("div", {
        class: R(["fr-radio-group", {
          "fr-radio-rich": n.value,
          "fr-radio-group--sm": r.small
        }])
      }, [
        c("input", Q({
          id: r.id,
          type: "radio",
          name: r.name,
          value: r.value,
          checked: r.modelValue === r.value,
          disabled: r.disabled
        }, r.$attrs, {
          onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
        }), null, 16, mc),
        c("label", {
          for: r.id,
          class: "fr-label"
        }, [
          S(r.$slots, "label", {}, () => [
            V(h(r.label) + " ", 1),
            S(r.$slots, "required-tip", {}, () => [
              r.$attrs.required ? (i(), f("span", vc, " *")) : g("", !0)
            ])
          ]),
          r.hint ? (i(), f("span", gc, h(r.hint), 1)) : g("", !0)
        ], 8, hc),
        r.img || r.svgPath ? (i(), f("div", bc, [
          r.img ? (i(), f("img", {
            key: 0,
            src: r.img,
            class: "fr-artwork",
            alt: "",
            title: r.imgTitle
          }, null, 8, yc)) : (i(), f("svg", Q({
            key: 1,
            "aria-hidden": "true",
            class: "fr-artwork"
          }, { ...e, ...r.svgAttrs }), [
            r.imgTitle ? (i(), f("title", kc, h(r.imgTitle), 1)) : g("", !0),
            c("use", {
              class: "fr-artwork-decorative",
              href: `${r.svgPath}#artwork-decorative`
            }, null, 8, wc),
            c("use", {
              class: "fr-artwork-minor",
              href: `${r.svgPath}#artwork-minor`
            }, null, 8, _c),
            c("use", {
              class: "fr-artwork-major",
              href: `${r.svgPath}#artwork-major`
            }, null, 8, xc)
          ], 16))
        ])) : g("", !0)
      ], 2)
    ], 2));
  }
}), Dc = { class: "fr-form-group" }, Tc = ["disabled", "aria-labelledby", "aria-invalid", "role"], Ic = ["id"], Cc = {
  key: 0,
  class: "fr-hint-text"
}, Ec = {
  key: 0,
  class: "required"
}, Pc = ["id"], Mc = /* @__PURE__ */ F({
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
    const e = a, n = t, r = _(() => e.errorMessage || e.validMessage), l = _(() => e.errorMessage ? "fr-error-text" : "fr-valid-text"), s = (u) => {
      u !== e.modelValue && n("update:modelValue", u);
    }, o = _(() => r.value ? `${e.titleId} messages-${e.titleId}` : e.titleId);
    return (u, d) => (i(), f("div", Dc, [
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
          S(u.$slots, "legend", {}, () => [
            V(h(u.legend) + " ", 1),
            u.hint || u.$slots.hint ? (i(), f("span", Cc, [
              S(u.$slots, "hint", {}, () => [
                V(h(u.hint), 1)
              ])
            ])) : g("", !0),
            S(u.$slots, "required-tip", {}, () => [
              u.required ? (i(), f("span", Ec, " *")) : g("", !0)
            ])
          ])
        ], 8, Ic)) : g("", !0),
        S(u.$slots, "default", {}, () => [
          (i(!0), f(z, null, J(u.options, (p, v) => (i(), j(Pn, Q({
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
        ], 8, Pc)) : g("", !0)
      ], 10, Tc)
    ]));
  }
}), Lc = ["id"], Bc = ["id"], Sc = { class: "fr-hint-text" }, $c = ["data-fr-prefix", "data-fr-suffix"], Ac = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Oc = ["id", "min", "max", "step", "value", "disabled", "aria-disabled", "aria-labelledby", "aria-describedby"], Rc = {
  key: 1,
  class: "fr-range__min",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Fc = {
  key: 2,
  class: "fr-range__max",
  "aria-hidden": "true",
  "data-fr-js-range-limit": "true"
}, Vc = ["id"], Nc = ["id"], qc = /* @__PURE__ */ F({
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
    const e = a, n = t, r = K(), l = K(), s = K(), o = _(() => e.lowerValue !== void 0), u = _(() => e.step !== void 0), d = _(() => {
      if (e.lowerValue === void 0) {
        const m = (e.modelValue - e.min) / (e.max - e.min) * s.value;
        return `transform: translateX(${m}px) translateX(-${m / s.value * 100}%);`;
      }
      return `transform: translateX(${(e.modelValue + e.lowerValue - e.min) / 2 / (e.max - e.min) * s.value}px) translateX(-${e.lowerValue + (e.modelValue - e.lowerValue) / 2}%);`;
    }), p = _(() => {
      const m = e.max - e.min, C = (e.modelValue - e.min) / m, D = ((e.lowerValue ?? 0) - e.min) / m, M = e.small ? 12 : 24, y = (s.value - M) / (m / (e.step ?? 2)), x = o.value ? 32 * (1 - C) : 0;
      return {
        "--progress-right": `${(C * s.value + x).toFixed(2)}px`,
        ...o.value ? { "--progress-left": `${(D * s.value).toFixed(2)}px` } : {},
        ...u.value ? { "--step-width": `${Math.floor(y)}px` } : {}
      };
    });
    ce([() => e.modelValue, () => e.lowerValue], ([m, C]) => {
      C !== void 0 && (o.value && m < C && n("update:lowerValue", m), o.value && C > m && n("update:modelValue", C));
    });
    const v = _(() => (e.prefix ?? "").concat(o.value ? `${e.lowerValue} - ` : "").concat(`${e.modelValue}`).concat(e.suffix ?? ""));
    return ye(() => {
      var m;
      s.value = (m = r.value) == null ? void 0 : m.offsetWidth;
    }), (m, C) => (i(), f("div", {
      id: `${m.id}-group`,
      class: R(["fr-range-group", { "fr-range-group--error": m.message }])
    }, [
      c("label", {
        id: `${m.id}-label`,
        class: "fr-label"
      }, [
        S(m.$slots, "label", {}, () => [
          V(h(m.label), 1)
        ]),
        c("span", Sc, [
          S(m.$slots, "hint", {}, () => [
            V(h(m.hint), 1)
          ])
        ])
      ], 8, Bc),
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
          onInput: C[0] || (C[0] = (D) => {
            var M;
            return n("update:lowerValue", +((M = D.target) == null ? void 0 : M.value));
          })
        }, null, 40, Ac)) : g("", !0),
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
          onInput: C[1] || (C[1] = (D) => {
            var M;
            return n("update:modelValue", +((M = D.target) == null ? void 0 : M.value));
          })
        }, null, 40, Oc),
        m.hideIndicators ? g("", !0) : (i(), f("span", Rc, h(m.min), 1)),
        m.hideIndicators ? g("", !0) : (i(), f("span", Fc, h(m.max), 1))
      ], 14, $c),
      m.message || m.$slots.messages ? (i(), f("div", {
        key: 0,
        id: `${m.id}-messages`,
        class: "fr-messages-group",
        "aria-live": "polite",
        role: "alert"
      }, [
        S(m.$slots, "messages", {}, () => [
          m.message ? (i(), f("p", {
            key: 0,
            id: `${m.id}-message-error`,
            class: "fr-message fr-message--error"
          }, h(m.message), 9, Nc)) : g("", !0)
        ])
      ], 8, Vc)) : g("", !0)
    ], 10, Lc));
  }
}), jc = { class: "fr-segmented__element" }, Hc = ["id", "name", "value", "checked", "disabled", "aria-disabled"], Wc = ["for"], Kc = { key: 1 }, Mn = /* @__PURE__ */ F({
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
    const t = a, e = _(() => typeof t.icon == "string" ? { name: t.icon } : t.icon), n = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : "");
    return (r, l) => (i(), f("div", jc, [
      c("input", Q({
        id: r.id,
        type: "radio",
        name: r.name,
        value: r.value,
        checked: r.modelValue === r.value,
        disabled: r.disabled,
        "aria-disabled": r.disabled
      }, r.$attrs, {
        onClick: l[0] || (l[0] = (s) => r.$emit("update:modelValue", r.value))
      }), null, 16, Hc),
      c("label", {
        for: r.id,
        class: R(["fr-label", { [n.value]: n.value }])
      }, [
        r.icon && !n.value ? (i(), j(be, Ie(Q({ key: 0 }, e.value)), null, 16)) : g("", !0),
        r.icon ? (i(), f("span", Kc, " ")) : g("", !0),
        V(" " + h(r.label), 1)
      ], 10, Wc)
    ]));
  }
}), Qc = { class: "fr-form-group" }, Yc = ["disabled"], zc = ["id"], Gc = {
  key: 0,
  class: "fr-hint-text"
}, Xc = { class: "fr-segmented__elements" }, Uc = /* @__PURE__ */ F({
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
    return (l, s) => (i(), f("div", Qc, [
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
          S(l.$slots, "legend", {}, () => [
            V(h(l.legend), 1)
          ]),
          l.hint ? (i(), f("span", Gc, h(l.hint), 1)) : g("", !0)
        ], 10, zc)) : g("", !0),
        c("div", Xc, [
          S(l.$slots, "default", {}, () => [
            (i(!0), f(z, null, J(l.options, (o, u) => (i(), j(Mn, Q({
              key: o.value || u,
              name: l.name || o.name,
              ref_for: !0
            }, { ...o, disabled: l.disabled || o.disabled }, {
              "model-value": l.modelValue,
              "onUpdate:modelValue": s[0] || (s[0] = (d) => r(d))
            }), null, 16, ["name", "model-value"]))), 128))
          ])
        ])
      ], 10, Yc)
    ]));
  }
}), Zc = ["for"], Jc = {
  key: 0,
  class: "required"
}, ef = {
  key: 0,
  class: "fr-hint-text"
}, tf = ["id", "name", "disabled", "aria-disabled", "required"], af = ["selected"], nf = ["selected", "value", "disabled", "aria-disabled"], rf = ["id"], lf = /* @__PURE__ */ F({
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
    const e = _(() => t.errorMessage || t.successMessage), n = _(() => t.errorMessage ? "error" : "valid");
    return (r, l) => (i(), f("div", {
      class: R(["fr-select-group", { [`fr-select-group--${n.value}`]: e.value }])
    }, [
      c("label", {
        class: "fr-label",
        for: r.selectId
      }, [
        S(r.$slots, "label", {}, () => [
          V(h(r.label) + " ", 1),
          S(r.$slots, "required-tip", {}, () => [
            r.required ? (i(), f("span", Jc, " *")) : g("", !0)
          ])
        ]),
        r.hint ?? r.description ? (i(), f("span", ef, h(r.hint ?? r.description), 1)) : g("", !0)
      ], 8, Zc),
      c("select", Q({
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
        }, h(r.defaultUnselectedText), 9, af),
        (i(!0), f(z, null, J(r.options, (s, o) => (i(), f("option", {
          key: o,
          selected: r.modelValue === s || typeof s == "object" && s.value === r.modelValue,
          value: typeof s == "object" ? s.value : s,
          disabled: !!(typeof s == "object" && s.disabled),
          "aria-disabled": !!(typeof s == "object" && s.disabled)
        }, h(typeof s == "object" ? s.text : s), 9, nf))), 128))
      ], 16, tf),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: R(`fr-${n.value}-text`)
      }, h(e.value), 11, rf)) : g("", !0)
    ], 2));
  }
}), sf = { class: "fr-share" }, of = { class: "fr-share__title" }, uf = { class: "fr-btns-group" }, df = ["title", "href", "onClick"], cf = { key: 0 }, ff = ["href", "title"], pf = ["title"], mf = /* @__PURE__ */ F({
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
      return i(), f("div", sf, [
        c("p", of, h(n.title), 1),
        c("ul", uf, [
          (i(!0), f(z, null, J(n.networks, (s, o) => (i(), f("li", { key: o }, [
            c("a", {
              class: R(`fr-btn fr-btn--${s.name}`),
              title: `${s.label} - nouvelle fenêtre`,
              href: s.url,
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: te((u) => e(s), ["prevent"])
            }, h(s.label), 11, df)
          ]))), 128)),
          (l = n.mail) != null && l.to ? (i(), f("li", cf, [
            c("a", {
              class: "fr-btn fr-btn--mail",
              href: n.mail.to,
              title: n.mail.label,
              target: "_blank",
              rel: "noopener noreferrer"
            }, h(n.mail.label), 9, ff)
          ])) : g("", !0),
          c("li", null, [
            c("button", {
              class: "fr-btn fr-btn--copy",
              title: n.copyLabel,
              onClick: r[0] || (r[0] = (s) => t())
            }, h(n.copyLabel), 9, pf)
          ])
        ])
      ]);
    };
  }
}), hf = ["aria-current", "aria-expanded", "aria-controls"], Ln = /* @__PURE__ */ F({
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
      S(t.$slots, "default")
    ], 8, hf));
  }
}), Bn = /* @__PURE__ */ F({
  __name: "DsfrSideMenuListItem",
  props: {
    active: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("li", {
      class: R(["fr-sidemenu__item", { "fr-sidemenu__item--active": t.active }])
    }, [
      S(t.$slots, "default")
    ], 2));
  }
}), vf = ["id"], gf = { class: "fr-sidemenu__list" }, Sn = /* @__PURE__ */ F({
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
    ce(() => t.expanded, (p, v) => {
      p !== v && l(p);
    }), ye(() => {
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
          "fr-collapsing": q(n),
          "fr-collapse--expanded": q(r)
        }),
        onTransitionend: v[2] || (v[2] = (C) => q(s)(!!p.expanded, p.focusOnExpanding))
      }, [
        c("ul", gf, [
          S(p.$slots, "default"),
          (i(!0), f(z, null, J(p.menuItems, (C, D) => (i(), j(Bn, {
            key: D,
            active: C.active
          }, {
            default: U(() => [
              C.menuItems ? g("", !0) : (i(), j(ve(u(C.to)), Q({
                key: 0,
                class: "fr-sidemenu__link",
                "aria-current": C.active ? "page" : void 0,
                ref_for: !0
              }, d(C.to)), {
                default: U(() => [
                  V(h(C.text), 1)
                ]),
                _: 2
              }, 1040, ["aria-current"])),
              C.menuItems ? (i(), f(z, { key: 1 }, [
                ee(Ln, {
                  active: !!C.active,
                  expanded: !!C.expanded,
                  "control-id": C.id,
                  onToggleExpand: v[0] || (v[0] = (M) => p.$emit("toggleExpand", M))
                }, {
                  default: U(() => [
                    V(h(C.text), 1)
                  ]),
                  _: 2
                }, 1032, ["active", "expanded", "control-id"]),
                C.menuItems ? (i(), j(m, {
                  key: 0,
                  id: C.id,
                  collapsable: "",
                  expanded: C.expanded,
                  "menu-items": C.menuItems,
                  onToggleExpand: v[1] || (v[1] = (M) => p.$emit("toggleExpand", M))
                }, null, 8, ["id", "expanded", "menu-items"])) : g("", !0)
              ], 64)) : g("", !0)
            ]),
            _: 2
          }, 1032, ["active"]))), 128))
        ])
      ], 42, vf);
    };
  }
}), bf = ["aria-labelledby"], yf = { class: "fr-sidemenu__inner" }, kf = ["aria-controls", "aria-expanded"], wf = ["id"], _f = /* @__PURE__ */ F({
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
    } = Se(), s = K(!1);
    return ce(s, (o, u) => {
      o !== u && r(o);
    }), (o, u) => (i(), f("nav", {
      class: "fr-sidemenu",
      "aria-labelledby": o.id
    }, [
      c("div", yf, [
        c("button", {
          class: "fr-sidemenu__btn",
          "aria-controls": o.id,
          "aria-expanded": s.value,
          onClick: u[0] || (u[0] = te((d) => s.value = !s.value, ["prevent", "stop"]))
        }, h(o.buttonLabel), 9, kf),
        c("div", {
          id: o.id,
          ref_key: "collapse",
          ref: t,
          class: R(["fr-collapse", {
            "fr-collapse--expanded": q(n),
            // Need to use a separate data to add/remove the class after a RAF
            "fr-collapsing": q(e)
          }]),
          onTransitionend: u[2] || (u[2] = (d) => q(l)(s.value, o.focusOnExpanding))
        }, [
          (i(), j(ve(o.titleTag), { class: "fr-sidemenu__title" }, {
            default: U(() => [
              V(h(o.headingTitle), 1)
            ]),
            _: 1
          })),
          S(o.$slots, "default", {}, () => [
            ee(Sn, {
              id: o.sideMenuListId,
              "menu-items": o.menuItems,
              onToggleExpand: u[1] || (u[1] = (d) => o.$emit("toggleExpand", d))
            }, null, 8, ["id", "menu-items"])
          ])
        ], 42, wf)
      ])
    ], 8, bf));
  }
}), xf = /* @__PURE__ */ F({
  __name: "DsfrSideMenuLink",
  props: {
    active: { type: Boolean },
    to: { default: "" }
  },
  emits: ["toggle-expand"],
  setup(a) {
    const t = a, e = _(() => typeof t.to == "string" && t.to.startsWith("http")), n = _(() => e.value ? "a" : "RouterLink"), r = _(() => ({ [e.value ? "href" : "to"]: t.to }));
    return (l, s) => (i(), j(ve(n.value), Q({
      "aria-current": l.active ? "page" : void 0,
      class: "fr-sidemenu__link"
    }, r.value), {
      default: U(() => [
        S(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-current"]));
  }
}), Df = { class: "fr-skiplinks" }, Tf = {
  class: "fr-container",
  role: "navigation",
  "aria-label": "Accès rapide"
}, If = { class: "fr-skiplinks__list" }, Cf = ["href", "onClick"], Ef = /* @__PURE__ */ F({
  __name: "DsfrSkipLinks",
  props: {
    links: {}
  },
  setup(a) {
    const t = (e) => {
      const n = document.getElementById(e);
      n == null || n.focus();
    };
    return (e, n) => (i(), f("div", Df, [
      c("nav", Tf, [
        c("ul", If, [
          (i(!0), f(z, null, J(e.links, (r) => (i(), f("li", {
            key: r.id
          }, [
            c("a", {
              class: "fr-link",
              href: `#${r.id}`,
              onClick: (l) => t(r.id)
            }, h(r.text), 9, Cf)
          ]))), 128))
        ])
      ])
    ]));
  }
}), Pf = { class: "fr-stepper" }, Mf = { class: "fr-stepper__title" }, Lf = { class: "fr-stepper__state" }, Bf = ["data-fr-current-step", "data-fr-steps"], Sf = { class: "fr-stepper__details" }, $f = {
  key: 0,
  class: "fr-text--bold"
}, Af = /* @__PURE__ */ F({
  __name: "DsfrStepper",
  props: {
    steps: { default: () => [] },
    currentStep: { default: 1 }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Pf, [
      c("h2", Mf, [
        V(h(t.steps[t.currentStep - 1]) + " ", 1),
        c("span", Lf, "Étape " + h(t.currentStep) + " sur " + h(t.steps.length), 1)
      ]),
      c("div", {
        class: "fr-stepper__steps",
        "data-fr-current-step": t.currentStep,
        "data-fr-steps": t.steps.length
      }, null, 8, Bf),
      c("p", Sf, [
        t.currentStep < t.steps.length ? (i(), f("span", $f, "Étape suivante :")) : g("", !0),
        V(" " + h(t.steps[t.currentStep]), 1)
      ])
    ]));
  }
}), Of = {
  class: "fr-summary",
  role: "navigation",
  "aria-labelledby": "fr-summary-title"
}, Rf = {
  id: "fr-summary-title",
  class: "fr-summary__title"
}, Ff = { class: "fr-summary__list" }, Vf = ["href"], Nf = /* @__PURE__ */ F({
  __name: "DsfrSummary",
  props: {
    title: { default: "Sommaire" },
    anchors: { default: () => [] }
  },
  setup(a) {
    return (t, e) => (i(), f("nav", Of, [
      c("h2", Rf, h(t.title), 1),
      c("ol", Ff, [
        (i(!0), f(z, null, J(t.anchors, (n, r) => (i(), f("li", { key: r }, [
          c("a", {
            class: "fr-summary__link",
            href: n.link
          }, h(n.name), 9, Vf)
        ]))), 128))
      ])
    ]));
  }
}), qf = ["id", "aria-labelledby", "tabindex"], jf = /* @__PURE__ */ F({
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
    const t = a, e = { true: "100%", false: "-100%" }, n = Qe(Dt), { isVisible: r, asc: l } = n(st(() => t.tabId)), s = _(() => e[String(l == null ? void 0 : l.value)]), o = _(() => e[String(!(l != null && l.value))]);
    return (u, d) => (i(), j(pr, {
      name: "slide-fade",
      mode: "in-out"
    }, {
      default: U(() => [
        Le(c("div", {
          id: u.panelId,
          class: R(["fr-tabs__panel", {
            "fr-tabs__panel--selected": q(r)
          }]),
          role: "tabpanel",
          "aria-labelledby": u.tabId,
          tabindex: q(r) ? 0 : -1
        }, [
          S(u.$slots, "default", {}, void 0, !0)
        ], 10, qf), [
          [mr, q(r)]
        ])
      ]),
      _: 3
    }));
  }
}), $n = /* @__PURE__ */ we(jf, [["__scopeId", "data-v-5774b16c"]]), Hf = { role: "presentation" }, Wf = ["id", "data-testid", "tabindex", "aria-selected", "aria-controls"], Kf = {
  key: 0,
  style: { "margin-left": "-0.25rem", "margin-right": "0.5rem", "font-size": "0.95rem" }
}, An = /* @__PURE__ */ F({
  __name: "DsfrTabItem",
  props: {
    panelId: {},
    tabId: {},
    icon: { default: void 0 }
  },
  emits: ["click", "next", "previous", "first", "last"],
  setup(a, { emit: t }) {
    const e = a, n = t, r = K(null), l = {
      ArrowRight: "next",
      ArrowLeft: "previous",
      Home: "first",
      End: "last"
    };
    function s(p) {
      const v = p == null ? void 0 : p.key, m = l[v];
      m && n(m);
    }
    const o = Qe(Dt), { isVisible: u } = o(st(() => e.tabId)), d = ur("button");
    return ce(u, () => {
      var p;
      u.value && ((p = d.value) == null || p.focus());
    }), (p, v) => (i(), f("li", Hf, [
      c("button", {
        id: p.tabId,
        ref_key: "button",
        ref: r,
        "data-testid": `test-${p.tabId}`,
        class: "fr-tabs__tab",
        tabindex: q(u) ? 0 : -1,
        role: "tab",
        type: "button",
        "aria-selected": q(u),
        "aria-controls": p.panelId,
        onClick: v[0] || (v[0] = te((m) => p.$emit("click", p.tabId), ["prevent"])),
        onKeydown: v[1] || (v[1] = (m) => s(m))
      }, [
        p.icon ? (i(), f("span", Kf, [
          ee(be, { name: p.icon }, null, 8, ["name"])
        ])) : g("", !0),
        S(p.$slots, "default")
      ], 40, Wf)
    ]));
  }
}), On = /* @__PURE__ */ F({
  __name: "DsfrTableHeader",
  props: {
    header: { default: "" },
    headerAttrs: { default: () => ({}) },
    icon: { default: void 0 }
  },
  setup(a) {
    const t = a, e = _(() => t.icon && typeof t.icon == "string" && t.icon.startsWith("fr-") ? t.icon : ""), n = _(() => e.value ? void 0 : typeof t.icon == "string" ? { name: t.icon } : t.icon);
    return (r, l) => (i(), f("th", Q(r.headerAttrs, { scope: "col" }), [
      V(h(r.header) + " ", 1),
      r.icon && !e.value ? (i(), j(be, Ie(Q({ key: 0 }, n.value)), null, 16)) : g("", !0),
      e.value ? (i(), f("span", {
        key: 1,
        class: R({ [String(r.icon)]: e.value })
      }, null, 2)) : g("", !0)
    ], 16));
  }
}), Qf = { key: 0 }, Rn = /* @__PURE__ */ F({
  __name: "DsfrTableHeaders",
  props: {
    headers: {}
  },
  setup(a) {
    return (t, e) => t.headers ? (i(), f("tr", Qf, [
      (i(!0), f(z, null, J(t.headers, (n, r) => (i(), j(On, {
        key: r,
        header: (typeof n == "object" ? n : {}).text || n,
        "header-attrs": n.headerAttrs
      }, null, 8, ["header", "header-attrs"]))), 128))
    ])) : g("", !0);
  }
}), Fn = /* @__PURE__ */ F({
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
    return (r, l) => (i(), f("td", Ie(kt(r.cellAttrs)), [
      e.value ? (i(), j(ve(e.value), Ie(Q({ key: 0 }, typeof r.field == "object" ? r.field : {})), {
        default: U(() => [
          V(h(r.field.text), 1)
        ]),
        _: 1
      }, 16)) : (i(), f(z, { key: 1 }, [
        V(h(n.value ? r.field : r.field.text), 1)
      ], 64))
    ], 16));
  }
}), Vn = /* @__PURE__ */ F({
  __name: "DsfrTableRow",
  props: {
    rowData: { default: () => [] },
    rowAttrs: { default: () => ({}) }
  },
  setup(a) {
    return (t, e) => (i(), f("tr", Ie(kt(t.rowAttrs)), [
      S(t.$slots, "default"),
      (i(!0), f(z, null, J(t.rowData, (n, r) => (i(), j(Fn, {
        key: r,
        field: n ?? "",
        "cell-attrs": typeof n == "object" && n !== null && !n.component ? n.cellAttrs : {}
      }, null, 8, ["field", "cell-attrs"]))), 128))
    ], 16));
  }
}), Yf = { class: "caption" }, zf = { key: 1 }, Gf = ["colspan"], Xf = { class: "flex justify-right" }, Uf = { class: "self-center" }, Zf = ["for"], Jf = ["id"], ep = ["value"], tp = {
  class: "flex ml-1",
  "aria-live": "polite",
  "aria-atomic": "true"
}, ap = { class: "self-center fr-m-0" }, np = { class: "flex ml-1" }, rp = /* @__PURE__ */ F({
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
    const e = a, n = t, r = (x) => Array.isArray(x) ? x : x.rowData, l = K(e.currentPage), s = se("resultPerPage"), o = K(e.resultsDisplayed), u = _(
      () => e.rows.length > o.value ? Math.ceil(e.rows.length / o.value) : 1
    ), d = [5, 10, 25, 50, 100], p = () => l.value * o.value - o.value, v = () => l.value * o.value, m = _(() => e.pagination ? e.rows.slice(p(), v()) : e.rows), C = () => {
      l.value = 1, n("update:currentPage");
    }, D = () => {
      l.value > 1 && (l.value -= 1, n("update:currentPage"));
    }, M = () => {
      l.value < u.value && (l.value += 1, n("update:currentPage"));
    }, y = () => {
      l.value = u.value, n("update:currentPage");
    };
    return (x, I) => (i(), f("div", {
      class: R(["fr-table", { "fr-table--no-caption": x.noCaption }])
    }, [
      c("table", null, [
        c("caption", Yf, h(x.title), 1),
        c("thead", null, [
          S(x.$slots, "header", {}, () => [
            x.headers && x.headers.length ? (i(), j(Rn, {
              key: 0,
              headers: x.headers
            }, null, 8, ["headers"])) : g("", !0)
          ], !0)
        ]),
        c("tbody", null, [
          S(x.$slots, "default", {}, void 0, !0),
          x.rows && x.rows.length ? (i(!0), f(z, { key: 0 }, J(m.value, (L, T) => (i(), j(Vn, {
            key: x.rowKey && r(L) ? typeof x.rowKey == "string" ? r(L)[x.headers.indexOf(x.rowKey)].toString() : x.rowKey(r(L)) : T,
            "row-data": r(L),
            "row-attrs": "rowAttrs" in L ? L.rowAttrs : {}
          }, null, 8, ["row-data", "row-attrs"]))), 128)) : g("", !0),
          x.pagination ? (i(), f("tr", zf, [
            c("td", {
              colspan: x.headers.length
            }, [
              c("div", Xf, [
                c("div", Uf, [
                  c("label", { for: q(s) }, "Résultats par page : ", 8, Zf),
                  Le(c("select", {
                    id: q(s),
                    "onUpdate:modelValue": I[0] || (I[0] = (L) => o.value = L),
                    title: "Résultats par page - le nombre résultats est mis à jour dès sélection d’une valeur",
                    onChange: I[1] || (I[1] = (L) => n("update:currentPage"))
                  }, [
                    (i(), f(z, null, J(d, (L, T) => c("option", {
                      key: T,
                      value: L
                    }, h(L), 9, ep)), 64))
                  ], 40, Jf), [
                    [Xt, o.value]
                  ])
                ]),
                c("div", tp, [
                  c("p", ap, " Page " + h(l.value) + " sur " + h(u.value), 1)
                ]),
                c("div", np, [
                  c("button", {
                    class: "fr-icon-arrow-left-s-first-line",
                    onClick: I[2] || (I[2] = (L) => C())
                  }, I[6] || (I[6] = [
                    c("span", { class: "fr-sr-only" }, "Première page du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-left-s-line",
                    onClick: I[3] || (I[3] = (L) => D())
                  }, I[7] || (I[7] = [
                    c("span", { class: "fr-sr-only" }, "Page précédente du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-line",
                    onClick: I[4] || (I[4] = (L) => M())
                  }, I[8] || (I[8] = [
                    c("span", { class: "fr-sr-only" }, "Page suivante du tableau", -1)
                  ])),
                  c("button", {
                    class: "fr-icon-arrow-right-s-last-line",
                    onClick: I[5] || (I[5] = (L) => y())
                  }, I[9] || (I[9] = [
                    c("span", { class: "fr-sr-only" }, "Dernière page du tableau", -1)
                  ]))
                ])
              ])
            ], 8, Gf)
          ])) : g("", !0)
        ])
      ])
    ], 2));
  }
}), lp = /* @__PURE__ */ we(rp, [["__scopeId", "data-v-129bf2b7"]]), sp = ["aria-label"], op = /* @__PURE__ */ F({
  __name: "DsfrTabs",
  props: {
    modelValue: { default: 0 },
    tabListName: {},
    tabTitles: { default: () => [] },
    tabContents: { default: () => [] }
  },
  emits: ["update:modelValue"],
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = K(!1), s = _({
      get: () => n.modelValue,
      set(T) {
        r("update:modelValue", T);
      }
    }), o = K(/* @__PURE__ */ new Map()), u = K(0);
    Re(Dt, (T) => {
      const E = K(!0);
      if (ce(s, (A, P) => {
        E.value = A > P;
      }), [...o.value.values()].includes(T.value))
        return { isVisible: _(() => o.value.get(s.value) === T.value), asc: E };
      const b = u.value++;
      o.value.set(b, T.value);
      const w = _(() => b === s.value);
      return ce(T, () => {
        o.value.set(b, T.value);
      }), Ee(() => {
        o.value.delete(b);
      }), { isVisible: w };
    });
    const d = K(null), p = K(null), v = dr({}), m = (T) => {
      if (v[T])
        return v[T];
      const E = se("tab");
      return v[T] = E, E;
    }, C = async () => {
      const T = s.value === 0 ? n.tabTitles.length - 1 : s.value - 1;
      l.value = !1, s.value = T;
    }, D = async () => {
      const T = s.value === n.tabTitles.length - 1 ? 0 : s.value + 1;
      l.value = !0, s.value = T;
    }, M = async () => {
      s.value = 0;
    }, y = async () => {
      s.value = n.tabTitles.length - 1;
    }, x = K({ "--tabs-height": "100px" }), I = () => {
      var T;
      if (s.value < 0 || !p.value || !p.value.offsetHeight)
        return;
      const E = p.value.offsetHeight, b = (T = d.value) == null ? void 0 : T.querySelectorAll(".fr-tabs__panel")[s.value];
      if (!b || !b.offsetHeight)
        return;
      const w = b.offsetHeight;
      x.value["--tabs-height"] = `${E + w}px`;
    }, L = K(null);
    return ye(() => {
      var T;
      window.ResizeObserver && (L.value = new window.ResizeObserver(() => {
        I();
      })), (T = d.value) == null || T.querySelectorAll(".fr-tabs__panel").forEach((E) => {
        var b;
        E && ((b = L.value) == null || b.observe(E));
      });
    }), Ee(() => {
      var T;
      (T = d.value) == null || T.querySelectorAll(".fr-tabs__panel").forEach((E) => {
        var b;
        E && ((b = L.value) == null || b.unobserve(E));
      });
    }), t({
      renderTabs: I,
      selectFirst: M,
      selectLast: y
    }), (T, E) => (i(), f("div", {
      ref_key: "$el",
      ref: d,
      class: "fr-tabs",
      style: Te(x.value)
    }, [
      c("ul", {
        ref_key: "tablist",
        ref: p,
        class: "fr-tabs__list",
        role: "tablist",
        "aria-label": T.tabListName
      }, [
        S(T.$slots, "tab-items", {}, () => [
          (i(!0), f(z, null, J(T.tabTitles, (b, w) => (i(), j(An, {
            key: w,
            icon: b.icon,
            "panel-id": b.panelId || `${m(w)}-panel`,
            "tab-id": b.tabId || m(w),
            onClick: (A) => s.value = w,
            onNext: E[0] || (E[0] = (A) => D()),
            onPrevious: E[1] || (E[1] = (A) => C()),
            onFirst: E[2] || (E[2] = (A) => M()),
            onLast: E[3] || (E[3] = (A) => y())
          }, {
            default: U(() => [
              V(h(b.title), 1)
            ]),
            _: 2
          }, 1032, ["icon", "panel-id", "tab-id", "onClick"]))), 128))
        ])
      ], 8, sp),
      (i(!0), f(z, null, J(T.tabContents, (b, w) => {
        var A, P, G, k;
        return i(), j($n, {
          key: w,
          "panel-id": ((P = (A = T.tabTitles) == null ? void 0 : A[w]) == null ? void 0 : P.panelId) || `${m(w)}-panel`,
          "tab-id": ((k = (G = T.tabTitles) == null ? void 0 : G[w]) == null ? void 0 : k.tabId) || m(w)
        }, {
          default: U(() => [
            V(h(b), 1)
          ]),
          _: 2
        }, 1032, ["panel-id", "tab-id"]);
      }), 128)),
      S(T.$slots, "default")
    ], 4));
  }
}), ip = /* @__PURE__ */ F({
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
    const t = a, e = _(() => typeof t.link == "string" && t.link.startsWith("http")), n = _(() => t.link ? e.value ? "a" : "RouterLink" : t.disabled && t.tagName === "p" || t.selectable ? "button" : t.tagName), r = _(() => ({ [e.value ? "href" : "to"]: t.link })), l = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), s = _(() => t.small ? 0.65 : 0.9), o = _(
      () => typeof t.icon == "string" ? { scale: s.value, name: t.icon } : { scale: s.value, ...t.icon }
    );
    return (u, d) => (i(), j(ve(n.value), Q({
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
        t.icon && !l.value ? (i(), j(be, Q({
          key: 0,
          label: u.iconOnly ? u.label : void 0,
          class: { "fr-mr-1v": !u.iconOnly }
        }, o.value), null, 16, ["label", "class"])) : g("", !0),
        u.iconOnly ? g("", !0) : (i(), f(z, { key: 1 }, [
          V(h(u.label), 1)
        ], 64)),
        S(u.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 16, ["disabled", "class", "aria-pressed"]));
  }
}), oa = /* @__PURE__ */ we(ip, [["__scopeId", "data-v-0cada598"]]), up = { class: "fr-tags-group" }, dp = /* @__PURE__ */ F({
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
    return (l, s) => (i(), f("ul", up, [
      (i(!0), f(z, null, J(l.tags, ({ icon: o, label: u, ...d }, p) => {
        var v;
        return i(), f("li", { key: p }, [
          ee(oa, Q({ ref_for: !0 }, d, {
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
}), cp = { class: "fr-tile__body" }, fp = { class: "fr-tile__content" }, pp = ["download", "href"], mp = {
  key: 0,
  class: "fr-tile__desc"
}, hp = {
  key: 1,
  class: "fr-tile__detail"
}, vp = {
  key: 2,
  class: "fr-tile__start"
}, gp = { class: "fr-tile__header" }, bp = {
  key: 0,
  class: "fr-tile__pictogram"
}, yp = ["src"], kp = ["href"], wp = ["href"], _p = ["href"], xp = /* @__PURE__ */ F({
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
        c("div", cp, [
          c("div", fp, [
            (i(), j(ve(r.titleTag), { class: "fr-tile__title" }, {
              default: U(() => [
                n.value ? (i(), f("a", {
                  key: 0,
                  class: "fr-tile__link",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  download: r.download,
                  href: r.disabled ? "" : r.to
                }, h(r.title), 9, pp)) : g("", !0),
                n.value ? g("", !0) : (i(), j(s, {
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
            r.description ? (i(), f("p", mp, h(r.description), 1)) : g("", !0),
            r.details ? (i(), f("p", hp, h(r.details), 1)) : g("", !0),
            r.$slots["start-details"] ? (i(), f("div", vp, [
              S(r.$slots, "start-details", {}, void 0, !0)
            ])) : g("", !0)
          ])
        ]),
        c("div", gp, [
          S(r.$slots, "header", {}, void 0, !0),
          r.imgSrc || r.svgPath ? (i(), f("div", bp, [
            r.imgSrc ? (i(), f("img", {
              key: 0,
              src: r.imgSrc,
              class: "fr-artwork",
              alt: ""
            }, null, 8, yp)) : (i(), f("svg", Q({
              key: 1,
              "aria-hidden": "true",
              class: "fr-artwork"
            }, { ...e, ...r.svgAttrs }), [
              c("use", {
                class: "fr-artwork-decorative",
                href: `${r.svgPath}#artwork-decorative`
              }, null, 8, kp),
              c("use", {
                class: "fr-artwork-minor",
                href: `${r.svgPath}#artwork-minor`
              }, null, 8, wp),
              c("use", {
                class: "fr-artwork-major",
                href: `${r.svgPath}#artwork-major`
              }, null, 8, _p)
            ], 16))
          ])) : g("", !0)
        ])
      ], 2);
    };
  }
}), Nn = /* @__PURE__ */ we(xp, [["__scopeId", "data-v-f4d836a2"]]), Dp = { class: "fr-grid-row fr-grid-row--gutters" }, Tp = /* @__PURE__ */ F({
  __name: "DsfrTiles",
  props: {
    tiles: { default: () => [] },
    horizontal: { type: Boolean }
  },
  setup(a) {
    return (t, e) => (i(), f("div", Dp, [
      (i(!0), f(z, null, J(t.tiles, (n, r) => (i(), f("div", {
        key: r,
        class: R({
          [n.containerClass ?? "no-class"]: n.containerClass,
          "fr-col-6 fr-col-md-4 fr-col-lg-3": !n.containerClass && !t.horizontal,
          "fr-col-12": t.horizontal
        })
      }, [
        ee(Nn, Q({
          horizontal: t.horizontal,
          ref_for: !0
        }, n), null, 16, ["horizontal"])
      ], 2))), 128))
    ]));
  }
}), Ip = ["id", "disabled", "aria-disabled", "checked", "data-testid", "aria-describedby", "name"], Cp = ["id", "for", "data-fr-checked-label", "data-fr-unchecked-label"], Ep = ["id"], Pp = /* @__PURE__ */ F({
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
    const t = a, e = _(() => `${t.inputId}-hint-text`);
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
      }, null, 40, Ip),
      c("label", {
        id: e.value,
        class: "fr-toggle__label",
        for: n.inputId,
        "data-fr-checked-label": n.noText ? void 0 : n.activeText,
        "data-fr-unchecked-label": n.noText ? void 0 : n.inactiveText,
        style: { "--toggle-status-width": "3.55208125rem" }
      }, h(n.label), 9, Cp),
      n.hint ? (i(), f("p", {
        key: 0,
        id: `${n.inputId}-hint-text`,
        class: "fr-hint-text"
      }, h(n.hint), 9, Ep)) : g("", !0)
    ], 2));
  }
}), Mp = ["id"], Lp = /* @__PURE__ */ F({
  __name: "DsfrTooltip",
  props: {
    content: {},
    onHover: { type: Boolean },
    id: { default: () => se("tooltip") }
  },
  setup(a) {
    const t = a, e = K(!1), n = K(null), r = K(null), l = K("0px"), s = K("0px"), o = K("0px"), u = K(!1), d = K(0);
    async function p() {
      var I, L, T, E, b, w, A, P;
      if (typeof document > "u" || !e.value)
        return;
      await new Promise((Ce) => setTimeout(Ce, 100));
      const G = (I = n.value) == null ? void 0 : I.getBoundingClientRect().top, k = (L = n.value) == null ? void 0 : L.offsetHeight, B = (T = n.value) == null ? void 0 : T.offsetWidth, H = (E = n.value) == null ? void 0 : E.getBoundingClientRect().left, $ = (b = r.value) == null ? void 0 : b.offsetHeight, O = (w = r.value) == null ? void 0 : w.offsetWidth, Z = (A = r.value) == null ? void 0 : A.offsetTop, Y = (P = r.value) == null ? void 0 : P.offsetLeft, re = !(G - $ < 0) && G + k + $ >= document.documentElement.offsetHeight;
      u.value = re;
      const ne = H + B >= document.documentElement.offsetWidth, De = H + B / 2 - O / 2 <= 0;
      s.value = re ? `${G - Z - $ + 8}px` : `${G - Z + k - 8}px`, d.value = 1, l.value = ne ? `${H - Y + B - O - 4}px` : De ? `${H - Y + 4}px` : `${H - Y + B / 2 - O / 2}px`, o.value = ne ? `${O / 2 - B / 2 + 4}px` : De ? `${-(O / 2) + B / 2 - 4}px` : "0px";
    }
    ce(e, p, { immediate: !0 }), ye(() => {
      window.addEventListener("scroll", p);
    }), Ee(() => {
      window.removeEventListener("scroll", p);
    });
    const v = _(() => `transform: translate(${l.value}, ${s.value}); --arrow-x: ${o.value}; opacity: ${d.value};'`), m = _(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": u.value,
      "fr-placement--bottom": !u.value
    })), C = (I) => {
      var L, T;
      e.value && (I.target === n.value || (L = n.value) != null && L.contains(I.target) || I.target === r.value || (T = r.value) != null && T.contains(I.target) || (e.value = !1));
    }, D = (I) => {
      I.key === "Escape" && (e.value = !1);
    }, M = (I) => {
      var L;
      t.onHover && (I.target === n.value || (L = n.value) != null && L.contains(I.target)) && (e.value = !0, globalThis.__vueDsfr__lastTooltipShow.value = !1);
    }, y = () => {
      t.onHover && (e.value = !1);
    }, x = () => {
      t.onHover || (e.value = !0, globalThis.__vueDsfr__lastTooltipShow = e);
    };
    return ye(() => {
      document.documentElement.addEventListener("click", C), document.documentElement.addEventListener("keydown", D), document.documentElement.addEventListener("mouseover", M);
    }), Ee(() => {
      document.documentElement.removeEventListener("click", C), document.documentElement.removeEventListener("keydown", D), document.documentElement.removeEventListener("mouseover", M);
    }), (I, L) => (i(), f(z, null, [
      (i(), j(ve(I.onHover ? "a" : "button"), Q(I.$attrs, {
        id: `link-${I.id}`,
        ref_key: "source",
        ref: n,
        class: I.onHover ? "fr-link" : "fr-btn  fr-btn--tooltip",
        "aria-describedby": I.id,
        href: I.onHover ? "#" : void 0,
        onClick: L[0] || (L[0] = (T) => x()),
        onMouseleave: L[1] || (L[1] = (T) => y()),
        onFocus: L[2] || (L[2] = (T) => M(T)),
        onBlur: L[3] || (L[3] = (T) => y())
      }), {
        default: U(() => [
          S(I.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["id", "class", "aria-describedby", "href"])),
      c("span", {
        id: I.id,
        ref_key: "tooltip",
        ref: r,
        class: R(["fr-tooltip fr-placement", m.value]),
        style: Te(v.value),
        role: "tooltip",
        "aria-hidden": "true"
      }, h(I.content), 15, Mp)
    ], 64));
  }
}), Bp = /* @__PURE__ */ we(Lp, [["__scopeId", "data-v-ed1e8874"]]), Sp = { class: "fr-transcription" }, $p = ["aria-expanded", "aria-controls"], Ap = ["id"], Op = ["id", "aria-labelledby"], Rp = { class: "fr-container fr-container--fluid fr-container-md" }, Fp = { class: "fr-grid-row fr-grid-row--center" }, Vp = { class: "fr-col-12 fr-col-md-10 fr-col-lg-8" }, Np = { class: "fr-modal__body" }, qp = { class: "fr-modal__header" }, jp = ["aria-controls"], Hp = { class: "fr-modal__content" }, Wp = ["id"], Kp = { class: "fr-transcription__footer" }, Qp = { class: "fr-transcription__actions-group" }, Yp = ["aria-controls"], qn = /* @__PURE__ */ F({
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
    } = Se(), o = K(!1), u = K(!1), d = _(() => `fr-transcription__modal-${t.id}`), p = _(() => `fr-transcription__collapse-${t.id}`);
    return ce(u, (v, m) => {
      v !== m && l(v);
    }), (v, m) => (i(), f("div", Sp, [
      c("button", {
        class: "fr-transcription__btn",
        "aria-expanded": u.value,
        "aria-controls": p.value,
        onClick: m[0] || (m[0] = (C) => u.value = !u.value)
      }, " Transcription ", 8, $p),
      c("div", {
        id: p.value,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse", { "fr-collapse--expanded": q(r), "fr-collapsing": q(n) }]),
        onTransitionend: m[2] || (m[2] = (C) => q(s)(u.value))
      }, [
        c("dialog", {
          id: d.value,
          class: "fr-modal",
          role: "dialog",
          "aria-labelledby": `${d.value}-title`
        }, [
          c("div", Rp, [
            c("div", Fp, [
              c("div", Vp, [
                c("div", Np, [
                  c("div", qp, [
                    c("button", {
                      class: "fr-btn--close fr-btn",
                      "aria-controls": d.value,
                      title: "Fermer"
                    }, " Fermer ", 8, jp)
                  ]),
                  c("div", Hp, [
                    c("h1", {
                      id: `${d.value}-title`,
                      class: "fr-modal__title"
                    }, h(v.title), 9, Wp),
                    V(" " + h(v.content), 1)
                  ]),
                  c("div", Kp, [
                    c("div", Qp, [
                      c("button", {
                        class: "fr-btn fr-btn--fullscreen",
                        "aria-controls": d.value,
                        "data-fr-opened": "false",
                        title: "",
                        onClick: m[1] || (m[1] = (C) => o.value = !0)
                      }, " Agrandir ", 8, Yp)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ], 8, Op)
      ], 42, Ap),
      (i(), j(cr, { to: "body" }, [
        ee(xn, {
          title: v.title,
          opened: o.value,
          onClose: m[3] || (m[3] = (C) => o.value = !1)
        }, {
          default: U(() => [
            S(v.$slots, "default", {}, () => [
              V(h(v.content), 1)
            ])
          ]),
          _: 3
        }, 8, ["title", "opened"])
      ]))
    ]));
  }
}), zp = ["src"], Gp = { class: "fr-content-media__caption" }, Xp = /* @__PURE__ */ F({
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
          }, null, 8, zp)
        ], 2),
        c("div", Gp, h(t.legend), 1)
      ], 2),
      ee(qn, {
        title: t.transcriptionTitle,
        content: t.transcriptionContent
      }, null, 8, ["title", "content"])
    ], 64));
  }
}), Up = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DsfrAccordion: Dl,
  DsfrAccordionsGroup: Il,
  DsfrAlert: Pl,
  DsfrBackToTop: Ml,
  DsfrBadge: dn,
  DsfrBreadcrumb: Rl,
  DsfrButton: je,
  DsfrButtonGroup: Tt,
  DsfrCallout: Kl,
  DsfrCard: ls,
  DsfrCardDetail: Nt,
  DsfrCheckbox: It,
  DsfrCheckboxSet: gs,
  DsfrConsent: ws,
  DsfrDataTable: no,
  DsfrErrorPage: fo,
  DsfrFieldset: cn,
  DsfrFileDownload: fn,
  DsfrFileDownloadList: wo,
  DsfrFileUpload: Eo,
  DsfrFollow: Go,
  DsfrFooter: Ti,
  DsfrFooterLink: hn,
  DsfrFooterLinkList: Pi,
  DsfrFooterPartners: vn,
  DsfrFranceConnect: Bi,
  DsfrHeader: bu,
  DsfrHeaderMenuLink: sa,
  DsfrHeaderMenuLinks: qt,
  DsfrHighlight: yu,
  DsfrInput: Ct,
  DsfrInputGroup: Tu,
  DsfrLanguageSelector: rt,
  DsfrLogo: nt,
  DsfrModal: xn,
  DsfrMultiselect: Cd,
  DsfrNavigation: Gd,
  DsfrNavigationItem: Dn,
  DsfrNavigationMegaMenu: In,
  DsfrNavigationMegaMenuCategory: Tn,
  DsfrNavigationMenu: En,
  DsfrNavigationMenuItem: Cn,
  DsfrNavigationMenuLink: Et,
  DsfrNewsLetter: pn,
  DsfrNotice: ec,
  DsfrPagination: la,
  DsfrPicture: lc,
  DsfrQuote: pc,
  DsfrRadioButton: Pn,
  DsfrRadioButtonSet: Mc,
  DsfrRange: qc,
  DsfrSearchBar: lt,
  DsfrSegmented: Mn,
  DsfrSegmentedSet: Uc,
  DsfrSelect: lf,
  DsfrShare: mf,
  DsfrSideMenu: _f,
  DsfrSideMenuButton: Ln,
  DsfrSideMenuLink: xf,
  DsfrSideMenuList: Sn,
  DsfrSideMenuListItem: Bn,
  DsfrSkipLinks: Ef,
  DsfrSocialNetworks: mn,
  DsfrStepper: Af,
  DsfrSummary: Nf,
  DsfrTabContent: $n,
  DsfrTabItem: An,
  DsfrTable: lp,
  DsfrTableCell: Fn,
  DsfrTableHeader: On,
  DsfrTableHeaders: Rn,
  DsfrTableRow: Vn,
  DsfrTabs: op,
  DsfrTag: oa,
  DsfrTags: dp,
  DsfrTile: Nn,
  DsfrTiles: Tp,
  DsfrToggleSwitch: Pp,
  DsfrTooltip: Bp,
  DsfrTranscription: qn,
  DsfrVideo: Xp,
  VIcon: be,
  registerAccordionKey: na,
  registerNavigationLinkKey: ra,
  registerTabKey: Dt
}, Symbol.toStringTag, { value: "Module" })), Zp = {
  install: (a, { components: t } = {}) => {
    Object.entries(Up).forEach(([e, n]) => {
      (t === void 0 || t === "all" || t.map(({ name: r }) => r).includes(e)) && a.component(e, n);
    }), a.component("VIcon", be);
  }
}, jn = 6048e5, Jp = 864e5, em = 6e4, tm = 36e5, am = 1e3, Fa = Symbol.for("constructDateFrom");
function ke(a, t) {
  return typeof a == "function" ? a(t) : a && typeof a == "object" && Fa in a ? a[Fa](t) : a instanceof Date ? new a.constructor(t) : new Date(t);
}
function ge(a, t) {
  return ke(t || a, a);
}
function Hn(a, t, e) {
  const n = ge(a, e == null ? void 0 : e.in);
  return isNaN(t) ? ke((e == null ? void 0 : e.in) || a, NaN) : (t && n.setDate(n.getDate() + t), n);
}
let nm = {};
function ze() {
  return nm;
}
function Fe(a, t) {
  var o, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.weekStartsOn) ?? e.weekStartsOn ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.weekStartsOn) ?? 0, r = ge(a, t == null ? void 0 : t.in), l = r.getDay(), s = (l < n ? 7 : 0) + l - n;
  return r.setDate(r.getDate() - s), r.setHours(0, 0, 0, 0), r;
}
function Ye(a, t) {
  return Fe(a, { ...t, weekStartsOn: 1 });
}
function Wn(a, t) {
  const e = ge(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ke(e, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const l = Ye(r), s = ke(e, 0);
  s.setFullYear(n, 0, 4), s.setHours(0, 0, 0, 0);
  const o = Ye(s);
  return e.getTime() >= l.getTime() ? n + 1 : e.getTime() >= o.getTime() ? n : n - 1;
}
function gt(a) {
  const t = ge(a), e = new Date(
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
function rm(a, ...t) {
  const e = ke.bind(
    null,
    t.find((n) => typeof n == "object")
  );
  return t.map(e);
}
function Va(a, t) {
  const e = ge(a, t == null ? void 0 : t.in);
  return e.setHours(0, 0, 0, 0), e;
}
function lm(a, t, e) {
  const [n, r] = rm(
    e == null ? void 0 : e.in,
    a,
    t
  ), l = Va(n), s = Va(r), o = +l - gt(l), u = +s - gt(s);
  return Math.round((o - u) / Jp);
}
function sm(a, t) {
  const e = Wn(a, t), n = ke(a, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Ye(n);
}
function om(a) {
  return a instanceof Date || typeof a == "object" && Object.prototype.toString.call(a) === "[object Date]";
}
function im(a) {
  return !(!om(a) && typeof a != "number" || isNaN(+ge(a)));
}
function um(a, t) {
  const e = ge(a, t == null ? void 0 : t.in);
  return e.setFullYear(e.getFullYear(), 0, 1), e.setHours(0, 0, 0, 0), e;
}
const dm = {
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
}, cm = (a, t, e) => {
  let n;
  const r = dm[a];
  return typeof r == "string" ? n = r : t === 1 ? n = r.one : n = r.other.replace("{{count}}", t.toString()), e != null && e.addSuffix ? e.comparison && e.comparison > 0 ? "in " + n : n + " ago" : n;
};
function Bt(a) {
  return (t = {}) => {
    const e = t.width ? String(t.width) : a.defaultWidth;
    return a.formats[e] || a.formats[a.defaultWidth];
  };
}
const fm = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, pm = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, mm = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, hm = {
  date: Bt({
    formats: fm,
    defaultWidth: "full"
  }),
  time: Bt({
    formats: pm,
    defaultWidth: "full"
  }),
  dateTime: Bt({
    formats: mm,
    defaultWidth: "full"
  })
}, vm = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, gm = (a, t, e, n) => vm[a];
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
const bm = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, ym = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, km = {
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
}, _m = {
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
}, xm = {
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
}, Dm = (a, t) => {
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
}, Tm = {
  ordinalNumber: Dm,
  era: Ze({
    values: bm,
    defaultWidth: "wide"
  }),
  quarter: Ze({
    values: ym,
    defaultWidth: "wide",
    argumentCallback: (a) => a - 1
  }),
  month: Ze({
    values: km,
    defaultWidth: "wide"
  }),
  day: Ze({
    values: wm,
    defaultWidth: "wide"
  }),
  dayPeriod: Ze({
    values: _m,
    defaultWidth: "wide",
    formattingValues: xm,
    defaultFormattingWidth: "wide"
  })
};
function Je(a) {
  return (t, e = {}) => {
    const n = e.width, r = n && a.matchPatterns[n] || a.matchPatterns[a.defaultMatchWidth], l = t.match(r);
    if (!l)
      return null;
    const s = l[0], o = n && a.parsePatterns[n] || a.parsePatterns[a.defaultParseWidth], u = Array.isArray(o) ? Cm(o, (v) => v.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Im(o, (v) => v.test(s))
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
function Im(a, t) {
  for (const e in a)
    if (Object.prototype.hasOwnProperty.call(a, e) && t(a[e]))
      return e;
}
function Cm(a, t) {
  for (let e = 0; e < a.length; e++)
    if (t(a[e]))
      return e;
}
function Em(a) {
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
const Pm = /^(\d+)(th|st|nd|rd)?/i, Mm = /\d+/i, Lm = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Bm = {
  any: [/^b/i, /^(a|c)/i]
}, Sm = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, $m = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Am = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Om = {
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
}, Rm = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Fm = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Vm = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Nm = {
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
}, qm = {
  ordinalNumber: Em({
    matchPattern: Pm,
    parsePattern: Mm,
    valueCallback: (a) => parseInt(a, 10)
  }),
  era: Je({
    matchPatterns: Lm,
    defaultMatchWidth: "wide",
    parsePatterns: Bm,
    defaultParseWidth: "any"
  }),
  quarter: Je({
    matchPatterns: Sm,
    defaultMatchWidth: "wide",
    parsePatterns: $m,
    defaultParseWidth: "any",
    valueCallback: (a) => a + 1
  }),
  month: Je({
    matchPatterns: Am,
    defaultMatchWidth: "wide",
    parsePatterns: Om,
    defaultParseWidth: "any"
  }),
  day: Je({
    matchPatterns: Rm,
    defaultMatchWidth: "wide",
    parsePatterns: Fm,
    defaultParseWidth: "any"
  }),
  dayPeriod: Je({
    matchPatterns: Vm,
    defaultMatchWidth: "any",
    parsePatterns: Nm,
    defaultParseWidth: "any"
  })
}, Kn = {
  code: "en-US",
  formatDistance: cm,
  formatLong: hm,
  formatRelative: gm,
  localize: Tm,
  match: qm,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function jm(a, t) {
  const e = ge(a, t == null ? void 0 : t.in);
  return lm(e, um(e)) + 1;
}
function Qn(a, t) {
  const e = ge(a, t == null ? void 0 : t.in), n = +Ye(e) - +sm(e);
  return Math.round(n / jn) + 1;
}
function ia(a, t) {
  var p, v, m, C;
  const e = ge(a, t == null ? void 0 : t.in), n = e.getFullYear(), r = ze(), l = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((v = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : v.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((C = (m = r.locale) == null ? void 0 : m.options) == null ? void 0 : C.firstWeekContainsDate) ?? 1, s = ke((t == null ? void 0 : t.in) || a, 0);
  s.setFullYear(n + 1, 0, l), s.setHours(0, 0, 0, 0);
  const o = Fe(s, t), u = ke((t == null ? void 0 : t.in) || a, 0);
  u.setFullYear(n, 0, l), u.setHours(0, 0, 0, 0);
  const d = Fe(u, t);
  return +e >= +o ? n + 1 : +e >= +d ? n : n - 1;
}
function Hm(a, t) {
  var o, u, d, p;
  const e = ze(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((u = (o = t == null ? void 0 : t.locale) == null ? void 0 : o.options) == null ? void 0 : u.firstWeekContainsDate) ?? e.firstWeekContainsDate ?? ((p = (d = e.locale) == null ? void 0 : d.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, r = ia(a, t), l = ke((t == null ? void 0 : t.in) || a, 0);
  return l.setFullYear(r, 0, n), l.setHours(0, 0, 0, 0), Fe(l, t);
}
function Yn(a, t) {
  const e = ge(a, t == null ? void 0 : t.in), n = +Fe(e, t) - +Hm(e, t);
  return Math.round(n / jn) + 1;
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
}, Na = {
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
    const e = Wn(a);
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
    const r = Yn(a, n);
    return t === "wo" ? e.ordinalNumber(r, { unit: "week" }) : ie(r, t.length);
  },
  // ISO week of year
  I: function(a, t, e) {
    const n = Qn(a);
    return t === "Io" ? e.ordinalNumber(n, { unit: "week" }) : ie(n, t.length);
  },
  // Day of the month
  d: function(a, t, e) {
    return t === "do" ? e.ordinalNumber(a.getDate(), { unit: "date" }) : Oe.d(a, t);
  },
  // Day of year
  D: function(a, t, e) {
    const n = jm(a);
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
        return ja(n);
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
        return ja(n);
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
        return "GMT" + qa(n, ":");
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
        return "GMT" + qa(n, ":");
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
function qa(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = Math.trunc(n / 60), l = n % 60;
  return l === 0 ? e + String(r) : e + String(r) + t + ie(l, 2);
}
function ja(a, t) {
  return a % 60 === 0 ? (a > 0 ? "-" : "+") + ie(Math.abs(a) / 60, 2) : Ve(a, t);
}
function Ve(a, t = "") {
  const e = a > 0 ? "-" : "+", n = Math.abs(a), r = ie(Math.trunc(n / 60), 2), l = ie(n % 60, 2);
  return e + r + t + l;
}
const Ha = (a, t) => {
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
}, zn = (a, t) => {
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
}, Wm = (a, t) => {
  const e = a.match(/(P+)(p+)?/) || [], n = e[1], r = e[2];
  if (!r)
    return Ha(a, t);
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
  return l.replace("{{date}}", Ha(n, t)).replace("{{time}}", zn(r, t));
}, Wt = {
  p: zn,
  P: Wm
}, Km = /^D+$/, Qm = /^Y+$/, Ym = ["D", "DD", "YY", "YYYY"];
function Gn(a) {
  return Km.test(a);
}
function Xn(a) {
  return Qm.test(a);
}
function Kt(a, t, e) {
  const n = zm(a, t, e);
  if (console.warn(n), Ym.includes(a)) throw new RangeError(n);
}
function zm(a, t, e) {
  const n = a[0] === "Y" ? "years" : "days of the month";
  return `Use \`${a.toLowerCase()}\` instead of \`${a}\` (in \`${t}\`) for formatting ${n} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Gm = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Xm = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Um = /^'([^]*?)'?$/, Zm = /''/g, Jm = /[a-zA-Z]/;
function Wa(a, t, e) {
  var p, v, m, C;
  const n = ze(), r = n.locale ?? Kn, l = n.firstWeekContainsDate ?? ((v = (p = n.locale) == null ? void 0 : p.options) == null ? void 0 : v.firstWeekContainsDate) ?? 1, s = n.weekStartsOn ?? ((C = (m = n.locale) == null ? void 0 : m.options) == null ? void 0 : C.weekStartsOn) ?? 0, o = ge(a, e == null ? void 0 : e.in);
  if (!im(o))
    throw new RangeError("Invalid time value");
  let u = t.match(Xm).map((D) => {
    const M = D[0];
    if (M === "p" || M === "P") {
      const y = Wt[M];
      return y(D, r.formatLong);
    }
    return D;
  }).join("").match(Gm).map((D) => {
    if (D === "''")
      return { isToken: !1, value: "'" };
    const M = D[0];
    if (M === "'")
      return { isToken: !1, value: eh(D) };
    if (Na[M])
      return { isToken: !0, value: D };
    if (M.match(Jm))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + M + "`"
      );
    return { isToken: !1, value: D };
  });
  r.localize.preprocessor && (u = r.localize.preprocessor(o, u));
  const d = {
    firstWeekContainsDate: l,
    weekStartsOn: s,
    locale: r
  };
  return u.map((D) => {
    if (!D.isToken) return D.value;
    const M = D.value;
    (Xn(M) || Gn(M)) && Kt(M, t, String(a));
    const y = Na[M[0]];
    return y(o, M, r.localize, d);
  }).join("");
}
function eh(a) {
  const t = a.match(Um);
  return t ? t[1].replace(Zm, "'") : a;
}
function th() {
  return Object.assign({}, ze());
}
function ah(a, t) {
  const e = ge(a, t == null ? void 0 : t.in).getDay();
  return e === 0 ? 7 : e;
}
function nh(a, t) {
  const e = rh(t) ? new t(0) : ke(t, 0);
  return e.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), e.setHours(
    a.getHours(),
    a.getMinutes(),
    a.getSeconds(),
    a.getMilliseconds()
  ), e;
}
function rh(a) {
  var t;
  return typeof a == "function" && ((t = a.prototype) == null ? void 0 : t.constructor) === a;
}
const lh = 10;
class Un {
  constructor() {
    N(this, "subPriority", 0);
  }
  validate(t, e) {
    return !0;
  }
}
class sh extends Un {
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
class oh extends Un {
  constructor(e, n) {
    super();
    N(this, "priority", lh);
    N(this, "subPriority", -1);
    this.context = e || ((r) => ke(n, r));
  }
  set(e, n) {
    return n.timestampIsSet ? e : ke(e, nh(e, this.context));
  }
}
class oe {
  run(t, e, n, r) {
    const l = this.parse(t, e, n, r);
    return l ? {
      setter: new sh(
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
class ih extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 140);
    N(this, "incompatibleTokens", ["R", "u", "t", "T"]);
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
function he(a, t) {
  return a && {
    value: t(a.value),
    rest: a.rest
  };
}
function de(a, t) {
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
    value: n * (r * tm + l * em + s * am),
    rest: t.slice(e[0].length)
  };
}
function Zn(a) {
  return de(me.anyDigitsSigned, a);
}
function fe(a, t) {
  switch (a) {
    case 1:
      return de(me.singleDigit, t);
    case 2:
      return de(me.twoDigits, t);
    case 3:
      return de(me.threeDigits, t);
    case 4:
      return de(me.fourDigits, t);
    default:
      return de(new RegExp("^\\d{1," + a + "}"), t);
  }
}
function bt(a, t) {
  switch (a) {
    case 1:
      return de(me.singleDigitSigned, t);
    case 2:
      return de(me.twoDigitsSigned, t);
    case 3:
      return de(me.threeDigitsSigned, t);
    case 4:
      return de(me.fourDigitsSigned, t);
    default:
      return de(new RegExp("^-?\\d{1," + a + "}"), t);
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
function Jn(a, t) {
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
function er(a) {
  return a % 400 === 0 || a % 4 === 0 && a % 100 !== 0;
}
class uh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 130);
    N(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, n, r) {
    const l = (s) => ({
      year: s,
      isTwoDigitYear: n === "yy"
    });
    switch (n) {
      case "y":
        return he(fe(4, e), l);
      case "yo":
        return he(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return he(fe(n.length, e), l);
    }
  }
  validate(e, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(e, n, r) {
    const l = e.getFullYear();
    if (r.isTwoDigitYear) {
      const o = Jn(
        r.year,
        l
      );
      return e.setFullYear(o, 0, 1), e.setHours(0, 0, 0, 0), e;
    }
    const s = !("era" in n) || n.era === 1 ? r.year : 1 - r.year;
    return e.setFullYear(s, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class dh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 130);
    N(this, "incompatibleTokens", [
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
        return he(fe(4, e), l);
      case "Yo":
        return he(
          r.ordinalNumber(e, {
            unit: "year"
          }),
          l
        );
      default:
        return he(fe(n.length, e), l);
    }
  }
  validate(e, n) {
    return n.isTwoDigitYear || n.year > 0;
  }
  set(e, n, r, l) {
    const s = ia(e, l);
    if (r.isTwoDigitYear) {
      const u = Jn(
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
class ch extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 130);
    N(this, "incompatibleTokens", [
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
    return bt(n === "R" ? 4 : n.length, e);
  }
  set(e, n, r) {
    const l = ke(e, 0);
    return l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0), Ye(l);
  }
}
class fh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 130);
    N(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(e, n) {
    return bt(n === "u" ? 4 : n.length, e);
  }
  set(e, n, r) {
    return e.setFullYear(r, 0, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class ph extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 120);
    N(this, "incompatibleTokens", [
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
        return fe(n.length, e);
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
class mh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 120);
    N(this, "incompatibleTokens", [
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
        return fe(n.length, e);
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
class hh extends oe {
  constructor() {
    super(...arguments);
    N(this, "incompatibleTokens", [
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
    N(this, "priority", 110);
  }
  parse(e, n, r) {
    const l = (s) => s - 1;
    switch (n) {
      case "M":
        return he(
          de(me.month, e),
          l
        );
      case "MM":
        return he(fe(2, e), l);
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
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
  }
}
class vh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 110);
    N(this, "incompatibleTokens", [
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
        return he(
          de(me.month, e),
          l
        );
      case "LL":
        return he(fe(2, e), l);
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
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.setMonth(r, 1), e.setHours(0, 0, 0, 0), e;
  }
}
function gh(a, t, e) {
  const n = ge(a, e == null ? void 0 : e.in), r = Yn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), ge(n, e == null ? void 0 : e.in);
}
class bh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 100);
    N(this, "incompatibleTokens", [
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
        return de(me.week, e);
      case "wo":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return fe(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 53;
  }
  set(e, n, r, l) {
    return Fe(gh(e, r, l), l);
  }
}
function yh(a, t, e) {
  const n = ge(a, e == null ? void 0 : e.in), r = Qn(n, e) - t;
  return n.setDate(n.getDate() - r * 7), n;
}
class kh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 100);
    N(this, "incompatibleTokens", [
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
        return de(me.week, e);
      case "Io":
        return r.ordinalNumber(e, { unit: "week" });
      default:
        return fe(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 1 && n <= 53;
  }
  set(e, n, r) {
    return Ye(yh(e, r));
  }
}
const wh = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], _h = [
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
class xh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "subPriority", 1);
    N(this, "incompatibleTokens", [
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
        return de(me.date, e);
      case "do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return fe(n.length, e);
    }
  }
  validate(e, n) {
    const r = e.getFullYear(), l = er(r), s = e.getMonth();
    return l ? n >= 1 && n <= _h[s] : n >= 1 && n <= wh[s];
  }
  set(e, n, r) {
    return e.setDate(r), e.setHours(0, 0, 0, 0), e;
  }
}
class Dh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "subpriority", 1);
    N(this, "incompatibleTokens", [
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
        return de(me.dayOfYear, e);
      case "Do":
        return r.ordinalNumber(e, { unit: "date" });
      default:
        return fe(n.length, e);
    }
  }
  validate(e, n) {
    const r = e.getFullYear();
    return er(r) ? n >= 1 && n <= 366 : n >= 1 && n <= 365;
  }
  set(e, n, r) {
    return e.setMonth(0, r), e.setHours(0, 0, 0, 0), e;
  }
}
function da(a, t, e) {
  var v, m, C, D;
  const n = ze(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((m = (v = e == null ? void 0 : e.locale) == null ? void 0 : v.options) == null ? void 0 : m.weekStartsOn) ?? n.weekStartsOn ?? ((D = (C = n.locale) == null ? void 0 : C.options) == null ? void 0 : D.weekStartsOn) ?? 0, l = ge(a, e == null ? void 0 : e.in), s = l.getDay(), u = (t % 7 + 7) % 7, d = 7 - r, p = t < 0 || t > 6 ? t - (s + d) % 7 : (u + d) % 7 - (s + d) % 7;
  return Hn(l, p, e);
}
class Th extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
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
class Ih extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "incompatibleTokens", [
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
        return he(fe(n.length, e), s);
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
  validate(e, n) {
    return n >= 0 && n <= 6;
  }
  set(e, n, r, l) {
    return e = da(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
class Ch extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "incompatibleTokens", [
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
        return he(fe(n.length, e), s);
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
  validate(e, n) {
    return n >= 0 && n <= 6;
  }
  set(e, n, r, l) {
    return e = da(e, r, l), e.setHours(0, 0, 0, 0), e;
  }
}
function Eh(a, t, e) {
  const n = ge(a, e == null ? void 0 : e.in), r = ah(n, e), l = t - r;
  return Hn(n, l, e);
}
class Ph extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 90);
    N(this, "incompatibleTokens", [
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
        return fe(n.length, e);
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
  validate(e, n) {
    return n >= 1 && n <= 7;
  }
  set(e, n, r) {
    return e = Eh(e, r), e.setHours(0, 0, 0, 0), e;
  }
}
class Mh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 80);
    N(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
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
    N(this, "priority", 80);
    N(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
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
class Bh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 80);
    N(this, "incompatibleTokens", ["a", "b", "t", "T"]);
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
class Sh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "h":
        return de(me.hour12h, e);
      case "ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return fe(n.length, e);
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
class $h extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "H":
        return de(me.hour23h, e);
      case "Ho":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return fe(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 23;
  }
  set(e, n, r) {
    return e.setHours(r, 0, 0, 0), e;
  }
}
class Ah extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "K":
        return de(me.hour11h, e);
      case "Ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return fe(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 11;
  }
  set(e, n, r) {
    return e.getHours() >= 12 && r < 12 ? e.setHours(r + 12, 0, 0, 0) : e.setHours(r, 0, 0, 0), e;
  }
}
class Oh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 70);
    N(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "k":
        return de(me.hour24h, e);
      case "ko":
        return r.ordinalNumber(e, { unit: "hour" });
      default:
        return fe(n.length, e);
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
class Rh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 60);
    N(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "m":
        return de(me.minute, e);
      case "mo":
        return r.ordinalNumber(e, { unit: "minute" });
      default:
        return fe(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 59;
  }
  set(e, n, r) {
    return e.setMinutes(r, 0, 0), e;
  }
}
class Fh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 50);
    N(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n, r) {
    switch (n) {
      case "s":
        return de(me.second, e);
      case "so":
        return r.ordinalNumber(e, { unit: "second" });
      default:
        return fe(n.length, e);
    }
  }
  validate(e, n) {
    return n >= 0 && n <= 59;
  }
  set(e, n, r) {
    return e.setSeconds(r, 0), e;
  }
}
class Vh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 30);
    N(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(e, n) {
    const r = (l) => Math.trunc(l * Math.pow(10, -n.length + 3));
    return he(fe(n.length, e), r);
  }
  set(e, n, r) {
    return e.setMilliseconds(r), e;
  }
}
class Nh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 10);
    N(this, "incompatibleTokens", ["t", "T", "x"]);
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
    return n.timestampIsSet ? e : ke(
      e,
      e.getTime() - gt(e) - r
    );
  }
}
class qh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 10);
    N(this, "incompatibleTokens", ["t", "T", "X"]);
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
    return n.timestampIsSet ? e : ke(
      e,
      e.getTime() - gt(e) - r
    );
  }
}
class jh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 40);
    N(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Zn(e);
  }
  set(e, n, r) {
    return [ke(e, r * 1e3), { timestampIsSet: !0 }];
  }
}
class Hh extends oe {
  constructor() {
    super(...arguments);
    N(this, "priority", 20);
    N(this, "incompatibleTokens", "*");
  }
  parse(e) {
    return Zn(e);
  }
  set(e, n, r) {
    return [ke(e, r), { timestampIsSet: !0 }];
  }
}
const Wh = {
  G: new ih(),
  y: new uh(),
  Y: new dh(),
  R: new ch(),
  u: new fh(),
  Q: new ph(),
  q: new mh(),
  M: new hh(),
  L: new vh(),
  w: new bh(),
  I: new kh(),
  d: new xh(),
  D: new Dh(),
  E: new Th(),
  e: new Ih(),
  c: new Ch(),
  i: new Ph(),
  a: new Mh(),
  b: new Lh(),
  B: new Bh(),
  h: new Sh(),
  H: new $h(),
  K: new Ah(),
  k: new Oh(),
  m: new Rh(),
  s: new Fh(),
  S: new Vh(),
  X: new Nh(),
  x: new qh(),
  t: new jh(),
  T: new Hh()
}, Kh = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Qh = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Yh = /^'([^]*?)'?$/, zh = /''/g, Gh = /\S/, Xh = /[a-zA-Z]/;
function Ka(a, t, e, n) {
  var y, x, I, L;
  const r = () => ke(e, NaN), l = th(), s = l.locale ?? Kn, o = l.firstWeekContainsDate ?? ((x = (y = l.locale) == null ? void 0 : y.options) == null ? void 0 : x.firstWeekContainsDate) ?? 1, u = l.weekStartsOn ?? ((L = (I = l.locale) == null ? void 0 : I.options) == null ? void 0 : L.weekStartsOn) ?? 0;
  if (!t)
    return a ? r() : ge(e, n == null ? void 0 : n.in);
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: u,
    locale: s
  }, p = [new oh(n == null ? void 0 : n.in, e)], v = t.match(Qh).map((T) => {
    const E = T[0];
    if (E in Wt) {
      const b = Wt[E];
      return b(T, s.formatLong);
    }
    return T;
  }).join("").match(Kh), m = [];
  for (let T of v) {
    Xn(T) && Kt(T, t, a), Gn(T) && Kt(T, t, a);
    const E = T[0], b = Wh[E];
    if (b) {
      const { incompatibleTokens: w } = b;
      if (Array.isArray(w)) {
        const P = m.find(
          (G) => w.includes(G.token) || G.token === E
        );
        if (P)
          throw new RangeError(
            `The format string mustn't contain \`${P.fullToken}\` and \`${T}\` at the same time`
          );
      } else if (b.incompatibleTokens === "*" && m.length > 0)
        throw new RangeError(
          `The format string mustn't contain \`${T}\` and any other token at the same time`
        );
      m.push({ token: E, fullToken: T });
      const A = b.run(
        a,
        T,
        s.match,
        d
      );
      if (!A)
        return r();
      p.push(A.setter), a = A.rest;
    } else {
      if (E.match(Xh))
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + E + "`"
        );
      if (T === "''" ? T = "'" : E === "'" && (T = Uh(T)), a.indexOf(T) === 0)
        a = a.slice(T.length);
      else
        return r();
    }
  }
  if (a.length > 0 && Gh.test(a))
    return r();
  const C = p.map((T) => T.priority).sort((T, E) => E - T).filter((T, E, b) => b.indexOf(T) === E).map(
    (T) => p.filter((E) => E.priority === T).sort((E, b) => b.subPriority - E.subPriority)
  ).map((T) => T[0]);
  let D = ge(e, n == null ? void 0 : n.in);
  if (isNaN(+D)) return r();
  const M = {};
  for (const T of C) {
    if (!T.validate(D, d))
      return r();
    const E = T.set(D, M, d);
    Array.isArray(E) ? (D = E[0], Object.assign(M, E[1])) : D = E;
  }
  return D;
}
function Uh(a) {
  return a.match(Yh)[1].replace(zh, "'");
}
const Zh = {
  dsfrDecodeDate: function(a, t) {
    if (typeof a != "string" || a === "" || /^\d{4}-\d{2}-\d{2}$/.test(a))
      return a;
    const n = Ka(a, t, /* @__PURE__ */ new Date());
    return Wa(n, "yyyy-MM-dd");
  },
  dsfrSearch: function(a) {
    return this.search(a, 0);
  },
  dsfrDecodeDateTime: function(a, t) {
    if (a === "" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(a))
      return a;
    const n = Ka(a, t, /* @__PURE__ */ new Date());
    return Wa(n, "yyyy-MM-dd'T'HH:mm");
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
}, $e = (a = "", t = "") => (a ? `${a}-` : "") + Yt() + (t ? `-${t}` : ""), Jh = {
  useRandomId: $e
}, ev = ["href", "aria-current"], tv = {
  __name: "RouterLink",
  props: ["to", "active"],
  setup(a) {
    const t = a, e = t.to === "/" ? window.location.pathname === t.to : window.location.pathname.startsWith(t.to);
    return (n, r) => (i(), f("a", {
      href: t.to,
      "aria-current": q(e) || a.active ? "page" : void 0
    }, [
      S(n.$slots, "default")
    ], 8, ev));
  }
}, Ae = (a, t) => {
  const e = a.__vccOpts || a;
  for (const [n, r] of t)
    e[n] = r;
  return e;
}, av = {
  name: "DsfrFacets",
  components: { DsfrCheckbox: It, DsfrTag: oa, DsfrButton: je },
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
}, nv = {
  key: 0,
  class: "fr-mb-2w flex flex-column gap--sm"
}, rv = ["aria-labelledby"], lv = {
  key: 0,
  class: "facet"
}, sv = { class: "flex justify-between w-full fr-mb-0" }, ov = {
  class: "facet--count",
  "aria-hidden": "true"
}, iv = { class: "fr-sr-only" }, uv = { class: "flex justify-between w-full" }, dv = {
  class: "facet--count",
  "aria-hidden": "true"
}, cv = { class: "fr-sr-only" }, fv = ["aria-labelledby"], pv = {
  key: 0,
  class: "facet"
}, mv = { class: "flex justify-between w-full fr-mb-0" }, hv = {
  class: "facet--count",
  "aria-hidden": "true"
}, vv = { class: "fr-sr-only" }, gv = { class: "flex justify-between w-full" }, bv = {
  class: "facet--count",
  "aria-hidden": "true"
}, yv = { class: "fr-sr-only" }, kv = { class: "fr-mb-2w" };
function wv(a, t, e, n, r, l) {
  const s = xe("DsfrTag"), o = xe("DsfrCheckbox"), u = xe("DsfrButton");
  return i(), f("div", null, [
    l.isAnyFacetValueSelected() ? (i(), f("div", nv, [
      (i(!0), f(z, null, J(e.selectedFacets, (d, p) => (i(), f(z, { key: p }, [
        l.facetMultipleByCode(p) ? g("", !0) : (i(!0), f(z, { key: 0 }, J(d, (v) => (i(), j(s, {
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
    ])) : g("", !0),
    (i(!0), f(z, null, J(e.facets, (d) => (i(), f("div", {
      key: d.code,
      class: "facets"
    }, [
      d.multiple || !l.isFacetSelected(d.code) ? (i(), f(z, { key: 0 }, [
        (i(), j(ve(e.heading), {
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
          (i(!0), f(z, null, J(l.selectedInvisibleFacets(d.code), (p) => (i(), f(z, {
            key: p.code
          }, [
            d.multiple ? (i(), f("div", lv, [
              ee(o, {
                small: "",
                modelValue: !0,
                "onUpdate:modelValue": (v) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                label: U(() => [
                  c("span", sv, [
                    V(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", ov, h(p.count), 1),
                    c("span", iv, "(" + h(p.count) + " élément(s))", 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onUpdate:modelValue"])
            ])) : (i(), j(u, {
              key: 1,
              tertiary: "",
              "no-outline": "",
              onClick: (v) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
            }, {
              default: U(() => [
                c("span", uv, [
                  V(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                  c("span", dv, h(p.count), 1),
                  c("span", cv, "(" + h(p.count) + " élément(s))", 1)
                ])
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ], 64))), 128))
        ], 8, rv)) : g("", !0),
        l.visibleFacets(d.code, d.values).length > 0 ? (i(), f("div", {
          key: 1,
          role: "group",
          "aria-labelledby": d.code
        }, [
          (i(!0), f(z, null, J(l.visibleFacets(d.code, d.values), (p) => (i(), f(z, {
            key: p.code
          }, [
            d.multiple ? (i(), f("div", pv, [
              ee(o, {
                small: "",
                modelValue: l.isFacetValueSelected(d.code, p.code),
                class: "facet",
                "onUpdate:modelValue": (v) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
              }, {
                label: U(() => [
                  c("span", mv, [
                    V(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                    c("span", hv, h(p.count), 1),
                    c("span", vv, "(" + h(p.count) + " élément(s))", 1)
                  ])
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue"])
            ])) : (i(), j(u, {
              key: 1,
              tertiary: "",
              "no-outline": "",
              onClick: (v) => a.$emit("toogle-facet", d.code, p.code, e.contextKey)
            }, {
              default: U(() => [
                c("span", gv, [
                  V(h(l.facetValueLabelByCode(d.code, p.code)) + " ", 1),
                  c("span", bv, h(p.count), 1),
                  c("span", yv, "(" + h(p.count) + " élément(s))", 1)
                ])
              ]),
              _: 2
            }, 1032, ["onClick"]))
          ], 64))), 128))
        ], 8, fv)) : g("", !0),
        c("div", kv, [
          d.values.length > e.maxValues && !l.isFacetExpanded(d.code) ? (i(), j(u, {
            key: 0,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.expandFacet(d.code)
          }, {
            default: U(() => t[0] || (t[0] = [
              V(" Voir plus ")
            ])),
            _: 2
          }, 1032, ["onClick"])) : g("", !0),
          d.values.length > e.maxValues && l.isFacetExpanded(d.code) ? (i(), j(u, {
            key: 1,
            size: "sm",
            tertiary: "",
            onClick: (p) => l.reduceFacet(d.code)
          }, {
            default: U(() => t[1] || (t[1] = [
              V(" Voir moins ")
            ])),
            _: 2
          }, 1032, ["onClick"])) : g("", !0)
        ])
      ], 64)) : g("", !0)
    ]))), 128))
  ]);
}
const _v = /* @__PURE__ */ Ae(av, [["render", wv], ["__scopeId", "data-v-27da8f08"]]), ca = () => {
  const a = K(), t = K(!1), e = K(!1), n = () => {
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
}, xv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Dv = ["id", "aria-labelledby", "onKeydown"], Tv = {
  class: "fr-menu__list",
  role: "none"
}, Iv = /* @__PURE__ */ F({
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
    } = ca(), o = a, u = K(null), d = K(!1);
    let p = K(0), v = [];
    Re("menuItem", { menuItemIndex: p, addMenuItem: (w, A) => {
      p.value += 1, v.push(`${w}@${A}`);
    } }), Re("id", o.id), ce(d, (w, A) => {
      w !== A && (l(w), w ? (setTimeout(() => M(), 100), document.addEventListener("click", I), document.addEventListener("touchstart", I)) : (document.removeEventListener("click", I), document.removeEventListener("touchstart", I)));
    });
    const C = (w, A) => {
      const P = A === "down" ? (w + 1) % v.length : (w - 1 + v.length) % v.length, G = document.getElementById(`${o.id}_item_${P}`);
      return G.ariaDisabled === "true" ? C(P, A) : G;
    }, D = (w) => {
      const A = document.activeElement.id, P = A.startsWith(`${o.id}_item_`) ? Number(A.split("_")[2]) : w === "down" ? -1 : 0;
      C(P, w).focus();
    }, M = (w) => D("down"), y = (w) => D("up");
    let x = (w) => {
      let A = w.key;
      if (A.length > 1 && A.match(/\S/))
        return;
      A = A.toLowerCase();
      let P = v.filter((k) => k.toLowerCase().startsWith(A)), G = document.activeElement.id;
      for (let k of P) {
        let B = k.split("@")[1], H = document.getElementById(`${o.id}_item_${B}`);
        if (G !== H.id) {
          H.focus();
          break;
        }
      }
    }, I = (w) => {
      u.value.contains(w.target) || (d.value = !1);
    };
    function L() {
      d.value = !1;
    }
    const T = _(() => ["sm", "small"].includes(o.size)), E = _(() => ["md", "medium"].includes(o.size)), b = _(() => ["lg", "large"].includes(o.size));
    return t({ closeMenu: L }), (w, A) => (i(), f("div", {
      class: "relative-position fr-menu__wrapper",
      onKeydown: A[9] || (A[9] = ae(
        //@ts-ignore
        (...P) => q(I) && q(I)(...P),
        ["tab"]
      )),
      ref_key: "container",
      ref: u
    }, [
      c("button", Q({
        id: w.id,
        onClick: A[0] || (A[0] = te((P) => d.value = !d.value, ["prevent", "stop"])),
        onKeyup: [
          A[1] || (A[1] = ae(te((P) => d.value = !1, ["stop"]), ["esc"])),
          A[2] || (A[2] = ae(te((P) => d.value = !d.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          ae(te(M, ["prevent"]), ["down"]),
          ae(te(y, ["prevent"]), ["up"]),
          A[3] || (A[3] = //@ts-ignore
          (...P) => q(x) && q(x)(...P)),
          A[4] || (A[4] = ae((P) => d.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-menu__btn", {
          [w.icon]: !0,
          "fr-btn--secondary": w.secondary,
          "fr-btn--tertiary": w.tertiary,
          "fr-btn--sm": T.value,
          "fr-btn--md": E.value,
          "fr-btn--lg": b.value
        }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": w.disabled,
        "aria-controls": `${w.id}_menu`,
        "aria-expanded": d.value
      }, w.$attrs), [
        c("span", null, h(w.label), 1)
      ], 16, xv),
      c("div", {
        id: `${w.id}_menu`,
        ref_key: "collapse",
        ref: e,
        class: R(["fr-collapse fr-menu", { "fr-collapse--expanded": q(r), "fr-collapsing": q(n) }]),
        role: "menu",
        "aria-labelledby": w.id,
        onKeyup: A[5] || (A[5] = ae((P) => d.value = !1, ["esc"])),
        onKeydown: [
          A[6] || (A[6] = ae((P) => d.value = !1, ["tab"])),
          ae(te(M, ["prevent"]), ["down"]),
          ae(te(y, ["prevent"]), ["up"]),
          A[7] || (A[7] = //@ts-ignore
          (...P) => q(x) && q(x)(...P))
        ],
        onTransitionend: A[8] || (A[8] = (P) => q(s)(d.value))
      }, [
        c("ul", Tv, [
          S(w.$slots, "default", {}, void 0, !0)
        ])
      ], 42, Dv)
    ], 544));
  }
}), Cv = /* @__PURE__ */ Ae(Iv, [["__scopeId", "data-v-7c863055"]]), Ev = { role: "none" }, Pv = ["id", "href"], Mv = /* @__PURE__ */ F({
  inheritAttrs: !1,
  __name: "DsfrMenuLink",
  props: {
    label: { default: "" },
    icon: { default: "" },
    url: { default: "" }
  },
  setup(a) {
    const t = a, { menuItemIndex: e, addMenuItem: n } = Qe("menuItem"), l = `fr-btn fr-btn--secondary fr-nav__link ${_(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")) ? t.icon : ""} fr-btn--icon-left`, s = Qe("id"), o = e.value;
    return n(t.label, o), (u, d) => {
      const p = xe("dsfr-button");
      return i(), f("li", Ev, [
        u.url === "" ? (i(), j(p, Q({
          key: 0,
          tabindex: "-1",
          role: "menuitem",
          label: u.label,
          id: `${q(s)}_item_${q(o)}`,
          icon: u.icon,
          tertiary: "",
          "no-outline": "",
          class: "fr-nav__link"
        }, u.$attrs), null, 16, ["label", "id", "icon"])) : (i(), f("a", Q({
          key: 1,
          tabindex: "-1",
          role: "menuitem",
          id: `${q(s)}_item_${q(o)}`,
          href: u.url,
          class: l
        }, u.$attrs), h(u.label), 17, Pv))
      ]);
    };
  }
}), Lv = /* @__PURE__ */ Ae(Mv, [["__scopeId", "data-v-b29bb72d"]]), Bv = ["for", "id"], Sv = {
  key: 0,
  class: "required"
}, $v = {
  key: 0,
  class: "fr-hint-text"
}, Av = ["id", "value", "aria-expanded", "aria-controls", "aria-disabled", "aria-required"], Ov = { class: "grow overflow" }, Rv = { class: "fr-pl-1v fr-select__icon" }, Fv = ["id"], Vv = {
  key: 0,
  class: "fr-btns-group fr-btns-group--icon-left"
}, Nv = ["id"], qv = {
  key: 1,
  class: "fr-input-wrap fr-icon-search-line fr-mb-3v"
}, jv = ["id", "aria-controls"], Hv = ["id"], Wv = {
  key: 0,
  class: "fr-hint-text"
}, Kv = ["aria-describedby", "id"], Qv = ["id", "onKeydown", "onClick", "aria-selected"], Yv = ["data-id", "value"], zv = ["id"], Gv = /* @__PURE__ */ F({
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
  setup(a) {
    const {
      collapse: t,
      collapsing: e,
      cssExpanded: n,
      doExpand: r,
      onTransitionEnd: l
    } = ca(), s = a, o = K(!1), u = _e(a, "modelValue"), d = K(s.options);
    ce(o, ($, O) => {
      $ !== O && (r($), $ ? (document.addEventListener("click", B), document.addEventListener("touchstart", B)) : (document.removeEventListener("click", B), document.removeEventListener("touchstart", B)));
    });
    const p = K(null), v = K(null), m = K(null), C = K(""), D = _(() => s.errorMessage || s.successMessage), M = _(() => s.errorMessage !== "" ? "error" : "valid"), y = _(() => d.value.every(($) => s.modelValue.includes($.value)) ? "fr-icon-close-circle-line" : "fr-icon-check-line"), x = _(() => d.value.every(($) => s.modelValue.includes($.value)) ? "Tout déselectionner" : "Tout sélectionner"), I = _(() => {
      let O = `${s.options.filter((Z) => s.modelValue.includes(Z.value)).length} options séléctionnées`;
      return s.modelValue.length > 2 ? O : s.options.filter((Z) => s.modelValue.includes(Z.value)).map((Z) => Z.text).join(", ");
    });
    let L = function() {
      if (d.value.every((O) => s.modelValue.includes(O.value))) {
        const O = d.value.map((Y) => Y.value), Z = s.modelValue.filter((Y) => !O.includes(Y));
        s.modelValue.length = 0, Z.forEach((Y) => s.modelValue.push(Y));
      } else
        d.value.filter((Z) => !s.modelValue.includes(Z.value)).forEach((Z) => s.modelValue.push(Z.value));
    }, T = function($) {
      const O = $.target.value.toLowerCase();
      d.value = s.options.filter((Z) => Z.text.toLowerCase().indexOf(O) > -1);
    };
    const E = function($) {
      switch ($.key) {
        case "Escape":
        case "Esc":
          $.stopPropagation(), o.value = !1;
          break;
        case " ":
        case "Space":
          document.activeElement.id === s.id && ($.preventDefault(), o.value = !o.value);
          break;
        case "Down":
        case "ArrowDown":
          $.preventDefault(), o.value ? A() : (o.value = !0, setTimeout(() => A(), 100));
          break;
        case "Up":
        case "ArrowUp":
          $.preventDefault(), o.value ? P() : (o.value = !0, setTimeout(() => P(), 100));
          break;
        case "Tab":
          G($);
          break;
        default:
          let O = /^[a-zA-Z0-9àâäçéèêëîïôöùûüÿÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸ]$/.test($.key);
          if (!O && $.shiftKey)
            return;
          s.comboHasFilter && document.activeElement.id === `${s.id}_filter` || (s.comboHasFilter && O ? m.value.focus() : k($));
      }
    }, b = ($, O) => {
      const Z = O === "down" ? ($ + 1) % d.value.length : ($ - 1 + d.value.length) % d.value.length, Y = document.getElementById(`${s.id}_item_${Z}`);
      return Y === null || Y.ariaDisabled === "true" ? b(Z, O) : Y;
    }, w = ($) => {
      const O = document.activeElement.id, Z = O.startsWith(`${s.id}_item_`) ? Number(O.split("_")[2]) : $ === "down" ? -1 : 0;
      b(Z, $).focus();
    }, A = ($) => w("down"), P = ($) => w("up"), G = ($) => {
      if (!o.value)
        return;
      const O = [];
      s.comboHasButton && O.push(`${s.id}_button`), s.comboHasFilter && O.push(`${s.id}_filter`), O.push("item");
      const Z = O.indexOf($.target.id);
      let Y;
      $.shiftKey ? Y = (Z - 1 + O.length) % O.length : Y = (Z + 1) % O.length;
      const re = document.getElementById(O[Y]);
      O[Y] === "item" ? (A(), $.preventDefault()) : re && (re.focus(), $.preventDefault());
    };
    let k = ($) => {
      let O = $.key;
      if (O.length > 1 && O.match(/\S/) || document.activeElement.id === `${s.id}_filter`)
        return;
      O = O.toLowerCase();
      let Z = d.value.filter((re) => re.text.toLowerCase().startsWith(O)), Y = document.activeElement.id;
      for (let re of Z) {
        let ne = document.querySelector(`[data-id='${re.value}']`);
        if (Y !== ne.id) {
          ne.focus();
          break;
        }
      }
    }, B = ($) => {
      p.value.contains($.target) || (o.value = !1);
    }, H = ($, O) => {
      u.value.includes(O) ? u.value.splice(u.value.indexOf(O), 1) : (u.value.push(O), d.value.length === 1 && (C.value = "", d.value = s.options));
    };
    return ($, O) => {
      const Z = xe("v-icon");
      return i(), f(z, null, [
        c("div", Q({
          ref_key: "container",
          ref: p,
          class: ["fr-select-group", { [`fr-select-group--${M.value}`]: D.value !== "" }],
          onKeyup: O[6] || (O[6] = ae(
            //@ts-ignore
            (...Y) => q(B) && q(B)(...Y),
            ["tab"]
          ))
        }, $.$attrs), [
          c("label", {
            class: "fr-label",
            for: $.id,
            id: `${$.id}_label`
          }, [
            S($.$slots, "label", {}, () => [
              V(h($.label) + " ", 1),
              S($.$slots, "required-tip", {}, () => [
                $.required ? (i(), f("span", Sv, " *")) : g("", !0)
              ], !0)
            ], !0),
            $.description ? (i(), f("span", $v, h($.description), 1)) : g("", !0)
          ], 8, Bv),
          c("div", {
            id: $.id,
            class: R([{ [`fr-select--${M.value}`]: D.value !== "" }, "fr-input fr-select--menu flex"]),
            onClick: O[0] || (O[0] = (Y) => o.value = !o.value),
            onKeydown: E,
            value: I.value,
            tabindex: "0",
            "aria-autocomplete": "none",
            role: "combobox",
            "aria-expanded": o.value,
            "aria-haspopup": "dialog",
            "aria-controls": `${$.id}_dialog`,
            "aria-disabled": $.disabled,
            "aria-required": $.required
          }, [
            c("p", Ov, h(I.value), 1),
            c("div", Rv, [
              ee(Z, {
                style: { "font-size": "1rem" },
                name: "ri-arrow-down-s-line"
              })
            ])
          ], 42, Av),
          c("div", {
            id: `${$.id}_dialog`,
            ref_key: "collapse",
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Choix des options",
            class: R(["fr-collapse fr-menu fr-select__menu fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": q(n), "fr-collapsing": q(e) }]),
            onKeydown: E,
            onTransitionend: O[5] || (O[5] = (Y) => q(l)(o.value))
          }, [
            $.comboHasButton ? (i(), f("div", Vv, [
              c("button", {
                class: R(["fr-btn fr-btn--tertiary fr-btn--sm", `${y.value}`]),
                id: `${$.id}_button`,
                onClick: O[1] || (O[1] = (Y) => q(L)()),
                ref_key: "button",
                ref: v,
                type: "button"
              }, h(x.value), 11, Nv)
            ])) : g("", !0),
            $.comboHasFilter ? (i(), f("div", qv, [
              Le(c("input", {
                class: "fr-input",
                id: `${$.id}_filter`,
                ref_key: "filter",
                ref: m,
                onInput: O[2] || (O[2] = //@ts-ignore
                (...Y) => q(T) && q(T)(...Y)),
                "onUpdate:modelValue": O[3] || (O[3] = (Y) => C.value = Y),
                "aria-label": "Rechercher une option",
                "aria-controls": `${$.id}_listbox`,
                placeholder: "Rechercher",
                type: "text"
              }, null, 40, jv), [
                [pa, C.value]
              ])
            ])) : g("", !0),
            $.comboLabel ? (i(), f("p", {
              key: 2,
              class: "fr-label fr-mb-2v",
              id: `${$.id}_combolabel`
            }, [
              V(h($.comboLabel) + " ", 1),
              $.comboDescription ? (i(), f("span", Wv, h($.comboDescription), 1)) : g("", !0)
            ], 8, Hv)) : g("", !0),
            c("ul", {
              role: "listbox",
              "aria-multiselectable": "true",
              "aria-describedby": $.comboLabel ? `${$.id}_combolabel` : null,
              id: `${$.id}_listbox`,
              "aria-live": "polite",
              class: "fr-select__ul"
            }, [
              (i(!0), f(z, null, J(d.value, (Y, re) => (i(), f("li", {
                class: "fr-checkbox-group fr-checkbox-group--sm fr-py-0 fr-my-1v",
                id: `${$.id}_item_${re}`,
                tabindex: "-1",
                role: "option",
                onKeydown: ae(te((ne) => q(H)(ne, Y.value), ["prevent"]), ["space"]),
                onClick: (ne) => q(H)(ne, Y.value),
                "aria-selected": u.value.includes(Y.value)
              }, [
                Le(c("input", {
                  "data-id": Y.value,
                  type: "hidden",
                  class: "",
                  tabindex: "-1",
                  value: Y.value,
                  "onUpdate:modelValue": O[4] || (O[4] = (ne) => u.value = ne)
                }, null, 8, Yv), [
                  [pa, u.value]
                ]),
                c("span", null, h(Y.text), 1)
              ], 40, Qv))), 256))
            ], 8, Kv)
          ], 42, Fv)
        ], 16),
        D.value ? (i(), f("p", {
          key: 0,
          id: `select-${M.value}-desc-${M.value}`,
          class: R(`fr-${M.value}-text`)
        }, h(D.value), 11, zv)) : g("", !0)
      ], 64);
    };
  }
}), Xv = /* @__PURE__ */ Ae(Gv, [["__scopeId", "data-v-3c129b3e"]]), Uv = ["id", "onKeydown", "aria-disabled", "aria-controls", "aria-expanded"], Zv = ["id", "aria-labelledby", "onKeydown"], Jv = {
  key: 0,
  class: "fr-label fr-mb-0"
}, eg = {
  key: 0,
  class: "fr-hint-text"
}, tg = {
  class: "fr-menu-header__list fr-mx-n4v fr-pt-2v fr-mb-0",
  role: "none"
}, ag = { role: "none" }, ng = { class: "fr-p-2v" }, rg = ["id", "href"], lg = /* @__PURE__ */ F({
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
    } = ca(), s = a, o = K(null), u = K(!1);
    let d = K(0), p = [];
    const v = (I, L) => {
      d.value += 1, p.push(`${I}@${L}`);
    };
    Re("menuItem", { menuItemIndex: d, addMenuItem: v }), Re("id", s.id), ce(u, (I, L) => {
      I !== L && (r(I), I ? (setTimeout(() => D(), 100), document.addEventListener("click", x), document.addEventListener("touchstart", x)) : (document.removeEventListener("click", x), document.removeEventListener("touchstart", x)));
    }), ye(() => {
      v(s.logoutLabel, d.value);
    });
    const m = (I, L) => {
      const T = L === "down" ? (I + 1) % p.length : (I - 1 + p.length) % p.length, E = document.getElementById(`${s.id}_item_${T}`);
      return E.ariaDisabled === "true" ? m(T, L) : E;
    }, C = (I) => {
      const L = document.activeElement.id, T = L.startsWith(`${s.id}_item_`) ? Number(L.split("_")[2]) : I === "down" ? -1 : 0;
      m(T, I).focus();
    }, D = (I) => C("down"), M = (I) => C("up");
    let y = (I) => {
      let L = I.key;
      if (L.length > 1 && L.match(/\S/))
        return;
      L = L.toLowerCase();
      let T = p.filter((b) => b.toLowerCase().startsWith(L)), E = document.activeElement.id;
      for (let b of T) {
        let w = b.split("@")[1], A = document.getElementById(`${s.id}_item_${w}`);
        if (E !== A.id) {
          A.focus();
          break;
        }
      }
    }, x = (I) => {
      o.value.contains(I.target) || (u.value = !1);
    };
    return (I, L) => (i(), f("div", {
      class: "relative-position fr-menu-header",
      onKeyup: L[9] || (L[9] = ae(
        //@ts-ignore
        (...T) => q(x) && q(x)(...T),
        ["tab"]
      )),
      ref_key: "container",
      ref: o
    }, [
      c("button", Q({
        id: I.id,
        onClick: L[0] || (L[0] = te((T) => u.value = !u.value, ["prevent", "stop"])),
        onKeyup: [
          L[1] || (L[1] = ae(te((T) => u.value = !1, ["stop"]), ["esc"])),
          L[2] || (L[2] = ae(te((T) => u.value = !u.value, ["prevent"]), ["space"]))
        ],
        onKeydown: [
          ae(te(D, ["prevent"]), ["down"]),
          ae(te(M, ["prevent"]), ["up"]),
          L[3] || (L[3] = //@ts-ignore
          (...T) => q(y) && q(y)(...T)),
          L[4] || (L[4] = ae((T) => u.value = !1, ["tab"]))
        ],
        class: ["fr-btn fr-btn--tertiary-no-outline fr-menu__btn fr-btn--sm fr-btn--icon-left", { [I.icon]: !0 }],
        type: "button",
        "aria-haspopup": "menu",
        "aria-disabled": I.disabled,
        "aria-controls": `${I.id}_menu`,
        "aria-expanded": u.value
      }, I.$attrs), [
        c("span", null, h(I.label), 1)
      ], 16, Uv),
      c("div", {
        id: `${I.id}_menu`,
        ref_key: "collapse",
        ref: t,
        class: R(["fr-collapse fr-menu fr-menu-header__modal fr-pb-3v fr-pt-4v bg-white", { "fr-collapse--expanded": q(n), "fr-collapsing": q(e) }]),
        role: "menu",
        "aria-labelledby": I.id,
        onKeyup: L[5] || (L[5] = ae((T) => u.value = !1, ["esc"])),
        onKeydown: [
          L[6] || (L[6] = ae((T) => u.value = !1, ["tab"])),
          ae(te(D, ["prevent"]), ["down"]),
          ae(te(M, ["prevent"]), ["up"]),
          L[7] || (L[7] = //@ts-ignore
          (...T) => q(y) && q(y)(...T))
        ],
        onTransitionend: L[8] || (L[8] = (T) => q(l)(u.value))
      }, [
        S(I.$slots, "detail", {}, () => [
          I.nom === "" && I.email === "" ? g("", !0) : (i(), f("p", Jv, [
            V(h(I.nom) + " ", 1),
            I.email !== "" ? (i(), f("span", eg, h(I.email), 1)) : g("", !0)
          ]))
        ], !0),
        c("ul", tg, [
          S(I.$slots, "default", {}, void 0, !0),
          c("li", ag, [
            c("div", ng, [
              I.logoutUrl !== "" ? (i(), f("a", {
                key: 0,
                id: `${I.id}_item_${q(d) - 1}`,
                class: "fr-btn fr-btn--sm fr-btn--tertiary fr-icon-logout-box-r-line fr-btn--icon-left",
                role: "menuitem",
                tabindex: "-1",
                href: I.logoutUrl
              }, h(I.logoutLabel), 9, rg)) : g("", !0)
            ])
          ])
        ])
      ], 42, Zv)
    ], 544));
  }
}), sg = /* @__PURE__ */ Ae(lg, [["__scopeId", "data-v-3a8c3dd5"]]), og = Symbol("header"), ig = ["aria-label"], ug = { class: "fr-btns-group" }, Qt = /* @__PURE__ */ F({
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
      c("ul", ug, [
        (i(!0), f(z, null, J(n.links, (l, s) => (i(), f("li", { key: s }, [
          ee(q(sa), Q({ ref_for: !0 }, l, {
            "on-click": (o) => {
              var u;
              e("linkClick", o), (u = l.onClick) == null || u.call(l, o);
            }
          }), null, 16, ["on-click"])
        ]))), 128)),
        S(n.$slots, "default")
      ])
    ], 8, ig));
  }
}), dg = {
  role: "banner",
  class: "fr-header"
}, cg = { class: "fr-header__body" }, fg = { class: "fr-container width-inherit" }, pg = { class: "fr-header__body-row" }, mg = { class: "fr-header__brand fr-enlarge-link" }, hg = { class: "fr-header__brand-top" }, vg = { class: "fr-header__logo" }, gg = {
  key: 0,
  class: "fr-header__operator"
}, bg = ["src", "alt"], yg = {
  key: 1,
  class: "fr-header__navbar"
}, kg = ["aria-label", "title", "data-fr-opened"], wg = ["aria-label", "title"], _g = {
  key: 0,
  class: "fr-header__service"
}, xg = { class: "fr-header__service-title" }, Dg = {
  key: 0,
  class: "fr-badge fr-badge--sm fr-badge--green-emeraude"
}, Tg = {
  key: 0,
  class: "fr-header__service-tagline"
}, Ig = {
  key: 1,
  class: "fr-header__service"
}, Cg = { class: "fr-header__tools" }, Eg = {
  key: 0,
  class: "fr-header__tools-links"
}, Pg = { class: "fr-header__search fr-modal" }, Mg = ["aria-label"], Lg = { class: "fr-container" }, Bg = { class: "fr-header__menu-links" }, Sg = {
  key: 1,
  class: "flex justify-center items-center"
}, $g = { class: "fr-header__menu fr-modal" }, Ag = {
  key: 0,
  class: "fr-container"
}, Og = /* @__PURE__ */ F({
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
    const e = a, n = t, r = st(e, "languageSelector"), l = K(!1), s = K(!1), o = K(!1), u = () => {
      var y;
      o.value = !1, l.value = !1, s.value = !1, (y = document.getElementById("button-menu")) == null || y.focus();
    }, d = (y) => {
      y.key === "Escape" && u();
    };
    ye(() => {
      document.addEventListener("keydown", d), n("on-mounted");
    }), Ee(() => {
      document.removeEventListener("keydown", d);
    });
    const p = () => {
      var y;
      o.value = !0, l.value = !0, s.value = !1, (y = document.getElementById("close-button")) == null || y.focus();
    }, v = () => {
      o.value = !0, l.value = !1, s.value = !0;
    }, m = u, C = Gt(), D = _(() => {
      var y;
      return !!((y = C.operator) != null && y.call(C).length) || !!e.operatorImgSrc;
    }), M = _(() => !!C.mainnav);
    return Re(og, () => u), (y, x) => {
      var L, T, E;
      const I = xe("RouterLink");
      return i(), f("header", dg, [
        c("div", cg, [
          c("div", fg, [
            c("div", pg, [
              c("div", mg, [
                c("div", hg, [
                  c("div", vg, [
                    ee(I, {
                      to: y.homeTo,
                      title: `${y.homeLabel} - ${y.serviceTitle}`
                    }, {
                      default: U(() => [
                        ee(q(nt), {
                          "logo-text": y.logoText,
                          "data-testid": "header-logo"
                        }, null, 8, ["logo-text"])
                      ]),
                      _: 1
                    }, 8, ["to", "title"])
                  ]),
                  D.value ? (i(), f("div", gg, [
                    S(y.$slots, "operator", {}, () => [
                      y.operatorImgSrc ? (i(), f("img", {
                        key: 0,
                        class: "fr-responsive-img",
                        src: y.operatorImgSrc,
                        alt: y.operatorImgAlt,
                        style: Te(y.operatorImgStyle)
                      }, null, 12, bg)) : g("", !0)
                    ])
                  ])) : g("", !0),
                  y.showSearch || M.value || (L = y.quickLinks) != null && L.length ? (i(), f("div", yg, [
                    y.showSearch ? (i(), f("button", {
                      key: 0,
                      class: "fr-btn fr-btn--search",
                      "aria-controls": "header-search",
                      "aria-label": y.showSearchLabel,
                      title: y.showSearchLabel,
                      "data-fr-opened": s.value,
                      onClick: x[0] || (x[0] = te((b) => v(), ["prevent", "stop"]))
                    }, null, 8, kg)) : g("", !0),
                    M.value || (T = y.quickLinks) != null && T.length ? (i(), f("button", {
                      key: 1,
                      id: "button-menu",
                      class: "fr-btn--menu fr-btn",
                      "data-fr-opened": p,
                      "aria-controls": "header-navigation",
                      "aria-haspopup": "menu",
                      "aria-label": y.menuLabel,
                      title: y.menuLabel,
                      "data-testid": "open-menu-btn",
                      onClick: x[1] || (x[1] = te((b) => p(), ["prevent", "stop"]))
                    }, null, 8, wg)) : g("", !0)
                  ])) : g("", !0)
                ]),
                y.serviceTitle ? (i(), f("div", _g, [
                  ee(I, Q({
                    to: y.homeTo,
                    title: `${y.homeLabel} - ${y.serviceTitle}`
                  }, y.$attrs), {
                    default: U(() => [
                      c("p", xg, [
                        V(h(y.serviceTitle) + " ", 1),
                        y.showBeta ? (i(), f("span", Dg, " BETA ")) : g("", !0)
                      ])
                    ]),
                    _: 1
                  }, 16, ["to", "title"]),
                  y.serviceDescription ? (i(), f("p", Tg, h(y.serviceDescription), 1)) : g("", !0)
                ])) : g("", !0),
                !y.serviceTitle && y.showBeta ? (i(), f("div", Ig, x[9] || (x[9] = [
                  c("p", { class: "fr-header__service-title" }, [
                    c("span", { class: "fr-badge fr-badge--sm fr-badge--green-emeraude" }, "BETA")
                  ], -1)
                ]))) : g("", !0)
              ]),
              c("div", Cg, [
                (E = y.quickLinks) != null && E.length || r.value ? (i(), f("div", Eg, [
                  l.value ? g("", !0) : (i(), j(Qt, {
                    key: 0,
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel
                  }, {
                    default: U(() => [
                      S(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label"])),
                  r.value ? (i(), j(q(rt), Q({ key: 1 }, r.value, {
                    onSelect: x[2] || (x[2] = (b) => n("language-select", b))
                  }), null, 16)) : g("", !0)
                ])) : g("", !0),
                c("div", Pg, [
                  S(y.$slots, "header-search"),
                  y.showSearch ? (i(), j(q(lt), {
                    key: 0,
                    "searchbar-id": y.searchbarId,
                    label: y.searchLabel,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    style: { "justify-content": "flex-end" },
                    "onUpdate:modelValue": x[3] || (x[3] = (b) => n("update:modelValue", b)),
                    onSearch: x[4] || (x[4] = (b) => n("search", b))
                  }, null, 8, ["searchbar-id", "label", "model-value", "placeholder"])) : g("", !0)
                ])
              ])
            ]),
            y.showSearch || M.value || y.quickLinks && y.quickLinks.length || r.value ? (i(), f("div", {
              key: 0,
              id: "header-navigation",
              class: R(["fr-header__menu fr-modal", { "fr-modal--opened": o.value }]),
              "aria-label": y.menuModalLabel,
              role: "dialog",
              "aria-modal": "true"
            }, [
              c("div", Lg, [
                c("button", {
                  id: "close-button",
                  class: "fr-btn fr-btn--close",
                  "aria-controls": "header-navigation",
                  "data-testid": "close-modal-btn",
                  onClick: x[5] || (x[5] = te((b) => u(), ["prevent", "stop"]))
                }, h(y.closeMenuModalLabel), 1),
                c("div", Bg, [
                  r.value ? (i(), j(q(rt), Q({ key: 0 }, r.value, {
                    onSelect: x[6] || (x[6] = (b) => r.value.currentLanguage = b.codeIso)
                  }), null, 16)) : g("", !0),
                  l.value ? (i(), j(Qt, {
                    key: 1,
                    role: "navigation",
                    links: y.quickLinks,
                    "nav-aria-label": y.quickLinksAriaLabel,
                    onLinkClick: q(m)
                  }, {
                    default: U(() => [
                      S(y.$slots, "header-menu-link")
                    ]),
                    _: 3
                  }, 8, ["links", "nav-aria-label", "onLinkClick"])) : g("", !0),
                  S(y.$slots, "header-search")
                ]),
                o.value ? S(y.$slots, "mainnav", {
                  key: 0,
                  hidemodal: u
                }) : g("", !0),
                s.value ? (i(), f("div", Sg, [
                  ee(q(lt), {
                    "searchbar-id": y.searchbarId,
                    "model-value": y.modelValue,
                    placeholder: y.placeholder,
                    "onUpdate:modelValue": x[7] || (x[7] = (b) => n("update:modelValue", b)),
                    onSearch: x[8] || (x[8] = (b) => n("search", b))
                  }, null, 8, ["searchbar-id", "model-value", "placeholder"])
                ])) : g("", !0)
              ])
            ], 10, Mg)) : g("", !0),
            S(y.$slots, "default")
          ])
        ]),
        c("div", $g, [
          M.value && !o.value ? (i(), f("div", Ag, [
            S(y.$slots, "mainnav", { hidemodal: u })
          ])) : g("", !0)
        ])
      ]);
    };
  }
}), Rg = { class: "fr-table" }, Fg = { class: "fr-table__wrapper" }, Vg = { class: "fr-table__container" }, Ng = { class: "fr-table__content" }, qg = ["id"], jg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Hg = {
  key: 0,
  class: "fr-checkbox-group fr-checkbox-group--sm"
}, Wg = ["id", "checked"], Kg = ["for"], Qg = ["tabindex", "onClick", "onKeydown"], Yg = { key: 0 }, zg = { key: 1 }, Gg = ["data-row-key"], Xg = {
  key: 0,
  class: "fr-cell--fixed",
  role: "columnheader"
}, Ug = { class: "fr-checkbox-group fr-checkbox-group--sm" }, Zg = ["id", "value"], Jg = ["for"], eb = ["onKeydown"], tb = { key: 0 }, ab = ["colspan"], nb = { class: "flex gap-2 items-center" }, rb = ["selected"], lb = ["value", "selected"], sb = { class: "flex ml-1" }, ob = /* @__PURE__ */ F({
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
  setup(a, { expose: t, emit: e }) {
    const n = a, r = e, l = _e(a, "selection"), s = _e(a, "rowsPerPage"), o = _e(a, "currentPage"), u = _(() => Math.max(Math.ceil(n.rows.length / s.value), 1)), d = _(() => n.pages ?? Array.from({ length: u.value }).map((P, G) => ({
      label: `${G + 1}`,
      title: `Page ${G + 1}`,
      href: `#${G + 1}`
    }))), p = _(() => o.value * s.value), v = _(() => (o.value + 1) * s.value), m = _(() => ["sm", "small"].includes(n.footerSize));
    function C(P, G) {
      const k = D.value;
      return (P[k] ?? P) < (G[k] ?? G) ? -1 : (P[k] ?? P) > (G[k] ?? G) ? 1 : 0;
    }
    const D = _e(a, "sortedBy");
    D.value = n.sorted;
    const M = _e(a, "sortedDesc");
    function y(P) {
      if (!(!n.sortableRows || Array.isArray(n.sortableRows) && !n.sortableRows.includes(P))) {
        if (D.value === P) {
          if (M.value) {
            D.value = void 0, M.value = !1;
            return;
          }
          M.value = !0;
          return;
        }
        M.value = !1, D.value = P;
      }
    }
    const x = _(() => {
      const P = D.value ? n.rows.slice().sort(n.sortFn ?? C) : n.rows.slice();
      return M.value && P.reverse(), P;
    }), I = _(() => {
      const P = n.headersRow.map((k) => typeof k != "object" ? k : k.key), G = x.value.map((k) => Array.isArray(k) ? k : P.map((B) => k));
      return n.pagination ? G.slice(p.value, v.value) : G;
    });
    function L(P) {
      P && (l.value = I.value.map((G) => G[0][n.rowKey])), l.value.length = 0;
    }
    const T = K(!1);
    function E() {
      T.value = l.value.length === I.value.length;
    }
    function b() {
      r("update:current-page", 0), T.value = !1, l.value.length = 0;
    }
    function w(P) {
      navigator.clipboard.writeText(P);
    }
    function A() {
      o.value = 0;
    }
    return t({ resetCurrentPage: A }), (P, G) => (i(), f("div", Rg, [
      c("div", Fg, [
        c("div", Vg, [
          c("div", Ng, [
            c("table", { id: P.id }, [
              c("caption", {
                class: R({ "fr-sr-only": P.noCaption })
              }, h(P.title), 3),
              c("thead", null, [
                c("tr", null, [
                  P.selectableRows ? (i(), f("th", jg, [
                    P.showToggleAll ? (i(), f("div", Hg, [
                      c("input", {
                        id: `table-select--${P.id}-all`,
                        checked: T.value,
                        type: "checkbox",
                        onInput: G[0] || (G[0] = (k) => L(k.target.checked))
                      }, null, 40, Wg),
                      c("label", {
                        class: "fr-label",
                        for: `table-select--${P.id}-all`
                      }, " Sélectionner tout ", 8, Kg)
                    ])) : g("", !0)
                  ])) : g("", !0),
                  (i(!0), f(z, null, J(P.headersRow, (k, B) => (i(), f("th", Q({
                    key: typeof k == "object" ? k.key : k,
                    scope: "col",
                    ref_for: !0
                  }, typeof k == "object" && k.headerAttrs, {
                    class: {
                      "text-right": k.align === "right",
                      "text-left": k.align === "left"
                    },
                    tabindex: P.sortableRows ? 0 : void 0,
                    onClick: (H) => y(k.key ?? (Array.isArray(P.rows[0]) ? B : k)),
                    onKeydown: [
                      ae((H) => y(k.key ?? k), ["enter"]),
                      ae((H) => y(k.key ?? k), ["space"])
                    ]
                  }), [
                    c("div", {
                      class: R({
                        "sortable-header": P.sortableRows === !0 || Array.isArray(P.sortableRows) && P.sortableRows.includes(k.key ?? k),
                        "fr-sr-only": typeof k == "object" ? k.hideLabel : !1,
                        "flex-row-reverse": typeof k == "object" ? k.align === "right" : !1
                      })
                    }, [
                      S(P.$slots, "header", Q({ ref_for: !0 }, typeof k == "object" ? k : { key: k, label: k }), () => [
                        V(h(typeof k == "object" ? k.label : k), 1)
                      ], !0),
                      D.value !== (k.key ?? k) && (P.sortableRows === !0 || Array.isArray(P.sortableRows) && P.sortableRows.includes(k.key ?? k)) ? (i(), f("span", Yg, [
                        ee(q(be), {
                          name: "ri-sort-asc",
                          color: "var(--grey-625-425)"
                        })
                      ])) : D.value === (k.key ?? k) ? (i(), f("span", zg, [
                        ee(q(be), {
                          name: M.value ? "ri-sort-desc" : "ri-sort-asc"
                        }, null, 8, ["name"])
                      ])) : g("", !0)
                    ], 2)
                  ], 16, Qg))), 128))
                ])
              ]),
              c("tbody", null, [
                (i(!0), f(z, null, J(I.value, (k, B) => (i(), f("tr", {
                  key: `row-${B}`,
                  "data-row-key": B + 1
                }, [
                  P.selectableRows ? (i(), f("th", Xg, [
                    c("div", Ug, [
                      Le(c("input", {
                        id: `row-select-${P.id}-${B}`,
                        "onUpdate:modelValue": G[1] || (G[1] = (H) => l.value = H),
                        value: k[0][P.rowKey] ?? `row-${B}`,
                        type: "checkbox",
                        onChange: G[2] || (G[2] = (H) => E())
                      }, null, 40, Zg), [
                        [yt, l.value]
                      ]),
                      c("label", {
                        class: "fr-label",
                        for: `row-select-${P.id}-${B}`
                      }, " Sélectionner la ligne " + h(B + 1), 9, Jg)
                    ])
                  ])) : g("", !0),
                  (i(!0), f(z, null, J(k, (H, $) => (i(), f("td", {
                    key: typeof H == "object" ? H[P.rowKey] : H,
                    class: R({
                      "text-right": P.headersRow[$].align === "right",
                      "text-left": P.headersRow[$].align === "left"
                    }),
                    onKeydown: [
                      ae(te((O) => w(typeof H == "object" ? H[P.rowKey] : H), ["ctrl"]), ["c"]),
                      ae(te((O) => w(typeof H == "object" ? H[P.rowKey] : H), ["meta"]), ["c"])
                    ]
                  }, [
                    S(P.$slots, "cell", Q({ ref_for: !0 }, {
                      colKey: typeof P.headersRow[$] == "object" ? P.headersRow[$].key : P.headersRow[$],
                      cell: H,
                      idx: B + 1
                    }), () => [
                      V(h(typeof H == "object" ? H[P.rowKey] : H), 1)
                    ], !0)
                  ], 42, eb))), 128))
                ], 8, Gg))), 128)),
                I.value.length === 0 ? (i(), f("tr", tb, [
                  c("td", {
                    colspan: P.selectableRows ? P.headersRow.length + 1 : P.headersRow.length
                  }, h(n.noResultLabel), 9, ab)
                ])) : g("", !0)
              ])
            ], 8, qg)
          ])
        ])
      ]),
      c("div", {
        class: R(P.bottomActionBarClass)
      }, [
        S(P.$slots, "pagination", {}, () => [
          P.pagination && !P.$slots.pagination ? (i(), f("div", {
            key: 0,
            class: R(["flex justify-between items-center flex-wrap", P.paginationWrapperClass])
          }, [
            P.showNbRows ? (i(), f("p", {
              key: 0,
              class: R(["fr-mb-0 fr-ml-1v", { "fr-text--sm": m.value }])
            }, h(P.rows.length) + " résulat(s)", 3)) : g("", !0),
            c("div", nb, [
              c("label", {
                class: R(["fr-label", { "fr-text--sm": m.value }]),
                for: "pagination-options"
              }, " Résultats par page : ", 2),
              Le(c("select", {
                id: "pagination-options",
                "onUpdate:modelValue": G[3] || (G[3] = (k) => s.value = k),
                class: "fr-select",
                onChange: G[4] || (G[4] = (k) => b())
              }, [
                c("option", {
                  value: "",
                  selected: !P.paginationOptions.includes(s.value),
                  disabled: "true",
                  hidden: "hidden"
                }, " Sélectionner une option ", 8, rb),
                (i(!0), f(z, null, J(P.paginationOptions, (k, B) => (i(), f("option", {
                  key: B,
                  value: k,
                  selected: +k === s.value
                }, h(k), 9, lb))), 128))
              ], 544), [
                [Xt, s.value]
              ])
            ]),
            c("div", sb, [
              c("span", {
                class: R(["self-center", { "fr-text--sm": m.value }])
              }, " Page " + h(o.value + 1) + " sur " + h(u.value), 3)
            ]),
            ee(q(la), {
              "current-page": o.value,
              "onUpdate:currentPage": G[5] || (G[5] = (k) => o.value = k),
              pages: d.value,
              "next-page-title": "Suivant",
              "prev-page-title": "Précédent"
            }, null, 8, ["current-page", "pages"])
          ], 2)) : g("", !0)
        ], !0)
      ], 2)
    ]));
  }
}), ib = /* @__PURE__ */ Ae(ob, [["__scopeId", "data-v-50097005"]]), ub = ["id", "name", "value", "checked", "required", "data-testid", "data-test"], db = ["for"], cb = {
  key: 0,
  class: "required"
}, fb = {
  key: 0,
  class: "fr-hint-text"
}, pb = {
  key: 0,
  class: "fr-messages-group",
  "aria-live": "assertive",
  role: "alert"
}, mb = /* @__PURE__ */ F({
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
  setup(a) {
    const t = a, e = _(() => t.errorMessage || t.validMessage), n = _(() => t.errorMessage ? "fr-error-text" : "fr-valid-text"), r = _e(a, "modelValue");
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
        Le(c("input", Q({
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
        }), null, 16, ub), [
          [yt, r.value]
        ]),
        c("label", {
          for: l.id,
          class: "fr-label"
        }, [
          S(l.$slots, "label", {}, () => [
            V(h(l.label) + " ", 1),
            S(l.$slots, "required-tip", {}, () => [
              l.required ? (i(), f("span", cb, " *")) : g("", !0)
            ])
          ]),
          l.hint ? (i(), f("span", fb, [
            S(l.$slots, "hint", {}, () => [
              V(h(l.hint), 1)
            ])
          ])) : g("", !0)
        ], 8, db),
        e.value ? (i(), f("div", pb, [
          c("p", {
            class: R(["fr-message--info flex items-center", n.value])
          }, h(e.value), 3)
        ])) : g("", !0)
      ], 2)
    ], 2));
  }
}), hb = ["for"], vb = {
  key: 0,
  class: "required"
}, gb = {
  key: 0,
  class: "fr-hint-text"
}, bb = ["id", "name", "disabled", "aria-disabled", "required"], yb = ["selected"], kb = ["selected", "value", "disabled", "aria-disabled"], wb = ["id"], _b = /* @__PURE__ */ F({
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
    const e = _(() => t.errorMessage || t.successMessage), n = _(() => t.errorMessage ? "error" : "valid"), r = function(l) {
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
        S(l.$slots, "label", {}, () => [
          V(h(l.label) + " ", 1),
          S(l.$slots, "required-tip", {}, () => [
            l.required ? (i(), f("span", vb, " *")) : g("", !0)
          ])
        ]),
        l.hint ?? l.description ? (i(), f("span", gb, h(l.hint ?? l.description), 1)) : g("", !0)
      ], 8, hb),
      c("select", Q({
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
        }, h(l.defaultUnselectedText), 9, yb),
        (i(!0), f(z, null, J(l.options, (o, u) => (i(), f("option", {
          key: u,
          selected: l.modelValue === o || typeof o == "object" && o.value === l.modelValue,
          value: typeof o == "object" ? o.value : o,
          disabled: !!(typeof o == "object" && o.disabled),
          "aria-disabled": !!(typeof o == "object" && o.disabled)
        }, h(typeof o == "object" ? o.text : o), 9, kb))), 128))
      ], 16, bb),
      e.value ? (i(), f("p", {
        key: 0,
        id: `select-${n.value}-desc-${n.value}`,
        class: R(`fr-${n.value}-text`)
      }, h(e.value), 11, wb)) : g("", !0)
    ], 2));
  }
}), xb = ["id"], Db = /* @__PURE__ */ F({
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
    const t = a, e = K(!1), n = K(!1), r = K(!1), l = K(null), s = K(null), o = K("0px"), u = K("0px"), d = K("0px"), p = K(!1), v = K(0);
    async function m() {
      var re, ne, De, Ce, W, X, le, ue;
      if (typeof document > "u" || !e.value || s.value.matches(":empty"))
        return;
      await new Promise((pe) => setTimeout(pe, 100));
      const b = (re = l.value) == null ? void 0 : re.getBoundingClientRect().top, w = (ne = l.value) == null ? void 0 : ne.offsetHeight, A = (De = l.value) == null ? void 0 : De.offsetWidth, P = (Ce = l.value) == null ? void 0 : Ce.getBoundingClientRect().left, G = (W = s.value) == null ? void 0 : W.offsetHeight, k = (X = s.value) == null ? void 0 : X.offsetWidth, B = (le = s.value) == null ? void 0 : le.offsetTop, H = (ue = s.value) == null ? void 0 : ue.offsetLeft, O = !(b - G < 0) && b + w + G >= document.documentElement.offsetHeight;
      p.value = O;
      const Z = P + A >= document.documentElement.offsetWidth, Y = P + A / 2 - k / 2 <= 0;
      u.value = O ? `${b - B - G + 8}px` : `${b - B + w - 8}px`, v.value = 1, o.value = Z ? `${P - H + A - k - 4}px` : Y ? `${P - H + 4}px` : `${P - H + A / 2 - k / 2}px`, d.value = Z ? `${k / 2 - A / 2 + 4}px` : Y ? `${-(k / 2) + A / 2 - 4}px` : "0px";
    }
    ce(e, m, { immediate: !0 }), ye(() => {
      window.addEventListener("scroll", m), l.value.addEventListener("click", () => e.value = !1);
    }), Ee(() => {
      window.removeEventListener("scroll", m);
    });
    const C = _(() => ["sm", "small"].includes(t.size)), D = _(() => ["md", "medium"].includes(t.size)), M = _(() => ["lg", "large"].includes(t.size)), y = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-")), x = _(() => `transform: translate(${o.value}, ${u.value}); --arrow-x: ${d.value}; opacity: ${v.value};'`), I = _(() => ({
      "fr-tooltip--shown": e.value,
      "fr-placement--top": p.value,
      "fr-placement--bottom": !p.value
    })), L = (b) => {
      b.key === "Escape" && (e.value = !1, b.preventDefault());
    }, T = (b) => {
      var w;
      (b.target === l.value || (w = l.value) != null && w.contains(b.target)) && (e.value = !0);
    }, E = (b) => {
      setTimeout(() => {
        !n.value && !r.value && (e.value = !1);
      }, 50);
    };
    return ye(() => {
      document.documentElement.addEventListener("keydown", L), document.documentElement.addEventListener("mouseover", T), t.disabled && l.value.addEventListener("click", (b) => b.preventDefault());
    }), Ee(() => {
      document.documentElement.removeEventListener("keydown", L), document.documentElement.removeEventListener("mouseover", T);
    }), ce(t.disabled, () => {
      t.disabled ? l.value.addEventListener("click", (b) => b.preventDefault()) : l.value.removeEventListener("click", (b) => b.preventDefault());
    }), (b, w) => (i(), f(z, null, [
      (i(), j(ve(b.href !== "" ? "a" : "button"), Q({
        id: `button-${b.id}`,
        ref_key: "source",
        ref: l,
        href: b.href !== "" && !b.disabled ? b.href : void 0,
        class: {
          "fr-link": b.isLink && !b.inline,
          "fr-btn": !b.isLink,
          "fr-btn--secondary": b.secondary && !b.tertiary,
          "fr-btn--tertiary": b.tertiary && !b.secondary && !b.noOutline,
          "fr-btn--tertiary-no-outline": b.tertiary && !b.secondary && b.noOutline,
          "fr-btn--sm": C.value,
          "fr-btn--md": D.value,
          "fr-btn--lg": M.value,
          "fr-btn--icon-right": !b.isLink && !b.iconOnly && y.value && b.iconRight,
          "fr-btn--icon-left": !b.isLink && !b.iconOnly && y.value && !b.iconRight,
          "fr-link--icon-right": b.isLink && !b.inline && !b.iconOnly && y.value && b.iconRight,
          "fr-link--icon-left": b.isLink && !b.inline && !b.iconOnly && y.value && !b.iconRight,
          "inline-flex": !y.value,
          reverse: b.iconRight && !y.value,
          "fr-btn--custom-tooltip": b.iconOnly,
          "justify-center": !y.value && b.iconOnly,
          [b.icon]: y.value
        },
        "aria-disabled": b.disabled,
        "aria-labelledby": b.id,
        onMouseenter: w[0] || (w[0] = (A) => r.value = !0),
        onMouseleave: w[1] || (w[1] = (A) => {
          r.value = !1, E();
        }),
        onFocus: w[2] || (w[2] = (A) => T(A)),
        onBlur: w[3] || (w[3] = (A) => E())
      }, b.$attrs), {
        default: U(() => [
          V(h(b.label), 1)
        ]),
        _: 1
      }, 16, ["id", "href", "class", "aria-disabled", "aria-labelledby"])),
      c("p", {
        id: b.id,
        ref_key: "tooltip",
        ref: s,
        class: R(["fr-tooltip fr-placement", I.value]),
        style: Te(x.value),
        role: "tooltip",
        "aria-hidden": "true",
        onMouseenter: w[4] || (w[4] = (A) => n.value = !0),
        onMouseleave: w[5] || (w[5] = (A) => {
          n.value = !1, E();
        })
      }, [
        S(b.$slots, "default", {}, () => [
          V(h(b.content), 1)
        ], !0)
      ], 46, xb)
    ], 64));
  }
}), tr = /* @__PURE__ */ Ae(Db, [["__scopeId", "data-v-9aff3af2"]]), Tb = /* @__PURE__ */ F({
  __name: "DsfrButtonTooltip",
  setup(a) {
    return (t, e) => (i(), j(tr, Q({ "is-link": !1 }, t.$attrs), {
      default: U(() => [
        S(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Ib = /* @__PURE__ */ F({
  __name: "DsfrLinkTooltip",
  props: {
    asButton: { type: Boolean, default: !1 }
  },
  setup(a) {
    return (t, e) => (i(), j(tr, Q({
      "is-link": !t.asButton
    }, t.$attrs), {
      default: U(() => [
        S(t.$slots, "default")
      ]),
      _: 3
    }, 16, ["is-link"]));
  }
}), Cb = ["id", "href", "aria-disabled"], Eb = /* @__PURE__ */ F({
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
    const t = a, e = _(() => ["sm", "small"].includes(t.size)), n = _(() => ["md", "medium"].includes(t.size)), r = _(() => ["lg", "large"].includes(t.size)), l = _(() => t.asButton ? "btn" : "link"), s = _(() => typeof t.icon == "string" && t.icon.startsWith("fr-icon-"));
    return (o, u) => (i(), f("a", Q({
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
      S(o.$slots, "default", {}, () => [
        V(h(o.label), 1)
      ], !0)
    ], 16, Cb));
  }
}), Pb = /* @__PURE__ */ Ae(Eb, [["__scopeId", "data-v-44994a07"]]), Mb = (a, t) => a.matches ? a.matches(t) : a.msMatchesSelector ? a.msMatchesSelector(t) : a.webkitMatchesSelector ? a.webkitMatchesSelector(t) : null, Lb = (a, t) => {
  let e = a;
  for (; e && e.nodeType === 1; ) {
    if (Mb(e, t))
      return e;
    e = e.parentNode;
  }
  return null;
}, Bb = (a, t) => a.closest ? a.closest(t) : Lb(a, t), Sb = (a) => !!(a && typeof a.then == "function");
class $b {
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
    N(this, "value", "");
    N(this, "searchCounter", 0);
    N(this, "results", []);
    N(this, "selectedIndex", -1);
    N(this, "selectedResult", null);
    N(this, "destroy", () => {
      this.search = null, this.setValue = null, this.setAttribute = null, this.onUpdate = null, this.onSubmit = null, this.autocorrect = null, this.onShow = null, this.onHide = null, this.onLoading = null, this.onLoaded = null;
    });
    N(this, "handleInput", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    N(this, "handleKeyDown", (t) => {
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
    N(this, "handleFocus", (t) => {
      const { value: e } = t.target;
      this.updateResults(e), this.value = e;
    });
    N(this, "handleBlur", () => {
      this.hideResults();
    });
    // The mousedown event fires before the blur event. Calling preventDefault() when
    // the results list is clicked will prevent it from taking focus, firing the
    // blur event on the input element, and closing the results list before click fires.
    N(this, "handleResultMouseDown", (t) => {
      t.preventDefault();
    });
    N(this, "handleResultClick", (t) => {
      const { target: e } = t, n = Bb(e, "[data-result-index]");
      if (n) {
        this.selectedIndex = parseInt(n.dataset.resultIndex, 10);
        const r = this.results[this.selectedIndex];
        this.selectResult(), this.onSubmit(r);
      }
    });
    N(this, "handleArrows", (t) => {
      const e = this.results.length;
      this.selectedIndex = (t % e + e) % e, this.onUpdate(this.results, this.selectedIndex);
    });
    N(this, "selectResult", () => {
      const t = this.results[this.selectedIndex];
      t && this.setValue(t), this.hideResults();
    });
    N(this, "updateResults", (t) => {
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
    N(this, "showResults", () => {
      this.setAttribute("aria-expanded", !0), this.onShow();
    });
    N(this, "hideResults", () => {
      this.selectedIndex = -1, this.results = [], this.setAttribute("aria-expanded", !1), this.setAttribute("aria-activedescendant", ""), this.onUpdate(this.results, this.selectedIndex), this.onHide();
    });
    // Make sure selected result isn't scrolled out of view
    N(this, "checkSelectedResultVisible", (t) => {
      const e = t.querySelector(
        `[data-result-index="${this.selectedIndex}"]`
      );
      if (!e)
        return;
      const n = t.getBoundingClientRect(), r = e.getBoundingClientRect();
      r.top < n.top ? t.scrollTop -= n.top - r.top : r.bottom > n.bottom && (t.scrollTop += r.bottom - n.bottom);
    });
    this.search = Sb(t) ? t : (C) => Promise.resolve(t(C)), this.autoSelect = e, this.setValue = n, this.setAttribute = r, this.onUpdate = l, this.onSubmit = s, this.autocorrect = u, this.onShow = o, this.onHide = d, this.onLoading = p, this.onLoaded = v, this.submitOnEnter = m;
  }
}
const Ab = (a, t) => {
  const e = a.getBoundingClientRect(), n = t.getBoundingClientRect();
  return /* 1 */ e.bottom + n.height > window.innerHeight && /* 2 */
  window.innerHeight - e.bottom < e.top && /* 3 */
  window.pageYOffset + e.top - n.height > 0 ? "above" : "below";
}, Ob = (a, t, e) => {
  let n;
  return function() {
    const l = this, s = arguments, o = function() {
      n = null, a.apply(l, s);
    };
    clearTimeout(n), n = setTimeout(o, t);
  };
}, Rb = (a) => {
  if (a != null && a.length) {
    const t = a.startsWith("#");
    return {
      attribute: t ? "aria-labelledby" : "aria-label",
      content: t ? a.substring(1) : a
    };
  }
}, Fb = {
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
    const a = new $b({
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
    return this.debounceTime > 0 && (a.handleInput = Ob(a.handleInput, this.debounceTime)), {
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
      const a = this.position === "below" ? "top" : "bottom", t = Rb(this.resultListLabel);
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
    !this.$refs.input || !this.$refs.resultList || (this.resetPosition && this.results.length > 0 && (this.resetPosition = !1, this.position = Ab(
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
function Vb(a, t, e, n, r, l) {
  return i(), f("div", Q({ ref: "root" }, {
    class: a.$attrs.class,
    ...a.$attrs.style ? { style: a.$attrs.style } : {}
  }), [
    S(a.$slots, "default", {
      rootProps: l.rootProps,
      inputProps: l.inputProps,
      inputListeners: l.inputListeners,
      resultListProps: l.resultListProps,
      resultListListeners: l.resultListListeners,
      results: r.results,
      resultProps: l.resultProps
    }, () => [
      c("div", Ie(kt(l.rootProps)), [
        c("input", Q({ ref: "input" }, l.inputProps, {
          onInput: t[0] || (t[0] = (...s) => l.handleInput && l.handleInput(...s)),
          onKeydown: t[1] || (t[1] = (...s) => r.core.handleKeyDown && r.core.handleKeyDown(...s)),
          onFocus: t[2] || (t[2] = (...s) => r.core.handleFocus && r.core.handleFocus(...s)),
          onBlur: t[3] || (t[3] = (...s) => r.core.handleBlur && r.core.handleBlur(...s))
        }), null, 16),
        c("ul", Q({ ref: "resultList" }, l.resultListProps, hr(l.resultListListeners, !0)), [
          (i(!0), f(z, null, J(r.results, (s, o) => S(a.$slots, "result", {
            result: s,
            props: l.resultProps[o]
          }, () => [
            (i(), f("li", Q({
              key: l.resultProps[o].id,
              ref_for: !0
            }, l.resultProps[o]), h(e.getResultValue(s)), 17))
          ])), 256))
        ], 16)
      ], 16)
    ])
  ], 16);
}
const Nb = /* @__PURE__ */ Ae(Fb, [["render", Vb]]);
var qb = {
  install: function(a, t) {
    a.use(Zp), a.component("RouterLink", tv), a.component("DsfrFacets", _v), a.component("DsfrSelectMultiple", Xv), a.component("DsfrMenu", Cv), a.component("DsfrMenuLink", Lv), a.component("DsfrHeaderMenu", sg), a.component("DsfrCustomHeader", Og), a.component("DsfrCustomHeaderMenuLinks", Qt), a.component("DsfrCustomDataTable", ib), a.component("DsfrCustomCheckbox", mb), a.component("DsfrCustomSelect", _b), a.component("DsfrButtonTooltip", Tb), a.component("DsfrLinkTooltip", Ib), a.component("DsfrLink", Pb), a.component("autocomplete", Nb);
  },
  methods: Zh,
  utils: Jh
};
window && (window.DSFR = qb);
export {
  qb as default
};
//# sourceMappingURL=dsfr.es.js.map
